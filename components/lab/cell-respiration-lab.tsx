'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（有氧呼吸三阶段）',
    lines: [
      <>有氧呼吸分三个阶段：<span className="font-semibold">①糖酵解</span>（细胞质基质：1 分子葡萄糖分解为 2 分子丙酮酸，产少量 ATP）；<span className="font-semibold">②柠檬酸循环</span>（线粒体基质：丙酮酸和水彻底分解成 CO₂ 和氢，产少量 ATP）；<span className="font-semibold">③氧化磷酸化</span>（线粒体内膜：前两阶段脱下的氢与 O₂ 结合生成水，产生<span className="font-semibold">大量</span> ATP）。</>,
      <>三个阶段中只有第三阶段需要 O₂ 直接参与；CO₂ 在第二阶段产生；水既是第二阶段的原料又是第三阶段的产物。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>逐步推进三个阶段，追踪葡萄糖的"去向"与 ATP 的"收入"。</>,
      <>观察点：ATP 主要来自第三阶段（28~30/32）；反应场所从细胞质基质移入线粒体。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 点「进入糖酵解」：看葡萄糖在细胞质基质中的初步分解。</>,
      <>② 点「进入柠檬酸循环」与「进入氧化磷酸化」：追踪丙酮酸进入线粒体后的变化。</>,
      <>③ 思考：无氧条件下第二、三阶段还能进行吗？（回顾酵母菌呼吸方式实验）</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>有氧呼吸最常考的三个"容易混"：<span className="font-semibold">水只参与第二阶段、只在第三阶段生成；CO₂ 只在第二阶段产生；O₂ 只在第三阶段被消耗</span>。</>,
      <>1 mol 葡萄糖有氧呼吸净产约 30~32 mol ATP；无氧呼吸只有第一阶段产 2 mol ATP——能量大部分留在乳酸或酒精中未释放。</>,
      <>原核细胞没有线粒体（如硝化细菌），但仍可进行有氧呼吸——酶在细胞膜与细胞质中。</>,
    ],
  },
];

type Stage = 0 | 1 | 2 | 3;

const STAGE_INFO: Record<1 | 2 | 3, { title: string; place: string; react: string; atp: string }> = {
  1: { title: '① 糖酵解', place: '细胞质基质', react: '1 葡萄糖 → 2 丙酮酸 + 4[H]', atp: '少量（2 ATP）' },
  2: { title: '② 柠檬酸循环', place: '线粒体基质', react: '2 丙酮酸 + 6H₂O → 6CO₂ + 20[H]', atp: '少量（2 ATP）' },
  3: { title: '③ 氧化磷酸化', place: '线粒体内膜', react: '24[H] + 6O₂ → 12H₂O', atp: '大量（26~28 ATP）' },
};

export function CellRespirationLab() {
  const [stage, setStage] = useState<Stage>(0);
  const atpTotal = stage === 0 ? 0 : stage === 1 ? 2 : stage === 2 ? 4 : 30;

  const step = () => setStage((s) => (Math.min(3, s + 1) as Stage));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0) return '1 分子葡萄糖"等待出发"。点「进入糖酵解」，跟随它在细胞中的三站旅程——注意每一站的场所与 ATP 收入。';
    if (stage === 1) return '糖酵解完成：葡萄糖在细胞质基质中分解为 2 分子丙酮酸，只收入 2 个 ATP——大头还在后面。';
    if (stage === 2) return '丙酮酸进入线粒体基质，被水和 CO₂ 彻底"拆解"：CO₂ 在此产生并呼出体外，同时脱下大量的[H]备用——ATP 收入仍然不多。';
    return '氧化磷酸化完成：[H] 与 O₂ 结合生成水，一次性释放大量能量（总计约 30~32 ATP）。有氧呼吸的主要能量都在第三阶段"入账"。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= 3}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {stage === 0 ? '▶ 第一阶段：糖酵解' : stage === 1 ? '▶ 第二阶段：柠檬酸循环' : stage === 2 ? '▶ 第三阶段：氧化磷酸化' : '有氧呼吸完成 ✓'}
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              ATP 累计：<span className="text-base font-bold text-[#13333a]">{atpTotal}</span> / 约 30~32
              <br />
              {stage === 3 ? '葡萄糖已彻底氧化分解' : stage === 0 ? '葡萄糖：1 分子' : `当前场所：${STAGE_INFO[stage as 1 | 2 | 3].place}`}
            </div>
          </>
        }
      >
        <SceneBox label="有氧呼吸三阶段（细胞质基质 → 线粒体）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 细胞轮廓 */}
            <ellipse cx="220" cy="140" rx="204" ry="112" fill="#f4faf6" stroke="#3f7f3a" strokeWidth="3" opacity="0.5" />
            <text x="52" y="46" fontSize="10.5" fill="#4a7a3a" fontWeight="700">细胞质基质（第一阶段的场所）</text>
            {/* 线粒体 */}
            <g>
              <ellipse cx="250" cy="160" rx="150" ry="78" fill="#f6e2d2" stroke="#b5603a" strokeWidth="3.5" />
              {/* 内膜嵴 */}
              <path d="M140 140 Q 170 120 200 140 T 260 140 T 320 140 M136 176 Q 170 158 204 176 T 270 176 T 336 176 M160 210 Q 200 192 240 210 T 320 206" fill="none" stroke="#c9881d" strokeWidth="2.6" />
              <text x="250" y="66" textAnchor="middle" fontSize="12" fill="#a5603a" fontWeight="800">线粒体（双层膜·内膜折叠成嵴）</text>
            </g>
            {/* 阶段 1：糖酵解（细胞质中） */}
            {stage >= 1 ? (
              <g>
                <circle cx="106" cy="72" r="20" fill={stage >= 1 ? '#c8e2ba' : '#e4e4e4'} stroke="#3f7f3a" strokeWidth="2.2" />
                <text x="106" y="70" textAnchor="middle" fontSize="8.5" fill="#2f5a1e" fontWeight="800">葡萄糖</text>
                <text x="106" y="82" textAnchor="middle" fontSize="8" fill="#2f5a1e">→ 2 丙酮酸</text>
                <text x="106" y="106" textAnchor="middle" fontSize="9" fill="#59767c" fontWeight="600">产 2 ATP</text>
              </g>
            ) : null}
            {/* 阶段 2：柠檬酸循环（线粒体基质） */}
            {stage >= 2 ? (
              <g>
                <circle cx="220" cy="186" r="22" fill="#f4c76a" stroke="#b5953a" strokeWidth="2.4" />
                <text x="220" y="184" textAnchor="middle" fontSize="8" fill="#7a5a1a" fontWeight="800">柠檬酸</text>
                <text x="220" y="195" textAnchor="middle" fontSize="8" fill="#7a5a1a" fontWeight="800">循环</text>
                <path d="M292 128 Q 310 148 296 162" fill="none" stroke="#4d7ea8" strokeWidth="2.2" markerEnd="url(#cr-co2)" />
                <text x="312" y="140" fontSize="9.5" fill="#b0483a" fontWeight="700">CO₂ × 6 释出</text>
                <text x="258" y="192" fontSize="9" fill="#59767c" fontWeight="600">产 2 ATP</text>
              </g>
            ) : null}
            {/* 阶段 3：内膜 */}
            {stage >= 3 ? (
              <g>
                <rect x="170" y="232" width="170" height="20" rx="6" fill="#f4c76a" stroke="#b5953a" strokeWidth="2" />
                <text x="255" y="246" textAnchor="middle" fontSize="9.5" fill="#7a5a1a" fontWeight="800">内膜：[H] + O₂ → 12H₂O · 产大量 ATP</text>
                <text x="352" y="246" fontSize="10" fill="#b0483a" fontWeight="800">O₂ 在此消耗！</text>
              </g>
            ) : null}
            {/* O2 进入 */}
            {stage >= 3 ? (
              <g>
                <path d="M418 100 Q 396 122 366 140" fill="none" stroke="#2f7a4d" strokeWidth="3" markerEnd="url(#cr-o2)" />
                <text x="404" y="92" fontSize="11" fill="#2f7a4d" fontWeight="800">O₂ 进入</text>
              </g>
            ) : null}
            <defs>
              <marker id="cr-co2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#b0483a" />
              </marker>
              <marker id="cr-o2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#2f7a4d" />
              </marker>
            </defs>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
