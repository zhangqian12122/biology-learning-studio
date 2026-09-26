'use client';

import { lazy, Suspense, useEffect, useRef, useState, type ComponentType, type LazyExoticComponent } from 'react';
import {
  Activity,
  Wind,
  Heart,
  Pill,
  Sun,
  Syringe,
  Thermometer,
  Baby,
  Bird,
  Bubbles,
  Dices,
  Dna,
  Drumstick,
  Droplet,
  Droplets,
  Fish,
  Flame,
  Flower2,
  FlaskConical,
  FlaskRound,
  KeyRound,
  Leaf,
  Layers,
  LineChart,
  LayoutGrid,
  Lightbulb,
  Microscope,
  Network,
  Palette,
  RefreshCw,
  Recycle,
  ClipboardCheck,
  Repeat,
  Ruler,
  Scissors,
  Search,
  Sprout,
  Target,
  UtensilsCrossed,
  TestTubes,
  TrendingUp,
  TestTube2,
  Users,
  Waves,
  X,
  Zap,
  Wine,
} from 'lucide-react';

import { EXPERIMENT_CATEGORIES, experimentMeta, experimentOrder, textbooks, type ExperimentId } from '@/lib/curriculum';
import { markExperimentSeen, useSeenProgress } from '@/lib/progress';

const EXPERIMENT_ICONS: Record<ExperimentId, ComponentType<{ className?: string }>> = {
  microscope: Microscope,
  tissueDetection: TestTubes,
  cellMembranePrep: Droplet,
  chloroplastStreaming: Waves,
  dnaRnaDistribution: Dna,
  cellSizeTransport: Ruler,
  enzyme: FlaskConical,
  catalase: Flame,
  amylaseSpecificity: KeyRound,
  yeastRespiration: Bubbles,
  photosynthesis: Sprout,
  pigment: Palette,
  mitosisObservation: Target,
  traitSeparation: Dices,
  dihybridSim: Dices,
  sexLinkedCross: Users,
  leafDecompose: Recycle,
  bloodType: Droplet,
  urineFormation: Droplets,
  bloodDialysis: Recycle,
  nuclearTransfer: Baby,
  lacOperon: KeyRound,
  crispr: Scissors,
  geneTherapy: Heart,
  photosynthesisFactors: Sun,
  restrictionEnzyme: Scissors,
  greenhouseGas: Lightbulb,
  vaccineResponse: Syringe,
  phototropism: Sun,
  antibioticResistance: Pill,
  ecologicalNiche: Target,
  foodChain: Waves,
  pasteurFlask: FlaskRound,
  cellRespiration: Activity,
  engelmann: Palette,
  waterBalance: Droplet,
  breathingMechanics: Wind,
  neuronTypes: Network,
  bloodLayers: Layers,
  hybridoma: FlaskRound,
  gelElectrophoresis: Ruler,
  proteinEngineering: Target,
  protoplastFusion: Flower2,
  animalCellCulture: Bubbles,
  biocontrol: Sprout,
  stemCellTherapy: RefreshCw,
  photosynthesisHistory: Lightbulb,
  geneticsHistory: Dna,
  foodPreserve: Flame,
  dnaFingerprint: Search,
  bloodPressure: Activity,
  gravitropism: RefreshCw,
  waterQuality: Waves,
  carTherapy: Zap,
  circadianRhythm: Sun,
  predatorPrey: TrendingUp,
  biomagnification: Recycle,
  hydroponics: Sprout,
  balancedDiet: Drumstick,
  immobilizedEnzyme: FlaskConical,
  humanGenome: Dna,
  grafting: Scissors,
  carbonCycleSim: Recycle,
  conditionedReflex: Repeat,
  allergySim: Pill,
  bloodFlow: Heart,
  bloodRoutine: ClipboardCheck,
  ecoStability: Waves,
  algalBloom: Droplet,
  energyBalance: Flame,
  rhIncompatibility: Baby,
  hibernation: Thermometer,
  gauseCompetition: Users,
  imprinting: Bird,
  bipedalCosts: Ruler,
  synapseDrug: Pill,
  humanTraits: Users,
  invasiveSim: X,
  geneticDrift: Dices,
  altitudeAdaptation: Activity,
  stressResponse: Flame,
  epigenetics: Lightbulb,
  oxygenation: Leaf,
  nitrogenFixation: Sprout,
  ecoFootprint: Leaf,
  transplantRejection: Heart,
  autoimmune: Target,
  whaleFall: Fish,
  netPhotosynthesis: Leaf,
  goutUricAcid: Pill,
  germinationConditions: Sprout,
  phageTherapy: X,
  msgFermentation: Wine,
  threeDefenses: KeyRound,
  digestionJourney: UtensilsCrossed,
  birdBreathing: Bird,
  birdMigration: Bird,
  transpiration: Droplets,
  photoperiodism: Sun,
  crossingOver: Scissors,
  polygenicTraits: Ruler,
  apicalDominance: Sprout,
  doubleFertilization: Flower2,
  quadratMethod: LayoutGrid,
  urineGlucoseTest: TestTube2,
  plateStreak: FlaskConical,
  wineVinegar: Wine,
  tissueCulture: LineChart,
  auxinCutting: Flower2,
  yeastPopulation: LineChart,
  lowTempPolyploid: Layers,
  meiosisSlide: Microscope,
  bloodSugarRegulation: Droplets,
  soilFaunaSurvey: Sprout,
  pickleFerment: UtensilsCrossed,
  plasmolysis: Droplets,
  genetics: Dna,
  dogma: Network,
  selection: Bird,
  impulse: Zap,
  brainRegions: Network,
  energy: Leaf,
  population: TrendingUp,
  geneEngine: Scissors,
  agrobacterium: Dna,
  dnaExtract: FlaskRound,
  pcr: Repeat,
  reflexArc: Zap,
  thyroidAxis: Activity,
  thermoRegulation: Thermometer,
  markRecapture: Target,
  succession: Sprout,
  dnaReplication: Dna,
  geneticPedigree: Users,
  ecosystemJar: Fish,
  coralBleaching: Thermometer,
  embryoTransfer: Baby,
  phageExperiment: Network,
  breedingDesigner: Scissors,
  millerUrey: FlaskConical,
  sirModel: Activity,
  choiceMedia: TestTube2,
  chromosomeVariation: Layers,
  geneFrequency: LineChart,
  mulberryFishPond: Recycle,
  experimentDesigner: ClipboardCheck,
  dilutionPlating: LayoutGrid,
};

/** 实验组件按需加载：目录页只载入目录本身，点开实验才拉取对应代码块。 */
const EXPERIMENT_LOADERS: Record<ExperimentId, () => Promise<{ default: ComponentType }>> = {
  microscope: () => import('@/components/lab/microscope-lab').then(({ MicroscopeLab }) => ({ default: MicroscopeLab })),
  tissueDetection: () => import('@/components/lab/tissue-detection-lab').then(({ TissueDetectionLab }) => ({ default: TissueDetectionLab })),
  cellMembranePrep: () => import('@/components/lab/cell-membrane-prep-lab').then(({ CellMembranePrepLab }) => ({ default: CellMembranePrepLab })),
  chloroplastStreaming: () => import('@/components/lab/chloroplast-streaming-lab').then(({ ChloroplastStreamingLab }) => ({ default: ChloroplastStreamingLab })),
  dnaRnaDistribution: () => import('@/components/lab/dna-rna-distribution-lab').then(({ DnaRnaDistributionLab }) => ({ default: DnaRnaDistributionLab })),
  cellSizeTransport: () => import('@/components/lab/cell-size-transport-lab').then(({ CellSizeTransportLab }) => ({ default: CellSizeTransportLab })),
  enzyme: () => import('@/components/lab/enzyme-lab').then(({ EnzymeLab }) => ({ default: EnzymeLab })),
  catalase: () => import('@/components/lab/catalase-lab').then(({ CatalaseLab }) => ({ default: CatalaseLab })),
  amylaseSpecificity: () => import('@/components/lab/amylase-specificity-lab').then(({ AmylaseSpecificityLab }) => ({ default: AmylaseSpecificityLab })),
  yeastRespiration: () => import('@/components/lab/yeast-respiration-lab').then(({ YeastRespirationLab }) => ({ default: YeastRespirationLab })),
  photosynthesis: () => import('@/components/lab/photosynthesis-lab').then(({ PhotosynthesisLab }) => ({ default: PhotosynthesisLab })),
  pigment: () => import('@/components/lab/pigment-lab').then(({ PigmentLab }) => ({ default: PigmentLab })),
  mitosisObservation: () => import('@/components/lab/mitosis-observation-lab').then(({ MitosisObservationLab }) => ({ default: MitosisObservationLab })),
  traitSeparation: () => import('@/components/lab/trait-separation-lab').then(({ TraitSeparationLab }) => ({ default: TraitSeparationLab })),
  dihybridSim: () => import('@/components/lab/dihybrid-sim-lab').then(({ DihybridSimLab }) => ({ default: DihybridSimLab })),
  sexLinkedCross: () => import('@/components/lab/sex-linked-cross-lab').then(({ SexLinkedCrossLab }) => ({ default: SexLinkedCrossLab })),
  leafDecompose: () => import('@/components/lab/leaf-decompose-lab').then(({ LeafDecomposeLab }) => ({ default: LeafDecomposeLab })),
  bloodType: () => import('@/components/lab/blood-type-lab').then(({ BloodTypeLab }) => ({ default: BloodTypeLab })),
  urineFormation: () => import('@/components/lab/urine-formation-lab').then(({ UrineFormationLab }) => ({ default: UrineFormationLab })),
  bloodDialysis: () => import('@/components/lab/blood-dialysis-lab').then(({ BloodDialysisLab }) => ({ default: BloodDialysisLab })),
  nuclearTransfer: () => import('@/components/lab/nuclear-transfer-lab').then(({ NuclearTransferLab }) => ({ default: NuclearTransferLab })),
  lacOperon: () => import('@/components/lab/lac-operon-lab').then(({ LacOperonLab }) => ({ default: LacOperonLab })),
  crispr: () => import('@/components/lab/crispr-lab').then(({ CrisprLab }) => ({ default: CrisprLab })),
  geneTherapy: () => import('@/components/lab/gene-therapy-lab').then(({ GeneTherapyLab }) => ({ default: GeneTherapyLab })),
  restrictionEnzyme: () => import('@/components/lab/restriction-enzyme-lab').then(({ RestrictionEnzymeLab }) => ({ default: RestrictionEnzymeLab })),
  greenhouseGas: () => import('@/components/lab/greenhouse-gas-lab').then(({ GreenhouseGasLab }) => ({ default: GreenhouseGasLab })),
  vaccineResponse: () => import('@/components/lab/vaccine-response-lab').then(({ VaccineResponseLab }) => ({ default: VaccineResponseLab })),
  phototropism: () => import('@/components/lab/phototropism-lab').then(({ PhototropismLab }) => ({ default: PhototropismLab })),
  antibioticResistance: () => import('@/components/lab/antibiotic-resistance-lab').then(({ AntibioticResistanceLab }) => ({ default: AntibioticResistanceLab })),
  ecologicalNiche: () => import('@/components/lab/ecological-niche-lab').then(({ EcologicalNicheLab }) => ({ default: EcologicalNicheLab })),
  foodChain: () => import('@/components/lab/food-chain-lab').then(({ FoodChainLab }) => ({ default: FoodChainLab })),
  pasteurFlask: () => import('@/components/lab/pasteur-flask-lab').then(({ PasteurFlaskLab }) => ({ default: PasteurFlaskLab })),
  cellRespiration: () => import('@/components/lab/cell-respiration-lab').then(({ CellRespirationLab }) => ({ default: CellRespirationLab })),
  engelmann: () => import('@/components/lab/engelmann-lab').then(({ EngelmannLab }) => ({ default: EngelmannLab })),
  waterBalance: () => import('@/components/lab/water-balance-lab').then(({ WaterBalanceLab }) => ({ default: WaterBalanceLab })),
  breathingMechanics: () => import('@/components/lab/breathing-mechanics-lab').then(({ BreathingMechanicsLab }) => ({ default: BreathingMechanicsLab })),
  neuronTypes: () => import('@/components/lab/neuron-types-lab').then(({ NeuronTypesLab }) => ({ default: NeuronTypesLab })),
  bloodLayers: () => import('@/components/lab/blood-layers-lab').then(({ BloodLayersLab }) => ({ default: BloodLayersLab })),
  hybridoma: () => import('@/components/lab/hybridoma-lab').then(({ HybridomaLab }) => ({ default: HybridomaLab })),
  gelElectrophoresis: () => import('@/components/lab/gel-electrophoresis-lab').then(({ GelElectrophoresisLab }) => ({ default: GelElectrophoresisLab })),
  proteinEngineering: () => import('@/components/lab/protein-engineering-lab').then(({ ProteinEngineeringLab }) => ({ default: ProteinEngineeringLab })),
  protoplastFusion: () => import('@/components/lab/protoplast-fusion-lab').then(({ ProtoplastFusionLab }) => ({ default: ProtoplastFusionLab })),
  animalCellCulture: () => import('@/components/lab/animal-cell-culture-lab').then(({ AnimalCellCultureLab }) => ({ default: AnimalCellCultureLab })),
  biocontrol: () => import('@/components/lab/biocontrol-lab').then(({ BiocontrolLab }) => ({ default: BiocontrolLab })),
  stemCellTherapy: () => import('@/components/lab/stem-cell-therapy-lab').then(({ StemCellTherapyLab }) => ({ default: StemCellTherapyLab })),
  photosynthesisHistory: () => import('@/components/lab/photosynthesis-history-lab').then(({ PhotosynthesisHistoryLab }) => ({ default: PhotosynthesisHistoryLab })),
  geneticsHistory: () => import('@/components/lab/genetics-history-lab').then(({ GeneticsHistoryLab }) => ({ default: GeneticsHistoryLab })),
  foodPreserve: () => import('@/components/lab/food-preserve-lab').then(({ FoodPreserveLab }) => ({ default: FoodPreserveLab })),
  dnaFingerprint: () => import('@/components/lab/dna-fingerprint-lab').then(({ DnaFingerprintLab }) => ({ default: DnaFingerprintLab })),
  bloodPressure: () => import('@/components/lab/blood-pressure-lab').then(({ BloodPressureLab }) => ({ default: BloodPressureLab })),
  gravitropism: () => import('@/components/lab/gravitropism-lab').then(({ GravitropismLab }) => ({ default: GravitropismLab })),
  waterQuality: () => import('@/components/lab/water-quality-lab').then(({ WaterQualityLab }) => ({ default: WaterQualityLab })),
  carTherapy: () => import('@/components/lab/car-therapy-lab').then(({ CarTherapyLab }) => ({ default: CarTherapyLab })),
  circadianRhythm: () => import('@/components/lab/circadian-rhythm-lab').then(({ CircadianRhythmLab }) => ({ default: CircadianRhythmLab })),
  predatorPrey: () => import('@/components/lab/predator-prey-lab').then(({ PredatorPreyLab }) => ({ default: PredatorPreyLab })),
  biomagnification: () => import('@/components/lab/biomagnification-lab').then(({ BiomagnificationLab }) => ({ default: BiomagnificationLab })),
  hydroponics: () => import('@/components/lab/hydroponics-lab').then(({ HydroponicsLab }) => ({ default: HydroponicsLab })),
  balancedDiet: () => import('@/components/lab/balanced-diet-lab').then(({ BalancedDietLab }) => ({ default: BalancedDietLab })),
  immobilizedEnzyme: () => import('@/components/lab/immobilized-enzyme-lab').then(({ ImmobilizedEnzymeLab }) => ({ default: ImmobilizedEnzymeLab })),
  humanGenome: () => import('@/components/lab/human-genome-lab').then(({ HumanGenomeLab }) => ({ default: HumanGenomeLab })),
  grafting: () => import('@/components/lab/grafting-lab').then(({ GraftingLab }) => ({ default: GraftingLab })),
  carbonCycleSim: () => import('@/components/lab/carbon-cycle-sim-lab').then(({ CarbonCycleSimLab }) => ({ default: CarbonCycleSimLab })),
  conditionedReflex: () => import('@/components/lab/conditioned-reflex-lab').then(({ ConditionedReflexLab }) => ({ default: ConditionedReflexLab })),
  allergySim: () => import('@/components/lab/allergy-sim-lab').then(({ AllergySimLab }) => ({ default: AllergySimLab })),
  bloodFlow: () => import('@/components/lab/blood-flow-lab').then(({ BloodFlowLab }) => ({ default: BloodFlowLab })),
  bloodRoutine: () => import('@/components/lab/blood-routine-lab').then(({ BloodRoutineLab }) => ({ default: BloodRoutineLab })),
  ecoStability: () => import('@/components/lab/eco-stability-lab').then(({ EcoStabilityLab }) => ({ default: EcoStabilityLab })),
  algalBloom: () => import('@/components/lab/algal-bloom-lab').then(({ AlgalBloomLab }) => ({ default: AlgalBloomLab })),
  energyBalance: () => import('@/components/lab/energy-balance-lab').then(({ EnergyBalanceLab }) => ({ default: EnergyBalanceLab })),
  rhIncompatibility: () => import('@/components/lab/rh-incompatibility-lab').then(({ RhIncompatibilityLab }) => ({ default: RhIncompatibilityLab })),
  hibernation: () => import('@/components/lab/hibernation-lab').then(({ HibernationLab }) => ({ default: HibernationLab })),
  gauseCompetition: () => import('@/components/lab/gause-competition-lab').then(({ GauseCompetitionLab }) => ({ default: GauseCompetitionLab })),
  imprinting: () => import('@/components/lab/imprinting-lab').then(({ ImprintingLab }) => ({ default: ImprintingLab })),
  bipedalCosts: () => import('@/components/lab/bipedal-costs-lab').then(({ BipedalCostsLab }) => ({ default: BipedalCostsLab })),
  synapseDrug: () => import('@/components/lab/synapse-drug-lab').then(({ SynapseDrugLab }) => ({ default: SynapseDrugLab })),
  humanTraits: () => import('@/components/lab/human-traits-lab').then(({ HumanTraitsLab }) => ({ default: HumanTraitsLab })),
  invasiveSim: () => import('@/components/lab/invasive-sim-lab').then(({ InvasiveSimLab }) => ({ default: InvasiveSimLab })),
  geneticDrift: () => import('@/components/lab/genetic-drift-lab').then(({ GeneticDriftLab }) => ({ default: GeneticDriftLab })),
  altitudeAdaptation: () => import('@/components/lab/altitude-adaptation-lab').then(({ AltitudeAdaptationLab }) => ({ default: AltitudeAdaptationLab })),
  stressResponse: () => import('@/components/lab/stress-response-lab').then(({ StressResponseLab }) => ({ default: StressResponseLab })),
  epigenetics: () => import('@/components/lab/epigenetics-lab').then(({ EpigeneticsLab }) => ({ default: EpigeneticsLab })),
  oxygenation: () => import('@/components/lab/oxygenation-lab').then(({ OxygenationLab }) => ({ default: OxygenationLab })),
  nitrogenFixation: () => import('@/components/lab/nitrogen-fixation-lab').then(({ NitrogenFixationLab }) => ({ default: NitrogenFixationLab })),
  ecoFootprint: () => import('@/components/lab/eco-footprint-lab').then(({ EcoFootprintLab }) => ({ default: EcoFootprintLab })),
  transplantRejection: () => import('@/components/lab/transplant-rejection-lab').then(({ TransplantRejectionLab }) => ({ default: TransplantRejectionLab })),
  autoimmune: () => import('@/components/lab/autoimmune-lab').then(({ AutoimmuneLab }) => ({ default: AutoimmuneLab })),
  whaleFall: () => import('@/components/lab/whale-fall-lab').then(({ WhaleFallLab }) => ({ default: WhaleFallLab })),
  netPhotosynthesis: () => import('@/components/lab/net-photosynthesis-lab').then(({ NetPhotosynthesisLab }) => ({ default: NetPhotosynthesisLab })),
  goutUricAcid: () => import('@/components/lab/gout-uric-acid-lab').then(({ GoutUricAcidLab }) => ({ default: GoutUricAcidLab })),
  germinationConditions: () => import('@/components/lab/germination-lab').then(({ GerminationLab }) => ({ default: GerminationLab })),
  phageTherapy: () => import('@/components/lab/phage-therapy-lab').then(({ PhageTherapyLab }) => ({ default: PhageTherapyLab })),
  msgFermentation: () => import('@/components/lab/msg-fermentation-lab').then(({ MsgFermentationLab }) => ({ default: MsgFermentationLab })),
  threeDefenses: () => import('@/components/lab/three-defenses-lab').then(({ ThreeDefensesLab }) => ({ default: ThreeDefensesLab })),
  digestionJourney: () => import('@/components/lab/digestion-journey-lab').then(({ DigestionJourneyLab }) => ({ default: DigestionJourneyLab })),
  birdBreathing: () => import('@/components/lab/bird-breathing-lab').then(({ BirdBreathingLab }) => ({ default: BirdBreathingLab })),
  birdMigration: () => import('@/components/lab/bird-migration-lab').then(({ BirdMigrationLab }) => ({ default: BirdMigrationLab })),
  transpiration: () => import('@/components/lab/transpiration-lab').then(({ TranspirationLab }) => ({ default: TranspirationLab })),
  photoperiodism: () => import('@/components/lab/photoperiodism-lab').then(({ PhotoperiodismLab }) => ({ default: PhotoperiodismLab })),
  photosynthesisFactors: () => import('@/components/lab/photosynthesis-factors-lab').then(({ PhotosynthesisFactorsLab }) => ({ default: PhotosynthesisFactorsLab })),
  crossingOver: () => import('@/components/lab/crossing-over-lab').then(({ CrossingOverLab }) => ({ default: CrossingOverLab })),
  polygenicTraits: () => import('@/components/lab/polygenic-traits-lab').then(({ PolygenicTraitsLab }) => ({ default: PolygenicTraitsLab })),
  apicalDominance: () => import('@/components/lab/apical-dominance-lab').then(({ ApicalDominanceLab }) => ({ default: ApicalDominanceLab })),
  doubleFertilization: () => import('@/components/lab/double-fertilization-lab').then(({ DoubleFertilizationLab }) => ({ default: DoubleFertilizationLab })),
  quadratMethod: () => import('@/components/lab/quadrat-method-lab').then(({ QuadratMethodLab }) => ({ default: QuadratMethodLab })),
  urineGlucoseTest: () => import('@/components/lab/urine-glucose-lab').then(({ UrineGlucoseTestLab }) => ({ default: UrineGlucoseTestLab })),
  plateStreak: () => import('@/components/lab/plate-streak-lab').then(({ PlateStreakLab }) => ({ default: PlateStreakLab })),
  wineVinegar: () => import('@/components/lab/wine-vinegar-lab').then(({ WineVinegarLab }) => ({ default: WineVinegarLab })),
  tissueCulture: () => import('@/components/lab/tissue-culture-lab').then(({ TissueCultureLab }) => ({ default: TissueCultureLab })),
  auxinCutting: () => import('@/components/lab/auxin-cutting-lab').then(({ AuxinCuttingLab }) => ({ default: AuxinCuttingLab })),
  yeastPopulation: () => import('@/components/lab/yeast-population-lab').then(({ YeastPopulationLab }) => ({ default: YeastPopulationLab })),
  lowTempPolyploid: () => import('@/components/lab/low-temp-polyploid-lab').then(({ LowTempPolyploidLab }) => ({ default: LowTempPolyploidLab })),
  meiosisSlide: () => import('@/components/lab/meiosis-slide-lab').then(({ MeiosisSlideLab }) => ({ default: MeiosisSlideLab })),
  bloodSugarRegulation: () => import('@/components/lab/blood-sugar-regulation-lab').then(({ BloodSugarRegulationLab }) => ({ default: BloodSugarRegulationLab })),
  soilFaunaSurvey: () => import('@/components/lab/soil-fauna-lab').then(({ SoilFaunaSurveyLab }) => ({ default: SoilFaunaSurveyLab })),
  pickleFerment: () => import('@/components/lab/pickle-lab').then(({ PickleFermentLab }) => ({ default: PickleFermentLab })),
  plasmolysis: () => import('@/components/lab/plasmolysis-lab').then(({ PlasmolysisLab }) => ({ default: PlasmolysisLab })),
  genetics: () => import('@/components/lab/genetics-lab').then(({ GeneticsLab }) => ({ default: GeneticsLab })),
  dogma: () => import('@/components/lab/central-dogma-lab').then(({ CentralDogmaLab }) => ({ default: CentralDogmaLab })),
  selection: () => import('@/components/lab/natural-selection-lab').then(({ NaturalSelectionLab }) => ({ default: NaturalSelectionLab })),
  impulse: () => import('@/components/lab/nerve-impulse-lab').then(({ NerveImpulseLab }) => ({ default: NerveImpulseLab })),
  brainRegions: () => import('@/components/lab/brain-regions-lab').then(({ BrainRegionsLab }) => ({ default: BrainRegionsLab })),
  energy: () => import('@/components/lab/energy-flow-lab').then(({ EnergyFlowLab }) => ({ default: EnergyFlowLab })),
  population: () => import('@/components/lab/population-growth-lab').then(({ PopulationGrowthLab }) => ({ default: PopulationGrowthLab })),
  geneEngine: () => import('@/components/lab/gene-engineering-lab').then(({ GeneEngineLab }) => ({ default: GeneEngineLab })),
  agrobacterium: () => import('@/components/lab/agrobacterium-lab').then(({ AgrobacteriumLab }) => ({ default: AgrobacteriumLab })),
  dnaExtract: () => import('@/components/lab/dna-extraction-lab').then(({ DnaExtractLab }) => ({ default: DnaExtractLab })),
  pcr: () => import('@/components/lab/pcr-lab').then(({ PcrLab }) => ({ default: PcrLab })),
  reflexArc: () => import('@/components/lab/reflex-arc-lab').then(({ ReflexArcLab }) => ({ default: ReflexArcLab })),
  thyroidAxis: () => import('@/components/lab/thyroid-axis-lab').then(({ ThyroidAxisLab }) => ({ default: ThyroidAxisLab })),
  thermoRegulation: () => import('@/components/lab/thermo-regulation-lab').then(({ ThermoRegulationLab }) => ({ default: ThermoRegulationLab })),
  markRecapture: () => import('@/components/lab/mark-recapture-lab').then(({ MarkRecaptureLab }) => ({ default: MarkRecaptureLab })),
  succession: () => import('@/components/lab/succession-lab').then(({ SuccessionLab }) => ({ default: SuccessionLab })),
  dnaReplication: () => import('@/components/lab/dna-replication-lab').then(({ DnaReplicationLab }) => ({ default: DnaReplicationLab })),
  geneticPedigree: () => import('@/components/lab/pedigree-lab').then(({ GeneticPedigreeLab }) => ({ default: GeneticPedigreeLab })),
  ecosystemJar: () => import('@/components/lab/ecosystem-jar-lab').then(({ EcosystemJarLab }) => ({ default: EcosystemJarLab })),
  coralBleaching: () => import('@/components/lab/coral-bleaching-lab').then(({ CoralBleachingLab }) => ({ default: CoralBleachingLab })),
  embryoTransfer: () => import('@/components/lab/embryo-transfer-lab').then(({ EmbryoTransferLab }) => ({ default: EmbryoTransferLab })),
  phageExperiment: () => import('@/components/lab/phage-experiment-lab').then(({ PhageExperimentLab }) => ({ default: PhageExperimentLab })),
  breedingDesigner: () => import('@/components/lab/breeding-lab').then(({ BreedingDesignerLab }) => ({ default: BreedingDesignerLab })),
  millerUrey: () => import('@/components/lab/miller-urey-lab').then(({ MillerUreyLab }) => ({ default: MillerUreyLab })),
  sirModel: () => import('@/components/lab/sir-model-lab').then(({ SirModelLab }) => ({ default: SirModelLab })),
  choiceMedia: () => import('@/components/lab/choice-media-lab').then(({ ChoiceMediaLab }) => ({ default: ChoiceMediaLab })),
  chromosomeVariation: () => import('@/components/lab/chromosome-variation-lab').then(({ ChromosomeVariationLab }) => ({ default: ChromosomeVariationLab })),
  geneFrequency: () => import('@/components/lab/gene-frequency-lab').then(({ GeneFrequencyLab }) => ({ default: GeneFrequencyLab })),
  mulberryFishPond: () => import('@/components/lab/mulberry-fish-pond-lab').then(({ MulberryFishPondLab }) => ({ default: MulberryFishPondLab })),
  experimentDesigner: () => import('@/components/lab/experiment-designer-lab').then(({ ExperimentDesignerLab }) => ({ default: ExperimentDesignerLab })),
  dilutionPlating: () => import('@/components/lab/dilution-plating-lab').then(({ DilutionPlatingLab }) => ({ default: DilutionPlatingLab })),
};

const EXPERIMENT_COMPONENTS = Object.fromEntries(
  (Object.keys(EXPERIMENT_LOADERS) as ExperimentId[]).map((id) => [id, lazy(EXPERIMENT_LOADERS[id])]),
) as Record<ExperimentId, LazyExoticComponent<ComponentType>>;

/** 实验相关的图解（标本卡）：操作过程类图解从图鉴移到对应实验下方展示。 */
const SpecimenCard = lazy(() =>
  import('@/components/cells/specimen-card').then((m) => ({ default: m.SpecimenCard })),
);

const EXPERIMENT_DIAGRAMS: Partial<Record<ExperimentId, string[]>> = {
  mitosisObservation: ['mitosisStages', 'divisionCurve', 'cellCyclePie'],
  meiosisSlide: ['meiosisStages', 'divisionCurve'],
  traitSeparation: ['artificialPollination'],
  genetics: ['artificialPollination'],
  yeastRespiration: ['aerobicRespiration'],
  plasmolysis: ['osmosisSetup'],
  impulse: ['nervePotential'],
  brainRegions: ['brainStructure'],
  photosynthesis: ['photosynthesisProcess'],
  dogma: ['centralDogma'],
  mulberryFishPond: ['sangjiPondCycle', 'carbonCycle'],
  ecosystemJar: ['carbonCycle'],
  coralBleaching: ['coral'],
  bloodDialysis: ['nephron'],
  pcr: ['pcrStages'],
  vaccineResponse: ['humoralImmunity'],
  bloodSugarRegulation: ['waterSaltBalance', 'bloodSugarSources'],
  bloodLayers: ['bloodClotting'],
  hybridoma: ['monoclonalAntibody'],
  proteinEngineering: ['geneticCode'],
  stemCellTherapy: ['stemCells'],
  photosynthesisHistory: ['photosyntheticPigments'],
  geneticsHistory: ['dnaHelix'],
  foodPreserve: ['foodPreservation'],
  bloodPressure: ['vessels'],
  carTherapy: ['cancerCell'],
  gravitropism: ['rootTip'],
  biomagnification: ['bioaccumulation'],
  hydroponics: ['rootTypes'],
  balancedDiet: ['vitamins'],
  immobilizedEnzyme: ['enzymeModel'],
  humanGenome: ['karyotype'],
  grafting: ['fruitAndSeed'],
  carbonCycleSim: ['carbonCycle'],
  conditionedReflex: ['brainStructure'],
  allergySim: ['antibody'],
  bloodFlow: ['heartCirculation'],
  bloodRoutine: ['bloodCells'],
  rhIncompatibility: ['redBloodCell'],
  synapseDrug: ['synapse'],
  humanTraits: ['karyotype'],
  invasiveSim: ['invasiveSpecies'],
  altitudeAdaptation: ['alveolus'],
  stressResponse: ['adrenal'],
  epigenetics: ['dnaHelix'],
  msgFermentation: ['cellTypeCompare'],
  threeDefenses: ['threeDefenseLines'],
  digestionJourney: ['digestiveSystem'],
  birdBreathing: ['alveolus'],
  nitrogenFixation: ['rhizobium'],
  ecoFootprint: ['biosphere'],
  transplantRejection: ['immuneOrgans'],
  autoimmune: ['threeDefenseLines'],
  whaleFall: ['whale'],
  netPhotosynthesis: ['chloroplast'],
  goutUricAcid: ['nephron'],
  germinationConditions: ['seedCompare'],
  phageTherapy: ['phage'],
  ecoStability: ['ecosystemTypes'],
};

/** 目录条目悬停时提前拉取实验代码，点开时几乎零等待。 */
function preloadExperiment(id: ExperimentId) {
  void EXPERIMENT_LOADERS[id]();
}

function LabChunkFallback() {
  return (
    <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-gray-500">
      <span className="inline-block size-2 animate-pulse rounded-[3px] bg-[#2eaadc]" aria-hidden="true" />
      实验加载中…
    </div>
  );
}

/** 目录树：册 → （过滤到该册后的）分类 → 实验。分类可能跨册，按 relatedBook 归位。 */
const BOOK_TREE = textbooks
  .map((book) => ({
    book,
    cats: EXPERIMENT_CATEGORIES
      .map((c) => ({ name: c.name, icon: c.icon, ids: c.ids.filter((id) => experimentMeta[id]?.relatedBook === book.id) }))
      .filter((c) => c.ids.length > 0),
  }))
  .filter((entry) => entry.cats.length > 0);

function locateExperiment(id: ExperimentId) {
  const book = textbooks.find((b) => experimentMeta[id].relatedBook === b.id) ?? null;
  const cat = EXPERIMENT_CATEGORIES.find((c) => c.ids.includes(id)) ?? null;
  return { book, cat };
}

const LAB_KEYFRAMES = `
@keyframes bio-substrate-fly {
  0% { left: -8%; opacity: 0; }
  10% { opacity: 1; }
  40% { left: 44%; }
  50% { left: 46%; transform: translateY(0) scale(1.2); }
  62% { left: 47%; color: #c98a1d; transform: translateY(0) scale(1.1); }
  88% { left: 102%; opacity: 1; }
  100% { left: 106%; opacity: 0; }
}
.bio-substrate { animation-name: bio-substrate-fly; animation-iteration-count: infinite; animation-timing-function: linear; }
@keyframes bio-wobble { 0%, 100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }
.bio-substrate-inner { display: inline-block; animation: bio-wobble 1.1s ease-in-out infinite; }
@keyframes bio-denature { to { transform: scale(1.14) rotate(8deg) skewX(6deg); filter: saturate(0.4); } }
.bio-denatured { animation: bio-denature 0.9s ease forwards; }
@keyframes bio-photon-fall { 0% { transform: translateY(-12px); opacity: 0; } 15% { opacity: 1; } 82% { opacity: 0.9; } 100% { transform: translateY(215px); opacity: 0; } }
.bio-photon { top: -12px; color: #d3a13c; text-shadow: 0 0 7px rgba(211, 161, 60, 0.85); animation: bio-photon-fall linear infinite; }
@keyframes bio-co2-in { 0% { transform: translateX(0); opacity: 0; } 18% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateX(230px); opacity: 0; } }
.bio-co2 { left: 4%; animation: bio-co2-in 4.6s linear infinite; }
@keyframes bio-bubble-rise { 0% { transform: translateY(0) scale(0.7); opacity: 0; } 18% { opacity: 0.95; } 100% { transform: translateY(-88px) scale(1.2); opacity: 0; } }
.bio-bubble { bottom: 26%; animation: bio-bubble-rise ease-out infinite; }
@keyframes bio-sun-in { 0% { transform: translate(0, 0); opacity: 0; } 22% { opacity: 1; } 100% { transform: translate(110px, 36px); opacity: 0; } }
.bio-sun { animation: bio-sun-in 2.2s linear infinite; }
@keyframes bio-energy-drop { 0% { transform: translate(-50%, -4px); opacity: 0; } 14% { opacity: 1; } 82% { opacity: 1; } 100% { transform: translate(-50%, 38px); opacity: 0; } }
.bio-energy { animation: bio-energy-drop linear infinite; }
@keyframes bio-heat-rise { 0% { transform: translate(-50%, 8px); opacity: 0; } 25% { opacity: 0.85; } 100% { transform: translate(calc(-50% + var(--drift, 18px)), -26px); opacity: 0; } }
.bio-heat { animation: bio-heat-rise ease-out infinite; }
@keyframes bio-cell-in { from { opacity: 0; transform: scale(0.55); } to { opacity: 1; transform: scale(1); } }
.bio-cell { animation: bio-cell-in 0.45s ease backwards; }
@keyframes bio-mrna-grow { from { max-width: 0; } to { max-width: 340px; } }
.bio-mrna { animation: bio-mrna-grow 1.7s ease-out forwards; }
@keyframes bio-ribosome-in { from { transform: translateX(-46px); opacity: 0; } to { transform: none; opacity: 1; } }
.bio-ribosome { animation: bio-ribosome-in 0.9s ease; }
@keyframes bio-acid-in { from { transform: translateY(12px) scale(0.4); opacity: 0; } to { transform: none; opacity: 1; } }
.bio-acid { animation: bio-acid-in 0.6s ease backwards; }
@keyframes bio-impulse-right { 0% { transform: translateX(0); opacity: 0; } 10% { opacity: 1; } 82% { opacity: 1; } 100% { transform: translateX(330px); opacity: 0; } }
.bio-impulse-right { animation: bio-impulse-right 1.9s linear forwards; }
@keyframes bio-impulse-left { 0% { transform: translateX(-100%); opacity: 0; } 10% { opacity: 1; } 82% { opacity: 1; } 100% { transform: translateX(calc(-100% - 300px)); opacity: 0; } }
.bio-impulse-left { animation: bio-impulse-left 1.9s linear forwards; }
@keyframes bio-fail-flicker { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.6; } }
.bio-fail { animation: bio-fail-flicker 1.3s ease; }
@keyframes bio-denature-sep-top { from { transform: translateY(8px); } to { transform: translateY(-12px); } }
.bio-denature-top { animation: bio-denature-sep-top 1.1s ease forwards; }
@keyframes bio-denature-sep-bottom { from { transform: translateY(-8px); } to { transform: translateY(14px); } }
.bio-denature-bottom { animation: bio-denature-sep-bottom 1.1s ease forwards; }
@keyframes bio-extend-in { from { width: 14%; } to { width: 100%; } }
.bio-extend { animation: bio-extend-in 1.5s ease forwards; }
@keyframes bio-fade-up { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
.bio-fade { animation: bio-fade-up 0.5s ease; }
/* PCR 退火：上链沉降复位 + 引物结合 */
@keyframes bio-anneal-in { from { transform: translateY(-10px); opacity: 0.55; } to { transform: none; opacity: 1; } }
.bio-anneal { animation: bio-anneal-in 0.9s ease forwards; }
/* 组织检测：滴管滴液、沉淀沉降、水浴沸腾 */
@keyframes bio-drip-fall { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 1; } 85% { opacity: 1; } 100% { transform: translateY(52px); opacity: 0; } }
.bio-drip { animation: bio-drip-fall 0.85s ease-in forwards; }
@keyframes bio-precipitate-sink { from { transform: translateY(-34px); opacity: 0; } 55% { opacity: 1; } to { transform: none; opacity: 1; } }
.bio-precipitate { animation: bio-precipitate-sink 1s ease-in backwards; }
@keyframes bio-boil-rise { 0% { transform: translateY(0) scale(0.7); opacity: 0; } 22% { opacity: 0.9; } 100% { transform: translateY(-14px) scale(1.15); opacity: 0; } }
.bio-boil { animation: bio-boil-rise ease-out infinite; }
/* 过氧化氢分解：管内氧气泡 + 卫生香复燃 */
@keyframes bio-gas-rise { 0% { transform: translateY(0) scale(0.6); opacity: 0; } 15% { opacity: 0.9; } 100% { transform: translateY(-52px) scale(1.1); opacity: 0; } }
.bio-gas { animation: bio-gas-rise ease-out infinite; }
@keyframes bio-flame-burst { 0% { transform: scale(0); opacity: 0; } 18% { transform: scale(1.18); opacity: 1; } 34% { transform: scale(0.9); } 52% { transform: scale(1.1); } 74% { transform: scale(0.95); } 100% { transform: scale(1); opacity: 1; } }
.bio-flame { animation: bio-flame-burst 1.1s ease forwards; transform-origin: 50% 100%; }
/* 色素分离：画线 + 色素带迁移 */
@keyframes bio-draw-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.bio-draw { animation: bio-draw-line 0.8s ease-out forwards; transform-origin: left center; }
@keyframes bio-band-migrate { from { transform: translateY(0); opacity: 0.25; } 12% { opacity: 1; } to { transform: translateY(var(--band-rise, -100px)); opacity: 1; } }
.bio-band { animation: bio-band-migrate 6.5s cubic-bezier(0.22, 0.61, 0.36, 1) forwards; }
/* 基因工程：限制酶剪切、杂交带发光 */
@keyframes bio-snip-pulse { 0% { transform: scale(1); } 40% { transform: scale(1.4) rotate(-14deg); } 100% { transform: scale(1); } }
.bio-snip { animation: bio-snip-pulse 0.9s ease; }
@keyframes bio-hybrid-glow { 0% { fill: #7fa6bd; } 45% { fill: #f4d06a; } 100% { fill: #f4d06a; } }
.bio-hybrid { animation: bio-hybrid-glow 1.5s ease forwards; }
@keyframes bio-worm-crawl { 0%, 100% { transform: translateX(0) scaleY(1); } 50% { transform: translateX(13px) scaleY(0.75); } }
.bio-worm { animation: bio-worm-crawl 1.7s ease-in-out infinite; }
/* DNA 粗提取：玻璃棒同向慢搅 */
@keyframes bio-stir-sway { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(8deg); } }
.bio-stir { animation: bio-stir-sway 2s ease-in-out infinite; }
/* 细胞质环流 / 错误抖动 / 弹入 */
@keyframes bio-stream-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.bio-stream-orbit { animation-name: bio-stream-orbit; animation-iteration-count: infinite; animation-timing-function: linear; }
@keyframes bio-shake-x { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
.bio-shake { animation: bio-shake-x 0.35s ease; }
@keyframes bio-pop-in { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.bio-pop { animation: bio-pop-in 0.6s ease; }
@media (prefers-reduced-motion: reduce) {
  .bio-substrate, .bio-substrate-inner, .bio-photon, .bio-co2, .bio-bubble, .bio-sun,
  .bio-energy, .bio-heat, .bio-impulse-right, .bio-impulse-left, .bio-boil, .bio-gas,
  .bio-worm, .bio-stir, .bio-stream-orbit { animation-iteration-count: 1; }
}
`;

export function LabClient() {
  // 深链：/lab?exp=xxx 直达某个实验（知识图谱跳转用）
  const [activeExperiment, setActiveExperiment] = useState<ExperimentId>(() => {
    if (typeof window === 'undefined') return 'enzyme';
    const want = new URLSearchParams(window.location.search).get('exp');
    return want && want in experimentMeta ? (want as ExperimentId) : 'enzyme';
  });
  const [resetCount, setResetCount] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  /** 桌面目录：展开的册与分类 */
  const [openBooks, setOpenBooks] = useState<string[]>([]);
  const [openCats, setOpenCats] = useState<string[]>([]);
  /** ≥1024px 切换为「左目录 + 右内容」双栏；SSR 先按窄屏渲染 */
  const [isWide, setIsWide] = useState(false);
  const currentItemRef = useRef<HTMLButtonElement | null>(null);
  const seenProgress = useSeenProgress();

  // useLayoutEffect：在浏览器绘制前完成断点切换，桌面刷新不闪烁、SSR 亦无 hydration 冲突
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const experiment = experimentMeta[activeExperiment];
  const ExperimentIcon = EXPERIMENT_ICONS[activeExperiment];
  const ActiveExperiment = EXPERIMENT_COMPONENTS[activeExperiment];

  const searchLower = search.trim().toLowerCase();
  // 搜索时在全目录中匹配（忽略分类筛选），否则按分类显示
  const visibleIds = (searchLower
    ? experimentOrder
    : categoryFilter != null
      ? (EXPERIMENT_CATEGORIES.find((c) => c.name === categoryFilter)?.ids ?? experimentOrder)
      : experimentOrder
  ).filter((id) => {
    if (!searchLower) return true;
    const meta = experimentMeta[id];
    return `${meta.title} ${meta.description} ${meta.kicker}`.toLowerCase().includes(searchLower);
  });

  // 目录：切换实验时自动展开其所在册与分类
  useEffect(() => {
    const { book, cat } = locateExperiment(activeExperiment);
    if (book) setOpenBooks((prev) => (prev.includes(book.id) ? prev : [...prev, book.id]));
    if (cat) setOpenCats((prev) => (prev.includes(cat.name) ? prev : [...prev, cat.name]));
  }, [activeExperiment]);

  // 浏览器后退/前进：按地址栏同步选中的实验
  useEffect(() => {
    const onPop = () => {
      const want = new URLSearchParams(window.location.search).get('exp');
      if (want && want in experimentMeta) {
        setActiveExperiment(want as ExperimentId);
        setResetCount((count) => count + 1);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // 当前条目自动滚入视野
  useEffect(() => {
    currentItemRef.current?.scrollIntoView({ block: 'nearest' });
  }, [activeExperiment, isWide]);

  const pickExperiment = (id: ExperimentId) => {
    setActiveExperiment(id);
    preloadExperiment(id);
    markExperimentSeen(id);
    // 切换实验时同步地址栏：?exp=<id> 可分享、刷新不丢
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('exp', id);
      window.history.pushState(null, '', url.pathname + url.search);
    }
  };

  const toggleBook = (id: string) =>
    setOpenBooks((prev) => (prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]));
  const toggleCat = (name: string) =>
    setOpenCats((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  /* ==================== 共用块 ==================== */

  const labSearchBox = (
    <div className="relative flex items-center">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="搜索实验名称或关键词（如“光合”“种群”）…"
        aria-label="搜索实验"
        className="min-h-9 w-full rounded-md border border-gray-200 bg-white pl-9 pr-9 text-sm text-[#37352f] placeholder-gray-400 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500/30"
      />
      {search ? (
        <button
          type="button"
          onClick={() => setSearch('')}
          aria-label="清除搜索"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition-colors duration-150 hover:bg-[#efedea]"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );

  const detailPanel = (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gray-200 px-4 py-4 sm:px-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#2eaadc]">
            <ExperimentIcon className="size-4.5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs text-gray-500">
              {experiment.kicker}
              {experiment.extension ? (
                <span className="ml-2 inline-flex items-center rounded-md bg-yellow-50 px-1.5 py-0.5 text-[10px] font-semibold text-[#9a7b00]">⚡ 课外拓展</span>
              ) : null}
            </p>
            <h2 className="mt-0.5 text-lg font-semibold text-[#37352f]">{experiment.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{experiment.description}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setResetCount((count) => count + 1)}
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium text-gray-700 transition-colors duration-150 hover:bg-[#efedea] active:bg-[#e3e1db]"
        >
          <RefreshCw className="size-3.5" aria-hidden="true" />
          重置条件
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <Suspense fallback={<LabChunkFallback />}>
          <ActiveExperiment key={`${activeExperiment}-${resetCount}`} />
        </Suspense>
        {(EXPERIMENT_DIAGRAMS[activeExperiment] ?? []).length > 0 ? (
          <section className="mt-5">
            <div className="mb-2 flex items-center gap-2">
              <Lightbulb className="size-4 text-[#dfab01]" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-[#37352f]">相关图解（点结构名高亮图中位置）</h3>
            </div>
            <div className="grid gap-3 xl:grid-cols-2">
              {(EXPERIMENT_DIAGRAMS[activeExperiment] ?? []).map((specimenId) => (
                <Suspense key={specimenId} fallback={<LabChunkFallback />}>
                  <SpecimenCard id={specimenId} />
                </Suspense>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );

  const switcherSection = (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-[#37352f]">选择实验（{searchLower
          ? `搜索“${search.trim()}” · ${visibleIds.length} 个`
          : categoryFilter
            ? `分类：${categoryFilter} · ${visibleIds.length} 个`
            : `覆盖五册教材 · ${experimentOrder.length} 个`}）</h2>
        {categoryFilter && !searchLower ? (
          <button
            type="button"
            onClick={() => setCategoryFilter(null)}
            className="rounded-md px-3 py-1 text-xs font-medium text-gray-600 transition-colors duration-150 hover:bg-[#efedea] active:bg-[#e3e1db]"
          >
            显示全部
          </button>
        ) : null}
      </div>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {visibleIds.length === 0 ? (
          <p className="col-span-full rounded-md border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-500">
            没有匹配「{search.trim()}」的实验——换个关键词试试（如“酶”“遗传”“血糖”）。
          </p>
        ) : null}
        {textbooks.map((book) =>
          visibleIds
            .filter((id) => experimentMeta[id].relatedBook === book.id)
            .map((id) => {
              const Icon = EXPERIMENT_ICONS[id];
              const active = id === activeExperiment;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => pickExperiment(id)}
                  onMouseEnter={() => preloadExperiment(id)}
                  aria-pressed={active}
                  className={cnChip(active)}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block truncate text-xs font-semibold">
                      {experimentMeta[id].title}
                    </span>
                    <span className="block text-[10px] opacity-75">{book.volume}</span>
                  </span>
                </button>
              );
            }),
        )}
      </div>
    </section>
  );

  /* ==================== 桌面：左目录 + 右内容 ==================== */
  if (isWide) {
    return (
      <div>
        <div className="flex h-[calc(100dvh-116px)] gap-5">
          <aside aria-label="实验目录" className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-[#f7f6f3] shadow-sm">
            <div className="border-b border-gray-200 px-4 py-3">
              <p className="text-[10px] font-semibold tracking-[0.28em] text-gray-400">BIOLOGY LAB</p>
              <p className="mt-0.5 text-base font-semibold leading-6 text-[#37352f]">互动实验 · 目录</p>
              <p className="mt-0.5 text-[11px] text-gray-500">共 {experimentOrder.length} 个 · 覆盖 5 册教材</p>
            </div>
            <div className="border-b border-gray-200 p-3">{labSearchBox}</div>
            <nav className="flex-1 overflow-y-auto p-2.5">
              {searchLower ? (
                <div>
                  <p className="px-2 pb-1.5 pt-0.5 text-[11px] font-medium text-gray-500">
                    搜索“{search.trim()}” · {visibleIds.length} 个结果
                  </p>
                  {visibleIds.length === 0 ? (
                    <p className="rounded-md border border-dashed border-gray-200 bg-white px-3 py-6 text-center text-xs text-gray-500">
                      没有匹配的实验——换个关键词试试。
                    </p>
                  ) : null}
                  {visibleIds.map((id) => {
                    const active = id === activeExperiment;
                    const Icon = EXPERIMENT_ICONS[id];
                    return (
                      <button
                        key={id}
                        type="button"
                        ref={active ? currentItemRef : undefined}
                        onClick={() => pickExperiment(id)}
                        onMouseEnter={() => preloadExperiment(id)}
                        aria-current={active}
                        className={`nb-book-item group ${active ? 'nb-book-item-open' : ''}`}
                      >
                        <span aria-hidden="true" className="w-4 shrink-0 text-center text-[10px] leading-none text-gray-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100">⋮⋮</span>
                        <Icon className="size-3.5 shrink-0 text-gray-400" aria-hidden="true" />
                        <span className="min-w-0 flex-1 truncate">{experimentMeta[id].title}</span>
                        {seenProgress.labs.includes(id) ? (
                          <span aria-hidden="true" className="shrink-0 text-[10px] font-bold text-[#0f7b6c]">✓</span>
                        ) : null}
                        {experimentMeta[id].extension ? <span aria-hidden="true" className="shrink-0 text-[10px]">⚡</span> : null}
                      </button>
                    );
                  })}
                </div>
              ) : (
                BOOK_TREE.map(({ book, cats }, bi) => {
                  const bookOpen = openBooks.includes(book.id);
                  const total = cats.reduce((n, c) => n + c.ids.length, 0);
                  const BookIcon = book.icon;
                  return (
                    <div key={book.id} className="mb-1">
                      <button
                        type="button"
                        onClick={() => toggleBook(book.id)}
                        aria-expanded={bookOpen}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors duration-150 hover:bg-[#efedea] active:bg-[#e3e1db]"
                      >
                        <span className="font-mono text-[10px] font-semibold text-gray-400">{String(bi + 1).padStart(2, '0')}</span>
                        <BookIcon className="size-3.5 shrink-0 text-gray-500" aria-hidden="true" />
                        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[#37352f]">
                          {book.volume} · {book.title}
                        </span>
                        <span className="text-[10px] font-medium text-gray-400">{total}</span>
                        <span aria-hidden="true" className="w-2 text-[10px] text-gray-400">{bookOpen ? '▾' : '▸'}</span>
                      </button>
                      {bookOpen
                        ? cats.map((c) => {
                            const catOpen = openCats.includes(c.name);
                            return (
                              <div key={c.name} className="ml-4 border-l border-gray-200 pl-1.5">
                                <button
                                  type="button"
                                  onClick={() => toggleCat(c.name)}
                                  aria-expanded={catOpen}
                                  className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs font-semibold text-gray-600 transition-colors duration-150 hover:bg-[#efedea] active:bg-[#e3e1db]"
                                >
                                  <span aria-hidden="true">{c.icon}</span>
                                  <span className="min-w-0 flex-1 truncate">{c.name}</span>
                                  <span className="text-[10px] font-medium text-gray-400">{c.ids.length}</span>
                                  <span aria-hidden="true" className="w-2 text-[9px] text-gray-400">{catOpen ? '▾' : '▸'}</span>
                                </button>
                                {catOpen
                                  ? c.ids.map((id) => {
                                      const active = id === activeExperiment;
                                      return (
                                        <button
                                          key={id}
                                          type="button"
                                          ref={active ? currentItemRef : undefined}
                                          onClick={() => pickExperiment(id)}
                                          onMouseEnter={() => preloadExperiment(id)}
                                          aria-current={active}
                                          className={`nb-book-item group ${active ? 'nb-book-item-open' : ''}`}
                                        >
                                          <span aria-hidden="true" className="w-4 shrink-0 text-center text-[10px] leading-none text-gray-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100">⋮⋮</span>
                                          <span className="min-w-0 flex-1 truncate">{experimentMeta[id].title}</span>
                                          {seenProgress.labs.includes(id) ? (
                                            <span aria-hidden="true" className="shrink-0 text-[10px] font-bold text-[#0f7b6c]">✓</span>
                                          ) : null}
                                          {experimentMeta[id].extension ? <span aria-hidden="true" className="shrink-0 text-[10px]">⚡</span> : null}
                                        </button>
                                      );
                                    })
                                  : null}
                              </div>
                            );
                          })
                        : null}
                    </div>
                  );
                })
              )}
            </nav>
            <div className="border-t border-gray-200 px-4 py-2.5">
              <div className="flex items-center justify-between text-[10.5px] leading-4 text-gray-500">
                <span>已做 {seenProgress.labs.length}/{experimentOrder.length}</span>
                <span>⚡ = 课外拓展 · 悬停预载</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e9e7e2]">
                <div
                  className="h-full rounded-full bg-[#2eaadc] transition-all duration-300"
                  style={{ width: `${Math.round((seenProgress.labs.length / experimentOrder.length) * 100)}%` }}
                />
              </div>
            </div>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto pr-0.5">
            {detailPanel}
          </div>
        </div>
      </div>
    );
  }

  /* ==================== 窄屏：纵向（Notion 化） ==================== */
  return (
    <div>
      <div className="mb-6 border-b border-gray-200 pb-6">
        <p className="text-[11px] font-semibold tracking-[0.24em] text-[#2eaadc]">BIOLOGY LAB · 互动实验</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#37352f]">从变量到结论，亲眼看过程</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">
          {experimentOrder.length} 个过程动画互动实验覆盖五册教材：调参数、看曲线、读结论；悬停实验名即可预载，点开几乎零等待。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[`互动实验 ${experimentOrder.length} 个`, `九大主题分类`, `点图高亮考点`].map((chip) => (
            <span key={chip} className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-[#2eaadc]">
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[#37352f]">📋 实验目录（按主题分类 · 共 {experimentOrder.length} 个）</h2>
            {categoryFilter && !searchLower ? (
              <button
                type="button"
                onClick={() => setCategoryFilter(null)}
                className="rounded-md px-3 py-1 text-xs font-medium text-gray-600 transition-colors duration-150 hover:bg-[#efedea] active:bg-[#e3e1db]"
              >
                显示全部
              </button>
            ) : null}
          </div>
          {labSearchBox}
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {EXPERIMENT_CATEGORIES.map((cat) => {
              const filtered = categoryFilter != null && categoryFilter !== cat.name;
              const active = categoryFilter === cat.name;
              return (
                <div
                  key={cat.name}
                  className={`rounded-lg border px-3 py-2.5 transition-colors duration-150 ${
                    active ? 'border-[#2eaadc] bg-blue-50' : 'border-gray-200 bg-white hover:bg-[#efedea]'
                  } ${filtered ? 'opacity-45' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => setCategoryFilter(active ? null : cat.name)}
                    aria-pressed={active}
                    className="flex w-full items-center gap-2 text-left"
                  >
                    <span aria-hidden="true" className="text-base">{cat.icon}</span>
                    <span className="text-xs font-semibold text-[#37352f]">{cat.name}</span>
                    <span className="ml-auto rounded-md bg-[#f7f6f3] px-1.5 text-[10px] font-semibold text-gray-500">
                      {cat.ids.length}
                    </span>
                  </button>
                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
                    {cat.ids.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          pickExperiment(id);
                          setCategoryFilter(cat.name);
                        }}
                        onMouseEnter={() => preloadExperiment(id)}
                        className={`text-[11px] underline-offset-2 transition-colors duration-150 ${
                          id === activeExperiment
                            ? 'font-semibold text-[#2eaadc] underline'
                            : 'text-gray-500 hover:text-[#2eaadc] hover:underline'
                        }`}
                      >
                        {experimentMeta[id].title}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {switcherSection}
        {detailPanel}
      </div>

      <style>{LAB_KEYFRAMES}</style>
    </div>
  );
}

function cnChip(active: boolean) {
  return `group flex min-h-11 items-center gap-2 rounded-md border px-2.5 text-left transition-colors duration-150 ${
    active
      ? 'border-[#2eaadc] bg-blue-50 text-[#1d7fa8]'
      : 'border-gray-200 bg-white text-gray-600 hover:bg-[#efedea] active:bg-[#e3e1db]'
  }`;
}
