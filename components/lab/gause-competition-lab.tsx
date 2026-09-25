'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（高斯竞争排斥实验）',
    lines: [
      <>1934 年，生态学家高斯用两种草履虫做了经典实验：<span className="font-semibold">双小核草履虫</span>与<span className="font-semibold">大草履虫</span>，食物同为细菌。</>
      ,
      <>单独培养时：两种都能稳定增长到环境容纳量（K 值）；<span className="font-semibold">混合培养</span>时：双小核草履虫繁殖更快、竞争力更强，16 天后大草履虫被<span className="font-semibold">竞争排斥</span>而灭绝。</>
      ,
      <>结论：<span className="font-semibold">生态位高度重叠的两个物种，不能长期共存于同一环境</span>——这就是"竞争排斥原理"。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>三种培养：A 单独、B 单独、A+B 混合（食物等条件相同）。</>
      ,
      <>观察点：混合培养中"败者"为何消失？——资源（食物·空间）总量有限，竞争力弱的种群出生率低于死亡率。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>共存的条件：若两物种<span className="font-semibold">生态位分化</span>（如一个吃上层食物、一个吃下层），竞争减弱，可以共存——自然界竞争排斥并不总发生。</>
      ,
      <>与捕食关系对比：捕食者-猎物是"吃与被吃"的<span className="font-semibold">周期波动</span>；竞争是"抢资源"的<span className="font-semibold">此消彼长</span>。</>
      ,
      <>应用：引入天敌防治外来入侵物种时要评估<span className="font-semibold">生态位重叠</span>；作物间作套种正是"错开生态位"的智慧。</>
      ,
    ],
  },
];

type Culture = 'aloneA' | 'aloneB' | 'mixed';

const CULTURES: Record<Culture, { label: string; note: string }> = {
  aloneA: { label: '双小核草履虫单独培养', note: '对照：看 A 的 K 值' },
  aloneB: { label: '大草履虫单独培养', note: '对照：看 B 的 K 值' },
  mixed: { label: 'A + B 混合培养', note: '竞争开始——谁会赢？' },
};

const DAYS = 16;

export function GauseCompetitionLab() {
  const [culture, setCulture] = useState<Culture>('mixed');
  const [a, setA] = useState<number[]>([2]);
  const [b, setB] = useState<number[]>([2]);
  const day = a.length - 1;

  const step = () => {
    if (day >= DAYS) return;
    const K = 90;
    const av = a[a.length - 1];
    const bv = b[b.length - 1];
    // A（双小核）：增长快、K 高
    const na = culture === 'aloneB' ? 0 : Math.max(0, av + 0.9 * av * (1 - av / K) - (culture === 'mixed' ? 0.18 * av * (bv / (bv + 8)) : 0));
    // B（大草履虫）：增长慢、K 低；混合时受 A 挤压
    const nb = culture === 'aloneA' ? 0 : Math.max(0, bv + 0.65 * bv * (1 - bv / 60) - (culture === 'mixed' ? 1.2 * bv * (av / (av + 6)) : 0));
    setA((prev) => [...prev, na]);
    setB((prev) => [...prev, nb]);
  };

  const reset = () => {
    setA([2]);
    setB([2]);
  };

  const W = 310;
  const H = 130;
  const X0 = 50;
  const Y0 = 204;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / DAYS) * W,
    y: Y0 - (v / 100) * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const curA = a[a.length - 1];
  const curB = b[b.length - 1];

  const observation = (() => {
    if (day === 0)
      return '两支试管装着同样的培养液（细菌为食）：双小核草履虫（A，竞争力强）与大草履虫（B，竞争力弱）。选择培养方式，按天推进 16 天，观察种群的命运。';
    if (culture === 'aloneA')
      return `第 ${day} 天：A 单独培养，数量增长到 ${curA.toFixed(0)} 个/mL 后趋于稳定（K 值约 90）——S 形增长，食物充足时它过得很好。`;
    if (culture === 'aloneB')
      return `第 ${day} 天：B 单独培养，数量稳定在 ${curB.toFixed(0)} 个/mL（K 值约 60）——它竞争弱，但"独居"时照样活得好好的。`;
    return curB < 0.5
      ? `第 ${day} 天：大草履虫已经消失（竞争排斥）！双小核草履虫占领了全部资源。两种生态位高度重叠的物种，无法在同一环境长期共存。`
      : `第 ${day} 天：混合培养中 A 升到 ${curA.toFixed(0)}，B 被压到 ${curB.toFixed(0)} 并持续下滑——A 抢食更快，B 的出生率已经低于死亡率。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择培养方式</p>
              <div className="grid gap-1.5">
                {(Object.keys(CULTURES) as Culture[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCulture(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      culture === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {CULTURES[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {CULTURES[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={day >= DAYS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进一天（{day}/{DAYS}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新接种
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              A {curA.toFixed(0)} 个/mL · B {curB.toFixed(0)} 个/mL
            </div>
          </>
        }
      >
        <SceneBox label={`草履虫种群动态（${CULTURES[culture].label}）`} heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* K 线 */}
            <line x1={X0} y1={toXY(0, 90).y} x2={X0 + W + 12} y2={toXY(0, 90).y} stroke="#8a9a9f" strokeWidth="1.2" strokeDasharray="5 4" />
            <text x={X0 + W + 14} y={toXY(0, 90).y + 4} fontSize="9" fill="#799398">K≈90</text>
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 12} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 4, 8, 12, 16].map((t) => (
              <text key={t} x={X0 + (t / DAYS) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{t}天
              </text>
            ))}
            {/* A 曲线 */}
            {curA > 0 || a.length > 1 ? (
              <>
                <path d={line(a)} fill="none" stroke="#3f7f3a" strokeWidth="3" strokeLinecap="round" />
                {a.map((v, i) => (
                  <circle key={`a${i}`} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3" fill="#3f7f3a" />
                ))}
              </>
            ) : null}
            {/* B 曲线 */}
            {b.length > 1 ? (
              <>
                <path d={line(b)} fill="none" stroke="#4d7ea8" strokeWidth="2.8" strokeDasharray="6 4" />
                {b.map((v, i) => (
                  <circle key={`b${i}`} cx={toXY(i, v).x} cy={toXY(i, v).y} r="2.8" fill="#4d7ea8" />
                ))}
              </>
            ) : null}
            {/* 图例 */}
            <g>
              <line x1={X0 + 8} y1={Y0 - H - 2} x2={X0 + 30} y2={Y0 - H - 2} stroke="#3f7f3a" strokeWidth="3" />
              <text x={X0 + 36} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73" fontWeight="600">A 双小核草履虫</text>
              <line x1={X0 + 176} y1={Y0 - H - 2} x2={X0 + 198} y2={Y0 - H - 2} stroke="#4d7ea8" strokeWidth="2.8" strokeDasharray="6 4" />
              <text x={X0 + 204} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73">B 大草履虫</text>
            </g>
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">时间（天）</text>
            <text x="428" y="286" textAnchor="end" fontSize="9.5" fill="#799398">竞争排斥原理：生态位重叠→不能长期共存</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
