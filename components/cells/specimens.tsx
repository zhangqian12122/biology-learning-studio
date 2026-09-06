'use client';

import type { ComponentType } from 'react';

import {
  AnimalCellWebGLModel,
  EColiWebGLModel,
  ParameciumWebGLModel,
  PlantCellWebGLModel,
  StomaWebGLModel,
} from '@/components/cells/cell-models-webgl';
import { Chloroplast3d } from '@/components/cells/chloroplast-3d';
import { ChloroplastWebGLModel, MitochondrionWebGLModel } from '@/components/cells/organelle-webgl';
import { Mitochondrion3d } from '@/components/cells/mitochondrion-3d';

export type CellPart = {
  name: string;
  desc: string;
};

export type Specimen = {
  id: string;
  name: string;
  kicker: string;
  intro: string;
  parts: CellPart[];
  Svg: ComponentType<{ active: number | null; open?: boolean }>;
  /** 立体剖面（SVG 伪 3D，默认展示，所有角度都清晰） */
  Stage3d?: ComponentType<{ active: number | null; open?: boolean }>;
  /** 实景 3D（three.js 渲染，可自由旋转缩放，按需加载） */
  StageWebGL?: ComponentType<{ active: number | null; open?: boolean }>;
};

/** 选中结构高亮：未选中的整体调淡。 */
function dim(active: number | null, idx: number) {
  return { opacity: active == null || active === idx ? 1 : 0.24, transition: 'opacity 0.25s ease' };
}

/** 编号圆标。 */
function Badge({ n, x, y }: { n: number; x: number; y: number }) {
  return (
    <g style={{ pointerEvents: 'none' }}>
      <circle cx={x} cy={y} r="9.5" fill="#0e6f75" stroke="#ffffff" strokeWidth="2" />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="13.5" fill="#ffffff" fontWeight="700">
        {n}
      </text>
    </g>
  );
}

/* ================= 动物细胞 ================= */

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

/* ================= 植物细胞 ================= */

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

/* ================= 叶绿体 ================= */

function ChloroplastSvg({ active }: { active: number | null; open?: boolean }) {
  const grana = [
    { x: 168, y: 132 },
    { x: 330, y: 112 },
    { x: 185, y: 244 },
    { x: 348, y: 232 },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 外膜 / 内膜 / 基质 */}
      <g style={dim(active, 0)}>
        <ellipse cx="260" cy="190" rx="206" ry="126" fill="#eaf4e2" stroke="#2f6b42" strokeWidth="3.5" />
      </g>
      <g style={dim(active, 1)}>
        <ellipse cx="260" cy="190" rx="192" ry="112" fill="#dff0d2" stroke="#5f9e57" strokeWidth="2.5" />
      </g>
      <g style={dim(active, 2)}>
        <text x="260" y="308" textAnchor="middle" fontSize="13.5" fill="#3f7f4f" fontWeight="600">基质（暗反应场所）</text>
      </g>

      {/* 基质类囊体（连丝） */}
      <g style={dim(active, 4)}>
        <path d="M192 138 C 240 122, 280 116, 306 116" stroke="#5f9e57" strokeWidth="2.5" fill="none" />
        <path d="M209 250 C 250 262, 300 252, 324 238" stroke="#5f9e57" strokeWidth="2.5" fill="none" />
        <path d="M178 158 C 176 196, 178 216, 182 224" stroke="#5f9e57" strokeWidth="2.5" fill="none" />
      </g>

      {/* 基粒（类囊体堆叠） */}
      <g style={dim(active, 3)}>
        {grana.map((g, index) => (
          <g key={index}>
            {[0, 1, 2, 3, 4].map((i) => (
              <ellipse key={i} cx={g.x} cy={g.y + i * 10} rx="26" ry="5.5" fill="#4c8f5f" stroke="#2f6b42" strokeWidth="1.8" />
            ))}
          </g>
        ))}
        <text x="352" y="178" textAnchor="middle" fontSize="13.5" fill="#2f6b42" fontWeight="600">基粒（类囊体堆叠）</text>
        <text x="352" y="192" textAnchor="middle" fontSize="12.5" fill="#3f7f4f">光反应在类囊体薄膜上进行</text>
      </g>

      {/* DNA 与核糖体 */}
      <g style={dim(active, 5)}>
        <circle cx="262" cy="188" r="13" fill="none" stroke="#8a5a8f" strokeWidth="2.5" strokeDasharray="5 3" />
        <text x="262" y="192" textAnchor="middle" fontSize="12" fill="#8a5a8f">DNA</text>
        {[[246, 214], [282, 214], [262, 232], [238, 176], [288, 172]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.6" fill="#4b6c73" />
        ))}
      </g>

      <Badge n={1} x={260} y={52} />
      <Badge n={2} x={330} y={62} />
      <Badge n={3} x={260} y={286} />
      <Badge n={4} x={168} y={94} />
      <Badge n={5} x={240} y={104} />
      <Badge n={6} x={292} y={192} />
      <text x="500" y="364" textAnchor="end" fontSize="12.5" fill="#799398">叶绿体剖面模式图</text>
    </svg>
  );
}

/* ================= 线粒体 ================= */

/** 迷你线粒体：细胞模式图内的小尺寸版本（青绿立体感 + 波浪嵴）。 */
function MiniMito({ cx, cy, rx, ry, rotate = 0 }: { cx: number; cy: number; rx: number; ry: number; rotate?: number }) {
  return (
    <g transform={`rotate(${rotate} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#5fb3a1" stroke="#2f7d6d" strokeWidth="2.2" />
      <ellipse cx={cx} cy={cy} rx={rx - 5} ry={ry - 4.5} fill="#c9eae2" />
      <path
        d={`M${cx - rx * 0.48} ${cy - ry * 0.52} C ${cx - rx * 0.28} ${cy - ry * 0.05}, ${cx - rx * 0.02} ${cy - ry * 0.02}, ${cx + rx * 0.14} ${cy - ry * 0.3}`}
        stroke="#2f7d6d" strokeWidth="2.8" fill="none" strokeLinecap="round"
      />
      <path
        d={`M${cx + rx * 0.48} ${cy + ry * 0.52} C ${cx + rx * 0.28} ${cy + ry * 0.05}, ${cx + rx * 0.02} ${cy + ry * 0.02}, ${cx - rx * 0.14} ${cy + ry * 0.3}`}
        stroke="#2f7d6d" strokeWidth="2.8" fill="none" strokeLinecap="round"
      />
      <path
        d={`M${cx - rx * 0.62} ${cy + ry * 0.3} q ${rx * 0.3} ${-ry * 0.34}, ${rx * 0.62} ${-ry * 0.1}`}
        stroke="#2f7d6d" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity="0.85"
      />
    </g>
  );
}

function MitochondrionSvg({ active }: { active: number | null; open?: boolean }) {
  // 参考教科书剖面：立体豆荚外形 + 切口露出基质，嵴为上下交错、较宽的指状折叠
  const cristae = [
    // 上方垂下的三个指状嵴
    'M 196 116 C 200 148, 190 172, 202 196',
    'M 262 106 C 262 134, 250 156, 262 180',
    'M 318 128 C 312 152, 322 170, 314 192',
    // 下方升起的三个指状嵴（与上方交错）
    'M 182 262 C 186 234, 176 214, 188 192',
    'M 258 276 C 258 250, 246 232, 258 210',
    'M 330 258 C 324 236, 334 220, 326 200',
    // 右侧切口边缘的短嵴
    'M 374 216 C 360 208, 362 190, 372 180',
  ];
  const atpParticles: [number, number, number][] = [
    // [x, y, 朝向]：分布在内膜内缘与嵴表面
    [226, 112, -90], [296, 108, -90], [148, 162, 180], [130, 216, 180],
    [224, 270, 90], [292, 276, 90], [384, 168, 0], [384, 212, 0],
  ];
  const porins: [number, number][] = [
    [404, 120], [416, 142], [422, 168], [424, 196], [418, 226], [404, 252],
    [386, 272], [128, 128], [112, 156], [104, 190], [110, 224], [124, 252],
  ];
  const ribosomes: [number, number][] = [
    [296, 142], [342, 176], [346, 208], [300, 236], [226, 250], [168, 216],
    [156, 172], [212, 236], [232, 132], [172, 132],
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="mito-body-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ccabb" />
          <stop offset="100%" stopColor="#3f9484" />
        </linearGradient>
        <radialGradient id="mito-matrix-grad" cx="0.42" cy="0.4" r="0.75">
          <stop offset="0%" stopColor="#dff4ee" />
          <stop offset="100%" stopColor="#b9e2d7" />
        </radialGradient>
      </defs>

      {/* 外膜：立体豆荚外形 */}
      <g style={dim(active, 0)}>
        <path
          d="M 96 190 C 96 116, 168 76, 262 76 C 358 76, 428 118, 428 190 C 428 262, 356 304, 260 304 C 166 304, 96 262, 96 190 Z"
          fill="url(#mito-body-grad)"
          stroke="#2f7d6d"
          strokeWidth="2.5"
        />
        {/* 顶部高光增强立体感 */}
        <path d="M 150 106 C 200 84, 300 82, 352 98" stroke="#a8ded2" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.55" />
        {/* 孔蛋白（外膜小点） */}
        {porins.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="#1f5a4e" opacity="0.5" />
        ))}
      </g>

      {/* 基质（切口内部） */}
      <g style={dim(active, 4)}>
        <path
          d="M 122 190 C 122 134, 180 102, 258 102 C 332 102, 390 136, 390 190 C 390 244, 330 278, 256 278 C 180 278, 122 246, 122 190 Z"
          fill="url(#mito-matrix-grad)"
        />
      </g>

      {/* 内膜：切口边缘的黄绿色亮线 */}
      <g style={dim(active, 1)}>
        <path
          d="M 122 190 C 122 134, 180 102, 258 102 C 332 102, 390 136, 390 190 C 390 244, 330 278, 256 278 C 180 278, 122 246, 122 190 Z"
          fill="none"
          stroke="#b5d334"
          strokeWidth="4.5"
        />
      </g>

      {/* 膜间隙：内外膜之间的浅色窄环（用细描边示意） */}
      <g style={dim(active, 3)}>
        <path
          d="M 108 190 C 108 110, 172 66, 262 66 C 366 66, 438 112, 438 190 C 438 268, 362 314, 258 314 C 168 314, 108 268, 108 190 Z"
          fill="none"
          stroke="#e8f5f0"
          strokeWidth="10"
          opacity="0.35"
        />
      </g>

      {/* 嵴：内膜向基质折入的管状波浪 */}
      <g style={dim(active, 2)}>
        {cristae.map((d, index) => (
          <g key={index}>
            <path d={d} stroke="#2f7d6d" strokeWidth="16" fill="none" strokeLinecap="round" />
            <path d={d} stroke="#5aab97" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d={d} stroke="#8fd0bf" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
          </g>
        ))}
        <line x1="392" y1="92" x2="304" y2="172" stroke="#2f7d6d" strokeWidth="1.4" />
        <text x="512" y="88" textAnchor="end" fontSize="13.5" fill="#2f7d6d" fontWeight="700">嵴 = 内膜折叠</text>
        <text x="512" y="102" textAnchor="end" fontSize="12.5" fill="#3f9484">管状折叠深入基质，多附呼吸酶</text>
      </g>

      {/* 基质内容物 */}
      <g style={dim(active, 5)}>
        {/* 环状 DNA */}
        <circle cx="350" cy="128" r="9" fill="none" stroke="#e6913c" strokeWidth="2.6" />
        <circle cx="166" cy="244" r="7" fill="none" stroke="#e6913c" strokeWidth="2.4" />
        {/* 基质颗粒 */}
        {[[338, 160], [348, 224], [186, 152]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#e6913c" />
        ))}
      </g>
      {/* 核糖体（小黑点） */}
      <g style={dim(active, 6)}>
        {ribosomes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.9" fill="#1f5a4e" />
        ))}
      </g>

      {/* ATP 合成酶：内膜/嵴表面的带柄颗粒 */}
      <g style={dim(active, 7)}>
        {atpParticles.map(([x, y, dir], index) => {
          const rad = (dir * Math.PI) / 180;
          const stem = 6;
          return (
            <g key={index}>
              <line x1={x} y1={y} x2={x + Math.cos(rad) * stem} y2={y + Math.sin(rad) * stem} stroke="#e6913c" strokeWidth="2" />
              <circle cx={x + Math.cos(rad) * stem} cy={y + Math.sin(rad) * stem} r="2.6" fill="#e6913c" />
            </g>
          );
        })}
      </g>

      <Badge n={1} x={262} y={52} />
      <Badge n={2} x={150} y={112} />
      <Badge n={3} x={300} y={166} />
      <Badge n={4} x={356} y={88} />
      <Badge n={5} x={338} y={196} />
      <Badge n={6} x={376} y={120} />
      <Badge n={7} x={218} y={256} />
      <Badge n={8} x={238} y={296} />
      <text x="512" y="368" textAnchor="end" fontSize="12.5" fill="#799398">线粒体立体剖面模式图（有氧呼吸主要场所）</text>
    </svg>
  );
}

/* ================= 大肠杆菌 ================= */

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

/* ================= 草履虫 ================= */

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

/* ================= 保卫细胞与气孔 ================= */

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

/* ================= DNA 双螺旋 ================= */

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

/* ================= 细胞膜流动镶嵌模型 ================= */

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

/* ================= T2 噬菌体 ================= */

function PhageSvg({ active }: { active: number | null; open?: boolean }) {
  // 头部（廿面体近似椭圆）+ 尾鞘 + 尾丝 + 内部 DNA
  const HEAD_CX = 260;
  const HEAD_CY = 118;
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 大肠杆菌（宿主，下方半透杆状） */}
      <g style={dim(active, 4)}>
        <rect x="120" y="268" width="290" height="76" rx="38" fill="#dcefe0" stroke="#6aa86a" strokeWidth="3" opacity="0.9" />
        <text x="265" y="314" textAnchor="middle" fontSize="13.5" fill="#3f7f52" fontWeight="600">大肠杆菌（宿主细胞）</text>
      </g>

      {/* 内部 DNA（头部内螺旋线） */}
      <g style={dim(active, 3)}>
        <path d="M226 92 q 17 -12 34 0 q 17 12 34 0 q -17 14 -34 4 q -17 -10 -34 -4" fill="none" stroke="#ff9f43" strokeWidth="4" strokeLinecap="round" />
        <path d="M232 112 q 14 10 28 2 q 14 -8 28 0" fill="none" stroke="#ff9f43" strokeWidth="4" strokeLinecap="round" />
        <text x="352" y="86" fontSize="13" fill="#c97020" fontWeight="600">DNA</text>
        <line x1="348" y1="90" x2="312" y2="102" stroke="#c97020" strokeWidth="1.3" />
      </g>

      {/* 头部（蛋白质外壳） */}
      <g style={dim(active, 0)}>
        <ellipse cx={HEAD_CX} cy={HEAD_CY} rx="62" ry="48" fill="#8fb8d4" stroke="#3d7e9e" strokeWidth="3.5" />
        <text x={HEAD_CX} y={HEAD_CY + 4} textAnchor="middle" fontSize="13" fill="#1e4a68" fontWeight="700">蛋白质外壳</text>
      </g>

      {/* 尾鞘（收缩）+ 尾轴 */}
      <g style={dim(active, 1)}>
        <rect x={HEAD_CX - 16} y={HEAD_CY + 48} width="32" height="66" rx="6" fill="#6a9ec4" stroke="#3d7e9e" strokeWidth="2.5" />
        <line x1={HEAD_CX - 8} y1={HEAD_CY + 52} x2={HEAD_CX - 8} y2={HEAD_CY + 112} stroke="#2c5a7e" strokeWidth="1.8" />
        <line x1={HEAD_CX + 8} y1={HEAD_CY + 52} x2={HEAD_CX + 8} y2={HEAD_CY + 112} stroke="#2c5a7e" strokeWidth="1.8" />
        <text x="352" y="176" fontSize="13" fill="#2c6e94" fontWeight="700">尾鞘</text>
        <line x1="348" y1="172" x2="290" y2="164" stroke="#2c6e94" strokeWidth="1.3" />
      </g>

      {/* 基片 + 尾丝（扎向细菌表面） */}
      <g style={dim(active, 2)}>
        <rect x={HEAD_CX - 24} y={HEAD_CY + 116} width="48" height="10" rx="4" fill="#5a7a9e" />
        {[-34, -17, 0, 17, 34].map((dx, i) => (
          <line key={i} x1={HEAD_CX + dx} y1={HEAD_CY + 128} x2={HEAD_CX + dx * 1.35} y2={272} stroke="#5a7a9e" strokeWidth="2.4" strokeLinecap="round" />
        ))}
        <text x="356" y="248" fontSize="13" fill="#3d6a8e" fontWeight="700">尾丝（吸附宿主）</text>
        <line x1="352" y1="252" x2="310" y2="262" stroke="#3d6a8e" strokeWidth="1.3" />
      </g>

      {/* 侵染注解 */}
      <text x="14" y="40" fontSize="13.5" fill="#3d6a8e" fontWeight="700">T2 噬菌体侵染大肠杆菌：</text>
      <text x="14" y="58" fontSize="12.5" fill="#5a7a8e">吸附 → 注入 DNA → 合成 → 装配 → 释放</text>
      <text x="14" y="76" fontSize="12.5" fill="#8a9aa8">蛋白质留在外面，DNA 进入细菌——证明 DNA 是遗传物质</text>

      <text x="500" y="368" textAnchor="end" fontSize="12.5" fill="#799398">T2 噬菌体结构模式图（细菌病毒）</text>
    </svg>
  );
}

/* ================= RNA 单链 ================= */

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

/* ================= ATP 分子 ================= */

function AtpSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 腺嘌呤（双环） */}
      <g style={dim(active, 0)}>
        <polygon points="80,160 106,144 132,160 132,190 106,206 80,190" fill="#c9a8e2" stroke="#8a5a9f" strokeWidth="2.5" />
        <polygon points="132,150 162,138 178,164 162,192 132,190" fill="#b48ad0" stroke="#8a5a9f" strokeWidth="2.5" />
        <text x="122" y="180" textAnchor="middle" fontSize="13.5" fill="#5a2a72" fontWeight="700">腺嘌呤</text>
      </g>
      {/* 核糖（五边形） */}
      <g style={dim(active, 1)}>
        <polygon points="178,226 200,208 226,220 226,248 200,260 178,248" fill="#8fb8d4" stroke="#4d7ea8" strokeWidth="2.5" />
        <text x="201" y="240" textAnchor="middle" fontSize="13" fill="#1e4a68" fontWeight="700">核糖</text>
      </g>
      {/* 三个磷酸基团（P 圆）+ 高能键波浪 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2].map((i) => {
          const x = 268 + i * 62;
          return (
            <g key={i}>
              {i > 0 ? (
                <g>
                  <path d={`M${x - 62 + 22} 232 q 20 -14 40 0`} fill="none" stroke="#e07840" strokeWidth="3.5" />
                  <path d={`M${x - 62 + 22} 244 q 20 -14 40 0`} fill="none" stroke="#e07840" strokeWidth="3.5" />
                </g>
              ) : (
                <line x1="226" y1="234" x2={x - 22} y2="234" stroke="#5a7a8a" strokeWidth="3" />
              )}
              <circle cx={x} cy="234" r="20" fill="#f0c05a" stroke="#c99a2e" strokeWidth="2.5" />
              <text x={x} y="240" textAnchor="middle" fontSize="14" fill="#6a4a10" fontWeight="800">
                P
              </text>
            </g>
          );
        })}
        <text x="354" y="206" textAnchor="middle" fontSize="13" fill="#c05a20" fontWeight="700">高能磷酸键 ～</text>
      </g>
      {/* 标注 */}
      <g style={dim(active, 0)}>
        <text x="122" y="236" textAnchor="middle" fontSize="13.5" fill="#5a2a72" fontWeight="700">腺苷 = 腺嘌呤 + 核糖</text>
      </g>
      <g style={dim(active, 2)}>
        <line x1="392" y1="262" x2="392" y2="292" stroke="#e07840" strokeWidth="1.5" />
        <text x="392" y="308" textAnchor="middle" fontSize="13.5" fill="#c05a20" fontWeight="700">
          远离 A 的高能磷酸键很容易断裂与重建
        </text>
      </g>
      {/* A-P~P~P 总式 */}
      <g style={dim(active, 3)}>
        <rect x="150" y="316" width="220" height="34" rx="8" fill="#fdf3dd" stroke="#d9c23e" strokeWidth="1.6" />
        <text x="260" y="338" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="800">
          A — P ～ P ～ P
        </text>
      </g>
      <text x="500" y="368" textAnchor="end" fontSize="12.5" fill="#799398">ATP 结构模式图（细胞的能量货币）</text>
    </svg>
  );
}

/* ================= HIV 病毒 ================= */

function HivSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 包膜（外层大圆） */}
      <g style={dim(active, 0)}>
        <circle cx="260" cy="180" r="132" fill="#c9a0a0" stroke="#9a5a5a" strokeWidth="3.5" />
        <circle cx="260" cy="180" r="132" fill="none" stroke="#b57a7a" strokeWidth="8" opacity="0.5" />
      </g>
      {/* 包膜糖蛋白（gp120 嘴突 + gp41 柄） */}
      <g style={dim(active, 1)}>
        {[
          [158, 92, -40], [232, 62, -10], [312, 78, 25], [368, 138, 55],
          [368, 226, 125], [312, 288, 155], [232, 300, -170], [158, 268, 215], [124, 180, -90],
        ].map(([dx, dy, rot], i) => {
          const x = dx as number;
          const y = dy as number;
          const r = rot as number;
          return (
            <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
              <line x1="0" y1="0" x2="0" y2="22" stroke="#8a4a4a" strokeWidth="4" />
              <circle cx="0" cy="-4" r="9" fill="#d98a8a" stroke="#8a4a4a" strokeWidth="2" />
            </g>
          );
        })}
        <text x="404" y="66" fontSize="13" fill="#8a4a4a" fontWeight="700">包膜糖蛋白</text>
        <line x1="400" y1="70" x2="318" y2="88" stroke="#8a4a4a" strokeWidth="1.3" />
      </g>
      {/* 衣壳（内层锥形/截圆） */}
      <g style={dim(active, 2)}>
        <path d="M196 130 L324 130 L296 236 L224 236 Z" fill="#8fb8d4" stroke="#3d6a94" strokeWidth="3" opacity="0.95" />
        <text x="260" y="188" textAnchor="middle" fontSize="13" fill="#1e4a68" fontWeight="700">衣壳（蛋白质）</text>
      </g>
      {/* 两条 RNA + 逆转录酶 */}
      <g style={dim(active, 3)}>
        <path d="M238 160 q 11 -10 22 0 q 11 10 22 0" fill="none" stroke="#ff9f43" strokeWidth="4" strokeLinecap="round" />
        <path d="M238 174 q 11 10 22 0 q 11 -10 22 0" fill="none" stroke="#ff9f43" strokeWidth="4" strokeLinecap="round" />
        <circle cx="282" cy="212" r="9" fill="#7fb88a" stroke="#3f7f52" strokeWidth="2" />
        <text x="282" y="216" textAnchor="middle" fontSize="12" fill="#1e4a2e" fontWeight="700">RT</text>
      </g>
      {/* 标注 */}
      <g style={dim(active, 0)}>
        <line x1="386" y1="160" x2="420" y2="150" stroke="#9a5a5a" strokeWidth="1.4" />
        <text x="424" y="146" fontSize="13.5" fill="#8a4a4a" fontWeight="700">包膜（脂质）</text>
        <text x="424" y="160" fontSize="12.5" fill="#a86a6a">来自宿主细胞膜</text>
      </g>
      <g style={dim(active, 3)}>
        <line x1="262" y1="168" x2="128" y2="140" stroke="#e07840" strokeWidth="1.4" />
        <text x="16" y="132" fontSize="13.5" fill="#c97020" fontWeight="700">两条 RNA（遗传物质）</text>
        <text x="16" y="146" fontSize="12.5" fill="#d08a4a">+ 逆转录酶（RNA → DNA）</text>
      </g>
      <text x="14" y="342" fontSize="13.5" fill="#8a4a4a" fontWeight="700">HIV 侵染 T 细胞：逆转录 → 整合 → 破坏免疫系统（艾滋病）</text>
      <text x="500" y="368" textAnchor="end" fontSize="12.5" fill="#799398">HIV 病毒结构模式图</text>
    </svg>
  );
}

/* ================= 神经元 ================= */

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

/* ================= 蓝细菌 ================= */

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

/* ================= 酵母菌 ================= */

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

/* ================= 分泌蛋白的合成与运输 ================= */

function SecretoryProteinSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 4)}>
        <path d="M60 40 Q 40 190 60 340" fill="none" stroke="#3d7e9e" strokeWidth="4" />
        <text x="44" y="110" fontSize="13" fill="#2c6e94" fontWeight="700">细胞膜</text>
      </g>
      <g style={dim(active, 5)}>
        <circle cx="130" cy="200" r="42" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="3" />
        <text x="130" y="204" textAnchor="middle" fontSize="12.5" fill="#ffffff" fontWeight="700">细胞核</text>
      </g>
      <g style={dim(active, 0)}>
        {[[186, 120], [204, 140], [222, 160], [240, 180]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5.5" fill="#1e5a8e" />
        ))}
        <text x="186" y="96" fontSize="13" fill="#1e5a8e" fontWeight="700">核糖体（合成肽链）</text>
      </g>
      <g style={dim(active, 0)}>
        <path d="M196 130 C 240 140, 262 156, 268 178" fill="none" stroke="#7fb8d4" strokeWidth="12" strokeLinecap="round" />
        <text x="238" y="126" fontSize="13" fill="#2c6e94" fontWeight="700">内质网（初步加工）</text>
      </g>
      <g style={dim(active, 0)}>
        <circle cx="296" cy="170" r="12" fill="#a8d0e8" stroke="#4d7ea8" strokeWidth="2" />
        <path d="M296 182 q 10 10 4 22" fill="none" stroke="#4d7ea8" strokeWidth="2" strokeDasharray="3 2" />
      </g>
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M318 ${196 + i * 14} q 34 -14 68 0`} fill="none" stroke="#e0b06a" strokeWidth="7" strokeLinecap="round" />
        ))}
        <text x="352" y="266" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="700">高尔基体（再加工包装）</text>
      </g>
      <g style={dim(active, 1)}>
        <circle cx="404" cy="256" r="11" fill="#a8d0e8" stroke="#4d7ea8" strokeWidth="2" />
        <path d="M416 262 Q 436 282 452 296" fill="none" stroke="#4d7ea8" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="458" cy="300" r="10" fill="#a8d0e8" stroke="#4d7ea8" strokeWidth="2" />
        <text x="452" y="322" textAnchor="middle" fontSize="12.5" fill="#2c6e94">胞吐分泌</text>
      </g>
      <g style={dim(active, 5)}>
        <g transform="rotate(-24 150 296)">
          <ellipse cx="150" cy="296" rx="34" ry="18" fill="#f0a06a" stroke="#c2703d" strokeWidth="2.5" />
          <path d="M128 296 q 8 -9 16 0 q 8 9 16 0" fill="none" stroke="#c2703d" strokeWidth="2" />
        </g>
        <text x="150" y="336" textAnchor="middle" fontSize="12.5" fill="#c2703d" fontWeight="600">线粒体（供能）</text>
      </g>
      <text x="14" y="34" fontSize="13.5" fill="#2c6e94" fontWeight="700">分泌蛋白的合成与运输路径：</text>
      <text x="14" y="52" fontSize="13" fill="#4b6c73">核糖体（合成）→ 内质网加工 → 高尔基体包装 → 细胞膜胞吐</text>
      <text x="500" y="368" textAnchor="end" fontSize="12.5" fill="#799398">分泌蛋白合成运输模式图（如胰岛素、消化酶）</text>
    </svg>
  );
}

/* ================= 哺乳动物红细胞 ================= */

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

/* ================= 流感病毒 ================= */

function FluVirusSvg({ active }: { active: number | null; open?: boolean }) {
  const spikes: Array<[number, number, number]> = [
    [150, 96, -42], [206, 68, -18], [266, 60, 0], [322, 80, 22], [366, 122, 48],
    [384, 182, 90], [362, 244, 132], [318, 284, 158], [260, 298, 180], [200, 286, 205], [156, 248, 228], [136, 184, 268],
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 包膜（脂质，来自宿主细胞膜） */}
      <g style={dim(active, 0)}>
        <circle cx="260" cy="180" r="118" fill="#e8b06a" stroke="#b07a34" strokeWidth="4" />
        <circle cx="260" cy="180" r="118" fill="none" stroke="#f4d09a" strokeWidth="7" opacity="0.6" />
      </g>
      {/* 包膜蛋白：HA（红）与 NA（蓝）交替 */}
      <g style={dim(active, 1)}>
        {spikes.map(([x, y, rot], i) => {
          const isHa = i % 2 === 0;
          if (!isHa) return null;
          const color = '#c9503c';
          return (
            <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
              <line x1="0" y1="0" x2="0" y2="20" stroke={color} strokeWidth="4" />
              <ellipse cx="0" cy="-6" rx="11" ry="9" fill="#e07a5a" stroke={color} strokeWidth="2.4" />
            </g>
          );
        })}
        <line x1="382" y1="120" x2="418" y2="98" stroke="#c9503c" strokeWidth="1.4" />
        <text x="420" y="94" fontSize="13.5" fill="#c9503c" fontWeight="700">HA 血凝素</text>
        <text x="420" y="116" fontSize="12.5" fill="#d97a5a">识别宿主细胞受体</text>
      </g>
      <g style={dim(active, 2)}>
        {spikes.map(([x, y, rot], i) => {
          const isHa = i % 2 === 0;
          if (isHa) return null;
          const color = '#3d7fa6';
          return (
            <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
              <line x1="0" y1="0" x2="0" y2="20" stroke={color} strokeWidth="4" />
              <ellipse cx="0" cy="-6" rx="8" ry="11" fill="#6aa8cc" stroke={color} strokeWidth="2.4" />
            </g>
          );
        })}
        <line x1="268" y1="54" x2="300" y2="38" stroke="#3d7fa6" strokeWidth="1.4" />
        <text x="303" y="34" fontSize="13.5" fill="#3d7fa6" fontWeight="700">NA 神经氨酸酶</text>
        <text x="303" y="56" fontSize="12.5" fill="#5a98b5">帮助新病毒释放（奥司他韦靶点）</text>
      </g>
      {/* 衣壳蛋白层（与 RNA 同属内芯，选中 RNA 时一并高亮） */}
      <g style={dim(active, 3)}>
        <circle cx="260" cy="180" r="86" fill="none" stroke="#b07a34" strokeWidth="7" opacity="0.45" />
        <circle cx="260" cy="180" r="74" fill="#f2d9b0" stroke="#b07a34" strokeWidth="3" />
        <text x="260" y="274" textAnchor="middle" fontSize="12.5" fill="#8a5a20" fontWeight="700">衣壳蛋白（保护内部）</text>
      </g>
      {/* 分节段的 RNA + 聚合酶 */}
      <g style={dim(active, 3)}>
        {[150, 172, 194, 216].map((y, i) => (
          <path
            key={i}
            d={`M212 ${y} q 12 ${i % 2 === 0 ? -9 : 9} 24 0 q 12 ${i % 2 === 0 ? 9 : -9} 24 0 q 12 ${i % 2 === 0 ? -9 : 9} 24 0`}
            fill="none"
            stroke="#9a6fb5"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        ))}
        <text x="104" y="120" fontSize="13.5" fill="#7a4a9a" fontWeight="700">8 段 RNA（遗传物质）</text>
        <line x1="118" y1="126" x2="208" y2="164" stroke="#7a4a9a" strokeWidth="1.4" />
      </g>
      <g style={dim(active, 4)}>
        {[268, 296].map((x, i) => (
          <circle key={i} cx={x} cy={214 + i * 4} r="7.5" fill="#7fb88a" stroke="#3f7f52" strokeWidth="2" />
        ))}
        <text x="308" y="222" fontSize="13.5" fill="#3f7f52" fontWeight="700">RNA 聚合酶</text>
        <text x="308" y="244" fontSize="12.5" fill="#5a9870">复制 RNA 必需</text>
      </g>
      <g style={dim(active, 3)}>
        <text x="16" y="320" fontSize="13.5" fill="#8a5a20" fontWeight="700">RNA 分成 8 个节段 → 不同毒株混合感染时易发生基因重配 → 变异快</text>
        <text x="16" y="342" fontSize="12.5" fill="#a87a4a">所以流感疫苗常需根据流行株年年更新</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">流感病毒结构模式图</text>
    </svg>
  );
}

/* ================= 数据汇总 ================= */

export const SPECIMENS: Specimen[] = [
  {
    id: 'neuron',
    name: '神经元',
    kicker: '神经细胞 · 结构模式图',
    intro: '神经系统结构与功能的基本单位：树突接收信息，轴突传出信息——神经冲动沿这个方向传导。',
    parts: [
      { name: '树突', desc: '短而多、呈树枝状分支，负责接收信息并把兴奋传向细胞体。' },
      { name: '细胞体', desc: '含有细胞核的膨大部分，代谢与整合信息的中心。' },
      { name: '轴突', desc: '一般只有一条、较长，把兴奋从细胞体传向神经末梢；有些外包髓鞘可加快传导。' },
      { name: '髓鞘', desc: '包绕在轴突外的结构，像电线的绝缘层，能显著加快神经冲动传导速度。' },
      { name: '神经末梢', desc: '轴突末端的细小分支，把兴奋传递给下一个神经元或效应器（支配的肌肉、腺体）。' },
    ],
    Svg: NeuronSvg,
  },
  {
    id: 'cyanobacteria',
    name: '蓝细菌',
    kicker: '原核细胞 · 结构模式图',
    intro: '旧称蓝藻：没有叶绿体，却含叶绿素和藻蓝素，是能进行光合作用的自养原核生物。',
    parts: [
      { name: '细胞壁（肽聚糖）', desc: '与大肠杆菌类似，主要成分是肽聚糖——与植物细胞壁成分（纤维素果胶）不同。' },
      { name: '细胞膜', desc: '控制物质进出的边界，位于细胞壁内侧。' },
      { name: '光合膜片层', desc: '含叶绿素和藻蓝素，能进行光合作用——"没有叶绿体也能光合作用"是高频考点。' },
      { name: '拟核（DNA）', desc: '环状 DNA 集中区域，无核膜包被——原核细胞与真核细胞最根本的区别。' },
      { name: '核糖体', desc: '原核细胞唯一拥有的细胞器，合成蛋白质。' },
    ],
    Svg: CyanobacteriaSvg,
  },
  {
    id: 'yeast',
    name: '酵母菌',
    kicker: '真核真菌 · 结构模式图',
    intro: '单细胞真核真菌，兼性厌氧——有氧大量繁殖、无氧发酵产酒精，是果酒制作的菌种。',
    parts: [
      { name: '细胞壁', desc: '主要成分是几丁质（真菌多糖），起保护和支持作用。' },
      { name: '液泡', desc: '维持细胞渗透压、储存物质；真核细胞特有的成熟结构。' },
      { name: '细胞核', desc: '有以核膜为界限的细胞核——是真核生物（真菌）的重要特征，与原核细菌不同。' },
      { name: '出芽生殖', desc: '细胞上长出芽体，脱落后成为新个体——酵母菌典型的无性生殖方式。' },
    ],
    Svg: YeastCellSvg,
  },
  {
    id: 'secretoryProtein',
    name: '分泌蛋白的合成与运输',
    kicker: '细胞器合作 · 过程模式图',
    intro: '胰岛素、消化酶等分泌蛋白：核糖体合成 → 内质网加工 → 高尔基体包装 → 细胞膜胞吐——多种细胞器协调配合。',
    parts: [
      { name: '核糖体（附着）', desc: '附着在内质网上的核糖体合成肽链——分泌蛋白的"生产车间"。' },
      { name: '内质网', desc: '对肽链进行折叠、组装与初步加工（如加糖基），以囊泡形式转运。' },
      { name: '囊泡', desc: '内质网与高尔基体之间、高尔基体与细胞膜之间的"运输小泡"。' },
      { name: '高尔基体', desc: '对蛋白质做进一步修饰加工、分类包装，再形成囊泡运向细胞膜。' },
      { name: '线粒体（供能）', desc: '全过程需要能量，由线粒体有氧呼吸提供。' },
    ],
    Svg: SecretoryProteinSvg,
  },
  {
    id: 'rnaStrand',
    name: 'RNA 单链',
    kicker: '核酸 · 结构模式图',
    intro: '单链结构，用核糖而不是脱氧核糖，碱基里没有 T 而有 U——与 DNA 对比着记。',
    parts: [
      { name: '磷酸基团', desc: '交替连接核糖形成骨架；RNA 一般为单链，不像 DNA 形成双螺旋。' },
      { name: '核糖（五碳糖）', desc: 'RNA 用核糖，DNA 用脱氧核糖——名称差异就在"脱氧"两个字上。' },
      { name: '碱基（A U G C）', desc: 'RNA 的碱基是 A、U、G、C：没有胸腺嘧啶 T，用尿嘧啶 U 代替与 A 配对。' },
      { name: '单链结构', desc: 'mRNA（信使）、tRNA（转运）、rRNA（核糖体组成）等多种 RNA 都以单链形式执行功能。' },
      { name: '与 DNA 的对比', desc: '五碳糖不同（核糖/脱氧核糖）、碱基不同（U/T）、链数不同（单/双）——三大区别是常考点。' },
    ],
    Svg: RnaStrandSvg,
  },
  {
    id: 'atpMolecule',
    name: 'ATP 分子',
    kicker: '能源物质 · 结构模式图',
    intro: '三磷酸腺苷：腺苷 + 3 个磷酸基团。远离腺苷的高能磷酸键断裂释放能量，直接为细胞供能。',
    parts: [
      { name: '腺苷（腺嘌呤+核糖）', desc: 'ATP 的"A"；腺嘌呤与核糖结合成腺苷，是三种腺苷磷酸（AMP/ADP/ATP）的共同部分。' },
      { name: '核糖（五碳糖）', desc: '连接腺嘌呤与磷酸链的五碳糖。' },
      { name: '三个磷酸基团', desc: '磷酸基团之间带负电、相互排斥，故高能磷酸键储存大量化学能。' },
      { name: '高能磷酸键', desc: '"～"表示高能磷酸键；远离腺苷的那个最容易断裂（ATP→ADP+Pi+能量），也最容易重建（ADP+Pi+能量→ATP）。' },
      { name: 'ATP 与 ADP 的转化', desc: 'ATP ⇌ ADP + Pi + 能量：合成时储能，水解时放能——细胞能量的通用"货币"。' },
    ],
    Svg: AtpSvg,
  },
  {
    id: 'hiv',
    name: 'HIV 病毒',
    kicker: '病毒 · 结构模式图',
    intro: '艾滋病（AIDS）的病原体：包膜上糖蛋白吸附并侵染 T 淋巴细胞，内部两条 RNA 与逆转录酶——RNA 病毒。',
    parts: [
      { name: '包膜（脂质）', desc: '来自宿主（T 淋巴细胞）细胞膜的脂质层，包在病毒最外层。' },
      { name: '包膜糖蛋白', desc: 'gp120/gp41 等糖蛋白，特异性识别并结合 T 细胞表面的受体（CD4），决定 HIV 专一性侵染 T 细胞。' },
      { name: '衣壳（蛋白质）', desc: '保护内部 RNA 与酶的蛋白质外壳。' },
      { name: '两条 RNA（遗传物质）', desc: 'HIV 的遗传物质是 RNA——它是一种逆转录病毒。' },
      { name: '逆转录酶（RT）', desc: '能以 RNA 为模板逆转录合成 DNA，再整合到宿主染色体上——"中心法则"的补充路径。' },
    ],
    Svg: HivSvg,
  },
  {
    id: 'fluVirus',
    name: '流感病毒',
    kicker: '病毒 · 结构模式图',
    intro: '流行性感冒的病原体：包膜上有 HA 和 NA 两种突起，遗传物质是分成 8 段的 RNA——分节段使它极易变异。',
    parts: [
      { name: '包膜（脂质）', desc: '来自宿主细胞膜的脂质层，包在病毒最外层，包裹着内部的衣壳与核酸。' },
      { name: 'HA 血凝素', desc: '包膜上的红色突起，识别并结合宿主细胞表面的受体，决定病毒能感染哪些细胞。' },
      { name: 'NA 神经氨酸酶', desc: '包膜上的蓝色突起，帮助新生病毒从细胞表面释放——抗流感药奥司他韦正是抑制它的活性。' },
      { name: '8 段 RNA（遗传物质）', desc: '流感病毒的 RNA 分成 8 个节段。不同毒株混合感染同一细胞时节段可重新组合（基因重配），因此变异极快，疫苗需年年更新。' },
      { name: 'RNA 聚合酶', desc: '宿主细胞不能复制 RNA，流感病毒必须自带聚合酶才能在细胞内复制遗传物质。' },
    ],
    Svg: FluVirusSvg,
  },
  {
    id: 'dnaHelix',
    name: 'DNA 双螺旋',
    kicker: '核酸 · 结构模式图',
    intro: '两条脱氧核苷酸链反向平行盘旋成双螺旋；碱基对像螺旋梯子的横档——A 与 T 配对、G 与 C 配对。',
    parts: [
      { name: '脱氧核糖-磷酸骨架', desc: '两条长链的骨架，由脱氧核糖与磷酸交替连接而成，靠磷酸二酯键相连；两条链反向平行。' },
      { name: '另一条骨架', desc: '与第一条反向平行；两条链绕同一轴盘旋成规则的双螺旋（螺旋直径约 2nm）。' },
      { name: '碱基对', desc: '两条链上的碱基通过氢键配对"横档"：A（腺嘌呤）一定与 T（胸腺嘧啶）配对，G（鸟嘌呤）一定与 C（胞嘧啶）配对——碱基互补配对原则。' },
      { name: '碱基配对（A-T / G-C）', desc: 'A-T 之间 2 个氢键，G-C 之间 3 个氢键；配对严谨，是 DNA 复制与转录保持遗传信息稳定的结构基础。' },
      { name: '双螺旋整体形态', desc: '从端部看，两条骨架像旋转楼梯的两根扶手，碱基对就是一级级台阶；螺旋一圈约含 10 个碱基对。' },
    ],
    Svg: DnaHelixSvg,
  },
  {
    id: 'membraneModel',
    name: '细胞膜流动镶嵌模型',
    kicker: '细胞膜 · 结构模式图',
    intro: '磷脂双分子层构成膜的基本支架，蛋白质有的镶在表面、有的嵌入或贯穿整个磷脂双分子层——结构特点：具有一定的流动性。',
    parts: [
      { name: '磷脂分子（双分子层）', desc: '膜的基本支架：圆头（亲水）朝向两侧水环境，两条尾（疏水）相对藏在中间；磷脂分子可以侧向自由流动。' },
      { name: '蛋白质', desc: '有的镶在磷脂双分子层表面，有的部分或全部嵌入，有的贯穿整个双分子层——大多数蛋白质分子也可运动。' },
      { name: '糖链（糖被）', desc: '细胞膜外表面的糖蛋白/糖脂上的糖链，与细胞识别、免疫反应、信息传递密切相关。' },
      { name: '胆固醇', desc: '动物细胞膜含有的脂质，调节膜的流动性与稳定性（高温防过流、低温防凝固）。' },
      { name: '磷脂双分子层', desc: '结构特点：流动性（磷脂与大多数蛋白质可动）；功能特点：选择透过性——结构与功能相适应。' },
    ],
    Svg: MembraneModelSvg,
  },
  {
    id: 'redBloodCell',
    name: '哺乳动物红细胞',
    kicker: '细胞膜材料 · 结构模式图',
    intro: '成熟哺乳动物红细胞：双凹圆盘状，没有细胞核和众多细胞器，唯一的膜就是细胞膜——制备纯净细胞膜的经典材料。',
    parts: [
      { name: '细胞膜（唯一膜结构）', desc: '没有细胞壁、没有核膜与众多细胞器膜的干扰，吸水胀破后离心即可得到较纯净的细胞膜——实验"体验制备细胞膜"选材的原因。' },
      { name: '双凹圆盘形态', desc: '中央较薄、边缘较厚，像甜甜圈被压扁——增大表面积，有利于携带更多氧气、更快进行气体交换。' },
      { name: '无细胞核', desc: '成熟过程中细胞核退化消失，为血红蛋白腾出空间；因此红细胞不能再分裂，寿命约 120 天。' },
      { name: '血红蛋白', desc: '细胞内含量最多的蛋白质，含铁，能与氧气结合——血液呈红色、红细胞能运 O2 都靠它。注意与血浆蛋白区分：血红蛋白在细胞内，不属于内环境成分。' },
      { name: '可变形的身材', desc: '直径约 7.6 μm，但能变形挤过直径更小的毛细血管，通过后恢复原状——细胞膜的流动性体现。' },
    ],
    Svg: RedBloodCellSvg,
  },
  {
    id: 'phage',
    name: 'T2 噬菌体',
    kicker: '病毒 · 结构模式图',
    intro: '专门侵染大肠杆菌的细菌病毒：蛋白质外壳包裹 DNA，尾部吸附细菌后把 DNA 注入——赫尔希和蔡斯用它证明了 DNA 是遗传物质。',
    parts: [
      { name: '蛋白质外壳', desc: '保护内部核酸；在侵染过程中，蛋白质外壳留在细菌外面——这是"DNA 是遗传物质"实验的关键证据之一。' },
      { name: '尾鞘', desc: '像注射器一样收缩，把头部的 DNA 注入宿主细菌内。' },
      { name: '尾丝（吸附宿主）', desc: '末端吸附在大肠杆菌表面特定位点，决定噬菌体只能侵染对应的细菌（专一性）。' },
      { name: 'DNA', desc: '头部内的遗传物质；侵染时只有 DNA 进入细菌，却能指导合成完整的子代噬菌体——直接证明 DNA 是遗传物质。' },
      { name: '大肠杆菌（宿主细胞）', desc: '被侵染的对象；噬菌体在细菌内利用原料合成自身组件，最终细菌裂解并释放子代噬菌体。' },
    ],
    Svg: PhageSvg,
  },
  {
    id: 'animal',
    name: '动物细胞',
    kicker: '真核细胞 · 亚显微结构模式图',
    intro: '无细胞壁、无叶绿体、无大液泡；有中心体（低等植物也有）。点击右侧结构名或图中编号，查看每种结构的功能。',
    parts: [
      { name: '细胞膜', desc: '细胞的边界，磷脂双分子层构成（流动镶嵌模型），控制物质进出；在光学显微镜下几乎不可见。' },
      { name: '细胞质', desc: '细胞膜以内、细胞核以外的胶状基质，是新陈代谢的主要场所，各种细胞器悬浮其中。' },
      { name: '细胞核', desc: '遗传信息库与代谢控制中心：核膜（双层，有核孔）、染色质（DNA+蛋白质）、核仁（与 rRNA 合成有关）。' },
      { name: '线粒体', desc: '双层膜，内膜向内折叠形成嵴；有氧呼吸的主要场所（第二、三阶段），细胞的"动力车间"。' },
      { name: '核糖体', desc: '无膜结构，"生产蛋白质的机器"；游离在细胞质或附着在内质网上。' },
      { name: '内质网', desc: '单层膜连接成的网状结构，增大膜面积；与蛋白质合成加工、脂质合成有关（附着核糖体的为粗面内质网）。' },
      { name: '高尔基体', desc: '单层膜囊堆；对蛋白质进行加工、分类、包装与发送（植物细胞中与细胞壁形成有关）。' },
      { name: '中心体', desc: '无膜结构，由两个互相垂直的中心粒组成；与动物细胞（及低等植物细胞）的有丝分裂有关。' },
      { name: '溶酶体', desc: '单层膜的"消化车间"，内含水解酶，分解衰老细胞器和吞入的病原体。' },
    ],
    Svg: AnimalCellSvg,
    StageWebGL: AnimalCellWebGLModel,
  },
  {
    id: 'plant',
    name: '植物细胞',
    kicker: '真核细胞 · 亚显微结构模式图',
    intro: '与动物细胞的核心区别：有细胞壁、叶绿体和大液泡，无中心体（高等植物）。',
    parts: [
      { name: '细胞壁', desc: '全透性，主要成分是纤维素和果胶；支持和保护细胞。' },
      { name: '细胞膜', desc: '紧贴细胞壁内侧，选择透过性膜——质壁分离实验中它与液泡膜之间充满外界溶液。' },
      { name: '细胞质', desc: '细胞器悬浮的基质；成熟植物细胞的细胞质呈一薄层，被大液泡挤向边缘。' },
      { name: '细胞核', desc: '遗传信息库；观察质壁分离时常选洋葱鳞片叶外表皮——液泡呈紫色便于观察，而细胞核位置靠近细胞壁。' },
      { name: '叶绿体', desc: '双层膜的"养料制造车间"和能量转换站：类囊体（基粒）上进行光反应，基质中进行暗反应。' },
      { name: '大液泡', desc: '单层液泡膜包被，内含细胞液；与质壁分离和复原直接相关——成熟植物细胞是渗透系统的关键。' },
      { name: '线粒体', desc: '有氧呼吸主要场所；植物细胞同样需要线粒体供能（叶绿体≠能量供应的全部）。' },
    ],
    Svg: PlantCellSvg,
    StageWebGL: PlantCellWebGLModel,
  },
  {
    id: 'chloroplast',
    name: '叶绿体',
    kicker: '细胞器 · 立体剖面模式图',
    intro: '光合作用的场所，双层膜结构；切窗内一摞摞的基粒——光反应在类囊体膜上，暗反应在基质中。也可切换「实景 3D」自由旋转缩放。',
    parts: [
      { name: '外膜', desc: '双层膜的外层，平滑、通透性较高；"叶绿体是双层膜细胞器"考点中的第一层。' },
      { name: '内膜', desc: '包裹基质的选择性透性膜，控制物质进出叶绿体。' },
      { name: '基质', desc: '暗反应（CO₂ 的固定与 C₃ 的还原）进行的场所，含有与光合作用有关的酶，还有少量 DNA、核糖体和淀粉粒。' },
      { name: '基粒（类囊体堆叠）', desc: '一个个类囊体（囊状结构）像硬币一样垛叠成基粒；光反应就在类囊体薄膜上进行——色素和光反应酶分布于此。' },
      { name: '基质类囊体', desc: '连接各个基粒的类囊体薄膜，把所有基粒连成统一的膜系统，扩大受光面积。' },
      { name: '叶绿体 DNA 与核糖体', desc: '半自主细胞器：含少量 DNA 和核糖体，能合成部分自身蛋白质（线粒体同理）。' },
    ],
    Svg: ChloroplastSvg,
    Stage3d: Chloroplast3d,
    StageWebGL: ChloroplastWebGLModel,
  },
  {
    id: 'mitochondrion',
    name: '线粒体',
    kicker: '细胞器 · 立体剖面模式图',
    intro: '有氧呼吸的主要场所（第二、三阶段），双层膜；切口处可以看到嵴、基质与膜间隙的层次关系。也可切换「实景 3D」自由旋转缩放。',
    parts: [
      { name: '外膜', desc: '平滑的双层膜外层，表面有孔蛋白（porins），通透性较高；与内膜共同构成"双层膜细胞器"。' },
      { name: '内膜', desc: '向内腔折叠形成嵴；通透性低，有氧呼吸第三阶段的呼吸链与 ATP 合成酶都分布在这层膜上。' },
      { name: '嵴', desc: '内膜向基质折叠形成的管状结构，扩大了内膜面积，为呼吸酶提供大量附着位点——结构与功能相适应的典型例证。' },
      { name: '膜间隙', desc: '内外膜之间的窄腔；有氧呼吸中 H⁺ 在此积累形成浓度梯度，驱动 ATP 合成酶工作。' },
      { name: '基质', desc: '有氧呼吸第二阶段（丙酮酸和水彻底分解）的场所；含有与呼吸作用有关的酶、基质颗粒、环状 DNA 和核糖体。' },
      { name: '环状 DNA', desc: '线粒体自身的遗传物质（类似细菌的环状 DNA）；这是"线粒体起源于内共生"的证据之一。' },
      { name: '核糖体', desc: '分布在基质中的小颗粒，可合成部分线粒体自身的蛋白质——半自主细胞器的体现。' },
      { name: 'ATP 合成酶', desc: '内膜和嵴表面的带柄颗粒状突起，利用膜间隙与基质之间的 H⁺ 浓度梯度合成 ATP。' },
    ],
    Svg: MitochondrionSvg,
    Stage3d: Mitochondrion3d,
    StageWebGL: MitochondrionWebGLModel,
  },
  {
    id: 'ecoli',
    name: '大肠杆菌',
    kicker: '原核细胞 · 结构模式图',
    intro: '原核生物的代表：没有以核膜为界限的细胞核，只有拟核；细胞器只有核糖体一种。',
    parts: [
      { name: '鞭毛', desc: '长而少的蛋白质丝状结构，像螺旋桨一样摆动，是细菌的运动器官（不是所有菌都有）。' },
      { name: '菌毛', desc: '短而多的毛发状结构，帮助菌体附着；注意与鞭毛区分（长短与数量）。' },
      { name: '荚膜', desc: '部分菌株在细胞壁外分泌的黏液层，有保护作用（厚荚膜的菌落表面光滑湿润）。' },
      { name: '细胞壁', desc: '主要成分是肽聚糖（与植物细胞壁的纤维素、果胶不同）——支持保护；青霉素通过干扰肽聚糖合成抑菌。' },
      { name: '细胞膜', desc: '与真核细胞膜类似的磷脂双分子层；原核细胞产能有关的酶也分布在细胞膜上。' },
      { name: '拟核', desc: '大型环状 DNA 集中的区域，没有核膜包被、没有核仁——这是原核细胞与真核细胞最根本的区别。' },
      { name: '质粒', desc: '拟核之外的小型环状 DNA，能自主复制；基因工程中常用的载体（抗药性基因常位于其上）。' },
      { name: '核糖体', desc: '原核细胞唯一的细胞器，合成蛋白质——"原核细胞只有核糖体一种细胞器"是高频考点。' },
    ],
    Svg: EColiSvg,
    StageWebGL: EColiWebGLModel,
  },
  {
    id: 'paramecium',
    name: '草履虫',
    kicker: '单细胞原生动物 · 结构模式图',
    intro: '像倒转的草鞋底一样而得名；一个细胞就能完成运动、摄食、消化、排泄和生殖等全部生命活动。',
    parts: [
      { name: '纤毛', desc: '表膜上密布的短毛，像船桨一样协调摆动使虫体旋转前进——草履虫的运动结构。' },
      { name: '表膜', desc: '相当于细胞膜，完成气体交换（溶解氧透入、CO₂ 排出）。' },
      { name: '口沟', desc: '体侧内陷的沟槽，纤毛摆动把食物（细菌等）吹入口沟，"口沟一侧"是草履虫外形的最明显特征。' },
      { name: '胞口', desc: '口沟末端的开口，食物由此进入体内形成食物泡。' },
      { name: '食物泡', desc: '包裹食物的小泡，随细胞质环流流动，与溶酶体结合逐步消化，残渣由胞肛排出。' },
      { name: '伸缩泡 + 收集管', desc: '前后各一个，收集多余水分和无机盐并排出体外——维持渗透压（淡水生物必备）。' },
      { name: '大核', desc: '营养代谢的主导核（多倍性）；草履虫核有大小两型，分工明确。' },
      { name: '小核', desc: '与生殖有关；接合生殖时小核进行减数分裂交换遗传物质。' },
      { name: '胞肛', desc: '不能消化的残渣由此排出体外的固定开口（位于体后一侧）。' },
    ],
    Svg: ParameciumSvg,
    StageWebGL: ParameciumWebGLModel,
  },
  {
    id: 'stoma',
    name: '保卫细胞与气孔',
    kicker: '植物表皮 · 气孔器结构',
    intro: '一对肾形的保卫细胞围成气孔。保卫细胞吸水→气孔张开，失水→气孔闭合；点下方按钮看开闭过程。',
    parts: [
      { name: '保卫细胞', desc: '一对半月形（肾形）细胞，含叶绿体（与周围表皮细胞最大的区别）；是唯一能感知并响应光照、CO₂ 浓度而运动的表皮细胞。' },
      { name: '气孔', desc: '两个保卫细胞之间的孔隙，是植物蒸腾失水的"门户"，也是气体交换（CO₂ 进、O₂ 出）的"窗口"。' },
      { name: '内壁增厚', desc: '保卫细胞靠近气孔一侧的壁明显增厚（外壁薄）——吸水膨胀时薄的外壁向外弯曲，把内壁拉开，气孔张开。结构与功能相适应。' },
      { name: '叶绿体', desc: '保卫细胞含叶绿体可进行光合作用，光照下光合消耗 CO₂ → 细胞内浓度升高 → 吸水 → 气孔张开（白天开、夜晚合）。' },
      { name: '表皮细胞', desc: '围绕保卫细胞的普通表皮细胞，形状规则、不含叶绿体，起保护作用。' },
    ],
    Svg: GuardCellSvg,
    StageWebGL: StomaWebGLModel,
  },
];
