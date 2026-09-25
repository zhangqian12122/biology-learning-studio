'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（血液循环路径）',
    lines: [
      <>体循环：<span className="font-semibold">左心室 → 主动脉 → 全身毛细血管 → 上下腔静脉 → 右心房</span>——为组织细胞送去 O₂ 与养料，带走 CO₂ 等废物。</>
      ,
      <>肺循环：<span className="font-semibold">右心室 → 肺动脉 → 肺部毛细血管 → 肺静脉 → 左心房</span>——在肺泡完成气体交换，"静脉血"变回"动脉血"。</>
      ,
      <>血液成分变化的两站：<span className="font-semibold">全身毛细血管</span>（动脉血→静脉血）与<span className="font-semibold">肺部毛细血管</span>（静脉血→动脉血）。</>
      ,
    ],
  },
  {
    title: '流程变量',
    lines: [
      <>步进追踪一滴血：从左心室出发，沿体循环绕全身一周，再经肺循环回左心房——走完"一大一小"两条路线。</>
      ,
      <>观察点：哪些血管里流"动脉血"？<span className="font-semibold">肺动脉里流静脉血、肺静脉里流动脉血</span>——命名以"血流方向"而非"血液性质"。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>心脏是"两台泵"：左心室壁最厚（把血泵到全身、路程最长）；心房→心室、心室→动脉都有<span className="font-semibold">瓣膜</span>防止血液倒流。</>
      ,
      <>内环境的视角：血液与组织细胞通过<span className="font-semibold">毛细血管壁</span>进行物质交换——血浆是内环境的重要成分。</>
      ,
      <>口诀：房连静、室连动；<span className="font-semibold">上房下室、房静室动</span>——左心室→主动脉，右心室→肺动脉。</>
      ,
    ],
  },
];

const STAGES = 4; // 0 左心室出发 → 1 体循环 → 2 肺循环 → 3 回到左心房

type Site = { name: string; x: number; y: number };
const SITES: Site[] = [
  { name: '左心室', x: 150, y: 150 },
  { name: '主动脉', x: 150, y: 74 },
  { name: '全身毛细血管', x: 322, y: 74 },
  { name: '上下腔静脉', x: 322, y: 150 },
  { name: '右心房·右心室', x: 258, y: 150 },
  { name: '肺动脉', x: 258, y: 74 },
  { name: '肺部毛细血管', x: 150, y: 74 },
  { name: '肺静脉→左心房', x: 150, y: 150 },
];

export function BloodFlowLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const activeIdx = [0, 2, 5, 7][Math.min(stage, 3)];

  const observation = (() => {
    if (stage === 0)
      return '一滴含氧丰富的动脉血从左心室出发——左心室壁最厚，收缩力最强，因为它要把血液泵到全身各处。出发站：主动脉瓣开启，血液冲入主动脉。';
    if (stage === 1)
      return '体循环进行中：主动脉的分支把血液送到全身毛细血管网。在这里，血液把 O₂ 和养料交给组织细胞，换回 CO₂ 等废物——鲜红的动脉血变成了暗红的静脉血。';
    if (stage === 2)
      return '静脉血经上下腔静脉回到右心房→右心室，被泵入肺动脉——注意：肺动脉里流的可是静脉血！到达肺部毛细血管网后，CO₂ 扩散进肺泡呼出，O₂ 进入血液——静脉血重新变回动脉血。';
    return '含氧丰富的动脉血经肺静脉流回左心房，进入左心室——一滴血完成了"体循环+肺循环"的完整旅程，全程仅需约 20 秒。记住口诀：房连静、室连动；肺动脉流静脉血、肺静脉流动脉血。';
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
              🫀 追踪一滴血（{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              回到左心室
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {['① 左心室 → 主动脉', '② 体循环：全身换气', '③ 肺循环：肺泡换气', '④ 肺静脉 → 左心房'][stage]}
              <br />
              <span className="font-semibold text-[#0e6f75]">动脉血红 · 静脉血暗红</span>
            </div>
          </>
        }
      >
        <SceneBox label="血液循环路径（红色=动脉血 · 蓝色=静脉血）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 体循环路径 */}
            <path d="M150 150 V 78 Q 150 62 170 60 H 300 Q 322 60 322 78 V 150" fill="none" stroke="#c94a4a" strokeWidth="7" />
            <path d="M322 150 V 178 H 262" fill="none" stroke="#4d7ea8" strokeWidth="7" />
            {/* 肺循环路径 */}
            <path d="M258 150 V 78 Q 258 62 240 60 H 172 Q 150 62 150 78" fill="none" stroke="#4d7ea8" strokeWidth="7" />
            <path d="M150 78 V 150" fill="none" stroke="#c94a4a" strokeWidth="7" />
            {/* 心脏简图 */}
            <g>
              <path d="M138 150 q 0 -22 24 -22 q 24 0 24 22 q 0 24 -24 46 q -24 -22 -24 -46 Z" fill="#c96a6a" stroke="#8a3030" strokeWidth="2.6" transform="translate(12 -6)" />
              <text x="174" y="196" textAnchor="middle" fontSize="10" fill="#8a3030" fontWeight="700">心脏（两台泵）</text>
            </g>
            {/* 全身 / 肺 */}
            <rect x="286" y="40" width="90" height="44" rx="8" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
            <text x="331" y="60" textAnchor="middle" fontSize="10" fill="#2f6f2a" fontWeight="700">全身毛细血管</text>
            <text x="331" y="76" textAnchor="middle" fontSize="8.5" fill="#3f7f3a">O₂/养料 ⇄ CO₂/废物</text>
            <rect x="90" y="24" width="120" height="30" rx="8" fill="#d8e4f0" stroke="#4d7ea8" strokeWidth="2.2" />
            <text x="150" y="44" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">肺部毛细血管（肺泡）</text>
            {/* 当前站点 */}
            {stage >= 1 ? (
              <circle cx={SITES[activeIdx].x} cy={SITES[activeIdx].y} r="10" fill="#e8a03a" stroke="#8a671b" strokeWidth="3" />
            ) : null}
            {/* 站点标注 */}
            {[
              { t: '左心室', x: 96, y: 160 },
              { t: '右心房·室', x: 246, y: 196 },
              { t: '主动脉', x: 158, y: 56 },
              { t: '肺动脉', x: 268, y: 56 },
              { t: '肺静脉', x: 100, y: 106 },
              { t: '上下腔静脉', x: 330, y: 176 },
            ].map((m) => (
              <text key={m.t} x={m.x} y={m.y} fontSize="9.5" fill="#37585f" fontWeight="600">{m.t}</text>
            ))}
            {/* 血色标注 */}
            <g>
              <text x="220" y="238" textAnchor="middle" fontSize="10.5" fill="#799398">
                {stage >= 2 ? '注意：肺动脉流静脉血·肺静脉流动脉血（命名按血流方向）' : '红色=动脉血（含氧多）· 蓝色=静脉血（含氧少）'}
              </text>
            </g>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
