import { getTeacherSetupState } from '@/app/actions';
import { TeacherClient } from '@/app/teacher/teacher-client';
import { SiteHeader } from '@/components/site-header';
import { listActiveQuestions } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function TeacherPage() {
  const [{ questions, dbOk }, setup] = await Promise.all([
    listActiveQuestions(),
    getTeacherSetupState(),
  ]);

  return (
    <main className="min-h-screen bg-[#eef5f5] text-[#13333a]">
      <SiteHeader active="teacher" questions={questions} bankFallback={!dbOk} />
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <TeacherClient hasPasscode={setup.hasPasscode} dbOk={setup.dbOk} />
      </div>
    </main>
  );
}
