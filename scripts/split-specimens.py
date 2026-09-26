# -*- coding: utf-8 -*-
"""拆分 specimens.tsx：SVG/Stage 组件按 ATLAS_CATEGORIES 分片到 components/cells/art/*.tsx，
主文件仅保留元数据（id/name/kicker/intro/parts），消费方经 ART_LOADERS 按需加载。"""
import io, os, re

SRC = 'components/cells/specimens.tsx'
OUT_DIR = 'components/cells/art'
SLUG_BY_CAT = {
    '细胞与膜': 'cell-membrane',
    '细胞器': 'organelles',
    '分子与遗传': 'genetics',
    '代谢与酶': 'metabolism',
    '细胞命运': 'cell-fate',
    '微生物': 'microbes',
    '病毒': 'viruses',
    '动物世界': 'animals',
    '人体与调节': 'human',
    '植物与繁殖': 'plants',
    '生态': 'ecology',
}
s = io.open(SRC, encoding='utf-8').read()
lines = s.split('\n')

# ---------- 1. 函数块提取（顶格 function 到顶格 }） ----------
funcs = {}          # name -> text
func_order = []
i = 0
n = len(lines)
while i < n:
    m = re.match(r'^function (\w+)\(', lines[i])
    if m:
        name = m.group(1)
        j = i
        while j < n and lines[j].rstrip() != '}':
            j += 1
        assert j < n, f'unterminated function {name}'
        funcs[name] = '\n'.join(lines[i:j + 1])
        func_order.append(name)
        i = j + 1
    else:
        i += 1
print('functions:', len(funcs))

# ---------- 2. 条目 -> 组件引用 ----------
entries = []  # (id, Svg, Stage3d|None, StageWebGL|None)
for m in re.finditer(r"\{\s*\n\s*id: '(\w+)',", s):
    win = s[m.start():m.start() + 1200]
    e_id = m.group(1)
    sv = re.search(r'\n\s*Svg: (\w+),', win)
    s3 = re.search(r'\n\s*Stage3d: (\w+),', win)
    sw = re.search(r'\n\s*StageWebGL: (\w+),', win)
    entries.append((e_id, sv.group(1) if sv else None, s3.group(1) if s3 else None, sw.group(1) if sw else None))
print('entries:', len(entries))
assert all(e[1] for e in entries), 'entry without Svg'

# ---------- 3. 分类归属 ----------
cats = []  # (name, ids)
for m in re.finditer(r"\{ name: '([^']+)', icon: '[^']*', ids: \[([^\]]*)\] \},?", s):
    ids = re.findall(r"'(\w+)'", m.group(2))
    cats.append((m.group(1), ids))
print('categories:', len(cats))

id2cat = {}
for name, ids in cats:
    for eid in ids:
        id2cat[eid] = name
# LAB_ONLY（实验侧图解，不在图鉴分类）单独归入 lab-diagrams 分片
lab_only_m = re.search(r'LAB_ONLY_SPECIMEN_IDS[^=]*= \[(.*?)\]', s, re.S)
LAB_ONLY = re.findall(r"'(\w+)'", lab_only_m.group(1))
for eid in LAB_ONLY:
    if eid in [e[0] for e in entries]:
        id2cat[eid] = 'lab-diagrams'
# 孤儿条目兜底归位（此前从未被任何分类引用，图鉴页实际不可见——顺手修复）
OVERRIDES = { 'planarian': '动物世界', 'skeletonSystem': '人体与调节' }
for eid, cat_name in OVERRIDES.items():
    if eid in [e[0] for e in entries]:
        id2cat[eid] = cat_name
        if cat_name not in [c[0] for c in cats]:
            cats.append((cat_name, []))
missing = [e[0] for e in entries if e[0] not in id2cat]
assert not missing, f'unmapped entries: {missing}'

# ---------- 4. helper 判定：未被条目引用的函数 ----------
referenced = set()
for _, sv, s3, sw in entries:
    referenced.update([x for x in (sv, s3, sw) if x])
helpers = [f for f in func_order if f not in referenced]
helper_names = set(helpers)
print('referenced:', len(referenced), '| helpers:', helpers)

# ---------- 5. 生成分片 ----------
os.makedirs(OUT_DIR, exist_ok=True)
slug_by_cat = dict(SLUG_BY_CAT)
slug_by_cat['lab-diagrams'] = 'lab-diagrams'
for cat_name, slug in slug_by_cat.items():
    ids = [eid for eid, *_ in entries if id2cat.get(eid) == cat_name]
    if not ids:
        continue
    entry_by_id = {e[0]: e for e in entries}
    # 收集本片需要的函数（主体 + 递归 helper）
    needed_funcs = []
    for eid in ids:
        e = entry_by_id[eid]
        needed_funcs += [x for x in (e[1], e[2], e[3]) if x]
    used_helpers = set()
    body_parts = []
    for fname in needed_funcs:
        if fname in funcs:
            body_parts.append(funcs[fname])
    blob = '\n\n'.join(body_parts)
    for h in helpers:
        if re.search(r'\b' + h + r'\b', blob):
            used_helpers.add(h)
    helper_imports = ''
    if used_helpers:
        helper_imports = 'import { ' + ', '.join(sorted(used_helpers)) + ", type ArtProps } from '@/components/cells/art-shared';\n"
    else:
        helper_imports = "import type { ArtProps } from '@/components/cells/art-shared';\n"
    # WebGL/3D 组件 import（按需）
    webgl_names = ['AnimalCellWebGLModel', 'EColiWebGLModel', 'ParameciumWebGLModel', 'PlantCellWebGLModel', 'StomaWebGLModel']
    organelle_names = ['ChloroplastWebGLModel', 'MitochondrionWebGLModel']
    need_webgl = [w for w in webgl_names if re.search(r'\bfunction ' + w + r'\b', blob)]
    # 这些 WebGL 组件在主文件是 import 的（非本地函数）——分片中若条目引用了它们，需要 import
    ref_webgl = []
    for eid in ids:
        e = entry_by_id[eid]
        for x in (e[2], e[3]):
            if x and x not in funcs:
                ref_webgl.append(x)
    ref_webgl = sorted(set(ref_webgl))
    ext_imports = ''
    if any(x in webgl_names for x in ref_webgl):
        ext_imports += "import { " + ', '.join([x for x in webgl_names if x in ref_webgl]) + " } from '@/components/cells/cell-models-webgl';\n"
    if any(x in organelle_names for x in ref_webgl):
        ext_imports += "import { " + ', '.join([x for x in organelle_names if x in ref_webgl]) + " } from '@/components/cells/organelle-webgl';\n"
    if 'Chloroplast3d' in ref_webgl:
        ext_imports += "import { Chloroplast3d } from '@/components/cells/chloroplast-3d';\n"
    if 'Mitochondrion3d' in ref_webgl:
        ext_imports += "import { Mitochondrion3d } from '@/components/cells/mitochondrion-3d';\n"

    art_entries = []
    for eid in ids:
        e = entry_by_id[eid]
        fields = [f'Svg: {e[1]}']
        if e[2]:
            fields.append(f'Stage3d: {e[2]}')
        if e[3]:
            fields.append(f'StageWebGL: {e[3]}')
        art_entries.append(f"  {eid}: {{ {', '.join(fields)} }},")
    content = (
        "'use client';\n\n"
        + "import type { ComponentType } from 'react';\n"
        + helper_imports
        + ext_imports
        + '\n'
        + '\n\n'.join(body_parts)
        + '\n\nexport const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {\n'
        + '\n'.join(art_entries)
        + '\n};\n'
    )
    with io.open(f'{OUT_DIR}/{slug}.tsx', 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print(f'art/{slug}.tsx: {len(ids)} entries, {len(body_parts)} funcs')

# ---------- 6. 重写主文件 ----------
# 6a. 头部 imports 区（L0 到 'export type CellPart' 前）重写
head_end = s.index('export type CellPart')
new_head = """'use client';

import type { ComponentType } from 'react';

import type { ArtBundle } from '@/components/cells/art-shared';

"""
s = new_head + s[head_end:]

# 6b. Specimen 类型：删 Svg/Stage 字段
s = s.replace("""  parts: CellPart[];
  Svg: ComponentType<{ active: number | null; open?: boolean }>;
  /** 课外拓展内容（教材之外的延伸），页面上会打上"课外拓展"标记 */
  extension?: boolean;
  /** 立体剖面（SVG 伪 3D，默认展示，所有角度都清晰） */
  Stage3d?: ComponentType<{ active: number | null; open?: boolean }>;
  /** 实景 3D（three.js 渲染，可自由旋转缩放，按需加载） */
  StageWebGL?: ComponentType<{ active: number | null; open?: boolean }>;
};""",
"""  parts: CellPart[];
  /** 课外拓展内容（教材之外的延伸），页面上会打上"课外拓展"标记 */
  extension?: boolean;
};""")

# 6c. 删除所有函数块（dim/Badge 也移入 art-shared）
for name in func_order:
    block = funcs[name]
    assert block in s, 'block missing: ' + name
    s = s.replace(block + '\n\n', '', 1)

# 6d. 条目行：删 Svg:/Stage3d:/StageWebGL: 行
s = re.sub(r'\n\s*Svg: \w+,', '', s)
s = re.sub(r'\n\s*Stage3d: \w+,', '', s)
s = re.sub(r'\n\s*StageWebGL: \w+,', '', s)

# 6e. 尾部追加 ART_LOADERS
loaders = []
for cat_name, slug in slug_by_cat.items():
    loaders.append(f"  {slug}: () => import('@/components/cells/art/{slug}'),")
slug_by_name = {name: SLUG_BY_CAT[name] for name, _ in cats}
id_slug_lines = []
for name, ids in cats:
    slug = SLUG_BY_CAT[name]
    for eid in ids:
        id_slug_lines.append(f"  '{eid}': '{slug}',")

tail = '''
/** 分片名（按图鉴分类） */
export type ArtSlug = 'cell-membrane' | 'organelles' | 'genetics' | 'metabolism' | 'cell-fate' | 'microbes' | 'viruses' | 'animals' | 'human' | 'plants' | 'ecology' | 'lab-diagrams';

/** 按分类懒加载图形分片：主包不再包含任何 SVG 组件 */
export const ART_LOADERS: Record<ArtSlug, () => Promise<{ ART: Record<string, ArtBundle> }>> = {
''' + '\n'.join(loaders) + '''
};

/** 标本 -> 分片 */
export const ART_SLUG_BY_ID: Record<string, ArtSlug> = {
''' + '\n'.join(id_slug_lines) + '''
};

export function artLoaderFor(id: string): () => Promise<{ ART: Record<string, ArtBundle> }> {
  return ART_LOADERS[ART_SLUG_BY_ID[id] ?? 'lab-diagrams'];
}
'''
# 插入到文件末尾
s = s.rstrip() + '\n' + tail

with io.open(SRC, 'w', encoding='utf-8', newline='') as f:
    f.write(s)

# art-shared.tsx
shared = """'use client';

import type { ComponentType } from 'react';

export type ArtProps = { active: number | null; open?: boolean };

export type ArtBundle = {
  Svg: ComponentType<ArtProps>;
  Stage3d?: ComponentType<ArtProps>;
  StageWebGL?: ComponentType<ArtProps>;
};

/** 选中结构高亮：未选中的整体调淡。 */
export function dim(active: number | null, idx: number) {
  return { opacity: active == null || active === idx ? 1 : 0.24, transition: 'opacity 0.25s ease' };
}

/** 编号圆标。 */
export function Badge({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g style={{ pointerEvents: 'none' }}>
      <circle cx={x} cy={y} r="9.5" fill="#0e6f75" stroke="#ffffff" strokeWidth="2" />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="13.5" fill="#ffffff" fontWeight="700">
        {n}
      </text>
    </g>
  );
}

/** 分片内 SVG 动画 keyframes（气孔纤毛/鞭毛），由消费方以 <style> 注入一次。 */
export const ART_KEYFRAMES = `
@keyframes bio-cilia-sway { 0%, 100% { transform: skewX(0deg); } 50% { transform: skewX(2.5deg); } }
.bio-cilia { animation: bio-cilia-sway 1.8s ease-in-out infinite; transform-origin: 260px 195px; }
@keyframes bio-flagella-wave { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(7deg); } }
.bio-flagella { animation: bio-flagella-wave 1.3s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .bio-cilia, .bio-flagella { animation: none; }
}
`;
"""
with io.open('components/cells/art-shared.tsx', 'w', encoding='utf-8', newline='') as f:
    f.write(shared)
print('done. main file lines:', s.count(chr(10)) + 1)
