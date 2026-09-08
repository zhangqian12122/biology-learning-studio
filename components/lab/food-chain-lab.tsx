'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（营养结构）',
    lines: [
      <>食物链反映<span className="font-semibold">吃与被吃</span>的关系，起点一定是<span className="font-semibold">生产者（绿色植物）</span>，箭头指向捕食者（能量流动方向）。</>,
      <>食物链上的每一个环节叫一个<span className="font-semibold">营养级</span>：生产者是第一营养级，直接吃生产者的是初级消费者（第二营养级）……</>,
      <>能量沿食物链逐级递减，传递效率约 <span className="font-semibold">10%~20%</span>——所以营养级一般不超过 5 个。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>生物池里有 8 种生物，其中混有"捣乱者"（分解者蘑菇、非本链生物）。</>,
      <>每选对一个环节，链条延长一格并标出营养级；选错则提示"不被上一种捕食"。</>,
      <>观察点：完整食物链上每个营养级获得的能量递减。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 从"草"开始，依次点击下一个取食者，搭建完整食物链。</>,
      <>② 观察每个营养级的能量数字如何递减（×10%~20%）。</>,
      <>③ 试试点"蘑菇"或"鹰"开局——看为什么不行。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>食物链<span className="font-semibold">不包括分解者</span>（蘑菇分解遗体，不捕食活体）与非生物成分。</>,
      <>同一种生物可能占多个营养级（杂食性），所以多条食物链交织成<span className="font-semibold">食物网</span>。</>,
      <>营养级越高，生物数量与能量通常越少——"一山不容二虎"的能量学解释。</>,
    ],
  },
];

type BioId = 'grass' | 'grasshopper' | 'rabbit' | 'frog' | 'snake' | 'eagle' | 'mushroom' | 'fish';

const BIOS: Record<BioId, { name: string; icon: string; eats: BioId[]; level: number }> = {
  grass: { name: '草', icon: '🌱', eats: [], level: 1 },
  grasshopper: { name: '蚱蜢', icon: '🦗', eats: ['grass'], level: 2 },
  rabbit: { name: '兔', icon: '🐇', eats: ['grass'], level: 2 },
  frog: { name: '青蛙', icon: '🐸', eats: ['grasshopper'], level: 3 },
  snake: { name: '蛇', icon: '🐍', eats: ['frog', 'rabbit'], level: 4 },
  eagle: { name: '鹰', icon: '🦅', eats: ['snake', 'frog'], level: 5 },
  mushroom: { name: '蘑菇', icon: '🍄', eats: [], level: 0 }, // 分解者：不参与食物链
  fish: { name: '鱼', icon: '🐟', eats: [], level: 2 }, // 不在本链
};

/** 目标链：草 → 兔 → 蛇 → 鹰 */
const TARGET_CHAIN: BioId[] = ['grass', 'rabbit', 'snake', 'eagle'];
const LEVEL_NAMES = ['生产者', '初级消费者', '次级消费者', '三级消费者'];
const LEVEL_ENERGY = [100, 18, 3, 0.5]; // 相对能量（kJ·演示）

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function FoodChainLab() {
  const [chain, setChain] = useState<BioId[]>([]);
  const [hint, setHint] = useState('');
  const total = chain.length;
  const complete = total === TARGET_CHAIN.length;

  const pick = (id: BioId) => {
    if (complete) return;
    if (chain.includes(id)) {
      setHint(`链条里已经有「${BIOS[id].name}」了——同一条食物链不重复选择。`);
      return;
    }
    const expected = TARGET_CHAIN[total];
    if (id === expected) {
      setChain((prev) => [...prev, id]);
      setHint('');
    } else if (id === 'mushroom') {
      setHint('🍄 蘑菇是分解者：它分解遗体，不捕食活体——食物链不包括分解者！');
    } else if (id === 'fish') {
      setHint('🐟 鱼生活在水中，与陆上这些生物不构成捕食关系——它不是这条链的成员。');
    } else {
      const prevBio = total > 0 ? BIOS[chain[total - 1]].name : '草';
      setHint(`「${BIOS[id].name}」不被「${prevBio}」捕食——按"吃与被吃"的关系重新想想（提示：上一个的捕食者才能接上）。`);
    }
  };

  const observation = (() => {
    if (total === 0) return '从「草」开始搭建食物链：每一步选下一个"吃"它的生物。注意池子里混着分解者和"外来的"生物哦。';
    if (!complete) return `已搭建 ${total} 级。当前链：${chain.map((id) => BIOS[id].name).join(' → ')}。继续选择下一个消费者。`;
    return `完整食物链：草 → 兔 → 蛇 → 鹰。能量沿箭头逐级递减（约只剩 10%~20%），到第四营养级只余初始能量的 0.5% 左右——所以顶级捕食者（鹰）数量必然稀少。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <p className="text-sm font-medium text-[#37585f]">生物池（点选接入食物链）</p>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(BIOS) as BioId[]).map((id) => {
                const used = chain.includes(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => pick(id)}
                    className={`${cnChip(false)} flex items-center gap-1.5 ${used ? 'opacity-40' : ''}`}
                  >
                    <span aria-hidden="true">{BIOS[id].icon}</span>
                    {BIOS[id].name}
                    {used ? <span className="ml-auto text-[10px] text-[#0a626a]">✓</span> : null}
                  </button>
                );
              })}
            </div>
            <button type="button" onClick={() => { setChain([]); setHint(''); }} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              拆除重搭
            </button>
            {hint ? <div className="rounded-md border-2 border-[#e8c0a8] bg-[#fff4ec] px-3 py-2 text-xs leading-5 font-semibold text-[#a5533c]">{hint}</div> : null}
          </>
        }
      >
        <SceneBox label="你搭建的食物链（箭头 = 能量流动方向）" heightClass="h-[300px]">
          <svg className="h-full w-full" viewBox="0 0 440 240" aria-hidden="true">
            {chain.length === 0 ? (
              <text x="220" y="120" textAnchor="middle" fontSize="11.5" fill="#9ab0b5">
                点击左侧「草」开始搭建
              </text>
            ) : (
              chain.map((id, i) => {
                const x = 34 + i * 104;
                const y = 96;
                const b = BIOS[id];
                const energy = LEVEL_ENERGY[i] ?? 0;
                return (
                  <g key={`${id}-${i}`}>
                    <rect x={x} y={y} width="84" height="72" rx="12" fill="#ffffff" stroke="#13333a" strokeWidth="2.4" />
                    <text x={x + 42} y={y + 34} textAnchor="middle" fontSize="24">{b.icon}</text>
                    <text x={x + 42} y={y + 58} textAnchor="middle" fontSize="11.5" fill="#13333a" fontWeight="800">{b.name}</text>
                    <rect x={x} y={y + 78} width="84" height="24" rx="6" fill="#c8e2ba" stroke="#3f7f3a" strokeWidth="1.6" />
                    <text x={x + 42} y={y + 95} textAnchor="middle" fontSize="9.5" fill="#2f5a1e" fontWeight="700">
                      第 {i + 1} 营养级 · {LEVEL_NAMES[i]}
                    </text>
                    <text x={x + 42} y={y + 126} textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">
                      能量 ≈ {energy} kJ
                    </text>
                    {i < chain.length - 1 ? (
                      <path d={`M${x + 88} ${y + 36} L${x + 100} ${y + 36}`} fill="none" stroke="#b0483a" strokeWidth="3" markerEnd="url(#fc-arrow)" />
                    ) : null}
                  </g>
                );
              })
            )}
            {complete ? (
              <text x="220" y="226" textAnchor="middle" fontSize="11" fill="#2f7a4d" fontWeight="700">
                ✓ 四个营养级搭建完成——能量沿箭头逐级递减！
              </text>
            ) : null}
            <defs>
              <marker id="fc-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 Z" fill="#b0483a" />
              </marker>
            </defs>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
