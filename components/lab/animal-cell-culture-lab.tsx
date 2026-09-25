'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（动物细胞培养）',
    lines: [
      <>动物细胞培养就是从动物机体中取出相关的组织，将它分散成<span className="font-semibold">单个细胞</span>，然后放在适宜的培养基中让这些细胞生长和增殖。</>,
      <>培养前要用<span className="font-semibold">胰蛋白酶（或胶原蛋白酶）</span>处理组织块，把细胞间的蛋白质消化掉，使组织分散成单个细胞——细胞团会妨碍营养物质交换。</>,
      <>动物细胞培养是<span className="font-semibold">动物细胞工程的基础技术</span>：核移植、杂交瘤、基因工程的受体细胞扩增等都离不开它。</>,
    ],
  },
  {
    title: '培养条件',
    lines: [
      <>① 无菌、无毒环境：添加一定量抗生素；定期更换培养液以清除代谢废物。</>,
      <>② 营养：合成培养基（糖、氨基酸、促生长因子、无机盐、微量元素等），通常还需加入血清等天然成分。</>,
      <>③ 温度和 pH：哺乳动物细胞 36.5±0.5°C，pH 7.2~7.4。</>,
      <>④ 气体环境：95% 空气（O₂，细胞代谢必需）+ 5% CO₂（维持培养液 pH）——CO₂ 培养箱。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>悬液中分散的细胞很快<span className="font-semibold">贴附在瓶壁上生长</span>（贴壁生长）——绝大多数细胞需要附着才能分裂。</>,
      <>贴壁生长的细胞分裂生长到表面<span className="font-semibold">相互接触时就停止分裂增殖</span>（接触抑制），所以要分瓶<span className="font-semibold">传代培养</span>。</>,
      <>原代培养 ≤10 代；能连续传代的细胞叫<span className="font-semibold">细胞系</span>；其中获得不死性（类似癌变）但仍保持接触抑制的细胞群叫<span className="font-semibold">细胞株</span>。部分考点表述为"遗传物质改变的细胞系获得了无限传代能力"。</>,
      <>细胞株/细胞系概念按人教版新教材：细胞株指原代培养传到 10~50 代的细胞；50 代后再也不能传代而消亡；极少数能越过 50 代获得无限增殖能力，遗传物质改变（类似癌变）——称为细胞系。</>,
    ],
  },
];

const STAGES = 3;

export function AnimalCellCultureLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '取动物胚胎或幼龄动物的组织剪碎，用胰蛋白酶处理——把细胞之间的蛋白质消化掉，组织分散成了单个细胞的悬液。为什么要选幼龄组织？细胞分裂能力强，更容易培养起来。';
    if (stage === 1)
      return '细胞悬液转入培养瓶加入培养液，放入 CO₂ 培养箱（37°C、95% 空气 + 5% CO₂）。细胞很快贴附到瓶壁上伸展生长，开始分裂——注意培养条件四要素：无菌无毒、营养、温度 pH、气体环境。';
    if (stage === 2)
      return '瓶壁上的细胞越长越多，铺满瓶壁后相互接触——分裂停止了！这就是"接触抑制"。对策：用胰蛋白酶把细胞从瓶壁上洗下来，分成多瓶继续培养，这叫传代培养。';
    return '传代培养到 10~50 代后，大部分细胞衰老死亡；极少数细胞遗传物质改变（类似癌变），获得无限传代能力——它们构成了细胞系，比如著名的 HeLa 细胞。细胞培养是核移植、杂交瘤、基因工程等技术的共同基础。';
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
              🔬 推进培养（{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新取材
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              四大条件：<span className="font-semibold">无菌无毒 · 营养 · 温度 pH · 气体</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">贴壁生长 + 接触抑制 → 需要传代</span>
            </div>
          </>
        }
      >
        <SceneBox label="动物细胞培养流程（步进演示）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 阶段 0：胰蛋白酶分散 */}
            {stage === 0 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">① 剪碎组织 → 胰蛋白酶分散成单个细胞</text>
                {/* 组织块 */}
                <path d="M80 90 q 24 -26 62 -12 q 30 12 20 40 q -12 28 -46 22 q -40 -6 -36 -50 Z" fill="#c96a6a" stroke="#8a3a3a" strokeWidth="2.4" />
                <circle cx="102" cy="102" r="6" fill="#8a3a3a" />
                <circle cx="128" cy="94" r="6" fill="#8a3a3a" />
                <circle cx="118" cy="122" r="6" fill="#8a3a3a" />
                <text x="112" y="176" textAnchor="middle" fontSize="10.5" fill="#8a3a3a" fontWeight="600">组织块</text>
                {/* 酶 */}
                <rect x="176" y="86" width="86" height="26" rx="13" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2" />
                <text x="219" y="104" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="700">+ 胰蛋白酶</text>
                <path d="M172 99 h 26 m 0 0 l -6 -4 m 6 4 l -6 4" fill="none" stroke="#5a7a8a" strokeWidth="1.6" />
                {/* 单细胞悬液 */}
                <rect x="276" y="60" width="110" height="70" rx="10" fill="#dceaea" stroke="#5a7a8a" strokeWidth="2.2" />
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <circle key={i} cx={296 + (i % 3) * 30} cy={82 + Math.floor(i / 3) * 30} r="9" fill="#e8a0a0" stroke="#8a3a3a" strokeWidth="1.6" />
                ))}
                <text x="331" y="152" textAnchor="middle" fontSize="10.5" fill="#37585f" fontWeight="600">单细胞悬液</text>
                <text x="220" y="216" textAnchor="middle" fontSize="10.5" fill="#799398">细胞间蛋白质被水解——细胞分散才能充分接触营养</text>
              </g>
            ) : null}
            {/* 阶段 1：贴壁生长 */}
            {stage === 1 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">② 培养瓶贴壁生长（CO₂ 培养箱 37°C）</text>
                <rect x="60" y="56" width="320" height="110" rx="18" fill="#dceaea" stroke="#5a7a8a" strokeWidth="2.6" />
                <text x="76" y="76" fontSize="10" fill="#59767c">培养液</text>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <circle key={i} cx={96 + (i % 5) * 58} cy={130 + Math.floor(i / 5) * 24 + (i % 3) * 4} r="11" fill="#e8a0a0" stroke="#8a3a3a" strokeWidth="1.8" />
                ))}
                <path d="M60 158 h 320" stroke="#8a9a9f" strokeWidth="3" />
                <text x="380" y="182" fontSize="10" fill="#59767c">瓶壁</text>
                {/* 培养箱标注 */}
                <text x="420" y="120" textAnchor="middle" fontSize="10" fill="#4b6c73" fontWeight="600">95% 空气</text>
                <text x="420" y="136" textAnchor="middle" fontSize="10" fill="#4b6c73" fontWeight="600">5% CO₂</text>
                <text x="220" y="216" textAnchor="middle" fontSize="10.5" fill="#799398">细胞贴附瓶壁伸展开分裂增殖（贴壁生长）</text>
              </g>
            ) : null}
            {/* 阶段 2：接触抑制 + 传代 */}
            {stage === 2 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">③ 铺满瓶壁 → 接触抑制 → 分瓶传代</text>
                <rect x="46" y="56" width="150" height="100" rx="14" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.4" />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <circle key={`a${i}`} cx={64 + (i % 5) * 28} cy={82 + Math.floor(i / 5) * 26} r="9" fill="#e8a0a0" stroke="#8a3a3a" strokeWidth="1.4" />
                ))}
                <text x="121" y="176" textAnchor="middle" fontSize="10.5" fill="#a54838" fontWeight="700">铺满 → 停止分裂</text>
                <path d="M208 106 h 30 m 0 0 l -6 -4 m 6 4 l -6 4" fill="none" stroke="#5a7a8a" strokeWidth="1.8" />
                <rect x="250" y="56" width="150" height="100" rx="14" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <circle key={`b${i}`} cx={272 + (i % 3) * 40} cy={84 + Math.floor(i / 3) * 30} r="9" fill="#b8d8b0" stroke="#3f7f3a" strokeWidth="1.4" />
                ))}
                <text x="325" y="176" textAnchor="middle" fontSize="10.5" fill="#3f7f3a" fontWeight="700">分瓶后继续分裂</text>
                <text x="220" y="216" textAnchor="middle" fontSize="10.5" fill="#799398">接触抑制 = 相邻细胞接触后分裂停止（正常细胞的特征）</text>
              </g>
            ) : null}
            {/* 阶段 3：传代与细胞系 */}
            {stage === 3 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">④ 传代 10~50 代 → 细胞株 → 细胞系</text>
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <rect x={52 + i * 84} y="66" width="66" height="60" rx="8" fill={i < 4 ? '#eef4f6' : '#f4e0e0'} stroke={i < 4 ? '#4d7ea8' : '#a54838'} strokeWidth="2" />
                    <text x={85 + i * 84} y="102" textAnchor="middle" fontSize="10.5" fill={i < 4 ? '#2c5a84' : '#a54838'} fontWeight="700">{i === 0 ? '原代' : `${i * 10}代`}</text>
                  </g>
                ))}
                <text x="274" y="76" fontSize="10" fill="#8a671b" fontWeight="600">50 代左右多数细胞消亡</text>
                <rect x="96" y="150" width="120" height="56" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
                <text x="156" y="174" textAnchor="middle" fontSize="10.5" fill="#2f6f2a" fontWeight="700">细胞株</text>
                <text x="156" y="192" textAnchor="middle" fontSize="9.5" fill="#2f6f2a">10~50 代的传代细胞</text>
                <rect x="240" y="150" width="130" height="56" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
                <text x="305" y="174" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">细胞系</text>
                <text x="305" y="192" textAnchor="middle" fontSize="9.5" fill="#8a671b">遗传改变 · 无限传代</text>
                <text x="220" y="234" textAnchor="middle" fontSize="10.5" fill="#799398">例：HeLa 细胞——1951 年至今仍在为科学研究"工作"</text>
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
