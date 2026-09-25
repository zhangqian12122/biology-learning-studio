'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '什么是干细胞',
    lines: [
      <>干细胞是动物和人体内保留的少数<span className="font-semibold">具有分裂和分化能力</span>的细胞：既能自我更新（不断分裂产生新的干细胞），又能分化成各种 specialized 细胞。</>,
      <>按分化潜能分：<span className="font-semibold">全能干细胞</span>（受精卵及卵裂早期细胞，能发育成完整个体）→ <span className="font-semibold">多能干细胞</span>（胚胎干细胞，能分化出各种组织，但不能发育成完整个体）→ <span className="font-semibold">专能干细胞</span>（造血干细胞、皮肤生发层细胞等，只能分化成特定类型的细胞）。</>,
    ],
  },
  {
    title: '三种干细胞来源对比',
    lines: [
      <>① 胚胎干细胞（ESC）：来自早期胚胎内细胞团，分化潜能最强，但获取会破坏胚胎——伦理争议大。</>,
      <>② 成体干细胞：来自骨髓、脂肪、脐带血等，如造血干细胞——已用于治疗白血病（骨髓移植），但分化潜能有限、数量少。</>,
      <>③ iPS 细胞（诱导多能干细胞）：把 Oct3/4、Sox2、c-Myc、Klf4 四种转录因子基因导入已分化的皮肤成纤维细胞，使其"返老还童"回到干细胞状态——山中伸弥凭此获 2012 年诺贝尔奖。既避开了胚胎伦理问题，又可用患者自身细胞避免免疫排斥。</>,
    ],
  },
  {
    title: '应用与考点',
    lines: [
      <>治疗前景：帕金森病（多巴胺神经元）、糖尿病（胰岛 β 细胞）、脊髓损伤、角膜与皮肤修复——"替换死亡或受损的细胞"。</>,
      <>iPS 细胞的核心思路：<span className="font-semibold">已分化的细胞核仍保留全套基因（全能性物质基础），通过"重编程"可以逆转分化</span>——与核移植（多莉羊）证明的结论一致。</>,
      <>风险：iPS 细胞致癌风险（c-Myc 是原癌基因）、分化方向难以精确控制——临床应用仍在规范中。</>,
    ],
  },
];

type Source = 'esc' | 'asc' | 'ips';

const SOURCES: Record<Source, { label: string; desc: string; potential: number; ethics: string; note: string }> = {
  esc: {
    label: '胚胎干细胞（ESC）',
    desc: '来自早期胚胎的内细胞团',
    potential: 3,
    ethics: '伦理争议大（破坏胚胎）',
    note: '能分化为体内几乎所有类型的细胞（多能），但单独不能发育成完整个体。',
  },
  asc: {
    label: '成体干细胞（ASC）',
    desc: '骨髓、脐带血、皮肤生发层等',
    potential: 1,
    ethics: '伦理争议小',
    note: '只能分化成特定类型细胞（专能），如造血干细胞 → 红细胞、白细胞、血小板——白血病骨髓移植的原理。',
  },
  ips: {
    label: 'iPS 诱导多能干细胞',
    desc: '皮肤成纤维细胞 + 4 种转录因子重编程',
    potential: 3,
    ethics: '避开胚胎争议·可用自体细胞',
    note: '让已分化的细胞"逆分化"回多能状态——2012 年诺贝尔奖技术，治疗时用患者自己的细胞不会免疫排斥。',
  },
};

const POTENTIAL_LABELS = ['专能（1 类）', '多能（多类）', '多能（几乎全部）'];

export function StemCellTherapyLab() {
  const [source, setSource] = useState<Source>('ips');
  const cur = SOURCES[source];

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择干细胞来源（对比三种方案）</p>
              <div className="grid gap-1.5">
                {(Object.keys(SOURCES) as Source[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSource(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      source === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {SOURCES[id].label}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              分化潜能：{'★'.repeat(cur.potential) + '☆'.repeat(3 - cur.potential)}
              <br />
              伦理标签：<span className="font-semibold text-[#0e6f75]">{cur.ethics}</span>
            </div>
          </>
        }
      >
        <SceneBox label={`干细胞来源对比：${cur.label}`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 干细胞本体 */}
            <circle cx="110" cy="110" r="42" fill="#c9d8e8" stroke="#2c5a84" strokeWidth="3" />
            <circle cx="110" cy="110" r="15" fill="#5a8ab5" stroke="#2c5a84" strokeWidth="2" />
            <text x="110" y="115" textAnchor="middle" fontSize="9.5" fill="#ffffff" fontWeight="700">n</text>
            <text x="110" y="172" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">干细胞（自我更新）</text>
            {/* 分化箭头树 */}
            <path d="M160 110 h 30" stroke="#5a7a8a" strokeWidth="2.2" />
            <path d="M190 110 q 24 0 24 -28 v -18 m -24 46 q 24 0 24 28 v 18" fill="none" stroke="#5a7a8a" strokeWidth="2.2" />
            {/* 分化产物 */}
            <g>
              <circle cx="266" cy="60" r="16" fill="#e8a0a0" stroke="#a54838" strokeWidth="2" />
              <text x="292" y="56" fontSize="10.5" fill="#8a3a2a" fontWeight="600">神经细胞</text>
              <text x="292" y="72" fontSize="9.5" fill="#a5533c">帕金森病治疗</text>
            </g>
            <g>
              <circle cx="266" cy="110" r="16" fill="#b8d8b0" stroke="#3f7f3a" strokeWidth="2" />
              <text x="292" y="106" fontSize="10.5" fill="#2f6f2a" fontWeight="600">胰岛 β 细胞</text>
              <text x="292" y="122" fontSize="9.5" fill="#3f7f3a">糖尿病治疗</text>
            </g>
            <g>
              <circle cx="266" cy="160" r="16" fill="#f0d090" stroke="#8a671b" strokeWidth="2" />
              <text x="292" y="156" fontSize="10.5" fill="#8a671b" fontWeight="600">心肌细胞</text>
              <text x="292" y="172" fontSize="9.5" fill="#a5761d">心梗后修复</text>
            </g>
            {/* 分化潜能条 */}
            <g>
              <text x="46" y="204" fontSize="10.5" fill="#4b6c73" fontWeight="700">分化潜能：</text>
              {[0, 1, 2].map((i) => (
                <rect key={i} x={116 + i * 40} y={194} width="32" height="12" rx="3" fill={i < cur.potential ? '#5a8ab5' : '#e4ece4'} stroke="#8a9a9f" strokeWidth="1" />
              ))}
              <text x={244} y="204" fontSize="10" fill="#37585f" fontWeight="600">{POTENTIAL_LABELS[cur.potential - 1]}</text>
            </g>
            <g>
              <text x="46" y="228" fontSize="10.5" fill="#4b6c73" fontWeight="700">来源说明：</text>
              <text x="112" y="228" fontSize="10" fill="#59767c">{cur.desc}</text>
            </g>
            <text x="46" y="250" fontSize="10.5" fill="#799398">{cur.note}</text>
          </svg>
        </SceneBox>

        <ObservationNote>
          {`当前方案：${cur.label}。${cur.note}${source === 'ips' ? ' iPS 技术证明：分化的实质是基因的选择性表达，细胞核仍保留全套遗传物质——"重编程"可以逆转。' : ''}`}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
