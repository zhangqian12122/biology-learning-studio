'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（植物体细胞杂交）',
    lines: [
      <>植物细胞外面包着坚硬的<span className="font-semibold">细胞壁</span>，先要用纤维素酶和果胶酶把它去掉，得到<span className="font-semibold">原生质体</span>，细胞才能融合。</>,
      <>用 PEG（聚乙二醇）、电激等方法诱导两种来源不同的原生质体融合：先<span className="font-semibold">细胞膜融合</span>，再核膜融合形成杂种细胞核。</>,
      <>杂种细胞<span className="font-semibold">再生出新的细胞壁</span>是融合成功的标志，之后经植物组织培养（脱分化→愈伤组织→再分化）长成完整杂种植株。</>,
    ],
  },
  {
    title: '流程步骤',
    lines: [
      <>① 去壁：番茄果肉细胞 + 马铃薯块茎细胞分别用酶解法除去细胞壁。</>,
      <>② 诱导融合：混合原生质体，加 PEG 诱导；融合体系中同样会出现未融合、自体融合、杂种融合多种情况，需要筛选。</>,
      <>③ 再生壁与分裂：杂种细胞重建细胞壁，恢复分裂能力。</>,
      <>④ 组织培养：杂种细胞经脱分化、再分化发育为"番茄-马铃薯"杂种植株。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>体细胞杂交<span className="font-semibold">打破了生殖隔离</span>——不需要有性生殖就能让不同物种的遗传物质组合在一起（可跨属、跨科）。</>,
      <>与动物细胞融合相比，植物融合<span className="font-semibold">多了去壁和再生壁</span>两步，之后都要靠组织培养把细胞培养成植株。</>,
      <>杂种植株含两个亲本的遗传物质，但性状不一定同时表现两种亲本——"番茄-马铃薯"在地面结番茄、地下结马铃薯还只是设想，实际杂种植株性状表现复杂。</>,
    ],
  },
];

const STAGES = 3;

export function ProtoplastFusionLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '两种"亲本"就位：红色圆的是番茄果肉细胞，黄色方块形的是马铃薯块茎细胞。加入纤维素酶和果胶酶——把细胞壁完全去掉，得到两个裸露的原生质体。没有细胞壁，细胞才可能彼此靠近融合。';
    if (stage === 1)
      return '加入 PEG 诱导融合：两个原生质体的细胞膜先融合，细胞质连通，随后两个细胞核融合为一个杂种核。注意：培养体系里还有未融合的细胞和"自体融合"细胞，都需要后续筛选。';
    if (stage === 2)
      return '杂种原生质体表面重新长出了薄薄的细胞壁——这是融合成功的标志！有了壁，细胞恢复分裂能力，可以开始细胞分裂形成细胞团。';
    return '把杂种细胞进行组织培养：脱分化形成愈伤组织，再分化出芽和根，长成完整杂种植株。它同时含有番茄和马铃薯的遗传物质——体细胞杂交打破生殖隔离，让远缘杂交成为可能。';
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
              🧪 推进流程（{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新取材
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              关键三步：<span className="font-semibold">去壁 → 融合 → 再生壁</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">再生细胞壁 = 融合成功的标志</span>
            </div>
          </>
        }
      >
        <SceneBox label='植物体细胞杂交：番茄 × 马铃薯（"宇宙梦想"实验）' heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 阶段 0：去壁 */}
            {stage === 0 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">① 酶解去壁：纤维素酶 + 果胶酶</text>
                {/* 番茄细胞（有壁→无壁） */}
                <rect x="66" y="52" width="96" height="72" rx="10" fill="#e0a0a0" stroke="#a54838" strokeWidth="2.6" />
                <rect x="74" y="60" width="80" height="56" rx="8" fill="#d86a6a" stroke="#a54838" strokeWidth="1.4" />
                <circle cx="114" cy="88" r="11" fill="#8a3a5a" stroke="#6a2a4a" strokeWidth="1.6" />
                <text x="114" y="146" textAnchor="middle" fontSize="10.5" fill="#8a3a2a" fontWeight="600">番茄细胞（红）</text>
                <path d="M162 108 h 30 m 0 0 l -6 -4 m 6 4 l -6 4" fill="none" stroke="#5a7a8a" strokeWidth="1.8" />
                <circle cx="130" cy="196" r="34" fill="#d86a6a" stroke="#8a3a2a" strokeWidth="2.2" strokeDasharray="0" />
                <circle cx="130" cy="196" r="9" fill="#8a3a5a" stroke="#6a2a4a" strokeWidth="1.4" />
                <text x="130" y="246" textAnchor="middle" fontSize="10.5" fill="#8a3a2a" fontWeight="600">原生质体（无壁）</text>
                {/* 马铃薯细胞 */}
                <rect x="278" y="52" width="96" height="72" rx="10" fill="#e8d8a0" stroke="#8a7a2a" strokeWidth="2.6" />
                <rect x="286" y="60" width="80" height="56" rx="8" fill="#e0c860" stroke="#8a7a2a" strokeWidth="1.4" />
                <circle cx="326" cy="88" r="11" fill="#a58a2a" stroke="#7a652a" strokeWidth="1.6" />
                <text x="326" y="146" textAnchor="middle" fontSize="10.5" fill="#8a7a2a" fontWeight="600">马铃薯细胞（黄）</text>
                <circle cx="330" cy="196" r="34" fill="#e0c860" stroke="#8a7a2a" strokeWidth="2.2" />
                <circle cx="330" cy="196" r="9" fill="#a58a2a" stroke="#7a652a" strokeWidth="1.4" />
                <text x="330" y="246" textAnchor="middle" fontSize="10.5" fill="#8a7a2a" fontWeight="600">原生质体（无壁）</text>
                {/* 酶 */}
                <rect x="186" y="182" width="70" height="26" rx="13" fill="#fdf1cf" stroke="#8a671b" strokeWidth="1.8" />
                <text x="221" y="200" textAnchor="middle" fontSize="9.5" fill="#8a671b" fontWeight="700">酶解中</text>
              </g>
            ) : null}
            {/* 阶段 1：诱导融合 */}
            {stage === 1 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">② PEG 诱导：膜融合 → 核融合</text>
                <rect x="160" y="56" width="120" height="28" rx="14" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2" />
                <text x="220" y="75" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">+ PEG 诱导融合</text>
                {/* 正在融合的两个原生质体 */}
                <circle cx="190" cy="130" r="38" fill="#d86a6a" stroke="#8a3a2a" strokeWidth="2.2" />
                <circle cx="250" cy="130" r="38" fill="#e0c860" stroke="#8a7a2a" strokeWidth="2.2" />
                <circle cx="204" cy="130" r="9" fill="#8a3a5a" />
                <circle cx="236" cy="130" r="9" fill="#a58a2a" />
                <text x="220" y="196" textAnchor="middle" fontSize="10.5" fill="#4b6c73">细胞膜融合 → 细胞质混合 → 细胞核融合</text>
                {/* 杂种核 */}
                <circle cx="220" cy="222" r="20" fill="#c99ac9" stroke="#7a4a7a" strokeWidth="2.4" />
                <circle cx="214" cy="222" r="4" fill="#8a3a5a" />
                <circle cx="226" cy="222" r="4" fill="#a58a2a" />
                <text x="286" y="228" fontSize="10.5" fill="#7a4a7a" fontWeight="700">杂种细胞核</text>
              </g>
            ) : null}
            {/* 阶段 2：再生壁 */}
            {stage === 2 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">③ 杂种细胞再生细胞壁（成功标志）</text>
                <circle cx="180" cy="130" r="40" fill="#c99ac9" stroke="#7a4a7a" strokeWidth="2.2" />
                <circle cx="180" cy="130" r="47" fill="none" stroke="#3f7f3a" strokeWidth="4" strokeDasharray="8 5" />
                <text x="180" y="136" textAnchor="middle" fontSize="9.5" fill="#4a2a4a" fontWeight="700">杂种核</text>
                <text x="96" y="200" fontSize="11" fill="#3f7f3a" fontWeight="700">新生细胞壁（绿色虚线）</text>
                <line x1="150" y1="196" x2="146" y2="168" stroke="#3f7f3a" strokeWidth="1.3" strokeDasharray="3 3" />
                {/* 分裂 */}
                <path d="M270 108 h 44 m 0 0 l -6 -4 m 6 4 l -6 4" fill="none" stroke="#5a7a8a" strokeWidth="1.8" />
                <circle cx="352" cy="130" r="19" fill="#c99ac9" stroke="#7a4a7a" strokeWidth="2" />
                <circle cx="386" cy="130" r="19" fill="#c99ac9" stroke="#7a4a7a" strokeWidth="2" />
                <text x="352" y="176" textAnchor="middle" fontSize="10.5" fill="#4b6c73" fontWeight="600">恢复分裂</text>
                <text x="220" y="228" textAnchor="middle" fontSize="10.5" fill="#799398">筛选：只有真正"杂种"的细胞才能继续发育</text>
              </g>
            ) : null}
            {/* 阶段 3：组织培养成株 */}
            {stage === 3 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">④ 组织培养：杂种细胞 → 杂种植株</text>
                <circle cx="80" cy="120" r="14" fill="#c99ac9" stroke="#7a4a7a" strokeWidth="2" />
                <text x="80" y="152" textAnchor="middle" fontSize="9.5" fill="#59767c">杂种细胞</text>
                <path d="M104 118 h 24" stroke="#5a7a8a" strokeWidth="1.6" />
                <ellipse cx="160" cy="120" rx="26" ry="15" fill="#e8dcc8" stroke="#a5763a" strokeWidth="2" />
                <text x="160" y="152" textAnchor="middle" fontSize="9.5" fill="#8a671b">愈伤组织</text>
                <path d="M196 118 h 24" stroke="#5a7a8a" strokeWidth="1.6" />
                {/* 分化苗 */}
                <path d="M248 138 v -44" stroke="#3f7f3a" strokeWidth="3" />
                <path d="M248 112 q -16 -6 -22 -18 m 22 8 q 16 -6 22 -18" fill="none" stroke="#3f7f3a" strokeWidth="2.6" />
                <text x="248" y="156" textAnchor="middle" fontSize="9.5" fill="#3f7f3a">再分化苗</text>
                <path d="M286 118 h 24" stroke="#5a7a8a" strokeWidth="1.6" />
                {/* 杂种植株（上番茄下马铃薯） */}
                <path d="M376 156 v -52" stroke="#3f7f3a" strokeWidth="3.4" />
                <path d="M376 128 q -20 -8 -28 -24 m 28 14 q 20 -8 28 -24" fill="none" stroke="#3f7f3a" strokeWidth="3" />
                <circle cx="376" cy="96" r="12" fill="#d86a6a" stroke="#8a3a2a" strokeWidth="2" />
                <text x="376" y="100" textAnchor="middle" fontSize="8.5" fill="#ffffff" fontWeight="700">果</text>
                <ellipse cx="376" cy="162" rx="16" ry="9" fill="#e0c860" stroke="#8a7a2a" strokeWidth="2" />
                <text x="376" y="190" textAnchor="middle" fontSize="9.5" fill="#8a7a2a">块茎</text>
                <text x="376" y="212" textAnchor="middle" fontSize="9.5" fill="#8a3a2a" fontWeight="700">"番茄-马铃薯"？</text>
                <path d="M62 232 h 320" stroke="#dceaea" strokeWidth="1.5" />
                <text x="222" y="248" textAnchor="middle" fontSize="10.5" fill="#799398">意义：打破生殖隔离——远缘物种的遗传物质可组合到一起</text>
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
