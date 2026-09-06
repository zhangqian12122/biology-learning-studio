import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const root = path.dirname(fileURLToPath(import.meta.url));
const staticRoot = path.resolve(root, 'static');

/**
 * 静态演示版构建（GitHub Pages）：
 * 单页应用 + hash 路由，垫片替换服务端动作与 next/link、next/image。
 */
export default defineConfig({
  root: staticRoot,
  base: '/biology-learning-studio/',
  plugins: [react()],
  css: { postcss: { plugins: [tailwindcss()] } },
  resolve: {
    alias: [
      { find: '@/app/actions', replacement: path.resolve(root, 'static/shims/app-actions.ts') },
      { find: 'next/link', replacement: path.resolve(root, 'static/shims/next-link.tsx') },
      { find: 'next/image', replacement: path.resolve(root, 'static/shims/next-image.tsx') },
      { find: '@', replacement: root },
    ],
  },
  build: {
    outDir: path.resolve(root, 'dist-ghpages'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // three.js 只被懒加载的 WebGL 模型引用，独立成块避免进入首屏
          if (id.includes('node_modules/three')) return 'three';
        },
      },
    },
  },
});
