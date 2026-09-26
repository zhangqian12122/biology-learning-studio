'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Search, FlaskConical, Microscope, GraduationCap } from 'lucide-react';

import { experimentOrder, textbooks, type BookId } from '@/lib/curriculum';
import { cn } from '@/lib/utils';

/** 每册一个俏皮主题色（磁贴底色 + 同色硬阴影），颜色即册的语义。 */
const BOOK_PLAYFUL: Record<BookId, { bg: string; shadow: string; icon: string }> = {
  molecules: { bg: 'bg-[#ffe66d]', shadow: 'pb-shadow-red', icon: '#ff6b6b' },
  genetics: { bg: 'bg-[#4ecdc4]', shadow: 'pb-shadow-coral', icon: '#f38181' },
  regulation: { bg: 'bg-[#95e1d3]', shadow: 'pb-shadow-yellow', icon: '#dfab01' },
  ecology: { bg: 'bg-[#f38181]', shadow: 'pb-shadow-teal', icon: '#4ecdc4' },
  technology: { bg: 'bg-[#ff6b6b]', shadow: 'pb-shadow-mint', icon: '#95e1d3' },
};

const TILTS = ['pb-tilt-l2', 'pb-tilt-r', 'pb-tilt-l'];

export function HomeClient({ useHashLinks }: { useHashLinks?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const hrefFor = (path: string) => (useHashLinks ? `#${path}` : path);

  const visibleTextbooks = useMemo(() => {
    const keyword = searchQuery.trim().toLocaleLowerCase();
    if (!keyword) return textbooks;
    return textbooks.filter((book) =>
      `${book.volume} ${book.title} ${book.summary} ${book.modules.join(' ')}`
        .toLocaleLowerCase()
        .includes(keyword),
    );
  }, [searchQuery]);

  return (
    <>
      {/* Hero：俏皮野兽派门面——粗黑边白卡 + 几何装饰 + 关键词荧光高亮 */}
      <section className="relative mb-6 border-4 border-black bg-white px-6 py-9 pb-shadow-black sm:px-10 sm:py-12">
        {/* 几何装饰 */}
        <span aria-hidden="true" className="absolute -left-3 -top-3 hidden size-10 border-4 border-black bg-[#4ecdc4] sm:block" />
        <span aria-hidden="true" className="absolute -right-3 -top-3 hidden size-14 rounded-full border-4 border-black bg-[#ffe66d] sm:block" />
        <span aria-hidden="true" className="absolute -bottom-3 -right-6 hidden h-8 w-24 border-4 border-black bg-[#ff6b6b] sm:block" />
        <span aria-hidden="true" className="absolute -bottom-4 left-16 hidden size-6 rounded-full border-4 border-black bg-[#95e1d3] sm:block" />

        <div className="relative">
          <p className="inline-flex -rotate-1 items-center gap-2 whitespace-nowrap border-4 border-black bg-[#ffe66d] px-3 py-1 text-[11px] font-black tracking-[0.22em] text-black pb-shadow-teal">
            <GraduationCap className="size-4" aria-hidden="true" />
            BIOLOGY COURSE MAP · 教材总览
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-black sm:text-5xl">
            从教材出发，
            <span className="pb-marker">把知识看懂</span>、
            <span className="pb-marker bg-[#4ecdc4]">过程看活</span>。
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-700 sm:text-base">
            五册教材全覆盖：{experimentOrder.length} 个过程动画互动实验，331 张课本级教学模式图。
            选一本教材开始，或直接搜索你要复习的知识点。
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {[
              { icon: FlaskConical, label: `互动实验 ${experimentOrder.length} 个` },
              { icon: Microscope, label: '教学图鉴 331 张' },
              { icon: BookOpen, label: '五册教材全覆盖' },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex -rotate-1 items-center gap-1.5 border-2 border-black bg-white px-2.5 py-1 text-xs font-bold text-black"
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <section className="border-4 border-black bg-white px-4 py-4 sm:px-6">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)] lg:items-end">
            <div>
              <p className="text-base font-black text-black">
                按五册教材顺序进入，或直接搜索你要复习的知识点。
              </p>
              <p className="mt-2 max-w-2xl font-mono text-sm leading-6 text-gray-700">
                每册教材都配有过程动画互动实验（在「互动实验」中按册目录浏览），
                结构与过程细节可查阅「图鉴」。
              </p>
            </div>
            <label className="block">
              <span className="mb-2 block font-mono text-xs font-bold tracking-[0.08em] text-black">
                搜索课堂内容
              </span>
              <span className="flex h-12 items-center gap-2 rounded-none border-4 border-black bg-white px-3 transition-all focus-within:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]">
                <Search className="size-4 shrink-0 text-black" aria-hidden="true" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="如：细胞、遗传、生态、发酵"
                  className="min-w-0 flex-1 bg-transparent font-mono text-sm text-black outline-none placeholder:text-gray-700"
                  type="search"
                />
              </span>
            </label>
          </div>
        </section>

        <section aria-labelledby="course-entry-title">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="inline-block size-4 border-2 border-black bg-[#ff6b6b]" />
              <span aria-hidden="true" className="inline-block size-4 border-2 border-black bg-[#4ecdc4]" />
              <span aria-hidden="true" className="inline-block size-4 border-2 border-black bg-[#ffe66d]" />
              <h2 id="course-entry-title" className="ml-1 text-xl font-black uppercase tracking-wide text-black">
                从教材模块开始
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-gray-700">{visibleTextbooks.length} 册可进入</span>
          </div>

          {visibleTextbooks.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
              {visibleTextbooks.map((book, index) => {
                const BookIcon = book.icon;
                const play = BOOK_PLAYFUL[book.id];
                return (
                  <Link
                    key={book.id}
                    href={hrefFor("/lab")}
                    style={{ '--stagger-i': index } as React.CSSProperties}
                    className={cn(
                      'group flex min-h-[240px] flex-col border-4 border-black bg-white p-5',
                      play.shadow,
                      TILTS[index % TILTS.length],
                      'pb-lift',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        aria-hidden="true"
                        className="flex size-11 shrink-0 items-center justify-center border-4 border-black"
                        style={{ backgroundColor: play.icon }}
                      >
                        <BookIcon className="size-5 text-black" />
                      </span>
                      <span className="border-2 border-black bg-black px-1.5 font-mono text-[11px] font-black text-white">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="mt-4 font-mono text-xs font-bold text-gray-700">{book.volume}</p>
                    <h3 className="mt-1 text-xl font-black text-black">{book.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-700">{book.summary}</p>
                    <p className="mt-3 line-clamp-2 font-mono text-xs leading-5 text-gray-700">
                      {book.modules.join(' · ')}
                    </p>
                    <span className="mt-auto inline-flex items-center justify-between gap-2 border-t-4 border-black pt-3 text-sm font-black text-black">
                      进入本册
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="border-4 border-black bg-white px-4 py-8 text-center font-mono text-sm text-gray-700">
              没有匹配的教材关键词，试试“细胞”“遗传”或“生态”。
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Link
            href={hrefFor("/lab")}
            className="group flex items-center gap-4 border-4 border-black bg-[#ffe66d] p-5 pb-lift"
          >
            <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center border-4 border-black bg-white">
              <FlaskConical className="size-6 text-black" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-black text-black">互动实验</span>
              <span className="mt-0.5 block font-mono text-sm text-gray-700">
                {experimentOrder.length} 个过程动画实验 · 按教材册归档
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-black transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href={hrefFor("/cells")}
            className="group flex items-center gap-4 border-4 border-black bg-[#4ecdc4] p-5 pb-lift"
          >
            <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center border-4 border-black bg-white">
              <Microscope className="size-6 text-black" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-black text-black">教学图鉴</span>
              <span className="mt-0.5 block font-mono text-sm text-gray-700">
                331 张结构模式图 · 点图高亮考点
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-black transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}
