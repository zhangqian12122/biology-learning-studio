'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（DNA 指纹）',
    lines: [
      <>人类基因组中有大量<span className="font-semibold">串联重复序列（STR）</span>：同一位点重复次数因人而异，重复单位数不同的 DNA 片段长度不同。</>
      ,
      <>用 PCR 扩增若干个 STR 位点，再经<span className="font-semibold">凝胶电泳</span>分离：不同人的条带位置组合就像指纹一样独一无二——故称 DNA 指纹。</>
      ,
      <>体细胞（毛发毛囊、口腔上皮、血液）的 DNA 全相同，因此<span className="font-semibold">任何微量组织都能鉴定</span>；同卵双胞胎除外。</>
      ,
    ],
  },
  {
    title: '亲子鉴定的判读逻辑',
    lines: [
      <>每个 STR 位点成对存在：<span className="font-semibold">一条来自母亲，一条来自父亲</span>（等位基因）。</>
      ,
      <>孩子的每条带都必须能在"母亲 + 被检父亲"中找到来源：能找到一个无法用母亲解释、却与被检父亲相符的带——<span className="font-semibold">支持</span>亲子关系。</>
      ,
      <>若孩子有<span className="font-semibold">两条带都无法</span>由母亲和被检父亲解释——<span className="font-semibold">排除</span>亲子关系（这是 100% 确定的否定结论）。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>DNA 指纹的本质：<span className="font-semibold">DNA 的特异性</span>（每个人的碱基序列不同）——区别于"每个人 DNA 基本相同、只有个别基因不同"的说法。</>
      ,
      <>应用：<span className="font-semibold">法医鉴定</span>（现场血迹毛发）、<span className="font-semibold">亲子鉴定</span>、灾难遗骸辨认、预警遗传病基因。</>
      ,
      <>技术组合：PCR（把微量 DNA 扩增到可检测量）+ 凝血电泳（按大小分离条带）——本站 PCR 与电泳两个实验的"实战应用"。</>
      ,
    ],
  },
];

type Candidate = 'A' | 'B';

/** 每条泳道的条带纵坐标（viewBox 坐标） */
const LANES = [
  { label: '母亲', x: 96, bands: [150, 235], color: '#4d7ea8' },
  { label: '孩子', x: 178, bands: [150, 175], color: '#8a671b' },
  { label: '候选父亲 A', x: 262, bands: [195, 125], color: '#59767c' },
  { label: '候选父亲 B', x: 346, bands: [175, 130], color: '#59767c' },
];

export function DnaFingerprintLab() {
  const [candidate, setCandidate] = useState<Candidate>('A');
  const [reported, setReported] = useState(false);

  const excluded = candidate === 'A';

  const observation = (() => {
    if (!reported)
      return '凝胶图已就绪：孩子的一条带（上）与母亲相同——来自母亲；另一条带（下）必须来自生父。先选择一位候选父亲，再点击「出具鉴定报告」比对条带。';
    if (excluded)
      return '鉴定结论：排除 A。孩子的第二条带（下方位置）既不来自母亲，也无法在 A 的泳道中找到相同位置——出现两条无法解释的带，亲子关系被 100% 排除。换候选父亲 B 再试。';
    return '鉴定结论：支持 B（亲子关系相对概率 > 99.99%）。孩子的下方条带与 B 泳道中的条带位置完全一致——这一等位基因只能来自 B；上方条带来自母亲。两条带来源全部得到解释。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择候选父亲</p>
              <div className="grid gap-1.5">
                {(['A', 'B'] as Candidate[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setCandidate(id);
                      setReported(false);
                    }}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      candidate === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    候选父亲 {id}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setReported(true)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64]"
            >
              📋 出具鉴定报告
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              判读要点：<span className="font-semibold">孩子两条带 = 一条来自母 + 一条来自父</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">否定是 100% 的，肯定只是概率</span>
            </div>
          </>
        }
      >
        <SceneBox label="STR 位点电泳图（条带位置即「指纹」）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 胶板 */}
            <rect x="40" y="46" width="360" height="186" rx="8" fill="#f2f0e6" stroke="#b5a582" strokeWidth="2.2" />
            {/* 点样孔 */}
            {LANES.map((l) => (
              <rect key={`w${l.label}`} x={l.x - 16} y={58} width="32" height="11" rx="2" fill="#8a9a9f" stroke="#5a7a8a" strokeWidth="1.2" />
            ))}
            {LANES.map((l) => (
              <text key={`t${l.label}`} x={l.x} y={48} textAnchor="middle" fontSize="10" fill={candidate === l.label.replace('候选父亲 ', '') ? '#0e6f75' : '#4b6c73'} fontWeight="600">
                {l.label}
              </text>
            ))}
            {/* 候选泳道高亮框 */}
            {candidate ? (
              <rect x={candidate === 'A' ? 240 : 324} y={56} width="44" height="170" rx="6" fill="none" stroke="#0e6f75" strokeWidth="2.4" strokeDasharray="6 4" />
            ) : null}
            {/* 条带 */}
            {LANES.map((l, li) =>
              l.bands.map((y, bi) => {
                const isChild = li === 1;
                const paternal = isChild && bi === 1;
                const matchCandidate = paternal && candidate === 'B';
                const highlight = reported && (isChild || (paternal && matchCandidate));
                return (
                  <g key={`${li}-${bi}`}>
                    {highlight ? <rect x={l.x - 20} y={y - 8} width="40" height="16" rx="5" fill="none" stroke="#e8a03a" strokeWidth="2" /> : null}
                    <rect x={l.x - 13} y={y - 5} width="26" height="10" rx="3" fill={l.color} opacity={reported || !isChild ? 0.95 : 1} />
                  </g>
                );
              }),
            )}
            {/* 注释 */}
            {reported ? (
              <g>
                <text x="220" y="248" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">
                  {excluded ? 'A：无法解释的带 → 排除' : 'B：父源带位置一致 → 支持（金框标注）'}
                </text>
              </g>
            ) : (
              <text x="220" y="248" textAnchor="middle" fontSize="10.5" fill="#9ab0b5">孩子的上一条带来自母亲，下一条带来自生父</text>
            )}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
