import { PracticeClient } from '@/app/practice/practice-client';
import { SiteHeader } from '@/components/site-header';
import { getQuestionStats, listActiveQuestions } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function PracticePage() {
  const [{ questions, dbOk }, { stats }] = await Promise.all([
    listActiveQuestions(),
    getQuestionStats(),
  ]);

  return (
    <main className="min-h-screen bg-[#eef5f5] text-[#13333a]">
      <SiteHeader active="practice" questions={questions} bankFallback={!dbOk} />
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <PracticeClient questions={questions} globalStats={stats} />
      </div>
    </main>
  );
}
