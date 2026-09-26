'use client';

import type { ComponentType } from 'react';
import { dim, type ArtProps } from '@/components/cells/art-shared';

function SickleCellAnemiaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 正常与镰刀红细胞 */}
      <g style={dim(active, 0)}>
        {[0, 1, 2].map((i) => (
          <ellipse key={`n${i}`} cx={110 + i * 46} cy={110} rx="24" ry="14" fill="#e84a4a" stroke="#a51515" strokeWidth="2.2" />
        ))}
        <text x="140" y="160" textAnchor="middle" fontSize="11.5" fill="#8a1a1a" fontWeight="700">正常红细胞（双凹圆盘）</text>
        {[0, 1, 2].map((i) => (
          <path key={`s${i}`} d={`M${330 + i * 44} 100 q 16 14 -2 26 q -22 12 -14 -18 q 4 -12 16 -8 Z`} fill="#e84a4a" stroke="#a51515" strokeWidth="2.2" />
        ))}
        <text x="370" y="160" textAnchor="middle" fontSize="11.5" fill="#8a1a1a" fontWeight="700">镰刀形红细胞（僵硬·易碎）</text>
      </g>
      {/* 分子机制 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="196" width="210" height="100" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="151" y="220" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">一个碱基的改变</text>
        <text x="151" y="244" textAnchor="middle" fontSize="10.5" fill="#a5761d">血红蛋白基因突变：DNA 上</text>
        <text x="151" y="266" textAnchor="middle" fontSize="10.5" fill="#a5761d">一个碱基替换（CTC→CAC）</text>
        <text x="151" y="288" textAnchor="middle" fontSize="10.5" fill="#a5761d">→ 谷氨酸变缬氨酸（一个氨基酸）</text>
      </g>
      {/* 杂合优势 */}
      <g style={dim(active, 2)}>
        <rect x="274" y="196" width="200" height="100" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="374" y="220" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">疟疾区的"杂合优势"</text>
        <text x="374" y="244" textAnchor="middle" fontSize="10.5" fill="#37585f">杂合子（Aa）轻度贫血</text>
        <text x="374" y="266" textAnchor="middle" fontSize="10.5" fill="#37585f">但抗疟疾能力强——被自然选择保留</text>
        <text x="374" y="290" textAnchor="middle" fontSize="10" fill="#59767c">基因"有害"与否取决于环境</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">镰刀型细胞贫血 · 分子病经典案例（课外拓展）</text>
    </svg>
  );
}

function ColorBlindnessSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 致病基因定位 */}
      <g style={dim(active, 0)}>
        <path d="M56 66 Q 56 44 92 44 Q 128 44 128 66 Q 128 108 92 150 Q 56 108 56 66 Z" fill="#f4d06a" stroke="#8a671b" strokeWidth="2.4" />
        <text x="92" y="76" textAnchor="middle" fontSize="12.5" fill="#8a5a1d" fontWeight="800">Xᴮ</text>
        <path d="M336 44 h 96 v 96 h -96 Z" fill="none" stroke="none" />
        <path d="M336 66 Q 336 44 372 44 Q 408 44 408 66 Q 408 108 372 150 Q 336 108 336 66 Z" fill="#e8c9c9" stroke="#a54838" strokeWidth="2.4" />
        <text x="372" y="76" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="800">Xᵇ</text>
        <text x="240" y="66" textAnchor="middle" fontSize="12.5" fill="#4b6c73" fontWeight="700">色盲基因 b 位于</text>
        <text x="240" y="86" textAnchor="middle" fontSize="12.5" fill="#4b6c73" fontWeight="700">X 染色体上（隐性）</text>
        <text x="92" y="176" textAnchor="middle" fontSize="12.5" fill="#8a5a1d" fontWeight="600">正常基因</text>
        <text x="372" y="176" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="600">色盲基因</text>
      </g>
      {/* 典型婚配：携带者女性 × 正常男性 */}
      <g style={dim(active, 1)}>
        <circle cx="150" cy="220" r="18" fill="#f4d0d0" stroke="#a54838" strokeWidth="2.4" />
        <text x="150" y="225" textAnchor="middle" fontSize="10.5" fill="#8a3a2a" fontWeight="700">女</text>
        <text x="150" y="254" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="700">XᴮXᵇ 携带者</text>
        <path d="M240 220 h 44" stroke="#4b6c73" strokeWidth="2.2" />
        <rect x="288" y="204" width="32" height="32" rx="4" fill="#c9d8e8" stroke="#2c5a84" strokeWidth="2.4" />
        <text x="304" y="225" textAnchor="middle" fontSize="10.5" fill="#2c5a84" fontWeight="700">男</text>
        <text x="304" y="254" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="700">XᴮY 正常</text>
        <path d="M262 222 v 26" stroke="#4b6c73" strokeWidth="1.6" strokeDasharray="3 3" />
        <text x="262" y="262" textAnchor="middle" fontSize="12.5" fill="#4b6c73" fontWeight="600">婚配</text>
      </g>
      {/* 后代比例 */}
      <g style={dim(active, 2)}>
        <path d="M222 268 v 18" stroke="#4b6c73" strokeWidth="1.8" />
        <path d="M222 286 l -6 -8 m 6 8 l 6 -8" fill="none" stroke="#4b6c73" strokeWidth="1.8" />
        <rect x="46" y="296" width="200" height="62" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="146" y="316" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="700">女儿：XᴮXᴮ · XᴮXᵇ 全正常</text>
        <text x="146" y="340" textAnchor="middle" fontSize="12.5" fill="#2c5a84">（一半是携带者）</text>
        <rect x="274" y="296" width="200" height="62" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="374" y="316" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">儿子：XᴮY 正常 · XᵇY 色盲</text>
        <text x="374" y="340" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">各占一半</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">红绿色盲 · 伴 X 染色体隐性遗传</text>
    </svg>
  );
}

function GeneticCodeSvg({ active }: { active: number | null; open?: boolean }) {
  const codons = [
    { c: 'AUG', aa: '甲硫氨酸（起始）', color: '#4a9a6a' },
    { c: 'UUU / UUC', aa: '苯丙氨酸', color: '#c9a05a' },
    { c: 'GAA / GAG', aa: '谷氨酸', color: '#5a8ac9' },
    { c: 'UAA / UAG / UGA', aa: '终止密码子', color: '#b0483a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* mRNA 链示意 */}
      <g style={dim(active, 0)}>
        <text x="36" y="66" fontSize="13" fill="#13333a" fontWeight="800">mRNA 上的三个相邻碱基 = 1 个密码子</text>
        {['A', 'U', 'G'].map((b, i) => (
          <g key={i}>
            <rect x={230 + i * 34} y={80} width="28" height="26" rx="5" fill={i === 0 ? '#7ab86a' : i === 1 ? '#cfe8e2' : '#a8cf98'} stroke="#3f7f3a" strokeWidth="1.8" />
            <text x={244 + i * 34} y={98} textAnchor="middle" fontSize="12" fill="#2f5a1e" fontWeight="800">{b}</text>
          </g>
        ))}
        <text x="352" y="98" fontSize="11.5" fill="#59767c">→ 甲硫氨酸</text>
      </g>
      {/* 密码子表样例 */}
      <g style={dim(active, 1)}>
        {codons.map((c, i) => (
          <g key={c.c}>
            <rect x="36" y={126 + i * 46} width="300" height="34" rx="8" fill="#f4faf9" stroke={c.color} strokeWidth="2" />
            <text x="52" y={148 + i * 46} fontSize="12.5" fill="#13333a" fontWeight="800">{c.c}</text>
            <text x="200" y={148 + i * 46} fontSize="12" fill="#49676d">{c.aa}</text>
          </g>
        ))}
      </g>
      {/* 要点 */}
      <g style={dim(active, 2)}>
        <rect x="352" y="126" width="152" height="176" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="428" y="152" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">三个要点</text>
        <text x="366" y="178" fontSize="11" fill="#6a4a1a">① 64 个密码子（3 碱基一组）</text>
        <text x="366" y="200" fontSize="11" fill="#6a4a1a">② 简并性：多对一</text>
        <text x="366" y="222" fontSize="11" fill="#6a4a1a">③ 通用性：几乎所有生物共用</text>
        <text x="366" y="244" fontSize="11" fill="#6a4a1a">④ 3 个终止密码子不编码氨基酸</text>
        <text x="366" y="266" fontSize="11" fill="#6a4a1a">⑤ 连续阅读·一个碱基不重复</text>
        <text x="366" y="290" fontSize="11" fill="#a54868" fontWeight="700">突变一个碱基 → 可能改变</text>
        <text x="366" y="308" fontSize="11" fill="#a54868" fontWeight="700">一个氨基酸（错义突变）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">遗传密码 · mRNA 密码子与氨基酸的对应（课外拓展）</text>
    </svg>
  );
}

function EmbryoCompareSvg({ active }: { active: number | null; open?: boolean }) {
  // 四种脊椎动物早期胚胎（简化形似形态）
  const embryo = (cx: number, cy: number) => (
    <g transform={`translate(${cx} ${cy})`}>
      <path d="M-26 18 Q -30 -8 -8 -14 Q 8 -20 20 -8 Q 32 2 22 14 Q 8 26 -8 22 Q -22 24 -26 18 Z" fill="#f4e2d0" stroke="#8a6a3a" strokeWidth="2.2" />
      <path d="M-20 6 q 8 -10 18 -6 M-16 14 q 10 -8 22 -2" fill="none" stroke="#c9a882" strokeWidth="1.8" />
      {/* 鳃弓 */}
      {[0, 1].map((i) => (
        <path key={i} d={`M${2 + i * 9} -6 q 3 7 -1 12`} fill="none" stroke="#b0483a" strokeWidth="1.8" />
      ))}
      {/* 尾 */}
      <path d="M20 8 q 16 2 24 -6" fill="none" stroke="#8a6a3a" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
  const labels = [
    { x: 75, name: '鱼', color: '#2c6e94' },
    { x: 200, name: '蝾螈', color: '#3f7f5a' },
    { x: 325, name: '鸡', color: '#b5761d' },
    { x: 450, name: '人', color: '#7a4a8a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 早期胚胎一行 */}
      <g style={dim(active, 0)}>
        {labels.map((l, i) => (
          <g key={l.name}>
            {embryo(l.x, 96)}
            <text x={l.x} y={148} textAnchor="middle" fontSize="12.5" fill={l.color} fontWeight="700">{l.name}</text>
          </g>
        ))}
        <text x="40" y="34" fontSize="13" fill="#13333a" fontWeight="800">早期胚胎都有鳃弓和尾</text>
      </g>
      {/* 成体对比一行 */}
      <g style={dim(active, 1)}>
        <rect x="20" y="176" width="480" height="130" rx="14" fill="#f4faf9" stroke="#9ab8bc" strokeWidth="2.2" />
        {/* 鱼 */}
        <path d="M60 240 Q 96 224 132 240 Q 96 258 60 240 Z" fill="#7aa8c9" stroke="#3d6a94" strokeWidth="2" />
        <path d="M132 240 l16 -10 l-2 20 Z" fill="#7aa8c9" stroke="#3d6a94" strokeWidth="1.6" />
        <text x="96" y="278" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="700">鱼：鳃呼吸·水中生活</text>
        {/* 蝾螈 */}
        <path d="M200 236 q 40 -12 80 4 q -10 16 -50 14 q -30 0 -30 -18 Z" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="2" />
        <text x="240" y="278" textAnchor="middle" fontSize="12" fill="#3f7f3a" fontWeight="700">蝾螈：成体有肺·四肢</text>
        {/* 鸡 */}
        <ellipse cx="380" cy="238" rx="26" ry="18" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.2" />
        <text x="368" y="278" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="700">鸡：羊膜卵·陆上发育</text>
        {/* 人 */}
        <circle cx="462" cy="232" r="12" fill="#f2d8c4" stroke="#b58a6a" strokeWidth="2" />
        <path d="M450 246 q 12 -8 24 0 l -2 16 q -10 6 -20 0 Z" fill="#e8c8b8" stroke="#b58a6a" strokeWidth="2" />
        <text x="474" y="284" textAnchor="middle" fontSize="12" fill="#7a4a8a" fontWeight="700">人：胎生·哺乳</text>
      </g>
      {/* 结论 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="318" width="440" height="44" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="336" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">胚胎学证据：早期胚胎的相似性表明脊椎动物来自共同的祖先</text>
        <text x="260" y="354" textAnchor="middle" fontSize="11.5" fill="#a5761d">越早期的胚胎越相似——进化把"共同的过去"留在了发育过程中</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">不同脊椎动物胚胎发育比较 · 胚胎学证据（课外拓展）</text>
    </svg>
  );
}

function HomologousOrgansSvg({ active }: { active: number | null; open?: boolean }) {
  // 四种前肢骨骼（简化：肱骨/桡尺骨/掌指骨）
  const limb = (x: number, y: number, scale: number, rot: number, color: string) => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
      <rect x="0" y="-5" width="34" height="10" rx="5" fill={color} stroke="#13333a" strokeWidth="1.6" />
      <rect x="32" y="-4" width="30" height="8" rx="4" fill={color} stroke="#13333a" strokeWidth="1.4" />
      <rect x="60" y="-3" width="20" height="6" rx="3" fill={color} stroke="#13333a" strokeWidth="1.4" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={78} y={-3 + i * 1.6} width="16" height="2.6" rx="1.3" fill={color} stroke="#13333a" strokeWidth="1" />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        {/* 人 */}
        {limb(50, 108, 1.1, -8, '#b8d4ea')}
        <text x="86" y="152" fontSize="12.5" fill="#2c5a84" fontWeight="700">人的手（灵活抓握）</text>
        {/* 鲸 */}
        {limb(250, 96, 1.35, 10, '#7aa8c9')}
        <text x="272" y="152" fontSize="12.5" fill="#2c5a84" fontWeight="700">鲸的鳍肢（游泳平衡）</text>
      </g>
      <g style={dim(active, 1)}>
        {/* 蝙蝠 */}
        {limb(60, 250, 1.15, -4, '#a8b8d8')}
        <path d="M142 246 Q 162 258 176 246 M142 258 Q 162 270 176 258" fill="none" stroke="#6a5a9a" strokeWidth="1.6" />
        <text x="80" y="296" fontSize="12.5" fill="#4a3a7a" fontWeight="700">蝙蝠的翼手（连膜飞行）</text>
        {/* 狗 */}
        {limb(260, 246, 0.95, 6, '#c9a882')}
        <text x="262" y="296" fontSize="12.5" fill="#8a6a3a" fontWeight="700">狗的前肢（奔跑支撑）</text>
      </g>
      {/* 共同骨架提示 */}
      <g style={dim(active, 2)}>
        <text x="330" y="212" fontSize="12.5" fill="#49676d" fontWeight="700">骨的排列方式一致：</text>
        <text x="330" y="230" fontSize="12.5" fill="#49676d" fontWeight="700">肱骨 → 桡尺骨 → 腕掌指骨</text>
      </g>
      {/* 结论 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="322" width="440" height="42" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">同源器官：外形功能各异，但内部结构相似 —— 证明它们来自共同的祖先</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">四种脊椎动物前肢骨骼对比 · 比较解剖学证据</text>
    </svg>
  );
}

function CellTheorySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 三位科学家 */}
      <g style={dim(active, 0)}>
        <rect x="24" y="40" width="150" height="120" rx="12" fill="#e8f0fa" stroke="#3d6a94" strokeWidth="2.5" />
        <circle cx="99" cy="72" r="14" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="2" />
        <text x="99" y="77" textAnchor="middle" fontSize="9" fill="#1e4a68" fontWeight="800">施莱登</text>
        <text x="99" y="106" textAnchor="middle" fontSize="11.5" fill="#1e4a68" fontWeight="700">1838 · 植物</text>
        <text x="99" y="124" textAnchor="middle" fontSize="11" fill="#2c5a84">提出植物体由细胞组成</text>
      </g>
      <g style={dim(active, 0)}>
        <rect x="185" y="40" width="150" height="120" rx="12" fill="#e8f0fa" stroke="#3d6a94" strokeWidth="2.5" />
        <circle cx="260" cy="72" r="14" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="2" />
        <text x="260" y="77" textAnchor="middle" fontSize="9" fill="#1e4a68" fontWeight="800">施旺</text>
        <text x="260" y="106" textAnchor="middle" fontSize="11.5" fill="#1e4a68" fontWeight="700">1839 · 动物</text>
        <text x="260" y="124" textAnchor="middle" fontSize="11" fill="#2c5a84">动物体也由细胞组成</text>
      </g>
      <g style={dim(active, 0)}>
        <rect x="346" y="40" width="150" height="120" rx="12" fill="#e8f0fa" stroke="#3d6a94" strokeWidth="2.5" />
        <circle cx="421" cy="72" r="14" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="2" />
        <text x="421" y="77" textAnchor="middle" fontSize="9" fill="#1e4a68" fontWeight="800">魏尔肖</text>
        <text x="421" y="106" textAnchor="middle" fontSize="11.5" fill="#1e4a68" fontWeight="700">1858 · 补充</text>
        <text x="421" y="124" textAnchor="middle" fontSize="11" fill="#2c5a84">细胞来自细胞分裂</text>
      </g>
      {/* 三大要点 */}
      <g style={dim(active, 1)}>
        <rect x="60" y="188" width="400" height="104" rx="14" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.5" />
        <text x="80" y="216" fontSize="13" fill="#8a671b" fontWeight="800">细胞学说的要点：</text>
        <text x="80" y="240" fontSize="12.5" fill="#6a4a1a">① 细胞是一个有机体，一切动植物都由细胞发育而来；</text>
        <text x="80" y="264" fontSize="12.5" fill="#6a4a1a">② 细胞是一个相对独立的单位；③ 新细胞由老细胞产生。</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 2)}>
        <text x="260" y="326" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="800">意义：揭示了动植物统一性 → 为进化论奠基</text>
        <text x="260" y="350" textAnchor="middle" fontSize="12" fill="#49676d">显微镜（虎克 1665 发现并命名"细胞"）是它的技术前提</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">细胞学说建立过程 · 必修 1 科学史</text>
    </svg>
  );
}

function KaryotypeSvg({ active }: { active: number | null; open?: boolean }) {
  // 23 对染色体的相对长度（对 1~22 + 性染色体）
  const lengths = [76, 66, 60, 56, 52, 50, 47, 45, 43, 41, 39, 37, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 常染色体 1~22 */}
      {lengths.map((len, i) => {
        const x = 30 + i * 21;
        const y = 330 - len;
        const shortArm = len * 0.38;
        return (
          <g key={i} style={dim(active, 0)}>
            {/* 短臂 */}
            <rect x={x} y={y} width="13" height={shortArm} rx="6" fill="#7a9ac9" stroke="#3d6a94" strokeWidth="1.6" />
            {/* 长臂 */}
            <rect x={x} y={y + shortArm + 6} width="13" height={len - shortArm - 6} rx="6" fill="#7a9ac9" stroke="#3d6a94" strokeWidth="1.6" />
            {/* 着丝粒 */}
            <rect x={x - 0.5} y={y + shortArm} width="14" height="6" fill="#13333a" />
            <text x={x + 6.5} y={350} textAnchor="middle" fontSize="9" fill="#49676d">{i + 1}</text>
          </g>
        );
      })}
      {/* 性染色体 XX / XY */}
      <g style={dim(active, 1)}>
        <text x="30" y="36" fontSize="13" fill="#13333a" fontWeight="700">人体细胞 23 对 46 条染色体</text>
        {/* XX（女） */}
        <text x="428" y="366" fontSize="11.5" fill="#7a4a8a" fontWeight="800">女 XX · 男 XY</text>
      </g>
      <g style={dim(active, 2)}>
        {/* 标注 */}
        <path d="M30 240 Q 24 210 36 196" fill="none" stroke="#49676d" strokeWidth="1.4" />
        <text x="14" y="188" fontSize="12.5" fill="#49676d" fontWeight="600">1 号最大</text>
        <path d="M455 244 Q 470 220 466 200" fill="none" stroke="#49676d" strokeWidth="1.4" />
        <text x="420" y="188" fontSize="12.5" fill="#49676d" fontWeight="600">22 号最小</text>
        <text x="240" y="152" fontSize="12.5" fill="#8a671b" fontWeight="600">着丝粒（纺锤丝附着处）</text>
        <line x1="240" y1="158" x2="252" y2="176" stroke="#8a671b" strokeWidth="1.4" />
        <text x="60" y="252" fontSize="12.5" fill="#799398">染色体组型分析可诊断染色体异常（如 21 三体综合征）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">人类正常核型模式图 · 22 对常染色体 + 1 对性染色体</text>
    </svg>
  );
}

function RnaStrandSvg({ active }: { active: number | null; open?: boolean }) {
  // 单链：核糖-磷酸骨架折线 + 碱基（A U G C）
  const bases = [
    { b: 'A', x: 60, y: 92 },
    { b: 'U', x: 120, y: 132 },
    { b: 'G', x: 185, y: 100 },
    { b: 'C', x: 248, y: 128 },
    { b: 'A', x: 310, y: 96 },
    { b: 'U', x: 372, y: 130 },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 骨架折线：磷酸（圆）- 核糖（五边形）交替 */}
      <g style={dim(active, 0)}>
        <polyline
          points={bases.map((b) => `${b.x + 18},${b.y - 26}`).join(' ')}
          fill="none"
          stroke="#d8a04a"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {bases.map((b, i) => (
          <circle key={`p${i}`} cx={b.x + 18} cy={b.y - 26} r="8" fill="#e8c05a" stroke="#b5903a" strokeWidth="1.8" />
        ))}
      </g>
      {/* 核糖五边形 + 碱基 */}
      <g style={dim(active, 1)}>
        {bases.map((b, i) => (
          <g key={i}>
            <polygon
              points={`${b.x - 14},${b.y + 4} ${b.x - 5},${b.y - 8} ${b.x + 9},${b.y - 4} ${b.x + 9},${b.y + 12} ${b.x - 5},${b.y + 15}`}
              fill="#8fb8d4"
              stroke="#4d7ea8"
              strokeWidth="1.6"
            />
            <line x1={b.x} y1={b.y + 16} x2={b.x} y2={b.y + 40} stroke="#c96a6a" strokeWidth="5" strokeLinecap="round" />
            <rect x={b.x - 15} y={b.y + 40} width="30" height="22" rx="5" fill={b.b === 'U' ? '#e07a9a' : '#6aa8d8'} stroke="#3d6a94" strokeWidth="1.4" />
            <text x={b.x} y={b.y + 56} textAnchor="middle" fontSize="12" fill="#ffffff" fontWeight="700">
              {b.b}
            </text>
          </g>
        ))}
      </g>
      {/* 标注 */}
      <g style={dim(active, 2)}>
        <line x1="98" y1="46" x2="70" y2="66" stroke="#b5903a" strokeWidth="1.4" />
        <text x="14" y="60" fontSize="13.5" fill="#a5781e" fontWeight="700">磷酸基团</text>
      </g>
      <g style={dim(active, 3)}>
        <line x1="220" y1="108" x2="176" y2="72" stroke="#4d7ea8" strokeWidth="1.4" />
        <text x="120" y="56" fontSize="13.5" fill="#2c6e94" fontWeight="700">核糖（五碳糖）</text>
      </g>
      <g style={dim(active, 4)}>
        <line x1="392" y1="176" x2="392" y2="196" stroke="#c96a6a" strokeWidth="1.4" />
        <text x="398" y="206" fontSize="13.5" fill="#c05a5a" fontWeight="700">碱基（A U G C）</text>
        <text x="398" y="220" fontSize="12.5" fill="#d08a8a">注意：RNA 没有 T，用 U（尿嘧啶）</text>
      </g>
      <g style={dim(active, 4)}>
        <text x="14" y="330" fontSize="13.5" fill="#a04a6a" fontWeight="700">RNA = 单链 · 核糖 · 碱基 A U G C</text>
        <text x="14" y="346" fontSize="12.5" fill="#b57a8a">对比 DNA：双链 · 脱氧核糖 · 碱基 A T G C</text>
      </g>
      <text x="500" y="368" textAnchor="end" fontSize="12.5" fill="#799398">RNA 单链结构模式图</text>
    </svg>
  );
}

function DnaHelixSvg({ active }: { active: number | null; open?: boolean }) {
  // 双螺旋：两条相位差 180° 的正弦骨架 + 连接的碱基对横档
  const A = 96;
  const turns = 2.2;
  const H = 300;
  const Y0 = 40;
  const samples = 60;
  const strand = (phase: number) =>
    Array.from({ length: samples + 1 }, (_, i) => {
      const t = i / samples;
      const y = Y0 + t * H;
      const x = 260 + Math.sin(t * Math.PI * 2 * turns + phase) * A * 0.55;
      return { x, y, z: Math.cos(t * Math.PI * 2 * turns + phase) };
    });
  const s1 = strand(0);
  const s2 = strand(Math.PI);
  const path = (pts: { x: number; y: number }[]) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ') + (pts.length ? '' : '');

  // 碱基对：在若干 t 处连接两条链
  const pairs = Array.from({ length: 9 }, (_, i) => {
    const idx = Math.round(((i + 0.5) / 9) * samples);
    return { p1: s1[idx], p2: s2[idx], i };
  });
  const BASES = ['A—T', 'T—A', 'G—C', 'C—G', 'A—T', 'T—A', 'G—C', 'C—G', 'A—T'];

  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 碱基对（横档） */}
      <g style={dim(active, 3)}>
        {pairs.map(({ p1, p2, i }) => (
          <g key={i}>
            <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#9aa8d8" strokeWidth="7" strokeLinecap="round" opacity="0.9" />
            <circle cx={(p1.x + p2.x) / 2} cy={(p1.y + p2.y) / 2} r="2.4" fill="#e8f0ff" />
          </g>
        ))}
      </g>

      {/* 骨架 1（脱氧核糖-磷酸） */}
      <g style={dim(active, 0)}>
        <path d={path(s1)} fill="none" stroke="#3f8fb8" strokeWidth="7" strokeLinecap="round" />
        {s1.filter((_, i) => i % 6 === 0).map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill="#2c6e94" />
        ))}
      </g>

      {/* 骨架 2 */}
      <g style={dim(active, 1)}>
        <path d={path(s2)} fill="none" stroke="#d8a04a" strokeWidth="7" strokeLinecap="round" />
        {s2.filter((_, i) => i % 6 === 0).map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="5" fill="#b57f2e" />
        ))}
      </g>

      {/* 碱基对标签 */}
      <g style={dim(active, 2)}>
        <line x1="392" y1="96" x2="330" y2="140" stroke="#7a8ab8" strokeWidth="1.4" />
        <text x="398" y="92" fontSize="13.5" fill="#5a6ab8" fontWeight="700">碱基对</text>
        <text x="398" y="106" fontSize="12.5" fill="#7a8ab8">A—T · G—C 配对</text>
      </g>
      <g style={dim(active, 4)}>
        <line x1="128" y1="96" x2="70" y2="120" stroke="#3f8fb8" strokeWidth="1.4" />
        <text x="12" y="112" fontSize="13" fill="#2c6e94" fontWeight="700">脱氧核糖</text>
        <text x="12" y="126" fontSize="13" fill="#2c6e94" fontWeight="700">-磷酸骨架</text>
      </g>
      <g style={dim(active, 1)}>
        <line x1="392" y1="230" x2="316" y2="240" stroke="#d8a04a" strokeWidth="1.4" />
        <text x="398" y="226" fontSize="13" fill="#b57f2e" fontWeight="700">另一条骨架</text>
        <text x="398" y="240" fontSize="12.5" fill="#c9a05a">两条链反向平行</text>
      </g>

      <text x="500" y="368" textAnchor="end" fontSize="12.5" fill="#799398">DNA 双螺旋结构模式图（沃森与克里克，1953）</text>
    </svg>
  );
}

function ChromosomeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 染色质（间期） */}
      <g style={dim(active, 0)}>
        <rect x="24" y="92" width="200" height="150" rx="12" fill="#f4f8fb" stroke="#8fb8d4" strokeWidth="2.5" />
        <path d="M46 130 q 16 -14 32 0 q 16 14 32 0 q 16 -14 32 0 q 16 14 32 0 M52 168 q 18 14 36 0 q 18 -14 36 0 q 18 14 36 0 M70 200 q 18 12 36 0 q 18 -12 36 0"
          fill="none" stroke="#b8d4ea" strokeWidth="5" strokeLinecap="round" />
        {[[78, 130], [142, 130], [110, 168], [88, 200], [152, 200]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="7" fill="#8a7a9a" stroke="#5f4f6a" strokeWidth="1.6" />
        ))}
        <text x="124" y="80" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">染色质（间期，细丝状）</text>
      </g>
      {/* 螺旋化箭头 */}
      <g style={dim(active, 2)}>
        <line x1="232" y1="168" x2="284" y2="168" stroke="#7a4a8a" strokeWidth="4" markerEnd="url(#ch-arrow)" />
        <text x="258" y="152" textAnchor="middle" fontSize="12.5" fill="#7a4a8a" fontWeight="700">螺旋化</text>
        <text x="258" y="190" textAnchor="middle" fontSize="12" fill="#8a5a94">缩短变粗</text>
      </g>
      {/* 染色体（分裂期） */}
      <g style={dim(active, 1)}>
        <rect x="296" y="92" width="200" height="150" rx="12" fill="#f4f8fb" stroke="#b48ad0" strokeWidth="2.5" />
        <g transform="translate(396 164)">
          <path d="M-8 -56 C 14 -44, 14 44, -8 56 L -14 52 C 6 40, 6 -44, -14 -56 Z" fill="#b48ad0" stroke="#7a4a8a" strokeWidth="2.5" />
          <path d="M8 -56 C -14 -44, -14 44, 8 56 L 14 52 C -6 40, -6 -44, 14 -56 Z" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2.5" />
          <ellipse cx="0" cy="-6" rx="9" ry="7" fill="#5f4f6a" />
        </g>
        <text x="396" y="126" textAnchor="middle" fontSize="13.5" fill="#6a4a9a" fontWeight="700">染色体（分裂期）</text>
        <text x="330" y="228" fontSize="12.5" fill="#7a4a8a" fontWeight="600">着丝粒</text>
        <line x1="356" y1="224" x2="388" y2="166" stroke="#7a4a8a" strokeWidth="1.4" />
      </g>
      {/* 组成与单体 */}
      <g style={dim(active, 3)}>
        <text x="24" y="286" fontSize="13.5" fill="#2c6e94" fontWeight="700">组成：DNA + 蛋白质；染色体复制后含两条姐妹染色单体，共用一个着丝粒</text>
        <text x="24" y="310" fontSize="12.5" fill="#59767c">着丝粒分裂后，姐妹染色单体分开成为两条子染色体——数目变化的时机是常考点</text>
      </g>
      <defs>
        <marker id="ch-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#7a4a8a" />
        </marker>
      </defs>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">染色质与染色体（同一物质两种形态）模式图</text>
    </svg>
  );
}

function NucleotideSvg({ active }: { active: number | null; open?: boolean }) {
  const unit = (cx: number, sugar: string, base: string, color: string, stroke: string) => (
    <g>
      <circle cx={cx} cy="84" r="24" fill="#d9e7f2" stroke="#3d6a94" strokeWidth="2.5" />
      <text x={cx} y="89" textAnchor="middle" fontSize="12.5" fill="#1e4a68" fontWeight="700">磷酸</text>
      <line x1={cx} y1="108" x2={cx} y2="132" stroke="#5a5a62" strokeWidth="3" />
      <path d={`M${cx} ${130} L${cx + 34} ${152} L${cx + 21} ${192} L${cx - 21} ${192} L${cx - 34} ${152} Z`} fill={color} stroke={stroke} strokeWidth="2.5" />
      <text x={cx} y={166} textAnchor="middle" fontSize="12.5" fill={stroke} fontWeight="700">{sugar}</text>
      <line x1={cx + 26} y1={156} x2={cx + 62} y2={156} stroke="#5a5a62" strokeWidth="3" />
      <rect x={cx + 64} y={132} width="96" height="48" rx="8" fill="#fdf1e3" stroke="#c98a1d" strokeWidth="2.5" />
      <text x={cx + 112} y={152} textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">含氮碱基</text>
      <text x={cx + 112} y={170} textAnchor="middle" fontSize="13" fill="#a58a20" fontWeight="700">{base}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        {unit(120, '脱氧核糖', 'A T C G', '#b8d4ea', '#3d6a94')}
        <text x="120" y="252" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">脱氧核糖核苷酸</text>
        <text x="120" y="272" textAnchor="middle" fontSize="12.5" fill="#2c6e94">构成 DNA（4 种）</text>
      </g>
      <g style={dim(active, 1)}>
        {unit(360, '核糖', 'A U C G', '#f4d06a', '#b58a3a')}
        <text x="360" y="252" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">核糖核苷酸</text>
        <text x="360" y="272" textAnchor="middle" fontSize="12.5" fill="#a58a20">构成 RNA（4 种）</text>
      </g>
      <g style={dim(active, 2)}>
        <text x="286" y="120" fontSize="16" fill="#59767c" fontWeight="700">对比</text>
        <text x="24" y="316" fontSize="13.5" fill="#173b42" fontWeight="700">区分关键：五碳糖（脱氧核糖/核糖）+ 特有碱基（DNA 含 T，RNA 含 U）</text>
        <text x="24" y="338" fontSize="12" fill="#799398">每个核苷酸 = 1 磷酸 + 1 五碳糖 + 1 碱基，靠"磷酸-五碳糖"骨架连成长链</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">核苷酸（核酸基本单位）结构模式图</text>
    </svg>
  );
}

export const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {
  sickleCellAnemia: { Svg: SickleCellAnemiaSvg },
  colorBlindness: { Svg: ColorBlindnessSvg },
  geneticCode: { Svg: GeneticCodeSvg },
  embryoCompare: { Svg: EmbryoCompareSvg },
  homologousOrgans: { Svg: HomologousOrgansSvg },
  cellTheory: { Svg: CellTheorySvg },
  karyotype: { Svg: KaryotypeSvg },
  rnaStrand: { Svg: RnaStrandSvg },
  dnaHelix: { Svg: DnaHelixSvg },
  chromosome: { Svg: ChromosomeSvg },
  nucleotide: { Svg: NucleotideSvg },
};
