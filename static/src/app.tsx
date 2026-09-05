'use client';

import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { CellsClient } from '@/components/cells/cells-client';
import { HomeClient } from '@/components/home-client';
import { SiteHeader, type HeaderNavKey } from '@/components/site-header';
import { LabClient } from '@/app/lab/lab-client';
import { PracticeClient } from '@/app/practice/practice-client';
import { builtinQuestions, type BookId } from '@/lib/curriculum';
import '@/app/globals.css';

type Tab = 'home' | 'cells' | 'lab' | 'practice';

function parseHash(): Tab {
  const h = window.location.hash.replace(/^#\/?/, '');
  if (h.startsWith('cells')) return 'cells';
  if (h.startsWith('lab')) return 'lab';
  if (h.startsWith('practice')) return 'practice';
  return 'home';
}

const BOOK_IDS: BookId[] = ['molecules', 'genetics', 'regulation', 'ecology', 'technology'];

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

  // 从 hash 中透传 /practice?book=...&mode=... 这类参数（practice 组件读取 location.search，
  // 静态版将 hash 中的查询同步到 search，方便分享链接）
  useEffect(() => {
    const h = window.location.hash;
    const qIndex = h.indexOf('?');
    if (qIndex !== -1) {
      const params = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(h.slice(qIndex + 1));
      let changed = false;
      hashParams.forEach((value, key) => {
        if (!params.has(key)) {
          params.set(key, value);
          changed = true;
        }
      });
      if (changed) {
        const url = new URL(window.location.href);
        url.search = params.toString();
        window.history.replaceState(null, '', url.toString());
      }
    }
  }, [tab]);

  const activeByBook: Record<BookId, number> = {
    molecules: 0,
    genetics: 0,
    regulation: 0,
    ecology: 0,
    technology: 0,
  };
  for (const bookId of BOOK_IDS) {
    activeByBook[bookId] = builtinQuestions.filter((q) => q.bookId === bookId).length;
  }

  const stats = {
    dbOk: false,
    activeCount: builtinQuestions.length,
    totalQuestions: builtinQuestions.length,
    totalAnswers: 0,
    correctRate: null,
    activeByBook,
  };

  const headerActive: HeaderNavKey = tab;

  return (
    <main className="min-h-screen bg-[#eef5f5] text-[#13333a]">
      <SiteHeader active={headerActive} questions={builtinQuestions} bankFallback={false} />
      <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mb-4 rounded-md border border-[#f0e3c0] bg-[#fdf6e3] px-4 py-2 text-xs leading-5 text-[#80621c]">
          静态演示版：细胞图鉴 3D 模型、互动实验与内置题库完整可用；进度保存在当前浏览器中，教师中心共享题库仅在完整部署版提供。
        </div>
        {tab === 'home' ? <HomeClient questions={builtinQuestions} stats={stats} /> : null}
        {tab === 'cells' ? <CellsClient /> : null}
        {tab === 'lab' ? <LabClient /> : null}
        {tab === 'practice' ? <PracticeClient questions={builtinQuestions} globalStats={{}} /> : null}
        <p className="mt-6 text-center text-[11px] text-[#9ab0b5]">
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
