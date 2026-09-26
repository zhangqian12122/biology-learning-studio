'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（表观遗传）',
    lines: [
      <>表观遗传：<span className="font-semibold">DNA 序列不变</span>，但基因表达发生了可遗传的改变——像给基因加了"开关"或"音量旋钮"。</>
      ,
      <>主要机制：<span className="font-semibold">DNA 甲基化</span>（在碱基上加"小帽子"通常关闭基因）与<span className="font-semibold">组蛋白修饰</span>（改变 DNA 缠绕松紧）。</>
      ,
      <>经典案例：蜜蜂幼虫全程吃蜂王浆 → 发育成蜂后（与工蜂基因相同、表型完全不同）——蜂王浆触发表观遗传开关。</>
      ,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>同卵双胞胎：基因几乎 100% 相同。年轻时"表观指纹"几乎一样；生活方式不同（饮食·压力·运动）几十年后甲基化差异显著。</>
      ,
      <>观察点：基因相同 ≠ 命运相同——环境通过表观遗传"改写"基因的表达谱。</>
      ,
      <>可逆性：与基因突变不同，表观修饰<span className="font-semibold">可以逆转</span>——这是表观遗传药物的研发基础。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>表观遗传<span className="font-semibold">不改变 DNA 序列</span>——与基因突变（序列改变）严格区分，这是高频考点。</>
      ,
      <>应用：抗癌药物的"表观遗传 therapy"（重新激活被错误沉默的基因）；克隆动物效率低可能与表观重编程不全有关。</>
      ,
      <>联系课本：细胞分化 = 基因的选择性表达；表观修饰正是"选择性表达"的重要分子机制之一。</>
      ,
    ],
  },
];

type Twin = 'young' | 'old';

export function EpigeneticsLab() {
  const [twin, setTwin] = useState<Twin>('young');
  const [lifestyle, setLifestyle] = useState<'same' | 'diff'>('same');

  const divergence = lifestyle === 'same' ? (twin === 'young' ? 5 : 12) : (twin === 'young' ? 15 : 45);

  const observation = (() => {
    if (lifestyle === 'same')
      return twin === 'young'
        ? '一对同卵双胞胎，基因"出厂设置"完全相同；10 岁时他们的甲基化图谱几乎一致。'
        : '即使生活方式相同，40 年后仍有一些甲基化差异（12%）——随机漂变也参与表观衰老。';
    return twin === 'young'
      ? '一个留在家乡、一个去了大城市：仅十年，生活方式的差异已让两人的甲基化图谱出现明显分歧（15%）——环境开始"改写"基因的开关。'
      : '40 年后：一个热爱运动饮食清淡，一个熬夜应酬——两人基因相同，但甲基化差异高达 45%，疾病风险谱也截然不同。基因相同，命运却可以不同。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">同卵双胞胎的生活方式</p>
              <div className="grid gap-1.5">
                <button
                  type="button"
                  onClick={() => setLifestyle('same')}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${lifestyle === 'same' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'}`}
                >
                  生活方式相似
                </button>
                <button
                  type="button"
                  onClick={() => setLifestyle('diff')}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${lifestyle === 'diff' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'}`}
                >
                  生活方式迥异
                </button>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">追踪时间点</p>
              <div className="grid gap-1.5">
                <button
                  type="button"
                  onClick={() => setTwin('young')}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${twin === 'young' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078]'}`}
                >
                  10 岁（儿童期）
                </button>
                <button
                  type="button"
                  onClick={() => setTwin('old')}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${twin === 'old' ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078]'}`}
                >
                  50 岁（中年）
                </button>
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              甲基化差异：<span className="text-base font-bold text-[#b0483a]">{divergence}%</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">基因相同 ≠ 表达相同</span>
            </div>
          </>
        }
      >
        <SceneBox label="同卵双胞胎的表观遗传「周记」（追踪实验）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* DNA 双链 */}
            <path d="M70 90 Q 100 130 130 90 Q 160 50 190 90 Q 220 130 250 90 Q 280 50 310 90 Q 340 130 370 90" fill="none" stroke="#4d7ea8" strokeWidth="4" />
            <path d="M70 90 Q 100 50 130 90 Q 160 130 190 90 Q 220 50 250 90 Q 280 130 310 90 Q 340 50 370 90" fill="none" stroke="#4d7ea8" strokeWidth="4" />
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1={100 + i * 68} y1={78 + (i % 2) * 12} x2={132 + i * 68} y2={78 + (i % 2) * 12} stroke="#8ac8d8" strokeWidth="2.6" />
            ))}
            {/* 甲基化"帽子" */}
            {[1, 3].map((i) => (
              <circle key={i} cx={116 + i * 68} cy={70 + (i % 2) * 12} r="7" fill="#b0483a" stroke="#8a3030" strokeWidth="1.6" />
            ))}
            <text x="220" y="140" textAnchor="middle" fontSize="10.5" fill="#8a3030" fontWeight="700">红色"帽子"= 甲基化标记（基因静音开关）</text>
            {/* 双胞胎分歧 */}
            <rect x="60" y="160" width="140" height="60" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
            <text x="130" y="184" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">双胞胎 A</text>
            <text x="130" y="204" textAnchor="middle" fontSize="9.5" fill="#59767c">健康饮食·规律运动</text>
            <rect x="240" y="160" width="140" height="60" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
            <text x="310" y="184" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">双胞胎 B</text>
            <text x="310" y="204" textAnchor="middle" fontSize="9.5" fill="#a5761d">熬夜·高糖高脂饮食</text>
            <text x="220" y="248" textAnchor="middle" fontSize="10.5" fill="#799398">同卵双胞胎研究：基因不变，"开关"模式却随生活方式分道扬镳</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
