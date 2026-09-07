'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  BrainCircuit,
  Check,
  CircleAlert,
  GraduationCap,
  ListChecks,
  LockKeyhole,
  Pencil,
  PlusCircle,
  Power,
  ShieldCheck,
} from 'lucide-react';

import {
  getTeacherData,
  loginTeacher,
  saveQuestion,
  setQuestionStatus,
  setupTeacherPasscode,
  type QuestionInput,
  type TeacherDataset,
} from '@/app/actions';
import {
  MODULE_TARGET_COUNT,
  getBook,
  questionSource,
  textbooks,
} from '@/lib/curriculum';
import { NbHero } from '@/components/nb-hero';
import { cn } from '@/lib/utils';

const SESSION_KEY = 'fujian-biology-teacher-passcode';

type TeacherTab = 'manage' | 'insight' | 'advice';

type FormState = {
  id: string | null;
  bookId: string;
  module: string;
  topic: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  tag: string;
};

const EMPTY_FORM: FormState = {
  id: null,
  bookId: 'molecules',
  module: getBook('molecules').modules[0],
  topic: '',
  prompt: '',
  options: ['', '', '', ''],
  answer: 0,
  explanation: '',
  tag: '',
};

export function TeacherClient({
  hasPasscode,
  dbOk,
}: {
  hasPasscode: boolean;
  dbOk: boolean;
}) {
  const [passcode, setPasscode] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [stage, setStage] = useState<'setup' | 'login' | 'checking' | 'dashboard'>(
    hasPasscode ? 'login' : 'setup',
  );
  const [authError, setAuthError] = useState('');
  const [dataset, setDataset] = useState<TeacherDataset | null>(null);
  const [tab, setTab] = useState<TeacherTab>('manage');
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [formNotice, setFormNotice] = useState('');
  const [busy, setBusy] = useState(false);

  async function loadDashboard(code: string) {
    const data = await getTeacherData(code);
    if (!data.dbOk) {
      setAuthError('数据库暂不可用或登录已过期，请重新登录。');
      setSessionCode('');
      try {
        window.sessionStorage.removeItem(SESSION_KEY);
      } catch {
        // ignore
      }
      setStage(hasPasscode ? 'login' : 'setup');
      return;
    }
    setDataset(data);
    setStage('dashboard');
  }

  // 挂载时恢复本标签页的教师会话（有水合安全的延迟切换，故仅在客户端执行一次）
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.sessionStorage.getItem(SESSION_KEY);
    } catch {
      stored = null;
    }
    if (!hasPasscode) return;
    if (!stored) return;
    let cancelled = false;
    const restore = async () => {
      // 等待一个微任务，避免在 effect 内同步 setState
      await Promise.resolve();
      if (cancelled) return;
      setSessionCode(stored);
      setStage('checking');
      const data = await getTeacherData(stored);
      if (cancelled) return;
      if (!data.dbOk) {
        setAuthError('数据库暂不可用或登录已过期，请重新登录。');
        setSessionCode('');
        try {
          window.sessionStorage.removeItem(SESSION_KEY);
        } catch {
          // ignore
        }
        setStage('login');
        return;
      }
      setDataset(data);
      setStage('dashboard');
    };
    void restore();
    return () => {
      cancelled = true;
    };
  }, [hasPasscode]);

  async function submitAuth(mode: 'setup' | 'login') {
    setBusy(true);
    setAuthError('');
    const code = passcode.trim();
    const result = mode === 'setup' ? await setupTeacherPasscode(code) : await loginTeacher(code);
    setBusy(false);
    if (!result.ok) {
      setAuthError(result.error ?? '操作失败，请稍后再试。');
      return;
    }
    try {
      window.sessionStorage.setItem(SESSION_KEY, code);
    } catch {
      // ignore
    }
    setSessionCode(code);
    setPasscode('');
    setStage('checking');
    await loadDashboard(code);
  }

  function logout() {
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setSessionCode('');
    setDataset(null);
    setStage(hasPasscode ? 'login' : 'setup');
  }

  function updateForm(patch: Partial<FormState>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  async function submitQuestion() {
    setBusy(true);
    setFormError('');
    setFormNotice('');
    const input: QuestionInput & { id?: string } = {
      id: form.id ?? undefined,
      bookId: form.bookId,
      module: form.module,
      topic: form.topic,
      prompt: form.prompt,
      options: form.options,
      answer: form.answer,
      explanation: form.explanation,
      tag: form.tag,
    };
    const result = await saveQuestion(sessionCode, input);
    setBusy(false);
    if (!result.ok) {
      setFormError(result.error ?? '保存失败。');
      return;
    }
    setFormNotice(form.id ? '题目已更新（版本号 +1）。' : '新题已加入共享题库，学生端立即可见。');
    setForm(EMPTY_FORM);
    const data = await getTeacherData(sessionCode);
    if (data.dbOk) setDataset(data);
  }

  async function toggleStatus(questionId: string, next: 'active' | 'retired') {
    setBusy(true);
    const result = await setQuestionStatus(sessionCode, questionId, next);
    setBusy(false);
    if (!result.ok) {
      setFormError(result.error ?? '操作失败。');
      return;
    }
    setFormNotice(next === 'retired' ? '题目已停用，学生端不再显示。' : '题目已恢复使用。');
    const data = await getTeacherData(sessionCode);
    if (data.dbOk) setDataset(data);
  }

  const questions = useMemo(() => dataset?.questions ?? [], [dataset]);
  const activeQuestions = useMemo(
    () => questions.filter((question) => question.status === 'active'),
    [questions],
  );

  const insight = useMemo(() => {
    const withAttempts = questions.filter((question) => question.stat.attempts > 0);
    const highWrong = activeQuestions.filter((question) => {
      const { attempts, wrongCount } = question.stat;
      return attempts >= 8 && wrongCount / attempts > 0.6;
    });
    const coverageGaps: { bookTitle: string; module: string; count: number }[] = [];
    for (const book of textbooks) {
      for (const moduleName of book.modules) {
        const count = activeQuestions.filter(
          (question) => question.bookId === book.id && question.module === moduleName,
        ).length;
        if (count < MODULE_TARGET_COUNT) {
          coverageGaps.push({
            bookTitle: `${book.volume} · ${book.title}`,
            module: moduleName,
            count,
          });
        }
      }
    }
    const totalAttempts = questions.reduce((sum, question) => sum + question.stat.attempts, 0);
    const totalWrong = questions.reduce((sum, question) => sum + question.stat.wrongCount, 0);
    return {
      ranked: [...withAttempts].sort(
        (left, right) =>
          right.stat.wrongCount / right.stat.attempts -
          left.stat.wrongCount / left.stat.attempts,
      ),
      highWrong,
      coverageGaps,
      noData: activeQuestions.filter((question) => question.stat.attempts === 0),
      totalAttempts,
      correctRate:
        totalAttempts > 0 ? Math.round(((totalAttempts - totalWrong) / totalAttempts) * 100) : null,
    };
  }, [activeQuestions, questions]);

  if (!dbOk && stage !== 'dashboard') {
    return (
      <Notice
        title="题库服务暂不可用"
        body="无法连接共享题库数据库。请稍后刷新重试；若刚刚完成部署，可能需要先发布一次以启用数据库。"
      />
    );
  }

  if (stage === 'checking' && !dataset) {
    return <Notice title="正在验证身份…" body="正在读取共享题库数据。" />;
  }

  if (stage !== 'dashboard') {
    return (
      <div className="nb-card mx-auto mt-8 max-w-md p-6">
        <div className="flex items-center gap-2 text-[#0d7479]">
          <LockKeyhole className="size-5" aria-hidden="true" />
          <h1 className="text-lg font-semibold">
            {stage === 'setup' ? '设置教师口令' : '教师中心登录'}
          </h1>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#67848a]">
          {stage === 'setup'
            ? '这是首次使用教师中心：设置一个 6–64 位口令后即可管理共享题库。请老师本人完成设置并妥善保管。'
            : '输入教师口令进入题库管理。口令只保存在当前浏览器标签页，关闭后需重新输入。'}
        </p>
        <input
          type="password"
          value={passcode}
          onChange={(event) => setPasscode(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && passcode.trim().length >= 6) {
              void submitAuth(stage === 'setup' ? 'setup' : 'login');
            }
          }}
          placeholder={stage === 'setup' ? '设置口令（至少 6 位）' : '教师口令'}
          className="nb-input mt-4 h-11 w-full px-3 text-sm"
        />
        {authError ? (
          <p className="mt-2 text-xs font-medium text-[#ad553d]">{authError}</p>
        ) : null}
        <button
          type="button"
          onClick={() => void submitAuth(stage === 'setup' ? 'setup' : 'login')}
          disabled={busy || passcode.trim().length < 6}
          className="nb-btn nb-btn-primary mt-4 h-11 w-full text-sm"
        >
          {stage === 'setup' ? '设置并进入' : '登录教师中心'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <NbHero
        badge="TEACHER STUDIO · 教师中心"
        title="建设会自我进化的共享题库"
        description={
          <>
            共 {questions.length} 题（在用 {activeQuestions.length}）· 全站累计作答{' '}
            {insight.totalAttempts} 次
            {insight.correctRate != null ? ` · 整体正确率 ${insight.correctRate}%` : ''}
            ；增补修订的题目学生端立即可见。
          </>
        }
        stats={[`在用题 ${activeQuestions.length} 道`, `累计作答 ${insight.totalAttempts} 次`, insight.correctRate != null ? `整体正确率 ${insight.correctRate}%` : '暂无作答数据']}
        icon={GraduationCap}
        action={
          <button
            type="button"
            onClick={logout}
            className="nb-btn inline-flex h-9 items-center gap-2 px-3 text-xs"
          >
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            退出登录
          </button>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-2" aria-label="教师功能切换">
        {(
          [
            { key: 'manage', label: '题库管理', icon: ListChecks },
            { key: 'insight', label: '数据洞察', icon: BrainCircuit },
            { key: 'advice', label: '自迭代建议', icon: CircleAlert },
          ] as const
        ).map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              aria-pressed={tab === item.key}
              className={cn(
                'nb-pill inline-flex h-9 items-center gap-1.5 px-3 text-sm font-semibold',
                tab === item.key ? 'nb-pill-active' : 'text-[#59767c]',
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              {item.label}
              {item.key === 'advice' && insight.highWrong.length + insight.coverageGaps.length > 0
                ? `（${insight.highWrong.length + insight.coverageGaps.length}）`
                : ''}
            </button>
          );
        })}
      </div>

      {formError ? (
        <p className="mb-4 rounded-lg border-2 border-[#13333a] bg-[#fff2ed] px-3 py-2 text-xs font-semibold text-[#9b4e39] shadow-[3px_3px_0_#c6d4d4]">
          {formError}
        </p>
      ) : null}
      {formNotice ? (
        <p className="mb-4 rounded-lg border-2 border-[#13333a] bg-[#edf9f1] px-3 py-2 text-xs font-semibold text-[#287248] shadow-[3px_3px_0_#c6d4d4]">
          {formNotice}
        </p>
      ) : null}

      {tab === 'manage' ? (
        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section className="nb-card p-4 sm:p-5">
            <div className="flex items-center gap-2">
              {form.id ? (
                <Pencil className="size-4 text-[#0d7479]" aria-hidden="true" />
              ) : (
                <PlusCircle className="size-4 text-[#0d7479]" aria-hidden="true" />
              )}
              <h2 className="text-sm font-semibold">
                {form.id ? `编辑题目（${form.id}）` : '新增原创题'}
              </h2>
            </div>
            <div className="mt-4 space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-medium text-[#37585f]">
                  册别
                  <select
                    value={form.bookId}
                    onChange={(event) => {
                      const bookId = event.target.value;
                      updateForm({ bookId, module: getBook(bookId).modules[0] });
                    }}
                    className="nb-input mt-1 h-10 w-full px-2 text-sm font-normal"
                  >
                    {textbooks.map((book) => (
                      <option key={book.id} value={book.id}>
                        {book.volume} · {book.title}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs font-medium text-[#37585f]">
                  模块
                  <select
                    value={form.module}
                    onChange={(event) => updateForm({ module: event.target.value })}
                    className="nb-input mt-1 h-10 w-full px-2 text-sm font-normal"
                  >
                    {getBook(form.bookId).modules.map((module) => (
                      <option key={module} value={module}>
                        {module}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <TextField
                label="题眼（知识点短语）"
                value={form.topic}
                onChange={(value) => updateForm({ topic: value })}
                placeholder="如：基因分离定律"
              />
              <TextField
                label="题干"
                value={form.prompt}
                onChange={(value) => updateForm({ prompt: value })}
                placeholder="请使用原创表述，不要抄录教材原文。"
                multiline
              />
              <div>
                <p className="text-xs font-medium text-[#37585f]">选项（点击圆圈设为正确答案）</p>
                <div className="mt-2 space-y-2">
                  {form.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateForm({ answer: index })}
                        aria-label={`设选项 ${String.fromCharCode(65 + index)} 为正确答案`}
                        aria-pressed={form.answer === index}
                        className={cn(
                          'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors',
                          form.answer === index
                            ? 'border-[#2c6e4c] bg-[#edf9f1] text-[#287248] shadow-[2px_2px_0_#a8d5b8]'
                            : 'border-[#13333a] bg-white text-[#658289] shadow-[2px_2px_0_#c6d4d4]',
                        )}
                      >
                        {form.answer === index ? (
                          <Check className="size-3.5" aria-hidden="true" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </button>
                      <input
                        value={option}
                        onChange={(event) => {
                          const next = [...form.options];
                          next[index] = event.target.value;
                          updateForm({ options: next });
                        }}
                        placeholder={`选项 ${String.fromCharCode(65 + index)}`}
                        className="nb-input h-10 min-w-0 flex-1 px-2 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <TextField
                label="讲解（判题依据）"
                value={form.explanation}
                onChange={(value) => updateForm({ explanation: value })}
                placeholder="说明为什么正确选项成立、常见错因是什么。"
                multiline
              />
              <TextField
                label="错因标签"
                value={form.tag}
                onChange={(value) => updateForm({ tag: value })}
                placeholder="如：配子分析、变量控制"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void submitQuestion()}
                  disabled={busy}
                  className="nb-btn nb-btn-primary px-4 py-2 text-sm disabled:opacity-45"
                >
                  {form.id ? '保存修改' : '加入共享题库'}
                </button>
                {form.id ? (
                  <button
                    type="button"
                    onClick={() => {
                      setForm(EMPTY_FORM);
                      setFormError('');
                      setFormNotice('');
                    }}
                    className="nb-btn px-4 py-2 text-sm"
                  >
                    取消编辑
                  </button>
                ) : null}
              </div>
            </div>
          </section>

          <section className="nb-card overflow-hidden">
            <div className="border-b-2 border-[#13333a] bg-[#f4faf9] px-4 py-4 sm:px-5">
              <h2 className="text-sm font-bold">题库列表（{questions.length}）</h2>
              <p className="mt-1 text-xs text-[#6d898f]">
                高错率或长期无作答的题会标橙色提示；修订题目会提升版本号。
              </p>
            </div>
            <ul className="divide-y-2 divide-[#e8f0f0]">
              {questions.map((question) => {
                const { attempts, wrongCount } = question.stat;
                const wrongRate = attempts > 0 ? Math.round((wrongCount / attempts) * 100) : null;
                const highWrong =
                  attempts >= 8 && wrongRate !== null && wrongRate > 60;
                return (
                  <li
                    key={question.id}
                    className={cn(
                      'px-4 py-3 sm:px-5',
                      question.status === 'retired' ? 'opacity-60' : '',
                    )}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-[#67858b]">
                          {questionSource(question.bookId)} · {question.module} ·{' '}
                          {question.origin === 'builtin' ? '内置' : '教师新增'} · v{question.version}
                        </p>
                        <p className="mt-0.5 truncate text-sm font-medium text-[#24464d]">
                          {question.topic}：{question.prompt}
                        </p>
                        <p className="mt-1 text-xs text-[#6d898f]">
                          作答 {attempts} 次
                          {wrongRate !== null ? ` · 错误率 ${wrongRate}%` : ' · 暂无数据'}
                          {highWrong ? ' · 高错率，建议复查' : ''}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setForm({
                              id: question.id,
                              bookId: question.bookId,
                              module: question.module,
                              topic: question.topic,
                              prompt: question.prompt,
                              options: [...question.options],
                              answer: question.answer,
                              explanation: question.explanation,
                              tag: question.tag,
                            });
                            setFormNotice('');
                            setFormError('');
                          }}
                          className="nb-btn px-3 py-1.5 text-xs"
                        >
                          编辑
                        </button>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            void toggleStatus(
                              question.id,
                              question.status === 'active' ? 'retired' : 'active',
                            )
                          }
                          className="nb-btn px-3 py-1.5 text-xs text-[#a4533b]"
                        >
                          <Power className="size-3.5" aria-hidden="true" />
                          {question.status === 'active' ? '停用' : '恢复'}
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      ) : null}

      {tab === 'insight' ? (
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="题库总数" value={`${questions.length} 题`} hint={`在用 ${activeQuestions.length} 题`} />
            <StatCard label="全站作答" value={`${insight.totalAttempts} 次`} hint="匿名统计，实时汇总" />
            <StatCard
              label="整体正确率"
              value={insight.correctRate != null ? `${insight.correctRate}%` : '暂无数据'}
              hint="按全站作答记录计算"
            />
            <StatCard
              label="高错率题目"
              value={`${insight.highWrong.length} 题`}
              hint="作答 ≥8 次且错误率 >60%"
            />
          </div>
          <section className="nb-card overflow-hidden">
            <div className="border-b border-[#dceaea] px-4 py-4 sm:px-5">
              <h2 className="text-sm font-semibold">按错误率排序的题目</h2>
              <p className="mt-1 text-xs text-[#6d898f]">
                错误率高的题可能表述不清、超出当前教学进度，或是真实的薄弱知识点。
              </p>
            </div>
            {insight.ranked.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#c6d4d4] text-xs font-semibold text-[#67858b]">
                      <th className="px-4 py-2.5 font-semibold sm:px-5">题目</th>
                      <th className="px-4 py-2.5 font-semibold">作答</th>
                      <th className="px-4 py-2.5 font-semibold">错误率</th>
                      <th className="px-4 py-2.5 font-semibold">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {insight.ranked.map((question) => {
                      const wrongRate = Math.round(
                        (question.stat.wrongCount / question.stat.attempts) * 100,
                      );
                      return (
                        <tr key={question.id} className="border-b border-[#e2ecec]">
                          <td className="px-4 py-2.5 sm:px-5">
                            <p className="font-medium text-[#24464d]">{question.topic}</p>
                            <p className="text-xs text-[#6d898f]">
                              {questionSource(question.bookId)} · {question.module}
                            </p>
                          </td>
                          <td className="px-4 py-2.5 text-xs text-[#46666d]">
                            {question.stat.attempts} 次
                          </td>
                          <td
                            className={cn(
                              'px-4 py-2.5 text-xs font-semibold',
                              wrongRate > 60 ? 'text-[#a4533b]' : 'text-[#287248]',
                            )}
                          >
                            {wrongRate}%
                          </td>
                          <td className="px-4 py-2.5 text-xs text-[#6d898f]">
                            {question.status === 'active' ? '在用' : '已停用'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="px-4 py-8 text-center text-sm text-[#6b888d] sm:px-5">
                还没有作答记录；学生开始练习后这里会出现统计。
              </p>
            )}
          </section>
        </div>
      ) : null}

      {tab === 'advice' ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <section className="nb-card p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <CircleAlert className="size-4 text-[#b57c16]" aria-hidden="true" />
              <h2 className="text-sm font-semibold">高错率题目（建议复查表述或讲解）</h2>
            </div>
            {insight.highWrong.length ? (
              <ul className="mt-4 space-y-2">
                {insight.highWrong.map((question) => (
                  <li
                    key={question.id}
                    className="rounded-lg border-2 border-[#13333a] bg-[#fff8e7] px-3 py-2 text-sm text-[#80621c] shadow-[3px_3px_0_#c6d4d4]"
                  >
                    <p className="font-medium">{question.topic}</p>
                    <p className="mt-0.5 text-xs">
                      {questionSource(question.bookId)} · 作答 {question.stat.attempts} 次 · 错误率{' '}
                      {Math.round((question.stat.wrongCount / question.stat.attempts) * 100)}%
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-6 text-[#67848a]">
                暂无高错率题目。当某题作答 ≥8 次且错误率超过 60% 时会出现在这里。
              </p>
            )}
          </section>

          <section className="nb-card p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <PlusCircle className="size-4 text-[#b57c16]" aria-hidden="true" />
              <h2 className="text-sm font-semibold">
                待补充模块（目标每模块 {MODULE_TARGET_COUNT} 题）
              </h2>
            </div>
            {insight.coverageGaps.length ? (
              <ul className="mt-4 space-y-2">
                {insight.coverageGaps.map((gap) => (
                  <li
                    key={`${gap.bookTitle}-${gap.module}`}
                    className="flex items-center justify-between gap-3 rounded-lg border-2 border-[#13333a] bg-white px-3 py-2 text-sm shadow-[3px_3px_0_#c6d4d4]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium text-[#24464d]">
                        {gap.module}
                      </span>
                      <span className="block text-xs text-[#6d898f]">{gap.bookTitle}</span>
                    </span>
                    <span className="shrink-0 text-xs font-semibold text-[#a4533b]">
                      还差 {MODULE_TARGET_COUNT - gap.count} 题
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-6 text-[#67848a]">
                全部模块都达到了目标题量，题库覆盖完整。
              </p>
            )}
          </section>

          <section className="nb-card p-4 sm:p-5 xl:col-span-2">
            <h2 className="text-sm font-semibold">暂无作答数据的在用题（{insight.noData.length}）</h2>
            <p className="mt-1 text-xs text-[#6d898f]">
              新题需要足够的作答样本才能进入错误率分析；可让学生优先练习这些题（智能练习会自动提高未做题权重）。
            </p>
            {insight.noData.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {insight.noData.map((question) => (
                  <span
                    key={question.id}
                    className="nb-pill px-2.5 py-1 text-xs font-semibold text-[#5b777d]"
                  >
                    {question.topic} · {questionSource(question.bookId)}
                  </span>
                ))}
              </div>
            ) : null}
          </section>
        </div>
      ) : null}
    </div>
  );
}

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <div className="nb-card mx-auto mt-8 max-w-md p-6 text-center">
      <CircleAlert className="mx-auto size-6 text-[#a4533b]" aria-hidden="true" />
      <h1 className="mt-2 text-base font-semibold text-[#173b42]">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-[#67848a]">{body}</p>
    </div>
  );
}

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="nb-card p-4">
      <p className="text-xs font-semibold text-[#67858b]">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[#146e73]">{value}</p>
      <p className="mt-1 text-xs text-[#8aa3a7]">{hint}</p>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <label className="block text-xs font-medium text-[#37585f]">
      {label}
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={3}
          className="nb-input mt-1 w-full resize-y px-2 py-2 text-sm font-normal"
        />
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="mt-1 h-10 w-full rounded-md border border-[#cddfdf] bg-white px-2 text-sm font-normal outline-none focus:ring-3 focus:ring-[#b8dfda]"
        />
      )}
    </label>
  );
}
