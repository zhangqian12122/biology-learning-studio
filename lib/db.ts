import { env } from 'cloudflare:workers';

import { builtinQuestions } from '@/lib/curriculum';

/**
 * 服务端专用数据库层。表结构用幂等 SQL 在首个请求时创建（等价于迁移），
 * 不依赖平台侧迁移机制，本地 miniflare 与线上 D1 行为一致。
 */

const SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS questions (
    id TEXT PRIMARY KEY,
    book_id TEXT NOT NULL,
    module TEXT NOT NULL DEFAULT '',
    topic TEXT NOT NULL,
    prompt TEXT NOT NULL,
    options_json TEXT NOT NULL,
    answer INTEGER NOT NULL,
    explanation TEXT NOT NULL,
    tag TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'active',
    origin TEXT NOT NULL DEFAULT 'teacher',
    version INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS answer_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    chosen INTEGER NOT NULL,
    is_correct INTEGER NOT NULL,
    mode TEXT NOT NULL DEFAULT 'all',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE INDEX IF NOT EXISTS idx_answer_events_question ON answer_events (question_id)`,
  `CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )`,
];

let readyPromise: Promise<D1Database> | null = null;

export function getDatabase(): D1Database {
  const bindings = env as unknown as { DB?: D1Database };
  if (!bindings.DB) {
    throw new Error('D1 binding "DB" is not available');
  }
  return bindings.DB;
}

export async function getReadyDatabase(): Promise<D1Database> {
  if (!readyPromise) {
    readyPromise = (async () => {
      const db = getDatabase();
      await db.batch(SCHEMA_STATEMENTS.map((sql) => db.prepare(sql)));
      await seedBuiltinQuestions(db);
      return db;
    })();
    readyPromise.catch(() => {
      // 允许下次请求重试，避免一次抖动永久失败。
      readyPromise = null;
    });
  }
  return readyPromise;
}

async function seedBuiltinQuestions(db: D1Database) {
  const existing = await db
    .prepare('SELECT COUNT(*) AS count FROM questions WHERE origin = ?')
    .bind('builtin')
    .first<{ count: number }>();
  if ((existing?.count ?? 0) >= builtinQuestions.length) return;

  const baseTime = Date.now() - builtinQuestions.length * 1000;
  const statements = builtinQuestions.map((question, index) => {
    // 用递增时间戳保证内置题按教材顺序展示（同批插入的 created_at 才不会退化为按 id 排序）
    const seededAt = new Date(baseTime + index * 1000).toISOString().slice(0, 19);
    return db
      .prepare(
        `INSERT OR IGNORE INTO questions
          (id, book_id, module, topic, prompt, options_json, answer, explanation, tag,
           status, origin, version, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', 'builtin', 1, ?, ?)`,
      )
      .bind(
        question.id,
        question.bookId,
        question.module,
        question.topic,
        question.prompt,
        JSON.stringify(question.options),
        question.answer,
        question.explanation,
        question.tag,
        seededAt,
        seededAt,
      );
  });
  await db.batch(statements);
}
