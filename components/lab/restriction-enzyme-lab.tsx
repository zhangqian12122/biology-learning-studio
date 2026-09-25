'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（限制酶切割 DNA）',
    lines: [
      <><span className="font-semibold">限制性内切核酸酶（限制酶）</span>能识别双链 DNA 的特定核苷酸序列，并在特定位点切开磷酸二酯键。</>,
      <>如 <span className="font-semibold">EcoRI</span> 识别 GAATTC 序列，在 G 和 A 之间切割，产生<span className="font-semibold">黏性末端</span>。</>,
      <>不同来源的 DNA 用同种限制酶切割后，会产生<span className="font-semibold">相同的黏性末端</span>，可以碱基互补配对连接——这是基因工程"剪刀+胶水"的基础。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>选择不同限制酶（EcoRI / HindIII / BamHI），看切割位点和产生的片段大小。</>,
      <>观察点：切了几个切口、产生几个片段、有没有切在目的基因中间。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 选择一种限制酶，观察它在 DNA 上的识别序列和切割位点。</>,
      <>② 换另一种酶对比：切口数量和位置不同，产生的片段也不同。</>,
      <>③ 思考：要获取完整的目的基因，应该选择切在目的基因两侧的酶。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>限制酶具有<span className="font-semibold">专一性</span>：一种酶只识别一种特定序列。</>,
      <>切割产生的黏性末端<span className="font-semibold">碱基序列互补</span>，才能与运载体连接。</>,
      <>目的基因内部<span className="font-semibold">不能有</span>该限制酶的识别序列，否则会把目的基因切碎。</>,
    ],
  },
];

const ENZYMES = {
  ecori: { name: 'EcoRI', seq: 'G↓AATTC', cuts: [120, 320] },
  hindiii: { name: 'HindIII', seq: 'A↓AGCTT', cuts: [80, 260] },
  bamhi: { name: 'BamHI', seq: 'G↓GATCC', cuts: [160, 300] },
} as const;
type EnzymeId = keyof typeof ENZYMES;

export function RestrictionEnzymeLab() {
  const [enzyme, setEnzyme] = useState<EnzymeId>('ecori');
  const data = ENZYMES[enzyme];
  const cutCount = data.cuts.length;
  const fragments = cutCount + 1;
  const hasTargetGene = cutCount === 2; // 两个切口才能完整切出目的基因

  const observation = (() => {
    if (cutCount === 2) return `${data.name} 识别 ${data.seq}，在 DNA 上切了 2 个切口，产生 ${fragments} 个片段。两个切口恰好位于目的基因两侧——可以完整切出目的基因！`;
    return `${data.name} 识别 ${data.seq}，切了 ${cutCount} 个切口。切口数量不对——无法完整获取目的基因，需要换一种限制酶。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <p className="text-sm font-medium text-[#37585f]">选择限制酶</p>
            <div className="grid gap-1.5">
              {(Object.keys(ENZYMES) as EnzymeId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setEnzyme(id)}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                    enzyme === id ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                  }`}
                >
                  {ENZYMES[id].name} · 识别 {ENZYMES[id].seq}
                </button>
              ))}
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              切口数：<span className="font-bold">{cutCount}</span> · 片段数：<span className="font-bold">{fragments}</span>
              <br />
              目的基因：<span className={`font-bold ${hasTargetGene ? 'text-[#2f7a4d]' : 'text-[#b0483a]'}`}>{hasTargetGene ? '可完整获取 ✓' : '无法完整获取 ✕'}</span>
            </div>
          </>
        }
      >
        <SceneBox label={`DNA 链上 ${data.name} 的切割位点`} heightClass="h-[300px]">
          <svg className="h-full w-full" viewBox="0 0 440 240" aria-hidden="true">
            {/* DNA 双链 */}
            <rect x="30" y="100" width="380" height="18" rx="6" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="2.4" />
            <text x="220" y="88" textAnchor="middle" fontSize="10" fill="#3d6a94" fontWeight="600">环状 DNA（质粒 440 bp）</text>
            {/* 目的基因区域 */}
            <rect x="200" y="102" width="80" height="14" rx="3" fill="#7ab86a" opacity="0.7" />
            <text x="240" y="134" textAnchor="middle" fontSize="9.5" fill="#3f7f3a" fontWeight="700">目的基因区域</text>
            {/* 切口 */}
            {data.cuts.map((cx, i) => (
              <g key={i}>
                <line x1={cx} y1={94} x2={cx} y2={124} stroke="#b0483a" strokeWidth="3.5" />
                <text x={cx} y={88} textAnchor="middle" fontSize="9" fill="#b0483a" fontWeight="800">✂</text>
              </g>
            ))}
            {/* 片段标注 */}
            <text x="120" y="130" textAnchor="middle" fontSize="9" fill="#59767c">片段 A</text>
            {cutCount > 1 ? <text x="240" y="152" textAnchor="middle" fontSize="9" fill="#3f7f3a" fontWeight="700">片段 B（目的基因）</text> : null}
            {cutCount > 1 ? <text x="392" y="130" textAnchor="middle" fontSize="9" fill="#59767c">片段 C</text> : null}
            {/* 识别序列 */}
            <text x="220" y="176" textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="700">
              识别序列：5'-{data.seq}-3'
            </text>
            <text x="220" y="196" textAnchor="middle" fontSize="10" fill="#59767c">
              ↓ ↓ 表示切割位点
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
