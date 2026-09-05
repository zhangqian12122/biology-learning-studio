import { LabClient } from '@/app/lab/lab-client';
import { SiteHeader } from '@/components/site-header';
import { listActiveQuestions } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function LabPage() {
  const { questions, dbOk } = await listActiveQuestions();

  return (
    <main className="min-h-screen bg-[#eef5f5] text-[#13333a]">
      <SiteHeader active="lab" questions={questions} bankFallback={!dbOk} />
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <LabClient />
      </div>
    </main>
  );
}
