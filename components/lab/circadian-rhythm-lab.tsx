'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（昼夜节律与生物钟）',
    lines: [
      <>昼夜节律是生命活动以约 <span className="font-semibold">24 小时为周期</span>的节律性变化：人的体温、褪黑素、皮质醇分泌都按"生物钟"起落。2017 年诺贝尔奖授予了阐明生物钟分子机制（period 等基因的反馈环路）的三位科学家。</>
      ,
      <>褪黑素由<span className="font-semibold">松果体</span>在黑暗中分泌，浓度夜间升高、白天降低——是"该睡觉了"的化学信号；皮质醇清晨达峰，让人清醒有精神。</>
      ,
      <>生物钟位于下丘脑的<span className="font-semibold">视交叉上核</span>，视网膜接收的光信号每天对它"校时"——所以光照是调节节律最有力的环境因素。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>作息方案：规律作息（23:00~7:00 睡眠）、熬夜刷题（延后 3 小时入睡）、跨时区飞行（相位整体平移 8 小时）。</>
      ,
      <>曲线：褪黑素（夜间峰）与皮质醇（清晨峰）随 24 小时的相位变化；睡眠窗口在图上以阴影标出。</>
      ,
      <>观察点：睡眠推迟后，褪黑素峰值跟着推迟吗？光（屏幕光）是推着生物钟"往后跑"的关键。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>昼夜节律属于<span className="font-semibold">内环境稳态的时间维度</span>：激素分泌的日周期波动本身是正常稳态，不是紊乱。</>
      ,
      <>熬夜伤身的机制：屏幕蓝光抑制褪黑素 → 入睡困难；睡眠不足 → 皮质醇节律紊乱 → 免疫力下降、记忆巩固受损（长期记忆在海马完成巩固，睡眠中效率最高）。</>
      ,
      <>倒时差的本质：<span className="font-semibold">生物钟相位与外界光暗周期的错位</span>——需要数天通过光照重新"校时"。</>
      ,
    ],
  },
];

type Plan = 'regular' | 'late' | 'jetlag';

const PLANS: Record<Plan, { label: string; note: string; shift: number; span: [number, number] }> = {
  regular: { label: '规律作息（23:00 入睡）', note: '褪黑素 21:00 起升、凌晨 2~3 点达峰', shift: 0, span: [23, 7] },
  late: { label: '熬夜刷题（02:00 入睡）', note: '夜间光照把褪黑素峰推迟约 3 小时', shift: 3, span: [2, 9] },
  jetlag: { label: '飞抵时差 8 小时地区', note: '生物钟仍在"家里"的相位——白天犯困、夜里清醒', shift: 8, span: [7, 15] },
};

/** 24h 褪黑素相位曲线（峰在 02:00+shift），皮质醇峰在 07:00+shift */
function melatoninAt(h: number, shift: number) {
  let d = Math.abs(((h - 2 - shift) % 24 + 36) % 24 - 12);
  d = 12 - d;
  return Math.max(0.05, Math.exp(-(Math.pow(12 - d - 0, 2)) / 2) * 0.98 + 0.02);
}
function cortisolAt(h: number, shift: number) {
  let d = Math.abs(((h - 7 - shift) % 24 + 36) % 24 - 12);
  d = 12 - d;
  return Math.max(0.05, Math.exp(-(d * d) / 4) * 0.95 + 0.05);
}

export function CircadianRhythmLab() {
  const [plan, setPlan] = useState<Plan>('regular');
  const cur = PLANS[plan];

  const W = 330;
  const H = 120;
  const X0 = 52;
  const Y0 = 216;
  const toXY = (h: number, v: number) => ({
    x: X0 + (h / 24) * W,
    y: Y0 - v * H,
  });
  const path = (fn: (h: number) => number) =>
    Array.from({ length: 49 }, (_, i) => {
      const h = (i * 24) / 48;
      const { x, y } = toXY(h, fn(h));
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');

  const spanLabel = cur.span[0] <= cur.span[1]
    ? `${cur.span[0]}:00 ~ ${cur.span[1]}:00`
    : `${cur.span[0]}:00 ~ 次日 ${cur.span[1]}:00`;

  const observation = (() => {
    if (plan === 'regular')
      return '规律作息下的健康节律：傍晚褪黑素开始爬升，凌晨 2~3 点达峰（睡意最深）；清晨皮质醇高峰把人"唤醒"。两套激素像接力棒一样交接——这就是稳态的时间维度。';
    if (plan === 'late')
      return '熬夜时手机屏幕的蓝光持续抑制褪黑素，入睡时间被迫推迟，褪黑素峰整体后移约 3 小时——生物钟被光"推着往后跑"。次日清晨该清醒时皮质醇不足，上课犯困就是节律错位的直接后果。';
    return '飞行跨越 8 个时区后：体内的褪黑素还在按"出发地"的时间分泌——当地白天困意阵阵（褪黑素高峰）、当地夜里反而清醒。需要连续几天在当地时间接受光照，生物钟才能重新校准。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择作息方案</p>
              <div className="grid gap-1.5">
                {(Object.keys(PLANS) as Plan[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPlan(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      plan === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {PLANS[id].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              睡眠窗口：<span className="font-semibold">{spanLabel}</span>
              <br />
              {cur.note}
            </div>
          </>
        }
      >
        <SceneBox label="24 小时激素节律与睡眠窗口" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 睡眠窗口阴影 */}
            {(() => {
              const [s, e] = cur.span;
              const x1 = X0 + (s / 24) * W;
              const x2 = e > s ? X0 + (e / 24) * W : X0 + W + (e / 24) * W - X0;
              return <rect x={x1} y={Y0 - H - 10} width={x2 - x1} height={H + 10} fill="#2c3a5a" opacity="0.12" />;
            })()}
            {/* 轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 10} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 10} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {[0, 6, 12, 18, 24].map((h) => (
              <text key={h} x={X0 + (h / 24) * W} y={Y0 + 14} textAnchor="middle" fontSize="9" fill="#8a9a9f">
                {h}:00
              </text>
            ))}
            {/* 曲线 */}
            <path d={path((h) => melatoninAt(h, cur.shift))} fill="none" stroke="#4d7ea8" strokeWidth="3" strokeLinecap="round" />
            <path d={path((h) => cortisolAt(h, cur.shift))} fill="none" stroke="#b0483a" strokeWidth="2.6" strokeDasharray="6 4" />
            {/* 图例 */}
            <g>
              <line x1={X0 + 8} y1={Y0 - H - 2} x2={X0 + 30} y2={Y0 - H - 2} stroke="#4d7ea8" strokeWidth="3" />
              <text x={X0 + 36} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73" fontWeight="600">褪黑素（睡意信号）</text>
              <line x1={X0 + 160} y1={Y0 - H - 2} x2={X0 + 182} y2={Y0 - H - 2} stroke="#b0483a" strokeWidth="2.6" strokeDasharray="6 4" />
              <text x={X0 + 188} y={Y0 - H + 2} fontSize="9.5" fill="#4b6c73">皮质醇（清醒信号）</text>
            </g>
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10" fill="#5f7076">一天中的时间</text>
            <text x="428" y="286" textAnchor="end" fontSize="9.5" fill="#799398">阴影 = 睡眠窗口</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
