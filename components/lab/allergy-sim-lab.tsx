'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（过敏反应）',
    lines: [
      <>过敏反应：已产生免疫的机体，在<span className="font-semibold">再次接触相同过敏原</span>时发生的组织损伤或功能紊乱——本质是免疫"反应过度"。</>
      ,
      <>机制：首次接触过敏原（花粉、尘螨、虾蟹等）→ 浆细胞产生 <span className="font-semibold">IgE 抗体</span> → IgE 吸附在肥大细胞/嗜碱性粒细胞表面（致敏）→ 再次接触时过敏原桥联 IgE → 细胞释放<span className="font-semibold">组胺</span>等物质。</>
      ,
      <>组胺的作用：毛细血管扩张、通透性增加（红肿·荨麻疹）、平滑肌收缩（喷嚏·哮喘·腹痛）——症状因"作用部位"而异。</>
      ,
    ],
  },
  {
    title: '特点与预防',
    lines: [
      <>过敏反应的三个特点：<span className="font-semibold">发作迅速、反应强烈、消退较快</span>；一般不会破坏组织细胞、不引起组织严重损伤；有明显的遗传倾向和个体差异。</>
      ,
      <>预防：找出过敏原并尽量避免接触（过敏原检测）；常备抗组胺药物；严重过敏（过敏性休克）需立即注射肾上腺素。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>过敏与免疫缺陷对比：过敏是<span className="font-semibold">免疫过强</span>的"误伤"；免疫缺陷病（如艾滋病）是免疫<span className="font-semibold">不足</span>。</>
      ,
      <>过敏抗体（IgE）vs 普通体液免疫抗体（IgG）：吸附部位（肥大细胞 vs 血浆中）、作用时机（再次接触 vs 首次清除）不同。</>
      ,
      <>自身免疫病（类风湿·系统性红斑狼疮）则是免疫系统<span className="font-semibold">敌我不分</span>攻击自身——三种免疫"失调"要分清。</>
      ,
    ],
  },
];

const STAGES = 3; // 0 致敏 → 1 再次接触 → 2 症状与对策

export function AllergySimLab() {
  const [stage, setStage] = useState(0);
  const [prevent, setPrevent] = useState(false);
  const step = () => {
    if (prevent && stage === 1) return; // 采取预防则不再发作
    setStage((s) => Math.min(STAGES, s + 1));
  };
  const reset = () => {
    setStage(0);
    setPrevent(false);
  };

  const observation = (() => {
    if (stage === 0)
      return '第一次接触花粉：花粉作为过敏原进入体内，刺激 B 细胞增殖分化，浆细胞产生的 IgE 抗体不去"围剿"过敏原，反而吸附在肥大细胞表面——机体进入"致敏"状态，此刻没有任何症状。';
    if (stage === 1 && prevent)
      return '已采取预防措施：戴口罩避开花粉高峰、提前服用抗组胺药——过敏原无法桥联肥大细胞上的 IgE，组胺不释放，症状被扼杀在摇篮里。对付过敏最有效的办法就是"远离过敏原"。';
    if (stage === 1)
      return '半年后的春天：相同花粉再次进入体内，直接与肥大细胞表面的两个 IgE"桥联"——触发细胞脱颗粒，大量组胺在几秒内释放！点击推进看症状。';
    return '症状显现：鼻黏膜水肿→喷嚏流涕；皮肤毛细血管扩张→荨麻疹红肿；呼吸道平滑肌收缩→哮喘风险。服用抗组胺药可阻断组胺受体缓解症状。记住：过敏=免疫"过度"，与免疫缺陷（过弱）、自身免疫病（敌我不分）并列三大免疫失调。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= STAGES || (prevent && stage === 1)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {stage === 0 ? '🌼 第一次接触花粉' : stage === 1 ? '🌼 再次接触相同花粉' : '🤧 观察症状与对策'}
              （{stage}/{STAGES}）
            </button>
            <button
              type="button"
              onClick={() => setPrevent(true)}
              className="min-h-10 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              😷 采取预防措施（口罩 + 抗组胺药）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置免疫状态
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              关键物质：<span className="font-semibold">IgE 抗体 → 肥大细胞 → 组胺</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">过敏 = 免疫"过度"，预防首选远离过敏原</span>
            </div>
          </>
        }
      >
        <SceneBox label="过敏反应机制（步进演示）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 花粉 */}
            <g>
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={54 + i * 22} cy={70 + (i % 2) * 16} r="8" fill="#e8c86a" stroke="#a58a2a" strokeWidth="1.8" />
              ))}
              <text x="60" y="122" fontSize="10.5" fill="#8a671b" fontWeight="700">花粉（过敏原）</text>
            </g>
            {/* 肥大细胞 */}
            <g>
              <circle cx="220" cy="150" r="46" fill="#f0c9d8" stroke="#a5486a" strokeWidth="2.8" />
              <text x="220" y="132" textAnchor="middle" fontSize="10" fill="#8a3a5a" fontWeight="700">肥大细胞</text>
              {/* 表面 IgE */}
              {[0, 1, 2, 3].map((i) => (
                <path key={i} d={`M${202 + i * 12} 116 q ${i % 2 === 0 ? -6 : 6} -12 0 -18`} stroke="#4d7ea8" strokeWidth="2.4" fill="none" strokeLinecap="round" />
              ))}
              {stage >= 1 ? (
                <g>
                  <path d="M202 100 q 18 -12 36 2" fill="none" stroke="#b0483a" strokeWidth="2.6" />
                  <circle cx="202" cy="100" r="7" fill="#e8c86a" stroke="#a58a2a" strokeWidth="1.8" />
                  <text x="300" y="96" fontSize="10" fill="#b0483a" fontWeight="700">IgE 桥联 → 释放组胺</text>
                </g>
              ) : (
                <text x="300" y="96" fontSize="10" fill="#4d7ea8" fontWeight="700">IgE 吸附在表面（致敏）</text>
              )}
              {/* 组胺颗粒 */}
              {stage >= 2 ? (
                <g>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <circle key={i} cx={254 + i * 16} cy={160 + (i % 2) * 14} r="4.5" fill="#8a671b" opacity="0.9" />
                  ))}
                  <text x="336" y="182" fontSize="10" fill="#8a671b" fontWeight="700">组胺释放</text>
                </g>
              ) : null}
            </g>
            {/* 症状卡 */}
            {stage >= 2 ? (
              <g>
                <rect x="40" y="206" width="130" height="40" rx="8" fill="#f4e0e0" stroke="#a54838" strokeWidth="2" />
                <text x="105" y="222" textAnchor="middle" fontSize="9.5" fill="#8a3a2a" fontWeight="700">皮肤：荨麻疹</text>
                <text x="105" y="238" textAnchor="middle" fontSize="9" fill="#a5533c">血管扩张·通透性↑</text>
                <rect x="182" y="206" width="130" height="40" rx="8" fill="#f4e0e0" stroke="#a54838" strokeWidth="2" />
                <text x="247" y="222" textAnchor="middle" fontSize="9.5" fill="#8a3a2a" fontWeight="700">鼻：喷嚏流涕</text>
                <text x="247" y="238" textAnchor="middle" fontSize="9" fill="#a5533c">黏膜水肿</text>
                <rect x="324" y="206" width="82" height="40" rx="8" fill="#f4e0e0" stroke="#a54838" strokeWidth="2" />
                <text x="365" y="222" textAnchor="middle" fontSize="9.5" fill="#8a3a2a" fontWeight="700">肺：哮喘</text>
                <text x="365" y="238" textAnchor="middle" fontSize="9" fill="#a5533c">平滑肌收缩</text>
              </g>
            ) : (
              <g>
                <rect x="40" y="206" width="380" height="40" rx="8" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2" />
                <text x="230" y="222" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">首次接触：无症状 · 机体已"记住"过敏原</text>
                <text x="230" y="238" textAnchor="middle" fontSize="9" fill="#59767c">预防：远离过敏原 · 常备抗组胺药 · 严重过敏用肾上腺素</text>
              </g>
            )}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
