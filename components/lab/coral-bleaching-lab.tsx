'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（珊瑚白化）',
    lines: [
      <>珊瑚的"颜色"不是自己的：珊瑚虫体内住着<span className="font-semibold">虫黄藻</span>（共生的单细胞藻类），藻类光合作用为珊瑚提供约 <span className="font-semibold">90% 的能量</span>，珊瑚则为藻类提供住所与营养盐。</>
      ,
      <>海温超过夏季均温 1~2°C 并持续时，虫黄藻的光合系统受损、产生活性氧——珊瑚把藻类<span className="font-semibold">排出体外</span>：失去颜色的白色骨骼透出来，这就是"白化"。</>
      ,
      <>白化不等于死亡：及时降温，珊瑚能重新摄取藻类恢复；但<span className="font-semibold">热浪持续数周</span>，断粮的珊瑚会饿死，继而被藻类覆盖。</>
      ,
    ],
  },
  {
    title: '为什么越来越频繁',
    lines: [
      <>全球变暖使<span className="font-semibold">海洋热浪</span>更频繁更长：2016 年大堡礁 93% 的珊瑚出现白化，2009—2018 年全球已损失约 14% 的珊瑚礁。</>
      ,
      <>珊瑚礁只占海底面积的 0.1%，却养育着约 <span className="font-semibold">25% 的海洋物种</span>——"海底热带雨林"垮塌将牵动整条食物链与数亿人的生计。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>珊瑚白化是<span className="font-semibold">种间共生被环境打破</span>的教科书案例（课本"种间关系"）：温度变化让"藻供能、珊瑚供房"的合作崩盘。</>
      ,
      <>白化是珊瑚的<span className="font-semibold">应激反应</span>而非简单病变——"赶走生病员工（藻类）"，赌的是降温后重新"招聘"。</>
      ,
      <>保护路径：<span className="font-semibold">减排治本</span> + 移植修复 + 选育耐热珊瑚品系（"辅助演化"）——保护生物学多管齐下的缩影。</>
      ,
    ],
  },
];

type Scenario = 'normal' | 'warm' | 'heatwave';

const SCENARIOS: Record<Scenario, { label: string; note: string; temp: number }> = {
  normal: { label: '正常海水 26°C', note: '虫黄藻安居·光合正常', temp: 26 },
  warm: { label: '持续升温 29°C', note: '夏季均温之上 1~2°C', temp: 29 },
  heatwave: { label: '海洋热浪 31°C', note: '极端高温连击', temp: 31 },
};

export function CoralBleachingLab() {
  const [scenario, setScenario] = useState<Scenario>('normal');
  const [health, setHealth] = useState<number[]>([96]);
  const [algae, setAlgae] = useState<number[]>([100]);
  const [week, setWeek] = useState(0);

  const step = () => {
    if (week >= 8) return;
    const h = health[health.length - 1];
    const a = algae[algae.length - 1];
    let nh = h;
    let na = a;
    if (scenario === 'normal') {
      nh = Math.min(100, h + 4);
      na = Math.min(100, a + 6);
    } else if (scenario === 'warm') {
      nh = Math.max(0, h - 7);
      na = Math.max(0, a - 12);
    } else {
      nh = Math.max(0, h - 18);
      na = Math.max(0, a - 25);
    }
    setHealth((prev) => [...prev, nh]);
    setAlgae((prev) => [...prev, na]);
    setWeek((w) => w + 1);
  };

  const reset = () => {
    setHealth([96]);
    setAlgae([100]);
    setWeek(0);
  };

  const cur = {
    h: health[health.length - 1],
    a: algae[algae.length - 1],
  };
  const bleached = 100 - cur.a;

  const observation = (() => {
    if (week === 0)
      return '珊瑚的颜色来自体内的虫黄藻（图上的棕色小点）。选择一种海水温度情景，按周推进，观察共生如何被高温拆散——以及珊瑚还有没有"回头路"。';
    if (scenario === 'normal')
      return `第 ${week} 周（26°C）：虫黄藻密度 ${cur.a}%、珊瑚健康度 ${cur.h}%——温度适宜，共生体吃好喝好，受损的珊瑚也在慢慢恢复。`;
    if (scenario === 'warm')
      return `第 ${week} 周（29°C）：珊瑚开始排藻，虫黄藻只剩 ${cur.a}%，白化程度 ${bleached}%——还没死！若现在降温，仍能重新"招募"藻类恢复。`;
    if (cur.h < 15)
      return `第 ${week} 周（31°C）：珊瑚健康度仅剩 ${cur.h}%——断粮太久已经死亡。珊瑚礁失去建筑师，依赖它的 25% 海洋物种连带遭殃。`;
    return `第 ${week} 周（31°C）：重度白化（虫黄藻仅剩 ${cur.a}%）——连续热浪 4~6 周，珊瑚就会饿死。热浪再不退，就来不及了。`;
  })();

  const W = 300;
  const H = 120;
  const X0 = 50;
  const Y0 = 226;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / 8) * W,
    y: Y0 - (v / 100) * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const bodyColor = cur.h <= 15 ? '#a8a8a0' : cur.a <= 30 ? '#efe8da' : '#c9854a';
  const polypColor = cur.h <= 15 ? '#8a8a84' : '#e8a05a';

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择海水温度情景</p>
              <div className="grid gap-1.5">
                {(Object.keys(SCENARIOS) as Scenario[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setScenario(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      scenario === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {SCENARIOS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {SCENARIOS[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={week >= 8}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进一周（{week}/8）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              珊瑚健康度：<span className="text-base font-bold text-[#0a626a]">{cur.h}%</span>
              <br />
              白化程度：<span className="text-base font-bold text-[#b0483a]">{bleached}%</span>
            </div>
          </>
        }
      >
        <SceneBox label="珊瑚共生与白化模拟（虫黄藻=珊瑚的「随身厨房」）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 海水 */}
            <rect x="10" y="12" width="200" height="196" rx="10" fill="#e4f2f8" stroke="#7ab0c9" strokeWidth="1.6" />
            <text x="110" y="32" textAnchor="middle" fontSize="11" fill="#3a6a8a">水温 {SCENARIOS[scenario].temp}°C</text>
            {/* 珊瑚枝 */}
            <path d="M110 196 L110 140 Q108 118 122 102 M110 152 Q90 140 84 120 M110 162 Q132 152 140 132" fill="none" stroke={bodyColor} strokeWidth="10" strokeLinecap="round" />
            <path d="M110 196 L110 150" fill="none" stroke="#a8703a" strokeWidth="11" strokeLinecap="round" opacity="0.55" />
            {/* 珊瑚虫触手 */}
            <circle cx="122" cy="100" r="5" fill={polypColor} />
            <circle cx="84" cy="118" r="4.4" fill={polypColor} />
            <circle cx="140" cy="130" r="4.4" fill={polypColor} />
            {/* 虫黄藻小点 */}
            {[
              [104, 176], [116, 160], [100, 150], [114, 138], [106, 128],
              [92, 134], [126, 146], [120, 116], [134, 122], [88, 150],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="#6a8a3a" opacity={cur.a > (i + 1) * 9 ? 0.9 : 0.12} />
            ))}
            {/* 状态标签 */}
            {cur.h <= 15 ? (
              <text x="110" y="60" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">已死亡 · 被藻类覆盖中</text>
            ) : cur.a <= 30 ? (
              <text x="110" y="60" textAnchor="middle" fontSize="12" fill="#b0483a" fontWeight="800">重度白化 · 白骨外露</text>
            ) : cur.a < 100 ? (
              <text x="110" y="60" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">白化进行中 · 排藻断粮</text>
            ) : (
              <text x="110" y="60" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">共生正常 · 藻类供能</text>
            )}
            {/* 礁石与小鱼 */}
            <path d="M28 200 q 40 -14 84 0 q -40 10 -84 0 Z" fill="#8a9a9f" />
            <path d="M212 92 q 10 -8 18 0 q 8 -8 16 0 l -4 8 l -26 0 Z" fill="#e8a05a" />
            <path d="M246 96 l 8 -6 l 0 12 Z" fill="#e8a05a" />
            <text x="110" y="226" textAnchor="middle" fontSize="10" fill="#59767c">棕色小点 = 虫黄藻（随密度减少而消失）</text>
            {/* 曲线 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 12} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 8} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 4, 8].map((t) => (
              <text key={t} x={X0 + (t / 8) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{t}周
              </text>
            ))}
            <path d={line(health)} fill="none" stroke="#0e8a75" strokeWidth="2.6" strokeLinecap="round" />
            <path d={line(algae)} fill="none" stroke="#b0483a" strokeWidth="2.6" strokeDasharray="5 3" strokeLinecap="round" />
            <circle cx={toXY(week, cur.h).x} cy={toXY(week, cur.h).y} r="3.2" fill="#0e8a75" />
            <circle cx={toXY(week, cur.a).x} cy={toXY(week, cur.a).y} r="3.2" fill="#b0483a" />
            <text x={X0 + 6} y={Y0 - H - 10} fontSize="9.5" fill="#0e8a75" fontWeight="700">— 健康度</text>
            <text x={X0 + 66} y={Y0 - H - 10} fontSize="9.5" fill="#b0483a" fontWeight="700">-- 虫黄藻密度</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
