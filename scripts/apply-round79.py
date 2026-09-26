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
for new_id in ['bloodDialysis']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in curriculum'

old = "  | 'urineFormation'\n"
assert s.count(old) == 1, 'union anchor'
s = s.replace(old, old + "  | 'bloodDialysis'\n", 1)

anchor = "  whaleFall: {\n"
assert s.count(anchor) == 1, 'meta anchor'
meta = """  bloodDialysis: {
    title: '血液透析：人工肾',
    kicker: '选择性必修 1 · 稳态与健康',
    description: '半透膜模拟：废物顺浓度梯度穿膜而出——尿毒症患者的"体外肾"。',
    relatedBook: 'regulation',
    relatedModule: '内环境与稳态',
  },
"""
s = s.replace(anchor, meta + anchor, 1)

old = "  'urineFormation',\n  // 选择性必修 3 · 生物技术与工程"
assert s.count(old) == 1, 'order anchor'
s = s.replace(old, "  'urineFormation',\n  'bloodDialysis',\n  // 选择性必修 3 · 生物技术与工程", 1)

old = "'bloodType', 'urineFormation',"
assert s.count(old) == 1, 'category anchor'
s = s.replace(old, "'bloodType', 'urineFormation', 'bloodDialysis',", 1)
wr(p, s)
print('curriculum OK')

# ---------- specimens.tsx ----------
p = 'components/cells/specimens.tsx'
s = rd(p)
for new_id in ['clownfish', 'gastricMucus', 'penicillin']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in specimens'

marker = 'export const SPECIMENS: Specimen[] = [\n'
assert s.count(marker) == 1, 'marker'
comp = rd('scripts/tmp-specimens-insert79.txt')
assert comp.endswith(marker)
comp = comp[: -len(marker)]
s = s.replace(marker, comp + marker, 1)

first = "  {\n    id: 'mantaRay',"
assert s.count(first) == 1, 'first entry anchor'
entries = rd('scripts/tmp-entries79.txt')
s = s.replace(first, entries + first, 1)

def append_cat(s, cat_name, new_id):
    m = re.search(r"(\{ name: '" + cat_name + r"', icon: '[^']*', ids: \[[^\]]*?)\] \},", s)
    assert m, cat_name
    old = m.group(0)
    new_line = old[: old.rindex(']')] + ", '" + new_id + "'" + old[old.rindex(']'):]
    return s.replace(old, new_line, 1)

s = append_cat(s, '动物世界', 'clownfish')
s = append_cat(s, '人体与调节', 'gastricMucus')
s = append_cat(s, '微生物', 'penicillin')
wr(p, s)
print('specimens OK')

# ---------- lab-client.tsx ----------
p = 'app/lab/lab-client.tsx'
s = rd(p)
assert 'bloodDialysis' not in s

old = "  urineFormation: Droplets,\n"
assert s.count(old) == 1, 'icon anchor'
s = s.replace(old, old + "  bloodDialysis: Recycle,\n", 1)

old = "  urineFormation: () => import('@/components/lab/urine-formation-lab').then(({ UrineFormationLab }) => ({ default: UrineFormationLab })),\n"
assert s.count(old) == 1, 'loader anchor'
loader = "  bloodDialysis: () => import('@/components/lab/blood-dialysis-lab').then(({ BloodDialysisLab }) => ({ default: BloodDialysisLab })),\n"
s = s.replace(old, old + loader, 1)

old = "  coralBleaching: ['coral'],\n"
assert s.count(old) == 1, 'diagram anchor'
s = s.replace(old, old + "  bloodDialysis: ['nephron'],\n", 1)
wr(p, s)
print('lab-client OK')
