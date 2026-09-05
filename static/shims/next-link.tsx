'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';

/**
 * next/link 垫片：把站内绝对路径映射为 hash 路由（#/cells 等），
 * 使单文件静态版在 GitHub Pages 上无需服务端路由。
 */
function mapHref(href: string | undefined): string {
  if (!href) return '#/';
  if (href.startsWith('http') || href.startsWith('#')) return href;
  if (href.startsWith('/teacher')) return '#/';
  if (href.startsWith('/practice')) return `#/practice${href.slice('/practice'.length)}`;
  if (href.startsWith('/cells')) return '#/cells';
  if (href.startsWith('/lab')) return '#/lab';
  return '#/';
}

export function Link({
  href,
  children,
  ...rest
}: { href?: string; children?: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={mapHref(href)} {...rest}>
      {children}
    </a>
  );
}

export default Link;
