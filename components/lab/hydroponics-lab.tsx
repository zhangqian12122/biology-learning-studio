'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（溶液培养法）',
    lines: [
      <>用<span className="font-semibold">完全营养液</span>（含全部必需矿质元素）水培植物作对照，另设<span className="font-semibold">缺某一种元素</span>的培养组——若植物出现症状，即证明该元素是必需的。</>
      ,
      <>这是研究"植物必需矿质元素"的<span className="font-semibold">溶液培养法（水培法）</span>：人工控制变量、排除土壤干扰——19 世纪由此确定了 16 种（现新增镍共 17 种）必需元素。</>
      ,
      <>症状出现的<span className="font-semibold">新老叶位置</span>是关键线索：能被再利用的元素（N、P、Mg、K）缺素症先出现在<span className="font-semibold">老叶</span>；难移动的元素（Fe、Ca）先出现在<span className="font-semibold">新叶</span>。</>
      ,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 配制完全营养液与分别缺 N、缺 Mg、缺 Fe 的缺素培养液。</>
      ,
      <>② 选取长势一致的幼苗，洗净根系后分别移入各培养瓶。</>
      ,
      <>③ 通气、调 pH、每周换液，光照与温度保持一致（无关变量控制）。</>
      ,
      <>④ 培养 2~3 周，观察记录各组的生长量、叶色与症状部位。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>缺氮：植株矮小瘦弱、<span className="font-semibold">老叶先发黄</span>（氮可移动、流向新叶）——"氮促叶"。</>
      ,
      <>缺镁：<span className="font-semibold">老叶叶脉间失绿</span>（叶脉仍绿）——镁是叶绿素的中心原子，可被拆走再利用。</>
      ,
      <>缺铁：<span className="font-semibold">新叶先黄化</span>（铁难移动、新叶"断供"）——与缺氮的症状位置正好相反。</>
      ,
      <>应用：<span className="font-semibold">无土栽培</span>（营养液精准供肥）正是本实验的工程化——种蔬菜不靠土，靠的是配比。</>
      ,
    ],
  },
];

type Group = 'complete' | 'noN' | 'noMg' | 'noFe';

const GROUPS: Record<Group, { label: string; note: string; height: number; leafColor: string; oldFirst: boolean }> = {
  complete: { label: '完全营养液（对照）', note: '全部必需元素齐全', height: 150, leafColor: '#4a9a3a', oldFirst: false },
  noN: { label: '缺氮（-N）', note: '矮小·老叶均匀发黄', height: 88, leafColor: '#c9c05a', oldFirst: true },
  noMg: { label: '缺镁（-Mg）', note: '老叶叶脉间失绿（脉仍绿）', height: 108, leafColor: '#b8c97a', oldFirst: true },
  noFe: { label: '缺铁（-Fe）', note: '新叶发黄·老叶仍绿', height: 112, leafColor: '#d8c86a', oldFirst: false },
};

const WEEKS = 2;

export function HydroponicsLab() {
  const [week, setWeek] = useState(0);
  const [group, setGroup] = useState<Group>('complete');
  const cur = GROUPS[group];

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择培养组</p>
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
                    <span className="ml-1 font-normal text-[#799398]">· {GROUPS[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setWeek((w) => Math.min(WEEKS, w + 1))}
              disabled={week >= WEEKS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 培养一周（{week}/{WEEKS}）
            </button>
            <button
              type="button"
              onClick={() => setWeek(0)}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              重新育苗
            </button>
          </>
        }
      >
        <SceneBox label={`缺素症状：${cur.label}`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 培养瓶 */}
            <path d="M120 250 q -14 0 -14 -14 q 0 -60 14 -86 q 10 -18 10 -34 l 0 -8 h 140 l 0 8 q 0 16 10 34 q 14 26 14 86 q 0 14 -14 14 Z" fill="#dceaea" stroke="#5a7a8a" strokeWidth="2.6" />
            <path d="M108 196 h 204" stroke="#8ab4c9" strokeWidth="2" opacity="0.7" />
            <text x="210" y="240" textAnchor="middle" fontSize="10.5" fill="#59767c">{cur.label}</text>
            {/* 幼苗 */}
            {(() => {
              const stemH = 30 + (cur.height * week) / 2;
              const top = 210 - stemH;
              const newColor = week === 0 ? '#4a9a3a' : group === 'noFe' ? '#d8c86a' : cur.leafColor;
              const oldColor = week === 0 ? '#4a9a3a' : group === 'complete' ? '#4a9a3a' : group === 'noFe' ? '#4a9a3a' : cur.leafColor;
              return (
                <g>
                  <path d={`M210 210 v ${-stemH}`} stroke={oldColor} strokeWidth="5" strokeLinecap="round" />
                  {/* 老叶（下） */}
                  <ellipse cx={186} cy={210 - stemH * 0.35} rx="26" ry="9" fill={oldColor} stroke="#2f6f2a" strokeWidth="1.6" />
                  <ellipse cx={234} cy={210 - stemH * 0.35} rx="26" ry="9" fill={oldColor} stroke="#2f6f2a" strokeWidth="1.6" />
                  {/* 新叶（顶） */}
                  <ellipse cx={196} cy={top + 4} rx="20" ry="7" fill={newColor} stroke="#2f6f2a" strokeWidth="1.6" />
                  <ellipse cx={224} cy={top + 4} rx="20" ry="7" fill={newColor} stroke="#2f6f2a" strokeWidth="1.6" />
                  {week === 2 ? (
                    <g>
                      <text x="300" y={top + 30} fontSize="10.5" fill="#8a671b" fontWeight="700">
                        {group === 'noN' ? '植株矮小·老叶发黄' : group === 'noMg' ? '老叶脉间失绿' : group === 'noFe' ? '新叶发黄（老叶仍绿）' : '生长健壮'}
                      </text>
                      <line x1={296} y1={top + 27} x2={240} y2={top + 8} stroke="#8a671b" strokeWidth="1.2" strokeDasharray="3 3" />
                    </g>
                  ) : null}
                </g>
              );
            })()}
            {/* 症状解读 */}
            <g>
              <rect x="40" y="30" width="170" height="70" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
              <text x="125" y="52" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="800">看部位 = 判断元素</text>
              <text x="125" y="72" textAnchor="middle" fontSize="9.5" fill="#a5761d">老叶先病：N·P·Mg·K（可移动）</text>
              <text x="125" y="90" textAnchor="middle" fontSize="9.5" fill="#a5761d">新叶先病：Fe·Ca（难移动）</text>
            </g>
            <text x="420" y="240" textAnchor="end" fontSize="9.5" fill="#799398">{cur.note}</text>
          </svg>
        </SceneBox>

        <ObservationNote>
          {week === 0
            ? '四组幼苗刚移入培养液，长势一致。选择一组培养液，推进培养时间，观察缺素症状出现在哪些部位——症状的位置比症状本身更有诊断价值。'
            : group === 'complete'
              ? '对照组生长健壮、叶色浓绿——证明培养液配方没有问题，其他组出现的症状确实源于"缺什么"。'
              : group === 'noN'
                ? '缺氮组植株矮小、下部老叶均匀发黄：氮是可再利用元素，老叶中的氮被"抽调"供给新叶生长——所以症状从老叶开始（氮促叶）。'
                : group === 'noMg'
                  ? '缺镁组老叶叶脉间失绿而叶脉仍绿：镁是叶绿素卟啉环的中心原子，被拆走后老叶只剩"绿色骨架"。这也是可移动元素——症状在老叶。'
                  : '缺铁组顶端新叶黄化、而老叶依旧浓绿：铁在植物体内难移动、被新叶"截留"后老叶反而没事——与缺氮的症状位置正好相反。'}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
