'use client';

import { useState } from 'react';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const CELL_W = 52;
const CELL_H = 46;
const FOCUS_SWEET_SPOT = 68;
const HIGH_ZOOM = 2.6;

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>显微镜成<span className="font-semibold">倒像</span>：物像的移动方向与装片的移动方向正好相反，口诀「偏哪往哪移」。</>,
      <>低倍镜视野大而亮，用于寻找目标；高倍镜下细胞大而少、视野小而暗，只能做微调。</>,
      <>放大倍数 = 目镜倍数 × 物镜倍数，放大的是<span className="font-semibold">长度或宽度</span>，不是面积或体积。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>光学显微镜（10× 目镜，10× 与 40× 物镜）、粗/细准焦螺旋、光圈与反光镜。</>,
      <>观察材料：洋葱鳞片叶内表皮细胞临时装片（也可用口腔上皮细胞等）。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 取镜安放、对光：低倍物镜对准通光孔，调整光圈与反光镜，直到视野明亮均匀。</>,
      <>② 低倍镜下观察：先下降镜筒（双眼从侧面看物镜），再缓缓上升镜筒寻找物像，用粗准焦螺旋调至清晰。</>,
      <>③ 移动装片，把要观察的目标<span className="font-semibold">移到视野中央</span>。</>,
      <>④ 转动转换器换上高倍物镜；⑤ 只用<span className="font-semibold">细准焦螺旋</span>微调焦距，并换大光圈（或凹面镜）使视野变亮。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>换高倍物镜<span className="font-semibold">之前</span>必须先把目标移到视野中央，否则换镜后目标会跑出视野。</>,
      <>高倍镜下<span className="font-semibold">禁止使用粗准焦螺旋</span>，只能用细准焦螺旋，以免压碎盖玻片或损伤镜头。</>,
      <>高倍镜下视野变暗：应换<span className="font-semibold">大光圈</span>或凹面反光镜；低倍镜找目标、高倍镜看细节。</>,
      <>污物位置判断：转动目镜动 → 在目镜上；移动装片动 → 在装片上；都不动 → 在物镜上。</>,
    ],
  },
];

function cnChip(active: boolean) {
  return `inline-flex h-9 items-center justify-center rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function MicroscopeLab() {
  // objective：物镜；slide：装片累计移动（步）；物像朝相反方向移动
  const [objective, setObjective] = useState<'low' | 'high'>('low');
  const [slide, setSlide] = useState({ x: 0, y: 0 });
  const [focus, setFocus] = useState(55);
  const [iris, setIris] = useState<'small' | 'large'>('small');

  const imgX = -2 - slide.x;
  const imgY = 1 - slide.y;
  const centered = imgX === 0 && imgY === 0;
  const zoom = objective === 'high' ? HIGH_ZOOM : 1;

  const blur =
    objective === 'high'
      ? Math.min(7, Math.abs(focus - FOCUS_SWEET_SPOT) * 0.16)
      : Math.min(1.2, Math.abs(focus - FOCUS_SWEET_SPOT) * 0.03);
  const sharp = blur < 0.5;
  const dark = objective === 'high' ? (iris === 'large' ? 0.34 : 0.6) : 0.08;

  const positionName = (() => {
    const parts = [imgX < 0 ? '左' : imgX > 0 ? '右' : '', imgY < 0 ? '上' : imgY > 0 ? '下' : ''];
    const joined = parts.join('');
    return joined ? `${joined}方` : '中央';
  })();

  const conclusion = (() => {
    if (!centered && objective === 'high') {
      return '目标已经跑出高倍视野！换高倍物镜前必须先在低倍镜下把目标移到视野中央。点回「10×」重新移片。';
    }
    if (!centered) {
      return `物像偏于视野${positionName}。显微镜成倒像——物像偏向哪一侧，装片就向哪一侧移动（「偏哪往哪移」），把目标移到中央。`;
    }
    if (objective === 'low') {
      return '目标已在视野中央。接下来转动转换器换上 40× 物镜——注意换高倍镜后视野会变小、变暗，细胞变大变少。';
    }
    if (!sharp) {
      return '换高倍镜后焦平面略有变化，图像模糊：只能用【细准焦螺旋】微微调整，粗准焦螺旋会压碎装片。';
    }
    if (iris === 'small') {
      return '图像已清晰，但高倍镜下视野偏暗——把光圈调大（或改用凹面反光镜），视野就明亮了。';
    }
    return '✅ 观察流程全部完成：低倍镜找到目标 → 移至视野中央 → 换高倍物镜 → 细准焦螺旋调焦 → 大光圈调亮视野。';
  })();

  const cells = [];
  for (let row = 0; row < 7; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const isTarget = col === 4 && row === 3;
      cells.push(
        <g key={`${col}-${row}`}>
          <rect
            x={col * CELL_W + 2}
            y={row * CELL_H + 2}
            width={CELL_W - 4}
            height={CELL_H - 4}
            rx="10"
            fill={isTarget ? '#eef3e0' : '#f2f6ee'}
            stroke={isTarget ? '#3f7f4f' : '#6b8f5e'}
            strokeWidth={isTarget ? 2 : 1.2}
          />
          {isTarget ? (
            <circle cx={col * CELL_W + CELL_W / 2 + 5} cy={row * CELL_H + CELL_H / 2} r="8" fill="#b5567d" />
          ) : (col * 7 + row * 3) % 5 < 2 ? (
            <ellipse
              cx={col * CELL_W + CELL_W / 2 + 6}
              cy={row * CELL_H + CELL_H / 2}
              rx="6"
              ry="4.5"
              fill="#a97fb5"
              opacity="0.75"
            />
          ) : null}
        </g>,
      );
    }
  }

  const moveSlide = (dx: number, dy: number) => {
    setSlide((current) => ({
      x: Math.max(-3, Math.min(3, current.x + dx)),
      y: Math.max(-3, Math.min(3, current.y + dy)),
    }));
  };

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">① 移动装片（物像反向移动）</p>
              <div className="mx-auto grid w-fit grid-cols-3 gap-1">
                <span />
                <button type="button" aria-label="装片向上移" title="装片向上移" onClick={() => moveSlide(0, -1)} className={`${cnChip(false)} h-9 w-12`}>
                  ↑
                </button>
                <span />
                <button type="button" aria-label="装片向左移" title="装片向左移" onClick={() => moveSlide(-1, 0)} className={`${cnChip(false)} h-9 w-12`}>
                  ←
                </button>
                <span className="flex h-9 w-12 items-center justify-center text-[10px] text-[#799398]">装片</span>
                <button type="button" aria-label="装片向右移" title="装片向右移" onClick={() => moveSlide(1, 0)} className={`${cnChip(false)} h-9 w-12`}>
                  →
                </button>
                <span />
                <button type="button" aria-label="装片向下移" title="装片向下移" onClick={() => moveSlide(0, 1)} className={`${cnChip(false)} h-9 w-12`}>
                  ↓
                </button>
                <span />
              </div>
              <p className="mt-1.5 text-[11px] leading-5 text-[#799398]">目标细胞（红色细胞核）当前位于视野{positionName}。</p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">② 转动转换器换物镜</p>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setObjective('low')}
                  aria-pressed={objective === 'low'}
                  className={`${cnChip(objective === 'low')} flex-1`}
                >
                  10× 低倍
                </button>
                <button
                  type="button"
                  onClick={() => setObjective('high')}
                  aria-pressed={objective === 'high'}
                  className={`${cnChip(objective === 'high')} flex-1`}
                >
                  40× 高倍
                </button>
              </div>
            </div>

            <ControlSlider
              label="③ 细准焦螺旋"
              value={focus}
              unit="格"
              min={0}
              max={100}
              step={1}
              accent="violet"
              onChange={setFocus}
            />

            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">④ 调节光圈（视野亮度）</p>
              <div className="flex gap-1.5">
                <button type="button" onClick={() => setIris('small')} aria-pressed={iris === 'small'} className={`${cnChip(iris === 'small')} flex-1`}>
                  小光圈
                </button>
                <button type="button" onClick={() => setIris('large')} aria-pressed={iris === 'large'} className={`${cnChip(iris === 'large')} flex-1`}>
                  大光圈
                </button>
              </div>
            </div>
          </>
        }
      >
        <SceneBox label="目镜视野（洋葱鳞片叶内表皮细胞）" heightClass="h-[320px]">
          <div className="flex h-full items-center justify-center">
            <div
              className="relative size-[264px] overflow-hidden rounded-full border-[6px] border-[#c4d6da] shadow-inner"
              style={{ backgroundColor: '#fbfcf8' }}
            >
              <div
                className="absolute left-1/2 top-1/2"
                style={{
                  width: CELL_W * 9,
                  height: CELL_H * 7,
                  transform: `translate(-50%, -50%) scale(${zoom}) translate(${imgX * CELL_W}px, ${imgY * CELL_H}px)`,
                  transition: 'transform 1.2s ease, filter 0.4s ease',
                  filter: blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : undefined,
                }}
              >
                <svg width={CELL_W * 9} height={CELL_H * 7} aria-hidden="true">
                  {cells}
                </svg>
              </div>

              {/* 亮度遮罩 + 十字准星 */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full bg-[#0a2b33] transition-opacity duration-700"
                style={{ opacity: dark }}
              />
              <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-[#3f6b74]/30" aria-hidden="true" />
              <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-[#3f6b74]/30" aria-hidden="true" />

              {!centered && objective === 'high' ? (
                <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded bg-[#fdf3dd] px-2 py-1 text-[10px] font-semibold text-[#8a671b]">
                  目标已跑出视野
                </p>
              ) : null}
              {centered && objective === 'high' && sharp && iris === 'large' ? (
                <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded bg-[#e7f4ea] px-2 py-1 text-[10px] font-semibold text-[#2f6b45]">
                  ✅ 观察完成
                </p>
              ) : null}
            </div>
          </div>
          <p className="absolute right-3 top-2 text-[11px] font-semibold text-[#8a671b]">
            物镜 {objective === 'high' ? '40×' : '10×'} · {iris === 'large' ? '大光圈' : '小光圈'} · {sharp ? '图像清晰' : '未对准焦'}
          </p>
        </SceneBox>

        <ObservationNote>{conclusion}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
