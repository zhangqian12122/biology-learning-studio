'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（遗传漂变）',
    lines: [
      <>遗传漂变：种群中基因频率因<span className="font-semibold">偶然因素</span>（随机抽样误差）而发生的变化——一代代"抽签"，某些等位基因随机增多或减少。</>
      ,
      <>种群越小，漂变越剧烈：<span className="font-semibold">小种群中等位基因容易随机"固定"或"丢失"</span>，大种群中则变化缓慢平稳。</>
      ,
      <>与自然选择对比：选择是"有方向的筛选"（适应环境的占优），漂变是"无方向的随机波动"——两者都改变基因频率。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>瓶颈效应：灾难（火灾·洪水）使种群骤减——幸存者的基因频率"碰巧"代表不了原来种群（像从罐中随机抓一把豆）。</>
      ,
      <>奠基者效应：少数个体迁到新岛屿建立种群——它们的基因频率决定新种群的"起点"。</>
      ,
      <>观察点：为什么濒危物种（种群小）特别容易丢失遗传多样性？</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>漂变在<span className="font-semibold">所有种群</span>中都存在，只是小种群中更显著——是"中性演化"理论的重要机制。</>
      ,
      <>保护生物学应用：<span className="font-semibold">基因走廊</span>连接破碎栖息地，增大有效种群、减弱近亲繁殖与漂变损失。</>
      ,
      <>与自然选择区分的依据：漂变无方向、与适应性无关；选择有方向、与适应性相关。</>
      ,
    ],
  },
];

type Pop = 'small' | 'large';

export function GeneticDriftLab() {
  const [pop, setPop] = useState<Pop>('small');
  const [freq, setFreq] = useState<number[]>([0.5]);
  const [gen, setGen] = useState(0);

  const step = () => {
    if (gen >= 40) return;
    const f = freq[freq.length - 1];
    if (f <= 0 || f >= 1) return;
    const size = pop === 'small' ? 20 : 400;
    // 二项抽样模拟漂变
    let count = 0;
    for (let i = 0; i < size; i++) count += Math.random() < f ? 1 : 0;
    const nf = count / size;
    setFreq((prev) => [...prev, nf]);
    setGen((g) => g + 1);
  };

  const reset = () => {
    setFreq([0.5]);
    setGen(0);
  };

  const W = 300;
  const H = 130;
  const X0 = 50;
  const Y0 = 204;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / 40) * W,
    y: Y0 - v * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const cur = freq[freq.length - 1];
  const fixed = cur >= 0.999;
  const lost = cur <= 0.001;

  const observation = (() => {
    if (gen === 0)
      return `种群初始：等位基因 A 与 a 各占 50%（${pop === 'small' ? 20 : 400} 个体）。按代推进，观察基因频率的随机波动——比较小种群与大种群的表现。`;
    if (fixed)
      return `第 ${gen} 代：等位基因 A 已经"固定"（频率 100%），a 彻底丢失——不是因为它更适应，只是运气。小种群的随机漂变可以让中性基因就这样悄悄"缺席"。`;
    if (lost)
      return `第 ${gen} 代：等位基因 A 彻底"丢失"（频率 0%）。即便一个基因对生存毫无坏处，小种群中的随机波动也可能让它永远消失——这就是遗传多样性流失的微观过程。`;
    return pop === 'small'
      ? `第 ${gen} 代：A 频率波动到 ${cur.toFixed(2)}——小种群的抽样误差大，频率"上蹿下跳"，随时可能固定或丢失。`
      : `第 ${gen} 代：大种群中 A 频率 ${cur.toFixed(2)}，波动很小——个体越多，越接近理想的"遗传平衡"。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择种群大小</p>
              <div className="grid gap-1.5">
                <button
                  type="button"
                  onClick={() => { setPop('small'); reset(); }}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${pop === 'small' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078]'}`}
                >
                  小种群（20 个体）——漂变剧烈
                </button>
                <button
                  type="button"
                  onClick={() => { setPop('large'); reset(); }}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${pop === 'large' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078]'}`}
                >
                  大种群（400 个体）——波动平缓
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={gen >= 40 || fixed || lost}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              🎲 繁殖一代（第 {gen} 代）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置为 50%
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              A 基因频率：<span className="text-base font-bold text-[#b0483a]">{cur.toFixed(2)}</span>
              {fixed || lost ? <span className="font-semibold text-[#b0483a]">（{fixed ? '已固定' : '已丢失'}）</span> : null}
            </div>
          </>
        }
      >
        <SceneBox label={`等位基因 A 频率的随机漂变（${pop === 'small' ? '小种群 20 个体' : '大种群 400 个体'}）`} heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 0.5 虚线 */}
            <line x1={X0} y1={Y0 - 65} x2={X0 + W + 12} y2={Y0 - 65} stroke="#8a9a9f" strokeWidth="1.2" strokeDasharray="5 4" />
            <text x={X0 + W + 14} y={Y0 - 61} fontSize="9" fill="#799398">0.5</text>
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 12} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 5, 10, 15, 20].map((t) => (
              <text key={t} x={X0 + (t / 20) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{t}代
              </text>
            ))}
            {/* 曲线 */}
            <path d={line(freq)} fill="none" stroke="#b0483a" strokeWidth="3" strokeLinecap="round" />
            {freq.map((v, i) => (
              <circle key={i} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3" fill="#b0483a" />
            ))}
            <text x={X0 + 8} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73" fontWeight="600">等位基因 A 频率</text>
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">世代</text>
            <text x="428" y="286" textAnchor="end" fontSize="9.5" fill="#799398">小种群：每代"抽签"误差更大</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
