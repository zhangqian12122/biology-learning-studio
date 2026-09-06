'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（方法）',
    lines: [
      <>遗传系谱分析两步定式：<span className="font-semibold">先判显隐性，再判基因位置</span>（常染色体还是 X 染色体）。</>,
      <>判显隐性口诀：<span className="font-semibold">"无中生有"为隐性</span>（双亲正常生出患病孩子）；<span className="font-semibold">"有中生无"为显性</span>（双亲患病生出正常孩子）。</>,
      <>判位置口诀：<span className="font-semibold">隐性——患病女性的父亲与儿子必患病</span>，否则是常染色体；<span className="font-semibold">显性——患病男性的母亲与女儿必患病</span>，否则是常染色体。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>三份家系图（白化病样 / 多指样 / 血友病样），每份两道判断题。</>,
      <>选错会给出反例提示；两步全对后展示系谱中个体的基因型推断。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 看第一代与第二代之间有没有"无中生有 / 有中生无"，选显隐性。</>,
      <>② 用患病个体的性别关系排除法，选基因位置。</>,
      <>③ 三份家系全部判定正确，集齐"系谱达人"。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>伴 X 隐性遗传的典型特征：<span className="font-semibold">男性患者多于女性、交叉遗传</span>（外祖父→母亲→儿子）。</>,
      <>伴 X 显性：女性患者多于男性；患病男性的母亲和女儿一定患病。</>,
      <>只凭"男女患者比例"不能定显隐性——必须先找"无中生有 / 有中生无"的铁证。</>,
    ],
  },
];

type Person = { x: number; y: number; sex: 'M' | 'F'; affected: boolean; tag?: string };
type Case = {
  name: string;
  disease: string;
  people: Record<string, Person>;
  dominance: '显性' | '隐性';
  dominanceWhy: string;
  linkage: '常染色体' | '伴X染色体';
  linkageWhy: string;
  genotypes: string[];
};

const CASES: Case[] = [
  {
    name: '家系一（白化病样）',
    disease: '白化病（示例）',
    people: {
      i1: { x: 130, y: 84, sex: 'M', affected: false },
      i2: { x: 210, y: 84, sex: 'F', affected: false },
      ii1: { x: 120, y: 178, sex: 'M', affected: false, tag: '父' },
      ii2: { x: 200, y: 178, sex: 'F', affected: false, tag: '母' },
      ii3: { x: 280, y: 178, sex: 'M', affected: true },
      iii1: { x: 120, y: 276, sex: 'M', affected: false },
      iii2: { x: 200, y: 276, sex: 'F', affected: true },
      iii3: { x: 280, y: 276, sex: 'F', affected: false },
    },
    dominance: '隐性',
    dominanceWhy: 'II₁、II₂ 都正常，却生出患病的 II₃ 和 III₂——典型的"无中生有"，致病基因是隐性。',
    linkage: '常染色体',
    linkageWhy: 'III₂ 是患病女性，但她的父亲 II₁ 正常——若为伴 X 隐性，患病女儿的父亲一定患病。排除伴 X，落在常染色体上。',
    genotypes: ['II₁、II₂ 基因型均为 Aa（携带者）', '患病者 aa：II₃、III₂', '正常者 AA 或 Aa：III₁、III₃ 各为 1/3 AA、2/3 Aa'],
  },
  {
    name: '家系二（多指样）',
    disease: '多指（示例）',
    people: {
      i1: { x: 130, y: 84, sex: 'M', affected: true },
      i2: { x: 210, y: 84, sex: 'F', affected: false },
      ii1: { x: 120, y: 178, sex: 'F', affected: true, tag: '母' },
      ii2: { x: 200, y: 178, sex: 'M', affected: false, tag: '父' },
      ii3: { x: 280, y: 178, sex: 'M', affected: false },
      iii1: { x: 120, y: 276, sex: 'M', affected: false },
      iii2: { x: 200, y: 276, sex: 'F', affected: true },
      iii3: { x: 280, y: 276, sex: 'F', affected: false },
    },
    dominance: '显性',
    dominanceWhy: 'I₁ 患病，I₂ 正常，连续两代都有患者——II₂、III₁ 正常却出现在患病家系中："有中生无"为显性。',
    linkage: '常染色体',
    linkageWhy: 'I₁ 是患病男性，他的女儿 II₂ 正常——若为伴 X 显性，患病父亲的所有女儿必定患病。排除伴 X，落在常染色体上。',
    genotypes: ['I₁、II₁、III₂ 基因型为 Aa（显性致病）', '正常人 aa：I₂、II₂、II₃、III₁、III₃', 'III₂ 为 Aa——其父 II₂ 必然是 aa'],
  },
  {
    name: '家系三（血友病样）',
    disease: '血友病（示例）',
    people: {
      i1: { x: 130, y: 84, sex: 'M', affected: false },
      i2: { x: 210, y: 84, sex: 'F', affected: false },
      ii1: { x: 120, y: 178, sex: 'M', affected: false, tag: '父' },
      ii2: { x: 200, y: 178, sex: 'F', affected: false, tag: '母' },
      ii3: { x: 280, y: 178, sex: 'M', affected: true },
      iii1: { x: 120, y: 276, sex: 'M', affected: true },
      iii2: { x: 200, y: 276, sex: 'F', affected: false },
      iii3: { x: 280, y: 276, sex: 'F', affected: false },
    },
    dominance: '隐性',
    dominanceWhy: 'I₁、I₂ 正常，生出患病的 II₃；II₁、II₂ 正常又生出患病的 III₁——两代都是"无中生有"，为隐性。',
    linkage: '伴X染色体',
    linkageWhy: '患者全是男性（II₃、III₁），呈"外祖父—母亲—儿子"交叉遗传；若为常染色体隐性，男女患病机会应均等。',
    genotypes: ['II₂ 为携带者 X^H X^h，II₃、III₁ 为 X^h Y', 'II₁ 正常男性 X^H Y', 'III₂ 有 1/2 可能是携带者'],
  },
];

const POS: Record<string, Person> = {};
CASES.forEach((c) => Object.assign(POS, c.people));

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function GeneticPedigreeLab() {
  const [caseIdx, setCaseIdx] = useState(0);
  const [domAnswer, setDomAnswer] = useState<'显性' | '隐性' | null>(null);
  const [linkAnswer, setLinkAnswer] = useState<'常染色体' | '伴X染色体' | null>(null);
  const [wrong, setWrong] = useState<string | null>(null);

  const kase = CASES[caseIdx];
  const domCorrect = domAnswer === kase.dominance;
  const linkCorrect = linkAnswer === kase.linkage;
  const solved = domCorrect && linkCorrect;

  const flashWrong = (msg: string) => {
    setWrong(msg);
    setTimeout(() => setWrong(null), 900);
  };

  const pickDominance = (v: '显性' | '隐性') => {
    if (v !== kase.dominance) {
      flashWrong('再找找"无中生有"或"有中生无"的证据');
      return;
    }
    setDomAnswer(v);
  };
  const pickLinkage = (v: '常染色体' | '伴X染色体') => {
    if (v !== kase.linkage) {
      flashWrong('用患病个体的性别关系做排除法');
      return;
    }
    setLinkAnswer(v);
  };

  const nextCase = () => {
    setCaseIdx((i) => (i + 1) % CASES.length);
    setDomAnswer(null);
    setLinkAnswer(null);
  };

  const person = (key: string) => kase.people[key];
  const draw = (key: string) => {
    const p = person(key);
    const affected = p.affected;
    const fill = affected ? '#b0483a' : '#ffffff';
    return (
      <g key={key}>
        {p.sex === 'M' ? (
          <rect x={p.x - 15} y={p.y - 15} width="30" height="30" rx="4" fill={fill} stroke={affected ? '#8c231f' : '#5f8a94'} strokeWidth="2.5" />
        ) : (
          <circle cx={p.x} cy={p.y} r="16" fill={fill} stroke={affected ? '#8c231f' : '#9a6fa8'} strokeWidth="2.5" />
        )}
      </g>
    );
  };

  const observation = (() => {
    if (!domAnswer) return '第一步：找"无中生有"（正常父母生出患病子女）或"有中生无"（患病父母生出正常子女），判断显隐性。';
    if (!domCorrect) return '这一步选错了——重新看亲子代之间的患病关系。';
    if (!linkAnswer) return `显隐性判断正确（${kase.dominance}）。第二步：用患病个体的性别做排除法，判断致病基因在常染色体还是 X 染色体上。`;
    if (!solved) return '位置判断有误——提示：隐性遗传中患病女性的父亲一定患病；显性遗传中患病男性的女儿一定患病。';
    return `✅ 判定完成：${kase.dominance}、${kase.linkage}。${kase.linkageWhy}`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择家系</p>
              <div className="grid gap-1.5">
                {CASES.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setCaseIdx(i);
                      setDomAnswer(null);
                      setLinkAnswer(null);
                    }}
                    aria-pressed={caseIdx === i}
                    className={`${cnChip(caseIdx === i)} w-full text-left`}
                  >
                    {c.name}{solved && caseIdx === i ? ' ✅' : ''}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">① 显性还是隐性？</p>
              <div className="grid grid-cols-2 gap-1.5">
                {(['显性', '隐性'] as const).map((v) => (
                  <button key={v} type="button" onClick={() => pickDominance(v)} aria-pressed={domAnswer === v} className={cnChip(domAnswer === v)}>
                    {v}
                  </button>
                ))}
              </div>
              {domCorrect ? <p className="mt-1.5 text-xs font-medium text-[#2f7a4d]">✅ {kase.dominanceWhy}</p> : null}
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">② 基因在哪里？</p>
              <div className="grid grid-cols-2 gap-1.5">
                {(['常染色体', '伴X染色体'] as const).map((v) => (
                  <button key={v} type="button" onClick={() => pickLinkage(v)} disabled={!domCorrect} aria-pressed={linkAnswer === v} className={`${cnChip(linkAnswer === v)} disabled:cursor-not-allowed disabled:opacity-40`}>
                    {v}
                  </button>
                ))}
              </div>
              {solved ? <p className="mt-1.5 text-xs font-medium text-[#2f7a4d]">✅ {kase.linkageWhy}</p> : null}
            </div>
            {wrong ? <p className="text-xs font-medium text-[#b0483a]">{wrong}</p> : null}
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              已判定 <span className="font-bold text-[#0a626a]">{CASES.filter((c, i) => i !== caseIdx ? false : solved).length}</span>/3 份家系
              {solved ? <button type="button" onClick={nextCase} className="ml-2 font-semibold text-[#0a626a] underline underline-offset-2">下一份 →</button> : null}
            </div>
          </>
        }
      >
        <SceneBox label={`${kase.name}：${kase.disease}（■ 男性 ● 女性 · 红色 = 患者）`} heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 340" aria-hidden="true">
            {/* 家系连线 */}
            <g stroke="#8aa1a6" strokeWidth="2.5" fill="none">
              <line x1={person('i1').x} y1={person('i1').y + 15} x2={person('i2').x} y2={person('i2').y + 15} />
              <line x1={170} y1={99} x2={170} y2={130} />
              <line x1={110} y1={130} x2={290} y2={130} />
              {(['ii1', 'ii2', 'ii3'] as const).map((k) => (
                <line key={k} x1={170} y1={130} x2={POS[k].x} y2={130} />
              ))}
              {(['ii1', 'ii2', 'ii3'] as const).map((k) => (
                <line key={k + 'v'} x1={POS[k].x} y1={130} x2={POS[k].x} y2={POS[k].y - 16} />
              ))}
              <line x1={person('ii1').x + 15} y1={person('ii1').y} x2={person('ii2').x - 16} y2={person('ii2').y} />
              <line x1={160} y1={178} x2={160} y2={230} />
              <line x1={120} y1={230} x2={280} y2={230} />
              {(['iii1', 'iii2', 'iii3'] as const).map((k) => (
                <line key={k} x1={160} y1={230} x2={POS[k].x} y2={230} />
              ))}
              {(['iii1', 'iii2', 'iii3'] as const).map((k) => (
                <line key={k + 'v'} x1={POS[k].x} y1={230} x2={POS[k].x} y2={POS[k].y - 16} />
              ))}
            </g>
            {/* 世代标注 */}
            {[['I', 64], ['II', 64], ['III', 64]].map(([t, y], i) => (
              <text key={i} x={t === 'I' ? 52 : 52} y={t === 'I' ? 90 : t === 'II' ? 184 : 282} fontSize="14" fill="#59767c" fontWeight="700">{t}</text>
            ))}
            {/* 个体 */}
            {Object.keys(kase.people).map((k) => draw(k))}
            {/* 婚配标记 */}
            <text x={240} y={150} fontSize="12.5" fill="#8aa1a6">婚配 ↓</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      {solved ? (
        <div className="rounded-lg border border-[#cfe1e0] bg-[#eef7f6] p-4">
          <p className="text-sm font-bold text-[#0a626a]">基因型推断（{kase.dominance} · {kase.linkage}）</p>
          <ul className="mt-2 grid gap-1.5 text-xs leading-5 text-[#46666d]">
            {kase.genotypes.map((g) => (
              <li key={g}>· {g}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <LabReference items={REFERENCE} />
    </div>
  );
}
