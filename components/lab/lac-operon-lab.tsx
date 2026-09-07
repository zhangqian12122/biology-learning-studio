'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（乳糖操纵子模型）',
    lines: [
      <>大肠杆菌利用乳糖需要<span className="font-semibold">β-半乳糖苷酶</span>。编码这个酶的基因平时是"锁住"的：阻遏蛋白结合在操纵基因上，挡住 RNA 聚合酶的去路。</>,
      <>当环境中有<span className="font-semibold">乳糖</span>时，乳糖作为诱导物与阻遏蛋白结合，使其脱离操纵基因——"开关"打开，酶大量合成，乳糖被分解。</>,
      <>乳糖分解完后，阻遏蛋白复位，基因重新关闭——<span className="font-semibold">只在需要时才生产</span>，这是基因表达调控的经济性。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>环境开关：培养基中是否加入乳糖。</>,
      <>状态指示：操纵基因是否被阻遏蛋白"封锁"、转录是否进行、β-半乳糖苷酶的数量与乳糖剩余量。</>,
      <>观察点：加乳糖后酶合成有"延迟"，乳糖耗尽后酶的合成如何自动停止。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 初始状态无乳糖：观察阻遏蛋白如何"锁住"结构基因。</>,
      <>② 加入乳糖：逐步推进，看阻遏蛋白脱落、酶合成、乳糖被分解的全过程。</>,
      <>③ 继续推进直到乳糖耗尽：观察基因如何自动"上锁"。反复切换感受调控的经济性。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>操纵子模型（Jacob & Monod，1961）说明：基因不是永远"开机"的，<span className="font-semibold">表达受环境信号调控</span>。</>,
      <>区分三种基因角色：<span className="font-semibold">结构基因</span>（编码酶）、<span className="font-semibold">操纵基因</span>（开关）、<span className="font-semibold">调节基因</span>（编码阻遏蛋白）。</>,
      <>这套逻辑正是基因工程中"诱导表达"的设计基础——用信号控制目的基因何时开工。</>,
    ],
  },
];

type Phase = 'off' | 'inducing' | 'working' | 'done';

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function LacOperonLab() {
  const [lactose, setLactose] = useState(0);
  const [enzyme, setEnzyme] = useState(0);

  const phase: Phase =
    enzyme > 0 && lactose === 0 ? 'done' : lactose > 0 ? (enzyme > 1 ? 'working' : 'inducing') : 'off';

  const advance = () => {
    setLactose((l) => (l > 0 ? Math.max(0, l - 2) : l));
    setEnzyme((e) => {
      if (lactose > 0) return Math.min(10, e + 2);
      return Math.max(0, e - 1); // 无乳糖：酶不再合成并逐渐降解
    });
  };

  const addLactose = () => {
    setLactose((l) => Math.min(10, l + 6));
  };

  const reset = () => {
    setLactose(0);
    setEnzyme(0);
  };

  const repressorOn = enzyme === 0 && lactose === 0;
  const transcription = enzyme > 0 && lactose > 0;

  const observation = (() => {
    if (lactose === 0 && enzyme === 0) {
      return '培养基中无乳糖：阻遏蛋白牢牢结合在操纵基因上，RNA 聚合酶被挡住——结构基因"上锁"，不合成酶。这对细菌最省能量。';
    }
    if (lactose > 0 && enzyme <= 2) {
      return `乳糖已加入！它作为诱导物与阻遏蛋白结合，使其脱落——开关打开，转录开始，β-半乳糖苷酶正在合成（当前量 ${enzyme}）。`;
    }
    if (lactose > 0) {
      return `酶持续合成并分解乳糖（剩余 ${lactose} 份，酶量 ${enzyme}）——这是正反馈式的"开工"状态：有乳糖就一直生产消化酶。`;
    }
    return `乳糖耗尽！阻遏蛋白重新"上锁"，酶合成停止，原有酶逐渐降解（剩余 ${enzyme}）。基因表达的经济性：不浪费一点原料。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={addLactose}
              disabled={lactose >= 10}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              🥛 加入乳糖（当前 {lactose} 份）
            </button>
            <button
              type="button"
              onClick={advance}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md border border-[#cbdede] bg-white px-3 text-xs font-semibold text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              ⏭ 推进一步
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              β-半乳糖苷酶：<span className="text-base font-bold text-[#13333a]">{enzyme}</span> 份
              <br />
              乳糖剩余：{lactose} 份 · 操纵基因：<span className={`font-bold ${repressorOn ? 'text-[#b0483a]' : 'text-[#2f7a4d]'}`}>{repressorOn ? '被封锁' : '开放'}</span>
            </div>
          </>
        }
      >
        <SceneBox label="大肠杆菌乳糖操纵子开关模型" heightClass="h-[320px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* DNA 链 */}
            <path d="M30 90 L410 90" stroke="#3d6a94" strokeWidth="6" strokeLinecap="round" />
            {/* 基因区段 */}
            <rect x="60" y="74" width="70" height="32" rx="6" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="2" />
            <text x="95" y="95" textAnchor="middle" fontSize="9.5" fill="#1e4a68" fontWeight="700">调节基因</text>
            <rect x="180" y="74" width="58" height="32" rx="6" fill={repressorOn ? '#e8c0b8' : '#c8e2ba'} stroke="#5f7076" strokeWidth="2" />
            <text x="209" y="95" textAnchor="middle" fontSize="9.5" fill="#4b3a3a" fontWeight="700">操纵基因</text>
            <rect x="262" y="74" width="130" height="32" rx="6" fill={transcription || enzyme > 0 ? '#c8e2ba' : '#e4e4e4'} stroke="#3f7f3a" strokeWidth="2" />
            <text x="327" y="95" textAnchor="middle" fontSize="9.5" fill="#2f5a1e" fontWeight="700">结构基因（酶）</text>
            {/* 启动子标注 */}
            <text x="170" y="66" textAnchor="middle" fontSize="8.5" fill="#8a9a9f">启动子</text>
            <path d="M176 70 L182 76" stroke="#8a9a9f" strokeWidth="1.4" />

            {/* 阻遏蛋白 */}
            {repressorOn ? (
              <g>
                <circle cx="209" cy="132" r="14" fill="#b0483a" stroke="#7a2a1a" strokeWidth="2.2" />
                <text x="209" y="137" textAnchor="middle" fontSize="8.5" fill="#ffffff" fontWeight="800">阻遏</text>
                <path d="M209 118 L209 108" stroke="#7a2a1a" strokeWidth="2.2" />
                <text x="209" y="158" textAnchor="middle" fontSize="9" fill="#7a2a1a" fontWeight="600">封锁中（转录被挡）</text>
              </g>
            ) : lactose > 0 ? (
              <g>
                <circle cx="120" cy="150" r="13" fill="#b0483a" stroke="#7a2a1a" strokeWidth="2.2" opacity="0.75" />
                <circle cx="132" cy="156" r="7" fill="#f4d06a" stroke="#b5953a" strokeWidth="1.8" />
                <text x="120" y="180" textAnchor="middle" fontSize="9" fill="#8a671b" fontWeight="600">乳糖结合阻遏蛋白</text>
              </g>
            ) : (
              <text x="120" y="156" textAnchor="middle" fontSize="9" fill="#8a9a9f">阻遏蛋白逐渐复位中…</text>
            )}

            {/* RNA 聚合酶 + 转录产物 */}
            {transcription || enzyme > 0 ? (
              <g>
                <circle cx={transcription ? 180 : 180} cy="52" r="11" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.2" />
                <text x="180" y="40" textAnchor="middle" fontSize="8.5" fill="#8a671b" fontWeight="700">RNA 聚合酶</text>
                <path d={transcription ? 'M190 62 Q 240 50 320 60' : 'M190 62 Q 240 50 320 60'} fill="none" stroke={transcription ? '#2f7a4d' : '#8a9a9f'} strokeWidth="2.4" strokeDasharray={transcription ? 'none' : '5 4'} />
                <text x={transcription ? '352' : '352'} y="52" fontSize="8.5" fill={transcription ? '#2f7a4d' : '#8a9a9f'} fontWeight="600">
                  {transcription ? '转录中 ✓' : '停摆'}
                </text>
              </g>
            ) : null}

            {/* 酶分子与乳糖分解 */}
            {enzyme > 0 ? (
              <g>
                {[0, 1, 2].map((i) =>
                  enzyme > i ? (
                    <g key={i}>
                      <path d={`M${96 + i * 96} 206 l0 -14 m-9 14 a 9 6 0 0 0 18 0 z`} fill="#c98a1d" stroke="#8a671b" strokeWidth="1.8" />
                    </g>
                  ) : null,
                )}
                <text x="220" y="200" fontSize="9" fill="#59767c">β-半乳糖苷酶 × {enzyme}</text>
                <path d="M336 198 L378 198" stroke="#8a9a9f" strokeWidth="1.6" strokeDasharray="4 3" />
                <text x="394" y="192" textAnchor="middle" fontSize="9" fill="#59767c">乳糖</text>
                <text x="394" y="206" textAnchor="middle" fontSize="9" fill="#59767c">→ 葡萄糖+半乳糖</text>
              </g>
            ) : (
              <text x="220" y="200" textAnchor="middle" fontSize="9.5" fill="#9ab0b5">尚未合成消化酶</text>
            )}
            {/* 阶段标签 */}
            <text x="406" y="236" textAnchor="end" fontSize="10.5" fill="#8a671b" fontWeight="700">
              {phase === 'off' ? '状态：关闭（省能模式）' : phase === 'inducing' ? '状态：诱导中，酶开始合成' : phase === 'working' ? '状态：全速分解乳糖' : '状态：乳糖耗尽，重新上锁'}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
