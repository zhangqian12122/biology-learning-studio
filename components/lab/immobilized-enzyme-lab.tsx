'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（固定化酶）',
    lines: [
      <>固定化酶：用<span className="font-semibold">物理吸附或包埋</span>等方法，把酶固定在一定的空间（颗粒、反应柱、膜）内，酶既能 catalyze 反应，又能<span className="font-semibold">与产物分离、反复使用</span>。</>
      ,
      <>工业应用典范：<span className="font-semibold">高果糖浆</span>——葡萄糖溶液流经固定化葡萄糖异构酶反应柱，一部分葡萄糖被转化为更甜的果糖，甜度接近蔗糖而成本更低。</>
      ,
      <>酶的固定化方式：酶更适于<span className="font-semibold">吸附/化学交联</span>（分子小，包埋易漏）；细胞更适于<span className="font-semibold">包埋</span>（体积大，海藻酸钠凝胶固定）。</>
      ,
    ],
  },
  {
    title: '流程步骤',
    lines: [
      <>① 制粒：酶（或细胞）用海藻酸钠包埋，滴入 CaCl₂ 溶液形成凝胶珠。</>
      ,
      <>② 装柱：凝胶珠装入反应柱，形成"酶柱"。</>
      ,
      <>③ 连续进料：底物溶液（葡萄糖浆）从柱顶缓缓流下。</>
      ,
      <>④ 收集产物：柱底流出的已是果葡糖浆——酶留在柱内，产品纯净免分离。</>
      ,
      <>⑤ 重复使用：同一根柱可连续运转数月，摊薄酶成本。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>对比游离酶：游离酶随产物排出、<span className="font-semibold">无法回收、混入产品难分离</span>，一次性使用成本高。</>
      ,
      <>固定化的代价：<span className="font-semibold">酶活可能下降</span>（包埋造成空间阻碍，底物接近酶变难）——需权衡"可反复使用"与"活性损失"。</>
      ,
      <>固定化细胞与固定化酶比较：细胞省去提纯步骤、酶系统完整，但产物中可能混有<span className="font-semibold">其他酶</span>的副反应产物。</>
      ,
    ],
  },
];

const STAGES = 4;

export function ImmobilizedEnzymeLab() {
  const [stage, setStage] = useState(0);
  const [batches, setBatches] = useState(1);
  const step = () => {
    if (stage < STAGES) setStage((s) => s + 1);
    else setBatches((b) => b + 1);
  };
  const reset = () => {
    setStage(0);
    setBatches(1);
  };

  const observation = (() => {
    if (stage === 0 && batches === 1)
      return '高果糖浆工厂开工：把葡萄糖异构酶包埋进海藻酸钠凝胶珠（滴入 CaCl₂ 溶液成型），装入反应柱。对比另一种方案——直接把游离酶倒进糖浆搅拌：反应完酶就混进产品里，既难分离又只能用一次。';
    if (stage < STAGES)
      return ['葡萄糖浆从柱顶缓缓流下，经过凝胶珠之间的缝隙——每一颗珠子都是一座"微型加工厂"。', '酶催化部分葡萄糖异构为果糖：珠子里的酶一个都没跑出来，产品从柱底纯净流出——免去了昂贵的酶分离工序。', '反应柱连续运转：进料不停、出料不断，酶的"工资"一次付清、长期上岗。'][stage - 1] || '';
    return `同一根酶柱已连续完成 ${batches} 批生产。游离酶方案每批都要重新加酶再分离，成本随批次线性增加；固定化酶只在开头多一道包埋工序，批次越多越划算——这就是工业酶工程的经济账。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              {stage < STAGES ? '⏭ 推进工序' : `📦 再生产一批（第 ${batches + 1} 批）`}
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新装柱
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              关键优势：<span className="font-semibold">酶与产物分离 · 反复使用</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">连续生产 = 工业酶工程的核心</span>
            </div>
          </>
        }
      >
        <SceneBox label="固定化葡萄糖异构酶反应柱（高果糖浆生产）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 进料 */}
            <rect x="60" y="34" width="90" height="30" rx="6" fill="#f4d06a" stroke="#8a671b" strokeWidth="2" />
            <text x="105" y="54" textAnchor="middle" fontSize="9.5" fill="#8a671b" fontWeight="700">葡萄糖浆进料</text>
            <path d="M156 49 h 30 m 0 0 l -7 -5 m 7 5 l -7 5" fill="none" stroke="#5a7a8a" strokeWidth="1.8" />
            {/* 反应柱 */}
            <rect x="192" y="28" width="70" height="190" rx="12" fill="#eef4f6" stroke="#5a7a8a" strokeWidth="2.6" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <circle key={i} cx={212 + (i % 2) * 30} cy={52 + i * 20} r="9" fill="#e8a03a" stroke="#8a671b" strokeWidth="1.6" />
            ))}
            <text x="286" y="70" fontSize="10" fill="#8a671b" fontWeight="700">凝胶珠：</text>
            <text x="286" y="88" fontSize="9.5" fill="#a5761d">海藻酸钠包埋</text>
            <text x="286" y="106" fontSize="9.5" fill="#a5761d">葡萄糖异构酶</text>
            <text x="286" y="132" fontSize="9.5" fill="#59767c">CaCl₂ 成型</text>
            <text x="286" y="150" fontSize="9.5" fill="#59767c">酶不随液流出</text>
            {/* 出料 */}
            <path d="M227 218 v 14" stroke="#5a7a8a" strokeWidth="2" />
            <rect x="160" y="232" width="130" height="24" rx="6" fill={stage >= 3 ? '#e2f0e2' : '#f4d06a'} stroke={stage >= 3 ? '#3f7f3a' : '#8a671b'} strokeWidth="2" />
            <text x="225" y="249" textAnchor="middle" fontSize="9.5" fill={stage >= 3 ? '#2f6f2a' : '#8a671b'} fontWeight="700">
              {stage >= 3 ? '果葡糖浆（含酶已留在柱内）' : '出料口'}
            </text>
            {/* 游离酶对比 */}
            <g>
              <rect x="30" y="196" width="118" height="58" rx="8" fill="#f4e0e0" stroke="#a54838" strokeWidth="1.8" />
              <text x="89" y="216" textAnchor="middle" fontSize="9.5" fill="#8a3a2a" fontWeight="700">游离酶方案</text>
              <text x="89" y="234" textAnchor="middle" fontSize="8.5" fill="#a5533c">酶混入产品·用一次扔</text>
            </g>
            {/* 批次进度 */}
            <g>
              {[0, 1, 2, 3, 4].map((i) => (
                <rect key={i} x={320 + i * 24} y="196" width="18" height={12 + i * 12} rx="3" fill={i < batches ? '#5a8ab5' : '#e4ece4'} stroke="#8a9a9f" strokeWidth="1" />
              ))}
              <text x="368" y="246" textAnchor="middle" fontSize="9.5" fill="#37585f" fontWeight="600">已生产 {batches} 批</text>
            </g>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
