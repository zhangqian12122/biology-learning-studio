'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（体液免疫的"两次应答"）',
    lines: [
      <>首次接种疫苗（灭活或减毒的病原）：B 淋巴细胞识别抗原后增殖分化，产生<span className="font-semibold">浆细胞分泌抗体</span>与<span className="font-semibold">记忆细胞</span>——这是<span className="font-semibold">初次免疫</span>，抗体产生慢、量少、持续时间短。</>,
      <>真正的病原体入侵时，<span className="font-semibold">记忆细胞</span>迅速识别并快速增殖分化，产生大量抗体——这是<span className="font-semibold">二次免疫</span>：更快、更强、持续更久。</>,
      <>疫苗正是利用二次免疫的原理：<span className="font-semibold">用无害的"演习"换来实战时的先发制人</span>。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>曲线：血清中抗体浓度（相对量）随时间（周）变化。</>,
      <>两次操作：第 0 周接种疫苗；第 8 周让病原体入侵。</>,
      <>观察点：两次抗体高峰的"高度"与"速度"差别，以及记忆细胞的角色。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 点「接种疫苗」，逐步推进观察初次免疫的抗体曲线缓慢爬升。</>,
      <>② 点「病原体入侵」，对比二次免疫的抗体陡峭高峰。</>,
      <>③ 想一想：如果第 4 周就入侵，保护力够吗？（记忆与抗体都未达峰值）</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>抗体由<span className="font-semibold">浆细胞</span>分泌，但<span className="font-semibold">记忆细胞</span>才是二次免疫更强的原因——它"记住"了抗原。</>,
      <>二次免疫比初次免疫：抗体<span className="font-semibold">产生更快、峰值更高、持续更久</span>。</>,
      <>接种灭活/减毒疫苗通常需要<span className="font-semibold">加强针</span>：多次刺激让记忆细胞与抗体维持在高水平。</>,
    ],
  },
];

const TOTAL_WEEKS = 20;

/** 根据当前周数计算抗体浓度（相对量 0~100） */
function antibodyAt(week: number, vaccinated: boolean, invaded: boolean): number {
  if (!vaccinated) return 0;
  // 初次应答：第 0 周接种，峰约第 4 周（40），第 8 周回落到 ~25，之后缓慢衰减
  let base = 0;
  if (week <= 4) base = (week / 4) * 40;
  else base = 40 - (week - 4) * 2.2;
  base = Math.max(base, 14);
  // 二次应答：第 8 周入侵，第 11 周达峰（95），缓慢衰减
  let second = 0;
  if (invaded && week > 8) {
    const w = week - 8;
    second = w <= 3 ? (w / 3) * 95 : Math.max(40, 95 - (w - 3) * 1.6);
  }
  return Math.min(100, base + second);
}

export function VaccineResponseLab() {
  const [week, setWeek] = useState(0);
  const [vaccinated, setVaccinated] = useState(false);
  const [invaded, setInvaded] = useState(false);

  const stepForward = () => setWeek((w) => Math.min(TOTAL_WEEKS, w + 1));
  const vaccinate = () => {
    setVaccinated(true);
    setWeek(0);
  };
  const invade = () => {
    if (!vaccinated) return;
    setInvaded(true);
    setWeek(8);
  };
  const reset = () => {
    setWeek(0);
    setVaccinated(false);
    setInvaded(false);
  };

  const currentLevel = antibodyAt(week, vaccinated, invaded);
  const peak = (() => {
    if (!vaccinated) return 0;
    if (!invaded) return 40;
    return 95;
  })();

  const W = 320;
  const H = 150;
  const X0 = 46;
  const Y0 = 200;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / TOTAL_WEEKS) * W,
    y: Y0 - (v / 100) * H,
  });
  const curve = (() => {
    if (!vaccinated) return '';
    const pts: string[] = [];
    for (let i = 0; i <= week; i++) {
      pts.push(`${i === 0 ? 'M' : 'L'}${toXY(i, antibodyAt(i, vaccinated, invaded)).x.toFixed(1)} ${toXY(i, antibodyAt(i, vaccinated, invaded)).y.toFixed(1)}`);
    }
    return pts.join(' ');
  })();

  const observation = (() => {
    if (!vaccinated) return '还没接种疫苗：体内没有针对这种病原的抗体。点「接种疫苗」启动初次免疫。';
    if (!invaded) {
      if (week <= 1) return '疫苗（灭活病原）刚刚进入体内：B 淋巴细胞已识别抗原，正准备增殖分化——抗体还没来得及大量产生。';
      if (week <= 6) return `第 ${week} 周：初次免疫进行中，抗体缓慢爬升到 ${currentLevel.toFixed(0)}（峰值约 40）。同时记忆细胞已悄悄"建档"。`;
      return `第 ${week} 周：初次免疫的抗体已回落到中等水平，但记忆细胞长期存活——它们在等待真正的病原体。点「病原体入侵」看二次免疫。`;
    }
    if (week <= 9) return `入侵第 ${week - 8 + 8} 周：记忆细胞闪电般增殖分化！抗体正以初次免疫数倍的速度飙升（当前 ${currentLevel.toFixed(0)}）。`;
    return `二次免疫高峰约 95，是初次免疫（40）的 2 倍多，且出现更快、持续更久——这就是疫苗"防患于未然"的免疫学原理。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={vaccinate}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              💉 第 0 周：接种疫苗（初次免疫）
            </button>
            <button
              type="button"
              onClick={invade}
              disabled={!vaccinated || invaded}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#b0483a] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#9a3a2e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              🦠 第 8 周：病原体入侵（二次免疫）
            </button>
            <button
              type="button"
              onClick={stepForward}
              disabled={week >= TOTAL_WEEKS || !vaccinated}
              className="min-h-10 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-semibold text-[#366169] transition-colors hover:bg-[#eef7f7] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进 1 周（{week}/{TOTAL_WEEKS}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置实验
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前抗体浓度：<span className="text-base font-bold text-[#13333a]">{currentLevel.toFixed(0)}</span>
              <br />
              记忆细胞：<span className="font-bold">{vaccinated ? '已产生 ✓' : '未产生'}</span>
              <br />
              抗体峰值预期：{peak}
            </div>
          </>
        }
      >
        <SceneBox label="抗体浓度曲线（初次免疫 vs 二次免疫）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 280" aria-hidden="true">
            {/* 背景 */}
            <rect x={X0} y={Y0 - H} width={W} height={H} fill="#fbfdfc" />
            {/* 事件竖线 */}
            {vaccinated ? (
              <g>
                <line x1={toXY(0, 0).x} y1={Y0 - H} x2={toXY(0, 0).x} y2={Y0} stroke="#0e6f75" strokeWidth="2.4" strokeDasharray="6 4" />
                <text x={toXY(0, 0).x + 4} y={Y0 - H + 12} fontSize="9.5" fill="#0e6f75" fontWeight="700">💉 疫苗</text>
              </g>
            ) : null}
            {invaded ? (
              <g>
                <line x1={toXY(8, 0).x} y1={Y0 - H} x2={toXY(8, 0).x} y2={Y0} stroke="#b0483a" strokeWidth="2.4" strokeDasharray="6 4" />
                <text x={toXY(8, 0).x + 4} y={Y0 - H + 12} fontSize="9.5" fill="#b0483a" fontWeight="700">🦠 病原体</text>
              </g>
            ) : null}
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 16} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 40, 95].map((v) => (
              <text key={v} x={X0 - 6} y={toXY(0, v).y + 3} textAnchor="end" fontSize="9" fill="#5f7076">
                {v}
              </text>
            ))}
            {[0, 5, 10, 15, 20].map((t) => (
              <text key={t} x={toXY(t, 0).x} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{t}周
              </text>
            ))}
            {/* 抗体曲线 */}
            {curve ? <path d={curve} fill="none" stroke="#7a4a8a" strokeWidth="3.2" strokeLinecap="round" /> : null}
            {/* 峰值标注 */}
            {vaccinated ? (
              <g>
                <text x={toXY(4, 0).x} y={toXY(4, 42).y} textAnchor="middle" fontSize="9" fill="#59767c">初次峰值 40</text>
                {invaded ? <text x={toXY(11, 0).x} y={toXY(11, 98).y} textAnchor="middle" fontSize="9" fill="#7a4a8a" fontWeight="700">二次峰值 95</text> : null}
              </g>
            ) : null}
            <text x={X0 + W / 2} y={Y0 + 28} textAnchor="middle" fontSize="10" fill="#5f7076">
              时间（周）
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
