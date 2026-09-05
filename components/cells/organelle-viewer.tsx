'use client';

import { Component, Suspense, lazy, useEffect, useState, type ComponentType, type ReactNode } from 'react';

import { Chloroplast3d } from '@/components/cells/chloroplast-3d';
import { Mitochondrion3d } from '@/components/cells/mitochondrion-3d';

export type WebGLModelKind =
  | 'mitochondrion'
  | 'chloroplast'
  | 'animalCell'
  | 'plantCell'
  | 'ecoli'
  | 'paramecium'
  | 'stoma';

type ImplProps = { active: number | null; open?: boolean };

const ImplImpl: Record<WebGLModelKind, ComponentType<ImplProps>> = {
  mitochondrion: lazy(() =>
    import('@/components/cells/organelle-webgl').then((m) => ({ default: m.MitochondrionWebGLModel })),
  ),
  chloroplast: lazy(() =>
    import('@/components/cells/organelle-webgl').then((m) => ({ default: m.ChloroplastWebGLModel })),
  ),
  animalCell: lazy(() =>
    import('@/components/cells/cell-models-webgl').then((m) => ({ default: m.AnimalCellWebGLModel })),
  ),
  plantCell: lazy(() =>
    import('@/components/cells/cell-models-webgl').then((m) => ({ default: m.PlantCellWebGLModel })),
  ),
  ecoli: lazy(() =>
    import('@/components/cells/cell-models-webgl').then((m) => ({ default: m.EColiWebGLModel })),
  ),
  paramecium: lazy(() =>
    import('@/components/cells/cell-models-webgl').then((m) => ({ default: m.ParameciumWebGLModel })),
  ),
  stoma: lazy(() =>
    import('@/components/cells/cell-models-webgl').then((m) => ({ default: m.StomaWebGLModel })),
  ),
};

/** 有 SVG 立体剖面降级版的模型 */
const SvgFallbacks: Partial<Record<WebGLModelKind, ComponentType<ImplProps>>> = {
  mitochondrion: Mitochondrion3d,
  chloroplast: Chloroplast3d,
};

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function LoadingPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p className="animate-pulse text-xs font-medium text-[#67858b]">正在加载 3D 模型…</p>
    </div>
  );
}

function UnavailableNotice() {
  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <p className="text-center text-xs leading-5 text-[#799398]">
        当前环境不支持 3D 渲染，请改用「教学剖面」模式查看结构。
      </p>
    </div>
  );
}

/** WebGL 崩溃或不可用时降级到备用视图。 */
class GLBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * 真 3D（three.js）细胞查看器：
 * 懒加载 WebGL 实现，不支持 WebGL / 渲染崩溃时自动降级（有 SVG 剖面版用剖面版，否则提示）。
 */
export function OrganelleViewer({
  organelle,
  active,
  open = true,
}: {
  organelle: WebGLModelKind;
  active: number | null;
  open?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [glOk, setGlOk] = useState(false);

  useEffect(() => {
    setMounted(true);
    setGlOk(webglAvailable());
  }, []);

  if (!mounted) {
    return <div className="h-full w-full" />;
  }
  if (!glOk) {
    return <UnavailableNotice />;
  }
  const Impl = ImplImpl[organelle];
  const FallbackSvg = SvgFallbacks[organelle];
  const fallback: ReactNode = FallbackSvg ? (
    <FallbackSvg active={active} open={open} />
  ) : (
    <UnavailableNotice />
  );
  return (
    <GLBoundary fallback={fallback}>
      <Suspense fallback={<LoadingPlaceholder />}>
        <Impl active={active} open={open} />
      </Suspense>
    </GLBoundary>
  );
}
