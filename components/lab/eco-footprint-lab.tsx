'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '什么是生态足迹',
    lines: [
      <>生态足迹：维持一个人的<span className="font-semibold">资源消费与废物吸收</span>所需的生物生产性土地和水域面积（单位：全球公顷 gha）。</>
      ,
      <>生态承载力：地球能提供的可再生资源与消纳废物的能力。当前人类总足迹 ≈ <span className="font-semibold">1.7 个地球</span>——透支中！</>
      ,
      <>足迹的四大组成：<span className="font-semibold">食物（碳足迹+农田）· 住房（能源·建材）· 交通（化石燃料）· 商品与服务</span>。</>
      ,
    ],
  },
  {
    title: '哪些选择"最占地方"',
    lines: [
      <>肉食的足迹远高于素食：<span className="font-semibold">生产 1 kg 牛肉约需 25 kg 饲料</span>——能量流动逐级递减 10%~20% 的直接体现。</>
      ,
      <>交通方式差异巨大：私家车人均碳排放可数十倍于公交/步行。</>
      ,
      <>减少浪费（食物·衣物）与延长物品使用寿命，是"隐形"的大幅减排。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>生态足迹与碳足迹的关系：碳足迹（吸收 CO₂ 所需的林地）通常占个人足迹的<span className="font-semibold">一半以上</span>。</>
      ,
      <>计算的意义：把抽象的"环保"变成<span className="font-semibold">可量化的地球份额</span>——比较不同生活方式的可持续性。</>
      ,
      <>联系课本：能量流动逐级递减 → 营养级越高"足迹"越大 → 植食为主的膳食结构更"节约地球"。</>
      ,
    ],
  },
];

type Food = 'veg' | 'mixed' | 'meat';
type Transport = 'walk' | 'bus' | 'car';

const FOOD_OPTS: Record<string, { label: string; value: number }> = {
  veg: { label: '素食为主', value: 1.2 },
  mixed: { label: '少量肉食', value: 2.0 },
  meat: { label: '顿顿有肉', value: 3.2 },
};
const TRANS_OPTS: Record<string, { label: string; value: number }> = {
  walk: { label: '步行/骑行/公交', value: 0.6 },
  bus: { label: '公交+偶尔打车', value: 1.4 },
  car: { label: '私家车通勤', value: 2.6 },
};

export function EcoFootprintLab() {
  const [food, setFood] = useState<keyof typeof FOOD_OPTS>('mixed');
  const [transport, setTransport] = useState<keyof typeof TRANS_OPTS>('bus');
  const [goods, setGoods] = useState(1.2); // 商品与服务足迹
  const [housing, setHousing] = useState(1.0); // 住房足迹

  const total = FOOD_OPTS[food].value + TRANS_OPTS[transport].value + goods + housing;
  const earths = total / 1.6; // 人均可用约 1.6 gha

  const observation = (() => {
    const n = earths.toFixed(1);
    if (earths <= 1.6)
      return `你的生态足迹约 ${total.toFixed(1)} 全球公顷——在地球人均承载力（1.6 gha）之内！素食/低碳交通的选择让"足迹"保持可持续。`;
    if (earths <= 2.5)
      return `你的生态足迹约 ${total.toFixed(1)} 全球公顷，需要 ${n} 个地球。主要"大头"在${FOOD_OPTS[food].value > 2 ? '肉食' : '交通'}——调整这两项，足迹可显著下降。`;
    return `你的生态足迹高达 ${total.toFixed(1)} 全球公顷——需要 ${n} 个地球才能支撑！顿顿有肉+私家车是"足迹大户"：能量流动逐级递减决定了肉食的"隐性成本"极高。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">饮食选择</p>
              <div className="grid gap-1.5">
                {(Object.keys(FOOD_OPTS) as (keyof typeof FOOD_OPTS)[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFood(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      food === id ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {FOOD_OPTS[id].label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">交通方式</p>
              <div className="grid gap-1.5">
                {(Object.keys(TRANS_OPTS) as (keyof typeof TRANS_OPTS)[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTransport(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      transport === id ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {TRANS_OPTS[id].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              生态足迹：<span className="text-base font-bold text-[#b0483a]">{total.toFixed(1)}</span> gha
              <br />
              ≈ <span className="font-semibold text-[#0e6f75]">{earths.toFixed(1)}</span> 个地球（人均承载力 1.6）
            </div>
          </>
        }
      >
        <SceneBox label="你的生态足迹构成（全球公顷 gha）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => {
              const rows = [
                { label: '食物', v: FOOD_OPTS[food].value, c: '#3f7f3a' },
                { label: '交通', v: TRANS_OPTS[transport].value, c: '#4d7ea8' },
                { label: '住房', v: housing, c: '#8a671b' },
                { label: '商品服务', v: 1.2, c: '#7a4a8a' },
              ];
              const row = rows[i];
              const y = 60 + i * 44;
              const w = row.v * 90;
              return (
                <g key={row.label}>
                  <text x="40" y={y + 16} fontSize="11" fill="#37585f" fontWeight="700">{row.label}</text>
                  <rect x="120" y={y} width={Math.min(260, w)} height="26" rx="6" fill={row.c} opacity="0.85" />
                  <text x={128 + Math.min(260, w)} y={y + 18} fontSize="10.5" fill="#37585f" fontWeight="700">{row.v.toFixed(1)}</text>
                </g>
              );
            })}
            {/* 地球对照 */}
            <g>
              <circle cx="400" cy="76" r="16" fill="#e8e4d8" stroke="#8a9a9f" strokeWidth="2" />
              <text x="400" y="80" textAnchor="middle" fontSize="9" fill="#5a6a5a" fontWeight="700">1 地球</text>
              <text x="60" y="248" fontSize="10.5" fill="#799398">
                {earths <= 1.6
                  ? '✓ 可持续：足迹小于人均承载力'
                  : `✗ 超支：需要 ${earths.toFixed(1)} 个地球（超出 ${(earths - 1).toFixed(1)} 倍）`}
              </text>
            </g>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
