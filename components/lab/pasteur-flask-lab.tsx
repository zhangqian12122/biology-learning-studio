'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（否定"自然发生说"）',
    lines: [
      <>当年有人认为肉汤放久了会<span className="font-semibold">自然产生</span>微生物。巴斯德质疑：微生物来自空气中已有的<span className="font-semibold">尘粒与细菌</span>，而不是无生命物质自发产生。</>,
      <>他设计了<span className="font-semibold">鹅颈瓶</span>：弯曲的细颈让空气能自由进出，但空气中的尘埃与细菌却沉积在弯管底部无法进入肉汤——空气通达而微生物被隔离。</>,
      <>结果鹅颈瓶肉汤长期不腐败；把瓶颈打断后肉汤很快腐败——微生物确实来自空气中已有的微生物，即<span className="font-semibold">"生命来自生命"</span>。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>两瓶同样煮沸的肉汤：直颈瓶（微生物可落入）与鹅颈瓶（微生物被拦截）。</>,
      <>推进时间，观察两瓶肉汤的浑浊度变化（浑浊 = 微生物大量繁殖）。</>,
      <>鹅颈瓶随时可以"打断瓶颈"——对照条件立即改变。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 两瓶肉汤同时煮沸灭菌，冷却。</>,
      <>② 推进时间，对比直颈瓶与鹅颈瓶的浑浊度。</>,
      <>③ 点「打断鹅颈」，再推进——鹅颈瓶也会很快腐败。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>实验的巧妙之处：鹅颈瓶既是<span className="font-semibold">对照</span>，又排除了"没有空气就不能产生生命"的辩解——空气进得去，微生物进不去。</>,
      <>巴斯德由此确立<span className="font-semibold">"生生论"</span>（生命来自生命），并开创了微生物学与巴氏消毒法。</>,
      <>对照实验的核心：单一变量（瓶颈形状），其他条件完全相同。</>,
    ],
  },
];

const WEEKS = 8;

/** 浑浊度 0~100（0 清亮 100 严重腐败） */
function turbidity(weeks: number, neck: 'straight' | 'swan' | 'broken') {
  if (neck === 'straight') return Math.min(100, weeks * 13);
  if (neck === 'swan') return Math.min(6, weeks * 0.8);
  return Math.min(100, weeks * 12 + 4);
}

export function PasteurFlaskLab() {
  const [weeks, setWeeks] = useState(0);
  const [broken, setBroken] = useState(false);
  const brokenWeek = broken && weeks > 0 ? Math.max(1, weeks - 1) : 0;

  const turbA = turbidity(weeks, 'straight');
  const turbB = turbidity(weeks, broken ? 'broken' : 'swan');

  const advance = (n: number) => setWeeks((w) => Math.min(WEEKS, w + n));
  const breakNeck = () => setBroken(true);
  const reset = () => {
    setWeeks(0);
    setBroken(false);
  };

  const observation = (() => {
    if (weeks === 0) return '两瓶肉汤刚煮沸灭菌：都清亮透明。推进时间，对比直颈瓶与鹅颈瓶的变化；随时可以"打断鹅颈"做进一步验证。';
    if (!broken) {
      if (weeks <= 2) return `第 ${weeks} 周：直颈瓶肉汤开始微微发浑，鹅颈瓶依然清亮——空气中的微生物被弯管底部的液体截住了。`;
      if (weeks <= 5) return `第 ${weeks} 周：直颈瓶明显浑浊（浑浊度 ${turbA}），鹅颈瓶依旧清亮（浑浊度 ${turbB}）——微生物只能来自空气中的"种子"。`;
      return `第 ${weeks} 周：直颈瓶已严重腐败，鹅颈瓶清亮如初。结论呼之欲出：肉汤不会"自然发生"微生物。`;
    }
    if (weeks - brokenWeek <= 1) return `瓶颈刚被打破：空气中的微生物长驱直入。再推进几周——鹅颈瓶也将腐败，彻底堵死"自然发生说"的退路。`;
    return `打断瓶颈后鹅颈瓶也腐败了（浑浊度 ${turbB}）！同是鹅颈瓶，唯一的差别是"微生物能否进入"——铁证：腐败来自空气中的微生物，生命来自生命。`;
  })();

  const flaskSvg = (x: number, neck: 'straight' | 'swan' | 'broken', turb: number, label: string) => {
    const color = turb > 60 ? '#8a6a2a' : turb > 25 ? '#c9a05a' : '#e8e2c8';
    const swanPath = broken
      ? `M${x + 62} 128 L${x + 62} 96`
      : `M${x + 56} 130 Q ${x + 62} 96 ${x + 78} 86 Q ${x + 96} 78 ${x + 108} 88 L${x + 108} 96`;
    return (
      <g>
        {/* 瓶体 */}
        <path d={`M${x + 22} 150 Q ${x + 18} 236 ${x + 40} 262 L${x + 112} 262 Q ${x + 134} 236 ${x + 130} 150 Z`} fill="#f8f6ee" stroke="#8a9a9f" strokeWidth="3" />
        {/* 肉汤 */}
        <path d={`M${x + 30} 218 L${x + 132} 218 Q ${x + 130} 254 ${x + 108} 254 L${x + 54} 254 Q ${x + 32} 254 ${x + 30} 218 Z`} fill={color} stroke={turb > 40 ? '#8a6a2a' : '#c9b88a'} strokeWidth="2" />
        {turb > 25 ? (
          <g>
            <circle cx={x + 58} cy={232} r="4" fill="#6a5a2a" opacity="0.7" />
            <circle cx={x + 82} cy={240} r="3" fill="#6a5a2a" opacity="0.7" />
            <circle cx={x + 104} cy={232} r="4.5" fill="#6a5a2a" opacity="0.7" />
          </g>
        ) : null}
        {/* 颈 */}
        {neck === 'straight' ? (
          <path d={`M${x + 56} 152 L${x + 56} 96 L${x + 100} 96 L${x + 100} 152`} fill="none" stroke="#8a9a9f" strokeWidth="3.5" />
        ) : (
          <path d={swanPath} fill="none" stroke="#8a9a9f" strokeWidth="3.5" strokeLinecap="round" />
        )}
        {neck === 'broken' ? (
          <circle cx={x + 62} cy={92} r="5" fill="#b0483a" />
        ) : null}
        {/* 标签 */}
        <text x={x + 76} y={288} textAnchor="middle" fontSize="12" fill="#49676d" fontWeight="700">{label}</text>
        <text x={x + 76} y={306} textAnchor="middle" fontSize="11" fill="#8a9a9f">浑浊度 {turb}</text>
      </g>
    );
  };

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={() => advance(1)}
              disabled={weeks >= WEEKS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进 1 周（{weeks}/{WEEKS}）
            </button>
            <button
              type="button"
              onClick={() => advance(3)}
              disabled={weeks >= WEEKS}
              className="min-h-10 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-semibold text-[#366169] transition-colors hover:bg-[#eef7f7] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏭ 快进 3 周
            </button>
            <button
              type="button"
              onClick={breakNeck}
              disabled={broken}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#b0483a] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#9a3a2e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ✂ 打断鹅颈（关键验证）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新煮沸灭菌
            </button>
          </>
        }
      >
        <SceneBox label="巴斯德鹅颈瓶对照实验（1861）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 320" aria-hidden="true">
            {flaskSvg(30, 'straight', turbA, '直颈瓶（微生物可落入）')}
            {flaskSvg(230, broken ? 'broken' : 'swan', turbB, '鹅颈瓶（微生物被拦截）')}
            {/* 对比说明 */}
            <text x="220" y="310" textAnchor="middle" fontSize="11" fill="#59767c" fontWeight="600">
              唯一变量：瓶颈形状（空气进得去 · 微生物进不去）
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
