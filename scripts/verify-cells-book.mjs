// 图鉴页书本布局验证：桌面双栏 + 窄屏回退 + 深链/交互抽查
import { chromium } from 'file:///D:/ClaudeCode/npm/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:3000';
const results = {};
const shots = 'scripts/shots-cells';
mkdirSync(shots, { recursive: true });

const chapterBtn = (page, name) =>
  page.locator('aside nav > div > button').filter({ hasText: name }).first();
const sectionBtn = (page, name) =>
  page.locator('aside nav div.ml-4 > div > button').filter({ hasText: name }).first();

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

// 1) 默认首页：桌面双栏 + 当前标本所在章默认展开
await page.goto(`${BASE}/cells`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(3000);
results.desktopOpen = await page.evaluate(() => {
  const aside = document.querySelector('aside[aria-label="图鉴目录"]');
  return !!aside && aside.innerText.includes('生物图鉴 · 目录');
});
results.defaultChapterOpen = (await chapterBtn(page, '动物世界').getAttribute('aria-expanded')) === 'true';
results.currentHighlighted = await page.evaluate(() => !!document.querySelector('aside button.nb-book-item-open'));
await page.screenshot({ path: `${shots}/desktop-home.png` });

// 2) 点其他章展开 → 点节展开 → 点标本条目切换
await chapterBtn(page, '遗传与分子').click();
await page.waitForTimeout(350);
results.chapterToggle = (await chapterBtn(page, '遗传与分子').getAttribute('aria-expanded')) === 'true';
await sectionBtn(page, '分子与遗传').click();
await page.waitForTimeout(350);
const geneItem = page.locator('aside nav .nb-book-item', { hasText: 'DNA' }).first();
results.tocItemVisible = (await geneItem.count()) > 0;
if (results.tocItemVisible) {
  await geneItem.click();
  await page.waitForTimeout(600);
  results.pickFromToc = await page.evaluate(() => document.querySelector('aside button.nb-book-item-open')?.textContent ?? '');
}
await page.screenshot({ path: `${shots}/desktop-expanded.png` });

// 3) 上一个/下一个（沿全书目录序）
const cnt1 = await page.locator('main').innerText();
await page.getByRole('button', { name: '下一个标本' }).click();
await page.waitForTimeout(400);
const cnt2 = await page.locator('main').innerText();
results.stepWorks = cnt1 !== cnt2;

// 4) 搜索过滤左栏
await page.locator('aside input[type="search"]').fill('线粒体');
await page.waitForTimeout(500);
results.searchList = await page.evaluate(() => {
  const aside = document.querySelector('aside[aria-label="图鉴目录"]');
  return aside ? aside.innerText.includes('个结果') : false;
});
await page.screenshot({ path: `${shots}/desktop-search.png` });
await page.locator('aside button[aria-label="清除搜索"]').click();
await page.waitForTimeout(300);

// 5) 深链：自动展开 + 高亮
await page.goto(`${BASE}/cells?specimen=fish`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2800);
results.deepLinkFish = await page.evaluate(() => {
  const open = document.querySelector('aside button.nb-book-item-open');
  return !!open && open.innerText.includes('鱼');
});
await page.screenshot({ path: `${shots}/desktop-deeplink-fish.png` });

// 6) 窄屏回退
await page.setViewportSize({ width: 375, height: 812 });
await page.goto(`${BASE}/cells`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2400);
results.mobileFallback = await page.evaluate(() => {
  const aside = document.querySelector('aside[aria-label="图鉴目录"]');
  const hero = document.body.innerText.includes('图鉴：把结构看清楚');
  return !aside && hero;
});
await page.screenshot({ path: `${shots}/mobile-home.png`, fullPage: false });

// 7) 桌面 ?cat= 深链
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`${BASE}/cells?cat=${encodeURIComponent('动物世界')}`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(2800);
results.deepLinkCat = await page.evaluate(() => {
  const aside = document.querySelector('aside[aria-label="图鉴目录"]');
  return aside ? aside.innerText.includes('动物世界') : false;
});

await browser.close();
console.log(JSON.stringify(results, null, 2));
const ok = Object.values(results).every(Boolean);
console.log('ALL_OK=' + ok);
