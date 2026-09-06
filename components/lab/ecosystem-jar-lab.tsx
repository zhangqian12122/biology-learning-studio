'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>生态缸要长期稳定，必须<span className="font-semibold">组分齐全、比例恰当</span>：光照提供能量，生产者固定能量，分解者完成物质循环，消费者让结构更完整。</>,
      <>缸通常<span className="font-semibold">密封</span>——物质自给自足，能量却要持续输入（光），这是"物质循环、能量流动"的直接体现。</>,
      <>缺任何一环都会沿不同路径崩溃：断光 → 生产者先死 → 全缸崩；缺分解者 → 物质循环中断 → 水质恶化。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>可勾选组分：光照、水、生产者（水草）、消费者（螺）、分解者；可切换密封。</>,
      <>每推进 5 天结算一次健康度，观察不同配置各能撑多少天。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 全部组分勾齐、密封，推进到 30 天——先看"标准答案"能稳住。</>,
      <>② 逐个去掉组分（每次只去一个），记录健康度跌破 30 的天数。</>,
      <>③ 排序：哪种缺失崩溃最快？为什么？</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>生态缸稳定的核心是<span className="font-semibold">能量输入（光）+ 物质循环（分解者）</span>——密封缸里物质循环、能量单向。</>,
      <>消费者不是必需组分，但缺失后结构简单、抵抗力稳定性下降。</>,
      <>生态缸观察到崩溃 ≠ 实验失败——它恰好演示了生态系统自我调节能力的<span className="font-semibold">有限性</span>。</>,
    ],
  },
];

type ComponentKey = 'light' | 'water' | 'producer' | 'consumer' | 'decomposer' | 'sealed';
const COMPONENTS: Record<ComponentKey, { label: string; essential: boolean; note: string }> = {
  light: { label: '☀ 光照', essential: true, note: '断光 → 生产者无法固定能量，全缸崩得最快' },
  water: { label: '💧 水', essential: true, note: '没有水就没有生命活动，几乎立刻崩溃' },
  producer: { label: '🌿 生产者（水草）', essential: true, note: '缺生产者 → 能量无来源，螺饿死后缸仅剩微生物' },
  consumer: { label: '🐌 消费者（螺）', essential: false, note: '非必需，但缺了结构简单、抵抗力稳定性下降' },
  decomposer: { label: '🦠 分解者', essential: true, note: '缺分解者 → 物质循环中断，水质逐渐恶化' },
  sealed: { label: '🔒 密封缸盖', essential: true, note: '不密封则物质"开挂"——测不出缸的自给能力' },
};

function healthAt(day: number, picks: Record<ComponentKey, boolean>): number {
  let health = 100;
  const decay = (from: number, per: number) => {
    if (day > from) health -= (day - from) * per;
  };
  if (!picks.water) return Math.max(0, 100 - day * 20);
  if (!picks.light) decay(6, 9);
  else if (!picks.producer) decay(10, 5);
  else if (!picks.sealed) decay(12, 2.5);
  else if (!picks.decomposer) decay(14, 3);
  if (picks.consumer && picks.producer && picks.light) health -= 0; // 平衡
  if (!picks.consumer) health -= 0;
  return Math.max(0, health);
}

function statusText(health: number, picks: Record<ComponentKey, boolean>): string {
  if (health >= 85) return '清澈稳定：水草放氧、螺活动正常、底层残叶被分解';
  if (health >= 60) return '轻微波动：局部藻类增多，但循环仍在维持';
  if (health >= 30) return '明显恶化：水色发暗，生物活动减弱';
  return '接近崩溃：大部分生物死亡，只剩臭水和沉积物';
}

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function EcosystemJarLab() {
  const [picks, setPicks] = useState<Record<ComponentKey, boolean>>({
    light: true,
    water: true,
    producer: true,
    consumer: true,
    decomposer: true,
    sealed: true,
  });
  const [day, setDay] = useState(0);

  const health = Math.round(healthAt(day, picks));
  const toggle = (key: ComponentKey) => {
    setPicks((prev) => ({ ...prev, [key]: !prev[key] }));
    setDay(0);
  };
  const advance = () => setDay((d) => Math.min(30, d + 5));
  const reset = () => {
    setDay(0);
  };

  const observation = (() => {
    if (day === 0) return '配置完成后点「封缸观察」开始推进。先做全组分标准缸，再逐个抽掉组分对比崩溃速度。';
    const missing = (Object.keys(COMPONENTS) as ComponentKey[]).filter((k) => !picks[k]);
    const healthNote = health >= 60 ? '健康度尚可' : health >= 30 ? '健康度堪忧' : '健康度极低';
    if (missing.length === 0) return `第 ${day} 天：全组分标准缸。${statusText(health, picks)}——密封缸物质自给，能量靠光持续输入。`;
    const key = missing[0];
    return `第 ${day} 天：缺少「${COMPONENTS[key].label}」。${COMPONENTS[key].note}。${healthNote}（${health} 分）。`;
  })();

  const wilting = health < 60;
  const dying = health < 30;

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">缸内组分（点击增减）</p>
              <div className="grid gap-1.5">
                {(Object.keys(COMPONENTS) as ComponentKey[]).map((key) => (
                  <button key={key} type="button" onClick={() => toggle(key)} aria-pressed={picks[key]} className={`${cnChip(picks[key])} w-full text-left`}>
                    {COMPONENTS[key].label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={advance}
              disabled={day >= 30}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              推进 5 天（第 {day} 天 / 30 天）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新配缸
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              健康度：<span className={`text-base font-bold ${health >= 60 ? 'text-[#2f7a4d]' : health >= 30 ? 'text-[#c98a1d]' : 'text-[#b0483a]'}`}>{health}</span> / 100
              <br />
              {statusText(health, picks).slice(0, 18)}…
            </div>
          </>
        }
      >
        <SceneBox label="生态缸剖面（密封 · 30 天观察）" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 太阳 */}
            {picks.light ? (
              <g>
                <circle cx="392" cy="42" r="20" fill="#f4d06a" stroke="#c98a1d" strokeWidth="3" />
                {[[392, 12], [392, 72], [362, 42], [422, 42], [371, 21], [413, 21], [371, 63], [413, 63]].map(([x, y], i) => (
                  <line key={i} x1="392" y1="42" x2={x} y2={y} stroke="#c98a1d" strokeWidth="2.5" strokeLinecap="round" />
                ))}
                <path d="M368 70 Q 300 96 220 108" fill="none" stroke="#e0b020" strokeWidth="2.5" strokeDasharray="6 5" markerEnd="url(#jar-arrow)" />
              </g>
            ) : (
              <text x="392" y="48" textAnchor="middle" fontSize="13" fill="#9ab0b5" fontWeight="700">无光 🌑</text>
            )}
            {/* 缸体 */}
            <rect x="52" y="96" width="336" height="176" rx="14" fill="#f2fbfa" stroke="#5a7a8a" strokeWidth="4" />
            {picks.sealed ? <rect x="44" y="82" width="352" height="16" rx="7" fill="#5a7a8a" /> : <text x="400" y="94" fontSize="12.5" fill="#b0483a" fontWeight="700">未密封</text>}
            {/* 泥沙 */}
            <rect x="58" y="238" width="324" height="28" fill="#c9b08a" />
            {/* 水 */}
            {picks.water ? <rect x="58" y="126" width="324" height="112" fill="#cfe4f0" opacity="0.75" /> : (
              <text x="220" y="200" textAnchor="middle" fontSize="14" fill="#b0483a" fontWeight="700">缸内无水</text>
            )}
            {/* 生产者 */}
            {picks.producer ? (
              <g opacity={dying ? 0.35 : wilting ? 0.6 : 1} style={{ transition: 'opacity 0.4s ease' }}>
                {[[110, 242], [146, 242]].map(([x, y], i) => (
                  <g key={i} stroke="#2f7a4d" strokeWidth="4" strokeLinecap="round">
                    <path d={`M${x} ${y} Q ${x - 18} ${y - 40} ${x - 6} ${y - 74}`} fill="none" />
                    <path d={`M${x} ${y} Q ${x + 16} ${y - 46} ${x + 8} ${y - 88}`} fill="none" />
                    <path d={`M${x} ${y} Q ${x + 26} ${y - 30} ${x + 20} ${y - 60}`} fill="none" />
                  </g>
                ))}
              </g>
            ) : null}
            {/* 消费者（螺） */}
            {picks.consumer ? (
              <g opacity={dying ? 0.35 : 1}>
                <path d="M258 226 q 20 -26 40 -6 q 10 12 -4 16 l -32 0 q -10 -4 -4 -10 Z" fill="#c98a6a" stroke="#9a6430" strokeWidth="2.5" />
                <circle cx="302" cy="220" r="7" fill="#e8c9a8" stroke="#9a6430" strokeWidth="2" />
              </g>
            ) : null}
            {/* 分解者 */}
            {picks.decomposer ? (
              <g opacity={dying ? 0.4 : 1}>
                {[[92, 254], [124, 260], [186, 256], [238, 260], [300, 254], [344, 258]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="4" fill="#8a671b" />
                ))}
              </g>
            ) : null}
            {/* 健康条 */}
            <rect x="52" y="16" width="336" height="18" rx="9" fill="#e5eff0" />
            <rect x="52" y="16" width={Math.max(6, health * 3.36)} height="18" rx="9" fill={health >= 60 ? '#2f7a4d' : health >= 30 ? '#c98a1d' : '#b0483a'} style={{ transition: 'width 0.4s ease' }} />
            <text x="220" y="30" textAnchor="middle" fontSize="12.5" fill="#ffffff" fontWeight="700">健康度 {health}</text>
            {/* 崩溃标记 */}
            {dying ? <text x="220" y="62" textAnchor="middle" fontSize="14" fill="#b0483a" fontWeight="700">⚠ 生态系统正在崩溃——自我调节能力是有限的</text> : null}
            <defs>
              <marker id="jar-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L9 4.5 L0 9 Z" fill="#e0b020" />
              </marker>
            </defs>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
