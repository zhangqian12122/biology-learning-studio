'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（条件反射的建立）',
    lines: [
      <>非条件反射：生来就有的先天性反射（狗吃到食物分泌唾液），中枢在<span className="font-semibold">大脑皮层以下</span>。</>
      ,
      <>条件反射：出生后通过<span className="font-semibold">学习训练</span>建立的后天性反射（铃声→分泌唾液），必须有<span className="font-semibold">大脑皮层</span>参与。</>
      ,
      <>建立方法：<span className="font-semibold">无关刺激（铃声）与非条件刺激（食物）反复结合</span>，铃声就从"无关"变成"条件刺激"——巴甫洛夫的经典研究（1904 年诺贝尔奖）。</>
      ,
    ],
  },
  {
    title: '流程变量',
    lines: [
      <>训练：铃声 + 食物反复配对（强化），每次记录"只摇铃"时的唾液分泌量。</>
      ,
      <>巩固：配对次数越多，条件反射越牢固。</>
      ,
      <>消退：条件反射建立后，若长期<span className="font-semibold">只用铃声不喂食</span>，条件反射会逐渐减弱直至消失。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>条件反射的意义：使机体对环境变化有<span className="font-semibold">预见性</span>——大大提高适应能力（"望梅止渴"“谈虎色变”）。</>
      ,
      <>"铃声→唾液"的条件反射属于<span className="font-semibold">信号活动</span>；人类特有的还有<span className="font-semibold">语言文字</span>信号（第二信号系统）——"谈虎色变"。</>
      ,
      <>条件反射需要大脑皮层、是<span className="font-semibold">暂时的联系</span>；非条件反射中枢在皮层下、是永久的——两者的对比是高频考点。</>
      ,
    ],
  },
];

const MAX_TRIALS = 5;

export function ConditionedReflexLab() {
  const [trials, setTrials] = useState(0);
  const [testing, setTesting] = useState(false);
  const [secretion, setSecretion] = useState(0);
  const [extinguished, setExtinguished] = useState(false);

  const train = () => {
    if (trials < MAX_TRIALS) setTrials((t) => t + 1);
    setExtinguished(false);
  };

  const testBellOnly = () => {
    setTesting(true);
    if (extinguished || trials === 0) setSecretion(0);
    else setSecretion(Math.round((trials / MAX_TRIALS) * 100));
  };

  const reset = () => {
    setTrials(0);
    setTesting(false);
    setSecretion(0);
    setExtinguished(false);
  };

  const observation = (() => {
    if (testing)
      return trials === 0
        ? '只摇铃：唾液分泌 0 滴。铃声目前是"无关刺激"——狗不知道铃声与食物的关系，只有食物入口才分泌。'
        : extinguished
          ? '条件反射已消退：长期"只摇铃不喂食"后，铃声不再引起明显分泌——条件反射是暂时的联系，需要不断"强化"巩固。'
          : `只摇铃：唾液分泌 ${secretion} 滴（训练 ${trials} 次）。铃声已成为"条件刺激"——狗在"预期"食物的到来。训练次数越多，反应越牢固。`;
    if (trials === 0)
      return '实验对象：一只健康的狗，口腔接好唾液收集管。先做基线测试：只摇铃，狗毫无反应。现在开始训练——每次"铃声 + 食物"配对出现。';
    if (trials < 3)
      return `已完成 ${trials} 次配对训练。铃声与食物在时间上反复结合，狗的大脑皮层正在建立两者之间的暂时联系——试试"只摇铃"看看有没有效果。`;
    if (trials < MAX_TRIALS)
      return `已完成 ${trials} 次配对训练，条件反射初步建立，但还不很牢固（分泌量随训练次数增加而上升）。继续强化几轮，或测试一次效果。`;
    return '训练完成！铃声已从无关刺激变成条件刺激——即使不给食物，摇铃也能引起唾液分泌。这就是条件反射：后天学习建立的、需要大脑皮层参与的反射。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={train}
              disabled={trials >= MAX_TRIALS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              🍖 铃声 + 食物（训练 {trials}/{MAX_TRIALS}）
            </button>
            <button
              type="button"
              onClick={testBellOnly}
              className="min-h-10 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              🔔 只摇铃（测试）
            </button>
            <button
              type="button"
              onClick={() => { setExtinguished(true); setTesting(true); setSecretion(0); }}
              disabled={trials === 0}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏳ 长期只摇铃不喂食（消退）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置实验
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              训练次数：<span className="text-base font-bold text-[#0e6f75]">{trials}</span>
              {testing ? <> · 只摇铃分泌：<span className="text-base font-bold text-[#b0483a]">{secretion}</span> 滴</> : null}
            </div>
          </>
        }
      >
        <SceneBox label="巴甫洛夫条件反射实验（狗·唾液分泌）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 狗 */}
            <g>
              <ellipse cx="130" cy="140" rx="62" ry="40" fill="#d8c9a0" stroke="#8a7a4a" strokeWidth="2.8" />
              <circle cx="196" cy="112" r="26" fill="#d8c9a0" stroke="#8a7a4a" strokeWidth="2.6" />
              <path d="M186 88 q -2 -16 10 -18 q 10 -2 10 10" fill="none" stroke="#8a7a4a" strokeWidth="3.4" strokeLinecap="round" />
              <circle cx="208" cy="106" r="4" fill="#2a2a1a" />
              <path d="M222 118 l 10 5" stroke="#5a4a2a" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M100 120 q -20 -18 -34 -16" fill="none" stroke="#8a7a4a" strokeWidth="4" strokeLinecap="round" />
              <path d="M100 156 q 16 16 40 16 m -46 -20 q -12 18 -30 20" fill="none" stroke="#d8c9a0" strokeWidth="5" strokeLinecap="round" />
              {/* 唾液收集管 */}
              <path d="M210 130 q 10 16 6 30" fill="none" stroke="#8a9a9f" strokeWidth="3" strokeLinecap="round" />
              <rect x="206" y="160" width="14" height="20" rx="3" fill="#dceaea" stroke="#5a7a8a" strokeWidth="1.6" />
              <text x="130" y="204" textAnchor="middle" fontSize="10" fill="#59767c" fontWeight="600">唾液收集管</text>
            </g>
            {/* 铃 */}
            <g>
              <path d="M330 92 q 0 -18 22 -18 q 22 0 22 18 l 6 30 h -56 Z" fill="#e8c840" stroke="#a5882a" strokeWidth="2.6" />
              <circle cx="352" cy="128" r="5" fill="#a5882a" />
              <text x="352" y="58" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">铃声（条件刺激）</text>
            </g>
            {/* 食物 */}
            <g>
              <ellipse cx="300" cy="196" rx="36" ry="18" fill="#c96a4a" stroke="#8a3a2a" strokeWidth="2.4" />
              <text x="300" y="201" textAnchor="middle" fontSize="10" fill="#f4e0d0" fontWeight="700">食物（非条件刺激）</text>
            </g>
            {/* 分泌滴数 */}
            {testing && secretion > 0 ? (
              <g>
                {[0, 1, 2].map((i) => (
                  <circle key={i} cx={213 - i * 4} cy={190 + i * 14} r="3.4" fill="#7ab0c9" opacity={0.9 - i * 0.2} />
                ))}
                <text x="240" y="196" fontSize="11" fill="#2c5a84" fontWeight="700">{secretion} 滴</text>
              </g>
            ) : null}
            {/* 结论条 */}
            <rect x="30" y="228" width="380" height="24" rx="8" fill="#fdf1cf" stroke="#8a671b" strokeWidth="1.8" />
            <text x="220" y="245" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">
              {trials === 0 ? '铃声 = 无关刺激（不引起分泌）' : trials < 3 ? '皮层正在建立暂时联系…' : extinguished ? '条件反射已消退——需重新强化' : '铃声 = 条件刺激（条件反射已建立）'}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
