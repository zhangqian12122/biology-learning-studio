'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

type Substrate = 'starch' | 'sucrose';
type Enzyme = 'amylase' | 'invertase';

const SUBSTRATES: Record<Substrate, string> = { starch: '淀粉溶液', sucrose: '蔗糖溶液' };
const ENZYMES: Record<Enzyme, string> = { amylase: 'α-淀粉酶', invertase: '蔗糖酶' };

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>α-淀粉酶能水解淀粉生成<span className="font-semibold">还原糖（麦芽糖）</span>，还原糖与斐林试剂水浴加热生成砖红色沉淀。</>,
      <>蔗糖不是还原糖，且<span className="font-semibold">淀粉酶不能水解蔗糖</span>——蔗糖液中加淀粉酶后无还原糖生成，斐林试剂不显砖红色。</>,
      <>对照说明：酶的催化具有<span className="font-semibold">专一性</span>（每种酶只能催化一种或一类底物的化学反应）。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>试剂：质量分数 3% 可溶性淀粉溶液、3% 蔗糖溶液、α-淀粉酶溶液（60℃ 水浴保温）、斐林试剂。</>,
      <>用具：试管×2、量筒、滴管、60℃ 恒温水浴锅、试管夹。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 取两支试管，分别加入 2mL 淀粉溶液和 2mL 蔗糖溶液。</>,
      <>② 各加入等量（1mL）α-淀粉酶溶液，60℃ 水浴保温 5 min。</>,
      <>③ 各加入等量斐林试剂，<span className="font-semibold">50~65℃ 水浴加热约 2 min</span>。</>,
      <>④ 观察颜色变化：淀粉管出现砖红色沉淀，蔗糖管无砖红色（仍为斐林试剂的蓝色）。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>自变量是底物种类（淀粉/蔗糖）；酶的用量、保温温度与时间都是无关变量，必须一致。</>,
      <>蔗糖本身不是还原糖——即使不加酶也不能与斐林试剂显砖红色（可用蔗糖+蒸馏水做空白对照）。</>,
      <>拓展对照（自由操作里可以试）：蔗糖+蔗糖酶 → 水解生成葡萄糖和果糖（还原糖）→ 砖红色；说明蔗糖酶专一于蔗糖。</>,
      <>加热用 50~65℃ 水浴，不能直接加热；斐林试剂甲乙液等量混合现配现用。</>,
    ],
  },
];

type Tube = {
  substrate: Substrate | null;
  enzyme: Enzyme | null;
  incubated: boolean;
  detected: boolean;
};

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-2 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function AmylaseSpecificityLab() {
  const [step, setStep] = useState(0);
  const [tubes, setTubes] = useState<[Tube, Tube]>([
    { substrate: null, enzyme: null, incubated: false, detected: false },
    { substrate: null, enzyme: null, incubated: false, detected: false },
  ]);
  const [tried, setTried] = useState<Set<string>>(new Set());
  const [activeTube, setActiveTube] = useState<0 | 1>(0);

  const patch = (i: 0 | 1, part: Partial<Tube>) => {
    setTubes((prev) => {
      const next: [Tube, Tube] = [{ ...prev[0] }, { ...prev[1] }];
      next[i] = { ...next[i], ...part };
      return next;
    });
  };

  const runIncubate = (i: 0 | 1) => {
    if (!tubes[i].substrate || !tubes[i].enzyme) return;
    patch(i, { incubated: true });
  };

  const runDetect = (i: 0 | 1) => {
    const t = tubes[i];
    if (!t.incubated) return;
    patch(i, { detected: true });
    setTried((s) => new Set(s).add(`${t.substrate}+${t.enzyme}`));
  };

  const isPositive = (t: Tube) => (t.substrate === 'starch' && t.enzyme === 'amylase') || (t.substrate === 'sucrose' && t.enzyme === 'invertase');

  const allTried = tried.size >= 4;

  // 引导：1号管 淀粉+淀粉酶→保温→检测；2号管 蔗糖+淀粉酶→保温→检测

  const observation = (() => {
    const [a, b] = tubes;
    if (!a.detected && !b.detected) return '按引导步骤操作，或切到「自由操作」自己配 4 种组合（淀粉/蔗糖 × 淀粉酶/蔗糖酶），看哪些能出砖红色。';
    if (a.detected && b.detected) {
      const pa = isPositive(a);
      const pb = isPositive(b);
      if (pa && !pb) return `1 号管砖红色（淀粉被淀粉酶水解出还原糖），2 号管仍蓝色（淀粉酶不水解蔗糖）——同一酶对两种底物结果不同，证明酶具有专一性。`;
      return `1 号管${pa ? '砖红色 ✅' : '无砖红色 ❌'}，2 号管${pb ? '砖红色 ✅' : '无砖红色 ❌'}。只有"底物与酶匹配"的组合才会生成还原糖——这就是专一性。`;
    }
    const done = a.detected ? a : b;
    return done.detected
      ? `${a.detected ? '1' : '2'} 号管已检测：${isPositive(done) ? '出现砖红色沉淀（有还原糖）' : '无砖红色（酶不水解这种底物）'}。继续完成另一支试管做对照。`
      : '';
  })();

  const reset = () => {
    setTubes([
      { substrate: null, enzyme: null, incubated: false, detected: false },
      { substrate: null, enzyme: null, incubated: false, detected: false },
    ]);
    setStep(0);
    setActiveTube(0);
  };

  const renderTube = (t: Tube, i: 0 | 1, cx: number) => {
    const positive = isPositive(t);
    const liquidColor = t.detected ? (positive ? '#b9855c' : '#8fb9d9') : t.incubated ? '#e8e2d2' : t.substrate ? '#efe9da' : '#eef4f5';
    return (
      <g key={i}>
        {/* 试管 */}
        <path d={`M${cx - 17} 60 L${cx - 17} 168 Q${cx - 17} 184 ${cx} 184 Q${cx + 17} 184 ${cx + 17} 168 L${cx + 17} 60`} fill="none" stroke="#9db8bd" strokeWidth="3" strokeLinecap="round" />
        <line x1={cx - 22} y1="64" x2={cx + 22} y2="64" stroke="#9db8bd" strokeWidth="3" strokeLinecap="round" />
        {/* 液体 */}
        <clipPath id={`amy-clip-${i}`}>
          <path d={`M${cx - 17} 66 L${cx - 17} 168 Q${cx - 17} 184 ${cx} 184 Q${cx + 17} 184 ${cx + 17} 168 L${cx + 17} 66 Z`} />
        </clipPath>
        <g clipPath={`url(#amy-clip-${i})`}>
          <rect x={cx - 20} y="96" width="40" height="92" fill={liquidColor} style={{ transition: 'fill 1.2s ease' }} />
          {t.detected && positive
            ? [[cx - 8, 178, 3], [cx + 6, 180, 2.6], [cx, 174, 2.2]].map(([x, y, r], k) => (
                <circle key={k} cx={x} cy={y} r={r} fill="#a63d2a" className="bio-fade" style={{ animationDelay: `${0.5 + k * 0.2}s` }} />
              ))
            : null}
        </g>
        {/* 状态文字 */}
        <text x={cx} y="210" textAnchor="middle" fontSize="11" fill="#4b6c73" fontWeight="700">
          {i + 1} 号管
        </text>
        <text x={cx} y="226" textAnchor="middle" fontSize="9.5" fill="#6b868c">
          {t.substrate ? SUBSTRATES[t.substrate] : '（未加底物）'}
        </text>
        <text x={cx} y="240" textAnchor="middle" fontSize="9.5" fill="#6b868c">
          {t.enzyme ? ENZYMES[t.enzyme] : '（未加酶）'}
        </text>
        <text x={cx} y="254" textAnchor="middle" fontSize="9.5" fill={t.detected ? (positive ? '#a05a2c' : '#4b7a91') : '#9ab0b5'}>
          {t.detected ? (positive ? '砖红色沉淀 ✅' : '无砖红色 ❌') : t.incubated ? '已保温' : ''}
        </text>
      </g>
    );
  };

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择操作的试管</p>
              <div className="grid grid-cols-2 gap-1.5">
                {([0, 1] as const).map((k) => (
                  <button key={k} type="button" onClick={() => setActiveTube(k)} aria-pressed={activeTube === k} className={cnChip(activeTube === k)}>
                    {k + 1} 号管
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">加入底物（2 mL）</p>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(SUBSTRATES) as Substrate[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={tubes[activeTube].incubated}
                    onClick={() => patch(activeTube, { substrate: s, incubated: false, detected: false })}
                    className={`${cnChip(tubes[activeTube].substrate === s)} disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    {SUBSTRATES[s]}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">加入酶（1 mL）</p>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(ENZYMES) as Enzyme[]).map((e) => (
                  <button
                    key={e}
                    type="button"
                    disabled={tubes[activeTube].incubated}
                    onClick={() => patch(activeTube, { enzyme: e, incubated: false, detected: false })}
                    className={`${cnChip(tubes[activeTube].enzyme === e)} disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    {ENZYMES[e]}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button type="button" disabled={!tubes[activeTube].substrate || !tubes[activeTube].enzyme || tubes[activeTube].incubated} onClick={() => runIncubate(activeTube)} className={`${cnChip(tubes[activeTube].incubated)} disabled:cursor-not-allowed disabled:opacity-40`}>
                60℃ 保温
              </button>
              <button type="button" disabled={!tubes[activeTube].incubated} onClick={() => runDetect(activeTube)} className={`${cnChip(false)} border-[#0e6f75] bg-[#0e6f75] text-white hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40`}>
                斐林检测
              </button>
            </div>
            <div className={`rounded-md px-3 py-2.5 text-xs leading-5 ${allTried ? 'border border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'bg-[#eef7f6] text-[#4b6c73]'}`}>
              {allTried ? '🏅 四种组合全部试过！淀粉+淀粉酶 ✅ 蔗糖+蔗糖酶 ✅ 能出砖红；交叉组合 ❌——酶的专一性' : `组合图鉴 ${tried.size}/4：${[...tried].map((c) => c.replace('+', ' + ')).join('、') || '（还没有检测结果）'}`}
            </div>

            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              倒掉重配
            </button>
          </>
        }
      >
        <SceneBox label="两支试管对照（砖红色 = 有还原糖生成）" heightClass="h-[280px]">
          <svg className="h-full w-full" viewBox="0 0 420 270" aria-hidden="true">
            {renderTube(tubes[0], 0, 160)}
            {renderTube(tubes[1], 1, 280)}
            {/* 60℃ 水浴锅（保温时） */}
            {tubes[0].incubated || tubes[1].incubated ? (
              <g>
                <rect x="120" y="130" width="220" height="64" rx="6" fill="#d8edf6" opacity="0.85" />
                <text x="230" y="208" textAnchor="middle" fontSize="10" fill="#3f7183">
                  60℃ 恒温水浴
                </text>
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
