'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

type Band = {
  name: string;
  color: string;
  fadedColor: string;
  height: number;
  rise: number;
};

// 自上而下的四条色素带：rise 为相对滤液细线上移的最终距离
const BANDS: Band[] = [
  { name: '胡萝卜素 · 橙黄色', color: '#e8973a', fadedColor: '#e8973a', height: 8, rise: 120 },
  { name: '叶黄素 · 黄色', color: '#e2c44b', fadedColor: '#e2c44b', height: 10, rise: 94 },
  { name: '叶绿素a · 蓝绿色', color: '#3f8f6e', fadedColor: '#b0a45e', height: 16, rise: 62 },
  { name: '叶绿素b · 黄绿色', color: '#86a348', fadedColor: '#b0a45e', height: 12, rise: 30 },
];

const BASELINE_Y = 180; // 滤液细线所在高度
const STRIP_BOTTOM = 200;
const SOLVENT_Y = 196; // 层析液液面（必须低于细线：y 值更大）

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>叶绿体中的色素溶于<span className="font-semibold">有机溶剂</span>（无水乙醇、丙酮），可用无水乙醇提取色素。</>,
      <>四种色素在<span className="font-semibold">层析液中的溶解度不同</span>：溶解度高的随层析液在滤纸上扩散得快，反之则慢，从而彼此分离（纸层析法）。</>,
      <>滤纸条上色素带自上而下：胡萝卜素（橙黄色）→ 叶黄素（黄色）→ 叶绿素a（蓝绿色）→ 叶绿素b（黄绿色）。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：新鲜（烘干后）的绿色叶片（如菠菜叶）。</>,
      <>试剂：无水乙醇、层析液、二氧化硅、碳酸钙。</>,
      <>用具：研钵、剪刀、漏斗、尼龙布、毛细吸管、培养皿盖、干燥的定性滤纸条、烧杯。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 提取色素：5 g 叶片剪碎，加少许 SiO₂、CaCO₃ 与 10 mL 无水乙醇，快速充分研磨，过滤得滤液。</>,
      <>② 画滤液细线：在滤纸条一端（剪去两角）中心画一条<span className="font-semibold">细、直、齐</span>的滤液细线，干燥后再重复画 2~3 次。</>,
      <>③ 纸层析：将滤纸条画线端朝下插入层析液（<span className="font-semibold">层析液不能触及滤液细线</span>），盖上培养皿盖。</>,
      <>④ 观察结果：几分钟后色素带分离清晰，取出滤纸条，观察四条色素带的位置与颜色。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>SiO₂ 使研磨更充分；CaCO₃ 防止研磨中叶绿素被破坏；无水乙醇用于溶解提取色素。</>,
      <>滤液细线要求细、直、齐且重复 2~3 次：色素量不足会导致色素带过浅；层析液没及细线会使色素溶入层析液中。</>,
      <>色素分离的原因是<span className="font-semibold">溶解度差异</span>：溶解度高 → 扩散快 → 位置靠上。</>,
      <>叶绿素a 含量最多，其色素带最宽；未加 CaCO₃ 时叶绿素被破坏，蓝绿色与黄绿色条带明显变浅。</>,
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

export function PigmentLab() {
  // step: 0 研磨 → 1 画滤液细线 → 2 层析完成
  const [step, setStep] = useState(0);
  const [addedCaco3, setAddedCaco3] = useState(true);
  const [lineCount, setLineCount] = useState(0);

  const drawingLine = step === 1;

  const observation = (() => {
    if (step === 0) {
      return addedCaco3
        ? '研磨中：SiO₂ 让研磨更充分，CaCO₃ 保护叶绿素不被破坏，无水乙醇把色素溶解出来。'
        : '本次研磨漏加了 CaCO₃——液泡中的有机酸会破坏叶绿素，滤液会偏黄褐，后面的蓝绿色素带也会明显变浅。';
    }
    if (step === 1 && lineCount === 0) {
      return '滤液已备好。用毛细吸管在滤纸条末端画一条细、直、齐的滤液细线，待干燥后再重复画 1~2 次。';
    }
    if (step === 1 && lineCount === 1) {
      return '只画了一次，色素量偏少，层析后的色素带可能很浅。待细线干燥后，再重复画 1~2 次。';
    }
    if (step === 1) {
      return `滤液细线已画 ${lineCount} 次，达到「细、直、齐」的要求。可以开始层析——注意层析液液面必须低于滤液细线。`;
    }
    return addedCaco3
      ? '四条色素带自上而下依次是：胡萝卜素（橙黄色）→ 叶黄素（黄色）→ 叶绿素a（蓝绿色，含量最多、最宽）→ 叶绿素b（黄绿色）。'
      : '未加 CaCO₃，叶绿素在研磨中被破坏：蓝绿色（叶绿素a）与黄绿色（叶绿素b）条带明显变浅，而类胡萝卜素条带基本正常。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">研磨添加剂（仅第一步生效）</p>
              <div className="grid grid-cols-2 gap-1.5">
                <button type="button" className={`${cnChip(true)} cursor-default`}>
                  SiO₂ ✓
                </button>
                <button
                  type="button"
                  disabled={step >= 1}
                  onClick={() => setAddedCaco3((value) => !value)}
                  aria-pressed={addedCaco3}
                  className={`${cnChip(addedCaco3)} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  CaCO₃ {addedCaco3 ? '✓' : '✗'}
                </button>
              </div>
              <p className="mt-1.5 text-[11px] leading-5 text-[#799398]">无水乙醇固定使用，用于溶解色素。</p>
            </div>

            {step === 0 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex h-9 items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
              >
                ① 快速充分研磨，过滤得滤液
              </button>
            ) : null}

            {drawingLine ? (
              <div className="grid gap-2">
                <button
                  type="button"
                  disabled={lineCount >= 3}
                  onClick={() => setLineCount((count) => Math.min(count + 1, 3))}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ② 用毛细吸管画滤液细线（{lineCount}/3 次）
                </button>
                <button
                  type="button"
                  disabled={lineCount < 1}
                  onClick={() => setStep(2)}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ③ 盖上培养皿盖，开始层析
                </button>
                <p className="text-[11px] leading-5 text-[#799398]">
                  每次画线需待前一条干燥；层析约需 2~3 min，动画已加速呈现。
                </p>
              </div>
            ) : null}

            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              实验全程用新鲜绿叶；层析液有毒且有挥发性，需在通风处加盖进行。
            </div>
          </>
        }
      >
        <SceneBox label="提取与纸层析装置" heightClass="h-[320px]">
          {step === 0 ? (
            <svg className="h-full w-full" viewBox="0 0 420 240" aria-hidden="true">
              {/* 研钵 */}
              <path d="M120 120 Q120 190 210 190 Q300 190 300 120 Z" fill="#e7efee" stroke="#9db8bd" strokeWidth="3" />
              <ellipse cx="210" cy="120" rx="90" ry="16" fill="#f6fafa" stroke="#9db8bd" strokeWidth="3" />
              {/* 叶片碎屑 */}
              <ellipse cx="180" cy="118" rx="14" ry="6" fill="#5f8f4e" />
              <ellipse cx="215" cy="122" rx="12" ry="5" fill="#4d7d40" />
              <ellipse cx="245" cy="117" rx="13" ry="6" fill="#6a9c58" />
              {/* 研磨杵 */}
              <g transform="rotate(24 210 70)">
                <rect x="204" y="30" width="12" height="86" rx="6" fill="#c4d6da" stroke="#8aa7ad" strokeWidth="2" />
                <circle cx="210" cy="28" r="9" fill="#c4d6da" stroke="#8aa7ad" strokeWidth="2" />
              </g>
              <text x="210" y="216" textAnchor="middle" fontSize="15" fill="#4b6c73" fontWeight="600">
                菠菜叶碎 + SiO₂ + {addedCaco3 ? 'CaCO₃' : '（漏加 CaCO₃！）'} + 无水乙醇
              </text>
              {!addedCaco3 ? (
                <text x="210" y="232" textAnchor="middle" fontSize="15" fill="#b0483a">
                  有机酸将破坏叶绿素 → 滤液偏黄褐
                </text>
              ) : null}
            </svg>
          ) : (
            <svg className="h-full w-full" viewBox="0 0 420 240" aria-hidden="true">
              {/* 培养皿盖 + 滤纸条悬挂板 */}
              <rect x="160" y="34" width="100" height="12" rx="4" fill="#d9e7e7" stroke="#9db8bd" strokeWidth="2" />
              {/* 烧杯 */}
              <path d="M140 56 L140 214 Q140 224 150 224 L270 224 Q280 224 280 214 L280 56" fill="none" stroke="#9db8bd" strokeWidth="3" strokeLinecap="round" />
              {/* 层析液 */}
              <rect
                x="142"
                y={SOLVENT_Y}
                width="136"
                height={224 - SOLVENT_Y}
                fill="#cfe3ea"
                style={{ transition: 'opacity 1.2s ease', opacity: step >= 2 ? 0.95 : 0 }}
              />
              {step >= 2 ? (
                <text x="142" y={SOLVENT_Y + 14} fontSize="14" fill="#3f7183">
                  层析液
                </text>
              ) : null}
              {/* 滤纸条（画线端朝下） */}
              <rect x="182" y="44" width="56" height={STRIP_BOTTOM - 44} fill="#f7f5ec" stroke="#c9c2ab" strokeWidth="1.5" />
              <path d="M182 44 L188 44 L182 54 Z" fill="#c9c2ab" />
              <path d="M238 44 L232 44 L238 54 Z" fill="#c9c2ab" />

              {/* 滤液细线 */}
              {lineCount >= 1 ? (
                <g key={lineCount}>
                  <rect x="182" y={BASELINE_Y - 2} width="56" height="3.5" fill="#3f7f4f" opacity="0.9" className="bio-draw" />
                  {/* 毛细吸管（仅画线阶段显示，重复画线时轻微横移） */}
                  {step === 1 ? (
                    <g transform={`translate(${(lineCount - 1) * 12} 0)`} opacity="0.9">
                      <path d="M296 138 L266 164 L258 172 L262 174 L270 168 L300 146 Z" fill="#c4d6da" stroke="#8aa7ad" strokeWidth="1.2" />
                    </g>
                  ) : null}
                </g>
              ) : null}

              {/* 四条色素带：从细线处向上扩散（扩散距离由 --band-rise 变量控制） */}
              {step >= 2
                ? BANDS.map((band, index) => {
                    const faded = !addedCaco3 && index >= 2;
                    return (
                      <rect
                        key={band.name}
                        x="182"
                        y={BASELINE_Y - band.height}
                        width="56"
                        height={band.height}
                        rx="1.5"
                        fill={faded ? band.fadedColor : band.color}
                        opacity={faded ? 0.5 : 1}
                        className="bio-band"
                        style={{
                          '--band-rise': `${-band.rise}px`,
                          animationDelay: `${index * 0.15}s`,
                        } as React.CSSProperties}
                      />
                    );
                  })
                : null}

              {/* 层析液前沿 */}
              {step >= 2 ? (
                <g className="bio-fade" style={{ animationDelay: '6.4s' }}>
                  <line x1="170" y1="52" x2="250" y2="52" stroke="#7fa9bb" strokeWidth="1.5" strokeDasharray="5 4" />
                  <text x="256" y="55" fontSize="14" fill="#3f7183">
                    层析液前沿
                  </text>
                </g>
              ) : null}

              {/* 结果标注 */}
              {step >= 2
                ? BANDS.map((band, index) => (
                    <text
                      key={band.name}
                      x="252"
                      y={BASELINE_Y - band.rise + band.height / 2 + 3}
                      fontSize="14.5"
                      fill={(!addedCaco3 && index >= 2) ? '#a89a5a' : '#4b6c73'}
                      className="bio-fade"
                      style={{ animationDelay: `${6.2 + index * 0.12}s` }}
                    >
                      {band.name}
                    </text>
                  ))
                : null}

              {/* 步骤提示 */}
              <text x="40" y="80" fontSize="15" fill="#4b6c73" fontWeight="600">
                {step === 1 ? '滤液细线：细 · 直 · 齐' : '色素带分离完成'}
              </text>
              <text x="40" y="98" fontSize="14.5" fill="#799398">
                {step === 1 ? `已画 ${lineCount} 次，干燥后再重复` : '自上而下：溶解度依次降低'}
              </text>
              <text x="40" y="170" fontSize="14.5" fill="#b0483a">
                层析液液面低于细线
              </text>
            </svg>
          )}
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
