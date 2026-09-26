'use client';

import type { ComponentType } from 'react';
import { Badge, MiniMito, dim, type ArtProps } from '@/components/cells/art-shared';
import { AnimalCellWebGLModel, PlantCellWebGLModel } from '@/components/cells/cell-models-webgl';

function MembraneModelSvg({ active }: { active: number | null; open?: boolean }) {
  // 磷脂双分子层：两层圆头（亲水头）+ 两条尾（疏水尾）
  const heads = Array.from({ length: 16 }, (_, i) => 60 + i * 26);
  const Y_TOP_HEAD = 128;
  const Y_TOP_TAIL = 152;
  const Y_BOT_HEAD = 232;
  const Y_BOT_TAIL = 208;

  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 上层磷脂 */}
      <g style={dim(active, 0)}>
        {heads.map((x) => (
          <g key={`t${x}`}>
            <line x1={x} y1={Y_TOP_HEAD + 10} x2={x} y2={Y_TOP_TAIL + 6} stroke="#d9a04a" strokeWidth="3" />
            <circle cx={x} cy={Y_TOP_HEAD} r="9" fill="#5aa8c9" stroke="#3d7e9e" strokeWidth="1.6" />
          </g>
        ))}
      </g>
      {/* 下层磷脂 */}
      <g style={dim(active, 0)}>
        {heads.map((x) => (
          <g key={`b${x}`}>
            <line x1={x} y1={Y_BOT_HEAD - 10} x2={x} y2={Y_BOT_TAIL - 6} stroke="#d9a04a" strokeWidth="3" />
            <circle cx={x} cy={Y_BOT_HEAD} r="9" fill="#5aa8c9" stroke="#3d7e9e" strokeWidth="1.6" />
          </g>
        ))}
      </g>

      {/* 蛋白质：镶嵌、贯穿、糖蛋白 */}
      <g style={dim(active, 1)}>
        {/* 镶嵌蛋白（上半嵌入） */}
        <rect x="112" y="108" width="54" height="66" rx="16" fill="#c9749e" stroke="#9a4a74" strokeWidth="2" />
        {/* 贯穿蛋白 */}
        <rect x="236" y="100" width="58" height="160" rx="18" fill="#c9749e" stroke="#9a4a74" strokeWidth="2" />
        {/* 镶嵌蛋白（下半嵌入） */}
        <rect x="352" y="186" width="54" height="66" rx="16" fill="#c9749e" stroke="#9a4a74" strokeWidth="2" />
      </g>

      {/* 糖蛋白（糖被）：蛋白 + 分支糖链 */}
      <g style={dim(active, 2)}>
        <rect x="416" y="96" width="52" height="60" rx="16" fill="#c9749e" stroke="#9a4a74" strokeWidth="2" />
        <line x1="442" y1="96" x2="442" y2="70" stroke="#6aa86a" strokeWidth="3.5" />
        <line x1="442" y1="70" x2="428" y2="52" stroke="#6aa86a" strokeWidth="3.5" />
        <line x1="442" y1="70" x2="458" y2="52" stroke="#6aa86a" strokeWidth="3.5" />
        <circle cx="426" cy="48" r="6" fill="#8fc98f" />
        <circle cx="460" cy="48" r="6" fill="#8fc98f" />
        <text x="442" y="32" textAnchor="middle" fontSize="13" fill="#3f7a5e" fontWeight="700">糖链（糖被）</text>
      </g>

      {/* 胆固醇（黄色小分子） */}
      <g style={dim(active, 3)}>
        <rect x="180" y="150" width="14" height="60" rx="6" fill="#e8c94a" stroke="#b5a038" strokeWidth="1.6" />
        <text x="187" y="290" textAnchor="middle" fontSize="12.5" fill="#8a7a20">胆固醇</text>
      </g>

      {/* 标签 */}
      <g style={dim(active, 0)}>
        <line x1="120" y1="166" x2="70" y2="196" stroke="#5aa8c9" strokeWidth="1.4" />
        <text x="14" y="192" fontSize="13.5" fill="#2c6e94" fontWeight="700">磷脂分子</text>
        <text x="14" y="212" fontSize="12.5" fill="#5a88a8">圆头=亲水 · 两条尾=疏水</text>
      </g>
      <g style={dim(active, 1)}>
        <line x1="265" y1="100" x2="300" y2="60" stroke="#c9749e" strokeWidth="1.4" />
        <text x="306" y="56" fontSize="13.5" fill="#9a4a74" fontWeight="700">蛋白质</text>
        <text x="306" y="78" fontSize="12.5" fill="#b56a94">镶嵌 / 贯穿 / 糖蛋白</text>
      </g>
      <text x="14" y="330" fontSize="13.5" fill="#3d7e9e" fontWeight="700">磷脂双分子层 = 膜的基本支架</text>
      <text x="500" y="368" textAnchor="end" fontSize="12.5" fill="#799398">细胞膜流动镶嵌模型（Singer & Nicolson, 1972）</text>
    </svg>
  );
}

function MembraneTransportSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 磷脂双分子层横带 */}
      <g style={dim(active, 0)}>
        <rect x="16" y="164" width="488" height="52" fill="#f2e3c8" />
        {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={170} r="6" fill="#e8b06a" stroke="#b58a3a" strokeWidth="1.5" />
            <circle cx={x} cy={210} r="6" fill="#e8b06a" stroke="#b58a3a" strokeWidth="1.5" />
            <line x1={x} y1={176} x2={x} y2={204} stroke="#b58a3a" strokeWidth="2.5" />
          </g>
        ))}
        <text x="260" y="238" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="600">磷脂双分子层（基本支架）</text>
      </g>
      {/* 自由扩散 */}
      <g style={dim(active, 1)}>
        {[68, 88].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={110 - i * 14} r="7" fill="#7fb8d4" stroke="#3d6a94" strokeWidth="2" />
            <circle cx={x + 6} cy={252 + i * 12} r="7" fill="#7fb8d4" stroke="#3d6a94" strokeWidth="2" opacity="0.65" />
          </g>
        ))}
        <line x1="80" y1="70" x2="80" y2="300" stroke="#3d6a94" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#mt-arrow)" />
        <text x="80" y="52" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">自由扩散</text>
        <text x="80" y="330" textAnchor="middle" fontSize="12.5" fill="#4b6c73">高→低 · 不需载体 · 不耗能</text>
        <text x="80" y="348" textAnchor="middle" fontSize="12" fill="#799398">O₂、CO₂、甘油、乙醇</text>
      </g>
      {/* 协助扩散 */}
      <g style={dim(active, 2)}>
        <path d="M226 208 Q 240 158 254 208 Q 268 258 282 208 Q 262 176 240 176 Q 224 186 226 208 Z" fill="#a8c8a8" stroke="#4a7a5a" strokeWidth="3" />
        <path d="M242 216 Q 254 196 266 216" fill="none" stroke="#4a7a5a" strokeWidth="2.5" />
        {[252, 256].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={116 - i * 12} r="7" fill="#8fbf8a" stroke="#3f7f4f" strokeWidth="2" />
            <circle cx={x} cy={254 + i * 10} r="7" fill="#8fbf8a" stroke="#3f7f4f" strokeWidth="2" opacity="0.65" />
          </g>
        ))}
        <line x1="254" y1="70" x2="254" y2="300" stroke="#3f7f4f" strokeWidth="2" strokeDasharray="6 4" markerEnd="url(#mt-arrow)" />
        <text x="254" y="52" textAnchor="middle" fontSize="13.5" fill="#2f7a4d" fontWeight="700">协助扩散</text>
        <text x="254" y="330" textAnchor="middle" fontSize="12.5" fill="#4b6c73">高→低 · 需通道/载体 · 不耗能</text>
        <text x="254" y="348" textAnchor="middle" fontSize="12" fill="#799398">红细胞吸收葡萄糖</text>
      </g>
      {/* 主动运输 */}
      <g style={dim(active, 3)}>
        <ellipse cx="428" cy="190" rx="26" ry="34" fill="#e8a8a0" stroke="#b0483a" strokeWidth="3" />
        <path d="M420 224 Q 428 238 436 224" fill="none" stroke="#b0483a" strokeWidth="2.5" />
        {[430, 426].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={252 + i * 12} r="7" fill="#e07a5a" stroke="#b0483a" strokeWidth="2" />
            <circle cx={x + 4} cy={116 - i * 12} r="7" fill="#e07a5a" stroke="#b0483a" strokeWidth="2" opacity="0.65" />
          </g>
        ))}
        <line x1="428" y1="300" x2="428" y2="70" stroke="#b0483a" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#mt-arrow)" />
        <path d="M462 236 l 12 -20 h -8 l 12 -20" fill="none" stroke="#e0b020" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="428" y="52" textAnchor="middle" fontSize="13.5" fill="#b0483a" fontWeight="700">主动运输</text>
        <text x="428" y="330" textAnchor="middle" fontSize="12.5" fill="#4b6c73">低→高 · 需载体 · 耗能（ATP）</text>
        <text x="428" y="348" textAnchor="middle" fontSize="12" fill="#799398">离子、葡萄糖进入小肠上皮</text>
      </g>
      <defs>
        <marker id="mt-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="16" y="30" fontSize="13.5" fill="#2c6e94" fontWeight="700">三种跨膜运输方式对比（结构决定功能：载体蛋白种类与数量决定特异性）</text>
      <text x="508" y="378" textAnchor="end" fontSize="12.5" fill="#799398">物质跨膜运输方式模式图</text>
    </svg>
  );
}

function AnimalCellSvg({ active }: { active: number | null; open?: boolean }) {
  const ribosomes: [number, number][] = [
    [310, 130], [330, 145], [296, 160], [345, 170], [320, 185], [355, 150],
    [130, 220], [150, 240], [120, 260], [165, 262], [250, 310], [280, 320],
    [330, 300], [230, 120], [255, 105],
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 细胞膜 + 细胞质 */}
      <g style={dim(active, 0)}>
        <ellipse cx="260" cy="195" rx="216" ry="162" fill="#f4f8ef" stroke="#4a7a6a" strokeWidth="3.5" />
      </g>
      <g style={dim(active, 1)}>
        <text x="112" y="332" fontSize="13.5" fill="#6d8a70" fontWeight="600">细胞质（胶状基质）</text>
      </g>

      {/* 细胞核 */}
      <g style={dim(active, 2)}>
        <circle cx="185" cy="150" r="56" fill="#e9def3" stroke="#8a5a8f" strokeWidth="3" />
        <circle cx="185" cy="140" r="15" fill="#8a5a8f" />
        <path d="M150 178 q 15 -12 30 0 q 15 12 30 0" stroke="#a97fb5" strokeWidth="2.5" fill="none" />
        <path d="M155 192 q 14 -10 28 0 q 14 10 28 0" stroke="#a97fb5" strokeWidth="2.5" fill="none" />
        <path d="M170 120 q 12 -9 24 0" stroke="#a97fb5" strokeWidth="2" fill="none" />
        <text x="185" y="225" textAnchor="middle" fontSize="13.5" fill="#7a5a92" fontWeight="600">细胞核</text>
      </g>

      {/* 线粒体 ×2（立体剖面迷你版） */}
      <g style={dim(active, 3)}>
        <MiniMito cx={365} cy={115} rx={42} ry={23} rotate={-18} />
        <MiniMito cx={142} cy={286} rx={35} ry={19} rotate={14} />
      </g>

      {/* 内质网（粗面） */}
      <g style={dim(active, 5)}>
        <path d="M252 128 C 300 122, 326 150, 306 178 C 290 200, 308 224, 336 232" stroke="#7fa6bd" strokeWidth="3" fill="none" />
        <path d="M260 142 C 300 138, 318 158, 302 182" stroke="#7fa6bd" strokeWidth="3" fill="none" />
        <path d="M262 156 C 296 152, 310 166, 298 186" stroke="#7fa6bd" strokeWidth="3" fill="none" />
        {[[292, 150], [308, 168], [288, 174], [318, 226], [302, 214]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#4a7a6a" />
        ))}
        <text x="322" y="206" fontSize="13" fill="#4b7a91" fontWeight="600">内质网</text>
      </g>

      {/* 核糖体 */}
      <g style={dim(active, 4)}>
        {ribosomes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="#3f6b74" />
        ))}
      </g>

      {/* 高尔基体 */}
      <g style={dim(active, 6)}>
        <path d="M368 240 Q 398 228 426 244" stroke="#b06a17" strokeWidth="3" fill="none" />
        <path d="M366 252 Q 400 241 430 258" stroke="#b06a17" strokeWidth="3" fill="none" />
        <path d="M368 264 Q 402 255 428 271" stroke="#b06a17" strokeWidth="3" fill="none" />
        <circle cx="366" cy="278" r="4" fill="none" stroke="#b06a17" strokeWidth="2" />
        <circle cx="436" cy="248" r="4" fill="none" stroke="#b06a17" strokeWidth="2" />
        <text x="398" y="290" textAnchor="middle" fontSize="13" fill="#8a5a1b" fontWeight="600">高尔基体</text>
      </g>

      {/* 中心体 */}
      <g style={dim(active, 7)}>
        <rect x="288" y="296" width="16" height="6" rx="2" fill="none" stroke="#4b6c73" strokeWidth="2" />
        <rect x="293" y="291" width="6" height="16" rx="2" fill="none" stroke="#4b6c73" strokeWidth="2" />
        <text x="296" y="326" textAnchor="middle" fontSize="13" fill="#4b6c73" fontWeight="600">中心体</text>
      </g>

      {/* 溶酶体 */}
      <g style={dim(active, 8)}>
        <circle cx="436" cy="148" r="15" fill="#f0d5d5" stroke="#b0483a" strokeWidth="2.5" />
        <circle cx="431" cy="144" r="2.4" fill="#b0483a" />
        <circle cx="440" cy="152" r="2.4" fill="#b0483a" />
        <circle cx="434" cy="155" r="2.4" fill="#b0483a" />
        <text x="436" y="180" textAnchor="middle" fontSize="13" fill="#b0483a" fontWeight="600">溶酶体</text>
      </g>

      <Badge n={1} x={52} y={196} />
      <Badge n={2} x={112} y={312} />
      <Badge n={3} x={185} y={78} />
      <Badge n={4} x={378} y={86} />
      <Badge n={5} x={346} y={116} />
      <Badge n={6} x={266} y={118} />
      <Badge n={7} x={398} y={222} />
      <Badge n={8} x={296} y={280} />
      <Badge n={9} x={436} y={118} />
    </svg>
  );
}

function PlantCellSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 细胞壁 */}
      <g style={dim(active, 0)}>
        <rect x="46" y="44" width="428" height="292" rx="22" fill="#f2f7ec" stroke="#6b8f5e" strokeWidth="6" />
      </g>
      {/* 细胞膜 */}
      <g style={dim(active, 1)}>
        <rect x="58" y="56" width="404" height="268" rx="16" fill="none" stroke="#4a7a6a" strokeWidth="2.5" />
      </g>
      <g style={dim(active, 2)}>
        <text x="92" y="308" fontSize="13.5" fill="#6d8a70" fontWeight="600">细胞质</text>
      </g>

      {/* 大液泡 */}
      <g style={dim(active, 5)}>
        <path d="M240 92 C 320 84, 420 120, 432 190 C 442 252, 386 300, 306 300 C 250 300, 226 262, 232 210 C 236 160, 210 100, 240 92 Z" fill="#dcebf7" stroke="#7fa9bb" strokeWidth="3" />
        <text x="330" y="205" textAnchor="middle" fontSize="12" fill="#4b7a91" fontWeight="600">大液泡</text>
        <text x="330" y="222" textAnchor="middle" fontSize="12.5" fill="#7fa9bb">细胞液（含糖类、无机盐、色素等）</text>
      </g>

      {/* 细胞核 */}
      <g style={dim(active, 3)}>
        <circle cx="152" cy="212" r="46" fill="#e9def3" stroke="#8a5a8f" strokeWidth="3" />
        <circle cx="152" cy="204" r="12" fill="#8a5a8f" />
        <path d="M126 230 q 12 -9 24 0 q 12 9 24 0" stroke="#a97fb5" strokeWidth="2.2" fill="none" />
        <text x="152" y="274" textAnchor="middle" fontSize="13.5" fill="#7a5a92" fontWeight="600">细胞核</text>
      </g>

      {/* 叶绿体 ×3 */}
      <g style={dim(active, 4)}>
        {[
          { x: 130, y: 100, r: -14 },
          { x: 232, y: 88, r: 8 },
          { x: 396, y: 92, r: -6 },
        ].map((c, index) => (
          <g key={index} transform={`rotate(${c.r} ${c.x} ${c.y})`}>
            <ellipse cx={c.x} cy={c.y} rx="27" ry="15" fill="#5f9e57" stroke="#2f6b42" strokeWidth="2.5" />
            {[[c.x - 12, c.y - 3], [c.x + 2, c.y + 3], [c.x + 13, c.y - 2]].map(([gx, gy], gi) => (
              <circle key={gi} cx={gx} cy={gy} r="3.4" fill="#2f6b42" />
            ))}
          </g>
        ))}
        <text x="185" y="66" fontSize="13.5" fill="#2f6b42" fontWeight="600">叶绿体（含基粒）</text>
      </g>

      {/* 线粒体（立体剖面迷你版） */}
      <g style={dim(active, 6)}>
        <MiniMito cx={300} cy={322} rx={34} ry={17} rotate={12} />
      </g>

      <Badge n={1} x={260} y={30} />
      <Badge n={2} x={330} y={30} />
      <Badge n={3} x={152} y={150} />
      <Badge n={4} x={160} y={66} />
      <Badge n={5} x={330} y={168} />
      <Badge n={6} x={240} y={332} />
      <Badge n={7} x={80} y={266} />
      <text x="500" y="368" textAnchor="end" fontSize="12.5" fill="#799398">植物细胞模式图（平面）</text>
    </svg>
  );
}

function NucleusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 核膜（双层） */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="172" rx="150" ry="116" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="4" />
        <ellipse cx="250" cy="172" rx="136" ry="102" fill="none" stroke="#9a6fa8" strokeWidth="2.5" />
        <text x="30" y="258" fontSize="13.5" fill="#6a4a9a" fontWeight="700">核膜（双层膜）</text>
        <text x="30" y="276" fontSize="12" fill="#8a6a94">外膜常连内质网</text>
        <line x1="176" y1="250" x2="126" y2="234" stroke="#7a4a8a" strokeWidth="1.4" />
      </g>
      {/* 核孔 */}
      <g style={dim(active, 1)}>
        {[[352, 118], [392, 200], [340, 258], [250, 296], [158, 252], [110, 186], [150, 112]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="7" fill="#f2fafa" stroke="#5f4f6a" strokeWidth="2.5" />
        ))}
        <text x="392" y="130" fontSize="13.5" fill="#5f4f6a" fontWeight="700">核孔</text>
        <text x="392" y="148" fontSize="12" fill="#7a6a8a">mRNA、蛋白质通道</text>
        <line x1="416" y1="122" x2="362" y2="116" stroke="#5f4f6a" strokeWidth="1.4" />
      </g>
      {/* 核仁 */}
      <g style={dim(active, 2)}>
        <circle cx="200" cy="150" r="30" fill="#7a4a8a" />
        <text x="200" y="155" textAnchor="middle" fontSize="12.5" fill="#ffffff" fontWeight="700">核仁</text>
        <text x="96" y="118" fontSize="12.5" fill="#6a4a9a" fontWeight="600">与某种 RNA（rRNA）</text>
        <text x="96" y="136" fontSize="12.5" fill="#6a4a9a" fontWeight="600">的合成有关</text>
      </g>
      {/* 染色质 */}
      <g style={dim(active, 3)}>
        <path d="M240 120 q 20 -14 40 0 q 20 14 40 0 q 20 -14 40 0 M226 170 q 22 16 44 0 q 22 -16 44 0 q 22 16 44 0 M250 220 q 20 14 40 0 q 20 -14 40 0"
          fill="none" stroke="#b48ad0" strokeWidth="5" strokeLinecap="round" />
        <text x="28" y="96" fontSize="13.5" fill="#6a4a9a" fontWeight="700">染色质（DNA 的载体）</text>
        <line x1="140" y1="102" x2="238" y2="118" stroke="#7a4a8a" strokeWidth="1.4" />
      </g>
      {/* 功能定位 */}
      <g style={dim(active, 4)}>
        <rect x="46" y="296" width="448" height="52" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="62" y="318" fontSize="13.5" fill="#173b42" fontWeight="700">细胞核 = 遗传信息库，是细胞代谢和遗传的控制中心</text>
        <text x="62" y="338" fontSize="12" fill="#59767c">核孔有选择性：mRNA、蛋白质可过，DNA 不能出去</text>
      </g>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">细胞核结构模式图</text>
    </svg>
  );
}

function BiofilmSystemSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 细胞核 */}
      <g style={dim(active, 0)}>
        <circle cx="96" cy="150" r="56" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="3.5" />
        <text x="96" y="155" textAnchor="middle" fontSize="13" fill="#ffffff" fontWeight="700">细胞核</text>
        <text x="30" y="240" fontSize="13" fill="#6a4a9a" fontWeight="600">核膜（外层）延伸出内质网</text>
      </g>
      {/* 内质网 */}
      <g style={dim(active, 1)}>
        <path d="M148 130 Q 210 108 268 128 Q 320 146 366 128 M 152 170 Q 214 156 270 174 Q 322 190 372 172" fill="none" stroke="#8fb8d4" strokeWidth="11" strokeLinecap="round" />
        <text x="262" y="98" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">内质网膜（直接与核膜相连）</text>
      </g>
      {/* 囊泡 1 */}
      <g style={dim(active, 2)}>
        <circle cx="356" cy="222" r="15" fill="#a8d0e8" stroke="#4d7ea8" strokeWidth="2.5" />
        <path d="M372 182 Q 378 200 368 212" fill="none" stroke="#4d7ea8" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#bf-arrow)" />
        <text x="394" y="212" fontSize="12.5" fill="#2c6e94" fontWeight="600">囊泡转运</text>
      </g>
      {/* 高尔基体 */}
      <g style={dim(active, 2)}>
        {[236, 254, 272].map((y, i) => (
          <path key={i} d={`M220 ${y} Q 252 ${y - 12} 284 ${y} Q 252 ${y + 8} 220 ${y} Z`} fill="#f0c98a" stroke="#b58a3a" strokeWidth="2.5" transform="translate(120 20)" />
        ))}
        <text x="372" y="290" fontSize="13.5" fill="#8a671b" fontWeight="700">高尔基体膜（中转站）</text>
      </g>
      {/* 囊泡 2 + 细胞膜 */}
      <g style={dim(active, 3)}>
        <circle cx="452" cy="308" r="13" fill="#a8d0e8" stroke="#4d7ea8" strokeWidth="2.5" />
        <path d="M300 210 Q 250 250 180 268 Q 120 286 62 274" fill="none" stroke="#3d7e9e" strokeWidth="6" strokeLinecap="round" />
        <path d="M452 292 Q 428 276 408 270" fill="none" stroke="#4d7ea8" strokeWidth="2.5" strokeDasharray="4 3" markerEnd="url(#bf-arrow)" />
        <text x="66" y="300" fontSize="13.5" fill="#1e4a68" fontWeight="700">细胞膜（胞吐出口）</text>
      </g>
      {/* 线粒体供能 */}
      <g style={dim(active, 4)}>
        <ellipse cx="110" cy="300" rx="34" ry="18" fill="#f0a06a" stroke="#c2703d" strokeWidth="2.5" transform="rotate(-18 110 300)" />
        <text x="150" y="336" fontSize="12.5" fill="#c2703d" fontWeight="600">线粒体供能（囊泡运输需要 ATP）</text>
      </g>
      <text x="16" y="42" fontSize="13.5" fill="#2c6e94" fontWeight="700">生物膜系统 = 核膜 + 细胞器膜 + 细胞膜：结构上相连通，功能上分工协作</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">生物膜系统联系模式图</text>
      <defs>
        <marker id="bf-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#4d7ea8" />
        </marker>
      </defs>
    </svg>
  );
}

export const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {
  membraneModel: { Svg: MembraneModelSvg },
  membraneTransport: { Svg: MembraneTransportSvg },
  animal: { Svg: AnimalCellSvg, StageWebGL: AnimalCellWebGLModel },
  plant: { Svg: PlantCellSvg, StageWebGL: PlantCellWebGLModel },
  nucleus: { Svg: NucleusSvg },
  biofilmSystem: { Svg: BiofilmSystemSvg },
};
