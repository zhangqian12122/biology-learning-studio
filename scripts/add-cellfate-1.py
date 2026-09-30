# -*- coding: utf-8 -*-
import io, re

# ========== 1. specimens.tsx：3 条目 + 3 分类 ids ==========
p = 'components/cells/specimens.tsx'
s = io.open(p, encoding='utf-8').read()

marker = 'export const SPECIMENS: Specimen[] = [\n'
assert s.count(marker) == 1, 'marker'
entries = """  {
    id: 'cellSenescence',
    name: '细胞衰老',
    kicker: '细胞命运 · 五大特征（课外拓展）',
    intro: '细胞衰老是个体衰老的基础，但两者不成简单正比——年轻个体内也有衰老细胞。衰老细胞有一套清晰的"体检指标"：水分减少使体积缩小、多种酶活性降低、色素（脂褐素）积累、细胞核增大且染色质收缩深染、细胞膜通透性改变。其机制与端粒缩短、DNA 损伤累积有关——衰老其实是细胞防止自己癌变的"安全锁"。',
    extension: true,
    parts: [
      { name: '水分减少', desc: '细胞萎缩、体积变小——皮肤皱纹的细胞学基础之一。' },
      { name: '酶活性降低', desc: '代谢速率减慢：如酪氨酸酶活性降低使黑色素合成减少，出现白发。' },
      { name: '色素积累', desc: '脂褐素等色素沉积——老年斑就是它的"合影"。' },
      { name: '核增大、染色深', desc: '细胞核体积增大、染色质收缩、染色加深——物质运输功能下降。' },
      { name: '膜通透性改变', desc: '细胞膜通透性改变，物质运输功能降低——对营养"索取"与废物"排放"都变慢。' },
    ],
    Svg: CellSenescenceSvg,
  },
  {
    id: 'hbv',
    name: '乙肝病毒',
    kicker: '嗜肝 DNA 病毒 · 环状 DNA（课外拓展）',
    intro: '乙肝病毒（HBV）是有包膜的 DNA 病毒：完整的病毒颗粒叫 Dane 颗粒，内部装着一段部分双链的环状 DNA。它专门感染肝细胞，婴儿期感染极易慢性化，慢性乙肝可沿"肝炎—肝硬化—肝癌"三步发展。好消息是：重组疫苗自普及以来，中国儿童的乙肝病毒携带率已大幅下降——"母婴阻断 + 疫苗"是人类对抗它最有力的武器。',
    extension: true,
    parts: [
      { name: 'Dane 颗粒', desc: '完整的乙肝病毒颗粒：包膜（表面抗原 HBsAg）+ 衣壳（核心抗原 HBcAg）+ 环状 DNA。' },
      { name: '环状 DNA', desc: '部分双链、有缺口的环状 DNA——以 RNA 为中间媒介复制，这也是它难以被彻底清除的原因之一。' },
      { name: '传播途径', desc: '血液、母婴、性接触传播——共同进餐、握手等日常接触不传播。' },
      { name: '疫苗预防', desc: '疫苗是基因工程的重组表面抗原——不含病毒核酸，安全且高效。' },
      { name: '与肝癌', desc: '慢性感染者的肝癌风险显著升高——乙肝病毒是明确的人类致癌病毒之一。' },
    ],
    Svg: HbvSvg,
  },
  {
    id: 'enzymeInhibition',
    name: '酶的抑制剂',
    kicker: '代谢与酶 · 竞争与非竞争（课外拓展）',
    intro: '抑制剂是一类能与酶结合、降低或解除其催化活性的分子：竞争性抑制剂与底物"长得像"，抢占活性中心，加大底物浓度可以解除；非竞争性抑制剂结合在酶的其他部位，让酶"变形失活"，加大底物也没用。人体自身用产物抑制来调节代谢，制药工业则把酶抑制剂做成了大批救命药——降压药、他汀、青霉素背后的原理都是"精准抑制某个酶"。',
    extension: true,
    parts: [
      { name: '竞争性抑制', desc: '抑制剂与底物结构相似、争夺活性中心——增大底物浓度可减弱抑制（米氏方程 Vmax 不变、Km 增大）。' },
      { name: '非竞争性抑制', desc: '抑制剂结合酶的别构部位，使活性中心变形——底物浓度再高也无法恢复（Vmax 降低）。' },
      { name: '产物抑制', desc: '代谢通路末端产物抑制关键酶——生物体自身调节代谢的"负反馈阀门"。' },
      { name: '药物应用', desc: '他汀抑制胆固醇合成酶、青霉素抑制细菌细胞壁合成酶——"选择性抑制"是药物设计的核心思路。' },
    ],
    Svg: EnzymeInhibitionSvg,
  },
"""
s = s.replace(marker, marker + entries, 1)

# 分类 ids 追加
s = s.replace(
  "{ name: '代谢与酶', icon: '⚗️', ids: ['atpMolecule', 'enzymeModel', 'secretoryProtein', 'photosyntheticPigments', 'cytoskeleton'] }",
  "{ name: '代谢与酶', icon: '⚗️', ids: ['atpMolecule', 'enzymeModel', 'secretoryProtein', 'photosyntheticPigments', 'cytoskeleton', 'enzymeInhibition'] }", 1)
s = s.replace(
  "{ name: '细胞命运', icon: '⏳', ids: ['cellFates', 'cellDifferentiation', 'cancerCell', 'stemCells', 'apoptosisVsNecrosis', 'telomere'] }",
  "{ name: '细胞命运', icon: '⏳', ids: ['cellFates', 'cellDifferentiation', 'cancerCell', 'stemCells', 'apoptosisVsNecrosis', 'telomere', 'cellSenescence'] }", 1)
s = s.replace(
  "{ name: '病毒', icon: '🧫', ids: ['hiv', 'fluVirus', 'phage', 'tmv', 'sarsCov2'] }",
  "{ name: '病毒', icon: '🧫', ids: ['hiv', 'fluVirus', 'phage', 'tmv', 'sarsCov2', 'hbv'] }", 1)
for k in ['cellSenescence', 'hbv', 'enzymeInhibition']:
    assert ("'" + k + "'") in s, k + ' missing'
with io.open(p, 'w', encoding='utf-8', newline='') as f:
    f.write(s)
print('specimens entries + categories OK')

# ========== 2. curriculum：union + meta + order + categories ==========
p = 'lib/curriculum.ts'
s = io.open(p, encoding='utf-8').read()
assert "'cellFateLab'" not in s

old = "  | 'enzyme'\n"
assert s.count(old) == 1, 'union'
s = s.replace(old, old + "  | 'cellFateLab'\n", 1)

anchor = "  whaleFall: {\n"
assert s.count(anchor) == 1, 'meta anchor'
meta = """  cellFateLab: {
    title: '细胞的命运：衰老、凋亡与癌变',
    kicker: '必修 1 · 细胞的生命历程',
    description: '三种命运一键切换：衰老五大特征、凋亡的有序退场、癌变与免疫监视的攻防。',
    relatedBook: 'molecules',
    relatedModule: '细胞增殖、分化与衰老',
  },
"""
s = s.replace(anchor, meta + anchor, 1)

# order：必修1 段——找 'cellSizeTransport' 后
old = "  'cellSizeTransport',\n"
assert s.count(old) == 1, 'order anchor'
s = s.replace(old, old + "  'cellFateLab',\n", 1)

# categories：'细胞与膜'（找含 mitosisObservation 的行内 ids 后加）
m = re.search(r"(\{ name: '细胞与膜', icon: '[^']*', ids: \[[^\]]*?)mitosisObservation(\] \})", s)
assert m, 'cat anchor'
s = s.replace(m.group(0), m.group(1) + 'mitosisObservation, \'cellFateLab\'' + m.group(2), 1)
wr = io.open(p, 'w', encoding='utf-8', newline='')
wr.write(s)
wr.close()
print('curriculum OK')
