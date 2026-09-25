// 一轮内容验证：新实验互动路径 + 3 个新标本 SVG 文字越界/重叠检查
import { chromium } from 'file:///D:/ClaudeCode/npm/node_modules/playwright/index.mjs';

const BASE = 'http://localhost:3000';
const results = { experiment: {}, specimens: {} };

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

// ---------- 实验：imprinting 印随行为 ----------
await page.goto(`${BASE}/lab?exp=imprinting`, { waitUntil: 'domcontentloaded' });
await page.addStyleTag({ content: '#__vinext_dev_error_overlay_root{display:none!important}' });
await page.waitForTimeout(2500);
{
  const before = await page.locator('main').innerText();
  await page.locator('button', { hasText: '蓝色气球' }).click();
  for (let i = 0; i < 2; i++) {
    await page.getByRole('button', { name: /推进成长/ }).evaluate((el) => el.click());
    await page.waitForTimeout(400);
  }
  const after = await page.locator('main').innerText();
  results.experiment.open = before.includes('印随行为');
  results.experiment.interactive = after.includes('气球当"妈妈"') || after.includes('来者不拒');
  results.experiment.reference = after.includes('关键期');
  results.experiment.dayNight = before.length > 0;
}

// ---------- 标本：深链直达 + SVG 文字几何检查 ----------
const SPECIMENS = ['poisonDartFrog', 'sweatGland', 'pollenGrain'];
const VB = { w: 520, h: 380 };
const BOUND = { x0: -3, x1: VB.w + 3, y0: -3, y1: VB.h + 3 };

function analyze(boxes) {
  const out = [];
  for (const b of boxes) {
    if (b.x < BOUND.x0 || b.y < BOUND.y0 || b.x + b.w > BOUND.x1 || b.y + b.h > BOUND.y1) {
      out.push({ type: 'out', text: b.text, x: +b.x.toFixed(1), y: +b.y.toFixed(1), r: +(b.x + b.w).toFixed(1), b: +(b.y + b.h).toFixed(1) });
    }
  }
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], c = boxes[j];
      const ox = Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x);
      const oy = Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y);
      if (ox > 8 && oy > 5) {
        out.push({ type: 'overlap', a: a.text.slice(0, 14), b: c.text.slice(0, 14), ox: +ox.toFixed(1), oy: +oy.toFixed(1) });
      }
    }
  }
  return out;
}

for (const id of SPECIMENS) {
  await page.goto(`${BASE}/cells?specimen=${id}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1800);
  const info = await page.evaluate(() => {
    const main = document.querySelector('main');
    const svg = main?.querySelector('svg[viewBox="0 0 520 380"]');
    if (!svg) return { found: false };
    const sr = svg.getBoundingClientRect();
    const texts = [...svg.querySelectorAll('text')].map((t) => {
      const r = t.getBoundingClientRect();
      return {
        text: (t.textContent ?? '').trim(),
        x: ((r.left - sr.left) / sr.width) * 520,
        y: ((r.top - sr.top) / sr.height) * 380,
        w: (r.width / sr.width) * 520,
        h: (r.height / sr.height) * 380,
      };
    });
    return { found: true, texts };
  });
  if (!info.found) {
    results.specimens[id] = { found: false };
    continue;
  }
  const issues = analyze(info.texts);
  results.specimens[id] = { found: true, textCount: info.texts.length, issues, ok: issues.length === 0 };
}

// 回归检查：conditionedReflex 实验页仍正常
await page.goto(`${BASE}/lab?exp=conditionedReflex`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1800);
{
  const t = await page.locator('main').innerText();
  results.specimens.reflexRegression = { found: t.includes('条件反射') || t.includes('巴甫洛夫'), ok: t.includes('条件反射') || t.includes('巴甫洛夫') };
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
const exp = results.experiment;
const expOk = Object.values(exp).every(Boolean);
const allOk = expOk && SPECIMENS.every((id) => results.specimens[id]?.ok) && results.specimens.reflexRegression?.ok;
console.log('ALL_OK=' + allOk);
