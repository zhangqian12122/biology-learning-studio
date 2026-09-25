'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '项目概况',
    lines: [
      <>人类基因组计划（HGP）：1990 年启动，由美英日法德中六国合作，目标是<span className="font-semibold">测定人类 24 条染色体（22 条常染色体 + X + Y）的全部 DNA 序列</span>，约 30 亿个碱基对。</>
      ,
      <>中国承担 1%（3 号染色体短臂约 3000 万碱基对）——是参与该计划的唯一发展中国家。</>
      ,
      <>2000 年完成工作框架图，2003 年（DNA 双螺旋 50 周年之际）宣布完成图——精度 99.99%。</>
      ,
    ],
  },
  {
    title: '测序技术演进',
    lines: [
      <>① 双脱氧链终止法（桑格法）：用 ddNTP 随机终止链延伸，电泳读序——经典但慢，HGP 主要靠它。</>
      ,
      <>② "霰弹法"：先把基因组打碎成小片段随机测序，再靠计算机拼装（文特尔团队用此法抢跑）。</>
      ,
      <>③ 下一代测序（NGS）：大规模平行测序，成本从 30 亿美元降到千元级——"千元基因组"已成现实。</>
      ,
    ],
  },
  {
    title: '意义与考点',
    lines: [
      <>HGP 与曼哈顿原子弹计划、阿波罗登月并称<span className="font-semibold">三大科学工程</span>——从"读出"到"读懂"，生命科学研究进入组学时代。</>
      ,
      <>重要发现：人类基因只有约 <span className="font-semibold">2~2.5 万个</span>（远少于预期），说明基因的复杂在于调控而非数量。</>
      ,
      <>后基因组时代：HapMap 与千人基因组（人群多样性）、精准医疗（按基因型用药）、致病基因筛查与伦理问题（基因歧视、隐私）。</>
      ,
    ],
  },
];

const STAGES = 3; // 0 启动 → 1 测序攻坚 → 2 完成图 → 3 后基因组

export function HumanGenomeLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '1990 年，人类基因组计划正式启动：目标是用 15 年、30 亿美元"读出"人类的全部遗传密码——24 条染色体、约 30 亿碱基对。中国承担了 1% 的测序任务。这是生命科学的"登月工程"。';
    if (stage === 1)
      return '测序采用桑格法：用双脱氧核苷酸随机终止 DNA 链的延伸，得到长短不一的片段，电泳读出碱基。 fragments 先打成小片"霰弹式"随机测，再靠计算机按重叠序列拼装——30 亿碱基对的超级拼图。';
    if (stage === 2)
      return '2000 年 6 月六国共同宣布工作框架图完成；2003 年 4 月完成图发布（精度 99.99%）。最大意外：人类基因只有约 2 万多个，比水稻多不了多少——生命的复杂更多藏在基因调控里。';
    return '后基因组时代开启：千人基因组计划描绘人群多样性；测序成本从 30 亿美元降到千元级；医生可以按肿瘤的基因突变"对症下药"（精准医疗）。基因隐私与基因歧视也随之成为新的伦理议题。';
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <button
              type="button"
              onClick={step}
              disabled={stage >= STAGES}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
            >
              🧬 推进年代（{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              回到 1990 年
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {['1990 启动 · 六国分工', '桑格法 + 霰弹法测序', '2003 完成图 · 精度 99.99%', '后基因组 · 精准医疗时代'][stage]}
              <br />
              <span className="font-semibold text-[#0e6f75]">三大工程之一 · 约 2.5 万个基因</span>
            </div>
          </>
        }
      >
        <SceneBox label="人类基因组计划（步进演示）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 阶段 0：启动 */}
            {stage === 0 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">1990 启动 · 测定 24 条染色体全部序列</text>
                {/* 染色体核型示意 */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <rect x={70 + i * 24} y={62} width="12" height={52 - i * 4} rx="6" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="1.6" />
                    <rect x={190 + i * 24} y={62} width="12" height={60 - i * 5} rx="6" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="1.6" />
                  </g>
                ))}
                <path d="M326 66 h 10 v 56 h -10 Z" fill="#e8a03a" stroke="#8a671b" strokeWidth="1.8" />
                <path d="M346 66 h 8 v 42 h -8 Z" fill="#e8a03a" stroke="#8a671b" strokeWidth="1.8" />
                <text x="342" y="140" textAnchor="middle" fontSize="9.5" fill="#8a671b" fontWeight="700">X · Y</text>
                <text x="220" y="156" textAnchor="middle" fontSize="10.5" fill="#37585f" fontWeight="600">22 对常染色体 + 2 条性染色体</text>
                {/* 六国 */}
                <text x="220" y="192" textAnchor="middle" fontSize="11" fill="#2c5a84" fontWeight="700">六国合作：美·英·日·法·德·中（中国 1%）</text>
                <text x="220" y="230" textAnchor="middle" fontSize="10.5" fill="#799398">目标：30 亿碱基对 · 15 年 · 30 亿美元</text>
              </g>
            ) : null}
            {/* 阶段 1：测序 */}
            {stage === 1 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">桑格法测序 + 计算机拼装</text>
                {/* 电泳读序 */}
                <rect x="56" y="48" width="150" height="120" rx="8" fill="#f2f0e6" stroke="#b5a582" strokeWidth="2" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <path key={i} d={`M${74 + i * 30} 60 v 100`} stroke={['#a53030', '#3f7f3a', '#2c5a84', '#e8a03a', '#7a4a8a'][i]} strokeWidth="2.4" />
                ))}
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <circle key={`b${i}`} cx={74 + (i % 5) * 30} cy={72 + i * 13} r="4" fill={['#a53030', '#3f7f3a', '#2c5a84', '#e8a03a', '#7a4a8a', '#a53030', '#3f7f3a'][i]} />
                ))}
                <text x="131" y="184" textAnchor="middle" fontSize="10" fill="#37585f" fontWeight="600">按片段长短读出碱基</text>
                <path d="M212 108 h 30 m 0 0 l -7 -5 m 7 5 l -7 5" fill="none" stroke="#5a7a8a" strokeWidth="1.8" />
                {/* 拼装 */}
                {[0, 1, 2].map((i) => (
                  <rect key={`f${i}`} x={248} y={60 + i * 32} width={i === 1 ? 130 : 110} height="18" rx="5" fill={i === 1 ? '#d8e4f0' : '#c9d8e8'} stroke="#4d7ea8" strokeWidth="1.4" />
                ))}
                <text x="318" y="164" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="600">重叠序列 → 计算机拼装</text>
                <text x="220" y="222" textAnchor="middle" fontSize="10.5" fill="#799398">"霰弹法"：先打碎随机测，再拼回 30 亿碱基的"超级拼图"</text>
              </g>
            ) : null}
            {/* 阶段 2：完成图 */}
            {stage === 2 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">2003 完成图 · 精度 99.99%</text>
                <path d="M70 120 q 30 -80 90 -60 l 20 10 M 160 60 q 60 -10 120 10 M 280 70 q 60 20 70 70" fill="none" stroke="#8ab86a" strokeWidth="8" strokeLinecap="round" />
                <path d="M76 128 Q 200 80 344 142" fill="none" stroke="#3f7f3a" strokeWidth="3" strokeDasharray="8 6" />
                <text x="220" y="180" textAnchor="middle" fontSize="11" fill="#2f6f2a" fontWeight="800">基因仅约 2~2.5 万个——远少于预期</text>
                <text x="220" y="204" textAnchor="middle" fontSize="10.5" fill="#4b6c73">复杂性更多来自基因调控，而非基因数量</text>
                <text x="220" y="236" textAnchor="middle" fontSize="10.5" fill="#799398">2003 年恰逢 DNA 双螺旋结构发表 50 周年</text>
              </g>
            ) : null}
            {/* 阶段 3：后基因组 */}
            {stage === 3 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">后基因组时代：从"读出"到"读懂"</text>
                {[0, 1, 2].map((i) => (
                  <g key={i}>
                    <rect x={54 + i * 116} y="58" width="104" height="66" rx="8" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2" />
                    <text x={106 + i * 116} y="82" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">{['千人基因组', '精准医疗', '基因筛查'][i]}</text>
                    <text x={106 + i * 116} y="102" textAnchor="middle" fontSize="8.5" fill="#59767c">{['人群多样性图谱', '按突变选药', '遗传病预警'][i]}</text>
                  </g>
                ))}
                {/* 成本曲线 */}
                <path d="M80 216 Q 200 210 260 160 Q 320 116 386 92" fill="none" stroke="#a53030" strokeWidth="3" />
                <text x="120" y="240" fontSize="10" fill="#a53030" fontWeight="700">测序成本：30 亿美元 → 千元级</text>
                <text x="336" y="110" fontSize="9.5" fill="#799398">比摩尔定律还快</text>
                <text x="220" y="254" textAnchor="middle" fontSize="10.5" fill="#799398">新议题：基因隐私·基因歧视·设计婴儿的伦理边界</text>
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
