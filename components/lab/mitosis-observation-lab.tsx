'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

type Phase = 'inter' | 'pro' | 'meta' | 'ana' | 'tel';

const PHASE_NAMES: Record<Phase, string> = {
  inter: '间期',
  pro: '前期',
  meta: '中期',
  ana: '后期',
  tel: '末期',
};

const PHASE_FEATURES: Record<Phase, string> = {
  inter: '细胞核膜完整、核仁明显，染色体还没浓缩（呈染色质状态）——DNA 复制和蛋白质合成发生在这个时期。',
  pro: '染色质螺旋化成染色体（散乱分布），核膜解体、核仁消失，纺锤体开始出现。',
  meta: '染色体的着丝点整齐排列在赤道板上，形态清晰、数目易数——观察和计数染色体的最佳时期。',
  ana: '着丝点分裂，姐妹染色单体分开成两组染色体，在纺锤丝牵引下移向细胞两极。',
  tel: '两组染色体到达两极后重新变为染色质，核膜核仁重建；植物细胞在中部出现细胞板，形成两个子细胞。',
};

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>根尖<span className="font-semibold">分生区</span>细胞正在进行旺盛的有丝分裂——取材必须取分生区（根尖端约 2~3mm）。</>,
      <>解离（盐酸）使细胞相互分离；漂洗洗去盐酸便于染色；染色（龙胆紫/醋酸洋红）使染色体着色；压片使细胞分散成单层。</>,
      <>在一个视野中，大部分细胞处于<span className="font-semibold">间期</span>（分裂期时间占比小）。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：洋葱（约 2~3cm 长的根尖）。</>,
      <>试剂：质量分数 15% 盐酸与体积分数 95% 酒精混合液（1:1）、清水（漂洗）、龙胆紫溶液（或醋酸洋红）。</>,
      <>用具：载玻片、盖玻片、镊子、刀片、培养皿、显微镜。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 取材：剪取根尖顶端 2~3mm（分生区）。</>,
      <>② 解离：放入盐酸-酒精混合液 3~5 min，使细胞分散开。</>,
      <>③ 漂洗：用清水漂洗约 10 min，洗去盐酸（否则影响染色）。</>,
      <>④ 染色：用龙胆紫溶液染色 3~5 min。</>,
      <>⑤ 压片：捣碎根尖、盖上盖玻片轻压，使细胞分散成单层后镜检。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>流程口诀：<span className="font-semibold">解离 → 漂洗 → 染色 → 压片</span>（顺序不能乱：先解离后漂洗，否则染色失败）。</>,
      <>看到的细胞是<span className="font-semibold">死细胞（已被解离固定）</span>，不能观察动态分裂过程；也不能看到细胞板形成等动态。</>,
      <>视野中大多数细胞处于间期；中期染色体形态最清晰、数目最易统计。</>,
      <>分不清的先看染色体位置：散乱→前期；赤道板一排→中期；两组分向两极→后期；两核重现→末期。</>,
    ],
  },
];

type CellItem = { id: number; phase: Phase; cx: number; cy: number; answered: null | boolean };

const FIELD_CELLS: CellItem[] = [
  { id: 1, phase: 'inter', cx: 90, cy: 80, answered: null },
  { id: 2, phase: 'pro', cx: 200, cy: 60, answered: null },
  { id: 3, phase: 'meta', cx: 320, cy: 90, answered: null },
  { id: 4, phase: 'inter', cx: 70, cy: 190, answered: null },
  { id: 5, phase: 'ana', cx: 175, cy: 165, answered: null },
  { id: 6, phase: 'tel', cx: 290, cy: 185, answered: null },
  { id: 7, phase: 'meta', cx: 380, cy: 200, answered: null },
  { id: 8, phase: 'pro', cx: 120, cy: 265, answered: null },
  { id: 9, phase: 'inter', cx: 250, cy: 270, answered: null },
  { id: 10, phase: 'tel', cx: 365, cy: 280, answered: null },
];

const STEP_LABELS = ['解离', '漂洗', '染色', '压片'];

/** 各分裂期的小图形 */
function PhaseGlyph({ phase, cx, cy }: { phase: Phase; cx: number; cy: number }) {
  switch (phase) {
    case 'inter':
      return (
        <g>
          <circle cx={cx} cy={cy} r="13" fill="#dcc9ec" stroke="#9a6fb5" strokeWidth="2" />
          <circle cx={cx} cy={cy} r="4" fill="#8a5a8f" />
        </g>
      );
    case 'pro':
      return (
        <g>
          <circle cx={cx} cy={cy} r="14" fill="#efe6f5" stroke="#b09ac2" strokeWidth="1.6" strokeDasharray="3 2" />
          {[[cx - 6, cy - 5], [cx + 5, cy - 7], [cx + 6, cy + 4], [cx - 4, cy + 6], [cx + 1, cy]].map(([x, y], i) => (
            <line key={i} x1={x - 3.4} y1={y - 1.4} x2={x + 3.4} y2={y + 1.4} stroke="#7a4a8a" strokeWidth="2.4" strokeLinecap="round" />
          ))}
        </g>
      );
    case 'meta':
      return (
        <g>
          <line x1={cx} y1={cy - 14} x2={cx} y2={cy + 14} stroke="#d8c8e2" strokeWidth="1.4" strokeDasharray="2 2" />
          {[-9, -3, 3, 9].map((dx, i) => (
            <g key={i}>
              <circle cx={cx + dx} cy={cy} r="2.6" fill="#7a4a8a" />
              <line x1={cx + dx - 3} y1={cy - 3.4} x2={cx + dx + 3} y2={cy + 3.4} stroke="#7a4a8a" strokeWidth="2" strokeLinecap="round" />
              <line x1={cx + dx + 3} y1={cy - 3.4} x2={cx + dx - 3} y2={cy + 3.4} stroke="#7a4a8a" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}
        </g>
      );
    case 'ana':
      return (
        <g>
          {[-10, 10].map((dy, k) =>
            [-5, 0, 5].map((dx, i) => (
              <g key={`${k}-${i}`}>
                <line x1={cx + dx - 2.6} y1={cy + dy - 2.6} x2={cx + dx + 2.6} y2={cy + dy + 2.6} stroke="#7a4a8a" strokeWidth="2.2" strokeLinecap="round" />
                <line x1={cx + dx + 2.6} y1={cy + dy - 2.6} x2={cx + dx - 2.6} y2={cy + dy + 2.6} stroke="#7a4a8a" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            )),
          )}
          <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="#d8c8e2" strokeWidth="1.4" strokeDasharray="2 2" />
        </g>
      );
    case 'tel':
      return (
        <g>
          <circle cx={cx - 9} cy={cy} r="9" fill="#dcc9ec" stroke="#9a6fb5" strokeWidth="1.8" />
          <circle cx={cx + 10} cy={cy} r="9" fill="#dcc9ec" stroke="#9a6fb5" strokeWidth="1.8" />
          <rect x={cx - 1} y={cy - 15} width="2.4" height="30" fill="#6b8f5e" />
        </g>
      );
  }
}

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-2.5 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function MitosisObservationLab() {
  const [stage, setStage] = useState(1); // 1 选取材区 → 2 排流程 → 3 认分裂期
  const [zoneHint, setZoneHint] = useState('');
  const [stepDone, setStepDone] = useState<number[]>([]); // 已按对的流程步
  const [cells, setCells] = useState<CellItem[]>(FIELD_CELLS.map((c) => ({ ...c })));
  const [pickedCell, setPickedCell] = useState<CellItem | null>(null);
  const [feedback, setFeedback] = useState('');

  const correctCount = cells.filter((c) => c.answered === true).length;
  const allCorrect = correctCount === cells.length;

  // 阶段一：根尖分区点击
  const ZONES = [
    { name: '成熟区（根毛区）', hint: '这里细胞已分化、有大液泡，能吸收水和无机盐——但不分裂了。要找的是分裂旺盛的区域。' },
    { name: '伸长区', hint: '细胞在快速伸长，但基本不再分裂。再往下一点。' },
    { name: '分生区', hint: '', correct: true },
    { name: '根冠', hint: '根冠起保护作用，细胞较大也不分裂。分生区在根冠之上。' },
  ];

  const clickZone = (i: number) => {
    if (ZONES[i].correct) {
      setZoneHint('✅ 对！分生区细胞排列紧密、呈正方形、核大——分裂旺盛，正是取材部位。');
      setTimeout(() => setStage(2), 900);
    } else {
      setZoneHint(`❌ 这是${ZONES[i].name}。${ZONES[i].hint}`);
    }
  };

  // 阶段二：流程排序
  const clickFlowStep = (i: number) => {
    if (i === stepDone.length) {
      const next = [...stepDone, i];
      setStepDone(next);
      setFeedback(next.length === 4 ? '✅ 流程正确：解离→漂洗→染色→压片。装片完成，可以镜检了！' : '');
      if (next.length === 4) setTimeout(() => setStage(3), 900);
    } else {
      setFeedback(`顺序不对：现在是第 ${stepDone.length + 1} 步，应该先做「${STEP_LABELS[stepDone.length]}」。想想为什么要这个顺序。`);
    }
  };

  // 阶段三：认分裂期
  const pickCell = (id: number) => {
    if (cells.find((c) => c.id === id)?.answered) return;
    setPickedCell(cells.find((c) => c.id === id) ?? null);
    setFeedback('');
  };

  const answerPhase = (p: Phase) => {
    if (!pickedCell) return;
    const right = pickedCell.phase === p;
    setCells((prev) => prev.map((c) => (c.id === pickedCell.id ? { ...c, answered: right ? true : c.answered } : c)));
    setFeedback(right ? `✅ 正确！这是${PHASE_NAMES[p]}期。${PHASE_FEATURES[p]}` : `❌ 不对。提示：${PHASE_FEATURES[pickedCell.phase]}`);
    setPickedCell(null);
  };

  // 引导模式：根据当前阶段给出"下一步"动作
  const guideAction = () => {
    if (stage === 1) {
      clickZone(2);
    } else if (stage === 2) {
      clickFlowStep(stepDone.length);
    } else if (stage === 3) {
      const next = cells.find((c) => !c.answered);
      if (next) {
        setCells((prev) => prev.map((c) => (c.id === next.id ? { ...c, answered: true } : c)));
        setFeedback(`🧭 示范：这个细胞是${PHASE_NAMES[next.phase]}期。${PHASE_FEATURES[next.phase]}`);
      }
    }
  };

  const guideInfo =
    stage === 1
      ? { label: '点击分生区', hint: '根尖端约 2~3mm、颜色略深、细胞呈正方形的区域。' }
      : stage === 2
        ? { label: `执行「${STEP_LABELS[Math.min(stepDone.length, 3)]}」`, hint: '解离→漂洗→染色→压片，顺序不能乱。' }
        : allCorrect
          ? { label: '全部完成', hint: '所有细胞都认对了！' }
          : { label: '示范识别下一个细胞', hint: '先看染色体位置：散乱→前期；赤道板一排→中期；分向两极→后期；两核重现→末期；核完整→间期。' };

  const reset = () => {
    setStage(1);
    setZoneHint('');
    setStepDone([]);
    setCells(FIELD_CELLS.map((c) => ({ ...c })));
    setPickedCell(null);
    setFeedback('');
  };

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>

<div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前进度：
              {stage === 1 ? '① 选取材区' : stage === 2 ? '② 装片制作流程' : `③ 认分裂期（${correctCount}/${cells.length}）`}
              {stage === 3 && allCorrect ? ' 🎉 全部认对！' : ''}
            </div>

            {stage === 3 ? (
              <div>
                <p className="mb-2 text-sm font-medium text-[#37585f]">点一个细胞，判断它处于哪一期</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {(Object.keys(PHASE_NAMES) as Phase[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      disabled={!pickedCell}
                      onClick={() => answerPhase(p)}
                      className={`${cnChip(false)} disabled:cursor-not-allowed disabled:opacity-40`}
                    >
                      {PHASE_NAMES[p]}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
          </>
        }
      >
        <SceneBox
          label={stage === 1 ? '根尖纵切示意（点击取材区域）' : stage === 2 ? '装片制作流程（按正确顺序点击）' : '高倍镜视野：分生区细胞（点击细胞判断分裂期）'}
          heightClass="h-[330px]"
        >
          <svg className="h-full w-full" viewBox="0 0 440 310" aria-hidden="true">
            {stage === 1 ? (
              <g>
                {/* 根尖从下到上：根冠 → 分生区 → 伸长区 → 成熟区 */}
                {[
                  { i: 3, y: 240, h: 56, fill: '#e8dcc0', name: '根冠' },
                  { i: 2, y: 168, h: 68, fill: '#d9c2e2', name: '分生区' },
                  { i: 1, y: 96, h: 68, fill: '#cfe3c2', name: '伸长区' },
                  { i: 0, y: 24, h: 68, fill: '#bcd8b8', name: '成熟区（根毛区）' },
                ].map((z) => (
                  <g key={z.i} onClick={() => clickZone(z.i)} style={{ cursor: 'pointer' }}>
                    <rect x="160" y={z.y} width="120" height={z.h} fill={z.fill} stroke="#8aa782" strokeWidth="2" />
                    {/* 区域示意纹理 */}
                    {z.i === 3
                      ? [[180, 260], [215, 266], [248, 258]].map(([x, y], k) => <circle key={k} cx={x} cy={y} r="6" fill="#c9b48a" />)
                      : z.i === 2
                        ? [[175, 184], [200, 192], [228, 186], [252, 194], [185, 214], [220, 222], [248, 212]].map(([x, y], k) => <rect key={k} x={x - 7} y={y - 7} width="14" height="14" rx="2" fill="#b793c9" opacity="0.8" />)
                        : z.i === 1
                          ? [[175, 104], [200, 108], [225, 104], [250, 108], [175, 140], [200, 144], [225, 140], [250, 144]].map(([x, y], k) => <rect key={k} x={x - 7} y={y - 12} width="14" height="24" rx="4" fill="#9dc48f" opacity="0.8" />)
                          : [[172, 32], [196, 36], [222, 32], [248, 36], [172, 66], [196, 70], [222, 66], [248, 70]].map(([x, y], k) => (
                              <g key={k}>
                                <rect x={x - 6} y={y - 12} width="12" height="24" rx="4" fill="#8fb88a" opacity="0.8" />
                                {k % 2 === 0 ? <line x1={x - 10} y1={y - 8} x2={x + 10} y2={y - 8} stroke="#6b8f5e" strokeWidth="1.6" /> : null}
                              </g>
                            ))}
                    <text x="296" y={z.y + z.h / 2 + 4} fontSize="11" fill="#5f7066" fontWeight="600">
                      {z.name}
                    </text>
                  </g>
                ))}
                <text x="220" y="308" textAnchor="middle" fontSize="10" fill="#9ab0b5">
                  点击你认为该取材的区域（分裂旺盛处）
                </text>
              </g>
            ) : null}

            {stage === 2 ? (
              <g>
                {STEP_LABELS.map((label, i) => {
                  const done = stepDone.includes(i);
                  const next = stepDone.length === i;
                  return (
                    <g key={label} onClick={() => clickFlowStep(i)} style={{ cursor: 'pointer' }}>
                      <rect x={40 + i * 96} y="110" width="80" height="88" rx="10" fill={done ? '#dff0e2' : next ? '#f2faf9' : '#f4f6f5'} stroke={done ? '#5f9e6f' : next ? '#82c6c0' : '#c9d4d2'} strokeWidth={next ? 2.5 : 1.8} />
                      <text x={80 + i * 96} y="142" textAnchor="middle" fontSize="14" fill={done ? '#2f7a4d' : '#5f7066'} fontWeight="700">
                        {done ? '✓' : ['🔪', '🚿', '🎨', '🫳'][i]}
                      </text>
                      <text x={80 + i * 96} y="168" textAnchor="middle" fontSize="12" fill={done ? '#2f7a4d' : '#4b6c73'} fontWeight="600">
                        {label}
                      </text>
                      <text x={80 + i * 96} y="186" textAnchor="middle" fontSize="8.5" fill="#8aa79a">
                        {['3~5min', '10min', '3~5min', '轻压'][i]}
                      </text>
                    </g>
                  );
                })}
                <text x="220" y="80" textAnchor="middle" fontSize="11" fill="#5f7066" fontWeight="600">
                  按 ①→④ 的正确顺序点击卡片
                </text>
                <text x="220" y="248" textAnchor="middle" fontSize="10" fill="#9ab0b5">
                  已完成：{stepDone.length}/4
                </text>
              </g>
            ) : null}

            {stage === 3 ? (
              <g>
                {/* 视野圆 */}
                <circle cx="220" cy="160" r="150" fill="#fbfcf8" stroke="#c4d6da" strokeWidth="5" />
                {cells.map((c) => (
                  <g key={c.id} onClick={() => pickCell(c.id)} style={{ cursor: c.answered ? 'default' : 'pointer' }}>
                    <circle cx={c.cx + 20} cy={c.cy + 20} r="22" fill={c.answered ? '#e2f2e6' : '#f4f2f8'} stroke={c.answered ? '#5f9e6f' : '#c9b8d8'} strokeWidth={c.answered ? 2.4 : 1.6} />
                    <PhaseGlyph phase={c.phase} cx={c.cx + 20} cy={c.cy + 20} />
                    {c.answered ? (
                      <text x={c.cx + 20} y={c.cy + 48} textAnchor="middle" fontSize="9" fill="#2f7a4d" fontWeight="700">
                        {PHASE_NAMES[c.phase]}✓
                      </text>
                    ) : null}
                  </g>
                ))}
                <text x="220" y="305" textAnchor="middle" fontSize="10" fill="#799398">
                  已认对 {correctCount}/{cells.length} · 大多数细胞处于间期（分裂期占比小）
                </text>
              </g>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>
          {(zoneHint || feedback) as React.ReactNode}
          {stage === 1 && !zoneHint ? '根尖四个区域各有特征——想想哪个区域的细胞正在旺盛分裂，点它。' : null}
          {stage === 2 && !feedback ? '回忆口诀：解离 → 漂洗 → 染色 → 压片。点错会有提示，想清楚再点。' : null}
          {stage === 3 && !feedback ? '先点一个细胞，再在左侧选择它所处的分裂期。判断依据：染色体形态与位置。' : null}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
