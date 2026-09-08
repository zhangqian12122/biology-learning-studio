'use client';

import { useMemo, useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（四分体时期的交叉互换）',
    lines: [
      <>减数第一次分裂前期：同源染色体两两配对（联会），每对含 4 条染色单体，称<span className="font-semibold">四分体</span>。</>,
      <>四分体中的<span className="font-semibold">非姐妹染色单体</span>之间常发生交叉，并交换对应片段——这就是<span className="font-semibold">交叉互换</span>，属于基因重组。</>,
      <>结果：一个初级性母细胞产生的 4 个配子中，2 个为亲本型（AB、ab），2 个为重组型（Ab、aB）——重组配子的比例取决于互换频率。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>基因 A/a 与 B/b 位于同一对同源染色体上。初始：一条染色体载 AB，另一条载 ab（连锁）。</>,
      <>开关「发生交叉互换」：B/b 片段在两条非姐妹单体间交换。</>,
      <>观察点：不互换时只产生 AB 与 ab 两种配子；互换后 Ab、aB 重组配子出现了。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 不开互换，点「产生 4 个配子」：只有 AB 与 ab（完全连锁）。</>,
      <>② 打开「发生交叉互换」，再点「产生 4 个配子」：四种配子 1:1:1:1。</>,
      <>③ 多次模拟统计，看重组配子比例如何反映互换频率。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>交叉互换发生在<span className="font-semibold">减Ⅰ前期四分体</span>的<span className="font-semibold">非姐妹染色单体</span>之间——姐妹单体之间不互换。</>,
      <>基因重组的两大来源：<span className="font-semibold">自由组合</span>（非同源染色体）与<span className="font-semibold">交叉互换</span>（同源染色体）。</>,
      <>互换频率与两基因的距离成正比——距离越远，互换概率越高（这是基因定位的原理）。</>,
    ],
  },
];

type Gamete = 'AB' | 'Ab' | 'aB' | 'ab';
const GAMETES: Gamete[] = ['AB', 'Ab', 'aB', 'ab'];
const GAMETE_COLORS: Record<Gamete, string> = { AB: '#4a9a6a', Ab: '#c9a05a', aB: '#5a8ac9', ab: '#c9708a' };

export function CrossingOverLab() {
  const [crossing, setCrossing] = useState(false);
  const [counts, setCounts] = useState<Record<Gamete, number>>({ AB: 0, Ab: 0, aB: 0, ab: 0 });
  const [last, setLast] = useState<Gamete[]>([]);

  const total = counts.AB + counts.Ab + counts.aB + counts.ab;

  const makeFour = () => {
    const out: Gamete[] = [];
    if (!crossing) {
      // 完全连锁：两个 AB + 两个 ab
      out.push('AB', 'AB', 'ab', 'ab');
    } else {
      // 互换：AB、Ab、aB、ab 各一个
      out.push('AB', 'Ab', 'aB', 'ab');
    }
    setLast(out);
    setCounts((prev) => {
      const next = { ...prev };
      for (const g of out) next[g]++;
      return next;
    });
  };

  const reset = () => {
    setCounts({ AB: 0, Ab: 0, aB: 0, ab: 0 });
    setLast([]);
  };

  const bars = useMemo(() => {
    const max = Math.max(1, ...GAMETES.map((g) => counts[g]));
    return GAMETES.map((g) => ({ g, count: counts[g], width: (counts[g] / max) * 100 }));
  }, [counts]);

  const observation = (() => {
    if (total === 0) {
      return crossing
        ? '已开启交叉互换：B/b 片段在两条非姐妹染色单体间交换。点「产生 4 个配子」看重组结果。'
        : '未发生交叉互换：AB 连锁在一条染色体、ab 连锁在另一条上。点「产生 4 个配子」先看完全连锁的结果。';
    }
    if (!crossing) {
      return `不互换（完全连锁）：配子只有 AB 和 ab 两种各半——Ab 与 aB 重组型一个都没出现。打开「交叉互换」再试。`;
    }
    return `交叉互换后：四种配子 AB、Ab、aB、ab 各占 1/4——非姐妹染色单体交换片段让基因重组了！这就是同源染色体上的基因也能重组的原因。`;
  })();

  // 染色体单体颜色：交叉后下方片段互换
  const drawChromatid = (x: number, top: boolean, swapped: boolean) => {
    // top 组：AB 链；bottom 组：ab 链。swapped 表示下段换成对方颜色
    const segLen = 46;
    const y = top ? 96 : 190;
    const upperColor = top ? '#c9708a' : '#4d7ea8';
    const lowerColor = top ? (swapped ? '#4d7ea8' : '#c9708a') : swapped ? '#c9708a' : '#4d7ea8';
    return (
      <>
        <rect x={x} y={y} width="16" height={segLen} rx="7" fill={upperColor} stroke="#13333a" strokeWidth="1.6" />
        <rect x={x} y={y + segLen + 2} width="16" height={segLen} rx="7" fill={lowerColor} stroke="#13333a" strokeWidth="1.6" />
        <text x={x + 8} y={y + 18} textAnchor="middle" fontSize="10" fill={top ? '#ffffff' : '#13333a'} fontWeight="800">{top ? 'A' : 'a'}</text>
        <text x={x + 8} y={y + segLen + 24} textAnchor="middle" fontSize="10" fill={swapped ? (top ? '#1e4a68' : '#8a2a4a') : top ? '#8a2a4a' : '#1e4a68'} fontWeight="800">{top ? 'B' : 'b'}</text>
      </>
    );
  };

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={() => setCrossing((c) => !c)}
              className={`inline-flex min-h-11 w-full items-center justify-center rounded-md px-3 text-xs font-semibold transition-colors ${
                crossing ? 'bg-[#b0483a] text-white hover:bg-[#9a3a2e]' : 'bg-[#0e6f75] text-white hover:bg-[#0c5f64]'
              }`}
            >
              {crossing ? '🔀 交叉互换：开（点此关闭）' : '── 交叉互换：关（点此开启）'}
            </button>
            <button
              type="button"
              onClick={makeFour}
              className="min-h-10 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-semibold text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              🧬 一个初级性母细胞 → 4 个配子
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              清空统计
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              已统计配子：<span className="text-base font-bold text-[#13333a]">{total}</span> 个
              <br />
              {crossing ? '互换开：四分体的非姐妹单体交换片段' : '互换关：基因完全连锁'}
            </div>
          </>
        }
      >
        <SceneBox label="减Ⅰ前期 · 四分体（A/a 与 B/b 连锁在同一对同源染色体上）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 四条染色单体 */}
            <g>
              {/* 上方：来自父方的两条姐妹单体（载 AB） */}
              {drawChromatid(120, true, crossing)}
              {drawChromatid(142, true, crossing)}
              {/* 下方：来自母方的两条姐妹单体（载 ab） */}
              {drawChromatid(250, false, crossing)}
              {drawChromatid(272, false, crossing)}
              {/* 交叉标记 */}
              {crossing ? (
                <g>
                  <path d="M136 160 L 268 176" stroke="#b0483a" strokeWidth="2.6" strokeDasharray="6 4" />
                  <text x="202" y="162" textAnchor="middle" fontSize="10" fill="#b0483a" fontWeight="800">交叉互换 ✓</text>
                </g>
              ) : null}
              <text x="136" y="86" textAnchor="middle" fontSize="10" fill="#8a2a4a" fontWeight="700">姐妹单体 1（AB）</text>
              <text x="158" y="86" textAnchor="middle" fontSize="10" fill="#8a2a4a" fontWeight="700">姐妹单体 2</text>
              <text x="266" y="86" textAnchor="middle" fontSize="10" fill="#1e4a68" fontWeight="700">姐妹单体 1（ab）</text>
              <text x="288" y="86" textAnchor="middle" fontSize="10" fill="#1e4a68" fontWeight="700">姐妹单体 2</text>
            </g>
            {/* 本次 4 个配子 */}
            <g>
              <text x="36" y="216" fontSize="11" fill="#59767c" fontWeight="700">本次 4 个配子：</text>
              {(last.length ? last : ['?', '?', '?', '?'] as string[]).map((g, i) => (
                <g key={i}>
                  <rect x={150 + i * 70} y={200} width="58" height="30" rx="7" fill={last.length ? GAMETE_COLORS[g as Gamete] : '#eef4f3'} stroke="#13333a" strokeWidth="1.6" />
                  <text x={179 + i * 70} y={221} textAnchor="middle" fontSize="12.5" fill={last.length ? '#13333a' : '#9ab0b5'} fontWeight="800">{g}</text>
                </g>
              ))}
            </g>
          </svg>

          {/* 统计条形 */}
          <div className="border-t border-[#dceaea] px-4 py-3">
            {bars.map(({ g, count, width }) => (
              <div key={g} className="mb-1.5 flex items-center gap-2">
                <span className="w-9 text-xs font-bold" style={{ color: GAMETE_COLORS[g] }}>{g}</span>
                <div className="relative h-4 flex-1 rounded-full bg-[#eef4f3]">
                  <div className="h-4 rounded-full transition-all" style={{ width: `${width}%`, background: GAMETE_COLORS[g] }} />
                </div>
                <span className="w-16 text-right text-[11px] text-[#59767c]">{count} 个</span>
              </div>
            ))}
            <p className="mt-1 text-[11px] text-[#799398]">
              {crossing ? '互换后四种配子 1:1:1:1 —— 重组型 Ab 与 aB 出现了' : '不互换（完全连锁）：只产生 AB 与 ab 两种亲本型配子'}
            </p>
          </div>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
