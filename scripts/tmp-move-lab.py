# -*- coding: utf-8 -*-
# 把 divisionCurve / cellCyclePie 移到实验侧
p = 'components/cells/specimens.tsx'
s = open(p, encoding='utf-8').read()
old = "  'mitosisStages',\n  'meiosisStages',\n  'fertilization',\n  'artificialPollination',\n  'aerobicRespiration',\n  'osmosisSetup',\n  'nervePotential',\n];"
new = "  'mitosisStages',\n  'meiosisStages',\n  'fertilization',\n  'artificialPollination',\n  'aerobicRespiration',\n  'osmosisSetup',\n  'nervePotential',\n  'divisionCurve',\n  'cellCyclePie',\n];"
assert old in s, 'LAB_ONLY missing'
s = s.replace(old, new)
# 从分类归属中移除（divisionCurve 在 分子与遗传）
old_cat = "'centralDogma', 'divisionCurve']"
new_cat = "'centralDogma']"
assert old_cat in s, 'cat remove missing'
s = s.replace(old_cat, new_cat)
open(p, 'w', encoding='utf-8').write(s)
print('moved to lab side OK')
