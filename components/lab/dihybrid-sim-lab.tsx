'use client';

import { useMemo, useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>F₁（YyRr）的两对同源染色体上分别载着 Y/y 与 R/r。减数第一次分裂后期，同源染色体分离的同时，<span className="font-semibold">非同源染色体上的非等位基因自由组合</span>，产生 YR、Yr、yR、yr 四种配子，比例 1:1:1:1。</>,
      <>雌雄配子随机结合，F₂ 共 16 份组合；表现型比例为<span className="font-semibold"> 黄圆 : 黄皱 : 绿圆 : 绿皱 ≈ 9 : 3 : 3 : 1</span>。</>,
      <>本模型用随机数模拟"减数分裂产生配子 + 雌雄配子随机受精"，重复次数越多，统计比例越接近理论值。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>两对相对性状：粒色 黄（Y）对 绿（y）为显性；粒形 圆（R）对 皱（r）为显性。</>,
      <>单次「模拟」= 雌、雄各随机产生一个配子并受精，得到一粒 F₂ 种子。</>,
      <>观察点：四种表现型的柱高是否随次数增加而趋近 9 : 3 : 3 : 1。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 先点「模拟 1 次」若干次，看清配子如何组合成一粒种子。</>,
      <>② 再点「模拟 100 次」快速累积样本，观察比例收敛。</>,
      <>③ 思考：若两对基因位于同一对同源染色体上（连锁），还能得到 9:3:3:1 吗？</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>9 : 3 : 3 : 1 成立的前提：<span className="font-semibold">两对基因位于非同源染色体上（独立遗传）</span>，且各配子活力相同、受精随机。</>,
      <>F₂ 中<span className="font-semibold">重组类型</span>（黄皱 + 绿圆）占 6/16 = 3/8；纯合子（YYRR、YYrr、yyRR、yyrr）各占 1/16。</>,
      <>逐对分析更快捷：粒色 黄:绿 = 3:1，粒形 圆:皱 = 3:1，两对相乘即 (3:1)² = 9:3:3:1。</>,
    ],
  },
];

type Gamete = 'YR' | 'Yr' | 'yR' | 'yr';
const GAMETES: Gamete[] = ['YR', 'Yr', 'yR', 'yr'];

const PHENOS = ['黄圆', '黄皱', '绿圆', '绿皱'] as const;
type Pheno = (typeof PHENOS)[number];

function phenoOf(egg: Gamete, sperm: Gamete): Pheno {
  const pair = egg + sperm;
  const yellow = pair.includes('Y');
  const round = pair.includes('R');
  return yellow ? (round ? '黄圆' : '黄皱') : round ? '绿圆' : '绿皱';
}

function phenoOfGeno(g: Gamete): Pheno {
  return g.includes('Y') ? (g.includes('R') ? '黄圆' : '黄皱') : g.includes('R') ? '绿圆' : '绿皱';
}

const PHENO_COLORS: Record<Pheno, string> = {
  黄圆: '#e0b04a',
  黄皱: '#d8c98a',
  绿圆: '#8ab86a',
  绿皱: '#a8c98a',
};

/** 随机产生一个配子：Y/y 与 R/r 各自独立 1:1 */
function makeGamete(): Gamete {
  const y = Math.random() < 0.5 ? 'Y' : 'y';
  const r = Math.random() < 0.5 ? 'R' : 'r';
  return (y + r) as Gamete;
}

export function DihybridSimLab() {
  const [counts, setCounts] = useState<Record<Pheno, number>>({ 黄圆: 0, 黄皱: 0, 绿圆: 0, 绿皱: 0 });
  const [last, setLast] = useState<{ egg: Gamete; sperm: Gamete; pheno: Pheno } | null>(null);
  const total = counts.黄圆 + counts.黄皱 + counts.绿圆 + counts.绿皱;

  const simulateOnce = () => {
    const egg = makeGamete();
    const sperm = makeGamete();
    const pheno = phenoOf(egg, sperm);
    setLast({ egg, sperm, pheno });
    setCounts((prev) => ({ ...prev, [pheno]: prev[pheno] + 1 }));
  };

  const simulateMany = (n: number) => {
    const add = { 黄圆: 0, 黄皱: 0, 绿圆: 0, 绿皱: 0 } as Record<Pheno, number>;
    for (let i = 0; i < n; i++) {
      const pheno = phenoOf(makeGamete(), makeGamete());
      add[pheno]++;
    }
    setCounts((prev) => ({
      黄圆: prev.黄圆 + add.黄圆,
      黄皱: prev.黄皱 + add.黄皱,
      绿圆: prev.绿圆 + add.绿圆,
      绿皱: prev.绿皱 + add.绿皱,
    }));
  };

  const reset = () => {
    setCounts({ 黄圆: 0, 黄皱: 0, 绿圆: 0, 绿皱: 0 });
    setLast(null);
  };

  const bars = useMemo(() => {
    const max = Math.max(1, counts.黄圆, counts.黄皱, counts.绿圆, counts.绿皱);
    const theory: Record<Pheno, number> = { 黄圆: 9 / 16, 黄皱: 3 / 16, 绿圆: 3 / 16, 绿皱: 1 / 16 };
    return PHENOS.map((pheno) => ({
      pheno,
      count: counts[pheno],
      width: (counts[pheno] / max) * 100,
      ratio: total > 0 ? counts[pheno] / total : 0,
      theory: theory[pheno],
    }));
  }, [counts, total]);

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={simulateOnce}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              🎲 模拟 1 次（雌雄配子随机受精）
            </button>
            <button
              type="button"
              onClick={() => simulateMany(100)}
              className="min-h-10 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-semibold text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              ⚡ 快速模拟 100 次
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              清空统计重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              已获得 F₂ 种子 <span className="text-base font-bold text-[#13333a]">{total}</span> 粒。建议累积 200 粒以上，比例才稳定接近 9:3:3:1。
            </div>
          </>
        }
      >
        <SceneBox label="F₁（YyRr）减数分裂 → 配子自由组合 → 受精" heightClass="h-[320px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* F₁ 细胞：两对同源染色体 */}
            <rect x="24" y="28" width="150" height="120" rx="14" fill="#f4faf9" stroke="#9db8bc" strokeWidth="2" />
            <text x="99" y="48" textAnchor="middle" fontSize="10.5" fill="#59767c" fontWeight="700">F₁ 初级性母细胞（YyRr）</text>
            {/* 第一对：Y / y（紫） */}
            <rect x="62" y="60" width="12" height="72" rx="6" fill="#b08ac9" stroke="#7a4a8a" strokeWidth="2" />
            <text x="68" y="102" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="800">Y</text>
            <rect x="86" y="60" width="12" height="72" rx="6" fill="#e2c8ee" stroke="#7a4a8a" strokeWidth="2" />
            <text x="92" y="102" textAnchor="middle" fontSize="11" fill="#7a4a8a" fontWeight="800">y</text>
            {/* 第二对：R / r（绿） */}
            <rect x="122" y="60" width="12" height="72" rx="6" fill="#7aa86a" stroke="#3f7f3a" strokeWidth="2" />
            <text x="128" y="102" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="800">R</text>
            <rect x="146" y="60" width="12" height="72" rx="6" fill="#c8e2ba" stroke="#3f7f3a" strokeWidth="2" />
            <text x="152" y="102" textAnchor="middle" fontSize="11" fill="#3f7f3a" fontWeight="800">r</text>
            <text x="99" y="140" textAnchor="middle" fontSize="9" fill="#799398">减Ⅰ后期：同源分离、非同源自由组合</text>

            {/* 箭头 */}
            <path d="M182 88 L224 88" stroke="#5f7076" strokeWidth="2.5" markerEnd="url(#dh-arrow)" />

            {/* 四种配子 */}
            {GAMETES.map((g, i) => {
              const x = 236 + i * 46;
              const isEgg = last?.egg === g;
              const isSperm = last?.sperm === g;
              return (
                <g key={g}>
                  <rect x={x} y={60} width="40" height="64" rx="8" fill={isEgg || isSperm ? '#fdf1cf' : '#ffffff'} stroke={isEgg || isSperm ? '#c98a1d' : '#c6d4d4'} strokeWidth={isEgg || isSperm ? '2.6' : '2'} />
                  <text x={x + 20} y={88} textAnchor="middle" fontSize="12.5" fill="#13333a" fontWeight="800">{g}</text>
                  <text x={x + 20} y={106} textAnchor="middle" fontSize="8.5" fill="#8aa1a6">{isEgg ? '卵' : isSperm ? '精' : ''}</text>
                </g>
              );
            })}
            <text x="306" y="48" textAnchor="middle" fontSize="10.5" fill="#59767c" fontWeight="700">四种配子（比例 1:1:1:1）</text>

            {/* 受精结果 */}
            {last ? (
              <g>
                <path d="M160 176 L200 176" stroke="#5f7076" strokeWidth="2.5" markerEnd="url(#dh-arrow)" />
                <text x="128" y="180" textAnchor="middle" fontSize="10" fill="#59767c">受精</text>
                <rect x="210" y="152" width="196" height="76" rx="12" fill="#ffffff" stroke="#13333a" strokeWidth="2.4" />
                <text x="228" y="180" fontSize="11.5" fill="#59767c">
                  雌配子 <tspan fontWeight="800" fill="#7a4a8a">{last.egg}</tspan> × 雄配子 <tspan fontWeight="800" fill="#3f7f3a">{last.sperm}</tspan>
                </text>
                <text x="228" y="202" fontSize="12" fill="#13333a">
                  基因型 <tspan fontWeight="800">{[...last.egg].sort().join('')} / {[...last.sperm].sort().join('')}</tspan> →
                </text>
                <rect x="330" y="162" width="62" height="30" rx="7" fill={PHENO_COLORS[last.pheno]} stroke="#13333a" strokeWidth="1.8" />
                <text x="361" y="182" textAnchor="middle" fontSize="12.5" fill="#13333a" fontWeight="800">{last.pheno}</text>
              </g>
            ) : (
              <text x="220" y="192" textAnchor="middle" fontSize="11" fill="#9ab0b5">点击左侧「模拟 1 次」开始</text>
            )}
            <defs>
              <marker id="dh-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#5f7076" />
              </marker>
            </defs>
          </svg>

          {/* 表现型统计 */}
          <div className="border-t border-[#dceaea] px-4 py-3">
            {bars.map(({ pheno, count, width, ratio, theory }) => (
              <div key={pheno} className="mb-1.5 flex items-center gap-2">
                <span className="w-10 text-xs font-bold text-[#13333a]">{pheno}</span>
                <div className="relative h-4 flex-1 rounded-full bg-[#eef4f3]">
                  <div className="h-4 rounded-full transition-all" style={{ width: `${width}%`, background: PHENO_COLORS[pheno] }} />
                  <div className="absolute top-[-2px] h-5 border-l-2 border-dashed border-[#b0483a]" style={{ left: `${theory * 100}%` }} />
                </div>
                <span className="w-20 text-right text-[11px] text-[#59767c]">
                  {count}（{total > 0 ? (ratio * 100).toFixed(1) : '0.0'}%）
                </span>
              </div>
            ))}
            <p className="mt-1 text-[11px] text-[#799398]">红色虚线 = 理论比例：黄圆 9/16、黄皱 3/16、绿圆 3/16、绿皱 1/16</p>
          </div>
        </SceneBox>

        <ObservationNote>
          {total === 0
            ? 'F₁（YyRr）能产生 YR、Yr、yR、yr 四种配子。点击「模拟 1 次」看雌雄配子如何随机结合成一粒 F₂ 种子，再「快速模拟 100 次」观察比例走向。'
            : total < 100
              ? `已获 ${total} 粒 F₂：黄圆 ${counts.黄圆}、黄皱 ${counts.黄皱}、绿圆 ${counts.绿圆}、绿皱 ${counts.绿皱}。样本还不够多，比例波动大——继续「快速模拟 100 次」。`
              : `已获 ${total} 粒 F₂。四种表现型比例 ${(counts.黄圆 / total * 16).toFixed(1)} : ${(counts.黄皱 / total * 16).toFixed(1)} : ${(counts.绿圆 / total * 16).toFixed(1)} : ${(counts.绿皱 / total * 16).toFixed(1)}，已接近理论值 9 : 3 : 3 : 1——这就是自由组合定律的统计证据。`}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
