'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '什么是血常规',
    lines: [
      <>血常规是最基础的血液检验：用一张化验单"透视"血液三大家族——<span className="font-semibold">红细胞（携氧）、白细胞（防御）、血小板（凝血）</span>的数量与状态。</>
      ,
      <>红细胞含血红蛋白运输 O₂；白细胞是免疫"卫兵"（中性粒细胞·淋巴细胞等）；血小板负责止血——三者都源自骨髓的造血干细胞。</>
      ,
      <>血细胞寿命有限（红细胞约 120 天），数值的波动往往<span className="font-semibold">直接反映身体的"战况"</span>——是感染的哨兵、贫血的警报。</>
      ,
    ],
  },
  {
    title: '看单三步法',
    lines: [
      <>① 找箭头：比对参考区间，标"↑↓"的指标先看；② 定家族：哪个家族异常（红/白/血小板）；③ 联症状：发热+白细胞↑提示感染；面色苍白+血红蛋白↓提示贫血。</>
      ,
      <>白细胞中的<span className="font-semibold">中性粒细胞比例升高</span>常见于细菌感染；<span className="font-semibold">淋巴细胞比例升高</span>常见于病毒感染。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>贫血的类型：缺<span className="font-semibold">铁</span>（血红蛋白合成不足·最常见）、缺<span className="font-semibold">维生素 B12/叶酸</span>——食补与病因治疗并重。</>
      ,
      <>数值"超标"不等于生病：运动、应激、昼夜节律都会引起波动——<span className="font-semibold">化验单要结合临床表现解读</span>，单看一项不能下结论。</>
      ,
      <>联系课本：骨髓造血干细胞（与骨髓标本互参）、白细胞三道防线中的角色（第二道防线）、血浆是内环境的重要组成。</>
      ,
    ],
  },
];

type Case = 'normal' | 'anemia' | 'infection';

const CASES: Record<Case, { label: string; story: string; rbc: string; hb: string; wbc: string; neu: string; plt: string; flag: string }> = {
  normal: {
    label: '健康体检', story: '18 岁学生·常规体检·无不适',
    rbc: '4.8 ×10¹²/L', hb: '145 g/L', wbc: '6.2 ×10⁹/L', neu: '60%', plt: '220 ×10⁹/L',
    flag: '各项均在参考区间内——血液"三大家族"都在正常值班',
  },
  anemia: {
    label: '面色苍白·乏力', story: '16 岁女生·月经量大·挑食少肉',
    rbc: '3.6 ×10¹²/L ↓', hb: '92 g/L ↓', wbc: '5.8 ×10⁹/L', neu: '62%', plt: '250 ×10⁹/L',
    flag: '红细胞与血红蛋白降低，白细胞血小板正常——典型缺铁性贫血（补铁+调整饮食）',
  },
  infection: {
    label: '发热·咽痛', story: '17 岁男生·高热 39°C·咽部化脓',
    rbc: '4.9 ×10¹²/L', hb: '150 g/L', wbc: '14.5 ×10⁹/L ↑', neu: '85% ↑', plt: '230 ×10⁹/L',
    flag: '白细胞总数升高 + 中性粒细胞比例升高——提示急性细菌感染（如化脓性扁桃体炎）',
  },
};

export function BloodRoutineLab() {
  const [cur, setCur] = useState<Case>('normal');
  const c = CASES[cur];

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择病例</p>
              <div className="grid gap-1.5">
                {(Object.keys(CASES) as Case[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCur(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      cur === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {CASES[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {CASES[id].story}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              解读口诀：<span className="font-semibold">找箭头 → 定家族 → 联症状</span>
            </div>
          </>
        }
      >
        <SceneBox label={`血常规化验单：${c.label}`} heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 化验单表头 */}
            <rect x="40" y="34" width="360" height="196" rx="10" fill="#f8faf6" stroke="#8a9a9f" strokeWidth="2.4" />
            <text x="220" y="60" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">血常规检验报告单</text>
            <text x="380" y="60" textAnchor="end" fontSize="9" fill="#8a9a9f">{c.story}</text>
            <line x1="56" y1="70" x2="384" y2="70" stroke="#c9d4d4" strokeWidth="1.4" />
            {/* 表格行 */}
            {[0, 1, 2, 3, 4].map((i) => {
              const rows = [
                { name: '红细胞 RBC', v: c.rbc, bad: c.rbc.includes('↓') },
                { name: '血红蛋白 Hb', v: c.hb, bad: c.hb.includes('↓') },
                { name: '白细胞 WBC', v: c.wbc, bad: c.wbc.includes('↑') },
                { name: '中性粒细胞%', v: c.neu, bad: c.neu.includes('↑') },
                { name: '血小板 PLT', v: c.plt, bad: c.plt.includes('↓') },
              ];
              const r = rows[i];
              const y = 92 + i * 26;
              return (
                <g key={r.name}>
                  <text x="60" y={y} fontSize="10.5" fill="#37585f" fontWeight="600">{r.name}</text>
                  <text x="240" y={y} fontSize="10.5" fill={r.bad ? '#a53030' : '#2f6f2a'} fontWeight={r.bad ? 800 : 500}>{r.v}</text>
                  {r.bad ? <text x="368" y={y} textAnchor="end" fontSize="11" fill="#a53030" fontWeight="800">↑↓</text> : null}
                  {i < 4 ? <line x1="56" y1={y + 8} x2="384" y2={y + 8} stroke="#e4ece4" strokeWidth="1" /> : null}
                </g>
              );
            })}
            {/* 结论 */}
            <rect x="40" y="238" width="360" height="14" rx="4" fill={cur === 'normal' ? '#e2f0e2' : '#fdf1cf'} />
            <text x="220" y="249" textAnchor="middle" fontSize="9" fill={cur === 'normal' ? '#2f6f2a' : '#8a671b'} fontWeight="700">{c.flag.slice(0, 38)}</text>
          </svg>
        </SceneBox>

        <ObservationNote>{`${c.label}：${c.flag}。${cur === 'anemia' ? '贫血找"红色家族"：红细胞/血红蛋白降低提示携氧不足——最常见的青少年缺铁性贫血，补铁+多吃瘦肉肝脏。' : cur === 'infection' ? '发热找"白色家族"：白细胞总数与中性粒细胞升高提示细菌感染；若是病毒感染，则常见淋巴细胞比例升高。' : '健康状态下三大家族各司其职：红细胞运氧、白细胞防御、血小板止血——数值波动受运动、昼夜节律影响，需结合症状解读。'}`}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
