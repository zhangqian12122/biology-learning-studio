'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（恩格尔曼，1880）',
    lines: [
      <>恩格尔曼用<span className="font-semibold">水绵</span>（带螺旋带状叶绿体的绿藻）和<span className="font-semibold">好氧细菌</span>做实验：用极细的光束照射水绵，发现好氧细菌只聚集在<span className="font-semibold">叶绿体被光照射的部位</span>——说明氧气是由叶绿体释放的。</>,
      <>后来他用<span className="font-semibold">三棱镜色散</span>的连续光谱照射水绵：好氧细菌密集分布在<span className="font-semibold">红光和蓝紫光</span>区域——证明叶绿素主要吸收红光与蓝紫光。</>,
      <>这个实验妙在"用细菌当氧气探测器"：哪里细菌多，哪里就产氧多。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>光照切换：黑暗 → 全光谱 → 色散光谱（红/黄/绿/蓝紫四段）。</>,
      <>好氧细菌会向"产氧最多的区域"游动聚集——聚集密度就是光合强度的"仪表"。</>,
      <>观察点：绿光区细菌为什么最少？（绿光几乎被反射，叶绿素吸收最少）</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 先「暗处理」：好氧细菌均匀分散（没有氧气梯度）。</>,
      <>② 点「色散光谱照射」并推进：观察细菌向红光、蓝紫光区聚集。</>,
      <>③ 对比各色区的细菌密度，得出光合作用吸收光谱的结论。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>叶绿素 a 与叶绿素 b 主要吸收<span className="font-semibold">蓝紫光和红光</span>，类胡萝卜素主要吸收蓝紫光；<span className="font-semibold">绿光吸收最少</span>（所以叶片呈绿色）。</>,
      <>实验的自变量是<span className="font-semibold">光的波长</span>，因变量是<span className="font-semibold">好氧菌的分布</span>（代表产氧量/光合强度）。</>,
      <>恩格尔曼之后，人们用精密仪器测得叶绿体的吸收光谱，与他的实验结果一致。</>,
    ],
  },
];

type Stage = 0 | 1 | 2;

const SPECTRUM = [
  { name: '红', color: '#d84a3a', x: 118, w: 52, attract: 0.92 },
  { name: '橙黄', color: '#e8a02a', x: 170, w: 52, attract: 0.55 },
  { name: '绿', color: '#4a9a4a', x: 222, w: 52, attract: 0.08 },
  { name: '蓝紫', color: '#4a5ac9', x: 274, w: 58, attract: 0.88 },
];

/** 好氧菌在各区的聚集比例（随推进程度插值，从均匀 0.25 到目标分布） */
function distribution(stage: Stage): number[] {
  const uniform = SPECTRUM.map(() => 0.25);
  if (stage < 2) return uniform;
  const target = SPECTRUM.map((s) => s.attract);
  const t = stage - 1; // 1 = 完全聚集
  return uniform.map((u, i) => u + (target[i] - u) * t);
}

export function EngelmannLab() {
  const [stage, setStage] = useState<Stage>(0);
  const step = () => setStage((s) => (Math.min(2, s + 1) as Stage));
  const reset = () => setStage(0);

  const dist = distribution(stage);
  const peakZone = dist.indexOf(Math.max(...dist));

  const observation = (() => {
    if (stage === 0) return '黑暗中：好氧细菌均匀分散在水绵周围——没有氧气梯度，细菌"不知道"该去哪。点「色散光谱照射」开始实验。';
    if (stage === 1) return '三棱镜把光分成红、橙黄、绿、蓝紫四段照在水绵上——细菌开始感知叶绿体释放的氧气，向产氧多的区域游动。';
    const sorted = SPECTRUM.map((s, i) => ({ name: s.name, v: dist[i] })).sort((a, b) => b.v - a.v);
    return `细菌密集区：${sorted[0].name}光区（${(dist[0] * 100).toFixed(0)} 份）与 ${SPECTRUM[3].name}光区（${(dist[3] * 100).toFixed(0)} 份）；绿光区最稀少。结论：叶绿体释放氧气，且主要吸收红光与蓝紫光——绿光被反射，所以叶片是绿色的。`;
  })();

  // 菌点：每区放 6 个，位置随聚集比例向叶绿体投影区收缩
  const bacteria = SPECTRUM.flatMap((s, zone) =>
    [0, 1, 2, 3, 4, 5].map((j) => {
      const spread = (1 - dist[zone]) * 60;
      const baseX = s.x + s.w / 2;
      const x = baseX + (((j * 13) % 40) - 20) * (spread / 60) + (j % 2 === 0 ? -spread * 0.4 : spread * 0.4);
      const y = 148 + ((j * 17) % 46) - (stage >= 2 ? 0 : 0);
      const targetY = 132 + ((j * 23) % 40);
      const cy = y + (targetY - y) * (dist[zone] / Math.max(0.25, 1)) * 0.9 * (stage >= 2 ? 1 : 0);
      return { x, cy: Math.max(96, Math.min(228, cy)), r: 3.4 };
    }),
  );

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= 2}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {stage === 0 ? '🌈 色散光谱照射' : '⏱ 推进（细菌游向产氧区）'}
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新暗处理
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前状态：<span className="font-bold text-[#13333a]">{stage === 0 ? '黑暗（均匀分散）' : stage === 1 ? '光谱照射中' : '聚集完成'}</span>
              <br />
              细菌最密集区：<span className="font-bold">{stage >= 2 ? `${SPECTRUM[peakZone].name}光区` : '均匀分布'}</span>
            </div>
          </>
        }
      >
        <SceneBox label="恩格尔曼实验：水绵 + 好氧细菌 + 色散光谱" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 三棱镜与光路 */}
            {stage >= 1 ? (
              <g>
                <path d="M28 42 L48 84 L12 84 Z" fill="#cfe8f4" stroke="#4d7ea8" strokeWidth="2.4" />
                <path d="M40 74 L112 108" stroke="#e8e8e8" strokeWidth="3" />
                <text x="10" y="32" fontSize="10" fill="#4d7ea8" fontWeight="700">三棱镜</text>
                <text x="60" y="112" fontSize="9" fill="#59767c">白光色散</text>
              </g>
            ) : null}
            {/* 光谱带 */}
            {stage >= 1
              ? SPECTRUM.map((s) => (
                  <g key={s.name}>
                    <rect x={s.x} y={s.w === 52 ? 104 : 104} width={s.w} height="14" fill={s.color} opacity={stage >= 1 ? 0.85 : 0.4} />
                    <text x={s.x + s.w / 2} y={132} textAnchor="middle" fontSize="9.5" fill={s.color} fontWeight="700">{s.name}</text>
                  </g>
                ))
              : null}

            {/* 水绵（长条细胞+螺旋叶绿体） */}
            <g>
              <rect x="90" y="150" width="300" height="90" rx="30" fill="#e4f0d8" stroke="#4a8a3a" strokeWidth="3" />
              {/* 两端细胞壁 */}
              <line x1="190" y1="150" x2="190" y2="240" stroke="#4a8a3a" strokeWidth="2.4" />
              <line x1="290" y1="150" x2="290" y2="240" stroke="#4a8a3a" strokeWidth="2.4" />
              {/* 螺旋叶绿体（三条带） */}
              {[0, 1, 2].map((i) => (
                <path
                  key={i}
                  d={`M${110 + i * 8} ${168 + i * 8} Q 250 ${140 + i * 10} 388 ${168 + i * 8}`}
                  fill="none"
                  stroke="#3f9a5a"
                  strokeWidth="16"
                  opacity="0.85"
                />
              ))}
              <text x="250" y="248" textAnchor="middle" fontSize="10.5" fill="#3f7f3a" fontWeight="700">水绵：带状螺旋叶绿体缠绕近一圈</text>
            </g>

            {/* 好氧菌（位置随聚集比例变化） */}
            <g style={{ transition: 'all 0.6s ease' }}>
              {bacteria.map((b, i) => (
                <circle key={i} cx={b.x} cy={b.cy} r={b.r} fill="#4a5a6a" stroke="#13333a" strokeWidth="1.2" />
              ))}
              <text x="26" y="230" fontSize="10" fill="#4a5a6a" fontWeight="700">● 好氧菌</text>
            </g>

            {/* 光照开关状态 */}
            <text x="406" y="236" textAnchor="end" fontSize="10" fill="#8a9a9f">
              {stage === 0 ? '黑暗' : '光谱照射'}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
