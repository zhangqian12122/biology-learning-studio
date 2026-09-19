'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（被子植物的双受精）',
    lines: [
      <>花粉落到柱头上萌发<span className="font-semibold">花粉管</span>，管内两个精子沿花粉管进入胚囊。</>,
      <>一个精子与<span className="font-semibold">卵细胞</span>结合形成受精卵（2n）→ 发育成<span className="font-semibold">胚</span>；另一个精子与<span className="font-semibold">两个极核</span>结合形成受精极核（3n）→ 发育成<span className="font-semibold">胚乳</span>。</>,
      <>两个精子分别与卵和极核融合——这就是被子植物特有的<span className="font-semibold">双受精</span>现象。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>逐步推进：花粉萌发 → 花粉管伸长 → 精子释放 → 双受精 → 种子与果实形成。</>,
      <>观察点：两个精子"分工"不同——一个变胚、一个变胚乳。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 点「花粉萌发」：花粉粒在柱头上长出花粉管。</>,
      <>② 依次推进三步，看花粉管如何把两个精子送进胚囊。</>,
      <>③ 思考：为什么玉米胚乳是 3n？（极核 n + 精子 n + 精子 n = 3n）</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>双受精是<span className="font-semibold">被子植物特有</span>的受精方式。</>,
      <>受精极核发育为<span className="font-semibold">胚乳</span>（3n）：玉米等单子叶植物的营养储在胚乳；菜豆等双子叶植物的胚乳营养被子叶吸收。</>,
      <>果实 = 果皮（子房壁，母本体细胞 2n）+ 种子（种皮 + 胚 2n + 胚乳 3n）——"果皮细胞全部来自母本"是高频易错点。</>,
    ],
  },
];

type Stage = 0 | 1 | 2 | 3 | 4;

export function DoubleFertilizationLab() {
  const [stage, setStage] = useState<Stage>(0);

  const step = () => setStage((s) => (Math.min(4, s + 1) as Stage));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0) return '花粉粒落在柱头上。点「花粉萌发」——花粉粒吸水膨大，长出花粉管穿入柱头。';
    if (stage === 1) return '花粉管萌发：管内的两个精子（来自一次有丝分裂，遗传信息相同）沿花粉管向下延伸，直奔胚囊。';
    if (stage === 2) return '花粉管进入胚囊，末端破裂释放两个精子——一个游向卵细胞，一个游向中央的两个极核。';
    if (stage === 3) return '双受精完成：精子① + 卵 → 受精卵（2n，发育成胚）；精子② + 2 极核 → 受精极核（3n，发育成胚乳）。两套"工程"同步启动！';
    return '子房发育成果实：子房壁→果皮（母本体细胞）、受精卵→胚（2n）、受精极核→胚乳（3n）。种子里的"三代同堂"：母本体细胞+胚+胚乳。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= 4}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {stage === 0 ? '🌸 花粉萌发' : stage === 1 ? '▶ 花粉管伸长' : stage === 2 ? '▶ 精子释放' : stage === 3 ? '▶ 双受精完成' : '子房发育成果实 ✓'}
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              阶段：<span className="font-bold text-[#13333a]">{stage === 0 ? '花粉在柱头' : stage === 1 ? '花粉管萌发' : stage === 2 ? '精子释放' : stage === 3 ? '双受精完成' : '果实发育'}</span>
              <br />
              双受精：被子植物特有
            </div>
          </>
        }
      >
        <SceneBox label="双受精过程（胚囊剖面视图）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 柱头与花柱 */}
            <g style={{ opacity: stage >= 1 ? 1 : 0.35 }}>
              <ellipse cx="60" cy="40" rx="36" ry="16" fill="#f4c76a" stroke="#c9881d" strokeWidth="2.5" />
              <text x="60" y="28" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">柱头</text>
              <path d="M60 56 Q 130 80 190 100" fill="none" stroke="#c9881d" strokeWidth="12" strokeLinecap="round" opacity="0.7" />
              <text x="86" y="96" fontSize="10" fill="#8a671b" fontWeight="600">花柱</text>
            </g>
            {/* 花粉与花粉管 */}
            {stage >= 1 ? (
              <g>
                <circle cx="60" cy="44" r="10" fill="#e8b84a" stroke="#8a671b" strokeWidth="2" />
                <text x="60" y="48" textAnchor="middle" fontSize="8" fill="#7a4a1a" fontWeight="700">花粉</text>
                <path d="M66 48 Q 110 76 168 108" fill="none" stroke="#e8a02a" strokeWidth="4" strokeLinecap="round" />
              </g>
            ) : null}
            {/* 胚囊（子房） */}
            <g style={{ opacity: stage >= 2 ? 1 : 0.35 }}>
              <ellipse cx="270" cy="150" rx="140" ry="88" fill="#f0f8ec" stroke="#6a8a4a" strokeWidth="3" />
              <text x="270" y="92" textAnchor="middle" fontSize="10.5" fill="#5a7a3a" fontWeight="700">胚囊（7 细胞 8 核）</text>
              {/* 卵细胞 */}
              <circle cx="222" cy="128" r="14" fill="#c9e2f4" stroke="#4a7a9a" strokeWidth="2.2" />
              <text x="222" y="132" textAnchor="middle" fontSize="8.5" fill="#2c5a84" fontWeight="700">卵</text>
              {/* 极核 */}
              {[0, 1].map((i) => (
                <circle key={i} cx={296 + i * 18} cy="168" r="9" fill="#f4d06a" stroke="#b5953a" strokeWidth="1.8" />
              ))}
              <text x="368" y="172" fontSize="10" fill="#8a671b" fontWeight="600">2 极核</text>
              {/* 反足细胞 */}
              <circle cx="330" cy="110" r="6" fill="#c8e2ba" stroke="#6a8a4a" strokeWidth="1.6" />
              <circle cx="344" cy="120" r="6" fill="#c8e2ba" stroke="#6a8a4a" strokeWidth="1.6" />
              <text x="348" y="134" fontSize="9" fill="#6a8a4a">反足细胞</text>
            </g>
            {/* 花粉管进入胚囊 */}
            {stage >= 2 ? (
              <path d="M168 108 Q 210 118 246 128" fill="none" stroke="#e8a02a" strokeWidth="4" strokeLinecap="round" />
            ) : null}
            {/* 两个精子 */}
            {stage >= 2 ? (
              <g>
                <circle cx={stage >= 3 ? 218 : 236} cy={stage >= 3 ? 132 : 142} r="7" fill="#c9534a" stroke="#8a2a1a" strokeWidth="1.8" />
                <text x={stage >= 3 ? 218 : 236} y={stage >= 3 ? 136 : 146} textAnchor="middle" fontSize="7.5" fill="#ffffff" fontWeight="800">精①</text>
                <circle cx={stage >= 3 ? 296 : 246} cy={stage >= 3 ? 164 : 148} r="7" fill="#c9534a" stroke="#8a2a1a" strokeWidth="1.8" />
                <text x={stage >= 3 ? 296 : 246} y={stage >= 3 ? 168 : 152} textAnchor="middle" fontSize="7.5" fill="#ffffff" fontWeight="800">精②</text>
              </g>
            ) : null}
            {/* 双受精标注 */}
            {stage >= 3 ? (
              <g>
                <path d="M232 148 Q 222 152 220 158" fill="none" stroke="#2f7a4d" strokeWidth="2" markerEnd="url(#df-arrow)" />
                <text x="176" y="158" fontSize="9.5" fill="#2f7a4d" fontWeight="700">精①+卵 = 受精卵 2n</text>
                <path d="M296 172 L 296 182" stroke="#2f7a4d" strokeWidth="2" markerEnd="url(#df-arrow)" />
                <text x="300" y="190" fontSize="9.5" fill="#2f7a4d" fontWeight="700">精②+2极核 = 受精极核 3n</text>
              </g>
            ) : null}
            {/* 果实发育标注 */}
            {stage >= 4 ? (
              <g>
                <rect x="30" y="182" width="180" height="64" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
                <text x="46" y="202" fontSize="10.5" fill="#8a671b" fontWeight="800">子房发育成果实：</text>
                <text x="46" y="220" fontSize="10" fill="#8a671b">子房壁→果皮 · 受精卵→胚</text>
                <text x="46" y="238" fontSize="10" fill="#8a671b">受精极核→胚乳 · 珠被→种皮</text>
              </g>
            ) : null}
            <defs>
              <marker id="df-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#2f7a4d" />
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
