'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Activity,
  ArrowRight,
  Atom,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleAlert,
  CircleHelp,
  Dna,
  FlaskConical,
  Leaf,
  Lightbulb,
  Microscope,
  RefreshCw,
  Search,
  Sprout,
  Target,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

type StudyView = 'home' | 'lab' | 'practice';
type ExperimentId = 'enzyme' | 'photosynthesis';

const textbooks = [
  {
    id: 'molecules',
    volume: '必修 1',
    title: '分子与细胞',
    icon: Atom,
    color: 'text-cyan-700 bg-cyan-50 border-cyan-100',
  },
  {
    id: 'genetics',
    volume: '必修 2',
    title: '遗传与进化',
    icon: Dna,
    color: 'text-violet-700 bg-violet-50 border-violet-100',
  },
  {
    id: 'regulation',
    volume: '选择性必修 1',
    title: '稳态与调节',
    icon: Activity,
    color: 'text-rose-700 bg-rose-50 border-rose-100',
  },
  {
    id: 'ecology',
    volume: '选择性必修 2',
    title: '生物与环境',
    icon: Leaf,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-100',
  },
  {
    id: 'technology',
    volume: '选择性必修 3',
    title: '生物技术与工程',
    icon: FlaskConical,
    color: 'text-amber-700 bg-amber-50 border-amber-100',
  },
];

const textbookSummaries: Record<string, string> = {
  molecules: '细胞结构、物质运输、能量转换与细胞生命历程。',
  genetics: '遗传规律、DNA 的复制与表达、变异和生物进化。',
  regulation: '神经调节、体液调节、免疫调节与内环境稳态。',
  ecology: '种群、群落、生态系统、人与环境的关系。',
  technology: '发酵工程、细胞工程、基因工程与生物技术实践。',
};

const questions = [
  {
    bookId: 'molecules',
    source: '必修 1 · 分子与细胞',
    topic: '实验变量控制',
    prompt: '探究温度对淀粉酶活性的影响时，各实验组之间应保持一致的是？',
    options: [
      '水浴的温度',
      '底物浓度与反应时间',
      '酶的最适温度',
      '反应产物的多少',
    ],
    answer: 1,
    explanation:
      '温度是本实验的自变量。为了让结果只反映温度的影响，底物浓度、酶量、pH 和反应时间等条件要保持一致。',
    tag: '变量控制',
  },
  {
    bookId: 'genetics',
    source: '必修 2 · 遗传与进化',
    topic: '基因分离定律',
    prompt: '某性状由一对等位基因控制，亲本基因型为 Aa 与 aa。子代出现隐性表型的概率是？',
    options: ['0', '1/4', '1/2', '3/4'],
    answer: 2,
    explanation:
      'Aa 产生 A、a 两种配子，aa 只产生 a 配子。子代基因型为 Aa 和 aa 的概率各为 1/2，因此隐性表型 aa 的概率为 1/2。',
    tag: '配子分析',
  },
  {
    bookId: 'regulation',
    source: '选择性必修 1 · 稳态与调节',
    topic: '内环境稳态',
    prompt: '人在高温环境中出汗增多。该调节过程的直接意义更接近下列哪一项？',
    options: [
      '使体温完全不发生变化',
      '增强皮肤吸收热量',
      '通过蒸发散热维持体温相对稳定',
      '让所有细胞代谢速率相同',
    ],
    answer: 2,
    explanation:
      '汗液蒸发会带走热量，使体温保持在相对稳定的范围内。稳态不是绝对不变，而是动态平衡。',
    tag: '稳态理解',
  },
  {
    bookId: 'ecology',
    source: '选择性必修 2 · 生物与环境',
    topic: '生态系统能量流动',
    prompt: '食物链中，能量由一个营养级传递到下一营养级时，通常会怎样变化？',
    options: ['全部转化为下一营养级的有机物', '逐级递减', '只在分解者之间传递', '不受呼吸作用影响'],
    answer: 1,
    explanation:
      '每个营养级的生物都会通过呼吸作用散失一部分能量，且并非所有有机物都被下一营养级取食，因此能量会沿食物链逐级递减。',
    tag: '能量流动',
  },
  {
    bookId: 'technology',
    source: '选择性必修 3 · 生物技术与工程',
    topic: '发酵工程',
    prompt: '在微生物发酵的培养过程中，连续监测并调节培养条件的主要目的是什么？',
    options: ['使所有微生物停止生长', '维持适宜条件以提高目标产物产量', '让培养基成分保持绝对不变', '避免任何气体参与培养过程'],
    answer: 1,
    explanation:
      '发酵过程需要根据微生物生长和产物形成的需要调节温度、pH、溶氧等条件，以提高目标产物的产量和稳定性。',
    tag: '过程调控',
  },
];

const experimentMeta = {
  enzyme: {
    title: '酶活性：温度与 pH',
    kicker: '必修 1 · 分子与细胞',
    description: '调整条件，观察酶活性曲线如何变化。',
    controlA: '温度',
    controlB: 'pH',
    controlAUnit: '°C',
    controlBUnit: '',
    imageLabel: '叶肉细胞与叶绿体',
    experimentIcon: FlaskConical,
  },
  photosynthesis: {
    title: '光合作用：光照与 CO2',
    kicker: '必修 1 · 分子与细胞',
    description: '改变光照和二氧化碳浓度，比较净光合速率。',
    controlA: '光照强度',
    controlB: 'CO2 浓度',
    controlAUnit: 'lx',
    controlBUnit: '%',
    imageLabel: '叶肉细胞与叶绿体',
    experimentIcon: Sprout,
  },
};

function enzymeActivity(temperature: number, ph: number) {
  const temperatureEffect = Math.exp(-((temperature - 37) ** 2) / 250);
  const phEffect = Math.exp(-((ph - 7) ** 2) / 4.8);
  return Math.round(Math.min(100, temperatureEffect * phEffect * 100));
}

function photosynthesisRate(light: number, co2: number) {
  const lightEffect = 1 - Math.exp(-light / 340);
  const co2Effect = co2 / (co2 + 0.045);
  return Math.round(Math.min(100, lightEffect * co2Effect * 125));
}

function getEnzymeState(temperature: number, ph: number) {
  if (temperature >= 62) return '高温可能使酶结构受损';
  if (temperature <= 8) return '低温下反应速率较慢';
  if (Math.abs(temperature - 37) <= 4 && Math.abs(ph - 7) <= 0.8) {
    return '接近最适条件';
  }
  return '仍可反应，但不是最适条件';
}

export default function Home() {
  const [view, setView] = useState<StudyView>('home');
  const [activeExperiment, setActiveExperiment] =
    useState<ExperimentId>('enzyme');
  const [temperature, setTemperature] = useState(37);
  const [ph, setPh] = useState(7);
  const [light, setLight] = useState(650);
  const [co2, setCo2] = useState(0.08);
  const [selectedBook, setSelectedBook] = useState('molecules');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeTags, setMistakeTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const experiment = experimentMeta[activeExperiment];
  const ExperimentIcon = experiment.experimentIcon;
  const currentQuestion = questions[questionIndex];
  const answerIsCorrect = selectedAnswer === currentQuestion.answer;

  const chartData = useMemo(() => {
    if (activeExperiment === 'enzyme') {
      return Array.from({ length: 17 }, (_, index) => {
        const value = index * 5;
        return { x: value, rate: enzymeActivity(value, ph) };
      });
    }

    return Array.from({ length: 11 }, (_, index) => {
      const value = index * 100;
      return { x: value, rate: photosynthesisRate(value, co2) };
    });
  }, [activeExperiment, ph, co2]);

  const currentRate =
    activeExperiment === 'enzyme'
      ? enzymeActivity(temperature, ph)
      : photosynthesisRate(light, co2);

  const currentState =
    activeExperiment === 'enzyme'
      ? getEnzymeState(temperature, ph)
      : currentRate >= 80
        ? '接近光饱和区间'
        : light <= 120
          ? '光照是主要限制因素'
          : '仍可继续提高限制条件';

  const selectedBookTitle = textbooks.find((book) => book.id === selectedBook)?.title;
  const visibleTextbooks = useMemo(() => {
    const keyword = searchQuery.trim().toLocaleLowerCase();
    if (!keyword) return textbooks;

    return textbooks.filter((book) =>
      `${book.volume} ${book.title} ${textbookSummaries[book.id]}`
        .toLocaleLowerCase()
        .includes(keyword),
    );
  }, [searchQuery]);

  const screenTitle =
    view === 'home'
      ? '从教材到考试，选择要学的内容。'
      : view === 'lab'
        ? '从变量到结论，自己跑一遍'
        : '做题以后，知道错在哪里';

  function resetExperiment() {
    setTemperature(37);
    setPh(7);
    setLight(650);
    setCo2(0.08);
  }

  function answerQuestion(optionIndex: number) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(optionIndex);
    setCompletedCount((count) => count + 1);
    if (optionIndex === currentQuestion.answer) {
      setCorrectCount((count) => count + 1);
      return;
    }

    setMistakeTags((tags) =>
      tags.includes(currentQuestion.tag) ? tags : [...tags, currentQuestion.tag],
    );
  }

  function moveToNextQuestion() {
    setQuestionIndex((index) => (index + 1) % questions.length);
    setSelectedAnswer(null);
  }

  function openTextbook(bookId: string) {
    setSelectedBook(bookId);
    const questionForBook = questions.findIndex((question) => question.bookId === bookId);
    if (questionForBook !== -1) setQuestionIndex(questionForBook);
    setSelectedAnswer(null);
    setView('practice');
  }

  return (
    <main className="min-h-screen bg-[#eef5f5] text-[#13333a]">
      <header className="border-b border-[#d5e4e5] bg-[#f9fcfc]">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#0e6f75] text-white shadow-sm">
              <Microscope className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-semibold leading-none">福建高中生物学习站</p>
              <p className="mt-1 text-xs text-[#56737a]">人教版新课标 · 原创互动练习</p>
            </div>
          </div>

          <nav className="order-3 flex w-full items-center gap-1 overflow-x-auto border-t border-[#e0eaea] pt-3 text-sm sm:order-none sm:w-auto sm:border-0 sm:pt-0" aria-label="主导航">
            <HeaderNavButton active={view === 'home'} onClick={() => setView('home')}>首页</HeaderNavButton>
            <HeaderNavButton active={view === 'home'} onClick={() => setView('home')}>教材总览</HeaderNavButton>
            <HeaderNavButton active={view === 'lab'} onClick={() => setView('lab')}>讲解工具</HeaderNavButton>
            <HeaderNavButton active={view === 'practice'} onClick={() => setView('practice')}>最近练习</HeaderNavButton>
          </nav>

          <div className="flex items-center gap-2 text-xs text-[#55737a] sm:text-sm">
            <span className="hidden rounded-full bg-[#e7f2f1] px-3 py-1.5 sm:inline-flex">
              当前教材：{selectedBookTitle}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff4d8] px-3 py-1.5 font-medium text-[#80621c]">
              <Target className="size-3.5" aria-hidden="true" />
              今日 1 个实验
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[238px_minmax(0,1fr)] lg:px-8">
        <aside className="self-start rounded-lg border border-[#d5e4e5] bg-[#f9fcfc] p-3 lg:sticky lg:top-5">
          <p className="px-2 pb-2 text-[11px] font-semibold tracking-[0.08em] text-[#66858b]">
            学习导航
          </p>
          <nav className="grid gap-1 sm:grid-cols-2 lg:grid-cols-1" aria-label="学习模块">
            <button
              type="button"
              onClick={() => setView('home')}
              className={cn(
                'flex min-h-10 items-center gap-3 rounded-md px-3 text-left text-sm transition-colors',
                view === 'home'
                  ? 'bg-[#dff1ef] font-medium text-[#095e66]'
                  : 'text-[#49676e] hover:bg-[#edf5f5]',
              )}
            >
              <BookOpen className="size-4" aria-hidden="true" />
              教材总览
              <ChevronRight className="ml-auto size-4 opacity-60" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setView('lab')}
              className={cn(
                'flex min-h-10 items-center gap-3 rounded-md px-3 text-left text-sm transition-colors',
                view === 'lab'
                  ? 'bg-[#dff1ef] font-medium text-[#095e66]'
                  : 'text-[#49676e] hover:bg-[#edf5f5]',
              )}
            >
              <FlaskConical className="size-4" aria-hidden="true" />
              互动实验
              <ChevronRight className="ml-auto size-4 opacity-60" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setView('practice')}
              className={cn(
                'flex min-h-10 items-center gap-3 rounded-md px-3 text-left text-sm transition-colors',
                view === 'practice'
                  ? 'bg-[#dff1ef] font-medium text-[#095e66]'
                  : 'text-[#49676e] hover:bg-[#edf5f5]',
              )}
            >
              <BrainCircuit className="size-4" aria-hidden="true" />
              题库与错题
              <ChevronRight className="ml-auto size-4 opacity-60" aria-hidden="true" />
            </button>
          </nav>

          <div className="mt-5 border-t border-[#dce9e9] pt-4">
            <div className="mb-2 flex items-center justify-between px-2">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-[#66858b]">五册教材</p>
              <BookOpen className="size-3.5 text-[#66858b]" aria-hidden="true" />
            </div>
            <div className="grid gap-1">
              {textbooks.map((book) => {
                const BookIcon = book.icon;
                const active = selectedBook === book.id;
                return (
                  <button
                    key={book.id}
                    type="button"
                    onClick={() => openTextbook(book.id)}
                    className={cn(
                      'flex min-h-12 items-center gap-2 rounded-md border px-2.5 text-left transition-colors',
                      active
                        ? 'border-[#abd9d5] bg-white shadow-sm'
                        : 'border-transparent hover:border-[#d6e6e6] hover:bg-white/70',
                    )}
                  >
                    <span className={cn('flex size-7 shrink-0 items-center justify-center rounded-md border', book.color)}>
                      <BookIcon className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] text-[#6c858a]">{book.volume}</span>
                      <span className="block truncate text-xs font-medium text-[#34535a]">{book.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <Tabs
          value={view}
          onValueChange={(value) => setView(value as StudyView)}
          className="min-w-0"
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.1em] text-[#398086]">
                {view === 'home' ? 'BIOLOGY COURSE MAP' : view === 'lab' ? 'BIOLOGY LAB' : 'BIOLOGY PRACTICE'}
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-normal text-[#13333a] sm:text-3xl">
                {screenTitle}
              </h1>
            </div>
            <TabsList className="rounded-lg border border-[#d5e4e5] bg-[#f9fcfc] p-1" aria-label="学习视图">
              <TabsTrigger value="home" className="px-3 text-xs sm:text-sm">
                <BookOpen className="size-3.5" aria-hidden="true" />
                教材总览
              </TabsTrigger>
              <TabsTrigger value="lab" className="px-3 text-xs sm:text-sm">
                <FlaskConical className="size-3.5" aria-hidden="true" />
                实验台
              </TabsTrigger>
              <TabsTrigger value="practice" className="px-3 text-xs sm:text-sm">
                <CircleHelp className="size-3.5" aria-hidden="true" />
                练习与错题
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="home" className="mt-0 space-y-5">
            <section className="rounded-lg border border-[#cfe0e0] bg-[#fbfdfd] p-4 shadow-[0_12px_30px_rgba(18,65,72,0.06)] sm:p-5">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)] lg:items-end">
                <div>
                  <p className="text-sm font-medium text-[#295c64]">按五册教材顺序进入，或直接搜索你要复习的知识点。</p>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66858b]">每册都连接到原创练习与错因记录；必修 1 还可以进入互动实验台，自己调条件、看数据、再做判断。</p>
                </div>
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold tracking-[0.08em] text-[#66858b]">搜索课堂内容</span>
                  <span className="flex h-11 items-center gap-2 rounded-md border border-[#cddfdf] bg-white px-3 shadow-sm transition-shadow focus-within:ring-3 focus-within:ring-[#b8dfda]">
                    <Search className="size-4 shrink-0 text-[#a77724]" aria-hidden="true" />
                    <input
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="如：细胞、遗传、生态、发酵"
                      className="min-w-0 flex-1 bg-transparent text-sm text-[#264950] outline-none placeholder:text-[#94a9ad]"
                      type="search"
                    />
                  </span>
                </label>
              </div>
            </section>

            <section aria-labelledby="course-entry-title">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.08em] text-[#66858b]">课堂入口</p>
                  <h2 id="course-entry-title" className="mt-1 text-lg font-semibold">从教材章节开始</h2>
                </div>
                <span className="text-xs text-[#6c888d]">{visibleTextbooks.length} 册可进入</span>
              </div>

              {visibleTextbooks.length ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {visibleTextbooks.map((book, index) => {
                    const BookIcon = book.icon;
                    return (
                      <button
                        key={book.id}
                        type="button"
                        onClick={() => openTextbook(book.id)}
                        className="group flex min-h-[192px] flex-col rounded-lg border border-[#d0dfdf] bg-[#f9fcfc] p-4 text-left shadow-sm transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-[#97cbc6] hover:shadow-[0_10px_22px_rgba(18,65,72,0.10)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#b8dfda]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className={cn('flex size-9 items-center justify-center rounded-md border', book.color)}>
                            <BookIcon className="size-4" aria-hidden="true" />
                          </span>
                          <span className="text-xs font-semibold text-[#a77724]">{String(index + 1).padStart(2, '0')}</span>
                        </div>
                        <p className="mt-5 text-xs text-[#6a878d]">{book.volume}</p>
                        <h3 className="mt-1 text-lg font-semibold text-[#1d444c]">{book.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#5b777d]">{textbookSummaries[book.id]}</p>
                        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-[#126b73]">
                          进入本册练习 <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-[#c9dddd] bg-[#f9fcfc] px-4 py-8 text-center text-sm text-[#6b888d]">没有匹配的教材关键词，试试“细胞”“遗传”或“生态”。</div>
              )}
            </section>
          </TabsContent>

          <TabsContent value="lab" className="mt-0 space-y-5">
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetExperiment}
                  className="border-[#cbdede] bg-white text-[#366169] hover:bg-[#eef7f7]"
                >
                  <RefreshCw className="size-3.5" aria-hidden="true" />
                  重置条件
                </Button>
              </div>

              <div className="grid lg:grid-cols-[minmax(250px,0.75fr)_minmax(0,1.25fr)]">
                <div className="space-y-6 p-4 sm:p-5">
                  <div>
                    <p className="mb-3 text-xs font-semibold tracking-[0.08em] text-[#67858b]">选择实验</p>
                    <div className="grid gap-2">
                      {(['enzyme', 'photosynthesis'] as ExperimentId[]).map((id) => {
                        const active = activeExperiment === id;
                        const meta = experimentMeta[id];
                        const Icon = meta.experimentIcon;
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setActiveExperiment(id)}
                            className={cn(
                              'flex min-h-14 items-center gap-3 rounded-md border px-3 text-left transition-colors',
                              active
                                ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                                : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]',
                            )}
                          >
                            <Icon className="size-4 shrink-0" aria-hidden="true" />
                            <span>
                              <span className="block text-sm font-medium">{meta.title}</span>
                              <span className="mt-0.5 block text-xs opacity-75">{meta.description}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-5 border-t border-[#dceaea] pt-5">
                    {activeExperiment === 'enzyme' ? (
                      <>
                        <ControlSlider
                          label={experiment.controlA}
                          value={temperature}
                          unit={experiment.controlAUnit}
                          min={0}
                          max={80}
                          step={1}
                          onChange={setTemperature}
                        />
                        <ControlSlider
                          label={experiment.controlB}
                          value={ph}
                          unit={experiment.controlBUnit}
                          min={2}
                          max={12}
                          step={0.5}
                          onChange={setPh}
                        />
                      </>
                    ) : (
                      <>
                        <ControlSlider
                          label={experiment.controlA}
                          value={light}
                          unit={experiment.controlAUnit}
                          min={0}
                          max={1000}
                          step={50}
                          onChange={setLight}
                        />
                        <ControlSlider
                          label={experiment.controlB}
                          value={co2}
                          unit={experiment.controlBUnit}
                          min={0.01}
                          max={0.18}
                          step={0.01}
                          digits={2}
                          onChange={setCo2}
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#dceaea] p-4 sm:p-5 lg:border-t-0 lg:border-l">
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.08em] text-[#67858b]">模拟结果</p>
                      <p className="mt-1 text-sm text-[#4b6c73]">
                        当前条件下的相对反应速率
                      </p>
                    </div>
                    <div className="flex items-baseline gap-1 text-[#0e6f75]">
                      <strong className="text-3xl leading-none">{currentRate}</strong>
                      <span className="text-sm font-medium">%</span>
                    </div>
                  </div>

                  <div className="h-[248px] min-w-0 rounded-md border border-[#dceaea] bg-[#f7fbfb] px-2 py-3 sm:h-[274px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                        <defs>
                          <linearGradient id="biologyRate" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#1b9a91" stopOpacity={0.36} />
                            <stop offset="100%" stopColor="#1b9a91" stopOpacity={0.02} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#d8e9e8" strokeDasharray="4 4" vertical={false} />
                        <XAxis
                          dataKey="x"
                          tick={{ fill: '#6c858a', fontSize: 11 }}
                          tickLine={false}
                          axisLine={false}
                          label={{
                            value: activeExperiment === 'enzyme' ? '温度（°C）' : '光照强度（lx）',
                            position: 'insideBottom',
                            offset: -2,
                            fill: '#6c858a',
                            fontSize: 11,
                          }}
                        />
                        <YAxis
                          domain={[0, 100]}
                          tick={{ fill: '#6c858a', fontSize: 11 }}
                          tickLine={false}
                          axisLine={false}
                          width={36}
                        />
                        <Tooltip
                          cursor={{ stroke: '#86c7c1', strokeWidth: 1 }}
                          contentStyle={{
                            border: '1px solid #cfe2e1',
                            borderRadius: '6px',
                            boxShadow: '0 6px 18px rgba(16, 80, 83, 0.10)',
                            fontSize: '12px',
                          }}
                          formatter={(value) => [`${String(value)}%`, '相对速率']}
                          labelFormatter={(value) =>
                            activeExperiment === 'enzyme' ? `${String(value)} °C` : `${String(value)} lx`
                          }
                        />
                        <Area type="monotone" dataKey="rate" stroke="#0e797b" strokeWidth={2.5} fill="url(#biologyRate)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_170px]">
                    <div className="border-l-2 border-[#d39a2b] pl-3">
                      <p className="text-xs font-semibold text-[#8a671b]">观察判断</p>
                      <p className="mt-1 text-sm leading-6 text-[#49676d]">{currentState}</p>
                    </div>
                    <div className="overflow-hidden rounded-md border border-[#d9e8e7] bg-[#edf7f6]">
                      <Image
                        src="/images/microscope-leaf-cells.png"
                        alt="显微镜下的绿色植物叶肉细胞"
                        width={340}
                        height={160}
                        sizes="170px"
                        className="h-20 w-full object-cover object-center"
                      />
                      <p className="px-2 py-1.5 text-[11px] text-[#5b777c]">{experiment.imageLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
              <section className="rounded-lg border border-[#d1e1e1] bg-[#f9fcfc] p-4 sm:p-5">
                <div className="flex items-center gap-2">
                  <Lightbulb className="size-4 text-[#b57c16]" aria-hidden="true" />
                  <h2 className="text-sm font-semibold">实验设计清单</h2>
                </div>
                <ol className="mt-4 grid gap-3 text-sm text-[#46666d] sm:grid-cols-3">
                  <li className="border-l border-[#cfe1e0] pl-3"><span className="block text-xs text-[#719096]">01</span>明确自变量和因变量</li>
                  <li className="border-l border-[#cfe1e0] pl-3"><span className="block text-xs text-[#719096]">02</span>控制无关变量</li>
                  <li className="border-l border-[#cfe1e0] pl-3"><span className="block text-xs text-[#719096]">03</span>用数据支持结论</li>
                </ol>
              </section>

              <section className="rounded-lg border border-[#d1e1e1] bg-[#f9fcfc] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.08em] text-[#67858b]">下一步</p>
                    <h2 className="mt-1 text-sm font-semibold">用一道题检验变量控制</h2>
                  </div>
                  <Button size="icon-sm" onClick={() => setView('practice')} aria-label="前往题库与错题" title="前往题库与错题">
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </section>
            </div>
          </TabsContent>

          <TabsContent value="practice" className="mt-0 space-y-5">
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
              <section className="rounded-lg border border-[#cfe0e0] bg-[#fbfdfd] shadow-[0_12px_30px_rgba(18,65,72,0.06)]">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#dceaea] px-4 py-4 sm:px-5">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.08em] text-[#67858b]">原创题库 · {currentQuestion.source}</p>
                    <h2 className="mt-1 text-lg font-semibold text-[#173b42]">{currentQuestion.topic}</h2>
                  </div>
                  <span className="rounded-full bg-[#e8f4f3] px-3 py-1.5 text-xs font-medium text-[#166c70]">
                    第 {questionIndex + 1} / {questions.length} 题
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-base font-medium leading-7 text-[#24464d]">{currentQuestion.prompt}</p>
                  <div className="mt-5 grid gap-2.5">
                    {currentQuestion.options.map((option, index) => {
                      const chosen = selectedAnswer === index;
                      const correct = selectedAnswer !== null && index === currentQuestion.answer;
                      const incorrect = chosen && !answerIsCorrect;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => answerQuestion(index)}
                          disabled={selectedAnswer !== null}
                          className={cn(
                            'flex min-h-12 items-center gap-3 rounded-md border px-3 text-left text-sm transition-colors disabled:cursor-default',
                            correct
                              ? 'border-[#81c5a3] bg-[#edf9f1] text-[#226341]'
                              : incorrect
                                ? 'border-[#e9b8a8] bg-[#fff2ed] text-[#9b4e39]'
                                : 'border-[#d8e7e7] bg-white text-[#46666d] hover:border-[#a9d3cf] hover:bg-[#f5fbfb]',
                          )}
                        >
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span>{option}</span>
                          {correct ? <Check className="ml-auto size-4" aria-label="正确答案" /> : null}
                          {incorrect ? <CircleAlert className="ml-auto size-4" aria-label="所选答案错误" /> : null}
                        </button>
                      );
                    })}
                  </div>

                  {selectedAnswer !== null ? (
                    <div className={cn('mt-5 border-l-2 pl-3', answerIsCorrect ? 'border-[#4ca878]' : 'border-[#d97351]')}>
                      <p className={cn('text-xs font-semibold', answerIsCorrect ? 'text-[#2e7e50]' : 'text-[#ad553d]')}>
                        {answerIsCorrect ? '判断正确' : `先收进错题：${currentQuestion.tag}`}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-[#4c6d73]">{currentQuestion.explanation}</p>
                      <Button variant="outline" size="sm" onClick={moveToNextQuestion} className="mt-4 border-[#cbdede] bg-white text-[#366169] hover:bg-[#eef7f7]">
                        下一题
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Button>
                    </div>
                  ) : (
                    <p className="mt-4 text-xs text-[#6f8b90]">选择一个答案后，会显示判题依据并记录错因。</p>
                  )}
                </div>
              </section>

              <aside className="space-y-5">
                <section className="rounded-lg border border-[#cfe0e0] bg-[#f9fcfc] p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <BrainCircuit className="size-4 text-[#0d7479]" aria-hidden="true" />
                    <h2 className="text-sm font-semibold">本轮练习</h2>
                  </div>
                  <dl className="mt-4 divide-y divide-[#dceaea]">
                    <div className="flex items-center justify-between py-3 text-sm">
                      <dt className="text-[#67848a]">已完成</dt>
                      <dd className="font-semibold text-[#1d4b53]">{completedCount} 题</dd>
                    </div>
                    <div className="flex items-center justify-between py-3 text-sm">
                      <dt className="text-[#67848a]">答对</dt>
                      <dd className="font-semibold text-[#1d4b53]">{correctCount} 题</dd>
                    </div>
                    <div className="flex items-center justify-between py-3 text-sm">
                      <dt className="text-[#67848a]">正确率</dt>
                      <dd className="font-semibold text-[#1d4b53]">
                        {completedCount ? Math.round((correctCount / completedCount) * 100) : 0}%
                      </dd>
                    </div>
                  </dl>
                </section>

                <section className="rounded-lg border border-[#cfe0e0] bg-[#f9fcfc] p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <CircleHelp className="size-4 text-[#b57c16]" aria-hidden="true" />
                      <h2 className="text-sm font-semibold">错因标签</h2>
                    </div>
                    <span className="text-xs text-[#6d898f]">{mistakeTags.length} 项</span>
                  </div>
                  {mistakeTags.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {mistakeTags.map((tag) => (
                        <span key={tag} className="rounded-full border border-[#ecd7a7] bg-[#fff8e7] px-2.5 py-1 text-xs text-[#80621c]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm leading-6 text-[#67848a]">答错后会按概念、变量、计算等原因归类，便于回看。</p>
                  )}
                </section>

                <section className="overflow-hidden rounded-lg border border-[#cfe0e0] bg-[#f9fcfc]">
                  <Image
                    src="/images/microscope-leaf-cells.png"
                    alt="显微镜下的绿色植物叶肉细胞"
                    width={720}
                    height={240}
                    sizes="(min-width: 1280px) 33vw, 100vw"
                    className="h-32 w-full object-cover object-center"
                  />
                  <div className="p-4">
                    <p className="text-xs font-semibold tracking-[0.08em] text-[#67858b]">教材依据</p>
                    <p className="mt-1 text-sm leading-6 text-[#46666d]">以人教版新课标知识体系组织，题目与讲解均为原创整理。</p>
                  </div>
                </section>
              </aside>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

type ControlSliderProps = {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  digits?: number;
  onChange: (value: number) => void;
};

function HeaderNavButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-8 shrink-0 rounded-md px-3 text-sm font-medium transition-colors',
        active
          ? 'bg-[#e7f2f1] text-[#155f68]'
          : 'text-[#59767c] hover:bg-[#edf5f5] hover:text-[#1e4f57]',
      )}
    >
      {children}
    </button>
  );
}

function ControlSlider({
  label,
  value,
  unit,
  min,
  max,
  step,
  digits = 0,
  onChange,
}: ControlSliderProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-[#37585f]">{label}</label>
        <output className="rounded-md bg-[#e8f4f3] px-2.5 py-1 text-sm font-semibold text-[#0c696f]">
          {value.toFixed(digits)}{unit ? ` ${unit}` : ''}
        </output>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(values) => {
          const nextValue = typeof values === 'number' ? values : values[0];
          onChange(nextValue ?? value);
        }}
        className="[&_[data-slot=slider-range]]:bg-[#0e787b] [&_[data-slot=slider-thumb]]:border-[#0e787b] [&_[data-slot=slider-thumb]]:bg-white"
        aria-label={label}
      />
      <div className="mt-2 flex justify-between text-[11px] text-[#799398]">
        <span>{min}{unit ? ` ${unit}` : ''}</span>
        <span>{max}{unit ? ` ${unit}` : ''}</span>
      </div>
    </div>
  );
}
