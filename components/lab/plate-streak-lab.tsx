'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>通过连续划线将菌种逐步稀释：每次划线后<span className="font-semibold">灼烧接种环灭菌</span>，再从上一区末端划出——菌种越来越少，最终出现由一个细胞繁殖来的<span className="font-semibold">单个菌落</span>。</>,
      <>单菌落就是纯种培养物，可用于纯化菌种（微生物培养的核心操作之一）。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：大肠杆菌菌种、固体培养基平板（牛肉膏蛋白胨 + 琼脂）。</>,
      <>用具：接种环、酒精灯、恒温培养箱。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 灼烧接种环灭菌，冷却后蘸取菌液，在平板第一区划 3~5 条平行线。</>,
      <>② <span className="font-semibold">灼烧接种环</span>，待冷却后转动平板约 60°，从第一区末端划出第二区。</>,
      <>③ 同法划第三、第四区，划线时不要划破培养基，也不能与前一区重叠。</>,
      <>④ 倒置放入 37℃ 恒温培养箱培养 24~48 h，观察菌落。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>每划完一区都要<span className="font-semibold">灼烧接种环</span>：既消灭残留菌种，保证下一区菌种来自上一区末端（逐步稀释）。</>,
      <>第一区菌最密，最后一区最稀，才可能出现单个菌落——达到分离纯种的目的。</>,
      <>全程在酒精灯火焰附近操作，防止杂菌污染（无菌技术）。</>,
      <>平板<span className="font-semibold">倒置培养</span>：防止皿盖水珠滴落冲散菌落，也减少水分挥发。</>,
    ],
  },
];

/** 四个划线区的扇形划线（每区 4 条平行线） */
function zoneStrokes(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number, lines = 4) {
  const paths: string[] = [];
  for (let i = 0; i < lines; i += 1) {
    const t0 = a0 + ((a1 - a0) * i) / lines + (a1 - a0) * 0.08;
    const t1 = a0 + ((a1 - a0) * (i + 1)) / lines - (a1 - a0) * 0.08;
    const x0 = cx + Math.cos(t0) * (r0 + (r1 - r0) * 0.15);
    const y0 = cy + Math.sin(t0) * (r0 + (r1 - r0) * 0.15);
    const x1 = cx + Math.cos(t1) * (r1 - (r1 - r0) * 0.1);
    const y1 = cy + Math.sin(t1) * (r1 - (r1 - r0) * 0.1);
    paths.push(`M${x0.toFixed(1)} ${y0.toFixed(1)} L${x1.toFixed(1)} ${y1.toFixed(1)}`);
  }
  return paths;
}

const ZONES = [
  { cx: 210, cy: 130, a0: -Math.PI / 2, a1: 0 },
  { cx: 210, cy: 130, a0: 0, a1: Math.PI / 2 },
  { cx: 210, cy: 130, a0: Math.PI / 2, a1: Math.PI },
  { cx: 210, cy: 130, a0: Math.PI, a1: Math.PI * 1.5 },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function PlateStreakLab() {
  const [zone, setZone] = useState(0); // 当前应划的区 0..3
  const [streaked, setStreaked] = useState<boolean[]>([false, false, false, false]);
  const [sterilized, setSterilized] = useState(true);
  const [incubated, setIncubated] = useState(false);
  const [flameKey, setFlameKey] = useState(0);

  const streak = () => {
    setStreaked((prev) => {
      const next = [...prev];
      next[zone] = true;
      return next;
    });
    // 划完本区：接种环带菌，需灼烧
    setSterilized(false);
  };

  const flame = () => {
    setSterilized(true);
    setFlameKey((k) => k + 1);
    setZone((z) => Math.min(z + 1, 3));
  };

  const reset = () => {
    setZone(0);
    setStreaked([false, false, false, false]);
    setSterilized(true);
    setIncubated(false);
  };

  const skippedFlame = streaked.some(Boolean) && !sterilized && zone > 0 && streaked[zone - 1];
  const allStreaked = streaked.every(Boolean);
  const pure = incubated && sterilized && allStreaked; // 规范操作 → 单菌落
  const contaminated = incubated && !sterilized; // 跳过灼烧 → 连成一片

  const status = (() => {
    if (!allStreaked) {
      if (!sterilized && zone > 0) return '⚠ 接种环带有上一区菌种：先灼烧灭菌，再划下一区';
      return `下一区：${zone + 1} 区。先用酒精灯灼烧接种环灭菌${zone === 0 ? '（首次蘸菌前）' : ''}。`;
    }
    if (!incubated) return '四区划线完成！倒置放入 37℃ 恒温培养箱培养 24~48h。';
    return contaminated
      ? '❌ 培养结果：菌落连成一片，没有单个菌落——划线间未灼烧灭菌，菌种没有被稀释。'
      : pure
        ? '✅ 培养结果：第 3、4 区出现单个菌落——由一个细胞繁殖而来，纯化成功！'
        : '';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div className={`rounded-md px-3 py-2.5 text-xs leading-5 ${sterilized ? 'bg-[#eef7f6] text-[#4b6c73]' : 'border border-[#f0d3c0] bg-[#fdf3e3] text-[#9a5a1b]'}`}>
              接种环状态：{sterilized ? '已灭菌（无菌）' : '⚠ 带菌，需灼烧'}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setFlameKey((k) => k + 1);
                  setSterilized(true);
                }}
                className="inline-flex min-h-10 items-center justify-center rounded-md border border-[#d9a05a] bg-[#fdf3e3] px-2 text-xs font-semibold text-[#9a5a1b] transition-colors hover:bg-[#fbeed6]"
              >
                🔥 灼烧接种环
              </button>
              <button
                type="button"
                disabled={!sterilized || allStreaked}
                onClick={streak}
                className={`inline-flex min-h-10 items-center justify-center rounded-md px-2 text-xs font-semibold transition-colors ${cnChip(false)} border-[#0e6f75] bg-[#0e6f75] text-white hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40`}
              >
                划第 {zone + 1} 区
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {streaked.map((done, i) => (
                <div key={i} className={`rounded-md border px-1 py-1.5 text-center text-[11px] font-semibold ${done ? 'border-[#5f9e6f] bg-[#dff0e2] text-[#2f7a4d]' : 'border-[#d9e7e7] bg-white text-[#9ab0b5]'}`}>
                  {i + 1} 区{done ? ' ✓' : ''}
                </div>
              ))}
            </div>
            <button
              type="button"
              disabled={!allStreaked || incubated}
              onClick={() => setIncubated(true)}
              className={`${cnChip(false) + ' w-full'} border-[#0e6f75] bg-[#0e6f75] text-white hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40`}
            >
              倒置放入 37℃ 培养箱
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              取新平板重做
            </button>
          </>
        }
      >
        <SceneBox label="固体培养基平板（俯视）—— 分区划线稀释菌种" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 320" aria-hidden="true">
            {/* 平板 */}
            <circle cx="210" cy="155" r="128" fill="#f4ede0" stroke="#c9b898" strokeWidth="3" />
            <circle cx="210" cy="155" r="120" fill="#faf6ec" stroke="#e0d4b8" strokeWidth="1.5" />

            {/* 划线轨迹 */}
            {ZONES.map((z, i) =>
              streaked[i] ? (
                <g key={i}>
                  {zoneStrokes(z.cx, z.cy, 18, 116, z.a0, z.a1).map((d, k) => (
                    <path key={k} d={d} stroke={skippedFlame && i === zone ? '#b0483a' : '#3d7ea8'} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
                  ))}
                  <text
                    x={z.cx + Math.cos((z.a0 + z.a1) / 2) * 66}
                    y={z.cy + Math.sin((z.a0 + z.a1) / 2) * 66 + 4}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#8a671b"
                    fontWeight="700"
                  >
                    {i + 1} 区
                  </text>
                </g>
              ) : null,
            )}

            {/* 培养后菌落 */}
            {incubated
              ? streaked.map((_, zi) => {
                  const col = zi === 3 ? '#f4d06a' : zi === 2 ? '#e8c98a' : '#e8dcc8';
                  const count = zi === 3 ? 5 : zi === 2 ? 8 : 12;
                  const rr = 116 - (3 - zi) * 18;
                  return (
                    <g key={zi}>
                      {Array.from({ length: count }, (_, k) => {
                        const th = ((zi * 17 + k * 29) % 360) * (Math.PI / 180);
                        const rad = 30 + ((zi * 13 + k * 37) % Math.max(1, rr - 24));
                        return (
                          <circle
                            key={k}
                            cx={210 + Math.cos(th) * rad}
                            cy={155 + Math.sin(th) * rad}
                            r={zi >= 2 ? 5.5 : 4}
                            fill={col}
                            stroke="#b5955a"
                            strokeWidth="1.2"
                          />
                        );
                      })}
                    </g>
                  );
                })
              : null}

            {/* 接种环 + 火焰 */}
            <g key={flameKey}>
              <circle cx="392" cy="42" r="17" fill={sterilized ? '#f2f4f2' : '#dfe9e4'} stroke="#b8c4c2" strokeWidth="1.6" />
              <text x="392" y="46" textAnchor="middle" fontSize="8.5" fill={sterilized ? '#5f7a6f' : '#9a5a1b'} fontWeight="700">
                {sterilized ? '无菌' : '带菌'}
              </text>
              {!sterilized ? (
                <g className="bio-flame" style={{ transformOrigin: '392px 42px' }}>
                  <path d="M392 24 q 12 12 0 24 q -12 -12 0 -24" fill="#f0a32f" opacity="0.9" />
                </g>
              ) : null}
            </g>
          </svg>
        </SceneBox>

        <ObservationNote>
          {status}
          {!allStreaked && !sterilized ? ' 划线前必须灼烧——否则菌种没有被逐步稀释。' : null}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
