'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（血液透析）',
    lines: [
      <>肾功能衰竭时，尿素等代谢废物排不出去，在内环境里越积越多（<span className="font-semibold">尿毒症</span>）——透析机就是患者的"体外肾"。</>
      ,
      <>透析器里布满<span className="font-semibold">半透膜</span>中空纤维管：血液在管内流动、透析液在管外反向流动，<span className="font-semibold">尿素等小分子废物</span>顺浓度梯度穿过膜进入透析液被带走。</>
      ,
      <>血细胞、血小板、大分子血浆蛋白<span className="font-semibold">穿不过半透膜</span>留在血里——半透膜的"选择性"正是人工肾的关键。</>
      ,
    ],
  },
  {
    title: '透析液里有什么讲究',
    lines: [
      <>透析液<span className="font-semibold">不含尿素</span>（保持"零浓度"制造梯度），却含正常浓度的钠、钾、钙和葡萄糖——既带走废物，又不让身体必需的物质白白流失。</>
      ,
      <>血流与透析液<span className="font-semibold">反向流动</span>，让全程都维持浓度差，清除效率更高。</>
      ,
      <>透析时需加<span className="font-semibold">抗凝剂（肝素）</span>防止血液在膜外凝固——机体的凝血机制在"陌生的管道"里照样会启动。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>透析只能<span className="font-semibold">替代肾的滤过功能</span>，不能替代肾小管的重吸收与内分泌功能（促红细胞生成素等）——所以它是"维持"，肾移植才是根治（联系移植排斥）。</>
      ,
      <>患者每周需透析 2~3 次、每次约 4 小时——<span className="font-semibold">内环境稳态</span>一旦只能靠机器维持，生活代价巨大，这也反证了肾"天天干活"的价值。</>
      ,
      <>半透膜原理与课本<span className="font-semibold">渗透作用</span>一致：水从低浓度溶液一侧向高浓度一侧渗透，溶质能否穿膜看膜孔大小。</>
      ,
    ],
  },
];

type Speed = 'slow' | 'normal' | 'fast';

const SPEEDS: Record<Speed, { label: string; note: string; clear: number }> = {
  slow: { label: '低速透析液', note: '清除慢·更温和（低血压者）', clear: 0.12 },
  normal: { label: '标准流速', note: '常规处方', clear: 0.2 },
  fast: { label: '高速透析液', note: '清除快·负担大', clear: 0.28 },
};

export function BloodDialysisLab() {
  const [speed, setSpeed] = useState<Speed>('normal');
  const [urea, setUrea] = useState<number[]>([24]);
  const [halfHours, setHalfHours] = useState(0);

  const step = () => {
    if (halfHours >= 8) return;
    const u = urea[urea.length - 1];
    const nu = Math.max(2, u * (1 - SPEEDS[speed].clear) + 0.6);
    setUrea((prev) => [...prev, +nu.toFixed(1)]);
    setHalfHours((h) => h + 1);
  };

  const reset = () => {
    setUrea([24]);
    setHalfHours(0);
  };

  const cur = urea[urea.length - 1];
  const cleared = Math.round(((24 - cur) / 24) * 100);

  const observation = (() => {
    if (halfHours === 0)
      return '尿毒症患者透析前的血尿素约 24 mmol/L（正常上限 7.1）。选好透析液流速，按 30 分钟推进一次 4 小时的透析——看半透膜怎么把废物"洗"出去。';
    if (cur > 10)
      return `已透析 ${halfHours * 30} 分钟：血尿素 ${cur} mmol/L（清除 ${cleared}%）——小分子废物正顺浓度梯度穿过半透膜，血细胞和大分子蛋白留在管内。`;
    if (cur > 6)
      return `已透析 ${halfHours * 30} 分钟：血尿素降到 ${cur} mmol/L——透析液反向流动维持着浓度差，效率依然在线。`;
    return `本次透析完成（${halfHours} 小时）：血尿素 ${cur} mmol/L≈安全范围。但透析只替代了"滤过"，患者仍需每周来 2~3 次——稳态的代价由此可知。`;
  })();

  const W = 300;
  const H = 96;
  const X0 = 116;
  const Y0 = 262;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / 8) * W,
    y: Y0 - (v / 26) * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">透析液流速</p>
              <div className="grid gap-1.5">
                {(Object.keys(SPEEDS) as Speed[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSpeed(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      speed === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {SPEEDS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {SPEEDS[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={halfHours >= 8}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进 30 分钟（{halfHours * 30}/240 分钟）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              血尿素：<span className="text-base font-bold text-[#b0483a]">{cur}</span> mmol/L
              <br />
              累计清除：<span className="font-semibold text-[#0a626a]">{cleared}%</span>
            </div>
          </>
        }
      >
        <SceneBox label="血液透析：半透膜上的「单向带走」" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 透析器 */}
            <rect x="34" y="34" width="150" height="176" rx="14" fill="#f2f8fa" stroke="#5a7a8a" strokeWidth="2.6" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <line key={i} x1="48" y1={52 + i * 22} x2="170" y2={52 + i * 22} stroke="#d98a8a" strokeWidth="5" strokeLinecap="round" />
            ))}
            <text x="109" y="26" textAnchor="middle" fontSize="12.5" fill="#37585f" fontWeight="800">透析器（人工肾）</text>
            <text x="109" y="226" textAnchor="middle" fontSize="11" fill="#59767c">红线=中空纤维半透膜内：血液</text>
            {/* 废物小点：早期多、后期少 */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
              const col = i % 4;
              const row = Math.floor(i / 4);
              const visible = cur > 2 + i * 2.4;
              return (
                <circle key={i} cx={60 + col * 30} cy={62 + row * 110} r="3" fill={visible ? '#8a5a2a' : '#e5efef'} />
              );
            })}
            {/* 血流方向与透析液方向 */}
            <path d="M24 120 L34 120" fill="none" stroke="#c93a3a" strokeWidth="6" strokeLinecap="round" />
            <path d="M184 120 L194 120" fill="none" stroke="#c93a3a" strokeWidth="6" strokeLinecap="round" />
            <text x="16" y="106" fontSize="11.5" fill="#c93a3a" fontWeight="700">动脉端→</text>
            <text x="196" y="106" fontSize="11.5" fill="#c93a3a" fontWeight="700">→静脉端</text>
            <text x="196" y="150" fontSize="11" fill="#3a6a8a">← 透析液反向流动</text>
            {/* 说明框 */}
            <rect x="216" y="34" width="200" height="104" rx="10" fill="#eef7f6" stroke="#82c6c0" strokeWidth="2" />
            <text x="316" y="54" textAnchor="middle" fontSize="12" fill="#0a626a" fontWeight="800">半透膜的选择性</text>
            <text x="228" y="76" fontSize="11.5" fill="#2f6f2a">✓ 尿素·肌酐·多余钾（小分子）穿出</text>
            <text x="228" y="96" fontSize="11.5" fill="#2f6f2a">✓ 葡萄糖·电解质按需进出</text>
            <text x="228" y="116" fontSize="11.5" fill="#a53030">✗ 血细胞·血小板·血浆蛋白（大分子）留下</text>
            <text x="316" y="152" textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="700">废物"只出不进"=浓度梯度方向</text>
            {/* 曲线 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 10} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 8} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 2, 4, 6, 8].map((t) => (
              <text key={t} x={X0 + (t / 8) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                {t * 30}分
              </text>
            ))}
            <path d={line(urea)} fill="none" stroke="#b0483a" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx={toXY(halfHours, cur).x} cy={toXY(halfHours, cur).y} r="3.2" fill="#b0483a" />
            <text x={X0 + 4} y={Y0 - H - 10} fontSize="9.5" fill="#b0483a" fontWeight="700">血尿素浓度（mmol/L）</text>
            <text x="428" y="290" textAnchor="end" fontSize="9.5" fill="#799398">透析时长（分钟）</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
