'use client';

import { useMemo, useState } from 'react';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>调查活动能力强、活动范围大的动物（如田鼠），不能用样方法，常用<span className="font-semibold">标志重捕法</span>。</>,
      <>原理：第一次捕获并标记 M 只后放回，一段时间后重捕 n 只，若其中带标记的有 m 只，则种群数量 <span className="font-semibold">N ≈ M × n ÷ m</span>（标记个体在重捕样本中的比例 ≈ 它在种群中的比例）。</>,
      <>前提：标记不能脱落、不能影响动物的活动与被捕获概率；重捕前个体要充分混匀。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>初捕标记数 M、重捕数量 n 由你决定；重捕中数到的标记数 m 由种群"真值"按比例抽样（带随机波动）。</>,
      <>同一批种群可以多次重捕：多次估算取平均，结果更接近真值。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 调大"初捕标记数"，点击「标记后放回」。</>,
      <>② 选择重捕数量，点击「重捕一次」，读出 m 和估算公式。</>,
      <>③ 重捕至少 3 次后，点「对照真实数量」看估算误差；对比 M、n 取大取小时哪种更准。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>若 m = 0，公式失效（估算无穷大）——M 或 n 太小是常见错误。</>,
      <>误判题：标志重捕法也常用于<span className="font-semibold">活动能力强的动物</span>；植物与活动能力弱的动物用样方法。</>,
      <>估算偏差来源：标记脱落、标记个体更易/更难被捕、放回后未混匀、调查期间大量出生或迁入。</>,
    ],
  },
];

/** 真实种群数量（学生完成后揭晓） */
const TRUE_N = 240;
const TOTAL_DOTS = 240;

/** 确定性伪随机：同一 seed 下画面稳定，重捕一轮换一个 seed */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Round = { M: number; n: number; m: number; estimate: number | null; seed: number };

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function MarkRecaptureLab() {
  const [marked, setMarked] = useState(false);
  const [M, setM] = useState(30);
  const [n, setN] = useState(40);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [revealed, setRevealed] = useState(false);

  // 标记集合与重捕集合（确定性抽样）
  const markedSet = useMemo(() => {
    const rand = mulberry32(777);
    const idx = Array.from({ length: TOTAL_DOTS }, (_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return new Set(idx.slice(0, M));
  }, [M, marked]);

  const lastRound = rounds[rounds.length - 1] ?? null;
  const recapturedSet = useMemo(() => {
    if (!marked || !lastRound) return new Set<number>();
    const rand = mulberry32(lastRound.seed);
    const idx = Array.from({ length: TOTAL_DOTS }, (_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return new Set(idx.slice(0, lastRound.n));
  }, [marked, lastRound]);

  const validRounds = rounds.filter((r) => r.estimate != null);
  const avgEstimate = validRounds.length
    ? Math.round(validRounds.reduce((s, r) => s + (r.estimate ?? 0), 0) / validRounds.length)
    : null;
  const avgError = avgEstimate ? Math.round((Math.abs(avgEstimate - TRUE_N) / TRUE_N) * 100) : null;

  const markAndRelease = () => setMarked(true);

  const recapture = () => {
    if (!marked) return;
    const seed = 1000 + rounds.length * 97 + M * 13 + n;
    // 标记数 m 按比例抽样并带随机波动（超几何分布的近似）
    const expected = (n * M) / TRUE_N;
    const rand = mulberry32(seed + 5);
    const jitter = Math.round((rand() - 0.5) * Math.max(2, expected * 0.8));
    const m = Math.max(0, Math.min(n, Math.round(expected) + jitter));
    const estimate = m > 0 ? Math.round((M * n) / m) : null;
    setRounds((prev) => [...prev, { M, n, m, estimate, seed }]);
  };

  const reset = () => {
    setMarked(false);
    setRounds([]);
    setRevealed(false);
  };

  // 草地网格坐标
  const dots = Array.from({ length: TOTAL_DOTS }, (_, i) => ({
    x: 26 + (i % 30) * 13,
    y: 52 + Math.floor(i / 30) * 15,
  }));

  const observation = (() => {
    if (!marked) return '第一步：选择初捕数量并「标记后放回」——想想为什么 M 不能太小？';
    if (!lastRound) return `已标记并放回 ${M} 只。现在选一个重捕数量 n，开始第一次重捕。`;
    const mText = lastRound.m > 0 ? `数到 ${lastRound.m} 只带标记` : '一只带标记的都没捕到（m = 0，公式失效）';
    const est = lastRound.estimate
      ? `按 N = M×n÷m = ${lastRound.M}×${lastRound.n}÷${lastRound.m} ≈ ${lastRound.estimate} 只`
      : '需要增大 M 或 n 后重试';
    if (revealed && avgEstimate) {
      return `${mText}。${est}。${validRounds.length} 次平均估算 ${avgEstimate} 只，与真值 ${TRUE_N} 相差 ${avgError}%——增大 M 和 n 能显著缩小误差。`;
    }
    return `${mText}。${est}。再重捕几次取平均（${validRounds.length}/3 次后可对照真值）。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <ControlSlider
              label="① 初捕并标记 M 只"
              value={M}
              unit="只"
              min={10}
              max={60}
              step={5}
              accent="rose"
              onChange={setM}
            />
            <button type="button" onClick={markAndRelease} disabled={marked} className={`${cnChip(marked)} w-full disabled:opacity-55`}>
              {marked ? `✅ 已标记 ${M} 只并放回` : '标记后放回'}
            </button>
            <ControlSlider
              label="② 重捕数量 n"
              value={n}
              unit="只"
              min={20}
              max={80}
              step={5}
              accent="teal"
              onChange={setN}
            />
            <button type="button" onClick={recapture} disabled={!marked} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40">
              重捕一次（第 {rounds.length + 1} 轮）
            </button>
            <button
              type="button"
              onClick={() => setRevealed(true)}
              disabled={validRounds.length < 3 || revealed}
              className={`${cnChip(revealed)} w-full disabled:cursor-not-allowed disabled:opacity-40`}
            >
              对照真实数量（需 ≥3 轮）
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              最近一轮：{lastRound ? `m = ${lastRound.m}，估算 ${lastRound.estimate ?? '∞'} 只` : '—'}
              <br />
              {validRounds.length > 0 ? `${validRounds.length} 轮平均估算：${avgEstimate} 只${revealed ? `（真值 ${TRUE_N}，误差 ${avgError}%）` : ''}` : '尚无有效估算'}
            </div>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重置模型
            </button>
          </>
        }
      >
        <SceneBox label="种群示意（● 未标记 · 🔴 已标记 · ⭕ 本次重捕到）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            <rect x="12" y="30" width="416" height="238" rx="12" fill="#e7f3e2" stroke="#b9d8b2" strokeWidth="2.5" />
            <text x="220" y="22" textAnchor="middle" fontSize="15" fill="#3d7a4a" fontWeight="700">某田鼠种群（示意图，每只一个点）</text>
            {dots.map((d, i) => {
              const isMarked = marked && markedSet.has(i);
              const isRecaptured = isMarked && recapturedSet.has(i);
              return (
                <g key={i}>
                  {isRecaptured ? <circle cx={d.x} cy={d.y} r="6.5" fill="none" stroke="#0e6f75" strokeWidth="2.5" /> : null}
                  <circle
                    cx={d.x}
                    cy={d.y}
                    r={isMarked ? 4.4 : 3.8}
                    fill={isMarked ? '#d05a4a' : '#5f8a54'}
                    stroke={isMarked ? '#a8382a' : '#4a6f42'}
                    strokeWidth="1.4"
                    style={{ transition: 'fill 0.3s ease' }}
                  />
                </g>
              );
            })}
            {revealed ? (
              <g>
                <rect x="252" y="44" width="164" height="34" rx="8" fill="#ffffff" opacity="0.94" stroke="#b9d8b2" strokeWidth="2" />
                <text x="334" y="66" textAnchor="middle" fontSize="15" fill="#2f7a4d" fontWeight="700">真实数量 = {TRUE_N} 只</text>
              </g>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
