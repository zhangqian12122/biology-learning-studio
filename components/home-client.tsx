'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CircleAlert,
  FlaskConical,
  Search,
  Target,
} from 'lucide-react';

import {
  configureProgressQuestions,
  useLocalProgress,
} from '@/lib/progress';
import { experimentOrder, questionSource, textbooks, type BookId, type Question } from '@/lib/curriculum';
import type { GlobalStats } from '@/lib/queries';
import { cn } from '@/lib/utils';

function practiceHref(bookId?: BookId, mode?: 'review' | 'smart') {
  const params = new URLSearchParams();
  if (bookId) params.set('book', bookId);
  if (mode) params.set('mode', mode);
  const query = params.toString();
  return query ? `/practice?${query}` : '/practice';
}

export function HomeClient({
  questions,
  stats,
}: {
  questions: Question[];
  stats: GlobalStats;
}) {
  const [selectedBook, setSelectedBook] = useState<BookId>('molecules');
  const [searchQuery, setSearchQuery] = useState('');
  configureProgressQuestions(questions);
  const answers = useLocalProgress();

  const questionsByBook = useMemo(() => {
    const byBook = new Map<string, Question[]>();
    for (const question of questions) {
      const list = byBook.get(question.bookId) ?? [];
      list.push(question);
      byBook.set(question.bookId, list);
    }
    return byBook;
  }, [questions]);

  const bookQuestions = questionsByBook.get(selectedBook) ?? [];
  const completedByBook = useMemo(() => {
    const result = {} as Record<BookId, number>;
    for (const book of textbooks) {
      const list = questionsByBook.get(book.id) ?? [];
      result[book.id] = list.filter((question) => answers[question.id] !== undefined).length;
    }
    return result;
  }, [answers, questionsByBook]);

  const wrongIds = useMemo(
    () =>
      new Set(
        questions
          .filter((question) => {
            const answer = answers[question.id];
            return answer !== undefined && answer !== question.answer;
          })
          .map((question) => question.id),
      ),
    [answers, questions],
  );
  const wrongByBook = useMemo(() => {
    const result = {} as Record<BookId, number>;
    for (const book of textbooks) {
      const list = questionsByBook.get(book.id) ?? [];
      result[book.id] = list.filter((question) => wrongIds.has(question.id)).length;
    }
    return result;
  }, [questionsByBook, wrongIds]);

  const completedCount = Object.keys(answers).length;
  const correctCount = questions.filter(
    (question) => answers[question.id] === question.answer,
  ).length;
  const overallProgress = questions.length
    ? Math.round((completedCount / questions.length) * 100)
    : 0;

  const selectedBookData = textbooks.find((book) => book.id === selectedBook) ?? textbooks[0];
  const selectedBookCompleted = completedByBook[selectedBook] ?? 0;
  const selectedBookWrong = wrongByBook[selectedBook] ?? 0;
  const selectedBookUnfinished = bookQuestions.length - selectedBookCompleted;
  const selectedBookProgress = bookQuestions.length
    ? Math.round((selectedBookCompleted / bookQuestions.length) * 100)
    : 0;
  const firstUnfinished = bookQuestions.find(
    (question) => answers[question.id] === undefined,
  );

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
      <aside className="order-2 self-start rounded-lg border border-[#d5e4e5] bg-[#f9fcfc] p-3 lg:order-1 lg:sticky lg:top-5">
        <div className="px-2 pb-3">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[#66858b]">教材地图</p>
          <p className="mt-1 text-xs leading-5 text-[#6b888e]">
            选一本教材，从未完成的原创题开始。
          </p>
        </div>
        <div className="border-t border-[#dce9e9] pt-3">
          <div className="mb-2 flex items-center justify-between px-2">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[#66858b]">五册教材</p>
            <BookOpen className="size-3.5 text-[#66858b]" aria-hidden="true" />
          </div>
          <div className="grid gap-1">
            {textbooks.map((book) => {
              const BookIcon = book.icon;
              const active = selectedBook === book.id;
              const total = (questionsByBook.get(book.id) ?? []).length;
              return (
                <Link
                  key={book.id}
                  href={practiceHref(book.id)}
                  onClick={() => setSelectedBook(book.id)}
                  className={cn(
                    'flex min-h-12 items-center gap-2 rounded-md border px-2.5 text-left transition-colors',
                    active
                      ? 'border-[#abd9d5] bg-white shadow-sm'
                      : 'border-transparent hover:border-[#d6e6e6] hover:bg-white/70',
                  )}
                >
                  <span
                    className={cn(
                      'flex size-7 shrink-0 items-center justify-center rounded-md border',
                      book.color,
                    )}
                  >
                    <BookIcon className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] text-[#6c858a]">{book.volume}</span>
                    <span className="block truncate text-xs font-medium text-[#34535a]">
                      {book.title}
                    </span>
                  </span>
                  <span className="shrink-0 text-[10px] text-[#6c858a]">
                    {completedByBook[book.id] ?? 0}/{total}
                    {wrongByBook[book.id] ? (
                      <span className="ml-1 font-semibold text-[#b4552f]">
                        错{wrongByBook[book.id]}
                      </span>
                    ) : null}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      <div className="order-1 min-w-0 lg:order-2">
        <div className="mb-5">
          <p className="text-xs font-semibold tracking-[0.1em] text-[#398086]">
            BIOLOGY COURSE MAP
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal text-[#13333a] sm:text-3xl">
            从教材到考试，选择要学的内容。
          </h1>
        </div>

        <div className="space-y-5">
          <section className="rounded-lg border border-[#cfe0e0] bg-[#fbfdfd] p-4 shadow-[0_12px_30px_rgba(18,65,72,0.06)] sm:p-5">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)] lg:items-end">
              <div>
                <p className="text-sm font-medium text-[#295c64]">
                  按五册教材顺序进入，或直接搜索你要复习的知识点。
                </p>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66858b]">
                  题库由老师与同学共同建设：共享题库现有 {stats.activeCount} 道原创题，老师可随时增补修订；
                  五册教材均配有过程动画互动实验，共 {experimentOrder.length} 个。
                </p>
              </div>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold tracking-[0.08em] text-[#66858b]">
                  搜索课堂内容
                </span>
                <span className="flex h-11 items-center gap-2 rounded-md border border-[#cddfdf] bg-white px-3 shadow-sm transition-shadow focus-within:ring-3 focus-within:ring-[#b8dfda]">
                  <Search className="size-4 shrink-0 text-[#a77724]" aria-hidden="true" />
                  <input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="如：细胞、遗传、生态、发酵"
                    className="min-w-0 flex-1 bg-transparent text-sm text-[#264950] outline-none placeholder:text-[#94a9ad]"
                    type="search"
                  />
                </span>
              </label>
            </div>
          </section>

          <section aria-labelledby="course-entry-title">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.08em] text-[#66858b]">课堂入口</p>
                <h2 id="course-entry-title" className="mt-1 text-lg font-semibold">
                  从教材模块开始
                </h2>
              </div>
              <span className="text-xs text-[#6c888d]">{visibleTextbooks.length} 册可进入</span>
            </div>

            {visibleTextbooks.length ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleTextbooks.map((book, index) => {
                  const BookIcon = book.icon;
                  const total = (questionsByBook.get(book.id) ?? []).length;
                  return (
                    <Link
                      key={book.id}
                      href={practiceHref(book.id)}
                      onClick={() => setSelectedBook(book.id)}
                      className="group flex min-h-[230px] flex-col rounded-lg border border-[#d0dfdf] bg-[#f9fcfc] p-4 text-left shadow-sm transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-[#97cbc6] hover:shadow-[0_10px_22px_rgba(18,65,72,0.10)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#b8dfda]"
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
                      <p className="mt-4 text-xs text-[#6a878d]">{book.volume}</p>
                      <h3 className="mt-1 text-lg font-semibold text-[#1d444c]">{book.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#5b777d]">{book.summary}</p>
                      <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#6b888d]">
                        {book.modules.join(' · ')}
                      </p>
                      <span className="mt-auto inline-flex items-center justify-between gap-2 pt-4 text-sm font-medium text-[#126b73]">
                        继续本册（{completedByBook[book.id] ?? 0}/{total}）
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
              <div className="rounded-lg border border-dashed border-[#c9dddd] bg-[#f9fcfc] px-4 py-8 text-center text-sm text-[#6b888d]">
                没有匹配的教材关键词，试试“细胞”“遗传”或“生态”。
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
            <section className="rounded-lg border border-[#cfe0e0] bg-[#f9fcfc] p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold tracking-[0.08em] text-[#67858b]">
                    当前学习路径
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-[#173b42]">
                    {selectedBookData.volume} · {selectedBookData.title}
                  </h2>
                </div>
                <span className="rounded-full bg-[#e8f4f3] px-3 py-1.5 text-xs font-medium text-[#166c70]">
                  已完成 {selectedBookCompleted}/{bookQuestions.length}
                </span>
              </div>
              <div
                className="mt-4 h-2 overflow-hidden rounded-full bg-[#deeeee]"
                aria-label={`本册完成度 ${selectedBookProgress}%`}
              >
                <div
                  className="h-full rounded-full bg-[#198487] transition-[width]"
                  style={{ width: `${selectedBookProgress}%` }}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-[#46666d]">
                {selectedBookUnfinished > 0
                  ? `本册还有 ${selectedBookUnfinished} 题未完成，从「${
                      firstUnfinished?.topic ?? selectedBookData.modules[0]
                    }」继续。`
                  : selectedBookWrong > 0
                    ? `本册已全部作答，${selectedBookWrong} 题答错，建议先复习错因。`
                    : bookQuestions.length
                      ? '本册题目已全部答对，可回顾讲解巩固。'
                      : '本册暂无题目，老师可以在教师中心补充。'}
              </p>
              <ol className="mt-5 grid gap-3 sm:grid-cols-3">
                {selectedBookData.modules.map((module, index) => {
                  const moduleQuestionCount = questions.filter(
                    (question) =>
                      question.bookId === selectedBook && question.module === module,
                  ).length;
                  return (
                    <li
                      key={module}
                      className="border-l border-[#cfe1e0] pl-3 text-sm leading-6 text-[#46666d]"
                    >
                      <span className="mb-1 block text-xs text-[#719096]">
                        0{index + 1} · {moduleQuestionCount} 题
                      </span>
                      {module}
                    </li>
                  );
                })}
              </ol>
              <div className="mt-5 flex flex-wrap gap-3">
                {selectedBookUnfinished > 0 ? (
                  <Link
                    href={practiceHref(selectedBook)}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#0e6f75] px-4 text-sm font-medium text-white transition-colors hover:bg-[#0c5f64] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#b8dfda]"
                  >
                    继续本册练习
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                ) : selectedBookWrong > 0 ? (
                  <Link
                    href={practiceHref(selectedBook, 'review')}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#0e6f75] px-4 text-sm font-medium text-white transition-colors hover:bg-[#0c5f64] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#b8dfda]"
                  >
                    复习本册错题（{selectedBookWrong}）
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                ) : (
                  <Link
                    href={practiceHref(selectedBook)}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#0e6f75] px-4 text-sm font-medium text-white transition-colors hover:bg-[#0c5f64] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#b8dfda]"
                  >
                    回顾本册题目
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                )}
                {wrongIds.size > 0 ? (
                  <Link
                    href={practiceHref(undefined, 'review')}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#e4c4a8] bg-[#fff8f2] px-4 text-sm font-medium text-[#a4533b] transition-colors hover:bg-[#fdeee6]"
                  >
                    <CircleAlert className="size-3.5" aria-hidden="true" />
                    全部错题复习（{wrongIds.size}）
                  </Link>
                ) : null}
                    <Link
                      href="/lab"
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#cbdede] bg-white px-4 text-sm font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
                    >
                      打开互动实验
                      <FlaskConical className="size-3.5" aria-hidden="true" />
                    </Link>
                  </div>
            </section>

            <section className="rounded-lg border border-[#cfe0e0] bg-[#f9fcfc] p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <BrainCircuit className="size-4 text-[#0d7479]" aria-hidden="true" />
                <h2 className="text-sm font-semibold">学习记录</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#67848a]">
                个人进度只存于当前浏览器；答题的匿名统计会进入共享题库，帮助老师改进题目。
              </p>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <strong className="text-3xl leading-none text-[#146e73]">
                    {overallProgress}
                  </strong>
                  <span className="ml-1 text-sm font-medium text-[#55747a]">%</span>
                </div>
                <p className="text-right text-sm text-[#55747a]">
                  {completedCount} 题已完成
                  <br />
                  {correctCount} 题答对
                </p>
              </div>
              <div
                className="mt-4 h-2 overflow-hidden rounded-full bg-[#deeeee]"
                aria-label={`总完成度 ${overallProgress}%`}
              >
                <div
                  className="h-full rounded-full bg-[#d39a2b] transition-[width]"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-[#5b777d]">
                <div className="rounded-md bg-[#eef7f6] px-3 py-2">
                  <dt className="text-[#6d898f]">共享题库</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-[#146e73]">
                    {stats.activeCount} 题
                  </dd>
                </div>
                <div className="rounded-md bg-[#eef7f6] px-3 py-2">
                  <dt className="text-[#6d898f]">全站已作答</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-[#146e73]">
                    {stats.totalAnswers} 次
                    {stats.correctRate != null ? ` · 正确率 ${stats.correctRate}%` : ''}
                  </dd>
                </div>
              </dl>
              <p className="mt-3 text-xs leading-5 text-[#6d898f]">
                {wrongIds.size > 0
                  ? `还有 ${wrongIds.size} 道错题待复习，可在「当前学习路径」一键进入。`
                  : '目前没有错题记录，答错的题会自动收进错题复习。'}
              </p>
            </section>
          </div>

          <section className="rounded-lg border border-[#cfe0e0] bg-[#fbfdfd] p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <Target className="size-4 text-[#0d7479]" aria-hidden="true" />
              <h2 className="text-sm font-semibold">本册题目分布</h2>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {textbooks.map((book) => {
                const list = questionsByBook.get(book.id) ?? [];
                return (
                  <div key={book.id} className="rounded-md border border-[#dceaea] bg-white p-3">
                    <p className="text-xs font-medium text-[#34535a]">
                      {book.volume} · {book.title}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[#146e73]">{list.length} 题</p>
                    <ul className="mt-2 space-y-1 text-[11px] leading-4 text-[#6b888d]">
                      {book.modules.map((module) => (
                        <li key={module} className="flex items-center justify-between gap-2">
                          <span className="truncate">{module}</span>
                          <span className="shrink-0 font-semibold text-[#46666d]">
                            {
                              list.filter((question) => question.module === module).length
                            }
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 text-[10px] text-[#8aa3a7]">
                      首题示例：{
                        list[0]
                          ? `${list[0].topic}（${questionSource(list[0].bookId)}）`
                          : '待老师补充'
                      }
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
