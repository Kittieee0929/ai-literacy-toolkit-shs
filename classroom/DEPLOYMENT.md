# Classroom setup

The existing GitHub Pages toolkit can host the Classroom interface. It requires a dedicated, school-approved Supabase project for authentication and private data. This repository contains only source code and lesson answer keys. Classroom profiles, credentials, and student work belong in the project database.

1. Link the Supabase CLI to the dedicated project. Disable public sign-ups in the hosted project’s Authentication settings. Teacher accounts are provisioned by the project administrator.
2. Run `supabase db push` from the repository root to create the schema and load the grading keys. Set the exact Pages origin with `supabase secrets set CLASSROOM_ORIGIN=https://kittieee0929.github.io`. Deploy with `supabase functions deploy create-classroom-student --no-verify-jwt`. The function validates the bearer token with Supabase Auth and checks the caller’s teacher profile before using the server-only admin key.
3. Create the teacher’s Auth user using the project administrator interface. Add the matching profile through the SQL editor. Replace the placeholders with the Auth user ID and the teacher’s classroom display name.

   ```sql
   insert into public.classroom_profiles (id, role, display_name)
   values ('AUTH_USER_UUID', 'teacher', 'Teacher display name');
   ```

4. In `classroom/config.js`, set the project's HTTPS URL and its **publishable** key. Keep the service-role key, secret key, and actual account passwords outside GitHub and the browser configuration.
5. Before enrolling real students, use two synthetic teacher accounts and one test student under each. Check enrolment, sign-in, password change, progress after switching devices, and that neither teacher can see the other roster. Delete test accounts through the project administrator interface once verified. Use classroom display names or nicknames. Share initial passwords privately.
6. Decide the account and activity retention period with the school before using this with students. The project administrator can reset a lost student password in Auth and delete a student Auth account when access and records should be removed. Student accounts use synthetic email identifiers and have no email-based recovery.

Activity means a student’s signed-in classroom was open or used within the last five minutes. A score reflects the current checked practice quiz or latest submitted assessment. Students can retry lessons, and the learning material includes feedback.

If lesson question types, options, order, or answers change, generate a new versioned SQL migration from `node scripts/classroom-lesson-keys.cjs`. Review compatibility with existing saved answers before changing a question index. Apply database and site changes together.
