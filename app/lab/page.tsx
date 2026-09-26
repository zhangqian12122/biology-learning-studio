import { LabClient } from '@/app/lab/lab-client';
import { SiteHeader } from '@/components/site-header';

export const dynamic = 'force-dynamic';

export default async function LabPage() {

  return (
    <main className="min-h-screen bg-[#f7f6f3] text-[#37352f]">
      <SiteHeader active="lab" />
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <LabClient />
      </div>
    </main>
  );
}
