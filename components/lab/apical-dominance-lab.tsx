'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（顶端优势）',
    lines: [
      <>顶芽产生的生长素<span className="font-semibold">极性运输</span>（只能从形态学上端向下端运输），大量积累在<span className="font-semibold">侧芽</span>部位。</>,
      <>侧芽对生长素浓度<span className="font-semibold">十分敏感</span>：顶芽送来的高浓度生长素抑制侧芽发育——这就是<span className="font-semibold">顶端优势</span>。</>,
      <>摘除顶芽后生长素来源消失，侧芽附近浓度降低，侧芽发育成侧枝；若在切口涂抹生长素，侧芽仍被抑制——证明"抑制者"是生长素。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>三种处理：完整植株（顶端优势）/ 摘除顶芽 / 摘除顶芽 + 切口涂生长素。</>,
      <>观察点：三个侧芽的萌发状态与茎内生长素浓度梯度。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 先观察完整植株：侧芽闭合休眠。</>,
      <>② 点「摘除顶芽」并推进：侧芽开始萌发。</>,
      <>③ 重新长出顶芽后点「涂抹生长素」：侧芽再次休眠——两重性（低促高抑）实锤。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>两重性：<span className="font-semibold">低浓度促进生长、高浓度抑制生长</span>；顶芽处浓度低促进生长、侧芽处浓度高抑制生长。</>,
      <>应用：<span className="font-semibold">摘心打顶</span>（棉花、茶树）解除顶端优势增产；木材休眠则保留顶端。</>,
      <>根的顶端优势相反吗？根也有限端优势，但侧根对生长素的敏感度与茎不同——注意区分器官。</>,
    ],
  },
];

type Treatment = 'intact' | 'cut' | 'cut_auxin';

export function ApicalDominanceLab() {
  const [treat, setTreat] = useState<Treatment>('intact');

  const auxinTop = treat === 'intact' ? '高' : treat === 'cut' ? '无来源' : '补涂';
  const lateralGrowth = treat === 'cut';

  const observation = (() => {
    if (treat === 'intact') {
      return '完整植株：顶芽产生的生长素沿茎向下极性运输，在侧芽处积累到抑制浓度——三个侧芽全部休眠。这就是顶端优势。';
    }
    if (treat === 'cut') {
      return '顶芽已摘除：生长素来源消失，侧芽处浓度下降到"促进"区间——侧芽纷纷萌发，不久将长成侧枝。生产上的"摘心打顶"正基于此。';
    }
    return '切口涂上生长素：虽然顶芽没了，侧芽处的生长素浓度依然很高——侧芽继续休眠。证明抑制侧芽的不是顶芽本身，而是生长素。';
  })();

  const lateral = (cx: number, cy: number, opened: boolean, i: number) => (
    <g key={i}>
      <path d={`M${cx} ${cy} l0 -14`} stroke={opened ? '#4a8a3a' : '#8a7a4a'} strokeWidth="4" strokeLinecap="round" />
      {opened ? (
        <>
          <path d={`M${cx} ${cy - 14} q -16 -8 -22 -22`} fill="none" stroke="#4a8a3a" strokeWidth="4" strokeLinecap="round" />
          <path d={`M${cx} ${cy - 14} q 16 -8 22 -22`} fill="none" stroke="#4a8a3a" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx={cx} cy={cy - 40} rx="12" ry="8" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2" />
        </>
      ) : (
        <ellipse cx={cx} cy={cy - 18} rx="6" ry="9" fill="#c9b88a" stroke="#8a7a4a" strokeWidth="2" />
      )}
    </g>
  );

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <p className="text-sm font-medium text-[#37585f]">处理方式</p>
            <div className="grid gap-1.5">
              {(
                [
                    { id: 'intact', label: '完整植株（顶端优势）' },
                    { id: 'cut', label: '✂ 摘除顶芽' },
                    { id: 'cut_auxin', label: '摘除顶芽 + 切口涂生长素' },
                ] as { id: Treatment; label: string }[]
              ).map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTreat(t.id)}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                    treat === t.id
                      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              顶芽生长素来源：<span className="font-bold">{auxinTop}</span>
              <br />
              侧芽状态：<span className="font-bold">{lateralGrowth ? '萌发成侧枝 ✓' : '休眠（被抑制）'}</span>
            </div>
          </>
        }
      >
        <SceneBox label="顶端优势模型（生长素 = 红色，浓度自上而下）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 主茎 */}
            <path d="M220 250 L220 60" stroke="#6a8a4a" strokeWidth="12" strokeLinecap="round" />
            {/* 顶芽 */}
            {treat !== 'cut' ? (
              <path d="M220 58 Q 206 34 220 18 Q 234 34 220 58 Z" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2.5" />
            ) : (
              <path d="M206 62 L234 62" stroke="#b0483a" strokeWidth="4" strokeLinecap="round" />
            )}
            {/* 生长素梯度箭头 */}
            {treat !== 'cut' ? (
              <g>
                <path d="M244 60 L244 210" stroke="#b0483a" strokeWidth="3.5" strokeDasharray="8 5" markerEnd="url(#ad-arrow)" />
                <text x="252" y="86" fontSize="9.5" fill="#b0483a" fontWeight="700">极性运输</text>
                <text x="252" y="100" fontSize="9.5" fill="#b0483a">浓度↑ 侧芽处高</text>
              </g>
            ) : null}
            {treat === 'cut_auxin' ? (
              <g>
                <circle cx="220" cy="58" r="9" fill="#f4d06a" stroke="#8a671b" strokeWidth="2" />
                <text x="234" y="62" fontSize="9.5" fill="#8a671b" fontWeight="700">涂生长素</text>
              </g>
            ) : null}
            {/* 三个侧芽 */}
            {lateral(220, 150, lateralGrowth, 1)}
            {lateral(220, 178, lateralGrowth, 2)}
            {lateral(220, 206, lateralGrowth, 3)}
            {/* 根 */}
            <path d="M214 252 Q 190 284 160 300 M226 252 Q 250 284 280 300 M220 254 L220 300" stroke="#8a6a3a" strokeWidth="4" strokeLinecap="round" />
            <text x="140" y="318" fontSize="10.5" fill="#8a6a3a">（地下部：根系）</text>
            {/* 对比框 */}
            <g>
              <rect x="300" y="80" width="126" height="120" rx="12" fill="#ffffff" stroke="#13333a" strokeWidth="2.2" />
              <text x="363" y="104" textAnchor="middle" fontSize="11.5" fill="#13333a" fontWeight="800">生长素浓度</text>
              {/* 顶芽/侧芽浓度条 */}
              <text x="322" y="128" fontSize="10.5" fill="#59767c">顶芽</text>
              <rect x="352" y="120" width={(treat === 'intact' ? 30 : treat === 'cut' ? 0 : 70)} height="10" rx="3" fill="#7ab86a" />
              <text x="322" y="150" fontSize="10.5" fill="#59767c">侧芽</text>
              <rect x="352" y="142" width={(treat === 'intact' ? 80 : treat === 'cut' ? 25 : 78)} height="10" rx="3" fill="#b0483a" />
              <text x="363" y="180" textAnchor="middle" fontSize="10.5" fill="#8a2a4a" fontWeight="700">
                {treat === 'cut' ? '侧芽解除抑制' : '侧芽被抑制'}
              </text>

              <text x="363" y="164" textAnchor="middle" fontSize="9" fill="#8a9a9f">（相对浓度示意）</text>
              <text x="363" y="188" textAnchor="middle" fontSize="10.5" fill="#8a2a4a" fontWeight="700">
                {treat === 'cut' ? '侧芽解除抑制' : '侧芽被抑制'}
              </text>
            </g>
            <defs>
              <marker id="ad-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#b0483a" />
              </marker>
            </defs>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
