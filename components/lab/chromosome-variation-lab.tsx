'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>染色体结构变异的四种类型：<span className="font-semibold">缺失</span>（丢失片段）、<span className="font-semibold">重复</span>（多出片段）、<span className="font-semibold">倒位</span>（片段倒转 180°）、<span className="font-semibold">易位</span>（片段移到另一条非同源染色体上）。</>,
      <>与基因突变的区别：基因突变是分子水平的"碱基变化"，<span className="font-semibold">光学显微镜看不见</span>；染色体变异是细胞水平的"结构/数目变化"，<span className="font-semibold">显微镜下可见</span>。</>,
      <>四种变异都会使排列在染色体上的基因数目或排列顺序改变，从而导致性状变异。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>展示一条"标准染色体"与一条"非同源染色体"，点击四种变异类型按钮，观察目标染色体的形态变化。</>,
      <>每选一种类型，回答一道"识别题"：给出描述判断属于哪种类型，集齐四题点亮成就。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 依次点击四种类型，对照"标准染色体"找出变化的片段（高亮显示）。</>,
      <>② 完成四道识别题：猫叫综合征（缺失）、果蝇棒状眼（重复）、花斑眼（易位）等实例对应。</>,
      <>③ 思考：倒位与易位都不改变基因数目，改变的是什么？</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>易位与<span className="font-semibold">交叉互换</span>的区别：易位发生在<span className="font-semibold">非同源染色体</span>之间；交叉互换发生在同源染色体的非姐妹染色单体之间（属基因重组）。</>,
      <>实例：猫叫综合征 = 5 号染色体部分缺失；果蝇棒状眼 = X 染色体重复；夜来香 = 倒位常见。</>,
      <>无籽西瓜是<span className="font-semibold">染色体数目变异</span>（多倍体育种），与结构变异区分开。</>,
    ],
  },
];

type VariantKey = 'normal' | 'deletion' | 'duplication' | 'inversion' | 'translocation';

const VARIANTS: Record<Exclude<VariantKey, 'normal'>, { name: string; desc: string; quiz: { q: string; options: string[]; answer: number } }> = {
  deletion: {
    name: '缺失',
    desc: '染色体的某个片段丢失（图中 F 片段缺失）——基因数目减少。',
    quiz: { q: '人类猫叫综合征是 5 号染色体部分片段丢失所致，属于哪种结构变异？', options: ['缺失', '重复', '倒位', '易位'], answer: 0 },
  },
  duplication: {
    name: '重复',
    desc: '染色体中增加了某个相同的片段（图中 E 片段重复）——基因数目增加。',
    quiz: { q: '果蝇棒状眼是 X 染色体上某片段多了一份所致，属于？', options: ['缺失', '重复', '倒位', '易位'], answer: 1 },
  },
  inversion: {
    name: '倒位',
    desc: '某片段倒转 180° 后重新接上（图中 C-D 倒转）——基因数目不变，排列顺序改变。',
    quiz: { q: '某染色体中间片段倒转 180° 后重新连接，属于？', options: ['缺失', '重复', '倒位', '易位'], answer: 2 },
  },
  translocation: {
    name: '易位',
    desc: '某个片段移接到另一条非同源染色体上（图中 E 移到深色染色体）——基因数目不变，位置改变。',
    quiz: { q: '某染色体的片段移接到另一条非同源染色体上，属于？', options: ['缺失', '重复', '倒位', '易位'], answer: 3 },
  },
};

/** 正常染色体片段（A~F） */
const SEGMENTS = [
  { label: 'A', w: 46, color: '#7fb8d4' },
  { label: 'B', w: 40, color: '#8fbf8a' },
  { label: 'C', w: 44, color: '#e8c94a' },
  { label: 'D', w: 40, color: '#e8a86a' },
  { label: 'E', w: 46, color: '#c9a8e2' },
  { label: 'F', w: 40, color: '#e89090' },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function ChromosomeVariationLab() {
  const [variant, setVariant] = useState<VariantKey>('normal');
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);

  const quizList = ['deletion', 'duplication', 'inversion', 'translocation'].map((k) => ({ key: k as VariantKey, ...VARIANTS[k as Exclude<VariantKey, 'normal'>].quiz }));
  const curQuiz = quizList[quizIdx];
  const quizDone = quizAnswer != null;
  const quizCorrect = quizAnswer === curQuiz.answer;
  const allSolved = solvedIds.length === 4;

  const answerQuiz = (i: number) => {
    if (quizDone) return;
    setQuizAnswer(i);
    if (i === curQuiz.answer && !solvedIds.includes(curQuiz.key)) {
      setSolvedIds((prev) => [...prev, curQuiz.key]);
    }
  };
  const nextQuiz = () => {
    if (quizIdx < quizList.length - 1) {
      setQuizIdx((i) => i + 1);
      setQuizAnswer(null);
    }
  };

  /** 绘制目标染色体的片段序列 */
  const targetSegments = (() => {
    if (variant === 'normal' || variant === 'translocation') return SEGMENTS;
    if (variant === 'deletion') return SEGMENTS.filter((s) => s.label !== 'F');
    if (variant === 'duplication') return [...SEGMENTS.slice(0, 5), SEGMENTS[4], SEGMENTS[5]];
    return [SEGMENTS[0], SEGMENTS[1], { ...SEGMENTS[3] }, { ...SEGMENTS[2] }, SEGMENTS[4], SEGMENTS[5]]; // 倒位 C D → D C
  })();

  const observation = (() => {
    if (variant === 'normal') {
      return '这是一条正常的染色体（片段 A~F 依次排列）。点击四种变异类型，对照观察它变成了什么样——注意变色/消失的片段。';
    }
    const v = VARIANTS[variant];
    if (variant === 'translocation') {
      return `${v.name}：片段 E 从目标染色体移接到了下方的非同源染色体上（深色染色体获得了一段紫色）。基因数目不变，但位置改变——注意与"交叉互换"（发生在同源染色体之间）区分。`;
    }
    return `${v.name}：${v.desc} 对照上方标准染色体，找出变化的片段。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择变异类型（对照观察）</p>
              <div className="grid grid-cols-2 gap-1.5">
                {(['normal', 'deletion', 'duplication', 'inversion', 'translocation'] as VariantKey[]).map((key) => (
                  <button key={key} type="button" onClick={() => setVariant(key)} aria-pressed={variant === key} className={`${cnChip(variant === key)} col-span-${key === 'normal' ? '2' : '1'} w-full`}>
                    {key === 'normal' ? '标准染色体' : VARIANTS[key].name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">
                识别题 {quizIdx + 1}/4（已完成 {solvedIds.length}）
              </p>
              <div className="rounded-md border border-[#e2eeec] bg-white px-2.5 py-2">
                <p className="text-xs leading-5 text-[#37585f]">{curQuiz.q}</p>
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  {curQuiz.options.map((opt, i) => {
                    const chosen = quizAnswer === i;
                    const good = quizDone && i === curQuiz.answer;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => answerQuiz(i)}
                        aria-pressed={chosen}
                        className={`min-h-9 rounded-md border px-2 text-xs font-semibold transition-colors ${
                          quizDone
                            ? good
                              ? 'border-[#9fcab2] bg-[#e7f5ec] text-[#2f7a4d]'
                              : chosen
                                ? 'border-[#e0a3a3] bg-[#fbecea] text-[#b0483a]'
                                : 'border-[#e5eff0] bg-white text-[#8aa1a6]'
                            : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {quizDone ? (
                  quizIdx < quizList.length - 1 ? (
                    <button type="button" onClick={nextQuiz} className="mt-2 w-full rounded-md bg-[#0e6f75] px-2 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]">
                      下一题 →
                    </button>
                  ) : null
                ) : null}
              </div>
            </div>
            <button
              type="button"
              onClick={() => { setVariant('normal'); setQuizIdx(0); setQuizAnswer(null); setSolvedIds([]); }}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              重置实验
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {allDoneQuiz(solvedIds) ? '🎉 四种类型全部识别正确！' : `识别进度：${solvedIds.length}/4`}
            </div>
          </>
        }
      >
        <SceneBox label="染色体结构变异对比（上：标准 · 下：变异后）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 标准染色体 */}
            <text x="30" y="52" fontSize="13.5" fill="#173b42" fontWeight="700">标准染色体：</text>
            <g transform="translate(30 66)">
              <rect x="-6" y="-8" width={SEGMENTS.reduce((s, seg) => s + seg.w, 0) + 12} height="44" rx="20" fill="#f7fbfc" stroke="#5a7a8a" strokeWidth="3" />
              {SEGMENTS.map((seg, i) => {
                const x = SEGMENTS.slice(0, i).reduce((s, s2) => s + s2.w, 0);
                return (
                  <g key={seg.label}>
                    <rect x={x} y="0" width={seg.w - 4} height="28" rx="6" fill={seg.color} stroke="#3d5a68" strokeWidth="1.6" />
                    <text x={x + (seg.w - 4) / 2} y="19" textAnchor="middle" fontSize="13" fill="#173b42" fontWeight="700">{seg.label}</text>
                  </g>
                );
              })}
            </g>
            {/* 变异后染色体 */}
            <text x="30" y="166" fontSize="13.5" fill="#173b42" fontWeight="700">
              {variant === 'normal' ? '（点击上方按钮观察变异）' : `变异后 · ${VARIANTS[variant].name}：`}
            </text>
            <g transform="translate(30 180)">
              <rect x="-6" y="-8" width={targetSegments.reduce((s, seg) => s + seg.w, 0) + 12} height="44" rx="20" fill="#f7fbfc" stroke="#5a7a8a" strokeWidth="3" />
              {targetSegments.map((seg, i) => {
                const x = targetSegments.slice(0, i).reduce((s, s2) => s + s2.w, 0);
                const flipped = variant === 'inversion' && (seg.label === 'C' || seg.label === 'D');
                return (
                  <g key={seg.label + i}>
                    <rect x={x} y="0" width={seg.w - 4} height="28" rx="6" fill={seg.color} stroke={flipped ? '#b0483a' : '#3d5a68'} strokeWidth={flipped ? 2.6 : 1.6} strokeDasharray={flipped ? '5 3' : undefined} />
                    <text x={x + (seg.w - 4) / 2} y="19" textAnchor="middle" fontSize="13" fill="#173b42" fontWeight="700">{seg.label}</text>
                  </g>
                );
              })}
            </g>
            {/* 易位：非同源染色体获得片段 */}
            {variant === 'translocation' ? (
              <g transform="translate(30 254)">
                <text x="0" y="0" fontSize="12.5" fill="#59767c" fontWeight="600">另一条非同源染色体（获得片段 E）：</text>
                <g transform="translate(0 10)">
                  <rect x="-6" y="-6" width="200" height="34" rx="15" fill="#2f4a5a" stroke="#1e3340" strokeWidth="2.5" />
                  <rect x="150" y="0" width="42" height="22" rx="6" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" strokeDasharray="5 3" />
                  <text x="70" y="17" fontSize="12.5" fill="#cfe4f0" fontWeight="600">原有序列…</text>
                  <text x="171" y="16" textAnchor="middle" fontSize="12.5" fill="#173b42" fontWeight="700">E</text>
                </g>
              </g>
            ) : null}
            {/* 变化说明 */}
            {variant !== 'normal' ? (
              <text x="410" y="290" textAnchor="end" fontSize="12.5" fill="#b0483a" fontWeight="600">
                {variant === 'deletion' && 'F 丢失'}
                {variant === 'duplication' && 'E 重复 ×2'}
                {variant === 'inversion' && 'C-D 倒转（虚线框）'}
                {variant === 'translocation' && 'E 移到非同源染色体'}
              </text>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}

function allDoneQuiz(solved: string[]): boolean {
  return solved.length === 4;
}
