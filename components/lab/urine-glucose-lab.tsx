'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>正常人血糖浓度维持稳定（3.9~6.1 mmol/L），尿液中几乎不含葡萄糖。</>,
      <>糖尿病病人血糖过高，超出肾小管重吸收能力，尿液中会出现葡萄糖（尿糖）。</>,
      <>尿糖试纸上的葡萄糖氧化酶与尿液反应，试纸颜色由<span className="font-semibold">蓝 → 棕/深棕</span>，颜色越深含糖越高——与标准比色卡对照即可判读。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>材料：三份模拟尿样（编号 A/B/C）。</>,
      <>用具：尿糖试纸、比色卡、滴管、记录表。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 将试纸浸入待测尿样中约 2 秒，取出。</>,
      <>② 等 30~60 秒，与标准比色卡对照，读出结果（— / + / ++ / +++）。</>,
      <>③ 换新试纸检测下一份样品，避免交叉污染。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>每份样品必须用<span className="font-semibold">新试纸</span>；试纸要在有效期内、避光保存。</>,
      <>检测结果只反映"当时"的尿糖水平，确诊糖尿病还需结合血糖检测（静脉血糖）。</>,
      <>血糖平衡依赖胰岛素与胰高血糖素等的共同调节——糖尿病可能与胰岛素分泌不足有关。</>,
    ],
  },
];

type SampleId = 'A' | 'B' | 'C';
const SAMPLES: Record<SampleId, { label: string; level: number; desc: string }> = {
  A: { label: '尿样 A（健康人）', level: 0, desc: '正常人：血糖正常，肾小管将原尿中的葡萄糖全部重吸收，尿中无糖。' },
  B: { label: '尿样 B（糖尿病患者）', level: 3, desc: '糖尿病患者血糖过高，超出肾小管重吸收能力，尿中出现葡萄糖。' },
  C: { label: '尿样 C（大量吃糖后）', level: 1, desc: '短时间内摄入大量糖，血糖一过性升高，尿中出现少量葡萄糖——属暂时现象。' },
};

const COLOR_SCALE = [
  { label: '—', color: '#4d7ea8', meaning: '无葡萄糖' },
  { label: '+', color: '#6a9a5e', meaning: '微量' },
  { label: '++', color: '#c9b23e', meaning: '少量' },
  { label: '+++', color: '#c9702e', meaning: '较多' },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function UrineGlucoseTestLab() {
  const [sample, setSample] = useState<SampleId>('A');
  const [dipped, setDipped] = useState(false);
  const level: number | null = dipped ? SAMPLES[sample].level : null;
  const color = level === null ? '#4d7ea8' : COLOR_SCALE[level].color;
  void color;

  const reset = () => setDipped(false);

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择待测尿样</p>
              <div className="grid gap-1.5">
                {(Object.keys(SAMPLES) as SampleId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setSample(id);
                      setDipped(false);
                    }}
                    aria-pressed={sample === id}
                    className={cnChip(sample === id)}
                  >
                    {SAMPLES[id].label}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              disabled={dipped}
              onClick={() => setDipped(true)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {dipped ? '✅ 已浸入并显色' : '将试纸浸入尿样 2 秒'}
            </button>
            {dipped ? (
              <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
                换新试纸重测
              </button>
            ) : null}
          </>
        }
      >
        <SceneBox label="尿糖试纸检测结果（与比色卡对照判读）" heightClass="h-[300px]">
          <svg className="h-full w-full" viewBox="0 0 420 240" aria-hidden="true">
            {/* 尿样杯 */}
            <path d="M80 130 L110 130 L104 190 L86 190 Z" fill="#e8f0f4" stroke="#9db8bd" strokeWidth="2.5" />
            <path d="M86 150 L104 150 L101 186 L89 186 Z" fill="#e8d9a0" opacity="0.9" />
            <text x="95" y="208" textAnchor="middle" fontSize="10" fill="#4b6c73" fontWeight="600">
              {SAMPLES[sample].label}
            </text>

            {/* 试纸（浸入后变色） */}
            <g className={dipped ? 'bio-dip' : ''}>
              <rect x="196" y="96" width="26" height="120" rx="4" fill="#f4f0e2" stroke="#b8a86a" strokeWidth="2" />
              <rect x="200" y="160" width="18" height="42" rx="3" fill={color} style={{ transition: 'fill 1.2s ease' }} />
              <text x="209" y="232" textAnchor="middle" fontSize="9.5" fill="#5f7076">
                试纸反应区
              </text>
            </g>

            {/* 比色卡 */}
            <g>
              <rect x="270" y="80" width="120" height="130" rx="8" fill="#fdfcf8" stroke="#b8c4c2" strokeWidth="2" />
              <text x="330" y="102" textAnchor="middle" fontSize="10" fill="#4b6c73" fontWeight="700">
                标准比色卡
              </text>
              {COLOR_SCALE.map((s, i) => {
                const y = 114 + i * 22;
                const isMatch = level === i;
                return (
                  <g key={s.label}>
                    <rect x="286" y={y} width="30" height="16" rx="3" fill={s.color} stroke="#8a9a98" strokeWidth="1" />
                    <text x="324" y={y + 12} fontSize="10" fill="#4b6c73" fontWeight={isMatch ? 800 : 400}>
                      {s.label} · {s.meaning}
                      {isMatch ? ' ←' : ''}
                    </text>
                  </g>
                );
              })}
            </g>
            <text x="210" y="20" textAnchor="middle" fontSize="11" fill={dipped ? '#8a671b' : '#799398'} fontWeight={dipped ? 700 : 400}>
              {dipped && level !== null ? `判读结果：${level === 0 ? '— 无葡萄糖' : COLOR_SCALE[level].label + ' · ' + COLOR_SCALE[level].meaning}` : '选择尿样后将试纸浸入'}
            </text>
          </svg>
        </SceneBox>

        <ObservationNote>
          {dipped && level !== null
            ? `${SAMPLES[sample].label}：试纸呈${COLOR_SCALE[level].label}（${COLOR_SCALE[level].meaning} 葡萄糖）。${SAMPLES[sample].desc}`
            : '选择一份尿样后，把试纸浸入 2 秒取出，与右侧比色卡对照判读。三份样品各测一次。'}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
