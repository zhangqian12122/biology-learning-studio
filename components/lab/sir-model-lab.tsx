'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（课外拓展 · SIR 模型）',
    lines: [
      <>传染病传播的经典模型：<span className="font-semibold">S（易感者）→ I（感染者）→ R（康复者）</span>。传染率 β 决定"传得多快"，康复率 γ 决定"好得多快"。</>,
      <>两个决定性参数：β 越大传播越快；γ 越小康复越慢。当康复速度追上传染速度，感染人数开始下降——这就是"拐点"。</>,
      <>对应到现实：戴口罩、隔离是在压低 β；疫苗、药物是在提高 γ 或直接减少 S。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>传染性滑块（β 的相对值）；三项干预措施开关：戴口罩（β↓40%）、居家隔离（β↓30%）、接种疫苗（30% 的人直接免疫）。</>,
      <>每天推进一步，观察三条曲线（易感 / 感染 / 康复）与感染峰值。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 不做任何干预，推进到底，记下感染峰值与出现的"天"。</>,
      <>② 打开全部三项干预再推一遍，对比峰值差多少。</>,
      <>③ 思考：为什么"压平曲线"很重要（医疗资源有限）？</>,
    ],
  },
  {
    title: '注意事项·考点（课外拓展）',
    lines: [
      <>疫情结束不是"病毒消失"，而是<span className="font-semibold">易感者不足</span>或康复/免疫者足够多，R 值降到 1 以下。</>,
      <>这就是选必 1"免疫调节"的现实意义：疫苗让大量易感者提前变成"免疫者"，保护没有得到疫苗的人（群体免疫）。</>,
      <>模型是简化的：真实传播还有潜伏期、再感染等，但核心机制相同。</>,
    ],
  },
];

const N = 1000;

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function SirModelLab() {
  const [betaBase, setBetaBase] = useState(50);
  const [mask, setMask] = useState(false);
  const [isolate, setIsolate] = useState(false);
  const [vaccine, setVaccine] = useState(false);
  const [day, setDay] = useState(0);
  const [curve, setCurve] = useState<{ s: number; i: number; r: number }[]>([{ s: N, i: 1, r: 0 }]);

  const beta = (betaBase / 100) * 0.5 * (mask ? 0.6 : 1) * (isolate ? 0.7 : 1);
  const gamma = 0.15;
  const vaccinated = vaccine ? Math.round(N * 0.3) : 0;

  const advance = (days: number) => {
    const next = [...curve];
    let cur = next[next.length - 1];
    for (let d = 0; d < days; d++) {
      const s = cur.s;
      const i = cur.i;
      const r = cur.r;
      const newInfected = Math.min(s, beta * (s / N) * i);
      const newRecovered = Math.min(i, gamma * i);
      cur = {
        s: Math.max(0, s - newInfected),
        i: Math.max(0, i + newInfected - newRecovered),
        r: Math.min(N, r + newRecovered),
      };
      next.push(cur);
    }
    setCurve(next);
    setDay((d) => Math.min(60, d + days));
  };

  const reset = () => {
    const start = { s: N - 1 - vaccinated, i: 1, r: vaccinated };
    setCurve([start]);
    setDay(0);
  };

  const last = curve[curve.length - 1];
  const peak = Math.max(...curve.map((c) => c.i));
  const peakDay = curve.findIndex((c) => c.i === peak);
  const finished = last.i < 0.5;

  const toXY = (idx: number, v: number) => ({
    x: 50 + (idx / 60) * 360,
    y: 250 - (v / N) * 200,
  });
  const path = (key: 's' | 'i' | 'r') =>
    curve.map((c, idx) => `${idx === 0 ? 'M' : 'L'}${toXY(idx, c[key]).x.toFixed(1)} ${toXY(idx, c[key]).y.toFixed(1)}`).join(' ');

  const observation = (() => {
    if (day === 0) return '1 个感染者进入了 1000 人的群体。先不做任何干预，推进 60 天看看会发生什么。';
    if (!finished) {
      const maskNote = mask || isolate || vaccine ? '干预已开启：' : '';
      return `${maskNote}第 ${day} 天：易感 ${Math.round(last.s)} · 感染 ${Math.round(last.i)} · 康复 ${Math.round(last.r)}。感染人数${
        curve.length >= 2 && last.i <= curve[curve.length - 2].i ? '开始下降（拐点已过）' : '仍在上升'
      }。`;
    }
    const saved = mask || isolate || vaccine ? '有干预的曲线峰值明显更低、出现更晚——"压平曲线"给医疗系统留出了缓冲。' : '无干预：大部分人在短期内同时感染——现实中医疗资源会被击穿。';
    return `疫情结束：感染峰值 ${Math.round(peak)} 人（第 ${peakDay} 天），${Math.round(last.r)} 人康复免疫。${saved}`;
  })();

  const toggle = (key: 'mask' | 'isolate' | 'vaccine', setter: (v: boolean) => void, cur: boolean) => {
    setter(!cur);
    reset();
    void key;
  };

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">传染性（β）</p>
              <input
                type="range"
                min={20}
                max={90}
                value={betaBase}
                onChange={(e) => { setBetaBase(Number(e.target.value)); reset(); }}
                className="w-full"
                aria-label="传染性"
              />
              <div className="flex justify-between text-[11px] text-[#799398]">
                <span>较低</span>
                <span>{betaBase}%</span>
                <span>较高</span>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">干预措施（改变任一项会重置）</p>
              <div className="grid gap-1.5">
                <button type="button" onClick={() => toggle('mask', setMask, mask)} aria-pressed={mask} className={`${cnChip(mask)} w-full text-left`}>
                  😷 戴口罩（传染率 −40%）
                </button>
                <button type="button" onClick={() => toggle('isolate', setIsolate, isolate)} aria-pressed={isolate} className={`${cnChip(isolate)} w-full text-left`}>
                  🏠 居家隔离（接触 −30%）
                </button>
                <button type="button" onClick={() => toggle('vaccine', setVaccine, vaccine)} aria-pressed={vaccine} className={`${cnChip(vaccine)} w-full text-left`}>
                  💉 疫苗接种（30% 免疫）
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => advance(10)}
              disabled={day >= 60 || finished}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              推进 10 天（第 {day} 天 / 60 天）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新模拟
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              感染峰值：<span className="font-bold text-[#b0483a]">{Math.round(peak)}</span> 人（第 {peakDay} 天）
              <br />
              当前：易感 {Math.round(last.s)} · 感染 {Math.round(last.i)} · 康复 {Math.round(last.r)}
            </div>
          </>
        }
      >
        <SceneBox label="S-I-R 传播曲线（1000 人群体 · 课外拓展模拟）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 轴 */}
            <line x1="50" y1="250" x2="414" y2="250" stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1="50" y1="250" x2="50" y2="30" stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 20, 40, 60].map((t) => (
              <text key={t} x={50 + (t / 60) * 360} y="266" textAnchor="middle" fontSize="12" fill="#8a9a9f">
                {t} 天
              </text>
            ))}
            {[0, 500, 1000].map((v) => (
              <text key={v} x="44" y={250 - (v / N) * 200 + 4} textAnchor="end" fontSize="11" fill="#8a9a9f">
                {v}
              </text>
            ))}
            {/* 曲线 */}
            <path d={path('s')} fill="none" stroke="#3d7e9e" strokeWidth="3" strokeLinecap="round" />
            <path d={path('i')} fill="none" stroke="#b0483a" strokeWidth="3.5" strokeLinecap="round" />
            <path d={path('r')} fill="none" stroke="#2f7a4d" strokeWidth="3" strokeLinecap="round" />
            {/* 图例 */}
            <g>
              <line x1="150" y1="42" x2="174" y2="42" stroke="#3d7e9e" strokeWidth="3" />
              <text x="180" y="46" fontSize="12.5" fill="#3d7e9e" fontWeight="600">易感 S</text>
              <line x1="240" y1="42" x2="264" y2="42" stroke="#b0483a" strokeWidth="3.5" />
              <text x="270" y="46" fontSize="12.5" fill="#b0483a" fontWeight="600">感染 I</text>
              <line x1="330" y1="42" x2="354" y2="42" stroke="#2f7a4d" strokeWidth="3" />
              <text x="360" y="46" fontSize="12.5" fill="#2f7a4d" fontWeight="600">康复 R</text>
            </g>
            <text x="220" y="288" textAnchor="middle" fontSize="12.5" fill="#59767c" fontWeight="600">
              干预：{[mask ? '戴口罩' : null, isolate ? '隔离' : null, vaccine ? '疫苗' : null].filter(Boolean).join(' + ') || '无'}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
