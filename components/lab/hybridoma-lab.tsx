'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（单克隆抗体的制备）',
    lines: [
      <>B 淋巴细胞能产生<span className="font-semibold">特异性抗体</span>但不能无限增殖；骨髓瘤细胞能<span className="font-semibold">无限增殖</span>但不能产生抗体。</>,
      <>用 PEG（聚乙二醇）等促融剂诱导两者融合，得到的<span className="font-semibold">杂交瘤细胞</span>兼具"产抗体 + 无限增殖"两个优点。</>,
      <>用选择培养基筛选出杂交瘤细胞，再经克隆化培养和抗体检测，选出能产生所需特异性抗体的细胞群，大规模培养后从培养液或小鼠腹水中提取单克隆抗体。</>,
    ],
  },
  {
    title: '流程变量',
    lines: [
      <>① 免疫：给小鼠注射特定抗原，从脾脏获取已免疫的 B 淋巴细胞。</>,
      <>② 融合：B 细胞 + 骨髓瘤细胞混合，加 PEG 诱导细胞膜融合。</>,
      <>③ 筛选：选择培养基上未融合的细胞全部死亡，只留杂交瘤细胞。</>,
      <>④ 检测：克隆化培养 + 专一性抗体检测，挑出阳性孔扩大培养。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>融合体系里有<span className="font-semibold">三种两两融合</span>的可能：B-B、瘤-瘤、B-瘤（我们要的），选择培养基只让 B-瘤杂交瘤存活。</>,
      <>筛选出杂交瘤细胞后还要<span className="font-semibold">多次克隆化培养和抗体检测</span>——因为 B 细胞针对的可能不是目标抗原表位。</>,
      <>单克隆抗体优点：<span className="font-semibold">特异性强、灵敏度高、可大量制备</span>；用途：诊断试剂（如验孕/新冠抗原检测）、运载药物（生物导弹）、治疗疾病。</>,
    ],
  },
];

const STAGES = 4; // 0 免疫取细胞 → 1 促融 → 2 选择筛选 → 3 检测提取

export function HybridomaLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '给小鼠注射特定抗原进行免疫。一段时间后从小鼠脾脏中获取已免疫的 B 淋巴细胞——它们能产生针对该抗原的抗体，但在体外不能长期增殖。';
    if (stage === 1)
      return '把 B 淋巴细胞与骨髓瘤细胞混合，加入 PEG 诱导融合。此时培养体系中既有未融合的两种细胞，也有 B-B、瘤-瘤、B-瘤三种融合细胞——只有最后一种是我们需要的。';
    if (stage === 2)
      return '把混合体系转移到选择培养基：未融合的 B 细胞不能无限增殖、自然死亡；未融合的骨髓瘤细胞和 B-B、瘤-瘤融合体无法在该培养基上生长；只有 B-瘤杂交瘤细胞存活并增殖。';
    return '对杂交瘤细胞进行克隆化培养和专一性抗体检测，挑出阳性细胞群扩大培养——体外培养从培养液收集，或注射到小鼠腹腔从腹水提取，即可获得大量单克隆抗体。';
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
              ⏭ 推进流程（{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {['① 免疫小鼠·取 B 细胞', '② PEG 促融', '③ 选择培养基筛选', '④ 克隆化检测·提取单抗'][Math.min(stage, 3)]}
              <br />
              <span className="font-semibold text-[#0e6f75]">杂交瘤 = B 细胞的产抗体能力 + 骨髓瘤的无限增殖</span>
            </div>
          </>
        }
      >
        <SceneBox label="单克隆抗体制备流程（步进演示）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 阶段 0：免疫小鼠，取 B 细胞 */}
            {stage === 0 ? (
              <g>
                <text x="220" y="34" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">① 抗原免疫小鼠 → 取脾脏 B 淋巴细胞</text>
                <ellipse cx="150" cy="120" rx="62" ry="46" fill="#e8e4f4" stroke="#5a4a8a" strokeWidth="2.6" />
                <circle cx="128" cy="102" r="7" fill="#5a4a8a" />
                <path d="M150 76 Q 158 60 172 66" fill="none" stroke="#5a4a8a" strokeWidth="2.4" />
                <circle cx="176" cy="62" r="4" fill="#5a4a8a" />
                <rect x="150" y="128" width="46" height="26" rx="10" fill="#c9d8e8" stroke="#5a7a8a" strokeWidth="2" />
                <text x="173" y="146" textAnchor="middle" fontSize="10" fill="#3a5a7a" fontWeight="700">脾脏</text>
                <circle cx="252" cy="104" r="9" fill="#4d7ea8" stroke="#2c5a84" strokeWidth="1.8" />
                <text x="252" y="108" textAnchor="middle" fontSize="9" fill="#ffffff" fontWeight="700">B</text>
                <circle cx="282" cy="132" r="9" fill="#4d7ea8" stroke="#2c5a84" strokeWidth="1.8" />
                <text x="282" y="136" textAnchor="middle" fontSize="9" fill="#ffffff" fontWeight="700">B</text>
                <circle cx="256" cy="152" r="9" fill="#4d7ea8" stroke="#2c5a84" strokeWidth="1.8" />
                <text x="256" y="156" textAnchor="middle" fontSize="9" fill="#ffffff" fontWeight="700">B</text>
                <text x="330" y="120" fontSize="10.5" fill="#4b6c73">注射抗原 🧪</text>
                <line x1="322" y1="112" x2="216" y2="96" stroke="#8a671b" strokeWidth="1.6" strokeDasharray="4 3" />
                <text x="220" y="212" textAnchor="middle" fontSize="10.5" fill="#799398">B 细胞：能产抗体，不能无限增殖</text>
              </g>
            ) : null}
            {/* 阶段 1：PEG 促融 */}
            {stage === 1 ? (
              <g>
                <text x="220" y="34" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">② B 细胞 + 骨髓瘤细胞 · PEG 诱导融合</text>
                {[0, 1, 2, 3].map((i) => (
                  <circle key={`b${i}`} cx={90 + i * 34} cy={96} r="11" fill="#4d7ea8" stroke="#2c5a84" strokeWidth="1.8" />
                ))}
                {[0, 1, 2, 3].map((i) => (
                  <path key={`m${i}`} d={`M300 ${78 + i * 26} l 20 6 l -8 16 l -20 -6 Z`} fill="#8a67b5" stroke="#5a3a8a" strokeWidth="1.8" />
                ))}
                <text x="110" y="66" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="600">B 细胞</text>
                <text x="330" y="66" textAnchor="middle" fontSize="10.5" fill="#5a3a8a" fontWeight="600">骨髓瘤细胞</text>
                <rect x="178" y="106" width="84" height="34" rx="17" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
                <text x="220" y="128" textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="800">+ PEG 促融</text>
                {[0, 1, 2].map((i) => (
                  <g key={i}>
                    <circle cx={140 + i * 74} cy={182} r="15" fill="#5a8ab5" stroke="#2c5a84" strokeWidth="2" />
                    <path d={`M${124 + i * 74} 186 l 12 8 l 10 -12 Z`} fill="#8a67b5" opacity="0.9" />
                  </g>
                ))}
                <text x="220" y="234" textAnchor="middle" fontSize="10.5" fill="#799398">融合体系 = 未融合细胞 + B-B + 瘤-瘤 + B-瘤（目标）</text>
              </g>
            ) : null}
            {/* 阶段 2：选择培养基筛选 */}
            {stage === 2 ? (
              <g>
                <text x="220" y="34" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">③ 选择培养基：只留"产抗体 + 无限增殖"的杂交瘤</text>
                <rect x="60" y="52" width="150" height="72" rx="10" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.2" />
                <circle cx="100" cy="82" r="12" fill="#4d7ea8" stroke="#2c5a84" strokeWidth="1.6" opacity="0.5" />
                <text x="100" y="86" textAnchor="middle" fontSize="10" fill="#a54838" fontWeight="700">✗</text>
                <path d="M148 76 l 20 6 l -8 16 l -20 -6 Z" fill="#8a67b5" stroke="#5a3a8a" strokeWidth="1.6" opacity="0.5" />
                <text x="158" y="90" textAnchor="middle" fontSize="10" fill="#a54838" fontWeight="700">✗</text>
                <text x="135" y="112" textAnchor="middle" fontSize="10" fill="#a54838" fontWeight="600">未融合的细胞死亡</text>
                <rect x="230" y="52" width="150" height="72" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
                <circle cx="282" cy="84" r="14" fill="#5a8ab5" stroke="#2c5a84" strokeWidth="2" />
                <path d="M270 88 l 11 8 l 10 -11 Z" fill="#8a67b5" opacity="0.9" />
                <text x="282" y="70" textAnchor="middle" fontSize="11" fill="#3f7f3a" fontWeight="700">✓ 存活</text>
                <text x="305" y="112" textAnchor="middle" fontSize="10" fill="#3f7f3a" fontWeight="600">杂交瘤细胞增殖</text>
                <text x="220" y="156" textAnchor="middle" fontSize="10.5" fill="#4b6c73">选择培养基原理：骨髓瘤细胞缺乏某条代谢通路（不能利用次黄嘌呤），B 细胞不能无限增殖——两条通路互补的只有 B-瘤杂交瘤。</text>
                <text x="220" y="196" textAnchor="middle" fontSize="10.5" fill="#799398">考点：B-B、瘤-瘤融合体和未融合细胞都不能在选择培养基上生长。</text>
              </g>
            ) : null}
            {/* 阶段 3：克隆化检测 + 提取 */}
            {stage === 3 ? (
              <g>
                <text x="220" y="34" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">④ 克隆化培养 + 抗体检测 → 大规模提取单抗</text>
                {/* 96孔板示意 */}
                <rect x="56" y="58" width="150" height="110" rx="8" fill="#f8f6ee" stroke="#8a9a9f" strokeWidth="2.2" />
                {[0, 1, 2, 3].map((r) =>
                  [0, 1, 2, 3, 4, 5].map((c) => {
                    const positive = (r === 1 && c === 3) || (r === 3 && c === 1);
                    return <rect key={`${r}-${c}`} x={66 + c * 23} y={68 + r * 23} width="17" height="17" rx="3" fill={positive ? '#f4d06a' : '#ffffff'} stroke={positive ? '#8a671b' : '#c9d4d4'} strokeWidth={positive ? 2.2 : 1.2} />;
                  }),
                )}
                <text x="131" y="190" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="600">阳性孔（产生专一抗体）</text>
                {/* 生物反应器 */}
                <rect x="250" y="70" width="80" height="96" rx="16" fill="#dceaea" stroke="#5a7a8a" strokeWidth="2.4" />
                <text x="290" y="112" textAnchor="middle" fontSize="10" fill="#3a5a6a" fontWeight="700">培养液</text>
                <text x="290" y="130" textAnchor="middle" fontSize="9.5" fill="#4b6c73">杂交瘤</text>
                <path d="M330 118 h 34" stroke="#8a671b" strokeWidth="2.4" />
                <rect x="366" y="100" width="40" height="38" rx="8" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
                <text x="386" y="116" textAnchor="middle" fontSize="9" fill="#8a671b" fontWeight="700">单抗</text>
                <text x="386" y="130" textAnchor="middle" fontSize="9" fill="#8a671b">💉</text>
                <text x="290" y="190" textAnchor="middle" fontSize="10" fill="#4b6c73" fontWeight="600">体内（腹水）/ 体外（培养液）</text>
                <text x="220" y="228" textAnchor="middle" fontSize="10.5" fill="#799398">单抗优点：特异性强 · 灵敏度高 · 可大量制备</text>
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
