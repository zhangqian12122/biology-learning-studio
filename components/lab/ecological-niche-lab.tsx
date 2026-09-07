'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（生态位与竞争）',
    lines: [
      '① 把"食物丰富度"放到 10：观察 A、B 两种鸟生态位分明、几乎不重叠。',
      '② 逐步调低丰富度：重叠区变大，竞争加剧——哪个物种先撑不住？',
      '③ 结论：生态位分化是物种共存的前提。',
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>资源轴：树干高度 0~10 m，两种小鸟（喙短的 A 种偏好下层，喙长的 B 种偏好上层）。</>,
      <>滑块"食物丰富度"：食物越少，两种鸟被迫取食的重叠区越大。</>,
      <>观察点：生态位重叠率的变化，以及"竞争排除警告"何时出现。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      '① 把食物丰富度放到 10：观察 A、B 两种鸟生态位分明、几乎不重叠。',
      '② 逐步调低丰富度：重叠区变大，竞争加剧——哪个物种先撑不住？',
      '③ 结论：生态位分化是物种共存的前提。',
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>研究动物生态位常看<span className="font-semibold">食物、栖息空间、活动时间</span>三个维度；植物则看水分、光照、无机盐等。</>,
      <><span className="font-semibold">竞争排除原理</span>：生态位完全相同的两个物种不能长期共存。</>,
      <>群落中的物种通过生态位分化减少竞争——这就是群落结构<span className="font-semibold">分层现象</span>的原因之一。</>,
    ],
  },
];

/** 两种鸟的生态位中心与宽度（资源轴 0~10 m 树干高度） */
function nicheParams(richness: number) {
  // 丰富度高 → 生态位窄（各吃各的）；低 → 宽（被迫抢食）
  const widthA = 1.2 + (10 - richness) * 0.28;
  const widthB = 1.2 + (10 - richness) * 0.28;
  const centerA = 3.4 + (10 - richness) * 0.12; // A 被迫下移
  const centerB = 6.8 - (10 - richness) * 0.12; // B 被迫上移
  return { centerA, centerB, widthA, widthB };
}

/** 重叠率（近似：重叠区宽度 / 较窄生态位宽度） */
function overlapRate(richness: number): number {
  const { centerA, centerB, widthA, widthB } = nicheParams(richness);
  const aLow = centerA - widthA * 1.6;
  const aHigh = centerA + widthA * 1.6;
  const bLow = centerB - widthB * 1.6;
  const bHigh = centerB + widthB * 1.6;
  const ov = Math.max(0, Math.min(aHigh, bHigh) - Math.max(aLow, bLow));
  return Math.min(1, ov / (2 * widthA * 1.6));
}

export function EcologicalNicheLab() {
  const [richness, setRichness] = useState(10);

  const { centerA, centerB, widthA, widthB } = nicheParams(richness);
  const rate = overlapRate(richness);
  const excluded = rate > 0.55;

  // 资源轴映射：0~10 m → x 120~360
  const toX = (m: number) => 120 + (m / 10) * 240;
  const nicheBand = (center: number, width: number, color: string, opacity: number) => {
    const cx = toX(center);
    const half = width * 1.6 * 24;
    return `M${cx - half} 230 Q ${cx - half * 0.3} 90 ${cx} 84 Q ${cx + half * 0.3} 90 ${cx + half} 230`;
  };

  const observation = (() => {
    if (excluded) {
      return `食物严重不足（丰富度 ${richness}）：A、B 两种鸟的生态位重叠率达 ${(rate * 100).toFixed(0)}%——按竞争排除原理，竞争力弱的一方将被迫迁走或消失。`;
    }
    if (richness >= 8) {
      return `食物充足（丰富度 ${richness}）：A 种在下层、B 种在上层各吃各的，生态位重叠率仅 ${(rate * 100).toFixed(0)}%——生态位分化让两种鸟得以共存。`;
    }
    return `食物减少（丰富度 ${richness}）：两种鸟被迫扩大取食范围，生态位重叠率升至 ${(rate * 100).toFixed(0)}%——竞争开始加剧，高亮区就是"争夺区"。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">
                食物丰富度：<span className={`text-base font-bold ${excluded ? 'text-[#b0483a]' : 'text-[#2f7a4d]'}`}>{richness}</span> / 10
              </p>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={richness}
                onChange={(e) => setRichness(Number(e.target.value))}
                className="w-full accent-[#0e6f75]"
                aria-label="调节食物丰富度"
              />
              <p className="mt-1 text-[11px] text-[#799398]">旱季食物减少时，两种鸟会被迫争夺同一批昆虫。</p>
            </div>
            <button type="button" onClick={() => setRichness(10)} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              恢复食物丰富
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              生态位重叠率：<span className={`text-base font-bold ${excluded ? 'text-[#b0483a]' : 'text-[#2f7a4d]'}`}>{(rate * 100).toFixed(0)}</span>%
              <br />
              {excluded ? <span className="font-bold text-[#b0483a]">⚠ 竞争排除警告</span> : '两种鸟可以共存'}
            </div>
          </>
        }
      >
        <SceneBox label="树干上的生态位（横轴 = 树干高度 0~10 m）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 280" aria-hidden="true">
            {/* 树干 */}
            <rect x="230" y="30" width="34" height="220" fill="#c9a882" stroke="#8a6a3a" strokeWidth="2.5" />
            <text x="247" y="22" textAnchor="middle" fontSize="10.5" fill="#8a6a3a" fontWeight="700">树干</text>
            {/* 高度刻度 */}
            {[0, 2, 4, 6, 8, 10].map((m) => (
              <g key={m}>
                <line x1={toX(m)} y1={230} x2={toX(m)} y2={236} stroke="#8a9a9f" strokeWidth="1.4" />
                <text x={toX(m)} y={250} textAnchor="middle" fontSize="9" fill="#8a9a9f">{m}m</text>
              </g>
            ))}
            <line x1={toX(0)} y1={230} x2={toX(10)} y2={230} stroke="#8a9a9f" strokeWidth="1.6" />
            {/* 生态位曲线（半透明带） */}
            <g>
              <path d={nicheBand(centerB, widthB, '#4d7ea8', 0.5)} fill="#4d7ea8" fillOpacity="0.45" stroke="#3d6a94" strokeWidth="2.4" />
              <path d={nicheBand(centerA, widthA, '#c9708a', 0.5)} fill="#c9708a" fillOpacity="0.45" stroke="#a54868" strokeWidth="2.4" />
            </g>
            {/* 鸟的位置标记 */}
            <g>
              <circle cx={toX(centerA)} cy="70" r="9" fill="#c9708a" stroke="#a54868" strokeWidth="2" />
              <text x={toX(centerA)} cy="70" dy="3" textAnchor="middle" fontSize="8.5" fill="#ffffff" fontWeight="800">A</text>
              <circle cx={toX(centerB)} cy="70" r="9" fill="#4d7ea8" stroke="#3d6a94" strokeWidth="2" />
              <text x={toX(centerB)} cy="70" dy="3" textAnchor="middle" fontSize="8.5" fill="#ffffff" fontWeight="800">B</text>
            </g>
            {/* 图例 */}
            <g>
              <circle cx="52" cy="56" r="8" fill="#c9708a" stroke="#a54868" strokeWidth="1.8" />
              <text x="66" y="60" fontSize="10.5" fill="#a54868" fontWeight="700">A 种（喙短·食树皮下虫）</text>
              <circle cx="52" cy="82" r="8" fill="#4d7ea8" stroke="#3d6a94" strokeWidth="1.8" />
              <text x="66" y="86" fontSize="10.5" fill="#3d6a94" fontWeight="700">B 种（喙长·食树冠昆虫）</text>
            </g>
            {/* 重叠警告 */}
            {excluded ? (
              <text x="222" y="264" textAnchor="middle" fontSize="11" fill="#b0483a" fontWeight="800">
                ⚠ 生态位高度重叠：竞争排除即将发生
              </text>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
