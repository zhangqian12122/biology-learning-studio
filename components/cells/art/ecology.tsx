'use client';

import type { ComponentType } from 'react';
import { dim, type ArtProps } from '@/components/cells/art-shared';

function EcosystemServicesSvg({ active }: { active: number | null; open?: boolean }) {
  const services = [
    { n: '供给服务', ex: '粮食·淡水·木材·药材', c: '#3f7f3a' },
    { n: '调节服务', ex: '调节气候·净化水气·防洪', c: '#2c5a84' },
    { n: '支持服务', ex: '土壤形成·养分循环·传粉', c: '#8a671b' },
    { n: '文化服务', ex: '游憩·审美·科研教育', c: '#7a4a8a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {services.map((sv, i) => (
        <g key={sv.n} style={dim(active, i)}>
          <rect x="36" y={50 + i * 60} width="300" height="50" rx="12" fill="#f6faf4" stroke={sv.c} strokeWidth="2.4" />
          <text x="54" y={70 + i * 60} fontSize="13" fill={sv.c} fontWeight="800">{sv.n}</text>
          <text x="54" y={90 + i * 60} fontSize="11" fill="#59767c">{sv.ex}</text>
        </g>
      ))}
      {/* 价值示意 */}
      <g style={dim(active, 2)}>
        <path d="M380 96 q 34 -26 62 -8 q 24 16 4 38 q -24 24 -56 6 q -18 -14 -10 -36 Z" fill="#c9d8e8" stroke="#2c5a84" strokeWidth="2.2" />
        <path d="M408 108 q 8 -12 0 -20" fill="none" stroke="#2c5a84" strokeWidth="2" />
        <text x="352" y="170" fontSize="12.5" fill="#2c5a84" fontWeight="700">全球生态系统年服务价值</text>
        <text x="352" y="190" fontSize="12.5" fill="#2c5a84" fontWeight="700">估算超过全球 GDP 总和</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="300" width="440" height="60" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">"看不见的免费账单"：破坏生态系统 = 巨额隐性负债</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">绿水青山就是金山银山——生态保护的经济逻辑（生态补偿·GEP 核算）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">生态系统的服务 · 自然对人类的馈赠（课外拓展）</text>
    </svg>
  );
}

function MangroveSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 潮间带 */}
      <g style={dim(active, 0)}>
        <path d="M40 250 q 60 -14 130 0 q 80 16 160 0 q 80 -14 150 4 l 0 50 l -440 0 Z" fill="#8aa7c9" stroke="#4d7ea8" strokeWidth="2.2" opacity="0.75" />
        <path d="M40 300 h 440" stroke="#5a7a8a" strokeWidth="2.4" />
        <text x="296" y="272" fontSize="12.5" fill="#2c5a84" fontWeight="700">海岸潮间带：每天被潮水淹没两次</text>
        <text x="296" y="290" fontSize="12.5" fill="#2c5a84">普通植物在这里无法呼吸生根</text>
      </g>
      {/* 红树植株 */}
      <g style={dim(active, 1)}>
        {[0, 1].map((i) => (
          <g key={i}>
            <path d={`M${150 + i * 190} 246 v -70`} stroke="#6a4a2a" strokeWidth="8" strokeLinecap="round" />
            <path d={`M${150 + i * 190} 186 q -30 -14 -44 -44 m 44 44 q 30 -14 44 -44 m -44 44 q -2 -36 0 -56`} fill="none" stroke="#3f7f3a" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx={100 + i * 190} cy="132" rx="26" ry="15" fill="#5a9a4a" stroke="#2f6f2a" strokeWidth="1.8" />
            <ellipse cx={200 + i * 190} cy="132" rx="26" ry="15" fill="#5a9a4a" stroke="#2f6f2a" strokeWidth="1.8" />
            <ellipse cx={150 + i * 190} cy="118" rx="28" ry="16" fill="#6aa85a" stroke="#2f6f2a" strokeWidth="1.8" />
          </g>
        ))}
        <text x="60" y="100" fontSize="12.5" fill="#2f6f2a" fontWeight="700">红树（树皮含单宁呈红色）</text>
      </g>
      {/* 呼吸根与支柱根 */}
      <g style={dim(active, 2)}>
        {[0, 1].map((i) => (
          <g key={i}>
            <path d={`M${150 + i * 190} 246 l -26 34 m 26 -34 l 24 34 m -24 -34 l 0 38`} stroke="#8a6a3a" strokeWidth="4.4" strokeLinecap="round" />
            {[0, 1, 2].map((j) => (
              <path key={j} d={`M${118 + i * 190 + j * 24} 288 q 4 -26 12 -38`} fill="none" stroke="#a5824a" strokeWidth="3" strokeLinecap="round" />
            ))}
          </g>
        ))}
        <text x="42" y="216" fontSize="12.5" fill="#8a6a3a" fontWeight="700">支柱根（固定淤泥）</text>
        <text x="330" y="216" fontSize="12.5" fill="#a5824a" fontWeight="700">呼吸根（退潮时换气）</text>
        <line x1="122" y1="220" x2="128" y2="244" stroke="#8a6a3a" strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1="356" y1="220" x2="330" y2="252" stroke="#a5824a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 胎生苗 */}
      <g style={dim(active, 3)}>
        <path d="M390 246 l 12 -40 q 10 -16 22 -4 q 10 14 -4 24 l -30 20 Z" fill="#7aa87a" stroke="#2f6f2a" strokeWidth="2.2" />
        <text x="330" y="60" fontSize="12.5" fill="#2f6f2a" fontWeight="700">胎生苗：种子在母树上萌发成</text>
        <text x="330" y="80" fontSize="12.5" fill="#2f6f2a">棒状幼苗，脱落插入淤泥生根</text>
        <line x1="392" y1="88" x2="404" y2="200" stroke="#2f6f2a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 价值 */}
      <g style={dim(active, 4)}>
        <rect x="40" y="322" width="440" height="44" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="260" y="340" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">"海岸卫士"：消浪护堤 · 净化海水 · 为鱼虾鸟类提供繁殖与觅食地</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">固碳能力约为同面积热带雨林的 3~5 倍——重要的蓝碳生态系统</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">红树林 · 海岸湿地生态系统（课外拓展）</text>
    </svg>
  );
}

function GreenhouseEffectSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 太阳辐射 */}
      <g style={dim(active, 0)}>
        <circle cx="90" cy="76" r="26" fill="#f4d06a" stroke="#c9a05a" strokeWidth="2.6" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const ang = (i * Math.PI) / 4;
          return <line key={i} x1={90 + Math.cos(ang) * 32} y1={76 + Math.sin(ang) * 32} x2={90 + Math.cos(ang) * 42} y2={76 + Math.sin(ang) * 42} stroke="#c9a05a" strokeWidth="2.4" strokeLinecap="round" />;
        })}
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M130 ${100 + i * 34} l 26 12 l 26 -8 l 26 12`} fill="none" stroke="#e8b83a" strokeWidth="2.6" strokeDasharray="7 4" />
        ))}
        <text x="152" y="66" fontSize="12.5" fill="#8a671b" fontWeight="700">太阳短波辐射穿过大气到达地面</text>
      </g>
      {/* 大气层 */}
      <g style={dim(active, 1)}>
        <rect x="220" y="96" width="240" height="64" rx="10" fill="#cfe0ec" stroke="#4d7ea8" strokeWidth="2.2" opacity="0.85" />
        <text x="340" y="122" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">CO₂ · CH₄ 等温室气体层</text>
        <text x="340" y="144" textAnchor="middle" fontSize="11.5" fill="#2c5a84">吸收地面反射的长波辐射</text>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M418 ${140 - i * 26} q -20 16 -40 6 q -18 -10 -34 4`} fill="none" stroke="#b0483a" strokeWidth="2.4" strokeDasharray="6 4" />
        ))}
        <path d="M300 176 l 20 -14 m 12 20 l 16 -16" stroke="#b0483a" strokeWidth="2.4" strokeDasharray="6 4" />
        <text x="60" y="248" fontSize="12.5" fill="#a53030" fontWeight="700">长波辐射被"锁"在大气内 → 增温</text>
      </g>
      {/* 地面与来源 */}
      <g style={dim(active, 2)}>
        <path d="M60 280 h 400" stroke="#3f7f3a" strokeWidth="3" />
        <path d="M60 280 q 200 -10 400 0" fill="#c9e0b0" stroke="#3f7f3a" strokeWidth="2" />
        <text x="96" y="304" fontSize="12.5" fill="#2f6f2a" fontWeight="700">地面受热升温</text>
        {/* 工厂 */}
        <rect x="290" y="236" width="70" height="44" fill="#8a9a9f" stroke="#4a5a5f" strokeWidth="2" />
        <rect x="300" y="204" width="14" height="34" fill="#6a7a7f" stroke="#4a5a5f" strokeWidth="1.8" />
        <circle cx="307" cy="196" r="9" fill="#b0b0b0" opacity="0.8" />
        <circle cx="316" cy="182" r="12" fill="#c0c0c0" opacity="0.7" />
        <text x="368" y="226" fontSize="12.5" fill="#4a5a5f" fontWeight="700">化石燃料燃烧</text>
        {/* 树桩 */}
        <rect x="150" y="258" width="14" height="22" fill="#8a6a3a" stroke="#5a4a2a" strokeWidth="1.6" />
        <text x="170" y="272" fontSize="12.5" fill="#5a4a2a" fontWeight="700">砍伐森林</text>
      </g>
      {/* 影响 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="322" width="440" height="44" rx="10" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.2" />
        <text x="260" y="340" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="700">影响：冰川融化·海平面上升·极端天气增多·物种分布改变</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11.5" fill="#a5533c">应对：减排温室气体 · 植树造林 · 开发清洁能源（碳中和）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">温室效应 · 碳循环失衡（课外拓展）</text>
    </svg>
  );
}

function LivingFossilSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 银杏 */}
      <g style={dim(active, 0)}>
        <path d="M70 120 q -18 -34 14 -46 q 30 -10 40 16 q 8 26 -18 36 q -22 8 -36 -6 Z" fill="#c9d86a" stroke="#6a7a2a" strokeWidth="2.2" />
        <path d="M96 76 q 4 22 -2 44" fill="none" stroke="#6a7a2a" strokeWidth="1.6" />
        <text x="60" y="156" fontSize="12.5" fill="#6a7a2a" fontWeight="700">银杏（扇形叶·裸子植物）</text>
        <text x="60" y="176" fontSize="12.5" fill="#6a7a2a">2.7 亿年前出现，白垩纪末近全灭</text>
      </g>
      {/* 水杉 */}
      <g style={dim(active, 1)}>
        <path d="M236 172 v -78 l 24 -10 v 88 Z" fill="#8a5a3a" stroke="#5a3a2a" strokeWidth="2.2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M260 ${86 + i * 20} q 26 -6 44 -14 M260 ${96 + i * 20} q -26 -4 -44 -12`} fill="none" stroke="#3f7f3a" strokeWidth="3" strokeLinecap="round" />
        ))}
        <text x="222" y="196" fontSize="12.5" fill="#3f7f3a" fontWeight="700">水杉（羽状对生小叶）</text>
        <text x="222" y="216" fontSize="12.5" fill="#3f7f3a">1943 年在湖北利川重新发现</text>
      </g>
      {/* 珙桐 */}
      <g style={dim(active, 2)}>
        <ellipse cx="408" cy="112" rx="38" ry="22" fill="#f0ead8" stroke="#8a9a7a" strokeWidth="2.2" transform="rotate(-12 408 112)" />
        <ellipse cx="442" cy="138" rx="34" ry="20" fill="#f0ead8" stroke="#8a9a7a" strokeWidth="2.2" transform="rotate(10 442 138)" />
        <circle cx="424" cy="126" r="9" fill="#7a5a8a" stroke="#4a3a5a" strokeWidth="1.6" />
        <text x="360" y="82" fontSize="12.5" fill="#5a6a7a" fontWeight="700">珙桐（鸽子树）</text>
        <text x="360" y="170" fontSize="12.5" fill="#5a6a7a">大苞片似白鸽展翅</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="252" width="440" height="92" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="280" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">"活化石"：曾在地质历史中广布、近缘类群大多灭绝</text>
        <text x="260" y="306" textAnchor="middle" fontSize="12.5" fill="#2f6f2a">孑遗植物保留了古老类群的形态特征，是研究植物演化</text>
        <text x="260" y="330" textAnchor="middle" fontSize="12.5" fill="#2f6f2a">和古气候的"活标本"——均被列为国家重点保护植物</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">孑遗植物 · 植物界的活化石（课外拓展）</text>
    </svg>
  );
}

function FiveKingdomsSvg({ active }: { active: number | null; open?: boolean }) {
  const kingdoms = [
    { name: '原核生物界', ex: '细菌·蓝细菌', color: '#4d7ea8', icon: '🔬' },
    { name: '原生生物界', ex: '变形虫·草履虫·衣藻', color: '#c9a05a', icon: '🦠' },
    { name: '真菌界', ex: '蘑菇·酵母·霉菌', color: '#8a671b', icon: '🍄' },
    { name: '植物界', ex: '苔藓·蕨类·种子植物', color: '#3f7f3a', icon: '🌿' },
    { name: '动物界', ex: '无脊椎·脊椎动物', color: '#b0483a', icon: '🐾' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {kingdoms.map((k, i) => (
        <g key={k.name} style={dim(active, i)}>
          <rect x="30" y={46 + i * 62} width="460" height="50" rx="12" fill="#f8faf6" stroke={k.color} strokeWidth="2.4" />
          <text x={52} y={78 + i * 62} fontSize="20">{k.icon}</text>
          <text x={86} y={78 + i * 62} fontSize="13.5" fill={k.color} fontWeight="800">{k.name}</text>
          <text x={280} y={78 + i * 62} fontSize="11.5" fill="#59767c">{k.ex}</text>
        </g>
      ))}
      <g style={dim(active, 0)}>
        <rect x="40" y="368" width="440" height="0" fill="none" />
        <text x="260" y="366" textAnchor="middle" fontSize="12" fill="#49676d" fontWeight="700">五界系统（Whittaker 1969）——按细胞结构与营养方式分类</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">五界分类系统 · 生物分类的"家族树"（课外拓展）</text>
    </svg>
  );
}

function PhotoperiodismSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <circle cx="110" cy="110" r="42" fill="#f4d06a" stroke="#b5953a" strokeWidth="3" />
        <text x="110" y="106" textAnchor="middle" fontSize="12" fill="#7a5a1d" fontWeight="800">短日照</text>
        <text x="110" y="124" textAnchor="middle" fontSize="11" fill="#8a671b">菊花·水稻</text>
      </g>
      <g style={dim(active, 1)}>
        <circle cx="260" cy="110" r="42" fill="#c8e2ba" stroke="#3f7f3a" strokeWidth="3" />
        <text x="260" y="106" textAnchor="middle" fontSize="12" fill="#2f7a4d" fontWeight="800">长日照</text>
        <text x="260" y="124" textAnchor="middle" fontSize="11" fill="#3f7f3a">小麦·菠菜</text>
      </g>
      <g style={dim(active, 2)}>
        <circle cx="410" cy="110" r="42" fill="#c8e2d8" stroke="#3f7f6a" strokeWidth="3" />
        <text x="410" y="106" textAnchor="middle" fontSize="12" fill="#2f7a6a" fontWeight="800">日中性</text>
        <text x="410" y="124" textAnchor="middle" fontSize="11" fill="#2f7a6a">番茄·黄瓜</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="236" width="440" height="112" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="262" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">关键：感知日照长短的不是叶绿体，而是叶片中的光敏色素</text>
        <text x="260" y="286" textAnchor="middle" fontSize="11.5" fill="#a5761d">短日照植物实际感知的是"连续黑暗的长度"——而非日照长度</text>
        <text x="260" y="314" textAnchor="middle" fontSize="12" fill="#a54868" fontWeight="700">应用：通过遮光或补光控制花期，让菊花在春节开花</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">植物的光周期现象 · 开花调控（课外拓展）</text>
    </svg>
  );
}

function BiodiversitySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 基因多样性 */}
      <g style={dim(active, 0)}>
        <circle cx="110" cy="110" r="42" fill="#d8c8ee" stroke="#7a4a8a" strokeWidth="3" />
        {[0, 1, 2, 3, 4].map((i) => {
          const ang = (-90 + i * 72) * (Math.PI / 180);
          return (
            <circle key={i} cx={110 + Math.cos(ang) * 26} cy={110 + Math.sin(ang) * 26} r="10" fill="#e0c8ee" stroke="#7a4a8a" strokeWidth="1.8" />
          );
        })}
        <text x="110" y="180" textAnchor="middle" fontSize="13" fill="#6a4a9a" fontWeight="800">基因（遗传）多样性</text>
        <text x="110" y="200" textAnchor="middle" fontSize="11.5" fill="#8a5a9a">同种个体间基因差异</text>
      </g>
      {/* 物种多样性 */}
      <g style={dim(active, 1)}>
        <circle cx="260" cy="110" r="42" fill="#c8e2ba" stroke="#3f7f3a" strokeWidth="3" />
        {['🐟', '🦋', '🌷', '🐦', '🍄'].map((e, i) => {
          const ang = (-90 + i * 72) * (Math.PI / 180);
          return <text key={i} x={260 + Math.cos(ang) * 26} y={110 + Math.sin(ang) * 26 + 6} textAnchor="middle" fontSize="14">{e}</text>;
        })}
        <text x="260" y="180" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="800">物种多样性</text>
        <text x="260" y="200" textAnchor="middle" fontSize="11.5" fill="#4a8a3a">群落中物种的丰富度</text>
      </g>
      {/* 生态系统多样性 */}
      <g style={dim(active, 2)}>
        <circle cx="410" cy="110" r="42" fill="#f4d06a" stroke="#b5953a" strokeWidth="3" />
        {['🌲', '🏜️', '🌊', '🏔️', '🌾'].map((e, i) => {
          const ang = (-90 + i * 72) * (Math.PI / 180);
          return <text key={i} x={410 + Math.cos(ang) * 26} y={110 + Math.sin(ang) * 26 + 6} textAnchor="middle" fontSize="14">{e}</text>;
        })}
        <text x="410" y="180" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="800">生态系统多样性</text>
        <text x="410" y="200" textAnchor="middle" fontSize="11.5" fill="#a5761d">栖息地·群落类型的多样性</text>
      </g>
      {/* 关系 */}
      <g style={dim(active, 3)}>
        <path d="M152 110 L 218 110" fill="none" stroke="#59767c" strokeWidth="2.2" markerEnd="url(#bd-arrow)" />
        <path d="M302 110 L 368 110" fill="none" stroke="#59767c" strokeWidth="2.2" markerEnd="url(#bd-arrow)" />
        <text x="185" y="102" textAnchor="middle" fontSize="10" fill="#59767c">构成基础</text>
        <text x="335" y="102" textAnchor="middle" fontSize="10" fill="#59767c">最直观体现</text>
      </g>
      {/* 保护措施 */}
      <g style={dim(active, 4)}>
        <rect x="40" y="236" width="440" height="112" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="262" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">保护措施：就地保护（自然保护区·最有效）+ 迁地保护（动物园·植物园·种子库）</text>
        <text x="260" y="288" textAnchor="middle" fontSize="11.5" fill="#a5761d">保护生物多样性 = 保护基因、物种与生态系统的"全部库存"</text>
        <text x="260" y="312" textAnchor="middle" fontSize="11.5" fill="#a54868" fontWeight="700">关键：协调好"人与生态环境"的相互关系，而非禁止利用</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#49676d">合理利用是最好的保护：反对"盲目的禁而不保"</text>
      </g>
      <defs>
        <marker id="bd-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#59767c" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">生物多样性的三个层次 · 保护生物学核心概念</text>
    </svg>
  );
}

function VerticalLayersSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 乔木层 */}
      <g style={dim(active, 0)}>
        <rect x="30" y="30" width="460" height="76" fill="#3f7f3a" opacity="0.18" />
        <path d="M70 106 L70 60 M130 104 L130 52 M390 108 L390 58 M440 104 L440 66" stroke="#5a3a1a" strokeWidth="8" strokeLinecap="round" />
        {[62, 122, 382, 432].map((x, i) => (
          <circle key={i} cx={x} cy={48} r={i % 2 === 0 ? 30 : 26} fill="#4a8a3a" stroke="#2f7a4d" strokeWidth="2.5" />
        ))}
        <text x="250" y="52" textAnchor="middle" fontSize="13" fill="#1e5a2e" fontWeight="800">乔木层（树冠吸收最强阳光）</text>
      </g>
      {/* 灌木层 */}
      <g style={dim(active, 1)}>
        <rect x="30" y="106" width="460" height="58" fill="#7ab86a" opacity="0.2" />
        {[80, 150, 250, 330, 420].map((x, i) => (
          <g key={i}>
            <path d={`M${x} 160 L${x} 128`} stroke="#4a7a3a" strokeWidth="5" strokeLinecap="round" />
            <circle cx={x} cy={122} r="15" fill="#6aa85a" stroke="#3f7f3a" strokeWidth="2.2" />
          </g>
        ))}
        <text x="250" y="150" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="800">灌木层（耐半荫的灌木）</text>
      </g>
      {/* 草本层 */}
      <g style={dim(active, 2)}>
        <rect x="30" y="164" width="460" height="52" fill="#a8cf98" opacity="0.28" />
        {[60, 110, 170, 230, 290, 350, 410, 460].map((x, i) => (
          <path key={i} d={`M${x} 212 q 4 -26 ${i % 2 === 0 ? -10 : 10} -34`} fill="none" stroke="#4a8a3a" strokeWidth="3" strokeLinecap="round" />
        ))}
        <text x="250" y="204" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="800">草本层（需光较少的草本植物）</text>
      </g>
      {/* 地被层 */}
      <g style={dim(active, 3)}>
        <rect x="30" y="216" width="460" height="50" fill="#8a7a4a" opacity="0.22" />
        {[70, 140, 210, 280, 350, 430].map((x, i) => (
          <ellipse key={i} cx={x} cy={248} rx="16" ry="7" fill="#8a9a2a" stroke="#5a6a1d" strokeWidth="1.8" />
        ))}
        <text x="250" y="240" textAnchor="middle" fontSize="13" fill="#5a6a1d" fontWeight="800">地被层（苔藓·地衣·真菌）</text>
      </g>
      {/* 土壤与动物分层提示 */}
      <g style={dim(active, 4)}>
        <path d="M30 266 L490 266 L490 380 L30 380 Z" fill="#c9b88a" stroke="#a5885f" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse key={i} cx={90 + i * 74} cy={300 + (i % 2) * 26} rx="15" ry="8" fill="#a5885f" stroke="#7a5a3a" strokeWidth="1.8" />
        ))}
        <text x="36" y="348" fontSize="12.5" fill="#6a5a2a" fontWeight="600">动物的分层：树冠层鸟类·灌木层昆虫·地下蚯蚓线虫</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">群落的垂直结构（分层现象）· 提高对阳光等资源的利用</text>
    </svg>
  );
}

function EcosystemTypesSvg({ active }: { active: number | null; open?: boolean }) {
  const cards = [
    { x: 20, y: 56, icon: '🌲', title: '森林', note: '动植物种类最多·调节能力强', color: '#3f7f3a' },
    { x: 190, y: 56, icon: '🐂', title: '草原', note: '以草本为主·干旱半干旱区', color: '#8a9a2a' },
    { x: 360, y: 56, icon: '🐋', title: '海洋', note: '占地球表面积 70%·水圈主体', color: '#2c6e94' },
    { x: 20, y: 212, icon: '🪷', title: '湿地', note: '"地球之肾"·净化水质蓄洪', color: '#4a7a9a' },
    { x: 190, y: 212, icon: '🌾', title: '农田', note: '人工建立的·抵抗力弱', color: '#a5761d' },
    { x: 360, y: 212, icon: '🏙️', title: '城市', note: '人类主导·依赖外部输入', color: '#6a5a6a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {cards.map((c, i) => (
        <g key={c.title} style={dim(active, i)}>
          <rect x={c.x} y={c.y} width="140" height="128" rx="14" fill="#ffffff" stroke="#13333a" strokeWidth="2.4" />
          <text x={c.x + 70} y={c.y + 44} textAnchor="middle" fontSize="30">{c.icon}</text>
          <text x={c.x + 70} y={c.y + 74} textAnchor="middle" fontSize="14.5" fill={c.color} fontWeight="800">{c.title}生态系统</text>
          <text x={c.x + 70} y={c.y + 98} textAnchor="middle" fontSize="10.5" fill="#59767c">{c.note.split('·')[0]}</text>
          <text x={c.x + 70} y={c.y + 114} textAnchor="middle" fontSize="10.5" fill="#59767c">{c.note.split('·')[1] ?? ''}</text>
        </g>
      ))}
      <g style={dim(active, 3)}>
        <text x="260" y="366" textAnchor="middle" fontSize="12.5" fill="#49676d" fontWeight="700">生物圈是地球上最大的生态系统——它包含所有这些类型</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">生态系统的常见类型 · 每一种都是一座"生命工厂"</text>
    </svg>
  );
}

function SpeciesRelationsSvg({ active }: { active: number | null; open?: boolean }) {
  // 四象限：竞争 / 捕食 / 寄生 / 互利共生
  const quadrant = (x: number, y: number, title: string, titleColor: string, body: React.ReactNode) => (
    <g>
      <rect x={x} y={y} width="230" height="140" rx="12" fill="#ffffff" stroke="#13333a" strokeWidth="2.4" />
      <text x={x + 115} y={y + 28} textAnchor="middle" fontSize="14" fill={titleColor} fontWeight="800">{title}</text>
      {body}
    </g>
  );
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 竞争（左上） */}
      <g style={dim(active, 0)}>
        {quadrant(14, 20, '竞争（both harmed）', '#a5761d', (
          <>
            <path d="M40 88 Q 60 76 80 88 L 80 104 Q 60 114 40 104 Z" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2" />
            <path d="M128 88 Q 148 76 168 88 L 168 104 Q 148 114 128 104 Z" fill="#a8cf98" stroke="#3f7f3a" strokeWidth="2" />
            <path d="M104 96 L122 96" stroke="#b0483a" strokeWidth="2.6" markerEnd="url(#sr-r)" />
            <path d="M122 108 L104 108" stroke="#b0483a" strokeWidth="2.6" markerEnd="url(#sr-r)" />
            <text x="129" y="140" textAnchor="middle" fontSize="12" fill="#6a5a2a">水稻与稗草争夺阳光水肥</text>
          </>
        ))}
      </g>
      {/* 捕食（右上） */}
      <g style={dim(active, 1)}>
        {quadrant(276, 20, '捕食（one eats）', '#b0483a', (
          <>
            <path d="M306 96 Q 330 84 350 98 Q 342 112 318 110 Q 304 106 306 96 Z" fill="#e8a06a" stroke="#a5533c" strokeWidth="2" />
            <circle cx="342" cy="94" r="3" fill="#13333a" />
            <path d="M382 96 Q 402 86 416 98 L 416 112 Q 400 118 382 112 Z" fill="#c9a882" stroke="#8a6a3a" strokeWidth="2" />
            <path d="M354 100 L372 100" stroke="#b0483a" strokeWidth="2.6" markerEnd="url(#sr-r)" />
            <text x="391" y="140" textAnchor="middle" fontSize="12" fill="#6a3a2a">猫捕食老鼠</text>
          </>
        ))}
      </g>
      {/* 寄生（左下） */}
      <g style={dim(active, 2)}>
        {quadrant(14, 178, '寄生（one harms）', '#7a4a8a', (
          <>
            <path d="M60 240 Q 100 224 140 240 L 140 260 Q 100 274 60 260 Z" fill="#e8c0b8" stroke="#b0483a" strokeWidth="2" />
            <circle cx="118" cy="240" r="12" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
            <path d="M116 228 q -4 -8 4 -12" fill="none" stroke="#7a4a8a" strokeWidth="2" />
            <text x="129" y="296" textAnchor="middle" fontSize="12" fill="#5a3a6a">蛔虫寄生在人体肠道</text>
          </>
        ))}
      </g>
      {/* 互利共生（右下） */}
      <g style={dim(active, 3)}>
        {quadrant(276, 178, '互利共生（both win）', '#2f7a4d', (
          <>
            <path d="M312 238 Q 328 224 344 240 Q 332 254 312 246 Z" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="2" />
            <path d="M338 232 q 16 -18 38 -12" fill="none" stroke="#4d7ea8" strokeWidth="3" strokeLinecap="round" />
            <circle cx="382" cy="216" r="7" fill="#f4d06a" stroke="#b5953a" strokeWidth="1.8" />
            <text x="391" y="296" textAnchor="middle" fontSize="12" fill="#2f6a3a">豆科植物与根瘤菌固氮</text>
          </>
        ))}
      </g>
      <defs>
        <marker id="sr-r" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#b0483a" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">种间关系四种类型 · 群落中生物的相互作用</text>
    </svg>
  );
}

function BiosphereSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 大气圈 */}
      <g style={dim(active, 0)}>
        <path d="M20 70 Q 260 30 500 70 L500 30 Q 260 -10 20 30 Z" fill="#d8e8f4" stroke="#7a9ac9" strokeWidth="2.5" />
        <text x="36" y="62" fontSize="13" fill="#3d6a94" fontWeight="700">大气圈（底部有飞行生物·气体与温度）</text>
      </g>
      {/* 水圈 */}
      <g style={dim(active, 1)}>
        <path d="M20 236 Q 260 214 500 236 L500 130 Q 260 108 20 130 Z" fill="#b8d4ea" stroke="#4d7ea8" strokeWidth="2.5" />
        <path d="M60 170 Q 110 158 160 170 T 260 170 T 360 170 T 460 170" fill="none" stroke="#8ab8d8" strokeWidth="2" />
        <ellipse cx="140" cy="196" rx="16" ry="9" fill="#5a8ac9" />
        <path d="M136 190 Q 140 178 150 172" fill="none" stroke="#3d6a94" strokeWidth="2.4" />
        <text x="36" y="148" fontSize="13" fill="#2c5a84" fontWeight="700">水圈（全部海洋与江河湖泊·鱼类等）</text>
      </g>
      {/* 岩石圈（地表） */}
      <g style={dim(active, 2)}>
        <path d="M20 322 Q 260 300 500 322 L500 236 Q 260 214 20 236 Z" fill="#c8e2ba" stroke="#4a8a3a" strokeWidth="2.5" />
        <path d="M20 322 Q 260 300 500 322 L500 380 L20 380 Z" fill="#c9b88a" stroke="#8a7a4a" strokeWidth="2.5" />
        {/* 树 */}
        {[60, 150, 440].map((x, i) => (
          <g key={i}>
            <path d={`M${x} 322 L${x} 284`} stroke="#7a5a3a" strokeWidth="6" />
            <circle cx={x} cy={272} r="24" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2.5" />
          </g>
        ))}
        <text x="36" y="266" fontSize="13" fill="#2f7a4d" fontWeight="700">岩石圈表面（土壤·绝大多数生物聚集的"办公楼"）</text>
        <text x="230" y="366" fontSize="12.5" fill="#6a5a2a" fontWeight="600">岩石圈表层（土壤中也有微生物）</text>
      </g>
      {/* 范围说明 */}
      <g style={dim(active, 3)}>
        <path d="M470 336 Q 486 320 480 300" fill="none" stroke="#49676d" strokeWidth="1.4" />
        <text x="36" y="86" fontSize="12.5" fill="#49676d" fontWeight="700">生物圈的范围：</text>
        <text x="36" y="104" fontSize="12" fill="#49676d">大气圈底部+水圈全部+岩石圈表面</text>
      </g>
      <text x="508" y="16" textAnchor="end" fontSize="12.5" fill="#799398">生物圈结构示意图 · 地球上所有生物与其环境的总和</text>
    </svg>
  );
}

function EvolutionTreeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 主干（时间轴自下而上） */}
      <g style={dim(active, 0)}>
        <path d="M70 330 L70 110 Q 70 70 110 66 L 180 60" fill="none" stroke="#7a5a3a" strokeWidth="7" strokeLinecap="round" />
        <path d="M150 218 Q 200 214 246 210" fill="none" stroke="#7a5a3a" strokeWidth="6" strokeLinecap="round" />
        <path d="M240 300 L246 210" fill="none" stroke="#7a5a3a" strokeWidth="6" strokeLinecap="round" />
        <path d="M246 210 Q 300 200 356 196" fill="none" stroke="#7a5a3a" strokeWidth="5" strokeLinecap="round" />
        <path d="M356 196 Q 400 192 430 170" fill="none" stroke="#7a5a3a" strokeWidth="4" strokeLinecap="round" />
        <text x="26" y="344" fontSize="12.5" fill="#7a5a3a" fontWeight="700">共同原始祖先</text>
        <text x="14" y="132" fontSize="12.5" fill="#7a5a3a" fontWeight="700">时间 →</text>
        <path d="M24 122 L46 122" stroke="#7a5a3a" strokeWidth="2.4" markerEnd="url(#et-arrow)" />
      </g>
      {/* 分支端点生物 */}
      <g style={dim(active, 1)}>
        {/* 原始生命→蓝细菌等 */}
        <circle cx="70" cy="240" r="10" fill="#8ac9a8" stroke="#3f7f5a" strokeWidth="2" />
        <text x="36" y="266" fontSize="12.5" fill="#3f7f5a" fontWeight="600">原始生命</text>
        <text x="196" y="330" fontSize="12.5" fill="#3f7f5a" fontWeight="600">菌类·藻类等</text>
        {/* 植物 */}
        <path d="M180 46 Q 202 30 226 40 Q 224 58 200 60 Q 186 58 180 46 Z" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="96" y="24" fontSize="12.5" fill="#2f7a4d" fontWeight="700">植物界（自养）</text>
        {/* 动物线：无脊椎 → 脊椎 */}
        <circle cx="262" cy="176" r="9" fill="#e8b890" stroke="#a5603a" strokeWidth="2" />
        <text x="276" y="182" fontSize="12" fill="#a5603a" fontWeight="600">无脊椎动物</text>
        <text x="262" y="144" fontSize="12.5" fill="#2c6e94" fontWeight="700">脊椎动物</text>
        <text x="262" y="162" fontSize="12" fill="#2c6e94">鱼类→两栖→爬行→鸟·哺乳</text>
        {/* 真菌 */}
        <text x="360" y="222" fontSize="12.5" fill="#8a671b" fontWeight="600">真菌界</text>
        <path d="M356 198 Q 366 210 372 218" fill="none" stroke="#7a5a3a" strokeWidth="3" />
      </g>
      {/* 五界/多样性提示 */}
      <g style={dim(active, 2)}>
        <text x="420" y="66" fontSize="13" fill="#13333a" fontWeight="700">生物多样性</text>
        <text x="420" y="84" fontSize="12.5" fill="#49676d">是长期进化的结果</text>
        <path d="M436 96 Q 442 110 430 122" fill="none" stroke="#49676d" strokeWidth="1.4" />
      </g>
      {/* 大事件标记 */}
      <g style={dim(active, 2)}>
        <text x="86" y="212" fontSize="12.5" fill="#49676d" fontWeight="600">约 35 亿年前：</text>
        <text x="86" y="230" fontSize="12.5" fill="#49676d">最早的原核生物出现</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">生物进化树 · 现代生物由共同祖先进化而来</text>
    </svg>
  );
}

function TaxonomyLevelSvg({ active }: { active: number | null; open?: boolean }) {
  // 七级分类阶梯（以"虎"为例）
  const levels = [
    { name: '界', val: '动物界', note: '最大单位·生物种类最多' },
    { name: '门', val: '脊索动物门', note: '' },
    { name: '纲', val: '哺乳纲', note: '' },
    { name: '目', val: '食肉目', note: '' },
    { name: '科', val: '猫科', note: '' },
    { name: '属', val: '豹属', note: '' },
    { name: '种', val: '虎', note: '最小单位·可繁殖' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {levels.map((lv, i) => {
        const y = 46 + i * 44;
        const indent = i * 28;
        return (
          <g key={lv.name} style={dim(active, Math.min(6, Math.max(0, 6 - i)))}>
            <rect x={40 + indent} y={y} width={200 - indent} height="34" rx={i === 0 ? 17 : 6} fill={i === 0 ? '#c8e2ba' : i === 6 ? '#f4c76a' : '#e2ecf4'} stroke="#13333a" strokeWidth="2" />
            <text x={62 + indent} y={y + 23} fontSize="13" fill="#13333a" fontWeight="800">
              {lv.name} · {lv.val}
            </text>
            {lv.note ? (
              <text x={244 + indent} y={y + 23} fontSize="12" fill="#8a671b" fontWeight="600">
                {lv.note}
              </text>
            ) : null}
          </g>
        );
      })}
      {/* 越小越亲提示 */}
      <g style={dim(active, 0)}>
        <path d="M32 62 L32 330" stroke="#9ab0b5" strokeWidth="0" />
        <text x="330" y="366" fontSize="12.5" fill="#49676d" fontWeight="700">分类单位越小，亲缘关系越近</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">生物分类七等级（以虎为例）· 界门纲目科属种</text>
    </svg>
  );
}

function EcosystemComponentsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 非生物的物质和能量（中央） */}
      <g style={dim(active, 3)}>
        <rect x="196" y="158" width="128" height="64" rx="14" fill="#fdf1cf" stroke="#b5953a" strokeWidth="3" />
        <text x="260" y="184" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="800">非生物的物质</text>
        <text x="260" y="206" textAnchor="middle" fontSize="12.5" fill="#8a671b">和能量（阳光·水·空气）</text>
      </g>
      {/* 生产者（左上） */}
      <g style={dim(active, 0)}>
        <path d="M96 92 Q 88 56 108 40 Q 122 58 118 92 Q 106 102 96 92 Z" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2.5" />
        <path d="M118 92 Q 122 60 142 50 Q 146 76 132 94 Q 124 98 118 92 Z" fill="#a8cf98" stroke="#3f7f3a" strokeWidth="2.5" />
        <path d="M106 96 L106 118" stroke="#4a7a3a" strokeWidth="4" />
        <text x="52" y="46" fontSize="13" fill="#2f7a4d" fontWeight="700">生产者（绿色植物）</text>
        <text x="52" y="64" fontSize="12.5" fill="#2f7a4d">制造有机物·能量入口</text>
        <line x1="128" y1="70" x2="176" y2="152" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 消费者（右上） */}
      <g style={dim(active, 1)}>
        <ellipse cx="404" cy="78" rx="40" ry="26" fill="#e8b890" stroke="#a5603a" strokeWidth="2.5" />
        <circle cx="382" cy="66" r="4" fill="#13333a" />
        <path d="M366 70 Q 344 60 336 48" fill="none" stroke="#a5603a" strokeWidth="3" strokeLinecap="round" />
        <path d="M404 104 Q 404 124 392 136" fill="none" stroke="#a5603a" strokeWidth="6" strokeLinecap="round" />
        <text x="374" y="42" fontSize="13" fill="#a5603a" fontWeight="700">消费者（动物）</text>
        <line x1="386" y1="70" x2="330" y2="168" stroke="#a5603a" strokeWidth="1.4" />
      </g>
      {/* 分解者（左下） */}
      <g style={dim(active, 2)}>
        <path d="M78 272 Q 96 250 118 266 Q 138 252 152 272 Q 132 288 112 280 Q 94 290 78 272 Z" fill="#c9a882" stroke="#8a671b" strokeWidth="2.5" />
        <path d="M96 258 L92 240 M124 256 L130 238" stroke="#8a671b" strokeWidth="2" />
        <circle cx="130" cy="292" r="7" fill="#f4d06a" stroke="#8a671b" strokeWidth="1.8" />
        <text x="36" y="316" fontSize="13" fill="#8a671b" fontWeight="700">分解者（细菌·真菌）</text>
        <text x="36" y="334" fontSize="12.5" fill="#8a671b">分解有机物归无机环境</text>
        <line x1="150" y1="306" x2="196" y2="232" stroke="#8a671b" strokeWidth="1.4" />
      </g>
      {/* 物质流动箭头 */}
      <g style={dim(active, 3)}>
        <path d="M138 116 Q 170 136 194 158" fill="none" stroke="#3f7f3a" strokeWidth="2.6" markerEnd="url(#ec-arrow)" />
        <text x="136" y="136" fontSize="11" fill="#3f7f3a" fontWeight="600">光合</text>
        <path d="M246 158 Q 280 132 342 104" fill="none" stroke="#8a671b" strokeWidth="2.4" strokeDasharray="6 4" markerEnd="url(#ec-arrow)" />
        <text x="272" y="130" fontSize="11" fill="#8a671b">捕食</text>
        <path d="M392 108 Q 330 180 266 208" fill="none" stroke="#a5603a" strokeWidth="2.2" markerEnd="url(#ec-arrow)" />
        <path d="M196 216 Q 150 244 128 264" fill="none" stroke="#4a9a8a" strokeWidth="2.2" markerEnd="url(#ec-arrow)" />
        <text x="128" y="236" fontSize="11" fill="#4a9a8a" fontWeight="600">遗体·排遗</text>
        <path d="M150 280 Q 190 250 196 226" fill="none" stroke="#4a9a8a" strokeWidth="2.2" strokeDasharray="6 4" markerEnd="url(#ec-arrow)" />
        <text x="96" y="248" fontSize="11" fill="#4a9a8a">无机物回流</text>
        <text x="150" y="358" fontSize="12.5" fill="#49676d" fontWeight="600">四类成分缺一不可（除特殊生态系统）</text>
      </g>
      <defs>
        <marker id="ec-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#5a7a6a" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">生态系统组成成分关系图 · 物质循环与能量流动的框架</text>
    </svg>
  );
}

function EnergyPyramidSvg({ active }: { active: number | null; open?: boolean }) {
  const layers = [
    { label: '三级消费者', sub: '第四营养级', w: 96, y: 84, fill: '#e8a8a0', pct: '约 0.5%' },
    { label: '次级消费者', sub: '第三营养级', w: 176, y: 138, fill: '#f0c98a', pct: '约 3%' },
    { label: '初级消费者', sub: '第二营养级', w: 260, y: 192, fill: '#b8d4a8', pct: '约 15%' },
    { label: '生产者', sub: '第一营养级', w: 344, y: 246, fill: '#8fbf8a', pct: '100%（基准）' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {layers.map((l, i) => (
        <g key={l.label} style={dim(active, i)}>
          <path d={`M${260 - l.w / 2} ${l.y + 48} L${260 - l.w / 2 + 20} ${l.y} L${260 + l.w / 2 - 20} ${l.y} L${260 + l.w / 2} ${l.y + 48} Z`}
            fill={l.fill} stroke="#5f7076" strokeWidth="2.5" />
          <text x="260" y={l.y + 22} textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">{l.label}（{l.sub}）</text>
          <text x="260" y={l.y + 40} textAnchor="middle" fontSize="12.5" fill="#4b6c73">相对能量 {l.pct}</text>
          {i < layers.length - 1 ? (
            <text x="428" y={l.y + 46} fontSize="12" fill="#8a671b">传递 10%~20%</text>
          ) : null}
        </g>
      ))}
      {/* 呼吸散失箭头 */}
      <g style={dim(active, 1)}>
        <path d="M76 220 Q 54 170 70 116" fill="none" stroke="#b0483a" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#pyr-arrow)" />
        <text x="16" y="100" fontSize="12.5" fill="#b0483a" fontWeight="700">呼吸</text>
        <text x="16" y="116" fontSize="12.5" fill="#b0483a" fontWeight="700">散失</text>
      </g>
      <defs>
        <marker id="pyr-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#b0483a" />
        </marker>
      </defs>
      <text x="16" y="46" fontSize="13.5" fill="#2c6e94" fontWeight="700">营养级越高、能量越少——所以金字塔一般不超过 4~5 个营养级</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">生态系统能量金字塔模式图</text>
    </svg>
  );
}

function FoodWebSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 生产者：草 */}
      <g style={dim(active, 0)}>
        {[[80, 268], [100, 268], [120, 268]].map(([x, y], i) => (
          <g key={i} stroke="#3f7f3a" strokeWidth="3.5" strokeLinecap="round">
            <line x1={x} y1={y} x2={x - 8} y2={y - 34} />
            <line x1={x} y1={y} x2={x} y2={y - 42} />
            <line x1={x} y1={y} x2={x + 8} y2={y - 34} />
          </g>
        ))}
        <text x="100" y="292" textAnchor="middle" fontSize="13.5" fill="#2f7a4d" fontWeight="700">草（生产者）</text>
      </g>
      {/* 初级消费者 */}
      <g style={dim(active, 1)}>
        <ellipse cx="252" cy="94" rx="30" ry="19" fill="#e8c9a8" stroke="#b58a5f" strokeWidth="3" />
        <circle cx="278" cy="84" r="10" fill="#e8c9a8" stroke="#b58a5f" strokeWidth="2.5" />
        <path d="M240 110 L240 118 M266 110 L266 118" stroke="#b58a5f" strokeWidth="3.5" />
        <text x="252" y="138" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">兔（初级）</text>
        <ellipse cx="252" cy="222" rx="26" ry="16" fill="#c9c9c9" stroke="#8a8a8a" strokeWidth="3" />
        <circle cx="274" cy="214" r="9" fill="#c9c9c9" stroke="#8a8a8a" strokeWidth="2.5" />
        <text x="252" y="262" textAnchor="middle" fontSize="13.5" fill="#5f7076" fontWeight="700">鼠（初级）</text>
      </g>
      {/* 次级消费者 */}
      <g style={dim(active, 2)}>
        <ellipse cx="392" cy="80" rx="34" ry="18" fill="#e8a878" stroke="#c2703d" strokeWidth="3" />
        <path d="M424 76 Q 436 70 440 60" fill="none" stroke="#c2703d" strokeWidth="3" strokeLinecap="round" />
        <text x="392" y="122" textAnchor="middle" fontSize="13.5" fill="#b0483a" fontWeight="700">狐（次级）</text>
        <ellipse cx="392" cy="228" rx="32" ry="14" fill="#8fbf6f" stroke="#3f7f4f" strokeWidth="3" transform="rotate(-12 392 228)" />
        <circle cx="366" cy="216" r="8" fill="#8fbf6f" stroke="#3f7f4f" strokeWidth="2.5" />
        <text x="392" y="270" textAnchor="middle" fontSize="13.5" fill="#3f7f4f" fontWeight="700">蛇（次级）</text>
      </g>
      {/* 三级消费者 */}
      <g style={dim(active, 3)}>
        <ellipse cx="466" cy="164" rx="26" ry="16" fill="#8a7a5a" stroke="#5f4f2a" strokeWidth="3" />
        <circle cx="484" cy="152" r="9" fill="#8a7a5a" stroke="#5f4f2a" strokeWidth="2.5" />
        <path d="M478 144 L482 138 M488 144 L484 138" stroke="#5f4f2a" strokeWidth="2.5" strokeLinecap="round" />
        <text x="466" y="206" textAnchor="middle" fontSize="13.5" fill="#5f4f2a" fontWeight="700">鹰（三级）</text>
      </g>
      {/* 捕食箭头 */}
      <g style={dim(active, 0)}>
        <path d="M124 236 Q 176 160 224 104" fill="none" stroke="#5f8a54" strokeWidth="3" markerEnd="url(#fw-arrow)" />
        <path d="M130 254 Q 180 254 226 234" fill="none" stroke="#5f8a54" strokeWidth="3" markerEnd="url(#fw-arrow)" />
        <path d="M284 88 Q 320 76 356 78" fill="none" stroke="#8a671b" strokeWidth="3" markerEnd="url(#fw-arrow)" />
        <path d="M280 106 Q 360 140 442 158" fill="none" stroke="#8a671b" strokeWidth="3" markerEnd="url(#fw-arrow)" />
        <path d="M280 224 Q 320 226 358 228" fill="none" stroke="#5f7076" strokeWidth="3" markerEnd="url(#fw-arrow)" />
        <path d="M280 210 Q 360 180 444 166" fill="none" stroke="#5f7076" strokeWidth="3" markerEnd="url(#fw-arrow)" />
        <path d="M412 216 Q 440 196 456 184" fill="none" stroke="#3f7f4f" strokeWidth="3" markerEnd="url(#fw-arrow)" />
      </g>
      <defs>
        <marker id="fw-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="16" y="46" fontSize="13.5" fill="#2c6e94" fontWeight="700">多条食物链交错成网——网越复杂，生态系统的自我调节能力越强</text>
      <text x="16" y="330" fontSize="13.5" fill="#59767c" fontWeight="600">分解者不进入食物链；箭头代表能量与含碳有机物的流动方向</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">食物网（营养结构）模式图</text>
    </svg>
  );
}

function AgeStructureSvg({ active }: { active: number | null; open?: boolean }) {
  const pyramids = [
    { name: '增长型', cx: 100, trend: '种群密度将增大', color: '#2f7a4d', widths: [26, 44, 62], arrow: '↗' },
    { name: '稳定型', cx: 260, trend: '种群密度保持稳定', color: '#8a671b', widths: [42, 42, 42], arrow: '→' },
    { name: '衰退型', cx: 420, trend: '种群密度将减小', color: '#b0483a', widths: [58, 40, 24], arrow: '↘' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {pyramids.map((p, idx) => (
        <g key={p.name} style={dim(active, idx)}>
          {[0, 1, 2].map((row) => (
            <rect key={row} x={p.cx - p.widths[row] / 2} y={128 + row * 38} width={p.widths[row]} height="30" rx="5" fill={p.color} opacity={1 - row * 0.22} stroke="#5a5a62" strokeWidth="1.8" />
          ))}
          <text x={p.cx} y="112" textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">{p.name} {p.arrow}</text>
          <text x={p.cx} y="250" textAnchor="middle" fontSize="12.5" fill="#4b6c73">{p.trend}</text>
          <text x={p.cx} y="270" textAnchor="middle" fontSize="12" fill="#799398">幼年：成年：老年</text>
        </g>
      ))}
      {/* 图例 */}
      <g style={dim(active, 1)}>
        {[[70, 320], [230, 320], [390, 320]].map(([x, y], i) => (
          <g key={i}>
            <rect x={x - 8} y={y - 12} width="16" height="14" fill="#2f7a4d" opacity={1 - i * 0.22} />
            <text x={x + 14} y={y} fontSize="12" fill="#4b6c73">{['幼年个体', '成年个体', '老年个体'][i]}</text>
          </g>
        ))}
      </g>
      <text x="16" y="66" fontSize="13.5" fill="#2c6e94" fontWeight="700">年龄组成预测种群密度的变化趋势（增长 / 稳定 / 衰退）</text>
      <text x="16" y="356" fontSize="12.5" fill="#59767c" fontWeight="600">注意：年龄组成是"预测"，直接决定种群密度的出生率、死亡率、迁入率、迁出率</text>
    </svg>
  );
}

function CommunityStructureSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 垂直结构 */}
      <g style={dim(active, 0)}>
        <text x="130" y="50" textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">垂直结构（分层）</text>
        <rect x="40" y="256" width="220" height="40" fill="#c9b08a" />
        {/* 乔木 */}
        <rect x="118" y="150" width="10" height="106" fill="#8a6a48" />
        <circle cx="123" cy="128" r="34" fill="#4a8a3a" stroke="#356a2a" strokeWidth="2.5" />
        <text x="168" y="120" fontSize="12.5" fill="#2f5a1e" fontWeight="600">乔木层</text>
        <circle cx="70" cy="216" r="17" fill="#6aaa55" stroke="#3f7f3a" strokeWidth="2" />
        <text x="168" y="196" fontSize="12.5" fill="#3f7f3a" fontWeight="600">灌木层</text>
        {[74, 100, 130, 160, 190, 220].map((x, i) => (
          <g key={i} stroke="#4a8a3a" strokeWidth="2.5" strokeLinecap="round">
            <line x1={x} y1={256} x2={x - 5} y2={240} />
            <line x1={x} y1={256} x2={x} y2={234} />
            <line x1={x} y1={256} x2={x + 5} y2={240} />
          </g>
        ))}
        <text x="196" y="242" fontSize="12.5" fill="#4a8a3a" fontWeight="600">草本层</text>
        <text x="60" y="288" fontSize="12" fill="#5a4a30" fontWeight="600">根系层（土壤）</text>
        <text x="168" y="146" fontSize="12" fill="#5a8a94">鸟</text>
        <text x="40" y="196" fontSize="12" fill="#5a8a94">兽</text>
      </g>
      <line x1="280" y1="60" x2="280" y2="290" stroke="#dceaea" strokeWidth="2" strokeDasharray="6 5" />
      {/* 水平结构 */}
      <g style={dim(active, 1)}>
        <text x="400" y="50" textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">水平结构（镶嵌）</text>
        <path d="M300 260 Q 340 220 380 250 Q 424 282 474 254 L 480 292 L 300 292 Z" fill="#c9b08a" />
        {[[318, 246], [336, 236], [352, 244]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="8" fill="#6aa86a" />
        ))}
        {[[392, 258], [412, 246], [430, 256], [446, 246]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="7" fill="#8fbf6f" />
        ))}
        <circle cx="462" cy="240" r="9" fill="#4c8f5f" />
        <text x="400" y="110" textAnchor="middle" fontSize="12.5" fill="#59767c">地形起伏 · 光照湿度不均</text>
        <text x="400" y="130" textAnchor="middle" fontSize="12.5" fill="#59767c">→ 生物呈斑块状镶嵌分布</text>
        <text x="400" y="156" textAnchor="middle" fontSize="12.5" fill="#4b6c73">同一地段：疏密不同</text>
      </g>
      <g style={dim(active, 0)}>
        <text x="16" y="322" fontSize="13.5" fill="#2c6e94" fontWeight="700">垂直分层显著提高群落利用阳光等资源的能力</text>
        <text x="16" y="344" fontSize="12.5" fill="#59767c">动物的分层取决于植物（食物和栖息空间）——"住什么层，看吃什么"</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">群落的空间结构模式图</text>
    </svg>
  );
}

function BioaccumulationSvg({ active }: { active: number | null; open?: boolean }) {
  const links = [
    { name: '水', conc: '0.00001 ppm', w: 14, color: '#9fc4d8' },
    { name: '浮游生物', conc: '0.01 ppm', w: 44, color: '#7fb88a' },
    { name: '小鱼', conc: '0.5 ppm', w: 96, color: '#e0b06a' },
    { name: '大鱼', conc: '2 ppm', w: 150, color: '#e07a5a' },
    { name: '人（顶位）', conc: '10+ ppm', w: 230, color: '#b0483a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {links.map((l, i) => (
        <g key={l.name} style={dim(active, i === 0 ? 0 : 1)}>
          <rect x={26} y={70 + i * 56} width={l.w} height={34} rx={6} fill={l.color} stroke="#5a5a62" strokeWidth="2" style={{ transition: 'width 0.4s ease' }} />
          <text x={26 + l.w + 12} y={92 + i * 56} fontSize="13.5" fill="#173b42" fontWeight="700">{l.name}</text>
          <text x={26 + l.w + 12} y={92 + i * 56 + 18} fontSize="12" fill="#59767c">汞浓度 {l.conc}</text>
          {i < links.length - 1 ? (
            <path d={`M${26 + l.w / 2} ${104 + i * 56} L${26 + links[i + 1].w / 2} ${126 + i * 56}`} fill="none" stroke="#8aa1a6" strokeWidth="2.5" markerEnd="url(#ba-arrow)" />
          ) : null}
        </g>
      ))}
      <g style={dim(active, 1)}>
        <text x="300" y="80" fontSize="13.5" fill="#b0483a" fontWeight="700">每上一个营养级浓缩数倍~数十倍</text>
        <text x="300" y="100" fontSize="12.5" fill="#59767c">重金属 / DDT 难分解、难排出</text>
        <text x="300" y="118" fontSize="12.5" fill="#59767c">→ 沿食物链越积越多（生物富集）</text>
        <text x="300" y="148" fontSize="13" fill="#8a671b" fontWeight="700">启示：顶级消费者的风险最大；</text>
        <text x="300" y="166" fontSize="13" fill="#8a671b" fontWeight="700">水俣病正是汞富集的悲剧</text>
      </g>
      <g style={dim(active, 0)}>
        <text x="16" y="46" fontSize="13.5" fill="#2c6e94" fontWeight="700">能量逐级递减，有害物质却逐级递增——两条曲线方向相反</text>
      </g>
      <defs>
        <marker id="ba-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">生物富集效应图解（课外拓展）</text>
    </svg>
  );
}

export const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {
  ecosystemServices: { Svg: EcosystemServicesSvg },
  mangrove: { Svg: MangroveSvg },
  greenhouseEffect: { Svg: GreenhouseEffectSvg },
  livingFossil: { Svg: LivingFossilSvg },
  fiveKingdoms: { Svg: FiveKingdomsSvg },
  photoperiodism: { Svg: PhotoperiodismSvg },
  biodiversity: { Svg: BiodiversitySvg },
  verticalLayers: { Svg: VerticalLayersSvg },
  ecosystemTypes: { Svg: EcosystemTypesSvg },
  speciesRelations: { Svg: SpeciesRelationsSvg },
  biosphere: { Svg: BiosphereSvg },
  evolutionTree: { Svg: EvolutionTreeSvg },
  taxonomyLevel: { Svg: TaxonomyLevelSvg },
  ecosystemComponents: { Svg: EcosystemComponentsSvg },
  energyPyramid: { Svg: EnergyPyramidSvg },
  foodWeb: { Svg: FoodWebSvg },
  ageStructure: { Svg: AgeStructureSvg },
  communityStructure: { Svg: CommunityStructureSvg },
  bioaccumulation: { Svg: BioaccumulationSvg },
};
