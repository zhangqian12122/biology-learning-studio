'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '科学史脉络',
    lines: [
      <>光合作用的发现是一段跨越两百多年的接力：每一代科学家都<span className="font-semibold">在前人结论上补上一块拼图</span>——原料、条件、产物、元素去向逐一被揭开。</>,
      <>科学方法也在进化：从定性观察（蜡烛复燃）到定量实验（天平称重），再到<span className="font-semibold">同位素标记</span>（¹⁸O、¹⁴C）追踪元素去向。</>,
    ],
  },
  {
    title: '六个关键节点',
    lines: [
      <>① 1642 年海尔蒙特：柳树增重 74 kg 而土壤只减少不到 0.1 kg——植物增重来自水（没有意识到 CO₂ 的贡献）。</>,
      <>② 1771 年普利斯特利：蜡烛+植物密封不熄、小鼠+植物活得更久——植物能"净化"空气。</>,
      <>③ 1779 年英格豪斯：只有<span className="font-semibold">光照下</span>植物才能更新空气——补上"光"这个条件。</>,
      <>④ 1864 年萨克斯：叶片半遮光，碘蒸气检验只有见光部分变蓝——产物是淀粉、条件是光。</>,
      <>⑤ 1941 年鲁宾和卡门：同位素¹⁸O 标记证明氧气中的氧来自<span className="font-semibold">水的光解</span>，不是 CO₂。</>,
      <>⑥ 1940s 卡尔文：¹⁴C 标记 CO₂ 追踪碳的去路，揭示暗反应（卡尔文循环）——CO₂ → 三碳化合物 → 糖类。</>,
    ],
  },
  {
    title: '考点提炼',
    lines: [
      <>萨克斯实验的三个巧思：<span className="font-semibold">饥饿处理</span>（消耗掉原有淀粉）、<span className="font-semibold">半叶遮光</span>（自身对照）、<span className="font-semibold">碘蒸气检测</span>。</>,
      <>鲁宾卡门用<span className="font-semibold">同位素标记法</span>分两组：H₂¹⁸O + CO₂ → 释放¹⁸O₂；H₂O + C¹⁸O₂ → 释放 O₂——结论：O₂ 来自水。</>,
      <>普利斯特利实验有时失败，是因为没有控制<span className="font-semibold">光照</span>条件——英格豪斯的发现解释了这一点。</>,
    ],
  },
];

const STAGES = 5; // 0 海尔蒙特 → 1 普利斯特利 → 2 英格豪斯 → 3 萨克斯 → 4 鲁宾卡门/卡尔文

export function PhotosynthesisHistoryLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '1642 年，比利时的海尔蒙特把一棵 2.3 kg 的柳树栽进 90 kg 土壤，只用雨水浇灌 5 年：柳树长到 76 kg，土壤只轻了 57 g。他的结论是"植物的物质来自水"——方向对了，但他不知道空气里还有 CO₂ 参与建造身体。';
    if (stage === 1)
      return '1771 年，英国的普利斯特利发现：密封钟罩里点燃的蜡烛很快熄灭、小鼠很快窒息；但罩里放一株薄荷，蜡烛能烧更久、小鼠能活更久——"植物能更新污浊的空气"。不过他的实验时灵时不灵，问题出在哪？';
    if (stage === 2)
      return '1779 年，荷兰的英格豪斯揭开了谜底：植物只有在光照下才能更新空气，黑暗中植物和动物一样"污染"空气（只进行呼吸作用）。普利斯特利的失败次数，正是阴天和夜里做的实验。到此，光合作用需要"光"被补上了。';
    if (stage === 3)
      return '1864 年，德国的萨克斯做了教科书级的设计：先把叶片饥饿处理消耗掉原有淀粉，再半叶遮光照光数小时，碘蒸气检验——见光半叶变蓝（产生淀粉）、遮光半叶不变色。产物是淀粉、条件是光，一次实验同时证明两件事。';
    return '20 世纪进入原子时代：1941 年鲁宾和卡门用¹⁸O 分别标记水和 CO₂，证明释放的 O₂ 全部来自水的光解；卡尔文用¹⁴C 标记 CO₂，追踪出 CO₂ → 三碳化合物 → 糖类的暗反应路径（卡尔文循环）。光合作用的"账本"终于算清。';
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
              ⏭ 推进年代（{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              回到 1642 年
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {['1642 海尔蒙特 · 柳树', '1771 普利斯特利 · 蜡烛', '1779 英格豪斯 · 补光条件', '1864 萨克斯 · 碘检淀粉', '1941 同位素标记时代'][stage]}
              <br />
              <span className="font-semibold text-[#0e6f75]">拼图式科学：结论逐代累积修正</span>
            </div>
          </>
        }
      >
        <SceneBox label="光合作用发现史（步进演示）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 阶段 0：海尔蒙特柳树 */}
            {stage === 0 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">1642 · 海尔蒙特的柳树实验（5 年只用浇雨水）</text>
                <path d="M120 208 v -78 m 0 0 q -18 -18 -34 -20 m 34 20 q 4 -26 24 -36 m -24 36 q -10 -10 -6 -26" fill="none" stroke="#3f7f3a" strokeWidth="5" strokeLinecap="round" />
                <circle cx="86" cy="108" r="16" fill="#6aa85a" />
                <circle cx="146" cy="82" r="18" fill="#6aa85a" />
                <circle cx="118" cy="60" r="20" fill="#7ab86a" />
                <path d="M96 208 h 48 l -6 22 h -36 Z" fill="#8a6a3a" stroke="#5a4a2a" strokeWidth="2" />
                <rect x="70" y="230" width="100" height="14" rx="4" fill="#c9b88a" stroke="#8a7a4a" strokeWidth="1.8" />
                <text x="120" y="176" textAnchor="middle" fontSize="10" fill="#37585f" fontWeight="700">2.3 kg → 76 kg</text>
                {/* 天平 */}
                <path d="M330 60 v 40 m -40 40 h 80 m -80 0 l -10 22 m 90 -22 l 10 22" fill="none" stroke="#5a6a7a" strokeWidth="2.4" />
                <rect x="276" y="94" width="48" height="12" rx="3" fill="#c9b88a" />
                <rect x="336" y="94" width="48" height="12" rx="3" fill="#8a9a8a" />
                <text x="300" y="124" textAnchor="middle" fontSize="9.5" fill="#4b6c73">土 -57 g</text>
                <text x="360" y="124" textAnchor="middle" fontSize="9.5" fill="#4b6c73">树 +74 kg</text>
                <text x="300" y="176" textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="700">结论：植物增重来自水</text>
                <text x="300" y="196" textAnchor="middle" fontSize="9.5" fill="#799398">（忽略了空气中的 CO₂）</text>
              </g>
            ) : null}
            {/* 阶段 1：普利斯特利 */}
            {stage === 1 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">1771 · 普利斯特利：植物能"净化"空气</text>
                {/* 钟罩1 蜡烛 */}
                <path d="M100 108 q -30 0 -30 -30 q 0 -34 40 -34 q 40 0 40 34 q 0 30 -30 30 Z" fill="#dceaea" stroke="#5a7a8a" strokeWidth="2.4" opacity="0.75" />
                <rect x="96" y="120" width="28" height="16" rx="3" fill="#c9b88a" stroke="#8a7a4a" strokeWidth="1.6" />
                <rect x="106" y="96" width="8" height="26" rx="3" fill="#f4d06a" stroke="#c9a05a" strokeWidth="1.4" />
                <path d="M110 88 q 5 -8 0 -14 q -5 6 0 14" fill="#e88a2a" />
                <text x="120" y="160" textAnchor="middle" fontSize="10" fill="#37585f" fontWeight="600">蜡烛不熄</text>
                {/* 钟罩2 小鼠 */}
                <path d="M300 108 q -30 0 -30 -30 q 0 -34 40 -34 q 40 0 40 34 q 0 30 -30 30 Z" fill="#dceaea" stroke="#5a7a8a" strokeWidth="2.4" opacity="0.75" />
                <ellipse cx="310" cy="94" rx="20" ry="13" fill="#d8d8d8" stroke="#8a8a8a" strokeWidth="1.8" />
                <circle cx="326" cy="88" r="6" fill="#d8d8d8" stroke="#8a8a8a" strokeWidth="1.4" />
                <path d="M290 96 q -8 2 -10 8" fill="none" stroke="#8a8a8a" strokeWidth="1.6" />
                <text x="310" y="160" textAnchor="middle" fontSize="10" fill="#37585f" fontWeight="600">小鼠存活更久</text>
                <path d="M180 108 h 60 m 0 0 l -8 -5 m 8 5 l -8 5" fill="none" stroke="#5a7a8a" strokeWidth="1.8" />
                <rect x="186" y="120" width="48" height="24" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2" />
                <path d="M210 140 v -14 m 0 0 q -8 -6 -10 -14 m 10 14 q 8 -6 10 -14" fill="none" stroke="#3f7f3a" strokeWidth="2.4" />
                <text x="220" y="200" textAnchor="middle" fontSize="11" fill="#2f6f2a" fontWeight="700">薄荷草在罩内 → 空气被"更新"</text>
                <text x="220" y="228" textAnchor="middle" fontSize="10.5" fill="#799398">谜团：为什么有时灵有时不灵？</text>
              </g>
            ) : null}
            {/* 阶段 2：英格豪斯 */}
            {stage === 2 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">1779 · 英格豪斯：必须要有光</text>
                {/* 光照组 */}
                <circle cx="120" cy="70" r="22" fill="#f4d06a" stroke="#c9a05a" strokeWidth="2.4" />
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                  const ang = (i * Math.PI) / 4;
                  return <line key={i} x1={120 + Math.cos(ang) * 26} y1={70 + Math.sin(ang) * 26} x2={120 + Math.cos(ang) * 34} y2={70 + Math.sin(ang) * 34} stroke="#c9a05a" strokeWidth="2.2" strokeLinecap="round" />;
                })}
                <path d="M120 88 l 0 30" stroke="#e8b83a" strokeWidth="2.4" strokeDasharray="5 4" />
                <path d="M90 176 q 30 -22 60 0 q -8 14 -30 14 q -22 0 -30 -14 Z" fill="#6aa85a" stroke="#3f7f3a" strokeWidth="2" />
                <text x="120" y="216" textAnchor="middle" fontSize="10.5" fill="#2f6f2a" fontWeight="700">光照下 ✓ 更新空气</text>
                {/* 黑暗组 */}
                <rect x="266" y="58" width="120" height="60" rx="8" fill="#3a4a5a" stroke="#2a3a4a" strokeWidth="2.4" />
                <text x="326" y="94" textAnchor="middle" fontSize="11" fill="#8a9a9f" fontWeight="700">黑暗</text>
                <path d="M326 118 l 0 30" stroke="#5a6a7a" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M296 176 q 30 -22 60 0 q -8 14 -30 14 q -22 0 -30 -14 Z" fill="#5a8a4a" stroke="#3f7f3a" strokeWidth="2" />
                <text x="326" y="216" textAnchor="middle" fontSize="10.5" fill="#a54838" fontWeight="700">黑暗中 ✗ 反而污染空气</text>
                <text x="220" y="248" textAnchor="middle" fontSize="10.5" fill="#799398">解释了普利斯特利的失败：阴天与夜间做的实验不成立</text>
              </g>
            ) : null}
            {/* 阶段 3：萨克斯 */}
            {stage === 3 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">1864 · 萨克斯：饥饿处理 + 半叶遮光 + 碘检</text>
                {/* 叶片半遮光 */}
                <path d="M220 170 q -64 -12 -70 -70 q 60 -18 110 6 q 20 30 -12 56 q -14 10 -28 8 Z" fill="#6aa85a" stroke="#3f7f3a" strokeWidth="2.6" />
                <path d="M214 168 q -6 -60 -18 -104" fill="none" stroke="#3f7f3a" strokeWidth="2.4" />
                <rect x="146" y="92" width="70" height="60" rx="8" fill="#3a4a5a" stroke="#2a3a4a" strokeWidth="2" opacity="0.85" />
                <text x="181" y="126" textAnchor="middle" fontSize="10" fill="#c9d4d4" fontWeight="600">遮光</text>
                <text x="262" y="116" fontSize="10.5" fill="#2f6f2a" fontWeight="600">见光</text>
                {/* 碘蒸气检验结果 */}
                <rect x="80" y="196" width="120" height="40" rx="8" fill="#3a5a8a" stroke="#2c5a84" strokeWidth="2" />
                <text x="140" y="221" textAnchor="middle" fontSize="10.5" fill="#c9d8f0" fontWeight="700">遮光半叶：不变蓝</text>
                <rect x="240" y="196" width="120" height="40" rx="8" fill="#3a5a8a" stroke="#2c5a84" strokeWidth="2" />
                <text x="300" y="215" textAnchor="middle" fontSize="10.5" fill="#f0e0a0" fontWeight="700">见光半叶：变蓝 ✓</text>
                <text x="300" y="231" textAnchor="middle" fontSize="9" fill="#c9d8f0">（淀粉遇碘变蓝）</text>
                <text x="220" y="252" textAnchor="middle" fontSize="10.5" fill="#799398">一次实验同时证明：产物是淀粉 · 条件是光（自身对照）</text>
              </g>
            ) : null}
            {/* 阶段 4：同位素时代 */}
            {stage === 4 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">1941 鲁宾卡门（¹⁸O）· 卡尔文（¹⁴C）</text>
                {/* 两组同位素实验 */}
                <rect x="46" y="52" width="160" height="66" rx="8" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
                <text x="126" y="74" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">H₂¹⁸O + CO₂ →</text>
                <text x="126" y="94" textAnchor="middle" fontSize="11" fill="#2c5a84" fontWeight="800">释放 ¹⁸O₂ ✓</text>
                <rect x="234" y="52" width="160" height="66" rx="8" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
                <text x="314" y="74" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">H₂O + C¹⁸O₂ →</text>
                <text x="314" y="94" textAnchor="middle" fontSize="11" fill="#2c5a84" fontWeight="800">释放 O₂（无标记）</text>
                <text x="220" y="140" textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="800">结论：O₂ 中的氧全部来自水的光解</text>
                {/* 卡尔文循环 */}
                <text x="220" y="170" textAnchor="middle" fontSize="10.5" fill="#37585f" fontWeight="700">卡尔文（¹⁴C 追踪 CO₂）：暗反应路径</text>
                <rect x="66" y="182" width="88" height="34" rx="17" fill="#f4d0d0" stroke="#a54838" strokeWidth="2" />
                <text x="110" y="204" textAnchor="middle" fontSize="10" fill="#8a3a2a" fontWeight="700">CO₂（¹⁴C）</text>
                <path d="M156 199 h 26 m 0 0 l -6 -4 m 6 4 l -6 4" fill="none" stroke="#5a7a8a" strokeWidth="1.6" />
                <rect x="184" y="182" width="100" height="34" rx="17" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2" />
                <text x="234" y="204" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="700">三碳化合物</text>
                <path d="M286 199 h 26 m 0 0 l -6 -4 m 6 4 l -6 4" fill="none" stroke="#5a7a8a" strokeWidth="1.6" />
                <rect x="314" y="182" width="76" height="34" rx="17" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2" />
                <text x="352" y="204" textAnchor="middle" fontSize="10" fill="#2f6f2a" fontWeight="700">糖类</text>
                <text x="220" y="246" textAnchor="middle" fontSize="10.5" fill="#799398">同位素标记法：追踪元素去向的"原子侦探"</text>
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
