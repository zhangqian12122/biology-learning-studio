'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（基因治疗）',
    lines: [
      <>基因治疗：<span className="font-semibold">把正常基因导入患者的细胞</span>，让细胞自己表达出有功能的蛋白质，从而补偿缺陷基因的功能——"授人以鱼不如授人以渔"的治疗思路。</>,
      <>载体常用<span className="font-semibold">改造后的病毒</span>（如逆转录病毒、腺病毒）：保留其感染能力、去掉致病基因，把正常基因"运"进细胞。</>,
      <>与 CRISPR 编辑不同：基因治疗是<span className="font-semibold">添加正常基因补偿</span>（缺陷基因仍在），而非定点修正。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>病例：腺苷脱氨酶（ADA）基因缺陷导致的重症联合免疫缺陷（"气泡男孩"病）。</>,
      <>三步：取患者 T 细胞 → 病毒载体导入正常 ADA 基因 → 回输患者体内表达。</>,
      <>观察点：治疗前后的 ADA 酶活性与免疫功能的对比。</>,
    ],
  },
  {
    title: '方法步骤',
    lines: [
      <>① 取患者 T 细胞体外培养。</>,
      <>② 用改造后的病毒载体把正常 ADA 基因导入 T 细胞。</>,
      <>③ 筛选成功表达 ADA 的细胞回输患者——定期检测免疫功能。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>1990 年的 ADA 基因治疗是<span className="font-semibold">首例人体基因治疗</span>——4 岁女孩治疗后免疫功能显著恢复。</>,
      <>基因治疗分为<span className="font-semibold">体细胞基因治疗</span>（仅治疗患者本人，已被谨慎批准）与<span className="font-semibold">生殖细胞基因治疗</span>（会遗传给后代，伦理红线，被禁止）。</>,
      <>风险：病毒载体可能引起免疫反应或插入突变（有致癌风险）——安全性与有效性需要长期跟踪。</>,
    ],
  },
];

type Stage = 0 | 1 | 2 | 3;

export function GeneTherapyLab() {
  const [stage, setStage] = useState<Stage>(0);

  const step = () => setStage((s) => (Math.min(3, s + 1) as Stage));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0) return '患者 T 细胞缺乏 ADA 酶（腺苷脱氨酶），免疫功能严重受损——这是"重症联合免疫缺陷病"的病因。点「取患者 T 细胞」开始治疗。';
    if (stage === 1) return 'T 细胞已取出体外培养。下一步用改造后的病毒（致病基因已删除）作为"基因快递员"，把正常 ADA 基因送进细胞。';
    if (stage === 2) return '正常 ADA 基因已整合进 T 细胞的染色体——细胞开始表达正常的 ADA 酶，"工厂"复工了。筛选出高表达的细胞准备回输。';
    return '回输完成！表达 ADA 的 T 细胞在患者体内持续工作，免疫功能逐步恢复。基因治疗：把"正确说明书"送回细胞。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= 3}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {stage === 0 ? '① 取患者 T 细胞' : stage === 1 ? '② 病毒载体导入正常基因' : stage === 2 ? '③ 筛选并回输患者' : '治疗完成 ✓'}
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              治疗阶段：<span className="font-bold text-[#13333a]">{stage === 0 ? '准备' : stage === 1 ? '取细胞' : stage === 2 ? '基因导入' : '回输完成'}</span>
              <br />
              载体：<span className="font-bold">改造后病毒</span> · 靶细胞：<span className="font-bold">T 淋巴细胞</span>
            </div>
          </>
        }
      >
        <SceneBox label="ADA 缺陷症的基因治疗流程（首例人体基因治疗，1990）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 患者与 T 细胞 */}
            <g>
              <rect x="20" y="48" width="110" height="90" rx="12" fill="#eaf2f8" stroke="#4d7ea8" strokeWidth="2.4" />
              <text x="75" y="72" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">患者 T 细胞</text>
              {/* 缺陷示意：无 ADA 蛋白 */}
              {[0, 1, 2].map((i) => (
                <circle key={i} cx={48 + i * 28} cy={104} r="11" fill="#e8eef4" stroke="#7a9a9f" strokeWidth="1.8" />
              ))}
              <text x="75" y="130" textAnchor="middle" fontSize="9" fill="#8a4a2a" fontWeight="600">ADA 基因缺陷 ✕</text>
            </g>
            {/* 病毒载体 */}
            <g>
              <rect x="160" y="48" width="120" height="90" rx="12" fill="#f4f0e2" stroke="#b5953a" strokeWidth="2.4" />
              <text x="220" y="72" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">改造病毒载体</text>
              {/* 病毒示意：六边形 + 正常基因 */}
              <path d="M196 106 L 218 92 L 242 106 L 242 122 L 218 134 L 196 122 Z" fill="#d8c9a0" stroke="#8a671b" strokeWidth="2.2" />
              <rect x="206" y="106" width="26" height="10" rx="3" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="1.4" />
              <text x="219" y="115" textAnchor="middle" fontSize="7.5" fill="#2f5a1e" fontWeight="800">正常ADA</text>
              <text x="220" y="152" textAnchor="middle" fontSize="9" fill="#8a671b">致病基因已被删除</text>
            </g>
            {/* 基因导入 */}
            <g>
              <rect x="306" y="48" width="112" height="90" rx="12" fill="#eaf4ea" stroke="#4a8a3a" strokeWidth="2.4" />
              <text x="362" y="72" textAnchor="middle" fontSize="10.5" fill="#2f7a4d" fontWeight="700">基因导入成功</text>
              <circle cx="342" cy="112" r="15" fill="#e8f2ea" stroke="#4a8a3a" strokeWidth="2" />
              <circle cx="342" cy="112" r="6" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="1.6" />
              <path d="M362 112 L 374 112" stroke="#4a8a3a" strokeWidth="2.2" />
              <text x="394" y="116" fontSize="9" fill="#2f5a1e" fontWeight="700">正常基因</text>
              <text x="362" y="146" textAnchor="middle" fontSize="9" fill="#4a7a3a">ADA 酶恢复表达</text>
            </g>
            {/* 回输箭头 */}
            {stage >= 3 ? (
              <g>
                <path d="M330 150 Q 280 200 180 200" fill="none" stroke="#2f7a4d" strokeWidth="3.5" strokeDasharray="8 5" markerEnd="url(#gt-arrow)" />
                <text x="230" y="192" textAnchor="middle" fontSize="10.5" fill="#2f7a4d" fontWeight="700">回输患者体内</text>
                {/* 患者体内好转 */}
                <rect x="90" y="212" width="200" height="30" rx="8" fill="#edf9f1" stroke="#2f7a4d" strokeWidth="2" />
                <text x="190" y="232" textAnchor="middle" fontSize="11" fill="#2f7a4d" fontWeight="800">免疫功能恢复中 · ADA 酶持续表达 ✓</text>
              </g>
            ) : (
              <g>
                <path d="M76 160 Q 120 200 160 190" fill="none" stroke="#8a9a9f" strokeWidth="2" strokeDasharray="6 4" />
                <text x="60" y="196" fontSize="9.5" fill="#9ab0b5">待治疗…</text>
              </g>
            )}
            <defs>
              <marker id="gt-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#2f7a4d" />
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
