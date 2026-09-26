'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（生物固氮）',
    lines: [
      <>空气中的 N₂ 占 78%，但植物无法直接利用——只有把 N₂ 转化为<span className="font-semibold">氨（NH₃）</span>才能被吸收利用，这个过程叫<span className="font-semibold">生物固氮</span>。</>
      ,
      <>豆科植物与根瘤菌的<span className="font-semibold">互利共生</span>：根瘤菌侵入根毛 → 刺激根形成根瘤 → 根瘤内的固氮酶把 N₂ 还原为氨供给植物 → 植物提供糖类等有机物。</>
      ,
      <>工业固氮（哈伯法）：高温高压合成氨——消耗大量能源；生物固氮在常温常压下由固氮酶完成——效率高得惊人。</>
      ,
    ],
  },
  {
    title: '氮循环中的地位',
    lines: [
      <>固氮（N₂ → NH₃）是氮循环的"入口"：氨 → 亚硝酸盐 → 硝酸盐（硝化细菌）→ 被植物吸收 → 沿食物链流动 → 反硝化细菌把硝酸盐还原回 N₂。</>
      ,
      <>农业应用：<span className="font-semibold">豆科植物轮作/间作</span>（玉米与大豆间作）——根瘤菌固氮肥田，减少化肥使用；"豆科牧草-禾本科"混播牧场。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>共生固氮的"双赢"：<span className="font-semibold">根瘤菌获糖类与住所，植物获氮素</span>——互利共生的教科书案例（本站根瘤菌标本互参）。</>
      ,
      <>固氮酶怕氧：根瘤内的豆血红蛋白调节氧浓度——既供根瘤菌呼吸又保护固氮酶（"精准供氧"）。</>
      ,
      <>考点点：自生固氮微生物（如圆褐固氮菌）与共生固氮微生物（根瘤菌）的区别；化能合成作用（硝化细菌）与光合作用对比。</>
      ,
    ],
  },
];

type Phase = 0 | 1 | 2 | 3;

export function NitrogenFixationLab() {
  const [phase, setPhase] = useState<Phase>(0);
  const step = () => setPhase((s) => Math.min(3, s + 1) as Phase);
  const reset = () => setPhase(0);

  const observation = (() => {
    if (phase === 0)
      return '大豆根系分泌的化学物质"招引"土壤中的根瘤菌：根瘤菌聚集到根毛附近，分泌物质使根毛弯曲内陷——根瘤菌"搬进"根部。这是一段共生关系的开始。';
    if (phase === 1)
      return '根瘤菌刺激根细胞分裂，形成根瘤——菌体转化为"类菌体"，开始工作：固氮酶把空气中的 N₂ 还原为氨。豆血红蛋白精准控氧：既保护怕氧的固氮酶，又供给呼吸所需的少量氧。';
    if (phase === 2)
      return '氨源源不断供给植物合成氨基酸和蛋白质；植物把光合产物（糖类）回供给根瘤菌——"你给我氮，我给你糖"。一亩大豆的根瘤一年可固氮约 6~10 千克（相当于 30~50 千克尿素）。';
    return '大豆收获后，根瘤和残茬留在田里：氮素"馈赠"给下一茬作物——这就是"豆科轮作"和"间作"的传统智慧。人类利用根瘤菌固氮，减少化肥、保护土壤。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={phase >= 3}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              🌱 推进共生（{phase}/3）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新观察
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              共生分工：<span className="font-semibold">植物供糖 · 根瘤菌供氮</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">豆血红蛋白：精准控氧保护固氮酶</span>
            </div>
          </>
        }
      >
        <SceneBox label="根瘤的形成与固氮（步进演示）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 土壤 */}
            <path d="M40 190 h 360 v 50 h -360 Z" fill="#c9a06a" stroke="#a5763a" strokeWidth="2.4" />
            {/* 植株 */}
            <path d="M220 190 v -70" stroke="#3f7f3a" strokeWidth="7" strokeLinecap="round" />
            {[0, 1].map((i) => (
              <path key={i} d={`M220 ${170 - i * 30} q -34 -18 -56 -10 m 56 10 q 34 -18 56 -10`} fill="none" stroke="#5a9a3a" strokeWidth="5" strokeLinecap="round" />
            ))}
            {/* 根系 */}
            <path d="M220 190 q -40 20 -80 30 m 80 -30 q 40 20 90 26 m -90 -26 q -4 26 6 44 m -6 -44 q 30 18 60 22" fill="none" stroke="#a5763a" strokeWidth="4" strokeLinecap="round" />
            {/* 根瘤 */}
            {[0, 1, 2].map((i) => (
              <circle key={i} cx={152 + i * 46} cy={222 + (i % 2) * 14} r={7 + (i % 2) * 2} fill="#e8a8a0" stroke="#a5533c" strokeWidth="2" />
            ))}
            {/* 阶段细节 */}
            {phase === 0 ? (
              <g>
                {[0, 1, 2, 3].map((i) => (
                  <circle key={`b${i}`} cx={120 + i * 14} cy={214 + (i % 2) * 10} r="4" fill="#8a671b" />
                ))}
                <text x="90" y="200" fontSize="10" fill="#8a671b" fontWeight="700">根瘤菌聚集</text>
                <text x="300" y="60" fontSize="10.5" fill="#8a671b" fontWeight="700">N₂（空气中 78%）</text>
              </g>
            ) : null}
            {phase === 1 ? (
              <g>
                <rect x="120" y="218" width="80" height="22" rx="10" fill="#e8a8a0" stroke="#a5533c" strokeWidth="2" />
                <text x="160" y="234" textAnchor="middle" fontSize="9.5" fill="#5a1a1a" fontWeight="700">根瘤剖面：类菌体</text>
                <text x="300" y="60" fontSize="10.5" fill="#8a671b" fontWeight="700">固氮酶工作：N₂ → NH₃</text>
              </g>
            ) : null}
            {phase === 2 ? (
              <g>
                <path d="M290 56 q -40 10 -60 40" fill="none" stroke="#8a671b" strokeWidth="2.4" strokeDasharray="4 3" />
                <text x="160" y="60" fontSize="10.5" fill="#3f7f3a" fontWeight="700">NH₃ → 氨基酸 → 蛋白质</text>
                <path d="M150 170 q -30 -16 -54 -12" fill="none" stroke="#b0483a" strokeWidth="2.4" strokeDasharray="4 3" />
                <text x="66" y="146" fontSize="10.5" fill="#b0483a" fontWeight="700">糖类回流（光合产物）</text>
              </g>
            ) : null}
            {phase === 3 ? (
              <g>
                <text x="300" y="62" fontSize="10.5" fill="#3f7f3a" fontWeight="700">氮素留田 → 下一茬丰收</text>
                <path d="M290 56 q -40 10 -60 40" fill="none" stroke="#3f7f3a" strokeWidth="2.4" strokeDasharray="4 3" />
                <text x="150" y="160" fontSize="10.5" fill="#3f7f3a" fontWeight="700">"豆科轮作"传统智慧</text>
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
