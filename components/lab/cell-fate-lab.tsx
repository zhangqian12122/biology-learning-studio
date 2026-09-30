'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（细胞的三种命运）',
    lines: [
      <><span className="font-semibold">细胞衰老</span>是生理性的功能衰退：水分减少使细胞皱缩、多种酶活性降低、色素（脂褐素）积累、细胞核增大染色加深、膜通透性改变——衰老是所有细胞共同的"时间表"。</>
      ,
      <><span className="font-semibold">细胞凋亡</span>是由基因决定的<span className="font-semibold">主动性 programmed death</span>：细胞皱缩、与邻居脱离、膜内陷包裹内容物形成"凋亡小体"，被邻近细胞吞噬——没有炎症。发育中手指的成形、蝌蚪尾巴的消失都靠它。</>
      ,
      <><span className="font-semibold">细胞癌变</span>是失控：原癌基因与抑癌基因突变累积，细胞获得<span className="font-semibold">无限增殖、形态显著改变、表面糖蛋白减少（易扩散）</span>三大特征——癌细胞是"拒绝退役又拒绝纪律"的叛徒。</>
      ,
    ],
  },
  {
    title: '三者的关键区别',
    lines: [
      <>凋亡与坏死的本质区别：<span className="font-semibold">凋亡是基因调控的"有序退场"</span>（无炎症、膜保持完整、凋亡小体），坏死是外力损伤导致的"无序崩塌"（膜破裂、内容物外泄、引发炎症）。</>
      ,
      <>衰老与癌变看似相反，却常同源：端粒缩短、DNA 损伤累积既可以把细胞推入衰老"安全锁"，也可能在关键基因突变后让细胞越过锁直接癌变——<span className="font-semibold">衰老其实是防癌的最后一道闸</span>。</>
      ,
      <>免疫监视：体内的免疫细胞（NK 细胞、细胞毒性 T 细胞）能识别并清除癌变细胞——癌细胞能"立足"，意味着它逃过了这道监视。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>考点：细胞衰老的<span className="font-semibold">五大特征</span>（水分↓·酶活性↓·色素↑·核增大染色深·膜通透性改变）常以选择题出现；个体衰老与细胞衰老<span className="font-semibold">不成简单正比</span>（年轻人也有衰老细胞）。</>
      ,
      <>考点：<span className="font-semibold">细胞凋亡</span>经典实例——人胚胎期手指成形、蝌蚪尾部消失、被病原体感染的细胞自我清除；与"细胞坏死"的对比是高频对比题。</>
      ,
      <>考点：癌变是<span className="font-semibold">多基因累积突变</span>的结果（不是一次突变），因此癌症多发于老年人；吸烟、紫外线等致癌因子提高突变率。</>
      ,
    ],
  },
];

type Scene = 'aging' | 'apoptosis' | 'cancer';

const SCENES: Record<Scene, { label: string; note: string }> = {
  aging: { label: '细胞衰老', note: '水分↓ 酶活性↓ 色素↑ 核增大' },
  apoptosis: { label: '细胞凋亡', note: '基因调控的有序退场' },
  cancer: { label: '细胞癌变', note: '失控增殖 · 表面糖蛋白减少' },
};

const FEATURES: Record<Scene, string[]> = {
  aging: ['细胞内水分减少，体积缩小', '多种酶活性降低，代谢减慢', '色素（脂褐素）积累', '细胞核体积增大、染色质收缩深染', '细胞膜通透性改变，物质运输变慢'],
  apoptosis: ['基因程序性启动（不是外力损伤）', '细胞皱缩、与相邻细胞脱离', '膜内陷包裹内容物形成凋亡小体', '被邻近细胞吞噬，不引发炎症', '实例：手指成形 · 蝌蚪尾部消失'],
  cancer: ['能无限增殖（"不死"）', '形态结构发生显著改变', '表面糖蛋白减少 → 易分散转移', '原癌基因与抑癌基因累积突变', '逃过免疫监视后形成肿瘤'],
};

export function CellFateLab() {
  const [scene, setScene] = useState<Scene>('aging');
  const [immune, setImmune] = useState(true);

  const observation = (() => {
    if (scene === 'aging')
      return '左边是年轻细胞，右边是衰老细胞：体积缩小、色素颗粒（脂褐素）明显、细胞核变大且染色加深——这不是"生病"，而是所有细胞共同的时间表。个体衰老≠细胞全部衰老，但衰老细胞在老年个体中占比更高。';
    if (scene === 'apoptosis')
      return '凋亡是"有序退场"：基因程序启动后，细胞皱缩脱离、膜内陷包出凋亡小体，随后被邻居吞噬——全程无炎症。你的手指当年就是靠指间细胞的凋亡才分开成形的。对比坏死：膜破裂、内容物外泄、炎症一片。';
    if (immune)
      return '癌变细胞刚出现，免疫监视（NK 细胞与细胞毒性 T 细胞）就识别并清除了它——每天体内都有这样的"叛徒"被及时处决，稳态得以维持。';
    return '免疫监视关闭：没有约束的突变细胞开始无限增殖——形态变得怪异、表面糖蛋白减少使其容易脱落转移，肿瘤就此形成。癌变是原癌基因与抑癌基因多次累积突变的结果。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择要观察的细胞命运</p>
              <div className="grid gap-1.5">
                {(Object.keys(SCENES) as Scene[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setScene(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      scene === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {SCENES[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {SCENES[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            {scene === 'cancer' ? (
              <button
                type="button"
                onClick={() => setImmune((v) => !v)}
                className={`min-h-11 w-full rounded-md border px-3 text-xs font-semibold transition-colors ${
                  immune
                    ? 'border-[#7aa87a] bg-[#eef7ee] text-[#2f6f2a]'
                    : 'border-[#c98a8a] bg-[#fdf1f1] text-[#a53030]'
                }`}
              >
                免疫监视：{immune ? '开启中（NK 细胞巡逻）' : '已关闭（危险！）'}
              </button>
            ) : null}
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前命运：<span className="font-bold text-[#0a626a]">{SCENES[scene].label}</span>
              <br />
              <span className="text-[#799398]">三大特征见右侧清单</span>
            </div>
          </>
        }
      >
        <SceneBox label="细胞的命运：衰老 · 凋亡 · 癌变" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {scene === 'aging' ? (
              <g>
                {/* 年轻细胞 */}
                <circle cx="112" cy="140" r="62" fill="#eaf6ea" stroke="#4a8a4a" strokeWidth="3" />
                <circle cx="112" cy="140" r="20" fill="#c9e8c9" stroke="#3a7a3a" strokeWidth="2.2" />
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <circle key={i} cx={88 + (i % 3) * 24} cy={120 + Math.floor(i / 3) * 38} r="3" fill="#6ab86a" />
                ))}
                <text x="112" y="228" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">年轻细胞：饱满 · 核正常 · 代谢旺盛</text>
                {/* 箭头 */}
                <path d="M190 140 L240 140" stroke="#8a671b" strokeWidth="3" markerEnd="url(#fateArrow)" />
                <text x="215" y="126" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="700">岁月 + 损伤累积</text>
                {/* 衰老细胞 */}
                <path d="M300 84 q 58 8 62 58 q 4 56 -52 62 q -60 6 -64 -52 q -4 -60 54 -68 Z" fill="#f2ecd8" stroke="#8a671b" strokeWidth="3" />
                <path d="M316 128 q 26 -14 44 4 q 8 22 -12 34 q -24 12 -38 -6 q -10 -18 6 -32 Z" fill="#d8c49a" stroke="#8a671b" strokeWidth="2.4" />
                {[[296, 112], [348, 100], [358, 168], [302, 172]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="5.5" fill="#b08a3a" stroke="#7a5a1a" strokeWidth="1.4" />
                ))}
                <text x="330" y="238" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">衰老细胞：皱缩 · 色素（脂褐素）· 核大深染</text>
                <text x="330" y="258" textAnchor="middle" fontSize="11" fill="#a5761d">酶活性降低 · 膜通透性改变</text>
              </g>
            ) : null}
            {scene === 'apoptosis' ? (
              <g>
                {/* 凋亡流程 */}
                {[
                  { x: 74, label: '正常细胞', note: '基因程序启动' },
                  { x: 186, label: '皱缩脱离', note: '与邻居断开' },
                  { x: 298, label: '出芽 + 膜内陷', note: '形成凋亡小体' },
                ].map((s, i) => (
                  <g key={s.label}>
                    <circle cx={s.x} cy={120} r="36" fill="#eef2fa" stroke="#5a7aa5" strokeWidth="2.6" />
                    {i === 1 ? <circle cx={s.x} cy={120} r="20" fill="#d5e0f0" stroke="#5a7aa5" strokeWidth="1.8" /> : null}
                    {i === 2 ? (
                      <g>
                        <circle cx={s.x - 14} cy={108} r="9" fill="#c8d6ee" stroke="#5a7aa5" strokeWidth="1.6" />
                        <circle cx={s.x + 16} cy={132} r="7" fill="#c8d6ee" stroke="#5a7aa5" strokeWidth="1.6" />
                      </g>
                    ) : (
                      <circle cx={s.x} cy={120} r="10" fill="#b8c8e8" />
                    )}
                    <text x={s.x} y={182} textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="700">{s.label}</text>
                    <text x={s.x} y={200} textAnchor="middle" fontSize="10.5" fill="#59767c">{s.note}</text>
                    {i < 2 ? <line x1={s.x + 42} y1={120} x2={s.x + 66} y2={120} stroke="#5a7aa5" strokeWidth="2.4" markerEnd="url(#fateArrow)" /> : null}
                  </g>
                ))}
                <text x="196" y={240} textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">最后被邻近细胞吞噬 · 无炎症</text>
                {/* 凋亡 vs 坏死对比 */}
                <rect x="40" y="252" width="360" height="34" rx="8" fill="#f4f8fc" stroke="#5a7aa5" strokeWidth="1.6" />
                <text x="220" y="274" textAnchor="middle" fontSize="11.5" fill="#2c5a84" fontWeight="700">
                  对比坏死：坏死=膜破裂·内容物外泄·引发炎症；凋亡=膜完整·有序打包·悄无声息
                </text>
              </g>
            ) : null}
            {scene === 'cancer' ? (
              <g>
                {/* 癌变场景 */}
                {[
                  [110, 130], [168, 108], [222, 146], [156, 176], [262, 100],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <path d={`M${x} ${y} q 20 -18 40 -2 q 14 16 -2 30 q -22 14 -38 -2 q -10 -14 0 -26 Z`} fill="#f2d5d5" stroke="#a53030" strokeWidth="2.6" />
                    <circle cx={x + 16} cy={y + 12} r="9" fill="#d98a8a" stroke="#a53030" strokeWidth="1.6" />
                  </g>
                ))}
                <text x="190" y="228" textAnchor="middle" fontSize="12.5" fill="#a53030" fontWeight="800">
                  {immune ? '突变细胞刚现身 → 被免疫监视清除' : '无限增殖失控 → 肿瘤形成'}
                </text>
                <text x="190" y="250" textAnchor="middle" fontSize="11" fill="#b06a6a">
                  {immune ? 'NK 细胞与细胞毒性 T 细胞正在巡逻' : '表面糖蛋白减少 → 细胞彼此脱离、易转移'}
                </text>
                {/* 免疫细胞 */}
                {immune ? (
                  <g>
                    {[82, 332].map((x, i) => (
                      <g key={i}>
                        <circle cx={x} cy={140 + i * 26} r="17" fill="#e2f0d9" stroke="#4a8a4a" strokeWidth="2.4" />
                        {[0, 1, 2, 3, 4].map((j) => {
                          const ang = (j * Math.PI * 2) / 5;
                          return <line key={j} x1={x + Math.cos(ang) * 17} y1={140 + i * 26 + Math.sin(ang) * 17} x2={x + Math.cos(ang) * 25} y2={140 + i * 26 + Math.sin(ang) * 25} stroke="#4a8a4a" strokeWidth="2.4" strokeLinecap="round" />;
                        })}
                        <text x={x} y={196 + i * 26} textAnchor="middle" fontSize="11" fill="#2f6f2a" fontWeight="700">免疫细胞</text>
                      </g>
                    ))}
                  </g>
                ) : null}
                <text x="26" y="40" fontSize="12.5" fill="#37352f" fontWeight="800">三大特征：无限增殖 · 形态改变 · 表面糖蛋白减少</text>
              </g>
            ) : null}
            <defs>
              <marker id="fateArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 Z" fill="#8a671b" />
              </marker>
            </defs>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <h3 className="text-sm font-semibold text-[#37352f]">特征清单（{SCENES[scene].label} · 共 {FEATURES[scene].length} 条）</h3>
        <ol className="mt-3 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
          {FEATURES[scene].map((f, i) => (
            <li key={f} className="rounded-md bg-[#f7f6f3] px-3 py-2">
              <span className="mr-1.5 font-mono text-[10px] font-semibold text-gray-400">{i + 1}</span>
              {f}
            </li>
          ))}
        </ol>
      </section>

      <LabReference items={REFERENCE} />
    </div>
  );
}
