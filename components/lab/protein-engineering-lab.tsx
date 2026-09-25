'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（蛋白质工程）',
    lines: [
      <>蛋白质工程以<span className="font-semibold">蛋白质分子的结构规律及其与生物功能的关系</span>为基础，通过改造或合成基因，来改造现有蛋白质或制造新的蛋白质。</>,
      <>天然蛋白质的缺陷（如不耐高温、活性低、有副作用）可以通过改造它的<span className="font-semibold">氨基酸序列</span>来修复——但要<span className="font-semibold">从基因下手</span>，因为蛋白质是由基因编码的。</>,
      <>设计路线与中心法则<span className="font-semibold">方向相反</span>：预期功能 → 设计蛋白质空间结构 → 推测氨基酸序列 → 找到对应的脱氧核苷酸序列（基因）。</>,
    ],
  },
  {
    title: '案例：改造酶使其耐高温',
    lines: [
      <>① 分析天然酶的空间结构，找出影响稳定性的关键氨基酸位点。</>,
      <>② 预测把某位点氨基酸替换（如把柔性甘氨酸换成刚性的脯氨酸）后，结构会更稳定、耐高温。</>,
      <>③ 依据新氨基酸序列，利用密码子表逆推出对应的 DNA（基因）序列，化学合成或定点突变获得改造基因。</>,
      <>④ 把改造基因导入工程菌表达、纯化，测定酶活性和热稳定性，筛选出符合预期的新酶。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>蛋白质工程的<span className="font-semibold">直接对象是基因</span>，最终产物是改造后的蛋白质——"对蛋白质施工，从基因动刀"。</>,
      <>蛋白质工程与基因工程的关系：基因工程是<span className="font-semibold">将现成基因转移</span>（生产自然界已有的蛋白质）；蛋白质工程要<span className="font-semibold">创造新基因</span>（生产自然界没有的蛋白质），被视为第二代基因工程。</>,
      <>改造蛋白的结构预测难度大——目前多数成功案例是<span className="font-semibold">小规模定点修饰</span>，而不是从头设计整条肽链。</>,
    ],
  },
];

const STAGES = 3;

export function ProteinEngineeringLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '工业发酵罐温度高达 70°C，而天然蛋白酶在 50°C 就开始变性失活——直接用天然酶成本太高。目标：改造出一株耐高温酶。第一步是分析天然酶的空间结构，锁定影响稳定性的关键氨基酸位点。';
    if (stage === 1)
      return '结构分析提示：把活性中心附近第 112 位的柔性甘氨酸（Gly）替换成刚性脯氨酸（Pro），肽链骨架会更"硬"，高温下不易展开。注意设计方向与中心法则相反：从预期功能出发，逆推蛋白质结构 → 氨基酸序列。';
    if (stage === 2)
      return '对照密码子表，把 Pro 对应的密码子 CCT 逆推回 DNA 序列并定点突变改造基因，再导入大肠杆菌。工程菌表达出的新酶在 70°C 下仍保持活性——反向设计的路线走通了。';
    return '改造成功！总结：蛋白质工程"从预期功能逆推到基因"，直接改造对象是基因，产物可以是自然界没有的新蛋白质——所以它被称为第二代基因工程。对比：基因工程转移现成基因，只能生产已有蛋白。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= STAGES}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              🧬 推进设计（{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新设计
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              设计路线：<span className="font-semibold">功能 → 结构 → 序列 → 基因</span>
              <br />
              与中心法则方向<span className="font-semibold text-[#0e6f75]">相反</span>（逆向设计）
            </div>
          </>
        }
      >
        <SceneBox label="蛋白质工程：改造酶使其耐高温（步进演示）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 阶段 0：天然酶缺陷 + 结构分析 */}
            {stage === 0 ? (
              <g>
                <text x="220" y="32" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">① 天然酶不耐热 → 分析空间结构找关键位点</text>
                <path d="M110 120 q -30 -40 10 -66 q 44 -28 78 6 q 26 30 -4 62 q -38 34 -84 -2 Z" fill="#d8e4f0" stroke="#4d7ea8" strokeWidth="2.6" />
                <path d="M130 96 q 22 -22 48 -8" fill="none" stroke="#4d7ea8" strokeWidth="2" opacity="0.7" />
                <circle cx="176" cy="102" r="9" fill="#e8a03a" stroke="#8a671b" strokeWidth="2" />
                <text x="176" y="106" textAnchor="middle" fontSize="8.5" fill="#8a5a1d" fontWeight="700">Gly112</text>
                <text x="110" y="176" textAnchor="middle" fontSize="11" fill="#4b6c73" fontWeight="600">天然蛋白酶 · 50°C 失活</text>
                {/* 温度计 */}
                <rect x="300" y="60" width="18" height="90" rx="8" fill="#f8f6ee" stroke="#8a9a9f" strokeWidth="2.2" />
                <circle cx="309" cy="158" r="13" fill="#f8f6ee" stroke="#8a9a9f" strokeWidth="2.2" />
                <rect x="304" y="106" width="10" height="44" rx="5" fill="#c94a4a" />
                <circle cx="309" cy="152" r="8" fill="#c94a4a" />
                <text x="352" y="80" fontSize="11" fill="#a53030" fontWeight="700">50°C ✗ 变性</text>
                <text x="352" y="104" fontSize="11" fill="#2f6f2a" fontWeight="700">目标：70°C ✓</text>
                <text x="220" y="222" textAnchor="middle" fontSize="10.5" fill="#799398">锁定活性中心附近的柔性位点 Gly112 为改造靶点</text>
              </g>
            ) : null}
            {/* 阶段 1：逆向设计 */}
            {stage === 1 ? (
              <g>
                <text x="220" y="32" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">② 逆推设计：预期结构 → 氨基酸序列</text>
                {[
                  { x: 60, t: '预期功能', d: '耐高温' },
                  { x: 148, t: '空间结构', d: '骨架加固' },
                  { x: 236, t: '氨基酸序列', d: 'Gly→Pro' },
                  { x: 324, t: '基因序列', d: 'CTT→CCT' },
                ].map((n, i) => (
                  <g key={n.t}>
                    <rect x={n.x} y="72" width="76" height="54" rx="8" fill={i === 2 ? '#fdf1cf' : '#eef4f6'} stroke={i === 2 ? '#8a671b' : '#4d7ea8'} strokeWidth="2.2" />
                    <text x={n.x + 38} y="94" textAnchor="middle" fontSize="10" fill="#37585f" fontWeight="700">{n.t}</text>
                    <text x={n.x + 38} y="114" textAnchor="middle" fontSize="9.5" fill="#59767c">{n.d}</text>
                    {i < 3 ? <path d={`M${n.x + 78} 99 h 8 m 0 0 l -4 -3 m 4 3 l -4 3`} fill="none" stroke="#8a671b" strokeWidth="1.6" /> : null}
                  </g>
                ))}
                <text x="220" y="160" textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="700">←←← 设计方向：与中心法则相反 ←←←</text>
                {/* 氨基酸替换对比 */}
                <path d="M120 196 q -14 -18 6 -28 q 22 -12 34 4 q 12 14 -4 28 q -18 14 -36 -4 Z" fill="#d8e4f0" stroke="#4d7ea8" strokeWidth="2" />
                <text x="142" y="188" textAnchor="middle" fontSize="9.5" fill="#2c5a84" fontWeight="700">Gly 柔软</text>
                <path d="M256 196 q -14 -18 6 -28 q 22 -12 34 4 q 12 14 -4 28 q -18 14 -36 -4 Z" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2" />
                <text x="278" y="188" textAnchor="middle" fontSize="9.5" fill="#2f6f2a" fontWeight="700">Pro 刚性</text>
                <path d="M188 182 h 48 m 0 0 l -6 -4 m 6 4 l -6 4" fill="none" stroke="#3f7f3a" strokeWidth="2" />
                <text x="220" y="230" textAnchor="middle" fontSize="10.5" fill="#799398">替换关键位点氨基酸，让肽链在高温下更稳定</text>
              </g>
            ) : null}
            {/* 阶段 2：基因改造 + 表达 */}
            {stage === 2 ? (
              <g>
                <text x="220" y="32" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">③ 逆推基因 → 定点突变 → 导入工程菌表达</text>
                <rect x="52" y="56" width="120" height="44" rx="8" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
                <text x="112" y="76" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">原基因片段</text>
                <text x="112" y="92" textAnchor="middle" fontSize="10" fill="#8a671b">…TTC CTT AAC…</text>
                <path d="M176 78 h 26 m 0 0 l -5 -4 m 5 4 l -5 4" fill="none" stroke="#8a671b" strokeWidth="2" />
                <rect x="206" y="56" width="120" height="44" rx="8" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
                <text x="266" y="76" textAnchor="middle" fontSize="10.5" fill="#2f6f2a" fontWeight="700">改造基因</text>
                <text x="266" y="92" textAnchor="middle" fontSize="10" fill="#2f6f2a">…TTC CCT AAC…</text>
                <circle cx="243" cy="104" r="6" fill="#b0483a" />
                <text x="220" y="126" textAnchor="middle" fontSize="10" fill="#a53030" fontWeight="600">定点突变 CTT→CCT（编码 Gly→Pro）</text>
                {/* 工程菌表达 */}
                <rect x="86" y="146" width="88" height="56" rx="12" fill="#dceaea" stroke="#5a7a8a" strokeWidth="2.4" />
                <text x="130" y="170" textAnchor="middle" fontSize="10" fill="#37585f" fontWeight="700">导入大肠杆菌</text>
                <text x="130" y="188" textAnchor="middle" fontSize="9.5" fill="#59767c">发酵表达</text>
                <path d="M178 174 h 28 m 0 0 l -5 -4 m 5 4 l -5 4" fill="none" stroke="#5a7a8a" strokeWidth="2" />
                <rect x="210" y="146" width="76" height="56" rx="10" fill="#f4d06a" stroke="#8a671b" strokeWidth="2.4" />
                <text x="248" y="170" textAnchor="middle" fontSize="10" fill="#8a5a1d" fontWeight="700">新酶</text>
                <text x="248" y="188" textAnchor="middle" fontSize="9.5" fill="#8a671b">纯化收集</text>
                <path d="M290 174 h 26 m 0 0 l -5 -4 m 5 4 l -5 4" fill="none" stroke="#5a7a8a" strokeWidth="2" />
                <rect x="320" y="146" width="66" height="56" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
                <text x="353" y="168" textAnchor="middle" fontSize="10" fill="#2f6f2a" fontWeight="700">70°C ✓</text>
                <text x="353" y="186" textAnchor="middle" fontSize="9.5" fill="#2f6f2a">活性保持</text>
                <text x="220" y="230" textAnchor="middle" fontSize="10.5" fill="#799398">测定酶活与热稳定性，筛选符合预期的新酶</text>
              </g>
            ) : null}
            {/* 阶段 3：总结对比 */}
            {stage === 3 ? (
              <g>
                <text x="220" y="32" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">④ 总结：蛋白质工程 vs 基因工程</text>
                <rect x="46" y="54" width="164" height="118" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.4" />
                <text x="128" y="78" textAnchor="middle" fontSize="11.5" fill="#2c5a84" fontWeight="800">基因工程</text>
                <text x="128" y="102" textAnchor="middle" fontSize="10" fill="#37585f">转移现成基因</text>
                <text x="128" y="124" textAnchor="middle" fontSize="10" fill="#37585f">生产自然界已有的蛋白</text>
                <text x="128" y="146" textAnchor="middle" fontSize="10" fill="#37585f">例：抗虫棉的 Bt 基因</text>
                <rect x="230" y="54" width="164" height="118" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
                <text x="312" y="78" textAnchor="middle" fontSize="11.5" fill="#8a671b" fontWeight="800">蛋白质工程</text>
                <text x="312" y="102" textAnchor="middle" fontSize="10" fill="#8a5a1d">创造新基因</text>
                <text x="312" y="124" textAnchor="middle" fontSize="10" fill="#8a5a1d">可生产自然界没有的蛋白</text>
                <text x="312" y="146" textAnchor="middle" fontSize="10" fill="#8a5a1d">第二代基因工程</text>
                <text x="220" y="204" textAnchor="middle" fontSize="11" fill="#4b6c73" fontWeight="700">共同点：都操作 DNA · 都用到重组 DNA 技术</text>
                <text x="220" y="228" textAnchor="middle" fontSize="10.5" fill="#799398">实例：耐高温酶 · 改良胰岛素（速效/长效）· 定向进化</text>
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
