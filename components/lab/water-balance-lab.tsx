'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（水盐平衡调节）',
    lines: [
      <>人体通过<span className="font-semibold">摄入-排出</span>来维持水和无机盐的平衡：饮水+食物+代谢水 = 肾排尿+皮肤排汗+肺呼气+大肠排粪。</>,
      <>核心激素是<span className="font-semibold">抗利尿激素（ADH）</span>：由下丘脑合成、垂体释放，作用于<span className="font-semibold">肾小管和集合管</span>，促进水分重吸收——尿量减少、尿液浓缩。</>,
      <>调节过程：细胞外液渗透压升高 → 下丘脑渗透压感受器兴奋 → 垂体释放 ADH↑ → 肾小管重吸收↑ → 尿量↓ + 大脑皮层产生<span className="font-semibold">渴觉</span> → 主动饮水。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>饮水按钮：每点一次饮 500 mL，细胞外液渗透压下降。</>,
      <>出汗按钮：每点一次出 500 mL 汗，渗透压上升。</>,
      <>观察点：ADH 浓度↑→尿量↓（保水）；ADH 浓度↓→尿量↑（排水）。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 初始平衡状态，先推进 3 步观察基线。</>,
      <>② 点「喝水 500 mL」推进——看 ADH 和尿量的变化。</>,
      <>③ 点「运动出汗 500 mL」推进——看 ADH 如何升高来"保水"。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>ADH 由<span className="font-semibold">下丘脑合成</span>、<span className="font-semibold">垂体释放</span>——注意区分"合成部位"与"释放部位"。</>,
      <>渴觉产生于<span className="font-semibold">大脑皮层</span>——下丘脑只是感受器和中枢，不含渴觉。</>,
      <>水盐平衡调节属于<span className="font-semibold">神经-体液调节</span>：既有激素（ADH），也有神经系统（大脑皮层产生渴觉）。</>,
    ],
  },
];

type Action = 'none' | 'drink' | 'sweat';

export function WaterBalanceLab() {
  const [actions, setActions] = useState<Action[]>([]);
  const [step, setStep] = useState(0);

  // 简化模型：渗透压 mOsm/kg（正常 280~310），尿量 mL/h（正常 30~60）
  let osm = 290;
  let adh = 2; // pg/mL
  let urine = 50; // mL/h
  let thirsty = false;

  const timeline: { act: Action; osm: number; adh: number; urine: number; thirsty: boolean }[] = [];
  for (let i = 0; i < actions.length; i++) {
    const a = actions[i];
    if (a === 'drink') { osm -= 12; adh = Math.max(0, adh - 1); urine += 25; }
    if (a === 'sweat') { osm += 15; adh = Math.min(8, adh + 2); urine = Math.max(10, urine - 20); thirsty = true; }
    timeline.push({ act: a, osm: Math.round(osm), adh: Math.round(adh * 10) / 10, urine: Math.round(urine), thirsty });
  }

  const drink = () => { setActions((p) => [...p, 'drink']); setStep((s) => s + 1); };
  const sweatFn = () => { setActions((p) => [...p, 'sweat']); setStep((s) => s + 1); };
  const noneFn = () => { setActions((p) => [...p, 'none']); setStep((s) => s + 1); };
  const reset = () => { setActions([]); setStep(0); };

  const latest = timeline[timeline.length - 1] ?? { act: 'none' as Action, osm: 290, adh: 2, urine: 50, thirsty: false };

  const observation = (() => {
    if (timeline.length === 0) return '初始平衡状态：渗透压 290，ADH 2 pg/mL，尿量 50 mL/h。点「喝水」或「运动出汗」看身体的调节反应。';
    if (latest.osm < 280) return `喝水后：渗透压降至 ${latest.osm}（偏低）→ ADH 降至 ${latest.adh} pg/mL → 尿量增至 ${latest.urine} mL/h——身体通过多排尿来排水。`;
    if (latest.thirsty) return `出汗后：渗透压升至 ${latest.osm}（偏高）→ ADH 升至 ${latest.adh} pg/mL → 尿量降至 ${latest.urine} mL/h——身体在"省水"。同时大脑皮层产生渴觉，促使你主动饮水。`;
    return `渗透压 ${latest.osm}，ADH ${latest.adh} pg/mL，尿量 ${latest.urine} mL/h——接近正常范围。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button type="button" onClick={drink} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]">
              🥛 喝水 500 mL
            </button>
            <button type="button" onClick={sweatFn} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#b0483a] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#9a3a2e]">
              🏃 运动出汗 500 mL
            </button>
            <button type="button" onClick={noneFn} className="min-h-10 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-semibold text-[#366169] transition-colors hover:bg-[#eef7f7]">
              ⏱ 推进（不喝水不出汗）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              渗透压：<span className={`text-base font-bold ${latest.osm > 310 ? 'text-[#b0483a]' : latest.osm < 280 ? 'text-[#4d7ea8]' : 'text-[#2f7a4d]'}`}>{latest.osm}</span> mOsm/kg
              <br />
              ADH：<span className="font-bold">{latest.adh} pg/mL</span> · 尿量：<span className="font-bold">{latest.urine} mL/h</span>
            </div>
          </>
        }
      >
        <SceneBox label="水盐平衡调节：饮水/出汗 → 渗透压 → ADH → 尿量" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 背景流程线 */}
            <path d="M40 60 L 400 60" stroke="#dceaea" strokeWidth="2" />
            {/* 下丘脑 */}
            <rect x="40" y="70" width="110" height="40" rx="10" fill="#fde8e8" stroke="#b0483a" strokeWidth="2.2" />
            <text x="95" y="95" textAnchor="middle" fontSize="10" fill="#8a2a1a" fontWeight="700">下丘脑（感受器+合成 ADH）</text>
            {/* 垂体 */}
            <rect x="170" y="70" width="80" height="40" rx="10" fill="#fdf1cf" stroke="#b5953a" strokeWidth="2.2" />
            <text x="210" y="95" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="700">垂体（释放 ADH）</text>
            {/* 肾小管 */}
            <rect x="280" y="70" width="110" height="40" rx="10" fill="#e8f0fa" stroke="#4d7ea8" strokeWidth="2.2" />
            <text x="335" y="95" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">肾小管·集合管</text>
            {/* 连接箭头 */}
            <path d="M150 90 L 168 90" stroke="#59767c" strokeWidth="2.4" markerEnd="url(#wb-arrow)" />
            <path d="M250 90 L 278 90" stroke="#59767c" strokeWidth="2.4" markerEnd="url(#wb-arrow)" />
            <text x="214" y="82" fontSize="8" fill="#59767c">ADH</text>
            {/* ADH 浓度指示 */}
            <text x="220" y="130" textAnchor="middle" fontSize="12" fill="#13333a" fontWeight="800">
              ADH：{latest.adh} pg/mL {latest.adh > 4 ? '(↑ 保水中)' : latest.adh < 1 ? '(↓ 排水中)' : '(正常)'}
            </text>
            {/* 尿量条形 */}
            <rect x="100" y="150" width={latest.urine * 3} height="24" rx="6" fill={latest.urine > 60 ? '#4d7ea8' : latest.urine < 25 ? '#c9a05a' : '#4a9a6a'} opacity="0.8" />
            <text x="100 + latest.urine * 3 + 8" y="167" fontSize="10" fill="#59767c" fontWeight="600">{latest.urine} mL/h</text>
            <text x="42" y="167" fontSize="10" fill="#59767c" fontWeight="700">尿量</text>
            {/* 渗透压 */}
            <text x="100" y="206" fontSize="11" fill="#49676d" fontWeight="700">细胞外液渗透压：{latest.osm} mOsm/kg（正常 280~310）</text>
            {/* 渴觉 */}
            {latest.thirsty ? (
              <text x="220" y="228" textAnchor="middle" fontSize="12" fill="#b0483a" fontWeight="800">⚠ 大脑皮层产生渴觉 → 主动饮水！</text>
            ) : null}
            <defs>
              <marker id="wb-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#59767c" />
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
