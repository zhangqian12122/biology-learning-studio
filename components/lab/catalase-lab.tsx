'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const TUBE_CENTERS = [62, 162, 262, 362];

const TUBES = [
  { id: 1, name: '1号 · 常温放置', detail: '空白对照', rate: 0.05, bath: false },
  { id: 2, name: '2号 · 90 ℃ 水浴', detail: '加热促进分解', rate: 0.22, bath: true },
  { id: 3, name: '3号 · 2滴 FeCl₃', detail: '无机催化剂', rate: 0.5, bath: false },
  { id: 4, name: '4号 · 2滴肝脏研磨液', detail: '过氧化氢酶', rate: 1, bath: false },
] as const;

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>H₂O₂ 在常温下分解很慢；加热、Fe³⁺（无机催化剂）与过氧化氢酶都能加快其分解，产生 O₂（气泡）。</>,
      <>O₂ 助燃：产生的氧气越多、越快，伸入试管的点燃卫生香越容易<span className="font-semibold">复燃</span>。</>,
      <>比较 3 号与 4 号：酶的催化效率比无机催化剂高得多，说明<span className="font-semibold">酶具有高效性</span>。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：新配制的 3% 过氧化氢溶液、90 ℃ 左右热水、质量分数 3.5% 的 FeCl₃ 溶液、新鲜肝脏研磨液（含过氧化氢酶）。</>,
      <>用具：试管 4 支及试管架、量筒、滴管、卫生香、火柴、水浴锅。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 取 4 支洁净试管，编为 1~4 号，各注入 10 mL 相同浓度的 H₂O₂ 溶液（无关变量保持一致）。</>,
      <>② 1 号常温放置作对照；2 号 90 ℃ 水浴加热；3 号滴入 2 滴 FeCl₃ 溶液；4 号滴入 2 滴肝脏研磨液。</>,
      <>③ 观察各试管产生气泡的多少与快慢。</>,
      <>④ 将点燃但无火焰的卫生香分别伸入 4 支试管液面上方，观察是否复燃。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>不能用沸水（100 ℃）加热 H₂O₂：高温会直接使 H₂O₂ 快速分解，干扰对照（教材用 90 ℃ 左右热水）。</>,
      <>FeCl₃ 溶液与肝脏研磨液的滴数、H₂O₂ 的浓度与用量都属于<span className="font-semibold">无关变量</span>，必须保持相同。</>,
      <>1 号试管是<span className="font-semibold">空白对照</span>；本实验的自变量是催化剂的种类（2 号为温度）。</>,
      <>煮沸的肝脏研磨液不再催化：高温破坏酶的空间结构使酶<span className="font-semibold">失活</span>，说明酶的作用条件温和。</>,
    ],
  },
];

function cnChip(active: boolean) {
  return `inline-flex h-9 items-center justify-center rounded-md border px-2.5 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function CatalaseLab() {
  const [started, setStarted] = useState(false);
  const [boiled, setBoiled] = useState(false);
  const [flameTube, setFlameTube] = useState<number | null>(null);
  const [flameKey, setFlameKey] = useState(0);

  const rateOf = (id: number) => {
    if (id === 4 && boiled) return 0.04;
    return TUBES[id - 1].rate;
  };

  const conclusion = (() => {
    if (!started) {
      return '四支试管尚未加液。请先点「注入 H₂O₂ 并加入对应催化剂」，再对比气泡产生的快慢。';
    }
    if (flameTube === null) {
      return '气泡快慢一目了然：4号 > 3号 > 2号 > 1号。接下来用点燃的卫生香伸入各试管，检验产生的氧气。';
    }
    if (flameTube === 4 && boiled) {
      return '煮沸后的肝脏研磨液几乎不产生气泡，卫生香不复燃——高温破坏了酶的空间结构，过氧化氢酶已经失活。';
    }
    if (flameTube === 4) {
      return '卫生香猛烈复燃！4号试管由过氧化氢酶催化，快速放出大量氧气。与3号的 Fe³⁺ 相比，酶的催化效率高出许多倍——酶具有高效性。';
    }
    if (flameTube === 3) {
      return '卫生香复燃，但不如4号猛烈——Fe³⁺ 作为无机催化剂也能加快 H₂O₂ 分解，只是效率远低于酶。';
    }
    return '卫生香不复燃，火星也没有明显变化——该试管几乎不产生氧气，只起对照或弱对比作用。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <button
                type="button"
                disabled={started}
                onClick={() => setBoiled((value) => !value)}
                aria-pressed={boiled}
                className={`${cnChip(boiled)} w-full disabled:cursor-not-allowed disabled:opacity-40`}
              >
                <span aria-hidden="true" className="text-[13px]">🔥</span>
                肝脏研磨液已提前煮沸（对照）
              </button>
              <p className="mt-1.5 text-[11px] leading-5 text-[#799398]">
                煮沸用于演示「高温使酶失活」；正式实验应使用新鲜肝脏研磨液。
              </p>
            </div>

            <button
              type="button"
              disabled={started}
              onClick={() => setStarted(true)}
              className="inline-flex h-9 items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ① 注入等量 3% H₂O₂，并加入对应催化剂
            </button>

            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">② 卫生香检测氧气（点燃后伸入）</p>
              <div className="flex gap-1.5">
                {TUBES.map((tube) => (
                  <button
                    key={tube.id}
                    type="button"
                    disabled={!started}
                    title={tube.name}
                    onClick={() => {
                      setFlameTube(tube.id);
                      setFlameKey((key) => key + 1);
                    }}
                    className={`${cnChip(flameTube === tube.id)} disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    {tube.id} 号
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              每支试管均注入 10 mL 相同浓度的 H₂O₂ 溶液——<span className="font-semibold">无关变量保持一致</span>
              ，变量只有催化剂的种类（2 号为温度）。加液前可决定肝脏研磨液是否煮沸，加液后不能再改。
            </div>
          </>
        }
      >
        <SceneBox label="四支试管对比（气泡数量与速度 = 反应速率）" heightClass="h-[320px]">
          <svg className="h-full w-full" viewBox="0 0 420 248" aria-hidden="true">
            <defs>
              {TUBES.map((tube) => {
                const cx = TUBE_CENTERS[tube.id - 1];
                return (
                  <clipPath key={tube.id} id={`cat-tube-clip-${tube.id}`}>
                    <path
                      d={`M${cx - 17} 74 L${cx - 17} 168 Q${cx - 17} 184 ${cx} 184 Q${cx + 17} 184 ${cx + 17} 168 L${cx + 17} 74 Z`}
                    />
                  </clipPath>
                );
              })}
            </defs>

            {TUBES.map((tube) => {
              const cx = TUBE_CENTERS[tube.id - 1];
              const rate = started ? rateOf(tube.id) : 0;
              const bubbleCount = Math.round(rate * 7);
              const flyDuration = 2.4 - rate * 1.5;
              const foam = rate >= 0.45;

              return (
                <g key={tube.id}>
                  {/* 2 号试管的水浴烧杯 */}
                  {tube.bath ? (
                    <g>
                      <rect x={cx - 32} y="92" width="64" height="96" rx="6" fill="#d8edf6" />
                      <rect x={cx - 32} y="92" width="64" height="96" rx="6" fill="none" stroke="#7fa9bb" strokeWidth="2" />
                      <text x={cx} y="206" textAnchor="middle" fontSize="9" fill="#3f7183">
                        90 ℃ 水浴
                      </text>
                    </g>
                  ) : null}

                  {/* 试管壁 */}
                  <path
                    d={`M${cx - 17} 70 L${cx - 17} 168 Q${cx - 17} 184 ${cx} 184 Q${cx + 17} 184 ${cx + 17} 168 L${cx + 17} 70`}
                    fill="none"
                    stroke="#9db8bd"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <line x1={cx - 22} y1="74" x2={cx + 22} y2="74" stroke="#9db8bd" strokeWidth="3" strokeLinecap="round" />

                  {/* 液体与气泡 */}
                  <g clipPath={`url(#cat-tube-clip-${tube.id})`}>
                    <rect x={cx - 20} y="112" width="40" height="76" fill="#e6f2f5" />
                    {started ? (
                      <g>
                        {Array.from({ length: bubbleCount }).map((_, bubbleIndex) => (
                          <circle
                            key={bubbleIndex}
                            cx={cx - 9 + ((bubbleIndex * 7) % 19)}
                            cy="168"
                            r={2.4 + (bubbleIndex % 2) * 0.8}
                            fill="#ffffff"
                            stroke="#6fa3b0"
                            strokeWidth="1"
                            className="bio-gas"
                            style={{ animationDelay: `${bubbleIndex * (0.5 - rate * 0.35)}s`, animationDuration: `${flyDuration}s` }}
                          />
                        ))}
                        {foam ? <ellipse cx={cx} cy="114" rx="15" ry="4.5" fill="#ffffff" opacity="0.9" /> : null}
                      </g>
                    ) : null}
                  </g>

                  {/* 卫生香 + 复燃火焰 */}
                  {flameTube === tube.id ? (
                    <g key={flameKey}>
                      <line x1={cx + 26} y1="80" x2={cx + 26} y2="38" stroke="#6b4f35" strokeWidth="3" strokeLinecap="round" />
                      <circle cx={cx + 26} cy="36" r="2.4" fill="#e07b28" />
                      {rate >= 0.45 ? (
                        <g className="bio-flame">
                          <path d={`M${cx + 26} 16 Q${cx + 35} 30 ${cx + 26} 40 Q${cx + 17} 30 ${cx + 26} 16 Z`} fill="#f0a32f" />
                          <path d={`M${cx + 26} 23 Q${cx + 31} 30 ${cx + 26} 37 Q${cx + 21} 30 ${cx + 26} 23 Z`} fill="#f8d05a" />
                        </g>
                      ) : (
                        <circle cx={cx + 26} cy="36" r="4" fill="#e07b28" opacity="0.55" className="bio-fail" />
                      )}
                      <text x={cx + 26} y="12" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="600">
                        {rate >= 0.45 ? '复燃！' : '不复燃'}
                      </text>
                    </g>
                  ) : null}

                  <text x={cx} y="226" textAnchor="middle" fontSize="10.5" fill="#4b6c73" fontWeight="600">
                    {tube.name}
                  </text>
                  <text x={cx} y="242" textAnchor="middle" fontSize="9" fill="#799398">
                    {tube.id === 4 && boiled && started ? '（已煮沸 → 酶失活）' : tube.detail}
                  </text>
                </g>
              );
            })}
          </svg>
        </SceneBox>

        <ObservationNote>
          {conclusion}
          {started ? ' 1 号试管为空白对照；自变量是催化剂种类，气泡与复燃程度：4号 > 3号 > 2号 > 1号。' : null}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
