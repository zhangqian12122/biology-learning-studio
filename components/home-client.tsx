'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Search, FlaskConical, Microscope, GraduationCap } from 'lucide-react';

import { NbHero } from '@/components/nb-hero';
import { experimentOrder, textbooks, type BookId } from '@/lib/curriculum';
import { cn } from '@/lib/utils';

export function HomeClient() {
  const [searchQuery, setSearchQuery] = useState('');

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
      <NbHero
        badge="BIOLOGY COURSE MAP · 教材总览"
        title="从教材出发，把知识看懂、过程看活。"
        description={
          <>
            五册教材全覆盖：{experimentOrder.length} 个过程动画互动实验，331 张课本级教学模式图。
            选一本教材开始，或直接搜索你要复习的知识点。
          </>
        }
        stats={[`互动实验 ${experimentOrder.length} 个`, `教学图鉴 331 张`, `五册教材全覆盖`]}
        icon={GraduationCap}
      />

      <div className="space-y-5">
        <section className="nb-card p-4 sm:p-5">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)] lg:items-end">
            <div>
              <p className="text-base font-medium text-[#37352f]">
                按五册教材顺序进入，或直接搜索你要复习的知识点。
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                每册教材都配有过程动画互动实验（在「互动实验」中按册目录浏览），
                结构与过程细节可查阅「图鉴」。
              </p>
            </div>
            <label className="block">
              <span className="mb-2 block text-xs font-semibold tracking-[0.08em] text-gray-500">
                搜索课堂内容
              </span>
              <span className="nb-input flex h-11 items-center gap-2 px-3">
                <Search className="size-4 shrink-0 text-gray-400" aria-hidden="true" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="如：细胞、遗传、生态、发酵"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                  type="search"
                />
              </span>
            </label>
          </div>
        </section>

        <section aria-labelledby="course-entry-title">
          <div className="mb-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.08em] text-gray-500">课堂入口</p>
              <h2 id="course-entry-title" className="mt-1 text-lg font-semibold text-[#37352f]">
                从教材模块开始
              </h2>
            </div>
            <span className="text-xs text-gray-500">{visibleTextbooks.length} 册可进入</span>
          </div>

          {visibleTextbooks.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleTextbooks.map((book, index) => {
                const BookIcon = book.icon;
                return (
                  <Link
                    key={book.id}
                    href="/lab"
                    style={{ '--stagger-i': index } as React.CSSProperties}
                    className="nb-tile nb-lift nb-rise group flex min-h-[230px] flex-col p-4 text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={cn(
                          'flex size-9 items-center justify-center rounded-md border',
                          book.color,
                        )}
                      >
                        <BookIcon className="size-4" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-semibold text-[#a77724]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="mt-4 text-xs text-gray-500">{book.volume}</p>
                    <h3 className="mt-1 text-lg font-semibold text-[#37352f]">{book.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-600">{book.summary}</p>
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-gray-500">
                      {book.modules.join(' · ')}
                    </p>
                    <span className="mt-auto inline-flex items-center justify-between gap-2 pt-4 text-sm font-medium text-[#2eaadc]">
                      进入本册
                      <ArrowRight
                        className="size-3.5 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
              没有匹配的教材关键词，试试“细胞”“遗传”或“生态”。
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Link
            href="/lab"
            className="nb-tile nb-lift group flex items-center gap-4 p-5 text-left"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#2eaadc]">
              <FlaskConical className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-semibold text-[#37352f]">互动实验</span>
              <span className="mt-0.5 block text-sm text-gray-500">
                {experimentOrder.length} 个过程动画实验，按教材册与主题归档
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href="/cells"
            className="nb-tile nb-lift group flex items-center gap-4 p-5 text-left"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#2eaadc]">
              <Microscope className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-base font-semibold text-[#37352f]">教学图鉴</span>
              <span className="mt-0.5 block text-sm text-gray-500">
                331 张结构模式图，点图高亮结构并显示考点
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </>
  );
}
