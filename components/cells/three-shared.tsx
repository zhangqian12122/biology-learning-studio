'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/** 细胞 3D 模型共享工具：卡通材质 / 高亮分组 / 画布渲染循环 */

export type Vec3 = [number, number, number];

export type Group = { materials: THREE.Material[]; baseOpacity?: number };

let gradientMap: THREE.DataTexture | null = null;
export function getGradientMap() {
  if (!gradientMap) {
    gradientMap = new THREE.DataTexture(new Uint8Array([110, 170, 215, 255]), 4, 1, THREE.RedFormat);
    gradientMap.minFilter = THREE.NearestFilter;
    gradientMap.magFilter = THREE.NearestFilter;
    gradientMap.needsUpdate = true;
  }
  return gradientMap;
}

export function groupOf(groups: Record<number, Group>, idx: number, mat: THREE.Material, baseOpacity?: number) {
  (groups[idx] ??= { materials: [], baseOpacity }).materials.push(mat);
  if (baseOpacity != null && baseOpacity < 1) mat.transparent = true;
  return mat;
}

export function toonMat(
  groups: Record<number, Group>,
  idx: number,
  color: string,
  baseOpacity?: number,
): THREE.MeshToonMaterial {
  const mat = new THREE.MeshToonMaterial({
    color,
    gradientMap: getGradientMap(),
    ...(baseOpacity != null ? { transparent: true, opacity: baseOpacity } : {}),
  });
  (groups[idx] ??= { materials: [], baseOpacity }).materials.push(mat);
  if (baseOpacity != null && baseOpacity < 1) mat.transparent = true;
  return mat;
}

/** 内壁用不受光照影响的平色材质：背光面不会变黑，卡通感更干净 */
export function basicMat(
  groups: Record<number, Group>,
  idx: number,
  color: string,
): THREE.MeshBasicMaterial {
  const mat = new THREE.MeshBasicMaterial({ color, side: THREE.BackSide });
  (groups[idx] ??= { materials: [], baseOpacity: 1 }).materials.push(mat);
  return mat;
}

/** 每帧应用高亮：选中结构发光呼吸，其余淡出 */
export function applyGlow(groups: Record<number, Group>, active: number | null, timeSec: number) {
  for (const [key, group] of Object.entries(groups)) {
    const idx = Number(key);
    const dimmed = active != null && active !== idx;
    const highlighted = active === idx;
    const pulse = highlighted ? 0.5 + 0.5 * Math.sin(timeSec * 5) : 0;
    const base = group.baseOpacity ?? 1;
    for (const mat of group.materials) {
      // transparent 标志变更需要重编译着色器，仅在状态翻转时置 needsUpdate
      const shouldTransparent = dimmed || base < 1;
      if (mat.transparent !== shouldTransparent) {
        mat.transparent = shouldTransparent;
        mat.needsUpdate = true;
      }
      // 平时隐藏（base=0）的指示壳，被选中时点亮为半透明发光带
      mat.opacity = dimmed ? 0.1 : highlighted && base < 1 ? 0.45 + pulse * 0.25 : base;
      mat.depthWrite = !shouldTransparent;
      const std = mat as THREE.MeshToonMaterial;
      if ('emissiveIntensity' in std) std.emissiveIntensity = dimmed ? 0 : 0.03 + pulse * 0.55;
    }
  }
}

/**
 * 画布渲染循环（命令式 three.js）：
 * - OrbitControls 拖拽/缩放，方位角限制在切口朝向 ±70°（转到背面会看不到内部结构）
 * - 空闲时在限定范围内来回摆动
 * - rAF 暂停的嵌入式环境退化为定时器驱动
 */
export function useOrganelleCanvas(
  hostRef: React.RefObject<HTMLDivElement | null>,
  build: (groups: Record<number, Group>) => THREE.Group,
  active: number | null,
  cameraZ: number,
  floorY: number,
  cameraPos?: Vec3,
) {
  const groupsRef = useRef<Record<number, Group>>({});
  const activeRef = useRef<number | null>(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const width = host.clientWidth || 600;
    const height = host.clientHeight || 440;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 1, 2400);
    if (cameraPos) {
      camera.position.set(...cameraPos);
    } else {
      camera.position.set(130, 90, cameraZ);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 1.3));
    const key = new THREE.DirectionalLight(0xffffff, 1.0);
    key.position.set(220, 320, 260);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xffffff, 0.3);
    fill.position.set(-260, -80, -220);
    scene.add(fill);

    const groups: Record<number, Group> = {};
    groupsRef.current = groups;
    const built = build(groups);
    scene.add(built);
    // 调试句柄（临时）
    (window as unknown as Record<string, unknown>).__cell3dScene = scene;
    (window as unknown as Record<string, unknown>).__cell3dRenderer = renderer;
    (window as unknown as Record<string, unknown>).__cell3dCamera = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 200;
    controls.maxDistance = 760;
    controls.minAzimuthAngle = -1.22;
    controls.maxAzimuthAngle = 1.22;
    controls.minPolarAngle = 0.55;
    controls.maxPolarAngle = 2.05;

    // 空闲时在限定范围内来回摆动，展示不同角度
    let interacting = false;
    let lastInteraction = -1e9;
    controls.addEventListener('start', () => {
      interacting = true;
    });
    controls.addEventListener('end', () => {
      interacting = false;
      lastInteraction = performance.now();
    });

    // 渲染循环：rAF 优先；嵌入式环境暂停 rAF 时退化为定时器驱动
    let raf = 0;
    let useInterval = false;
    let interval: ReturnType<typeof setInterval> | null = null;
    let lastFrame = performance.now();
    const frame = () => {
      lastFrame = performance.now();
      applyGlow(groupsRef.current, activeRef.current, lastFrame / 1000);
      if (!interacting && lastFrame - lastInteraction > 2200) {
        // 缓慢摆动：目标方位角 ±60° 正弦往复
        const targetAz = Math.sin(lastFrame / 1000 * 0.4) * 1.05;
        const curAz = Math.atan2(camera.position.x, camera.position.z);
        const rot = (targetAz - curAz) * 0.03;
        const cos = Math.cos(rot);
        const sin = Math.sin(rot);
        const x = camera.position.x * cos + camera.position.z * sin;
        const z = -camera.position.x * sin + camera.position.z * cos;
        camera.position.x = x;
        camera.position.z = z;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    const loop = () => {
      frame();
      if (!useInterval) raf = requestAnimationFrame(loop);
    };
    loop();
    const watchdog = setInterval(() => {
      if (!useInterval && performance.now() - lastFrame > 400) {
        useInterval = true;
        interval = setInterval(frame, 33);
      }
    }, 500);

    return () => {
      cancelAnimationFrame(raf);
      if (interval) clearInterval(interval);
      clearInterval(watchdog);
      controls.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
