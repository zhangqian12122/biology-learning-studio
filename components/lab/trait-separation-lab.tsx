'use client';

import { useMemo, useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>杂合子 F₁（Dd）产生两种配子：D 和 d，比例 1:1；雌雄配子<span className="font-semibold">随机结合</span>。</>,
      <>后代基因型比例 DD : Dd : dd ≈ <span className="font-semibold">1 : 2 : 1</span>，表现型比例显性 : 隐性 ≈ <span className="font-semibold">3 : 1</span>。</>,
      <>抓取小球模拟的是"雌雄配子随机结合"；次数越多，统计比例越接近理论值——用统计学方法研究遗传问题。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>小桶 2 个（分别代表雌、雄生殖器官），彩球 20 个（两种颜色各 10 个，分别代表含 D 和 d 的配子）。</>,
      <>记录用的纸和笔。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 两桶内各放入两种彩球各 10 个，摇匀。</>,
      <>② 分别从两个桶中<span className="font-semibold">随机抓取一个小球</span>，组合在一起记录基因型，随后放回原桶。</>,
      <>③ 重复 50~100 次，统计各种基因型的数量比例。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>每次抓取后必须<span className="font-semibold">放回原桶</span>并摇匀——保证每次抓取概率不变。</>,
      <>抓球次数越少，偶然误差越大；重复次数足够多，比例才接近理论值。</>,
      <>桶内两种球的数量必须相等（各 10 个），模拟 F₁ 产生两种配子比例 1:1。</>,
    ],
  },
];

const COMBOS = ['DD', 'Dd', 'dd'] as const;

export function TraitSeparationLab() {
  const [counts, setCounts] = useState<Record<(typeof COMBOS)[number], number>>({ DD: 0, Dd: 0, dd: 0 });
  const [lastPick, setLastPick] = useState<{ a: 'D' | 'd'; b: 'D' | 'd'; combo: (typeof COMBOS)[number] } | null>(null);
  const total = counts.DD + counts.Dd + counts.dd;

  const grab = () => {
    const a: 'D' | 'd' = Math.random() < 0.5 ? 'D' : 'd';
    const b: 'D' | 'd' = Math.random() < 0.5 ? 'D' : 'd';
    const combo: (typeof COMBOS)[number] = a === b ? (a === 'D' ? 'DD' : 'dd') : 'Dd';
    setLastPick({ a, b, combo });
    setCounts((prev) => ({ ...prev, [combo]: prev[combo] + 1 }));
  };

  const reset = () => {
    setCounts({ DD: 0, Dd: 0, dd: 0 });
    setLastPick(null);
  };

  // 统计条形（含理论线 1:2:1）
  const bars = useMemo(() => {
    const max = Math.max(1, counts.DD, counts.Dd, counts.dd);
    return COMBOS.map((combo) => {
      const ratio = total > 0 ? counts[combo] / total : 0;
      return { combo, count: counts[combo], width: (counts[combo] / max) * 100, ratio, theory: total > 0 ? 0.25 + (combo === 'Dd' ? 0.25 : 0) : 0 };
    });
  }, [counts, total]);

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={grab}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              🎲 从两桶各抓取一个配子
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              清空统计重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              已模拟 {total} 次。建议重复 50 次以上，比例才稳定接近理论值 1:2:1。
            </div>
          </>
        }
      >
        <SceneBox label="配子抓取结果（左桶雌配子 + 右桶雄配子）" heightClass="h-[300px]">
          <svg className="h-full w-full" viewBox="0 0 420 240" aria-hidden="true">
            {/* 两个桶 */}
            {[[-1, '雌配子桶'], [1, '雄配子桶']].map(([dx, label]) => (
              <g key={label as string}>
                <path d={`M${210 + (dx as number) * 118 - 42} 66 L${210 + (dx as number) * 118 + 42} 66 L${210 + (dx as number) * 118 + 32} 150 L${210 + (dx as number) * 118 - 32} 150 Z`} fill="#d8e4e8" stroke="#8aa7ad" strokeWidth="2.5" />
                {[-18, 0, 18].map((dx2, i) => (
                  <circle key={i} cx={210 + (dx as number) * 118 + dx2} cy={58} r="9" fill={i % 2 === 0 ? '#5aa8c9' : '#e0b06a'} stroke="#8a7a4a" strokeWidth="1.5" />
                ))}
                <text x={210 + (dx as number) * 118} y={174} textAnchor="middle" fontSize="10.5" fill="#4b6c73" fontWeight="600">
                  {label}
                </text>
              </g>
            ))}

            {/* 本次抓取的两个球 + 组合结果 */}
            {lastPick ? (
              <g className="bio-pop">
                <circle cx="150" cy="200" r="16" fill={lastPick.a === 'D' ? '#5aa8c9' : '#e0b06a'} stroke="#6a8a8a" strokeWidth="2" />
                <text x="150" y="205" textAnchor="middle" fontSize="12" fill="#ffffff" fontWeight="800">{lastPick.a}</text>
                <text x="185" y="205" textAnchor="middle" fontSize="14" fill="#4b6c73" fontWeight="700">+</text>
                <circle cx="220" cy="200" r="16" fill={lastPick.b === 'D' ? '#5aa8c9' : '#e0b06a'} stroke="#6a8a8a" strokeWidth="2" />
                <text x="220" y="205" textAnchor="middle" fontSize="12" fill="#ffffff" fontWeight="800">{lastPick.b}</text>
                <line x1="252" y1="200" x2="278" y2="200" stroke="#4b6c73" strokeWidth="2" />
                <rect x="286" y="182" width="66" height="36" rx="8" fill={lastPick.combo === 'dd' ? '#e8c9c9' : '#c9d8e8'} stroke="#5a7a8a" strokeWidth="2" />
                <text x="319" y="206" textAnchor="middle" fontSize="15" fill="#13333a" fontWeight="800">
                  {lastPick.combo}
                </text>
              </g>
            ) : (
              <text x="210" y="205" textAnchor="middle" fontSize="11" fill="#9ab0b5">
                点击左侧「抓取」开始模拟
              </text>
            )}
          </svg>

          {/* 统计条形 */}
          <div className="border-t border-[#dceaea] px-4 py-3">
            {bars.map(({ combo, count, width }) => (
              <div key={combo} className="mb-1.5 flex items-center gap-2">
                <span className="w-8 text-xs font-bold text-[#13333a]">{combo}</span>
                <div className="relative h-4 flex-1 rounded-full bg-[#eef4f3]">
                  <div className="h-4 rounded-full bg-[#5aa8c9] transition-all" style={{ width: `${width}%` }} />
                </div>
                <span className="w-16 text-right text-[11px] text-[#59767c]">
                  {count} 次（{total > 0 ? ((count / total) * 100).toFixed(0) : 0}%）
                </span>
              </div>
            ))}
            <p className="mt-1 text-[11px] text-[#799398]">
              理论值：DD : Dd : dd = 1 : 2 : 1（表现型 显:隐 = 3:1）
            </p>
          </div>
        </SceneBox>

        <ObservationNote>
          {total === 0
            ? '点击「抓取」模拟一次雌雄配子的随机结合。抓够 30 次以上，看看三种基因型的比例像不像 1:2:1。'
            : `已模拟 ${total} 次：DD ${counts.DD} 次、Dd ${counts.Dd} 次、dd ${counts.dd} 次。${total >= 30 ? '样本足够多，比例已接近理论值。' : '次数还少，比例波动大——再多抓几次。'}`}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
