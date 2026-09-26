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
for new_id in ['brainRegions']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in curriculum'

old = "  | 'impulse'\n"
assert s.count(old) == 1, 'union anchor'
s = s.replace(old, old + "  | 'brainRegions'\n", 1)

anchor = "  whaleFall: {\n"
assert s.count(anchor) == 1, 'meta anchor'
meta = """  brainRegions: {
    title: '脑区功能探索',
    kicker: '选择性必修 1 · 神经调节',
    description: '点亮七个脑区：额叶决策、小脑协调、脑干值班、下丘脑管着全身稳态。',
    relatedBook: 'regulation',
    relatedModule: '神经和体液调节',
  },
"""
s = s.replace(anchor, meta + anchor, 1)

old = "  'impulse',\n  'synapseDrug',"
assert s.count(old) == 1, 'order anchor'
s = s.replace(old, "  'impulse',\n  'brainRegions',\n  'synapseDrug',", 1)

old = "'impulse', 'synapseDrug',"
assert s.count(old) == 1, 'category anchor'
s = s.replace(old, "'impulse', 'brainRegions', 'synapseDrug',", 1)
wr(p, s)
print('curriculum OK')

# ---------- specimens.tsx ----------
p = 'components/cells/specimens.tsx'
s = rd(p)
for new_id in ['mantaRay', 'heartValves', 'amber']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in specimens'

marker = 'export const SPECIMENS: Specimen[] = [\n'
assert s.count(marker) == 1, 'marker'
comp = rd('scripts/tmp-specimens-insert78.txt')
assert comp.endswith(marker)
comp = comp[: -len(marker)]
s = s.replace(marker, comp + marker, 1)

first = "  {\n    id: 'gecko',"
assert s.count(first) == 1, 'first entry anchor'
entries = rd('scripts/tmp-entries78.txt')
s = s.replace(first, entries + first, 1)

def append_cat(s, cat_name, new_id):
    m = re.search(r"(\{ name: '" + cat_name + r"', icon: '[^']*', ids: \[[^\]]*?)\] \},", s)
    assert m, cat_name
    old = m.group(0)
    new_line = old[: old.rindex(']')] + ", '" + new_id + "'" + old[old.rindex(']'):]
    return s.replace(old, new_line, 1)

s = append_cat(s, '动物世界', 'mantaRay')
s = append_cat(s, '人体与调节', 'heartValves')
s = append_cat(s, '植物与繁殖', 'amber')
wr(p, s)
print('specimens OK')

# ---------- lab-client.tsx ----------
p = 'app/lab/lab-client.tsx'
s = rd(p)
assert 'brainRegions' not in s

old = "  impulse: Zap,\n"
assert s.count(old) == 1, 'icon anchor'
s = s.replace(old, old + "  brainRegions: Network,\n", 1)

old = "  impulse: () => import('@/components/lab/nerve-impulse-lab').then(({ NerveImpulseLab }) => ({ default: NerveImpulseLab })),\n"
assert s.count(old) == 1, 'loader anchor'
loader = "  brainRegions: () => import('@/components/lab/brain-regions-lab').then(({ BrainRegionsLab }) => ({ default: BrainRegionsLab })),\n"
s = s.replace(old, old + loader, 1)

old = "  impulse: ['nervePotential'],\n"
assert s.count(old) == 1, 'diagram anchor'
s = s.replace(old, old + "  brainRegions: ['brainStructure'],\n", 1)
wr(p, s)
print('lab-client OK')
