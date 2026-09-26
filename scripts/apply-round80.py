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
for new_id in ['stressResponse']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in curriculum'

old = "  | 'altitudeAdaptation'\n"
assert s.count(old) == 1, 'union anchor'
s = s.replace(old, old + "  | 'stressResponse'\n", 1)

anchor = "  whaleFall: {\n"
assert s.count(anchor) == 1, 'meta anchor'
meta = """  stressResponse: {
    title: '应激反应：战斗或逃跑',
    kicker: '选择性必修 1 · 稳态与调节',
    description: '一键触发交感神经+肾上腺素：看心率、血糖、瞳孔的"求生总动员"。',
    relatedBook: 'regulation',
    relatedModule: '内环境与稳态',
  },
"""
s = s.replace(anchor, meta + anchor, 1)

old = "  'altitudeAdaptation',\n  'circadianRhythm',"
assert s.count(old) == 1, 'order anchor'
s = s.replace(old, "  'altitudeAdaptation',\n  'stressResponse',\n  'circadianRhythm',", 1)

old = "'hibernation', 'altitudeAdaptation'"
assert s.count(old) == 1, 'category anchor'
s = s.replace(old, "'hibernation', 'altitudeAdaptation', 'stressResponse'", 1)
wr(p, s)
print('curriculum OK')

# ---------- specimens.tsx ----------
p = 'components/cells/specimens.tsx'
s = rd(p)
for new_id in ['beaver', 'earwax', 'prion']:
    assert ("'" + new_id + "'") not in s, new_id + ' already in specimens'

marker = 'export const SPECIMENS: Specimen[] = [\n'
assert s.count(marker) == 1, 'marker'
comp = rd('scripts/tmp-specimens-insert80.txt')
assert comp.endswith(marker)
comp = comp[: -len(marker)]
s = s.replace(marker, comp + marker, 1)

first = "  {\n    id: 'clownfish',"
assert s.count(first) == 1, 'first entry anchor'
entries = rd('scripts/tmp-entries80.txt')
s = s.replace(first, entries + first, 1)

def append_cat(s, cat_name, new_id):
    m = re.search(r"(\{ name: '" + cat_name + r"', icon: '[^']*', ids: \[[^\]]*?)\] \},", s)
    assert m, cat_name
    old = m.group(0)
    new_line = old[: old.rindex(']')] + ", '" + new_id + "'" + old[old.rindex(']'):]
    return s.replace(old, new_line, 1)

s = append_cat(s, '动物世界', 'beaver')
s = append_cat(s, '人体与调节', 'earwax')
s = append_cat(s, '微生物', 'prion')
wr(p, s)
print('specimens OK')

# ---------- lab-client.tsx ----------
p = 'app/lab/lab-client.tsx'
s = rd(p)
assert 'stressResponse' not in s

old = "  altitudeAdaptation: Activity,\n"
assert s.count(old) == 1, 'icon anchor'
s = s.replace(old, old + "  stressResponse: Flame,\n", 1)

old = "  altitudeAdaptation: () => import('@/components/lab/altitude-adaptation-lab').then(({ AltitudeAdaptationLab }) => ({ default: AltitudeAdaptationLab })),\n"
assert s.count(old) == 1, 'loader anchor'
loader = "  stressResponse: () => import('@/components/lab/stress-response-lab').then(({ StressResponseLab }) => ({ default: StressResponseLab })),\n"
s = s.replace(old, old + loader, 1)

old = "  altitudeAdaptation: ['alveolus'],\n"
assert s.count(old) == 1, 'diagram anchor'
s = s.replace(old, old + "  stressResponse: ['adrenal'],\n", 1)
wr(p, s)
print('lab-client OK')
