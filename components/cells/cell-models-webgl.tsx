'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { basicMat, groupOf, toonMat, useOrganelleCanvas, type Group, type Vec3 } from '@/components/cells/three-shared';

let gradTex: THREE.DataTexture | null = null;
function getGradient() {
  if (!gradTex) {
    gradTex = new THREE.DataTexture(new Uint8Array([110, 170, 215, 255]), 4, 1, THREE.RedFormat);
    gradTex.minFilter = THREE.NearestFilter;
    gradTex.magFilter = THREE.NearestFilter;
    gradTex.needsUpdate = true;
  }
  return gradTex;
}

/** 半透明膜壳（卡通细胞常用：直接看见内部） */
function translucentShell(
  groups: Record<number, Group>,
  idx: number,
  geo: THREE.BufferGeometry,
  color: string,
  opacity: number,
): THREE.Mesh {
  const mat = new THREE.MeshToonMaterial({
    color,
    gradientMap: getGradient(),
    transparent: true,
    opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  groupOf(groups, idx, mat, opacity);
  return new THREE.Mesh(geo, mat);
}

/* ================= 动物细胞 ================= */
/* parts: 0 细胞膜 1 细胞质 2 细胞核 3 线粒体 4 核糖体 5 内质网 6 高尔基体 7 中心体 8 溶酶体 */

function buildAnimalCell(groups: Record<number, Group>): THREE.Group {
  const root = new THREE.Group();

  // 细胞质内壁（浅色背景）
  const cyto = basicMat(groups, 1, '#eef6ea');
  const cytoWall = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), cyto);
  cytoWall.scale.set(158, 132, 142);
  root.add(cytoWall);

  // 细胞核 + 核仁
  const nucleus = new THREE.Mesh(new THREE.SphereGeometry(52, 32, 24), toonMat(groups, 2, '#b48ad0'));
  nucleus.position.set(-62, 20, 0);
  root.add(nucleus);
  const nucleolus = new THREE.Mesh(new THREE.SphereGeometry(16, 16, 12), toonMat(groups, 2, '#8a5a9f'));
  nucleolus.position.set(-70, 30, 8);
  root.add(nucleolus);

  // 线粒体 ×3（胶囊）
  const mitoGeo = new THREE.CapsuleGeometry(15, 26, 8, 18);
  const mitoMat = toonMat(groups, 3, '#f0a06a');
  ([[-58, -62, 40, 0.5], [66, 44, -30, -0.4], [10, -78, -20, 0.2]] as const).forEach(([x, y, z, rot]) => {
    const mesh = new THREE.Mesh(mitoGeo, mitoMat);
    mesh.position.set(x, y, z);
    mesh.rotation.z = rot;
    root.add(mesh);
  });

  // 内质网（弯曲管）
  const erCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(20, 60, 30), new THREE.Vector3(55, 48, 20), new THREE.Vector3(72, 18, 6),
    new THREE.Vector3(60, -12, 20), new THREE.Vector3(30, -26, 34),
  ]);
  root.add(new THREE.Mesh(new THREE.TubeGeometry(erCurve, 48, 7, 10, false), toonMat(groups, 5, '#8fb8d4')));

  // 高尔基体（扁囊堆）
  for (let i = 0; i < 4; i += 1) {
    const cisterna = new THREE.Mesh(new THREE.SphereGeometry(20 - i * 1.5, 20, 12), toonMat(groups, 6, '#e0b06a'));
    cisterna.scale.set(1, 0.22, 0.8);
    cisterna.position.set(-40 - i * 2, -52 + i * 9, -30);
    cisterna.rotation.z = 0.25;
    root.add(cisterna);
  }

  // 中心体（两个垂直短柱）
  const centroMat = toonMat(groups, 7, '#6a8fa8');
  const c1 = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 18, 12), centroMat);
  c1.position.set(20, 76, -34);
  const c2 = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 18, 12), centroMat);
  c2.position.set(34, 76, -34);
  c2.rotation.x = Math.PI / 2;
  root.add(c1, c2);

  // 溶酶体
  ([[-6, 82, 30], [96, -30, 26]] as const).forEach(([x, y, z]) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(11, 16, 12), toonMat(groups, 8, '#e07a7a'));
    mesh.position.set(x, y, z);
    root.add(mesh);
  });

  // 核糖体散点
  const riboPts: Vec3[] = [
    [40, 20, 50], [-20, 40, 46], [70, 0, 10], [0, -30, 55], [-50, -40, 20],
    [60, -55, -10], [-80, 0, -20], [24, 66, -12], [-30, -8, -46], [80, 30, -40],
  ];
  riboPts.forEach((p) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(3, 10, 8), toonMat(groups, 4, '#5d8a94'));
    mesh.position.set(...p);
    root.add(mesh);
  });

  // 细胞膜（半透外壳，罩住全部）
  const membraneGeo = new THREE.SphereGeometry(1, 64, 48);
  const membrane = translucentShell(groups, 0, membraneGeo, '#8fc0ae', 0.32);
  membrane.scale.set(178, 150, 162);
  root.add(membrane);

  return root;
}

/* ================= 植物细胞 ================= */
/* parts: 0 细胞壁 1 细胞膜 2 细胞质 3 细胞核 4 叶绿体 5 大液泡 6 线粒体 */

function buildPlantCell(groups: Record<number, Group>): THREE.Group {
  const root = new THREE.Group();

  // 细胞质内壁
  const cyto = basicMat(groups, 2, '#e9f2e0');
  const cytoWall = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32), cyto);
  cytoWall.scale.set(150, 124, 134);
  root.add(cytoWall);

  // 大液泡（偏心半透大球）
  const vacuole = translucentShell(groups, 5, new THREE.SphereGeometry(1, 40, 28), '#9fd0e0', 0.4);
  vacuole.scale.set(88, 74, 80);
  vacuole.position.set(40, -8, 10);
  root.add(vacuole);

  // 细胞核 + 核仁
  const nucleus = new THREE.Mesh(new THREE.SphereGeometry(44, 32, 24), toonMat(groups, 3, '#b48ad0'));
  nucleus.position.set(-72, 30, 6);
  root.add(nucleus);
  const nucleolus = new THREE.Mesh(new THREE.SphereGeometry(14, 16, 12), toonMat(groups, 3, '#8a5a9f'));
  nucleolus.position.set(-80, 40, 12);
  root.add(nucleolus);

  // 叶绿体 ×5（扁椭球）
  const chloroGeo = new THREE.SphereGeometry(20, 20, 14);
  const chloroMat = toonMat(groups, 4, '#4caf50');
  ([[-120, 44, 30, 0.3], [-58, -74, -24, -0.2], [16, 58, 34, 0.5], [98, -52, 28, -0.35], [66, 66, -30, 0.15]] as const).forEach(
    ([x, y, z, rot]) => {
      const mesh = new THREE.Mesh(chloroGeo, chloroMat);
      mesh.scale.set(1.15, 0.62, 0.8);
      mesh.position.set(x, y, z);
      mesh.rotation.z = rot;
      root.add(mesh);
    },
  );

  // 线粒体 ×2
  const mitoGeo = new THREE.CapsuleGeometry(12, 22, 8, 16);
  const mitoMat = toonMat(groups, 6, '#f0a06a');
  ([[-30, 82, -30, 0.3], [122, 40, 20, -0.5]] as const).forEach(([x, y, z, rot]) => {
    const mesh = new THREE.Mesh(mitoGeo, mitoMat);
    mesh.position.set(x, y, z);
    mesh.rotation.z = rot;
    root.add(mesh);
  });

  // 细胞膜（半透）
  const membrane = translucentShell(groups, 1, new THREE.SphereGeometry(1, 64, 48), '#8fc0ae', 0.3);
  membrane.scale.set(162, 136, 146);
  root.add(membrane);

  // 细胞壁（厚实半透绿壳）
  const wall = translucentShell(groups, 0, new THREE.SphereGeometry(1, 64, 48), '#57a05e', 0.5);
  wall.scale.set(178, 150, 162);
  root.add(wall);

  return root;
}

/* ================= 大肠杆菌 ================= */
/* parts: 0 鞭毛 1 菌毛 2 荚膜 3 细胞壁 4 细胞膜 5 拟核 6 质粒 7 核糖体 */

function buildEColi(groups: Record<number, Group>): THREE.Group {
  const root = new THREE.Group();
  const R = 62; // 菌体半径（截面）
  const L = 150; // 半长

  // 细胞质内壁
  const cyto = basicMat(groups, 4, '#e6f2e6');
  const cytoWall = new THREE.Mesh(new THREE.CapsuleGeometry(R * 0.88, L * 1.55, 12, 24), cyto);
  cytoWall.rotation.z = Math.PI / 2;
  root.add(cytoWall);

  // 拟核（紫红环管缠绕）
  const nucleoidMat = toonMat(groups, 5, '#b45a9f');
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(52, 6.5, 110, 12, 2, 3), nucleoidMat);
  knot.rotation.y = Math.PI / 2;
  root.add(knot);

  // 质粒 ×3
  ([[30, 55, 40], [-44, -30, 52], [12, -60, -38]] as const).forEach(([x, y, z], i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(11, 2.6, 8, 26), toonMat(groups, 6, '#ff9f43'));
    ring.position.set(x, y, z);
    ring.rotation.set(0.5 + i, 0.4 * i, 0.2);
    root.add(ring);
  });

  // 核糖体散点
  const riboPts: Vec3[] = [
    [80, 28, 30], [-70, 40, -30], [0, 45, -50], [-20, -48, 40], [55, -35, -35],
    [-55, -18, -48], [95, -8, -12], [-98, 8, 10], [40, 10, 58], [-36, 22, -55],
  ];
  riboPts.forEach((p) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(4, 10, 8), toonMat(groups, 7, '#4d8a70'));
    mesh.position.set(...p);
    root.add(mesh);
  });

  // 细胞膜 + 细胞壁（两层半透胶囊壳）
  const membrane = translucentShell(groups, 4, new THREE.CapsuleGeometry(R * 0.96, L * 1.7, 12, 28), '#8fc0ae', 0.28);
  membrane.rotation.z = Math.PI / 2;
  root.add(membrane);
  const wall = translucentShell(groups, 3, new THREE.CapsuleGeometry(R, L * 1.78, 12, 28), '#6aa86a', 0.34);
  wall.rotation.z = Math.PI / 2;
  root.add(wall);

  // 荚膜（最外淡壳）
  const capsule = translucentShell(groups, 2, new THREE.CapsuleGeometry(R * 1.16, L * 2.0, 12, 28), '#c9d8d4', 0.22);
  capsule.rotation.z = Math.PI / 2;
  root.add(capsule);

  // 菌毛（细短管，散布两侧）
  const piliMat = toonMat(groups, 1, '#9fb8bd');
  for (let i = 0; i < 8; i += 1) {
    const side = i % 2 === 0 ? 1 : -1;
    const t = 0.25 + (i / 8) * 0.5;
    const x = -L * 0.8 + t * L * 1.6;
    const pili = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 34, 6), piliMat);
    pili.position.set(x, side * (R + 12), side * 22);
    pili.rotation.x = side * 1.2;
    root.add(pili);
  }

  // 鞭毛（一端正弦长管 ×4）
  const flagellaMat = toonMat(groups, 0, '#4d8a70');
  for (let i = 0; i < 4; i += 1) {
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k <= 30; k += 1) {
      const t = k / 30;
      pts.push(
        new THREE.Vector3(
          L * 1.05 + t * 150,
          Math.sin(t * Math.PI * 3 + i * 1.6) * 20 + (i - 1.5) * 16,
          Math.cos(t * Math.PI * 2.4 + i) * 18,
        ),
      );
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    root.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 60, 2.4, 8, false), flagellaMat));
  }

  return root;
}

/* ================= 草履虫 ================= */
/* parts: 0 纤毛 1 表膜 2 口沟 3 胞口 4 食物泡 5 伸缩泡+收集管 6 大核 7 小核 8 胞肛 */

function buildParamecium(groups: Record<number, Group>): THREE.Group {
  const root = new THREE.Group();
  const A = 190;
  const B = 112;
  const C = 100;

  // 表膜（半透）：内部器官直接可见
  const pellicle = translucentShell(groups, 1, new THREE.SphereGeometry(1, 64, 44), '#a9c4dd', 0.34);
  pellicle.scale.set(A, B, C);
  root.add(pellicle);

  // 口沟：从右前端弯向中心的凹槽管
  const grooveCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(A * 0.92, B * 0.36, C * 0.42),
    new THREE.Vector3(A * 0.6, B * 0.1, C * 0.5),
    new THREE.Vector3(A * 0.28, -B * 0.12, C * 0.44),
  ]);
  const groove = new THREE.Mesh(new THREE.TubeGeometry(grooveCurve, 40, 9, 12, false), toonMat(groups, 2, '#7ba3c4'));
  root.add(groove);

  // 胞口（口沟末端）
  const cytostome = new THREE.Mesh(new THREE.SphereGeometry(9, 14, 10), toonMat(groups, 3, '#5b7f9e'));
  cytostome.position.set(A * 0.26, -B * 0.16, C * 0.42);
  root.add(cytostome);

  // 食物泡 ×3
  ([[-40, -46, 42], [-86, -20, 24], [-16, -64, -20]] as const).forEach(([x, y, z], i) => {
    const vac = new THREE.Mesh(new THREE.SphereGeometry(13 - i * 1.6, 16, 12), toonMat(groups, 4, '#f0c982'));
    vac.position.set(x, y, z);
    root.add(vac);
  });

  // 伸缩泡 ×2（前后各一，带放射状收集管）
  ([[A * -0.55, B * 0.5, -C * 0.3], [A * 0.5, -B * 0.5, -C * 0.35]] as const).forEach(([x, y, z]) => {
    const vac = new THREE.Mesh(new THREE.SphereGeometry(17, 18, 14), toonMat(groups, 5, '#bcd8ec'));
    vac.position.set(x, y, z);
    root.add(vac);
    for (let k = 0; k < 5; k += 1) {
      const th = (k / 5) * Math.PI * 2;
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 16, 6), toonMat(groups, 5, '#9fc0d8'));
      tube.position.set(x + Math.cos(th) * 22, y + Math.sin(th) * 16, z);
      tube.rotation.z = Math.PI / 2 - th;
      root.add(tube);
    }
  });

  // 大核（椭球）+ 小核
  const macro = new THREE.Mesh(new THREE.SphereGeometry(30, 22, 16), toonMat(groups, 6, '#a97fb5'));
  macro.scale.set(1.4, 0.85, 0.9);
  macro.position.set(20, 22, -24);
  macro.rotation.z = -0.3;
  root.add(macro);
  const micro = new THREE.Mesh(new THREE.SphereGeometry(9, 14, 10), toonMat(groups, 7, '#7a5a92'));
  micro.position.set(-26, 34, -20);
  root.add(micro);

  // 胞肛（后端一侧小凹点）
  const cytopyge = new THREE.Mesh(new THREE.SphereGeometry(6, 10, 8), toonMat(groups, 8, '#5b7f9e'));
  cytopyge.position.set(-A * 0.88, -B * 0.2, 0);
  root.add(cytopyge);

  // 纤毛：表面法向短管（InstancedMesh）
  const cilia = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(1.1, 0.6, 16, 5),
    toonMat(groups, 0, '#5b7f9e'),
    96,
  );
  const up = new THREE.Vector3(0, 1, 0);
  const q = new THREE.Quaternion();
  const m = new THREE.Matrix4();
  let n = 0;
  for (let i = 0; i < 300 && n < 96; i += 1) {
    const lon = (i * 2.399963) % (Math.PI * 2);
    const lat = Math.asin(((i * 0.618033) % 1) * 1.7 - 0.85);
    const p: Vec3 = [
      A * Math.cos(lat) * Math.cos(lon),
      B * Math.sin(lat),
      C * Math.cos(lat) * Math.sin(lon),
    ];
    const normal = new THREE.Vector3(p[0] / (A * A), p[1] / (B * B), p[2] / (C * C)).normalize();
    q.setFromUnitVectors(up, normal);
    m.compose(new THREE.Vector3(...p), q, new THREE.Vector3(1, 1, 1));
    cilia.setMatrixAt(n, m);
    n += 1;
  }
  cilia.count = n;
  root.add(cilia);

  return root;
}

/* ================= 保卫细胞与气孔 ================= */
/* parts: 0 保卫细胞 1 气孔 2 内壁增厚 3 叶绿体 4 表皮细胞 */

function buildStoma(groups: Record<number, Group>): { root: THREE.Group; setOpen: (open: boolean) => void } {
  const root = new THREE.Group();
  // 俯视视角：气孔器是从叶片表面观察的
  root.rotation.x = -1.2;

  // 两侧表皮细胞板
  const epidermisMat = toonMat(groups, 4, '#cfe0c6');
  ([[-268, 0, 0], [268, 0, 0]] as const).forEach(([x]) => {
    const slab = new THREE.Mesh(new THREE.BoxGeometry(180, 18, 350), epidermisMat);
    slab.position.set(x, 0, 0);
    root.add(slab);
  });

  // 半椭圆弯月曲线：flip=-1 左细胞（鼓向左），flip=+1 右细胞
  const RX = 30;   // 弯月横向鼓出（小鼓出 = 细长肾形）
  const RY = 160;  // 细胞长度的一半
  const TUBE_R = 25;
  const kidneyArc = (flip: 1 | -1): THREE.Vector3[] => {
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k <= 18; k += 1) {
      const th = -Math.PI / 2 + (k / 18) * Math.PI;
      pts.push(new THREE.Vector3(flip * Math.cos(th) * RX, Math.sin(th) * RY, 0));
    }
    return pts;
  };

  // 一对保卫细胞（弯月香肠管 + 端部圆头）
  const buildGuardCell = (flip: 1 | -1, groupName: string): THREE.Group => {
    const cell = new THREE.Group();
    const curve = new THREE.CatmullRomCurve3(kidneyArc(flip));
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, TUBE_R, 14, false), toonMat(groups, 0, '#6faf58', 0.9));
    cell.add(tube);
    // 端部圆头
    ([kidneyArc(flip)[0], kidneyArc(flip)[18]] as const).forEach((tip) => {
      const cap = new THREE.Mesh(new THREE.SphereGeometry(TUBE_R, 18, 14), toonMat(groups, 0, '#6faf58', 0.94));
      cap.position.copy(tip);
      cell.add(cap);
    });
    // 孔缘内壁增厚：靠气孔一侧的深色细管
    const thickArc = kidneyArc(flip).map((p) => new THREE.Vector3(p.x - flip * TUBE_R * 0.55, p.y, 0));
    const thick = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(thickArc), 48, 10, 10, false),
      toonMat(groups, 2, '#2f6b42'),
    );
    cell.add(thick);
    // 叶绿体（沿外侧嵌 4 颗）
    const chloroMat = toonMat(groups, 3, '#2f9d5e');
    for (let k = 0; k < 4; k += 1) {
      const th = -Math.PI / 2 + (0.18 + k * 0.21) * Math.PI;
      const chloro = new THREE.Mesh(new THREE.SphereGeometry(9, 14, 10), chloroMat);
      chloro.scale.set(1.35, 0.8, 0.9);
      chloro.position.set(flip * (Math.cos(th) * (RX + TUBE_R * 0.35)), Math.sin(th) * (RY * 0.86), TUBE_R * 0.3);
      cell.add(chloro);
    }
    // 细胞核
    const nucleus = new THREE.Mesh(new THREE.SphereGeometry(13, 16, 12), toonMat(groups, 0, '#b48ad0'));
    nucleus.position.set(flip * (RX + 8), 0, TUBE_R * 0.25);
    cell.add(nucleus);
    cell.name = groupName;
    return cell;
  };

  const leftGroup = buildGuardCell(-1, 'left');
  const rightGroup = buildGuardCell(1, 'right');
  root.add(leftGroup, rightGroup);

  // 气孔缝指示（高亮"气孔"时出现的光带）
  const slitMat = new THREE.MeshBasicMaterial({ color: '#fffbe8', transparent: true, opacity: 0, depthWrite: false });
  groupOf(groups, 1, slitMat, 0);
  const slit = new THREE.Mesh(new THREE.BoxGeometry(22, 250, 22), slitMat);
  root.add(slit);

  // 开合动画：张开 = 两瓣左右分开；闭合 = 凹面几乎相贴
  const setOpen = (open: boolean) => {
    leftGroup.position.x = open ? -12 : 16;
    rightGroup.position.x = open ? 12 : -16;
    leftGroup.rotation.z = open ? 0 : -0.06;
    rightGroup.rotation.z = open ? 0 : 0.06;
    slit.scale.x = open ? 1 : 0.25;
  };
  setOpen(true);

  return { root, setOpen };
}

/* ================= 查看器组件 ================= */

export function AnimalCellWebGLModel({ active }: { active: number | null }) {
  const hostRef = useRef<HTMLDivElement>(null);
  useOrganelleCanvas(hostRef, buildAnimalCell, active, 470, -180);
  return <div ref={hostRef} className="h-full w-full" />;
}

export function PlantCellWebGLModel({ active }: { active: number | null }) {
  const hostRef = useRef<HTMLDivElement>(null);
  useOrganelleCanvas(hostRef, buildPlantCell, active, 470, -180);
  return <div ref={hostRef} className="h-full w-full" />;
}

export function EColiWebGLModel({ active }: { active: number | null }) {
  const hostRef = useRef<HTMLDivElement>(null);
  useOrganelleCanvas(hostRef, buildEColi, active, 520, -170);
  return <div ref={hostRef} className="h-full w-full" />;
}

export function ParameciumWebGLModel({ active }: { active: number | null }) {
  const hostRef = useRef<HTMLDivElement>(null);
  useOrganelleCanvas(hostRef, buildParamecium, active, 460, -160);
  return <div ref={hostRef} className="h-full w-full" />;
}

export function StomaWebGLModel({ active, open = true }: { active: number | null; open?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const setOpenRef = useRef<((open: boolean) => void) | null>(null);
  // 俯视相机：气孔器是从叶片表面观察的
  useOrganelleCanvas(
    hostRef,
    (groups) => {
      const built = buildStoma(groups);
      setOpenRef.current = built.setOpen;
      return built.root;
    },
    active,
    380,
    -150,
    [0, 330, 430],
  );

  const openRef = useRef(open);
  openRef.current = open;
  useEffect(() => {
    setOpenRef.current?.(open);
  }, [open]);
  return <div ref={hostRef} className="h-full w-full" />;
}
