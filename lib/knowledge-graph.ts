import { experimentMeta, experimentOrder, textbooks } from '@/lib/curriculum';
import { ATLAS_CATEGORIES } from '@/components/cells/specimens';

/**
 * 知识图谱数据层：教材 → 模块 → 实验，外加"图鉴名词档案"分支。
 * 节点颜色按教材册别区分，层级用半径区分；叶子节点带 href 深链。
 */
export type GraphNodeType = 'root' | 'book' | 'module' | 'experiment' | 'atlasHub' | 'atlasCategory';

export type GraphNode = {
  id: string;
  label: string;
  sub?: string;
  type: GraphNodeType;
  /** 归属教材 id（决定配色），图鉴分支为 undefined */
  book?: string;
  /** 叶子节点跳转路径（完整版为 path，静态版由组件转 hash） */
  href?: string;
  /** 节点大小权重（实验数 / 标本数），用于微调半径 */
  weight?: number;
};

export type GraphLink = { source: string; target: string };

/** 五册教材配色（与首页教材卡片一致的教学色系） */
export const BOOK_COLORS: Record<string, string> = {
  molecules: '#2c6e94',
  genetics: '#7a4a8a',
  regulation: '#b5533c',
  ecology: '#3f7f3a',
  technology: '#c98a1d',
};

export const BOOK_LABELS: Record<string, string> = Object.fromEntries(
  textbooks.map((b) => [b.id, `${b.volume}·${b.title}`]),
);

function buildGraph(): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodes: GraphNode[] = [{ id: 'bio', label: '生物', type: 'root' }];
  const links: GraphLink[] = [];

  // 教材 → 模块
  for (const book of textbooks) {
    nodes.push({ id: book.id, label: book.title, sub: book.volume, type: 'book', book: book.id });
    links.push({ source: 'bio', target: book.id });
    book.modules.forEach((moduleName, mi) => {
      nodes.push({
        id: `mod-${book.id}-${mi}`,
        label: moduleName,
        type: 'module',
        book: book.id,
      });
      links.push({ source: book.id, target: `mod-${book.id}-${mi}` });
    });
  }

  // 实验挂在所属模块下
  for (const id of experimentOrder) {
    const meta = experimentMeta[id];
    const bookDef = textbooks.find((b) => b.id === meta.relatedBook);
    const bookModules: readonly string[] = bookDef?.modules ?? [];
    const mi = bookModules.indexOf(meta.relatedModule);
    const parent = mi >= 0 ? `mod-${meta.relatedBook}-${mi}` : meta.relatedBook;
    nodes.push({
      id: `exp-${id}`,
      label: (meta.extension ? '⚡' : '') + meta.title,
      type: 'experiment',
      book: meta.relatedBook,
      href: `/lab?exp=${id}`,
    });
    links.push({ source: parent, target: `exp-${id}` });
  }

  // 图鉴分支：名词档案枢纽 + 细分档案夹
  nodes.push({
    id: 'atlas',
    label: '图鉴',
    sub: '名词档案',
    type: 'atlasHub',
  });
  links.push({ source: 'bio', target: 'atlas' });
  for (const cat of ATLAS_CATEGORIES) {
    nodes.push({
      id: `cat-${cat.name}`,
      label: cat.name,
      type: 'atlasCategory',
      weight: cat.ids.length,
      href: `/cells?cat=${encodeURIComponent(cat.name)}`,
    });
    links.push({ source: 'atlas', target: `cat-${cat.name}` });
  }

  return { nodes, links };
}

export const KNOWLEDGE_GRAPH = buildGraph();
export const KNOWLEDGE_NODE_COUNT = KNOWLEDGE_GRAPH.nodes.length;
export const KNOWLEDGE_LINK_COUNT = KNOWLEDGE_GRAPH.links.length;
