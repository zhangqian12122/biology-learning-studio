'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（鸟类的双重呼吸）',
    lines: [
      <>鸟类飞行耗氧量巨大，普通"吸进肺、呼出来"的呼吸方式不够用。鸟类演化出独特的<span className="font-semibold">气囊系统</span>：9 个（少数 7 个）半透明气囊与肺相通，遍布内脏之间甚至伸入骨骼。</>
      ,
      <>双重呼吸：<span className="font-semibold">吸气时</span>，一部分新鲜空气进入肺进行气体交换，另一部分先储存在后气囊；<span className="font-semibold">呼气时</span>，后气囊储存的新鲜空气被"挤"入肺，再次进行气体交换。</>
      ,
      <>结果：<span className="font-semibold">吸气和呼气时肺内都在进行气体交换</span>——一口气被"利用两次"，供氧效率是哺乳动物的数倍，支撑飞行的高耗氧。</>
      ,
    ],
  },
  {
    title: '气流方向的关键区别',
    lines: [
      <>哺乳动物肺：气体<span className="font-semibold">往返</span>流动（潮汐式），呼气与吸气共用同一通道，换气不完全（有"死腔"）。</>
      ,
      <>鸟类肺：气体<span className="font-semibold">单向</span>流动——从后气囊 → 肺（副支气管）→ 前气囊 → 排出，方向始终不变。</>
      ,
      <>单向气流的"秘诀"：气动阀门效应——气流方向由气道结构决定，不需要"阀门"主动控制。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>气囊<span className="font-semibold">本身不进行气体交换</span>（壁薄无血管）——它只是"储气罐"与"风泵"；气体交换只发生在肺的副支气管。</>
      ,
      <>"双重呼吸"= 每<span className="font-semibold">呼吸一次，气体两次经过肺</span>（吸气一次+呼气一次）——飞行时的"涡轮增压"。</>
      ,
      <>联系演化：鸟类的高效呼吸系统与骨骼中空、前肢变翼一起，是适应飞行生活的"整套方案"。</>
      ,
    ],
  },
];

type Phase = 0 | 1 | 2 | 3;

const PHASE_LABELS = ['吸气：空气进入后气囊', '呼气：后气囊空气过肺', '吸气：空气进入前气囊', '呼气：前气囊空气过肺'];

export function BirdBreathingLab() {
  const [phase, setPhase] = useState<Phase>(0);
  const next = () => setPhase(((phase + 1) % 4) as Phase);

  const observation = (() => {
    const l = [
      '吸气开始：新鲜空气分成两路——约 75% 直接进入后气囊储存（不经过肺），25% 经过肺完成第一次气体交换。',
      '呼气开始：后气囊收缩，把储存的新鲜空气"挤"过肺——气体交换第二次发生！此时还在呼气，肺却在"吸氧"。',
      '第二次吸气：肺中气体进入前气囊，同时新空气再次进入后气囊——"装弹"完成。',
      '第二次呼气：前气囊的空气（已交换过的废气）排出体外——完成一个完整的呼吸循环。一口气被用了两次！',
    ];
    return l[phase];
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={next}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              🐦 下一步（{PHASE_LABELS[phase].slice(0, 2)}阶段 {phase + 1}/4）
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前阶段：<span className="font-semibold">{PHASE_LABELS[phase]}</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">气囊不换气，只"存气"与"泵气"</span>
            </div>
          </>
        }
      >
        <SceneBox label="鸟类的双重呼吸（四相位循环）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 肺 */}
            <ellipse cx="220" cy="120" rx="62" ry="44" fill="#e88a8a" stroke="#a53030" strokeWidth="3" />
            <text x="220" y="125" textAnchor="middle" fontSize="11.5" fill="#7a1a1a" fontWeight="800">肺（气体交换场所）</text>
            {/* 后气囊 */}
            <circle cx="100" cy="90" r="30" fill="#d8e8b0" stroke="#6a8a3a" strokeWidth="2.6" />
            <text x="100" y="94" textAnchor="middle" fontSize="10" fill="#4a6a1a" fontWeight="700">后气囊</text>
            {/* 前气囊 */}
            <circle cx="340" cy="90" r="30" fill="#c9d8e8" stroke="#4d7ea8" strokeWidth="2.6" />
            <text x="340" y="94" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">前气囊</text>
            {/* 气管 */}
            <path d="M220 66 v -24" stroke="#5a7a8a" strokeWidth="8" strokeLinecap="round" />
            <text x="220" y="30" textAnchor="middle" fontSize="10" fill="#4b6c73" fontWeight="600">气管（外界）</text>
            {/* 气流箭头 */}
            {phase === 0 ? (
              <>
                <path d="M234 40 q 30 8 60 22 q 20 10 18 22" fill="none" stroke="#3f7f3a" strokeWidth="2.6" />
                <text x="330" y="86" fontSize="9" fill="#3f7f3a" fontWeight="700">新空气</text>
                <path d="M206 40 q -30 8 -60 22 q -20 10 -18 22" fill="none" stroke="#3f7f3a" strokeWidth="2.6" />
                <text x="86" y="86" fontSize="9" fill="#3f7f3a" fontWeight="700">储存</text>
              </>
            ) : null}
            {phase === 1 ? (
              <>
                <path d="M100 120 q 30 30 78 26" fill="none" stroke="#3f7f3a" strokeWidth="2.6" />
                <text x="120" y="140" fontSize="9" fill="#3f7f3a" fontWeight="700">后气囊过肺 → 交换</text>
                <path d="M340 120 q 30 30 52 22" fill="none" stroke="#8a671b" strokeWidth="2.6" />
                <text x="340" y="156" fontSize="9" fill="#8a671b" fontWeight="700">废气排出</text>
              </>
            ) : null}
            {phase === 2 ? (
              <>
                <path d="M220 66 v -24" stroke="#3f7f3a" strokeWidth="4" />
                <path d="M158 92 q 26 10 48 24" fill="none" stroke="#3f7f3a" strokeWidth="2.6" />
                <text x="130" y="120" fontSize="9" fill="#3f7f3a" fontWeight="700">肺 → 前气囊</text>
                <text x="108" y="66" fontSize="9" fill="#3f7f3a" fontWeight="700">后气囊装新气</text>
              </>
            ) : null}
            {phase === 3 ? (
              <>
                <path d="M310 92 q 30 8 62 18" fill="none" stroke="#8a671b" strokeWidth="2.6" />
                <text x="326" y="118" fontSize="9" fill="#8a671b" fontWeight="700">废气排出</text>
                <path d="M100 120 q 34 26 82 26" fill="none" stroke="#3f7f3a" strokeWidth="2.6" />
                <text x="130" y="150" fontSize="9" fill="#3f7f3a" fontWeight="700">后气囊新气过肺（二次交换）</text>
              </>
            ) : null}
            {/* 说明条 */}
            <rect x="40" y="200" width="360" height="46" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
            <text x="220" y="220" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="800">哺乳动物：潮汐式呼吸（往返）——有"死腔"浪费</text>
            <text x="220" y="238" textAnchor="middle" fontSize="10" fill="#0e6f75" fontWeight="700">鸟类：单向气流——吸呼都在交换气体（双重呼吸）</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
