'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>生长素类似物（如 NAA、2,4-D）与生长素作用类似：适宜浓度促进扦插枝条<span className="font-semibold">基部生根</span>，过浓反而抑制生根。</>,
      <>浓度与促进效果呈<span className="font-semibold">钟形曲线</span>：存在一个最适浓度，两侧效果都变差——本实验就是找出这个最适浓度。</>,
      <>对照：不加生长素类似物的清水组（0 ppm）。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：生长旺盛的一年生月季枝条若干（每支保留 3~4 个芽）。</>,
      <>试剂：NAA 溶液系列浓度（如 0、100、200、300、400、500 ppm）。</>,
      <>用具：烧杯、滴管、培养箱（湿润沙土）。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 枝条随机分组编号，每组数量相同（无关变量一致）。</>,
      <>② 分别浸泡在不同浓度的 NAA 溶液中（基部浸入数厘米，几小时）。</>,
      <>③ 扦插到湿润沙土中培养，适时观察记录各组生根数量。</>,
      <>④ 比较各组生根数，确定最适浓度范围。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>自变量是<span className="font-semibold">生长素类似物浓度</span>；枝条规格、芽的数量、处理时间、培养条件都是无关变量。</>,
      <>处理方法可浸泡（需几小时）也可沾蘸（约 5 秒，浓度更高）。</>,
      <>实验要预实验摸索大致范围，避免浓度过高全被抑制而无法确定最适值。</>,
      <>结论表述：促进扦插枝条生根的最适浓度是 X ppm 左右；低于或高于该浓度促进作用减弱甚至抑制。</>,
    ],
  },
];

const CONCS = [0, 100, 200, 300, 400, 500];

/** 钟形曲线：300ppm 最适 */
function rootsFor(conc: number) {
  if (conc === 0) return 3; // 清水对照
  const x = conc / 100;
  return Math.round(3 + 9 * Math.exp(-((x - 3) ** 2) / 2.2));
}

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-2 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function AuxinCuttingLab() {
  const [results, setResults] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState(300);

  const treat = (conc: number) => {
    setSelected(conc);
    setResults((prev) => ({ ...prev, [conc]: rootsFor(conc) }));
  };

  const tested = CONCS.filter((c) => results[c] != null);
  const best = tested.length ? tested.reduce((a, b) => ((results[b] ?? 0) > (results[a] ?? 0) ? b : a)) : null;
  const allTested = tested.length === CONCS.length;

  const observation = (() => {
    if (tested.length === 0) return '自由操作：点选一个浓度处理后培养，看插条生根数量。试试把 6 个浓度都做完，找出最适浓度。';
    const cur = results[selected] ?? 0;
    const curTxt = `${selected} ppm 处理的插条生了 ${cur} 条根`;
    if (allTested) {
      const peak = best ?? 0;
      return `${curTxt}。六组全部完成：最适浓度是 ${peak} ppm（生根 ${results[peak]} 条）。清水对照只生 3 条——适量促进、过量抑制，呈钟形曲线。`;
    }
    if (best != null && cur === results[best]) return `${curTxt}——目前效果最好的一组！继续测试其他浓度确认。`;
    return `${curTxt}。把 6 个浓度都测完才能确定最适浓度（注意与清水对照比较）。`;
  })();

  // 曲线数据（已测的浓度）
  const chartPts = tested
    .slice()
    .sort((a, b) => a - b)
    .map((c) => ({ c, r: results[c] as number }));
  const pathD =
    chartPts.length > 1
      ? chartPts.map((p, i) => `${i === 0 ? 'M' : 'L'}${60 + (p.c / 500) * 320} ${230 - (p.r / 14) * 170}`).join(' ')
      : '';

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">NAA 浓度（ppm）</p>
              <div className="grid grid-cols-3 gap-1.5">
                {CONCS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => treat(c)}
                    aria-pressed={selected === c && results[c] != null}
                    className={`${cnChip(selected === c && results[c] != null)} ${
                      results[c] != null ? 'border-[#cfe6e4] bg-[#f2faf9] text-[#8fb0b5]' : ''
                    }`}
                  >
                    {c}
                    {results[c] != null ? `（${results[c]}根）` : ''}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              0 ppm = 清水对照。每个浓度处理后插入沙土培养 10 天，统计生根数量。
            </div>
            <div className="rounded-md bg-[#fdf3dd] px-3 py-2.5 text-xs leading-5 text-[#8a671b]">
              🎯 目标：找出促进生根的最适浓度（提示：先把 6 个浓度全部测完）。
            </div>
          </>
        }
      >
        <SceneBox label="插条生根情况（当前浓度组）＋ 生根数-浓度曲线" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 插条示意 */}
            <g>
              <path d="M70 250 L74 170 Q 76 150 70 132" fill="none" stroke="#7a5a3a" strokeWidth="7" strokeLinecap="round" />
              <ellipse cx="72" cy="120" rx="9" ry="16" fill="#5f9e57" transform="rotate(-12 72 120)" />
              <ellipse cx="82" cy="126" rx="9" ry="16" fill="#6faf58" transform="rotate(14 82 126)" />
              {/* 根须数量 = 该组生根数 */}
              {(() => {
                const r = results[selected] ?? 0;
                return Array.from({ length: r }, (_, i) => {
                  const th = Math.PI * (0.25 + (i / Math.max(1, r - 1)) * 0.5);
                  const dx = Math.sin(th) * 26 * (i % 2 === 0 ? 1 : -1);
                  const dy = Math.cos(th) * 22;
                  return (
                    <path
                      key={i}
                      d={`M74 252 q ${dx / 2} ${dy / 2} ${dx} ${dy}`}
                      fill="none"
                      stroke="#c9a86a"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className="bio-fade"
                    />
                  );
                });
              })()}
              <text x="74" y="282" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">
                {selected} ppm · 生根 {results[selected] ?? '待测'} 条
              </text>
            </g>

            {/* 坐标轴 */}
            <line x1="60" y1="230" x2="410" y2="230" stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1="60" y1="230" x2="60" y2="30" stroke="#8a9a9f" strokeWidth="1.6" />
            <text x="235" y="250" textAnchor="middle" fontSize="10" fill="#5f7076">NAA 浓度 (ppm)</text>
            <text x="30" y="130" fontSize="10" fill="#5f7076" transform="rotate(-90 30 130)">生根数</text>
            {[0, 100, 200, 300, 400, 500].map((c) => (
              <text key={c} x={60 + (c / 500) * 320} y="246" textAnchor="middle" fontSize="9" fill="#8a9a9f">
                {c}
              </text>
            ))}

            {/* 曲线 */}
            {pathD ? <path d={pathD} fill="none" stroke="#0e6f75" strokeWidth="3" strokeLinecap="round" /> : null}
            {chartPts.map((p) => (
              <circle key={p.c} cx={60 + (p.c / 500) * 320} cy={230 - (p.r / 14) * 170} r="4.5" fill="#0e6f75" />
            ))}
            {tested.length === 0 ? (
              <text x="235" y="130" textAnchor="middle" fontSize="11" fill="#9ab0b5">
                处理后各组数据会绘制在这里
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
