'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（大氧化事件）',
    lines: [
      <>约 <span className="font-semibold">24 亿年前</span>，海洋中的蓝细菌（蓝藻）已经掌握了光合放氧的本领：它们把水分子"劈开"，源源不断地向大气释放氧气——史称"大氧化事件"。</>
      ,
      <>对当时的厌氧生物来说这是<span className="font-semibold">"氧气大灾难"</span>（氧气是强氧化剂）；但为后来的<span className="font-semibold">有氧呼吸</span>与真核生物、多细胞生物的演化铺平了道路。</>
      ,
      <>证据：地层中大量<span className="font-semibold">条带状铁建造（BIF）</span>——海洋中的二价铁被氧化沉淀，"铁锈"记录了氧气的首次登场。</>
      ,
    ],
  },
  {
    title: '时间线',
    lines: [
      <>① 38 亿年前：原核生命出现（厌氧·无氧气环境）。</>
      ,
      <>② 27 亿年前：蓝细菌演化出产氧光合作用（海洋中开始缓慢积氧）。</>
      ,
      <>③ 24 亿年前：大氧化事件——海洋二价铁耗尽后氧气"溢出"进入大气。</>
      ,
      <>④ 21~18 亿年前：真核细胞出现（内共生：好氧细菌→线粒体）。</>
      ,
      <>⑤ 6~5.4 亿年前：臭氧层形成·多细胞动物大爆发。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>蓝细菌 <span className="font-semibold">≠ 蓝藻是"藻类"</span>：它们是原核生物（与真核的藻类不同），却拥有光合系统——"自养原核生物"。</>
      ,
      <>氧气改变地球的两条线：<span className="font-semibold">氧化海洋中的铁（沉淀）→ 臭氧层屏蔽紫外线</span>，为生命登陆"铺路"。</>
      ,
      <>内共生视角：好氧细菌（→线粒体）在被氧气"武装"的世界里成为真核细胞的"发电厂"——与本站内共生标本互参。</>
      ,
    ],
  },
];

const STAGES = 4;

export function OxygenationLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '38 亿年前的地球：海洋温暖，大气中没有氧气（甲烷·二氧化碳·氮气）。最早的厌氧生命在海底热泉附近悄然出现——它们不需要、也不喜欢氧气。';
    if (stage === 1)
      return '约 27 亿年前：海洋中的蓝细菌掌握了光合放氧的"黑科技"。起初，释放的氧气被海水中的二价铁"吃掉"（氧化成铁锈沉淀）——世界各地的红色条带状铁矿就是这段时期记录的"账本"。';
    if (stage === 2)
      return '约 24 亿年前：海洋中的铁终于被"耗尽"，多余的氧气第一次涌进大气——大氧化事件！对厌氧生物这是灭顶之灾（"氧气大灾难"），却为需氧生命的登场打开了大门。';
    return '氧气带来两大馈赠：① 有氧呼吸高效产能——为复杂生命"供能"；② 高空形成臭氧层屏蔽紫外线——为生命登陆"撑伞"。约 6 亿年前多细胞动物大爆发，5.4 亿年前寒武纪生命大爆发——地球从此生机勃勃。';
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
              🌍 推进亿年（{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              回到 38 亿年前
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {['38 亿年前 · 厌氧地球', '27 亿年前 · 蓝细菌登场', '24 亿年前 · 大氧化事件', '臭氧层 · 生物登陆'][Math.min(stage, 3)]}
              <br />
              <span className="font-semibold text-[#0e6f75]">微小蓝细菌改变了整个地球</span>
            </div>
          </>
        }
      >
        <SceneBox label="大氧化事件：地球大气演化的转折点" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 阶段 0-3 共用地球 */}
            <circle cx="220" cy="130" r="86" fill="#2a5a8a" stroke="#1a3a5a" strokeWidth="3" />
            {/* 大陆 */}
            <path d="M170 100 q 30 -24 60 -10 q 24 12 8 32 q -20 22 -48 12 q -26 -10 -20 -34 Z" fill="#7a9a5a" stroke="#4a7a3a" strokeWidth="2" />
            <path d="M270 160 q 24 -16 44 -4 q 12 10 -6 22 q -22 12 -38 -4 q -10 -10 0 -14 Z" fill="#7a9a5a" stroke="#4a7a3a" strokeWidth="2" />
            {/* 氧气指示 */}
            <g>
              <text x="70" y="52" fontSize="13" fontWeight="800" fill="#3f7f3a">O₂ 浓度：{['0%', '0.1%', '1%', '21%'][stage]}</text>
              <rect x="66" y="60" width={20 + stage * 60} height="14" rx="7" fill="#7ac8d8" stroke="#3a8a9a" strokeWidth="1.6" />
            </g>
            {/* 阶段元素 */}
            {stage === 0 ? (
              <g>
                {[0, 1, 2].map((i) => (
                  <path key={i} d={`M${150 + i * 60} 190 q 12 -14 28 -8`} fill="none" stroke="#8a9a9f" strokeWidth="2.4" strokeLinecap="round" />
                ))}
                <text x="220" y="230" textAnchor="middle" fontSize="10.5" fill="#8a9a9f" fontWeight="600">厌氧生命在海底热泉附近滋生</text>
              </g>
            ) : null}
            {stage === 1 ? (
              <g>
                {[0, 1, 2].map((i) => (
                  <g key={i}>
                    <circle cx={140 + i * 70} cy={200 - (i % 2) * 14} r="10" fill="#5a9a3a" stroke="#2f6f2a" strokeWidth="1.8" />
                    <path d={`M${136 + i * 70} ${188 - (i % 2) * 14} q 8 -10 20 -6`} fill="none" stroke="#3f7f3a" strokeWidth="1.6" />
                  </g>
                ))}
                <text x="220" y="230" textAnchor="middle" fontSize="10.5" fill="#3f7f3a" fontWeight="600">蓝细菌开始光合放氧——氧气被海水中的铁"吸收"</text>
              </g>
            ) : null}
            {stage === 2 ? (
              <g>
                {[0, 1, 2, 3].map((i) => (
                  <path key={i} d={`M${120 + i * 50} 196 q 18 -10 36 0`} fill="none" stroke="#8a3030" strokeWidth="4" strokeLinecap="round" />
                ))}
                <text x="220" y="230" textAnchor="middle" fontSize="10.5" fill="#a53030" fontWeight="700">海洋铁耗尽 → 氧气涌入大气（红色=条带铁建造）</text>
              </g>
            ) : null}
            {stage === 3 ? (
              <g>
                <path d="M110 60 Q 220 24 330 60" fill="none" stroke="#c9e8f4" strokeWidth="6" strokeLinecap="round" />
                <text x="220" y="44" textAnchor="middle" fontSize="10.5" fill="#4a8ab5" fontWeight="700">臭氧层（紫外线防护伞）</text>
                {[0, 1, 2].map((i) => (
                  <path key={i} d={`M${150 + i * 60} 210 q 10 -16 26 -10`} fill="none" stroke="#e8a03a" strokeWidth="2.6" strokeLinecap="round" />
                ))}
                <text x="220" y="236" textAnchor="middle" fontSize="10.5" fill="#3f7f3a" fontWeight="600">多细胞动物大爆发 → 生命登陆</text>
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
