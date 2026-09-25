'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（能量平衡）',
    lines: [
      <>体重的本质是<span className="font-semibold">能量的收支平衡</span>：摄入（饮食热量）= 消耗（基础代谢 + 运动 + 食物热效应）→ 体重稳定；摄入超过消耗则增重，摄入不足则减重。</>
      ,
      <>基础代谢（BMR）是维持心跳·呼吸·体温的最低消耗，约占每日总消耗的 <span className="font-semibold">60%~70%</span>——肌肉量越多，基础代谢越高。</>
      ,
      <>能量物质换算：<span className="font-semibold">糖类 4 kcal/g · 蛋白质 4 kcal/g · 脂肪 9 kcal/g</span>——脂肪的"能量密度"是糖类的两倍多。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>饮食模式：均衡（约 2200 kcal）、暴食（约 3200 kcal）、节食（约 1400 kcal）。</>
      ,
      <>运动量：久坐（几乎不运动）vs 每天运动 1 小时（约 +300 kcal 消耗）。</>
      ,
      <>观察点：为什么"节食+久坐"先快后慢？"暴食+运动"为什么还会缓慢增重？</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>极端节食的反弹：长期低摄入使身体<span className="font-semibold">下调基础代谢</span>（进入"节能模式"），恢复饮食后更易囤积脂肪。</>
      ,
      <>减脂的健康路径：<span className="font-semibold">适度热量缺口 + 力量运动保肌肉</span>（保住基础代谢）+ 充足蛋白质。</>
      ,
      <>联系课本：脂肪是良好的"储能物质"（同质量释放能量是糖类的 2 倍多）——这是演化留下的"节能设计"，在食物充裕时代反而成了负担。</>
      ,
    ],
  },
];

type Diet = 'balanced' | 'over' | 'under';
type Exercise = 'sedentary' | 'active';

const DIETS: Record<Diet, { label: string; kcal: number }> = {
  balanced: { label: '均衡饮食（约 2200 kcal）', kcal: 2200 },
  over: { label: '暴饮暴食（约 3200 kcal）', kcal: 3200 },
  under: { label: '极端节食（约 1400 kcal）', kcal: 1400 },
};

const WEEKS = 8;
const BMR = 1600;

export function EnergyBalanceLab() {
  const [diet, setDiet] = useState<Diet>('balanced');
  const [active, setActive] = useState<Exercise>('sedentary');
  const [weight, setWeight] = useState<number[]>([70]);

  const week = weight.length - 1;

  const step = () => {
    if (week >= WEEKS) return;
    const intake = DIETS[diet].kcal;
    const burn = BMR + (active === 'active' ? 300 : 80) + (weight[weight.length - 1] - 70) * 8 + (diet === 'under' ? -120 * week : 0);
    const delta = (intake - burn) / 7700; // 7700 kcal ≈ 1 kg 脂肪
    setWeight((prev) => [...prev, Math.max(45, prev[prev.length - 1] + delta)]);
  };

  const reset = () => setWeight([70]);

  const W = 310;
  const H = 130;
  const X0 = 50;
  const Y0 = 200;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / WEEKS) * W,
    y: Y0 - ((v - 55) / 30) * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const cur = weight[weight.length - 1];
  const diff = cur - 70;

  const observation = (() => {
    if (week === 0)
      return '一位 70 kg 的同学开启 8 周实验：基础代谢约 1600 kcal/天（维持心跳呼吸体温），日常活动约 80 kcal。选择饮食与运动模式，按周推进观察体重变化。';
    if (diet === 'under' && active === 'sedentary')
      return `第 ${week} 周：体重 ${cur.toFixed(1)} kg。极端节食前期掉秤快（脱水+脂肪分解），但身体随即"下调"基础代谢进入节能模式——减重越来越慢，恢复饮食后极易反弹。`;
    if (diet === 'over' && active === 'active')
      return `第 ${week} 周：虽然每天运动 1 小时（约多耗 300 kcal），但 3200 kcal 的摄入仍超过总消耗——体重缓慢上升。运动带来的健康收益（心肺·肌肉）不能被"多吃"抵消。`;
    if (diet === 'balanced')
      return `第 ${week} 周：体重稳定在 ${cur.toFixed(1)} kg——摄入与消耗基本相抵，这就是能量平衡。均衡饮食+规律运动让体重长期稳定在健康区间。`;
    return `第 ${week} 周：体重 ${cur.toFixed(1)} kg（${diff >= 0 ? '+' : ''}${diff.toFixed(1)} kg）。能量收支决定体重走向——消耗大于摄入才能减脂，且要保住肌肉量。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">饮食模式</p>
              <div className="grid gap-1.5">
                {(Object.keys(DIETS) as Diet[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setDiet(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      diet === id ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {DIETS[id].label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">运动量</p>
              <div className="grid gap-1.5">
                <button
                  type="button"
                  onClick={() => setActive('sedentary')}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold ${active === 'sedentary' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078]'}`}
                >
                  久坐（几乎不运动）
                </button>
                <button
                  type="button"
                  onClick={() => setActive('active')}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold ${active === 'active' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078]'}`}
                >
                  每天运动 1 小时
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={week >= WEEKS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进一周（{week}/{WEEKS}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置体重
            </button>
          </>
        }
      >
        <SceneBox label="8 周体重曲线（能量收支模拟）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 健康区间 */}
            <rect x={X0} y={toXY(0, 74).y} width={W} height={toXY(0, 64).y - toXY(0, 74).y} fill="#d9efe2" opacity="0.7" />
            <text x={X0 + W + 14} y={toXY(0, 69).y + 4} fontSize="9" fill="#2f6f2a" fontWeight="600">健康区</text>
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 12} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 2, 4, 6, 8].map((t) => (
              <text key={t} x={X0 + (t / WEEKS) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{t}周
              </text>
            ))}
            {[60, 70, 80].map((v) => (
              <g key={v}>
                <line x1={X0 - 4} y1={toXY(0, v).y} x2={X0} y2={toXY(0, v).y} stroke="#8a9a9f" strokeWidth="1" />
                <text x={X0 - 6} y={toXY(0, v).y + 3.5} textAnchor="end" fontSize="9" fill="#8a9a9f">{v}</text>
              </g>
            ))}
            {/* 曲线 */}
            <path d={line(weight)} fill="none" stroke="#b0483a" strokeWidth="3" strokeLinecap="round" />
            {weight.map((v, i) => (
              <circle key={i} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3.2" fill="#b0483a" />
            ))}
            <text x={X0 + 8} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73" fontWeight="600">体重（kg）</text>
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">时间（周）</text>
            <text x="428" y="286" textAnchor="end" fontSize="9.5" fill="#799398">7700 kcal ≈ 1 kg 脂肪组织</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
