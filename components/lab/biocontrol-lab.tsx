'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（生物防治）',
    lines: [
      <>生物防治是利用<span className="font-semibold">生物物种间的相互关系</span>，以一种或一类生物抑制另一种或另一类生物的防治方法，包括<span className="font-semibold">天敌防治、性引诱剂（迷向防治）、微生物农药</span>等。</>,
      <>化学农药的困境：害虫产生<span className="font-semibold">抗药性</span>（选择作用使抗药基因频率升高）、杀伤天敌、污染环境、沿食物链<span className="font-semibold">生物富集</span>。</>,
      <>生物防治利用的是<span className="font-semibold">捕食、寄生、竞争等种间关系</span>，对环境友好且效果持久，但见效比化学农药慢。</>,
    ],
  },
  {
    title: '三种防治策略',
    lines: [
      <>① 喷洒化学农药：蚜虫数量骤降，但瓢虫（天敌）同时被大量杀死——蚜虫失去天敌控制后迅速反弹，且抗药性逐代增强。</>,
      <>② 释放天敌（七星瓢虫）：瓢虫捕食蚜虫并随食物增多而繁殖，长期把蚜虫压制在低水平——"以虫治虫"。</>,
      <>③ 挂性引诱剂：人工释放的性外激素干扰雄虫寻找配偶（迷向法），出生率大幅下降——"不杀虫而减虫"。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>抗药性的本质：<span className="font-semibold">农药只是起选择作用</span>，抗药性变异在使用农药之前就已存在，农药把不抗药的个体淘汰了。</>,
      <>生物防治的优点：减少环境污染、不易产生抗药性、保护天敌和生物多样性、成本较低；局限：见效较慢、受气候等条件影响。</>,
      <>经典案例：澳大利亚用<b>黏液瘤病毒</b>控制兔灾；我国用<b>赤眼蜂</b>防治玉米螟、用苏云金杆菌（Bt）防治多种鳞翅目害虫。</>,
    ],
  },
];

type Strategy = 'none' | 'chemical' | 'predator' | 'pheromone';

const STRATEGY_LABEL: Record<Strategy, string> = {
  none: '不防治（对照）',
  chemical: '喷洒化学农药',
  predator: '释放天敌瓢虫',
  pheromone: '挂性引诱剂',
};

const WEEKS = 8;

/** 单位面积蚜虫（头）/ 瓢虫（只），观察 8 周 */
export function BiocontrolLab() {
  const [strategy, setStrategy] = useState<Strategy>('none');
  const [aphids, setAphids] = useState<number[]>([120]);
  const [ladybugs, setLadybugs] = useState<number[]>([6]);
  const week = aphids.length - 1;

  const step = () => {
    if (week >= WEEKS) return;
    const a = aphids[aphids.length - 1];
    const l = ladybugs[ladybugs.length - 1];
    let na = a;
    let nl = l;
    if (strategy === 'none') {
      na = Math.min(600, a * 1.35);
    } else if (strategy === 'chemical') {
      if (week === 0) {
        na = Math.max(8, a * 0.12); // 农药大量杀灭
        nl = Math.max(1, l * 0.35); // 天敌同时被杀
      } else {
        na = Math.min(600, na * 1.6); // 无天敌控制+抗药性，反弹更快
        nl = Math.max(0.5, nl * 0.9);
      }
    } else if (strategy === 'predator') {
      na = Math.max(6, a - l * 7);
      nl = Math.min(60, a > 40 ? l * 1.25 : l * 0.95); // 食物少时天敌也减少
    } else {
      na = Math.min(600, a * 1.06); // 迷向降低出生率
      nl = l * 1.02;
    }
    setAphids((prev) => [...prev, na]);
    setLadybugs((prev) => [...prev, nl]);
  };

  const reset = () => {
    setAphids([120]);
    setLadybugs([6]);
  };

  const W = 330;
  const H = 150;
  const X0 = 52;
  const Y0 = 200;
  const toXY = (i: number, v: number, max: number) => ({
    x: X0 + (i / WEEKS) * W,
    y: Y0 - (v / max) * H,
  });
  const line = (arr: number[], max: number) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v, max).x.toFixed(1)} ${toXY(i, v, max).y.toFixed(1)}`).join(' ');

  const curA = aphids[aphids.length - 1];
  const curL = ladybugs[ladybugs.length - 1];

  const observation = (() => {
    if (week === 0)
      return `菜田里蚜虫 120 头/株、七星瓢虫 6 只/株，正以每周约 35% 的速度增殖。选择一种防治策略，点击「推进一周」观察 8 周内蚜虫与天敌的数量变化。`;
    if (strategy === 'chemical')
      return `第 ${week} 周：农药喷洒后蚜虫一度降至 ${aphids[1]?.toFixed(0)} 头，但天敌瓢虫也被杀死（现存 ${curL.toFixed(0)} 只）。失去控制的蚜虫加速反弹，现存 ${curA.toFixed(0)} 头——农药的"选择"还让后代抗药性越来越强。`;
    if (strategy === 'predator')
      return `第 ${week} 周：瓢虫持续捕食蚜虫并把数量压制在 ${curA.toFixed(0)} 头；有食物时瓢虫也在繁殖（${curL.toFixed(0)} 只）——"以虫治虫"见效虽慢，但能长期维持低水平平衡。`;
    if (strategy === 'pheromone')
      return `第 ${week} 周：性引诱剂干扰了雄虫求偶，蚜虫出生率明显下降（现为 ${curA.toFixed(0)} 头，比对照慢得多），天敌不受伤害。`;
    return `第 ${week} 周：不防治的菜田里蚜虫已增殖到 ${curA.toFixed(0)} 头——指数增长的风险一目了然。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择防治策略（随时可切换）</p>
              <div className="grid gap-1.5">
                {(Object.keys(STRATEGY_LABEL) as Strategy[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setStrategy(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      strategy === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {STRATEGY_LABEL[id]}
                  </button>
                ))}
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
              重置菜田
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              蚜虫 <span className="text-base font-bold text-[#b0483a]">{curA.toFixed(0)}</span> 头/株 · 瓢虫 <span className="text-base font-bold text-[#4d7ea8]">{curL.toFixed(0)}</span> 只/株
            </div>
          </>
        }
      >
        <SceneBox label={`菜田害虫动态模拟（当前策略：${STRATEGY_LABEL[strategy]}）`} heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            <line x1={X0} y1={Y0} x2={X0 + W + 14} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 12} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 2, 4, 6, 8].map((t) => (
              <text key={t} x={X0 + (t / WEEKS) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                {t}周
              </text>
            ))}
            {/* 蚜虫曲线 */}
            <path d={line(aphids, 600)} fill="none" stroke="#b0483a" strokeWidth="3" strokeLinecap="round" />
            {aphids.map((v, i) => (
              <circle key={`a${i}`} cx={toXY(i, v, 600).x} cy={toXY(i, v, 600).y} r="3.2" fill="#b0483a" />
            ))}
            {/* 瓢虫曲线 */}
            <path d={line(ladybugs, 600)} fill="none" stroke="#4d7ea8" strokeWidth="2.2" strokeDasharray="5 4" />
            {ladybugs.map((v, i) => (
              <circle key={`l${i}`} cx={toXY(i, v, 600).x} cy={toXY(i, v, 600).y} r="2.6" fill="#4d7ea8" />
            ))}
            {/* 图例 */}
            <g>
              <line x1={X0 + 10} y1={Y0 - H - 4} x2={X0 + 34} y2={Y0 - H - 4} stroke="#b0483a" strokeWidth="3" />
              <text x={X0 + 40} y={Y0 - H} fontSize="10" fill="#4b6c73" fontWeight="600">蚜虫（头/株）</text>
              <line x1={X0 + 130} y1={Y0 - H - 4} x2={X0 + 154} y2={Y0 - H - 4} stroke="#4d7ea8" strokeWidth="2.2" strokeDasharray="5 4" />
              <text x={X0 + 160} y={Y0 - H} fontSize="10" fill="#4b6c73">天敌瓢虫（只/株）</text>
            </g>
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">时间（周）</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
