'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（课外拓展）',
    lines: [
      <>1953 年<span className="font-semibold">米勒-尤里实验</span>：模拟原始地球条件（CH₄、NH₃、H₂、水蒸气 + 闪电放电），一周后检测出多种<span className="font-semibold">氨基酸</span>等有机小分子。</>,
      <>意义：在生命起源的化学演化过程中，<span className="font-semibold">无机小分子 → 有机小分子</span>这一步在原始地球条件下是可能实现的。</>,
      <>后续阶段（仍是科学假说）：有机小分子 → 生物大分子 → 多分子体系 → 原始生命。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>火花放电次数：模拟原始地球的闪电，为化学反应提供能量。</>,
      <>放电次数越多，检测到的有机物种类越多（模型简化为计数）。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 认识装置：左瓶装原始大气，电极模拟闪电，冷凝管让产物"下雨"进入底部。</>,
      <>② 连续点击「火花放电」至少 5 次。</>,
      <>③ 点击「取样检测」看结果—— remembering：模拟的是"第一阶段：无机物→有机小分子"。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>原始大气：<span className="font-semibold">没有游离的氧气</span>（还原性大气）——这是能积累有机物的关键。</>,
      <>能量来源：闪电、紫外线、火山——米勒实验只用"放电"就够说明问题。</>,
      <>实验产物是<span className="font-semibold">氨基酸等有机小分子</span>，不是蛋白质、不是生命——层次不能拔高。</>,
    ],
  },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function MillerUreyLab() {
  const [sparks, setSparks] = useState(0);
  const [detected, setDetected] = useState(false);

  const ready = sparks >= 5;
  const products = Math.min(9, Math.floor(sparks * 1.4));

  const observation = (() => {
    if (sparks === 0) return '装置已就绪：左瓶是原始大气（CH₄、NH₃、H₂、水蒸气）——注意里面没有氧气。点击「火花放电」模拟闪电。';
    if (!ready) return `已放电 ${sparks} 次。原始地球的闪电从不"休息"，继续放电累积能量……（至少 5 次后可取样检测）`;
    if (!detected) return `已放电 ${sparks} 次，冷凝液正在底部积累。点击「取样检测」分析产物成分。`;
    return `检测结果：检测到 ${products} 种有机物，包括多种氨基酸！无机小分子在原始地球条件下确实能生成有机小分子——化学演化第一阶段成立。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={() => setSparks((s) => s + 1)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#b57c16] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#9a6a10]"
            >
              ⚡ 火花放电（{sparks} 次）
            </button>
            <button
              type="button"
              onClick={() => ready && setDetected(true)}
              disabled={!ready || detected}
              className={`${cnChip(detected)} w-full disabled:cursor-not-allowed disabled:opacity-40`}
            >
              取样检测产物（需 ≥5 次放电）
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              原始大气：CH₄、NH₃、H₂、水蒸气
              <br />
              <span className="font-semibold text-[#b0483a]">没有 O₂</span>（还原性大气）
              <br />
              能量来源：闪电 · 紫外线 · 火山
            </div>
            <button
              type="button"
              onClick={() => { setSparks(0); setDetected(false); }}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              重置实验
            </button>
          </>
        }
      >
        <SceneBox label="米勒-尤里实验装置（课外拓展 · 模拟原始地球）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 左烧瓶：原始大气 */}
            <circle cx="130" cy="110" r="62" fill="#dff0e8" stroke="#3f7f6a" strokeWidth="3.5" />
            <text x="130" y="96" textAnchor="middle" fontSize="12.5" fill="#2a5a4a" fontWeight="700">CH₄ NH₃</text>
            <text x="130" y="114" textAnchor="middle" fontSize="12.5" fill="#2a5a4a" fontWeight="700">H₂ H₂O（气）</text>
            <text x="130" y="196" textAnchor="middle" fontSize="12.5" fill="#2a5a4a" fontWeight="600">原始大气（无 O₂）</text>
            {/* 电极与火花 */}
            <g>
              <line x1="96" y1="64" x2="122" y2="92" stroke="#5a5a62" strokeWidth="4" strokeLinecap="round" />
              <line x1="164" y1="64" x2="138" y2="92" stroke="#5a5a62" strokeWidth="4" strokeLinecap="round" />
              {sparks > 0 ? (
                <path
                  d="M116 60 L128 74 L120 76 L134 94"
                  fill="none"
                  stroke={sparks % 2 === 0 ? '#f4d06a' : '#ffd98a'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(244,208,106,0.9))' }}
                />
              ) : (
                <text x="130" y="52" textAnchor="middle" fontSize="12" fill="#9ab0b5">未放电</text>
              )}
              <text x="130" y="26" textAnchor="middle" fontSize="13" fill="#b57c16" fontWeight="700">⚡ 模拟闪电</text>
            </g>
            {/* 连接管 + 冷凝 */}
            <path d="M192 110 Q 240 96 268 110" fill="none" stroke="#5a7a8a" strokeWidth="5" strokeLinecap="round" />
            <rect x="236" y="84" width="64" height="14" rx="7" fill="#9ab0b5" opacity="0.5" />
            <text x="268" y="76" textAnchor="middle" fontSize="12" fill="#4b6c73" fontWeight="600">冷凝管（模拟降雨降温）</text>
            {/* 右烧瓶：产物 */}
            <circle cx="330" cy="150" r="52" fill={detected ? '#f6dfd4' : '#f7fbfc'} stroke="#5a7a8a" strokeWidth="3.5" style={{ transition: 'fill 0.5s ease' }} />
            {detected ? (
              <g>
                {[[314, 142], [340, 136], [352, 158], [322, 162]].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="6" fill="#c9503c" opacity="0.85" />
                    <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke="#ffffff" strokeWidth="1.4" />
                  </g>
                ))}
                <text x="330" y="130" textAnchor="middle" fontSize="12" fill="#b0483a" fontWeight="700">氨基酸等有机物</text>
              </g>
            ) : (
              <text x="330" y="146" textAnchor="middle" fontSize="12" fill="#8aa1a6">冷凝产物积累中</text>
            )}
            <text x="330" y="222" textAnchor="middle" fontSize="12.5" fill="#4b6c73" fontWeight="600">底部：溶解产物的"原始海洋"</text>
            {/* 连接 */}
            <path d="M268 130 Q 292 140 288 148" fill="none" stroke="#5a7a8a" strokeWidth="5" strokeLinecap="round" />
            {/* 产物计数 */}
            {detected ? (
              <g>
                <rect x="40" y="240" width="360" height="40" rx="9" fill="#fdf6e3" stroke="#e9d9a8" strokeWidth="2" />
                <text x="220" y="265" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">
                  检出 {products} 种有机物——无机小分子 → 有机小分子 ✔
                </text>
              </g>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
