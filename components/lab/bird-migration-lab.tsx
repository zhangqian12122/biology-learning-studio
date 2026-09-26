'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（候鸟迁徙导航）',
    lines: [
      <>候鸟每年在<span className="font-semibold">繁殖地与越冬地</span>之间往返迁徙：北极燕鸥往返 7 万多公里，相当于绕地球近两圈。</>
      ,
      <>导航"罗盘"三件套：<span className="font-semibold">太阳罗盘</span>（白天·结合体内生物钟校正方位）、<span className="font-semibold">星辰罗盘</span>（夜间以北极星附近旋转中心定向）、<span className="font-semibold">地磁罗盘</span>（感应地磁场·阴天也能导航）。</>
      ,
      <>迁徙行为是<span className="font-semibold">先天程序与后天经验</span>的结合：方向感天生（部分种类还要跟长辈学），路线细节靠经验修正。</>
      ,
    ],
  },
  {
    title: '迁徙前的准备',
    lines: [
      <>① 蓄能：出发前大量进食，体脂可从 15% 增加到 <span className="font-semibold">50%</span>——脂肪是长途飞行的"燃料"。</>
      ,
      <>② 时机：光照变化（日长）触发体内生物钟与激素变化，"通知"该出发了。</>
      ,
      <>③ 停歇地：中途湿地是"加油站"——停歇地的破坏是候鸟数量下降的重要原因。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>斑尾塍鹬可以从阿拉斯加<span className="font-semibold">连飞 11 天直达新西兰</span>（约 1.2 万公里不吃不喝）——刷新鸟类连续飞行纪录。</>
      ,
      <>保护意义：迁徙路线跨越多个国家——保护候鸟需要<span className="font-semibold">国际协作</span>（沿线"加油站"湿地一个都不能少）。</>
      ,
      <>与印随对比：印随是幼年"认亲"；迁徙导航是"认路"——同样体现先天与后天的结合。</>
      ,
    ],
  },
];

type Compass = 'sun' | 'star' | 'magnet';

const COMPASS: Record<Compass, { label: string; note: string }> = {
  sun: { label: '太阳罗盘', note: '白天定向·结合体内生物钟校正' },
  star: { label: '星辰罗盘', note: '夜间以星空旋转中心定向' },
  magnet: { label: '地磁罗盘', note: '感应地磁场·阴天云雾也可用' },
};

const LEGS = ['繁殖地出发', '越过海洋', '中途停歇补给', '抵达越冬地'];

export function BirdMigrationLab() {
  const [compass, setCompass] = useState<Compass>('sun');
  const [leg, setLeg] = useState(0);
  const fuel = [100, 100, 62, 40, 15][Math.min(leg, 4)];
  const km = [0, 1200, 5400, 11500][Math.min(leg, 4)];

  const observation = (() => {
    if (leg === 0)
      return '北极苔原的夏天结束了：斑尾塍鹬的体重已从 200 克"吃"到 600 克（脂肪占一半），罗盘就绪。选择导航方式，开始这段跨越半球的旅程。';
    if (compass === 'sun')
      return `阶段 ${leg + 1}：白天靠太阳罗盘飞行——但太阳每小时移动 15°，必须结合体内生物钟"修正时钟差"，否则会偏航。当前已飞 ${km} 公里，体能剩余 ${fuel}%。`;
    if (compass === 'star')
      return `阶段 ${leg + 1}：夜间依靠星辰罗盘——识别北极星附近星空的旋转中心来定向。已飞 ${km} 公里，体能 ${fuel}%。幼鸟第一次迁徙时需要跟长辈学习这份"星图"。`;
    return `阶段 ${leg + 1}：地磁罗盘全天候工作——阴天、海洋上空都可靠地磁场方向感导航。已飞 ${km} 公里，体能 ${fuel}%。三种罗盘配合使用，误差才够小。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择导航罗盘</p>
              <div className="grid gap-1.5">
                {(Object.keys(COMPASS) as Compass[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCompass(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      compass === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {COMPASS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {COMPASS[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLeg((l) => Math.min(4, l + 1))}
              disabled={leg >= 4}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              🐦 飞往下一站（{leg}/4）
            </button>
            <button type="button" onClick={() => setLeg(0)} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              回到繁殖地
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              体能储备：<span className="text-base font-bold text-[#b0483a]">{fuel}%</span> · 累计 {km} km
            </div>
          </>
        }
      >
        <SceneBox label="候鸟迁徙导航（斑尾塍鹬：阿拉斯加 → 新西兰）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 繁殖地 */}
            <g>
              <ellipse cx="70" cy="80" rx="42" ry="26" fill="#c9d8b0" stroke="#4a7a3a" strokeWidth="2.4" />
              <text x="70" y="84" textAnchor="middle" fontSize="10" fill="#2f6f2a" fontWeight="700">繁殖地</text>
              <text x="70" y="120" textAnchor="middle" fontSize="9.5" fill="#59767c">阿拉斯加</text>
            </g>
            {/* 越冬地 */}
            <g>
              <ellipse cx="380" cy="200" rx="42" ry="26" fill="#d8c9a0" stroke="#8a6a2a" strokeWidth="2.4" />
              <text x="380" y="204" textAnchor="middle" fontSize="10" fill="#8a6a2a" fontWeight="700">越冬地</text>
              <text x="380" y="240" textAnchor="middle" fontSize="9.5" fill="#59767c">新西兰</text>
            </g>
            {/* 路线 */}
            <path d="M100 70 Q 220 20 350 70 Q 420 110 380 176" fill="none" stroke="#4d7ea8" strokeWidth="3" strokeDasharray="7 5" />
            {/* 停歇地 */}
            <circle cx="250" cy="52" r="7" fill="#e8a03a" stroke="#8a671b" strokeWidth="2" />
            <text x="252" y="40" fontSize="9" fill="#8a671b" fontWeight="600">黄海停歇地</text>
            {/* 候鸟 */}
            <g>
              <ellipse cx={70 + (km / 11500) * 300} cy={70 + (km / 11500) * 110} rx="14" ry="7" fill="#7a8aa8" stroke="#3a4a6a" strokeWidth="2" transform={`rotate(18 ${70 + (km / 11500) * 300} ${70 + (km / 11500) * 110})`} />
              <path d={`M${82 + (km / 11500) * 300} ${66 + (km / 11500) * 110} l 14 -5 m -14 9 l 14 3`} stroke="#3a4a6a" strokeWidth="2" strokeLinecap="round" />
            </g>
            {/* 罗盘标注 */}
            <g>
              <text x="60" y="180" fontSize="10" fill="#8a671b" fontWeight="700">罗盘：{COMPASS[compass].label}</text>
              <text x="60" y="196" fontSize="9" fill="#a5761d">{COMPASS[compass].note}</text>
            </g>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
