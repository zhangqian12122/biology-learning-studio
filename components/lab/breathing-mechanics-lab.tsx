'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（呼吸运动）',
    lines: [
      <>呼吸运动 = <span className="font-semibold">呼吸肌（肋间肌+膈肌）的节律性收缩与舒张</span>引起的胸廓扩大与缩小。</>,
      <>吸气时：<span className="font-semibold">膈肌收缩</span>→膈顶下降→胸廓上下径增大→肺内气压<span className="font-semibold">低于</span>大气压→气体入肺。</>,
      <>呼气时：<span className="font-semibold">膈肌舒张</span>→膈顶回升→胸廓缩小→肺内气压<span className="font-semibold">高于</span>大气压→气体出肺。</>,
    ],
  },
  {
    title: '模型装置',
    lines: [
      <>玻璃瓶模拟<span className="font-semibold">胸廓</span>，气球模拟<span className="font-semibold">肺</span>，橡皮膜模拟<span className="font-semibold">膈</span>，玻璃管模拟<span className="font-semibold">气管/支气管</span>。</>,
      <>向下拉橡皮膜 = 膈肌收缩（膈顶下降）→ 气球胀大 = 吸气。</>,
      <>松开橡皮膜 = 膈肌舒张（膈顶回升）→ 气球缩小 = 呼气。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 推进到「吸气」：膈顶下降，气球胀大——看肺内气压如何变化。</>,
      <>② 推进到「呼气」：膈顶回升，气球缩小——气体被"挤"出去。</>,
      <>③ 对比呼吸前后肺内气压与大气压的关系，理解"负压吸气"原理。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>呼吸运动是通过<span className="font-semibold">改变肺内气压</span>来实现气体交换的——被动地靠气压差"吸入"或"呼出"，肺本身不主动收缩。</>,
      <>吸气时肺内气压低于大气压，呼气时高于大气压，这是必考结论。</>,
      <>呼吸运动的<span className="font-semibold">动力来自呼吸肌</span>（肋间外肌和膈肌），不是来自肺本身。</>,
    ],
  },
];

type BreathPhase = 'idle' | 'inhale' | 'exhale';

export function BreathingMechanicsLab() {
  const [phase, setPhase] = useState<BreathPhase>('idle');
  const [step, setStep] = useState(0);

  const toInhale = () => { setPhase('inhale'); setStep((s) => s + 1); };
  const toExhale = () => { setPhase('exhale'); setStep((s) => s + 1); };
  const reset = () => { setPhase('idle'); setStep(0); };

  const diaphragm = phase === 'inhale' ? 40 : phase === 'exhale' ? 8 : 20;
  const balloonR = phase === 'inhale' ? 28 : phase === 'exhale' ? 12 : 18;
  const lungText = phase === 'inhale' ? '肺内气压 < 大气压 → 气体入肺' : phase === 'exhale' ? '肺内气压 > 大气压 → 气体出肺' : '肺内气压 = 大气压';

  const observation = (() => {
    if (phase === 'idle') return '点击「吸气」或「呼气」模拟膈肌的收缩与舒张——观察气球（肺）的大小变化和气压差。';
    if (phase === 'inhale') return '吸气：膈肌收缩→膈顶下降→胸廓扩大→肺扩张→肺内气压低于大气压→外界气体进入肺。';
    return '呼气：膈肌舒张→膈顶回升→胸廓缩小→肺回缩→肺内气压高于大气压→肺内气体被排出。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button type="button" onClick={toInhale} className={`inline-flex min-h-11 w-full items-center justify-center rounded-md px-3 text-xs font-semibold text-white transition-colors ${phase === 'inhale' ? 'bg-[#2f7a4d]' : 'bg-[#0e6f75] hover:bg-[#0c5f64]'}`}>
              🫁 吸气（膈肌收缩·膈顶下降）
            </button>
            <button type="button" onClick={toExhale} className={`inline-flex min-h-11 w-full items-center justify-center rounded-md px-3 text-xs font-semibold text-white transition-colors ${phase === 'exhale' ? 'bg-[#b0483a]' : 'bg-[#b5953a] hover:bg-[#a5761d]'}`}>
              🫁 呼气（膈肌舒张·膈顶回升）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置到静息
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              膈顶位置：<span className="font-bold">{phase === 'inhale' ? '下降' : phase === 'exhale' ? '回升' : '静息'}</span>
              <br />
              肺内气压：<span className="font-bold">{phase === 'inhale' ? '< 大气压' : phase === 'exhale' ? '> 大气压' : '= 大气压'}</span>
            </div>
          </>
        }
      >
        <SceneBox label="呼吸运动模拟装置（瓶 = 胸廓 · 气球 = 肺 · 橡皮膜 = 膈）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 280" aria-hidden="true">
            {/* 玻璃瓶（胸廓） */}
            <path d="M130 40 L110 230 L310 230 L290 40 Z" fill="#e8f2f8" stroke="#7a9a9f" strokeWidth="3" opacity="0.7" />
            {/* 气管 */}
            <rect x="200" y="18" width="20" height="30" fill="#c8d4dc" stroke="#7a9a9f" strokeWidth="2.4" />
            <text x="210" y="14" textAnchor="middle" fontSize="10" fill="#4a5a6a" fontWeight="700">气管</text>
            {/* 支气管 */}
            <path d="M210 48 L 170 64 M210 48 L 250 64" fill="none" stroke="#c8d4dc" strokeWidth="8" strokeLinecap="round" />
            {/* 气球（肺） */}
            <ellipse cx="220" cy="130" rx={balloonR * 1.8} ry={balloonR} fill={phase === 'inhale' ? '#ffecd2' : '#f4d4c4'} stroke="#c97a5a" strokeWidth="2.5" />
            {/* 膈（橡皮膜） */}
            <path d={`M120 ${200 + (40 - diaphragm)} Q 220 ${200 + (40 - diaphragm) - (phase === 'inhale' ? -20 : 20)} 320 ${200 + (40 - diaphragm)}`} fill="none" stroke="#b0483a" strokeWidth="6" strokeLinecap="round" />
            <text x="220" y={224 + (40 - diaphragm)} textAnchor="middle" fontSize="11" fill="#b0483a" fontWeight="800">膈（橡皮膜）{phase === 'inhale' ? '收缩 ↓' : phase === 'exhale' ? '舒张 ↑' : '静息'}</text>
            {/* 手拉标记 */}
            {phase === 'inhale' ? (
              <g>
                <circle cx="120" cy="240" r="8" fill="#2f7a4d" />
                <path d="M120 240 L 130 210" stroke="#2f7a4d" strokeWidth="3" />
                <text x="134" y="248" fontSize="9.5" fill="#2f7a4d" fontWeight="600">手向下拉 = 膈肌收缩</text>
              </g>
            ) : phase === 'exhale' ? (
              <g>
                <circle cx="320" cy="240" r="8" fill="#b0483a" />
                <path d="M320 240 L 308 210" stroke="#b0483a" strokeWidth="3" />
                <text x="274" y="248" fontSize="9.5" fill="#b0483a" fontWeight="600">松手 = 膈肌舒张</text>
              </g>
            ) : null}
            {/* 气压标注 */}
            <text x="220" y="176" textAnchor="middle" fontSize="10.5" fill={phase === 'inhale' ? '#2f7a4d' : phase === 'exhale' ? '#b0483a' : '#59767c'} fontWeight="800">
              {lungText}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
