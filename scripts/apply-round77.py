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
for new_id in ['polygenicTraits']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in curriculum'

old = "  | 'crossingOver'\n"
assert s.count(old) == 1, 'union anchor'
s = s.replace(old, old + "  | 'polygenicTraits'\n", 1)

anchor = "  whaleFall: {\n"
assert s.count(anchor) == 1, 'meta anchor'
meta = """  polygenicTraits: {
    title: '多基因遗传与数量性状',
    kicker: '必修 2 · 遗传与进化',
    description: '从 1 对到 4 对基因再加环境修饰：看离散比例如何"长成"钟形曲线。',
    relatedBook: 'genetics',
    relatedModule: '遗传规律与配子分析',
  },
"""
s = s.replace(anchor, meta + anchor, 1)

old = "  'crossingOver',\n  'doubleFertilization',"
assert s.count(old) == 1, 'order anchor'
s = s.replace(old, "  'crossingOver',\n  'polygenicTraits',\n  'doubleFertilization',", 1)

old = "'humanTraits', 'crossingOver',"
assert s.count(old) == 1, 'category anchor'
s = s.replace(old, "'humanTraits', 'crossingOver', 'polygenicTraits',", 1)
wr(p, s)
print('curriculum OK')

# ---------- specimens.tsx ----------
p = 'components/cells/specimens.tsx'
s = rd(p)
for new_id in ['gecko', 'swallowing', 'coconut']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in specimens'

marker = 'export const SPECIMENS: Specimen[] = [\n'
assert s.count(marker) == 1, 'marker'
comp = rd('scripts/tmp-specimens-insert77.txt')
assert comp.endswith(marker)
comp = comp[: -len(marker)]
s = s.replace(marker, comp + marker, 1)

first = "  {\n    id: 'seaCucumber',"
assert s.count(first) == 1, 'first entry anchor'
entries = rd('scripts/tmp-entries77.txt')
s = s.replace(first, entries + first, 1)

def append_cat(s, cat_name, new_id):
    m = re.search(r"(\{ name: '" + cat_name + r"', icon: '[^']*', ids: \[[^\]]*?)\] \},", s)
    assert m, cat_name
    old = m.group(0)
    new_line = old[: old.rindex(']')] + ", '" + new_id + "'" + old[old.rindex(']'):]
    return s.replace(old, new_line, 1)

s = append_cat(s, '动物世界', 'gecko')
s = append_cat(s, '人体与调节', 'swallowing')
s = append_cat(s, '植物与繁殖', 'coconut')
wr(p, s)
print('specimens OK')

# ---------- lab-client.tsx ----------
p = 'app/lab/lab-client.tsx'
s = rd(p)
assert 'polygenicTraits' not in s

old = "  crossingOver: Scissors,\n"
assert s.count(old) == 1, 'icon anchor'
s = s.replace(old, old + "  polygenicTraits: Ruler,\n", 1)

old = "  crossingOver: () => import('@/components/lab/crossing-over-lab').then(({ CrossingOverLab }) => ({ default: CrossingOverLab })),\n"
assert s.count(old) == 1, 'loader anchor'
loader = "  polygenicTraits: () => import('@/components/lab/polygenic-traits-lab').then(({ PolygenicTraitsLab }) => ({ default: PolygenicTraitsLab })),\n"
s = s.replace(old, old + loader, 1)
wr(p, s)
print('lab-client OK')
