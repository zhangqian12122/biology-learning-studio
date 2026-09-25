'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（高原适应）',
    lines: [
      <>海拔升高 → 大气压降低 → <span className="font-semibold">每口吸入的氧气减少</span>（海平面的一半左右 @5500 m）——身体必须"加倍努力"获取氧气。</>
      ,
      <>短期适应（数小时~数天）：<span className="font-semibold">呼吸加深加快</span>（通气量↑）、心率加快；长期适应（数周）：肾脏分泌 EPO → 骨髓制造<span className="font-semibold">更多红细胞</span>，携氧能力恢复。</>
      ,
      <>高原世居者（藏族）已经演化出基因层面的适应（EPAS1 基因变异）：血红蛋白不高却同样"够氧"——不会出现慢性高红血症。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>登山路线：0 m（平原）→ 3000 m（初上高原）→ 4500 m（高原）→ 5500 m（高海拔营地）。</>
      ,
      <>两条曲线：血氧饱和度（SpO₂）与通气量。平原人 SpO₂ 约 98%，急上 4500 m 可跌到 80% 以下。</>
      ,
      <>观察点：什么在"变好"？——通气量增加（短期）与红细胞增多（长期）先后接力。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>急性高原反应：头痛·恶心·失眠（缺氧使脑血管扩张·脑内压变化）——<span className="font-semibold">阶梯式上升</span>让身体有适应时间。</>
      ,
      <>高原训练的体育应用：运动员在中等海拔训练（刺激红细胞增加），回平原比赛"超量恢复"。</>
      ,
      <>考点联系：环境改变 → 内环境稳态受挑战 → 神经-体液调节介入（呼吸的神经调节 + EPO 的体液调节）——稳态是"动态平衡"的又一例证。</>
      ,
    ],
  },
];

type Site = { name: string; alt: number; spo2: number; vent: number };

const SITES: Site[] = [
  { name: '平原（0 m）', alt: 0, spo2: 98, vent: 100 },
  { name: '高原反应区（3000 m）', alt: 3000, spo2: 90, vent: 135 },
  { name: '高海拔（4500 m）', alt: 4500, spo2: 81, vent: 175 },
  { name: '极高海拔营地（5500 m）', alt: 5500, spo2: 74, vent: 210 },
];

export function AltitudeAdaptationLab() {
  const [idx, setIdx] = useState(0);
  const cur = SITES[idx];

  const observation = (() => {
    if (idx === 0)
      return '平原出发：血氧饱和度 98%，呼吸平稳。点击"登上更高处"，观察身体在不同海拔如何一步步"重新编程"。提示：每站都先看血氧掉了多少，再看身体用什么办法补回来。';
    if (idx === 1)
      return '3000 米：空气含氧只有平原的 70%，血氧跌到 90%——呼吸立刻加深加快（颈动脉体化学感受器触发）。多数人会头痛失眠，这是急性高原反应，通常 3~7 天缓解。';
    if (idx === 2)
      return '4500 米：血氧 81%——身体启动"长期工程"：肾脏分泌 EPO 促红细胞生成素，骨髓加班制造红细胞，携氧能力在数周内提升。注意：适度红细胞增多有利携氧，但血液过稠反而危险（慢性高红血症）。';
    return '5500 米营地：血氧 74%，通气量是平原的两倍多。长期适应的极限地带——而高原世居者（如藏族）凭 EPAS1 基因变异，不需要"多带红细胞"也能高效用氧。这就是自然选择写在基因里的高原护照。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">登山路线（逐站攀登）</p>
              <div className="grid gap-1.5">
                {SITES.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setIdx(i)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      idx === i
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              血氧饱和度：<span className="text-base font-bold" style={{ color: cur.spo2 < 85 ? '#b0483a' : '#2f7a4d' }}>{cur.spo2}%</span>
              <br />
              通气量：<span className="font-semibold">{cur.vent}%</span>（以平原为 100%）
            </div>
          </>
        }
      >
        <SceneBox label={`海拔适应：${cur.name}`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 山 */}
            <path d="M60 224 L 190 60 L 240 130 L 300 40 L 420 224 Z" fill="#d8e4ec" stroke="#8a9a9f" strokeWidth="2.6" />
            <path d="M300 40 L 340 96 L 316 90 L 292 106 Z" fill="#f0f4f8" stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 1, 2, 3].map((i) => {
              const x = 110 + i * 95;
              const y = 214 - i * 38;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r={idx === i ? 12 : 8} fill={idx === i ? '#0e6f75' : '#ffffff'} stroke="#0e6f75" strokeWidth="2.2" />
                  <text x={x} y={y + 4} textAnchor="middle" fontSize={idx === i ? 10 : 8} fill={idx === i ? '#ffffff' : '#0e6f75'} fontWeight="700">{i + 1}</text>
                </g>
              );
            })}
            <text x="70" y="252" fontSize="10.5" fill="#59767c" fontWeight="600">0 m</text>
            <text x="372" y="252" fontSize="10.5" fill="#59767c" fontWeight="600">5500 m</text>
            {/* 数据卡 */}
            <rect x="46" y="46" width="130" height="66" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
            <text x="111" y="68" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">血氧饱和度 SpO₂</text>
            <text x="111" y="90" textAnchor="middle" fontSize="13" fill={cur.spo2 < 85 ? '#a53030' : '#2f6f2a'} fontWeight="800">{cur.spo2}%</text>
            <rect x="230" y="46" width="164" height="66" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
            <text x="312" y="68" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">通气量（呼吸深度频率）</text>
            <text x="312" y="90" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="800">{cur.vent}%</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
