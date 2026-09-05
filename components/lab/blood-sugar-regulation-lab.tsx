'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>正常血糖范围 3.9~6.1 mmol/L。血糖升高 → <span className="font-semibold">胰岛素</span>分泌增加（降血糖：促进摄取、利用与储存）；血糖降低 → <span className="font-semibold">胰高血糖素</span>分泌增加（升血糖：促进肝糖原分解等）。</>,
      <>胰岛素与胰高血糖素<span className="font-semibold">拮抗作用</span>共同维持血糖稳态——本模型模拟这一反馈调节过程。</>,
      <>血糖来源：食物中糖类消化吸收、肝糖原分解、非糖物质转化；去路：氧化分解、合成糖原、转化为脂肪等。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>事件：早餐（大量糖类摄入）、运动（消耗葡萄糖）、注射胰岛素。</>,
      <>曲线：血糖浓度随时间变化，绿色阴影带为正常范围（3.9~6.1 mmol/L）。</>,
      <>观察点：偏离后能恢复吗？靠哪种激素？</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 点击事件按钮改变血糖水平，点击「推进 30 min」观察血糖与激素变化。</>,
      <>② 连续推进，观察血糖如何回到正常范围。</>,
      <>③ 尝试不同事件组合，理解拮抗调节的维持机制。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>胰岛素是<span className="font-semibold">唯一降血糖</span>的激素；胰高血糖素升血糖（主要靶器官是肝脏）。</>,
      <>糖尿病模型：胰岛素分泌不足时，进食后血糖居高不下——推演"为什么尿糖试纸会呈阳性"。</>,
    ],
  },
];

/** 事件定义 */
type EventId = 'meal' | 'exercise' | 'insulin';
const EVENTS: Record<EventId, { label: string; delta: number; note: string }> = {
  meal: { label: '早餐（大量糖类）', delta: 3.2, note: '食物中糖类消化吸收 → 血糖快速上升' },
  exercise: { label: '剧烈运动', delta: -1.8, note: '肌肉大量消耗葡萄糖 → 血糖下降' },
  insulin: { label: '注射胰岛素', delta: -2.4, note: '胰岛素促进组织细胞摄取、利用和储存葡萄糖' },
};

/** 时间步长 30min，共 12 步（6h） */
const STEPS = 12;
const NORMAL_LOW = 3.9;
const NORMAL_HIGH = 6.1;

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function BloodSugarRegulationLab() {
  const [history, setHistory] = useState<number[]>([5.0]); // 初始血糖 5.0
  const [insulinLevel, setInsulinLevel] = useState<number[]>([1]);
  const [glucagonLevel, setGlucagonLevel] = useState<number[]>([1]);
  const [events, setEvents] = useState<(EventId | null)[]>([null]);
  const eventsRef = useRef<(EventId | null)[]>([null]);
  useEffect(() => {
    eventsRef.current = events;
  }, [events]);

  const advanced = history.length - 1;

  const stepForward = () => {
    if (advanced >= STEPS) return;
    setHistory((prev) => {
      const next = [...prev];
      const cur = next[next.length - 1];
      // 反馈调节：偏离正常范围越远，激素修正力越强
      let delta = 0;
      if (cur > 5.0) delta = -Math.min(0.9, (cur - 5.0) * 0.55);
      if (cur < 5.0) delta = Math.min(0.9, (5.0 - cur) * 0.55);
      const ev = eventsRef.current[next.length] ?? null;
      if (ev) delta += EVENTS[ev].delta * 0.35;
      next.push(Math.max(2.2, Math.min(11, cur + delta)));
      return next;
    });
    setInsulinLevel((prev) => {
      const cur = history[history.length - 1] ?? 5;
      const next = [...prev, cur > 5.4 ? 2.4 : 0.8];
      return next;
    });
    setGlucagonLevel((prev) => {
      const cur = history[history.length - 1] ?? 5;
      const next = [...prev, cur < 4.6 ? 2.2 : 0.8];
      return next;
    });
    setEvents((prev) => {
      const next = [...prev];
      next[prev.length] = events[prev.length] ?? null;
      return next;
    });
  };

  const addEvent = (id: EventId) => {
    const idx = Math.min(advanced + 1, STEPS);
    setEvents((prev) => {
      const next = [...prev];
      next[idx] = id;
      return next;
    });
    // 同步写入 ref：保证同一轮点击内推进时间即可读到该事件
    eventsRef.current[idx] = id;
  };

  const reset = () => {
    setHistory([5.0]);
    setInsulinLevel([1]);
    setGlucagonLevel([1]);
    setEvents([null]);
    eventsRef.current = [null];
  };

  // 曲线绘制参数
  const W = 320;
  const H = 180;
  const X0 = 46;
  const Y0 = 210;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / STEPS) * W,
    y: Y0 - ((v - 2) / 9) * H,
  });

  const rangeTop = toXY(0, NORMAL_HIGH).y;
  const rangeBottom = toXY(0, NORMAL_LOW).y;
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const current = history[history.length - 1];
  const outOfRange = current > NORMAL_HIGH || current < NORMAL_LOW;

  const observation = (() => {
    if (advanced === 0) return '正常血糖约 5.0 mmol/L（绿色带内）。点击事件按钮（如「早餐」），再推进时间，观察血糖偏离与激素调节恢复。';
    const lastEvent = events[advanced];
    const evNote = lastEvent ? `上一步事件：${EVENTS[lastEvent].label}。` : '';
    if (outOfRange) return `${evNote}当前血糖 ${current.toFixed(1)} mmol/L，超出正常范围——${current > NORMAL_HIGH ? '胰岛素分泌增加，促进血糖去向' : '胰高血糖素分泌增加，促进血糖来源'}。继续推进时间观察恢复。`;
    return `${evNote}当前血糖 ${current.toFixed(1)} mmol/L，已回到正常范围——胰岛素与胰高血糖素的拮抗调节维持了血糖稳态。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">施加事件（可叠加到下一时间点）</p>
              <div className="grid gap-1.5">
                {(Object.keys(EVENTS) as EventId[]).map((id) => (
                  <button key={id} type="button" onClick={() => addEvent(id)} disabled={advanced >= STEPS} className={`${cnChip(false)} w-full text-left disabled:cursor-not-allowed disabled:opacity-40`}>
                    {EVENTS[id].label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              disabled={advanced >= STEPS}
              onClick={stepForward}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              推进 30 min（{advanced}/{STEPS}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置模型
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前血糖：<span className={`text-base font-bold ${outOfRange ? 'text-[#b0483a]' : 'text-[#2f7a4d]'}`}>{current.toFixed(1)}</span> mmol/L
              <br />
              胰岛素分泌：{(insulinLevel[insulinLevel.length - 1] * 50).toFixed(0)}% · 胰高血糖素：{(glucagonLevel[glucagonLevel.length - 1] * 50).toFixed(0)}%
            </div>
          </>
        }
      >
        <SceneBox label="血糖浓度曲线（绿色带 = 正常范围 3.9~6.1 mmol/L）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 正常范围带 */}
            <rect x={X0} y={rangeTop} width={W} height={rangeBottom - rangeTop} fill="#d9efe2" opacity="0.7" />
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 16} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 16} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[3.9, 6.1].map((v) => (
              <text key={v} x={X0 - 6} y={toXY(0, v).y + 3} textAnchor="end" fontSize="8.5" fill="#5f8a5e">
                {v}
              </text>
            ))}
            {[0, 3, 6, 9].map((t) => (
              <text key={t} x={X0 + (t / 6) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                {t * 0.5}h
              </text>
            ))}
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">
              时间
            </text>
            {/* 胰岛素（虚线） */}
            <path d={line(insulinLevel.map((v) => toXY(0, 0).y - v * 26))} fill="none" stroke="#4d7ea8" strokeWidth="2" strokeDasharray="5 4" opacity={advanced ? 0.9 : 0} />
            {/* 血糖曲线 */}
            <path d={line(history)} fill="none" stroke="#b0483a" strokeWidth="3.2" strokeLinecap="round" />
            {history.map((v, i) => (
              <circle key={i} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3.4" fill="#b0483a" />
            ))}
            {/* 事件标记 */}
            {events.map((ev, i) =>
              ev ? (
                <g key={i}>
                  <circle cx={toXY(i, history[i] ?? 5).x} cy={toXY(i, history[i] ?? 5).y} r="5" fill="none" stroke="#8a671b" strokeWidth="2" />
                </g>
              ) : null,
            )}
            {/* 图例 */}
            <g>
              <rect x={X0 + W - 118} y={Y0 - H - 8} width="120" height="42" rx="5" fill="#ffffff" opacity="0.9" />
              <line x1={X0 + W - 108} y1={Y0 + 2} x2={X0 + W - 84} y2={Y0 + 2} stroke="#b0483a" strokeWidth="3" transform={`translate(0 ${Y0 - H - 8})`} />
              <text x={X0 + W - 78} y={Y0 - H - 8 + 5} fontSize="9" fill="#4b6c73" fontWeight="600">血糖</text>
              <line x1={X0 + W - 108} y1={Y0 - H - 8 + 19} x2={X0 + W - 84} y2={Y0 - H - 8 + 19} stroke="#4d7ea8" strokeWidth="2" strokeDasharray="4 3" />
              <text x={X0 + W - 78} y={Y0 - H - 8 + 22} fontSize="9" fill="#4b6c73">胰岛素（相对量）</text>
            </g>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
