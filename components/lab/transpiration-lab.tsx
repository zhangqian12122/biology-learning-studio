'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（蒸腾作用）',
    lines: [
      <>蒸腾作用是水分以<span className="font-semibold">气体状态</span>从植物体内散发到体外的过程，主要通过<span className="font-semibold">叶片的气孔</span>进行。</>,
      <>蒸腾作用产生的<span className="font-semibold">蒸腾拉力</span>是植物吸收和运输水分的主要动力，还能降低叶面温度、促进无机盐运输。</>,
      <>影响蒸腾作用的因素：光照（气孔张开）、温度、空气湿度、风速等。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>用透明干燥的塑料袋罩住植物的枝条（或不同处理的枝条），收集蒸腾释放的水蒸气。</>,
      <>对照设计：A 组叶片正常 / B 组叶片涂凡士林（封闭气孔）/ C 组去掉叶片——比较水珠量。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 选三枝长势相同的枝条，分别做三种处理后罩上干燥塑料袋，袋口扎紧。</>,
      <>② 放在阳光下 2~3 小时后观察袋内水珠量。</>,
      <>③ 结论：水珠主要来自叶片气孔的蒸腾作用。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>袋口应扎在<span className="font-semibold">叶柄以下（茎上）</span>，避免土壤水分蒸发的干扰——排除无关变量。</>,
      <>气孔由<span className="font-semibold">一对保卫细胞</span>围成：保卫细胞吸水膨胀时气孔张开，失水时气孔关闭。</>,
      <>蒸腾作用的意义：拉动水分和无机盐的运输 · 降低叶面温度 · 促进根对水分的吸收。</>,
    ],
  },
];

type Group = 'A' | 'B' | 'C';

export function TranspirationLab() {
  const [stage, setStage] = useState(0);

  const step = () => setStage((s) => Math.min(3, s + 1));
  const reset = () => setStage(0);

  // 各组水珠量（相对量 0~10）
  const waterA = stage * 4; // A 正常叶·最多
  const waterB = stage * 1; // B 涂凡士林·几乎无
  const waterC = stage * 0.5; // C 去叶·极少

  const observation = (() => {
    if (stage === 0) return '三枝条刚罩上塑料袋：A 正常叶 / B 叶片涂凡士林（封气孔）/ C 去掉叶片。推进时间观察袋内水珠量差异。';
    if (stage <= 2) return `推进 ${stage} 步：A 组袋内已有水珠，B 组（涂凡士林封气孔）和 C 组（去叶片）几乎无水珠——水确实是通过叶片气孔散失的。`;
    return `实验结束：A 组水珠最多（${waterA}），B 组几乎无（${waterB}），C 组最少（${waterC}）。结论：蒸腾作用主要通过叶片的气孔散失水分——气孔是蒸腾作用的"门户"。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button type="button" onClick={step} disabled={stage >= 3} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40">
              ⏱ 推进（{stage}/3）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              A 正常叶水珠：<span className="font-bold">{waterA.toFixed(0)}</span> · B 涂凡士林：<span className="font-bold">{waterB.toFixed(0)}</span> · C 去叶：<span className="font-bold">{waterC.toFixed(0)}</span>
            </div>
          </>
        }
      >
        <SceneBox label="三组对照实验：叶片气孔是蒸腾作用的主要通道" heightClass="h-[320px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* A 组 */}
            <g>
              <rect x="20" y="40" width="120" height="180" rx="10" fill="#e8f2f8" stroke="#4d7ea8" strokeWidth="2.4" />
              <text x="80" y="62" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">A · 正常叶</text>
              {/* 枝条 */}
              <path d="M80 210 L80 110" stroke="#6a8a3a" strokeWidth="6" strokeLinecap="round" />
              {[0, 1, 2].map((i) => (
                <ellipse key={i} cx={64 + i * 14} cy={130 + i * 22} rx="18" ry="11" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2" transform={`rotate(${i * 15 - 15} ${64 + i * 14} ${130 + i * 22})`} />
              ))}
              {/* 袋内水珠 */}
              {[...Array(Math.min(10, Math.ceil(waterA / 1.5)))].map((_, i) => (
                <circle key={i} cx={34 + (i % 5) * 22} cy={80 + Math.floor(i / 5) * 30} r="3.5" fill="#b8d4ea" stroke="#7a9a9f" strokeWidth="1" />
              ))}
              <text x="80" y="238" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">水珠量 {waterA.toFixed(0)}</text>
            </g>
            {/* B 组 */}
            <g>
              <rect x="160" y="40" width="120" height="180" rx="10" fill="#e8f2f8" stroke="#4d7ea8" strokeWidth="2.4" />
              <text x="220" y="62" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">B · 叶涂凡士林</text>
              <path d="M220 210 L220 110" stroke="#6a8a3a" strokeWidth="6" strokeLinecap="round" />
              {[0, 1, 2].map((i) => (
                <ellipse key={i} cx={204 + i * 14} cy={130 + i * 22} rx="18" ry="11" fill="#c9b88a" stroke="#a5761d" strokeWidth="2" transform={`rotate(${i * 15 - 15} ${204 + i * 14} ${130 + i * 22})`} />
              ))}
              {[...Array(Math.min(3, Math.ceil(waterB / 1.5)))].map((_, i) => (
                <circle key={i} cx={174 + i * 22} cy={80 + i * 30} r="2.5" fill="#b8d4ea" stroke="#7a9a9f" strokeWidth="0.8" />
              ))}
              <text x="220" y="238" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">水珠量 {waterB.toFixed(0)}</text>
            </g>
            {/* C 组 */}
            <g>
              <rect x="300" y="40" width="120" height="180" rx="10" fill="#e8f2f8" stroke="#4d7ea8" strokeWidth="2.4" />
              <text x="360" y="62" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">C · 去掉叶片</text>
              <path d="M360 210 L360 110" stroke="#6a8a3a" strokeWidth="6" strokeLinecap="round" />
              {[0, 1, 2].map((i) => (
                <path key={i} d={`M${348 + i * 10} ${140 + i * 10} q 10 -6 20 0`} fill="none" stroke="#8a9a9f" strokeWidth="2" />
              ))}
              <text x="360" y="238" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">水珠量 {waterC.toFixed(0)}</text>
            </g>
            {/* 阳光 */}
            <g style={{ opacity: stage > 0 ? 0.8 : 0.3 }}>
              <circle cx="220" cy="22" r="10" fill="#f4d06a" stroke="#b5953a" strokeWidth="2" />
              {[0, 1, 2, 3].map((i) => {
                const ang = (-90 + i * 90) * (Math.PI / 180);
                return (
                  <line key={i} x1={220 + Math.cos(ang) * 14} y1={22 + Math.sin(ang) * 14} x2={220 + Math.cos(ang) * 20} y2={22 + Math.sin(ang) * 20} stroke="#f4d06a" strokeWidth="2.4" strokeLinecap="round" />
                );
              })}
              <text x="220" y="12" textAnchor="middle" fontSize="9" fill="#8a671b" fontWeight="700">☀ 阳光</text>
            </g>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
