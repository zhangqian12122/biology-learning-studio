'use client';

import { useMemo, useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>红绿色盲是<span className="font-semibold">X 染色体隐性遗传病</span>（由 b 基因控制，B 为正常显性）：女性基因型 XᴮXᴮ、XᴮXᵇ（携带者，表现正常）、XᵇXᵇ（色盲）；男性只有一条 X，XᴮY 正常、XᵇY 色盲。</>,
      <>减数分裂时两条性染色体分离：女性产生 Xᴮ 或 Xᵇ 两种卵细胞；男性产生含 Xᴮ/Xᵇ 的精子或含 Y 的精子，比例 1:1。</>,
      <>色盲遗传的典型特点：<span className="font-semibold">男性患者多于女性</span>，且存在"色盲基因交叉遗传"（男→女→男）。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>六种婚配组合：从"双方都正常"到"双方都色盲"，覆盖所有常见考题组合。</>,
      <>每次模拟随机产生一个后代：性别 1:1，相应基因随性染色体随机分配。</>,
      <>观察点：哪些组合会生出色盲孩子？为什么男性患者更多？</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 选择婚配组合，点「模拟 1 个后代」看清基因来源。</>,
      <>② 点「快速模拟 200 个」累计统计，对比四类后代的实际比例与理论比例。</>,
      <>③ 重点做「女携带 × 男色盲」与「女携带 × 男正常」两组，找出色盲男孩出现的条件。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>女色盲必须"父色盲 + 母至少携带"才可能出现——人群中女患者远少于男患者的根本原因。</>,
      <>"母患子必患"：儿子唯一的 X 来自母亲，母亲是患者（XᵇXᵇ）则儿子全部色盲。</>,
      <>表现正常的女性可能是携带者，而男性要么正常要么患病——<span className="font-semibold">没有"携带者男性"</span>。</>,
    ],
  },
];

/** 母亲基因型 / 父亲基因型组合 */
type Cross = {
  id: string;
  label: string;
  mother: 'XBXB' | 'XBXb' | 'XbXb';
  father: 'XBY' | 'XbY';
};

const CROSSES: Cross[] = [
  { id: 'c1', label: '女正常(XᴮXᴮ) × 男正常(XᴮY)', mother: 'XBXB', father: 'XBY' },
  { id: 'c2', label: '女正常(XᴮXᴮ) × 男色盲(XᵇY)', mother: 'XBXB', father: 'XbY' },
  { id: 'c3', label: '女携带(XᴮXᵇ) × 男正常(XᴮY)', mother: 'XBXb', father: 'XBY' },
  { id: 'c4', label: '女携带(XᴮXᵇ) × 男色盲(XᵇY)', mother: 'XBXb', father: 'XbY' },
  { id: 'c5', label: '女色盲(XᵇXᵇ) × 男正常(XᴮY)', mother: 'XbXb', father: 'XBY' },
  { id: 'c6', label: '女色盲(XᵇXᵇ) × 男色盲(XᵇY)', mother: 'XbXb', father: 'XbY' },
];

type ChildPheno = '女正常' | '女色盲' | '男正常' | '男色盲';
const PHENO_ORDER: ChildPheno[] = ['女正常', '女色盲', '男正常', '男色盲'];
const PHENO_COLORS: Record<ChildPheno, string> = {
  女正常: '#7aa86a',
  女色盲: '#c96a8a',
  男正常: '#5aa8c9',
  男色盲: '#b0483a',
};

/** 理论比例（每种组合下四类后代各占 1/4 的份数） */
const THEORY: Record<string, Record<ChildPheno, number>> = {
  c1: { 女正常: 2, 女色盲: 0, 男正常: 2, 男色盲: 0 },
  c2: { 女正常: 2, 女色盲: 0, 男正常: 1, 男色盲: 1 },
  c3: { 女正常: 2, 女色盲: 0, 男正常: 1, 男色盲: 1 },
  c4: { 女正常: 1, 女色盲: 1, 男正常: 1, 男色盲: 1 },
  c5: { 女正常: 2, 女色盲: 0, 男正常: 1, 男色盲: 1 },
  c6: { 女正常: 0, 女色盲: 2, 男正常: 0, 男色盲: 2 },
};

function simulateChild(cross: Cross): ChildPheno {
  // 母亲产卵：X^B 或 X^b 各 1/2
  const fromMother = Math.random() < 0.5 ? 'B' : 'b';
  if (Math.random() < 0.5) {
    // 女儿：母亲 X + 父亲 X
    const fromFather = cross.father === 'XBY' ? 'B' : 'b';
    const geno = `X${fromFather}X${fromMother}`;
    return geno.includes('b') && geno.replace(/[^b]/g, '').length === 2 ? '女色盲' : '女正常';
  }
  // 儿子：母亲 X + 父亲 Y
  return fromMother === 'B' ? '男正常' : '男色盲';
}

export function SexLinkedCrossLab() {
  const [crossId, setCrossId] = useState<string>('c3');
  const [counts, setCounts] = useState<Record<ChildPheno, number>>({ 女正常: 0, 女色盲: 0, 男正常: 0, 男色盲: 0 });
  const [last, setLast] = useState<{ geno: string; pheno: ChildPheno } | null>(null);
  const cross = CROSSES.find((c) => c.id === crossId)!;
  const total = counts.女正常 + counts.女色盲 + counts.男正常 + counts.男色盲;

  const simulateOnce = () => {
    const pheno = simulateChild(cross);
    const isGirl = pheno.startsWith('女');
    const geno = isGirl
      ? pheno === '女色盲'
        ? 'XᵇXᵇ'
        : cross.father === 'XbY' && cross.mother !== 'XBXB'
          ? 'XᴮXᵇ 或 XᵇXᴮ'
          : 'XᴮXᴮ 或 XᴮXᵇ'
      : pheno === '男色盲'
        ? 'XᵇY'
        : 'XᴮY';
    setLast({ geno, pheno });
    setCounts((prev) => ({ ...prev, [pheno]: prev[pheno] + 1 }));
  };

  const simulateMany = (n: number) => {
    const add: Record<ChildPheno, number> = { 女正常: 0, 女色盲: 0, 男正常: 0, 男色盲: 0 };
    for (let i = 0; i < n; i++) add[simulateChild(cross)]++;
    setCounts((prev) => ({
      女正常: prev.女正常 + add.女正常,
      女色盲: prev.女色盲 + add.女色盲,
      男正常: prev.男正常 + add.男正常,
      男色盲: prev.男色盲 + add.男色盲,
    }));
  };

  const switchCross = (id: string) => {
    setCrossId(id);
    setCounts({ 女正常: 0, 女色盲: 0, 男正常: 0, 男色盲: 0 });
    setLast(null);
  };

  const bars = useMemo(() => {
    const max = Math.max(1, ...PHENO_ORDER.map((p) => counts[p]));
    const t = THEORY[crossId];
    return PHENO_ORDER.map((pheno) => {
      const share = t[pheno] / 4;
      return {
        pheno,
        count: counts[pheno],
        width: (counts[pheno] / max) * 100,
        ratio: total > 0 ? counts[pheno] / total : 0,
        theory: share,
        theoryText: t[pheno] === 0 ? '不可能出现' : `${t[pheno]}/4`,
      };
    });
  }, [counts, total, crossId]);

  const boys = counts.男正常 + counts.男色盲;
  const colorBlindRate = boys > 0 ? ((counts.男色盲 / boys) * 100).toFixed(0) : null;

  const observation = (() => {
    if (total === 0) {
      return `当前组合：${cross.label}。点「模拟 1 个后代」看性染色体的传递路径，再「快速模拟 200 个」统计四类后代。`;
    }
    const t = THEORY[crossId];
    const noBlind = t.女色盲 === 0 && t.男色盲 === 0;
    if (noBlind) return `已模拟 ${total} 个后代，无一人色盲——${crossId === 'c1' ? '双方都不含色盲基因，色盲不可能出现。' : '父亲正常时女儿至少有一个正常 Xᴮ，不会是色盲。'}`;
    if (crossId === 'c5') return `已模拟 ${total} 个后代：女儿全部正常（但都是携带者 XᴮXᵇ），儿子 ${counts.男色盲}/${boys} 色盲——这就是"交叉遗传"：父亲的正常 Xᴮ 挡住了女儿，色盲基因却顺着母亲传给了儿子。`;
    if (crossId === 'c4') return `已模拟 ${total} 个后代：四类各约 1/4。注意色盲女儿出现了——女色盲的父亲必然色盲，母亲至少是携带者。`;
    if (crossId === 'c6') return `已模拟 ${total} 个后代：女儿全部色盲、儿子全部色盲——双亲都是患者时后代无一幸免。`;
    return `已模拟 ${total} 个后代：儿子中色盲 ${counts.男色盲}/${boys}${colorBlindRate ? `（约 ${colorBlindRate}%，理论 50%）` : ''}，女儿全部正常但可能携带。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">婚配组合（切换会清空统计）</p>
              <div className="grid gap-1.5">
                {CROSSES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => switchCross(c.id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      c.id === crossId
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={simulateOnce}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              🎲 模拟 1 个后代
            </button>
            <button
              type="button"
              onClick={() => simulateMany(200)}
              className="min-h-10 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-semibold text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              ⚡ 快速模拟 200 个
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              已统计 <span className="text-base font-bold text-[#13333a]">{total}</span> 个后代（当前组合：{cross.label.split(' × ')[0]} × {cross.label.split(' × ')[1]}）
            </div>
          </>
        }
      >
        <SceneBox label="X 染色体隐性遗传（红绿色盲）的传递" heightClass="h-[300px]">
          <svg className="h-full w-full" viewBox="0 0 440 240" aria-hidden="true">
            {/* 母亲性染色体 */}
            <rect x="30" y="40" width="120" height="76" rx="12" fill="#fbeef2" stroke="#c96a8a" strokeWidth="2" />
            <text x="90" y="62" textAnchor="middle" fontSize="10.5" fill="#a54868" fontWeight="700">母亲</text>
            <rect x="52" y="74" width="30" height="13" rx="6" fill={cross.mother.includes('b') && cross.mother.startsWith('Xb') ? '#e8a0b4' : '#e8a0b4'} stroke="#a54868" strokeWidth="1.8" />
            <text x="67" y="84.5" textAnchor="middle" fontSize="9" fill="#7a2a48" fontWeight="800">{cross.mother.slice(0, 3)}</text>
            <rect x="94" y="74" width="30" height="13" rx="6" fill="#e8a0b4" stroke="#a54868" strokeWidth="1.8" />
            <text x="109" y="84.5" textAnchor="middle" fontSize="9" fill="#7a2a48" fontWeight="800">{cross.mother.slice(3)}</text>
            {/* 父亲性染色体 */}
            <rect x="290" y="40" width="120" height="76" rx="12" fill="#eaf2fb" stroke="#4d7ea8" strokeWidth="2" />
            <text x="350" y="62" textAnchor="middle" fontSize="10.5" fill="#3d6a94" fontWeight="700">父亲</text>
            <rect x="318" y="74" width="30" height="13" rx="6" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="1.8" />
            <text x="333" y="84.5" textAnchor="middle" fontSize="9" fill="#2c5a84" fontWeight="800">{cross.father.slice(0, 2)}</text>
            <rect x="354" y="74" width="16" height="13" rx="5" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="1.8" />
            <text x="362" y="84.5" textAnchor="middle" fontSize="9" fill="#2c5a84" fontWeight="800">Y</text>
            {/* 传递箭头 */}
            <path d="M120 122 Q 170 160 204 158" fill="none" stroke="#c96a8a" strokeWidth="2.2" markerEnd="url(#sl-arrow-p)" />
            <path d="M320 122 Q 272 160 238 158" fill="none" stroke="#4d7ea8" strokeWidth="2.2" markerEnd="url(#sl-arrow-s)" />
            {/* 本次后代 */}
            {last ? (
              <g>
                <rect x="140" y="150" width="164" height="62" rx="12" fill="#ffffff" stroke="#13333a" strokeWidth="2.4" />
                <text x="222" y="176" textAnchor="middle" fontSize="14" fill="#13333a" fontWeight="800">{last.pheno}</text>
                <text x="222" y="198" textAnchor="middle" fontSize="11.5" fill="#59767c">基因型 {last.geno}</text>
              </g>
            ) : (
              <text x="222" y="186" textAnchor="middle" fontSize="11" fill="#9ab0b5">点击左侧「模拟 1 个后代」开始</text>
            )}
            {/* 统计 */}
            {PHENO_ORDER.map((p, i) => {
              const x = 26 + i * 104;
              const c = counts[p];
              const h = total > 0 ? (c / Math.max(1, ...PHENO_ORDER.map((q) => counts[q]))) * 46 : 0;
              return (
                <g key={p}>
                  <rect x={x} y={214 - h} width="72" height={h} rx="4" fill={PHENO_COLORS[p]} opacity="0.9" />
                  <text x={x + 36} y={208 - h} textAnchor="middle" fontSize="10.5" fill="#13333a" fontWeight="700">{c}</text>
                  <text x={x + 36} y={230} textAnchor="middle" fontSize="9.5" fill="#59767c">{p}</text>
                </g>
              );
            })}
            <defs>
              <marker id="sl-arrow-p" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#c96a8a" />
              </marker>
              <marker id="sl-arrow-s" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#4d7ea8" />
              </marker>
            </defs>
          </svg>

          {/* 统计明细 */}
          <div className="border-t border-[#dceaea] px-4 py-3">
            {bars.map(({ pheno, count, width, ratio, theory, theoryText }) => (
              <div key={pheno} className="mb-1.5 flex items-center gap-2">
                <span className="w-12 text-xs font-bold" style={{ color: PHENO_COLORS[pheno] }}>{pheno}</span>
                <div className="relative h-4 flex-1 rounded-full bg-[#eef4f3]">
                  <div className="h-4 rounded-full transition-all" style={{ width: `${width}%`, background: PHENO_COLORS[pheno] }} />
                </div>
                <span className="w-24 text-right text-[11px] text-[#59767c]">
                  {count} 个（理论 {theoryText}）
                </span>
              </div>
            ))}
          </div>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
