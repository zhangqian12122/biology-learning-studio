'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（富营养化与水华）',
    lines: [
      <>富营养化：N、P 等<span className="font-semibold">植物必需矿质元素大量进入水体</span>（生活污水、化肥流失、畜禽废水），引起藻类等浮游生物爆发性繁殖。</>
      ,
      <>淡水中的现象叫<span className="font-semibold">水华</span>，海洋中的叫<span className="font-semibold">赤潮</span>。藻类爆发 → 遮蔽阳光、死亡残体被分解菌大量耗氧 → 溶解氧骤降 → 鱼虾窒息死亡。</>
      ,
      <>要点：<span className="font-semibold">N、P 本身不是"毒物"</span>——是"营养过剩"打破平衡。这是"物质循环"角度的污染，与重金属（生物富集）机制不同。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>营养盐输入水平：低（自然本底）、中（部分生活污水）、高（污水+化肥直排）。</>
      ,
      <>两条曲线：藻类密度（爆发增长）与溶解氧 DO（先随藻类光合上升、后因残体分解骤降）。</>
      ,
      <>观察点：DO 的"死亡谷"出现在藻类爆发之后——"先繁荣、后崩溃"的连锁。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>富营养化的治理：<span className="font-semibold">控制污染源</span>（污水厂脱氮除磷）、<span className="font-semibold">生态修复</span>（沉水植物竞争营养、鲢鳙控藻、湿地过滤）。</>
      ,
      <>赤潮生物部分<span className="font-semibold">分泌毒素</span>（如贝类富集麻痹性贝毒）——通过食物链危害人类。</>
      ,
      <>考点：水华/赤潮的成因（N·P 超标）→ 危害（耗氧·遮光·毒素）→ 治理（源头控制优先）。</>
      ,
    ],
  },
];

type Input = 'low' | 'mid' | 'high';

const INPUTS: Record<Input, { label: string; note: string; n: number }> = {
  low: { label: '低营养盐（自然湖泊）', note: '本底输入，无排污', n: 0.2 },
  mid: { label: '中营养盐（部分污水）', note: '经处理的生活污水', n: 0.8 },
  high: { label: '高营养盐（污水+化肥直排）', note: '农田径流+直排污水', n: 2.2 },
};

const WEEKS = 10;

export function AlgalBloomLab() {
  const [input, setInput] = useState<Input>('high');
  const [algae, setAlgae] = useState<number[]>([1]);
  const [do_, setDo] = useState<number[]>([8]);
  const week = algae.length - 1;

  const step = () => {
    if (week >= WEEKS) return;
    const a = algae[algae.length - 1];
    const d = do_[do_.length - 1];
    const n = INPUTS[input].n;
    // 藻类增长受营养盐驱动，密度过高后自遮荫限制
    const na = Math.min(100, a * (1 + n * 0.55) * (1 - a / 100) + 0.1);
    // DO：光合增氧（与藻量相关）- 分解耗氧（与死亡藻量相关，滞后爆发）
    const decay = week >= 4 ? (na / 100) * 3.2 * (n / 2.2) : 0.3;
    const nd = Math.max(0.5, Math.min(10, d + na / 60 - decay - n * 0.12));
    setAlgae((prev) => [...prev, na]);
    setDo((prev) => [...prev, nd]);
  };

  const reset = () => {
    setAlgae([1]);
    setDo([8]);
  };

  const W = 310;
  const H = 130;
  const X0 = 50;
  const Y0 = 200;
  const toXY = (i: number, v: number, max: number) => ({
    x: X0 + (i / WEEKS) * W,
    y: Y0 - (v / max) * H,
  });
  const line = (arr: number[], max: number) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v, max).x.toFixed(1)} ${toXY(i, v, max).y.toFixed(1)}`).join(' ');

  const curA = algae[algae.length - 1];
  const curD = do_[do_.length - 1];

  const observation = (() => {
    if (week === 0)
      return '一片平静的湖泊：藻类密度低、溶解氧充足（8 mg/L）。选择营养盐输入水平，按周推进 10 周，观察藻类爆发与溶解氧崩溃的连锁过程。';
    if (curD < 3)
      return `第 ${week} 周：藻类密度已回落，但残体分解耗氧使溶解氧跌到 ${curD.toFixed(1)} mg/L——鱼虾窒息死亡的"死亡谷"。这就是水华的破坏力：N、P 不是毒物，过量即是灾难。`;
    if (curA > 60)
      return `第 ${week} 周：藻类密度 ${curA.toFixed(0)}（爆发！），水面漂浮"绿油漆"。注意溶解氧曲线：藻类光合让 DO 短暂充盈，但大量残体被分解菌耗氧，DO 正在崩塌。`;
    if (input === 'low')
      return `第 ${week} 周：自然本底的营养盐被水草、滤食生物及时"消化"，藻类密度 ${curA.toFixed(0)}、溶解氧 ${curD.toFixed(1)} mg/L——湖泊的自我调节能力维持着平衡。`;
    return `第 ${week} 周：营养盐持续输入，藻类密度升到 ${curA.toFixed(0)}，溶解氧 ${curD.toFixed(1)} mg/L——水华正在形成中。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">营养盐输入水平</p>
              <div className="grid gap-1.5">
                {(Object.keys(INPUTS) as Input[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setInput(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      input === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {INPUTS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {INPUTS[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={week >= WEEKS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进一周（{week}/{WEEKS}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置湖泊
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              藻类密度 {curA.toFixed(0)} · 溶解氧 <span className={`text-base font-bold ${curD < 3 ? 'text-[#b0483a]' : 'text-[#2f7a4d]'}`}>{curD.toFixed(1)}</span> mg/L
            </div>
          </>
        }
      >
        <SceneBox label="藻类爆发与溶解氧（双曲线模拟）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* DO 安全线 */}
            <line x1={X0} y1={toXY(0, 3, 10).y} x2={X0 + W + 12} y2={toXY(0, 3, 10).y} stroke="#b0483a" strokeWidth="1.4" strokeDasharray="6 4" />
            <text x={X0 + W + 14} y={toXY(0, 3, 10).y + 4} fontSize="9" fill="#b0483a" fontWeight="600">DO 3 危险线</text>
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 12} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 2, 4, 6, 8, 10].map((t) => (
              <text key={t} x={X0 + (t / WEEKS) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{t}周
              </text>
            ))}
            {/* 藻类曲线 */}
            <path d={line(algae, 100)} fill="none" stroke="#5a9a3a" strokeWidth="3" strokeLinecap="round" />
            {algae.map((v, i) => (
              <circle key={`a${i}`} cx={toXY(i, v, 100).x} cy={toXY(i, v, 100).y} r="3" fill="#5a9a3a" />
            ))}
            {/* DO 曲线 */}
            <path d={line(do_, 10)} fill="none" stroke="#4d7ea8" strokeWidth="2.8" strokeDasharray="6 4" />
            {do_.map((v, i) => (
              <circle key={`d${i}`} cx={toXY(i, v, 10).x} cy={toXY(i, v, 10).y} r="2.8" fill="#4d7ea8" />
            ))}
            {/* 图例 */}
            <g>
              <line x1={X0 + 8} y1={Y0 - H - 2} x2={X0 + 30} y2={Y0 - H - 2} stroke="#5a9a3a" strokeWidth="3" />
              <text x={X0 + 36} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73" fontWeight="600">藻类密度（相对值）</text>
              <line x1={X0 + 168} y1={Y0 - H - 2} x2={X0 + 190} y2={Y0 - H - 2} stroke="#4d7ea8" strokeWidth="2.8" strokeDasharray="6 4" />
              <text x={X0 + 196} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73">溶解氧（mg/L）</text>
            </g>
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">时间（周）</text>
            <text x="428" y="286" textAnchor="end" fontSize="9.5" fill="#799398">淡水"水华" · 海洋"赤潮"</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
