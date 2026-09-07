'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（密闭温室中的两股"气流"）',
    lines: [
      <>白天有光：绿色植物进行<span className="font-semibold">光合作用</span>吸收 CO₂、释放 O₂，同时也在进行呼吸作用——光合强度大于呼吸强度时，温室内 CO₂ 浓度<span className="font-semibold">下降</span>，有机物净积累（作物生长）。</>,
      <>夜晚无光：只进行<span className="font-semibold">呼吸作用</span>，释放 CO₂，温室 CO₂ 浓度<span className="font-semibold">上升</span>，并消耗白天积累的有机物。</>,
      <>一昼夜 CO₂ 的"净减少量"就是有机物的净积累量——它决定产量高低。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>光照开关：模拟白天（灯亮，光合+呼吸）与黑夜（灯灭，只有呼吸）。</>,
      <>曲线：温室内 CO₂ 浓度随时间变化——下降越快说明光合越"旺"。</>,
      <>观察点：连续开灯（不"睡觉"）作物会怎样？为什么要通风补 CO₂？</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 初始 CO₂ 300 份。开灯推进几步，看 CO₂ 下降与有机物积累。</>,
      <>② 关灯推进几步，观察呼吸作用把 CO₂"吐"回来、消耗有机物。</>,
      <>③ 尝试"连续开灯 12 小时"，对比正常昼夜循环的产量差。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>CO₂ 是光合作用的<span className="font-semibold">原料</span>：浓度过低时即使光照充足，光合也会"停摆"（ CO₂ 是暗反应的限制因子）。</>,
      <>农业生产措施：通风、施用气肥（CO₂）、增施有机肥（微生物分解释放 CO₂）——都在<span className="font-semibold">补原料</span>。</>,
      <>昼夜温差大的地区瓜果更甜：白天积累多、夜晚消耗少。</>,
    ],
  },
];

const STEPS = 12;

export function GreenhouseGasLab() {
  const [co2, setCo2] = useState<number[]>([300]);
  const [lightOn, setLightOn] = useState<boolean[]>([true]);
  const [history, setHistory] = useState<{ light: boolean; co2: number }[]>([{ light: true, co2: 300 }]);

  const advanced = co2.length - 1;

  const stepForward = () => {
    if (advanced >= STEPS) return;
    setCo2((prev) => {
      const cur = prev[prev.length - 1];
      const light = lightOn[lightOn.length - 1] ?? true;
      // 有光：光合净吸收 CO₂（原料不足时封顶）；无光：呼吸释放
      const next = light ? Math.max(120, cur - 26) : Math.min(560, cur + 15);
      return [...prev, next];
    });
    setLightOn((prev) => [...prev, prev[prev.length - 1] ?? true]);
    setHistory((prev) => {
      const cur = prev[prev.length - 1];
      const light = lightOn[lightOn.length - 1] ?? true;
      const nextCo2 = light ? Math.max(120, cur.co2 - 26) : Math.min(560, cur.co2 + 15);
      return [...prev, { light, co2: nextCo2 }];
    });
  };

  const toggleLight = () => {
    setLightOn((prev) => {
      const next = [...prev];
      next[Math.min(advanced + 1, STEPS)] = !(prev[prev.length - 1] ?? true);
      return next;
    });
  };

  const reset = () => {
    setCo2([300]);
    setLightOn([true]);
    setHistory([{ light: true, co2: 300 }]);
  };

  const current = co2[co2.length - 1];
  const light = lightOn[lightOn.length - 1] ?? true;
  const startCo2 = 300;
  const netChange = Math.round(current - startCo2);

  const W = 320;
  const H = 150;
  const X0 = 46;
  const Y0 = 200;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / STEPS) * W,
    y: Y0 - ((v - 80) / 500) * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const observation = (() => {
    if (advanced === 0) return `当前 CO₂ 300 份、灯亮。点「推进 2h」看光合作用如何"抽走"温室里的 CO₂；再关灯看呼吸作用把它"吐"回来。`;
    if (current <= 130) return `CO₂ 只剩 ${current} 份——原料几乎耗尽，光合作用即将"停摆"（就算灯再亮也没用）。生产上要通风或施气肥补 CO₂。`;
    if (!light) return `灯灭：只有呼吸作用，CO₂ 上升到 ${current} 份、消耗白天积累的有机物。昼夜温差大（夜温低）能减少这种消耗，瓜果更甜。`;
    if (netChange < 0) return `开灯 ${advanced} 步：CO₂ 净减少 ${Math.abs(netChange)} 份——光合大于呼吸，有机物净积累中，作物在生长。`;
    return `CO₂ 净增加 ${netChange} 份：呼吸释放超过光合吸收——光照时间太短或植株太少，产量在"亏空"。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={toggleLight}
              disabled={advanced >= STEPS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {light ? '💡 关灯（切换到黑夜）' : '🌙 开灯（切换到白天）'}
            </button>
            <button
              type="button"
              onClick={stepForward}
              disabled={advanced >= STEPS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-[#cbdede] bg-white px-3 text-xs font-semibold text-[#366169] transition-colors hover:bg-[#eef7f7] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进 2h（{advanced}/{STEPS}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前：<span className="font-bold">{light ? '白天·灯亮' : '黑夜·灯灭'}</span>
              <br />
              温室 CO₂：<span className="text-base font-bold text-[#13333a]">{current}</span> 份
              <br />
              相对初始净变化：{netChange >= 0 ? `+${netChange}` : netChange} 份
            </div>
          </>
        }
      >
        <SceneBox label="密闭温室内 CO₂ 浓度曲线（下降=光合占优 · 上升=呼吸占优）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 280" aria-hidden="true">
            {/* 昼夜背景带 */}
            {history.map((h, i) => {
              if (i === history.length - 1) return null;
              const x1 = toXY(i, 0).x;
              const x2 = toXY(i + 1, 0).x;
              return (
                <rect key={i} x={x1} y={30} width={x2 - x1} height={Y0 - 30 + 10} fill={h.light ? '#fdf3cf' : '#d8e2ee'} opacity={h.light ? 0.8 : 0.9} />
              );
            })}
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 16} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 14} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[100, 300, 500].map((v) => (
              <text key={v} x={X0 - 6} y={toXY(0, v).y + 3} textAnchor="end" fontSize="9" fill="#5f7076">
                {v}
              </text>
            ))}
            <text x={X0 + W / 2} y={Y0 + 26} textAnchor="middle" fontSize="10" fill="#5f7076">
              时间（每步 2 小时）
            </text>
            <text x="26" y="26" fontSize="9" fill="#8a671b" fontWeight="700">黄=灯亮（光合+呼吸）</text>
            <text x="26" y="38" fontSize="9" fill="#4d7ea8" fontWeight="700">蓝=灯灭（仅呼吸）</text>
            {/* 曲线 */}
            <path d={line(co2)} fill="none" stroke="#b0483a" strokeWidth="3" strokeLinecap="round" />
            {co2.map((v, i) => (
              <circle key={i} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3.2" fill="#b0483a" />
            ))}
            {/* 状态说明 */}
            <text x={X0 + W + 4} y={Y0 - H - 2} fontSize="9.5" fill="#59767c">
              CO₂ 浓度
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
