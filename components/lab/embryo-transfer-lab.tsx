'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>试管婴儿的第一程：<span className="font-semibold">体外受精</span>（精子获能 + 卵母细胞培养成熟）→ <span className="font-semibold">早期胚胎培养</span> → <span className="font-semibold">胚胎移植</span>到代孕母体。</>,
      <>移植时机：胚胎发育到<span className="font-semibold">桑椹胚或囊胚</span>阶段移植成功率最高——太早太晚都不行。</>,
      <>供体提供优良胚胎，受体（代孕母体）只提供发育环境——"借腹怀胎，不见其蛋"。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>流程五步按正确顺序点亮；顺序错了给提示。</>,
      <>流程完成后追加一道"移植时机"判断题。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 按课本流程依次点选五个步骤。</>,
      <>② 观察胚胎发育小图从受精卵推进到囊胚。</>,
      <>③ 回答移植时机问题，完成"流程达人"成就。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>精子必须<span className="font-semibold">获能</span>才有受精能力；卵母细胞要培养到<span className="font-semibold">减数第二次分裂中期（MⅡ 中期）</span>才能受精。</>,
      <>囊胚期的<span className="font-semibold">内细胞团</span>是胚胎干细胞的主要来源；滋养层将来发育成胎盘等。</>,
      <>移植后的受体要做<span className="font-semibold">同期发情处理</span>，保证子宫环境与胚胎发育阶段同步。</>,
    ],
  },
];

const STEPS = ['供体超数排卵', '精子获能处理', '体外受精', '早期胚胎培养', '胚胎移植'];

const STAGES = ['受精卵', '2 细胞', '4 细胞', '桑椹胚', '囊胚'];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function EmbryoTransferLab() {
  const [order, setOrder] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const [stageAnswer, setStageAnswer] = useState<string | null>(null);

  const orderDone = order.length === STEPS.length;
  const quizDone = stageAnswer === '桑椹胚或囊胚';
  const allDone = orderDone && quizDone;

  const pick = (name: string) => {
    if (orderDone) return;
    if (name === STEPS[order.length]) {
      setOrder((prev) => [...prev, name]);
      setWrong(null);
    } else {
      setWrong('顺序不对——回忆"取卵 → 获能 → 受精 → 培养 → 移植"的主线');
      setTimeout(() => setWrong(null), 900);
    }
  };

  const reset = () => {
    setOrder([]);
    setWrong(null);
    setStageAnswer(null);
  };

  const observation = (() => {
    if (order.length === 0) return '按课本流程给五个步骤排序：从"拿到卵子和有能力的精子"开始。';
    if (!orderDone) return `已点亮 ${order.length}/5 步——下一步该做什么？`;
    if (!quizDone) return `流程排序完成！胚胎已培养到囊胚。最后一问：移植给代孕母体时，一般选择哪个时期的胚胎？`;
    return `🎉 全流程走通：超数排卵 → 获能 → 体外受精 → 培养到桑椹胚/囊胚 → 移植。受体还需"同期发情"处理保证子宫与胚胎同步。`;
  })();

  const lightUp = orderDone ? 5 : order.length;

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">① 按流程点选步骤（{order.length}/5）</p>
              <div className="flex flex-wrap gap-1.5">
                {STEPS.map((name) => {
                  const placed = order.includes(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => pick(name)}
                      disabled={placed}
                      className={`${cnChip(placed)} disabled:cursor-default disabled:opacity-55 ${wrong && !placed ? 'border-[#e0a3a3]' : ''}`}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
              {wrong ? <p className="mt-1.5 text-xs font-medium text-[#b0483a]">{wrong}</p> : null}
              {orderDone ? <p className="mt-1.5 text-xs font-medium text-[#2f7a4d]">✅ 流程排序正确</p> : null}
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">② 移植时选择哪个时期的胚胎？</p>
              <div className="grid grid-cols-3 gap-1.5">
                {['受精卵', '桑椹胚或囊胚', '原肠胚'].map((v) => {
                  const chosen = stageAnswer === v;
                  const reveal = stageAnswer != null;
                  const good = v === '桑椹胚或囊胚';
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => orderDone && setStageAnswer(v)}
                      disabled={!orderDone}
                      aria-pressed={chosen}
                      className={`min-h-10 rounded-md border px-2 text-xs font-semibold transition-colors ${
                        reveal
                          ? good
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
              {quizDone ? <p className="mt-1.5 text-xs font-medium text-[#2f7a4d]">✅ 桑椹胚或囊胚期移植成功率最高</p> : null}
            </div>

            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置流程
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {allDone ? '🎉 流程达人达成！' : `完成排序 ✅ / 判断题 ${quizDone ? '✅' : '…'}`}
            </div>
          </>
        }
      >
        <SceneBox label="体外受精与胚胎发育推进（点对步骤会点亮下一时期）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 发育时期条 */}
            {STAGES.map((name, i) => {
              const cx = 62 + i * 82;
              const cy = 110;
              const lit = lightUp > i;
              const opacity = lit ? 1 : 0.35;
              return (
                <g key={name} style={{ opacity, transition: 'opacity 0.35s ease' }}>
                  {i < STAGES.length - 1 ? (
                    <line x1={cx + 22} y1={cy} x2={cx + 58} y2={cy} stroke="#8aa1a6" strokeWidth="2.5" markerEnd="url(#et-arrow)" />
                  ) : null}
                  {i === 0 ? <circle cx={cx} cy={cy} r="18" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="2.5" /> : null}
                  {i === 1 ? (
                    <>
                      <circle cx={cx - 8} cy={cy} r="11" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="2.2" />
                      <circle cx={cx + 9} cy={cy} r="11" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="2.2" />
                    </>
                  ) : null}
                  {i === 2 ? (
                    <>
                      {[[-11, -7], [10, -6], [-2, 9]].map(([dx, dy], j) => (
                        <circle key={j} cx={cx + dx} cy={cy + dy} r="9" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="2" />
                      ))}
                    </>
                  ) : null}
                  {i === 3 ? (
                    <>
                      {[[-13, -9], [4, -11], [13, 4], [-6, 8], [2, -1], [-14, 6]].map(([dx, dy], j) => (
                        <circle key={j} cx={cx + dx} cy={cy + dy} r="7.5" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="2" />
                      ))}
                    </>
                  ) : null}
                  {i === 4 ? (
                    <>
                      <circle cx={cx} cy={cy} r="24" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="2.5" />
                      <circle cx={cx - 4} cy={cy - 6} r="10" fill="#b48ad0" stroke="#7a4a8a" strokeWidth="2" />
                      <circle cx={cx} cy={cy} r="23" fill="none" stroke="#7a4a8a" strokeWidth="1.4" strokeDasharray="4 3" />
                    </>
                  ) : null}
                  <text x={cx} y={cy + 44} textAnchor="middle" fontSize="13.5" fill={lit ? '#173b42' : '#8aa1a6'} fontWeight="700">{name}</text>
                </g>
              );
            })}
            {/* 囊胚标注 */}
            {lightUp === 5 ? (
              <g style={{ opacity: 1, transition: 'opacity 0.4s ease' }}>
                <line x1="388" y1="84" x2="404" y2="96" stroke="#5a8a94" strokeWidth="1.4" />
                <text x="330" y="60" fontSize="13.5" fill="#5a8a94" fontWeight="700">内细胞团（胚胎干细胞来源）</text>
                <text x="330" y="44" fontSize="13" fill="#5a8a94" fontWeight="600">滋养层 → 胎盘等</text>
              </g>
            ) : null}
            {/* 移植示意 */}
            {lightUp === 5 ? (
              <g>
                <path d="M420 118 Q 452 170 400 214" fill="none" stroke="#b0483a" strokeWidth="3.5" markerEnd="url(#et-arrow)" />
                <path d="M330 258 Q 396 250 402 226" fill="none" stroke="#b0483a" strokeWidth="0" />
                <rect x="286" y="222" width="132" height="52" rx="26" fill="#f6d7c4" stroke="#b0483a" strokeWidth="3" />
                <circle cx="318" cy="248" r="9" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="2" />
                <text x="392" y="286" textAnchor="middle" fontSize="13.5" fill="#b0483a" fontWeight="700">移植入受体子宫</text>
              </g>
            ) : null}
            <defs>
              <marker id="et-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
              </marker>
            </defs>
            <text x="16" y="42" fontSize="13.5" fill="#2c6e94" fontWeight="700">试管生命第一程：体外受精 → 早期培养 → 移植（供体给胚胎，受体给环境）</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
