'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';

// 原创示例序列：模板链 TAC TTC AAA GGT ATT
const MRNA_BASES = ['A', 'U', 'G', 'A', 'A', 'G', 'U', 'U', 'U', 'C', 'C', 'A', 'U', 'A'];
const AMINO_ACIDS = [
  { name: '甲硫氨酸', color: '#0e797b' },
  { name: '赖氨酸', color: '#5b64c7' },
  { name: '苯丙氨酸', color: '#c25668' },
  { name: '脯氨酸', color: '#c98a1d' },
];
const STAGE_LABELS = ['未开始', '解旋', '转录中', '翻译中', '完成'];

export function CentralDogmaLab() {
  const [stage, setStage] = useState(0);

  const advance = () => setStage((current) => Math.min(current + 1, 4));

  return (
    <ExperimentPane
      controls={
        <>
          <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
            阶段：<span className="font-semibold text-[#0c696f]">{STAGE_LABELS[stage]}</span>
            <br />
            RNA 聚合酶以 DNA 的一条链为模板合成 mRNA（转录），mRNA 再进入核糖体指导多肽链合成（翻译）。
          </div>
          <button
            type="button"
            onClick={advance}
            disabled={stage >= 4}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#0e6f75] px-4 text-sm font-medium text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-45"
          >
            {stage === 0 ? '开始解旋' : stage === 4 ? '已完成' : `下一步：${STAGE_LABELS[stage + 1]}`}
          </button>
          <button
            type="button"
            onClick={() => setStage(0)}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
          >
            重置过程
          </button>
        </>
      }
    >
      <SceneBox label="基因表达过程（示例序列为原创教学用短序列）" heightClass="h-[330px]">
        <div className="absolute inset-0">
          {/* DNA 双链 */}
          <div className="absolute left-[6%] right-[6%] top-[10%] h-[54px]">
            <div className="bio-strand absolute left-0 right-0 top-0 h-3 rounded-full bg-[#2b6f8f]" />
            <div className="bio-strand absolute bottom-0 left-0 right-0 h-3 rounded-full bg-[#2b6f8f]" />
            {MRNA_BASES.map((_, index) => (
              <div
                key={index}
                className="absolute top-1 h-[42px] w-0.5 bg-[#7fa8bd] transition-opacity duration-700"
                style={{
                  left: `${(index / (MRNA_BASES.length - 1)) * 100}%`,
                  opacity: stage >= 1 && index >= 3 && index <= 9 ? 0 : 1,
                }}
              />
            ))}
            <span className="absolute -left-1 -top-6 text-[10px] font-semibold text-[#2b6f8f]">DNA</span>
          </div>

          {/* mRNA：解旋区生长出来（从 5′ 端完整展示读码框） */}
          {stage >= 2 ? (
            <div
              key={`mrna-${stage}`}
              className="bio-mrna absolute left-[6%] top-[36%] flex h-6 items-center gap-0.5 overflow-hidden rounded-full bg-[#c25668] px-2"
            >
              {MRNA_BASES.slice(0, 12).map((base, index) => (
                <span
                  key={index}
                  className={`text-[10px] font-bold text-white ${index % 3 === 0 && index > 0 ? 'ml-1' : ''}`}
                  style={{ animationDelay: `${index * 0.14}s` }}
                >
                  {base}
                </span>
              ))}
            </div>
          ) : null}
          {stage >= 2 ? (
            <span className="absolute left-[6%] top-[46%] text-[10px] text-[#c25668]">mRNA（密码子按 3 个一组读取）</span>
          ) : null}

          {/* 核糖体 + 多肽链 */}
          {stage >= 3 ? (
            <>
              <div className="bio-ribosome absolute left-[30%] top-[52%] flex h-12 w-32 items-start justify-center rounded-b-[40px] rounded-t-lg border-2 border-[#5b64c7] bg-[#dfe3f7]">
                <span className="mt-1 text-[10px] font-semibold text-[#4a5590]">核糖体</span>
              </div>
              <div className="absolute bottom-[16%] left-[32%] flex items-end gap-1.5">
                {AMINO_ACIDS.map((acid, index) => (
                  <div key={acid.name} className="flex flex-col items-center gap-1">
                    <span
                      className="bio-acid inline-block size-6 rounded-full"
                      style={{
                        backgroundColor: acid.color,
                        animationDelay: `${index * 0.5}s`,
                      }}
                    />
                    <span className="max-w-14 text-center text-[9px] leading-3 text-[#46666d]">
                      {acid.name}
                    </span>
                  </div>
                ))}
                <span className="bio-acid ml-1 self-center text-[11px] font-semibold text-[#8a671b]">
                  → 多肽链
                </span>
              </div>
            </>
          ) : null}

          {stage >= 4 ? (
            <p className="absolute bottom-[3%] left-[6%] text-[11px] font-semibold text-[#287248]">
              翻译完成：氨基酸序列 = 甲硫氨酸 - 赖氨酸 - 苯丙氨酸 - 脯氨酸（读到终止密码子 UAA 结束）。
            </p>
          ) : null}
        </div>
      </SceneBox>

      <ObservationNote>
        {stage === 0 && '点击「开始解旋」：RNA 聚合酶结合后，DNA 双链在基因区段局部解开，暴露碱基。'}
        {stage === 1 && '解旋后，游离的核糖核苷酸与模板链互补配对——注意 RNA 中是 U（尿嘧啶）代替 T。点击进入转录。'}
        {stage === 2 && 'mRNA 合成完毕并从 DNA 上释放，经核孔进入细胞质，与核糖体结合。点击进入翻译。'}
        {stage === 3 && '核糖体沿着 mRNA 每次读取 3 个碱基（一个密码子），tRNA 携带对应氨基酸逐一连接成多肽链。'}
        {stage >= 4 &&
          '中心法则：遗传信息从 DNA → mRNA → 蛋白质。密码子（如 AUG = 甲硫氨酸）在所有生物中基本通用。'}
      </ObservationNote>
    </ExperimentPane>
  );
}
