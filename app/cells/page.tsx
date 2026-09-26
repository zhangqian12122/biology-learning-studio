import { CellsClient } from '@/components/cells/cells-client';
import { SiteHeader } from '@/components/site-header';

export const dynamic = 'force-dynamic';

export default async function CellsPage() {

  return (
    <main className="min-h-screen bg-[#f7f6f3] text-[#13333a]">
      <SiteHeader active="cells" />
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <CellsClient />
      </div>
    </main>
  );
}
