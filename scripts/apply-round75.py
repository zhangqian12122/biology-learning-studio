# -*- coding: utf-8 -*-
import io

def rd(p):
    with io.open(p, 'r', encoding='utf-8') as f:
        return f.read()

def wr(p, s):
    with io.open(p, 'w', encoding='utf-8', newline='') as f:
        f.write(s)

# ---------- curriculum.ts ----------
p = 'lib/curriculum.ts'
s = rd(p)
for new_id in ['coralBleaching']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in curriculum'

old = "  | 'ecoFootprint'\n"
assert s.count(old) == 1, 'union anchor'
s = s.replace(old, old + "  | 'coralBleaching'\n", 1)

anchor = "  whaleFall: {\n"
assert s.count(anchor) == 1, 'meta anchor'
meta = """  coralBleaching: {
    title: '珊瑚白化：共生被高温拆散',
    kicker: '生态系统 · 保护生物学',
    description: '调海温推进周数：看虫黄藻撤离、珊瑚白化——及时降温还有救，热浪连击就没了。',
    relatedBook: 'ecology',
    relatedModule: '生态保护与人与自然',
    extension: true,
  },
"""
s = s.replace(anchor, meta + anchor, 1)

old = "  'ecoFootprint',\n  'ecologicalNiche',"
assert s.count(old) == 1, 'order anchor'
s = s.replace(old, "  'ecoFootprint',\n  'coralBleaching',\n  'ecologicalNiche',", 1)

old = "'invasiveSim', 'ecoFootprint']"
assert s.count(old) == 1, 'category anchor'
s = s.replace(old, "'invasiveSim', 'ecoFootprint', 'coralBleaching']", 1)
wr(p, s)
print('curriculum OK')

# ---------- specimens.tsx ----------
p = 'components/cells/specimens.tsx'
s = rd(p)
for new_id in ['amphioxus', 'bloodBrainBarrier', 'rootNodule']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in specimens'

marker = 'export const SPECIMENS: Specimen[] = [\n'
assert s.count(marker) == 1, 'marker'
comp = rd('scripts/tmp-specimens-insert75.txt')
assert comp.endswith(marker)
comp = comp[: -len(marker)]
s = s.replace(marker, comp + marker, 1)

first = "  {\n    id: 'armadillo',"
assert s.count(first) == 1, 'first entry anchor'
entries = rd('scripts/tmp-entries75.txt')
s = s.replace(first, entries + first, 1)

def append_cat(s, cat_name, new_id):
    import re
    m = re.search(r"(\{ name: '" + cat_name + r"', icon: '[^']*', ids: \[[^\]]*?)\] \},", s)
    assert m, cat_name
    old = m.group(0)
    new_line = old[: old.rindex(']')] + ", '" + new_id + "'" + old[old.rindex(']'):]
    return s.replace(old, new_line, 1)

s = append_cat(s, '动物世界', 'amphioxus')
s = append_cat(s, '人体与调节', 'bloodBrainBarrier')
s = append_cat(s, '植物与繁殖', 'rootNodule')
wr(p, s)
print('specimens OK')

# ---------- lab-client.tsx ----------
p = 'app/lab/lab-client.tsx'
s = rd(p)
assert 'coralBleaching' not in s

old = "  ecosystemJar: Fish,\n"
assert s.count(old) == 1, 'icon anchor'
s = s.replace(old, old + "  coralBleaching: Thermometer,\n", 1)

old = "  ecosystemJar: () => import('@/components/lab/ecosystem-jar-lab').then(({ EcosystemJarLab }) => ({ default: EcosystemJarLab })),\n"
assert s.count(old) == 1, 'loader anchor'
loader = "  coralBleaching: () => import('@/components/lab/coral-bleaching-lab').then(({ CoralBleachingLab }) => ({ default: CoralBleachingLab })),\n"
s = s.replace(old, old + loader, 1)

old = "  ecosystemJar: ['carbonCycle'],\n"
assert s.count(old) == 1, 'diagram anchor'
s = s.replace(old, old + "  coralBleaching: ['coral'],\n", 1)
wr(p, s)
print('lab-client OK')
