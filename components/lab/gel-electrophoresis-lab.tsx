'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（琼脂糖凝胶电泳）',
    lines: [
      <>DNA 分子的磷酸骨架带<span className="font-semibold">负电荷</span>，在电场中从负极（点样孔一端）向正极迁移。</>,
      <>凝胶是多孔介质，具有<span className="font-semibold">分子筛</span>效应：片段越小，受到的阻力越小，迁移越快——于是不同长度的 DNA 片段按大小分开。</>,
      <>迁移距离与片段长度（碱基对数）成反比。用已知长度的 Marker（分子量标准）作对照，就能读出未知片段的大小。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 制胶：琼脂糖溶于缓冲液，凝固后形成带点样孔的凝胶板。</>,
      <>② 点样：把 DNA 样品与上样缓冲液混合，加入点样孔（上样缓冲液含示踪染料，便于观察前沿）。</>,
      <>③ 电泳：接通直流电源，DNA 由负极向正极迁移，30 min 左右。</>,
      <>④ 染色观察：用核酸染料（如 GelRed）染色，紫外灯下 DNA 条带发出荧光，对照 Marker 判断片段大小。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <><span className="font-semibold">靠近点样孔（负极）的是大片段，靠近正极的是小片段</span>——"小跑得快，大跑得慢"。</>,
      <>PCR 产物常通过电泳鉴定：在预期大小位置出现条带，说明扩增成功（本站 PCR 实验的产物就是这样检验的）。</>,
      <>电泳也用于基因工程中<span className="font-semibold">检测目的基因是否插入载体</span>（比较酶切产物条带数目与位置）。</>,
      <>琼脂糖凝胶电泳分离的是 DNA/RNA；蛋白质电泳常用聚丙烯酰胺凝胶（SDS-PAGE）。</>,
    ],
  },
];

const STAGES = 3; // 0 点样 → 1 电泳中 → 2 染色读带

/** 三种片段：长度(bp)、最终迁移距离（viewBox 坐标），三条泳道同距 */
const FRAGS = [
  { bp: 3000, lanes: [0, 1, 2], y: [96, 96, 96] },
  { bp: 1500, lanes: [0, 1, 2], y: [138, 138, 138] },
  { bp: 500, lanes: [0, 1, 2], y: [186, 186, 186] },
];
const LANE_X = [96, 180, 264];
const WELL_Y = 74;
const PROGRESS = [0, 0.55, 1]; // 各阶段迁移比例

export function GelElectrophoresisLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '三个点样孔已加好样品：1 号泳道是 Marker（已知长度：3000 / 1500 / 500 bp），2 号是 PCR 产物，3 号是酶切产物。点样时样品沉入孔底，还没有迁移。';
    if (stage === 1)
      return '电源已接通，DNA 从负极（点样孔）向正极（下方）迁移。注意看：500 bp 的小片段跑在最前面，3000 bp 的大片段拖在后面——凝胶的分子筛效应让它们按大小分开了。';
    return '关闭电源、染色后在紫外灯下观察：每个泳道都出现清晰的荧光条带。2 号泳道在约 500 bp 处出现明亮条带，说明 PCR 扩增成功；3 号泳道有两条带，说明酶切出了两个片段。对照 Marker 就能读出每条带的长度。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= STAGES}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {stage === 0 ? '⚡ 接通电源开始电泳' : stage === 1 ? '⏱ 继续电泳 15 min' : '🔦 关闭电源·染色观察'}
              （{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              换新胶重新点样
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              电泳方向：<span className="font-semibold">负极（上）→ 正极（下）</span>
              <br />
              记住口诀：<span className="font-semibold text-[#0e6f75]">小片段跑得快，大片段跑得慢</span>
            </div>
          </>
        }
      >
        <SceneBox label="琼脂糖凝胶电泳槽（俯视，点样孔在上）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 电泳槽 */}
            <rect x="36" y="46" width="368" height="190" rx="10" fill="#dceaea" stroke="#5a7a8a" strokeWidth="2.6" />
            {/* 凝胶板 */}
            <rect x="56" y="60" width="248" height="164" rx="4" fill="#f2f0e6" stroke="#b5a582" strokeWidth="2" />
            {/* 缓冲液波纹 */}
            <path d="M318 70 q 10 -5 20 0 q 10 5 20 0 q 10 -5 20 0 q 10 5 20 0" fill="none" stroke="#8ab4c9" strokeWidth="2" />
            <path d="M318 100 q 10 -5 20 0 q 10 5 20 0 q 10 -5 20 0 q 10 5 20 0" fill="none" stroke="#8ab4c9" strokeWidth="2" opacity="0.6" />
            <text x="352" y="140" textAnchor="middle" fontSize="10" fill="#4b6c73">缓冲液</text>
            {/* 电极 */}
            <rect x="44" y="56" width="8" height="150" rx="3" fill="#a53030" />
            <text x="48" y="36" textAnchor="middle" fontSize="11" fill="#a53030" fontWeight="700">− 负极</text>
            <rect x="388" y="56" width="8" height="150" rx="3" fill="#2f6f2a" />
            <text x="392" y="36" textAnchor="middle" fontSize="11" fill="#2f6f2a" fontWeight="700">+ 正极</text>
            {/* 点样孔 */}
            {LANE_X.map((x) => (
              <rect key={`w${x}`} x={x - 14} y={WELL_Y} width="28" height="12" rx="2" fill="#8a9a9f" stroke="#5a7a8a" strokeWidth="1.4" />
            ))}
            {/* 泳道标号 */}
            {['Marker', 'PCR产物', '酶切产物'].map((t, i) => (
              <text key={t} x={LANE_X[i]} y={WELL_Y - 6} textAnchor="middle" fontSize="10.5" fill="#4b6c73" fontWeight="600">{t}</text>
            ))}
            {/* DNA 片段：迁移位置 = 孔底 + 距离×进度 */}
            {stage >= 1
              ? FRAGS.flatMap((f, fi) =>
                  f.lanes.map((lane) => {
                    const y = WELL_Y + 12 + (f.y[fi] - WELL_Y - 12) * PROGRESS[Math.min(stage, 2)];
                    const band = stage >= 2;
                    return (
                      <g key={`${fi}-${lane}`} className={stage === 1 ? 'bio-pop' : undefined}>
                        <rect x={LANE_X[lane] - 12} y={y - 5} width="24" height={band ? 8 : 5} rx="2.5"
                          fill={band ? '#e8a03a' : '#7ab0c9'} stroke={band ? '#8a671b' : 'none'} strokeWidth={band ? 1.4 : 0}
                          opacity={band ? 0.95 : 0.8} />
                      </g>
                    );
                  }),
                )
              : null}
            {/* 迁移方向箭头 */}
            {stage >= 1 ? (
              <g>
                <path d="M330 78 L 330 196" stroke="#5a7a8a" strokeWidth="1.6" strokeDasharray="5 4" />
                <path d="M330 196 l -5 -8 m 5 8 l 5 -8" fill="none" stroke="#5a7a8a" strokeWidth="1.6" />
              </g>
            ) : null}
            {/* 染色后读带标注 */}
            {stage >= 2 ? (
              <g>
                <line x1="56" y1={WELL_Y + 12 + (186 - WELL_Y - 12)} x2="316" y2={WELL_Y + 12 + (186 - WELL_Y - 12)} stroke="#8a671b" strokeWidth="1" strokeDasharray="3 3" />
                <text x="322" y={WELL_Y + 12 + (186 - WELL_Y - 12) + 4} fontSize="10" fill="#8a671b" fontWeight="700">≈500 bp</text>
                <text x="220" y="246" textAnchor="middle" fontSize="10.5" fill="#799398">紫外下 DNA 条带：对照 Marker 读出片段长度</text>
              </g>
            ) : (
              <text x="220" y="246" textAnchor="middle" fontSize="10.5" fill="#9ab0b5">点击「接通电源」开始电泳</text>
            )}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
