'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（冬眠与代谢调节）',
    lines: [
      <>冬眠是某些动物对冬季寒冷与食物短缺的<span className="font-semibold">季节性适应</span>：体温大幅下降、代谢率降到极低、依靠体内储存的脂肪过冬。</>
      ,
      <>冬眠 ≠ 简单的"睡大觉"：这是神经-内分泌系统精确调控的<span className="font-semibold">主动降温</span>过程——地松鼠甚至允许体温降到接近 0°C，并每隔一两周自动"觉醒"回暖一次（睡眠修复、清除代谢废物）。</>
      ,
      <>对比恒温策略：人类等动物维持体温恒定（冷了要"烧"能量产热），冬眠动物选择"降低设定点"省能量——两种策略各有代价。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>环境温度从 20°C 缓慢降至 5°C（模拟秋入冬），对比<span className="font-semibold">冬眠地松鼠</span>与<span className="font-semibold">不冬眠对照鼠</span>。</>
      ,
      <>两条曲线：体温与代谢率。冬眠鼠体温随环境缓降（允许低至 5~8°C），对照鼠始终维持约 37°C。</>
      ,
      <>观察点：冬眠鼠代谢率可降到正常值的 <span className="font-semibold">1%~5%</span>——"省电模式"的幅度。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>产热的两种方式：<span className="font-semibold">战栗产热</span>（骨骼肌收缩，如人类打寒战）与<span className="font-semibold">非战栗产热</span>（褐色脂肪组织氧化产热，冬眠动物觉醒回暖的关键）。</>
      ,
      <>下丘脑是体温调节中枢：冬眠时"调定点"被主动下调——与发烧（调定点上移）正好相反方向的"重设"。</>
      ,
      <>应用前沿：低温医学——器官移植的低温保存、诱导低代谢延缓损伤，都从冬眠动物身上"取经"。</>
      ,
    ],
  },
];

type Animal = 'hibernator' | 'control';

const STEPS = 8;
/** 环境温度随步数从 20°C 降到 5°C */
const envAt = (i: number) => 20 - (15 / STEPS) * i;

export function HibernationLab() {
  const [animal, setAnimal] = useState<Animal>('hibernator');
  const [bodyT, setBodyT] = useState<number[]>([37]);
  const [meta, setMeta] = useState<number[]>([100]);

  const stepIdx = bodyT.length - 1;

  const step = () => {
    if (stepIdx >= STEPS) return;
    const env = envAt(stepIdx + 1);
    if (animal === 'hibernator') {
      // 冬眠：体温允许逐渐贴近环境（不低于 5），代谢骤降
      const prevT = bodyT[bodyT.length - 1];
      const target = Math.max(6, env + 1.5);
      const nt = prevT - (prevT - target) * 0.55;
      const nm = Math.max(4, meta[meta.length - 1] * 0.42);
      setBodyT((prev) => [...prev, nt]);
      setMeta((prev) => [...prev, nm]);
    } else {
      // 对照：维持 37°C，但寒冷使代谢升高（产热）
      const nm = Math.min(320, meta[meta.length - 1] * 1.35);
      setBodyT((prev) => [...prev, 37]);
      setMeta((prev) => [...prev, nm]);
    }
  };

  const reset = () => {
    setBodyT([37]);
    setMeta([100]);
  };

  const W = 300;
  const H = 130;
  const X0 = 52;
  const Y0 = 204;
  const toXY = (i: number, v: number, min: number, max: number) => ({
    x: X0 + (i / STEPS) * W,
    y: Y0 - ((v - min) / (max - min)) * H,
  });
  const line = (arr: number[], min: number, max: number) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v, min, max).x.toFixed(1)} ${toXY(i, v, min, max).y.toFixed(1)}`).join(' ');

  const curT = bodyT[bodyT.length - 1];
  const curM = meta[meta.length - 1];

  const observation = (() => {
    if (stepIdx === 0)
      return '秋去冬来：环境温度将从 20°C 缓降到 5°C。对比两只动物——一只即将冬眠的地松鼠，一只保持活跃的对照鼠。选择对象，逐步降温观察。';
    if (animal === 'hibernator')
      return `环境 ${envAt(stepIdx).toFixed(0)}°C：冬眠鼠体温已降到 ${curT.toFixed(1)}°C，代谢率只有正常值的 ${curM.toFixed(0)}%——它靠体内脂肪缓慢"燃烧"维持生命，几乎不进食。每隔一两周它会自发觉醒回暖一次，"打扫"身体后再入眠。`;
    return `环境 ${envAt(stepIdx).toFixed(0)}°C：对照鼠仍在顽强维持 37°C 恒温，但代价是代谢率飙升到 ${curM.toFixed(0)}%——需要不断进食产热。寒冷对恒温动物是真实的能量考验。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择实验对象</p>
              <div className="grid gap-1.5">
                <button
                  type="button"
                  onClick={() => { setAnimal('hibernator'); reset(); }}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${animal === 'hibernator' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078]'}`}
                >
                  冬眠地松鼠
                </button>
                <button
                  type="button"
                  onClick={() => { setAnimal('control'); reset(); }}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${animal === 'control' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078]'}`}
                >
                  不冬眠对照鼠
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={stepIdx >= STEPS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ❄️ 环境降温（{stepIdx}/{STEPS}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              回到秋天
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              体温 {curT.toFixed(1)}°C · 代谢率 {curM.toFixed(0)}%
              <br />
              <span className="font-semibold text-[#0e6f75]">冬眠 = 主动下调"体温调定点"</span>
            </div>
          </>
        }
      >
        <SceneBox label={`体温（红线）与代谢率（蓝虚线）· 环境 ${envAt(stepIdx).toFixed(0)}°C`} heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 环境温度曲线 */}
            <path d={line(Array.from({ length: stepIdx + 1 }, (_, i) => envAt(i)), 0, 40)} fill="none" stroke="#8a9a9f" strokeWidth="2" strokeDasharray="4 4" />
            <text x={X0 + W + 14} y={toXY(STEPS, 5, 0, 40).y + 4} fontSize="9" fill="#799398">环境 5°C</text>
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 12} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 4, 8].map((t) => (
              <text key={t} x={X0 + (t / STEPS) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{t}步
              </text>
            ))}
            {/* 体温曲线（0-40°C 量程） */}
            <path d={line(bodyT, 0, 40)} fill="none" stroke="#b0483a" strokeWidth="3" strokeLinecap="round" />
            {bodyT.map((v, i) => (
              <circle key={`t${i}`} cx={toXY(i, v, 0, 40).x} cy={toXY(i, v, 0, 40).y} r="3" fill="#b0483a" />
            ))}
            {/* 代谢曲线（0-320% 量程） */}
            <path d={line(meta, 0, 320)} fill="none" stroke="#4d7ea8" strokeWidth="2.6" strokeDasharray="6 4" />
            <text x={X0 + 8} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73" fontWeight="600">体温 °C（红实线）· 代谢率 %（蓝虚线）</text>
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">降温进程（灰虚线 = 环境温度）</text>
            <text x="428" y="286" textAnchor="end" fontSize="9.5" fill="#799398">冬眠鼠代谢可降至正常 1%~5%</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
