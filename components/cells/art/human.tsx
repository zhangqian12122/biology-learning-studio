'use client';

import type { ComponentType } from 'react';
import { dim, type ArtProps } from '@/components/cells/art-shared';

function EarwaxSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 外耳道剖面 */}
      <g style={dim(active, 0)}>
        <path d="M60 120 Q140 92 210 116 Q252 130 258 170 Q262 210 224 228 Q160 254 90 232 Q56 220 52 178 Q50 140 60 120 Z" fill="#f2d0c9" stroke="#b06a6a" strokeWidth="2.8" />
        <path d="M96 150 Q170 138 232 168 L228 196 Q168 224 100 206 Z" fill="#e8c8c0" stroke="#b06a6a" strokeWidth="2" />
        <text x="60" y="86" fontSize="12.5" fill="#a53030" fontWeight="700">外耳道（约 2.5 cm 的"死胡同"）</text>
        <text x="238" y="180" textAnchor="end" fontSize="12" fill="#8a5a5a">深处=鼓膜（别掏到！）</text>
      </g>
      {/* 耵聍腺与两种耳垢 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={112 + i * 40} cy={210} rx="10" ry="7" fill="#c98ad0" stroke="#8a5aa5" strokeWidth="1.8" />
        ))}
        <text x="46" y="248" fontSize="12" fill="#8a5aa5" fontWeight="700">耵聍腺（变异的汗腺）+ 皮脂腺</text>
        <rect x="300" y="60" width="196" height="120" rx="12" fill="#fdf8ea" stroke="#c9a03a" strokeWidth="2.4" />
        <text x="398" y="84" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">两种耳垢 · 一个基因</text>
        <text x="312" y="108" fontSize="12" fill="#8a671b">干型：黄白碎屑（东亚常见）</text>
        <text x="312" y="128" fontSize="12" fill="#8a671b">湿型：油褐黏块（欧非常见）</text>
        <text x="312" y="152" fontSize="11.5" fill="#59767c">ABCC11 基因一个 SNP 决定</text>
        <text x="312" y="170" fontSize="11.5" fill="#59767c">同一个基因还决定有没有狐臭</text>
        <rect x="300" y="196" width="196" height="100" rx="12" fill="#eef7ee" stroke="#5a9a5a" strokeWidth="2.2" />
        <text x="398" y="218" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">耳垢的三大功劳</text>
        <text x="312" y="240" fontSize="11.5" fill="#37585f">① 黏住灰尘虫子（物理防线）</text>
        <text x="312" y="260" fontSize="11.5" fill="#37585f">② 抑菌防霉（化学防线）</text>
        <text x="312" y="280" fontSize="11.5" fill="#37585f">③ 保湿防鼓膜干裂</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="304" width="448" height="62" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="326" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">自洁设计：咀嚼时外耳道软骨活动，耳垢随"传送带"外移自然排出——棉签只会越捅越深！</text>
        <text x="260" y="350" textAnchor="middle" fontSize="12" fill="#a5761d">考点：单基因遗传的相对性状（湿型对干型为显性）——群体里统计干湿比例可估基因频率</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">耳垢 · 干湿由基因说了算（课外拓展）</text>
    </svg>
  );
}

function GastricMucusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 胃壁剖面分层 */}
      <g style={dim(active, 0)}>
        <rect x="40" y="56" width="240" height="150" rx="10" fill="#fbd9d9" stroke="#b06a6a" strokeWidth="2" />
        <text x="58" y="80" fontSize="12.5" fill="#a53030" fontWeight="700">胃腔：盐酸 pH 1.5~2</text>
        <text x="58" y="98" fontSize="12" fill="#a53030">能溶解刀片的强酸+胃蛋白酶</text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={70 + i * 34} cy={120 + (i % 2) * 18} r="4" fill="#c93a3a" />
        ))}
        <rect x="40" y="206" width="240" height="34" rx="6" fill="#f8e8b8" stroke="#c9a03a" strokeWidth="2.2" />
        <text x="160" y="228" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">黏液凝胶层（约 0.5 mm）</text>
        <rect x="40" y="240" width="240" height="52" rx="8" fill="#e8d0f0" stroke="#8a5aa5" strokeWidth="2.4" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={i}>
            <ellipse cx={62 + i * 34} cy={266} rx="12" ry="11" fill="#e8d0f0" stroke="#8a5aa5" strokeWidth="1.8" />
            <circle cx={62 + i * 34} cy={266} r="3.4" fill="#8a5aa5" />
          </g>
        ))}
        <text x="160" y="312" textAnchor="middle" fontSize="12.5" fill="#5a4390" fontWeight="700">黏液细胞：分泌黏液 + 碳酸氢盐</text>
      </g>
      {/* pH 梯度与攻防 */}
      <g style={dim(active, 1)}>
        <path d="M300 96 L300 246 L486 246 L486 96 Z" fill="#f2faea" stroke="#7aa87a" strokeWidth="2.2" />
        <text x="393" y="116" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">pH 梯度：从腔到上皮</text>
        <text x="393" y="140" textAnchor="middle" fontSize="12" fill="#a53030">pH 1.5（腔侧）</text>
        <rect x="330" y="150" width="130" height="16" rx="8" fill="#f2c9c9" />
        <rect x="330" y="166" width="130" height="16" rx="8" fill="#f8e8b8" />
        <rect x="330" y="182" width="130" height="16" rx="8" fill="#d8f0d0" />
        <text x="393" y="232" textAnchor="middle" fontSize="12" fill="#2f6f2a">pH 6~7（上皮表面）</text>
        <text x="393" y="212" textAnchor="middle" fontSize="11.5" fill="#59767c">碳酸氢盐被酸"中和"出中性小环境</text>
        <rect x="300" y="258" width="196" height="66" rx="10" fill="#fdf1f1" stroke="#a53030" strokeWidth="2.2" />
        <text x="398" y="278" textAnchor="middle" fontSize="12" fill="#a53030" fontWeight="800">谁在拆屏障？</text>
        <text x="398" y="297" textAnchor="middle" fontSize="11.5" fill="#b0483a">幽门螺杆菌（钻进黏液定居）</text>
        <text x="398" y="315" textAnchor="middle" fontSize="11.5" fill="#b0483a">大剂量止痛药（抑制前列腺素）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="328" width="448" height="40" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">"消化自己"=屏障失守：黏液+碳酸氢盐的"化学城墙"一破，胃酸就地造溃疡</text>
        <text x="260" y="362" textAnchor="middle" fontSize="11" fill="#a5761d">胃上皮约 3~5 天更新一代——"边破坏边重建"，屏障修复与破坏的赛跑</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">胃黏液屏障 · 胃为什么不消化自己（课外拓展）</text>
    </svg>
  );
}

function HeartValvesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 心脏纵剖与瓣膜位置 */}
      <g style={dim(active, 0)}>
        <path d="M150 96 Q112 110 108 170 Q106 236 160 268 Q200 292 232 268 L248 254 L264 268 Q296 292 336 268 Q390 236 388 170 Q384 110 346 96 Q300 82 260 118 Q220 82 150 96 Z" fill="#f2c9c9" stroke="#a53030" strokeWidth="3" />
        <path d="M178 132 L178 232 M252 132 L252 232" fill="none" stroke="#a53030" strokeWidth="2.4" strokeDasharray="8 5" />
        <text x="200" y="112" textAnchor="middle" fontSize="12" fill="#a53030" fontWeight="700">左心室（壁最厚）</text>
        <text x="298" y="176" fontSize="12" fill="#8a5a5a">右心室</text>
      </g>
      {/* 房室瓣与动脉瓣 */}
      <g style={dim(active, 1)}>
        <path d="M178 140 L192 168 L164 168 Z" fill="#e8c83a" stroke="#8a671b" strokeWidth="2" />
        <path d="M252 140 L266 168 L238 168 Z" fill="#e8c83a" stroke="#8a671b" strokeWidth="2" />
        <text x="106" y="150" fontSize="12.5" fill="#8a671b" fontWeight="700">房室瓣（二尖·三尖）</text>
        <text x="106" y="168" fontSize="12" fill="#8a671b">像"荡单摆的门帘"</text>
        <path d="M198 116 L214 96 L230 116 Z" fill="#7ab0c9" stroke="#3a6a8a" strokeWidth="2" />
        <path d="M272 116 L288 96 L304 116 Z" fill="#7ab0c9" stroke="#3a6a8a" strokeWidth="2" />
        <text x="322" y="102" fontSize="12.5" fill="#3a6a8a" fontWeight="700">动脉瓣（半月瓣）</text>
        <text x="322" y="120" fontSize="12" fill="#3a6a8a">像"三个小口袋"</text>
        <path d="M212 88 L212 58 M292 88 L292 58" fill="none" stroke="#8a9a9f" strokeWidth="3" />
        <text x="238" y="52" fontSize="12" fill="#59767c">↑ 血液只出不回</text>
      </g>
      {/* 心音与考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="288" width="448" height="78" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="310" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">听诊器里的"咚—哒"：咚=房室瓣关闭（心缩开始）· 哒=动脉瓣关闭（心舒开始）</text>
        <text x="260" y="332" textAnchor="middle" fontSize="12" fill="#37585f">瓣膜只朝一个方向开——保证血液"单向流动"；瓣膜坏了=心脏杂音（血液在"倒车"）</text>
        <text x="260" y="354" textAnchor="middle" fontSize="11" fill="#59767c">考点：心房→心室→动脉的方向由瓣膜锁定；"房室瓣开=动脉瓣关"交替工作</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">心脏瓣膜 · 防止血液"倒车"的门（课外拓展）</text>
    </svg>
  );
}

function SwallowingSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 咽喉侧剖面 */}
      <g style={dim(active, 0)}>
        <path d="M96 96 Q140 84 184 92" fill="none" stroke="#c98a8a" strokeWidth="18" strokeLinecap="round" />
        <text x="100" y="76" fontSize="12.5" fill="#a53030" fontWeight="700">口腔：舌把食团推向咽</text>
        <path d="M196 86 Q232 96 236 132 Q238 156 226 176" fill="none" stroke="#c98a4a" strokeWidth="16" strokeLinecap="round" />
        <ellipse cx="236" cy="182" rx="14" ry="9" fill="#f2e2c9" stroke="#a5761d" strokeWidth="2.2" />
        <text x="258" y="120" fontSize="12.5" fill="#8a671b" fontWeight="700">咽（食物与空气的十字路口）</text>
        <path d="M226 196 Q222 236 216 282" fill="none" stroke="#4d7ea8" strokeWidth="15" strokeLinecap="round" />
        <text x="140" y="300" fontSize="12.5" fill="#2c5a84" fontWeight="700">食道：蠕动推食入胃</text>
        <path d="M252 196 Q268 240 288 276" fill="none" stroke="#7aa87a" strokeWidth="15" strokeLinecap="round" />
        <text x="300" y="298" fontSize="12.5" fill="#2f6f2a" fontWeight="700">气管（通肺）</text>
      </g>
      {/* 会厌封口机制 */}
      <g style={dim(active, 1)}>
        <path d="M246 190 q -16 -20 -4 -34" fill="none" stroke="#a53030" strokeWidth="6" strokeLinecap="round" />
        <text x="268" y="164" fontSize="12.5" fill="#a53030" fontWeight="700">会厌软骨盖住喉口（封气管）</text>
        <path d="M180 78 q 30 -18 58 -2" fill="none" stroke="#8a5aa5" strokeWidth="5" strokeLinecap="round" />
        <text x="250" y="66" fontSize="12.5" fill="#5a4390" fontWeight="700">软腭上抬封住鼻咽（防倒流鼻腔）</text>
        <rect x="316" y="204" width="180" height="82" rx="10" fill="#eef4fb" stroke="#5a7aa5" strokeWidth="2.2" />
        <text x="406" y="226" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">吞咽瞬间（约 0.5 秒）</text>
        <text x="406" y="246" textAnchor="middle" fontSize="11.5" fill="#37585f">呼吸自动暂停 · 三处"封口"</text>
        <text x="406" y="266" textAnchor="middle" fontSize="11.5" fill="#37585f">软腭封鼻 · 会厌封喉 · 声门闭合</text>
        <text x="406" y="282" textAnchor="middle" fontSize="10.5" fill="#59767c">前半段随意（可停）· 后半段纯反射（停不下）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="316" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">吃饭说笑=封口被打断：食物误入气管→黏膜受刺激→剧烈咳嗽反射"排异"</text>
        <text x="260" y="337" textAnchor="middle" fontSize="12" fill="#a5761d">食道蠕动靠环肌·纵肌交替收缩——即使倒立也能把食物"推"进胃（不是靠重力）</text>
        <text x="260" y="357" textAnchor="middle" fontSize="11" fill="#a5761d">考点：咽是消化与呼吸的共同通道——"十字路口"由会厌与软腭分流</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">吞咽 · 会厌的"双保险封口"（课外拓展）</text>
    </svg>
  );
}

function DuodenumSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 胃与十二指肠走形 */}
      <g style={dim(active, 0)}>
        <path d="M60 84 Q60 150 96 168 Q140 186 176 172 Q196 164 204 146" fill="none" stroke="#c98a8a" strokeWidth="26" strokeLinecap="round" />
        <text x="86" y="70" fontSize="12.5" fill="#a53030" fontWeight="700">胃（幽门出口）</text>
        <path d="M204 146 Q224 116 252 116 Q288 118 290 156 Q290 200 252 216 Q216 230 190 214 Q166 198 158 172 Q152 148 158 128" fill="none" stroke="#d8a05a" strokeWidth="24" strokeLinecap="round" />
        <text x="300" y="106" fontSize="12.5" fill="#8a5a2a" fontWeight="700">十二指肠：C 形弯道包绕胰头</text>
        <text x="300" y="124" fontSize="12" fill="#8a5a2a">长 12 指（约 25 cm）·胃的下游</text>
        <path d="M158 130 Q140 210 190 252 Q226 282 280 278" fill="none" stroke="#d8a05a" strokeWidth="20" strokeLinecap="round" opacity="0.75" />
        <text x="286" y="300" fontSize="12" fill="#8a5a2a">→ 空肠（小肠主力段）</text>
      </g>
      {/* 大乳头与消化液汇合 */}
      <g style={dim(active, 1)}>
        <path d="M392 150 q -60 -20 -124 -6" fill="none" stroke="#8a671b" strokeWidth="5" />
        <path d="M392 190 q -70 4 -132 28" fill="none" stroke="#c9a03a" strokeWidth="5" />
        <circle cx="258" cy="166" r="10" fill="#e8c83a" stroke="#8a671b" strokeWidth="2.4" />
        <text x="396" y="146" fontSize="12.5" fill="#8a671b" fontWeight="700">胆总管（胆汁）</text>
        <text x="396" y="192" fontSize="12.5" fill="#8a671b" fontWeight="700">胰管（胰液）</text>
        <text x="258" y="146" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">十二指肠大乳头</text>
        <rect x="288" y="212" width="200" height="72" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="388" y="232" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">此处发生两件大事</text>
        <text x="388" y="252" textAnchor="middle" fontSize="11.5" fill="#a5761d">① 碳酸氢钠中和胃酸（碱性环境）</text>
        <text x="388" y="272" textAnchor="middle" fontSize="11.5" fill="#a5761d">② 胰液·胆汁·肠液"会师"彻底消化</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="318" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">胆汁不含消化酶——只靠胆盐把脂肪乳化成微粒；真正"消化脂肪"的是胰脂肪酶</text>
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#37585f">十二指肠溃疡比胃溃疡更常见：胃酸在这里"火力最猛"，幽门螺杆菌趁机搞破坏</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#59767c">考点：消化液中只有一种酶的器官 vs 多酶混合——胰液是"全能消化酶冠军"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">十二指肠 · 消化的"中转枢纽"（课外拓展）</text>
    </svg>
  );
}

function BloodBrainBarrierSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 血管剖面 */}
      <g style={dim(active, 0)}>
        <rect x="40" y="90" width="220" height="120" rx="52" fill="#f2c9c9" stroke="#b06a6a" strokeWidth="2.6" />
        <rect x="52" y="102" width="196" height="96" rx="44" fill="#fbeaea" />
        <path d="M96 90 L96 210 M168 90 L168 210" fill="none" stroke="#a53030" strokeWidth="5" strokeDasharray="7 5" />
        <circle cx="132" cy="150" r="7" fill="#c93a3a" />
        <circle cx="150" cy="166" r="5" fill="#c93a3a" />
        <circle cx="140" cy="132" r="5" fill="#c93a3a" />
        <text x="150" y="70" textAnchor="middle" fontSize="12.5" fill="#a53030" fontWeight="700">脑毛细血管：内皮"焊死"（紧密连接）</text>
        <text x="150" y="234" textAnchor="middle" fontSize="12" fill="#a53030">血液里的物质不能从细胞缝隙漏过去</text>
        <text x="76" y="118" fontSize="11" fill="#fff" fontWeight="700">血管腔</text>
      </g>
      {/* 星形胶质细胞足突 + 通行清单 */}
      <g style={dim(active, 1)}>
        <path d="M60 78 q 30 -26 60 -12 M140 66 q 40 -18 80 2 M270 96 q 30 10 40 40 M270 200 q 28 -6 40 -34" fill="none" stroke="#c98a4a" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
        <text x="286" y="66" fontSize="12.5" fill="#a5761d" fontWeight="700">星形胶质细胞"脚"包绕血管</text>
        <text x="286" y="84" fontSize="12" fill="#a5761d">第二道岗·参与选择通透</text>
        <rect x="292" y="100" width="200" height="150" rx="12" fill="#eef7ee" stroke="#5a9a5a" strokeWidth="2.4" />
        <text x="392" y="122" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">通行规则（海关清单）</text>
        <text x="304" y="146" fontSize="12" fill="#2f6f2a">✓ O₂ / CO₂ 自由通行</text>
        <text x="304" y="168" fontSize="12" fill="#2f6f2a">✓ 葡萄糖·氨基酸（专门转运体）</text>
        <text x="304" y="190" fontSize="12" fill="#8a671b">⚠ 脂溶性直接穿膜：酒精·咖啡因</text>
        <text x="304" y="212" fontSize="12" fill="#a53030">✗ 多数抗生素·大分子蛋白</text>
        <text x="304" y="234" fontSize="12" fill="#a53030">✗ 血源性毒素与多数病原</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="318" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">双刃剑：保护大脑挡住毒素与病原波动——但也挡住药物（脑膜炎·脑瘤"用药难"）</text>
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#a5761d">酒精·咖啡因能穿屏障所以"上头"快；脑膜炎必须选能穿屏障的特效药</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">结构与功能观：屏障=结构（紧密连接+足突）决定功能（选择通透）的经典例证</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">血脑屏障 · 大脑的"海关"（课外拓展）</text>
    </svg>
  );
}

function MotionSicknessSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 内耳：半规管与前庭 */}
      <g style={dim(active, 0)}>
        <ellipse cx="150" cy="80" rx="52" ry="16" fill="none" stroke="#b06a9a" strokeWidth="7" transform="rotate(-18 150 80)" />
        <ellipse cx="128" cy="120" rx="46" ry="15" fill="none" stroke="#8a6ab0" strokeWidth="7" transform="rotate(42 128 120)" />
        <ellipse cx="178" cy="126" rx="48" ry="15" fill="none" stroke="#6a86b0" strokeWidth="7" transform="rotate(-76 178 126)" />
        <path d="M150 170 a 26 26 0 1 1 -0.1 0 M150 144 a 12 12 0 1 0 0.1 0" fill="none" stroke="#c98a4a" strokeWidth="7" />
        <ellipse cx="152" cy="132" rx="14" ry="17" fill="#e8d0f0" stroke="#8a5aa5" strokeWidth="2.4" />
        <text x="150" y="42" textAnchor="middle" fontSize="12.5" fill="#8a4a7a" fontWeight="700">三条半规管：感知旋转（互成直角）</text>
        <text x="52" y="220" fontSize="12.5" fill="#8a5aa5" fontWeight="700">耳蜗：听声音</text>
        <text x="150" y="244" textAnchor="middle" fontSize="12.5" fill="#8a5aa5" fontWeight="700">前庭（椭圆囊·球囊）：耳石感知直线加速与重力</text>
      </g>
      {/* 感觉冲突流程 */}
      <g style={dim(active, 1)}>
        <rect x="300" y="56" width="196" height="128" rx="12" fill="#eef4fb" stroke="#5a7aa5" strokeWidth="2.4" />
        <circle cx="340" cy="96" r="16" fill="#fff" stroke="#5a7aa5" strokeWidth="2.2" />
        <circle cx="340" cy="96" r="6" fill="#5a7aa5" />
        <text x="362" y="92" fontSize="12.5" fill="#3a5a8a" fontWeight="700">眼睛：盯着手机=「静止」</text>
        <path d="M410 130 q 8 -22 22 -10 q 6 -12 16 -2 q 12 -2 8 10 q 6 10 -8 10 q -4 10 -14 4 q -12 8 -16 -4 q -12 0 -8 -8" fill="#e8d0f0" stroke="#8a5aa5" strokeWidth="2" />
        <text x="330" y="164" fontSize="12.5" fill="#8a4a7a" fontWeight="700">内耳：「一路颠簸=剧烈运动」</text>
        <text x="398" y="152" fontSize="12" fill="#8a5aa5" fontWeight="700">大脑收到矛盾信号</text>
        <line x1="398" y1="184" x2="398" y2="206" stroke="#a53030" strokeWidth="2.6" markerEnd="url(#msArrow)" />
        <rect x="300" y="208" width="196" height="46" rx="12" fill="#fdf1f1" stroke="#a53030" strokeWidth="2.4" />
        <text x="398" y="228" textAnchor="middle" fontSize="12.5" fill="#a53030" fontWeight="800">呕吐中枢被触发：恶心·出冷汗·呕吐</text>
        <text x="398" y="246" textAnchor="middle" fontSize="11" fill="#b06a6a">进化假说：误判"神经中毒"→ 启动排毒反射</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="280" width="448" height="86" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="304" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">晕车本质：内耳（在动）与眼睛（没动）的感觉冲突——坐车看手机更容易晕</text>
        <text x="260" y="326" textAnchor="middle" fontSize="12" fill="#a5761d">预防：看远方地平线 · 坐前排 · 开窗通风 · 提前服晕车药（抑制前庭信号）</text>
        <text x="260" y="348" textAnchor="middle" fontSize="11.5" fill="#a5761d">考点：前庭器官与听觉（耳蜗）都藏在内耳，但功能完全不同——感受刺激类型不同</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">晕车与前庭 · 感觉"打架"（课外拓展）</text>
      <defs>
        <marker id="msArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#a53030" />
        </marker>
      </defs>
    </svg>
  );
}

function BloodVolumeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 人体血量 */}
      <g style={dim(active, 0)}>
        <path d="M150 70 q 80 -30 160 0 q 30 60 0 130 q -40 50 -80 50 q -40 0 -80 -50 q -30 -70 0 -130 Z" fill="#f0c9b0" stroke="#a5765a" strokeWidth="2.8" />
        <path d="M170 100 q 60 -26 120 0 q 20 50 -4 110 q -30 40 -56 40 q -26 0 -56 -40 q -24 -60 -4 -110 Z" fill="#c94a4a" stroke="#8a2020" strokeWidth="2.2" />
        <text x="230" y="266" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="700">成人血量约 4000~5000 mL（体重 7%~8%）</text>
      </g>
      {/* 献血 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="230" width="200" height="110" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="146" y="254" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">献血 200~400 mL 安全吗？</text>
        <text x="146" y="278" textAnchor="middle" fontSize="10.5" fill="#a5761d">不到总血量 10%·身体快速补充</text>
        <text x="146" y="300" textAnchor="middle" fontSize="10.5" fill="#a5761d">水分无机盐数小时内恢复</text>
        <text x="146" y="322" textAnchor="middle" fontSize="10.5" fill="#a5761d">红细胞约 1 个月恢复</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="284" y="230" width="196" height="110" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="382" y="254" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">骨髓"加班"造血</text>
        <text x="382" y="278" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">刺激造血干细胞增殖</text>
        <text x="382" y="300" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">适量献血促进血液"新陈代谢"</text>
        <text x="382" y="322" textAnchor="middle" fontSize="10" fill="#59767c">与健康人：不影响健康（需符合条件）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">人体血量 · 无偿献血的生物学（课外拓展）</text>
    </svg>
  );
}

function EyeColorSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 虹膜 */}
      <g style={dim(active, 0)}>
        <circle cx="230" cy="150" r="86" fill="#f4f0e8" stroke="#a5765a" strokeWidth="3" />
        <circle cx="230" cy="150" r="56" fill="#4a7a9a" stroke="#2a4a6a" strokeWidth="2.6" />
        <circle cx="230" cy="150" r="20" fill="#141414" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M230 150 L ${230 + Math.cos((i * Math.PI) / 3) * 52} ${150 + Math.sin((i * Math.PI) / 3) * 52}`} stroke="#2a4a6a" strokeWidth="1.6" />
        ))}
        {[0, 1].map((i) => (
          <circle key={`h${i}`} cx={222 + i * 10} cy={142} r="4" fill="#ffffff" opacity="0.9" />
        ))}
        <text x="360" y="110" fontSize="12.5" fill="#2a4a6a" fontWeight="700">虹膜的"颜色"来自黑色素</text>
        <text x="360" y="130" fontSize="12" fill="#2a4a6a">黑色素多→棕黑；少→蓝绿</text>
        <text x="360" y="150" fontSize="11.5" fill="#4a6a7a">"蓝眼"其实是色素少+光散射</text>
      </g>
      {/* 遗传 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="240" width="200" height="90" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="146" y="264" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">眼色遗传（简化模型）</text>
        <text x="146" y="288" textAnchor="middle" fontSize="10.5" fill="#a5761d">棕眼相对蓝眼为显性</text>
        <text x="146" y="310" textAnchor="middle" fontSize="10.5" fill="#a5761d">实际由多个基因共同决定</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="274" y="240" width="200" height="90" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="374" y="264" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">为什么全球多数人是深色眼？</text>
        <text x="374" y="288" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">深色虹膜挡紫外线保护视网膜</text>
        <text x="374" y="310" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">高纬度弱紫外 → 浅色眼更"划算"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">虹膜与眼色 · 色素与遗传（课外拓展）</text>
    </svg>
  );
}

function BoneCompositionSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 实验 A：盐酸脱钙 */}
      <g style={dim(active, 0)}>
        <rect x="50" y="60" width="180" height="130" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="140" y="86" textAnchor="middle" fontSize="11.5" fill="#2c5a84" fontWeight="800">实验 A：骨 + 盐酸</text>
        <path d="M100 108 l 24 22 m 32 -22 l -24 22" stroke="#8a9a9f" strokeWidth="2" opacity="0.6" />
        <path d="M96 160 q 44 14 88 0" fill="none" stroke="#b8863a" strokeWidth="10" strokeLinecap="round" />
        <text x="140" y="130" textAnchor="middle" fontSize="10" fill="#59767c">无机盐溶解 → 剩"软骨"</text>
        <text x="140" y="178" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">结果：骨可弯曲打结（柔韧）</text>
      </g>
      {/* 实验 B：燃烧 */}
      <g style={dim(active, 1)}>
        <rect x="274" y="60" width="180" height="130" rx="10" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.4" />
        <text x="364" y="86" textAnchor="middle" fontSize="11.5" fill="#8a3a2a" fontWeight="800">实验 B：骨 + 火烧</text>
        {[0, 1].map((i) => (
          <path key={i} d={`M${344 + i * 24} 116 l 8 -20 m -6 22 l 10 -16`} stroke="#e8a03a" strokeWidth="2.6" strokeLinecap="round" />
        ))}
        <path d="M300 168 q 30 10 60 2" fill="none" stroke="#d8d8d0" strokeWidth="9" strokeLinecap="round" />
        <text x="364" y="130" textAnchor="middle" fontSize="10" fill="#59767c">有机物烧掉 → 剩脆骨</text>
        <text x="364" y="178" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="700">结果：骨一敲即碎（硬脆）</text>
      </g>
      {/* 结论 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="206" width="440" height="80" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="230" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">骨的成分 ≈ 2/3 无机物（钙盐·硬脆）+ 1/3 有机物（骨蛋白·柔韧）</text>
        <text x="260" y="254" textAnchor="middle" fontSize="11" fill="#a5761d">儿童骨有机物多 → 易变形不易折（要防驼背）；老人有机物少 → 易骨折（要防摔倒）</text>
        <text x="260" y="276" textAnchor="middle" fontSize="10.5" fill="#59767c">骨的生长与维持需要钙·维生素 D 与适当运动</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">骨的成分 · 柔韧与坚硬的平衡（课内拓展）</text>
    </svg>
  );
}

function CholesterolSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 脂蛋白 */}
      <g style={dim(active, 0)}>
        <circle cx="130" cy="120" r="44" fill="#d8e8f0" stroke="#4d7ea8" strokeWidth="2.6" />
        <text x="130" y="116" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="800">HDL</text>
        <text x="130" y="132" textAnchor="middle" fontSize="8.5" fill="#4a6a8a">"好胆固醇"</text>
        <circle cx="290" cy="120" r="44" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.6" />
        <text x="290" y="116" textAnchor="middle" fontSize="10" fill="#8a2020" fontWeight="800">LDL</text>
        <text x="290" y="132" textAnchor="middle" fontSize="8.5" fill="#a53030">"坏胆固醇"</text>
        <text x="60" y="190" fontSize="12" fill="#3f7f3a" fontWeight="700">HDL：把胆固醇运回肝脏（清道夫）</text>
        <text x="60" y="212" fontSize="12" fill="#8a3a2a" fontWeight="700">LDL：把胆固醇运到血管壁沉积</text>
      </g>
      {/* 血管斑块 */}
      <g style={dim(active, 1)}>
        <path d="M60 260 q 150 -24 320 0" fill="none" stroke="#c94a4a" strokeWidth="26" strokeLinecap="round" />
        <ellipse cx="300" cy="254" rx="44" ry="16" fill="#e8d8b0" stroke="#a58a2a" strokeWidth="2.4" />
        <text x="300" y="300" textAnchor="middle" fontSize="11.5" fill="#8a671b" fontWeight="700">LDL 沉积 → 粥样斑块 → 血管变窄</text>
        <text x="60" y="330" fontSize="12" fill="#8a3a2a" fontWeight="700">斑块破裂 → 血栓 → 心梗/脑梗</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="334" width="440" height="34" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="356" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">胆固醇是"必需"的（细胞膜·激素原料）——问题在"过多"与"位置不对"（血液中沉积）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">胆固醇 · 血管健康的"隐形风险"（课外拓展）</text>
    </svg>
  );
}

function BloodPlasmaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 试管分层 */}
      <g style={dim(active, 0)}>
        <rect x="80" y="50" width="110" height="190" rx="14" fill="#f8f6ee" stroke="#8a9a9f" strokeWidth="3" />
        <rect x="86" y="58" width="98" height="112" rx="8" fill="#f4e0b8" stroke="#c9a05a" strokeWidth="1.6" />
        <text x="135" y="120" textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="800">血浆 55%</text>
        <text x="135" y="138" textAnchor="middle" fontSize="9" fill="#a5761d">淡黄色液体</text>
        <rect x="88" y="172" width="94" height="16" rx="4" fill="#f4f0e8" stroke="#8a9a9f" strokeWidth="1.4" />
        <text x="135" y="204" textAnchor="middle" fontSize="9" fill="#8a9a9f">白细胞·血小板</text>
        <rect x="88" y="220" width="94" height="16" rx="4" fill="#c94a4a" stroke="#8a2020" strokeWidth="1.4" />
        <text x="135" y="252" textAnchor="middle" fontSize="9" fill="#8a9a9f">红细胞 45%</text>
      </g>
      {/* 血浆成分 */}
      <g style={dim(active, 1)}>
        <rect x="250" y="60" width="160" height="150" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="330" y="86" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">血浆成分（含水 90%）</text>
        {[0, 1, 2, 3].map((i) => {
          const items = ['水 ≈ 90%', '血浆蛋白 7%', '无机盐 0.9%', '葡萄糖·氨基酸·激素·废物'];
          const y = 110 + i * 24;
          return <text key={i} x="330" y={y} textAnchor="middle" fontSize="10.5" fill="#8a671b" fontWeight="600">{items[i]}</text>;
        })}
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="46" y="240" width="130" height="100" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="111" y="264" textAnchor="middle" fontSize="11.5" fill="#2f6f2a" fontWeight="800">血浆 ≠ 血液</text>
        <text x="111" y="288" textAnchor="middle" fontSize="10" fill="#3f7f3a">血浆 = 血液的液体部分</text>
        <text x="111" y="308" textAnchor="middle" fontSize="10" fill="#3f7f3a">血清 = 去纤维蛋白的血浆</text>
        <text x="111" y="328" textAnchor="middle" fontSize="10" fill="#3f7f3a">（与血细胞分层实验互参）</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="250" y="240" width="220" height="126" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="360" y="264" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">内环境视角</text>
        <text x="360" y="288" textAnchor="middle" fontSize="10.5" fill="#37585f">血浆是细胞外液最重要的部分</text>
        <text x="360" y="310" textAnchor="middle" fontSize="10.5" fill="#37585f">运载数百种物质：营养·激素·</text>
        <text x="360" y="330" textAnchor="middle" fontSize="10.5" fill="#37585f">代谢废物·抗体·CO₂ 等</text>
        <text x="360" y="352" textAnchor="middle" fontSize="10" fill="#799398">血浆成分稳定 = 内环境稳态的核心</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">血浆 · 运载血液的"液体载体"（课外拓展）</text>
    </svg>
  );
}

function MuscleFibersSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 慢肌（红肌） */}
      <g style={dim(active, 0)}>
        <rect x="46" y="60" width="200" height="130" rx="10" fill="#f4e0e0" stroke="#c94a4a" strokeWidth="2.4" />
        <text x="146" y="86" textAnchor="middle" fontSize="12" fill="#8a2020" fontWeight="800">慢肌纤维（红肌·I 型）</text>
        <text x="146" y="110" textAnchor="middle" fontSize="10.5" fill="#a5533c">富含毛细血管与线粒体</text>
        <text x="146" y="132" textAnchor="middle" fontSize="10.5" fill="#a5533c">耐力强·不易疲劳·爆发力弱</text>
        <text x="146" y="156" textAnchor="middle" fontSize="10.5" fill="#a5533c">长跑·骑行·候鸟迁徙肌</text>
        <ellipse cx="200" cy="172" rx="18" ry="9" fill="#c94a4a" />
      </g>
      {/* 快肌（白肌） */}
      <g style={dim(active, 1)}>
        <rect x="274" y="60" width="200" height="130" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="374" y="86" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">快肌纤维（白肌·II 型）</text>
        <text x="374" y="110" textAnchor="middle" fontSize="10.5" fill="#37585f">收缩快·力量大·易疲劳</text>
        <text x="374" y="132" textAnchor="middle" fontSize="10.5" fill="#37585f">短跑·跳跃·爆发力项目</text>
        <text x="374" y="156" textAnchor="middle" fontSize="10.5" fill="#37585f">鸡的胸肉"白肉"就是快肌</text>
        <ellipse cx="428" cy="172" rx="18" ry="9" fill="#e8e4d8" stroke="#b5a582" strokeWidth="1.8" />
      </g>
      {/* 分布与训练 */}
      <g style={dim(active, 2)}>
        <rect x="46" y="206" width="440" height="60" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="230" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">比 例 由 遗 传 决 定（可训练微调）</text>
        <text x="260" y="254" textAnchor="middle" fontSize="11" fill="#a5761d">马拉松选手慢肌多 · 短跑选手快肌多——"天生材料"与后天训练匹配</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="284" width="440" height="76" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="308" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">候鸟迁徙肌 = 慢肌"增强版"：脂肪供能 · 可连续飞行数天</text>
        <text x="260" y="332" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">雄性招潮蟹大螯·鸣禽发声肌——"特化肌肉"遍布动物界</text>
        <text x="260" y="352" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">红肌色的来源：肌红蛋白（储氧）——与血红蛋白"同族"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">肌纤维 · 红肌与白肌（课内拓展）</text>
    </svg>
  );
}

function YawningSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 打哈欠的头 */}
      <g style={dim(active, 0)}>
        <circle cx="220" cy="150" r="70" fill="#f0c9b0" stroke="#a5765a" strokeWidth="3" />
        <path d="M172 130 q 20 10 42 4 m -36 -18 q 12 8 26 4" fill="none" stroke="#5a3a2a" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M270 128 q 6 -14 16 -16 m -18 22 q 10 2 16 10" fill="none" stroke="#5a3a2a" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M190 180 q 30 40 60 0 q -30 24 -60 0 Z" fill="#8a3a4a" stroke="#5a1a2a" strokeWidth="2.4" />
        <text x="360" y="120" fontSize="12.5" fill="#8a3a4a" fontWeight="700">哈欠：深吸气 + 张口呼气</text>
        <text x="360" y="142" fontSize="12" fill="#8a3a4a">持续约 6 秒·常伴伸展</text>
      </g>
      {/* 假说 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="216" width="216" height="100" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="154" y="240" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">为什么打哈欠？</text>
        <text x="154" y="264" textAnchor="middle" fontSize="10.5" fill="#37585f">大脑冷却假说：降温提神</text>
        <text x="154" y="286" textAnchor="middle" fontSize="10.5" fill="#37585f">觉醒假说：无聊·困倦时提升警觉</text>
        <text x="154" y="308" textAnchor="middle" fontSize="10.5" fill="#59767c">胎儿 11 周就会打哈欠！</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="282" y="216" width="196" height="100" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="380" y="240" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">传染性哈欠</text>
        <text x="380" y="264" textAnchor="middle" fontSize="10.5" fill="#a5761d">看到·听到甚至想到都触发</text>
        <text x="380" y="288" textAnchor="middle" fontSize="10.5" fill="#a5761d">与共情能力相关（自闭症儿童较少被"传染"）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">打哈欠 · 会"传染"的反射（课外拓展）</text>
    </svg>
  );
}

function ThyroidSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 腺体 */}
      <g style={dim(active, 0)}>
        <path d="M180 140 q -20 -50 40 -58 q 30 -4 40 16 q 10 -20 40 -16 q 60 8 40 58 q -14 44 -80 48 q -66 -4 -80 -48 Z" fill="#d8a898" stroke="#8a4a3a" strokeWidth="2.8" />
        <path d="M260 82 v 60" stroke="#8a4a3a" strokeWidth="2.4" />
        <text x="356" y="110" fontSize="12.5" fill="#8a4a3a" fontWeight="700">甲状腺（喉下·蝴蝶形）</text>
        <text x="392" y="130" fontSize="12" fill="#8a4a3a">分泌甲状腺激素</text>
      </g>
      {/* 激素作用 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="196" width="210" height="96" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="151" y="220" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">甲状腺激素三件事</text>
        <text x="151" y="244" textAnchor="middle" fontSize="11" fill="#a5761d">提高细胞代谢（产热）</text>
        <text x="151" y="264" textAnchor="middle" fontSize="11" fill="#a5761d">促进生长发育（幼年缺→呆小症）</text>
        <text x="151" y="284" textAnchor="middle" fontSize="11" fill="#a5761d">提高神经系统的兴奋性</text>
      </g>
      {/* 碘与大脖子 */}
      <g style={dim(active, 2)}>
        <rect x="286" y="196" width="190" height="96" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="381" y="220" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">碘是"原料"</text>
        <text x="381" y="244" textAnchor="middle" fontSize="10.5" fill="#37585f">缺碘 → 甲状腺代偿性肿大</text>
        <text x="381" y="264" textAnchor="middle" fontSize="10.5" fill="#37585f">（"大脖子病"·内陆山区常见）</text>
        <text x="381" y="284" textAnchor="middle" fontSize="10.5" fill="#59767c">食盐加碘——公共卫生的胜利</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="304" width="440" height="66" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="328" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">分级调节：下丘脑→垂体→甲状腺；激素过多反过来抑制上级（负反馈）</text>
        <text x="260" y="352" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">甲亢：代谢亢进·易怒消瘦；甲减：代谢低下·嗜睡臃肿——本站甲状腺轴实验互动</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">甲状腺 · 代谢的"恒温器"（课外拓展）</text>
    </svg>
  );
}

function MyopiaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 正常眼 */}
      <g style={dim(active, 0)}>
        <circle cx="120" cy="150" r="70" fill="#f4f0e8" stroke="#a5765a" strokeWidth="2.8" />
        <path d="M50 150 q 70 -30 140 0" fill="none" stroke="#7ab0d8" strokeWidth="8" opacity="0.7" />
        <circle cx="120" cy="150" r="24" fill="#d8c8a8" stroke="#8a5a3a" strokeWidth="2.2" />
        <text x="120" y="244" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="700">正常眼：焦点落在视网膜上</text>
      </g>
      {/* 近视眼 */}
      <g style={dim(active, 1)}>
        <circle cx="340" cy="150" r="70" fill="#f4f0e8" stroke="#a5765a" strokeWidth="2.8" />
        <path d="M270 150 q 70 -30 140 0" fill="none" stroke="#7ab0d8" strokeWidth="8" opacity="0.7" />
        <circle cx="340" cy="150" r="24" fill="#d8c8a8" stroke="#8a5a3a" strokeWidth="2.2" />
        <ellipse cx="424" cy="150" rx="9" ry="9" fill="#b0483a" stroke="#8a2020" strokeWidth="1.6" />
        <text x="420" y="128" textAnchor="middle" fontSize="11" fill="#8a2020" fontWeight="700">焦点在视网膜前</text>
        <text x="340" y="244" textAnchor="middle" fontSize="12.5" fill="#8a2020" fontWeight="700">近视眼：眼球前后径过长（或晶状体过厚）</text>
      </g>
      {/* 矫正 */}
      <g style={dim(active, 2)}>
        <path d="M120 300 h 280" stroke="#8a9a9f" strokeWidth="2" />
        <path d="M160 300 q 30 -60 60 0" fill="none" stroke="#4d7ea8" strokeWidth="4" />
        <path d="M280 300 q 30 -60 60 0" fill="none" stroke="#4d7ea8" strokeWidth="4" />
        <text x="190" y="330" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="700">凹透镜矫正近视（发散光线）</text>
        <text x="374" y="270" textAnchor="middle" fontSize="11" fill="#59767c">凸透镜矫正远视</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="334" width="440" height="34" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="356" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">预防："一尺一拳一寸" · 户外活动 2 小时（自然光抑制眼轴增长）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">近视与矫正 · 视觉健康（课内拓展）</text>
    </svg>
  );
}

function MuscleSorenessSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 跑步者 */}
      <g style={dim(active, 0)}>
        <circle cx="230" cy="80" r="18" fill="#f0c9b0" stroke="#a5765a" strokeWidth="2.4" />
        <path d="M230 100 q -20 40 -8 78 l 40 4 q 10 -44 -4 -82 Z" fill="#e8705a" stroke="#a53030" strokeWidth="2.4" />
        <path d="M222 182 l -18 66 m 46 -60 l 20 62" fill="none" stroke="#3a5a8a" strokeWidth="8" strokeLinecap="round" />
        <path d="M224 100 q -18 14 -30 8 m 44 2 q 18 10 26 24" fill="none" stroke="#f0c9b0" strokeWidth="7" strokeLinecap="round" />
        <text x="150" y="270" textAnchor="middle" fontSize="12" fill="#8a5a3a" fontWeight="700">剧烈运动中的肌肉</text>
      </g>
      {/* 乳酸真相 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="60" width="210" height="120" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="151" y="84" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">"乳酸导致酸痛"是误传！</text>
        <text x="151" y="108" textAnchor="middle" fontSize="10.5" fill="#a5761d">运动当下：肌肉内乳酸↑ · pH↓</text>
        <text x="151" y="128" textAnchor="middle" fontSize="10.5" fill="#a5761d">（灼烧感）但 1 小时内即被代谢清除</text>
        <text x="151" y="152" textAnchor="middle" fontSize="10.5" fill="#a5761d">第二天的酸痛 = 延迟性肌肉酸痛（DOMS）</text>
      </g>
      {/* 无氧呼吸 */}
      <g style={dim(active, 2)}>
        <rect x="280" y="60" width="196" height="120" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="378" y="84" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">肌肉的无氧呼吸</text>
        <text x="378" y="108" textAnchor="middle" fontSize="10.5" fill="#37585f">葡萄糖 → 乳酸 + 少量 ATP</text>
        <text x="378" y="130" textAnchor="middle" fontSize="10.5" fill="#37585f">氧气不足时的"应急供能通道"</text>
        <text x="378" y="154" textAnchor="middle" fontSize="10.5" fill="#59767c">乳酸可被肝脏重新转为葡萄糖（科里循环）</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="288" width="440" height="76" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">DOMS：肌肉纤维微损伤引发炎症——"练后酸"是适应的开始</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">循序渐进 + 充分热身拉伸——避免突然高强度训练</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">与内环境联系：剧烈运动时乳酸进入血浆——内环境 pH 的缓冲挑战</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">运动与乳酸 · 无氧呼吸的代价（课内拓展）</text>
    </svg>
  );
}

function FontanelleSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 婴儿头骨 */}
      <g style={dim(active, 0)}>
        <circle cx="220" cy="160" r="90" fill="#f0c9b0" stroke="#a5765a" strokeWidth="3" />
        <path d="M220 74 v 90 m -76 -20 q 76 -30 152 0" fill="none" stroke="#a5765a" strokeWidth="2.6" />
        {[0, 1].map((i) => (
          <path key={i} d={`M${150 + i * 140} 108 q ${70 - i * 140} -34 ${140 - i * 140} -4`} fill="none" stroke="#a5765a" strokeWidth="2.2" />
        ))}
        <path d="M196 60 q 24 -14 48 0 q -24 -22 -48 0 Z" fill="#f4d8c0" stroke="#a5765a" strokeWidth="2" />
        <text x="380" y="120" fontSize="12.5" fill="#8a5a3a" fontWeight="700">颅骨 5 块"骨板"未合拢</text>
        <text x="380" y="140" fontSize="12.5" fill="#8a5a3a" fontWeight="700">留下的柔软"天窗" = 囟门</text>
      </g>
      {/* 前囟后囟 */}
      <g style={dim(active, 1)}>
        <circle cx="220" cy="86" r="9" fill="#e8a03a" stroke="#8a671b" strokeWidth="2" />
        <circle cx="220" cy="152" r="6" fill="#e8a03a" stroke="#8a671b" strokeWidth="1.8" />
        <text x="48" y="248" fontSize="12.5" fill="#8a671b" fontWeight="700">前囟（菱形·约 1~2 岁闭合）</text>
        <text x="48" y="268" fontSize="12" fill="#8a671b">后囟（三角形·出生后 2~3 个月闭合）</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">囟门的两大功能：分娩时骨板"重叠"便于通过产道 · 给快速发育的大脑留"扩建空间"</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">囟门处能看到脉搏跳动（别害怕）· 平时注意保护、避免碰撞</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">囟门早闭可能限制脑发育·长期膨隆提示颅内压升高——都是就医信号</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">囟门 · 婴儿颅骨的"天窗"（课外拓展）</text>
    </svg>
  );
}

function NailSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 指甲结构 */}
      <g style={dim(active, 0)}>
        <path d="M140 200 q 0 -110 120 -110 q 120 0 120 110 l -30 90 q -90 30 -180 0 Z" fill="#f8e8e0" stroke="#c99a8a" strokeWidth="2.8" />
        <path d="M170 120 q 90 -46 180 0 l -10 60 q -80 34 -160 0 Z" fill="#f8d8d0" stroke="#c99a8a" strokeWidth="2" />
        <ellipse cx="230" cy="118" rx="22" ry="12" fill="#f8f0e8" stroke="#c9b8a8" strokeWidth="1.8" />
        <text x="392" y="120" fontSize="12.5" fill="#8a5a3a" fontWeight="700">甲板（角蛋白板）</text>
        <text x="360" y="164" fontSize="12.5" fill="#8a5a3a" fontWeight="700">甲母质（生长源头）</text>
        <text x="392" y="204" fontSize="12.5" fill="#8a5a3a" fontWeight="700">甲床（下方的"地基"）</text>
      </g>
      {/* 月牙与健康 */}
      <g style={dim(active, 1)}>
        <path d="M170 130 a 34 26 0 0 1 60 0 q -30 16 -60 0 Z" fill="#f8f8f8" stroke="#d8d8d0" strokeWidth="1.6" />
        <text x="60" y="150" fontSize="12.5" fill="#8a671b" fontWeight="700">甲半月（"月牙"）= 甲母质.visible 部分</text>
        <text x="60" y="172" fontSize="12" fill="#8a671b">指甲每月长 2~3 毫米（手指比脚趾快）</text>
        <text x="60" y="194" fontSize="12" fill="#8a671b">指甲是皮肤角蛋白的"衍生结构"</text>
      </g>
      {/* 信号 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">指甲是健康的"显示屏"：勺状甲提示缺铁 · 甲床发蓝提示缺氧</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#537078">横向凹沟（ Beau 线）记录了一场大病或高烧的"时间戳"</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#537078">角蛋白与头发同源——"指甲美容"的生物学边界（过度美甲伤甲母质）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">指甲 · 角蛋白的"健康窗口"（课外拓展）</text>
    </svg>
  );
}

function HandednessSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 大脑偏侧化 */}
      <g style={dim(active, 0)}>
        <path d="M180 110 q -40 6 -44 50 q -4 44 34 58 q 40 14 56 -18 q 14 -34 -8 -62 q -18 -24 -38 -28 Z" fill="#e8b8c8" stroke="#a5486a" strokeWidth="2.6" />
        <path d="M340 110 q 40 6 44 50 q 4 44 -34 58 q -40 14 -56 -18 q -14 -34 8 -62 q 18 -24 38 -28 Z" fill="#b8c8e8" stroke="#4a6a9a" strokeWidth="2.6" />
        <text x="214" y="130" fontSize="11.5" fill="#8a3a5a" fontWeight="700">左脑：语言·逻辑</text>
        <text x="214" y="150" fontSize="11.5" fill="#8a3a5a">控制右手</text>
        <text x="214" y="240" fontSize="11.5" fill="#4a6a9a" fontWeight="700">右脑：空间·音乐</text>
        <text x="214" y="260" fontSize="11.5" fill="#4a6a9a">控制左手</text>
      </g>
      {/* 统计 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="286" width="216" height="70" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="154" y="310" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">约 90% 人是右利手</text>
        <text x="154" y="332" textAnchor="middle" fontSize="10.5" fill="#a5761d">左撇子约 10%·古今中外比例稳定</text>
        <text x="154" y="348" textAnchor="middle" fontSize="10" fill="#a5761d">提示有遗传基础（可能与单基因相关）</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="286" y="286" width="190" height="70" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="381" y="310" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">不是"习惯"，是偏侧化</text>
        <text x="381" y="332" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">胎儿期吮吸偏好已现端倪</text>
        <text x="381" y="348" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">强行改手可能引起口吃紧张</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">利手 · 大脑的左右分工（课外拓展）</text>
    </svg>
  );
}

function CartilageSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 耳廓软骨 */}
      <g style={dim(active, 0)}>
        <path d="M110 130 q -16 -40 24 -50 q 40 -10 56 18 q 12 22 -6 40 q -22 20 -46 8 q -24 -10 -28 -16 Z" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2.6" />
        <text x="60" y="170" fontSize="12.5" fill="#8a5a3a" fontWeight="700">弹性软骨：耳廓·鼻尖（捏了会弹回）</text>
      </g>
      {/* 关节透明软骨 */}
      <g style={dim(active, 1)}>
        <path d="M250 130 q 20 -30 60 -26 l 60 10 q 20 6 16 26 q -6 20 -30 16 l -50 -6 q -40 -2 -56 -20 Z" fill="#d8e8f0" stroke="#4d7ea8" strokeWidth="2.6" />
        <path d="M266 136 q 30 -10 54 -4" fill="none" stroke="#8ab4d8" strokeWidth="2" />
        <text x="300" y="178" fontSize="12.5" fill="#2c5a84" fontWeight="700">透明软骨：关节"减震垫"</text>
        <text x="330" y="198" fontSize="12" fill="#4b6c73">摩擦系数比人工关节低数十倍</text>
      </g>
      {/* 纤维软骨 */}
      <g style={dim(active, 2)}>
        <path d="M96 260 q 30 -18 70 -8 l 60 6 q 24 4 20 22 q -6 16 -30 12 l -60 -4 q -40 2 -60 -28 Z" fill="#f4f0e4" stroke="#8a671b" strokeWidth="2.6" />
        <text x="96" y="330" fontSize="12.5" fill="#8a671b" fontWeight="700">纤维软骨：椎间盘·半月板（抗压"垫片"）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="260" y="364" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">软骨无血管神经——靠关节液"泡着"供养，损伤后极难自愈（运动护膝的意义）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">软骨 · 关节的"减震垫"（课外拓展）</text>
    </svg>
  );
}

function PainReceptorSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 皮肤痛觉感受器 */}
      <g style={dim(active, 0)}>
        <path d="M80 120 h 360 q 14 0 14 14 v 56 q 0 14 -14 14 h -360 q -14 0 -14 -14 v -56 q 0 -14 14 -14 Z" fill="#f4d0b8" stroke="#a5765a" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={120 + i * 80} cy={152} r="8" fill="#c94a4a" stroke="#8a2020" strokeWidth="1.8" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={`n${i}`} d={`M${120 + i * 80} 160 v 30`} stroke="#b0483a" strokeWidth="2.6" strokeLinecap="round" />
        ))}
        <text x="96" y="106" fontSize="12.5" fill="#8a2020" fontWeight="700">痛觉感受器（游离神经末梢）</text>
        <text x="96" y="230" fontSize="12" fill="#8a5a3a">遍布皮肤·内脏·肌肉——"报警器"密布全身</text>
      </g>
      {/* 反射 */}
      <g style={dim(active, 1)}>
        <path d="M260 208 q 0 34 -30 48" fill="none" stroke="#4d7ea8" strokeWidth="3.4" strokeLinecap="round" />
        <text x="60" y="266" fontSize="12.5" fill="#2c5a84" fontWeight="700">缩手反射快于"感到痛"——先撤手后觉痛（保命优先）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">痛觉 = 危险警报：先天性无痛觉症患者因感觉不到受伤而伤痕累累</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">痛觉没有"适应"（不会因持续刺激而忽略）——这是演化的"安全设计"</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">痛觉在大脑皮层产生——"幻觉肢痛"说明痛觉最终是大脑的"解读"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">痛觉 · 身体永不熄灭的"警报器"（课外拓展）</text>
    </svg>
  );
}

function UmbilicusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 胎儿-胎盘 */}
      <g style={dim(active, 0)}>
        <ellipse cx="160" cy="120" rx="64" ry="42" fill="#f0c9b0" stroke="#a5765a" strokeWidth="2.8" />
        <text x="160" y="196" textAnchor="middle" fontSize="12" fill="#8a5a3a" fontWeight="700">胎儿在子宫内</text>
        <path d="M214 108 q 40 -20 70 -14" fill="none" stroke="#b05a5a" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="320" cy="90" rx="52" ry="30" fill="#8a3a3a" stroke="#5a2020" strokeWidth="2.6" />
        <text x="320" y="50" textAnchor="middle" fontSize="12.5" fill="#5a2020" fontWeight="700">胎盘（交换站）</text>
      </g>
      {/* 脐带 */}
      <g style={dim(active, 1)}>
        <path d="M216 112 Q 260 96 288 94" fill="none" stroke="#d88a8a" strokeWidth="4" strokeLinecap="round" />
        <text x="60" y="236" fontSize="12.5" fill="#8a3a4a" fontWeight="700">脐带：两条脐动脉 + 一条脐静脉</text>
        <text x="60" y="256" fontSize="12" fill="#8a3a4a">结扎剪断后留下的"痕迹"= 肚脐</text>
        <path d="M150 232 q 40 10 80 0" fill="none" stroke="#8a3a4a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 要点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">肚脐是"疤痕"而非器官：所有人都是"从肚子上的疤"开始生命故事</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">脐静脉出生后闭锁成"肝圆韧带"——血管"改行"的演化巧思</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">肚脐形状与剪脐带方式无关，取决于愈合时的个体差异（别再比谁的圆）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">肚脐 · 生命连接的"纪念章"（课外拓展）</text>
    </svg>
  );
}

function LactoseIntoleranceSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 正常消化 */}
      <g style={dim(active, 0)}>
        <rect x="46" y="60" width="200" height="130" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="146" y="86" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">乳糖酶充足（多数成人祖先牧奶）</text>
        <text x="146" y="112" textAnchor="middle" fontSize="11" fill="#3f7f3a">乳糖（双糖）</text>
        <text x="146" y="132" textAnchor="middle" fontSize="11" fill="#3f7f3a">→ 乳糖酶水解 →</text>
        <text x="146" y="152" textAnchor="middle" fontSize="11" fill="#3f7f3a">葡萄糖 + 半乳糖（吸收）</text>
        <text x="146" y="174" textAnchor="middle" fontSize="10.5" fill="#59767c">喝奶无恙·还补钙</text>
      </g>
      {/* 不耐受 */}
      <g style={dim(active, 1)}>
        <rect x="274" y="60" width="200" height="130" rx="12" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.4" />
        <text x="374" y="86" textAnchor="middle" fontSize="12" fill="#8a3a2a" fontWeight="800">乳糖酶不足（成人普遍现象）</text>
        <text x="374" y="112" textAnchor="middle" fontSize="11" fill="#a5533c">乳糖未被分解 → 进入大肠</text>
        <text x="374" y="132" textAnchor="middle" fontSize="11" fill="#a5533c">细菌发酵产气 → 腹胀腹泻</text>
        <text x="374" y="152" textAnchor="middle" fontSize="11" fill="#a5533c">渗透压升高 → 水分入肠</text>
        <text x="374" y="174" textAnchor="middle" fontSize="10.5" fill="#59767c">喝奶"闹肚子"不是过敏</text>
      </g>
      {/* 演化视角 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">有趣真相：断奶后"关闭"乳糖酶基因才是哺乳动物的默认程序</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">欧洲等牧奶民族演化出"乳糖酶持续"基因突变（约 7500 年前）——基因与文化共同演化</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">对策：无乳糖奶·酸奶（菌已预消化）·少量多次</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">乳糖不耐受 · 基因与饮食文化（课外拓展）</text>
    </svg>
  );
}

function TwinsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 同卵 */}
      <g style={dim(active, 0)}>
        <rect x="46" y="60" width="200" height="150" rx="12" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="146" y="86" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">同卵双胞胎（一个受精卵）</text>
        <circle cx="110" cy="130" r="18" fill="#f4d0b8" stroke="#a5765a" strokeWidth="2.2" />
        <circle cx="150" cy="130" r="18" fill="#f4d0b8" stroke="#a5765a" strokeWidth="2.2" />
        <text x="130" y="168" textAnchor="middle" fontSize="10.5" fill="#37585f">受精卵分裂成两个胚胎</text>
        <text x="130" y="188" textAnchor="middle" fontSize="10.5" fill="#37585f">遗传物质几乎完全相同</text>
      </g>
      {/* 异卵 */}
      <g style={dim(active, 1)}>
        <rect x="274" y="60" width="200" height="150" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="374" y="86" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">异卵双胞胎（两个受精卵）</text>
        <circle cx="330" cy="130" r="18" fill="#f4d0b8" stroke="#a5765a" strokeWidth="2.2" />
        <circle cx="370" cy="130" r="18" fill="#e8c9a8" stroke="#8a5a3a" strokeWidth="2.2" />
        <text x="374" y="168" textAnchor="middle" fontSize="10.5" fill="#37585f">两个卵同时受精</text>
        <text x="374" y="188" textAnchor="middle" fontSize="10.5" fill="#37585f">遗传相似度如普通兄妹（50%）</text>
      </g>
      {/* 龙凤胎 */}
      <g style={dim(active, 2)}>
        <rect x="60" y="228" width="400" height="60" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="260" y="252" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">"龙凤胎"必是异卵：性别不同的双胞胎不可能来自同一个受精卵</text>
        <text x="260" y="274" textAnchor="middle" fontSize="11" fill="#3f7f3a">同卵双胞胎是天然的"克隆研究组"——研究遗传与环境影响的绝佳样本</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="306" width="440" height="48" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="326" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">考点：同卵=1 个受精卵分裂（性别必同）· 异卵=2 个卵分别受精（性别可不同）</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#a5761d">双胞胎率与遗传（母系家族）·辅助生殖技术相关</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">双胞胎 · 胚胎发育的两种起点（课外拓展）</text>
    </svg>
  );
}

function SweatGlandSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 皮肤剖面 + 汗腺 */}
      <g style={dim(active, 0)}>
        <path d="M80 120 h 360 q 14 0 14 14 v 70 q 0 14 -14 14 h -360 q -14 0 -14 -14 v -70 q 0 -14 14 -14 Z" fill="#f4d0b8" stroke="#a5765a" strokeWidth="2.8" />
        <path d="M66 218 h 388 v 46 q 0 14 -14 14 h -360 q -14 0 -14 -14 Z" fill="#f8e4d4" stroke="#c99a7a" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M${170 + i * 100} 138 q -4 30 0 60 q -30 30 8 52`} fill="none" stroke="#4d7ea8" strokeWidth="4" strokeLinecap="round" />
            <circle cx={178 + i * 100} cy={254} r="9" fill="#d8e8f0" stroke="#2c5a84" strokeWidth="1.8" />
            <path d={`M${172 + i * 100} 134 v -12`} stroke="#b0483a" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        ))}
        <text x="392" y="146" fontSize="12.5" fill="#2c5a84" fontWeight="700">汗腺：盘曲的管状腺</text>
        <text x="392" y="168" fontSize="12" fill="#4b6c73">导管开口于皮肤表面</text>
      </g>
      {/* 出汗原理 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="252" width="216" height="86" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="154" y="276" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">出汗 = 蒸发散热</text>
        <text x="154" y="298" textAnchor="middle" fontSize="11" fill="#37585f">汗液蒸发带走热量</text>
        <text x="154" y="318" textAnchor="middle" fontSize="11" fill="#37585f">人体最有效的"降温系统"</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="282" y="252" width="198" height="86" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="381" y="276" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">汗液 ≠ 只排水</text>
        <text x="381" y="298" textAnchor="middle" fontSize="11" fill="#a5761d">还排出无机盐·少量尿素</text>
        <text x="381" y="318" textAnchor="middle" fontSize="11" fill="#a5761d">大出汗后要补盐不是空话</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">汗腺发达 = 人类耐跑的秘密：全身 200~500 万汗腺，散热能力冠绝哺乳动物</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#3f7f3a">汗液本身几乎无味——"汗味"来自皮肤细菌分解汗液成分</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">汗腺 · 人体的"空调系统"（课外拓展）</text>
    </svg>
  );
}

function HairSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 皮肤剖面与毛囊 */}
      <g style={dim(active, 0)}>
        <path d="M80 130 h 360 q 14 0 14 14 v 56 q 0 14 -14 14 h -360 q -14 0 -14 -14 v -56 q 0 -14 14 -14 Z" fill="#f4d0b8" stroke="#a5765a" strokeWidth="2.8" />
        <path d="M66 214 h 388 v 40 q 0 14 -14 14 h -360 q -14 0 -14 -14 Z" fill="#f8e4d4" stroke="#c99a7a" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M${160 + i * 100} 216 q ${-6 - i * 2} -60 0 -86`} fill="none" stroke="#8a5a3a" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx={160 + i * 100} cy={232} rx="14" ry="10" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2" />
            <path d={`M${160 + i * 100} 230 l -14 10 m 14 -10 l 14 10`} stroke="#a5765a" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        ))}
        <text x="392" y="150" fontSize="12.5" fill="#8a5a3a" fontWeight="700">毛囊（毛的"根"）</text>
        <text x="358" y="244" fontSize="12.5" fill="#8a5a3a" fontWeight="700">毛球底部的毛乳头供营养</text>
      </g>
      {/* 竖毛肌 */}
      <g style={dim(active, 1)}>
        {[0, 1].map((i) => (
          <path key={i} d={`M${146 + i * 100} 196 l 18 22`} stroke="#b0483a" strokeWidth="3" strokeLinecap="round" />
        ))}
        <text x="46" y="196" fontSize="12.5" fill="#b0483a" fontWeight="700">竖毛肌收缩 → "鸡皮疙瘩"</text>
        <text x="46" y="216" fontSize="12" fill="#a5761d">（祖先立毛保暖/威吓的遗迹）</text>
      </g>
      {/* 生长周期 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="76" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">毛发生长周期：生长期（2~6 年）→ 退行期 → 休止期脱落→ 再生</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">每天掉 50~100 根头发属正常"代谢"；毛囊坏死则不再长（秃发的根源）</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">功能演化：保暖·防晒·触觉"天线"——人类只剩头发等少数区域浓密</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">毛发 · 皮肤的附属结构（课外拓展）</text>
    </svg>
  );
}

function GrowthPlateSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 长骨剖面 */}
      <g style={dim(active, 0)}>
        <path d="M150 70 h 220 q 24 0 24 26 v 20 h -44 v 160 h 44 v 20 q 0 26 -24 26 h -220 q -24 0 -24 -26 v -20 h 44 v -160 h -44 v -20 q 0 -26 24 -26 Z" fill="#f4f0e4" stroke="#b5a582" strokeWidth="3" transform="rotate(90 260 190)" />
        <rect x="236" y="80" width="48" height="18" rx="6" fill="#8ac8e8" stroke="#2c5a84" strokeWidth="2.2" />
        <rect x="236" y="282" width="48" height="18" rx="6" fill="#8ac8e8" stroke="#2c5a84" strokeWidth="2.2" />
        <text x="386" y="96" fontSize="12.5" fill="#2c5a84" fontWeight="700">生长板（骺板·软骨）</text>
        <line x1="400" y1="100" x2="286" y2="90" stroke="#2c5a84" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="376" y="288" fontSize="12.5" fill="#2c5a84" fontWeight="700">两端各一块·软骨细胞增殖</text>
      </g>
      {/* 激素调控 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="60" width="130" height="80" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="111" y="84" textAnchor="middle" fontSize="11.5" fill="#2f6f2a" fontWeight="800">生长激素</text>
        <text x="111" y="104" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">垂体分泌·刺激生长板</text>
        <text x="111" y="122" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">过多→巨人症 过少→侏儒</text>
      </g>
      {/* 闭合 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="300" width="440" height="64" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">青春期结束时生长板"闭合"（软骨骨化）——身高就此"封顶"</text>
        <text x="260" y="348" textAnchor="middle" fontSize="11.5" fill="#a5761d">女孩约 14~16 岁·男孩约 16~18 岁闭合——性激素是闭合的"发令枪"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">生长板 · 长高的秘密（课外拓展）</text>
    </svg>
  );
}

function WisdomToothSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 颌骨示意 */}
      <g style={dim(active, 0)}>
        <path d="M110 120 q 150 -40 300 0 q -20 60 -70 74 l -160 0 q -50 -14 -70 -74 Z" fill="#f0c9b0" stroke="#a5765a" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={136 + i * 46} y={132} width="30" height="34" rx="5" fill="#f8f6ee" stroke="#b5a582" strokeWidth="1.8" />
        ))}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={150 + i * 54} cy={172} r="5" fill="#d88a6a" stroke="#a5533c" strokeWidth="1.4" />
        ))}
        <text x="336" y="128" fontSize="12.5" fill="#8a5a3a" fontWeight="700">现代人的"拥挤"颌骨</text>
        <text x="336" y="148" fontSize="12" fill="#8a671b" fontWeight="600">智齿常常"横着长"（阻生）</text>
      </g>
      {/* 演化解释 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="212" width="210" height="86" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="151" y="238" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">祖先的"刚需"</text>
        <text x="151" y="260" textAnchor="middle" fontSize="10.5" fill="#a5761d">远古人类吃生硬食物</text>
        <text x="151" y="278" textAnchor="middle" fontSize="10.5" fill="#a5761d">颌骨宽大 · 需要三颗磨牙</text>
        <rect x="274" y="212" width="200" height="86" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="374" y="238" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">现代的"尴尬"</text>
        <text x="374" y="260" textAnchor="middle" fontSize="10.5" fill="#37585f">食物精细 → 颌骨变小</text>
        <text x="374" y="278" textAnchor="middle" fontSize="10.5" fill="#37585f">智齿空间不足 → 阻生发炎</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="312" width="440" height="52" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="334" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">智齿是"演化遗迹"器官：环境变了，祖先的装备还在</text>
        <text x="260" y="354" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">同类的遗迹结构：阑尾·智齿·动耳肌·尾椎骨——演化留下的"历史档案"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">智齿 · 演化遗迹器官（课外拓展）</text>
    </svg>
  );
}

function SalivaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 三对唾液腺 */}
      <g style={dim(active, 0)}>
        <ellipse cx="200" cy="92" rx="34" ry="22" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2.4" />
        <ellipse cx="320" cy="92" rx="34" ry="22" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2.4" />
        <text x="260" y="52" textAnchor="middle" fontSize="12.5" fill="#8a5a3a" fontWeight="700">腮腺（最大·位于耳前）</text>
        <ellipse cx="216" cy="168" rx="26" ry="20" fill="#e8c9a8" stroke="#a5765a" strokeWidth="2.2" />
        <ellipse cx="304" cy="168" rx="26" ry="20" fill="#e8c9a8" stroke="#a5765a" strokeWidth="2.2" />
        <text x="330" y="196" fontSize="12.5" fill="#8a5a3a" fontWeight="700">下颌下腺·舌下腺</text>
        <path d="M250 130 q 10 20 0 30 m -40 -20 q -6 24 4 34" fill="none" stroke="#a5765a" strokeWidth="2" strokeDasharray="3 3" />
      </g>
      {/* 唾液成分 */}
      <g style={dim(active, 1)}>
        <rect x="44" y="222" width="216" height="86" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="152" y="246" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">唾液的"三合一"功能</text>
        <text x="152" y="268" textAnchor="middle" fontSize="11" fill="#37585f">唾液淀粉酶：淀粉 → 麦芽糖</text>
        <text x="152" y="288" textAnchor="middle" fontSize="11" fill="#37585f">溶菌酶杀菌 · 湿润食物成食团</text>
      </g>
      {/* 实验 */}
      <g style={dim(active, 2)}>
        <rect x="280" y="222" width="196" height="86" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="378" y="246" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">家庭小实验</text>
        <text x="378" y="268" textAnchor="middle" fontSize="10.5" fill="#a5761d">米饭嚼 1 分钟 vs 不嚼，滴碘液：</text>
        <text x="378" y="288" textAnchor="middle" fontSize="10.5" fill="#a5761d">不嚼变蓝（淀粉在）· 嚼后浅色（已分解）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="322" width="440" height="42" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="338" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">细嚼慢咽：物理研磨 + 化学分解同步启动——唾液淀粉酶最适 pH 近中性</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11" fill="#3f7f3a">进胃后酶失活（胃酸）——所以口腔里的分解"窗口期"很宝贵</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">唾液 · 消化的第一滴（课外拓展）</text>
    </svg>
  );
}

function MelaninSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 皮肤剖面 */}
      <g style={dim(active, 0)}>
        <path d="M80 130 h 360 q 14 0 14 14 v 60 q 0 14 -14 14 h -360 q -14 0 -14 -14 v -60 q 0 -14 14 -14 Z" fill="#f4d0b8" stroke="#a5765a" strokeWidth="2.8" />
        <path d="M66 218 h 388 v 30 q 0 14 -14 14 h -360 q -14 0 -14 -14 Z" fill="#f8e4d4" stroke="#c99a7a" strokeWidth="2" />
        <text x="96" y="156" fontSize="11.5" fill="#8a5a3a" fontWeight="700">表皮（黑色素细胞在此）</text>
        <text x="96" y="240" fontSize="11.5" fill="#8a5a3a" fontWeight="700">真皮（血管·神经·感受器）</text>
      </g>
      {/* 黑色素细胞 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={170 + i * 90} cy={152} r="9" fill="#5a3a2a" stroke="#3a2a1a" strokeWidth="1.6" />
            {[0, 1, 2, 3].map((j) => (
              <path key={j} d={`M${170 + i * 90} 152 l ${Math.cos((j * Math.PI) / 2) * 18} ${Math.sin((j * Math.PI) / 2) * 18}`} stroke="#5a3a2a" strokeWidth="2" strokeLinecap="round" />
            ))}
          </g>
        ))}
        <text x="400" y="140" fontSize="12.5" fill="#5a3a2a" fontWeight="700">UV 照射 → 黑色素</text>
        <text x="400" y="160" fontSize="12.5" fill="#5a3a2a" fontWeight="700">增多（晒黑的本质）</text>
        <text x="374" y="180" fontSize="11.5" fill="#8a5a3a">天然"遮阳伞"包裹细胞核</text>
      </g>
      {/* 肤色演化 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="76" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">肤色演化的地理逻辑：强紫外地区深色（防叶酸分解）· 弱紫外地区浅色（保维生素 D 合成）</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">晒伤 = UV 破坏细胞 DNA 的炎症警报——反复晒伤显著升高皮肤癌风险</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">防晒的本质：给"分子防护伞"减负——硬防晒（衣帽）优于防晒霜</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">黑色素 · 肤色与紫外线的演化（课外拓展）</text>
    </svg>
  );
}

function UrinaryBladderSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 输尿管+膀胱 */}
      <g style={dim(active, 0)}>
        <path d="M170 80 q -16 60 -14 118" fill="none" stroke="#8ab4c9" strokeWidth="8" strokeLinecap="round" />
        <path d="M350 80 q 16 60 14 118" fill="none" stroke="#8ab4c9" strokeWidth="8" strokeLinecap="round" />
        <text x="330" y="66" fontSize="12.5" fill="#2c5a84" fontWeight="700">输尿管（左右各一·输送尿液）</text>
        <path d="M150 200 q 0 -40 110 -40 q 110 0 110 40 q 0 60 -40 96 l -140 0 q -40 -36 -40 -96 Z" fill="#d8e8b0" stroke="#6a9a3a" strokeWidth="2.8" />
        <text x="260" y="238" textAnchor="middle" fontSize="12.5" fill="#4a6a2a" fontWeight="700">膀胱（平滑肌构成的"气球"）</text>
        <path d="M258 296 v 40" stroke="#8a6a3a" strokeWidth="8" strokeLinecap="round" />
        <text x="292" y="292" fontSize="12.5" fill="#8a6a3a" fontWeight="700">尿道</text>
      </g>
      {/* 括约肌与反射 */}
      <g style={dim(active, 1)}>
        <ellipse cx="258" cy="290" rx="20" ry="9" fill="#c9a05a" stroke="#8a671b" strokeWidth="2.2" />
        <text x="46" y="252" fontSize="12.5" fill="#8a671b" fontWeight="700">尿道括约肌（"阀门"）</text>
        <rect x="300" y="120" width="180" height="66" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="390" y="144" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">容量约 400~500 mL</text>
        <text x="390" y="166" textAnchor="middle" fontSize="11" fill="#37585f">牵张感受器 → 排尿反射</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="298" width="440" height="60" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="322" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">低级中枢在脊髓·受大脑皮层高级中枢调控——"憋尿"与婴儿尿床的原理</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">脊髓损伤（截瘫）→ 大脑无法下达"忍住"指令→尿失禁（与脊髓标本互参）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">膀胱 · 尿液的"暂存仓库"（课外拓展）</text>
    </svg>
  );
}

function MammaryGlandSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 结构 */}
      <g style={dim(active, 0)}>
        <path d="M150 100 q 0 -50 100 -50 q 100 0 100 50 l 0 90 q 0 30 -40 30 l -120 0 q -40 0 -40 -30 Z" fill="#f0c9b0" stroke="#a5765a" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${200 + (i % 3) * 50} ${130 + Math.floor(i / 3) * 40} q 8 -14 24 -12`} fill="none" stroke="#c99a7a" strokeWidth="2" />
        ))}
        <path d="M210 170 q 40 10 80 0 l 0 30 q -40 14 -80 0 Z" fill="#e8b898" stroke="#a5765a" strokeWidth="2" />
        <text x="380" y="130" fontSize="12.5" fill="#8a5a3a" fontWeight="700">腺泡细胞泌乳</text>
        <text x="380" y="150" fontSize="12.5" fill="#8a5a3a">输乳管汇合至乳头</text>
      </g>
      {/* 乳汁成分 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="240" width="200" height="76" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="146" y="264" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">乳汁的"黄金配方"</text>
        <text x="146" y="286" textAnchor="middle" fontSize="11" fill="#a5761d">蛋白质·脂肪·乳糖</text>
        <text x="146" y="304" textAnchor="middle" fontSize="11" fill="#a5761d">+ 抗体（初乳含 IgA）</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 2)}>
        <rect x="274" y="240" width="200" height="76" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="374" y="264" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">哺乳 = 亲代抚育顶配</text>
        <text x="374" y="286" textAnchor="middle" fontSize="11" fill="#3f7f3a">营养+免疫"双投递"</text>
        <text x="374" y="304" textAnchor="middle" fontSize="11" fill="#3f7f3a">幼崽成活率大幅提高</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">哺乳动物之名正源于"乳腺"：胎生+哺乳是提高后代成活率的演化创新</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#537078">初乳的抗体给新生儿"被动免疫"——与疫苗的主动免疫对比记忆</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">乳腺 · 哺乳动物的定义特征（课外拓展）</text>
    </svg>
  );
}

function FingerprintSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 放大指纹 */}
      <g style={dim(active, 0)}>
        <ellipse cx="260" cy="150" rx="92" ry="120" fill="#f4ecdc" stroke="#b5a582" strokeWidth="3" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <ellipse key={i} cx="260" cy="150" rx={16 + i * 9} ry={30 + i * 10.5} fill="none" stroke="#c9a05a" strokeWidth="2.4" />
        ))}
        <path d="M226 150 q 34 -28 68 0 q -34 26 -68 0 Z" fill="none" stroke="#a5763a" strokeWidth="2.6" />
        <text x="260" y="304" textAnchor="middle" fontSize="12.5" fill="#8a6a3a" fontWeight="700">斗形·箕形·弓形——三种基本纹型</text>
      </g>
      {/* 功能 */}
      <g style={dim(active, 1)}>
        <rect x="44" y="60" width="180" height="76" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="134" y="84" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">为什么要指纹？</text>
        <text x="134" y="106" textAnchor="middle" fontSize="10.5" fill="#37585f">嵴线增大摩擦——抓握防滑</text>
        <text x="134" y="124" textAnchor="middle" fontSize="10.5" fill="#37585f">密布触觉小体——感知纹理</text>
      </g>
      {/* 唯一性 */}
      <g style={dim(active, 2)}>
        <rect x="296" y="60" width="180" height="76" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="386" y="84" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">独一无二且终身不变</text>
        <text x="386" y="106" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">胎儿期即形成（遗传+随机）</text>
        <text x="386" y="124" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">同卵双胞胎也不同！</text>
      </g>
      {/* 应用 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="322" width="440" height="44" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">应用：指纹解锁·法医鉴定——每个人的指纹由基因"定基调"、发育中随机"定细节"</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">灵长类都有"皮纹"·考拉也有指纹（甚至能混淆现场！）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">指纹 · 皮肤与个体识别（课外拓展）</text>
    </svg>
  );
}

function CochleaHairSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 耳蜗剖面 */}
      <g style={dim(active, 0)}>
        <path d="M120 190 q -6 -60 60 -78 q 90 -24 150 20 q 40 30 20 70 q -24 44 -100 40 q -80 -4 -110 -30" fill="none" stroke="#4d7ea8" strokeWidth="26" strokeLinecap="round" />
        <path d="M128 186 q -2 -48 58 -64" fill="none" stroke="#dceaea" strokeWidth="10" strokeLinecap="round" />
        <text x="330" y="248" fontSize="12.5" fill="#2c5a84" fontWeight="700">耳蜗（蜗牛壳状·2.5 圈）</text>
        <text x="330" y="268" fontSize="12" fill="#4b6c73">内含毛细胞与听觉神经末梢</text>
      </g>
      {/* 毛细胞 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path d={`M${150 + i * 34} 140 v -20`} stroke="#b05a3a" strokeWidth="4" strokeLinecap="round" />
            {[0, 1, 2].map((j) => (
              <path key={j} d={`M${144 + i * 34 + j * 5} ${120 - j * 4} l 4 -8`} stroke="#e8a080" strokeWidth="1.8" strokeLinecap="round" />
            ))}
          </g>
        ))}
        <text x="330" y="110" fontSize="12.5" fill="#8a4a2a" fontWeight="700">毛细胞顶部的"听毛"</text>
        <text x="330" y="130" fontSize="12" fill="#8a4a2a">随声波振动弯曲 → 产生电信号</text>
        <line x1="326" y1="112" x2="290" y2="122" stroke="#8a4a2a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 听力损伤 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="292" width="440" height="72" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="316" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">毛细胞不可再生：长期戴耳机大音量→毛细胞"过劳死"→噪声性听力损失</text>
        <text x="260" y="338" textAnchor="middle" fontSize="11.5" fill="#a5761d">60-60 原则：音量不超最大 60%·连续使用不超 60 分钟</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11" fill="#a5761d">高频听力最先受损——"听得见但听不清"要警惕</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">耳蜗毛细胞 · 听力的"耗材"（课外拓展）</text>
    </svg>
  );
}

function ThymusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 位置 */}
      <g style={dim(active, 0)}>
        <path d="M196 120 q 20 -30 64 -30 q 44 0 64 30 q -18 44 -64 48 q -46 -4 -64 -48 Z" fill="#f0c9b0" stroke="#a5765a" strokeWidth="2.8" />
        <path d="M240 90 q 20 -12 40 0 m -20 0 v 34" stroke="#a5765a" strokeWidth="2" />
        <text x="336" y="100" fontSize="12.5" fill="#8a5a3a" fontWeight="700">胸腺：胸骨后方·心脏上方</text>
        <text x="336" y="120" fontSize="12.5" fill="#8a5a3a">两叶如"蝶翼"</text>
      </g>
      {/* T 细胞训练 */}
      <g style={dim(active, 1)}>
        <circle cx="196" cy="150" r="8" fill="#8ab4cc" stroke="#2c5a84" strokeWidth="1.6" />
        <circle cx="216" cy="140" r="8" fill="#8ab4cc" stroke="#2c5a84" strokeWidth="1.6" />
        <circle cx="236" cy="152" r="8" fill="#8ab4cc" stroke="#2c5a84" strokeWidth="1.6" />
        <circle cx="286" cy="142" r="8" fill="#e8a0a0" stroke="#8a3030" strokeWidth="1.6" />
        <text x="60" y="196" fontSize="12.5" fill="#2c5a84" fontWeight="700">"入学"的 T 细胞前体：</text>
        <text x="60" y="216" fontSize="12.5" fill="#2c5a84">阳性选择（认识自己 MHC）+</text>
        <text x="60" y="236" fontSize="12.5" fill="#2c5a84">阴性选择（不攻击自身组织）</text>
        <text x="316" y="150" fontSize="12" fill="#8a3030" fontWeight="700">不合格者被淘汰（~95%）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="262" width="440" height="66" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="288" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">T = Thymus：T 细胞在胸腺"毕业"后才具备免疫功能</text>
        <text x="260" y="312" textAnchor="middle" fontSize="11.5" fill="#a5761d">青春期后胸腺逐渐萎缩（脂肪化），但已训练的 T 细胞可存活多年</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">胸腺 · 免疫细胞的"军校"（课外拓展）</text>
    </svg>
  );
}

function TearsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 眼与泪膜 */}
      <g style={dim(active, 0)}>
        <circle cx="220" cy="160" r="80" fill="#f0f0e8" stroke="#8a9a9f" strokeWidth="3" />
        <circle cx="220" cy="160" r="34" fill="#4a7a9a" stroke="#2a4a6a" strokeWidth="2.6" />
        <circle cx="220" cy="160" r="14" fill="#141414" />
        <circle cx="208" cy="148" r="5" fill="#ffffff" />
        <path d="M140 158 q 80 -36 160 0" fill="none" stroke="#8ac8e8" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        <text x="336" y="130" fontSize="12.5" fill="#2c5a84" fontWeight="700">泪膜（每眨眼一次重新涂布）</text>
        <text x="336" y="150" fontSize="11.5" fill="#2c5a84">脂质层·水液层·黏蛋白层</text>
      </g>
      {/* 泪器 */}
      <g style={dim(active, 1)}>
        <ellipse cx="96" cy="86" rx="26" ry="16" fill="#d8e8f0" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="46" y="56" fontSize="12.5" fill="#2c5a84" fontWeight="700">泪腺（外上方·产泪）</text>
        <path d="M120 96 q 60 30 100 42" fill="none" stroke="#4d7ea8" strokeWidth="2.4" strokeDasharray="4 3" />
        <path d="M300 190 q 40 8 70 -8" fill="none" stroke="#4d7ea8" strokeWidth="3" strokeLinecap="round" />
        <text x="336" y="216" fontSize="12.5" fill="#2c5a84" fontWeight="700">鼻泪管 → 通鼻腔</text>
        <text x="336" y="236" fontSize="11.5" fill="#4a6a7a">哭鼻子时会"一把鼻涕一把泪"</text>
      </g>
      {/* 三种泪 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={46 + i * 148} y="272" width="136" height="48" rx="10" fill={['#e4ecf6', '#e2f0e2', '#f4e4ec'][i]} stroke={['#4d7ea8', '#3f7f3a', '#a5486a'][i]} strokeWidth="2" />
            <text x={114 + i * 148} y="292" textAnchor="middle" fontSize="11" fill={['#2c5a84', '#2f6f2a', '#8a3a5a'][i]} fontWeight="800">{['基础泪（润滑）', '反射泪（进沙/切葱）', '情绪泪（人类特有）'][i]}</text>
            <text x={114 + i * 148} y="310" textAnchor="middle" fontSize="9.5" fill="#59767c">{['全天微量分泌', '冲走刺激物', '含激素·释放情绪'][i]}</text>
          </g>
        ))}
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="332" width="440" height="40" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="348" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">泪液功能：润滑·杀菌（溶菌酶）·冲刷异物——干眼症即泪膜失衡</text>
        <text x="260" y="366" textAnchor="middle" fontSize="11" fill="#a5761d">情绪泪含皮质醇等应激激素——"哭出来"可能有助减压</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">眼泪 · 三层泪膜与三种泪（课外拓展）</text>
    </svg>
  );
}

function TasteBudsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 舌面味区 */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="160" rx="150" ry="100" fill="#e88a8a" stroke="#a54858" strokeWidth="3" />
        <path d="M250 240 q -10 30 0 46 q 10 -16 0 -46" fill="#d87878" stroke="#a54858" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle key={i} cx={160 + (i % 4) * 62} cy={116 + Math.floor(i / 4) * 62} r="6" fill="#d86868" opacity="0.7" />
        ))}
        <text x="200" y="300" textAnchor="middle" fontSize="12.5" fill="#8a3a4a" fontWeight="700">舌面味蕾约 2000~8000 个</text>
      </g>
      {/* 味蕾结构 */}
      <g style={dim(active, 1)}>
        <ellipse cx="440" cy="110" rx="36" ry="50" fill="#f0b8b8" stroke="#a54858" strokeWidth="2.4" />
        <path d="M428 70 q 12 -14 24 0 m -22 -4 l 4 -12 m 8 12 l 8 -10" stroke="#a54858" strokeWidth="2" fill="none" />
        <text x="440" y="180" textAnchor="middle" fontSize="12" fill="#8a3a4a" fontWeight="700">味孔开口</text>
        <text x="440" y="200" textAnchor="middle" fontSize="11" fill="#8a3a4a">味细胞+支持细胞</text>
      </g>
      {/* 五味 */}
      <g style={dim(active, 2)}>
        {['酸', '甜', '苦', '咸', '鲜'].map((t, i) => (
          <g key={t}>
            <circle cx={72 + i * 68} cy={272} r="22" fill={['#e8d06a', '#f4f0d8', '#5a4a2a', '#d8e8f0', '#e8a860'][i]} stroke={['#8a671b', '#a5966a', '#2a1a0a', '#4a6a7a', '#8a5a2a'][i]} strokeWidth="2" />
            <text x={72 + i * 68} y={277} textAnchor="middle" fontSize="12.5" fill={['#5a4a1a', '#5a4a2a', '#f0e0d0', '#2a4a5a', '#4a2a0a'][i]} fontWeight="800">{t}</text>
          </g>
        ))}
        <text x="260" y="318" textAnchor="middle" fontSize="12" fill="#8a3a4a" fontWeight="700">苦味受体最多最敏感——苦常意味着"有毒"，是保命的警戒味</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">考点：味觉 = 化学感受；"地图舌"（舌尖甜·舌根苦）是过时说法——每种味蕾都能感受多种味</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#a5761d">"味道"= 味觉 + 嗅觉协同（与嗅觉标本互参）· 辣不是味觉而是痛觉</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">味蕾 · 五种基本味（课外拓展）</text>
    </svg>
  );
}

function FeverSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 体温曲线 */}
      <g style={dim(active, 0)}>
        <path d="M60 150 Q 130 148 180 132 Q 240 110 300 130 Q 360 150 400 142" fill="none" stroke="#b0483a" strokeWidth="3.4" />
        <path d="M60 190 h 340" stroke="#3f7f3a" strokeWidth="2" strokeDasharray="7 5" />
        <text x="404" y="194" fontSize="10" fill="#2f6f2a" fontWeight="700">37°C</text>
        <text x="60" y="120" fontSize="12.5" fill="#8a671b" fontWeight="700">致热原 → 下丘脑调定点上移 → 发烧</text>
        <text x="60" y="220" fontSize="12" fill="#4b6c73">体温调定点的"目标温度"被重设，身体主动产热"烧"上去</text>
      </g>
      {/* 免疫意义 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="244" width="200" height="70" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="146" y="268" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">适度发烧是"帮忙"</text>
        <text x="146" y="290" textAnchor="middle" fontSize="11" fill="#3f7f3a">增强免疫细胞活性</text>
        <text x="146" y="308" textAnchor="middle" fontSize="11" fill="#3f7f3a">抑制部分病原体繁殖</text>
      </g>
      {/* 注意 */}
      <g style={dim(active, 2)}>
        <rect x="274" y="244" width="200" height="70" rx="10" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.2" />
        <text x="374" y="268" textAnchor="middle" fontSize="12" fill="#8a3a2a" fontWeight="800">过高则危险</text>
        <text x="374" y="290" textAnchor="middle" fontSize="11" fill="#a5533c">&gt;39~40°C 影响酶与神经</text>
        <text x="374" y="308" textAnchor="middle" fontSize="11" fill="#a5533c">高热惊厥需及时降温就医</text>
      </g>
      {/* 机制 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">寒战（骨骼肌产热）+ 皮肤血管收缩（散热减少）= 体温冲向新调定点</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#a5761d">退烧 = 调定点回落 → 出汗散热——"捂汗"并不能治发烧</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">发烧 · 调定点学说（课外拓展）</text>
    </svg>
  );
}

function WoundHealingSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 阶段 1 止血 */}
      <g style={dim(active, 0)}>
        <path d="M120 130 q 60 -22 130 0 q 40 12 80 0" fill="none" stroke="#c96a6a" strokeWidth="26" strokeLinecap="round" />
        <circle cx="260" cy="132" r="18" fill="#8a2020" stroke="#5a1010" strokeWidth="2.4" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={252 + i * 9} cy={128 + (i % 2) * 8} r="3" fill="#e8a0a0" />
        ))}
        <text x="42" y="98" fontSize="12.5" fill="#8a2020" fontWeight="700">① 止血（数分钟）：血小板聚集</text>
        <text x="42" y="118" fontSize="12.5" fill="#8a2020">纤维蛋白网结痂·封住伤口</text>
      </g>
      {/* 阶段 2 炎症 */}
      <g style={dim(active, 1)}>
        <path d="M120 210 q 60 -20 130 0 q 40 12 80 0" fill="none" stroke="#e0a08a" strokeWidth="24" strokeLinecap="round" />
        <ellipse cx="256" cy="206" rx="26" ry="14" fill="#c94a4a" stroke="#8a2020" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={244 + i * 7} cy={202 + (i % 2) * 8} r="3.4" fill="#ffffff" />
        ))}
        <text x="322" y="196" fontSize="12.5" fill="#8a2020" fontWeight="700">② 炎症（1~3 天）：白细胞</text>
        <text x="322" y="216" fontSize="12.5" fill="#8a2020">清除细菌与坏死组织（红肿）</text>
      </g>
      {/* 阶段 3 增生 */}
      <g style={dim(active, 2)}>
        <path d="M120 286 q 60 -18 130 0 q 40 12 80 0" fill="none" stroke="#e8c9a8" strokeWidth="22" strokeLinecap="round" />
        <path d="M180 280 q 80 -14 160 -2" fill="none" stroke="#d86a6a" strokeWidth="8" strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${210 + i * 30} 274 q 8 8 2 14`} fill="none" stroke="#5a8ab5" strokeWidth="2.4" />
        ))}
        <text x="42" y="272" fontSize="12.5" fill="#8a5a2a" fontWeight="700">③ 增生（3 天~3 周）：成纤维细胞</text>
        <text x="42" y="292" fontSize="12.5" fill="#8a5a2a">合成胶原·新血管长入（肉芽）</text>
      </g>
      {/* 重塑 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="316" width="440" height="52" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="338" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">④ 重塑（数月）：胶原重组·瘢痕变淡——四阶段环环相扣</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">感染·糖尿病·吸烟都会拖慢愈合——保持伤口清洁湿润反而好得快</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">伤口愈合 · 止血-炎症-增生-重塑（课外拓展）</text>
    </svg>
  );
}

function FetusPlacentaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 子宫轮廓 */}
      <g style={dim(active, 0)}>
        <path d="M130 90 Q 260 54 390 90 Q 420 170 390 260 Q 340 330 260 332 Q 180 330 130 260 Q 100 170 130 90 Z" fill="#e8b8a8" stroke="#a54838" strokeWidth="3" />
        <text x="56" y="72" fontSize="12.5" fill="#8a3a2a" fontWeight="700">子宫（胎儿发育的"温室"）</text>
      </g>
      {/* 胎盘 */}
      <g style={dim(active, 1)}>
        <ellipse cx="196" cy="150" rx="72" ry="40" fill="#8a3a3a" stroke="#5a2020" strokeWidth="2.6" />
        <text x="88" y="236" fontSize="12.5" fill="#5a2020" fontWeight="700">胎盘：物质交换的"中转海关"</text>
        <text x="88" y="256" fontSize="12.5" fill="#5a2020">母体血与胎儿血不直接混合</text>
        <text x="88" y="276" fontSize="12.5" fill="#5a2020">O₂·养料来 / CO₂·废物去</text>
      </g>
      {/* 胎儿与脐带 */}
      <g style={dim(active, 2)}>
        <path d="M220 176 Q 250 196 262 226" fill="none" stroke="#b05a5a" strokeWidth="9" strokeLinecap="round" />
        <text x="160" y="188" fontSize="11.5" fill="#8a3a2a" fontWeight="700">脐带（两条脐动脉·一条脐静脉）</text>
        <circle cx="286" cy="262" r="42" fill="#f0d8c8" stroke="#a5765a" strokeWidth="2.6" />
        <circle cx="274" cy="252" r="5" fill="#4a3a3a" />
        <path d="M304 268 q 10 4 14 12" fill="none" stroke="#a5765a" strokeWidth="2.4" />
        <text x="286" y="284" textAnchor="middle" fontSize="12.5" fill="#8a5a3a" fontWeight="700">胎儿（羊水中发育）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="298" width="440" height="60" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="322" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">胎儿红细胞自带"货"：胎儿的遗传物质一半来自父方——对母体是"半同种异物"</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">胎盘是屏障也是通道：药物·酒精·病毒（风疹/艾滋）都能通过——孕妇用药须谨慎</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">胎儿与胎盘 · 母胎物质交换（课外拓展）</text>
    </svg>
  );
}

function BloodTransfusionSvg({ active }: { active: number | null; open?: boolean }) {
  const cells = [
    { abo: 'A 型', rbc: 'A 抗原', plasma: '抗 B 凝集素', give: 'A、AB', get: 'A、O', c: '#c94a4a' },
    { abo: 'B 型', rbc: 'B 抗原', plasma: '抗 A 凝集素', give: 'B、AB', get: 'B、O', c: '#4d7ea8' },
    { abo: 'AB 型', rbc: 'A+B 抗原', plasma: '无凝集素', give: 'AB', get: '全型（万能受血者）', c: '#8a671b' },
    { abo: 'O 型', rbc: '无抗原', plasma: '抗 A + 抗 B', give: 'O（万能供血者）', get: 'O', c: '#3f7f3a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 凝集反应演示 */}
      <g style={dim(active, 0)}>
        <rect x="56" y="56" width="190" height="110" rx="12" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.4" />
        <text x="151" y="80" textAnchor="middle" fontSize="11.5" fill="#8a3a2a" fontWeight="800">错误输血：A 型血 + B 型血浆</text>
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={96 + (i % 2) * 30} cy={100 + Math.floor(i / 2) * 26} r="9" fill="#c94a4a" stroke="#8a2020" strokeWidth="1.6" />
        ))}
        <text x="111" y="88" fontSize="8.5" fill="#8a2020" fontWeight="700">A</text>
        <text x="151" y="126" textAnchor="middle" fontSize="10.5" fill="#8a3a2a" fontWeight="700">红细胞凝集成团 ✗</text>
        <text x="151" y="152" textAnchor="middle" fontSize="9.5" fill="#a5533c">抗 B 凝集素"抱团" A 抗原</text>
        <rect x="274" y="56" width="190" height="110" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="369" y="80" textAnchor="middle" fontSize="11.5" fill="#2f6f2a" fontWeight="800">正确输血：O 型 → A 型</text>
        {[0, 1, 2, 3].map((i) => (
          <circle key={`g${i}`} cx={314 + (i % 2) * 30} cy={100 + Math.floor(i / 2) * 26} r="9" fill="#7ab86a" stroke="#2f6f2a" strokeWidth="1.6" />
        ))}
        <text x="369" y="126" textAnchor="middle" fontSize="10.5" fill="#2f6f2a" fontWeight="700">红细胞均匀分散 ✓</text>
        <text x="369" y="152" textAnchor="middle" fontSize="9.5" fill="#3f7f3a">无对应抗原·不凝集</text>
      </g>
      {/* 表格 */}
      <g style={dim(active, 1)}>
        <rect x="40" y="184" width="440" height="112" rx="10" fill="#f8faf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="60" y="208" fontSize="11" fill="#2c5a84" fontWeight="800">血型</text>
        <text x="150" y="208" fontSize="11" fill="#2c5a84" fontWeight="800">红细胞抗原</text>
        <text x="270" y="208" fontSize="11" fill="#2c5a84" fontWeight="800">血浆凝集素</text>
        <text x="388" y="208" fontSize="11" fill="#2c5a84" fontWeight="800">可接受（受血）</text>
        {cells.map((c, i) => (
          <g key={c.abo}>
            <text x="60" y={232 + i * 16} fontSize="10.5" fill={c.c} fontWeight="700">{c.abo}</text>
            <text x="150" y={232 + i * 16} fontSize="10.5" fill="#37585f">{c.rbc}</text>
            <text x="270" y={232 + i * 16} fontSize="10.5" fill="#59767c">{c.plasma}</text>
            <text x="388" y={232 + i * 16} fontSize="10.5" fill="#59767c">{c.get}</text>
          </g>
        ))}
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="308" width="440" height="56" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="330" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">原则：同型相输；紧急时 O 型可少量输给他人（"万能供血"也有限度）</text>
        <text x="260" y="350" textAnchor="middle" fontSize="11.5" fill="#a5761d">输血前必须做交叉配血试验——ABO 之外还有 Rh 系统等几十种血型</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">输血与血型 · 凝集反应（课外拓展）</text>
    </svg>
  );
}

function SarcomereSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 肌纤维到肌节 */}
      <g style={dim(active, 0)}>
        <text x="46" y="76" fontSize="12.5" fill="#37585f" fontWeight="700">放大三级：肌肉 → 肌纤维 → 肌原纤维 → 肌节</text>
        <path d="M60 96 h 400" stroke="#b0483a" strokeWidth="10" strokeLinecap="round" />
        <path d="M60 96 h 400" stroke="#e8a0a0" strokeWidth="4" strokeLinecap="round" strokeDasharray="14 10" />
      </g>
      {/* 肌节模式图 */}
      <g style={dim(active, 1)}>
        <path d="M80 150 v 90 m 360 0 v -90" stroke="#5a6a7a" strokeWidth="7" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={`t${i}`} d={`M${118 + i * 44} 144 v 100`} stroke="#4d7ea8" strokeWidth="5" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={`m${i}`} d={`M${140 + i * 44} 128 l 0 132`} stroke="#b0483a" strokeWidth="3.4" strokeDasharray="0" />
        ))}
        <text x="78" y="138" textAnchor="middle" fontSize="10" fill="#5a6a7a" fontWeight="700">Z线</text>
        <text x="260" y="122" textAnchor="middle" fontSize="10.5" fill="#4d7ea8" fontWeight="700">细肌丝（肌动蛋白）</text>
        <text x="260" y="284" textAnchor="middle" fontSize="10.5" fill="#b0483a" fontWeight="700">粗肌丝（肌球蛋白·带横桥）</text>
      </g>
      {/* 滑行机制 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="300" width="440" height="66" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">收缩 = 横桥摆动拖动细肌丝向 M 线滑行 → 肌节缩短（丝不等长·相互滑行）</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#a5761d">Ca²⁺ 结合肌钙蛋白暴露位点 · ATP 供能（"尸僵"正是 ATP 耗尽的横桥无法分离）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">肌节 · 肌肉收缩的分子机制（课外拓展）</text>
    </svg>
  );
}

function MaculaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 眼底视图 */}
      <g style={dim(active, 0)}>
        <circle cx="220" cy="180" r="130" fill="#f8f0e8" stroke="#b5765a" strokeWidth="3" />
        <path d="M320 120 q 30 -26 40 -52" fill="none" stroke="#a54838" strokeWidth="5" strokeLinecap="round" />
        <path d="M352 76 q 14 4 12 18 m -12 -18 q 14 -4 20 8" fill="none" stroke="#a54838" strokeWidth="3.4" />
        <ellipse cx="300" cy="150" rx="20" ry="13" fill="#e8a03a" stroke="#8a671b" strokeWidth="2.4" />
        <text x="356" y="150" fontSize="12.5" fill="#8a671b" fontWeight="700">视盘（生理盲点）</text>
        <text x="356" y="170" fontSize="12.5" fill="#8a671b">神经与血管穿出·无视细胞</text>
        <line x1="352" y1="154" x2="322" y2="152" stroke="#8a671b" strokeWidth="1.2" />
      </g>
      {/* 黄斑 */}
      <g style={dim(active, 1)}>
        <ellipse cx="180" cy="210" rx="26" ry="20" fill="#f4d06a" stroke="#a58a2a" strokeWidth="2.4" opacity="0.85" />
        <circle cx="180" cy="210" r="7" fill="#8a671b" />
        <text x="60" y="258" fontSize="12.5" fill="#8a671b" fontWeight="700">黄斑（中央凹）</text>
        <text x="60" y="278" fontSize="12.5" fill="#8a671b">视锥细胞最密集·视觉最清晰</text>
        <line x1="120" y1="264" x2="160" y2="226" stroke="#8a671b" strokeWidth="1.2" />
      </g>
      {/* 视细胞 */}
      <g style={dim(active, 2)}>
        <rect x="330" y="220" width="150" height="100" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="405" y="244" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">两类感光细胞</text>
        <text x="405" y="266" textAnchor="middle" fontSize="11" fill="#37585f">视锥细胞：强光+彩色（700万）</text>
        <text x="405" y="286" textAnchor="middle" fontSize="11" fill="#37585f">视杆细胞：弱光+黑白（1.2亿）</text>
        <text x="405" y="306" textAnchor="middle" fontSize="10.5" fill="#799398">夜行动物视杆多·人黄斑全视锥</text>
      </g>
      {/* 盲点测试 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="318" width="440" height="46" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="336" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">盲点测试：闭右眼，左眼看"+"，书远近移动——十字消失处即盲点投射区</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">平时"看不到"盲点：大脑用周围图像自动补全（脑补的生理学依据）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">黄斑与盲点 · 视网膜上的"高清区"与"盲区"（课外拓展）</text>
    </svg>
  );
}

function PituitarySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 位置：下丘脑下方 */}
      <g style={dim(active, 0)}>
        <path d="M220 84 q 40 -26 80 0 q 24 18 14 40 q -54 20 -108 0 q -10 -22 14 -40 Z" fill="#e8c9d8" stroke="#a5486a" strokeWidth="2.6" />
        <text x="322" y="80" fontSize="12.5" fill="#8a3a5a" fontWeight="700">下丘脑（节律与食欲中枢）</text>
        <line x1="318" y1="84" x2="296" y2="94" stroke="#8a3a5a" strokeWidth="1.2" />
        <path d="M260 124 v 22" stroke="#a5486a" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="260" cy="172" rx="30" ry="24" fill="#d86a8a" stroke="#8a2a4a" strokeWidth="2.6" />
        <text x="322" y="168" fontSize="12.5" fill="#8a2a4a" fontWeight="700">垂体（豌豆大小·约 0.6 g）</text>
        <text x="322" y="188" fontSize="12.5" fill="#8a2a4a">悬于下丘脑下方·蝶鞍内</text>
      </g>
      {/* 两种叶 */}
      <g style={dim(active, 1)}>
        <path d="M240 156 q 20 -14 40 0 q 6 18 0 32 q -20 10 -40 0 q -6 -14 0 -32 Z" fill="#e88aa8" stroke="#8a2a4a" strokeWidth="2" />
        <text x="46" y="242" fontSize="12.5" fill="#8a2a4a" fontWeight="700">腺垂体（前叶）分泌：</text>
        <text x="46" y="262" fontSize="12" fill="#8a2a4a">生长激素（巨人症/侏儒症）</text>
        <text x="46" y="280" fontSize="12" fill="#8a2a4a">促甲状腺激素·促性腺激素等</text>
      </g>
      <g style={dim(active, 2)}>
        <text x="330" y="242" fontSize="12.5" fill="#4a6a8a" fontWeight="700">神经垂体（后叶）释放：</text>
        <text x="330" y="262" fontSize="12" fill="#4a6a8a">抗利尿激素（缺尿崩症）</text>
        <text x="330" y="280" fontSize="12" fill="#4a6a8a">催产素（由下丘脑合成）</text>
      </g>
      {/* 总司令 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="304" width="440" height="56" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="328" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"内分泌总司令"：分泌促激素指挥甲状腺·肾上腺皮质·性腺</text>
        <text x="260" y="348" textAnchor="middle" fontSize="11.5" fill="#a5761d">真正的"最高统帅"是下丘脑——它分泌激素控制垂体（神经-体液调节的枢纽）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">垂体 · 激素调节的"中转枢纽"（课外拓展）</text>
    </svg>
  );
}

function LymphNodeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 结体 */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="170" rx="120" ry="80" fill="#e8b8b8" stroke="#a54858" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={196 + i * 54} cy={140} rx="22" ry="14" fill="#d88a8a" stroke="#a54858" strokeWidth="1.8" />
        ))}
        <text x="380" y="126" fontSize="12.5" fill="#8a3a3a" fontWeight="700">皮质淋巴小结</text>
        <text x="380" y="146" fontSize="12.5" fill="#8a3a3a">（B 细胞聚居区）</text>
        <line x1="376" y1="132" x2="274" y2="140" stroke="#8a3a3a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 输入输出淋巴管 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${128 + i * 26} ${108 - (i % 2) * 12} q -26 -14 -44 -30`} fill="none" stroke="#4d7ea8" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="42" y="58" fontSize="12.5" fill="#2c5a84" fontWeight="700">输入淋巴管（多条）</text>
        <path d="M370 216 q 40 16 66 40" fill="none" stroke="#2f6f2a" strokeWidth="6" strokeLinecap="round" />
        <text x="330" y="282" fontSize="12.5" fill="#2f6f2a" fontWeight="700">输出淋巴管（经"门"部）</text>
      </g>
      {/* 功能 */}
      <g style={dim(active, 2)}>
        <rect x="60" y="216" width="150" height="72" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="135" y="240" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">过滤站：拦截</text>
        <text x="135" y="260" textAnchor="middle" fontSize="11" fill="#37585f">淋巴液中的病原体</text>
        <text x="135" y="278" textAnchor="middle" fontSize="11" fill="#37585f">与癌细胞（转移前哨）</text>
        <rect x="300" y="300" width="180" height="56" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="390" y="322" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">活化场：T/B 细胞</text>
        <text x="390" y="342" textAnchor="middle" fontSize="11" fill="#3f7f3a">识别抗原后增殖分化</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <text x="30" y="332" fontSize="12.5" fill="#8a671b" fontWeight="700">"摸到淋巴结肿大"：免疫应答进行中</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">淋巴结 · 免疫系统的"边防哨所"（课外拓展）</text>
    </svg>
  );
}

function AdrenalSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 位置 */}
      <g style={dim(active, 0)}>
        <path d="M150 96 q -40 -16 -44 28 q -4 44 30 48 q 34 4 40 -30 q 4 -30 -26 -46 Z" fill="#f0d8b0" stroke="#a5763a" strokeWidth="2.6" />
        <path d="M370 96 q 40 -16 44 28 q 4 44 -30 48 q -34 4 -40 -30 q -4 -30 26 -46 Z" fill="#f0d8b0" stroke="#a5763a" strokeWidth="2.6" />
        <ellipse cx="112" cy="230" rx="36" ry="52" fill="#c9a08a" stroke="#8a6a4a" strokeWidth="2" opacity="0.75" />
        <ellipse cx="408" cy="230" rx="36" ry="52" fill="#c9a08a" stroke="#8a6a4a" strokeWidth="2" opacity="0.75" />
        <text x="330" y="286" fontSize="12.5" fill="#8a6a4a" fontWeight="700">肾（左右各一·肾上腺覆盖其上）</text>
        <line x1="370" y1="318" x2="404" y2="282" stroke="#8a6a4a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 皮质 */}
      <g style={dim(active, 1)}>
        <ellipse cx="132" cy="120" rx="40" ry="46" fill="#e8b86a" stroke="#a5763a" strokeWidth="2.4" />
        <text x="196" y="100" fontSize="12.5" fill="#a5763a" fontWeight="700">皮质（外层·三类激素）</text>
        <text x="196" y="120" fontSize="12.5" fill="#a5763a">糖皮质激素：升高血糖·抗炎抗过敏</text>
        <text x="196" y="140" fontSize="12.5" fill="#a5763a">盐皮质激素：保钠保水（醛固酮）</text>
      </g>
      {/* 髓质 */}
      <g style={dim(active, 2)}>
        <ellipse cx="132" cy="122" rx="18" ry="22" fill="#c96a6a" stroke="#8a2020" strokeWidth="2.2" />
        <text x="196" y="170" fontSize="12.5" fill="#8a2020" fontWeight="700">髓质（内层·应急反应）</text>
        <text x="196" y="190" fontSize="12.5" fill="#8a2020">肾上腺素：心跳加快·血压升高</text>
        <text x="196" y="210" fontSize="12.5" fill="#8a2020">血糖升高——"应激"的化学基础</text>
      </g>
      {/* 应急 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="300" width="440" height="56" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"吓得脸白手抖"：交感神经 + 肾上腺髓质的协同应急反应</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#a5761d">皮质激素还参与昼夜节律：早晨皮质醇高峰让人清醒（熬夜打乱它）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">肾上腺 · 应激反应的化学引擎（课外拓展）</text>
    </svg>
  );
}

function BoneMarrowSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 骨骼剖面 */}
      <g style={dim(active, 0)}>
        <path d="M180 60 h 160 q 20 0 20 22 v 180 q 0 22 -20 22 h -160 q -20 0 -20 -22 v -180 q 0 -22 20 -22 Z" fill="#f4f0e4" stroke="#b5a582" strokeWidth="3" />
        <path d="M188 68 h 144 v 30 h -144 Z M 188 246 h 144 v 30 h -144 Z" fill="#e8e4d4" stroke="#c9b88a" strokeWidth="1.8" />
        <rect x="196" y="104" width="128" height="136" rx="10" fill="#c96a6a" stroke="#8a3030" strokeWidth="2.4" />
        <text x="260" y="130" textAnchor="middle" fontSize="12.5" fill="#5a2020" fontWeight="800">红骨髓（长骨中段剖面）</text>
        <text x="42" y="96" fontSize="12.5" fill="#8a7a4a" fontWeight="700">骨密质（外层坚硬）</text>
        <line x1="150" y1="92" x2="196" y2="80" stroke="#8a7a4a" strokeWidth="1.2" />
      </g>
      {/* 造血干细胞 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={222 + (i % 3) * 38} cy={162 + Math.floor(i / 3) * 40} r="10" fill="#e8a0a0" stroke="#8a3030" strokeWidth="1.8" />
        ))}
        <text x="42" y="150" fontSize="12.5" fill="#8a3030" fontWeight="700">造血干细胞（专能）</text>
        <text x="42" y="170" fontSize="12.5" fill="#8a3030">终身更新各种血细胞</text>
        <line x1="150" y1="154" x2="214" y2="162" stroke="#8a3030" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 三系分化 */}
      <g style={dim(active, 2)}>
        <text x="42" y="210" fontSize="12" fill="#a53030" fontWeight="700">→ 红细胞（运 O₂）</text>
        <text x="42" y="230" fontSize="12" fill="#2c5a84" fontWeight="700">→ 白细胞（防御）</text>
        <text x="42" y="250" fontSize="12" fill="#8a671b" fontWeight="700">→ 血小板（凝血）</text>
        <text x="56" y="290" fontSize="12.5" fill="#4b6c73" fontWeight="700">5 岁后长骨两端与髂骨的红骨髓保持造血（其余黄骨髓化）</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="316" width="440" height="50" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="336" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">白血病 = 造血干细胞恶变 → 骨髓移植重建造血与免疫（"配型"即 HLA 相容）</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">脐带血含丰富造血干细胞——是重要的移植来源</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">骨髓 · 人体的"造血工厂"（课外拓展）</text>
    </svg>
  );
}

function LargeIntestineSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 大肠走形 */}
      <g style={dim(active, 0)}>
        <path d="M170 110 L 380 110 Q 404 110 404 134 L 404 190 Q 404 214 380 214 L 150 214 Q 126 214 126 238 L 126 270 Q 126 294 150 294 L 210 294"
          fill="none" stroke="#c9a06a" strokeWidth="34" strokeLinecap="round" />
        <path d="M170 110 L 380 110 Q 404 110 404 134 L 404 190 Q 404 214 380 214 L 150 214 Q 126 214 126 238 L 126 270 Q 126 294 150 294 L 210 294"
          fill="none" stroke="#e0b878" strokeWidth="24" strokeLinecap="round" />
        <text x="250" y="86" fontSize="12.5" fill="#a5763a" fontWeight="700">结肠（升→横→降→乙状）</text>
        <text x="252" y="330" fontSize="12.5" fill="#a5763a" fontWeight="700">直肠（暂存粪便·排便反射）</text>
        <line x1="212" y1="296" x2="238" y2="318" stroke="#a5763a" strokeWidth="1.2" />
      </g>
      {/* 盲肠与阑尾 */}
      <g style={dim(active, 1)}>
        <path d="M136 106 Q 108 112 110 138 Q 112 160 136 158 L 158 128 Q 152 108 136 106 Z" fill="#c9a06a" stroke="#a5763a" strokeWidth="2.6" />
        <path d="M118 152 q -14 34 -6 62 q 14 -6 18 -26 q 4 -20 4 -34" fill="#b88a5a" stroke="#8a5a2a" strokeWidth="2.4" />
        <text x="42" y="196" fontSize="12.5" fill="#8a5a2a" fontWeight="700">盲肠+阑尾</text>
        <text x="42" y="216" fontSize="12.5" fill="#8a5a2a">阑尾是免疫器官（富含淋巴）</text>
        <text x="42" y="236" fontSize="12.5" fill="#8a5a2a">梗阻发炎 → 转移性右下腹痛</text>
      </g>
      {/* 功能 */}
      <g style={dim(active, 2)}>
        <rect x="300" y="240" width="170" height="66" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="385" y="262" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">三大任务</text>
        <text x="385" y="282" textAnchor="middle" fontSize="11" fill="#3f7f3a">吸收水分与无机盐</text>
        <text x="385" y="298" textAnchor="middle" fontSize="11" fill="#3f7f3a">合成维生素 K · 形成粪便</text>
      </g>
      {/* 健康 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">膳食纤维增加残渣刺激蠕动 · 大肠癌早期信号：排便习惯改变·便血</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">大肠 · 水分回收站（课外拓展）</text>
    </svg>
  );
}

function ToothSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 三种牙 */}
      <g style={dim(active, 0)}>
        <path d="M92 110 q 0 -26 22 -26 q 22 0 22 26 l -4 44 q -18 12 -36 0 Z" fill="#f4f0e8" stroke="#b5a582" strokeWidth="2.4" />
        <text x="114" y="180" textAnchor="middle" fontSize="12.5" fill="#8a6a3a" fontWeight="700">门齿（切）</text>
        <path d="M210 84 l 36 -12 q 12 -2 12 14 l -6 62 q -24 12 -44 2 Z" fill="#f4f0e8" stroke="#b5a582" strokeWidth="2.4" />
        <text x="236" y="180" textAnchor="middle" fontSize="12.5" fill="#8a6a3a" fontWeight="700">犬齿（撕）</text>
        <path d="M330 92 q 4 -22 26 -22 q 24 0 26 24 l -2 34 l -10 10 l -8 -8 l -10 8 l -10 -8 Z" fill="#f4f0e8" stroke="#b5a582" strokeWidth="2.4" />
        <text x="356" y="180" textAnchor="middle" fontSize="12.5" fill="#8a6a3a" fontWeight="700">臼齿（磨）</text>
        <text x="240" y="212" textAnchor="middle" fontSize="12.5" fill="#6a5a2a" fontWeight="700">牙齿分化 = 哺乳动物特征（与爬行同型齿对比）</text>
      </g>
      {/* 结构剖面 */}
      <g style={dim(active, 1)}>
        <path d="M120 226 q 0 -30 30 -30 q 30 0 30 30 l -6 74 q -24 14 -48 0 Z" fill="#f8f6ee" stroke="#b5a582" strokeWidth="2.6" />
        <path d="M124 224 q 0 -24 26 -24 q 26 0 26 24 l -5 70 q -21 11 -42 0 Z" fill="#fdf9ee" stroke="#e0d8c0" strokeWidth="2" />
        <path d="M148 196 v 96 m -16 -20 q 16 -10 32 0" fill="none" stroke="#c9a05a" strokeWidth="2" />
        <text x="176" y="240" fontSize="12.5" fill="#8a7a4a" fontWeight="700">釉质（人体最硬）</text>
        <text x="176" y="264" fontSize="12.5" fill="#8a7a4a" fontWeight="700">牙本质 · 牙髓（神经血管）</text>
        <line x1="172" y1="236" x2="152" y2="222" stroke="#8a7a4a" strokeWidth="1.2" />
        <text x="60" y="330" fontSize="12.5" fill="#6a5a2a" fontWeight="700">牙根埋在牙槽骨·牙周膜固定</text>
      </g>
      {/* 龋齿 */}
      <g style={dim(active, 2)}>
        <path d="M370 230 q 0 -26 26 -26 q 26 0 26 26 l -4 66 q -22 12 -44 0 Z" fill="#f4f0e8" stroke="#b5a582" strokeWidth="2.4" />
        <ellipse cx="386" cy="242" rx="9" ry="7" fill="#6a4a2a" stroke="#3a2a1a" strokeWidth="1.6" />
        <text x="430" y="246" fontSize="12.5" fill="#6a4a2a" fontWeight="700">龋洞（蛀牙）</text>
        <text x="330" y="330" fontSize="12.5" fill="#8a671b" fontWeight="700">糖 + 变形链球菌 → 酸腐蚀釉质</text>
      </g>
      {/* 保护 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">消化从口腔开始：牙齿物理研磨 + 唾液淀粉酶化学分解——细嚼慢咽减轻胃的负担</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">牙齿 · 消化的第一道工序（课外拓展）</text>
    </svg>
  );
}

function TonsilSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 口咽腔 */}
      <g style={dim(active, 0)}>
        <path d="M170 90 Q 260 62 350 90 Q 386 170 350 268 Q 260 300 170 268 Q 134 170 170 90 Z" fill="#f0b8a8" stroke="#a54838" strokeWidth="2.8" />
        <path d="M206 96 Q 260 78 314 96 Q 322 110 314 120 Q 260 104 206 120 Q 198 110 206 96 Z" fill="#d88a6a" stroke="#a54838" strokeWidth="1.8" />
        <text x="260" y="78" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="700">口咽腔（食物与气体的十字路口）</text>
      </g>
      {/* 腭扁桃体 */}
      <g style={dim(active, 1)}>
        <ellipse cx="212" cy="176" rx="26" ry="40" fill="#d86a6a" stroke="#a53030" strokeWidth="2.6" />
        <ellipse cx="308" cy="176" rx="26" ry="40" fill="#d86a6a" stroke="#a53030" strokeWidth="2.6" />
        {[0, 1, 2].map((i) => (
          <circle key={`l${i}`} cx={206 + (i % 2) * 12} cy={160 + i * 20} r="2.6" fill="#8a2020" />
        ))}
        <text x="60" y="140" fontSize="12.5" fill="#a53030" fontWeight="700">腭扁桃体（一对）</text>
        <text x="60" y="160" fontSize="12.5" fill="#a53030">表面的隐窝 诱捕病原菌</text>
        <line x1="150" y1="150" x2="188" y2="164" stroke="#a53030" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 免疫功能 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={250 + (i % 3) * 10} cy={168 + Math.floor(i / 3) * 16} r="3.4" fill="#4d7ea8" stroke="#2c5a84" strokeWidth="1" />
        ))}
        <text x="330" y="230" fontSize="12.5" fill="#2c5a84" fontWeight="700">淋巴细胞密集：</text>
        <text x="330" y="250" fontSize="12.5" fill="#2c5a84">5~7 岁免疫最活跃的"练兵场"</text>
        <text x="330" y="270" fontSize="12.5" fill="#2c5a84">属于第二道防线周边的免疫关卡</text>
      </g>
      {/* 发炎 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="296" width="440" height="60" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"扁桃体发炎" = 免疫系统正在战斗：红肿热痛是炎症反应的表现</text>
        <text x="260" y="342" textAnchor="middle" fontSize="11.5" fill="#a5761d">反复化脓性发炎才考虑切除——它毕竟是前线的免疫器官，不轻易摘</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">扁桃体 · 咽喉的免疫关卡（课外拓展）</text>
    </svg>
  );
}

function NasalCavitySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 鼻腔剖面 */}
      <g style={dim(active, 0)}>
        <path d="M150 80 q -16 60 -6 130 q 4 34 22 54 l 60 0 q -30 -30 -30 -80 q 0 -56 18 -104 Z" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2.8" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M158 ${104 + i * 34} q 24 -8 44 2`} fill="none" stroke="#c99a7a" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="46" y="70" fontSize="12.5" fill="#8a5a3a" fontWeight="700">鼻前庭（鼻毛滤尘）</text>
        <text x="46" y="90" fontSize="12.5" fill="#8a5a3a" fontWeight="700">鼻甲（加温加湿）</text>
        <line x1="130" y1="96" x2="158" y2="108" stroke="#8a5a3a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 嗅黏膜 */}
      <g style={dim(active, 1)}>
        <path d="M224 88 q 10 36 8 76 q -2 28 -14 52" fill="none" stroke="#b07898" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={232 + (i % 2) * 10} cy={104 + i * 22} r="4.5" fill="#8a4a6a" stroke="#5a2a4a" strokeWidth="1.2" />
        ))}
        <text x="330" y="96" fontSize="12.5" fill="#8a4a6a" fontWeight="700">嗅黏膜（鼻腔顶部的黄褐色区域）</text>
        <text x="330" y="116" fontSize="12.5" fill="#8a4a6a">嗅细胞 = 唯一暴露于体表的神经元</text>
        <line x1="326" y1="110" x2="252" y2="130" stroke="#8a4a6a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 嗅觉传导 */}
      <g style={dim(active, 2)}>
        <path d="M238 92 Q 260 56 300 44" fill="none" stroke="#4d7ea8" strokeWidth="3.4" />
        <ellipse cx="330" cy="40" rx="40" ry="18" fill="#d8c0e0" stroke="#7a4a8a" strokeWidth="2.2" />
        <text x="382" y="52" fontSize="12.5" fill="#7a4a8a" fontWeight="700">嗅球 → 嗅神经</text>
        <text x="382" y="72" fontSize="12.5" fill="#7a4a8a">→ 大脑嗅觉中枢</text>
        <text x="46" y="210" fontSize="12.5" fill="#2c5a84" fontWeight="700">人类约 400 种嗅觉受体</text>
        <text x="46" y="230" fontSize="12.5" fill="#2c5a84">可分辨约 1 万亿种气味</text>
      </g>
      {/* 与味觉协同 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="270" width="440" height="90" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="296" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"味道"= 味觉（舌·酸甜苦咸鲜）+ 嗅觉（鼻后气味）的协同</text>
        <text x="260" y="320" textAnchor="middle" fontSize="11.5" fill="#a5761d">感冒鼻塞时吃饭不香——嗅觉通路被堵，只剩味觉的五种基本味</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">气味分子必须溶于嗅黏膜的黏液才能刺激嗅细胞（湿的鼻子才灵敏）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">鼻与嗅觉 · 化学感受（课外拓展）</text>
    </svg>
  );
}

function VaccineTypesSvg({ active }: { active: number | null; open?: boolean }) {
  const vaccines = [
    { n: '减毒活疫苗', ex: '麻疹·水痘·卡介苗', d: '毒力减弱的活病毒/菌·免疫强而持久', c: '#3f7f3a' },
    { n: '灭活疫苗', ex: '狂犬·流感·新冠灭活', d: '加热/甲醛杀死的病原·安全但需加强针', c: '#2c5a84' },
    { n: '亚单位/类毒素', ex: '乙肝·百白破', d: '只用病原的蛋白片段或解毒毒素', c: '#8a671b' },
    { n: 'mRNA/载体疫苗', ex: '新冠 mRNA·埃博拉', d: '递送"图纸"让细胞自己造抗原', c: '#7a4a8a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {vaccines.map((v, i) => (
        <g key={v.n} style={dim(active, i)}>
          <rect x="36" y={52 + i * 62} width="448" height="52" rx="12" fill="#f8faf6" stroke={v.c} strokeWidth="2.4" />
          <text x="54" y={74 + i * 62} fontSize="13" fill={v.c} fontWeight="800">{v.n}</text>
          <text x="200" y={74 + i * 62} fontSize="11" fill="#59767c">{v.ex}</text>
          <text x="54" y={94 + i * 62} fontSize="11" fill="#59767c">{v.d}</text>
        </g>
      ))}
      <g style={dim(active, 4)}>
        <rect x="40" y="316" width="440" height="50" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="260" y="336" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">共同原理：抗原（无害）→ 初次免疫产生记忆细胞 → 再次遇到病原时二次免疫更快更强</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#537078">免疫最强：减毒活 &gt; 灭活 &gt; 亚单位；最安全：亚单位/mRNA（不含完整病原）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">疫苗的种类 · 人工主动免疫（课外拓展）</text>
    </svg>
  );
}

function LarynxSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 气道 */}
      <g style={dim(active, 0)}>
        <path d="M216 60 q 44 -14 88 0 l -10 60 q -34 -10 -68 0 Z" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2.6" />
        <path d="M230 120 q 30 26 60 0 l 16 96 q -46 22 -92 0 Z" fill="#e8c9a8" stroke="#a5765a" strokeWidth="2.6" />
        <text x="330" y="84" fontSize="12.5" fill="#8a5a3a" fontWeight="700">咽（食物与气体共用通道）</text>
        <line x1="326" y1="88" x2="296" y2="84" stroke="#8a5a3a" strokeWidth="1.2" />
        <text x="330" y="230" fontSize="12.5" fill="#8a5a3a" fontWeight="700">气管（软骨环支撑）</text>
        <line x1="326" y1="234" x2="292" y2="220" stroke="#8a5a3a" strokeWidth="1.2" />
      </g>
      {/* 声带 */}
      <g style={dim(active, 1)}>
        <path d="M234 176 q 26 20 52 0 l -6 14 q -20 12 -40 0 Z" fill="#d86a6a" stroke="#a53030" strokeWidth="2.4" />
        <text x="60" y="170" fontSize="12.5" fill="#a53030" fontWeight="700">声带（两片弹性黏膜皱襞）</text>
        <text x="60" y="190" fontSize="12.5" fill="#a53030">气流冲击振动 → 发出声音</text>
        <line x1="200" y1="180" x2="232" y2="182" stroke="#a53030" strokeWidth="1.2" />
        <text x="330" y="182" fontSize="12.5" fill="#8a3a2a" fontWeight="700">男声带长厚 → 音调低</text>
        <text x="330" y="202" fontSize="12.5" fill="#8a3a2a">青春期变声的由来</text>
      </g>
      {/* 会厌 */}
      <g style={dim(active, 2)}>
        <path d="M228 128 q 32 22 64 0 q -6 26 -32 26 q -26 0 -32 -26 Z" fill="#c9a05a" stroke="#8a671b" strokeWidth="2.2" />
        <text x="42" y="120" fontSize="12.5" fill="#8a671b" fontWeight="700">会厌软骨（吞咽时盖住喉口）</text>
        <text x="42" y="140" fontSize="12.5" fill="#8a671b">防食物入气管——吃饭说笑易呛</text>
      </g>
      {/* 原理 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="300" width="440" height="60" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">发声三要素：肺部气流（动力）+ 声带振动（声源）+ 口腔舌唇（共鸣与吐字）</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#a5761d">音调由声带振动频率决定（紧张度·长度）· 音量由气流强度决定</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">喉与声带 · 人为什么会说话（课外拓展）</text>
    </svg>
  );
}

function SpinalCordSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 横切面 */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="170" rx="86" ry="64" fill="#f0e8dc" stroke="#b5a582" strokeWidth="3" />
        <path d="M250 130 q -40 -6 -52 18 q -10 22 12 30 q -14 16 4 32 q 20 16 36 -2 q 16 18 36 2 q 18 -16 4 -32 q 22 -8 12 -30 q -12 -24 -52 -18 Z" fill="#c9b0b8" stroke="#8a5a6a" strokeWidth="2.4" />
        <text x="358" y="140" fontSize="12.5" fill="#8a5a6a" fontWeight="700">灰质（蝴蝶形·神经元胞体）</text>
        <line x1="364" y1="144" x2="316" y2="162" stroke="#8a5a6a" strokeWidth="1.2" />
        <text x="368" y="206" fontSize="12.5" fill="#8a7a4a" fontWeight="700">白质（神经纤维传导束）</text>
        <line x1="364" y1="202" x2="322" y2="190" stroke="#8a7a4a" strokeWidth="1.2" />
      </g>
      {/* 脊神经根 */}
      <g style={dim(active, 1)}>
        <path d="M168 128 Q 116 116 84 96" fill="none" stroke="#4d7ea8" strokeWidth="5" strokeLinecap="round" />
        <path d="M168 216 Q 116 228 84 248" fill="none" stroke="#b0483a" strokeWidth="5" strokeLinecap="round" />
        <circle cx="128" cy="116" r="7" fill="#4d7ea8" stroke="#2c5a84" strokeWidth="1.8" />
        <text x="42" y="76" fontSize="12.5" fill="#2c5a84" fontWeight="700">背根（传入·感觉）</text>
        <text x="42" y="94" fontSize="12.5" fill="#2c5a84">背根神经节</text>
        <text x="42" y="298" fontSize="12.5" fill="#a53030" fontWeight="700">腹根（传出·运动）</text>
      </g>
      {/* 功能 */}
      <g style={dim(active, 2)}>
        <path d="M332 120 Q 420 70 448 44" fill="none" stroke="#3f7f3a" strokeWidth="4" strokeLinecap="round" />
        <path d="M448 44 l -12 2 m 12 -2 l -2 12" fill="none" stroke="#3f7f3a" strokeWidth="4" strokeLinecap="round" />
        <path d="M332 224 Q 420 272 448 300" fill="none" stroke="#8a671b" strokeWidth="4" strokeLinecap="round" />
        <path d="M448 300 l -2 -12 m 2 12 l -12 -2" fill="none" stroke="#8a671b" strokeWidth="4" strokeLinecap="round" />
        <text x="330" y="52" fontSize="12.5" fill="#2f6f2a" fontWeight="700">上行传导：感觉 → 脑</text>
        <text x="300" y="322" fontSize="12.5" fill="#8a671b" fontWeight="700">下行传导：脑 → 运动</text>
        <text x="96" y="344" fontSize="12.5" fill="#4b6c73" fontWeight="700">反射中枢：膝跳反射、排尿反射的低级中枢在脊髓</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">脊髓 · 反射中枢与上传下达的"信息高速路"</text>
    </svg>
  );
}

function CerebralCortexSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 大脑轮廓（侧面） */}
      <g style={dim(active, 0)}>
        <path d="M110 190 Q 96 96 210 72 Q 340 50 400 130 Q 420 190 386 240 Q 340 300 250 306 Q 160 310 126 252 Q 108 220 110 190 Z" fill="#e8d8d0" stroke="#a5765a" strokeWidth="3" />
        <path d="M170 100 q 30 20 6 46 q -22 24 6 44 m 60 -110 q 26 22 4 50 q -20 26 8 46 m 66 -96 q 24 24 2 50" fill="none" stroke="#c9a08a" strokeWidth="2" opacity="0.7" />
        <text x="42" y="310" fontSize="12.5" fill="#a5765a" fontWeight="700">大脑皮层（约 2~3 mm 厚·140 亿神经元）</text>
      </g>
      {/* 运动区（中央前回） */}
      <g style={dim(active, 1)}>
        <path d="M212 84 q 16 40 -2 96 l 26 4 q 20 -58 4 -104 Z" fill="#f4b87a" stroke="#8a5a1d" strokeWidth="2" />
        <text x="238" y="70" fontSize="12.5" fill="#8a5a1d" fontWeight="700">躯体运动中枢</text>
        <text x="238" y="88" fontSize="12.5" fill="#8a5a1d">（对侧支配·倒置分布）</text>
        <line x1="236" y1="76" x2="226" y2="88" stroke="#8a5a1d" strokeWidth="1.2" />
      </g>
      {/* 感觉区（中央后回） */}
      <g style={dim(active, 2)}>
        <path d="M178 92 q 20 42 4 100 l 24 4 q 16 -62 0 -108 Z" fill="#b8d8b0" stroke="#3f7f3a" strokeWidth="2" />
        <text x="66" y="120" fontSize="12.5" fill="#2f6f2a" fontWeight="700">躯体感觉中枢</text>
        <text x="66" y="138" fontSize="12.5" fill="#2f6f2a">（管理对侧躯体感觉）</text>
        <line x1="150" y1="128" x2="184" y2="136" stroke="#2f6f2a" strokeWidth="1.2" />
      </g>
      {/* 语言与视听区 */}
      <g style={dim(active, 3)}>
        <ellipse cx="352" cy="196" rx="30" ry="22" fill="#d8c0e0" stroke="#7a4a8a" strokeWidth="2" />
        <text x="394" y="186" fontSize="12.5" fill="#7a4a8a" fontWeight="700">语言中枢（人类特有）</text>
        <text x="394" y="204" fontSize="12.5" fill="#7a4a8a">S区说话 · H区听懂</text>
        <ellipse cx="322" cy="108" rx="26" ry="18" fill="#a8c8e8" stroke="#2c5a84" strokeWidth="2" />
        <text x="42" y="72" fontSize="12.5" fill="#2c5a84" fontWeight="700">视觉中枢</text>
        <line x1="96" y1="76" x2="296" y2="104" stroke="#2c5a84" strokeWidth="1.2" />
        <ellipse cx="322" cy="262" rx="24" ry="16" fill="#f0d090" stroke="#8a671b" strokeWidth="2" />
        <text x="42" y="276" fontSize="12.5" fill="#8a671b" fontWeight="700">听觉中枢</text>
        <line x1="96" y1="272" x2="298" y2="264" stroke="#8a671b" strokeWidth="1.2" />
      </g>
      {/* 考点 */}
      <g style={dim(active, 4)}>
        <rect x="40" y="318" width="440" height="46" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="336" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">考点：中央前回倒置管理对侧运动（头面部正立）· 言语区受损致失语症</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">S 区受损：能听懂写不出（运动性失语）· H 区受损：听不懂（听觉性失语）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">大脑皮层 · 功能定位（课内拓展）</text>
    </svg>
  );
}

function StomachSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 外形 */}
      <g style={dim(active, 0)}>
        <path d="M118 84 Q 96 78 90 100 Q 84 124 116 136 Q 160 260 246 292 Q 322 318 366 280 Q 396 254 386 212 L 380 168 Q 372 108 320 88 Q 220 66 118 84 Z" fill="#d88a6a" stroke="#a5533c" strokeWidth="3" />
        <text x="56" y="72" fontSize="12.5" fill="#a5533c" fontWeight="700">贲门（接食管）</text>
        <line x1="100" y1="78" x2="104" y2="94" stroke="#a5533c" strokeWidth="1.3" />
        <text x="396" y="238" fontSize="12.5" fill="#a5533c" fontWeight="700">幽门（接十二指肠）</text>
        <line x1="392" y1="242" x2="372" y2="252" stroke="#a5533c" strokeWidth="1.3" />
      </g>
      {/* 黏膜皱襞与胃腺 */}
      <g style={dim(active, 1)}>
        <path d="M150 140 q 20 34 34 84 m 36 -100 q 16 40 24 92 m 40 -104 q 12 44 12 96" fill="none" stroke="#a5533c" strokeWidth="2.4" opacity="0.7" />
        <text x="330" y="120" fontSize="12.5" fill="#8a3a2a" fontWeight="700">黏膜皱襞（拉伸展开）</text>
        <circle cx="196" cy="180" r="5" fill="#f4d06a" stroke="#8a671b" strokeWidth="1.6" />
        <circle cx="212" cy="196" r="5" fill="#f4d06a" stroke="#8a671b" strokeWidth="1.6" />
        <text x="330" y="146" fontSize="12.5" fill="#8a671b" fontWeight="700">胃腺：盐酸 + 胃蛋白酶原</text>
        <text x="330" y="168" fontSize="12.5" fill="#8a671b">盐酸杀菌·激活胃蛋白酶</text>
        <text x="330" y="188" fontSize="12.5" fill="#8a671b">胃蛋白酶分解蛋白质</text>
      </g>
      {/* 肌层蠕动 */}
      <g style={dim(active, 2)}>
        <path d="M240 96 q -24 90 6 190 m 60 -196 q -20 92 8 188" fill="none" stroke="#b05a3a" strokeWidth="4" opacity="0.5" />
        <text x="86" y="216" fontSize="12.5" fill="#8a4a2a" fontWeight="700">三层平滑肌收缩</text>
        <text x="86" y="236" fontSize="12.5" fill="#8a4a2a" fontWeight="700">搅拌+磨碎食物</text>
        <line x1="146" y1="224" x2="180" y2="210" stroke="#8a4a2a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 功能与屏障 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="322" width="440" height="44" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="340" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">功能：暂存食物 · 初步消化蛋白质（蛋白质 → 多肽）</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11.5" fill="#a5761d">黏液-碳酸氢盐屏障挡住盐酸——屏障受损则发生胃炎、胃溃疡</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">胃 · 消化管最膨大的部分（课外拓展）</text>
    </svg>
  );
}

function LiverSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 外形 */}
      <g style={dim(active, 0)}>
        <path d="M70 130 Q 130 84 240 88 Q 350 92 408 128 Q 436 148 420 186 Q 400 236 330 244 Q 250 252 200 238 Q 110 250 74 206 Q 52 168 70 130 Z" fill="#8a3a3a" stroke="#5a2020" strokeWidth="3" />
        <path d="M232 90 Q 240 150 236 244" fill="none" stroke="#5a2020" strokeWidth="2.2" opacity="0.7" />
        <text x="96" y="70" fontSize="12.5" fill="#5a2020" fontWeight="700">肝（右叶大·左叶小）</text>
        <text x="380" y="286" fontSize="12.5" fill="#5a2020" fontWeight="700">成人体内约 1.5 kg</text>
        <line x1="376" y1="280" x2="330" y2="246" stroke="#5a2020" strokeWidth="1.3" strokeDasharray="3 3" />
      </g>
      {/* 胆囊与胆汁 */}
      <g style={dim(active, 1)}>
        <path d="M300 240 Q 306 268 336 274 Q 362 278 366 260 Q 368 246 344 238 Q 318 232 300 240 Z" fill="#7aa87a" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="330" y="308" textAnchor="middle" fontSize="12.5" fill="#3f7f3a" fontWeight="700">胆囊（储存浓缩胆汁）</text>
        <path d="M300 246 L 260 258 L 196 236" fill="none" stroke="#3f7f3a" strokeWidth="3.4" />
        <text x="120" y="288" fontSize="12.5" fill="#3f7f3a" fontWeight="700">胆汁经导管流入小肠</text>
        <line x1="180" y1="280" x2="220" y2="248" stroke="#3f7f3a" strokeWidth="1.3" />
      </g>
      {/* 肝小叶/肝细胞 */}
      <g style={dim(active, 2)}>
        <circle cx="130" cy="170" r="34" fill="#a5533c" stroke="#5a2020" strokeWidth="2" opacity="0.9" />
        <path d="M130 170 l 0 -34 m 0 34 l 30 17 m -30 -17 l -30 17" stroke="#f0d0b0" strokeWidth="2" />
        <text x="40" y="232" fontSize="12.5" fill="#8a5a2a" fontWeight="700">肝小叶（肝的基本单位）</text>
        <line x1="176" y1="226" x2="160" y2="206" stroke="#8a5a2a" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="42" y="100" fontSize="12.5" fill="#8a5a2a" fontWeight="700">合成肝糖原储存能量</text>
        <text x="42" y="120" fontSize="12.5" fill="#8a5a2a" fontWeight="700">血浆蛋白也在这里合成</text>
      </g>
      {/* 功能 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="346" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">三大功能：分泌胆汁（不含酶·乳化脂肪）· 解毒（转化氨等有毒物）· 物质转化枢纽</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#a5761d">肝细胞再生能力强——捐献部分肝后可逐渐恢复</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">肝脏 · 最大的消化腺与"化工厂"（课外拓展）</text>
    </svg>
  );
}

function PancreaticIsletSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 胰腺轮廓 + 胰岛 */}
      <g style={dim(active, 0)}>
        <path d="M96 190 Q 96 150 150 138 Q 230 120 330 128 Q 400 134 420 164 Q 430 184 400 196 Q 320 226 220 224 Q 130 224 96 190 Z" fill="#e8c9a0" stroke="#a5763a" strokeWidth="2.8" />
        <text x="424" y="150" fontSize="12.5" fill="#a5763a" fontWeight="700">胰腺</text>
        <text x="300" y="112" fontSize="12.5" fill="#a5763a" fontWeight="600">胰腺中的内分泌细胞群——胰岛</text>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={150 + i * 90} cy={170} r="7" fill="#4d7ea8" opacity="0.6" />
        ))}
        <text x="86" y="128" fontSize="12.5" fill="#4b6c73" fontWeight="700">放大一个胰岛 ↓</text>
        <path d="M150 178 q -6 18 -34 22" fill="none" stroke="#4b6c73" strokeWidth="1.4" strokeDasharray="3 3" />
      </g>
      {/* β 细胞 */}
      <g style={dim(active, 1)}>
        <circle cx="176" cy="262" r="46" fill="#c9d8e8" stroke="#2c5a84" strokeWidth="2.8" />
        <text x="176" y="256" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">β 细胞</text>
        <text x="176" y="276" textAnchor="middle" fontSize="10.5" fill="#2c5a84">约占 70%</text>
        <text x="176" y="292" textAnchor="middle" fontSize="10.5" fill="#2c5a84">分泌胰岛素</text>
        <text x="286" y="240" fontSize="12.5" fill="#2c5a84" fontWeight="700">降血糖：促进细胞摄取、</text>
        <text x="286" y="260" fontSize="12.5" fill="#2c5a84" fontWeight="700">利用和储存葡萄糖</text>
        <line x1="282" y1="252" x2="226" y2="262" stroke="#2c5a84" strokeWidth="1.4" />
      </g>
      {/* α 细胞 */}
      <g style={dim(active, 2)}>
        <circle cx="176" cy="262" r="20" fill="#f4d0c9" stroke="#a54838" strokeWidth="2.4" />
        <text x="176" y="267" textAnchor="middle" fontSize="10" fill="#8a3a2a" fontWeight="700">α</text>
        <text x="60" y="318" fontSize="12.5" fill="#8a3a2a" fontWeight="700">α 细胞（约 20%）→ 胰高血糖素</text>
        <text x="286" y="308" fontSize="12.5" fill="#8a3a2a" fontWeight="700">升血糖：促进肝糖原分解、</text>
        <text x="286" y="328" fontSize="12.5" fill="#8a3a2a" fontWeight="700">非糖物质转化</text>
      </g>
      {/* 拮抗 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">胰岛素 ↓ 与胰高血糖素 ↑ 拮抗作用——共同维持血糖 3.9~6.1 mmol/L 稳态</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">胰岛 · 血糖调节的内分泌细胞群</text>
    </svg>
  );
}

function SpleenSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 位置轮廓 */}
      <g style={dim(active, 0)}>
        <path d="M120 96 Q 210 62 300 96 Q 342 112 342 170 Q 342 238 262 268 Q 186 292 148 244 Q 116 204 120 96 Z" fill="#a54858" stroke="#7a2a38" strokeWidth="3" />
        <path d="M148 244 Q 190 258 232 250" fill="none" stroke="#7a2a38" strokeWidth="2" opacity="0.6" />
        <text x="72" y="70" fontSize="12.5" fill="#7a2a38" fontWeight="700">脾（左上腹·胃的后外侧）</text>
        <path d="M330 130 Q 366 118 384 96" fill="none" stroke="#7a2a38" strokeWidth="2" strokeDasharray="4 3" />
        <text x="356" y="84" fontSize="12.5" fill="#7a2a38" fontWeight="600">膈面贴膈</text>
        <ellipse cx="430" cy="170" rx="34" ry="58" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2" opacity="0.7" />
        <text x="430" y="248" textAnchor="middle" fontSize="12.5" fill="#8a5a3a" fontWeight="600">肾（毗邻）</text>
      </g>
      {/* 红髓 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={168 + (i % 3) * 46} cy={136 + Math.floor(i / 3) * 52} r="15" fill="#c96a6a" stroke="#8a3030" strokeWidth="1.8" opacity="0.85" />
        ))}
        <text x="418" y="308" fontSize="12.5" fill="#8a3030" fontWeight="700">红髓：过滤血液</text>
        <text x="418" y="328" fontSize="12.5" fill="#8a3030" fontWeight="700">吞噬衰老红细胞</text>
        <line x1="414" y1="312" x2="286" y2="270" stroke="#8a3030" strokeWidth="1.3" strokeDasharray="3 3" />
      </g>
      {/* 白髓 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={200 + (i % 2) * 58} cy={210 + Math.floor(i / 2) * 34} r="8" fill="#e8ecf4" stroke="#2c5a84" strokeWidth="2" />
        ))}
        <text x="88" y="318" fontSize="12.5" fill="#2c5a84" fontWeight="700">白髓：淋巴细胞聚集</text>
        <text x="88" y="338" fontSize="12.5" fill="#2c5a84" fontWeight="700">发生免疫应答的场所</text>
        <line x1="196" y1="322" x2="206" y2="286" stroke="#2c5a84" strokeWidth="1.3" strokeDasharray="3 3" />
      </g>
      {/* 功能 */}
      <g style={dim(active, 3)}>
        <rect x="120" y="344" width="280" height="30" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">最大的免疫器官 · 储血 · 胎儿期造血</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">脾脏 · 免疫与滤血（课外拓展）</text>
    </svg>
  );
}

function EarStructureSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 外耳 */}
      <g style={dim(active, 0)}>
        <path d="M84 96 Q 60 118 72 150 Q 58 168 74 186 Q 66 210 92 216 Q 100 240 128 230 Q 150 224 148 198 Q 156 170 140 150 Q 152 120 128 102 Q 106 86 84 96 Z" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2.6" />
        <path d="M96 130 Q 112 122 124 138 Q 132 154 118 168 Q 106 180 98 168" fill="none" stroke="#c99a7a" strokeWidth="2" />
        <text x="42" y="256" fontSize="12.5" fill="#8a5a3a" fontWeight="700">耳廓（收集声波）</text>
        <path d="M148 196 Q 196 206 224 208" fill="none" stroke="#c99a7a" strokeWidth="18" strokeLinecap="round" opacity="0.55" />
        <path d="M148 196 Q 196 206 224 208" fill="none" stroke="#a5765a" strokeWidth="2" strokeDasharray="5 4" />
        <text x="120" y="298" fontSize="12.5" fill="#8a5a3a" fontWeight="700">外耳道（传导声波）</text>
      </g>
      {/* 中耳 */}
      <g style={dim(active, 1)}>
        <ellipse cx="240" cy="208" rx="9" ry="26" fill="#e8dcc8" stroke="#8a7a4a" strokeWidth="2.4" />
        <text x="240" y="292" fontSize="12.5" fill="#8a7a4a" fontWeight="700">鼓膜（振动）</text>
        <line x1="240" y1="278" x2="240" y2="236" stroke="#8a7a4a" strokeWidth="1.4" />
        <path d="M254 196 l 16 -10 m -14 12 l 18 -2 m -16 8 l 16 8" stroke="#8a7a4a" strokeWidth="3.4" strokeLinecap="round" />
        <text x="212" y="150" fontSize="12.5" fill="#8a7a4a" fontWeight="700">听小骨（锤·砧·镫）</text>
        <path d="M288 226 Q 330 248 348 296" fill="none" stroke="#c99a7a" strokeWidth="9" strokeLinecap="round" opacity="0.6" />
        <text x="310" y="322" fontSize="12.5" fill="#8a5a3a" fontWeight="700">咽鼓管（通咽·平衡气压）</text>
      </g>
      {/* 内耳 */}
      <g style={dim(active, 2)}>
        <path d="M300 96 Q 356 72 400 96 Q 356 108 300 116 Q 316 86 300 96 Z" fill="none" stroke="#b0483a" strokeWidth="0" />
        <path d="M312 132 Q 312 96 352 96 Q 392 96 392 132 Q 392 168 352 168 Q 340 168 336 158" fill="none" stroke="#4d7ea8" strokeWidth="7" strokeLinecap="round" />
        <circle cx="336" cy="158" r="5" fill="#4d7ea8" />
        <text x="404" y="132" fontSize="12.5" fill="#2c5a84" fontWeight="700">耳蜗（听觉感受器）</text>
        <path d="M316 118 Q 322 78 352 68 Q 386 58 400 78" fill="none" stroke="#6a8a9a" strokeWidth="5" strokeLinecap="round" />
        <path d="M394 96 q 16 -34 -4 -46 q -18 -10 -30 6" fill="none" stroke="#6a8a9a" strokeWidth="5" strokeLinecap="round" />
        <text x="404" y="76" fontSize="12.5" fill="#4a6a7a" fontWeight="700">半规管（位置觉）</text>
        <path d="M352 168 Q 356 210 348 248 Q 344 268 332 280" fill="none" stroke="#b0483a" strokeWidth="3.4" />
        <text x="356" y="252" fontSize="12.5" fill="#a53030" fontWeight="700">听神经（传向大脑）</text>
      </g>
      {/* 听觉形成 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="36" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="354" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">声波 → 鼓膜振动 → 听小骨 → 耳蜗感受器兴奋 → 听神经 → 大脑听觉中枢</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">耳的结构 · 听觉的形成（课外拓展）</text>
    </svg>
  );
}

function BloodClottingSvg({ active }: { active: number | null; open?: boolean }) {
  const steps = [
    { n: '①', t: '血管破损·血小板聚集', d: '血小板黏附于伤口释放凝血因子', x: 30, y: 70 },
    { n: '②', t: '凝血因子级联反应', d: '凝血酶原 → 凝血酶（需 Ca²⁺ 和维生素 K）', x: 30, y: 140 },
    { n: '③', t: '纤维蛋白原 → 纤维蛋白', d: '纤维蛋白交织成网·网住血细胞', x: 30, y: 210 },
    { n: '④', t: '血块形成·止血', d: '血块收缩·血清析出', x: 30, y: 280 },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {steps.map((st, i) => (
        <g key={st.n} style={dim(active, i)}>
          <rect x={st.x} y={st.y} width="440" height="52" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
          <text x={st.x + 16} y={st.y + 22} fontSize="12" fill="#8a671b" fontWeight="800">{st.n} {st.t}</text>
          <text x={st.x + 16} y={st.y + 42} fontSize="10.5" fill="#a5761d">{st.d}</text>
        </g>
      ))}
      {/* 连接箭头 */}
      <g style={dim(active, 0)}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M250 ${122 + i * 70} L 250 ${140 + i * 70}`} fill="none" stroke="#8a671b" strokeWidth="2.4" />
        ))}
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">血液凝固过程 · 血小板的止血功能（课外拓展）</text>
    </svg>
  );
}

function SmallIntestineVillusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <path d="M30 80 Q 260 50 490 80" fill="none" stroke="#c9885f" strokeWidth="8" strokeLinecap="round" />
        <text x="486" y="66" textAnchor="end" fontSize="12.5" fill="#c9885f" fontWeight="700">环形皱襞（黏膜折叠）</text>
      </g>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} style={dim(active, 1)}>
          <path d={`M${80 + i * 82} 92 q 6 50 14 88 q 2 6 8 6 q 6 0 8 -6 q 8 -38 14 -88 Z`} fill="#f2d8c8" stroke="#c9885f" strokeWidth="2.2" />
          <path d={`M${94 + i * 82} 100 q 2 30 4 70`} fill="none" stroke="#e8b84a" strokeWidth="3" />
          <path d={`M${86 + i * 82} 100 q -2 30 6 70`} fill="none" stroke="#c94a5a" strokeWidth="2.4" />
        </g>
      ))}
      <text x="486" y="120" textAnchor="end" fontSize="12.5" fill="#c9885f" fontWeight="700">小肠绒毛（手指状突起）</text>
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${200 + i * 6} 96 l 3 -14`} fill="none" stroke="#c9885f" strokeWidth="1.2" />
        ))}
        <text x="200" y="70" fontSize="11.5" fill="#c9885f" fontWeight="600">微绒毛（电镜下才可见）</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="30" y="268" width="460" height="94" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="52" y="294" fontSize="12" fill="#8a671b" fontWeight="800">三级放大 · 吸收面积约 200 m²（= 一个网球场）：</text>
        <text x="52" y="318" fontSize="11.5" fill="#7a5a1d">环形皱襞（×3）→ 绒毛（×8）→ 微绒毛（×20）——吸收面积增加约 600 倍</text>
        <text x="52" y="344" fontSize="11.5" fill="#49676d">绒毛内含丰富的毛细血管（吸收氨基酸葡萄糖）和毛细淋巴管（吸收脂肪）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">小肠绒毛结构模式图 · 消化吸收的结构基础</text>
    </svg>
  );
}

function DigestiveSystemSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <ellipse cx="180" cy="52" rx="26" ry="14" fill="#f4c8b0" stroke="#c9708a" strokeWidth="2.5" />
        <text x="24" y="48" fontSize="12.5" fill="#8a3a2a" fontWeight="700">口腔（咀嚼·唾液淀粉酶）</text>
        <path d="M206 54 Q 220 66 214 80 L 218 130" fill="none" stroke="#c9a882" strokeWidth="10" strokeLinecap="round" />
        <text x="240" y="110" fontSize="12.5" fill="#8a6a3a" fontWeight="700">食管（蠕动推送食物）</text>
        <path d="M214 130 Q 210 176 248 184 Q 290 190 296 158 Q 296 136 262 130 Q 232 122 214 130 Z" fill="#e8b8a0" stroke="#a5603a" strokeWidth="3" />
        <text x="304" y="168" fontSize="12.5" fill="#8a4a2a" fontWeight="700">胃（胃蛋白酶·盐酸·蠕动搅拌）</text>
        <path d="M240 186 Q 220 220 250 240 Q 280 260 310 244 Q 340 228 320 254 Q 300 278 270 270 Q 240 262 232 284" fill="none" stroke="#e8a06a" strokeWidth="14" strokeLinecap="round" />
        <text x="60" y="240" fontSize="12.5" fill="#c9534a" fontWeight="700">小肠（消化吸收主场所）</text>
        <path d="M232 284 Q 260 300 310 292 Q 370 284 400 262 L 400 240" fill="none" stroke="#c9b88a" strokeWidth="18" strokeLinecap="round" />
        <text x="330" y="322" fontSize="12.5" fill="#8a7a4a" fontWeight="700">大肠（吸收水分·形成粪便）</text>
        <circle cx="412" cy="246" r="6" fill="#8a671b" />
        <text x="424" y="250" fontSize="11" fill="#8a671b" fontWeight="600">肛门</text>
      </g>
      <g style={dim(active, 1)}>
        <ellipse cx="228" cy="38" rx="14" ry="9" fill="#c8e2d8" stroke="#3f9a5a" strokeWidth="2" />
        <text x="248" y="42" fontSize="11.5" fill="#3f9a5a" fontWeight="600">唾液腺</text>
        <path d="M278 192 Q 320 178 366 190 Q 376 200 368 214 Q 340 226 298 212 Q 274 202 278 192 Z" fill="#c9708a" stroke="#a54868" strokeWidth="2.5" />
        <text x="380" y="206" fontSize="13" fill="#a54868" fontWeight="800">肝（最大的消化腺）</text>
        <text x="380" y="224" fontSize="11" fill="#a54868">分泌胆汁（乳化脂肪）</text>
        <ellipse cx="330" cy="258" rx="30" ry="12" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.2" transform="rotate(-14 330 258)" />
        <text x="240" y="276" fontSize="12.5" fill="#a5761d" fontWeight="700">胰腺（胰液+胰岛素·胰高血糖素）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">消化系统模式图 · 消化道 + 消化腺</text>
    </svg>
  );
}

function RespiratorySystemSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <path d="M230 30 Q 244 22 258 30 L 256 48 L 232 48 Z" fill="#f2d8c4" stroke="#b58a6a" strokeWidth="2.5" />
        <text x="36" y="52" fontSize="12.5" fill="#8a6a3a" fontWeight="700">鼻（温暖·湿润·清洁空气）</text>
        <path d="M244 48 L 244 70 L 252 76 L 252 92" fill="none" stroke="#c9a882" strokeWidth="12" strokeLinecap="round" />
        <text x="270" y="72" fontSize="12" fill="#8a6a3a" fontWeight="600">咽</text>
        <ellipse cx="252" cy="84" rx="10" ry="8" fill="#c8e2d8" stroke="#3f9a5a" strokeWidth="2" />
        <text x="270" y="92" fontSize="12" fill="#3f7f3a" fontWeight="700">喉（发声器官）</text>
        <rect x="242" y="96" width="20" height="90" rx="8" fill="#d4e2e8" stroke="#7a9a9f" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={242} y1={106 + i * 13} x2={262} y2={106 + i * 13} stroke="#7a9a9f" strokeWidth="2.4" />
        ))}
        <text x="280" y="140" fontSize="12.5" fill="#4a5a6a" fontWeight="700">气管（C 形软骨环支撑）</text>
        <path d="M246 186 L 210 220 M254 186 L 290 220" fill="none" stroke="#c8d4dc" strokeWidth="10" strokeLinecap="round" />
        <text x="140" y="222" fontSize="12" fill="#4a5a6a" fontWeight="600">左右支气管</text>
        <path d="M178 220 Q 140 224 130 268 Q 126 306 168 310 Q 196 306 200 262 Q 202 234 178 220 Z" fill="#f2c8c0" stroke="#c97a6a" strokeWidth="3" />
        <path d="M312 220 Q 360 224 370 268 Q 374 306 332 310 Q 304 306 300 262 Q 302 234 312 220 Z" fill="#f2c8c0" stroke="#c97a6a" strokeWidth="3" />
        <text x="164" y="342" textAnchor="middle" fontSize="14" fill="#c9534a" fontWeight="800">左肺（2 叶）</text>
        <text x="340" y="342" textAnchor="middle" fontSize="14" fill="#c9534a" fontWeight="800">右肺（3 叶）</text>
        <text x="260" y="366" textAnchor="middle" fontSize="12" fill="#8a4a2a" fontWeight="700">肺泡壁+毛细血管壁 仅一层上皮细胞 → 高效气体交换</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">呼吸系统模式图</text>
    </svg>
  );
}

function NeuronTypesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <circle cx="80" cy="80" r="20" fill="#c8e2ba" stroke="#4a9a6a" strokeWidth="2.4" />
        <circle cx="74" cy="74" r="5" fill="#3f7f3a" />
        <path d="M100 72 L 150 72" stroke="#4a9a6a" strokeWidth="3" />
        <text x="80" y="60" textAnchor="middle" fontSize="10" fill="#2f7a4d" fontWeight="700">感觉神经元（假单极）</text>
      </g>
      <g style={dim(active, 1)}>
        <circle cx="180" cy="170" r="22" fill="#f4d06a" stroke="#c9a05a" strokeWidth="2.4" />
        <text x="180" y="175" textAnchor="middle" fontSize="9" fill="#8a671b" fontWeight="800">联络</text>
        <text x="180" y="210" textAnchor="middle" fontSize="10" fill="#c9a05a" fontWeight="600">中间神经元（中枢内）</text>
      </g>
      <g style={dim(active, 2)}>
        <circle cx="290" cy="80" r="20" fill="#c8d8e8" stroke="#3d6a94" strokeWidth="2.4" />
        <text x="290" y="86" textAnchor="middle" fontSize="9.5" fill="#1e4a68" fontWeight="800">运动</text>
        <text x="290" y="120" textAnchor="middle" fontSize="10" fill="#3d6a94" fontWeight="600">运动神经元（传出→肌肉）</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="290" width="440" height="56" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="312" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">反射弧：感受器 → 感觉神经元 → 中间神经元 → 运动神经元 → 效应器</text>
        <text x="260" y="334" textAnchor="middle" fontSize="11.5" fill="#a5761d">兴奋在神经元之间的传递是单向的（突触前膜→突触后膜）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">神经元的种类与连接 · 反射弧的结构基础</text>
    </svg>
  );
}

function SkeletonSystemSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="60" rx="32" ry="36" fill="#f4ecdc" stroke="#b5a582" strokeWidth="3" />
        <path d="M226 52 Q 250 36 274 52" fill="none" stroke="#c9b88a" strokeWidth="2" />
        <text x="310" y="48" fontSize="12" fill="#8a7a4a" fontWeight="700">颅骨（保护脑）</text>
        <line x1="284" y1="52" x2="282" y2="60" stroke="#8a7a4a" strokeWidth="1.3" />
        <path d="M250 96 L250 296" stroke="#c9b88a" strokeWidth="12" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <rect key={i} x={242} y={100 + i * 18} width="16" height="10" rx="3" fill="#e8dcc8" stroke="#b5a582" strokeWidth="1.5" />
        ))}
        <text x="180" y="220" fontSize="12" fill="#8a7a4a" fontWeight="700">脊柱（26 块椎骨·支撑+保护脊髓）</text>
        <line x1="182" y1="220" x2="242" y2="220" stroke="#8a7a4a" strokeWidth="1.3" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M250 ${110 + i * 22} Q ${200 + (i % 2) * 8} ${118 + i * 22} ${176} ${140 + i * 14} M250 ${110 + i * 22} Q ${300 - (i % 2) * 8} ${118 + i * 22} ${324} ${140 + i * 14}`} fill="none" stroke="#d8c9a0" strokeWidth="3" />
        ))}
        <text x="310" y="182" fontSize="12" fill="#8a7a4a" fontWeight="700">胸廓（12 对肋骨+胸骨·保护心肺）</text>
      </g>
      <g style={dim(active, 1)}>
        <path d="M180 130 L 140 190 L 130 240 M320 130 L 360 190 L 370 240" fill="none" stroke="#e8dcc8" strokeWidth="9" strokeLinecap="round" />
        <path d="M130 240 l-8 14 m8 -14 l0 16 m8 -16 l8 12" stroke="#e8dcc8" strokeWidth="4" strokeLinecap="round" />
        <path d="M370 240 l-8 14 m8 -14 l0 16 m8 -16 l8 12" stroke="#e8dcc8" strokeWidth="4" strokeLinecap="round" />
        <text x="96" y="130" fontSize="12" fill="#6a7a8a" fontWeight="600">上肢骨</text>
        <path d="M230 300 L 222 350 L 220 370 M270 300 L 278 350 L 280 370" fill="none" stroke="#e8dcc8" strokeWidth="10" strokeLinecap="round" />
        <text x="296" y="344" fontSize="12" fill="#6a7a8a" fontWeight="600">下肢骨（股骨最粗）</text>
      </g>
      <g style={dim(active, 2)}>
        <text x="100" y="374" fontSize="12.5" fill="#8a671b" fontWeight="700">骨连接（关节）· 成人共 206 块骨</text>
      </g>
    </svg>
  );
}

function HeartCompareSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 鱼：1房1室 */}
      <g style={dim(active, 0)}>
        <rect x="24" y="70" width="126" height="120" rx="12" fill="#eaf2f8" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="87" y="92" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="800">🐟 鱼类</text>
        <path d="M52 118 a 14 14 0 1 0 28 0 a 14 14 0 1 0 -28 0" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <text x="66" y="122" textAnchor="middle" fontSize="8.5" fill="#7a3a2a" fontWeight="700">房</text>
        <text x="88" y="122" textAnchor="middle" fontSize="8.5" fill="#7a3a2a" fontWeight="700">室</text>
        <text x="87" y="156" textAnchor="middle" fontSize="11" fill="#2c5a84">1 心房 · 1 心室</text>
        <text x="87" y="174" textAnchor="middle" fontSize="10" fill="#59767c">单循环 · 鳃毛细血管网</text>
      </g>
      {/* 两栖 */}
      <g style={dim(active, 1)}>
        <rect x="168" y="70" width="126" height="120" rx="12" fill="#eaf4ea" stroke="#4a9a6a" strokeWidth="2.4" />
        <text x="231" y="92" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="800">🐸 两栖类</text>
        <ellipse cx="212" cy="118" rx="14" ry="11" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <ellipse cx="244" cy="118" rx="14" ry="11" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <path d="M228 130 a 13 13 0 1 0 26 0 a 13 13 0 1 0 -26 0" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <text x="231" y="156" textAnchor="middle" fontSize="11" fill="#2f7a4d">2 心房 · 1 心室</text>
        <text x="231" y="174" textAnchor="middle" fontSize="10" fill="#59767c">动静脉血部分混合</text>
      </g>
      {/* 爬行 */}
      <g style={dim(active, 2)}>
        <rect x="312" y="70" width="126" height="120" rx="12" fill="#fdf6e3" stroke="#a5761d" strokeWidth="2.4" />
        <text x="375" y="92" textAnchor="middle" fontSize="13" fill="#8a5a1d" fontWeight="800">🦎 爬行类</text>
        <ellipse cx="356" cy="118" rx="14" ry="11" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <ellipse cx="388" cy="118" rx="14" ry="11" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <path d="M372 130 a 13 13 0 1 0 26 0 a 13 13 0 1 0 -26 0" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <line x1="372" y1="118" x2="398" y2="142" stroke="#a5603a" strokeWidth="2.4" />
        <text x="375" y="156" textAnchor="middle" fontSize="11" fill="#8a5a1d">2 房 1 室+不全分隔</text>
        <text x="375" y="174" textAnchor="middle" fontSize="10" fill="#59767c">不完全分隔</text>
      </g>
      {/* 鸟/哺乳四腔 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="204" width="440" height="120" rx="12" fill="#fff2ed" stroke="#b0483a" strokeWidth="2.4" />
        <text x="60" y="230" fontSize="13" fill="#8a2a1a" fontWeight="800">🐦 鸟类 · 🐕 哺乳类（恒温·双循环完全分开）</text>
        <g>
          <rect x="80" y="244" width="70" height="60" rx="10" fill="#f6c8c0" stroke="#b0483a" strokeWidth="2.4" />
          <line x1="115" y1="244" x2="115" y2="304" stroke="#b0483a" strokeWidth="3" />
          <line x1="80" y1="274" x2="150" y2="274" stroke="#b0483a" strokeWidth="3" />
          <text x="97" y="266" textAnchor="middle" fontSize="9.5" fill="#7a2a1a" fontWeight="700">房</text>
          <text x="97" y="296" textAnchor="middle" fontSize="9.5" fill="#7a2a1a" fontWeight="700">室</text>
          <text x="132" y="266" textAnchor="middle" fontSize="9.5" fill="#7a2a1a" fontWeight="700">房</text>
          <text x="132" y="296" textAnchor="middle" fontSize="9.5" fill="#7a2a1a" fontWeight="700">室</text>
        </g>
        <text x="180" y="270" fontSize="12" fill="#8a2a1a" fontWeight="700">2 心房 · 2 心室：动静脉血完全分开</text>
        <text x="180" y="292" fontSize="11.5" fill="#59767c">输氧效率最高 → 支持恒温与剧烈运动（飞行/奔跑）</text>
        <text x="180" y="314" fontSize="11.5" fill="#49676d">体循环 + 肺循环 完全独立</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">脊椎动物心脏的进化 · 结构与功能相适应</text>
    </svg>
  );
}

function SafeMedicationSvg({ active }: { active: number | null; open?: boolean }) {
  const rows = [
    { name: '处方药（Rx）', note: '必须凭执业医师处方购买·遵医嘱使用', color: '#3d6a94' },
    { name: '非处方药（OTC）', note: '可自行购买·按说明书使用', color: '#2f7a4d' },
  ];
  const rules = [
    '看清说明书：适应症、用法用量、有效期、禁忌与不良反应',
    '用药前明确诊断：不凭"经验"随意联合用药或加大剂量',
    '抗生素是处方药：滥用会催生耐药菌（回顾耐药性实验）',
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 两类药 */}
      {rows.map((r, i) => (
        <g key={r.name} style={dim(active, i)}>
          <rect x={26 + i * 240} y="52" width="228" height="72" rx="12" fill="#f4faf9" stroke={r.color} strokeWidth="2.4" />
          <text x={140 + i * 240} y={82} textAnchor="middle" fontSize="13.5" fill={r.color} fontWeight="800">{r.name}</text>
          <text x={140 + i * 240} y={108} textAnchor="middle" fontSize="11" fill="#59767c">{r.note}</text>
        </g>
      ))}
      {/* 药盒示意 */}
      <g style={dim(active, 0)}>
        <rect x="60" y="146" width="170" height="60" rx="8" fill="#eaf2f8" stroke="#3d6a94" strokeWidth="2.2" />
        <text x="76" y="172" fontSize="12" fill="#2c5a84" fontWeight="700">Rx</text>
        <rect x="290" y="146" width="170" height="60" rx="8" fill="#eaf4ea" stroke="#2f7a4d" strokeWidth="2.2" />
        <text x="306" y="172" fontSize="12" fill="#2f7a4d" fontWeight="700">OTC</text>
        <text x="260" y="230" textAnchor="middle" fontSize="12.5" fill="#49676d" fontWeight="700">安全用药：先读说明书，再对症用药</text>
      </g>
      {/* 用药规则 */}
      <g style={dim(active, 1)}>
        <rect x="40" y="252" width="440" height="102" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="62" y="280" fontSize="12" fill="#6a4a1a" fontWeight="700">✓ {rules[0]}</text>
        <text x="62" y="306" fontSize="12" fill="#6a4a1a" fontWeight="700">✓ {rules[1]}</text>
        <text x="62" y="332" fontSize="12" fill="#6a4a1a" fontWeight="700">✓ {rules[2]}</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">安全用药常识 · 处方药与非处方药（课外拓展）</text>
    </svg>
  );
}

function VitaminsSvg({ active }: { active: number | null; open?: boolean }) {
  const rows = [
    { name: '维生素 A', lack: '夜盲症·皮肤干燥', food: '动物肝脏 · 胡萝卜（β-胡萝卜素转化）', color: '#4a9a5a' },
    { name: '维生素 B₁', lack: '脚气病·神经炎', food: '粗粮 · 瘦肉 · 豆类', color: '#c98a1d' },
    { name: '维生素 C', lack: '坏血病·牙龈出血', food: '新鲜蔬菜水果（柑橘·猕猴桃）', color: '#4a9ac9' },
    { name: '维生素 D', lack: '佝偻病·骨质疏松', food: '蛋黄 · 鱼肝油（晒太阳也能合成）', color: '#c9708a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <text x="36" y="52" fontSize="13" fill="#13333a" fontWeight="800">维生素不是能源物质，也不构成细胞——但缺乏就会生病</text>
      </g>
      {rows.map((r, i) => {
        const y = 72 + i * 66;
        return (
          <g key={r.name} style={dim(active, i + 1)}>
            <rect x="30" y={y} width="460" height="54" rx="10" fill="#f4faf9" stroke={r.color} strokeWidth="2.2" />
            <text x="48" y={y + 24} fontSize="13.5" fill={r.color} fontWeight="800">{r.name}</text>
            <text x="48" y={y + 44} fontSize="11.5" fill="#59767c">食物来源：{r.food}</text>
            <text x="270" y={y + 24} fontSize="12" fill="#a53a2c" fontWeight="700">缺乏 → {r.lack}</text>
          </g>
        );
      })}
      <g style={dim(active, 0)}>
        <text x="36" y="352" fontSize="12.5" fill="#49676d" fontWeight="700">均衡饮食 = 各类维生素齐全；长期偏食是缺乏症的根源</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">主要维生素与缺乏症 · 均衡营养（课外拓展）</text>
    </svg>
  );
}

function InvasiveSpeciesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 本地生态（左） */}
      <g style={dim(active, 0)}>
        <rect x="20" y="60" width="220" height="150" rx="12" fill="#eaf4ea" stroke="#4a8a3a" strokeWidth="2.4" />
        <text x="130" y="86" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="800">本地生态系统（平衡）</text>
        <text x="130" y="116" textAnchor="middle" fontSize="13">🌾 稻田</text>
        <text x="130" y="142" textAnchor="middle" fontSize="13">🐸 蛙 · 🐟 鱼 · 🦗 虫</text>
        <text x="130" y="168" textAnchor="middle" fontSize="12" fill="#59767c">食物网复杂 · 稳定</text>
      </g>
      {/* 入侵后（右） */}
      <g style={dim(active, 1)}>
        <rect x="280" y="60" width="220" height="150" rx="12" fill="#f8ece2" stroke="#b5603a" strokeWidth="2.4" />
        <text x="390" y="86" textAnchor="middle" fontSize="13" fill="#a5601d" fontWeight="800">入侵后（失衡）</text>
        <text x="390" y="116" textAnchor="middle" fontSize="13">🌿 水葫芦疯长覆盖水面</text>
        <text x="390" y="142" textAnchor="middle" fontSize="13">🐟 鱼 · 🐸 蛙 大量减少</text>
        <text x="390" y="168" textAnchor="middle" fontSize="12" fill="#59767c">本地物种被排挤 · 多样性下降</text>
      </g>
      {/* 入侵箭头 */}
      <g style={dim(active, 1)}>
        <path d="M244 130 L276 130" fill="none" stroke="#b0483a" strokeWidth="4" markerEnd="url(#is-arrow)" />
        <text x="260" y="118" textAnchor="middle" fontSize="11.5" fill="#b0483a" fontWeight="800">引入水葫芦</text>
      </g>
      {/* 典型入侵物种 */}
      <g style={dim(active, 2)}>
        <rect x="30" y="240" width="460" height="112" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="266" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">常见入侵物种：水葫芦 · 福寿螺 · 加拿大一枝黄花 · 红火蚁 · 巴西龟</text>
        <text x="260" y="292" textAnchor="middle" fontSize="12" fill="#7a5a1d">入侵成功的原因：环境适宜 + 缺少天敌 + 繁殖力强</text>
        <text x="260" y="322" textAnchor="middle" fontSize="12.5" fill="#a5533c" fontWeight="700">不要随意放生或弃养外来宠物、植物——防控入侵人人有责！</text>
      </g>
      <defs>
        <marker id="is-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#b0483a" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">外来物种入侵 · 生态平衡的隐形杀手（课外拓展）</text>
    </svg>
  );
}

function MuscleTissuesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 骨骼肌（左） */}
      <g style={dim(active, 0)}>
        <rect x="20" y="70" width="150" height="190" rx="12" fill="#f6e2d2" stroke="#b5603a" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M34 ${100 + i * 30} L156 ${100 + i * 30}`} stroke="#c9708a" strokeWidth="5" strokeLinecap="round" />
        ))}
        <text x="95" y="52" textAnchor="middle" fontSize="13.5" fill="#a53a2c" fontWeight="800">骨骼肌</text>
        <text x="95" y="284" textAnchor="middle" fontSize="12" fill="#7a4a42">长圆柱状·多核·有明显横纹</text>
        <text x="95" y="304" textAnchor="middle" fontSize="12" fill="#7a4a42">受意识支配（随意肌）</text>
      </g>
      {/* 心肌（中） */}
      <g style={dim(active, 1)}>
        <rect x="185" y="70" width="150" height="190" rx="12" fill="#fbe9e2" stroke="#c9538a" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M198 ${96 + i * 34} q 30 -16 62 0 q 14 8 24 -6`} fill="none" stroke="#c9708a" strokeWidth="5" strokeLinecap="round" />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={232 + (i % 2) * 22} y={128 + Math.floor(i / 1) * 44} width="12" height="5" fill="#7a4a8a" />
        ))}
        <text x="260" y="52" textAnchor="middle" fontSize="13.5" fill="#a54868" fontWeight="800">心肌</text>
        <text x="260" y="284" textAnchor="middle" fontSize="12" fill="#7a4a42">分支相连·有闰盘·横纹不明显</text>
        <text x="260" y="304" textAnchor="middle" fontSize="12" fill="#7a4a42">不受意识支配（不随意）</text>
      </g>
      {/* 平滑肌（右） */}
      <g style={dim(active, 2)}>
        <rect x="350" y="70" width="150" height="190" rx="12" fill="#eef4ea" stroke="#4a9a5a" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M366 ${104 + i * 26} q 34 ${i % 2 === 0 ? 18 : -14} 62 0 q 16 10 30 -4`} fill="none" stroke="#4a9a5a" strokeWidth="5.5" strokeLinecap="round" />
        ))}
        <text x="425" y="52" textAnchor="middle" fontSize="13.5" fill="#2f7a4d" fontWeight="800">平滑肌</text>
        <text x="425" y="284" textAnchor="middle" fontSize="12" fill="#2f5a3a">梭形·无横纹·单核</text>
        <text x="425" y="304" textAnchor="middle" fontSize="12" fill="#2f5a3a">不随意（胃肠·血管壁）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">三种肌肉组织对比 · 结构与功能相适应</text>
    </svg>
  );
}

function ImmuneOrgansSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 人体轮廓 */}
      <g style={dim(active, 0)}>
        <circle cx="230" cy="52" r="26" fill="#f2d8c4" stroke="#b58a6a" strokeWidth="3" />
        <path d="M206 84 Q 230 74 254 84 L262 176 Q 230 190 198 176 Z" fill="#f2e2d2" stroke="#b58a6a" strokeWidth="3" />
        <path d="M206 92 L160 160 M254 92 L300 160" stroke="#b58a6a" strokeWidth="10" strokeLinecap="round" />
        <path d="M214 178 L210 320 M246 178 L250 320" stroke="#f2e2d2" strokeWidth="14" strokeLinecap="round" />
        <path d="M214 320 L212 336 M246 320 L248 336" stroke="#f2e2d2" strokeWidth="10" strokeLinecap="round" />
        <text x="60" y="330" fontSize="12.5" fill="#8a7a6a" fontWeight="600">人体轮廓示意</text>
      </g>
      {/* 胸腺 */}
      <g style={dim(active, 1)}>
        <path d="M222 96 Q 230 88 238 96 Q 242 108 230 112 Q 218 108 222 96 Z" fill="#e8a0b4" stroke="#c9538a" strokeWidth="2.2" />
        <text x="286" y="96" fontSize="13" fill="#a54868" fontWeight="700">胸腺（T 细胞成熟）</text>
        <line x1="282" y1="102" x2="242" y2="104" stroke="#a54868" strokeWidth="1.4" />
      </g>
      {/* 骨髓 */}
      <g style={dim(active, 2)}>
        <ellipse cx="212" cy="316" rx="18" ry="12" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.2" />
        <text x="270" y="322" fontSize="13" fill="#a5761d" fontWeight="700">骨髓（造血干细胞）</text>
        <line x1="266" y1="318" x2="232" y2="316" stroke="#a5761d" strokeWidth="1.4" />
      </g>
      {/* 脾 */}
      <g style={dim(active, 3)}>
        <ellipse cx="266" cy="176" rx="24" ry="15" fill="#a54868" stroke="#7a2a48" strokeWidth="2.2" transform="rotate(-18 266 176)" />
        <text x="304" y="176" fontSize="13" fill="#7a2a48" fontWeight="700">脾（过滤血液·储存淋巴细胞）</text>
        <line x1="300" y1="180" x2="290" y2="178" stroke="#7a2a48" strokeWidth="1.4" />
      </g>
      {/* 淋巴结 */}
      <g style={dim(active, 4)}>
        <circle cx="150" cy="140" r="9" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
        <circle cx="316" cy="140" r="9" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
        <circle cx="230" cy="290" r="9" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
        <text x="318" y="250" fontSize="13" fill="#6a4a9a" fontWeight="700">淋巴结（遍布全身的"哨卡"）</text>
        <line x1="314" y1="244" x2="240" y2="294" stroke="#6a4a9a" strokeWidth="1.4" />
      </g>
      {/* 扁桃体 */}
      <g style={dim(active, 5)}>
        <circle cx="212" cy="66" r="6" fill="#f4c76a" stroke="#b5953a" strokeWidth="1.8" />
        <circle cx="248" cy="66" r="6" fill="#f4c76a" stroke="#b5953a" strokeWidth="1.8" />
        <text x="60" y="60" fontSize="13" fill="#a5761d" fontWeight="700">扁桃体（消化道·呼吸道入口防线）</text>
        <line x1="152" y1="64" x2="204" y2="66" stroke="#a5761d" strokeWidth="1.4" />
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">人体主要免疫器官 · 免疫细胞生成与驻扎的"军营"</text>
    </svg>
  );
}

function EndocrineGlandsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 人体轮廓 */}
      <g style={dim(active, 0)}>
        <circle cx="230" cy="52" r="26" fill="#f2d8c4" stroke="#b58a6a" strokeWidth="3" />
        <path d="M206 84 Q 230 74 254 84 L262 176 Q 230 190 198 176 Z" fill="#f2e2d2" stroke="#b58a6a" strokeWidth="3" />
        <path d="M214 178 L210 320 M246 178 L250 320" stroke="#f2e2d2" strokeWidth="14" strokeLinecap="round" />
        <path d="M214 320 L212 336 M246 320 L248 336" stroke="#f2e2d2" strokeWidth="10" strokeLinecap="round" />
      </g>
      {/* 垂体 */}
      <g style={dim(active, 1)}>
        <circle cx="230" cy="60" r="6" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
        <text x="272" y="58" fontSize="13" fill="#6a4a9a" fontWeight="700">垂体（"总开关"·指挥其他腺体）</text>
        <line x1="268" y1="62" x2="238" y2="60" stroke="#6a4a9a" strokeWidth="1.4" />
      </g>
      {/* 甲状腺 */}
      <g style={dim(active, 2)}>
        <path d="M214 92 Q 204 86 196 92 Q 194 102 204 106 L 218 104 Q 226 100 224 92 Z" fill="#e8a06a" stroke="#b5603a" strokeWidth="2.2" />
        <path d="M246 92 Q 256 86 264 92 Q 266 102 256 106 L 242 104 Q 234 100 236 92 Z" fill="#e8a06a" stroke="#b5603a" strokeWidth="2.2" />
        <text x="284" y="106" fontSize="13" fill="#a5603a" fontWeight="700">甲状腺（甲状腺激素·促代谢发育）</text>
        <line x1="280" y1="110" x2="262" y2="104" stroke="#a5603a" strokeWidth="1.4" />
      </g>
      {/* 肾上腺 */}
      <g style={dim(active, 3)}>
        <path d="M206 178 Q 198 168 206 162 Q 216 158 222 168 Q 218 178 206 178 Z" fill="#c9708a" stroke="#a54868" strokeWidth="2.2" />
        <path d="M254 178 Q 262 168 254 162 Q 244 158 238 168 Q 242 178 254 178 Z" fill="#c9708a" stroke="#a54868" strokeWidth="2.2" />
        <text x="284" y="172" fontSize="13" fill="#a54868" fontWeight="700">肾上腺（肾上腺素·应急反应）</text>
        <line x1="280" y1="174" x2="258" y2="172" stroke="#a54868" strokeWidth="1.4" />
      </g>
      {/* 胰岛 */}
      <g style={dim(active, 4)}>
        <ellipse cx="276" cy="226" rx="20" ry="13" fill="#a8cf98" stroke="#3f7f3a" strokeWidth="2.2" />
        <circle cx="270" cy="224" r="3.4" fill="#3f7f3a" />
        <circle cx="280" cy="228" r="3.4" fill="#3f7f3a" />
        <text x="310" y="230" fontSize="13" fill="#2f7a4d" fontWeight="700">胰岛（胰岛素·降血糖）</text>
        <line x1="306" y1="228" x2="298" y2="226" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 性腺 */}
      <g style={dim(active, 5)}>
        <ellipse cx="214" cy="300" rx="12" ry="9" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2.2" />
        <ellipse cx="246" cy="300" rx="12" ry="9" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2.2" />
        <text x="60" y="304" fontSize="13" fill="#6a4a9a" fontWeight="700">性腺（性激素·促进生殖器官发育）</text>
        <line x1="180" y1="302" x2="200" y2="300" stroke="#6a4a9a" strokeWidth="1.4" />
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">人体主要内分泌腺 · 无导管，激素直接进入血液</text>
    </svg>
  );
}

function BoneStructureSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 骨整体（长骨纵切） */}
      <g style={dim(active, 0)}>
        {/* 骨干外轮廓 */}
        <path d="M170 40 Q 168 200 172 300 Q 174 322 190 330 L 310 330 Q 326 322 328 300 Q 332 200 330 40 Q 330 22 310 22 L 190 22 Q 170 22 170 40 Z" fill="#f6f0e2" stroke="#c9b88a" strokeWidth="3.5" />
        {/* 骨松质（两端网状） */}
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M196 ${52 + i * 14} l18 10 l20 -12 l18 12 M198 ${74 + i * 10} l22 8 l16 -10`} fill="none" stroke="#d8c9a0" strokeWidth="2" />
        ))}
        {[0, 1].map((i) => (
          <path key={`b${i}`} d={`M196 ${296 - i * 12} l18 -10 l22 10 M196 ${276 - i * 10} l20 8 l18 -8`} fill="none" stroke="#d8c9a0" strokeWidth="2" />
        ))}
        <text x="362" y="60" fontSize="13" fill="#8a7a4a" fontWeight="700">骨松质（两端·疏松）</text>
        <line x1="358" y1="66" x2="328" y2="76" stroke="#8a7a4a" strokeWidth="1.4" />
      </g>
      {/* 骨密质 */}
      <g style={dim(active, 1)}>
        <rect x="178" y="96" width="20" height="200" fill="#ece4d0" stroke="#b5a582" strokeWidth="2" />
        <rect x="322" y="96" width="20" height="200" fill="#ece4d0" stroke="#b5a582" strokeWidth="2" />
        <text x="362" y="140" fontSize="13" fill="#8a7a4a" fontWeight="700">骨密质（骨干·坚硬）</text>
        <line x1="358" y1="146" x2="344" y2="160" stroke="#8a7a4a" strokeWidth="1.4" />
      </g>
      {/* 骨髓腔与红骨髓 */}
      <g style={dim(active, 2)}>
        <rect x="200" y="110" width="120" height="196" fill="#f2c8c0" stroke="#c97a6a" strokeWidth="2.5" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={222 + i * 26} cy={150 + (i % 2) * 40} r="7" fill="#e88a7a" stroke="#b0483a" strokeWidth="1.6" />
        ))}
        <text x="392" y="216" fontSize="13" fill="#a53a2c" fontWeight="700">骨髓腔（红骨髓）</text>
        <text x="392" y="234" fontSize="12.5" fill="#a53a2c">造血干细胞 → 血细胞</text>
        <line x1="388" y1="224" x2="322" y2="216" stroke="#a53a2c" strokeWidth="1.4" />
      </g>
      {/* 骨膜 */}
      <g style={dim(active, 3)}>
        <path d="M166 60 Q 160 200 168 318" fill="none" stroke="#c9708a" strokeWidth="4" />
        <text x="60" y="82" fontSize="13" fill="#a54868" fontWeight="700">骨膜（血管神经·成骨）</text>
        <line x1="120" y1="88" x2="164" y2="98" stroke="#a54868" strokeWidth="1.4" />
      </g>
      {/* 关节面提示 */}
      <g style={dim(active, 4)}>
        <ellipse cx="250" cy="34" rx="46" ry="14" fill="#c8d8e8" stroke="#4d7ea8" strokeWidth="2.5" />
        <text x="250" y="14" textAnchor="middle" fontSize="12.5" fill="#3d6a94" fontWeight="600">关节面（覆光滑软骨）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">骨结构模式图 · 红骨髓终身造血（课外拓展）</text>
    </svg>
  );
}

function BrainStructureSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 大脑 */}
      <g style={dim(active, 0)}>
        <path d="M120 128 Q 110 56 190 44 Q 268 30 348 46 Q 420 60 416 130 Q 412 176 360 190 Q 250 208 150 192 Q 116 180 120 128 Z" fill="#e8b8c8" stroke="#b5607a" strokeWidth="3" />
        {/* 脑回沟 */}
        <path d="M170 70 Q 196 84 186 108 Q 176 128 196 144 M246 52 Q 258 76 246 98 Q 236 118 254 138 M322 62 Q 336 84 322 106 Q 312 124 330 140 M368 96 Q 356 116 366 138" fill="none" stroke="#b5607a" strokeWidth="2.4" />
        <text x="268" y="96" textAnchor="middle" fontSize="14" fill="#8a3a5a" fontWeight="800">大脑</text>
        <text x="268" y="118" textAnchor="middle" fontSize="12" fill="#8a3a5a">调节的最高级中枢</text>
      </g>
      {/* 小脑 */}
      <g style={dim(active, 1)}>
        <path d="M356 196 Q 344 168 380 162 Q 434 154 452 186 Q 460 210 428 222 Q 384 234 356 196 Z" fill="#d8c8a8" stroke="#8a7a4a" strokeWidth="3" />
        <path d="M368 178 Q 396 170 428 180 M364 196 Q 398 188 434 198 M370 214 Q 396 206 424 212" fill="none" stroke="#8a7a4a" strokeWidth="1.8" />
        <text x="400" y="252" textAnchor="middle" fontSize="13" fill="#6a5a2a" fontWeight="700">小脑（协调运动·维持平衡）</text>
      </g>
      {/* 脑干 */}
      <g style={dim(active, 2)}>
        <path d="M218 196 L258 196 L262 240 Q 262 262 244 274 L228 274 Q 214 258 218 236 Z" fill="#e0c8ee" stroke="#7a4a8a" strokeWidth="3" />
        <path d="M226 214 L254 214 M226 230 L254 230 M226 246 L252 246" stroke="#7a4a8a" strokeWidth="1.8" />
        <text x="150" y="316" fontSize="13" fill="#6a4a9a" fontWeight="700">脑干（心跳·呼吸·血压"生命中枢"）</text>
        <line x1="222" y1="296" x2="236" y2="276" stroke="#6a4a9a" strokeWidth="1.4" />
      </g>
      {/* 脊髓连接 */}
      <g style={dim(active, 2)}>
        <rect x="230" y="274" width="22" height="90" fill="#dce8f4" stroke="#4d7ea8" strokeWidth="2.5" />
        <text x="266" y="342" fontSize="12.5" fill="#3d6a94" fontWeight="700">脊髓（低级中枢·上下行传导）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">脑结构模式图 · 中枢神经系统的"总指挥部"</text>
    </svg>
  );
}

function AlveolusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 支气管末端 */}
      <g style={dim(active, 0)}>
        <path d="M40 60 Q 120 74 196 96" fill="none" stroke="#7a8a9a" strokeWidth="18" strokeLinecap="round" />
        <path d="M40 60 Q 120 74 196 96" fill="none" stroke="#c8d4dc" strokeWidth="12" strokeLinecap="round" />
        <text x="26" y="40" fontSize="13" fill="#4a5a6a" fontWeight="700">支气管（末端连肺泡）</text>
      </g>
      {/* 肺泡（一串半圆囊） */}
      <g style={dim(active, 1)}>
        <ellipse cx="250" cy="150" rx="70" ry="58" fill="#f2d8d4" stroke="#c97a6a" strokeWidth="3" />
        <ellipse cx="332" cy="180" rx="62" ry="52" fill="#f2d8d4" stroke="#c97a6a" strokeWidth="3" />
        <ellipse cx="250" cy="240" rx="72" ry="58" fill="#f2d8d4" stroke="#c97a6a" strokeWidth="3" />
        <ellipse cx="346" cy="252" rx="58" ry="48" fill="#f2d8d4" stroke="#c97a6a" strokeWidth="3" />
        <text x="96" y="150" fontSize="13" fill="#a5533c" fontWeight="700">肺泡（数量约 3 亿个）</text>
        <line x1="166" y1="146" x2="186" y2="148" stroke="#a5533c" strokeWidth="1.4" />
      </g>
      {/* 毛细血管网包绕 */}
      <g style={dim(active, 2)}>
        <path d="M206 120 Q 250 84 306 116 M330 136 Q 380 150 382 196 M386 240 Q 366 292 316 288 M262 292 Q 200 288 190 240" fill="none" stroke="#c94a5a" strokeWidth="5" strokeLinecap="round" />
        <path d="M226 104 Q 286 96 342 128 M376 174 Q 392 216 356 264 M300 296 Q 232 300 184 262" fill="none" stroke="#4d7ea8" strokeWidth="5" strokeLinecap="round" />
        <text x="404" y="132" fontSize="12.5" fill="#a53a2c" fontWeight="700">毛细血管网</text>
        <text x="404" y="150" fontSize="12.5" fill="#a53a2c">（包绕整个肺泡）</text>
        <line x1="400" y1="138" x2="378" y2="150" stroke="#a53a2c" strokeWidth="1.4" />
      </g>
      {/* 气体交换 */}
      <g style={dim(active, 3)}>
        <path d="M262 176 Q 286 190 300 204" fill="none" stroke="#2f7a4d" strokeWidth="3.5" markerEnd="url(#av-o2)" />
        <text x="196" y="186" fontSize="12.5" fill="#2f7a4d" fontWeight="700">O₂ 进入血液</text>
        <line x1="228" y1="182" x2="256" y2="182" stroke="#2f7a4d" strokeWidth="1.4" />
        <path d="M316 240 Q 296 232 276 222" fill="none" stroke="#b0483a" strokeWidth="3.5" markerEnd="url(#av-co2)" />
        <text x="330" y="230" fontSize="12.5" fill="#b0483a" fontWeight="700">CO₂ 排入肺泡</text>
      </g>
      {/* 结构特点 */}
      <g style={dim(active, 1)}>
        <text x="42" y="290" fontSize="12.5" fill="#8a5a52" fontWeight="600">肺泡壁与毛细血管壁都只由</text>
        <text x="42" y="308" fontSize="12.5" fill="#8a5a52" fontWeight="600">一层上皮细胞构成 → 利于交换</text>
        <line x1="168" y1="292" x2="200" y2="266" stroke="#8a5a52" strokeWidth="1.4" />
      </g>
      <defs>
        <marker id="av-o2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#2f7a4d" />
        </marker>
        <marker id="av-co2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#b0483a" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">肺泡与气体交换模式图 · 结构与功能相适应</text>
    </svg>
  );
}

function BloodCellsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 血浆背景 */}
      <g style={dim(active, 3)}>
        <rect x="20" y="60" width="480" height="280" rx="16" fill="#fbe9c8" stroke="#d8b878" strokeWidth="2.5" />
        <text x="36" y="330" fontSize="12.5" fill="#a58a4a" fontWeight="600">血浆（运载血细胞·运输养料废物）</text>
      </g>
      {/* 红细胞（左列） */}
      <g style={dim(active, 0)}>
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={86 + (i % 2) * 62} cy={112 + Math.floor(i / 2) * 64} rx="30" ry="22" fill="#d85a4a" stroke="#a53a2c" strokeWidth="2.2" />
        ))}
        <ellipse cx="86" cy="112" rx="14" ry="8" fill="#e87a6a" opacity="0.8" />
        <text x="118" y="72" textAnchor="middle" fontSize="13.5" fill="#a53a2c" fontWeight="700">红细胞</text>
        <text x="118" y="258" textAnchor="middle" fontSize="12.5" fill="#7a4a42">数量最多（男 5.0×10¹²/L 左右）</text>
        <text x="118" y="278" textAnchor="middle" fontSize="12.5" fill="#7a4a42">两面凹的圆饼状、无细胞核</text>
        <text x="118" y="298" textAnchor="middle" fontSize="12.5" fill="#7a4a42">含血红蛋白 → 运输氧气</text>
      </g>
      {/* 白细胞（中列） */}
      <g style={dim(active, 1)}>
        <circle cx="266" cy="130" r="40" fill="#f4f0e2" stroke="#7a4a8a" strokeWidth="2.5" />
        <path d="M250 112 Q 266 96 284 110 Q 296 126 282 142 Q 264 152 250 140 Q 240 124 250 112 Z" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
        <circle cx="316" cy="212" r="34" fill="#f4f0e2" stroke="#7a4a8a" strokeWidth="2.5" />
        <path d="M304 198 Q 318 188 330 202 Q 338 214 326 226 Q 310 232 302 220 Q 296 208 304 198 Z" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
        <text x="290" y="72" textAnchor="middle" fontSize="13.5" fill="#6a4a9a" fontWeight="700">白细胞</text>
        <text x="290" y="258" textAnchor="middle" fontSize="12.5" fill="#5a4a6e">最大、有细胞核、数量最少</text>
        <text x="290" y="278" textAnchor="middle" fontSize="12.5" fill="#5a4a6e">能变形穿出血管</text>
        <text x="290" y="298" textAnchor="middle" fontSize="12.5" fill="#5a4a6e">吞噬病菌 → 防御保护</text>
      </g>
      {/* 血小板（右列） */}
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M${418 + (i % 2) * 44} ${96 + Math.floor(i / 2) * 58} l10 -4 l8 6 l-2 10 l-12 3 l-8 -7 Z`}
            fill="#e8b878"
            stroke="#a5761d"
            strokeWidth="1.8"
          />
        ))}
        <text x="450" y="72" textAnchor="middle" fontSize="13.5" fill="#a5761d" fontWeight="700">血小板</text>
        <text x="450" y="258" textAnchor="middle" fontSize="12.5" fill="#8a6a2a">最小、形状不规则、无核</text>
        <text x="450" y="278" textAnchor="middle" fontSize="12.5" fill="#8a6a2a">破损血管处聚集</text>
        <text x="450" y="298" textAnchor="middle" fontSize="12.5" fill="#8a6a2a">释放物质 → 止血凝血</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">三种血细胞对比 · 都由骨髓中的造血干细胞产生</text>
    </svg>
  );
}

function SkinStructureSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 表皮 */}
      <g style={dim(active, 0)}>
        <path d="M30 96 Q 80 82 130 96 T 230 96 T 330 96 T 430 96 T 490 96 L490 132 Q 440 118 390 132 T 290 132 T 190 132 T 90 132 T 30 132 Z" fill="#f2d8c4" stroke="#b58a6a" strokeWidth="2.5" />
        <text x="40" y="66" fontSize="13" fill="#a5683a" fontWeight="700">表皮（角质层保护·无血管）</text>
        <line x1="120" y1="72" x2="130" y2="90" stroke="#a5683a" strokeWidth="1.4" />
      </g>
      {/* 真皮 */}
      <g style={dim(active, 1)}>
        <rect x="30" y="132" width="460" height="128" fill="#f6e2d2" stroke="#d8b8a0" strokeWidth="2" />
        <text x="368" y="152" fontSize="13" fill="#a5683a" fontWeight="700">真皮（主要结构层）</text>
      </g>
      {/* 毛发与毛囊 */}
      <g style={dim(active, 2)}>
        <path d="M156 20 Q 148 60 152 104 Q 156 140 162 172" fill="none" stroke="#7a5a3a" strokeWidth="7" strokeLinecap="round" />
        <path d="M138 216 Q 160 186 184 214 Q 162 240 138 216 Z" fill="#e8c9a8" stroke="#b58a5f" strokeWidth="2.5" />
        <text x="34" y="248" fontSize="13" fill="#7a5a3a" fontWeight="700">毛囊与毛发</text>
        <text x="34" y="266" fontSize="12.5" fill="#7a5a3a">立毛肌连于毛囊</text>
        <line x1="130" y1="242" x2="150" y2="230" stroke="#7a5a3a" strokeWidth="1.4" />
      </g>
      {/* 汗腺 */}
      <g style={dim(active, 3)}>
        <path d="M382 132 L382 74" fill="none" stroke="#3d7e9e" strokeWidth="4" strokeLinecap="round" />
        <text x="366" y="58" fontSize="12.5" fill="#2c6e94" fontWeight="700">汗孔</text>
        <path d="M382 236 Q 350 258 382 276 Q 414 292 396 256 Q 390 244 382 236" fill="none" stroke="#3d7e9e" strokeWidth="5" strokeLinecap="round" />
        <text x="330" y="304" fontSize="13" fill="#2c6e94" fontWeight="700">汗腺（分泌汗液散热）</text>
        <line x1="380" y1="290" x2="384" y2="276" stroke="#2c6e94" strokeWidth="1.4" />
      </g>
      {/* 血管 */}
      <g style={dim(active, 4)}>
        <path d="M64 168 Q 150 148 240 168 T 420 168" fill="none" stroke="#c94a5a" strokeWidth="4" />
        <path d="M64 196 Q 150 176 240 196 T 420 196" fill="none" stroke="#4d7ea8" strokeWidth="4" />
        <text x="240" y="222" textAnchor="middle" fontSize="12.5" fill="#8a4a56" fontWeight="600">血管（动脉运热·调节血流量）</text>
      </g>
      {/* 神经末梢 */}
      <g style={dim(active, 5)}>
        <ellipse cx="300" cy="150" rx="22" ry="9" fill="#e0c8ee" stroke="#7a4a8a" strokeWidth="2.2" />
        <path d="M292 156 Q 290 170 288 178" fill="none" stroke="#7a4a8a" strokeWidth="2" />
        <text x="266" y="196" fontSize="12.5" fill="#6a4a9a" fontWeight="700">感觉神经末梢（冷热触压）</text>
      </g>
      {/* 皮下组织 */}
      <g style={dim(active, 1)}>
        <rect x="30" y="260" width="460" height="94" fill="#f8e2c8" stroke="#d8c0a0" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle key={i} cx={62 + i * 58} cy={i % 2 === 0 ? 296 : 322} r="17" fill="#f0d4b4" stroke="#c9a882" strokeWidth="2" />
        ))}
        <text x="250" y="350" textAnchor="middle" fontSize="12.5" fill="#a57a4a" fontWeight="700">皮下组织（脂肪保温）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">皮肤结构模式图 · 最大的器官，体温调节的感受器与效应器</text>
    </svg>
  );
}

function VesselsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 动脉（左列） */}
      <g style={dim(active, 0)}>
        <path d="M60 92 Q 118 76 176 92 L176 132 Q 118 116 60 132 Z" fill="#d86452" stroke="#a53a2c" strokeWidth="2.5" />
        <path d="M60 132 Q 118 116 176 132 L176 158 Q 118 144 60 158 Z" fill="#e88a78" stroke="#a53a2c" strokeWidth="2.5" />
        <path d="M76 112 Q 118 98 160 112" fill="none" stroke="#f2b0a0" strokeWidth="4" strokeLinecap="round" />
        <text x="118" y="76" textAnchor="middle" fontSize="13.5" fill="#a53a2c" fontWeight="700">动脉</text>
        <text x="118" y="186" textAnchor="middle" fontSize="12.5" fill="#7a4a42">管壁厚、弹性大</text>
        <text x="118" y="206" textAnchor="middle" fontSize="12.5" fill="#7a4a42">血流速度快</text>
        <text x="118" y="226" textAnchor="middle" fontSize="12.5" fill="#7a4a42">把血送离心脏</text>
      </g>
      {/* 静脉（中列） */}
      <g style={dim(active, 1)}>
        <path d="M232 92 Q 290 78 348 92 L348 128 Q 290 114 232 128 Z" fill="#7a8ac9" stroke="#4a5a94" strokeWidth="2.5" />
        <path d="M232 128 Q 290 114 348 128 L348 154 Q 290 140 232 154 Z" fill="#9aa8d8" stroke="#4a5a94" strokeWidth="2.5" />
        {/* 瓣膜 */}
        <path d="M276 128 Q 286 142 296 130 M288 130 Q 298 144 308 132" fill="none" stroke="#4a5a94" strokeWidth="2.4" />
        <text x="290" y="76" textAnchor="middle" fontSize="13.5" fill="#4a5a94" fontWeight="700">静脉</text>
        <text x="290" y="186" textAnchor="middle" fontSize="12.5" fill="#4a5a6e">管壁薄、弹性小</text>
        <text x="290" y="206" textAnchor="middle" fontSize="12.5" fill="#4a5a6e">有瓣膜防血液倒流</text>
        <text x="290" y="226" textAnchor="middle" fontSize="12.5" fill="#4a5a6e">把血送回心脏</text>
      </g>
      {/* 毛细血管（右列） */}
      <g style={dim(active, 2)}>
        <path d="M404 96 Q 452 88 496 96" fill="none" stroke="#c94a5a" strokeWidth="7" strokeLinecap="round" />
        {/* 单行红细胞 */}
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={424 + i * 26} cy={96 - i * 1.5} rx="5.5" ry="3" fill="#e86a5a" stroke="#a53a2c" strokeWidth="1.2" transform={`rotate(${-8 + i * 6} ${424 + i * 26} ${96 - i * 1.5})`} />
        ))}
        {/* 管壁单层细胞示意 */}
        <path d="M404 92 Q 452 84 496 92" fill="none" stroke="#7a9aa8" strokeWidth="2.2" />
        <text x="450" y="72" textAnchor="middle" fontSize="13.5" fill="#8a4a56" fontWeight="700">毛细血管</text>
        <text x="450" y="132" textAnchor="middle" fontSize="12.5" fill="#6a5a62">管壁仅一层上皮细胞</text>
        <text x="450" y="152" textAnchor="middle" fontSize="12.5" fill="#6a5a62">红细胞单行通过</text>
        <text x="450" y="172" textAnchor="middle" fontSize="12.5" fill="#6a5a62">便于物质交换</text>
        <text x="450" y="192" textAnchor="middle" fontSize="12.5" fill="#6a5a62">血流速度最慢</text>
      </g>
      {/* 连通示意 */}
      <g style={dim(active, 2)}>
        <path d="M186 122 Q 208 132 226 122" fill="none" stroke="#9ab0b5" strokeWidth="2" strokeDasharray="5 4" />
        <path d="M356 120 Q 378 132 398 112" fill="none" stroke="#9ab0b5" strokeWidth="2" strokeDasharray="5 4" />
        <text x="260" y="300" textAnchor="middle" fontSize="13" fill="#49676d" fontWeight="600">血流方向：动脉 → 毛细血管 → 静脉（经心脏循环）</text>
        <path d="M150 322 L370 322" stroke="#9ab0b5" strokeWidth="0" />
      </g>
      {/* 心脏提示 */}
      <g style={dim(active, 0)}>
        <path d="M40 300 Q 24 284 36 268 Q 48 256 58 268 Q 68 256 80 268 Q 92 284 76 300 Q 58 316 40 300 Z" fill="#d86452" stroke="#a53a2c" strokeWidth="2.5" />
        <text x="58" y="338" textAnchor="middle" fontSize="12.5" fill="#a53a2c" fontWeight="600">心脏</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">三种血管结构模式图 · 结构与功能相适应</text>
    </svg>
  );
}

function NeuronSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <path d="M150 170 Q 96 150 62 128 M 62 128 Q 44 118 30 118" fill="none" stroke="#9a6fb5" strokeWidth="6" strokeLinecap="round" />
        <path d="M150 190 Q 92 190 58 196 M 58 196 Q 42 198 28 208" fill="none" stroke="#9a6fb5" strokeWidth="6" strokeLinecap="round" />
        <path d="M158 210 Q 108 236 84 268" fill="none" stroke="#9a6fb5" strokeWidth="6" strokeLinecap="round" />
        <text x="24" y="100" fontSize="13.5" fill="#7a4a8a" fontWeight="700">树突（接收信息）</text>
      </g>
      <g style={dim(active, 1)}>
        <circle cx="205" cy="190" r="52" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="3" />
        <circle cx="205" cy="190" r="17" fill="#8a5a9f" />
        <text x="205" y="260" textAnchor="middle" fontSize="13.5" fill="#7a4a8a" fontWeight="700">细胞体（含细胞核）</text>
      </g>
      <g style={dim(active, 2)}>
        <path d="M257 190 Q 320 190 380 186" fill="none" stroke="#9a6fb5" strokeWidth="7" strokeLinecap="round" />
        {[288, 326, 362].map((x, i) => (
          <ellipse key={i} cx={x} cy={188} rx="20" ry="13" fill="#e8c94a" stroke="#b5953a" strokeWidth="2" />
        ))}
        <text x="300" y="156" fontSize="13.5" fill="#8a7a20" fontWeight="700">轴突 + 髓鞘</text>
      </g>
      <g style={dim(active, 3)}>
        <path d="M380 186 Q 430 180 452 168 M 452 168 Q 470 160 486 162" fill="none" stroke="#9a6fb5" strokeWidth="6" strokeLinecap="round" />
        <path d="M380 188 Q 436 200 484 206" fill="none" stroke="#9a6fb5" strokeWidth="6" strokeLinecap="round" />
        <circle cx="490" cy="162" r="7" fill="#7a4a8a" />
        <circle cx="490" cy="208" r="7" fill="#7a4a8a" />
        <text x="370" y="246" fontSize="13.5" fill="#7a4a8a" fontWeight="700">神经末梢（传出信息）</text>
      </g>
      <text x="30" y="330" fontSize="13.5" fill="#5f7076" fontWeight="600">神经冲动传导方向：树突 → 细胞体 → 轴突 → 神经末梢</text>
      <text x="500" y="368" textAnchor="end" fontSize="12.5" fill="#799398">神经元（神经细胞）结构模式图</text>
    </svg>
  );
}

function SynapseSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 轴突 + 突触小体 */}
      <g style={dim(active, 0)}>
        <path d="M14 96 Q 90 84 150 108" fill="none" stroke="#9a6fb5" strokeWidth="14" strokeLinecap="round" />
        <ellipse cx="216" cy="112" rx="74" ry="52" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="3.5" />
        <text x="216" y="186" textAnchor="middle" fontSize="13.5" fill="#7a4a8a" fontWeight="700">突触小体（轴突末梢膨大）</text>
      </g>
      {/* 突触小泡 */}
      <g style={dim(active, 1)}>
        {[[184, 96], [222, 84], [254, 104], [200, 128], [244, 128]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="12" fill="#e8d4f2" stroke="#7a4a8a" strokeWidth="2.2" />
            <circle cx={x} cy={y} r="4" fill="#5a9a4a" />
          </g>
        ))}
        <text x="330" y="52" fontSize="13.5" fill="#7a4a8a" fontWeight="700">突触小泡（含神经递质）</text>
        <line x1="326" y1="56" x2="270" y2="86" stroke="#7a4a8a" strokeWidth="1.4" />
      </g>
      {/* 递质释放 + 突触间隙 */}
      <g style={dim(active, 2)}>
        {[[242, 196], [266, 212], [240, 228], [264, 240]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5.5" fill="#5a9a4a" />
        ))}
        <line x1="112" y1="252" x2="392" y2="252" stroke="#8aa1a6" strokeWidth="2" strokeDasharray="9 7" />
        <text x="126" y="276" fontSize="13.5" fill="#4b6c73" fontWeight="700">突触间隙（约 20 nm，充盈组织液）</text>
      </g>
      {/* 突触前膜 / 后膜 */}
      <g style={dim(active, 3)}>
        <path d="M158 158 Q 216 176 274 158" fill="none" stroke="#b0483a" strokeWidth="5" strokeLinecap="round" />
        <text x="318" y="142" fontSize="13" fill="#b0483a" fontWeight="700">突触前膜</text>
        <line x1="314" y1="146" x2="274" y2="158" stroke="#b0483a" strokeWidth="1.4" />
      </g>
      <g style={dim(active, 4)}>
        <path d="M130 300 Q 260 282 400 300" fill="none" stroke="#2c6e94" strokeWidth="5" strokeLinecap="round" />
        {[182, 244, 306].map((x, i) => (
          <path key={i} d={`M${x} 296 q 8 -14 16 0`} fill="none" stroke="#2c6e94" strokeWidth="3.5" strokeLinecap="round" />
        ))}
        <text x="404" y="306" fontSize="13" fill="#2c6e94" fontWeight="700">突触后膜（有受体）</text>
      </g>
      <g style={dim(active, 2)}>
        <text x="16" y="330" fontSize="13.5" fill="#5a8a3a" fontWeight="700">信号：电 → 化学（递质）→ 电；递质只能由前膜释放作用于后膜——单向传递</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">突触结构模式图</text>
    </svg>
  );
}

function InternalEnvironmentSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 血浆（血管内） */}
      <g style={dim(active, 0)}>
        <rect x="26" y="58" width="468" height="66" rx="30" fill="#f6cfc6" stroke="#b0483a" strokeWidth="3.5" />
        {[[86, 91], [136, 91], [186, 91], [236, 91], [286, 91], [336, 91], [386, 91], [436, 91]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="13" ry="9" fill="#d4544a" stroke="#a83832" strokeWidth="1.8" />
        ))}
        <text x="40" y="146" fontSize="13.5" fill="#b0483a" fontWeight="700">血浆（血管内）</text>
      </g>
      {/* 组织液 + 组织细胞 */}
      <g style={dim(active, 1)}>
        <rect x="26" y="158" width="468" height="102" rx="16" fill="#e7f2f8" stroke="#7fa8c9" strokeWidth="2.5" strokeDasharray="8 5" />
        {[[130, 210], [330, 210]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="32" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2.6" />
            <circle cx={x} cy={y} r="9" fill="#7a4a8a" />
          </g>
        ))}
        <text x="40" y="280" fontSize="13.5" fill="#2c6e94" fontWeight="700">组织液（组织细胞间隙的液体）</text>
      </g>
      {/* 毛细淋巴管盲端 */}
      <g style={dim(active, 2)}>
        <path d="M60 316 Q 96 300 150 318 Q 210 338 260 320 L 460 320" fill="none" stroke="#b5c26a" strokeWidth="14" strokeLinecap="round" />
        <circle cx="64" cy="314" r="4" fill="#8a9a4a" />
        <text x="76" y="352" fontSize="13.5" fill="#7a8a2a" fontWeight="700">淋巴（毛细淋巴管盲端起始）</text>
      </g>
      {/* 物质交换箭头 */}
      <g style={dim(active, 3)}>
        <path d="M470 130 Q 490 172 470 216" fill="none" stroke="#4b6c73" strokeWidth="3.5" markerEnd="url(#env-arrow)" />
        <path d="M486 216 Q 505 172 486 130" fill="none" stroke="#4b6c73" strokeWidth="3.5" markerEnd="url(#env-arrow)" />
        <text x="494" y="176" fontSize="12.5" fill="#4b6c73" fontWeight="700">⇄</text>
        <path d="M60 158 Q 74 226 66 302" fill="none" stroke="#7a8a2a" strokeWidth="3.5" markerEnd="url(#env-arrow)" />
        <text x="24" y="238" fontSize="12.5" fill="#7a8a2a" fontWeight="700">单向</text>
        <text x="330" y="306" fontSize="12.5" fill="#4b6c73">淋巴经淋巴循环最终回流入血浆</text>
      </g>
      <defs>
        <marker id="env-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#4b6c73" />
        </marker>
      </defs>
      <text x="16" y="38" fontSize="13.5" fill="#2c6e94" fontWeight="700">细胞外液 = 血浆 + 组织液 + 淋巴——细胞通过内环境与外界交换物质</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">内环境三者关系模式图</text>
    </svg>
  );
}

function ThermoregulationSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 左：寒冷环境 */}
      <g style={dim(active, 0)}>
        <rect x="16" y="56" width="236" height="40" rx="9" fill="#dfe9f2" stroke="#4d7ea8" strokeWidth="2.5" />
        <text x="134" y="81" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">❄ 寒冷环境（产热↑ 散热↓）</text>
        <rect x="58" y="118" width="152" height="36" rx="9" fill="#eef7f6" stroke="#7fa8c9" strokeWidth="2.5" />
        <text x="134" y="141" textAnchor="middle" fontSize="13" fill="#2c6e94" fontWeight="600">冷觉感受器 → 传入神经</text>
        <line x1="134" y1="96" x2="134" y2="114" stroke="#4d7ea8" strokeWidth="3" markerEnd="url(#tr-arrow)" />
        <rect x="52" y="176" width="164" height="36" rx="9" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="134" y="199" textAnchor="middle" fontSize="13.5" fill="#6a4a9a" fontWeight="700">下丘脑体温调节中枢</text>
        <line x1="134" y1="154" x2="134" y2="172" stroke="#4d7ea8" strokeWidth="3" markerEnd="url(#tr-arrow)" />
      </g>
      <g style={dim(active, 1)}>
        <rect x="24" y="234" width="104" height="56" rx="9" fill="#fdf1e3" stroke="#c98a1d" strokeWidth="2.5" />
        <text x="76" y="254" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">骨骼肌战栗</text>
        <text x="76" y="272" textAnchor="middle" fontSize="12" fill="#a58a4a">甲状腺激素↑</text>
        <line x1="92" y1="212" x2="76" y2="230" stroke="#7a4a8a" strokeWidth="2.5" markerEnd="url(#tr-arrow)" />
        <rect x="140" y="234" width="104" height="56" rx="9" fill="#fdf1e3" stroke="#c98a1d" strokeWidth="2.5" />
        <text x="192" y="254" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">皮肤血管收缩</text>
        <text x="192" y="272" textAnchor="middle" fontSize="12" fill="#a58a4a">汗腺分泌减少</text>
        <line x1="176" y1="212" x2="192" y2="230" stroke="#7a4a8a" strokeWidth="2.5" markerEnd="url(#tr-arrow)" />
        <text x="76" y="312" textAnchor="middle" fontSize="12.5" fill="#c98a1d" fontWeight="600">产热 ↑</text>
        <text x="192" y="312" textAnchor="middle" fontSize="12.5" fill="#4d7ea8" fontWeight="600">散热 ↓</text>
      </g>
      {/* 右：炎热环境 */}
      <g style={dim(active, 2)}>
        <rect x="268" y="56" width="236" height="40" rx="9" fill="#f9e2e0" stroke="#b0483a" strokeWidth="2.5" />
        <text x="386" y="81" textAnchor="middle" fontSize="13.5" fill="#9b3a30" fontWeight="700">☀ 炎热环境（散热↑）</text>
        <rect x="310" y="118" width="152" height="36" rx="9" fill="#eef7f6" stroke="#7fa8c9" strokeWidth="2.5" />
        <text x="386" y="141" textAnchor="middle" fontSize="13" fill="#2c6e94" fontWeight="600">温觉感受器 → 传入神经</text>
        <line x1="386" y1="96" x2="386" y2="114" stroke="#b0483a" strokeWidth="3" markerEnd="url(#tr-arrow)" />
        <rect x="304" y="176" width="164" height="36" rx="9" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="386" y="199" textAnchor="middle" fontSize="13.5" fill="#6a4a9a" fontWeight="700">下丘脑体温调节中枢</text>
        <line x1="386" y1="154" x2="386" y2="172" stroke="#b0483a" strokeWidth="3" markerEnd="url(#tr-arrow)" />
        <rect x="276" y="234" width="104" height="56" rx="9" fill="#fdf1e3" stroke="#c98a1d" strokeWidth="2.5" />
        <text x="328" y="254" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">汗腺分泌 ↑</text>
        <text x="328" y="272" textAnchor="middle" fontSize="12" fill="#a58a4a">蒸发散热</text>
        <rect x="392" y="234" width="104" height="56" rx="9" fill="#fdf1e3" stroke="#c98a1d" strokeWidth="2.5" />
        <text x="444" y="254" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">皮肤血管舒张</text>
        <text x="444" y="272" textAnchor="middle" fontSize="12" fill="#a58a4a">血流量 ↑</text>
        <line x1="344" y1="212" x2="328" y2="230" stroke="#7a4a8a" strokeWidth="2.5" markerEnd="url(#tr-arrow)" />
        <line x1="428" y1="212" x2="444" y2="230" stroke="#7a4a8a" strokeWidth="2.5" markerEnd="url(#tr-arrow)" />
        <text x="386" y="312" textAnchor="middle" fontSize="12.5" fill="#b0483a" fontWeight="600">散热 ↑（体温几乎不降低）</text>
      </g>
      <defs>
        <marker id="tr-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#7a8a8f" />
        </marker>
      </defs>
      <text x="16" y="38" fontSize="13.5" fill="#2c6e94" fontWeight="700">体温调节 = 神经调节（下丘脑中枢）+ 体液调节（激素）的动态平衡</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">体温调节流程模式图</text>
    </svg>
  );
}

function RedBloodCellSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 细胞膜（唯一的膜结构） */}
      <g style={dim(active, 0)}>
        <circle cx="190" cy="178" r="112" fill="#d4544a" stroke="#a83832" strokeWidth="4" />
        <circle cx="190" cy="178" r="112" fill="none" stroke="#f0908a" strokeWidth="6" opacity="0.55" />
      </g>
      {/* 双凹圆盘：中央凹陷区 + 右侧纵切示意 */}
      <g style={dim(active, 1)}>
        <ellipse cx="190" cy="178" rx="66" ry="56" fill="#e88a80" opacity="0.9" />
        <ellipse cx="176" cy="164" rx="26" ry="18" fill="#f2aca4" opacity="0.85" />
        <path d="M330 244 Q 344 168 330 112 Q 322 82 352 76 Q 396 66 424 84 Q 402 92 398 120 Q 394 168 404 224 Q 410 252 384 258 Q 350 264 330 244 Z"
          fill="#e88a80" stroke="#a83832" strokeWidth="3.5" />
        <text x="368" y="176" textAnchor="middle" fontSize="12.5" fill="#7c2622" fontWeight="700">纵切：双凹</text>
        <text x="368" y="190" textAnchor="middle" fontSize="12" fill="#a83832">中央薄 · 边缘厚</text>
      </g>
      {/* 无细胞核（虚线空位 + 斜杠） */}
      <g style={dim(active, 2)}>
        <circle cx="190" cy="178" r="26" fill="none" stroke="#7c2622" strokeWidth="3" strokeDasharray="6 5" />
        <line x1="173" y1="195" x2="207" y2="161" stroke="#7c2622" strokeWidth="4" strokeLinecap="round" />
        <text x="190" y="230" textAnchor="middle" fontSize="13" fill="#7c2622" fontWeight="700">无细胞核</text>
      </g>
      {/* 血红蛋白（内部小颗粒） */}
      <g style={dim(active, 3)}>
        {[[126, 122], [152, 106], [232, 112], [258, 140], [110, 196], [128, 236], [246, 226], [262, 196], [172, 262], [216, 258]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="7" fill="#b53832" stroke="#8c231f" strokeWidth="1.6" />
        ))}
        <line x1="262" y1="140" x2="298" y2="112" stroke="#8c231f" strokeWidth="1.4" />
        <text x="300" y="108" fontSize="13.5" fill="#8c231f" fontWeight="700">血红蛋白（运 O2）</text>
        <text x="300" y="130" fontSize="12.5" fill="#b5564f">含铁的蛋白质</text>
      </g>
      {/* 标注：细胞膜 + 弹性变形 */}
      <g style={dim(active, 0)}>
        <line x1="86" y1="110" x2="60" y2="86" stroke="#a83832" strokeWidth="1.4" />
        <text x="16" y="70" fontSize="13.5" fill="#a83832" fontWeight="700">细胞膜（唯一膜结构）</text>
        <text x="16" y="92" fontSize="12.5" fill="#c06a62">无细胞壁、无核膜与众多细胞器膜</text>
      </g>
      <g style={dim(active, 4)}>
        <text x="16" y="320" fontSize="13.5" fill="#5f7076" fontWeight="600">制备细胞膜的经典材料：吸水胀破后，离心即可得到较纯净的细胞膜</text>
        <text x="16" y="342" fontSize="12.5" fill="#8a9a9e">直径约 7.6 μm，可变形挤过更细的毛细血管</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">哺乳动物红细胞（双凹圆盘）模式图</text>
    </svg>
  );
}

function AntibodySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* Y 形抗体 */}
      <g style={dim(active, 0)}>
        <path d="M232 320 L 240 200 Q 240 176 222 158 L 196 128" fill="none" stroke="#c98a1d" strokeWidth="16" strokeLinecap="round" />
        <path d="M288 320 L 280 200 Q 280 176 298 158 L 324 128" fill="none" stroke="#c98a1d" strokeWidth="16" strokeLinecap="round" />
        <path d="M196 128 L 232 178 M 324 128 L 288 178" fill="none" stroke="#e8b05a" strokeWidth="9" strokeLinecap="round" />
        <text x="260" y="352" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">Y 形：两条重链 + 两条轻链</text>
      </g>
      {/* 抗原结合 */}
      <g style={dim(active, 1)}>
        {[[196, 116], [324, 116]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y - 12} r="15" fill="#d97a5a" stroke="#b0483a" strokeWidth="2.5" strokeDasharray="5 4" />
            <text x={x} y={y - 7} textAnchor="middle" fontSize="11.5" fill="#7a2622" fontWeight="700">抗原</text>
          </g>
        ))}
        <text x="72" y="72" fontSize="13.5" fill="#b0483a" fontWeight="700">抗原结合部位（可变）</text>
        <text x="72" y="90" fontSize="12" fill="#c97a5a">像钥匙配锁——特异性</text>
        <line x1="178" y1="76" x2="188" y2="92" stroke="#b0483a" strokeWidth="1.4" />
      </g>
      {/* 效应说明 */}
      <g style={dim(active, 2)}>
        <rect x="330" y="196" width="176" height="118" rx="10" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="346" y="222" fontSize="13" fill="#2c6e94" fontWeight="700">结合后会发生什么？</text>
        <text x="346" y="246" fontSize="12.5" fill="#46666d">· 形成沉淀或细胞集团</text>
        <text x="346" y="266" fontSize="12.5" fill="#46666d">· 被吞噬细胞消化清除</text>
        <text x="346" y="286" fontSize="12.5" fill="#46666d">· 抗体本身不"杀灭"抗原</text>
        <text x="346" y="306" fontSize="12" fill="#799398">由浆细胞（效应 B 细胞）分泌</text>
      </g>
      {/* 记忆细胞 */}
      <g style={dim(active, 3)}>
        <rect x="24" y="196" width="176" height="118" rx="10" fill="#eef7f6" stroke="#9fcab2" strokeWidth="2" />
        <text x="40" y="222" fontSize="13" fill="#2f7a4d" fontWeight="700">二次免疫为什么更快？</text>
        <text x="40" y="246" fontSize="12.5" fill="#46666d">初次免疫产生记忆细胞；</text>
        <text x="40" y="266" fontSize="12.5" fill="#46666d">再次遇到同一抗原时</text>
        <text x="40" y="286" fontSize="12.5" fill="#46666d">更快、更多地产出抗体。</text>
        <text x="40" y="306" fontSize="12" fill="#799398">疫苗的原理正是如此</text>
      </g>
      <text x="16" y="52" fontSize="13.5" fill="#2c6e94" fontWeight="700">抗体 = 浆细胞分泌的免疫球蛋白（蛋白质）——专有名词条目，配免疫调节复习</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">抗体结构示意图</text>
    </svg>
  );
}

function MonoclonalAntibodySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 两种亲本细胞 */}
      <g style={dim(active, 0)}>
        <circle cx="92" cy="104" r="36" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="3" />
        <circle cx="92" cy="104" r="8" fill="#7a4a8a" />
        <text x="92" y="162" textAnchor="middle" fontSize="12.5" fill="#6a4a9a" fontWeight="600">B 淋巴细胞</text>
        <text x="92" y="180" textAnchor="middle" fontSize="11.5" fill="#8a6a94">产特异抗体 · 不能增殖</text>
      </g>
      <g style={dim(active, 1)}>
        <circle cx="92" cy="256" r="36" fill="#f0b0a8" stroke="#b0483a" strokeWidth="3" />
        <circle cx="92" cy="256" r="8" fill="#b0483a" />
        <text x="92" y="314" textAnchor="middle" fontSize="12.5" fill="#9b3a30" fontWeight="600">骨髓瘤细胞</text>
        <text x="92" y="332" textAnchor="middle" fontSize="11.5" fill="#b56a62">能无限增殖 · 不产抗体</text>
      </g>
      {/* 融合 */}
      <g style={dim(active, 2)}>
        <path d="M138 130 Q 180 148 216 166" fill="none" stroke="#5a5a62" strokeWidth="3.5" markerEnd="url(#ma-arrow)" />
        <path d="M138 240 Q 180 224 216 204" fill="none" stroke="#5a5a62" strokeWidth="3.5" markerEnd="url(#ma-arrow)" />
        <text x="176" y="186" textAnchor="middle" fontSize="12.5" fill="#59767c" fontWeight="600">细胞融合</text>
        <text x="176" y="204" textAnchor="middle" fontSize="11.5" fill="#799398">（PEG / 灭活病毒）</text>
        <circle cx="290" cy="186" r="42" fill="#d9c8ec" stroke="#7a4a8a" strokeWidth="3.5" />
        <circle cx="276" cy="176" r="8" fill="#7a4a8a" />
        <circle cx="304" cy="196" r="8" fill="#b0483a" />
        <text x="290" y="248" textAnchor="middle" fontSize="13" fill="#6a4a9a" fontWeight="700">杂交瘤细胞</text>
        <text x="290" y="266" textAnchor="middle" fontSize="11.5" fill="#8a6a94">兼具两亲本优点</text>
      </g>
      {/* 筛选与生产 */}
      <g style={dim(active, 3)}>
        <line x1="336" y1="186" x2="372" y2="186" stroke="#5a5a62" strokeWidth="3.5" markerEnd="url(#ma-arrow)" />
        <text x="354" y="170" textAnchor="middle" fontSize="12" fill="#59767c">筛选</text>
        <rect x="378" y="150" width="58" height="72" rx="10" fill="#eef7f6" stroke="#0e6f75" strokeWidth="3" />
        <path d="M390 200 Q 407 186 424 200" fill="none" stroke="#0e6f75" strokeWidth="3" />
        <text x="407" y="248" textAnchor="middle" fontSize="12" fill="#0a626a" fontWeight="600">体外培养</text>
        <line x1="440" y1="186" x2="464" y2="186" stroke="#5a5a62" strokeWidth="3.5" markerEnd="url(#ma-arrow)" />
        <path d="M470 172 L494 172 L494 214 Q 482 226 470 214 Z" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.5" />
        <text x="482" y="248" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="600">抗体</text>
      </g>
      {/* 优点 */}
      <g style={dim(active, 3)}>
        <rect x="200" y="290" width="300" height="58" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="216" y="314" fontSize="13" fill="#173b42" fontWeight="700">单克隆抗体优点：特异性强、灵敏度高</text>
        <text x="216" y="334" fontSize="12" fill="#59767c">并可大量制备——用于诊断（试纸）与靶向治疗</text>
      </g>
      <defs>
        <marker id="ma-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="16" y="46" fontSize="13.5" fill="#2c6e94" fontWeight="700">单克隆抗体制备流程（动物细胞融合技术）——"两亲本优点的合体"</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">单克隆抗体制备流程图</text>
    </svg>
  );
}

function HomeostasisNetworkSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 中央：稳态 */}
      <g style={dim(active, 3)}>
        <circle cx="260" cy="186" r="66" fill="#e7f3e2" stroke="#2f7a4d" strokeWidth="4" />
        <text x="260" y="180" textAnchor="middle" fontSize="14" fill="#2f7a4d" fontWeight="700">内环境稳态</text>
        <text x="260" y="200" textAnchor="middle" fontSize="12" fill="#4a8a4a">动态平衡（不是不变）</text>
      </g>
      {/* 神经调节 */}
      <g style={dim(active, 0)}>
        <rect x="40" y="56" width="150" height="66" rx="12" fill="#d9e7f2" stroke="#3d6a94" strokeWidth="3" />
        <text x="115" y="82" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">神经调节</text>
        <text x="115" y="102" textAnchor="middle" fontSize="11.5" fill="#4a7a9a">反应快 · 定位准 · 短暂</text>
        <line x1="150" y1="126" x2="212" y2="152" stroke="#3d6a94" strokeWidth="3.5" markerEnd="url(#hn-arrow)" />
      </g>
      {/* 体液调节 */}
      <g style={dim(active, 1)}>
        <rect x="330" y="56" width="150" height="66" rx="12" fill="#f4d9b0" stroke="#b57c16" strokeWidth="3" />
        <text x="405" y="82" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">体液调节</text>
        <text x="405" y="102" textAnchor="middle" fontSize="11.5" fill="#a58a4a">较慢 · 广泛 · 较长</text>
        <line x1="370" y1="126" x2="308" y2="152" stroke="#b57c16" strokeWidth="3.5" markerEnd="url(#hn-arrow)" />
      </g>
      {/* 免疫调节 */}
      <g style={dim(active, 2)}>
        <rect x="185" y="300" width="150" height="66" rx="12" fill="#f0b0a8" stroke="#b0483a" strokeWidth="3" />
        <text x="260" y="326" textAnchor="middle" fontSize="13.5" fill="#9b3a30" fontWeight="700">免疫调节</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#b56a62">清除异物 · 防卫监控清除</text>
        <line x1="260" y1="296" x2="260" y2="256" stroke="#b0483a" strokeWidth="3.5" markerEnd="url(#hn-arrow)" />
      </g>
      {/* 相互联系 */}
      <g style={dim(active, 3)}>
        <path d="M76 128 Q 150 300 228 318" fill="none" stroke="#8aa1a6" strokeWidth="2" strokeDasharray="6 5" />
        <path d="M444 128 Q 370 300 292 318" fill="none" stroke="#8aa1a6" strokeWidth="2" strokeDasharray="6 5" />
        <text x="60" y="252" fontSize="12" fill="#799398">互相协调配合</text>
        <text x="428" y="252" fontSize="12" fill="#799398">缺一不可</text>
      </g>
      <text x="16" y="40" fontSize="13.5" fill="#2c6e94" fontWeight="700">目前普遍认为：神经-体液-免疫调节网络是机体维持稳态的主要调节机制</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">稳态调节网络概念图</text>
      <defs>
        <marker id="hn-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
    </svg>
  );
}

function ThreeDefenseLinesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">三道防线：前两道非特异（生来就有），第三道特异（后天获得）</text>
      {/* 病原体（左列） */}
      <g style={dim(active, 0)}>
        {[104, 194, 284].map((y, i) => (
          <g key={i} transform={`translate(52 ${y})`}>
            <ellipse rx="24" ry="14" fill="#a8c98a" stroke="#5f7a3a" strokeWidth="2.5" />
            {[0, 1, 2].map((j) => (
              <line key={j} x1="20" y1={-7 + j * 7} x2="34" y2={-9 + j * 8} stroke="#5f7a3a" strokeWidth="2.5" strokeLinecap="round" />
            ))}
          </g>
        ))}
        <text x="52" y="52" textAnchor="middle" fontSize="13" fill="#5f7a3a" fontWeight="700">病原体</text>
        <text x="52" y="68" textAnchor="middle" fontSize="12" fill="#799398">入侵 ↓</text>
      </g>
      {/* 第一行：第一道防线 */}
      <g style={dim(active, 1)}>
        <rect x="112" y="68" width="394" height="72" fill="#fdf6e3" stroke="#13333a" strokeWidth="2.5" />
        <rect x="112" y="68" width="16" height="72" fill="#f0c98a" stroke="#b58a3a" strokeWidth="2.5" />
        <text x="148" y="100" fontSize="13.5" fill="#8a671b" fontWeight="700">第一道防线：皮肤和黏膜</text>
        <text x="148" y="124" fontSize="12.5" fill="#a58a4a">阻挡病原体 · 分泌物杀菌 · 纤毛清扫异物</text>
        <rect x="428" y="80" width="70" height="24" rx="12" fill="#e7f2f1" stroke="#0e6f75" strokeWidth="2" />
        <text x="463" y="97" textAnchor="middle" fontSize="11.5" fill="#0a626a" fontWeight="700">非特异</text>
      </g>
      {/* 第二行：第二道防线 */}
      <g style={dim(active, 2)}>
        <rect x="112" y="150" width="394" height="72" fill="#f0faf9" stroke="#13333a" strokeWidth="2.5" />
        <rect x="112" y="150" width="16" height="72" fill="#dcebea" stroke="#4b8a7a" strokeWidth="2.5" />
        <circle cx="158" cy="186" r="20" fill="#d4e8d4" stroke="#4a8a3a" strokeWidth="2.5" />
        <circle cx="152" cy="182" r="5" fill="#4a8a3a" />
        <circle cx="164" cy="190" r="4" fill="#4a8a3a" />
        <text x="196" y="176" fontSize="13.5" fill="#2f7a4d" fontWeight="700">第二道防线：杀菌物质和吞噬细胞</text>
        <text x="196" y="200" fontSize="12.5" fill="#5a8a7a">溶菌酶溶解细菌 · 吞噬细胞吞噬消化病原体</text>
        <rect x="428" y="162" width="70" height="24" rx="12" fill="#e7f2f1" stroke="#0e6f75" strokeWidth="2" />
        <text x="463" y="179" textAnchor="middle" fontSize="11.5" fill="#0a626a" fontWeight="700">非特异</text>
      </g>
      {/* 第三行：第三道防线 */}
      <g style={dim(active, 3)}>
        <rect x="112" y="232" width="394" height="72" fill="#f3eef9" stroke="#13333a" strokeWidth="2.5" />
        <rect x="112" y="232" width="16" height="72" fill="#e8d4f2" stroke="#7a4a8a" strokeWidth="2.5" />
        <circle cx="158" cy="268" r="18" fill="#e8d4f2" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="158" y="273" textAnchor="middle" fontSize="12" fill="#6a3a7a" fontWeight="700">T</text>
        <circle cx="210" cy="268" r="18" fill="#d4e2f2" stroke="#3d6a94" strokeWidth="2.5" />
        <text x="210" y="273" textAnchor="middle" fontSize="12" fill="#1e4a68" fontWeight="700">B</text>
        {[258, 284].map((x, i) => (
          <g key={i} transform={`translate(${x} ${272})`}>
            <line x1="-7" y1="0" x2="7" y2="0" stroke="#0e6f75" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="0" y1="0" x2="0" y2="12" stroke="#0e6f75" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        ))}
        <text x="306" y="254" fontSize="13.5" fill="#6a3a7a" fontWeight="700">第三道防线</text>
        <text x="306" y="278" fontSize="12.5" fill="#8a6a94">免疫器官和免疫细胞（T、B、抗体）</text>
        <rect x="428" y="244" width="70" height="24" rx="12" fill="#e8d4f2" stroke="#7a4a8a" strokeWidth="2" />
        <text x="463" y="261" textAnchor="middle" fontSize="11.5" fill="#6a3a7a" fontWeight="700">特异</text>
      </g>
      {/* 底部结论 */}
      <g style={dim(active, 4)}>
        <rect x="16" y="318" width="490" height="36" rx="8" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="32" y="342" fontSize="13" fill="#8a671b" fontWeight="600">易错：吞噬细胞"一员多岗"——既在第二道防线直接吞噬，也在第三道防线呈递抗原</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">人体三道防线层级模式图</text>
    </svg>
  );
}

function HeartCirculationSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">心脏四腔：上房下室，血液定向流动（瓣膜防倒流）</text>
      {/* 左右肺 */}
      <g style={dim(active, 3)}>
        <ellipse cx="70" cy="96" rx="34" ry="46" fill="#f6b8b0" stroke="#b0483a" strokeWidth="3" />
        <ellipse cx="450" cy="96" rx="34" ry="46" fill="#f6b8b0" stroke="#b0483a" strokeWidth="3" />
        <text x="70" y="164" textAnchor="middle" fontSize="12.5" fill="#b0483a" fontWeight="600">肺（气体交换）</text>
        {/* 肺循环箭头 */}
        <path d="M104 96 Q 130 80 148 92" fill="none" stroke="#3d7e9e" strokeWidth="3.5" markerEnd="url(#hc-arrow)" />
        <path d="M416 100 Q 384 74 356 88" fill="none" stroke="#b0483a" strokeWidth="3.5" markerEnd="url(#hc-arrow)" />
        <text x="112" y="72" fontSize="12" fill="#3d7e9e" fontWeight="600">肺动脉（静脉血）</text>
        <text x="330" y="60" fontSize="12" fill="#b0483a" fontWeight="600">肺静脉（动脉血）</text>
      </g>
      {/* 心脏四腔 */}
      <g style={dim(active, 1)}>
        <path d="M200 92 L 200 250 Q 200 268 218 268 L 302 268 Q 320 268 320 250 L 320 92 Z" fill="#f6c8c0" stroke="#b0483a" strokeWidth="3.5" />
        <line x1="260" y1="92" x2="260" y2="268" stroke="#b0483a" strokeWidth="3" />
        <line x1="200" y1="184" x2="320" y2="184" stroke="#b0483a" strokeWidth="3" />
        <text x="230" y="120" textAnchor="middle" fontSize="13" fill="#7a2622" fontWeight="700">右心房</text>
        <text x="290" y="120" textAnchor="middle" fontSize="13" fill="#5a2a7a" fontWeight="700">左心房</text>
        <text x="230" y="240" textAnchor="middle" fontSize="13" fill="#7a2622" fontWeight="700">右心室</text>
        <text x="290" y="240" textAnchor="middle" fontSize="13" fill="#5a2a7a" fontWeight="700">左心室</text>
        <text x="230" y="290" textAnchor="middle" fontSize="12" fill="#8a6a6a">壁最厚（泵血到全身）</text>
      </g>
      {/* 瓣膜 */}
      <g style={dim(active, 2)}>
        <path d="M204 184 L 222 202 L 240 184" fill="none" stroke="#c98a1d" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M280 184 L 298 202 L 316 184" fill="none" stroke="#c98a1d" strokeWidth="3.5" strokeLinecap="round" />
        <text x="336" y="200" fontSize="12.5" fill="#c98a1d" fontWeight="700">房室瓣</text>
        <text x="336" y="218" fontSize="12" fill="#a58a4a">防血液倒流</text>
      </g>
      {/* 体循环箭头 */}
      <g style={dim(active, 4)}>
        <path d="M226 268 Q 210 322 130 330" fill="none" stroke="#b0483a" strokeWidth="3.5" markerEnd="url(#hc-arrow)" />
        <text x="24" y="322" fontSize="12.5" fill="#b0483a" fontWeight="700">体循环：左心室 → 全身 → 右心房</text>
        <path d="M280 92 Q 300 56 340 60" fill="none" stroke="#b0483a" strokeWidth="0" />
      </g>
      {/* 口诀 */}
      <g style={dim(active, 4)}>
        <text x="16" y="352" fontSize="12.5" fill="#59767c" fontWeight="600">口诀：上房下室 · 房连静、室连动 · 血液流动方向：静脉 → 心房 → 心室 → 动脉</text>
      </g>
      <defs>
        <marker id="hc-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#8a671b" />
        </marker>
      </defs>
    </svg>
  );
}

function NephronSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">尿液形成两步：肾小球过滤 → 肾小管重吸收</text>
      {/* 肾小球（左上圆） */}
      <g style={dim(active, 0)}>
        <circle cx="120" cy="130" r="62" fill="#dcebea" stroke="#3d7e9e" strokeWidth="3" />
        <circle cx="120" cy="130" r="28" fill="#b0483a" opacity="0.75" />
        <text x="120" y="58" textAnchor="middle" fontSize="13" fill="#7a2622" fontWeight="700">肾小球（毛细血管球）</text>
        <text x="120" y="222" textAnchor="middle" fontSize="12" fill="#a05a4a" fontWeight="600">过滤：血细胞和大分子蛋白</text>
        <text x="120" y="240" textAnchor="middle" fontSize="12" fill="#a05a4a" fontWeight="600">留在血管内，其余滤出</text>
      </g>
      {/* 肾小管（右侧弯曲管） */}
      <g style={dim(active, 1)}>
        <path d="M182 130 Q 280 110 330 150 Q 380 190 320 230 Q 260 270 320 300" fill="none" stroke="#e8a86a" strokeWidth="12" strokeLinecap="round" />
        <text x="400" y="148" fontSize="13" fill="#b57c3a" fontWeight="700">肾小管</text>
        <text x="356" y="170" fontSize="12" fill="#b57c3a" fontWeight="600">重吸收：葡萄糖</text>
        <text x="356" y="190" fontSize="12" fill="#b57c3a" fontWeight="600">全部 + 大部分水</text>
        <text x="356" y="210" fontSize="12" fill="#b57c3a" fontWeight="600">和部分无机盐</text>
      </g>
      {/* 收集管与尿液 */}
      <g style={dim(active, 2)}>
        <rect x="360" y="266" width="56" height="72" rx="10" fill="#dcebea" stroke="#3d7e9e" strokeWidth="3" />
        <text x="388" y="290" textAnchor="middle" fontSize="12.5" fill="#1e4a68" fontWeight="700">收集管</text>
        <text x="388" y="308" textAnchor="middle" fontSize="12" fill="#4a7a9a">→ 膀胱</text>
        <ellipse cx="300" cy="322" rx="26" ry="30" fill="#f4e3b8" stroke="#c98a1d" strokeWidth="3" />
        <text x="300" y="318" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">尿液</text>
        <text x="300" y="334" textAnchor="middle" fontSize="11" fill="#a58a4a">水·无机盐·尿素</text>
      </g>
      {/* 底部要点 */}
      <g style={dim(active, 3)}>
        <rect x="26" y="336" width="240" height="36" rx="9" fill="#e7f3e2" stroke="#3f7f3a" strokeWidth="2" />
        <text x="40" y="352" fontSize="12" fill="#2f7a4d" fontWeight="600">健康人每天原尿 150L → 尿液 1.5L</text>
      </g>
      <g style={dim(active, 1)}>
        <rect x="278" y="336" width="216" height="36" rx="9" fill="#fdf0ee" stroke="#e0a3a3" strokeWidth="2" />
        <text x="292" y="352" fontSize="12" fill="#b0483a" fontWeight="600">尿糖/蛋白尿 → 重吸收或过滤异常</text>
      </g>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">肾单位与尿液形成模式图</text>
    </svg>
  );
}

function JointSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">关节 = 骨与骨之间的可动连接——运动的"支点"</text>
      {/* 骨（上下两段） */}
      <g style={dim(active, 0)}>
        <path d="M200 60 L 252 60 L 252 132 Q 226 148 200 132 Z" fill="#f6f0e0" stroke="#b5953a" strokeWidth="3" />
        <path d="M200 248 L 252 248 L 252 176 Q 226 160 200 176 Z" fill="#f6f0e0" stroke="#b5953a" strokeWidth="3" />
        <text x="256" y="104" fontSize="12.5" fill="#8a6a48" fontWeight="600">骨</text>
        <text x="256" y="228" fontSize="12.5" fill="#8a6a48" fontWeight="600">骨</text>
      </g>
      {/* 关节面/软骨 */}
      <g style={dim(active, 1)}>
        <path d="M204 134 Q 226 150 248 134" fill="none" stroke="#6aa86a" strokeWidth="6" strokeLinecap="round" />
        <path d="M204 174 Q 226 158 248 174" fill="none" stroke="#6aa86a" strokeWidth="6" strokeLinecap="round" />
        <text x="330" y="148" fontSize="12.5" fill="#3f7f3a" fontWeight="700">关节软骨（减少摩擦缓冲震动）</text>
        <line x1="326" y1="150" x2="250" y2="152" stroke="#3f7f3a" strokeWidth="1.4" />
      </g>
      {/* 关节腔 */}
      <g style={dim(active, 2)}>
        <ellipse cx="226" cy="154" rx="26" ry="14" fill="#dff0f7" stroke="#3d7e9e" strokeWidth="2" />
        <text x="330" y="110" fontSize="12.5" fill="#2c6e94" fontWeight="700">关节腔（含滑液润滑）</text>
        <line x1="326" y1="112" x2="252" y2="148" stroke="#2c6e94" strokeWidth="1.4" />
      </g>
      {/* 关节囊 */}
      <g style={dim(active, 3)}>
        <path d="M188 64 Q 176 154 188 244" fill="none" stroke="#b0483a" strokeWidth="5" strokeLinecap="round" />
        <path d="M264 64 Q 276 154 264 244" fill="none" stroke="#b0483a" strokeWidth="5" strokeLinecap="round" />
        <text x="24" y="72" fontSize="12.5" fill="#b0483a" fontWeight="700">关节囊（包绕稳固）</text>
      </g>
      {/* 骨骼肌协作 */}
      <g style={dim(active, 4)}>
        <path d="M110 100 Q 140 118 174 130" fill="none" stroke="#b0483a" strokeWidth="12" strokeLinecap="round" />
        <path d="M110 210 Q 140 196 174 178" fill="none" stroke="#b0483a" strokeWidth="12" strokeLinecap="round" />
        <text x="24" y="88" fontSize="12.5" fill="#b0483a" fontWeight="700">肱二头肌（收缩）</text>
        <text x="24" y="230" fontSize="12.5" fill="#b0483a" fontWeight="700">肱三头肌（舒张）</text>
        <text x="16" y="290" fontSize="12.5" fill="#59767c" fontWeight="600">屈肘：二头肌收缩、三头肌舒张；伸肘相反——肌肉只能牵拉不能推开</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">关节与运动（以肘关节为例）模式图</text>
    </svg>
  );
}

function EyeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="30" fontSize="13" fill="#2c6e94" fontWeight="700">视觉形成：光线 → 角膜 → 瞳孔 → 晶状体 → 视网膜成像 → 视神经 → 大脑</text>
      {/* 眼球轮廓 */}
      <g style={dim(active, 0)}>
        <circle cx="240" cy="190" r="130" fill="#eaf1f9" stroke="#3d6a94" strokeWidth="4" />
      </g>
      {/* 角膜与瞳孔 */}
      <g style={dim(active, 1)}>
        <path d="M370 150 Q 392 190 370 230" fill="none" stroke="#5ab8d4" strokeWidth="7" strokeLinecap="round" />
        <circle cx="352" cy="190" r="17" fill="#13333a" />
        <text x="404" y="120" fontSize="13" fill="#2c6e94" fontWeight="700">角膜（透明）</text>
        <text x="404" y="262" fontSize="13" fill="#2c6e94" fontWeight="700">瞳孔（大小可变）</text>
        <line x1="400" y1="124" x2="374" y2="148" stroke="#2c6e94" strokeWidth="1.4" />
        <line x1="400" y1="258" x2="368" y2="200" stroke="#2c6e94" strokeWidth="1.4" />
      </g>
      {/* 晶状体 */}
      <g style={dim(active, 2)}>
        <ellipse cx="322" cy="190" rx="26" ry="34" fill="#dcebea" stroke="#3d7e9e" strokeWidth="3" />
        <text x="252" y="128" fontSize="13" fill="#1e4a68" fontWeight="700">晶状体（曲度可调 = 对焦）</text>
        <line x1="286" y1="134" x2="306" y2="164" stroke="#1e4a68" strokeWidth="1.4" />
      </g>
      {/* 视网膜 */}
      <g style={dim(active, 3)}>
        <path d="M368 82 Q 288 66 196 84" fill="none" stroke="#b0483a" strokeWidth="6" strokeLinecap="round" />
        <path d="M368 298 Q 288 314 196 296" fill="none" stroke="#b0483a" strokeWidth="6" strokeLinecap="round" />
        <path d="M122 100 Q 110 190 126 280" fill="none" stroke="#b0483a" strokeWidth="6" strokeLinecap="round" />
        <text x="128" y="292" fontSize="13" fill="#b0483a" fontWeight="700">视网膜（成像 + 感光细胞）</text>
      </g>
      {/* 视神经 */}
      <g style={dim(active, 4)}>
        <circle cx="240" cy="190" r="10" fill="#f4d06a" stroke="#c98a1d" strokeWidth="2" />
        <line x1="240" y1="190" x2="128" y2="196" stroke="#c98a1d" strokeWidth="3" />
        <line x1="128" y1="196" x2="60" y2="290" stroke="#c98a1d" strokeWidth="6" strokeLinecap="round" />
        <text x="20" y="316" fontSize="12.5" fill="#c98a1d" fontWeight="700">视神经 → 大脑皮层视觉中枢</text>
      </g>
      {/* 成像说明 */}
      <g style={dim(active, 3)}>
        <text x="150" y="222" textAnchor="middle" fontSize="12" fill="#59767c" fontWeight="600">倒立的缩小的实像</text>
      </g>
      <g style={dim(active, 4)}>
        <text x="16" y="352" fontSize="12.5" fill="#59767c" fontWeight="600">易错：成像在"视网膜"，但"看见"发生在大脑皮层；近视 = 晶状体曲度过大 → 配凹透镜</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">眼球与视觉形成模式图</text>
    </svg>
  );
}

function BatSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">蝙蝠：唯一真正会飞的哺乳动物——回声定位的"活体声呐"</text>
      <g style={dim(active, 0)}>
        <ellipse cx="240" cy="180" rx="52" ry="40" fill="#8a7a9a" stroke="#4a3a5a" strokeWidth="3.5" />
        <circle cx="296" cy="156" r="24" fill="#8a7a9a" stroke="#4a3a5a" strokeWidth="3" />
        <path d="M280 138 Q 288 118 298 132 M 306 134 Q 316 116 322 132" fill="none" stroke="#4a3a5a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="288" cy="150" r="4" fill="#f4d06a" />
        <circle cx="308" cy="150" r="4" fill="#f4d06a" />
        <path d="M264 152 Q 200 130 110 96 Q 60 120 44 176 Q 140 180 264 196 Z" fill="#6a5a80" stroke="#3a2a50" strokeWidth="3" />
        {[110, 150, 190, 226].map((x, i) => (
          <line key={i} x1="262" y1="152" x2={x} y2={96 + i * 24} stroke="#3a2a50" strokeWidth="2.5" opacity="0.7" />
        ))}
        <text x="52" y="80" fontSize="13.5" fill="#3a2a50" fontWeight="700">翼膜：前肢指骨撑起的皮膜</text>
        <text x="52" y="100" fontSize="12" fill="#5a4a70">"手指"特长是飞行关键</text>
        <path d="M216 214 L 206 250" fill="none" stroke="#4a3a5a" strokeWidth="4" strokeLinecap="round" />
        <path d="M258 212 L 268 248" fill="none" stroke="#4a3a5a" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g style={dim(active, 1)}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M322 148 Q ${360 + i * 26} ${148} ${400 + i * 26} ${120 + i * 6}`} fill="none" stroke="#3d7e9e" strokeWidth={3 - i * 0.6} strokeDasharray={i === 0 ? undefined : '7 6'} strokeLinecap="round" />
        ))}
        <text x="380" y="96" fontSize="13.5" fill="#2c6e94" fontWeight="700">回声定位（超声波）</text>
        <text x="380" y="116" fontSize="12" fill="#4a7a9a">夜间捕食昆虫、避开障碍</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="26" y="288" width="468" height="64" rx="9" fill="#eef1f9" stroke="#3d6a94" strokeWidth="2.5" />
        <text x="42" y="312" fontSize="13" fill="#1e4a68" fontWeight="700">哺乳动物的核心特征：胎生、哺乳（蝙蝠飞行再强，这两条不变）</text>
        <text x="42" y="336" fontSize="12" fill="#4a6a8a">易错：会飞的≠鸟类——鸟类有羽毛，蝙蝠翼是皮膜；仿生学：雷达灵感来自蝙蝠回声定位</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">蝙蝠（哺乳动物）模式图（课外拓展）</text>
    </svg>
  );
}

function PlatypusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">鸭嘴兽：卵生却哺乳的"活化石"——哺乳动物起源于爬行类的证据</text>
      <rect x="20" y="180" width="480" height="120" fill="#cfe4f0" opacity="0.6" rx="10" />
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="210" rx="120" ry="56" fill="#8a7a5a" stroke="#5a4a2a" strokeWidth="3.5" />
        <path d="M132 200 Q 92 196 76 210 Q 92 224 132 222 Q 122 210 132 200 Z" fill="#5a6a7a" stroke="#3a4a5a" strokeWidth="2.5" />
        <text x="52" y="176" fontSize="13" fill="#3a4a5a" fontWeight="700">鸭形喙（电感应）</text>
        <path d="M366 202 Q 430 196 464 216 Q 436 240 372 228 Q 358 214 366 202 Z" fill="#6a5a3a" stroke="#4a3a1a" strokeWidth="2.5" />
        <text x="428" y="188" fontSize="13" fill="#4a3a1a" fontWeight="700">河狸式宽尾</text>
      </g>
      <g style={dim(active, 1)}>
        <ellipse cx="330" cy="312" rx="26" ry="18" fill="#f4ead0" stroke="#b5953a" strokeWidth="2.5" />
        <text x="330" y="344" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="700">产卵（卵生）！</text>
      </g>
      <g style={dim(active, 2)}>
        <circle cx="150" cy="312" r="7" fill="#d4b8e8" stroke="#7a4a8a" strokeWidth="2" />
        <circle cx="174" cy="312" r="7" fill="#d4b8e8" stroke="#7a4a8a" strokeWidth="2" />
        <text x="24" y="348" fontSize="13" fill="#6a3a7a" fontWeight="700">腹沟乳汁哺育幼崽（无乳头）</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="230" y="356" width="270" height="0" fill="none" />
      </g>
      <g style={dim(active, 2)}>
              </g>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">鸭嘴兽（哺乳动物活化石）模式图（课外拓展）</text>
    </svg>
  );
}

export const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {
  earwax: { Svg: EarwaxSvg },
  gastricMucus: { Svg: GastricMucusSvg },
  heartValves: { Svg: HeartValvesSvg },
  swallowing: { Svg: SwallowingSvg },
  duodenum: { Svg: DuodenumSvg },
  bloodBrainBarrier: { Svg: BloodBrainBarrierSvg },
  motionSickness: { Svg: MotionSicknessSvg },
  bloodVolume: { Svg: BloodVolumeSvg },
  eyeColor: { Svg: EyeColorSvg },
  boneComposition: { Svg: BoneCompositionSvg },
  cholesterol: { Svg: CholesterolSvg },
  bloodPlasma: { Svg: BloodPlasmaSvg },
  muscleFibers: { Svg: MuscleFibersSvg },
  yawning: { Svg: YawningSvg },
  thyroid: { Svg: ThyroidSvg },
  myopia: { Svg: MyopiaSvg },
  muscleSoreness: { Svg: MuscleSorenessSvg },
  fontanelle: { Svg: FontanelleSvg },
  nail: { Svg: NailSvg },
  handedness: { Svg: HandednessSvg },
  cartilage: { Svg: CartilageSvg },
  painReceptor: { Svg: PainReceptorSvg },
  umbilicus: { Svg: UmbilicusSvg },
  lactoseIntolerance: { Svg: LactoseIntoleranceSvg },
  twins: { Svg: TwinsSvg },
  sweatGland: { Svg: SweatGlandSvg },
  hair: { Svg: HairSvg },
  growthPlate: { Svg: GrowthPlateSvg },
  wisdomTooth: { Svg: WisdomToothSvg },
  saliva: { Svg: SalivaSvg },
  melanin: { Svg: MelaninSvg },
  urinaryBladder: { Svg: UrinaryBladderSvg },
  mammaryGland: { Svg: MammaryGlandSvg },
  fingerprint: { Svg: FingerprintSvg },
  cochleaHair: { Svg: CochleaHairSvg },
  thymus: { Svg: ThymusSvg },
  tears: { Svg: TearsSvg },
  tasteBuds: { Svg: TasteBudsSvg },
  fever: { Svg: FeverSvg },
  woundHealing: { Svg: WoundHealingSvg },
  fetusPlacenta: { Svg: FetusPlacentaSvg },
  bloodTransfusion: { Svg: BloodTransfusionSvg },
  sarcomere: { Svg: SarcomereSvg },
  retinaMacula: { Svg: MaculaSvg },
  pituitary: { Svg: PituitarySvg },
  lymphNode: { Svg: LymphNodeSvg },
  adrenal: { Svg: AdrenalSvg },
  boneMarrow: { Svg: BoneMarrowSvg },
  largeIntestine: { Svg: LargeIntestineSvg },
  tooth: { Svg: ToothSvg },
  tonsil: { Svg: TonsilSvg },
  nasalCavity: { Svg: NasalCavitySvg },
  vaccineTypes: { Svg: VaccineTypesSvg },
  larynx: { Svg: LarynxSvg },
  spinalCord: { Svg: SpinalCordSvg },
  cerebralCortex: { Svg: CerebralCortexSvg },
  stomach: { Svg: StomachSvg },
  liver: { Svg: LiverSvg },
  pancreaticIslet: { Svg: PancreaticIsletSvg },
  spleen: { Svg: SpleenSvg },
  earStructure: { Svg: EarStructureSvg },
  bloodClotting: { Svg: BloodClottingSvg },
  smallIntestineVillus: { Svg: SmallIntestineVillusSvg },
  digestiveSystem: { Svg: DigestiveSystemSvg },
  respiratorySystem: { Svg: RespiratorySystemSvg },
  neuronTypes: { Svg: NeuronTypesSvg },
  skeletonSystem: { Svg: SkeletonSystemSvg },
  heartCompare: { Svg: HeartCompareSvg },
  safeMedication: { Svg: SafeMedicationSvg },
  vitamins: { Svg: VitaminsSvg },
  invasiveSpecies: { Svg: InvasiveSpeciesSvg },
  muscleTissues: { Svg: MuscleTissuesSvg },
  immuneOrgans: { Svg: ImmuneOrgansSvg },
  endocrineGlands: { Svg: EndocrineGlandsSvg },
  boneStructure: { Svg: BoneStructureSvg },
  brainStructure: { Svg: BrainStructureSvg },
  alveolus: { Svg: AlveolusSvg },
  bloodCells: { Svg: BloodCellsSvg },
  skinStructure: { Svg: SkinStructureSvg },
  vessels: { Svg: VesselsSvg },
  neuron: { Svg: NeuronSvg },
  synapse: { Svg: SynapseSvg },
  internalEnvironment: { Svg: InternalEnvironmentSvg },
  thermoregulation: { Svg: ThermoregulationSvg },
  redBloodCell: { Svg: RedBloodCellSvg },
  antibody: { Svg: AntibodySvg },
  monoclonalAntibody: { Svg: MonoclonalAntibodySvg },
  homeostasisNetwork: { Svg: HomeostasisNetworkSvg },
  threeDefenseLines: { Svg: ThreeDefenseLinesSvg },
  heartCirculation: { Svg: HeartCirculationSvg },
  nephron: { Svg: NephronSvg },
  joint: { Svg: JointSvg },
  eye: { Svg: EyeSvg },
  bat: { Svg: BatSvg },
  platypus: { Svg: PlatypusSvg },
};
