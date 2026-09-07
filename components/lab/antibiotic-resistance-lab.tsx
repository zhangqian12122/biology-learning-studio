'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（耐药性是如何进化的）',
    lines: [
      <>细菌群体中本来就随机存在着<span className="font-semibold">极少数耐药突变个体</span>——突变发生在用药之前，不是药物"教"出来的。</>,
      <>使用抗生素时，<span className="font-semibold">敏感菌被杀死，耐药菌存活</span>并获得繁殖空间：抗生素起到了<span className="font-semibold">选择</span>作用，让耐药菌的比例逐代升高。</>,
      <>这就是达尔文自然选择学说在医学中的体现：<span className="font-semibold">变异是不定向的，选择是定向的</span>。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>用药方案：不用药 / 规范剂量 / 过量滥用——三种选择压力。</>,
      <>曲线：细菌群体中耐药菌的比例（%）随治疗代数的变化。</>,
      <>观察点：哪种方案会让耐药菌最快"称霸"整个群体？</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 选「规范剂量」，推进 6 代，看耐药比例的爬升。</>,
      <>② 换「过量滥用」再来一次：杀得更狠，选择压力更大，耐药菌反而"称霸"更快。</>,
      <>③ 对比后思考：为什么医生要求"足量足疗程、不随意停药"？</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>滥用抗生素 = <span className="font-semibold">人为制造强选择压力</span>，加速耐药菌进化——"超级细菌"就是这样炼成的。</>,
      <>规范用药（足量足疗程）能在耐药突变积累之前<span className="font-semibold">彻底消灭全部病菌</span>，不给进化留时间。</>,
      <>耐药性的进化用进废退解释不通：<span className="font-semibold">不是细菌"适应了药物"，而是药物"筛出了"本来就耐药的个体</span>。</>,
    ],
  },
];

type Regimen = 'none' | 'normal' | 'overuse';
const REGIMENS: Record<Regimen, { label: string; killSensitive: number; killResistant: number }> = {
  none: { label: '不用药', killSensitive: 0, killResistant: 0 },
  normal: { label: '规范剂量', killSensitive: 0.9, killResistant: 0.55 },
  overuse: { label: '过量滥用', killSensitive: 0.99, killResistant: 0.7 },
};

const GENERATIONS = 6;

export function AntibioticResistanceLab() {
  const [regimen, setRegimen] = useState<Regimen>('normal');
  const [history, setHistory] = useState<number[]>([1]); // 耐药菌比例（0~1），初始 1%
  const [gen, setGen] = useState(0);

  const stepForward = () => {
    if (gen >= GENERATIONS) return;
    setHistory((prev) => {
      const cur = prev[prev.length - 1];
      const r = REGIMENS[regimen];
      // 存活率：敏感菌与耐药菌按方案被杀死，剩余繁殖恢复总量
      const sSurvive = cur * (1 - r.killSensitive) * 20;
      const rSurvive = (1 - cur) * (1 - r.killResistant) * 20;
      const next = sSurvive + rSurvive > 0 ? rSurvive / (sSurvive + rSurvive) : cur;
      return [...prev, next];
    });
    setGen((g) => g + 1);
  };

  const reset = () => {
    setHistory([1]);
    setGen(0);
  };

  const current = history[history.length - 1];
  const W = 320;
  const H = 150;
  const X0 = 46;
  const Y0 = 210;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / GENERATIONS) * W,
    y: Y0 - v * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const observation = (() => {
    if (gen === 0) {
      return regimen === 'none'
        ? '未用药：耐药突变个体只占 1%，菌群平静。选择一种用药方案再开始推进。'
        : '菌群中约 1% 的个体因随机突变天然耐药（突变在用药前就存在）。点「推进一代」看抗生素如何"筛选"它们。';
    }
    if (regimen === 'none') {
      return `未用药 ${gen} 代：耐药比例基本不变（约 1%）。没有选择压力，耐药菌并无优势——这反证了是"药物在选择"。`;
    }
    const pct = (current * 100).toFixed(0);
    if (regimen === 'overuse') {
      return `过量滥用 ${gen} 代：耐药菌比例已飙升至 ${pct}%——选择压力越强，敏感菌被清除越彻底，耐药菌"称霸"越快。`;
    }
    if (gen >= 4) {
      return `规范用药 ${gen} 代：耐药菌比例升至 ${pct}%。若剂量不足或提前停药，幸存的耐药菌就会繁殖成"超级细菌"群体——所以必须足量足疗程。`;
    }
    return `规范用药 ${gen} 代：敏感菌大量死亡，耐药菌比例升至 ${pct}%——抗生素正在定向"筛选"耐药个体。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">用药方案（切换会清空统计）</p>
              <div className="grid gap-1.5">
                {(['none', 'normal', 'overuse'] as Regimen[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRegimen(r);
                      setHistory([1]);
                      setGen(0);
                    }}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      r === regimen
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {REGIMENS[r].label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={stepForward}
              disabled={gen >= GENERATIONS}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进一代（{gen}/{GENERATIONS}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置菌群
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              耐药菌比例：<span className={`text-base font-bold ${current > 0.5 ? 'text-[#b0483a]' : 'text-[#2f7a4d]'}`}>{(current * 100).toFixed(1)}</span>%
            </div>
          </>
        }
      >
        <SceneBox label="细菌群体中耐药菌比例的变化（自然选择的应用）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 280" aria-hidden="true">
            {/* 网格 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 16} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[25, 50, 75].map((v) => (
              <g key={v}>
                <line x1={X0} y1={toXY(0, v / 100).y} x2={X0 + W} y2={toXY(0, v / 100).y} stroke="#dceaea" strokeWidth="1" />
                <text x={X0 - 6} y={toXY(0, v / 100).y + 3} textAnchor="end" fontSize="9" fill="#5f7076">{v}%</text>
              </g>
            ))}
            {[0, 2, 4, 6].map((g) => (
              <text key={g} x={toXY(g, 0).x} y={Y0 + 16} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{g}代
              </text>
            ))}
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">治疗代数</text>
            {/* 曲线 */}
            <path d={line(history)} fill="none" stroke="#b0483a" strokeWidth="3.2" strokeLinecap="round" />
            {history.map((v, i) => (
              <circle key={i} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3.4" fill="#b0483a" />
            ))}
            {/* 图例 */}
            <g>
              <circle cx={X0 + W - 92} cy={Y0 - H + 2} r="6" fill="#b0483a" />
              <text x={X0 + W - 80} y={Y0 - H + 6} fontSize="9.5" fill="#59767c" fontWeight="600">耐药菌比例</text>
            </g>
            {/* 结论标记 */}
            {gen >= GENERATIONS && regimen === 'overuse' ? (
              <text x={X0 + W - 8} y={toXY(GENERATIONS, current).y - 10} textAnchor="end" fontSize="10" fill="#b0483a" fontWeight="800">
                耐药菌"称霸"！
              </text>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
