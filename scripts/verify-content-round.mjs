// 一轮内容验证：新实验互动路径 + 3 个新标本 SVG 文字越界/重叠检查
// 用系统 Edge（channel msedge）无头跑，绕开 IAB webview 故障。
import { chromium } from 'file:///D:/ClaudeCode/npm/node_modules/playwright/index.mjs';

const BASE = 'http://localhost:3000';
const results = { experiment: {}, specimens: {} };

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });

// ---------- 实验：探究土壤微生物的分解作用 ----------
await page.goto(`${BASE}/lab?exp=leafDecompose`, { waitUntil: 'domcontentloaded' });
await page.addStyleTag({ content: '#__vinext_dev_error_overlay_root{display:none!important}' });
await page.waitForTimeout(2500);
{
  const text = await page.locator('main').innerText();
  results.experiment.open = text.includes('土壤微生物的分解作用');
  results.experiment.groupsShown = text.includes('灭菌土') && text.includes('自然土');
  // 互动路径：推进到第 10 周 → B 组剩余率显著低于 A 组 → 出现对照结论
  await page.getByRole('button', { name: /快进 3 周/ }).click({ force: true });
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: /快进 3 周/ }).click({ force: true });
  await page.waitForTimeout(400);
  await page.getByRole('button', { name: /经过 1 周/ }).click({ force: true });
  await page.waitForTimeout(700);
  const after = await page.locator('main').innerText();
  results.experiment.progressWorks = after.includes('第 10 周');
  results.experiment.bLowerThanA = (after.match(/B 自然土 (\d+)%/) ?? [])[1] < (after.match(/A 灭菌土 (\d+)%/) ?? [])[1];
  results.experiment.conclusionShown = after.includes('分解者');
}

// ---------- 标本：深链直达 + SVG 文字几何检查 ----------
const SPECIMENS = ['leafBud', 'bloodCells', 'shrimp'];
// viewBox 尺寸
const VB = { w: 520, h: 380 };
const BOUND = { x0: -3, x1: VB.w + 3, y0: -3, y1: VB.h + 3 };

function analyze(boxes) {
  // boxes: 归一化到 viewBox 的文字框 {x,y,w,h,text}
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
    const heading = main.innerText;
    return { found: true, texts, shown: heading.includes('结构图') || heading.includes('模式图') };
  });
  if (!info.found) {
    results.specimens[id] = { found: false };
    continue;
  }
  const issues = analyze(info.texts);
  results.specimens[id] = {
    found: true,
    textCount: info.texts.length,
    issues,
    ok: issues.length === 0,
  };
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
const exp = results.experiment;
const expOk = Object.values(exp).every(Boolean);
const allOk = expOk && SPECIMENS.every((id) => results.specimens[id]?.ok);
console.log('ALL_OK=' + allOk);
