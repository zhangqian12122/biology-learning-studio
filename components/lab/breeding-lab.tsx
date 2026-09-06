'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（方法）',
    lines: [
      <>育种的本质：<span className="font-semibold">创造变异 → 选择 → 纯合稳定</span>。不同方案的区别在于"变异从哪来、花几年、能不能定向"。</>,
      <>杂交育种把优良性状"组合"到一起；单倍体育种用花药离体培养<span className="font-semibold">明显缩短年限</span>；诱变育种不定向但能产生新基因。</>,
      <>基因工程<span className="font-semibold">定向改造</span>生物性状，可以跨物种转移基因——"定向"是它最大的卖点。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>任务：尽快获得"高产、抗病、稳定遗传"的小麦纯种。五种方案任选查看流程与年限。</>,
      <>全部浏览一遍后解锁对比表；完成"方案选择"判断题集齐成就。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 逐个点开五种方案，记流程、年限与优缺点。</>,
      <>② 回答"哪种方案明显缩短育种年限"。</>,
      <>③ 用对比表总结：变异来源、能否定向、年限长短。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>单倍体育种 = 花药离体培养 → 单倍体 → 秋水仙素加倍 → <span className="font-semibold">当年就是纯合子</span>，年限减半是最大考点。</>,
      <>多倍体育种用<span className="font-semibold">秋水仙素处理萌发的种子或幼苗</span>（抑制纺锤体形成），三倍体无籽西瓜不育的原因要会说。</>,
      <>诱变育种的变异<span className="font-semibold">不定向</span>，需要处理大量材料；基因工程定向，但只能转移"已有的"目的基因。</>,
    ],
  },
];

type MethodKey = 'cross' | 'haploid' | 'polyploid' | 'mutation' | 'engineering';
const METHODS: Record<MethodKey, { name: string; steps: string[]; years: string; pros: string; cons: string }> = {
  cross: {
    name: '杂交育种',
    steps: ['高产不抗病 × 低产抗病', 'F₁ 杂合（高产抗病）', '连续自交、逐代选择', '选出门纯合优良品种'],
    years: '约 5~8 年',
    pros: '操作简单，把不同个体的优良性状组合到一起',
    cons: '年限长；只能利用同种（或近缘）生物的基因',
  },
  haploid: {
    name: '单倍体育种',
    steps: ['杂交得 F₁', 'F₁ 花药离体培养 → 单倍体', '秋水仙素处理 → 染色体加倍', '当年得到纯合品种'],
    years: '约 2~3 年',
    pros: '明显缩短育种年限——所得个体全是纯合子，后代不发生性状分离',
    cons: '技术复杂（需要组织培养），仍受同种限制',
  },
  polyploid: {
    name: '多倍体育种',
    steps: ['萌发的种子或幼苗', '秋水仙素处理（抑制纺锤体）', '染色体数目加倍', '三倍体无籽西瓜等多倍体'],
    years: '约 2~4 年',
    pros: '器官大、营养物含量高（多倍体优势）',
    cons: '只适用于获得多倍体性状；三倍体不育需年年制种',
  },
  mutation: {
    name: '诱变育种',
    steps: ['选择优良原始材料', '射线 / 激光 / 化学诱变剂处理', '大量材料中筛选突变', '选育优良性状'],
    years: '不定（需处理大量材料）',
    pros: '能产生新基因、新性状；提高变异频率',
    cons: '变异不定向、有利变异少，需处理大量材料',
  },
  engineering: {
    name: '基因工程育种',
    steps: ['获取目的基因（如抗虫基因）', '构建基因表达载体', '导入受体细胞并检测', '目的基因稳定遗传表达'],
    years: '视开发周期而定',
    pros: '定向改造性状；可打破物种界限（跨物种转移基因）',
    cons: '技术门槛高；目的基因来源与安全性有争议',
  },
};

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function BreedingDesignerLab() {
  const [selected, setSelected] = useState<MethodKey>('cross');
  const [viewed, setViewed] = useState<MethodKey[]>(['cross']);
  const [quiz, setQuiz] = useState<string | null>(null);

  const m = METHODS[selected];
  const allViewed = viewed.length === 5;
  const quizCorrect = quiz === '单倍体育种';

  const pick = (key: MethodKey) => {
    setSelected(key);
    setViewed((prev) => (prev.includes(key) ? prev : [...prev, key]));
  };

  const observation = (() => {
    const short = viewed.length;
    if (!allViewed) return `正在查看「${m.name}」——流程 ${m.steps.length} 步、${m.years}。还剩 ${5 - short} 个方案没看过，看完解锁对比结论。`;
    if (quiz == null) return '五个方案都看完了！回答判断题：要"明显缩短育种年限"应该选哪种方案？';
    if (quizCorrect) return '✅ 单倍体育种：花药离体培养 + 秋水仙素加倍，当年即纯合，后代不发生性状分离——年限至少省一半。';
    return '选错了。想想哪种方案能让"杂合子当年变纯合子"。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">任务：培育高产抗病小麦纯种</p>
              <div className="grid gap-1.5">
                {(Object.keys(METHODS) as MethodKey[]).map((key) => (
                  <button key={key} type="button" onClick={() => pick(key)} aria-pressed={selected === key} className={`${cnChip(selected === key)} w-full text-left`}>
                    {METHODS[key].name}{viewed.includes(key) ? ' ✅' : ''}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">判断：明显缩短育种年限选？</p>
              <div className="grid grid-cols-2 gap-1.5">
                {['单倍体育种', '诱变育种'].map((v) => {
                  const chosen = quiz === v;
                  const reveal = quiz != null;
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => allViewed && setQuiz(v)}
                      disabled={!allViewed}
                      aria-pressed={chosen}
                      className={`min-h-10 rounded-md border px-2 text-xs font-semibold transition-colors ${
                        reveal
                          ? quizCorrect && v === '单倍体育种'
                            ? 'border-[#9fcab2] bg-[#e7f5ec] text-[#2f7a4d]'
                            : chosen
                              ? 'border-[#e0a3a3] bg-[#fbecea] text-[#b0483a]'
                              : 'border-[#e5eff0] bg-white text-[#8aa1a6]'
                          : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              已浏览方案：<span className="font-bold text-[#0a626a]">{viewed.length}</span>/5{allDoneQuiz(viewed, quiz) ? ' · 🎉 全部完成' : ''}
            </div>
          </>
        }
      >
        <SceneBox label={`${m.name}：流程与对比`} heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 流程框 */}
            {m.steps.map((s, i) => {
              const x = 24 + (i % 2) * 212;
              const y = 74 + Math.floor(i / 2) * 66;
              return (
                <g key={s}>
                  <rect x={x} y={y} width="188" height="50" rx="10" fill="#eef7f6" stroke="#0e6f75" strokeWidth="2.5" />
                  <text x={x + 94} y={y + 22} textAnchor="middle" fontSize="12.5" fill="#173b42" fontWeight="600">{s}</text>
                  <text x={x + 94} y={y + 40} textAnchor="middle" fontSize="11.5" fill="#799398">第 {i + 1} 步</text>
                  {i < m.steps.length - 1 && i % 2 === 0 ? (
                    <line x1={x + 190} y1={y + 25} x2={x + 208} y2={y + 25} stroke="#8aa1a6" strokeWidth="3" markerEnd="url(#br-arrow)" />
                  ) : null}
                </g>
              );
            })}
            {/* 对比信息 */}
            <rect x="24" y="216" width="392" height="62" rx="10" fill="#fdf6e3" stroke="#e9d9a8" strokeWidth="2" />
            <text x="42" y="240" fontSize="13.5" fill="#8a671b" fontWeight="700">年限：{m.years}</text>
            <text x="42" y="262" fontSize="12.5" fill="#4b6c73">优点：{m.pros}</text>
            <text x="242" y="262" fontSize="12.5" fill="#9b4e39">{m.cons.slice(0, 22)}</text>
            <text x="220" y="40" textAnchor="middle" fontSize="14" fill="#173b42" fontWeight="700">🧪 {m.name}</text>
            <defs>
              <marker id="br-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
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

function allDoneQuiz(viewed: MethodKey[], quiz: string | null): boolean {
  return viewed.length === 5 && quiz != null;
}
