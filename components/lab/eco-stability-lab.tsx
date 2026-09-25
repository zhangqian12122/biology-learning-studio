'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（生态系统的稳定性）',
    lines: [
      <>生态系统具有<span className="font-semibold">保持或恢复自身结构和功能相对稳定</span>的能力：抵抗力稳定性（抵抗干扰·保持不变）与恢复力稳定性（受扰后·恢复原状）。</>
      ,
      <>一般规律：组分越多、食物网越复杂，<span className="font-semibold">自我调节能力越强，抵抗力稳定性越高</span>；但恢复力稳定性往往越低（热带雨林 vs 极地苔原各走极端）。</>
      ,
      <>稳定性的基础是<span className="font-semibold">负反馈调节</span>：如兔增多→草减少→兔饿死减少→草恢复——"此消彼长"的循环制衡。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>两个系统：物种丰富的森林 vs 单一作物的农田——初始多样性差异悬殊。</>
      ,
      <>干扰：轻度干旱（部分植物受损）与虫害爆发（单一作物损失惨重）。</>
      ,
      <>观察点：干扰后谁恢复快？谁的物种数崩得厉害？——农田的"脆弱"正来自物种单一、营养结构简单。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>抵抗力与恢复力一般<span className="font-semibold">呈相反关系</span>：苔原抵抗力弱恢复力也弱；森林抵抗力强但一旦破坏恢复极慢。</>
      ,
      <>提高生态系统稳定性的措施：<span className="font-semibold">增加物种多样性</span>（混种、防护林）、控制干扰强度（适度放牧不超过自我调节能力）。</>
      ,
      <>应用：桑基鱼塘等生态工程让"物质循环再生"，正是人为设计的高稳定性系统。</>
      ,
    ],
  },
];

type System = 'forest' | 'farm';
type Disturb = 'none' | 'drought' | 'pest';

const YEARS = 8;

export function EcoStabilityLab() {
  const [system, setSystem] = useState<System>('forest');
  const [disturb, setDisturb] = useState<Disturb>('none');
  const [disturbed, setDisturbed] = useState(false);
  const [species, setSpecies] = useState<number[]>([system === 'forest' ? 100 : 12]);
  const year = species.length - 1;

  const step = () => {
    if (year >= YEARS) return;
    const s = species[species.length - 1];
    let ns = s;
    if (!disturbed && disturb !== 'none' && year >= 3) {
      setDisturbed(true);
      ns = system === 'forest' ? (disturb === 'pest' ? s * 0.9 : s * 0.8) : disturb === 'pest' ? s * 0.35 : s * 0.5;
    } else if (disturbed) {
      const recover = system === 'forest' ? 1.04 : 1.12;
      ns = Math.min(system === 'forest' ? 100 : 12, s * recover);
    } else {
      ns = s;
    }
    setSpecies((prev) => [...prev, ns]);
  };

  const reset = () => {
    setSpecies([system === 'forest' ? 100 : 12]);
    setDisturbed(false);
  };

  const W = 300;
  const H = 130;
  const X0 = 50;
  const Y0 = 204;
  const maxS = system === 'forest' ? 100 : 12;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / YEARS) * W,
    y: Y0 - (v / maxS) * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const curS = species[species.length - 1];
  const dropPct = Math.round((1 - curS / maxS) * 100);

  const observation = (() => {
    if (year === 0)
      return `${system === 'forest' ? '森林' : '农田'}系统基线：约 ${maxS} 个物种。选择干扰类型（第 4 年发生），按年推进，比较两个系统"抗摔打"与"恢复"的能力。`;
    if (!disturbed)
      return `第 ${year} 年：尚未发生干扰，物种数稳定在 ${curS.toFixed(0)} 左右。选择干旱或虫害，看系统的"体检报告"。`;
    if (curS >= maxS * 0.97)
      return `第 ${year} 年：物种数恢复到 ${curS.toFixed(0)}（基线的 ${Math.round((curS / maxS) * 100)}%）——${system === 'forest' ? '森林抵抗力强，跌得少；恢复虽慢但已回到高位。' : '农田恢复快，但这只是"低水平"的恢复——物种本来就少。'}`;
    return `第 ${year} 年：干扰后物种数 ${curS.toFixed(0)}（下降 ${dropPct}%），正在恢复。${system === 'forest' ? '森林物种丰富、食物网复杂——受损面小、自我调节快。' : '农田物种单一、营养结构简单——虫害一发几乎"全军覆没"，抵抗力脆弱。'}`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择系统</p>
              <div className="grid gap-1.5">
                <button
                  type="button"
                  onClick={() => { setSystem('forest'); reset(); }}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${system === 'forest' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'}`}
                >
                  森林（约 100 个物种）
                </button>
                <button
                  type="button"
                  onClick={() => { setSystem('farm'); reset(); }}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${system === 'farm' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'}`}
                >
                  农田（单一作物·约 12 个物种）
                </button>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">干扰类型（第 4 年发生）</p>
              <div className="grid gap-1.5">
                <button type="button" onClick={() => setDisturb('drought')} className={`min-h-9 rounded-md border px-3 text-left text-xs font-semibold ${disturb === 'drought' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078]'}`}>轻度干旱</button>
                <button type="button" onClick={() => setDisturb('pest')} className={`min-h-9 rounded-md border px-3 text-left text-xs font-semibold ${disturb === 'pest' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078]'}`}>虫害爆发</button>
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
              重置系统
            </button>
          </>
        }
      >
        <SceneBox label={`${system === 'forest' ? '森林' : '农田'}系统：物种数动态`} heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 12} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 2, 4, 6, 8].map((t) => (
              <text key={t} x={X0 + (t / YEARS) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{t}年
              </text>
            ))}
            {/* 干扰标记 */}
            <line x1={X0 + (3.5 / YEARS) * W} y1={Y0 - H - 10} x2={X0 + (3.5 / YEARS) * W} y2={Y0} stroke="#b0483a" strokeWidth="1.4" strokeDasharray="5 4" />
            <text x={X0 + (3.5 / YEARS) * W + 4} y={Y0 - H - 2} fontSize="9" fill="#b0483a" fontWeight="600">干扰</text>
            {/* 曲线 */}
            <path d={line(species)} fill="none" stroke="#3f7f3a" strokeWidth="3" strokeLinecap="round" />
            {species.map((v, i) => (
              <circle key={i} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3.2" fill="#3f7f3a" />
            ))}
            {/* 图例 */}
            <text x={X0 + 8} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73" fontWeight="600">纵轴：物种相对数量（基线 = 100%）</text>
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">时间（年）</text>
            <text x="428" y="286" textAnchor="end" fontSize="9.5" fill="#799398">多样性越高 → 抵抗力稳定性越强</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
