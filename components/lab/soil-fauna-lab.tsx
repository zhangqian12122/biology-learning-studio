'use client';

import { useMemo, useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理',
    lines: [
      <>土壤中小动物<span className="font-semibold">活动能力强、身体微小</span>，不适宜用样方法或标志重捕法，常用<span className="font-semibold">取样器取样法</span>采集。</>,
      <>丰富度统计方法：<span className="font-semibold">记名计算法</span>（逐个数，适用于个体较大的种群）和<span className="font-semibold">目测估计法</span>（多/较多/少，适用于个体较小的种群）。</>,
      <>调查指标是<span className="font-semibold">丰富度</span>（群落中物种数目的多少），不是种群密度。</>,
    ],
  },
  {
    title: '材料用具',
    lines: [
      <>用具：取样器（采集罐）、花洒式喷水壶、放大镜、解剖针、吸虫管。</>,
      <>酒精体积分数 70%（固定小动物）。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 在不同深度（表层/中层/深层）用取样器采集土壤样本。</>,
      <>② 用花洒式喷水壶把土壤中的小动物冲入采集罐。</>,
      <>③ 解剖针拨开土壤，吸虫管收集小动物，分类统计。</>,
      <>④ 分别统计表层与深层的类群数与个体数，比较丰富度。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>土壤表层养分与空气多，<span className="font-semibold">表层小动物丰富度通常高于深层</span>。</>,
      <>记名计算法 vs 目测估计法的适用区别是常考点。</>,
      <>该实验的调查指标是<span className="font-semibold">丰富度（物种数）</span>，不是"种群密度"——注意区分。</>,
    ],
  },
];

type Fauna = { name: string; icon: string; deep: boolean };

const FAUNA: Fauna[] = [
  { name: '蚯蚓', icon: '🪱', deep: true },
  { name: '蜈蚣', icon: '🐛', deep: false },
  { name: '螨类', icon: '🕷️', deep: false },
  { name: '跳虫', icon: '🦗', deep: false },
  { name: '线虫', icon: '🪱', deep: true },
];

/** 各层样本：表层与深层类群不同 */
const LAYER_SAMPLES: Record<'surface' | 'middle' | 'deep', Fauna[]> = {
  surface: [FAUNA[1], FAUNA[2], FAUNA[3], FAUNA[1], FAUNA[2], FAUNA[3]],
  middle: [FAUNA[0], FAUNA[2], FAUNA[3], FAUNA[4], FAUNA[2]],
  deep: [FAUNA[0], FAUNA[4], FAUNA[0]],
};

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function SoilFaunaSurveyLab() {
  const [layer, setLayer] = useState<'surface' | 'middle' | 'deep' | null>(null);
  const [sampled, setSampled] = useState(false);

  const sample = layer ? LAYER_SAMPLES[layer] : [];
  const speciesCount = new Set(sample.map((s) => s.name)).size;
  const individualCount = sample.length;

  const observation = (() => {
    if (!layer || !sampled) return '土壤剖面已展示。选择一个深度放置取样器采集土壤样本，统计该层的小动物类群丰富度。';
    const depthName = layer === 'surface' ? '表层' : layer === 'middle' ? '中层' : '深层';
    return `${depthName}样本：共 ${individualCount} 只个体、${speciesCount} 个类群（${[...new Set(sample.map((s) => s.name))].join('、')}）。表层类群数通常多于深层——养分与空气分布差异导致。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择取样深度</p>
              <div className="grid grid-cols-3 gap-1.5">
                <button type="button" onClick={() => { setLayer('surface'); setSampled(false); }} aria-pressed={layer === 'surface'} className={cnChip(layer === 'surface')}>
                  表层
                </button>
                <button type="button" onClick={() => { setLayer('middle'); setSampled(false); }} aria-pressed={layer === 'middle'} className={cnChip(layer === 'middle')}>
                  中层
                </button>
                <button type="button" onClick={() => { setLayer('deep'); setSampled(false); }} aria-pressed={layer === 'deep'} className={cnChip(layer === 'deep')}>
                  深层
                </button>
              </div>
            </div>
            <button
              type="button"
              disabled={!layer || sampled}
              onClick={() => setSampled(true)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              取样器取样并统计
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {sampled ? (
                <>
                  记名计算法统计：
                  <br />
                  {[...new Set(sample.map((s) => s.name))]
                    .map((name) => `${name} ${sample.filter((s) => s.name === name).length} 只`)
                    .join(' · ')}
                </>
              ) : (
                '统计方法：记名计算法（逐个数）/ 目测估计法（多、较多、少）。'
              )}
            </div>
          </>
        }
      >
        <SceneBox label="土壤剖面（左侧）与取样结果（右侧）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 土壤剖面 */}
            <rect x="20" y="40" width="170" height="200" fill="#c9a882" />
            <rect x="20" y="80" width="170" height="60" fill="#b89870" />
            <rect x="20" y="140" width="170" height="100" fill="#a08050" />
            <line x1="20" y1="80" x2="190" y2="80" stroke="#8a6a40" strokeWidth="1.5" />
            <line x1="20" y1="140" x2="190" y2="140" stroke="#8a6a40" strokeWidth="1.5" />
            <text x="105" y="60" textAnchor="middle" fontSize="10" fill="#6a4a20" fontWeight="600">表层（腐殖质多）</text>
            <text x="105" y="115" textAnchor="middle" fontSize="10" fill="#6a4a20" fontWeight="600">中层</text>
            <text x="105" y="180" textAnchor="middle" fontSize="10" fill="#6a4a20" fontWeight="600">深层（养分少）</text>
            <rect x="20" y="240" width="170" height="20" fill="#8a9a6a" />
            <text x="105" y="254" textAnchor="middle" fontSize="9" fill="#4a5a2a">岩石层</text>

            {/* 取样器标记 */}
            {layer ? (
              <g>
                <rect x="150" y={layer === 'surface' ? 44 : layer === 'middle' ? 86 : 146} width="36" height="30" rx="4" fill="#f4d06a" fillOpacity="0.35" stroke="#c99a2e" strokeWidth="3" />
                <text x="168" y={layer === 'surface' ? 40 : layer === 'middle' ? 82 : 142} fontSize="9" fill="#c99a2e" fontWeight="700">
                  ← 取样处
                </text>
              </g>
            ) : null}

            {/* 取样结果（右侧统计板） */}
            <g>
              <rect x="216" y="44" width="204" height="212" rx="8" fill="#fbfcf8" stroke="#c4d6da" strokeWidth="2" />
              <text x="318" y="66" textAnchor="middle" fontSize="10.5" fill="#173b42" fontWeight="700">
                采集结果
              </text>
              {!sampled ? (
                <text x="318" y="150" textAnchor="middle" fontSize="10" fill="#9ab0b5">
                  {layer ? '尚未取样统计' : '先选择取样深度'}
                </text>
              ) : (
                <g>
                  {[...new Set(sample.map((s) => s.name))].map((name, i) => {
                    const count = sample.filter((s) => s.name === name).length;
                    const icon = FAUNA.find((f) => f.name === name)!.icon;
                    return (
                      <g key={name}>
                        <text x="238" y={90 + i * 26} fontSize="16">{icon}</text>
                        <text x="268" y={90 + i * 26} fontSize="10.5" fill="#4b6c73" fontWeight="600">
                          {name} × {count}
                        </text>
                      </g>
                    );
                  })}
                  <line x1="232" y1="212" x2="404" y2="212" stroke="#c4d6da" strokeWidth="1.4" />
                  <text x="318" y="234" textAnchor="middle" fontSize="10.5" fill="#0a626a" fontWeight="700">
                    类群丰富度：{speciesCount} 个物种
                  </text>
                </g>
              )}
            </g>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
