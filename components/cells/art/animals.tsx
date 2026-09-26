'use client';

import type { ComponentType } from 'react';
import { dim, type ArtProps } from '@/components/cells/art-shared';

function BeaverSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 河狸本体 */}
      <g style={dim(active, 0)}>
        <ellipse cx="150" cy="180" rx="66" ry="44" fill="#8a6a4a" stroke="#5a4322" strokeWidth="2.8" />
        <circle cx="88" cy="152" r="24" fill="#9a7a56" stroke="#5a4322" strokeWidth="2.4" />
        <circle cx="80" cy="146" r="3.4" fill="#141414" />
        <path d="M68 166 q -8 8 -16 8" fill="none" stroke="#5a4322" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M62 162 l -6 -10 l 10 2 Z" fill="#e8e0d0" stroke="#5a4322" strokeWidth="1.6" />
        <ellipse cx="222" cy="188" rx="30" ry="20" fill="#5a4322" stroke="#3a2a16" strokeWidth="2.4" />
        <path d="M212 176 q 14 -6 24 2 M210 188 q 14 -6 26 2" fill="none" stroke="#3a2a16" strokeWidth="2" />
        <text x="250" y="130" fontSize="12.5" fill="#5a4322" fontWeight="700">扁尾：舵+「拍水报警器」</text>
        <text x="60" y="108" fontSize="12.5" fill="#5a4322" fontWeight="700">门牙终生生长——必须啃树磨牙</text>
      </g>
      {/* 水坝与湿地 */}
      <g style={dim(active, 1)}>
        <path d="M40 250 q 90 -26 200 -18 l 0 40 l -200 0 Z" fill="#a58a5a" stroke="#6a5238" strokeWidth="2.4" />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={58 + i * 46} y1={246} x2={66 + i * 46} y2={286} stroke="#6a5238" strokeWidth="3.4" />
        ))}
        <rect x="242" y="238" width="230" height="56" rx="8" fill="#a8cfe0" stroke="#4d7ea8" strokeWidth="2.4" />
        <path d="M252 244 q 40 -8 80 0 M350 250 q 40 -6 80 2" fill="none" stroke="#d0e8f2" strokeWidth="2.4" />
        <text x="357" y="258" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="700">坝上游成湿地：鱼·蛙·水鸟都来安家</text>
        <path d="M438 250 q 26 -10 44 6" fill="none" stroke="#4d7ea8" strokeWidth="3" />
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="318" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"生态工程师"：一座水坝把溪流变湿地——改变环境而非只适应环境（生物影响环境的例子）</text>
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#a5761d">湿地=「地球之肾」：蓄洪·净水·固碳——河狸坝是免费的生态修复工程</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">防水秘技：梳毛爪给毛皮"涂油"+瞬膜护眼+耳鼻防水瓣——半水生的全副装备</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">河狸 · 水坝背后的"生态工程师"（课外拓展）</text>
    </svg>
  );
}

function ClownfishSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 海葵 */}
      <g style={dim(active, 0)}>
        <ellipse cx="380" cy="250" rx="96" ry="26" fill="#c98ab0" stroke="#8a4a7a" strokeWidth="2.6" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const ang = -Math.PI / 2 + (i - 5.5) * 0.26;
          const bx = 380 + Math.cos(ang) * 40;
          const by = 246 + Math.sin(ang) * 18;
          return <path key={i} d={`M${bx} ${by} q ${Math.cos(ang) * 30} ${Math.sin(ang) * 52 - 20} ${Math.cos(ang) * 58} ${Math.sin(ang) * 74 - 26}`} fill="none" stroke="#e0a8c9" strokeWidth="9" strokeLinecap="round" />;
        })}
        <text x="380" y="286" textAnchor="middle" fontSize="12.5" fill="#8a4a7a" fontWeight="700">海葵：触手布满刺细胞</text>
      </g>
      {/* 小丑鱼 */}
      <g style={dim(active, 1)}>
        <ellipse cx="176" cy="150" rx="46" ry="28" fill="#f08a3a" stroke="#b05a1a" strokeWidth="2.6" />
        <path d="M148 128 q 24 -12 50 2 l -6 14 q -20 -10 -38 -2 Z" fill="#fff" stroke="#b05a1a" strokeWidth="1.8" />
        <path d="M142 154 q 30 -8 62 0 l -4 16 q -26 -8 -54 0 Z" fill="#fff" stroke="#b05a1a" strokeWidth="1.8" />
        <circle cx="142" cy="142" r="4.4" fill="#141414" />
        <path d="M130 158 q -18 -4 -26 4 q 12 8 26 4 Z" fill="#f08a3a" stroke="#b05a1a" strokeWidth="2" />
        <text x="60" y="96" fontSize="12.5" fill="#b05a1a" fontWeight="700">小丑鱼披"特殊黏液"</text>
        <text x="60" y="114" fontSize="12" fill="#b05a1a">海葵的刺细胞认不出它——免疫通行证</text>
        <text x="248" y="82" fontSize="12.5" fill="#2c5a84" fontWeight="700">它为海葵：引诱大鱼送餐·清理残饵·驱赶蝴蝶鱼</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="318" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">互利共生教科书案例：鱼得"安全屋"，海葵得"保镖+外卖员"——彼此离开都活得更难</text>
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#a5761d">小丑鱼出生皆无性别……群居中最大的变雌、次大的变雄——"社会等级"决定性别</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">海洋酸化让小丑鱼"认不出"海葵的家——共生关系正被气候变化拆散</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">小丑鱼与海葵 · 共生的"通行证"（课外拓展）</text>
    </svg>
  );
}

function MantaRaySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 体盘与头鳍 */}
      <g style={dim(active, 0)}>
        <path d="M260 150 Q340 128 420 158 Q466 176 470 196 Q420 200 380 216 Q310 240 260 240 Q210 240 140 216 Q100 200 50 196 Q54 176 100 158 Q180 128 260 150 Z" fill="#3a5a7a" stroke="#1f3a5a" strokeWidth="2.8" />
        <path d="M238 152 Q244 138 260 136 Q276 138 282 152 Q270 162 260 162 Q250 162 238 152 Z" fill="#1f3a5a" stroke="#142a42" strokeWidth="2" />
        <path d="M240 148 q -6 -16 2 -24 M280 148 q 6 -16 -2 -24" fill="none" stroke="#1f3a5a" strokeWidth="5" strokeLinecap="round" />
        <circle cx="226" cy="166" r="5" fill="#e8f4f8" />
        <circle cx="294" cy="166" r="5" fill="#e8f4f8" />
        <text x="340" y="92" fontSize="12.5" fill="#1f3a5a" fontWeight="700">头鳍：像漏斗拨水进嘴</text>
        <text x="60" y="120" fontSize="12.5" fill="#1f3a5a" fontWeight="700">眼在体盘侧面 · 嘴在前端（滤食）</text>
      </g>
      {/* 胸鳍与尾 */}
      <g style={dim(active, 1)}>
        <path d="M70 196 Q40 186 34 198 Q46 210 96 208" fill="#2c4a6a" stroke="#1f3a5a" strokeWidth="2" />
        <path d="M452 192 Q486 184 492 198 Q478 208 436 206" fill="#2c4a6a" stroke="#1f3a5a" strokeWidth="2" />
        <text x="20" y="176" fontSize="12" fill="#1f3a5a" fontWeight="700">翼展可达 7 米</text>
        <path d="M470 196 Q494 208 500 238" fill="none" stroke="#1f3a5a" strokeWidth="6" strokeLinecap="round" />
        <text x="414" y="260" fontSize="12" fill="#1f3a5a" fontWeight="700">细长尾：无毒刺</text>
        <text x="150" y="278" fontSize="12.5" fill="#2c5a84" fontWeight="700">扇动胸鳍"飞翔"——最优雅的巡游者</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="318" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">滤食高手：吞的是浮游生物和小鱼——"最大的嘴吃最小的饭"（与鲸鲨同理）</text>
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#a5761d">脑体比是鱼类中最大的——会认镜子里的自己（鱼类少有的"自我识别"证据）</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">注意区分：蝠鲼无毒刺、性温和；"魔鬼鱼"俗称常与黄貂鱼（有毒刺）混淆</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蝠鲼 · 海里最大的"飞毯"（课外拓展）</text>
    </svg>
  );
}

function GeckoSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 爬墙体形 */}
      <g style={dim(active, 0)}>
        <path d="M120 176 Q150 140 220 138 Q300 136 340 158 Q356 168 352 182 Q310 204 230 202 Q156 200 120 176 Z" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2.8" />
        <path d="M352 176 Q390 170 428 182 Q452 190 470 186" fill="none" stroke="#7ab86a" strokeWidth="14" strokeLinecap="round" />
        <circle cx="146" cy="160" r="17" fill="#8ec97a" stroke="#3f7f3a" strokeWidth="2.4" />
        <circle cx="141" cy="155" r="5.5" fill="#141414" />
        <circle cx="142.5" cy="153.5" r="1.8" fill="#fff" />
        <path d="M120 178 q -14 4 -22 12" fill="none" stroke="#3f7f3a" strokeWidth="3" strokeLinecap="round" />
        <text x="70" y="112" fontSize="12.5" fill="#3f7f3a" fontWeight="700">大眼无眼睑：用舌头"擦眼镜"</text>
        <text x="358" y="222" fontSize="12.5" fill="#3f7f3a" fontWeight="700">断尾：自切保命再长回</text>
      </g>
      {/* 脚垫与匙毛放大 */}
      <g style={dim(active, 1)}>
        <path d="M180 236 l -18 26 M240 240 l 6 30 M300 238 l -2 30" fill="none" stroke="#8ec97a" strokeWidth="6" strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={158 + i * 46} cy={270 + (i % 2) * 6} rx="16" ry="8" fill="#c9e8b8" stroke="#3f7f3a" strokeWidth="2" />
        ))}
        <circle cx="392" cy="98" r="62" fill="#f2faea" stroke="#7aa87a" strokeWidth="2.6" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const ang = (i * Math.PI) / 4;
          return <path key={i} d={`M392 98 L${392 + Math.cos(ang) * 34} ${98 + Math.sin(ang) * 34}`} fill="none" stroke="#8ab88a" strokeWidth="3" strokeLinecap="round" />;
        })}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const ang = (i * Math.PI) / 4;
          const tipX = 392 + Math.cos(ang) * 34;
          const tipY = 98 + Math.sin(ang) * 34;
          return <path key={`t${i}`} d={`M${tipX} ${tipY} l ${i % 2 === 0 ? 12 : -12} 8`} fill="none" stroke="#4aa54a" strokeWidth="2.4" strokeLinecap="round" />;
        })}
        <text x="392" y="176" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">脚垫放大：刚毛末端分出匙毛</text>
        <text x="392" y="194" textAnchor="middle" fontSize="12" fill="#2f6f2a">数百万根同时"贴墙"——范德华力</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="318" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">不是"吸盘"也不是"胶水"：分子间范德华力叠加——每根刚毛力极小，百万根聚沙成塔</text>
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#a5761d">断尾自切：尾椎有"裂缝面"+自动蜷动分散捕食者注意——再生的是软骨尾</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">仿生成果：壁虎胶带·爬壁机器人——"结构与功能观"的极限案例</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">壁虎 · 把"范德华力"穿在脚上（课外拓展）</text>
    </svg>
  );
}

function SeaCucumberSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 体形与触手 */}
      <g style={dim(active, 0)}>
        <path d="M120 180 Q130 132 230 126 Q350 122 400 158 Q416 172 404 196 Q340 232 220 228 Q136 222 120 180 Z" fill="#b07a6a" stroke="#7a4a3a" strokeWidth="2.8" />
        <path d="M136 150 q 10 -14 26 -16 M180 134 q 12 -12 28 -12 M240 126 q 12 -10 28 -8" fill="none" stroke="#7a4a3a" strokeWidth="2" opacity="0.7" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M112 ${168 + i * 12} q -22 ${i === 2 ? 2 : -8} -30 ${i === 2 ? 0 : -14}`} fill="none" stroke="#8a5a8a" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="60" y="118" fontSize="12.5" fill="#8a4a7a" fontWeight="700">楯状触手（口周一圈）</text>
        <text x="60" y="136" fontSize="12" fill="#8a4a7a">扫集泥沙"吃土"取食碎屑</text>
      </g>
      {/* 管足、疣足与呼吸树 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={i} d={`M${160 + i * 34} 226 l ${i % 2 === 0 ? -5 : 5} 12`} fill="none" stroke="#e0b8a8" strokeWidth="3.2" strokeLinecap="round" />
        ))}
        <text x="170" y="258" fontSize="12.5" fill="#a5761d" fontWeight="700">腹面管足：水管系统驱动·慢速爬行</text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={`w${i}`} d={`M${180 + i * 36} 138 l 8 -10`} fill="none" stroke="#7a4a3a" strokeWidth="2.6" strokeLinecap="round" />
        ))}
        <text x="398" y="128" fontSize="12.5" fill="#7a4a3a" fontWeight="700">背面肉刺（疣足）</text>
        <path d="M404 176 q 20 -6 30 -20 M404 186 q 22 0 32 12" fill="none" stroke="#6a9ab0" strokeWidth="4" strokeLinecap="round" />
        <text x="388" y="222" fontSize="12.5" fill="#3a6a8a" fontWeight="700">肛门吸入海水 → 呼吸树</text>
        <text x="356" y="240" fontSize="12" fill="#3a6a8a">一窍双用：呼吸+排脏</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="318" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">排脏逃生：遇险把内脏从肛门喷出缠敌害——回头再整套再生，"舍得一身剐"</text>
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#a5761d">夏眠：水温超过 20°C 便迁往深水、不食不动——与冬眠对应的"夏眠"代表</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">棘皮动物门第三员（海星·海胆·海参）：体呈五辐对称·水管系统·再生能力强</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">海参 · 会"抛内脏"的棘皮动物（课外拓展）</text>
    </svg>
  );
}

function AmphioxusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体（半透明可见内部） */}
      <g style={dim(active, 0)}>
        <path d="M60 190 Q100 150 200 146 Q330 146 420 176 Q452 184 476 190 Q430 214 330 224 Q180 230 100 214 Q70 206 60 190 Z" fill="#d8e2ec" stroke="#5a7a9a" strokeWidth="2.8" />
        <path d="M470 188 l 26 -14 l 0 30 Z" fill="#c8d4e0" stroke="#5a7a9a" strokeWidth="2.2" />
        <path d="M86 176 q 8 -8 18 -6" fill="none" stroke="#5a7a9a" strokeWidth="2" />
        <text x="46" y="130" fontSize="12.5" fill="#3a5a7a" fontWeight="700">口须（触须一撮）：滤食"纱网"</text>
        <text x="46" y="150" fontSize="12" fill="#3a5a7a">埋沙露头·滤食浮游生物</text>
      </g>
      {/* 脊索与神经管、肌节、鳃裂 */}
      <g style={dim(active, 1)}>
        <rect x="96" y="168" width="330" height="8" rx="4" fill="#c9a54a" stroke="#8a6a1a" strokeWidth="1.6" />
        <text x="150" y="164" fontSize="12.5" fill="#8a6a1a" fontWeight="700">脊索（终生保留的弹性"大梁"）</text>
        <rect x="96" y="152" width="330" height="5" rx="2.5" fill="#8a6ab0" />
        <text x="336" y="146" fontSize="12.5" fill="#5a4390" fontWeight="700">背神经管（脑的雏形）</text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path key={i} d={`M${140 + i * 42} 152 L${156 + i * 42} 226`} fill="none" stroke="#7a9ab0" strokeWidth="2" opacity="0.75" />
        ))}
        <text x="238" y="252" fontSize="12.5" fill="#3a5a7a" fontWeight="700">V 形分节肌节——波浪式游泳的动力</text>
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={`g${i}`} d={`M${108 + i * 16} 176 L${116 + i * 16} 208`} fill="none" stroke="#b06a6a" strokeWidth="2.4" />
        ))}
        <text x="60" y="238" fontSize="12.5" fill="#a53030" fontWeight="700">咽部鳃裂（上百对）</text>
        <text x="60" y="258" fontSize="12" fill="#a53030">水流过鳃裂=呼吸+过滤食物</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">头索动物=无脊椎与脊椎之间的"桥梁"：脊索·背神经管·咽鳃裂三大特征齐全且终生保留</text>
        <text x="260" y="342" textAnchor="middle" fontSize="12" fill="#a5761d">脊椎动物只在胚胎期有脊索（后被脊柱取代）——文昌鱼 5 亿年几乎"没变样"</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">没有真正的头·脑·心脏——"鱼"名之下其实不是鱼，而是研究进化的活化石</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">文昌鱼 · 头索动物活化石（课外拓展）</text>
    </svg>
  );
}

function ArmadilloSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 骨质皮甲与身体 */}
      <g style={dim(active, 0)}>
        <path d="M148 214 Q152 122 252 104 Q352 120 356 214 L148 214 Z" fill="#b09478" stroke="#6a5238" strokeWidth="2.8" />
        <path d="M204 112 Q198 162 202 214 M252 104 Q252 160 252 214 M300 112 Q306 162 302 214" fill="none" stroke="#6a5238" strokeWidth="2.2" />
        <rect x="140" y="208" width="224" height="12" rx="6" fill="#8a6f52" stroke="#6a5238" strokeWidth="2" />
        <text x="176" y="82" fontSize="12.5" fill="#6a5238" fontWeight="700">骨质皮甲：真皮骨化+角质覆盖</text>
        <text x="176" y="100" fontSize="12" fill="#6a5238">肩甲带·活动带·骨盆带——像"盔甲关节"</text>
      </g>
      {/* 头与爪 */}
      <g style={dim(active, 1)}>
        <path d="M152 190 Q110 184 88 200 Q108 214 150 214 Z" fill="#c9ad8a" stroke="#6a5238" strokeWidth="2.4" />
        <path d="M128 186 l 6 -14 l 8 12" fill="#c9ad8a" stroke="#6a5238" strokeWidth="2" />
        <circle cx="106" cy="198" r="3" fill="#141414" />
        <text x="60" y="150" fontSize="12.5" fill="#6a5238" fontWeight="700">尖吻+小耳：拱土找白蚁</text>
        <rect x="196" y="220" width="30" height="34" rx="10" fill="#c9ad8a" stroke="#6a5238" strokeWidth="2.2" />
        <path d="M226 236 q 34 -6 44 10 q -12 10 -44 2 Z" fill="#c9ad8a" stroke="#6a5238" strokeWidth="2.2" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M268 ${232 + i * 8} l 26 ${i === 1 ? -2 : 4}`} fill="none" stroke="#8a7248" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="300" y="262" fontSize="12.5" fill="#6a5238" fontWeight="700">第三爪如铁铲：掘穴·撕开蚁巢</text>
        <text x="300" y="280" fontSize="12" fill="#6a5238">一晚能吃掉数万只白蚁蚂蚁</text>
      </g>
      {/* 蜷球与考点 */}
      <g style={dim(active, 2)}>
        <circle cx="440" cy="88" r="34" fill="#c9ad8a" stroke="#6a5238" strokeWidth="2.4" />
        <path d="M414 76 Q440 60 466 76 M408 92 Q440 76 472 92 M414 108 Q440 122 466 108" fill="none" stroke="#6a5238" strokeWidth="2" />
        <text x="428" y="140" textAnchor="middle" fontSize="12.5" fill="#6a5238" fontWeight="700">三带犰狳：能蜷成完美球</text>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">九带犰狳恒定产同卵四胞胎：一个受精卵分裂成四个胚胎——天然的"遗传学克隆"研究材料</text>
        <text x="260" y="342" textAnchor="middle" fontSize="12" fill="#a5761d">体温仅 31~35°C——除人类外唯一自然感染麻风杆菌的哺乳动物，为麻风病药物研究立功</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">受惊可跳起 1 米高——公路上反而常被撞死，"盔甲"防不住汽车</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">犰狳 · 披甲的"活坦克"（课外拓展）</text>
    </svg>
  );
}

function ParrotSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <ellipse cx="230" cy="180" rx="72" ry="50" fill="#4aa54a" stroke="#1f6f1f" strokeWidth="2.8" />
        <path d="M158 168 q -30 -6 -44 12" fill="none" stroke="#4aa54a" strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="300" cy="230" rx="34" ry="22" fill="#e8c83a" stroke="#a58a2a" strokeWidth="2.4" />
        <path d="M296 252 q 4 20 22 22 m -18 -16 q 8 12 20 12" fill="none" stroke="#8a6a2a" strokeWidth="3.4" strokeLinecap="round" />
        <text x="352" y="230" fontSize="12.5" fill="#1f6f1f" fontWeight="700">对趾足（两前两后）</text>
        <text x="352" y="250" fontSize="12" fill="#1f6f1f">抓握树枝·灵活如"手"</text>
      </g>
      {/* 头与喙 */}
      <g style={dim(active, 1)}>
        <circle cx="196" cy="116" r="24" fill="#e84a4a" stroke="#a51f1f" strokeWidth="2.4" />
        <circle cx="188" cy="110" r="4" fill="#141414" />
        <path d="M218 110 q 26 -6 38 10 q -14 14 -38 6 Z" fill="#e8a03a" stroke="#a5761d" strokeWidth="2.4" />
        <text x="70" y="90" fontSize="12.5" fill="#a51f1f" fontWeight="700">钩状喙：咬开坚果硬壳</text>
        <text x="70" y="250" fontSize="12.5" fill="#a51f1f" fontWeight="700">"学舌"原理：鸣管模仿+大脑学习</text>
        <text x="70" y="270" fontSize="12" fill="#a51f1f">并非理解语言·但能联想"词"与"物"</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="296" width="440" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">鹦鹉"聪明"的证据：概念分类·数数·用工具·解决逻辑难题（某些个体达人类幼儿水平）</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">长寿（大型鹦鹉可活 50~80 年）· 高智力·情感需求高——"宠物"责任重大</text>
        <text x="260" y="360" textAnchor="middle" fontSize="11" fill="#a5761d">非法捕捉贸易威胁野生种群——所有鹦鹉均为保护物种</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">鹦鹉 · 鹦形目"语言天才"（课外拓展）</text>
    </svg>
  );
}

function MayflySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 蜉蝣成虫 */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="150" rx="46" ry="20" fill="#c9b88a" stroke="#8a7a4a" strokeWidth="2.6" />
        {[0, 1].map((i) => (
          <path key={i} d={`M${244 + i * 4} 136 q ${40 + i * 20} ${-30 - i * 8} ${96 + i * 24} ${-20 - i * 10}`} fill="none" stroke="#e8e4d0" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        ))}
        {[0, 1, 2].map((i) => (
          <path key={`t${i}`} d={`M${298 + i * 3} 148 l ${30 + i * 8} ${-6 + i * 6}`} stroke="#8a7a4a" strokeWidth="2.2" strokeLinecap="round" />
        ))}
        {[0, 1].map((i) => (
          <path key={`f${i}`} d={`M${230 + i * 8} 166 l ${-4 - i * 3} 26`} stroke="#8a7a4a" strokeWidth="2.2" strokeLinecap="round" />
        ))}
        <text x="330" y="110" fontSize="12.5" fill="#8a7a4a" fontWeight="700">前翅大·后翅退化成小棒</text>
        <text x="330" y="130" fontSize="12" fill="#8a7a4a">尾须细长（2~3 根"尾巴"）</text>
      </g>
      {/* 生活史 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="240" width="216" height="100" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="154" y="264" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">不完全变态的一生</text>
        <text x="154" y="288" textAnchor="middle" fontSize="10.5" fill="#37585f">卵（水中）→ 稚虫（1~3 年）</text>
        <text x="154" y="310" textAnchor="middle" fontSize="10.5" fill="#37585f">→ 亚成虫 → 成虫（数小时~数天）</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="284" y="240" width="196" height="100" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="382" y="264" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">"朝生暮死"的真相</text>
        <text x="382" y="288" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">幼期在水中生活 1~3 年</text>
        <text x="382" y="310" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">成虫不吃不喝·只为繁殖</text>
        <text x="382" y="332" textAnchor="middle" fontSize="9.5" fill="#59767c">口器退化——"婚飞"是唯一使命</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蜉蝣 · 水质指示昆虫（课外拓展）</text>
    </svg>
  );
}

function NakedMoleRatSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 地下隧道 */}
      <g style={dim(active, 0)}>
        <path d="M40 240 q 200 -36 440 -6" fill="none" stroke="#6a5230" strokeWidth="40" strokeLinecap="round" />
        <path d="M60 236 q 200 -26 400 -4" fill="none" stroke="#8a7248" strokeWidth="26" strokeLinecap="round" />
      </g>
      {/* 裸鼹鼠 */}
      <g style={dim(active, 1)}>
        <ellipse cx="240" cy="228" rx="64" ry="30" fill="#e8c9a8" stroke="#a5765a" strokeWidth="2.8" />
        <circle cx="316" cy="216" r="18" fill="#e8c9a8" stroke="#a5765a" strokeWidth="2.4" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={`w${i}`} d={`M${308 + i * 4} 200 l -3 -12`} stroke="#a5765a" strokeWidth="2" strokeLinecap="round" />
        ))}
        {[0, 1].map((i) => (
          <circle key={`e${i}`} cx={308 + i * 10} cy={214} r="2.6" fill="#2a1a0a" />
        ))}
        <path d="M330 218 q 20 2 30 10" fill="none" stroke="#a5765a" strokeWidth="4" strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => (
          <path key={`l${i}`} d={`M${196 + i * 28} 256 l -6 16 m 14 -14 l 6 16`} stroke="#c9a878" strokeWidth="3.4" strokeLinecap="round" />
        ))}
        <text x="60" y="140" fontSize="12.5" fill="#8a5a3a" fontWeight="700">几乎无毛的"皱皮小香肠"</text>
        <text x="60" y="162" fontSize="12" fill="#8a5a3a">群体像蜜蜂：一只"女王"繁殖，"工鼠"挖洞找粮</text>
      </g>
      {/* 超能力 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">超能力合集：寿命超 30 年（同体型鼠类 30 倍）· 几乎不患癌 · 耐缺氧</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">无痛觉酸敏（不怕酸）· 体温随环境变化（近变温的哺乳动物）</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">科学研究热点：抗癌机制·抗衰老·缺氧耐受——"丑"得很重要</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">裸鼹鼠 · 啮齿目"长寿之王"（课外拓展）</text>
    </svg>
  );
}

function SeaOtterSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 海面与海藻 */}
      <g style={dim(active, 0)}>
        <path d="M30 90 q 220 -26 460 0" fill="none" stroke="#4d7ea8" strokeWidth="3" />
        <text x="60" y="66" fontSize="11.5" fill="#2c5a84" fontWeight="700">海藻林（巨藻）下</text>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${80 + i * 140} 96 q 6 30 -4 60 q -8 26 -16 40`} fill="none" stroke="#3f7f3a" strokeWidth="3.4" strokeLinecap="round" />
        ))}
      </g>
      {/* 海獭仰漂 */}
      <g style={dim(active, 1)}>
        <ellipse cx="250" cy="160" rx="90" ry="42" fill="#8a5a2a" stroke="#4a2a0a" strokeWidth="2.8" />
        <path d="M170 140 q -14 -20 -2 -34 q 14 -8 24 6 q 6 12 -10 22" fill="#6a4a1a" stroke="#3a2a0a" strokeWidth="2.2" />
        <circle cx="182" cy="112" r="4" fill="#141414" />
        <path d="M148 128 l -16 -6 m 18 10 l -18 2" stroke="#3a2a0a" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M330 150 q 30 -10 56 -6 m -56 16 q 30 -2 58 8" fill="none" stroke="#8a5a2a" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="200" cy="182" rx="20" ry="13" fill="#4a3a2a" stroke="#1a2a1a" strokeWidth="2" />
        <text x="60" y="250" fontSize="12.5" fill="#4a2a0a" fontWeight="700">仰漂在藻间，胸前"砧板"放石头</text>
        <text x="60" y="272" fontSize="12" fill="#4a2a0a">用石块砸开贝壳——动物"用工具"的案例</text>
      </g>
      {/* 关键种 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">"关键种"：控制海胆数量 → 保护海藻林 → 维持整片"水下森林"</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">海獭减少 → 海胆爆发 → 海藻林变成"海胆荒地"——营养级联的教科书案例</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">毛发密度全球第一（每平方厘米 10 万+ 根·无脂肪靠毛发保暖）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">海獭 · 鼬科海洋"关键种"（课外拓展）</text>
    </svg>
  );
}

function PolarBearSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 冰原 */}
      <g style={dim(active, 0)}>
        <path d="M40 250 q 200 -26 440 -4 l 0 80 l -440 0 Z" fill="#d8e8f4" stroke="#8ab4c9" strokeWidth="2.4" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${80 + i * 140} 268 q 40 -12 80 -2`} fill="none" stroke="#b5d8e8" strokeWidth="2" opacity="0.8" />
        ))}
        <text x="52" y="86" fontSize="12.5" fill="#2c5a84" fontWeight="700">北极海冰 = 狩猎平台</text>
      </g>
      {/* 北极熊 */}
      <g style={dim(active, 1)}>
        <ellipse cx="250" cy="200" rx="110" ry="52" fill="#f8f8f4" stroke="#c9d4d4" strokeWidth="2.8" />
        <circle cx="368" cy="150" r="26" fill="#f8f8f4" stroke="#c9d4d4" strokeWidth="2.4" />
        <path d="M386 142 q 14 -6 18 2 m -20 10 q 14 2 18 8" fill="none" stroke="#c9d4d4" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="374" cy="144" r="3.4" fill="#141414" />
        {[0, 1, 2, 3].map((i) => (
          <path key={`l${i}`} d={`M${190 + i * 46} 244 q 4 26 -2 44`} fill="none" stroke="#f8f8f4" strokeWidth="10" strokeLinecap="round" />
        ))}
        <path d="M150 220 q -20 10 -30 26" fill="none" stroke="#f8f8f4" strokeWidth="8" strokeLinecap="round" />
        <text x="60" y="146" fontSize="12.5" fill="#2c5a84" fontWeight="700">毛是透明的（散射呈白色）</text>
        <text x="60" y="166" fontSize="12" fill="#2c5a84">皮肤黑色（吸热保暖）</text>
      </g>
      {/* 威胁 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">气候变化的"旗舰物种"：海冰消失 → 猎海豹的平台减少 → 饥饿与数量下降</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">北极熊依赖海冰捕捉海豹（环形海豹）——无冰期越长，生存压力越大</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">污染物沿食物链富集到北极熊体内（与生物富集标本互参）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">北极熊 · 北极顶级捕食者（课外拓展）</text>
    </svg>
  );
}

function CobraSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 膨颈姿态 */}
      <g style={dim(active, 0)}>
        <path d="M240 250 q -20 -60 -60 -70 q -40 -12 -50 30 q -8 36 30 46 q 40 10 80 -6" fill="#8a6a3a" stroke="#5a3a0a" strokeWidth="2.8" />
        <path d="M330 246 q 20 -60 -14 -70 q -36 -12 -52 28 q -12 34 20 48 q 30 12 46 -6" fill="#8a6a3a" stroke="#5a3a0a" strokeWidth="2.8" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${196 + i * 22} 190 q 8 20 2 38`} fill="none" stroke="#5a3a0a" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        {[0, 1].map((i) => (
          <circle key={`e${i}`} cx={278 + i * 22} cy={200} r="5" fill="#141414" />
        ))}
        <text x="52" y="140" fontSize="12.5" fill="#5a3a0a" fontWeight="700">膨颈威吓（不主动攻击人）</text>
        <text x="52" y="162" fontSize="12" fill="#5a3a0a">毒液本质：捕食与防御的"化学武器"</text>
      </g>
      {/* 毒液成分 */}
      <g style={dim(active, 1)}>
        <rect x="336" y="160" width="150" height="106" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="411" y="186" textAnchor="middle" fontSize="11.5" fill="#8a671b" fontWeight="800">毒液是"鸡尾酒"</text>
        <text x="411" y="210" textAnchor="middle" fontSize="10.5" fill="#a5761d">神经毒素（阻断神经-肌肉）</text>
        <text x="411" y="232" textAnchor="middle" fontSize="10.5" fill="#a5761d">细胞毒素（破坏组织）</text>
        <text x="411" y="254" textAnchor="middle" fontSize="10" fill="#799398">眼镜蛇以神经毒为主</text>
      </g>
      {/* 医学价值 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">毒与药一体：蛇毒成分是降压·镇痛·抗血栓药物研究的"分子宝库"</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">抗蛇毒血清 = 用少量毒素免疫马羊后提取的抗体（被动免疫）</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">被蛇咬：保持冷静·记住蛇的样子·勿奔跑（加速毒液扩散）·尽快就医</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">眼镜蛇 · 毒蛇与毒液科学（课外拓展）</text>
    </svg>
  );
}

function AntSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 蚁后 */}
      <g style={dim(active, 0)}>
        <ellipse cx="140" cy="150" rx="30" ry="20" fill="#8a4a2a" stroke="#4a2a0a" strokeWidth="2.6" />
        <path d="M170 146 q 60 -16 130 -6" fill="none" stroke="#8a4a2a" strokeWidth="14" strokeLinecap="round" />
        <circle cx="132" cy="132" r="9" fill="#5a2a0a" stroke="#3a1a0a" strokeWidth="1.8" />
        <path d="M124 118 q -6 -14 -16 -16 m 20 16 q 4 -16 14 -18" fill="none" stroke="#4a2a0a" strokeWidth="2" strokeLinecap="round" />
        <text x="52" y="110" fontSize="12.5" fill="#4a2a0a" fontWeight="700">蚁后（可活 10~20 年·日产卵千粒）</text>
      </g>
      {/* 工蚁 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <ellipse cx={200 + i * 70} cy={210} rx="16" ry="10" fill="#8a4a2a" stroke="#4a2a0a" strokeWidth="2" />
            <circle cx={178 + i * 70} cy={200} r="7" fill="#5a2a0a" stroke="#3a1a0a" strokeWidth="1.6" />
            <path d={`M${216 + i * 70} 206 q 20 -6 34 2`} fill="none" stroke="#4a2a0a" strokeWidth="6" strokeLinecap="round" />
            {[0, 1, 2].map((j) => (
              <path key={`l${i}${j}`} d={`M${190 + i * 70 + j * 8} 218 l -6 12 m 8 -10 l 6 12`} stroke="#4a2a0a" strokeWidth="2" strokeLinecap="round" />
            ))}
          </g>
        ))}
        <text x="60" y="252" fontSize="12.5" fill="#4a2a0a" fontWeight="700">工蚁全部为雌性（不育）· 分工：保姆→建筑→觅食→防御</text>
      </g>
      {/* 蚁狮? no - 搬运与协作 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">超个体：整群像"一个生物"——信息素"语言"协调百万工蚁</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">切叶蚁"种植"真菌当口粮 · 蚜虫"放牧"取蜜露——动物的"农业与畜牧"</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">与白蚁对比：蚂蚁是膜翅目（与蜜蜂同目），白蚁是蜚蠊目（蟑螂近亲）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蚂蚁 · 膜翅目社会性昆虫（课外拓展）</text>
    </svg>
  );
}

function ElephantSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="200" rx="120" ry="88" fill="#9a9a9a" stroke="#5a5a5a" strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${160 + i * 60} 270 v 50`} stroke="#8a8a8a" strokeWidth="18" strokeLinecap="round" />
        ))}
        <path d="M180 270 q -8 -30 6 -56 m 120 60 q 10 -26 4 -50" fill="none" stroke="#6a6a6a" strokeWidth="2" opacity="0.7" />
        <text x="380" y="150" fontSize="12.5" fill="#5a5a5a" fontWeight="700">最大的陆生动物（6 吨）</text>
        <text x="380" y="170" fontSize="12" fill="#5a5a5a">日食 150 kg 植物</text>
      </g>
      {/* 头鼻耳 */}
      <g style={dim(active, 1)}>
        <ellipse cx="160" cy="140" rx="40" ry="44" fill="#8a8a8a" stroke="#5a5a5a" strokeWidth="2.6" />
        <path d="M126 130 l -30 -10 m 30 22 l -34 0" stroke="#5a5a5a" strokeWidth="6" strokeLinecap="round" />
        <circle cx="140" cy="122" r="5" fill="#2a2a2a" />
        <path d="M148 184 q -6 60 -30 96" fill="none" stroke="#8a8a8a" strokeWidth="12" strokeLinecap="round" />
        <text x="42" y="110" fontSize="12.5" fill="#5a5a5a" fontWeight="700">鼻+上唇= "象鼻"</text>
        <text x="42" y="130" fontSize="12" fill="#5a5a5a">4 万块肌肉·可拾起花生</text>
      </g>
      {/* 象牙与耳 */}
      <g style={dim(active, 2)}>
        <path d="M118 148 q -14 30 -8 58" fill="none" stroke="#f4f0e4" strokeWidth="7" strokeLinecap="round" />
        <text x="380" y="230" fontSize="12" fill="#5a5a5a" fontWeight="700">大象耳：散热" radiator"</text>
        <text x="356" y="250" fontSize="12" fill="#5a5a5a" fontWeight="700">次声波远距交流</text>
        <text x="360" y="270" fontSize="12" fill="#5a5a5a" fontWeight="700">象牙=特化门齿</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">"生态工程师"：开路·挖水·拆树——营造栖息地，让无数物种受益</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#a5761d">保护现状：非洲草原象濒危·非洲森林象极危——象牙贸易是最大威胁</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">大象 · 长鼻目"生态工程师"（课外拓展）</text>
    </svg>
  );
}

function FlamingoSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 腿（单腿站立） */}
      <g style={dim(active, 0)}>
        <path d="M240 300 v 60" stroke="#e88a8a" strokeWidth="6" strokeLinecap="round" />
        <path d="M228 362 h 26" stroke="#e88a8a" strokeWidth="4" strokeLinecap="round" />
        <text x="150" y="356" fontSize="12.5" fill="#c96a6a" fontWeight="700">单腿站立：减少热量散失（物理）</text>
        <path d="M100 366 h 320" stroke="#8a9aaf" strokeWidth="2.4" />
      </g>
      {/* 身体 */}
      <g style={dim(active, 1)}>
        <ellipse cx="250" cy="250" rx="70" ry="46" fill="#f4a0a0" stroke="#c96a6a" strokeWidth="2.8" />
        <path d="M170 240 q -40 -6 -70 8" fill="none" stroke="#f4a0a0" strokeWidth="8" strokeLinecap="round" />
        <path d="M300 226 q 50 -14 90 2 q 40 14 20 44 q -24 26 -70 10 q -50 -16 -40 -56 Z" fill="#f4b0a8" stroke="#c96a6a" strokeWidth="2.4" />
        <path d="M240 206 l 0 -80" stroke="#e88a8a" strokeWidth="8" strokeLinecap="round" />
        <text x="70" y="180" fontSize="12.5" fill="#c96a6a" fontWeight="700">S 形长颈</text>
      </g>
      {/* 头与喙 */}
      <g style={dim(active, 2)}>
        <ellipse cx="240" cy="112" rx="24" ry="16" fill="#f4b0a8" stroke="#c96a6a" strokeWidth="2.4" />
        <circle cx="246" cy="106" r="3.4" fill="#2a1a0a" />
        <path d="M262 106 q 30 -4 42 8 q -14 8 -42 4 Z" fill="#e8e4d8" stroke="#a5765a" strokeWidth="2.2" />
        <text x="60" y="140" fontSize="12.5" fill="#8a5a3a" fontWeight="700">下弯梳状喙：滤食藻类</text>
        <text x="60" y="160" fontSize="12" fill="#8a5a3a">头朝下倒立滤食（独特姿态）</text>
      </g>
      {/* 粉色来源 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="60" width="440" height="60" rx="12" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.4" />
        <text x="260" y="84" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="800">粉色不是天生的！来自食物中的类胡萝卜素（虾青素）</text>
        <text x="260" y="106" textAnchor="middle" fontSize="11" fill="#a5533c">人工饲养喂无色素饲料 → 羽毛变白——"吃出颜色"的活体证明</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">火烈鸟 · 色素与食物链（课外拓展）</text>
    </svg>
  );
}

function SnowLeopardSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 雪山 */}
      <g style={dim(active, 0)}>
        <path d="M40 250 L 150 90 L 240 200 L 330 70 L 460 250 Z" fill="#e4ecf4" stroke="#8a9aaf" strokeWidth="2.6" />
        <path d="M150 90 L 190 150 L 160 148 L 200 200 L 240 200 L 150 90 Z" fill="#f4f8fc" />
        <path d="M330 70 L 370 140 L 340 130 L 380 210 L 460 250" fill="none" stroke="#8a9aaf" strokeWidth="1.6" />
        <text x="356" y="62" fontSize="12.5" fill="#4a6a8a" fontWeight="700">海拔 3000~5000 米雪线</text>
      </g>
      {/* 雪豹 */}
      <g style={dim(active, 1)}>
        <path d="M180 220 q -10 -50 60 -62 q 90 -14 150 12 q 40 18 30 46 q -14 34 -90 38 q -110 6 -150 -34 Z" fill="#c9c4b8" stroke="#6a5a4a" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${210 + i * 38} ${182 + (i % 2) * 14} q 8 -10 16 -2 q 6 10 -4 16 q -12 4 -12 -14`} fill="none" stroke="#5a4a3a" strokeWidth="2.2" />
        ))}
        <path d="M180 224 q -16 30 -44 40" fill="none" stroke="#c9c4b8" strokeWidth="14" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={`l${i}`} d={`M${230 + i * 34} 254 q 4 22 -2 38`} fill="none" stroke="#c9c4b8" strokeWidth="8" strokeLinecap="round" />
        ))}
        <text x="46" y="62" fontSize="12.5" fill="#4a5a4a" fontWeight="700">灰白底+玫瑰斑（雪地伪装）</text>
        <text x="60" y="230" fontSize="12.5" fill="#4a5a4a" fontWeight="700">长尾：平衡+御寒"围巾"</text>
      </g>
      {/* 保护 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">高山生态系统的"伞护种"：保护雪豹就保护了整片雪山家园</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">全球仅存约 4000~6000 只·我国占 60% 以上——国家一级保护动物</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">气候变化使雪线上移→栖息地碎片化——"雪山之王"的生存告急</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">雪豹 · 高山旗舰保护物种（课外拓展）</text>
    </svg>
  );
}

function KrillSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 磷虾群 */}
      <g style={dim(active, 0)}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <ellipse key={i} cx={110 + (i % 3) * 90} cy={100 + Math.floor(i / 3) * 70} rx="18" ry="8" fill="#e8a0a0" stroke="#a54858" strokeWidth="1.8" transform={`rotate(${i * 15} ${110 + (i % 3) * 90} ${100 + Math.floor(i / 3) * 70})`} />
        ))}
        <text x="260" y="50" textAnchor="middle" fontSize="12.5" fill="#8a3a4a" fontWeight="800">南大洋磷虾：总生物量数亿吨——地球上生物量最大的物种之一</text>
        <text x="330" y="88" fontSize="12" fill="#a54858" fontWeight="700">体长仅 5~6 厘米</text>
      </g>
      {/* 食物链基石 */}
      <g style={dim(active, 1)}>
        <path d="M90 210 q 60 -30 120 -10 m -120 40 q 90 30 170 6 m -170 -10 q 120 40 190 10" fill="none" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="110" y="290" fontSize="12.5" fill="#2c5a84" fontWeight="700">磷虾 → 鲸·海豹·企鹅·鱼类的主粮</text>
        <text x="110" y="312" fontSize="12" fill="#2c5a84">一只蓝鲸一天可吞食约 4 吨磷虾</text>
      </g>
      {/* 生态警示 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="322" width="440" height="46" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="342" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">海冰消失 → 磷虾幼体失去栖息地 → 整条南极食物链"地基"动摇</text>
        <text x="260" y="360" textAnchor="middle" fontSize="10.5" fill="#a5761d">磷虾渔业扩张需谨慎——"基石物种"撑不起过度捕捞</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">磷虾 · 南大洋食物链的基石（课外拓展）</text>
    </svg>
  );
}

function WeaverBirdSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 树枝 */}
      <g style={dim(active, 0)}>
        <path d="M60 80 q 200 -30 400 -8" fill="none" stroke="#8a6a3a" strokeWidth="10" strokeLinecap="round" />
      </g>
      {/* 挂巢 */}
      <g style={dim(active, 1)}>
        <path d="M240 74 q 30 -4 50 4 q 20 30 8 70 q -10 36 -34 40 q -28 -6 -36 -42 q -8 -42 12 -72 Z" fill="#c9a05a" stroke="#8a6a2a" strokeWidth="2.8" />
        <ellipse cx="266" cy="150" rx="10" ry="7" fill="#5a3a1a" stroke="#3a2a0a" strokeWidth="1.6" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${244 + i * 22} 96 q 4 26 -2 52`} fill="none" stroke="#8a6a2a" strokeWidth="1.8" opacity="0.8" />
        ))}
        <text x="330" y="140" fontSize="12.5" fill="#8a6a2a" fontWeight="700">倒挂的"吊巢"：入口朝下</text>
        <text x="330" y="160" fontSize="12" fill="#8a6a2a">蛇类难以入侵（防天敌设计）</text>
      </g>
      {/* 织布鸟 */}
      <g style={dim(active, 2)}>
        <ellipse cx="150" cy="150" rx="30" ry="20" fill="#e8c83a" stroke="#a58a2a" strokeWidth="2.4" />
        <circle cx="178" cy="136" r="10" fill="#3a3a2a" stroke="#1a1a1a" strokeWidth="1.8" />
        <path d="M186 132 l 12 4 m -12 4 l 10 6" stroke="#e8a03a" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="182" cy="132" r="3" fill="#141414" />
        <path d="M136 168 q -10 22 -30 28" fill="none" stroke="#a58a2a" strokeWidth="5" strokeLinecap="round" />
        <text x="46" y="216" fontSize="12.5" fill="#8a671b" fontWeight="700">雄鸟用喙"织"草叶：</text>
        <text x="46" y="236" fontSize="12" fill="#8a671b">穿·拉·打结——真正的"编织"动作</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">先天行为：从未见过的年轻织布鸟也能织出合格的巢（遗传程序）</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">后天经验让工艺更精细——先天程序 + 后天练习的组合</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">行为生态学：巢的"精装修"是雄鸟向雌鸟展示的"健康证明"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">织布鸟 · 动物界的建筑大师（课外拓展）</text>
    </svg>
  );
}

function MoleSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 地下隧道 */}
      <g style={dim(active, 0)}>
        <path d="M50 260 q 200 -40 420 -10" fill="none" stroke="#6a5230" strokeWidth="44" strokeLinecap="round" />
        <path d="M60 256 q 200 -30 400 -6" fill="none" stroke="#8a7248" strokeWidth="30" strokeLinecap="round" />
        <text x="52" y="86" fontSize="12.5" fill="#6a5a2a" fontWeight="700">地下隧道：终年黑暗·缺氧高二氧化碳</text>
      </g>
      {/* 鼹鼠 */}
      <g style={dim(active, 1)}>
        <ellipse cx="250" cy="248" rx="80" ry="34" fill="#2a2a2a" stroke="#111111" strokeWidth="2.8" />
        <circle cx="168" cy="238" r="18" fill="#2a2a2a" stroke="#111" strokeWidth="2.4" />
        <path d="M152 232 l -12 -4 m 12 8 l -14 4" stroke="#d8b890" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M162 226 q 2 -10 10 -12" fill="none" stroke="#111" strokeWidth="2" />
        {[0, 1].map((i) => (
          <path key={i} d={`M${170 + i * 20} 232 l ${8 - i * 3} -10`} stroke="#e8c9a0" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <path key={`f${i}`} d={`M${290 + i * 34} 264 q 10 14 26 16 m -26 -16 q -2 14 8 22`} fill="none" stroke="#2a2a2a" strokeWidth="6" strokeLinecap="round" />
        ))}
        <path d="M326 240 q 30 -8 52 -22" fill="none" stroke="#2a2a2a" strokeWidth="10" strokeLinecap="round" />
        <text x="386" y="188" fontSize="12.5" fill="#2a2a2a" fontWeight="700">"挖掘机"前掌（外翻）</text>
        <text x="396" y="140" fontSize="12.5" fill="#3a3a2a" fontWeight="700">眼睛退化·几乎全盲</text>
        <text x="396" y="160" fontSize="12" fill="#3a3a2a">靠触觉与嗅觉"看"世界</text>
      </g>
      {/* 适应 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="312" width="440" height="56" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="336" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">地下适应：绒毛不定向（可倒退）· 血红蛋白携氧高效· 血液 pH 缓冲力强</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">每小时挖掘 30 米隧道——"移动的地下挖掘机"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">鼹鼠 · 食虫目地下生活（课外拓展）</text>
    </svg>
  );
}

function ZebraSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体与条纹 */}
      <g style={dim(active, 0)}>
        <path d="M130 210 q -6 -60 60 -74 q 100 -20 190 6 q 50 14 48 52 q -4 42 -70 54 q -120 20 -190 -6 q -36 -14 -38 -32 Z" fill="#f0f0e8" stroke="#3a3a3a" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <path key={i} d={`M${150 + i * 30} ${142 + (i % 3) * 6} q 6 44 -2 88`} fill="none" stroke="#2a2a2a" strokeWidth="9" strokeLinecap="round" />
        ))}
        <path d="M424 176 l 30 -18 m -30 30 l 32 -2" stroke="#2a2a2a" strokeWidth="5" strokeLinecap="round" />
        <text x="380" y="112" fontSize="12.5" fill="#2a2a2a" fontWeight="700">每只斑马的条纹独一无二</text>
        <text x="380" y="132" fontSize="12" fill="#2a2a2a">（群体识别的"条形码"）</text>
      </g>
      {/* 头腿 */}
      <g style={dim(active, 1)}>
        <path d="M134 182 q -26 -10 -34 -34 q 18 -8 32 4 q 12 10 12 26" fill="#f0f0e8" stroke="#2a2a2a" strokeWidth="2.4" />
        {[0, 1, 2, 3].map((i) => (
          <path key={`l${i}`} d={`M${168 + i * 60} 236 v 66`} stroke="#2a2a2a" strokeWidth="9" strokeLinecap="round" />
        ))}
        <path d="M158 306 h 26 m 130 -4 h 26" stroke="#2a2a2a" strokeWidth="5" strokeLinecap="round" />
        <text x="60" y="180" fontSize="12.5" fill="#2a2a2a" fontWeight="700">条纹延伸到蹄与鬃</text>
      </g>
      {/* 条纹功能假说 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">条纹之谜的假说："防蝇叮咬"证据最强（条纹干扰采采蝇降落）</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">其他假说：群体"运动眩晕"扰乱捕食者·热调节（黑白条纹微气流）·社会识别</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">科学方法示范：同一问题·多个假说·逐一检验——"防蝇说"近年实验支持最多</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">斑马 · 马科"条纹之谜"（课外拓展）</text>
    </svg>
  );
}

function MudskipperSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 泥滩 */}
      <g style={dim(active, 0)}>
        <path d="M40 250 q 220 -26 440 0 l 0 80 l -440 0 Z" fill="#8a7a5a" stroke="#6a5a3a" strokeWidth="2.4" />
        <path d="M60 260 q 100 -14 200 -4 m -180 30 q 90 -10 170 -2" fill="none" stroke="#a5966a" strokeWidth="2" opacity="0.7" />
        <text x="60" y="146" fontSize="12.5" fill="#5a4a2a" fontWeight="700">红树林泥滩：潮间带的"两栖世界"</text>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${130 + i * 110} 240 q 2 -26 14 -34`} fill="none" stroke="#3f7f3a" strokeWidth="3.4" strokeLinecap="round" />
        ))}
      </g>
      {/* 弹涂鱼 */}
      <g style={dim(active, 1)}>
        <ellipse cx="210" cy="230" rx="52" ry="26" fill="#5a7a8a" stroke="#2a4a5a" strokeWidth="2.6" />
        <path d="M256 216 q 20 -10 30 -2 q -8 14 -30 14" fill="#5a7a8a" stroke="#2a4a5a" strokeWidth="2.2" />
        <circle cx="196" cy="216" r="8" fill="#f4f0d8" stroke="#2a4a5a" strokeWidth="1.8" />
        <circle cx="198" cy="217" r="3.4" fill="#141414" />
        <path d="M172 208 q 8 -16 26 -14" fill="none" stroke="#2a4a5a" strokeWidth="2" />
        {[0, 1].map((i) => (
          <path key={`f${i}`} d={`M${190 + i * 44} 250 q 6 -18 18 -20 m -14 22 q 10 -10 24 -8`} fill="none" stroke="#3a5a5a" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="330" y="244" fontSize="12.5" fill="#2a4a5a" fontWeight="700">胸鳍变"拐杖"·支撑跳跃</text>
        <text x="330" y="264" fontSize="12" fill="#2a4a5a">能爬红树林根（吸盘状腹鳍）</text>
      </g>
      {/* 适应 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="76" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">离水呼吸"三件套"：湿润皮肤换气 · 口腔黏膜呼吸 · 鳃腔储水</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#537078">眼睛高突头顶且能转动——水陆两头兼顾的"潜望镜"</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#537078">演化视角：它们是脊椎动物登陆艰辛历程的"活体提醒"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">弹涂鱼 · 辐鳍鱼纲虾虎鱼科（课外拓展）</text>
    </svg>
  );
}

function WoodpeckerSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 树干 */}
      <g style={dim(active, 0)}>
        <path d="M250 60 L 250 320" stroke="#8a6a3a" strokeWidth="52" strokeLinecap="round" />
        <path d="M224 40 q 26 -14 52 0 l -8 40 l -36 0 Z" fill="#5a9a3a" stroke="#2f6f2a" strokeWidth="2.4" />
        <ellipse cx="180" cy="60" rx="34" ry="16" fill="#5a9a3a" stroke="#2f6f2a" strokeWidth="2" transform="rotate(-24 180 60)" />
        <ellipse cx="320" cy="60" rx="34" ry="16" fill="#5a9a3a" stroke="#2f6f2a" strokeWidth="2" transform="rotate(24 320 60)" />
        <text x="380" y="44" fontSize="12.5" fill="#2f6f2a" fontWeight="700">凿树洞：取食+筑巢两用</text>
      </g>
      {/* 啄木鸟 */}
      <g style={dim(active, 1)}>
        <ellipse cx="250" cy="150" rx="34" ry="46" fill="#1a1a1a" stroke="#000000" strokeWidth="2.4" />
        <path d="M224 128 q 26 -20 52 0" fill="none" stroke="#e8e4d8" strokeWidth="2.4" />
        <circle cx="244" cy="118" r="9" fill="#1a1a1a" stroke="#000" strokeWidth="2" />
        <circle cx="247" cy="115" r="3" fill="#141414" />
        <path d="M252 114 l 22 8 l -22 8 Z" fill="#4a3a2a" />
        <path d="M226 176 l -8 24 m 24 -20 l 6 26 m 22 -28 l 8 22" stroke="#8a6a3a" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M258 168 l 18 -14" stroke="#e8e4d8" strokeWidth="3" strokeLinecap="round" />
        <text x="330" y="140" fontSize="12.5" fill="#4a3a2a" fontWeight="700">刚尾羽"撑"在树上当三脚架</text>
        <text x="330" y="160" fontSize="12" fill="#4a3a2a">每秒啄 15~20 次·一天上万次</text>
      </g>
      {/* 防震秘诀 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">防震"三件套"：海绵状颅骨 · 舌骨绕颅一圈像"安全带" · 上喙略长分散冲击</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">直线啄击避免旋转伤 · 眼内"幕帘"防视网膜震落——冲击力千倍重力也不脑震荡</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">"树医生"：啄食树皮下蛀虫·旧树洞成为猫头鹰等几十种动物的"二手房"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">啄木鸟 · 鴷形目"树医生"（课外拓展）</text>
    </svg>
  );
}

function OstrichSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <ellipse cx="230" cy="180" rx="92" ry="66" fill="#4a4a4a" stroke="#1a1a1a" strokeWidth="2.8" />
        <path d="M200 150 q 60 -16 110 6" fill="none" stroke="#6a6a6a" strokeWidth="2.4" opacity="0.7" />
        <path d="M318 196 q 30 10 42 34 l -10 6 q -22 -18 -40 -24" fill="#4a4a4a" stroke="#1a1a1a" strokeWidth="2.2" />
        <text x="46" y="56" fontSize="12.5" fill="#1a1a1a" fontWeight="700">世界最大的鸟（可重 150 kg）</text>
        <text x="356" y="170" fontSize="12" fill="#1a1a1a">羽毛无"飞行小钩"——不能飞</text>
      </g>
      {/* 头颈 */}
      <g style={dim(active, 1)}>
        <path d="M300 128 q 20 -40 34 -60" fill="none" stroke="#b5764a" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="342" cy="60" rx="22" ry="14" fill="#b5764a" stroke="#7a4a2a" strokeWidth="2.4" />
        <circle cx="336" cy="56" r="4.5" fill="#141414" />
        <path d="M362 60 l 12 2 m -12 6 l 10 4" stroke="#7a4a2a" strokeWidth="2.2" strokeLinecap="round" />
        <text x="60" y="82" fontSize="12.5" fill="#7a4a2a" fontWeight="700">小头长颈 · 大眼睛睫毛浓密</text>
        <text x="60" y="98" fontSize="12" fill="#7a4a2a">视力极佳——"远望哨兵"</text>
      </g>
      {/* 腿 */}
      <g style={dim(active, 2)}>
        {[0, 1].map((i) => (
          <path key={i} d={`M${206 + i * 52} 244 q ${-4 + i * 6} 34 ${-10 + i * 8} 60`} fill="none" stroke="#b5764a" strokeWidth="9" strokeLinecap="round" />
        ))}
        {[0, 1].map((i) => (
          <path key={`f${i}`} d={`M${194 + i * 50} 306 h 20`} stroke="#8a5a2a" strokeWidth="6" strokeLinecap="round" />
        ))}
        <text x="52" y="290" fontSize="12.5" fill="#7a4a2a" fontWeight="700">只有 2 个脚趾（ unique）· 奔跑 70 km/h</text>
        <path d="M156 306 h 24 m 160 0 h 24" stroke="#7a4a2a" strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="322" width="440" height="46" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="342" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"不会飞的鸟"失去飞行换来巨腿冲刺——机会成本式的演化权衡</text>
        <text x="260" y="360" textAnchor="middle" fontSize="11" fill="#a5761d">公鸟孵卵守夜（羽毛拟态灌木）· 与蜂鸟（最小鸟）对比记忆</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">鸵鸟 · 平胸鸟类代表（课外拓展）</text>
    </svg>
  );
}

function DolphinSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 海豚 */}
      <g style={dim(active, 0)}>
        <path d="M120 190 q 60 -70 190 -56 q 80 8 120 40 q -30 40 -110 44 q -130 8 -200 -28 Z" fill="#7a9ab5" stroke="#3a5a7a" strokeWidth="2.8" />
        <path d="M118 168 q -34 -10 -44 -34 q 26 2 40 18 q 10 10 4 16 Z" fill="#5a7a95" stroke="#3a5a7a" strokeWidth="2.2" />
        <path d="M416 168 q 26 -6 38 -22 l 16 30 q -28 14 -54 6" fill="#5a7a95" stroke="#3a5a7a" strokeWidth="2.4" />
        <path d="M240 132 q 40 -20 90 -8" fill="none" stroke="#a5c4d8" strokeWidth="3" opacity="0.8" />
        <path d="M300 180 q 40 16 90 6" fill="none" stroke="#3a5a7a" strokeWidth="5" strokeLinecap="round" />
        <path d="M200 176 q 16 -8 30 -2 m 30 4 q 16 -8 30 -2" fill="none" stroke="#3a5a7a" strokeWidth="2.6" strokeLinecap="round" />
        <text x="396" y="140" fontSize="12.5" fill="#3a5a7a" fontWeight="700">喙状吻·永久的"微笑"</text>
      </g>
      {/* 回声定位 */}
      <g style={dim(active, 1)}>
        <path d="M110 150 Q 60 140 46 110" fill="none" stroke="#e8a03a" strokeWidth="2.6" strokeDasharray="5 4" />
        <path d="M46 110 q 10 -6 18 -2 m -18 2 l -2 12" fill="none" stroke="#e8a03a" strokeWidth="2.2" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${34 - i * 6} ${104 - i * 8} q 6 -8 14 -6`} fill="none" stroke="#e8a03a" strokeWidth="1.8" opacity={0.9 - i * 0.25} />
        ))}
        <text x="52" y="80" fontSize="12.5" fill="#8a671b" fontWeight="700">回声定位："生物声呐"</text>
        <text x="52" y="100" fontSize="12" fill="#a5761d">额隆体聚焦超声波·回波成像</text>
      </g>
      {/* 智慧 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">大脑/body 比值仅次于人类：有自我意识（认镜子里的自己）· 有独特"签名哨声"</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">社会性极强：群体协作捕鱼·照顾受伤同伴——"利他行为"的哺乳动物代表</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">睡眠方式特别：两个半脑轮流睡觉（半脑睡眠），一只眼睁着警戒</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">海豚 · 鲸目"智慧海洋 mammal"（课外拓展）</text>
    </svg>
  );
}

function CapybaraSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 水豚 */}
      <g style={dim(active, 0)}>
        <path d="M130 220 q 4 -70 90 -76 q 110 -8 160 20 q 40 22 30 58 q -10 40 -80 44 q -130 8 -200 -46 Z" fill="#a5763a" stroke="#6a4a1a" strokeWidth="2.8" />
        <rect x="340" y="176" width="52" height="30" rx="12" fill="#a5763a" stroke="#6a4a1a" strokeWidth="2.4" />
        <circle cx="398" cy="186" r="4" fill="#2a1a0a" />
        <path d="M352 168 q 6 -12 14 -14" fill="none" stroke="#6a4a1a" strokeWidth="3" strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${160 + i * 60} 254 v 34 m -8 -30 h 16`} stroke="#6a4a1a" strokeWidth="5" strokeLinecap="round" />
        ))}
        <text x="60" y="140" fontSize="12.5" fill="#6a4a1a" fontWeight="700">世界最大的啮齿动物（可重 65 kg）</text>
        <text x="60" y="162" fontSize="12" fill="#8a6a3a">半水生：趾间有蹼·游泳健将</text>
      </g>
      {/* 背上的小鸟 */}
      <g style={dim(active, 1)}>
        {[0, 1].map((i) => (
          <g key={i}>
            <ellipse cx={220 + i * 60} cy={148} rx="10" ry="7" fill="#e8a03a" stroke="#8a671b" strokeWidth="1.6" />
            <path d={`M${228 + i * 60} 144 l 8 -4`} stroke="#8a671b" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        ))}
        <text x="300" y="146" fontSize="12" fill="#8a671b" fontWeight="600">背上常"搭便车"的小鸟</text>
      </g>
      {/* 社交与生态 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="292" width="440" height="74" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="316" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"动物界社交达人"：鳄鱼·鸟·猫甚至其他种动物都爱挨着它</text>
        <text x="260" y="340" textAnchor="middle" fontSize="11.5" fill="#a5761d">群体生活（10~20 只家族群）· 性情温和——平和可能也是一种生存策略</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11.5" fill="#a5761d">与其他啮齿类对比：家鼠夜间独来独往·水豚白天群聚水边</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">水豚 · 啮齿目的"暖男"（课外拓展）</text>
    </svg>
  );
}

function OwlSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 树枝 */}
      <g style={dim(active, 0)}>
        <path d="M90 280 q 160 -30 350 -16" fill="none" stroke="#8a6a3a" strokeWidth="12" strokeLinecap="round" />
      </g>
      {/* 身体 */}
      <g style={dim(active, 1)}>
        <ellipse cx="260" cy="190" rx="88" ry="100" fill="#8a7a5a" stroke="#4a3a2a" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${200 + (i % 3) * 50} ${140 + Math.floor(i / 3) * 30} q 24 -10 48 2`} fill="none" stroke="#6a5a3a" strokeWidth="2" opacity="0.8" />
        ))}
        <text x="380" y="120" fontSize="12.5" fill="#4a3a2a" fontWeight="700">蓬松羽毛的"锯齿"边缘</text>
        <text x="380" y="140" fontSize="12" fill="#4a3a2a">消音飞行——夜袭无声</text>
      </g>
      {/* 头与脸盘 */}
      <g style={dim(active, 2)}>
        <circle cx="260" cy="104" r="46" fill="#a58a5a" stroke="#4a3a2a" strokeWidth="2.6" />
        <path d="M222 84 q 38 -18 76 0 q -38 22 -76 0" fill="#d8c8a8" stroke="#8a6a3a" strokeWidth="2" />
        {[0, 1].map((i) => (
          <circle key={i} cx={238 + i * 44} cy={88} r="10" fill="#f4d03a" stroke="#8a671b" strokeWidth="2" />
        ))}
        {[0, 1].map((i) => (
          <circle key={`p${i}`} cx={238 + i * 44} cy={88} r="4" fill="#141414" />
        ))}
        <path d="M252 96 l 8 22 l 8 -22 Z" fill="#e8b83a" stroke="#8a671b" strokeWidth="1.6" />
        <text x="42" y="84" fontSize="12.5" fill="#4a3a2a" fontWeight="700">脸盘像"卫星天线"</text>
        <text x="42" y="104" fontSize="12.5" fill="#4a3a2a" fontWeight="700">汇聚声波·夜视超群</text>
        <text x="42" y="124" fontSize="12" fill="#4a3a2a">眼睛固定·转头 270° 补偿</text>
      </g>
      {/* 特征 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="300" width="440" height="66" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">吐食丸：把无法消化的骨头毛发团成丸吐出——研究它就能知道"昨晚吃了啥"</text>
        <text x="260" y="348" textAnchor="middle" fontSize="11.5" fill="#a5761d">不对称耳孔精确定位声源 · 雪夜捕鼠命中率极高——顶级夜行猛禽</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">猫头鹰 · 夜行猛禽（课外拓展）</text>
    </svg>
  );
}

function PoisonDartFrogSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 蛙 */}
      <g style={dim(active, 0)}>
        <ellipse cx="240" cy="230" rx="66" ry="46" fill="#2a6adb" stroke="#1a3a8a" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i} cx={204 + (i % 3) * 34} cy={214 + Math.floor(i / 3) * 22} rx="9" ry="6" fill="#f4d03a" stroke="#8a671b" strokeWidth="1.4" />
        ))}
        <circle cx="290" cy="188" r="22" fill="#2a6adb" stroke="#1a3a8a" strokeWidth="2.4" />
        <circle cx="296" cy="180" r="5" fill="#141414" />
        {[0, 1].map((i) => (
          <path key={i} d={`M${304 + i * 26} ${206 + i * 30} q 20 8 34 0 m -34 0 l -6 -14`} stroke="#1a3a8a" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="330" y="170" fontSize="12.5" fill="#1a3a8a" fontWeight="700">蓝底黄斑——鲜艳的"警告牌"</text>
        <text x="356" y="192" fontSize="12.5" fill="#1a3a8a" fontWeight="700">毒性最强的脊椎动物之一</text>
      </g>
      {/* 毒素来源 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="120" width="150" height="60" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="121" y="144" textAnchor="middle" fontSize="11.5" fill="#8a671b" fontWeight="800">毒素来自食物</text>
        <text x="121" y="164" textAnchor="middle" fontSize="10.5" fill="#a5761d">野外吃有毒蚂蚁·螨虫</text>
        <path d="M200 168 q 30 -16 40 -34" fill="none" stroke="#8a671b" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 育幼 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="76" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">育幼行为：亲蛙背蝌蚪"搬家"，逐个放入凤梨科植物的"水杯"中</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">母蛙还会回来给每杯产未受精卵作为"口粮"——两栖动物中的模范家长</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">警戒色 + 毒素 = 不被捕食的"免死金牌"（与保护色策略相反）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">箭毒蛙 · 两栖纲无尾目（课外拓展）</text>
    </svg>
  );
}

function KangarooSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <path d="M180 300 q -30 -60 -8 -140 q 8 -44 48 -56 q 10 -26 34 -20 q 20 6 12 30 q 60 20 76 96 q 10 50 -20 74 q 30 4 60 -6 m -60 6 q 20 16 44 20 m -130 -22 q -20 18 -44 20" fill="none" stroke="#b5764a" strokeWidth="0" />
        <path d="M196 302 q -26 -64 -6 -142 q 10 -46 52 -56 l 10 -30 q 6 -16 22 -8 q 14 8 6 26 l -8 20 q 66 22 82 100 q 8 46 -24 76 q 26 -2 52 -14 q -22 26 -56 24 l -8 22 h -20 l 6 -20 l -60 4 l 4 18 h -20 l 2 -20 q -20 -2 -42 -8" fill="#b5764a" stroke="#7a4a2a" strokeWidth="2.8" />
        <path d="M292 60 q 12 -10 22 -4" fill="none" stroke="#7a4a2a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="296" cy="88" r="4" fill="#2a1a0a" />
        <text x="356" y="120" fontSize="12.5" fill="#7a4a2a" fontWeight="700">强壮后腿 + 大尾巴</text>
        <text x="356" y="140" fontSize="12" fill="#7a4a2a">"三足鼎立"的休息姿态</text>
      </g>
      {/* 育儿袋 */}
      <g style={dim(active, 1)}>
        <path d="M226 214 q 34 -20 68 0 q -8 34 -34 36 q -26 -2 -34 -36 Z" fill="#e8b898" stroke="#8a5a3a" strokeWidth="2.4" />
        <circle cx="260" cy="222" r="9" fill="#f4d0b0" stroke="#8a5a3a" strokeWidth="1.6" />
        <text x="46" y="196" fontSize="12.5" fill="#8a5a3a" fontWeight="700">育儿袋中的幼崽（joey）</text>
        <text x="46" y="216" fontSize="12.5" fill="#8a5a3a">早产似"胚胎"，爬入袋中完成发育</text>
      </g>
      {/* 对比 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="290" width="440" height="74" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="314" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">有袋类 vs 胎盘类：妊娠极短（约 33 天）· 幼崽在袋中哺乳长大</text>
        <text x="260" y="338" textAnchor="middle" fontSize="11.5" fill="#537078">没有真正的胎盘——演化走了"体外完成发育"的另一条路</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#537078">澳大利亚的"孤岛演化"：有袋类占据了胎盘类在各大陆的生态位</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">袋鼠 · 有袋类代表（课外拓展）</text>
    </svg>
  );
}

function ElectricEelSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <path d="M96 180 q 130 -50 250 -22 q 60 14 80 34 q -24 22 -84 26 q -130 10 -246 -38 Z" fill="#3a4a5a" stroke="#1f2a34" strokeWidth="2.8" />
        <path d="M96 180 q 90 -10 230 14" fill="none" stroke="#5a6a7a" strokeWidth="2" opacity="0.7" />
        <path d="M420 192 l 40 20 m -40 -20 l 44 -6" stroke="#1f2a34" strokeWidth="3" strokeLinecap="round" />
        <circle cx="112" cy="158" r="5" fill="#e8e8d8" stroke="#1f2a34" strokeWidth="1.4" />
        <path d="M100 142 q -4 -14 6 -20" fill="none" stroke="#1f2a34" strokeWidth="2.6" strokeLinecap="round" />
        <text x="390" y="130" fontSize="12.5" fill="#1f2a34" fontWeight="700">可长至 2.5 米</text>
        <text x="60" y="120" fontSize="12.5" fill="#1f2a34" fontWeight="700">"电"的器官占体重 80%</text>
      </g>
      {/* 放电 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${210 + i * 40} ${150 + i * 8} q 20 -14 44 -6 q 22 8 44 -2`} fill="none" stroke="#f4d03a" strokeWidth="2.6" strokeLinecap="round" opacity={0.9 - i * 0.2} />
        ))}
        {[0, 1, 2].map((i) => (
          <path key={`z${i}`} d={`M${238 + i * 40} ${156 + i * 8} l 8 -6 l -2 8 l 10 -4`} fill="none" stroke="#e8e85a" strokeWidth="2" strokeLinecap="round" />
        ))}
        <text x="60" y="244" fontSize="12.5" fill="#8a671b" fontWeight="700">放电可达 600~860 伏特</text>
        <text x="60" y="264" fontSize="12" fill="#a5761d">击晕猎物·电场"定位"黑暗中的目标</text>
      </g>
      {/* 机制 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">成千上万个"发电细胞"串联（像电池组）·同时放电瞬间形成高压</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">低电压脉冲用于"雷达"导航与交流·高电压脉冲用于捕食与防御</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">生物电的本质：离子跨膜流动产生的电位差——与神经冲动同源</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">电鳗 · 生物电的"高压线"（课外拓展）</text>
    </svg>
  );
}

function SharkSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <path d="M80 180 q 40 -60 150 -66 q 130 -8 190 30 l 50 -34 q 16 44 -20 78 q 30 30 16 64 l -56 -26 q -70 34 -180 26 q -110 -8 -150 -72 Z" fill="#5a7a8a" stroke="#2a4a5a" strokeWidth="2.8" />
        <path d="M210 116 q 30 -30 60 -22 l -14 26" fill="#4a6a7a" stroke="#2a4a5a" strokeWidth="2.4" />
        <path d="M240 190 q 130 10 230 -12" fill="none" stroke="#e8e4d8" strokeWidth="3" />
        <text x="384" y="248" fontSize="12.5" fill="#2a4a5a" fontWeight="700">歪形尾（上下叶不等）</text>
        <path d="M96 190 q 16 12 40 16" fill="none" stroke="#e8e4d8" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* 头部与齿 */}
      <g style={dim(active, 1)}>
        <path d="M80 180 q 20 -34 60 -40 q 20 22 12 52 q -40 14 -72 -12 Z" fill="#4a6a7a" stroke="#2a4a5a" strokeWidth="2.4" />
        <path d="M84 176 q 24 -14 52 -8" fill="none" stroke="#e8e4d8" strokeWidth="2" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${88 + i * 12} ${176 + (i % 2) * 4} l 3 8 m 4 -6 l 3 8`} stroke="#f0f0e8" strokeWidth="2" strokeLinecap="round" />
        ))}
        <circle cx="112" cy="150" r="4.5" fill="#141414" />
        <text x="52" y="118" fontSize="12.5" fill="#2a4a5a" fontWeight="700">多排三角齿（终生更换）</text>
        <text x="52" y="236" fontSize="12.5" fill="#2a4a5a" fontWeight="700">侧线系统感知猎物"水波"</text>
        <path d="M96 200 q 40 20 90 24" fill="none" stroke="#7ac8d8" strokeWidth="1.6" strokeDasharray="4 3" />
      </g>
      {/* 软骨与电感受 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">鲨鱼是软骨鱼：骨骼全为软骨（与硬骨鱼的硬骨对比）· 无鳔靠游动与肝脏浮力</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#537078">罗伦氏壶腹可感知生物电场——躲进沙里的猎物也无所遁形</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#537078">4 亿年几乎"没变样"的顶级设计——海洋顶级捕食者</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">鲨鱼 · 软骨鱼纲代表（课外拓展）</text>
    </svg>
  );
}

function SlothSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 树枝 */}
      <g style={dim(active, 0)}>
        <path d="M60 130 q 150 -40 400 -30" fill="none" stroke="#8a6a3a" strokeWidth="14" strokeLinecap="round" />
        <text x="396" y="86" fontSize="12.5" fill="#8a6a3a" fontWeight="700">倒挂在树冠层缓慢移动</text>
      </g>
      {/* 树懒 */}
      <g style={dim(active, 1)}>
        <path d="M200 148 q 60 -18 130 -6 q 24 6 20 24 q -6 22 -48 26 q -70 6 -104 -12 q -14 -18 2 -32 Z" fill="#a58a5a" stroke="#6a5a2a" strokeWidth="2.8" />
        <circle cx="356" cy="164" r="22" fill="#b89a68" stroke="#6a5a2a" strokeWidth="2.4" />
        <path d="M344 150 q 10 -6 22 -2 m -22 2 q -8 -10 -4 -18" fill="none" stroke="#6a5a2a" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M344 156 q 8 2 10 8 m 6 -10 q 6 4 6 10" stroke="#141414" strokeWidth="3" strokeLinecap="round" />
        <path d="M300 188 q -10 26 -30 34 m 40 -28 q 2 28 -14 40 m 30 -32 q 8 24 -4 38" fill="none" stroke="#a58a5a" strokeWidth="8" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${264 - i * 18} ${224 + i * 4} l -12 8 m 12 -8 l -4 -12`} stroke="#6a5a2a" strokeWidth="3.4" strokeLinecap="round" />
        ))}
        <text x="60" y="240" fontSize="12.5" fill="#6a5a2a" fontWeight="700">长钩状爪（倒挂"锁死"不费力）</text>
        <text x="60" y="260" fontSize="12.5" fill="#6a5a2a">每分钟移动约 4 米——"慢"省能量</text>
      </g>
      {/* 绿藻共生 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="290" width="440" height="74" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="314" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">毛发的"绿藻外衣"：与藻类共生——绿色伪装融进树冠，还可能"加餐"藻类</text>
        <text x="260" y="338" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">一周只下树一次（排便）——树懒蛾在毛中繁殖的"移动生态系统"</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">低体温·低代谢·低食量——极端节能的生存策略</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">树懒 · 披叶藻的"慢生活家"（课外拓展）</text>
    </svg>
  );
}

function HoneyBadgerSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <path d="M150 220 q -8 -54 70 -62 q 100 -10 190 10 q 46 10 44 40 q -4 34 -60 40 q -120 12 -190 -4 q -50 -10 -54 -24 Z" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="2.8" />
        <path d="M150 176 q 80 -26 220 -12 q 40 4 54 18 l -6 16 q -120 -20 -220 -6 q -40 6 -50 -4 Z" fill="#e8e4d8" stroke="#a5a090" strokeWidth="2.2" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${170 + i * 60} 244 q 6 10 2 18 m 16 -14 q 6 10 2 18`} fill="none" stroke="#1a1a1a" strokeWidth="3.4" strokeLinecap="round" />
        ))}
        <text x="392" y="240" fontSize="12.5" fill="#1a1a1a" fontWeight="700">背部银灰·腹面黑色</text>
      </g>
      {/* 头部 */}
      <g style={dim(active, 1)}>
        <ellipse cx="132" cy="170" rx="36" ry="26" fill="#3a3a3a" stroke="#1a1a1a" strokeWidth="2.6" />
        <path d="M104 178 q -14 8 -18 18 l 24 6 q 8 -10 8 -20" fill="#e8e4d8" stroke="#a5a090" strokeWidth="2" />
        <circle cx="112" cy="162" r="4" fill="#141414" />
        <path d="M118 146 q 4 -14 14 -18" fill="none" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" />
        <text x="56" y="120" fontSize="12.5" fill="#1a1a1a" fontWeight="700">"平头哥"：头顶扁平·利爪利齿</text>
        <text x="56" y="140" fontSize="12.5" fill="#1a1a1a">敢与狮子对视·追击毒蛇为食</text>
      </g>
      {/* 技能 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"技能包"：厚皮可反咬 · 抗蛇毒 · 会用工具（叠石够高处）</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">食谱：昆虫·啮齿类·蛇·蜂蜜（引渡 honey guide 蜜鴷合作"指路"）</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">所谓"无所畏惧"：体型小、防御强、代谢猛——进攻是最好的防御</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蜜獾 · 鼬科"平头哥"（课外拓展）</text>
    </svg>
  );
}

function PangolinSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体鳞片 */}
      <g style={dim(active, 0)}>
        <path d="M120 220 q -6 -70 70 -88 q 100 -22 190 6 q 60 18 60 62 q 0 44 -70 58 q -120 22 -190 -6 q -56 -22 -60 -32 Z" fill="#c9a06a" stroke="#8a6a3a" strokeWidth="3" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path key={i} d={`M${150 + i * 32} ${168 + (i % 2) * 10} l 22 -6 m -22 20 l 22 -4`} stroke="#8a6a3a" strokeWidth="2.6" strokeLinecap="round" />
        ))}
        <path d="M120 226 q -20 30 -44 40 m 44 -40 q -6 34 -20 48" fill="none" stroke="#8a6a3a" strokeWidth="4" strokeLinecap="round" />
        <text x="46" y="60" fontSize="12.5" fill="#8a6a3a" fontWeight="700">角质鳞片（哺乳动物的"铠甲"）</text>
        <text x="386" y="170" fontSize="12" fill="#a5763a">遇险卷成球·鳞片边缘锋利</text>
      </g>
      {/* 头与长舌 */}
      <g style={dim(active, 1)}>
        <path d="M124 176 q -26 -14 -38 -34 l 18 -10 q 12 16 32 24" fill="#c9a06a" stroke="#8a6a3a" strokeWidth="2.4" />
        <circle cx="100" cy="140" r="4" fill="#2a2a1a" />
        <path d="M112 132 q -18 -30 -44 -38" fill="none" stroke="#8a6a3a" strokeWidth="3.4" strokeLinecap="round" />
        <text x="46" y="82" fontSize="12.5" fill="#8a6a3a" fontWeight="700">无牙·长舌可达 40 cm</text>
        <text x="46" y="102" fontSize="12.5" fill="#8a6a3a">黏稠唾液粘食白蚁蚂蚁</text>
      </g>
      {/* 保护 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="76" rx="12" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="800">全球走私量最大的哺乳动物之一——鳞片"入药"并无科学依据（成分≈指甲角蛋白）</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5533c">已升级为国家一级保护动物 · 2020 年起鳞片从药典除名</text>
        <text x="260" y="354" textAnchor="middle" fontSize="11.5" fill="#a5533c">一只穿山甲一年吃掉约 700 万只白蚁蚂蚁——森林"卫士"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">穿山甲 · 鳞甲目（课外拓展·保护动物）</text>
    </svg>
  );
}

function CicadaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 蝉成虫 */}
      <g style={dim(active, 0)}>
        <ellipse cx="260" cy="150" rx="70" ry="42" fill="#3a3a2a" stroke="#1f1f14" strokeWidth="2.8" />
        <path d="M232 118 q 28 -30 56 0 q -28 -12 -56 0 Z" fill="#4a4a34" stroke="#1f1f14" strokeWidth="2" />
        <path d="M232 150 q -50 -40 -90 -36 q 20 46 80 58 m 66 -58 q 50 -40 90 -36 q -20 46 -80 58" fill="none" stroke="#c9d4d4" strokeWidth="2.4" opacity="0.75" />
        <circle cx="228" cy="120" r="6" fill="#c9d4d4" stroke="#1f1f14" strokeWidth="1.6" />
        <circle cx="292" cy="120" r="6" fill="#c9d4d4" stroke="#1f1f14" strokeWidth="1.6" />
        <text x="380" y="130" fontSize="12.5" fill="#3a3a2a" fontWeight="700">半透明大翅膀</text>
        <text x="380" y="150" fontSize="12.5" fill="#3a3a2a">雄蝉腹部有发音器</text>
        <path d="M240 190 q 20 14 40 0" fill="none" stroke="#1f1f14" strokeWidth="2.6" />
      </g>
      {/* 地下若虫 */}
      <g style={dim(active, 1)}>
        <path d="M170 296 q 60 -20 180 -6" fill="none" stroke="#8a7a4a" strokeWidth="20" strokeLinecap="round" />
        <ellipse cx="260" cy="288" rx="30" ry="14" fill="#c9a05a" stroke="#8a6a2a" strokeWidth="2.2" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${250 + i * 8} 278 l -2 -8`} stroke="#8a6a2a" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        <text x="80" y="252" fontSize="12.5" fill="#8a6a2a" fontWeight="700">若虫在地下蛰伏 3~17 年</text>
        <text x="80" y="272" fontSize="12.5" fill="#8a6a2a">吸食树根汁液（不完全变态）</text>
      </g>
      {/* 周期策略 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="318" width="440" height="48" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="338" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">十七年蝉的"质数周期"：同步羽化数以亿计·捕食者根本"吃不完"</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11" fill="#a5761d">周期为质数（13/17 年）避免与天敌周期重合——生存策略的数学之美</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蝉 · 昆虫纲半翅目（课外拓展）</text>
    </svg>
  );
}

function HummingbirdSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 花 */}
      <g style={dim(active, 0)}>
        <path d="M150 320 q -6 -70 30 -120" fill="none" stroke="#3f7f3a" strokeWidth="6" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((i) => {
          const ang = -Math.PI / 2 + (i - 2) * 0.5;
          return <ellipse key={i} cx={180 + Math.cos(ang) * 20} cy={200 + Math.sin(ang) * 20} rx="14" ry="7" fill="#f0a0c0" stroke="#c96a8a" strokeWidth="1.8" transform={`rotate(${i * 40 - 80} 180 200)`} />;
        })}
        <circle cx="180" cy="198" r="8" fill="#e8c83a" stroke="#a58a2a" strokeWidth="1.8" />
        <text x="92" y="268" fontSize="12.5" fill="#2f6f2a" fontWeight="700">管状花：每 10~15 分钟"访问"一次</text>
      </g>
      {/* 蜂鸟悬停 */}
      <g style={dim(active, 1)}>
        <ellipse cx="268" cy="170" rx="44" ry="22" fill="#2a9a5a" stroke="#1a6a3a" strokeWidth="2.8" transform="rotate(-18 268 170)" />
        <circle cx="312" cy="146" r="13" fill="#2a9a5a" stroke="#1a6a3a" strokeWidth="2.2" />
        <path d="M324 142 l 24 8 l -24 8 q 4 -8 0 -16 Z" fill="#1a1a1a" />
        <circle cx="316" cy="142" r="3.4" fill="#141414" />
        <path d="M252 158 q -20 -28 -52 -30 q 14 26 40 34" fill="#58c8e8" stroke="#2a9a5a" strokeWidth="2" opacity="0.85" />
        <path d="M256 176 q -24 16 -50 12 q 20 18 46 6" fill="#58c8e8" stroke="#2a9a5a" strokeWidth="2" opacity="0.85" />
        <path d="M226 178 q -26 20 -56 56" fill="none" stroke="#1a6a3a" strokeWidth="2.6" strokeLinecap="round" />
        <text x="330" y="230" fontSize="12.5" fill="#1a6a3a" fontWeight="700">翅膀"8 字"划动·可悬停倒飞</text>
        <text x="330" y="250" fontSize="12" fill="#1a6a3a">每秒扇翅 50~80 次（蜂鸣声来源）</text>
      </g>
      {/* 特性 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="76" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">最小的鸟（蜂鸟仅 2~20 g）· 心跳可达每分钟 1000 次</text>
        <text x="260" y="334" textAnchor="middle" fontSize="11.5" fill="#537078">超高代谢靠花蜜（糖类）支撑——夜间"蛰伏"降代谢省能量</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#537078">与管状花互利共生：鸟得蜜·花借传粉（喙形与花形相互"定制"）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蜂鸟 · 悬停的"直升机"（课外拓展）</text>
    </svg>
  );
}

function AnglerfishSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 深海背景 */}
      <g style={dim(active, 0)}>
        <rect x="36" y="46" width="448" height="220" rx="14" fill="#0e1620" stroke="#0a1018" strokeWidth="2.4" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={80 + i * 130} cy={80 + (i % 2) * 30} r="1.6" fill="#4a5a6a" />
        ))}
        <text x="260" y="246" textAnchor="middle" fontSize="11" fill="#4a5a6a">深海 200~2000 m：没有阳光·食物稀少·一片漆黑</text>
      </g>
      {/* 鮟鱇鱼 */}
      <g style={dim(active, 1)}>
        <path d="M170 160 q 30 -50 110 -46 q 90 4 110 50 q 12 40 -30 62 q -70 30 -140 6 q -60 -22 -50 -72 Z" fill="#3a2a3a" stroke="#1f1220" strokeWidth="2.8" />
        <path d="M160 138 q -30 -20 -60 -18 m 60 40 q -34 -6 -66 4" fill="none" stroke="#1f1220" strokeWidth="4" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M330 ${130 + i * 34} l 40 ${-6 + i * 8}`} stroke="#1f1220" strokeWidth="3.4" strokeLinecap="round" />
        ))}
        <path d="M200 128 q 40 -26 80 -6" fill="none" stroke="#2a1a2a" strokeWidth="3" />
        <path d="M238 104 q 4 -20 24 -28" fill="none" stroke="#5a4a6a" strokeWidth="3.4" />
        <circle cx="266" cy="70" r="10" fill="#c9e8f0" stroke="#7ac8d8" strokeWidth="2" />
        <text x="352" y="96" fontSize="12.5" fill="#7ac8d8" fontWeight="700">发光器"小灯笼"</text>
        <text x="352" y="116" fontSize="12.5" fill="#7ac8d8">（共生的发光细菌）</text>
        {[0, 1].map((i) => (
          <circle key={i} cx={216 + i * 26} cy={168} r="7" fill="#f4d06a" stroke="#8a671b" strokeWidth="1.8" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${190 + i * 22} 210 l 8 14 m 8 -12 l 6 12`} stroke="#e8e4d0" strokeWidth="2.4" strokeLinecap="round" />
        ))}
      </g>
      {/* 机制 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">"提灯诱鱼"：灯光引好奇的猎物靠近 → 张口吞食（0.01 秒）</text>
        <text x="260" y="334" textAnchor="middle" fontSize="11.5" fill="#537078">发光来自共生细菌——深海中"借光捕猎"的互利共生</text>
        <text x="260" y="354" textAnchor="middle" fontSize="11.5" fill="#537078">极端适应：口大胃可撑·雄鱼远小于雌鱼（性寄生）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">深海鮟鱇 · 极端环境的适应（课外拓展）</text>
    </svg>
  );
}

function LeechSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <path d="M80 200 q 40 -44 110 -40 q 100 6 170 -20 q 50 -18 80 6 q -18 30 -70 44 q -110 30 -200 22 q -70 -4 -90 -12 Z" fill="#3a5a3a" stroke="#1f3a1f" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <path key={i} d={`M${110 + i * 26} ${168 + (i % 2) * 8} q 8 22 2 44`} fill="none" stroke="#5a7a4a" strokeWidth="1.8" opacity="0.8" />
        ))}
        <text x="46" y="60" fontSize="12.5" fill="#2a4a2a" fontWeight="700">体表有环沟（环节动物·蛭纲）</text>
        <text x="46" y="88" fontSize="12.5" fill="#2a4a2a" fontWeight="700">前后各一个吸盘</text>
      </g>
      {/* 吸盘与吸血 */}
      <g style={dim(active, 1)}>
        <circle cx="76" cy="176" r="18" fill="#2a4a2a" stroke="#1a3a1a" strokeWidth="2.4" />
        <path d="M66 170 q 10 -8 20 0 q -10 10 -20 0" fill="#d8e8d0" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${60 + i * 5} 182 l -2 6`} stroke="#e8a0a0" strokeWidth="1.8" strokeLinecap="round" />
        ))}
        <text x="46" y="120" fontSize="12.5" fill="#2a4a2a" fontWeight="700">前吸盘内的颚片划开皮肤</text>
        <text x="46" y="140" fontSize="12.5" fill="#2a4a2a">分泌水蛭素——吸血不凝固</text>
      </g>
      {/* 水蛭素医学应用 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="296" width="440" height="66" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">水蛭素：最强天然抗凝血剂之一——用于显微外科·抗血栓药物研发</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">医学水蛭疗法重新受重视（术后消除淤血）——"害虫"变"药库"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">水蛭 · 环节动物门蛭纲（课外拓展）</text>
    </svg>
  );
}

function ChameleonSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <path d="M170 210 q -6 -50 50 -66 q 80 -22 150 -8 q 44 10 46 40 q 2 30 -40 44 q -90 26 -150 16 q -50 -8 -56 -26 Z" fill="#7ab86a" stroke="#2f6f2a" strokeWidth="2.8" />
        <path d="M214 148 q 60 -16 130 -4" fill="none" stroke="#4a8a3a" strokeWidth="2" opacity="0.7" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${220 + i * 34} 142 q 4 -12 2 -20`} fill="none" stroke="#2f6f2a" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        <path d="M172 216 q -18 30 -44 42" fill="none" stroke="#2f6f2a" strokeWidth="10" strokeLinecap="round" />
        <text x="370" y="150" fontSize="12.5" fill="#2f6f2a" fontWeight="700">卷尾抓握（第五只"手"）</text>
      </g>
      {/* 头与双眼 */}
      <g style={dim(active, 1)}>
        <ellipse cx="156" cy="150" rx="34" ry="28" fill="#8ac87a" stroke="#2f6f2a" strokeWidth="2.6" />
        <path d="M180 132 q 22 -14 30 -4 q 2 10 -12 16" fill="#8ac87a" stroke="#2f6f2a" strokeWidth="2" />
        <circle cx="142" cy="140" r="13" fill="#d8e8c8" stroke="#2f6f2a" strokeWidth="2.2" />
        <circle cx="142" cy="140" r="5" fill="#1a2a1a" />
        <text x="52" y="98" fontSize="12.5" fill="#2f6f2a" fontWeight="700">两只眼独立转动</text>
        <text x="52" y="118" fontSize="12.5" fill="#2f6f2a">360° 视野·双眼同时锁定猎物</text>
      </g>
      {/* 舌头 */}
      <g style={dim(active, 2)}>
        <path d="M136 168 q -40 18 -92 12" fill="none" stroke="#d86a8a" strokeWidth="6" strokeLinecap="round" />
        <circle cx="40" cy="178" r="7" fill="#8a3a5a" stroke="#5a1a3a" strokeWidth="1.6" />
        <text x="46" y="230" fontSize="12.5" fill="#8a3a5a" fontWeight="700">弹射舌头：0.07 秒击中猎物</text>
        <text x="46" y="250" fontSize="12.5" fill="#8a3a5a">舌长可达体长的 2 倍·吸盘式舌端</text>
      </g>
      {/* 变色机制 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="288" width="440" height="78" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">变色真相：主要不是为了伪装——而是调节体温与表达"情绪"</text>
        <text x="260" y="334" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">皮肤双层色素细胞（含鸟嘌呤纳米晶体）：改变晶体间距 = 改变反射的波长</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">兴奋时更"鲜艳"·安静时偏"暗绿"——色彩即语言</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">变色龙 · 爬行纲避役（课外拓展）</text>
    </svg>
  );
}

function CuckooSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 巢与宿主 */}
      <g style={dim(active, 0)}>
        <path d="M150 200 q 20 -40 60 -44 q 44 -4 60 34 q 12 34 -18 50 q -46 22 -82 0 q -24 -16 -20 -40 Z" fill="#c9b88a" stroke="#8a7a4a" strokeWidth="2.6" />
        {[0, 1].map((i) => (
          <ellipse key={i} cx={196 + i * 34} cy={206} rx="13" ry="16" fill="#8ac8e8" stroke="#4a8ab5" strokeWidth="1.8" />
        ))}
        <ellipse cx="230" cy="204" rx="14" ry="18" fill="#d8e8e8" stroke="#7a4a3a" strokeWidth="2.2" />
        <text x="230" y="290" textAnchor="middle" fontSize="12.5" fill="#8a7a4a" fontWeight="700">苇莺巢：自己的蛋 + 杜鹃蛋（略大·花纹相似）</text>
      </g>
      {/* 杜鹃成鸟 */}
      <g style={dim(active, 1)}>
        <ellipse cx="420" cy="90" rx="46" ry="26" fill="#8a8a9a" stroke="#4a4a5a" strokeWidth="2.6" />
        <circle cx="462" cy="76" r="12" fill="#8a8a9a" stroke="#4a4a5a" strokeWidth="2.2" />
        <path d="M474 74 l 16 5 l -16 6 Z" fill="#3a3a4a" />
        <path d="M378 82 q -30 -4 -44 12" fill="none" stroke="#4a4a5a" strokeWidth="5" strokeLinecap="round" />
        <text x="352" y="44" fontSize="12.5" fill="#4a4a5a" fontWeight="700">杜鹃成鸟：趁宿主外出</text>
        <text x="352" y="64" fontSize="12.5" fill="#4a4a5a">衔走一枚蛋·产下自己的蛋</text>
      </g>
      {/* 杜鹃雏鸟排挤 */}
      <g style={dim(active, 2)}>
        <circle cx="230" cy="176" r="16" fill="#e8a03a" stroke="#8a5a1d" strokeWidth="2.2" />
        <path d="M244 168 q 12 -2 16 4 m -16 -2 q 10 6 12 12 m -14 -10 q 6 8 4 14" stroke="#8a5a1d" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M196 190 l 20 -14" stroke="#c9a05a" strokeWidth="3" />
        <text x="60" y="152" fontSize="12.5" fill="#8a5a1d" fontWeight="700">杜鹃雏鸟先孵出：</text>
        <text x="60" y="172" fontSize="12.5" fill="#8a5a1d">用背部把巢里其他蛋/雏鸟拱出巢</text>
        <text x="60" y="192" fontSize="12.5" fill="#8a5a1d">独占宿主亲鸟的全部投喂</text>
      </g>
      {/* 共演化 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="316" width="440" height="50" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="336" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"军备竞赛"：宿主学会识别蛋 → 杜鹃蛋模拟得更像 → 相互选择的共同演化</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">巢寄生 = 种间关系中的特殊一类——一方获益（杜鹃）·一方受害（宿主）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">杜鹃 · 巢寄生的行为生态（课外拓展）</text>
    </svg>
  );
}

function HermitCrabSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 螺壳 */}
      <g style={dim(active, 0)}>
        <path d="M330 220 q -30 -110 60 -130 q 80 -18 96 52 q 12 58 -40 92 q -50 32 -116 -14 Z" fill="#d8a860" stroke="#8a6a2a" strokeWidth="3" />
        <path d="M352 214 q -16 -82 48 -98 q 56 -12 68 40 q 8 44 -34 70 q -42 24 -82 -12 Z" fill="#e8c880" stroke="#8a6a2a" strokeWidth="1.8" />
        <path d="M420 104 q 18 4 20 22" fill="none" stroke="#8a6a2a" strokeWidth="4" strokeLinecap="round" />
        <text x="46" y="66" fontSize="12.5" fill="#8a6a2a" fontWeight="700">螺壳（别人用过的"二手房"）</text>
      </g>
      {/* 寄居蟹身体 */}
      <g style={dim(active, 1)}>
        <path d="M240 214 q -20 -24 6 -40 q 18 -10 34 4 q 12 12 4 30 q -12 22 -44 6 Z" fill="#c96a4a" stroke="#8a3a2a" strokeWidth="2.4" />
        {[0, 1].map((i) => (
          <path key={i} d={`M${244 + i * 10} 172 q 2 -12 12 -14`} fill="none" stroke="#8a3a2a" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        <path d="M242 218 q -16 22 -40 24 q -18 0 -20 -14 q 22 0 38 -18" fill="#c96a4a" stroke="#8a3a2a" strokeWidth="2.2" />
        <path d="M238 226 q -30 -6 -52 8 m 54 -4 q -16 18 -40 22" fill="none" stroke="#8a3a2a" strokeWidth="4" strokeLinecap="round" />
        <path d="M300 210 q 24 -8 44 -4 m -44 14 q 20 2 40 10" fill="none" stroke="#8a3a2a" strokeWidth="3.4" strokeLinecap="round" />
        <text x="60" y="150" fontSize="12.5" fill="#8a3a2a" fontWeight="700">柔软的螺旋腹部</text>
        <text x="60" y="170" fontSize="12.5" fill="#8a3a2a">正好卡进螺壳的螺旋腔</text>
        <text x="60" y="196" fontSize="12.5" fill="#8a3a2a" fontWeight="700">尾肢钩住壳轴·紧"锁门"</text>
      </g>
      {/* 海葵共生 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={318 + i * 26} cy={196 - i * 6} rx="14" ry="9" fill="#b87ac9" stroke="#7a4a8a" strokeWidth="1.8" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${314 + i * 14} 182 q 2 -10 8 -12`} fill="none" stroke="#c99ad8" strokeWidth="2" strokeLinecap="round" />
        ))}
        <text x="96" y="246" fontSize="12.5" fill="#7a4a8a" fontWeight="700">壳上共生的海葵：</text>
        <text x="96" y="266" fontSize="12.5" fill="#7a4a8a">刺细胞帮"房东"御敌，海葵搭车觅食</text>
      </g>
      {/* 特征 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="306" width="440" height="56" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="330" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">换壳仪式：排队按体型"以大换小"——空壳市场的"链条交换"</text>
        <text x="260" y="350" textAnchor="middle" fontSize="11.5" fill="#537078">种间关系三连：占据螺壳（种间竞争）· 与海葵互利共生 · 躲避捕食者</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">寄居蟹 · 背着房子的甲壳类（课外拓展）</text>
    </svg>
  );
}

function MantisShrimpSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <path d="M170 200 q 10 -60 90 -70 q 120 -14 200 6 q 20 6 18 24 q -30 40 -140 50 q -110 8 -168 -10 Z" fill="#4a9a6a" stroke="#1f5f3a" strokeWidth="2.8" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${210 + i * 44} ${146 - 0} h 44`} stroke="#1f5f3a" strokeWidth="2" />
        ))}
        <path d="M470 130 q 24 4 22 22 q -20 22 -60 28" fill="none" stroke="#1f5f3a" strokeWidth="3" />
        <text x="392" y="102" fontSize="12.5" fill="#1f5f3a" fontWeight="700">体色艳丽（警告色）</text>
      </g>
      {/* 攻击足 */}
      <g style={dim(active, 1)}>
        <path d="M170 196 q -40 -8 -62 -30 q -12 -14 2 -22 q 16 -8 26 4 q 14 20 40 28" fill="#e88a2a" stroke="#8a4a0a" strokeWidth="2.6" />
        <circle cx="106" cy="146" r="12" fill="#f4b83a" stroke="#8a4a0a" strokeWidth="2.2" />
        <text x="42" y="106" fontSize="12.5" fill="#8a4a0a" fontWeight="700">第二对附肢 = "子弹拳"</text>
        <text x="42" y="126" fontSize="12.5" fill="#8a4a0a">0.02 秒出拳·速度堪比手枪子弹</text>
        <path d="M96 118 L 106 134" stroke="#8a4a0a" strokeWidth="1.4" strokeDasharray="3 3" />
      </g>
      {/* 复眼 */}
      <g style={dim(active, 2)}>
        <path d="M236 130 q -6 -26 -26 -34" fill="none" stroke="#1f5f3a" strokeWidth="4" strokeLinecap="round" />
        <path d="M256 126 q -2 -28 12 -40" fill="none" stroke="#1f5f3a" strokeWidth="4" strokeLinecap="round" />
        <circle cx="204" cy="92" r="14" fill="#c9e0d0" stroke="#1f5f3a" strokeWidth="2.2" />
        <circle cx="274" cy="82" r="14" fill="#c9e0d0" stroke="#1f5f3a" strokeWidth="2.2" />
        <text x="288" y="60" fontSize="12.5" fill="#1f5f3a" fontWeight="700">复眼含 12~16 种视锥类型</text>
        <text x="288" y="80" fontSize="12.5" fill="#1f5f3a">（人类 3 种）· 还能看偏振光</text>
      </g>
      {/* 冲击波 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="296" width="440" height="70" rx="12" fill="#f4e4dc" stroke="#a54838" strokeWidth="2.4" />
        <text x="260" y="322" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="800">出拳瞬间水被"汽化"产生冲击波与空穴效应——一击 1500 N，可击碎贝类外壳</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#a5533c">即使打空，冲击波也足以震晕猎物——"打拳带闪光"的生物力学奇迹</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">雀尾螳螂虾 · 甲壳动物"拳王"（课外拓展）</text>
    </svg>
  );
}

function DungBeetleSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 粪球 */}
      <g style={dim(active, 0)}>
        <circle cx="150" cy="250" r="52" fill="#8a6a3a" stroke="#5a4a2a" strokeWidth="2.8" />
        <path d="M116 236 q 22 -12 48 -4 m -56 24 q 26 -10 52 0" fill="none" stroke="#6a5230" strokeWidth="2" opacity="0.8" />
        <text x="150" y="322" textAnchor="middle" fontSize="12.5" fill="#5a4a2a" fontWeight="700">滚成球的粪便（产卵床+幼虫口粮）</text>
        <path d="M60 300 h 400" stroke="#8a9a6a" strokeWidth="2.4" />
        <text x="444" y="292" fontSize="11.5" fill="#5a7a3a">地面</text>
      </g>
      {/* 蜣螂倒推粪球 */}
      <g style={dim(active, 1)}>
        <ellipse cx="212" cy="196" rx="30" ry="22" fill="#2a3a2a" stroke="#1a2a1a" strokeWidth="2.6" />
        <path d="M240 190 q 30 -10 46 6 q -14 16 -46 12 Z" fill="#2a3a2a" stroke="#1a2a1a" strokeWidth="2.2" />
        <circle cx="204" cy="188" r="4" fill="#e8e4d0" />
        <path d="M198 216 q -12 14 -32 20 m 40 -18 q -6 18 -24 26 m 44 -20 q 0 16 -14 26" fill="none" stroke="#1a2a1a" strokeWidth="3" strokeLinecap="round" />
        <path d="M252 182 q 22 -14 30 -34 m -24 40 q 24 -2 40 -14" fill="none" stroke="#1a2a1a" strokeWidth="2.6" strokeLinecap="round" />
        <text x="330" y="170" fontSize="12.5" fill="#1a2a1a" fontWeight="700">头朝下倒推粪球</text>
        <text x="330" y="190" fontSize="12.5" fill="#1a2a1a">前足搭球·中后足撑地</text>
      </g>
      {/* 导航与生态 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="60" width="440" height="52" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="82" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">夜行导航靠银河：滚"直线"避免绕回粪堆——昆虫中已证实的星空导航</text>
        <text x="260" y="102" textAnchor="middle" fontSize="11.5" fill="#537078">一对粪球 = 一只幼体的全部口粮·成虫也取食粪汁</text>
      </g>
      {/* 生态价值 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="336" width="440" height="34" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="260" y="358" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">"清道夫"价值：埋粪肥田·传播种子·杀灭肠道寄生虫卵——澳大利亚曾进口蜣螂解决牛粪危机</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蜣螂 · 分解者明星（课外拓展）</text>
    </svg>
  );
}

function TermiteSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 白蚁个体 */}
      <g style={dim(active, 0)}>
        <ellipse cx="200" cy="170" rx="24" ry="20" fill="#e8d8b8" stroke="#8a7a4a" strokeWidth="2.4" />
        <path d="M224 162 q 44 -14 96 -8 q 30 4 30 22 q 0 22 -36 24 q -60 4 -90 -12" fill="#e8d8b8" stroke="#8a7a4a" strokeWidth="2.4" />
        <path d="M350 176 q 26 -4 36 -18 q 4 12 -6 20 q 10 2 18 -6 q 0 14 -20 18" fill="none" stroke="#c9b88a" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${240 + i * 40} 200 l -8 16 m 8 -16 l 10 16`} stroke="#b5a582" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        <path d="M188 152 q -8 -16 -2 -26 m 8 26 q 6 -16 14 -22" fill="none" stroke="#8a7a4a" strokeWidth="2" />
        <text x="390" y="150" fontSize="12.5" fill="#8a7a4a" fontWeight="700">工蚁（白色柔软·无翅）</text>
        <text x="390" y="196" fontSize="12.5" fill="#8a7a4a" fontWeight="700">渐变态发育（无蛹期）</text>
      </g>
      {/* 肠内共生鞭毛虫 */}
      <g style={dim(active, 1)}>
        <ellipse cx="300" cy="176" rx="34" ry="18" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${288 + i * 12} 168 q 6 -10 16 -8`} fill="none" stroke="#b0483a" strokeWidth="1.8" />
        ))}
        <text x="60" y="140" fontSize="12.5" fill="#8a671b" fontWeight="700">肠内的共生鞭毛虫</text>
        <text x="60" y="160" fontSize="12.5" fill="#8a671b">分泌纤维素酶——白蚁才能消化木头</text>
        <line x1="120" y1="152" x2="268" y2="170" stroke="#8a671b" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="60" y="250" fontSize="12.5" fill="#a5761d" fontWeight="700">互利共生：虫供住所 · 鞭毛虫"代消化"</text>
        <text x="60" y="270" fontSize="12.5" fill="#a5761d">脱皮后需重新感染——否则吃木头会饿死</text>
      </g>
      {/* 等级社会 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="296" width="440" height="70" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">与蜜蜂不同的社会性昆虫：蚁后·蚁王·工蚁·兵蚁，渐变态发育</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#537078">白蚁不是"白色的蚂蚁"——蚂蚁是膜翅目（蜜蜂近亲），白蚁属蜚蠊目（蟑螂近亲）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">白蚁 · 社会性与共生消化（课外拓展）</text>
    </svg>
  );
}

function CentipedeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 分节身体 */}
      <g style={dim(active, 0)}>
        <path d="M70 170 q 30 -30 80 -22 q 190 24 300 -6" fill="none" stroke="#a5533c" strokeWidth="26" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <path key={i} d={`M${116 + i * 36} ${148 - Math.min(i * 2, 12)} h 2`} stroke="#7a3a2a" strokeWidth="3" strokeLinecap="round" />
        ))}
        <text x="46" y="112" fontSize="12.5" fill="#7a3a2a" fontWeight="700">体分 20+ 节（每节一对足）</text>
        <text x="46" y="132" fontSize="12.5" fill="#7a3a2a">背板交替覆盖·灵活拱曲</text>
      </g>
      {/* 步足 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <g key={i}>
            <path d={`M${108 + i * 36} ${158 - Math.min(i * 2, 12)} l -12 -18 m 12 18 l -6 22`} stroke="#8a4a2a" strokeWidth="3.4" strokeLinecap="round" />
          </g>
        ))}
        <text x="330" y="112" fontSize="12.5" fill="#8a4a2a" fontWeight="700">每节 2 只足（多足纲特征）</text>
        <text x="330" y="132" fontSize="12.5" fill="#8a4a2a">足的波浪式推进·爬行如流水</text>
      </g>
      {/* 头部毒颚 */}
      <g style={dim(active, 2)}>
        <ellipse cx="62" cy="172" rx="26" ry="20" fill="#8a3a2a" stroke="#5a2a1a" strokeWidth="2.4" />
        <circle cx="52" cy="164" r="4" fill="#1a0a0a" />
        <circle cx="68" cy="160" r="4" fill="#1a0a0a" />
        {[0, 1].map((i) => (
          <path key={i} d={`M${42 + i * 34} 186 q ${-8 + i * 4} 22 6 34`} fill="none" stroke="#5a2a1a" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="70" y="240" fontSize="12.5" fill="#5a2a1a" fontWeight="700">第一对足特化为毒颚</text>
        <text x="70" y="260" fontSize="12.5" fill="#5a2a1a">捕食昆虫·注入毒素（捕食利器）</text>
      </g>
      {/* 特征 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="296" width="440" height="70" rx="12" fill="#f4e4dc" stroke="#a54838" strokeWidth="2.4" />
        <text x="260" y="322" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="800">节肢动物门第三大纲：多足纲——蛛形纲（4 对足）· 昆虫纲（3 对足）之外</text>
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#a5533c">全部陆生 · 喜潮湿阴暗 · 夜行 · 气管呼吸（陆生节肢动物的标配）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蜈蚣 · 节肢动物门多足纲（课外拓展）</text>
    </svg>
  );
}

function SeahorseSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 雄海马 */}
      <g style={dim(active, 0)}>
        <path d="M280 96 q 44 -18 66 14 q 16 26 8 62 q -10 44 -30 88 q -16 34 -34 56 q -14 16 -26 2 q -14 -16 2 -40 q 18 -28 24 -66 q -34 -10 -34 -48 q 0 -50 24 -68 Z" fill="#e0b860" stroke="#8a6a2a" strokeWidth="2.8" />
        <path d="M276 90 q 20 -22 40 -8 q 14 10 6 26 q -12 14 -30 8" fill="#e8cc80" stroke="#8a6a2a" strokeWidth="2.2" />
        <path d="M300 66 q 10 -18 26 -18 m -26 18 q 16 -4 26 -4" fill="none" stroke="#8a6a2a" strokeWidth="2.4" />
        <circle cx="296" cy="102" r="5" fill="#3a2a0a" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M286 ${230 + i * 26} q 16 -2 24 8`} fill="none" stroke="#c9a050" strokeWidth="2" />
        ))}
        <text x="368" y="120" fontSize="12.5" fill="#8a6a2a" fontWeight="700">管状长吻（吸食浮游生物）</text>
        <text x="368" y="216" fontSize="12.5" fill="#8a6a2a" fontWeight="700">尾部卷握海草固定身体</text>
      </g>
      {/* 育儿袋 */}
      <g style={dim(active, 1)}>
        <path d="M250 180 q -30 10 -28 46 q 2 34 30 40 q 26 6 32 -26 q 4 -30 -12 -52 q -10 -12 -22 -8 Z" fill="#d8a84a" stroke="#8a6a2a" strokeWidth="2.6" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={244 + (i % 3) * 12} cy={206 + Math.floor(i / 3) * 16} r="4" fill="#f4e0a0" stroke="#a58a2a" strokeWidth="1.2" />
        ))}
        <text x="60" y="188" fontSize="12.5" fill="#8a6a2a" fontWeight="700">雄性育儿袋</text>
        <text x="60" y="208" fontSize="12.5" fill="#8a6a2a">雌鱼把卵产入袋中</text>
        <text x="60" y="228" fontSize="12.5" fill="#8a6a2a">雄海马"怀孕"约 2~4 周</text>
        <line x1="150" y1="206" x2="224" y2="216" stroke="#8a6a2a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 意义 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="296" width="440" height="66" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">雄性育幼的极端形式：幼体在袋内获氧与营养，出生率大大提高</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">硬骨鱼纲海龙科 · 尾部卷握与拟态体色是"定栖"生活的适应</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">海马 · 雄性"怀孕"的鱼（课外拓展）</text>
    </svg>
  );
}

function FireflySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 夜色背景 */}
      <g style={dim(active, 0)}>
        <rect x="36" y="50" width="448" height="200" rx="14" fill="#1a2632" stroke="#0e1620" strokeWidth="2.4" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={`st${i}`} cx={90 + i * 120} cy={78 + (i % 2) * 26} r="1.8" fill="#c9d8e8" />
        ))}
        <text x="260" y="228" textAnchor="middle" fontSize="11" fill="#8a9aa8">夏夜的草丛——萤火虫的"求偶信号灯"此起彼伏</text>
        {[0, 1, 2].map((i) => (
          <circle key={`gl${i}`} cx={120 + i * 130} cy={150 + (i % 2) * 40} r="5" fill="#e8f0a0" opacity="0.9" />
          ))}
      </g>
      {/* 萤火虫结构 */}
      <g style={dim(active, 1)}>
        <ellipse cx="180" cy="170" rx="34" ry="20" fill="#5a4a2a" stroke="#3a2a1a" strokeWidth="2.4" />
        <circle cx="150" cy="158" r="11" fill="#5a4a2a" stroke="#3a2a1a" strokeWidth="2" />
        <path d="M148 148 q -6 -16 -16 -20 m 16 20 q 2 -18 12 -24" fill="none" stroke="#3a2a1a" strokeWidth="2" />
        <path d="M214 162 q 40 -10 66 2 q -26 14 -66 6 Z" fill="#3a2a1a" stroke="#2a1a0a" strokeWidth="2" />
        <ellipse cx="262" cy="184" rx="16" ry="9" fill="#f4f0a0" stroke="#c9b83a" strokeWidth="2.2" />
        <text x="300" y="266" fontSize="12.5" fill="#8a671b" fontWeight="700">腹部末端发光器</text>
        <line x1="296" y1="258" x2="272" y2="192" stroke="#8a671b" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="258" y="106" fontSize="12.5" fill="#8a6a3a" fontWeight="700">鞘翅（前翅硬化成盖）</text>
      </g>
      {/* 发光原理 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="272" width="440" height="44" rx="10" fill="#eef4d8" stroke="#6a8a2a" strokeWidth="2.2" />
        <text x="260" y="290" textAnchor="middle" fontSize="12.5" fill="#4a6a2a" fontWeight="800">荧光素 + O₂ + ATP —荧光素酶→ 氧化荧光素 + 冷光（几乎不发热）</text>
        <text x="260" y="308" textAnchor="middle" fontSize="11.5" fill="#5a7a2a">闪光频率与持续时间是不同种类的"密码"——种间生殖隔离的信号</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <text x="46" y="346" fontSize="12.5" fill="#4a6a2a" fontWeight="700">发光耗能巨大却信号精准——自然选择塑造的高效"通讯系统"</text>
        <text x="46" y="366" fontSize="12" fill="#5a7a2a">荧光素酶基因已成为科研中常用的"报告基因"·萤火虫也是环境指示物种</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">萤火虫 · 生物发光（课外拓展）</text>
    </svg>
  );
}

function TardigradeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <path d="M150 180 q 0 -52 50 -60 q 60 -10 110 0 q 50 8 50 60 q 0 52 -50 60 q -60 10 -110 0 q -50 -8 -50 -60 Z" fill="#c9d8b0" stroke="#6a8a4a" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${210 + i * 44} 122 q 6 58 0 118`} fill="none" stroke="#8aa868" strokeWidth="2" opacity="0.8" />
        ))}
        <circle cx="182" cy="146" r="6" fill="#3a4a2a" />
        <circle cx="210" cy="140" r="6" fill="#3a4a2a" />
        <text x="46" y="90" fontSize="12.5" fill="#4a6a2a" fontWeight="700">体长仅 0.5 mm（显微观察）</text>
        <text x="380" y="160" fontSize="12.5" fill="#4a6a2a">分节的"小熊掌"步态</text>
      </g>
      {/* 八条腿 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3].map((i) => (
          <g key={`l${i}`}>
            <path d={`M${188 + i * 46} 146 q -26 6 -34 28 q -4 14 8 14`} fill="none" stroke="#6a8a4a" strokeWidth="5" strokeLinecap="round" />
            <path d={`M${188 + i * 46} 214 q -26 -6 -34 -28 q -4 -14 8 -14`} fill="none" stroke="#6a8a4a" strokeWidth="5" strokeLinecap="round" />
          </g>
        ))}
        <text x="60" y="288" fontSize="12.5" fill="#4a6a2a" fontWeight="700">四对短腿·缓步爬行（缓步动物门）</text>
        <path d="M172 158 q 8 -8 16 -2" fill="none" stroke="#3a4a2a" strokeWidth="2.4" />
        <path d="M166 168 q 8 -8 16 -2" fill="none" stroke="#3a4a2a" strokeWidth="2.4" />
        <text x="380" y="200" fontSize="12.5" fill="#4a6a2a" fontWeight="700">口针可刺入植物细胞吸食</text>
      </g>
      {/* 隐生 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="316" width="440" height="52" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="338" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">"隐生"绝技：脱水成"小桶"休眠——耐受 -272°C～151°C、真空、强辐射数十年</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11.5" fill="#537078">遇水复苏重启生命活动——已在太空舱外裸露 10 天后成功繁殖后代</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">水熊虫 · 缓步动物门（课外拓展）</text>
    </svg>
  );
}

function FlounderSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 幼鱼（对称） */}
      <g style={dim(active, 0)}>
        <ellipse cx="120" cy="110" rx="44" ry="26" fill="#c9d8e8" stroke="#4d7ea8" strokeWidth="2.4" />
        <circle cx="88" cy="102" r="7" fill="#2c5a84" stroke="#1a3a5a" strokeWidth="1.4" />
        <circle cx="112" cy="96" r="7" fill="#2c5a84" stroke="#1a3a5a" strokeWidth="1.4" />
        <path d="M164 110 q 16 -6 22 -14 m -22 14 q 16 6 22 14" fill="none" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="60" y="164" fontSize="12.5" fill="#2c5a84" fontWeight="700">幼鱼：两眼对称（正常鱼形）</text>
        <text x="60" y="184" fontSize="12.5" fill="#2c5a84">漂浮在水的上层生活</text>
      </g>
      {/* 变态过程箭头 */}
      <g style={dim(active, 1)}>
        <path d="M228 110 h 60 m 0 0 l -9 -6 m 9 6 l -9 6" fill="none" stroke="#8a671b" strokeWidth="2.4" />
        <text x="258" y="92" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">变态发育：右眼"搬家"</text>
        <text x="258" y="132" textAnchor="middle" fontSize="12" fill="#8a671b">经颅骨扭曲移到左侧</text>
      </g>
      {/* 成鱼（贴底） */}
      <g style={dim(active, 2)}>
        <path d="M300 240 q -8 -50 40 -62 q 70 -16 120 8 q 24 12 12 34 q -14 26 -70 30 q -70 6 -102 -10 Z" fill="#b5a582" stroke="#7a6a4a" strokeWidth="2.8" />
        <circle cx="322" cy="228" r="9" fill="#3a4a3a" stroke="#1a2a1a" strokeWidth="1.6" />
        <circle cx="352" cy="222" r="9" fill="#3a4a3a" stroke="#1a2a1a" strokeWidth="1.6" />
        <path d="M452 224 q 22 -8 26 -22 m -26 40 q 20 0 30 -8" fill="none" stroke="#7a6a4a" strokeWidth="2.4" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={390 + (i % 2) * 24} cy={236 + Math.floor(i / 2) * 14} r="4" fill="#8a7a4a" />
        ))}
        <text x="330" y="300" fontSize="12.5" fill="#5a4a2a" fontWeight="700">成鱼：两眼同侧·侧卧海底</text>
        <text x="330" y="320" fontSize="12.5" fill="#5a4a2a">体色随底质变化（伪装大师）</text>
      </g>
      {/* 适应意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="336" width="440" height="36" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="260" y="360" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="700">"躺平"的适应：底栖伏击捕食·体色拟态躲天敌——结构与功能相适应的另类案例</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">比目鱼 · 变态发育的底栖鱼类（课外拓展）</text>
    </svg>
  );
}

function PenguinSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <path d="M200 92 q 70 -26 122 8 q 26 60 4 148 q -14 62 -66 66 q -54 -4 -66 -66 q -20 -88 6 -156 Z" fill="#2c3a4a" stroke="#1a2632" strokeWidth="2.8" />
        <path d="M232 116 q 52 -14 82 12 q 14 62 0 130 q -22 46 -46 48 q -28 -6 -42 -50 q -14 -70 6 -140 Z" fill="#f0f0e8" stroke="#d8d8cc" strokeWidth="2" />
        <text x="356" y="130" fontSize="12.5" fill="#1a2632" fontWeight="700">"燕尾服"配色：</text>
        <text x="356" y="150" fontSize="12.5" fill="#1a2632">背面深·腹面浅（水中隐蔽）</text>
      </g>
      {/* 头与鳍翅 */}
      <g style={dim(active, 1)}>
        <circle cx="252" cy="80" r="30" fill="#2c3a4a" stroke="#1a2632" strokeWidth="2.6" />
        <circle cx="242" cy="72" r="4" fill="#ffffff" />
        <circle cx="262" cy="72" r="4" fill="#ffffff" />
        <path d="M276 78 l 26 8 l -26 8 q 6 -8 0 -16 Z" fill="#e08a2a" stroke="#a5533c" strokeWidth="1.6" />
        <path d="M198 130 q -30 26 -24 66 q 2 16 14 12 q 20 -8 24 -52" fill="#2c3a4a" stroke="#1a2632" strokeWidth="2.2" />
        <path d="M316 128 q 32 28 26 68 q -2 16 -14 12 q -20 -8 -26 -54" fill="#2c3a4a" stroke="#1a2632" strokeWidth="2.2" />
        <text x="60" y="120" fontSize="12.5" fill="#1a2632" fontWeight="700">鳍翅（翅膀变桨）</text>
        <text x="60" y="140" fontSize="12.5" fill="#1a2632">"飞"进水里每小时 10 km</text>
        <line x1="140" y1="140" x2="176" y2="160" stroke="#1a2632" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 脚与皮下脂肪 */}
      <g style={dim(active, 2)}>
        <path d="M236 314 l -8 16 h 26 l -4 -16 m 22 0 l -6 16 h 26 l -6 -16" fill="#e08a2a" stroke="#a5533c" strokeWidth="2" />
        <text x="120" y="344" fontSize="12.5" fill="#a5533c" fontWeight="700">脚蹼在身体最后方（直立行走·企鹅式摇摆）</text>
        <text x="356" y="216" fontSize="12.5" fill="#1a2632" fontWeight="700">皮下厚脂肪层 +</text>
        <text x="356" y="236" fontSize="12.5" fill="#1a2632">羽毛密罩 = 抗 -60°C</text>
      </g>
      {/* 特征 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="700">鸟类的"例外"：前肢变鳍放弃飞行 · 骨骼有骨髓不中空 · 雄帝企鹅孵卵（孵化期禁食 65 天）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">企鹅 · 鸟纲企鹅目（课外拓展）</text>
    </svg>
  );
}

function CrocodileSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 体形 */}
      <g style={dim(active, 0)}>
        <path d="M120 220 Q 150 172 240 168 Q 330 166 366 196 Q 380 210 372 224 Q 300 248 200 246 Q 140 244 120 220 Z" fill="#6a8a5a" stroke="#3a5a2a" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${196 + i * 34} 172 l 5 -12 l 5 12`} fill="#4d6a3a" stroke="#3a5a2a" strokeWidth="1.6" />
        ))}
        <text x="46" y="150" fontSize="12.5" fill="#3a5a2a" fontWeight="700">背部角质鳞甲 + 骨质脊棱</text>
        <text x="248" y="300" fontSize="12.5" fill="#3a5a2a" fontWeight="700">侧扁的粗壮尾部（水中推进器）</text>
      </g>
      {/* 头部 */}
      <g style={dim(active, 1)}>
        <path d="M366 196 q 60 -22 104 -6 l 20 14 l -18 12 q -48 14 -106 -6 Z" fill="#6a8a5a" stroke="#3a5a2a" strokeWidth="2.6" />
        <path d="M398 208 l 8 12 m 14 -10 l 8 12 m 14 -9 l 7 11" stroke="#e8e4d0" strokeWidth="3" strokeLinecap="round" />
        <circle cx="446" cy="196" r="4" fill="#1a2a1a" />
        <text x="46" y="88" fontSize="12.5" fill="#3a5a2a" fontWeight="700">长吻·圆锥齿（咬住后翻滚撕扯）</text>
        <text x="46" y="108" fontSize="12.5" fill="#3a5a2a">眼鼻位于头顶（潜伏水面下）</text>
      </g>
      {/* 四腔心 */}
      <g style={dim(active, 2)}>
        <rect x="46" y="176" width="40" height="40" rx="8" fill="#c94a4a" stroke="#8a2020" strokeWidth="2.2" />
        <path d="M60 180 v 32 m -8 -16 h 24" stroke="#f0d0d0" strokeWidth="1.8" />
        <text x="46" y="242" fontSize="12.5" fill="#8a2020" fontWeight="700">四个腔的心脏（爬行纲唯一）</text>
        <text x="46" y="262" fontSize="12.5" fill="#8a2020">血液分隔更完全·代谢更旺盛</text>
      </g>
      {/* 育幼 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="300" width="440" height="50" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="322" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">母性关怀：守巢·听叫声破壳·衔幼鳄下水——爬行动物中罕见</text>
        <text x="260" y="342" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">温度依赖型性别决定：巢温 31~32°C 上下分别孵出雌或雄</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">鳄鱼 · 爬行纲鳄目的"例外"（课外拓展）</text>
    </svg>
  );
}

function BeeHiveSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 蜂后 */}
      <g style={dim(active, 0)}>
        <ellipse cx="120" cy="120" rx="30" ry="18" fill="#c9a05a" stroke="#8a6a3a" strokeWidth="2.6" />
        <path d="M146 120 q 66 -14 132 0 q -66 20 -132 0 Z" fill="#e0b860" stroke="#8a6a3a" strokeWidth="2.2" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${172 + i * 30} 108 q 4 12 0 24`} fill="none" stroke="#8a6a3a" strokeWidth="1.8" />
        ))}
        <text x="56" y="82" fontSize="12.5" fill="#8a6a3a" fontWeight="700">蜂后（唯一生殖雌·体长最大）</text>
        <text x="56" y="102" fontSize="12.5" fill="#8a6a3a">分泌蜂王物质维持群体秩序</text>
      </g>
      {/* 工蜂 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <ellipse cx={110 + i * 62} cy={210} rx="16" ry="11" fill="#e0b860" stroke="#8a6a3a" strokeWidth="2" />
            <path d={`M${94 + i * 62} 206 h 32 m -32 7 h 32`} stroke="#5a4a2a" strokeWidth="2.4" />
            <ellipse cx={104 + i * 62} cy={198} rx="9" ry="6" fill="#d8e4f0" stroke="#8a9a9f" strokeWidth="1.4" opacity="0.9" />
          </g>
        ))}
        <text x="270" y="206" fontSize="12.5" fill="#8a6a3a" fontWeight="700">工蜂（不育雌性·干所有活）</text>
        <text x="270" y="226" fontSize="12.5" fill="#8a6a3a">保育→筑巢→守卫→采蜜 按日龄分工</text>
      </g>
      {/* 巢房 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1, 2, 3, 4, 5].map((c) => {
            const x = 66 + c * 28 + (r % 2) * 14;
            const y = 280 + r * 16;
            return <path key={`${r}-${c}`} d={`M${x} ${y} l 14 0 l 7 12 l -7 12 l -14 0 l -7 -12 Z`} fill="#e0c860" stroke="#8a6a3a" strokeWidth="1.4" />;
          }),
        )}
        <text x="330" y="300" fontSize="12.5" fill="#8a6a3a" fontWeight="700">六角形巢房（最省材料）</text>
        <text x="330" y="320" fontSize="12.5" fill="#8a6a3a">育婴室 + 仓库两用</text>
      </g>
      {/* 8字舞 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">8 字舞角度指示蜜源方向·摇臀时长表示距离——动物"语言"的经典案例</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蜜蜂 · 社会性昆虫（课外拓展）</text>
    </svg>
  );
}

function OctopusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 外套膜 + 喷水漏斗 */}
      <g style={dim(active, 0)}>
        <path d="M296 100 q 90 -14 138 28 q 30 30 12 66 q -22 40 -86 36 q -64 -4 -84 -48 q -12 -46 20 -82 Z" fill="#c9a8b8" stroke="#8a5a7a" strokeWidth="2.8" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={370 + i * 26} cy={140 + i * 16} rx="9" ry="6" fill="#e8d0e0" stroke="#8a5a7a" strokeWidth="1.4" opacity="0.8" />
        ))}
        <path d="M300 190 l -34 20 q 8 14 26 8 l 22 -14 Z" fill="#b08a9a" stroke="#8a5a7a" strokeWidth="2" />
        <text x="46" y="140" fontSize="12.5" fill="#6a3a5a" fontWeight="700">外套膜（闭合喷水）</text>
        <text x="46" y="200" fontSize="12.5" fill="#6a3a5a" fontWeight="700">漏斗（反冲推进）</text>
        <line x1="200" y1="136" x2="330" y2="138" stroke="#6a3a5a" strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1="162" y1="196" x2="268" y2="204" stroke="#6a3a5a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 眼 + 腕 */}
      <g style={dim(active, 1)}>
        <circle cx="322" cy="130" r="16" fill="#f0e8d8" stroke="#6a3a5a" strokeWidth="2.4" />
        <ellipse cx="322" cy="130" rx="9" ry="12" fill="#2a2a2a" />
        <text x="230" y="104" fontSize="12.5" fill="#6a3a5a" fontWeight="700">发达的眼（最像脊椎动物）</text>
        <line x1="286" y1="112" x2="308" y2="122" stroke="#6a3a5a" strokeWidth="1.2" strokeDasharray="3 3" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M310 ${176 + i * 10} q -70 ${18 + i * 10} -150 ${8 + i * 16} q -30 -4 -48 -20`} fill="none" stroke="#b08a9a" strokeWidth={9 - i} strokeLinecap="round" opacity={0.95 - i * 0.06} />
        ))}
        <text x="46" y="330" fontSize="12.5" fill="#6a3a5a" fontWeight="700">8 条腕 + 2 条长触腕（乌贼）· 腕上吸盘捕猎</text>
      </g>
      {/* 变色与墨囊 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="56" width="150" height="60" rx="12" fill="#e4dcec" stroke="#7a4a8a" strokeWidth="2.2" />
        <text x="115" y="80" textAnchor="middle" fontSize="12.5" fill="#5a3a6a" fontWeight="800">色素细胞变色</text>
        <text x="115" y="100" textAnchor="middle" fontSize="11" fill="#6a4a7a">伪装+交流（无脊椎最快）</text>
        <ellipse cx="316" cy="250" rx="20" ry="14" fill="#3a3a4a" stroke="#1a1a2a" strokeWidth="2" />
        <text x="344" y="254" fontSize="12.5" fill="#3a3a4a" fontWeight="700">墨囊：喷墨逃跑</text>
      </g>
      {/* 特征 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#f4ecf4" stroke="#8a5a7a" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#6a3a5a" fontWeight="700">头足纲 = 软体动物的"巅峰"：闭管循环 · 最发达的无脊椎大脑 · 皮肤即可视语言</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">乌贼 · 软体动物门头足纲（课外拓展）</text>
    </svg>
  );
}

function MantisSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 头部 */}
      <g style={dim(active, 0)}>
        <path d="M348 130 q 40 -18 74 6 q 14 12 6 26 q -10 16 -40 12 q -36 -6 -40 -44 Z" fill="#7aa85a" stroke="#3f7f3a" strokeWidth="2.6" />
        <circle cx="386" cy="140" r="4.5" fill="#1a3a1a" />
        <circle cx="404" cy="146" r="4.5" fill="#1a3a1a" />
        {[0, 1].map((i) => (
          <path key={i} d={`M${400 + i * 12} 122 q 6 -22 2 -32`} fill="none" stroke="#3f7f3a" strokeWidth="2" strokeLinecap="round" />
        ))}
        <text x="250" y="80" fontSize="12.5" fill="#2f6f2a" fontWeight="700">三角形头·灵活转动</text>
        <text x="250" y="100" fontSize="12.5" fill="#2f6f2a">双眼立体视觉测距</text>
      </g>
      {/* 捕捉足 */}
      <g style={dim(active, 1)}>
        <path d="M340 150 q -60 10 -96 44 q -10 12 2 18 q 14 6 26 -6 q 26 -28 74 -34" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="2.6" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M262 ${188 + i * 5} l -9 -4`} stroke="#3f7f3a" strokeWidth="2" strokeLinecap="round" />
        ))}
        <text x="60" y="150" fontSize="12.5" fill="#2f6f2a" fontWeight="700">一对捕捉足（镰刀状）</text>
        <text x="60" y="170" fontSize="12.5" fill="#2f6f2a">内侧列生尖刺·夹住猎物不脱落</text>
      </g>
      {/* 身体与翅 */}
      <g style={dim(active, 2)}>
        <path d="M340 152 q -20 30 -60 190 l 26 6 q 36 -140 60 -180 Z" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="2.4" />
        <path d="M356 158 q 30 90 -6 182 l 20 4 q 40 -100 8 -184 Z" fill="#a5c98a" stroke="#3f7f3a" strokeWidth="2" opacity="0.85" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${300 - i * 4} ${300 + i * 14} l -22 14 m 22 -14 l 8 22`} fill="none" stroke="#3f7f3a" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="330" y="366" fontSize="12.5" fill="#2f6f2a" fontWeight="700">中后胸与两对步行足</text>
      </g>
      {/* 拟态 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="56" width="180" height="60" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="130" y="80" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">兰花螳螂：拟态花瓣</text>
        <text x="130" y="100" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">守株待兔捕食访花昆虫</text>
        <text x="42" y="352" fontSize="12.5" fill="#537078" fontWeight="700">不完全变态：卵鞘（螵蛸）→ 若虫 → 成虫（无蛹）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">螳螂 · 昆虫纲螳螂目（课外拓展）</text>
    </svg>
  );
}

function DragonflySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 复眼 + 头 */}
      <g style={dim(active, 0)}>
        <circle cx="150" cy="170" r="26" fill="#3a8a7a" stroke="#1a5a4a" strokeWidth="2.6" />
        <circle cx="136" cy="160" r="11" fill="#2a5a5a" stroke="#1a3a3a" strokeWidth="2" />
        <circle cx="164" cy="160" r="11" fill="#2a5a5a" stroke="#1a3a3a" strokeWidth="2" />
        <path d="M150 196 l 0 34 m 0 -34 l 0 34" stroke="#1a5a4a" strokeWidth="5" strokeLinecap="round" />
        <text x="46" y="112" fontSize="12.5" fill="#1a5a4a" fontWeight="700">一对巨大复眼</text>
        <text x="46" y="132" fontSize="12.5" fill="#1a5a4a">（约 3 万个小眼·几乎 360° 视野）</text>
        <line x1="120" y1="140" x2="138" y2="152" stroke="#1a5a4a" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="46" y="248" fontSize="12.5" fill="#1a5a4a" fontWeight="700">咀嚼式口器（捕食蚊子）</text>
      </g>
      {/* 四翅 */}
      <g style={dim(active, 1)}>
        <path d="M176 176 q 60 -74 150 -76 q -8 60 -110 88 Z" fill="#c9d8e8" stroke="#4d7ea8" strokeWidth="2" opacity="0.85" />
        <path d="M176 176 q 76 30 160 92 q -70 26 -160 -66 Z" fill="#c9d8e8" stroke="#4d7ea8" strokeWidth="2" opacity="0.85" />
        <path d="M186 180 q 50 -50 118 -56 m -112 64 q 56 22 124 70" fill="none" stroke="#8ab4cc" strokeWidth="1.4" />
        <text x="336" y="76" fontSize="12.5" fill="#2c5a84" fontWeight="700">两对等长的膜翅</text>
        <text x="336" y="96" fontSize="12.5" fill="#2c5a84">前后翅可分别振动·悬停飞行</text>
        <text x="336" y="116" fontSize="12.5" fill="#2c5a84">每秒捕捉成功率约 95%</text>
      </g>
      {/* 细长腹 */}
      <g style={dim(active, 2)}>
        <path d="M150 204 q 100 10 220 -6 q 60 -8 100 -2" fill="none" stroke="#3a8a7a" strokeWidth="9" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={260 + i * 36} cy={201 - i * 0.8} r="3" fill="#1a5a4a" />
        ))}
        <text x="330" y="248" fontSize="12.5" fill="#1a5a4a" fontWeight="700">细长分节的腹部</text>
      </g>
      {/* 半变态 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="296" width="440" height="70" rx="12" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="322" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">半变态发育：卵 → 稚虫（水虿·水生用直肠鳃呼吸）→ 成虫</text>
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#537078">没有蛹期——与家蚕（完全变态：卵→幼虫→蛹→成虫）对比记忆</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蜻蜓 · 昆虫纲蜻蜓目（课外拓展）</text>
    </svg>
  );
}

function SpiderSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 头胸部 + 眼 */}
      <g style={dim(active, 0)}>
        <path d="M196 190 q -4 -34 34 -44 q 40 -10 62 8 q 16 14 10 34 q -8 24 -44 26 q -50 2 -62 -24 Z" fill="#5a4a3a" stroke="#3a2a1a" strokeWidth="2.6" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={216 + (i % 2) * 12} cy={162 + Math.floor(i / 2) * 10} r="3.4" fill="#1a1a1a" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <circle key={`r${i}`} cx={240 + (i % 2) * 12} cy={162 + Math.floor(i / 2) * 10} r="3.4" fill="#1a1a1a" />
        ))}
        <text x="66" y="132" fontSize="12.5" fill="#3a2a1a" fontWeight="700">头胸部（愈合成一节）</text>
        <text x="66" y="152" fontSize="12.5" fill="#3a2a1a">8 颗单眼（无复眼）</text>
        <line x1="150" y1="148" x2="200" y2="160" stroke="#3a2a1a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 步足 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3].map((i) => (
          <path key={`l${i}`} d={`M210 ${168 + i * 10} Q ${140 - i * 16} ${158 + i * 16} ${96 - i * 20} ${196 + i * 22} q -12 14 -26 18`} fill="none" stroke="#6a5a4a" strokeWidth="5.4" strokeLinecap="round" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <path key={`r${i}`} d={`M294 ${168 + i * 10} Q ${364 + i * 16} ${158 + i * 16} ${408 + i * 20} ${196 + i * 22} q 12 14 26 18`} fill="none" stroke="#6a5a4a" strokeWidth="5.4" strokeLinecap="round" />
        ))}
        <text x="66" y="286" fontSize="12.5" fill="#3a2a1a" fontWeight="700">四对步足（节肢·弹跳突袭）</text>
        <text x="330" y="308" fontSize="12.5" fill="#3a2a1a">一对触肢（辅助取食）</text>
      </g>
      {/* 腹部 + 纺器 */}
      <g style={dim(active, 2)}>
        <ellipse cx="342" cy="206" rx="72" ry="58" fill="#8a6a4a" stroke="#5a3a2a" strokeWidth="2.8" />
        <path d="M310 178 q 24 -8 44 4 m -52 34 q 30 -10 58 2" fill="none" stroke="#c9a05a" strokeWidth="2" opacity="0.8" />
        <text x="330" y="122" fontSize="12.5" fill="#5a3a2a" fontWeight="700">腹部（大而柔软）</text>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M388 ${242 + i * 10} q 20 -4 30 6`} fill="none" stroke="#d8d8d8" strokeWidth="2" />
        ))}
        <text x="396" y="276" fontSize="12.5" fill="#5a6a7a" fontWeight="700">末端纺器吐丝</text>
        <path d="M40 322 q 80 -28 160 -10 q 90 18 170 -6 q 60 -16 110 8" fill="none" stroke="#e8e8e8" strokeWidth="2.4" />
        <text x="66" y="306" fontSize="12.5" fill="#7a8a8a" fontWeight="700">蛛丝：韧性强于等粗度的钢铁</text>
      </g>
      {/* 特征 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="336" width="440" height="34" rx="10" fill="#f4e4dc" stroke="#a54838" strokeWidth="2.2" />
        <text x="260" y="358" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="700">蛛形纲特征：头胸部+腹部·四对步足·无触角·书肺呼吸（与昆虫三对足相对）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蜘蛛 · 节肢动物蛛形纲代表（课外拓展）</text>
    </svg>
  );
}

function CoralSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 珊瑚虫个体 */}
      <g style={dim(active, 0)}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M${110 + i * 56} 168 q -4 -30 4 -44 q 6 -10 12 0 q 8 14 4 44`} fill="#e8a0a0" stroke="#a54858" strokeWidth="2.2" />
            {[0, 1, 2, 3, 4].map((j) => (
              <path key={j} d={`M${116 + i * 56} 126 q ${-14 + j * 7} -16 ${-10 + j * 5} -26`} fill="none" stroke="#f0b8b8" strokeWidth="3.4" strokeLinecap="round" />
            ))}
          </g>
        ))}
        <text x="44" y="82" fontSize="12.5" fill="#a54858" fontWeight="700">珊瑚虫：触手捕食浮游生物</text>
        <text x="44" y="102" fontSize="12.5" fill="#a54858">刺细胞麻醉猎物（同水母）</text>
        <line x1="96" y1="108" x2="112" y2="118" stroke="#a54858" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 石灰质外骨骼 */}
      <g style={dim(active, 1)}>
        <path d="M60 208 q 100 -34 200 0 q 40 12 90 0 l 0 26 q -60 18 -110 4 q -100 -26 -180 0 Z" fill="#e8d8c0" stroke="#a5966a" strokeWidth="2.4" />
        <text x="380" y="222" fontSize="12.5" fill="#8a7a4a" fontWeight="700">石灰质外骨骼</text>
        <text x="380" y="242" fontSize="12.5" fill="#8a7a4a">虫体死亡后堆积成礁</text>
        <line x1="376" y1="218" x2="346" y2="210" stroke="#8a7a4a" strokeWidth="1.2" />
      </g>
      {/* 虫黄藻共生 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={92 + i * 26} cy={266 + (i % 2) * 12} r="8" fill="#b8d878" stroke="#6a8a3a" strokeWidth="1.8" />
        ))}
        <text x="196" y="274" fontSize="12.5" fill="#4a6a2a" fontWeight="700">体内共生虫黄藻（光合供能·赋予珊瑚色彩）</text>
        <text x="196" y="294" fontSize="12.5" fill="#4a6a2a">水温升高 → 藻离开 → 珊瑚白化死亡</text>
      </g>
      {/* 造礁意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="322" width="440" height="44" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="260" y="340" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="700">珊瑚礁：海洋中物种多样性最高的生态系统之一（"海底热带雨林"）</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11.5" fill="#537078">保护珊瑚礁 = 保护四分之一海洋物种的家园</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">珊瑚虫 · 造礁刺胞动物（课外拓展）</text>
    </svg>
  );
}

function TapewormSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 头节 */}
      <g style={dim(active, 0)}>
        <path d="M78 170 q -12 -22 8 -36 q 22 -14 40 2 q 14 14 2 32 q -24 16 -50 2 Z" fill="#e8dcc8" stroke="#8a7a4a" strokeWidth="2.6" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M84 ${142 + i * 12} l 8 -6`} stroke="#6a5a3a" strokeWidth="2.2" strokeLinecap="round" />
        ))}
        <circle cx="112" cy="156" r="7" fill="none" stroke="#6a5a3a" strokeWidth="2" />
        <text x="44" y="108" fontSize="12.5" fill="#8a7a4a" fontWeight="700">头节（小钩+吸盘）</text>
        <text x="44" y="128" fontSize="12.5" fill="#8a7a4a" fontWeight="700">钩挂在肠壁上</text>
        <line x1="90" y1="134" x2="98" y2="146" stroke="#8a7a4a" strokeWidth="1.2" />
      </g>
      {/* 颈节与幼节 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={132 + i * 34} y={142 - i * 3} width="30" height={56 + i * 6} rx="6" fill="#e8dcc8" stroke="#a5966a" strokeWidth="2" />
        ))}
        <text x="150" y="248" fontSize="12.5" fill="#8a7a4a" fontWeight="700">颈部（新生节片）</text>
        <text x="150" y="268" fontSize="12.5" fill="#8a7a4a">幼节逐节向后推移</text>
      </g>
      {/* 孕卵节片 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={272 + i * 48} y={128 - i * 2} width="44" height={84 + i * 4} rx="6" fill="#e8c9a0" stroke="#a5763a" strokeWidth="2.2" />
        ))}
        {[0, 1, 2].map((i) => (
          <g key={`e${i}`}>
            {[0, 1, 2, 3, 4, 5].map((j) => (
              <circle key={j} cx={284 + (j % 3) * 14 + i * 48} cy={152 + Math.floor(j / 3) * 22 - i * 2} r="4" fill="#c99a5a" stroke="#8a671b" strokeWidth="1.2" />
            ))}
          </g>
        ))}
        <text x="304" y="252" fontSize="12.5" fill="#8a671b" fontWeight="700">孕卵节片（装满虫卵）</text>
        <text x="304" y="272" fontSize="12.5" fill="#8a671b">最长可体长 10 米、数千节片</text>
      </g>
      {/* 寄生适应 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="296" width="440" height="70" rx="12" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="800">寄生适应：没有消化器官和运动器官——直接用体表吸收宿主肠内养料</text>
        <text x="260" y="344" textAnchor="middle" fontSize="12" fill="#a5533c">防治：不喝生水·不生食猪肉牛肉（米猪肉含囊尾蚴）·孕节随粪便检查确诊</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">猪肉绦虫 · 扁形动物寄生代表（课外拓展）</text>
    </svg>
  );
}

function SnailSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 螺旋壳 */}
      <g style={dim(active, 0)}>
        <circle cx="300" cy="170" r="104" fill="#d8b078" stroke="#8a6a3a" strokeWidth="3" />
        <path d="M300 170 m -104 0 a 104 104 0 1 1 104 104" fill="none" stroke="#8a6a3a" strokeWidth="2" />
        <path d="M300 170 m -76 0 a 76 76 0 1 1 76 76" fill="none" stroke="#a5824a" strokeWidth="2.2" />
        <path d="M300 170 m -48 0 a 48 48 0 1 1 48 48" fill="none" stroke="#a5824a" strokeWidth="2.2" />
        <circle cx="300" cy="170" r="20" fill="#c9a05a" stroke="#8a6a3a" strokeWidth="2.2" />
        <text x="300" y="296" textAnchor="middle" fontSize="12.5" fill="#8a6a3a" fontWeight="700">螺旋壳（回旋生长·可整体缩入）</text>
      </g>
      {/* 触角与眼 */}
      <g style={dim(active, 1)}>
        <path d="M176 210 Q 168 190 158 182" fill="none" stroke="#a5c99a" strokeWidth="10" strokeLinecap="round" />
        <circle cx="158" cy="178" r="7" fill="#6a8a5a" stroke="#4a6a3a" strokeWidth="2" />
        <path d="M186 196 Q 196 168 190 152" fill="none" stroke="#a5c99a" strokeWidth="12" strokeLinecap="round" />
        <circle cx="190" cy="146" r="8" fill="#6a8a5a" stroke="#4a6a3a" strokeWidth="2.2" />
        <text x="46" y="120" fontSize="12.5" fill="#4a6a3a" fontWeight="700">两对触角（后长前短）</text>
        <text x="46" y="142" fontSize="12.5" fill="#4a6a3a" fontWeight="700">眼点在长触角顶端</text>
      </g>
      {/* 腹足 */}
      <g style={dim(active, 2)}>
        <path d="M96 250 Q 160 226 260 244 Q 380 264 448 250 Q 470 258 456 274 Q 350 296 240 282 Q 130 272 92 276 Q 72 268 96 250 Z" fill="#a5c99a" stroke="#4a6a3a" strokeWidth="2.6" />
        <path d="M140 262 q 30 -8 60 0 m 30 4 q 30 -8 60 0 m 30 4 q 30 -8 60 0" fill="none" stroke="#7aa87a" strokeWidth="2" opacity="0.8" />
        <text x="120" y="316" fontSize="12.5" fill="#4a6a3a" fontWeight="700">腹足（肌肉波状收缩爬行）</text>
        <path d="M300 300 q 24 8 48 0 m -36 10 q 20 6 40 0" fill="none" stroke="#8ab4c9" strokeWidth="3" opacity="0.7" />
        <text x="366" y="322" fontSize="12.5" fill="#4a6a7a" fontWeight="700">黏液减少摩擦</text>
      </g>
      {/* 齿舌与呼吸孔 */}
      <g style={dim(active, 3)}>
        <path d="M150 216 l 10 8 m -4 -12 l 10 8 m -4 -12 l 10 8" stroke="#6a8a5a" strokeWidth="2.4" strokeLinecap="round" />
        <text x="76" y="196" fontSize="12.5" fill="#4a6a3a" fontWeight="700">口内的齿舌（刮食叶片）</text>
        <line x1="130" y1="202" x2="150" y2="212" stroke="#4a6a3a" strokeWidth="1.2" />
        <circle cx="262" cy="228" r="7" fill="#8a6a3a" stroke="#5a4a2a" strokeWidth="2" />
        <text x="220" y="206" fontSize="12.5" fill="#5a4a2a" fontWeight="700">呼吸孔（"肺"开口）</text>
      </g>
      {/* 特征 */}
      <g style={dim(active, 4)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#e8f0dc" stroke="#6a8a3a" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#4a6a2a" fontWeight="700">软体动物：身体柔软分头·足·内脏团，外套膜分泌形成贝壳</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蜗牛 · 软体动物门肺螺类（课外拓展）</text>
    </svg>
  );
}

function TurtleSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 背甲 */}
      <g style={dim(active, 0)}>
        <path d="M120 218 Q 120 116 260 108 Q 400 116 400 218 Q 400 234 380 238 L 140 238 Q 120 234 120 218 Z" fill="#5a7a4a" stroke="#3a5a2a" strokeWidth="3" />
        <path d="M260 108 L 200 170 L 260 238 L 320 170 Z" fill="#7a9a5a" stroke="#3a5a2a" strokeWidth="2" />
        <path d="M200 170 L 150 150 L 120 218 M320 170 L 370 150 L 400 218 M200 170 L 140 238 M320 170 L 380 238" fill="none" stroke="#3a5a2a" strokeWidth="1.6" opacity="0.7" />
        <text x="36" y="90" fontSize="12.5" fill="#3a5a2a" fontWeight="700">背甲（骨质+角质盾片）</text>
        <line x1="100" y1="96" x2="150" y2="126" stroke="#3a5a2a" strokeWidth="1.4" />
        <path d="M140 238 h 240 v 14 q 0 10 -12 10 h -216 q -12 0 -12 -10 Z" fill="#c9b88a" stroke="#8a7a4a" strokeWidth="2.2" />
        <text x="36" y="272" fontSize="12.5" fill="#8a7a4a" fontWeight="700">腹甲（与背甲连成"盔甲箱"）</text>
        <line x1="120" y1="262" x2="150" y2="252" stroke="#8a7a4a" strokeWidth="1.4" />
      </g>
      {/* 头颈 */}
      <g style={dim(active, 1)}>
        <path d="M126 200 Q 96 194 84 176 Q 74 160 88 152 Q 104 144 116 156 Q 128 168 138 182" fill="#8aa860" stroke="#3a5a2a" strokeWidth="2.4" />
        <circle cx="98" cy="162" r="4.5" fill="#222" />
        <text x="42" y="128" fontSize="12.5" fill="#3a5a2a" fontWeight="700">头可缩入壳内（防御）</text>
        <line x1="80" y1="134" x2="92" y2="150" stroke="#3a5a2a" strokeWidth="1.3" strokeDasharray="3 3" />
      </g>
      {/* 四肢与尾 */}
      <g style={dim(active, 2)}>
        <path d="M170 250 l -16 34 q -4 12 8 12 l 18 -4" fill="#8aa860" stroke="#3a5a2a" strokeWidth="2.2" />
        <path d="M350 250 l 16 34 q 4 12 -8 12 l -18 -4" fill="#8aa860" stroke="#3a5a2a" strokeWidth="2.2" />
        <path d="M226 254 l -8 40 h 20 l 6 -38" fill="#8aa860" stroke="#3a5a2a" strokeWidth="2.2" />
        <path d="M296 254 l 8 40 h -20 l -6 -38" fill="#8aa860" stroke="#3a5a2a" strokeWidth="2.2" />
        <path d="M398 236 q 22 2 24 16 q -14 6 -24 -2" fill="#8aa860" stroke="#3a5a2a" strokeWidth="2" />
        <text x="356" y="306" fontSize="12.5" fill="#3a5a2a" fontWeight="700">四肢柱状·短尾</text>
      </g>
      {/* 羊膜卵 */}
      <g style={dim(active, 3)}>
        <ellipse cx="150" cy="330" rx="40" ry="26" fill="#f4ecdc" stroke="#b5a582" strokeWidth="2.4" />
        <text x="150" y="335" textAnchor="middle" fontSize="10.5" fill="#8a7a4a" fontWeight="700">羊膜卵</text>
        <text x="230" y="322" fontSize="12.5" fill="#8a671b" fontWeight="700">卵壳防干燥·胚胎在羊水中发育</text>
        <text x="230" y="344" fontSize="12.5" fill="#8a671b" fontWeight="700">摆脱对水的依赖，真正登陆</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">乌龟 · 爬行动物代表（课外拓展）</text>
    </svg>
  );
}

function CrabSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 头胸部甲壳 */}
      <g style={dim(active, 0)}>
        <path d="M148 208 Q 148 120 260 112 Q 372 120 372 208 Q 372 250 322 262 Q 260 274 198 262 Q 148 250 148 208 Z" fill="#c96a4a" stroke="#8a3a2a" strokeWidth="2.8" />
        <path d="M196 190 Q 200 150 260 144 Q 320 150 324 190" fill="none" stroke="#8a3a2a" strokeWidth="1.6" opacity="0.6" />
        <circle cx="212" cy="168" r="6" fill="#3a2a2a" />
        <circle cx="308" cy="168" r="6" fill="#3a2a2a" />
        <path d="M236 152 q 6 -10 12 0 m 8 0 q 6 -10 12 0" fill="none" stroke="#8a3a2a" strokeWidth="2" />
        <text x="404" y="150" fontSize="12.5" fill="#8a3a2a" fontWeight="700">头胸部（背甲包裹）</text>
        <line x1="400" y1="154" x2="368" y2="170" stroke="#8a3a2a" strokeWidth="1.4" />
        <text x="404" y="196" fontSize="12.5" fill="#5a6a7a" fontWeight="700">眼柄上的复眼</text>
        <line x1="400" y1="200" x2="318" y2="172" stroke="#5a6a7a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 螯足 */}
      <g style={dim(active, 1)}>
        <path d="M156 196 Q 96 186 78 148 Q 70 128 86 122 Q 102 116 108 134 Q 116 168 162 176" fill="#e08a5a" stroke="#8a3a2a" strokeWidth="2.4" />
        <path d="M86 122 l -4 -22 m 14 20 l 8 -20" stroke="#8a3a2a" strokeWidth="4" strokeLinecap="round" />
        <path d="M364 196 Q 424 186 442 148 Q 450 128 434 122 Q 418 116 412 134 Q 404 168 358 176" fill="#e08a5a" stroke="#8a3a2a" strokeWidth="2.4" />
        <text x="416" y="98" fontSize="12.5" fill="#8a3a2a" fontWeight="700">螯足（捕食·防御）</text>
        <text x="30" y="98" fontSize="12.5" fill="#8a3a2a" fontWeight="700">可夹碎螺贝</text>
      </g>
      {/* 步足 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2].map((i) => (
          <path key={`l${i}`} d={`M176 ${214 + i * 16} Q ${118 - i * 14} ${222 + i * 18} ${96 - i * 18} ${272 + i * 12}`} fill="none" stroke="#b05a3a" strokeWidth="7" strokeLinecap="round" />
        ))}
        {[0, 1, 2].map((i) => (
          <path key={`r${i}`} d={`M344 ${214 + i * 16} Q ${402 + i * 14} ${222 + i * 18} ${424 + i * 18} ${272 + i * 12}`} fill="none" stroke="#b05a3a" strokeWidth="7" strokeLinecap="round" />
        ))}
        <text x="388" y="316" fontSize="12.5" fill="#8a4a2a" fontWeight="700">四对步足（侧向爬行）</text>
      </g>
      {/* 腹部 + 鳃 */}
      <g style={dim(active, 3)}>
        <path d="M232 266 Q 260 292 288 266 Q 284 296 260 300 Q 236 296 232 266 Z" fill="#d87a5a" stroke="#8a3a2a" strokeWidth="2" />
        <text x="260" y="330" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="700">腹部（蟹脐：鉴别雌雄）</text>
        <path d="M172 230 q 14 10 0 22 m 20 -26 q 14 12 0 26" fill="none" stroke="#e8b8a0" strokeWidth="3" opacity="0.8" />
        <text x="76" y="196" fontSize="12.5" fill="#a56a4a" fontWeight="700">鳃在甲下（水中呼吸）</text>
        <line x1="160" y1="200" x2="176" y2="222" stroke="#a56a4a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 特征 */}
      <g style={dim(active, 4)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#f4e4dc" stroke="#a54838" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="700">外骨骼需蜕皮生长 · 断肢可再生 · 离水后用鳃腔保水短时呼吸</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">螃蟹 · 节肢动物门甲壳类代表（课外拓展）</text>
    </svg>
  );
}

function JellyfishSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 伞盖 + 辐射管 */}
      <g style={dim(active, 0)}>
        <path d="M120 168 Q 120 76 260 76 Q 400 76 400 168 Q 400 186 384 190 Q 260 162 136 190 Q 120 186 120 168 Z" fill="#d8e4f0" stroke="#5a7a9a" strokeWidth="2.8" opacity="0.92" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M260 84 Q ${176 + i * 42} 108 ${150 + i * 56} 186`} fill="none" stroke="#9ab4cc" strokeWidth="2.2" />
        ))}
        <text x="398" y="120" fontSize="12.5" fill="#3a5a7a" fontWeight="700">伞盖（胶状中胶层）</text>
        <text x="398" y="160" fontSize="12.5" fill="#3a5a7a" fontWeight="700">辐射管（消化循环）</text>
        <line x1="412" y1="156" x2="386" y2="168" stroke="#3a5a7a" strokeWidth="1.4" />
      </g>
      {/* 口腕 */}
      <g style={dim(active, 1)}>
        <path d="M236 182 Q 228 236 210 272 Q 202 292 212 306" fill="none" stroke="#c9a0b8" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
        <path d="M284 182 Q 292 240 306 276 Q 314 294 304 308" fill="none" stroke="#c9a0b8" strokeWidth="10" strokeLinecap="round" opacity="0.85" />
        <text x="120" y="330" fontSize="12.5" fill="#8a4a6a" fontWeight="700">口腕（包裹食物送入口）</text>
        <line x1="208" y1="322" x2="222" y2="300" stroke="#8a4a6a" strokeWidth="1.4" />
        <circle cx="260" cy="176" r="10" fill="#b07898" stroke="#8a4a6a" strokeWidth="2" />
        <text x="260" y="180" textAnchor="middle" fontSize="10.5" fill="#ffffff" fontWeight="700">口</text>
      </g>
      {/* 触手 + 刺细胞 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${150 + i * 42} 190 Q ${128 + i * 46} 262 ${142 + i * 44} 330`} fill="none" stroke="#8aa7c9" strokeWidth="3" strokeLinecap="round" />
        ))}
        <circle cx="192" cy="272" r="5" fill="#b0483a" />
        <circle cx="276" cy="292" r="5" fill="#b0483a" />
        <text x="392" y="272" fontSize="12.5" fill="#a53030" fontWeight="700">触手上的刺细胞</text>
        <text x="392" y="292" fontSize="12.5" fill="#a53030" fontWeight="700">（射出刺丝麻醉猎物）</text>
        <line x1="388" y1="276" x2="282" y2="290" stroke="#a53030" strokeWidth="1.4" strokeDasharray="4 3" />
      </g>
      {/* 特征 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="700">辐射对称 · 两胚层 · 网状神经——随波逐流的海洋浮游高手</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">水母 · 刺胞动物门（腔肠动物）代表（课外拓展）</text>
    </svg>
  );
}

function PlanarianSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 3)}>
        <path d="M20 310 Q 140 288 260 302 T 500 296 L 500 380 L 20 380 Z" fill="#d8c9a8" stroke="#a5885f" strokeWidth="2.5" />
        <text x="486" y="368" textAnchor="end" fontSize="12.5" fill="#8a7a58">淡水溪流底部（涡虫栖息地）</text>
      </g>
      <g style={dim(active, 0)}>
        <path d="M156 130 Q 240 96 330 112 Q 410 126 398 168 Q 388 204 300 212 Q 200 220 156 172 Q 146 152 156 130 Z" fill="#d8c9a8" stroke="#8a6a3a" strokeWidth="3" />
        {[0, 1].map((i) => (
          <circle key={i} cx={158 + i * 16} cy={122} r="4.5" fill="#13333a" />
        ))}
        <text x="60" y="106" fontSize="13" fill="#5a3a1a" fontWeight="800">眼点（感光）</text>
        <line x1="96" y1="110" x2="154" y2="120" stroke="#5a3a1a" strokeWidth="1.3" />
      </g>
      <g style={dim(active, 1)}>
        <circle cx="230" cy="164" r="6" fill="#8a671b" />
        <text x="200" y="152" fontSize="11" fill="#8a671b" fontWeight="700">口（体腹面中线）</text>
        <path d="M230 168 L 230 196" fill="none" stroke="#c9708a" strokeWidth="5" strokeLinecap="round" />
        <path d="M230 196 L 200 212 M230 196 L 260 212 M230 196 L 230 216" fill="none" stroke="#c9708a" strokeWidth="3.5" strokeLinecap="round" />
        <text x="60" y="230" fontSize="12" fill="#8a4a2a" fontWeight="700">咽（可翻出）· 三分支肠</text>
      </g>
      <g style={dim(active, 2)}>
        <path d="M370 210 Q 420 180 460 152" fill="none" stroke="#7ab86a" strokeWidth="5" strokeLinecap="round" />
        <text x="288" y="130" fontSize="12.5" fill="#4a8a3a" fontWeight="800">再生：切成两段→各长成完整个体</text>
        <text x="288" y="148" fontSize="11" fill="#4a8a3a">干细胞（新胚细胞）分布全身</text>
      </g>
      <g style={dim(active, 4)}>
        <rect x="40" y="300" width="440" height="50" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="320" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">扁形动物门：背腹扁平 · 左右对称 · 三胚层 · 无体腔 · 有口无肛门</text>
        <text x="260" y="342" textAnchor="middle" fontSize="11.5" fill="#a5761d">比腔肠动物（水螅）进步：三胚层 · 两侧对称 · 器官系统开始分化</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">涡虫结构模式图 · 扁形动物门（课外拓展）</text>
    </svg>
  );
}

function AscaridSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 肠道背景 */}
      <g style={dim(active, 3)}>
        <path d="M30 70 Q 150 40 260 70 T 490 78 L 490 330 Q 260 350 30 320 Z" fill="#f2d8c8" stroke="#c98a6a" strokeWidth="3" />
        <text x="478" y="342" textAnchor="end" fontSize="12.5" fill="#a5603a" fontWeight="600">人体小肠（蛔虫寄生部位）</text>
      </g>
      {/* 蛔虫身体（长圆柱盘曲） */}
      <g style={dim(active, 0)}>
        <path d="M70 160 Q 180 96 290 128 Q 400 158 420 220 Q 430 268 350 286 Q 240 306 150 280 Q 62 254 70 160 Z" fill="#e8b8a0" stroke="#a5603a" strokeWidth="3.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${110 + i * 52} ${126 + i * 6} q 30 60 -6 148`} fill="none" stroke="#c9885f" strokeWidth="1.8" />
        ))}
        <path d="M74 150 Q 60 136 70 124 Q 86 114 98 126 Q 100 142 86 152 Z" fill="#d8a088" stroke="#a5603a" strokeWidth="2.4" />
        <text x="30" y="106" fontSize="13" fill="#8a4a2a" fontWeight="800">口（围口唇瓣）</text>
        <line x1="76" y1="112" x2="78" y2="126" stroke="#8a4a2a" strokeWidth="1.4" />
      </g>
      {/* 角质层 */}
      <g style={dim(active, 1)}>
        <path d="M78 148 Q 184 86 292 118" fill="none" stroke="#f8e0d0" strokeWidth="5" strokeLinecap="round" />
        <text x="330" y="102" fontSize="13" fill="#a5483a" fontWeight="700">角质层（体表保护·抵抗消化液）</text>
        <line x1="326" y1="108" x2="286" y2="120" stroke="#a5483a" strokeWidth="1.4" />
      </g>
      {/* 消化管简单 */}
      <g style={dim(active, 2)}>
        <path d="M92 148 Q 200 130 396 224" fill="none" stroke="#8a671b" strokeWidth="6" strokeLinecap="round" />
        <text x="150" y="120" fontSize="13" fill="#8a671b" fontWeight="700">消化管简单（直管·靠吸食宿主营养）</text>
      </g>
      {/* 生殖力强 */}
      <g style={dim(active, 2)}>
        <path d="M150 276 Q 230 296 340 272" fill="none" stroke="#c9538a" strokeWidth="6" strokeLinecap="round" />
        <text x="130" y="316" fontSize="13" fill="#a54868" fontWeight="700">生殖器官发达：每条雌虫日产卵约 20 万枚</text>
      </g>
      {/* 感觉器官退化 */}
      <g style={dim(active, 4)}>
        <text x="300" y="182" fontSize="12.5" fill="#8a5a4a" fontWeight="600">感觉器官退化（寄生生活"省掉"了）</text>
        <line x1="296" y1="186" x2="250" y2="206" stroke="#8a5a4a" strokeWidth="1.3" />
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蛔虫结构模式图 · 线形动物门，人体寄生虫（课外拓展）</text>
    </svg>
  );
}

function GiantPandaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 竹林背景 */}
      <g style={dim(active, 3)}>
        <rect x="0" y="40" width="520" height="340" fill="#e4f0dc" />
        {[40, 110, 420, 480].map((x, i) => (
          <g key={i}>
            <path d={`M${x} 380 L${x} 40`} stroke="#8a9a5a" strokeWidth="8" strokeLinecap="round" />
            <path d={`M${x} 90 l-26 -20 M${x} 140 l24 -18 M${x} 200 l-22 -16`} stroke="#8a9a5a" strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}
        <text x="24" y="70" fontSize="12.5" fill="#5a7a3a" fontWeight="600">高山竹林（大熊猫的家园）</text>
      </g>
      {/* 身体（白色） */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="230" rx="120" ry="88" fill="#ffffff" stroke="#13333a" strokeWidth="4" />
        <circle cx="140" cy="270" r="16" fill="#ffffff" stroke="#13333a" strokeWidth="3" />
      </g>
      {/* 黑色部件 */}
      <g style={dim(active, 1)}>
        <circle cx="176" cy="148" r="26" fill="#13333a" />
        <circle cx="286" cy="144" r="26" fill="#13333a" />
        <ellipse cx="188" cy="184" rx="24" ry="16" fill="#13333a" transform="rotate(-16 188 184)" />
        <ellipse cx="276" cy="182" rx="24" ry="16" fill="#13333a" transform="rotate(14 276 182)" />
        <ellipse cx="168" cy="288" rx="30" ry="38" fill="#13333a" />
        <ellipse cx="330" cy="284" rx="30" ry="38" fill="#13333a" />
      </g>
      {/* 头部五官 */}
      <g style={dim(active, 0)}>
        <circle cx="222" cy="128" r="26" fill="#ffffff" stroke="#13333a" strokeWidth="3" />
        <ellipse cx="212" cy="122" rx="9" ry="13" fill="#13333a" transform="rotate(-14 212 122)" />
        <ellipse cx="232" cy="122" rx="9" ry="13" fill="#13333a" transform="rotate(14 232 122)" />
        <circle cx="215" cy="122" r="3.2" fill="#ffffff" />
        <circle cx="229" cy="122" r="3.2" fill="#ffffff" />
        <ellipse cx="222" cy="142" rx="7" ry="5" fill="#13333a" />
      </g>
      {/* 假拇指与食竹 */}
      <g style={dim(active, 2)}>
        <path d="M368 246 Q 396 232 416 240" fill="none" stroke="#4a8a3a" strokeWidth="8" strokeLinecap="round" />
        <path d="M404 258 Q 402 250 396 246" fill="none" stroke="#13333a" strokeWidth="4" strokeLinecap="round" />
        <text x="252" y="296" fontSize="12.5" fill="#2f5a1e" fontWeight="700">"伪拇指"（腕骨特化·便于握竹）</text>
        <line x1="384" y1="284" x2="396" y2="256" stroke="#2f5a1e" strokeWidth="1.4" />
        <text x="96" y="336" fontSize="12.5" fill="#2f5a1e" fontWeight="700">99% 食物是竹子（肉齿退化·演化成"素食者"）</text>
      </g>
      {/* 保护级别 */}
      <g style={dim(active, 4)}>
        <rect x="310" y="40" width="180" height="44" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="400" y="58" textAnchor="middle" fontSize="11.5" fill="#8a671b" fontWeight="800">国家一级保护动物</text>
        <text x="400" y="76" textAnchor="middle" fontSize="10.5" fill="#a5761d">IUCN：易危（VU）· 受威胁下降</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">大熊猫结构模式图 · 中国特有"活化石"（课外拓展）</text>
    </svg>
  );
}

function AdaptationsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 保护色（左上）：绿色草丛中的蚱蜢 */}
      <g style={dim(active, 0)}>
        <rect x="14" y="20" width="238" height="150" rx="12" fill="#e4f0dc" stroke="#6a9a5a" strokeWidth="2.4" />
        {[40, 90, 140, 190, 220].map((x, i) => (
          <path key={i} d={`M${x} 160 q 6 -44 ${i % 2 === 0 ? -8 : 8} -60`} fill="none" stroke="#8ac98a" strokeWidth="4" strokeLinecap="round" />
        ))}
        <path d="M120 118 q 20 -12 44 2 q -6 14 -26 12 q -16 -2 -18 -14 Z" fill="#8ac98a" stroke="#6a9a4a" strokeWidth="1.8" />
        <path d="M132 110 l10 -8 M140 112 l12 -4" stroke="#5a8a3a" strokeWidth="1.6" strokeLinecap="round" />
        <text x="133" y="48" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="800">保护色（体色与环境一致）</text>
        <text x="133" y="172" textAnchor="middle" fontSize="11.5" fill="#4a8a3a">蚱蜢：草丛中不易被天敌发现</text>
      </g>
      {/* 拟态（右上）：枯叶蝶 */}
      <g style={dim(active, 1)}>
        <rect x="268" y="20" width="238" height="150" rx="12" fill="#f0e8d4" stroke="#b5a582" strokeWidth="2.4" />
        {[60, 130, 200, 260, 330, 420].map((x, i) => (
          <path key={i} d={`M${x} ${130 + (i % 2) * 16} l26 -10 l22 12 l-18 8 Z`} fill="#d8c9a0" stroke="#b5a582" strokeWidth="1.6" />
        ))}
        <path d="M300 108 q 44 -26 92 -4 q -6 26 -44 28 q -42 0 -48 -24 Z" fill="#b5905a" stroke="#8a6a3a" strokeWidth="2" />
        <path d="M318 96 q 30 -10 58 2" fill="none" stroke="#8a6a3a" strokeWidth="1.8" />
        <text x="387" y="48" textAnchor="middle" fontSize="13" fill="#8a6a2a" fontWeight="800">拟态（模样像别的物体）</text>
        <text x="387" y="172" textAnchor="middle" fontSize="11.5" fill="#8a6a2a">枯叶蝶：酷似枯叶骗过天敌</text>
      </g>
      {/* 警戒色（左下）：黄蜂 */}
      <g style={dim(active, 2)}>
        <rect x="14" y="196" width="238" height="150" rx="12" fill="#fdf3cf" stroke="#c9a05a" strokeWidth="2.4" />
        <ellipse cx="130" cy="272" rx="66" ry="26" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.5" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${104 + i * 26} 248 q 10 24 4 48`} fill="none" stroke="#13333a" strokeWidth="8" strokeLinecap="round" />
        ))}
        <circle cx="66" cy="262" r="14" fill="#13333a" />
        <path d="M186 258 l22 -8 m-22 22 l24 -4" stroke="#13333a" strokeWidth="2.4" strokeLinecap="round" />
        <text x="133" y="222" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="800">警戒色（鲜艳+有毒刺）</text>
        <text x="133" y="330" textAnchor="middle" fontSize="11.5" fill="#8a671b">黄蜂：事先警告天敌"别惹我"</text>
      </g>
      {/* 蜜蜂与黄蜂对比（右下） */}
      <g style={dim(active, 3)}>
        <rect x="268" y="196" width="238" height="150" rx="12" fill="#eef4ea" stroke="#4a9a5a" strokeWidth="2.4" />
        <ellipse cx="352" cy="252" rx="46" ry="22" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.2" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${332 + i * 22} 232 q 8 20 2 40`} fill="none" stroke="#13333a" strokeWidth="7" strokeLinecap="round" />
        ))}
        <circle cx="308" cy="246" r="12" fill="#13333a" />
        <text x="387" y="222" textAnchor="middle" fontSize="12.5" fill="#2f7a4d" fontWeight="800">蜜蜂：无刺毒但有"黄黑制服"</text>
        <text x="278" y="292" fontSize="12" fill="#49676d">食蚜蝇模仿蜜蜂的"制服"</text>
        <text x="278" y="310" fontSize="11.5" fill="#49676d">让天敌一并回避（贝茨拟态）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">生物对环境的适应：保护色 · 拟态 · 警戒色（课外拓展）</text>
    </svg>
  );
}

function SilkwormLifeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 环形流程 */}
      <g style={dim(active, 0)}>
        {/* 卵（左上） */}
        <rect x="40" y="60" width="120" height="86" rx="12" fill="#fdf3cf" stroke="#b5953a" strokeWidth="2.5" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <circle key={`${r}-${c}`} cx={62 + c * 30} cy={84 + r * 22} r="7" fill="#c9881d" stroke="#8a671b" strokeWidth="1.6" />
          )),
        )}
        <text x="100" y="52" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="800">卵</text>
        {/* 幼虫（右上） */}
        <rect x="360" y="60" width="120" height="86" rx="12" fill="#eaf2ea" stroke="#4a9a5a" strokeWidth="2.5" />
        <path d="M382 128 q 18 -36 36 -22 q 18 12 38 2" fill="none" stroke="#e8f2ea" strokeWidth="13" strokeLinecap="round" />
        <path d="M382 128 q 18 -36 36 -22 q 18 12 38 2" fill="none" stroke="#c9d8b8" strokeWidth="5" strokeDasharray="4 5" />
        <circle cx="454" cy="102" r="4" fill="#13333a" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${396 + i * 16} 126 l-3 10`} stroke="#4a9a5a" strokeWidth="2" />
        ))}
        <text x="420" y="52" textAnchor="middle" fontSize="13" fill="#2f7a3a" fontWeight="800">幼虫（取食蜕皮）</text>
      </g>
      {/* 蛹（右下） */}
      <rect x="360" y="220" width="120" height="86" rx="12" fill="#f0e4d0" stroke="#b5953a" strokeWidth="2.5" />
      <g style={dim(active, 1)}>
        <ellipse cx="420" cy="266" rx="34" ry="20" fill="#c9a05a" stroke="#8a671b" strokeWidth="2.2" />
        <ellipse cx="420" cy="286" rx="14" ry="8" fill="#b5953a" stroke="#8a671b" strokeWidth="1.8" />
        <text x="420" y="250" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">蛹（不吃不动）</text>
      </g>
      {/* 成虫（左下） */}
      <g style={dim(active, 2)}>
        <rect x="40" y="220" width="120" height="86" rx="12" fill="#f4ece2" stroke="#b5953a" strokeWidth="2.5" />
        <ellipse cx="100" cy="266" rx="26" ry="15" fill="#e8e2d2" stroke="#8a7a4a" strokeWidth="2" />
        <circle cx="100" cy="248" r="7" fill="#d8c8a8" stroke="#8a7a4a" strokeWidth="1.8" />
        <path d="M92 240 q -14 -16 -2 -24 M108 240 q 14 -16 2 -24" fill="none" stroke="#b5953a" strokeWidth="2.4" />
        <path d="M80 262 q -18 4 -26 14 M120 262 q 18 4 26 14" fill="none" stroke="#c9b88a" strokeWidth="3.5" strokeLinecap="round" />
        <text x="100" y="212" textAnchor="middle" fontSize="13" fill="#8a7a4a" fontWeight="800">成虫（蚕蛾）</text>
      </g>
      {/* 箭头环形 */}
      <g style={dim(active, 3)}>
        <path d="M164 96 L356 96" fill="none" stroke="#8a9a9f" strokeWidth="2.6" markerEnd="url(#sl-arrow)" />
        <path d="M420 150 L420 216" fill="none" stroke="#8a9a9f" strokeWidth="2.6" markerEnd="url(#sl-arrow)" />
        <path d="M356 262 L164 262" fill="none" stroke="#8a9a9f" strokeWidth="2.6" markerEnd="url(#sl-arrow)" />
        <path d="M100 216 L100 150" fill="none" stroke="#8a9a9f" strokeWidth="2.6" markerEnd="url(#sl-arrow)" />
        <text x="260" y="88" textAnchor="middle" fontSize="10.5" fill="#59767c" fontWeight="600">孵化</text>
        <text x="444" y="188" fontSize="10.5" fill="#59767c" fontWeight="600">结茧化蛹</text>
        <text x="260" y="254" textAnchor="middle" fontSize="10.5" fill="#59767c" fontWeight="600">破茧羽化</text>
        <text x="124" y="188" fontSize="10.5" fill="#59767c" fontWeight="600">产卵</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">家蚕的完全变态发育 · 卵→幼虫→蛹→成虫（课外拓展）</text>
    </svg>
  );
}

function VertebrateClassesSvg({ active }: { active: number | null; open?: boolean }) {
  const rows = [
    { name: '鱼类', breath: '鳃', repro: '卵生（水中受精）', temp: '变温', icon: '🐟' },
    { name: '两栖类', breath: '幼体鳃·成体肺+皮肤', repro: '卵生（水中受精）', temp: '变温', icon: '🐸' },
    { name: '爬行类', breath: '肺', repro: '羊膜卵（陆上生殖）', temp: '变温', icon: '🦎' },
    { name: '鸟类', breath: '肺+气囊', repro: '羊膜卵（孵卵）', temp: '恒温', icon: '🐦' },
    { name: '哺乳类', breath: '肺', repro: '胎生·哺乳', temp: '恒温', icon: '🐕' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 表头 */}
      <g style={dim(active, 0)}>
        <rect x="16" y="24" width="88" height="34" fill="#13333a" rx="6" />
        <text x="60" y="46" textAnchor="middle" fontSize="12.5" fill="#ffffff" fontWeight="800">类群</text>
        <rect x="108" y="24" width="118" height="34" fill="#2c5a6e" rx="6" />
        <text x="167" y="46" textAnchor="middle" fontSize="12" fill="#ffffff" fontWeight="800">呼吸</text>
        <rect x="230" y="24" width="168" height="34" fill="#2c6e5a" rx="6" />
        <text x="314" y="46" textAnchor="middle" fontSize="12" fill="#ffffff" fontWeight="800">生殖发育</text>
        <rect x="402" y="24" width="102" height="34" fill="#8a5a2a" rx="6" />
        <text x="453" y="46" textAnchor="middle" fontSize="12" fill="#ffffff" fontWeight="800">体温</text>
      </g>
      {/* 行 */}
      {rows.map((r, i) => {
        const y = 66 + i * 58;
        const bg = i % 2 === 0 ? '#f4faf9' : '#ffffff';
        return (
          <g key={r.name} style={dim(active, i + 1)}>
            <rect x="16" y={y} width="488" height="50" fill={bg} stroke="#c6d4d4" strokeWidth="1.8" />
            <text x="34" y={y + 31} fontSize="16">{r.icon}</text>
            <text x="66" y={y + 31} fontSize="13.5" fill="#13333a" fontWeight="800">{r.name}</text>
            <text x="116" y={y + 31} fontSize="11.5" fill="#2c5a6e">{r.breath}</text>
            <text x="238" y={y + 31} fontSize="11.5" fill="#2c6e5a">{r.repro}</text>
            <text x="412" y={y + 31} fontSize="12" fill={r.temp === '恒温' ? '#b0483a' : '#59767c'} fontWeight={r.temp === '恒温' ? '800' : '400'}>
              {r.temp}
            </text>
          </g>
        );
      })}
      {/* 结论 */}
      <g style={dim(active, 0)}>
        <text x="36" y="372" fontSize="12.5" fill="#b0483a" fontWeight="700">进化趋势：水生→陆生，卵生→胎生，变温→恒温（更适应陆地）</text>
      </g>
    </svg>
  );
}

function WhaleSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 海水 */}
      <g style={dim(active, 4)}>
        <rect x="0" y="60" width="520" height="320" fill="#b8d4ea" />
        <path d="M0 60 Q 60 52 120 60 T 240 60 T 360 60 T 480 60 T 520 60" fill="none" stroke="#8ab8d8" strokeWidth="3" />
        <text x="490" y="86" textAnchor="end" fontSize="12.5" fill="#2c5a84" fontWeight="600">海洋（用肺呼吸·需浮出换气）</text>
      </g>
      {/* 鲸身体 */}
      <g style={dim(active, 0)}>
        <path d="M76 190 Q 120 128 220 128 Q 330 128 386 186 Q 402 206 386 224 Q 330 276 220 272 Q 120 268 76 200 Q 70 194 76 190 Z" fill="#5a7a9a" stroke="#2c5a84" strokeWidth="3" />
        {/* 腹部浅色 */}
        <path d="M92 218 Q 180 262 340 240 Q 330 260 240 264 Q 150 262 92 218 Z" fill="#c8d8e8" stroke="#8aa7c9" strokeWidth="1.6" />
        {/* 背鳍 */}
        <path d="M232 130 L 250 96 L 272 130 Z" fill="#4a6a8a" stroke="#2c5a84" strokeWidth="2.2" />
        {/* 尾鳍 */}
        <path d="M386 186 Q 428 156 462 142 L 448 186 Q 462 186 478 196 Q 462 234 424 244 Q 402 240 386 224 Z" fill="#5a7a9a" stroke="#2c5a84" strokeWidth="2.5" />
        <text x="372" y="124" fontSize="12.5" fill="#2c5a84" fontWeight="700">尾鳍（水平·上下摆动）</text>
      </g>
      {/* 头部细节 */}
      <g style={dim(active, 1)}>
        <circle cx="112" cy="168" r="6" fill="#13333a" />
        <path d="M78 178 Q 92 172 106 178" fill="none" stroke="#2c5a84" strokeWidth="2.4" />
        <text x="42" y="176" fontSize="12.5" fill="#1e4a68" fontWeight="700">喷气孔（浮出换气）</text>
        <line x1="78" y1="170" x2="84" y2="176" stroke="#1e4a68" strokeWidth="1.4" />
      </g>
      {/* 鳍肢 */}
      <g style={dim(active, 2)}>
        <path d="M196 246 Q 210 284 246 292 Q 224 306 192 292 Q 176 268 196 246 Z" fill="#4a6a8a" stroke="#2c5a84" strokeWidth="2.2" />
        <text x="176" y="322" fontSize="12.5" fill="#1e4a68" fontWeight="700">鳍肢（五指骨骼的变形·平衡转向）</text>
      </g>
      {/* 哺乳动物证据 */}
      <g style={dim(active, 3)}>
        <text x="30" y="96" fontSize="12.5" fill="#1e4a68" fontWeight="700">肺呼吸（不是鳃）</text>
        <text x="30" y="114" fontSize="12.5" fill="#1e4a68" fontWeight="700">胎生 · 哺乳</text>
        <text x="30" y="132" fontSize="12.5" fill="#1e4a68" fontWeight="700">恒温 → 是哺乳动物不是鱼</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">鲸结构模式图 · 适应水生的哺乳动物（课外拓展）</text>
    </svg>
  );
}

function RumenSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 瘤胃（最大） */}
      <g style={dim(active, 0)}>
        <path d="M120 120 Q 96 190 140 250 Q 190 306 268 288 Q 320 272 318 216 Q 314 152 250 122 Q 184 98 120 120 Z" fill="#d8b88a" stroke="#8a6a3a" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${150 + i * 44} ${142 + i * 14} q 30 44 10 96`} fill="none" stroke="#a5885f" strokeWidth="2.2" />
        ))}
        <text x="60" y="104" fontSize="13.5" fill="#8a6a3a" fontWeight="800">瘤胃（最大的一室）</text>
        <text x="60" y="122" fontSize="12.5" fill="#8a6a3a">微生物发酵纤维（"反刍仓库"）</text>
      </g>
      {/* 网胃 */}
      <g style={dim(active, 1)}>
        <path d="M120 122 Q 116 92 152 82 Q 190 72 212 94 Q 216 104 208 116 Q 170 100 134 118 Z" fill="#c9a882" stroke="#8a6a3a" strokeWidth="2.5" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${136 + i * 22} ${84 + i * 4} q 8 10 2 20 M${152 + i * 20} ${80 + i * 5} q 8 10 2 20`} fill="none" stroke="#8a6a3a" strokeWidth="1.6" />
        ))}
        <text x="120" y="58" fontSize="13" fill="#8a6a3a" fontWeight="700">网胃（蜂窝状·过滤异物）</text>
      </g>
      {/* 瓣胃 */}
      <g style={dim(active, 2)}>
        <path d="M318 216 Q 356 208 382 224 Q 396 240 384 260 Q 364 278 330 272 Q 314 264 314 244 Q 314 228 318 216 Z" fill="#e8d8b8" stroke="#8a6a3a" strokeWidth="2.5" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${328 + i * 16} ${222 + i * 6} l6 40`} stroke="#8a6a3a" strokeWidth="1.8" />
        ))}
        <text x="292" y="312" fontSize="13" fill="#8a6a3a" fontWeight="700">瓣胃（叶片状·吸水）</text>
        <line x1="316" y1="304" x2="344" y2="272" stroke="#8a6a3a" strokeWidth="1.4" />
      </g>
      {/* 皱胃 */}
      <g style={dim(active, 3)}>
        <path d="M330 272 Q 316 302 340 322 Q 372 338 402 318 Q 414 300 402 286 Q 372 296 344 280 Z" fill="#f4c76a" stroke="#b5953a" strokeWidth="2.5" />
        <text x="508" y="352" textAnchor="end" fontSize="13" fill="#a5761d" fontWeight="700">皱胃（分泌胃液·真正消化）</text>
      </g>
      {/* 返回口中示意 */}
      <g style={dim(active, 0)}>
        <path d="M150 118 Q 160 66 210 50" fill="none" stroke="#b0483a" strokeWidth="3" strokeDasharray="7 5" markerEnd="url(#ru-arrow)" />
        <text x="180" y="42" fontSize="12.5" fill="#b0483a" fontWeight="700">半消化的食物返回口中细嚼（反刍）</text>
      </g>
      <defs>
        <marker id="ru-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#b0483a" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">牛胃（反刍胃）结构模式图 · 四室协作（课外拓展）</text>
    </svg>
  );
}

function SpongeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 海底 */}
      <g style={dim(active, 4)}>
        <path d="M20 310 Q 140 292 260 306 T 500 302 L 500 380 L 20 380 Z" fill="#d8ccb8" stroke="#a5987a" strokeWidth="2.5" />
        <text x="486" y="368" textAnchor="end" fontSize="12.5" fill="#8a7a58">海底岩石（海绵固着生活）</text>
      </g>
      {/* 海绵瓶状体 */}
      <g style={dim(active, 0)}>
        <path d="M170 118 Q 148 240 190 300 Q 250 322 310 300 Q 352 240 330 118 Q 250 96 170 118 Z" fill="#c8b8d8" stroke="#7a4a8a" strokeWidth="3.5" />
        {/* 顶端出水孔 */}
        <ellipse cx="250" cy="116" rx="34" ry="14" fill="#6a3a7a" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="330" y="88" fontSize="13" fill="#6a3a7a" fontWeight="700">出水孔（水流出口）</text>
        <line x1="326" y1="94" x2="286" y2="112" stroke="#6a3a7a" strokeWidth="1.4" />
      </g>
      {/* 体壁孔道 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${172} ${150 + i * 32} l-22 -6 M${172} ${150 + i * 32} l-24 8`} fill="none" stroke="#5a8ac9" strokeWidth="2.6" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={`r${i}`} d={`M328 ${150 + i * 32} l22 -6 M328 ${150 + i * 32} l24 8`} fill="none" stroke="#5a8ac9" strokeWidth="2.6" />
        ))}
        <text x="34" y="140" fontSize="13" fill="#3d6a94" fontWeight="700">入水小孔（遍布体表）</text>
        <text x="34" y="158" fontSize="12.5" fill="#3d6a94">水携食物和氧气进入</text>
        <line x1="130" y1="148" x2="168" y2="168" stroke="#3d6a94" strokeWidth="1.4" />
      </g>
      {/* 领细胞 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <circle cx={216 + i * 24} cy={200 + (i % 2) * 40} r="8" fill="#f4d06a" stroke="#b5953a" strokeWidth="1.8" />
            <path d={`M${216 + i * 24} ${192 + (i % 2) * 40} l0 -10`} stroke="#b5953a" strokeWidth="1.8" />
          </g>
        ))}
        <text x="60" y="212" fontSize="13" fill="#8a671b" fontWeight="700">领细胞（鞭毛摆动）</text>
        <text x="60" y="230" fontSize="12.5" fill="#8a671b">形成水流·滤取食物</text>
        <line x1="150" y1="216" x2="210" y2="222" stroke="#8a671b" strokeWidth="1.4" />
      </g>
      {/* 骨针 */}
      <g style={dim(active, 3)}>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${200 + i * 34} ${250 + (i % 2) * 20} l16 -8 m-8 12 l12 2 m-14 -16 l-2 -12`} stroke="#e8e2d8" strokeWidth="2.4" />
        ))}
        <text x="340" y="240" fontSize="13" fill="#6a6a8a" fontWeight="700">骨针（钙质/硅质"骨架"）</text>
        <line x1="336" y1="244" x2="300" y2="258" stroke="#6a6a8a" strokeWidth="1.4" />
      </g>
      {/* 无消化腔提示 */}
      <g style={dim(active, 2)}>
        <text x="180" y="168" fontSize="12.5" fill="#49676d" fontWeight="600">中央腔</text>
        <text x="108" y="86" fontSize="12.5" fill="#49676d" fontWeight="600">没有消化腔与神经系统——</text>
        <text x="108" y="104" fontSize="12.5" fill="#49676d" fontWeight="600">细胞内消化，是最原始的多细胞动物</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">海绵（多孔动物）结构模式图 · 固着滤食（课外拓展）</text>
    </svg>
  );
}

function StarfishSvg({ active }: { active: number | null; open?: boolean }) {
  // 五条腕的角度
  const arms = [-90, -18, 54, 126, 198];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 海底 */}
      <g style={dim(active, 4)}>
        <path d="M20 300 Q 130 278 260 296 T 500 290 L 500 380 L 20 380 Z" fill="#d8ccb8" stroke="#a5987a" strokeWidth="2.5" />
        <text x="486" y="368" textAnchor="end" fontSize="12.5" fill="#8a7a58">海底沙石</text>
      </g>
      {/* 五条腕 */}
      <g style={dim(active, 0)}>
        {arms.map((ang, i) => (
          <g key={i} transform={`rotate(${ang} 260 200)`}>
            <path d="M238 176 Q 246 96 260 56 Q 274 96 282 176 Q 260 190 238 176 Z" fill="#e8a06a" stroke="#b5603a" strokeWidth="3" />
            {[0, 1, 2].map((j) => (
              <path key={j} d={`M${248 - j * 3} ${130 + j * 22} L${272 + j * 3} ${130 + j * 22}`} stroke="#b5603a" strokeWidth="1.8" />
            ))}
          </g>
        ))}
      </g>
      {/* 中央盘 */}
      <g style={dim(active, 0)}>
        <circle cx="260" cy="200" r="52" fill="#f0b878" stroke="#b5603a" strokeWidth="3" />
        {[0, 1, 2, 3, 4].map((i) => {
          const ang = (-90 + i * 72) * (Math.PI / 180);
          return <circle key={i} cx={260 + Math.cos(ang) * 38} cy={200 + Math.sin(ang) * 38} r="5" fill="#d88a4a" stroke="#b5603a" strokeWidth="1.6" />;
        })}
        <text x="260" y="206" textAnchor="middle" fontSize="12" fill="#7a3a1a" fontWeight="800">中央盘</text>
      </g>
      {/* 口与腕上眼点 */}
      <g style={dim(active, 3)}>
        <circle cx="260" cy="228" r="9" fill="#8a3a2a" stroke="#5a2a1a" strokeWidth="2" />
        <text x="120" y="238" fontSize="13" fill="#5a2a1a" fontWeight="700">口（腹面中央）</text>
        <line x1="176" y1="234" x2="250" y2="228" stroke="#5a2a1a" strokeWidth="1.4" />
      </g>
      {/* 管足 */}
      <g style={dim(active, 2)}>
        {arms.map((ang, i) => (
          <g key={i} transform={`rotate(${ang} 260 200)`}>
            <path d="M250 74 L244 48 M260 72 L260 44 M270 74 L276 48" stroke="#4a9a9a" strokeWidth="3" strokeLinecap="round" />
            <circle cx="260" cy="42" r="4" fill="#a8d8d4" stroke="#4a9a9a" strokeWidth="1.6" />
          </g>
        ))}
        <text x="384" y="52" fontSize="13" fill="#2f7a6a" fontWeight="700">管足（水管系统驱动）</text>
        <text x="396" y="70" fontSize="12.5" fill="#2f7a6a">吸盘式缓慢爬行与捕食</text>
        <line x1="380" y1="58" x2="366" y2="66" stroke="#2f7a6a" strokeWidth="1.4" />
      </g>
      {/* 棘刺外骨骼 */}
      <g style={dim(active, 1)}>
        <circle cx="260" cy="156" r="4.5" fill="#b5603a" />
        <circle cx="286" cy="168" r="4.5" fill="#b5603a" />
        <circle cx="232" cy="170" r="4.5" fill="#b5603a" />
        <circle cx="300" cy="196" r="4.5" fill="#b5603a" />
        <circle cx="222" cy="200" r="4.5" fill="#b5603a" />
        <text x="376" y="200" fontSize="13" fill="#8a3a2a" fontWeight="700">棘刺（内骨骼突出）</text>
        <line x1="372" y1="204" x2="306" y2="198" stroke="#8a3a2a" strokeWidth="1.4" />
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">海星结构模式图 · 棘皮动物门（课外拓展）</text>
    </svg>
  );
}

function LizardSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 岩石背景 */}
      <g style={dim(active, 4)}>
        <path d="M20 330 L180 296 L340 322 L500 300 L500 380 L20 380 Z" fill="#d8ccb8" stroke="#a5987a" strokeWidth="2.5" />
        <text x="486" y="368" textAnchor="end" fontSize="12.5" fill="#8a7a58">岩石（变温动物需晒太阳取暖）</text>
      </g>
      {/* 蜥蜴身体 */}
      <g style={dim(active, 0)}>
        {/* 头 */}
        <path d="M64 214 L124 196 Q 140 202 138 216 L 126 238 Q 96 240 66 230 Q 58 222 64 214 Z" fill="#8aa85a" stroke="#4a7a3a" strokeWidth="3" />
        <circle cx="88" cy="216" r="5" fill="#13333a" />
        <text x="30" y="186" fontSize="13" fill="#3f6a2f" fontWeight="700">头部（口内方齿）</text>
        <line x1="86" y1="192" x2="90" y2="206" stroke="#3f6a2f" strokeWidth="1.4" />
        {/* 颈与躯干 */}
        <path d="M126 238 Q 170 260 232 254 Q 296 248 330 226 L 348 258 Q 300 292 226 292 Q 156 292 118 254 Q 112 244 126 238 Z" fill="#9ab86a" stroke="#4a7a3a" strokeWidth="3" />
        {/* 鳞片 */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${168 + i * 28} 254 q 8 10 18 2`} fill="none" stroke="#4a7a3a" strokeWidth="1.8" />
        ))}
        <text x="188" y="318" textAnchor="middle" fontSize="13" fill="#3f6a2f" fontWeight="700">躯干覆角质鳞片（防水分散失）</text>
      </g>
      {/* 四肢与爪 */}
      <g style={dim(active, 1)}>
        <path d="M150 262 Q 136 296 110 314 L 96 310" fill="none" stroke="#6a8a4a" strokeWidth="9" strokeLinecap="round" />
        <path d="M96 310 l-10 6 M96 310 l-2 12 M96 310 l8 8" stroke="#4a7a3a" strokeWidth="3" strokeLinecap="round" />
        <path d="M300 282 Q 316 310 342 322" fill="none" stroke="#6a8a4a" strokeWidth="9" strokeLinecap="round" />
        <path d="M342 322 l12 -2 M342 322 l4 10 M342 322 l-4 10" stroke="#4a7a3a" strokeWidth="3" strokeLinecap="round" />
        <path d="M310 236 Q 336 218 366 220" fill="none" stroke="#6a8a4a" strokeWidth="8" strokeLinecap="round" />
        <path d="M366 220 l10 -8 M366 220 l12 0 M366 220 l8 10" stroke="#4a7a3a" strokeWidth="2.6" strokeLinecap="round" />
        <text x="356" y="196" fontSize="12.5" fill="#3f6a2f" fontWeight="600">四肢带爪（贴地爬行）</text>
        <line x1="380" y1="202" x2="368" y2="216" stroke="#3f6a2f" strokeWidth="1.4" />
      </g>
      {/* 断尾再生提示 */}
      <g style={dim(active, 3)}>
        <path d="M344 244 Q 396 252 452 238 Q 474 232 484 218" fill="none" stroke="#8aa85a" strokeWidth="14" strokeLinecap="round" />
        <path d="M400 246 L398 268" stroke="#4a7a3a" strokeWidth="1.6" strokeDasharray="4 3" />
        <text x="356" y="176" fontSize="13" fill="#3f6a2f" fontWeight="700">长尾（遇险可断尾再生）</text>
        <line x1="400" y1="182" x2="404" y2="238" stroke="#3f6a2f" strokeWidth="1.4" />
      </g>
      {/* 肺呼吸提示 */}
      <g style={dim(active, 2)}>
        <text x="60" y="252" fontSize="12.5" fill="#49676d" fontWeight="600">体内容器化肺（完全陆生呼吸）</text>
        <text x="60" y="270" fontSize="12.5" fill="#49676d" fontWeight="600">体内受精 · 产羊膜卵</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">蜥蜴结构模式图 · 爬行动物真正适应陆地生活</text>
    </svg>
  );
}

function ShrimpSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 腹部（分节）+ 尾扇 */}
      <g style={dim(active, 1)}>
        <path d="M330 168 Q 380 158 424 172 Q 452 184 444 210 Q 430 244 384 250 Q 350 254 330 240 Z" fill="#e88a6a" stroke="#a5533c" strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${352 + i * 26} 164 Q ${358 + i * 26} 208 ${346 + i * 26} 246`} fill="none" stroke="#a5533c" strokeWidth="2.2" />
        ))}
        <path d="M444 196 L492 172 L486 200 L496 214 L480 226 L488 244 L440 234 Z" fill="#e8705a" stroke="#a5533c" strokeWidth="2.5" />
        <text x="360" y="304" fontSize="13" fill="#a5533c" fontWeight="700">分节腹部 + 尾扇</text>
        <text x="360" y="322" fontSize="12.5" fill="#a5533c">拨水后退逃生</text>
      </g>
      {/* 游泳足 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${344 + i * 26} 248 Q ${340 + i * 26} 268 ${322 + i * 26} 274`} fill="none" stroke="#a5533c" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="244" y="292" fontSize="12.5" fill="#a5533c" fontWeight="600">游泳足 5 对（辅助游泳）</text>
      </g>
      {/* 头胸部 */}
      <g style={dim(active, 0)}>
        <path d="M120 130 Q 220 96 330 152 Q 340 188 330 240 Q 240 268 148 236 Q 108 200 120 130 Z" fill="#f09a78" stroke="#a5533c" strokeWidth="3" />
        {/* 额剑 */}
        <path d="M126 138 L48 116 L124 156 Z" fill="#e88a6a" stroke="#a5533c" strokeWidth="2.5" />
        <text x="30" y="100" fontSize="12.5" fill="#a5533c" fontWeight="700">额剑（防御）</text>
        {/* 复眼 */}
        <circle cx="146" cy="146" r="10" fill="#3a3a3a" stroke="#13333a" strokeWidth="2" />
        <circle cx="143" cy="143" r="3" fill="#c8d8e8" />
        <text x="60" y="176" fontSize="13" fill="#4a5a6a" fontWeight="700">复眼（有柄）</text>
        <line x1="112" y1="172" x2="138" y2="156" stroke="#4a5a6a" strokeWidth="1.4" />
        <text x="196" y="120" fontSize="13.5" fill="#a5533c" fontWeight="700">头胸部（外骨骼·头胸甲）</text>
      </g>
      {/* 触须 */}
      <g style={dim(active, 4)}>
        <path d="M118 128 Q 70 88 24 78" fill="none" stroke="#a5533c" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M118 148 Q 60 148 18 128" fill="none" stroke="#c97a5a" strokeWidth="3" strokeLinecap="round" />
        <text x="20" y="60" fontSize="13" fill="#a5533c" fontWeight="700">触须 2 对（触觉嗅觉）</text>
        <line x1="66" y1="66" x2="96" y2="92" stroke="#a5533c" strokeWidth="1.4" />
      </g>
      {/* 步足 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${150 + i * 26} 236 Q ${144 + i * 26} 274 ${120 + i * 26} 292`} fill="none" stroke="#a5533c" strokeWidth="4.5" strokeLinecap="round" />
        ))}
        <text x="60" y="322" fontSize="13" fill="#a5533c" fontWeight="700">步足 5 对（爬行·前 2 对螯状捕食）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">沼虾结构模式图 · 节肢动物门甲壳纲（课外拓展）</text>
    </svg>
  );
}

function BirdEggSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 卵壳（外壳轮廓） */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="200" rx="196" ry="136" fill="#f4ecda" stroke="#b5a582" strokeWidth="4" />
        <text x="36" y="96" fontSize="13" fill="#8a7a4a" fontWeight="700">卵壳（坚硬·保护）</text>
        <line x1="102" y1="102" x2="130" y2="118" stroke="#8a7a4a" strokeWidth="1.4" />
        <text x="468" y="96" textAnchor="end" fontSize="13" fill="#8a7a4a" fontWeight="700">卵壳膜</text>
        <line x1="452" y1="102" x2="420" y2="112" stroke="#8a7a4a" strokeWidth="1.4" />
      </g>
      {/* 气室（钝端） */}
      <g style={dim(active, 1)}>
        <path d="M318 92 Q 352 78 388 92 Q 380 106 352 108 Q 326 106 318 92 Z" fill="#d8e4e8" stroke="#6a8a9a" strokeWidth="2.5" />
        <text x="402" y="130" fontSize="13" fill="#4a6a7a" fontWeight="700">气室（供胚胎呼吸）</text>
        <line x1="398" y1="124" x2="376" y2="108" stroke="#4a6a7a" strokeWidth="1.4" />
      </g>
      {/* 卵白 */}
      <g style={dim(active, 2)}>
        <ellipse cx="250" cy="200" rx="178" ry="118" fill="#f8faf6" stroke="#c6d4c2" strokeWidth="2.5" />
        <text x="60" y="308" fontSize="13" fill="#6a8a6a" fontWeight="700">卵白（保护·供给水分营养）</text>
        <line x1="140" y1="296" x2="180" y2="272" stroke="#6a8a6a" strokeWidth="1.4" />
      </g>
      {/* 系带 */}
      <g style={dim(active, 3)}>
        <path d="M96 210 Q 130 196 156 212 Q 168 220 182 216" fill="none" stroke="#c9a882" strokeWidth="4" strokeLinecap="round" />
        <path d="M404 210 Q 370 196 344 212 Q 332 220 318 216" fill="none" stroke="#c9a882" strokeWidth="4" strokeLinecap="round" />
        <text x="42" y="176" fontSize="13" fill="#8a6242" fontWeight="700">系带（固定卵黄）</text>
        <line x1="110" y1="184" x2="150" y2="204" stroke="#8a6242" strokeWidth="1.4" />
      </g>
      {/* 卵黄 + 卵黄膜 */}
      <g style={dim(active, 4)}>
        <circle cx="250" cy="216" r="84" fill="#f4c76a" stroke="#c9881d" strokeWidth="3" />
        <circle cx="250" cy="216" r="70" fill="#f0b845" stroke="#c9881d" strokeWidth="1.6" strokeDasharray="5 4" />
        <text x="250" y="330" textAnchor="middle" fontSize="13" fill="#a5761d" fontWeight="700">卵黄（主要营养来源）</text>
        <line x1="250" y1="318" x2="250" y2="302" stroke="#a5761d" strokeWidth="1.4" />
      </g>
      {/* 胚盘 */}
      <g style={dim(active, 5)}>
        <ellipse cx="238" cy="176" rx="20" ry="13" fill="#fdf6e3" stroke="#b0483a" strokeWidth="2.5" />
        <text x="120" y="128" fontSize="13" fill="#b0483a" fontWeight="700">胚盘（内有细胞核，</text>
        <text x="120" y="146" fontSize="13" fill="#b0483a" fontWeight="700">胚胎发育的部位）</text>
        <line x1="176" y1="142" x2="220" y2="168" stroke="#b0483a" strokeWidth="1.4" />
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">鸟卵结构模式图 · 卵壳气室卵白保护，卵黄供养，胚盘发育</text>
    </svg>
  );
}

function HydraSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 基盘 */}
      <g style={dim(active, 4)}>
        <path d="M204 318 Q 250 302 296 318 Q 250 332 204 318 Z" fill="#c9a882" stroke="#8a7a58" strokeWidth="2.5" />
        <text x="352" y="330" fontSize="13" fill="#8a6242" fontWeight="700">基盘（附着在水草上）</text>
        <line x1="348" y1="326" x2="298" y2="320" stroke="#8a6242" strokeWidth="1.4" />
      </g>
      {/* 身体（圆柱） */}
      <g style={dim(active, 1)}>
        <path d="M226 96 Q 210 200 228 316 L272 316 Q 290 200 274 96 Q 250 84 226 96 Z" fill="#c8e2d8" stroke="#4a9a8a" strokeWidth="3" />
        {/* 消化腔 */}
        <path d="M244 116 Q 236 200 246 300 L256 300 Q 264 200 256 116 Q 250 112 244 116 Z" fill="#a8cfbe" stroke="#4a9a8a" strokeWidth="1.6" />
        <text x="368" y="212" fontSize="13" fill="#2f7a6a" fontWeight="700">消化循环腔</text>
        <text x="368" y="230" fontSize="12.5" fill="#2f7a6a">消化后的养分扩散全身</text>
        <line x1="364" y1="218" x2="258" y2="210" stroke="#2f7a6a" strokeWidth="1.4" />
      </g>
      {/* 触手 */}
      <g style={dim(active, 0)}>
        <path d="M244 100 Q 180 60 128 52" fill="none" stroke="#4a9a8a" strokeWidth="6" strokeLinecap="round" />
        <path d="M250 94 Q 214 40 176 26" fill="none" stroke="#4a9a8a" strokeWidth="6" strokeLinecap="round" />
        <path d="M256 92 Q 256 34 246 16" fill="none" stroke="#4a9a8a" strokeWidth="6" strokeLinecap="round" />
        <path d="M262 94 Q 298 42 330 28" fill="none" stroke="#4a9a8a" strokeWidth="6" strokeLinecap="round" />
        <path d="M258 100 Q 326 62 384 56" fill="none" stroke="#4a9a8a" strokeWidth="6" strokeLinecap="round" />
        <text x="30" y="42" fontSize="13" fill="#2f7a6a" fontWeight="700">触手（5~12 条）</text>
        <text x="30" y="60" fontSize="12.5" fill="#2f7a6a">捕捉小型水生动物</text>
      </g>
      {/* 刺细胞 */}
      <g style={dim(active, 2)}>
        <circle cx="176" cy="40" r="7" fill="#f4d06a" stroke="#b5953a" strokeWidth="2" />
        <path d="M176 33 L172 18 M180 34 L186 20" stroke="#b5953a" strokeWidth="2" />
        <circle cx="330" cy="38" r="7" fill="#f4d06a" stroke="#b5953a" strokeWidth="2" />
        <path d="M334 32 L340 20 M330 31 L328 16" stroke="#b5953a" strokeWidth="2" />
        <text x="368" y="58" fontSize="13" fill="#8a671b" fontWeight="700">刺细胞（外胚层）</text>
        <text x="368" y="76" fontSize="12.5" fill="#8a671b">射出刺丝麻醉猎物</text>
        <line x1="364" y1="60" x2="340" y2="46" stroke="#8a671b" strokeWidth="1.4" />
      </g>
      {/* 口 */}
      <g style={dim(active, 3)}>
        <ellipse cx="250" cy="92" rx="16" ry="7" fill="#8a5a5a" stroke="#5a3a3a" strokeWidth="2" />
        <text x="150" y="94" fontSize="13" fill="#5a3a3a" fontWeight="700">口（捕食与排渣共用）</text>
        <line x1="212" y1="92" x2="232" y2="92" stroke="#5a3a3a" strokeWidth="1.4" />
      </g>
      {/* 芽体（出芽生殖） */}
      <g style={dim(active, 5)}>
        <path d="M272 214 Q 306 202 316 224 Q 322 244 296 252 Q 274 246 272 224 Z" fill="#a8cfbe" stroke="#4a9a8a" strokeWidth="2.5" />
        <path d="M312 216 Q 328 202 340 200" fill="none" stroke="#4a9a8a" strokeWidth="3.5" strokeLinecap="round" />
        <text x="330" y="272" fontSize="13" fill="#2f7a6a" fontWeight="700">芽体（出芽生殖）</text>
        <text x="330" y="290" fontSize="12.5" fill="#2f7a6a">脱落后长成新个体</text>
        <line x1="326" y1="262" x2="306" y2="248" stroke="#2f7a6a" strokeWidth="1.4" />
      </g>
      {/* 外胚层/内胚层提示 */}
      <g style={dim(active, 2)}>
        <text x="60" y="168" fontSize="12.5" fill="#49676d" fontWeight="600">体壁 = 外胚层 +</text>
        <text x="60" y="186" fontSize="12.5" fill="#49676d">内胚层（两胚层动物）</text>
        <line x1="170" y1="176" x2="228" y2="182" stroke="#49676d" strokeWidth="1.4" />
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">水螅结构模式图 · 淡水刺胞动物（课外拓展）</text>
    </svg>
  );
}

function BivalveMusselSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 水底 */}
      <g style={dim(active, 5)}>
        <path d="M0 330 Q 130 310 260 326 T 520 322 L520 380 L0 380 Z" fill="#d9e8dc" />
        <text x="468" y="368" textAnchor="end" fontSize="12.5" fill="#7a948a">水底泥沙</text>
      </g>
      {/* 下壳 */}
      <g style={dim(active, 0)}>
        <path d="M105 262 Q 250 348 395 262 Q 250 312 105 262 Z" fill="#c8b89a" stroke="#8a7a58" strokeWidth="3" />
        <path d="M130 268 Q 250 336 372 268" fill="none" stroke="#a5967a" strokeWidth="2" strokeDasharray="7 5" />
      </g>
      {/* 软体部：外套膜 + 鳃 + 斧足 + 闭壳肌 */}
      <g style={dim(active, 1)}>
        <ellipse cx="250" cy="248" rx="138" ry="42" fill="#f0dfc8" stroke="#c9a882" strokeWidth="3" />
      </g>
      <g style={dim(active, 2)}>
        <path d="M150 252 Q 250 224 350 252" fill="none" stroke="#d8a8a0" strokeWidth="9" strokeLinecap="round" />
        <path d="M152 262 Q 250 236 348 262" fill="none" stroke="#d8a8a0" strokeWidth="9" strokeLinecap="round" />
        <text x="300" y="182" fontSize="13" fill="#a5605a" fontWeight="700">鳃（呼吸）</text>
        <line x1="318" y1="188" x2="308" y2="240" stroke="#a5605a" strokeWidth="1.4" />
      </g>
      <g style={dim(active, 3)}>
        <path d="M238 246 Q 180 224 138 234 Q 168 258 238 262 Z" fill="#e8c9a8" stroke="#b58a5f" strokeWidth="3" />
        <text x="28" y="192" fontSize="13.5" fill="#8a6242" fontWeight="700">斧足（掘沙运动）</text>
        <line x1="112" y1="198" x2="160" y2="232" stroke="#8a6242" strokeWidth="1.4" />
      </g>
      {/* 闭壳肌与水管 */}
      <g style={dim(active, 0)}>
        <circle cx="352" cy="248" r="10" fill="#c9a882" stroke="#8a7a58" strokeWidth="2" />
        <text x="398" y="282" fontSize="12.5" fill="#7a6a4a">闭壳肌</text>
      </g>
      <g style={dim(active, 4)}>
        <path d="M386 232 L414 224 L414 240 Z" fill="#d8b890" stroke="#8a7a58" strokeWidth="2" />
        <path d="M386 252 L416 258 L414 272 Z" fill="#d8b890" stroke="#8a7a58" strokeWidth="2" />
        <text x="398" y="180" fontSize="12.5" fill="#7a6a4a" fontWeight="600">出水孔</text>
        <text x="398" y="308" fontSize="12.5" fill="#7a6a4a" fontWeight="600">入水孔</text>
        <line x1="408" y1="188" x2="404" y2="222" stroke="#7a6a4a" strokeWidth="1.4" />
        <line x1="408" y1="296" x2="406" y2="272" stroke="#7a6a4a" strokeWidth="1.4" />
        {/* 水流方向箭头 */}
        <path d="M448 214 Q 442 232 420 246" fill="none" stroke="#3d7e9e" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#bm-arrow)" />
        <path d="M420 268 Q 444 282 450 298" fill="none" stroke="#3d7e9e" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#bm-arrow)" />
      </g>
      {/* 上壳（掀开） */}
      <g style={dim(active, 0)}>
        <path d="M105 258 Q 250 128 395 258 Q 250 196 105 258 Z" fill="#dccdb0" stroke="#8a7a58" strokeWidth="3" />
        <text x="30" y="352" fontSize="13" fill="#7a6a4a" fontWeight="600">贝壳（保护柔软身体）</text>
        <line x1="150" y1="344" x2="212" y2="318" stroke="#7a6a4a" strokeWidth="1.4" />
        <text x="360" y="346" fontSize="12.5" fill="#a5605a" fontWeight="600">外套膜（分泌珍珠质）</text>
        <line x1="392" y1="336" x2="332" y2="284" stroke="#a5605a" strokeWidth="1.4" />
      </g>
      <defs>
        <marker id="bm-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#3d7e9e" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">河蚌结构模式图（水流：入水孔 → 鳃 → 出水孔）</text>
    </svg>
  );
}

function EarthwormSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 体节（分段弓身） */}
      <g style={dim(active, 0)}>
        <path d="M40 210 Q 70 156 116 190 Q 150 148 196 182 Q 230 142 274 178 Q 308 148 350 180 Q 392 158 428 192 Q 462 216 448 244 Q 420 276 380 250 Q 346 282 306 252 Q 272 282 232 254 Q 198 282 160 254 Q 122 278 92 250 Q 48 240 40 210 Z"
          fill="#e8a8a0" stroke="#b0483a" strokeWidth="3.5" />
        {[76, 112, 150, 188, 226, 264, 302, 340, 378, 414].map((x, i) => (
          <path key={i} d={`M${x} ${i % 2 === 0 ? 168 : 150} Q ${x + 6} ${210} ${x} ${252 - (i % 2 === 0 ? 0 : 14)}`} fill="none" stroke="#c97062" strokeWidth="2.5" />
        ))}
        <text x="36" y="136" fontSize="13.5" fill="#b0483a" fontWeight="700">体节（环节动物）</text>
        <text x="36" y="120" fontSize="12" fill="#c97062">一节一节运动自如</text>
      </g>
      {/* 环带 */}
      <g style={dim(active, 1)}>
        <ellipse cx="150" cy="196" rx="26" ry="42" fill="#f0c0b8" stroke="#b0483a" strokeWidth="3" transform="rotate(-16 150 196)" />
        <text x="150" y="286" textAnchor="middle" fontSize="13.5" fill="#b0483a" fontWeight="700">环带（生殖带）</text>
        <line x1="150" y1="246" x2="150" y2="272" stroke="#b0483a" strokeWidth="1.4" />
      </g>
      {/* 刚毛 */}
      <g style={dim(active, 2)}>
        {[[96, 158], [134, 152], [210, 154], [250, 152], [294, 158], [334, 156], [392, 168]].map(([x, y], i) => (
          <g key={i} stroke="#8a4a3a" strokeWidth="2" strokeLinecap="round">
            <line x1={x} y1={y} x2={x - 5} y2={y - 10} />
            <line x1={x} y1={y} x2={x + 5} y2={y - 10} />
          </g>
        ))}
        <text x="330" y="120" fontSize="13.5" fill="#8a4a3a" fontWeight="700">刚毛（辅助运动）</text>
        <line x1="330" y1="126" x2="298" y2="152" stroke="#8a4a3a" strokeWidth="1.4" />
      </g>
      {/* 口与后端 */}
      <g style={dim(active, 3)}>
        <circle cx="46" cy="206" r="9" fill="#8c231f" />
        <text x="16" y="180" fontSize="13.5" fill="#7c2622" fontWeight="700">口（前端）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 0)}>
        <rect x="26" y="308" width="468" height="44" rx="9" fill="#f6efe6" stroke="#d9c9a8" strokeWidth="2" />
        <text x="42" y="326" fontSize="13.5" fill="#7a5a20" fontWeight="700">没有专门的呼吸器官：靠湿润的体壁完成气体交换（所以必须生活在潮湿土壤）</text>
        <text x="42" y="344" fontSize="12" fill="#a58a4a">达尔文：蚯蚓是地球上最有价值的动物之一——翻土、分解、改良土壤</text>
      </g>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">蚯蚓（环节动物）结构模式图</text>
    </svg>
  );
}

function LocustSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 头部 */}
      <g style={dim(active, 0)}>
        <ellipse cx="120" cy="150" rx="46" ry="38" fill="#e8c9a8" stroke="#b58a5f" strokeWidth="3.5" />
        <circle cx="96" cy="138" r="10" fill="#5a4a3a" />
        <text x="62" y="176" fontSize="12.5" fill="#7a5a38" fontWeight="600">复眼</text>
        <path d="M92 118 Q 60 84 34 88" fill="none" stroke="#8a6a48" strokeWidth="4" strokeLinecap="round" />
        <text x="16" y="72" fontSize="13" fill="#7a5a38" fontWeight="600">触角（触觉嗅觉）</text>
        <text x="70" y="212" fontSize="13" fill="#7a5a38" fontWeight="700">头部：感觉与取食</text>
      </g>
      {/* 胸部 */}
      <g style={dim(active, 1)}>
        <ellipse cx="234" cy="160" rx="70" ry="46" fill="#e0b88a" stroke="#b58a5f" strokeWidth="3.5" />
        {/* 前翅 */}
        <path d="M220 128 Q 340 84 470 118 Q 420 138 300 148 Z" fill="#c9a86a" stroke="#8a6a3a" strokeWidth="3" />
        <text x="400" y="92" fontSize="13" fill="#8a6a3a" fontWeight="600">前翅（革质保护）</text>
        {/* 后翅 */}
        <path d="M250 168 Q 372 158 448 196 Q 380 214 264 196 Z" fill="#f0d9b8" stroke="#b58a5f" strokeWidth="2.5" opacity="0.9" />
        <text x="418" y="232" fontSize="13" fill="#b58a5f" fontWeight="600">后翅（薄膜飞行）</text>
        {/* 三对足 */}
        <path d="M180 190 L 156 240 L 122 268" fill="none" stroke="#b58a5f" strokeWidth="5" strokeLinecap="round" />
        <path d="M232 196 L 226 252 L 200 296" fill="none" stroke="#b58a5f" strokeWidth="5" strokeLinecap="round" />
        <path d="M282 188 L 316 240 L 356 262" fill="none" stroke="#b58a5f" strokeWidth="5" strokeLinecap="round" />
        <text x="30" y="290" fontSize="13" fill="#7a5a38" fontWeight="700">三对足（后侧跳跃足发达）</text>
        <text x="234" y="120" textAnchor="middle" fontSize="13" fill="#7a5a38" fontWeight="700">胸部：运动中心</text>
      </g>
      {/* 腹部 + 气门 */}
      <g style={dim(active, 2)}>
        <path d="M296 168 Q 386 190 424 244 Q 438 268 414 280 Q 380 290 336 264 Q 306 244 296 168 Z" fill="#e8c9a8" stroke="#b58a5f" strokeWidth="3.5" />
        {[[336, 232], [358, 244], [380, 254], [400, 262]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#7a4a2a" />
        ))}
        <text x="330" y="310" fontSize="13.5" fill="#7a5a38" fontWeight="700">腹部：气门（气管呼吸的门户）</text>
      </g>
      {/* 外骨骼 */}
      <g style={dim(active, 0)}>
        <text x="16" y="40" fontSize="13.5" fill="#8a5a1e" fontWeight="700">外骨骼：保护内部 + 防止水分蒸发（陆生关键）——不能随身体长大，需定期蜕皮</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="26" y="330" width="468" height="36" rx="8" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="42" y="354" fontSize="13" fill="#7a5a20" fontWeight="600">发育：卵 → 若虫（无翅成虫态，蜕皮 5 次）→ 成虫——不完全变态发育</text>
      </g>
      <text x="508" y="64" textAnchor="end" fontSize="12.5" fill="#799398">蝗虫（节肢动物）结构模式图</text>
    </svg>
  );
}

function FishSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 鱼体 */}
      <g style={dim(active, 0)}>
        <path d="M96 190 Q 160 116 260 122 Q 352 128 398 190 Q 352 252 260 258 Q 160 264 96 190 Z" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="3.5" />
        {/* 鳞片 */}
        {[[180, 160], [216, 152], [252, 156], [288, 162], [196, 192], [232, 188], [268, 190], [304, 192], [212, 222], [248, 220], [284, 218]].map(([x, y], i) => (
          <path key={i} d={`M${x - 10} ${y} a 10 8 0 0 0 20 0`} fill="none" stroke="#7fa8c9" strokeWidth="1.8" />
        ))}
        <text x="252" y="298" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">鳞片（表面有黏液，减小阻力）</text>
      </g>
      {/* 鳃盖 */}
      <g style={dim(active, 1)}>
        <path d="M150 132 Q 176 190 150 248" fill="none" stroke="#3d6a94" strokeWidth="4" />
        <text x="52" y="112" fontSize="13.5" fill="#1e4a68" fontWeight="700">鳃盖（内为鳃）</text>
        <line x1="118" y1="118" x2="148" y2="140" stroke="#1e4a68" strokeWidth="1.4" />
        <text x="40" y="252" fontSize="12.5" fill="#2c6e94" fontWeight="600">鳃丝密布毛细血管</text>
        <text x="40" y="270" fontSize="12.5" fill="#2c6e94" fontWeight="600">水中气体交换的场所</text>
      </g>
      {/* 侧线 */}
      <g style={dim(active, 2)}>
        <path d="M168 186 Q 260 168 380 184" fill="none" stroke="#b0483a" strokeWidth="3" strokeDasharray="8 5" />
        <text x="262" y="152" textAnchor="middle" fontSize="13" fill="#b0483a" fontWeight="700">侧线：感知水流与方位</text>
      </g>
      {/* 鳍 */}
      <g style={dim(active, 3)}>
        <path d="M232 124 L 216 84 L 268 108 Z" fill="#8fb8d4" stroke="#3d6a94" strokeWidth="2.5" />
        <text x="238" y="76" fontSize="13" fill="#1e4a68" fontWeight="700">背鳍（平衡）</text>
        <path d="M168 232 Q 152 262 122 270 Q 132 240 152 222 Z" fill="#8fb8d4" stroke="#3d6a94" strokeWidth="2.5" />
        <text x="60" y="296" fontSize="13" fill="#1e4a68" fontWeight="700">胸鳍（转向）</text>
        <path d="M320 244 Q 336 272 366 276 Q 354 248 336 234 Z" fill="#8fb8d4" stroke="#3d6a94" strokeWidth="2.5" />
        <text x="356" y="296" fontSize="13" fill="#1e4a68" fontWeight="700">腹鳍（平衡）</text>
        <path d="M394 190 L 470 142 L 458 190 L 470 238 Z" fill="#e0a86a" stroke="#b57c3a" strokeWidth="3" />
        <text x="424" y="264" textAnchor="middle" fontSize="13.5" fill="#b57c3a" fontWeight="700">尾鳍（前进+方向）</text>
      </g>
      <g style={dim(active, 0)}>
        <text x="16" y="46" fontSize="13.5" fill="#2c6e94" fontWeight="700">鱼类适于水中生活的特征：鳃呼吸 · 鳍游泳 · 侧线感知 · 鳔控制沉浮</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">鲫鱼（鱼类）结构模式图</text>
    </svg>
  );
}

function FrogMetamorphosisSvg({ active }: { active: number | null; open?: boolean }) {
  const stages = [
    { name: '受精卵', desc: '水中胶团' },
    { name: '蝌蚪', desc: '鳃呼吸 · 有尾' },
    { name: '幼蛙', desc: '长四肢 · 尾渐消' },
    { name: '成蛙', desc: '肺+皮肤呼吸' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {stages.map((s, i) => {
        const cx = 78 + i * 122;
        const cy = 150;
        return (
          <g key={s.name} style={dim(active, i)}>
            {i === 0 ? (
              <>
                <circle cx={cx} cy={cy} r="30" fill="#3d2a1a" />
                {[[-10, -10], [8, -8], [-8, 8], [10, 8], [0, 0], [-14, 2]].map(([dx, dy], j) => (
                  <circle key={j} cx={cx + dx} cy={cy + dy} r="5.5" fill="#3d2a1a" stroke="#6a4a2a" strokeWidth="1.5" />
                ))}
              </>
            ) : null}
            {i === 1 ? (
              <>
                <ellipse cx={cx} cy={cy} rx="26" ry="18" fill="#5a8a3a" stroke="#3f6a2a" strokeWidth="2.5" />
                <path d={`M${cx + 24} ${cy} Q ${cx + 52} ${cy - 12} ${cx + 66} ${cy + 4}`} fill="none" stroke="#5a8a3a" strokeWidth="6" strokeLinecap="round" />
                <circle cx={cx - 10} cy={cy - 6} r="3.5" fill="#0a1a0a" />
                <circle cx={cx - 10} cy={cy + 6} r="3.5" fill="#0a1a0a" />
              </>
            ) : null}
            {i === 2 ? (
              <>
                <ellipse cx={cx} cy={cy} rx="27" ry="19" fill="#7aa83a" stroke="#4a7a2a" strokeWidth="2.5" />
                <path d={`M${cx + 22} ${cy + 6} Q ${cx + 44} ${cy + 14} ${cx + 54} ${cy + 22}`} fill="none" stroke="#5a8a3a" strokeWidth="4" strokeLinecap="round" />
                {[[-12, -8], [12, -8]].map(([dx, dy], j) => (
                  <circle key={j} cx={cx + dx} cy={cy + dy} r="4" fill="#0a1a0a" />
                ))}
                <path d={`M${cx - 20} ${cy - 14} L ${cx - 30} ${cy - 24} M${cx + 18} ${cy - 12} L ${cx + 26} ${cy - 22}`} stroke="#4a7a2a" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : null}
            {i === 3 ? (
              <>
                <ellipse cx={cx} cy={cy} rx="30" ry="21" fill="#7aa83a" stroke="#4a7a2a" strokeWidth="2.5" />
                {[[-14, -9], [14, -9]].map(([dx, dy], j) => (
                  <circle key={j} cx={cx + dx} cy={cy + dy} r="4.5" fill="#0a1a0a" />
                ))}
                <path d={`M${cx - 24} ${cy - 16} L ${cx - 38} ${cy - 28} M${cx + 22} ${cy - 14} L ${cx + 34} ${cy - 26}`} stroke="#4a7a2a" strokeWidth="5" strokeLinecap="round" />
                <path d={`M${cx - 18} ${cy + 16} L ${cx - 30} ${cy + 34} M${cx + 16} ${cy + 16} L ${cx + 28} ${cy + 34}`} stroke="#4a7a2a" strokeWidth="5" strokeLinecap="round" />
                <path d={`M${cx + 28} ${cy - 4} Q ${cx + 44} ${cy} ${cx + 36} ${cy + 8}`} fill="none" stroke="#4a7a2a" strokeWidth="2.5" />
              </>
            ) : null}
            <text x={cx} y={cy + 72} textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">{s.name}</text>
            <text x={cx} y={cy + 92} textAnchor="middle" fontSize="12" fill="#59767c">{s.desc}</text>
            {i < 3 ? (
              <line x1={cx + 44} y1={cy} x2={cx + 76} y2={cy} stroke="#8aa1a6" strokeWidth="3" markerEnd="url(#fm-arrow)" />
            ) : null}
          </g>
        );
      })}
      <text x="16" y="56" fontSize="13.5" fill="#2c6e94" fontWeight="700">变态发育：幼体与成体形态差异显著</text>
      <g style={dim(active, 3)}>
        <rect x="26" y="288" width="468" height="60" rx="9" fill="#e7f3e2" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="42" y="312" fontSize="13.5" fill="#2f7a4d" fontWeight="700">呼吸的变化：鳃（蝌蚪）→ 肺 + 皮肤辅助（成蛙）</text>
        <text x="42" y="334" fontSize="12" fill="#4a8a4a">生殖离不开水：体外受精、卵无壳——这是两栖类"两栖"却不完全适应陆地的关键</text>
      </g>
      <defs>
        <marker id="fm-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">青蛙的变态发育模式图</text>
    </svg>
  );
}

function PigeonSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 鸟体 */}
      <g style={dim(active, 0)}>
        <path d="M150 176 Q 170 120 240 108 Q 330 92 386 148 Q 428 190 396 232 Q 350 268 260 262 Q 176 258 150 176 Z" fill="#d9dfe8" stroke="#4a5a6a" strokeWidth="3.5" />
        {/* 头颈 */}
        <circle cx="356" cy="122" r="34" fill="#c9d4e2" stroke="#4a5a6a" strokeWidth="3" />
        <path d="M386 114 L 416 122 L 386 132 Z" fill="#e8c94a" stroke="#b5953a" strokeWidth="2" />
        <circle cx="366" cy="112" r="5" fill="#13333a" />
        <text x="428" y="110" fontSize="13" fill="#3d5a68" fontWeight="700">喙（无齿）</text>
      </g>
      {/* 正羽翼 */}
      <g style={dim(active, 1)}>
        <path d="M258 160 Q 200 150 150 172 Q 118 190 96 216 Q 150 206 196 200 Q 240 196 270 186 Z" fill="#aab8c8" stroke="#4a5a6a" strokeWidth="2.5" />
        {[116, 138, 160, 182, 202, 222].map((x, i) => (
          <line key={i} x1={x} y1={216 - i * 4} x2={x + 8} y2={172 - i * 3} stroke="#4a5a6a" strokeWidth="1.6" />
        ))}
        <text x="60" y="248" fontSize="13.5" fill="#3d5a68" fontWeight="700">正羽翼（飞行面）</text>
      </g>
      {/* 气囊（双重呼吸） */}
      <g style={dim(active, 2)}>
        {[[206, 140, 20], [258, 216, 24], [318, 214, 18]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#e8f4fb" stroke="#3d7fa6" strokeWidth="2.5" strokeDasharray="6 4" />
        ))}
        <text x="186" y="184" fontSize="12.5" fill="#3d7fa6" fontWeight="700">气囊（暂存气体）</text>
        <text x="16" y="306" fontSize="13.5" fill="#2c6e94" fontWeight="700">双重呼吸：吸气/呼气时肺内都在交换气体</text>
        <text x="16" y="326" fontSize="12" fill="#59767c">（气囊只暂存气体，交换在肺内进行）</text>
      </g>
      {/* 胸肌 */}
      <g style={dim(active, 3)}>
        <ellipse cx="268" cy="196" rx="52" ry="34" fill="#c98a7a" stroke="#a8564a" strokeWidth="2.5" opacity="0.8" />
        <text x="268" y="200" textAnchor="middle" fontSize="12.5" fill="#7a2622" fontWeight="700">发达胸肌</text>
        <text x="268" y="218" textAnchor="middle" fontSize="11.5" fill="#a86a5a">附着龙骨突，牵动两翼</text>
      </g>
      {/* 适飞特征 */}
      <g style={dim(active, 0)}>
        <rect x="26" y="328" width="468" height="36" rx="8" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="42" y="352" fontSize="13" fill="#173b42" fontWeight="600">适飞特征：流线型 · 中空骨骼 · 覆羽 · 直肠短</text>
      </g>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">家鸽（鸟类）结构模式图</text>
    </svg>
  );
}

export const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {
  beaver: { Svg: BeaverSvg },
  clownfish: { Svg: ClownfishSvg },
  mantaRay: { Svg: MantaRaySvg },
  gecko: { Svg: GeckoSvg },
  seaCucumber: { Svg: SeaCucumberSvg },
  amphioxus: { Svg: AmphioxusSvg },
  armadillo: { Svg: ArmadilloSvg },
  parrot: { Svg: ParrotSvg },
  mayfly: { Svg: MayflySvg },
  nakedMoleRat: { Svg: NakedMoleRatSvg },
  seaOtter: { Svg: SeaOtterSvg },
  polarBear: { Svg: PolarBearSvg },
  cobra: { Svg: CobraSvg },
  ant: { Svg: AntSvg },
  elephant: { Svg: ElephantSvg },
  flamingo: { Svg: FlamingoSvg },
  snowLeopard: { Svg: SnowLeopardSvg },
  krill: { Svg: KrillSvg },
  weaverBird: { Svg: WeaverBirdSvg },
  mole: { Svg: MoleSvg },
  zebra: { Svg: ZebraSvg },
  mudskipper: { Svg: MudskipperSvg },
  woodpecker: { Svg: WoodpeckerSvg },
  ostrich: { Svg: OstrichSvg },
  dolphin: { Svg: DolphinSvg },
  capybara: { Svg: CapybaraSvg },
  owl: { Svg: OwlSvg },
  poisonDartFrog: { Svg: PoisonDartFrogSvg },
  kangaroo: { Svg: KangarooSvg },
  electricEel: { Svg: ElectricEelSvg },
  shark: { Svg: SharkSvg },
  sloth: { Svg: SlothSvg },
  honeyBadger: { Svg: HoneyBadgerSvg },
  pangolin: { Svg: PangolinSvg },
  cicada: { Svg: CicadaSvg },
  hummingbird: { Svg: HummingbirdSvg },
  anglerfish: { Svg: AnglerfishSvg },
  leech: { Svg: LeechSvg },
  chameleon: { Svg: ChameleonSvg },
  cuckoo: { Svg: CuckooSvg },
  hermitCrab: { Svg: HermitCrabSvg },
  mantisShrimp: { Svg: MantisShrimpSvg },
  dungBeetle: { Svg: DungBeetleSvg },
  termite: { Svg: TermiteSvg },
  centipede: { Svg: CentipedeSvg },
  seahorse: { Svg: SeahorseSvg },
  firefly: { Svg: FireflySvg },
  tardigrade: { Svg: TardigradeSvg },
  flounder: { Svg: FlounderSvg },
  penguin: { Svg: PenguinSvg },
  crocodile: { Svg: CrocodileSvg },
  beeHive: { Svg: BeeHiveSvg },
  octopus: { Svg: OctopusSvg },
  mantis: { Svg: MantisSvg },
  dragonfly: { Svg: DragonflySvg },
  spider: { Svg: SpiderSvg },
  coral: { Svg: CoralSvg },
  tapeworm: { Svg: TapewormSvg },
  snail: { Svg: SnailSvg },
  turtle: { Svg: TurtleSvg },
  crab: { Svg: CrabSvg },
  jellyfish: { Svg: JellyfishSvg },
  planarian: { Svg: PlanarianSvg },
  ascarid: { Svg: AscaridSvg },
  giantPanda: { Svg: GiantPandaSvg },
  adaptations: { Svg: AdaptationsSvg },
  silkwormLife: { Svg: SilkwormLifeSvg },
  vertebrateClasses: { Svg: VertebrateClassesSvg },
  whale: { Svg: WhaleSvg },
  rumen: { Svg: RumenSvg },
  sponge: { Svg: SpongeSvg },
  starfish: { Svg: StarfishSvg },
  lizard: { Svg: LizardSvg },
  shrimp: { Svg: ShrimpSvg },
  birdEgg: { Svg: BirdEggSvg },
  hydra: { Svg: HydraSvg },
  mussel: { Svg: BivalveMusselSvg },
  earthworm: { Svg: EarthwormSvg },
  locust: { Svg: LocustSvg },
  fish: { Svg: FishSvg },
  frogMetamorphosis: { Svg: FrogMetamorphosisSvg },
  pigeon: { Svg: PigeonSvg },
};
