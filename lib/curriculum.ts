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
  {
    id: 'molecules-water',
    bookId: 'molecules',
    module: '细胞结构与物质运输',
    topic: '细胞中的水',
    prompt: '与萌发的种子相比，晒干的种子细胞中明显减少的物质是？',
    options: ['结合水', '自由水', '无机盐', '蛋白质'],
    answer: 1,
    explanation:
      '晒干过程中散失的主要是自由水。自由水参与代谢和物质运输，因此干燥种子代谢微弱；结合水是细胞结构的重要组成部分，其比例相对升高使种子抗逆性增强。',
    tag: '水的存在形式',
  },
  {
    id: 'molecules-protein',
    bookId: 'molecules',
    module: '细胞结构与物质运输',
    topic: '蛋白质变性',
    prompt: '鸡蛋清加热凝固后不能恢复原状，这一过程中被破坏的主要是蛋白质的？',
    options: ['氨基酸的种类', '肽键数目', '空间结构', '元素组成'],
    answer: 2,
    explanation:
      '高温使蛋白质变性，主要是氢键等相互作用被破坏，空间结构变得松散、展开；肽键并未断裂，氨基酸种类和元素组成都不变。',
    tag: '蛋白质变性',
  },
  {
    id: 'molecules-mitosis-count',
    bookId: 'molecules',
    module: '细胞增殖、分化与衰老',
    topic: '观察有丝分裂',
    prompt: '观察根尖分生区装片时，视野中处于某一分裂时期的细胞特别多，其主要原因是该时期？',
    options: ['细胞体积最大', '在细胞周期中所占时间最长', '染色体数目最多', '最容易被染色'],
    answer: 1,
    explanation:
      '解离时细胞已被固定并杀死，装片中的细胞停留在取材那一刻所处的时期。视野中某时期细胞数目多，说明该时期在细胞周期中持续时间最长。',
    tag: '实验分析',
  },
  {
    id: 'molecules-respiration',
    bookId: 'molecules',
    module: 'ATP、呼吸作用与光合作用',
    topic: '有氧呼吸',
    prompt: '有氧呼吸第三阶段的场所和主要产物分别是？',
    options: ['细胞质基质，丙酮酸和少量 ATP', '线粒体基质，二氧化碳和 ATP', '线粒体内膜，水和大量 ATP', '线粒体内膜，二氧化碳和酒精'],
    answer: 2,
    explanation:
      '第三阶段是前两阶段产生的 NADH（[H]）与氧气结合生成水，同时释放大量能量、合成大量 ATP，发生在线粒体内膜上。',
    tag: '呼吸场所',
  },
  {
    id: 'molecules-lightoff',
    bookId: 'molecules',
    module: 'ATP、呼吸作用与光合作用',
    topic: '光反应与暗反应',
    prompt: '其他条件不变，突然停止光照后短时间内，叶绿体中含量将上升的物质是？',
    options: ['C3（三碳化合物）', 'C5（五碳化合物）', 'NADPH', 'ATP'],
    answer: 0,
    explanation:
      '停止光照后光反应立即停止，NADPH 和 ATP 迅速减少，C3 的还原受阻；而二氧化碳的固定在短时间内仍在进行，因此 C3 增多、C5 减少。',
    tag: '影响因素分析',
  },
  {
    id: 'genetics-dihybrid',
    bookId: 'genetics',
    module: '遗传规律与配子分析',
    topic: '自由组合定律',
    prompt: '两对等位基因独立遗传时，基因型为 AaBb 的个体自交，后代中与亲本表型相同的个体所占比例是？',
    options: ['1/16', '1/4', '9/16', '3/16'],
    answer: 2,
    explanation: 'AaBb 自交后代中 A_B_（双显性，与亲本表型相同）占 9/16，其余 7/16 为重组表型或隐性表型。',
    tag: '概率计算',
  },
  {
    id: 'genetics-colorblind',
    bookId: 'genetics',
    module: '遗传规律与配子分析',
    topic: '伴性遗传',
    prompt: '一对表现型正常的夫妇生了一个患红绿色盲（伴 X 染色体隐性遗传）的儿子。他们再生一个患病孩子的概率是？',
    options: ['0', '1/4', '1/2', '3/4'],
    answer: 1,
    explanation:
      '儿子患病说明母亲是携带者（X^B X^b），父亲正常（X^B Y）。后代中只有儿子可能患病，概率为 1/2 × 1/2 = 1/4。',
    tag: '伴X隐性遗传',
  },
  {
    id: 'genetics-expression',
    bookId: 'genetics',
    module: 'DNA 的复制、转录与翻译',
    topic: '中心法则',
    prompt: '某基因编码区发生一个碱基对替换，mRNA 上相应密码子改变，但翻译出的氨基酸没有变化。最合理的解释是？',
    options: ['该基因发生了染色体结构变异', '遗传密码具有简并性', 'DNA 复制过程出现了差错', '核糖体识别出现了错误'],
    answer: 1,
    explanation:
      '一种氨基酸可以由多种密码子编码，这就是密码子的简并性。碱基替换后新密码子若仍编码同一氨基酸，蛋白质结构不变，性状一般也不变。',
    tag: '密码子简并性',
  },
  {
    id: 'genetics-mutation',
    bookId: 'genetics',
    module: '变异、育种与生物进化',
    topic: '基因突变',
    prompt: '下列关于基因突变与性状关系的叙述，正确的是？',
    options: ['基因突变必然导致生物性状改变', '隐性突变形成的杂合子表型可能不变', '基因突变只能发生在减数分裂过程中', '突变后的基因对生物一定是有害的'],
    answer: 1,
    explanation:
      '若突变为隐性（如 A→a），杂合子 Aa 的表型可能与 AA 相同；突变可发生在个体发育的任何时期；突变具有多害少利性但并非都有害，加上密码子简并性，突变不一定改变性状。',
    tag: '突变与性状',
  },
  {
    id: 'genetics-selection',
    bookId: 'genetics',
    module: '变异、育种与生物进化',
    topic: '现代生物进化理论',
    prompt: '现代生物进化理论认为，自然选择直接作用的对象是？',
    options: ['个体的基因型', '个体的表现型', '种群的基因频率', '环境中的无机条件'],
    answer: 1,
    explanation:
      '自然选择直接作用于个体表现出的性状（表现型），淘汰不适应环境的个体，从而间接地、定向地改变种群的基因频率。',
    tag: '自然选择',
  },
  {
    id: 'regulation-hemoglobin',
    bookId: 'regulation',
    module: '内环境与稳态',
    topic: '内环境成分',
    prompt: '下列物质中，不属于人体内环境成分的是？',
    options: ['葡萄糖', '血浆蛋白', '血红蛋白', '胰岛素'],
    answer: 2,
    explanation:
      '内环境指细胞外液（血浆、组织液、淋巴液等）。血红蛋白位于红细胞内部，不属于内环境；葡萄糖、血浆蛋白和激素都可以存在于细胞外液中。',
    tag: '内环境成分',
  },
  {
    id: 'regulation-insulin',
    bookId: 'regulation',
    module: '神经和体液调节',
    topic: '血糖调节',
    prompt: '关于血糖平衡调节，下列叙述正确的是？',
    options: ['胰岛 A 细胞分泌胰岛素降低血糖', '胰岛 B 细胞分泌胰岛素促进组织细胞摄取和利用葡萄糖', '胰岛素和胰高血糖素的作用都是升高血糖', '血糖浓度降低时胰岛素分泌增多'],
    answer: 1,
    explanation:
      '胰岛 B 细胞分泌胰岛素，促进组织细胞摄取、利用和储存葡萄糖，从而降低血糖；胰岛 A 细胞分泌胰高血糖素升高血糖，两者相互拮抗维持血糖稳定。',
    tag: '血糖平衡',
  },
  {
    id: 'regulation-ph',
    bookId: 'regulation',
    module: '内环境与稳态',
    topic: '内环境稳态',
    prompt: '人体血浆 pH 能保持相对稳定，直接依赖于血浆中存在的？',
    options: ['缓冲物质（如 H2CO3/NaHCO3）', '大量氧气', '血红蛋白', '消化酶'],
    answer: 0,
    explanation:
      '血浆中含有由弱酸和对应强碱盐组成的缓冲对（如 H2CO3/NaHCO3），能与进入血液的酸性或碱性物质反应，使 pH 保持在 7.35~7.45 的相对稳定范围内。',
    tag: '理化性质',
  },
  {
    id: 'regulation-feedback',
    bookId: 'regulation',
    module: '神经和体液调节',
    topic: '反馈调节',
    prompt: '血液中甲状腺激素含量升高时，会抑制下丘脑和垂体的分泌活动，这种调节机制属于？',
    options: ['正反馈调节', '负反馈调节', '免疫调节', '条件反射'],
    answer: 1,
    explanation:
      '甲状腺激素通过负反馈作用于下丘脑和垂体，抑制相应促激素的分泌，使激素水平不至于过高。负反馈调节是维持稳态的主要机制。',
    tag: '分级调节',
  },
  {
    id: 'regulation-immune-id',
    bookId: 'regulation',
    module: '免疫调节与健康',
    topic: '抗原识别',
    prompt: '下列细胞中，能特异性识别抗原的是？',
    options: ['吞噬细胞', '浆细胞', '细胞毒性 T 细胞', '成熟红细胞'],
    answer: 2,
    explanation:
      '细胞毒性 T 细胞能特异性识别被抗原入侵的靶细胞。吞噬细胞的识别没有特异性；浆细胞分泌抗体但本身不能识别抗原；成熟红细胞没有识别抗原的功能。',
    tag: '免疫细胞',
  },
  {
    id: 'ecology-efficiency',
    bookId: 'ecology',
    module: '生态系统能量与物质循环',
    topic: '能量传递效率',
    prompt: '生态系统中，能量沿食物链流动时，相邻两个营养级之间的传递效率一般为？',
    options: ['1%~5%', '10%~20%', '40%~60%', '接近 100%'],
    answer: 1,
    explanation:
      '每个营养级的能量都会因自身呼吸散失、流向分解者和未被利用而不能全部进入下一营养级，因此相邻营养级之间的传递效率通常只有 10%~20%。',
    tag: '传递效率',
  },
  {
    id: 'ecology-succession',
    bookId: 'ecology',
    module: '种群特征与群落结构',
    topic: '群落演替',
    prompt: '农田弃耕后，几年内陆续长出杂草、灌木，这类演替属于？',
    options: ['初生演替', '次生演替', '出生演替', '不发生演替'],
    answer: 1,
    explanation:
      '弃耕农田保留了原有土壤条件甚至种子或其他繁殖体，在此基础上发生的演替属于次生演替；初生演替发生在从来没有植被或植被被彻底消灭的裸岩等基质上。',
    tag: '演替类型',
  },
  {
    id: 'ecology-vertical',
    bookId: 'ecology',
    module: '种群特征与群落结构',
    topic: '垂直结构',
    prompt: '森林群落中不同鸟类分别占据林冠层、乔木层、灌木层等不同层次，影响鸟类垂直分层的主要因素是？',
    options: ['温度的垂直变化', '食物和栖息空间的垂直分层', '土壤含水量的差异', '风力大小'],
    answer: 1,
    explanation:
      '植物的垂直分层为动物提供了多样的食物和栖息空间，因此动物的分层主要取决于植物分层。垂直结构显著提高了群落利用阳光等环境资源的能力。',
    tag: '群落结构',
  },
  {
    id: 'ecology-info',
    bookId: 'ecology',
    module: '生态系统能量与物质循环',
    topic: '信息传递',
    prompt: '昆虫释放的性外激素能吸引同种异性个体前来交尾，这类信息属于生态系统信息中的？',
    options: ['物理信息', '化学信息', '行为信息', '营养信息'],
    answer: 1,
    explanation:
      '性外激素是昆虫分泌的挥发性化学物质，属于化学信息。信息传递对种群繁衍、调节种间关系和维持生态系统稳定都有重要作用。',
    tag: '信息类型',
  },
  {
    id: 'ecology-stability',
    bookId: 'ecology',
    module: '生态保护与人与自然',
    topic: '生态系统稳定性',
    prompt: '与北极苔原生态系统相比，热带雨林生态系统？',
    options: ['抵抗力稳定性更低', '恢复力稳定性更高', '抵抗力稳定性更高，恢复力稳定性更低', '两种稳定性都更低'],
    answer: 2,
    explanation:
      '热带雨林物种丰富、营养结构复杂，自我调节能力强，抵抗力稳定性高；但一旦遭到严重破坏，恢复非常缓慢，恢复力稳定性低。苔原生态系统的特点则相反。',
    tag: '稳定性比较',
  },
  {
    id: 'technology-sterilize',
    bookId: 'technology',
    module: '发酵工程与过程控制',
    topic: '无菌技术',
    prompt: '对培养基进行灭菌，最常用的方法是？',
    options: ['巴氏消毒法', '紫外线照射', '高压蒸汽灭菌法', '用体积分数 75% 的酒精擦拭'],
    answer: 2,
    explanation:
      '高压蒸汽灭菌法能杀灭包括芽孢在内的所有微生物，是培养基灭菌最常用的方法。紫外线和酒精擦拭多用于物体表面消毒，巴氏消毒不能杀灭芽孢。',
    tag: '灭菌与消毒',
  },
  {
    id: 'technology-clone',
    bookId: 'technology',
    module: '细胞工程与组织培养',
    topic: '核移植',
    prompt: '克隆羊"多莉"的培育过程中，将乳腺细胞的细胞核移入去核卵母细胞，这主要利用了？',
    options: ['动物体细胞的全能性', '动物体细胞核的全能性', '受精作用', '胚胎分割技术'],
    answer: 1,
    explanation:
      '高度分化的动物体细胞全能性受到限制，但其细胞核仍具有全能性。核移植技术把体细胞核放入去核卵母细胞中重新编程，最终培育出完整个体。',
    tag: '动物细胞工程',
  },
  {
    id: 'technology-hybridoma',
    bookId: 'technology',
    module: '细胞工程与组织培养',
    topic: '单克隆抗体',
    prompt: '单克隆抗体制备过程中，筛选得到的杂交瘤细胞的特点是？',
    options: ['只能无限增殖，不能产生抗体', '既能无限增殖，又能产生特异性抗体', '只能产生抗体，不能增殖', '具有全能性，可发育成完整个体'],
    answer: 1,
    explanation:
      '骨髓瘤细胞能无限增殖但不能产生抗体，B 淋巴细胞能产生特异性抗体但不能在体外长期增殖。两者融合形成的杂交瘤细胞兼具两种细胞的特点。',
    tag: '杂交瘤技术',
  },
  {
    id: 'technology-embryo',
    bookId: 'technology',
    module: '细胞工程与组织培养',
    topic: '体外受精',
    prompt: '体外受精前，对采集的精子需要进行的处理是？',
    options: ['低温冷冻', '获能处理', '离心洗涤后直接使用', '用秋水仙素处理'],
    answer: 1,
    explanation:
      '精子必须在雌性生殖道内或特定培养液中进行获能处理，获得受精能力后，才能与培养成熟的卵子完成体外受精。',
    tag: '胚胎工程',
  },
  {
    id: 'technology-restriction',
    bookId: 'technology',
    module: '基因工程与 PCR 技术',
    topic: '基因工程工具酶',
    prompt: '基因工程中，限制性内切核酸酶（限制酶）的作用是？',
    options: ['识别特定核苷酸序列，并在特定位点切断磷酸二酯键', '识别特定序列并切断氢键', '将两个 DNA 片段连接起来', '随机水解 DNA 分子'],
    answer: 0,
    explanation:
      '限制酶能识别双链 DNA 分子中的特定核苷酸序列，并使每条链中特定部位的两个核苷酸之间的磷酸二酯键断开，形成黏性末端或平末端。',
    tag: '基因工程工具',
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
  | 'auxinCutting'
  | 'yeastPopulation'
  | 'lowTempPolyploid'
  | 'meiosisSlide'
  | 'bloodSugarRegulation'
  | 'soilFaunaSurvey'
  | 'pickleFerment'
  | 'pcr'
  | 'reflexArc'
  | 'thyroidAxis'
  | 'markRecapture'
  | 'succession'
  | 'dnaReplication'
  | 'geneticPedigree'
  | 'ecosystemJar'
  | 'embryoTransfer';

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
  auxinCutting: {
    title: '探索生长素类似物促进插条生根的最适浓度',
    kicker: '选择性必修 1 · 稳态与调节',
    description: '不同浓度生长素类似物处理插条，找出促进生根的最适浓度。',
    relatedBook: 'regulation',
    relatedModule: '内环境与稳态',
  },
  yeastPopulation: {
    title: '培养液中酵母菌种群数量的变化',
    kicker: '选择性必修 2 · 生物与环境',
    description: '抽样计数酵母菌数量，观察 S 型增长与 K 值。',
    relatedBook: 'ecology',
    relatedModule: '种群特征与群落结构',
  },
  lowTempPolyploid: {
    title: '低温诱导植物染色体数目的变化',
    kicker: '必修 2 · 遗传与进化',
    description: '低温抑制纺锤体形成，染色体数目加倍的原理验证。',
    relatedBook: 'genetics',
    relatedModule: '遗传规律与配子分析',
  },
  meiosisSlide: {
    title: '观察蝗虫精母细胞减数分裂',
    kicker: '必修 2 · 遗传与进化',
    description: '固定装片显微视野：判断细胞处于减数分裂的哪个时期。',
    relatedBook: 'genetics',
    relatedModule: '遗传规律与配子分析',
  },
  bloodSugarRegulation: {
    title: '血糖平衡的调节模拟',
    kicker: '选择性必修 1 · 稳态与调节',
    description: '进食与运动后血糖偏离，胰岛素与胰高血糖素拮抗调节。',
    relatedBook: 'regulation',
    relatedModule: '内环境与稳态',
  },
  soilFaunaSurvey: {
    title: '土壤中小动物类群丰富度的研究',
    kicker: '选择性必修 2 · 生物与环境',
    description: '取样器取样法采集土壤小动物，统计类群丰富度。',
    relatedBook: 'ecology',
    relatedModule: '种群特征与群落结构',
  },
  pickleFerment: {
    title: '泡菜的制作',
    kicker: '选择性必修 3 · 生物技术与工程',
    description: '乳酸菌无氧发酵制作泡菜，追踪亚硝酸盐含量变化。',
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
  reflexArc: {
    title: '反射弧与膝跳反射',
    kicker: '选择性必修 1 · 稳态与调节',
    description: '自己选叩击位置做膝跳反射，按顺序点亮反射弧五环节。',
    relatedBook: 'regulation',
    relatedModule: '神经和体液调节',
  },
  thyroidAxis: {
    title: '甲状腺激素的分级调节',
    kicker: '选择性必修 1 · 稳态与调节',
    description: '搭建下丘脑—垂体—甲状腺轴，注入外源激素或切除腺体看负反馈。',
    relatedBook: 'regulation',
    relatedModule: '神经和体液调节',
  },
  markRecapture: {
    title: '标志重捕法估算种群数量',
    kicker: '选择性必修 2 · 生物与环境',
    description: '自己决定标记数与重捕量，多次取样看估算如何逼近真值。',
    relatedBook: 'ecology',
    relatedModule: '种群特征与群落结构',
  },
  succession: {
    title: '群落演替：裸岩与弃耕农田',
    kicker: '选择性必修 2 · 生物与环境',
    description: '推时间看优势种替换与土壤加厚，加入放牧干扰让演替停滞。',
    relatedBook: 'ecology',
    relatedModule: '种群特征与群落结构',
  },
  dnaReplication: {
    title: 'DNA 半保留复制实验',
    kicker: '必修 2 · 遗传与进化',
    description: '15N 标记转入轻培养基逐代离心：两种假说谁在第 1 代出局？',
    relatedBook: 'genetics',
    relatedModule: 'DNA 的复制、转录与翻译',
  },
  geneticPedigree: {
    title: '遗传系谱分析',
    kicker: '必修 2 · 遗传与进化',
    description: '三份家系图两步定式：先判显隐性，再判常染色体还是伴 X。',
    relatedBook: 'genetics',
    relatedModule: '遗传规律与配子分析',
  },
  ecosystemJar: {
    title: '设计制作生态缸',
    kicker: '选择性必修 2 · 生物与环境',
    description: '自己搭配组分封缸观察 30 天：缺一环，生态系统能撑几天？',
    relatedBook: 'ecology',
    relatedModule: '生态保护与人与自然',
  },
  embryoTransfer: {
    title: '体外受精与胚胎移植',
    kicker: '选择性必修 3 · 生物技术与工程',
    description: '五步流程排序 + 移植时机判断，走通试管生命的第一程。',
    relatedBook: 'technology',
    relatedModule: '细胞工程与组织培养',
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
    ids: ['traitSeparation', 'lowTempPolyploid', 'meiosisSlide', 'genetics', 'geneticPedigree', 'dogma', 'dnaReplication', 'selection', 'geneEngine'],
  },
  {
    name: '稳态与调节',
    icon: '⚡',
    ids: ['urineGlucoseTest', 'auxinCutting', 'bloodSugarRegulation', 'impulse', 'reflexArc', 'thyroidAxis'],
  },
  {
    name: '生态',
    icon: '🌱',
    ids: ['quadratMethod', 'markRecapture', 'yeastPopulation', 'soilFaunaSurvey', 'succession', 'energy', 'population', 'ecosystemJar'],
  },
  {
    name: '生物技术',
    icon: '⚙️',
    ids: ['plateStreak', 'wineVinegar', 'pickleFerment', 'tissueCulture', 'pcr', 'embryoTransfer'],
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
  'lowTempPolyploid',
  'meiosisSlide',
  'genetics',
  'geneticPedigree',
  'dogma',
  'dnaReplication',
  'selection',
  // 选择性必修 1 · 稳态与调节
  'urineGlucoseTest',
  'auxinCutting',
  'bloodSugarRegulation',
  'impulse',
  'reflexArc',
  'thyroidAxis',
  // 选择性必修 2 · 生物与环境
  'quadratMethod',
  'markRecapture',
  'yeastPopulation',
  'soilFaunaSurvey',
  'succession',
  'energy',
  'population',
  'ecosystemJar',
  // 选择性必修 3 · 生物技术与工程
  'geneEngine',
  'dnaExtract',
  'plateStreak',
  'wineVinegar',
  'pickleFerment',
  'tissueCulture',
  'pcr',
  'embryoTransfer',
];
