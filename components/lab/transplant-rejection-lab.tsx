'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（器官移植与免疫排斥）',
    lines: [
      <>器官移植的最大障碍是<span className="font-semibold">免疫排斥</span>：受体的免疫系统会把供体器官的<span className="font-semibold">HLA（人类白细胞抗原）</span>当作"非己"成分攻击。</>
      ,
      <>HLA 是人群体内最"多变"的基因系统（数百种等位基因组合）——除同卵双胞胎外，几乎找不到 HLA 完全相同的两个人。</>
      ,
      <>应对策略：<span className="font-semibold">配型（HLA 尽量相近）+ 免疫抑制药物</span>（如环孢素，抑制 T 细胞活化）——在"排斥"与"感染"之间找平衡。</>
      ,
    ],
  },
  {
    title: '排斥的类型',
    lines: [
      <>超急性排斥（数分钟~数小时）：受体内已有预存抗体，血管迅速堵塞——器官"当场失效"。</>
      ,
      <>急性排斥（数天~数月）：T 细胞识别并攻击移植器官——免疫抑制剂可控制。</>
      ,
      <>慢性排斥（数月~数年）：慢性炎症使血管硬化、器官纤维化——目前最难预防。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>骨髓移植最"挑剔"：移植的造血干细胞本身是免疫细胞——<span className="font-semibold">双向排斥</span>（宿主抗移植物 + 移植物抗宿主 GVHD）。</>
      ,
      <>联系课本：排斥反应的本质是<span className="font-semibold">细胞免疫为主、体液免疫为辅</span>——T 细胞是"主角"（与本站 CAR-T 实验互参）。</>
      ,
      <>伦理与前沿：器官来源短缺 → 异种移植（基因编辑猪心脏已进入临床尝试）与人工器官研究。</>
      ,
    ],
  },
];

type Match = 'high' | 'partial' | 'poor';

const MATCHES: Record<Match, { label: string; note: string; risk: string }> = {
  high: { label: 'HLA 高配型（同胞全相合）', note: '供受体 HLA 完全相同', risk: '排斥风险低 · 预后最好' },
  partial: { label: 'HLA 半相合（亲属）', note: '一半 HLA 相同（父母/子女）', risk: '需要更强的免疫抑制方案' },
  poor: { label: '随机供体（配型差）', note: 'HLA 差异大', risk: '排斥与 GVHD 风险高' },
};

export function TransplantRejectionLab() {
  const [match, setMatch] = useState<Match>('high');
  const cur = MATCHES[match];

  const observation = (() => {
    if (match === 'high')
      return 'HLA 全相合（如同卵双胞胎或全相合同胞供体）：受体免疫系统"认不出"器官是外来的——排斥风险最低，长期预后最好。这就是为什么骨髓移植要优先在兄弟姐妹中寻找全相合供者。';
    if (match === 'partial')
      return '半相合（如父母与子女之间）：一半 HLA 相同。需要更强效的免疫抑制方案和精细的"处理移植物"技术——现代半相合移植技术已让"人人都有供者"成为可能。';
    return '配型差异大：受体 T 细胞把移植器官"看"成异物，猛烈攻击——急性排斥反复发作、移植物功能快速丧失。结论：配型越相近，移植成功率越高。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择供体配型</p>
              <div className="grid gap-1.5">
                {(Object.keys(MATCHES) as Match[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setMatch(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      match === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {MATCHES[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {MATCHES[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              风险评估：<span className="font-semibold text-[#0e6f75]">{cur.risk}</span>
            </div>
          </>
        }
      >
        <SceneBox label="器官移植：HLA 配型与免疫排斥" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 供体器官 */}
            <rect x="46" y="56" width="130" height="90" rx="12" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.4" />
            <path d="M111 76 q -28 18 -22 44 q 20 14 44 -4 q 12 -30 -22 -40 Z" fill="#c94a4a" stroke="#8a2020" strokeWidth="2.2" />
            <text x="111" y="162" textAnchor="middle" fontSize="10" fill="#8a3a2a" fontWeight="700">供体器官</text>
            <text x="111" y="180" textAnchor="middle" fontSize="9" fill="#a5533c">HLA 型别：供体</text>
            {/* 受体 */}
            <rect x="270" y="56" width="130" height="90" rx="12" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.4" />
            <text x="335" y="82" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">受体（患者）</text>
            <text x="335" y="104" textAnchor="middle" fontSize="9" fill="#59767c">HLA 型别：受体</text>
            <text x="335" y="126" textAnchor="middle" fontSize="9" fill="#59767c">T 细胞"巡逻中"</text>
            <path d="M180 100 h 84 m 0 0 l -8 -5 m 8 5 l -8 5" fill="none" stroke="#5a7a8a" strokeWidth="2" />
            {/* 配型对比 */}
            <rect x="46" y="160" width="360" height="60" rx="10" fill={match === 'high' ? '#e2f0e2' : match === 'partial' ? '#fdf1cf' : '#f4e0e0'} stroke={match === 'high' ? '#3f7f3a' : match === 'partial' ? '#8a671b' : '#a54838'} strokeWidth="2.4" />
            <text x="226" y="184" textAnchor="middle" fontSize="11" fontWeight="800" fill={match === 'high' ? '#2f6f2a' : match === 'partial' ? '#8a671b' : '#8a3a2a'}>
              {match === 'high' ? 'HLA 一致 → 免疫系统"认不出"外来器官' : match === 'partial' ? 'HLA 半相合 → 需强免疫抑制维持' : 'HLA 差异大 → 急性排斥几乎必然'}
            </text>
            <text x="226" y="206" textAnchor="middle" fontSize="9.5" fill="#59767c">
              {match === 'high' ? '长期存活率高' : match === 'partial' ? '需终身服用免疫抑制剂' : '一般不作首选（除自体/同基因移植外）'}
            </text>
            {/* 免疫抑制药说明 */}
            <rect x="40" y="206" width="360" height="0" rx="0" fill="none" />
            <text x="220" y="248" textAnchor="middle" fontSize="10.5" fill="#799398">免疫抑制药（如环孢素）抑制 T 细胞活化——"安抚"免疫系统的"哨兵"</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
