'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（直立行走的演化）',
    lines: [
      <>约 400~600 万年前，人类祖先开始<span className="font-semibold">两足直立行走</span>——这是人与猿分界的标志性事件（比脑容量增大早了数百万年）。</>
      ,
      <>直立的"好处"：解放前肢使用工具、视野更高、减少阳光直射面积、长途行走节省能量。</>
      ,
      <>但演化是<span className="font-semibold">修修补补的"裱糊匠"</span>：骨骼结构为四足设计的"底盘"改成直立，必然留下各种"设计缺陷"——演化没有预先设计，只有对现有结构的渐进改造。</>
      ,
    ],
  },
  {
    title: '直立的"代价清单"',
    lines: [
      <>① 腰椎：脊柱从"拱桥"变成"S 形塔"，腰椎承受巨大压力——腰痛是人类的"专属病"。</>
      ,
      <>② 痔疮与静脉曲张：直立使肛门与下肢静脉"逆重力"回流——四足动物几乎不会得这两种病。</>
      ,
      <>③ 难产：骨盆为支撑直立变窄，而人类脑容量却增大——"生育困境"成为自然选择的强大压力。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>演化不是"从低等到高等的完美进步"，而是<span className="font-semibold">适应当时环境的折中方案</span>——直立行走利弊并存就是最好的例证。</>
      ,
      <>证据链：南方古猿（露西）的骨盆与足弓已适应直立，但脑容量仍似猿——直立先于大脑扩容。</>
      ,
      <>其他遗迹：足弓缓冲震动、短而直的趾骨（猿的长趾利于抓握树枝）——结构与功能随环境"改版"。</>
      ,
    ],
  },
];

const STAGES = 3;

export function BipedalCostsLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '对比起点：黑猩猩四足行走，脊柱呈拱桥形，内脏"吊"在腹壁上；人类直立后，脊柱弯成 S 形塔，像叠罗汉一样把头颅、内脏全部"顶"在腰椎上——好处是解放双手，代价是腰椎承压数倍。';
    if (stage === 1)
      return '直立的第二笔账：血液循环要"逆重力"把血液从脚送回心脏——下肢静脉曲张、痔疮这些"人类专属病"，四足动物几乎不会得。足弓应运而生：像弹簧一样缓冲每一步的冲击。';
    if (stage === 2)
      return '最深刻的一笔账：直立使骨盆变窄（利于行走），而脑容量增大使胎头变大——"生育困境"迫使人类婴儿提前出生（"早产"的幼崽），大脑在出生后继续发育——这也是人类婴儿格外"娇弱"、需要长期抚育的原因。';
    return '总结：直立行走是"利弊并存"的演化折中——解放双手制造工具的巨大收益，远超腰痛痔疮的代价。演化的逻辑不是"完美设计"，而是"够用就行"的渐进改造。';
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
              🦴 推进演化（{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              回到四足祖先
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {['四足祖先的"拱桥"脊柱', '直立：S 形脊柱·解放双手', '代价：腰痛·痔疮·静脉曲张', '最深代价：窄骨盆 vs 大脑袋'][Math.min(stage, 3)]}
            </div>
          </>
        }
      >
        <SceneBox label="从四足到直立：演化「裱糊匠」的改造方案" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 阶段 0：四足祖先 */}
            {stage === 0 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">四足祖先：脊柱如"拱桥"</text>
                <path d="M70 140 Q 220 80 370 140" fill="none" stroke="#8a6a3a" strokeWidth="14" strokeLinecap="round" />
                <circle cx="66" cy="142" r="20" fill="#b5764a" stroke="#7a4a2a" strokeWidth="2.4" />
                <path d="M52 128 q 10 -14 26 -8" fill="none" stroke="#7a4a2a" strokeWidth="3" strokeLinecap="round" />
                <path d="M120 148 l 6 44 m 60 4 l 4 42 m 90 -30 l 6 40 m 60 -6 l 8 38" stroke="#8a6a3a" strokeWidth="7" strokeLinecap="round" />
                <text x="220" y="228" textAnchor="middle" fontSize="10.5" fill="#37585f" fontWeight="600">内脏悬挂在腹壁 · 脊柱承压小</text>
              </g>
            ) : null}
            {/* 阶段 1：直立 */}
            {stage === 1 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">直立行走：脊柱变成 S 形"塔"</text>
                <path d="M220 70 q -10 30 10 46 q 16 18 4 44 q -10 26 8 42" fill="none" stroke="#8a6a3a" strokeWidth="13" strokeLinecap="round" />
                <circle cx="212" cy="58" r="22" fill="#b5764a" stroke="#7a4a2a" strokeWidth="2.4" />
                <path d="M210 162 l -18 46 m 20 -46 l 20 44" stroke="#8a6a3a" strokeWidth="9" strokeLinecap="round" />
                <path d="M180 240 h 34 m 30 0 h 34" stroke="#7a4a2a" strokeWidth="7" strokeLinecap="round" />
                <text x="110" y="86" fontSize="10.5" fill="#37585f" fontWeight="600">双手解放 → 制造工具</text>
                <text x="110" y="104" fontSize="10.5" fill="#37585f" fontWeight="600">视野抬高 → 预警天敌</text>
                <text x="330" y="120" fontSize="10.5" fill="#a53030" fontWeight="600">腰椎承压 × 数倍</text>
                <line x1="326" y1="124" x2="232" y2="132" stroke="#a53030" strokeWidth="1.2" strokeDasharray="3 3" />
                <text x="220" y="234" textAnchor="middle" fontSize="10.5" fill="#799398">颈曲·胸曲·腰曲·骶曲——四段缓冲的"弹簧塔"</text>
              </g>
            ) : null}
            {/* 阶段 2：代价 */}
            {stage === 2 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">直立的三笔"账单"</text>
                <rect x="46" y="52" width="108" height="64" rx="8" fill="#f4e0e0" stroke="#a54838" strokeWidth="2" />
                <text x="100" y="76" textAnchor="middle" fontSize="10.5" fill="#8a3a2a" fontWeight="700">腰痛</text>
                <text x="100" y="96" textAnchor="middle" fontSize="9" fill="#a5533c">腰椎长期受压</text>
                <rect x="166" y="52" width="108" height="64" rx="8" fill="#f4e0e0" stroke="#a54838" strokeWidth="2" />
                <text x="220" y="76" textAnchor="middle" fontSize="10.5" fill="#8a3a2a" fontWeight="700">痔疮·静脉曲张</text>
                <text x="220" y="96" textAnchor="middle" fontSize="9" fill="#a5533c">逆重力回血困难</text>
                <rect x="286" y="52" width="108" height="64" rx="8" fill="#f4e0e0" stroke="#a54838" strokeWidth="2" />
                <text x="340" y="76" textAnchor="middle" fontSize="10.5" fill="#8a3a2a" fontWeight="700">足弓劳损</text>
                <text x="340" y="96" textAnchor="middle" fontSize="9" fill="#a5533c">"弹簧"也会疲劳</text>
                <text x="220" y="146" textAnchor="middle" fontSize="10.5" fill="#4b6c73" fontWeight="600">这些"人类专属病"在四足动物中极为罕见</text>
              </g>
            ) : null}
            {/* 阶段 3：难产困境 */}
            {stage === 3 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">生育困境：窄骨盆 vs 大脑袋</text>
                {/* 骨盆环 + 胎头 */}
                <ellipse cx="220" cy="120" rx="70" ry="46" fill="#f0c9b0" stroke="#a5765a" strokeWidth="3" />
                <circle cx="220" cy="124" r="40" fill="#f4d0b8" stroke="#8a5a3a" strokeWidth="2.6" />
                <text x="220" y="129" textAnchor="middle" fontSize="10" fill="#8a5a3a" fontWeight="700">胎头</text>
                <text x="130" y="196" fontSize="10.5" fill="#8a5a3a" fontWeight="600">骨盆变窄（直立行走需要）</text>
                <text x="296" y="196" fontSize="10.5" fill="#8a5a3a" fontWeight="600">脑袋变大（智力需要）</text>
                <rect x="76" y="206" width="288" height="28" rx="8" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2" />
                <text x="220" y="226" textAnchor="middle" fontSize="10" fill="#2f6f2a" fontWeight="700">折中方案：婴儿"早产"出生，脑在出生后继续发育</text>
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
