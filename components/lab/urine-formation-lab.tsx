'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '尿的形成：两个连续阶段',
    lines: [
      <>第一阶段<span className="font-semibold">肾小球（和肾小囊内壁）的过滤作用</span>：血液流经肾小球时，除血细胞和大分子蛋白质外，水、无机盐、葡萄糖、尿素等被过滤到肾小囊中形成<span className="font-semibold">原尿</span>（每天约 150 L）。</>,
      <>第二阶段<span className="font-semibold">肾小管的重吸收作用</span>：原尿流经肾小管时，全部葡萄糖、大部分水和部分无机盐被重新吸收回血液，剩下的形成<span className="font-semibold">尿液</span>（每天约 1.5 L）。</>,
      <>99% 的原尿被重吸收——这正是肾脏"浓缩"废物的精巧之处。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>血糖浓度滑块（4~16 mmol/L）：影响原尿中的葡萄糖量。</>,
      <>肾糖阈约 10 mmol/L：血糖超过它，原尿中的葡萄糖就超过肾小管的重吸收能力，尿液中出现葡萄糖（糖尿）。</>,
      <>观察点：各阶段的物质数量与成分变化。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 把血糖调到 5 mmol/L（正常），依次点「过滤 → 重吸收 → 尿液」三个阶段，记录数量变化。</>,
      <>② 把血糖调到 12 mmol/L 重复三步，观察原尿与终尿的葡萄糖变化——这就是糖尿病检测的原理。</>,
      <>③ 对比"原尿 150 L → 尿液 1.5 L"，理解重吸收的意义。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>原尿与血液的区别：原尿<span className="font-semibold">没有血细胞和大分子蛋白质</span>。</>,
      <>尿液与原尿的区别：尿液<span className="font-semibold">没有葡萄糖</span>（正常时），水与无机盐大幅减少、尿素被浓缩。</>,
      <>"糖尿"不一定等于糖尿病：一次性吃糖过多也可能短暂超过肾糖阈；诊断要结合血糖检测。</>,
    ],
  },
];

type Stage = 0 | 1 | 2 | 3; // 0 未开始 1 过滤 2 重吸收 3 尿液

const FORMAT = (v: number) => (v >= 10 ? v.toFixed(0) : v.toFixed(v >= 1 ? 1 : 2));

export function UrineFormationLab() {
  const [glucose, setGlucose] = useState(5);
  const [stage, setStage] = useState<Stage>(0);

  const sugarIn = glucose * 0.03; // 原尿葡萄糖（相对量·演示用）
  const renalThreshold = 10;
  const aboveThreshold = glucose > renalThreshold;
  const reabsorbedSugar = aboveThreshold ? 10 * 0.03 : sugarIn;
  const sugarInUrine = aboveThreshold ? sugarIn - reabsorbedSugar : 0;

  const stageData = (() => {
    if (stage === 0) return null;
    if (stage === 1) {
      return {
        title: '① 肾小球过滤 → 原尿',
        water: '150 L（水大部分被滤出）',
        glucose: `${FORMAT(glucose * 3.6)} g（全部滤入原尿）`,
        urea: '约 60 g（随水滤出）',
        note: '血细胞与大分子蛋白质被挡在血管内——原尿里没有它们。',
      };
    }
    if (stage === 2) {
      return {
        title: '② 肾小管重吸收',
        water: '重吸收约 99% 的水（148.5 L 回血液）',
        glucose: aboveThreshold
          ? `全部重吸收只能处理约 ${FORMAT(reabsorbedSugar * 3.6)} g——超出肾糖阈！`
          : '葡萄糖被全部重吸收回血液（0 残留）',
        urea: '尿素基本不被重吸收（浓缩）',
        note: aboveThreshold ? '血糖超过肾糖阈（约 10 mmol/L）：肾小管"忙不过来"，多余的葡萄糖进入尿液。' : '肾小管像精密的回收站：有用的全部收回。',
      };
    }
    return {
      title: '③ 终尿（送入膀胱）',
      water: '约 1.5 L',
      glucose: aboveThreshold ? `${FORMAT(sugarInUrine * 3.6)} g 葡萄糖——出现糖尿！` : '无葡萄糖',
      urea: '约 60 g（被浓缩 40 倍）',
      note: aboveThreshold ? '尿中含糖是糖尿病的典型信号之一（诊断还需结合血糖检测）。' : '正常尿液：水 + 尿素 + 无机盐，无葡萄糖、无蛋白质、无血细胞。',
    };
  })();

  const step = () => setStage((s) => Math.min(3, s + 1) as Stage);
  const reset = () => {
    setStage(0);
  };

  const urineColor = (() => {
    if (stage < 3) return '#e8e2c0';
    return aboveThreshold ? '#e8d488' : '#e8e2a8';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">
                血糖浓度：<span className={`text-base font-bold ${aboveThreshold ? 'text-[#b0483a]' : 'text-[#2f7a4d]'}`}>{glucose}</span> mmol/L
                {aboveThreshold ? <span className="ml-1 text-[#b0483a]">（超过肾糖阈）</span> : null}
              </p>
              <input
                type="range"
                min={4}
                max={16}
                step={1}
                value={glucose}
                onChange={(e) => setGlucose(Number(e.target.value))}
                className="w-full accent-[#0e6f75]"
                aria-label="调节血糖浓度"
              />
              <p className="mt-1 text-[11px] text-[#799398]">肾糖阈约 10 mmol/L——超过它尿液里就会出现葡萄糖。</p>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={stage >= 3}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {stage === 0 ? '▶ 第一步：肾小球过滤' : stage === 1 ? '▶ 第二步：肾小管重吸收' : stage === 2 ? '▶ 第三步：形成终尿' : '已完成全部阶段'}
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
          </>
        }
      >
        <SceneBox label="尿的形成流程（肾单位：肾小球 → 肾小管 → 尿液）" heightClass="h-[300px]">
          <svg className="h-full w-full" viewBox="0 0 440 250" aria-hidden="true">
            {/* 肾小球过滤 */}
            <g>
              <circle cx="80" cy="80" r="34" fill="#f6d4cc" stroke="#c97a6a" strokeWidth="3" />
              <path d="M62 68 Q 80 56 98 68 M60 84 Q 80 72 100 84 M62 100 Q 80 90 98 100" fill="none" stroke="#c94a5a" strokeWidth="2" />
              <rect x="42" y="118" width="76" height="30" rx="10" fill="#fdf6d8" stroke="#c9b86a" strokeWidth="2" />
              <text x="80" y="138" textAnchor="middle" fontSize="9.5" fill="#8a7a2a" fontWeight="600">肾小囊（原尿）</text>
              <text x="80" y="36" textAnchor="middle" fontSize="11" fill="#8a4a56" fontWeight="700">肾小球（过滤）</text>
              <text x="80" y="166" textAnchor="middle" fontSize="9" fill="#8a5a52">血细胞/大分子蛋白被挡住</text>
            </g>
            {/* 肾小管 */}
            <path d="M124 132 Q 170 150 210 128 Q 250 108 288 128 Q 324 146 336 172" fill="none" stroke="#e0b878" strokeWidth="14" strokeLinecap="round" />
            <path d="M124 132 Q 170 150 210 128 Q 250 108 288 128 Q 324 146 336 172" fill="none" stroke="#c9881d" strokeWidth="4" strokeDasharray="10 8" />
            <text x="222" y="176" textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="700">肾小管（重吸收 99% 水·全部葡萄糖）</text>
            {/* 重吸收回血箭头 */}
            <path d="M210 122 Q 206 92 196 78" fill="none" stroke="#2f7a4d" strokeWidth="2.6" markerEnd="url(#uf-arrow)" />
            <text x="150" y="88" fontSize="9.5" fill="#2f7a4d" fontWeight="600">重吸收回血液</text>
            {/* 尿液收集 */}
            <path d="M336 172 Q 352 186 352 202" fill="none" stroke="#7a8a9a" strokeWidth="6" />
            <path d="M314 210 Q 352 196 390 210 L390 232 Q 352 244 314 232 Z" fill={stage >= 3 ? urineColor : '#e8eef0'} stroke="#7a8a9a" strokeWidth="2.5" />
            <text x="352" y="226" textAnchor="middle" fontSize="10.5" fill={stage >= 3 ? '#8a6a1d' : '#59767c'} fontWeight="700">
              {stage >= 3 ? '尿液 1.5 L/天' : '膀胱'}
            </text>
            {/* 阶段指示 */}
            {[[80, 42, 1], [222, 96, 2], [352, 226, 3]].map(([cx, cy, need]) => (
              <circle key={need as number} cx={cx as number} cy={(cy as number) - 24} r="9" fill={stage >= (need as number) ? '#0e6f75' : '#dceaea'} stroke="#13333a" strokeWidth="1.6" />
            ))}
            {stageData ? (
              <g>
                <rect x="70" y="188" width="180" height="52" rx="10" fill="#ffffff" stroke="#13333a" strokeWidth="2" />
                <text x="82" y="206" fontSize="10.5" fill="#13333a" fontWeight="800">{stageData.title}</text>
                <text x="82" y="222" fontSize="9" fill="#59767c">{stageData.note.slice(0, 30)}</text>
              </g>
            ) : null}
            <defs>
              <marker id="uf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#2f7a4d" />
              </marker>
            </defs>
          </svg>

          {/* 阶段数据表 */}
          <div className="border-t border-[#dceaea] px-4 py-3">
            {stageData ? (
              <dl className="grid gap-1.5 text-xs leading-5 text-[#4b6c73] sm:grid-cols-3">
                <div className="rounded-md bg-[#eef7f6] px-3 py-2">
                  <dt className="font-bold text-[#13333a]">水</dt>
                  <dd>{stageData.water}</dd>
                </div>
                <div className="rounded-md bg-[#eef7f6] px-3 py-2">
                  <dt className="font-bold text-[#13333a]">葡萄糖</dt>
                  <dd className={aboveThreshold && stage >= 2 ? 'font-semibold text-[#b0483a]' : ''}>{stageData.glucose}</dd>
                </div>
                <div className="rounded-md bg-[#eef7f6] px-3 py-2">
                  <dt className="font-bold text-[#13333a]">尿素</dt>
                  <dd>{stageData.urea}</dd>
                </div>
              </dl>
            ) : (
              <p className="text-xs leading-5 text-[#799398]">调节血糖滑块后，按「第一步」开始逐步观察尿的形成。</p>
            )}
          </div>
        </SceneBox>

        <ObservationNote>
          {stageData
            ? `${stageData.note}`
            : '把血糖调到正常值 5 mmol/L，依次点三步：看 150 L 原尿如何被浓缩成 1.5 L 尿液；再把血糖调到 12 mmol/L 重来一遍，观察"糖尿"是怎么出现的。'}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
