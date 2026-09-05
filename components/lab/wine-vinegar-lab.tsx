'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>果酒：<span className="font-semibold">酵母菌</span>无氧呼吸，葡萄糖 → 酒精 + CO₂；适宜温度 <span className="font-semibold">18~25℃</span>，需要密闭但每隔 12h 左右拧松排气（防发酵产气胀破瓶子）。</>,
      <>果醋：<span className="font-semibold">醋酸菌</span>好氧细菌，当氧气、糖源充足时将糖分解成醋酸；缺糖时将乙醇变为乙醛再变为醋酸；适宜温度 <span className="font-semibold">30~35℃</span>，<span className="font-semibold">全程需要通入无菌空气</span>。</>,
      <>菌种来源：果皮表面的野生酵母菌与醋酸菌。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：新鲜葡萄、酵母菌/醋酸菌菌种。</>,
      <>用具：发酵瓶、充气泵、导管、密度计（糖度计）、酒精计、pH 试纸。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 榨汁前葡萄不要反复冲洗（保留野生菌种），去除枝梗。</>,
      <>② 果酒：汁液装入发酵瓶（留 1/3 空间），18~25℃ 密闭发酵 10~12 天，适时排气。</>,
      <>③ 果醋：向果酒中接入醋酸菌，30~35℃ <span className="font-semibold">持续通入无菌空气</span>，发酵 7~8 天。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>果酒发酵瓶<span className="font-semibold">留 1/3 空间</span>：前期有氧呼吸让酵母菌大量繁殖，也防止发酵产生的 CO₂ 排出时带出发酵液。</>,
      <>醋酸菌是<span className="font-semibold">好氧细菌</span>：断氧会死亡，果醋发酵全程不能缺氧——这是与果酒最大的区别。</>,
      <>温度差异：果酒 18~25℃，果醋 30~35℃，都是各自菌种的最适温度。</>,
      <>产物检测：酒精用酸性重铬酸钾（橙→灰绿）；醋酸可用 pH 试纸/pH 计检测（变酸）。</>,
    ],
  },
];

type Stage = 'juice' | 'wine' | 'vinegar';

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function WineVinegarLab() {
  const [stage, setStage] = useState<Stage>('juice');
  const [days, setDays] = useState(0);
  const [airPump, setAirPump] = useState(false);
  const [temp, setTemp] = useState(22);

  // 状态机：果汁 →(酵母菌, 18~25℃, 密闭)→ 果酒 →(醋酸菌, 30~35℃, 通气)→ 果醋
  const wineQuality = stage !== 'juice' ? (temp >= 18 && temp <= 25 ? 'good' : 'poor') : 'none';
  const vinegarQuality = stage === 'vinegar' ? (temp >= 30 && temp <= 35 ? (airPump ? 'good' : 'fail') : 'fail') : 'none';
  const alcohol = stage !== 'juice' ? Math.min(1, days / 10) : 0;
  const acid = stage === 'vinegar' ? Math.min(1, days / 7) * (airPump ? 1 : 0.3) : 0;

  const toWine = () => {
    setStage('wine');
    setDays(0);
  };
  const toVinegar = () => {
    setStage('vinegar');
    setDays(0);
  };

  const observation = (() => {
    if (stage === 'juice') return '新鲜葡萄汁已装瓶（留 1/3 空间）。选择发酵阶段：果酒（酵母菌，18~25℃ 密闭）或直接做果醋（醋酸菌，30~35℃ 通气）。';
    if (stage === 'wine') {
      const t = temp >= 18 && temp <= 25 ? '温度适宜，酵母菌发酵旺盛' : `${temp < 18 ? '温度偏低，发酵缓慢' : '温度过高，酵母菌活性受影响'}`;
      return `果酒发酵第 ${days} 天（18~25℃ 之外会异常）。${t}。完成发酵后可切「果醋发酵」继续做醋——注意先接入醋酸菌并把温度调到 30~35℃。`;
    }
    const msgs: string[] = [];
    msgs.push(temp >= 30 && temp <= 35 ? '温度适宜，醋酸菌大量繁殖' : '⚠ 温度不在 30~35℃，醋酸菌活性差');
    msgs.push(airPump ? '持续通气中 ✓（醋酸菌是好氧菌）' : '⚠ 未通气：醋酸菌缺氧会死亡，得不到醋酸！');
    if (days >= 7) msgs.push(`检测：醋酸含量 ${acid > 0.8 ? '高' : '偏低'}。果醋制作${airPump && temp >= 30 && temp <= 35 ? '成功！' : '失败，请检查温度与通气。'}`);
    return msgs.join(' ');
  })();

  const liquidColor = stage === 'juice' ? '#c9a86a' : stage === 'wine' ? '#a06a9e' : '#c9a86a';

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">发酵阶段</p>
              <div className="grid grid-cols-3 gap-1.5">
                <button type="button" onClick={() => setStage('juice')} aria-pressed={stage === 'juice'} className={cnChip(stage === 'juice')}>
                  葡萄汁
                </button>
                <button type="button" onClick={toWine} aria-pressed={stage === 'wine'} className={cnChip(stage === 'wine')}>
                  果酒发酵
                </button>
                <button type="button" onClick={toVinegar} aria-pressed={stage === 'vinegar'} className={cnChip(stage === 'vinegar')}>
                  果醋发酵
                </button>
              </div>
            </div>

            {stage !== 'juice' ? (
              <button
                type="button"
                onClick={() => setAirPump((v) => !v)}
                aria-pressed={airPump}
                className={`${cnChip(airPump)} w-full ${stage === 'vinegar' ? 'border-[#0e6f75] bg-[#0e6f75] text-white hover:bg-[#0c5f64]' : ''} ${
                  stage === 'vinegar' && !airPump ? 'border-[#b0483a] bg-[#f9e2e0] text-[#b0483a] hover:bg-[#f4d0cd]' : ''
                }`}
              >
                {airPump ? '💨 充气泵：开' : '充气泵：关'}
                {stage === 'vinegar' ? '（醋酸菌必需）' : '（果酒阶段应关闭）'}
              </button>
            ) : null}

            {stage !== 'juice' ? (
              <button
                type="button"
                onClick={() => setDays((d) => Math.min(d + 1, 12))}
                className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
              >
                继续发酵 1 天（第 {days} 天）
              </button>
            ) : null}

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              发酵液：{stage === 'juice' ? '葡萄汁（含野生酵母菌与醋酸菌）' : stage === 'wine' ? '葡萄汁 → 酒精（酵母菌无氧呼吸）' : '果酒 → 醋酸（醋酸菌好氧氧化）'}
            </div>
          </>
        }
      >
        <SceneBox label="发酵装置（温度 / 通气 / 产物实时联动）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 温度计 */}
            <rect x="36" y="60" width="18" height="170" rx="8" fill="#f4f6f6" stroke="#9db8bd" strokeWidth="2" />
            <rect x="41" y={temp >= 30 ? 96 : temp >= 25 ? 126 : 156} width="8" height={230 - (temp >= 30 ? 96 : temp >= 25 ? 126 : 156)} rx="4" fill={temp >= 30 ? '#d9544d' : '#5aa8c9'} />
            <text x="45" y="250" textAnchor="middle" fontSize="11" fill="#4b6c73" fontWeight="700">
              {temp}℃
            </text>
            <text x="45" y="266" textAnchor="middle" fontSize="9" fill={stage === 'wine' ? (temp >= 18 && temp <= 25 ? '#2f7a4d' : '#b0483a') : stage === 'vinegar' ? (temp >= 30 && temp <= 35 ? '#2f7a4d' : '#b0483a') : '#5f7076'}>
              {stage === 'wine' ? '适温 18~25℃' : stage === 'vinegar' ? '适温 30~35℃' : ''}
            </text>

            {/* 发酵瓶 */}
            <path d="M150 108 L150 128 Q110 136 110 190 Q110 240 170 244 Q230 248 232 190 Q232 138 190 128 L190 108" fill="none" stroke="#9db8bd" strokeWidth="3.5" />
            {/* 发酵液 */}
            <path d="M122 196 Q122 234 170 238 Q222 234 220 196 Q170 214 122 196 Z" fill={liquidColor} style={{ transition: 'fill 1s ease' }} />
            {/* 液面上方空间（1/3） */}
            <text x="170" y="96" textAnchor="middle" fontSize="11" fill="#4b6c73" fontWeight="700">
              发酵瓶（留 1/3 空间）
            </text>
            {/* 酵母菌/气泡 */}
            {stage !== 'juice' && days > 0
              ? [0, 1, 2, 3].map((i) => (
                  <circle key={i} cx={150 + i * 14} cy="196" r="3" fill="#ffffff" className="bio-gas" style={{ animationDelay: `${i * 0.3}s`, animationDuration: stage === 'wine' ? '1.6s' : '1.2s' }} />
                ))
              : null}

            {/* 排气口（果酒阶段） */}
            {stage !== 'juice' ? (
              <g>
                <line x1="170" y1="108" x2="170" y2="70" stroke="#8aa7ad" strokeWidth="4" />
                <path d="M170 66 L170 52" stroke="#8aa7ad" strokeWidth="4" />
                <ellipse cx="170" cy="46" rx="7" ry="4" fill="#c9d8e0" stroke="#8aa7ad" strokeWidth="1.5" />
                {days > 0 ? <circle cx="170" cy="38" r="3.5" fill="#7fb8d4" className="bio-gas" /> : null}
                <text x="170" y="28" textAnchor="middle" fontSize="9" fill="#5f7a86">
                  排气口（拧松排气）
                </text>
              </g>
            ) : null}

            {/* 通气泵（果醋阶段） */}
            {stage === 'vinegar' ? (
              <g>
                <rect x="262" y="150" width="54" height="36" rx="6" fill={airPump ? '#6a9e8a' : '#b8c4c2'} />
                <text x="289" y="172" textAnchor="middle" fontSize="9" fill="#ffffff" fontWeight="700">
                  充气泵
                </text>
                <path d="M262 168 Q230 168 206 190" fill="none" stroke={airPump ? '#6a9e8a' : '#b8c4c2'} strokeWidth="3.5" strokeDasharray={airPump ? 'none' : '6 5'} />
                {airPump
                  ? [0, 1, 2].map((i) => (
                      <circle key={i} cx={200 - i * 14} cy="196" r="3.2" fill="#7fb8d4" className="bio-gas" style={{ animationDelay: `${i * 0.25}s` }} />
                    ))
                  : null}
                <text x="289" y="200" textAnchor="middle" fontSize="9" fill={airPump ? '#2f7a5e' : '#a04a4a'} fontWeight="600">
                  {airPump ? '通入无菌空气 ✓' : '未通气 ✗'}
                </text>
              </g>
            ) : null}

            {/* 产物标签 */}
            <text x="230" y="278" textAnchor="middle" fontSize="11" fill="#4b6c73" fontWeight="700">
              {stage === 'juice' ? '葡萄汁' : stage === 'wine' ? `果酒（酒精 ${Math.round(alcohol * 100)}%）` : `果醋（醋酸 ${Math.round(acid * 100)}%）`}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
