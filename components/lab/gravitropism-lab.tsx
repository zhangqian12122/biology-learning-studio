'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（向重力性）',
    lines: [
      <>把幼苗横放后，重力使生长素发生<span className="font-semibold">横向运输</span>：近地侧生长素浓度高于远地侧。</>
      ,
      <>根与茎对生长素的<span className="font-semibold">敏感度不同</span>：根最敏感（10⁻¹⁰ mol/L 即起作用），茎最不敏感。</>
      ,
      <>于是同一浓度差产生相反结果：根的近地侧被<span className="font-semibold">抑制</span>生长（背地弯曲=向地生长）；茎的近地侧被<span className="font-semibold">促进</span>生长（向上弯曲=背地生长）——同一激素、不同浓度、不同效应。</>
      ,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 把萌发一致的幼苗竖直培养至一定高度（对照组保持竖直）。</>
      ,
      <>② 实验组把花盆<span className="font-semibold">横放</span>，暗箱培养排除单侧光干扰。</>
      ,
      <>③ 数小时后观察：根向下弯曲、茎向上弯曲。</>
      ,
      <>④ 变量分析：自变量是重力方向（横放），因变量是根茎弯曲方向；排除光照是无关变量控制。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>根的向地性体现生长素作用的两重性：<span className="font-semibold">低浓度促进、高浓度抑制</span>——茎的背地性只体现促进作用。</>
      ,
      <>失重环境（太空）中生长素均匀分布，根和茎都<span className="font-semibold">水平生长</span>——空间站实验是这一理论的直接验证。</>
      ,
      <>果实"横放桩"（如盆景倒贴）应用：茎的负向地性让植物总能"转弯向上"生长。</>
      ,
    ],
  },
];

const STAGES = 3; // 0 横放 → 1 生长素重分布 → 2 弯曲结果

export function GravitropismLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '两盆长势一致的幼苗：一盆竖直放置作对照，另一盆横放（放入暗箱排除单侧光干扰）。现在重力成了唯一的"方向信号"。';
    if (stage === 1)
      return '横放后数小时：重力使生长素从远地侧向近地侧横向运输——根和茎的近地侧生长素浓度都升高了。注意：两侧的浓度差是相同的，但根和茎的反应将完全相反。';
    if (stage === 2)
      return '结果揭晓：根弯向下方生长（向地性），茎弯向上方生长（背地性）。原因：根对生长素极其敏感，近地侧的高浓度反而抑制了细胞伸长，远地侧长得快——根"拐弯向下"；茎不敏感，近地侧高浓度只是促进更多——茎"拐弯向上"。';
    return '结论：生长素的作用具有两重性——低浓度促进生长，高浓度抑制生长。根的向地性是两重性的经典证据；茎的背地性只体现促进作用。若在太空失重环境中，生长素均匀分布，根茎都会水平生长。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= STAGES}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {stage === 0 ? '🔄 横放幼苗' : stage === 1 ? '⏱ 继续培养数小时' : stage === 2 ? '📊 分析弯曲原因' : '🧾 得出结论'}
              （{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              关键对比：<span className="font-semibold">根敏感·茎迟钝</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">同一浓度差 → 相反的弯曲方向</span>
            </div>
          </>
        }
      >
        <SceneBox label="幼苗横放实验：根向地生长·茎背地生长" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 地面 */}
            <path d="M40 224 h 360" stroke="#8a7a4a" strokeWidth="3" />
            <path d="M40 224 q 180 -8 360 0 l 0 14 l -360 0 Z" fill="#d8c9a0" stroke="#b5a582" strokeWidth="1.6" />
            {/* 重力箭头 */}
            <path d="M400 40 v 34 m 0 0 l -6 -9 m 6 9 l 6 -9" fill="none" stroke="#5a6a7a" strokeWidth="2.2" />
            <text x="412" y="60" fontSize="10.5" fill="#5a6a7a" fontWeight="700">g</text>
            {/* 对照组（竖直） */}
            <g>
              <path d="M100 224 v -90" stroke="#3f7f3a" strokeWidth="5" strokeLinecap="round" />
              <path d="M100 134 q -18 -8 -20 -26 m 20 26 q 18 -8 20 -26" fill="none" stroke="#3f7f3a" strokeWidth="3" />
              <path d="M100 224 q -14 -16 -16 -40 m 16 40 q 14 -16 16 -40" fill="none" stroke="#b88a5a" strokeWidth="3" />
              <text x="100" y="52" textAnchor="middle" fontSize="10.5" fill="#37585f" fontWeight="600">对照组（竖直）</text>
              <text x="100" y="248" textAnchor="middle" fontSize="9.5" fill="#799398">正常直立生长</text>
            </g>
            {/* 实验组（横放） */}
            <g>
              {/* 茎：stage>=2 弯向上 */}
              {stage < 2 ? (
                <path d="M250 200 h 110" fill="none" stroke="#3f7f3a" strokeWidth="5" strokeLinecap="round" />
              ) : (
                <path d="M250 200 h 70 q 34 -4 40 -34 q 4 -22 -2 -40" fill="none" stroke="#3f7f3a" strokeWidth="5" strokeLinecap="round" />
              )}
              {/* 根：stage>=2 弯向下 */}
              {stage < 2 ? (
                <path d="M250 216 h 100" fill="none" stroke="#b88a5a" strokeWidth="4.5" strokeLinecap="round" />
              ) : (
                <path d="M250 216 h 60 q 30 4 38 26 q 6 16 2 30" fill="none" stroke="#b88a5a" strokeWidth="4.5" strokeLinecap="round" />
              )}
              <text x="300" y="94" textAnchor="middle" fontSize="10.5" fill="#37585f" fontWeight="600">实验组（横放）</text>
              {/* 生长素分布标注 */}
              {stage >= 1 ? (
                <g>
                  <circle cx="368" cy="208" r="5" fill="#8a671b" opacity="0.9" />
                  <circle cx="368" cy="216" r="6" fill="#8a671b" />
                  <text x="352" y="196" fontSize="9.5" fill="#8a671b" fontWeight="700">近地侧生长素多</text>
                </g>
              ) : null}
              {stage >= 2 ? (
                <g>
                  <text x="252" y="136" fontSize="10" fill="#2f6f2a" fontWeight="700">茎：近地侧促进↑ 弯向上</text>
                  <text x="252" y="258" fontSize="10" fill="#8a5a2a" fontWeight="700">根：近地侧抑制↓ 弯向下</text>
                </g>
              ) : null}
              {stage === 0 ? <text x="305" y="252" textAnchor="middle" fontSize="10" fill="#9ab0b5">刚横放：根茎仍沿原方向</text> : null}
            </g>
            {/* 结论条 */}
            {stage >= 3 ? (
              <g>
                <rect x="52" y="42" width="180" height="26" rx="8" fill="#fdf1cf" stroke="#8a671b" strokeWidth="1.8" />
                <text x="142" y="60" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="700">两重性：低促高抑</text>
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
