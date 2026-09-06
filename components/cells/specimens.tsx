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

/* ================= 高尔基体 ================= */

function GolgiSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 内质网（来源侧） */}
      <g style={dim(active, 0)}>
        <path d="M20 120 Q 60 100 96 128 M 24 168 Q 62 150 100 172 M 20 214 Q 64 198 102 218" fill="none" stroke="#7fb8d4" strokeWidth="10" strokeLinecap="round" />
        <text x="22" y="96" fontSize="13" fill="#2c6e94" fontWeight="600">来自内质网的囊泡</text>
      </g>
      {/* 扁平囊堆（主体） */}
      <g style={dim(active, 1)}>
        {[132, 162, 192, 222, 252].map((y, i) => (
          <path key={i} d={`M110 ${y} Q 200 ${y - 26} 290 ${y} Q 200 ${y + 16} 110 ${y} Z`} fill="#f0c98a" stroke="#b58a3a" strokeWidth="3" />
        ))}
        <text x="200" y="290" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">扁平囊（单层膜）堆叠成"发送站"</text>
      </g>
      {/* 形成面 / 成熟面 */}
      <g style={dim(active, 2)}>
        <text x="92" y="126" textAnchor="end" fontSize="13" fill="#3d7e9e" fontWeight="700">形成面（cis）</text>
        <text x="92" y="144" textAnchor="end" fontSize="12" fill="#5a94ae">朝向内质网</text>
        <text x="316" y="214" fontSize="13" fill="#c2703d" fontWeight="700">成熟面（trans）</text>
        <text x="316" y="232" fontSize="12" fill="#d08a5a">出芽生成囊泡</text>
      </g>
      {/* 囊泡输出 */}
      <g style={dim(active, 3)}>
        <circle cx="352" cy="150" r="14" fill="#f4d9b8" stroke="#c2703d" strokeWidth="2.5" />
        <circle cx="380" cy="120" r="10" fill="#f4d9b8" stroke="#c2703d" strokeWidth="2.5" />
        <path d="M308 158 Q 334 156 348 150" fill="none" stroke="#c2703d" strokeWidth="2.5" strokeDasharray="5 4" />
        <text x="390" y="182" textAnchor="middle" fontSize="13.5" fill="#c2703d" fontWeight="700">囊泡 → 细胞膜/溶酶体</text>
      </g>
      {/* 功能说明 */}
      <g style={dim(active, 1)}>
        <text x="16" y="330" fontSize="13.5" fill="#8a671b" fontWeight="700">对蛋白质做加工、分类、包装（分泌物的一站中转）</text>
        <text x="16" y="350" fontSize="12" fill="#a58a4a">植物细胞分裂时还参与细胞壁的形成</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">高尔基体结构模式图</text>
    </svg>
  );
}

/* ================= 内质网 ================= */

function EndoplasmicReticulumSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 细胞核与核膜（内质网内连核膜） */}
      <g style={dim(active, 2)}>
        <circle cx="112" cy="180" r="64" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="3.5" />
        <circle cx="112" cy="180" r="8" fill="#7a4a8a" />
        <text x="112" y="266" textAnchor="middle" fontSize="13.5" fill="#7a4a8a" fontWeight="700">细胞核（核膜与内质网相连）</text>
      </g>
      {/* 网状管道（主体） */}
      <g style={dim(active, 0)}>
        <path d="M172 132 Q 236 92 306 116 Q 372 138 430 112 M 176 180 Q 250 160 320 184 Q 390 206 452 178 M 170 232 Q 244 246 318 224 Q 386 206 444 236"
          fill="none" stroke="#8fb8d4" strokeWidth="13" strokeLinecap="round" />
        <text x="312" y="70" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">膜连接成的网状管道（单层膜）</text>
      </g>
      {/* 粗面内质网：附着核糖体 */}
      <g style={dim(active, 1)}>
        {[[246, 148], [286, 140], [326, 158], [366, 170], [406, 150]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6.5" fill="#1e5a8e" />
        ))}
        <text x="350" y="222" fontSize="13" fill="#1e5a8e" fontWeight="700">粗面内质网（附着核糖体）</text>
        <text x="350" y="240" fontSize="12" fill="#4a7a9a">合成、加工分泌蛋白</text>
      </g>
      {/* 滑面内质网 */}
      <g style={dim(active, 3)}>
        <path d="M200 300 Q 246 272 292 300 Q 338 328 384 300" fill="none" stroke="#a8c8a8" strokeWidth="12" strokeLinecap="round" />
        <text x="292" y="342" textAnchor="middle" fontSize="13" fill="#4a7a5a" fontWeight="700">滑面内质网：合成脂质（如性激素）</text>
      </g>
      <g style={dim(active, 0)}>
        <text x="16" y="52" fontSize="13.5" fill="#2c6e94" fontWeight="700">内连核膜、外连细胞膜——物质运输的"内通道"</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">内质网结构模式图</text>
    </svg>
  );
}

/* ================= 核糖体 ================= */

function RibosomeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 大亚基 + 小亚基 + mRNA */}
      <g style={dim(active, 0)}>
        <ellipse cx="240" cy="128" rx="74" ry="40" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="3.5" />
        <text x="240" y="124" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">大亚基</text>
      </g>
      <g style={dim(active, 1)}>
        <path d="M182 158 Q 240 176 298 158 L 298 182 Q 240 198 182 182 Z" fill="#8fb8d4" stroke="#3d6a94" strokeWidth="3" />
        <text x="240" y="226" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">小亚基（mRNA 从中间穿过）</text>
      </g>
      <g style={dim(active, 2)}>
        <path d="M96 176 Q 168 168 240 176 Q 312 184 384 174" fill="none" stroke="#ff9f43" strokeWidth="4.5" strokeLinecap="round" />
        {[132, 172, 212, 252, 292, 332].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={176} r="7" fill="#e08030" />
            <text x={x} y={180} textAnchor="middle" fontSize="12" fill="#7a3a10" fontWeight="700">{['A', 'U', 'G', 'C', 'U', 'A'][i]}</text>
          </g>
        ))}
        <text x="96" y="152" fontSize="13" fill="#c97020" fontWeight="700">mRNA（翻译的模板）</text>
      </g>
      {/* 肽链延伸 */}
      <g style={dim(active, 3)}>
        <path d="M286 158 Q 300 130 320 132 Q 340 134 348 112" fill="none" stroke="#4c8f5f" strokeWidth="5" strokeLinecap="round" />
        {[[298, 134], [314, 128], [332, 122], [348, 110]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#4c8f5f" />
        ))}
        <text x="330" y="92" fontSize="13.5" fill="#2f7a4d" fontWeight="700">多肽链（氨基酸逐个加上）</text>
      </g>
      {/* 两种存在形式对比 */}
      <g style={dim(active, 4)}>
        <rect x="36" y="264" width="204" height="78" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <circle cx="76" cy="296" r="8" fill="#1e5a8e" />
        <circle cx="98" cy="296" r="8" fill="#1e5a8e" />
        <line x1="56" y1="314" x2="150" y2="314" stroke="#7fb8d4" strokeWidth="8" strokeLinecap="round" />
        <text x="58" y="332" fontSize="12.5" fill="#2c6e94">附着核糖体 → 分泌蛋白</text>
        <rect x="280" y="264" width="204" height="78" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <circle cx="326" cy="296" r="8" fill="#1e5a8e" />
        <circle cx="348" cy="296" r="8" fill="#1e5a8e" />
        <circle cx="370" cy="296" r="8" fill="#1e5a8e" />
        <text x="294" y="332" fontSize="12.5" fill="#2c6e94">游离核糖体 → 细胞自身蛋白</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">核糖体结构模式图（无膜细胞器）</text>
    </svg>
  );
}

/* ================= 溶酶体 ================= */

function LysosomeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 溶酶体主体 */}
      <g style={dim(active, 0)}>
        <circle cx="200" cy="170" r="92" fill="#f6d7c4" stroke="#c2703d" strokeWidth="4" />
        <circle cx="200" cy="170" r="92" fill="none" stroke="#f0b896" strokeWidth="9" opacity="0.6" />
        <text x="200" y="292" textAnchor="middle" fontSize="13.5" fill="#b0483a" fontWeight="700">单层膜包裹的"消化车间"</text>
      </g>
      {/* 内部水解酶 */}
      <g style={dim(active, 1)}>
        {[[152, 128], [208, 112], [252, 150], [162, 196], [224, 190], [258, 216], [184, 236], [236, 246]].map(([x, y], i) => (
          <path key={i} d={`M${x - 9} ${y} L${x + 9} ${y} M${x} ${y - 9} L${x} ${y + 9} M${x - 6} ${y - 6} L${x + 6} ${y + 6} M${x - 6} ${y + 6} L${x + 6} ${y - 6}`} stroke="#c05a3a" strokeWidth="2.6" strokeLinecap="round" />
        ))}
        <text x="42" y="76" fontSize="13.5" fill="#b0483a" fontWeight="700">多种水解酶（60 余种）</text>
        <text x="42" y="94" fontSize="12" fill="#c97a5a">酸性环境 · 能分解各类生物大分子</text>
      </g>
      {/* 吞噬病菌 */}
      <g style={dim(active, 2)}>
        <circle cx="384" cy="92" r="34" fill="#f4d9b8" stroke="#c2703d" strokeWidth="2.5" strokeDasharray="7 5" />
        <ellipse cx="384" cy="92" rx="16" ry="9" fill="#5f8a54" stroke="#4a6f42" strokeWidth="2" />
        <line x1="370" y1="92" x2="398" y2="92" stroke="#3d5f38" strokeWidth="1.6" />
        <text x="384" y="146" textAnchor="middle" fontSize="13" fill="#b0483a" fontWeight="700">吞噬病毒、病菌并消化</text>
      </g>
      {/* 自噬衰老细胞器 */}
      <g style={dim(active, 3)}>
        <circle cx="392" cy="236" r="34" fill="#f4d9b8" stroke="#c2703d" strokeWidth="2.5" strokeDasharray="7 5" />
        <ellipse cx="392" cy="236" rx="17" ry="10" fill="#f0a06a" stroke="#c2703d" strokeWidth="2" />
        <path d="M378 236 q 7 -7 14 0 q 7 7 14 0" fill="none" stroke="#c2703d" strokeWidth="1.8" />
        <text x="392" y="290" textAnchor="middle" fontSize="13" fill="#b0483a" fontWeight="700">分解衰老的细胞器（自噬）</text>
      </g>
      <g style={dim(active, 0)}>
        <text x="16" y="330" fontSize="13.5" fill="#b0483a" fontWeight="700">营养不足时溶酶体可分解自身物质应急供能（维持细胞正常功能）</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">溶酶体结构模式图</text>
    </svg>
  );
}

/* ================= 突触 ================= */

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
        {[[248, 178], [268, 202], [244, 226], [268, 248]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5.5" fill="#5a9a4a" />
        ))}
        <line x1="112" y1="252" x2="392" y2="252" stroke="#8aa1a6" strokeWidth="2" strokeDasharray="9 7" />
        <text x="126" y="276" fontSize="13.5" fill="#4b6c73" fontWeight="700">突触间隙（约 20 nm，充盈组织液）</text>
      </g>
      {/* 突触前膜 / 后膜 */}
      <g style={dim(active, 3)}>
        <path d="M158 158 Q 216 176 274 158" fill="none" stroke="#b0483a" strokeWidth="5" strokeLinecap="round" />
        <text x="86" y="166" fontSize="13" fill="#b0483a" fontWeight="700">突触前膜</text>
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

/* ================= 有丝分裂各期 ================= */

function MitosisStagesSvg({ active }: { active: number | null; open?: boolean }) {
  const phases = ['间期', '前期', '中期', '后期', '末期'];
  const panel = (i: number) => ({ cx: 62 + i * 100, cy: 140, r: 40 });
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {phases.map((name, i) => {
        const { cx, cy, r } = panel(i);
        return (
          <g key={name} style={dim(active, i)}>
            <circle cx={cx} cy={cy} r={r} fill="#eaf5f7" stroke="#5f8a94" strokeWidth="3" />
            {name === '间期' ? (
              <>
                <circle cx={cx} cy={cy} r="24" fill="none" stroke="#8a5a8f" strokeWidth="2" strokeDasharray="5 4" />
                {[[-10, -6], [4, 2], [-4, 10], [10, 10], [8, -10]].map(([dx, dy], j) => (
                  <path key={j} d={`M${cx + dx} ${cy + dy} q 5 -4 10 0 q 5 4 10 0`} fill="none" stroke="#7a4a8a" strokeWidth="2.4" strokeLinecap="round" />
                ))}
              </>
            ) : null}
            {name === '前期' ? (
              <>
                {[-18, 2, 14].map((dx, j) => (
                  <g key={j} transform={`translate(${cx + dx} ${cy + (j - 1) * 14})`}>
                    <path d="M0 -9 C 5 -5, 5 5, 0 9 C -5 5, -5 -5, 0 -9 M0 -9 C -5 -5, -5 5, 0 9" fill="none" stroke="#7a4a8a" strokeWidth="3" strokeLinecap="round" />
                  </g>
                ))}
                <text x={cx} y={cy + 30} textAnchor="middle" fontSize="12" fill="#5f8a94">核膜消失</text>
              </>
            ) : null}
            {name === '中期' ? (
              <>
                <line x1={cx - 30} y1={cy} x2={cx + 30} y2={cy} stroke="#c98a1d" strokeWidth="2" strokeDasharray="4 3" />
                {[-20, 0, 20].map((dx, j) => (
                  <g key={j} transform={`translate(${cx + dx} ${cy})`}>
                    <path d="M0 -8 C 4 -4, 4 4, 0 8 C -4 4, -4 -4, 0 -8 M0 -8 C -4 -4, -4 4, 0 8" fill="none" stroke="#7a4a8a" strokeWidth="3" strokeLinecap="round" />
                  </g>
                ))}
                <circle cx={cx - 34} cy={cy - 18} r="4" fill="#c98a1d" />
                <circle cx={cx + 34} cy={cy - 18} r="4" fill="#c98a1d" />
              </>
            ) : null}
            {name === '后期' ? (
              <>
                {[-20, 0, 20].map((dx, j) => (
                  <g key={j}>
                    <path d={`M${cx + dx} ${cy - 26} C ${cx + dx + 4} ${cy - 18}, ${cx + dx + 4} ${cy - 12}, ${cx + dx} ${cy - 8} M${cx + dx} ${cy - 26} C ${cx + dx - 4} ${cy - 18}, ${cx + dx - 4} ${cy - 12}, ${cx + dx} ${cy - 8}`} fill="none" stroke="#7a4a8a" strokeWidth="2.6" strokeLinecap="round" />
                    <path d={`M${cx + dx} ${cy + 8} C ${cx + dx + 4} ${cy + 14}, ${cx + dx + 4} ${cy + 20}, ${cx + dx} ${cy + 26} M${cx + dx} ${cy + 8} C ${cx + dx - 4} ${cy + 14}, ${cx + dx - 4} ${cy + 20}, ${cx + dx} ${cy + 26}`} fill="none" stroke="#7a4a8a" strokeWidth="2.6" strokeLinecap="round" />
                  </g>
                ))}
                <text x={cx} y={cy + 40} textAnchor="middle" fontSize="12" fill="#5f8a94">分向两极</text>
              </>
            ) : null}
            {name === '末期' ? (
              <>
                <circle cx={cx - 16} cy={cy} r="16" fill="none" stroke="#8a5a8f" strokeWidth="2" />
                <circle cx={cx + 16} cy={cy} r="16" fill="none" stroke="#8a5a8f" strokeWidth="2" />
                {[[-18, -4], [14, 6], [-12, 8], [18, -6]].map(([dx, dy], j) => (
                  <path key={j} d={`M${cx + dx} ${cy + dy} q 4 -3 8 0 q 4 3 8 0`} fill="none" stroke="#7a4a8a" strokeWidth="2.2" strokeLinecap="round" />
                ))}
                <path d={`M${cx} ${cy - 40} Q ${cx - 6} ${cy} ${cx} ${cy + 40}`} fill="none" stroke="#5f8a94" strokeWidth="2" strokeDasharray="4 3" />
              </>
            ) : null}
            <text x={cx} y={cy + r + 24} textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">{name}</text>
          </g>
        );
      })}
      <text x="16" y="58" fontSize="13.5" fill="#2c6e94" fontWeight="700">染色体行为是划分分裂期的依据：复制 → 凝缩 → 排队 → 分开 → 成两核</text>
      <g style={dim(active, 2)}>
        <text x="16" y="330" fontSize="13.5" fill="#8a671b" fontWeight="700">中期：着丝粒排在赤道板上，染色体形态数目最清晰（观察计数最佳时期）</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">有丝分裂各期染色体行为模式图（动物细胞）</text>
    </svg>
  );
}

/* ================= 内环境三者关系 ================= */

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

/* ================= 能量金字塔 ================= */

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

/* ================= 碳循环 ================= */

function CarbonCycleSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 大气 CO2 库 */}
      <g style={dim(active, 0)}>
        <ellipse cx="260" cy="64" rx="104" ry="36" fill="#dfe9f2" stroke="#4d7ea8" strokeWidth="3" />
        <text x="260" y="60" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">大气 CO₂ 库</text>
        <text x="260" y="78" textAnchor="middle" fontSize="12" fill="#4a7a9a">（无机环境）</text>
      </g>
      {/* 生产者 */}
      <g style={dim(active, 1)}>
        <rect x="98" y="216" width="12" height="52" fill="#8a6a48" />
        <circle cx="104" cy="196" r="34" fill="#6aa86a" stroke="#3f7f3a" strokeWidth="3" />
        <text x="104" y="292" textAnchor="middle" fontSize="13.5" fill="#3f7f3a" fontWeight="700">生产者</text>
      </g>
      {/* 消费者 */}
      <g style={dim(active, 2)}>
        <ellipse cx="408" cy="228" rx="40" ry="26" fill="#e8c9a8" stroke="#b58a5f" strokeWidth="3" />
        <circle cx="444" cy="212" r="13" fill="#e8c9a8" stroke="#b58a5f" strokeWidth="3" />
        <path d="M394 252 L394 262 M422 252 L422 262" stroke="#b58a5f" strokeWidth="4" />
        <text x="408" y="292" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">消费者</text>
      </g>
      {/* 分解者 */}
      <g style={dim(active, 3)}>
        <rect x="238" y="238" width="8" height="16" fill="#c9a86a" />
        <path d="M218 240 Q 242 212 266 240 Z" fill="#d98a5a" stroke="#b05a2a" strokeWidth="2.5" />
        <path d="M300 244 q 10 -6 20 0 q 10 6 20 0" fill="none" stroke="#8a671b" strokeWidth="3" strokeLinecap="round" />
        <text x="262" y="292" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">分解者</text>
      </g>
      {/* 化石燃料带 */}
      <g style={dim(active, 4)}>
        <rect x="26" y="318" width="468" height="42" rx="8" fill="#4a3a30" />
        <text x="60" y="344" fontSize="13" fill="#e8ddd0" fontWeight="600">煤、石油、天然气（化石燃料）</text>
        <rect x="398" y="292" width="52" height="28" fill="#8a8a92" stroke="#5a5a62" strokeWidth="2" />
        <rect x="408" y="278" width="10" height="14" fill="#8a8a92" />
        <circle cx="413" cy="272" r="7" fill="#b0b0b8" opacity="0.75" />
        <text x="452" y="336" fontSize="12.5" fill="#e8c94a" fontWeight="600">燃烧 ↑</text>
      </g>
      {/* 循环箭头 */}
      <g style={dim(active, 1)}>
        <path d="M196 78 Q 130 96 116 158" fill="none" stroke="#3f7f3a" strokeWidth="3.5" markerEnd="url(#cc-arrow)" />
        <text x="92" y="112" fontSize="12.5" fill="#3f7f3a" fontWeight="700">光合作用</text>
      </g>
      <g style={dim(active, 1)}>
        <path d="M76 170 Q 96 100 152 74" fill="none" stroke="#b0483a" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#cc-arrow)" />
        <text x="24" y="146" fontSize="12.5" fill="#b0483a" fontWeight="700">呼吸作用</text>
      </g>
      <g style={dim(active, 2)}>
        <line x1="148" y1="212" x2="360" y2="216" stroke="#8a671b" strokeWidth="3.5" markerEnd="url(#cc-arrow)" />
        <text x="254" y="204" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">捕食（含碳有机物传递）</text>
      </g>
      <g style={dim(active, 2)}>
        <path d="M432 198 Q 470 130 356 76" fill="none" stroke="#b0483a" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#cc-arrow)" />
        <text x="452" y="140" fontSize="12.5" fill="#b0483a" fontWeight="700">呼吸作用</text>
      </g>
      <g style={dim(active, 3)}>
        <path d="M186 244 Q 214 250 228 252" fill="none" stroke="#8a671b" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#cc-arrow)" />
        <path d="M420 254 Q 340 282 292 262" fill="none" stroke="#8a671b" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#cc-arrow)" />
        <text x="152" y="266" fontSize="12" fill="#8a671b">遗体残骸</text>
      </g>
      <g style={dim(active, 3)}>
        <path d="M262 234 Q 262 140 262 104" fill="none" stroke="#7a8a2a" strokeWidth="3.5" markerEnd="url(#cc-arrow)" />
        <text x="270" y="168" fontSize="12.5" fill="#7a8a2a" fontWeight="700">分解者的分解（呼吸）</text>
      </g>
      <defs>
        <marker id="cc-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="16" y="30" fontSize="13.5" fill="#2c6e94" fontWeight="700">碳以 CO₂ 形式在无机环境与生物群落之间循环（全球性）</text>
      <text x="508" y="378" textAnchor="end" fontSize="12.5" fill="#799398">碳循环模式图</text>
    </svg>
  );
}

/* ================= 受精作用 ================= */

function FertilizationSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 精子 */}
      <g style={dim(active, 0)}>
        <ellipse cx="86" cy="160" rx="26" ry="18" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="3" />
        <circle cx="80" cy="160" r="7" fill="#3d6a94" />
        <path d="M112 160 Q 150 150 186 158 Q 220 166 252 152" fill="none" stroke="#4d7ea8" strokeWidth="3.5" strokeLinecap="round" />
        <text x="86" y="204" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">精子（n）</text>
        <text x="86" y="222" textAnchor="middle" fontSize="12" fill="#5a88a8">头部几乎只有细胞核</text>
      </g>
      {/* 卵细胞 */}
      <g style={dim(active, 1)}>
        <circle cx="330" cy="150" r="58" fill="#f6d7c4" stroke="#c2703d" strokeWidth="3.5" />
        <circle cx="330" cy="150" r="17" fill="#7a4a8a" />
        <text x="330" y="230" textAnchor="middle" fontSize="13.5" fill="#b0483a" fontWeight="700">卵细胞（n）</text>
        <text x="330" y="248" textAnchor="middle" fontSize="12" fill="#c97a5a">体积大、储营养</text>
      </g>
      {/* 受精卵 */}
      <g style={dim(active, 2)}>
        <circle cx="418" cy="150" r="50" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="3.5" />
        {[[400, 138], [436, 138], [408, 162], [428, 162]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${i % 2 === 0 ? -18 : 18})`}>
            <path d="M0 -8 C 4 -4, 4 4, 0 8 C -4 4, -4 -4, 0 -8 M0 -8 C -4 -4, -4 4, 0 8" fill="none" stroke={i % 2 === 0 ? '#3d6a94' : '#b0483a'} strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}
        <text x="418" y="216" textAnchor="middle" fontSize="13.5" fill="#7a4a8a" fontWeight="700">受精卵（2n）</text>
        <text x="418" y="234" textAnchor="middle" fontSize="12" fill="#9a6fa8">染色体数目恢复</text>
      </g>
      {/* 汇合箭头 */}
      <g style={dim(active, 2)}>
        <path d="M120 122 Q 168 96 214 118" fill="none" stroke="#5f7076" strokeWidth="3" markerEnd="url(#fer-arrow)" />
        <path d="M264 122 Q 300 100 356 114" fill="none" stroke="#5f7076" strokeWidth="3" markerEnd="url(#fer-arrow)" />
        <text x="196" y="88" textAnchor="middle" fontSize="13" fill="#4b6c73" fontWeight="700">受精作用</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="272" width="448" height="66" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="52" y="296" fontSize="13.5" fill="#173b42" fontWeight="700">减数分裂（2n → n）+ 受精（n → 2n）：维持前后代染色体数目恒定</text>
        <text x="52" y="322" fontSize="12.5" fill="#59767c">精子卵细胞中染色体的随机组合 → 后代具有多样性（有性生殖的优势）</text>
      </g>
      <defs>
        <marker id="fer-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5f7076" />
        </marker>
      </defs>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">受精作用示意图</text>
    </svg>
  );
}

/* ================= 减数分裂各期 ================= */

function MeiosisStagesSvg({ active }: { active: number | null; open?: boolean }) {
  const phases = ['减Ⅰ前期', '减Ⅰ中期', '减Ⅰ后期', '减Ⅱ后期', '子细胞（n）'];
  const panel = (i: number) => ({ cx: 62 + i * 100, cy: 136, r: 40 });
  const xShape = (cx: number, cy: number, color: string) => (
    <path d={`M${cx} ${cy - 8} C ${cx + 4} ${cy - 4}, ${cx + 4} ${cy + 4}, ${cx} ${cy + 8} C ${cx - 4} ${cy + 4}, ${cx - 4} ${cy - 4}, ${cx} ${cy - 8} M${cx} ${cy - 8} C ${cx - 4} ${cy - 4}, ${cx - 4} ${cy + 4}, ${cx} ${cy + 8}`} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
  );
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {phases.map((name, i) => {
        const { cx, cy, r } = panel(i);
        return (
          <g key={name} style={dim(active, i)}>
            <circle cx={cx} cy={cy} r={r} fill="#eaf5f7" stroke="#5f8a94" strokeWidth="3" />
            {i === 0 ? (
              <>
                {xShape(cx - 14, cy - 4, '#b0483a')}
                {xShape(cx - 6, cy + 2, '#3d6a94')}
                {xShape(cx + 16, cy - 2, '#b0483a')}
                {xShape(cx + 24, cy + 4, '#3d6a94')}
                <text x={cx} y={cy + 34} textAnchor="middle" fontSize="12" fill="#5f8a94">同源染色体联会</text>
              </>
            ) : null}
            {i === 1 ? (
              <>
                {xShape(cx - 18, cy, '#b0483a')}
                {xShape(cx - 10, cy, '#3d6a94')}
                {xShape(cx + 12, cy, '#b0483a')}
                {xShape(cx + 20, cy, '#3d6a94')}
                <line x1={cx - 30} y1={cy} x2={cx + 30} y2={cy} stroke="#c98a1d" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.7" />
                <text x={cx} y={cy + 34} textAnchor="middle" fontSize="12" fill="#5f8a94">成对排在赤道板</text>
              </>
            ) : null}
            {i === 2 ? (
              <>
                {[[-18, -14], [8, -16]].map(([dx, dy], j) => (
                  <g key={j}>{xShape(cx + dx, cy + dy, '#b0483a')}</g>
                ))}
                {[[-16, 14], [10, 16]].map(([dx, dy], j) => (
                  <g key={j}>{xShape(cx + dx, cy + dy, '#3d6a94')}</g>
                ))}
                <text x={cx} y={cy + 36} textAnchor="middle" fontSize="12" fill="#5f8a94">同源染色体分离</text>
              </>
            ) : null}
            {i === 3 ? (
              <>
                {[[-16, -14], [10, -16]].map(([dx, dy], j) => (
                  <g key={j}>{xShape(cx + dx, cy + dy, '#b0483a')}</g>
                ))}
                {[[-16, 14], [10, 16]].map(([dx, dy], j) => (
                  <g key={j}>{xShape(cx + dx, cy + dy, '#3d6a94')}</g>
                ))}
                <text x={cx} y={cy + 36} textAnchor="middle" fontSize="12" fill="#5f8a94">着丝粒分裂（减Ⅱ）</text>
              </>
            ) : null}
            {i === 4 ? (
              <>
                {[[cx - 18, cy - 14], [cx + 12, cy - 16], [cx - 18, cy + 14], [cx + 12, cy + 16]].map(([x, y], j) => (
                  <g key={j}>
                    <circle cx={x} cy={y} r="10" fill="#f2d9e8" stroke="#8a5a8f" strokeWidth="2" />
                    <path d={`M${x - 4} ${y - 5} q 4 -3 8 0 q 3 3 4 5`} fill="none" stroke="#8a5a8f" strokeWidth="1.8" strokeLinecap="round" />
                  </g>
                ))}
                <text x={cx} y={cy + 38} textAnchor="middle" fontSize="12" fill="#5f8a94">染色体数目减半</text>
              </>
            ) : null}
            <text x={cx} y={cy + r + 24} textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">{name}</text>
          </g>
        );
      })}
      <text x="16" y="56" fontSize="13.5" fill="#2c6e94" fontWeight="700">1 个亲代细胞（2n）→ 4 个子细胞（n）：染色体数目减半</text>
      <g style={dim(active, 2)}>
        <text x="16" y="330" fontSize="13.5" fill="#8a671b" fontWeight="700">减Ⅰ后期同源染色体分离 = 基因分离定律的细胞学基础（高频考点）</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">减数分裂各期染色体行为模式图</text>
    </svg>
  );
}

/* ================= 食物网 ================= */

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

/* ================= 体温调节 ================= */

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

/* ================= 物质跨膜运输 ================= */

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

/* ================= 细胞的衰老、凋亡与癌变 ================= */

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

/* ================= 有氧呼吸三阶段 ================= */

function AerobicRespirationSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 细胞轮廓 + 线粒体 */}
      <g style={dim(active, 0)}>
        <ellipse cx="260" cy="196" rx="240" ry="152" fill="#eef7f6" stroke="#8fb8d4" strokeWidth="3" />
        <text x="44" y="66" fontSize="13" fill="#2c6e94" fontWeight="700">细胞质基质</text>
      </g>
      <g style={dim(active, 1)}>
        <ellipse cx="286" cy="196" rx="150" ry="112" fill="#f6d7c4" stroke="#c2703d" strokeWidth="3.5" />
        {[96, 130, 164, 198, 232, 266].map((x, i) => (
          <path key={i} d={`M${214 + i * 2} 196 q ${34} ${i % 2 === 0 ? -30 : 30} ${68 - i * 4} ${i % 2 === 0 ? -22 : 22}`} fill="none" stroke="#d08a5a" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="286" y="326" textAnchor="middle" fontSize="13" fill="#b0483a" fontWeight="700">线粒体（第二、三阶段的场所）</text>
      </g>
      {/* 第一阶段 */}
      <g style={dim(active, 2)}>
        <text x="96" y="118" fontSize="13.5" fill="#1e4a68" fontWeight="700">① 细胞质基质</text>
        <text x="96" y="138" fontSize="12.5" fill="#2c6e94">葡萄糖 → 2 丙酮酸 + [H]</text>
        <text x="96" y="156" fontSize="12.5" fill="#4b6c73">释放少量能量</text>
        <path d="M84 176 Q 120 190 150 202" fill="none" stroke="#3d6a94" strokeWidth="3.5" markerEnd="url(#ar-arrow)" />
      </g>
      {/* 第二阶段 */}
      <g style={dim(active, 3)}>
        <text x="226" y="152" fontSize="13.5" fill="#8a3a20" fontWeight="700">② 线粒体基质</text>
        <text x="226" y="172" fontSize="12.5" fill="#b0483a">丙酮酸 + 水 → CO₂</text>
        <text x="226" y="190" fontSize="12.5" fill="#4b6c73">+ 少量 [H]，释放少量能量</text>
        <circle cx="404" cy="98" r="9" fill="#b0b0b8" stroke="#7a7a82" strokeWidth="2" />
        <text x="404" y="102" textAnchor="middle" fontSize="12" fill="#4a4a52" fontWeight="700">C</text>
        <path d="M398 108 Q 396 86 402 104" fill="none" stroke="#7a7a82" strokeWidth="2" />
        <text x="428" y="96" fontSize="12.5" fill="#7a7a82" fontWeight="600">CO₂ 扩散出去</text>
      </g>
      {/* 第三阶段 */}
      <g style={dim(active, 4)}>
        <text x="150" y="252" fontSize="13.5" fill="#9b3a30" fontWeight="700">③ 线粒体内膜</text>
        <text x="150" y="272" fontSize="12.5" fill="#b0483a">[H] + O₂ → 水</text>
        <text x="150" y="290" fontSize="12.5" fill="#4b6c73">释放大量能量，生成大量 ATP</text>
        <circle cx="352" cy="268" r="10" fill="#7fb8d4" stroke="#3d6a94" strokeWidth="2" />
        <text x="352" y="272" textAnchor="middle" fontSize="12" fill="#1e4a68" fontWeight="700">O₂</text>
        <path d="M366 268 Q 384 258 398 244" fill="none" stroke="#3d6a94" strokeWidth="3" markerEnd="url(#ar-arrow)" />
      </g>
      {/* 总反应式 */}
      <g style={dim(active, 2)}>
        <rect x="26" y="336" width="470" height="30" rx="8" fill="#ffffff" opacity="0.92" stroke="#cfe0e0" strokeWidth="2" />
        <text x="261" y="356" textAnchor="middle" fontSize="13" fill="#173b42" fontWeight="600">C₆H₁₂O₆ + 6O₂ + 6H₂O → 6CO₂ + 12H₂O + 能量（大量 ATP）</text>
      </g>
      <defs>
        <marker id="ar-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#3d6a94" />
        </marker>
      </defs>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">有氧呼吸三阶段模式图</text>
    </svg>
  );
}

/* ================= 花的结构 ================= */

function FlowerStructureSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 花柄与花托 */}
      <g style={dim(active, 5)}>
        <line x1="260" y1="356" x2="260" y2="256" stroke="#4a8a3a" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="260" cy="252" rx="34" ry="12" fill="#6aa86a" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="330" y="330" fontSize="12.5" fill="#3f7f3a" fontWeight="600">花柄与花托</text>
        <line x1="326" y1="326" x2="272" y2="298" stroke="#3f7f3a" strokeWidth="1.4" />
      </g>
      {/* 花萼 + 花瓣 */}
      <g style={dim(active, 4)}>
        <path d="M216 240 Q 190 222 200 196 Q 226 204 234 228 Z" fill="#8fbf6f" stroke="#3f7f3a" strokeWidth="2.5" />
        <path d="M304 240 Q 330 222 320 196 Q 294 204 286 228 Z" fill="#8fbf6f" stroke="#3f7f3a" strokeWidth="2.5" />
        <path d="M240 224 Q 190 210 172 168 Q 216 160 246 194 Z" fill="#f2b8c8" stroke="#c9708a" strokeWidth="3" />
        <path d="M280 224 Q 330 210 348 168 Q 304 160 274 194 Z" fill="#f2b8c8" stroke="#c9708a" strokeWidth="3" />
        <text x="150" y="118" fontSize="12.5" fill="#c9708a" fontWeight="600">花瓣（引诱昆虫）</text>
        <line x1="176" y1="122" x2="196" y2="162" stroke="#c9708a" strokeWidth="1.4" />
        <text x="348" y="238" fontSize="12.5" fill="#3f7f3a" fontWeight="600">花萼（保护）</text>
      </g>
      {/* 雄蕊 */}
      <g style={dim(active, 0)}>
        <path d="M244 232 Q 210 214 196 186" fill="none" stroke="#e0b020" strokeWidth="3.5" />
        <path d="M276 232 Q 310 214 324 186" fill="none" stroke="#e0b020" strokeWidth="3.5" />
        <ellipse cx="192" cy="178" rx="14" ry="9" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.5" transform="rotate(-24 192 178)" />
        <ellipse cx="328" cy="178" rx="14" ry="9" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.5" transform="rotate(24 328 178)" />
        <text x="108" y="168" fontSize="13.5" fill="#a58a20" fontWeight="700">花药（产生花粉）</text>
        <line x1="150" y1="172" x2="180" y2="178" stroke="#a58a20" strokeWidth="1.4" />
      </g>
      {/* 雌蕊 */}
      <g style={dim(active, 1)}>
        <ellipse cx="260" cy="172" rx="20" ry="11" fill="#e8d4f2" stroke="#7a4a8a" strokeWidth="3" />
        <line x1="260" y1="182" x2="260" y2="228" stroke="#7a4a8a" strokeWidth="5" />
        <ellipse cx="260" cy="256" rx="30" ry="22" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="3" />
        <circle cx="252" cy="258" r="6" fill="#7a4a8a" />
        <circle cx="268" cy="260" r="6" fill="#7a4a8a" />
        <text x="70" y="192" fontSize="13.5" fill="#6a4a9a" fontWeight="700">柱头（承接花粉）</text>
        <line x1="146" y1="188" x2="240" y2="174" stroke="#7a4a8a" strokeWidth="1.4" />
        <text x="70" y="212" fontSize="13.5" fill="#6a4a9a" fontWeight="700">花柱</text>
        <text x="70" y="264" fontSize="13.5" fill="#6a4a9a" fontWeight="700">子房（内有胚珠）</text>
        <line x1="146" y1="260" x2="230" y2="258" stroke="#7a4a8a" strokeWidth="1.4" />
      </g>
      <g style={dim(active, 2)}>
        <text x="380" y="276" fontSize="13.5" fill="#8a5a94" fontWeight="700">胚珠（含卵细胞）</text>
        <line x1="376" y1="272" x2="276" y2="262" stroke="#8a5a94" strokeWidth="1.4" />
      </g>
      <text x="16" y="42" fontSize="13.5" fill="#2c6e94" fontWeight="700">完全花结构：雄蕊与雌蕊是繁殖的核心——"去雄"杂交就是摘除花药</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">花的结构模式图</text>
    </svg>
  );
}

/* ================= 玉米的繁殖 ================= */

function CornReproductionSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 茎秆 */}
      <g style={dim(active, 0)}>
        <line x1="150" y1="356" x2="150" y2="86" stroke="#5f9a4a" strokeWidth="12" strokeLinecap="round" />
        <path d="M150 240 Q 108 220 92 182" fill="none" stroke="#5f9a4a" strokeWidth="7" strokeLinecap="round" />
        <path d="M150 176 Q 196 156 214 118" fill="none" stroke="#5f9a4a" strokeWidth="7" strokeLinecap="round" />
      </g>
      {/* 雄花序 */}
      <g style={dim(active, 1)}>
        <path d="M150 86 Q 118 66 96 44 M 150 86 Q 150 52 150 34 M 150 86 Q 182 66 204 44" fill="none" stroke="#c9a86a" strokeWidth="5" strokeLinecap="round" />
        {[[96, 44], [150, 34], [204, 44], [124, 62], [176, 62]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="7" fill="#f4d06a" stroke="#b5953a" strokeWidth="2" />
        ))}
        <text x="20" y="76" fontSize="13.5" fill="#a58a20" fontWeight="700">顶端雄花序</text>
        <text x="20" y="94" fontSize="12" fill="#b5953a">花粉多而轻（风媒）</text>
      </g>
      {/* 风与花粉 */}
      <g style={dim(active, 2)}>
        <path d="M36 132 q 18 -8 36 0 q 18 8 36 0" fill="none" stroke="#8aa1a6" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M46 156 q 18 -8 36 0" fill="none" stroke="#8aa1a6" strokeWidth="2.5" strokeLinecap="round" />
        {[[214, 130], [248, 148], [282, 164], [316, 178]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#f4d06a" stroke="#b5953a" strokeWidth="1.5" />
        ))}
        <text x="322" y="128" fontSize="13.5" fill="#a58a20" fontWeight="700">风传花粉 → 落到花柱上</text>
      </g>
      {/* 雌花序（果穗 + 玉米须） */}
      <g style={dim(active, 3)}>
        <ellipse cx="238" cy="234" rx="40" ry="58" fill="#d9e8b8" stroke="#7a9a3a" strokeWidth="3.5" />
        <path d="M206 200 Q 238 186 270 200 L 262 282 Q 238 292 214 282 Z" fill="#c9e09a" stroke="#7a9a3a" strokeWidth="2.5" />
        <path d="M262 176 Q 300 160 330 176 M 268 190 Q 312 182 344 200 M 272 204 Q 320 204 352 222" fill="none" stroke="#e0c98a" strokeWidth="3" strokeLinecap="round" />
        <text x="150" y="330" textAnchor="middle" fontSize="13.5" fill="#7a9a3a" fontWeight="700">叶腋雌花序（果穗）</text>
        <text x="330" y="242" fontSize="13.5" fill="#c9a86a" fontWeight="700">玉米须 = 花柱</text>
        <text x="330" y="260" fontSize="12" fill="#a58a4a">一根须对应一粒籽</text>
      </g>
      {/* 受精小图 */}
      <g style={dim(active, 4)}>
        <rect x="356" y="288" width="148" height="72" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <ellipse cx="398" cy="324" rx="17" ry="24" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2.5" />
        <circle cx="398" cy="330" r="6" fill="#7a4a8a" />
        <path d="M412 306 Q 420 296 430 296" fill="none" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="428" y="318" fontSize="12.5" fill="#6a4a9a" fontWeight="600">花粉管进入</text>
        <text x="428" y="336" fontSize="12.5" fill="#6a4a9a" fontWeight="600">胚珠完成受精</text>
      </g>
      <text x="16" y="42" fontSize="13.5" fill="#2c6e94" fontWeight="700">玉米：单性花、雌雄同株——顶端开花撒粉，叶腋结穗生须，受精后籽粒是果实</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">玉米的繁殖（风媒传粉）模式图</text>
    </svg>
  );
}

/* ================= 果实与种子的形成 ================= */

function FruitAndSeedSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 玉米籽粒纵切 */}
      <g style={dim(active, 0)}>
        <ellipse cx="240" cy="196" rx="118" ry="136" fill="#f4d9a0" stroke="#b5903a" strokeWidth="4" />
        <text x="240" y="344" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">玉米籽粒（果实）纵切</text>
      </g>
      <g style={dim(active, 1)}>
        <ellipse cx="240" cy="196" rx="100" ry="118" fill="#f0c96a" stroke="#d9a83a" strokeWidth="2.5" />
        <text x="240" y="120" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">胚乳（储存营养）</text>
      </g>
      {/* 胚 */}
      <g style={dim(active, 2)}>
        <path d="M286 226 Q 316 216 322 190 Q 326 216 306 236 Q 292 242 286 226 Z" fill="#8fbf6f" stroke="#3f7f3a" strokeWidth="2.5" />
        <ellipse cx="292" cy="252" rx="10" ry="14" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="2.5" transform="rotate(-18 292 252)" />
        <path d="M280 266 Q 268 280 258 292" fill="none" stroke="#8a6a48" strokeWidth="4" strokeLinecap="round" />
        <text x="352" y="196" fontSize="13" fill="#2f7a4d" fontWeight="700">胚：胚芽+胚轴</text>
        <text x="352" y="214" fontSize="13" fill="#2f7a4d" fontWeight="700">+胚根+子叶（1 片）</text>
        <line x1="348" y1="200" x2="322" y2="206" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 对应关系箭头 */}
      <g style={dim(active, 3)}>
        <text x="34" y="96" fontSize="13.5" fill="#b0483a" fontWeight="700">子房壁 → 果皮</text>
        <text x="34" y="140" fontSize="13.5" fill="#b0483a" fontWeight="700">珠被 → 种皮</text>
        <text x="34" y="188" fontSize="13.5" fill="#7a4a8a" fontWeight="700">受精卵 → 胚（2n）</text>
        <text x="34" y="236" fontSize="13.5" fill="#8a671b" fontWeight="700">受精极核 → 胚乳（3n）</text>
        <line x1="118" y1="90" x2="142" y2="96" stroke="#b0483a" strokeWidth="2" markerEnd="url(#fs-arrow)" />
        <line x1="108" y1="134" x2="142" y2="126" stroke="#b0483a" strokeWidth="2" markerEnd="url(#fs-arrow)" />
        <line x1="132" y1="182" x2="280" y2="222" stroke="#7a4a8a" strokeWidth="2" markerEnd="url(#fs-arrow)" />
        <line x1="150" y1="230" x2="180" y2="212" stroke="#8a671b" strokeWidth="2" markerEnd="url(#fs-arrow)" />
        <text x="20" y="278" fontSize="12.5" fill="#59767c">玉米外层是果皮与种皮愈合——</text>
        <text x="20" y="296" fontSize="12.5" fill="#59767c">所以一粒玉米其实是果实</text>
      </g>
      {/* 菜豆对比 */}
      <g style={dim(active, 4)}>
        <rect x="386" y="252" width="122" height="96" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <ellipse cx="428" cy="292" rx="16" ry="24" fill="#8fbf6f" stroke="#3f7f3a" strokeWidth="2.5" transform="rotate(-16 428 292)" />
        <ellipse cx="462" cy="292" rx="16" ry="24" fill="#8fbf6f" stroke="#3f7f3a" strokeWidth="2.5" transform="rotate(16 462 292)" />
        <text x="447" y="336" textAnchor="middle" fontSize="12.5" fill="#3f7f3a" fontWeight="600">菜豆：双子叶无胚乳</text>
      </g>
      <defs>
        <marker id="fs-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#8a671b" />
        </marker>
      </defs>
      <text x="16" y="46" fontSize="13.5" fill="#2c6e94" fontWeight="700">受精完成后：子房→果实、胚珠→种子——花的结构决定果实的来历</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">果实与种子的形成（以玉米为例）模式图</text>
    </svg>
  );
}

/* ================= 人工异花传粉 ================= */

function ArtificialPollinationSvg({ active }: { active: number | null; open?: boolean }) {
  const step = (i: number) => ({ cx: 74 + i * 124, cy: 150 });
  const titles = ['① 去雄', '② 套袋', '③ 人工授粉', '④ 再套袋+标记'];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {titles.map((t, i) => {
        const { cx, cy } = step(i);
        return (
          <g key={t} style={dim(active, i)}>
            {/* 通用小花 */}
            <line x1={cx} y1={cy + 52} x2={cx} y2={cy + 22} stroke="#4a8a3a" strokeWidth="6" strokeLinecap="round" />
            <path d={`M${cx - 18} ${cy + 18} Q ${cx - 34} ${cy} ${cx - 24} ${cy - 18} Q ${cx - 8} ${cy - 8} ${cx} ${cy + 4} Z`} fill="#f2b8c8" stroke="#c9708a" strokeWidth="2.5" />
            <path d={`M${cx + 18} ${cy + 18} Q ${cx + 34} ${cy} ${cx + 24} ${cy - 18} Q ${cx + 8} ${cy - 8} ${cx} ${cy + 4} Z`} fill="#f2b8c8" stroke="#c9708a" strokeWidth="2.5" />
            <ellipse cx={cx} cy={cy - 12} rx="12" ry="7" fill="#e8d4f2" stroke="#7a4a8a" strokeWidth="2.5" />
            <text x={cx} y={cy + 82} textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">{t}</text>
          </g>
        );
      })}
      {/* ① 剪刀去雄 */}
      <g style={dim(active, 0)}>
        <path d="M56 108 L74 130 L92 108 M74 130 L74 142" fill="none" stroke="#5a5a62" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="52" cy="104" r="7" fill="none" stroke="#5a5a62" strokeWidth="3" />
        <circle cx="96" cy="104" r="7" fill="none" stroke="#5a5a62" strokeWidth="3" />
        <text x="74" y="52" textAnchor="middle" fontSize="12.5" fill="#59767c">花未成熟时摘尽雄蕊</text>
      </g>
      {/* ② 纸袋 */}
      <g style={dim(active, 1)}>
        <path d="M50 100 Q 74 84 98 100 L 94 150 Q 74 158 54 150 Z" fill="#fdf6e3" stroke="#c9a86a" strokeWidth="2.5" />
        <text x="198" y="52" textAnchor="middle" fontSize="12.5" fill="#59767c">防外来花粉串粉</text>
      </g>
      {/* ③ 毛笔授粉 */}
      <g style={dim(active, 2)}>
        <line x1="296" y1="96" x2="326" y2="128" stroke="#b58a5f" strokeWidth="4" strokeLinecap="round" />
        <path d="M322 130 q 10 8 6 18 q -12 2 -14 -10 Z" fill="#f4d06a" stroke="#b5953a" strokeWidth="2" />
        <circle cx="334" cy="152" r="3" fill="#f4d06a" />
        <text x="322" y="52" textAnchor="middle" fontSize="12.5" fill="#59767c">蘸取父本花粉涂柱头</text>
      </g>
      {/* ④ 袋+标签 */}
      <g style={dim(active, 3)}>
        <path d="M446 100 Q 470 84 494 100 L 490 150 Q 470 158 450 150 Z" fill="#fdf6e3" stroke="#c9a86a" strokeWidth="2.5" />
        <line x1="494" y1="112" x2="512" y2="118" stroke="#5a5a62" strokeWidth="2" />
        <rect x="498" y="118" width="14" height="20" fill="#eef7f6" stroke="#5f8a94" strokeWidth="2" />
        <text x="444" y="52" textAnchor="middle" fontSize="12.5" fill="#59767c">记录母本×父本</text>
      </g>
      {/* 步骤间的箭头 */}
      {[136, 260, 384].map((x, i) => (
        <line key={i} x1={x} y1="150" x2={x + 24} y2="150" stroke="#8aa1a6" strokeWidth="3" markerEnd="url(#ap-arrow)" />
      ))}
      <defs>
        <marker id="ap-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#8aa1a6" />
        </marker>
      </defs>
      <g style={dim(active, 0)}>
        <text x="16" y="248" fontSize="13.5" fill="#2c6e94" fontWeight="700">豌豆：自花传粉、闭花受精 → 天然纯种（杂交必须人工去雄）；</text>
        <text x="16" y="270" fontSize="13.5" fill="#2c6e94" fontWeight="700">玉米：单性花、雌雄同株 → 天然异花传粉，遗传研究常"套袋控粉"防串粉</text>
      </g>
      <g style={dim(active, 3)}>
        <text x="16" y="312" fontSize="12.5" fill="#59767c">F₁ 互相授粉得 F₂——孟德尔正是用这套流程发现分离定律与自由组合定律</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">人工异花传粉四步法模式图（遗传杂交实验基础）</text>
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
    id: 'synapse',
    name: '突触',
    kicker: '神经调节 · 结构模式图',
    intro: '神经元之间传递信息的"接头"：电信号传到末梢，换成化学信号（神经递质）跨过间隙，再变回电信号。',
    parts: [
      { name: '突触小体', desc: '轴突末梢膨大的部分，内含大量突触小泡和线粒体——是"发货仓库"。' },
      { name: '突触小泡', desc: '储存神经递质；兴奋传来时与突触前膜融合，把递质释放到间隙。' },
      { name: '突触前膜', desc: '突触小体的膜。递质只能由前膜释放——这是兴奋在突触间单向传递的原因。' },
      { name: '突触间隙', desc: '约 20 nm，充满组织液；递质经扩散穿过间隙，耗时约 0.5 ms（突触延搁）。' },
      { name: '突触后膜（受体）', desc: '下一个神经元的胞体膜或树突膜，上有特异性受体：递质结合后引起下一个细胞兴奋或抑制。' },
    ],
    Svg: SynapseSvg,
  },
  {
    id: 'internalEnvironment',
    name: '内环境三者关系',
    kicker: '稳态与调节 · 关系模式图',
    intro: '细胞外液 = 血浆 + 组织液 + 淋巴：三者之间的物质交换有方向，组织液单向进入淋巴，淋巴最终回流血浆。',
    parts: [
      { name: '血浆', desc: '血管内的液体部分，运载血细胞、营养物质与代谢废物——是体内细胞与外界交换的"运输干线"。' },
      { name: '组织液', desc: '组织细胞间隙的液体，是体内绝大多数细胞直接生活的环境；血浆透过毛细血管壁渗出形成。' },
      { name: '淋巴（液）', desc: '进入毛细淋巴管盲端的液体，沿淋巴管流动，最终经淋巴循环回流进血浆——单向流动。' },
      { name: '交换方向', desc: '血浆 ⇄ 组织液双向渗透；组织液 → 淋巴 → 血浆单向回流（图中箭头方向是高频考点）。' },
      { name: '内环境的角色', desc: '细胞通过内环境与外界进行物质交换——内环境是细胞与外界环境之间的媒介。' },
    ],
    Svg: InternalEnvironmentSvg,
  },
  {
    id: 'thermoregulation',
    name: '体温调节流程',
    kicker: '稳态与调节 · 流程模式图',
    intro: '寒冷时产热增加、散热减少；炎热时散热增加——下丘脑是体温调节中枢，整个过程是神经调节与体液调节的协同。',
    parts: [
      { name: '温度感受器', desc: '分布在皮肤、黏膜和内脏，分为冷觉与温觉感受器——把温度变化经传入神经传向下丘脑。' },
      { name: '下丘脑（体温调节中枢）', desc: '整合温度信息并发出指令；注意：体温感觉在大脑皮层形成——"调节在中枢、感觉在皮层"。' },
      { name: '寒冷：产热↑', desc: '骨骼肌战栗、甲状腺激素与肾上腺素分泌增加提高代谢——产热增加。' },
      { name: '寒冷：散热↓ / 炎热：散热↑', desc: '寒冷时皮肤血管收缩、汗腺分泌减少；炎热时血管舒张、汗液蒸发散热增加。' },
      { name: '结果', desc: '体温维持相对恒定（约 37℃）——是"动态平衡"而不是绝对不变。' },
    ],
    Svg: ThermoregulationSvg,
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
    id: 'membraneTransport',
    name: '物质跨膜运输三方式',
    kicker: '细胞膜 · 功能模式图',
    intro: '自由扩散、协助扩散（合称被动运输）与主动运输：方向、是否需要载体蛋白、是否消耗能量——三个维度区分。',
    parts: [
      { name: '磷脂双分子层', desc: '物质进出细胞的屏障：脂溶性小分子容易穿过，离子和大分子不能自由通过——所以需要蛋白协助。' },
      { name: '自由扩散', desc: '顺浓度梯度（高→低）直接穿膜，不需载体、不耗能：O₂、CO₂、水、甘油、乙醇、苯等。' },
      { name: '协助扩散', desc: '顺浓度梯度，借助通道蛋白或载体蛋白，不耗能：红细胞吸收葡萄糖、水通道蛋白运输水。' },
      { name: '主动运输', desc: '逆浓度梯度（低→高），需要载体蛋白并消耗 ATP：离子、葡萄糖进入小肠上皮细胞——保证细胞按需选择性吸收。' },
      { name: '对比记忆', desc: '看两样：方向（顺/逆浓度）+ 条件（载体？能量？）——主动运输两个都要，两个被动运输都不耗能。' },
    ],
    Svg: MembraneTransportSvg,
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
    id: 'mitosisStages',
    name: '有丝分裂各期',
    kicker: '细胞增殖 · 过程模式图',
    intro: '五个时期的染色体行为一览：间期复制、前期凝缩、中期排队、后期分开、末期成两核——染色体形态是划分时期的依据。',
    parts: [
      { name: '间期', desc: '核膜核仁完整，染色体呈染色质丝状；完成 DNA 复制和有关蛋白质合成（"看不见染色体"的时期）。' },
      { name: '前期', desc: '染色质螺旋缠绕变粗变短成为染色体，核膜核仁消失，纺锤体形成，染色体散乱分布。' },
      { name: '中期', desc: '着丝粒（点）整齐排列在赤道板上，染色体形态稳定、数目清晰——观察和计数的最佳时期。' },
      { name: '后期', desc: '着丝粒分裂，姐妹染色单体分开成为两条子染色体，被纺锤丝拉向细胞两极。' },
      { name: '末期', desc: '染色体变成染色质，核膜核仁重现；动物细胞从中部缢裂成两个子细胞。' },
    ],
    Svg: MitosisStagesSvg,
  },
  {
    id: 'meiosisStages',
    name: '减数分裂各期',
    kicker: '细胞分裂 · 过程模式图',
    intro: '染色体复制一次、细胞连续分裂两次：同源染色体先配对再分离，最终 1 个亲代细胞产生 4 个染色体减半的子细胞。',
    parts: [
      { name: '减Ⅰ前期（联会）', desc: '同源染色体两两配对（联会），形成四分体——此期可发生交叉互换，是基因重组的来源之一。' },
      { name: '减Ⅰ中期', desc: '同源染色体成对排列在赤道板两侧（注意：有丝分裂中期是每条染色体单独排在赤道板上）。' },
      { name: '减Ⅰ后期', desc: '同源染色体分离、非同源染色体自由组合——基因分离定律与自由组合定律的细胞学基础。' },
      { name: '减Ⅱ后期', desc: '着丝粒分裂，姐妹染色单体分开——与有丝分裂后期相似，但细胞内已没有同源染色体。' },
      { name: '子细胞（n）', desc: '1 个亲代细胞 → 4 个子细胞（精细胞），染色体数目减半；卵细胞形成时只得到 1 个大细胞。' },
    ],
    Svg: MeiosisStagesSvg,
  },
  {
    id: 'fertilization',
    name: '受精作用',
    kicker: '遗传与进化 · 过程模式图',
    intro: '精子与卵细胞结合形成受精卵：减数分裂把染色体减半（2n→n），受精让数目恢复（n→2n）——前后代染色体恒定的关键。',
    parts: [
      { name: '精子（n）', desc: '变形后头部几乎只含细胞核，便于"送货上门"；含本物种一半数目的染色体。' },
      { name: '卵细胞（n）', desc: '体积大、富含营养物质，为早期发育储能；一个卵细胞一般只与一个精子结合。' },
      { name: '受精卵（2n）', desc: '精核与卵核融合，染色体恢复到本物种数目——一半来自父方、一半来自母方。' },
      { name: '恒定与多样', desc: '减数分裂 + 受精维持前后代染色体数目恒定；配子的多样性与随机结合让后代呈现多样性。' },
    ],
    Svg: FertilizationSvg,
  },
  {
    id: 'cellFates',
    name: '细胞的衰老、凋亡与癌变',
    kicker: '细胞生命历程 · 对比模式图',
    intro: '衰老和凋亡是正常生命历程、对机体有利；癌变才是失控——三者的成因与特征对比是必修 1 的高频考点。',
    parts: [
      { name: '细胞衰老', desc: '水分减少、酶活性降低、色素积累、呼吸减慢、核增大、膜通透性改变——细胞生理功能衰退。' },
      { name: '细胞凋亡', desc: '由基因决定的细胞自动结束生命的过程（编程性死亡），如蝌蚪尾巴消失、人胚胎手指成形——对机体有利。' },
      { name: '细胞坏死', desc: '与凋亡不同：在不利因素下被动损伤死亡，会引起炎症反应（对比考点）。' },
      { name: '细胞癌变', desc: '原癌基因与抑癌基因发生突变：能无限增殖、形态结构改变、表面糖蛋白减少而易转移扩散。' },
      { name: '致癌因子', desc: '物理（紫外线、X 射线）、化学（黄曲霉素、亚硝酸盐）、病毒致癌因子——健康生活方式是最好的预防。' },
    ],
    Svg: CellFatesSvg,
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
    id: 'endoplasmicReticulum',
    name: '内质网',
    kicker: '细胞器 · 结构模式图',
    intro: '膜连接成的网状管道：粗面内质网附着核糖体加工分泌蛋白，滑面内质网合成脂质——内连核膜、外连细胞膜。',
    parts: [
      { name: '网状管道（单层膜）', desc: '由膜折叠连接成的网状结构，增大细胞内膜面积，是物质运输的"内通道"。' },
      { name: '粗面内质网', desc: '表面附着核糖体，对核糖体合成的肽链进行折叠、加工（如加糖基），再以囊泡运往高尔基体。' },
      { name: '滑面内质网', desc: '表面光滑无核糖体，与脂质、固醇类（如性激素）的合成以及解毒有关。' },
      { name: '与核膜相连', desc: '内质网内与核膜外层相连、外与细胞膜相连——"内通外达"的结构是物质运输的结构基础。' },
    ],
    Svg: EndoplasmicReticulumSvg,
  },
  {
    id: 'golgi',
    name: '高尔基体',
    kicker: '细胞器 · 结构模式图',
    intro: '一摞扁平囊组成的"发送站"：接收内质网来的囊泡，对蛋白质再加工、分类、包装，发往细胞各处。',
    parts: [
      { name: '扁平囊堆（单层膜）', desc: '多个弯曲的扁平囊叠成主体，蛋白质在这里完成最后的修饰和分拣。' },
      { name: '形成面（cis）', desc: '朝向内质网的一面，接收来自内质网的运输囊泡。' },
      { name: '成熟面（trans）', desc: '出芽生成囊泡的一面——把"货物"包装好发往细胞膜（胞吐）或溶酶体。' },
      { name: '囊泡', desc: '往返于内质网、高尔基体、细胞膜之间的运输小泡（膜的流动性体现）。' },
      { name: '植物细胞中的特能', desc: '植物细胞分裂末期，高尔基体参与细胞壁（纤维素）的形成——动植物功能差异考点。' },
    ],
    Svg: GolgiSvg,
  },
  {
    id: 'ribosome',
    name: '核糖体',
    kicker: '无膜细胞器 · 结构模式图',
    intro: '由大小两个亚基组成、没有膜的"蛋白质合成机器"：mRNA 穿过中间缝隙，氨基酸被逐个连成多肽链。',
    parts: [
      { name: '大亚基', desc: '较大的半球形部分，是肽键形成（氨基酸连接）的催化中心。' },
      { name: '小亚基', desc: '与 mRNA 结合的部分，保证翻译从正确的位置开始。' },
      { name: 'mRNA 穿行通道', desc: 'mRNA 从大小亚基之间穿过，三个碱基一组（密码子）被读取——翻译的模板。' },
      { name: '合成产物：多肽链', desc: 'tRNA 搬运氨基酸逐个加上去，多肽链从核糖体伸出，折叠成蛋白质。' },
      { name: '附着型与游离型', desc: '附着在内质网上合成分泌蛋白（如胰岛素）；游离在基质中合成细胞自身蛋白——分工不同。' },
    ],
    Svg: RibosomeSvg,
  },
  {
    id: 'lysosome',
    name: '溶酶体',
    kicker: '单层膜细胞器 · 结构模式图',
    intro: '细胞内的"消化车间"：单层膜包裹 60 多种水解酶，能吞掉病毒病菌，也能分解衰老的细胞器。',
    parts: [
      { name: '单层膜', desc: '把水解酶与细胞其他部分隔开——膜一旦破裂，酶释放会消化细胞自身。' },
      { name: '内部水解酶', desc: '60 余种酸性水解酶，能分解蛋白质、核酸、多糖、脂质等几乎所有生物大分子。' },
      { name: '吞噬消化（防御）', desc: '与吞噬了病菌的囊泡融合，把病原体消化分解——白细胞吞噬病菌离不开它。' },
      { name: '自噬（回收）', desc: '包裹并分解衰老、损伤的细胞器，产物可被细胞重新利用；营养不足时分解自身物质应急供能。' },
    ],
    Svg: LysosomeSvg,
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
  {
    id: 'energyPyramid',
    name: '能量金字塔',
    kicker: '生物与环境 · 模式图',
    intro: '能量沿食物链逐级递减（传递效率 10%~20%），营养级越高得到的能量越少——所以塔尖通常只有 4~5 层。',
    parts: [
      { name: '生产者（第一营养级）', desc: '固定的太阳能是流经整个生态系统的总能量，位于塔基、能量最多。' },
      { name: '初级消费者 → 三级消费者', desc: '每往上一层，能量都因呼吸散失、流向分解者和未被利用而大幅减少。' },
      { name: '传递效率 10%~20%', desc: '相邻两个营养级之间的能量传递比例——据此可估算塔尖捕食者最多能养多少。' },
      { name: '呼吸散失', desc: '每个营养级都有大量能量以热能形式散失（图中红色虚线箭头）——热能不能被重新利用，能量流动单向不循环。' },
      { name: '为什么塔要"矮"', desc: '能量逐级锐减，营养级太多顶层得不到足够食物——所以食物链一般不超过 4~5 个营养级。' },
    ],
    Svg: EnergyPyramidSvg,
  },
  {
    id: 'carbonCycle',
    name: '碳循环',
    kicker: '生物与环境 · 循环模式图',
    intro: '碳以 CO₂ 形式在无机环境与生物群落之间循环：光合作用进、呼吸作用出——物质可以被反复利用（全球性循环）。',
    parts: [
      { name: '大气 CO₂ 库', desc: '无机环境中的碳主要以此形式存在；是生物群落与无机环境之间交换碳的"中转站"。' },
      { name: '光合作用（进入群落）', desc: '绿色植物把 CO₂ 和水合成有机物——碳进入生物群落的主要途径（还有化能合成作用）。' },
      { name: '呼吸作用（返回无机环境）', desc: '生产者、消费者、分解者的呼吸作用都把有机物分解为 CO₂ 释放回大气。' },
      { name: '捕食传递', desc: '碳在生物群落内部沿食物链以含碳有机物的形式从生产者流向消费者。' },
      { name: '化石燃料燃烧', desc: '把远古封存的碳短时间内大量释放——是碳循环加快、温室效应加剧的主因。' },
    ],
    Svg: CarbonCycleSvg,
  },
  {
    id: 'foodWeb',
    name: '食物网',
    kicker: '生物与环境 · 营养结构模式图',
    intro: '多条食物链交错成食物网：一种生物可以被多种生物捕食，也可能捕食多种生物——结构越复杂，自我调节能力越强。',
    parts: [
      { name: '生产者（第一营养级）', desc: '食物链的起点，固定太阳能；图中"草"被兔和鼠同时取食。' },
      { name: '初级消费者', desc: '直接以生产者为食（兔、鼠）；同一生物在不同食物链中可能处于不同营养级。' },
      { name: '次级/三级消费者', desc: '狐、蛇是次级消费者，鹰同时占有第三、第四营养级——营养级不是"物种属性"。' },
      { name: '食物链规则', desc: '箭头指向捕食者（能量流动方向）；分解者不进入食物链；起点必须是生产者。' },
      { name: '复杂度与稳定性', desc: '食物网越复杂，自我调节能力越强，抵抗力稳定性越高（"复杂的网"比"单条的链"更抗干扰）。' },
    ],
    Svg: FoodWebSvg,
  },
  {
    id: 'aerobicRespiration',
    name: '有氧呼吸三阶段',
    kicker: '细胞代谢 · 过程模式图',
    intro: '葡萄糖被彻底氧化分解释放大量能量：第一阶段在细胞质基质，第二、三阶段在线粒体——场所和产物是高频考点。',
    parts: [
      { name: '第一阶段（细胞质基质）', desc: '1 分子葡萄糖分解为 2 分子丙酮酸和少量 [H]，释放少量能量——不需要氧气。' },
      { name: '第二阶段（线粒体基质）', desc: '丙酮酸和水彻底分解成 CO₂ 和少量 [H]，释放少量能量——此阶段仍不需要氧气。' },
      { name: '第三阶段（线粒体内膜）', desc: '前两阶段的 [H] 与 O₂ 结合生成水，释放大量能量、合成大量 ATP——氧气只在这里被消耗。' },
      { name: '总反应式', desc: 'C₆H₁₂O₆ + 6O₂ + 6H₂O → 6CO₂ + 12H₂O + 能量；反应式左右不能抵消（水既是反应物又是产物）。' },
      { name: '与光合对比', desc: '光合作用把 CO₂ 和 H₂O 合成有机物储能，呼吸作用正相反——两大代谢的场所、条件、产物常对照出题。' },
    ],
    Svg: AerobicRespirationSvg,
  },
  {
    id: 'flowerStructure',
    name: '花的结构',
    kicker: '植物繁殖 · 完全花模式图',
    intro: '一朵完全花的结构：雄蕊与雌蕊是繁殖的核心——花药里产生花粉，子房的胚珠里有卵细胞，其余部分负责保护与"招蜂引蝶"。',
    parts: [
      { name: '花药', desc: '雄蕊顶端产生花粉（内含精子）的部分——"去雄"杂交操作摘除的就是它。' },
      { name: '花丝', desc: '支撑花药的细柄，把花药举到容易传粉的位置。' },
      { name: '柱头', desc: '雌蕊顶端承接花粉的部位，常分泌黏液——玉米的"须"就是伸到外面的花柱和柱头。' },
      { name: '花柱', desc: '连接柱头与子房的通道；花粉落上去后萌发花粉管，把精子送进胚珠。' },
      { name: '子房与胚珠', desc: '子房内含胚珠，胚珠里有卵细胞（极核）；受精后子房发育成果实、胚珠发育成种子。' },
      { name: '花萼与花瓣', desc: '花萼在开花前保护花蕾；花瓣颜色鲜艳以引诱昆虫传粉（虫媒花），风媒花则小而不鲜艳。' },
    ],
    Svg: FlowerStructureSvg,
  },
  {
    id: 'cornReproduction',
    name: '玉米的繁殖',
    kicker: '植物繁殖 · 单性花雌雄同株',
    intro: '玉米是单性花、雌雄同株：顶端雄花序撒出多而轻的花粉靠风传播，落到叶腋雌花序伸出的"玉米须"（花柱）上，花粉管进入胚珠完成受精。',
    parts: [
      { name: '顶端雄花序', desc: '圆锥花序大量产生花粉——玉米的花没有鲜艳花瓣和花蜜，是典型的风媒花。' },
      { name: '风媒传粉', desc: '花粉多而轻、易被风吹散；雌蕊柱头（花柱）长而分叉、有黏液——增大承接花粉的概率。' },
      { name: '叶腋雌花序（果穗）', desc: '被苞叶包裹的雌穗，每个"玉米须"是一条花柱——一根须对应将来的一粒籽。' },
      { name: '受精', desc: '花粉在花柱上萌发出花粉管，把精子送入胚珠完成受精——须没接到花粉的那一行就"缺粒"。' },
      { name: '单性花与遗传实验', desc: '雌雄同株单性花、天然异花传粉——研究玉米遗传时必须套袋控制授粉，防止"串粉"。' },
    ],
    Svg: CornReproductionSvg,
  },
  {
    id: 'fruitAndSeed',
    name: '果实与种子的形成',
    kicker: '植物繁殖 · 发育对应模式图',
    intro: '受精完成后花瓣凋落：子房壁→果皮、珠被→种皮、受精卵→胚、受精极核→胚乳——玉米籽粒外层果皮种皮愈合，所以一粒玉米其实是果实。',
    parts: [
      { name: '子房壁 → 果皮', desc: '子房壁发育成果皮；玉米的果皮与种皮紧贴愈合，剥不分开。' },
      { name: '胚珠 → 种子', desc: '珠被发育成种皮，保护内部结构。' },
      { name: '受精卵 → 胚', desc: '受精卵（2n）发育成胚——胚芽、胚轴、胚根、子叶，是新植株的"雏形"，遗传物质一半来自父方。' },
      { name: '受精极核 → 胚乳', desc: '受精极核（3n）发育成胚乳储存营养——玉米是单子叶植物，营养主要在胚乳里。' },
      { name: '单子叶 vs 双子叶', desc: '玉米：1 片子叶、有胚乳；菜豆：2 片子叶、营养在子叶中无胚乳——考题常拿两粒种子对比。' },
    ],
    Svg: FruitAndSeedSvg,
  },
  {
    id: 'artificialPollination',
    name: '人工异花传粉四步法',
    kicker: '必修 2 遗传实验 · 操作模式图',
    intro: '孟德尔杂交实验的基本功：去雄 → 套袋 → 人工授粉 → 再套袋标记——控制"谁和谁杂交"，才能得到可分析的子代。',
    parts: [
      { name: '去雄', desc: '在花未成熟（花粉未散出）时摘尽母本的全部雄蕊——豌豆闭花受精，去雄必须在开花前完成。' },
      { name: '套袋', desc: '去雄后立即套上纸袋，防止外来花粉混入——保证"父本"唯一。' },
      { name: '人工授粉', desc: '雌蕊成熟时，蘸取父本花粉涂抹到柱头上——实现指定"母本 × 父本"的杂交组合。' },
      { name: '再套袋与标记', desc: '授粉后再套袋直到结实，并挂标签记录母本×父本——F₁ 自交得 F₂，孟德尔由此发现 3:1 与 9:3:3:1。' },
      { name: '为什么选豌豆', desc: '自花传粉闭花受精 → 天然纯种；花大易操作、有多对易区分的相对性状——实验材料的选择本身就是考点。' },
    ],
    Svg: ArtificialPollinationSvg,
  },
];
