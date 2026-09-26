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
for new_id in ['autoimmune']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in curriculum'

# 1) union
old = "  | 'transplantRejection'\n"
assert s.count(old) == 1, 'union anchor'
s = s.replace(old, old + "  | 'autoimmune'\n", 1)

# 2) meta
anchor = "  whaleFall: {\n"
assert s.count(anchor) == 1, 'meta anchor'
meta = """  autoimmune: {
    title: '自身免疫：敌我不分',
    kicker: '免疫调节 · 稳态失衡',
    description: '调节滑块看"免疫耐受"松紧：从免疫缺陷、精准识别到误伤自身的类风湿与 1 型糖尿病。',
    relatedBook: 'regulation',
    relatedModule: '免疫调节与健康',
  },
"""
s = s.replace(anchor, meta + anchor, 1)

# 3) order
old = "  'transplantRejection',\n  'bloodRoutine',"
assert s.count(old) == 1, 'order anchor'
s = s.replace(old, "  'transplantRejection',\n  'autoimmune',\n  'bloodRoutine',", 1)

# 4) categories
old = "'transplantRejection', 'bloodRoutine',"
assert s.count(old) == 1, 'category anchor'
s = s.replace(old, "'transplantRejection', 'autoimmune', 'bloodRoutine',", 1)
wr(p, s)
print('curriculum OK')

# ---------- specimens.tsx ----------
p = 'components/cells/specimens.tsx'
s = rd(p)
for new_id in ['armadillo', 'motionSickness', 'etiolation']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in specimens'

# 1) components before marker
marker = 'export const SPECIMENS: Specimen[] = [\n'
assert s.count(marker) == 1, 'marker'
comp = rd('scripts/tmp-specimens-insert74.txt')
s = s.replace(marker, comp + marker, 1)

# 2) entries before first entry (parrot)
first = "  {\n    id: 'parrot',"
assert s.count(first) == 1, 'first entry anchor'
entries = rd('scripts/tmp-entries74.txt')
s = s.replace(first, entries + first, 1)

# 3) category tails
def append_cat(s, cat_name, new_id):
    m = re.search(r"(\{ name: '" + cat_name + r"', icon: '[^']*', ids: \[[^\]]*?)\] \},", s)
    assert m, cat_name
    old = m.group(0)
    new_line = old[:old.rindex(']')] + ", '" + new_id + "'" + old[old.rindex(']'):]
    return s.replace(old, new_line, 1)

s = append_cat(s, '动物世界', 'armadillo')
s = append_cat(s, '人体与调节', 'motionSickness')
s = append_cat(s, '植物与繁殖', 'etiolation')
wr(p, s)
print('specimens OK')

# ---------- lab-client.tsx ----------
p = 'app/lab/lab-client.tsx'
s = rd(p)
assert 'autoimmune' not in s

old = "  transplantRejection: Heart,\n"
assert s.count(old) == 1, 'icon anchor'
s = s.replace(old, old + "  autoimmune: Target,\n", 1)

m = re.search(r"  transplantRejection: \(\) => import\('@/components/lab/transplant-rejection-lab'\)\.then\(\(\{ TransplantRejectionLab \}\) => \(\{ default: TransplantRejectionLab \}\)\),\n", s)
assert m, 'loader anchor'
loader = "  autoimmune: () => import('@/components/lab/autoimmune-lab').then(({ AutoimmuneLab }) => ({ default: AutoimmuneLab })),\n"
s = s.replace(m.group(0), m.group(0) + loader, 1)

old = "  transplantRejection: ['immuneOrgans'],\n"
assert s.count(old) == 1, 'diagram anchor'
s = s.replace(old, old + "  autoimmune: ['threeDefenseLines'],\n", 1)
wr(p, s)
print('lab-client OK')
