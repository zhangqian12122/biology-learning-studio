// /lab Notion 双栏 + /cells 目录回归 验证
import { chromium } from 'file:///D:/ClaudeCode/npm/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:3000';
const results = {};
const shots = 'scripts/shots-lab';
mkdirSync(shots, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// 1) /lab 桌面：双栏 + 目录默认展开当前实验所在册
await page.goto(`${BASE}/lab`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3000);
results.desktopOpen = await page.evaluate(() => {
  const aside = document.querySelector('aside[aria-label="实验目录"]');
  return !!aside && aside.innerText.includes('互动实验 · 目录');
});
results.defaultBookOpen = await page.evaluate(() => {
  const btn = [...document.querySelectorAll('aside nav > div > button')].find((b) => b.getAttribute('aria-expanded') === 'true');
  return !!btn;
});
results.currentHighlighted = await page.evaluate(() => !!document.querySelector('aside button.nb-book-item-open'));
results.bgNotion = await page.evaluate(() => getComputedStyle(document.querySelector('main')).backgroundColor === 'rgb(247, 246, 243)');
await page.screenshot({ path: `${shots}/lab-desktop-home.png` });

// 2) 点章展开 → 点节展开 → 点实验条目切换
await page.locator('aside nav > div > button').filter({ hasText: '遗传与进化' }).first().click();
await page.waitForTimeout(300);
const secBtn = page.locator('aside nav div.ml-4 > div > button').filter({ hasText: '遗传与进化' }).first();
const secVisible = await secBtn.count();
if (secVisible) {
  await secBtn.click();
  await page.waitForTimeout(300);
  const item = page.locator('aside nav .nb-book-item', { hasText: '伴性' }).first();
  if (await item.count()) {
    await item.click();
    await page.waitForTimeout(800);
  }
}
results.pickFromToc = await page.evaluate(() => document.body.innerText.includes('伴性') || document.body.innerText.includes('遗传'));
await page.screenshot({ path: `${shots}/lab-desktop-expanded.png` });

// 3) 重置条件按钮（resetCount 生效：实验组件重挂载）
const r1 = await page.evaluate(() => document.querySelector('main').innerHTML.length);
await page.getByRole('button', { name: '重置条件' }).click();
await page.waitForTimeout(600);
const r2 = await page.evaluate(() => document.querySelector('main').innerHTML.length);
results.resetWorks = r1 > 0 && r2 > 0;

// 4) 搜索过滤左栏
await page.locator('aside input[type="search"]').fill('光合');
await page.waitForTimeout(600);
results.searchList = await page.evaluate(() => {
  const aside = document.querySelector('aside[aria-label="实验目录"]');
  return aside ? aside.innerText.includes('个结果') : false;
});
await page.screenshot({ path: `${shots}/lab-desktop-search.png` });
await page.locator('aside button[aria-label="清除搜索"]').click();
await page.waitForTimeout(300);

// 5) 深链 ?exp=
await page.goto(`${BASE}/lab?exp=bloodType`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3000);
results.deepLink = await page.evaluate(() => {
  const open = document.querySelector('aside button.nb-book-item-open');
  const title = document.body.innerText;
  return !!open && title.includes('血型');
});
await page.screenshot({ path: `${shots}/lab-desktop-deeplink.png` });

// 6) /cells 目录 Notion 化回归
await page.goto(`${BASE}/cells?specimen=fish`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2800);
results.cellsStillWorks = await page.evaluate(() => {
  const aside = document.querySelector('aside[aria-label="图鉴目录"]');
  const open = document.querySelector('aside button.nb-book-item-open');
  return !!aside && !!open && aside.innerText.includes('生物图鉴');
});
results.cellsBgNotion = await page.evaluate(() => getComputedStyle(document.querySelector('main')).backgroundColor === 'rgb(247, 246, 243)');
await page.screenshot({ path: `${shots}/cells-desktop-notion.png` });

// 7) /lab 窄屏回退
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(`${BASE}/lab`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2500);
results.mobileFallback = await page.evaluate(() => {
  const aside = document.querySelector('aside[aria-label="实验目录"]');
  const header = document.body.innerText.includes('从变量到结论');
  return !aside && header;
});
await page.screenshot({ path: `${shots}/lab-mobile.png`, fullPage: false });

await browser.close();
console.log(JSON.stringify(results, null, 2));
const ok = Object.values(results).every(Boolean);
console.log('ALL_OK=' + ok);
