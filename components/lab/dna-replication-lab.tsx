'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>用 <span className="font-semibold">¹⁵N 标记</span>的大肠杆菌在 <span className="font-semibold">¹⁴N 培养基</span>中连续培养，不同代数取样离心——轻、中、重三条带的位置直接反映复制方式。</>,
      <>半保留复制：亲代两条链分开，各自作为模板合成新链 → 第 1 代应<span className="font-semibold">全部为中带</span>。</>,
      <>全保留复制（旧假说）：亲代 DNA 原封不动 → 第 1 代就应出现轻带。实验结果没有轻带——全保留被否定。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>自变量：培养代数（0~3 代）与假说模型；因变量：离心管中条带的位置与比例。</>,
      <>对照：两支试管并排展示"半保留预测"与"全保留预测"——预测不同之处就是判据。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 先在心里预测：第 1 代离心，两种模型的条带各在哪里？再看两管。</>,
      <>② 连续复制到第 2、3 代，找出两模型条带开始分化的代数。</>,
      <>③ 对照条带比例（中：轻 = 1:1、1:3……）理解"半保留"的含义。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>第 2 代起两模型都出现轻带——<span className="font-semibold">关键判据是第 1 代有没有轻带</span>（以及中带是否持续存在）。</>,
      <>半保留第 2 代中带：轻带 = 1:1，第 3 代 = 1:3（含 ¹⁵N 的 DNA 分子永远只有 2 个）。</>,
      <>DNA 复制需要模板、原料（4 种脱氧核苷酸）、能量（ATP）和酶（解旋酶、DNA 聚合酶）。</>,
    ],
  },
];

type Band = { kind: '重' | '中' | '轻'; pct: number };

/** 半保留复制各代条带 */
const SEMI: Band[][] = [
  [{ kind: '重', pct: 100 }],
  [{ kind: '中', pct: 100 }],
  [{ kind: '中', pct: 50 }, { kind: '轻', pct: 50 }],
  [{ kind: '中', pct: 25 }, { kind: '轻', pct: 75 }],
];
/** 全保留复制各代条带 */
const CONS: Band[][] = [
  [{ kind: '重', pct: 100 }],
  [{ kind: '重', pct: 50 }, { kind: '轻', pct: 50 }],
  [{ kind: '重', pct: 25 }, { kind: '轻', pct: 75 }],
  [{ kind: '重', pct: 12.5 }, { kind: '轻', pct: 87.5 }],
];

const BAND_Y: Record<Band['kind'], number> = { 轻: 96, 中: 168, 重: 240 };
const BAND_COLOR: Record<Band['kind'], string> = { 轻: '#9fcab2', 中: '#e0b06a', 重: '#c9503c' };

function Tube({ bands, label }: { bands: Band[]; label: string }) {
  return (
    <g>
      <path d="M60 60 L 92 88 L 92 296 Q 92 312 108 312 L 192 312 Q 208 312 208 296 L 208 88 L 240 60 Z" fill="#f7fbfc" stroke="#5a7a8a" strokeWidth="3.5" />
      {bands.map((band) => (
        <g key={band.kind}>
          <rect
            x={102}
            y={BAND_Y[band.kind]}
            width={Math.max(14, (band.pct / 100) * 96)}
            height={26}
            rx={8}
            fill={BAND_COLOR[band.kind]}
            opacity="0.92"
            style={{ transition: 'width 0.4s ease, opacity 0.4s ease' }}
          />
          <text x={216} y={BAND_Y[band.kind] + 18} fontSize="13" fill="#4b6c73" fontWeight="600">
            {band.pct === 100 ? '全部' : `${band.pct}%`}{band.kind}带
          </text>
        </g>
      ))}
      <text x="150" y="340" textAnchor="middle" fontSize="14" fill="#173b42" fontWeight="700">{label}</text>
    </g>
  );
}

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function DnaReplicationLab() {
  const [gen, setGen] = useState(0);

  const observation = (() => {
    if (gen === 0) {
      return '亲代细菌在 ¹⁵N 培养基中培养，DNA 双链都是重链（¹⁵N）。先预测：转移到 ¹⁴N 培养基复制一代后，两种假说的离心条带分别在哪里？';
    }
    const semi = SEMI[gen];
    const cons = CONS[gen];
    if (gen === 1) {
      return semi[0].kind === '中'
        ? `第 1 代：半保留预测全为中带（亲代链各配一条新链）；全保留预测出现轻带（亲代 DNA 原封不动）。梅塞尔森-斯塔尔实验第 1 代全为中带——全保留模型当场出局。`
        : `第 1 代：全保留出现轻带、半保留为中带。实验支持哪支？`;
    }
    if (gen === 2) {
      return `第 2 代：半保留中带：轻带 = 1:1（4 个 DNA 中 2 个仍含亲代重链）；全保留重带只剩 25%。实验观察到的正是 1:1——半保留复制得到确认。`;
    }
    return `第 3 代：半保留中带：轻带 = 1:3（含重链的 DNA 永远只有最初那 2 个分子）；两模型差异越拉越大。结论：DNA 以半保留方式复制。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              亲代：¹⁵N 重链细菌 → 转入 ¹⁴N 轻培养基<br />
              当前代数：<span className="text-base font-bold text-[#0a626a]">第 {gen} 代</span>
            </div>
            <button
              type="button"
              onClick={() => setGen((g) => Math.min(3, g + 1))}
              disabled={gen >= 3}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              复制一代（{gen}/3）
            </button>
            <button type="button" onClick={() => setGen(0)} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置实验
            </button>
            <div className="rounded-md border border-[#e2eeec] bg-white px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              <p className="font-semibold text-[#173b42]">条带速查</p>
              重带 = 双链都是 ¹⁵N<br />
              中带 = 一条重一条轻<br />
              轻带 = 双链都是 ¹⁴N
            </div>
          </>
        }
      >
        <SceneBox label="密度梯度离心：两支试管 = 两种假说的预测（重带沉底、轻带在上）" heightClass="h-[360px]">
          <svg className="h-full w-full" viewBox="0 0 440 360" aria-hidden="true">
            <Tube bands={SEMI[gen]} label={`半保留模型（✅ 正确）第 ${gen} 代`} />
            <g transform="translate(230 0)">
              <Tube bands={CONS[gen]} label={`全保留模型（❌ 被否定）第 ${gen} 代`} />
            </g>
            <text x="220" y="352" textAnchor="middle" fontSize="13" fill="#59767c" fontWeight="600">
              判据：第 1 代有没有轻带？
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
