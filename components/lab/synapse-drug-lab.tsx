'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（突触的化学传递）',
    lines: [
      <>神经元之间并不直接相连，中间隔着约 20 纳米的<span className="font-semibold">突触间隙</span>：兴奋到达轴突末梢时，突触小泡释放<span className="font-semibold">神经递质</span>（如乙酰胆碱），经扩散与突触后膜上的<span className="font-semibold">特异性受体</span>结合，引发下一个神经元兴奋或抑制。</>
      ,
      <>传递特点：<span className="font-semibold">单向传递</span>（递质只存在于前膜）、<span className="font-semibold">突触延搁</span>（比神经纤维传导慢）。</>
      ,
      <>递质发挥作用后会被<span className="font-semibold">酶分解</span>（如乙酰胆碱酯酶）或<span className="font-semibold">回收</span>——保证信号"发一次是一次"。</>
      ,
    ],
  },
  {
    title: '药物的作用靶点',
    lines: [
      <>① 占据受体但不激活：如<span className="font-semibold">箭毒</span>阻断乙酰胆碱受体——肌肉松弛（麻醉辅助）。</>
      ,
      <>② 抑制分解酶：如<span className="font-semibold">有机磷农药</span>抑制乙酰胆碱酯酶——递质堆积导致持续痉挛（中毒）。</>
      ,
      <>③ 阻止回收：如<span className="font-semibold">SSRI 类抗抑郁药</span>阻断 5-羟色胺回收——延长递质作用（治疗抑郁）。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>兴奋在突触间<span className="font-semibold">只能单向传递</span>（前膜→间隙→后膜），而在神经纤维上可双向传导——高频考点。</>
      ,
      <>毒品（如可卡因·吗啡）的成瘾机制也是<span className="font-semibold">干扰突触递质</span>（多巴胺系统）——"珍爱生命远离毒品"的生物学依据。</>
      ,
      <>联系结构：突触小泡（前膜）、突触间隙、受体（后膜）——可与"突触"图鉴标本对照记忆。</>
      ,
    ],
  },
];

type Drug = 'none' | 'curare' | 'organophosphate' | 'ssri';

const DRUGS: Record<Drug, { label: string; note: string }> = {
  none: { label: '不施加药物（正常传递）', note: '递质释放→结合→酶解，干净利落' },
  curare: { label: '箭毒（阻断受体）', note: '递质再多是"打空枪"——肌肉松弛' },
  organophosphate: { label: '有机磷（抑制分解酶）', note: '递质持续作用——痉挛中毒' },
  ssri: { label: 'SSRI（阻止回收）', note: '5-羟色胺作用延长——抗抑郁' },
};

export function SynapseDrugLab() {
  const [drug, setDrug] = useState<Drug>('none');
  const [fired, setFired] = useState(false);

  const observation = (() => {
    if (!fired)
      return '突触剧场就位：突触前膜（上）的囊泡装满神经递质，后膜（下）排列着特异性受体。点击"施加动作电位"观察正常传递过程，再选择不同药物看干扰效果。';
    if (drug === 'none')
      return '正常传递：动作电位到达 → Ca²⁺ 内流 → 囊泡与前膜融合释放递质 → 递质与后膜受体结合 → 后膜电位变化 → 递质随即被酶分解。信号"发一次是一次"，精准高效。';
    if (drug === 'curare')
      return '箭毒抢先占据了后膜受体——递质被释放了却"无人接收"，后膜不产生电位变化。肌肉因此松弛：外科用它辅助麻醉，南美原住民把它涂在吹箭上（猎物呼吸肌麻痹）。';
    if (drug === 'organophosphate')
      return '有机磷抑制了分解酶——递质无法被清除，持续刺激后膜：肌肉持续痉挛、流涎、呼吸困难。这就是有机磷中毒的机理（急救需用阿托品等对抗）。';
    return 'SSRI 阻断了 5-羟色胺的"回收站"——突触间隙中递质浓度升高、作用时间延长，情绪调节信号增强。这解释了抗抑郁药为何"起效需要数周"（受体需要时间重新适应）。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">施加药物干扰（可叠加实验）</p>
              <div className="grid gap-1.5">
                {(Object.keys(DRUGS) as Drug[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setDrug(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      drug === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {DRUGS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {DRUGS[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFired(true)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              ⚡ 施加动作电位
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              传递三步：<span className="font-semibold">释放 → 结合 → 清除</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">单向传递 · 突触延搁</span>
            </div>
          </>
        }
      >
        <SceneBox label={`突触传递模拟（当前：${DRUGS[drug].label}）`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 前膜 */}
            <rect x="40" y="40" width="360" height="56" rx="10" fill="#dceaea" stroke="#5a7a8a" strokeWidth="2.6" />
            <text x="56" y="62" fontSize="10.5" fill="#37585f" fontWeight="700">突触前膜（轴突末梢）</text>
            {/* 囊泡 */}
            {[0, 1, 2].map((i) => (
              <g key={`v${i}`}>
                <circle cx={90 + i * 60} cy={68} r="13" fill="#b8d8b0" stroke="#3f7f3a" strokeWidth="1.8" />
                {[0, 1, 2].map((j) => (
                  <circle key={`d${i}${j}`} cx={84 + i * 60 + j * 7} cy={65 + j * 4} r="2" fill="#3f7f3a" />
                ))}
              </g>
            ))}
            {/* 释放动画（fired 且非阻断） */}
            {fired ? (
              <g>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <circle key={`r${i}`} cx={110 + (i % 3) * 40} cy={118 + Math.floor(i / 3) * 22} r="4" fill={drug === 'none' || drug === 'ssri' ? '#3f7f3a' : drug === 'curare' ? '#a5b0b8' : '#b0483a'} />
                ))}
              </g>
            ) : null}
            {/* 间隙 */}
            <rect x="40" y="108" width="360" height="44" fill="none" stroke="#8a671b" strokeWidth="1.6" strokeDasharray="6 4" />
            <text x="220" y="134" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="600">突触间隙（约 20 nm）</text>
            {/* 受体 */}
            <rect x="40" y="158" width="360" height="56" rx="10" fill="#e8dce8" stroke="#7a4a8a" strokeWidth="2.6" />
            <text x="56" y="180" fontSize="10.5" fill="#5a3a6a" fontWeight="700">突触后膜</text>
            {[0, 1, 2, 3, 4].map((i) => (
              <g key={`rc${i}`}>
                <path d={`M${96 + i * 58} 186 q 0 -16 12 -16 q 12 0 12 16`} fill={drug === 'curare' ? '#c9a05a' : '#c99ad8'} stroke={drug === 'curare' ? '#8a671b' : '#5a3a7a'} strokeWidth="2" />
                {fired && drug !== 'curare' ? <circle cx={108 + i * 58} cy={166} r="4" fill="#3f7f3a" /> : null}
              </g>
            ))}
            {/* 清除路径 */}
            {fired && (drug === 'none' || drug === 'ssri') ? (
              <g>
                <path d="M352 186 q 30 -6 40 -30" fill="none" stroke="#8a671b" strokeWidth="2" strokeDasharray="4 3" />
                <text x="352" y="144" fontSize="9.5" fill="#8a671b" fontWeight="600">{drug === 'ssri' ? '回收被阻止' : '酶解回收'}</text>
              </g>
            ) : null}
            {/* 后膜结果 */}
            {fired ? (
              <text x="220" y="232" textAnchor="middle" fontSize="11" fontWeight="700" fill={drug === 'curare' ? '#a5533c' : drug === 'organophosphate' ? '#a53030' : '#2f6f2a'}>
                {drug === 'curare' ? '后膜无反应 → 肌肉松弛' : drug === 'organophosphate' ? '递质堆积 → 持续痉挛（中毒）' : drug === 'ssri' ? '后膜持续激活 → 情绪信号增强' : '后膜产生新兴奋 → 传递成功'}
              </text>
            ) : (
              <text x="220" y="232" textAnchor="middle" fontSize="10.5" fill="#9ab0b5">点击"施加动作电位"开始传递</text>
            )}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
