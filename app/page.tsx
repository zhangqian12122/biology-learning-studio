import { HomeClient } from '@/components/home-client';
import { SiteHeader } from '@/components/site-header';

export const dynamic = 'force-dynamic';

export default async function HomePage() {

  return (
    <main className="min-h-screen bg-[#f7f6f3] text-[#37352f]">
      <SiteHeader active="home" />
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <HomeClient />
      </div>
    </main>
  );
}
