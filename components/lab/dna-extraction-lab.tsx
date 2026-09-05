'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>DNA 在 NaCl 溶液中的溶解度随浓度而变：<span className="font-semibold">2 mol/L 时溶解</span>，<span className="font-semibold">0.14 mol/L 时溶解度最低</span>——先用浓盐水溶解 DNA，再用蒸馏水稀释析出。</>,
      <>洗涤剂能溶解细胞膜（破坏磷脂双分子层），使内容物释放。</>,
      <>DNA 遇<span className="font-semibold">二苯胺试剂，沸水浴条件下变蓝</span>，据此鉴定 DNA。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：洋葱（也可用香蕉、菜花、猪肝等，取细胞含量多的组织）。</>,
      <>试剂：洗涤剂、食盐（NaCl）、蒸馏水、二苯胺试剂。</>,
      <>用具：烧杯、量筒、玻璃棒、尼龙布（纱布）、试管、试管夹、沸水浴锅。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 破碎细胞、溶解 DNA：洋葱切碎，加洗涤剂和 2 mol/L NaCl 溶液，充分研磨搅拌约 10 min。</>,
      <>② 过滤：用尼龙布滤去不溶残渣，取含 DNA 的滤液。</>,
      <>③ 析出 DNA：沿同一方向缓慢搅拌，同时加入约 2 倍体积蒸馏水（NaCl 浓度降至约 0.14 mol/L），白色丝状物析出并缠绕在玻璃棒上。</>,
      <>④ 鉴定：取丝状物重新溶于 2 mol/L NaCl，加二苯胺试剂混匀后<span className="font-semibold">沸水浴加热约 5 min</span>，观察颜色变化。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>洗涤剂溶膜、食盐溶解 DNA、蒸馏水析出 DNA——三个试剂的作用原因（膜结构破坏 / 溶解度差异）是高频考点。</>,
      <>搅拌必须<span className="font-semibold">沿同一方向、缓慢</span>进行：快速搅拌的剪切力会打断 DNA 长链。</>,
      <>二苯胺鉴定必须<span className="font-semibold">沸水浴</span>（与斐林试剂 50~65 ℃ 水浴区分）；变蓝说明含 DNA。</>,
      <>析出的白色丝状物也可用甲基绿染色：DNA 使甲基绿呈绿色。</>,
    ],
  },
];

function cnChip(active: boolean) {
  return `inline-flex min-h-10 items-center gap-2 rounded-md border px-3 text-xs font-medium transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

const STEP_NAMES = ['破碎细胞', '过滤取液', '析出 DNA', '二苯胺鉴定'];

export function DnaExtractLab() {
  const [step, setStep] = useState(0); // 0 材料准备 → 1 已溶解 → 2 已过滤 → 3 已析出 → 4 已鉴定
  const [stirMode, setStirMode] = useState<'slow' | 'fast'>('slow');

  // step 是已完成的操作数：场景标题跟随「当前进行到的一步」
  const phaseIndex = Math.max(0, step - 1);

  const observation = (() => {
    switch (step) {
      case 0:
        return '洗涤剂溶解细胞膜释放内容物；2 mol/L 食盐溶液把 DNA 溶解出来。点「研磨」开始。';
      case 1:
        return '研磨液浑浊——细胞已破碎，DNA 已溶入高浓度盐溶液中，但还混着大量不溶杂质。';
      case 2:
        return '尼龙布滤去了残渣，得到含 DNA 的澄清滤液。接下来要靠「降低盐浓度」把 DNA 赶出溶液。';
      case 3:
        return stirMode === 'slow'
          ? '蒸馏水把 NaCl 浓度稀释到约 0.14 mol/L——这是 DNA 溶解度最低的点，白色丝状物析出并缠绕在玻璃棒上。✅ 沿同一方向缓慢搅拌，长链 DNA 完整。'
          : '⚠ 丝状物碎散不成缕——快速搅拌的剪切力把 DNA 长链打断了。实验要求沿同一方向缓慢搅拌，换个方式重做试试。';
      default:
        return '试管由无色变为蓝色——二苯胺在沸水浴下与 DNA 反应变蓝，证明提取到的白色丝状物就是 DNA。实验成功！';
    }
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <ol className="grid grid-cols-4 gap-1">
              {STEP_NAMES.map((name, index) => (
                <li
                  key={name}
                  className={`rounded-md border px-1 py-1.5 text-center text-[11px] font-semibold leading-4 transition-colors ${
                    index === phaseIndex
                      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                      : index < phaseIndex
                        ? 'border-[#d9e7e7] bg-[#f2f9f8] text-[#8fb0b5]'
                        : 'border-[#d9e7e7] bg-white text-[#9db4b9]'
                  }`}
                >
                  <span className="block text-[13px]">{['①', '②', '③', '④'][index]}</span>
                  {name}
                </li>
              ))}
            </ol>

            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">玻璃棒搅拌方式（第③步生效）</p>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setStirMode('slow')}
                  aria-pressed={stirMode === 'slow'}
                  className={cnChip(stirMode === 'slow')}
                >
                  沿同一方向缓慢搅拌
                </button>
                <button
                  type="button"
                  onClick={() => setStirMode('fast')}
                  aria-pressed={stirMode === 'fast'}
                  className={cnChip(stirMode === 'fast')}
                >
                  快速乱搅
                </button>
              </div>
              <p className="mt-1.5 text-[11px] leading-5 text-[#799398]">
                教材要求沿同一方向缓慢搅拌——想想为什么（提示：DNA 是很长的链）。
              </p>
            </div>

            <div className="grid gap-2">
              {step <= 0 ? (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
                >
                  ① 加洗涤剂与食盐，充分研磨搅拌
                </button>
              ) : null}
              {step === 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
                >
                  ② 用尼龙布过滤，取滤液
                </button>
              ) : null}
              {step === 2 ? (
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
                >
                  ③ 边搅拌边加入 2 倍体积蒸馏水
                </button>
              ) : null}
              {step === 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
                >
                  ④ 取丝状物，加二苯胺试剂沸水浴
                </button>
              ) : null}
              {step >= 4 ? (
                <div className="inline-flex h-9 items-center justify-center rounded-md border border-dashed border-[#cbdede] px-3 text-xs text-[#2f7a4d]">
                  ✅ 鉴定完成：DNA 遇二苯胺沸水浴变蓝
                </div>
              ) : null}
            </div>

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              记忆口诀：<span className="font-semibold">洗涤剂溶膜、浓盐水溶解、蒸馏水析出、二苯胺鉴定</span>。
              盐浓度 2 mol/L ↔ 溶解，0.14 mol/L ↔ 析出。
            </div>
          </>
        }
      >
        <SceneBox
          label={step === 0 ? '实验材料：洋葱碎块 + 洗涤剂 + 食盐' : `第${['一', '二', '三', '四'][phaseIndex]}步 · ${STEP_NAMES[phaseIndex]}`}
          heightClass="h-[340px]"
        >
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 烧杯 */}
            <path d="M40 110 L40 238 Q40 248 50 248 L190 248 Q200 248 200 238 L200 110" fill="none" stroke="#9db8bd" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="32" y1="114" x2="208" y2="114" stroke="#9db8bd" strokeWidth="3.5" strokeLinecap="round" />
            <defs>
              <clipPath id="dna-beaker-clip">
                <path d="M42 112 L42 238 Q42 246 50 246 L190 246 Q198 246 198 238 L198 112 Z" />
              </clipPath>
            </defs>
            <g clipPath="url(#dna-beaker-clip)">
              {/* 液体：各阶段不同浑浊度 */}
              <rect
                x="42"
                y="140"
                width="156"
                height="106"
                fill={step <= 1 ? '#e3ead9' : '#eef4f0'}
                opacity={step <= 1 ? 0.95 : 0.85}
                style={{ transition: 'fill 1.4s ease' }}
              />
              {/* 阶段一：洋葱碎块 + 洗涤剂泡 */}
              {step === 0 ? (
                <g>
                  {[
                    [70, 226, 14, 9],
                    [96, 232, 16, 10],
                    [130, 228, 13, 8],
                    [158, 233, 15, 9],
                    [84, 214, 11, 7],
                  ].map(([cx, cy, rx, ry], index) => (
                    <ellipse key={index} cx={cx} cy={cy} rx={rx} ry={ry} fill="#7fae6c" stroke="#5f8f4e" strokeWidth="1.5" />
                  ))}
                  <text x="120" y="196" textAnchor="middle" fontSize="14.5" fill="#5f8f4e" fontWeight="600">
                    洋葱碎块
                  </text>
                </g>
              ) : null}
              {/* 阶段二：浑浊 + 泡沫 */}
              {step === 1 ? (
                <g>
                  {[70, 95, 120, 145, 168].map((cx, index) => (
                    <circle key={cx} cx={cx} cy={168 + (index % 2) * 12} r="4" fill="#ffffff" opacity="0.7" className="bio-boil" style={{ animationDelay: `${index * 0.4}s`, animationDuration: '2.6s' }} />
                  ))}
                  <text x="120" y="200" textAnchor="middle" fontSize="14.5" fill="#6d7d5e" fontWeight="600">
                    浑浊研磨液（DNA 已溶解）
                  </text>
                </g>
              ) : null}
              {/* 阶段三起：澄清滤液 */}
              {step >= 2 ? (
                <text x="120" y="236" textAnchor="middle" fontSize="14.5" fill="#799398">
                  {step === 2 ? '滤液（2 mol/L NaCl，含 DNA）' : '加入蒸馏水后 → 0.14 mol/L'}
                </text>
              ) : null}
              {/* 析出：丝状物 */}
              {step >= 3 ? (
                stirMode === 'slow' ? (
                  <g className="bio-fade">
                    <path d="M120 150 C 150 165, 92 180, 122 196 C 150 210, 96 222, 124 234" stroke="#ffffff" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                    <path d="M112 152 C 142 168, 86 184, 116 198" stroke="#f0f5f2" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <text x="120" y="142" textAnchor="middle" fontSize="14.5" fill="#4b6c73" fontWeight="600">
                      ✨ 白色丝状物（DNA）
                    </text>
                  </g>
                ) : (
                  <g className="bio-fade">
                    {[
                      [78, 170, 26],
                      [140, 182, -20],
                      [96, 205, 55],
                      [160, 214, 10],
                      [70, 228, -35],
                      [128, 232, 40],
                    ].map(([x1, y1, rot], index) => (
                      <line key={index} x1={x1} y1={y1} x2={x1 + 20} y2={y1 - 4} stroke="#ffffff" strokeWidth="3" strokeLinecap="round" transform={`rotate(${rot} ${x1} ${y1})`} />
                    ))}
                    <text x="120" y="152" textAnchor="middle" fontSize="14.5" fill="#b0483a" fontWeight="600">
                      ⚠ 长链被打断，丝状物碎散
                    </text>
                  </g>
                )
              ) : null}
            </g>

            {/* 蒸馏水注入（第③步动画） */}
            {step === 3 ? (
              <g className="bio-fade">
                <path d="M232 96 Q 200 108 176 136" stroke="#9fc6cf" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="1 9" />
                <text x="248" y="100" fontSize="15" fill="#3f7183" fontWeight="600">
                  蒸馏水 ×2 体积
                </text>
              </g>
            ) : null}

            {/* 玻璃棒：析出阶段伸入烧杯 */}
            {step >= 3 ? (
              <g className={step === 3 && stirMode === 'slow' ? 'bio-stir' : ''} style={{ transformOrigin: '196px 120px' }}>
                <rect x="188" y="118" width="9" height="120" rx="4.5" fill="#c4d6da" stroke="#8aa7ad" strokeWidth="1.5" transform="rotate(14 192 122)" />
                {step >= 3 && stirMode === 'slow' ? (
                  <path d="M176 168 C 196 176, 210 186, 202 200" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />
                ) : null}
                <text x="214" y="128" fontSize="14" fill="#4b6c73">
                  玻璃棒
                </text>
              </g>
            ) : null}

            {/* 阶段四：鉴定试管 + 沸水浴 */}
            {step >= 4 ? (
              <g>
                <defs>
                  <clipPath id="dna-tube-clip">
                    <path d="M318 120 L318 216 Q318 234 334 234 Q350 234 350 216 L350 120 Z" />
                  </clipPath>
                </defs>
                {/* 水浴 */}
                <rect x="296" y="176" width="80" height="64" rx="6" fill="#d8edf6" />
                {[312, 330, 356].map((cx, index) => (
                  <circle key={cx} cx={cx} cy="232" r="2.6" fill="#ffffff" opacity="0.9" className="bio-boil" style={{ animationDelay: `${index * 0.45}s`, animationDuration: '1.5s' }} />
                ))}
                <rect x="296" y="176" width="80" height="64" rx="6" fill="none" stroke="#7fa9bb" strokeWidth="2.5" />
                <text x="336" y="252" textAnchor="middle" fontSize="14.5" fill="#3f7183">
                  沸水浴约 5 min
                </text>
                {/* 试管 */}
                <path d="M318 116 L318 216 Q318 234 334 234 Q350 234 350 216 L350 116" fill="none" stroke="#9db8bd" strokeWidth="3" strokeLinecap="round" />
                <line x1="313" y1="120" x2="355" y2="120" stroke="#9db8bd" strokeWidth="3" strokeLinecap="round" />
                <g clipPath="url(#dna-tube-clip)">
                  <rect x="314" y="168" width="40" height="66" fill="#dbe6f2" style={{ transition: 'fill 2.4s ease' }} />
                  <rect
                    x="314"
                    y="168"
                    width="40"
                    height="66"
                    fill="#5b8ac9"
                    className="bio-fade"
                    style={{ animationDelay: '1.2s', animationDuration: '2.4s' }}
                  />
                </g>
                <text x="336" y="106" textAnchor="middle" fontSize="14.5" fill="#4b6c73" fontWeight="600">
                  二苯胺试剂 + 丝状物
                </text>
                <text x="336" y="92" textAnchor="middle" fontSize="15" fill="#2b5d94" fontWeight="700" className="bio-fade" style={{ animationDelay: '2.2s' }}>
                  变蓝 → 含 DNA ✅
                </text>
              </g>
            ) : (
              <g>
                {/* 阶段道具：洗涤剂与食盐 */}
                <rect x="250" y="150" width="44" height="66" rx="8" fill="#e9f4f7" stroke="#8aa7ad" strokeWidth="2" />
                <text x="272" y="180" textAnchor="middle" fontSize="14" fill="#4b6c73">
                  洗涤剂
                </text>
                <text x="272" y="194" textAnchor="middle" fontSize="14" fill="#799398">
                  溶解细胞膜
                </text>
                <rect x="322" y="158" width="48" height="58" rx="6" fill="#fdf6e4" stroke="#c9ab5f" strokeWidth="2" />
                <text x="346" y="184" textAnchor="middle" fontSize="14" fill="#8a671b">
                  食盐 NaCl
                </text>
                <text x="346" y="198" textAnchor="middle" fontSize="14" fill="#a9894a">
                  2 mol/L 溶解 DNA
                </text>
                {step === 0 ? (
                  <text x="316" y="248" textAnchor="middle" fontSize="14.5" fill="#799398">
                    点「① 研磨」开始实验
                  </text>
                ) : step === 1 ? (
                  <text x="316" y="248" textAnchor="middle" fontSize="14.5" fill="#799398">
                    准备尼龙布过滤
                  </text>
                ) : (
                  <text x="316" y="248" textAnchor="middle" fontSize="14.5" fill="#799398">
                    盐浓度降低 → DNA 析出
                  </text>
                )}
              </g>
            )}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
