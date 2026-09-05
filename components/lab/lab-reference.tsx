'use client';

import { useState, type ReactNode } from 'react';

export type LabReferenceSection = {
  title: string;
  lines: ReactNode[];
};

/** 实验参考面板：原理 / 材料用具 / 方法步骤 / 注意事项·考点 的分页卡片。 */
export function LabReference({ items }: { items: LabReferenceSection[] }) {
  const [active, setActive] = useState(0);
  const section = items[Math.min(active, items.length - 1)];

  return (
    <div className="rounded-lg border border-[#dceaea] bg-white">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-[#dceaea] px-4 py-3 sm:px-5">
        <span className="text-xs font-semibold tracking-[0.08em] text-[#67858b]">实验参考</span>
        <div className="flex flex-wrap gap-1.5" role="tablist">
          {items.map((item, index) => {
            const current = index === Math.min(active, items.length - 1);
            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={current}
                onClick={() => setActive(index)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  current
                    ? 'bg-[#0e6f75] text-white'
                    : 'bg-[#eef7f6] text-[#4b6c73] hover:bg-[#e2f1ef]'
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>
      <ul className="space-y-2 px-4 py-4 text-sm leading-6 text-[#49676d] sm:px-5">
        {section.lines.map((line, index) => (
          <li key={index} className="flex gap-2">
            <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-[#8fc0bb]" />
            <span className="min-w-0">{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
