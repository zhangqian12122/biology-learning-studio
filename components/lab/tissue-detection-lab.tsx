'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

type SampleId = 'apple' | 'potato' | 'soybean' | 'peanut' | 'glucose' | 'water';
type ReagentId = 'fehling' | 'iodine' | 'biuret' | 'sudan';

const SAMPLES: { id: SampleId; name: string; color: string; rich: 'reducing' | 'starch' | 'protein' | 'lipid' | 'none' }[] = [
  { id: 'apple', name: '苹果匀浆', color: '#f4edd7', rich: 'reducing' },
  { id: 'potato', name: '马铃薯匀浆', color: '#f1e8d2', rich: 'starch' },
  { id: 'soybean', name: '豆浆', color: '#f7f1df', rich: 'protein' },
  { id: 'peanut', name: '花生子叶匀浆', color: '#f3e3bd', rich: 'lipid' },
  { id: 'glucose', name: '葡萄糖溶液', color: '#e9f3f4', rich: 'reducing' },
  { id: 'water', name: '蒸馏水（对照）', color: '#e9f3f4', rich: 'none' },
];

const REAGENTS: { id: ReagentId; name: string; dot: string; hint: string }[] = [
  {
    id: 'fehling',
    name: '斐林试剂',
    dot: '#8fb9d9',
    hint: '甲液（0.1 g/mL NaOH）与乙液（0.05 g/mL CuSO₄）等量混合、现配现用，需 50~65 ℃ 水浴加热。',
  },
  { id: 'iodine', name: '碘液', dot: '#b98a3c', hint: '直接滴加 1~2 滴碘液，摇匀观察，无需加热。' },
  {
    id: 'biuret',
    name: '双缩脲试剂',
    dot: '#8a6bb0',
    hint: '先加 A 液（0.1 g/mL NaOH）1 mL 摇匀，再加 B 液（0.01 g/mL CuSO₄）3~4 滴；B 液不能过量，不能加热。',
  },
  { id: 'sudan', name: '苏丹Ⅲ染液', dot: '#e6913c', hint: '染液染色 2~3 min，显微镜下观察被染成橘黄色的脂肪颗粒。' },
];

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>还原糖 + 斐林试剂，50~65 ℃ 水浴加热后生成<span className="font-semibold">砖红色 Cu₂O 沉淀</span>（甲、乙液等量混合生成浅蓝色 Cu(OH)₂）。</>,
      <>淀粉遇<span className="font-semibold">碘液变蓝</span>；蛋白质与<span className="font-semibold">双缩脲试剂发生紫色反应</span>（肽键在碱性环境与 Cu²⁺ 络合）。</>,
      <>脂肪可被<span className="font-semibold">苏丹Ⅲ染成橘黄色</span>（苏丹Ⅳ则为红色）。</>,
      <>每种试剂只对特定成分显色（专一性），因此可用一组平行检测鉴定组织中的成分。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：苹果匀浆（富含还原糖、颜色浅）、马铃薯匀浆（富含淀粉）、豆浆（富含蛋白质）、花生子叶（富含脂肪）、蒸馏水（空白对照）。</>,
      <>试剂：斐林试剂（甲液、乙液）、碘液、双缩脲试剂（A 液、B 液）、苏丹Ⅲ染液。</>,
      <>用具：试管与试管架、量筒、滴管、试管夹、50~65 ℃ 水浴锅、显微镜（脂肪鉴定用）。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 取样：向试管中注入 2 mL 待测组织样液；检测脂肪时切取花生子叶薄片制片。</>,
      <>② 加试剂：斐林试剂甲、乙液等量混合后<span className="font-semibold">立即</span>使用；双缩脲先加 A 液 1 mL，再加 B 液 3~4 滴。</>,
      <>③ 观察颜色变化：只有还原糖检测需要 50~65 ℃ 水浴加热约 2 min，其余检测均<span className="font-semibold">不加热</span>。</>,
      <>④ 记录各管颜色变化，与蒸馏水对照组比较后得出结论。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>斐林试剂<span className="font-semibold">现配现用、等量混合</span>；只能水浴加热，不可直接加热或煮沸。</>,
      <>双缩脲试剂 B 液不能过量（CuSO₄ 本身的蓝色会掩盖紫色反应），也不能加热。</>,
      <>选材应选近白色或浅色组织（苹果、梨、白萝卜），避免样液自身颜色干扰显色观察。</>,
      <>蒸馏水作空白对照可排除试剂本身颜色的干扰；斐林与双缩脲所用 CuSO₄ 浓度不同（0.05 与 0.01 g/mL），不能混用。</>,
    ],
  },
];

function cnChip(active: boolean) {
  return `flex min-h-10 items-center gap-2 rounded-md border px-2.5 text-left text-xs font-medium transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function TissueDetectionLab() {
  const [sampleId, setSampleId] = useState<SampleId>('apple');
  const [reagent, setReagent] = useState<ReagentId>('fehling');
  const [stage, setStage] = useState(0); // 0 仅样液 → 1 已加试剂 → 2 已水浴加热（仅斐林）
  const [addCount, setAddCount] = useState(0);

  const sample = SAMPLES.find((item) => item.id === sampleId)!;
  const reagentInfo = REAGENTS.find((item) => item.id === reagent)!;
  const heating = reagent === 'fehling' && stage === 2;

  // 液体颜色：由「样液 × 试剂 × 操作进度」唯一决定，用 CSS transition 平滑显色。
  let liquidColor = sample.color;
  if (reagent === 'fehling' && stage >= 1) {
    liquidColor = stage === 2 && (sample.rich === 'reducing') ? '#b9855c' : '#8fb9d9';
  } else if (reagent === 'iodine' && stage >= 1) {
    liquidColor = sample.rich === 'starch' ? '#4a52a8' : '#b98a3c';
  } else if (reagent === 'biuret' && stage >= 1) {
    liquidColor = sample.rich === 'protein' ? '#8a6bb0' : '#79aed4';
  } else if (reagent === 'sudan' && stage >= 1) {
    liquidColor = sample.rich === 'lipid' ? '#e6913c' : sample.color;
  }

  const brickRed = reagent === 'fehling' && stage === 2 && sample.rich === 'reducing';
  const oilDrops = reagent === 'sudan' && stage >= 1 && sample.rich === 'lipid';

  const observation = (() => {
    if (stage === 0) {
      return '试管中只有待测样液。请点「加入检测试剂并摇匀」开始检测；斐林试剂检测还需完成水浴加热。';
    }
    if (reagent === 'fehling') {
      if (stage === 1) {
        return '加入等量混合的斐林试剂后，试管中呈浅蓝色（Cu(OH)₂），砖红色沉淀还没有出现——还原糖检测必须完成 50~65 ℃ 水浴加热。';
      }
      return sample.rich === 'reducing'
        ? '水浴加热后颜色按浅蓝色 → 棕色变化，最终出现砖红色 Cu₂O 沉淀，说明该样液中含有还原糖。'
        : '水浴加热后液体仍为浅蓝色，没有砖红色沉淀，说明该样液中不含可检测的还原糖。';
    }
    if (reagent === 'iodine') {
      return sample.rich === 'starch'
        ? '滴加碘液后样液变蓝，说明其中含有淀粉（碘液本身为黄褐色，遇淀粉才变蓝）。'
        : '样液只呈现碘液本身的黄褐色，没有变蓝，说明不含淀粉。';
    }
    if (reagent === 'biuret') {
      return sample.rich === 'protein'
        ? '按「先 A 液后 B 液」加入后样液变为紫色，Cu²⁺ 在碱性环境中与蛋白质的肽键络合显色，说明含蛋白质。'
        : '样液只呈现 B 液 CuSO₄ 本身的蓝色，没有出现紫色，说明不含能与双缩脲试剂显色的蛋白质。';
    }
    return sample.rich === 'lipid'
      ? '脂肪颗粒被苏丹Ⅲ染成橘黄色，显微镜下能观察到成片橘黄色的脂肪滴。'
      : '苏丹Ⅲ不能把该样液染出橘黄色脂肪颗粒，说明其中脂肪含量极少。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">① 选择待测样液</p>
              <div className="grid grid-cols-2 gap-1.5">
                {SAMPLES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSampleId(item.id);
                      setStage(0);
                    }}
                    aria-pressed={item.id === sampleId}
                    className={cnChip(item.id === sampleId)}
                  >
                    <span
                      aria-hidden="true"
                      className="size-3 shrink-0 rounded-full border border-[#c9d8d4]"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">② 选择检测试剂</p>
              <div className="grid grid-cols-2 gap-1.5">
                {REAGENTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setReagent(item.id);
                      setStage(0);
                    }}
                    aria-pressed={item.id === reagent}
                    className={cnChip(item.id === reagent)}
                  >
                    <span
                      aria-hidden="true"
                      className="size-3 shrink-0 rounded-full border border-[#c9d8d4]"
                      style={{ backgroundColor: item.dot }}
                    />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {reagentInfo.hint}
            </div>

            <div className="grid gap-2">
              <button
                type="button"
                disabled={stage >= 1}
                onClick={() => {
                  setStage(1);
                  setAddCount((count) => count + 1);
                }}
                className="inline-flex h-9 items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ③ 加入检测试剂并摇匀
              </button>
              {reagent === 'fehling' ? (
                <button
                  type="button"
                  disabled={stage !== 1}
                  onClick={() => setStage(2)}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ④ 50~65 ℃ 水浴加热约 2 min
                </button>
              ) : (
                <div className="inline-flex h-9 items-center justify-center rounded-md border border-dashed border-[#cbdede] px-3 text-xs text-[#799398]">
                  本试剂无需加热，摇匀即可观察
                </div>
              )}
              <button
                type="button"
                onClick={() => setStage(0)}
                className="text-xs text-[#5e7d84] underline-offset-2 hover:underline"
              >
                换一支干净试管重做
              </button>
            </div>
          </>
        }
      >
        <SceneBox label="试管显色观察（颜色变化实时呈现）" heightClass="h-[310px]">
          <svg className="h-full w-full" viewBox="0 0 360 230" aria-hidden="true">
            <defs>
              <clipPath id="tube-clip">
                <path d="M154 44 L154 184 Q154 206 180 206 Q206 206 206 184 L206 44 Z" />
              </clipPath>
            </defs>

            {/* 水浴锅：加热时出现在试管下半部 */}
            {heating ? (
              <g>
                <rect x="122" y="140" width="116" height="72" rx="7" fill="#d8edf6" />
                {[
                  { x: 140, d: 0 },
                  { x: 158, d: 0.5 },
                  { x: 204, d: 0.2 },
                  { x: 220, d: 0.75 },
                ].map((bubble, index) => (
                  <circle
                    key={index}
                    cx={bubble.x}
                    cy="200"
                    r="2.5"
                    fill="#ffffff"
                    opacity="0.9"
                    className="bio-boil"
                    style={{ animationDelay: `${bubble.d}s`, animationDuration: '1.6s' }}
                  />
                ))}
                <rect x="122" y="140" width="116" height="72" rx="7" fill="none" stroke="#7fa9bb" strokeWidth="2.5" />
                <text x="180" y="230" textAnchor="middle" fontSize="10" fill="#3f7183">
                  水浴 50~65 ℃（不能直接加热）
                </text>
              </g>
            ) : null}

            {/* 试管壁 */}
            <path
              d="M154 40 L154 184 Q154 206 180 206 Q206 206 206 184 L206 40"
              fill="none"
              stroke="#9db8bd"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <line x1="148" y1="44" x2="212" y2="44" stroke="#9db8bd" strokeWidth="3.5" strokeLinecap="round" />

            {/* 试管内液体：颜色随试剂与操作平滑过渡 */}
            <g clipPath="url(#tube-clip)">
              <rect x="150" y="92" width="60" height="120" fill={liquidColor} style={{ transition: 'fill 1.6s ease' }} />
              {oilDrops
                ? [
                    { cx: 170, cy: 112, r: 4 },
                    { cx: 192, cy: 128, r: 5 },
                    { cx: 178, cy: 150, r: 4.5 },
                    { cx: 194, cy: 166, r: 3.5 },
                    { cx: 168, cy: 176, r: 5 },
                  ].map((drop, index) => (
                    <circle key={index} cx={drop.cx} cy={drop.cy} r={drop.r} fill="#e88f37" opacity="0.95" className="bio-fade" style={{ animationDelay: `${0.3 + index * 0.15}s` }} />
                  ))
                : null}
            </g>

            {/* 砖红色 Cu₂O 沉淀：加热且含还原糖时沉降至管底 */}
            {brickRed ? (
              <g key={`${sampleId}-${addCount}`}>
                {[
                  { cx: 164, cy: 194, r: 3.2, d: 0.9 },
                  { cx: 176, cy: 197, r: 2.6, d: 1.15 },
                  { cx: 186, cy: 193, r: 3.6, d: 1.35 },
                  { cx: 196, cy: 197, r: 2.8, d: 1.55 },
                  { cx: 170, cy: 189, r: 2.2, d: 1.7 },
                  { cx: 190, cy: 188, r: 2, d: 1.9 },
                ].map((grain, index) => (
                  <circle
                    key={index}
                    cx={grain.cx}
                    cy={grain.cy}
                    r={grain.r}
                    fill="#a63d2a"
                    className="bio-precipitate"
                    style={{ animationDelay: `${grain.d}s` }}
                  />
                ))}
              </g>
            ) : null}

            {/* 滴管滴加试剂：每次点「加入检测试剂」重放一次 */}
            {stage >= 1 ? (
              <g key={addCount}>
                <path d="M172 8 L188 8 L185 30 L175 30 Z" fill="#c4d6da" stroke="#8aa7ad" strokeWidth="1.5" />
                <path d="M175 30 L185 30 L181 40 L179 40 Z" fill="#a9c2c8" />
                <circle cx="180" cy="46" r="3.2" fill={reagentInfo.dot} className="bio-drip" />
              </g>
            ) : null}

            <text x="30" y="60" fontSize="11" fill="#4b6c73" fontWeight="600">
              样液：{sample.name}
            </text>
            <text x="30" y="78" fontSize="11" fill="#4b6c73">
              试剂：{reagentInfo.name}
            </text>
          </svg>
          <p className="absolute right-3 top-2 text-[11px] font-semibold text-[#8a671b]">
            {stage === 0
              ? '待加试剂'
              : brickRed
                ? '现象：出现砖红色沉淀'
                : heating
                  ? '现象：颜色已稳定，未出现砖红色沉淀'
                  : '已加试剂，观察颜色'}
          </p>
        </SceneBox>

        <ObservationNote>
          {observation}
          {sampleId === 'water' && stage >= 1 ? ' 蒸馏水组为空白对照，可排除试剂本身颜色对结果的干扰。' : null}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
