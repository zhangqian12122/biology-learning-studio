'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '什么是 CAR-T',
    lines: [
      <>CAR-T（嵌合抗原受体 T 细胞免疫疗法）：把患者自己的 T 淋巴细胞取出，用<span className="font-semibold">基因工程</span>给它们装上能特异性识别肿瘤抗原的"导航头"（CAR），体外扩增后再回输体内——让免疫细胞变成精准的"活的药物"。</>
      ,
      <>CAR 结构 = <span className="font-semibold">抗体片段（识别抗原）+ 跨膜区 + T 细胞活化信号区</span>——把抗体的特异性与 T 细胞的杀伤力合二为一。</>
      ,
      <>2017 年首款 CAR-T 疗法获批用于复发难治的 B 细胞白血病/淋巴瘤（靶点 CD19 抗原），完全缓解率大幅提高——是"以菌治菌"之后"以细胞治细胞"的典范。</>
      ,
    ],
  },
  {
    title: '流程五步',
    lines: [
      <>① 分离：采集患者外周血，分离出 T 淋巴细胞。</>
      ,
      <>② 改造：用（灭活/改造的）病毒载体把 CAR 基因导入 T 细胞——T 细胞表面表达 CAR。</>
      ,
      <>③ 扩增：体外培养到数亿至数十亿个 CAR-T 细胞（需要动物细胞培养技术）。</>
      ,
      <>④ 回输：给患者做清淋预处理后回输 CAR-T 细胞。</>
      ,
      <>⑤ 杀伤：CAR 结合癌细胞表面抗原 → T 细胞活化 → 释放穿孔素/颗粒酶裂解癌细胞，并增殖成"记忆部队"。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>CAR-T 是<span className="font-semibold">基因治疗 + 细胞治疗 + 免疫治疗</span>三种技术的交汇——用到的技术：基因工程（装 CAR）、动物细胞培养（扩增）、输血技术（回输）。</>
      ,
      <>"用自己的细胞治自己的病"：<span className="font-semibold">自体来源避免了免疫排斥</span>——与 iPS 细胞治疗思路一致。</>
      ,
      <>风险与局限：<span className="font-semibold">细胞因子风暴</span>（CRS，免疫过度激活引发高热低血压）、实体瘤效果有限（肿瘤微环境抑制 T 细胞）、价格昂贵。</>
      ,
    ],
  },
];

const STAGES = 4; // 0 分离 → 1 改造 → 2 扩增 → 3 回输杀伤

export function CarTherapyLab() {
  const [stage, setStage] = useState(0);
  const step = () => setStage((s) => Math.min(STAGES, s + 1));
  const reset = () => setStage(0);

  const observation = (() => {
    if (stage === 0)
      return '从患者外周血中分离出 T 淋巴细胞。问题：T 细胞本来靠表面受体识别"异物"，但癌细胞太"像自己"，T 细胞认不出来——所以需要给它们装一副能认出癌细胞的新"眼镜"。';
    if (stage === 1)
      return '用改造的病毒载体把 CAR 基因导入 T 细胞。CAR = 抗体片段（识别癌细胞特有抗原 CD19）+ 跨膜锚 + T 细胞活化信号——T 细胞从此获得"抗体级的精准识别 + 细胞级的杀伤力"。这是基因工程与细胞治疗的会师。';
    if (stage === 2)
      return '改造后的 CAR-T 细胞在培养体系中扩增到数十亿个（动物细胞培养技术提供条件：血清、适宜温度与气体环境）。每一颗都是"武装完毕"的猎杀单元。';
    return '回输患者体内：CAR-T 细胞循着 CD19 抗原找到癌细胞，紧密结合后释放穿孔素在癌细胞膜上打孔、注入颗粒酶引爆凋亡——同时增殖形成长期"记忆"。一个疗程可能有数十万到上亿个癌细胞被清除，但也有细胞因子风暴等风险需要监控。';
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
              🧫 推进流程（{stage}/{STAGES}）
            </button>
            <button type="button" onClick={reset} className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]">
              重新开始
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              三大技术交汇：<span className="font-semibold">基因工程 · 细胞培养 · 免疫杀伤</span>
              <br />
              <span className="font-semibold text-[#0e6f75]">"活的药物"——用细胞当药</span>
            </div>
          </>
        }
      >
        <SceneBox label="CAR-T 疗法流程（步进演示）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 阶段 0：分离 T 细胞 */}
            {stage === 0 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">① 采集患者血液 → 分离 T 淋巴细胞</text>
                <ellipse cx="120" cy="130" rx="70" ry="46" fill="#dceaea" stroke="#5a7a8a" strokeWidth="2.6" />
                <text x="120" y="196" textAnchor="middle" fontSize="10.5" fill="#37585f" fontWeight="600">外周血样本</text>
                {[0, 1, 2, 3, 4].map((i) => (
                  <circle key={i} cx={96 + (i % 3) * 26} cy={112 + Math.floor(i / 3) * 30} r="10" fill={i === 2 ? '#7ab86a' : '#e8a0a0'} stroke={i === 2 ? '#3f7f3a' : '#8a3a3a'} strokeWidth="1.8" />
                ))}
                <text x="86" y="116" textAnchor="middle" fontSize="8" fill="#3f7f3a" fontWeight="700">T</text>
                <path d="M204 130 h 40 m 0 0 l -8 -5 m 8 5 l -8 5" fill="none" stroke="#5a7a8a" strokeWidth="2" />
                <rect x="252" y="104" width="120" height="52" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
                <circle cx="282" cy="130" r="14" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2" />
                <text x="282" y="134" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700">T</text>
                <text x="340" y="126" fontSize="10" fill="#2f6f2a" fontWeight="700">T 细胞</text>
                <text x="340" y="144" fontSize="9.5" fill="#3f7f3a">免疫"特种兵"</text>
                <text x="220" y="228" textAnchor="middle" fontSize="10.5" fill="#799398">难点：癌细胞"伪装成自己"，普通 T 细胞认不出它们</text>
              </g>
            ) : null}
            {/* 阶段 1：基因改造 */}
            {stage === 1 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">② 装上"导航头"：导入 CAR 基因</text>
                <rect x="56" y="60" width="120" height="40" rx="8" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
                <text x="116" y="78" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="700">CAR 基因</text>
                <text x="116" y="94" textAnchor="middle" fontSize="9" fill="#8a671b">抗体片段+信号区</text>
                <path d="M182 80 h 30 m 0 0 l -7 -5 m 7 5 l -7 5" fill="none" stroke="#5a7a8a" strokeWidth="1.8" />
                <circle cx="290" cy="80" r="26" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2.4" />
                <path d="M290 80 l 22 -14 m -22 14 l 24 2 m -24 -2 l 18 18" stroke="#2c5a84" strokeWidth="2.6" strokeLinecap="round" />
                <text x="290" y="122" textAnchor="middle" fontSize="10" fill="#2f6f2a" fontWeight="600">病毒载体导入 → 表面长出 CAR</text>
                {/* CAR 结构 */}
                <rect x="70" y="150" width="300" height="60" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
                <text x="84" y="176" fontSize="10" fill="#8a3a2a" fontWeight="700">抗体片段</text>
                <text x="84" y="194" fontSize="9" fill="#a5533c">识别 CD19</text>
                <text x="180" y="176" fontSize="10" fill="#37585f" fontWeight="700">跨膜区</text>
                <text x="180" y="194" fontSize="9" fill="#59767c">锚在膜上</text>
                <text x="258" y="176" fontSize="10" fill="#2f6f2a" fontWeight="700">活化信号区</text>
                <text x="258" y="194" fontSize="9" fill="#3f7f3a">激活 T 细胞杀伤</text>
                <path d="M140 174 h 32 m 0 0 l -5 -4 m 5 4 l -5 4 m 5 -4 l -5 -4 m 5 4 l -5 4" fill="none" stroke="#8a9a9f" strokeWidth="1.4" />
                <path d="M228 174 h 24 m 0 0 l -5 -4 m 5 4 l -5 4 m 5 -4 l -5 -4 m 5 4 l -5 4" fill="none" stroke="#8a9a9f" strokeWidth="1.4" />
                <text x="220" y="238" textAnchor="middle" fontSize="10.5" fill="#799398">基因工程：给 T 细胞写入"识别癌细胞的程序"</text>
              </g>
            ) : null}
            {/* 阶段 2：扩增 */}
            {stage === 2 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">③ 体外扩增：从几千个到数十亿个</text>
                <rect x="60" y="60" width="320" height="120" rx="14" fill="#dceaea" stroke="#5a7a8a" strokeWidth="2.6" />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                  <circle key={i} cx={92 + (i % 6) * 50} cy={96 + Math.floor(i / 6) * 50 + (i % 3) * 4} r="12" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="1.8" />
                ))}
                {[0, 2, 4, 6, 8, 10].map((i) => (
                  <text key={`s${i}`} x={84 + (i % 6) * 50} y={96 + Math.floor(i / 6) * 50} fontSize="8" fill="#2f6f2a" fontWeight="700">CAR</text>
                ))}
                <text x="220" y="206" textAnchor="middle" fontSize="10" fill="#59767c">培养箱：37°C · 5% CO₂ · 血清营养（动物细胞培养）</text>
                <text x="220" y="238" textAnchor="middle" fontSize="10.5" fill="#799398">2~4 周培养：数千个 → 数十亿个"猎杀单元"</text>
              </g>
            ) : null}
            {/* 阶段 3：回输与杀伤 */}
            {stage === 3 ? (
              <g>
                <text x="220" y="30" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="700">④⑤ 回输体内 · 特异性杀伤癌细胞</text>
                {/* 癌细胞 */}
                <circle cx="140" cy="130" r="44" fill="#d86a6a" stroke="#a53030" strokeWidth="2.8" />
                <circle cx="150" cy="118" r="9" fill="#8a3a3a" />
                <circle cx="122" cy="146" r="7" fill="#8a3a3a" />
                <text x="140" y="196" textAnchor="middle" fontSize="10.5" fill="#a53030" fontWeight="700">癌细胞（表面有 CD19）</text>
                {/* CAR-T */}
                <circle cx="300" cy="130" r="26" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2.4" />
                <path d="M326 118 l 18 -8 m -18 20 l 20 -2 m -20 16 l 16 10" stroke="#2c5a84" strokeWidth="2.6" strokeLinecap="round" />
                <text x="300" y="196" textAnchor="middle" fontSize="10.5" fill="#2f6f2a" fontWeight="700">CAR-T 细胞</text>
                {/* 结合与穿孔素 */}
                <path d="M262 138 q -18 6 -36 -2" fill="none" stroke="#8a671b" strokeWidth="2.4" strokeDasharray="5 3" />
                <circle cx="196" cy="122" r="6" fill="#e8a03a" stroke="#8a671b" strokeWidth="1.8" />
                <circle cx="182" cy="140" r="5" fill="#e8a03a" stroke="#8a671b" strokeWidth="1.6" />
                <text x="230" y="216" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="600">结合 CD19 → 释放穿孔素/颗粒酶 → 癌细胞裂解</text>
                <text x="220" y="246" textAnchor="middle" fontSize="10.5" fill="#799398">同时形成记忆细胞·长期监控；需监控细胞因子风暴风险</text>
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
