# -*- coding: utf-8 -*-
import io, re

def rd(p):
    with io.open(p, 'r', encoding='utf-8') as f:
        return f.read()

def wr(p, s):
    with io.open(p, 'w', encoding='utf-8', newline='') as f:
        f.write(s)

# ---------- curriculum.ts ----------
p = 'lib/curriculum.ts'
s = rd(p)
for new_id in ['agrobacterium']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in curriculum'

old = "  | 'geneEngine'\n"
assert s.count(old) == 1, 'union anchor'
s = s.replace(old, old + "  | 'agrobacterium'\n", 1)

anchor = "  whaleFall: {\n"
assert s.count(anchor) == 1, 'meta anchor'
meta = """  agrobacterium: {
    title: '农杆菌转化法',
    kicker: '选择性必修 3 · 基因工程',
    description: '五步看"基因快递员"送件：Bt 基因搭 T-DNA 便车，整合进棉花染色体。',
    relatedBook: 'technology',
    relatedModule: '基因工程与 PCR 技术',
  },
"""
s = s.replace(anchor, meta + anchor, 1)

old = "  'geneEngine',\n  'dnaExtract',"
assert s.count(old) == 1, 'order anchor'
s = s.replace(old, "  'geneEngine',\n  'agrobacterium',\n  'dnaExtract',", 1)

old = "'stemCellTherapy', 'oxygenation']"
assert s.count(old) == 1, 'category anchor'
s = s.replace(old, "'stemCellTherapy', 'oxygenation', 'agrobacterium']", 1)
wr(p, s)
print('curriculum OK')

# ---------- specimens.tsx ----------
p = 'components/cells/specimens.tsx'
s = rd(p)
for new_id in ['seaCucumber', 'duodenum', 'guttation']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in specimens'

marker = 'export const SPECIMENS: Specimen[] = [\n'
assert s.count(marker) == 1, 'marker'
comp = rd('scripts/tmp-specimens-insert76.txt')
assert comp.endswith(marker)
comp = comp[: -len(marker)]
s = s.replace(marker, comp + marker, 1)

first = "  {\n    id: 'amphioxus',"
assert s.count(first) == 1, 'first entry anchor'
entries = rd('scripts/tmp-entries76.txt')
s = s.replace(first, entries + first, 1)

def append_cat(s, cat_name, new_id):
    m = re.search(r"(\{ name: '" + cat_name + r"', icon: '[^']*', ids: \[[^\]]*?)\] \},", s)
    assert m, cat_name
    old = m.group(0)
    new_line = old[: old.rindex(']')] + ", '" + new_id + "'" + old[old.rindex(']'):]
    return s.replace(old, new_line, 1)

s = append_cat(s, '动物世界', 'seaCucumber')
s = append_cat(s, '人体与调节', 'duodenum')
s = append_cat(s, '植物与繁殖', 'guttation')
wr(p, s)
print('specimens OK')

# ---------- lab-client.tsx ----------
p = 'app/lab/lab-client.tsx'
s = rd(p)
assert 'agrobacterium' not in s

old = "  geneEngine: Scissors,\n"
assert s.count(old) == 1, 'icon anchor'
s = s.replace(old, old + "  agrobacterium: Dna,\n", 1)

old = "  geneEngine: () => import('@/components/lab/gene-engineering-lab').then(({ GeneEngineLab }) => ({ default: GeneEngineLab })),\n"
assert s.count(old) == 1, 'loader anchor'
loader = "  agrobacterium: () => import('@/components/lab/agrobacterium-lab').then(({ AgrobacteriumLab }) => ({ default: AgrobacteriumLab })),\n"
s = s.replace(old, old + loader, 1)
wr(p, s)
print('lab-client OK')
