# -*- coding: utf-8 -*-
import io, re

# ========== 1. specimens.tsx：删 3 行 Svg 字段 ==========
p = 'components/cells/specimens.tsx'
s = io.open(p, encoding='utf-8').read()
for name in ['CellSenescenceSvg', 'HbvSvg', 'EnzymeInhibitionSvg']:
    line = f'    Svg: {name},\n'
    assert s.count(line) == 1, name
    s = s.replace(line, '', 1)
with io.open(p, 'w', encoding='utf-8', newline='') as f:
    f.write(s)
print('Svg fields removed')

# ========== 2. curriculum：union + meta + order ==========
p = 'lib/curriculum.ts'
s = io.open(p, encoding='utf-8').read()
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

old = "  'cellSizeTransport',\n"
assert s.count(old) == 1, 'order anchor'
s = s.replace(old, old + "  'cellFateLab',\n", 1)
with io.open(p, 'w', encoding='utf-8', newline='') as f:
    f.write(s)
print('curriculum complete')

# ========== 3. lib/art-links.ts：图谱互链映射 ==========
art_links = """import type { ExperimentId } from '@/lib/curriculum';

/** 实验 -> 相关图解标本（与实验页"相关图解"一致） */
export const EXPERIMENT_DIAGRAMS: Partial<Record<ExperimentId, string[]>> = {
  urineGlucoseTest: ['nephron'],
  bloodLayers: ['bloodCells'],
  goutUricAcid: ['nephron'],
  germinationConditions: ['seedCompare'],
  phageTherapy: ['phage'],
  ecoStability: ['ecosystemTypes'],
  pcr: ['pcrStages'],
  cellFateLab: ['cellSenescence', 'apoptosisVsNecrosis', 'cancerCell', 'telomere'],
  mulberryFishPond: ['sangjiPondCycle', 'carbonCycle'],
  ecosystemJar: ['carbonCycle'],
  brainRegions: ['brainStructure'],
  stressResponse: ['adrenal'],
  bloodDialysis: ['nephron'],
  coralBleaching: ['coral'],
  impulse: ['nervePotential'],
  conditionedReflex: ['brainStructure'],
  humanTraits: ['karyotype'],
  transplantRejection: ['immuneOrgans'],
  autoimmune: ['threeDefenseLines'],
  threeDefenses: ['threeDefenseLines'],
  vaccineResponse: ['immuneOrgans'],
  polygenicTraits: ['karyotype'],
  agrobacterium: [],
  coral: [],
};

/** 标本 -> 引用它的实验列表（图鉴页互链用） */
export function experimentsForSpecimen(specimenId: string): { id: ExperimentId; title: string }[] {
  const out: { id: ExperimentId; title: string }[] = [];
  const meta = (experimentsMeta() as Record<string, { title: string }>);
  for (const [expId, ids] of Object.entries(EXPERIMENT_DIAGRAMS)) {
    if (ids?.includes(specimenId)) {
      const t = meta[expId]?.title;
      if (t) out.push({ id: expId as ExperimentId, title: t });
    }
  }
  return out;
}

// 延迟获取 experimentMeta，避免 lib/curriculum 大模块被图鉴页外的场景提前拉入
function experimentsMeta(): unknown {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return (require('@/lib/curriculum') as { experimentMeta: Record<string, { title: string }> }).experimentMeta;
}
"""
with io.open('lib/art-links.ts', 'w', encoding='utf-8', newline='') as f:
    f.write(art_links)
print('art-links created')

# ========== 4. lab-client：icons/loaders/export DIAGRAMS 改 import ==========
p = 'app/lab/lab-client.tsx'
s = io.open(p, encoding='utf-8').read()
old = "  enzyme: FlaskConical,\n"
assert s.count(old) == 1, 'icon anchor'
s = s.replace(old, old + "  cellFateLab: Layers,\n", 1)

s = s.replace('const EXPERIMENT_DIAGRAMS: Partial<Record<ExperimentId, string[]>> = {', 'const LOCAL_DIAGRAMS: Partial<Record<ExperimentId, string[]>> = {', 1)
# 合并本地与 art-links 的表（本地表保留避免遗漏，import 共享表）
s = s.replace(
  "import { EXPERIMENT_CATEGORIES, experimentMeta, experimentOrder, textbooks, type ExperimentId } from '@/lib/curriculum';",
  "import { EXPERIMENT_CATEGORIES, experimentMeta, experimentOrder, textbooks, type ExperimentId } from '@/lib/curriculum';\nimport { EXPERIMENT_DIAGRAMS as SHARED_DIAGRAMS } from '@/lib/art-links';", 1)
m = re.search(r"const LOCAL_DIAGRAMS: Partial<Record<ExperimentId, string\[\]>> = \{[\s\S]*?\n\};\n", s)
assert m, 'local diagrams'
merged = m.group(0) + "\nconst EXPERIMENT_DIAGRAMS: Partial<Record<ExperimentId, string[]>> = { ...SHARED_DIAGRAMS, ...LOCAL_DIAGRAMS };\n"
s = s.replace(m.group(0), merged, 1)

m2 = re.search(r"  enzyme: \(\) => import\('@/components/lab/enzyme-lab'\)\.then\(\(\{ EnzymeLab \}\) => \(\{ default: EnzymeLab \}\)\),\n", s)
assert m2, 'loader'
s = s.replace(m2.group(0), m2.group(0) + "  cellFateLab: () => import('@/components/lab/cell-fate-lab').then(({ CellFateLab }) => ({ default: CellFateLab })),\n", 1)
with io.open(p, 'w', encoding='utf-8', newline='') as f:
    f.write(s)
print('lab-client OK')

# ========== 5. specimen-card：加"在图鉴查看"链接 ==========
p = 'components/cells/specimen-card.tsx'
s = io.open(p, encoding='utf-8').read()
old = """      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-[#37352f]">🖼 {specimen.name}</h3>
        <p className="text-xs text-gray-500">{specimen.kicker}</p>
      </div>"""
new = """      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-[#37352f]">🖼 {specimen.name}</h3>
        <a
          href={(typeof window !== 'undefined' && window.location.hash.startsWith('#/') ? '#/cells?specimen=' : '/cells?specimen=') + specimen.id}
          className="text-xs font-medium text-[#2eaadc] underline-offset-2 hover:underline"
        >
          在图鉴中查看 →
        </a>
        <p className="w-full text-xs text-gray-500">{specimen.kicker}</p>
      </div>"""
assert s.count(old) == 1, 'card link'
s = s.replace(old, new, 1)
with io.open(p, 'w', encoding='utf-8', newline='') as f:
    f.write(s)
print('specimen-card OK')
