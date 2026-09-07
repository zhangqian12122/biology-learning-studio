'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>土壤中生活着<span className="font-semibold">大量微生物（细菌、真菌）</span>，它们作为分解者能把落叶中的有机物分解成无机物，归还给无机环境。</>,
      <>实验采用<span className="font-semibold">对照设计</span>：A 组土壤经高温灭菌（微生物被杀灭），B 组为自然土壤（含微生物）——其余条件（落叶种类与数量、湿度、温度）完全相同。</>,
      <>若一段时间后 B 组落叶明显被分解而 A 组基本完好，则说明<span className="font-semibold">微生物对落叶有分解作用</span>。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>自变量：土壤是否含活的微生物（灭菌 vs 自然）。</>,
      <>因变量：相同时间后落叶的剩余程度（完整 → 破损碎裂 → 仅剩叶脉网）。</>,
      <>无关变量：落叶数量、土壤湿度与温度、埋藏深度——均保持一致。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 将等量同种落叶分别埋入 A（灭菌土）、B（自然土）两个花盆，深度一致，喷等量清水。</>,
      <>② 每 1~2 周挖出观察一次，记录叶片破碎程度（本模型按周推进）。</>,
      <>③ 10 周后对比两组落叶的剩余量，得出结论。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>灭菌必须用<span className="font-semibold">高温高压</span>：只杀微生物，尽量不改变土壤的化学性质——否则对照不成立。</>,
      <>分解者（微生物）是<span className="font-semibold">物质循环的关键环节</span>：把有机物分解为 CO₂、水、无机盐，供生产者重新利用。</>,
      <>若把 B 组土壤也加热到同样温度但立即接种原有土壤微生物，可进一步排除"温度本身"的干扰。</>,
    ],
  },
];

const STEPS = 10;

/** 落叶剩余率（%）与破碎等级 */
function decay(weeks: number) {
  const groupA = Math.max(72, 100 - weeks * 2.6); // 灭菌组：只有缓慢的物理破碎
  const groupB = Math.max(16, 100 - weeks * 8.2); // 自然组：微生物快速分解
  const stageOf = (left: number) => {
    if (left > 85) return 0; // 完整
    if (left > 60) return 1; // 边缘破损
    if (left > 35) return 2; // 碎裂
    return 3; // 仅剩叶脉网
  };
  return { groupA, groupB, stageA: stageOf(groupA), stageB: stageOf(groupB) };
}

/** 画一片（可能破损的）叶子 */
function Leaf({ x, y, rot, stage, tone }: { x: number; y: number; rot: number; stage: number; tone: string }) {
  const stroke = stage >= 3 ? '#8a9a6a' : '#4a8a3a';
  const fill = stage === 0 ? tone : stage === 1 ? '#a8c98a' : stage === 2 ? '#c8d8b0' : '#e4e8d4';
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      {stage >= 3 ? (
        // 仅剩叶脉网
        <path d="M0 -16 L0 16 M0 -10 L9 -14 M0 -10 L-9 -14 M0 -2 L11 -5 M0 -2 L-11 -5 M0 6 L9 9 M0 6 L-9 9" fill="none" stroke={stroke} strokeWidth="1.6" />
      ) : (
        <path d="M0 -16 Q 12 -8 11 2 Q 8 14 0 16 Q -8 14 -11 2 Q -12 -8 0 -16 Z" fill={fill} stroke={stroke} strokeWidth="2" />
      )}
      {stage === 1 ? <path d="M6 -14 L4 -2" stroke={stroke} strokeWidth="1.6" /> : null}
      {stage === 2 ? (
        <>
          <path d="M-4 -16 L2 16" stroke="#8a9a6a" strokeWidth="1.8" />
          <path d="M-11 0 L6 6" stroke="#8a9a6a" strokeWidth="1.4" />
        </>
      ) : null}
    </g>
  );
}

export function LeafDecomposeLab() {
  const [weeks, setWeeks] = useState(0);
  const { groupA, groupB, stageA, stageB } = decay(weeks);

  const conclusion = (() => {
    if (weeks === 0) return '两组落叶刚埋入土壤。点击「经过 1 周」逐步推进，对比 A（灭菌土）与 B（自然土）两组落叶的变化。';
    if (weeks <= 3) return `第 ${weeks} 周：A 组落叶基本完整（剩余 ${groupA.toFixed(0)}%），B 组边缘已开始破损（剩余 ${groupB.toFixed(0)}%）——微生物正在悄悄工作。`;
    if (weeks <= 6) return `第 ${weeks} 周：差异明显了——A 组剩余 ${groupA.toFixed(0)}%，只是慢慢变脆；B 组剩余 ${groupB.toFixed(0)}%，叶片已碎裂变形。`;
    if (weeks <= 9) return `第 ${weeks} 周：B 组落叶多数只剩叶脉网（剩余 ${groupB.toFixed(0)}%），有机物被分解者转化为无机物归还土壤；A 组仍保持 ${groupA.toFixed(0)}%。`;
    return '10 周结束：A（灭菌土）剩余远多于 B（自然土）——对照证明土壤微生物对落叶具有显著的分解作用，它们是生态系统中不可缺少的分解者。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={() => setWeeks((w) => Math.min(STEPS, w + 1))}
              disabled={weeks >= STEPS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 经过 1 周（{weeks}/{STEPS}）
            </button>
            <button
              type="button"
              onClick={() => setWeeks((w) => Math.min(STEPS, w + 3))}
              disabled={weeks >= STEPS}
              className="min-h-10 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-semibold text-[#366169] transition-colors hover:bg-[#eef7f7] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏭ 快进 3 周
            </button>
            <button type="button" onClick={() => setWeeks(0)} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新埋入落叶
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              第 {weeks} 周 · 落叶剩余率：
              <br />
              A 灭菌土 <span className="text-base font-bold text-[#7a6a4a]">{groupA.toFixed(0)}%</span>
              <br />
              B 自然土 <span className={`text-base font-bold ${weeks > 4 ? 'text-[#b0483a]' : 'text-[#2f7a4d]'}`}>{groupB.toFixed(0)}%</span>
            </div>
          </>
        }
      >
        <SceneBox label="两组埋叶对照（左 A 灭菌土 · 右 B 自然土）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 280" aria-hidden="true">
            {/* A 组 */}
            <g>
              <rect x="20" y="60" width="190" height="40" rx="8" fill="#e8eef4" stroke="#8aa7ad" strokeWidth="2" />
              <text x="115" y="86" textAnchor="middle" fontSize="11" fill="#4b6c73" fontWeight="700">A · 高温灭菌土（无微生物）</text>
              <path d="M20 104 L210 104 L210 210 Q 115 232 20 210 Z" fill="#c9a882" stroke="#a5885f" strokeWidth="2.5" />
              {[
                [70, 140, -20, 0], [120, 132, 14, 1], [165, 142, -6, 2],
                [88, 168, 8, 0], [140, 162, -16, 1], [60, 186, 18, 2], [110, 188, -8, 0], [162, 182, 12, 1],
              ].map(([x, y, rot, k], i) => (
                <Leaf key={i} x={x} y={y} rot={rot} stage={stageA} tone={k === 0 ? '#8ab86a' : k === 1 ? '#a8cf98' : '#c2d8a8'} />
              ))}
              {/* 网袋示意 */}
              <path d="M24 104 L206 104 M24 116 L206 116 M40 104 L40 116 M70 104 L70 116 M100 104 L100 116 M130 104 L130 116 M160 104 L160 116 M190 104 L190 116" stroke="#8aa7ad" strokeWidth="1.2" opacity="0.7" />
              <text x="115" y="240" textAnchor="middle" fontSize="11" fill="#59767c">剩余 {groupA.toFixed(0)}%</text>
            </g>
            {/* B 组 */}
            <g>
              <rect x="230" y="60" width="190" height="40" rx="8" fill="#e2f0e2" stroke="#6aa86a" strokeWidth="2" />
              <text x="325" y="86" textAnchor="middle" fontSize="11" fill="#2f7a4d" fontWeight="700">B · 自然土壤（含微生物）</text>
              <path d="M230 104 L420 104 L420 210 Q 325 232 230 210 Z" fill="#c9a882" stroke="#a5885f" strokeWidth="2.5" />
              {[
                [280, 140, -20, 0], [330, 132, 14, 1], [375, 142, -6, 2],
                [298, 168, 8, 0], [350, 162, -16, 1], [270, 186, 18, 2], [320, 188, -8, 0], [372, 182, 12, 1],
              ].map(([x, y, rot, k], i) => {
                const stage = weeks >= 6 ? Math.min(3, (stageB as number) + (i % 2)) : stageB;
                return <Leaf key={i} x={x} y={y} rot={rot} stage={stage} tone={k === 0 ? '#8ab86a' : k === 1 ? '#a8cf98' : '#c2d8a8'} />;
              })}
              {/* 微生物标记 */}
              {weeks > 0 ? (
                <g>
                  {[[262, 206], [300, 214], [342, 204], [382, 210], [258, 178], [352, 190]].map(([cx, cy], i) => (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="4" fill="#f4d06a" stroke="#8a671b" strokeWidth="1.4" />
                      <path d={`M${cx - 6} ${cy - 3} L${cx - 10} ${cy - 6} M${cx + 6} ${cy - 2} L${cx + 10} ${cy - 5}`} stroke="#8a671b" strokeWidth="1.4" />
                    </g>
                  ))}
                  <text x="325" y="228" textAnchor="middle" fontSize="9.5" fill="#8a671b">分解者（细菌·真菌）正在工作</text>
                </g>
              ) : null}
              <text x="325" y="240" textAnchor="middle" fontSize="11" fill="#59767c">剩余 {groupB.toFixed(0)}%</text>
            </g>
            {/* 时间轴 */}
            <rect x="20" y="252" width="400" height="8" rx="4" fill="#dceaea" />
            <rect x="20" y="252" width={(weeks / STEPS) * 400} height="8" rx="4" fill="#0e6f75" />
            <text x="20" y="274" fontSize="9.5" fill="#8a9a9f">第 0 周</text>
            <text x="420" y="274" textAnchor="end" fontSize="9.5" fill="#8a9a9f">第 10 周</text>
          </svg>
        </SceneBox>

        <ObservationNote>{conclusion}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
