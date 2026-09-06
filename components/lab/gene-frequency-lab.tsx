'use client';

import { useState } from 'react';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>显性基因 B（长翅）、隐性基因 b（短翅）。已知表现型比例可反推基因频率：短翅（bb）频率 = b²，所以 <span className="font-semibold">b = √(短翅比例)</span>，B = 1 − b。</>,
      <>随机交配一代后基因型频率为 <span className="font-semibold">BB = p²、Bb = 2pq、bb = q²</span>（p + q = 1）——哈代-温伯格平衡。</>,
      <>模型加入"自然选择"：bb（短翅）更易被天敌捕食，按选择系数 s 淘汰一部分 → 观察 b 基因频率如何逐代下降。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>初始 B 基因频率 p（0.1~0.9）。</>,
      <>选择系数 s：对短翅个体（bb）的淘汰强度，0 = 无选择。</>,
      <>每点「繁衍一代」：随机交配 → 按选择系数淘汰 → 计算下一代基因频率。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① s = 0 时连续繁衍 5 代——观察 b 频率变不变（遗传平衡）。</>,
      <>② 把 s 拉到 0.6 重置后再繁衍，对比 b 频率曲线走向。</>,
      <>③ 读公式卡：每代 b 的计算过程都会显示出来。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>遗传平衡的前提：种群足够大、随机交配、<span className="font-semibold">无突变、无选择、无迁入迁出</span>——此时基因频率代代不变。</>,
      <>自然选择使<span className="font-semibold">基因频率定向改变</span>，进而决定生物进化的方向——"进化实质 = 基因频率变化"。</>,
      <>计算细节：b = √(bb 基因型频率)；选择后 b' = (q − s·q²)/(1 − s·q²)。牵连考点：抗药性害虫种群中抗性基因频率逐代升高。</>,
    ],
  },
];

const GEN_MAX = 8;
const clamp01 = (v: number) => Math.max(0.001, Math.min(0.999, v));

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function GeneFrequencyLab() {
  const [p0, setP0] = useState(0.7);
  const [s, setS] = useState(0);
  const [gens, setGens] = useState<number[]>([0.3]); // b 基因频率，gens[0] = 初始
  const [pickedP0, setPickedP0] = useState(0.7);
  const [pickedS, setPickedS] = useState(0);

  const qNow = gens[gens.length - 1];
  const pNow = 1 - qNow;
  const gen = gens.length - 1;

  const step = () => {
    const q = qNow;
    const afterSel = clamp01((q - s * q * q) / (1 - s * q * q));
    setGens((prev) => [...prev, afterSel]);
  };

  const applyAndReset = (np: number, ns: number) => {
    setPickedP0(np);
    setPickedS(ns);
    setGens([1 - np]);
  };

  const reset = () => applyAndReset(p0, s);

  // 柱状图（当前代基因型频率）
  const bars = [
    { label: 'BB 长翅', v: pNow * pNow, color: '#3d6a94' },
    { label: 'Bb 长翅', v: 2 * pNow * qNow, color: '#6aa86a' },
    { label: 'bb 短翅', v: qNow * qNow, color: '#b0483a' },
  ];
  // q 曲线
  const linePath = gens
    .map((q, i) => `${i === 0 ? 'M' : 'L'}${(44 + (i / GEN_MAX) * 380).toFixed(1)} ${(250 - q * 200).toFixed(1)}`)
    .join(' ');

  const observation = (() => {
    const pct = (v: number) => `${Math.round(v * 100)}%`;
    const calc = `bb 频率 = b² = ${pct(qNow * qNow)} → b = √${pct(qNow * qNow)} ≈ ${qNow.toFixed(2)} → B = 1 − b ≈ ${pNow.toFixed(2)}`;
    if (gen === 0) {
      return `初始种群：B 频率 ${pct(pNow)}、b 频率 ${pct(qNow)}。${calc}。s = 0（无选择）时先繁衍几代，看基因频率变不变。`;
    }
    if (s === 0) {
      return `已繁衍 ${gen} 代，b 频率始终 ≈ ${qNow.toFixed(2)}——没有选择就没有进化：满足遗传平衡条件时，基因频率代代保持稳定。`;
    }
    const q0 = gens[0];
    const drop = q0 - qNow;
    return `选择系数 s = ${s.toFixed(1)}：短翅（bb）每代被淘汰一部分 → b 已从 ${q0.toFixed(2)} 降到 ${qNow.toFixed(2)}（下降 ${pct(drop)}）。${calc}。自然选择使基因频率定向改变——这就是进化的实质。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <ControlSlider
              label="初始 B 基因频率 p"
              value={Math.round(p0 * 100)}
              unit="%"
              min={10}
              max={90}
              step={5}
              accent="teal"
              onChange={(v) => { setP0(v / 100); applyAndReset(v / 100, pickedS); }}
            />
            <ControlSlider
              label="选择系数 s（淘汰短翅 bb）"
              value={Math.round(s * 100)}
              unit="%"
              min={0}
              max={80}
              step={10}
              accent="rose"
              onChange={(v) => { setS(v / 100); applyAndReset(pickedP0, v / 100); }}
            />
            <button
              type="button"
              onClick={step}
              disabled={gen >= GEN_MAX}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              繁衍一代（第 {gen}/{GEN_MAX} 代）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新设置种群
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              第 {gen} 代 · B = {pNow.toFixed(2)} · b = {qNow.toFixed(2)}
              <br />
              {s === 0 ? '模式：遗传平衡（无选择）' : `模式：自然选择 s = ${s.toFixed(1)}`}
            </div>
          </>
        }
      >
        <SceneBox label="基因型频率柱状图 + b 基因频率逐代曲线" heightClass="h-[360px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 柱状图：当前代基因型 */}
            {bars.map((bar, i) => {
              const x = 40 + i * 116;
              const h = bar.v * 110;
              return (
                <g key={bar.label}>
                  <rect x={x} y={168 - h} width={72} height={Math.max(3, h)} fill={bar.color} stroke="#13333a" strokeWidth="2" style={{ transition: 'y 0.3s ease, height 0.3s ease' }} />
                  <text x={x + 36} y={160 - h} textAnchor="middle" fontSize="13" fill="#173b42" fontWeight="700">{pct(bar.v)}</text>
                  <text x={x + 36} y={186} textAnchor="middle" fontSize="12.5" fill="#4b6c73" fontWeight="600">{bar.label}</text>
                </g>
              );
            })}
            <text x="40" y="52" fontSize="13" fill="#173b42" fontWeight="700">第 {gen} 代基因型频率（随机交配后）</text>

            {/* b 频率曲线 */}
            <line x1="44" y1="250" x2="424" y2="250" stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1="44" y1="250" x2="44" y2="50" stroke="#8a9a9f" strokeWidth="1.6" />
            <text x="30" y="60" textAnchor="end" fontSize="12" fill="#8a9a9f">b=1</text>
            <text x="30" y="254" textAnchor="end" fontSize="12" fill="#8a9a9f">0</text>
            <text x="424" y="268" textAnchor="end" fontSize="12" fill="#8a9a9f">代数 →</text>
            <path d={linePath} fill="none" stroke="#b0483a" strokeWidth="3.5" strokeLinecap="round" />
            {gens.map((q, i) => (
              <circle key={i} cx={44 + (i / GEN_MAX) * 380} cy={250 - q * 200} r="4" fill="#b0483a" />
            ))}
            <text x="240" y="292" textAnchor="middle" fontSize="13" fill="#b0483a" fontWeight="700">
              b 基因频率逐代变化：{s === 0 ? '保持不变（遗传平衡）' : '定向下降（自然选择）'}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}

function pct(v: number) {
  return `${Math.round(v * 100)}%`;
}
