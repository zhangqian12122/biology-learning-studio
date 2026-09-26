'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（消化的化学之旅）',
    lines: [
      <>一口汉堡的"化学之旅"：<span className="font-semibold">口腔</span>淀粉酶分解淀粉 → <span className="font-semibold">胃</span>蛋白酶分解蛋白质 → <span className="font-semibold">小肠</span>胰液肠液彻底分解为可吸收的小分子。</>
      ,
      <>消化分两路：<span className="font-semibold">物理消化</span>（牙齿咀嚼·胃肠蠕动）与<span className="font-semibold">化学消化</span>（消化酶分解大分子）。</>
      ,
      <>吸收主战场在小肠：长 5~6 米 + 皱襞 + 绒毛 + 微绒毛——吸收面积可达 <span className="font-semibold">200 m²</span>（与糖类标本互参）。</>
      ,
    ],
  },
  {
    title: '三大营养物质的消化路径',
    lines: [
      <>淀粉：口腔（唾液淀粉酶→麦芽糖）→ 小肠（胰·肠淀粉酶→→<span className="font-semibold">葡萄糖</span>吸收）。</>
      ,
      <>蛋白质：胃（胃蛋白酶→多肽）→ 小肠（胰蛋白酶·肽酶→<span className="font-semibold">氨基酸</span>吸收）。</>
      ,
      <>脂肪：小肠（胆汁<span className="font-semibold">乳化</span>成微粒，无酶参与）→ 胰脂肪酶→<span className="font-semibold">甘油+脂肪酸</span>吸收。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>胆汁不含消化酶——它是"物理助攻"（乳化增大脂肪与酶的接触面积）；肝脏也因此是消化腺而非"消化器官"的特例。</>
      ,
      <>三大营养物质消化终产物：<span className="font-semibold">淀粉→葡萄糖；蛋白质→氨基酸；脂肪→甘油+脂肪酸</span>。</>
      ,
      <>小肠是消化与吸收的"主战场"：长约 5~6 米、内表面积 200 m²——结构与功能相适应的经典案例。</>
      ,
    ],
  },
];

type Station = 'mouth' | 'stomach' | 'duodenum' | 'small' | 'large';

const STATIONS: Record<Station, { label: string; enzyme: string; product: string }> = {
  mouth: { label: '① 口腔', enzyme: '唾液淀粉酶', product: '淀粉 → 麦芽糖' },
  stomach: { label: '② 胃', enzyme: '胃蛋白酶（盐酸环境）', product: '蛋白质 → 多肽' },
  duodenum: { label: '③ 十二指肠', enzyme: '胰液+胆汁+肠液', product: '乳化脂肪·全面分解' },
  small: { label: '④ 小肠绒毛', enzyme: '吸收高峰', product: '葡萄糖·氨基酸·甘油脂肪酸入血' },
  large: { label: '⑤ 大肠', enzyme: '水分回收', product: '粪便形成·菌群发酵' },
};

const ORDER: Station[] = ['mouth', 'stomach', 'duodenum', 'small', 'large'];

export function DigestionJourneyLab() {
  const [idx, setIdx] = useState(0);
  const cur = STATIONS[ORDER[idx]];

  const observation = (() => {
    if (idx === 0)
      return '咬下第一口汉堡：牙齿把食物磨碎，唾液淀粉酶开始分解淀粉（有甜味了吧？）。食团经吞咽进入食管——"化学之旅"正式开始。';
    if (idx === 1)
      return '胃：盐酸环境（pH≈1.8）激活胃蛋白酶，把蛋白质切成长短不一的多肽；肌肉蠕动把食物搅拌成糊状"食糜"。胃只吸收少量水和酒精——"喝酒伤胃"就是这么直接。';
    if (idx === 2)
      return '食糜进入小肠第一段（十二指肠）：胰液与胆汁同时注入。胆汁不含酶却能把脂肪"打散"成微粒；胰液携带三大消化酶集团军全线出击。';
    if (idx === 3)
      return '小肠绒毛：每根绒毛都是一条"微型物流通道"——葡萄糖、氨基酸进入毛细血管，甘油脂肪酸进入淋巴管。约 90% 的营养物质在这里被吸收。';
    return '最后的"回收站"大肠：剩余水分和无机盐被吸收，膳食纤维被菌群发酵，残渣形成粪便。整趟旅程 24~72 小时——从一口汉堡到全身的能量与建材。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">消化之旅的站点</p>
              <div className="grid gap-1.5">
                {ORDER.map((id, i) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setIdx(i)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      idx === i
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {STATIONS[id].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              本站酶：<span className="font-semibold">{cur.enzyme}</span>
              <br />
              产物：<span className="font-semibold text-[#0e6f75]">{cur.product}</span>
            </div>
          </>
        }
      >
        <SceneBox label={`一口汉堡的消化之旅：${cur.label}`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 消化道简图 */}
            <path d="M60 70 q 60 -24 120 0 q 40 16 60 40 q 30 36 60 44 q 40 10 60 36 q -10 26 -50 22 q -60 -6 -110 -20 q -70 -18 -100 -52 q -16 -36 0 -70 Z" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2.6" />
            {/* 站点标记 */}
            {ORDER.map((id, i) => {
              const pts = [
                { x: 92, y: 78 },
                { x: 148, y: 108 },
                { x: 210, y: 130 },
                { x: 268, y: 152 },
                { x: 330, y: 182 },
              ];
              const active = idx >= i;
              return (
                <g key={id}>
                  <circle cx={pts[i].x} cy={pts[i].y} r={idx === i ? 11 : 7} fill={active ? '#0e6f75' : '#ffffff'} stroke="#0e6f75" strokeWidth="2.2" />
                  <text x={pts[i].x} y={pts[i].y + 4} textAnchor="middle" fontSize={idx === i ? 10 : 8.5} fill={idx === i ? '#ffffff' : '#0e6f75'} fontWeight="700">{i + 1}</text>
                </g>
              );
            })}
            {/* 当前站详情 */}
            <g>
              <rect x="46" y="196" width="170" height="54" rx="10" fill={idx >= 1 && idx <= 3 ? '#fdf1cf' : '#eef4f6'} stroke={idx >= 1 && idx <= 3 ? '#8a671b' : '#4d7ea8'} strokeWidth="2.2" />
              <text x="131" y="218" textAnchor="middle" fontSize="10" fill="#37585f" fontWeight="700">{cur.label}</text>
              <text x="131" y="238" textAnchor="middle" fontSize="9.5" fill="#59767c">{cur.enzyme}</text>
            </g>
            <g>
              <rect x="234" y="196" width="160" height="54" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
              <text x="314" y="218" textAnchor="middle" fontSize="10" fill="#2f6f2a" fontWeight="700">消化产物</text>
              <text x="314" y="240" textAnchor="middle" fontSize="9.5" fill="#3f7f3a">{cur.product}</text>
            </g>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
