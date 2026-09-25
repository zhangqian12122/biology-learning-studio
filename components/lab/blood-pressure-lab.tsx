'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（血压的调节）',
    lines: [
      <>血压 = <span className="font-semibold">心输出量 × 外周阻力</span>。凡能改变心率、心肌收缩力或血管口径的因素都会影响血压。</>
      ,
      <>血压正常范围：收缩压 <span className="font-semibold">90~139 mmHg</span>、舒张压 60~89 mmHg。血压稳定是内环境稳态的重要内容。</>
      ,
      <>神经调节：交感神经兴奋 → 心跳加快、血管收缩（升压）；副交感神经兴奋 → 心跳减慢（降压）。体液调节：肾上腺素升压；血管紧张素Ⅱ强效升压；NO 等舒血管物质降压。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>事件：剧烈运动（心输出量大幅增加）、紧张焦虑（交感兴奋·血管收缩）、失血 400 mL（血容量下降）、休息（撤除干扰，调节系统修复）。</>
      ,
      <>曲线：收缩压随时间变化，绿色阴影带为正常范围；同时显示心率。</>
      ,
      <>观察点：偏离后靠什么机制回到正常？——压力感受器（颈动脉窦·主动脉弓）反射是快速"减压反射"。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>血压的稳态同样是"<span className="font-semibold">来源与去路</span>"的动态平衡：心脏泵血是来源，血管外周阻力与血液回流是去路。</>
      ,
      <>高血压的两大成因：<span className="font-semibold">心输出量增加</span>（如剧烈运动后属正常生理）或<span className="font-semibold">外周阻力持续增高</span>（小动脉硬化变窄——病理状态）。</>
      ,
      <>失血时先"保血压"：外周血管收缩优先保证心脑供血——这是负反馈调节优先级的经典例子。</>
      ,
    ],
  },
];

type EventId = 'exercise' | 'stress' | 'bleed' | 'rest' | 'drug';

const EVENTS: Record<EventId, { label: string; note: string; sys: number; hr: number }> = {
  exercise: { label: '剧烈运动', note: '心输出量大幅增加 → 收缩压升高', sys: 28, hr: 42 },
  stress: { label: '紧张焦虑', note: '交感兴奋·血管收缩 → 升压', sys: 16, hr: 18 },
  bleed: { label: '失血 400 mL', note: '血容量骤降 → 血压先降，反射性心率加快', sys: -22, hr: 26 },
  rest: { label: '安静休息', note: '撤除干扰，压力感受器反射逐步纠偏', sys: 0, hr: -14 },
  drug: { label: '降压药物', note: '舒张血管·降低外周阻力', sys: -14, hr: -4 },
};

const STEPS = 12;
const NORMAL_LOW = 90;
const NORMAL_HIGH = 139;

export function BloodPressureLab() {
  const [history, setHistory] = useState<number[]>([118]);
  const [hrHistory, setHrHistory] = useState<number[]>([70]);
  const [events, setEvents] = useState<(EventId | null)[]>([null]);
  const advanced = history.length - 1;

  const addEvent = (id: EventId) => {
    const idx = Math.min(advanced + 1, STEPS);
    setEvents((prev) => {
      const next = [...prev];
      next[idx] = id;
      return next;
    });
  };

  const step = () => {
    if (advanced >= STEPS) return;
    setHistory((prev) => {
      const next = [...prev];
      const cur = next[next.length - 1];
      // 负反馈调节：偏离正常中值越远，纠偏力越强
      let delta = 0;
      if (cur > 118) delta = -Math.min(9, (cur - 118) * 0.42);
      if (cur < 118) delta = Math.min(9, (118 - cur) * 0.42);
      const ev = events[next.length] ?? null;
      if (ev && ev !== 'rest') delta += EVENTS[ev].sys * 0.5;
      next.push(Math.max(55, Math.min(185, cur + delta)));
      return next;
    });
    setHrHistory((prev) => {
      const cur = prev[prev.length - 1] ?? 70;
      const ev = events[prev.length] ?? null;
      const target = ev ? 70 + EVENTS[ev].hr : 70;
      return [...prev, Math.round(cur + (target - cur) * 0.55)];
    });
  };

  const reset = () => {
    setHistory([118]);
    setHrHistory([70]);
    setEvents([null]);
  };

  const W = 300;
  const H = 170;
  const X0 = 48;
  const Y0 = 226;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / STEPS) * W,
    y: Y0 - ((v - 50) / 140) * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const cur = history[history.length - 1];
  const curHr = hrHistory[hrHistory.length - 1];
  const outOfRange = cur > NORMAL_HIGH || cur < NORMAL_LOW;

  const observation = (() => {
    if (advanced === 0)
      return '安静状态收缩压约 118 mmHg、心率 70 次/分（绿色带内）。施加事件（如剧烈运动），再推进时间，观察血压偏离后如何被调节回来。';
    const lastEvent = events[advanced];
    const evNote = lastEvent ? `上一步事件：${EVENTS[lastEvent].label}。` : '';
    if (outOfRange)
      return `${evNote}当前收缩压 ${cur.toFixed(0)} mmHg，超出正常范围——${cur > NORMAL_HIGH ? '压力感受器反射正在减弱心搏、舒张血管（减压反射）' : '机体正在收缩外周血管、加快心率以维持血压'}。继续推进观察恢复。`;
    return `${evNote}当前收缩压 ${cur.toFixed(0)} mmHg、心率 ${curHr} 次/分，已回到正常范围——神经与体液的负反馈调节维持了血压稳态。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">施加事件（叠加到下一时间点）</p>
              <div className="grid gap-1.5">
                {(Object.keys(EVENTS) as EventId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => addEvent(id)}
                    disabled={advanced >= STEPS}
                    className="min-h-10 rounded-md border border-[#d9e7e7] bg-white px-3 text-left text-xs font-semibold text-[#537078] transition-colors hover:border-[#b6d9d6] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {EVENTS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {EVENTS[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              disabled={advanced >= STEPS}
              onClick={step}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              推进 10 min（{advanced}/{STEPS}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置模型
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              收缩压 <span className={`text-base font-bold ${outOfRange ? 'text-[#b0483a]' : 'text-[#2f7a4d]'}`}>{cur.toFixed(0)}</span> mmHg · 心率 {curHr} 次/分
            </div>
          </>
        }
      >
        <SceneBox label="收缩压动态曲线（绿色带 = 正常范围 90~139 mmHg）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 正常范围带 */}
            <rect x={X0} y={toXY(0, NORMAL_HIGH).y} width={W} height={toXY(0, NORMAL_LOW).y - toXY(0, NORMAL_HIGH).y} fill="#d9efe2" opacity="0.7" />
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 14} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[60, 90, 120, 150, 180].map((v) => (
              <text key={v} x={X0 - 6} y={toXY(0, v).y + 3} textAnchor="end" fontSize="8.5" fill="#8a9a9f">
                {v}
              </text>
            ))}
            {[0, 4, 8, 12].map((t) => (
              <text key={t} x={X0 + (t / STEPS) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                {t * 10}min
              </text>
            ))}
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">时间</text>
            {/* 血压曲线 */}
            <path d={line(history)} fill="none" stroke="#b0483a" strokeWidth="3.2" strokeLinecap="round" />
            {history.map((v, i) => (
              <circle key={i} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3.2" fill="#b0483a" />
            ))}
            {/* 事件标记 */}
            {events.map((ev, i) =>
              ev ? <circle key={`e${i}`} cx={toXY(i, history[i] ?? 118).x} cy={toXY(i, history[i] ?? 118).y} r="5" fill="none" stroke="#8a671b" strokeWidth="2" /> : null,
            )}
            {/* 图例 */}
            <g>
              <rect x={X0 + W - 96} y={Y0 - H - 4} width="98" height="40" rx="5" fill="#ffffff" opacity="0.9" />
              <line x1={X0 + W - 88} y1={Y0 - H + 8} x2={X0 + W - 64} y2={Y0 - H + 8} stroke="#b0483a" strokeWidth="3" />
              <text x={X0 + W - 58} y={Y0 - H + 11} fontSize="9" fill="#4b6c73" fontWeight="600">收缩压</text>
              <circle cx={X0 + W - 76} cy={Y0 - H + 25} r="3.4" fill="none" stroke="#8a671b" strokeWidth="2" />
              <text x={X0 + W - 58} y={Y0 - H + 28} fontSize="9" fill="#4b6c73">事件标记</text>
            </g>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
