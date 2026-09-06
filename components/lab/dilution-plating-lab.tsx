'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>当样品中细菌数太多时，先做<span className="font-semibold">梯度稀释</span>（每管移取 1mL 到 9mL 无菌水中，稀释 10 倍），再取 0.1mL 涂布到固体培养基上。</>,
      <>一个活菌繁殖成一个<span className="font-semibold">菌落</span>，培养后数出菌落数即可推算原液活菌数：<span className="font-semibold">活菌数 ≈ 菌落数 ÷ 涂布体积 × 稀释倍数</span>。</>,
      <>计数规则：选择菌落数在 <span className="font-semibold">30~300</span> 之间的平板——太少误差大，太多重叠数不清。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>四个稀释度（10⁻¹ ~ 10⁻⁴）的平板都可涂布培养，菌落数各不相同。</>,
      <>任务：判断哪个平板最适合计数，并算出原液活菌数。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 点击「完成梯度稀释」得到四管稀释液。</>,
      <>② 分别把四管涂布到四个平板并培养，观察菌落数。</>,
      <>③ 按 30~300 规则选出最适平板，回答计数问题。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>梯度稀释：每管移液 1mL 后要<span className="font-semibold">振荡摇匀</span>再移下一管，否则浓度不准。</>,
      <>涂布前菌液要适量（0.1mL），涂布器要冷却再接触菌液；培养皿倒置培养防冷凝水滴落。</>,
      <>为什么选 30~300：少于 30 偶然误差大；多于 300 菌落重叠难以分辨计数。</>,
    ],
  },
];

/** 各稀释度每 0.1mL 的菌落数（10⁻² 太密按 356 估记） */
const TUBES = [
  { label: '10⁻¹', dil: 10, colonies: 0, tmtc: true },
  { label: '10⁻²', dil: 100, colonies: 356, tmtc: false },
  { label: '10⁻³', dil: 1000, colonies: 48, tmtc: false },
  { label: '10⁻⁴', dil: 10000, colonies: 5, tmtc: false },
];

const DOT_POS = [
  [60, 70], [140, 50], [220, 88], [300, 60], [368, 96], [96, 128], [180, 140], [258, 128],
  [330, 156], [70, 180], [150, 190], [232, 184], [312, 200], [386, 168], [110, 236], [196, 240],
  [276, 232], [352, 246], [52, 246], [170, 62],
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function DilutionPlatingLab() {
  const [diluted, setDiluted] = useState(false);
  const [plated, setPlated] = useState<number[]>([]);
  const [quiz, setQuiz] = useState<number | null>(null);
  const [calculated, setCalculated] = useState(false);

  const plate = (idx: number) => {
    if (!plated.includes(idx)) setPlated((prev) => [...prev, idx]);
  };

  const bestIdx = 2; // 10⁻³：48 个菌落
  const quizCorrect = quiz === bestIdx;

  const chosen = quiz != null ? TUBES[quiz] : null;
  const estimateText =
    chosen && quizCorrect
      ? `每 mL 原液活菌数 ≈ ${chosen.colonies} ÷ 0.1 × ${chosen.dil} = ${(chosen.colonies * 10 * chosen.dil).toLocaleString('en-US')} 个`
      : null;

  const observation = (() => {
    if (!diluted) return '第一步：对原液做梯度稀释——点击「完成梯度稀释」，得到 10⁻¹ 到 10⁻⁴ 四管稀释液。';
    const platedText = plated.map((i) => TUBES[i].label).join('、') || '无';
    if (plated.length < 4) return `已涂布：${platedText}。继续把剩下 ${4 - plated.length} 个稀释度涂布培养，才能对比选出最适平板。`;
    if (quiz == null) {
      return '四块平板都长出了菌落：10⁻² 约 356 个（重叠密集）、10⁻³ 约 48 个、10⁻⁴ 只有 5 个。按 30~300 规则，哪一块最适合计数？';
    }
    if (quizCorrect) {
      return `✅ ${estimateText}。10⁻³ 平板 48 个菌落在 30~300 之间，计数最可靠；乘回稀释倍数即得原液活菌浓度。`;
    }
    return '选错了。提示：菌落太多会重叠数不清，太少则偶然误差大——30~300 之间才可靠。';
  })();

  // 平板上菌落绘制（确定性伪随机分布）
  const plateDots = (count: number, seed: number) =>
    DOT_POS.slice(0, Math.min(count, DOT_POS.length)).map(([x, y], i) => {
      const jx = ((seed * 37 + i * 53) % 30) - 15;
      const jy = ((seed * 19 + i * 41) % 30) - 15;
      return { x: x + jx, y: y + jy };
    });

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={() => setDiluted(true)}
              disabled={diluted}
              className={`${cnChip(diluted)} w-full disabled:opacity-55`}
            >
              {diluted ? '✅ 已完成梯度稀释（10⁻¹~10⁻⁴）' : '完成梯度稀释'}
            </button>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">涂布培养（各取 0.1mL）</p>
              <div className="grid grid-cols-2 gap-1.5">
                {TUBES.map((t, i) => (
                  <button key={t.label} type="button" onClick={() => diluted && plate(i)} disabled={!diluted} aria-pressed={plated.includes(i)} className={`${cnChip(plated.includes(i))} disabled:cursor-not-allowed disabled:opacity-40`}>
                    {plated.includes(i) ? '✅ ' : ''}涂布 {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">哪个平板最适合计数？（30~300 规则）</p>
              <div className="grid grid-cols-2 gap-1.5">
                {TUBES.map((t, i) => {
                  const chosen = quiz === i;
                  const good = quizCorrect && i === bestIdx;
                  return (
                    <button
                      key={t.label}
                      type="button"
                      onClick={() => plated.length === 4 && setQuiz(i)}
                      disabled={plated.length < 4}
                      aria-pressed={chosen}
                      className={`min-h-9 rounded-md border px-2 text-xs font-semibold transition-colors ${
                        quiz != null
                          ? good
                            ? 'border-[#9fcab2] bg-[#e7f5ec] text-[#2f7a4d]'
                            : chosen
                              ? 'border-[#e0a3a3] bg-[#fbecea] text-[#b0483a]'
                              : 'border-[#e5eff0] bg-white text-[#8aa1a6]'
                          : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <button
              type="button"
              onClick={() => { setDiluted(false); setPlated([]); setQuiz(null); setCalculated(false); }}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              重置实验
            </button>
            {estimateText ? (
              <div className="rounded-md border border-[#9fcab2] bg-[#e7f5ec] px-3 py-2.5 text-xs leading-5 font-semibold text-[#2f7a4d]">
                {estimateText}
              </div>
            ) : null}
          </>
        }
      >
        <SceneBox label="四块培养平板：30~300 规则挑选计数平板" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {TUBES.map((t, i) => {
              const x = 26 + i * 104;
              const isPlated = plated.includes(i);
              const col = t.colonies;
              return (
                <g key={t.label}>
                  <circle cx={x + 44} cy={92 + (i % 2) * 96} r="46" fill="#f7fbfc" stroke="#5a7a8a" strokeWidth="3" />
                  <circle cx={x + 44} cy={92 + (i % 2) * 96} r="38" fill="#f6efdd" stroke="#d9c9a8" strokeWidth="1.8" />
                  <text x={x + 44} y={40 + (i % 2) * 96} textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">{t.label}</text>
                  {isPlated ? (
                    <g>
                      {t.tmtc ? (
                        <g>
                          <circle cx={x + 44} cy={92 + (i % 2) * 96} r="34" fill="#e8d9b0" opacity="0.9" />
                          {[[30, 76], [58, 92], [44, 110], [64, 116], [36, 106]].map(([dx, dy], j) => (
                            <circle key={j} cx={x + 44 - 14 + dx} cy={92 + (i % 2) * 96 - 14 + dy} r="7" fill="#c9a86a" stroke="#8a671b" strokeWidth="1.5" />
                          ))}
                        </g>
                      ) : (
                        <g>
                          {plateDots(Math.min(col, 20), i + 1).map((dot, j) => (
                            <circle key={j} cx={x + 44 - 38 + (dot.x / 440) * 76 + 19} cy={92 + (i % 2) * 96 - 38 + (dot.y / 300) * 76 + 19} r="2.6" fill="#b58a3a" stroke="#8a671b" strokeWidth="1" />
                          ))}
                        </g>
                      )}
                      <text x={x + 44} y={196 + (i % 2) * 96 - 92} textAnchor="middle" fontSize="12.5" fill={col >= 30 && col <= 300 ? '#2f7a4d' : '#b0483a'} fontWeight="700">
                        {t.tmtc ? '多不可计' : `≈ ${col} 个菌落`}
                      </text>
                    </g>
                  ) : (
                    <text x={x + 44} y={96 + (i % 2) * 96} textAnchor="middle" fontSize="12" fill="#9ab0b5">未涂布</text>
                  )}
                </g>
              );
            })}
            {quizCorrect && calculated === false ? null : null}
            <text x="220" y="292" textAnchor="middle" fontSize="13" fill={quizCorrect ? '#2f7a4d' : '#59767c'} fontWeight="600">
              {quizCorrect ? `10⁻³ 平板最适：48 个菌落 × 10⁴ = 每 mL 原液约 4.8×10⁵ 个` : '规则：菌落数 30~300 的平板才适合计数'}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
