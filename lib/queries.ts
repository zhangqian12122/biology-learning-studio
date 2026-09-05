import {
  builtinQuestions,
  getBook,
  type BookId,
  type Question,
} from '@/lib/curriculum';
import { getReadyDatabase } from '@/lib/db';

export type QuestionBank = {
  questions: Question[];
  /** db = 数据库题库；builtin-fallback = 数据库不可用或为空，临时使用内置题。 */
  source: 'db' | 'builtin-fallback';
  dbOk: boolean;
};

export type GlobalStats = {
  dbOk: boolean;
  activeCount: number;
  totalQuestions: number;
  totalAnswers: number;
  correctRate: number | null;
  activeByBook: Record<BookId, number>;
};

export type QuestionStat = { attempts: number; wrongCount: number };

export type TeacherQuestion = Question & {
  status: 'active' | 'retired';
  origin: 'builtin' | 'teacher';
  version: number;
  updatedAt: string;
  stat: QuestionStat;
};

type QuestionRow = {
  id: string;
  book_id: string;
  module: string;
  topic: string;
  prompt: string;
  options_json: string;
  answer: number;
  explanation: string;
  tag: string;
  status: string;
  origin: string;
  version: number;
  updated_at: string;
};

function isBookId(value: string): value is BookId {
  return ['molecules', 'genetics', 'regulation', 'ecology', 'technology'].includes(value);
}

function rowToQuestion(row: QuestionRow): Question | null {
  if (!isBookId(row.book_id)) return null;
  let options: unknown;
  try {
    options = JSON.parse(row.options_json);
  } catch {
    return null;
  }
  if (!Array.isArray(options) || options.length < 2) return null;
  const optionTexts = options.filter((item): item is string => typeof item === 'string');
  if (optionTexts.length !== options.length) return null;
  if (!Number.isInteger(row.answer) || row.answer < 0 || row.answer >= optionTexts.length) {
    return null;
  }

  return {
    id: row.id,
    bookId: row.book_id,
    module: row.module || getBook(row.book_id).modules[0],
    topic: row.topic,
    prompt: row.prompt,
    options: optionTexts,
    answer: row.answer,
    explanation: row.explanation,
    tag: row.tag,
  };
}

/** 学生端题库：数据库不可用或没有可用题时回退内置 15 题，页面永不空白。 */
export async function listActiveQuestions(): Promise<QuestionBank> {
  try {
    const db = await getReadyDatabase();
    const { results } = await db
      .prepare(
        `SELECT id, book_id, module, topic, prompt, options_json, answer, explanation, tag,
                status, origin, version, updated_at
         FROM questions WHERE status = 'active' ORDER BY created_at, id`,
      )
      .all<QuestionRow>();
    const questions = (results ?? [])
      .map(rowToQuestion)
      .filter((question): question is Question => question !== null);

    if (!questions.length) {
      return { questions: builtinQuestions, source: 'builtin-fallback', dbOk: true };
    }
    return { questions, source: 'db', dbOk: true };
  } catch (error) {
    console.error('[question-bank] D1 不可用，回退内置题库：', error);
    return { questions: builtinQuestions, source: 'builtin-fallback', dbOk: false };
  }
}

export async function getGlobalStats(): Promise<GlobalStats> {
  const emptyByBook = Object.fromEntries(
    ['molecules', 'genetics', 'regulation', 'ecology', 'technology'].map((id) => [id, 0]),
  ) as Record<BookId, number>;

  try {
    const db = await getReadyDatabase();
    const counts = await db
      .prepare(
        `SELECT book_id, COUNT(*) AS count, SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active
         FROM questions GROUP BY book_id`,
      )
      .all<{ book_id: string; count: number; active: number }>();
    const events = await db
      .prepare(
        `SELECT COUNT(*) AS total,
                SUM(CASE WHEN is_correct = 1 THEN 1 ELSE 0 END) AS correct
         FROM answer_events`,
      )
      .first<{ total: number; correct: number | null }>();

    const activeByBook = { ...emptyByBook };
    let totalQuestions = 0;
    let activeCount = 0;
    for (const row of counts.results ?? []) {
      if (!isBookId(row.book_id)) continue;
      activeByBook[row.book_id] = row.active ?? 0;
      totalQuestions += row.count;
      activeCount += row.active ?? 0;
    }
    const totalAnswers = events?.total ?? 0;
    const correctRate =
      totalAnswers > 0 && events?.correct != null
        ? Math.round((events.correct / totalAnswers) * 100)
        : null;

    return { dbOk: true, activeCount, totalQuestions, totalAnswers, correctRate, activeByBook };
  } catch {
    return {
      dbOk: false,
      activeCount: builtinQuestions.length,
      totalQuestions: builtinQuestions.length,
      totalAnswers: 0,
      correctRate: null,
      activeByBook: {
        molecules: 3,
        genetics: 3,
        regulation: 3,
        ecology: 3,
        technology: 3,
      },
    };
  }
}

/** 每题的作答/答错统计（学生端智能练习与教师洞察共用）。 */
export async function getQuestionStats(): Promise<{
  dbOk: boolean;
  stats: Record<string, QuestionStat>;
}> {
  try {
    const db = await getReadyDatabase();
    const { results } = await db
      .prepare(
        `SELECT question_id, COUNT(*) AS attempts,
                SUM(CASE WHEN is_correct = 0 THEN 1 ELSE 0 END) AS wrong_count
         FROM answer_events GROUP BY question_id`,
      )
      .all<{ question_id: string; attempts: number; wrong_count: number }>();
    const stats: Record<string, QuestionStat> = {};
    for (const row of results ?? []) {
      stats[row.question_id] = { attempts: row.attempts, wrongCount: row.wrong_count ?? 0 };
    }
    return { dbOk: true, stats };
  } catch {
    return { dbOk: false, stats: {} };
  }
}

export async function listTeacherQuestions(): Promise<{
  dbOk: boolean;
  questions: TeacherQuestion[];
}> {
  try {
    const db = await getReadyDatabase();
    const { results } = await db
      .prepare(
        `SELECT id, book_id, module, topic, prompt, options_json, answer, explanation, tag,
                status, origin, version, updated_at
         FROM questions ORDER BY created_at, id`,
      )
      .all<QuestionRow>();
    const statsResult = await getQuestionStats();
    const questions = (results ?? [])
      .map((row) => {
        const question = rowToQuestion(row);
        if (!question) return null;
        const status = row.status === 'retired' ? 'retired' : 'active';
        const origin = row.origin === 'builtin' ? 'builtin' : 'teacher';
        return {
          ...question,
          status,
          origin,
          version: row.version ?? 1,
          updatedAt: row.updated_at,
          stat: statsResult.stats[question.id] ?? { attempts: 0, wrongCount: 0 },
        } satisfies TeacherQuestion;
      })
      .filter((question): question is TeacherQuestion => question !== null);
    return { dbOk: true, questions };
  } catch {
    return { dbOk: false, questions: [] };
  }
}
