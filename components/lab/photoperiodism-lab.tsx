'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '原理（光周期现象）',
    lines: [
      <>植物感受<span className="font-semibold">日照长短</span>的周期性变化从而调节开花时间的现象，称为光周期现象。</>,
      <>按对日照的需求分为<span className="font-semibold">短日照植物</span>（菊花·水稻）、<span className="font-semibold">长日照植物</span>（小麦·菠菜）和<span className="font-semibold">日中性植物</span>（番茄·黄瓜）。</>,
      <>感受光周期的器官是<span className="font-semibold">叶片</span>（含光敏色素），产生的"开花信号"通过韧皮部传导至芽。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>三组菊花（短日照植物）：A 正常日照 / B 提前遮光（模拟短日照）/ C 夜间闪光打断连续黑暗。</>,
      <>观察点：B 组提前开花，C 组不开花——说明真正起作用的是<span className="font-semibold">连续黑暗的长度</span>，而非日照长度。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>短日照植物实际需要的是<span className="font-semibold">足够长的连续黑暗</span>——夜间闪光会打断黑暗期，等效于长日照。</>,
      <>这一发现被应用于<span className="font-semibold">花卉产业</span>：通过遮光或补光控制花期，让菊花在春节开花。</>,
    ],
  },
];

type Group = 'A' | 'B' | 'C';

export function PhotoperiodismLab() {
  const [stage, setStage] = useState(0);

  const step = () => setStage((s) => Math.min(3, s + 1));
  const reset = () => setStage(0);

  const floweringA = stage >= 3; // 正常日照：不开花
  const floweringB = stage >= 2; // 遮光：开花
  const floweringC = stage >= 2 && stage < 3; // 夜间闪光：不开花

  const observation = (() => {
    if (stage === 0) return '三组菊花（短日照植物）：A 正常日照 / B 提前遮光 / C 夜间闪光打断连续黑暗。推进时间观察开花情况。';
    if (stage === 1) return '处理后：B 组被遮光——获得了更长的连续黑暗期；C 组夜间闪光——黑暗被"打断"。';
    if (stage === 2) return '几周后：B 组开始花芽分化（短日照条件满足），A 组和 C 组仍不开花——关键不是日照长短，而是连续黑暗的长度。';
    return '最终结果：B 组（遮光=短日照）开花，A 组和 C 组不开花。结论：菊花是短日照植物——足够长的连续黑暗才能诱导开花。';
  })();

  const plant = (x: number, y: number, blooming: boolean) => (
    <g>
      <path d={`M${x} ${y} L${x} ${y - 46}`} stroke="#4a8a3a" strokeWidth="5" strokeLinecap="round" />
      {[0, 1].map((i) => (
        <ellipse key={i} cx={x + (i === 0 ? -16 : 16)} cy={y - 16} rx="16" ry="8" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2" transform={`rotate(${i === 0 ? -14 : 14} ${x + (i === 0 ? -16 : 16)} ${y - 16})`} />
      ))}
      {blooming ? (
        <g>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const ang = (i * 45) * (Math.PI / 180);
            return (
              <ellipse key={i} cx={x + Math.cos(ang) * 12} cy={y - 56 + Math.sin(ang) * 12} rx="8" ry="5" fill="#e8c84a" stroke="#c9a02a" strokeWidth="1.4" transform={`rotate(${i * 45} ${x + Math.cos(ang) * 12} ${y - 56 + Math.sin(ang) * 12})`} />
            );
          })}
          <circle cx={x} cy={y - 56} r="8" fill="#8a671b" />
        </g>
      ) : (
        <circle cx={x} cy={y - 56} r="10" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2.5" />
      )}
    </g>
  );

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button type="button" onClick={step} disabled={stage >= 3} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40">
              ⏱ 推进（{stage}/3）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              A 正常日照：<span className="font-bold">{floweringA ? '开花 ✓' : '未开花'}</span>
              <br />
              B 遮光（短日照）：<span className="font-bold">{floweringB ? '开花 ✓' : '未开花'}</span>
              <br />
              C 夜间闪光：<span className="font-bold">{floweringC ? '开花 ✓' : '未开花'}</span>
            </div>
          </>
        }
      >
        <SceneBox label="光周期对短日照植物（菊花）开花的影响" heightClass="h-[320px]">
          <svg className="h-full w-full" viewBox="0 0 440 240" aria-hidden="true">
            {/* 三组植物 */}
            {plant(90, 180, floweringB)}
            {plant(220, 180, floweringA)}
            {plant(350, 180, floweringC)}
            {/* 标签 */}
            <text x="90" y="220" textAnchor="middle" fontSize="10.5" fill="#59767c" fontWeight="600">A · 正常日照</text>
            <text x="220" y="220" textAnchor="middle" fontSize="10.5" fill="#59767c" fontWeight="600">B · 遮光</text>
            <text x="350" y="220" textAnchor="middle" fontSize="10.5" fill="#59767c" fontWeight="600">C · 夜间闪光</text>
            {/* 开花标注 */}
            {floweringB ? <text x="90" y="140" textAnchor="middle" fontSize="10" fill="#c9a02a" fontWeight="800">🌼 开花!</text> : null}
            {/* 结论框 */}
            <rect x="40" y="230" width="360" height="24" rx="6" fill="#fdf1cf" stroke="#8a671b" strokeWidth="1.8" />
            <text x="220" y="247" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="700">
              {stage >= 3 ? '结论：遮光（长连续黑暗）→ 开花 ✓' : '菊花是短日照植物'}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
