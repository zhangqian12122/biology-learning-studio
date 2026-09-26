'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（鲸落——深海的生命绿洲）',
    lines: [
      <>鲸落：鲸死后尸体沉入深海，成为深海生物多年甚至上百年的"能量绿洲"——在阳光照不到的深海，鲸落是难得的"大餐"。</>
      ,
      <>鲸落与"植物-光合"生态完全不同：这里的能量来自<span className="font-semibold">鲸尸的有机物</span>与<span className="font-semibold">化能合成细菌</span>（氧化硫化氢获取能量）——没有阳光也能"生产"。</>
      ,
      <>一具鲸尸可养活深海生物群落<span className="font-semibold">数十年</span>——是研究深海生态与演替的天然实验室。</>
      ,
    ],
  },
  {
    title: '鲸落的三个阶段',
    lines: [
      <>① 移动清道夫期（数月）：盲鳗、鲨鱼、螃蟹等"清道夫"吃掉软组织（每天消耗 40~60 千克）。</>
      ,
      <>② 机会主义期（数年）：多毛类、甲壳类在残骸上"安家"繁殖，以残渣和彼此为食。</>
      ,
      <>③ 化能自养期（数十年）：厌氧细菌分解骨头中的脂质产生硫化氢，化能合成细菌氧化硫化氢制造有机物——"硫化物生态系统"。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>鲸落体现<span className="font-semibold">物质循环与能量流动</span>：鲸一生的能量最终"回馈"深海——能量流动、物质循环的深海版。</>
      ,
      <>鲸落、海藻林、热泉、冷泉并称<span className="font-semibold">深海"绿洲"</span>——深海不是"生命荒漠"。</>
      ,
      <>化能合成 vs 光合作用：前者用化学能（如 H₂S 氧化），后者用光能——都是"把无机物变成有机物"的自养过程。</>
      ,
    ],
  },
];

type Stage = 0 | 1 | 2 | 3;

export function WhaleFallLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(3, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '一头 40 吨的鲸在深海死去，巨大的尸体缓缓沉入海底——这是深海几十年一遇的"盛宴"。沉底瞬间，"清道夫大军"（盲鳗·鲨鱼·螃蟹）已经开始聚集。';
    if (stage === 1)
      return '机会主义期：软组织被清理后，多毛类蠕虫、甲壳类在残骸上安家繁殖——它们以残渣和细菌为食，形成一个临时的"深海社区"，可持续数年。';
    if (stage === 2)
      return '化能自养期：厌氧细菌分解鲸骨中的脂质，释放硫化氢；化能合成细菌氧化硫化氢获得能量、制造有机物——贻贝、腹足类、小型节肢动物依附其上，形成不依赖阳光的"化学合成生态"。';
    return '礁岩期：有机物耗尽，残骸成为深海生物的"人工礁石"与附着基质。一场鲸落可持续几十年——鲸用一生最后的能量，供养了一片深海绿洲。"一鲸落，万物生。"';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= 3}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              🐋 推进鲸落演替（{stage}/3）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新沉底
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {['清道夫期：软组织被吃', '机会主义期：生物聚集', '化能自养期：细菌"产粮"', '礁岩期：残骸成为家园'][Math.min(stage, 3)]}
              <br />
              <span className="font-semibold text-[#0e6f75]">不依赖阳光的"化能合成"生态</span>
            </div>
          </>
        }
      >
        <SceneBox label={`鲸落三阶段（深海 1000 m 以下）· 当前：第 ${stage + 1} 阶段`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 深海背景 */}
            <rect x="30" y="34" width="380" height="200" rx="12" fill="#0e1620" stroke="#0a1018" strokeWidth="2.4" />
            {/* 海底 */}
            <path d="M40 218 q 180 -22 360 0 l 0 16 l -360 0 Z" fill="#5a5a4a" stroke="#3a3a2a" strokeWidth="2" />
            {/* 鲸尸骨架 */}
            <g>
              <path d="M120 200 q 60 -18 160 -6 q 50 6 80 -4" fill="none" stroke="#d8d8c8" strokeWidth="12" strokeLinecap="round" />
              {[0, 1, 2, 3].map((i) => (
                <path key={i} d={`M${160 + i * 44} 196 l 10 -18`} stroke="#d8d8c8" strokeWidth="5" strokeLinecap="round" />
              ))}
              <circle cx="122" cy="196" r="16" fill="#d8d8c8" stroke="#8a8a7a" strokeWidth="2.2" />
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <path key={`r${i}`} d={`M${128 + i * 8} 188 l 8 -14`} stroke="#d8d8c8" strokeWidth="2.4" strokeLinecap="round" />
              ))}
            </g>
            {/* 阶段生物 */}
            {stage >= 0 ? (
              <g>
                {[0, 1, 2].map((i) => (
                  <path key={i} d={`M${150 + i * 30} 176 q 14 -16 34 -10`} fill="none" stroke="#5a7a95" strokeWidth="3.4" strokeLinecap="round" />
                ))}
                <text x="130" y="162" fontSize="9.5" fill="#8ab4c9" fontWeight="600">清道夫鱼</text>
              </g>
            ) : null}
            {stage >= 1 ? (
              <g>
                {[0, 1, 2, 3].map((i) => (
                  <circle key={`w${i}`} cx={150 + i * 40} cy={214} r="4" fill="#e8a03a" stroke="#8a671b" strokeWidth="1.4" />
                ))}
                <text x="150" y="232" fontSize="9" fill="#e8a03a" fontWeight="600">多毛类·甲壳类聚集</text>
              </g>
            ) : null}
            {stage >= 2 ? (
              <g>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <path key={`b${i}`} d={`M${130 + i * 36} 216 l 6 -16 m 4 16 l 10 -12`} stroke="#f4d03a" strokeWidth="1.6" strokeLinecap="round" />
                ))}
                <text x="240" y="196" fontSize="9.5" fill="#f4d03a" fontWeight="600">化能合成细菌（白/黄菌斑）</text>
              </g>
            ) : null}
            {/* 说明 */}
            <text x="220" y="246" textAnchor="middle" fontSize="10.5" fill="#799398">
              {stage === 0
                ? '① 移动清道夫期：盲鳗·鲨鱼·螃蟹"蚕食"软组织（每月消耗数吨）'
                : stage === 1
                  ? '② 机会主义期：多毛类·甲壳类在残骸上安家繁殖（数年）'
                  : stage === 2
                    ? '③ 化能自养期：细菌氧化骨脂释放的硫化氢"产粮"（数十年）'
                    : '④ 礁岩期：残骸成为深海生物的"家园"（数十年至上百年）'}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
