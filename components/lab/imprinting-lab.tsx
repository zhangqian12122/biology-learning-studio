'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（印随行为）',
    lines: [
      <>印随（imprinting，铭印）：刚孵化的幼鸟会<span className="font-semibold">紧跟它看到的第一个移动物体</span>，把它当作"妈妈"并长期跟随——1935 年劳伦兹被小鹅当作"鹅妈妈"的经典研究。</>
      ,
      <>印随的三个特点：<span className="font-semibold">有关键期</span>（孵化后数小时到两天，错过不再发生）；<span className="font-semibold">不需要食物奖励</span>（区别于条件反射）；<span className="font-semibold">影响深远</span>（成年后的择偶偏好都受其影响）。</>
      ,
      <>意义：幼体通过印随快速"认定"亲代，获得保护与学习对象——是先天程序与后天经验的巧妙结合。</>
      ,
    ],
  },
  {
    title: '经典对比',
    lines: [
      <>印随 vs 条件反射：印随<span className="font-semibold">不需要奖励强化</span>（一次即可形成）、有<span className="font-semibold">关键期</span>；条件反射需要反复配对强化，理论上随时可建立。</>
      ,
      <>劳伦兹、廷伯根、冯·弗里施三人因动物行为学研究共获 1973 年诺贝尔奖——行为学由此成为独立的学科。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>人类婴儿也有类似的"依恋"现象：与照料者的早期互动影响情感发展——但机制比印随复杂得多，不能简单类比。</>
      ,
      <>保护应用：人工繁育的珍稀鸟类放归前，要用<span className="font-semibold">"义亲"模型或手偶喂食</span>，避免幼鸟印随人类而丧失野外生存能力。</>
      ,
    ],
  },
];

type Object = 'lorenz' | 'goose' | 'balloon';

const OBJECTS: Record<Object, { label: string; desc: string; outcome: string }> = {
  lorenz: { label: '劳伦兹（人）', desc: '灰雁孵化后第一眼看到的就是他', outcome: '小鹅从此跟着劳伦兹走，把他当"妈妈"，成年后甚至向人的手指"求偶"。' },
  goose: { label: '母鹅', desc: '自然情况：第一眼看到的是真正的妈妈', outcome: '小鹅正常跟随母鹅觅食避险——自然状态下的健康印随。' },
  balloon: { label: '蓝色气球', desc: '实验极端案例：第一眼看到滚动的气球', outcome: '小鹅把气球当"妈妈"，对真鹅毫无反应——关键期里印随的对象"来者不拒"。' },
};

const STEPS = 3; // 0 破壳 → 1 跟随 → 2 成年影响

export function ImprintingLab() {
  const [obj, setObj] = useState<Object>('lorenz');
  const [stage, setStage] = useState(0);
  const cur = OBJECTS[obj];

  const observation = (() => {
    if (stage === 0)
      return '小鹅破壳了！此时它开始"扫描"环境中第一个移动的物体。选择破壳后它将看到的对象——这一眼将决定它长期的"妈妈"是谁。这就是印随的关键期：只有孵化后约 10~24 小时内有效。';
    if (stage === 1)
      return `小鹅紧跟${cur.label}移动，寸步不离——印随已经形成。注意：这个过程${obj === 'goose' ? '是自然程序' : '不需要任何食物奖励'}，仅凭"第一个移动物体"就完成了。${obj === 'lorenz' ? '劳伦兹被一群小鹅追着走的照片，成了行为学的标志。' : ''}`;
    return `成年后的深远影响：${cur.outcome}印随不仅决定幼年的跟随对象，还会写入成年后的择偶偏好——劳伦兹的灰雁甚至向他"求婚"。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">破壳后看到的第一个移动物体</p>
              <div className="grid gap-1.5">
                {(Object.keys(OBJECTS) as Object[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setObj(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      obj === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {OBJECTS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {OBJECTS[id].desc}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStage((s) => Math.min(STEPS, s + 1))}
              disabled={stage >= STEPS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              🐣 推进成长（{stage}/{STEPS}）
            </button>
            <button type="button" onClick={() => setStage(0)} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新孵化
            </button>
          </>
        }
      >
        <SceneBox label={`小鹅的印随实验：第一眼看到 ${cur.label}`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 草地 */}
            <path d="M40 210 h 360" stroke="#8a9a6a" strokeWidth="3" />
            <rect x="40" y="210" width="360" height="14" fill="#c9d8a0" />
            {/* 小鹅 */}
            <g>
              <ellipse cx="160" cy="176" rx="30" ry="20" fill="#f4f0d8" stroke="#a5966a" strokeWidth="2.6" />
              <circle cx="192" cy="158" r="12" fill="#f4f0d8" stroke="#a5966a" strokeWidth="2.2" />
              <path d="M203 156 l 14 4 l -14 5 Z" fill="#e8a03a" stroke="#a5761d" strokeWidth="1.4" />
              <circle cx="195" cy="154" r="2.6" fill="#141414" />
              <path d="M150 190 l 6 14 m 14 -10 l 2 14 m 16 -16 l 8 12" stroke="#e8a03a" strokeWidth="2.6" strokeLinecap="round" />
              <text x="160" y="224" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">小鹅（灰雁幼鸟）</text>
            </g>
            {/* 跟随对象 */}
            {stage >= 1 ? (
              <g>
                {obj === 'lorenz' ? (
                  <g>
                    <circle cx="60" cy="120" r="18" fill="#f0c9b0" stroke="#a5765a" strokeWidth="2.4" />
                    <path d="M52 104 q 8 -12 16 0" fill="none" stroke="#5a3a2a" strokeWidth="3" strokeLinecap="round" />
                    <path d="M48 138 q 12 16 24 0 l 0 -20" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2" />
                    <text x="60" y="170" textAnchor="middle" fontSize="9.5" fill="#3f7f3a" fontWeight="700">劳伦兹</text>
                  </g>
                ) : obj === 'goose' ? (
                  <g>
                    <ellipse cx="60" cy="124" rx="28" ry="16" fill="#f4f0d8" stroke="#a5966a" strokeWidth="2.2" />
                    <path d="M40 118 q -12 -4 -18 4 m 18 -2 l -16 8" stroke="#a5966a" strokeWidth="2" strokeLinecap="round" />
                    <text x="60" y="170" textAnchor="middle" fontSize="9.5" fill="#8a671b" fontWeight="700">母鹅</text>
                  </g>
                ) : (
                  <g>
                    <ellipse cx="60" cy="120" rx="20" ry="24" fill="#7ac8e8" stroke="#2a8ab5" strokeWidth="2.4" />
                    <path d="M48 100 q 12 -8 24 0" fill="none" stroke="#2a8ab5" strokeWidth="2" />
                    <text x="60" y="170" textAnchor="middle" fontSize="9.5" fill="#2a8ab5" fontWeight="700">气球</text>
                  </g>
                )}
                {/* 跟随虚线 */}
                <path d="M120 172 q -30 -20 -44 -28" fill="none" stroke="#8a671b" strokeWidth="1.6" strokeDasharray="4 3" />
              </g>
            ) : (
              <text x="220" y="140" textAnchor="middle" fontSize="10.5" fill="#9ab0b5">破壳后 10~24 小时是印随的"关键期"</text>
            )}
            {/* 结论 */}
            {stage >= 2 ? (
              <g>
                <rect x="60" y="236" width="320" height="20" rx="6" fill="#fdf1cf" stroke="#8a671b" strokeWidth="1.6" />
                <text x="220" y="251" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="700">
                  {obj === 'goose' ? '自然印随：跟随真妈妈 ✓' : `印随对象：${cur.label}（关键期"来者不拒"）`}
                </text>
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
