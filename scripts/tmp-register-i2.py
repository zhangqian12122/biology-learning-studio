# -*- coding: utf-8 -*-
p = 'components/cells/specimens.tsx'
s = open(p, encoding='utf-8').read()

anchor = "    Svg: ThreeDefenseLinesSvg,\n  },"
add = """    Svg: ThreeDefenseLinesSvg,
  },
  {
    id: 'sangjiPondCycle',
    name: '桑基鱼塘物质循环',
    kicker: '课外拓展 · 生态农业',
    intro: '我国传统生态农业的智慧：桑叶喂蚕、蚕沙喂鱼、塘泥肥桑——"废物"变资源，物质循环利用。',
    parts: [
      { name: '桑树（生产者）', desc: '固定的太阳能是系统总能量来源；桑叶喂蚕开启物质流动。' },
      { name: '蚕与蚕沙', desc: '蚕吃桑叶长大；蚕沙（粪便）和蚕蛹投入鱼塘喂鱼——上一环节的"废物"成了资源。' },
      { name: '鱼塘（消费者）', desc: '鱼类取食蚕沙和浮游生物；鱼粪残饵沉入塘底与微生物一起形成肥沃塘泥。' },
      { name: '塘泥还田', desc: '塘泥富含无机盐，挖出施回桑田——物质回到生产者，完成循环。' },
      { name: '核心考点', desc: '循环利用的是物质；能量单向流动逐级递减不能循环，需太阳能持续输入。' },
    ],
    extension: true,
    Svg: SangjiPondCycleSvg,
  },
  {
    id: 'angiospermLife',
    name: '被子植物的一生',
    kicker: '课外拓展 · 植物生活史',
    intro: '从一粒种子到满树果实：萌发、生长、开花、传粉受精、结果——被子植物完整的一生。',
    parts: [
      { name: '种子萌发', desc: '自身条件：胚完整有活力；外界条件：水分、适宜温度、充足空气（不需要光）。' },
      { name: '幼苗生长', desc: '胚根发育成根、胚芽发育成茎叶——营养生长阶段为开花结果积蓄养分。' },
      { name: '开花与传粉', desc: '花粉落到雌蕊柱头上（自花或异花传粉），萌发出花粉管。' },
      { name: '受精与果实', desc: '受精后子房发育成果实、胚珠发育成种子；双受精是被子植物特有的现象。' },
      { name: '一生循环', desc: '种子再萌发长成新植株——被子植物用种子度过不良环境，是最高等的植物类群。' },
    ],
    extension: true,
    Svg: AngiospermLifeSvg,
  },"""
assert anchor in s, 'SPECIMENS anchor missing'
s = s.replace(anchor, add, 1)

old1 = "'monoclonalAntibody', 'threeDefenseLines', 'waterSaltBalance']"
new1 = "'monoclonalAntibody', 'threeDefenseLines', 'waterSaltBalance', 'sangjiPondCycle']"
assert old1 in s, 'cat1 missing'
s = s.replace(old1, new1)

old2 = "'cornReproduction', 'fruitAndSeed']"
new2 = "'cornReproduction', 'fruitAndSeed', 'angiospermLife']"
assert old2 in s, 'cat2 missing'
s = s.replace(old2, new2)

open(p, 'w', encoding='utf-8').write(s)
print('registered specimens OK')
