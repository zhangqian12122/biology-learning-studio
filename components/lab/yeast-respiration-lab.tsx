'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

type Condition = 'air' | 'sealed';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>酵母菌是兼性厌氧菌：<span className="font-semibold">有氧时进行有氧呼吸（产物 CO₂ + H₂O），无氧时进行无氧呼吸（产物 CO₂ + 酒精）</span>。</>,
      <>CO₂ 使澄清石灰水<span className="font-semibold">变浑浊</span>（浑浊程度反映 CO₂ 多少：有氧组明显多于无氧组）。</>,
      <>酒精在酸性条件下与重铬酸钾反应<span className="font-semibold">橙色 → 灰绿色</span>（检测酒精的特征反应）。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：新鲜酵母菌培养液两份。</>,
      <>试剂：澄清石灰水、酸性重铬酸钾溶液；装置用通气泵 / 无菌石蜡油（隔绝空气）。</>,
      <>用具：锥形瓶×2、导管、烧杯（石灰水）。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 甲瓶持续通入空气（有氧组）；乙瓶液面加石蜡油密封（无氧组）。</>,
      <>② 两组同时培养一段时间，产生的气体分别通入澄清石灰水。</>,
      <>③ 比较两瓶石灰水变浑浊的程度（CO₂ 生成量）。</>,
      <>④ 各取培养液少许，加入酸性重铬酸钾溶液检测酒精（橙→灰绿 = 有酒精）。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>自变量是<span className="font-semibold">氧气的有无</span>；温度、培养液量与浓度、培养时间都是无关变量。</>,
      <>两组都有 CO₂（石灰水都变浑浊），但有氧组浑浊程度更大——这是常考的辨析点。</>,
      <>只有无氧组检出酒精——有氧呼吸不产生酒精。</>,
      <>若两组条件相同（都通气或都密封），实验没有对照意义（自变量未设置）。</>,
    ],
  },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function YeastRespirationLab() {
  const [step, setStep] = useState(0);
  const [condA, setCondA] = useState<Condition>('air');
  const [condB, setCondB] = useState<Condition>('sealed');
  const [culturing, setCulturing] = useState(false);
  const [grown, setGrown] = useState(false);
  const [alcoholA, setAlcoholA] = useState<null | boolean>(null);
  const [alcoholB, setAlcoholB] = useState<null | boolean>(null);

  const turbidity = (c: Condition) => (grown ? (c === 'air' ? 0.85 : 0.5) : 0);
  const sameCondition = condA === condB;

  const startCulture = () => {
    if (sameCondition) return;
    setCulturing(true);
    setGrown(false);
    setAlcoholA(null);
    setAlcoholB(null);
    setTimeout(() => setGrown(true), 2600);
  };

  const testAlcohol = (which: 'A' | 'B') => {
    if (!grown) return;
    const cond = which === 'A' ? condA : condB;
    if (which === 'A') setAlcoholA(cond === 'sealed');
    else setAlcoholB(cond === 'sealed');
  };

  const observation = (() => {
    if (sameCondition) return '⚠ 两瓶条件相同：实验没有设置自变量（氧气有无），两组结果完全一样，不构成对照。把其中一瓶改成另一种条件再开始培养。';
    if (!culturing) return '装置搭建中：给两瓶酵母菌培养液分别设定氧气条件（通气 / 密封），然后开始培养。';
    if (!grown) return '培养中……气泡正通入石灰水，观察浑浊程度的变化。';
    const lines: string[] = [];
    lines.push(
      condA === 'air'
        ? '石灰水：甲瓶（有氧）明显浑浊、乙瓶（无氧）轻度浑浊——两组都产 CO₂，但有氧组多。'
        : '石灰水：甲瓶（无氧）轻度浑浊、乙瓶（有氧）明显浑浊。',
    );
    if (alcoholA !== null || alcoholB !== null) {
      const aTxt = alcoholA === null ? '未检测' : alcoholA ? '灰绿色（有酒精）' : '橙色（无酒精）';
      const bTxt = alcoholB === null ? '未检测' : alcoholB ? '灰绿色（有酒精）' : '橙色（无酒精）';
      lines.push(`重铬酸钾检测：甲瓶 ${aTxt}，乙瓶 ${bTxt}——只有无氧组检出酒精。`);
    }
    lines.push('结论：酵母菌有氧呼吸产 CO₂ + H₂O（不产酒精），无氧呼吸产 CO₂ + 酒精。');
    return lines.join('');
  })();

  const reset = () => {
    setCulturing(false);
    setGrown(false);
    setAlcoholA(null);
    setAlcoholB(null);
    setStep(0);
  };

  const drawFlask = (x0: number, label: string, cond: Condition, turb: number, alcohol: null | boolean) => {
    const isAir = cond === 'air';
    return (
      <g key={label}>
        {/* 锥形瓶 */}
        <path d={`M${x0 - 30} 96 L${x0 - 52} 196 Q${x0 - 52} 206 ${x0 - 42} 206 L${x0 + 42} 206 Q${x0 + 52} 206 ${x0 + 52} 196 L${x0 + 30} 96`} fill="none" stroke="#9db8bd" strokeWidth="3" />
        {/* 培养液 */}
        <path d={`M${x0 - 43} 156 L${x0 - 52} 196 Q${x0 - 52} 206 ${x0 - 42} 206 L${x0 + 42} 206 Q${x0 + 52} 206 ${x0 + 52} 196 L${x0 + 43} 156 Z`} fill="#e2d8b8" opacity="0.95" />
        {/* 酵母菌小点 */}
        {[[-18, 178], [0, 186], [16, 172], [-6, 166], [22, 188], [-26, 190]].map(([dx, dy], i) => (
          <ellipse key={i} cx={x0 + dx} cy={dy} rx="3.4" ry="2.2" fill="#b8a878" />
        ))}
        {/* 石蜡油密封层 */}
        {!isAir ? <rect x={x0 - 47} y="148" width="94" height="9" fill="#d9c982" opacity="0.95" style={{ transition: 'all 0.5s ease' }} /> : null}
        {/* 通气管/气泡 */}
        {isAir ? (
          <g>
            <line x1={x0} y1="60" x2={x0} y2="150" stroke="#8aa7ad" strokeWidth="4" />
            {culturing
              ? [0, 1, 2].map((i) => (
                  <circle key={i} cx={x0 - 8 + i * 8} cy="146" r="2.6" fill="#7fb8d4" className="bio-gas" style={{ animationDelay: `${i * 0.3}s`, animationDuration: '1.4s' }} />
                ))
              : null}
          </g>
        ) : null}
        {/* 出气管到石灰水 */}
        <path d={`M${x0 + 28} 104 Q ${x0 + 60} 84 ${x0 + 78} 110 L ${x0 + 78} 150`} fill="none" stroke="#8aa7ad" strokeWidth="3.5" />
        {culturing ? (
          <circle cx={x0 + 78} cy="150" r="3" fill="#7fb8d4" className="bio-gas" style={{ animationDuration: isAir ? '1.1s' : '2.2s' }} />
        ) : null}
        {/* 石灰水烧杯 */}
        <rect x={x0 + 58} y="156" width="42" height="44" rx="4" fill="none" stroke="#9db8bd" strokeWidth="2.5" />
        <rect x={x0 + 60} y="166" width="38" height="32" fill="#dff0f5" style={{ transition: 'fill 2s ease' }} />
        <rect x={x0 + 60} y="166" width="38" height="32" fill="#cdd8d4" opacity={turb} style={{ transition: 'opacity 2.4s ease' }} />
        <text x={x0 + 79} y="216" textAnchor="middle" fontSize="9" fill="#5f7a86">
          石灰水{grown ? (turb > 0.6 ? '（明显浑浊）' : turb > 0 ? '（轻度浑浊）' : '') : ''}
        </text>

        {/* 标签 */}
        <text x={x0} y="88" textAnchor="middle" fontSize="11" fill="#4b6c73" fontWeight="700">
          {label} · {isAir ? '通气（有氧）' : '密封（无氧）'}
        </text>
        {/* 酒精检测 */}
        {alcohol !== null ? (
          <g className="bio-fade">
            <rect x={x0 - 20} y="224" width="52" height="18" rx="4" fill={alcohol ? '#7a8a76' : '#d98a3c'} />
            <text x={x0 + 6} y="236" textAnchor="middle" fontSize="8.5" fill="#ffffff" fontWeight="700">
              {alcohol ? '灰绿（+酒精）' : '橙（-酒精）'}
            </text>
          </g>
        ) : (
          <text x={x0 + 6} y="236" textAnchor="middle" fontSize="9" fill="#9ab0b5">
            酒精未检测
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">甲瓶条件</p>
              <div className="grid grid-cols-2 gap-1.5">
                <button type="button" disabled={culturing} onClick={() => setCondA('air')} aria-pressed={condA === 'air'} className={`${cnChip(condA === 'air')} disabled:cursor-not-allowed disabled:opacity-40`}>
                  💨 持续通气
                </button>
                <button type="button" disabled={culturing} onClick={() => setCondA('sealed')} aria-pressed={condA === 'sealed'} className={`${cnChip(condA === 'sealed')} disabled:cursor-not-allowed disabled:opacity-40`}>
                  🕯️ 石蜡油密封
                </button>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">乙瓶条件</p>
              <div className="grid grid-cols-2 gap-1.5">
                <button type="button" disabled={culturing} onClick={() => setCondB('air')} aria-pressed={condB === 'air'} className={`${cnChip(condB === 'air')} disabled:cursor-not-allowed disabled:opacity-40`}>
                  💨 持续通气
                </button>
                <button type="button" disabled={culturing} onClick={() => setCondB('sealed')} aria-pressed={condB === 'sealed'} className={`${cnChip(condB === 'sealed')} disabled:cursor-not-allowed disabled:opacity-40`}>
                  🕯️ 石蜡油密封
                </button>
              </div>
            </div>
            <button
              type="button"
              disabled={sameCondition || culturing}
              onClick={startCulture}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {sameCondition ? '⚠ 两瓶条件相同，无法对照' : '开始培养'}
            </button>
            <div className="grid grid-cols-2 gap-1.5">
              <button type="button" disabled={!grown || alcoholA !== null} onClick={() => testAlcohol('A')} className={`${cnChip(false)} disabled:cursor-not-allowed disabled:opacity-40`}>
                甲瓶检酒精
              </button>
              <button type="button" disabled={!grown || alcoholB !== null} onClick={() => testAlcohol('B')} className={`${cnChip(false)} disabled:cursor-not-allowed disabled:opacity-40`}>
                乙瓶检酒精
              </button>
            </div>

            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              换新培养液重做
            </button>

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              重铬酸钾检测酒精：橙 → 灰绿 = 有酒精（酸性条件）。石灰水浑浊程度比较 CO₂ 量。
            </div>
          </>
        }
      >
        <SceneBox label="两组酵母菌呼吸装置" heightClass="h-[300px]">
          <svg className="h-full w-full" viewBox="0 0 440 268" aria-hidden="true">
            {drawFlask(120, '甲瓶', condA, turbidity(condA), alcoholA)}
            {drawFlask(330, '乙瓶', condB, turbidity(condB), alcoholB)}
            {!culturing ? (
              <text x="220" y="26" textAnchor="middle" fontSize="10" fill="#799398">
                装置搭建中——设定两瓶氧气条件后开始培养
              </text>
            ) : !grown ? (
              <text x="220" y="26" textAnchor="middle" fontSize="10" fill="#398086" fontWeight="600">
                培养中……观察石灰水变化
              </text>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
