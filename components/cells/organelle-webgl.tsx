'use client';

import { useRef } from 'react';
import * as THREE from 'three';

import {
  applyGlow,
  basicMat,
  groupOf,
  toonMat,
  useOrganelleCanvas,
  type Group,
  type Vec3,
} from '@/components/cells/three-shared';

const CUT_HALF = 0.62;

function spherePoint(r: number, phi: number, theta: number): Vec3 {
  return [-r * Math.cos(phi) * Math.sin(theta), r * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta)];
}

/** 可爱的 ATP 小蘑菇（帽 + 柄），长在内膜切口一圈 */
function addMushrooms(scene: THREE.Object3D, groups: Record<number, Group>, rimRx: number, rimRy: number) {
  const capGeo = new THREE.SphereGeometry(3.4, 14, 10);
  const stemGeo = new THREE.CylinderGeometry(1, 1.3, 5, 10);
  for (let k = 0; k < 12; k += 1) {
    const th = (k / 12) * Math.PI * 2 + 0.26;
    const bx = Math.cos(th) * rimRx;
    const by = Math.sin(th) * rimRy;
    const tx = Math.cos(th) * (rimRx - 7);
    const ty = Math.sin(th) * (rimRy - 7);
    const stem = new THREE.Mesh(stemGeo, toonMat(groups, 7, '#ffb85c'));
    stem.position.set((bx + tx) / 2, (by + ty) / 2, 0);
    stem.rotation.z = Math.atan2(bx - tx, by - ty) + Math.PI / 2;
    const cap = new THREE.Mesh(capGeo, toonMat(groups, 7, '#ff9f43'));
    cap.position.set(tx, ty, 0);
    cap.scale.set(1, 0.72, 1);
    scene.add(stem, cap);
  }
}

const MITO_OUTER = { a: 172, b: 112, c: 98 };
const MITO_INNER = { a: 138, b: 84, c: 72 };
const MITO_CRISTAE: Vec3[][] = [
  [[-80, 68, 18], [-84, 34, 20], [-74, 2, 22], [-66, -24, 20], [-64, -38, 18]],
  [[-27, 76, -14], [-30, 40, -16], [-24, 6, -18], [-20, -22, -16], [-20, -36, -14]],
  [[27, 76, 12], [30, 40, 14], [24, 6, 16], [20, -22, 14], [20, -36, 12]],
  [[80, 66, -18], [84, 32, -20], [74, 0, -22], [66, -26, -20], [64, -40, -18]],
  [[-54, -70, -6], [-58, -34, -8], [-50, 2, -10], [-46, 28, -8], [-46, 44, -6]],
  [[2, -76, 20], [6, -38, 22], [-2, 0, 24], [4, 32, 22], [2, 50, 20]],
  [[56, -68, -14], [60, -32, -16], [52, 2, -18], [48, 30, -16], [48, 46, -14]],
];

function buildMitochondrion(groups: Record<number, Group>): THREE.Group {
  const root = new THREE.Group();

  // 膜间隙内壁：填满外膜与内膜之间的缝隙（避免露出背景形成暗环）
  const gapWall = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 44), basicMat(groups, 0, '#1e8a72'));
  gapWall.scale.set(MITO_OUTER.a, MITO_OUTER.b, MITO_OUTER.c);
  root.add(gapWall);

  // 基质内壁两层：外圈偏深、中心浅色，形成纵深
  const matrixOuter = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), basicMat(groups, 4, '#c7e8da'));
  matrixOuter.scale.set(MITO_INNER.a * 0.94, MITO_INNER.b * 0.94, MITO_INNER.c * 0.94);
  root.add(matrixOuter);
  const matrixCore = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), basicMat(groups, 4, '#e6f7ee'));
  matrixCore.scale.set(MITO_INNER.a * 0.7, MITO_INNER.b * 0.7, MITO_INNER.c * 0.7);
  root.add(matrixCore);

  // 嵴管
  MITO_CRISTAE.forEach((pts) => {
    const curve = new THREE.CatmullRomCurve3(pts.map((p) => new THREE.Vector3(...p)));
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 9.5, 14, false), toonMat(groups, 2, '#2f9d7e'));
    root.add(tube);
  });

  // 环状 DNA（小圆环）
  ([[-104, 42, 10, 12], [106, -42, -12, 9]] as const).forEach(([x, y, z, r]) => {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(r, 3, 10, 32), toonMat(groups, 5, '#ff9f43'));
    mesh.position.set(x, y, z);
    mesh.rotation.set(1.1, 0.4, 0.2);
    root.add(mesh);
  });

  // 基质颗粒
  ([[-30, -52, 26], [52, -14, 30], [-96, -24, -10]] as const).forEach(([x, y, z]) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(4.5, 14, 10), toonMat(groups, 4, '#ffb85c'));
    mesh.position.set(x, y, z);
    root.add(mesh);
  });

  // 核糖体小点（少量，圆润）
  const riboPts: Vec3[] = [
    [-44, 30, 26], [8, 40, -22], [66, 22, 30], [-112, -12, 6], [122, 14, -8],
    [-20, -48, 20], [46, -36, 26], [90, 34, -20],
  ];
  riboPts.forEach((p) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(2.6, 10, 8), toonMat(groups, 6, '#7fb8a6'));
    mesh.position.set(...p);
    root.add(mesh);
  });

  // 内膜（部分球体）+ 切口亮边
  const innerGeo = new THREE.SphereGeometry(1, 80, 56, Math.PI / 2 + CUT_HALF, Math.PI * 2 - CUT_HALF * 2, 0, Math.PI);
  const inner = new THREE.Mesh(innerGeo, toonMat(groups, 1, '#cde94a'));
  inner.scale.set(MITO_INNER.a, MITO_INNER.b, MITO_INNER.c);
  root.add(inner);

  // 外膜（部分球体）；切口边缘不再加深色描边管
  const outerGeo = new THREE.SphereGeometry(1, 96, 64, Math.PI / 2 + CUT_HALF, Math.PI * 2 - CUT_HALF * 2, 0, Math.PI);
  const outer = new THREE.Mesh(outerGeo, toonMat(groups, 0, '#2fae94'));
  outer.scale.set(MITO_OUTER.a, MITO_OUTER.b, MITO_OUTER.c);
  root.add(outer);
  // 膜间隙高亮指示壳（仅高亮"膜间隙"时出现）
  const bandMat = new THREE.MeshBasicMaterial({ color: '#eaf9f2', transparent: true, opacity: 0, depthWrite: false });
  groupOf(groups, 3, bandMat, 0);
  const band = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), bandMat);
  band.scale.set((MITO_OUTER.a + MITO_INNER.a) / 2, (MITO_OUTER.b + MITO_INNER.b) / 2, (MITO_OUTER.c + MITO_INNER.c) / 2);
  root.add(band);

  // ATP 小蘑菇（长在内膜切口一圈）
  addMushrooms(root, groups, MITO_INNER.a * 0.9, MITO_INNER.b * 0.9);

  return root;
}

/* ================= 叶绿体 ================= */

const CHL_OUTER = { a: 180, b: 118, c: 108 };
const CHL_INNER = { a: 150, b: 94, c: 86 };
const CHL_GRANA: { center: Vec3; r: number; layers: number }[] = [
  { center: [-92, 4, 16], r: 27, layers: 7 },
  { center: [-30, -8, -26], r: 25, layers: 6 },
  { center: [40, 10, 20], r: 27, layers: 7 },
  { center: [102, -4, -16], r: 24, layers: 6 },
];
const CHL_GAP = 11.5;
const CHL_DISK_H = 3.4;

function buildChloroplast(groups: Record<number, Group>): THREE.Group {
  const root = new THREE.Group();

  // 基质（BackSide 内壁）
  // 膜间隙内壁：填满缝隙
  const gapWall = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 44), basicMat(groups, 0, '#1f7f52'));
  gapWall.scale.set(CHL_OUTER.a, CHL_OUTER.b, CHL_OUTER.c);
  root.add(gapWall);

  // 基质内壁两层：外圈偏深、中心浅色
  const stromaOuter = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), basicMat(groups, 2, '#d5ecc8'));
  stromaOuter.scale.set(CHL_INNER.a * 0.94, CHL_INNER.b * 0.94, CHL_INNER.c * 0.94);
  root.add(stromaOuter);
  const stromaCore = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), basicMat(groups, 2, '#ecf7e0'));
  stromaCore.scale.set(CHL_INNER.a * 0.7, CHL_INNER.b * 0.7, CHL_INNER.c * 0.7);
  root.add(stromaCore);

  // 淀粉粒
  const starch = new THREE.Mesh(new THREE.SphereGeometry(14, 20, 16), toonMat(groups, 2, '#fdf9ec'));
  starch.position.set(-124, 36, -6);
  root.add(starch);

  // 基质类囊体（扁条 + 描边）
  const links: [number, number, number][] = [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 1, -1], [2, 3, -1]];
  links.forEach(([i, j, level]) => {
    const gi = CHL_GRANA[i];
    const gj = CHL_GRANA[j];
    const y = level > 0 ? (gi.layers / 2) * CHL_GAP * 0.5 + 4 : (-gi.layers / 2) * CHL_GAP * 0.5 - 4;
    const mid = new THREE.Vector2((gi.center[0] + gj.center[0]) / 2, (gi.center[2] + gj.center[2]) / 2);
    const len = Math.hypot(gi.center[0] - gj.center[0], gi.center[2] - gj.center[2]) * 0.85;
    const ribbon = new THREE.Mesh(new THREE.BoxGeometry(len, 3.2, 12), toonMat(groups, 4, '#7cc98f'));
    ribbon.position.set(mid.x, y, mid.y);
    ribbon.rotation.y = Math.atan2(gj.center[2] - gi.center[2], gj.center[0] - gi.center[0]);
    root.add(ribbon);
  });

  // 基粒（硬币堆）
  CHL_GRANA.forEach((g, gi) => {
    for (let li = 0; li < g.layers; li += 1) {
      const y = g.center[1] + (li - (g.layers - 1) / 2) * CHL_GAP;
      const disk = new THREE.Mesh(new THREE.CylinderGeometry(g.r, g.r, CHL_DISK_H, 28), toonMat(groups, 3, '#35a06a'));
      disk.position.set(g.center[0], y, g.center[2]);
      disk.rotation.y = (gi * 0.35 + li * 0.08) % Math.PI;
      root.add(disk);
    }
  });

  // 环状 DNA
  const dna = new THREE.Mesh(new THREE.TorusGeometry(12, 3, 10, 32), toonMat(groups, 5, '#ff9f43'));
  dna.position.set(0, -48, 26);
  dna.rotation.set(1.0, 0.3, 0.2);
  root.add(dna);

  // 核糖体
  const riboPts: Vec3[] = [
    [-58, 46, 26], [8, 54, -6], [66, 42, 30], [-118, -20, 8], [130, 24, -4],
    [-18, -60, 12], [58, -46, 28],
  ];
  riboPts.forEach((p) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(2.6, 10, 8), toonMat(groups, 5, '#7fb8a6'));
    mesh.position.set(...p);
    root.add(mesh);
  });

  // 内膜 + 切口亮边
  const innerGeo = new THREE.SphereGeometry(1, 80, 56, Math.PI / 2 + CUT_HALF, Math.PI * 2 - CUT_HALF * 2, 0, Math.PI);
  const inner = new THREE.Mesh(innerGeo, toonMat(groups, 1, '#cde94a'));
  inner.scale.set(CHL_INNER.a, CHL_INNER.b, CHL_INNER.c);
  root.add(inner);

  // 外膜；切口边缘不再加深色描边管
  const outerGeo = new THREE.SphereGeometry(1, 96, 64, Math.PI / 2 + CUT_HALF, Math.PI * 2 - CUT_HALF * 2, 0, Math.PI);
  const outer = new THREE.Mesh(outerGeo, toonMat(groups, 0, '#38a56e'));
  outer.scale.set(CHL_OUTER.a, CHL_OUTER.b, CHL_OUTER.c);
  root.add(outer);

  return root;
}

/* ================= 查看器组件 ================= */

export function MitochondrionWebGLModel({ active }: { active: number | null }) {
  const hostRef = useRef<HTMLDivElement>(null);
  useOrganelleCanvas(hostRef, buildMitochondrion, active, 400, -150);
  return <div ref={hostRef} className="h-full w-full" />;
}

export function ChloroplastWebGLModel({ active }: { active: number | null }) {
  const hostRef = useRef<HTMLDivElement>(null);
  useOrganelleCanvas(hostRef, buildChloroplast, active, 410, -158);
  return <div ref={hostRef} className="h-full w-full" />;
}
