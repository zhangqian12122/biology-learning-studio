'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（谷氨酸发酵工程）',
    lines: [
      <>谷氨酸（味精的主要成分）发酵是<span className="font-semibold">微生物发酵工程</span>的典范：用谷氨酸棒状杆菌，以糖类为原料，在发酵罐中大规模生产。</>
      ,
      <>发酵四环节：<span className="font-semibold">菌种选育 → 培养基配制 → 灭菌与接种 → 发酵罐控制 → 产物分离纯化</span>。</>
      ,
      <>谷氨酸棒状杆菌是<span className="font-semibold">好氧菌</span>：通气不足时代谢路径改变，产物会变成乳酸或琥珀酸——控制条件就是控制产物。</>
      ,
    ],
  },
  {
    title: '发酵罐的"四大旋钮"',
    lines: [
      <>① 温度 30~32°C：影响酶活性与菌体生长速度。</>
      ,
      <>② pH 7~8：用氨水调节（顺便补充氮源）。</>
      ,
      <>③ 通气与搅拌：保证溶氧，让菌体"吃饱喝足"。</>
      ,
      <>④ 补料：中期流加糖液，延长产酸期、避免碳源过早耗尽。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>发酵工程与传统发酵的区别：<span className="font-semibold">单一纯种菌种 + 精确环境控制 + 大规模自动化</span>（传统发酵靠天然菌种"靠天吃饭"）。</>
      ,
      <>产物分离：谷氨酸是胞外产物——用 NaOH 中和后<span className="font-semibold">过滤取菌、浓缩结晶</span>（形成谷氨酸钠）。</>
      ,
      <>联系课本：微生物群体生长的"调整期→对数期→稳定期→衰亡期"曲线——产酸主要在对数期后与稳定期。</>
      ,
    ],
  },
];

type Param = 'temp' | 'ph' | 'air';

const PARAMS: Record<Param, { label: string; note: string; good: string; bad: string }> = {
  temp: { label: '温度 31°C', note: '菌体生长与产酸的最适温度', good: '31°C', bad: '40°C（酶变性·菌体衰亡）' },
  ph: { label: 'pH 7.5', note: '氨水流加自动调节 pH 并补氮', good: 'pH 7.5', bad: 'pH 5.0（产酸严重受抑）' },
  air: { label: '通气充足', note: '好氧菌"吃饱氧"才能产谷氨酸', good: '通气充足', bad: '通气不足（转产乳酸）' },
};

const STAGES = 5;

export function MsgFermentationLab() {
  const [stage, setStage] = useState(0);
  const [yield_, setYield_] = useState<number[]>([0]);
  const stageNames = ['菌种选育', '培养基配制与灭菌', '接种', '发酵控制（30 小时）', '提取纯化'];

  const step = () => {
    if (stage >= STAGES) return;
    if (stage === 3) setYield_([0, 15, 32, 55, 78, 95]);
    setStage((s) => s + 1);
  };

  const reset = () => {
    setStage(0);
    setYield_([0]);
  };

  const curY = yield_[yield_.length - 1];

  const observation = (() => {
    if (stage === 0)
      return '谷氨酸棒状杆菌——自然界"产酸小能手"，再经诱变选育出高产菌株。发酵工程的起点不是"开始干"，而是"选对菌"。';
    if (stage === 1)
      return '配制培养基（糖蜜为主碳源、氨水为氮源）并用高压蒸汽灭菌——杀灭杂菌，保证"纯种上岗"。杂菌污染是发酵工业的大敌。';
    if (stage === 2)
      return '接种：把扩大培养的菌种接入发酵罐。刚接入时是"调整期"——细菌在适应新环境，还未大量产酸。';
    if (stage === 3)
      return '对数期菌体疯狂繁殖，稳定期产酸最多。控制"四大旋钮"：温度 31°C · pH 7.5（氨水调节）· 充足通气 · 中期补料——条件对了，谷氨酸源源不断分泌到培养液中。';
    return '发酵结束：过滤除去菌体，滤液经中和、浓缩、结晶——白色的谷氨酸钠晶体（味精）出炉！从一粒菌种到一袋味精，发酵工程把微生物变成了"细胞工厂"。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= STAGES}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⚙️ 推进工序（{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {stageNames[Math.min(stage, 3)]}
              <br />
              <span className="font-semibold text-[#0e6f75]">通气不足 → 转产乳酸（条件即产物）</span>
            </div>
          </>
        }
      >
        <SceneBox label="谷氨酸发酵罐控制（步进演示）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 发酵罐 */}
            <rect x="70" y="52" width="140" height="180" rx="18" fill="#dceaea" stroke="#5a7a8a" strokeWidth="2.8" />
            <text x="140" y="248" textAnchor="middle" fontSize="10.5" fill="#37585f" fontWeight="600">发酵罐</text>
            {/* 搅拌桨 */}
            <path d="M140 60 v 90" stroke="#5a7a8a" strokeWidth="4" strokeLinecap="round" />
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${124} ${84 + i * 30} h 32`} stroke="#5a7a8a" strokeWidth="3.4" strokeLinecap="round" />
            ))}
            {stage >= 3 ? (
              <g>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <circle key={i} cx={100 + (i % 2) * 70} cy={100 + (i % 3) * 26} r="6" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="1.4" />
                ))}
              </g>
            ) : (
              <text x="140" y="168" textAnchor="middle" fontSize="10" fill="#9ab0b5">（待接种）</text>
            )}
            {/* 仪表盘 */}
            <rect x="250" y="52" width="150" height="120" rx="10" fill="#1f2a34" stroke="#141a20" strokeWidth="2.2" />
            {[
              { y: 78, label: '温度', v: '31°C', c: '#e8a03a' },
              { y: 106, label: 'pH', v: '7.5', c: '#7ac8d8' },
              { y: 134, label: '溶氧', v: stage >= 3 ? '充足' : '—', c: '#7ab86a' },
            ].map((row) => (
              <g key={row.label}>
                <text x="272" y={row.y} fontSize="10.5" fill="#8a9aa8" fontWeight="600">{row.label}</text>
                <text x="376" y={row.y} textAnchor="end" fontSize="11" fill={row.c} fontWeight="800">{row.v}</text>
              </g>
            ))}
            <text x="325" y="160" textAnchor="middle" fontSize="9.5" fill="#6a7a8a">PLC 自动控制</text>
            {/* 产量曲线 */}
            <path d={`M60 236 ${yield_.length > 1 ? 'Q 240 230 380 200' : ''}`} fill="none" stroke="#8a671b" strokeWidth="0" />
            {yield_.length > 1 ? (
              <g>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <rect key={i} x={252 + i * 22} y={232 - yield_[i] * 0.5} width="16" height={yield_[i] * 0.5 + 2} rx="2" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="1.2" />
                ))}
                <text x="325" y="240" textAnchor="middle" fontSize="9" fill="#59767c">产酸曲线（0~95 g/L）</text>
              </g>
            ) : (
              <text x="325" y="248" textAnchor="middle" fontSize="9.5" fill="#9ab0b5">产酸曲线：推进到工序 3 后显示</text>
            )}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
