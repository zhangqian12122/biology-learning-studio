'use client';

import { useMemo, useState } from 'react';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';
import { GuideNextButton, LabModeToggle } from '@/components/lab/lab-mode-toggle';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>植物细胞具有<span className="font-semibold">全能性</span>：离体的植物器官、组织或细胞（外植体）在一定条件下能发育成完整植株。</>,
      <>过程：外植体 →<span className="font-semibold">脱分化</span>形成愈伤组织 →<span className="font-semibold">再分化</span>长出根与芽 → 完整植株。</>,
      <>决定再分化方向的关键是<span className="font-semibold">生长素与细胞分裂素的比例</span>：比例适中利于愈伤组织生长；细胞分裂素多利于生芽；生长素多利于生根。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：菊花茎段（外植体）。</>,
      <>试剂：MS 培养基（含蔗糖、琼脂等）、生长素、细胞分裂素、体积分数 70% 酒精、质量分数 0.1% 氯化汞（消毒）。</>,
      <>用具：超净工作台、锥形瓶、接种环、无菌水、培养箱。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 制备 MS 固体培养基（按需加入两类激素），灭菌后分装。</>,
      <>② 取菊花茎段，70% 酒精消毒后用无菌水冲洗，放入培养瓶。</>,
      <>③ 20℃ 左右培养：先脱分化形成愈伤组织（约 2 周），再调整激素配比促进再分化。</>,
      <>④ 移栽驯化：幼苗长出根后移栽到土壤中。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>全程需要<span className="font-semibold">无菌操作</span>：杂菌污染会让培养失败（培养基浑浊长霉）。</>,
      <>激素比例口诀：<span className="font-semibold">生长素/细胞分裂素比例高 → 生根；低 → 生芽；适中 → 愈伤组织</span>。</>,
      <>愈伤组织：排列疏松、无规则、高度液泡化的薄壁细胞团——脱分化产物。</>,
      <>个体发育全过程证明了植物细胞的<span className="font-semibold">全能性</span>。</>,
    ],
  },
];

type Growth = 'callus' | 'roots' | 'shoots';

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function TissueCultureLab() {
  const [guided, setGuided] = useState(true);
  const [step, setStep] = useState(0);
  const [sterile, setSterile] = useState(true);
  const [ratio, setRatio] = useState(50); // 生长素占比 %（0~100）
  const [growth, setGrowth] = useState<Growth>('callus');

  // 消毒步骤跳过 → 污染
  const contaminated = !sterile && step >= 3;

  const growthByRatio = (r: number): Growth => {
    if (r < 30) return 'shoots';
    if (r > 70) return 'roots';
    return 'callus';
  };

  const GUIDE = [
    { label: '制备 MS 培养基', hint: '按配方加入蔗糖、琼脂与两类激素，高温灭菌后分装到培养瓶。', action: () => undefined },
    { label: '菊花茎段消毒', hint: '70% 酒精 + 0.1% 氯化汞依次消毒，无菌水冲洗——杂菌污染会让培养前功尽弃。', action: () => setSterile(true) },
    { label: '接种外植体', hint: '在超净工作台把茎段插入培养基。', action: () => setGrowth('callus') },
    { label: '脱分化培养 2 周', hint: '激素比例适中（50:50 左右）→ 形成疏松的愈伤组织。', action: () => setGrowth('callus') },
    { label: '调整激素比例，再分化', hint: '左侧滑块：生长素调高 → 生根；调低 → 生芽。自己试试两个方向。', action: () => setGrowth(growthByRatio(ratio)) },
    { label: '移栽驯化', hint: '幼苗长出根后移栽到土壤——一个茎段长成了完整植株，证明植物细胞具有全能性。', action: () => setGrowth(growthByRatio(ratio)) },
  ];
  const guideDone = step >= GUIDE.length;

  const observation = (() => {
    if (contaminated) return '❌ 培养基被杂菌污染（表面长霉、浑浊）——消毒不彻底是组织培养失败最常见的原因。点「重新消毒接种」再来一次。';
    if (growth === 'callus') return '愈伤组织形成中：茎段切口处长出淡黄色、疏松无规则的细胞团——这是脱分化的产物。调整激素比例可以决定它接下来长根还是长芽。';
    if (growth === 'roots') return `生长素占比 ${ratio}%（偏高）：愈伤组织分化出根。生长素/细胞分裂素比例高有利于生根。`;
    if (growth === 'shoots') return `生长素占比 ${ratio}%（偏低）：愈伤组织分化出芽。细胞分裂素占优势有利于生芽。`;
    return '继续培养，观察再分化。';
  })();

  // 愈伤组织小团
  const callusBits = useMemo(
    () =>
      [
        [288, 158, 9],
        [306, 148, 7],
        [272, 172, 6],
        [296, 180, 8],
        [316, 166, 5],
      ] as const,
    [],
  );

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <LabModeToggle guided={guided} onChange={setGuided} />

            {guided ? (
              <GuideNextButton
                step={step}
                total={GUIDE.length}
                label={guideDone ? '完成' : GUIDE[step].label}
                hint={guideDone ? '实验完成！切到「自由操作」拖动激素滑块，看看不同配比会分化出什么。' : GUIDE[step].hint}
                disabled={guideDone}
                onClick={() => {
                  if (!guideDone) {
                    GUIDE[step].action();
                    setStep((s) => s + 1);
                  }
                }}
              />
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setSterile((v) => !v)}
                  aria-pressed={sterile}
                  className={`${cnChip(!sterile) + ' w-full'} ${sterile ? '' : 'border-[#b0483a] bg-[#f9e2e0] text-[#b0483a]'}`}
                >
                  {sterile ? '🧼 已消毒（无菌）' : '⚠ 未消毒：有污染风险'}
                </button>
                <button type="button" onClick={() => { setGrowth('callus'); setStep(Math.max(step, 3)); }} className={cnChip(false) + ' w-full'}>
                  接种外植体 → 培养
                </button>
              </>
            )}

            <ControlSlider
              label="生长素占比（生长素 : 细胞分裂素）"
              value={ratio}
              unit="%"
              min={0}
              max={100}
              step={5}
              accent="violet"
              onChange={(v) => {
                setRatio(v);
                setGrowth(growthByRatio(v));
              }}
            />

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前分化方向：
              <span className="font-bold text-[#0e6f75]">
                {growth === 'callus' ? '愈伤组织（脱分化）' : growth === 'roots' ? '生根' : '生芽'}
              </span>
            </div>

            {contaminated ? (
              <button type="button" onClick={() => { setSterile(true); setStep(0); }} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
                重新消毒接种
              </button>
            ) : null}
          </>
        }
      >
        <SceneBox label="组织培养瓶（激素配比实时决定分化方向）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 培养瓶 */}
            <path d="M150 70 L150 92 Q120 100 118 150 Q116 250 130 256 L300 256 Q316 250 314 150 Q312 100 282 92 L282 70" fill="none" stroke="#9db8bd" strokeWidth="3.5" />
            <line x1="142" y1="74" x2="290" y2="74" stroke="#9db8bd" strokeWidth="4" />
            {/* 培养基 */}
            <path d="M126 216 L128 250 Q130 256 142 256 L296 256 Q310 250 308 216 Z" fill="#e2d8b8" />
            {contaminated ? (
              <g>
                {[[170, 240], [230, 246], [265, 238], [200, 250]].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={6 - i} fill="#7a8a5e" opacity="0.85" />
                ))}
                <text x="220" y="200" textAnchor="middle" fontSize="11" fill="#b0483a" fontWeight="700">
                  ⚠ 杂菌污染！
                </text>
              </g>
            ) : null}

            {/* 外植体（茎段） */}
            {!contaminated ? (
              <g>
                <rect x="196" y="236" width="64" height="16" rx="6" fill="#5f9e57" stroke="#3f7f4f" strokeWidth="1.5" />
              </g>
            ) : null}

            {/* 愈伤组织 */}
            {growth === 'callus' && !contaminated ? (
              <g>
                {callusBits.map(([x, y, r], i) => (
                  <circle key={i} cx={x} cy={y} r={r} fill="#e8d9a8" stroke="#c9b878" strokeWidth="1.5" />
                ))}
                <text x="220" y="130" textAnchor="middle" fontSize="11" fill="#8a7a20" fontWeight="700">
                  愈伤组织（脱分化）
                </text>
              </g>
            ) : null}

            {/* 再分化：根（下）或 芽（上） */}
            {!contaminated && growth === 'roots' ? (
              <g className="bio-fade">
                {[-28, 0, 28].map((dx, i) => (
                  <path key={i} d={`M${216 + dx} 240 q ${dx / 4} 18 ${dx} 34`} fill="none" stroke="#c9a86a" strokeWidth="4" strokeLinecap="round" />
                ))}
                <text x="220" y="290" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="700">
                  分化出根（生长素占优势）
                </text>
              </g>
            ) : null}
            {!contaminated && growth === 'shoots' ? (
              <g className="bio-fade">
                {[[-24, -34], [0, -44], [24, -30]].map(([dx, dy], i) => (
                  <g key={i}>
                    <line x1={214 + dx * 0.4} y1={210 - Math.abs(dy) * 0.2} x2={214 + dx} y2={210 + dy} stroke="#5f9e57" strokeWidth="3.5" strokeLinecap="round" />
                    <ellipse cx={214 + dx} cy={206 + dy} rx="16" ry="8" fill="#5f9e57" stroke="#3f7f4f" strokeWidth="1.5" transform={`rotate(${-20 + i * 20} ${214 + dx} ${206 + dy})`} />
                  </g>
                ))}
                <text x="220" y="120" textAnchor="middle" fontSize="10" fill="#2f7a4d" fontWeight="700">
                  分化出芽（细胞分裂素占优势）
                </text>
              </g>
            ) : null}

            {/* 温度/光照标注 */}
            <text x="40" y="40" fontSize="10.5" fill="#4b6c73" fontWeight="700">
              20℃ · 每日 12h 光照
            </text>
            <text x="40" y="56" fontSize="9.5" fill="#799398">
              无菌操作 · MS 培养基
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
