'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';
import { LabModeToggle } from '@/components/lab/lab-mode-toggle';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>低温（4℃）能<span className="font-semibold">抑制纺锤体的形成</span>：细胞继续复制 DNA，但复制后的染色体无法被拉向两极，细胞不能分裂成两个子细胞。</>,
      <>结果：染色体数目<span className="font-semibold">加倍</span>（2n → 4n）——这就是多倍体形成的原理之一（秋水仙素原理相同）。</>,
      <>对照组：常温（25℃ 左右）培养的根尖。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：洋葱（或大蒜、蚕豆）根尖，低温诱导前待根长出约 1cm。</>,
      <>试剂：卡诺氏液（固定）、体积分数 15% 盐酸 + 95% 酒精（解离）、龙胆紫（染色）、清水。</>,
      <>用具：冰箱（4℃）、显微镜、载玻片、盖玻片。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 低温诱导：根尖连同洋葱放入 4℃ 冰箱培养 36 h；对照组留在常温。</>,
      <>② 取材固定：剪取根尖，放入卡诺氏液中浸泡 0.5~1 h 固定。</>,
      <>③ 解离：盐酸酒精混合液 3~5 min → 漂洗 → 染色（龙胆紫）→ 压片。</>,
      <>④ 显微镜观察：比较两组根尖细胞的染色体数目。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>与有丝分裂观察实验的区别：本实验需先<span className="font-semibold">低温诱导 36 h</span>，且要用卡诺氏液固定（该实验不用解离前的固定，是解离液）。</>,
      <>原理：<span className="font-semibold">低温抑制纺锤体形成</span>，染色体复制后不能移向两极，细胞不分裂 → 染色体数目加倍。</>,
      <>秋水仙素与低温原理相同：都是抑制纺锤体形成。</>,
      <>显微镜下判断：加倍的细胞染色体数目明显多于正常细胞（约 2 倍）。</>,
    ],
  },
];

type Group = 'normal' | 'cold';

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function LowTempPolyploidLab() {
  const [guided, setGuided] = useState(true);
  const [view, setView] = useState<Group>('normal');

  const observation =
    view === 'cold'
      ? '低温组：视野中部分细胞的染色体数目明显加倍（2n→4n）——低温抑制了纺锤体形成，复制的染色体不能分配到两个子细胞中。这就是多倍体形成的原理。'
      : '常温对照组：细胞正常完成分裂，染色体数目保持 2n 不变。与低温组对照，才能说明"染色体加倍是低温诱导的结果"。';

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <LabModeToggle guided={guided} onChange={setGuided} />

            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择观察的装片</p>
              <div className="grid grid-cols-2 gap-1.5">
                <button type="button" onClick={() => setView('normal')} aria-pressed={view === 'normal'} className={cnChip(view === 'normal')}>
                  常温对照组
                </button>
                <button type="button" onClick={() => setView('cold')} aria-pressed={view === 'cold'} className={cnChip(view === 'cold')}>
                  低温诱导组
                </button>
              </div>
            </div>

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              实验分组：实验组 4℃ 冰箱诱导 36h；对照组常温培养。两组同步进行后续固定、解离、染色、制片。
            </div>
          </>
        }
      >
        <SceneBox label="显微视野对比（点击上方切换装片）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 视野圆 ×2 */}
            {(['normal', 'cold'] as const).map((g) => {
              const isActive = view === g;
              const cx = g === 'normal' ? 120 : 320;
              const cy = 150;
              const doubled = g === 'cold';
              const counts = doubled ? [8, 8, 8, 8] : [4, 4, 4, 4];
              const cellR = doubled ? 20 : 13;
              return (
                <g key={g} opacity={isActive ? 1 : 0.35}>
                  <circle cx={cx} cy={cy} r="92" fill="#fbfcf8" stroke="#c4d6da" strokeWidth="4" />
                  {/* 4 个细胞，各含染色体棒 */}
                  {[
                    [0, -46],
                    [0, 46],
                    [-46, 0],
                    [46, 0],
                  ].map(([dx, dy], ci) => (
                    <g key={ci} transform={`translate(${cx + dx} ${cy + dy})`}>
                      <circle r={cellR} fill="#efe8f4" stroke="#9a6fb5" strokeWidth="2" />
                      {counts.map((k) => {
                        const th = (k / counts.length) * Math.PI * 2;
                        const x1 = Math.cos(th) * (cellR * 0.35);
                        const y1 = Math.sin(th) * (cellR * 0.35);
                        const x2 = Math.cos(th) * (cellR * 0.85);
                        const y2 = Math.sin(th) * (cellR * 0.85);
                        return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7a4a8a" strokeWidth="2.6" strokeLinecap="round" />;
                      })}
                    </g>
                  ))}
                  <text x={cx} y={cy + 120} textAnchor="middle" fontSize="11" fill={doubled ? '#8a5a1b' : '#4b6c73'} fontWeight="700">
                    {doubled ? '低温诱导组：染色体加倍' : '常温对照：染色体 2n'}
                  </text>
                </g>
              );
            })}
            <text x="220" y="26" textAnchor="middle" fontSize="11" fill="#4b6c73" fontWeight="700">
              {view === 'cold' ? '低温组：部分细胞染色体数目加倍（4n）' : '对比观察：找染色体数目加倍的细胞'}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
