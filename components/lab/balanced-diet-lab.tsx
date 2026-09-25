'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '原理：三大营养素与能量',
    lines: [
      <>食物提供三大供能营养素：<span className="font-semibold">糖类（4 kcal/g）、脂肪（9 kcal/g）、蛋白质（4 kcal/g）</span>，另有膳食纤维、维生素、矿物质与水。</>
      ,
      <>膳食指南推荐供能比：糖类 <span className="font-semibold">50%~65%</span>、脂肪 <span className="font-semibold">20%~30%</span>、蛋白质 <span className="font-semibold">10%~20%</span>；中学生每日约需 2000~2400 kcal。</>
      ,
      <>糖类是<span className="font-semibold">主要供能物质</span>（尤其大脑几乎只烧葡萄糖）；脂肪是<span className="font-semibold">储能物质</span>；蛋白质是<span className="font-semibold">结构与功能物质</span>，供能是"兼职"。</>
      ,
    ],
  },
  {
    title: '配餐思路',
    lines: [
      <>① 主食打底（提供葡萄糖，大脑的"燃料"）；② 优质蛋白（蛋奶豆肉——组织更新与酶的原料）；③ 足量蔬果（维生素 C、膳食纤维）；④ 少油少糖（脂肪与添加糖供能比不超标）。</>
      ,
      <>早餐尤其关键：一夜空腹后血糖偏低——只吃精制糖类（甜面包+奶茶）血糖大起大落，上午第二节课就饿。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>供能顺序：<span className="font-semibold">糖类 → 脂肪 → 蛋白质</span>；节食减脂的本质是让身体动用脂肪储备，但极端节食会分解自身蛋白（伤身）。</>
      ,
      <>"减肥不吃主食"不可取：糖类摄入过低会<span className="font-semibold">酮体升高</span>、注意力下降——脂肪必须在糖类辅助下才能彻底氧化。</>
      ,
      <>均衡的判断：不只是"吃够了热量"，更是<span className="font-semibold">各营养素比例合理 + 微量营养素齐全</span>——"热量超标、营养不足"可以同时发生。</>
      ,
    ],
  },
];

type Meal = 'good' | 'sweet' | 'fried';

const MEALS: Record<Meal, { label: string; items: string; carbs: number; fat: number; protein: number; kcal: number; grade: string; color: string }> = {
  good: {
    label: '均衡早餐', items: '燕麦粥 + 水煮蛋 + 牛奶 + 苹果',
    carbs: 58, fat: 24, protein: 18, kcal: 520, grade: '优秀：比例符合推荐区间', color: '#3f7f3a',
  },
  sweet: {
    label: '甜食早餐', items: '奶油面包 + 奶茶（全糖）',
    carbs: 68, fat: 26, protein: 6, kcal: 860, grade: '偏差：添加糖超标·蛋白质不足', color: '#a54838',
  },
  fried: {
    label: '高油早餐', items: '油条 + 煎蛋 + 可乐',
    carbs: 48, fat: 44, protein: 8, kcal: 940, grade: '偏差：脂肪供能比远超 30%', color: '#a54838',
  },
};

const RECOMMEND: Record<'carbs' | 'fat' | 'protein', [number, number]> = {
  carbs: [50, 65],
  fat: [20, 30],
  protein: [10, 20],
};

function inRange(v: number, r: [number, number]) {
  return v >= r[0] && v <= r[1];
}

export function BalancedDietLab() {
  const [meal, setMeal] = useState<Meal>('good');
  const cur = MEALS[meal];
  const verdict = inRange(cur.carbs, RECOMMEND.carbs) && inRange(cur.fat, RECOMMEND.fat) && inRange(cur.protein, RECOMMEND.protein);

  const observation = (() => {
    if (meal === 'good')
      return '这份早餐三大营养素比例全部落在推荐区间：燕麦提供缓释糖类（血糖平稳），鸡蛋牛奶提供优质蛋白与钙，苹果补膳食纤维与维生素 C——大脑有稳定"燃料"，上午不再饿。';
    if (meal === 'sweet')
      return '奶油面包 + 全糖奶茶：添加糖让供能比冲到 68%，蛋白质只有 6%——血糖像坐过山车，两小时后反而更饿；蛋白质长期不足会影响免疫与组织修复。"热量超标、营养不足"的典型。';
    return '油条 + 煎蛋 + 可乐：脂肪供能比 44%，远超 30% 的推荐上限，总热量接近一天需求的近一半——长期如此增加肥胖与血脂异常风险。油脂"热量密度"是糖类的两倍多，少量即爆表。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择一份早餐</p>
              <div className="grid gap-1.5">
                {(Object.keys(MEALS) as Meal[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setMeal(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      meal === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {MEALS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {MEALS[id].items}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              总热量：<span className="text-base font-bold text-[#0e6f75]">{cur.kcal}</span> kcal（推荐早餐约 600）
              <br />
              评价：<span className="font-semibold" style={{ color: cur.color }}>{cur.grade}</span>
            </div>
          </>
        }
      >
        <SceneBox label="三大营养素供能比 vs 推荐区间（绿带 = 推荐范围）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 三条供能比条 */}
            {([
              { name: '糖类', v: cur.carbs, r: RECOMMEND.carbs, color: '#e0b83a', y: 66 },
              { name: '脂肪', v: cur.fat, r: RECOMMEND.fat, color: '#c96a4a', y: 128 },
              { name: '蛋白质', v: cur.protein, r: RECOMMEND.protein, color: '#5a8ab5', y: 190 },
            ] as const).map((row) => {
              const inR = inRange(row.v, row.r);
              const barW = row.v * 3.6;
              return (
                <g key={row.name}>
                  {/* 推荐区间带 */}
                  <rect x={40 + row.r[0] * 3.6} y={row.y} width={(row.r[1] - row.r[0]) * 3.6} height={38} fill="#d9efe2" opacity="0.75" />
                  {/* 实际条 */}
                  <rect x={40} y={row.y + 5} width={barW} height={28} rx="6" fill={inR ? row.color : '#c94a4a'} stroke={inR ? 'none' : '#a53030'} strokeWidth={inR ? 0 : 2} />
                  <text x={16} y={row.y + 24} fontSize="11.5" fill="#37585f" fontWeight="700">{row.name}</text>
                  <text x={barW + 48} y={row.y + 24} fontSize="11.5" fill={inR ? '#2f6f2a' : '#a53030'} fontWeight="800">
                    {row.v}%
                  </text>
                  <text x={40 + ((row.r[0] + row.r[1]) / 2) * 3.6} y={row.y + 24} textAnchor="middle" fontSize="9.5" fill="#4a7a4a" fontWeight="600">
                    推荐 {row.r[0]}~{row.r[1]}%
                  </text>
                </g>
              );
            })}
            <text x="220" y="38" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">
              {verdict ? '✓ 三项比例均达标' : '✗ 有比例越界（红条 + 红框）'}
            </text>
            <text x="420" y="246" textAnchor="end" fontSize="9.5" fill="#799398">条长 = 供能占总热量的百分比</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
