create schema classroom_private;
revoke all on schema classroom_private from public, anon, authenticated;

create table public.classroom_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('teacher', 'student')),
  teacher_id uuid references public.classroom_profiles(id) on delete restrict,
  display_name text not null check (char_length(btrim(display_name)) between 1 and 60),
  last_seen_at timestamptz,
  check ((role = 'teacher' and teacher_id is null) or (role = 'student' and teacher_id is not null and teacher_id <> id))
);
create index classroom_profiles_teacher_idx on public.classroom_profiles(teacher_id);
alter table public.classroom_profiles enable row level security;
revoke all on public.classroom_profiles from public, anon, authenticated;
grant select on public.classroom_profiles to authenticated;
grant select, insert on public.classroom_profiles to service_role;
create policy classroom_profile_read on public.classroom_profiles for select to authenticated
  using (id = (select auth.uid()) or teacher_id = (select auth.uid()));

create table classroom_private.lesson_keys (
  lesson_id smallint primary key,
  quiz jsonb not null,
  assessment jsonb not null
);

create table public.classroom_activity (
  student_id uuid not null references public.classroom_profiles(id) on delete cascade,
  lesson_id smallint not null references classroom_private.lesson_keys(lesson_id),
  revision integer not null check (revision > 0),
  state jsonb not null,
  quiz_score smallint not null,
  quiz_total smallint not null,
  assessment_score smallint,
  assessment_total smallint not null,
  assessment_answers jsonb,
  completed boolean not null,
  updated_at timestamptz not null default now(),
  primary key (student_id, lesson_id)
);
alter table public.classroom_activity enable row level security;
revoke all on public.classroom_activity from public, anon, authenticated;
grant select on public.classroom_activity to authenticated;
create policy classroom_activity_read on public.classroom_activity for select to authenticated
  using (
    student_id = (select auth.uid())
    or exists (select 1 from public.classroom_profiles p
      where p.id = student_id and p.teacher_id = (select auth.uid()))
  );

create function public.classroom_presence()
returns void language sql security definer set search_path = ''
as $$
  update public.classroom_profiles
  set last_seen_at = now()
  where id = auth.uid() and role = 'student'
    and (last_seen_at is null or last_seen_at < now() - interval '45 seconds');
$$;

-- Answer entries are small numeric choice indexes. Keep arbitrary text and extra keys out.
create function classroom_private.valid_answer(question jsonb, answer jsonb)
returns boolean language plpgsql immutable set search_path = ''
as $$
declare
  kind text := question->>'kind';
  choice_count integer := (question->>'choices')::integer;
  item jsonb;
begin
  if answer is null then return false; end if;
  if answer = 'null'::jsonb then return true; end if;
  if kind = 'single' then
    return answer::text ~ '^[0-9]{1,2}$' and (answer::text)::numeric < choice_count;
  end if;
  if jsonb_typeof(answer) <> 'array' then return false; end if;
  if (kind = 'multi' and jsonb_array_length(answer) not between 1 and choice_count)
    or (kind <> 'multi' and jsonb_array_length(answer) <> jsonb_array_length(question->'correct')) then
    return false;
  end if;
  for item in select value from jsonb_array_elements(answer) loop
    if kind = 'match' and item = 'null'::jsonb then continue; end if;
    if item::text !~ '^[0-9]{1,2}$' then return false; end if;
    if (item::text)::integer >= choice_count then return false; end if;
  end loop;
  if kind in ('multi','order') and (select count(distinct value) from jsonb_array_elements(answer)) <> jsonb_array_length(answer) then
    return false;
  end if;
  return true;
end;
$$;

create function classroom_private.correct_answer(question jsonb, answer jsonb)
returns boolean language sql immutable set search_path = ''
as $$
  select case when question->>'kind' = 'multi' and jsonb_typeof(answer) = 'array'
    then answer @> (question->'correct') and answer <@ (question->'correct')
    else answer = question->'correct' end;
$$;

create function public.classroom_save(
  lesson_number smallint,
  expected_revision integer,
  lesson_state jsonb,
  finish_lesson boolean
)
returns public.classroom_activity
language plpgsql security definer set search_path = ''
as $$
declare
  actor uuid := auth.uid();
  key_row classroom_private.lesson_keys;
  saved public.classroom_activity;
  quiz_answers jsonb := lesson_state->'quizAnswers';
  task_answers jsonb := lesson_state->'assessmentAnswers';
  checked jsonb := lesson_state->'checked';
  submitted boolean;
  quiz_length integer;
  task_length integer;
  quiz_correct integer := 0;
  task_correct integer := 0;
  quiz_index text := lesson_state->>'quizIndex';
  task_index text := lesson_state->>'assessmentIndex';
  i integer;
begin
  if not exists (select 1 from public.classroom_profiles where id = actor and role = 'student') then
    raise exception 'Student access required' using errcode = '42501';
  end if;
  select * into key_row from classroom_private.lesson_keys where lesson_id = lesson_number;
  if not found or expected_revision is null or expected_revision < 0 or finish_lesson is null then
    raise exception 'Invalid lesson or revision' using errcode = '22023';
  end if;
  quiz_length := jsonb_array_length(key_row.quiz);
  task_length := jsonb_array_length(key_row.assessment);
  if jsonb_typeof(quiz_answers) is distinct from 'array'
    or jsonb_typeof(task_answers) is distinct from 'array'
    or jsonb_typeof(checked) is distinct from 'array'
    or jsonb_typeof(lesson_state->'submitted') is distinct from 'boolean'
    or coalesce(quiz_index,'') !~ '^[0-9]{1,2}$' or coalesce(task_index,'') !~ '^[0-9]{1,2}$' then
    raise exception 'Invalid activity format' using errcode = '22023';
  end if;
  if jsonb_array_length(quiz_answers) <> quiz_length or jsonb_array_length(checked) <> quiz_length
    or jsonb_array_length(task_answers) <> task_length or quiz_index::integer >= quiz_length or task_index::integer >= task_length then
    raise exception 'Invalid activity length' using errcode = '22023';
  end if;
  submitted := (lesson_state->>'submitted')::boolean;
  for i in 0..quiz_length-1 loop
    if not classroom_private.valid_answer(key_row.quiz->i, quiz_answers->i) or jsonb_typeof(checked->i) <> 'boolean' then
      raise exception 'Invalid quiz answer' using errcode = '22023';
    end if;
    if checked->i = 'true'::jsonb and classroom_private.correct_answer(key_row.quiz->i, quiz_answers->i) then
      quiz_correct := quiz_correct + 1;
    end if;
  end loop;
  for i in 0..task_length-1 loop
    if not classroom_private.valid_answer(key_row.assessment->i, task_answers->i)
      or (submitted and (task_answers->i = 'null'::jsonb or (key_row.assessment->i->>'kind' = 'match' and task_answers->i @> '[null]'::jsonb))) then
      raise exception 'Invalid assessment answer' using errcode = '22023';
    end if;
    if classroom_private.correct_answer(key_row.assessment->i, task_answers->i) then
      task_correct := task_correct + 1;
    end if;
  end loop;

  select * into saved from public.classroom_activity where student_id = actor and lesson_id = lesson_number for update;
  if coalesce(saved.revision,0) <> expected_revision then
    raise exception 'Lesson was updated elsewhere' using errcode = 'PT409';
  end if;
  insert into public.classroom_activity(
    student_id, lesson_id, revision, state, quiz_score, quiz_total, assessment_score, assessment_total, assessment_answers, completed
  ) values (
    actor, lesson_number, expected_revision + 1,
    jsonb_build_object('quizAnswers',quiz_answers,'assessmentAnswers',task_answers,'checked',checked,'submitted',submitted,
      'quizIndex',quiz_index::integer,'assessmentIndex',task_index::integer),
    quiz_correct, quiz_length, case when submitted then task_correct end, task_length, case when submitted then task_answers end,
    finish_lesson and submitted and task_correct = task_length
  )
  on conflict (student_id,lesson_id) do update set
    revision = excluded.revision,
    state = excluded.state,
    quiz_score = excluded.quiz_score,
    assessment_score = coalesce(excluded.assessment_score, classroom_activity.assessment_score),
    assessment_answers = coalesce(excluded.assessment_answers, classroom_activity.assessment_answers),
    completed = classroom_activity.completed or excluded.completed,
    updated_at = now()
  where classroom_activity.revision = expected_revision
  returning * into saved;
  if not found then
    raise exception 'Lesson was updated elsewhere' using errcode = 'PT409';
  end if;
  perform public.classroom_presence();
  return saved;
end;
$$;

revoke all on function public.classroom_presence() from public, anon, authenticated;
revoke all on function public.classroom_save(smallint,integer,jsonb,boolean) from public, anon, authenticated;
grant execute on function public.classroom_presence() to authenticated;
grant execute on function public.classroom_save(smallint,integer,jsonb,boolean) to authenticated;

create view public.classroom_student_summary
with (security_invoker = true) as
select p.id as student_id, p.display_name, p.last_seen_at,
  count(a.lesson_id)::integer as started,
  count(*) filter (where a.completed)::integer as completed
from public.classroom_profiles p
left join public.classroom_activity a on a.student_id = p.id
where p.role = 'student'
group by p.id, p.display_name, p.last_seen_at;

revoke all on public.classroom_student_summary from public, anon, authenticated;
grant select on public.classroom_student_summary to authenticated;
