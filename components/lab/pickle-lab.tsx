'use client';

import { useMemo, useState } from 'react';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>乳酸菌是<span className="font-semibold">厌氧细菌</span>，在无氧条件下将葡萄糖分解为乳酸——制作泡菜的菌种。</>,
      <>亚硝酸盐：发酵初期坛内杂菌（如硝酸盐还原菌）繁殖使亚硝酸盐升高；随乳酸菌占优势、pH 降低，亚硝酸盐又被降解——含量<span className="font-semibold">先升后降</span>，约 10 天后可安全食用。</>,
      <>盐水浓度与密封是关键：盐抑菌、无氧环境利于乳酸菌发酵。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：新鲜蔬菜（白菜、萝卜等）、食盐、泡菜坛。</>,
      <>试剂：对氨基苯磺酸溶液、N-1-萘基乙二胺盐酸盐溶液（测亚硝酸盐）。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 蔬菜洗净晾干，装入泡菜坛。</>,
      <>② 配制盐水（清水煮沸冷却，按比例加盐），盐水<span className="font-semibold">没过全部菜料</span>，盖好坛盖并水封。</>,
      <>③ 置于阴凉处发酵，定期测定亚硝酸盐含量。</>,
      <>④ 亚硝酸盐降至最低且稳定后食用（一般 10 天左右）。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>盐水浓度过高：<span className="font-semibold">乳酸菌被抑制</span>，发酵慢；过低：杂菌繁殖易变质——教材用量约为清水质量的 5%（可试 3%~15% 区间）。</>,
      <>泡菜坛<span className="font-semibold">水封</span>创造无氧环境：乳酸菌厌氧发酵，霉菌等好氧菌被抑制。</>,
      <>温度过高、食盐过少都会加快亚硝酸盐生成，延长"安全期"。</>,
      <>乳酸菌是原核生物（无细胞核），发酵产物乳酸使 pH 下降。</>,
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

export function PickleFermentLab() {
  const [saltPct, setSaltPct] = useState(5);
  const [sealed, setSealed] = useState(true);
  const [day, setDay] = useState(0);
  const [started, setStarted] = useState(false);

  // 亚硝酸盐曲线（峰值随条件变化）：先升后降
  const unsafe = saltPct < 4 || !sealed;
  const peakDay = unsafe ? 8 : 10;
  const peakVal = unsafe ? 8.5 : 4.2;
  const nitrite = useMemo(() => {
    if (!started || day === 0) return 0;
    const t = day;
    const rise = peakVal * Math.exp(-(((t - peakDay) / (peakDay * 0.55)) ** 2));
    return Math.max(0.3, rise);
  }, [started, day, unsafe, peakDay, peakVal]);

  const safe = day >= 10 && !unsafe;

  const observation = (() => {
    if (!started) return '设置盐水浓度与密封条件后开始腌制。注意：乳酸菌是厌氧菌——坛盖必须水封。';
    const lactic = Math.min(100, day * 12 + (saltPct >= 4 ? 10 : -10));
    if (unsafe && day >= 3) return `⚠ 条件不当（${!sealed ? '未密封' : '盐浓度过低'}）：杂菌繁殖，亚硝酸盐峰值高达 ${nitrite.toFixed(1)} mg/kg 且迟迟不降——不适合食用。点「重新制作」调整条件。`;
    if (day < 4) return `腌制第 ${day} 天：亚硝酸盐 ${nitrite.toFixed(1)} mg/kg（上升中）。乳酸菌开始产酸，坛内渐酸。`;
    if (day < 10) return `腌制第 ${day} 天：亚硝酸盐 ${nitrite.toFixed(1)} mg/kg（${day >= peakDay ? '已开始下降' : '接近峰值'}）。乳酸大量积累，pH 下降。`;
    return safe
      ? `✅ 第 ${day} 天：亚硝酸盐降至 ${nitrite.toFixed(1)} mg/kg（安全水平），乳酸含量约 ${Math.min(100, lactic)}%——泡菜制作成功，可以食用！`
      : `第 ${day} 天：亚硝酸盐 ${nitrite.toFixed(1)} mg/kg。`;
  })();

  const stepForward = () => {
    if (!started) setStarted(true);
    setDay((d) => Math.min(d + 1, 14));
  };
  const reset = () => {
    setDay(0);
    setStarted(false);
  };

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>


            <ControlSlider label="盐水浓度" value={saltPct} unit="%" min={1} max={15} step={1} accent="rose" onChange={(v) => { setSaltPct(v); setDay(0); setStarted(false); }} />
            <button type="button" onClick={() => { setSealed((v) => !v); setDay(0); setStarted(false); }} aria-pressed={sealed} className={`${cnChip(sealed)} w-full ${sealed ? '' : 'border-[#b0483a] bg-[#f9e2e0] text-[#b0483a]'}`}>
              {sealed ? '🕯️ 坛盖水封（无氧）' : '⚠ 未密封（有氧）'}
            </button>

            <div className="grid grid-cols-2 gap-1.5">
              <button type="button" onClick={stepForward} disabled={day >= 14} className="inline-flex min-h-10 items-center justify-center rounded-md bg-[#0e6f75] px-2 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40">
                发酵 +1 天
              </button>
              <button type="button" onClick={reset} className="min-h-10 w-full rounded-md border border-[#cbdede] bg-white px-2 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
                重新制作
              </button>
            </div>

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              第 {day} 天 · 亚硝酸盐：<span className={`font-bold ${nitrite > 5 ? 'text-[#b0483a]' : 'text-[#2f7a4d]'}`}>{started ? nitrite.toFixed(1) : '—'}</span> mg/kg
              {safe ? ' · ✅ 可食用' : day >= 3 && unsafe ? ' · ⚠ 不安全' : ''}
            </div>
          </>
        }
      >
        <SceneBox label="泡菜坛剖面 + 亚硝酸盐含量曲线" heightClass="h-[330px]">
          <div className="flex h-full flex-col gap-2 p-2 lg:flex-row">
            <svg className="h-[190px] w-full shrink-0 lg:h-full lg:w-[200px]" viewBox="0 0 200 260" aria-hidden="true">
              {/* 泡菜坛 */}
              <path d="M70 40 L130 40 L134 66 Q158 78 158 150 Q158 216 100 220 Q42 216 42 150 Q42 78 66 66 Z" fill="#dfe8f0" stroke="#7a9a9e" strokeWidth="3" />
              <rect x="62" y="28" width="76" height="16" rx="6" fill="#c9d8e0" stroke="#7a9a9e" strokeWidth="2" />
              {/* 水封槽 */}
              <rect x="56" y="18" width="88" height="12" rx="4" fill="#bcd8e8" stroke="#7a9a9e" strokeWidth="1.5" />
              <text x="100" y="14" textAnchor="middle" fontSize="9" fill={sealed ? '#2f6b8e' : '#b0483a'} fontWeight="700">
                {sealed ? '水封（无氧）✓' : '未密封 ✗'}
              </text>
              {/* 盐水与菜 */}
              <path d="M70 160 Q100 172 130 160 L126 208 Q100 216 74 208 Z" fill={saltPct >= 4 ? '#e8d9b8' : '#d8ccb8'} />
              {started
                ? [[80, 168, '#8fb86a'], [112, 176, '#c9c98a'], [96, 192, '#8fb86a'], [120, 196, '#c9c98a'], [84, 198, '#b8c98a']].map(([x, y, c], i) => (
                    <rect key={i} x={(x as number) - 9} y={(y as number) - 5} width="18" height="10" rx="3" fill={c as string} stroke="#9a9a5a" strokeWidth="0.8" />
                  ))
                : null}
              {/* 乳酸菌点 */}
              {started && sealed && saltPct >= 4
                ? [[90, 150], [108, 156], [100, 140]].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r="2.8" fill="#7a5a9f" />
                  ))
                : null}
              {!sealed ? <text x="100" y="242" textAnchor="middle" fontSize="9" fill="#b0483a" fontWeight="600">⚠ 缺少无氧环境</text> : null}
            </svg>

            <svg className="h-full min-h-[160px] w-full flex-1" viewBox="0 0 320 260" aria-hidden="true">
              {/* 坐标 */}
              <line x1="46" y1="224" x2="308" y2="224" stroke="#8a9a9f" strokeWidth="1.6" />
              <line x1="46" y1="224" x2="46" y2="30" stroke="#8a9a9f" strokeWidth="1.6" />
              <text x="177" y="248" textAnchor="middle" fontSize="10" fill="#5f7076">
                腌制时间（天）
              </text>
              <text x="20" y="130" fontSize="10" fill="#5f7076" transform="rotate(-90 20 130)">
                亚硝酸盐 (mg/kg)
              </text>
              {[0, 4, 8, 12, 14].map((d) => (
                <text key={d} x={46 + (d / 14) * 250} y="242" textAnchor="middle" fontSize="9" fill="#8a9a9f">
                  {d}
                </text>
              ))}
              {/* 亚硝酸盐理论曲线（灰参考） */}
              <path
                d={Array.from({ length: 29 }, (_, i) => {
                  const t = i / 2;
                  const v = Math.max(0.3, peakVal * Math.exp(-(((t - peakDay) / (peakDay * 0.55)) ** 2)));
                  return `${i === 0 ? 'M' : 'L'}${46 + (t / 14) * 250} ${224 - (v / 10) * 170}`;
                }).join(' ')}
                fill="none"
                stroke="#c9c4b8"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
              {/* 实际进度曲线 */}
              {started && day > 0 ? (
                <path
                  d={Array.from({ length: day + 1 }, (_, k) => {
                    const t = k;
                    const v = k === 0 ? 0 : Math.max(0.3, peakVal * Math.exp(-(((t - peakDay) / (peakDay * 0.55)) ** 2)));
                    return `${k === 0 ? 'M' : 'L'}${46 + (t / 14) * 250} ${224 - (v / 10) * 170}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#b0483a"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              ) : null}
              {/* 安全线 */}
              <line x1="46" y1={224 - (3 / 10) * 170} x2="308" y2={224 - (3 / 10) * 170} stroke="#5f9e6f" strokeWidth="1.5" strokeDasharray="6 4" />
              <text x="300" y={224 - (3 / 10) * 170 - 4} textAnchor="end" fontSize="8.5" fill="#5f9e6f" fontWeight="600">
                安全线
              </text>
              {started ? <circle cx={46 + (day / 14) * 250} cy={224 - (Math.max(0.3, nitrite) / 10) * 170} r="4.5" fill="#b0483a" /> : null}
            </svg>
          </div>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
