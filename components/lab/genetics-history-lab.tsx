'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '科学史脉络',
    lines: [
      <>从 1865 年孟德尔的豌豆到 1953 年双螺旋，遗传学用不到一百年走完"现象 → 规律 → 因子 → 载体 → 本质"五级台阶。</>,
      <>三条主线：<span className="font-semibold">孟德尔</span>（数学方法发现遗传规律）→ <span className="font-semibold">萨顿与摩尔根</span>（基因在染色体上）→ <span className="font-semibold">肺炎链球菌转化·噬菌体侵染·双螺旋</span>（DNA 是遗传物质、解析其结构）。</>,
      <>方法演进：统计杂交后代 → 类比推理 → 假说演绎（果蝇）→ 同位素标记 → 建造物理模型。</>,
    ],
  },
  {
    title: '六个关键节点',
    lines: [
      <>① 1865 孟德尔：豌豆杂交统计出 3:1 与 9:3:3:1，提出遗传因子分离与自由组合定律（当时无人理会）。</>,
      <>② 1900 三位科学家（德弗里斯、科伦斯、丘歇马克）各自重新发现孟德尔定律；1903 萨顿用蝗虫类比推理"基因在染色体上"。</>,
      <>③ 1910 摩尔根：果蝇白眼性状与 X 染色体连锁——用假说演绎法把基因落实到染色体上（1933 年诺贝尔奖）。</>,
      <>④ 1928 格里菲思发现"转化因子"；1944 艾弗里体外转化实验证明 DNA 才是转化因子（蛋白质不是）。</>,
      <>⑤ 1952 赫尔希与蔡斯：T2 噬菌体分别用³⁵S 标记蛋白质、³²P 标记 DNA——侵染时只有 DNA 进入细菌，后代噬菌体性状由 DNA 决定。</>,
      <>⑥ 1953 沃森与克里克：根据富兰克林的 X 射线衍射照片提出 DNA 双螺旋结构模型——开启分子生物学时代。</>,
    ],
  },
  {
    title: '考点提炼',
    lines: [
      <>艾弗里实验的严谨之处：<span className="font-semibold">把 S 型细菌的 DNA、蛋白质、多糖分开</span>，单独观察每种物质的作用，并加入 DNA 酶作对照组（DNA 被水解后转化消失）。</>,
      <>噬菌体侵染为什么不能证明"蛋白质不是遗传物质"？因为<span className="font-semibold">标记的蛋白质并未进入细菌</span>——它只证明了 DNA 进入了并起作用（有效性证据）。</>,
      <>孟德尔成功的四要素：选<span className="font-semibold">自花传粉闭花受粉</span>的豌豆、选<span className="font-semibold">相对性状分明</span>的纯种、由单因子到多因子、用<span className="font-semibold">统计学</span>分析。</>,
    ],
  },
];

const STAGES = 5;

export function GeneticsHistoryLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '1865 年，修道院花园里的孟德尔用 8 年时间种植了约 28000 株豌豆：高茎 × 矮茎，子一代全是高茎，子二代却出现 3:1 的比例。他用数学统计发现了"遗传因子"的分离与自由组合定律——但这份论文在此后 34 年无人问津。';
    if (stage === 1)
      return '1900 年，三位科学家几乎同时重新发现了孟德尔定律，遗传学正式诞生。1903 年萨顿注意到：遗传因子像染色体一样成对存在、一个来自父方一个来自母方、在形成配子时分离——提出著名假说"基因在染色体上"，但只是类比推理，还缺实验证据。';
    if (stage === 2)
      return '1910 年，摩尔根在红眼果蝇群里发现一只白眼雄蝇：白眼几乎只出现在雄性后代中——与 X 染色体的传递完全平行。他原本反对孟德尔学说，这一发现却让他用假说演绎法证明了基因在染色体上，并绘制出第一条基因连锁图。';
    if (stage === 3)
      return '遗传物质到底是什么？1928 年格里菲思发现加热杀死的 S 型细菌能把活的 R 型"转化"成致病型——转化因子是什么？1944 年艾弗里把 S 型细菌的 DNA、蛋白质、多糖分开，单独加 DNA 就能发生转化，加 DNA 酶则转化消失——DNA 才是转化因子。';
    return '1952 年赫尔希与蔡斯用 T2 噬菌体一锤定音：³⁵S 标记蛋白质外壳留在外面，³²P 标记的 DNA 注入大肠杆菌并复制出子代噬菌体。次年，沃森与克里克依据富兰克林的衍射照片搭出双螺旋模型——遗传学研究从此进入分子时代。';
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
              回到 1865 年
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {['1865 孟德尔 · 豌豆', '1900 重新发现+萨顿假说', '1910 摩尔根 · 果蝇', '1928-44 转化实验', '1952-53 噬菌体与双螺旋'][stage]}
              <br />
              <span className="font-semibold text-[#0e6f75]">现象 → 规律 → 因子 → 载体 → 本质</span>
            </div>
          </>
        }
      >
        <SceneBox label="遗传学发现史（步进演示）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 阶段 0：孟德尔豌豆 */}
            {stage === 0 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">1865 · 孟德尔：8 年 · 28000 株豌豆</text>
                {/* P F1 F2 */}
                <circle cx="90" cy="86" r="18" fill="#6aa85a" stroke="#3f7f3a" strokeWidth="2.2" />
                <text x="90" y="91" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">高</text>
                <text x="90" y="120" textAnchor="middle" fontSize="9.5" fill="#37585f">亲本 P</text>
                <text x="148" y="86" textAnchor="middle" fontSize="13" fill="#5a7a8a" fontWeight="700">×</text>
                <circle cx="206" cy="86" r="18" fill="#c9b88a" stroke="#8a7a4a" strokeWidth="2.2" />
                <text x="206" y="91" textAnchor="middle" fontSize="10" fill="#5a4a2a" fontWeight="700">矮</text>
                <text x="206" y="120" textAnchor="middle" fontSize="9.5" fill="#37585f">亲本 P</text>
                <path d="M240 86 h 40 m 0 0 l -8 -5 m 8 5 l -8 5" fill="none" stroke="#5a7a8a" strokeWidth="1.8" />
                <circle cx="330" cy="86" r="18" fill="#6aa85a" stroke="#3f7f3a" strokeWidth="2.2" />
                <text x="330" y="91" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">高</text>
                <text x="330" y="120" textAnchor="middle" fontSize="9.5" fill="#37585f">F₁ 全高茎</text>
                {/* F2 比例 */}
                {[0, 1, 2, 3].map((i) => (
                  <circle key={i} cx={250 + (i % 4) * 40} cy={158} r="15" fill={i < 3 ? '#6aa85a' : '#c9b88a'} stroke={i < 3 ? '#3f7f3a' : '#8a7a4a'} strokeWidth="2" />
                ))}
                <text x="290" y="192" textAnchor="middle" fontSize="11.5" fill="#8a671b" fontWeight="800">F₂ 高 : 矮 ≈ 3 : 1</text>
                <text x="220" y="230" textAnchor="middle" fontSize="10.5" fill="#799398">数学统计发现"遗传因子"——分离定律与自由组合定律</text>
              </g>
            ) : null}
            {/* 阶段 1：重新发现 + 萨顿 */}
            {stage === 1 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">1900 重新发现 · 1903 萨顿假说</text>
                <rect x="52" y="52" width="330" height="30" rx="8" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="1.8" />
                <text x="217" y="72" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">三位科学家各自重译孟德尔论文 → 遗传学诞生</text>
                {/* 类比 */}
                <rect x="62" y="104" width="140" height="88" rx="10" fill="#f4ecdc" stroke="#8a671b" strokeWidth="2.2" />
                <text x="132" y="126" textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="800">遗传因子</text>
                <text x="132" y="146" textAnchor="middle" fontSize="9.5" fill="#8a671b">成对存在 · 配子减半</text>
                <text x="132" y="164" textAnchor="middle" fontSize="9.5" fill="#8a671b">一个来自父方</text>
                <text x="132" y="182" textAnchor="middle" fontSize="9.5" fill="#8a671b">一个来自母方</text>
                <text x="220" y="152" textAnchor="middle" fontSize="14" fill="#5a7a8a" fontWeight="700">≈</text>
                <rect x="238" y="104" width="140" height="88" rx="10" fill="#e4ecf6" stroke="#2c5a84" strokeWidth="2.2" />
                <text x="308" y="126" textAnchor="middle" fontSize="11" fill="#2c5a84" fontWeight="800">染色体</text>
                <text x="308" y="146" textAnchor="middle" fontSize="9.5" fill="#2c5a84">成对存在 · 减数分裂减半</text>
                <text x="308" y="164" textAnchor="middle" fontSize="9.5" fill="#2c5a84">一条来自父方</text>
                <text x="308" y="182" textAnchor="middle" fontSize="9.5" fill="#2c5a84">一条来自母方</text>
                <text x="220" y="222" textAnchor="middle" fontSize="10.5" fill="#799398">萨顿：平行关系 → 假说"基因在染色体上"（缺实验证据）</text>
              </g>
            ) : null}
            {/* 阶段 2：摩尔根果蝇 */}
            {stage === 2 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">1910 · 摩尔根：白眼果蝇锁定 X 染色体</text>
                {/* 红眼 */}
                <ellipse cx="110" cy="110" rx="34" ry="22" fill="#b06a3a" stroke="#7a4a2a" strokeWidth="2.2" />
                <circle cx="96" cy="104" r="7" fill="#c93a3a" stroke="#8a2020" strokeWidth="1.6" />
                <path d="M136 100 q 22 -16 40 -14 m -40 22 q 24 6 38 20" fill="none" stroke="#7a4a2a" strokeWidth="2.4" />
                <text x="110" y="156" textAnchor="middle" fontSize="10.5" fill="#7a4a2a" fontWeight="600">红眼雌 × 红眼雄</text>
                {/* 白眼突变 */}
                <ellipse cx="250" cy="110" rx="34" ry="22" fill="#b06a3a" stroke="#7a4a2a" strokeWidth="2.2" />
                <circle cx="236" cy="104" r="7" fill="#f0f0f0" stroke="#8a8a8a" strokeWidth="1.6" />
                <path d="M276 100 q 22 -16 40 -14 m -40 22 q 24 6 38 20" fill="none" stroke="#7a4a2a" strokeWidth="2.4" />
                <text x="250" y="156" textAnchor="middle" fontSize="10.5" fill="#7a4a2a" fontWeight="600">突变白眼雄蝇</text>
                <path d="M156 110 h 46 m 0 0 l -8 -5 m 8 5 l -8 5" fill="none" stroke="#5a7a8a" strokeWidth="1.8" />
                {/* F2 结果 */}
                <rect x="96" y="176" width="280" height="44" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
                <text x="236" y="196" textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="800">F₂ 白眼全部是雄性！</text>
                <text x="236" y="212" textAnchor="middle" fontSize="9.5" fill="#a5761d">白眼基因与 X 染色体传递完全平行</text>
                <text x="220" y="244" textAnchor="middle" fontSize="10.5" fill="#799398">假说演绎法证明：基因在染色体上（1933 诺贝尔奖）</text>
              </g>
            ) : null}
            {/* 阶段 3：转化实验 */}
            {stage === 3 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">1928 格里菲思 → 1944 艾弗里：DNA 是转化因子</text>
                {/* R 型与 S 型 */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <circle key={`r${i}`} cx={70 + (i % 3) * 28} cy={80 + Math.floor(i / 3) * 30} r="11" fill="#d8e4d8" stroke="#5a7a5a" strokeWidth="1.8" />
                ))}
                <text x="112" y="146" textAnchor="middle" fontSize="10.5" fill="#3f7f3a" fontWeight="700">R 型活菌（无毒）</text>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <circle key={`s${i}`} cx={70 + (i % 3) * 28} cy={196 + Math.floor(i / 3) * 30} r="11" fill="#c9a05a" stroke="#8a6a3a" strokeWidth="1.8" />
                ))}
                <text x="112" y="252" textAnchor="middle" fontSize="10.5" fill="#8a6a3a" fontWeight="700">S 型死菌 + R 型 → R 型转化为 S 型</text>
                <path d="M196 140 h 34" stroke="#5a7a8a" strokeWidth="1.8" />
                <rect x="234" y="52" width="172" height="200" rx="10" fill="#eef4f6" stroke="#2c5a84" strokeWidth="2.2" />
                <text x="320" y="76" textAnchor="middle" fontSize="11" fill="#2c5a84" fontWeight="800">艾弗里体外转化</text>
                <text x="320" y="102" textAnchor="middle" fontSize="10" fill="#2f6f2a" fontWeight="600">+ DNA 酶以外的成分 → 转化 ✓</text>
                <text x="320" y="126" textAnchor="middle" fontSize="10" fill="#a53030" fontWeight="600">+ DNA 酶（水解 DNA）→ 转化 ✗</text>
                <text x="320" y="158" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">分离提纯逐一检验：</text>
                <text x="320" y="180" textAnchor="middle" fontSize="10" fill="#37585f">只有 DNA 能引起转化</text>
                <text x="320" y="204" textAnchor="middle" fontSize="10" fill="#37585f">蛋白质·多糖都不能</text>
                <text x="320" y="232" textAnchor="middle" fontSize="10" fill="#799398">"DNA 才是遗传物质"</text>
              </g>
            ) : null}
            {/* 阶段 4：噬菌体 + 双螺旋 */}
            {stage === 4 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">1952 赫尔希蔡斯 · 1953 双螺旋</text>
                {/* 噬菌体两组 */}
                <rect x="46" y="50" width="160" height="72" rx="8" fill="#f4e0e0" stroke="#a54838" strokeWidth="2" />
                <text x="126" y="72" textAnchor="middle" fontSize="10" fill="#8a3a2a" fontWeight="700">³⁵S 标记蛋白质组</text>
                <text x="126" y="94" textAnchor="middle" fontSize="9.5" fill="#8a3a2a">外壳留在外面 · 搅拌离心后</text>
                <text x="126" y="112" textAnchor="middle" fontSize="10.5" fill="#a53030" fontWeight="700">放射性在上清液</text>
                <rect x="234" y="50" width="160" height="72" rx="8" fill="#e4ecf6" stroke="#2c5a84" strokeWidth="2" />
                <text x="314" y="72" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">³²P 标记 DNA 组</text>
                <text x="314" y="94" textAnchor="middle" fontSize="9.5" fill="#2c5a84">DNA 注入细菌复制子代</text>
                <text x="314" y="112" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">放射性在沉淀物</text>
                <text x="220" y="144" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">→ 亲子代之间唯一的连续性物质是 DNA</text>
                {/* 双螺旋 */}
                <path d="M170 214 q 14 -26 0 -52 q -14 -26 0 -52 M 250 214 q -14 -26 0 -52 q 14 -26 0 -52" fill="none" stroke="#4d7ea8" strokeWidth="3" />
                {[0, 1, 2, 3].map((i) => (
                  <line key={i} x1={172 + (i % 2) * 4} y1={116 + i * 26} x2={248 - (i % 2) * 4} y2={116 + i * 26} stroke="#3f7f3a" strokeWidth="3" />
                ))}
                <text x="300" y="180" fontSize="11" fill="#2c5a84" fontWeight="700">1953 双螺旋模型</text>
                <text x="300" y="200" fontSize="9.5" fill="#59767c">沃森·克里克·富兰克林</text>
                <text x="220" y="240" textAnchor="middle" fontSize="10.5" fill="#799398">分子生物学时代开启——本站中心法则实验的序章</text>
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
