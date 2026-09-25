'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（碳循环）',
    lines: [
      <>碳在生物群落与无机环境间循环：<span className="font-semibold">大气 CO₂ →（光合作用）→ 生产者 →（食物链）→ 消费者 →（分解者）→ 大气 CO₂</span>。</>
      ,
      <>碳在群落内以<span className="font-semibold">含碳有机物</span>形式流动，在群落与环境之间以<span className="font-semibold">CO₂</span>形式循环——碳循环具有全球性。</>
      ,
      <>化石燃料中的碳原本"退出"了循环数亿年：<span className="font-semibold">燃烧化石燃料把它重新快速释放回大气</span>，打破循环平衡——温室效应的根源。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>三个碳库：大气 CO₂ 库、植被（生产者）、土壤与分解者。</>
      ,
      <>情景：自然平衡（光合与呼吸分解相当）、燃烧化石燃料（额外碳源输入大气）、毁林+燃烧（光合减少 + 碳库直接释放）。</>
      ,
      <>观察点：哪个情景能让大气 CO₂ 明显上升？"减排放"与"多种树"各管哪一头？</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>碳循环与能量流动<span className="font-semibold">相伴而行</span>：能量单向递减、物质循环往复——物质是能量的"载体"。</>
      ,
      <>"碳中和"：排放的 CO₂ 与被固定/吸收的 CO₂ 相抵消——本质是<span className="font-semibold">恢复碳循环的收支平衡</span>。</>
      ,
      <>温室气体的"温室"不是坏事：适度温室效应使地表温暖宜居；问题是<span className="font-semibold">人为排放让平衡被打破、浓度快速升高</span>。</>
      ,
    ],
  },
];

type Scenario = 'balance' | 'fossil' | 'deforest';

const SCENARIOS: Record<Scenario, { label: string; note: string }> = {
  balance: { label: '自然平衡', note: '光合固定 = 呼吸+分解释放' },
  fossil: { label: '燃烧化石燃料', note: '地下碳库快速回流大气' },
  deforest: { label: '毁林 + 燃烧', note: '光合减弱 + 植被碳直接释放' },
};

const DECADES = 10;

export function CarbonCycleSimLab() {
  const [scenario, setScenario] = useState<Scenario>('balance');
  const [atm, setAtm] = useState<number[]>([290]);
  const [veg, setVeg] = useState<number[]>([500]);
  const decade = atm.length - 1;

  const step = () => {
    if (decade >= DECADES) return;
    const a = atm[atm.length - 1];
    const v = veg[veg.length - 1];
    const photo = 2.6 * (v / 500);
    const resp = 2.6;
    let na = a - photo + resp;
    let nv = v;
    if (scenario === 'fossil') na += 3.2;
    if (scenario === 'deforest') {
      na += 1.6;
      nv = Math.max(120, v * 0.86);
    }
    setAtm((prev) => [...prev, Math.max(240, na)]);
    setVeg((prev) => [...prev, nv]);
  };

  const reset = () => {
    setAtm([290]);
    setVeg([500]);
  };

  const W = 320;
  const H = 120;
  const X0 = 50;
  const Y0 = 200;
  const MAX = 480;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / DECADES) * W,
    y: Y0 - ((v - 240) / (MAX - 240)) * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const cur = atm[atm.length - 1];
  const curV = veg[veg.length - 1];

  const observation = (() => {
    if (decade === 0)
      return '工业化前的大气 CO₂ 约 290 ppm，植被碳库约 500 单位。选择一种情景，按十年推进，观察碳循环的收支如何演变。';
    if (scenario === 'balance')
      return `第 ${decade} 个十年：大气 CO₂ 维持在 ${cur.toFixed(0)} ppm 左右——光合固定的碳与呼吸、分解释放的碳大体相抵，碳循环处于动态平衡。这就是"碳中和"追求的状态。`;
    if (scenario === 'fossil')
      return `第 ${decade} 个十年：化石燃料把数亿年前"封存"的碳快速释放回大气，CO₂ 升到 ${cur.toFixed(0)} ppm——输入持续大于输出，平衡被打破，温室效应增强。`;
    return `第 ${decade} 个十年：毁林使光合"收入"减少，燃烧又添"支出"，CO₂ 冲到 ${cur.toFixed(0)} ppm，植被碳库缩水到 ${curV.toFixed(0)}——双重打击比单一排放更严重。`;
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
              disabled={decade >= DECADES}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进十年（{decade}/{DECADES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              回到工业化前
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              大气 CO₂ <span className="text-base font-bold text-[#b0483a]">{cur.toFixed(0)}</span> ppm · 植被碳库 {curV.toFixed(0)}
            </div>
          </>
        }
      >
        <SceneBox label="大气 CO₂ 浓度演变（10 个十年）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 安全参考线 */}
            <line x1={X0} y1={toXY(0, 290).y} x2={X0 + W + 12} y2={toXY(0, 290).y} stroke="#3f7f3a" strokeWidth="1.6" strokeDasharray="6 4" />
            <text x={X0 + W + 14} y={toXY(0, 290).y + 4} fontSize="9" fill="#2f6f2a" fontWeight="600">290 工业化前</text>
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 12} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 2, 4, 6, 8, 10].map((t) => (
              <text key={t} x={X0 + (t / DECADES) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                {t}个十年
              </text>
            ))}
            {/* 曲线 */}
            <path d={line(atm)} fill="none" stroke="#b0483a" strokeWidth="3" strokeLinecap="round" />
            {atm.map((v, i) => (
              <circle key={i} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3.2" fill="#b0483a" />
            ))}
            {/* 图例 */}
            <g>
              <line x1={X0 + 8} y1={Y0 - H - 2} x2={X0 + 30} y2={Y0 - H - 2} stroke="#b0483a" strokeWidth="3" />
              <text x={X0 + 36} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73" fontWeight="600">大气 CO₂（ppm）</text>
            </g>
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">时间（十年）</text>
            <text x="428" y="286" textAnchor="end" fontSize="9.5" fill="#799398">碳循环全球性：一地排放，全球升温</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
