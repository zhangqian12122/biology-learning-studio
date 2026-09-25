'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（捕食者-猎物周期）',
    lines: [
      <>捕食者与猎物的种群数量常呈现<span className="font-semibold">非同步的周期性波动</span>：猎物增多 → 捕食者食物充足而增多 → 猎物被大量捕食而减少 → 捕食者因缺食也减少 → 猎物恢复……循环往复。</>
      ,
      <>经典数据：加拿大哈德逊湾公司 90 年的<span className="font-semibold">雪兔-猞猁</span>毛皮记录，两条曲线相位错开约 1~2 年。</>
      ,
      <>两条曲线的规律：<span className="font-semibold">猎物峰在前、捕食者峰在后</span>；捕食者峰值总低于猎物（能量流动逐级递减）。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>雪兔数量变化 = 出生 - 自然死亡 - 被捕食；猞猁数量变化 = 捕食获得的出生 - 自然死亡。</>
      ,
      <>情景：自然波动（周期约 10 年）、捕杀猞猁（捕食者减少→雪兔爆发→植被过载）、减少雪兔食物（植被退化拖累整条食物链）。</>
      ,
      <>观察点：单一干预如何沿食物链"波及"到非目标物种。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>捕食者对猎物不只是"害"：<span className="font-semibold">捕食者捕食的多是老弱病残个体</span>，客观上控制种群密度、促进猎物种群健康（进化意义上的选择）。</>
      ,
      <>"猎物增多→捕食者增多"存在<span className="font-semibold">滞后</span>（繁殖需要时间）——滞后正是周期震荡的成因。</>
      ,
      <>延伸：外来物种入侵常因<span className="font-semibold">缺少天敌</span>而爆发——把捕食关系与生物防治联系起来。</>
      ,
    ],
  },
];

type Scenario = 'natural' | 'hunt' | 'food';

const SCENARIOS: Record<Scenario, { label: string; note: string }> = {
  natural: { label: '自然波动', note: '不加干预，观察 10 季周期' },
  hunt: { label: '奖励捕杀猞猁', note: '捕食者锐减 → 看雪兔会怎样' },
  food: { label: '植被退化（食物减少）', note: '雪兔繁殖率下降 → 看猞猁会怎样' },
};

const SEASONS = 10;

export function PredatorPreyLab() {
  const [scenario, setScenario] = useState<Scenario>('natural');
  const [hares, setHares] = useState<number[]>([62]);
  const [lynxes, setLynxes] = useState<number[]>([14]);
  const [extraHunted, setExtraHunted] = useState(false);
  const season = hares.length - 1;

  const step = () => {
    if (season >= SEASONS) return;
    let a = 0.55;
    let H = hares[hares.length - 1];
    let L = lynxes[lynxes.length - 1];
    if (scenario === 'hunt' && !extraHunted) {
      L = Math.max(3, L * 0.35);
      setExtraHunted(true);
    }
    if (scenario === 'food') a = 0.18;
    const H2 = Math.max(3, Math.min(320, H + (a * H - 0.012 * H * L) * 0.9));
    const L2 = Math.max(2, Math.min(160, L + (0.010 * H * L - 0.42 * L) * 0.9));
    setHares((prev) => [...prev, H2]);
    setLynxes((prev) => [...prev, L2]);
  };

  const reset = () => {
    setHares([62]);
    setLynxes([14]);
    setExtraHunted(false);
  };

  const W = 320;
  const H = 140;
  const X0 = 50;
  const Y0 = 206;
  const MAX = 320;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / SEASONS) * W,
    y: Y0 - (v / MAX) * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const curH = hares[hares.length - 1];
  const curL = lynxes[lynxes.length - 1];

  const observation = (() => {
    if (season === 0)
      return '一片北方针叶林里住着雪兔（约 60 只）和猞猁（约 14 只）。选择一种情景，按季推进，观察两个种群的数量如何互相牵制、交替起落。';
    if (scenario === 'natural')
      return `第 ${season} 季：雪兔 ${curH.toFixed(0)} 只、猞猁 ${curL.toFixed(0)} 只。注意两条曲线的"错拍"——雪兔先增，猞猁随后跟上；雪兔被压下来后，猞猁又因缺食回落。相位差约一季，这正是加拿大 90 年毛皮记录的规律。`;
    if (scenario === 'hunt')
      return `第 ${season} 季：猞猁被大量捕杀后（现存 ${curL.toFixed(0)} 只），失去天敌控制的雪兔爆发到 ${curH.toFixed(0)} 只——过度啃食幼苗，最终植被退化会反过来拖垮雪兔自己。捕食者是生态系统的"稳定器"。`;
    return `第 ${season} 季：植被退化使雪兔繁殖率大减（现存 ${curH.toFixed(0)} 只），猞猁随后因缺食锐减（${curL.toFixed(0)} 只）——食物链底层的变动会层层放大到顶端。"保护猎物先要保护它的食物"。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择情景（可随时切换）</p>
              <div className="grid gap-1.5">
                {(Object.keys(SCENARIOS) as Scenario[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setScenario(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      scenario === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {SCENARIOS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {SCENARIOS[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={season >= SEASONS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进一季（{season}/{SEASONS}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置森林
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              雪兔 <span className="text-base font-bold text-[#b0483a]">{curH.toFixed(0)}</span> 只 · 猞猁 <span className="text-base font-bold text-[#4d7ea8]">{curL.toFixed(0)}</span> 只
            </div>
          </>
        }
      >
        <SceneBox label="雪兔-猞猁种群动态（10 季模拟）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 12} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 2, 4, 6, 8, 10].map((t) => (
              <text key={t} x={X0 + (t / SEASONS) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{t}季
              </text>
            ))}
            {/* 雪兔曲线 */}
            <path d={line(hares)} fill="none" stroke="#b0483a" strokeWidth="3" strokeLinecap="round" />
            {hares.map((v, i) => (
              <circle key={`h${i}`} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3.2" fill="#b0483a" />
            ))}
            {/* 猞猁曲线 */}
            <path d={line(lynxes)} fill="none" stroke="#4d7ea8" strokeWidth="2.8" strokeDasharray="6 4" />
            {lynxes.map((v, i) => (
              <circle key={`l${i}`} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3" fill="#4d7ea8" />
            ))}
            {/* 图例 */}
            <g>
              <line x1={X0 + 8} y1={Y0 - H - 2} x2={X0 + 30} y2={Y0 - H - 2} stroke="#b0483a" strokeWidth="3" />
              <text x={X0 + 36} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73" fontWeight="600">雪兔（猎物）</text>
              <line x1={X0 + 120} y1={Y0 - H - 2} x2={X0 + 142} y2={Y0 - H - 2} stroke="#4d7ea8" strokeWidth="2.8" strokeDasharray="6 4" />
              <text x={X0 + 148} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73">猞猁（捕食者）</text>
            </g>
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">时间（季）</text>
            <text x="428" y="286" textAnchor="end" fontSize="9.5" fill="#799398">曲线峰值错开约一季（滞后）</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
