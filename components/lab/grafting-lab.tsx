'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（嫁接）',
    lines: [
      <>嫁接：<span className="font-semibold">把一种植物的枝或芽（接穗），接到另一种植物（砧木）上</span>，使它们愈合长为一个完整植株——属于<span className="font-semibold">无性生殖</span>。</>
      ,
      <>成活关键是<span className="font-semibold">形成层对齐</span>：砧木与接穗切口两侧的形成层（分生组织）紧贴，分裂产生的新细胞把切口愈合（愈伤组织）。</>
      ,
      <>核心考点：嫁接后结出的果实性状由<span className="font-semibold">接穗决定</span>（保持母本优良性状）；砧木只提供根系，影响抗性、长势与适应力。</>
      ,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 选砧木：选根系发达、抗性强的植株（如耐涝/耐旱/抗病）。</>
      ,
      <>② 削接穗：从优良品种上剪取带 2~3 个芽的枝条，下端削成楔形。</>
      ,
      <>③ 切砧插穗：砧木剪断后从中间劈开，插入接穗——<span className="font-semibold">务必让双方形成层对齐</span>。</>
      ,
      <>④ 绑扎保湿：用塑料条绑紧接口，套袋保湿防失水。</>
      ,
      <>⑤ 养护：遮阴数周，接穗萌芽成活后解除绑扎。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>嫁接属于<span className="font-semibold">营养生殖（无性生殖）</span>：后代遗传物质与接穗相同，<span className="font-semibold">不发生减数分裂与性状分离</span>——比种子繁殖更能保持品种特性。</>
      ,
      <>经典陷阱：接在酸砧木上的甜橙，<span className="font-semibold">结出的果实是甜的</span>——砧木不会改变接穗的遗传性（砧木只"打工"不"改基因"）。</>
      ,
      <>同科植物亲和力高（柑橘接柑橘、月季接月季）；<span className="font-semibold">跨科嫁接一般不亲和</span>——形成层无法愈合。</>
      ,
    ],
  },
];

type Scion = 'sweet' | 'sour';

const SCIONS: Record<Scion, { label: string; note: string; fruitColor: string }> = {
  sweet: { label: '甜橙接穗', note: '果甜·皮薄·丰产', fruitColor: '#e8a03a' },
  sour: { label: '酸橙接穗', note: '果酸·可作药用', fruitColor: '#b5c93a' },
};

const STAGES = 3; // 0 切砧 → 1 接穗插入 → 2 愈合成活

export function GraftingLab() {
  const [scion, setScion] = useState<Scion>('sweet');
  const [stage, setStage] = useState(0);
  const cur = SCIONS[scion];

  const observation = (() => {
    if (stage === 0)
      return '选一株根系发达、耐涝抗病的健壮植株作砧木，在合适高度剪断，从切口中间劈开 3 cm 深的裂缝。注意：砧木将提供全部根系，所以"打基础"的活全归它。';
    if (stage === 1)
      return `把${cur.label}的下端削成楔形，插入砧木裂缝——最关键的一步：让接穗与砧木的${' '}形成层（树皮与木质部之间的分生组织）对齐贴紧，再用塑料条绑紧、套袋保湿。`;
    if (stage === 2)
      return '几周后接口产生愈伤组织，接穗萌芽抽枝——嫁接成活！一年后开花结果。';
    return `果实成熟了：接的是${cur.label}，长出来的就是${cur.note}——${scion === 'sweet' ? '砧木再"酸"也改变不了果实的甜度' : '砧木再健壮也改变不了果实的酸度'}。果实性状由接穗的遗传物质决定——这就是无性生殖"保持母本优良性状"的意义。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择接穗品种</p>
              <div className="grid gap-1.5">
                {(Object.keys(SCIONS) as Scion[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setScion(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      scion === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {SCIONS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {SCIONS[id].note}</span>
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStage((s) => Math.min(STAGES, s + 1))}
              disabled={stage >= STAGES}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              ✂ 推进嫁接（{stage}/{STAGES}）
            </button>
            <button
              type="button"
              onClick={() => setStage(0)}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              重新嫁接
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              成活关键：<span className="font-semibold">形成层对齐</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">果实性状 = 接穗决定</span>
            </div>
          </>
        }
      >
        <SceneBox label="甜橙嫁接实验（步进演示）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 砧木（下方植株） */}
            <g>
              <path d="M220 232 v -70" stroke="#8a6a3a" strokeWidth="12" strokeLinecap="round" />
              <path d="M220 232 q -30 -6 -42 -26 m 42 26 q 30 -6 42 -26" fill="none" stroke="#b88a5a" strokeWidth="4" strokeLinecap="round" />
              <path d="M150 236 h 140" stroke="#c9b88a" strokeWidth="4" />
              <text x="220" y="254" textAnchor="middle" fontSize="10.5" fill="#8a7a4a" fontWeight="600">砧木（根系发达·提供根与干）</text>
            </g>
            {/* 切口/接穗/结果 */}
            {stage === 0 ? (
              <g>
                <path d="M220 162 l -14 -18 m 14 18 l 14 -18" stroke="#5a6a7a" strokeWidth="2.6" strokeLinecap="round" />
                <text x="300" y="140" fontSize="10.5" fill="#5a6a7a" fontWeight="700">砧木剪断并劈开切口</text>
              </g>
            ) : (
              <g>
                {/* 接穗枝条 */}
                <path d="M220 162 q -6 -40 -24 -66 m 24 66 q 12 -42 34 -62" fill="none" stroke="#6a9a3a" strokeWidth="7" strokeLinecap="round" />
                <ellipse cx="192" cy="86" rx="24" ry="12" fill={cur.fruitColor === '#e8a03a' ? '#5a9a4a' : '#8ab84a'} stroke="#2f6f2a" strokeWidth="1.8" />
                <ellipse cx="258" cy="90" rx="24" ry="12" fill={cur.fruitColor === '#e8a03a' ? '#5a9a4a' : '#8ab84a'} stroke="#2f6f2a" strokeWidth="1.8" />
                {/* 接口愈伤 */}
                {stage >= 2 ? (
                  <ellipse cx="220" cy="158" rx="18" ry="10" fill="#e8d8a0" stroke="#8a671b" strokeWidth="2" />
                ) : (
                  <g>
                    <path d="M206 160 h 28" stroke="#e8d8a0" strokeWidth="5" />
                    <text x="316" y="130" fontSize="10" fill="#8a671b" fontWeight="700">绑扎保湿</text>
                  </g>
                )}
                {/* 结果 */}
                {stage === 3 ? (
                  <g>
                    <circle cx="192" cy="72" r="15" fill={cur.fruitColor} stroke="#8a5a1d" strokeWidth="2.2" />
                    <circle cx="258" cy="76" r="15" fill={cur.fruitColor} stroke="#8a5a1d" strokeWidth="2.2" />
                    <text x="350" y="70" fontSize="11" fill="#8a671b" fontWeight="800">
                      {scion === 'sweet' ? '甜橙 ✓' : '酸橙 ✓'}
                    </text>
                    <text x="350" y="90" fontSize="9.5" fill="#a5761d">性状由接穗决定</text>
                  </g>
                ) : null}
                {/* 形成层标注 */}
                {stage >= 1 && stage < 3 ? (
                  <g>
                    <text x="322" y="170" fontSize="10" fill="#2c5a84" fontWeight="700">形成层对齐（关键）</text>
                    <line x1="318" y1="174" x2="236" y2="160" stroke="#2c5a84" strokeWidth="1.2" strokeDasharray="3 3" />
                  </g>
                ) : null}
              </g>
            )}
            {/* 结论条 */}
            {stage === 3 ? (
              <g>
                <rect x="46" y="40" width="220" height="30" rx="8" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2" />
                <text x="156" y="60" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="800">无性生殖：不发生性状分离</text>
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
