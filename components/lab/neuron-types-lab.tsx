'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '神经元的种类',
    lines: [
      <><span className="font-semibold">感觉神经元（传入）</span>：树突末梢分布在感受器中，将兴奋从感受器传入神经中枢。多为假单极神经元。</>,
      <><span className="font-semibold">中间神经元（联络）</span>：位于脑和脊髓内，连接感觉神经元和运动神经元，负责信息的整合与分析——是<span className="font-semibold">最多样化</span>的神经元。</>,
      <><span className="font-semibold">运动神经元（传出）</span>：将兴奋从中枢传向效应器（肌肉或腺体），控制身体的反应。</>,
    ],
  },
  {
    title: '反射弧的连接',
    lines: [
      <>感觉神经元 → 中间神经元 → 运动神经元：这条通路构成了<span className="font-semibold">反射弧</span>的神经部分。</>,
      <>反射弧五环节：<span className="font-semibold">感受器 → 传入神经 → 神经中枢 → 传出神经 → 效应器</span>。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>兴奋在神经元之间的传递是<span className="font-semibold">单向</span>的（突触的递质只能从前膜→后膜）。</>,
      <>脊髓中的中间神经元可以让<span className="font-semibold">不需要大脑参与</span>的反射（如膝跳反射）快速完成。</>,
    ],
  },
];

type NeuronType = 'sensory' | 'inter' | 'motor';

export function NeuronTypesLab() {
  const [selected, setSelected] = useState<NeuronType>('sensory');

  const types = [
    {
      id: 'sensory' as NeuronType,
      name: '感觉神经元（传入神经元）',
      color: '#4a9a6a',
      desc: '树突末梢分布在皮肤、肌肉等处的感受器中，将兴奋从感受器传入脊髓或脑。',
      detail: '多为假单极神经元：胞体发出一条突起后分为两支，一支通向外周（感受器），一支通向中枢。',
    },
    {
      id: 'inter' as NeuronType,
      name: '中间神经元（联络神经元）',
      color: '#c9a05a',
      desc: '位于脑和脊髓内，连接感觉神经元和运动神经元，负责整合信息、做出判断。',
      detail: '形态多样、数量最多（中枢神经系统中 99% 以上的神经元是中间神经元），构成复杂的神经网络。',
    },
    {
      id: 'motor' as NeuronType,
      name: '运动神经元（传出神经元）',
      color: '#b0483a',
      desc: '将兴奋从神经中枢传向效应器（骨骼肌、平滑肌、腺体），控制身体的反应。',
      detail: '胞体位于中枢（脊髓前角或脑干），轴突延伸到效应器——如支配肌肉收缩。',
    },
  ];
  const current = types.find((t) => t.id === selected)!;

  const observation = (() => {
    if (selected === 'sensory') return '感觉神经元是反射弧的"入口"：它将感受器接收到的刺激转化为神经冲动，传入脊髓或脑。';
    if (selected === 'inter') return '中间神经元负责信息整合：在脊髓中它们可以连接感觉和运动神经元完成基本反射，也可以将信号上传到大脑。';
    return '运动神经元是反射弧的"出口"：它将指令传递给效应器（肌肉收缩或腺体分泌）。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <p className="text-sm font-medium text-[#37585f]">选择神经元类型</p>
            <div className="grid gap-1.5">
              {types.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelected(t.id)}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                    selected === t.id
                      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              功能：<span className="font-bold text-[#13333a]">{current.desc}</span>
            </div>
          </>
        }
      >
        <SceneBox label={`神经元的种类 · ${current.name}`} heightClass="h-[300px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 感觉神经元 */}
            <g style={{ opacity: selected === 'sensory' ? 1 : 0.2 }}>
              <circle cx="80" cy="80" r="20" fill="#c8e2ba" stroke="#4a9a6a" strokeWidth="2.4" />
              <circle cx="74" cy="74" r="5" fill="#3f7f3a" />
              <path d="M100 72 L 150 72" stroke="#4a9a6a" strokeWidth="3" />
              <path d="M150 72 Q 170 72 180 90" fill="none" stroke="#4a9a6a" strokeWidth="3" />
              <text x="80" y="60" textAnchor="middle" fontSize="10" fill="#2f7a4d" fontWeight="700">胞体（假单极）</text>
              <text x="70" y="120" textAnchor="middle" fontSize="9.5" fill="#59767c">→ 中枢</text>
            </g>
            {/* 中间神经元 */}
            <g style={{ opacity: selected === 'inter' ? 1 : 0.2 }}>
              <circle cx="180" cy="170" r="22" fill="#f4d06a" stroke="#c9a05a" strokeWidth="2.4" />
              <text x="180" y="175" textAnchor="middle" fontSize="9" fill="#8a671b" fontWeight="800">联络</text>
              <path d="M202 170 L 240 170" stroke="#c9a05a" strokeWidth="3" />
              <text x="180" y="210" textAnchor="middle" fontSize="10" fill="#c9a05a" fontWeight="600">中枢内</text>
            </g>
            {/* 运动神经元 */}
            <g style={{ opacity: selected === 'motor' ? 1 : 0.2 }}>
              <circle cx="290" cy="80" r="20" fill="#c8d8e8" stroke="#3d6a94" strokeWidth="2.4" />
              <text x="290" y="86" textAnchor="middle" fontSize="9.5" fill="#1e4a68" fontWeight="800">运动</text>
              <path d="M310 90 L 360 90 L 360 130" fill="none" stroke="#3d6a94" strokeWidth="3" />
              <path d="M360 130 l-6 8 m6 -8 l6 6" stroke="#3d6a94" strokeWidth="2.4" strokeLinecap="round" />
              <text x="390" y="140" fontSize="9.5" fill="#59767c">→ 肌肉</text>
            </g>
            {/* 连接箭头（始终显示） */}
            <path d="M104 170 Q 130 200 158 170" fill="none" stroke="#4a9a6a" strokeWidth="2" strokeDasharray="5 3" />
            <path d="M204 170 Q 240 200 268 170" fill="none" stroke="#c9a05a" strokeWidth="2" strokeDasharray="5 3" />
            <path d="M290 170 Q 320 200 348 170" fill="none" stroke="#3d6a94" strokeWidth="2" strokeDasharray="5 3" />
            <text x="36" y="200" fontSize="9.5" fill="#4a9a6a" fontWeight="600">感受器</text>
            <text x="408" y="200" fontSize="9.5" fill="#b0483a" fontWeight="600">效应器</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
