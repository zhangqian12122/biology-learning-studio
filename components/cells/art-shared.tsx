'use client';

import type { ComponentType } from 'react';

export type ArtProps = { active: number | null; open?: boolean };

export type ArtBundle = {
  Svg: ComponentType<ArtProps>;
  Stage3d?: ComponentType<ArtProps>;
  StageWebGL?: ComponentType<ArtProps>;
};

/** 选中结构高亮：未选中的整体调淡。 */
export function dim(active: number | null, idx: number) {
  return { opacity: active == null || active === idx ? 1 : 0.24, transition: 'opacity 0.25s ease' };
}

/** 编号圆标。 */
export function Badge({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g style={{ pointerEvents: 'none' }}>
      <circle cx={x} cy={y} r="9.5" fill="#0e6f75" stroke="#ffffff" strokeWidth="2" />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="13.5" fill="#ffffff" fontWeight="700">
        {n}
      </text>
    </g>
  );
}

export function MiniMito({ cx, cy, rx, ry, rotate = 0 }: { cx: number; cy: number; rx: number; ry: number; rotate?: number }) {
  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#5fb3a1" stroke="#2f7d6d" strokeWidth="2.2" />
      <ellipse cx={cx} cy={cy} rx={rx - 5} ry={ry - 4.5} fill="#c9eae2" />
      <path
        d={`M${cx - rx * 0.48} ${cy - ry * 0.52} C ${cx - rx * 0.28} ${cy - ry * 0.05}, ${cx - rx * 0.02} ${cy - ry * 0.02}, ${cx + rx * 0.14} ${cy - ry * 0.3}`}
        stroke="#2f7d6d" strokeWidth="2.8" fill="none" strokeLinecap="round"
      />
      <path
        d={`M${cx + rx * 0.48} ${cy + ry * 0.52} C ${cx + rx * 0.28} ${cy + ry * 0.05}, ${cx + rx * 0.02} ${cy + ry * 0.02}, ${cx - rx * 0.14} ${cy + ry * 0.3}`}
        stroke="#2f7d6d" strokeWidth="2.8" fill="none" strokeLinecap="round"
      />
      <path
        d={`M${cx - rx * 0.62} ${cy + ry * 0.3} q ${rx * 0.3} ${-ry * 0.34}, ${rx * 0.62} ${-ry * 0.1}`}
        stroke="#2f7d6d" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.85"
      />
    </g>
  );
}

/** 分片内 SVG 动画 keyframes（气孔纤毛/鞭毛），由消费方以 <style> 注入一次。 */
export const ART_KEYFRAMES = `
@keyframes bio-cilia-sway { 0%, 100% { transform: skewX(0deg); } 50% { transform: skewX(2.5deg); } }
.bio-cilia { animation: bio-cilia-sway 1.8s ease-in-out infinite; transform-origin: 260px 195px; }
@keyframes bio-flagella-wave { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(7deg); } }
.bio-flagella { animation: bio-flagella-wave 1.3s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .bio-cilia, .bio-flagella { animation: none; }
}
`;
