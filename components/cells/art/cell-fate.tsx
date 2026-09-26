'use client';

import type { ComponentType } from 'react';
import { dim, type ArtProps } from '@/components/cells/art-shared';

function TelomereSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 染色体端粒 */}
      <g style={dim(active, 0)}>
        <path d="M150 150 q -8 -34 30 -40 q 44 -8 60 20 l 60 100 q 10 34 -28 42 q -44 10 -62 -18 Z" fill="#c9a8d8" stroke="#7a4a8a" strokeWidth="3" />
        <rect x="146" y="102" width="70" height="26" rx="12" fill="#e8a03a" stroke="#8a671b" strokeWidth="2.4" transform="rotate(-10 181 115)" />
        <text x="62" y="92" fontSize="12.5" fill="#8a671b" fontWeight="700">端粒：染色体末端的"保护帽"</text>
        <text x="62" y="112" fontSize="12.5" fill="#8a671b">（重复 DNA 序列·像鞋带头）</text>
        <line x1="140" y1="104" x2="168" y2="108" stroke="#8a671b" strokeWidth="1.2" />
      </g>
      {/* 每次分裂缩短 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path d={`M${300 + i * 62} 120 v 44`} stroke="#7a4a8a" strokeWidth="7" strokeLinecap="round" />
            <rect x={292 + i * 62} y={106 - i * 10} width="16" height={12 + i * 0} rx="5" fill="#e8a03a" stroke="#8a671b" strokeWidth="1.6" />
            <text x={308 + i * 62} y={104 - i * 10} fontSize="9.5" fill="#59767c">{i === 0 ? '新细胞' : i === 1 ? '分裂25次' : '分裂50次'}</text>
          </g>
        ))}
        <text x="60" y="205" fontSize="12.5" fill="#8a671b" fontWeight="700">每次分裂端粒缩短一截</text>
        <text x="60" y="225" fontSize="12.5" fill="#8a671b">短到临界 → 细胞停止分裂（Hayflick 极限）</text>
      </g>
      {/* 端粒酶 */}
      <g style={dim(active, 2)}>
        <ellipse cx="120" cy="270" rx="30" ry="20" fill="#7ab86a" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="120" y="275" textAnchor="middle" fontSize="9.5" fill="#fff" fontWeight="700">端粒酶</text>
        <text x="60" y="316" fontSize="12.5" fill="#2f6f2a" fontWeight="700">生殖细胞和癌细胞有端粒酶（修复端粒→近乎不死）</text>
        <text x="60" y="336" fontSize="12.5" fill="#2f6f2a">正常体细胞几乎没有——衰老的"分子时钟"</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">细胞衰老特征：水分减少·酶活性降低·色素积累·膜通透性改变——与个体衰老不同步</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">端粒 · 细胞寿命的"倒计时器"（课外拓展）</text>
    </svg>
  );
}

function ApoptosisVsNecrosisSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <rect x="14" y="56" width="230" height="230" rx="14" fill="#eaf4ea" stroke="#4a9a5a" strokeWidth="2.4" />
        <text x="129" y="82" textAnchor="middle" fontSize="14" fill="#2f7a4d" fontWeight="800">细胞凋亡</text>
        <circle cx="70" cy="130" r="24" fill="#c8e2ba" stroke="#3f7f3a" strokeWidth="2" />
        <circle cx="70" cy="130" r="10" fill="#8a671b" opacity="0.6" />
        <text x="70" y="170" textAnchor="middle" fontSize="10" fill="#59767c">正常</text>
        <path d="M100 132 L 136 132" stroke="#59767c" strokeWidth="2" markerEnd="url(#an-arrow)" />
        <path d="M150 126 Q 168 118 174 134 Q 178 148 164 152 Q 146 156 142 142 Q 140 132 150 126 Z" fill="#c8e2ba" stroke="#3f7f3a" strokeWidth="2" />
        <text x="158" y="176" textAnchor="middle" fontSize="10" fill="#59767c">皱缩·核浓缩</text>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={246 - i * 4} cy={162 + i * 8} r={10 - i * 2} fill="#c8e2ba" stroke="#3f7f3a" strokeWidth="1.8" />
        ))}
        <text x="200" y="198" textAnchor="middle" fontSize="10" fill="#59767c">形成凋亡小体 → 被吞噬</text>
        <text x="129" y="248" textAnchor="middle" fontSize="12" fill="#2f7a4d" fontWeight="800">基因调控 · 主动 · 对机体有利</text>
      </g>
      <g style={dim(active, 1)}>
        <rect x="276" y="56" width="230" height="230" rx="14" fill="#fdeaea" stroke="#b0483a" strokeWidth="2.4" />
        <text x="391" y="82" textAnchor="middle" fontSize="14" fill="#8a2a1a" fontWeight="800">细胞坏死</text>
        <ellipse cx="391" cy="150" rx="42" ry="34" fill="#f2c8c0" stroke="#b0483a" strokeWidth="2.5" />
        <circle cx="386" cy="148" r="8" fill="#8a2a1a" opacity="0.4" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={430 + (i % 2) * 14} cy={140 + i * 16} r="4" fill="#e8b8b0" stroke="#b0483a" strokeWidth="1.2" />
        ))}
        <text x="391" y="200" textAnchor="middle" fontSize="11" fill="#8a2a1a">膜破裂 · 内容物外溢</text>
        <text x="391" y="248" textAnchor="middle" fontSize="12" fill="#8a2a1a" fontWeight="800">被动 · 引发炎症反应</text>
        <text x="391" y="268" textAnchor="middle" fontSize="11" fill="#b0483a">例：烫伤 · 冻伤 · 缺血损伤</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="40" y="316" width="440" height="46" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="336" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">核心区别：凋亡 = 基因调控的"程序性死亡"（对机体有利）；坏死 = 被动损伤（引发炎症）</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">两者都受环境影响，但凋亡是由基因决定的细胞自动结束生命的过程</text>
      </g>
      <defs>
        <marker id="an-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#59767c" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">细胞凋亡 vs 细胞坏死 · 必修 1 细胞命运</text>
    </svg>
  );
}

function StemCellsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 全能干细胞 */}
      <g style={dim(active, 0)}>
        <circle cx="100" cy="90" r="34" fill="#d8c8ee" stroke="#7a4a8a" strokeWidth="3" />
        <circle cx="100" cy="90" r="16" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="1.8" />
        <text x="100" y="142" textAnchor="middle" fontSize="12.5" fill="#6a4a9a" fontWeight="800">受精卵（全能）</text>
        <text x="100" y="160" textAnchor="middle" fontSize="11" fill="#6a4a9a">能发育成完整个体</text>
      </g>
      {/* 分化箭头 */}
      <g style={dim(active, 0)}>
        <path d="M140 90 L 208 90" fill="none" stroke="#59767c" strokeWidth="2.6" markerEnd="url(#sc-arrow)" />
        <text x="172" y="80" textAnchor="middle" fontSize="10.5" fill="#59767c" fontWeight="600">分裂分化</text>
      </g>
      {/* 多能干细胞 */}
      <g style={dim(active, 1)}>
        <circle cx="250" cy="90" r="28" fill="#c8e2d8" stroke="#2f7a6a" strokeWidth="3" />
        <text x="250" y="146" textAnchor="middle" fontSize="12.5" fill="#2f7a6a" fontWeight="800">胚胎干细胞（多能）</text>
      </g>
      {/* 三分支 */}
      <g style={dim(active, 2)}>
        <path d="M262 116 Q 320 140 368 168" fill="none" stroke="#59767c" strokeWidth="2.4" markerEnd="url(#sc-arrow)" />
        <path d="M268 100 Q 330 108 396 122" fill="none" stroke="#59767c" strokeWidth="2.4" markerEnd="url(#sc-arrow)" />
        <path d="M262 78 Q 320 62 386 62" fill="none" stroke="#59767c" strokeWidth="2.4" markerEnd="url(#sc-arrow)" />
        <rect x="380" y="150" width="118" height="36" rx="8" fill="#f2c8c0" stroke="#b0483a" strokeWidth="2" />
        <text x="439" y="174" textAnchor="middle" fontSize="11.5" fill="#8a2a1a" fontWeight="700">肌肉细胞</text>
        <rect x="396" y="98" width="102" height="36" rx="8" fill="#c8e2ba" stroke="#3f7f3a" strokeWidth="2" />
        <text x="447" y="122" textAnchor="middle" fontSize="11.5" fill="#2f5a1e" fontWeight="700">神经细胞</text>
        <rect x="292" y="40" width="102" height="36" rx="8" fill="#c8d8e8" stroke="#3d6a94" strokeWidth="2" />
        <text x="343" y="64" textAnchor="middle" fontSize="11.5" fill="#1e4a68" fontWeight="700">上皮细胞</text>
      </g>
      {/* 说明 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="300" width="440" height="56" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="322" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">干细胞：保留分裂分化能力的"未分化细胞"——骨髓造血干细胞已用于白血病治疗</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">分化方向：受细胞内基因表达调控 + 周围环境信号共同决定</text>
      </g>
      <defs>
        <marker id="sc-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#59767c" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">干细胞与细胞分化 · 全能性逐级收窄（课外拓展）</text>
    </svg>
  );
}

function CancerCellSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 正常细胞（左） */}
      <g style={dim(active, 0)}>
        <rect x="40" y="90" width="150" height="110" rx="20" fill="#cfe8f4" stroke="#3d6a94" strokeWidth="3" />
        <circle cx="115" cy="145" r="24" fill="#a8c8e2" stroke="#3d6a94" strokeWidth="2.2" />
        <text x="115" y="228" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="800">正常细胞</text>
        <text x="115" y="250" textAnchor="middle" fontSize="12" fill="#2c5a84">圆形规则 · 核小 · 能黏连成片</text>
        <text x="115" y="270" textAnchor="middle" fontSize="12" fill="#2c5a84">有限分裂（接触抑制）</text>
      </g>
      {/* 对比箭头 */}
      <g style={dim(active, 1)}>
        <path d="M210 140 L 278 140" fill="none" stroke="#b0483a" strokeWidth="3.5" markerEnd="url(#cc-arrow)" />
        <text x="244" y="126" textAnchor="middle" fontSize="11.5" fill="#b0483a" fontWeight="700">致癌因子</text>
        <text x="244" y="160" textAnchor="middle" fontSize="11" fill="#b0483a">物理·化学·病毒</text>
      </g>
      {/* 癌细胞（右） */}
      <g style={dim(active, 2)}>
        <path d="M300 100 Q 310 68 350 78 Q 400 62 428 100 Q 452 130 420 158 Q 436 196 396 210 Q 352 232 318 204 Q 284 178 300 148 Q 286 120 300 100 Z" fill="#f2c8c0" stroke="#b0483a" strokeWidth="3" />
        <path d="M352 120 Q 380 108 392 132 Q 400 156 372 166 Q 346 170 342 146 Q 340 128 352 120 Z" fill="#7a4a8a" stroke="#4a2a6a" strokeWidth="2.2" />
        <path d="M300 96 Q 310 78 330 84 M424 108 Q 440 96 442 116" fill="none" stroke="#b0483a" strokeWidth="2.4" strokeLinecap="round" />
        <text x="366" y="248" textAnchor="middle" fontSize="13" fill="#8a2a1a" fontWeight="800">癌细胞</text>
      </g>
      {/* 三大特征 */}
      <g style={dim(active, 3)}>
        <rect x="60" y="290" width="400" height="66" rx="12" fill="#fff2ed" stroke="#b0483a" strokeWidth="2.4" />
        <text x="260" y="314" textAnchor="middle" fontSize="12.5" fill="#8a2a1a" fontWeight="800">癌细胞三大特征：无限增殖 · 形态结构显著改变 · 表面糖蛋白减少（易分散转移）</text>
        <text x="260" y="340" textAnchor="middle" fontSize="11.5" fill="#a5603a">致癌因子引起原癌基因与抑癌基因突变 → 细胞变成不受控制的"永生"细胞</text>
      </g>
      <defs>
        <marker id="cc-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#b0483a" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">细胞的癌变 · 正常细胞 vs 癌细胞</text>
    </svg>
  );
}

function CellFatesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 衰老 */}
      <g style={dim(active, 0)}>
        <path d="M60 84 Q 40 84 42 116 Q 44 150 66 148 Q 88 150 90 116 Q 92 86 60 84 Z" fill="#e3d9c8" stroke="#8a7a5a" strokeWidth="3" />
        {[56, 64, 72].map((x, i) => (
          <circle key={i} cx={x} cy={132 - i * 10} r="3.5" fill="#7a6a4a" />
        ))}
        <circle cx="66" cy="106" r="7" fill="#8a7a5a" opacity="0.7" />
        <text x="66" y="184" textAnchor="middle" fontSize="13.5" fill="#5f4f2a" fontWeight="700">细胞衰老</text>
        <text x="66" y="204" textAnchor="middle" fontSize="12" fill="#7a6a4a">水分↓ 酶活性↓ 色素积累</text>
        <text x="66" y="222" textAnchor="middle" fontSize="12" fill="#7a6a4a">核增大 · 膜通透性改变</text>
      </g>
      {/* 凋亡 */}
      <g style={dim(active, 1)}>
        <path d="M230 76 Q 202 74 198 104 Q 196 128 216 140 Q 230 154 250 140 Q 272 130 266 104 Q 262 78 230 76 Z" fill="#f4d9c4" stroke="#c2703d" strokeWidth="3" />
        <circle cx="212" cy="96" r="10" fill="#f6d7c4" stroke="#c2703d" strokeWidth="2.5" />
        <circle cx="252" cy="120" r="9" fill="#f6d7c4" stroke="#c2703d" strokeWidth="2.5" />
        <circle cx="230" cy="142" r="8" fill="#f6d7c4" stroke="#c2703d" strokeWidth="2.5" />
        <text x="230" y="184" textAnchor="middle" fontSize="13.5" fill="#b0483a" fontWeight="700">细胞凋亡</text>
        <text x="230" y="204" textAnchor="middle" fontSize="12" fill="#c97a5a">基因决定的"程序性死亡"</text>
        <text x="230" y="222" textAnchor="middle" fontSize="12" fill="#c97a5a">形成凋亡小泡 · 对机体有利</text>
      </g>
      {/* 癌变 */}
      <g style={dim(active, 2)}>
        <path d="M408 92 L436 78 L458 96 L482 90 L486 118 L472 140 L486 160 L458 166 L436 182 L416 164 L396 170 L398 142 L382 122 L402 108 Z" fill="#e8a8a0" stroke="#b0483a" strokeWidth="3" />
        <circle cx="436" cy="126" r="11" fill="#b0483a" opacity="0.75" />
        <circle cx="456" cy="142" r="8" fill="#b0483a" opacity="0.55" />
        <text x="436" y="214" textAnchor="middle" fontSize="13.5" fill="#9b3a30" fontWeight="700">细胞癌变</text>
        <text x="436" y="234" textAnchor="middle" fontSize="12" fill="#b0483a">原癌/抑癌基因突变</text>
        <text x="436" y="252" textAnchor="middle" fontSize="12" fill="#b0483a">无限增殖 · 糖蛋白↓ 易扩散</text>
      </g>
      {/* 分隔与说明 */}
      <line x1="150" y1="80" x2="150" y2="250" stroke="#dceaea" strokeWidth="2" strokeDasharray="6 5" />
      <line x1="320" y1="80" x2="320" y2="250" stroke="#dceaea" strokeWidth="2" strokeDasharray="6 5" />
      <g style={dim(active, 1)}>
        <text x="16" y="288" fontSize="13.5" fill="#2c6e94" fontWeight="700">衰老和凋亡是正常的生命历程、对机体有利；癌变才是"失控"</text>
        <text x="16" y="308" fontSize="12.5" fill="#59767c">致癌因子：物理（紫外线）、化学（黄曲霉素）、病毒——健康生活方式是最好的预防</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">细胞的衰老、凋亡与癌变对比模式图</text>
    </svg>
  );
}

function CellDifferentiationSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 受精卵 */}
      <g style={dim(active, 0)}>
        <circle cx="80" cy="150" r="42" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="3.5" />
        <circle cx="80" cy="150" r="10" fill="#7a4a8a" />
        <text x="80" y="216" textAnchor="middle" fontSize="13.5" fill="#6a4a9a" fontWeight="700">受精卵</text>
        <text x="80" y="234" textAnchor="middle" fontSize="12" fill="#8a6a94">全套基因（2n）</text>
      </g>
      {/* 分裂箭头 */}
      <g style={dim(active, 1)}>
        <line x1="128" y1="150" x2="182" y2="150" stroke="#5a5a62" strokeWidth="3.5" markerEnd="url(#df-arrow)" />
        <text x="155" y="136" textAnchor="middle" fontSize="12.5" fill="#59767c">细胞分裂</text>
        <circle cx="212" cy="150" r="30" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="3" />
        <circle cx="212" cy="150" r="7" fill="#7a4a8a" />
      </g>
      {/* 分化箭头 */}
      <g style={dim(active, 2)}>
        <path d="M240 128 Q 280 96 320 92" fill="none" stroke="#5a5a62" strokeWidth="3" markerEnd="url(#df-arrow)" />
        <path d="M246 150 L 312 150" fill="none" stroke="#5a5a62" strokeWidth="3" markerEnd="url(#df-arrow)" />
        <path d="M240 172 Q 280 204 320 210" fill="none" stroke="#5a5a62" strokeWidth="3" markerEnd="url(#df-arrow)" />
        <text x="296" y="122" textAnchor="middle" fontSize="12.5" fill="#59767c" fontWeight="600">细胞分化</text>
      </g>
      {/* 三种细胞 */}
      <g style={dim(active, 3)}>
        <circle cx="372" cy="92" r="26" fill="#cfe4f0" stroke="#3d6a94" strokeWidth="2.5" />
        <text x="372" y="97" textAnchor="middle" fontSize="11.5" fill="#1e4a68" fontWeight="700">神经</text>
        <text x="430" y="76" fontSize="12" fill="#2c6e94" fontWeight="600">神经细胞</text>
        <ellipse cx="372" cy="152" rx="30" ry="18" fill="#f0b0a8" stroke="#b0483a" strokeWidth="2.5" />
        <text x="372" y="157" textAnchor="middle" fontSize="11.5" fill="#7a2622" fontWeight="700">肌</text>
        <text x="430" y="150" fontSize="12" fill="#b0483a" fontWeight="600">肌肉细胞</text>
        <circle cx="372" cy="214" r="14" fill="#e8c94a" stroke="#b5953a" strokeWidth="2.5" />
        <text x="430" y="212" fontSize="12" fill="#8a671b" fontWeight="600">红细胞（无核）</text>
      </g>
      {/* 关键结论 */}
      <g style={dim(active, 2)}>
        <rect x="26" y="258" width="330" height="88" rx="10" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="42" y="282" fontSize="13.5" fill="#173b42" fontWeight="700">分化的本质：基因的选择性表达</text>
        <text x="42" y="304" fontSize="12.5" fill="#46666d">三种细胞的遗传物质完全相同，只是"开的基因"不同；</text>
        <text x="42" y="324" fontSize="12.5" fill="#46666d">分化一般不可逆——但遗传物质没变（区别于癌变）。</text>
      </g>
      {/* 全能性 */}
      <g style={dim(active, 4)}>
        <rect x="366" y="258" width="140" height="88" rx="10" fill="#e7f3e2" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="380" y="282" fontSize="13" fill="#2f7a4d" fontWeight="700">植物细胞全能性</text>
        <text x="380" y="302" fontSize="12" fill="#4a8a4a">离体细胞 → 组培</text>
        <text x="380" y="320" fontSize="12" fill="#4a8a4a">→ 完整植株</text>
      </g>
      <defs>
        <marker id="df-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">细胞分化与全能性模式图</text>
    </svg>
  );
}

export const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {
  telomere: { Svg: TelomereSvg },
  apoptosisVsNecrosis: { Svg: ApoptosisVsNecrosisSvg },
  stemCells: { Svg: StemCellsSvg },
  cancerCell: { Svg: CancerCellSvg },
  cellFates: { Svg: CellFatesSvg },
  cellDifferentiation: { Svg: CellDifferentiationSvg },
};
