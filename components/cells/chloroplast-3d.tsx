'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 手写轻量 3D 投影（无三方库）：教科书切口式叶绿体
 * - 透镜状实心外壳 + 屏幕空间固定"切窗"
 * - 基粒 = 垂直堆叠的扁圆盘（"硬币堆"），基质类囊体细管串联
 * - 拖拽旋转（偏航 + 俯仰），松手后自动旋转
 */
type Vec3 = [number, number, number];

const CX = 260;
const CY = 188;
const F = 720;

const OUTER = { a: 178, b: 116, c: 108 };

/** 椭球表面点 + 法向 */
function ellipsoidPoint(e: { a: number; b: number; c: number }, lat: number, lon: number): { p: Vec3; n: Vec3 } {
  const cl = Math.cos(lat);
  const p: Vec3 = [e.a * cl * Math.cos(lon), e.b * Math.sin(lat), e.c * cl * Math.sin(lon)];
  const n: Vec3 = [p[0] / (e.a * e.a), p[1] / (e.b * e.b), p[2] / (e.c * e.c)];
  const len = Math.hypot(n[0], n[1], n[2]);
  return { p, n: [n[0] / len, n[1] / len, n[2] / len] };
}

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

/** 基粒：位置 + 盘半径 + 层数（盘面水平、带轻微统一倾角） */
const GRANA: { center: Vec3; r: number; layers: number }[] = [
  { center: [-88, 6, 14], r: 26, layers: 7 },
  { center: [-26, -10, -24], r: 24, layers: 6 },
  { center: [38, 12, 18], r: 26, layers: 7 },
  { center: [98, -6, -14], r: 23, layers: 6 },
];
const LAYER_GAP = 11.5;
const DISC_TILT = 0.16; // 盘面统一绕 x 轻微倾斜

/** 基质类囊体：串联相邻基粒的扁平细管 */
const LAMELLAE: Vec3[][] = [
  [[-88, 14, 14], [-56, 8, -4], [-26, -2, -24]],
  [[-26, -2, -24], [8, 4, -4], [38, 4, 18]],
  [[38, 4, 18], [70, -2, 4], [98, -14, -14]],
  [[-88, -16, 14], [-56, -20, -4], [-26, -24, -24]],
  [[38, -22, 18], [70, -26, 4], [98, -30, -14]],
].map((pts) => catmullRom(pts as Vec3[], 6));

const DNA_RINGS: { center: Vec3; r: number; u: Vec3; v: Vec3 }[] = [
  { center: [0, -34, 30], r: 13, u: [0.94, 0.3, 0], v: [-0.26, 0.8, 0.54] },
];

const RIBOSOMES: Vec3[] = [
  [-58, 44, 26], [8, 52, -6], [66, 40, 30], [-118, -18, 8], [128, 22, -4],
  [-18, -58, 12], [58, -44, 28], [-64, -46, -18], [30, 28, -34], [112, -38, 16],
];
const STARCH: { center: Vec3; r: number }[] = [{ center: [-120, 30, -6], r: 13 }];

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function ellipsePath(cx: number, cy: number, rx: number, ry: number) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy} Z`;
}

export function Chloroplast3d({ active }: { active: number | null }) {
  const [yaw, setYaw] = useState(-0.45);
  const [pitch, setPitch] = useState(-0.18);
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

  const granaColor = (z: number) => {
    const t = Math.max(0, Math.min(1, (z + 100) / 200));
    return `rgb(${Math.round(mix(24, 84, t))}, ${Math.round(mix(112, 168, t))}, ${Math.round(mix(88, 134, t))})`;
  };

  // 轮廓半径
  const outerRx = Math.hypot(OUTER.a * cy, OUTER.c * sy);
  const outerRy = Math.hypot(OUTER.b * cp, Math.hypot(OUTER.a * cy, OUTER.c * sy) * sp);
  const winRx = outerRx * 0.72;
  const winRy = outerRy * 0.68;

  // 基粒圆盘：扁片 = 同平面的 3 个重叠圆；深度排序（基粒 idx3 与基质类囊体 idx4 分组）
  const granaItems: { z: number; node: React.ReactNode }[] = [];
  const lamellaItems: { z: number; node: React.ReactNode }[] = [];
  GRANA.forEach((g, gi) => {
    for (let li = 0; li < g.layers; li += 1) {
      const pt: Vec3 = [g.center[0], g.center[1] + (li - (g.layers - 1) / 2) * LAYER_GAP, g.center[2]];
      const pr = project(pt);
      const r = g.r * pr.s;
      const ry = r * (0.32 + DISC_TILT * Math.abs(sp) * 2);
      const col = granaColor(pr.z);
      const zKey = pr.z + li * 0.01;
      granaItems.push({
        z: zKey,
        node: (
          <g key={`d${gi}-${li}`}>
            {/* 盘面边缘描一圈深色，叠出"硬币"厚度感 */}
            <ellipse cx={pr.x} cy={pr.y} rx={r} ry={ry} fill={col} stroke="#17544082" strokeWidth="1.4" />
            <ellipse cx={pr.x - r * 0.28} cy={pr.y - ry * 0.3} rx={r * 0.52} ry={ry * 0.52} fill="#8fd0ae" opacity="0.4" />
          </g>
        ),
      });
      // 层间的小连丝点缀（类囊体垛叠的侧面观）
      if (li < g.layers - 1) {
        const pt2: Vec3 = [g.center[0], pt[1] + LAYER_GAP / 2, g.center[2]];
        const pr2 = project(pt2);
        granaItems.push({
          z: pr2.z - 0.5,
          node: <circle key={`s${gi}-${li}`} cx={pr2.x + r * 0.92} cy={pr2.y} r={2.2 * pr2.s} fill="#175440" opacity="0.7" />,
        });
      }
    }
  });
  // 基质类囊体细管
  LAMELLAE.forEach((curve, li) => {
    curve.forEach((pt, pi) => {
      const pr = project(pt);
      lamellaItems.push({
        z: pr.z,
        node: <circle key={`l${li}-${pi}`} cx={pr.x} cy={pr.y} r={4.6 * pr.s} fill="#57a97e" />,
      });
    });
  });
  granaItems.sort((a, b) => a.z - b.z);
  lamellaItems.sort((a, b) => a.z - b.z);

  // 基质内容物
  const granuleItems: { z: number; node: React.ReactNode }[] = [];
  const ribosomeItems: { z: number; node: React.ReactNode }[] = [];
  const dnaItems: { z: number; node: React.ReactNode }[] = [];
  STARCH.forEach((st, i) => {
    const pr = project(st.center);
    granuleItems.push({
      z: pr.z,
      node: <circle key={`st${i}`} cx={pr.x} cy={pr.y} r={st.r * pr.s} fill="#f2f7e8" stroke="#c9d8b0" strokeWidth="2" />,
    });
  });
  RIBOSOMES.forEach((pt, i) => {
    const pr = project(pt);
    ribosomeItems.push({ z: pr.z, node: <circle key={`r${i}`} cx={pr.x} cy={pr.y} r={2 * pr.s} fill="#1c5a3c" /> });
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
          key={`dna${i}`}
          d={proj.map((q, k) => `${k === 0 ? 'M' : 'L'}${q.x.toFixed(1)} ${q.y.toFixed(1)}`).join(' ') + ' Z'}
          fill="none"
          stroke="#e6913c"
          strokeWidth={3}
        />
      ),
    });
  });
  granuleItems.sort((a, b) => a.z - b.z);
  ribosomeItems.sort((a, b) => a.z - b.z);
  dnaItems.sort((a, b) => a.z - b.z);

  // 前半球孔蛋白（落在切窗内的跳过）
  const PORIN_ANGLES: [number, number][] = Array.from({ length: 24 }, (_, i) => {
    const r1 = Math.sin(i * 17.2333) * 24634.6345;
    const lat = ((r1 - Math.floor(r1)) - 0.5) * 1.15;
    return [lat, (i / 24) * Math.PI * 2];
  });
  const porinDots = PORIN_ANGLES.map(([lat, lon], i) => {
    const { p } = ellipsoidPoint(OUTER, lat, lon);
    const pr = project(p);
    const inWindow =
      ((pr.x - CX) / Math.max(1, winRx)) ** 2 + ((pr.y - CY) / Math.max(1, winRy)) ** 2 < 1;
    return { pr, i, front: pr.z > 6, inWindow };
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
      aria-label="叶绿体立体模型，可拖拽旋转"
    >
      <defs>
        <radialGradient id="chl3d-body" cx="0.36" cy="0.28" r="0.95">
          <stop offset="0%" stopColor="#5cb878" />
          <stop offset="72%" stopColor="#35935c" />
          <stop offset="100%" stopColor="#247246" />
        </radialGradient>
        <radialGradient id="chl3d-stroma" cx="0.45" cy="0.4" r="0.75">
          <stop offset="0%" stopColor="#eef8e4" />
          <stop offset="100%" stopColor="#d2ecd0" />
        </radialGradient>
        <clipPath id="chl3d-window">
          <ellipse cx={CX} cy={CY} rx={winRx} ry={winRy} />
        </clipPath>
      </defs>

      {/* 投影阴影 */}
      <ellipse cx={CX} cy={CY + outerRy + 14} rx={outerRx * 0.78} ry={outerRy * 0.2} fill="#0a2b33" opacity="0.1" />

      {/* 基质（切窗内底色） */}
      <g style={dim(2)}>
        <ellipse cx={CX} cy={CY} rx={winRx} ry={winRy} fill="url(#chl3d-stroma)" />
      </g>

      {/* 内部构造（裁剪在切窗内，深度排序） */}
      <g clipPath="url(#chl3d-window)">
        <g style={dim(2)}>{granuleItems.map((item) => item.node)}</g>
        <g style={dim(5)}>{dnaItems.map((item) => item.node)}</g>
        <g style={dim(5)}>{ribosomeItems.map((item) => item.node)}</g>
        <g style={dim(4)}>{lamellaItems.map((item) => item.node)}</g>
        <g style={dim(3)}>{granaItems.map((item) => item.node)}</g>
      </g>

      {/* 外膜：实心环（evenodd 打出切窗洞口） */}
      <g style={dim(0)}>
        <path
          d={`${ellipsePath(CX, CY, outerRx, outerRy)} ${ellipsePath(CX, CY, winRx, winRy)}`}
          fillRule="evenodd"
          fill="url(#chl3d-body)"
          stroke="none"
        />
        <ellipse cx={CX} cy={CY} rx={outerRx} ry={outerRy} fill="none" stroke="#1d5c39" strokeWidth="2.5" />
        {porinDots.map(({ pr, i, front, inWindow }) =>
          front && !inWindow ? <circle key={`p${i}`} cx={pr.x} cy={pr.y} r={2.1 * pr.s} fill="#123f27" opacity="0.55" /> : null,
        )}
      </g>

      {/* 内膜：切窗边缘的黄绿亮线（切口） */}
      <g style={dim(1)}>
        <ellipse cx={CX} cy={CY} rx={winRx} ry={winRy} fill="none" stroke="#d6ee51" strokeWidth="5" />
        <ellipse cx={CX} cy={CY} rx={winRx} ry={winRy} fill="none" stroke="#f6fcd2" strokeWidth="1.6" />
      </g>

      <text x="512" y="368" textAnchor="end" fontSize="9.5" fill="#799398">叶绿体 3D 模型 · 光合作用场所</text>
    </svg>
  );
}
