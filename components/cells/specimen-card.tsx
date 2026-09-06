'use client';

import { useState } from 'react';

import { SPECIMENS } from '@/components/cells/specimens';

/**
 * 实验页"相关图解"卡片：复用图鉴标本的 SVG 与结构清单，
 * 点结构名即可在图中高亮并显示功能说明（与图鉴页交互一致）。
 */
export function SpecimenCard({ id }: { id: string }) {
  const [activePart, setActivePart] = useState<number | null>(null);
  const specimen = SPECIMENS.find((item) => item.id === id);
  if (!specimen) return null;
  const Svg = specimen.Svg;
  const selectedPart = activePart == null ? null : specimen.parts[activePart];

  return (
    <div className="rounded-lg border border-[#cfe0e0] bg-[#fbfdfd] p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-[#173b42]">🖼 {specimen.name}</h3>
        <p className="text-xs text-[#67858b]">{specimen.kicker}</p>
      </div>
      <p className="mt-1.5 text-xs leading-5 text-[#59767c]">{specimen.intro}</p>

      <div className="relative mt-3 overflow-hidden rounded-md border border-[#dceaea] bg-gradient-to-b from-[#f2fafa] to-[#e7f3f1]">
        <div className="relative mx-auto aspect-[52/38] w-full max-w-[560px]">
          <Svg active={activePart} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {specimen.parts.map((part, index) => (
          <button
            key={part.name}
            type="button"
            onClick={() => setActivePart(activePart === index ? null : index)}
            aria-pressed={activePart === index}
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-md border px-2.5 text-xs font-semibold transition-colors ${
              activePart === index
                ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
            }`}
          >
            <span className="inline-flex size-4.5 items-center justify-center rounded-full bg-[#dff1ef] text-[10px] text-[#0d6c72]">
              {index + 1}
            </span>
            {part.name}
          </button>
        ))}
      </div>

      {selectedPart ? (
        <div className="mt-3 rounded-md border border-[#cfe1e0] bg-[#eef7f6] px-3 py-2.5">
          <p className="text-xs font-bold text-[#0a626a]">{selectedPart.name}</p>
          <p className="mt-1 text-xs leading-5 text-[#46666d]">{selectedPart.desc}</p>
        </div>
      ) : (
        <p className="mt-3 text-xs text-[#799398]">点选任一结构名，图中会高亮对应部分并显示考点说明。</p>
      )}
    </div>
  );
}

export default SpecimenCard;
