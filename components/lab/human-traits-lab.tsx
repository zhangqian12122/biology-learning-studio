'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（人体性状调查）',
    lines: [
      <>人体有许多<span className="font-semibold">单基因控制的相对性状</span>：能否卷舌、有无耳垂、单/双眼皮、拇指能否向背侧弯曲等——显性性状由显性基因控制（AA 或 Aa），隐性性状基因型为 aa。</>
      ,
      <>班级调查就是一次真实的<span className="font-semibold">遗传学普查</span>：统计显隐性表现型的比例，再结合家系信息推测基因型——体验孟德尔"从数据到规律"的方法。</>
      ,
      <>注意：显性性状个体中，<span className="font-semibold">AA 与 Aa 无法从外表区分</span>——需要家系分析或基因检测才能确定。</>
      ,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 确定调查性状与显隐性关系（如能卷舌为显性）。</>
      ,
      <>② 全班同学互相观察记录各自的表现型。</>
      ,
      <>③ 汇总统计：显性人数、隐性人数、比例。</>
      ,
      <>④ 分析：隐性性状者基因型必为 aa；显性者需结合父母表现型推测。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>人群中显隐比例<span className="font-semibold">不一定接近 3:1</span>——3:1 是杂合子自交后代的比例；人群调查受取样与基因频率影响。</>
      ,
      <>常见误区："显性性状的人多"≠"显性基因就是好的"——显隐性只描述性状表达，无关优劣。</>
      ,
      <>常见性状的显隐性：能卷舌（显）· 有耳垂（显）· 双眼皮（显）· 拇指末端可向背侧弯曲（隐性）。</>
      ,
    ],
  },
];

type Trait = 'tongue' | 'earlobe' | 'eyelid';
type Phen = 'dom' | 'rec';

const TRAITS: Record<Trait, { label: string; dom: string; rec: string }> = {
  tongue: { label: '能否卷舌', dom: '能卷舌（显性）', rec: '不能卷舌（隐性 aa）' },
  earlobe: { label: '有无耳垂', dom: '有耳垂（显性）', rec: '无耳垂（隐性 aa）' },
  eyelid: { label: '单/双眼皮', dom: '双眼皮（显性）', rec: '单眼皮（隐性 aa）' },
};

/** 固定的 8 位"同学"基因型（每位三种性状各一） */
const STUDENTS: { name: string; g: Record<Trait, 'A' | 'a'> }[] = [
  { name: '同学 1', g: { tongue: 'A', earlobe: 'A', eyelid: 'A' } },
  { name: '同学 2', g: { tongue: 'A', earlobe: 'a', eyelid: 'a' } },
  { name: '同学 3', g: { tongue: 'a', earlobe: 'A', eyelid: 'a' } },
  { name: '同学 4', g: { tongue: 'a', earlobe: 'a', eyelid: 'A' } },
  { name: '同学 5', g: { tongue: 'A', earlobe: 'A', eyelid: 'a' } },
  { name: '同学 6', g: { tongue: 'a', earlobe: 'a', eyelid: 'a' } },
  { name: '同学 7', g: { tongue: 'A', earlobe: 'a', eyelid: 'A' } },
  { name: '同学 8', g: { tongue: 'a', earlobe: 'a', eyelid: 'A' } },
];

/** 每种性状的"另一条染色体"随机指定：偶数显性纯合概率简化为杂合/纯合混合 */
const SECOND: Record<Trait, ('A' | 'a')[]> = {
  tongue: ['a', 'A', 'a', 'a', 'a', 'a', 'A', 'a'],
  earlobe: ['A', 'a', 'A', 'a', 'A', 'a', 'a', 'a'],
  eyelid: ['a', 'a', 'a', 'a', 'A', 'a', 'a', 'a'],
};

export function HumanTraitsLab() {
  const [trait, setTrait] = useState<Trait>('tongue');
  const [surveyed, setSurveyed] = useState(false);

  const pheno = (i: number): Phen => (STUDENTS[i].g[trait] === 'A' || SECOND[trait][i] === 'A') ? 'dom' : 'rec';
  const domCount = surveyed ? [0, 1, 2, 3, 4, 5, 6, 7].filter((i) => pheno(i) === 'dom').length : 0;
  const recCount = surveyed ? 8 - domCount : 0;

  const observation = (() => {
    if (!surveyed)
      return '全班 8 位"同学"就座。选择一种性状（能否卷舌/有无耳垂/单双眼皮），点击"开展全班调查"统计显隐性人数——注意：先想清楚哪种表现是显性。';
    const rec = TRAITS[trait].rec.includes('aa');
    return `调查结果：${TRAIT_S[trait].dom} ${domCount} 人，${TRAIT_S[trait].rec} ${recCount} 人。隐性性状者（${recCount} 人）基因型必为 aa；显性性状者（${domCount} 人）可能是 AA 也可能是 Aa——需要回家调查父母表现型才能进一步推测。${rec ? '隐性性状一旦出现，其父母至少各携带一个隐性基因。' : ''}`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择调查性状</p>
              <div className="grid gap-1.5">
                {(Object.keys(TRAITS) as Trait[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTrait(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      trait === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {TRAITS[id].label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSurveyed(true)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              📋 开展全班调查
            </button>
            <button
              type="button"
              onClick={() => setSurveyed(false)}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              隐藏统计
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              显性 {domCount} 人 · 隐性 {recCount} 人
            </div>
          </>
        }
      >
        <SceneBox label={`班级性状调查：${TRAITS[trait].label}`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 8 位同学 */}
            {[0, 1, 2, 3].map((i) => {
              const p1 = surveyed ? pheno(i) : null;
              const p2 = surveyed ? pheno(i + 4) : null;
              return (
                <g key={`row${i}`}>
                  {[0, 1].map((j) => {
                    const idx = j * 4 + i;
                    const x = 100 + j * 190;
                    const y = 56 + i * 48;
                    const ph = surveyed ? (j === 0 ? p1 : p2) : null;
                    return (
                      <g key={idx}>
                        <circle cx={x} cy={y} r="14" fill={surveyed ? (ph === 'dom' ? '#7ab86a' : '#e8a03a') : '#d8e4e8'} stroke={surveyed ? (ph === 'dom' ? '#3f7f3a' : '#8a671b') : '#8a9a9f'} strokeWidth="2" />
                        <text x={x + 20} y={y + 4} fontSize="10" fill="#37585f">{STUDENTS[idx].name}</text>
                        {surveyed ? (
                          <text x={x + 20} y={y + 19} fontSize="9" fill={ph === 'dom' ? '#2f6f2a' : '#8a671b'} fontWeight="600">
                            {ph === 'dom' ? TRAITS[trait].dom.slice(0, 4) : TRAITS[trait].rec.slice(0, 6)}
                          </text>
                        ) : null}
                      </g>
                    );
                  })}
                </g>
              );
            })}
            {/* 统计条 */}
            {surveyed ? (
              <g>
                <rect x="330" y="46" width={domCount * 10} height="20" rx="4" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="1.4" />
                <text x="332" y={60} fontSize="9" fill="#2f6f2a" fontWeight="700">显 {domCount}</text>
                <rect x="330" y="72" width={recCount * 10} height="20" rx="4" fill="#e8a03a" stroke="#8a671b" strokeWidth="1.4" />
                <text x="332" y={86} fontSize="9" fill="#8a671b" fontWeight="700">隐 {recCount}</text>
              </g>
            ) : null}
            <text x="220" y="248" textAnchor="middle" fontSize="10.5" fill="#799398">
              {surveyed ? '对照课本性状的显隐性关系，推测每位显性同学的基因型' : '调查后将显示每位同学的表现型与人数统计'}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}

const TRAIT_S: Record<Trait, { dom: string; rec: string }> = {
  tongue: { dom: '能卷舌', rec: '不能卷舌' },
  earlobe: { dom: '有耳垂', rec: '无耳垂' },
  eyelid: { dom: '双眼皮', rec: '单眼皮' },
};
