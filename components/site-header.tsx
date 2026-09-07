import Link from 'next/link';

import { LocalProgressBadge } from '@/components/local-progress-badge';
import type { Question } from '@/lib/curriculum';
import { Microscope } from 'lucide-react';

export type HeaderNavKey = 'home' | 'lab' | 'cells' | 'graph' | 'practice' | 'teacher';

const navItems: { key: HeaderNavKey; href: string; label: string }[] = [
  { key: 'home', href: '/', label: '教材总览' },
  { key: 'lab', href: '/lab', label: '互动实验' },
  { key: 'cells', href: '/cells', label: '图鉴' },
  { key: 'graph', href: '/graph', label: '知识图谱' },
  { key: 'practice', href: '/practice', label: '题库与错题' },
  { key: 'teacher', href: '/teacher', label: '教师中心' },
];

export function SiteHeader({
  active,
  questions,
  bankFallback,
}: {
  active: HeaderNavKey;
  questions: Question[];
  bankFallback?: boolean;
}) {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[#13333a] bg-white shadow-[0_4px_0_#c6d4d4]">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg border-2 border-[#13333a] bg-[#0e6f75] text-white shadow-[3px_3px_0_#13333a]">
            <Microscope className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-base font-bold leading-none text-[#13333a]">福建高中生物学习站</p>
            <p className="mt-1 text-xs text-[#56737a]">人教版新课标 · 师生共享题库</p>
          </div>
        </Link>

        <nav
          className="order-3 flex w-full items-center gap-1.5 overflow-x-auto border-t-2 border-dashed border-[#c6d4d4] pt-3 text-sm sm:order-none sm:w-auto sm:border-0 sm:pt-0"
          aria-label="主导航"
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={active === item.key ? 'page' : undefined}
              className={
                'nb-pill h-10 shrink-0 px-3 text-sm font-semibold leading-8 ' +
                (active === item.key ? 'nb-pill-active' : 'text-[#59767c]')
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-xs text-[#55737a] sm:text-sm">
          <span className="nb-pill hidden px-3 py-1.5 font-semibold sm:inline-flex">共享题库 {questions.length} 题</span>
          <LocalProgressBadge questions={questions} />
        </div>
      </div>
      {bankFallback ? (
        <div className="border-t border-[#f0e3c0] bg-[#fdf6e3] px-4 py-2 text-center text-xs text-[#80621c] sm:px-6">
          题库服务暂时不可用，当前使用内置题目；作答会保存在本机，恢复后自动同步共享题库。
        </div>
      ) : null}
    </header>
  );
}
