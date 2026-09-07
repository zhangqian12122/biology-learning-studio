'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（向光性）',
    lines: [
      <>单侧光照射时，胚芽鞘尖端产生的<span className="font-semibold">生长素</span>会由向光一侧横向运输到<span className="font-semibold">背光一侧</span>，造成背光侧生长素浓度高。</>,
      <>生长素在低浓度时<span className="font-semibold">促进生长</span>：背光侧细胞伸长得更快，茎便向光弯曲——这就是"向光性"。</>,
      <>感光部位在<span className="font-semibold">尖端</span>，弯曲部位在尖端下方的伸长区：切去尖端或用锡箔罩住尖端，茎都不再弯曲。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>光照方向：左单侧光 / 顶部均匀光 / 右单侧光（可切换）。</>,
      <>尖端开关：完整胚芽鞘 vs 切去尖端（或罩锡箔帽）。</>,
      <>观察点：生长素分布条与茎弯曲角度的联动。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 选「右单侧光」，推进观察生长素分布与茎的弯曲方向。</>,
      <>② 切换「顶部光」：生长素均匀，茎直立生长。</>,
      <>③ 点「切去尖端」再给单侧光：茎既不生长也不弯曲——尖端既是感光部位又是生长素来源。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>向光性的外因是<span className="font-semibold">单侧光</span>，内因是<span className="font-semibold">生长素分布不均匀</span>（背光侧多于向光侧）。</>,
      <>生长素浓度<span className="font-semibold">低促进、高抑制</span>（两重性）：茎的向光性只体现了促进作用侧的分布差异。</>,
      <>达尔文、温特等人的系列实验证明了"尖端产生某种化学物质"——后来被命名为生长素（吲哚乙酸）。</>,
    ],
  },
];

type LightDir = 'right' | 'top' | 'left';
type TipState = 'intact' | 'cut' | 'covered';

/** 计算生长素分布比例（背光侧:向光侧）与弯曲角度 */
function calcBend(light: LightDir, tip: TipState): { backLg: number; bend: number } {
  if (tip === 'cut') return { backLg: 0, bend: 0 };
  let backLg = 50;
  if (tip !== 'covered') {
    if (light === 'right') backLg = 72;
    if (light === 'left') backLg = 28;
  }
  // 弯向生长素少的一侧；顶部光不弯；锡箔帽不弯
  const bend = tip === 'covered' ? 0 : light === 'right' ? -26 : light === 'left' ? 26 : 0;
  return { backLg, bend };
}

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function PhototropismLab() {
  const [light, setLight] = useState<LightDir>('right');
  const [tip, setTip] = useState<TipState>('intact');
  const { backLg, bend } = calcBend(light, tip);

  const leftLg = 100 - backLg;
  const towardLight = backLg > 60 ? 'right' : backLg < 40 ? 'left' : null;
  const dirText = tip === 'cut' ? '不生长、不弯曲' : bend === 0 ? '直立生长' : light === 'right' ? '向右（光源）弯曲' : '向左（光源）弯曲';

  const observation = (() => {
    if (tip === 'cut') return '切去了尖端：没有感光部位、也没有生长素来源——茎既不生长也不弯曲。这证明尖端是感光和产生生长素的关键。';
    if (tip === 'covered') return '尖端罩上锡箔帽：能感受得到光却"感光不了"——生长素分布均匀，茎直立生长。证明感光部位在尖端。';
    if (light === 'top') return '顶部均匀光照：生长素分布均匀（左右各 50），茎直立生长——只有"单侧"光才引起弯曲。';
    return `单侧光从${light === 'right' ? '右' : '左'}侧照来：生长素向背光侧转移（背光侧 ${Math.max(backLg, leftLg)}% : 向光侧 ${Math.min(backLg, leftLg)}%），背光侧长得快，茎向${towardLight === 'right' ? '右' : '左'}弯曲。`;
  })();

  // 茎的绘制：以底部为原点，按弯曲角度画二次曲线
  const baseX = 250;
  const baseY = 320;
  const stemLen = 190;
  const tipX = baseX + (bend / 90) * stemLen * 1.1;
  const tipY = baseY - stemLen + Math.abs(bend) * 0.35;

  // 生长素分布条
  const barY = 58;

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">光照方向</p>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    { id: 'left', label: '◀ 左侧光' },
                    { id: 'top', label: '☀ 顶部光' },
                    { id: 'right', label: '右侧光 ▶' },
                  ] as { id: LightDir; label: string }[]
                ).map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setLight(l.id)}
                    className={`min-h-10 rounded-md border px-2 text-xs font-semibold transition-colors ${
                      light === l.id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">胚芽鞘尖端</p>
              <div className="grid gap-1.5">
                {(
                  [
                    { id: 'intact', label: '完整尖端' },
                    { id: 'covered', label: '罩锡箔帽' },
                    { id: 'cut', label: '切去尖端' },
                  ] as { id: TipState; label: string }[]
                ).map((t) => (
                  <button key={t.id} type="button" onClick={() => setTip(t.id)} className={`${cnChip(tip === t.id)} w-full text-left`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              生长素分布：向光侧 {Math.min(leftLg, backLg)}% · 背光侧 {Math.max(leftLg, backLg)}%
              <br />
              结果：<span className="font-bold text-[#13333a]">{dirText}</span>
            </div>
          </>
        }
      >
        <SceneBox label={`胚芽鞘实验：${light === 'right' ? '右单侧光' : light === 'left' ? '左单侧光' : '顶部均匀光'} · ${tip === 'intact' ? '完整尖端' : tip === 'covered' ? '锡箔帽罩住尖端' : '切去尖端'}`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 340" aria-hidden="true">
            {/* 光源 */}
            {light !== 'top' ? (
              <g>
                <circle cx={light === 'right' ? 408 : 32} cy={110} r="18" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.5" />
                {[0, 1, 2].map((i) => (
                  <path
                    key={i}
                    d={`M${light === 'right' ? 386 : 56} ${102 + i * 12} L${light === 'right' ? 352 : 90} ${102 + i * 12}`}
                    stroke="#e8c95a"
                    strokeWidth="2"
                    strokeDasharray="6 5"
                    markerEnd="url(#pt-light)"
                    opacity="0.9"
                  />
                ))}
              </g>
            ) : (
              <g>
                <rect x="180" y="10" width="140" height="16" rx="6" fill="#f4d06a" stroke="#b5953a" strokeWidth="2" />
                {[0, 1, 2, 3].map((i) => (
                  <path key={i} d={`M${200 + i * 30} 30 L${200 + i * 30} 52`} stroke="#e8c95a" strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#pt-light)" />
                ))}
              </g>
            )}

            {/* 弯曲的茎 */}
            <g>
              <path
                d={`M${baseX} ${baseY} Q ${baseX + bend * 0.6} ${baseY - stemLen * 0.6} ${tipX} ${tipY}`}
                fill="none"
                stroke="#6a8a4a"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* 尖端或切口 */}
              {tip === 'cut' ? (
                <g>
                  <circle cx={tipX} cy={tipY} r="7" fill="#b0483a" />
                  <text x={tipX + 16} y={tipY + 4} fontSize="10" fill="#b0483a" fontWeight="700">已切去</text>
                </g>
              ) : tip === 'covered' ? (
                <g>
                  <rect x={tipX - 14} y={tipY - 22} width="28" height="24" rx="6" fill="#4a5a6a" stroke="#13333a" strokeWidth="2" />
                  <text x={tipX + 18} y={tipY - 6} fontSize="10" fill="#4a5a6a" fontWeight="700">锡箔帽</text>
                </g>
              ) : (
                <path d={`M${tipX - 10} ${tipY + 12} Q ${tipX} ${tipY - 18} ${tipX + 10} ${tipY + 12}`} fill="#8ab86a" stroke="#3f7f3a" strokeWidth="2.5" />
              )}
              {/* 地面 */}
              <rect x="120" y={baseY} width="260" height="12" fill="#c9b88a" stroke="#a5885f" strokeWidth="2" />
            </g>

            {/* 生长素分布条 */}
            <g>
              <text x={38} y={barY - 6} fontSize="10" fill="#59767c" fontWeight="700">生长素分布</text>
              <rect x={38} y={barY} width={leftLg * 1.6} height="20" fill="#a5761d" opacity="0.85" />
              <rect x={38 + leftLg * 1.6} y={barY} width={backLg * 1.6} height="20" fill="#f4d06a" stroke="#b5953a" strokeWidth="1.6" />
              <text x={38 + leftLg * 0.8} y={barY + 15} textAnchor="middle" fontSize="9.5" fill="#ffffff" fontWeight="800">{Math.min(leftLg, backLg)}%</text>
              <text x={38 + leftLg * 1.6 + backLg * 0.8} y={barY + 15} textAnchor="middle" fontSize="9.5" fill="#8a5a1d" fontWeight="800">{Math.max(leftLg, backLg)}%</text>
              <text x={38} y={barY + 38} fontSize="9" fill="#8a9a9f">左（向光）</text>
              <text x={38 + 320} y={barY + 38} textAnchor="end" fontSize="9" fill="#8a9a9f">右（背光）</text>
              {light === 'left' || light === 'right' ? (
                <text x={38 + 320} y={barY - 6} textAnchor="end" fontSize="9" fill="#b5953a" fontWeight="700">← 背光侧多 →</text>
              ) : null}
            </g>

            <defs>
              <marker id="pt-light" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#e8c95a" />
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
