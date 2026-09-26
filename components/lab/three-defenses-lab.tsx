'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（三道防线）',
    lines: [
      <>第一道防线：<span className="font-semibold">皮肤与黏膜</span>——物理阻挡 + 分泌物杀菌（乳酸·溶菌酶）+ 纤毛清扫，是生来就有的屏障。</>
      ,
      <>第二道防线：体液中的<span className="font-semibold">杀菌物质（溶菌酶）与吞噬细胞</span>——溶解、吞噬突破屏障的病原体。前两道是<span className="font-semibold">非特异性免疫</span>：生来就有、对多种病原体都起作用。</>
      ,
      <>第三道防线：<span className="font-semibold">特异性免疫</span>——体液免疫（B 细胞→抗体）与细胞免疫（T 细胞），只针对特定病原体，且产生记忆细胞。</>
      ,
    ],
  },
  {
    title: '病原体的"战术"',
    lines: [
      <>流感病毒：飞沫传播、突破呼吸道黏膜（第一道）、引发特异性免疫（第三道主力）。</>
      ,
      <>伤口细菌：直接突破皮肤（第一道失守），由吞噬细胞与溶菌酶（第二道）+ 特异性免疫接力围剿。</>
      ,
      <>寄生ｃｈｕｎ虫（如蛔虫）：体表屏障难以阻挡——需要第三道防线的"定点清除"。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>非特异性 vs 特异性：前者<span className="font-semibold">生来就有、作用范围广</span>；后者<span className="font-semibold">后天形成、专一性强</span>——记忆细胞是"二次免疫"更快更强的关键。</>
      ,
      <>第一、二道防线是<span className="font-semibold">非特异性免疫</span>；第三道防线（体液免疫+细胞免疫）才是特异性免疫。</>
      ,
      <>艾滋病（HIV）攻击的就是第三道防线的 T 细胞——防线"指挥官"被摧毁，各种感染趁虚而入。</>
      ,
    ],
  },
];

type Pathogen = 'flu' | 'staph' | 'worm';

const PATHOGENS: Record<Pathogen, { label: string; note: string; lines: [string, string, string] }> = {
  flu: {
    label: '流感病毒（飞沫传播）',
    note: '从呼吸道吸入',
    lines: ['第一道：鼻黏膜纤毛清扫·黏液拦截（部分）', '第二道：吞噬细胞吞噬（辅助）', '第三道：体液免疫+细胞免疫主力清除'],
  },
  staph: {
    label: '伤口感染（金黄色葡萄球菌）',
    note: '从皮肤破口进入',
    lines: ['第一道：皮肤已破损（失守）', '第二道：吞噬细胞+溶菌酶围剿', '第三道：浆细胞产生抗体精准清剿'],
  },
  worm: {
    label: '蛔虫（消化道寄生）',
    note: '随食物误食虫卵',
    lines: ['第一道：胃酸杀灭部分虫卵', '第二道：作用有限（虫体太大）', '第三道：嗜酸性粒细胞攻击·排出'],
  },
};

export function ThreeDefensesLab() {
  const [pathogen, setPathogen] = useState<Pathogen>('flu');
  const [wave, setWave] = useState(0);
  const cur = PATHOGENS[pathogen];

  const observation = (() => {
    if (wave === 0)
      return '病原体大军压境！三道防线依次设防：第一道皮肤黏膜是"城墙"，第二道吞噬细胞是"巡逻兵"，第三道特异性免疫是"精确制导部队"。选择一种病原体，点击"发起进攻"看防线如何运作。';
    if (pathogen === 'flu')
      return '流感病毒走"空降路线"：鼻黏膜纤毛先拦截一部分，漏网的由吞噬细胞吞食，但彻底清除要靠第三道防线——B 细胞产生抗体中和病毒、T 细胞消灭被感染的细胞。发烧就是免疫战的"副产物"。';
    if (pathogen === 'staph')
      return '金黄色葡萄球菌从伤口"破墙而入"：第一道防线已失守，但第二道防线的吞噬细胞立刻赶到"肉搏"，浆细胞产生的抗体随后精准围剿——伤口红肿化脓就是战场"硝烟"。';
    return '蛔虫走"混入路线"随食物进入消化道：虫体太大，吞噬细胞"吃不动"，主要靠第三道防线中的嗜酸性粒细胞围攻排出——并刺激肠道蠕动加速驱赶。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择病原体</p>
              <div className="grid gap-1.5">
                {(Object.keys(PATHOGENS) as Pathogen[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => { setPathogen(id); setWave(0); }}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      pathogen === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {PATHOGENS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {PATHOGENS[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setWave((w) => w + 1)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              🦠 发起进攻（第 {wave + 1} 波）
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              三道防线：<span className="font-semibold">皮肤黏膜 → 吞噬杀菌 → 特异性免疫</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">前两道生来就有 · 第三道后天获得</span>
            </div>
          </>
        }
      >
        <SceneBox label={`病原体入侵路径：${cur.label}`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 三道防线示意 */}
            {[0, 1, 2].map((i) => {
              const y = 50 + i * 66;
              const colors = [['#e8c8c8', '#a54838'], ['#fdf1cf', '#8a671b'], ['#e2f0e2', '#3f7f3a']][i];
              const labels = ['第一道：皮肤·黏膜屏障', '第二道：体液杀菌·吞噬细胞', '第三道：特异性免疫（抗体+效应T）'];
              const passed = i < wave || (wave === 0 && false);
              return (
                <g key={i}>
                  <rect x="60" y={y} width="320" height="52" rx="10" fill={colors[0]} stroke={colors[1]} strokeWidth="2.4" />
                  <text x="220" y={y + 24} textAnchor="middle" fontSize="11.5" fill={colors[1]} fontWeight="800">{labels[i]}</text>
                  <text x="220" y={y + 44} textAnchor="middle" fontSize="9.5" fill={colors[1]}>{cur.lines[i]}</text>
                </g>
              );
            })}
            {/* 病原体 */}
            <g>
              <circle cx="48" cy="76" r="10" fill="#b0483a" stroke="#8a2020" strokeWidth="2" />
              <path d="M40 68 l -6 -6 m 8 4 l -8 -2 m 10 10 l -6 8" stroke="#b0483a" strokeWidth="2" strokeLinecap="round" />
              <text x="24" y="104" fontSize="9" fill="#8a2020" fontWeight="700">病原体</text>
            </g>
            <text x="220" y="248" textAnchor="middle" fontSize="10.5" fill="#799398">
              {wave > 0 ? `${cur.label}：三道防线依次拦截` : '选择病原体后点击"发起进攻"'}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
