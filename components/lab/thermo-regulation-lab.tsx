'use client';

import { useEffect, useRef, useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>人的体温恒定是<span className="font-semibold">产热与散热动态平衡</span>的结果：寒冷时皮肤血管收缩、骨骼肌战栗、甲状腺激素与肾上腺素分泌增加以增加产热；炎热时汗腺分泌汗液、皮肤血管舒张以增加散热。</>,
      <>调节中枢位于<span className="font-semibold">下丘脑</span>：温度感受器传入信号 → 下丘脑体温调节中枢 → 传出神经与激素作用于效应器。</>,
      <>稳态是<span className="font-semibold">相对的、有限度的</span>：环境极端时调节能力不足以维持体温恒定（如失温症）。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>环境档位：严寒 -12°C、寒冷 4°C、凉爽 16°C、舒适 24°C、炎热 36°C，从下一个时间点开始生效。</>,
      <>曲线：体温（°C）随时间变化，绿色阴影带为正常范围（36.5~37.5°C）。</>,
      <>观察点：换环境后体温如何被拉回？身体用了哪些"手段"？</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 选一个环境档位，点击「推进 30 min」逐步观察体温曲线与身体响应。</>,
      <>② 先进「寒冷」再切「炎热」，观察产热手段切换为散热手段。</>,
      <>③ 试试「严寒 -12°C」长时间暴露，观察调节能力的极限。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>寒冷刺激下<span className="font-semibold">骨骼肌战栗</span>是快速产热方式；<span className="font-semibold">甲状腺激素分级调节</span>是持续产热来源。</>,
      <>炎热时<span className="font-semibold">汗液蒸发散热</span>是主要手段——空气湿度大时蒸发变慢，"桑拿天"更难受。</>,
      <>发烧≠体温调节失效：致热原改变了下丘脑的"调定点"，体温在新的调定点下依然被精确调节。</>,
    ],
  },
];

/** 环境档位定义 */
type EnvId = 'severe' | 'cold' | 'cool' | 'comfy' | 'hot';
const ENVS: Record<EnvId, { label: string; temp: number; balance: number; note: string }> = {
  severe: { label: '严寒 -12°C', temp: -12, balance: 35.2, note: '长时间严寒暴露：战栗产热已不足以抵消失热，体温缓慢下降（调节能力的极限）' },
  cold: { label: '寒冷 4°C', temp: 4, balance: 36.4, note: '寒冷环境：皮肤血管收缩减少散热，骨骼肌战栗与甲状腺激素增加产热' },
  cool: { label: '凉爽 16°C', temp: 16, balance: 36.9, note: '凉爽环境：轻微血管收缩即可维持体温' },
  comfy: { label: '舒适 24°C', temp: 24, balance: 37.0, note: '舒适温度：产热与散热自然平衡，无明显调节动作' },
  hot: { label: '炎热 36°C', temp: 36, balance: 37.7, note: '炎热环境：汗腺大量分泌汗液蒸发散热，皮肤血管舒张' },
};

/** 时间步长 30min，共 12 步（6h） */
const STEPS = 12;
const NORMAL_LOW = 36.5;
const NORMAL_HIGH = 37.5;

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

/** 根据当前环境给出四项生理响应的文字 */
function responses(env: EnvId | null): { label: string; on: boolean }[] {
  if (env === null) {
    return [
      { label: '皮肤血管：自然口径', on: false },
      { label: '汗腺：静止', on: false },
      { label: '骨骼肌：静止', on: false },
      { label: '甲状腺激素：基础水平', on: false },
    ];
  }
  if (env === 'severe' || env === 'cold') {
    return [
      { label: env === 'severe' ? '皮肤血管：极度收缩' : '皮肤血管：收缩', on: true },
      { label: '汗腺：抑制（无汗）', on: false },
      { label: env === 'severe' ? '骨骼肌：持续战栗' : '骨骼肌：战栗', on: true },
      { label: '甲状腺激素：分泌↑', on: true },
    ];
  }
  if (env === 'cool') {
    return [
      { label: '皮肤血管：轻度收缩', on: true },
      { label: '汗腺：静止', on: false },
      { label: '骨骼肌：静止', on: false },
      { label: '甲状腺激素：基础水平', on: false },
    ];
  }
  if (env === 'comfy') {
    return [
      { label: '皮肤血管：自然口径', on: false },
      { label: '汗腺：静止', on: false },
      { label: '骨骼肌：静止', on: false },
      { label: '甲状腺激素：基础水平', on: false },
    ];
  }
  return [
    { label: '皮肤血管：舒张（潮红）', on: true },
    { label: '汗腺：大量分泌汗液', on: true },
    { label: '骨骼肌：静止', on: false },
    { label: '甲状腺激素：基础水平', on: false },
  ];
}

export function ThermoRegulationLab() {
  const [history, setHistory] = useState<number[]>([37.0]);
  const [envs, setEnvs] = useState<(EnvId | null)[]>([null]);
  const envsRef = useRef<(EnvId | null)[]>([null]);
  useEffect(() => {
    envsRef.current = envs;
  }, [envs]);

  const advanced = history.length - 1;

  const stepForward = () => {
    if (advanced >= STEPS) return;
    setHistory((prev) => {
      const next = [...prev];
      const cur = next[next.length - 1];
      const env = envsRef.current[next.length] ?? envsRef.current[Math.max(0, next.length - 1)];
      const balance = env ? ENVS[env].balance : 37.0;
      // 身体调节：向该环境的平衡点靠拢（调节速度有限）
      const delta = (balance - cur) * 0.45;
      next.push(Math.max(34.6, Math.min(38.4, cur + delta)));
      return next;
    });
    setEnvs((prev) => {
      const next = [...prev];
      next[prev.length] = envs[prev.length] ?? null;
      return next;
    });
  };

  const setEnv = (id: EnvId) => {
    const idx = Math.min(advanced + 1, STEPS);
    setEnvs((prev) => {
      const next = [...prev];
      next[idx] = id;
      return next;
    });
    envsRef.current[idx] = id;
  };

  const reset = () => {
    setHistory([37.0]);
    setEnvs([null]);
    envsRef.current = [null];
  };

  // 曲线绘制参数
  const W = 320;
  const H = 170;
  const X0 = 46;
  const Y0 = 208;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / STEPS) * W,
    y: Y0 - ((v - 34.5) / 4.5) * H,
  });

  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const current = history[history.length - 1];
  // 当前生效环境：advanced 及其之前最近一次设置的档位（环境会持续生效，直到换档）
  const activeEnv = (() => {
    for (let i = Math.min(advanced, envs.length - 1); i >= 0; i--) {
      if (envs[i]) return envs[i];
    }
    return null;
  })();
  const outOfRange = current > NORMAL_HIGH || current < NORMAL_LOW;
  const resp = responses(activeEnv);

  const observation = (() => {
    if (advanced === 0) return '体温 37.0°C，处于正常范围（绿色带内）。选择一个环境档位（如「寒冷 4°C」），再推进时间，观察体温与身体响应的变化。';
    const env = activeEnv ? ENVS[activeEnv] : null;
    const envNote = env ? `当前环境：${env.label}。` : '';
    if (activeEnv === 'severe' && current < NORMAL_LOW) {
      return `${envNote}体温 ${current.toFixed(1)}°C，已跌破正常下限——战栗产热仍不足以抵消失热，这就是"稳态是相对的、调节能力是有限的"的直接证据。`;
    }
    if (outOfRange) {
      return `${envNote}体温 ${current.toFixed(1)}°C，偏离正常范围——身体正在全力响应（见右侧响应清单），继续推进时间观察恢复。`;
    }
    return `${envNote}体温 ${current.toFixed(1)}°C，在正常范围内——产热与散热的动态平衡维持了体温稳态。${env && env.temp !== 24 ? '注意体温只轻微偏移：调节系统在持续工作。' : ''}`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">环境温度档位（下一步生效）</p>
              <div className="grid gap-1.5">
                {(Object.keys(ENVS) as EnvId[]).map((id) => (
                  <button key={id} type="button" onClick={() => setEnv(id)} disabled={advanced >= STEPS} className={`${cnChip(id === envs[Math.min(advanced + 1, STEPS)])} w-full text-left disabled:cursor-not-allowed disabled:opacity-40`}>
                    {ENVS[id].label}
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
              当前体温：<span className={`text-base font-bold ${outOfRange ? 'text-[#b0483a]' : 'text-[#2f7a4d]'}`}>{current.toFixed(2)}</span> °C
            </div>
          </>
        }
      >
        <SceneBox label="体温曲线（绿色带 = 正常范围 36.5~37.5°C）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 正常范围带 */}
            <rect x={X0} y={toXY(0, NORMAL_HIGH).y} width={W} height={toXY(0, NORMAL_LOW).y - toXY(0, NORMAL_HIGH).y} fill="#d9efe2" opacity="0.7" />
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 16} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 16} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[35, 36, 37, 38].map((v) => (
              <text key={v} x={X0 - 6} y={toXY(0, v).y + 3} textAnchor="end" fontSize="9" fill="#5f7076">
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
            {/* 环境档位标记 */}
            {envs.map((ev, i) =>
              ev ? (
                <text key={i} x={toXY(i, history[i] ?? 37).x} y={toXY(i, history[i] ?? 37).y - 10} textAnchor="middle" fontSize="8.5" fill="#8a671b">
                  {ENVS[ev].temp}°C
                </text>
              ) : null,
            )}
            {/* 体温曲线 */}
            <path d={line(history)} fill="none" stroke="#b0483a" strokeWidth="3.2" strokeLinecap="round" />
            {history.map((v, i) => (
              <circle key={i} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3.4" fill="#b0483a" />
            ))}
            {/* 图例 */}
            <g>
              <rect x={X0 + W - 100} y={Y0 - H - 10} width="104" height="18" rx="4" fill="#ffffff" opacity="0.9" />
              <text x={X0 + W - 94} y={Y0 - H + 3} fontSize="9" fill="#4b6c73" fontWeight="600">体温（°C）</text>
            </g>
          </svg>
        </SceneBox>

        <div className="rounded-md border border-[#d9e7e7] bg-white p-3">
          <p className="mb-1.5 text-xs font-semibold text-[#37585f]">身体响应（下丘脑体温调节中枢指挥的效应器）</p>
          <ul className="grid gap-1 text-xs sm:grid-cols-2">
            {resp.map((r) => (
              <li key={r.label} className={r.on ? 'font-semibold text-[#b0483a]' : 'text-[#8aa1a6]'}>
                {r.on ? '●' : '○'} {r.label}
              </li>
            ))}
          </ul>
        </div>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
