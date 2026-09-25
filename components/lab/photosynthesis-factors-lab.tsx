'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>改变<span className="font-semibold">光照强度</span>、<span className="font-semibold">CO₂ 浓度</span>或<span className="font-semibold">温度</span>，观察水绵（或金鱼藻）释放气泡的速率——气泡越多，光合作用强度越大。</>,
      <>这是一个<span className="font-semibold">对照实验</span>：每次只改变一个变量（单一变量原则），其余条件保持不变。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>光照强度滑块（0~100%）和 CO₂ 浓度滑块（0~100%）。</>,
      <>观察点：光合速率 = 气泡数/分钟。只有两个因子都充足时，光合速率才能达到最大。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 先调光照强度为 0，再逐步调高——看光合速率何时"饱和"。</>,
      <>② 光照充足时，降低 CO₂ 浓度——看光合速率是否下降。</>,
      <>③ 结论：影响光合作用的外界因素主要有光照强度和 CO₂ 浓度。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>光照强度为 0 时，植物只进行<span className="font-semibold">呼吸作用</span>，释放 CO₂ 不释放 O₂。</>,
      <>CO₂ 是光合作用的<span className="font-semibold">原料</span>：CO₂ 不足会限制暗反应（C₃ 生成减少）。</>,
      <>农业应用：<span className="font-semibold">通风</span>、施用有机肥（微生物分解产生 CO₂）可提高大棚产量。</>,
    ],
  },
];

export function PhotosynthesisFactorsLab() {
  const [light, setLight] = useState(50);
  const [co2, setCo2] = useState(50);
  const rate = Math.round(((light / 100) * 0.6 + (co2 / 100) * 0.4) * 60 * Math.min(light / 100, co2 / 100 + 0.3));

  const observation = (() => {
    if (light === 0) return '光照强度为 0：植物只进行呼吸作用释放 CO₂，没有气泡产生——光合作用需要光。';
    if (co2 === 0) return 'CO₂ 浓度为 0：没有原料，暗反应无法进行——即使光照充足，光合速率也为 0。';
    if (light < 30) return `光照强度 ${light}%，CO₂ ${co2}%：光合速率 ${rate} 气泡/min——光照是限制因素，增强光照可提高光合速率。`;
    if (co2 < 30) return `光照 ${light}%，CO₂ ${co2}%：CO₂ 不足成为限制因素——增加 CO₂（通风/气肥）可提高光合速率。`;
    return `光照 ${light}%，CO₂ ${co2}%：光合速率 ${rate} 气泡/min——两个条件都充足，光合作用达到较高水平。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">光照强度：<span className="font-bold">{light}%</span></p>
              <input type="range" min={0} max={100} step={10} value={light} onChange={(e) => setLight(Number(e.target.value))} className="w-full accent-[#0e6f75]" aria-label="光照强度" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">CO₂ 浓度：<span className="font-bold">{co2}%</span></p>
              <input type="range" min={0} max={100} step={10} value={co2} onChange={(e) => setCo2(Number(e.target.value))} className="w-full accent-[#0e6f75]" aria-label="CO₂浓度" />
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              光合速率：<span className="text-base font-bold text-[#13333a]">{rate}</span> 气泡/min
              <br />
              限制因素：<span className="font-bold">{light < 30 ? '光照强度' : co2 < 30 ? 'CO₂ 浓度' : '无明显限制'}</span>
            </div>
          </>
        }
      >
        <SceneBox label="金鱼藻光合作用释放气泡（水碳中和实验装置）" heightClass="h-[300px]">
          <svg className="h-full w-full" viewBox="0 0 440 240" aria-hidden="true">
            {/* 烧杯 */}
            <path d="M110 60 L 100 210 L 280 210 L 270 60 Z" fill="#e8f2f8" stroke="#7a9a9f" strokeWidth="3" />
            {/* 水 */}
            <path d="M106 90 L 104 206 L 276 206 L 274 90 Z" fill="#d4e8f4" opacity="0.7" />
            {/* 金鱼藻 */}
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${160 + i * 36} 200 q 6 -40 ${i % 2 === 0 ? -8 : 12} -80 q 4 -20 ${i % 2 === 0 ? -6 : 8} -30`} fill="none" stroke="#3f7f3a" strokeWidth="4" strokeLinecap="round" />
            ))}
            {/* 气泡（数量=rate/10） */}
            {[...Array(Math.min(12, Math.ceil(rate / 8)))].map((_, i) => (
              <circle key={i} cx={150 + (i % 4) * 34 + (i % 3) * 8} cy={190 - ((i * 25 + Date.now() / 50) % 100)} r={3 + (i % 3)} fill="#ffffff" stroke="#7ab8d8" strokeWidth="1.4" opacity="0.85" />
            ))}
            {/* 光源 */}
            {light > 0 ? (
              <g>
                <circle cx="360" cy="80" r={10 + light / 10} fill="#f4d06a" stroke="#b5953a" strokeWidth="2.5" />
                <text x="360" y="104" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="700">灯 {light}%</text>
              </g>
            ) : (
              <text x="360" y="90" textAnchor="middle" fontSize="10" fill="#8a9a9f">灯已关</text>
            )}
            {/* CO2 标注 */}
            <text x="360" y="150" fontSize="10" fill="#59767c" fontWeight="600">CO₂ {co2}%</text>
            {/* 刻度 */}
            <text x="94" y="64" fontSize="10" fill="#59767c">烧杯</text>
            <text x="90" y="226" fontSize="10" fill="#8a9a9f">金鱼藻光合作用释放 O₂ 气泡</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
