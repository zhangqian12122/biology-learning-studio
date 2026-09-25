'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（食品保存的微生物学）',
    lines: [
      <>食品腐败的根本原因是<span className="font-semibold">微生物（细菌、真菌）的大量繁殖</span>：适宜温度、充足水分和营养让菌落呈指数增长。</>
      ,
      <>保存方法的共同思路：<span className="font-semibold">杀死微生物（巴氏消毒、高温灭菌）或抑制其繁殖（低温、干燥、高渗、真空）</span>——抑菌不等于杀菌。</>
      ,
      <>巴斯德的鹅颈瓶实验证明肉汤腐败来自空气中的微生物——"防腐"的本质就是控制微生物。</>
      ,
    ],
  },
  {
    title: '常用方法与原理',
    lines: [
      <>① 冷藏（4°C）：低温降低酶活性与代谢速率——<span className="font-semibold">抑菌</span>，不杀菌，只能延缓。</>
      ,
      <>② 盐渍/糖渍（高渗）：高浓度盐糖使菌体<span className="font-semibold">渗透失水</span>——咸菜、果脯的原理。</>
      ,
      <>③ 干燥/晒干：除去自由水，微生物无法利用<span className="font-semibold">水分</span>繁殖——粮食、木耳、奶粉。</>
      ,
      <>④ 巴氏消毒（62°C 30 min 或 72°C 15 s）：<span className="font-semibold">杀灭致病菌但保留风味</span>——牛奶常用；消毒后若常温放置，残存菌会重新繁殖。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>区分<span className="font-semibold">消毒（部分杀灭）、灭菌（杀灭全部包括芽孢）、防腐（抑制繁殖）</span>三个概念。</>
      ,
      <>罐头食品 = 高温灭菌 + 密封（防止再污染）；真空包装 = 缺氧抑制需氧菌，但<span className="font-semibold">厌氧的肉毒杆菌风险</span>提示真空≠绝对安全。</>
      ,
      <>"保质期"的本质：菌落数尚未达到致腐/致病水平的<span className="font-semibold">时间承诺</span>——冷藏只是把时钟调慢。</>
      ,
    ],
  },
];

type Method = 'room' | 'cold' | 'salt' | 'dry' | 'pasteur';

const METHODS: Record<Method, { label: string; note: string }> = {
  room: { label: '常温放置（对照）', note: '夏季室温 28°C，什么都不做' },
  cold: { label: '冷藏（4°C）', note: '低温抑菌——时钟调慢但不停止' },
  salt: { label: '盐渍（高渗透压）', note: '菌体渗透失水，难以繁殖' },
  dry: { label: '干燥脱水', note: '除去自由水，微生物无水可用' },
  pasteur: { label: '巴氏消毒', note: '一次性杀灭绝大多数菌，之后需冷藏' },
};

const DAYS = 8;

/** 每克样品菌落数（对数轴显示） */
export function FoodPreserveLab() {
  const [method, setMethod] = useState<Method>('room');
  const [counts, setCounts] = useState<number[]>([1000]);
  const [lastPasteurDay, setLastPasteurDay] = useState(-1);
  const day = counts.length - 1;

  const step = () => {
    if (day >= DAYS) return;
    let c = counts[counts.length - 1];
    if (method === 'room') c *= 1.9;
    else if (method === 'cold') c *= 1.15;
    else if (method === 'salt') c *= 0.85;
    else if (method === 'dry') c *= 0.9;
    else c = lastPasteurDay === day - 1 || lastPasteurDay === day ? c * 1.7 : c * 0.05;
    c = Math.max(1, Math.min(1e9, c));
    setCounts((prev) => [...prev, c]);
    if (method === 'pasteur') setLastPasteurDay(day + 1);
  };

  const reset = () => {
    setCounts([1000]);
    setLastPasteurDay(-1);
  };

  const W = 330;
  const H = 150;
  const X0 = 56;
  const Y0 = 200;
  const MAX_LOG = 9;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / DAYS) * W,
    y: Y0 - (Math.log10(v) / MAX_LOG) * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const cur = counts[counts.length - 1];

  const observation = (() => {
    if (day === 0)
      return `一杯巴氏奶每毫升约含 ${cur.toExponential(0)} 个细菌，常温下每天约增殖 90%。选择一种保存方法，点击「推进一天」观察 8 天内菌落数的变化（注意纵轴是对数刻度）。`;
    if (method === 'room')
      return `第 ${day} 天：常温下菌落数已达 ${cur.toExponential(1)} 个/g——指数增长让"变质"来得极快，牛奶早已酸败絮结。`;
    if (method === 'cold')
      return `第 ${day} 天：4°C 冷藏把增殖速率从每天 90% 压到 15%，菌落数 ${cur.toExponential(1)} 个/g——变质被大大推迟，但没有停止，保质期依然有限。`;
    if (method === 'salt')
      return `第 ${day} 天：高渗透压让菌体不断失水，菌落数缓慢下降到 ${cur.toExponential(1)} 个/g——咸菜、果脯能放很久就是这个原理（抑菌）。`;
    if (method === 'dry')
      return `第 ${day} 天：没有自由水，微生物"渴"得无法繁殖，菌落数 ${cur.toExponential(1)} 个/g——干燥是最古老的防腐术。`;
    return `第 ${day} 天：巴氏消毒一次性杀灭了约 95% 的细菌，但如果消毒后继续常温放置，残存菌每天 70% 地反扑，目前 ${cur.toExponential(1)} 个/g——所以"消毒后要冷藏"：杀菌与抑菌必须配合。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择保存方法（可随时切换）</p>
              <div className="grid gap-1.5">
                {(Object.keys(METHODS) as Method[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setMethod(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      method === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {METHODS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {METHODS[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={day >= DAYS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进一天（{day}/{DAYS}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              换一杯新牛奶
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前菌落：<span className="text-base font-bold text-[#b0483a]">{cur.toExponential(1)}</span> 个/g
            </div>
          </>
        }
      >
        <SceneBox label={`食品菌落动态（纵轴为对数刻度 · 当前：${METHODS[method].label}）`} heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 变质警戒线 */}
            <line x1={X0} y1={Y0 - (6 / MAX_LOG) * H} x2={X0 + W + 14} y2={Y0 - (6 / MAX_LOG) * H} stroke="#b0483a" strokeWidth="1.4" strokeDasharray="6 4" />
            <text x={X0 + W + 16} y={Y0 - (6 / MAX_LOG) * H + 4} fontSize="9" fill="#b0483a" fontWeight="600">变质警戒 10⁶</text>
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 14} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 8} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[2, 4, 6, 8].map((l) => (
              <g key={l}>
                <line x1={X0 - 4} y1={Y0 - (l / MAX_LOG) * H} x2={X0} y2={Y0 - (l / MAX_LOG) * H} stroke="#8a9a9f" strokeWidth="1" />
                <text x={X0 - 7} y={Y0 - (l / MAX_LOG) * H + 3.5} textAnchor="end" fontSize="9" fill="#8a9a9f">
                  10{['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'][l]}
                </text>
              </g>
            ))}
            {[0, 2, 4, 6, 8].map((t) => (
              <text key={t} x={X0 + (t / DAYS) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{t}天
              </text>
            ))}
            {/* 菌落曲线 */}
            <path d={line(counts)} fill="none" stroke="#b0483a" strokeWidth="3" strokeLinecap="round" />
            {counts.map((v, i) => (
              <circle key={i} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3.2" fill="#b0483a" />
            ))}
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">时间（天）</text>
            <text x="420" y="290" textAnchor="end" fontSize="9.5" fill="#799398">纵轴：每克样品菌落数（对数）</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
