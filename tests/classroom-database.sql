-- Run only against a fresh disposable database with the Supabase roles/auth.uid stubbed.
insert into auth.users(id) values
 ('11111111-0000-0000-0000-000000000001'), ('11111111-0000-0000-0000-000000000002'),
 ('11111111-0000-0000-0000-000000000003'), ('11111111-0000-0000-0000-000000000004');

insert into public.classroom_profiles(id,role,teacher_id,display_name) values
 ('11111111-0000-0000-0000-000000000001','teacher',null,'Teacher One'),
 ('11111111-0000-0000-0000-000000000002','teacher',null,'Teacher Two'),
 ('11111111-0000-0000-0000-000000000003','student','11111111-0000-0000-0000-000000000001','Student One'),
 ('11111111-0000-0000-0000-000000000004','student','11111111-0000-0000-0000-000000000002','Student Two');

create temp table test_state as
select jsonb_build_object(
  'quizAnswers', (select jsonb_agg(value->'correct') from jsonb_array_elements(quiz)),
  'assessmentAnswers', (select jsonb_agg(value->'correct') from jsonb_array_elements(assessment)),
  'checked', (select jsonb_agg(true) from jsonb_array_elements(quiz)),
  'submitted',true, 'quizIndex',0, 'assessmentIndex',0,
  'quiz_score',1000
) as body from classroom_private.lesson_keys where lesson_id=1;
grant select on test_state to authenticated;

set role authenticated;
select set_config('request.jwt.claim.sub','11111111-0000-0000-0000-000000000003',false);
do $$
declare
  row public.classroom_activity;
  body jsonb := (select test_state.body from test_state);
begin
  row := public.classroom_save(1::smallint,0,body,true);
  if row.quiz_score <> 10 or row.assessment_score <> 8 or not row.completed then
    raise exception 'Server grading and completion failed';
  end if;
  if row.state ? 'quiz_score' then raise exception 'Unexpected input was retained'; end if;
  row := public.classroom_save(1::smallint,1,jsonb_set(body,'{submitted}','false'),false);
  if row.assessment_score <> 8 or not row.completed then raise exception 'Previous assessment was lost'; end if;
  if (select count(*) from public.classroom_profiles) <> 1 then raise exception 'Student saw another profile'; end if;
  begin
    perform public.classroom_save(1::smallint,1,body,true);
    raise exception 'Stale revision accepted';
  exception when sqlstate 'PT409' then null;
  end;
  begin
    perform public.classroom_save(1::smallint,2,jsonb_set(body,'{quizAnswers,0}','"bad text"'),false);
    raise exception 'Non-answer text accepted';
  exception when invalid_parameter_value then null;
  end;
  begin
    update public.classroom_profiles set role='teacher' where id=auth.uid();
    raise exception 'Student had write permission';
  exception when insufficient_privilege then null;
  end;
end;
$$;

select set_config('request.jwt.claim.sub','11111111-0000-0000-0000-000000000004',false);
do $$
begin
  if exists(select 1 from public.classroom_activity) then raise exception 'Student saw another student’s work'; end if;
end;
$$;

select set_config('request.jwt.claim.sub','11111111-0000-0000-0000-000000000001',false);
do $$
begin
  if (select count(*) from public.classroom_student_summary where completed=1 and last_seen_at is not null) <> 1 then
    raise exception 'Teacher could not see their student’s completion and activity';
  end if;
  if (select count(*) from public.classroom_student_summary) <> 1 then raise exception 'Teacher saw another roster'; end if;
  if (select count(*) from public.classroom_activity) <> 1 then raise exception 'Teacher could not read work'; end if;
  begin
    perform public.classroom_save(1::smallint,0,(select body from test_state),true);
    raise exception 'Teacher wrote student activity';
  exception when insufficient_privilege then null;
  end;
end;
$$;

select set_config('request.jwt.claim.sub','11111111-0000-0000-0000-000000000002',false);
do $$
begin
  if exists(select 1 from public.classroom_activity) then raise exception 'Teacher saw another teacher’s student work'; end if;
end;
$$;

reset role;
set role anon;
do $$
begin
  begin
    perform 1 from public.classroom_activity;
    raise exception 'Anonymous activity was readable';
  exception when insufficient_privilege then null;
  end;
end;
$$;
reset role;
