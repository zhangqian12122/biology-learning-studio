import { experimentMeta, type ExperimentId } from '@/lib/curriculum';

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
};

/** 标本 -> 引用它的实验列表（图鉴页互链用） */
export function experimentsForSpecimen(specimenId: string): { id: ExperimentId; title: string }[] {
  const out: { id: ExperimentId; title: string }[] = [];
  for (const [expId, ids] of Object.entries(EXPERIMENT_DIAGRAMS)) {
    if (ids?.includes(specimenId)) {
      const t = experimentMeta[expId as ExperimentId]?.title;
      if (t) out.push({ id: expId as ExperimentId, title: t });
    }
  }
  return out;
}
