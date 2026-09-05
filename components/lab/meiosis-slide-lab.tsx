'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>蝗虫精母细胞的减数分裂固定装片中，不同细胞处于不同时期，染色体<span className="font-semibold">形态、位置、数目</span>各具特征。</>,
      <>减数第一次分裂：<span className="font-semibold">同源染色体分离</span>，染色体数目减半；减数第二次分裂：<span className="font-semibold">着丝点分裂</span>，姐妹染色单体分开。</>,
      <>结果：一个精母细胞 → 4 个精细胞，染色体数目减半（2n → n）。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：蝗虫精母细胞减数分裂固定装片（已被染色）。</>,
      <>用具：显微镜（低倍镜 + 高倍镜）。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 低倍镜下找到分生区式的精母细胞区域，移至视野中央。</>,
      <>② 换高倍镜观察，依据染色体行为判断各细胞所处的时期。</>,
      <>③ 与有丝分裂固定装片对比观察，区分两种分裂。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>减Ⅰ后期最重要的识别特征：<span className="font-semibold">同源染色体分离</span>（成对的染色体分开移向两极）——有丝分裂后期没有这个现象。</>,
      <>减Ⅱ中期：染色体数目已经减半，着丝点排列在赤道板上。</>,
      <>精细胞：染色体数目减半、无染色单体。</>,
      <>装片中的细胞是<span className="font-semibold">死细胞</span>，观察的是静态图像，不能看到连续过程。</>,
    ],
  },
];

type Stage = 'miMetaphase' | 'miAnaphase' | 'miiMetaphase' | 'spermatid';

/** 减数分裂各期细胞图形 */
function CellGlyph({ stage, cx, cy }: { stage: Stage | 'spermatogonium'; cx: number; cy: number }) {
  if (stage === 'miMetaphase') {
    // 减 I 中期：成对同源染色体排列在赤道板两侧
    return (
      <g>
        <circle cx={cx} cy={cy} r="24" fill="#f2ecf6" stroke="#9a6fb5" strokeWidth="2" />
        {[[-9, -6], [9, -6]].map(([dx], i) => (
          <g key={`u${i}`}>
            <rect x={cx + dx - 9} y={cy - 12} width="18" height="6" rx="3" fill="#7a4a8a" />
          </g>
        ))}
        {[[-9, 6], [9, 6]].map(([dx], i) => (
          <g key={`d${i}`}>
            <rect x={cx + dx - 9} y={cy + 5} width="18" height="6" rx="3" fill="#b58ad0" />
          </g>
        ))}
      </g>
    );
  }
  if (stage === 'miAnaphase') {
    // 减 I 后期：同源染色体分离，各移向一极（上面一组大的红蓝成对 → 分开）
    return (
      <g>
        <circle cx={cx} cy={cy} r="26" fill="#f2ecf6" stroke="#9a6fb5" strokeWidth="2" />
        {[[-16, -14], [0, -18], [16, -12]].map(([dx, dy], i) => (
          <rect key={`a${i}`} x={cx + dx - 8} y={cy + dy - 3} width="16" height="6" rx="3" fill="#7a4a8a" />
        ))}
        {[[-16, 14], [0, 18], [16, 12]].map(([dx, dy], i) => (
          <rect key={`b${i}`} x={cx + dx - 8} y={cy + dy - 3} width="16" height="6" rx="3" fill="#b58ad0" />
        ))}
      </g>
    );
  }
  if (stage === 'miiMetaphase') {
    // 减 II 中期：染色体数目减半，着丝点排在赤道板
    return (
      <g>
        <circle cx={cx} cy={cy} r="20" fill="#f2ecf6" stroke="#b58ad0" strokeWidth="2" />
        {[-7, 0, 7].map((dx, i) => (
          <g key={i}>
            <circle cx={cx + dx} cy={cy} r="2.8" fill="#8a5a9f" />
            <line x1={cx + dx - 4} y1={cy - 5} x2={cx + dx + 4} y2={cy + 5} stroke="#8a5a9f" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        ))}
      </g>
    );
  }
  // 精细胞：小、核占比大、无染色单体
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="13" ry="9" fill="#e6dbf0" stroke="#9a6fb5" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="4.5" fill="#8a5a9f" />
      <path d={`M${cx + 13} ${cy} h 10`} stroke="#9a6fb5" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

const OPTIONS: { id: Stage; label: string }[] = [
  { id: 'miMetaphase', label: '减Ⅰ中期' },
  { id: 'miAnaphase', label: '减Ⅰ后期' },
  { id: 'miiMetaphase', label: '减Ⅱ中期' },
  { id: 'spermatid', label: '精细胞' },
];

/** 视野中的细胞：随机顺序排布 */
const FIELD = [
  { id: 1, stage: 'miMetaphase' as Stage, x: 90, y: 85 },
  { id: 2, stage: 'miAnaphase' as Stage, x: 215, y: 70 },
  { id: 3, stage: 'miiMetaphase' as Stage, x: 345, y: 95 },
  { id: 4, stage: 'spermatid' as Stage, x: 120, y: 210 },
  { id: 5, stage: 'miAnaphase' as Stage, x: 250, y: 225 },
  { id: 6, stage: 'spermatid' as Stage, x: 370, y: 235 },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-2.5 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function MeiosisSlideLab() {
  const [picked, setPicked] = useState<number | null>(null);
  const [answered, setAnswered] = useState<Record<number, { pick: Stage; right: boolean }>>({});
  const correctCount = Object.values(answered).filter((a) => a.right).length;

  const answer = (pick: Stage) => {
    if (picked == null) return;
    const cell = FIELD.find((c) => c.id === picked)!;
    const right = cell.stage === pick;
    setAnswered((prev) => ({ ...prev, [picked]: { pick, right } }));
    setPicked(null);
  };

  const allDone = FIELD.every((c) => answered[c.id] != null);

  const feedback = (() => {
    if (picked == null) {
      const answeredN = Object.keys(answered).length;
      return answeredN
        ? `已判断 ${answeredN}/${FIELD.length} 个细胞。继续点下一个细胞。`
        : '点击视野中任意一个细胞，判断它处于哪个分裂时期。';
    }
    const cell = FIELD.find((c) => c.id === picked)!;
    return `选中了${cell.stage === 'miMetaphase' ? '减Ⅰ中期' : cell.stage === 'miAnaphase' ? '减Ⅰ后期' : cell.stage === 'miiMetaphase' ? '减Ⅱ中期' : '精细胞'}模样的细胞——在下方选择时期。提示：${cell.stage === 'miMetaphase' ? '成对染色体排在赤道板两侧' : cell.stage === 'miAnaphase' ? '同源染色体分离、移向两极' : cell.stage === 'miiMetaphase' ? '染色体数目减半、着丝点排赤道板' : '体积小、染色体减半'}`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              判断进度：{Object.keys(answered).length}/{FIELD.length} · 答对 {correctCount} 个
            </div>
            {picked != null ? (
              <div>
                <p className="mb-2 text-sm font-medium text-[#37585f]">这个细胞处于？</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {OPTIONS.map((opt) => (
                    <button key={opt.id} type="button" onClick={() => answer(opt.id)} className={cnChip(false)}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">{feedback}</div>
            )}
            <button
              type="button"
              onClick={() => {
                setAnswered({});
                setPicked(null);
              }}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              重新判断
            </button>
          </>
        }
      >
        <SceneBox label="高倍镜视野：蝗虫精母细胞减数分裂固定装片" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            <circle cx="220" cy="155" r="146" fill="#fbfaf6" stroke="#c4d6da" strokeWidth="5" />
            {FIELD.map((c) => {
              const a = answered[c.id];
              return (
                <g key={c.id} onClick={() => setPicked(c.id)} style={{ cursor: a ? 'default' : 'pointer' }}>
                  <circle cx={c.x} cy={c.y} r="30" fill={a ? (a.right ? '#e2f2e6' : '#f9e2e0') : '#f6f3fa'} stroke={a ? (a.right ? '#5f9e6f' : '#c98a7a') : '#b8a8d0'} strokeWidth={picked === c.id ? 3 : 1.8} />
                  <CellGlyph stage={c.stage} cx={c.x} cy={c.y} />
                  {a ? (
                    <text x={c.x} y={c.y + 44} textAnchor="middle" fontSize="9.5" fill={a.right ? '#2f7a4d' : '#b0483a'} fontWeight="700">
                      {OPTIONS.find((o) => o.id === a.pick)?.label}
                      {a.right ? ' ✓' : ''}
                    </text>
                  ) : null}
                </g>
              );
            })}
            {allDone ? (
              <text x="220" y="22" textAnchor="middle" fontSize="12" fill="#2f7a4d" fontWeight="800">
                🎉 全部判断正确！
              </text>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>{feedback}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
