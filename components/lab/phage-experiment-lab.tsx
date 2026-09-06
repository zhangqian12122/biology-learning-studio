'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>T2 噬菌体 = <span className="font-semibold">蛋白质外壳 + DNA</span>。分别用 <span className="font-semibold">³⁵S 标记蛋白质</span>、<span className="font-semibold">³²P 标记 DNA</span>，看侵染时"谁进去了"。</>,
      <>搅拌离心把"外壳"与"细菌"分开：<span className="font-semibold">上清液</span>是轻的蛋白质外壳，<span className="font-semibold">沉淀物</span>是重的细菌。</>,
      <>放射性出现在哪，就说明"谁"进了细菌——进去了的那个才是遗传物质。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>两组标记（³⁵S / ³²P）互为对照；每组四步：标记细菌 → 侵染 → 搅拌离心 → 检测放射性。</>,
      <>每组结束后回答"放射性主要在哪里"——两组都答对点亮结论。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 选一组标记，按四步推进，观察噬菌体与细菌的变化。</>,
      <>② 离心后判断：放射性主要在沉淀物还是上清液？</>,
      <>③ 两组都完成后，看结论为什么是"DNA 是遗传物质"。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>为什么选噬菌体？成分只有 DNA 和蛋白质，且侵染时<span className="font-semibold">能自然分开</span>——比"转化的原料不纯"更直接。</>,
      <>³²P 组上清液也有少量放射性：培养时间过短（未注入）或过长（子代释放）——误差分析高频。</>,
      <>结论要完整：DNA 是遗传物质；该实验<span className="font-semibold">不能证明</span>蛋白质不是遗传物质（只是没有进入），更不能证明"DNA 是主要的遗传物质"。</>,
    ],
  },
];

type Group = 's35' | 'p32';
const GROUP_INFO: Record<Group, { label: string; marked: string; radio: string; answer: '沉淀物' | '上清液'; why: string }> = {
  s35: {
    label: '³⁵S 组（标记蛋白质）',
    marked: '用 ³⁵S 标记的培养基培养细菌 → 噬菌体外壳蛋白带上 ³⁵S',
    radio: '³⁵S（蛋白质）',
    answer: '上清液',
    why: '蛋白质外壳没有进入细菌——搅拌离心后留在了上清液中，所以放射性集中在上清液。',
  },
  p32: {
    label: '³²P 组（标记 DNA）',
    marked: '用 ³²P 标记的培养基培养细菌 → 噬菌体 DNA 带上 ³²P',
    radio: '³²P（DNA）',
    answer: '沉淀物',
    why: 'DNA 注入细菌体内——离心后随细菌沉到管底，所以放射性集中在沉淀物。',
  },
};

type Step = { label: string; hint: string };
const STEPS: Step[] = [
  { label: '① 标记细菌', hint: '先让大肠杆菌带上放射性标记' },
  { label: '② 噬菌体侵染', hint: '噬菌体吸附在细菌表面，注入核酸' },
  { label: '③ 搅拌、离心', hint: '搅拌让外壳脱落，离心把轻重分开' },
  { label: '④ 检测放射性', hint: '分别测沉淀物与上清液的放射性' },
];

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function PhageExperimentLab() {
  const [group, setGroup] = useState<Group | null>(null);
  const [stage, setStage] = useState(0);
  const [quiz, setQuiz] = useState<'沉淀物' | '上清液' | null>(null);

  const info = group ? GROUP_INFO[group] : null;
  const quizCorrect = quiz != null && info != null && quiz === info.answer;
  const bothDone = false; // 两组各做各的，完成度由单组判定

  const advance = () => setStage((s) => Math.min(3, s + 1));
  const switchGroup = (g: Group) => {
    setGroup(g);
    setStage(0);
    setQuiz(null);
  };

  const observation = (() => {
    if (!group) return '先选择一组标记（³⁵S 标蛋白质 或 ³²P 标 DNA），再按四步推进侵染过程。';
    if (stage === 0) return `${info!.marked}。开始下一步：让噬菌体去侵染大肠杆菌。`;
    if (stage === 1) return `噬菌体已吸附并"注射"：只有核酸进入细菌，蛋白质外壳留在外面。想想这一步对两组各意味着什么。`;
    if (stage === 2) return '搅拌使外壳与细菌脱离，离心后：轻的外壳在上清液，重的细菌沉在管底。';
    if (quiz == null) return '离心完成！判断：放射性主要出现在沉淀物还是上清液？';
    if (quizCorrect) return `✅ ${info!.why}——进去了的才是遗传物质的"嫌疑人"。`;
    return '选错了。提示：外壳轻在上清液，细菌重在沉淀物；放射性跟着"被标记的成分"走。';
  })();

  const settled = group != null && stage >= 3;

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择标记组（互为对照）</p>
              <div className="grid grid-cols-2 gap-1.5">
                {([['s35', '³⁵S · 蛋白质'], ['p32', '³²P · DNA']] as const).map(([g, label]) => (
                  <button key={g} type="button" onClick={() => switchGroup(g)} aria-pressed={group === g} className={cnChip(group === g)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">实验步骤（{stage}/4）</p>
              <div className="grid gap-1.5">
                {STEPS.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => i === stage && advance()}
                    disabled={group == null || i !== stage}
                    aria-pressed={stage > i}
                    className={`${cnChip(stage > i)} w-full text-left disabled:cursor-not-allowed disabled:opacity-45`}
                  >
                    {s.label}
                    {stage === i ? <span className="ml-1 text-[10px] text-[#0a626a]">← 点击推进</span> : null}
                  </button>
                ))}
              </div>
            </div>
            {settled ? (
              <div>
                <p className="mb-2 text-sm font-medium text-[#37585f]">④ {GROUP_INFO[group!].radio} 主要在哪里？</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['沉淀物', '上清液'] as const).map((v) => {
                    const chosen = quiz === v;
                    const good = v === GROUP_INFO[group!].answer;
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setQuiz(v)}
                        aria-pressed={chosen}
                        className={`min-h-10 rounded-md border px-2 text-xs font-semibold transition-colors ${
                          quiz != null
                            ? good
                              ? 'border-[#9fcab2] bg-[#e7f5ec] text-[#2f7a4d]'
                              : chosen
                                ? 'border-[#e0a3a3] bg-[#fbecea] text-[#b0483a]'
                                : 'border-[#e5eff0] bg-white text-[#8aa1a6]'
                            : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                        }`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => { setGroup(null); setStage(0); setQuiz(null); }}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              重置实验
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              完成进度：{group ? `${GROUP_INFO[group].label} ${quizCorrect ? '✅ 已判定' : '进行中'}` : '未开始'}
              {bothDone ? ' · 🎉' : ''}
            </div>
          </>
        }
      >
        <SceneBox label={`T2 噬菌体侵染大肠杆菌${group ? ` · ${GROUP_INFO[group].label}` : ''}`} heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {stage === 0 ? (
              <g>
                {[110, 210, 310].map((x, i) => (
                  <g key={i}>
                    <ellipse cx={x} cy={190} rx="44" ry="30" fill="#cfe4f0" stroke="#3d7e9e" strokeWidth="3" />
                    <circle cx={x - 12} cy={190} r="5" fill="#3d7e9e" opacity="0.6" />
                  </g>
                ))}
                <text x="210" y="270" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">大肠杆菌{group ? '（已带标记）' : ''}</text>
                <text x="210" y="50" textAnchor="middle" fontSize="13.5" fill="#59767c" fontWeight="600">T2 噬菌体正在靠近…</text>
              </g>
            ) : null}
            {stage >= 1 ? (
              <g>
                {[130, 250].map((x, i) => (
                  <g key={i}>
                    <path d={`M${x - 16} 66 L ${x + 16} 66 L ${x + 10} 96 L ${x - 10} 96 Z`} fill="#b8d4ea" stroke="#3d6a94" strokeWidth="2.5" />
                    <line x1={x - 8} y1="96" x2={x - 8} y2="132" stroke="#3d6a94" strokeWidth="3" />
                    <line x1={x + 8} y1="96" x2={x + 8} y2="132" stroke="#3d6a94" strokeWidth="3" />
                    <line x1={x - 10} y1="132" x2={x - 10} y2="146" stroke="#3d6a94" strokeWidth="2" />
                    <ellipse cx={x} cy={196} rx="46" ry="32" fill="#cfe4f0" stroke="#3d7e9e" strokeWidth="3" />
                  </g>
                ))}
                <text x="210" y="270" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">噬菌体吸附、注入核酸（stage {stage}）</text>
              </g>
            ) : null}
            {stage >= 2 ? (
              <g>
                <rect x="30" y="34" width="120" height="40" rx="8" fill="#fdf1e3" stroke="#c98a1d" strokeWidth="2.5" />
                <text x="90" y="52" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="600">搅拌：外壳脱落</text>
                <text x="90" y="68" textAnchor="middle" fontSize="12" fill="#a58a4a">离心：轻上重下</text>
              </g>
            ) : null}
            {stage >= 3 ? (
              <g transform="translate(290 40)">
                <path d="M20 30 L 40 58 L 40 190 Q 40 204 54 204 L 84 204 Q 98 204 98 190 L 98 58 L 118 30 Z" fill="#f7fbfc" stroke="#5a7a8a" strokeWidth="3" />
                <rect x="46" y="120" width="46" height="78" fill={group === 'p32' ? '#e8c94a' : '#dcebea'} opacity={group ? 0.95 : 0.5} />
                <rect x="46" y="64" width="46" height="48" fill={group === 's35' ? '#e8c94a' : '#dcebea'} opacity={group ? 0.95 : 0.5} />
                <text x="69" y="152" textAnchor="middle" fontSize="12.5" fill="#173b42" fontWeight="700">沉淀物</text>
                <text x="69" y="92" textAnchor="middle" fontSize="12.5" fill="#173b42" fontWeight="700">上清液</text>
                {group ? (
                  <text x="69" y="230" textAnchor="middle" fontSize="13" fill={quizCorrect ? '#2f7a4d' : '#b0483a'} fontWeight="700">
                    放射性：{quizCorrect ? GROUP_INFO[group].radio : quiz ? '选错了' : '？'}
                  </text>
                ) : null}
              </g>
            ) : null}
            {group && quizCorrect ? (
              <text x="220" y="296" textAnchor="middle" fontSize="13.5" fill="#2f7a4d" fontWeight="700">
                {group === 'p32' ? 'DNA 进入了细菌 → DNA 是遗传物质' : '蛋白质外壳留在外面 → 它不是遗传物质载体'}
              </text>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
