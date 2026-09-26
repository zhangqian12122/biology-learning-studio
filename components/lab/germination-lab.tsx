'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（种子萌发的条件）',
    lines: [
      <>种子萌发需要<span className="font-semibold">自身条件</span>（胚完整、有活力、不处于休眠）与<span className="font-semibold">外界条件</span>（适宜温度、一定的水分、充足的空气）。</>
      ,
      <>缺一不可——用<span className="font-semibold">对照实验</span>逐一验证：每组只改变一个条件（单一变量），其余条件相同。</>
      ,
      <>注意：阳光不是多数种子萌发的必要条件（土壤中的种子本来就没光）——常见误区。</>
      ,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 取 4 组烧杯，各放 10 粒饱满的大豆种子，瓶底垫纸巾。</>
      ,
      <>② 设置变量：A 组（温水·通气·常温，对照）；B 组缺水；C 组水淹没（无空气）；D 组低温（冰箱）。</>
      ,
      <>③ 每天观察记录萌发数量，一周后统计比较——"只差一个条件"的组间差异才是有效结论。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>每组 10 粒而不是 1 粒——避免<span className="font-semibold">偶然性</span>（一粒可能恰好是坏种子）；这是"重复实验"的思想。</>
      ,
      <>A 组是<span className="font-semibold">对照组</span>（正常条件），其余组是<span className="font-semibold">实验组</span>——变量唯一才能归因。</>
      ,
      <>种子萌发时<span className="font-semibold">不施肥</span>：萌发靠自身储存的有机物（子叶或胚乳），不需外界矿质营养。</>
      ,
    ],
  },
];

type Group = 'all' | 'dry' | 'flooded' | 'cold';

const GROUPS: Record<Group, { label: string; note: string; sprouted: number }> = {
  all: { label: 'A 组：全部条件适宜', note: '水 ✓ · 空气 ✓ · 25°C ✓', sprouted: 10 },
  dry: { label: 'B 组：干燥（缺水）', note: '只差"水分"这一个条件', sprouted: 0 },
  flooded: { label: 'C 组：水没过种子（缺氧）', note: '只差"空气"这一个条件', sprouted: 1 },
  cold: { label: 'D 组：低温（4°C 冰箱）', note: '只差"适宜温度"这一个条件', sprouted: 0 },
};

export function GerminationLab() {
  const [group, setGroup] = useState<Group>('all');
  const cur = GROUPS[group];

  const observation = (() => {
    if (group === 'all')
      return 'A 组（对照组）：种子吸水膨胀，酶被激活，胚根突破种皮——10 粒全部萌发。它是"标准答案"，其他组与它的差异就说明"缺了什么条件"。';
    if (group === 'dry')
      return 'B 组（干燥）：一粒也没有萌发——没有水，胚里的酶无法"开工"，储存的养分不能被利用。水分是萌发的第一个"开关"。';
    if (group === 'flooded')
      return 'C 组（水完全淹没）：几乎不萌发——水把空气"挤"走了，种子泡在水里会腐烂而不是发芽。种子萌发需要"充足的空气"。';
    return 'D 组（低温）：冰箱里的种子静静"沉睡"——温度太低，酶的活性不够，代谢几乎停滞。适宜的温度是萌发的第三个必要条件。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择实验组（单一变量对照）</p>
              <div className="grid gap-1.5">
                {(Object.keys(GROUPS) as Group[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setGroup(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      group === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {GROUPS[id].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              萌发数：<span className="text-base font-bold text-[#b0483a]">{cur.sprouted}</span> / 10 粒
              <br />
              {cur.note}
            </div>
          </>
        }
      >
        <SceneBox label={`种子萌发对照实验：${cur.label}`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 四组培养皿 */}
            {(['all', 'dry', 'flooded', 'cold'] as Group[]).map((id, i) => {
              const x = 50 + i * 95;
              const g = GROUPS[id];
              const active = group === id;
              const n = g.sprouted;
              return (
                <g key={id}>
                  <ellipse cx={x + 40} cy={160} rx="40" ry="12" fill={active ? '#d8e8b0' : '#e8e8e0'} stroke={active ? '#4a8a3a' : '#b0b0a8'} strokeWidth={active ? 2.6 : 1.8} />
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
                    <ellipse key={s} cx={x + 14 + (s % 5) * 14} cy={152 + Math.floor(s / 5) * 12} rx="4.5" ry="3.4" fill={s < g.sprouted ? '#7ab84a' : '#c9b88a'} stroke={s < g.sprouted ? '#4a7a2a' : '#a5966a'} strokeWidth="1.2" />
                  ))}
                  {g.sprouted > 0 ? (
                    [0, 1, 2, 3].map((s) => (
                      <path key={`m${s}`} d={`M${x + 12 + s * 8} ${148} q 2 -8 8 -10`} fill="none" stroke={active ? '#5a9a3a' : '#b0b0a8'} strokeWidth="2.2" strokeLinecap="round" />
                    ))
                  ) : null}
                  <text x={x + 40} y={196} textAnchor="middle" fontSize="9" fill={active ? '#2f6f2a' : '#8a8a80'} fontWeight={active ? 800 : 500}>
                    {['水✓气✓温✓', '缺水', '缺氧', '低温'][id === 'all' ? 0 : id === 'dry' ? 1 : id === 'flooded' ? 2 : 3]}
                  </text>
                </g>
              );
            })}
            {/* 说明 */}
            <text x="220" y="60" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">对照实验：每组"只差一个条件"</text>
            <text x="220" y="230" textAnchor="middle" fontSize="10.5" fill="#799398">萌发三条件：适宜温度 · 一定的水分 · 充足的空气（阳光不是必需）</text>
            <text x="220" y="248" textAnchor="middle" fontSize="10" fill="#9ab0b5">点击左侧按钮切换不同条件组</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
