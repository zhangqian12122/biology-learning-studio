'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>要"专挑"能分解尿素的细菌，就得让培养基里<span className="font-semibold">只有尿素一种氮源</span>：能产生脲酶的细菌把尿素分解成氨，才能拿到氮元素生长。</>,
      <>脲酶分解尿素产生氨 → 培养基<span className="font-semibold">pH 升高 → 酚红指示剂变红</span>——菌落周围出现红色环带，就是"目标菌"的名牌。</>,
      <>这就是<span className="font-semibold">选择培养基</span>：允许特定微生物生长、同时抑制其他微生物——"选择压"来自营养成分的设计。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>可自选配方：氮源（尿素 / 蛋白胨可同时勾选）、葡萄糖碳源、酚红指示剂。</>,
      <>每换一次配方重新"接种培养"，观察菌落数量与颜色变化；错误配方也要试——知道为什么错才是掌握。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 先勾选"尿素 + 葡萄糖 + 酚红"，接种培养——看目标菌的红色菌落环。</>,
      <>② 补勾"蛋白胨"再培养一次：两种氮源都在，还有"选择"吗？</>,
      <>③ 分别去掉葡萄糖、去掉酚红、去掉尿素，观察三种失败各是什么样子。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>选择培养基的关键短语：<span className="font-semibold">"尿素为唯一氮源"</span>——多一个蛋白胨，选择压就没了。</>,
      <>统计菌落常配<span className="font-semibold">稀释涂布平板法</span>（30~300 个菌落最宜计数）；本实验用接种环划线也行。</>,
      <>酚红变红的化学本质：尿素 → 氨，碱性强弱变化——"指示剂变色原因"是高频简答。</>,
    ],
  },
];

type IngKey = 'urea' | 'peptone' | 'glucose' | 'phenol';
const ING_LABELS: Record<IngKey, string> = {
  urea: '尿素（氮源）',
  peptone: '蛋白胨（氮源）',
  glucose: '葡萄糖（碳源）',
  phenol: '酚红指示剂',
};

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

type Outcome = 'perfect' | 'noSelect' | 'noCarbon' | 'noIndicator' | 'noUrea' | 'nothing';

export function ChoiceMediaLab() {
  const [ing, setIng] = useState<Record<IngKey, boolean>>({
    urea: true,
    peptone: false,
    glucose: true,
    phenol: true,
  });
  const [cultured, setCultured] = useState(false);
  const [tried, setTried] = useState(1);

  const toggle = (key: IngKey) => {
    setIng((prev) => ({ ...prev, [key]: !prev[key] }));
    setCultured(false);
  };

  const outcome: Outcome = (() => {
    if (!ing.urea && !ing.peptone) return 'nothing';
    if (!ing.glucose) return 'noCarbon';
    if (!ing.urea && ing.peptone) return 'noUrea';
    if (ing.peptone) return 'noSelect';
    if (!ing.phenol) return 'noIndicator';
    return 'perfect';
  })();

  const culture = () => {
    if (!cultured) setTried((t) => t + 1);
    setCultured(true);
  };

  const reset = () => {
    setIng({ urea: true, peptone: false, glucose: true, phenol: true });
    setCultured(false);
    setTried(1);
  };

  const resultText: Record<Outcome, { title: string; detail: string; ok: boolean }> = {
    perfect: {
      title: '✅ 完美配方：筛出了尿素分解菌',
      detail: '尿素是唯一氮源——只有能分泌脲酶的细菌拿到氮元素；它们分解尿素产氨，菌落周围酚红变红，出现红色环带。杂菌因为没有"开尿素这把锁"的酶，长不起来。',
      ok: true,
    },
    noSelect: {
      title: '⚠ 失去选择性：杂菌疯长',
      detail: '蛋白胨里有现成的氮，几乎所有细菌都能吃——"尿素为唯一氮源"被破坏，培养板上各色杂菌混长，目标菌被淹没。选择培养基的灵魂就是"唯一"两个字。',
      ok: false,
    },
    noCarbon: {
      title: '⚠ 缺碳源：全军覆没',
      detail: '微生物的有机碳源和氮源是两码事——没有葡萄糖（或其他碳源），连尿素分解菌也无法合成身体物质，培养板上几乎一片空白。',
      ok: false,
    },
    noIndicator: {
      title: '⚠ 长是长出来了，但认不出',
      detail: '配方其实能筛出尿素分解菌，可是没有酚红——看不到"分解尿素产氨变红"的证据，肉眼分不清哪个菌落是目标菌。指示剂=给目标菌挂牌。',
      ok: false,
    },
    noUrea: {
      title: '⚠ 没有尿素：目标菌无从筛选',
      detail: '氮源只剩蛋白胨时人人都能长；氮源什么都没有时谁都长不了。想"专挑"分解尿素的细菌，尿素这个氮源本身就是选择压。',
      ok: false,
    },
    nothing: {
      title: '⚠ 什么氮源都没有',
      detail: '既没有尿素也没有蛋白胨——细菌拿不到氮元素合成蛋白质，培养板上空空如也。先勾一个氮源再接种。',
      ok: false,
    },
  };

  const observation = (() => {
    if (!cultured) {
      const list = (Object.keys(ING_LABELS) as IngKey[]).filter((k) => ing[k]).map((k) => ING_LABELS[k]);
      return `当前配方：${list.length ? list.join('、') : '（空配方）'}。点击「接种并培养 48h」看结果——先想想：为什么氮源必须是"唯一"的尿素？`;
    }
    const r = resultText[outcome];
    return `${r.title}。${r.detail}${outcome === 'perfect' ? ` 已尝试 ${tried} 种配方。` : ` 已尝试 ${tried} 种配方——把错误组合也试一遍，理解每种成分的作用。`}`;
  })();

  const perfect = cultured && outcome === 'perfect';
  const contaminated = cultured && outcome === 'noSelect';

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">培养基配方（点击增减成分）</p>
              <div className="grid gap-1.5">
                {(Object.keys(ING_LABELS) as IngKey[]).map((key) => (
                  <button key={key} type="button" onClick={() => toggle(key)} aria-pressed={ing[key]} className={`${cnChip(ing[key])} w-full text-left`}>
                    {ing[key] ? '✓ ' : '＋ '}{ING_LABELS[key]}
                  </button>
                ))}
                <div className="rounded-md bg-[#eef7f6] px-3 py-2 text-xs leading-5 text-[#4b6c73]">
                  固定成分：琼脂、水、无机盐
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={culture}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              接种并培养 48h
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置实验
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              已尝试配方：<span className="font-bold text-[#0a626a]">{tried}</span> 种
              <br />
              {cultured ? (perfect ? '🎉 成功筛选！' : '换配方再试试') : '尚未培养'}
            </div>
          </>
        }
      >
        <SceneBox label="选择培养基培养皿（接种土壤微生物稀释液）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 培养皿 */}
            <circle cx="220" cy="150" r="124" fill="#f7fbfc" stroke="#5a7a8a" strokeWidth="4" />
            <circle cx="220" cy="150" r="110" fill="#f6efdd" stroke="#d9c9a8" strokeWidth="2.5" />
            {!ing.phenol || !cultured ? null : <circle cx="220" cy="150" r="110" fill="#f2b8ac" opacity={outcome === 'noSelect' ? 0.25 : 0.45} />}
            <text x="220" y="36" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">
              固体培养基{cultured ? ' · 培养 48h 后' : ' · 待接种'}
            </text>

            {cultured ? (
              <g>
                {/* 目标菌：红色环带菌落 */}
                {outcome === 'perfect' || outcome === 'noIndicator' ? (
                  <g>
                    {[[164, 110, 15], [276, 128, 13], [210, 200, 17], [292, 196, 12]].map(([x, y, r], i) => (
                      <g key={i}>
                        {ing.phenol ? <circle cx={x} cy={y} r={r + 9} fill="#e8705a" opacity="0.5" /> : null}
                        <circle cx={x} cy={y} r={r} fill="#f4e3b8" stroke="#b5953a" strokeWidth="2" />
                      </g>
                    ))}
                    {ing.phenol ? (
                      <text x="220" y="272" textAnchor="middle" fontSize="13" fill="#b0483a" fontWeight="700">菌落周围变红环 = 分解尿素产氨（酚红遇碱变红）</text>
                    ) : (
                      <text x="220" y="272" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="700">菌落长出来了，但没有酚红——认不出谁是目标菌</text>
                    )}
                  </g>
                ) : null}
                {/* 失去选择性：杂菌混长 */}
                {contaminated ? (
                  <g>
                    {[[150, 100, 12, '#8fbf8a'], [200, 140, 9, '#e0b06a'], [250, 96, 13, '#b48ad0'], [300, 130, 10, '#e07a5a'], [180, 190, 11, '#8fbf8a'], [260, 206, 8, '#e0b06a'], [318, 176, 12, '#b48ad0'], [140, 176, 8, '#e07a5a']].map(([x, y, r, c], i) => (
                      <circle key={i} cx={x as number} cy={y as number} r={r as number} fill={c as string} stroke="#5a5a62" strokeWidth="1.6" opacity="0.9" />
                    ))}
                    <text x="220" y="272" textAnchor="middle" fontSize="13" fill="#b0483a" fontWeight="700">杂菌混长——蛋白胨让"人人有饭吃"，选择压消失</text>
                  </g>
                ) : null}
                {/* 缺碳源 / 无氮源：空板 */}
                {(outcome === 'noCarbon' || outcome === 'nothing') ? (
                  <text x="220" y="160" textAnchor="middle" fontSize="14" fill="#9ab0b5" fontWeight="700">几乎没有菌落生长</text>
                ) : null}
                {outcome === 'noUrea' && ing.peptone ? (
                  <g>
                    {[[190, 130, 11, '#8fbf8a'], [260, 160, 10, '#e0b06a'], [230, 200, 9, '#b48ad0'], [170, 190, 9, '#e07a5a']].map(([x, y, r, c], i) => (
                      <circle key={i} cx={x as number} cy={y as number} r={r as number} fill={c as string} stroke="#5a5a62" strokeWidth="1.6" opacity="0.9" />
                    ))}
                    <text x="220" y="272" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="700">杂菌在生长——但"分解尿素的菌"没法被挑出来</text>
                  </g>
                ) : null}
              </g>
            ) : (
              <text x="220" y="158" textAnchor="middle" fontSize="12.5" fill="#8aa1a6">滴加土壤微生物稀释液…</text>
            )}
            {/* 配方小标签 */}
            <g>
              <rect x="14" y="252" width="150" height="38" rx="8" fill="#ffffff" opacity="0.94" stroke="#d9e7e7" strokeWidth="1.6" />
              <text x="26" y="268" fontSize="11.5" fill="#4b6c73" fontWeight="600">
                氮源：{ing.urea ? '尿素' : '—'}{ing.urea && ing.peptone ? ' + 蛋白胨' : ing.peptone ? '蛋白胨' : ''}
              </text>
              <text x="26" y="284" fontSize="11.5" fill="#4b6c73" fontWeight="600">
                碳源：{ing.glucose ? '葡萄糖' : '—'} · 酚红：{ing.phenol ? '有' : '无'}
              </text>
            </g>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
