import { HomeClient } from '@/components/home-client';
import { SiteHeader } from '@/components/site-header';
import { getGlobalStats, listActiveQuestions } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [{ questions, dbOk }, stats] = await Promise.all([
    listActiveQuestions(),
    getGlobalStats(),
  ]);

  return (
    <main className="min-h-screen bg-[#eef5f5] text-[#13333a]">
      <SiteHeader active="home" questions={questions} bankFallback={!dbOk} />
      <div className="mx-auto grid max-w-[1440px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[238px_minmax(0,1fr)] lg:px-8">
        <HomeClient questions={questions} stats={stats} />
      </div>
    </main>
  );
}
