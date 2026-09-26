'use client';

import type { ComponentType } from 'react';
import { Badge, dim, type ArtProps } from '@/components/cells/art-shared';
import { StomaWebGLModel } from '@/components/cells/cell-models-webgl';

function AmberSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 松树流脂 */}
      <g style={dim(active, 0)}>
        <path d="M120 84 L120 250 M120 130 q -22 4 -34 22 M120 190 q 20 6 30 24" fill="none" stroke="#8a6f52" strokeWidth="8" strokeLinecap="round" />
        <path d="M96 90 q 24 -34 48 0 q -24 -12 -48 0 M92 146 q 28 -36 56 0 q -28 -14 -56 0" fill="#4a7a3a" stroke="#2f5f2a" strokeWidth="2" />
        <path d="M120 210 q 10 26 6 52" fill="none" stroke="#e8c05a" strokeWidth="7" strokeLinecap="round" />
        <text x="60" y="66" fontSize="12.5" fill="#2f5f2a" fontWeight="700">松科树皮受伤 → 分泌树脂封口</text>
        <text x="150" y="230" fontSize="12" fill="#8a671b" fontWeight="700">树脂=树的"创可贴"（抗菌防虫）</text>
      </g>
      {/* 琥珀放大 */}
      <g style={dim(active, 1)}>
        <path d="M300 96 Q368 76 418 116 Q450 144 442 190 Q432 240 380 252 Q322 262 296 220 Q272 178 300 96 Z" fill="#e8b84a" stroke="#a5761d" strokeWidth="3" opacity="0.9" />
        <path d="M318 130 Q340 108 372 116" fill="none" stroke="#fbe8b8" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
        <circle cx="352" cy="176" r="4.4" fill="#5a4322" />
        <path d="M352 172 q 8 -8 16 -4" fill="none" stroke="#5a4322" strokeWidth="1.6" />
        <path d="M330 206 q 10 -6 18 0 M378 214 q 8 -8 18 -2" fill="none" stroke="#c99a2a" strokeWidth="1.8" />
        <text x="296" y="284" fontSize="12.5" fill="#8a671b" fontWeight="700">昆虫·毛发·气泡的快照</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="318" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">树脂 ≠ 树液：树脂来自树皮分泌细胞（碳氢化合物）；树液是输导组织里的水与营养</text>
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#a5761d">缺氧灭菌的"时间胶囊"：琥珀内组织保存完好——但《侏罗纪公园》式取 DNA 仍是幻想</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">琥珀多产于白垩纪至第三纪的松柏森林——研究古生态与昆虫演化的"透明档案"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">琥珀 · 树脂的时间胶囊（课外拓展）</text>
    </svg>
  );
}

function CoconutSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 椰子剖面 */}
      <g style={dim(active, 0)}>
        <circle cx="200" cy="180" r="96" fill="#8a6a3a" stroke="#5a4322" strokeWidth="3" />
        <circle cx="200" cy="180" r="78" fill="#c9a86a" stroke="#8a6a3a" strokeWidth="2.4" />
        <circle cx="200" cy="180" r="58" fill="#f5f0e2" stroke="#a5761d" strokeWidth="2.2" />
        <circle cx="200" cy="184" r="38" fill="#bfe0ee" stroke="#7ab0c9" strokeWidth="2" />
        <path d="M188 168 q 14 -8 26 2 q -6 14 -22 10 q -8 -6 -4 -12" fill="#f5f0e2" stroke="#a5761d" strokeWidth="1.8" />
      </g>
      {/* 结构标注 */}
      <g style={dim(active, 1)}>
        <line x1="120" y1="112" x2="76" y2="84" stroke="#8a9a9f" strokeWidth="1.6" />
        <text x="40" y="72" fontSize="12.5" fill="#7a4a2a" fontWeight="700">外果皮：光滑革质</text>
        <line x1="126" y1="258" x2="82" y2="286" stroke="#8a9a9f" strokeWidth="1.6" />
        <text x="40" y="298" fontSize="12.5" fill="#8a671b" fontWeight="700">中果皮：纤维层=救生圈</text>
        <text x="40" y="316" fontSize="12" fill="#8a671b">可漂在海上数月·随洋流远征</text>
        <line x1="286" y1="130" x2="330" y2="102" stroke="#8a9a9f" strokeWidth="1.6" />
        <text x="336" y="98" fontSize="12.5" fill="#5a4322" fontWeight="700">内果皮：坚硬"椰壳"</text>
        <text x="336" y="116" fontSize="12" fill="#5a4322">保护胚与胚乳</text>
        <line x1="286" y1="204" x2="342" y2="228" stroke="#8a9a9f" strokeWidth="1.6" />
        <text x="348" y="226" fontSize="12.5" fill="#2f6f2a" fontWeight="700">椰肉：固体胚乳（成熟中形成）</text>
        <line x1="292" y1="258" x2="356" y2="282" stroke="#8a9a9f" strokeWidth="1.6" />
        <text x="362" y="280" fontSize="12.5" fill="#3a6a8a" fontWeight="700">椰子水：液体胚乳</text>
        <text x="362" y="298" fontSize="12" fill="#3a6a8a">早期液态胚乳·无菌</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="326" width="448" height="46" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="344" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">椰子是"种子+果实"合一：三个发芽孔只有一个真孔</text>
        <text x="260" y="363" textAnchor="middle" fontSize="11.5" fill="#a5761d">胚从这里突破——新苗靠"自带营养液"起家</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">椰子 · 会"航海"的种子（课外拓展）</text>
    </svg>
  );
}

function GuttationSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 清晨草叶与水珠 */}
      <g style={dim(active, 0)}>
        <path d="M110 300 Q104 200 128 120 Q142 84 172 68" fill="none" stroke="#3f8a3f" strokeWidth="7" strokeLinecap="round" />
        <path d="M110 300 Q124 210 108 150 Q98 116 76 104" fill="none" stroke="#4aa54a" strokeWidth="6.4" strokeLinecap="round" />
        <path d="M110 300 Q136 230 170 196 Q196 174 222 170" fill="none" stroke="#4aa54a" strokeWidth="6.4" strokeLinecap="round" />
        <circle cx="172" cy="62" r="8" fill="#a8d8f0" stroke="#5a9ac9" strokeWidth="2" />
        <circle cx="74" cy="98" r="6.5" fill="#a8d8f0" stroke="#5a9ac9" strokeWidth="2" />
        <circle cx="226" cy="164" r="7" fill="#a8d8f0" stroke="#5a9ac9" strokeWidth="2" />
        <circle cx="169" cy="59" r="2.2" fill="#fff" />
        <text x="196" y="58" fontSize="12.5" fill="#3a6a8a" fontWeight="700">叶尖·叶缘"挂珠"</text>
        <text x="52" y="76" fontSize="12" fill="#3a6a8a">清晨水稻苗床亮晶晶</text>
      </g>
      {/* 排水器放大与根压 */}
      <g style={dim(active, 1)}>
        <circle cx="300" cy="120" r="58" fill="#f2faea" stroke="#7aa87a" strokeWidth="2.6" />
        <circle cx="300" cy="112" r="9" fill="#a8d8f0" stroke="#5a9ac9" strokeWidth="2" />
        <path d="M300 121 l 0 18 M292 132 l 16 0" fill="none" stroke="#7aa87a" strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={286 + i * 10} cy={148} r="3.4" fill="#8ab88a" />
        ))}
        <text x="300" y="196" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">排水器放大：水孔+通水组织</text>
        <text x="300" y="214" textAnchor="middle" fontSize="12" fill="#2f6f2a">不关闭的"泄压阀"</text>
        <path d="M300 268 L300 232" fill="none" stroke="#4d7ea8" strokeWidth="3.4" markerEnd="url(#gutArrow)" />
        <text x="312" y="256" fontSize="12.5" fill="#3a6a8a" fontWeight="700">根压自下而上"顶"水</text>
        <rect x="236" y="276" width="130" height="34" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2" />
        <text x="301" y="298" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="700">根：持续吸水产生正压</text>
      </g>
      {/* 对比与考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="316" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">吐水靠根压（主动正压）· 蒸腾拉力才是白天水分上升主力——两条路径别混淆</text>
        <text x="260" y="337" textAnchor="middle" fontSize="12" fill="#a5761d">条件：土壤水足+空气湿度大+蒸腾弱（清晨·夜温高）——傍晚浇多水次日易见吐水</text>
        <text x="260" y="357" textAnchor="middle" fontSize="11" fill="#a5761d">壮苗指标：吐水旺盛=根系吸水能力强——育秧"早晨看露"判断苗情</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">吐水 · 根压的"现场证据"（课外拓展）</text>
      <defs>
        <marker id="gutArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#4d7ea8" />
        </marker>
      </defs>
    </svg>
  );
}

function RootNoduleSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 根系与根瘤 */}
      <g style={dim(active, 0)}>
        <path d="M96 70 L96 250" stroke="#8a6f52" strokeWidth="7" strokeLinecap="round" />
        <path d="M96 120 q -26 18 -38 52 M96 150 q 26 14 36 44 M96 196 q -20 12 -26 34" fill="none" stroke="#8a6f52" strokeWidth="4.4" strokeLinecap="round" />
        {[
          [70, 168], [124, 186], [88, 214], [76, 130]
        ].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="12" ry="9" fill="#e8b88a" stroke="#a5761d" strokeWidth="2" />
        ))}
        <text x="150" y="96" fontSize="12.5" fill="#8a5a2a" fontWeight="700">根瘤：根皮层被"撑"出的球形小屋</text>
        <text x="150" y="116" fontSize="12" fill="#8a5a2a">豆科植物（大豆·豌豆·苜蓿）特有</text>
        <path d="M84 258 q 8 16 24 20 l 0 -18 Z" fill="#d9c9a8" stroke="#8a6f52" strokeWidth="1.8" />
        <text x="60" y="292" fontSize="12" fill="#8a6f52">细胞放大镜往下看剖面</text>
      </g>
      {/* 根瘤剖面与固氮流程 */}
      <g style={dim(active, 1)}>
        <circle cx="252" cy="182" r="62" fill="#f2c9c9" stroke="#a5761d" strokeWidth="2.8" />
        <circle cx="252" cy="182" r="44" fill="#e89ab0" opacity="0.85" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const ang = (i * Math.PI) / 3.5;
          return <rect key={i} x={252 + Math.cos(ang) * 26 - 5} y={182 + Math.sin(ang) * 26 - 2} width="10" height="4" rx="2" fill="#8a4a5a" />;
        })}
        <text x="252" y="262" textAnchor="middle" fontSize="12.5" fill="#a53030" fontWeight="700">剖面粉色=豆血红蛋白（活瘤粉红·死瘤发绿）</text>
        <text x="150" y="152" fontSize="12.5" fill="#8a4a5a" fontWeight="700">类菌体：根瘤菌的"工作形态"</text>
        <text x="316" y="140" fontSize="12.5" fill="#5a7a9a" fontWeight="700">固氮流水线</text>
        <text x="316" y="162" fontSize="12" fill="#3a5a7a">N₂（空气）</text>
        <text x="316" y="184" fontSize="12" fill="#2f6f2a">→ 固氮酶（怕氧！）</text>
        <text x="316" y="206" fontSize="12" fill="#2f6f2a">→ NH₃ → 氨基酸 → 蛋白质</text>
        <text x="316" y="230" fontSize="12" fill="#8a671b">植物回礼：光合产物糖类+庇护所</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="318" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">互利共生的教科书案例：细菌供氮（NH₃）、植物供糖和"公寓"——谁也离不开谁</text>
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#a5761d">"种豆肥田"：豆科轮作·绿肥的原理——生物固氮约占全球固氮量的九成</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">豆血红蛋白是"分子保镖"：固氮酶怕氧，它一边运氧供能一边把游离氧压到最低</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">根瘤 · 豆科植物的"氮肥厂"（课外拓展）</text>
    </svg>
  );
}

function EtiolationSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 暗箱：黄化苗 */}
      <g style={dim(active, 0)}>
        <rect x="36" y="58" width="200" height="220" rx="12" fill="#3a3a30" stroke="#22221a" strokeWidth="2.4" />
        <text x="136" y="80" textAnchor="middle" fontSize="12.5" fill="#e8e0c0" fontWeight="700">避光培养：黄化苗（豆芽）</text>
        <path d="M136 258 Q130 200 142 160 Q150 128 128 108" fill="none" stroke="#e8e0c0" strokeWidth="7" strokeLinecap="round" />
        <path d="M128 108 q -14 -12 -4 -24 q 12 -6 16 8" fill="none" stroke="#e8e0c0" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M138 150 q 16 -6 22 6 q -12 8 -22 2" fill="#e8e0b0" stroke="#b0a860" strokeWidth="2" />
        <path d="M136 258 q -12 14 -24 16 M136 258 q 12 12 26 14" fill="none" stroke="#d0c8a0" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="136" cy="266" rx="16" ry="8" fill="#c9b88a" stroke="#8a7a4a" strokeWidth="2" />
        <text x="58" y="120" fontSize="12.5" fill="#e8e0c0" fontWeight="700">顶端弯钩：护住生长点破土</text>
        <text x="46" y="196" fontSize="12.5" fill="#e8e0c0" fontWeight="700">茎细长发软（徒长）</text>
        <text x="46" y="214" fontSize="12" fill="#c8c0a0">叶黄白·不展开</text>
      </g>
      {/* 见光：绿化苗 */}
      <g style={dim(active, 1)}>
        <rect x="284" y="58" width="200" height="220" rx="12" fill="#f2faea" stroke="#7aa87a" strokeWidth="2.4" />
        <circle cx="452" cy="84" r="15" fill="#f5d75a" stroke="#c9a52a" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const ang = (i * Math.PI) / 4;
          return <line key={i} x1={452 + Math.cos(ang) * 19} y1={84 + Math.sin(ang) * 19} x2={452 + Math.cos(ang) * 26} y2={84 + Math.sin(ang) * 26} stroke="#c9a52a" strokeWidth="2.4" strokeLinecap="round" />;
        })}
        <text x="384" y="112" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">移到光下 2~3 天</text>
        <path d="M384 258 Q388 210 380 180 Q376 156 384 132" fill="none" stroke="#3f8a3f" strokeWidth="10" strokeLinecap="round" />
        <path d="M384 160 q -26 -4 -34 -24 q 26 -8 34 10 Z" fill="#4aa54a" stroke="#1f6f1f" strokeWidth="2.2" />
        <path d="M384 140 q 26 -6 36 -24 q -28 -8 -36 12 Z" fill="#4aa54a" stroke="#1f6f1f" strokeWidth="2.2" />
        <path d="M384 258 q -18 16 -34 18 M384 258 q 18 14 36 16 M384 258 q -4 18 2 22" fill="none" stroke="#8a6f52" strokeWidth="3.2" strokeLinecap="round" />
        <ellipse cx="384" cy="266" rx="16" ry="8" fill="#c9b88a" stroke="#8a7a4a" strokeWidth="2" />
        <text x="316" y="196" fontSize="12.5" fill="#2f6f2a" fontWeight="700">茎变粗·叶展开转绿</text>
        <text x="316" y="214" fontSize="12" fill="#2f6f2a">根系更发达</text>
      </g>
      {/* 对比箭头与考点 */}
      <g style={dim(active, 2)}>
        <line x1="242" y1="168" x2="278" y2="168" stroke="#0e6f75" strokeWidth="3" markerEnd="url(#etArrow)" />
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">叶绿素的合成需要光——无光时叶片黄白（豆芽呈黄的真相），光照启动"光形态建成"</text>
        <text x="260" y="342" textAnchor="middle" fontSize="12" fill="#a5761d">发豆芽遮光=黄芽菜脆嫩；见光绿化后维生素更足但口感变"老"——你选哪种？</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">考点：环境因子（光）调控植物发育——与向光性、光周期现象同属"光信号"家族</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">黄化苗 · 光形态建成（课外拓展）</text>
      <defs>
        <marker id="etArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#0e6f75" />
        </marker>
      </defs>
    </svg>
  );
}

function PeanutSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 地上开花 */}
      <g style={dim(active, 0)}>
        <path d="M250 230 v -110" stroke="#5a9a3a" strokeWidth="7" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M250 ${200 - i * 40} q -30 -12 -50 -8 m 50 8 q 30 -12 50 -8`} fill="none" stroke="#7ab84a" strokeWidth="4" strokeLinecap="round" />
        ))}
        {[0, 1].map((i) => (
          <circle key={`f${i}`} cx={222 + i * 56} cy={132 - i * 10} r="8" fill="#e8c83a" stroke="#a58a2a" strokeWidth="1.8" />
        ))}
        <text x="330" y="110" fontSize="12.5" fill="#8a671b" fontWeight="700">黄色蝶形花：开在枝上</text>
        <text x="330" y="132" fontSize="12" fill="#8a671b">受精后子房柄伸长"扎"向地面</text>
      </g>
      {/* 地下结果 */}
      <g style={dim(active, 1)}>
        <path d="M40 260 h 440" stroke="#8a7a4a" strokeWidth="2.6" />
        <path d="M60 290 h 400 v 60 h -400 Z" fill="#c9a06a" stroke="#a5763a" strokeWidth="2.4" opacity="0.5" />
        {[0, 1].map((i) => (
          <g key={i}>
            <path d={`M${200 + i * 90} 236 q 10 24 -6 40 q -10 12 -22 8 m -14 -18 q -12 16 -4 30`} fill="none" stroke="#c9a05a" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx={196 + i * 110} cy={300} rx="26" ry="16" fill="#d8b878" stroke="#8a6a2a" strokeWidth="2.2" />
            <path d={`M${186 + i * 110} 298 q ${10 + i * 4} -2 22 2`} fill="none" stroke="#a58a3a" strokeWidth="1.8" />
          </g>
        ))}
        <text x="52" y="76" fontSize="12.5" fill="#8a5a3a" fontWeight="700">地下结荚（"入土结荚"）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="290" width="440" height="76" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="314" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">受精子房柄"向地"伸长钻入土中——黑暗环境是结荚的必要条件</text>
        <text x="260" y="338" textAnchor="middle" fontSize="11.5" fill="#a5761d">花生油来自子叶（储存脂肪）；花生也是"地上开花、地下结果"的独特作物</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">注意：花生是"荚果"——与草莓聚合果、向日葵瘦果"果实类型"对比</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">花生 · 地上开花地下结果（课外拓展）</text>
    </svg>
  );
}

function HydrotropismSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 湿度梯度箱 */}
      <g style={dim(active, 0)}>
        <rect x="70" y="70" width="380" height="200" rx="12" fill="#f4ecdc" stroke="#b5a582" strokeWidth="2.8" />
        <rect x="70" y="70" width="120" height="200" rx="12" fill="#b8d8b0" opacity="0.35" />
        <rect x="330" y="70" width="120" height="200" rx="12" fill="#e8d8a0" opacity="0.35" />
        <text x="130" y="58" textAnchor="middle" fontSize="11" fill="#3f7f3a" fontWeight="700">潮湿侧</text>
        <text x="390" y="58" textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="700">干燥侧</text>
      </g>
      {/* 根 */}
      <g style={dim(active, 1)}>
        <path d="M230 96 q -6 60 -80 96 q -50 26 -70 60" fill="none" stroke="#f4f0d8" strokeWidth="6" strokeLinecap="round" />
        <path d="M254 100 q 40 60 100 90" fill="none" stroke="#f4f0d8" strokeWidth="6" strokeLinecap="round" />
        <path d="M232 100 q 4 60 22 100" fill="none" stroke="#f4f0d8" strokeWidth="6" strokeLinecap="round" />
        <text x="96" y="300" fontSize="12" fill="#3f7f3a" fontWeight="700">根：向着"水多"的一侧弯曲生长</text>
      </g>
      {/* 机制 */}
      <g style={dim(active, 2)}>
        <rect x="274" y="230" width="200" height="90" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="374" y="254" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">为什么根"找水"？</text>
        <text x="374" y="278" textAnchor="middle" fontSize="10.5" fill="#a5761d">水分影响生长素分布</text>
        <text x="374" y="300" textAnchor="middle" fontSize="10.5" fill="#a5761d">向水侧生长受抑制→根弯向水</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">向光性、向重力性、向水性——植物通过"方向性生长"适应环境</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#3f7f3a">滴灌技术沿着根系"精准供水"——应用向水性的农业智慧</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">向水性 · 根系"找水"的智慧（课内拓展）</text>
    </svg>
  );
}

function EssentialOilsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 薰衣草与薄荷 */}
      <g style={dim(active, 0)}>
        <path d="M160 300 q -6 -80 0 -140" fill="none" stroke="#3f7f3a" strokeWidth="6" strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${140 - i * 3} ${180 - i * 34} q 20 -10 40 -2`} fill="none" stroke="#8a67c9" strokeWidth="5" strokeLinecap="round" />
        ))}
        <path d="M360 300 q -4 -100 20 -160" fill="none" stroke="#3f7f3a" strokeWidth="6" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <ellipse key={`m${i}`} cx={340 + (i % 2) * 26} cy={160 + i * 26} rx="20" ry="12" fill="#5a9a4a" stroke="#2f6f2a" strokeWidth="2" transform={`rotate(${i * 30 - 20} ${340 + (i % 2) * 26} ${160 + i * 26})`} />
        ))}
        <text x="60" y="130" fontSize="12.5" fill="#8a67c9" fontWeight="700">薰衣草</text>
        <text x="330" y="130" fontSize="12.5" fill="#3f7f3a" fontWeight="700">薄荷</text>
      </g>
      {/* 精油功能 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="206" width="440" height="60" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="230" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">精油 = 植物的"化学武器"：驱赶食草昆虫 · 抑制细菌真菌（保护伤口）</text>
        <text x="260" y="254" textAnchor="middle" fontSize="11" fill="#a5761d">次生代谢产物（非生长必需，但提高生存竞争力）——与橡胶·咖啡因同族</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="76" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">人类"借"精油：香水·食品调香·芳香疗法·天然驱虫剂</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">提取方法：蒸馏（最常用）·冷压（柑橘皮）·溶剂萃取——含量极低所以"昂贵"</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">薰衣草精油含芳樟醇（助眠舒缓）·薄荷脑（清凉感来自激活冷觉受体）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">植物精油 · 次生代谢的"香气武器"（课外拓展）</text>
    </svg>
  );
}

function RiceSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 稻田 */}
      <g style={dim(active, 0)}>
        <path d="M40 250 q 220 -30 440 0 l 0 60 l -440 0 Z" fill="#c9e0b0" stroke="#8a9a6a" strokeWidth="2.4" />
        <path d="M60 262 q 200 -18 400 0" fill="none" stroke="#a8c890" strokeWidth="2" opacity="0.8" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <path d={`M${80 + i * 62} 262 v -60`} stroke="#5a9a3a" strokeWidth="5" strokeLinecap="round" />
            <path d={`M${80 + i * 62} 202 q 14 -12 26 -8 m -26 8 q -14 -12 -26 -8`} fill="none" stroke="#8ab84a" strokeWidth="2.6" strokeLinecap="round" />
          </g>
        ))}
        <text x="260" y="330" textAnchor="middle" fontSize="12.5" fill="#4a7a2a" fontWeight="700">水稻：半水生禾本科·世界约一半人口的主粮</text>
      </g>
      {/* 适应水田 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="60" width="200" height="110" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="146" y="84" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">耐淹的"通气系统"</text>
        <text x="146" y="108" textAnchor="middle" fontSize="10.5" fill="#37585f">茎叶的通气组织为根部送氧</text>
        <text x="146" y="130" textAnchor="middle" fontSize="10.5" fill="#37585f">根部细胞有乙醇酸氧化途径</text>
        <text x="146" y="152" textAnchor="middle" fontSize="10" fill="#59767c">淹水缺氧照样生长（结构适应）</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="274" y="60" width="200" height="110" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="374" y="84" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">科学突破</text>
        <text x="374" y="108" textAnchor="middle" fontSize="10.5" fill="#a5761d">杂交水稻（袁隆平）大幅增产</text>
        <text x="374" y="130" textAnchor="middle" fontSize="10.5" fill="#a5761d">"海水稻"耐盐碱——盐碱地变粮田</text>
        <text x="374" y="154" textAnchor="middle" fontSize="10" fill="#59767c">粮食安全 = 国家安全的基础</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">水稻 · 世界主粮（课外拓展）</text>
    </svg>
  );
}

function AloeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 芦荟 */}
      <g style={dim(active, 0)}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const ang = -Math.PI / 2 + (i - 2.5) * 0.42;
          return <path key={i} d={`M260 300 Q ${260 + Math.cos(ang) * 55} ${210 + Math.sin(ang) * 55} ${260 + Math.cos(ang) * 105} ${195 + Math.sin(ang) * 75}`} fill="none" stroke="#5a9a4a" strokeWidth={10 - Math.abs(i - 2.5) * 1.5} strokeLinecap="round" />;
        })}
        {[0, 1, 2].map((i) => (
          <path key={`t${i}`} d={`M${180 + i * 45} ${240 - i * 20} q 8 -6 18 -2`} fill="none" stroke="#3f7f3a" strokeWidth="2" strokeLinecap="round" />
        ))}
        <text x="350" y="130" fontSize="12.5" fill="#3f7f3a" fontWeight="700">肉质叶储水（CAM 代谢）</text>
        <text x="380" y="150" fontSize="12" fill="#3f7f3a">叶缘锯齿防动物啃食</text>
      </g>
      {/* 凝胶 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="120" width="180" height="90" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="136" y="144" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">叶内凝胶：晒后修复</text>
        <text x="136" y="168" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">多糖+水分——保湿舒缓</text>
        <text x="136" y="190" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">"药用植物"代表的活体实例</text>
      </g>
      {/* CAM 与旱生 */}
      <g style={dim(active, 2)}>
        <rect x="274" y="230" width="200" height="100" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="374" y="254" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">旱生结构三件套</text>
        <text x="374" y="278" textAnchor="middle" fontSize="10.5" fill="#a5761d">肉质叶储水 · 气孔夜间开放</text>
        <text x="374" y="300" textAnchor="middle" fontSize="10.5" fill="#a5761d">蜡质角质层减少蒸腾</text>
        <text x="374" y="322" textAnchor="middle" fontSize="10" fill="#799398">与王莲（水生）的"反向适应"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">芦荟 · 旱生植物与药用（课外拓展）</text>
    </svg>
  );
}

function WelwitschiaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 沙漠 */}
      <g style={dim(active, 0)}>
        <path d="M40 260 q 200 -30 440 -6 l 0 80 l -440 0 Z" fill="#e8c9a0" stroke="#c9a05a" strokeWidth="2.4" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${80 + i * 110} 268 q 30 -12 60 -4`} fill="none" stroke="#c9a06a" strokeWidth="2" opacity="0.8" />
        ))}
      </g>
      {/* 百岁兰 */}
      <g style={dim(active, 1)}>
        <path d="M230 268 q -6 -50 20 -70" fill="none" stroke="#8a6a3a" strokeWidth="16" strokeLinecap="round" />
        <path d="M250 198 q 60 -20 120 6 q -40 24 -104 18" fill="none" stroke="#5a9a4a" strokeWidth="8" strokeLinecap="round" />
        <path d="M232 198 q -60 -20 -118 8 q 44 22 108 14" fill="none" stroke="#5a9a4a" strokeWidth="8" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${130 + i * 40} 206 l 14 -6 m -14 14 l 16 -4`} stroke="#3f7f3a" strokeWidth="2" strokeLinecap="round" />
        ))}
        <text x="330" y="170" fontSize="12.5" fill="#4a6a2a" fontWeight="700">仅两片叶子·永不脱落</text>
        <text x="330" y="190" fontSize="12" fill="#4a6a2a">基部持续生长·寿命上千年</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">纳米布沙漠的"雾水收集器"：叶面吸收来自大西洋的晨雾</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">裸子植物孑遗（与银杏同辈）——"演化减缓的活化石"</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">两片叶被风吹裂成多条"飘带"——远看像许多叶，实为一片对生叶的裂片</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">百岁兰 · 沙漠"活化石"（课外拓展）</text>
    </svg>
  );
}

function LigninSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 树木对比 */}
      <g style={dim(active, 0)}>
        <path d="M130 300 v -150" stroke="#8a6a3a" strokeWidth="10" strokeLinecap="round" />
        {[0, 1].map((i) => (
          <path key={i} d={`M130 ${200 - i * 50} q -26 -16 -40 -34 m 40 34 q 26 -16 40 -34`} fill="none" stroke="#5a9a3a" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="60" y="330" textAnchor="middle" fontSize="11.5" fill="#8a671b" fontWeight="700">草本：木质素少·柔软</text>
        <path d="M400 310 q 6 -140 -20 -230" fill="none" stroke="#6a4a2a" strokeWidth="26" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={`b${i}`} d={`M${396 - i * 6} ${210 - i * 50} q -34 -20 -50 -40 m 50 40 q 34 -20 50 -40`} fill="none" stroke="#4a8a3a" strokeWidth="5" strokeLinecap="round" />
        ))}
        <text x="322" y="330" textAnchor="middle" fontSize="11.5" fill="#6a4a2a" fontWeight="700">木本：木质素多·坚硬高大</text>
      </g>
      {/* 木质素功能 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="60" width="200" height="110" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="146" y="84" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">木质素："钢筋"</text>
        <text x="146" y="108" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">填充细胞壁·赋予木质部刚性</text>
        <text x="146" y="130" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">让 100 米高的红杉"站得稳"</text>
        <text x="146" y="152" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">抗菌防腐——千年古木不腐的秘密</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="274" y="60" width="200" height="110" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="374" y="84" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">演化大事件</text>
        <text x="374" y="108" textAnchor="middle" fontSize="10.5" fill="#a5761d">木质素出现 → 植物才能"长高"</text>
        <text x="374" y="130" textAnchor="middle" fontSize="10.5" fill="#a5761d">石炭纪巨型蕨类森林（煤的前身）</text>
        <text x="374" y="152" textAnchor="middle" fontSize="10.5" fill="#59767c">早期真菌"学会"分解木质素前的煤</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="188" width="440" height="60" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="212" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">与树皮/年轮互参：木质素在细胞壁中"加固"——造纸要"脱去"木质素</text>
        <text x="260" y="234" textAnchor="middle" fontSize="11" fill="#537078">木质素难分解 → 部分远古植物残体未被分解 → 形成煤层</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">木质素 · 植物的"钢筋"（课外拓展）</text>
    </svg>
  );
}

function TumbleweedSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 地面 */}
      <g style={dim(active, 0)}>
        <path d="M40 300 h 440" stroke="#c9b88a" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={130 + i * 130} cy={314} rx="26" ry="5" fill="#d8c9a0" opacity="0.7" />
        ))}
      </g>
      {/* 滚动的风滚草 */}
      <g style={dim(active, 1)}>
        <circle cx="300" cy="180" r="90" fill="none" stroke="#a58a5a" strokeWidth="2.6" strokeDasharray="8 6" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const ang = (i * 2 * Math.PI) / 8;
          return <path key={i} d={`M300 180 Q ${300 + Math.cos(ang) * 40} ${180 + Math.sin(ang) * 40} ${300 + Math.cos(ang) * 82} ${180 + Math.sin(ang) * 82}`} fill="none" stroke="#a58a5a" strokeWidth="3" strokeLinecap="round" />;
        })}
        <path d="M210 180 Q 300 160 390 180" fill="none" stroke="#c9a86a" strokeWidth="2.4" />
        <text x="340" y="80" fontSize="12.5" fill="#8a6a3a" fontWeight="700">整株从根部"断脐"</text>
        <text x="340" y="100" fontSize="12" fill="#8a6a3a">随风滚动撒播种子</text>
      </g>
      {/* 策略 */}
      <g style={dim(active, 2)}>
        <rect x="46" y="244" width="210" height="90" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="151" y="268" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">"移动播种机"</text>
        <text x="151" y="292" textAnchor="middle" fontSize="10.5" fill="#a5761d">一个植株滚动可撒 25 万粒种子</text>
        <text x="151" y="314" textAnchor="middle" fontSize="10.5" fill="#a5761d">干旱平原无遮挡——风是"快递员"</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="280" y="244" width="196" height="90" rx="10" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.2" />
        <text x="378" y="268" textAnchor="middle" fontSize="12" fill="#8a3a2a" fontWeight="800">入侵警示</text>
        <text x="378" y="292" textAnchor="middle" fontSize="10.5" fill="#a5533c">风滚草（俄罗斯刺沙蓬）入侵北美</text>
        <text x="378" y="314" textAnchor="middle" fontSize="10.5" fill="#a5533c">堵塞公路·加剧风蚀·挤占农田</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">风滚草 · 会"走路"的植物（课外拓展）</text>
    </svg>
  );
}

function FigSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 无花果树与果 */}
      <g style={dim(active, 0)}>
        <path d="M180 300 q -30 -100 20 -160" fill="none" stroke="#8a6a3a" strokeWidth="14" strokeLinecap="round" />
        <path d="M320 300 q 30 -100 -20 -160" fill="none" stroke="#8a6a3a" strokeWidth="14" strokeLinecap="round" />
        <path d="M180 140 q 80 -40 120 0 q -60 20 -120 0" fill="none" stroke="#4a8a3a" strokeWidth="16" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={230 + i * 32} cy={210 - i * 6} rx="15" ry="20" fill="#7a9a5a" stroke="#4a6a2a" strokeWidth="2.2" />
        ))}
        <text x="336" y="216" fontSize="12.5" fill="#4a6a2a" fontWeight="700">隐头花序：花"藏"在果内</text>
        <text x="336" y="236" fontSize="12" fill="#4a6a2a">切开才能看见内部的"花海"</text>
      </g>
      {/* 共生传粉 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="120" width="180" height="80" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="136" y="144" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">榕小蜂钻入"产房"</text>
        <text x="136" y="168" textAnchor="middle" fontSize="10.5" fill="#a5761d">在花内产卵·同时为花授粉</text>
        <text x="136" y="190" textAnchor="middle" fontSize="10.5" fill="#a5761d">一对一的"古老契约"（数千万年）</text>
        <path d="M226 160 q 30 30 60 10" fill="none" stroke="#8a671b" strokeWidth="1.4" strokeDasharray="3 3" />
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">"无花果"其实有花——只是花序轴内凹、花藏在"果"里（隐头花序）</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">我们吃的主要是花托膨大成的"果肉"，内部细粒才是真正的果实（瘦果）</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">与草莓（聚合果）对比：植物学"果实"的定义远比生活直觉丰富</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">无花果 · 隐头花序的共生奇迹（课外拓展）</text>
    </svg>
  );
}

function PlantSexSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 两性花 */}
      <g style={dim(active, 0)}>
        {[0, 1, 2, 3, 4].map((i) => {
          const ang = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          return <ellipse key={i} cx={140 + Math.cos(ang) * 34} cy={130 + Math.sin(ang) * 34} rx="22" ry="14" fill="#f0b8c8" stroke="#c96a8a" strokeWidth="2.2" transform={`rotate(${(i * 72) - 90} ${140 + Math.cos(ang) * 34} ${130 + Math.sin(ang) * 34})`} />;
        })}
        <circle cx="140" cy="130" r="16" fill="#e8c83a" stroke="#a58a2a" strokeWidth="2" />
        <text x="140" y="192" textAnchor="middle" fontSize="12.5" fill="#8a3a5a" fontWeight="700">两性花（桃·百合）</text>
        <text x="140" y="212" textAnchor="middle" fontSize="11.5" fill="#c96a8a">雌蕊雄蕊同花</text>
      </g>
      {/* 单性花 */}
      <g style={dim(active, 1)}>
        <text x="380" y="90" textAnchor="middle" fontSize="12.5" fill="#3f7f3a" fontWeight="700">单性花（玉米·黄瓜）</text>
        <ellipse cx="330" cy="130" rx="24" ry="14" fill="#c9e0a0" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="330" y="134" textAnchor="middle" fontSize="10" fill="#3f7f3a" fontWeight="600">雌花</text>
        <path d="M420 130 q 24 -10 44 -4" fill="none" stroke="#8a671b" strokeWidth="4" strokeLinecap="round" />
        <text x="452" y="128" fontSize="9" fill="#8a671b" fontWeight="600">雄花</text>
        <text x="380" y="170" textAnchor="middle" fontSize="11.5" fill="#8a671b">雌花雄花同株或异株</text>
      </g>
      {/* 雌雄异株 */}
      <g style={dim(active, 2)}>
        <circle cx="380" cy="240" r="8" fill="#e88a8a" stroke="#a53030" strokeWidth="1.8" />
        <text x="46" y="245" fontSize="11.5" fill="#a53030" fontWeight="700">雌雄异株（银杏·杨树）</text>
        <text x="46" y="264" fontSize="10.5" fill="#8a5a3a">雌雄花朵分长在不同植株上</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="296" width="440" height="72" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">性别系统与传粉策略"配套"：单性花强制异花传粉·提高后代变异性</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">玉米顶生雄穗·侧生雌穗——授粉期遇高温干旱会"秃顶减产"</text>
        <text x="260" y="362" textAnchor="middle" fontSize="11" fill="#a5761d">易混点：两性花≠自花传粉（桃花是两性花但多为异花传粉）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">花的性别系统 · 植物的"婚配制度"（课内拓展）</text>
    </svg>
  );
}

function OrchidSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 兰花 */}
      <g style={dim(active, 0)}>
        {[0, 1, 2].map((i) => (
          <ellipse key={`s${i}`} cx={230 + i * 40} cy={140 - (i === 1 ? 16 : 0)} rx="22" ry="13" fill="#e8c8e8" stroke="#8a4a8a" strokeWidth="2.2" transform={`rotate(${(i - 1) * 40} ${230 + i * 40} ${140 - (i === 1 ? 16 : 0)})`} />
        ))}
        {[0, 1, 2].map((i) => (
          <ellipse key={`p${i}`} cx={228 + i * 40} cy={172 - (i === 1 ? 14 : 0)} rx="20" ry="12" fill="#c98ad8" stroke="#7a3a8a" strokeWidth="2.2" transform={`rotate(${(i - 1) * 30} ${228 + i * 40} ${172 - (i === 1 ? 14 : 0)})`} />
        ))}
        <path d="M270 172 q 30 8 44 34 q -34 4 -48 -22 Z" fill="#f0c960" stroke="#a58a2a" strokeWidth="2.2" />
        <text x="330" y="120" fontSize="12.5" fill="#7a3a8a" fontWeight="700">唇瓣 = 昆虫的"停机坪"</text>
        <text x="330" y="140" fontSize="12" fill="#7a3a8a">合蕊柱：雄蕊雌蕊合体</text>
      </g>
      {/* 拟态骗术 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="230" width="200" height="100" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="146" y="254" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">兰花"骗术"大赏</text>
        <text x="146" y="278" textAnchor="middle" fontSize="10.5" fill="#a5761d">性拟态：蜂兰模仿雌蜂外形气味</text>
        <text x="146" y="300" textAnchor="middle" fontSize="10.5" fill="#a5761d">食源性欺骗：像花蜜却"空手而归"</text>
        <text x="146" y="322" textAnchor="middle" fontSize="10.5" fill="#a5761d">昆虫被"骗"却帮它完成了传粉</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="274" y="230" width="200" height="100" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="374" y="254" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">兰科之最</text>
        <text x="374" y="278" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">约 2.5 万种·开花植物第二大科</text>
        <text x="374" y="300" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">种子微小如尘（一个果数十万粒）</text>
        <text x="374" y="322" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">种子萌发需共生真菌"喂"养分</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">兰花 · 共演化与拟态大师（课外拓展）</text>
    </svg>
  );
}

function StrawberrySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 草莓 */}
      <g style={dim(active, 0)}>
        <path d="M170 150 q 10 -60 90 -60 q 80 0 90 60 q 8 66 -90 122 q -98 -56 -90 -122 Z" fill="#e84a4a" stroke="#a52020" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const ang = i * 0.85;
          const r = 34 + (i % 3) * 16;
          return <ellipse key={i} cx={260 + Math.cos(ang) * r * 0.9} cy={160 + Math.sin(ang) * r} rx="4.5" ry="6" fill="#f4e0a0" stroke="#8a671b" strokeWidth="1.2" transform={`rotate(${ang * 30} ${260 + Math.cos(ang) * r * 0.9} ${160 + Math.sin(ang) * r})`} />;
        })}
        <path d="M232 92 q 28 -20 56 0 q -28 14 -56 0 Z" fill="#5a9a3a" stroke="#2f6f2a" strokeWidth="2.2" />
        <text x="380" y="150" fontSize="12.5" fill="#8a2a2a" fontWeight="700">红色"果肉"= 膨大的花托</text>
        <text x="340" y="170" fontSize="12.5" fill="#8a2a2a">表面"籽"=真正的果实</text>
      </g>
      {/* 结构揭秘 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="252" width="210" height="86" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="151" y="276" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">草莓是"聚合果"</text>
        <text x="151" y="300" textAnchor="middle" fontSize="11" fill="#a5761d">一朵花里许多分离的雌蕊</text>
        <text x="151" y="322" textAnchor="middle" fontSize="11" fill="#a5761d">各自发育成小瘦果·花托变"果肉"</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="286" y="252" width="190" height="86" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="381" y="276" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">易混辨析</text>
        <text x="381" y="300" textAnchor="middle" fontSize="10.5" fill="#37585f">草莓"籽"= 果实（瘦果）</text>
        <text x="381" y="322" textAnchor="middle" fontSize="10.5" fill="#37585f">我们吃的"果肉" = 花托</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="346" width="440" height="24" rx="8" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="260" y="363" textAnchor="middle" fontSize="11.5" fill="#2f6f2a" fontWeight="700">无性繁殖：匍匐茎的"走茎"每隔几节长出新株——草莓的"克隆"扩散</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">草莓 · 聚合果的"身份之谜"（课外拓展）</text>
    </svg>
  );
}

function CacaoSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 树与豆荚 */}
      <g style={dim(active, 0)}>
        <path d="M250 320 v -180" stroke="#6a8a3a" strokeWidth="14" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M250 ${200 - i * 50} q -44 -18 -70 -44 m 70 44 q 44 -18 70 -44`} fill="none" stroke="#4a8a3a" strokeWidth="5" strokeLinecap="round" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={`p${i}`} cx={160 + (i % 2) * 190} cy={160 + Math.floor(i / 2) * 70} rx="16" ry="34" fill="#e8a03a" stroke="#8a5a1d" strokeWidth="2.2" />
        ))}
        <text x="60" y="110" fontSize="12.5" fill="#6a8a2a" fontWeight="700">"老茎生花"：花果直接长在树干上</text>
      </g>
      {/* 发酵 */}
      <g style={dim(active, 1)}>
        <rect x="330" y="200" width="160" height="110" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="410" y="226" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">风味来自发酵</text>
        <text x="410" y="250" textAnchor="middle" fontSize="10.5" fill="#a5761d">酵母+乳酸菌+醋酸菌接力</text>
        <text x="410" y="272" textAnchor="middle" fontSize="10.5" fill="#a5761d">豆内"死亡"才启动风味反应</text>
        <text x="410" y="294" textAnchor="middle" fontSize="10" fill="#799398">5~7 天翻堆·再烘焙研磨</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="280" height="80" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="180" y="314" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">发酵食品家族的"甜品担当"</text>
        <text x="180" y="338" textAnchor="middle" fontSize="11" fill="#3f7f3a">可可豆的苦涩在微生物发酵中</text>
        <text x="180" y="358" textAnchor="middle" fontSize="11" fill="#3f7f3a">转化为数百种香气分子——"巧克力前传"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">可可 · 发酵与风味（课外拓展）</text>
    </svg>
  );
}

function LotusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 荷叶 */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="190" rx="120" ry="86" fill="#4a9a3a" stroke="#2f6f2a" strokeWidth="3" />
        <ellipse cx="250" cy="200" rx="14" ry="6" fill="#3a7a2a" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path key={i} d={`M250 190 L ${130 + i * 34} ${168 + (i % 2) * 34}`} stroke="#3a7a2a" strokeWidth="2" opacity="0.8" />
        ))}
        {[0, 1, 2].map((i) => (
          <ellipse key={`d${i}`} cx={180 + i * 60} cy={168 + (i % 2) * 20} rx="9" ry="5" fill="#a8d8e8" stroke="#4d7ea8" strokeWidth="1.4" />
        ))}
        <text x="380" y="120" fontSize="12.5" fill="#2f6f2a" fontWeight="700">水珠在叶面滚成"水银珠"</text>
        <text x="366" y="140" fontSize="12" fill="#2f6f2a">滚走灰尘（自洁）</text>
      </g>
      {/* 荷花 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4].map((i) => {
          const ang = -Math.PI / 2 + (i - 2) * 0.5;
          return <ellipse key={i} cx={400 + Math.cos(ang) * 22} cy={230 + Math.sin(ang) * 22} rx="14" ry="24" fill="#f0b8c8" stroke="#c96a8a" strokeWidth="2" transform={`rotate(${(i - 2) * 26} 400 230)`} />;
        })}
        <circle cx="400" cy="230" r="10" fill="#e8c83a" stroke="#a58a2a" strokeWidth="1.8" />
        <text x="300" y="278" fontSize="12" fill="#c96a8a" fontWeight="600">花与叶都高出水面</text>
      </g>
      {/* 莲蓬莲藕 */}
      <g style={dim(active, 2)}>
        <rect x="46" y="60" width="170" height="80" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="131" y="84" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">"出淤泥而不染"</text>
        <text x="131" y="106" textAnchor="middle" fontSize="10.5" fill="#a5761d">微观：叶面乳突+蜡质晶体</text>
        <text x="131" y="124" textAnchor="middle" fontSize="10.5" fill="#a5761d">水珠滚落带走灰尘——自洁效应</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">莲藕是根状茎（节上生根）·荷叶效应催生自洁玻璃·防污涂料等仿生产品</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#3f7f3a">结构决定性质：超疏水靠的是"微观形貌+低表面能物质"的组合</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">荷花 · 自洁效应与仿生学（课外拓展）</text>
    </svg>
  );
}

function MagnoliaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 花 */}
      <g style={dim(active, 0)}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const ang = -Math.PI / 2 + (i - 2.5) * 0.55;
          return <ellipse key={i} cx={260 + Math.cos(ang) * 30} cy={150 + Math.sin(ang) * 30} rx="26" ry="44" fill="#f0d8e8" stroke="#c98a8a" strokeWidth="2.2" transform={`rotate(${(i - 2.5) * 32} 260 150)`} />;
        })}
        <ellipse cx="260" cy="150" rx="18" ry="34" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="330" y="100" fontSize="12.5" fill="#8a3a5a" fontWeight="700">花被未分化（无萼瓣之分）</text>
        <text x="330" y="120" fontSize="12" fill="#8a3a5a">——被子植物的"原始特征"</text>
      </g>
      {/* 树 */}
      <g style={dim(active, 1)}>
        <path d="M250 250 v 90" stroke="#8a6a3a" strokeWidth="18" strokeLinecap="round" />
        <path d="M250 250 q -30 -40 -20 -80 m 20 80 q 30 -40 20 -80" fill="none" stroke="#8a6a3a" strokeWidth="10" strokeLinecap="round" />
        <text x="60" y="250" fontSize="12.5" fill="#6a5a2a" fontWeight="700">木兰科：现存最古老的被子植物之一</text>
        <text x="60" y="270" fontSize="12" fill="#6a5a2a">白垩纪就开花——比蜜蜂出现更早</text>
      </g>
      {/* 甲虫传粉 */}
      <g style={dim(active, 2)}>
        <rect x="300" y="180" width="180" height="76" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="390" y="204" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">甲虫传粉的"活化石"</text>
        <text x="390" y="226" textAnchor="middle" fontSize="10.5" fill="#a5761d">花大而"结实"（耐甲虫爬踩）</text>
        <text x="390" y="246" textAnchor="middle" fontSize="10.5" fill="#a5761d">那时还没有蜜蜂与蝴蝶</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="288" width="440" height="76" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">"先花后叶"：早春抢在展叶前开花——利用落叶期阳光·避免叶片遮挡传粉者视线</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">与孑遗植物银杏呼应：木兰是被子植物起源研究的"活化石"</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">考点：花被未分化·花药长·心皮多数着生——木兰科保留多个原始特征</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">木兰 · 被子植物的"古老贵族"（课外拓展）</text>
    </svg>
  );
}

function PollinatorDeclineSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 蜜蜂与花 */}
      <g style={dim(active, 0)}>
        <path d="M120 230 q 60 -60 150 -50" fill="none" stroke="#3f7f3a" strokeWidth="8" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={200 + i * 60} cy={160 + i * 12} rx="28" ry="16" fill="#f0a0c0" stroke="#c96a8a" strokeWidth="2.2" transform={`rotate(${i * 12} ${200 + i * 60} ${160 + i * 12})`} />
        ))}
        <ellipse cx="230" cy="150" rx="12" ry="8" fill="#e8c83a" stroke="#8a671b" strokeWidth="1.8" transform="rotate(-20 230 150)" />
        {[0, 1].map((i) => (
          <path key={`w${i}`} d={`M${226 + i * 8} 142 q 6 -8 14 -6`} fill="none" stroke="#d8d8f0" strokeWidth="2" />
        ))}
        <text x="352" y="150" fontSize="12.5" fill="#8a671b" fontWeight="700">全球约 75% 的农作物</text>
        <text x="352" y="170" fontSize="12" fill="#8a671b">在不同程度上依赖动物传粉</text>
      </g>
      {/* 威胁因素 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="196" width="130" height="96" rx="10" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.2" />
        <text x="111" y="220" textAnchor="middle" fontSize="11.5" fill="#8a3a2a" fontWeight="800">危机三重奏</text>
        <text x="111" y="242" textAnchor="middle" fontSize="10.5" fill="#a5533c">农药（新烟碱类）</text>
        <text x="111" y="262" textAnchor="middle" fontSize="10.5" fill="#a5533c">栖息地破碎化</text>
        <text x="111" y="282" textAnchor="middle" fontSize="10.5" fill="#a5533c">气候变化错峰</text>
      </g>
      {/* 保护 */}
      <g style={dim(active, 2)}>
        <rect x="196" y="196" width="130" height="96" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="261" y="220" textAnchor="middle" fontSize="11.5" fill="#2f6f2a" fontWeight="800">我们能做到</text>
        <text x="261" y="242" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">种植多样蜜源植物</text>
        <text x="261" y="262" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">减少花园农药使用</text>
        <text x="261" y="282" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">支持生态农业</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="346" y="196" width="130" height="96" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="411" y="220" textAnchor="middle" fontSize="11.5" fill="#8a671b" fontWeight="800">没有免费午餐</text>
        <text x="411" y="242" textAnchor="middle" fontSize="10.5" fill="#a5761d">全球 1/3 粮食作物</text>
        <text x="411" y="262" textAnchor="middle" fontSize="10.5" fill="#a5761d">依赖传粉者</text>
        <text x="411" y="282" textAnchor="middle" fontSize="10.5" fill="#a5761d">经济价值数千万亿</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">传粉者危机 · 保护生物学（课外拓展）</text>
    </svg>
  );
}

function AutumnLeavesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 三片叶 */}
      <g style={dim(active, 0)}>
        <path d="M90 150 q -40 -50 10 -80 q 50 30 10 80 q -10 14 -20 0 Z" fill="#4a9a3a" stroke="#2f6f2a" strokeWidth="2.4" />
        <path d="M96 74 v 76" stroke="#2f6f2a" strokeWidth="2" />
        <text x="52" y="90" fontSize="12.5" fill="#2f6f2a" fontWeight="700">夏天：叶绿素当家（绿）</text>
        <path d="M230 150 q -40 -50 10 -80 q 50 30 10 80 q -10 14 -20 0 Z" fill="#e8a03a" stroke="#a5761d" strokeWidth="2.4" />
        <path d="M236 74 v 76" stroke="#a5761d" strokeWidth="2" />
        <text x="192" y="90" fontSize="12.5" fill="#a5761d" fontWeight="700">秋天：叶绿素分解</text>
        <path d="M370 150 q -40 -50 10 -80 q 50 30 10 80 q -10 14 -20 0 Z" fill="#c94a4a" stroke="#8a2020" strokeWidth="2.4" />
        <path d="M376 74 v 76" stroke="#8a2020" strokeWidth="2" />
        <text x="330" y="90" fontSize="12.5" fill="#8a2020" fontWeight="700">深秋：花青素登场（红）</text>
      </g>
      {/* 机制 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="240" width="210" height="86" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="151" y="264" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">叶绿素"怕冷又怕光"</text>
        <text x="151" y="288" textAnchor="middle" fontSize="11" fill="#37585f">低温+强光加速其分解</text>
        <text x="151" y="310" textAnchor="middle" fontSize="11" fill="#37585f">原本被"绿色"盖住的黄橙色素显现</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="276" y="240" width="204" height="86" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="378" y="264" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">红色从哪来？</text>
        <text x="378" y="288" textAnchor="middle" fontSize="10.5" fill="#a5761d">糖分在叶中合成花青素（新合成）</text>
        <text x="378" y="310" textAnchor="middle" fontSize="10.5" fill="#a5761d">昼夜温差大 → 糖积累多 → 更红</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="334" width="440" height="34" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="356" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">落叶前养分被"回收"运回枝干——落叶不是死亡，而是资源回收与越冬策略</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">秋叶 · 色素更替的"谢幕演出"（课内拓展）</text>
    </svg>
  );
}

function GiantWaterLilySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 水面 */}
      <g style={dim(active, 0)}>
        <rect x="36" y="46" width="448" height="240" rx="14" fill="#8ab4c9" stroke="#4d7ea8" strokeWidth="2.4" opacity="0.55" />
        <path d="M60 90 q 40 -10 80 0 m 200 180 q 50 -12 90 0" fill="none" stroke="#b5d8e8" strokeWidth="2.4" />
        <text x="60" y="72" fontSize="11.5" fill="#2c5a84" fontWeight="700">亚马孙河</text>
      </g>
      {/* 巨叶 */}
      <g style={dim(active, 1)}>
        <ellipse cx="240" cy="150" rx="150" ry="60" fill="#5a9a4a" stroke="#2f6f2a" strokeWidth="3" />
        <path d="M390 150 q 40 -8 44 -26 q 10 20 -14 34" fill="#5a9a4a" stroke="#2f6f2a" strokeWidth="2.2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${140 + i * 50} 120 q ${20 + i * 6} 30 ${10 + i * 8} 58`} fill="none" stroke="#3f7f3a" strokeWidth="2.4" opacity="0.8" />
        ))}
        <path d="M96 156 q 100 26 190 10" fill="none" stroke="#4a8a3a" strokeWidth="3" opacity="0.8" />
        <text x="352" y="122" fontSize="12.5" fill="#2f6f2a" fontWeight="700">叶径可达 2~3 米</text>
        <text x="352" y="196" fontSize="12.5" fill="#2f6f2a" fontWeight="700">叶缘上卷防浪·叶脉如伞骨</text>
      </g>
      {/* 结构与巧思 */}
      <g style={dim(active, 2)}>
        <rect x="46" y="252" width="200" height="70" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="146" y="276" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">"大力士"浮叶</text>
        <text x="146" y="298" textAnchor="middle" fontSize="11" fill="#3f7f3a">叶脉粗壮呈肋条状·可承重</text>
        <text x="146" y="316" textAnchor="middle" fontSize="11" fill="#3f7f3a">小孩坐上去都不沉（约 40 kg）</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="274" y="252" width="210" height="70" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="379" y="276" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">结构智慧</text>
        <text x="379" y="298" textAnchor="middle" fontSize="11" fill="#a5761d">背面网格状叶脉 + 空腔浮力</text>
        <text x="379" y="316" textAnchor="middle" fontSize="11" fill="#a5761d">仿生学：伦敦"水晶宫"屋顶</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">王莲 · 水生植物的"结构力学"（课外拓展）</text>
    </svg>
  );
}

function TendrilPlantSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 支架 */}
      <g style={dim(active, 0)}>
        <path d="M120 90 L 120 320 M 390 60 L 390 320" stroke="#8a7a4a" strokeWidth="7" strokeLinecap="round" />
        <path d="M120 90 L 390 60" stroke="#8a7a4a" strokeWidth="5" strokeLinecap="round" />
        <path d="M120 200 L 390 180" stroke="#8a7a4a" strokeWidth="5" strokeLinecap="round" />
        <text x="430" y="70" fontSize="12.5" fill="#8a7a4a" fontWeight="700">支架/灌木</text>
      </g>
      {/* 卷须缠绕 */}
      <g style={dim(active, 1)}>
        <path d="M120 96 q 60 -20 130 -14 q 70 6 132 -12" fill="none" stroke="#5a9a3a" strokeWidth="9" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${190 + i * 60} 88 q 4 -18 -8 -28 q -12 -8 -20 2 q -6 10 6 16`} fill="none" stroke="#7ab84a" strokeWidth="4" strokeLinecap="round" />
        ))}
        <path d="M320 76 q 20 30 52 24" fill="none" stroke="#7ab84a" strokeWidth="5" strokeLinecap="round" />
        <text x="60" y="330" fontSize="12.5" fill="#4a8a3a" fontWeight="700">卷须碰到支撑物 → 数分钟内缠绕并卷成弹簧状收紧</text>
      </g>
      {/* 机制 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="240" width="440" height="72" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="264" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">向触性：接触侧生长减慢·背侧加速 → 卷须"螺旋化"缠紧支架</text>
        <text x="260" y="288" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">豌豆用叶须·黄瓜用茎卷须·葡萄用枝卷须——不同器官"改装"出同一功能</text>
        <text x="260" y="312" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">攀援策略让藤本"借力上树"争夺阳光——雨林下层植物的生存智慧</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">卷须 · 植物的攀援"手"（课外拓展）</text>
    </svg>
  );
}

function PollenGrainSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 花粉粒放大 */}
      <g style={dim(active, 0)}>
        <ellipse cx="200" cy="160" rx="100" ry="80" fill="#e8c86a" stroke="#a5822a" strokeWidth="3" />
        <path d="M100 160 q 100 -40 200 0" fill="none" stroke="#a5822a" strokeWidth="2.4" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={170 + i * 40} cy={160 + (i % 2) * 26 - 13} rx="9" ry="12" fill="#c9a03a" stroke="#8a671b" strokeWidth="1.6" />
        ))}
        <text x="330" y="120" fontSize="12.5" fill="#8a671b" fontWeight="700">外壁含"孢粉素"：极耐腐蚀</text>
        <text x="330" y="142" fontSize="12" fill="#8a671b">花纹因种而异（化石鉴定依据）</text>
        <text x="330" y="164" fontSize="12" fill="#a5761b" fontWeight="600">萌发孔：花粉管伸出的"门"</text>
      </g>
      {/* 结构 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="240" width="210" height="86" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="151" y="264" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">花粉粒 = 雄性"快递员"</text>
        <text x="151" y="288" textAnchor="middle" fontSize="11" fill="#37585f">外壁 + 内壁 + 营养细胞</text>
        <text x="151" y="310" textAnchor="middle" fontSize="11" fill="#37585f">+ 生殖细胞（将分裂成两个精子）</text>
      </g>
      {/* 过敏 */}
      <g style={dim(active, 2)}>
        <rect x="276" y="240" width="204" height="86" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="378" y="264" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">花粉过敏（花粉症）</text>
        <text x="378" y="288" textAnchor="middle" fontSize="10.5" fill="#a5761d">风媒花粉小而轻·易入呼吸道</text>
        <text x="378" y="310" textAnchor="middle" fontSize="10.5" fill="#a5761d">虫媒花粉少致敏（黏重不飘散）</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="334" width="440" height="34" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="356" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">孢粉学：地层中的花粉化石是重建古植被与古气候的"时间胶囊"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">花粉 · 植物的雄性"快递"（课外拓展）</text>
    </svg>
  );
}

function BarkSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 树干横剖 */}
      <g style={dim(active, 0)}>
        <path d="M120 96 q 140 -30 280 0 q 20 60 0 130 q -140 34 -280 0 q -20 -70 0 -130 Z" fill="#c9a06a" stroke="#8a6a3a" strokeWidth="3" />
        <path d="M150 110 q 120 -24 240 4 q 12 50 -6 96 q -120 26 -240 -2 q -16 -46 6 -98 Z" fill="#e8d8a8" stroke="#b5a582" strokeWidth="2.4" />
        <path d="M180 124 q 90 -16 180 6 q 10 42 -8 78 q -90 18 -180 -4 q -14 -38 8 -80 Z" fill="#d8c9a0" stroke="#b5a582" strokeWidth="2" />
        <text x="354" y="120" fontSize="12.5" fill="#8a6a3a" fontWeight="700">树皮（周皮+韧皮部）</text>
        <line x1="412" y1="124" x2="368" y2="118" stroke="#8a6a3a" strokeWidth="1.2" />
        <text x="354" y="206" fontSize="12.5" fill="#8a6a3a" fontWeight="700">木质部（木材·运水）</text>
        <line x1="412" y1="210" x2="368" y2="206" stroke="#8a6a3a" strokeWidth="1.2" />
      </g>
      {/* 形成层与树皮功能 */}
      <g style={dim(active, 1)}>
        <text x="60" y="286" fontSize="12.5" fill="#2f6f2a" fontWeight="700">树皮的"防线"：防失水·防病菌·防虫蛀·防火（厚树皮耐火）</text>
        <text x="60" y="310" fontSize="12" fill="#5a7a2a">树皮受伤 → 韧皮部受损 → 有机物运输"断供"（环剥致死原理）</text>
      </g>
      {/* 树皮之美 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="322" width="440" height="46" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="342" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">树皮形态千姿百态：白桦"剥层纸"·栓皮栎"软木塞"·龙爪枣"拧麻花"</text>
        <text x="260" y="360" textAnchor="middle" fontSize="11" fill="#a5761d">树皮栓皮层不含"活细胞"——软木塞砍树不伤树（每 9 年剥一层）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">树皮 · 树的"铠甲"与运输要道（课外拓展）</text>
    </svg>
  );
}

function VenusFlytrapSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 张开叶夹 */}
      <g style={dim(active, 0)}>
        <path d="M200 210 q -30 -70 30 -96 q 40 30 44 92 q -40 22 -74 4 Z" fill="#c94a4a" stroke="#8a2020" strokeWidth="2.8" />
        <path d="M272 212 q 26 -74 -20 -98 q -36 34 -40 96 q 32 20 60 2 Z" fill="#c94a4a" stroke="#8a2020" strokeWidth="2.8" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${214 + i * 12} 130 l 12 6 m -12 -6 l -2 14`} stroke="#f0d0d0" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        <text x="330" y="130" fontSize="12.5" fill="#8a2020" fontWeight="700">叶缘的"睫毛"刺：</text>
        <text x="330" y="150" fontSize="12" fill="#a53030">闭合后交错如牢笼</text>
      </g>
      {/* 触毛触发 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${234 + i * 10} 158 l ${6 + i * 2} -14`} stroke="#f4e0a0" strokeWidth="2.6" strokeLinecap="round" />
        ))}
        <text x="60" y="140" fontSize="12.5" fill="#8a671b" fontWeight="700">感应触毛：20 秒内碰 2 次</text>
        <text x="60" y="160" fontSize="12.5" fill="#8a671b">→ 触发动作电位（1 次不够防误触）</text>
        <path d="M150 150 q 40 12 80 6" fill="none" stroke="#8a671b" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 机制 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="76" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">0.1 秒闭合：外层细胞快速吸水膨大——"酸生长"驱动的快速运动</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">双触毛确认机制防误触（雨滴/落叶不算）·闭合后分泌消化酶"吃肉"补氮</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">主动捕虫 vs 猪笼草被动陷阱——食虫植物的两大流派</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">捕蝇草 · 植物的"动作电位"（课外拓展）</text>
    </svg>
  );
}

function RubberTreeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 树干与割胶 */}
      <g style={dim(active, 0)}>
        <path d="M200 320 q -10 -140 10 -220" fill="none" stroke="#8a6a3a" strokeWidth="26" strokeLinecap="round" />
        <path d="M320 320 q 14 -140 -6 -220" fill="none" stroke="#8a6a3a" strokeWidth="26" strokeLinecap="round" />
        <path d="M210 140 q 50 30 100 0" fill="none" stroke="#6a8a3a" strokeWidth="20" strokeLinecap="round" opacity="0.6" />
        <path d="M212 150 q 48 26 96 2" fill="none" stroke="#f4f0e8" strokeWidth="2.4" />
        <path d="M214 156 q 46 22 92 4" fill="none" stroke="#f4f0e8" strokeWidth="2.4" />
        <circle cx="216" cy="156" r="6" fill="#f4f0e8" stroke="#c9c4b8" strokeWidth="1.4" />
        <text x="60" y="130" fontSize="12.5" fill="#8a6a3a" fontWeight="700">螺旋割线：只割树皮不伤形成层</text>
        <path d="M216 158 q 6 30 2 60" fill="none" stroke="#f4f0e8" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="218" cy="230" rx="12" ry="18" fill="#f4f0e8" stroke="#c9c4b8" strokeWidth="2" />
        <text x="252" y="238" fontSize="12" fill="#8a7a4a" fontWeight="700">乳胶滴入收集杯</text>
      </g>
      {/* 乳胶 */}
      <g style={dim(active, 1)}>
        <rect x="330" y="140" width="160" height="100" rx="10" fill="#f4f0e8" stroke="#b5a582" strokeWidth="2.4" />
        <text x="410" y="166" textAnchor="middle" fontSize="12" fill="#5a4a2a" fontWeight="800">乳胶 = 天然橡胶</text>
        <text x="410" y="190" textAnchor="middle" fontSize="10.5" fill="#59767c">聚异戊二烯长链分子</text>
        <text x="410" y="210" textAnchor="middle" fontSize="10.5" fill="#59767c">弹性·耐磨·防水</text>
        <text x="410" y="230" textAnchor="middle" fontSize="10" fill="#799398">轮胎·手套·气球原料</text>
      </g>
      {/* 防御本质 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="300" width="440" height="66" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">乳胶是植物的"防御武器"：伤口处凝固封口·黏住啃食昆虫的口器</text>
        <text x="260" y="348" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">与咖啡因（毒害）·玫瑰刺（物理）同为植物次生代谢防御——人类"借"来用</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">橡胶树 · 植物防御的"工业转译"（课外拓展）</text>
    </svg>
  );
}

function C4PlantSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 玉米植株 */}
      <g style={dim(active, 0)}>
        <path d="M240 300 v -180" stroke="#4a8a3a" strokeWidth="9" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M240 ${240 - i * 60} q -50 -20 -90 -10 m 90 10 q 50 -20 90 -10`} fill="none" stroke="#5a9a3a" strokeWidth="5" strokeLinecap="round" />
        ))}
        <text x="356" y="110" fontSize="12.5" fill="#2f6f2a" fontWeight="700">玉米·甘蔗·高粱（C4 植物）</text>
        <text x="356" y="132" fontSize="12" fill="#3f7f3a">高温强光下光合效率远超 C3</text>
      </g>
      {/* 叶结构对比 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="180" width="200" height="60" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="146" y="202" textAnchor="middle" fontSize="11" fill="#2c5a84" fontWeight="800">C4 叶："花环结构"</text>
        <text x="146" y="222" textAnchor="middle" fontSize="10" fill="#37585f">叶肉细胞先固碳 → 维管束鞘再加工</text>
        <rect x="274" y="180" width="200" height="60" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="374" y="202" textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="800">C3 叶（水稻·小麦）</text>
        <text x="374" y="222" textAnchor="middle" fontSize="10" fill="#a5761d">直接固定 CO₂ · 强光下"光呼吸"浪费</text>
      </g>
      {/* 对比 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="256" width="440" height="106" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="282" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">C4：CO₂ 先"打包"成四碳化合物运到维管束鞘释放——相当于浓缩 CO₂</text>
        <text x="260" y="306" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">与 CAM 对比：CAM 是"时间分离"（夜储昼用），C4 是"空间分离"（两种细胞分工）</text>
        <text x="260" y="330" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">优势：气孔开得小也够 CO₂（省水）· 无光呼吸浪费（高效）</text>
        <text x="260" y="352" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">袁隆平团队的"巨型稻"与 C4 水稻研究——正是想给水稻装上这套"高光效引擎"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">C4 植物 · 高光效的光合"改装"（课外拓展）</text>
    </svg>
  );
}

function AirPlantSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 枝头附生 */}
      <g style={dim(active, 0)}>
        <path d="M100 230 q 40 -60 160 -66 q 120 -6 190 -40" fill="none" stroke="#8a6a3a" strokeWidth="14" strokeLinecap="round" />
        <path d="M180 210 q 30 -20 70 -18" fill="none" stroke="#6a8a4a" strokeWidth="2.4" opacity="0.7" />
        <text x="336" y="100" fontSize="12.5" fill="#8a6a3a" fontWeight="700">附生在树枝·电线甚至岩石上</text>
        <text x="356" y="120" fontSize="12.5" fill="#8a6a3a" fontWeight="700">完全不需要土壤！</text>
      </g>
      {/* 空气凤梨本体 */}
      <g style={dim(active, 1)}>
        <path d="M250 190 q -30 -60 -70 -74 m 70 74 q -6 -70 -34 -96 m 34 96 q 10 -66 44 -88 m -44 88 q 26 -40 66 -46" fill="none" stroke="#8ab86a" strokeWidth="5" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${230 + i * 20} ${116 + i * 14} q 6 -12 16 -14`} fill="none" stroke="#a8d888" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        <text x="60" y="130" fontSize="12.5" fill="#4a8a3a" fontWeight="700">银灰色绒毛鳞叶</text>
        <text x="60" y="150" fontSize="12" fill="#4a8a3a">叶面吸收水分与灰尘养分</text>
      </g>
      {/* 机制 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="76" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">附生 ≠ 寄生：只"借宿"不"抢食"——不从宿主夺取养分</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">银色鳞毛（盾状毛）捕获空气中的水汽与尘埃养分；根仅作固定</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">趋同案例：雨林的附生兰·鸟巢蕨——"上树"只为争取光照</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">空气凤梨 · 附生植物的代表（课外拓展）</text>
    </svg>
  );
}

function TulipBulbSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 植株 */}
      <g style={dim(active, 0)}>
        <path d="M260 230 v -110" stroke="#3f7f3a" strokeWidth="8" strokeLinecap="round" />
        {[0, 1].map((i) => (
          <path key={i} d={`M260 ${180 - i * 30} q ${-40 - i * 8} -16 -58 -4 m 58 4 q ${40 + i * 8} -16 58 -4`} fill="none" stroke="#5a9a4a" strokeWidth="5" strokeLinecap="round" />
        ))}
        {[0, 1, 2].map((i) => (
          <path key={`p${i}`} d={`M244 ${100 - i * 6} q 16 ${-18 - i * 4} 32 0 q -16 ${10 + i * 2} -32 0 Z`} fill={['#e84a6a', '#e8b83a', '#c94a4a'][i]} stroke="#8a2a3a" strokeWidth="1.8" />
        ))}
        <text x="330" y="100" fontSize="12.5" fill="#8a2a3a" fontWeight="700">郁金香：春日花冠</text>
        <text x="330" y="120" fontSize="12" fill="#8a671b" fontWeight="600">花芽早在头年鳞茎内形成</text>
      </g>
      {/* 鳞茎剖面 */}
      <g style={dim(active, 1)}>
        <path d="M150 300 q -50 -8 -46 -60 q 4 -46 46 -58 q 44 12 48 58 q 4 52 -48 60 Z" fill="#f4ecd8" stroke="#b5a582" strokeWidth="2.8" />
        <path d="M150 300 q -6 -60 0 -116 m -22 110 q -14 -50 -4 -100 m 48 104 q 12 -54 2 -106" fill="none" stroke="#d8c9a0" strokeWidth="2.4" />
        <path d="M144 190 q 6 -20 12 0 l 2 30 q -8 8 -16 0 Z" fill="#a5c98a" stroke="#3f7f3a" strokeWidth="1.8" />
        <text x="246" y="248" fontSize="12.5" fill="#8a7a4a" fontWeight="700">鳞茎剖面：肥厚的鳞叶（储养）</text>
        <text x="246" y="268" fontSize="12" fill="#8a7a4a">包裹顶芽（来年的花与叶）</text>
        <text x="246" y="288" fontSize="12" fill="#8a7a4a">基盘生根——越冬"能量仓"</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="66" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">鳞茎 = 营养繁殖器官：不靠种子，子鳞茎分株即"克隆"出相同品种</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">秋种春花：鳞茎经冬季低温（春化）才能开花——冰箱冷藏球可人工"骗"它开花</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">郁金香鳞茎 · 地下的能量仓库（课外拓展）</text>
    </svg>
  );
}

function SunflowerSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 花盘 */}
      <g style={dim(active, 0)}>
        <circle cx="250" cy="150" r="78" fill="#8a6a2a" stroke="#5a4a1a" strokeWidth="3" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const ang = i * 2.4;
          const r = Math.sqrt(i) * 21;
          return <circle key={i} cx={250 + Math.cos(ang) * r} cy={150 + Math.sin(ang) * r} r="6.5" fill="#e8a03a" stroke="#8a5a1d" strokeWidth="1.4" />;
        })}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => {
          const ang = (i * 2 * Math.PI) / 15;
          return <ellipse key={`p${i}`} cx={250 + Math.cos(ang) * 88} cy={150 + Math.sin(ang) * 88} rx="15" ry="8" fill="#f4d03a" stroke="#c9a02a" strokeWidth="1.6" transform={`rotate(${(i * 24) + 90} ${250 + Math.cos(ang) * 88} ${150 + Math.sin(ang) * 88})`} />;
        })}
        <path d="M250 240 v 80" stroke="#4a8a3a" strokeWidth="9" strokeLinecap="round" />
        <ellipse cx="215" cy="286" rx="26" ry="11" fill="#5a9a4a" stroke="#2f6f2a" strokeWidth="1.8" transform="rotate(-24 215 286)" />
        <text x="380" y="120" fontSize="12.5" fill="#8a5a1d" fontWeight="700">花盘小花按黄金角</text>
        <text x="380" y="140" fontSize="12.5" fill="#8a5a1d" fontWeight="700">（约 137.5°）螺旋排列</text>
        <text x="380" y="160" fontSize="12" fill="#a5761d">排布最密·无浪费空间</text>
      </g>
      {/* 向日性 */}
      <g style={dim(active, 1)}>
        <path d="M70 150 a 40 40 0 0 1 60 -30" fill="none" stroke="#e8b83a" strokeWidth="2.6" />
        <path d="M118 116 l 12 -2 m -12 2 l 4 -11" fill="none" stroke="#e8b83a" strokeWidth="2.4" />
        <circle cx="66" cy="104" r="14" fill="#f4d06a" stroke="#c9a05a" strokeWidth="2.2" />
        <text x="46" y="236" fontSize="12.5" fill="#8a671b" fontWeight="700">幼株白天"追太阳"：</text>
        <text x="46" y="256" fontSize="12" fill="#a5761d">东→西转动（生长素不对称）</text>
        <text x="46" y="276" fontSize="12" fill="#a5761d">成熟后固定朝东（提前升温）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="300" width="440" height="66" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">向日性 ≠ 向光性完整体：幼株追光靠生长素，成熟"朝东"是提高授粉率的策略</text>
        <text x="260" y="348" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">数学×生物：花盘的斐波那契螺旋是小花排布的最优解（排最多·不重叠）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">向日葵 · 追光的数学（课外拓展）</text>
    </svg>
  );
}

function BanyanRootsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 树冠 */}
      <g style={dim(active, 0)}>
        <ellipse cx="260" cy="96" rx="180" ry="58" fill="#5a9a4a" stroke="#2f6f2a" strokeWidth="2.8" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={140 + i * 120} cy="76" rx="60" ry="26" fill="#6aa85a" stroke="#2f6f2a" strokeWidth="1.8" opacity="0.9" />
        ))}
        <text x="380" y="60" fontSize="12.5" fill="#2f6f2a" fontWeight="700">树冠直径可达数十米</text>
      </g>
      {/* 主干+支柱根 */}
      <g style={dim(active, 1)}>
        <path d="M250 130 v 130" stroke="#8a6a3a" strokeWidth="20" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${150 + i * 55} ${118 - (i % 2) * 8} q ${i < 2 ? -14 : 14} 60 ${i < 2 ? -10 : 10} 130`} fill="none" stroke="#a5763a" strokeWidth={7 - Math.abs(i - 2)} strokeLinecap="round" />
        ))}
        <path d="M60 320 h 400" stroke="#c9b88a" strokeWidth="4" />
        <text x="46" y="86" fontSize="12.5" fill="#2f6f2a" fontWeight="700">气生根下垂落地→长成"支柱根"</text>
        <text x="46" y="302" fontSize="12.5" fill="#8a6a3a" fontWeight="700">"独木成林"：支柱根可达上千条</text>
      </g>
      {/* 生态 */}
      <g style={dim(active, 2)}>
        <rect x="300" y="150" width="180" height="70" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="390" y="174" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">热带雨林"会走路的树"</text>
        <text x="390" y="196" textAnchor="middle" fontSize="11" fill="#3f7f3a">支柱根支撑冠幅扩张</text>
        <text x="390" y="214" textAnchor="middle" fontSize="11" fill="#3f7f3a">为鸟兽提供"公寓与食堂"</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">绞杀现象的"反面教材"：榕树与传粉榕小蜂是严格的互利共生（一对一）</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#a5761d">村口大榕树常是社区"圣地"——文化中的生态保护传统</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">榕树 · 独木成林（课外拓展）</text>
    </svg>
  );
}

function EthyleneSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 未熟 vs 催熟 */}
      <g style={dim(active, 0)}>
        <text x="120" y="90" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">乙烯：气态植物激素</text>
        <path d="M110 150 q 10 -18 26 -14 q 4 -14 20 -10 q 16 -4 20 12 q 14 6 6 20 q -6 12 -22 10 l -38 0 q -18 -2 -12 -18 Z" fill="#8ac86a" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="140" y="192" textAnchor="middle" fontSize="11" fill="#3f7f3a" fontWeight="600">青番茄（未熟）</text>
        <path d="M300 150 q 10 -18 26 -14 q 4 -14 20 -10 q 16 -4 20 12 q 14 6 6 20 q -6 12 -22 10 l -38 0 q -18 -2 -12 -18 Z" fill="#e05a3a" stroke="#a53030" strokeWidth="2.4" />
        <text x="330" y="192" textAnchor="middle" fontSize="11" fill="#a53030" fontWeight="600">红番茄（乙烯催熟）</text>
        <path d="M196 150 h 60 m 0 0 l -8 -5 m 8 5 l 8 5" fill="none" stroke="#8a671b" strokeWidth="2.2" />
        <text x="226" y="132" textAnchor="middle" fontSize="10" fill="#8a671b" fontWeight="700">乙烯气体</text>
      </g>
      {/* 作用 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="216" width="200" height="70" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="146" y="240" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">促进成熟</text>
        <text x="146" y="262" textAnchor="middle" fontSize="11" fill="#3f7f3a">催熟果实（柿子·香蕉）</text>
        <text x="146" y="280" textAnchor="middle" fontSize="11" fill="#3f7f3a">促进落叶落果（老叶黄化）</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="274" y="216" width="200" height="70" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="374" y="240" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">生活应用</text>
        <text x="374" y="262" textAnchor="middle" fontSize="11" fill="#37585f">苹果与生香蕉同放催熟</text>
        <text x="374" y="280" textAnchor="middle" fontSize="11" fill="#37585f">保鲜膜/冷藏延缓乙烯作用</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="300" width="440" height="66" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">特点：唯一以气体形式存在的植物激素 · 可在植株间"隔空"传递成熟信号</text>
        <text x="260" y="348" textAnchor="middle" fontSize="11.5" fill="#a5761d">五大类激素各司其职：生长素·赤霉素·细胞分裂素·脱落酸·乙烯——协同与拮抗并存</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">乙烯 · 果实成熟的"信号兵"（课内拓展）</text>
    </svg>
  );
}

function PollinationTypesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 风媒花 */}
      <g style={dim(active, 0)}>
        <path d="M90 190 v -70" stroke="#6a8a3a" strokeWidth="6" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M90 122 q ${-10 + i * 10} -24 ${-6 + i * 10} -34`} fill="none" stroke="#c9b88a" strokeWidth="3" strokeLinecap="round" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={80 + i * 10} cy={62 + (i % 2) * 10} r="3.4" fill="#e8d8a0" stroke="#a58a2a" strokeWidth="1.2" />
        ))}
        <path d="M60 40 q 30 -14 60 4 m -66 12 q 34 -10 68 6" fill="none" stroke="#b5c99a" strokeWidth="2" opacity="0.8" />
        <text x="46" y="236" fontSize="12.5" fill="#6a8a3a" fontWeight="700">风媒花（小麦·玉米）</text>
        <text x="46" y="256" fontSize="12" fill="#5a7a2a">花小不鲜艳·无蜜·花粉多而轻</text>
      </g>
      {/* 虫媒花 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4].map((i) => {
          const ang = (i * 2 * Math.PI) / 5 - Math.PI / 2;
          return <ellipse key={i} cx={336 + Math.cos(ang) * 30} cy={140 + Math.sin(ang) * 30} rx="20" ry="13" fill="#f0a0c0" stroke="#c96a8a" strokeWidth="2" transform={`rotate(${(i * 72)} 336 140)`} />;
        })}
        <circle cx="336" cy="140" r="16" fill="#e8c83a" stroke="#a58a2a" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={330 + (i % 3) * 7} cy={134 + Math.floor(i / 3) * 8} r="1.8" fill="#8a671b" />
        ))}
        <ellipse cx="268" cy="196" rx="14" ry="9" fill="#e8b83a" stroke="#8a671b" strokeWidth="1.8" transform="rotate(-30 268 196)" />
        {[0, 1].map((i) => (
          <path key={i} d={`M262 ${196 - i * 6} l -14 -8`} stroke="#8a671b" strokeWidth="1.6" />
        ))}
        <text x="248" y="236" fontSize="12.5" fill="#c96a8a" fontWeight="700">虫媒花（桃·油菜）</text>
        <text x="248" y="256" fontSize="12" fill="#a5533c">花大鲜艳·有蜜·花粉少而黏</text>
      </g>
      {/* 对应关系 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="296" width="440" height="66" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">花的形态与传粉方式相适应——结构与功能观、生物与环境的统一</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">风媒：花粉量巨大"广撒网" · 虫媒：蜜汁与色彩"精准投递"（互利共生）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">传粉 · 风媒与虫媒（课内拓展）</text>
    </svg>
  );
}

function BambooSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 竹秆 */}
      <g style={dim(active, 0)}>
        <path d="M180 310 L 190 80" stroke="#6a9a4a" strokeWidth="18" strokeLinecap="round" />
        <path d="M250 310 L 245 60" stroke="#5a8a3a" strokeWidth="18" strokeLinecap="round" />
        <path d="M310 310 L 320 90" stroke="#6a9a4a" strokeWidth="18" strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <path d={`M186 ${250 - i * 60} h 14`} stroke="#4a7a2a" strokeWidth="3.4" strokeLinecap="round" />
            <path d={`M236 ${250 - i * 62} h 18`} stroke="#4a7a2a" strokeWidth="3.4" strokeLinecap="round" />
            <path d={`M302 ${250 - i * 60} h 14`} stroke="#4a7a2a" strokeWidth="3.4" strokeLinecap="round" />
          </g>
        ))}
        <text x="360" y="120" fontSize="12.5" fill="#3a6a2a" fontWeight="700">中空有节·一夜长高 1 米</text>
        <text x="380" y="142" fontSize="12.5" fill="#3a6a2a">木质化的"草"（禾本科）</text>
      </g>
      {/* 地下竹鞭 */}
      <g style={dim(active, 1)}>
        <path d="M70 330 q 90 -18 190 -12 q 110 6 190 -10" fill="none" stroke="#c9a05a" strokeWidth="7" strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${150 + i * 70} 322 q -6 14 -14 18`} fill="none" stroke="#c9a05a" strokeWidth="3.4" strokeLinecap="round" />
        ))}
        <text x="52" y="356" fontSize="12.5" fill="#8a6a2a" fontWeight="700">地下竹鞭（根状茎）：整片竹林可能是一株"克隆体"</text>
      </g>
      {/* 开花 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${196 + i * 58} 70 q 10 -18 24 -20`} fill="none" stroke="#d8b878" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={210 + i * 16} cy={54 + (i % 2) * 8} r="3.4" fill="#e8d06a" stroke="#a58a2a" strokeWidth="1.4" />
        ))}
        <text x="52" y="44" fontSize="12.5" fill="#a58a2a" fontWeight="700">数十甚至上百年才开一次花</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="60" width="440" height="56" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="82" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">集体开花之谜：同源竹鞭的竹林同步开花后整片枯死（一次结实）</text>
        <text x="260" y="104" textAnchor="middle" fontSize="11.5" fill="#a5761d">开花周期是"内部生物钟"+环境共同控制——熊猫保护关注的"竹子开花"事件</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">竹子 · 禾本科"巨人"（课外拓展）</text>
    </svg>
  );
}

function BaobabSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 粗壮树干 */}
      <g style={dim(active, 0)}>
        <path d="M190 300 q -26 -120 20 -190 q 40 -58 90 0 q 46 68 20 190 q -65 14 -130 0 Z" fill="#c9a06a" stroke="#8a6a3a" strokeWidth="3" />
        <path d="M240 120 q -8 80 0 174 m 60 -174 q 8 80 0 174" fill="none" stroke="#a5763a" strokeWidth="2.2" opacity="0.7" />
        <text x="396" y="200" fontSize="12.5" fill="#8a6a3a" fontWeight="700">树干直径可达 10 m</text>
        <text x="416" y="220" fontSize="12.5" fill="#8a6a3a" fontWeight="700">木质部像海绵储水</text>
      </g>
      {/* 枝冠（旱季落叶） */}
      <g style={dim(active, 1)}>
        <path d="M270 110 q -8 -40 -50 -56 m 50 56 q 0 -44 20 -66 m -20 66 q 30 -40 70 -44 m -70 44 q 56 -14 84 8" fill="none" stroke="#6a8a3a" strokeWidth="5" strokeLinecap="round" />
        <text x="336" y="52" fontSize="12.5" fill="#4a6a2a" fontWeight="700">旱季落叶·雨季才长叶</text>
        <text x="60" y="86" fontSize="12.5" fill="#4a6a2a" fontWeight="700">"倒栽树"：枝如根须</text>
      </g>
      {/* 储水机制 */}
      <g style={dim(active, 2)}>
        <rect x="46" y="246" width="200" height="76" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="146" y="270" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">活体"水塔"</text>
        <text x="146" y="292" textAnchor="middle" fontSize="11" fill="#37585f">纤维贮水组织可储 12 万升</text>
        <text x="146" y="312" textAnchor="middle" fontSize="11" fill="#37585f">旱季开花结果·动物来取水</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">适应干旱的另一解：CAM 植物"省水"·猴面包树"囤水"——同一问题不同答案</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#a5761d">非洲草原的"生命之树"：象·猴·鸟·人都依赖它的果实与水</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">猴面包树 · 稀树草原的储水巨树（课外拓展）</text>
    </svg>
  );
}

function CamPlantSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 菠萝/龙舌兰 */}
      <g style={dim(active, 0)}>
        <path d="M240 250 q -70 -14 -80 -90 q -6 -58 40 -96 q 60 -46 120 -6 q 46 34 40 96 q -10 76 -80 96 q -22 6 -40 0 Z" fill="#7ab86a" stroke="#2f6f2a" strokeWidth="2.8" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M300 ${110 + i * 30} l 40 -14 m -40 14 l 44 2`} stroke="#4a8a3a" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        <text x="368" y="120" fontSize="12.5" fill="#2f6f2a" fontWeight="700">菠萝/龙舌兰/多肉</text>
        <text x="368" y="140" fontSize="12.5" fill="#2f6f2a">CAM 植物：夜间开气孔</text>
      </g>
      {/* 昼夜分工 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="86" width="150" height="60" rx="10" fill="#1a2632" stroke="#0e1620" strokeWidth="2.2" />
        <text x="121" y="110" textAnchor="middle" fontSize="11.5" fill="#c9d8e8" fontWeight="800">夜 间：开气孔</text>
        <text x="121" y="132" textAnchor="middle" fontSize="10.5" fill="#8a9aa8">吸入 CO₂ → 苹果酸储存</text>
        <rect x="46" y="160" width="150" height="60" rx="10" fill="#f4d06a" stroke="#c9a05a" strokeWidth="2.2" />
        <text x="121" y="184" textAnchor="middle" fontSize="11.5" fill="#8a5a1d" fontWeight="800">白 天：关气孔</text>
        <text x="121" y="206" textAnchor="middle" fontSize="10.5" fill="#8a671b">苹果酸分解释 CO₂ → 光合</text>
      </g>
      {/* 机制图 */}
      <g style={dim(active, 2)}>
        <path d="M250 200 h 130 q 40 0 40 -36 q 0 -30 -30 -34" fill="none" stroke="#8a671b" strokeWidth="2.4" strokeDasharray="6 4" />
        <path d="M390 130 l 8 -6 m -8 6 l 10 2" fill="none" stroke="#8a671b" strokeWidth="2" />
        <text x="316" y="230" fontSize="12" fill="#8a671b" fontWeight="700">CO₂ 夜储昼用——"囤粮过沙漠"</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="252" width="440" height="66" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="276" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">水分账本：白天高温开孔的失水量是夜间的数倍——CAM 把气孔开在凉快的夜里</text>
        <text x="260" y="298" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">代价：生长缓慢（光合"库存"有限）——适应干旱的"保水优先"策略</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">景天酸代谢 · 干旱环境的光合变招（课外拓展）</text>
    </svg>
  );
}

function CaffeineSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 咖啡因分子 */}
      <g style={dim(active, 0)}>
        <path d="M150 150 h 90 l 45 78 l -45 78 h -90 l -45 -78 Z" fill="#e8dcc8" stroke="#8a7a4a" strokeWidth="2.8" />
        {[0, 1, 2].map((i) => (
          <text key={i} x={188 + (i % 2) * 52} y={196 + Math.floor(i / 2) * 78 + (i === 2 ? 0 : 0)} fontSize="11" fill="#5a4a2a" fontWeight="700">N</text>
        ))}
        <text x="262" y="196" fontSize="11" fill="#5a4a2a" fontWeight="700">O</text>
        <text x="196" y="128" fontSize="11" fill="#3a5a3a" fontWeight="700">CH₃</text>
        <text x="110" y="196" fontSize="11" fill="#3a5a3a" fontWeight="700">CH₃</text>
        <text x="180" y="290" textAnchor="middle" fontSize="12.5" fill="#5a4a2a" fontWeight="700">咖啡因（嘌呤类生物碱）</text>
      </g>
      {/* 植物端 */}
      <g style={dim(active, 1)}>
        <path d="M400 90 q -44 30 -50 84 q -4 46 30 66" fill="none" stroke="#3f7f3a" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="356" cy="96" rx="30" ry="15" fill="#5a9a4a" stroke="#2f6f2a" strokeWidth="2" transform="rotate(-30 356 96)" />
        <ellipse cx="390" cy="230" rx="26" ry="14" fill="#5a9a4a" stroke="#2f6f2a" strokeWidth="2" transform="rotate(20 390 230)" />
        <circle cx="382" cy="160" r="9" fill="#8a5a3a" stroke="#5a3a2a" strokeWidth="1.8" />
        <text x="352" y="66" fontSize="12.5" fill="#2f6f2a" fontWeight="700">咖啡·茶·可可</text>
        <text x="300" y="288" fontSize="12" fill="#3f7f3a" fontWeight="600">嫩叶与种子浓度最高——驱杀昆虫</text>
      </g>
      {/* 人体作用 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="300" width="440" height="66" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">人体端：咖啡因"冒充"腺苷占用受体 → 困意信号被阻断 → 提神</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#a5761d">过量：心悸·失眠·依赖——代谢半衰期约 5 小时（下午的咖啡会"加班"到深夜）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">咖啡因 · 植物次生代谢物的攻与防（课外拓展）</text>
    </svg>
  );
}

function DodderSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 宿主 */}
      <g style={dim(active, 0)}>
        <path d="M390 300 v -150" stroke="#3f7f3a" strokeWidth="8" strokeLinecap="round" />
        <path d="M390 190 q -36 -12 -58 -40 m 58 40 q 36 -12 58 -40" fill="none" stroke="#3f7f3a" strokeWidth="4" strokeLinecap="round" />
        <ellipse cx="330" cy="140" rx="30" ry="16" fill="#5a9a4a" stroke="#2f6f2a" strokeWidth="2" />
        <ellipse cx="450" cy="140" rx="30" ry="16" fill="#5a9a4a" stroke="#2f6f2a" strokeWidth="2" />
        <ellipse cx="390" cy="126" rx="32" ry="17" fill="#6aa85a" stroke="#2f6f2a" strokeWidth="2" />
        <text x="322" y="164" fontSize="12.5" fill="#2f6f2a" fontWeight="700">宿主植物（大豆/柳树）</text>
      </g>
      {/* 菟丝子 */}
      <g style={dim(active, 1)}>
        <path d="M170 300 q -16 -90 40 -130 q 50 -36 130 -30 q 50 4 62 -30" fill="none" stroke="#c9a05a" strokeWidth="7" strokeLinecap="round" />
        <path d="M260 236 q -40 6 -56 -18 m 62 -34 q 36 -12 60 4" fill="none" stroke="#d8b878" strokeWidth="5" strokeLinecap="round" />
        <text x="60" y="120" fontSize="12.5" fill="#8a671b" fontWeight="700">菟丝子：金黄色细藤（无叶）</text>
        <text x="60" y="140" fontSize="12.5" fill="#8a671b">缠绕茎上到处是"吸器"</text>
        <path d="M120 152 q 50 20 140 44" fill="none" stroke="#8a671b" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 吸器 */}
      <g style={dim(active, 2)}>
        <path d="M330 240 q 16 10 20 30 m -20 -30 q -14 8 -18 28" fill="none" stroke="#b88a2a" strokeWidth="4" strokeLinecap="round" />
        <text x="60" y="196" fontSize="12.5" fill="#a5761d" fontWeight="700">吸器伸入宿主韧皮部</text>
        <text x="60" y="216" fontSize="12.5" fill="#a5761d">"白吃"现成有机物</text>
        <text x="60" y="236" fontSize="12.5" fill="#a5761d">没有叶绿素·不能光合</text>
      </g>
      {/* 对比 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="296" width="440" height="66" rx="12" fill="#f4ecd8" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">全寄生植物 vs 猪笼草（食虫）：前者"蹭饭"有机物·后者自己光合只"开荤"补氮</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">防除要点：种子小而多·随土壤传播——与宿主同时播种前处理土壤</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">菟丝子 · 植物界的"寄生虫"（课外拓展）</text>
    </svg>
  );
}

function MimosaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 展开状态 */}
      <g style={dim(active, 0)}>
        <path d="M180 250 q -10 -80 30 -140" fill="none" stroke="#3f7f3a" strokeWidth="6" strokeLinecap="round" />
        <path d="M210 110 q 60 -24 130 -6" fill="none" stroke="#3f7f3a" strokeWidth="4" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${232 + i * 20} 104 q 6 -22 20 -28 m -20 28 q 4 20 18 26`} fill="none" stroke="#5a9a4a" strokeWidth="3" strokeLinecap="round" />
        ))}
        <text x="120" y="92" fontSize="12.5" fill="#2f6f2a" fontWeight="700">舒展状态：羽状复叶展开（白天）</text>
      </g>
      {/* 闭合状态 */}
      <g style={dim(active, 1)}>
        <path d="M330 250 q 4 -60 -20 -104" fill="none" stroke="#3f7f3a" strokeWidth="6" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M312 ${150 + i * 22} q 22 -8 44 0 q -22 10 -44 0 Z`} fill="#4a7a3a" stroke="#2f6f2a" strokeWidth="2" />
        ))}
        <text x="314" y="310" fontSize="12.5" fill="#2f6f2a" fontWeight="700">受触碰后：小叶闭合·叶柄下垂</text>
        <text x="330" y="330" fontSize="12.5" fill="#5a8a4a">几秒完成 · 约 10 分钟恢复</text>
      </g>
      {/* 叶枕机制 */}
      <g style={dim(active, 2)}>
        <ellipse cx="180" cy="200" rx="18" ry="12" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="46" y="176" fontSize="12.5" fill="#3f7f3a" fontWeight="700">叶枕：细胞膨压变化的"关节"</text>
        <text x="46" y="196" fontSize="12.5" fill="#3f7f3a">受刺激 → 钾离子外流失水 → 闭合</text>
        <line x1="150" y1="188" x2="168" y2="196" stroke="#3f7f3a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">这是植物的"运动"：不含肌肉，靠膨压与电信号传导——模拟躲避风暴与昆虫的适应</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">含羞草 · 感震运动（课外拓展）</text>
    </svg>
  );
}

function SeedDormancySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 休眠原因 */}
      <g style={dim(active, 0)}>
        <ellipse cx="130" cy="130" rx="52" ry="34" fill="#c9a05a" stroke="#8a6a3a" strokeWidth="2.6" />
        <text x="130" y="136" textAnchor="middle" fontSize="10.5" fill="#5a4a2a" fontWeight="700">坚硬种皮</text>
        <text x="200" y="102" fontSize="12.5" fill="#8a6a3a" fontWeight="700">原因一：种皮限制</text>
        <text x="200" y="122" fontSize="12.5" fill="#8a6a3a">不透水不透气·机械阻碍</text>
        <text x="200" y="142" fontSize="12.5" fill="#8a6a3a">莲子的种皮可休眠上千年</text>
      </g>
      <g style={dim(active, 1)}>
        <ellipse cx="130" cy="240" rx="52" ry="34" fill="#b8d8b0" stroke="#3f7f3a" strokeWidth="2.6" />
        <text x="130" y="246" textAnchor="middle" fontSize="10.5" fill="#2f6f2a" fontWeight="700">胚未成熟</text>
        <text x="200" y="212" fontSize="12.5" fill="#3f7f3a" fontWeight="700">原因二：后熟作用</text>
        <text x="200" y="232" fontSize="12.5" fill="#3f7f3a">胚未发育完全·需低温层积</text>
        <text x="200" y="252" fontSize="12.5" fill="#3f7f3a">脱落酸（ABA）维持休眠</text>
      </g>
      {/* 打破休眠 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="292" width="440" height="34" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="260" y="314" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">打破休眠：低温层积（沙藏）· 温水浸种 · 磨破种皮（机械处理）· 赤霉素浸泡</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="336" width="440" height="34" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="358" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">意义：躲过寒冬旱季、错开萌发风险——是对季节性环境的适应（自然选择的结果）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">种子的休眠 · 植物的"等待智慧"（课外拓展）</text>
    </svg>
  );
}

function TreeRingsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 横切面年轮 */}
      <g style={dim(active, 0)}>
        <circle cx="220" cy="190" r="150" fill="#c9a05a" stroke="#8a6a3a" strokeWidth="3" />
        {[150, 132, 114, 96, 78, 60, 42].map((r, i) => (
          <circle key={r} cx="220" cy="190" r={r} fill="none" stroke={i % 2 === 0 ? '#a5763a' : '#8a6a3a'} strokeWidth={i % 2 === 0 ? 7 : 3} opacity="0.9" />
        ))}
        <circle cx="220" cy="190" r="18" fill="#d8b078" stroke="#8a6a3a" strokeWidth="2" />
        <text x="46" y="140" fontSize="12.5" fill="#8a6a3a" fontWeight="700">树干横切：7 个年轮 = 生长了 7 年</text>
      </g>
      {/* 春材秋材 */}
      <g style={dim(active, 1)}>
        <rect x="392" y="96" width="26" height="22" rx="4" fill="#d8b078" stroke="#8a6a3a" strokeWidth="1.6" />
        <rect x="392" y="124" width="26" height="10" rx="3" fill="#8a6a3a" />
        <text x="426" y="108" fontSize="12.5" fill="#8a6a3a" fontWeight="700">春材（宽·色浅）</text>
        <text x="426" y="130" fontSize="12.5" fill="#8a6a3a" fontWeight="700">秋材（窄·色深）</text>
        <text x="392" y="158" fontSize="12.5" fill="#6a5a2a">一宽一窄 = 一圈年轮</text>
      </g>
      {/* 形成层 */}
      <g style={dim(active, 2)}>
        <circle cx="220" cy="190" r="154" fill="none" stroke="#3f7f3a" strokeWidth="4" strokeDasharray="9 6" />
        <text x="46" y="70" fontSize="12.5" fill="#2f6f2a" fontWeight="700">形成层（最外圈绿色虚线）</text>
        <text x="46" y="90" fontSize="12.5" fill="#2f6f2a">每年向外产生新韧皮部</text>
        <text x="46" y="110" fontSize="12.5" fill="#2f6f2a">向内产生新木质部（年轮）</text>
      </g>
      {/* 气候记录 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="316" width="440" height="48" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="334" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">宽轮 = 水热充足的丰收年 · 窄轮 = 干旱低温的歉收年</text>
        <text x="260" y="354" textAnchor="middle" fontSize="11.5" fill="#a5761d">树轮定年（树木年代学）：重建千年气候史 · 校准碳-14 测年 · 鉴定古建筑年代</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">年轮 · 树木的"气候日记"（课外拓展）</text>
    </svg>
  );
}

function SeedDispersalSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 风力传播 */}
      <g style={dim(active, 0)}>
        <path d="M46 130 q 26 -34 62 -22 q 30 10 24 40 q -6 28 -38 24 q -34 -4 -48 -42 Z" fill="#e8f0dc" stroke="#6a8a3a" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${120 + i * 26} ${96 + i * 12} q 10 -10 22 -6`} fill="none" stroke="#b5c99a" strokeWidth="1.8" />
        ))}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={176 + i * 34} cy={78 + i * 18} r="5" fill="#c9a05a" stroke="#8a6a3a" strokeWidth="1.4" />
        ))}
        <text x="44" y="216" fontSize="12.5" fill="#6a8a3a" fontWeight="700">风：蒲公英冠毛·枫翅果</text>
      </g>
      {/* 动物传播 */}
      <g style={dim(active, 1)}>
        <path d="M228 100 Q 258 66 300 76 Q 336 84 334 116 Q 332 146 296 150 Q 254 152 240 128 Q 230 112 228 100 Z" fill="#c9a05a" stroke="#8a6a3a" strokeWidth="2.2" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${244 + (i % 3) * 30} ${86 + Math.floor(i / 3) * 26} l 7 -7 m -7 7 l 8 2`} stroke="#8a6a3a" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        <path d="M338 120 q 30 -4 44 8 m -8 -10 q 16 4 20 16" fill="none" stroke="#8a6a3a" strokeWidth="2" />
        <text x="228" y="216" fontSize="12.5" fill="#8a6a3a" fontWeight="700">动物：苍耳钩刺挂皮毛</text>
        <text x="228" y="236" fontSize="12.5" fill="#8a6a3a">果实被吞食·种子随粪便远播</text>
      </g>
      {/* 水力与弹射 */}
      <g style={dim(active, 2)}>
        <circle cx="430" cy="120" r="34" fill="#8ab4c9" stroke="#4d7ea8" strokeWidth="2.2" opacity="0.5" />
        <ellipse cx="430" cy="104" rx="20" ry="11" fill="#a58a5a" stroke="#6a5a2a" strokeWidth="2" />
        <path d="M392 140 q 10 8 20 0 m 18 6 q 10 8 20 0" fill="none" stroke="#4d7ea8" strokeWidth="2" />
        <text x="386" y="196" fontSize="12.5" fill="#2c5a84" fontWeight="700">水：椰子漂流</text>
        <path d="M396 236 q 22 -22 20 -46 m 20 46 q -18 -26 -8 -50" fill="none" stroke="#3f7f3a" strokeWidth="2.2" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={386 + i * 22} cy={172 - i * 6} r="4" fill="#8a5a3a" stroke="#5a3a2a" strokeWidth="1.2" />
        ))}
        <text x="386" y="262" fontSize="12.5" fill="#3f7f3a" fontWeight="700">弹射：凤仙花果荚炸开</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="296" width="440" height="70" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="322" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">传播的意义：把种子送往远方新领地，避免与亲代植株争夺阳光水肥</text>
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#3f7f3a">果实与种子的形态适应 = 自然选择塑造的"旅行装备"——结构与功能相适应</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">种子的传播 · 植物的"旅行方式"（课外拓展）</text>
    </svg>
  );
}

function PitcherPlantSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 叶 + 卷须 */}
      <g style={dim(active, 0)}>
        <path d="M60 96 Q 130 56 216 78 Q 236 84 224 100 Q 150 122 84 116 Q 58 112 60 96 Z" fill="#7fae6a" stroke="#4d7f3a" strokeWidth="2.4" />
        <path d="M100 88 Q 150 74 200 86" fill="none" stroke="#4d7f3a" strokeWidth="1.6" />
        <text x="66" y="150" fontSize="12.5" fill="#3f6f30" fontWeight="700">正常叶（光合作用）</text>
        <path d="M222 84 Q 258 108 258 142" fill="none" stroke="#6a9a55" strokeWidth="6" strokeLinecap="round" />
        <text x="286" y="66" fontSize="12.5" fill="#3f6f30" fontWeight="700">卷须（攀援固定）</text>
      </g>
      {/* 捕虫囊主体 */}
      <g style={dim(active, 1)}>
        <path d="M214 142 Q 206 152 208 168 Q 188 200 192 250 Q 196 306 258 314 Q 322 306 324 250 Q 328 200 308 168 Q 310 152 302 142 Q 258 132 214 142 Z" fill="#b5d49a" stroke="#4d7f3a" strokeWidth="2.8" />
        <path d="M222 170 Q 218 200 220 240 Q 224 284 258 292" fill="none" stroke="#8fb878" strokeWidth="2" opacity="0.8" />
        <text x="140" y="236" fontSize="12.5" fill="#3f6f30" fontWeight="700">捕虫囊（叶的变态）</text>
        <line x1="188" y1="232" x2="206" y2="226" stroke="#3f6f30" strokeWidth="1.4" />
      </g>
      {/* 笼盖 + 唇（蜜腺） */}
      <g style={dim(active, 2)}>
        <ellipse cx="242" cy="128" rx="58" ry="16" fill="#8fb878" stroke="#4d7f3a" strokeWidth="2.4" transform="rotate(-14 242 128)" />
        <text x="330" y="112" fontSize="12.5" fill="#3f6f30" fontWeight="700">笼盖（挡雨水）</text>
        <line x1="326" y1="116" x2="290" y2="124" stroke="#3f6f30" strokeWidth="1.4" />
        <path d="M214 142 Q 258 130 302 142" fill="none" stroke="#d8a03a" strokeWidth="7" strokeLinecap="round" />
        <text x="330" y="152" fontSize="12.5" fill="#a5761d" fontWeight="700">唇（分泌蜜汁）</text>
        <line x1="326" y1="148" x2="302" y2="146" stroke="#a5761d" strokeWidth="1.4" />
      </g>
      {/* 消化液 + 昆虫 */}
      <g style={dim(active, 3)}>
        <path d="M206 262 Q 258 276 312 262 L 310 250 Q 258 262 208 250 Z" fill="#c9a05a" opacity="0.55" />
        <ellipse cx="238" cy="258" rx="16" ry="7" fill="#5a4a6a" stroke="#3a2a4a" strokeWidth="1.6" />
        <path d="M232 254 l -8 -6 m 12 4 l -2 -10 m 8 12 l 8 -6" stroke="#3a2a4a" strokeWidth="1.8" />
        <text x="330" y="262" fontSize="12.5" fill="#7a5a2a" fontWeight="700">消化液（分解虫体）</text>
        <line x1="326" y1="258" x2="300" y2="260" stroke="#7a5a2a" strokeWidth="1.4" />
        <text x="404" y="212" fontSize="12.5" fill="#8a5a2a" fontWeight="700">昆虫沿蜜汁</text>
        <text x="404" y="232" fontSize="12.5" fill="#8a5a2a" fontWeight="700">滑入囊内</text>
      </g>
      {/* 意义说明 */}
      <g style={dim(active, 4)}>
        <rect x="40" y="330" width="440" height="36" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="260" y="354" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">食虫植物：在贫瘠土壤中靠捕虫补充氮素——适应环境的经典案例</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">猪笼草 · 捕虫叶的结构（课外拓展）</text>
    </svg>
  );
}

function PlantHormonesSvg({ active }: { active: number | null; open?: boolean }) {
  const rows = [
    { name: '生长素 (IAA)', parts: '幼嫩芽·叶·发育种子', func: '促进伸长·向光性·低促高抑', color: '#4a9a6a', icon: '🌱' },
    { name: '赤霉素 (GA)', parts: '幼芽·幼根·未成熟种子', func: '促进茎伸长·打破种子休眠', color: '#c9a05a', icon: '🌾' },
    { name: '细胞分裂素', parts: '根尖（主要合成部位）', func: '促进细胞分裂·延缓衰老', color: '#4d7ea8', icon: '🧬' },
    { name: '脱落酸 (ABA)', parts: '根冠·萎蔫的叶片', func: '抑制分裂·气孔关闭·休眠', color: '#b0483a', icon: '🍂' },
    { name: '乙烯', parts: '植物体各部位（果实成熟时）', func: '促进果实成熟·落叶落果', color: '#c9708a', icon: '🍎' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {rows.map((r, i) => (
        <g key={r.name} style={dim(active, i)}>
          <rect x="20" y={54 + i * 60} width="480" height="50" rx="10" fill="#f8faf6" stroke={r.color} strokeWidth="2.2" />
          <text x={36} y={84 + i * 60} fontSize="18">{r.icon}</text>
          <text x={62} y={78 + i * 60} fontSize="12.5" fill={r.color} fontWeight="800">{r.name}</text>
          <text x={62} y={96 + i * 60} fontSize="10.5" fill="#59767c">合成：{r.parts}</text>
          <text x={300} y={84 + i * 60} fontSize="11.5" fill="#49676d" fontWeight="600">{r.func}</text>
        </g>
      ))}
      <g style={dim(active, 0)}>
        <text x="260" y="360" textAnchor="middle" fontSize="12" fill="#49676d" fontWeight="700">协同：生长素+赤霉素促进生长 · 拮抗：生长素 vs 脱落酸</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">五大类植物激素对比 · 选必 1 植物生长调节</text>
    </svg>
  );
}

function FruitTypesSvg({ active }: { active: number | null; open?: boolean }) {
  const fruits = [
    { icon: '🍅', name: '浆果', note: '番茄·葡萄——果肉多汁', color: '#c9534a' },
    { icon: '🍑', name: '核果', note: '桃·杏——内果皮成硬核', color: '#e88a5a' },
    { icon: '🍐', name: '梨果', note: '苹果·梨——假果（花托发育）', color: '#a8c96a' },
    { icon: '🥜', name: '荚果', note: '大豆·豌豆——成熟后沿缝裂开', color: '#8ab86a' },
    { icon: '🌰', name: '坚果', note: '板栗·橡子——果皮坚硬', color: '#a5761d' },
    { icon: '🌾', name: '颖果', note: '小麦·玉米——果皮种皮愈合', color: '#c9a05a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {fruits.map((f, i) => (
        <g key={f.name} style={dim(active, i)}>
          <rect x={20 + (i % 3) * 166} y={56 + Math.floor(i / 3) * 136} width="150" height="118" rx="14" fill="#ffffff" stroke="#13333a" strokeWidth="2.4" />
          <text x={95 + (i % 3) * 166} y={104 + Math.floor(i / 3) * 136} textAnchor="middle" fontSize="30">{f.icon}</text>
          <text x={95 + (i % 3) * 166} y={134 + Math.floor(i / 3) * 136} textAnchor="middle" fontSize="13.5" fill={f.color} fontWeight="800">{f.name}</text>
          <text x={95 + (i % 3) * 166} y={156 + Math.floor(i / 3) * 136} textAnchor="middle" fontSize="10" fill="#59767c">{f.note}</text>
        </g>
      ))}
      <g style={dim(active, 0)}>
        <text x="260" y="352" textAnchor="middle" fontSize="12.5" fill="#49676d" fontWeight="700">肉质果（浆果·核果·梨果）vs 干果（荚果·坚果·颖果）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">果实的类型 · 由子房发育而来（课外拓展）</text>
    </svg>
  );
}

function OrganVariantsSvg({ active }: { active: number | null; open?: boolean }) {
  const cards = [
    { x: 20, y: 56, icon: '🥕', title: '肉质直根（根）', note: '萝卜·胡萝卜：储藏养料', color: '#b5603a' },
    { x: 190, y: 56, icon: '🌵', title: '叶刺（叶）', note: '仙人掌：叶变刺·减少蒸腾', color: '#3f7f3a' },
    { x: 360, y: 56, icon: '🫛', title: '叶卷须（叶）', note: '豌豆：攀缘"抓手"', color: '#4a9a6a' },
    { x: 20, y: 212, icon: '🥔', title: '块茎（茎）', note: '马铃薯：地下储藏茎', color: '#8a671b' },
    { x: 190, y: 212, icon: '🍃', title: '鳞叶（叶）', note: '洋葱：鳞茎的肉质鳞叶', color: '#a58ac9' },
    { x: 360, y: 212, icon: '🍇', title: '茎卷须（茎）', note: '葡萄：茎变卷须攀缘', color: '#5a8a4a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {cards.map((c, i) => (
        <g key={c.title} style={dim(active, i)}>
          <rect x={c.x} y={c.y} width="140" height="128" rx="14" fill="#ffffff" stroke="#13333a" strokeWidth="2.4" />
          <text x={c.x + 70} y={c.y + 44} textAnchor="middle" fontSize="28">{c.icon}</text>
          <text x={c.x + 70} y={c.y + 74} textAnchor="middle" fontSize="13" fill={c.color} fontWeight="800">{c.title}</text>
          <text x={c.x + 70} y={c.y + 96} textAnchor="middle" fontSize="10" fill="#59767c">{c.note}</text>
        </g>
      ))}
      <g style={dim(active, 0)}>
        <text x="260" y="366" textAnchor="middle" fontSize="12.5" fill="#49676d" fontWeight="700">器官变态 = 功能改变带来的形态改变——是适应环境的结果（可遗传）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">植物器官的变态 · 根茎叶的"跨界"改造（课外拓展）</text>
    </svg>
  );
}

function SeedCompareSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 菜豆种子（左） */}
      <g style={dim(active, 0)}>
        <path d="M60 130 Q 44 210 74 268 Q 106 310 150 290 Q 186 262 176 200 Q 166 138 126 118 Q 88 106 60 130 Z" fill="#e8d8b8" stroke="#a5885f" strokeWidth="3" />
        {/* 种皮 */}
        <path d="M64 136 Q 50 206 78 262" fill="none" stroke="#c9a882" strokeWidth="2.4" />
        <text x="34" y="112" fontSize="12.5" fill="#8a6a3a" fontWeight="700">种皮</text>
        {/* 胚芽胚轴胚根 */}
        <path d="M112 176 Q 128 172 142 180 L 142 194 Q 126 198 114 190 Z" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="2" />
        <text x="150" y="166" fontSize="12" fill="#2f7a4d" fontWeight="700">胚芽</text>
        <line x1="146" y1="172" x2="136" y2="182" stroke="#2f7a4d" strokeWidth="1.3" />
        <path d="M116 196 Q 112 218 118 240" fill="none" stroke="#8a671b" strokeWidth="4" />
        <text x="56" y="250" fontSize="12" fill="#8a671b" fontWeight="700">胚根</text>
        {/* 子叶（两片肥厚） */}
        <path d="M84 150 Q 92 236 116 252 Q 96 262 82 244 Q 70 200 84 150 Z" fill="#f4e8c8" stroke="#c9a882" strokeWidth="2.2" />
        <path d="M142 186 Q 138 238 116 252 Q 136 256 148 240 Q 158 210 142 186 Z" fill="#f4e8c8" stroke="#c9a882" strokeWidth="2.2" />
        <text x="250" y="180" fontSize="12.5" fill="#8a6a2a" fontWeight="700">子叶 2 片（肥厚·储藏营养）</text>
        <line x1="246" y1="186" x2="150" y2="200" stroke="#8a6a2a" strokeWidth="1.3" />
        <text x="118" y="330" textAnchor="middle" fontSize="13.5" fill="#8a6a3a" fontWeight="800">菜豆种子（双子叶·无胚乳）</text>
      </g>
      {/* 玉米种子（右） */}
      <g style={dim(active, 1)}>
        <rect x="300" y="120" width="180" height="200" rx="18" fill="#f0d8a0" stroke="#b5953a" strokeWidth="3" />
        {/* 果皮与种皮 */}
        <rect x="300" y="120" width="180" height="26" fill="#e8c878" stroke="#b5953a" strokeWidth="2" />
        <text x="390" y="112" textAnchor="middle" fontSize="12" fill="#8a6a2a" fontWeight="700">果皮与种皮（愈合）</text>
        {/* 胚乳 */}
        <rect x="308" y="150" width="164" height="120" fill="#f4e8c8" stroke="#c9a882" strokeWidth="2" />
        <text x="390" y="216" textAnchor="middle" fontSize="12.5" fill="#8a6a2a" fontWeight="700">胚乳（储藏营养）</text>
        {/* 胚（左下角） */}
        <path d="M312 232 L336 232 L336 264 L312 264 Z" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="2" />
        <text x="324" y="252" textAnchor="middle" fontSize="10" fill="#2f5a1e" fontWeight="700">胚</text>
        <text x="176" y="262" fontSize="12" fill="#2f7a4d" fontWeight="700">子叶 1 片（转运营养）</text>
        <line x1="278" y1="256" x2="308" y2="252" stroke="#2f7a4d" strokeWidth="1.3" />
        <text x="390" y="352" textAnchor="middle" fontSize="13.5" fill="#8a6a2a" fontWeight="800">玉米种子（单子叶·有胚乳）</text>
      </g>
      {/* 分隔线 */}
      <line x1="262" y1="60" x2="262" y2="356" stroke="#a5885f" strokeWidth="1.6" strokeDasharray="7 5" />
    </svg>
  );
}

function SeedlessFruitSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 左：有子番茄（正常受粉） */}
      <g style={dim(active, 0)}>
        <rect x="30" y="60" width="210" height="240" rx="14" fill="#eaf4ea" stroke="#4a8a3a" strokeWidth="2.5" />
        <text x="135" y="88" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="800">正常受粉</text>
        <circle cx="100" cy="140" r="16" fill="#f4c76a" stroke="#b5953a" strokeWidth="2.2" />
        <text x="100" y="176" textAnchor="middle" fontSize="11" fill="#8a671b" fontWeight="600">受粉授精</text>
        <path d="M100 184 L100 208" stroke="#4a8a3a" strokeWidth="2.6" markerEnd="url(#sf-arrow)" />
        <circle cx="100" cy="248" r="34" fill="#e05a3a" stroke="#a53a2c" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={88 + i * 12} cy={250 + (i % 2) * 6} rx="5" ry="7" fill="#f4d06a" stroke="#c9881d" strokeWidth="1.4" />
        ))}
        <text x="135" y="290" textAnchor="middle" fontSize="12.5" fill="#2f7a4d" fontWeight="700">有子果实（种子产生生长素催果）</text>
      </g>
      {/* 右：无子番茄（生长素处理） */}
      <g style={dim(active, 1)}>
        <rect x="280" y="60" width="210" height="240" rx="14" fill="#fdf3e2" stroke="#c9881d" strokeWidth="2.5" />
        <text x="385" y="88" textAnchor="middle" fontSize="13" fill="#a5761d" fontWeight="800">未受粉 + 涂生长素</text>
        <circle cx="350" cy="140" r="16" fill="#f4c76a" stroke="#b5953a" strokeWidth="2.2" />
        <path d="M362 132 q 12 -6 18 -16" fill="none" stroke="#b5953a" strokeWidth="2" />
        <text x="386" y="112" fontSize="10.5" fill="#8a671b" fontWeight="700">✕ 不受粉</text>
        <path d="M350 184 L350 208" stroke="#4a8a3a" strokeWidth="2.6" markerEnd="url(#sf-arrow)" />
        <text x="352" y="200" fontSize="10" fill="#a5761d" fontWeight="700">涂生长素</text>
        <circle cx="350" cy="248" r="34" fill="#e05a3a" stroke="#a53a2c" strokeWidth="3" />
        <text x="350" y="253" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="800">无籽</text>
        <text x="385" y="290" textAnchor="middle" fontSize="12.5" fill="#a5761d" fontWeight="700">无子果实（生长素替代种子"催果"）</text>
      </g>
      {/* 原理条 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="318" width="440" height="44" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="334" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">原理：种子产生生长素促进果实发育；未受粉时人工涂生长素，果实照样长大</text>
        <text x="260" y="352" textAnchor="middle" fontSize="11.5" fill="#a5761d" fontWeight="700">——但里面没有种子</text>
        <text x="260" y="372" textAnchor="middle" fontSize="11" fill="#a5761d">考点：生长素"促进发育"≠"促进成熟"；遗传物质未变（不是可遗传变异）</text>
      </g>
      <defs>
        <marker id="sf-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#4a8a3a" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">无子果实培育原理 · 生长素的应用（选必 1 植物激素）</text>
    </svg>
  );
}

function PlantTissuesSvg({ active }: { active: number | null; open?: boolean }) {
  const cards = [
    { x: 20, y: 56, icon: '🌱', title: '分生组织', note: '细胞小核大 · 不断分裂', color: '#7a4a8a' },
    { x: 190, y: 56, icon: '🛡️', title: '保护组织', note: '表皮 · 减少失水防病虫', color: '#3f7f3a' },
    { x: 360, y: 56, icon: '🍎', title: '营养组织', note: '叶肉果肉 · 储藏与光合', color: '#2f7a4d' },
    { x: 20, y: 212, icon: '🚰', title: '输导组织', note: '导管运水 · 筛管运糖', color: '#b5603a' },
    { x: 190, y: 212, icon: '🏋️', title: '机械组织', note: '厚壁细胞 · 支撑加固', color: '#8a671b' },
    { x: 360, y: 212, icon: '🌿', title: '举例：叶', note: '四种组织在叶中协作', color: '#4a7a9a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {cards.map((c, i) => (
        <g key={c.title} style={dim(active, i)}>
          <rect x={c.x} y={c.y} width="140" height="128" rx="14" fill="#ffffff" stroke="#13333a" strokeWidth="2.4" />
          <text x={c.x + 70} y={c.y + 44} textAnchor="middle" fontSize="28">{c.icon}</text>
          <text x={c.x + 70} y={c.y + 74} textAnchor="middle" fontSize="14.5" fill={c.color} fontWeight="800">{c.title}</text>
          <text x={c.x + 70} y={c.y + 98} textAnchor="middle" fontSize="10.5" fill="#59767c">{c.note.split(' · ')[0]}</text>
          <text x={c.x + 70} y={c.y + 114} textAnchor="middle" fontSize="10.5" fill="#59767c">{c.note.split(' · ')[1] ?? ''}</text>
        </g>
      ))}
      <g style={dim(active, 0)}>
        <text x="260" y="366" textAnchor="middle" fontSize="12.5" fill="#49676d" fontWeight="700">分生组织 = 植物的"干细胞"：其余组织都由它分化而来</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">植物的主要组织 · 分工协作完成生命活动</text>
    </svg>
  );
}

function PineConeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 枝条与针叶 */}
      <g style={dim(active, 0)}>
        <path d="M120 70 Q 250 54 380 74" fill="none" stroke="#7a5a3a" strokeWidth="9" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <path d={`M${150 + i * 42} 62 l-16 -34 M${160 + i * 42} 62 l0 -40 M${172 + i * 42} 62 l14 -36`} fill="none" stroke="#3f7f3a" strokeWidth="2.6" strokeLinecap="round" />
          </g>
        ))}
        <text x="34" y="40" fontSize="13" fill="#2f7a4d" fontWeight="700">针叶（条形叶·耐旱防冻）</text>
      </g>
      {/* 球果主体（螺旋种鳞） */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => {
            const y = 128 + row * 44;
            const x = 226 + (row % 2 === 0 ? col * 52 : col * 52 + 26);
            if (x > 320) return null;
            return (
              <path
                key={`${row}-${col}`}
                d={`M${x - 30} ${y} Q ${x} ${y - 26} ${x + 30} ${y} Q ${x} ${y + 24} ${x - 30} ${y} Z`}
                fill={row < 2 ? '#a5763a' : '#c9a05a'}
                stroke="#7a5a2a"
                strokeWidth="2.4"
              />
            );
          }),
        )}
        <text x="356" y="150" fontSize="13" fill="#7a5a2a" fontWeight="700">球果（种鳞螺旋排列）</text>
        <line x1="352" y1="156" x2="330" y2="172" stroke="#7a5a2a" strokeWidth="1.4" />
      </g>
      {/* 裸露的种子 */}
      <g style={dim(active, 2)}>
        {[0, 1].map((i) => (
          <ellipse key={i} cx={272 + i * 40} cy={214} rx="9" ry="13" fill="#e8b878" stroke="#a5761d" strokeWidth="2" />
        ))}
        <path d="M282 226 L276 244 M310 226 L318 244" stroke="#a5761d" strokeWidth="1.6" />
        <text x="330" y="258" fontSize="13" fill="#a5761d" fontWeight="700">种子裸露·无果皮包被</text>
        <line x1="326" y1="250" x2="304" y2="234" stroke="#a5761d" strokeWidth="1.4" />
      </g>
      {/* 裸子植物特征说明 */}
      <g style={dim(active, 3)}>
        <text x="42" y="164" fontSize="12.5" fill="#49676d" fontWeight="600">裸子植物：种子裸露（</text>
        <text x="42" y="182" fontSize="12.5" fill="#49676d" fontWeight="600">没有子房壁→不形成果实）</text>
        <text x="42" y="200" fontSize="12.5" fill="#49676d" fontWeight="600">松、杉、柏、银杏、苏铁</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">松树球果与种子 · 裸子植物的生殖（课外拓展）</text>
    </svg>
  );
}

function RootTypesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 土壤 */}
      <g style={dim(active, 2)}>
        <path d="M0 110 L520 110 L520 380 L0 380 Z" fill="#d8c9a8" />
        <path d="M0 110 L520 110" stroke="#a5885f" strokeWidth="3" />
        <text x="506" y="132" textAnchor="end" fontSize="12.5" fill="#8a7a58">土壤</text>
      </g>
      {/* 直根系（左·菜豆） */}
      <g style={dim(active, 0)}>
        {/* 地上茎叶 */}
        <path d="M148 110 L148 44" stroke="#4a8a3a" strokeWidth="5" />
        {[0, 1].map((i) => (
          <ellipse key={i} cx={148 + (i === 0 ? -26 : 26)} cy={56} rx="22" ry="12" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2" transform={`rotate(${i === 0 ? -18 : 18} ${148 + (i === 0 ? -26 : 26)} 56)`} />
        ))}
        <text x="148" y="26" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="800">菜豆（双子叶）</text>
        {/* 主根 */}
        <path d="M148 110 Q 146 170 144 250 Q 143 296 140 340" fill="none" stroke="#c9a882" strokeWidth="8" strokeLinecap="round" />
        {/* 侧根 */}
        <path d="M146 160 Q 112 184 84 200 M144 210 Q 178 232 206 246 M143 262 Q 112 282 90 300 M142 304 Q 170 322 196 332" fill="none" stroke="#c9a882" strokeWidth="4.5" strokeLinecap="round" />
        <text x="52" y="222" fontSize="13" fill="#8a6a3a" fontWeight="700">直根系</text>
        <text x="42" y="240" fontSize="12.5" fill="#8a6a3a">主根粗长明显</text>
        <text x="30" y="258" fontSize="12.5" fill="#8a6a3a">由胚根发育而来</text>
      </g>
      {/* 分隔线 */}
      <line x1="260" y1="120" x2="260" y2="368" stroke="#a5885f" strokeWidth="1.6" strokeDasharray="7 5" />
      {/* 须根系（右·小麦） */}
      <g style={dim(active, 1)}>
        <path d="M386 110 L386 48" stroke="#4a8a3a" strokeWidth="4" />
        {[0, 1].map((i) => (
          <ellipse key={i} cx={386 + (i === 0 ? -24 : 24)} cy={58} rx="20" ry="10" fill="#a8cf98" stroke="#3f7f3a" strokeWidth="2" transform={`rotate(${i === 0 ? -16 : 16} ${386 + (i === 0 ? -24 : 24)} 58)`} />
        ))}
        <text x="386" y="26" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="800">小麦（单子叶）</text>
        {/* 不定根丛 */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path
            key={i}
            d={`M386 112 Q ${386 + (i - 3) * 24} 190 ${370 + (i - 3) * 30} ${330 - Math.abs(i - 3) * 22}`}
            fill="none"
            stroke="#c9a882"
            strokeWidth="4"
            strokeLinecap="round"
          />
        ))}
        <text x="322" y="222" fontSize="13" fill="#8a6a3a" fontWeight="700">须根系</text>
        <text x="316" y="240" fontSize="12.5" fill="#8a6a3a">无明显主根</text>
        <text x="308" y="258" fontSize="12.5" fill="#8a6a3a">由不定根组成（丛生）</text>
      </g>
      <text x="20" y="44" fontSize="12.5" fill="#799398">根系类型对比 · 双子叶直根系 / 单子叶须根系</text>
    </svg>
  );
}

function StemStructureSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 环形切面 */}
      <g style={dim(active, 0)}>
        {/* 表皮 */}
        <circle cx="250" cy="196" r="150" fill="#dce8c8" stroke="#6a8a4a" strokeWidth="4" />
        <text x="250" y="70" textAnchor="middle" fontSize="13" fill="#4a7a3a" fontWeight="700">表皮（保护）</text>
        {/* 皮层 */}
        <circle cx="250" cy="196" r="128" fill="#e8e2c8" stroke="#a5987a" strokeWidth="2" />
      </g>
      {/* 韧皮部（环带外层） */}
      <g style={dim(active, 1)}>
        <circle cx="250" cy="196" r="102" fill="#f0d8c0" stroke="#c9881d" strokeWidth="2.5" />
        <text x="42" y="132" fontSize="13" fill="#a5601d" fontWeight="700">韧皮部（筛管）</text>
        <text x="42" y="150" fontSize="12.5" fill="#a5601d">向下运输有机物</text>
        <line x1="118" y1="146" x2="150" y2="172" stroke="#a5601d" strokeWidth="1.4" />
      </g>
      {/* 形成层 */}
      <g style={dim(active, 2)}>
        <circle cx="250" cy="196" r="86" fill="#fdf6e3" stroke="#b0483a" strokeWidth="2.5" />
        <text x="66" y="322" fontSize="13" fill="#b0483a" fontWeight="700">形成层（细胞能分裂，</text>
        <text x="66" y="340" fontSize="13" fill="#b0483a" fontWeight="700">使茎逐年加粗）</text>
        <line x1="132" y1="318" x2="196" y2="272" stroke="#b0483a" strokeWidth="1.4" />
      </g>
      {/* 木质部 */}
      <g style={dim(active, 3)}>
        <circle cx="250" cy="196" r="72" fill="#d8b88a" stroke="#8a6a3a" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const ang = (i * 60 - 90) * (Math.PI / 180);
          return (
            <g key={i}>
              <circle cx={250 + Math.cos(ang) * 46} cy={196 + Math.sin(ang) * 46} r="11" fill="#c9a878" stroke="#8a6a3a" strokeWidth="1.8" />
              <circle cx={250 + Math.cos(ang) * 46} cy={196 + Math.sin(ang) * 46} r="4.5" fill="#8a6a3a" />
            </g>
          );
        })}
        <text x="356" y="272" fontSize="13" fill="#8a5a2a" fontWeight="700">木质部（导管运水，</text>
        <text x="356" y="290" fontSize="13" fill="#8a5a2a" fontWeight="700">支撑茎干）</text>
        <line x1="352" y1="268" x2="312" y2="230" stroke="#8a5a2a" strokeWidth="1.4" />
      </g>
      {/* 髓 */}
      <g style={dim(active, 4)}>
        <circle cx="250" cy="196" r="34" fill="#f4ecd8" stroke="#c9b88a" strokeWidth="2.5" />
        <text x="250" y="202" textAnchor="middle" fontSize="12.5" fill="#8a7a4a" fontWeight="800">髓（储藏）</text>
      </g>
      {/* 运输方向说明 */}
      <g style={dim(active, 1)}>
        <text x="42" y="86" fontSize="12.5" fill="#49676d" fontWeight="600">导管向上运水·</text>
        <text x="42" y="104" fontSize="12.5" fill="#49676d" fontWeight="600">筛管向下运有机物</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">茎横切结构图 · 木质部与韧皮部之间的形成层让茎加粗</text>
    </svg>
  );
}

function SieveTubeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 筛管主干（纵向） */}
      <g style={dim(active, 0)}>
        <rect x="210" y="40" width="90" height="300" fill="#f0e2c8" stroke="#b5953a" strokeWidth="3" />
        {/* 筛板 */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="210" y={128 + i * 90} width="90" height="12" fill="#d8c090" stroke="#8a671b" strokeWidth="2" />
            {[0, 1, 2, 3].map((j) => (
              <circle key={j} cx={226 + j * 19} cy={134 + i * 90} r="2.6" fill="#8a671b" />
            ))}
          </g>
        ))}
        <text x="316" y="96" fontSize="13" fill="#8a671b" fontWeight="700">筛管细胞（活的成熟细胞，</text>
        <text x="316" y="114" fontSize="13" fill="#8a671b" fontWeight="700">但细胞核已退化）</text>
        <line x1="312" y1="102" x2="302" y2="96" stroke="#8a671b" strokeWidth="1.4" />
      </g>
      {/* 筛孔与有机物流 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M255 ${60 + i * 90} L255 ${124 + i * 90}`} stroke="#c9708a" strokeWidth="4" markerEnd="url(#st-arrow)" />
        ))}
        <text x="60" y="150" fontSize="13" fill="#a54868" fontWeight="700">有机物（糖类）</text>
        <text x="60" y="168" fontSize="12.5" fill="#a54868">自上而下运输到根、果实</text>
        <line x1="170" y1="158" x2="248" y2="140" stroke="#a54868" strokeWidth="1.4" />
      </g>
      {/* 筛板标注 */}
      <g style={dim(active, 2)}>
        <text x="330" y="222" fontSize="13" fill="#8a671b" fontWeight="700">筛板（上有筛孔）</text>
        <text x="330" y="240" fontSize="12.5" fill="#8a671b">细胞质经孔相连互通</text>
        <line x1="326" y1="228" x2="302" y2="230" stroke="#8a671b" strokeWidth="1.4" />
      </g>
      {/* 伴胞 */}
      <g style={dim(active, 3)}>
        <rect x="304" y="52" width="34" height="286" rx="8" fill="#e0f2f0" stroke="#3f7f7a" strokeWidth="2.5" />
        <circle cx="321" cy="120" r="9" fill="#a8d8d4" stroke="#3f7f7a" strokeWidth="1.8" />
        <text x="352" y="290" fontSize="13" fill="#2f7a6a" fontWeight="700">伴胞（代谢"后勤"，</text>
        <text x="352" y="308" fontSize="13" fill="#2f7a6a" fontWeight="700">为筛管供能）</text>
        <line x1="348" y1="296" x2="340" y2="286" stroke="#2f7a6a" strokeWidth="1.4" />
      </g>
      {/* 运输方向说明 */}
      <g style={dim(active, 1)}>
        <text x="60" y="250" fontSize="12.5" fill="#49676d" fontWeight="600">与导管相反：筛管把叶片</text>
        <text x="60" y="268" fontSize="12.5" fill="#49676d" fontWeight="600">制造的有机物运往全身</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">筛管与伴胞模式图 · 有机物的运输通道</text>
    </svg>
  );
}

function LeafBudSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 枝条 */}
      <g style={dim(active, 3)}>
        <path d="M40 320 Q 150 308 250 312 L 250 286 L 430 296 L 430 326 Q 300 314 250 316 Q 150 322 40 346 Z" fill="#a8824a" stroke="#7a5a2a" strokeWidth="3" />
        <text x="470" y="322" textAnchor="end" fontSize="12.5" fill="#7a5a2a" fontWeight="600">枝条（芽着生处）</text>
      </g>
      {/* 芽轴 */}
      <g style={dim(active, 2)}>
        <path d="M238 290 L242 120 Q 250 104 258 120 L262 290 Z" fill="#d8c9a0" stroke="#8a7a4a" strokeWidth="2.5" />
        <text x="336" y="252" fontSize="13" fill="#8a6a2a" fontWeight="700">芽轴（将来发育成茎）</text>
        <line x1="332" y1="258" x2="262" y2="252" stroke="#8a6a2a" strokeWidth="1.4" />
      </g>
      {/* 生长点 */}
      <g style={dim(active, 0)}>
        <path d="M234 122 Q 250 88 266 122 Q 250 134 234 122 Z" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="80" y="84" fontSize="13" fill="#6a4a9a" fontWeight="700">生长点（顶芽分生组织）</text>
        <text x="80" y="102" fontSize="12.5" fill="#6a4a9a">细胞分裂使芽不断长大</text>
        <line x1="206" y1="96" x2="240" y2="112" stroke="#6a4a9a" strokeWidth="1.4" />
      </g>
      {/* 叶原基 */}
      <g style={dim(active, 1)}>
        <path d="M240 128 Q 214 122 204 138 Q 220 148 242 140 Z" fill="#a8cf98" stroke="#3f7f3a" strokeWidth="2.2" />
        <path d="M260 128 Q 286 122 296 138 Q 280 148 258 140 Z" fill="#a8cf98" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="330" y="122" fontSize="13" fill="#2f7a4d" fontWeight="700">叶原基（发育成幼叶）</text>
        <line x1="326" y1="128" x2="298" y2="134" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 幼叶 */}
      <g style={dim(active, 1)}>
        <path d="M238 152 Q 172 148 142 196 Q 190 224 234 196 Z" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="2.5" />
        <path d="M262 152 Q 328 148 358 196 Q 310 224 266 196 Z" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="42" y="150" fontSize="13" fill="#2f7a4d" fontWeight="700">幼叶（叶原基</text>
        <text x="42" y="168" fontSize="13" fill="#2f7a4d" fontWeight="700">长大 → 发育成叶）</text>
        <line x1="128" y1="158" x2="168" y2="178" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 芽原基（侧芽） */}
      <g style={dim(active, 4)}>
        <ellipse cx="212" cy="272" rx="16" ry="24" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="56" y="292" fontSize="13" fill="#6a4a9a" fontWeight="700">芽原基（发育成侧芽 → 侧枝）</text>
        <line x1="216" y1="290" x2="196" y2="282" stroke="#6a4a9a" strokeWidth="1.4" />
      </g>
      {/* 芽鳞片 */}
      <g style={dim(active, 5)}>
        <path d="M186 236 Q 150 176 238 108 L250 84 Q 220 120 208 170 Q 200 210 206 258 Z" fill="#c9b88a" stroke="#8a7a4a" strokeWidth="2.5" opacity="0.85" />
        <path d="M314 236 Q 350 176 262 108 L250 84 Q 280 120 292 170 Q 300 210 294 258 Z" fill="#c9b88a" stroke="#8a7a4a" strokeWidth="2.5" opacity="0.85" />
        <text x="380" y="72" fontSize="13" fill="#8a7a4a" fontWeight="700">芽鳞片（外层保护）</text>
        <line x1="376" y1="78" x2="298" y2="150" stroke="#8a7a4a" strokeWidth="1.4" />
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">叶芽纵切结构图 · 芽是未发育的枝条</text>
    </svg>
  );
}

function LeafCrossSectionSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 上表皮 */}
      <g style={dim(active, 0)}>
        <path d="M60 130 Q 250 106 460 130 L460 148 Q 250 126 60 148 Z" fill="#e8e2c8" stroke="#8a7a4a" strokeWidth="2.5" />
        <text x="96" y="102" fontSize="13" fill="#7a6a3a" fontWeight="700">上表皮（角质层防失水）</text>
        <line x1="140" y1="108" x2="160" y2="128" stroke="#7a6a3a" strokeWidth="1.4" />
      </g>
      {/* 栅栏组织 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={80 + i * 64} y={150} width="34" height="66" rx="10" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2" />
        ))}
        <text x="88" y="238" fontSize="13" fill="#2f7a4d" fontWeight="700">栅栏组织（圆柱形细胞、含叶绿体多）</text>
      </g>
      {/* 海绵组织 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2].map((i) => (
          <ellipse key={`a${i}`} cx={112 + i * 66} cy={272} rx="30" ry="20" fill="#a8cf98" stroke="#3f7f3a" strokeWidth="2" />
        ))}
        {[0, 1, 2].map((i) => (
          <ellipse key={`b${i}`} cx={145 + i * 66} cy={282} rx="26" ry="17" fill="#b8d8a8" stroke="#3f7f3a" strokeWidth="2" />
        ))}
        <text x="330" y="290" fontSize="13" fill="#2f7a4d" fontWeight="700">海绵组织（排列疏松、</text>
        <text x="330" y="310" fontSize="13" fill="#2f7a4d">细胞间隙利于气体流通）</text>
        <line x1="326" y1="292" x2="272" y2="282" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 叶脉 */}
      <g style={dim(active, 3)}>
        <circle cx="256" cy="230" r="34" fill="#e8c9a8" stroke="#b58a5f" strokeWidth="3" />
        <path d="M256 202 L256 258 M234 216 L278 244 M234 244 L278 216" stroke="#b58a5f" strokeWidth="3.5" strokeLinecap="round" />
        <text x="256" y="176" textAnchor="middle" fontSize="13" fill="#8a5a2a" fontWeight="700">叶脉（导管输水、筛管输有机物）</text>
        <line x1="256" y1="182" x2="256" y2="196" stroke="#8a5a2a" strokeWidth="1.4" />
      </g>
      {/* 下表皮与气孔 */}
      <g style={dim(active, 4)}>
        <path d="M60 316 Q 250 340 460 316 L460 334 Q 250 358 60 334 Z" fill="#e8e2c8" stroke="#8a7a4a" strokeWidth="2.5" />
        <path d="M312 334 Q 318 350 328 350 Q 338 350 344 334" fill="none" stroke="#8a7a4a" strokeWidth="3" />
        <ellipse cx="320" cy="356" rx="7" ry="4" fill="#c8d8e8" stroke="#8a7a4a" strokeWidth="1.6" />
        <text x="368" y="362" fontSize="13" fill="#7a6a3a" fontWeight="700">气孔（气体进出窗口）</text>
        <text x="66" y="362" fontSize="13" fill="#7a6a3a" fontWeight="700">下表皮（气孔主要分布）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">叶横切结构图 · 光合作用的主要场所</text>
    </svg>
  );
}

function RootTipSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 成熟区 */}
      <g style={dim(active, 3)}>
        <rect x="226" y="36" width="48" height="112" fill="#cfe6c2" stroke="#4a8a3a" strokeWidth="2.5" />
        <rect x="228" y="40" width="10" height="104" fill="#b8d8a8" />
        <rect x="282" y="40" width="10" height="104" fill="#b8d8a8" />
        {/* 根毛 */}
        <path d="M226 60 Q 206 56 192 62 M226 84 Q 204 84 190 92 M226 110 Q 206 112 194 120 M226 134 Q 206 138 196 146" fill="none" stroke="#4a8a3a" strokeWidth="2.4" />
        <path d="M294 66 Q 314 62 328 68 M294 92 Q 316 92 330 100 M294 118 Q 314 120 326 128" fill="none" stroke="#4a8a3a" strokeWidth="2.4" />
        <text x="344" y="86" fontSize="12.5" fill="#3f7f3a" fontWeight="700">成熟区（根毛区）</text>
        <text x="358" y="104" fontSize="12.5" fill="#3f7f3a">根毛吸水主要部位</text>
        <line x1="340" y1="94" x2="296" y2="96" stroke="#3f7f3a" strokeWidth="1.4" />
      </g>
      {/* 导管 */}
      <g style={dim(active, 4)}>
        <path d="M250 30 L250 60" stroke="#c9708a" strokeWidth="8" strokeLinecap="round" strokeDasharray="10 6" />
        <path d="M243 148 L243 232" stroke="#c9708a" strokeWidth="5" strokeDasharray="8 5" />
        <path d="M257 148 L257 232" stroke="#c9708a" strokeWidth="5" strokeDasharray="8 5" />
        <text x="26" y="120" fontSize="13" fill="#8a5a94" fontWeight="700">导管（向上输水）</text>
        <line x1="140" y1="126" x2="240" y2="122" stroke="#8a5a94" strokeWidth="1.4" />
      </g>
      {/* 伸长区 */}
      <g style={dim(active, 2)}>
        <rect x="228" y="148" width="14" height="84" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="2" />
        <rect x="244" y="148" width="16" height="84" fill="#c4dcee" stroke="#3d6a94" strokeWidth="2" />
        <rect x="262" y="148" width="14" height="84" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="2" />
        <rect x="278" y="148" width="14" height="84" fill="#c4dcee" stroke="#3d6a94" strokeWidth="2" />
        <text x="356" y="182" fontSize="12.5" fill="#2c6e94" fontWeight="700">伸长区</text>
        <text x="356" y="200" fontSize="12.5" fill="#2c6e94">细胞伸长最快</text>
        <line x1="352" y1="190" x2="296" y2="190" stroke="#2c6e94" strokeWidth="1.4" />
      </g>
      {/* 分生区 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3].map((c) =>
          [0, 1, 2, 3, 4].map((r) => (
            <rect key={`${c}-${r}`} x={229 + c * 15} y={232 + r * 11} width="13" height="9" fill="#e0c8ee" stroke="#7a4a8a" strokeWidth="1.6" />
          )),
        )}
        <text x="356" y="256" fontSize="12.5" fill="#6a4a9a" fontWeight="700">分生区</text>
        <text x="356" y="274" fontSize="12.5" fill="#6a4a9a">细胞分裂旺盛</text>
        <line x1="352" y1="264" x2="294" y2="256" stroke="#6a4a9a" strokeWidth="1.4" />
      </g>
      {/* 根冠 */}
      <g style={dim(active, 0)}>
        <path d="M228 278 Q 226 306 250 316 Q 274 306 272 278 Q 250 290 228 278 Z" fill="#e8c9a8" stroke="#b58a5f" strokeWidth="2.5" />
        <text x="356" y="308" fontSize="12.5" fill="#8a6242" fontWeight="700">根冠</text>
        <text x="356" y="326" fontSize="12.5" fill="#8a6242">保护分裂部位</text>
        <line x1="352" y1="314" x2="276" y2="300" stroke="#8a6242" strokeWidth="1.4" />
      </g>
      {/* 根毛标注（左上） */}
      <g style={dim(active, 3)}>
        <text x="26" y="66" fontSize="13" fill="#3f7f3a" fontWeight="700">根毛</text>
        <text x="26" y="84" fontSize="12.5" fill="#3f7f3a">表皮细胞突起</text>
        <line x1="108" y1="72" x2="196" y2="66" stroke="#3f7f3a" strokeWidth="1.4" />
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">根尖纵切结构图 · 生长靠分生区与伸长区，吸水靠成熟区根毛</text>
    </svg>
  );
}

function GuardCellSvg({ active, open = true }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <defs>
        <clipPath id="guard-body">
          <ellipse cx="260" cy="190" rx="196" ry="128" />
        </clipPath>
      </defs>

      {/* 表皮细胞（左右两块） */}
      <g style={dim(active, 4)}>
        <g clipPath="url(#guard-body)">
          <rect x="24" y="52" width="150" height="276" fill="#f0f4ec" stroke="#9db8bd" strokeWidth="2" />
          <rect x="346" y="52" width="150" height="276" fill="#f0f4ec" stroke="#9db8bd" strokeWidth="2" />
          <line x1="24" y1="190" x2="174" y2="190" stroke="#b8cbc9" strokeWidth="1.6" />
          <line x1="346" y1="190" x2="496" y2="190" stroke="#b8cbc9" strokeWidth="1.6" />
        </g>
        <ellipse cx="260" cy="190" rx="196" ry="128" fill="none" stroke="#b8cbc9" strokeWidth="2" strokeDasharray="6 5" />
        <text x="30" y="330" fontSize="13" fill="#59767c" fontWeight="600">表皮细胞（无叶绿体）</text>
      </g>

      {/* 张开状态 */}
      <g style={{ ...dim(active, 0), opacity: dim(active, 0).opacity * (open ? 1 : 0), transition: 'opacity 0.7s ease' }}>
        <path d="M250 84 Q 172 94 164 190 Q 172 286 250 296 Q 227 244 226 190 Q 227 136 250 84 Z" fill="#8fbf6f" stroke="#3f7f4f" strokeWidth="3" />
        <path d="M270 84 Q 348 94 356 190 Q 348 286 270 296 Q 293 244 294 190 Q 293 136 270 84 Z" fill="#8fbf6f" stroke="#3f7f4f" strokeWidth="3" />
      </g>
      {/* 闭合状态 */}
      <g style={{ ...dim(active, 0), opacity: dim(active, 0).opacity * (open ? 0 : 1), transition: 'opacity 0.7s ease' }}>
        <path d="M248 84 Q 174 94 166 190 Q 174 286 248 296 Q 242 244 241 190 Q 242 136 248 84 Z" fill="#7ba75e" stroke="#3f7f4f" strokeWidth="3" />
        <path d="M272 84 Q 346 94 354 190 Q 346 286 272 296 Q 278 244 279 190 Q 278 136 272 84 Z" fill="#7ba75e" stroke="#3f7f4f" strokeWidth="3" />
      </g>

      {/* 内壁增厚（气孔内侧，两种状态共用位置近似） */}
      <g style={dim(active, 2)}>
        <path d="M247 106 C 236 136, 232 164, 232 190 C 232 216, 236 244, 247 274" stroke="#2f6b42" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M273 106 C 284 136, 288 164, 288 190 C 288 216, 284 244, 273 274" stroke="#2f6b42" strokeWidth="7" fill="none" strokeLinecap="round" />
        <text x="190" y="140" textAnchor="end" fontSize="12.5" fill="#2f6b42" fontWeight="600">内壁增厚</text>
      </g>

      {/* 叶绿体 + 细胞核 */}
      <g style={dim(active, 3)}>
        {[[206, 128], [196, 190], [206, 252], [314, 128], [324, 190], [314, 252]].map(([x, y], index) => (
          <ellipse key={index} cx={x} cy={y} rx="10" ry="6" fill="#4c8f5f" stroke="#2f6b42" strokeWidth="1.6" />
        ))}
      </g>
      <g style={dim(active, 0)}>
        <circle cx="222" cy="190" r="11" fill="#e9def3" stroke="#8a5a8f" strokeWidth="2" />
        <circle cx="298" cy="190" r="11" fill="#e9def3" stroke="#8a5a8f" strokeWidth="2" />
      </g>

      {/* 气孔开口 */}
      <g style={dim(active, 1)}>
        {open ? (
          <>
            <ellipse cx="260" cy="190" rx="11" ry="76" fill="#fbfcf8" stroke="#3f7f4f" strokeWidth="1.5" />
            <text x="260" y="330" textAnchor="middle" fontSize="13.5" fill="#0a626a" fontWeight="700">气孔张开（开口大）</text>
          </>
        ) : (
          <text x="260" y="330" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">气孔闭合（缝隙几乎消失）</text>
        )}
      </g>

      {/* 水分进出箭头 */}
      <g style={dim(active, 0)}>
        {open ? (
          <g className="bio-fade">
            <path d="M152 158 L 186 176 M186 176 L 174 176 M186 176 L 180 165" stroke="#4b7a91" strokeWidth="2.6" fill="none" />
            <path d="M152 222 L 186 204 M186 204 L 174 204 M186 204 L 180 215" stroke="#4b7a91" strokeWidth="2.6" fill="none" />
            <text x="118" y="196" textAnchor="middle" fontSize="13" fill="#4b7a91" fontWeight="600">吸水</text>
          </g>
        ) : (
          <g className="bio-fade">
            <path d="M186 176 L 152 158 M152 158 L 164 158 M152 158 L 158 169" stroke="#b0483a" strokeWidth="2.6" fill="none" />
            <path d="M186 204 L 152 222 M152 222 L 164 222 M152 222 L 158 211" stroke="#b0483a" strokeWidth="2.6" fill="none" />
            <text x="118" y="196" textAnchor="middle" fontSize="13" fill="#b0483a" fontWeight="600">失水</text>
          </g>
        )}
      </g>

      <Badge n={1} x={196} y={70} />
      <Badge n={2} x={260} y={104} />
      <Badge n={3} x={164} y={102} />
      <Badge n={4} x={196} y={222} />
      <Badge n={5} x={72} y={296} />
      <text x="500" y="364" textAnchor="end" fontSize="12.5" fill="#799398">气孔器俯视模式图（一对保卫细胞）</text>
    </svg>
  );
}

function FlowerStructureSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="24" y="34" fontSize="13.5" fill="#2c6e94" fontWeight="700">完全花结构：雄蕊与雌蕊是繁殖的核心——"去雄"杂交就是摘除花药</text>
      {/* 花柄与花托 */}
      <g style={dim(active, 5)}>
        <line x1="260" y1="368" x2="260" y2="262" stroke="#4a8a3a" strokeWidth="10" strokeLinecap="round" />
        <ellipse cx="260" cy="258" rx="40" ry="14" fill="#6aa86a" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="26" y="356" fontSize="13.5" fill="#3f7f3a" fontWeight="700">花柄与花托</text>
        <line x1="112" y1="352" x2="252" y2="340" stroke="#3f7f3a" strokeWidth="1.4" />
      </g>
      {/* 花萼 + 花瓣 */}
      <g style={dim(active, 4)}>
        <path d="M208 252 Q 178 240 186 214 Q 216 222 224 246 Z" fill="#8fbf6f" stroke="#3f7f3a" strokeWidth="2.5" />
        <path d="M312 252 Q 342 240 334 214 Q 304 222 296 246 Z" fill="#8fbf6f" stroke="#3f7f3a" strokeWidth="2.5" />
        <path d="M218 232 Q 140 214 118 158 Q 178 148 226 190 Z" fill="#f2b8c8" stroke="#c9708a" strokeWidth="3" />
        <path d="M302 232 Q 380 214 402 158 Q 342 148 294 190 Z" fill="#f2b8c8" stroke="#c9708a" strokeWidth="3" />
        <text x="30" y="104" fontSize="13.5" fill="#c9708a" fontWeight="700">花瓣（引诱昆虫）</text>
        <line x1="128" y1="110" x2="160" y2="168" stroke="#c9708a" strokeWidth="1.4" />
        <text x="26" y="296" fontSize="13.5" fill="#3f7f3a" fontWeight="700">花萼（保护）</text>
        <line x1="118" y1="292" x2="198" y2="244" stroke="#3f7f3a" strokeWidth="1.4" />
      </g>
      {/* 雄蕊 */}
      <g style={dim(active, 0)}>
        <path d="M238 236 Q 190 214 158 158" fill="none" stroke="#e0b020" strokeWidth="4" />
        <path d="M282 236 Q 330 214 362 158" fill="none" stroke="#e0b020" strokeWidth="4" />
        <ellipse cx="152" cy="150" rx="18" ry="12" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.5" transform="rotate(-28 152 150)" />
        <ellipse cx="368" cy="150" rx="18" ry="12" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.5" transform="rotate(28 368 150)" />
        <text x="24" y="124" fontSize="14" fill="#a58a20" fontWeight="700">花药（产生花粉）</text>
        <line x1="112" y1="128" x2="140" y2="142" stroke="#a58a20" strokeWidth="1.4" />
      </g>
      {/* 雌蕊 */}
      <g style={dim(active, 1)}>
        <ellipse cx="260" cy="186" rx="26" ry="14" fill="#e8d4f2" stroke="#7a4a8a" strokeWidth="3" />
        <line x1="260" y1="200" x2="260" y2="270" stroke="#7a4a8a" strokeWidth="6" />
        <ellipse cx="260" cy="300" rx="46" ry="32" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="3" />
        <circle cx="246" cy="302" r="7" fill="#7a4a8a" />
        <circle cx="274" cy="306" r="7" fill="#7a4a8a" />
        <text x="508" y="142" textAnchor="end" fontSize="14" fill="#6a4a9a" fontWeight="700">柱头（承接花粉）</text>
        <line x1="400" y1="146" x2="284" y2="180" stroke="#7a4a8a" strokeWidth="1.4" />
        <text x="30" y="252" fontSize="14" fill="#6a4a9a" fontWeight="700">花柱</text>
        <line x1="70" y1="248" x2="252" y2="238" stroke="#7a4a8a" strokeWidth="1.4" />
        <text x="490" y="296" textAnchor="end" fontSize="14" fill="#6a4a9a" fontWeight="700">子房（内有胚珠）</text>
        <line x1="392" y1="296" x2="308" y2="300" stroke="#7a4a8a" strokeWidth="1.4" />
      </g>
      <g style={dim(active, 2)}>
        <text x="490" y="330" textAnchor="end" fontSize="14" fill="#8a5a94" fontWeight="700">胚珠（含卵细胞）</text>
        <line x1="392" y1="326" x2="282" y2="306" stroke="#8a5a94" strokeWidth="1.4" />
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">花的结构模式图</text>
    </svg>
  );
}

function CornReproductionSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 茎秆 */}
      <g style={dim(active, 0)}>
        <line x1="140" y1="368" x2="140" y2="58" stroke="#5f9a4a" strokeWidth="14" strokeLinecap="round" />
        <path d="M140 310 Q 52 282 30 196" fill="none" stroke="#5f9a4a" strokeWidth="9" strokeLinecap="round" />
        <path d="M140 252 Q 236 226 262 140" fill="none" stroke="#5f9a4a" strokeWidth="9" strokeLinecap="round" />
        <path d="M140 180 Q 70 158 56 106" fill="none" stroke="#5f9a4a" strokeWidth="9" strokeLinecap="round" />
      </g>
      {/* 顶端雄花序 */}
      <g style={dim(active, 1)}>
        <path d="M140 58 Q 104 40 78 22 M 140 58 Q 140 36 140 16 M 140 58 Q 176 40 202 22 M 140 58 Q 112 30 92 44 M 140 58 Q 168 30 188 44"
          fill="none" stroke="#c9a86a" strokeWidth="6" strokeLinecap="round" />
        {[[78, 22], [140, 16], [202, 22], [92, 44], [188, 44], [118, 34], [162, 34]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.2" />
            <line x1={x - 5} y1={y + 5} x2={x + 5} y2={y - 5} stroke="#b5953a" strokeWidth="1.6" />
          </g>
        ))}
        <text x="20" y="76" fontSize="13.5" fill="#a58a20" fontWeight="700">顶端雄花序</text>
        <text x="20" y="94" fontSize="12.5" fill="#b5953a">花粉多而轻（风媒）</text>
      </g>
      {/* 风与花粉 */}
      <g style={dim(active, 2)}>
        <path d="M28 130 q 20 -9 40 0 q 20 9 40 0" fill="none" stroke="#8aa1a6" strokeWidth="3" strokeLinecap="round" />
        <path d="M38 156 q 20 -9 40 0" fill="none" stroke="#8aa1a6" strokeWidth="3" strokeLinecap="round" />
        <path d="M204 52 Q 300 78 372 148" fill="none" stroke="#e0b020" strokeWidth="2.5" strokeDasharray="7 6" />
        {[[246, 62], [292, 84], [334, 112], [362, 138]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#f4d06a" stroke="#b5953a" strokeWidth="1.6" />
        ))}
        <text x="330" y="72" fontSize="13.5" fill="#a58a20" fontWeight="700">风传花粉 → 落到花柱上</text>
      </g>
      {/* 叶腋雌花序（果穗 + 玉米须） */}
      <g style={dim(active, 3)}>
        <ellipse cx="268" cy="256" rx="52" ry="82" fill="#d9e8b8" stroke="#7a9a3a" strokeWidth="4" />
        <path d="M226 206 Q 268 188 310 206 L 300 316 Q 268 330 236 316 Z" fill="#c9e09a" stroke="#7a9a3a" strokeWidth="2.5" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={268} y1={216 + i * 26} x2={268} y2={238 + i * 26} stroke="#a8c07a" strokeWidth="2" />
        ))}
        <path d="M300 190 Q 344 158 386 176 M 306 206 Q 356 186 396 210 M 310 222 Q 366 214 402 240" fill="none" stroke="#e0c98a" strokeWidth="3.5" strokeLinecap="round" />
        <text x="170" y="352" fontSize="13.5" fill="#7a9a3a" fontWeight="700">叶腋雌花序（果穗）</text>
        <text x="392" y="182" fontSize="13.5" fill="#c9a86a" fontWeight="700">玉米须 = 花柱</text>
        <text x="392" y="200" fontSize="12.5" fill="#a58a4a">一根须对应一粒籽</text>
      </g>
      {/* 受精小图 */}
      <g style={dim(active, 4)}>
        <rect x="360" y="264" width="150" height="76" rx="10" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <ellipse cx="398" cy="302" rx="18" ry="26" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2.5" />
        <circle cx="398" cy="308" r="7" fill="#7a4a8a" />
        <path d="M414 282 Q 424 270 436 270" fill="none" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="428" y="298" fontSize="12.5" fill="#6a4a9a" fontWeight="600">花粉管进入</text>
        <text x="428" y="316" fontSize="12.5" fill="#6a4a9a" fontWeight="600">胚珠完成受精</text>
      </g>
      <text x="244" y="30" fontSize="13.5" fill="#2c6e94" fontWeight="700">玉米：单性花、雌雄同株</text>
      <text x="244" y="50" fontSize="13.5" fill="#2c6e94" fontWeight="700">顶端撒粉 → 风媒 → 叶腋结穗</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">玉米的繁殖（风媒传粉）模式图</text>
    </svg>
  );
}

function FruitAndSeedSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="24" y="40" fontSize="13.5" fill="#2c6e94" fontWeight="700">受精完成后：子房→果实、胚珠→种子——花的结构决定果实的来历</text>
      {/* 玉米籽粒纵切（右侧主体） */}
      <g style={dim(active, 0)}>
        <ellipse cx="350" cy="190" rx="105" ry="125" fill="#f4d9a0" stroke="#b5903a" strokeWidth="4" />
      </g>
      <g style={dim(active, 1)}>
        <ellipse cx="350" cy="190" rx="88" ry="106" fill="#f0c96a" stroke="#d9a83a" strokeWidth="2.5" />
        <text x="350" y="120" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">胚乳（储存营养）</text>
      </g>
      {/* 胚 */}
      <g style={dim(active, 2)}>
        <path d="M378 240 Q 404 228 410 204 Q 420 234 398 252 Z" fill="#8fbf6f" stroke="#3f7f3a" strokeWidth="2.5" />
        <ellipse cx="390" cy="264" rx="11" ry="15" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="2.5" transform="rotate(-16 390 264)" />
        <path d="M378 278 Q 364 294 352 304" fill="none" stroke="#8a6a48" strokeWidth="4" strokeLinecap="round" />
        <text x="490" y="244" textAnchor="end" fontSize="13" fill="#2f7a4d" fontWeight="700">胚：胚芽+胚轴</text>
        <text x="490" y="262" textAnchor="end" fontSize="13" fill="#2f7a4d" fontWeight="700">+胚根+子叶（1 片）</text>
        <line x1="414" y1="248" x2="444" y2="246" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 对应关系（左侧标签 + 短箭头） */}
      <g style={dim(active, 3)}>
        <text x="24" y="108" fontSize="13.5" fill="#b0483a" fontWeight="700">子房壁 → 果皮</text>
        <line x1="132" y1="104" x2="262" y2="114" stroke="#b0483a" strokeWidth="2.2" markerEnd="url(#fs-arrow)" />
        <text x="24" y="146" fontSize="13.5" fill="#b0483a" fontWeight="700">珠被 → 种皮</text>
        <line x1="124" y1="142" x2="256" y2="150" stroke="#b0483a" strokeWidth="2.2" markerEnd="url(#fs-arrow)" />
        <text x="24" y="184" fontSize="13.5" fill="#7a4a8a" fontWeight="700">受精极核 → 胚乳（3n）</text>
        <line x1="196" y1="180" x2="296" y2="142" stroke="#7a4a8a" strokeWidth="2.2" markerEnd="url(#fs-arrow)" />
        <text x="24" y="222" fontSize="13.5" fill="#7a4a8a" fontWeight="700">受精卵 → 胚（2n）</text>
        <path d="M164 218 Q 250 316 366 254" fill="none" stroke="#7a4a8a" strokeWidth="2.2" markerEnd="url(#fs-arrow)" />
      </g>
      {/* 菜豆对比 */}
      <g style={dim(active, 4)}>
        <rect x="24" y="262" width="190" height="76" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <ellipse cx="78" cy="298" rx="20" ry="27" fill="#8fbf6f" stroke="#3f7f3a" strokeWidth="2.5" transform="rotate(-16 78 298)" />
        <ellipse cx="122" cy="298" rx="20" ry="27" fill="#8fbf6f" stroke="#3f7f3a" strokeWidth="2.5" transform="rotate(16 122 298)" />
        <text x="119" y="332" textAnchor="middle" fontSize="12.5" fill="#3f7f3a" fontWeight="600">菜豆：双子叶无胚乳</text>
      </g>
      {/* 底部说明 */}
      <text x="350" y="334" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">玉米籽粒（果实）纵切</text>
      <text x="350" y="354" textAnchor="middle" fontSize="12" fill="#a58a4a">玉米外层是果皮与种皮愈合——一粒玉米其实是果实</text>
      <defs>
        <marker id="fs-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#8a671b" />
        </marker>
      </defs>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">果实与种子的形成（以玉米为例）模式图</text>
    </svg>
  );
}

function AngiospermLifeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">被子植物的一生：种子萌发 → 幼苗生长 → 开花传粉 → 受精 → 果实与种子</text>
      <g style={dim(active, 0)}>
        <rect x="26" y="228" width="96" height="60" fill="#c9b08a" />
        <ellipse cx="74" cy="214" rx="30" ry="22" fill="#e0c9a0" stroke="#b5953a" strokeWidth="2.5" />
        <path d="M74 196 Q 70 178 62 168 M 74 196 Q 80 176 90 170" fill="none" stroke="#4a8a3a" strokeWidth="4" strokeLinecap="round" />
        <text x="74" y="306" textAnchor="middle" fontSize="12.5" fill="#7a5a20" fontWeight="700">种子萌发</text>
        <text x="74" y="324" textAnchor="middle" fontSize="11.5" fill="#a58a4a">吸水 · 胚根成根</text>
        <text x="74" y="340" textAnchor="middle" fontSize="11.5" fill="#a58a4a">胚芽成茎叶</text>
      </g>
      <g style={dim(active, 1)}>
        <rect x="152" y="240" width="96" height="48" fill="#c9b08a" />
        <line x1="200" y1="240" x2="200" y2="164" stroke="#4a8a3a" strokeWidth="5" strokeLinecap="round" />
        {[178, 200].map((y, i) => (
          <ellipse key={i} cx={200 + (i === 0 ? 18 : -18)} cy={y} rx="17" ry="9" fill="#6aa86a" stroke="#3f7f3a" strokeWidth="2" transform={`rotate(${i === 0 ? -16 : 16} ${200 + (i === 0 ? 18 : -18)} ${y})`} />
        ))}
        <text x="200" y="306" textAnchor="middle" fontSize="12.5" fill="#2f7a4d" fontWeight="700">幼苗生长</text>
        <text x="200" y="324" textAnchor="middle" fontSize="11.5" fill="#5a9a5a">根茎叶长全（营养生长）</text>
      </g>
      <g style={dim(active, 2)}>
        <line x1="304" y1="252" x2="304" y2="140" stroke="#4a8a3a" strokeWidth="5" strokeLinecap="round" />
        {[76, 116, 156, 196].map((a, i) => {
          const ang = (a * Math.PI) / 180;
          return (
            <ellipse key={i} cx={304 + Math.cos(ang) * 22} cy={112 + Math.sin(ang) * 22} rx="13" ry="8" fill="#f2b8c8" stroke="#c9708a" strokeWidth="2" transform={`rotate(${a} ${304 + Math.cos(ang) * 22} ${112 + Math.sin(ang) * 22})`} />
          );
        })}
        <circle cx="304" cy="112" r="9" fill="#f4d06a" stroke="#b5953a" strokeWidth="2" />
        <text x="304" y="306" textAnchor="middle" fontSize="12.5" fill="#c9708a" fontWeight="700">开花（生殖生长）</text>
        <text x="304" y="324" textAnchor="middle" fontSize="11.5" fill="#d08aa0">传粉：自花 / 异花</text>
      </g>
      <g style={dim(active, 3)}>
        <line x1="420" y1="252" x2="420" y2="132" stroke="#4a8a3a" strokeWidth="5" strokeLinecap="round" />
        <circle cx="420" cy="112" r="24" fill="#e8a86a" stroke="#b57c3a" strokeWidth="3" />
        <text x="420" y="118" textAnchor="middle" fontSize="12" fill="#7a4a10" fontWeight="700">果实</text>
        <path d="M444 132 Q 462 112 452 96" fill="none" stroke="#8a6a48" strokeWidth="3" strokeLinecap="round" />
        <text x="426" y="306" textAnchor="middle" fontSize="12.5" fill="#b57c3a" fontWeight="700">受精 → 果实与种子</text>
        <text x="426" y="324" textAnchor="middle" fontSize="11.5" fill="#c99a6a">子房→果实 胚珠→种子</text>
      </g>
      <path d="M470 300 Q 500 322 480 344 L 88 344 Q 30 344 40 262" fill="none" stroke="#8aa1a6" strokeWidth="3" strokeDasharray="8 5" markerEnd="url(#ag-arrow)" />
      <text x="258" y="366" textAnchor="middle" fontSize="12.5" fill="#59767c" fontWeight="600">种子再萌发 → 生命循环往复</text>
      <g style={dim(active, 4)}>
        <rect x="26" y="72" width="300" height="56" rx="9" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="42" y="94" fontSize="12.5" fill="#7a5a20" fontWeight="700">萌发自身条件：胚完整且有活力（不在休眠期）</text>
        <text x="42" y="116" fontSize="12" fill="#a58a4a">外界条件：充足水分、适宜温度、充足空气（不需要光）</text>
      </g>
      <defs>
        <marker id="ag-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#8aa1a6" />
        </marker>
      </defs>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">被子植物的一生（课外拓展）</text>
    </svg>
  );
}

function GinkgoSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">银杏：裸子植物活化石——白果是种子，不是果实！</text>
      <g style={dim(active, 0)}>
        <path d="M150 210 Q 96 190 88 128 Q 150 118 208 126 Q 202 192 150 210 Z" fill="#d4e8b8" stroke="#5a8a3a" strokeWidth="3" />
        {[96, 118, 140, 162, 184].map((x, i) => (
          <line key={i} x1="150" y1="204" x2={x} y2={132 + (i % 2) * 8} stroke="#5a8a3a" strokeWidth="1.6" opacity="0.6" />
        ))}
        <line x1="150" y1="204" x2="150" y2="236" stroke="#8a6a48" strokeWidth="5" strokeLinecap="round" />
        <text x="24" y="102" fontSize="13.5" fill="#5a8a3a" fontWeight="700">扇形叶（叶脉二叉分枝）</text>
        <text x="24" y="122" fontSize="12" fill="#7a9a4a">秋季金黄 · 落叶乔木</text>
      </g>
      <g style={dim(active, 1)}>
        <circle cx="330" cy="170" r="34" fill="#e8d9a0" stroke="#b5953a" strokeWidth="3" />
        <circle cx="330" cy="170" r="20" fill="#c9b08a" stroke="#8a671b" strokeWidth="2" />
        <text x="330" y="230" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="700">白果 = 种子（有硬壳）</text>
        <text x="330" y="252" textAnchor="middle" fontSize="12" fill="#a58a4a">外层是种皮，无果皮包被</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="26" y="272" width="468" height="66" rx="9" fill="#eef7ee" stroke="#3f7f3a" strokeWidth="2" />
        <text x="42" y="296" fontSize="13.5" fill="#2f7a4d" fontWeight="700">裸子植物：种子裸露，无果皮包被；受精不需要水</text>
        <text x="42" y="320" fontSize="12" fill="#4a8a4a">雌雄异株：雄树产花粉（风媒传粉），雌树的胚珠裸露发育成种子——种皮之外没有"果肉"</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="300" y="46" width="180" height="56" rx="9" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="390" y="68" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="700">活化石（孑遗植物）</text>
        <text x="390" y="90" textAnchor="middle" fontSize="12" fill="#a58a4a">2 亿年前已出现，堪称"植物界大熊猫"</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">银杏（裸子植物）模式图</text>
    </svg>
  );
}

function CactusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">仙人掌：干旱环境的"储水罐"——叶变刺、茎储水、根广浅</text>
      <rect x="20" y="270" width="480" height="24" fill="#c9b08a" />
      <g style={dim(active, 1)}>
        <path d="M190 270 Q 178 160 190 92 Q 200 68 230 66 Q 300 62 320 92 Q 334 160 322 270 Q 256 286 190 270 Z" fill="#7aa86a" stroke="#3f7f3a" strokeWidth="3.5" />
        {[212, 246, 280, 306].map((x, i) => (
          <line key={i} x1={x} y1="76" x2={x} y2="264" stroke="#5a8a3a" strokeWidth="2.5" opacity="0.6" />
        ))}
        <text x="256" y="300" textAnchor="middle" fontSize="13.5" fill="#3f7f3a" fontWeight="700">肉质茎（储水 + 进行光合作用）</text>
      </g>
      <g style={dim(active, 0)}>
        {[[196, 96], [232, 120], [306, 100], [322, 148], [188, 160], [318, 190], [200, 200], [312, 230], [194, 250]].map(([x, y], i) => (
          <g key={i} stroke="#f4e3c0" strokeWidth="2.5" strokeLinecap="round">
            <line x1={x} y1={y} x2={x - 8} y2={y - 12} />
            <line x1={x} y1={y} x2={x + 2} y2={y - 15} />
            <line x1={x} y1={y} x2={x + 10} y2={y - 11} />
          </g>
        ))}
        <text x="24" y="88" fontSize="13.5" fill="#8a671b" fontWeight="700">叶 → 刺</text>
        <text x="24" y="108" fontSize="12" fill="#a58a4a">大幅减少蒸腾面积</text>
        <text x="24" y="126" fontSize="12" fill="#a58a4a">兼作防御（防动物取食）</text>
      </g>
      <g style={dim(active, 2)}>
        <path d="M240 270 Q 180 296 120 286 M 260 270 Q 330 298 396 288 M 250 270 Q 250 300 250 306" fill="none" stroke="#b5956a" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 8" />
        <text x="404" y="312" textAnchor="end" fontSize="12.5" fill="#a58a4a" fontWeight="600">根系广而浅：雨后快速吸水</text>
      </g>
      <g style={dim(active, 3)}>
        <circle cx="260" cy="52" r="14" fill="#f2b8c8" stroke="#c9708a" strokeWidth="2.5" />
        <circle cx="260" cy="52" r="5" fill="#f4d06a" />
        <text x="298" y="48" fontSize="12.5" fill="#c9708a" fontWeight="600">雨后开花</text>
      </g>
      <g style={dim(active, 0)}>
        <rect x="26" y="316" width="468" height="44" rx="9" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="42" y="334" fontSize="12.5" fill="#7a5a20" fontWeight="700">气孔夜间开放（CAM 途径，课外拓展）：白天高温关闭保水，夜里储 CO₂ 供白天光合</text>
        <text x="42" y="352" fontSize="12" fill="#a58a4a">与大多数植物"白天开气孔"正相反——干旱环境的极致适应</text>
      </g>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">仙人掌（旱生植物）适应模式图</text>
    </svg>
  );
}

function MossFernSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <line x1="272" y1="56" x2="272" y2="300" stroke="#dceaea" strokeWidth="2" strokeDasharray="6 5" />
      {/* 苔藓（左） */}
      <g style={dim(active, 0)}>
        <rect x="30" y="272" width="200" height="30" fill="#8a7a58" />
        {[76, 126, 176].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="272" x2={x} y2="206" stroke="#5a8a3a" strokeWidth="4" strokeLinecap="round" />
            <path d={`M${x - 10} 210 Q ${x} 196 ${x + 10} 210 Q ${x} 220 ${x - 10} 210 Z`} fill="#7aa83a" stroke="#4a7a2a" strokeWidth="2" />
            <ellipse cx={x} cy="192" rx="11" ry="16" fill="#b58a3a" stroke="#8a671b" strokeWidth="2" />
          </g>
        ))}
        <text x="130" y="176" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">孢蒴（孢子繁殖）</text>
        <text x="130" y="88" textAnchor="middle" fontSize="14" fill="#173b42" fontWeight="700">苔藓</text>
        <text x="44" y="322" fontSize="12.5" fill="#59767c" fontWeight="600">假根（固着，不吸水）· 有茎叶无输导组织</text>
        <text x="44" y="342" fontSize="12.5" fill="#59767c" fontWeight="600">叶只有一层细胞 → 监测空气污染的指示植物</text>
      </g>
      {/* 蕨类（右） */}
      <g style={dim(active, 1)}>
        <rect x="302" y="268" width="190" height="34" fill="#8a7a58" />
        <path d="M397 268 L 397 120" stroke="#6a4a2a" strokeWidth="6" strokeLinecap="round" />
        {[[360, 148], [368, 186], [376, 224], [352, 128], [380, 128]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} q 18 -10 36 2 q -18 10 -36 -2 Z`} fill="#5a9a4a" stroke="#3f7f3a" strokeWidth="2" transform={`rotate(${i % 2 === 0 ? -16 : 16} ${x} ${y})`} />
        ))}
        {[[368, 156], [376, 194]].map(([x, y], i) => (
          <g key={i}>
            {[0, 1, 2, 3].map((j) => (
              <circle key={j} cx={x + 22 + (j % 2) * 12} cy={y + j * 7} r="3.5" fill="#8a4a2a" />
            ))}
          </g>
        ))}
        <text x="397" y="96" textAnchor="middle" fontSize="14" fill="#173b42" fontWeight="700">蕨类</text>
        <text x="306" y="322" fontSize="12.5" fill="#59767c" fontWeight="600">真根 · 输导组织 · 叶背孢子囊群</text>
        <text x="306" y="342" fontSize="12.5" fill="#59767c" fontWeight="600">古代蕨类埋入地下 → 今天的煤</text>
      </g>
      {/* 共同点 */}
      <g style={dim(active, 0)}>
        <rect x="26" y="46" width="468" height="40" rx="8" fill="#e7f3e2" stroke="#3f7f3a" strokeWidth="2" />
        <text x="42" y="72" fontSize="13.5" fill="#2f7a4d" fontWeight="700">共同点：用孢子繁殖（不结种子），受精过程离不开水 → 只能生活在阴湿环境</text>
      </g>
      <text x="130" y="56" textAnchor="middle" fontSize="0" fill="none">.</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">苔藓与蕨类（孢子植物）对比模式图</text>
    </svg>
  );
}

export const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {
  amber: { Svg: AmberSvg },
  coconut: { Svg: CoconutSvg },
  guttation: { Svg: GuttationSvg },
  rootNodule: { Svg: RootNoduleSvg },
  etiolation: { Svg: EtiolationSvg },
  peanut: { Svg: PeanutSvg },
  hydrotropism: { Svg: HydrotropismSvg },
  essentialOils: { Svg: EssentialOilsSvg },
  rice: { Svg: RiceSvg },
  aloe: { Svg: AloeSvg },
  welwitschia: { Svg: WelwitschiaSvg },
  lignin: { Svg: LigninSvg },
  tumbleweed: { Svg: TumbleweedSvg },
  fig: { Svg: FigSvg },
  plantSex: { Svg: PlantSexSvg },
  orchid: { Svg: OrchidSvg },
  strawberry: { Svg: StrawberrySvg },
  cacao: { Svg: CacaoSvg },
  lotus: { Svg: LotusSvg },
  magnolia: { Svg: MagnoliaSvg },
  pollinatorDecline: { Svg: PollinatorDeclineSvg },
  autumnLeaves: { Svg: AutumnLeavesSvg },
  giantWaterLily: { Svg: GiantWaterLilySvg },
  tendrilPlant: { Svg: TendrilPlantSvg },
  pollenGrain: { Svg: PollenGrainSvg },
  bark: { Svg: BarkSvg },
  venusFlytrap: { Svg: VenusFlytrapSvg },
  rubberTree: { Svg: RubberTreeSvg },
  c4Plant: { Svg: C4PlantSvg },
  airPlant: { Svg: AirPlantSvg },
  tulipBulb: { Svg: TulipBulbSvg },
  sunflower: { Svg: SunflowerSvg },
  banyanRoots: { Svg: BanyanRootsSvg },
  ethylene: { Svg: EthyleneSvg },
  pollinationTypes: { Svg: PollinationTypesSvg },
  bamboo: { Svg: BambooSvg },
  baobab: { Svg: BaobabSvg },
  camPlant: { Svg: CamPlantSvg },
  caffeine: { Svg: CaffeineSvg },
  dodder: { Svg: DodderSvg },
  mimosa: { Svg: MimosaSvg },
  seedDormancy: { Svg: SeedDormancySvg },
  treeRings: { Svg: TreeRingsSvg },
  seedDispersal: { Svg: SeedDispersalSvg },
  pitcherPlant: { Svg: PitcherPlantSvg },
  plantHormones: { Svg: PlantHormonesSvg },
  fruitTypes: { Svg: FruitTypesSvg },
  organVariants: { Svg: OrganVariantsSvg },
  seedCompare: { Svg: SeedCompareSvg },
  seedlessFruit: { Svg: SeedlessFruitSvg },
  plantTissues: { Svg: PlantTissuesSvg },
  pineCone: { Svg: PineConeSvg },
  rootTypes: { Svg: RootTypesSvg },
  stemStructure: { Svg: StemStructureSvg },
  sieveTube: { Svg: SieveTubeSvg },
  leafBud: { Svg: LeafBudSvg },
  leafCrossSection: { Svg: LeafCrossSectionSvg },
  rootTip: { Svg: RootTipSvg },
  stoma: { Svg: GuardCellSvg, StageWebGL: StomaWebGLModel },
  flowerStructure: { Svg: FlowerStructureSvg },
  cornReproduction: { Svg: CornReproductionSvg },
  fruitAndSeed: { Svg: FruitAndSeedSvg },
  angiospermLife: { Svg: AngiospermLifeSvg },
  ginkgo: { Svg: GinkgoSvg },
  cactus: { Svg: CactusSvg },
  mossFern: { Svg: MossFernSvg },
};
