'use client';

import { useMemo, useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>酵母菌是兼性厌氧菌，在培养液中繁殖的数量随时间呈<span className="font-semibold">S 型曲线</span>：调整期 → 对数期 → 稳定期 → 衰亡期。</>,
      <>用<span className="font-semibold">血球计数板</span>抽样计数：每 24h 取样一次，稀释后数计数室中酵母菌数量，换算出培养液浓度。</>,
      <>空间和营养有限，种群数量不可能无限增长——达到 K 值（环境容纳量）后趋于稳定。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：酵母菌培养液、无菌水。</>,
      <>用具：血球计数板、盖玻片、滴管、锥形瓶、恒温培养箱、显微镜。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 每天同一时间取样，摇匀培养液后用滴管取样。</>,
      <>② 滴入血球计数板计数室，静置片刻待酵母菌沉降。</>,
      <>③ 显微镜下统计计数室（25 中格）中的酵母菌数量，重复计数取平均值。</>,
      <>④ 连续观察 7 天，绘制种群数量变化曲线。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>取样前要把培养液<span className="font-semibold">摇匀</span>，否则酵母菌沉底导致计数偏少。</>,
      <>计数从 day1 开始（7 天内大多数处于稳定期后进入衰亡期——营养消耗、有害物质积累）。</>,
      <>压在计数室边线上的酵母菌：同"样方法"，只计相邻两边及其顶角。</>,
      <>S 型曲线的四段：调整期、对数期、稳定期（K 值）、衰亡期。</>,
    ],
  },
];

/** 7 天种群数据（每 mL 数量，万） */
const DAYS = [1, 2, 3, 4, 5, 6, 7];
const POP = [12, 46, 130, 240, 320, 350, 332];
const K = 340;

/** 计数板：25 中格（5×5），每天酵母菌点阵 */
function CountingBoard({ day }: { day: number }) {
  const cells = useMemo(() => {
    const rndBase = day * 7919;
    const rnd = (k: number) => {
      let x = Math.sin(rndBase + k * 12.9898) * 43758.5453;
      x -= Math.floor(x);
      return x;
    };
    const density = Math.min(1, POP[day - 1] / K + 0.05);
    return Array.from({ length: 25 }, (_, gi) => {
      const gx = (gi % 5) * 46 + 12;
      const gy = Math.floor(gi / 5) * 46 + 12;
      const dots = Array.from({ length: Math.max(1, Math.round(density * 9 + rnd(gi) * 2)) }, (_, k) => ({
        x: gx + 4 + rnd(gi * 31 + k) * 30,
        y: gy + 4 + rnd(gi * 57 + k) * 30,
      }));
      return { gx, gy, dots };
    });
  }, [day]);

  return (
    <svg viewBox="0 0 260 260" className="h-full w-full">
      <rect x="8" y="8" width="244" height="244" fill="#f8f6ee" stroke="#b8a86a" strokeWidth="2.5" />
      {[1, 2, 3, 4].map((i) => (
        <g key={i}>
          <line x1={8 + i * 48.8} y1="8" x2={8 + i * 48.8} y2="252" stroke="#b8a86a" strokeWidth="1.2" />
          <line x1="8" y1={8 + i * 48.8} x2="252" y2={8 + i * 48.8} stroke="#b8a86a" strokeWidth="1.2" />
        </g>
      ))}
      {cells.map((c, gi) => (
        <g key={gi}>
          <rect x={c.gx - 2} y={c.gy - 2} width="40" height="40" fill="none" stroke="#d8c98a" strokeWidth="0.8" />
          {c.dots.map((d, k) => (
            <circle key={k} cx={d.x} cy={d.y} r="2.6" fill="#b5903a" opacity="0.85" />
          ))}
        </g>
      ))}
      <text x="130" y="250" textAnchor="middle" fontSize="8.5" fill="#8a7a4a">
        计数室 25 中格（示意）
      </text>
    </svg>
  );
}

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function YeastPopulationLab() {
  const [step, setStep] = useState(0); // 已观察的天数 1..7
  const day = step; // 当前观察到的天数
  const guideDone = step >= 7;

  const popNow = step > 0 ? POP[step - 1] : 0;
  const observation = !step
    ? '点击「第 1 天取样计数」开始。每天记录一次培养液中酵母菌数量。'
    : step <= 2
      ? `第 ${day} 天：${popNow} 万/mL。数量少、增长慢——调整期。`
      : step <= 3
        ? `第 ${day} 天：${popNow} 万/mL。对数期：营养与空间充足，数量快速上升。`
        : step <= 5
          ? `第 ${day} 天：${popNow} 万/mL。增长放缓——K 值（环境容纳量）约 340 万/mL。`
          : `第 ${day} 天：${popNow} 万/mL。稳定期：数量在 K 值附近波动；若继续培养，营养耗尽将进入衰亡期。`;

  // S 型曲线（SVG 折线）
  const W = 300;
  const H = 200;
  const X0 = 50;
  const Y0 = 240;
  const pt = (d: number, v: number) => ({
    x: X0 + ((d - 1) / 6) * W,
    y: Y0 - (v / 400) * H,
  });
  const curve = DAYS.slice(0, Math.max(1, step))
    .map((d, i) => `${i === 0 ? 'M' : 'L'}${pt(d, POP[d - 1]).x.toFixed(1)} ${pt(d, POP[d - 1]).y.toFixed(1)}`)
    .join(' ');

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>


            <div className="grid grid-cols-2 gap-1.5">
              {DAYS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setStep(d)}
                  aria-pressed={step === d}
                  className={`${cnChip(step === d)} ${
                    d > step ? 'opacity-50' : ''
                  }`}
                >
                  第 {d} 天
                </button>
              ))}
            </div>

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前读数：第 {step || '—'} 天 · {step ? `${popNow} 万/mL` : '未取样'} · K 值 ≈ 340 万/mL
            </div>
          </>
        }
      >
        <SceneBox label="种群数量曲线（S 型）＋ 当天计数板" heightClass="h-[340px]">
          <div className="flex h-full flex-col gap-2 p-2 sm:flex-row">
            <svg className="h-[200px] w-full flex-1 sm:h-full" viewBox="0 0 380 280" aria-hidden="true">
              {/* 坐标轴 */}
              <line x1={X0} y1={Y0} x2={X0 + W + 20} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
              <line x1={X0} y1={Y0} x2={X0} y2={Y0 - H - 20} stroke="#8a9a9f" strokeWidth="1.6" />
              <text x={X0 + W / 2} y={Y0 + 24} textAnchor="middle" fontSize="10" fill="#5f7076">
                时间（天）
              </text>
              <text x="16" y={Y0 - H / 2} fontSize="10" fill="#5f7076" transform={`rotate(-90 16 ${Y0 - H / 2})`}>
                数量（万/mL）
              </text>
              {/* K 值虚线 */}
              <line x1={X0} y1={Y0 - (K / 400) * H} x2={X0 + W + 20} y2={Y0 - (K / 400) * H} stroke="#b0483a" strokeWidth="1.5" strokeDasharray="6 4" />
              <text x={X0 + W + 16} y={Y0 - (K / 400) * H + 4} fontSize="9" fill="#b0483a" fontWeight="700">
                K
              </text>
              {/* 天刻度 */}
              {DAYS.map((d) => (
                <g key={d}>
                  <circle cx={pt(d, POP[d - 1]).x} cy={Y0} r="2" fill="#8a9a9f" />
                  <text x={pt(d, POP[d - 1]).x} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                    {d}
                  </text>
                </g>
              ))}
              {/* 曲线（已观察部分） */}
              {step > 0 ? <path d={curve} fill="none" stroke="#0e6f75" strokeWidth="3.2" strokeLinecap="round" /> : null}
              {step > 0 ? <circle cx={pt(step, POP[step - 1]).x} cy={pt(step, POP[step - 1]).y} r="5" fill="#0e6f75" /> : null}
            </svg>
            <div className="h-[200px] w-[200px] shrink-0 self-center sm:h-full">
              <CountingBoard day={Math.max(1, step)} />
            </div>
          </div>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
