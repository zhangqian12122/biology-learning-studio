'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（凝集反应）',
    lines: [
      <>ABO 血型由红细胞表面的<span className="font-semibold">抗原</span>决定：A 型含 A 抗原、B 型含 B 抗原、AB 型含 A 和 B、O 型不含抗原。血浆中则可能存在对应的<span className="font-semibold">抗体</span>：A 型血浆含抗 B、B 型血浆含抗 A、O 型血浆含抗 A 和抗 B、AB 型两种抗体都没有。</>,
      <>若供血者的红细胞抗原遇上受血者血浆中的对应抗体，红细胞会<span className="font-semibold">凝集成团</span>，堵塞血管危及生命——这就是输血必须配血的原因。</>,
    ],
  },
  {
    title: '安全输血原则',
    lines: [
      <>首选<span className="font-semibold">同型输血</span>：A→A、B→B、AB→AB、O→O。</>,
      <>紧急情况下按"少量而缓慢"原则：<span className="font-semibold">O 型</span>红细胞无抗原，可少量输给任何血型；<span className="font-semibold">AB 型</span>血浆无抗体，可少量接受各型血。</>,
      <>本模型不考虑 Rh 等其他血型系统；实际临床输血前必须做交叉配血试验。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 点「随机病人」或直接选定病人血型，读出其红细胞抗原与血浆抗体。</>,
      <>② 选择一种供血血型，观察红细胞是否凝集，模型给出"安全/危险"判定。</>,
      <>③ 把四种病人 × 四种供血全部试一遍，归纳出完整输血相容表。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>判断凝集只需两问：病人<span className="font-semibold">血浆里有哪种抗体</span>？供血者<span className="font-semibold">红细胞上有哪种抗原</span>？相遇即凝集。</>,
      <>"O 型是万能供血者"仅指红细胞少量、缓慢输入的情况——大量快速输 O 型血，其血浆中的抗 A 抗 B 仍会凝集受血者的红细胞。</>,
      <>血缘关系提示：父母与子女之间血型也未必相同（ABO 遗传遵循孟德尔定律，血型基因位于常染色体）。</>,
    ],
  },
];

type BloodType = 'A' | 'B' | 'AB' | 'O';
const TYPES: BloodType[] = ['A', 'B', 'AB', 'O'];

const ANTIGEN: Record<BloodType, string> = { A: 'A 抗原', B: 'B 抗原', AB: 'A + B 抗原', O: '无抗原' };
const ANTIBODY: Record<BloodType, string> = { A: '抗 B 抗体', B: '抗 A 抗体', AB: '无抗体', O: '抗 A + 抗 B 抗体' };

/** 受血者血浆抗体能否凝集供血者红细胞抗原 */
function agglutinate(patient: BloodType, donor: BloodType): boolean {
  const antiA = patient === 'B' || patient === 'O';
  const antiB = patient === 'A' || patient === 'O';
  const donorHasA = donor === 'A' || donor === 'AB';
  const donorHasB = donor === 'B' || donor === 'AB';
  return (antiA && donorHasA) || (antiB && donorHasB);
}

export function BloodTypeLab() {
  const [patient, setPatient] = useState<BloodType>('A');
  const [donor, setDonor] = useState<BloodType | null>(null);
  const [tried, setTried] = useState(0);

  const danger = donor ? agglutinate(patient, donor) : false;
  const sameType = donor === patient;
  const verdict = donor
    ? danger
      ? '凝集反应！血液将结团堵塞血管——禁止这样输血。'
      : sameType
        ? '安全：同型输血，抗原抗体不相遇。'
        : donor === 'O'
          ? '相容：O 型红细胞无抗原，少量缓慢输入一般安全（应急方案）。'
          : '相容：AB 型病人血浆中无抗体，可少量接受各型血液（应急方案）。'
    : '';

  const randomPatient = () => {
    setPatient(TYPES[Math.floor(Math.random() * 4)]);
    setDonor(null);
  };

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">病人血型</p>
              <div className="grid grid-cols-4 gap-1.5">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setPatient(t);
                      setDonor(null);
                    }}
                    className={`min-h-10 rounded-md border px-2 text-xs font-semibold transition-colors ${
                      t === patient
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {t} 型
                  </button>
                ))}
              </div>
              <button type="button" onClick={randomPatient} className="mt-1.5 min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
                🎲 随机病人
              </button>
              <div className="mt-2 rounded-md bg-[#eef7f6] px-3 py-2 text-xs leading-5 text-[#4b6c73]">
                病人红细胞：<span className="font-semibold">{ANTIGEN[patient]}</span>
                <br />
                病人血浆：<span className="font-semibold">{ANTIBODY[patient]}</span>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择供血血型（输血试验）</p>
              <div className="grid grid-cols-4 gap-1.5">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setDonor(t);
                      setTried((n) => n + 1);
                    }}
                    className={`min-h-10 rounded-md border px-2 text-xs font-semibold transition-colors ${
                      t === donor
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {t} 型
                  </button>
                ))}
              </div>
              <div className="mt-2 rounded-md bg-[#eef7f6] px-3 py-2 text-xs leading-5 text-[#4b6c73]">
                已完成 {tried} 次输血试验。目标：为四种病人各找出全部安全供血型。
              </div>
            </div>
          </>
        }
      >
        <SceneBox label={`输血试验：${patient} 型病人 ← ${donor ? donor + ' 型血液' : '（选择供血血型）'}`} heightClass="h-[320px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 病人血浆池 */}
            <rect x="30" y="40" width="180" height="180" rx="20" fill="#fdf0d6" stroke="#d8b878" strokeWidth="2.5" />
            <text x="120" y="66" textAnchor="middle" fontSize="11.5" fill="#a58a4a" fontWeight="700">{patient} 型病人血浆</text>
            {/* 血浆抗体示意 */}
            {(patient === 'A' || patient === 'O'
              ? [['抗 B', 90, 110], ['抗 B', 150, 160]]
              : patient === 'B'
                ? [['抗 A', 90, 110], ['抗 A', 150, 160]]
                : []
            ).map(([label, cx, cy], i) => (
              <g key={`${label}-${i}`} opacity={donor && !danger ? 0.25 : 1}>
                <path d={`M${cx as number - 12} ${cy as number} l10 -8 l10 8 m-10 -8 l0 16`} fill="none" stroke="#4d7ea8" strokeWidth="2.4" />
                <text x={cx as number} y={(cy as number) + 26} textAnchor="middle" fontSize="9" fill="#3d6a94">{label as string}</text>
              </g>
            ))}
            {patient === 'AB' ? <text x="120" y="150" textAnchor="middle" fontSize="10.5" fill="#59767c">血浆中无抗体</text> : null}

            {/* 输血管 */}
            <path d="M214 130 L262 130" stroke={danger ? '#b0483a' : '#2f7a4d'} strokeWidth="5" strokeLinecap="round" />
            <text x="238" y="118" textAnchor="middle" fontSize="10" fill="#59767c">输血</text>

            {/* 供血红细胞 */}
            <rect x="266" y="40" width="150" height="180" rx="20" fill={donor ? (danger ? '#f6d4cc' : '#e8f2ea') : '#f4f6f6'} stroke={donor ? (danger ? '#b0483a' : '#6aa86a') : '#c6d4d4'} strokeWidth="2.5" />
            {donor ? (
              <>
                {/* 相容：红细胞分散；凝集：红细胞成簇 */}
                {danger
                  ? [[300, 84], [312, 96], [296, 104], [330, 82], [306, 118], [322, 110], [386, 88], [374, 106], [396, 122], [366, 130], [298, 156], [340, 148], [374, 160], [314, 176], [358, 178], [392, 176]].map(([cx, cy], i) => (
                      <ellipse key={i} cx={cx} cy={cy} rx="15" ry="10" fill="#d85a4a" stroke="#7a2a1a" strokeWidth="1.6" />
                    ))
                  : [[296, 78], [350, 72], [396, 84], [318, 112], [374, 108], [292, 146], [352, 144], [398, 150], [320, 180], [378, 182]].map(([cx, cy], i) => (
                      <ellipse key={i} cx={cx} cy={cy} rx="13" ry="9" fill="#d85a4a" stroke="#a53a2c" strokeWidth="1.6" />
                    ))}
                <text x="341" y="206" textAnchor="middle" fontSize="10.5" fill={danger ? '#b0483a' : '#2f7a4d'} fontWeight="700">
                  {donor} 型红细胞（{ANTIGEN[donor]}）
                </text>
              </>
            ) : (
              <text x="341" y="120" textAnchor="middle" fontSize="10.5" fill="#9ab0b5">选择供血血型</text>
            )}
            {/* 判定牌 */}
            {donor ? (
              <g>
                <rect x="130" y="216" width="200" height="32" rx="8" fill={danger ? '#fff2ed' : '#edf9f1'} stroke={danger ? '#b0483a' : '#2f7a4d'} strokeWidth="2.2" />
                <text x="230" y="237" textAnchor="middle" fontSize="12.5" fill={danger ? '#b0483a' : '#2f7a4d'} fontWeight="800">
                  {danger ? '✕ 凝集反应 · 危险' : '✓ 无凝集 · 相容'}
                </text>
              </g>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>
          {donor ? (
            <>
              {verdict} 原理：{patient} 型病人血浆中有 <span className="font-semibold">{ANTIBODY[patient]}</span>，而 {donor} 型供血红细胞带有 <span className="font-semibold">{ANTIGEN[donor]}</span>
              {danger ? '，两者相遇即发生凝集。' : '，不会相遇，输血相容。'}
            </>
          ) : (
            <>先看病人血浆里有哪些抗体，再逐个试验供血血型。试试把四种病人 × 四种供血全部试完，找出"万能供血者"与"万能受血者"。</>
          )}
        </ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
