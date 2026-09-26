'use client';

import { lazy, Suspense, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { HomeClient } from '@/components/home-client';
import { SiteHeader, type HeaderNavKey } from '@/components/site-header';
import '@/app/globals.css';

// 非首页内容按需加载：首屏（首页）不拖实验与图鉴的代码块。
const CellsClient = lazy(() => import('@/components/cells/cells-client').then((m) => ({ default: m.CellsClient })));
const LabClient = lazy(() => import('@/app/lab/lab-client').then((m) => ({ default: m.LabClient })));
const GraphClient = lazy(() => import('@/components/graph/knowledge-graph').then((m) => ({ default: m.GraphClient })));

function PageFallback() {
  return (
    <div className="flex min-h-56 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-500">
      <span className="inline-block size-2 animate-pulse rounded-[3px] bg-[#2eaadc]" aria-hidden="true" />
      内容加载中…
    </div>
  );
}

type Tab = 'home' | 'cells' | 'lab' | 'graph';

function parseHash(): Tab {
  const h = window.location.hash.replace(/^#\/?/, '');
  if (h.startsWith('cells')) return 'cells';
  if (h.startsWith('lab')) return 'lab';
  if (h.startsWith('graph')) return 'graph';
  return 'home';
}

function StaticApp() {
  const [tab, setTab] = useState<Tab>(() => parseHash());

  useEffect(() => {
    const onHash = () => {
      setTab(parseHash());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const headerActive: HeaderNavKey = tab;

  return (
    <main className="min-h-screen bg-[#f7f6f3] text-[#37352f]">
      <SiteHeader active={headerActive} />
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        {tab === 'home' ? (
          <HomeClient />
        ) : (
          <Suspense fallback={<PageFallback />}>
            {tab === 'cells' ? <CellsClient /> : null}
            {tab === 'lab' ? <LabClient /> : null}
            {tab === 'graph' ? <GraphClient useHash /> : null}
          </Suspense>
        )}
        <p className="mt-6 text-center text-[11px] text-gray-400">
          福建高中生物学习站 · 静态演示版 · 源码：
          <a
            className="underline underline-offset-2"
            href="https://github.com/zhangqian12122/biology-learning-studio"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<StaticApp />);
