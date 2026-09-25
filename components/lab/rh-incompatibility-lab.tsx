'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（Rh 血型与新生儿溶血）',
    lines: [
      <>人类红细胞除 ABO 抗原外还有 <span className="font-semibold">Rh 抗原（D 抗原）</span>：有 D 为 Rh 阳性（Rh⁺，约占 99%），无 D 为 Rh 阴性（Rh⁻，俗称"熊猫血"）。</>
      ,
      <>Rh⁻ 母亲怀上 Rh⁺ 胎儿时：分娩时胎儿红细胞可能进入母体，刺激母体产生<span className="font-semibold">抗 Rh 抗体</span>。</>
      ,
      <>第一胎通常安全（抗体产生慢、孩子已出生）；但<span className="font-semibold">第二胎仍是 Rh⁺</span> 时，母体记忆细胞快速产生的抗体（IgG 可穿过胎盘）攻击胎儿红细胞 → <span className="font-semibold">新生儿溶血病</span>。</>
      ,
    ],
  },
  {
    title: '预防与治疗',
    lines: [
      <>产前检查必查<span className="font-semibold">血型与 Rh 因子</span>：Rh⁻ 孕妇为高危人群。</>
      ,
      <>特效预防：第一胎分娩后 <span className="font-semibold">72 小时内注射抗 D 免疫球蛋白</span>，把进入母体的胎儿红细胞"就地清除"——母体还没来得及产生抗体，下一胎就安全了。</>
      ,
      <>重症患儿治疗：<span className="font-semibold">换血疗法</span>（替换被溶解的红细胞与胆红素）与蓝光照射（分解胆红素）。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>新生儿溶血是<span className="font-semibold">免疫"记忆"带来的风险</span>——与过敏（也是二次接触才发作）对比记忆：都依赖记忆细胞与抗体的"二次应答"。</>
      ,
      <>ABO 溶血（母 O 胎 A/B）也可能发生但通常较轻——因为天然抗 A/抗 B 主要是 IgM，不易穿过胎盘。</>
      ,
      <>基因视角：Rh⁻ 是隐性（dd），Rh⁺ 是显性（DD/Dd）——Rh⁻ 母亲 × Rh⁺ 父亲，胎儿 Rh⁺ 的概率取决于父亲基因型。</>
      ,
    ],
  },
];

type Stage = 0 | 1 | 2 | 3;

export function RhIncompatibilityLab() {
  const [stage, setStage] = useState(0);
  const [prevented, setPrevented] = useState(false);
  const step = () => {
    if (prevented && stage === 2) return;
    setStage((s) => Math.min(3, s + 1) as Stage);
  };
  const reset = () => {
    setStage(0);
    setPrevented(false);
  };

  const observation = (() => {
    if (stage === 0)
      return '家庭档案：妈妈是 Rh⁻（熊猫血），爸爸是 Rh⁺。第一胎宝宝是 Rh⁺（遗传了爸爸的 D 抗原）。妊娠期间母婴血"隔膜不混流"，看似平安无事。';
    if (stage === 1 && prevented)
      return '预防到位！分娩后 72 小时内注射了抗 D 免疫球蛋白，胎儿红细胞被立即清除——母体没有产生记忆细胞和抗体，第二胎依然是安全的。这是现代产检的"标配操作"。';
    if (stage === 1)
      return '分娩时刻：部分胎儿的红细胞进入了妈妈体内。Rh⁻ 的妈妈把 D 抗原当成"外来入侵者"——初次免疫应答虽然缓慢，却留下了记忆细胞。';
    if (stage === 2 && prevented)
      return '第二胎仍是 Rh⁺，但母体内没有抗 Rh 抗体（第一胎时已预防注射）——宝宝平安出生。预防一步，改变结局。';
    if (stage === 2)
      return '第二胎又是一个 Rh⁺ 宝宝——这次危险了！妈妈的记忆细胞"认出"D 抗原，快速产生大量 IgG 抗体。IgG 是唯一能穿过胎盘的抗体——它们进入胎儿血液循环，开始攻击宝宝的红细胞。';
    return '新生儿溶血病：宝宝红细胞被大量破坏，出现黄疸、贫血、水肿——需换血与蓝光治疗。整个案例的关键："第一胎安全 ≠ 以后都安全"。Rh⁻ 孕妇按规范注射抗 D 免疫球蛋白，风险即可预防。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= 3 || (prevented && stage === 2)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {['🏥 第一胎妊娠', '👶 第一胎分娩', '🤰 第二胎妊娠', '🩺 观察结局'][stage]}
              （{stage}/3）
            </button>
            <button
              type="button"
              onClick={() => setPrevented(true)}
              className="min-h-10 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              💉 产后 72h 注射抗 D 免疫球蛋白
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              母亲 Rh⁻ × 父亲 Rh⁺
              <br />
              <span className="font-semibold text-[#0e6f75]">IgG 能穿过胎盘——二次应答是关键</span>
            </div>
          </>
        }
      >
        <SceneBox label="Rh 血型不合的家庭档案（步进演示）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 母亲 */}
            <g>
              <circle cx="100" cy="80" r="24" fill="#f0c9b0" stroke="#a5765a" strokeWidth="2.4" />
              <path d="M80 66 q 20 -18 40 0 q -20 -8 -40 0" fill="#5a3a2a" />
              <path d="M76 104 q 24 12 48 0 l 0 20 l -48 0 Z" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2" />
              <text x="100" y="150" textAnchor="middle" fontSize="11" fill="#3f7f3a" fontWeight="800">妈妈 Rh⁻（dd）</text>
            </g>
            {/* 父亲 */}
            <g>
              <circle cx="340" cy="80" r="24" fill="#e8c9a8" stroke="#8a5a3a" strokeWidth="2.4" />
              <path d="M320 66 q 20 -16 40 0 q -20 -6 -40 0" fill="#2a2a2a" />
              <text x="340" y="150" textAnchor="middle" fontSize="11" fill="#8a5a3a" fontWeight="800">爸爸 Rh⁺（Dd）</text>
            </g>
            {/* 胎儿 */}
            <g>
              <circle cx="220" cy="170" r="22" fill="#f4d0b8" stroke="#a5765a" strokeWidth="2.4" />
              <text x="220" y="176" textAnchor="middle" fontSize="10" fill="#8a5a3a" fontWeight="700">胎儿</text>
              {stage >= 1 ? (
                <g>
                  <circle cx="220" cy="215" r="12" fill="#c94a4a" stroke="#8a2020" strokeWidth="1.8" />
                  <text x="220" y="219" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="700">Rh⁺</text>
                  {stage >= 2 && !prevented ? (
                    <g>
                      <path d="M208 212 l -12 14 m 24 -10 l 10 16" stroke="#b0483a" strokeWidth="2.6" strokeLinecap="round" />
                      <text x="150" y="248" fontSize="10" fill="#b0483a" fontWeight="700">抗体攻击红细胞 → 溶血</text>
                    </g>
                  ) : null}
                </g>
              ) : null}
            </g>
            {/* 抗体标记 */}
            {stage === 1 ? (
              <text x="220" y="60" textAnchor="middle" fontSize="10.5" fill="#4d7ea8" fontWeight="700">分娩：胎儿血少量进入母体 → 初次免疫（缓慢）</text>
            ) : null}
            {stage === 2 ? (
              <text x="220" y="60" textAnchor="middle" fontSize="10.5" fill={prevented ? '#2f6f2a' : '#b0483a'} fontWeight="700">
                {prevented ? '抗 D 抗体已清除胎儿红细胞 ✓ 无记忆细胞' : '记忆细胞快速应答 · IgG 穿过胎盘'}
              </text>
            ) : null}
            {stage === 3 ? (
              <g>
                <rect x="46" y="40" width="348" height="30" rx="8" fill={prevented ? '#e2f0e2' : '#f4e0e0'} stroke={prevented ? '#3f7f3a' : '#a54838'} strokeWidth="2" />
                <text x="220" y="60" textAnchor="middle" fontSize="10.5" fill={prevented ? '#2f6f2a' : '#8a3a2a'} fontWeight="800">
                  {prevented ? '结局：第二胎平安（预防有效）' : '结局：新生儿溶血——换血 + 蓝光治疗'}
                </text>
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
