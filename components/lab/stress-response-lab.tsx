'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（应激反应）',
    lines: [
      <>突然遇到威胁（草丛里的蛇！），身体在 1 秒内切换到"战斗或逃跑"模式——这是<span className="font-semibold">神经调节与体液调节的联合作战</span>。</>
      ,
      <><span className="font-semibold">交感神经</span>打"快板"：直接命令心跳加速、支气管扩张、瞳孔放大——几秒内完成动员。</>
      ,
      <><span className="font-semibold">肾上腺髓质</span>打"慢板"：分泌肾上腺素进入血液，持续推动肝糖原分解升血糖、把血液重新分配给骨骼肌——作用更广、更持久。</>
      ,
    ],
  },
  {
    title: '每个变化都是"为战斗服务"',
    lines: [
      <>心跳与呼吸加速 = 运送更多氧气；支气管扩张 = 每口气换气更多；<span className="font-semibold">瞳孔放大</span> = 获得更多视觉信息。</>
      ,
      <>血液重新分配：<span className="font-semibold">骨骼肌血管扩张</span>（要干活）、皮肤与消化系统血管收缩（先不吃饭）——"吓得脸色苍白"由此而来。</>
      ,
      <>血糖升高 = 肝糖原快速分解补充"燃料"——注意：<span className="font-semibold">肝糖原能升血糖，肌糖原不能直接升血糖</span>（缺 6-磷酸酶）。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>神经调节 vs 体液调节：<span className="font-semibold">神经快而准、限时限路；激素慢而广、持续在线</span>——应激反应是两者协同的教科书案例。</>
      ,
      <>肾上腺素由<span className="font-semibold">肾上腺髓质</span>分泌（受交感神经直接支配）；糖皮质激素由皮质分泌（受垂体-下丘脑轴调控）——一条腺体两种"指挥"。</>
      ,
      <>稳态是<span className="font-semibold">动态平衡</span>：应激升高的血糖、心率最终要回落——长期慢性应激（熬夜、焦虑）则让"恢复按钮"失灵，损害稳态。</>
      ,
    ],
  },
];

type Phase = 'calm' | 'alarm' | 'recover';

const PHASES: Record<Phase, { label: string; hr: number; br: number; glu: number; pupil: number; color: string }> = {
  calm: { label: '平静状态（副交感主导）', hr: 72, br: 14, glu: 4.5, pupil: 3, color: '#2f6f2a' },
  alarm: { label: '警报！战斗或逃跑（交感全开）', hr: 122, br: 28, glu: 6.8, pupil: 7, color: '#a53030' },
  recover: { label: '深呼吸放松（正在恢复）', hr: 88, br: 18, glu: 5.4, pupil: 4.5, color: '#8a671b' },
};

export function StressResponseLab() {
  const [phase, setPhase] = useState<Phase>('calm');
  const p = PHASES[phase];

  const observation = (() => {
    if (phase === 'calm')
      return '你现在心率 72、呼吸平稳——副交感神经在"值班维稳"。点击"突遇威胁"按钮，看身体如何在几秒内切换到求生模式。';
    if (phase === 'alarm')
      return `警报触发！心率冲到 ${p.hr}、血糖升至 ${p.glu}——交感神经先到（秒级），肾上腺素随后入血（持续维持）：心跳加速、瞳孔放大、肌肉充血、脸色苍白——一切为了战斗或逃跑。`;
    return `深呼吸激活了副交感神经：心率回落到 ${p.hr}、血糖降到 ${p.glu}——稳态正在恢复。"警报按钮"好按，"恢复按钮"却需要时间：这正是长期压力伤身的原因。`;
  })();

  const gauge = (label: string, y: number, cur: number, base: number, unit: string, curText: string, baseText: string) => {
    const w = 176;
    return (
      <g>
        <text x="228" y={y - 6} fontSize="12" fill="#4b6c73" fontWeight="700">{label}</text>
        <rect x="228" y={y} width={w} height="14" rx="7" fill="#e5efef" stroke="#a5c4c4" strokeWidth="1.2" />
        <rect x="228" y={y} width={Math.round((base / 100) * w)} height="14" rx="7" fill="#b8d0d0" opacity="0.55" />
        <rect x="228" y={y} width={Math.round((cur / 100) * w)} height="14" rx="7" fill={p.color} opacity="0.85" />
        <text x="412" y={y + 12} fontSize="11.5" fill={p.color} fontWeight="700">{curText}</text>
        <text x="412" y={y - 6} fontSize="10" fill="#8a9a9f">{baseText} · {unit}</text>
      </g>
    );
  };

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前状态：<span className="font-bold" style={{ color: p.color }}>{p.label}</span>
            </div>
            <button
              type="button"
              onClick={() => setPhase('alarm')}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#a53030] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#8a2626]"
            >
              ⚡ 突遇威胁（激活交感神经）
            </button>
            <button
              type="button"
              onClick={() => setPhase('recover')}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              🌬 深呼吸放松（激活副交感）
            </button>
            <button
              type="button"
              onClick={() => setPhase('calm')}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              回到平静状态
            </button>
            <div className="rounded-md border border-[#d9e7e7] bg-white px-3 py-2.5 text-[10.5px] leading-4 text-[#799398]">
              考点：肝糖原分解可升血糖；肌糖原不能直接升血糖（缺 6-磷酸酶）。
            </div>
          </>
        }
      >
        <SceneBox label="应激反应：神经打快板，肾上腺素打慢板" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 人形与器官 */}
            <g>
              <circle cx="86" cy="70" r="20" fill="#f2d0c9" stroke="#b06a6a" strokeWidth="2" />
              <ellipse cx="78" cy="68" rx="3.4" ry={2 + p.pupil / 4} fill="#141414" />
              <ellipse cx="94" cy="68" rx="3.4" ry={2 + p.pupil / 4} fill="#141414" />
              <path d="M86 92 L86 190 M86 112 L52 150 M86 112 L120 150 M86 190 L60 250 M86 190 L112 250" fill="none" stroke="#f2d0c9" strokeWidth="11" strokeLinecap="round" />
              <circle cx="86" cy="122" r="13" fill="#c93a3a" stroke="#8a2626" strokeWidth="2">
                <animate attributeName="r" values={phase === 'alarm' ? '11;15;11' : '12.5;13.5;12.5'} dur={phase === 'alarm' ? '0.45s' : '0.9s'} repeatCount="indefinite" />
              </circle>
              <ellipse cx="86" cy="152" rx="12" ry="9" fill="#f5a86a" stroke="#c97a3a" strokeWidth="1.8" />
              <path d="M74 176 q 12 8 24 0" fill="none" stroke="#c98a4a" strokeWidth="7" strokeLinecap="round" />
              <text x="112" y="126" fontSize="11.5" fill="#8a2626" fontWeight="700">心 {p.hr} 次/分</text>
              <text x="112" y="156" fontSize="11.5" fill="#a5761d">肺 {p.br} 次/分</text>
              <text x="112" y="180" fontSize="11.5" fill="#8a671b">肝：糖原分解中{phase !== 'calm' ? '！' : '（待命）'}</text>
              <text x="24" y="46" fontSize="12" fill={p.color} fontWeight="800">瞳孔 {phase === 'alarm' ? '放大' : phase === 'recover' ? '回缩中' : '正常'}</text>
            </g>
            {/* 指标条 */}
            {gauge('心率', 46, p.hr / 1.3, 72 / 1.3, '次/分', `${p.hr}`, '平静 72')}
            {gauge('呼吸频率', 96, (p.br / 30) * 100, (14 / 30) * 100, '次/分', `${p.br}`, '平静 14')}
            {gauge('血糖', 146, (p.glu / 8) * 100, (4.5 / 8) * 100, 'mmol/L', `${p.glu}`, '平静 4.5')}
            {gauge('瞳孔直径', 196, (p.pupil / 8) * 100, (3 / 8) * 100, 'mm', `${p.pupil}`, '平静 3')}
            {/* 双通道时间线 */}
            <rect x="228" y="232" width="192" height="56" rx="10" fill="#eef4fb" stroke="#5a7aa5" strokeWidth="2" />
            <text x="324" y="250" textAnchor="middle" fontSize="11.5" fill="#2c5a84" fontWeight="800">两条命令通道</text>
            <text x="240" y="268" fontSize="11" fill="#37585f">神经（交感）：<tspan fontWeight="700">约 1 秒</tspan>直达</text>
            <text x="240" y="283" fontSize="11" fill="#8a671b">肾上腺素入血：<tspan fontWeight="700">约 20 秒</tspan>·持续在线</text>
            <text x="428" y="290" textAnchor="end" fontSize="9.5" fill="#799398">灰条=平静基线 · 彩条=当前值</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
