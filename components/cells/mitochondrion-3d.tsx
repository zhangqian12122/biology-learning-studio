'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 手写轻量 3D 投影（无三方库）：教科书切口式线粒体
 * - 实心外壳 + 屏幕空间固定"切窗"，透过切窗看内部
 * - 嵴 = 宽扁梳状三维管（上下交错、按深度排序、近深远浅）
 * - 拖拽旋转（偏航 + 俯仰），松手后自动旋转
 */
type Vec3 = [number, number, number];

const CX = 260;
const CY = 188;
const F = 720;

const OUTER = { a: 172, b: 112, c: 98 };

/** Catmull-Rom 样条插值 */
function catmullRom(points: Vec3[], seg = 7): Vec3[] {
  if (points.length < 2) return points;
  const out: Vec3[] = [];
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    for (let t = 0; t < seg; t += 1) {
      const s = t / seg;
      const s2 = s * s;
      const s3 = s2 * s;
      out.push([
        0.5 * (2 * p1[0] + (p2[0] - p0[0]) * s + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * s2 + (3 * p1[0] - p0[0] - 3 * p2[0] + p3[0]) * s3),
        0.5 * (2 * p1[1] + (p2[1] - p0[1]) * s + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * s2 + (3 * p1[1] - p0[1] - 3 * p2[1] + p3[1]) * s3),
        0.5 * (2 * p1[2] + (p2[2] - p0[2]) * s + (2 * p0[2] - 5 * p1[2] + 4 * p2[2] - p3[2]) * s2 + (3 * p1[2] - p0[2] - 3 * p2[2] + p3[2]) * s3),
      ]);
    }
  }
  out.push(points[points.length - 1]);
  return out;
}

/** 嵴：上方垂下与下方升起的宽扁折叠，交错排列几乎相接（y 向上，z 朝观察者） */
const CRISTAE: Vec3[][] = [
  // 上排垂下
  [[-80, 68, 18], [-84, 34, 20], [-74, 2, 22], [-66, -24, 20], [-64, -38, 18]],
  [[-27, 76, -14], [-30, 40, -16], [-24, 6, -18], [-20, -22, -16], [-20, -36, -14]],
  [[27, 76, 12], [30, 40, 14], [24, 6, 16], [20, -22, 14], [20, -36, 12]],
  [[80, 66, -18], [84, 32, -20], [74, 0, -22], [66, -26, -20], [64, -40, -18]],
  // 下排升起
  [[-54, -70, -6], [-58, -34, -8], [-50, 2, -10], [-46, 28, -8], [-46, 44, -6]],
  [[2, -76, 20], [6, -38, 22], [-2, 0, 24], [4, 32, 22], [2, 50, 20]],
  [[56, -68, -14], [60, -32, -16], [52, 2, -18], [48, 30, -16], [48, 46, -14]],
].map((pts) => catmullRom(pts as Vec3[], 7));

const DNA_RINGS: { center: Vec3; r: number; u: Vec3; v: Vec3 }[] = [
  { center: [-100, 44, 10], r: 13, u: [0.94, 0.34, 0], v: [-0.28, 0.78, 0.56] },
  { center: [102, -40, -12], r: 10, u: [0.9, -0.4, 0.17], v: [0.34, 0.72, 0.6] },
];

const GRANULES: Vec3[] = [
  [-12, 58, 30], [-38, -52, 26], [118, 30, 6], [-116, -26, -4], [66, -14, 32], [-68, 16, -26],
];
const RIBOSOMES: Vec3[] = [
  [44, 64, -18], [-48, 48, 32], [128, -6, -12], [-124, 12, 6], [72, 34, -26],
  [-14, -44, 28], [10, 60, 16], [-88, -42, 16], [102, 42, 20], [-34, 14, -28],
  [38, -22, -30], [-62, -6, 34], [88, 58, -6], [-96, 40, -12],
];

function ellipsoidPoint(e: { a: number; b: number; c: number }, lat: number, lon: number): { p: Vec3; n: Vec3 } {
  const cl = Math.cos(lat);
  const p: Vec3 = [e.a * cl * Math.cos(lon), e.b * Math.sin(lat), e.c * cl * Math.sin(lon)];
  const n: Vec3 = [p[0] / (e.a * e.a), p[1] / (e.b * e.b), p[2] / (e.c * e.c)];
  const len = Math.hypot(n[0], n[1], n[2]);
  return { p, n: [n[0] / len, n[1] / len, n[2] / len] };
}

const PORIN_ANGLES: [number, number][] = Array.from({ length: 24 }, (_, i) => {
  const r1 = Math.sin(i * 12.9898) * 43758.5453;
  const lat = ((r1 - Math.floor(r1)) - 0.5) * 1.15;
  return [lat, (i / 24) * Math.PI * 2];
});

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function ellipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;
}

export function Mitochondrion3d({ active }: { active: number | null }) {
  const [yaw, setYaw] = useState(-0.5);
  const [pitch, setPitch] = useState(-0.16);
  const dragRef = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);
  const autoRef = useRef(true);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (reducedRef.current) return;
    let raf = 0;
    const tick = () => {
      if (autoRef.current && !dragRef.current) {
        setYaw((y) => y + 0.005);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);

  const project = (p: Vec3): { x: number; y: number; z: number; s: number } => {
    const x1 = p[0] * cy + p[2] * sy;
    const z1 = -p[0] * sy + p[2] * cy;
    const y2 = p[1] * cp - z1 * sp;
    const z2 = p[1] * sp + z1 * cp;
    const s = F / (F - z2);
    return { x: CX + x1 * s, y: CY - y2 * s, z: z2, s };
  };

  const cristaColor = (z: number) => {
    const t = Math.max(0, Math.min(1, (z + 95) / 190));
    return `rgb(${Math.round(mix(22, 94, t))}, ${Math.round(mix(103, 176, t))}, ${Math.round(mix(92, 160, t))})`;
  };

  // 轮廓半径
  const outerRx = Math.hypot(OUTER.a * cy, OUTER.c * sy);
  const outerRy = Math.hypot(OUTER.b * cp, Math.hypot(OUTER.a * cy, OUTER.c * sy) * sp);
  const winRx = outerRx * 0.72;
  const winRy = outerRy * 0.68;

  // 嵴圆片（深度排序，宽扁 + 锥度）
  const tubeItems: { z: number; node: React.ReactNode }[] = [];
  CRISTAE.forEach((curve, ci) => {
    const n = curve.length;
    curve.forEach((pt, pi) => {
      const pr = project(pt);
      const taper = 14.5 - 5 * (pi / (n - 1));
      const r = taper * pr.s;
      tubeItems.push({
        z: pr.z,
        node: <circle key={`c${ci}-${pi}`} cx={pr.x} cy={pr.y} r={Math.max(2, r)} fill={cristaColor(pr.z)} />,
      });
      if (pi % 2 === 1) {
        tubeItems.push({
          z: pr.z + 0.5,
          node: (
            <circle key={`h${ci}-${pi}`} cx={pr.x - r * 0.18} cy={pr.y - r * 0.3} r={Math.max(0.8, r * 0.22)} fill="#9fdcc9" opacity="0.6" />
          ),
        });
      }
    });
    // 嵴根部：与内膜相连的深色圆点
    const rootPr = project(curve[0]);
    tubeItems.push({
      z: rootPr.z - 1,
      node: <circle key={`root${ci}`} cx={rootPr.x} cy={rootPr.y} r={9} fill="#0f4c42" />,
    });
  });
  tubeItems.sort((a, b) => a.z - b.z);

  // 基质内容物
  const granuleItems: { z: number; node: React.ReactNode }[] = [];
  const ribosomeItems: { z: number; node: React.ReactNode }[] = [];
  const dnaItems: { z: number; node: React.ReactNode }[] = [];
  GRANULES.forEach((pt, i) => {
    const pr = project(pt);
    granuleItems.push({ z: pr.z, node: <circle key={`g${i}`} cx={pr.x} cy={pr.y} r={4.4 * pr.s} fill="#e6913c" /> });
  });
  RIBOSOMES.forEach((pt, i) => {
    const pr = project(pt);
    ribosomeItems.push({ z: pr.z, node: <circle key={`r${i}`} cx={pr.x} cy={pr.y} r={2 * pr.s} fill="#124b41" /> });
  });
  DNA_RINGS.forEach((ring, i) => {
    const pts = Array.from({ length: 26 }, (_, k) => {
      const th = (k / 26) * Math.PI * 2;
      return [
        ring.center[0] + ring.r * (ring.u[0] * Math.cos(th) + ring.v[0] * Math.sin(th)),
        ring.center[1] + ring.r * (ring.u[1] * Math.cos(th) + ring.v[1] * Math.sin(th)),
        ring.center[2] + ring.r * (ring.u[2] * Math.cos(th) + ring.v[2] * Math.sin(th)),
      ] as Vec3;
    });
    const proj = pts.map(project);
    const zAvg = proj.reduce((sum, q) => sum + q.z, 0) / proj.length;
    dnaItems.push({
      z: zAvg,
      node: (
        <path
          key={`d${i}`}
          d={proj.map((q, k) => `${k === 0 ? 'M' : 'L'}${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' ') + ' Z'}
          fill="none"
          stroke="#f0a03c"
          strokeWidth={3}
        />
      ),
    });
  });
  granuleItems.sort((a, b) => a.z - b.z);
  ribosomeItems.sort((a, b) => a.z - b.z);
  dnaItems.sort((a, b) => a.z - b.z);

  // 前半球孔蛋白（落在切窗内的跳过）
  const porinDots = PORIN_ANGLES.map(([lat, lon], i) => {
    const { p } = ellipsoidPoint(OUTER, lat, lon);
    const pr = project(p);
    const inWindow =
      ((pr.x - CX) / Math.max(1, winRx)) ** 2 + ((pr.y - CY) / Math.max(1, winRy)) ** 2 < 1;
    return { pr, i, front: pr.z > 6, inWindow };
  });

  // ATP 合成酶：切窗内缘一圈带柄颗粒（位于内膜切口上）
  const atpItems = Array.from({ length: 12 }, (_, k) => {
    const th = (k / 12) * Math.PI * 2 + 0.26;
    const bx = CX + Math.cos(th) * winRx * 0.94;
    const by = CY + Math.sin(th) * winRy * 0.94;
    const tx = CX + Math.cos(th) * (winRx * 0.94 - 9);
    const ty = CY + Math.sin(th) * (winRy * 0.94 - 9);
    return { bx, by, tx, ty, i: k };
  });

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    dragRef.current = { x: e.clientX, y: e.clientY, yaw, pitch };
    autoRef.current = false;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = dragRef.current;
    if (!d) return;
    setYaw(d.yaw + (e.clientX - d.x) * 0.008);
    setPitch(Math.max(-0.6, Math.min(0.6, d.pitch + (e.clientY - d.y) * 0.005)));
  };
  const onPointerUp = () => {
    dragRef.current = null;
    autoRef.current = true;
  };

  const dim = (idx: number) => ({
    opacity: active == null || active === idx ? 1 : 0.14,
    transition: 'opacity 0.25s ease',
  });

  return (
    <svg
      viewBox="0 0 520 380"
      className="h-full w-full cursor-grab touch-none active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      role="img"
      aria-label="线粒体立体模型，可拖拽旋转"
    >
      <defs>
        <radialGradient id="mito3d-body" cx="0.36" cy="0.28" r="0.95">
          <stop offset="0%" stopColor="#49b39c" />
          <stop offset="72%" stopColor="#2e9480" />
          <stop offset="100%" stopColor="#1f7a68" />
        </radialGradient>
        <radialGradient id="mito3d-matrix" cx="0.45" cy="0.4" r="0.75">
          <stop offset="0%" stopColor="#e6f7f0" />
          <stop offset="100%" stopColor="#c2e8db" />
        </radialGradient>
        <clipPath id="mito3d-window">
          <ellipse cx={CX} cy={CY} rx={winRx} ry={winRy} />
        </clipPath>
      </defs>

      {/* 投影阴影 */}
      <ellipse cx={CX} cy={CY + outerRy + 14} rx={outerRx * 0.78} ry={outerRy * 0.2} fill="#0a2b33" opacity="0.1" />

      {/* 基质（切窗内底色） */}
      <g style={dim(4)}>
        <ellipse cx={CX} cy={CY} rx={winRx} ry={winRy} fill="url(#mito3d-matrix)" />
      </g>

      {/* 内部构造（裁剪在切窗内，深度排序） */}
      <g clipPath="url(#mito3d-window)">
        <g style={dim(4)}>{granuleItems.map((item) => item.node)}</g>
        <g style={dim(5)}>{dnaItems.map((item) => item.node)}</g>
        <g style={dim(6)}>{ribosomeItems.map((item) => item.node)}</g>
        <g style={dim(2)}>{tubeItems.map((item) => item.node)}</g>
      </g>

      {/* 外膜：实心环（evenodd 打出切窗洞口） */}
      <g style={dim(0)}>
        <path
          d={`${ellipsePath(CX, CY, outerRx, outerRy)} ${ellipsePath(CX, CY, winRx, winRy)}`}
          fillRule="evenodd"
          fill="url(#mito3d-body)"
          stroke="none"
        />
        <ellipse cx={CX} cy={CY} rx={outerRx} ry={outerRy} fill="none" stroke="#1c6e5e" strokeWidth="2.5" />
        {porinDots.map(({ pr, i, front, inWindow }) =>
          front && !inWindow ? <circle key={`p${i}`} cx={pr.x} cy={pr.y} r={2.1 * pr.s} fill="#0f4c42" opacity="0.55" /> : null,
        )}
      </g>

      {/* 内膜：切窗边缘的黄绿亮线（切口） */}
      <g style={dim(1)}>
        <ellipse cx={CX} cy={CY} rx={winRx} ry={winRy} fill="none" stroke="#cfe93f" strokeWidth="5" />
        <ellipse cx={CX} cy={CY} rx={winRx} ry={winRy} fill="none" stroke="#f4fbcd" strokeWidth="1.6" />
      </g>

      {/* 膜间隙：外壳与切窗之间的环带 */}
      <g style={dim(3)}>
        <ellipse
          cx={CX}
          cy={CY}
          rx={(outerRx + winRx) / 2}
          ry={(outerRy + winRy) / 2}
          fill="none"
          stroke="#eaf9f2"
          strokeWidth={Math.max(2, (outerRx - winRx) * 0.5)}
          opacity="0.4"
        />
      </g>

      {/* ATP 合成酶：切窗内缘的带柄颗粒 */}
      <g style={dim(7)}>
        {atpItems.map(({ bx, by, tx, ty, i }) => (
          <g key={`a${i}`}>
            <line x1={bx} y1={by} x2={tx} y2={ty} stroke="#e6913c" strokeWidth="2" />
            <circle cx={tx} cy={ty} r="2.8" fill="#e6913c" />
          </g>
        ))}
      </g>

      <text x="512" y="368" textAnchor="end" fontSize="9.5" fill="#799398">线粒体 3D 模型 · 有氧呼吸主要场所</text>
    </svg>
  );
}
