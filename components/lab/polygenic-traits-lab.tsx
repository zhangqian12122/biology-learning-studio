'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（多基因遗传）',
    lines: [
      <>身高、肤色、血压这些性状不是"非此即彼"，而是<span className="font-semibold">连续变化</span>的——因为它们由<span className="font-semibold">多对等位基因叠加控制</span>，每个显性基因都往"深"的方向加一份效果。</>
      ,
      <>纯理论下，n 对基因的 F₂ 性状值呈<span className="font-semibold">二项分布</span>：中间类型最多、两个极端最少——基因对数越多，曲线越接近钟形。</>
      ,
      <>再加<span className="font-semibold">环境修饰</span>（营养、光照、温度……），分布进一步平滑——数量性状=多基因基础+环境塑造。</>
      ,
    ],
  },
  {
    title: '为什么还符合孟德尔定律',
    lines: [
      <>每对基因<span className="font-semibold">单独看都老老实实遵循分离定律</span>——多基因遗传不"违反"孟德尔，只是多对基因的组合叠加让表型"连续化"了。</>
      ,
      <>对比：<span className="font-semibold">质量性状</span>（红花/白花·豌豆圆/皱）界限分明、可逐类计数；<span className="font-semibold">数量性状</span>（身高·产量）要用统计学（平均数、方差、相关）分析。</>
      ,
      <>小麦红白粒色的经典杂交实验（尼尔逊-埃勒）最早揭示：F₂ 红白比例随基因对数不同而变化——多基因学说的实验起点。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>区分三类：<span className="font-semibold">单基因性状</span>（卷舌·单双眼皮）、<span className="font-semibold">多基因数量性状</span>（身高·肤色）、<span className="font-semibold">阈值性状</span>（糖尿病·唇裂——易患性超过阈值才发病）。</>
      ,
      <>数量性状在<span className="font-semibold">亲本与杂种之间"超亲"</span>（杂种后代表现可超出双亲范围）——杂交育种能持续改良产量的理论依据。</>
      ,
      <>估算遗传力：性状变异中<span className="font-semibold">遗传因素所占比例</span>——育种上"选什么性状"要看遗传力高低。</>
      ,
    ],
  },
];

type Mode = 'single' | 'quad' | 'quadEnv';

const MODES: Record<Mode, { label: string; note: string; bins: number; envNoise: number }> = {
  single: { label: '单基因（1 对等位基因）', note: '不完全显性：1:2:1', bins: 1, envNoise: 0 },
  quad: { label: '多基因（4 对等位基因）', note: '叠加出 9 个等级', bins: 4, envNoise: 0 },
  quadEnv: { label: '多基因 + 环境修饰', note: '营养·光照把曲线抹平', bins: 4, envNoise: 1.1 },
};

const SKIN = ['#f7ead8', '#f2ddc0', '#eecdA0', '#e5bc82', '#d9a566', '#c98f52', '#b37944', '#9a6236', '#7c4c2a'];

function sampleCounts(mode: Mode): number[] {
  const m = MODES[mode];
  const alleles = m.bins * 2;
  const probs: number[] = [];
  let total = 0;
  for (let k = 0; k <= alleles; k++) {
    let c = 1;
    for (let i = 0; i < k; i++) c = (c * (alleles - i)) / (i + 1);
    probs.push(c);
    total += c;
  }
  const norm = probs.map((p) => p / total);
  const counts = new Array(alleles + 1).fill(0);
  const n = 240;
  for (let s = 0; s < n; s++) {
    let r = Math.random();
    let idx = alleles;
    let acc = 0;
    for (let k = 0; k <= alleles; k++) {
      acc += norm[k];
      if (r < acc) {
        idx = k;
        break;
      }
    }
    if (m.envNoise > 0) {
      const gauss = (Math.random() + Math.random() + Math.random() + Math.random() - 2) * m.envNoise;
      idx = Math.max(0, Math.min(alleles, Math.round(idx + gauss)));
    }
    counts[idx]++;
  }
  return counts;
}

export function PolygenicTraitsLab() {
  const [mode, setMode] = useState<Mode>('quad');
  const [counts, setCounts] = useState<number[]>(() => sampleCounts('quad'));

  const choose = (id: Mode) => {
    setMode(id);
    setCounts(sampleCounts(id));
  };

  const peak = Math.max(...counts);
  const peakIdx = counts.indexOf(peak);

  const observation = (() => {
    if (mode === 'single')
      return `1 对等位基因（不完全显性）只有 3 种基因型：中间型（Aa）${counts[1]} 人——比例接近 1:2:1，表型"离散可数"，用孟德尔比例就能描述。`;
    if (mode === 'quadEnv')
      return `4 对基因再加环境修饰：柱形被"抹"成平滑钟形——身高、肤色就是这样：多基因搭好框架，营养与光照做最后的"微调"。`;
    return `4 对等位基因叠加出 9 个等级（值 0~8）：第 ${peakIdx} 级人数最多（${peak} 人），两个极端最少——中间类型占大头，表型开始"连续"。`;
  })();

  const X0 = 48;
  const Y0 = 252;
  const H = 150;
  const W = 340;
  const nb = counts.length;
  const bw = W / nb - 6;
  const maxV = Math.max(peak, 1);

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择遗传模型</p>
              <div className="grid gap-1.5">
                {(Object.keys(MODES) as Mode[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => choose(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      mode === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {MODES[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {MODES[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCounts(sampleCounts(mode))}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              🎲 重新抽样（n=240）
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              最高柱：<span className="text-base font-bold text-[#0a626a]">{peak}</span> 人（第 {peakIdx} 级）
              <br />
              表型等级：<span className="font-semibold">{nb} 类</span>
            </div>
            <div className="rounded-md border border-[#d9e7e7] bg-white px-3 py-2.5 text-[10.5px] leading-4 text-[#799398]">
              考点：每对基因仍遵循分离定律——"连续"是多对叠加+环境修饰的效果，不是对孟德尔的否定。
            </div>
          </>
        }
      >
        <SceneBox label="数量性状分布：基因越多越「钟形」" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            <text x="220" y="24" textAnchor="middle" fontSize="12" fill="#4b6c73" fontWeight="700">
              {mode === 'single' ? '1 对基因：3 类离散表型' : mode === 'quad' ? '4 对基因：9 级连续变异' : '4 对基因 + 环境：平滑钟形'}
            </text>
            {/* 坐标轴 */}
            <line x1={X0} y1={Y0} x2={X0 + W + 16} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            <line x1={X0} y1={Y0 - H - 14} x2={X0} y2={Y0} stroke="#8a9a9f" strokeWidth="1.6" />
            {/* 柱 */}
            {counts.map((v, i) => {
              const bh = Math.round((v / maxV) * H);
              const color = SKIN[Math.min(SKIN.length - 1, Math.round((i / (nb - 1)) * (SKIN.length - 1)))];
              return (
                <g key={i}>
                  <rect x={X0 + (W / nb) * i + 3} y={Y0 - bh} width={bw} height={bh} fill={color} stroke="#8a671b" strokeWidth="1.4" rx="3" />
                  {bh > 16 && (
                    <text x={X0 + (W / nb) * i + 3 + bw / 2} y={Y0 - bh - 5} textAnchor="middle" fontSize="10" fill="#59767c">
                      {v}
                    </text>
                  )}
                </g>
              );
            })}
            {/* 轴标签 */}
            <text x={X0 + W / 2} y={Y0 + 30} textAnchor="middle" fontSize="10.5" fill="#59767c">性状等级（以肤色为例：浅 → 深）</text>
            <text x={X0 + 4} y={Y0 - H - 6} fontSize="10" fill="#59767c">人数</text>
            <text x={X0 + W + 14} y={Y0 + 4} textAnchor="end" fontSize="10" fill="#8a9a9f">0</text>
            {/* 注释 */}
            {mode === 'single' && (
              <text x={X0 + W / 2} y={Y0 - H + 4} textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="700">1 : 2 : 1 —— 中间型（杂合）最多</text>
            )}
            {mode !== 'single' && (
              <text x={X0 + W / 2} y={Y0 - H + 4} textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="700">中间多·两端少——越靠近"钟形"越连续</text>
            )}
            <text x="428" y="292" textAnchor="end" fontSize="9.5" fill="#799398">n=240 次抽样 · 柱高=人数</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
