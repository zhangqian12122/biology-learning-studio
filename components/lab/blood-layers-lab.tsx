'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（血液的分层）',
    lines: [
      <>加入<span className="font-semibold">抗凝剂</span>（如柠檬酸钠）的血液离心后分层：上层淡黄色半透明液体为<span className="font-semibold">血浆</span>（约占 55%），下层暗红色为<span className="font-semibold">红细胞</span>（约占 45%），中间薄层白色为<span className="font-semibold">白细胞和血小板</span>。</>,
      <>不加抗凝剂的血液会自然凝固：析出淡黄色<span className="font-semibold">血清</span>（= 血浆去纤维蛋白原）。</>,
      <>血浆运输血细胞并运载养料和废物——是内环境的重要组成部分。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>两支试管：A 加抗凝剂（离心后分层）· B 不加抗凝剂（自然凝固）。</>,
      <>观察点：A 分成三层——血浆/白细胞血小板/红细胞；B 凝固析出血清。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 取两支试管分别加入等量新鲜血液，A 加抗凝剂，B 不加。</>,
      <>② 静置或离心后观察：A 分层、B 凝固析出血清。</>,
      <>③ 结论：血液 = 血浆 + 血细胞（红细胞·白细胞·血小板）。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>血浆 vs 血清：<span className="font-semibold">血浆含纤维蛋白原</span>（可凝血），<span className="font-semibold">血清不含</span>（血液凝固后析出）。</>,
      <>血细胞三层分布从上到下：白细胞和血小板（最轻）→ 红细胞（最重）。</>,
      <>血液的功能：运输（O₂·养料·废物）、防御（白细胞）、止血（血小板）。</>,
    ],
  },
];

type Group = 'A' | 'B';

export function BloodLayersLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(3, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0) return '两支试管刚加入新鲜血液：A 加了抗凝剂，B 不加。静置或离心后观察分层情况。';
    if (stage === 1) return '静置后：A 试管开始分层（上层血浆·下层红细胞），B 试管正在凝固。';
    if (stage === 2) return 'A 试管三层清晰可见（血浆/白细胞血小板/红细胞），B 试管凝固成血块并析出血清。对比说明抗凝剂的作用。';
    return '结论：血液 = 血浆 + 血细胞。血浆运输血细胞；血细胞中的白细胞防御、血小板止血、红细胞运氧——血液是"生命之河"。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button type="button" onClick={step} disabled={stage >= 3} className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40">
              ⏱ 静置/离心（{stage}/3）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新取血
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              A 试管：{stage >= 2 ? '已分层（血浆/白细胞血小板/红细胞）' : '均匀分布'}
              <br />
              B 试管：{stage >= 2 ? '凝固成血块·析出血清' : '未加抗凝剂'}
            </div>
          </>
        }
      >
        <SceneBox label="血液的组成：加抗凝剂 vs 不加抗凝剂" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* A 试管 */}
            <g>
              <text x="100" y="40" textAnchor="middle" fontSize="11.5" fill="#2c5a84" fontWeight="700">A · 加抗凝剂</text>
              <rect x="64" y="50" width="72" height="170" rx="14" fill="#f8f6ee" stroke="#8a9a9f" strokeWidth="3" />
              {/* 血浆（上层） */}
              {stage >= 1 ? <rect x="68" y={54} width="64" height={stage >= 2 ? 60 : 85} rx="8" fill="#f4d06a" stroke="#c9a05a" strokeWidth="1.6" /> : <rect x="68" y="54" width="64" height="160" rx="8" fill="#c94a4a" stroke="#a53030" strokeWidth="1.6" />}
              {/* 白细胞血小板层 */}
              {stage >= 2 ? <rect x="68" y={114} width="64" height="10" fill="#ffffff" stroke="#8a9a9f" strokeWidth="1.2" /> : null}
              {/* 红细胞层 */}
              {stage >= 2 ? <rect x="68" y={124} width="64" height="92" rx="6" fill="#c94a4a" stroke="#a53030" strokeWidth="1.6" /> : null}
              {/* 标注 */}
              {stage >= 2 ? (
                <g>
                  <text x="42" y="70" fontSize="9" fill="#8a671b" fontWeight="600">血浆 55%</text>
                  <line x1="66" y1="66" x2="40" y2="66" stroke="#8a671b" strokeWidth="1.2" />
                  <text x="42" y="124" fontSize="9" fill="#6a8a9a" fontWeight="600">白+血小板</text>
                  <line x1="66" y1="120" x2="40" y2="120" stroke="#6a8a9a" strokeWidth="1.2" />
                  <text x="42" y="160" fontSize="9" fill="#a53030" fontWeight="600">红细胞 45%</text>
                  <line x1="66" y1="156" x2="40" y2="156" stroke="#a53030" strokeWidth="1.2" />
                </g>
              ) : null}
              <text x="100" y="240" textAnchor="middle" fontSize="10" fill="#59767c">
                {stage >= 2 ? '分层清晰' : '均匀（未分层）'}
              </text>
            </g>
            {/* B 试管 */}
            <g>
              <text x="340" y="40" textAnchor="middle" fontSize="11.5" fill="#8a5a1d" fontWeight="700">B · 不加抗凝剂</text>
              <rect x="304" y="50" width="72" height="170" rx="14" fill="#f8f6ee" stroke="#8a9a9f" strokeWidth="3" />
              {stage >= 1 ? (
                <g>
                  {/* 血块（下） */}
                  <rect x="308" y="190" width="64" height="26" rx="4" fill="#a53030" stroke="#8a2020" strokeWidth="1.6" />
                  {/* 血清（上） */}
                  <rect x="308" y={140} width="64" height="50" rx="4" fill="#f4d06a" stroke="#c9a05a" strokeWidth="1.6" />
                  <text x="340" y="230" textAnchor="middle" fontSize="9" fill="#6a3a2a">血块</text>
                  <text x="340" y="162" textAnchor="middle" fontSize="9" fill="#8a671b">血清</text>
                </g>
              ) : (
                <rect x="308" y="54" width="64" height="160" rx="8" fill="#c94a4a" stroke="#a53030" strokeWidth="1.6" />
              )}
              <text x="340" y="240" textAnchor="middle" fontSize="10" fill="#59767c">
                {stage >= 2 ? '凝固 · 析出血清' : '均匀（未凝固）'}
              </text>
            </g>
            {/* 血细胞示意图 */}
            {stage >= 2 ? (
              <g>
                <text x="220" y="52" textAnchor="middle" fontSize="11" fill="#13333a" fontWeight="700">血细胞</text>
                <ellipse cx="180" cy="76" rx="16" ry="10" fill="#d85a4a" stroke="#a53030" strokeWidth="1.8" />
                <text x="180" y="96" textAnchor="middle" fontSize="8.5" fill="#7a3a2a">红细胞</text>
                <circle cx="230" cy="72" r="10" fill="#f4f0e2" stroke="#7a4a8a" strokeWidth="1.8" />
                <path d="M224 66 q 6 -6 12 0 q -6 -4 -12 0" fill="none" stroke="#7a4a8a" strokeWidth="1.4" />
                <text x="230" y="96" textAnchor="middle" fontSize="8.5" fill="#7a4a8a">白细胞</text>
                {[0, 1, 2].map((i) => (
                  <path key={i} d={`M${264 + i * 18} 68 l8 -4 l6 5 l-2 7 l-9 3 l-6 -5 Z`} fill="#e8b878" stroke="#a5761d" strokeWidth="1.4" />
                ))}
                <text x="282" y="96" textAnchor="middle" fontSize="8.5" fill="#a5761d">血小板</text>
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
