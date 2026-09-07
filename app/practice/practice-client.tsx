'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  Check,
  CircleAlert,
  CircleHelp,
  Sparkles,
} from 'lucide-react';

import { recordAnswer } from '@/app/actions';
import { NbHero } from '@/components/nb-hero';
import {
  configureProgressQuestions,
  getClientId,
  saveLocalProgress,
  useLocalProgress,
} from '@/lib/progress';
import { questionSource, textbooks, type BookId, type Question } from '@/lib/curriculum';
import type { QuestionStat } from '@/lib/queries';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PracticeMode = 'all' | 'review' | 'smart';

const BOOK_IDS: BookId[] = ['molecules', 'genetics', 'regulation', 'ecology', 'technology'];

const MODE_META: Record<PracticeMode, { label: string; title: string }> = {
  all: { label: '全部题库', title: '按本册连续练习' },
  review: { label: '错题复习', title: '错题复习 · 只练答错的题' },
  smart: { label: '智能练习', title: '智能练习 · 按薄弱程度排序' },
};

export function PracticeClient({
  questions,
  globalStats,
}: {
  questions: Question[];
  globalStats: Record<string, QuestionStat>;
}) {
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('all');
  const [selectedBook, setSelectedBook] = useState<BookId>('molecules');
  const [questionId, setQuestionId] = useState('');
  const [reviewRetriedIds, setReviewRetriedIds] = useState<Record<string, true>>({});
  const [clearedQuestionId, setClearedQuestionId] = useState<string | null>(null);

  configureProgressQuestions(questions);
  const answers = useLocalProgress();

  // 支持从首页/分享链接直达：/practice?book=genetics&mode=review
  useEffect(() => {
    let cancelled = false;
    const applyParams = async () => {
      // 等待一个微任务，避免在 effect 内同步 setState
      await Promise.resolve();
      if (cancelled) return;
      const params = new URLSearchParams(window.location.search);
      const book = params.get('book');
      if (book && (BOOK_IDS as string[]).includes(book)) {
        setSelectedBook(book as BookId);
      }
      const mode = params.get('mode');
      if (mode === 'review' || mode === 'smart') {
        setPracticeMode(mode);
      }
    };
    void applyParams();
    return () => {
      cancelled = true;
    };
  }, []);

  const questionsByBook = useMemo(() => {
    const byBook = new Map<string, Question[]>();
    for (const question of questions) {
      const list = byBook.get(question.bookId) ?? [];
      list.push(question);
      byBook.set(question.bookId, list);
    }
    return byBook;
  }, [questions]);

  const bookQuestions = useMemo(() => {
    const list = questionsByBook.get(selectedBook) ?? [];
    return list.length ? list : questions;
  }, [questions, questionsByBook, selectedBook]);

  const wrongQuestionIds = useMemo(
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
  const wrongCount = wrongQuestionIds.size;
  const wrongCountByBook = useMemo(() => {
    const result = {} as Record<BookId, number>;
    for (const book of textbooks) {
      const list = questionsByBook.get(book.id) ?? [];
      result[book.id] = list.filter((question) => wrongQuestionIds.has(question.id)).length;
    }
    return result;
  }, [questionsByBook, wrongQuestionIds]);

  // 智能练习：个人错题优先，其次参考全站错误率（小样本做平滑），再做未做题。
  const smartOrder = useMemo(() => {
    if (practiceMode !== 'smart') return questions;
    const scored = questions.map((question) => {
      const answer = answers[question.id];
      const personalWrong = answer !== undefined && answer !== question.answer ? 1 : 0;
      const stat = globalStats[question.id];
      const attempts = stat?.attempts ?? 0;
      const globalRate = ((stat?.wrongCount ?? 0) + 1) / (attempts + 3);
      const unansweredBonus = answer === undefined ? 1.5 : 0;
      const score = personalWrong * 3 + globalRate * 2 + unansweredBonus;
      return { id: question.id, score };
    });
    const orderById = new Map(scored.map((item) => [item.id, item.score]));
    return [...questions].sort(
      (left, right) => (orderById.get(right.id) ?? 0) - (orderById.get(left.id) ?? 0),
    );
  }, [answers, globalStats, practiceMode, questions]);

  const activeQuestions =
    practiceMode === 'review'
      ? bookQuestions.filter((question) => wrongQuestionIds.has(question.id))
      : practiceMode === 'smart'
        ? smartOrder
        : bookQuestions;
  const navQuestions = practiceMode === 'all' ? bookQuestions : activeQuestions;

  const currentQuestion = useMemo(() => {
    const pool = practiceMode === 'smart' ? smartOrder : bookQuestions;
    return (
      pool.find((question) => question.id === questionId) ??
      activeQuestions[0] ??
      pool[0] ??
      questions[0]
    );
  }, [activeQuestions, bookQuestions, practiceMode, questionId, questions, smartOrder]);

  if (!currentQuestion) {
    return (
      <div className="rounded-lg border-2 border-dashed border-[#9db8bc] bg-white px-4 py-10 text-center text-sm text-[#6b888d]">
        共享题库暂无可用题目，请稍后再试或由老师在教师中心补充。
      </div>
    );
  }

  const currentAnswer = answers[currentQuestion.id];
  const answerIsCorrect = currentAnswer === currentQuestion.answer;
  const currentQuestionPosition = Math.max(
    0,
    bookQuestions.findIndex((question) => question.id === currentQuestion.id),
  );
  const currentIsWrong = wrongQuestionIds.has(currentQuestion.id);
  const reviewRetried = reviewRetriedIds[currentQuestion.id] === true;
  const reviewClearedCurrent =
    practiceMode === 'review' && clearedQuestionId === currentQuestion.id;
  const answerRevealed =
    currentAnswer !== undefined &&
    (practiceMode !== 'review' || reviewRetried || reviewClearedCurrent);
  const reviewPosition = activeQuestions.findIndex(
    (question) => question.id === currentQuestion.id,
  );
  const smartPosition = smartOrder.findIndex((question) => question.id === currentQuestion.id);

  const completedByBook = Object.fromEntries(
    textbooks.map((book) => {
      const list = questionsByBook.get(book.id) ?? [];
      return [book.id, list.filter((question) => answers[question.id] !== undefined).length];
    }),
  ) as Record<BookId, number>;
  const selectedBookData = textbooks.find((book) => book.id === selectedBook) ?? textbooks[0];
  const selectedBookQuestions = questionsByBook.get(selectedBook) ?? [];
  const selectedBookCompleted = completedByBook[selectedBook] ?? 0;
  const selectedBookCorrect = selectedBookQuestions.filter(
    (question) => answers[question.id] === question.answer,
  ).length;
  const selectedBookProgress = selectedBookQuestions.length
    ? Math.round((selectedBookCompleted / selectedBookQuestions.length) * 100)
    : 0;

  const completedCount = Object.keys(answers).length;
  const correctCount = questions.filter(
    (question) => answers[question.id] === question.answer,
  ).length;
  const overallProgress = questions.length
    ? Math.round((completedCount / questions.length) * 100)
    : 0;
  const mistakeTags = Array.from(
    new Set(
      questions
        .filter((question) => wrongQuestionIds.has(question.id))
        .map((question) => question.tag),
    ),
  );
  const firstWrongBook = textbooks.find((book) => wrongCountByBook[book.id] > 0);

  function switchPracticeMode(mode: PracticeMode) {
    if (mode === practiceMode) return;
    setClearedQuestionId(null);
    setPracticeMode(mode);

    if (mode === 'review') {
      const firstWrong = bookQuestions.find((question) => wrongQuestionIds.has(question.id));
      if (firstWrong) setQuestionId(firstWrong.id);
      return;
    }
    if (mode === 'smart') {
      setQuestionId(smartOrder[0]?.id ?? '');
      return;
    }
    const firstUnanswered = bookQuestions.find(
      (question) => answers[question.id] === undefined,
    );
    setQuestionId((firstUnanswered ?? bookQuestions[0] ?? questions[0]).id);
  }

  function openBook(bookId: BookId) {
    const nextQuestions =
      practiceMode === 'review'
        ? (questionsByBook.get(bookId) ?? []).filter((question) =>
            wrongQuestionIds.has(question.id),
          )
        : (questionsByBook.get(bookId) ?? []);
    const fallback = (questionsByBook.get(bookId) ?? [])[0];
    const firstUnanswered = (questionsByBook.get(bookId) ?? []).find(
      (question) => answers[question.id] === undefined,
    );
    const target = practiceMode === 'review' ? nextQuestions[0] : (firstUnanswered ?? nextQuestions[0]);

    setSelectedBook(bookId);
    setClearedQuestionId(null);
    setQuestionId((target ?? fallback ?? questions[0]).id);
  }

  function answerQuestion(optionIndex: number) {
    const isRetry = practiceMode === 'review' && currentIsWrong;
    if (!isRetry && currentAnswer !== undefined) return;

    if (isRetry) {
      setReviewRetriedIds((prev) => ({ ...prev, [currentQuestion.id]: true }));
      setClearedQuestionId(
        optionIndex === currentQuestion.answer ? currentQuestion.id : null,
      );
    }

    saveLocalProgress({ ...answers, [currentQuestion.id]: optionIndex });
    void recordAnswer({
      clientId: getClientId(),
      questionId: currentQuestion.id,
      chosen: optionIndex,
      mode: practiceMode,
    }).catch(() => {
      // 匿名统计上报失败时静默：本机进度已保存，体验不受影响。
    });
  }

  function moveToNextQuestion() {
    if (practiceMode === 'smart') {
      const position = smartOrder.findIndex((question) => question.id === currentQuestion.id);
      const next = smartOrder[(position + 1) % smartOrder.length] ?? smartOrder[0];
      if (next) setQuestionId(next.id);
      return;
    }

    if (practiceMode === 'review') {
      const currentPos = bookQuestions.findIndex(
        (question) => question.id === currentQuestion.id,
      );
      const next =
        activeQuestions.find(
          (question) =>
            bookQuestions.findIndex((bookQuestion) => bookQuestion.id === question.id) >
            currentPos,
        ) ?? activeQuestions[0];
      if (next) {
        setClearedQuestionId(null);
        setQuestionId(next.id);
      }
      return;
    }

    const nextQuestion =
      bookQuestions[(currentQuestionPosition + 1) % bookQuestions.length] ??
      bookQuestions[0] ??
      questions[0];
    setQuestionId(nextQuestion.id);
  }

  const screenTitle =
    practiceMode === 'review'
      ? MODE_META.review.title
      : practiceMode === 'smart'
        ? MODE_META.smart.title
        : '做题以后，知道错在哪里';

  return (
    <div>
      <NbHero
        badge="BIOLOGY PRACTICE · 题库与错题"
        title={screenTitle}
        description={
          <>
            共 {questions.length} 道原创题覆盖五册教材：作答后立即显示判题依据；
            答错的题自动收进错题本并按错因归类，智能练习会优先推送薄弱知识点。
          </>
        }
        stats={[`原创题 ${questions.length} 道`, `错题本 ${wrongCount} 道`, `三种练习模式`]}
        icon={BrainCircuit}
      />

      <div className="space-y-5">
        <section className="nb-card p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-[0.08em] text-[#67858b]">教材选择</p>
              <h2 className="mt-1 text-lg font-bold text-[#173b42]">
                {MODE_META[practiceMode].title}
              </h2>
            </div>
            <div
              className="flex flex-wrap items-center gap-1.5"
              aria-label="练习模式切换"
            >
              {(Object.keys(MODE_META) as PracticeMode[]).map((mode) => {
                const modeActive = practiceMode === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => switchPracticeMode(mode)}
                    aria-pressed={modeActive}
                    className={cn(
                      'nb-pill h-8 px-3 text-xs font-semibold',
                      modeActive
                        ? mode === 'review'
                          ? 'nb-pill-active !bg-[#b4552f]'
                          : mode === 'smart'
                            ? 'nb-pill-active !bg-[#5b64c7]'
                            : 'nb-pill-active'
                        : 'text-[#59767c]',
                    )}
                  >
                    {MODE_META[mode].label}
                    {mode === 'review' && wrongCount ? `（${wrongCount}）` : ''}
                  </button>
                );
              })}
            </div>
          </div>

          {practiceMode === 'smart' ? (
            <p className="mt-4 rounded-lg border-2 border-[#13333a] bg-[#f3f5fd] px-3 py-2.5 text-xs leading-5 text-[#4a5590] shadow-[3px_3px_0_#c6d4d4]">
              <Sparkles className="mr-1 inline size-3.5" aria-hidden="true" />
              正在对全库 {smartOrder.length} 道题排序：你的错题优先，其次是全站错误率较高和未做过的题；
              答题后顺序会实时更新。
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-3 xl:grid-cols-5">
              {textbooks.map((book) => {
                const BookIcon = book.icon;
                const active = book.id === selectedBook;
                const total = (questionsByBook.get(book.id) ?? []).length;
                return (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => openBook(book.id)}
                    aria-pressed={active}
                    className={cn(
                      'flex min-h-14 items-center gap-2 rounded-lg border-2 px-3 text-left transition-all',
                      active
                        ? 'border-[#0e6f75] bg-white text-[#0a626a] shadow-[4px_4px_0_#9fd4cd]'
                        : 'border-[#13333a] bg-white text-[#537078] shadow-[3px_3px_0_#c6d4d4] hover:shadow-[4px_4px_0_#b8c9c9]',
                    )}
                  >
                    <BookIcon className="size-4 shrink-0" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-semibold">{book.title}</span>
                      <span className="block text-[10px] opacity-75">
                        {practiceMode === 'review'
                          ? wrongCountByBook[book.id]
                            ? `${wrongCountByBook[book.id]} 道错题`
                            : '暂无错题'
                          : `${completedByBook[book.id] ?? 0}/${total} 已完成`}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <section className="nb-card overflow-hidden">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b-2 border-[#13333a] bg-[#f4faf9] px-4 py-4 sm:px-5">
              <div>
                <p className="text-xs font-semibold tracking-[0.08em] text-[#67858b]">
                  原创题库 · {questionSource(currentQuestion.bookId)} · {currentQuestion.module}
                </p>
                <h2 className="mt-1 text-lg font-bold text-[#173b42]">
                  {currentQuestion.topic}
                </h2>
              </div>
              {practiceMode === 'review' ? (
                <span className="nb-pill px-3 py-1.5 text-xs font-bold text-[#a4533b]">
                  {activeQuestions.length
                    ? `错题 ${Math.max(0, reviewPosition) + 1} / ${activeQuestions.length}`
                    : '错题复习'}
                </span>
              ) : practiceMode === 'smart' ? (
                <span className="nb-pill px-3 py-1.5 text-xs font-bold text-[#4a5590]">
                  智能排序 {Math.max(0, smartPosition) + 1} / {smartOrder.length}
                </span>
              ) : (
                <span className="nb-pill px-3 py-1.5 text-xs font-semibold text-[#166c70]">
                  本册第 {currentQuestionPosition + 1} / {bookQuestions.length} 题
                </span>
              )}
            </div>

            <div className="p-4 sm:p-5">
              {practiceMode === 'review' &&
              activeQuestions.length === 0 &&
              !reviewClearedCurrent ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex size-11 items-center justify-center rounded-full border-2 border-[#13333a] bg-[#edf9f1] shadow-[3px_3px_0_#c6d4d4]">
                    <Check className="size-5 text-[#287248]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-base font-bold text-[#1d444c]">
                    {wrongCount === 0 ? '错题本是空的' : '本册暂无错题'}
                  </h3>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#67848a]">
                    {wrongCount === 0
                      ? '在全部题库中答错的题，会自动收进这里并附上错因归类；现在先去练习吧。'
                      : `其他册还有 ${wrongCount} 道错题，可以直接前往复习。`}
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {firstWrongBook ? (
                      <Button size="sm" onClick={() => openBook(firstWrongBook.id)}>
                        复习{firstWrongBook.title}错题（{wrongCountByBook[firstWrongBook.id]}）
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Button>
                    ) : null}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => switchPracticeMode('all')}
                      className="border-[#cbdede] bg-white text-[#366169] hover:bg-[#eef7f7]"
                    >
                      返回全部题库
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {navQuestions.length ? (
                    <div
                      className="mb-5 flex flex-wrap items-center gap-2"
                      aria-label={
                        practiceMode === 'review'
                          ? '错题导航'
                          : practiceMode === 'smart'
                            ? '智能练习导航'
                            : '本册题目导航'
                      }
                    >
                      {navQuestions.map((question, index) => {
                        const originalIndex = bookQuestions.findIndex(
                          (bookQuestion) => bookQuestion.id === question.id,
                        );
                        const answer = answers[question.id];
                        const isCurrent = question.id === currentQuestion.id;
                        const isCorrect = answer === question.answer;
                        const isWrong = answer !== undefined && !isCorrect;
                        const dotLabel =
                          practiceMode === 'smart'
                            ? `第 ${index + 1} 题：${question.topic}（${
                                isCorrect ? '已答对' : isWrong ? '曾答错' : '未作答'
                              }）`
                            : `第 ${originalIndex + 1} 题：${question.topic}${
                                practiceMode === 'review' ? '（错题）' : ''
                              }`;
                        return (
                          <button
                            key={question.id}
                            type="button"
                            onClick={() => {
                              setClearedQuestionId(null);
                              setQuestionId(question.id);
                            }}
                            aria-label={dotLabel}
                            title={dotLabel}
                            className={cn(
                              'flex size-9 items-center justify-center rounded-lg border-2 text-xs font-bold transition-all',
                              isCurrent
                                ? 'border-[#13333a] bg-[#0e7779] text-white shadow-[3px_3px_0_#13333a]'
                                : isWrong
                                  ? 'border-[#13333a] bg-[#fff2ed] text-[#a4533b] shadow-[2px_2px_0_#c6d4d4]'
                                  : isCorrect
                                    ? 'border-[#13333a] bg-[#edf9f1] text-[#287248] shadow-[2px_2px_0_#c6d4d4]'
                                    : 'border-[#13333a] bg-white text-[#658289] shadow-[2px_2px_0_#c6d4d4] hover:shadow-[3px_3px_0_#b8c9c9]',
                            )}
                          >
                            {practiceMode === 'smart' ? index + 1 : originalIndex + 1}
                          </button>
                        );
                      })}
                    </div>
                  ) : null}

                  <p className="text-base font-medium leading-7 text-[#24464d]">
                    {currentQuestion.prompt}
                  </p>
                  <div className="mt-5 grid gap-2.5">
                    {currentQuestion.options.map((option, index) => {
                      const chosen = currentAnswer === index;
                      const correct = answerRevealed && index === currentQuestion.answer;
                      const incorrect = answerRevealed && chosen && !answerIsCorrect;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => answerQuestion(index)}
                          disabled={
                            practiceMode === 'review'
                              ? !currentIsWrong
                              : currentAnswer !== undefined
                          }
                          className={cn(
                            'flex min-h-12 items-center gap-3 rounded-lg border-2 px-3 text-left text-sm transition-all disabled:cursor-default',
                            correct
                              ? 'border-[#2c6e4c] bg-[#edf9f1] text-[#226341] shadow-[3px_3px_0_#a8d5b8]'
                              : incorrect
                                ? 'border-[#a4533b] bg-[#fff2ed] text-[#9b4e39] shadow-[3px_3px_0_#ecc7b8]'
                                : !answerRevealed && chosen
                                  ? 'border-dashed border-[#c07840] bg-[#fff8f2] text-[#8a5a36]'
                                  : 'border-[#13333a] bg-white text-[#46666d] shadow-[3px_3px_0_#c6d4d4] hover:shadow-[4px_4px_0_#b8c9c9]',
                          )}
                        >
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="min-w-0">{option}</span>
                          {correct ? (
                            <Check
                              className="ml-auto size-4 shrink-0"
                              aria-label="正确答案"
                            />
                          ) : null}
                          {incorrect ? (
                            <CircleAlert
                              className="ml-auto size-4 shrink-0"
                              aria-label="所选答案错误"
                            />
                          ) : null}
                          {!answerRevealed && chosen ? (
                            <span className="ml-auto shrink-0 text-[11px] font-medium text-[#b4552f]">
                              上次选择
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>

                  {reviewClearedCurrent ? (
                    <div className="mt-5 border-l-2 border-[#4ca878] pl-3">
                      <p className="text-xs font-semibold text-[#2e7e50]">
                        {activeQuestions.length
                          ? '回答正确，已移出错题本'
                          : '回答正确，本册错题已清空'}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#4c6d73]">
                        {currentQuestion.explanation}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeQuestions.length ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={moveToNextQuestion}
                            className="border-[#cbdede] bg-white text-[#366169] hover:bg-[#eef7f7]"
                          >
                            下一道错题（剩 {activeQuestions.length} 题）
                            <ArrowRight className="size-3.5" aria-hidden="true" />
                          </Button>
                        ) : null}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => switchPracticeMode('all')}
                          className="border-[#cbdede] bg-white text-[#366169] hover:bg-[#eef7f7]"
                        >
                          返回全部题库
                        </Button>
                      </div>
                    </div>
                  ) : currentAnswer !== undefined && answerRevealed ? (
                    <div
                      className={cn(
                        'mt-5 border-l-2 pl-3',
                        answerIsCorrect ? 'border-[#4ca878]' : 'border-[#d97351]',
                      )}
                    >
                      <p
                        className={cn(
                          'text-xs font-semibold',
                          answerIsCorrect ? 'text-[#2e7e50]' : 'text-[#ad553d]',
                        )}
                      >
                        {answerIsCorrect
                          ? '判断正确'
                          : `错因已记录：${currentQuestion.tag}`}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#4c6d73]">
                        {currentQuestion.explanation}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={moveToNextQuestion}
                        className="mt-4 border-[#cbdede] bg-white text-[#366169] hover:bg-[#eef7f7]"
                      >
                        下一题
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Button>
                    </div>
                  ) : currentAnswer !== undefined ? (
                    <div className="mt-5 border-l-2 border-[#dfa678] pl-3">
                      <p className="text-xs font-semibold text-[#a4533b]">
                        上次错因：{currentQuestion.tag} · 上次选择{' '}
                        {String.fromCharCode(65 + currentAnswer)}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#4c6d73]">
                        这是你之前答错的题。先重新选一个答案验证，答对后会自动移出错题本。
                      </p>
                    </div>
                  ) : (
                    <p className="mt-4 text-xs text-[#6f8b90]">
                      {practiceMode === 'review'
                        ? '选择一个答案重新验证；答对后这道题会移出错题本。'
                        : '选择一个答案后，会显示判题依据；错因会保存到这台浏览器。'}
                    </p>
                  )}
                </>
              )}
            </div>
          </section>

          <aside className="space-y-5">
            <section className="nb-card p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <BrainCircuit className="size-4 text-[#0d7479]" aria-hidden="true" />
                <h2 className="text-sm font-semibold">
                  {practiceMode === 'smart' ? '全库进度' : `${selectedBookData.title}进度`}
                </h2>
              </div>
              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <strong className="text-3xl leading-none text-[#146e73]">
                    {practiceMode === 'smart' ? overallProgress : selectedBookProgress}
                  </strong>
                  <span className="ml-1 text-sm font-medium text-[#55747a]">%</span>
                </div>
                <p className="text-right text-sm text-[#55747a]">
                  {practiceMode === 'smart'
                    ? `${completedCount} 题已完成
${correctCount} 题答对`
                    : `${selectedBookCompleted} 题已完成
${selectedBookCorrect} 题答对`}
                </p>
              </div>
              <div
                className="nb-progress mt-4 h-3.5"
                aria-label={practiceMode === 'smart' ? `全库完成度 ${overallProgress}%` : `本册完成度 ${selectedBookProgress}%`}
              >
                <div
                  className="nb-progress-fill"
                  style={{
                    width: `${practiceMode === 'smart' ? overallProgress : selectedBookProgress}%`,
                  }}
                />
              </div>
              <p className="mt-4 text-xs leading-5 text-[#6d898f]">
                {practiceMode === 'smart'
                  ? '智能练习的排序会随个人作答与全站统计实时变化。'
                  : '题目顺序可以自由切换；已做题会以绿、橙状态标注在题目导航中。'}
              </p>
            </section>

            <section className="nb-card p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CircleHelp className="size-4 text-[#b57c16]" aria-hidden="true" />
                  <h2 className="text-sm font-semibold">错因标签</h2>
                </div>
                <span className="text-xs text-[#6d898f]">{mistakeTags.length} 项</span>
              </div>
              {mistakeTags.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {mistakeTags.map((tag) => (
                    <span
                      key={tag}
                      className="nb-pill px-2.5 py-1 text-xs font-semibold text-[#80621c]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm leading-6 text-[#67848a]">
                  答错后会按概念、变量、实验方法等原因归类，便于回看。
                </p>
              )}
            </section>

            <section className="nb-card overflow-hidden">
              <Image
                src="/images/microscope-leaf-cells.png"
                alt="显微镜下的绿色植物叶肉细胞"
                width={720}
                height={240}
                sizes="(min-width: 1280px) 33vw, 100vw"
                className="h-32 w-full border-b-2 border-[#13333a] object-cover object-center"
              />
              <div className="p-4">
                <p className="text-xs font-semibold tracking-[0.08em] text-[#67858b]">
                  本册重点
                </p>
                <p className="mt-1 text-sm leading-6 text-[#46666d]">
                  {selectedBookData.modules.join(' · ')}
                </p>
                <Link
                  href="/lab"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#126b73] hover:underline"
                >
                  去实验台动手验证
                  <ArrowRight className="size-3" aria-hidden="true" />
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
