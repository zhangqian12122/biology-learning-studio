'use client';

import { lazy, Suspense, useState, type ComponentType, type LazyExoticComponent } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Bird,
  Bubbles,
  Dices,
  Dna,
  Drumstick,
  Droplet,
  Droplets,
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
  Repeat,
  Ruler,
  Scissors,
  Sprout,
  Target,
  UtensilsCrossed,
  TestTubes,
  TrendingUp,
  TestTube2,
  Waves,
  Zap,
  Wine,
} from 'lucide-react';

import { EXPERIMENT_CATEGORIES, experimentMeta, experimentOrder, textbooks, type ExperimentId } from '@/lib/curriculum';

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
  energy: Leaf,
  population: TrendingUp,
  geneEngine: Scissors,
  dnaExtract: FlaskRound,
  pcr: Repeat,
  reflexArc: Zap,
  thyroidAxis: Activity,
  markRecapture: Target,
  succession: Sprout,
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
  energy: () => import('@/components/lab/energy-flow-lab').then(({ EnergyFlowLab }) => ({ default: EnergyFlowLab })),
  population: () => import('@/components/lab/population-growth-lab').then(({ PopulationGrowthLab }) => ({ default: PopulationGrowthLab })),
  geneEngine: () => import('@/components/lab/gene-engineering-lab').then(({ GeneEngineLab }) => ({ default: GeneEngineLab })),
  dnaExtract: () => import('@/components/lab/dna-extraction-lab').then(({ DnaExtractLab }) => ({ default: DnaExtractLab })),
  pcr: () => import('@/components/lab/pcr-lab').then(({ PcrLab }) => ({ default: PcrLab })),
  reflexArc: () => import('@/components/lab/reflex-arc-lab').then(({ ReflexArcLab }) => ({ default: ReflexArcLab })),
  thyroidAxis: () => import('@/components/lab/thyroid-axis-lab').then(({ ThyroidAxisLab }) => ({ default: ThyroidAxisLab })),
  markRecapture: () => import('@/components/lab/mark-recapture-lab').then(({ MarkRecaptureLab }) => ({ default: MarkRecaptureLab })),
  succession: () => import('@/components/lab/succession-lab').then(({ SuccessionLab }) => ({ default: SuccessionLab })),
};

const EXPERIMENT_COMPONENTS = Object.fromEntries(
  (Object.keys(EXPERIMENT_LOADERS) as ExperimentId[]).map((id) => [id, lazy(EXPERIMENT_LOADERS[id])]),
) as Record<ExperimentId, LazyExoticComponent<ComponentType>>;

/** 目录条目悬停时提前拉取实验代码，点开时几乎零等待。 */
function preloadExperiment(id: ExperimentId) {
  void EXPERIMENT_LOADERS[id]();
}

function LabChunkFallback() {
  return (
    <div className="flex min-h-48 items-center justify-center gap-2 text-sm text-[#59767c]">
      <span className="inline-block size-2 animate-pulse rounded-full bg-[#82c6c0]" aria-hidden="true" />
      实验加载中…
    </div>
  );
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
  const [activeExperiment, setActiveExperiment] = useState<ExperimentId>('enzyme');
  const [resetCount, setResetCount] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const experiment = experimentMeta[activeExperiment];
  const ExperimentIcon = EXPERIMENT_ICONS[activeExperiment];
  const ActiveExperiment = EXPERIMENT_COMPONENTS[activeExperiment];

  const visibleIds =
    categoryFilter != null
      ? (EXPERIMENT_CATEGORIES.find((c) => c.name === categoryFilter)?.ids ?? experimentOrder)
      : experimentOrder;

  return (
    <div>
      <div className="mb-5">
        <p className="text-xs font-semibold tracking-[0.1em] text-[#398086]">BIOLOGY LAB</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-normal text-[#13333a] sm:text-3xl">
          从变量到结论，亲眼看过程
        </h1>
      </div>

      <div className="space-y-5">
        {/* 实验目录：按主题分类 */}
        <section className="rounded-lg border border-[#cfe0e0] bg-[#fbfdfd] p-4 shadow-[0_12px_30px_rgba(18,65,72,0.06)] sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[#173b42]">📋 实验目录（按主题分类 · 共 {experimentOrder.length} 个）</h2>
            {categoryFilter ? (
              <button
                type="button"
                onClick={() => setCategoryFilter(null)}
                className="rounded-full bg-[#eef7f6] px-3 py-1 text-xs font-medium text-[#4b6c73] transition-colors hover:bg-[#e2f1ef]"
              >
                显示全部
              </button>
            ) : null}
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
            {EXPERIMENT_CATEGORIES.map((cat) => {
              const filtered = categoryFilter != null && categoryFilter !== cat.name;
              const active = categoryFilter === cat.name;
              return (
                <div
                  key={cat.name}
                  className={`rounded-md border px-3 py-2.5 transition-colors ${
                    active ? 'border-[#82c6c0] bg-[#e9f7f5]' : 'border-[#e2eeec] bg-white'
                  } ${filtered ? 'opacity-45' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => setCategoryFilter(active ? null : cat.name)}
                    aria-pressed={active}
                    className="flex w-full items-center gap-2 text-left"
                  >
                    <span aria-hidden="true" className="text-base">{cat.icon}</span>
                    <span className="text-xs font-bold text-[#173b42]">{cat.name}</span>
                    <span className="ml-auto rounded-full bg-[#e8f4f3] px-2 text-[10px] font-semibold text-[#0c696f]">
                      {cat.ids.length}
                    </span>
                  </button>
                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
                    {cat.ids.map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setActiveExperiment(id);
                          setCategoryFilter(cat.name);
                        }}
                        onMouseEnter={() => preloadExperiment(id)}
                        className={`text-[11px] underline-offset-2 transition-colors ${
                          id === activeExperiment
                            ? 'font-semibold text-[#0a626a] underline'
                            : 'text-[#59767c] hover:text-[#0a626a] hover:underline'
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

        <section className="overflow-hidden rounded-lg border border-[#cfe0e0] bg-[#fbfdfd] shadow-[0_12px_30px_rgba(18,65,72,0.06)]">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#dceaea] px-4 py-4 sm:px-5">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-[#dff1ef] text-[#0d6c72]">
                <ExperimentIcon className="size-4.5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-[#638087]">{experiment.kicker}</p>
                <h2 className="mt-0.5 text-lg font-semibold text-[#173b42]">{experiment.title}</h2>
                <p className="mt-1 text-sm text-[#59767c]">{experiment.description}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setResetCount((count) => count + 1)}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              <RefreshCw className="size-3.5" aria-hidden="true" />
              重置条件
            </button>
          </div>

          <div className="border-b border-[#dceaea] px-4 py-4 sm:px-5">
            <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
              选择实验（{categoryFilter ? `分类：${categoryFilter} · ${visibleIds.length} 个` : `覆盖五册教材 · ${experimentOrder.length} 个`}）
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
                        onClick={() => setActiveExperiment(id)}
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
          </div>

          <div className="p-4 sm:p-5">
            <Suspense fallback={<LabChunkFallback />}>
              <ActiveExperiment key={`${activeExperiment}-${resetCount}`} />
            </Suspense>
          </div>
        </section>

        <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-lg border border-[#d1e1e1] bg-[#f9fcfc] p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <Lightbulb className="size-4 text-[#b57c16]" aria-hidden="true" />
              <h2 className="text-sm font-semibold">实验设计清单</h2>
            </div>
            <ol className="mt-4 grid gap-3 text-sm text-[#46666d] sm:grid-cols-3">
              <li className="border-l border-[#cfe1e0] pl-3">
                <span className="block text-xs text-[#719096]">01</span>
                明确自变量和因变量
              </li>
              <li className="border-l border-[#cfe1e0] pl-3">
                <span className="block text-xs text-[#719096]">02</span>
                控制无关变量
              </li>
              <li className="border-l border-[#cfe1e0] pl-3">
                <span className="block text-xs text-[#719096]">03</span>
                用数据支持结论
              </li>
            </ol>
          </section>

          <section className="rounded-lg border border-[#d1e1e1] bg-[#f9fcfc] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-[0.08em] text-[#67858b]">下一步</p>
                <h2 className="mt-1 text-sm font-semibold">用本册题目检验实验理解</h2>
              </div>
              <Link
                href={`/practice?book=${experiment.relatedBook}`}
                aria-label="前往相关题库"
                title="前往相关题库"
                className="flex size-9 items-center justify-center rounded-md bg-[#0e6f75] text-white transition-colors hover:bg-[#0c5f64]"
              >
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </div>

      <style>{LAB_KEYFRAMES}</style>
    </div>
  );
}

function cnChip(active: boolean) {
  return `flex min-h-12 items-center gap-2 rounded-md border px-2.5 text-left transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}
