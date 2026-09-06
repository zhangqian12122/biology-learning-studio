# -*- coding: utf-8 -*-
# 插入 6 个特殊物种 SVG 组件（银杏/仙人掌/青霉菌/海带/蝙蝠/鸭嘴兽）
p = 'components/cells/specimens.tsx'
lines = open(p, encoding='utf-8').readlines()
marker = next(i for i, l in enumerate(lines) if '数据汇总' in l)
new = """/* ================= 银杏 ================= */

function GinkgoSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">银杏：裸子植物活化石——白果是种子，不是果实！</text>
      {/* 扇形叶 */}
      <g style={dim(active, 0)}>
        <path d="M150 210 Q 96 190 88 128 Q 150 118 208 126 Q 202 192 150 210 Z" fill="#d4e8b8" stroke="#5a8a3a" strokeWidth="3" />
        {[96, 118, 140, 162, 184].map((x, i) => (
          <line key={i} x1="150" y1="204" x2={x} y2={132 + (i % 2) * 8} stroke="#5a8a3a" strokeWidth="1.6" opacity="0.6" />
        ))}
        <line x1="150" y1="204" x2="150" y2="236" stroke="#8a6a48" strokeWidth="5" strokeLinecap="round" />
        <text x="24" y="102" fontSize="13.5" fill="#5a8a3a" fontWeight="700">扇形叶（叶脉二叉分枝）</text>
        <text x="24" y="122" fontSize="12" fill="#7a9a4a">秋季金黄 · 落叶乔木</text>
      </g>
      {/* 白果（种子） */}
      <g style={dim(active, 1)}>
        <circle cx="330" cy="170" r="34" fill="#e8d9a0" stroke="#b5953a" strokeWidth="3" />
        <circle cx="330" cy="170" r="20" fill="#c9b08a" stroke="#8a671b" strokeWidth="2" />
        <text x="330" y="230" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="700">白果 = 种子（有硬壳）</text>
        <text x="330" y="252" textAnchor="middle" fontSize="12" fill="#a58a4a">外层是种皮，无果皮包被</text>
      </g>
      {/* 裸子植物要点 */}
      <g style={dim(active, 2)}>
        <rect x="26" y="272" width="468" height="66" rx="9" fill="#eef7ee" stroke="#3f7f3a" strokeWidth="2" />
        <text x="42" y="296" fontSize="13.5" fill="#2f7a4d" fontWeight="700">裸子植物：种子裸露，无果皮包被；受精不需要水</text>
        <text x="42" y="320" fontSize="12" fill="#4a8a4a">雌雄异株：雄树产花粉（风媒传粉），雌树的胚珠裸露发育成种子——种皮之外没有"果肉"</text>
      </g>
      {/* 活化石标签 */}
      <g style={dim(active, 3)}>
        <rect x="300" y="46" width="180" height="56" rx="9" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="390" y="68" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="700">活化石（孑遗植物）</text>
        <text x="390" y="90" textAnchor="middle" fontSize="12" fill="#a58a4a">2 亿年前已出现，堪称"植物界大熊猫"</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">银杏（裸子植物）模式图</text>
    </svg>
  );
}

/* ================= 仙人掌 ================= */

function CactusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">仙人掌：干旱环境的"储水罐"——叶变刺、茎储水、根广浅</text>
      {/* 地面 */}
      <rect x="20" y="270" width="480" height="24" fill="#c9b08a" />
      {/* 肉质茎 */}
      <g style={dim(active, 1)}>
        <path d="M190 270 Q 178 160 190 92 Q 200 68 230 66 Q 300 62 320 92 Q 334 160 322 270 Q 256 286 190 270 Z" fill="#7aa86a" stroke="#3f7f3a" strokeWidth="3.5" />
        {[212, 246, 280, 306].map((x, i) => (
          <line key={i} x1={x} y1="76" x2={x} y2="264" stroke="#5a8a3a" strokeWidth="2.5" opacity="0.6" />
        ))}
        <text x="256" y="300" textAnchor="middle" fontSize="13.5" fill="#3f7f3a" fontWeight="700">肉质茎（储水 + 进行光合作用）</text>
      </g>
      {/* 刺（叶特化） */}
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
      {/* 根系广而浅 */}
      <g style={dim(active, 2)}>
        <path d="M240 270 Q 180 296 120 286 M 260 270 Q 330 298 396 288 M 250 270 Q 250 300 250 306" fill="none" stroke="#b5956a" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 8" />
        <text x="404" y="312" textAnchor="end" fontSize="12.5" fill="#a58a4a" fontWeight="600">根系广而浅：雨后快速吸水</text>
      </g>
      {/* 花 */}
      <g style={dim(active, 3)}>
        <circle cx="260" cy="52" r="14" fill="#f2b8c8" stroke="#c9708a" strokeWidth="2.5" />
        <circle cx="260" cy="52" r="5" fill="#f4d06a" />
        <text x="298" y="48" fontSize="12.5" fill="#c9708a" fontWeight="600">雨后开花</text>
      </g>
      {/* CAM 标签 */}
      <g style={dim(active, 0)}>
        <rect x="26" y="316" width="468" height="44" rx="9" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="42" y="334" fontSize="12.5" fill="#7a5a20" fontWeight="700">气孔夜间开放（CAM 途径，课外拓展）：白天高温关闭保水，夜里储 CO₂ 供白天光合</text>
        <text x="42" y="352" fontSize="12" fill="#a58a4a">与大多数植物"白天开气孔"正相反——干旱环境的极致适应</text>
      </g>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">仙人掌（旱生植物）适应模式图</text>
    </svg>
  );
}

/* ================= 青霉菌 ================= */

function PenicilliumSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">青霉菌：多细胞真菌——弗莱明由此发现青霉素（第一种抗生素）</text>
      {/* 菌丝 */}
      <g style={dim(active, 0)}>
        <path d="M120 300 Q 170 250 200 210 M 180 300 Q 220 260 260 230 M 260 300 Q 300 260 330 230" fill="none" stroke="#c9c9a0" strokeWidth="5" strokeLinecap="round" />
        <text x="60" y="320" fontSize="12.5" fill="#8a8a4a" fontWeight="600">营养菌丝（深入基质吸收养分）</text>
      </g>
      {/* 分生孢子梗扫帚状 */}
      <g style={dim(active, 1)}>
        <line x1="290" y1="290" x2="270" y2="160" stroke="#8a9a4a" strokeWidth="6" strokeLinecap="round" />
        {[[-46, -18], [-28, -34], [-8, -44], [12, -36], [30, -20]].map(([dx, dy], i) => (
          <line key={i} x1="270" y1="160" x2={270 + dx} y2={160 + dy} stroke="#8a9a4a" strokeWidth="3.5" strokeLinecap="round" />
        ))}
        {([[-56, -24], [-40, -42], [-18, -52], [4, -44], [24, -30], [42, -14]]).map(([dx, dy], i) => (
          <g key={i}>
            <circle cx={270 + dx} cy={160 + dy} r="7" fill="#8fbf8a" stroke="#3f7f3a" strokeWidth="2" />
            <circle cx={270 + dx + 8} cy={160 + dy + 10} r="6" fill="#a8cfa0" stroke="#3f7f3a" strokeWidth="1.6" />
          </g>
        ))}
        <text x="330" y="100" fontSize="13.5" fill="#3f7f3a" fontWeight="700">分生孢子梗（扫帚状）</text>
        <text x="330" y="122" fontSize="12" fill="#5a8a5a">顶端串生分生孢子</text>
      </g>
      {/* 弗莱明故事 */}
      <g style={dim(active, 2)}>
        <rect x="26" y="252" width="220" height="110" rx="10" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="42" y="278" fontSize="13" fill="#7a5a20" fontWeight="700">1928 年弗莱明的发现</text>
        <text x="42" y="300" fontSize="12" fill="#a58a4a">青霉菌污染了葡萄球菌培养皿，</text>
        <text x="42" y="320" fontSize="12" fill="#a58a4a">菌落周围细菌被"溶解"出透明圈</text>
        <text x="42" y="344" fontSize="12" fill="#a58a4a">→ 提取出青霉素（人类第一种抗生素）</text>
      </g>
      {/* 抗菌原理 */}
      <g style={dim(active, 3)}>
        <rect x="274" y="252" width="220" height="110" rx="10" fill="#eaf1f9" stroke="#3d6a94" strokeWidth="2" />
        <text x="290" y="278" fontSize="13" fill="#1e4a68" fontWeight="700">青霉素抗菌原理</text>
        <text x="290" y="300" fontSize="12" fill="#3a6a8a">抑制细菌细胞壁（肽聚糖）合成</text>
        <text x="290" y="322" fontSize="12" fill="#3a6a8a">→ 细菌吸水涨破死亡</text>
        <text x="290" y="344" fontSize="12" fill="#799398">人体细胞无细胞壁，故副作用小</text>
      </g>
      {/* 真菌特征 */}
      <g style={dim(active, 0)}>
        <text x="16" y="60" fontSize="12.5" fill="#5a8a5a" fontWeight="600">真核生物 · 异养 · 孢子生殖（与酵母菌同门不同属）</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">青霉菌（真菌）结构模式图</text>
    </svg>
  );
}

/* ================= 海带 ================= */

function KelpSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">海带：大型褐藻——"根茎叶"其实都不是真正的根茎叶</text>
      {/* 海水背景 */}
      <rect x="26" y="52" width="468" height="270" rx="12" fill="#dff0f7" stroke="#9abfd4" strokeWidth="2" opacity="0.6" />
      {/* 固着器 */}
      <g style={dim(active, 0)}>
        <path d="M240 300 Q 210 288 180 296 M 250 300 Q 260 280 300 286 M 245 300 Q 230 290 205 296" fill="none" stroke="#8a6a48" strokeWidth="5" strokeLinecap="round" />
        <text x="110" y="308" fontSize="13" fill="#8a6a48" fontWeight="700">固着器（假根：只固着，不吸水）</text>
      </g>
      {/* 柄 */}
      <g style={dim(active, 1)}>
        <path d="M250 300 Q 252 260 250 210" fill="none" stroke="#6a8a3a" strokeWidth="10" strokeLinecap="round" />
        <text x="330" y="272" fontSize="13" fill="#4a7a3a" fontWeight="700">柄（茎状，无输导组织）</text>
        <line x1="326" y1="268" x2="262" y2="242" stroke="#4a7a3a" strokeWidth="1.4" />
      </g>
      {/* 叶状体 */}
      <g style={dim(active, 2)}>
        <path d="M254 210 Q 300 176 348 158 Q 322 120 350 84 Q 300 92 262 132 Q 236 168 254 210 Z" fill="#5a8a5a" stroke="#3f7f3a" strokeWidth="3" />
        <path d="M254 210 Q 296 200 340 176" fill="none" stroke="#4a7a3a" strokeWidth="2.5" opacity="0.6" />
        <text x="390" y="96" fontSize="13.5" fill="#2f7a4d" fontWeight="700">叶状体（带片）</text>
        <text x="390" y="116" fontSize="12" fill="#4a8a4a">含叶绿素 + 藻褐素</text>
        <line x1="386" y1="100" x2="344" y2="128" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 孢子囊 */}
      <g style={dim(active, 3)}>
        {[[300, 150], [322, 140], [316, 166]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="10" ry="5" fill="#8a671b" stroke="#6a4a10" strokeWidth="1.6" />
        ))}
        <text x="150" y="120" fontSize="12.5" fill="#8a671b" fontWeight="600">孢子囊（孢子生殖）</text>
      </g>
      {/* 要点 */}
      <g style={dim(active, 4)}>
        <rect x="26" y="292" width="468" height="64" rx="9" fill="#e7f3e2" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="42" y="316" fontSize="13" fill="#2f7a4d" fontWeight="700">藻类植物：无根、茎、叶的分化，无输导组织——结构简单但能进行光合作用</text>
        <text x="42" y="340" fontSize="12" fill="#4a8a4a">食用（富含碘和多糖）；"海带是植物有根茎叶"是典型错误说法</text>
      </g>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">海带（褐藻）结构模式图</text>
    </svg>
  );
}

/* ================= 蝙蝠 ================= */

function BatSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">蝙蝠：唯一真正会飞的哺乳动物——回声定位的"活体声呐"</text>
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <ellipse cx="240" cy="180" rx="52" ry="40" fill="#8a7a9a" stroke="#4a3a5a" strokeWidth="3.5" />
        {/* 头 */}
        <circle cx="296" cy="156" r="24" fill="#8a7a9a" stroke="#4a3a5a" strokeWidth="3" />
        <path d="M280 138 Q 288 118 298 132 M 306 134 Q 316 116 322 132" fill="none" stroke="#4a3a5a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="288" cy="150" r="4" fill="#f4d06a" />
        <circle cx="308" cy="150" r="4" fill="#f4d06a" />
        {/* 翼膜 + 指骨 */}
        <path d="M264 152 Q 200 130 110 96 Q 60 120 44 176 Q 140 180 264 196 Z" fill="#6a5a80" stroke="#3a2a50" strokeWidth="3" />
        {[110, 150, 190, 226].map((x, i) => (
          <line key={i} x1="262" y1="152" x2={x} y2={96 + i * 24} stroke="#3a2a50" strokeWidth="2.5" opacity="0.7" />
        ))}
        <text x="52" y="80" fontSize="13.5" fill="#3a2a50" fontWeight="700">翼膜：前肢指骨撑起的皮膜</text>
        <text x="52" y="100" fontSize="12" fill="#5a4a70">"手指"特长是飞行关键</text>
        {/* 脚 */}
        <path d="M216 214 L 206 250" fill="none" stroke="#4a3a5a" strokeWidth="4" strokeLinecap="round" />
        <path d="M258 212 L 268 248" fill="none" stroke="#4a3a5a" strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* 回声定位 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M322 148 Q ${360 + i * 26} ${148} ${400 + i * 26} ${120 + i * 6}`} fill="none" stroke="#3d7e9e" strokeWidth={3 - i * 0.6} strokeDasharray={i === 0 ? undefined : '7 6'} strokeLinecap="round" />
        ))}
        <text x="380" y="96" fontSize="13.5" fill="#2c6e94" fontWeight="700">回声定位（超声波）</text>
        <text x="380" y="116" fontSize="12" fill="#4a7a9a">夜间捕食昆虫、避开障碍</text>
      </g>
      {/* 要点 */}
      <g style={dim(active, 2)}>
        <rect x="26" y="288" width="468" height="64" rx="9" fill="#eef1f9" stroke="#3d6a94" strokeWidth="2.5" />
        <text x="42" y="312" fontSize="13" fill="#1e4a68" fontWeight="700">哺乳动物的核心特征：胎生、哺乳（蝙蝠飞行再强，这两条不变）</text>
        <text x="42" y="336" fontSize="12" fill="#4a6a8a">易错：会飞的≠鸟类——鸟类有羽毛，蝙蝠翼是皮膜；仿生学：雷达灵感来自蝙蝠回声定位</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">蝙蝠（哺乳动物）模式图（课外拓展）</text>
    </svg>
  );
}

/* ================= 鸭嘴兽 ================= */

function PlatypusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">鸭嘴兽：卵生却哺乳的"活化石"——哺乳动物起源于爬行类的证据</text>
      {/* 水面 */}
      <rect x="20" y="180" width="480" height="120" fill="#cfe4f0" opacity="0.6" rx="10" />
      {/* 身体 */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="210" rx="120" ry="56" fill="#8a7a5a" stroke="#5a4a2a" strokeWidth="3.5" />
        {/* 喙 */}
        <path d="M132 200 Q 92 196 76 210 Q 92 224 132 222 Q 122 210 132 200 Z" fill="#5a6a7a" stroke="#3a4a5a" strokeWidth="2.5" />
        <text x="52" y="176" fontSize="13" fill="#3a4a5a" fontWeight="700">鸭形喙（电感应）</text>
        {/* 尾 */}
        <path d="M366 202 Q 430 196 464 216 Q 436 240 372 228 Q 358 214 366 202 Z" fill="#6a5a3a" stroke="#4a3a1a" strokeWidth="2.5" />
        <text x="428" y="188" fontSize="13" fill="#4a3a1a" fontWeight="700">河狸式宽尾</text>
      </g>
      {/* 蛋 */}
      <g style={dim(active, 1)}>
        <ellipse cx="330" cy="312" rx="26" ry="18" fill="#f4ead0" stroke="#b5953a" strokeWidth="2.5" />
        <text x="330" y="348" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="700">产卵（卵生）！</text>
      </g>
      {/* 哺乳 */}
      <g style={dim(active, 2)}>
        <circle cx="150" cy="312" r="7" fill="#d4b8e8" stroke="#7a4a8a" strokeWidth="2" />
        <circle cx="174" cy="312" r="7" fill="#d4b8e8" stroke="#7a4a8a" strokeWidth="2" />
        <text x="150" y="348" textAnchor="middle" fontSize="13" fill="#6a3a7a" fontWeight="700">腹沟分泌乳汁哺育幼崽</text>
      </g>
      {/* 意义框 */}
      <g style={dim(active, 3)}>
        <rect x="26" y="290" width="150" height="0" fill="none" />
      </g>
      <g style={dim(active, 3)}>
        <rect x="238" y="290" width="150" height="0" fill="none" />
      </g>
      <g style={dim(active, 3)}>
        <rect x="26" y="290" width="490" height="0" fill="none" />
      </g>
      <g style={dim(active, 3)}>
        <rect x="26" y="362" width="490" height="0" fill="none" />
      </g>
      <g style={dim(active, 2)}>
        <text x="140" y="348" textAnchor="middle" fontSize="12" fill="#5a4a2a">幼崽舔食母兽腹部沟槽渗出的乳汁（无乳头）</text>
      </g>
      {/* 意义大框 */}
      <g style={dim(active, 3)}>
        <rect x="26" y="252" width="0" height="0" fill="none" />
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">鸭嘴兽（哺乳动物活化石）模式图（课外拓展）</text>
    </svg>
  );
}

/* ================= 数据汇总 ================= */
'''
lines[marker:marker] = [new]
open(p, 'w', encoding='utf-8').write(''.join(lines))
print('inserted svg ok')
