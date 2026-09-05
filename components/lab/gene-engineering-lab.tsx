'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

type EnzymeId = 'ecoRI' | 'bamHI' | 'smaI';
type ReceptorId = 'plant' | 'microbe' | 'animal';

const ENZYMES: Record<
  EnzymeId,
  { name: string; site: string; overhang: string; sticky: boolean; color: string; note: string }
> = {
  ecoRI: { name: 'EcoRI', site: 'G↓AATTC', overhang: 'AATT', sticky: true, color: '#c25668', note: '经典默认酶，切出 AATT 黏性末端。' },
  bamHI: { name: 'BamHI', site: 'G↓GATCC', overhang: 'GATC', sticky: true, color: '#5b64c7', note: '切出 GATC 黏性末端，与目的基因、质粒用同一种酶时同样匹配。' },
  smaI: { name: 'SmaI', site: 'CCC↓GGG', overhang: '平末端', sticky: false, color: '#8a671b', note: '平末端也能连接，但效率低，且目的基因容易反向接入。' },
};

const RECEPTORS: Record<ReceptorId, { name: string; method: string; methodNote: string }> = {
  plant: { name: '棉花叶肉细胞', method: '农杆菌转化法', methodNote: '利用农杆菌 Ti 质粒上的 T-DNA 可转移并整合到染色体 DNA 的特点。' },
  microbe: { name: '大肠杆菌', method: 'Ca²⁺ 处理感受态法', methodNote: '用 Ca²⁺ 处理使细胞处于感受态，容易吸收周围环境中的重组质粒。' },
  animal: { name: '动物细胞', method: '显微注射法', methodNote: '显微操作仪将重组 DNA 直接注入受精卵（效率最高也最常用）。' },
};

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>基因工程四步：目的基因的获取 → 基因表达载体的构建 → 将目的基因导入受体细胞 → 目的基因的检测与鉴定。</>,
      <>“分子手术刀”<span className="font-semibold">限制性核酸内切酶</span>识别特定序列并在特定位点切割 DNA，产生黏性末端或平末端；“缝合针”<span className="font-semibold">DNA 连接酶</span>缝合磷酸二酯键；“运输车”<span className="font-semibold">载体</span>（如质粒）把目的基因送入受体细胞。</>,
      <>基因表达载体 = 目的基因 + <span className="font-semibold">启动子</span> + <span className="font-semibold">终止子</span> + <span className="font-semibold">标记基因</span>。</>,
      <>用<span className="font-semibold">同一种限制酶</span>切割目的基因与质粒 → 产生相同的黏性末端，碱基互补配对后再由 DNA 连接酶缝合。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>目的基因：Bt 抗虫基因（苏云金芽孢杆菌毒蛋白基因）。</>,
      <>载体：质粒（含启动子、终止子、标记基因——如抗氨苄青霉素基因）。</>,
      <>工具酶：限制酶（EcoRI、BamHI、SmaI 等）、DNA 连接酶。</>,
      <>受体细胞与导入方法：棉花叶肉细胞—农杆菌转化法；大肠杆菌—Ca²⁺ 感受态法；动物受精卵—显微注射法。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 获取并切割：用同一种限制酶分别切割含目的基因的 DNA 与质粒，露出相同的黏性末端。</>,
      <>② 构建表达载体：将目的基因片段与切开的质粒混合，加入 DNA 连接酶拼接成重组质粒。</>,
      <>③ 导入受体细胞：根据受体细胞种类选择农杆菌转化法、Ca²⁺ 感受态法或显微注射法。</>,
      <>④ 检测与鉴定：分子水平（DNA 分子杂交等）确认目的基因是否插入，个体水平（抗虫接种）确认性状是否表达。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>启动子在基因首端，是<span className="font-semibold"> RNA 聚合酶识别和结合的部位</span>（驱动转录）；终止子在尾端；标记基因用于筛选成功导入的细胞。</>,
      <>用不同限制酶切割也可能成功：若产生的黏性末端相同（如 BamHI 与 BglII）仍可互补连接；<span className="font-semibold">平末端连接效率低且易反向</span>。</>,
      <>农杆菌转化法的原理：Ti 质粒上的 <span className="font-semibold">T-DNA</span> 可转移至受体细胞，并整合到受体细胞染色体的 DNA 上。</>,
      <>检测分四个层次：DNA 分子杂交（是否插入）→ 分子杂交（是否转录出 mRNA）→ 抗原-抗体杂交（是否翻译出蛋白质）→ 个体水平接种（是否表现抗虫性状）。</>,
    ],
  },
];

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
  const s = polar(cx, cy, r, startDeg);
  const e = polar(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
}

/** DNA 双链梯子：上下两条主链 + 中间碱基对横档。 */
function DnaLadder({
  x,
  y,
  w,
  gene,
  topExtra = 0,
  bottomExtra = 0,
}: {
  x: number;
  y: number;
  w: number;
  gene?: boolean;
  topExtra?: number;
  bottomExtra?: number;
}) {
  const rungs = Array.from({ length: Math.floor(w / 11) }, (_, index) => x + 10 + index * 11);
  return (
    <g>
      {rungs.map((rx) => (
        <line key={rx} x1={rx} y1={y + 6} x2={rx} y2={y + 22} stroke="#7fa6bd" strokeWidth="2" />
      ))}
      <rect x={x - (topExtra ? 0 : 0)} y={y} width={w + topExtra} height="7" rx="3.5" fill="#2b6f8f" />
      <rect x={x - bottomExtra} y={y + 21} width={w + bottomExtra} height="7" rx="3.5" fill="#2b6f8f" />
      {/* 单链突出的黏性末端：细线 + 碱基小齿 */}
      {topExtra > 0 ? (
        <g>
          <line x1={x + w} y1={y + 3.5} x2={x + w + topExtra} y2={y + 3.5} stroke="#e6913c" strokeWidth="3.5" strokeLinecap="round" />
          {[1, 2, 3].map((t) => (
            <line key={t} x1={x + w + t * (topExtra / 4)} y1={y + 3.5} x2={x + w + t * (topExtra / 4)} y2={y + 10} stroke="#e6913c" strokeWidth="2" />
          ))}
        </g>
      ) : null}
      {bottomExtra > 0 ? (
        <g>
          <line x1={x - bottomExtra} y1={y + 24.5} x2={x} y2={y + 24.5} stroke="#e6913c" strokeWidth="3.5" strokeLinecap="round" />
          {[1, 2, 3].map((t) => (
            <line key={t} x1={x - t * (bottomExtra / 4)} y1={y + 17} x2={x - t * (bottomExtra / 4)} y2={y + 24.5} stroke="#e6913c" strokeWidth="2" />
          ))}
        </g>
      ) : null}
      {gene ? (
        <>
          <rect x={x + 84} y={y - 7} width="130" height="42" rx="6" fill="#e6913c1f" stroke="#e6913c" strokeWidth="1.5" strokeDasharray="5 3" />
          <text x={x + 149} y={y + 52} textAnchor="middle" fontSize="15" fill="#b06a17" fontWeight="600">
            目的基因（Bt 抗虫基因）
          </text>
        </>
      ) : null}
    </g>
  );
}

function cnChip(active: boolean) {
  return `flex min-h-10 flex-col items-start gap-0.5 rounded-md border px-2.5 py-1.5 text-left transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

const STEP_NAMES = ['获取并切割', '构建表达载体', '导入受体细胞', '检测与鉴定'];

export function GeneEngineLab() {
  const [step, setStep] = useState(0);
  const [enzyme, setEnzyme] = useState<EnzymeId>('ecoRI');
  const [cut, setCut] = useState(false);
  const [ligated, setLigated] = useState(false);
  const [receptor, setReceptor] = useState<ReceptorId>('plant');
  const [imported, setImported] = useState(false);
  const [molecular, setMolecular] = useState(false);
  const [individual, setIndividual] = useState(false);

  const enzymeInfo = ENZYMES[enzyme];
  const receptorInfo = RECEPTORS[receptor];

  const observation = (() => {
    if (step === 0 && !cut) {
      return `当前选中 ${enzymeInfo.name}（识别序列 ${enzymeInfo.site}）。用它同时切割含目的基因的 DNA 和质粒，两者才会产生${enzymeInfo.sticky ? '相同的黏性末端' : '平末端'}。`;
    }
    if (step === 1) {
      if (!ligated) {
        return enzymeInfo.sticky
          ? `${enzymeInfo.overhang} 黏性末端之间靠碱基互补配对靠拢，但骨架上的缺口要靠 DNA 连接酶缝合磷酸二酯键。`
          : '平末端没有突出的单链尾巴，只能靠连接酶直接缝合——效率低，而且目的基因可能掉头反向接入。';
      }
      return `✅ 连接酶缝合磷酸二酯键，环重新闭合——重组质粒（基因表达载体）构建完成：启动子驱动转录，目的基因插入启动子与终止子之间，标记基因用于后续筛选${enzymeInfo.sticky ? '' : '（注意：平末端连接的目的基因可能已反向接入）'}。`;
    }
    if (step === 2 && !imported) {
      return `受体细胞选的是${receptorInfo.name}，对应「${receptorInfo.method}」。${receptorInfo.methodNote}`;
    }
    if (step === 3) {
      if (molecular && individual) {
        return '✅ 两级检测都通过：DNA 分子杂交出现杂交带（目的基因已插入），转基因棉叶虫不啃食（抗虫性状成功表达）。转基因抗虫棉培育成功！';
      }
      if (molecular) {
        return '分子水平通过：探针与目的基因互补配对，出现杂交带，说明目的基因已插入受体细胞 DNA。但还要做个体水平鉴定，确认基因真的表达出抗虫性状。';
      }
      if (individual) {
        return '个体水平通过：转基因棉叶完好无损。但虫不吃叶子还可能有别的原因，必须先用分子检测确认目的基因确实插入了。';
      }
      return '检测分两个层面：分子水平确认「基因进去了」，个体水平确认「性状表达出来了」。分别试试点检测按钮。';
    }
    return '流程进行中，按左侧提示继续操作。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            {/* 步骤指示器 */}
            <ol className="grid grid-cols-4 gap-1">
              {STEP_NAMES.map((name, index) => (
                <li
                  key={name}
                  className={`rounded-md border px-1.5 py-1.5 text-center text-[11px] font-semibold leading-4 transition-colors ${
                    index === step
                      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                      : index < step
                        ? 'border-[#d9e7e7] bg-[#f2f9f8] text-[#8fb0b5]'
                        : 'border-[#d9e7e7] bg-white text-[#9db4b9]'
                  }`}
                >
                  <span className="block text-[13px]">{['①', '②', '③', '④'][index]}</span>
                  {name}
                </li>
              ))}
            </ol>

            {step === 0 ? (
              <>
                <div>
                  <p className="mb-2 text-sm font-medium text-[#37585f]">选择限制酶（分子手术刀）</p>
                  <div className="grid gap-1.5">
                    {(Object.keys(ENZYMES) as EnzymeId[]).map((id) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => {
                          setEnzyme(id);
                          setCut(false);
                        }}
                        aria-pressed={enzyme === id}
                        className={cnChip(enzyme === id)}
                      >
                        <span className="text-xs font-semibold">
                          {ENZYMES[id].name}
                          <span className="ml-2 font-mono text-[11px] opacity-80">{ENZYMES[id].site}</span>
                        </span>
                        <span className="text-[10px] leading-4 opacity-70">
                          {ENZYMES[id].sticky ? `黏性末端 ${ENZYMES[id].overhang}` : '平末端'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  disabled={cut}
                  onClick={() => {
                    setCut(true);
                    setStep(1);
                  }}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  用 {enzymeInfo.name} 切割目的基因与质粒
                </button>
                <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">{enzymeInfo.note}</div>
              </>
            ) : null}

            {step === 1 ? (
              <>
                <button
                  type="button"
                  disabled={ligated}
                  onClick={() => setLigated(true)}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  加入 DNA 连接酶（分子缝合针）
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLigated(true);
                    setStep(2);
                  }}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
                >
                  组装完成，下一步导入 →
                </button>
                <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
                  重组质粒 = 启动子 + 目的基因 + 终止子 + 标记基因，缺一不可。
                </div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <div>
                  <p className="mb-2 text-sm font-medium text-[#37585f]">选择受体细胞</p>
                  <div className="grid gap-1.5">
                    {(Object.keys(RECEPTORS) as ReceptorId[]).map((id) => (
                      <button
                        key={id}
                        type="button"
                        disabled={imported}
                        onClick={() => setReceptor(id)}
                        aria-pressed={receptor === id}
                        className={`${cnChip(receptor === id)} disabled:cursor-not-allowed disabled:opacity-50`}
                      >
                        <span className="text-xs font-semibold">{RECEPTORS[id].name}</span>
                        <span className="text-[10px] leading-4 opacity-70">→ {RECEPTORS[id].method}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  disabled={imported}
                  onClick={() => {
                    setImported(true);
                    setTimeout(() => setStep(3), 2200);
                  }}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  将重组质粒导入受体细胞
                </button>
                <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">{receptorInfo.methodNote}</div>
              </>
            ) : null}

            {step === 3 ? (
              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={() => setMolecular(true)}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
                >
                  {molecular ? '✅ ' : ''}分子水平：DNA 分子杂交检测
                </button>
                <button
                  type="button"
                  onClick={() => setIndividual(true)}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
                >
                  {individual ? '✅ ' : ''}个体水平：抗虫接种实验
                </button>
                <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
                  标记基因（抗氨苄青霉素基因）可在含抗生素的培养基上初步筛选出导入成功的细胞。
                </div>
              </div>
            ) : null}
          </>
        }
      >
        <SceneBox label={`第${['一', '二', '三', '四'][step]}步 · ${STEP_NAMES[step]}`} heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* ============ 第一步：切割 ============ */}
            {step === 0 ? (
              <g>
                <text x="24" y="30" fontSize="15" fill="#4b6c73" fontWeight="600">
                  含目的基因的 DNA
                </text>
                <DnaLadder x={24} y={44} w={382} gene />
                <g className="bio-snip" style={{ transformOrigin: '300px 57px' }}>
                  <circle cx="300" cy="30" r="15" fill={enzymeInfo.color} />
                  <text x="300" y="34" textAnchor="middle" fontSize="14" fill="#ffffff" fontWeight="700">
                    {enzymeInfo.name}
                  </text>
                </g>
                <text x="300" y="112" textAnchor="middle" fontSize="14.5" fill="#b0483a" fontFamily="monospace">
                  {enzymeInfo.site}
                </text>

                {/* 质粒 */}
                <text x="150" y="152" fontSize="15" fill="#4b6c73" fontWeight="600">
                  质粒（载体）
                </text>
                <circle cx="220" cy="228" r="36" fill="none" stroke="#2b6f8f" strokeWidth="7" />
                <path d={arcPath(220, 228, 36, -115, -30)} fill="none" stroke="#38a169" strokeWidth="7" />
                <path d={arcPath(220, 228, 36, 80, 160)} fill="none" stroke="#5b64c7" strokeWidth="7" />
                <path d={arcPath(220, 228, 36, 25, 55)} fill="none" stroke="#b0483a" strokeWidth="7" />
                <circle cx="256" cy="228" r="6" fill={enzymeInfo.color} className="bio-fade" />
                <text x="220" y="282" textAnchor="middle" fontSize="14.5" fill="#799398">
                  绿=启动子 · 红=终止子 · 紫=标记基因 · 缺口处为 {enzymeInfo.name} 识别位点
                </text>
              </g>
            ) : null}

            {/* ============ 第二步：连接 ============ */}
            {step === 1 && cut ? (
              <g>
                {/* 打开的质粒（左） */}
                <path d={arcPath(150, 190, 40, 26, 334)} fill="none" stroke="#2b6f8f" strokeWidth="7" strokeLinecap="round" />
                <path d={arcPath(150, 190, 40, 85, 150)} fill="none" stroke="#5b64c7" strokeWidth="7" />
                {!ligated ? (
                  <g>
                    <text x="118" y="268" fontSize="14" fill="#5b64c7" fontWeight="600">
                      标记基因
                    </text>
                    <text x={198} y={166} fontSize="14" fill="#e6913c" fontWeight="600">
                      {enzymeInfo.sticky ? `${enzymeInfo.overhang}` : '平口'}
                    </text>
                    <text x={198} y={222} fontSize="14" fill="#e6913c" fontWeight="600">
                      {enzymeInfo.sticky ? '互补链' : '平口'}
                    </text>
                  </g>
                ) : null}
                {/* 目的基因片段（右上，等待对接；平末端不画单链突出） */}
                <g
                  style={
                    ligated
                      ? { transform: 'translate(-136px, 96px) scale(0.72)', transition: 'transform 1.8s ease-in-out, opacity 0.4s ease 1.7s', opacity: 0 }
                      : { transform: 'none', transition: 'transform 1.8s ease-in-out' }
                  }
                >
                  <DnaLadder
                    x={288}
                    y={62}
                    w={110}
                    gene={false}
                    topExtra={enzymeInfo.sticky ? 14 : 0}
                    bottomExtra={enzymeInfo.sticky ? 14 : 0}
                  />
                  <text x={343} y={50} textAnchor="middle" fontSize="15" fill="#b06a17" fontWeight="600">
                    目的基因片段
                  </text>
                </g>
                {/* 连接酶 */}
                <g className={ligated ? 'bio-fade' : 'opacity-30'}>
                  <circle cx="245" cy="116" r="15" fill="#38a169" />
                  <text x="245" y="120" textAnchor="middle" fontSize="14" fill="#ffffff" fontWeight="700">
                    连接酶
                  </text>
                </g>
                {/* 连接完成：重组质粒 */}
                {ligated ? (
                  <g className="bio-fade" style={{ animationDelay: '1.9s' }}>
                    <circle cx="150" cy="190" r="40" fill="none" stroke="#2b6f8f" strokeWidth="7" />
                    <path d={arcPath(150, 190, 40, -25, 25)} fill="none" stroke="#e6913c" strokeWidth="8" />
                    <path d={arcPath(150, 190, 40, -115, -30)} fill="none" stroke="#38a169" strokeWidth="7" />
                    <path d={arcPath(150, 190, 40, 30, 58)} fill="none" stroke="#b0483a" strokeWidth="7" />
                    <path d={arcPath(150, 190, 40, 85, 150)} fill="none" stroke="#5b64c7" strokeWidth="7" />
                    <text x="150" y="194" textAnchor="middle" fontSize="15" fill="#13333a" fontWeight="700">
                      重组质粒
                    </text>
                    <text x={218} y={176} fontSize="14.5" fill="#b06a17" fontWeight="600">
                      目的基因
                    </text>
                    <text x={60} y={122} fontSize="14.5" fill="#2f7a4d" fontWeight="600">
                      启动子
                    </text>
                    <text x={196} y={256} fontSize="14.5" fill="#b0483a" fontWeight="600">
                      终止子
                    </text>
                    <text x={40} y={250} fontSize="14.5" fill="#5b64c7" fontWeight="600">
                      标记基因
                    </text>
                    <text x={330} y={230} fontSize="15" fill="#0a626a" fontWeight="600">
                      ✅ 基因表达载体
                    </text>
                    <text x={330} y={246} fontSize="14.5" fill="#799398">
                      构建完成
                    </text>
                  </g>
                ) : null}
                <text x="220" y="288" textAnchor="middle" fontSize="14.5" fill="#799398">
                  {ligated
                    ? '连接酶缝合磷酸二酯键，环重新闭合'
                    : enzymeInfo.sticky
                      ? '黏性末端靠氢键配对，骨架缺口仍需 DNA 连接酶缝合'
                      : '平末端没有单链突出，直接由 DNA 连接酶缝合（效率较低）'}
                </text>
              </g>
            ) : null}

            {/* ============ 第三步：导入 ============ */}
            {step === 2 ? (
              <g>
                {receptor === 'plant' ? (
                  <g>
                    <rect x="270" y="70" width="140" height="130" rx="18" fill="#f2f6ee" stroke="#6b8f5e" strokeWidth="4" />
                    <rect x="277" y="77" width="126" height="116" rx="14" fill="none" stroke="#9dbf8e" strokeWidth="1.5" />
                    <circle cx="340" cy="140" r="27" fill="#a97fb526" stroke="#8a5a8f" strokeWidth="2" />
                    <text x="340" y="144" textAnchor="middle" fontSize="14" fill="#8a5a8f">
                      细胞核
                    </text>
                    <text x="340" y="220" textAnchor="middle" fontSize="15" fill="#4b6c73" fontWeight="600">
                      棉花叶肉细胞
                    </text>
                    {/* 农杆菌 */}
                    <g
                      style={
                        imported
                          ? { transform: 'translate(196px, 34px)', transition: 'transform 1.6s ease-in-out' }
                          : { transform: 'none' }
                      }
                    >
                      <rect x="70" y="96" width="76" height="26" rx="13" fill="#38a169" />
                      <circle cx="104" cy="109" r="8" fill="none" stroke="#f4d06a" strokeWidth="2.5" />
                      <text x="70" y="86" fontSize="14.5" fill="#2f7a4d" fontWeight="600">
                        农杆菌（含 Ti 质粒）
                      </text>
                    </g>
                    {imported ? (
                      <g className="bio-fade" style={{ animationDelay: '1.9s' }}>
                        <circle cx="340" cy="140" r="7" fill="#e6913c" />
                        <text x="340" y="166" textAnchor="middle" fontSize="14" fill="#b06a17" fontWeight="600">
                          T-DNA 整合
                        </text>
                      </g>
                    ) : null}
                    <text x="150" y="240" fontSize="14.5" fill="#799398">
                      {imported ? 'T-DNA 携带目的基因整合到棉花细胞染色体 DNA 上' : '点击「导入」，农杆菌感染细胞并转移 T-DNA'}
                    </text>
                  </g>
                ) : receptor === 'microbe' ? (
                  <g>
                    {[
                      { x: 300, y: 90 },
                      { x: 340, y: 140 },
                      { x: 300, y: 190 },
                    ].map((pos, index) => (
                      <g key={index}>
                        <rect x={pos.x} y={pos.y} width="70" height="24" rx="12" fill="#d9c9ec" stroke="#9a6fb5" strokeWidth="2" />
                        {imported ? (
                          <circle cx={pos.x + 35} cy={pos.y + 12} r="5.5" fill="#e6913c" className="bio-fade" style={{ animationDelay: `${0.8 + index * 0.3}s` }} />
                        ) : null}
                      </g>
                    ))}
                    <text x="335" y="240" textAnchor="middle" fontSize="15" fill="#4b6c73" fontWeight="600">
                      Ca²⁺ 处理后的大肠杆菌（感受态）
                    </text>
                    <g style={imported ? { transform: 'translate(150px, 20px)', transition: 'transform 1.4s ease-in-out' } : { transform: 'none' }}>
                      <circle cx="120" cy="140" r="13" fill="none" stroke="#e6913c" strokeWidth="4" />
                      <text x="120" y="120" textAnchor="middle" fontSize="14.5" fill="#b06a17" fontWeight="600">
                        重组质粒
                      </text>
                    </g>
                    <text x="150" y="240" fontSize="14.5" fill="#799398">
                      {imported ? '感受态细胞吸收周围环境中的重组质粒' : '点击「导入」，重组质粒被感受态细胞吸收'}
                    </text>
                    <text x="205" y="170" fontSize="15" fill="#5b64c7" fontWeight="700" className={imported ? 'opacity-40' : ''}>
                      Ca²⁺
                    </text>
                  </g>
                ) : (
                  <g>
                    <circle cx="330" cy="150" r="56" fill="#fbdce3" stroke="#d98a99" strokeWidth="3" />
                    <circle cx="330" cy="150" r="24" fill="#a97fb526" stroke="#8a5a8f" strokeWidth="2" />
                    <text x="330" y="226" textAnchor="middle" fontSize="15" fill="#4b6c73" fontWeight="600">
                      动物受精卵
                    </text>
                    <g
                      style={
                        imported
                          ? { transform: 'translateY(46px)', transition: 'transform 1.2s ease-in' }
                          : { transform: 'none' }
                      }
                    >
                      <path d="M300 30 L312 30 L309 130 L303 130 Z" fill="#c4d6da" stroke="#8aa7ad" strokeWidth="1.5" />
                      <text x="306" y="24" textAnchor="middle" fontSize="14.5" fill="#4b6c73" fontWeight="600">
                        显微注射针
                      </text>
                    </g>
                    {imported ? (
                      <circle cx="330" cy="128" r="8" fill="none" stroke="#e6913c" strokeWidth="3.5" className="bio-fade" style={{ animationDelay: '1.4s' }} />
                    ) : null}
                    <text x="150" y="240" fontSize="14.5" fill="#799398">
                      {imported ? '重组 DNA 已被直接注入受精卵中' : '点击「导入」，显微注射针将重组 DNA 注入受精卵'}
                    </text>
                  </g>
                )}
              </g>
            ) : null}

            {/* ============ 第四步：检测与鉴定 ============ */}
            {step === 3 ? (
              <g>
                <text x="220" y="34" textAnchor="middle" fontSize="15" fill="#4b6c73" fontWeight="600">
                  {molecular && individual
                    ? '两级检测全部通过 🎉'
                    : molecular
                      ? '分子水平检测：DNA 分子杂交'
                      : individual
                        ? '个体水平鉴定：抗虫接种实验'
                        : '选择一种检测方法开始'}
                </text>
                {molecular ? (
                  <g>
                    <rect x="30" y="56" width="150" height="130" rx="8" fill="#10262c" />
                    <text x="105" y="76" textAnchor="middle" fontSize="14.5" fill="#9fc6cf">
                      DNA 分子杂交膜
                    </text>
                    {[92, 130, 162].map((bandY, index) => (
                      <rect
                        key={bandY}
                        x="48"
                        y={bandY}
                        width="114"
                        height="9"
                        rx="4.5"
                        fill="#7fa6bd"
                        opacity={index === 1 ? 1 : 0.35}
                        className={index === 1 && molecular ? 'bio-hybrid' : ''}
                        style={index === 1 ? { animationDelay: '1.1s' } : undefined}
                      />
                    ))}
                    {molecular ? (
                      <text x="105" y="152" textAnchor="middle" fontSize="14" fill="#f4d06a" fontWeight="700" className="bio-fade" style={{ animationDelay: '1.3s' }}>
                        ✳ 探针结合 → 杂交带
                      </text>
                    ) : null}
                  </g>
                ) : null}
                {individual ? (
                  <g>
                    {/* 对照叶（被啃食）；与分子检测同屏时缩小右移避免遮挡 */}
                    <g transform={molecular ? 'translate(305 66) scale(0.82)' : 'translate(250 70)'}>
                      <path d="M20 10 C -10 -6, -44 14, -34 46 C -26 72, 16 80, 36 54 C 50 32, 46 14, 20 10 Z" fill="#cfe3c2" stroke="#6b8f5e" strokeWidth="2.5" />
                      <path d="M14 16 L 2 52 M2 52 L -16 40 M2 52 L 20 38" stroke="#8fae7c" strokeWidth="1.5" fill="none" />
                      {[[-6, 34], [12, 44], [24, 30]].map(([hx, hy], index) => (
                        <circle key={index} cx={hx} cy={hy} r="5" fill="#f2fafa" className="bio-fade" style={{ animationDelay: `${0.6 + index * 0.5}s` }} />
                      ))}
                      <text x="2" y="100" textAnchor="middle" fontSize="14.5" fill="#4b6c73" fontWeight="600">
                        正常棉叶（对照）
                      </text>
                    </g>
                    {/* 转基因叶（完好） */}
                    <g transform={molecular ? 'translate(402 66) scale(0.82)' : 'translate(365 70)'}>
                      <path d="M20 10 C -10 -6, -44 14, -34 46 C -26 72, 16 80, 36 54 C 50 32, 46 14, 20 10 Z" fill="#dff0d2" stroke="#3f7f4f" strokeWidth="3" />
                      <path d="M14 16 L 2 52 M2 52 L -16 40 M2 52 L 20 38" stroke="#8fae7c" strokeWidth="1.5" fill="none" />
                      <text x="2" y="100" textAnchor="middle" fontSize="14.5" fill="#2f7a4d" fontWeight="600">
                        转基因棉叶 ✓
                      </text>
                    </g>
                    {/* 幼虫 */}
                    <g transform={molecular ? 'translate(318 116)' : 'translate(272 118)'}>
                      <path d="M0 0 Q 7 -9 14 0 Q 21 9 28 0" stroke="#c98a1d" strokeWidth="6" fill="none" strokeLinecap="round" className="bio-worm" />
                    </g>
                  </g>
                ) : null}
                {!molecular && !individual ? (
                  <text x="220" y="170" textAnchor="middle" fontSize="15" fill="#799398">
                    分子水平确认「基因进去了」；个体水平确认「性状表达出来了」
                  </text>
                ) : null}
              </g>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
