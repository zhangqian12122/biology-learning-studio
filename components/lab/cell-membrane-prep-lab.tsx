'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>哺乳动物成熟的<span className="font-semibold">红细胞没有细胞壁</span>，也没有细胞核和众多细胞器——涨破后流出内容物，剩下的结构就是较纯净的细胞膜。</>,
      <>红细胞内的血红蛋白等有机物能提高细胞内渗透压，放入蒸馏水（低渗溶液）后会大量吸水涨破（溶血）。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：新鲜猪（或牛、羊）红细胞稀释液。</>,
      <>试剂：蒸馏水、质量分数 0.9% 的生理盐水。</>,
      <>用具：滴管、载玻片、盖玻片、显微镜。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 取一滴红细胞稀释液滴在载玻片上，盖上盖玻片，先用显微镜观察正常形态（双凹圆饼状、中央稍凹）。</>,
      <>② 在盖玻片一侧滴加蒸馏水，另一侧用吸水纸引流，使清水渗入。</>,
      <>③ 持续观察：红细胞吸水膨胀，接近球形，最后涨破，内容物流出。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>选哺乳动物成熟红细胞的原因是<span className="font-semibold">"一无两没有"</span>：无细胞壁易涨破；无核膜和众多细胞器膜，得到的膜成分单纯。</>,
      <>引流时滴加蒸馏水不能过量过快，防止玻片标本随水流动。</>,
      <>若改用 0.9% 生理盐水（等渗溶液），红细胞维持正常形态——这就是自由操作里的对照组。</>,
      <>鸟类红细胞有细胞核、植物细胞有细胞壁，都不适合本实验。</>,
    ],
  },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function CellMembranePrepLab() {
  const [step, setStep] = useState(0);
  const [solution, setSolution] = useState<'water' | 'saline'>('saline');
  const [net, setNet] = useState(0); // 净水分：每滴清水 +1，每滴生理盐水 -1
  const [burst, setBurst] = useState(false);
  const [dropKey, setDropKey] = useState(0);

  const BURST_AT = 4;
  const swell = Math.min(net, BURST_AT);
  const rx = 62 + swell * 7;
  const ry = 40 + swell * 8.5;
  const nearBurst = !burst && net >= BURST_AT - 1;

  const addDrop = () => {
    if (burst) return;
    setDropKey((k) => k + 1);
    setNet((n) => {
      const next = Math.max(0, Math.min(BURST_AT, n + (solution === 'water' ? 1 : -1)));
      if (next >= BURST_AT) setBurst(true);
      return next;
    });
  };

  const reset = () => {
    setNet(0);
    setBurst(false);
    setSolution('saline');
    setStep(0);
  };

  // 引导步骤：选蒸馏水 → 滴 ×4 → 观察结论

  const observation = burst
    ? '红细胞涨破了！内容物（血红蛋白）流出，视野中只剩空瘪的细胞膜残片——这就是"制备细胞膜"的原理。因为哺乳动物成熟红细胞无细胞壁、无核膜和众多细胞器膜，得到的膜最纯净。'
    : net > 0 && solution === 'water'
      ? `已滴入 ${net} 滴蒸馏水：红细胞吸水膨胀${nearBurst ? '，已接近球形——再滴就要涨破了！' : '，中央凹陷变浅。'}`
      : solution === 'saline' && net > 0
        ? '滴的是 0.9% 生理盐水（等渗溶液）：水分进出平衡，红细胞保持双凹圆饼状——这是本实验的对照。'
        : '视野中是正常形态的红细胞（双凹圆饼状）。自由操作模式：自己选溶液、自己决定滴几滴，试试让它涨破。';

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择滴加的溶液</p>
              <div className="grid grid-cols-2 gap-1.5">
                <button type="button" onClick={() => setSolution('water')} aria-pressed={solution === 'water'} className={cnChip(solution === 'water')}>
                  💧 蒸馏水
                </button>
                <button type="button" onClick={() => setSolution('saline')} aria-pressed={solution === 'saline'} className={cnChip(solution === 'saline')}>
                  🧂 生理盐水
                </button>
              </div>
            </div>
            <button
              type="button"
              disabled={burst}
              onClick={addDrop}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              滴加一滴（已滴净水分 {net}）
            </button>

            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              换新的红细胞重做
            </button>

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              状态：{burst ? '已涨破（溶血）' : nearBurst ? '接近球形，即将涨破' : net > 0 ? '吸水膨胀中' : '正常双凹圆饼状'}
            </div>
          </>
        }
      >
        <SceneBox label="显微视野：红细胞（哺乳动物成熟红细胞）" heightClass="h-[320px]">
          <svg className="h-full w-full" viewBox="0 0 420 260" aria-hidden="true">
            {/* 背景 */}
            <rect x="0" y="0" width="420" height="260" fill="#f4f8f7" />

            {/* 涨破后流出的内容物红晕 */}
            {burst ? (
              <g className="bio-pop" style={{ transformOrigin: '210px 130px' }}>
                <circle cx="210" cy="130" r="96" fill="#d98a8a" opacity="0.22" />
                <circle cx="210" cy="130" r="66" fill="#c96a6a" opacity="0.3" />
              </g>
            ) : null}

            {/* 红细胞本体（双凹圆饼 → 膨胀接近球形） */}
            {!burst ? (
              <g>
                <ellipse
                  cx="210"
                  cy="130"
                  rx={rx}
                  ry={ry}
                  fill="#d96a6a"
                  stroke="#b0483a"
                  strokeWidth="2.5"
                  style={{ transition: 'all 0.6s ease' }}
                />
                {/* 中央凹陷（膨胀时变浅） */}
                <ellipse
                  cx="210"
                  cy="130"
                  rx={rx * 0.55 * (1 - swell * 0.16)}
                  ry={ry * 0.45 * (1 - swell * 0.16)}
                  fill="#e89a9a"
                  style={{ transition: 'all 0.6s ease' }}
                />
                <text x="210" y={130 - ry - 10} textAnchor="middle" fontSize="11" fill="#8a4a42" fontWeight="600">
                  {net === 0 ? '双凹圆饼状（正常）' : `吸水膨胀（净水分 ${net}）`}
                </text>
              </g>
            ) : (
              <g>
                {/* 涨破后：膜残片 */}
                <path d="M150 130 q 20 -34 60 -30 q 40 4 58 22" fill="none" stroke="#b0483a" strokeWidth="3" strokeDasharray="8 6" />
                <path d="M154 148 q 30 22 66 16 q 30 -5 46 -20" fill="none" stroke="#b0483a" strokeWidth="3" strokeDasharray="8 6" />
                <text x="210" y="70" textAnchor="middle" fontSize="12" fill="#8a4a42" fontWeight="700">
                  涨破！内容物流出
                </text>
                <text x="210" y="196" textAnchor="middle" fontSize="11" fill="#7a5a52">
                  虚线 = 剩下的细胞膜残片
                </text>
              </g>
            )}

            {/* 滴管 */}
            <g key={dropKey}>
              <path d="M60 26 L84 26 L80 52 L64 52 Z" fill="#c4d6da" stroke="#8aa7ad" strokeWidth="1.5" />
              <path d="M64 52 L80 52 L74 66 L70 66 Z" fill="#a9c2c8" />
              <circle cx="72" cy="74" r="3.4" fill={solution === 'water' ? '#7fb8d4' : '#d9c982'} className="bio-drip" />
            </g>
            <text x="72" y="16" textAnchor="middle" fontSize="10" fill="#4b6c73" fontWeight="600">
              {solution === 'water' ? '蒸馏水' : '生理盐水'}
            </text>
          </svg>
          <p className="absolute right-3 top-2 text-[11px] font-semibold text-[#8a671b]">
            {burst ? '⚠ 已涨破' : nearBurst ? '临界！' : ''}
          </p>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
