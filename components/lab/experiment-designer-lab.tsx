'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（方法）',
    lines: [
      <>对照实验：设置<span className="font-semibold">对照组</span>（处于自然状态、不作变量处理）和<span className="font-semibold">实验组</span>（施加变量处理），通过对比得出结论。</>,
      <><span className="font-semibold">自变量</span>：实验者人为改变的量；<span className="font-semibold">因变量</span>：随自变量变化而变化的量，是实验要观测的结果。</>,
      <>除自变量外，其他可能影响结果的量（无关变量）都要<span className="font-semibold">保持相同且适宜</span>——"单一变量原则"。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>三组经典场景：酶的消化作用、光合作用需要光、温度与霉菌生长。</>,
      <>每组需要答对三小问：自变量 / 因变量 / 对照组的判定。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 读场景描述，先在心里找出"改变了什么"（自变量）。</>,
      <>② 再找"随之变化、要观测的量"（因变量），最后判断哪一组是对照。</>,
      <>③ 三组场景全部答对，点亮"实验设计达人"。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>找自变量的口诀：两组之间<span className="font-semibold">唯一不同</span>的那个条件。</>,
      <>对照组通常是"不加处理（或自然状态）"的一组；因变量常用<span className="font-semibold">指示剂或可见现象</span>来呈现（如碘液变蓝）。</>,
      <>常见错误：把"无关变量"当成自变量（如温度、时长），或把观测手段（碘液）当成因变量。</>,
    ],
  },
];

type Q = { q: string; options: string[]; answer: number };
type Scenario = { name: string; intro: string; questions: Q[] };

const SCENARIOS: Scenario[] = [
  {
    name: '唾液淀粉酶消化淀粉',
    intro: '甲试管：馒头屑 + 唾液，37℃ 水浴 10 分钟后滴碘液；乙试管：馒头屑 + 清水，同样水浴 10 分钟后滴碘液。',
    questions: [
      { q: '本实验的自变量是？', options: ['温度高低', '唾液的有无', '馒头屑的多少', '碘液的浓度'], answer: 1 },
      { q: '本实验的因变量是？', options: ['馒头屑的多少', '水浴的时间', '淀粉是否被分解（加碘后是否变蓝）', '唾液的分泌量'], answer: 2 },
      { q: '本实验的对照组是？', options: ['甲试管（加唾液）', '乙试管（加清水）', '没有对照组'], answer: 1 },
    ],
  },
  {
    name: '光照与光合作用',
    intro: '同一天竺葵叶片：一半用黑纸遮光，一半正常照光，光照数小时后摘下滴碘液检测。',
    questions: [
      { q: '本实验的自变量是？', options: ['叶片的大小', '光照的有无', '碘液的多少', '植物的种类'], answer: 1 },
      { q: '本实验的因变量是？', options: ['是否产生淀粉（见蓝为有）', '叶片的厚度', '黑纸的颜色', '光照的时长'], answer: 0 },
      { q: '遮光的一半与照光的一半，谁是对照组？', options: ['遮光的一半是对照组', '照光的一半是对照组（自然状态）', '两者都不是'], answer: 1 },
    ],
  },
  {
    name: '温度与霉菌生长',
    intro: '两块同样的面包：一块放在冰箱低温处，一块放在温暖的室内，几天后观察霉菌生长情况。',
    questions: [
      { q: '本实验的自变量是？', options: ['面包的大小', '霉菌的种类', '温度的高低', '观察的天数'], answer: 2 },
      { q: '本实验的因变量是？', options: ['冰箱的耗电量', '霉菌的生长情况', '面包的价格', '空气湿度'], answer: 1 },
      { q: '本实验的对照组是？', options: ['冰箱低温的面包', '温暖室内的面包（自然状态）', '两块都是对照组'], answer: 1 },
    ],
  },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function ExperimentDesignerLab() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [solvedIds, setSolvedIds] = useState<number[]>([]);

  const scenario = SCENARIOS[scenarioIdx];
  const solved = solvedIds.includes(scenarioIdx);

  const answer = (qi: number, oi: number) => {
    if (solved) return;
    const key = `${scenarioIdx}-${qi}`;
    setAnswers((prev) => ({ ...prev, [key]: oi }));
    // 检查本场景三题是否全对
    const allCorrect = scenario.questions.every((q2, i) => {
      const given = i === qi ? oi : answers[`${scenarioIdx}-${i}`];
      return given === q2.answer;
    });
    if (allCorrect && !solvedIds.includes(scenarioIdx)) {
      setSolvedIds((prev) => [...prev, scenarioIdx]);
    }
  };

  const pickScenario = (i: number) => setScenarioIdx(i);

  const observation = (() => {
    if (solved) {
      return `✅「${scenario.name}」三问全对！自变量、因变量、对照组判定无误。`;
    }
    const answered = scenario.questions.filter((_, i) => answers[`${scenarioIdx}-${i}`] != null).length;
    return `场景：${scenario.intro}（已答 ${answered}/3）——口诀：两组之间唯一不同的条件是自变量。`;
  })();

  const allDone = solvedIds.length === SCENARIOS.length;

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择场景（{solvedIds.length}/{SCENARIOS.length} 组已完成）</p>
              <div className="grid gap-1.5">
                {SCENARIOS.map((s, i) => (
                  <button key={s.name} type="button" onClick={() => pickScenario(i)} aria-pressed={scenarioIdx === i} className={`${cnChip(scenarioIdx === i)} w-full text-left`}>
                    {solvedIds.includes(i) ? '✅ ' : ''}{s.name}
                  </button>
                ))}
              </div>
            </div>

            {scenario.questions.map((q2, qi) => {
              const key = `${scenarioIdx}-${qi}`;
              const given = answers[key];
              const revealed = given != null;
              return (
                <div key={key}>
                  <p className="mb-1.5 text-sm font-medium text-[#37585f]">第 {qi + 1} 问</p>
                  <div className="rounded-md border border-[#e2eeec] bg-white px-2.5 py-2">
                    <p className="text-xs leading-5 text-[#37585f]">{q2.q}</p>
                    <div className="mt-2 grid gap-1.5">
                      {q2.options.map((opt, oi) => {
                        const chosen = given === oi;
                        const good = revealed && oi === q2.answer;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => answer(qi, oi)}
                            aria-pressed={chosen}
                            className={`min-h-9 rounded-md border px-2 text-left text-xs font-semibold transition-colors ${
                              revealed
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
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => { setAnswers({}); setSolvedIds([]); }}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              重置全部
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {allDone ? '🎉 实验设计达人达成！' : `已完成组数：${solvedIds.length}/${SCENARIOS.length}`}
            </div>
          </>
        }
      >
        <SceneBox label={`${scenario.name}（甲 = 实验处理 · 乙 = 对照）`} heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {scenarioIdx === 0 ? (
              <g>
                {/* 水浴锅 */}
                <rect x="40" y="150" width="360" height="100" rx="14" fill="#cfe4f0" stroke="#3d7e9e" strokeWidth="3" />
                <text x="220" y="286" textAnchor="middle" fontSize="13" fill="#2c6e94" fontWeight="600">37℃ 水浴 10 分钟 → 分别滴碘液</text>
                {/* 甲试管：唾液 */}
                <rect x="96" y="80" width="52" height="150" rx="24" fill="#fdf3e3" stroke="#5a7a8a" strokeWidth="3" />
                <rect x="100" y="130" width="44" height="96" rx="20" fill="#f0d9a8" />
                <text x="122" y="66" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">甲：+ 唾液</text>
                {/* 乙试管：清水 */}
                <rect x="292" y="80" width="52" height="150" rx="24" fill="#fdf3e3" stroke="#5a7a8a" strokeWidth="3" />
                <rect x="296" y="130" width="44" height="96" rx="20" fill="#dcebea" />
                <text x="318" y="66" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">乙：+ 清水</text>
                {/* 馒头屑 */}
                {[[110, 200], [124, 214], [112, 222]].map(([x, y], i) => (
                  <rect key={i} x={x} y={y} width="12" height="8" rx="2" fill="#e0c9a0" stroke="#b5953a" strokeWidth="1.4" />
                ))}
                {[[306, 200], [320, 214], [308, 222]].map(([x, y], i) => (
                  <rect key={i} x={x} y={y} width="12" height="8" rx="2" fill="#e0c9a0" stroke="#b5953a" strokeWidth="1.4" />
                ))}
                {solved ? (
                  <g>
                    <rect x="100" y="130" width="44" height="96" rx="20" fill="#e8dcc0" opacity="0.7" />
                    <rect x="296" y="130" width="44" height="96" rx="20" fill="#3d4a6a" opacity="0.8" />
                    <text x="122" y="196" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">不变蓝</text>
                    <text x="318" y="196" textAnchor="middle" fontSize="12.5" fill="#cfe4f0" fontWeight="700">变蓝</text>
                  </g>
                ) : null}
              </g>
            ) : null}
            {scenarioIdx === 1 ? (
              <g>
                {/* 叶片：左遮光右照光 */}
                <path d="M120 190 Q 160 96 260 108 Q 350 120 372 196 Q 320 250 200 244 Q 140 232 120 190 Z" fill="#5a9a4a" stroke="#3f7f3a" strokeWidth="3.5" />
                <line x1="250" y1="102" x2="246" y2="240" stroke="#3f7f3a" strokeWidth="4" />
                <rect x="122" y="120" width="120" height="120" fill="#13333a" opacity="0.55" />
                <text x="182" y="272" textAnchor="middle" fontSize="13" fill="#173b42" fontWeight="700">左：遮光（黑纸）</text>
                <text x="352" y="272" textAnchor="middle" fontSize="13" fill="#173b42" fontWeight="700">右：照光</text>
                <circle cx="404" cy="52" r="18" fill="#f4d06a" stroke="#c98a1d" strokeWidth="2.5" />
                <text x="404" y="57" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="700">☀</text>
                <path d="M392 66 Q 380 84 356 96" fill="none" stroke="#e0b020" strokeWidth="2.5" strokeDasharray="6 5" markerEnd="url(#des-arrow)" />
                {solved ? (
                  <g>
                    <text x="352" y="238" textAnchor="middle" fontSize="13" fill="#1e4a68" fontWeight="700">滴碘变蓝 ✓</text>
                    <text x="176" y="238" textAnchor="middle" fontSize="13" fill="#7a2622" fontWeight="700">滴碘不变蓝 ✗</text>
                  </g>
                ) : null}
              </g>
            ) : null}
            {scenarioIdx === 2 ? (
              <g>
                {/* 冰箱 */}
                <rect x="48" y="96" width="140" height="180" rx="10" fill="#e8f1f8" stroke="#3d7e9e" strokeWidth="3.5" />
                <line x1="48" y1="146" x2="188" y2="146" stroke="#3d7e9e" strokeWidth="3" />
                <text x="118" y="84" textAnchor="middle" fontSize="13" fill="#2c6e94" fontWeight="700">冰箱（低温）</text>
                {/* 面包 */}
                <ellipse cx="118" cy="200" rx="42" ry="22" fill="#e0c9a0" stroke="#b5953a" strokeWidth="2.5" />
                {solved ? <text x="118" y="206" textAnchor="middle" fontSize="12" fill="#2f7a4d" fontWeight="700">无霉菌 ✓</text> : null}
                {/* 室温面包 */}
                <ellipse cx="330" cy="240" rx="46" ry="24" fill="#e0c9a0" stroke="#b5953a" strokeWidth="2.5" />
                <text x="330" y="160" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="700">温暖室内</text>
                {[306, 330, 354, 318].map((x, i) => (
                  <g key={i} transform={`translate(${x} ${254 - (i % 2) * 6})`}>
                    <circle r="6" fill="#8a9a4a" opacity="0.85" />
                    <circle r="3" fill="#5a7a2a" />
                  </g>
                ))}
                {solved ? <text x="330" y="292" textAnchor="middle" fontSize="12.5" fill="#b0483a" fontWeight="700">霉菌大量生长</text> : null}
                <text x="270" y="120" fontSize="12.5" fill="#799398" fontWeight="600">两组面包完全相同，仅温度不同</text>
              </g>
            ) : null}
            <defs>
              <marker id="des-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 Z" fill="#e0b020" />
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
