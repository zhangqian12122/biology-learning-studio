'use client';

import { useState } from 'react';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>活细胞中的细胞质处于不断流动的状态，叶绿体等细胞器随细胞质一起流动——细胞质流动是<span className="font-semibold">活细胞的标志</span>，能促进细胞内物质运输和代谢。</>,
      <>黑藻嫩叶细胞呈长方形，叶绿体较大且呈绿色，容易观察；以细胞内缘为参照可以看出叶绿体的环流方向。</>,
      <>温度等外界条件会影响细胞质流动速度：适当升温加快，温度过高（如 45℃ 以上）细胞死亡、流动停止。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：黑藻（或新鲜菠菜叶）嫩叶。</>,
      <>用具：载玻片、盖玻片、镊子、滴管、显微镜。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 取黑藻嫩叶一片（幼嫩小叶最理想），放在载玻片的水滴中。</>,
      <>② 盖上盖玻片，制成临时装片。</>,
      <>③ 先用低倍镜找到叶片细胞并移到视野中央，再换高倍镜观察。</>,
      <>④ 以细胞壁/细胞内缘为参照，观察叶绿体随细胞质流动的方向与速度。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>观察的是<span className="font-semibold">叶绿体</span>（绿色椭球状）的运动，它是"随细胞质流动"而不是自己游动。</>,
      <>实验前给黑藻光照、温水（约 25℃）处理，可让细胞质流动加快便于观察。</>,
      <>高倍镜下只能用<span className="font-semibold">细准焦螺旋</span>调焦；临时装片要随时补水防止干燥。</>,
      <>若视野中流动停止，可能是细胞已死亡（温度过高或装片干燥）。</>,
    ],
  },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function ChloroplastStreamingLab() {
  const [step, setStep] = useState(0);
  const [stage, setStage] = useState(0); // 0 取材 → 1 装片 → 2 显微观察
  const [temperature, setTemperature] = useState(22);

  const dead = temperature >= 45;
  const speedFactor = dead ? 0 : Math.max(0.15, temperature / 25);
  const orbitDuration = 14 / speedFactor; // 秒/圈
  const observing = stage >= 3;

  const observation = dead
    ? '⚠ 45℃ 以上：细胞死亡，细胞质流动完全停止！叶绿体静止不动。这反过来证明细胞质流动是活细胞才有的现象。把温度降回来也无法复活——先把滑块调回 20℃ 左右，再点「重新取材」。'
    : observing
      ? `细胞质正在流动（${temperature}℃${temperature > 30 ? '，流动明显加快' : ''}）：叶绿体（绿色椭球体）沿细胞内缘环形流动。参照细胞壁可以看出流动方向——细胞质流动能促进物质运输，是活细胞的标志。`
      : '按照左侧步骤取材、制片。自由操作模式可以直接点各阶段按钮。';

  // 叶绿体参数：半径比例 + 起始角
  const CHLOROPLASTS = [
    { r: 0.82, a: 0, size: 1 },
    { r: 0.82, a: 130, size: 0.85 },
    { r: 0.82, a: 250, size: 0.9 },
    { r: 0.6, a: 60, size: 0.8 },
    { r: 0.6, a: 200, size: 0.75 },
    { r: 0.35, a: 300, size: 0.7 },
  ];

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div className="grid gap-1.5">
              <p className="text-sm font-medium text-[#37585f]">实验阶段</p>
              <div className="grid grid-cols-3 gap-1.5">
                <button type="button" onClick={() => setStage(1)} aria-pressed={stage === 1} className={cnChip(stage === 1)}>
                  取嫩叶
                </button>
                <button type="button" onClick={() => setStage(2)} aria-pressed={stage === 2} className={cnChip(stage === 2)}>
                  制装片
                </button>
                <button type="button" onClick={() => setStage(3)} aria-pressed={observing} className={cnChip(observing)}>
                  显微观察
                </button>
              </div>
            </div>

            <ControlSlider
              label="环境温度（试试拖到 45℃ 以上）"
              value={temperature}
              unit="℃"
              min={5}
              max={50}
              step={1}
              accent={dead ? 'rose' : 'teal'}
              onChange={setTemperature}
            />

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              流速读数：{dead ? '0（细胞死亡）' : `${(speedFactor * 100).toFixed(0)}%（相对 25℃）`}
            </div>

            {dead ? (
              <button
                type="button"
                onClick={() => {
                  setTemperature(22);
                  setStage(0);
                  setStep(0);
                }}
                className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
              >
                重新取材制片
              </button>
            ) : null}
          </>
        }
      >
        <SceneBox label={observing ? '高倍镜视野：黑藻叶细胞' : stage >= 1 ? '临时装片' : '黑藻植株'} heightClass="h-[320px]">
          {!observing ? (
            <svg className="h-full w-full" viewBox="0 0 420 260" aria-hidden="true">
              {stage === 0 ? (
                <g>
                  {/* 黑藻植株 */}
                  <path d="M210 230 L210 90" stroke="#4d8a5e" strokeWidth="5" />
                  {[110, 140, 170, 200].map((y, i) => (
                    <g key={y}>
                      <ellipse cx={210 - 26 - i * 4} cy={y} rx="26" ry="7" fill="#5f9e57" stroke="#3f7f4f" strokeWidth="1.5" transform={`rotate(${-30 - i * 6} ${210 - 26 - i * 4} ${y})`} />
                      <ellipse cx={210 + 26 + i * 4} cy={y} rx="26" ry="7" fill="#5f9e57" stroke="#3f7f4f" strokeWidth="1.5" transform={`rotate(${30 + i * 6} ${210 + 26 + i * 4} ${y})`} />
                    </g>
                  ))}
                  <circle cx="210" cy="82" r="10" fill="#6faf58" />
                  <text x="210" y="40" textAnchor="middle" fontSize="12" fill="#2f6b42" fontWeight="600">
                    黑藻（取顶端幼嫩小叶）
                  </text>
                  <text x="210" y="58" textAnchor="middle" fontSize="10" fill="#5f8f4e">
                    幼叶细胞大、叶绿体多
                  </text>
                </g>
              ) : (
                <g>
                  {/* 载玻片 + 盖玻片 */}
                  <rect x="70" y="120" width="280" height="70" rx="6" fill="#dff0ee" stroke="#9dc4bd" strokeWidth="2" />
                  <rect x="110" y="100" width="200" height="110" rx="4" fill="#f0fafa" stroke="#8fb8b0" strokeWidth="2" opacity="0.9" />
                  <ellipse cx="210" cy="155" rx="52" ry="18" fill="#bfe3c0" stroke="#5f9e57" strokeWidth="2" />
                  <text x="210" y="62" textAnchor="middle" fontSize="12" fill="#2f6b42" fontWeight="600">
                    {stage === 1 ? '嫩叶放入水滴' : '盖上盖玻片，制成临时装片'}
                  </text>
                  <text x="210" y="216" textAnchor="middle" fontSize="10" fill="#799398">
                    载玻片 + 水滴 + 嫩叶 + 盖玻片
                  </text>
                </g>
              )}
            </svg>
          ) : (
            <svg className="h-full w-full" viewBox="0 0 420 260" aria-hidden="true">
              {/* 两个长方形黑藻叶细胞 */}
              {[80, 230].map((x0, ci) => (
                <g key={x0}>
                  <rect x={x0} y="30" width="120" height="200" rx="18" fill="#eef7ea" stroke="#4d8a5e" strokeWidth="3" />
                  {/* 细胞核 */}
                  <circle cx={x0 + 60} cy={ci === 0 ? 60 : 210} r="11" fill="#a97fb5" opacity="0.85" />
                  {/* 环流轨道参考（虚线） */}
                  <ellipse cx={x0 + 60} cy="130" rx="44" ry="74" fill="none" stroke="#b8d8bc" strokeWidth="1.5" strokeDasharray="5 5" />

                  {/* 旋转组：叶绿体随细胞质环流 */}
                  <g
                    className="bio-stream-orbit"
                    style={{
                      transformOrigin: `${x0 + 60}px 130px`,
                      animationDuration: `${orbitDuration}s`,
                      animationPlayState: dead ? 'paused' : 'running',
                      transformBox: 'view-box',
                    }}
                  >
                    {CHLOROPLASTS.map((c, i) => {
                      const rad = (c.a * Math.PI) / 180;
                      const cx = x0 + 60 + Math.cos(rad) * 44 * c.r * 0.9;
                      const cy = 130 + Math.sin(rad) * 74 * c.r;
                      return (
                        <ellipse
                          key={i}
                          cx={cx}
                          cy={cy}
                          rx={13 * c.size}
                          ry={8 * c.size}
                          fill="#4c9a58"
                          stroke="#2f6b42"
                          strokeWidth="1.8"
                        />
                      );
                    })}
                  </g>
                  {/* 逆时针参照箭头 */}
                  <path d={`M${x0 + 60} 44 q 22 6 26 24`} fill="none" stroke="#7aa87e" strokeWidth="2" markerEnd="url(#streamArrow)" />
                </g>
              ))}
              <defs>
                <marker id="streamArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#7aa87e" />
                </marker>
              </defs>
              <text x="210" y="20" textAnchor="middle" fontSize="11" fill={dead ? '#b0483a' : '#2f6b42'} fontWeight="700">
                {dead ? '⚠ 细胞死亡，流动停止！' : `细胞质流动中 · ${temperature}℃ · 方向：环形（参照虚线轨道）`}
              </text>
              <text x="210" y="248" textAnchor="middle" fontSize="10" fill="#799398">
                绿色椭球 = 叶绿体（随细胞质流动） · 紫色圆 = 细胞核
              </text>
            </svg>
          )}
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
