import { Atom, Dna, Activity, Leaf, FlaskConical } from 'lucide-react';

export const textbooks = [
  {
    id: 'molecules',
    volume: '必修 1',
    title: '分子与细胞',
    icon: Atom,
    color: 'text-cyan-700 bg-cyan-50 border-cyan-100',
    summary: '细胞结构、物质运输、能量转换与细胞生命历程。',
    modules: ['细胞结构与物质运输', 'ATP、呼吸作用与光合作用', '细胞增殖、分化与衰老'],
  },
  {
    id: 'genetics',
    volume: '必修 2',
    title: '遗传与进化',
    icon: Dna,
    color: 'text-violet-700 bg-violet-50 border-violet-100',
    summary: '遗传规律、DNA 的复制与表达、变异和生物进化。',
    modules: ['遗传规律与配子分析', 'DNA 的复制、转录与翻译', '变异、育种与生物进化'],
  },
  {
    id: 'regulation',
    volume: '选择性必修 1',
    title: '稳态与调节',
    icon: Activity,
    color: 'text-rose-700 bg-rose-50 border-rose-100',
    summary: '神经调节、体液调节、免疫调节与内环境稳态。',
    modules: ['内环境与稳态', '神经和体液调节', '免疫调节与健康'],
  },
  {
    id: 'ecology',
    volume: '选择性必修 2',
    title: '生物与环境',
    icon: Leaf,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    summary: '种群、群落、生态系统、人与环境的关系。',
    modules: ['种群特征与群落结构', '生态系统能量与物质循环', '生态保护与人与自然'],
  },
  {
    id: 'technology',
    volume: '选择性必修 3',
    title: '生物技术与工程',
    icon: FlaskConical,
    color: 'text-amber-700 bg-amber-50 border-amber-100',
    summary: '发酵工程、细胞工程、基因工程与生物技术实践。',
    modules: ['发酵工程与过程控制', '细胞工程与组织培养', '基因工程与 PCR 技术'],
  },
] as const;

export type BookId = (typeof textbooks)[number]['id'];

export function getBook(bookId: string) {
  return textbooks.find((book) => book.id === bookId) ?? textbooks[0];
}

export function questionSource(bookId: string) {
  const book = getBook(bookId);
  return `${book.volume} · ${book.title}`;
}

export type Question = {
  id: string;
  bookId: BookId;
  module: string;
  topic: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
  tag: string;
};

/** 题库中每个模块期望的题量（用于覆盖追踪，教师可在教师中心看到差距）。 */
export const MODULE_TARGET_COUNT = 5;

export const builtinQuestions: Question[] = [
  {
    id: 'molecules-variables',
    bookId: 'molecules',
    module: 'ATP、呼吸作用与光合作用',
    topic: '实验变量控制',
    prompt: '探究温度对淀粉酶活性的影响时，各实验组之间应保持一致的是？',
    options: ['水浴的温度', '底物浓度与反应时间', '酶的最适温度', '反应产物的多少'],
    answer: 1,
    explanation:
      '温度是本实验的自变量。为了让结果只反映温度的影响，底物浓度、酶量、pH 和反应时间等条件要保持一致。',
    tag: '变量控制',
  },
  {
    id: 'molecules-secretion',
    bookId: 'molecules',
    module: '细胞结构与物质运输',
    topic: '分泌蛋白合成',
    prompt: '用放射性氨基酸追踪某分泌蛋白的合成，标记物最先显著出现的结构是？',
    options: ['附着核糖体的内质网', '高尔基体', '细胞膜', '溶酶体'],
    answer: 0,
    explanation:
      '分泌蛋白先在附着于内质网的核糖体上合成，再经内质网、高尔基体加工和运输，最后通过细胞膜分泌到细胞外。',
    tag: '结构与功能',
  },
  {
    id: 'molecules-starch',
    bookId: 'molecules',
    module: 'ATP、呼吸作用与光合作用',
    topic: '光合作用实验',
    prompt: '验证绿叶在光下制造淀粉的实验中，实验前将盆栽放在黑暗处一昼夜的主要目的是什么？',
    options: ['使叶片气孔全部关闭', '耗尽或转运叶片中原有的淀粉', '提高叶绿体中叶绿素含量', '降低细胞呼吸速率'],
    answer: 1,
    explanation:
      '暗处理是为了尽量排除叶片中原有淀粉的干扰，使后续检测到的淀粉更能说明是在实验光照条件下新形成的。',
    tag: '实验目的',
  },
  {
    id: 'genetics-segregation',
    bookId: 'genetics',
    module: '遗传规律与配子分析',
    topic: '基因分离定律',
    prompt: '某性状由一对等位基因控制，亲本基因型为 Aa 与 aa。子代出现隐性表型的概率是？',
    options: ['0', '1/4', '1/2', '3/4'],
    answer: 2,
    explanation:
      'Aa 产生 A、a 两种配子，aa 只产生 a 配子。子代基因型为 Aa 和 aa 的概率各为 1/2，因此隐性表型 aa 的概率为 1/2。',
    tag: '配子分析',
  },
  {
    id: 'genetics-replication',
    bookId: 'genetics',
    module: 'DNA 的复制、转录与翻译',
    topic: 'DNA 半保留复制',
    prompt: '一个 DNA 分子复制一次后，形成的两个子代 DNA 分子通常具有怎样的链组成？',
    options: ['各含两条亲代链', '各含一条亲代链和一条新合成链', '一条全为亲代链，另一条全为新合成链', '两条链均来自同一条亲代链'],
    answer: 1,
    explanation: 'DNA 复制遵循半保留复制的特点：两条亲代链分开后分别作为模板，各合成一条新的互补链。',
    tag: '复制模型',
  },
  {
    id: 'genetics-meiosis',
    bookId: 'genetics',
    module: '遗传规律与配子分析',
    topic: '减数分裂',
    prompt: '等位基因随同源染色体分离而分离，最直接对应减数分裂的哪个事件？',
    options: ['减数第一次分裂后期同源染色体分离', '减数第二次分裂后期着丝粒分裂', '有丝分裂前期染色体螺旋化', '受精时雌雄配子结合'],
    answer: 0,
    explanation:
      '在减数第一次分裂后期，同源染色体分离并移向细胞两极，其上携带的等位基因也随之分开，体现了分离定律的细胞学基础。',
    tag: '细胞学基础',
  },
  {
    id: 'regulation-thermoregulation',
    bookId: 'regulation',
    module: '神经和体液调节',
    topic: '内环境稳态',
    prompt: '人在高温环境中出汗增多。该调节过程的直接意义更接近下列哪一项？',
    options: ['使体温完全不发生变化', '增强皮肤吸收热量', '通过蒸发散热维持体温相对稳定', '让所有细胞代谢速率相同'],
    answer: 2,
    explanation: '汗液蒸发会带走热量，使体温保持在相对稳定的范围内。稳态不是绝对不变，而是动态平衡。',
    tag: '稳态理解',
  },
  {
    id: 'regulation-reflex',
    bookId: 'regulation',
    module: '神经和体液调节',
    topic: '神经调节',
    prompt: '手指被针刺后迅速缩手，随后才感到疼痛。下列解释正确的是？',
    options: ['缩手反射和痛觉都在脊髓形成', '痛觉在大脑皮层形成，缩手反射可由脊髓完成', '感觉神经元只把兴奋传到大脑皮层', '效应器先产生痛觉再完成反射'],
    answer: 1,
    explanation:
      '缩手反射属于非条件反射，反射中枢可在脊髓；疼痛等感觉的形成需要大脑皮层参与，因此常发生在缩手之后。',
    tag: '反射弧',
  },
  {
    id: 'regulation-vaccine',
    bookId: 'regulation',
    module: '免疫调节与健康',
    topic: '特异性免疫',
    prompt: '接种某疫苗后，机体获得较持久保护作用的主要原因是？',
    options: ['疫苗直接杀灭所有病原体', '体内始终保留大量外来抗原', '产生相应的记忆细胞，再遇相同抗原可更快应答', '非特异性免疫从此不再发挥作用'],
    answer: 2,
    explanation:
      '疫苗中的抗原成分会诱导特异性免疫，形成相应记忆细胞。再次接触相同抗原时，机体能更快、更强地发生免疫应答。',
    tag: '免疫记忆',
  },
  {
    id: 'ecology-energy',
    bookId: 'ecology',
    module: '生态系统能量与物质循环',
    topic: '生态系统能量流动',
    prompt: '食物链中，能量由一个营养级传递到下一营养级时，通常会怎样变化？',
    options: ['全部转化为下一营养级的有机物', '逐级递减', '只在分解者之间传递', '不受呼吸作用影响'],
    answer: 1,
    explanation:
      '每个营养级的生物都会通过呼吸作用散失一部分能量，且并非所有有机物都被下一营养级取食，因此能量会沿食物链逐级递减。',
    tag: '能量流动',
  },
  {
    id: 'ecology-quadrat',
    bookId: 'ecology',
    module: '种群特征与群落结构',
    topic: '种群密度调查',
    prompt: '调查一片草地中蒲公英的种群密度，较合适的取样方法是？',
    options: ['标志重捕法', '样方法', '逐只编号法', '仅统计草地边缘个体'],
    answer: 1,
    explanation:
      '蒲公英是分布相对固定的植物，常用样方法估算种群密度。标志重捕法更适用于活动能力较强、个体数量较多的动物。',
    tag: '调查方法',
  },
  {
    id: 'ecology-carbon',
    bookId: 'ecology',
    module: '生态系统能量与物质循环',
    topic: '物质循环',
    prompt: '在碳循环中，生产者使无机环境中的碳进入生物群落的主要途径是？',
    options: ['呼吸作用释放二氧化碳', '光合作用固定二氧化碳', '消费者的摄食', '分解者分解遗体残骸'],
    answer: 1,
    explanation: '绿色植物等生产者通过光合作用把二氧化碳转化为有机物，使无机环境中的碳进入生物群落。',
    tag: '碳循环',
  },
  {
    id: 'technology-fermentation',
    bookId: 'technology',
    module: '发酵工程与过程控制',
    topic: '发酵工程',
    prompt: '在微生物发酵的培养过程中，连续监测并调节培养条件的主要目的是什么？',
    options: ['使所有微生物停止生长', '维持适宜条件以提高目标产物产量', '让培养基成分保持绝对不变', '避免任何气体参与培养过程'],
    answer: 1,
    explanation:
      '发酵过程需要根据微生物生长和产物形成的需要调节温度、pH、溶氧等条件，以提高目标产物的产量和稳定性。',
    tag: '过程调控',
  },
  {
    id: 'technology-tissue-culture',
    bookId: 'technology',
    module: '细胞工程与组织培养',
    topic: '植物组织培养',
    prompt: '利用一小块植物组织在无菌培养基上培育出完整植株，主要体现了植物细胞的什么特点？',
    options: ['细胞膜的流动性', '细胞全能性', '基因突变的随机性', '蛋白质的多样性'],
    answer: 1,
    explanation:
      '在适宜的营养、激素和无菌条件下，植物细胞可以脱分化、再分化形成完整植株，这体现了植物细胞的全能性。',
    tag: '细胞全能性',
  },
  {
    id: 'technology-pcr',
    bookId: 'technology',
    module: '基因工程与 PCR 技术',
    topic: 'PCR 技术',
    prompt: 'PCR 反应体系中，耐高温 DNA 聚合酶的主要作用是？',
    options: ['切断 DNA 双链之间的氢键', '从引物的 3′ 端延伸合成新的 DNA 链', '识别并标记目的基因', '将 DNA 片段连接成环状'],
    answer: 1,
    explanation:
      'PCR 的变性步骤使 DNA 双链分开；退火后，耐高温 DNA 聚合酶以模板链为依据，从引物 3′ 端延伸合成新的 DNA 链。',
    tag: '技术原理',
  },
];

/** 实验台数据（纯前端模拟 + 过程动画，覆盖全部五册教材模块）。 */
export type ExperimentId =
  | 'microscope'
  | 'tissueDetection'
  | 'cellMembranePrep'
  | 'chloroplastStreaming'
  | 'dnaRnaDistribution'
  | 'cellSizeTransport'
  | 'plasmolysis'
  | 'catalase'
  | 'amylaseSpecificity'
  | 'yeastRespiration'
  | 'enzyme'
  | 'photosynthesis'
  | 'pigment'
  | 'mitosisObservation'
  | 'traitSeparation'
  | 'quadratMethod'
  | 'urineGlucoseTest'
  | 'genetics'
  | 'dogma'
  | 'selection'
  | 'impulse'
  | 'energy'
  | 'population'
  | 'geneEngine'
  | 'dnaExtract'
  | 'plateStreak'
  | 'wineVinegar'
  | 'tissueCulture'
  | 'pcr';

export const experimentMeta: Record<
  ExperimentId,
  {
    title: string;
    kicker: string;
    description: string;
    relatedBook: BookId;
    relatedModule: string;
  }
> = {
  microscope: {
    title: '显微镜操作与细胞观察',
    kicker: '必修 1 · 分子与细胞',
    description: '低倍到高倍：移片、换镜、调焦与调光全流程，操作对错即时反馈。',
    relatedBook: 'molecules',
    relatedModule: '细胞结构与物质运输',
  },
  cellMembranePrep: {
    title: '体验制备细胞膜的方法',
    kicker: '必修 1 · 分子与细胞',
    description: '亲手滴水：看红细胞吸水涨破，理解为什么选它做细胞膜材料。',
    relatedBook: 'molecules',
    relatedModule: '细胞结构与物质运输',
  },
  chloroplastStreaming: {
    title: '观察叶绿体与细胞质流动',
    kicker: '必修 1 · 分子与细胞',
    description: '调温度看黑藻叶绿体随细胞质流动，流速实时跟随变化。',
    relatedBook: 'molecules',
    relatedModule: '细胞结构与物质运输',
  },
  dnaRnaDistribution: {
    title: '观察 DNA 和 RNA 在细胞中的分布',
    kicker: '必修 1 · 分子与细胞',
    description: '试剂自己选、流程自己排：让细胞核变绿、细胞质变红。',
    relatedBook: 'molecules',
    relatedModule: '细胞结构与物质运输',
  },
  cellSizeTransport: {
    title: '细胞大小与物质运输的关系',
    kicker: '必修 1 · 分子与细胞',
    description: '切琼脂块看扩散：边长变小，运输效率为什么反而升高？',
    relatedBook: 'molecules',
    relatedModule: '细胞结构与物质运输',
  },
  tissueDetection: {
    title: '检测组织中的糖类、脂肪和蛋白质',
    kicker: '必修 1 · 分子与细胞',
    description: '斐林试剂、碘液、双缩脲与苏丹Ⅲ四路显色，亲手完成组织鉴定。',
    relatedBook: 'molecules',
    relatedModule: '细胞结构与物质运输',
  },
  enzyme: {
    title: '酶促反应：温度与 pH',
    kicker: '必修 1 · 分子与细胞',
    description: '观察底物与酶的结合、产物释放，以及高温变性失活。',
    relatedBook: 'molecules',
    relatedModule: 'ATP、呼吸作用与光合作用',
  },
  catalase: {
    title: '过氧化氢在不同条件下的分解',
    kicker: '必修 1 · 分子与细胞',
    description: '常温、加热、Fe³⁺ 与过氧化氢酶四支试管对比气泡与复燃。',
    relatedBook: 'molecules',
    relatedModule: 'ATP、呼吸作用与光合作用',
  },
  amylaseSpecificity: {
    title: '淀粉酶对淀粉和蔗糖的水解',
    kicker: '必修 1 · 分子与细胞',
    description: '底物和酶自由组合试错，斐林试剂验证酶的专一性。',
    relatedBook: 'molecules',
    relatedModule: 'ATP、呼吸作用与光合作用',
  },
  yeastRespiration: {
    title: '探究酵母菌细胞的呼吸方式',
    kicker: '必修 1 · 分子与细胞',
    description: '自己搭有氧/无氧装置，石灰水与重铬酸钾检验产物。',
    relatedBook: 'molecules',
    relatedModule: 'ATP、呼吸作用与光合作用',
  },
  photosynthesis: {
    title: '光合作用：光反应现场',
    kicker: '必修 1 · 分子与细胞',
    description: '光子、二氧化碳与氧气气泡，实时反映光合速率。',
    relatedBook: 'molecules',
    relatedModule: 'ATP、呼吸作用与光合作用',
  },
  pigment: {
    title: '叶绿体色素的提取与分离',
    kicker: '必修 1 · 分子与细胞',
    description: '研磨、画线、层析，看四条色素带在滤纸条上依次展开。',
    relatedBook: 'molecules',
    relatedModule: 'ATP、呼吸作用与光合作用',
  },
  traitSeparation: {
    title: '性状分离比的模拟',
    kicker: '必修 2 · 遗传与进化',
    description: '抓取雌雄配子随机结合，统计 DD、Dd、dd 后代比例趋近 1:2:1。',
    relatedBook: 'genetics',
    relatedModule: '遗传规律与配子分析',
  },
  quadratMethod: {
    title: '样方法调查种群密度',
    kicker: '选择性必修 2 · 生物与环境',
    description: '在草地分布图上随机放置样方计数，估算种群密度。',
    relatedBook: 'ecology',
    relatedModule: '种群特征与群落结构',
  },
  urineGlucoseTest: {
    title: '模拟尿糖的检测',
    kicker: '选择性必修 1 · 稳态与调节',
    description: '用尿糖试纸检测三份尿样，对照比色卡判断是否含糖。',
    relatedBook: 'regulation',
    relatedModule: '内环境与稳态',
  },
  mitosisObservation: {
    title: '观察根尖分生组织细胞的有丝分裂',
    kicker: '必修 1 · 分子与细胞',
    description: '选对取材区、排对装片流程，显微视野里认出各分裂期细胞。',
    relatedBook: 'molecules',
    relatedModule: '细胞增殖、分化与衰老',
  },
  plasmolysis: {
    title: '质壁分离与复原',
    kicker: '必修 1 · 分子与细胞',
    description: '调节外界溶液浓度，观察原生质体失水收缩与吸水复原。',
    relatedBook: 'molecules',
    relatedModule: '细胞结构与物质运输',
  },
  genetics: {
    title: '遗传规律模拟器',
    kicker: '必修 2 · 遗传与进化',
    description: 'Punnett 方格推演配子组合，模拟后代表型比例。',
    relatedBook: 'genetics',
    relatedModule: '遗传规律与配子分析',
  },
  dogma: {
    title: '中心法则：转录与翻译',
    kicker: '必修 2 · 遗传与进化',
    description: '分步观看 DNA 解旋、mRNA 合成与多肽链延伸。',
    relatedBook: 'genetics',
    relatedModule: 'DNA 的复制、转录与翻译',
  },
  selection: {
    title: '自然选择：桦尺蛾模拟',
    kicker: '必修 2 · 遗传与进化',
    description: '改变环境背景，观察种群基因频率被定向改变。',
    relatedBook: 'genetics',
    relatedModule: '变异、育种与生物进化',
  },
  impulse: {
    title: '兴奋在神经纤维上的传导',
    kicker: '选择性必修 1 · 稳态与调节',
    description: '施加刺激，验证阈值、全或无与双向传导。',
    relatedBook: 'regulation',
    relatedModule: '神经和体液调节',
  },
  energy: {
    title: '生态系统能量流动',
    kicker: '选择性必修 2 · 生物与环境',
    description: '能量粒子沿食物链分流：流向下一级与呼吸散失。',
    relatedBook: 'ecology',
    relatedModule: '生态系统能量与物质循环',
  },
  population: {
    title: '种群增长：J 型与 S 型',
    kicker: '选择性必修 2 · 生物与环境',
    description: '调节 K 值与增长率，对比两种增长模型。',
    relatedBook: 'ecology',
    relatedModule: '种群特征与群落结构',
  },
  geneEngine: {
    title: '基因工程：四步操作流程',
    kicker: '选择性必修 3 · 生物技术与工程',
    description: '切、连、导、检：亲手构建重组质粒，培育转基因抗虫棉。',
    relatedBook: 'technology',
    relatedModule: '基因工程与 PCR 技术',
  },
  dnaExtract: {
    title: 'DNA 粗提取与鉴定',
    kicker: '选择性必修 3 · 生物技术与工程',
    description: '溶膜、溶解、析出、鉴定：看白色丝状物遇二苯胺沸水浴变蓝。',
    relatedBook: 'technology',
    relatedModule: '基因工程与 PCR 技术',
  },
  plateStreak: {
    title: '微生物的平板划线培养',
    kicker: '选择性必修 3 · 生物技术与工程',
    description: '灼烧接种环，在平板上分区划线，培养后观察单菌落。',
    relatedBook: 'technology',
    relatedModule: '发酵工程与过程控制',
  },
  wineVinegar: {
    title: '果酒与果醋的制作',
    kicker: '选择性必修 3 · 生物技术与工程',
    description: '酵母菌无氧发酵成果酒，醋酸菌有氧发酵把酒变醋。',
    relatedBook: 'technology',
    relatedModule: '发酵工程与过程控制',
  },
  tissueCulture: {
    title: '菊花的组织培养',
    kicker: '选择性必修 3 · 生物技术与工程',
    description: '外植体脱分化成愈伤组织，激素配比决定再分化方向。',
    relatedBook: 'technology',
    relatedModule: '发酵工程与过程控制',
  },
  pcr: {
    title: 'PCR 基因扩增',
    kicker: '选择性必修 3 · 生物技术与工程',
    description: '变性、退火、延伸三步循环，观察拷贝数指数增长。',
    relatedBook: 'technology',
    relatedModule: '基因工程与 PCR 技术',
  },
};

/** 实验目录分类：按教材实验主题归组，方便在 /lab 快速筛选 */
export const EXPERIMENT_CATEGORIES: { name: string; icon: string; ids: ExperimentId[] }[] = [
  {
    name: '显微观察类',
    icon: '🔬',
    ids: ['microscope', 'chloroplastStreaming', 'mitosisObservation'],
  },
  {
    name: '物质检测与鉴定',
    icon: '🧪',
    ids: ['tissueDetection', 'dnaRnaDistribution', 'dnaExtract', 'cellSizeTransport'],
  },
  {
    name: '酶与代谢',
    icon: '⚗️',
    ids: ['catalase', 'amylaseSpecificity', 'yeastRespiration', 'enzyme', 'photosynthesis', 'pigment'],
  },
  {
    name: '细胞与膜',
    icon: '🫧',
    ids: ['cellMembranePrep', 'plasmolysis'],
  },
  {
    name: '遗传与进化',
    icon: '🧬',
    ids: ['traitSeparation', 'genetics', 'dogma', 'selection', 'geneEngine'],
  },
  {
    name: '稳态与调节',
    icon: '⚡',
    ids: ['urineGlucoseTest', 'impulse'],
  },
  {
    name: '生态',
    icon: '🌱',
    ids: ['quadratMethod', 'energy', 'population'],
  },
  {
    name: '生物技术',
    icon: '⚙️',
    ids: ['plateStreak', 'wineVinegar', 'tissueCulture', 'pcr'],
  },
];

export const experimentOrder: ExperimentId[] = [
  // 必修 1 · 分子与细胞（按课本章节先后排序）
  'microscope',
  'tissueDetection',
  'cellMembranePrep',
  'chloroplastStreaming',
  'dnaRnaDistribution',
  'cellSizeTransport',
  'plasmolysis',
  'catalase',
  'amylaseSpecificity',
  'yeastRespiration',
  'enzyme',
  'pigment',
  'photosynthesis',
  'mitosisObservation',
  // 必修 2 · 遗传与进化
  'traitSeparation',
  'genetics',
  'dogma',
  'selection',
  // 选择性必修 1 · 稳态与调节
  'urineGlucoseTest',
  'impulse',
  // 选择性必修 2 · 生物与环境
  'quadratMethod',
  'energy',
  'population',
  // 选择性必修 3 · 生物技术与工程
  'geneEngine',
  'dnaExtract',
  'plateStreak',
  'wineVinegar',
  'tissueCulture',
  'pcr',
];
