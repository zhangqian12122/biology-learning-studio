'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（生物入侵）',
    lines: [
      <>生物入侵：<span className="font-semibold">外来物种</span>被人为或自然途径带入新环境后，因<span className="font-semibold">缺少天敌、资源空余、繁殖力强</span>而迅速蔓延，挤压本地物种、破坏生态平衡。</>
      ,
      <>入侵种群常呈<span className="font-semibold">"J"型爆发</span>：初期隐蔽潜伏，突破瓶颈后指数扩张——发现时往往已成规模。</>
      ,
      <>典型案例：水葫芦（堵塞河道）· 福寿螺（啃食水稻）· 加拿大一枝黄花（排挤本地植物）· 蔗扁蛾。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>模拟一片湿地：本地物种（芦苇·小鱼·水鸟）与外来入侵种（水葫芦）。</>
      ,
      <>三种应对策略：<span className="font-semibold">不作为</span>（任其蔓延）· <span className="font-semibold">人工打捞</span>（物理清除，费人力）· <span className="font-semibold">生物防治</span>（引入专一性天敌，如水葫芦象甲）。</>
      ,
      <>观察点：入侵初期"不作为"的代价；天敌防治的"专一性"为什么关键。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>入侵成功的条件：<span className="font-semibold">繁殖力强 · 传播快 · 新环境缺少天敌</span>——与本地物种竞争光、水、空间（种间竞争）。</>
      ,
      <>引入天敌要"专一性"强：否则天敌本身可能成为新的入侵种（澳大利亚的"兔灾引狐"教训）。</>
      ,
      <>个人能做什么：<span className="font-semibold">不随意放生宠物</span>（巴西龟·鳄雀鳝）、不携带境外活体植物种子入境——检疫是第一道防线。</>
      ,
    ],
  },
];

type Strategy = 'none' | 'manual' | 'biocontrol';

const STRATEGIES: Record<Strategy, { label: string; note: string }> = {
  none: { label: '不作为', note: '看"J"型爆发的代价' },
  manual: { label: '人工打捞', note: '物理清除，费时费力但安全' },
  biocontrol: { label: '生物防治（象甲）', note: '引入专一性天敌水葫芦象甲' },
};

const YEARS = 8;

export function InvasiveSimLab() {
  const [strategy, setStrategy] = useState<Strategy>('none');
  const [invader, setInvader] = useState<number[]>([10]);
  const [native, setNative] = useState<number[]>([80]);
  const year = invader.length - 1;

  const step = () => {
    if (year >= YEARS) return;
    const inv = invader[invader.length - 1];
    const nat = native[native.length - 1];
    let ni = inv;
    let nn = nat;
    if (strategy === 'none') {
      ni = Math.min(100, inv * 1.8 + 2);
      nn = Math.max(3, nat * (1 - inv / 130));
    } else if (strategy === 'manual') {
      ni = Math.max(2, inv * 0.55);
      nn = Math.min(80, nat + 4);
    } else {
      ni = Math.max(1, inv * 0.3);
      nn = Math.min(80, nat + 8);
    }
    setInvader((prev) => [...prev, ni]);
    setNative((prev) => [...prev, nn]);
  };

  const reset = () => {
    setInvader([10]);
    setNative([80]);
  };

  const W = 300;
  const H = 130;
  const X0 = 50;
  const Y0 = 200;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / YEARS) * W,
    y: Y0 - (v / 100) * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const curI = invader[invader.length - 1];
  const curN = native[native.length - 1];

  const observation = (() => {
    if (year === 0)
      return '湿地里本地芦苇与小鱼繁荣（覆盖度 80%），角落里刚发现 10 株水葫芦。选择一种应对策略，按年推进 8 年，看入侵种与本地种的较量。';
    if (strategy === 'none')
      return `第 ${year} 年：不作为的代价显现——水葫芦铺满 ${curI.toFixed(0)}% 水面，遮光耗氧，本地物种退缩到 ${curN.toFixed(0)}%。"J"型爆发：初期毫不起眼，转折点后再难收拾。`;
    if (strategy === 'manual')
      return `第 ${year} 年：人工打捞把水葫芦压回 ${curI.toFixed(0)}%，本地物种恢复到 ${curN.toFixed(0)}%。物理清除安全有效，但需要持续投入人力——来年仍会再长。`;
    return `第 ${year} 年：专一性天敌水葫芦象甲只吃水葫芦，把入侵者压制到 ${curI.toFixed(0)}%，本地物种恢复到 ${curN.toFixed(0)}%——"以虫治草"长期且低成本。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择应对策略（可随时切换）</p>
              <div className="grid gap-1.5">
                {(Object.keys(STRATEGIES) as Strategy[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setStrategy(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      strategy === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {STRATEGIES[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {STRATEGIES[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={year >= YEARS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进一年（{year}/{YEARS}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置湿地
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              水葫芦覆盖 {curI.toFixed(0)}% · 本地物种 {curN.toFixed(0)}%
            </div>
          </>
        }
      >
        <SceneBox label="湿地入侵模拟：水葫芦覆盖度 vs 本地物种存留" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 12} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 2, 4, 6, 8].map((t) => (
              <text key={t} x={X0 + (t / YEARS) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{t}年
              </text>
            ))}
            {/* 入侵曲线 */}
            <path d={line(invader)} fill="none" stroke="#b0483a" strokeWidth="3" strokeLinecap="round" />
            {invader.map((v, i) => (
              <circle key={`i${i}`} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3" fill="#b0483a" />
            ))}
            {/* 本地曲线 */}
            <path d={line(native)} fill="none" stroke="#3f7f3a" strokeWidth="2.8" strokeDasharray="6 4" />
            {native.map((v, i) => (
              <circle key={`n${i}`} cx={toXY(i, v).x} cy={toXY(i, v).y} r="2.8" fill="#3f7f3a" />
            ))}
            {/* 图例 */}
            <g>
              <line x1={X0 + 8} y1={Y0 - H - 2} x2={X0 + 30} y2={Y0 - H - 2} stroke="#b0483a" strokeWidth="3" />
              <text x={X0 + 36} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73" fontWeight="600">水葫芦覆盖%</text>
              <line x1={X0 + 150} y1={Y0 - H - 2} x2={X0 + 172} y2={Y0 - H - 2} stroke="#3f7f3a" strokeWidth="2.8" strokeDasharray="6 4" />
              <text x={X0 + 178} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73">本地物种存留%</text>
            </g>
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">时间（年）</text>
            <text x="428" y="286" textAnchor="end" fontSize="9.5" fill="#799398">入侵成功三要素：繁殖强 · 传播快 · 缺天敌</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
