'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

type ActionId = 'dry' | 'hydro' | 'rinseW' | 'rinseS' | 'stainMG' | 'stainI';

const ACTIONS: Record<ActionId, { label: string; short: string; color: string; desc: string }> = {
  dry: { label: '烘干涂片', short: '烘干', color: '#c9a86a', desc: '酒精灯烘干固定涂片' },
  hydro: { label: '8% 盐酸 30℃ 水浴 5 min', short: '盐酸水解', color: '#d9c23e', desc: '水解，改变细胞膜通透性' },
  rinseW: { label: '蒸馏水冲洗', short: '蒸馏水冲洗', color: '#7fb8d4', desc: '洗去盐酸' },
  rinseS: { label: '生理盐水冲洗', short: '生理盐水冲洗', color: '#d9c982', desc: '？这个能洗掉盐酸吗' },
  stainMG: { label: '甲基绿-吡罗红染色', short: '甲基绿吡罗红', color: '#8a6bb0', desc: '甲基绿→DNA，吡罗红→RNA' },
  stainI: { label: '碘液染色', short: '碘液', color: '#8a671b', desc: '碘液是用来检测淀粉的……' },
};

/** 正确顺序 */
const CANONICAL: ActionId[] = ['dry', 'hydro', 'rinseW', 'stainMG'];

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>甲基绿和吡罗红对 DNA、RNA 的亲和力不同：<span className="font-semibold">甲基绿使 DNA 呈绿色，吡罗红使 RNA 呈红色</span>（吡罗红分子小，易进入 RNA 所在的细胞质）。</>,
      <>用 8% 盐酸处理能<span className="font-semibold">改变细胞膜的通透性</span>，加速染色剂进入细胞，同时使染色体中的 DNA 与蛋白质分离，利于染色。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：人的口腔上皮细胞（或洋葱鳞片叶内表皮细胞）。</>,
      <>试剂：质量分数 8% 盐酸、甲基绿-吡罗红混合染色剂、蒸馏水、生理盐水。</>,
      <>用具：载玻片、盖玻片、消毒牙签、滴管、小烧杯、酒精灯、30℃ 恒温水浴锅、显微镜。</>,
    ],
  },
  {
    title: '方法步骤（正确顺序）',
    lines: [
      <>① 取口腔上皮细胞涂片，酒精灯烘干固定。</>,
      <>② 放入 8% 盐酸中，30℃ 水浴 5 min（水解）。</>,
      <>③ 用蒸馏水冲洗涂片（洗去盐酸）。</>,
      <>④ 滴加甲基绿-吡罗红混合染色剂染色 5 min，冲洗后盖上盖玻片镜检。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>冲洗必须用<span className="font-semibold">蒸馏水</span>；用生理盐水冲不掉盐酸，会干扰染色效果。</>,
      <>不经过盐酸水解直接染色，染色剂难以进入细胞，颜色浅且分布异常——顺序很重要。</>,
      <>碘液用于检测淀粉，与本实验无关。</>,
      <>结论：绿色集中在细胞核（DNA 主要分布区），红色分布在细胞质（RNA 主要分布区）——说明 DNA、RNA 在细胞中的分布部位不同。</>,
    ],
  },
];

type Verdict = { status: 'pending' | 'success' | 'fail'; title: string; detail: string };

export function DnaRnaDistributionLab() {
  const [step, setStep] = useState(0);
  const [applied, setApplied] = useState<ActionId[]>([]);
  const [shakeKey, setShakeKey] = useState(0);

  const has = (id: ActionId) => applied.includes(id);
  const stained = has('stainMG') || has('stainI');

  // 结论判定
  const verdict: Verdict = (() => {
    if (!stained) {
      return {
        status: 'pending',
        title: '尚未染色',
        detail: '涂片处理中……按你选的顺序操作，染色后才能看到结果。',
      };
    }
    if (has('stainI')) {
      return {
        status: 'fail',
        title: '❌ 用错染色剂：碘液',
        detail: '碘液是用来检测淀粉的（变蓝），不能给 DNA/RNA 染色。视野只有淡棕黄色。重做并改用甲基绿-吡罗红。',
      };
    }
    if (!has('hydro')) {
      return {
        status: 'fail',
        title: '❌ 跳过了盐酸水解',
        detail: '染色剂很难进入未经处理的细胞，颜色极浅且弥散，看不出核绿胞质红的分布。正确流程：烘干→盐酸水解→蒸馏水冲洗→染色。',
      };
    }
    if (has('rinseS')) {
      return {
        status: 'fail',
        title: '❌ 用生理盐水冲洗',
        detail: '生理盐水冲不掉残留盐酸，酸性环境干扰吡罗红与 RNA 结合，细胞质红色异常变浅。应改用蒸馏水冲洗。',
      };
    }
    if (!has('rinseW')) {
      return {
        status: 'fail',
        title: '❌ 没有冲洗就染色',
        detail: '残留的盐酸会使染色剂失效，颜色发暗浑浊。正确流程：水解后必须先用蒸馏水冲洗，再染色。',
      };
    }
    if (!has('dry')) {
      return {
        status: 'success',
        title: '✅ 勉强成功（少了烘干固定）',
        detail: '细胞核呈绿色（DNA），细胞质呈红色（RNA）。不过规范流程应先烘干固定涂片，防止细胞脱落。',
      };
    }
    return {
      status: 'success',
      title: '✅ 实验成功',
      detail: '细胞核呈绿色（DNA 主要分布），细胞质呈红色（RNA 主要分布）——DNA 与 RNA 在细胞中的分布区域不同。',
    };
  })();

  const cellFill = (() => {
    if (has('stainI')) return '#e8dcc0';
    if (has('stainMG')) {
      if (verdict.status === 'success') return '#e88888';
      return '#c9a8a8';
    }
    return '#f2f0ec';
  })();

  const apply = (id: ActionId) => {
    if (has(id)) return;
    setApplied((list) => [...list, id]);
    if (id === 'stainI') setShakeKey((k) => k + 1);
  };

  const GUIDE = CANONICAL.map((id) => ({
    label: ACTIONS[id].label,
    hint:
      id === 'dry'
        ? '先把涂片烘干固定，防止后面水浴冲洗时细胞脱落。'
        : id === 'hydro'
          ? '盐酸能改变细胞膜通透性、使 DNA 与蛋白质分离——这一步决定染色成败。'
          : id === 'rinseW'
            ? '用蒸馏水洗去残留盐酸（想一想：换成生理盐水的后果，可以在自由操作里试试）。'
            : '甲基绿-吡罗红混合染色剂：甲基绿把 DNA 染成绿色，吡罗红把 RNA 染成红色。',
    action: () => apply(id),
  }));

  const reset = () => {
    setApplied([]);
    setStep(0);
  };

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">操作台（顺序自选，做错能看到后果）</p>
              <div className="grid gap-1.5">
                {(Object.keys(ACTIONS) as ActionId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    disabled={has(id)}
                    onClick={() => apply(id)}
                    title={ACTIONS[id].desc}
                    className={`flex min-h-10 items-center gap-2 rounded-md border px-2.5 text-left text-xs font-medium transition-colors ${
                      has(id)
                        ? 'cursor-default border-[#cfe6e4] bg-[#f2faf9] text-[#8fb0b5] line-through'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    <span aria-hidden="true" className="size-3 shrink-0 rounded-full border border-[#c9d8d4]" style={{ backgroundColor: ACTIONS[id].color }} />
                    {ACTIONS[id].short}
                    {has(id) ? '（已做）' : ''}
                  </button>
                ))}
              </div>
            </div>

            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              换一张新涂片重做
            </button>

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              已完成操作：{applied.length === 0 ? '（无）' : applied.map((id) => ACTIONS[id].short).join(' → ')}
            </div>
          </>
        }
      >
        <SceneBox label="显微视野：口腔上皮细胞" heightClass="h-[320px]">
          <svg className="h-full w-full" viewBox="0 0 420 260" aria-hidden="true">
            {/* 三个细胞 */}
            {[
              { cx: 110, cy: 90 },
              { cx: 265, cy: 120 },
              { cx: 165, cy: 200 },
            ].map(({ cx, cy }, i) => (
              <g key={i} className={has('stainI') ? 'bio-shake' : undefined} style={has('stainI') ? { animationDelay: `${i * 0.08}s` } : undefined}>
                {/* 细胞质（吡罗红 → 红色） */}
                <ellipse
                  cx={cx}
                  cy={cy}
                  rx="58"
                  ry="40"
                  fill={cellFill}
                  stroke="#b8a8a8"
                  strokeWidth="1.8"
                  style={{ transition: 'fill 1s ease' }}
                />
                {/* 细胞质红色颗粒（RNA）——仅成功时 */}
                {has('stainMG') && verdict.status === 'success'
                  ? [
                      [cx - 34, cy - 14], [cx + 28, cy - 20], [cx + 34, cy + 12], [cx - 24, cy + 18], [cx + 6, cy - 26], [cx - 4, cy + 24],
                    ].map(([x, y], j) => (
                      <circle key={j} cx={x} cy={y} r="3.4" fill="#d05a5a" opacity="0.85" />
                    ))
                  : null}
                {/* 细胞核（甲基绿 → 绿色） */}
                <ellipse
                  cx={cx}
                  cy={cy}
                  rx="22"
                  ry="15"
                  fill={has('stainMG') && verdict.status === 'success' ? '#3fae5a' : has('stainMG') ? '#9ab89a' : '#ded8d0'}
                  stroke={has('stainMG') && verdict.status === 'success' ? '#2c7a44' : '#b8b0a8'}
                  strokeWidth="1.6"
                  style={{ transition: 'fill 1s ease' }}
                />
                {has('stainMG') && verdict.status === 'success' ? (
                  <text x={cx} y={cy + 4} textAnchor="middle" fontSize="9" fill="#ffffff" fontWeight="700">
                    DNA
                  </text>
                ) : null}
              </g>
            ))}

            {/* 盐酸处理提示 */}
            {has('hydro') && !has('rinseW') && !has('rinseS') ? (
              <text x="210" y="30" textAnchor="middle" fontSize="10" fill="#a08818" fontWeight="600">
                ⚠ 涂片上残留盐酸（还未冲洗）
              </text>
            ) : null}

            {/* 图例 */}
            {has('stainMG') && verdict.status === 'success' ? (
              <g>
                <rect x="24" y="216" width="372" height="30" rx="6" fill="#ffffff" opacity="0.85" />
                <circle cx="40" cy="231" r="6" fill="#3fae5a" />
                <text x="50" y="235" fontSize="10" fill="#2c7a44" fontWeight="600">
                  绿色 = DNA（细胞核）
                </text>
                <circle cx="200" cy="231" r="5" fill="#d05a5a" />
                <text x="210" y="235" fontSize="10" fill="#a83c3c" fontWeight="600">
                  红色 = RNA（细胞质）
                </text>
              </g>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>
          <span className={verdict.status === 'fail' ? 'font-semibold text-[#b0483a]' : undefined}>{verdict.title}</span>
          {verdict.detail}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
