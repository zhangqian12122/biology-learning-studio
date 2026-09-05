'use server';

import { textbooks } from '@/lib/curriculum';
import { getReadyDatabase } from '@/lib/db';
import { listTeacherQuestions, type TeacherQuestion } from '@/lib/queries';

export type ActionResult = { ok: boolean; error?: string };

const PASSCODE_KEY_SALT = 'teacher_salt';
const PASSCODE_KEY_HASH = 'teacher_hash';

async function sha256Hex(text: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function randomHex(bytes: number) {
  const values = crypto.getRandomValues(new Uint8Array(bytes));
  return [...values].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

/** 学生答题匿名上报：正确性以数据库答案为准，失败静默不影响本机体验。 */
export async function recordAnswer(input: {
  clientId: string;
  questionId: string;
  chosen: number;
  mode: string;
}): Promise<ActionResult> {
  try {
    const clientId = cleanText(input.clientId, 64);
    const questionId = cleanText(input.questionId, 80);
    const mode = ['all', 'review', 'smart'].includes(input.mode) ? input.mode : 'all';
    if (!clientId || !questionId) return { ok: false, error: 'invalid-input' };
    if (!Number.isInteger(input.chosen) || input.chosen < 0 || input.chosen > 7) {
      return { ok: false, error: 'invalid-input' };
    }

    const db = await getReadyDatabase();
    const row = await db
      .prepare('SELECT answer FROM questions WHERE id = ?')
      .bind(questionId)
      .first<{ answer: number }>();
    if (!row) return { ok: false, error: 'question-not-found' };

    await db
      .prepare(
        'INSERT INTO answer_events (client_id, question_id, chosen, is_correct, mode) VALUES (?, ?, ?, ?, ?)',
      )
      .bind(clientId, questionId, input.chosen, row.answer === input.chosen ? 1 : 0, mode)
      .run();
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export async function getTeacherSetupState(): Promise<{ hasPasscode: boolean; dbOk: boolean }> {
  try {
    const db = await getReadyDatabase();
    const row = await db
      .prepare('SELECT value FROM settings WHERE key = ?')
      .bind(PASSCODE_KEY_HASH)
      .first<{ value: string }>();
    return { hasPasscode: Boolean(row?.value), dbOk: true };
  } catch {
    return { hasPasscode: false, dbOk: false };
  }
}

async function readSetting(db: D1Database, key: string) {
  const row = await db
    .prepare('SELECT value FROM settings WHERE key = ?')
    .bind(key)
    .first<{ value: string }>();
  return row?.value ?? null;
}

async function verifyPasscode(passcode: string): Promise<boolean> {
  const db = await getReadyDatabase();
  const salt = await readSetting(db, PASSCODE_KEY_SALT);
  const storedHash = await readSetting(db, PASSCODE_KEY_HASH);
  if (!salt || !storedHash) return false;
  const hash = await sha256Hex(`${salt}:${passcode}`);
  return hash === storedHash;
}

export async function setupTeacherPasscode(passcode: string): Promise<ActionResult> {
  const code = typeof passcode === 'string' ? passcode.trim() : '';
  if (code.length < 6 || code.length > 64) {
    return { ok: false, error: '口令长度需为 6–64 个字符。' };
  }
  try {
    const db = await getReadyDatabase();
    const existing = await readSetting(db, PASSCODE_KEY_HASH);
    if (existing) {
      return { ok: false, error: '口令已设置，请直接登录；如需重置请联系站点维护者。' };
    }
    const salt = randomHex(16);
    const hash = await sha256Hex(`${salt}:${code}`);
    await db.batch([
      db
        .prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)')
        .bind(PASSCODE_KEY_SALT, salt),
      db
        .prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)')
        .bind(PASSCODE_KEY_HASH, hash),
    ]);
    return { ok: true };
  } catch {
    return { ok: false, error: '数据库暂不可用，请稍后再试。' };
  }
}

export async function loginTeacher(passcode: string): Promise<ActionResult> {
  const code = typeof passcode === 'string' ? passcode.trim() : '';
  try {
    if (await verifyPasscode(code)) return { ok: true };
    return { ok: false, error: '口令不正确。' };
  } catch {
    return { ok: false, error: '数据库暂不可用，请稍后再试。' };
  }
}

async function requireTeacher(passcode: string): Promise<ActionResult | null> {
  try {
    if (typeof passcode === 'string' && passcode.length >= 6 && (await verifyPasscode(passcode))) {
      return null;
    }
    return { ok: false, error: '教师身份验证失败，请重新登录。' };
  } catch {
    return { ok: false, error: '数据库暂不可用，请稍后再试。' };
  }
}

export type QuestionInput = {
  bookId: string;
  module: string;
  topic: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  tag: string;
};

function validateQuestionInput(input: QuestionInput): { error: string } | { value: {
  bookId: string;
  module: string;
  topic: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  tag: string;
} } {
  const book = textbooks.find((item) => item.id === input.bookId);
  if (!book) return { error: '请选择有效的教材册别。' };
  const moduleLabel = cleanText(input.module, 60) || book.modules[0];
  if (!(book.modules as readonly string[]).includes(moduleLabel)) {
    return { error: '所选模块不属于该册教材。' };
  }
  const topic = cleanText(input.topic, 60);
  const prompt = cleanText(input.prompt, 500);
  const explanation = cleanText(input.explanation, 1000);
  const tag = cleanText(input.tag, 20);
  const options = (Array.isArray(input.options) ? input.options : [])
    .map((option) => cleanText(option, 120))
    .slice(0, 4);
  if (!topic || !prompt || !explanation) {
    return { error: '题眼、题干和讲解都不能为空。' };
  }
  if (options.length !== 4 || options.some((option) => !option)) {
    return { error: '请填写完整的四个选项。' };
  }
  if (new Set(options).size !== options.length) {
    return { error: '四个选项内容不能重复。' };
  }
  if (!Number.isInteger(input.answer) || input.answer < 0 || input.answer > 3) {
    return { error: '请选择正确答案。' };
  }
  return {
    value: {
      bookId: book.id,
      module: moduleLabel,
      topic,
      prompt,
      options,
      answer: input.answer,
      explanation,
      tag,
    },
  };
}

export async function saveQuestion(
  passcode: string,
  input: QuestionInput & { id?: string },
): Promise<ActionResult & { id?: string }> {
  const denied = await requireTeacher(passcode);
  if (denied) return denied;

  const validated = validateQuestionInput(input);
  if ('error' in validated) return { ok: false, error: validated.error };
  const value = validated.value;

  try {
    const db = await getReadyDatabase();
    if (input.id) {
      const id = cleanText(input.id, 80);
      const result = await db
        .prepare(
          `UPDATE questions SET book_id = ?, module = ?, topic = ?, prompt = ?, options_json = ?,
             answer = ?, explanation = ?, tag = ?, version = version + 1, updated_at = datetime('now')
           WHERE id = ?`,
        )
        .bind(
          value.bookId,
          value.module,
          value.topic,
          value.prompt,
          JSON.stringify(value.options),
          value.answer,
          value.explanation,
          value.tag,
          id,
        )
        .run();
      if (!result.meta.changes) return { ok: false, error: '题目不存在或已被删除。' };
      return { ok: true, id };
    }

    const id = `t-${Date.now().toString(36)}-${randomHex(4)}`;
    await db
      .prepare(
        `INSERT INTO questions
          (id, book_id, module, topic, prompt, options_json, answer, explanation, tag, status, origin, version)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', 'teacher', 1)`,
      )
      .bind(
        id,
        value.bookId,
        value.module,
        value.topic,
        value.prompt,
        JSON.stringify(value.options),
        value.answer,
        value.explanation,
        value.tag,
      )
      .run();
    return { ok: true, id };
  } catch {
    return { ok: false, error: '保存失败，数据库暂不可用。' };
  }
}

export async function setQuestionStatus(
  passcode: string,
  questionId: string,
  status: string,
): Promise<ActionResult> {
  const denied = await requireTeacher(passcode);
  if (denied) return denied;
  if (status !== 'active' && status !== 'retired') return { ok: false, error: '无效的状态。' };
  const id = cleanText(questionId, 80);
  if (!id) return { ok: false, error: '无效的题目。' };

  try {
    const db = await getReadyDatabase();
    const result = await db
      .prepare(
        `UPDATE questions SET status = ?, updated_at = datetime('now') WHERE id = ?`,
      )
      .bind(status, id)
      .run();
    if (!result.meta.changes) return { ok: false, error: '题目不存在或已被删除。' };
    return { ok: true };
  } catch {
    return { ok: false, error: '操作失败，数据库暂不可用。' };
  }
}

export type TeacherDataset = {
  dbOk: boolean;
  questions: TeacherQuestion[];
};

export async function getTeacherData(passcode: string): Promise<TeacherDataset> {
  const denied = await requireTeacher(passcode);
  if (denied) return { dbOk: false, questions: [] };
  const { dbOk, questions } = await listTeacherQuestions();
  return { dbOk, questions };
}
