'use client';

import { useMemo, useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>在被调查种群的分布范围内，随机选取若干个<span className="font-semibold">样方</span>（1m² 正方形），通过计数每个样方内的个体数，求得平均值来<span className="font-semibold">估算</span>种群密度。</>,
      <>样方法适用于植物和活动能力弱、活动范围小的动物（如蚯蚓、蚜虫）。</>,
      <>种群密度 = 各样方个体数总和 ÷ 样方数（单位：株/m²）。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>用具：样方框（1m² 正方形硬框）、记录表、粉笔（标记）。</>,
      <>调查对象：双子叶草本植物（如蒲公英）。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 确定调查对象，选取适宜的调查地段。</>,
      <>② 将调查区域划分成若干等份（每份 1m²），逐份编号。</>,
      <>③ <span className="font-semibold">随机</span>抽取若干样方（一般不少于 5~10 个）。</>,
      <>④ 计数每个样方内的个体数：压在<span className="font-semibold">边界上的个体，只计相邻两条边及顶角者（"计上不计下、计左不计右"）</span>。</>,
      <>⑤ 求各样方平均值即为种群密度估算值。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>取样必须<span className="font-semibold">随机</span>，不能有意挑选植株多的地段——否则结果偏高，违背实验客观性。</>,
      <>样方数量与大小：数量越多误差越小；草本一般 1m² 样方、不少于 5~10 个。</>,
      <>边界计数规则（计上不计下、计左不计右）是高频考点——同一边界线个体只统计一侧，避免重复。</>,
    ],
  },
];

const Rng = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

function genField(seed: number) {
  const rnd = Rng(seed);
  return Array.from({ length: 26 }, () => ({
    x: 40 + rnd() * 360,
    y: 30 + rnd() * 240,
  }));
}

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function QuadratMethodLab() {
  const [seed, setSeed] = useState(7);
  const [placed, setPlaced] = useState(false);
  const field = useMemo(() => genField(seed), [seed]);

  // 5 个样方：1m² = 60px
  const QUAD = 60;
  const quads = useMemo(() => {
    const rnd = Rng(seed * 13 + 5);
    return Array.from({ length: 5 }, (_, i) => ({
      x: 30 + rnd() * (420 - 60 - QUAD),
      y: 22 + rnd() * (300 - 40 - QUAD),
      id: i + 1,
    }));
  }, [seed]);

  const perQuad = placed
    ? quads.map((q) => field.filter((p) => p.x >= q.x && p.x <= q.x + QUAD && p.y >= q.y && p.y <= q.y + QUAD).length)
    : [];
  const estimated = placed ? (perQuad.reduce((a, b) => a + b, 0) / quads.length).toFixed(1) : null;
  const trueDensity = field.length; // 全区 6m×6m=36m²? 教学简化：以全图 24m² 计
  const areaM2 = (420 / 60) * (300 / 60); // 7 × 5 = 35 m²
  const trueD = (trueDensity / areaM2).toFixed(1);

  const observation = !placed
    ? '草地上散布着蒲公英（绿色圆点）。样方法的关键是随机取样——点击「随机放置 5 个样方」开始计数。'
    : `5 个样方计数分别为 ${perQuad.join('、')} 株，平均 ${estimated} 株/m²；全区域真实密度约 ${trueD} 株/m²——估算值与真实值接近。记住边界个体"计上不计下、计左不计右"。`;

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button type="button" onClick={() => setSeed((s) => s + 1)} className={cnChip(false) + ' w-full'}>
              🌱 生成新的草地分布
            </button>
            <button
              type="button"
              onClick={() => setPlaced(true)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              随机放置 5 个样方（1m²）
            </button>
            <button
              type="button"
              disabled={!placed}
              onClick={() => setPlaced(false)}
              className={`${cnChip(false) + ' w-full'} disabled:cursor-not-allowed disabled:opacity-40`}
            >
              收回样方
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {placed ? (
                <>
                  各样方计数：{perQuad.map((n, i) => `${i + 1}号 ${n}株`).join(' · ')}
                  <br />
                  估算种群密度：<span className="text-base font-bold text-[#0e6f75]">{estimated}</span> 株/m²
                </>
              ) : (
                '样方法要点：随机取样；样方数足够多；边界计数规则。'
              )}
            </div>
          </>
        }
      >
        <SceneBox label="调查区域俯视（绿色圆点 = 蒲公英个体，每格 1m²）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 420 300" aria-hidden="true">
            {/* 草地网格 */}
            <rect x="20" y="20" width="400" height="280" fill="#e6f0dc" />
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <line key={`v${i}`} x1={20 + i * 60} y1="20" x2={20 + i * 60} y2="300" stroke="#d0e0c2" strokeWidth="1" />
            ))}
            {[1, 2, 3, 4].map((i) => (
              <line key={`h${i}`} x1="20" y1={20 + i * 60} x2="420" y2={20 + i * 60} stroke="#d0e0c2" strokeWidth="1" />
            ))}

            {/* 蒲公英个体 */}
            {field.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="5.5" fill="#4caf50" stroke="#2f7a3d" strokeWidth="1.4" />
                <circle cx={p.x} cy={p.y} r="1.8" fill="#2f7a3d" />
              </g>
            ))}

            {/* 样方 */}
            {placed
              ? quads.map((q, i) => {
                  const count = perQuad[i];
                  return (
                    <g key={q.id}>
                      <rect x={q.x} y={q.y} width={QUAD} height={QUAD} fill="#f4d06a" fillOpacity="0.18" stroke="#c99a2e" strokeWidth="3" rx="2" />
                      <text x={q.x + 6} y={q.y + 16} fontSize="10" fill="#8a671b" fontWeight="700">
                        {count}株
                      </text>
                    </g>
                  );
                })
              : null}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
