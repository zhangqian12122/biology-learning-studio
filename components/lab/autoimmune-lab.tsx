'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（自身免疫病）',
    lines: [
      <>免疫细胞靠"身份检查"区分敌我：几乎所有细胞表面都有<span className="font-semibold">MHC（主要组织相容性复合体）标签</span>，免疫细胞只攻击"无标签或外来标签"的目标。</>
      ,
      <>当"免疫耐受"被打破，免疫细胞与抗体<span className="font-semibold">错误攻击自身正常组织</span>——这就是自身免疫病，相当于免疫系统"友军误伤"。</>
      ,
      <>代表疾病：<span className="font-semibold">类风湿关节炎</span>（攻击关节滑膜）、<span className="font-semibold">1 型糖尿病</span>（攻击胰岛 β 细胞）、<span className="font-semibold">桥本甲状腺炎</span>（攻击甲状腺）。</>
      ,
    ],
  },
  {
    title: '为什么会出现"误伤"？',
    lines: [
      <>① 隐蔽抗原释放：晶状体蛋白、精子等平时不与免疫细胞接触，外伤后进入血液，被当作"外来者"围攻。</>
      ,
      <>② 分子模拟：链球菌表面结构与心脏瓣膜组织相似——抗体打病原时"殃及无辜"（风湿性心脏病由此而来）。</>
      ,
      <>③ 胸腺"教育"失败：自身反应性 T 细胞本应在胸腺中被清除，个别逃逸者在外周兴风作浪。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>三种免疫失调对比：<span className="font-semibold">过敏</span>（打无害的外来者）、<span className="font-semibold">自身免疫病</span>（打自己）、<span className="font-semibold">免疫缺陷病</span>（打不动敌人，如艾滋病）。</>
      ,
      <>治疗用<span className="font-semibold">免疫抑制剂</span>（糖皮质激素等），与器官移植抗排斥用药同源——都需权衡"压制免疫"与"感染风险"。</>
      ,
      <>自身免疫病多为慢性病、难以根治，只能"管理"：这正是内环境稳态调节"过犹不及"的最好例证。</>
      ,
    ],
  },
];

type Organ = 'thyroid' | 'joint' | 'pancreas';

const ORGANS: Record<Organ, { label: string; disease: string; note: string }> = {
  thyroid: { label: '甲状腺滤泡', disease: '桥本甲状腺炎', note: '抗体攻击甲状腺 → 甲状腺功能减退' },
  joint: { label: '关节滑膜', disease: '类风湿关节炎', note: '滑膜炎症 → 关节肿痛·晨僵·变形' },
  pancreas: { label: '胰岛 β 细胞', disease: '1 型糖尿病', note: 'β 细胞被毁 → 胰岛素绝对缺乏' },
};

export function AutoimmuneLab() {
  const [organ, setOrgan] = useState<Organ>('joint');
  const [vigilance, setVigilance] = useState(50);

  const kill = Math.round(Math.max(8, Math.min(100, 30 + vigilance * 1.3)));
  const damage = vigilance <= 65 ? 0 : Math.round(((vigilance - 65) / 35) * 100);
  const status =
    vigilance < 35
      ? { text: '警戒不足 · 偏向免疫缺陷', color: '#8a671b' }
      : vigilance <= 65
        ? { text: '稳态 · 精准识别敌我', color: '#2f6f2a' }
        : { text: '敌我不分 · 自身免疫攻击', color: '#a53030' };

  const info = ORGANS[organ];

  const observation = (() => {
    if (vigilance < 35)
      return `警戒度 ${vigilance}：病原清除率仅 ${kill}%——免疫系统"打不动敌人"，这是免疫缺陷方向（艾滋病病毒破坏 T 细胞后就是类似局面）。`;
    if (vigilance <= 65)
      return `警戒度 ${vigilance}：病原清除率 ${kill}%，自身组织零损伤——免疫耐受完好的理想状态：认清"自己"与"非己"，稳态得以维持。`;
    return `警戒度 ${vigilance}：免疫细胞开始围攻自身的${info.label}（损伤率 ${damage}%）——${info.disease}就此发生：${info.note}。`;
  })();

  const arrowY = [96, 128, 160];
  const pathogenArrows = vigilance >= 20 ? Math.min(3, Math.round(vigilance / 34) + 1) : 0;
  const selfArrows = vigilance > 85 ? 3 : vigilance > 65 ? 2 : 0;

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">选择被误伤的靶器官</p>
              <div className="grid gap-1.5">
                {(Object.keys(ORGANS) as Organ[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setOrgan(id)}
                    className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      organ === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {ORGANS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {ORGANS[id].disease}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-[#d9e7e7] bg-white px-3 py-2.5">
              <label htmlFor="vigilance" className="text-xs font-semibold text-[#37585f]">
                免疫警戒度：<span className="text-base font-bold text-[#0e6f75]">{vigilance}</span>
              </label>
              <input
                id="vigilance"
                type="range"
                min={0}
                max={100}
                value={vigilance}
                onChange={(e) => setVigilance(Number(e.target.value))}
                className="mt-2 w-full accent-[#0e6f75]"
              />
              <p className="mt-1 text-[10.5px] leading-4 text-[#799398]">模拟"免疫耐受"松紧：过低漏杀病原，过高误伤自身。</p>
            </div>
            <button
              type="button"
              onClick={() => setVigilance(50)}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              恢复正常警戒（50）
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              病原清除率：<span className="text-base font-bold text-[#0a626a]">{kill}%</span>
              <br />
              自身组织损伤率：<span className="text-base font-bold" style={{ color: damage > 0 ? '#a53030' : '#2f6f2a' }}>{damage}%</span>
            </div>
          </>
        }
      >
        <SceneBox label="免疫「身份检查」与误伤模拟" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 左：病原区 */}
            <rect x="22" y="66" width="112" height="150" rx="12" fill="#eef7ee" stroke="#7aa87a" strokeWidth="1.6" strokeDasharray="5 4" />
            <text x="78" y="86" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="700">外来病原</text>
            {[0, 1, 2].map((i) => (
              <g key={i} opacity={pathogenArrows > i ? 1 : 0.3}>
                <ellipse cx={78} cy={116 + i * 38} rx="26" ry="12" fill="#8fbf6a" stroke="#4a7a3a" strokeWidth="1.8" />
                {[0, 1, 2, 3].map((j) => (
                  <circle key={j} cx={62 + j * 11} cy={112 + i * 38} r="2" fill="#4a7a3a" />
                ))}
              </g>
            ))}
            {/* 中：免疫细胞 */}
            <rect x="158" y="66" width="118" height="150" rx="12" fill="#f4f0fb" stroke="#9a86c9" strokeWidth="1.6" strokeDasharray="5 4" />
            <text x="217" y="86" textAnchor="middle" fontSize="12" fill="#5a4390" fontWeight="700">效应细胞巡逻</text>
            {[0, 1].map((i) => (
              <g key={i}>
                <circle cx={192 + i * 52} cy={140} r="21" fill="#c9b8ea" stroke="#6a4fa0" strokeWidth="2.2" />
                <circle cx={186 + i * 52} cy={134} r="3.4" fill="#3a2a60" />
                <path d={`M${182 + i * 52} 148 l 7 8 l 7 -8`} fill="none" stroke="#6a4fa0" strokeWidth="2" strokeLinecap="round" />
                <text x={192 + i * 52} y={176} textAnchor="middle" fontSize="10.5" fill="#5a4390">{i === 0 ? 'T 细胞' : 'B 抗体'}</text>
              </g>
            ))}
            {/* 攻击箭头：免疫 → 病原 */}
            {Array.from({ length: pathogenArrows }).map((_, i) => (
              <g key={`p${i}`}>
                <line x1="136" y1={arrowY[i]} x2="158" y2={arrowY[i]} stroke="#2f6f2a" strokeWidth="2.4" markerEnd="url(#arrowGreen)" />
              </g>
            ))}
            {/* 攻击箭头：免疫 → 自身（误伤） */}
            {Array.from({ length: selfArrows }).map((_, i) => (
              <line key={`s${i}`} x1="280" y1={arrowY[i]} x2="302" y2={arrowY[i]} stroke="#a53030" strokeWidth="2.6" strokeDasharray="4 3" markerEnd="url(#arrowRed)" />
            ))}
            {/* 右：自身组织区 */}
            <rect x="306" y="66" width="112" height="150" rx="12" fill="#fdf1f1" stroke="#c98a8a" strokeWidth="1.6" strokeDasharray="5 4" />
            <text x="362" y="86" textAnchor="middle" fontSize="12" fill="#a53030" fontWeight="700">{info.label}（自己）</text>
            {organ === 'thyroid' && [0, 1, 2].map((i) => (
              <g key={i}>
                <circle cx={336 + (i % 2) * 52} cy={126 + Math.floor(i / 2) * 52} r="19" fill="#f2c9c9" stroke="#b06a6a" strokeWidth="1.8" />
                <circle cx={336 + (i % 2) * 52} cy={126 + Math.floor(i / 2) * 52} r="8" fill="#e8a0a0" />
              </g>
            ))}
            {organ === 'joint' && (
              <g>
                <rect x="324" y="110" width="78" height="26" rx="9" fill="#f5f2ea" stroke="#8a7a5a" strokeWidth="2" />
                <rect x="324" y="152" width="78" height="26" rx="9" fill="#f5f2ea" stroke="#8a7a5a" strokeWidth="2" />
                <rect x="324" y="138" width="78" height="13" fill="#f5d78a" opacity={damage > 0 ? 0.95 : 0.5} />
                <text x="362" y={196} textAnchor="middle" fontSize="10.5" fill="#a53030">关节腔与滑膜</text>
              </g>
            )}
            {organ === 'pancreas' && [0, 1, 2, 3, 4, 5].map((i) => (
              <circle key={i} cx={330 + (i % 3) * 30} cy={122 + Math.floor(i / 3) * 40} r="11" fill={damage > 0 ? '#d9a0a0' : '#e8c9a0'} stroke="#a5765a" strokeWidth="1.6" />
            ))}
            {damage > 0 && (
              <text x="362" y="206" textAnchor="middle" fontSize="11.5" fill="#a53030" fontWeight="700">损伤中！</text>
            )}
            {/* 指标条 */}
            <text x="30" y="252" fontSize="11.5" fill="#4b6c73" fontWeight="600">病原清除率</text>
            <rect x="128" y="240" width="240" height="16" rx="8" fill="#e5efef" stroke="#a5c4c4" strokeWidth="1.4" />
            <rect x="130" y="242" width={Math.round((kill / 100) * 236)} height="12" rx="6" fill="#0e8a75" />
            <text x="376" y="253" fontSize="11.5" fill="#0e8a75" fontWeight="700">{kill}%</text>
            <text x="30" y="282" fontSize="11.5" fill="#4b6c73" fontWeight="600">自身损伤率</text>
            <rect x="128" y="270" width="240" height="16" rx="8" fill="#f5e9e9" stroke="#c9a5a5" strokeWidth="1.4" />
            {damage > 0 && <rect x="130" y="272" width={Math.round((damage / 100) * 236)} height="12" rx="6" fill="#a53030" />}
            <text x="376" y="283" fontSize="11.5" fill={damage > 0 ? '#a53030' : '#799398'} fontWeight="700">{damage}%</text>
            <text x="16" y="30" fontSize="13" fill={status.color} fontWeight="800">{status.text}</text>
            <text x="424" y="30" textAnchor="end" fontSize="10.5" fill="#799398">{info.disease} · {info.note}</text>
            <defs>
              <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 Z" fill="#2f6f2a" />
              </marker>
              <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 Z" fill="#a53030" />
              </marker>
            </defs>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
