'use client';

import { useState } from 'react';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <><span className="font-semibold">初生演替</span>：发生在从来没有植被或原有植被被彻底消灭的地方（裸岩、沙丘、火山岩）——过程漫长，依次出现地衣、苔藓、草本、灌木、乔木。</>,
      <><span className="font-semibold">次生演替</span>：原有土壤条件基本保留、甚至还保留种子或繁殖体的地方（弃耕农田、火灾后）——速度明显更快。</>,
      <>演替的方向：物种丰富度升高、群落结构变复杂、土壤层加厚；最终达到与气候相适应的相对稳定状态（顶极群落）。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>演替类型：裸岩初生演替 / 弃耕农田次生演替。</>,
      <>时间滑块：推进演替进程，观察优势种替换与土壤厚度变化。</>,
      <>过度放牧开关：模拟人类活动干扰——演替可能停滞甚至倒退。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 先做"弃耕农田"，把时间推到头，记下经历了几 个阶段。</>,
      <>② 切换"裸岩初生演替"再推一遍，对比两个起点、两条速度。</>,
      <>③ 打开"过度放牧"，看演替停在哪一步——解释为什么。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>初生演替的<span className="font-semibold">先锋植物是地衣</span>：它分泌有机酸腐蚀岩石、形成最初土壤，为苔藓"开路"。</>,
      <>人类活动（砍伐、放牧、治沙）往往使群落演替按照<span className="font-semibold">不同于自然演替的速度和方向</span>进行。</>,
      <>演替不是"越高越好"的无穷过程：顶极群落由气候（温度、降水）决定，如草原气候区演替到草本阶段即相对稳定。</>,
    ],
  },
];

type Mode = 'secondary' | 'primary';

type Stage = { name: string; startYear: number; soil: number; richness: number };

const PRIMARY_STAGES: Stage[] = [
  { name: '裸岩', startYear: 0, soil: 0, richness: 1 },
  { name: '地衣', startYear: 8, soil: 1, richness: 4 },
  { name: '苔藓', startYear: 28, soil: 3, richness: 9 },
  { name: '草本植物', startYear: 50, soil: 8, richness: 18 },
  { name: '灌木', startYear: 74, soil: 14, richness: 26 },
  { name: '乔木林', startYear: 92, soil: 20, richness: 34 },
];

const SECONDARY_STAGES: Stage[] = [
  { name: '弃耕农田', startYear: 0, soil: 6, richness: 5 },
  { name: '杂草丛生', startYear: 12, soil: 9, richness: 14 },
  { name: '灌木', startYear: 34, soil: 14, richness: 24 },
  { name: '乔木林', startYear: 62, soil: 20, richness: 35 },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function SuccessionLab() {
  const [mode, setMode] = useState<Mode>('secondary');
  const [year, setYear] = useState(0);
  const [grazing, setGrazing] = useState(false);

  const stages = mode === 'primary' ? PRIMARY_STAGES : SECONDARY_STAGES;

  // 当前阶段：最后一个 startYear ≤ year 的阶段
  const stageIdx = (() => {
    let idx = 0;
    stages.forEach((s, i) => {
      if (year >= s.startYear) idx = i;
    });
    return idx;
  })();
  // 放牧把演替上限卡住（次生停在杂草、初生停在苔藓）
  const capIdx = mode === 'primary' ? 2 : 1;
  const effIdx = grazing ? Math.min(stageIdx, capIdx) : stageIdx;
  const stage = stages[effIdx];
  const reachedClimax = !grazing && stage.name === '乔木林';

  const switchMode = (m: Mode) => {
    setMode(m);
    setYear(0);
  };

  const observation = (() => {
    if (grazing && stageIdx > capIdx) {
      return `按自然进程这里已是「${stages[stageIdx].name}」，但过度放牧啃食幼苗、踩实土壤，群落被压制在「${stage.name}」——人类活动改变了演替的速度和方向。`;
    }
    if (year === 0) {
      return mode === 'primary'
        ? '裸岩起步：没有土壤、没有种子。谁能第一个"住"进来？推进时间看看。'
        : '弃耕农田：土壤和种子还在，这是次生演替的起点——为什么它比裸岩快？推进时间验证。';
    }
    if (reachedClimax) {
      return `用时 ${year} 年到达「乔木林」顶极群落：土壤厚 ${stage.soil} cm，物种丰富度 ${stage.richness}。此后群落进入相对稳定的动态平衡（不是不再变化）。${mode === 'secondary' ? '对比裸岩演替：起点不同，速度差了一个数量级。' : '对比弃耕农田：初生演替要多花几十年培土。'}`;
    }
    const next = stages[effIdx + 1];
    return `当前阶段「${stage.name}」：优势种替换中，土壤厚 ${stage.soil} cm，丰富度 ${stage.richness}。${next ? `再推进到 ${next.startYear} 年左右进入「${next.name}」。` : ''}`;
  })();

  const soilY = 268 - stage.soil * 2.2;

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">演替类型</p>
              <div className="grid grid-cols-2 gap-1.5">
                <button type="button" onClick={() => switchMode('secondary')} aria-pressed={mode === 'secondary'} className={cnChip(mode === 'secondary')}>
                  弃耕农田（次生）
                </button>
                <button type="button" onClick={() => switchMode('primary')} aria-pressed={mode === 'primary'} className={cnChip(mode === 'primary')}>
                  裸岩（初生）
                </button>
              </div>
            </div>
            <ControlSlider label="演替时间" value={year} unit=" 年" min={0} max={100} step={2} accent="teal" onChange={setYear} />
            <button
              type="button"
              onClick={() => setGrazing((v) => !v)}
              aria-pressed={grazing}
              className={`${cnChip(grazing)} w-full ${grazing ? '' : 'border-[#b0483a] bg-[#f9e2e0] text-[#b0483a]'}`}
            >
              {grazing ? '🐑 过度放牧中（点击停止）' : '⚠ 加入过度放牧'}
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              阶段：<span className="font-bold text-[#0a626a]">{stage.name}</span>
              {grazing ? <span className="text-[#b0483a]">（被放牧压制）</span> : null}
              <br />
              土壤厚度 {stage.soil} cm · 物种丰富度 {stage.richness}
              {grazing ? (
                <>
                  <br />
                  <span className="text-[#b0483a]">丰富度被压到 {stages[capIdx].richness} 左右</span>
                </>
              ) : null}
            </div>
            <button type="button" onClick={() => setYear(0)} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              回到起点
            </button>
          </>
        }
      >
        <SceneBox label="群落演替剖面（上方植物 · 下方土壤）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 天空 */}
            <rect x="12" y="24" width="416" height="150" rx="10" fill="#eaf5f7" />
            {/* 地下：岩石基底 + 土壤层（厚度随演替增加） */}
            <rect x="12" y="174" width="416" height="100" rx="10" fill="#9aa4a8" />
            <rect x="12" y={soilY} width="416" height={274 - soilY} fill="#8a6a48" style={{ transition: 'y 0.35s ease, height 0.35s ease' }} />
            <rect x="12" y="174" width="416" height="100" rx="10" fill="none" stroke="#7a8488" strokeWidth="2" />
            <text x="30" y="286" fontSize="14" fill="#e8ddd0">土壤厚度 {stage.soil} cm</text>

            {/* 植物各阶段示意 */}
            {/* 地衣：岩面扁平斑块 */}
            {effIdx >= 1 ? (
              <g opacity={effIdx >= 2 ? 0.5 : 0.95}>
                {[[70, 176], [130, 178], [260, 176], [340, 178]].map(([x, y], i) => (
                  <ellipse key={i} cx={x} cy={y} rx="16" ry="5" fill="#c9c98a" stroke="#a8a86a" strokeWidth="1.5" />
                ))}
              </g>
            ) : null}
            {/* 苔藓：低矮绿色垫状 */}
            {effIdx >= 2 ? (
              <g opacity={effIdx >= 3 ? 0.5 : 0.95}>
                {[[100, 176], [180, 176], [300, 176]].map(([x, y], i) => (
                  <path key={i} d={`M${x - 22} ${y} q 11 -12 22 0 q 11 -12 22 0`} fill="#7aa86a" stroke="#5a8a4a" strokeWidth="1.5" />
                ))}
              </g>
            ) : null}
            {/* 草本 */}
            {effIdx >= 3 ? (
              <g opacity={effIdx >= 4 ? 0.55 : 0.95}>
                {[[70, 176], [120, 176], [200, 176], [280, 176], [350, 176]].map(([x, y], i) => (
                  <g key={i} stroke="#4a8a3a" strokeWidth="2.5" strokeLinecap="round">
                    <line x1={x} y1={y} x2={x - 6} y2={y - 20} />
                    <line x1={x} y1={y} x2={x} y2={y - 26} />
                    <line x1={x} y1={y} x2={x + 6} y2={y - 19} />
                  </g>
                ))}
              </g>
            ) : null}
            {/* 灌木 */}
            {effIdx >= 4 ? (
              <g opacity={effIdx >= 5 ? 0.55 : 0.95}>
                {[[120, 176], [300, 176]].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x - 10} cy={y - 16} r="13" fill="#5a9a4a" stroke="#3f7f3a" strokeWidth="2" />
                    <circle cx={x + 10} cy={y - 14} r="11" fill="#6aaa55" stroke="#3f7f3a" strokeWidth="2" />
                    <circle cx={x} cy={y - 26} r="12" fill="#5f9f4f" stroke="#3f7f3a" strokeWidth="2" />
                  </g>
                ))}
              </g>
            ) : null}
            {/* 乔木 */}
            {effIdx >= 5 ? (
              <g>
                {[[80, 176], [230, 176], [370, 176]].map(([x, y], i) => (
                  <g key={i}>
                    <rect x={x - 4} y={y - 40} width="8" height="40" fill="#8a6a48" />
                    <circle cx={x} cy={y - 56} r="22" fill="#4a8a3a" stroke="#356a2a" strokeWidth="2" />
                    <circle cx={x - 15} cy={y - 44} r="14" fill="#559a42" stroke="#356a2a" strokeWidth="2" />
                    <circle cx={x + 15} cy={y - 44} r="14" fill="#559a42" stroke="#356a2a" strokeWidth="2" />
                  </g>
                ))}
              </g>
            ) : null}

            {/* 阶段名 + 丰富度 */}
            <text x="24" y="48" fontSize="17" fill="#173b42" fontWeight="700">{stage.name}{grazing ? '（放牧压制中）' : ''}</text>
            {/* 丰富度小刻度尺 */}
            <g transform="translate(322 40)">
              <text x="0" y="0" fontSize="13" fill="#4b6c73">物种丰富度</text>
              <rect x="0" y="8" width="100" height="10" rx="5" fill="#dcebea" />
              <rect x="0" y="8" width={Math.max(5, (stage.richness / 36) * 100)} height="10" rx="5" fill="#0e6f75" style={{ transition: 'width 0.35s ease' }} />
            </g>
            {reachedClimax ? <text x="24" y="70" fontSize="15" fill="#2f7a4d" fontWeight="700">🌱 已达顶极群落（相对稳定）</text> : null}
            {grazing ? <text x="24" y="70" fontSize="15" fill="#b0483a" fontWeight="700">羊群啃食幼苗 → 演替停滞</text> : null}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
