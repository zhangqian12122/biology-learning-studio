'use client';

import { useState } from 'react';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>用琼脂块模拟细胞，NaOH 溶液模拟细胞外物质；酚酞遇 NaOH 变<span className="font-semibold">紫红色</span>，可以直观显示物质扩散进入的深度。</>,
      <>相同时间内 NaOH 扩散深度基本相同，但琼脂块越大，<span className="font-semibold">表面积/体积比越小</span>，物质扩散进入"中心"的比例越低。</>,
      <>结论：细胞越小，相对表面积越大，物质运输效率越高——这限制了细胞不能无限长大。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：含酚酞的琼脂块（边长 3cm 立方体）。</>,
      <>试剂：质量分数 0.1% NaOH 溶液。</>,
      <>用具：塑料餐刀、直尺、烧杯、勺子、防护手套。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 把琼脂块切成边长 3cm、2cm、1cm 的三种立方体。</>,
      <>② 三种琼脂块同时浸入 NaOH 溶液，用勺子轻轻翻动，浸泡约 10 min。</>,
      <>③ 取出并切开琼脂块，观察测量 NaOH 扩散的深度（紫红色部分的厚度）。</>,
      <>④ 计算各琼脂块的表面积/体积比，比较 NaOH 扩入体积占整体体积的比例。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>浸泡时间要相同（无关变量一致）；翻动时不要切开或磨损琼脂块。</>,
      <>NaOH 有腐蚀性，需戴手套，避免接触皮肤和眼睛。</>,
      <>核心结论（常考）：琼脂块越大，相对表面积（S/V）越<span className="font-semibold">小</span>，物质运输效率越<span className="font-semibold">低</span>；细胞体积的增大受 S/V 限制。</>,
      <>把大块切成 8 个小块后，总表面积增大一倍，扩散效率显著提高——类比细胞通过减小体积提高运输效率。</>,
    ],
  },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

/** 像素/厘米比例 */
const PXC = 130;

export function CellSizeTransportLab() {
  const [step, setStep] = useState(0);
  const [edge, setEdge] = useState(2); // cm
  const [minutes, setMinutes] = useState(10);
  const [soaked, setSoaked] = useState(false);
  const [split, setSplit] = useState(false);

  const depth = Math.min(0.025 * minutes, 0.6); // 扩散深度 cm
  const sv = 6 / edge; // 表面积/体积比
  const smallEdge = edge / 2;
  const smallFullyColored = split && depth >= smallEdge / 2;

  const coreRemain = edge > 2 * depth ? ((edge - 2 * depth) / edge) ** 3 : 0;
  const coloredPct = Math.round((1 - coreRemain) * 100);

  const observation = !soaked
    ? '琼脂块还没浸泡。设定好边长后浸入 NaOH（含酚酞指示的琼脂遇碱变紫红）。自由操作：两个滑块随便拖，实时看结果。'
    : `边长 ${edge.toFixed(1)}cm 的琼脂块浸泡 ${minutes}min：NaOH 扩散深度约 ${depth.toFixed(2)}cm，变色部分占 ${coloredPct}%。${
        split
          ? smallFullyColored
            ? `切成 8 小块后（每块 ${smallEdge.toFixed(2)}cm），小块完全变色——小体积 = 高运输效率。`
            : '切开可见：只有表层是紫红色，中心仍是白色（未扩散到）。'
          : '切开观察内部情况。'
      } 相对表面积 S/V = ${sv.toFixed(1)}`;

  // 绘制：大块正面图（紫红边框 + 白芯）
  const size = edge * PXC;
  const rim = depth * PXC;
  const drawCube = (x0: number, y0: number, edgeCm: number, key: string) => {
    const s = edgeCm * PXC;
    const r = Math.min(depth * PXC, s / 2);
    const fully = depth >= edgeCm / 2;
    return (
      <g key={key}>
        {/* 外层紫红（扩散进入部分） */}
        <rect x={x0} y={y0} width={s} height={s} rx="3" fill={soaked ? '#c46a9e' : '#e8e2ea'} stroke="#9a6a86" strokeWidth="2" style={{ transition: 'fill 0.8s ease' }} />
        {/* 白芯（未扩散） */}
        {soaked && !fully ? (
          <rect x={x0 + r} y={y0 + r} width={Math.max(0, s - 2 * r)} height={Math.max(0, s - 2 * r)} rx="2" fill="#f7f4f6" style={{ transition: 'all 0.6s ease' }} />
        ) : null}
        {/* 标尺 */}
        <line x1={x0} y1={y0 + s + 10} x2={x0 + s} y2={y0 + s + 10} stroke="#7a8a8f" strokeWidth="1.5" />
        <text x={x0 + s / 2} y={y0 + s + 24} textAnchor="middle" fontSize="10" fill="#5f7076">
          {edgeCm.toFixed(1)} cm
        </text>
      </g>
    );
  };

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>

<ControlSlider label="琼脂块边长" value={edge} unit="cm" min={0.5} max={2} step={0.1} digits={1} accent="rose" onChange={(v) => { setEdge(v); setSoaked(false); setSplit(false); }} />
            <ControlSlider label="浸泡时间" value={minutes} unit="min" min={2} max={20} step={1} accent="violet" onChange={(v) => { setMinutes(v); setSoaked(false); }} />

            <div className="grid grid-cols-2 gap-1.5">
              <button type="button" onClick={() => setSoaked(true)} aria-pressed={soaked} className={cnChip(soaked)}>
                浸入 NaOH
              </button>
              <button type="button" disabled={!soaked} onClick={() => setSplit(!split)} aria-pressed={split} className={`${cnChip(split)} disabled:cursor-not-allowed disabled:opacity-40`}>
                {split ? '复原整块' : '切成 8 小块'}
              </button>
            </div>

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              表面积/体积比：<span className="text-base font-bold text-[#0e6f75]">{sv.toFixed(1)}</span> : 1
              <br />
              变色比例：{soaked ? `${coloredPct}%` : '—'} · 扩散深度 {soaked ? `${depth.toFixed(2)}cm` : '—'}
            </div>
          </>
        }
      >
        <SceneBox label="琼脂块剖面（紫红 = NaOH 扩散进入；白 = 未到达）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* NaOH 溶液背景（浸泡后） */}
            {soaked ? <rect x="0" y="0" width="440" height="300" fill="#f4ecf2" /> : null}

            {!split ? (
              <g>
                {drawCube(220 - size / 2, 120 - size / 2, edge, 'big')}
                {!soaked ? (
                  <text x="220" y="252" textAnchor="middle" fontSize="11" fill="#7a5a70">
                    含酚酞的琼脂块（未浸泡）
                  </text>
                ) : (
                  <text x="220" y="252" textAnchor="middle" fontSize="11" fill="#7a5a70">
                    浸泡 {minutes}min 后（正面整体视角）
                  </text>
                )}
              </g>
            ) : (
              <g>
                {/* 切成 8 小块（俯视 2×2 排布代表） */}
                {[0, 1].map((row) =>
                  [0, 1].map((col) =>
                    drawCube(
                      220 - smallEdge * PXC - 8 + col * (smallEdge * PXC + 16),
                      110 - smallEdge * PXC / 2 - 8 + row * (smallEdge * PXC + 16),
                      smallEdge,
                      `s${row}${col}`,
                    ),
                  ),
                )}
                <text x="220" y="252" textAnchor="middle" fontSize="11" fill="#7a5a70">
                  切成 8 小块（每块 {smallEdge.toFixed(2)}cm）{smallFullyColored ? '——全部变色！' : '——中心仍发白' }
                </text>
              </g>
            )}

            {/* 深度标注 */}
            {soaked && !smallFullyColored ? (
              <g>
                <line x1="60" y1="40" x2="60" y2="60" stroke="#a8508a" strokeWidth="2" />
                <text x="66" y="54" fontSize="10" fill="#a8508a" fontWeight="600">
                  扩散深度 ≈ {depth.toFixed(2)}cm（各方向相同）
                </text>
              </g>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
