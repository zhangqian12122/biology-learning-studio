'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（CRISPR-Cas9 基因编辑）',
    lines: [
      <><span className="font-semibold">向导 RNA（sgRNA）</span>带着一段能与目标基因互补配对的"地址信息"，像导航一样把 <span className="font-semibold">Cas9 蛋白（"分子剪刀"）</span>精准带到 DNA 的目标位置。</>,
      <>Cas9 在目标位置切断 DNA 双链，细胞自我修复时就可以<span className="font-semibold">插入、删除或替换</span>基因——实现"编辑"。</>,
      <>与随机诱变不同，CRISPR 是<span className="font-semibold">定点编辑</span>：指哪改哪，不产生随机变化。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>目标序列：突变致病基因中的一段碱基（红色标记突变碱基）。</>,
      <>操作步骤：①设计向导 RNA → ②Cas9 定位切割 → ③提供正常模板修复 → 突变被纠正。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>向导 RNA 与目标 DNA 的配对遵循<span className="font-semibold">碱基互补配对原则</span>（A-U、T-A、G-C、C-G）——错了就"导航失败"。</>,
      <>CRISPR 技术来自<span className="font-semibold">细菌对抗病毒（噬菌体）的免疫系统</span>：细菌把入侵病毒 DNA 的片段存进自己的基因组当"通缉令"。</>,
      <>伦理思考：体细胞编辑治病已被谨慎探索；<span className="font-semibold">生殖细胞编辑涉及伦理红线</span>，被严格禁止。</>,
    ],
  },
];

type Stage = 0 | 1 | 2 | 3;

const TARGET = ['T', 'A', 'C', 'G', 'G', 'C', 'A', 'T'];
const MUTANT_INDEX = 3; // G 应为 A（正常）

/** 向导 RNA 与目标链互补（DNA→RNA：T→A A→U G→C C→G） */
function complementRNA(base: string): string {
  if (base === 'T') return 'A';
  if (base === 'A') return 'U';
  if (base === 'G') return 'C';
  return 'G';
}

export function CrisprLab() {
  const [stage, setStage] = useState<Stage>(0);

  const step = () => setStage((s) => (Math.min(3, s + 1) as Stage));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0) return '细胞核里有一段致病基因（第 4 位碱基突变）。点「设计向导 RNA」，给它派一位认识路的"导航员"。';
    if (stage === 1) return '向导 RNA 设计完成：它的序列与目标基因互补配对，能像磁铁一样精准"吸"在目标位置——导航就绪。';
    if (stage === 2) return 'Cas9 剪刀就位！它被向导 RNA 带到目标位置，"咔嚓"切断 DNA 双链——编辑的"开口"打开了。';
    return '修复完成：细胞按正常模板修补断口，突变碱基被纠正为正常序列——基因编辑成功，且没有"误伤"其他位置。';
  })();

  const rna = TARGET.map(complementRNA);

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= 3}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {stage === 0 ? '① 设计向导 RNA' : stage === 1 ? '② Cas9 定位并切割 DNA' : stage === 2 ? '③ 提供正常模板修复' : '基因编辑完成 ✓'}
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前阶段：<span className="font-bold text-[#13333a]">{stage === 0 ? '准备' : stage === 1 ? '向导 RNA 配对' : stage === 2 ? 'Cas9 切割' : '修复完成'}</span>
              <br />
              原则：<span className="font-bold">碱基互补配对</span>（A-U、T-A、G-C、C-G）
            </div>
          </>
        }
      >
        <SceneBox label="CRISPR-Cas9 定点基因编辑三步曲" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* DNA 双链 */}
            {TARGET.map((base, i) => {
              const x = 60 + i * 40;
              const mutant = i === MUTANT_INDEX;
              const y = 70;
              const cutGap = stage >= 2 && i === MUTANT_INDEX;
              return (
                <g key={i}>
                  {/* 突变位高亮 */}
                  {mutant ? <rect x={x - 18} y={y - 28} width="36" height="56" rx="6" fill="#b0483a" opacity="0.14" /> : null}
                  {/* 上链 */}
                  <rect x={x - 14} y={y - 22} width="28" height="20" rx="5" fill={mutant ? '#b0483a' : '#7a9ac9'} stroke="#3d6a94" strokeWidth="1.8" />
                  <text x={x} y={y - 7} textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="800">{base}</text>
                  {/* 氢键/断口 */}
                  {cutGap ? (
                    <text x={x} y={y + 14} textAnchor="middle" fontSize="12" fill="#b0483a" fontWeight="800">✂</text>
                  ) : (
                    <line x1={x} y1={y} x2={x} y2={y + 8} stroke="#8a9a9f" strokeWidth="1.6" />
                  )}
                  {/* 下链 */}
                  <rect x={x - 14} y={y + 10} width="28" height="20" rx="5" fill="#a8cf98" stroke="#3f7f3a" strokeWidth="1.8" />
                  <text x={x} y={y + 25} textAnchor="middle" fontSize="11" fill="#13333a" fontWeight="800">
                    {complementRNA(base).replace('U', 'A')}
                  </text>
                  {mutant ? (
                    <text x={x} y={y + 54} textAnchor="middle" fontSize="9.5" fill="#b0483a" fontWeight="700">突变位</text>
                  ) : null}
                </g>
              );
            })}
            <text x="248" y="46" fontSize="10.5" fill="#59767c" fontWeight="600">致病基因 DNA（红色 = 突变碱基）</text>

            {/* 向导 RNA（配对展示） */}
            {stage >= 1 ? (
              <g>
                <text x="60" y="168" fontSize="11" fill="#0e6f75" fontWeight="800">向导 RNA：</text>
                {rna.map((b, i) => (
                  <rect key={i} x={44 + i * 40} y={178} width="32" height="22" rx="5" fill="#cfe8e2" stroke="#0e6f75" strokeWidth="1.8" />
                ))}
                {rna.map((b, i) => (
                  <text key={i} x={60 + i * 40} y={194} textAnchor="middle" fontSize="11" fill="#0e6f75" fontWeight="800">{b}</text>
                ))}
                <text x="400" y="194" fontSize="9.5" fill="#59767c">（互补配对）</text>
              </g>
            ) : null}

            {/* Cas9 剪刀 */}
            {stage >= 2 ? (
              <g>
                <path d="M150 108 L134 126 L138 136 L152 132 Z" fill="#4d7ea8" stroke="#2c5a84" strokeWidth="2" />
                <path d="M128 120 L96 108" stroke="#4d7ea8" strokeWidth="4" strokeLinecap="round" />
                <circle cx="90" cy="104" r="9" fill="#4d7ea8" stroke="#2c5a84" strokeWidth="2" />
                <text x="36" y="90" fontSize="10.5" fill="#2c5a84" fontWeight="800">Cas9 剪刀</text>
              </g>
            ) : null}

            {/* 修复结果 */}
            {stage >= 3 ? (
              <g>
                <rect x="60" y="216" width="320" height="30" rx="8" fill="#edf9f1" stroke="#2f7a4d" strokeWidth="2.2" />
                <text x="220" y="236" textAnchor="middle" fontSize="11.5" fill="#2f7a4d" fontWeight="800">
                  修复后：突变碱基 G → A，致病基因被纠正为正常序列 ✓
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
