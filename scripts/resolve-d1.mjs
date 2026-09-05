#!/usr/bin/env node
/**
 * 部署前解析 D1 数据库：
 * - 已存在同名数据库 → 取其 uuid 写入 dist/server/wrangler.json
 * - 不存在 → 创建后写入
 * 需要环境变量 CLOUDFLARE_API_TOKEN（可选 CLOUDFLARE_ACCOUNT_ID）。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const DB_NAME = 'site-creator-d1';
const CONFIG = 'dist/server/wrangler.json';

function wranglerJson(args) {
  return execSync(`npx wrangler ${args}`, {
    stdio: ['ignore', 'pipe', 'inherit'],
    encoding: 'utf8',
    env: process.env,
  });
}

function extractJson(stdout) {
  // wrangler 的 JSON 输出可能夹杂日志行，取第一个 { 或 [ 开始的部分
  const start = stdout.search(/[[{]/);
  if (start === -1) throw new Error(`no JSON in output: ${stdout.slice(0, 300)}`);
  return JSON.parse(stdout.slice(start));
}

let dbId = '';
try {
  const list = extractJson(wranglerJson('d1 list --json'));
  const hit = Array.isArray(list) ? list.find((db) => db.name === DB_NAME) : undefined;
  if (hit) dbId = hit.uuid;
} catch {
  // 列表失败（例如首次使用）按不存在处理
}

if (!dbId) {
  console.log(`D1 database "${DB_NAME}" not found, creating...`);
  // wrangler 4.x 的 d1 create 不支持 --json，从文本输出中提取 uuid
  const out = wranglerJson(`d1 create ${DB_NAME}`);
  const m = out.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  if (!m) throw new Error(`could not read database id from create output:\n${out.slice(0, 400)}`);
  dbId = m[0];
}

const config = JSON.parse(readFileSync(CONFIG, 'utf8'));
const binding = config.d1_databases?.[0];
if (!binding) throw new Error(`no d1_databases[0] in ${CONFIG}`);
binding.database_id = dbId;
writeFileSync(CONFIG, JSON.stringify(config, null, 2));
console.log(`D1 database ready: ${DB_NAME} (${dbId})`);
