'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（水质生物监测）',
    lines: [
      <>水质检测的两条路线：<span className="font-semibold">理化指标</span>（溶解氧 DO、pH、氨氮、浊度等）与<span className="font-semibold">生物指标</span>（指示物种的存在与否）。</>,
      <>不同水生生物对污染的<span className="font-semibold">耐受度不同</span>：蜉蝣稚虫、石蝇稚虫只生活在清洁水中；颤蚓、摇蚊幼虫耐污力极强——后者大量出现往往意味着有机污染。</>,
      <>溶解氧（DO）是最敏感的综合指标：<span className="font-semibold">有机物排入 → 分解菌大量耗氧 → DO 下降 → 厌氧分解发臭</span>，鱼类会窒息死亡。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 布点：沿河设置对照点（排污口上游）、污染点（排污口下游）与恢复点（湿地/自净段下游）。</>,
      <>② 采样：采水样测理化指标；用采泥器采集底泥，分拣底栖动物。</>,
      <>③ 检测：便携式溶解氧仪测 DO（清洁水超过 7 mg/L）；pH 计、氨氮试纸。</>,
      <>④ 评价：结合理化数据与指示生物多样性，按地表水标准划分水质类别（Ⅰ~Ⅴ类）。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>河流自净的本质：<span className="font-semibold">生态系统具有一定的自我调节能力</span>——好氧分解菌降解有机物、水生植物光合增氧、湿地过滤沉淀。</>,
      <>富营养化的链条：N、P 超标 → 藻类爆发（水华/赤潮）→ 死亡藻体被分解耗氧 → 鱼类死亡——<span className="font-semibold">污染物不等于毒物，营养盐过量同样是污染</span>。</>,
      <>生物监测的优点：<span className="font-semibold">反映长期综合效应</span>（理化瞬时值会漏检间歇性排污）；缺点：分辨率低、鉴定耗时。</>,
    ],
  },
];

type Site = 'up' | 'outfall' | 'down' | 'wetland';

const SITES: Record<Site, { label: string; grade: string; color: string; do_: string; ph: string; nh3: string; bio: string; note: string }> = {
  up: {
    label: '① 排污口上游（对照点）',
    grade: 'Ⅱ类（清洁）',
    color: '#3f7f3a',
    do_: '8.2 mg/L（饱和）',
    ph: '7.2（中性）',
    nh3: '0.2 mg/L（痕量）',
    bio: '蜉蝣稚虫 + 石蝇稚虫 + 小鱼苗',
    note: '天然河水本底：溶解氧充足，清洁指示生物种类多——这是评估下游污染程度的"基准线"。',
  },
  outfall: {
    label: '② 排污口下游 50 m（污染点）',
    grade: '劣Ⅴ类（重度污染）',
    color: '#a53030',
    do_: '1.8 mg/L（近厌氧）',
    ph: '6.1（偏酸）',
    nh3: '12.6 mg/L（超标 20 倍）',
    bio: '仅见颤蚓（耐污种）· 无鱼类',
    note: '有机污水大量耗氧：溶解氧崩塌、氨氮飙升。清水指示生物全部消失，只剩极耐污的颤蚓——"颤蚓密集 = 有机污染"的教科书案例。',
  },
  down: {
    label: '③ 下游 2 km（自净中）',
    grade: 'Ⅳ类（轻度污染）',
    color: '#8a671b',
    do_: '4.9 mg/L（回升中）',
    ph: '6.8',
    nh3: '2.4 mg/L（下降）',
    bio: '摇蚊幼虫 + 耐污小鱼',
    note: '稀释与微生物分解逐渐起效：DO 回升、氨氮下降，摇蚊幼虫开始出现——但仍不适合敏感生物生存。',
  },
  wetland: {
    label: '④ 河口湿地（恢复点）',
    grade: 'Ⅲ类（良好）',
    color: '#2c5a84',
    do_: '6.8 mg/L（良好）',
    ph: '7.0',
    nh3: '0.8 mg/L（接近本底）',
    bio: '蜉蝣稚虫回归 + 虾·小鱼群',
    note: '湿地是天然"净水器"：水生植物吸收 N/P、根系过滤颗粒物、光合作用增氧——河流自净能力的最佳注脚。',
  },
};

export function WaterQualityLab() {
  const [site, setSite] = useState<Site>('up');
  const cur = SITES[site];

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择采样点（沿河 4 站）</p>
              <div className="grid gap-1.5">
                {(Object.keys(SITES) as Site[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSite(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      site === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {SITES[id].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              水质评价：<span className="font-bold" style={{ color: cur.color }}>{cur.grade}</span>
            </div>
          </>
        }
      >
        <SceneBox label={`采样点数据：${cur.label}`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 河流示意 */}
            <path d="M40 70 Q 220 54 400 70 L 400 130 Q 220 146 40 130 Z" fill="#cfe0ec" stroke="#4d7ea8" strokeWidth="2.2" />
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M70 ${86 + i * 14} q 14 -5 28 0 q 14 5 28 0`} fill="none" stroke="#8ab4c9" strokeWidth="1.8" />
            ))}
            {/* 排污口 */}
            <rect x="196" y="30" width="20" height="30" fill="#8a9a9f" stroke="#4a5a5f" strokeWidth="2" />
            <path d="M206 60 q 6 10 0 18 q -6 8 0 14" fill="none" stroke="#8a671b" strokeWidth="2.6" strokeDasharray="4 3" />
            <text x="232" y="44" fontSize="10" fill="#8a671b" fontWeight="700">排污口</text>
            {/* 湿地植物 */}
            {[0, 1, 2, 3].map((i) => (
              <path key={i} d={`M${340 + i * 18} 128 q 3 -18 10 -24`} fill="none" stroke="#3f7f3a" strokeWidth="2.4" strokeLinecap="round" />
            ))}
            <text x="342" y="150" fontSize="9.5" fill="#3f7f3a" fontWeight="600">河口湿地</text>
            {/* 采样点标记 */}
            {[
              { x: 90, id: 'up' as Site, n: '①' },
              { x: 220, id: 'outfall' as Site, n: '②' },
              { x: 280, id: 'down' as Site, n: '③' },
              { x: 382, id: 'wetland' as Site, n: '④' },
            ].map((m) => (
              <g key={m.id}>
                <circle cx={m.x} cy={100} r={site === m.id ? 13 : 9} fill={site === m.id ? '#0e6f75' : '#ffffff'} stroke="#0e6f75" strokeWidth="2.2" />
                <text x={m.x} y={site === m.id ? 104.5 : 103.5} textAnchor="middle" fontSize={site === m.id ? 11 : 9.5} fill={site === m.id ? '#ffffff' : '#0e6f75'} fontWeight="700">{m.n}</text>
              </g>
            ))}
            {/* 指标卡 */}
            <rect x="40" y="168" width="126" height="76" rx="8" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2" />
            <text x="103" y="190" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">溶解氧 DO</text>
            <text x="103" y="212" textAnchor="middle" fontSize="11.5" fill={cur.color} fontWeight="800">{cur.do_}</text>
            <text x="103" y="232" textAnchor="middle" fontSize="9.5" fill="#59767c">清洁水 &gt; 7 mg/L</text>
            <rect x="157" y="168" width="126" height="76" rx="8" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2" />
            <text x="220" y="190" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">pH / 氨氮</text>
            <text x="220" y="212" textAnchor="middle" fontSize="11" fill={cur.color} fontWeight="800">{cur.ph}</text>
            <text x="220" y="232" textAnchor="middle" fontSize="9.5" fill="#59767c">氨氮 {cur.nh3}</text>
            <rect x="274" y="168" width="126" height="76" rx="8" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2" />
            <text x="337" y="190" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">指示生物</text>
            <text x="337" y="210" textAnchor="middle" fontSize="9.5" fill={cur.color} fontWeight="700">{cur.bio.split(' + ')[0]}</text>
            <text x="337" y="228" textAnchor="middle" fontSize="9.5" fill="#59767c">{cur.bio.split(' + ').slice(1).join(' · ') || ' '}</text>
            <text x="40" y="252" fontSize="9.5" fill="#799398">蜉蝣/石蝇稚虫 = 清水指示种 · 颤蚓 = 有机污染指示种</text>
          </svg>
        </SceneBox>

        <ObservationNote>
          {`${cur.label}：${cur.note}（水质评价：${cur.grade}）`}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
