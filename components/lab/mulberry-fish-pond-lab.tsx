'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>桑基鱼塘是人工建立的<span className="font-semibold">生态农业系统</span>：桑→蚕→鱼→塘泥→桑，物质在整个系统中循环利用。</>,
      <>蚕沙（蚕粪）、塘泥都是"废物"，但在系统中变成了下一环节的<span className="font-semibold">资源</span>——这就是物质的多级利用。</>,
      <>能量流动则不同：<span className="font-semibold">单向流动、逐级递减</span>，每个环节都有热能散失、不能循环——所以系统必须依赖持续的太阳能输入。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>四个环节依次推进，观察物质流向箭头的点亮顺序。</>,
      <>可移除"微生物（分解者）"：塘泥无法被分解出可利用的无机盐，观察循环会在哪一环断掉。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 连续点「推进下一环节」，走完 桑→蚕→鱼→塘泥→桑 四步。</>,
      <>② 关掉"微生物分解者"开关，重置后再推进——看循环卡在哪一环。</>,
      <>③ 思考：为什么说"物质的循环利用 + 能量的多级利用"是生态农业的核心？</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>循环利用的是<span className="font-semibold">物质</span>（C、N 等元素）；能量<span className="font-semibold">不能循环</span>——两者常被设计成对比选项。</>,
      <>分解者是物质循环的"关键钥匙"：没有分解者，动植物遗体粪便中的有机物无法回到无机环境。</>,
      <>生态农业的意义：实现物质的循环利用和能量的多级利用，<span className="font-semibold">提高能量利用率</span>（注意：不能提高相邻营养级间的传递效率）。</>,
    ],
  },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function MulberryFishPondLab() {
  const [step, setStep] = useState(0); // 已完成的环节数 0~4
  const [decomposer, setDecomposer] = useState(true);

  const advance = () => setStep((s) => Math.min(4, s + 1));
  const reset = () => setStep(0);

  const done = step >= 4;
  const broken = !decomposer && step >= 2;

  const observation = (() => {
    if (step === 0) {
      return '桑基鱼塘：桑田种桑、桑叶喂蚕、蚕沙喂鱼、塘泥肥桑。点「推进下一环节」逐步点亮物质的流动路线。';
    }
    if (broken) {
      return '⚠ 已移除分解者：鱼的粪便残饵堆积在塘底，无法被分解成无机盐——塘泥没有肥力，第 3 步"塘泥肥桑"失效，桑树缺肥长势变差，蚕也跟着挨饿。分解者是物质循环的关键环节。';
    }
    if (step === 1) {
      return '第 1 环：蚕以桑叶为食——生产者（桑）固定的有机物，流入了初级消费者（蚕）体内。';
    }
    if (step === 2) {
      return '第 2 环：蚕沙（蚕粪）和蚕蛹投入鱼塘喂鱼——上一环节的"废物"成了这一环节的资源，实现物质的多级利用。';
    }
    if (step === 3) {
      return '第 3 环：鱼的粪便与残饵沉入塘底，微生物（分解者）将其分解为无机盐，回到塘泥中。';
    }
    return done && decomposer
      ? '🎉 循环走通：塘泥富含无机盐，挖出施回桑田——物质回到生产者身边。整个系统实现了物质的循环利用和能量的多级利用；但能量本身是单向流动、逐级递减的，必须靠太阳能不断补充。'
      : '';
  })();

  // 箭头状态：done=已完成（青绿）、current=正在推进的下一步（橙色）、pending
  const arrowStyle = (idx: number) => {
    if (broken && idx >= 2) return { stroke: '#c07a6a', width: 4, opacity: 1, dash: '7 5' };
    if (idx < step) return { stroke: '#0e6f75', width: 4, opacity: 1, dash: undefined };
    if (idx === step) return { stroke: '#e0862a', width: 5, opacity: 1, dash: '8 5' };
    return { stroke: '#8aa1a6', width: 3, opacity: 0.35, dash: undefined };
  };

  const a0 = arrowStyle(0);
  const a1 = arrowStyle(1);
  const a2 = arrowStyle(2);
  const a3 = arrowStyle(3);

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={advance}
              disabled={step >= 4}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              推进下一环节（{step}/4）
            </button>
            <button
              type="button"
              onClick={() => setDecomposer((v) => !v)}
              aria-pressed={decomposer}
              className={`${cnChip(decomposer)} w-full ${decomposer ? '' : 'border-[#b0483a] bg-[#f9e2e0] text-[#b0483a]'}`}
            >
              {decomposer ? '🦠 微生物分解者：在岗' : '⚠ 已移除分解者'}
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置系统
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              环节进度：<span className="font-bold text-[#0a626a]">{step}/4</span>
              <br />
              {done ? (decomposer ? '🎉 物质循环走通！' : '⚠ 循环中断') : '推进观察物质流向'}
            </div>
          </>
        }
      >
        <SceneBox label="桑基鱼塘：物质循环示意图（箭头 = 物质流向）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 桑田地面 */}
            <rect x="16" y="216" width="150" height="26" fill="#c9b08a" />
            <text x="26" y="258" fontSize="12.5" fill="#7a5a20" fontWeight="600">桑田</text>
            {/* 桑树 */}
            <g>
              <line x1="86" y1="216" x2="86" y2="150" stroke="#8a6a48" strokeWidth="7" strokeLinecap="round" />
              {[64, 86, 108].map((cx, i) => (
                <circle key={i} cx={cx} cy={132 - i * 4} r={22 - Math.abs(i - 1) * 4} fill="#6aa86a" stroke="#3f7f3a" strokeWidth="2.5" />
              ))}
              <text x="86" y="82" textAnchor="middle" fontSize="13.5" fill="#2f7a4d" fontWeight="700">桑树（生产者）</text>
            </g>
            {/* 蚕 */}
            <g>
              <path d="M196 96 q 10 -8 20 0 q 10 8 20 0 q 10 -8 20 0" fill="none" stroke="#f4f0e0" strokeWidth="12" strokeLinecap="round" />
              <path d="M196 96 q 10 -8 20 0 q 10 8 20 0 q 10 -8 20 0" fill="none" stroke="#c9c9a0" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 6" />
              <text x="216" y="66" textAnchor="middle" fontSize="13.5" fill="#7a8a20" fontWeight="700">蚕（初级消费者）</text>
            </g>
            {/* 鱼塘 */}
            <g>
              <rect x="296" y="150" width="128" height="102" rx="16" fill="#cfe4f0" stroke="#3d7e9e" strokeWidth="3.5" />
              {[[336, 186], [376, 206]].map(([x, y], i) => (
                <path key={i} d={`M${x - 16} ${y} q 16 -12 32 0 q -16 12 -32 0 Z`} fill="#5a9abf" stroke="#2c5a7a" strokeWidth="2" />
              ))}
              <text x="360" y="140" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">鱼塘（消费者）</text>
              {/* 塘泥 */}
              <rect x="302" y="226" width="116" height="20" fill="#8a6a48" />
              {decomposer ? (
                <g>
                  {[[318, 236], [340, 240], [362, 236], [384, 240], [404, 236]].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="3.5" fill="#e8c94a" stroke="#8a671b" strokeWidth="1.4" />
                  ))}
                </g>
              ) : null}
              <text x="360" y="272" textAnchor="middle" fontSize="12.5" fill={decomposer ? '#7a9a3a' : '#b0483a'} fontWeight="700">
                {decomposer ? '塘泥（微生物分解中）' : '塘泥：粪便堆积无法分解'}
              </text>
            </g>
            {/* 箭头 0：桑叶→蚕 */}
            <g style={{ opacity: a0.opacity }}>
              <path d="M116 118 Q 150 100 182 96" fill="none" stroke={a0.stroke} strokeWidth={a0.width} strokeDasharray={a0.dash} markerEnd="url(#mfp-arrow)" />
              <text x="130" y="92" fontSize="12.5" fill={a0.stroke} fontWeight="700">桑叶 → 蚕食</text>
            </g>
            {/* 箭头 1：蚕沙→鱼塘 */}
            <g style={{ opacity: a1.opacity }}>
              <path d="M238 118 Q 276 128 300 158" fill="none" stroke={a1.stroke} strokeWidth={a1.width} strokeDasharray={a1.dash} markerEnd="url(#mfp-arrow)" />
              <text x="268" y="108" fontSize="12.5" fill={a1.stroke} fontWeight="700">蚕沙喂鱼</text>
            </g>
            {/* 箭头 2：沉入塘底被分解 */}
            <g style={{ opacity: a2.opacity }}>
              <line x1="360" y1="216" x2="360" y2="232" stroke={a2.stroke} strokeWidth={a2.width} strokeDasharray={a2.dash} markerEnd="url(#mfp-arrow)" />
              <text x="372" y="230" fontSize="12" fill={a2.stroke} fontWeight="600">粪便沉底</text>
            </g>
            {/* 箭头 3：塘泥→桑田 */}
            <g style={{ opacity: a3.opacity }}>
              <path d="M300 244 Q 200 276 96 240" fill="none" stroke={a3.stroke} strokeWidth={a3.width} strokeDasharray={a3.dash} markerEnd="url(#mfp-arrow)" />
              <text x="150" y="284" fontSize="12.5" fill={a3.stroke} fontWeight="700">挖塘泥 → 施肥还桑</text>
            </g>
            {/* 太阳：能量输入 */}
            <circle cx="404" cy="40" r="18" fill="#f4d06a" stroke="#c98a1d" strokeWidth="2.5" />
            <text x="404" y="45" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="700">☀</text>
            <path d="M392 58 Q 340 84 300 96" fill="none" stroke="#e0b020" strokeWidth="2.5" strokeDasharray="6 5" markerEnd="url(#mfp-arrow)" />
            <text x="300" y="52" fontSize="12" fill="#b58a1a" fontWeight="600">能量：太阳能单向输入</text>
            <defs>
              <marker id="mfp-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
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
