'use client';

import { useEffect, useRef } from 'react';
import { Expand, MousePointerClick, Network, ZoomIn, ZoomOut } from 'lucide-react';

import {
  BOOK_COLORS,
  BOOK_LABELS,
  KNOWLEDGE_GRAPH,
  KNOWLEDGE_LINK_COUNT,
  KNOWLEDGE_NODE_COUNT,
  type GraphNode,
} from '@/lib/knowledge-graph';

type SimNode = GraphNode & {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  fixed?: boolean;
};

const RADII: Record<string, number> = {
  root: 30,
  book: 21,
  module: 13,
  experiment: 7,
  atlasHub: 25,
  atlasCategory: 10,
};

const LINK_LENGTH: Record<string, number> = {
  'root-book': 175,
  'book-module': 118,
  'module-experiment': 60,
  'root-atlasHub': 205,
  'atlasHub-atlasCategory': 64,
};

function linkKey(a: string, b: string) {
  const pair = [a, b].sort().join('-');
  return pair;
}

function nodeColor(n: GraphNode) {
  if (n.type === 'root') return '#0e6f75';
  if (n.type === 'atlasHub') return '#13333a';
  if (n.book && BOOK_COLORS[n.book]) return BOOK_COLORS[n.book];
  return '#59767c';
}

function nodeFill(n: GraphNode) {
  if (n.type === 'experiment') return '#ffffff';
  if (n.type === 'atlasCategory') return '#fdf1cf';
  return nodeColor(n);
}

/**
 * learn-anything 风格可交互知识图谱：
 * 力导向布局（手写物理模拟），节点可拖拽、滚轮缩放、悬停高亮关联；
 * 点实验节点跳互动实验、点图鉴分类跳图鉴对应档案夹。
 */
export function GraphClient({ useHash = false }: { useHash?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const resetRef = useRef<(() => void) | null>(null);
  const zoomRef = useRef<((factor: number) => void) | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    if (!wrap || !svg) return;

    const width = Math.max(560, wrap.clientWidth);
    const height = width < 640 ? 460 : 620;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const NS = 'http://www.w3.org/2000/svg';
    const cx = width / 2;
    const cy = height / 2;

    // ---------- 初始化节点位置：层级螺旋撒点，避免重叠炸开 ----------
    const nodes: SimNode[] = KNOWLEDGE_GRAPH.nodes.map((n, i) => {
      const ring: Record<string, number> = {
        root: 0,
        book: 120,
        atlasHub: 150,
        module: 230,
        atlasCategory: 235,
        experiment: 330,
      };
      const rr = ring[n.type] ?? 300;
      const ang = (i * 2.399) % (Math.PI * 2); // 黄金角散点
      return {
        ...n,
        x: cx + Math.cos(ang) * rr * (0.75 + Math.random() * 0.5),
        y: cy + Math.sin(ang) * rr * (0.55 + Math.random() * 0.4),
        vx: 0,
        vy: 0,
        r: RADII[n.type] ?? 8,
      };
    });
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const links = KNOWLEDGE_GRAPH.links
      .map((l) => ({ source: byId.get(l.source)!, target: byId.get(l.target)! }))
      .filter((l) => l.source && l.target);

    // 邻接表（悬停高亮用）
    const neighbors = new Map<string, Set<string>>();
    for (const l of links) {
      if (!neighbors.has(l.source.id)) neighbors.set(l.source.id, new Set());
      if (!neighbors.has(l.target.id)) neighbors.set(l.target.id, new Set());
      neighbors.get(l.source.id)!.add(l.target.id);
      neighbors.get(l.target.id)!.add(l.source.id);
    }

    // ---------- 构建 SVG ----------
    svg.innerHTML = '';
    const viewport = document.createElementNS(NS, 'g');
    svg.appendChild(viewport);

    const linkEls: SVGLineElement[] = links.map((l) => {
      const el = document.createElementNS(NS, 'line');
      el.setAttribute('stroke', '#9db8bc');
      el.setAttribute('stroke-width', l.target.type === 'experiment' || l.target.type === 'atlasCategory' ? '1.1' : '2');
      el.setAttribute('stroke-opacity', '0.55');
      viewport.appendChild(el);
      return el;
    });

    const nodeEls: SVGGElement[] = nodes.map((n) => {
      const g = document.createElementNS(NS, 'g');
      g.style.cursor = n.href ? 'pointer' : 'grab';
      g.dataset.id = n.id;

      const halo = document.createElementNS(NS, 'circle');
      halo.setAttribute('r', String(n.r + 5));
      halo.setAttribute('fill', 'transparent');
      halo.setAttribute('stroke', nodeColor(n));
      halo.setAttribute('stroke-width', '0');
      g.appendChild(halo);

      const circle = document.createElementNS(NS, 'circle');
      circle.setAttribute('r', String(n.r));
      circle.setAttribute('fill', nodeFill(n));
      circle.setAttribute('stroke', nodeColor(n));
      circle.setAttribute('stroke-width', n.type === 'root' || n.type === 'book' || n.type === 'atlasHub' ? '3' : '2.2');
      g.appendChild(circle);

      if (n.type === 'root' || n.type === 'atlasHub') {
        const t = document.createElementNS(NS, 'text');
        t.setAttribute('text-anchor', 'middle');
        t.setAttribute('dominant-baseline', 'central');
        t.setAttribute('font-size', n.type === 'root' ? '15' : '13');
        t.setAttribute('font-weight', '700');
        t.setAttribute('fill', '#ffffff');
        t.setAttribute('pointer-events', 'none');
        t.textContent = n.label;
        g.appendChild(t);
      }

      // 外部标签：根节点无（圆内已有）；书节点双行（书名 + 册别）；其余单行
      if (n.type !== 'root') {
        const label = document.createElementNS(NS, 'text');
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('y', String(n.r + 14));
        label.setAttribute('font-size', n.type === 'module' ? '11.5' : n.type === 'atlasCategory' ? '10.5' : n.type === 'book' ? '12' : '9.5');
        label.setAttribute('font-weight', n.type === 'module' || n.type === 'atlasCategory' || n.type === 'book' ? '700' : '400');
        label.setAttribute('fill', n.type === 'module' || n.type === 'atlasCategory' || n.type === 'book' ? '#13333a' : '#49676d');
        label.setAttribute('pointer-events', 'none');
        label.textContent = n.label;
        g.appendChild(label);
        if (n.sub) {
          const sub = document.createElementNS(NS, 'text');
          sub.setAttribute('text-anchor', 'middle');
          sub.setAttribute('y', String(n.r + 28));
          sub.setAttribute('font-size', '10');
          sub.setAttribute('fill', '#799398');
          sub.setAttribute('pointer-events', 'none');
          sub.textContent = n.sub;
          g.appendChild(sub);
        }
      }

      viewport.appendChild(g);
      return g;
    });

    // ---------- 物理模拟 ----------
    let alpha = 1;
    let raf = 0;
    const hot = () => {
      alpha = Math.max(alpha, 0.55);
      if (!raf) loop();
    };

    const tick = () => {
      // 斥力（O(n²)，节点规模 ~90 完全可承受）
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let d2 = dx * dx + dy * dy;
          if (d2 < 1) {
            dx = Math.random() - 0.5;
            dy = Math.random() - 0.5;
            d2 = dx * dx + dy * dy + 0.01;
          }
          const minD = a.r + b.r + 12;
          if (d2 < minD * minD * 9) {
            const d = Math.sqrt(d2);
            const f = Math.min(6500 / d2, 90) + (d < minD ? (minD - d) * 0.6 : 0);
            const fx = (dx / d) * f;
            const fy = (dy / d) * f;
            a.vx += fx;
            a.vy += fy;
            b.vx -= fx;
            b.vy -= fy;
          }
        }
      }
      // 弹簧
      for (const l of links) {
        const dx = l.target.x - l.source.x;
        const dy = l.target.y - l.source.y;
        const d = Math.max(Math.sqrt(dx * dx + dy * dy), 0.01);
        const want = LINK_LENGTH[linkKey(l.source.type, l.target.type)] ?? 60;
        const f = (d - want) * 0.028;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        l.source.vx += fx;
        l.source.vy += fy;
        l.target.vx -= fx;
        l.target.vy -= fy;
      }
      // 向心 + 阻尼 + 积分
      for (const n of nodes) {
        n.vx += (cx - n.x) * (n.type === 'root' ? 0.06 : 0.0035);
        n.vy += (cy - n.y) * (n.type === 'root' ? 0.06 : 0.0035);
        if (!n.fixed) {
          n.vx *= 0.88;
          n.vy *= 0.88;
          n.x += Math.max(-10, Math.min(10, n.vx)) * alpha;
          n.y += Math.max(-10, Math.min(10, n.vy)) * alpha;
        } else {
          n.vx = 0;
          n.vy = 0;
        }
      }
      // 根节点锁中心
      const root = nodes.find((n) => n.type === 'root');
      if (root && !root.fixed) {
        root.x += (cx - root.x) * 0.2;
        root.y += (cy - root.y) * 0.2;
      }
    };

    const paint = () => {
      links.forEach((l, i) => {
        linkEls[i].setAttribute('x1', String(l.source.x));
        linkEls[i].setAttribute('y1', String(l.source.y));
        linkEls[i].setAttribute('x2', String(l.target.x));
        linkEls[i].setAttribute('y2', String(l.target.y));
      });
      nodes.forEach((n, i) => {
        nodeEls[i].setAttribute('transform', `translate(${n.x} ${n.y})`);
      });
    };

    const loop = () => {
      tick();
      alpha *= 0.992;
      paint();
      if (alpha > 0.02) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    // ---------- 视图变换（缩放 / 平移） ----------
    let view = { k: 1, tx: 0, ty: 0 };
    const applyView = () => {
      viewport.setAttribute('transform', `translate(${view.tx} ${view.ty}) scale(${view.k})`);
    };
    const zoomAt = (factor: number, px: number, py: number) => {
      const k2 = Math.max(0.45, Math.min(4, view.k * factor));
      const ratio = k2 / view.k;
      view.tx = px - (px - view.tx) * ratio;
      view.ty = py - (py - view.ty) * ratio;
      view.k = k2;
      applyView();
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * 0.0012), e.clientX - rect.left, e.clientY - rect.top);
    };
    svg.addEventListener('wheel', onWheel, { passive: false });

    const resetView = () => {
      view = { k: 1, tx: 0, ty: 0 };
      applyView();
    };
    const zoomButton = (factor: number) => zoomAt(factor, width / 2, height / 2);
    resetRef.current = resetView;
    zoomRef.current = zoomButton;

    // ---------- 交互：拖节点 / 拖画布 / 点节点跳转 ----------
    let dragNode: SimNode | null = null;
    let panning = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;
    let downNodeId: string | null = null;

    const toLocal = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      // viewBox 宽度与 CSS 宽度一致（viewBox 按容器宽生成），纵向按比例
      const sx = width / rect.width;
      const sy = height / rect.height;
      return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy };
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Element;
      const g = target.closest('g[data-id]') as SVGGElement | null;
      const p = toLocal(e);
      moved = 0;
      lastX = p.x;
      lastY = p.y;
      downNodeId = g?.dataset.id ?? null;
      if (g) {
        const n = byId.get(g.dataset.id!);
        if (n) {
          dragNode = n;
          n.fixed = true;
          svg.style.cursor = 'grabbing';
        }
      } else {
        panning = true;
        svg.style.cursor = 'grabbing';
      }
      svg.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      const p = toLocal(e);
      if (dragNode) {
        moved += Math.abs(p.x - lastX) + Math.abs(p.y - lastY);
        dragNode.x = p.x;
        dragNode.y = p.y;
        hot();
        paint();
      } else if (panning) {
        moved += Math.abs(p.x - lastX) + Math.abs(p.y - lastY);
        view.tx += p.x - lastX;
        view.ty += p.y - lastY;
        applyView();
      }
      lastX = p.x;
      lastY = p.y;
    };
    const onPointerUp = () => {
      if (dragNode) {
        dragNode.fixed = false;
        dragNode = null;
        hot();
      }
      panning = false;
      svg.style.cursor = '';
    };
    svg.addEventListener('pointerdown', onPointerDown);
    svg.addEventListener('pointermove', onPointerMove);
    svg.addEventListener('pointerup', onPointerUp);
    svg.addEventListener('pointerleave', onPointerUp);

    const onClick = (e: MouseEvent) => {
      const id = (e.target as Element).closest('g[data-id]')?.getAttribute('data-id') ?? (moved <= 6 ? downNodeId : null);
      downNodeId = null;
      if (!id || moved > 6) return; // 拖拽不算点击
      const n = byId.get(id);
      if (!n?.href) return;
      window.location.href = useHash ? `#${n.href}` : n.href;
    };
    svg.addEventListener('click', onClick);

    // ---------- 悬停高亮 ----------
    const onOver = (e: MouseEvent) => {
      const g = (e.target as Element).closest('g[data-id]') as SVGGElement | null;
      if (!g) return;
      const id = g.dataset.id!;
      const near = neighbors.get(id) ?? new Set<string>();
      near.add(id);
      nodes.forEach((n, i) => {
        const on = near.has(n.id);
        nodeEls[i].style.opacity = on ? '1' : '0.14';
      });
      links.forEach((l, i) => {
        const on = near.has(l.source.id) && near.has(l.target.id);
        linkEls[i].setAttribute('stroke-opacity', on ? '0.95' : '0.06');
        linkEls[i].setAttribute('stroke', on ? '#13333a' : '#9db8bc');
      });
    };
    const onOut = () => {
      nodes.forEach((_, i) => {
        nodeEls[i].style.opacity = '1';
      });
      links.forEach((_, i) => {
        linkEls[i].setAttribute('stroke-opacity', '0.55');
        linkEls[i].setAttribute('stroke', '#9db8bc');
      });
    };
    svg.addEventListener('mouseover', onOver);
    svg.addEventListener('mouseout', onOut);

    // ---------- 启动 ----------
    paint();
    loop();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      svg.removeEventListener('wheel', onWheel);
      svg.removeEventListener('pointerdown', onPointerDown);
      svg.removeEventListener('pointermove', onPointerMove);
      svg.removeEventListener('pointerup', onPointerUp);
      svg.removeEventListener('pointerleave', onPointerUp);
      svg.removeEventListener('click', onClick);
      svg.removeEventListener('mouseover', onOver);
      svg.removeEventListener('mouseout', onOut);
    };
  }, [useHash]);

  const zoomBy = (f: number) => zoomRef.current?.(f);

  return (
    <div>
      {/* Hero */}
      <div className="nb-hero relative mb-6 overflow-hidden px-6 py-7 sm:px-9 sm:py-9">
        <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-12 select-none text-[9rem] leading-none opacity-[0.08]">
          <Network className="size-40" />
        </div>
        <div className="relative">
          <p className="inline-flex items-center gap-2 border-2 border-[#13333a] bg-[#0e6f75] px-2.5 py-1 text-[11px] font-bold tracking-[0.24em] text-white shadow-[3px_3px_0_#13333a]">
            KNOWLEDGE GRAPH · 知识图谱
          </p>
          <h1 className="mt-3 text-2xl font-black tracking-wide text-[#13333a] sm:text-4xl">知识图谱：五册一张网</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#49676d]">
            {KNOWLEDGE_NODE_COUNT} 个知识点、{KNOWLEDGE_LINK_COUNT} 条关联：五册教材 → 模块 → 互动实验，外加图鉴名词档案分支。
            <span className="font-semibold text-[#b57c16]">点实验节点进实验，点档案夹进图鉴</span>
            ；节点可拖拽，滚轮缩放，悬停看关联。
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            {Object.entries(BOOK_LABELS).map(([id, label]) => (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 border-2 border-[#13333a] bg-white px-3 py-1 text-xs font-bold text-[#13333a] shadow-[3px_3px_0_#c6d4d4]"
              >
                <span aria-hidden="true" className="inline-block size-3 rounded-full border-2 border-[#13333a]" style={{ background: BOOK_COLORS[id] ?? '#999' }} />
                {label}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 border-2 border-[#13333a] bg-white px-3 py-1 text-xs font-bold text-[#13333a] shadow-[3px_3px_0_#c6d4d4]">
              <span aria-hidden="true" className="inline-block size-3 rounded-full border-2 border-[#13333a] bg-[#fdf1cf]" />
              图鉴档案夹
            </span>
          </div>
        </div>
      </div>

      {/* 图谱画布 */}
      <div className="relative" ref={wrapRef}>
        <div className="overflow-hidden rounded-xl border-2 border-[#13333a] bg-[#f7fbfa] shadow-[6px_6px_0_#c6d4d4]">
          <svg ref={svgRef} className="block h-[500px] w-full touch-none select-none sm:h-[660px]" role="img" aria-label="生物知识图谱" />
        </div>

        {/* 画布控制按钮 */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
          {[
            { icon: ZoomIn, title: '放大', fn: () => zoomBy(1.3) },
            { icon: ZoomOut, title: '缩小', fn: () => zoomBy(0.75) },
          ].map(({ icon: Icon, title, fn }) => (
            <button
              key={title}
              type="button"
              title={title}
              onClick={fn}
              className="flex size-9 items-center justify-center rounded-lg border-2 border-[#13333a] bg-white text-[#13333a] shadow-[3px_3px_0_#c6d4d4] transition-transform hover:-translate-y-0.5"
            >
              <Icon className="size-4" aria-hidden="true" />
            </button>
          ))}
          <button
            type="button"
            title="复位视图"
            onClick={() => resetRef.current?.()}
            className="flex size-9 items-center justify-center rounded-lg border-2 border-[#13333a] bg-white text-[#13333a] shadow-[3px_3px_0_#c6d4d4] transition-transform hover:-translate-y-0.5"
          >
            <Expand className="size-4" aria-hidden="true" />
          </button>
        </div>

        {/* 操作提示 */}
        <div className="pointer-events-none absolute bottom-3 left-3 hidden items-center gap-2 rounded-lg border-2 border-[#13333a] bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#49676d] shadow-[3px_3px_0_#c6d4d4] sm:flex">
          <MousePointerClick className="size-3.5 text-[#0e6f75]" aria-hidden="true" />
          拖拽移动节点 · 滚轮缩放 · 空白处拖动平移 · 点击叶子节点跳转
        </div>
      </div>

      {/* 底部快捷入口：图鉴档案夹 + 各册实验 */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {KNOWLEDGE_GRAPH.nodes
          .filter((n) => n.type === 'atlasCategory')
          .map((n) => (
            <a
              key={n.id}
              href={useHash ? `#${n.href}` : n.href}
              className="nb-card nb-lift flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#13333a]"
            >
              <span>
                {n.label}
                <span className="ml-2 text-xs font-normal text-[#799398]">{n.weight ?? 0} 张</span>
              </span>
              <span aria-hidden="true" className="text-[#0e6f75]">→</span>
            </a>
          ))}
      </div>
    </div>
  );
}
