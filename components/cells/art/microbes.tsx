'use client';

import type { ComponentType } from 'react';
import { Badge, dim, type ArtProps } from '@/components/cells/art-shared';
import { EColiWebGLModel, ParameciumWebGLModel } from '@/components/cells/cell-models-webgl';

function PrionSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 正常 vs 错误折叠 */}
      <g style={dim(active, 0)}>
        <text x="120" y="80" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">正常蛋白 PrPᶜ（可溶·好降解）</text>
        <path d="M70 120 q 20 -26 50 -12 q -6 30 -36 28 q 14 14 34 8 q -20 24 -48 10 q -12 -18 0 -34" fill="none" stroke="#3f8a3f" strokeWidth="6" strokeLinecap="round" />
        <path d="M170 108 q 24 -8 26 14 q 2 20 -22 18 q -18 -2 -12 -20 q 4 -10 12 -10" fill="none" stroke="#3f8a3f" strokeWidth="5" strokeLinecap="round" />
        <text x="120" y="196" fontSize="12" fill="#2f6f2a">结构与功能正常的膜蛋白</text>
      </g>
      <g style={dim(active, 1)}>
        <text x="380" y="80" textAnchor="middle" fontSize="12.5" fill="#a53030" fontWeight="700">错误折叠 PrPˢᶜ（致病朊毒体）</text>
        <path d="M330 120 q 30 -18 56 0 q 22 16 8 38 q -12 20 -38 12 q -28 -8 -26 -32 q 2 -14 14 -18 M356 140 q 16 6 26 -4" fill="none" stroke="#a53030" strokeWidth="6.4" strokeLinecap="round" />
        <text x="380" y="196" textAnchor="middle" fontSize="12" fill="#a53030">诱导正常蛋白"学坏"——链式传染</text>
        <path d="M232 150 L300 150" fill="none" stroke="#8a671b" strokeWidth="3" markerEnd="url(#prionArrow)" />
        <text x="266" y="140" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">接触 → 正常蛋白跟着变坏</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="216" width="448" height="150" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="242" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">挑战中心法则：没有核酸也能"复制"（构象传递）——遗传物质=核酸的结论被迫加注脚</text>
        <text x="260" y="266" textAnchor="middle" fontSize="12" fill="#a5761d">疾病：疯牛病（牛）·库鲁病（食葬习俗）·克雅氏病（人）——海绵样脑病变、无药可治</text>
        <text x="260" y="290" textAnchor="middle" fontSize="12" fill="#a5761d">极端顽固：耐高温高压常规灭菌——手术器械需特殊灭活程序</text>
        <text x="260" y="314" textAnchor="middle" fontSize="11.5" fill="#a5761d">发现者普鲁西纳获 1997 年诺贝尔奖——"离经叛道"的证据最终改写教科书</text>
        <text x="260" y="340" textAnchor="middle" fontSize="11.5" fill="#a5761d">考点辨析：朊病毒≠病毒（无核酸无衣壳）——它是一类错误折叠的蛋白质</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">朊病毒 · 没有核酸的"蛋白质刺客"（课外拓展）</text>
      <defs>
        <marker id="prionArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 L6 3 L0 6 Z" fill="#8a671b" />
        </marker>
      </defs>
    </svg>
  );
}

function PenicillinSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 培养皿与抑菌圈 */}
      <g style={dim(active, 0)}>
        <circle cx="170" cy="180" r="110" fill="#f2e8d8" stroke="#8a7a5a" strokeWidth="3" />
        <circle cx="170" cy="180" r="100" fill="#e8d8c0" stroke="#b09a72" strokeWidth="1.6" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => {
          const ang = (i * 2.399) % (Math.PI * 2);
          const rr = 22 + (i % 4) * 22;
          return <circle key={i} cx={170 + Math.cos(ang) * rr} cy={180 + Math.sin(ang) * rr} r="4" fill="#b09a72" opacity="0.7" />;
        })}
        <circle cx="170" cy="180" r="34" fill="#fdf8ea" stroke="#c9a03a" strokeWidth="2" />
        <text x="170" y="288" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">抑菌圈：青霉周围细菌全灭</text>
      </g>
      {/* 青霉放大 */}
      <g style={dim(active, 1)}>
        <path d="M392 70 L392 150" fill="none" stroke="#4a7a3a" strokeWidth="5" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const ang = -1.4 + i * 0.56;
          return <path key={i} d={`M392 ${92 + i * 8} q ${Math.cos(ang) * 26} -12 ${Math.cos(ang) * 40} -26`} fill="none" stroke="#5a9a3a" strokeWidth="3.4" strokeLinecap="round" />;
        })}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const ang = -1.4 + i * 0.56;
          const tx = 392 + Math.cos(ang) * 40;
          const ty = 92 + i * 8 - 26;
          return <circle key={`c${i}`} cx={tx} cy={ty} r="4" fill="#8ec97a" stroke="#3f7f3a" strokeWidth="1.6" />;
        })}
        <text x="392" y="46" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">青霉：帚状分生孢子梗</text>
        <text x="330" y="196" fontSize="12" fill="#3f7f3a" fontWeight="700">孢子=青绿色的"霉点"</text>
        <rect x="300" y="216" width="196" height="90" rx="10" fill="#eef4fb" stroke="#5a7aa5" strokeWidth="2.2" />
        <text x="398" y="238" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">杀菌原理（考点）</text>
        <text x="398" y="258" textAnchor="middle" fontSize="11.5" fill="#37585f">抑制细菌细胞壁（肽聚糖）合成</text>
        <text x="398" y="277" textAnchor="middle" fontSize="11.5" fill="#37585f">细菌吸水膨胀"撑破"死亡</text>
        <text x="398" y="296" textAnchor="middle" fontSize="11" fill="#59767c">人体细胞无细胞壁——所以基本不伤己</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="318" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">偶然中的必然：弗莱明休假回来发现"霉斑周围的葡萄球菌死了"——他没有放过这个"意外"</text>
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#a5761d">弗洛里与钱恩把它做成药物（1941）——三人共获 1945 年诺贝尔奖，抗生素时代开启</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">滥用催生"超级细菌"——抗生素只对细菌有效，对病毒（如流感）无效！</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">青霉素 · 改变世界的"霉运"（课外拓展）</text>
    </svg>
  );
}

function TuberculosisSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 结核杆菌 */}
      <g style={dim(active, 0)}>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${140 + i * 55} ${140 + (i % 2) * 24} q 18 -10 40 -2`} fill="none" stroke="#a56a3a" strokeWidth="7" strokeLinecap="round" />
        ))}
        <text x="52" y="90" fontSize="12.5" fill="#8a4a1a" fontWeight="700">结核分枝杆菌（抗酸染色红色）</text>
        <text x="46" y="66" fontSize="12" fill="#8a4a1a">细胞壁含"分枝菌酸"·脂质丰富</text>
      </g>
      {/* 感染特点 */}
      <g style={dim(active, 1)}>
        <path d="M120 230 q 60 -40 120 -20" fill="none" stroke="#c9d8b0" strokeWidth="16" strokeLinecap="round" opacity="0.9" />
        <text x="52" y="200" fontSize="12.5" fill="#4a6a2a" fontWeight="700">经呼吸道入侵 → 肺部"潜伏"</text>
        <text x="52" y="222" fontSize="12" fill="#4a6a2a">全世界约 1/4 人口携带潜伏感染</text>
        <text x="52" y="244" fontSize="12" fill="#4a6a2a">免疫力下降时"复活"发病</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="272" width="440" height="94" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="298" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">历史："白色瘟疫"曾是不治之症——1943 年链霉素的发现开启化疗时代</text>
        <text x="260" y="322" textAnchor="middle" fontSize="11.5" fill="#a5761d">卡介苗（BCG）：减毒活疫苗·保护儿童重症结核（与卡介苗"留疤"现象）</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#a5761d">耐药结核：不规范用药"训练"出的超级结核菌——必须足量足疗程规范治疗</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">结核杆菌 · 细菌性传染病之王（课外拓展）</text>
    </svg>
  );
}

function SlimeMoldSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 食物点 */}
      <g style={dim(active, 0)}>
        <circle cx="90" cy="90" r="18" fill="#f4d06a" stroke="#8a671b" strokeWidth="2.6" />
        <circle cx="430" cy="290" r="18" fill="#f4d06a" stroke="#8a671b" strokeWidth="2.6" />
        <circle cx="300" cy="70" r="12" fill="#f4d06a" stroke="#8a671b" strokeWidth="2.2" />
        <circle cx="140" cy="290" r="12" fill="#f4d06a" stroke="#8a671b" strokeWidth="2.2" />
        <text x="60" y="60" fontSize="10.5" fill="#8a671b" fontWeight="700">燕麦片（食物源）</text>
      </g>
      {/* 黏菌网络 */}
      <g style={dim(active, 1)}>
        <path d="M108 96 Q 200 40 288 68 M 312 74 Q 380 120 418 274 M 108 104 Q 180 180 284 240 Q 380 274 412 286 M 152 292 Q 240 250 280 242 M 104 108 Q 120 200 138 278" fill="none" stroke="#e8c930" strokeWidth="7" strokeLinecap="round" opacity="0.85" />
        <path d="M112 100 Q 200 46 286 70 M 416 280 Q 320 268 286 242 M 142 284 Q 170 200 226 160" fill="none" stroke="#f4e060" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        <text x="196" y="168" fontSize="12.5" fill="#8a671b" fontWeight="700">原生质团：一整片"会流动"的多核细胞</text>
        <text x="196" y="190" fontSize="12" fill="#a5761d">自动删掉绕路的细管·保留主干</text>
      </g>
      {/* 铁路网实验 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="312" width="440" height="56" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="334" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">东京铁路网实验：食物摆成城市站点——黏菌织出的网络与真实地铁图高度相似</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">没有大脑却会"路径优化"——原生生物的群体智能（趋向营养·避开关照）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">黏菌 · 无脑的"规划师"（课外拓展）</text>
    </svg>
  );
}

function CordycepsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 蝙蝠蛾幼虫体 */}
      <g style={dim(active, 0)}>
        <path d="M120 240 q 10 -34 60 -36 q 90 -4 170 2 q 40 4 40 30 q 0 28 -44 32 q -110 8 -170 0 q -50 -6 -56 -28 Z" fill="#d8c9a0" stroke="#8a7a4a" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path key={i} d={`M${170 + i * 24} 216 h 8 m -8 44 h 8`} stroke="#a5966a" strokeWidth="2.4" />
        ))}
        <circle cx="134" cy="226" r="4" fill="#5a4a2a" />
        <text x="46" y="168" fontSize="12.5" fill="#8a7a4a" fontWeight="700">蝙蝠蛾幼虫（虫体 = "冬虫"）</text>
        <text x="46" y="188" fontSize="12.5" fill="#8a7a4a">土中越冬时被真菌侵入</text>
      </g>
      {/* 子座 */}
      <g style={dim(active, 1)}>
        <path d="M300 206 q 6 -60 20 -88 q 14 -26 30 -30" fill="none" stroke="#8a6a3a" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="352" cy="80" rx="18" ry="28" fill="#8a6a3a" stroke="#5a4a2a" strokeWidth="2.4" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={348 + (i % 2) * 8} cy={64 + i * 12} r="3" fill="#4a3a1a" />
        ))}
        <text x="384" y="88" fontSize="12.5" fill="#5a4a2a" fontWeight="700">子座（"草"部分）</text>
        <text x="384" y="108" fontSize="12.5" fill="#5a4a2a">顶端布满子囊·散播孢子</text>
      </g>
      {/* 机制 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="60" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">"僵尸真菌"：孢子侵入幼虫 → 菌丝耗尽虫体组织 → 次年夏从虫头抽出子座</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">寄生关系：真菌获得养分与"移动寄主"，昆虫死亡——冬虫夏草 = 虫菌复合体</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">冬虫夏草 · 真菌的寄生智慧（课外拓展）</text>
    </svg>
  );
}

function BiogasSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 池体 */}
      <g style={dim(active, 0)}>
        <path d="M110 160 q 0 -70 150 -70 q 150 0 150 70 l 0 90 q 0 40 -150 40 q -150 0 -150 -40 Z" fill="#b5a582" stroke="#7a6a4a" strokeWidth="3" />
        <ellipse cx="260" cy="160" rx="150" ry="38" fill="#d8c9a0" stroke="#7a6a4a" strokeWidth="2.6" />
        <path d="M120 162 q 140 34 280 0" fill="none" stroke="#a5824a" strokeWidth="2" strokeDasharray="6 4" />
        <text x="260" y="270" textAnchor="middle" fontSize="12.5" fill="#6a5a2a" fontWeight="700">发酵池（密闭·无氧）</text>
        <text x="260" y="290" textAnchor="middle" fontSize="11.5" fill="#8a7a4a">秸秆+粪便+生活污水 = 原料</text>
      </g>
      {/* 产气与利用 */}
      <g style={dim(active, 1)}>
        <path d="M410 140 q 30 -30 30 -66" fill="none" stroke="#3f7f3a" strokeWidth="6" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={442 + i * 3} cy={58 - i * 12} r="6" fill="#7ab86a" opacity="0.85" />
        ))}
        <rect x="400" y="40" width="84" height="34" rx="8" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="442" y="62" textAnchor="middle" fontSize="10.5" fill="#2f6f2a" fontWeight="700">沼气 → 灶台</text>
        <text x="414" y="132" fontSize="11" fill="#3f7f3a" fontWeight="600">甲烷 60~70%</text>
      </g>
      {/* 甲烷菌 */}
      <g style={dim(active, 2)}>
        <circle cx="180" cy="160" r="10" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="1.6" />
        <circle cx="220" cy="172" r="8" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="1.4" />
        <circle cx="340" cy="168" r="9" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="1.4" />
        <text x="52" y="130" fontSize="12.5" fill="#3f7f3a" fontWeight="700">产甲烷菌（严格厌氧古菌）</text>
        <text x="52" y="112" fontSize="12.5" fill="#3f7f3a" fontWeight="700">氧气会使它"窒息"</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="312" width="440" height="54" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="334" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">生态农业闭环：废物 → 能源 + 优质有机肥（沼渣沼液还田）</text>
        <text x="260" y="354" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">物质循环再生原理的应用——农村清洁能源与卫生防疫双收益</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">沼气池 · 微生物"发电站"（课外拓展）</text>
    </svg>
  );
}

function MycorrhizaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 植物 */}
      <g style={dim(active, 0)}>
        <path d="M260 190 v -100 m 0 0 q -34 -10 -52 -38 m 52 38 q 34 -10 52 -38 m -52 38 q -4 -34 0 -52" fill="none" stroke="#3f7f3a" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="200" cy="46" rx="28" ry="16" fill="#6aa85a" stroke="#2f6f2a" strokeWidth="2" />
        <ellipse cx="320" cy="46" rx="28" ry="16" fill="#6aa85a" stroke="#2f6f2a" strokeWidth="2" />
        <ellipse cx="260" cy="32" rx="30" ry="17" fill="#7ab86a" stroke="#2f6f2a" strokeWidth="2" />
        <path d="M260 190 q -10 -30 -30 -44 m 30 44 q 10 -30 30 -44" fill="none" stroke="#b88a5a" strokeWidth="4" />
        <text x="238" y="168" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">植物根</text>
      </g>
      {/* 菌丝网络 */}
      <g style={dim(active, 1)}>
        <path d="M230 190 q -60 20 -110 12 m 118 -24 q -30 -14 -46 -40 m 156 52 q 60 22 116 10 m -110 -28 q 34 -16 48 -44" fill="none" stroke="#c9a05a" strokeWidth="2.6" />
        <path d="M120 202 q -20 14 -18 34 m 118 -58 q -12 -18 -8 -36 m 190 44 q 22 12 26 32 m -34 -60 q 12 -20 6 -38" fill="none" stroke="#d8b078" strokeWidth="2" />
        <text x="46" y="264" fontSize="12.5" fill="#a5763a" fontWeight="700">菌丝延伸到根毛够不到的地方</text>
        <text x="46" y="284" fontSize="12.5" fill="#a5763a">吸收面积放大数百倍</text>
      </g>
      {/* 交换 */}
      <g style={dim(active, 2)}>
        <rect x="300" y="236" width="180" height="60" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="390" y="258" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">互利共生"以物易物"</text>
        <text x="390" y="278" textAnchor="middle" fontSize="11" fill="#3f7f3a">植物给糖 · 真菌给水与磷</text>
      </g>
      {/* 木维网 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="316" width="440" height="50" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="336" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">地下菌丝网络连通整片森林（"木维网"）：可传递养分甚至预警信号</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">约 90% 的陆生植物都有菌根——植物登陆的"功臣"之一</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">菌根 · 真菌与根的地下联盟（课外拓展）</text>
    </svg>
  );
}

function AntibioticSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 青霉素抑菌圈 */}
      <g style={dim(active, 0)}>
        <circle cx="180" cy="140" r="90" fill="#e8f0dc" stroke="#6a8a3a" strokeWidth="2.4" opacity="0.75" />
        <circle cx="180" cy="140" r="22" fill="#f4d06a" stroke="#8a671b" strokeWidth="2.4" />
        <text x="180" y="145" textAnchor="middle" fontSize="9.5" fill="#8a671b" fontWeight="700">药敏纸片</text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle key={i} cx={290 + (i % 3) * 46} cy={96 + Math.floor(i / 3) * 44} r="12" fill="#c9d8e8" stroke="#2c5a84" strokeWidth="1.6" />
        ))}
        <text x="404" y="180" fontSize="12.5" fill="#2c5a84" fontWeight="700">抑菌圈 = 抗生素浓度</text>
        <text x="404" y="200" fontSize="12.5" fill="#2c5a84">足以抑制细菌的区域</text>
        <text x="56" y="252" fontSize="12.5" fill="#4a6a2a" fontWeight="700">青霉菌分泌物（青霉素）抑制周围细菌生长</text>
      </g>
      {/* 作用机制 */}
      <g style={dim(active, 1)}>
        <rect x="40" y="270" width="440" height="34" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="260" y="292" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">青霉素：抑制肽聚糖合成 → 细菌无法建细胞壁 → 吸水胀破（人细胞无细胞壁故不受害）</text>
      </g>
      {/* 耐药性 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="316" width="440" height="50" rx="10" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.4" />
        <text x="260" y="336" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="800">滥用抗生素的选择作用 → 耐药菌存活并繁殖 → "超级细菌"</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5533c">对策：遵医嘱足量足疗程 · 不滥用 · 研发新药（噬菌体疗法是新方向）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">抗生素 · 人类的"化学武器"（课外拓展）</text>
    </svg>
  );
}

function MicrobiomeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 肠道 */}
      <g style={dim(active, 0)}>
        <path d="M90 110 Q 250 54 410 110 Q 456 128 448 180 Q 440 240 350 250 Q 200 266 120 240 Q 60 220 66 170 Q 70 130 90 110 Z" fill="#e8c9a0" stroke="#a5763a" strokeWidth="3" />
        <path d="M100 130 Q 250 84 400 130" fill="none" stroke="#c9a05a" strokeWidth="2" opacity="0.7" />
        <text x="250" y="306" textAnchor="middle" fontSize="12.5" fill="#a5763a" fontWeight="700">人的肠道：约 100 万亿细菌共生（人体细胞的 3 倍以上）</text>
      </g>
      {/* 菌群构成 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={`g${i}`} cx={140 + (i % 3) * 52} cy={150 + Math.floor(i / 3) * 40} r="11" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="1.8" />
        ))}
        <text x="316" y="158" fontSize="12.5" fill="#3f7f3a" fontWeight="700">有益菌（双歧杆菌·乳酸菌）</text>
        <text x="316" y="178" fontSize="12.5" fill="#3f7f3a">合成维生素 K·B 族·促进免疫</text>
        <text x="88" y="222" fontSize="12.5" fill="#8a5a3a" fontWeight="700">菌群失衡（有害菌占优）→ 腹泻·肥胖·过敏风险↑</text>
      </g>
      {/* 功能 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="322" width="440" height="44" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="260" y="340" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">"第二基因组"：帮助消化（分解纤维素）· 训练免疫系统 · 甚至影响情绪（肠-脑轴）</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">膳食纤维 = 益生菌的"口粮"（益生元）· 酸奶泡菜 = 补充益生菌的传统智慧</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">肠道菌群 · 人体微生物组（课外拓展）</text>
    </svg>
  );
}

function GramStainSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 革兰氏阳性（左） */}
      <g style={dim(active, 0)}>
        <rect x="14" y="56" width="230" height="230" rx="14" fill="#e8e4f4" stroke="#5a4a8a" strokeWidth="2.4" />
        <text x="129" y="82" textAnchor="middle" fontSize="13" fill="#4a3a7a" fontWeight="800">革兰氏阳性（G⁺）</text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={48 + (i % 3) * 42} cy={112 + Math.floor(i / 3) * 52} r="14" fill="#6a3a9a" stroke="#4a2a6a" strokeWidth="2" />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={100 + i * 38} y={100 + i * 8} width="30" height="12" rx="6" fill="#6a3a9a" stroke="#4a2a6a" strokeWidth="1.8" />
        ))}
        <text x="129" y="196" textAnchor="middle" fontSize="11.5" fill="#4a3a7a" fontWeight="700">结晶紫染色后不被脱色（保留紫色）</text>
        <text x="129" y="216" textAnchor="middle" fontSize="11" fill="#4a3a7a">细胞壁：肽聚糖层厚（20~80nm）</text>
        <text x="129" y="236" textAnchor="middle" fontSize="11" fill="#4a3a7a">对青霉素敏感</text>
        <text x="129" y="264" textAnchor="middle" fontSize="12" fill="#6a4a8a" fontWeight="600">例：金黄色葡萄球菌·链球菌</text>
      </g>
      {/* 革兰氏阴性（右） */}
      <g style={dim(active, 1)}>
        <rect x="276" y="56" width="230" height="230" rx="14" fill="#f8e4e0" stroke="#a54838" strokeWidth="2.4" />
        <text x="391" y="82" textAnchor="middle" fontSize="13" fill="#8a3a2a" fontWeight="800">革兰氏阴性（G⁻）</text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={306 + (i % 3) * 42} y={110 + Math.floor(i / 3) * 52} width="34" height="13" rx="6.5" fill="#d85a4a" stroke="#a53a2a" strokeWidth="2" />
        ))}
        <text x="391" y="196" textAnchor="middle" fontSize="11.5" fill="#8a3a2a" fontWeight="700">结晶紫染色后被脱色（复染为红色）</text>
        <text x="391" y="216" textAnchor="middle" fontSize="11" fill="#8a3a2a">细胞壁：肽聚糖层薄（2~7nm）+外膜</text>
        <text x="391" y="236" textAnchor="middle" fontSize="11" fill="#8a3a2a">对青霉素不敏感（有β-内酰胺酶）</text>
        <text x="391" y="264" textAnchor="middle" fontSize="12" fill="#a5533c" fontWeight="600">例：大肠杆菌·铜绿假单胞菌</text>
      </g>
      {/* 区分意义 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="300" width="440" height="52" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="322" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">意义：革兰氏染色是细菌分类鉴定和选择抗生素的重要依据</text>
        <text x="260" y="342" textAnchor="middle" fontSize="11" fill="#a5761d">G⁺ 对青霉素敏感 · G⁻ 对青霉素不敏感（需用其他抗生素）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">革兰氏染色对比 · 细菌分类（课外拓展）</text>
    </svg>
  );
}

function FoodPreservationSvg({ active }: { active: number | null; open?: boolean }) {
  const methods = [
    { icon: '🥫', title: '罐藏·高温灭菌', note: '高温杀死微生物后密封——隔绝空气与污染' },
    { icon: '🧊', title: '冷藏·冷冻', note: '低温抑制微生物的繁殖（不能杀灭）' },
    { icon: '🧂', title: '腌制·糖渍', note: '高盐高糖使微生物脱水（渗透失水）' },
    { icon: '🍇', title: '晒干·脱水', note: '除去水分——微生物繁殖离不开水' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 核心原理 */}
      <g style={dim(active, 0)}>
        <rect x="40" y="36" width="440" height="52" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="58" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="800">食品腐败的根源：微生物的生长繁殖</text>
        <text x="260" y="78" textAnchor="middle" fontSize="11.5" fill="#a5761d">保存原理：杀菌（杀灭微生物）或抑菌（抑制其繁殖）</text>
      </g>
      {/* 四种方法 */}
      {methods.map((m, i) => {
        const x = 26 + (i % 2) * 244;
        const y = 116 + Math.floor(i / 2) * 92;
        return (
          <g key={m.title} style={dim(active, i + 1)}>
            <rect x={x} y={y} width="228" height="76" rx="12" fill="#ffffff" stroke="#13333a" strokeWidth="2.2" />
            <text x={x + 18} y={y + 34} fontSize="22">{m.icon}</text>
            <text x={x + 56} y={y + 30} fontSize="13" fill="#13333a" fontWeight="800">{m.title}</text>
            <text x={x + 56} y={y + 54} fontSize="10.5" fill="#59767c">{m.note}</text>
          </g>
        );
      })}
      {/* 巴氏消毒提示 */}
      <g style={dim(active, 0)}>
        <rect x="26" y="316" width="468" height="46" rx="12" fill="#eaf4ea" stroke="#4a8a3a" strokeWidth="2.2" />
        <text x="260" y="336" textAnchor="middle" fontSize="12" fill="#2f7a4d" fontWeight="800">巴氏消毒法（60~70°C 加热 30 分钟）：既杀菌又保留风味——牛奶常用</text>
        <text x="260" y="354" textAnchor="middle" fontSize="11.5" fill="#4a7a3a">发明者正是巴斯德——"微生物学之父"的日常遗产</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">食品保存原理 · 杀菌与抑菌（课外拓展）</text>
    </svg>
  );
}

function LichenSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 岩石 */}
      <g style={dim(active, 3)}>
        <path d="M20 320 Q 120 284 240 310 T 500 302 L 500 380 L 20 380 Z" fill="#d8ccb8" stroke="#a5987a" strokeWidth="2.5" />
        <text x="486" y="368" textAnchor="end" fontSize="12.5" fill="#8a7a58">裸岩（地衣是拓荒先锋）</text>
      </g>
      {/* 地衣体（叶状） */}
      <g style={dim(active, 0)}>
        <path d="M120 300 Q 90 260 140 244 Q 130 210 190 216 Q 210 184 262 200 Q 300 182 330 216 Q 382 206 396 248 Q 430 258 408 292 Q 330 316 260 306 Q 180 316 120 300 Z" fill="#a8c98a" stroke="#5a7a3a" strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={168 + i * 62} cy={248 + (i % 2) * 18} r="10" fill="#8ab86a" stroke="#5a7a3a" strokeWidth="1.8" />
        ))}
        <text x="250" y="256" textAnchor="middle" fontSize="13" fill="#3f5a1e" fontWeight="800">叶状地衣体</text>
      </g>
      {/* 真菌菌丝 */}
      <g style={dim(active, 1)}>
        <path d="M160 288 Q 200 276 240 288 M240 288 Q 290 300 340 286" fill="none" stroke="#8a671b" strokeWidth="2.6" />
        <path d="M180 268 q 10 12 26 8 M300 262 q 12 14 28 6" fill="none" stroke="#8a671b" strokeWidth="2" />
        <text x="342" y="330" fontSize="13" fill="#8a671b" fontWeight="700">真菌菌丝（吸水·提供"房子"）</text>
        <line x1="352" y1="322" x2="312" y2="292" stroke="#8a671b" strokeWidth="1.4" />
      </g>
      {/* 藻类细胞 */}
      <g style={dim(active, 2)}>
        <circle cx="180" cy="238" r="9" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="1.8" />
        <circle cx="300" cy="228" r="9" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="1.8" />
        <circle cx="244" cy="222" r="9" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="1.8" />
        <text x="40" y="212" fontSize="13" fill="#2f7a4d" fontWeight="700">藻类细胞（光合供糖）</text>
        <line x1="130" y1="218" x2="170" y2="234" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 共生说明 */}
      <g style={dim(active, 4)}>
        <rect x="60" y="60" width="400" height="60" rx="12" fill="#f4f8ea" stroke="#5a7a3a" strokeWidth="2.4" />
        <text x="260" y="84" textAnchor="middle" fontSize="12.5" fill="#3f5a1e" fontWeight="800">真菌 + 藻类 = 地衣（互利共生的"复合生物"）</text>
        <text x="260" y="106" textAnchor="middle" fontSize="12" fill="#5a7a3a">藻光合供糖 · 真菌吸水保物 · 能在裸岩极地生存</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">地衣结构模式图 · 互利共生（课外拓展）</text>
    </svg>
  );
}

function BacteriaShapesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 球菌（左） */}
      <g style={dim(active, 0)}>
        <rect x="14" y="70" width="150" height="200" rx="12" fill="#eaf2f8" stroke="#7a9ac9" strokeWidth="2.2" />
        {[[50, 110], [86, 118], [122, 106], [58, 156], [104, 162], [128, 200], [70, 210], [100, 236]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="15" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="2" />
        ))}
        <text x="89" y="64" textAnchor="middle" fontSize="13.5" fill="#2c5a84" fontWeight="800">球菌（球形）</text>
        <text x="89" y="296" textAnchor="middle" fontSize="12" fill="#2c5a84">如：金黄色葡萄球菌</text>
      </g>
      {/* 杆菌（中） */}
      <g style={dim(active, 1)}>
        <rect x="182" y="70" width="150" height="200" rx="12" fill="#e8f2ea" stroke="#4a9a5a" strokeWidth="2.2" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={200 + (i % 2) * 26} y={104 + i * 54} width="66" height="26" rx="13" fill="#b8e2c8" stroke="#3f7f3a" strokeWidth="2" />
            {[0, 1, 2, 3].map((j) => (
              <line key={j} x1={212 + (i % 2) * 26 + j * 14} y1={106 + i * 54} x2={212 + (i % 2) * 26 + j * 14} y2={128 + i * 54} stroke="#3f7f3a" strokeWidth="1.2" opacity="0.6" />
            ))}
          </g>
        ))}
        <text x="257" y="64" textAnchor="middle" fontSize="13.5" fill="#2f7a3a" fontWeight="800">杆菌（杆形）</text>
        <text x="257" y="296" textAnchor="middle" fontSize="12" fill="#2f7a3a">如：大肠杆菌、结核杆菌</text>
      </g>
      {/* 螺旋菌（右） */}
      <g style={dim(active, 2)}>
        <rect x="350" y="70" width="150" height="200" rx="12" fill="#f4eef8" stroke="#7a4a8a" strokeWidth="2.2" />
        {[0, 1].map((i) => (
          <path key={i} d={`M${382 + i * 70} 110 q 28 20 0 44 q -28 24 0 46 q 24 18 4 42`} fill="none" stroke="#c9a8e2" strokeWidth="12" strokeLinecap="round" />
        ))}
        <text x="425" y="64" textAnchor="middle" fontSize="13.5" fill="#6a3a7a" fontWeight="800">螺旋菌（螺旋形）</text>
        <text x="425" y="296" textAnchor="middle" fontSize="12" fill="#6a3a7a">如：霍乱弧菌（弧形）</text>
      </g>
      {/* 共同点 */}
      <g style={dim(active, 3)}>
        <rect x="60" y="300" width="400" height="46" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="322" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">共同点：都是原核生物——没有以核膜为界限的细胞核，只有 DNA 集中的核区</text>
        <text x="260" y="340" textAnchor="middle" fontSize="11.5" fill="#8a671b">细胞壁含肽聚糖 · 二分裂增殖</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">细菌的三种基本形态（按外形分类）</text>
    </svg>
  );
}

function ChlamydomonasSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 鞭毛 */}
      <g style={dim(active, 0)}>
        <path d="M196 128 Q 130 96 66 88" fill="none" stroke="#4a9a6a" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M204 112 Q 148 66 96 40" fill="none" stroke="#4a9a6a" strokeWidth="4.5" strokeLinecap="round" />
        <text x="24" y="36" fontSize="13" fill="#2f7a4d" fontWeight="700">鞭毛（等长 2 条，游动）</text>
        <line x1="92" y1="44" x2="140" y2="72" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 细胞壁与轮廓 */}
      <g style={dim(active, 1)}>
        <ellipse cx="250" cy="190" rx="128" ry="98" fill="#e4f2dc" stroke="#3f7f3a" strokeWidth="3.5" />
        <text x="368" y="140" fontSize="13" fill="#3f7f3a" fontWeight="700">细胞壁（纤维素·门卫）</text>
        <line x1="364" y1="146" x2="336" y2="160" stroke="#3f7f3a" strokeWidth="1.4" />
      </g>
      {/* 杯状叶绿体 */}
      <g style={dim(active, 2)}>
        <path d="M250 108 Q 150 116 148 200 Q 146 276 250 274 Q 354 276 352 200 Q 350 116 250 108 Z M250 150 Q 190 156 188 200 Q 186 246 250 244 Q 314 246 312 200 Q 310 156 250 150 Z" fill="#8ab86a" fillRule="evenodd" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="24" y="216" fontSize="13" fill="#2f7a4d" fontWeight="700">杯状叶绿体</text>
        <text x="24" y="234" fontSize="12.5" fill="#2f7a4d">（光合自养）</text>
        <line x1="112" y1="222" x2="150" y2="214" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 蛋白核 */}
      <g style={dim(active, 3)}>
        <circle cx="250" cy="238" r="17" fill="#f4f0e2" stroke="#8a671b" strokeWidth="2.5" />
        <text x="332" y="252" fontSize="13" fill="#8a671b" fontWeight="700">蛋白核（储藏淀粉）</text>
        <line x1="328" y1="246" x2="269" y2="238" stroke="#8a671b" strokeWidth="1.4" />
      </g>
      {/* 细胞核 */}
      <g style={dim(active, 4)}>
        <circle cx="250" cy="188" r="15" fill="#e0c8ee" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="342" y="186" fontSize="13" fill="#6a4a9a" fontWeight="700">细胞核</text>
        <line x1="338" y1="188" x2="266" y2="188" stroke="#6a4a9a" strokeWidth="1.4" />
      </g>
      {/* 眼点 + 伸缩泡 */}
      <g style={dim(active, 5)}>
        <circle cx="212" cy="128" r="7" fill="#c94a3a" stroke="#8a2a1a" strokeWidth="2" />
        <text x="104" y="118" fontSize="13" fill="#8a2a1a" fontWeight="700">眼点（感光·趋光）</text>
        <line x1="166" y1="122" x2="203" y2="126" stroke="#8a2a1a" strokeWidth="1.4" />
        <circle cx="288" cy="122" r="6" fill="#cfe2ee" stroke="#3d7e9e" strokeWidth="2" />
        <text x="318" y="106" fontSize="12.5" fill="#2c6e94" fontWeight="600">伸缩泡</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">衣藻结构模式图 · 单细胞绿藻，有叶绿体能自养</text>
    </svg>
  );
}

function MushroomSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 土壤 */}
      <g style={dim(active, 3)}>
        <path d="M0 318 L520 318 L520 380 L0 380 Z" fill="#d9c9a8" />
        <text x="506" y="370" textAnchor="end" fontSize="12.5" fill="#8a7a58">土壤（枯枝落叶等有机物）</text>
      </g>
      {/* 菌丝体 */}
      <g style={dim(active, 3)}>
        <path d="M250 306 Q 190 322 118 344" fill="none" stroke="#e8dcc8" strokeWidth="3" />
        <path d="M250 306 Q 260 330 190 356" fill="none" stroke="#e8dcc8" strokeWidth="3" />
        <path d="M250 306 Q 316 324 396 340" fill="none" stroke="#e8dcc8" strokeWidth="3" />
        <path d="M250 306 Q 244 336 316 356" fill="none" stroke="#e8dcc8" strokeWidth="3" />
        <path d="M250 306 Q 282 318 350 326" fill="none" stroke="#e8dcc8" strokeWidth="2.4" />
        <text x="26" y="342" fontSize="13" fill="#5f6a4a" fontWeight="700">营养菌丝</text>
        <text x="26" y="360" fontSize="12.5" fill="#5f6a4a">（吸收有机养分）</text>
        <line x1="130" y1="348" x2="160" y2="342" stroke="#5f6a4a" strokeWidth="1.4" />
      </g>
      {/* 菌柄 */}
      <g style={dim(active, 2)}>
        <path d="M232 148 Q 226 240 224 306 L276 306 Q 274 240 268 148 Z" fill="#f6efe2" stroke="#b5a582" strokeWidth="3" />
        <text x="58" y="236" fontSize="13.5" fill="#8a7a4a" fontWeight="700">菌柄（支撑）</text>
        <line x1="146" y1="232" x2="228" y2="228" stroke="#8a7a4a" strokeWidth="1.4" />
      </g>
      {/* 菌盖 */}
      <g style={dim(active, 0)}>
        <path d="M128 152 Q 130 62 250 58 Q 370 62 372 152 Q 250 128 128 152 Z" fill="#c98a5f" stroke="#8a5a38" strokeWidth="3" />
        <circle cx="210" cy="96" r="9" fill="#e8b890" opacity="0.8" />
        <circle cx="292" cy="88" r="12" fill="#e8b890" opacity="0.8" />
        <circle cx="252" cy="112" r="7" fill="#e8b890" opacity="0.8" />
        <text x="380" y="84" fontSize="13.5" fill="#8a5a38" fontWeight="700">菌盖（保护菌褶）</text>
        <line x1="376" y1="90" x2="330" y2="102" stroke="#8a5a38" strokeWidth="1.4" />
      </g>
      {/* 菌褶（右半剖面可见放射褶片） */}
      <g style={dim(active, 1)}>
        <path d="M136 154 Q 250 132 364 154 L344 176 Q 250 152 156 176 Z" fill="#f0e2c8" stroke="#b5a582" strokeWidth="2.5" />
        <path d="M188 156 L214 174 M232 150 L244 172 M276 150 L264 172 M318 156 L290 174" stroke="#c9a882" strokeWidth="2" />
        <text x="392" y="168" fontSize="13" fill="#8a671b" fontWeight="700">菌褶（产生孢子）</text>
        <line x1="388" y1="174" x2="332" y2="164" stroke="#8a671b" strokeWidth="1.4" />
      </g>
      {/* 孢子 */}
      <g style={dim(active, 4)}>
        <circle cx="236" cy="190" r="4" fill="#8a671b" />
        <circle cx="256" cy="196" r="3.4" fill="#8a671b" />
        <circle cx="272" cy="188" r="3" fill="#8a671b" />
        <text x="296" y="212" fontSize="13" fill="#8a671b" fontWeight="700">孢子（繁殖体）</text>
        <line x1="292" y1="208" x2="274" y2="196" stroke="#8a671b" strokeWidth="1.4" />
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蘑菇（伞菌）子实体结构图 · 异养，靠孢子繁殖</text>
    </svg>
  );
}

function CyanobacteriaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <ellipse cx="260" cy="180" rx="160" ry="118" fill="#bfe0c9" stroke="#4d8a5e" strokeWidth="4" />
        <ellipse cx="260" cy="180" rx="150" ry="108" fill="none" stroke="#3f7f52" strokeWidth="2" />
        <text x="260" y="34" textAnchor="middle" fontSize="13.5" fill="#2f6b42" fontWeight="700">细胞壁（肽聚糖）+ 细胞膜</text>
        <line x1="260" y1="40" x2="260" y2="62" stroke="#2f6b42" strokeWidth="1.3" />
      </g>
      <g style={dim(active, 5)}>
        <path d="M208 170 C 236 146, 288 152, 292 184 C 296 208, 252 206, 258 228 C 264 246, 308 240, 304 214" fill="none" stroke="#8a5a9f" strokeWidth="4" strokeLinecap="round" />
        <text x="260" y="282" textAnchor="middle" fontSize="13.5" fill="#7a5a92" fontWeight="700">拟核（DNA，无核膜包被）</text>
      </g>
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={150 + (i % 2) * 14} y={126 + i * 16} width={110 - i * 8} height="9" rx="4.5" fill="#3d9468" opacity="0.85" />
            <rect x={310 - (i % 2) * 14} y={142 + i * 14} width={100 - i * 6} height="9" rx="4.5" fill="#3d9468" opacity="0.85" />
          </g>
        ))}
        <text x="396" y="96" fontSize="13" fill="#2f7a52" fontWeight="700">光合膜片层</text>
        <text x="396" y="118" fontSize="12.5" fill="#3f8a5a">含叶绿素和藻蓝素</text>
        <line x1="392" y1="100" x2="330" y2="150" stroke="#3d9468" strokeWidth="1.3" />
      </g>
      <g style={dim(active, 6)}>
        {[[176, 120], [212, 130], [348, 216], [168, 228], [330, 200], [218, 174]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.6" fill="#1e5a3c" />
        ))}
        <text x="430" y="292" fontSize="13" fill="#1e5a3c" fontWeight="600">核糖体</text>
        <line x1="426" y1="288" x2="360" y2="238" stroke="#1e5a3c" strokeWidth="1.2" />
      </g>
      <text x="14" y="330" fontSize="13.5" fill="#2f6b42" fontWeight="700">蓝细菌 = 原核生物，但含叶绿素和藻蓝素，能进行光合作用</text>
      <text x="14" y="348" fontSize="12.5" fill="#5f8a5e">没有叶绿体——光合结构是光合膜片层（区别于真核细胞）</text>
      <text x="500" y="368" textAnchor="end" fontSize="12.5" fill="#799398">蓝细菌（原核细胞）结构模式图</text>
    </svg>
  );
}

function YeastCellSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <ellipse cx="230" cy="180" rx="118" ry="96" fill="#e8d9a8" stroke="#b5903a" strokeWidth="3.5" />
      </g>
      <g style={dim(active, 2)}>
        <circle cx="230" cy="170" r="26" fill="#b48ad0" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="230" y="175" textAnchor="middle" fontSize="12.5" fill="#ffffff" fontWeight="700">细胞核</text>
      </g>
      <g style={dim(active, 1)}>
        <ellipse cx="278" cy="212" rx="34" ry="24" fill="#f4ecd8" stroke="#c9a86a" strokeWidth="2" />
        <text x="278" y="216" textAnchor="middle" fontSize="12" fill="#8a7a4a">液泡</text>
      </g>
      <g style={dim(active, 3)}>
        <ellipse cx="342" cy="108" rx="34" ry="28" fill="#e8d9a8" stroke="#b5903a" strokeWidth="2.5" />
        <text x="342" y="112" textAnchor="middle" fontSize="12" fill="#8a671b">芽体</text>
      </g>
      <g style={dim(active, 0)}>
        <line x1="360" y1="76" x2="404" y2="52" stroke="#b5903a" strokeWidth="1.4" />
        <text x="408" y="48" fontSize="13.5" fill="#8a671b" fontWeight="700">细胞壁</text>
        <text x="408" y="70" fontSize="12.5" fill="#a58a4a">（真菌：几丁质）</text>
      </g>
      <g style={dim(active, 1)}>
        <line x1="130" y1="264" x2="92" y2="286" stroke="#c9a86a" strokeWidth="1.4" />
        <text x="24" y="298" fontSize="13.5" fill="#8a671b" fontWeight="700">出芽生殖</text>
        <text x="24" y="320" fontSize="12.5" fill="#a58a4a">芽体脱落后成为新个体</text>
      </g>
      <g style={dim(active, 2)}>
        <text x="80" y="120" fontSize="13" fill="#8a5a9f" fontWeight="600">真核细胞：有细胞核和众多细胞器</text>
      </g>
      <text x="14" y="344" fontSize="13.5" fill="#8a671b" fontWeight="700">酵母菌：真核真菌 · 兼性厌氧 · 异养</text>
      <text x="14" y="360" fontSize="12.5" fill="#a58a4a">果酒发酵的菌种；无氧产酒精，有氧大量繁殖</text>
      <text x="500" y="368" textAnchor="end" fontSize="12.5" fill="#799398">酵母菌结构模式图</text>
    </svg>
  );
}

function EColiSvg({ active }: { active: number | null; open?: boolean }) {
  const pili: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 0; i < 7; i += 1) {
    const t = Math.PI * (0.32 + (i / 6) * 0.36);
    const x = 268 + 152 * Math.cos(t + Math.PI);
    const y = 190 - 74 * Math.sin(t);
    pili.push({ x1: x, y1: y, x2: x - 4, y2: y - 18 });
  }
  for (let i = 0; i < 7; i += 1) {
    const t = Math.PI * (0.32 + (i / 6) * 0.36);
    const x = 268 + 152 * Math.cos(t);
    const y = 190 + 74 * Math.sin(t) - 6;
    pili.push({ x1: x, y1: y, x2: x + 4, y2: y + 18 });
  }
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 荚膜 */}
      <g style={dim(active, 2)}>
        <rect x="128" y="106" width="284" height="164" rx="82" fill="none" stroke="#9db8bd" strokeWidth="2.5" strokeDasharray="7 5" />
      </g>
      {/* 细胞壁 */}
      <g style={dim(active, 3)}>
        <rect x="138" y="116" width="264" height="144" rx="72" fill="#f2f6ee" stroke="#6b8f5e" strokeWidth="4" />
      </g>
      {/* 细胞膜 */}
      <g style={dim(active, 4)}>
        <rect x="146" y="124" width="248" height="128" rx="64" fill="none" stroke="#4a7a6a" strokeWidth="2.5" />
      </g>

      {/* 拟核 */}
      <g style={dim(active, 5)}>
        <path d="M228 170 C 252 148, 292 152, 296 178 C 300 200, 262 198, 268 216 C 274 232, 316 226, 312 202 C 309 186, 330 188, 328 172 C 326 156, 296 160, 290 168" stroke="#8a5a8f" strokeWidth="2.6" fill="none" />
        <text x="272" y="252" textAnchor="middle" fontSize="13" fill="#7a5a92" fontWeight="600">拟核（DNA 集中区域，无核膜）</text>
      </g>

      {/* 质粒 */}
      <g style={dim(active, 6)}>
        <circle cx="196" cy="210" r="9" fill="none" stroke="#e6913c" strokeWidth="2.5" />
        <circle cx="336" cy="152" r="7" fill="none" stroke="#e6913c" strokeWidth="2.5" />
        <text x="196" y="236" textAnchor="middle" fontSize="12.5" fill="#b06a17" fontWeight="600">质粒</text>
      </g>

      {/* 核糖体 */}
      <g style={dim(active, 7)}>
        {[[180, 150], [214, 172], [248, 140], [310, 136], [352, 178], [322, 214], [232, 232], [362, 224], [200, 190]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.8" fill="#4b6c73" />
        ))}
        <text x="408" y="230" fontSize="12.5" fill="#4b6c73" fontWeight="600">核糖体</text>
      </g>

      {/* 菌毛 */}
      <g style={dim(active, 1)}>
        {pili.map((p, index) => (
          <line key={index} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke="#799398" strokeWidth="2" strokeLinecap="round" />
        ))}
        <text x="82" y="128" fontSize="13" fill="#59767c" fontWeight="600">菌毛（短而多）</text>
      </g>

      {/* 鞭毛 */}
      <g style={dim(active, 0)}>
        <path
          d="M400 168 q 26 -18 52 0 q 26 18 52 0 q 12 -8 16 -6"
          stroke="#4b6c73" strokeWidth="2.6" fill="none" strokeLinecap="round"
          className="bio-flagella" style={{ transformOrigin: '400px 168px' }}
        />
        <path
          d="M400 208 q 26 18 52 0 q 26 -18 52 0 q 12 8 16 6"
          stroke="#4b6c73" strokeWidth="2.6" fill="none" strokeLinecap="round"
          className="bio-flagella" style={{ transformOrigin: '400px 208px', animationDelay: '0.4s' }}
        />
        <path
          d="M136 196 q -22 14 -46 0 q -22 -14 -46 0"
          stroke="#4b6c73" strokeWidth="2.6" fill="none" strokeLinecap="round"
          className="bio-flagella" style={{ transformOrigin: '136px 196px', animationDelay: '0.8s' }}
        />
        <text x="428" y="140" fontSize="13" fill="#366169" fontWeight="600">鞭毛（长而少）</text>
      </g>

      <Badge n={1} x={472} y={160} />
      <Badge n={2} x={88} y={100} />
      <Badge n={3} x={270} y={98} />
      <Badge n={4} x={270} y={126} />
      <Badge n={5} x={270} y={290} />
      <Badge n={6} x={272} y={172} />
      <Badge n={7} x={196} y={190} />
      <Badge n={8} x={336} y={132} />
      <text x="500" y="364" textAnchor="end" fontSize="12.5" fill="#799398">大肠杆菌（原核细胞）结构模式图</text>
    </svg>
  );
}

function ParameciumSvg({ active }: { active: number | null; open?: boolean }) {
  const cilia = Array.from({ length: 44 }, (_, i) => {
    const t = (i / 44) * Math.PI * 2;
    const cosT = Math.cos(t);
    const sinT = Math.sin(t);
    const x = 260 + 194 * cosT;
    const y = 195 + 116 * sinT;
    const len = Math.hypot(116 * cosT, 194 * sinT) || 1;
    const nx = (116 * cosT) / len;
    const ny = (194 * sinT) / len;
    return { x1: x, y1: y, x2: x + nx * 15, y2: y + ny * 15, key: i };
  });
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 表膜 + 纤毛 */}
      <g style={dim(active, 1)}>
        <ellipse cx="260" cy="195" rx="194" ry="116" fill="#eef2f8" stroke="#5b7f9e" strokeWidth="3.5" />
      </g>
      <g style={dim(active, 0)} className="bio-cilia">
        {cilia.map((c) => (
          <line key={c.key} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="#5b7f9e" strokeWidth="2" strokeLinecap="round" />
        ))}
      </g>

      {/* 口沟 + 胞口 */}
      <g style={dim(active, 2)}>
        <path d="M446 128 C 396 136, 344 160, 302 190 L 306 214 C 350 186, 402 172, 448 172 Z" fill="#d7e3ef" stroke="#5b7f9e" strokeWidth="2" />
        <text x="392" y="136" fontSize="13.5" fill="#366169" fontWeight="600">口沟</text>
      </g>
      <g style={dim(active, 3)}>
        <ellipse cx="306" cy="202" rx="7" ry="10" fill="#5b7f9e" transform="rotate(-24 306 202)" />
        <text x="290" y="232" fontSize="12.5" fill="#366169" fontWeight="600">胞口</text>
      </g>

      {/* 食物泡 */}
      <g style={dim(active, 4)}>
        {[
          { x: 240, y: 244, r: 14 },
          { x: 198, y: 262, r: 11 },
          { x: 282, y: 268, r: 12 },
        ].map((v, index) => (
          <g key={index}>
            <circle cx={v.x} cy={v.y} r={v.r} fill="#f0d9a8" stroke="#b06a17" strokeWidth="2" />
            <circle cx={v.x - v.r / 3} cy={v.y + 2} r="2.4" fill="#8a671b" />
          </g>
        ))}
        <text x="240" y="298" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="600">食物泡（随细胞质流动消化）</text>
      </g>

      {/* 伸缩泡 ×2 */}
      <g style={dim(active, 5)}>
        {[
          { x: 148, y: 138, r: 16 },
          { x: 372, y: 272, r: 14 },
        ].map((v, index) => (
          <g key={index}>
            <circle cx={v.x} cy={v.y} r={v.r} fill="#dcebf7" stroke="#7fa9bb" strokeWidth="2.5" />
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={deg}
                  x1={v.x + Math.cos(rad) * v.r}
                  y1={v.y + Math.sin(rad) * v.r}
                  x2={v.x + Math.cos(rad) * (v.r + 13)}
                  y2={v.y + Math.sin(rad) * (v.r + 13)}
                  stroke="#7fa9bb"
                  strokeWidth="2"
                />
              );
            })}
          </g>
        ))}
        <text x="148" y="104" textAnchor="middle" fontSize="13" fill="#4b7a91" fontWeight="600">伸缩泡 + 收集管</text>
      </g>

      {/* 大核 / 小核 */}
      <g style={dim(active, 6)}>
        <ellipse cx="312" cy="196" rx="36" ry="20" fill="#a97fb5" stroke="#7a5a92" strokeWidth="2" transform="rotate(-18 312 196)" />
        <text x="312" y="200" textAnchor="middle" fontSize="12.5" fill="#ffffff" fontWeight="600">大核</text>
      </g>
      <g style={dim(active, 7)}>
        <circle cx="258" cy="176" r="8" fill="#7a5a92" />
        <text x="258" y="160" textAnchor="middle" fontSize="12.5" fill="#7a5a92" fontWeight="600">小核</text>
      </g>

      {/* 胞肛 */}
      <g style={dim(active, 8)}>
        <path d="M84 232 q 10 8 22 8" stroke="#5b7f9e" strokeWidth="3" fill="none" strokeLinecap="round" />
        <text x="82" y="262" textAnchor="middle" fontSize="12.5" fill="#366169" fontWeight="600">胞肛</text>
      </g>

      <Badge n={1} x={260} y={66} />
      <Badge n={2} x={378} y={88} />
      <Badge n={3} x={430} y={118} />
      <Badge n={4} x={306} y={172} />
      <Badge n={5} x={240} y={228} />
      <Badge n={6} x={148} y={164} />
      <Badge n={7} x={352} y={186} />
      <Badge n={8} x={258} y={200} />
      <Badge n={9} x={92} y={224} />
      <text x="500" y="364" textAnchor="end" fontSize="12.5" fill="#799398">草履虫（单细胞原生动物）结构模式图</text>
    </svg>
  );
}

function NitrobacteriaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 菌体 */}
      <g style={dim(active, 0)}>
        <rect x="150" y="66" width="216" height="74" rx="37" fill="#bfe0d4" stroke="#3f7f6a" strokeWidth="3.5" />
        <circle cx="196" cy="103" r="9" fill="#3f7f6a" />
        <circle cx="228" cy="103" r="9" fill="#3f7f6a" />
        <text x="258" y="109" fontSize="13.5" fill="#2a5a4a" fontWeight="700">棒状菌体（原核）</text>
      </g>
      {/* 化能合成链 */}
      <g style={dim(active, 1)}>
        <rect x="24" y="168" width="112" height="44" rx="9" fill="#fdf1e3" stroke="#c98a1d" strokeWidth="2.5" />
        <text x="80" y="188" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">氨（NH₃）</text>
        <text x="80" y="206" textAnchor="middle" fontSize="12" fill="#a58a4a">土壤中来源</text>
        <line x1="140" y1="190" x2="168" y2="190" stroke="#8aa1a6" strokeWidth="3" markerEnd="url(#nb-arrow)" />
        <rect x="172" y="168" width="112" height="44" rx="9" fill="#fdf1e3" stroke="#c98a1d" strokeWidth="2.5" />
        <text x="228" y="188" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">亚硝酸（HNO₂）</text>
        <text x="228" y="206" textAnchor="middle" fontSize="12" fill="#a58a4a">氧化释能 ①</text>
        <line x1="288" y1="190" x2="316" y2="190" stroke="#8aa1a6" strokeWidth="3" markerEnd="url(#nb-arrow)" />
        <rect x="320" y="168" width="112" height="44" rx="9" fill="#fdf1e3" stroke="#c98a1d" strokeWidth="2.5" />
        <text x="376" y="188" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">硝酸（HNO₃）</text>
        <text x="376" y="206" textAnchor="middle" fontSize="12" fill="#a58a4a">氧化释能 ②</text>
      </g>
      {/* 能量去路 */}
      <g style={dim(active, 2)}>
        <path d="M436 196 Q 470 226 452 258" fill="none" stroke="#3f7f6a" strokeWidth="3.5" markerEnd="url(#nb-arrow)" />
        <rect x="330" y="262" width="130" height="46" rx="9" fill="#e7f3e2" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="395" y="282" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="700">化学能 → 合成有机物</text>
        <text x="395" y="300" textAnchor="middle" fontSize="12" fill="#4a8a4a">CO₂ + H₂O →（C₆H₁₂O₆）</text>
        <text x="24" y="256" fontSize="13.5" fill="#2f7a4d" fontWeight="700">不放氧、不需要光——</text>
        <text x="24" y="276" fontSize="13.5" fill="#2f7a4d" fontWeight="700">却和绿色植物一样是自养生物</text>
      </g>
      <g style={dim(active, 3)}>
        <text x="24" y="322" fontSize="12.5" fill="#59767c">硝化细菌把氨氧化成硝酸盐，既养活自己，也提高土壤肥力（氮循环的重要一环）</text>
      </g>
      <defs>
        <marker id="nb-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">硝化细菌与化能合成作用模式图</text>
    </svg>
  );
}

function SpirogyraSvg({ active }: { active: number | null; open?: boolean }) {
  const cellX = [26, 152, 278];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 丝状体：三节细胞 */}
      {cellX.map((x, i) => (
        <g key={i} style={dim(active, i === 1 ? 0 : 3)}>
          <rect x={x} y="76" width="124" height="120" rx="24" fill="#eef7e8" stroke="#3f7f3a" strokeWidth="3.5" />
          <rect x={x + 5} y="81" width="114" height="110" rx="20" fill="none" stroke="#7fa86a" strokeWidth="1.6" opacity="0.6" />
          {/* 带状螺旋叶绿体 */}
          <path d={`M${x + 14} ${178} C ${x + 44} ${140}, ${x + 4} ${112}, ${x + 34} ${88} C ${x + 64} ${128}, ${x + 24} ${156}, ${x + 54} ${186} C ${x + 74} ${166}, ${x + 84} ${140}, ${x + 70} ${116}`}
            fill="none" stroke="#4c8f5f" strokeWidth="9" strokeLinecap="round" />
        </g>
      ))}
      {/* 细胞核（中间细胞） */}
      <g style={dim(active, 1)}>
        <circle cx="214" cy="130" r="11" fill="#b48ad0" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="214" y="222" textAnchor="middle" fontSize="13" fill="#7a4a8a" fontWeight="700">细胞核</text>
        <line x1="214" y1="144" x2="214" y2="208" stroke="#7a4a8a" strokeWidth="1.4" />
      </g>
      {/* 带状叶绿体标注 */}
      <g style={dim(active, 0)}>
        <text x="418" y="96" fontSize="13.5" fill="#2f7a4d" fontWeight="700">带状叶绿体</text>
        <text x="418" y="114" fontSize="12" fill="#4a8a4a">螺旋盘绕在细胞内</text>
        <line x1="414" y1="100" x2="356" y2="120" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 恩格尔曼实验 */}
      <g style={dim(active, 2)}>
        <rect x="26" y="232" width="468" height="94" rx="10" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="42" y="258" fontSize="13.5" fill="#2c6e94" fontWeight="700">恩格尔曼实验（经典）：用极细光束照射水绵</text>
        <rect x="42" y="270" width="150" height="40" rx="8" fill="#eef7e8" stroke="#3f7f3a" strokeWidth="2" />
        <path d="M56 302 C 76 278, 60 282, 78 278 C 98 276, 86 300, 104 296 C 122 292, 112 278, 130 278" fill="none" stroke="#4c8f5f" strokeWidth="5" strokeLinecap="round" />
        <rect x="80" y="266" width="14" height="5" fill="#c98a1d" />
        {[[150, 286], [156, 296], [148, 300], [160, 282], [154, 306]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#3d6a94" />
        ))}
        <text x="206" y="286" fontSize="12.5" fill="#46666d">好氧细菌只聚集在被光照射的叶绿体部位</text>
        <text x="206" y="306" fontSize="12.5" fill="#46666d">→ 证明氧气由叶绿体释放（光合作用的场所）</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">水绵（丝状绿藻）结构模式图</text>
    </svg>
  );
}

function LactobacillusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 菌链 */}
      <g style={dim(active, 0)}>
        {[130, 220, 310].map((x, i) => (
          <g key={i} transform={`rotate(${i % 2 === 0 ? -8 : 8} ${x + 36} 130)`}>
            <rect x={x} y="106" width="76" height="48" rx="24" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="3" />
            <circle cx={x + 22} cy="130" r="4" fill="#7a4a8a" opacity="0.6" />
            <circle cx={x + 44} cy="126" r="4" fill="#7a4a8a" opacity="0.6" />
          </g>
        ))}
        <text x="260" y="188" textAnchor="middle" fontSize="13.5" fill="#6a4a9a" fontWeight="700">乳酸杆菌（杆状、常成链）</text>
      </g>
      {/* 代谢箭头 */}
      <g style={dim(active, 1)}>
        <rect x="56" y="222" width="150" height="46" rx="9" fill="#eef7f6" stroke="#3d7e9e" strokeWidth="2.5" />
        <text x="131" y="242" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">葡萄糖</text>
        <text x="131" y="260" textAnchor="middle" fontSize="12" fill="#4a7a9a">（牛奶 / 菜里的糖）</text>
        <path d="M212 245 Q 244 226 276 245" fill="none" stroke="#7a4a8a" strokeWidth="3.5" markerEnd="url(#lb-arrow)" />
        <text x="244" y="216" textAnchor="middle" fontSize="12.5" fill="#7a4a8a" fontWeight="700">无氧发酵</text>
        <rect x="282" y="222" width="150" height="46" rx="9" fill="#fdf1e3" stroke="#c98a1d" strokeWidth="2.5" />
        <text x="357" y="242" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">乳酸</text>
        <text x="357" y="260" textAnchor="middle" fontSize="12" fill="#a58a4a">不产生酒精和 CO₂</text>
      </g>
      {/* 应用 */}
      <g style={dim(active, 2)}>
        <rect x="56" y="292" width="150" height="52" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="131" y="314" textAnchor="middle" fontSize="12.5" fill="#2c6e94" fontWeight="600">酸奶、泡菜、青贮饲料</text>
        <text x="131" y="332" textAnchor="middle" fontSize="12" fill="#59767c">产酸 → pH 下降抑杂菌</text>
        <rect x="282" y="292" width="150" height="52" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="357" y="314" textAnchor="middle" fontSize="12.5" fill="#2c6e94" fontWeight="600">异养厌氧型</text>
        <text x="357" y="332" textAnchor="middle" fontSize="12" fill="#59767c">原核生物 · 无核膜包被的核</text>
      </g>
      <defs>
        <marker id="lb-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="16" y="42" fontSize="13.5" fill="#2c6e94" fontWeight="700">泡菜"酸而不腐"的秘密：乳酸菌大量产酸，杂菌受不了酸性环境</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">乳酸菌与乳酸发酵模式图</text>
    </svg>
  );
}

function MycoplasmaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 菌体：多形性 */}
      <g style={dim(active, 0)}>
        <path d="M160 120 Q 200 70 262 92 Q 330 84 356 140 Q 386 196 330 232 Q 276 272 210 240 Q 148 214 160 120 Z" fill="#d9e7f2" stroke="#3d6a94" strokeWidth="4" />
        <text x="258" y="298" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">形态多变（多形性）——因为根本没有细胞壁</text>
      </g>
      {/* 细胞膜（唯一边界） */}
      <g style={dim(active, 1)}>
        <path d="M160 120 Q 200 70 262 92" fill="none" stroke="#b0483a" strokeWidth="6" strokeLinecap="round" />
        <line x1="90" y1="92" x2="158" y2="102" stroke="#b0483a" strokeWidth="1.4" />
        <text x="24" y="76" fontSize="13.5" fill="#b0483a" fontWeight="700">细胞膜 = 唯一边界</text>
        <text x="24" y="94" fontSize="12" fill="#c97a5a">没有细胞壁保护</text>
      </g>
      {/* 内部 */}
      <g style={dim(active, 2)}>
        <circle cx="266" cy="150" r="24" fill="none" stroke="#7a4a8a" strokeWidth="3" strokeDasharray="6 4" />
        <text x="266" y="155" textAnchor="middle" fontSize="11.5" fill="#7a4a8a" fontWeight="700">拟核</text>
        {[[206, 126], [234, 196], [306, 128], [322, 190], [282, 216]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="#8fb8d4" stroke="#3d6a94" strokeWidth="1.8" />
        ))}
        <text x="388" y="150" fontSize="13" fill="#2c6e94" fontWeight="700">核糖体（唯一细胞器）</text>
        <text x="388" y="168" fontSize="12" fill="#4a7a9a">+ 环状拟核 DNA</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="26" y="316" width="468" height="40" rx="9" fill="#fdf6e3" stroke="#e9d9a8" strokeWidth="2" />
        <text x="42" y="342" fontSize="13.5" fill="#8a671b" fontWeight="700">青霉素对它无效——它没有细胞壁，药物失去靶点</text>
      </g>
      <g style={dim(active, 0)}>
        <text x="16" y="46" fontSize="13.5" fill="#2c6e94" fontWeight="700">支原体：目前发现的最小原核细胞（约 0.1~0.3 μm）——"最小细胞"的常客</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">支原体结构模式图（课外拓展）</text>
    </svg>
  );
}

function AmoebaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 虫体 */}
      <g style={dim(active, 0)}>
        <path d="M150 130 Q 190 86 250 96 Q 300 84 330 122 Q 368 150 344 196 Q 322 244 262 236 Q 210 260 168 222 Q 128 190 150 130 Z"
          fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="3.5" />
        <path d="M330 128 Q 380 100 408 116" fill="none" stroke="#9a6fb5" strokeWidth="14" strokeLinecap="round" />
        <path d="M160 218 Q 110 250 84 246" fill="none" stroke="#9a6fb5" strokeWidth="13" strokeLinecap="round" />
        <text x="404" y="94" fontSize="13.5" fill="#6a4a9a" fontWeight="700">伪足（临时突起）</text>
        <text x="404" y="112" fontSize="12" fill="#8a6a94">运动 + 摄食全靠它</text>
      </g>
      {/* 细胞核 */}
      <g style={dim(active, 1)}>
        <circle cx="240" cy="160" r="26" fill="#8a5a9f" />
        <text x="240" y="165" textAnchor="middle" fontSize="11.5" fill="#ffffff" fontWeight="700">细胞核</text>
      </g>
      {/* 食物泡 */}
      <g style={dim(active, 2)}>
        <circle cx="300" cy="196" r="14" fill="#f4d9b8" stroke="#b58a3a" strokeWidth="2.5" />
        <circle cx="300" cy="196" r="6" fill="#c9a86a" />
        <text x="318" y="224" fontSize="12.5" fill="#8a671b" fontWeight="600">食物泡（吞噬形成）</text>
        <text x="24" y="292" fontSize="13" fill="#46666d" fontWeight="600">吞噬 → 膜的流动性直接体现；胞内消化靠溶酶体融合</text>
      </g>
      {/* 核实验 */}
      <g style={dim(active, 1)}>
        <rect x="26" y="308" width="468" height="44" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="42" y="336" fontSize="13.5" fill="#173b42" fontWeight="700">切割实验：有核的一半存活再生，无核的死亡——核控制代谢与遗传</text>
      </g>
      <text x="16" y="46" fontSize="13.5" fill="#2c6e94" fontWeight="700">变形虫（课外拓展）：单细胞原生动物——"没有固定形状"的生存专家</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">变形虫结构模式图（课外拓展）</text>
    </svg>
  );
}

function EuglenaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 虫体 */}
      <g style={dim(active, 0)}>
        <path d="M170 150 Q 190 88 262 88 Q 330 92 344 150 Q 356 214 282 238 Q 208 240 178 196 Q 160 170 170 150 Z" fill="#d9e8c8" stroke="#3f7f3a" strokeWidth="3.5" />
        <text x="120" y="290" textAnchor="middle" fontSize="13.5" fill="#2f7a4d" fontWeight="700">梭形 · 前端圆钝后端尖</text>
      </g>
      {/* 鞭毛 */}
      <g style={dim(active, 1)}>
        <path d="M172 122 Q 120 100 76 122 Q 46 138 30 130" fill="none" stroke="#3d6a94" strokeWidth="4.5" strokeLinecap="round" />
        <text x="24" y="106" fontSize="13.5" fill="#2c6e94" fontWeight="700">鞭毛（运动）</text>
      </g>
      {/* 眼点 */}
      <g style={dim(active, 2)}>
        <circle cx="204" cy="118" r="9" fill="#b0483a" />
        <text x="152" y="86" fontSize="13.5" fill="#b0483a" fontWeight="700">红色眼点（感光）</text>
        <text x="152" y="66" fontSize="12" fill="#c97a5a">趋光——游向有光处</text>
      </g>
      {/* 叶绿体 */}
      <g style={dim(active, 3)}>
        {[[250, 128], [296, 150], [262, 178], [310, 196], [234, 176]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="15" ry="7" fill="#4c8f5f" stroke="#2f6b42" strokeWidth="2" transform={`rotate(${i * 36} ${x} ${y})`} />
        ))}
        <text x="376" y="140" fontSize="13.5" fill="#2f7a4d" fontWeight="700">叶绿体（可光合自养）</text>
        <line x1="372" y1="144" x2="330" y2="152" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 特殊性 */}
      <g style={dim(active, 4)}>
        <rect x="26" y="308" width="468" height="44" rx="9" fill="#e7f3e2" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="42" y="336" fontSize="13.5" fill="#2f7a4d" fontWeight="700">有光自养（叶绿体）、无光异养——动植物特征一身兼</text>
      </g>
      <text x="16" y="46" fontSize="13.5" fill="#2c6e94" fontWeight="700">眼虫（课外拓展）：原生动物界的"跨界选手"——动物会动，还带"太阳能板"</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">眼虫结构模式图（课外拓展）</text>
    </svg>
  );
}

function CellTypeCompareSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">病毒 / 原核细胞 / 真核细胞：三列对比（判断题高频）</text>
      <g style={dim(active, 0)}>
        <rect x="22" y="52" width="152" height="230" rx="10" fill="#fdf0ee" stroke="#b0483a" strokeWidth="2.5" />
        <text x="98" y="78" textAnchor="middle" fontSize="14" fill="#9b3a30" fontWeight="700">病毒</text>
        <circle cx="98" cy="140" r="30" fill="#e8b8b0" stroke="#8c231f" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4, 5].map((j) => {
          const ang = (j * 60 * Math.PI) / 180;
          return (
            <g key={j}>
              <line x1={98 + Math.cos(ang) * 30} y1={140 + Math.sin(ang) * 30} x2={98 + Math.cos(ang) * 44} y2={140 + Math.sin(ang) * 44} stroke="#8c231f" strokeWidth="3" strokeLinecap="round" />
              <circle cx={98 + Math.cos(ang) * 48} cy={140 + Math.sin(ang) * 48} r="4" fill="#c9503c" />
            </g>
          );
        })}
        <text x="98" y="200" textAnchor="middle" fontSize="12.5" fill="#7a2622" fontWeight="600">无细胞结构</text>
        <text x="98" y="220" textAnchor="middle" fontSize="12" fill="#a05a4a">核酸 + 蛋白质构成</text>
        <text x="98" y="240" textAnchor="middle" fontSize="12" fill="#a05a4a">必须寄生在活细胞中</text>
        <text x="98" y="264" textAnchor="middle" fontSize="12" fill="#b0483a" fontWeight="600">≠ 原核生物！</text>
      </g>
      <g style={dim(active, 1)}>
        <rect x="184" y="52" width="152" height="230" rx="10" fill="#eef7ee" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="260" y="78" textAnchor="middle" fontSize="14" fill="#2f7a4d" fontWeight="700">原核细胞</text>
        <rect x="216" y="100" width="88" height="42" rx="21" fill="#b8d4b0" stroke="#3f7f3a" strokeWidth="2.5" />
        <circle cx="252" cy="121" r="12" fill="none" stroke="#2f5a2f" strokeWidth="2" strokeDasharray="4 3" />
        <circle cx="278" cy="130" r="4" fill="#2f5a2f" />
        <text x="260" y="172" textAnchor="middle" fontSize="12.5" fill="#2f5a2f" fontWeight="600">拟核（无核膜）</text>
        <text x="260" y="206" textAnchor="middle" fontSize="12" fill="#3a6a3a">只有核糖体一种细胞器</text>
        <text x="260" y="228" textAnchor="middle" fontSize="12" fill="#3a6a3a">有细胞壁（支原体例外）</text>
        <text x="260" y="252" textAnchor="middle" fontSize="12" fill="#2f7a4d" fontWeight="600">代表：细菌、蓝细菌</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="346" y="52" width="152" height="230" rx="10" fill="#eaf1f9" stroke="#3d6a94" strokeWidth="2.5" />
        <text x="422" y="78" textAnchor="middle" fontSize="14" fill="#1e4a68" fontWeight="700">真核细胞</text>
        <circle cx="422" cy="146" r="42" fill="#d9e7f2" stroke="#3d6a94" strokeWidth="2.5" />
        <circle cx="410" cy="136" r="13" fill="#7a9ac0" stroke="#2c5a80" strokeWidth="2" />
        <circle cx="434" cy="158" r="6" fill="#6aa86a" />
        <ellipse cx="406" cy="164" rx="8" ry="5" fill="#e8a86a" />
        <text x="422" y="206" textAnchor="middle" fontSize="12.5" fill="#1e4a68" fontWeight="600">有核膜包被的细胞核</text>
        <text x="422" y="228" textAnchor="middle" fontSize="12" fill="#3a6a8a">多种细胞器（线粒体等）</text>
        <text x="422" y="252" textAnchor="middle" fontSize="12" fill="#1e4a68" fontWeight="600">代表：动物、植物、真菌</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="22" y="298" width="476" height="52" rx="9" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="38" y="320" fontSize="13" fill="#7a5a20" fontWeight="700">判断口诀：有无"以核膜为界限的细胞核"区分原核与真核</text>
        <text x="38" y="342" fontSize="12" fill="#a58a4a">共同点：都有细胞膜和核糖体（病毒除外，它连细胞都不是）</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">病毒 / 原核细胞 / 真核细胞对比模式图</text>
    </svg>
  );
}

function PenicilliumSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">青霉菌：多细胞真菌——弗莱明由此发现青霉素（第一种抗生素）</text>
      <g style={dim(active, 0)}>
        <path d="M120 300 Q 170 250 200 210 M 180 300 Q 220 260 260 230 M 260 300 Q 300 260 330 230" fill="none" stroke="#c9c9a0" strokeWidth="5" strokeLinecap="round" />
        <text x="20" y="244" fontSize="12.5" fill="#8a8a4a" fontWeight="600">营养菌丝（深入基质吸收养分）</text>
      </g>
      <g style={dim(active, 1)}>
        <line x1="290" y1="290" x2="270" y2="160" stroke="#8a9a4a" strokeWidth="6" strokeLinecap="round" />
        {[[-46, -18], [-28, -34], [-8, -44], [12, -36], [30, -20]].map(([dx, dy], i) => (
          <line key={i} x1="270" y1="160" x2={270 + dx} y2={160 + dy} stroke="#8a9a4a" strokeWidth="3.5" strokeLinecap="round" />
        ))}
        {[[-56, -24], [-40, -42], [-18, -52], [4, -44], [24, -30], [42, -14]].map(([dx, dy], i) => (
          <g key={i}>
            <circle cx={270 + dx} cy={160 + dy} r="7" fill="#8fbf8a" stroke="#3f7f3a" strokeWidth="2" />
            <circle cx={270 + dx + 8} cy={160 + dy + 10} r="6" fill="#a8cfa0" stroke="#3f7f3a" strokeWidth="1.6" />
          </g>
        ))}
        <text x="330" y="100" fontSize="13.5" fill="#3f7f3a" fontWeight="700">分生孢子梗（扫帚状）</text>
        <text x="330" y="122" fontSize="12" fill="#5a8a5a">顶端串生分生孢子</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="26" y="252" width="220" height="110" rx="10" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="42" y="278" fontSize="13" fill="#7a5a20" fontWeight="700">1928 年弗莱明的发现</text>
        <text x="42" y="300" fontSize="12" fill="#a58a4a">青霉菌污染了葡萄球菌培养皿，</text>
        <text x="42" y="320" fontSize="12" fill="#a58a4a">菌落周围细菌被"溶解"出透明圈</text>
        <text x="42" y="344" fontSize="12" fill="#a58a4a">→ 提取出青霉素（人类第一种抗生素）</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="274" y="252" width="220" height="110" rx="10" fill="#eaf1f9" stroke="#3d6a94" strokeWidth="2" />
        <text x="290" y="278" fontSize="13" fill="#1e4a68" fontWeight="700">青霉素抗菌原理</text>
        <text x="290" y="300" fontSize="12" fill="#3a6a8a">抑制细菌细胞壁（肽聚糖）合成</text>
        <text x="290" y="322" fontSize="12" fill="#3a6a8a">→ 细菌吸水涨破死亡</text>
        <text x="290" y="344" fontSize="12" fill="#799398">人体细胞无细胞壁，故副作用小</text>
      </g>
      <g style={dim(active, 0)}>
        <text x="16" y="60" fontSize="12.5" fill="#5a8a5a" fontWeight="600">真核生物 · 异养 · 孢子生殖（与酵母菌同门不同属）</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">青霉菌（真菌）结构模式图</text>
    </svg>
  );
}

function KelpSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">海带：大型褐藻——"根茎叶"其实都不是真正的根茎叶</text>
      <rect x="26" y="52" width="468" height="270" rx="12" fill="#dff0f7" stroke="#9abfd4" strokeWidth="2" opacity="0.6" />
      <g style={dim(active, 0)}>
        <path d="M240 300 Q 210 288 180 296 M 250 300 Q 260 280 300 286 M 245 300 Q 230 290 205 296" fill="none" stroke="#8a6a48" strokeWidth="5" strokeLinecap="round" />
        <text x="30" y="252" fontSize="13" fill="#8a6a48" fontWeight="700">固着器（假根：只固着，不吸水）</text>
      </g>
      <g style={dim(active, 1)}>
        <path d="M250 300 Q 252 260 250 210" fill="none" stroke="#6a8a3a" strokeWidth="10" strokeLinecap="round" />
        <text x="330" y="272" fontSize="13" fill="#4a7a3a" fontWeight="700">柄（茎状，无输导组织）</text>
        <line x1="326" y1="268" x2="262" y2="242" stroke="#4a7a3a" strokeWidth="1.4" />
      </g>
      <g style={dim(active, 2)}>
        <path d="M254 210 Q 300 176 348 158 Q 322 120 350 84 Q 300 92 262 132 Q 236 168 254 210 Z" fill="#5a8a5a" stroke="#3f7f3a" strokeWidth="3" />
        <path d="M254 210 Q 296 200 340 176" fill="none" stroke="#4a7a3a" strokeWidth="2.5" opacity="0.6" />
        <text x="390" y="96" fontSize="13.5" fill="#2f7a4d" fontWeight="700">叶状体（带片）</text>
        <text x="390" y="116" fontSize="12" fill="#4a8a4a">含叶绿素 + 藻褐素</text>
        <line x1="386" y1="100" x2="344" y2="128" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      <g style={dim(active, 3)}>
        {[[300, 150], [322, 140], [316, 166]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="10" ry="5" fill="#8a671b" stroke="#6a4a10" strokeWidth="1.6" />
        ))}
        <text x="150" y="120" fontSize="12.5" fill="#8a671b" fontWeight="600">孢子囊（孢子生殖）</text>
      </g>
      <g style={dim(active, 4)}>
        <rect x="26" y="292" width="468" height="64" rx="9" fill="#e7f3e2" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="42" y="316" fontSize="13" fill="#2f7a4d" fontWeight="700">藻类植物：无根、茎、叶的分化，无输导组织——结构简单但能进行光合作用</text>
        <text x="42" y="340" fontSize="12" fill="#4a8a4a">食用（富含碘和多糖）；"海带是植物有根茎叶"是典型错误说法</text>
      </g>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">海带（褐藻）结构模式图</text>
    </svg>
  );
}

function RhizobiumSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">根瘤菌与豆科植物共生固氮（互利共生的经典例子）</text>
      {/* 豆科植物 */}
      <g style={dim(active, 0)}>
        <line x1="150" y1="212" x2="150" y2="96" stroke="#4a8a3a" strokeWidth="9" strokeLinecap="round" />
        {[96, 132, 168].map((y, i) => (
          <ellipse key={i} cx={150 + (i % 2 === 0 ? 26 : -26)} cy={y} rx="26" ry="13" fill="#6aa86a" stroke="#3f7f3a" strokeWidth="2.5" transform={`rotate(${i % 2 === 0 ? -18 : 18} ${150 + (i % 2 === 0 ? 26 : -26)} ${y})`} />
        ))}
        <text x="206" y="92" fontSize="13.5" fill="#2f7a4d" fontWeight="700">豆科植物（提供有机物）</text>
        {/* 根系 */}
        <path d="M150 212 Q 110 244 74 262 M 150 212 Q 150 252 142 286 M 150 212 Q 196 248 226 268" fill="none" stroke="#b5956a" strokeWidth="4.5" strokeLinecap="round" />
      </g>
      {/* 根瘤 */}
      <g style={dim(active, 1)}>
        {[74, 142, 226].map((x, i) => (
          <circle key={i} cx={x} cy={x === 74 ? 218 : x === 142 ? 226 : 204} r="17" fill="#e8a8a0" stroke="#b0483a" strokeWidth="3" />
        ))}
        <text x="52" y="306" fontSize="13.5" fill="#b0483a" fontWeight="700">根瘤（根瘤菌与根共生的"小房子"）</text>
      </g>
      {/* 根瘤特写：杆状菌 */}
      <g style={dim(active, 2)}>
        <circle cx="386" cy="200" r="76" fill="#fbeaea" stroke="#b0483a" strokeWidth="3" strokeDasharray="8 5" />
        {[[352, 168], [398, 158], [424, 190], [356, 216], [402, 232], [380, 196]].map(([x, y], i) => (
          <g key={i} transform={`rotate(${i * 30} ${x} ${y})`}>
            <rect x={x - 13} y={y - 6} width="26" height="12" rx="6" fill="#f4d06a" stroke="#a56a1a" strokeWidth="2" />
            <circle cx={x - 13} cy={y} r="2.5" fill="#a56a1a" />
          </g>
        ))}
        <text x="386" y="126" textAnchor="middle" fontSize="13.5" fill="#8a4a3a" fontWeight="700">根瘤特写</text>
        <text x="386" y="300" textAnchor="middle" fontSize="12.5" fill="#a56a1a" fontWeight="600">杆状根瘤菌（原核 · 异养）</text>
      </g>
      {/* 固氮流程 */}
      <g style={dim(active, 3)}>
        <rect x="28" y="52" width="196" height="46" rx="10" fill="#eef7ee" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="126" y="72" textAnchor="middle" fontSize="13.5" fill="#2f7a4d" fontWeight="700">空气中 N₂（不能直接利用）</text>
        <path d="M126 98 Q 126 118 118 132" fill="none" stroke="#3f7f3a" strokeWidth="3" markerEnd="url(#rb-arrow)" />
        <text x="140" y="118" fontSize="12.5" fill="#2f7a4d" fontWeight="600">根瘤菌固氮 → NH₃</text>
      </g>
      {/* 对比框 */}
      <g style={dim(active, 4)}>
        <rect x="26" y="322" width="468" height="44" rx="9" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="42" y="340" fontSize="12.5" fill="#7a5a20" fontWeight="700">对比：根瘤菌（共生固氮）≠ 硝化细菌（化能合成自养）≠ 圆褐固氮菌（自生）</text>
        <text x="42" y="358" fontSize="12" fill="#a58a4a">植物给菌提供有机物，菌给植物提供氮素——互利共生，双方受益</text>
      </g>
      <defs>
        <marker id="rb-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#3f7f3a" />
        </marker>
      </defs>
    </svg>
  );
}

export const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {
  prion: { Svg: PrionSvg },
  penicillin: { Svg: PenicillinSvg },
  tuberculosis: { Svg: TuberculosisSvg },
  slimeMold: { Svg: SlimeMoldSvg },
  cordyceps: { Svg: CordycepsSvg },
  biogas: { Svg: BiogasSvg },
  mycorrhiza: { Svg: MycorrhizaSvg },
  antibiotic: { Svg: AntibioticSvg },
  microbiome: { Svg: MicrobiomeSvg },
  gramStain: { Svg: GramStainSvg },
  foodPreservation: { Svg: FoodPreservationSvg },
  lichen: { Svg: LichenSvg },
  bacteriaShapes: { Svg: BacteriaShapesSvg },
  chlamydomonas: { Svg: ChlamydomonasSvg },
  mushroom: { Svg: MushroomSvg },
  cyanobacteria: { Svg: CyanobacteriaSvg },
  yeast: { Svg: YeastCellSvg },
  ecoli: { Svg: EColiSvg, StageWebGL: EColiWebGLModel },
  paramecium: { Svg: ParameciumSvg, StageWebGL: ParameciumWebGLModel },
  nitrobacteria: { Svg: NitrobacteriaSvg },
  spirogyra: { Svg: SpirogyraSvg },
  lactobacillus: { Svg: LactobacillusSvg },
  mycoplasma: { Svg: MycoplasmaSvg },
  amoeba: { Svg: AmoebaSvg },
  euglena: { Svg: EuglenaSvg },
  cellTypeCompare: { Svg: CellTypeCompareSvg },
  penicillium: { Svg: PenicilliumSvg },
  kelp: { Svg: KelpSvg },
  rhizobium: { Svg: RhizobiumSvg },
};
