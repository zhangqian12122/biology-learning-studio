'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（生物富集）',
    lines: [
      <>生物富集（生物放大）：环境中难以分解、<span className="font-semibold">难以排出的有毒物质（汞、DDT 等）</span>沿食物链逐级积累，营养级越<span className="font-semibold">高</span>，体内浓度越<span className="font-semibold">高</span>。</>
      ,
      <>原因：捕食者一次捕食大量猎物，猎物体内的毒物<span className="font-semibold">全部</span>进入捕食者体内；毒物既不能分解也不能排出，于是"只进不出、层层加码"。</>
      ,
      <>与能量流动方向相同、规律相反：<span className="font-semibold">能量逐级递减（10%~20%），毒物浓度逐级递增</span>（可放大数倍到数十倍）。</>
      ,
    ],
  },
  {
    title: '经典案例',
    lines: [
      <>① 日本水俣病：工厂排汞 → 汞被微生物转化为甲基汞 → 浮游藻 → 鱼类 → 人。居民体内汞浓度可达海水的数十万倍。</>
      ,
      <>② DDT 事件：美国长岛河口测得，海水中 DDT 浓度 0.000003 ppm，银鸥体内达 75.5 ppm——放大 2500 万倍。</>
      ,
      <>③ 北极熊没有本地污染源，却因在食物链顶端捕食海豹而体内汞浓度极高——污染是全球性的。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>生物富集的前提：<span className="font-semibold">毒物性质稳定、不易分解、易被生物吸收但难排出</span>（脂溶性强）。可降解的毒素不会明显放大。</>
      ,
      <>人类处于多条食物链的顶端——<span className="font-semibold">大型肉食鱼（金枪鱼、鲨鱼）体内汞含量高</span>，孕妇儿童应少吃。</>
      ,
      <>治理思路：切断源头（禁止排放）比末端治理更有效——物质循环是全球性的，<span className="font-semibold">排放到环境中的污染物终将回到人类餐桌</span>。</>
      ,
    ],
  },
];

const STAGES = 5; // 水 → 浮游藻 → 水蚤 → 小鱼 → 食鱼鸟/人

export function BiomagnificationLab() {
  const [level, setLevel] = useState(0);
  const [heavy, setHeavy] = useState(false); // 重度排放
  const step = () => setLevel((l) => Math.min(STAGES, l + 1));
  const reset = () => setLevel(0);

  const base = heavy ? 0.02 : 0.004;
  const factor = 9;
  const conc = (l: number) => base * Math.pow(factor, l);
  const levels = [
    { name: '水', icon: '💧', body: '河水' },
    { name: '浮游藻', icon: '🦠', body: '吸收+富集' },
    { name: '水蚤', icon: '🦐', body: '滤食大量藻类' },
    { name: '小鱼', icon: '🐟', body: '捕食水蚤' },
    { name: '食鱼鸟 / 人', icon: '🦅', body: '食物链顶端' },
  ];

  const observation = (() => {
    const c = conc(level);
    const unit = 'ppm';
    if (level === 0)
      return `湖泊水中的汞浓度仅 ${c} ${unit}——低到无法检测出危害。但选好排放情景后逐级推进，看看这条食物链会把它放大到什么程度。`;
    if (level < 3)
      return `第 ${level} 级（${levels[level].name}）：体内汞浓度 ${c} ${unit}，已是水中的 ${Math.round(conc(level) / base)} 倍。汞与蛋白质结合后无法代谢排出——每次捕食都在"进货"，从不"清仓"。`;
    if (level === 3)
      return `小鱼体内汞浓度 ${c} ${unit}（水的 ${Math.round(conc(level) / base).toLocaleString()} 倍）。如果人直接吃这条鱼，摄入的汞已经超过了安全限量。`;
    return `食鱼鸟/人体内汞浓度 ${c} ${unit}——是水中的 ${Math.round(conc(level) / base).toLocaleString()} 倍！水俣病的悲剧正是这样发生的。${heavy ? '你选的是重度排放情景——工业废水直接入湖，后果被进一步放大。' : '即使轻度排放，顶端生物也难逃高浓度毒物。'}`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">排放情景</p>
              <div className="grid gap-1.5">
                <button
                  type="button"
                  onClick={() => { setHeavy(false); reset(); }}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${!heavy ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'}`}
                >
                  轻度排放（本底 0.004 ppm）
                </button>
                <button
                  type="button"
                  onClick={() => { setHeavy(true); reset(); }}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${heavy ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'}`}
                >
                  重度排放（本底 0.02 ppm）
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={level >= STAGES}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⬆ 沿食物链上升（{level}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              回到湖水
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              每上升一个营养级：<span className="font-semibold text-[#0e6f75]">汞浓度 ×{factor}</span>
              <br />
              对比：能量每级只传递 10%~20%
            </div>
          </>
        }
      >
        <SceneBox label="汞沿食物链的生物富集（对数坐标）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 台阶式柱状 */}
            {levels.map((lv, i) => {
              const c = conc(i);
              const h = Math.min(150, 14 + (i / STAGES) * 132);
              const x = 52 + i * 78;
              const y = 218 - h;
              const reached = i <= level;
              return (
                <g key={lv.name}>
                  <rect x={x} y={y} width="58" height={h} rx="6" fill={reached ? (i >= 3 ? '#c94a4a' : i >= 1 ? '#e8a03a' : '#7ab0c9') : '#e8ece8'} stroke={reached ? '#5a4a2a' : '#c9d4d4'} strokeWidth={reached ? 2.2 : 1.4} />
                  <text x={x + 29} y={y - 8} textAnchor="middle" fontSize={reached ? 10.5 : 9.5} fill={reached ? '#a53030' : '#9ab0b5'} fontWeight={reached ? '800' : '500'}>
                    {c.toExponential(0)}
                  </text>
                  <text x={x + 29} y={238} textAnchor="middle" fontSize="11">{lv.icon}</text>
                  <text x={x + 29} y={256} textAnchor="middle" fontSize="9.5" fill="#59767c">{lv.name}</text>
                  {i < STAGES ? (
                    <path d={`M${x + 62} ${218 - h / 2 - 6} h 10 m 0 0 l -5 -4 m 5 4 l -5 4`} fill="none" stroke="#8a671b" strokeWidth="1.6" />
                  ) : null}
                </g>
              );
            })}
            <text x="220" y="28" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">
              {`汞浓度（ppm）：每级 ×${factor}，顶端 = 水中 ${Math.round(conc(STAGES) / base).toLocaleString()} 倍`}
            </text>
            <text x="220" y="46" textAnchor="middle" fontSize="10" fill="#799398">
              {`当前：${levels[Math.min(level, 4)].name} · ${conc(Math.min(level, 4))} ppm`}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
