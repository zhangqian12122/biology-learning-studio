'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（尿酸与痛风）',
    lines: [
      <>尿酸是人体<span className="font-semibold">嘌呤代谢</span>的终产物：细胞正常更新、食物中的嘌呤（海鲜·内脏·肉汤）都会产生尿酸，经肾脏随尿排出。</>
      ,
      <>当<span className="font-semibold">生成过多或排出受阻</span>时，血尿酸升高（高尿酸血症）：超过溶解度后析出<span className="font-semibold">尿酸盐结晶</span>，沉积在关节引发痛风（剧痛·红肿）。</>
      ,
      <>最常累及<span className="font-semibold">第一跖趾关节</span>（大脚趾根）——"半夜被大脚趾疼醒"是痛风的经典发作。</>
      ,
    ],
  },
  {
    title: '饮食与代谢',
    lines: [
      <>高嘌呤食物：动物内脏·海鲜（贝类沙丁鱼）·浓肉汤；酒精（尤其啤酒）<span className="font-semibold">促进尿酸生成并抑制排出</span>。</>
      ,
      <>果糖（含糖饮料）也会促进尿酸生成——"甜甜的饮料"同样危险。</>
      ,
      <>多喝水（每日 2000 mL 以上）促进尿酸随尿排出——碱化尿液效果更好。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>内环境视角：尿酸是代谢废物，正常经肾排出——<span className="font-serif">血尿酸升高</span>说明"代谢废物"在内环境积累（稳态被打破）。</>
      ,
      <>尿酸具有一定的<span className="font-semibold">抗氧化作用</span>（进化遗留）：人类及其他高等灵长类因尿酸酶基因失活而尿酸水平高——演化"双刃剑"。</>
      ,
      <>联系课本：嘌呤是 DNA/RNA 的组成成分——细胞更新越快（如肿瘤化疗）尿酸产生越多。</>
      ,
    ],
  },
];

type Diet = 'low' | 'normal' | 'high';

const DIETS: Record<Diet, { label: string; note: string; risk: string }> = {
  low: { label: '低嘌呤饮食', note: '多吃蔬果·低脂奶·多喝水', risk: '低风险' },
  normal: { label: '普通饮食', note: '适量肉食·偶尔海鲜啤酒', risk: '中风险' },
  high: { label: '高嘌呤饮食', note: '海鲜+内脏+啤酒+含糖饮料', risk: '高风险' },
};

export function GoutUricAcidLab() {
  const [diet, setDiet] = useState<Diet>('normal');
  const [uric, setUric] = useState<number[]>([360]);
  const [day, setDay] = useState(0);

  const step = () => {
    if (day >= 7) return;
    const u = uric[uric.length - 1];
    let nu = u;
    if (diet === 'high') nu += 32;
    else if (diet === 'normal') nu += 4;
    else nu -= 10;
    nu = Math.max(200, Math.min(720, nu));
    setUric((prev) => [...prev, nu]);
    setDay((d) => d + 1);
  };

  const reset = () => {
    setUric([360]);
    setDay(0);
  };

  const W = 300;
  const H = 130;
  const X0 = 50;
  const Y0 = 204;
  const toXY = (i: number, v: number) => ({
    x: X0 + (i / 7) * W,
    y: Y0 - ((v - 200) / 400) * H,
  });
  const line = (arr: number[]) =>
    arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${toXY(i, v).x.toFixed(1)} ${toXY(i, v).y.toFixed(1)}`).join(' ');

  const cur = uric[uric.length - 1];
  const risk = cur >= 540 ? '痛风发作高风险' : cur >= 420 ? '高尿酸血症' : '正常范围';
  const riskColor = cur >= 540 ? '#a53030' : cur >= 420 ? '#8a671b' : '#2f6f2a';

  const observation = (() => {
    if (day === 0)
      return '男性血尿酸正常上限约 420 μmol/L。选择一种饮食模式，按天推进一周，观察血尿酸水平如何变化——以及何时越过"痛风发作线"。';
    if (diet === 'high')
      return `第 ${day} 天：海鲜+内脏+啤酒的高嘌呤组合使血尿酸飙升到 ${cur.toFixed(0)} μmol/L${cur >= 540 ? '——已经越过痛风发作线，随时可能在半夜被大脚趾的剧痛"叫醒"！' : '。'}`;
    if (diet === 'normal')
      return `第 ${day} 天：普通饮食下血尿酸维持在 ${cur.toFixed(0)} μmol/L 左右——勉强在安全线边缘徘徊，长期仍需注意。`;
    return `第 ${day} 天：低嘌呤饮食+多喝水让血尿酸稳步回落到 ${cur.toFixed(0)} μmol/L——管住嘴、多喝水，是最经济的"降酸方案"。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择饮食模式</p>
              <div className="grid gap-1.5">
                {(Object.keys(DIETS) as Diet[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setDiet(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      diet === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {DIETS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {DIETS[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={step}
              disabled={day >= 7}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ⏱ 推进一天（{day}/7）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              血尿酸：<span className="text-base font-bold text-[#b0483a]">{cur.toFixed(0)}</span> μmol/L
              <br />
              风险：<span className="font-semibold" style={{ color: riskColor }}>{risk}</span>
            </div>
          </>
        }
      >
        <SceneBox label="血尿酸水平与痛风风险模拟" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 安全线 420 */}
            <line x1={X0} y1={toXY(0, 420).y} x2={X0 + W + 12} y2={toXY(0, 420).y} stroke="#8a671b" strokeWidth="1.6" strokeDasharray="6 4" />
            <text x={X0 + W + 14} y={toXY(0, 420).y + 4} fontSize="9" fill="#8a671b" fontWeight="600">420 警戒线</text>
            {/* 发作线 540 */}
            <line x1={X0} y1={toXY(0, 540).y} x2={X0 + W + 12} y2={toXY(0, 540).y} stroke="#b0483a" strokeWidth="1.6" strokeDasharray="6 4" />
            <text x={X0 + W + 14} y={toXY(0, 540).y + 4} fontSize="9" fill="#b0483a" fontWeight="600">540 高危线</text>
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 12} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 2, 4, 6].map((t) => (
              <text key={t} x={X0 + (t / 7) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                第{t}天
              </text>
            ))}
            {/* 曲线 */}
            <path d={line(uric)} fill="none" stroke="#b0483a" strokeWidth="3" strokeLinecap="round" />
            {uric.map((v, i) => (
              <circle key={i} cx={toXY(i, v).x} cy={toXY(i, v).y} r="3" fill="#b0483a" />
            ))}
            <text x={X0 + 8} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73" fontWeight="600">血尿酸（μmol/L）</text>
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">时间（天）</text>
            <text x="428" y="286" textAnchor="end" fontSize="9.5" fill="#799398">嘌呤代谢废物 · 经肾脏排出</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
