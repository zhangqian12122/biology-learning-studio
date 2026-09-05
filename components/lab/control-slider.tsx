'use client';

import type { ReactNode } from 'react';

import { Slider } from '@/components/ui/slider';

export type ControlSliderProps = {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  digits?: number;
  accent?: 'teal' | 'violet' | 'rose' | 'amber';
  onChange: (value: number) => void;
};

const ACCENT_CLASS: Record<string, string> = {
  teal: '[&_[data-slot=slider-range]]:bg-[#0e787b] [&_[data-slot=slider-thumb]]:border-[#0e787b]',
  violet:
    '[&_[data-slot=slider-range]]:bg-[#5b64c7] [&_[data-slot=slider-thumb]]:border-[#5b64c7]',
  rose: '[&_[data-slot=slider-range]]:bg-[#c25668] [&_[data-slot=slider-thumb]]:border-[#c25668]',
  amber:
    '[&_[data-slot=slider-range]]:bg-[#c08a1f] [&_[data-slot=slider-thumb]]:border-[#c08a1f]',
};

export function ControlSlider({
  label,
  value,
  unit,
  min,
  max,
  step,
  digits = 0,
  accent = 'teal',
  onChange,
}: ControlSliderProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-[#37585f]">{label}</label>
        <output className="rounded-md bg-[#e8f4f3] px-2.5 py-1 text-sm font-semibold text-[#0c696f]">
          {value.toFixed(digits)}
          {unit ? ` ${unit}` : ''}
        </output>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(values) => {
          const nextValue = typeof values === 'number' ? values : values[0];
          onChange(nextValue ?? value);
        }}
        className={ACCENT_CLASS[accent]}
        aria-label={label}
      />
      <div className="mt-2 flex justify-between text-[11px] text-[#799398]">
        <span>
          {min}
          {unit ? ` ${unit}` : ''}
        </span>
        <span>
          {max}
          {unit ? ` ${unit}` : ''}
        </span>
      </div>
    </div>
  );
}

/** 实验组件的统一两栏布局：左侧控制 + 右侧可视化。 */
export function ExperimentPane({
  controls,
  children,
}: {
  controls: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(250px,0.72fr)_minmax(0,1.28fr)]">
      <div className="space-y-5 rounded-lg border border-[#dceaea] bg-[#f9fcfc] p-4 sm:p-5">
        {controls}
      </div>
      <div className="space-y-4 rounded-lg border border-[#dceaea] bg-[#fbfdfd] p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
}

/** 动画场景容器。 */
export function SceneBox({
  label,
  children,
  heightClass = 'h-[260px]',
}: {
  label: string;
  children: ReactNode;
  heightClass?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">{label}</p>
      <style>{scenePanCss}</style>
      <div className={`relative min-w-0 overflow-hidden rounded-md border border-[#dceaea] bg-gradient-to-b from-[#f2fafa] to-[#e7f3f1] ${heightClass}`}>
        {/* 手机上场景按固定宽度渲染（字号可读），可左右拖动平移；桌面端自适应铺满 */}
        <div className="scene-pan h-full">{children}</div>
      </div>
    </div>
  );
}

const scenePanCss = `
@media (max-width: 640px) {
  .scene-pan { width: 480px; overflow-x: auto; }
}
`;

export function ObservationNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-[#d39a2b] pl-3">
      <p className="text-xs font-semibold text-[#8a671b]">观察判断</p>
      <p className="mt-1 text-sm leading-6 text-[#49676d]">{children}</p>
    </div>
  );
}
