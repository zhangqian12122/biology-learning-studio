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
  /** 课外拓展内容（教材之外的延伸），页面上会打上"课外拓展"标记 */
  extension?: boolean;
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
      {/* 细胞核（核膜外层延伸出内质网） */}
      <g style={dim(active, 2)}>
        <circle cx="96" cy="188" r="58" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="3.5" />
        <circle cx="96" cy="188" r="45" fill="none" stroke="#9a6fa8" strokeWidth="2" opacity="0.7" />
        <text x="96" y="194" textAnchor="middle" fontSize="13" fill="#ffffff" fontWeight="700">细胞核</text>
        <text x="30" y="96" fontSize="12.5" fill="#6a4a9a" fontWeight="600">核膜外层</text>
        <text x="30" y="112" fontSize="12.5" fill="#6a4a9a" fontWeight="600">直接延伸 ↘</text>
      </g>
      {/* 网状管道：主干 + 分支连通 */}
      <g style={dim(active, 0)}>
        <path d="M148 150 C 204 126, 248 146, 294 126 C 338 108, 382 122, 418 108" fill="none" stroke="#8fb8d4" strokeWidth="12" strokeLinecap="round" />
        <path d="M150 190 C 216 178, 260 198, 318 182 C 364 170, 398 186, 430 172" fill="none" stroke="#8fb8d4" strokeWidth="12" strokeLinecap="round" />
        <path d="M154 230 C 208 250, 264 238, 316 250 C 358 260, 394 248, 422 258" fill="none" stroke="#8fb8d4" strokeWidth="12" strokeLinecap="round" />
        <path d="M198 134 C 206 156, 200 172, 206 190" fill="none" stroke="#8fb8d4" strokeWidth="9" strokeLinecap="round" />
        <path d="M292 130 C 298 152, 294 166, 302 186" fill="none" stroke="#8fb8d4" strokeWidth="9" strokeLinecap="round" />
        <path d="M302 186 C 308 208, 302 228, 310 246" fill="none" stroke="#8fb8d4" strokeWidth="9" strokeLinecap="round" />
        <text x="286" y="64" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">分支连通的网状管道（单层膜）</text>
      </g>
      {/* 粗面：附着核糖体颗粒 */}
      <g style={dim(active, 1)}>
        {[[198, 132], [234, 142], [272, 138], [310, 124], [348, 112], [214, 176], [254, 184], [294, 180], [336, 174], [374, 172]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="6" fill="#1e5a8e" stroke="#0f3a5e" strokeWidth="1.4" />
        ))}
        <text x="318" y="316" textAnchor="middle" fontSize="13.5" fill="#1e5a8e" fontWeight="700">粗面内质网：附着核糖体</text>
        <text x="318" y="334" textAnchor="middle" fontSize="12" fill="#4a7a9a">合成、加工分泌蛋白</text>
        <line x1="322" y1="300" x2="296" y2="190" stroke="#1e5a8e" strokeWidth="1.4" opacity="0.55" />
      </g>
      {/* 滑面 */}
      <g style={dim(active, 3)}>
        <text x="106" y="316" textAnchor="middle" fontSize="13.5" fill="#3f7f3a" fontWeight="700">滑面内质网</text>
        <text x="106" y="334" textAnchor="middle" fontSize="12" fill="#4a8a4a">合成脂质（如性激素）</text>
        <line x1="122" y1="300" x2="148" y2="242" stroke="#3f7f3a" strokeWidth="1.4" opacity="0.55" />
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
        {[[242, 196], [266, 212], [240, 228], [264, 240]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5.5" fill="#5a9a4a" />
        ))}
        <line x1="112" y1="252" x2="392" y2="252" stroke="#8aa1a6" strokeWidth="2" strokeDasharray="9 7" />
        <text x="126" y="276" fontSize="13.5" fill="#4b6c73" fontWeight="700">突触间隙（约 20 nm，充盈组织液）</text>
      </g>
      {/* 突触前膜 / 后膜 */}
      <g style={dim(active, 3)}>
        <path d="M158 158 Q 216 176 274 158" fill="none" stroke="#b0483a" strokeWidth="5" strokeLinecap="round" />
        <text x="318" y="142" fontSize="13" fill="#b0483a" fontWeight="700">突触前膜</text>
        <line x1="314" y1="146" x2="274" y2="158" stroke="#b0483a" strokeWidth="1.4" />
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

/* ================= 玉米的繁殖 ================= */

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

/* ================= 果实与种子的形成 ================= */

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

/* ================= 硝化细菌 ================= */

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

/* ================= 水绵 ================= */

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

/* ================= 乳酸菌 ================= */

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

/* ================= 烟草花叶病毒 ================= */

function TmvSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="38" fontSize="13.5" fill="#2c6e94" fontWeight="700">烟草花叶病毒（TMV）：棒状 RNA 病毒——与 T2 噬菌体（DNA 型）成对记</text>
      {/* 棒状病毒主体（水平） */}
      <g style={dim(active, 0)}>
        <rect x="60" y="112" width="360" height="72" rx="36" fill="#f2c98a" stroke="#b57c16" strokeWidth="4" />
        {[96, 128, 160, 192, 224, 256, 288, 320, 352, 384].map((x, i) => (
          <g key={i}>
            <ellipse cx={x} cy={134} rx="11" ry="7" fill="#e8b05a" stroke="#a56a1a" strokeWidth="1.8" transform={`rotate(${i % 2 === 0 ? -14 : 14} ${x} 134)`} />
            <ellipse cx={x + 13} cy={162} rx="11" ry="7" fill="#e8b05a" stroke="#a56a1a" strokeWidth="1.8" transform={`rotate(${i % 2 === 0 ? 14 : -14} ${x + 13} 162)`} />
          </g>
        ))}
        <path d="M84 148 Q 130 158 176 148 Q 222 138 268 148 Q 314 158 360 148 Q 390 142 416 150" fill="none" stroke="#c9503c" strokeWidth="4" strokeLinecap="round" />
        <text x="66" y="86" fontSize="13.5" fill="#a56a1a" fontWeight="700">螺旋排列的衣壳蛋白（蛋白质）</text>
        <line x1="120" y1="92" x2="140" y2="116" stroke="#a56a1a" strokeWidth="1.4" />
      </g>
      <g style={dim(active, 1)}>
        <text x="446" y="94" textAnchor="end" fontSize="13.5" fill="#c9503c" fontWeight="700">中央的单链 RNA</text>
        <text x="446" y="110" textAnchor="end" fontSize="12" fill="#c9503c" fontWeight="600">（遗传物质）</text>
        <line x1="414" y1="102" x2="352" y2="146" stroke="#c9503c" strokeWidth="1.4" />
        <text x="66" y="216" fontSize="13" fill="#8a671b" fontWeight="600">感染烟草、番茄等植物 → 叶面出现花叶斑驳</text>
      </g>
      {/* 重建实验 */}
      <g style={dim(active, 2)}>
        <rect x="26" y="240" width="468" height="112" rx="10" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="42" y="264" fontSize="13.5" fill="#2c6e94" fontWeight="700">重建实验（证明 RNA 是遗传物质）：</text>
        <rect x="42" y="274" width="120" height="42" rx="9" fill="#f2c98a" stroke="#b57c16" strokeWidth="2" />
        <text x="102" y="292" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="600">TMV 的蛋白质</text>
        <text x="102" y="308" textAnchor="middle" fontSize="11.5" fill="#a58a4a">（不含 RNA）</text>
        <text x="180" y="300" fontSize="16" fill="#59767c" fontWeight="700">+</text>
        <rect x="198" y="274" width="120" height="42" rx="9" fill="#e8b8b0" stroke="#b0483a" strokeWidth="2" />
        <text x="258" y="292" textAnchor="middle" fontSize="12" fill="#9b3a30" fontWeight="600">HRV 的 RNA</text>
        <text x="258" y="308" textAnchor="middle" fontSize="11.5" fill="#c06a62">（另一种病毒）</text>
        <line x1="322" y1="295" x2="352" y2="295" stroke="#5a5a62" strokeWidth="3" markerEnd="url(#tmv-arrow)" />
        <rect x="356" y="274" width="120" height="42" rx="9" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="2" />
        <text x="416" y="292" textAnchor="middle" fontSize="12" fill="#6a4a9a" fontWeight="600">杂合病毒 → 侵染</text>
        <text x="416" y="308" textAnchor="middle" fontSize="11.5" fill="#8a5a94">后代与 HRV 相同！</text>
        <text x="42" y="340" fontSize="12.5" fill="#46666d">重组病毒的性状由 RNA 决定、不由蛋白质决定 → RNA 才是这种病毒的遗传物质</text>
      </g>
      <defs>
        <marker id="tmv-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">烟草花叶病毒与重建实验模式图</text>
    </svg>
  );
}

/* ================= 染色体与染色质 ================= */

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

/* ================= 抗体 ================= */

function AntibodySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* Y 形抗体 */}
      <g style={dim(active, 0)}>
        <path d="M232 320 L 240 200 Q 240 176 222 158 L 196 128" fill="none" stroke="#c98a1d" strokeWidth="16" strokeLinecap="round" />
        <path d="M288 320 L 280 200 Q 280 176 298 158 L 324 128" fill="none" stroke="#c98a1d" strokeWidth="16" strokeLinecap="round" />
        <path d="M196 128 L 232 178 M 324 128 L 288 178" fill="none" stroke="#e8b05a" strokeWidth="9" strokeLinecap="round" />
        <text x="260" y="352" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">Y 形：两条重链 + 两条轻链</text>
      </g>
      {/* 抗原结合 */}
      <g style={dim(active, 1)}>
        {[[196, 116], [324, 116]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y - 12} r="15" fill="#d97a5a" stroke="#b0483a" strokeWidth="2.5" strokeDasharray="5 4" />
            <text x={x} y={y - 7} textAnchor="middle" fontSize="11.5" fill="#7a2622" fontWeight="700">抗原</text>
          </g>
        ))}
        <text x="72" y="72" fontSize="13.5" fill="#b0483a" fontWeight="700">抗原结合部位（可变）</text>
        <text x="72" y="90" fontSize="12" fill="#c97a5a">像钥匙配锁——特异性</text>
        <line x1="178" y1="76" x2="188" y2="92" stroke="#b0483a" strokeWidth="1.4" />
      </g>
      {/* 效应说明 */}
      <g style={dim(active, 2)}>
        <rect x="330" y="196" width="176" height="118" rx="10" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="346" y="222" fontSize="13" fill="#2c6e94" fontWeight="700">结合后会发生什么？</text>
        <text x="346" y="246" fontSize="12.5" fill="#46666d">· 形成沉淀或细胞集团</text>
        <text x="346" y="266" fontSize="12.5" fill="#46666d">· 被吞噬细胞消化清除</text>
        <text x="346" y="286" fontSize="12.5" fill="#46666d">· 抗体本身不"杀灭"抗原</text>
        <text x="346" y="306" fontSize="12" fill="#799398">由浆细胞（效应 B 细胞）分泌</text>
      </g>
      {/* 记忆细胞 */}
      <g style={dim(active, 3)}>
        <rect x="24" y="196" width="176" height="118" rx="10" fill="#eef7f6" stroke="#9fcab2" strokeWidth="2" />
        <text x="40" y="222" fontSize="13" fill="#2f7a4d" fontWeight="700">二次免疫为什么更快？</text>
        <text x="40" y="246" fontSize="12.5" fill="#46666d">初次免疫产生记忆细胞；</text>
        <text x="40" y="266" fontSize="12.5" fill="#46666d">再次遇到同一抗原时</text>
        <text x="40" y="286" fontSize="12.5" fill="#46666d">更快、更多地产出抗体。</text>
        <text x="40" y="306" fontSize="12" fill="#799398">疫苗的原理正是如此</text>
      </g>
      <text x="16" y="52" fontSize="13.5" fill="#2c6e94" fontWeight="700">抗体 = 浆细胞分泌的免疫球蛋白（蛋白质）——专有名词条目，配免疫调节复习</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">抗体结构示意图</text>
    </svg>
  );
}

/* ================= 细胞核 ================= */

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

/* ================= 光合作用过程 ================= */

function PhotosynthesisProcessSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="24" y="34" fontSize="14" fill="#2f7a4d" fontWeight="700">光合作用全过程（叶绿体）</text>
      {/* O2 释放 */}
      <g style={dim(active, 1)}>
        <line x1="122" y1="90" x2="122" y2="58" stroke="#3d7e9e" strokeWidth="3.5" markerEnd="url(#ps-arrow)" />
        <text x="134" y="66" fontSize="13" fill="#2c6e94" fontWeight="700">O₂ 释放</text>
      </g>
      {/* 光反应区 */}
      <g style={dim(active, 1)}>
        <rect x="24" y="92" width="196" height="196" rx="12" fill="#dcefe6" stroke="#3f7f3a" strokeWidth="2.5" strokeDasharray="8 5" />
        <text x="122" y="118" textAnchor="middle" fontSize="13.5" fill="#1e5a2e" fontWeight="700">光反应（类囊体薄膜）</text>
        {[132, 148, 164].map((y, i) => (
          <ellipse key={i} cx="76" cy={y} rx="34" ry="8" fill="#6aa86a" stroke="#2f7a4d" strokeWidth="2" />
        ))}
        <text x="124" y="152" fontSize="12" fill="#2f7a4d" fontWeight="600">基粒</text>
        <text x="40" y="198" fontSize="12.5" fill="#2f7a4d">水的光解：</text>
        <text x="40" y="218" fontSize="12.5" fill="#2f7a4d">H₂O → O₂ + H⁺</text>
        <text x="40" y="242" fontSize="12.5" fill="#2f7a4d">ADP + Pi → ATP</text>
        <text x="40" y="266" fontSize="12.5" fill="#2f7a4d">NADP⁺ → NADPH（[H]）</text>
      </g>
      {/* 暗反应区 */}
      <g style={dim(active, 2)}>
        <rect x="304" y="92" width="192" height="196" rx="12" fill="#e8f1f8" stroke="#3d7e9e" strokeWidth="2.5" strokeDasharray="8 5" />
        <text x="400" y="118" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">暗反应（叶绿体基质）</text>
        <text x="320" y="152" fontSize="12.5" fill="#2c6e94">CO₂ 固定：</text>
        <text x="320" y="172" fontSize="12.5" fill="#2c6e94">CO₂ + C₅ → 2C₃</text>
        <text x="320" y="200" fontSize="12.5" fill="#2c6e94">C₃ 还原：</text>
        <text x="320" y="220" fontSize="12.5" fill="#2c6e94">2C₃ → 糖类 + C₅</text>
        <text x="320" y="248" fontSize="12" fill="#4b6c73">（消耗 ATP 和 [H]）</text>
        <text x="320" y="272" fontSize="12" fill="#4b6c73">C₃ 循环再生，源源不断</text>
      </g>
      {/* 中间物质交换 */}
      <g style={dim(active, 3)}>
        <line x1="224" y1="150" x2="300" y2="150" stroke="#c98a1d" strokeWidth="4" markerEnd="url(#ps-arrow)" />
        <text x="262" y="136" textAnchor="middle" fontSize="12.5" fill="#c98a1d" fontWeight="700">ATP</text>
        <text x="262" y="174" textAnchor="middle" fontSize="12.5" fill="#c98a1d" fontWeight="700">[H]</text>
        <line x1="300" y1="226" x2="224" y2="226" stroke="#8a671b" strokeWidth="3.5" strokeDasharray="7 5" markerEnd="url(#ps-arrow)" />
        <text x="262" y="214" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="700">ADP、Pi</text>
        <text x="262" y="250" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="700">NADP⁺</text>
      </g>
      {/* CO2 进入 / 有机物输出 */}
      <g style={dim(active, 2)}>
        <path d="M478 322 Q 502 310 510 294" fill="none" stroke="#7a7a82" strokeWidth="3.5" markerEnd="url(#ps-arrow)" />
        <text x="356" y="330" fontSize="13" fill="#5a5a62" fontWeight="700">CO₂ 从气孔进入 ↗</text>
      </g>
      <g style={dim(active, 2)}>
        <path d="M300 268 Q 250 296 196 310" fill="none" stroke="#3f7f3a" strokeWidth="3.5" markerEnd="url(#ps-arrow)" />
        <text x="44" y="318" fontSize="13" fill="#2f7a4d" fontWeight="700">有机物（糖类）输出</text>
      </g>
      {/* 总反应式 */}
      <g style={dim(active, 4)}>
        <rect x="24" y="326" width="472" height="36" rx="9" fill="#ffffff" stroke="#cfe0e0" strokeWidth="2" />
        <text x="260" y="350" textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">
          总反应式：CO₂ + H₂O →（CH₂O）+ O₂（条件：光能、叶绿体）
        </text>
      </g>
      <defs>
        <marker id="ps-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
    </svg>
  );
}

/* ================= 中心法则 ================= */

function CentralDogmaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* DNA */}
      <g style={dim(active, 0)}>
        <rect x="60" y="70" width="140" height="60" rx="10" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="3" />
        <text x="130" y="96" textAnchor="middle" fontSize="14" fill="#1e4a68" fontWeight="700">DNA</text>
        <text x="130" y="116" textAnchor="middle" fontSize="12" fill="#2c6e94">（遗传信息储藏库）</text>
      </g>
      {/* RNA */}
      <g style={dim(active, 1)}>
        <rect x="320" y="70" width="140" height="60" rx="10" fill="#f4d06a" stroke="#b5953a" strokeWidth="3" />
        <text x="390" y="96" textAnchor="middle" fontSize="14" fill="#7a5a10" fontWeight="700">RNA</text>
        <text x="390" y="116" textAnchor="middle" fontSize="12" fill="#a58a20">（信使/转运/核糖体）</text>
      </g>
      {/* 蛋白质 */}
      <g style={dim(active, 2)}>
        <rect x="320" y="230" width="140" height="60" rx="10" fill="#b8d4a8" stroke="#3f7f3a" strokeWidth="3" />
        <text x="390" y="256" textAnchor="middle" fontSize="14" fill="#2f5a1e" fontWeight="700">蛋白质</text>
        <text x="390" y="276" textAnchor="middle" fontSize="12" fill="#4a7a3a">（性状的直接体现者）</text>
      </g>
      {/* 转录 */}
      <g style={dim(active, 3)}>
        <line x1="204" y1="100" x2="314" y2="100" stroke="#3d6a94" strokeWidth="4" markerEnd="url(#cd-arrow)" />
        <text x="259" y="88" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">转录（细胞核）</text>
      </g>
      {/* 翻译 */}
      <g style={dim(active, 4)}>
        <line x1="390" y1="134" x2="390" y2="224" stroke="#b5953a" strokeWidth="4" markerEnd="url(#cd-arrow)" />
        <text x="412" y="184" fontSize="13.5" fill="#8a671b" fontWeight="700">翻译（核糖体）</text>
      </g>
      {/* 复制 */}
      <g style={dim(active, 0)}>
        <path d="M92 64 Q 130 34 168 64" fill="none" stroke="#3d6a94" strokeWidth="4" markerEnd="url(#cd-arrow)" />
        <text x="130" y="28" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">DNA 复制</text>
      </g>
      {/* 逆转录（补充） */}
      <g style={dim(active, 5)}>
        <path d="M330 134 Q 240 190 140 136" fill="none" stroke="#b0483a" strokeWidth="3.5" strokeDasharray="8 6" markerEnd="url(#cd-arrow)" />
        <text x="196" y="188" fontSize="13" fill="#b0483a" fontWeight="700">逆转录（病毒）</text>
      </g>
      {/* RNA 复制（补充） */}
      <g style={dim(active, 5)}>
        <path d="M352 62 Q 390 32 428 62" fill="none" stroke="#b0483a" strokeWidth="3.5" strokeDasharray="8 6" markerEnd="url(#cd-arrow)" />
        <text x="390" y="24" textAnchor="middle" fontSize="13" fill="#b0483a" fontWeight="700">RNA 复制（病毒）</text>
      </g>
      <g style={dim(active, 5)}>
        <text x="24" y="336" fontSize="13.5" fill="#2c6e94" fontWeight="700">实线：细胞生物共有（克里克提出）；虚线：部分病毒特有的补充路径（后来发现）</text>
      </g>
      <defs>
        <marker id="cd-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">中心法则图解</text>
    </svg>
  );
}

/* ================= 核苷酸 ================= */

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

/* ================= 酶-底物锁钥模型 ================= */

function EnzymeModelSvg({ active }: { active: number | null; open?: boolean }) {
  const step = (i: number) => ({ cx: 92 + i * 168, cy: 150 });
  const enzyme = (cx: number, cy: number, filled: boolean) => (
    <path
      d={`M${cx - 52} ${cy} a 52 52 0 0 1 104 0 l -22 0 l -14 22 l -14 -22 Z ${filled ? '' : 'M'}`}
      fill={filled ? '#f2c98a' : '#f2c98a'}
      stroke="#b57c16"
      strokeWidth="3.5"
      fillRule="evenodd"
    />
  );
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 第一步：识别结合 */}
      <g style={dim(active, 0)}>
        {enzyme(92, 150, false)}
        <path d="M92 116 L84 96 L100 96 Z" fill="#7fb8d4" stroke="#3d6a94" strokeWidth="2.5" />
        <path d="M60 54 Q 92 38 124 54" fill="none" stroke="#3d6a94" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#ez-arrow)" />
        <text x="92" y="236" textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">① 底物靠近</text>
        <text x="92" y="256" textAnchor="middle" fontSize="12" fill="#59767c">活性中心形状互补</text>
      </g>
      {/* 第二步：复合物 */}
      <g style={dim(active, 1)}>
        {enzyme(260, 150, false)}
        <path d="M260 118 L252 98 L268 98 Z" fill="#c9503c" stroke="#8c231f" strokeWidth="2.5" />
        <text x="260" y="76" textAnchor="middle" fontSize="12.5" fill="#8c231f" fontWeight="600">酶-底物复合物</text>
        <text x="260" y="236" textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">② 结合、催化</text>
        <text x="260" y="256" textAnchor="middle" fontSize="12" fill="#59767c">降低活化能</text>
      </g>
      {/* 第三步：产物释放 */}
      <g style={dim(active, 2)}>
        {enzyme(428, 150, false)}
        <path d="M398 88 L412 68 L424 84 Z" fill="#7fb8d4" stroke="#3d6a94" strokeWidth="2.5" />
        <path d="M436 84 L448 68 L462 90 Z" fill="#7fb8d4" stroke="#3d6a94" strokeWidth="2.5" />
        <path d="M404 92 Q 396 104 402 112" fill="none" stroke="#3d6a94" strokeWidth="2.5" strokeDasharray="5 4" markerEnd="url(#ez-arrow)" />
        <text x="428" y="236" textAnchor="middle" fontSize="13.5" fill="#173b42" fontWeight="700">③ 产物释放</text>
        <text x="428" y="256" textAnchor="middle" fontSize="12" fill="#59767c">酶恢复原状可重复用</text>
      </g>
      {/* 要点 */}
      <g style={dim(active, 1)}>
        <rect x="26" y="286" width="468" height="60" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="42" y="310" fontSize="13.5" fill="#173b42" fontWeight="700">专一性：一把钥匙开一把锁（活性中心与底物互补）；高效性：显著降低活化能</text>
        <text x="42" y="332" fontSize="12" fill="#59767c">条件温和（适宜温度、pH）——过酸、过碱、高温使酶变性失活（空间结构被破坏）</text>
      </g>
      <defs>
        <marker id="ez-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#3d6a94" />
        </marker>
      </defs>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">酶-底物结合锁钥模型图解</text>
    </svg>
  );
}

/* ================= 单克隆抗体制备 ================= */

function MonoclonalAntibodySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 两种亲本细胞 */}
      <g style={dim(active, 0)}>
        <circle cx="92" cy="104" r="36" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="3" />
        <circle cx="92" cy="104" r="8" fill="#7a4a8a" />
        <text x="92" y="162" textAnchor="middle" fontSize="12.5" fill="#6a4a9a" fontWeight="600">B 淋巴细胞</text>
        <text x="92" y="180" textAnchor="middle" fontSize="11.5" fill="#8a6a94">产特异抗体 · 不能增殖</text>
      </g>
      <g style={dim(active, 1)}>
        <circle cx="92" cy="256" r="36" fill="#f0b0a8" stroke="#b0483a" strokeWidth="3" />
        <circle cx="92" cy="256" r="8" fill="#b0483a" />
        <text x="92" y="314" textAnchor="middle" fontSize="12.5" fill="#9b3a30" fontWeight="600">骨髓瘤细胞</text>
        <text x="92" y="332" textAnchor="middle" fontSize="11.5" fill="#b56a62">能无限增殖 · 不产抗体</text>
      </g>
      {/* 融合 */}
      <g style={dim(active, 2)}>
        <path d="M138 130 Q 180 148 216 166" fill="none" stroke="#5a5a62" strokeWidth="3.5" markerEnd="url(#ma-arrow)" />
        <path d="M138 240 Q 180 224 216 204" fill="none" stroke="#5a5a62" strokeWidth="3.5" markerEnd="url(#ma-arrow)" />
        <text x="176" y="186" textAnchor="middle" fontSize="12.5" fill="#59767c" fontWeight="600">细胞融合</text>
        <text x="176" y="204" textAnchor="middle" fontSize="11.5" fill="#799398">（PEG / 灭活病毒）</text>
        <circle cx="290" cy="186" r="42" fill="#d9c8ec" stroke="#7a4a8a" strokeWidth="3.5" />
        <circle cx="276" cy="176" r="8" fill="#7a4a8a" />
        <circle cx="304" cy="196" r="8" fill="#b0483a" />
        <text x="290" y="248" textAnchor="middle" fontSize="13" fill="#6a4a9a" fontWeight="700">杂交瘤细胞</text>
        <text x="290" y="266" textAnchor="middle" fontSize="11.5" fill="#8a6a94">兼具两亲本优点</text>
      </g>
      {/* 筛选与生产 */}
      <g style={dim(active, 3)}>
        <line x1="336" y1="186" x2="372" y2="186" stroke="#5a5a62" strokeWidth="3.5" markerEnd="url(#ma-arrow)" />
        <text x="354" y="170" textAnchor="middle" fontSize="12" fill="#59767c">筛选</text>
        <rect x="378" y="150" width="58" height="72" rx="10" fill="#eef7f6" stroke="#0e6f75" strokeWidth="3" />
        <path d="M390 200 Q 407 186 424 200" fill="none" stroke="#0e6f75" strokeWidth="3" />
        <text x="407" y="248" textAnchor="middle" fontSize="12" fill="#0a626a" fontWeight="600">体外培养</text>
        <line x1="440" y1="186" x2="464" y2="186" stroke="#5a5a62" strokeWidth="3.5" markerEnd="url(#ma-arrow)" />
        <path d="M470 172 L494 172 L494 214 Q 482 226 470 214 Z" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.5" />
        <text x="482" y="248" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="600">抗体</text>
      </g>
      {/* 优点 */}
      <g style={dim(active, 3)}>
        <rect x="200" y="290" width="300" height="58" rx="9" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="216" y="314" fontSize="13" fill="#173b42" fontWeight="700">单克隆抗体优点：特异性强、灵敏度高</text>
        <text x="216" y="334" fontSize="12" fill="#59767c">并可大量制备——用于诊断（试纸）与靶向治疗</text>
      </g>
      <defs>
        <marker id="ma-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="16" y="46" fontSize="13.5" fill="#2c6e94" fontWeight="700">单克隆抗体制备流程（动物细胞融合技术）——"两亲本优点的合体"</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">单克隆抗体制备流程图</text>
    </svg>
  );
}

/* ================= 渗透作用装置 ================= */

function OsmosisSetupSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 烧杯 */}
      <g style={dim(active, 0)}>
        <path d="M46 160 L 60 330 L 268 330 L 282 160" fill="none" stroke="#5a7a8a" strokeWidth="4" strokeLinecap="round" />
        <rect x="58" y="230" width="216" height="96" fill="#cfe4f0" opacity="0.85" />
        <text x="168" y="318" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">烧杯：清水（低浓度）</text>
      </g>
      {/* 漏斗 */}
      <g style={dim(active, 1)}>
        <path d="M130 150 L 168 96 L 206 150 Z" fill="#fdf1e3" stroke="#c98a1d" strokeWidth="3" />
        <rect x="152" y="36" width="32" height="64" fill="#f6d7c4" stroke="#c98a1d" strokeWidth="2.5" />
        <line x1="126" y1="152" x2="210" y2="152" stroke="#b0483a" strokeWidth="5" />
        <text x="238" y="146" fontSize="13" fill="#b0483a" fontWeight="700">半透膜</text>
        <text x="238" y="164" fontSize="12" fill="#c97a5a">（只允许水分子过）</text>
        <text x="238" y="86" fontSize="13.5" fill="#8a671b" fontWeight="700">蔗糖溶液（高浓度）</text>
        <text x="238" y="60" fontSize="13" fill="#b0483a" fontWeight="700">液面持续上升 ↑</text>
      </g>
      {/* 水分子移动 */}
      <g style={dim(active, 2)}>
        <path d="M100 292 Q 130 260 158 210 Q 166 192 166 172" fill="none" stroke="#3d7e9e" strokeWidth="4" markerEnd="url(#os-arrow)" />
        <text x="60" y="252" fontSize="12.5" fill="#1e4a68" fontWeight="700">水分子净移动</text>
        <text x="52" y="130" fontSize="12" fill="#59767c">水：低浓度 → 高浓度</text>
      </g>
      {/* 原理对应 */}
      <g style={dim(active, 3)}>
        <rect x="300" y="176" width="204" height="154" rx="10" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="316" y="202" fontSize="13.5" fill="#173b42" fontWeight="700">对应到细胞：</text>
        <text x="316" y="226" fontSize="12.5" fill="#46666d">半透膜 ↔ 原生质层</text>
        <text x="316" y="246" fontSize="12" fill="#799398">（细胞膜+液泡膜+其间细胞质）</text>
        <text x="316" y="270" fontSize="12.5" fill="#46666d">浓度差 ↔ 细胞液 vs 外界液</text>
        <text x="316" y="294" fontSize="12.5" fill="#2c6e94" fontWeight="600">外液＞细胞液 → 质壁分离</text>
        <text x="316" y="316" fontSize="12.5" fill="#2f7a4d" fontWeight="600">外液＜细胞液 → 复原</text>
      </g>
      <defs>
        <marker id="os-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#3d7e9e" />
        </marker>
      </defs>
      <text x="16" y="46" fontSize="13.5" fill="#2c6e94" fontWeight="700">渗透作用两个条件：半透膜 + 膜两侧浓度差</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">渗透作用装置图（质壁分离实验原理）</text>
    </svg>
  );
}

/* ================= 神经纤维电位 ================= */

function NervePotentialSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 静息区 */}
      <g style={dim(active, 0)}>
        <rect x="40" y="140" width="240" height="70" rx="33" fill="#f6d7c4" stroke="#b58a5f" strokeWidth="3.5" />
        {[[70, 126], [110, 126], [150, 126], [190, 126], [230, 126]].map(([x, y], i) => (
          <text key={i} x={x} y={y + 5} textAnchor="middle" fontSize="13.5" fill="#3d7e9e" fontWeight="700">+</text>
        ))}
        {[[70, 228], [110, 228], [150, 228], [190, 228], [230, 228]].map(([x, y], i) => (
          <text key={i} x={x} y={y} textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">−</text>
        ))}
        <text x="140" y="100" textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">静息电位：外正内负</text>
        <text x="76" y="196" fontSize="12.5" fill="#1e4a68" fontWeight="600">K⁺ 外流 →</text>
      </g>
      {/* 兴奋区 */}
      <g style={dim(active, 1)}>
        <rect x="280" y="140" width="200" height="70" rx="33" fill="#f0b896" stroke="#b0483a" strokeWidth="3.5" />
        {[[306, 126], [346, 126], [386, 126], [426, 126]].map(([x, y], i) => (
          <text key={i} x={x} y={y + 5} textAnchor="middle" fontSize="13.5" fill="#2c6e94" fontWeight="700">−</text>
        ))}
        {[[306, 228], [346, 228], [386, 228], [426, 228]].map(([x, y], i) => (
          <text key={i} x={x} y={y} textAnchor="middle" fontSize="13.5" fill="#9b3a30" fontWeight="700">+</text>
        ))}
        <text x="380" y="100" textAnchor="middle" fontSize="13.5" fill="#b0483a" fontWeight="700">动作电位：外负内正</text>
        <text x="368" y="196" fontSize="12.5" fill="#9b3a30" fontWeight="600">← Na⁺ 内流</text>
      </g>
      {/* 局部电流 */}
      <g style={dim(active, 2)}>
        <path d="M212 112 Q 258 78 306 110" fill="none" stroke="#5a5a62" strokeWidth="3.5" markerEnd="url(#np-arrow)" />
        <path d="M306 240 Q 258 272 212 244" fill="none" stroke="#5a5a62" strokeWidth="3.5" markerEnd="url(#np-arrow)" />
        <text x="258" y="66" textAnchor="middle" fontSize="13" fill="#4b6c73" fontWeight="700">局部电流</text>
        <text x="258" y="292" textAnchor="middle" fontSize="12" fill="#4b6c73">未兴奋部位 → 兴奋部位（膜内方向 = 传导方向）</text>
      </g>
      <g style={dim(active, 0)}>
        <text x="16" y="330" fontSize="13.5" fill="#173b42" fontWeight="700">刺激 → 膜电位翻转 → 与邻近部位形成电位差 → 局部电流依次传导（双向、不衰减）</text>
      </g>
      <defs>
        <marker id="np-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">神经纤维电位变化与局部电流图解</text>
    </svg>
  );
}

/* ================= 生物膜系统 ================= */

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

/* ================= 细胞分化与全能性 ================= */

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

/* ================= 年龄组成 ================= */

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

/* ================= 群落空间结构 ================= */

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

/* ================= 中心体 ================= */

function CentrosomeSvg({ active }: { active: number | null; open?: boolean }) {
  // 横切：9 组三联微管围成一圈（每组 3 个小圆）
  const crossSection = (cx: number, cy: number, r: number) => (
    <g>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const angle = (i * 40 * Math.PI) / 180;
        const px = cx + Math.cos(angle) * r;
        const py = cy + Math.sin(angle) * r;
        const tx = -Math.sin(angle);
        const ty = Math.cos(angle);
        return (
          <g key={i}>
            {[0, 1, 2].map((j) => (
              <circle key={j} cx={px + tx * (j - 1) * 7} cy={py + ty * (j - 1) * 7} r="4" fill="#eef7f6" stroke="#2c6e94" strokeWidth="2" />
            ))}
          </g>
        );
      })}
    </g>
  );
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <text x="24" y="88" fontSize="12.5" fill="#59767c">无膜细胞器（与核糖体同为"无膜兄弟"）</text>
      </g>
      {/* 纵切：微管束平行排列 */}
      <g style={dim(active, 0)}>
        <rect x="46" y="128" width="184" height="76" rx="18" fill="#d9e7f2" stroke="#3d6a94" strokeWidth="3" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
          const x = 68 + i * 18;
          return (
            <g key={i}>
              <line x1={x - 4} y1="140" x2={x - 4} y2="192" stroke="#3d6a94" strokeWidth="2.2" />
              <line x1={x} y1="138" x2={x} y2="194" stroke="#3d6a94" strokeWidth="2.2" />
              <line x1={x + 4} y1="140" x2={x + 4} y2="192" stroke="#3d6a94" strokeWidth="2.2" />
            </g>
          );
        })}
        <text x="138" y="232" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">中心粒（纵切：微管束）</text>
      </g>
      {/* 相互垂直 */}
      <g style={dim(active, 0)}>
        <line x1="238" y1="166" x2="298" y2="166" stroke="#8aa1a6" strokeWidth="2.5" strokeDasharray="6 4" />
        <text x="268" y="150" textAnchor="middle" fontSize="12.5" fill="#59767c" fontWeight="600">相互垂直 ↀ</text>
      </g>
      {/* 横切：9 组三联微管 */}
      <g style={dim(active, 1)}>
        <circle cx="384" cy="164" r="70" fill="#f7fbfc" stroke="#3d6a94" strokeWidth="3" />
        {crossSection(384, 164, 46)}
        <text x="384" y="262" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">中心粒（横切：9 组三联微管）</text>
      </g>
      {/* 分布与功能 */}
      <g style={dim(active, 2)}>
        <rect x="46" y="286" width="448" height="62" rx="10" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="62" y="310" fontSize="13.5" fill="#173b42" fontWeight="700">分布：动物细胞和低等植物细胞有；高等植物细胞没有</text>
        <text x="62" y="332" fontSize="12.5" fill="#46666d">功能：与有丝分裂有关——发出星射线形成纺锤体，牵引染色体移动</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">中心体结构模式图</text>
    </svg>
  );
}

/* ================= 神经-体液-免疫调节网络 ================= */

function HomeostasisNetworkSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 中央：稳态 */}
      <g style={dim(active, 3)}>
        <circle cx="260" cy="186" r="66" fill="#e7f3e2" stroke="#2f7a4d" strokeWidth="4" />
        <text x="260" y="180" textAnchor="middle" fontSize="14" fill="#2f7a4d" fontWeight="700">内环境稳态</text>
        <text x="260" y="200" textAnchor="middle" fontSize="12" fill="#4a8a4a">动态平衡（不是不变）</text>
      </g>
      {/* 神经调节 */}
      <g style={dim(active, 0)}>
        <rect x="40" y="56" width="150" height="66" rx="12" fill="#d9e7f2" stroke="#3d6a94" strokeWidth="3" />
        <text x="115" y="82" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">神经调节</text>
        <text x="115" y="102" textAnchor="middle" fontSize="11.5" fill="#4a7a9a">反应快 · 定位准 · 短暂</text>
        <line x1="150" y1="126" x2="212" y2="152" stroke="#3d6a94" strokeWidth="3.5" markerEnd="url(#hn-arrow)" />
      </g>
      {/* 体液调节 */}
      <g style={dim(active, 1)}>
        <rect x="330" y="56" width="150" height="66" rx="12" fill="#f4d9b0" stroke="#b57c16" strokeWidth="3" />
        <text x="405" y="82" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">体液调节</text>
        <text x="405" y="102" textAnchor="middle" fontSize="11.5" fill="#a58a4a">较慢 · 广泛 · 较长</text>
        <line x1="370" y1="126" x2="308" y2="152" stroke="#b57c16" strokeWidth="3.5" markerEnd="url(#hn-arrow)" />
      </g>
      {/* 免疫调节 */}
      <g style={dim(active, 2)}>
        <rect x="185" y="300" width="150" height="66" rx="12" fill="#f0b0a8" stroke="#b0483a" strokeWidth="3" />
        <text x="260" y="326" textAnchor="middle" fontSize="13.5" fill="#9b3a30" fontWeight="700">免疫调节</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#b56a62">清除异物 · 防卫监控清除</text>
        <line x1="260" y1="296" x2="260" y2="256" stroke="#b0483a" strokeWidth="3.5" markerEnd="url(#hn-arrow)" />
      </g>
      {/* 相互联系 */}
      <g style={dim(active, 3)}>
        <path d="M76 128 Q 150 300 228 318" fill="none" stroke="#8aa1a6" strokeWidth="2" strokeDasharray="6 5" />
        <path d="M444 128 Q 370 300 292 318" fill="none" stroke="#8aa1a6" strokeWidth="2" strokeDasharray="6 5" />
        <text x="60" y="252" fontSize="12" fill="#799398">互相协调配合</text>
        <text x="428" y="252" fontSize="12" fill="#799398">缺一不可</text>
      </g>
      <text x="16" y="40" fontSize="13.5" fill="#2c6e94" fontWeight="700">目前普遍认为：神经-体液-免疫调节网络是机体维持稳态的主要调节机制</text>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">稳态调节网络概念图</text>
      <defs>
        <marker id="hn-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
    </svg>
  );
}

/* ================= 支原体（课外拓展） ================= */

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

/* ================= 变形虫（课外拓展） ================= */

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

/* ================= 眼虫（课外拓展） ================= */

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

/* ================= 生物富集（课外拓展） ================= */

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

/* ================= 蚯蚓 ================= */

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

/* ================= 蝗虫 ================= */

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

/* ================= 鲫鱼 ================= */

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

/* ================= 青蛙的变态发育 ================= */

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

/* ================= 家鸽 ================= */

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

/* ================= 苔藓与蕨类 ================= */

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

/* ================= 分裂数目变化曲线 ================= */

function DivisionCurveSvg({ active }: { active: number | null; open?: boolean }) {
  // 有丝分裂面板：间期 前 中 后 末（5 槽）
  const mX = [46, 91, 136, 181, 226];
  const stageM = ['间期', '前期', '中期', '后期', '末期'];
  // 减数分裂面板：间期 减Ⅰ前 减Ⅰ后 减Ⅱ 末期
  const rX = [296, 341, 386, 431, 476];
  const stageR = ['间期', '减Ⅰ前', '减Ⅰ后', '减Ⅱ', '末期'];
  const y2 = 150; // 2C/2N
  const y4 = 110; // 4C/4N
  const y1 = 192; // C/N（减半）
  const dnaColor = '#b0483a';
  const chrColor = '#3d6a94';
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 图例 */}
      <g style={dim(active, 0)}>
        <line x1="60" y1="34" x2="88" y2="34" stroke={dnaColor} strokeWidth="3.5" />
        <text x="94" y="38" fontSize="13" fill={dnaColor} fontWeight="700">DNA 含量</text>
        <line x1="220" y1="34" x2="248" y2="34" stroke={chrColor} strokeWidth="3.5" />
        <text x="254" y="38" fontSize="13" fill={chrColor} fontWeight="700">染色体数目</text>
      </g>
      {/* 有丝分裂面板 */}
      <g style={dim(active, 1)}>
        <text x="130" y="70" textAnchor="middle" fontSize="14" fill="#173b42" fontWeight="700">有丝分裂</text>
        <line x1="24" y1={y2} x2="250" y2={y2} stroke="#d5e4e5" strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1="24" y1={y4} x2="250" y2={y4} stroke="#d5e4e5" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x="18" y={y2 + 4} textAnchor="end" fontSize="12" fill="#799398">2C·2N</text>
        <text x="18" y={y4 + 4} textAnchor="end" fontSize="12" fill="#799398">4C·4N</text>
        {/* DNA：间期复制加倍，末期减半 */}
        <polyline
          points={`24,${y2} 60,${y2} 78,${y4} 136,${y4} 200,${y4} 226,${y2} 250,${y2}`}
          fill="none" stroke={dnaColor} strokeWidth="3.5" strokeLinejoin="round"
        />
        {/* 染色体：后期着丝粒分裂短暂加倍 */}
        <polyline
          points={`24,${y2} 181,${y2} 203,${y4} 226,${y2} 250,${y2}`}
          fill="none" stroke={chrColor} strokeWidth="3.5" strokeLinejoin="round" strokeDasharray="8 4"
        />
        {mX.map((x, i) => (
          <text key={i} x={x} y={y2 + 66} textAnchor="middle" fontSize="12.5" fill="#4b6c73" fontWeight="600">{stageM[i]}</text>
        ))}
        <text x="136" y={y4 - 8} textAnchor="middle" fontSize="12" fill="#b0483a" fontWeight="600">间期复制 ×2</text>
        <text x="204" y={y4 - 8} textAnchor="middle" fontSize="12" fill="#3d6a94" fontWeight="600">后期 ×2</text>
      </g>
      {/* 减数分裂面板 */}
      <g style={dim(active, 2)}>
        <text x="386" y="70" textAnchor="middle" fontSize="14" fill="#173b42" fontWeight="700">减数分裂</text>
        <line x1="274" y1={y2} x2="500" y2={y2} stroke="#d5e4e5" strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1="274" y1={y4} x2="500" y2={y4} stroke="#d5e4e5" strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1="274" y1={y1} x2="500" y2={y1} stroke="#d5e4e5" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x="268" y={y2 + 4} textAnchor="end" fontSize="12" fill="#799398">2C·2N</text>
        <text x="268" y={y4 + 4} textAnchor="end" fontSize="12" fill="#799398">4C·4N</text>
        <text x="268" y={y1 + 4} textAnchor="end" fontSize="12" fill="#799398">C·N</text>
        {/* DNA：间期复制，减Ⅰ末减半，减Ⅱ末再减半 */}
        <polyline
          points={`274,${y2} 310,${y2} 328,${y4} 386,${y4} 416,${y2} 452,${y2} 470,${y1} 500,${y1}`}
          fill="none" stroke={dnaColor} strokeWidth="3.5" strokeLinejoin="round"
        />
        {/* 染色体：减Ⅰ末减半；减Ⅱ后期短暂加倍（略）后仍为 N */}
        <polyline
          points={`274,${y2} 341,${y2} 376,${y2} 408,${y1} 500,${y1}`}
          fill="none" stroke={chrColor} strokeWidth="3.5" strokeLinejoin="round" strokeDasharray="8 4"
        />
        {rX.map((x, i) => (
          <text key={i} x={x} y={y2 + 66} textAnchor="middle" fontSize="12" fill="#4b6c73" fontWeight="600">{stageR[i]}</text>
        ))}
        <text x="356" y={y4 - 8} textAnchor="middle" fontSize="12" fill="#b0483a" fontWeight="600">间期复制 ×2</text>
        <text x="404" y={y2 - 8} textAnchor="middle" fontSize="12" fill="#3d6a94" fontWeight="600">减Ⅰ末减半</text>
        <text x="468" y={y1 - 8} textAnchor="middle" fontSize="12" fill="#3d6a94" fontWeight="600">再减半</text>
      </g>
      {/* 对比结论 */}
      <g style={dim(active, 1)}>
        <text x="16" y="292" fontSize="13.5" fill="#173b42" fontWeight="700">有丝分裂：DNA 复制 1 次、细胞分裂 1 次 → 子细胞染色体数目不变</text>
        <text x="16" y="314" fontSize="13.5" fill="#173b42" fontWeight="700">减数分裂：DNA 复制 1 次、细胞连续分裂 2 次 → 子细胞染色体数目减半</text>
      </g>
      <g style={dim(active, 2)}>
        <text x="16" y="342" fontSize="12.5" fill="#59767c" fontWeight="600">着丝粒分裂时染色体数目短暂加倍：有丝分裂后期、减Ⅱ后期——两条曲线的"凸起"处</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">有丝分裂与减数分裂中 DNA、染色体数目变化曲线</text>
    </svg>
  );
}

/* ================= 人体三道防线 ================= */

function ThreeDefenseLinesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">三道防线：前两道非特异（生来就有），第三道特异（后天获得）</text>
      {/* 病原体（左列） */}
      <g style={dim(active, 0)}>
        {[104, 194, 284].map((y, i) => (
          <g key={i} transform={`translate(52 ${y})`}>
            <ellipse rx="24" ry="14" fill="#a8c98a" stroke="#5f7a3a" strokeWidth="2.5" />
            {[0, 1, 2].map((j) => (
              <line key={j} x1="20" y1={-7 + j * 7} x2="34" y2={-9 + j * 8} stroke="#5f7a3a" strokeWidth="2.5" strokeLinecap="round" />
            ))}
          </g>
        ))}
        <text x="52" y="52" textAnchor="middle" fontSize="13" fill="#5f7a3a" fontWeight="700">病原体</text>
        <text x="52" y="68" textAnchor="middle" fontSize="12" fill="#799398">入侵 ↓</text>
      </g>
      {/* 第一行：第一道防线 */}
      <g style={dim(active, 1)}>
        <rect x="112" y="68" width="394" height="72" fill="#fdf6e3" stroke="#13333a" strokeWidth="2.5" />
        <rect x="112" y="68" width="16" height="72" fill="#f0c98a" stroke="#b58a3a" strokeWidth="2.5" />
        <text x="148" y="100" fontSize="13.5" fill="#8a671b" fontWeight="700">第一道防线：皮肤和黏膜</text>
        <text x="148" y="124" fontSize="12.5" fill="#a58a4a">阻挡病原体 · 分泌物杀菌 · 纤毛清扫异物</text>
        <rect x="428" y="80" width="70" height="24" rx="12" fill="#e7f2f1" stroke="#0e6f75" strokeWidth="2" />
        <text x="463" y="97" textAnchor="middle" fontSize="11.5" fill="#0a626a" fontWeight="700">非特异</text>
      </g>
      {/* 第二行：第二道防线 */}
      <g style={dim(active, 2)}>
        <rect x="112" y="150" width="394" height="72" fill="#f0faf9" stroke="#13333a" strokeWidth="2.5" />
        <rect x="112" y="150" width="16" height="72" fill="#dcebea" stroke="#4b8a7a" strokeWidth="2.5" />
        <circle cx="158" cy="186" r="20" fill="#d4e8d4" stroke="#4a8a3a" strokeWidth="2.5" />
        <circle cx="152" cy="182" r="5" fill="#4a8a3a" />
        <circle cx="164" cy="190" r="4" fill="#4a8a3a" />
        <text x="196" y="176" fontSize="13.5" fill="#2f7a4d" fontWeight="700">第二道防线：杀菌物质和吞噬细胞</text>
        <text x="196" y="200" fontSize="12.5" fill="#5a8a7a">溶菌酶溶解细菌 · 吞噬细胞吞噬消化病原体</text>
        <rect x="428" y="162" width="70" height="24" rx="12" fill="#e7f2f1" stroke="#0e6f75" strokeWidth="2" />
        <text x="463" y="179" textAnchor="middle" fontSize="11.5" fill="#0a626a" fontWeight="700">非特异</text>
      </g>
      {/* 第三行：第三道防线 */}
      <g style={dim(active, 3)}>
        <rect x="112" y="232" width="394" height="72" fill="#f3eef9" stroke="#13333a" strokeWidth="2.5" />
        <rect x="112" y="232" width="16" height="72" fill="#e8d4f2" stroke="#7a4a8a" strokeWidth="2.5" />
        <circle cx="158" cy="268" r="18" fill="#e8d4f2" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="158" y="273" textAnchor="middle" fontSize="12" fill="#6a3a7a" fontWeight="700">T</text>
        <circle cx="210" cy="268" r="18" fill="#d4e2f2" stroke="#3d6a94" strokeWidth="2.5" />
        <text x="210" y="273" textAnchor="middle" fontSize="12" fill="#1e4a68" fontWeight="700">B</text>
        {[258, 284].map((x, i) => (
          <g key={i} transform={`translate(${x} ${272})`}>
            <line x1="-7" y1="0" x2="7" y2="0" stroke="#0e6f75" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="0" y1="0" x2="0" y2="12" stroke="#0e6f75" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        ))}
        <text x="306" y="254" fontSize="13.5" fill="#6a3a7a" fontWeight="700">第三道防线</text>
        <text x="306" y="278" fontSize="12.5" fill="#8a6a94">免疫器官和免疫细胞（T、B、抗体）</text>
        <rect x="428" y="244" width="70" height="24" rx="12" fill="#e8d4f2" stroke="#7a4a8a" strokeWidth="2" />
        <text x="463" y="261" textAnchor="middle" fontSize="11.5" fill="#6a3a7a" fontWeight="700">特异</text>
      </g>
      {/* 底部结论 */}
      <g style={dim(active, 4)}>
        <rect x="16" y="318" width="490" height="36" rx="8" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="32" y="342" fontSize="13" fill="#8a671b" fontWeight="600">易错：吞噬细胞"一员多岗"——既在第二道防线直接吞噬，也在第三道防线呈递抗原</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">人体三道防线层级模式图</text>
    </svg>
  );
}

/* ================= 水盐平衡调节 ================= */

function WaterSaltBalanceSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">水盐平衡调节（神经—体液调节的典型例子）</text>
      <g style={dim(active, 0)}>
        <rect x="150" y="52" width="220" height="46" rx="10" fill="#fdf6e3" stroke="#b58a3a" strokeWidth="2.5" />
        <text x="260" y="72" textAnchor="middle" fontSize="13.5" fill="#8a671b" fontWeight="700">细胞外液渗透压升高</text>
        <text x="260" y="90" textAnchor="middle" fontSize="12" fill="#a58a4a">（吃得太咸 · 缺水 · 失水过多）</text>
      </g>
      <g style={dim(active, 1)}>
        <line x1="260" y1="98" x2="260" y2="122" stroke="#5a5a62" strokeWidth="3" markerEnd="url(#ws-arrow)" />
        <rect x="150" y="126" width="220" height="46" rx="10" fill="#e2d4f2" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="260" y="146" textAnchor="middle" fontSize="13.5" fill="#6a3a7a" fontWeight="700">下丘脑渗透压感受器</text>
        <text x="260" y="164" textAnchor="middle" fontSize="12" fill="#8a6a94">（水盐平衡调节中枢）</text>
      </g>
      <g style={dim(active, 2)}>
        <path d="M150 150 Q 90 150 88 178" fill="none" stroke="#3d7e9e" strokeWidth="3" markerEnd="url(#ws-arrow)" />
        <rect x="24" y="182" width="170" height="46" rx="10" fill="#dcebea" stroke="#3d7e9e" strokeWidth="2.5" />
        <text x="109" y="202" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">大脑皮层 → 产生渴觉</text>
        <text x="109" y="220" textAnchor="middle" fontSize="12" fill="#4a7a9a">主动饮水（补水）</text>
      </g>
      <g style={dim(active, 3)}>
        <path d="M370 150 Q 430 150 432 178" fill="none" stroke="#7a4a8a" strokeWidth="3" markerEnd="url(#ws-arrow)" />
        <rect x="330" y="182" width="170" height="46" rx="10" fill="#f0e3f7" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="415" y="202" textAnchor="middle" fontSize="13.5" fill="#6a3a7a" fontWeight="700">垂体释放抗利尿激素</text>
        <text x="415" y="220" textAnchor="middle" fontSize="12" fill="#8a6a94">（ADH ↑）</text>
        <line x1="415" y1="228" x2="415" y2="252" stroke="#7a4a8a" strokeWidth="3" markerEnd="url(#ws-arrow)" />
        <rect x="330" y="256" width="170" height="46" rx="10" fill="#dcebea" stroke="#3d7e9e" strokeWidth="2.5" />
        <text x="415" y="276" textAnchor="middle" fontSize="13.5" fill="#1e4a68" fontWeight="700">肾小管、集合管</text>
        <text x="415" y="294" textAnchor="middle" fontSize="12" fill="#4a7a9a">重吸收水分 ↑ → 尿量减少</text>
      </g>
      <g style={dim(active, 4)}>
        <rect x="24" y="252" width="264" height="66" rx="10" fill="#e7f3e2" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="40" y="276" fontSize="13.5" fill="#2f7a4d" fontWeight="700">结果：细胞外液渗透压下降</text>
        <text x="40" y="298" fontSize="12" fill="#4a8a4a">饮水 + 重吸收双管齐下，恢复水平衡</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">水盐平衡调节流程图</text>
      <defs>
        <marker id="ws-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
    </svg>
  );
}

/* ================= 病毒/原核/真核对比 ================= */

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

/* ================= 根瘤菌共生固氮 ================= */

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

/* ================= 细胞周期扇形图 ================= */

function CellCyclePieSvg({ active }: { active: number | null; open?: boolean }) {
  const cx = 170;
  const cy = 196;
  const r = 108;
  // 扇区：G1 100° / S 150° / G2 70° / 分裂期 40°，自正上方顺时针
  const segs = [
    { name: 'G₁', desc: '合成前期', a0: -90, a1: 10, color: '#8fb8d4' },
    { name: 'S 期', desc: 'DNA 复制', a0: 10, a1: 160, color: '#6aa86a' },
    { name: 'G₂', desc: '合成后期', a0: 160, a1: 230, color: '#e8c94a' },
    { name: 'M 分裂期', desc: '前中后末', a0: 230, a1: 270, color: '#e89090' },
  ];
  const pt = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
  const labels = [
    { text: '分裂间期（约 90%~95%）', color: '#2f7a4d' },
    { text: '分裂期（约 5%~10%）', color: '#b0483a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">细胞周期扇形图（连续分裂的细胞：一次分裂完成 → 下一次分裂完成）</text>
      {segs.map((s, i) => {
        const [x0, y0] = pt(s.a0);
        const [x1, y1] = pt(s.a1);
        const large = s.a1 - s.a0 > 180 ? 1 : 0;
        return (
          <path
            key={s.name}
            d={`M${cx} ${cy} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`}
            fill={s.color}
            stroke="#13333a"
            strokeWidth="2"
            style={dim(active, i)}
          />
        );
      })}
      {/* 各扇区标注 */}
      <g style={dim(active, 0)}>
        <text x="238" y="120" fontSize="13" fill="#1e4a68" fontWeight="700">G₁</text>
      </g>
      <g style={dim(active, 1)}>
        <text x="196" y="276" fontSize="13" fill="#2f5a2f" fontWeight="700">S 期（DNA 复制）</text>
      </g>
      <g style={dim(active, 2)}>
        <text x="66" y="130" fontSize="13" fill="#8a671b" fontWeight="700">G₂</text>
      </g>
      <g style={dim(active, 3)}>
        <text x="52" y="112" fontSize="12.5" fill="#b0483a" fontWeight="700">分裂期</text>
      </g>
      {/* 右侧说明 */}
      <g style={dim(active, 1)}>
        <rect x="330" y="82" width="176" height="150" rx="10" fill="#f2fafa" stroke="#cfe0e0" strokeWidth="2" />
        <text x="346" y="108" fontSize="13" fill="#173b42" fontWeight="700">分裂间期（为分裂准备）</text>
        <text x="346" y="132" fontSize="12" fill="#46666d">G₁：合成蛋白质</text>
        <text x="346" y="154" fontSize="12" fill="#46666d">S：DNA 复制（2C→4C）</text>
        <text x="346" y="176" fontSize="12" fill="#46666d">G₂：再合成蛋白质</text>
        <text x="346" y="206" fontSize="12" fill="#799398">间期约占细胞周期的</text>
        <text x="346" y="224" fontSize="13" fill="#b0483a" fontWeight="700">90%~95%！</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="330" y="244" width="176" height="56" rx="10" fill="#fdf0ee" stroke="#e0a3a3" strokeWidth="2" />
        <text x="346" y="268" fontSize="13" fill="#9b3a30" fontWeight="700">分裂期（M 期）</text>
        <text x="346" y="290" fontSize="12" fill="#a86a5a">前 → 中 → 后 → 末</text>
      </g>
      {/* 底部要点 */}
      <g style={dim(active, 4)}>
        <rect x="26" y="318" width="468" height="44" rx="9" fill="#fdf6e3" stroke="#d9c9a8" strokeWidth="2" />
        <text x="42" y="336" fontSize="12.5" fill="#7a5a20" fontWeight="700">易错：只有"连续分裂"的细胞才有细胞周期；高度分化的细胞（如神经细胞）没有</text>
        <text x="42" y="354" fontSize="12" fill="#a58a4a">观察有丝分裂应选分生区细胞——大多数细胞处于间期</text>
      </g>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">细胞周期扇形图</text>
    </svg>
  );
}

/* ================= 桑基鱼塘物质循环（课外拓展） ================= */

function SangjiPondCycleSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">桑基鱼塘：物质循环利用 · 能量多级利用（我国传统生态农业智慧）</text>
      <g style={dim(active, 0)}>
        <rect x="30" y="222" width="130" height="26" fill="#c9b08a" />
        <line x1="94" y1="222" x2="94" y2="132" stroke="#8a6a48" strokeWidth="7" strokeLinecap="round" />
        {[68, 94, 120].map((cx, i) => (
          <circle key={i} cx={cx} cy={114 - (i === 1 ? 8 : 0)} r={20 - Math.abs(i - 1) * 3} fill="#6aa86a" stroke="#3f7f3a" strokeWidth="2.5" />
        ))}
        <text x="94" y="264" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="700">桑树（生产者）</text>
      </g>
      <g style={dim(active, 1)}>
        <path d="M212 96 q 9 -7 18 0 q 9 7 18 0 q 9 -7 18 0" fill="none" stroke="#f4f0e0" strokeWidth="11" strokeLinecap="round" />
        <path d="M212 96 q 9 -7 18 0 q 9 7 18 0 q 9 -7 18 0" fill="none" stroke="#c9c9a0" strokeWidth="4" strokeLinecap="round" strokeDasharray="5 5" />
        <text x="230" y="70" textAnchor="middle" fontSize="13" fill="#7a8a20" fontWeight="700">蚕（蚕沙 = 粪便）</text>
      </g>
      <g style={dim(active, 2)}>
        <rect x="330" y="120" width="150" height="110" rx="14" fill="#cfe4f0" stroke="#3d7e9e" strokeWidth="3.5" />
        {[[372, 158], [412, 186]].map(([x, y], i) => (
          <path key={i} d={`M${x - 14} ${y} q 14 -10 28 0 q -14 10 -28 0 Z`} fill="#5a9abf" stroke="#2c5a7a" strokeWidth="2" />
        ))}
        <rect x="336" y="206" width="138" height="18" fill="#8a6a48" />
        <text x="405" y="252" textAnchor="middle" fontSize="13" fill="#1e4a68" fontWeight="700">鱼塘（鱼类 · 塘泥）</text>
      </g>
      <g style={dim(active, 1)}>
        <path d="M116 120 Q 160 92 198 92" fill="none" stroke="#3f7f3a" strokeWidth="4" markerEnd="url(#sj-arrow)" />
        <text x="150" y="88" fontSize="12.5" fill="#3f7f3a" fontWeight="700">桑叶喂蚕</text>
      </g>
      <g style={dim(active, 2)}>
        <path d="M252 104 Q 296 112 328 136" fill="none" stroke="#7a8a20" strokeWidth="4" markerEnd="url(#sj-arrow)" />
        <text x="298" y="104" fontSize="12.5" fill="#7a8a20" fontWeight="700">蚕沙入塘喂鱼</text>
      </g>
      <g style={dim(active, 3)}>
        <path d="M408 224 Q 408 250 396 262" fill="none" stroke="#8a671b" strokeWidth="3.5" markerEnd="url(#sj-arrow)" />
        <text x="416" y="248" fontSize="12" fill="#8a671b" fontWeight="600">鱼粪沉底</text>
      </g>
      <g style={dim(active, 0)}>
        <path d="M330 268 Q 200 300 100 236" fill="none" stroke="#b58a3a" strokeWidth="4" strokeDasharray="8 5" markerEnd="url(#sj-arrow)" />
        <text x="190" y="292" fontSize="12.5" fill="#b58a3a" fontWeight="700">塘泥挖出 → 施肥还桑（物质回到生产者）</text>
      </g>
      <g style={dim(active, 4)}>
        <rect x="26" y="316" width="468" height="44" rx="9" fill="#e7f3e2" stroke="#3f7f3a" strokeWidth="2.5" />
        <text x="42" y="334" fontSize="12.5" fill="#2f7a4d" fontWeight="700">"废物"变资源：蚕沙喂鱼、塘泥肥桑——物质循环利用，能量多级利用</text>
        <text x="42" y="352" fontSize="12" fill="#4a8a4a">注意：循环的是物质；能量仍单向流动、逐级递减，需太阳能不断补充</text>
      </g>
      <defs>
        <marker id="sj-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#5a5a62" />
        </marker>
      </defs>
    </svg>
  );
}

/* ================= 被子植物的一生（课外拓展） ================= */

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

/* ================= 银杏 ================= */

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

/* ================= 仙人掌 ================= */

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

/* ================= 青霉菌 ================= */

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

/* ================= 海带 ================= */

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

/* ================= 蝙蝠 ================= */

function BatSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">蝙蝠：唯一真正会飞的哺乳动物——回声定位的"活体声呐"</text>
      <g style={dim(active, 0)}>
        <ellipse cx="240" cy="180" rx="52" ry="40" fill="#8a7a9a" stroke="#4a3a5a" strokeWidth="3.5" />
        <circle cx="296" cy="156" r="24" fill="#8a7a9a" stroke="#4a3a5a" strokeWidth="3" />
        <path d="M280 138 Q 288 118 298 132 M 306 134 Q 316 116 322 132" fill="none" stroke="#4a3a5a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="288" cy="150" r="4" fill="#f4d06a" />
        <circle cx="308" cy="150" r="4" fill="#f4d06a" />
        <path d="M264 152 Q 200 130 110 96 Q 60 120 44 176 Q 140 180 264 196 Z" fill="#6a5a80" stroke="#3a2a50" strokeWidth="3" />
        {[110, 150, 190, 226].map((x, i) => (
          <line key={i} x1="262" y1="152" x2={x} y2={96 + i * 24} stroke="#3a2a50" strokeWidth="2.5" opacity="0.7" />
        ))}
        <text x="52" y="80" fontSize="13.5" fill="#3a2a50" fontWeight="700">翼膜：前肢指骨撑起的皮膜</text>
        <text x="52" y="100" fontSize="12" fill="#5a4a70">"手指"特长是飞行关键</text>
        <path d="M216 214 L 206 250" fill="none" stroke="#4a3a5a" strokeWidth="4" strokeLinecap="round" />
        <path d="M258 212 L 268 248" fill="none" stroke="#4a3a5a" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g style={dim(active, 1)}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M322 148 Q ${360 + i * 26} ${148} ${400 + i * 26} ${120 + i * 6}`} fill="none" stroke="#3d7e9e" strokeWidth={3 - i * 0.6} strokeDasharray={i === 0 ? undefined : '7 6'} strokeLinecap="round" />
        ))}
        <text x="380" y="96" fontSize="13.5" fill="#2c6e94" fontWeight="700">回声定位（超声波）</text>
        <text x="380" y="116" fontSize="12" fill="#4a7a9a">夜间捕食昆虫、避开障碍</text>
      </g>
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
      <rect x="20" y="180" width="480" height="120" fill="#cfe4f0" opacity="0.6" rx="10" />
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="210" rx="120" ry="56" fill="#8a7a5a" stroke="#5a4a2a" strokeWidth="3.5" />
        <path d="M132 200 Q 92 196 76 210 Q 92 224 132 222 Q 122 210 132 200 Z" fill="#5a6a7a" stroke="#3a4a5a" strokeWidth="2.5" />
        <text x="52" y="176" fontSize="13" fill="#3a4a5a" fontWeight="700">鸭形喙（电感应）</text>
        <path d="M366 202 Q 430 196 464 216 Q 436 240 372 228 Q 358 214 366 202 Z" fill="#6a5a3a" stroke="#4a3a1a" strokeWidth="2.5" />
        <text x="428" y="188" fontSize="13" fill="#4a3a1a" fontWeight="700">河狸式宽尾</text>
      </g>
      <g style={dim(active, 1)}>
        <ellipse cx="330" cy="312" rx="26" ry="18" fill="#f4ead0" stroke="#b5953a" strokeWidth="2.5" />
        <text x="330" y="344" textAnchor="middle" fontSize="13" fill="#8a671b" fontWeight="700">产卵（卵生）！</text>
      </g>
      <g style={dim(active, 2)}>
        <circle cx="150" cy="312" r="7" fill="#d4b8e8" stroke="#7a4a8a" strokeWidth="2" />
        <circle cx="174" cy="312" r="7" fill="#d4b8e8" stroke="#7a4a8a" strokeWidth="2" />
        <text x="24" y="348" fontSize="13" fill="#6a3a7a" fontWeight="700">腹沟乳汁哺育幼崽（无乳头）</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="230" y="356" width="270" height="0" fill="none" />
      </g>
      <g style={dim(active, 2)}>
              </g>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">鸭嘴兽（哺乳动物活化石）模式图（课外拓展）</text>
    </svg>
  );
}

/* ================= 心脏与血液循环 ================= */

function HeartCirculationSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">心脏四腔：上房下室，血液定向流动（瓣膜防倒流）</text>
      {/* 左右肺 */}
      <g style={dim(active, 3)}>
        <ellipse cx="70" cy="96" rx="34" ry="46" fill="#f6b8b0" stroke="#b0483a" strokeWidth="3" />
        <ellipse cx="450" cy="96" rx="34" ry="46" fill="#f6b8b0" stroke="#b0483a" strokeWidth="3" />
        <text x="70" y="164" textAnchor="middle" fontSize="12.5" fill="#b0483a" fontWeight="600">肺（气体交换）</text>
        {/* 肺循环箭头 */}
        <path d="M104 96 Q 130 80 148 92" fill="none" stroke="#3d7e9e" strokeWidth="3.5" markerEnd="url(#hc-arrow)" />
        <path d="M416 100 Q 384 74 356 88" fill="none" stroke="#b0483a" strokeWidth="3.5" markerEnd="url(#hc-arrow)" />
        <text x="112" y="72" fontSize="12" fill="#3d7e9e" fontWeight="600">肺动脉（静脉血）</text>
        <text x="330" y="60" fontSize="12" fill="#b0483a" fontWeight="600">肺静脉（动脉血）</text>
      </g>
      {/* 心脏四腔 */}
      <g style={dim(active, 1)}>
        <path d="M200 92 L 200 250 Q 200 268 218 268 L 302 268 Q 320 268 320 250 L 320 92 Z" fill="#f6c8c0" stroke="#b0483a" strokeWidth="3.5" />
        <line x1="260" y1="92" x2="260" y2="268" stroke="#b0483a" strokeWidth="3" />
        <line x1="200" y1="184" x2="320" y2="184" stroke="#b0483a" strokeWidth="3" />
        <text x="230" y="120" textAnchor="middle" fontSize="13" fill="#7a2622" fontWeight="700">右心房</text>
        <text x="290" y="120" textAnchor="middle" fontSize="13" fill="#5a2a7a" fontWeight="700">左心房</text>
        <text x="230" y="240" textAnchor="middle" fontSize="13" fill="#7a2622" fontWeight="700">右心室</text>
        <text x="290" y="240" textAnchor="middle" fontSize="13" fill="#5a2a7a" fontWeight="700">左心室</text>
        <text x="230" y="290" textAnchor="middle" fontSize="12" fill="#8a6a6a">壁最厚（泵血到全身）</text>
      </g>
      {/* 瓣膜 */}
      <g style={dim(active, 2)}>
        <path d="M204 184 L 222 202 L 240 184" fill="none" stroke="#c98a1d" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M280 184 L 298 202 L 316 184" fill="none" stroke="#c98a1d" strokeWidth="3.5" strokeLinecap="round" />
        <text x="336" y="200" fontSize="12.5" fill="#c98a1d" fontWeight="700">房室瓣</text>
        <text x="336" y="218" fontSize="12" fill="#a58a4a">防血液倒流</text>
      </g>
      {/* 体循环箭头 */}
      <g style={dim(active, 4)}>
        <path d="M226 268 Q 210 322 130 330" fill="none" stroke="#b0483a" strokeWidth="3.5" markerEnd="url(#hc-arrow)" />
        <text x="24" y="322" fontSize="12.5" fill="#b0483a" fontWeight="700">体循环：左心室 → 全身 → 右心房</text>
        <path d="M280 92 Q 300 56 340 60" fill="none" stroke="#b0483a" strokeWidth="0" />
      </g>
      {/* 口诀 */}
      <g style={dim(active, 4)}>
        <text x="16" y="352" fontSize="12.5" fill="#59767c" fontWeight="600">口诀：上房下室 · 房连静、室连动 · 血液流动方向：静脉 → 心房 → 心室 → 动脉</text>
      </g>
      <defs>
        <marker id="hc-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#8a671b" />
        </marker>
      </defs>
    </svg>
  );
}

/* ================= 肾单位与尿液形成 ================= */

function NephronSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">尿液形成两步：肾小球过滤 → 肾小管重吸收</text>
      {/* 肾小球（左上圆） */}
      <g style={dim(active, 0)}>
        <circle cx="120" cy="130" r="62" fill="#dcebea" stroke="#3d7e9e" strokeWidth="3" />
        <circle cx="120" cy="130" r="28" fill="#b0483a" opacity="0.75" />
        <text x="120" y="58" textAnchor="middle" fontSize="13" fill="#7a2622" fontWeight="700">肾小球（毛细血管球）</text>
        <text x="120" y="222" textAnchor="middle" fontSize="12" fill="#a05a4a" fontWeight="600">过滤：血细胞和大分子蛋白</text>
        <text x="120" y="240" textAnchor="middle" fontSize="12" fill="#a05a4a" fontWeight="600">留在血管内，其余滤出</text>
      </g>
      {/* 肾小管（右侧弯曲管） */}
      <g style={dim(active, 1)}>
        <path d="M182 130 Q 280 110 330 150 Q 380 190 320 230 Q 260 270 320 300" fill="none" stroke="#e8a86a" strokeWidth="12" strokeLinecap="round" />
        <text x="400" y="148" fontSize="13" fill="#b57c3a" fontWeight="700">肾小管</text>
        <text x="356" y="170" fontSize="12" fill="#b57c3a" fontWeight="600">重吸收：葡萄糖</text>
        <text x="356" y="190" fontSize="12" fill="#b57c3a" fontWeight="600">全部 + 大部分水</text>
        <text x="356" y="210" fontSize="12" fill="#b57c3a" fontWeight="600">和部分无机盐</text>
      </g>
      {/* 收集管与尿液 */}
      <g style={dim(active, 2)}>
        <rect x="360" y="266" width="56" height="72" rx="10" fill="#dcebea" stroke="#3d7e9e" strokeWidth="3" />
        <text x="388" y="290" textAnchor="middle" fontSize="12.5" fill="#1e4a68" fontWeight="700">收集管</text>
        <text x="388" y="308" textAnchor="middle" fontSize="12" fill="#4a7a9a">→ 膀胱</text>
        <ellipse cx="300" cy="322" rx="26" ry="30" fill="#f4e3b8" stroke="#c98a1d" strokeWidth="3" />
        <text x="300" y="318" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">尿液</text>
        <text x="300" y="334" textAnchor="middle" fontSize="11" fill="#a58a4a">水·无机盐·尿素</text>
      </g>
      {/* 底部要点 */}
      <g style={dim(active, 3)}>
        <rect x="26" y="336" width="240" height="36" rx="9" fill="#e7f3e2" stroke="#3f7f3a" strokeWidth="2" />
        <text x="40" y="352" fontSize="12" fill="#2f7a4d" fontWeight="600">健康人每天原尿 150L → 尿液 1.5L</text>
      </g>
      <g style={dim(active, 1)}>
        <rect x="278" y="336" width="216" height="36" rx="9" fill="#fdf0ee" stroke="#e0a3a3" strokeWidth="2" />
        <text x="292" y="352" fontSize="12" fill="#b0483a" fontWeight="600">尿糖/蛋白尿 → 重吸收或过滤异常</text>
      </g>
      <text x="508" y="46" textAnchor="end" fontSize="12.5" fill="#799398">肾单位与尿液形成模式图</text>
    </svg>
  );
}

/* ================= 关节与运动 ================= */

function JointSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">关节 = 骨与骨之间的可动连接——运动的"支点"</text>
      {/* 骨（上下两段） */}
      <g style={dim(active, 0)}>
        <path d="M200 60 L 252 60 L 252 132 Q 226 148 200 132 Z" fill="#f6f0e0" stroke="#b5953a" strokeWidth="3" />
        <path d="M200 248 L 252 248 L 252 176 Q 226 160 200 176 Z" fill="#f6f0e0" stroke="#b5953a" strokeWidth="3" />
        <text x="256" y="104" fontSize="12.5" fill="#8a6a48" fontWeight="600">骨</text>
        <text x="256" y="228" fontSize="12.5" fill="#8a6a48" fontWeight="600">骨</text>
      </g>
      {/* 关节面/软骨 */}
      <g style={dim(active, 1)}>
        <path d="M204 134 Q 226 150 248 134" fill="none" stroke="#6aa86a" strokeWidth="6" strokeLinecap="round" />
        <path d="M204 174 Q 226 158 248 174" fill="none" stroke="#6aa86a" strokeWidth="6" strokeLinecap="round" />
        <text x="330" y="148" fontSize="12.5" fill="#3f7f3a" fontWeight="700">关节软骨（减少摩擦缓冲震动）</text>
        <line x1="326" y1="150" x2="250" y2="152" stroke="#3f7f3a" strokeWidth="1.4" />
      </g>
      {/* 关节腔 */}
      <g style={dim(active, 2)}>
        <ellipse cx="226" cy="154" rx="26" ry="14" fill="#dff0f7" stroke="#3d7e9e" strokeWidth="2" />
        <text x="330" y="110" fontSize="12.5" fill="#2c6e94" fontWeight="700">关节腔（含滑液润滑）</text>
        <line x1="326" y1="112" x2="252" y2="148" stroke="#2c6e94" strokeWidth="1.4" />
      </g>
      {/* 关节囊 */}
      <g style={dim(active, 3)}>
        <path d="M188 64 Q 176 154 188 244" fill="none" stroke="#b0483a" strokeWidth="5" strokeLinecap="round" />
        <path d="M264 64 Q 276 154 264 244" fill="none" stroke="#b0483a" strokeWidth="5" strokeLinecap="round" />
        <text x="24" y="72" fontSize="12.5" fill="#b0483a" fontWeight="700">关节囊（包绕稳固）</text>
      </g>
      {/* 骨骼肌协作 */}
      <g style={dim(active, 4)}>
        <path d="M110 100 Q 140 118 174 130" fill="none" stroke="#b0483a" strokeWidth="12" strokeLinecap="round" />
        <path d="M110 210 Q 140 196 174 178" fill="none" stroke="#b0483a" strokeWidth="12" strokeLinecap="round" />
        <text x="24" y="88" fontSize="12.5" fill="#b0483a" fontWeight="700">肱二头肌（收缩）</text>
        <text x="24" y="230" fontSize="12.5" fill="#b0483a" fontWeight="700">肱三头肌（舒张）</text>
        <text x="16" y="290" fontSize="12.5" fill="#59767c" fontWeight="600">屈肘：二头肌收缩、三头肌舒张；伸肘相反——肌肉只能牵拉不能推开</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">关节与运动（以肘关节为例）模式图</text>
    </svg>
  );
}

/* ================= 眼球与视觉 ================= */

function EyeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="30" fontSize="13" fill="#2c6e94" fontWeight="700">视觉形成：光线 → 角膜 → 瞳孔 → 晶状体 → 视网膜成像 → 视神经 → 大脑</text>
      {/* 眼球轮廓 */}
      <g style={dim(active, 0)}>
        <circle cx="240" cy="190" r="130" fill="#eaf1f9" stroke="#3d6a94" strokeWidth="4" />
      </g>
      {/* 角膜与瞳孔 */}
      <g style={dim(active, 1)}>
        <path d="M370 150 Q 392 190 370 230" fill="none" stroke="#5ab8d4" strokeWidth="7" strokeLinecap="round" />
        <circle cx="352" cy="190" r="17" fill="#13333a" />
        <text x="404" y="120" fontSize="13" fill="#2c6e94" fontWeight="700">角膜（透明）</text>
        <text x="404" y="262" fontSize="13" fill="#2c6e94" fontWeight="700">瞳孔（大小可变）</text>
        <line x1="400" y1="124" x2="374" y2="148" stroke="#2c6e94" strokeWidth="1.4" />
        <line x1="400" y1="258" x2="368" y2="200" stroke="#2c6e94" strokeWidth="1.4" />
      </g>
      {/* 晶状体 */}
      <g style={dim(active, 2)}>
        <ellipse cx="322" cy="190" rx="26" ry="34" fill="#dcebea" stroke="#3d7e9e" strokeWidth="3" />
        <text x="252" y="128" fontSize="13" fill="#1e4a68" fontWeight="700">晶状体（曲度可调 = 对焦）</text>
        <line x1="286" y1="134" x2="306" y2="164" stroke="#1e4a68" strokeWidth="1.4" />
      </g>
      {/* 视网膜 */}
      <g style={dim(active, 3)}>
        <path d="M368 82 Q 288 66 196 84" fill="none" stroke="#b0483a" strokeWidth="6" strokeLinecap="round" />
        <path d="M368 298 Q 288 314 196 296" fill="none" stroke="#b0483a" strokeWidth="6" strokeLinecap="round" />
        <path d="M122 100 Q 110 190 126 280" fill="none" stroke="#b0483a" strokeWidth="6" strokeLinecap="round" />
        <text x="128" y="292" fontSize="13" fill="#b0483a" fontWeight="700">视网膜（成像 + 感光细胞）</text>
      </g>
      {/* 视神经 */}
      <g style={dim(active, 4)}>
        <circle cx="240" cy="190" r="10" fill="#f4d06a" stroke="#c98a1d" strokeWidth="2" />
        <line x1="240" y1="190" x2="128" y2="196" stroke="#c98a1d" strokeWidth="3" />
        <line x1="128" y1="196" x2="60" y2="290" stroke="#c98a1d" strokeWidth="6" strokeLinecap="round" />
        <text x="20" y="316" fontSize="12.5" fill="#c98a1d" fontWeight="700">视神经 → 大脑皮层视觉中枢</text>
      </g>
      {/* 成像说明 */}
      <g style={dim(active, 3)}>
        <text x="150" y="222" textAnchor="middle" fontSize="12" fill="#59767c" fontWeight="600">倒立的缩小的实像</text>
      </g>
      <g style={dim(active, 4)}>
        <text x="16" y="352" fontSize="12.5" fill="#59767c" fontWeight="600">易错：成像在"视网膜"，但"看见"发生在大脑皮层；近视 = 晶状体曲度过大 → 配凹透镜</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">眼球与视觉形成模式图</text>
    </svg>
  );
}

/* ================= 数据汇总 ================= */
/* ================= 数据汇总 ================= */
/* ================= 数据汇总 ================= */
/* ================= 数据汇总 ================= */
/* ================= 数据汇总 ================= */

/** 偏"实验操作/过程"的标本：不在图鉴页显示，改为在互动实验页作为相关图解出现。 */
export const LAB_ONLY_SPECIMEN_IDS: string[] = [
  'mitosisStages',
  'meiosisStages',
  'fertilization',
  'artificialPollination',
  'aerobicRespiration',
  'osmosisSetup',
  'nervePotential',
  'divisionCurve',
  'cellCyclePie',
  'sangjiPondCycle',
  'carbonCycle',
  'photosynthesisProcess',
  'centralDogma',
  'waterSaltBalance',
  'pcrStages',
  'tissueCultureStages',
  'humoralImmunity',
  'bloodSugarSources',
];

/** 图鉴目录：按主题分类，供图鉴页筛选导航（56 个标本全覆盖） */
export const ATLAS_CATEGORIES: { name: string; icon: string; ids: string[] }[] = [
  { name: '细胞与膜', icon: '🧫', ids: ['animal', 'plant', 'nucleus', 'membraneModel', 'biofilmSystem', 'membraneTransport'] },
  { name: '细胞器', icon: '🔋', ids: ['chloroplast', 'mitochondrion', 'endoplasmicReticulum', 'golgi', 'ribosome', 'lysosome', 'centrosome', 'vacuole', 'endosymbiosis'] },
  { name: '分子与遗传', icon: '🧬', ids: ['dnaHelix', 'rnaStrand', 'nucleotide', 'chromosome', 'karyotype', 'cellTheory', 'homologousOrgans', 'geneticCode', 'embryoCompare', 'colorBlindness'] },
  { name: '代谢与酶', icon: '⚗️', ids: ['atpMolecule', 'enzymeModel', 'secretoryProtein', 'photosyntheticPigments', 'cytoskeleton'] },
  { name: '细胞命运', icon: '⏳', ids: ['cellFates', 'cellDifferentiation', 'cancerCell', 'stemCells', 'apoptosisVsNecrosis', 'telomere'] },
  { name: '微生物', icon: '🦠', ids: ['cyanobacteria', 'ecoli', 'nitrobacteria', 'lactobacillus', 'mycoplasma', 'yeast', 'paramecium', 'spirogyra', 'amoeba', 'euglena', 'cellTypeCompare', 'rhizobium', 'penicillium', 'kelp', 'mushroom', 'chlamydomonas', 'bacteriaShapes', 'lichen', 'foodPreservation', 'gramStain', 'microbiome', 'antibiotic', 'mycorrhiza', 'biogas', 'cordyceps', 'slimeMold'] },
  { name: '病毒', icon: '🧫', ids: ['hiv', 'fluVirus', 'phage', 'tmv'] },
  { name: '动物世界', icon: '🐾', ids: ['earthworm', 'locust', 'fish', 'frogMetamorphosis', 'pigeon', 'mussel', 'hydra', 'birdEgg', 'shrimp', 'lizard', 'starfish', 'sponge', 'rumen', 'whale', 'vertebrateClasses', 'silkwormLife', 'adaptations', 'ascarid', 'giantPanda', 'jellyfish', 'crab', 'turtle', 'snail', 'tapeworm', 'coral', 'spider', 'dragonfly', 'mantis', 'octopus', 'beeHive', 'crocodile', 'penguin', 'flounder', 'tardigrade', 'firefly', 'seahorse', 'centipede', 'termite', 'dungBeetle', 'mantisShrimp', 'hermitCrab', 'cuckoo', 'chameleon', 'leech', 'anglerfish', 'hummingbird', 'cicada', 'pangolin', 'honeyBadger', 'sloth', 'shark'] },
  { name: '人体与调节', icon: '🩺', ids: ['redBloodCell', 'neuron', 'synapse', 'antibody', 'homeostasisNetwork', 'internalEnvironment', 'thermoregulation', 'monoclonalAntibody', 'threeDefenseLines', 'bat', 'platypus', 'heartCirculation', 'nephron', 'joint', 'eye', 'vessels', 'skinStructure', 'bloodCells', 'alveolus', 'brainStructure', 'boneStructure', 'immuneOrgans', 'endocrineGlands', 'muscleTissues', 'vitamins', 'invasiveSpecies', 'safeMedication', 'heartCompare', 'digestiveSystem', 'respiratorySystem', 'smallIntestineVillus', 'neuronTypes', 'bloodClotting', 'earStructure', 'spleen', 'pancreaticIslet', 'liver', 'stomach', 'cerebralCortex', 'spinalCord', 'larynx', 'nasalCavity', 'vaccineTypes', 'tonsil', 'tooth', 'largeIntestine', 'boneMarrow', 'adrenal', 'lymphNode', 'pituitary', 'retinaMacula', 'sarcomere', 'bloodTransfusion', 'fetusPlacenta', 'woundHealing', 'fever', 'tasteBuds', 'tears', 'thymus', 'cochleaHair', 'fingerprint', 'mammaryGland', 'urinaryBladder', 'melanin', 'saliva', 'wisdomTooth'] },
  { name: '植物与繁殖', icon: '🌾', ids: ['stoma', 'flowerStructure', 'cornReproduction', 'fruitAndSeed', 'mossFern', 'angiospermLife', 'ginkgo', 'cactus', 'rootTip', 'leafCrossSection', 'leafBud', 'sieveTube', 'stemStructure', 'pineCone', 'rootTypes', 'plantTissues', 'seedlessFruit', 'seedCompare', 'organVariants', 'fruitTypes', 'plantHormones', 'pitcherPlant', 'seedDispersal', 'treeRings', 'seedDormancy', 'mimosa', 'dodder', 'caffeine', 'camPlant', 'baobab', 'bamboo', 'pollinationTypes', 'ethylene', 'banyanRoots', 'sunflower', 'tulipBulb', 'airPlant', 'c4Plant', 'rubberTree'] },
  { name: '生态', icon: '🌱', ids: ['energyPyramid', 'foodWeb', 'ageStructure', 'communityStructure', 'bioaccumulation', 'ecosystemComponents', 'evolutionTree', 'taxonomyLevel', 'biosphere', 'speciesRelations', 'ecosystemTypes', 'biodiversity', 'verticalLayers', 'photoperiodism', 'fiveKingdoms', 'livingFossil', 'greenhouseEffect', 'mangrove', 'ecosystemServices'] },
];

/** 图鉴大分组（粗分类入口）：点大磁贴进入后再用 ATLAS_CATEGORIES 细分浏览 */
export const ATLAS_GROUPS: { name: string; icon: string; desc: string; categories: string[] }[] = [
  {
    name: '细胞结构与代谢',
    icon: '🧫',
    desc: '细胞、膜、细胞器与酶的运作',
    categories: ['细胞与膜', '细胞器', '代谢与酶', '细胞命运'],
  },
  {
    name: '遗传与分子',
    icon: '🧬',
    desc: 'DNA、RNA、染色体与中心法则',
    categories: ['分子与遗传'],
  },
  {
    name: '微生物与病毒',
    icon: '🦠',
    desc: '细菌、真菌、原生生物与病毒',
    categories: ['微生物', '病毒'],
  },
  {
    name: '动物世界',
    icon: '🐾',
    desc: '环节、节肢、鱼类、两栖与鸟类',
    categories: ['动物世界'],
  },
  {
    name: '人体与调节',
    icon: '🩺',
    desc: '神经、免疫与内环境稳态',
    categories: ['人体与调节'],
  },
  {
    name: '植物与生态',
    icon: '🌿',
    desc: '植物繁殖、群落与生态系统',
    categories: ['植物与繁殖', '生态'],
  },
];

/* ================= 河蚌（软体动物） ================= */

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

/* ================= 蘑菇（多细胞真菌） ================= */

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

/* ================= 根尖结构 ================= */

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


/* ================= 血管三种类型对比 ================= */

function VesselsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 动脉（左列） */}
      <g style={dim(active, 0)}>
        <path d="M60 92 Q 118 76 176 92 L176 132 Q 118 116 60 132 Z" fill="#d86452" stroke="#a53a2c" strokeWidth="2.5" />
        <path d="M60 132 Q 118 116 176 132 L176 158 Q 118 144 60 158 Z" fill="#e88a78" stroke="#a53a2c" strokeWidth="2.5" />
        <path d="M76 112 Q 118 98 160 112" fill="none" stroke="#f2b0a0" strokeWidth="4" strokeLinecap="round" />
        <text x="118" y="76" textAnchor="middle" fontSize="13.5" fill="#a53a2c" fontWeight="700">动脉</text>
        <text x="118" y="186" textAnchor="middle" fontSize="12.5" fill="#7a4a42">管壁厚、弹性大</text>
        <text x="118" y="206" textAnchor="middle" fontSize="12.5" fill="#7a4a42">血流速度快</text>
        <text x="118" y="226" textAnchor="middle" fontSize="12.5" fill="#7a4a42">把血送离心脏</text>
      </g>
      {/* 静脉（中列） */}
      <g style={dim(active, 1)}>
        <path d="M232 92 Q 290 78 348 92 L348 128 Q 290 114 232 128 Z" fill="#7a8ac9" stroke="#4a5a94" strokeWidth="2.5" />
        <path d="M232 128 Q 290 114 348 128 L348 154 Q 290 140 232 154 Z" fill="#9aa8d8" stroke="#4a5a94" strokeWidth="2.5" />
        {/* 瓣膜 */}
        <path d="M276 128 Q 286 142 296 130 M288 130 Q 298 144 308 132" fill="none" stroke="#4a5a94" strokeWidth="2.4" />
        <text x="290" y="76" textAnchor="middle" fontSize="13.5" fill="#4a5a94" fontWeight="700">静脉</text>
        <text x="290" y="186" textAnchor="middle" fontSize="12.5" fill="#4a5a6e">管壁薄、弹性小</text>
        <text x="290" y="206" textAnchor="middle" fontSize="12.5" fill="#4a5a6e">有瓣膜防血液倒流</text>
        <text x="290" y="226" textAnchor="middle" fontSize="12.5" fill="#4a5a6e">把血送回心脏</text>
      </g>
      {/* 毛细血管（右列） */}
      <g style={dim(active, 2)}>
        <path d="M404 96 Q 452 88 496 96" fill="none" stroke="#c94a5a" strokeWidth="7" strokeLinecap="round" />
        {/* 单行红细胞 */}
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={424 + i * 26} cy={96 - i * 1.5} rx="5.5" ry="3" fill="#e86a5a" stroke="#a53a2c" strokeWidth="1.2" transform={`rotate(${-8 + i * 6} ${424 + i * 26} ${96 - i * 1.5})`} />
        ))}
        {/* 管壁单层细胞示意 */}
        <path d="M404 92 Q 452 84 496 92" fill="none" stroke="#7a9aa8" strokeWidth="2.2" />
        <text x="450" y="72" textAnchor="middle" fontSize="13.5" fill="#8a4a56" fontWeight="700">毛细血管</text>
        <text x="450" y="132" textAnchor="middle" fontSize="12.5" fill="#6a5a62">管壁仅一层上皮细胞</text>
        <text x="450" y="152" textAnchor="middle" fontSize="12.5" fill="#6a5a62">红细胞单行通过</text>
        <text x="450" y="172" textAnchor="middle" fontSize="12.5" fill="#6a5a62">便于物质交换</text>
        <text x="450" y="192" textAnchor="middle" fontSize="12.5" fill="#6a5a62">血流速度最慢</text>
      </g>
      {/* 连通示意 */}
      <g style={dim(active, 2)}>
        <path d="M186 122 Q 208 132 226 122" fill="none" stroke="#9ab0b5" strokeWidth="2" strokeDasharray="5 4" />
        <path d="M356 120 Q 378 132 398 112" fill="none" stroke="#9ab0b5" strokeWidth="2" strokeDasharray="5 4" />
        <text x="260" y="300" textAnchor="middle" fontSize="13" fill="#49676d" fontWeight="600">血流方向：动脉 → 毛细血管 → 静脉（经心脏循环）</text>
        <path d="M150 322 L370 322" stroke="#9ab0b5" strokeWidth="0" />
      </g>
      {/* 心脏提示 */}
      <g style={dim(active, 0)}>
        <path d="M40 300 Q 24 284 36 268 Q 48 256 58 268 Q 68 256 80 268 Q 92 284 76 300 Q 58 316 40 300 Z" fill="#d86452" stroke="#a53a2c" strokeWidth="2.5" />
        <text x="58" y="338" textAnchor="middle" fontSize="12.5" fill="#a53a2c" fontWeight="600">心脏</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">三种血管结构模式图 · 结构与功能相适应</text>
    </svg>
  );
}

/* ================= 叶的横切结构 ================= */

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

/* ================= 水螅（刺胞动物·课外拓展） ================= */

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


/* ================= 鸟卵结构 ================= */

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

/* ================= 皮肤结构 ================= */

function SkinStructureSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 表皮 */}
      <g style={dim(active, 0)}>
        <path d="M30 96 Q 80 82 130 96 T 230 96 T 330 96 T 430 96 T 490 96 L490 132 Q 440 118 390 132 T 290 132 T 190 132 T 90 132 T 30 132 Z" fill="#f2d8c4" stroke="#b58a6a" strokeWidth="2.5" />
        <text x="40" y="66" fontSize="13" fill="#a5683a" fontWeight="700">表皮（角质层保护·无血管）</text>
        <line x1="120" y1="72" x2="130" y2="90" stroke="#a5683a" strokeWidth="1.4" />
      </g>
      {/* 真皮 */}
      <g style={dim(active, 1)}>
        <rect x="30" y="132" width="460" height="128" fill="#f6e2d2" stroke="#d8b8a0" strokeWidth="2" />
        <text x="368" y="152" fontSize="13" fill="#a5683a" fontWeight="700">真皮（主要结构层）</text>
      </g>
      {/* 毛发与毛囊 */}
      <g style={dim(active, 2)}>
        <path d="M156 20 Q 148 60 152 104 Q 156 140 162 172" fill="none" stroke="#7a5a3a" strokeWidth="7" strokeLinecap="round" />
        <path d="M138 216 Q 160 186 184 214 Q 162 240 138 216 Z" fill="#e8c9a8" stroke="#b58a5f" strokeWidth="2.5" />
        <text x="34" y="248" fontSize="13" fill="#7a5a3a" fontWeight="700">毛囊与毛发</text>
        <text x="34" y="266" fontSize="12.5" fill="#7a5a3a">立毛肌连于毛囊</text>
        <line x1="130" y1="242" x2="150" y2="230" stroke="#7a5a3a" strokeWidth="1.4" />
      </g>
      {/* 汗腺 */}
      <g style={dim(active, 3)}>
        <path d="M382 132 L382 74" fill="none" stroke="#3d7e9e" strokeWidth="4" strokeLinecap="round" />
        <text x="366" y="58" fontSize="12.5" fill="#2c6e94" fontWeight="700">汗孔</text>
        <path d="M382 236 Q 350 258 382 276 Q 414 292 396 256 Q 390 244 382 236" fill="none" stroke="#3d7e9e" strokeWidth="5" strokeLinecap="round" />
        <text x="330" y="304" fontSize="13" fill="#2c6e94" fontWeight="700">汗腺（分泌汗液散热）</text>
        <line x1="380" y1="290" x2="384" y2="276" stroke="#2c6e94" strokeWidth="1.4" />
      </g>
      {/* 血管 */}
      <g style={dim(active, 4)}>
        <path d="M64 168 Q 150 148 240 168 T 420 168" fill="none" stroke="#c94a5a" strokeWidth="4" />
        <path d="M64 196 Q 150 176 240 196 T 420 196" fill="none" stroke="#4d7ea8" strokeWidth="4" />
        <text x="240" y="222" textAnchor="middle" fontSize="12.5" fill="#8a4a56" fontWeight="600">血管（动脉运热·调节血流量）</text>
      </g>
      {/* 神经末梢 */}
      <g style={dim(active, 5)}>
        <ellipse cx="300" cy="150" rx="22" ry="9" fill="#e0c8ee" stroke="#7a4a8a" strokeWidth="2.2" />
        <path d="M292 156 Q 290 170 288 178" fill="none" stroke="#7a4a8a" strokeWidth="2" />
        <text x="266" y="196" fontSize="12.5" fill="#6a4a9a" fontWeight="700">感觉神经末梢（冷热触压）</text>
      </g>
      {/* 皮下组织 */}
      <g style={dim(active, 1)}>
        <rect x="30" y="260" width="460" height="94" fill="#f8e2c8" stroke="#d8c0a0" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle key={i} cx={62 + i * 58} cy={i % 2 === 0 ? 296 : 322} r="17" fill="#f0d4b4" stroke="#c9a882" strokeWidth="2" />
        ))}
        <text x="250" y="350" textAnchor="middle" fontSize="12.5" fill="#a57a4a" fontWeight="700">皮下组织（脂肪保温）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">皮肤结构模式图 · 最大的器官，体温调节的感受器与效应器</text>
    </svg>
  );
}

/* ================= 衣藻（单细胞绿藻） ================= */

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


/* ================= 芽的结构（叶芽纵切） ================= */

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

/* ================= 血细胞三种类型 ================= */

function BloodCellsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 血浆背景 */}
      <g style={dim(active, 3)}>
        <rect x="20" y="60" width="480" height="280" rx="16" fill="#fbe9c8" stroke="#d8b878" strokeWidth="2.5" />
        <text x="36" y="330" fontSize="12.5" fill="#a58a4a" fontWeight="600">血浆（运载血细胞·运输养料废物）</text>
      </g>
      {/* 红细胞（左列） */}
      <g style={dim(active, 0)}>
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={86 + (i % 2) * 62} cy={112 + Math.floor(i / 2) * 64} rx="30" ry="22" fill="#d85a4a" stroke="#a53a2c" strokeWidth="2.2" />
        ))}
        <ellipse cx="86" cy="112" rx="14" ry="8" fill="#e87a6a" opacity="0.8" />
        <text x="118" y="72" textAnchor="middle" fontSize="13.5" fill="#a53a2c" fontWeight="700">红细胞</text>
        <text x="118" y="258" textAnchor="middle" fontSize="12.5" fill="#7a4a42">数量最多（男 5.0×10¹²/L 左右）</text>
        <text x="118" y="278" textAnchor="middle" fontSize="12.5" fill="#7a4a42">两面凹的圆饼状、无细胞核</text>
        <text x="118" y="298" textAnchor="middle" fontSize="12.5" fill="#7a4a42">含血红蛋白 → 运输氧气</text>
      </g>
      {/* 白细胞（中列） */}
      <g style={dim(active, 1)}>
        <circle cx="266" cy="130" r="40" fill="#f4f0e2" stroke="#7a4a8a" strokeWidth="2.5" />
        <path d="M250 112 Q 266 96 284 110 Q 296 126 282 142 Q 264 152 250 140 Q 240 124 250 112 Z" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
        <circle cx="316" cy="212" r="34" fill="#f4f0e2" stroke="#7a4a8a" strokeWidth="2.5" />
        <path d="M304 198 Q 318 188 330 202 Q 338 214 326 226 Q 310 232 302 220 Q 296 208 304 198 Z" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
        <text x="290" y="72" textAnchor="middle" fontSize="13.5" fill="#6a4a9a" fontWeight="700">白细胞</text>
        <text x="290" y="258" textAnchor="middle" fontSize="12.5" fill="#5a4a6e">最大、有细胞核、数量最少</text>
        <text x="290" y="278" textAnchor="middle" fontSize="12.5" fill="#5a4a6e">能变形穿出血管</text>
        <text x="290" y="298" textAnchor="middle" fontSize="12.5" fill="#5a4a6e">吞噬病菌 → 防御保护</text>
      </g>
      {/* 血小板（右列） */}
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M${418 + (i % 2) * 44} ${96 + Math.floor(i / 2) * 58} l10 -4 l8 6 l-2 10 l-12 3 l-8 -7 Z`}
            fill="#e8b878"
            stroke="#a5761d"
            strokeWidth="1.8"
          />
        ))}
        <text x="450" y="72" textAnchor="middle" fontSize="13.5" fill="#a5761d" fontWeight="700">血小板</text>
        <text x="450" y="258" textAnchor="middle" fontSize="12.5" fill="#8a6a2a">最小、形状不规则、无核</text>
        <text x="450" y="278" textAnchor="middle" fontSize="12.5" fill="#8a6a2a">破损血管处聚集</text>
        <text x="450" y="298" textAnchor="middle" fontSize="12.5" fill="#8a6a2a">释放物质 → 止血凝血</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">三种血细胞对比 · 都由骨髓中的造血干细胞产生</text>
    </svg>
  );
}

/* ================= 沼虾（甲壳纲） ================= */

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


/* ================= 蜥蜴（爬行动物） ================= */

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

/* ================= 肺泡与气体交换 ================= */

function AlveolusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 支气管末端 */}
      <g style={dim(active, 0)}>
        <path d="M40 60 Q 120 74 196 96" fill="none" stroke="#7a8a9a" strokeWidth="18" strokeLinecap="round" />
        <path d="M40 60 Q 120 74 196 96" fill="none" stroke="#c8d4dc" strokeWidth="12" strokeLinecap="round" />
        <text x="26" y="40" fontSize="13" fill="#4a5a6a" fontWeight="700">支气管（末端连肺泡）</text>
      </g>
      {/* 肺泡（一串半圆囊） */}
      <g style={dim(active, 1)}>
        <ellipse cx="250" cy="150" rx="70" ry="58" fill="#f2d8d4" stroke="#c97a6a" strokeWidth="3" />
        <ellipse cx="332" cy="180" rx="62" ry="52" fill="#f2d8d4" stroke="#c97a6a" strokeWidth="3" />
        <ellipse cx="250" cy="240" rx="72" ry="58" fill="#f2d8d4" stroke="#c97a6a" strokeWidth="3" />
        <ellipse cx="346" cy="252" rx="58" ry="48" fill="#f2d8d4" stroke="#c97a6a" strokeWidth="3" />
        <text x="96" y="150" fontSize="13" fill="#a5533c" fontWeight="700">肺泡（数量约 3 亿个）</text>
        <line x1="166" y1="146" x2="186" y2="148" stroke="#a5533c" strokeWidth="1.4" />
      </g>
      {/* 毛细血管网包绕 */}
      <g style={dim(active, 2)}>
        <path d="M206 120 Q 250 84 306 116 M330 136 Q 380 150 382 196 M386 240 Q 366 292 316 288 M262 292 Q 200 288 190 240" fill="none" stroke="#c94a5a" strokeWidth="5" strokeLinecap="round" />
        <path d="M226 104 Q 286 96 342 128 M376 174 Q 392 216 356 264 M300 296 Q 232 300 184 262" fill="none" stroke="#4d7ea8" strokeWidth="5" strokeLinecap="round" />
        <text x="404" y="132" fontSize="12.5" fill="#a53a2c" fontWeight="700">毛细血管网</text>
        <text x="404" y="150" fontSize="12.5" fill="#a53a2c">（包绕整个肺泡）</text>
        <line x1="400" y1="138" x2="378" y2="150" stroke="#a53a2c" strokeWidth="1.4" />
      </g>
      {/* 气体交换 */}
      <g style={dim(active, 3)}>
        <path d="M262 176 Q 286 190 300 204" fill="none" stroke="#2f7a4d" strokeWidth="3.5" markerEnd="url(#av-o2)" />
        <text x="196" y="186" fontSize="12.5" fill="#2f7a4d" fontWeight="700">O₂ 进入血液</text>
        <line x1="228" y1="182" x2="256" y2="182" stroke="#2f7a4d" strokeWidth="1.4" />
        <path d="M316 240 Q 296 232 276 222" fill="none" stroke="#b0483a" strokeWidth="3.5" markerEnd="url(#av-co2)" />
        <text x="330" y="230" fontSize="12.5" fill="#b0483a" fontWeight="700">CO₂ 排入肺泡</text>
      </g>
      {/* 结构特点 */}
      <g style={dim(active, 1)}>
        <text x="42" y="290" fontSize="12.5" fill="#8a5a52" fontWeight="600">肺泡壁与毛细血管壁都只由</text>
        <text x="42" y="308" fontSize="12.5" fill="#8a5a52" fontWeight="600">一层上皮细胞构成 → 利于交换</text>
        <line x1="168" y1="292" x2="200" y2="266" stroke="#8a5a52" strokeWidth="1.4" />
      </g>
      <defs>
        <marker id="av-o2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#2f7a4d" />
        </marker>
        <marker id="av-co2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#b0483a" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">肺泡与气体交换模式图 · 结构与功能相适应</text>
    </svg>
  );
}

/* ================= 生态系统组成成分 ================= */

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


/* ================= 海星（棘皮动物·课外拓展） ================= */

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

/* ================= 人体核型（23 对染色体） ================= */

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

/* ================= 筛管与伴胞 ================= */

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


/* ================= 茎的横切结构 ================= */

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

/* ================= 人脑结构 ================= */

function BrainStructureSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 大脑 */}
      <g style={dim(active, 0)}>
        <path d="M120 128 Q 110 56 190 44 Q 268 30 348 46 Q 420 60 416 130 Q 412 176 360 190 Q 250 208 150 192 Q 116 180 120 128 Z" fill="#e8b8c8" stroke="#b5607a" strokeWidth="3" />
        {/* 脑回沟 */}
        <path d="M170 70 Q 196 84 186 108 Q 176 128 196 144 M246 52 Q 258 76 246 98 Q 236 118 254 138 M322 62 Q 336 84 322 106 Q 312 124 330 140 M368 96 Q 356 116 366 138" fill="none" stroke="#b5607a" strokeWidth="2.4" />
        <text x="268" y="96" textAnchor="middle" fontSize="14" fill="#8a3a5a" fontWeight="800">大脑</text>
        <text x="268" y="118" textAnchor="middle" fontSize="12" fill="#8a3a5a">调节的最高级中枢</text>
      </g>
      {/* 小脑 */}
      <g style={dim(active, 1)}>
        <path d="M356 196 Q 344 168 380 162 Q 434 154 452 186 Q 460 210 428 222 Q 384 234 356 196 Z" fill="#d8c8a8" stroke="#8a7a4a" strokeWidth="3" />
        <path d="M368 178 Q 396 170 428 180 M364 196 Q 398 188 434 198 M370 214 Q 396 206 424 212" fill="none" stroke="#8a7a4a" strokeWidth="1.8" />
        <text x="400" y="252" textAnchor="middle" fontSize="13" fill="#6a5a2a" fontWeight="700">小脑（协调运动·维持平衡）</text>
      </g>
      {/* 脑干 */}
      <g style={dim(active, 2)}>
        <path d="M218 196 L258 196 L262 240 Q 262 262 244 274 L228 274 Q 214 258 218 236 Z" fill="#e0c8ee" stroke="#7a4a8a" strokeWidth="3" />
        <path d="M226 214 L254 214 M226 230 L254 230 M226 246 L252 246" stroke="#7a4a8a" strokeWidth="1.8" />
        <text x="150" y="316" fontSize="13" fill="#6a4a9a" fontWeight="700">脑干（心跳·呼吸·血压"生命中枢"）</text>
        <line x1="222" y1="296" x2="236" y2="276" stroke="#6a4a9a" strokeWidth="1.4" />
      </g>
      {/* 脊髓连接 */}
      <g style={dim(active, 2)}>
        <rect x="230" y="274" width="22" height="90" fill="#dce8f4" stroke="#4d7ea8" strokeWidth="2.5" />
        <text x="266" y="342" fontSize="12.5" fill="#3d6a94" fontWeight="700">脊髓（低级中枢·上下行传导）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">脑结构模式图 · 中枢神经系统的"总指挥部"</text>
    </svg>
  );
}

/* ================= 海绵（多孔动物·课外拓展） ================= */

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


/* ================= 进化树（生物进化的大致历程） ================= */

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

/* ================= 生物分类等级 ================= */

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

/* ================= 反刍胃（牛胃·课外拓展） ================= */

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


/* ================= 松果（裸子植物的球果） ================= */

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

/* ================= 生物圈 ================= */

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

/* ================= 根系类型对比（直根系 vs 须根系） ================= */

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


/* ================= 种间关系四类型对比 ================= */

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

/* ================= 鲸（哺乳动物适应水生） ================= */

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

/* ================= 骨的结构与造血 ================= */

function BoneStructureSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 骨整体（长骨纵切） */}
      <g style={dim(active, 0)}>
        {/* 骨干外轮廓 */}
        <path d="M170 40 Q 168 200 172 300 Q 174 322 190 330 L 310 330 Q 326 322 328 300 Q 332 200 330 40 Q 330 22 310 22 L 190 22 Q 170 22 170 40 Z" fill="#f6f0e2" stroke="#c9b88a" strokeWidth="3.5" />
        {/* 骨松质（两端网状） */}
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M196 ${52 + i * 14} l18 10 l20 -12 l18 12 M198 ${74 + i * 10} l22 8 l16 -10`} fill="none" stroke="#d8c9a0" strokeWidth="2" />
        ))}
        {[0, 1].map((i) => (
          <path key={`b${i}`} d={`M196 ${296 - i * 12} l18 -10 l22 10 M196 ${276 - i * 10} l20 8 l18 -8`} fill="none" stroke="#d8c9a0" strokeWidth="2" />
        ))}
        <text x="362" y="60" fontSize="13" fill="#8a7a4a" fontWeight="700">骨松质（两端·疏松）</text>
        <line x1="358" y1="66" x2="328" y2="76" stroke="#8a7a4a" strokeWidth="1.4" />
      </g>
      {/* 骨密质 */}
      <g style={dim(active, 1)}>
        <rect x="178" y="96" width="20" height="200" fill="#ece4d0" stroke="#b5a582" strokeWidth="2" />
        <rect x="322" y="96" width="20" height="200" fill="#ece4d0" stroke="#b5a582" strokeWidth="2" />
        <text x="362" y="140" fontSize="13" fill="#8a7a4a" fontWeight="700">骨密质（骨干·坚硬）</text>
        <line x1="358" y1="146" x2="344" y2="160" stroke="#8a7a4a" strokeWidth="1.4" />
      </g>
      {/* 骨髓腔与红骨髓 */}
      <g style={dim(active, 2)}>
        <rect x="200" y="110" width="120" height="196" fill="#f2c8c0" stroke="#c97a6a" strokeWidth="2.5" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={222 + i * 26} cy={150 + (i % 2) * 40} r="7" fill="#e88a7a" stroke="#b0483a" strokeWidth="1.6" />
        ))}
        <text x="392" y="216" fontSize="13" fill="#a53a2c" fontWeight="700">骨髓腔（红骨髓）</text>
        <text x="392" y="234" fontSize="12.5" fill="#a53a2c">造血干细胞 → 血细胞</text>
        <line x1="388" y1="224" x2="322" y2="216" stroke="#a53a2c" strokeWidth="1.4" />
      </g>
      {/* 骨膜 */}
      <g style={dim(active, 3)}>
        <path d="M166 60 Q 160 200 168 318" fill="none" stroke="#c9708a" strokeWidth="4" />
        <text x="60" y="82" fontSize="13" fill="#a54868" fontWeight="700">骨膜（血管神经·成骨）</text>
        <line x1="120" y1="88" x2="164" y2="98" stroke="#a54868" strokeWidth="1.4" />
      </g>
      {/* 关节面提示 */}
      <g style={dim(active, 4)}>
        <ellipse cx="250" cy="34" rx="46" ry="14" fill="#c8d8e8" stroke="#4d7ea8" strokeWidth="2.5" />
        <text x="250" y="14" textAnchor="middle" fontSize="12.5" fill="#3d6a94" fontWeight="600">关节面（覆光滑软骨）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">骨结构模式图 · 红骨髓终身造血（课外拓展）</text>
    </svg>
  );
}


/* ================= 脊椎动物五大纲对比 ================= */

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

/* ================= 光合色素与纸层析 ================= */

function PhotosyntheticPigmentsSvg({ active }: { active: number | null; open?: boolean }) {
  // 四条色素带（自上而下）
  const bands = [
    { name: '胡萝卜素', color: '#e8a04a', y: 92, note: '橙黄色 · 溶解度最高，跑最快' },
    { name: '叶黄素', color: '#e8d04a', y: 140, note: '黄色' },
    { name: '叶绿素 a', color: '#4a9a5a', y: 196, note: '蓝绿色 · 含量最多' },
    { name: '叶绿素 b', color: '#3a8a6a', y: 258, note: '黄绿色 · 跑最慢' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 层析纸 */}
      <g style={dim(active, 0)}>
        <rect x="150" y="56" width="70" height="262" fill="#faf7ee" stroke="#b5a582" strokeWidth="2.5" />
        <text x="185" y="48" textAnchor="middle" fontSize="12" fill="#8a7a4a" fontWeight="700">滤液细线（起点）</text>
        <line x1="150" y1="66" x2="220" y2="66" stroke="#c9a882" strokeWidth="1.6" strokeDasharray="4 3" />
      </g>
      {/* 四条色素带 */}
      {bands.map((b, i) => (
        <g key={b.name} style={dim(active, i)}>
          <rect x={152} y={b.y} width="66" height={i === 2 ? 20 : 13} fill={b.color} />
          <text x="252" y={b.y + 14} fontSize="13" fill="#13333a" fontWeight="800">{b.name}</text>
          <text x="252" y={b.y + 32} fontSize="11.5" fill="#799398">{b.note}</text>
          <line x1={220} y1={b.y + 7} x2={248} y2={b.y + 10} stroke="#9ab0b5" strokeWidth="1.2" />
        </g>
      ))}
      {/* 烧杯与层析液 */}
      <g style={dim(active, 0)}>
        <path d="M120 262 L250 262 L242 342 L128 342 Z" fill="#e8f2f0" stroke="#7a9a9a" strokeWidth="2.5" opacity="0.55" />
        <rect x="124" y="300" width="122" height="40" fill="#cfe8e2" opacity="0.6" />
        <text x="40" y="318" fontSize="12.5" fill="#4a7a6a" fontWeight="700">层析液（不能沾到</text>
        <text x="40" y="336" fontSize="12.5" fill="#4a7a6a" fontWeight="700">滤液细线以下！）</text>
      </g>
      {/* 原理说明 */}
      <g style={dim(active, 0)}>
        <text x="330" y="320" fontSize="12.5" fill="#49676d" fontWeight="600">色素随层析液在纸上扩散，</text>
        <text x="330" y="338" fontSize="12.5" fill="#49676d" fontWeight="600">溶解度越高扩散越快</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">叶绿体中四种光合色素 · 纸层析分离结果</text>
    </svg>
  );
}

/* ================= 细菌三形态 ================= */

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


/* ================= 生态系统的类型 ================= */

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

/* ================= 免疫器官 ================= */

function ImmuneOrgansSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 人体轮廓 */}
      <g style={dim(active, 0)}>
        <circle cx="230" cy="52" r="26" fill="#f2d8c4" stroke="#b58a6a" strokeWidth="3" />
        <path d="M206 84 Q 230 74 254 84 L262 176 Q 230 190 198 176 Z" fill="#f2e2d2" stroke="#b58a6a" strokeWidth="3" />
        <path d="M206 92 L160 160 M254 92 L300 160" stroke="#b58a6a" strokeWidth="10" strokeLinecap="round" />
        <path d="M214 178 L210 320 M246 178 L250 320" stroke="#f2e2d2" strokeWidth="14" strokeLinecap="round" />
        <path d="M214 320 L212 336 M246 320 L248 336" stroke="#f2e2d2" strokeWidth="10" strokeLinecap="round" />
        <text x="60" y="330" fontSize="12.5" fill="#8a7a6a" fontWeight="600">人体轮廓示意</text>
      </g>
      {/* 胸腺 */}
      <g style={dim(active, 1)}>
        <path d="M222 96 Q 230 88 238 96 Q 242 108 230 112 Q 218 108 222 96 Z" fill="#e8a0b4" stroke="#c9538a" strokeWidth="2.2" />
        <text x="286" y="96" fontSize="13" fill="#a54868" fontWeight="700">胸腺（T 细胞成熟）</text>
        <line x1="282" y1="102" x2="242" y2="104" stroke="#a54868" strokeWidth="1.4" />
      </g>
      {/* 骨髓 */}
      <g style={dim(active, 2)}>
        <ellipse cx="212" cy="316" rx="18" ry="12" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.2" />
        <text x="270" y="322" fontSize="13" fill="#a5761d" fontWeight="700">骨髓（造血干细胞）</text>
        <line x1="266" y1="318" x2="232" y2="316" stroke="#a5761d" strokeWidth="1.4" />
      </g>
      {/* 脾 */}
      <g style={dim(active, 3)}>
        <ellipse cx="266" cy="176" rx="24" ry="15" fill="#a54868" stroke="#7a2a48" strokeWidth="2.2" transform="rotate(-18 266 176)" />
        <text x="304" y="176" fontSize="13" fill="#7a2a48" fontWeight="700">脾（过滤血液·储存淋巴细胞）</text>
        <line x1="300" y1="180" x2="290" y2="178" stroke="#7a2a48" strokeWidth="1.4" />
      </g>
      {/* 淋巴结 */}
      <g style={dim(active, 4)}>
        <circle cx="150" cy="140" r="9" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
        <circle cx="316" cy="140" r="9" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
        <circle cx="230" cy="290" r="9" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
        <text x="318" y="250" fontSize="13" fill="#6a4a9a" fontWeight="700">淋巴结（遍布全身的"哨卡"）</text>
        <line x1="314" y1="244" x2="240" y2="294" stroke="#6a4a9a" strokeWidth="1.4" />
      </g>
      {/* 扁桃体 */}
      <g style={dim(active, 5)}>
        <circle cx="212" cy="66" r="6" fill="#f4c76a" stroke="#b5953a" strokeWidth="1.8" />
        <circle cx="248" cy="66" r="6" fill="#f4c76a" stroke="#b5953a" strokeWidth="1.8" />
        <text x="60" y="60" fontSize="13" fill="#a5761d" fontWeight="700">扁桃体（消化道·呼吸道入口防线）</text>
        <line x1="152" y1="64" x2="204" y2="66" stroke="#a5761d" strokeWidth="1.4" />
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">人体主要免疫器官 · 免疫细胞生成与驻扎的"军营"</text>
    </svg>
  );
}

/* ================= 内分泌腺 ================= */

function EndocrineGlandsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 人体轮廓 */}
      <g style={dim(active, 0)}>
        <circle cx="230" cy="52" r="26" fill="#f2d8c4" stroke="#b58a6a" strokeWidth="3" />
        <path d="M206 84 Q 230 74 254 84 L262 176 Q 230 190 198 176 Z" fill="#f2e2d2" stroke="#b58a6a" strokeWidth="3" />
        <path d="M214 178 L210 320 M246 178 L250 320" stroke="#f2e2d2" strokeWidth="14" strokeLinecap="round" />
        <path d="M214 320 L212 336 M246 320 L248 336" stroke="#f2e2d2" strokeWidth="10" strokeLinecap="round" />
      </g>
      {/* 垂体 */}
      <g style={dim(active, 1)}>
        <circle cx="230" cy="60" r="6" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2" />
        <text x="272" y="58" fontSize="13" fill="#6a4a9a" fontWeight="700">垂体（"总开关"·指挥其他腺体）</text>
        <line x1="268" y1="62" x2="238" y2="60" stroke="#6a4a9a" strokeWidth="1.4" />
      </g>
      {/* 甲状腺 */}
      <g style={dim(active, 2)}>
        <path d="M214 92 Q 204 86 196 92 Q 194 102 204 106 L 218 104 Q 226 100 224 92 Z" fill="#e8a06a" stroke="#b5603a" strokeWidth="2.2" />
        <path d="M246 92 Q 256 86 264 92 Q 266 102 256 106 L 242 104 Q 234 100 236 92 Z" fill="#e8a06a" stroke="#b5603a" strokeWidth="2.2" />
        <text x="284" y="106" fontSize="13" fill="#a5603a" fontWeight="700">甲状腺（甲状腺激素·促代谢发育）</text>
        <line x1="280" y1="110" x2="262" y2="104" stroke="#a5603a" strokeWidth="1.4" />
      </g>
      {/* 肾上腺 */}
      <g style={dim(active, 3)}>
        <path d="M206 178 Q 198 168 206 162 Q 216 158 222 168 Q 218 178 206 178 Z" fill="#c9708a" stroke="#a54868" strokeWidth="2.2" />
        <path d="M254 178 Q 262 168 254 162 Q 244 158 238 168 Q 242 178 254 178 Z" fill="#c9708a" stroke="#a54868" strokeWidth="2.2" />
        <text x="284" y="172" fontSize="13" fill="#a54868" fontWeight="700">肾上腺（肾上腺素·应急反应）</text>
        <line x1="280" y1="174" x2="258" y2="172" stroke="#a54868" strokeWidth="1.4" />
      </g>
      {/* 胰岛 */}
      <g style={dim(active, 4)}>
        <ellipse cx="276" cy="226" rx="20" ry="13" fill="#a8cf98" stroke="#3f7f3a" strokeWidth="2.2" />
        <circle cx="270" cy="224" r="3.4" fill="#3f7f3a" />
        <circle cx="280" cy="228" r="3.4" fill="#3f7f3a" />
        <text x="310" y="230" fontSize="13" fill="#2f7a4d" fontWeight="700">胰岛（胰岛素·降血糖）</text>
        <line x1="306" y1="228" x2="298" y2="226" stroke="#2f7a4d" strokeWidth="1.4" />
      </g>
      {/* 性腺 */}
      <g style={dim(active, 5)}>
        <ellipse cx="214" cy="300" rx="12" ry="9" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2.2" />
        <ellipse cx="246" cy="300" rx="12" ry="9" fill="#c9a8e2" stroke="#7a4a8a" strokeWidth="2.2" />
        <text x="60" y="304" fontSize="13" fill="#6a4a9a" fontWeight="700">性腺（性激素·促进生殖器官发育）</text>
        <line x1="180" y1="302" x2="200" y2="300" stroke="#6a4a9a" strokeWidth="1.4" />
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">人体主要内分泌腺 · 无导管，激素直接进入血液</text>
    </svg>
  );
}


/* ================= 森林的垂直结构（分层现象） ================= */

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

/* ================= 细胞骨架（课外拓展） ================= */

function CytoskeletonSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 细胞轮廓 */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="190" rx="190" ry="140" fill="#f4faf6" stroke="#3f7f3a" strokeWidth="3.5" />
        <text x="392" y="66" fontSize="13" fill="#3f7f3a" fontWeight="700">细胞膜</text>
        <line x1="388" y1="70" x2="360" y2="92" stroke="#3f7f3a" strokeWidth="1.4" />
      </g>
      {/* 微管（粗直管道） */}
      <g style={dim(active, 1)}>
        <path d="M120 120 L 380 260 M150 270 L 360 110 M110 210 L 390 180" fill="none" stroke="#4d7ea8" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
        <text x="60" y="76" fontSize="13" fill="#3d6a94" fontWeight="700">微管（粗·"高速公路"）</text>
        <text x="60" y="94" fontSize="12" fill="#3d6a94">引导细胞器与囊泡运输</text>
      </g>
      {/* 微丝（细密网） */}
      <g style={dim(active, 2)}>
        <path d="M160 240 q 20 -14 40 0 q 20 14 40 0 q 20 -14 40 0 M140 160 q 18 -12 36 0 q 18 12 36 0 q 18 -12 36 0 M240 210 q 16 -10 32 2" fill="none" stroke="#c9708a" strokeWidth="3" strokeLinecap="round" />
        <text x="58" y="286" fontSize="13" fill="#a54868" fontWeight="700">微丝（细·"肌肉"）</text>
        <text x="58" y="304" fontSize="12" fill="#a54868">维持形状·细胞变形移动</text>
      </g>
      {/* 核与中心体 */}
      <g style={dim(active, 3)}>
        <circle cx="250" cy="190" r="36" fill="#e0c8ee" stroke="#7a4a8a" strokeWidth="2.8" />
        <text x="250" y="196" textAnchor="middle" fontSize="12" fill="#6a4a9a" fontWeight="700">细胞核</text>
        <text x="392" y="150" fontSize="12.5" fill="#6a4a9a" fontWeight="600">中心体附近发出微管</text>
      </g>
      {/* 功能说明 */}
      <g style={dim(active, 4)}>
        <rect x="60" y="316" width="380" height="42" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="250" y="334" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="700">细胞骨架 = 蛋白质纤维网络：支撑形态 · 运输 · 分裂 · 运动</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">细胞骨架模式图 · 微管与微丝（课外拓展）</text>
    </svg>
  );
}

/* ================= 肌肉组织三种类型 ================= */

function MuscleTissuesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 骨骼肌（左） */}
      <g style={dim(active, 0)}>
        <rect x="20" y="70" width="150" height="190" rx="12" fill="#f6e2d2" stroke="#b5603a" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M34 ${100 + i * 30} L156 ${100 + i * 30}`} stroke="#c9708a" strokeWidth="5" strokeLinecap="round" />
        ))}
        <text x="95" y="52" textAnchor="middle" fontSize="13.5" fill="#a53a2c" fontWeight="800">骨骼肌</text>
        <text x="95" y="284" textAnchor="middle" fontSize="12" fill="#7a4a42">长圆柱状·多核·有明显横纹</text>
        <text x="95" y="304" textAnchor="middle" fontSize="12" fill="#7a4a42">受意识支配（随意肌）</text>
      </g>
      {/* 心肌（中） */}
      <g style={dim(active, 1)}>
        <rect x="185" y="70" width="150" height="190" rx="12" fill="#fbe9e2" stroke="#c9538a" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M198 ${96 + i * 34} q 30 -16 62 0 q 14 8 24 -6`} fill="none" stroke="#c9708a" strokeWidth="5" strokeLinecap="round" />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={i} x={232 + (i % 2) * 22} y={128 + Math.floor(i / 1) * 44} width="12" height="5" fill="#7a4a8a" />
        ))}
        <text x="260" y="52" textAnchor="middle" fontSize="13.5" fill="#a54868" fontWeight="800">心肌</text>
        <text x="260" y="284" textAnchor="middle" fontSize="12" fill="#7a4a42">分支相连·有闰盘·横纹不明显</text>
        <text x="260" y="304" textAnchor="middle" fontSize="12" fill="#7a4a42">不受意识支配（不随意）</text>
      </g>
      {/* 平滑肌（右） */}
      <g style={dim(active, 2)}>
        <rect x="350" y="70" width="150" height="190" rx="12" fill="#eef4ea" stroke="#4a9a5a" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M366 ${104 + i * 26} q 34 ${i % 2 === 0 ? 18 : -14} 62 0 q 16 10 30 -4`} fill="none" stroke="#4a9a5a" strokeWidth="5.5" strokeLinecap="round" />
        ))}
        <text x="425" y="52" textAnchor="middle" fontSize="13.5" fill="#2f7a4d" fontWeight="800">平滑肌</text>
        <text x="425" y="284" textAnchor="middle" fontSize="12" fill="#2f5a3a">梭形·无横纹·单核</text>
        <text x="425" y="304" textAnchor="middle" fontSize="12" fill="#2f5a3a">不随意（胃肠·血管壁）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">三种肌肉组织对比 · 结构与功能相适应</text>
    </svg>
  );
}


/* ================= 蚕的完全变态发育 ================= */

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

/* ================= 地衣（互利共生的共生体） ================= */

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

/* ================= PCR 三步温度循环（流程图 → 实验侧） ================= */

function PcrStagesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 温度循环轴 */}
      <g style={dim(active, 0)}>
        <line x1="50" y1="300" x2="490" y2="300" stroke="#8a9a9f" strokeWidth="2" />
        <line x1="50" y1="40" x2="50" y2="300" stroke="#8a9a9f" strokeWidth="2" />
        <text x="42" y="46" textAnchor="end" fontSize="11.5" fill="#59767c">95°C</text>
        <text x="42" y="180" textAnchor="end" fontSize="11.5" fill="#59767c">55°C</text>
        <text x="42" y="294" textAnchor="end" fontSize="11.5" fill="#59767c">72°C</text>
      </g>
      {/* 变性 */}
      <g style={dim(active, 0)}>
        <path d="M50 296 L120 60 L160 52" fill="none" stroke="#b0483a" strokeWidth="4" strokeLinecap="round" />
        <rect x="120" y="40" width="130" height="44" rx="8" fill="#fff2ed" stroke="#b0483a" strokeWidth="2.2" />
        <text x="185" y="58" textAnchor="middle" fontSize="12" fill="#b0483a" fontWeight="800">① 变性 90~95°C</text>
        <text x="185" y="76" textAnchor="middle" fontSize="10.5" fill="#a5603a">氢键断裂 · 双链解开</text>
        {/* 解链示意 */}
        <path d="M150 210 l40 -14 M190 196 l40 -14" stroke="#d85a4a" strokeWidth="4" strokeLinecap="round" />
        <text x="288" y="204" fontSize="10.5" fill="#a5603a">两条模板链分开</text>
      </g>
      {/* 复性 */}
      <g style={dim(active, 1)}>
        <path d="M160 52 L 218 172 L 258 186" fill="none" stroke="#e0a02a" strokeWidth="4" strokeLinecap="round" />
        <rect x="252" y="170" width="130" height="44" rx="8" fill="#fdf6e3" stroke="#b5953a" strokeWidth="2.2" />
        <text x="317" y="188" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">② 复性 55~60°C</text>
        <text x="317" y="206" textAnchor="middle" fontSize="10.5" fill="#a5761d">引物结合到模板上</text>
      </g>
      {/* 延伸 */}
      <g style={dim(active, 2)}>
        <path d="M258 186 L 316 262 L 366 292" fill="none" stroke="#2f7a4d" strokeWidth="4" strokeLinecap="round" />
        <rect x="352" y="282" width="136" height="44" rx="8" fill="#edf9f1" stroke="#2f7a4d" strokeWidth="2.2" />
        <text x="420" y="300" textAnchor="middle" fontSize="12" fill="#2f7a4d" fontWeight="800">③ 延伸 72°C</text>
        <text x="420" y="318" textAnchor="middle" fontSize="10.5" fill="#4a7a3a">Taq 酶合成新链</text>
      </g>
      {/* 循环提示 */}
      <g style={dim(active, 3)}>
        <path d="M456 282 Q 492 180 452 66" fill="none" stroke="#8a671b" strokeWidth="2.6" strokeDasharray="7 5" markerEnd="url(#pc-arrow)" />
        <text x="392" y="128" fontSize="11.5" fill="#8a671b" fontWeight="700">循环 20~30 次，</text>
        <text x="392" y="146" fontSize="11.5" fill="#8a671b" fontWeight="700">DNA 指数级扩增（2ⁿ）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">PCR 三步温度循环 · 体外扩增 DNA（流程图）</text>
    </svg>
  );
}


/* ================= 植物的主要组织 ================= */

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

/* ================= 维生素与缺乏症 ================= */

function VitaminsSvg({ active }: { active: number | null; open?: boolean }) {
  const rows = [
    { name: '维生素 A', lack: '夜盲症·皮肤干燥', food: '动物肝脏 · 胡萝卜（β-胡萝卜素转化）', color: '#4a9a5a' },
    { name: '维生素 B₁', lack: '脚气病·神经炎', food: '粗粮 · 瘦肉 · 豆类', color: '#c98a1d' },
    { name: '维生素 C', lack: '坏血病·牙龈出血', food: '新鲜蔬菜水果（柑橘·猕猴桃）', color: '#4a9ac9' },
    { name: '维生素 D', lack: '佝偻病·骨质疏松', food: '蛋黄 · 鱼肝油（晒太阳也能合成）', color: '#c9708a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <text x="36" y="52" fontSize="13" fill="#13333a" fontWeight="800">维生素不是能源物质，也不构成细胞——但缺乏就会生病</text>
      </g>
      {rows.map((r, i) => {
        const y = 72 + i * 66;
        return (
          <g key={r.name} style={dim(active, i + 1)}>
            <rect x="30" y={y} width="460" height="54" rx="10" fill="#f4faf9" stroke={r.color} strokeWidth="2.2" />
            <text x="48" y={y + 24} fontSize="13.5" fill={r.color} fontWeight="800">{r.name}</text>
            <text x="48" y={y + 44} fontSize="11.5" fill="#59767c">食物来源：{r.food}</text>
            <text x="270" y={y + 24} fontSize="12" fill="#a53a2c" fontWeight="700">缺乏 → {r.lack}</text>
          </g>
        );
      })}
      <g style={dim(active, 0)}>
        <text x="36" y="352" fontSize="12.5" fill="#49676d" fontWeight="700">均衡饮食 = 各类维生素齐全；长期偏食是缺乏症的根源</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">主要维生素与缺乏症 · 均衡营养（课外拓展）</text>
    </svg>
  );
}

/* ================= 外来物种入侵 ================= */

function InvasiveSpeciesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 本地生态（左） */}
      <g style={dim(active, 0)}>
        <rect x="20" y="60" width="220" height="150" rx="12" fill="#eaf4ea" stroke="#4a8a3a" strokeWidth="2.4" />
        <text x="130" y="86" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="800">本地生态系统（平衡）</text>
        <text x="130" y="116" textAnchor="middle" fontSize="13">🌾 稻田</text>
        <text x="130" y="142" textAnchor="middle" fontSize="13">🐸 蛙 · 🐟 鱼 · 🦗 虫</text>
        <text x="130" y="168" textAnchor="middle" fontSize="12" fill="#59767c">食物网复杂 · 稳定</text>
      </g>
      {/* 入侵后（右） */}
      <g style={dim(active, 1)}>
        <rect x="280" y="60" width="220" height="150" rx="12" fill="#f8ece2" stroke="#b5603a" strokeWidth="2.4" />
        <text x="390" y="86" textAnchor="middle" fontSize="13" fill="#a5601d" fontWeight="800">入侵后（失衡）</text>
        <text x="390" y="116" textAnchor="middle" fontSize="13">🌿 水葫芦疯长覆盖水面</text>
        <text x="390" y="142" textAnchor="middle" fontSize="13">🐟 鱼 · 🐸 蛙 大量减少</text>
        <text x="390" y="168" textAnchor="middle" fontSize="12" fill="#59767c">本地物种被排挤 · 多样性下降</text>
      </g>
      {/* 入侵箭头 */}
      <g style={dim(active, 1)}>
        <path d="M244 130 L276 130" fill="none" stroke="#b0483a" strokeWidth="4" markerEnd="url(#is-arrow)" />
        <text x="260" y="118" textAnchor="middle" fontSize="11.5" fill="#b0483a" fontWeight="800">引入水葫芦</text>
      </g>
      {/* 典型入侵物种 */}
      <g style={dim(active, 2)}>
        <rect x="30" y="240" width="460" height="112" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="266" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">常见入侵物种：水葫芦 · 福寿螺 · 加拿大一枝黄花 · 红火蚁 · 巴西龟</text>
        <text x="260" y="292" textAnchor="middle" fontSize="12" fill="#7a5a1d">入侵成功的原因：环境适宜 + 缺少天敌 + 繁殖力强</text>
        <text x="260" y="322" textAnchor="middle" fontSize="12.5" fill="#a5533c" fontWeight="700">不要随意放生或弃养外来宠物、植物——防控入侵人人有责！</text>
      </g>
      <defs>
        <marker id="is-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#b0483a" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">外来物种入侵 · 生态平衡的隐形杀手（课外拓展）</text>
    </svg>
  );
}


/* ================= 细胞的癌变 ================= */

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

/* ================= 细胞学说 ================= */

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

/* ================= 无子果实培育（生长素应用） ================= */

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


/* ================= 菜豆种子与玉米种子对比 ================= */

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

/* ================= 食品保存与防腐原理 ================= */

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

/* ================= 安全用药 ================= */

function SafeMedicationSvg({ active }: { active: number | null; open?: boolean }) {
  const rows = [
    { name: '处方药（Rx）', note: '必须凭执业医师处方购买·遵医嘱使用', color: '#3d6a94' },
    { name: '非处方药（OTC）', note: '可自行购买·按说明书使用', color: '#2f7a4d' },
  ];
  const rules = [
    '看清说明书：适应症、用法用量、有效期、禁忌与不良反应',
    '用药前明确诊断：不凭"经验"随意联合用药或加大剂量',
    '抗生素是处方药：滥用会催生耐药菌（回顾耐药性实验）',
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 两类药 */}
      {rows.map((r, i) => (
        <g key={r.name} style={dim(active, i)}>
          <rect x={26 + i * 240} y="52" width="228" height="72" rx="12" fill="#f4faf9" stroke={r.color} strokeWidth="2.4" />
          <text x={140 + i * 240} y={82} textAnchor="middle" fontSize="13.5" fill={r.color} fontWeight="800">{r.name}</text>
          <text x={140 + i * 240} y={108} textAnchor="middle" fontSize="11" fill="#59767c">{r.note}</text>
        </g>
      ))}
      {/* 药盒示意 */}
      <g style={dim(active, 0)}>
        <rect x="60" y="146" width="170" height="60" rx="8" fill="#eaf2f8" stroke="#3d6a94" strokeWidth="2.2" />
        <text x="76" y="172" fontSize="12" fill="#2c5a84" fontWeight="700">Rx</text>
        <rect x="290" y="146" width="170" height="60" rx="8" fill="#eaf4ea" stroke="#2f7a4d" strokeWidth="2.2" />
        <text x="306" y="172" fontSize="12" fill="#2f7a4d" fontWeight="700">OTC</text>
        <text x="260" y="230" textAnchor="middle" fontSize="12.5" fill="#49676d" fontWeight="700">安全用药：先读说明书，再对症用药</text>
      </g>
      {/* 用药规则 */}
      <g style={dim(active, 1)}>
        <rect x="40" y="252" width="440" height="102" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="62" y="280" fontSize="12" fill="#6a4a1a" fontWeight="700">✓ {rules[0]}</text>
        <text x="62" y="306" fontSize="12" fill="#6a4a1a" fontWeight="700">✓ {rules[1]}</text>
        <text x="62" y="332" fontSize="12" fill="#6a4a1a" fontWeight="700">✓ {rules[2]}</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">安全用药常识 · 处方药与非处方药（课外拓展）</text>
    </svg>
  );
}


/* ================= 液泡（植物细胞特有） ================= */

function VacuoleSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 细胞轮廓 */}
      <g style={dim(active, 0)}>
        <rect x="40" y="50" width="440" height="290" rx="24" fill="#eaf4ea" stroke="#3f7f3a" strokeWidth="3.5" />
        <text x="412" y="42" fontSize="12.5" fill="#3f7f3a" fontWeight="700">细胞壁 + 细胞膜</text>
        {/* 细胞核 */}
        <circle cx="96" cy="102" r="24" fill="#e0c8ee" stroke="#7a4a8a" strokeWidth="2.5" />
        <text x="96" y="107" textAnchor="middle" fontSize="11" fill="#6a4a9a" fontWeight="700">细胞核</text>
      </g>
      {/* 中央大液泡 */}
      <g style={dim(active, 1)}>
        <ellipse cx="286" cy="196" rx="150" ry="112" fill="#d4e8f4" stroke="#4d7ea8" strokeWidth="3.5" />
        {/* 液泡膜 */}
        <ellipse cx="286" cy="196" rx="142" ry="104" fill="none" stroke="#7ab8d8" strokeWidth="1.8" />
        <text x="286" y="180" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="800">中央大液泡</text>
        <text x="286" y="202" textAnchor="middle" fontSize="12" fill="#2c5a84">细胞液：糖·无机盐·色素·代谢废物</text>
      </g>
      {/* 液泡膜标注 */}
      <g style={dim(active, 2)}>
        <line x1="368" y1="128" x2="376" y2="148" stroke="#7ab8d8" strokeWidth="1.6" />
        <text x="340" y="122" fontSize="12.5" fill="#4a7a9a" fontWeight="700">液泡膜（选择透过性）</text>
      </g>
      {/* 细胞质 */}
      <g style={dim(active, 3)}>
        <path d="M70 160 Q 130 150 178 176 Q 140 200 70 190 Z" fill="#c8e2ba" stroke="#6a9a5a" strokeWidth="2" />
        <text x="52" y="248" fontSize="12.5" fill="#4a7a3a" fontWeight="700">细胞质（液泡外·核外的" Jelly"）</text>
      </g>
      {/* 功能说明 */}
      <g style={dim(active, 4)}>
        <rect x="60" y="304" width="400" height="26" rx="8" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2" />
        <text x="260" y="322" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">充水膨胀使细胞挺立（萎蔫的"元凶"）· 调节渗透压 · 储藏与解毒</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">液泡结构模式图 · 成熟植物细胞的标志</text>
    </svg>
  );
}

/* ================= 同源器官（进化证据） ================= */

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

/* ================= 保护色·拟态·警戒色 ================= */

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


/* ================= 蛔虫（线形动物·人体寄生虫） ================= */

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

/* ================= 大熊猫（珍稀保护动物） ================= */

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

/* ================= 植物组织培养流程（流程图→实验侧） ================= */

function TissueCultureStagesSvg({ active }: { active: number | null; open?: boolean }) {
  const steps = [
    { t: '① 离体的外植体', d: '取胡萝卜韧皮部/髓部小块', y: 60, color: '#7a9ac9' },
    { t: '② 脱分化 → 愈伤组织', d: '生长素+细胞分裂素·不定状态', y: 148, color: '#c9a05a' },
    { t: '③ 再分化 → 根芽', d: '调整两种激素的比例', y: 236, color: '#7ab86a' },
    { t: '④ 完整植株', d: '移栽·全能性表达的证明', y: 324, color: '#4a9a4a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 中轴流程 */}
      <line x1="52" y1="72" x2="52" y2="330" stroke="#8a9a9f" strokeWidth="2.6" />
      {steps.map((st, i) => (
        <g key={st.t} style={dim(active, i)}>
          <circle cx="52" cy={st.y + 18} r="13" fill={st.color} stroke="#13333a" strokeWidth="2" />
          <text x="52" y={st.y + 23} textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="800">{i + 1}</text>
          <text x="78" y={st.y + 14} fontSize="13" fill="#13333a" fontWeight="800">{st.t}</text>
          <text x="78" y={st.y + 34} fontSize="11.5" fill="#59767c">{st.d}</text>
        </g>
      ))}
      {/* 试管示意 */}
      <g style={dim(active, 4)}>
        <rect x="352" y="52" width="130" height="240" rx="16" fill="#e8f2f0" stroke="#4a9a8a" strokeWidth="3" />
        <rect x="356" y="236" width="122" height="52" fill="#d8c9a0" stroke="#a5885f" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M${380 + i * 30} 232 l-12 30 l30 6 l10 -32 Z`} fill="#8ab86a" stroke="#3f7f3a" strokeWidth="2" />
        ))}
        <text x="417" y="320" textAnchor="middle" fontSize="11.5" fill="#4a7a6a" fontWeight="700">无菌培养基（蔗糖+激素）</text>
      </g>
      {/* 无菌提醒 */}
      <g style={dim(active, 5)}>
        <text x="24" y="362" fontSize="12.5" fill="#a54868" fontWeight="700">全程无菌操作——杂菌污染会让培养前功尽弃</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">植物组织培养流程 · 细胞全能性的证明（流程图）</text>
    </svg>
  );
}


/* ================= 胚胎发育比较（进化证据） ================= */

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

/* ================= 植物器官的变态 ================= */

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

/* ================= 体液免疫流程（流程图→实验侧） ================= */

function HumoralImmunitySvg({ active }: { active: number | null; open?: boolean }) {
  const nodes = [
    { x: 20, y: 60, w: 96, t: '病原体（抗原）', c: '#b0483a' },
    { x: 140, y: 60, w: 96, t: '吞噬细胞', c: '#8a671b' },
    { x: 260, y: 60, w: 96, t: 'T 细胞', c: '#3d7e9e' },
    { x: 380, y: 60, w: 110, t: 'B 淋巴细胞', c: '#7a4a8a' },
    { x: 140, y: 180, w: 96, t: '浆细胞', c: '#2f7a4d' },
    { x: 300, y: 180, w: 110, t: '记忆 B 细胞', c: '#b5761d' },
    { x: 60, y: 180, w: 110, t: '抗体（结合抗原）', c: '#3f7f3a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {nodes.map((n, i) => (
        <g key={n.t} style={dim(active, i)}>
          <rect x={n.x} y={n.y} width={n.w} height="38" rx="10" fill="#ffffff" stroke={n.c} strokeWidth="2.4" />
          <text x={n.x + n.w / 2} y={n.y + 24} textAnchor="middle" fontSize="11" fill={n.c} fontWeight="700">{n.t}</text>
        </g>
      ))}
      {/* 箭头 */}
      <g style={dim(active, 3)}>
        <path d="M116 79 L138 79" stroke="#59767c" strokeWidth="2.4" markerEnd="url(#hi-arrow)" />
        <path d="M236 79 L258 79" stroke="#59767c" strokeWidth="2.4" markerEnd="url(#hi-arrow)" />
        <path d="M356 79 L378 79" stroke="#59767c" strokeWidth="2.4" markerEnd="url(#hi-arrow)" />
        <path d="M330 98 Q 250 130 196 172" fill="none" stroke="#59767c" strokeWidth="2.4" markerEnd="url(#hi-arrow)" />
        <path d="M300 98 Q 330 130 348 176" fill="none" stroke="#59767c" strokeWidth="2.4" markerEnd="url(#hi-arrow)" />
        <path d="M150 218 L200 206" fill="none" stroke="#59767c" strokeWidth="2.4" markerEnd="url(#hi-arrow)" />
        <path d="M290 200 L250 214" fill="none" stroke="#8a671b" strokeWidth="2.4" strokeDasharray="6 4" markerEnd="url(#hi-arrow)" />
        <text x="300" y="164" fontSize="10" fill="#b5761d" fontWeight="600">再次入侵 → 快速增殖</text>
      </g>
      {/* 说明 */}
      <g style={dim(active, 4)}>
        <rect x="40" y="240" width="440" height="112" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="266" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">要点：抗体由浆细胞分泌（1 个浆细胞 = 1 种抗体的"工厂"）</text>
        <text x="260" y="290" textAnchor="middle" fontSize="11.5" fill="#a5761d">记忆 B 细胞寿命长：二次免疫比初次免疫更快更强——疫苗的原理</text>
        <text x="260" y="316" textAnchor="middle" fontSize="11.5" fill="#a5761d">HIV 攻击 T 细胞 → 体液免疫与细胞免疫双双瘫痪（艾滋病）</text>
        <text x="260" y="340" textAnchor="middle" fontSize="11.5" fill="#a54868" fontWeight="700">考点排序题：病原体 → 吞噬细胞 → T → B → 浆 → 抗体</text>
      </g>
      <defs>
        <marker id="hi-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#59767c" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">体液免疫的大致过程（流程图）</text>
    </svg>
  );
}


/* ================= 果实类型（肉质果与干果） ================= */

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

/* ================= 干细胞（分化潜能） ================= */

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

/* ================= 遗传密码（密码子表简化） ================= */

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


/* ================= 脊椎动物心脏对比 ================= */

function HeartCompareSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 鱼：1房1室 */}
      <g style={dim(active, 0)}>
        <rect x="24" y="70" width="126" height="120" rx="12" fill="#eaf2f8" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="87" y="92" textAnchor="middle" fontSize="13" fill="#2c5a84" fontWeight="800">🐟 鱼类</text>
        <path d="M52 118 a 14 14 0 1 0 28 0 a 14 14 0 1 0 -28 0" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <text x="66" y="122" textAnchor="middle" fontSize="8.5" fill="#7a3a2a" fontWeight="700">房</text>
        <text x="88" y="122" textAnchor="middle" fontSize="8.5" fill="#7a3a2a" fontWeight="700">室</text>
        <text x="87" y="156" textAnchor="middle" fontSize="11" fill="#2c5a84">1 心房 · 1 心室</text>
        <text x="87" y="174" textAnchor="middle" fontSize="10" fill="#59767c">单循环 · 鳃毛细血管网</text>
      </g>
      {/* 两栖 */}
      <g style={dim(active, 1)}>
        <rect x="168" y="70" width="126" height="120" rx="12" fill="#eaf4ea" stroke="#4a9a6a" strokeWidth="2.4" />
        <text x="231" y="92" textAnchor="middle" fontSize="13" fill="#2f7a4d" fontWeight="800">🐸 两栖类</text>
        <ellipse cx="212" cy="118" rx="14" ry="11" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <ellipse cx="244" cy="118" rx="14" ry="11" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <path d="M228 130 a 13 13 0 1 0 26 0 a 13 13 0 1 0 -26 0" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <text x="231" y="156" textAnchor="middle" fontSize="11" fill="#2f7a4d">2 心房 · 1 心室</text>
        <text x="231" y="174" textAnchor="middle" fontSize="10" fill="#59767c">动静脉血部分混合</text>
      </g>
      {/* 爬行 */}
      <g style={dim(active, 2)}>
        <rect x="312" y="70" width="126" height="120" rx="12" fill="#fdf6e3" stroke="#a5761d" strokeWidth="2.4" />
        <text x="375" y="92" textAnchor="middle" fontSize="13" fill="#8a5a1d" fontWeight="800">🦎 爬行类</text>
        <ellipse cx="356" cy="118" rx="14" ry="11" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <ellipse cx="388" cy="118" rx="14" ry="11" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <path d="M372 130 a 13 13 0 1 0 26 0 a 13 13 0 1 0 -26 0" fill="#e8b8b0" stroke="#a5603a" strokeWidth="2" />
        <line x1="372" y1="118" x2="398" y2="142" stroke="#a5603a" strokeWidth="2.4" />
        <text x="375" y="156" textAnchor="middle" fontSize="11" fill="#8a5a1d">2 房 1 室+不全分隔</text>
        <text x="375" y="174" textAnchor="middle" fontSize="10" fill="#59767c">不完全分隔</text>
      </g>
      {/* 鸟/哺乳四腔 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="204" width="440" height="120" rx="12" fill="#fff2ed" stroke="#b0483a" strokeWidth="2.4" />
        <text x="60" y="230" fontSize="13" fill="#8a2a1a" fontWeight="800">🐦 鸟类 · 🐕 哺乳类（恒温·双循环完全分开）</text>
        <g>
          <rect x="80" y="244" width="70" height="60" rx="10" fill="#f6c8c0" stroke="#b0483a" strokeWidth="2.4" />
          <line x1="115" y1="244" x2="115" y2="304" stroke="#b0483a" strokeWidth="3" />
          <line x1="80" y1="274" x2="150" y2="274" stroke="#b0483a" strokeWidth="3" />
          <text x="97" y="266" textAnchor="middle" fontSize="9.5" fill="#7a2a1a" fontWeight="700">房</text>
          <text x="97" y="296" textAnchor="middle" fontSize="9.5" fill="#7a2a1a" fontWeight="700">室</text>
          <text x="132" y="266" textAnchor="middle" fontSize="9.5" fill="#7a2a1a" fontWeight="700">房</text>
          <text x="132" y="296" textAnchor="middle" fontSize="9.5" fill="#7a2a1a" fontWeight="700">室</text>
        </g>
        <text x="180" y="270" fontSize="12" fill="#8a2a1a" fontWeight="700">2 心房 · 2 心室：动静脉血完全分开</text>
        <text x="180" y="292" fontSize="11.5" fill="#59767c">输氧效率最高 → 支持恒温与剧烈运动（飞行/奔跑）</text>
        <text x="180" y="314" fontSize="11.5" fill="#49676d">体循环 + 肺循环 完全独立</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">脊椎动物心脏的进化 · 结构与功能相适应</text>
    </svg>
  );
}

/* ================= 生物多样性三层次 ================= */

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

/* ================= 血糖来源与去路（流程图→实验侧） ================= */

function BloodSugarSourcesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 血糖中心圆 */}
      <g style={dim(active, 0)}>
        <ellipse cx="260" cy="190" rx="96" ry="58" fill="#f4d06a" stroke="#b5953a" strokeWidth="3.5" />
        <text x="260" y="184" textAnchor="middle" fontSize="14" fill="#7a5a1d" fontWeight="800">血糖</text>
        <text x="260" y="206" textAnchor="middle" fontSize="11" fill="#8a6a2a">正常 3.9~6.1 mmol/L</text>
      </g>
      {/* 三大来源（左） */}
      <g style={dim(active, 1)}>
        <rect x="24" y="76" width="150" height="44" rx="10" fill="#eaf4ea" stroke="#4a9a5a" strokeWidth="2.4" />
        <text x="99" y="96" textAnchor="middle" fontSize="12" fill="#2f7a4d" fontWeight="700">① 食物消化吸收</text>
        <rect x="24" y="134" width="150" height="44" rx="10" fill="#eaf4ea" stroke="#4a9a5a" strokeWidth="2.4" />
        <text x="99" y="154" textAnchor="middle" fontSize="12" fill="#2f7a4d" fontWeight="700">② 肝糖原分解</text>
        <rect x="24" y="192" width="150" height="44" rx="10" fill="#eaf4ea" stroke="#4a9a5a" strokeWidth="2.4" />
        <text x="99" y="212" textAnchor="middle" fontSize="12" fill="#2f7a4d" fontWeight="700">③ 非糖物质转化</text>
        <path d="M176 98 Q 200 140 166 172" fill="none" stroke="#4a9a5a" strokeWidth="3" markerEnd="url(#bs-arrow)" />
        <path d="M176 156 L 164 156" fill="none" stroke="#4a9a5a" strokeWidth="3" markerEnd="url(#bs-arrow)" />
        <path d="M176 214 Q 200 210 166 200" fill="none" stroke="#4a9a5a" strokeWidth="3" markerEnd="url(#bs-arrow)" />
        <text x="42" y="260" fontSize="12" fill="#2f7a4d" fontWeight="700">胰岛素：促进 ②③ 去路</text>
      </g>
      {/* 三大去路（右） */}
      <g style={dim(active, 2)}>
        <rect x="346" y="76" width="150" height="44" rx="10" fill="#eaf2f8" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="421" y="96" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="700">① 氧化分解供能</text>
        <rect x="346" y="134" width="150" height="44" rx="10" fill="#eaf2f8" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="421" y="154" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="700">② 合成肝糖原·肌糖原</text>
        <rect x="346" y="192" width="150" height="44" rx="10" fill="#eaf2f8" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="421" y="212" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="700">③ 转化为脂肪·氨基酸</text>
        <path d="M354 172 Q 330 140 354 98" fill="none" stroke="#4d7ea8" strokeWidth="3" markerEnd="url(#bs-arrow)" />
        <path d="M346 156 L 358 156" fill="none" stroke="#4d7ea8" strokeWidth="3" markerEnd="url(#bs-arrow)" />
        <path d="M354 200 Q 330 210 354 214" fill="none" stroke="#4d7ea8" strokeWidth="3" markerEnd="url(#bs-arrow)" />
        <text x="436" y="260" fontSize="12" fill="#2c5a84" fontWeight="700">胰高血糖素：促进来源</text>
      </g>
      {/* 激素 */}
      <g style={dim(active, 3)}>
        <rect x="120" y="290" width="280" height="54" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">胰岛素（唯一降血糖）vs 胰高血糖素（升血糖）——拮抗调节</text>
        <text x="260" y="334" textAnchor="middle" fontSize="11.5" fill="#a5761d">肾上腺素也升血糖（协同胰高血糖素）</text>
      </g>
      <defs>
        <marker id="bs-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill="#4a9a5a" />
        </marker>
      </defs>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">血糖的来源与去路（流程图）</text>
    </svg>
  );
}


/* ================= 人体骨骼系统 ================= */

function SkeletonSystemSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="60" rx="32" ry="36" fill="#f4ecdc" stroke="#b5a582" strokeWidth="3" />
        <path d="M226 52 Q 250 36 274 52" fill="none" stroke="#c9b88a" strokeWidth="2" />
        <text x="310" y="48" fontSize="12" fill="#8a7a4a" fontWeight="700">颅骨（保护脑）</text>
        <line x1="284" y1="52" x2="282" y2="60" stroke="#8a7a4a" strokeWidth="1.3" />
        <path d="M250 96 L250 296" stroke="#c9b88a" strokeWidth="12" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <rect key={i} x={242} y={100 + i * 18} width="16" height="10" rx="3" fill="#e8dcc8" stroke="#b5a582" strokeWidth="1.5" />
        ))}
        <text x="180" y="220" fontSize="12" fill="#8a7a4a" fontWeight="700">脊柱（26 块椎骨·支撑+保护脊髓）</text>
        <line x1="182" y1="220" x2="242" y2="220" stroke="#8a7a4a" strokeWidth="1.3" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M250 ${110 + i * 22} Q ${200 + (i % 2) * 8} ${118 + i * 22} ${176} ${140 + i * 14} M250 ${110 + i * 22} Q ${300 - (i % 2) * 8} ${118 + i * 22} ${324} ${140 + i * 14}`} fill="none" stroke="#d8c9a0" strokeWidth="3" />
        ))}
        <text x="310" y="182" fontSize="12" fill="#8a7a4a" fontWeight="700">胸廓（12 对肋骨+胸骨·保护心肺）</text>
      </g>
      <g style={dim(active, 1)}>
        <path d="M180 130 L 140 190 L 130 240 M320 130 L 360 190 L 370 240" fill="none" stroke="#e8dcc8" strokeWidth="9" strokeLinecap="round" />
        <path d="M130 240 l-8 14 m8 -14 l0 16 m8 -16 l8 12" stroke="#e8dcc8" strokeWidth="4" strokeLinecap="round" />
        <path d="M370 240 l-8 14 m8 -14 l0 16 m8 -16 l8 12" stroke="#e8dcc8" strokeWidth="4" strokeLinecap="round" />
        <text x="96" y="130" fontSize="12" fill="#6a7a8a" fontWeight="600">上肢骨</text>
        <path d="M230 300 L 222 350 L 220 370 M270 300 L 278 350 L 280 370" fill="none" stroke="#e8dcc8" strokeWidth="10" strokeLinecap="round" />
        <text x="296" y="344" fontSize="12" fill="#6a7a8a" fontWeight="600">下肢骨（股骨最粗）</text>
      </g>
      <g style={dim(active, 2)}>
        <text x="100" y="374" fontSize="12.5" fill="#8a671b" fontWeight="700">骨连接（关节）· 成人共 206 块骨</text>
      </g>
    </svg>
  );
}

/* ================= 细胞凋亡 vs 细胞坏死 ================= */

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

/* ================= 植物激素五类对比 ================= */

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


/* ================= 消化系统 ================= */

function DigestiveSystemSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <ellipse cx="180" cy="52" rx="26" ry="14" fill="#f4c8b0" stroke="#c9708a" strokeWidth="2.5" />
        <text x="24" y="48" fontSize="12.5" fill="#8a3a2a" fontWeight="700">口腔（咀嚼·唾液淀粉酶）</text>
        <path d="M206 54 Q 220 66 214 80 L 218 130" fill="none" stroke="#c9a882" strokeWidth="10" strokeLinecap="round" />
        <text x="240" y="110" fontSize="12.5" fill="#8a6a3a" fontWeight="700">食管（蠕动推送食物）</text>
        <path d="M214 130 Q 210 176 248 184 Q 290 190 296 158 Q 296 136 262 130 Q 232 122 214 130 Z" fill="#e8b8a0" stroke="#a5603a" strokeWidth="3" />
        <text x="304" y="168" fontSize="12.5" fill="#8a4a2a" fontWeight="700">胃（胃蛋白酶·盐酸·蠕动搅拌）</text>
        <path d="M240 186 Q 220 220 250 240 Q 280 260 310 244 Q 340 228 320 254 Q 300 278 270 270 Q 240 262 232 284" fill="none" stroke="#e8a06a" strokeWidth="14" strokeLinecap="round" />
        <text x="60" y="240" fontSize="12.5" fill="#c9534a" fontWeight="700">小肠（消化吸收主场所）</text>
        <path d="M232 284 Q 260 300 310 292 Q 370 284 400 262 L 400 240" fill="none" stroke="#c9b88a" strokeWidth="18" strokeLinecap="round" />
        <text x="330" y="322" fontSize="12.5" fill="#8a7a4a" fontWeight="700">大肠（吸收水分·形成粪便）</text>
        <circle cx="412" cy="246" r="6" fill="#8a671b" />
        <text x="424" y="250" fontSize="11" fill="#8a671b" fontWeight="600">肛门</text>
      </g>
      <g style={dim(active, 1)}>
        <ellipse cx="228" cy="38" rx="14" ry="9" fill="#c8e2d8" stroke="#3f9a5a" strokeWidth="2" />
        <text x="248" y="42" fontSize="11.5" fill="#3f9a5a" fontWeight="600">唾液腺</text>
        <path d="M278 192 Q 320 178 366 190 Q 376 200 368 214 Q 340 226 298 212 Q 274 202 278 192 Z" fill="#c9708a" stroke="#a54868" strokeWidth="2.5" />
        <text x="380" y="206" fontSize="13" fill="#a54868" fontWeight="800">肝（最大的消化腺）</text>
        <text x="380" y="224" fontSize="11" fill="#a54868">分泌胆汁（乳化脂肪）</text>
        <ellipse cx="330" cy="258" rx="30" ry="12" fill="#f4d06a" stroke="#b5953a" strokeWidth="2.2" transform="rotate(-14 330 258)" />
        <text x="240" y="276" fontSize="12.5" fill="#a5761d" fontWeight="700">胰腺（胰液+胰岛素·胰高血糖素）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">消化系统模式图 · 消化道 + 消化腺</text>
    </svg>
  );
}

/* ================= 呼吸系统 ================= */

function RespiratorySystemSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <path d="M230 30 Q 244 22 258 30 L 256 48 L 232 48 Z" fill="#f2d8c4" stroke="#b58a6a" strokeWidth="2.5" />
        <text x="36" y="52" fontSize="12.5" fill="#8a6a3a" fontWeight="700">鼻（温暖·湿润·清洁空气）</text>
        <path d="M244 48 L 244 70 L 252 76 L 252 92" fill="none" stroke="#c9a882" strokeWidth="12" strokeLinecap="round" />
        <text x="270" y="72" fontSize="12" fill="#8a6a3a" fontWeight="600">咽</text>
        <ellipse cx="252" cy="84" rx="10" ry="8" fill="#c8e2d8" stroke="#3f9a5a" strokeWidth="2" />
        <text x="270" y="92" fontSize="12" fill="#3f7f3a" fontWeight="700">喉（发声器官）</text>
        <rect x="242" y="96" width="20" height="90" rx="8" fill="#d4e2e8" stroke="#7a9a9f" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line key={i} x1={242} y1={106 + i * 13} x2={262} y2={106 + i * 13} stroke="#7a9a9f" strokeWidth="2.4" />
        ))}
        <text x="280" y="140" fontSize="12.5" fill="#4a5a6a" fontWeight="700">气管（C 形软骨环支撑）</text>
        <path d="M246 186 L 210 220 M254 186 L 290 220" fill="none" stroke="#c8d4dc" strokeWidth="10" strokeLinecap="round" />
        <text x="140" y="222" fontSize="12" fill="#4a5a6a" fontWeight="600">左右支气管</text>
        <path d="M178 220 Q 140 224 130 268 Q 126 306 168 310 Q 196 306 200 262 Q 202 234 178 220 Z" fill="#f2c8c0" stroke="#c97a6a" strokeWidth="3" />
        <path d="M312 220 Q 360 224 370 268 Q 374 306 332 310 Q 304 306 300 262 Q 302 234 312 220 Z" fill="#f2c8c0" stroke="#c97a6a" strokeWidth="3" />
        <text x="164" y="342" textAnchor="middle" fontSize="14" fill="#c9534a" fontWeight="800">左肺（2 叶）</text>
        <text x="340" y="342" textAnchor="middle" fontSize="14" fill="#c9534a" fontWeight="800">右肺（3 叶）</text>
        <text x="260" y="366" textAnchor="middle" fontSize="12" fill="#8a4a2a" fontWeight="700">肺泡壁+毛细血管壁 仅一层上皮细胞 → 高效气体交换</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">呼吸系统模式图</text>
    </svg>
  );
}

/* ================= 神经元的种类 ================= */

function NeuronTypesSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <circle cx="80" cy="80" r="20" fill="#c8e2ba" stroke="#4a9a6a" strokeWidth="2.4" />
        <circle cx="74" cy="74" r="5" fill="#3f7f3a" />
        <path d="M100 72 L 150 72" stroke="#4a9a6a" strokeWidth="3" />
        <text x="80" y="60" textAnchor="middle" fontSize="10" fill="#2f7a4d" fontWeight="700">感觉神经元（假单极）</text>
      </g>
      <g style={dim(active, 1)}>
        <circle cx="180" cy="170" r="22" fill="#f4d06a" stroke="#c9a05a" strokeWidth="2.4" />
        <text x="180" y="175" textAnchor="middle" fontSize="9" fill="#8a671b" fontWeight="800">联络</text>
        <text x="180" y="210" textAnchor="middle" fontSize="10" fill="#c9a05a" fontWeight="600">中间神经元（中枢内）</text>
      </g>
      <g style={dim(active, 2)}>
        <circle cx="290" cy="80" r="20" fill="#c8d8e8" stroke="#3d6a94" strokeWidth="2.4" />
        <text x="290" y="86" textAnchor="middle" fontSize="9.5" fill="#1e4a68" fontWeight="800">运动</text>
        <text x="290" y="120" textAnchor="middle" fontSize="10" fill="#3d6a94" fontWeight="600">运动神经元（传出→肌肉）</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="40" y="290" width="440" height="56" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="312" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">反射弧：感受器 → 感觉神经元 → 中间神经元 → 运动神经元 → 效应器</text>
        <text x="260" y="334" textAnchor="middle" fontSize="11.5" fill="#a5761d">兴奋在神经元之间的传递是单向的（突触前膜→突触后膜）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">神经元的种类与连接 · 反射弧的结构基础</text>
    </svg>
  );
}

/* ================= 小肠绒毛结构 ================= */

function SmallIntestineVillusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <g style={dim(active, 0)}>
        <path d="M30 80 Q 260 50 490 80" fill="none" stroke="#c9885f" strokeWidth="8" strokeLinecap="round" />
        <text x="486" y="66" textAnchor="end" fontSize="12.5" fill="#c9885f" fontWeight="700">环形皱襞（黏膜折叠）</text>
      </g>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} style={dim(active, 1)}>
          <path d={`M${80 + i * 82} 92 q 6 50 14 88 q 2 6 8 6 q 6 0 8 -6 q 8 -38 14 -88 Z`} fill="#f2d8c8" stroke="#c9885f" strokeWidth="2.2" />
          <path d={`M${94 + i * 82} 100 q 2 30 4 70`} fill="none" stroke="#e8b84a" strokeWidth="3" />
          <path d={`M${86 + i * 82} 100 q -2 30 6 70`} fill="none" stroke="#c94a5a" strokeWidth="2.4" />
        </g>
      ))}
      <text x="486" y="120" textAnchor="end" fontSize="12.5" fill="#c9885f" fontWeight="700">小肠绒毛（手指状突起）</text>
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${200 + i * 6} 96 l 3 -14`} fill="none" stroke="#c9885f" strokeWidth="1.2" />
        ))}
        <text x="200" y="70" fontSize="11.5" fill="#c9885f" fontWeight="600">微绒毛（电镜下才可见）</text>
      </g>
      <g style={dim(active, 3)}>
        <rect x="30" y="268" width="460" height="94" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="52" y="294" fontSize="12" fill="#8a671b" fontWeight="800">三级放大 · 吸收面积约 200 m²（= 一个网球场）：</text>
        <text x="52" y="318" fontSize="11.5" fill="#7a5a1d">环形皱襞（×3）→ 绒毛（×8）→ 微绒毛（×20）——吸收面积增加约 600 倍</text>
        <text x="52" y="344" fontSize="11.5" fill="#49676d">绒毛内含丰富的毛细血管（吸收氨基酸葡萄糖）和毛细淋巴管（吸收脂肪）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">小肠绒毛结构模式图 · 消化吸收的结构基础</text>
    </svg>
  );
}

/* ================= 涡虫（扁形动物） ================= */

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

/* ================= 植物的光周期现象 ================= */

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

/* ================= 革兰氏染色 ================= */

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

/* ================= 五界分类系统 ================= */

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

/* ================= 血液的凝固过程 ================= */

function BloodClottingSvg({ active }: { active: number | null; open?: boolean }) {
  const steps = [
    { n: '①', t: '血管破损·血小板聚集', d: '血小板黏附于伤口释放凝血因子', x: 30, y: 70 },
    { n: '②', t: '凝血因子级联反应', d: '凝血酶原 → 凝血酶（需 Ca²⁺ 和维生素 K）', x: 30, y: 140 },
    { n: '③', t: '纤维蛋白原 → 纤维蛋白', d: '纤维蛋白交织成网·网住血细胞', x: 30, y: 210 },
    { n: '④', t: '血块形成·止血', d: '血块收缩·血清析出', x: 30, y: 280 },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {steps.map((st, i) => (
        <g key={st.n} style={dim(active, i)}>
          <rect x={st.x} y={st.y} width="440" height="52" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
          <text x={st.x + 16} y={st.y + 22} fontSize="12" fill="#8a671b" fontWeight="800">{st.n} {st.t}</text>
          <text x={st.x + 16} y={st.y + 42} fontSize="10.5" fill="#a5761d">{st.d}</text>
        </g>
      ))}
      {/* 连接箭头 */}
      <g style={dim(active, 0)}>
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M250 ${122 + i * 70} L 250 ${140 + i * 70}`} fill="none" stroke="#8a671b" strokeWidth="2.4" />
        ))}
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">血液凝固过程 · 血小板的止血功能（课外拓展）</text>
    </svg>
  );
}

/* ================= 猪笼草（捕虫叶） ================= */

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

/* ================= 耳的结构与听觉 ================= */

function EarStructureSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 外耳 */}
      <g style={dim(active, 0)}>
        <path d="M84 96 Q 60 118 72 150 Q 58 168 74 186 Q 66 210 92 216 Q 100 240 128 230 Q 150 224 148 198 Q 156 170 140 150 Q 152 120 128 102 Q 106 86 84 96 Z" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2.6" />
        <path d="M96 130 Q 112 122 124 138 Q 132 154 118 168 Q 106 180 98 168" fill="none" stroke="#c99a7a" strokeWidth="2" />
        <text x="42" y="256" fontSize="12.5" fill="#8a5a3a" fontWeight="700">耳廓（收集声波）</text>
        <path d="M148 196 Q 196 206 224 208" fill="none" stroke="#c99a7a" strokeWidth="18" strokeLinecap="round" opacity="0.55" />
        <path d="M148 196 Q 196 206 224 208" fill="none" stroke="#a5765a" strokeWidth="2" strokeDasharray="5 4" />
        <text x="120" y="298" fontSize="12.5" fill="#8a5a3a" fontWeight="700">外耳道（传导声波）</text>
      </g>
      {/* 中耳 */}
      <g style={dim(active, 1)}>
        <ellipse cx="240" cy="208" rx="9" ry="26" fill="#e8dcc8" stroke="#8a7a4a" strokeWidth="2.4" />
        <text x="240" y="292" fontSize="12.5" fill="#8a7a4a" fontWeight="700">鼓膜（振动）</text>
        <line x1="240" y1="278" x2="240" y2="236" stroke="#8a7a4a" strokeWidth="1.4" />
        <path d="M254 196 l 16 -10 m -14 12 l 18 -2 m -16 8 l 16 8" stroke="#8a7a4a" strokeWidth="3.4" strokeLinecap="round" />
        <text x="212" y="150" fontSize="12.5" fill="#8a7a4a" fontWeight="700">听小骨（锤·砧·镫）</text>
        <path d="M288 226 Q 330 248 348 296" fill="none" stroke="#c99a7a" strokeWidth="9" strokeLinecap="round" opacity="0.6" />
        <text x="310" y="322" fontSize="12.5" fill="#8a5a3a" fontWeight="700">咽鼓管（通咽·平衡气压）</text>
      </g>
      {/* 内耳 */}
      <g style={dim(active, 2)}>
        <path d="M300 96 Q 356 72 400 96 Q 356 108 300 116 Q 316 86 300 96 Z" fill="none" stroke="#b0483a" strokeWidth="0" />
        <path d="M312 132 Q 312 96 352 96 Q 392 96 392 132 Q 392 168 352 168 Q 340 168 336 158" fill="none" stroke="#4d7ea8" strokeWidth="7" strokeLinecap="round" />
        <circle cx="336" cy="158" r="5" fill="#4d7ea8" />
        <text x="404" y="132" fontSize="12.5" fill="#2c5a84" fontWeight="700">耳蜗（听觉感受器）</text>
        <path d="M316 118 Q 322 78 352 68 Q 386 58 400 78" fill="none" stroke="#6a8a9a" strokeWidth="5" strokeLinecap="round" />
        <path d="M394 96 q 16 -34 -4 -46 q -18 -10 -30 6" fill="none" stroke="#6a8a9a" strokeWidth="5" strokeLinecap="round" />
        <text x="404" y="76" fontSize="12.5" fill="#4a6a7a" fontWeight="700">半规管（位置觉）</text>
        <path d="M352 168 Q 356 210 348 248 Q 344 268 332 280" fill="none" stroke="#b0483a" strokeWidth="3.4" />
        <text x="356" y="252" fontSize="12.5" fill="#a53030" fontWeight="700">听神经（传向大脑）</text>
      </g>
      {/* 听觉形成 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="36" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="354" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">声波 → 鼓膜振动 → 听小骨 → 耳蜗感受器兴奋 → 听神经 → 大脑听觉中枢</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">耳的结构 · 听觉的形成（课外拓展）</text>
    </svg>
  );
}

/* ================= 水母（刺胞动物） ================= */

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

/* ================= 红绿色盲遗传 ================= */

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

/* ================= 螃蟹（甲壳动物） ================= */

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

/* ================= 脾脏（最大的免疫器官） ================= */

function SpleenSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 位置轮廓 */}
      <g style={dim(active, 0)}>
        <path d="M120 96 Q 210 62 300 96 Q 342 112 342 170 Q 342 238 262 268 Q 186 292 148 244 Q 116 204 120 96 Z" fill="#a54858" stroke="#7a2a38" strokeWidth="3" />
        <path d="M148 244 Q 190 258 232 250" fill="none" stroke="#7a2a38" strokeWidth="2" opacity="0.6" />
        <text x="72" y="70" fontSize="12.5" fill="#7a2a38" fontWeight="700">脾（左上腹·胃的后外侧）</text>
        <path d="M330 130 Q 366 118 384 96" fill="none" stroke="#7a2a38" strokeWidth="2" strokeDasharray="4 3" />
        <text x="356" y="84" fontSize="12.5" fill="#7a2a38" fontWeight="600">膈面贴膈</text>
        <ellipse cx="430" cy="170" rx="34" ry="58" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2" opacity="0.7" />
        <text x="430" y="248" textAnchor="middle" fontSize="12.5" fill="#8a5a3a" fontWeight="600">肾（毗邻）</text>
      </g>
      {/* 红髓 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={168 + (i % 3) * 46} cy={136 + Math.floor(i / 3) * 52} r="15" fill="#c96a6a" stroke="#8a3030" strokeWidth="1.8" opacity="0.85" />
        ))}
        <text x="418" y="308" fontSize="12.5" fill="#8a3030" fontWeight="700">红髓：过滤血液</text>
        <text x="418" y="328" fontSize="12.5" fill="#8a3030" fontWeight="700">吞噬衰老红细胞</text>
        <line x1="414" y1="312" x2="286" y2="270" stroke="#8a3030" strokeWidth="1.3" strokeDasharray="3 3" />
      </g>
      {/* 白髓 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={200 + (i % 2) * 58} cy={210 + Math.floor(i / 2) * 34} r="8" fill="#e8ecf4" stroke="#2c5a84" strokeWidth="2" />
        ))}
        <text x="88" y="318" fontSize="12.5" fill="#2c5a84" fontWeight="700">白髓：淋巴细胞聚集</text>
        <text x="88" y="338" fontSize="12.5" fill="#2c5a84" fontWeight="700">发生免疫应答的场所</text>
        <line x1="196" y1="322" x2="206" y2="286" stroke="#2c5a84" strokeWidth="1.3" strokeDasharray="3 3" />
      </g>
      {/* 功能 */}
      <g style={dim(active, 3)}>
        <rect x="120" y="344" width="280" height="30" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">最大的免疫器官 · 储血 · 胎儿期造血</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">脾脏 · 免疫与滤血（课外拓展）</text>
    </svg>
  );
}

/* ================= 乌龟（爬行纲） ================= */

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

/* ================= 胰岛（α 细胞与 β 细胞） ================= */

function PancreaticIsletSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 胰腺轮廓 + 胰岛 */}
      <g style={dim(active, 0)}>
        <path d="M96 190 Q 96 150 150 138 Q 230 120 330 128 Q 400 134 420 164 Q 430 184 400 196 Q 320 226 220 224 Q 130 224 96 190 Z" fill="#e8c9a0" stroke="#a5763a" strokeWidth="2.8" />
        <text x="424" y="150" fontSize="12.5" fill="#a5763a" fontWeight="700">胰腺</text>
        <text x="300" y="112" fontSize="12.5" fill="#a5763a" fontWeight="600">胰腺中的内分泌细胞群——胰岛</text>
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={150 + i * 90} cy={170} r="7" fill="#4d7ea8" opacity="0.6" />
        ))}
        <text x="86" y="128" fontSize="12.5" fill="#4b6c73" fontWeight="700">放大一个胰岛 ↓</text>
        <path d="M150 178 q -6 18 -34 22" fill="none" stroke="#4b6c73" strokeWidth="1.4" strokeDasharray="3 3" />
      </g>
      {/* β 细胞 */}
      <g style={dim(active, 1)}>
        <circle cx="176" cy="262" r="46" fill="#c9d8e8" stroke="#2c5a84" strokeWidth="2.8" />
        <text x="176" y="256" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">β 细胞</text>
        <text x="176" y="276" textAnchor="middle" fontSize="10.5" fill="#2c5a84">约占 70%</text>
        <text x="176" y="292" textAnchor="middle" fontSize="10.5" fill="#2c5a84">分泌胰岛素</text>
        <text x="286" y="240" fontSize="12.5" fill="#2c5a84" fontWeight="700">降血糖：促进细胞摄取、</text>
        <text x="286" y="260" fontSize="12.5" fill="#2c5a84" fontWeight="700">利用和储存葡萄糖</text>
        <line x1="282" y1="252" x2="226" y2="262" stroke="#2c5a84" strokeWidth="1.4" />
      </g>
      {/* α 细胞 */}
      <g style={dim(active, 2)}>
        <circle cx="176" cy="262" r="20" fill="#f4d0c9" stroke="#a54838" strokeWidth="2.4" />
        <text x="176" y="267" textAnchor="middle" fontSize="10" fill="#8a3a2a" fontWeight="700">α</text>
        <text x="60" y="318" fontSize="12.5" fill="#8a3a2a" fontWeight="700">α 细胞（约 20%）→ 胰高血糖素</text>
        <text x="286" y="308" fontSize="12.5" fill="#8a3a2a" fontWeight="700">升血糖：促进肝糖原分解、</text>
        <text x="286" y="328" fontSize="12.5" fill="#8a3a2a" fontWeight="700">非糖物质转化</text>
      </g>
      {/* 拮抗 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">胰岛素 ↓ 与胰高血糖素 ↑ 拮抗作用——共同维持血糖 3.9~6.1 mmol/L 稳态</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">胰岛 · 血糖调节的内分泌细胞群</text>
    </svg>
  );
}

/* ================= 孑遗植物（活化石） ================= */

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

/* ================= 蜗牛（软体动物） ================= */

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

/* ================= 肝脏（最大的消化腺） ================= */

function LiverSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 外形 */}
      <g style={dim(active, 0)}>
        <path d="M70 130 Q 130 84 240 88 Q 350 92 408 128 Q 436 148 420 186 Q 400 236 330 244 Q 250 252 200 238 Q 110 250 74 206 Q 52 168 70 130 Z" fill="#8a3a3a" stroke="#5a2020" strokeWidth="3" />
        <path d="M232 90 Q 240 150 236 244" fill="none" stroke="#5a2020" strokeWidth="2.2" opacity="0.7" />
        <text x="96" y="70" fontSize="12.5" fill="#5a2020" fontWeight="700">肝（右叶大·左叶小）</text>
        <text x="380" y="286" fontSize="12.5" fill="#5a2020" fontWeight="700">成人体内约 1.5 kg</text>
        <line x1="376" y1="280" x2="330" y2="246" stroke="#5a2020" strokeWidth="1.3" strokeDasharray="3 3" />
      </g>
      {/* 胆囊与胆汁 */}
      <g style={dim(active, 1)}>
        <path d="M300 240 Q 306 268 336 274 Q 362 278 366 260 Q 368 246 344 238 Q 318 232 300 240 Z" fill="#7aa87a" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="330" y="308" textAnchor="middle" fontSize="12.5" fill="#3f7f3a" fontWeight="700">胆囊（储存浓缩胆汁）</text>
        <path d="M300 246 L 260 258 L 196 236" fill="none" stroke="#3f7f3a" strokeWidth="3.4" />
        <text x="120" y="288" fontSize="12.5" fill="#3f7f3a" fontWeight="700">胆汁经导管流入小肠</text>
        <line x1="180" y1="280" x2="220" y2="248" stroke="#3f7f3a" strokeWidth="1.3" />
      </g>
      {/* 肝小叶/肝细胞 */}
      <g style={dim(active, 2)}>
        <circle cx="130" cy="170" r="34" fill="#a5533c" stroke="#5a2020" strokeWidth="2" opacity="0.9" />
        <path d="M130 170 l 0 -34 m 0 34 l 30 17 m -30 -17 l -30 17" stroke="#f0d0b0" strokeWidth="2" />
        <text x="40" y="232" fontSize="12.5" fill="#8a5a2a" fontWeight="700">肝小叶（肝的基本单位）</text>
        <line x1="176" y1="226" x2="160" y2="206" stroke="#8a5a2a" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="42" y="100" fontSize="12.5" fill="#8a5a2a" fontWeight="700">合成肝糖原储存能量</text>
        <text x="42" y="120" fontSize="12.5" fill="#8a5a2a" fontWeight="700">血浆蛋白也在这里合成</text>
      </g>
      {/* 功能 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="346" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">三大功能：分泌胆汁（不含酶·乳化脂肪）· 解毒（转化氨等有毒物）· 物质转化枢纽</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#a5761d">肝细胞再生能力强——捐献部分肝后可逐渐恢复</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">肝脏 · 最大的消化腺与"化工厂"（课外拓展）</text>
    </svg>
  );
}

/* ================= 温室效应 ================= */

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

/* ================= 绦虫（扁形动物寄生代表） ================= */

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

/* ================= 胃的结构与消化 ================= */

function StomachSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 外形 */}
      <g style={dim(active, 0)}>
        <path d="M118 84 Q 96 78 90 100 Q 84 124 116 136 Q 160 260 246 292 Q 322 318 366 280 Q 396 254 386 212 L 380 168 Q 372 108 320 88 Q 220 66 118 84 Z" fill="#d88a6a" stroke="#a5533c" strokeWidth="3" />
        <text x="56" y="72" fontSize="12.5" fill="#a5533c" fontWeight="700">贲门（接食管）</text>
        <line x1="100" y1="78" x2="104" y2="94" stroke="#a5533c" strokeWidth="1.3" />
        <text x="396" y="238" fontSize="12.5" fill="#a5533c" fontWeight="700">幽门（接十二指肠）</text>
        <line x1="392" y1="242" x2="372" y2="252" stroke="#a5533c" strokeWidth="1.3" />
      </g>
      {/* 黏膜皱襞与胃腺 */}
      <g style={dim(active, 1)}>
        <path d="M150 140 q 20 34 34 84 m 36 -100 q 16 40 24 92 m 40 -104 q 12 44 12 96" fill="none" stroke="#a5533c" strokeWidth="2.4" opacity="0.7" />
        <text x="330" y="120" fontSize="12.5" fill="#8a3a2a" fontWeight="700">黏膜皱襞（拉伸展开）</text>
        <circle cx="196" cy="180" r="5" fill="#f4d06a" stroke="#8a671b" strokeWidth="1.6" />
        <circle cx="212" cy="196" r="5" fill="#f4d06a" stroke="#8a671b" strokeWidth="1.6" />
        <text x="330" y="146" fontSize="12.5" fill="#8a671b" fontWeight="700">胃腺：盐酸 + 胃蛋白酶原</text>
        <text x="330" y="168" fontSize="12.5" fill="#8a671b">盐酸杀菌·激活胃蛋白酶</text>
        <text x="330" y="188" fontSize="12.5" fill="#8a671b">胃蛋白酶分解蛋白质</text>
      </g>
      {/* 肌层蠕动 */}
      <g style={dim(active, 2)}>
        <path d="M240 96 q -24 90 6 190 m 60 -196 q -20 92 8 188" fill="none" stroke="#b05a3a" strokeWidth="4" opacity="0.5" />
        <text x="86" y="216" fontSize="12.5" fill="#8a4a2a" fontWeight="700">三层平滑肌收缩</text>
        <text x="86" y="236" fontSize="12.5" fill="#8a4a2a" fontWeight="700">搅拌+磨碎食物</text>
        <line x1="146" y1="224" x2="180" y2="210" stroke="#8a4a2a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 功能与屏障 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="322" width="440" height="44" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="340" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">功能：暂存食物 · 初步消化蛋白质（蛋白质 → 多肽）</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11.5" fill="#a5761d">黏液-碳酸氢盐屏障挡住盐酸——屏障受损则发生胃炎、胃溃疡</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">胃 · 消化管最膨大的部分（课外拓展）</text>
    </svg>
  );
}

/* ================= 种子的传播 ================= */

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

/* ================= 珊瑚虫（造礁刺胞动物） ================= */

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

/* ================= 大脑皮层功能区 ================= */

function CerebralCortexSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 大脑轮廓（侧面） */}
      <g style={dim(active, 0)}>
        <path d="M110 190 Q 96 96 210 72 Q 340 50 400 130 Q 420 190 386 240 Q 340 300 250 306 Q 160 310 126 252 Q 108 220 110 190 Z" fill="#e8d8d0" stroke="#a5765a" strokeWidth="3" />
        <path d="M170 100 q 30 20 6 46 q -22 24 6 44 m 60 -110 q 26 22 4 50 q -20 26 8 46 m 66 -96 q 24 24 2 50" fill="none" stroke="#c9a08a" strokeWidth="2" opacity="0.7" />
        <text x="42" y="310" fontSize="12.5" fill="#a5765a" fontWeight="700">大脑皮层（约 2~3 mm 厚·140 亿神经元）</text>
      </g>
      {/* 运动区（中央前回） */}
      <g style={dim(active, 1)}>
        <path d="M212 84 q 16 40 -2 96 l 26 4 q 20 -58 4 -104 Z" fill="#f4b87a" stroke="#8a5a1d" strokeWidth="2" />
        <text x="238" y="70" fontSize="12.5" fill="#8a5a1d" fontWeight="700">躯体运动中枢</text>
        <text x="238" y="88" fontSize="12.5" fill="#8a5a1d">（对侧支配·倒置分布）</text>
        <line x1="236" y1="76" x2="226" y2="88" stroke="#8a5a1d" strokeWidth="1.2" />
      </g>
      {/* 感觉区（中央后回） */}
      <g style={dim(active, 2)}>
        <path d="M178 92 q 20 42 4 100 l 24 4 q 16 -62 0 -108 Z" fill="#b8d8b0" stroke="#3f7f3a" strokeWidth="2" />
        <text x="66" y="120" fontSize="12.5" fill="#2f6f2a" fontWeight="700">躯体感觉中枢</text>
        <text x="66" y="138" fontSize="12.5" fill="#2f6f2a">（管理对侧躯体感觉）</text>
        <line x1="150" y1="128" x2="184" y2="136" stroke="#2f6f2a" strokeWidth="1.2" />
      </g>
      {/* 语言与视听区 */}
      <g style={dim(active, 3)}>
        <ellipse cx="352" cy="196" rx="30" ry="22" fill="#d8c0e0" stroke="#7a4a8a" strokeWidth="2" />
        <text x="394" y="186" fontSize="12.5" fill="#7a4a8a" fontWeight="700">语言中枢（人类特有）</text>
        <text x="394" y="204" fontSize="12.5" fill="#7a4a8a">S区说话 · H区听懂</text>
        <ellipse cx="322" cy="108" rx="26" ry="18" fill="#a8c8e8" stroke="#2c5a84" strokeWidth="2" />
        <text x="42" y="72" fontSize="12.5" fill="#2c5a84" fontWeight="700">视觉中枢</text>
        <line x1="96" y1="76" x2="296" y2="104" stroke="#2c5a84" strokeWidth="1.2" />
        <ellipse cx="322" cy="262" rx="24" ry="16" fill="#f0d090" stroke="#8a671b" strokeWidth="2" />
        <text x="42" y="276" fontSize="12.5" fill="#8a671b" fontWeight="700">听觉中枢</text>
        <line x1="96" y1="272" x2="298" y2="264" stroke="#8a671b" strokeWidth="1.2" />
      </g>
      {/* 考点 */}
      <g style={dim(active, 4)}>
        <rect x="40" y="318" width="440" height="46" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="336" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">考点：中央前回倒置管理对侧运动（头面部正立）· 言语区受损致失语症</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">S 区受损：能听懂写不出（运动性失语）· H 区受损：听不懂（听觉性失语）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">大脑皮层 · 功能定位（课内拓展）</text>
    </svg>
  );
}

/* ================= 红树林（海岸卫士） ================= */

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

/* ================= 蜘蛛（蛛形纲） ================= */

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

/* ================= 脊髓（低级中枢与传导通路） ================= */

function SpinalCordSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 横切面 */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="170" rx="86" ry="64" fill="#f0e8dc" stroke="#b5a582" strokeWidth="3" />
        <path d="M250 130 q -40 -6 -52 18 q -10 22 12 30 q -14 16 4 32 q 20 16 36 -2 q 16 18 36 2 q 18 -16 4 -32 q 22 -8 12 -30 q -12 -24 -52 -18 Z" fill="#c9b0b8" stroke="#8a5a6a" strokeWidth="2.4" />
        <text x="358" y="140" fontSize="12.5" fill="#8a5a6a" fontWeight="700">灰质（蝴蝶形·神经元胞体）</text>
        <line x1="364" y1="144" x2="316" y2="162" stroke="#8a5a6a" strokeWidth="1.2" />
        <text x="368" y="206" fontSize="12.5" fill="#8a7a4a" fontWeight="700">白质（神经纤维传导束）</text>
        <line x1="364" y1="202" x2="322" y2="190" stroke="#8a7a4a" strokeWidth="1.2" />
      </g>
      {/* 脊神经根 */}
      <g style={dim(active, 1)}>
        <path d="M168 128 Q 116 116 84 96" fill="none" stroke="#4d7ea8" strokeWidth="5" strokeLinecap="round" />
        <path d="M168 216 Q 116 228 84 248" fill="none" stroke="#b0483a" strokeWidth="5" strokeLinecap="round" />
        <circle cx="128" cy="116" r="7" fill="#4d7ea8" stroke="#2c5a84" strokeWidth="1.8" />
        <text x="42" y="76" fontSize="12.5" fill="#2c5a84" fontWeight="700">背根（传入·感觉）</text>
        <text x="42" y="94" fontSize="12.5" fill="#2c5a84">背根神经节</text>
        <text x="42" y="298" fontSize="12.5" fill="#a53030" fontWeight="700">腹根（传出·运动）</text>
      </g>
      {/* 功能 */}
      <g style={dim(active, 2)}>
        <path d="M332 120 Q 420 70 448 44" fill="none" stroke="#3f7f3a" strokeWidth="4" strokeLinecap="round" />
        <path d="M448 44 l -12 2 m 12 -2 l -2 12" fill="none" stroke="#3f7f3a" strokeWidth="4" strokeLinecap="round" />
        <path d="M332 224 Q 420 272 448 300" fill="none" stroke="#8a671b" strokeWidth="4" strokeLinecap="round" />
        <path d="M448 300 l -2 -12 m 2 12 l -12 -2" fill="none" stroke="#8a671b" strokeWidth="4" strokeLinecap="round" />
        <text x="330" y="52" fontSize="12.5" fill="#2f6f2a" fontWeight="700">上行传导：感觉 → 脑</text>
        <text x="300" y="322" fontSize="12.5" fill="#8a671b" fontWeight="700">下行传导：脑 → 运动</text>
        <text x="96" y="344" fontSize="12.5" fill="#4b6c73" fontWeight="700">反射中枢：膝跳反射、排尿反射的低级中枢在脊髓</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">脊髓 · 反射中枢与上传下达的"信息高速路"</text>
    </svg>
  );
}

/* ================= 树的年轮 ================= */

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

/* ================= 蜻蜓（半变态昆虫） ================= */

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

/* ================= 喉与声带（发声原理） ================= */

function LarynxSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 气道 */}
      <g style={dim(active, 0)}>
        <path d="M216 60 q 44 -14 88 0 l -10 60 q -34 -10 -68 0 Z" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2.6" />
        <path d="M230 120 q 30 26 60 0 l 16 96 q -46 22 -92 0 Z" fill="#e8c9a8" stroke="#a5765a" strokeWidth="2.6" />
        <text x="330" y="84" fontSize="12.5" fill="#8a5a3a" fontWeight="700">咽（食物与气体共用通道）</text>
        <line x1="326" y1="88" x2="296" y2="84" stroke="#8a5a3a" strokeWidth="1.2" />
        <text x="330" y="230" fontSize="12.5" fill="#8a5a3a" fontWeight="700">气管（软骨环支撑）</text>
        <line x1="326" y1="234" x2="292" y2="220" stroke="#8a5a3a" strokeWidth="1.2" />
      </g>
      {/* 声带 */}
      <g style={dim(active, 1)}>
        <path d="M234 176 q 26 20 52 0 l -6 14 q -20 12 -40 0 Z" fill="#d86a6a" stroke="#a53030" strokeWidth="2.4" />
        <text x="60" y="170" fontSize="12.5" fill="#a53030" fontWeight="700">声带（两片弹性黏膜皱襞）</text>
        <text x="60" y="190" fontSize="12.5" fill="#a53030">气流冲击振动 → 发出声音</text>
        <line x1="200" y1="180" x2="232" y2="182" stroke="#a53030" strokeWidth="1.2" />
        <text x="330" y="182" fontSize="12.5" fill="#8a3a2a" fontWeight="700">男声带长厚 → 音调低</text>
        <text x="330" y="202" fontSize="12.5" fill="#8a3a2a">青春期变声的由来</text>
      </g>
      {/* 会厌 */}
      <g style={dim(active, 2)}>
        <path d="M228 128 q 32 22 64 0 q -6 26 -32 26 q -26 0 -32 -26 Z" fill="#c9a05a" stroke="#8a671b" strokeWidth="2.2" />
        <text x="42" y="120" fontSize="12.5" fill="#8a671b" fontWeight="700">会厌软骨（吞咽时盖住喉口）</text>
        <text x="42" y="140" fontSize="12.5" fill="#8a671b">防食物入气管——吃饭说笑易呛</text>
      </g>
      {/* 原理 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="300" width="440" height="60" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">发声三要素：肺部气流（动力）+ 声带振动（声源）+ 口腔舌唇（共鸣与吐字）</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#a5761d">音调由声带振动频率决定（紧张度·长度）· 音量由气流强度决定</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">喉与声带 · 人为什么会说话（课外拓展）</text>
    </svg>
  );
}

/* ================= 种子的休眠 ================= */

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

/* ================= 螳螂（捕捉足与拟态） ================= */

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

/* ================= 鼻与嗅觉 ================= */

function NasalCavitySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 鼻腔剖面 */}
      <g style={dim(active, 0)}>
        <path d="M150 80 q -16 60 -6 130 q 4 34 22 54 l 60 0 q -30 -30 -30 -80 q 0 -56 18 -104 Z" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2.8" />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M158 ${104 + i * 34} q 24 -8 44 2`} fill="none" stroke="#c99a7a" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="46" y="70" fontSize="12.5" fill="#8a5a3a" fontWeight="700">鼻前庭（鼻毛滤尘）</text>
        <text x="46" y="90" fontSize="12.5" fill="#8a5a3a" fontWeight="700">鼻甲（加温加湿）</text>
        <line x1="130" y1="96" x2="158" y2="108" stroke="#8a5a3a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 嗅黏膜 */}
      <g style={dim(active, 1)}>
        <path d="M224 88 q 10 36 8 76 q -2 28 -14 52" fill="none" stroke="#b07898" strokeWidth="7" strokeLinecap="round" opacity="0.8" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={232 + (i % 2) * 10} cy={104 + i * 22} r="4.5" fill="#8a4a6a" stroke="#5a2a4a" strokeWidth="1.2" />
        ))}
        <text x="330" y="96" fontSize="12.5" fill="#8a4a6a" fontWeight="700">嗅黏膜（鼻腔顶部的黄褐色区域）</text>
        <text x="330" y="116" fontSize="12.5" fill="#8a4a6a">嗅细胞 = 唯一暴露于体表的神经元</text>
        <line x1="326" y1="110" x2="252" y2="130" stroke="#8a4a6a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 嗅觉传导 */}
      <g style={dim(active, 2)}>
        <path d="M238 92 Q 260 56 300 44" fill="none" stroke="#4d7ea8" strokeWidth="3.4" />
        <ellipse cx="330" cy="40" rx="40" ry="18" fill="#d8c0e0" stroke="#7a4a8a" strokeWidth="2.2" />
        <text x="382" y="52" fontSize="12.5" fill="#7a4a8a" fontWeight="700">嗅球 → 嗅神经</text>
        <text x="382" y="72" fontSize="12.5" fill="#7a4a8a">→ 大脑嗅觉中枢</text>
        <text x="46" y="210" fontSize="12.5" fill="#2c5a84" fontWeight="700">人类约 400 种嗅觉受体</text>
        <text x="46" y="230" fontSize="12.5" fill="#2c5a84">可分辨约 1 万亿种气味</text>
      </g>
      {/* 与味觉协同 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="270" width="440" height="90" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="296" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"味道"= 味觉（舌·酸甜苦咸鲜）+ 嗅觉（鼻后气味）的协同</text>
        <text x="260" y="320" textAnchor="middle" fontSize="11.5" fill="#a5761d">感冒鼻塞时吃饭不香——嗅觉通路被堵，只剩味觉的五种基本味</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">气味分子必须溶于嗅黏膜的黏液才能刺激嗅细胞（湿的鼻子才灵敏）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">鼻与嗅觉 · 化学感受（课外拓展）</text>
    </svg>
  );
}

/* ================= 疫苗的种类 ================= */

function VaccineTypesSvg({ active }: { active: number | null; open?: boolean }) {
  const vaccines = [
    { n: '减毒活疫苗', ex: '麻疹·水痘·卡介苗', d: '毒力减弱的活病毒/菌·免疫强而持久', c: '#3f7f3a' },
    { n: '灭活疫苗', ex: '狂犬·流感·新冠灭活', d: '加热/甲醛杀死的病原·安全但需加强针', c: '#2c5a84' },
    { n: '亚单位/类毒素', ex: '乙肝·百白破', d: '只用病原的蛋白片段或解毒毒素', c: '#8a671b' },
    { n: 'mRNA/载体疫苗', ex: '新冠 mRNA·埃博拉', d: '递送"图纸"让细胞自己造抗原', c: '#7a4a8a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {vaccines.map((v, i) => (
        <g key={v.n} style={dim(active, i)}>
          <rect x="36" y={52 + i * 62} width="448" height="52" rx="12" fill="#f8faf6" stroke={v.c} strokeWidth="2.4" />
          <text x="54" y={74 + i * 62} fontSize="13" fill={v.c} fontWeight="800">{v.n}</text>
          <text x="200" y={74 + i * 62} fontSize="11" fill="#59767c">{v.ex}</text>
          <text x="54" y={94 + i * 62} fontSize="11" fill="#59767c">{v.d}</text>
        </g>
      ))}
      <g style={dim(active, 4)}>
        <rect x="40" y="316" width="440" height="50" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="260" y="336" textAnchor="middle" fontSize="12.5" fill="#2c5a84" fontWeight="800">共同原理：抗原（无害）→ 初次免疫产生记忆细胞 → 再次遇到病原时二次免疫更快更强</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#537078">免疫最强：减毒活 &gt; 灭活 &gt; 亚单位；最安全：亚单位/mRNA（不含完整病原）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">疫苗的种类 · 人工主动免疫（课外拓展）</text>
    </svg>
  );
}

/* ================= 乌贼（头足纲） ================= */

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

/* ================= 扁桃体（咽喉守门员） ================= */

function TonsilSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 口咽腔 */}
      <g style={dim(active, 0)}>
        <path d="M170 90 Q 260 62 350 90 Q 386 170 350 268 Q 260 300 170 268 Q 134 170 170 90 Z" fill="#f0b8a8" stroke="#a54838" strokeWidth="2.8" />
        <path d="M206 96 Q 260 78 314 96 Q 322 110 314 120 Q 260 104 206 120 Q 198 110 206 96 Z" fill="#d88a6a" stroke="#a54838" strokeWidth="1.8" />
        <text x="260" y="78" textAnchor="middle" fontSize="12.5" fill="#8a3a2a" fontWeight="700">口咽腔（食物与气体的十字路口）</text>
      </g>
      {/* 腭扁桃体 */}
      <g style={dim(active, 1)}>
        <ellipse cx="212" cy="176" rx="26" ry="40" fill="#d86a6a" stroke="#a53030" strokeWidth="2.6" />
        <ellipse cx="308" cy="176" rx="26" ry="40" fill="#d86a6a" stroke="#a53030" strokeWidth="2.6" />
        {[0, 1, 2].map((i) => (
          <circle key={`l${i}`} cx={206 + (i % 2) * 12} cy={160 + i * 20} r="2.6" fill="#8a2020" />
        ))}
        <text x="60" y="140" fontSize="12.5" fill="#a53030" fontWeight="700">腭扁桃体（一对）</text>
        <text x="60" y="160" fontSize="12.5" fill="#a53030">表面的隐窝 诱捕病原菌</text>
        <line x1="150" y1="150" x2="188" y2="164" stroke="#a53030" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 免疫功能 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={250 + (i % 3) * 10} cy={168 + Math.floor(i / 3) * 16} r="3.4" fill="#4d7ea8" stroke="#2c5a84" strokeWidth="1" />
        ))}
        <text x="330" y="230" fontSize="12.5" fill="#2c5a84" fontWeight="700">淋巴细胞密集：</text>
        <text x="330" y="250" fontSize="12.5" fill="#2c5a84">5~7 岁免疫最活跃的"练兵场"</text>
        <text x="330" y="270" fontSize="12.5" fill="#2c5a84">属于第二道防线周边的免疫关卡</text>
      </g>
      {/* 发炎 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="296" width="440" height="60" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"扁桃体发炎" = 免疫系统正在战斗：红肿热痛是炎症反应的表现</text>
        <text x="260" y="342" textAnchor="middle" fontSize="11.5" fill="#a5761d">反复化脓性发炎才考虑切除——它毕竟是前线的免疫器官，不轻易摘</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">扁桃体 · 咽喉的免疫关卡（课外拓展）</text>
    </svg>
  );
}

/* ================= 肠道菌群（微生物组） ================= */

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

/* ================= 蜜蜂（社会性昆虫） ================= */

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

/* ================= 牙齿（消化第一关） ================= */

function ToothSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 三种牙 */}
      <g style={dim(active, 0)}>
        <path d="M92 110 q 0 -26 22 -26 q 22 0 22 26 l -4 44 q -18 12 -36 0 Z" fill="#f4f0e8" stroke="#b5a582" strokeWidth="2.4" />
        <text x="114" y="180" textAnchor="middle" fontSize="12.5" fill="#8a6a3a" fontWeight="700">门齿（切）</text>
        <path d="M210 84 l 36 -12 q 12 -2 12 14 l -6 62 q -24 12 -44 2 Z" fill="#f4f0e8" stroke="#b5a582" strokeWidth="2.4" />
        <text x="236" y="180" textAnchor="middle" fontSize="12.5" fill="#8a6a3a" fontWeight="700">犬齿（撕）</text>
        <path d="M330 92 q 4 -22 26 -22 q 24 0 26 24 l -2 34 l -10 10 l -8 -8 l -10 8 l -10 -8 Z" fill="#f4f0e8" stroke="#b5a582" strokeWidth="2.4" />
        <text x="356" y="180" textAnchor="middle" fontSize="12.5" fill="#8a6a3a" fontWeight="700">臼齿（磨）</text>
        <text x="240" y="212" textAnchor="middle" fontSize="12.5" fill="#6a5a2a" fontWeight="700">牙齿分化 = 哺乳动物特征（与爬行同型齿对比）</text>
      </g>
      {/* 结构剖面 */}
      <g style={dim(active, 1)}>
        <path d="M120 226 q 0 -30 30 -30 q 30 0 30 30 l -6 74 q -24 14 -48 0 Z" fill="#f8f6ee" stroke="#b5a582" strokeWidth="2.6" />
        <path d="M124 224 q 0 -24 26 -24 q 26 0 26 24 l -5 70 q -21 11 -42 0 Z" fill="#fdf9ee" stroke="#e0d8c0" strokeWidth="2" />
        <path d="M148 196 v 96 m -16 -20 q 16 -10 32 0" fill="none" stroke="#c9a05a" strokeWidth="2" />
        <text x="176" y="240" fontSize="12.5" fill="#8a7a4a" fontWeight="700">釉质（人体最硬）</text>
        <text x="176" y="264" fontSize="12.5" fill="#8a7a4a" fontWeight="700">牙本质 · 牙髓（神经血管）</text>
        <line x1="172" y1="236" x2="152" y2="222" stroke="#8a7a4a" strokeWidth="1.2" />
        <text x="60" y="330" fontSize="12.5" fill="#6a5a2a" fontWeight="700">牙根埋在牙槽骨·牙周膜固定</text>
      </g>
      {/* 龋齿 */}
      <g style={dim(active, 2)}>
        <path d="M370 230 q 0 -26 26 -26 q 26 0 26 26 l -4 66 q -22 12 -44 0 Z" fill="#f4f0e8" stroke="#b5a582" strokeWidth="2.4" />
        <ellipse cx="386" cy="242" rx="9" ry="7" fill="#6a4a2a" stroke="#3a2a1a" strokeWidth="1.6" />
        <text x="430" y="246" fontSize="12.5" fill="#6a4a2a" fontWeight="700">龋洞（蛀牙）</text>
        <text x="330" y="330" fontSize="12.5" fill="#8a671b" fontWeight="700">糖 + 变形链球菌 → 酸腐蚀釉质</text>
      </g>
      {/* 保护 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">消化从口腔开始：牙齿物理研磨 + 唾液淀粉酶化学分解——细嚼慢咽减轻胃的负担</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">牙齿 · 消化的第一道工序（课外拓展）</text>
    </svg>
  );
}

/* ================= 抗生素（青霉素与耐药性） ================= */

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

/* ================= 鳄鱼（爬行纲的"例外"） ================= */

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

/* ================= 大肠与阑尾 ================= */

function LargeIntestineSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 大肠走形 */}
      <g style={dim(active, 0)}>
        <path d="M170 110 L 380 110 Q 404 110 404 134 L 404 190 Q 404 214 380 214 L 150 214 Q 126 214 126 238 L 126 270 Q 126 294 150 294 L 210 294"
          fill="none" stroke="#c9a06a" strokeWidth="34" strokeLinecap="round" />
        <path d="M170 110 L 380 110 Q 404 110 404 134 L 404 190 Q 404 214 380 214 L 150 214 Q 126 214 126 238 L 126 270 Q 126 294 150 294 L 210 294"
          fill="none" stroke="#e0b878" strokeWidth="24" strokeLinecap="round" />
        <text x="250" y="86" fontSize="12.5" fill="#a5763a" fontWeight="700">结肠（升→横→降→乙状）</text>
        <text x="252" y="330" fontSize="12.5" fill="#a5763a" fontWeight="700">直肠（暂存粪便·排便反射）</text>
        <line x1="212" y1="296" x2="238" y2="318" stroke="#a5763a" strokeWidth="1.2" />
      </g>
      {/* 盲肠与阑尾 */}
      <g style={dim(active, 1)}>
        <path d="M136 106 Q 108 112 110 138 Q 112 160 136 158 L 158 128 Q 152 108 136 106 Z" fill="#c9a06a" stroke="#a5763a" strokeWidth="2.6" />
        <path d="M118 152 q -14 34 -6 62 q 14 -6 18 -26 q 4 -20 4 -34" fill="#b88a5a" stroke="#8a5a2a" strokeWidth="2.4" />
        <text x="42" y="196" fontSize="12.5" fill="#8a5a2a" fontWeight="700">盲肠+阑尾</text>
        <text x="42" y="216" fontSize="12.5" fill="#8a5a2a">阑尾是免疫器官（富含淋巴）</text>
        <text x="42" y="236" fontSize="12.5" fill="#8a5a2a">梗阻发炎 → 转移性右下腹痛</text>
      </g>
      {/* 功能 */}
      <g style={dim(active, 2)}>
        <rect x="300" y="240" width="170" height="66" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="385" y="262" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">三大任务</text>
        <text x="385" y="282" textAnchor="middle" fontSize="11" fill="#3f7f3a">吸收水分与无机盐</text>
        <text x="385" y="298" textAnchor="middle" fontSize="11" fill="#3f7f3a">合成维生素 K · 形成粪便</text>
      </g>
      {/* 健康 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="344" width="440" height="30" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="260" y="365" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">膳食纤维增加残渣刺激蠕动 · 大肠癌早期信号：排便习惯改变·便血</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">大肠 · 水分回收站（课外拓展）</text>
    </svg>
  );
}

/* ================= 生态系统的服务 ================= */

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

/* ================= 企鹅（鸟类的"例外"） ================= */

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

/* ================= 骨髓（造血工厂） ================= */

function BoneMarrowSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 骨骼剖面 */}
      <g style={dim(active, 0)}>
        <path d="M180 60 h 160 q 20 0 20 22 v 180 q 0 22 -20 22 h -160 q -20 0 -20 -22 v -180 q 0 -22 20 -22 Z" fill="#f4f0e4" stroke="#b5a582" strokeWidth="3" />
        <path d="M188 68 h 144 v 30 h -144 Z M 188 246 h 144 v 30 h -144 Z" fill="#e8e4d4" stroke="#c9b88a" strokeWidth="1.8" />
        <rect x="196" y="104" width="128" height="136" rx="10" fill="#c96a6a" stroke="#8a3030" strokeWidth="2.4" />
        <text x="260" y="130" textAnchor="middle" fontSize="12.5" fill="#5a2020" fontWeight="800">红骨髓（长骨中段剖面）</text>
        <text x="42" y="96" fontSize="12.5" fill="#8a7a4a" fontWeight="700">骨密质（外层坚硬）</text>
        <line x1="150" y1="92" x2="196" y2="80" stroke="#8a7a4a" strokeWidth="1.2" />
      </g>
      {/* 造血干细胞 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={222 + (i % 3) * 38} cy={162 + Math.floor(i / 3) * 40} r="10" fill="#e8a0a0" stroke="#8a3030" strokeWidth="1.8" />
        ))}
        <text x="42" y="150" fontSize="12.5" fill="#8a3030" fontWeight="700">造血干细胞（专能）</text>
        <text x="42" y="170" fontSize="12.5" fill="#8a3030">终身更新各种血细胞</text>
        <line x1="150" y1="154" x2="214" y2="162" stroke="#8a3030" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 三系分化 */}
      <g style={dim(active, 2)}>
        <text x="42" y="210" fontSize="12" fill="#a53030" fontWeight="700">→ 红细胞（运 O₂）</text>
        <text x="42" y="230" fontSize="12" fill="#2c5a84" fontWeight="700">→ 白细胞（防御）</text>
        <text x="42" y="250" fontSize="12" fill="#8a671b" fontWeight="700">→ 血小板（凝血）</text>
        <text x="56" y="290" fontSize="12.5" fill="#4b6c73" fontWeight="700">5 岁后长骨两端与髂骨的红骨髓保持造血（其余黄骨髓化）</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="316" width="440" height="50" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="336" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">白血病 = 造血干细胞恶变 → 骨髓移植重建造血与免疫（"配型"即 HLA 相容）</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">脐带血含丰富造血干细胞——是重要的移植来源</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">骨髓 · 人体的"造血工厂"（课外拓展）</text>
    </svg>
  );
}

/* ================= 菌根（真菌与根的联盟） ================= */

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

/* ================= 比目鱼（眼睛搬家） ================= */

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

/* ================= 肾上腺（应急激素腺） ================= */

function AdrenalSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 位置 */}
      <g style={dim(active, 0)}>
        <path d="M150 96 q -40 -16 -44 28 q -4 44 30 48 q 34 4 40 -30 q 4 -30 -26 -46 Z" fill="#f0d8b0" stroke="#a5763a" strokeWidth="2.6" />
        <path d="M370 96 q 40 -16 44 28 q 4 44 -30 48 q -34 4 -40 -30 q -4 -30 26 -46 Z" fill="#f0d8b0" stroke="#a5763a" strokeWidth="2.6" />
        <ellipse cx="112" cy="230" rx="36" ry="52" fill="#c9a08a" stroke="#8a6a4a" strokeWidth="2" opacity="0.75" />
        <ellipse cx="408" cy="230" rx="36" ry="52" fill="#c9a08a" stroke="#8a6a4a" strokeWidth="2" opacity="0.75" />
        <text x="330" y="286" fontSize="12.5" fill="#8a6a4a" fontWeight="700">肾（左右各一·肾上腺覆盖其上）</text>
        <line x1="370" y1="318" x2="404" y2="282" stroke="#8a6a4a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 皮质 */}
      <g style={dim(active, 1)}>
        <ellipse cx="132" cy="120" rx="40" ry="46" fill="#e8b86a" stroke="#a5763a" strokeWidth="2.4" />
        <text x="196" y="100" fontSize="12.5" fill="#a5763a" fontWeight="700">皮质（外层·三类激素）</text>
        <text x="196" y="120" fontSize="12.5" fill="#a5763a">糖皮质激素：升高血糖·抗炎抗过敏</text>
        <text x="196" y="140" fontSize="12.5" fill="#a5763a">盐皮质激素：保钠保水（醛固酮）</text>
      </g>
      {/* 髓质 */}
      <g style={dim(active, 2)}>
        <ellipse cx="132" cy="122" rx="18" ry="22" fill="#c96a6a" stroke="#8a2020" strokeWidth="2.2" />
        <text x="196" y="170" fontSize="12.5" fill="#8a2020" fontWeight="700">髓质（内层·应急反应）</text>
        <text x="196" y="190" fontSize="12.5" fill="#8a2020">肾上腺素：心跳加快·血压升高</text>
        <text x="196" y="210" fontSize="12.5" fill="#8a2020">血糖升高——"应激"的化学基础</text>
      </g>
      {/* 应急 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="300" width="440" height="56" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"吓得脸白手抖"：交感神经 + 肾上腺髓质的协同应急反应</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#a5761d">皮质激素还参与昼夜节律：早晨皮质醇高峰让人清醒（熬夜打乱它）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">肾上腺 · 应激反应的化学引擎（课外拓展）</text>
    </svg>
  );
}

/* ================= 内共生学说 ================= */

function EndosymbiosisSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 证据列表 */}
      <g style={dim(active, 0)}>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="36" y={54 + i * 54} width="290" height="46" rx="10" fill={i % 2 === 0 ? '#e2f0e2' : '#e4ecf6'} stroke={i % 2 === 0 ? '#3f7f3a' : '#4d7ea8'} strokeWidth="2.2" />
        ))}
        <text x="52" y="72" fontSize="12" fill="#2f6f2a" fontWeight="700">① 自主复制：拥有自身 DNA · 随细胞分裂复制</text>
        <text x="52" y="126" fontSize="12" fill="#2c5a84" fontWeight="700">② 双层膜：内膜来自原细菌·外膜来自吞噬泡</text>
        <text x="52" y="180" fontSize="12" fill="#2f6f2a" fontWeight="700">③ 环状 DNA：与细菌相似（核基因组是线状）</text>
        <text x="52" y="234" fontSize="12" fill="#2c5a84" fontWeight="700">④ 自有核糖体：70S 型（细菌型）而非真核 80S</text>
      </g>
      {/* 共生过程示意 */}
      <g style={dim(active, 1)}>
        <ellipse cx="410" cy="110" rx="66" ry="48" fill="#f6f4ea" stroke="#8a9a8a" strokeWidth="2.6" />
        <path d="M400 62 q -30 10 -26 44 q 4 30 36 38 q -40 -10 -34 -50 q 6 -30 24 -32 Z" fill="#c9d8e8" stroke="#4d7ea8" strokeWidth="1.2" strokeDasharray="2 2" />
        <ellipse cx="408" cy="112" rx="24" ry="16" fill="#8ab86a" stroke="#3f7f3a" strokeWidth="2" />
        <text x="410" y="117" textAnchor="middle" fontSize="9.5" fill="#fff" fontWeight="700">细菌</text>
        <text x="410" y="186" textAnchor="middle" fontSize="11" fill="#37585f" fontWeight="700">原始真核细胞吞入好氧细菌</text>
        <text x="410" y="204" textAnchor="middle" fontSize="11" fill="#37585f">→ 演化为线粒体/叶绿体</text>
        <path d="M400 62 q -32 8 -28 46 q 4 34 40 40" fill="none" stroke="#4d7ea8" strokeWidth="3" />
      </g>
      {/* 意义 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="300" width="448" height="56" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">内共生学说：真核细胞的"发电厂"和"养料车间"曾是独立细菌</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#a5761d">这不仅解释了细胞器的起源，也说明了真核细胞的"组装式"演化历史</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">内共生学说 · 细胞器的起源（课外拓展）</text>
    </svg>
  );
}

/* ================= 水熊虫（缓步动物） ================= */

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

/* ================= 淋巴结（免疫过滤站） ================= */

function LymphNodeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 结体 */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="170" rx="120" ry="80" fill="#e8b8b8" stroke="#a54858" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={196 + i * 54} cy={140} rx="22" ry="14" fill="#d88a8a" stroke="#a54858" strokeWidth="1.8" />
        ))}
        <text x="380" y="126" fontSize="12.5" fill="#8a3a3a" fontWeight="700">皮质淋巴小结</text>
        <text x="380" y="146" fontSize="12.5" fill="#8a3a3a">（B 细胞聚居区）</text>
        <line x1="376" y1="132" x2="274" y2="140" stroke="#8a3a3a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 输入输出淋巴管 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${128 + i * 26} ${108 - (i % 2) * 12} q -26 -14 -44 -30`} fill="none" stroke="#4d7ea8" strokeWidth="4" strokeLinecap="round" />
        ))}
        <text x="42" y="58" fontSize="12.5" fill="#2c5a84" fontWeight="700">输入淋巴管（多条）</text>
        <path d="M370 216 q 40 16 66 40" fill="none" stroke="#2f6f2a" strokeWidth="6" strokeLinecap="round" />
        <text x="330" y="282" fontSize="12.5" fill="#2f6f2a" fontWeight="700">输出淋巴管（经"门"部）</text>
      </g>
      {/* 功能 */}
      <g style={dim(active, 2)}>
        <rect x="60" y="216" width="150" height="72" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="135" y="240" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">过滤站：拦截</text>
        <text x="135" y="260" textAnchor="middle" fontSize="11" fill="#37585f">淋巴液中的病原体</text>
        <text x="135" y="278" textAnchor="middle" fontSize="11" fill="#37585f">与癌细胞（转移前哨）</text>
        <rect x="300" y="300" width="180" height="56" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="390" y="322" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">活化场：T/B 细胞</text>
        <text x="390" y="342" textAnchor="middle" fontSize="11" fill="#3f7f3a">识别抗原后增殖分化</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <text x="30" y="332" fontSize="12.5" fill="#8a671b" fontWeight="700">"摸到淋巴结肿大"：免疫应答进行中</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">淋巴结 · 免疫系统的"边防哨所"（课外拓展）</text>
    </svg>
  );
}

/* ================= 端粒与细胞衰老 ================= */

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

/* ================= 萤火虫（生物发光） ================= */

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

/* ================= 垂体（内分泌总司令） ================= */

function PituitarySvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 位置：下丘脑下方 */}
      <g style={dim(active, 0)}>
        <path d="M220 84 q 40 -26 80 0 q 24 18 14 40 q -54 20 -108 0 q -10 -22 14 -40 Z" fill="#e8c9d8" stroke="#a5486a" strokeWidth="2.6" />
        <text x="322" y="80" fontSize="12.5" fill="#8a3a5a" fontWeight="700">下丘脑（节律与食欲中枢）</text>
        <line x1="318" y1="84" x2="296" y2="94" stroke="#8a3a5a" strokeWidth="1.2" />
        <path d="M260 124 v 22" stroke="#a5486a" strokeWidth="8" strokeLinecap="round" />
        <ellipse cx="260" cy="172" rx="30" ry="24" fill="#d86a8a" stroke="#8a2a4a" strokeWidth="2.6" />
        <text x="322" y="168" fontSize="12.5" fill="#8a2a4a" fontWeight="700">垂体（豌豆大小·约 0.6 g）</text>
        <text x="322" y="188" fontSize="12.5" fill="#8a2a4a">悬于下丘脑下方·蝶鞍内</text>
      </g>
      {/* 两种叶 */}
      <g style={dim(active, 1)}>
        <path d="M240 156 q 20 -14 40 0 q 6 18 0 32 q -20 10 -40 0 q -6 -14 0 -32 Z" fill="#e88aa8" stroke="#8a2a4a" strokeWidth="2" />
        <text x="46" y="242" fontSize="12.5" fill="#8a2a4a" fontWeight="700">腺垂体（前叶）分泌：</text>
        <text x="46" y="262" fontSize="12" fill="#8a2a4a">生长激素（巨人症/侏儒症）</text>
        <text x="46" y="280" fontSize="12" fill="#8a2a4a">促甲状腺激素·促性腺激素等</text>
      </g>
      <g style={dim(active, 2)}>
        <text x="330" y="242" fontSize="12.5" fill="#4a6a8a" fontWeight="700">神经垂体（后叶）释放：</text>
        <text x="330" y="262" fontSize="12" fill="#4a6a8a">抗利尿激素（缺尿崩症）</text>
        <text x="330" y="280" fontSize="12" fill="#4a6a8a">催产素（由下丘脑合成）</text>
      </g>
      {/* 总司令 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="304" width="440" height="56" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="328" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">"内分泌总司令"：分泌促激素指挥甲状腺·肾上腺皮质·性腺</text>
        <text x="260" y="348" textAnchor="middle" fontSize="11.5" fill="#a5761d">真正的"最高统帅"是下丘脑——它分泌激素控制垂体（神经-体液调节的枢纽）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">垂体 · 激素调节的"中转枢纽"（课外拓展）</text>
    </svg>
  );
}

/* ================= 含羞草（感震运动） ================= */

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

/* ================= 海马（雄性怀孕） ================= */

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

/* ================= 黄斑与盲点 ================= */

function MaculaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 眼底视图 */}
      <g style={dim(active, 0)}>
        <circle cx="220" cy="180" r="130" fill="#f8f0e8" stroke="#b5765a" strokeWidth="3" />
        <path d="M320 120 q 30 -26 40 -52" fill="none" stroke="#a54838" strokeWidth="5" strokeLinecap="round" />
        <path d="M352 76 q 14 4 12 18 m -12 -18 q 14 -4 20 8" fill="none" stroke="#a54838" strokeWidth="3.4" />
        <ellipse cx="300" cy="150" rx="20" ry="13" fill="#e8a03a" stroke="#8a671b" strokeWidth="2.4" />
        <text x="356" y="150" fontSize="12.5" fill="#8a671b" fontWeight="700">视盘（生理盲点）</text>
        <text x="356" y="170" fontSize="12.5" fill="#8a671b">神经与血管穿出·无视细胞</text>
        <line x1="352" y1="154" x2="322" y2="152" stroke="#8a671b" strokeWidth="1.2" />
      </g>
      {/* 黄斑 */}
      <g style={dim(active, 1)}>
        <ellipse cx="180" cy="210" rx="26" ry="20" fill="#f4d06a" stroke="#a58a2a" strokeWidth="2.4" opacity="0.85" />
        <circle cx="180" cy="210" r="7" fill="#8a671b" />
        <text x="60" y="258" fontSize="12.5" fill="#8a671b" fontWeight="700">黄斑（中央凹）</text>
        <text x="60" y="278" fontSize="12.5" fill="#8a671b">视锥细胞最密集·视觉最清晰</text>
        <line x1="120" y1="264" x2="160" y2="226" stroke="#8a671b" strokeWidth="1.2" />
      </g>
      {/* 视细胞 */}
      <g style={dim(active, 2)}>
        <rect x="330" y="220" width="150" height="100" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="405" y="244" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">两类感光细胞</text>
        <text x="405" y="266" textAnchor="middle" fontSize="11" fill="#37585f">视锥细胞：强光+彩色（700万）</text>
        <text x="405" y="286" textAnchor="middle" fontSize="11" fill="#37585f">视杆细胞：弱光+黑白（1.2亿）</text>
        <text x="405" y="306" textAnchor="middle" fontSize="10.5" fill="#799398">夜行动物视杆多·人黄斑全视锥</text>
      </g>
      {/* 盲点测试 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="318" width="440" height="46" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="336" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">盲点测试：闭右眼，左眼看"+"，书远近移动——十字消失处即盲点投射区</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">平时"看不到"盲点：大脑用周围图像自动补全（脑补的生理学依据）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">黄斑与盲点 · 视网膜上的"高清区"与"盲区"（课外拓展）</text>
    </svg>
  );
}

/* ================= 沼气池（微生物产能） ================= */

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

/* ================= 蜈蚣（多足纲） ================= */

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

/* ================= 肌节（肌肉收缩的单元） ================= */

function SarcomereSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 肌纤维到肌节 */}
      <g style={dim(active, 0)}>
        <text x="46" y="76" fontSize="12.5" fill="#37585f" fontWeight="700">放大三级：肌肉 → 肌纤维 → 肌原纤维 → 肌节</text>
        <path d="M60 96 h 400" stroke="#b0483a" strokeWidth="10" strokeLinecap="round" />
        <path d="M60 96 h 400" stroke="#e8a0a0" strokeWidth="4" strokeLinecap="round" strokeDasharray="14 10" />
      </g>
      {/* 肌节模式图 */}
      <g style={dim(active, 1)}>
        <path d="M80 150 v 90 m 360 0 v -90" stroke="#5a6a7a" strokeWidth="7" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={`t${i}`} d={`M${118 + i * 44} 144 v 100`} stroke="#4d7ea8" strokeWidth="5" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={`m${i}`} d={`M${140 + i * 44} 128 l 0 132`} stroke="#b0483a" strokeWidth="3.4" strokeDasharray="0" />
        ))}
        <text x="78" y="138" textAnchor="middle" fontSize="10" fill="#5a6a7a" fontWeight="700">Z线</text>
        <text x="260" y="122" textAnchor="middle" fontSize="10.5" fill="#4d7ea8" fontWeight="700">细肌丝（肌动蛋白）</text>
        <text x="260" y="284" textAnchor="middle" fontSize="10.5" fill="#b0483a" fontWeight="700">粗肌丝（肌球蛋白·带横桥）</text>
      </g>
      {/* 滑行机制 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="300" width="440" height="66" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="324" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">收缩 = 横桥摆动拖动细肌丝向 M 线滑行 → 肌节缩短（丝不等长·相互滑行）</text>
        <text x="260" y="346" textAnchor="middle" fontSize="11.5" fill="#a5761d">Ca²⁺ 结合肌钙蛋白暴露位点 · ATP 供能（"尸僵"正是 ATP 耗尽的横桥无法分离）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">肌节 · 肌肉收缩的分子机制（课外拓展）</text>
    </svg>
  );
}

/* ================= 冬虫夏草（真菌寄生） ================= */

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

/* ================= 白蚁（共生消化纤维素） ================= */

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

/* ================= 输血与血型凝集 ================= */

function BloodTransfusionSvg({ active }: { active: number | null; open?: boolean }) {
  const cells = [
    { abo: 'A 型', rbc: 'A 抗原', plasma: '抗 B 凝集素', give: 'A、AB', get: 'A、O', c: '#c94a4a' },
    { abo: 'B 型', rbc: 'B 抗原', plasma: '抗 A 凝集素', give: 'B、AB', get: 'B、O', c: '#4d7ea8' },
    { abo: 'AB 型', rbc: 'A+B 抗原', plasma: '无凝集素', give: 'AB', get: '全型（万能受血者）', c: '#8a671b' },
    { abo: 'O 型', rbc: '无抗原', plasma: '抗 A + 抗 B', give: 'O（万能供血者）', get: 'O', c: '#3f7f3a' },
  ];
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 凝集反应演示 */}
      <g style={dim(active, 0)}>
        <rect x="56" y="56" width="190" height="110" rx="12" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.4" />
        <text x="151" y="80" textAnchor="middle" fontSize="11.5" fill="#8a3a2a" fontWeight="800">错误输血：A 型血 + B 型血浆</text>
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={96 + (i % 2) * 30} cy={100 + Math.floor(i / 2) * 26} r="9" fill="#c94a4a" stroke="#8a2020" strokeWidth="1.6" />
        ))}
        <text x="111" y="88" fontSize="8.5" fill="#8a2020" fontWeight="700">A</text>
        <text x="151" y="126" textAnchor="middle" fontSize="10.5" fill="#8a3a2a" fontWeight="700">红细胞凝集成团 ✗</text>
        <text x="151" y="152" textAnchor="middle" fontSize="9.5" fill="#a5533c">抗 B 凝集素"抱团" A 抗原</text>
        <rect x="274" y="56" width="190" height="110" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="369" y="80" textAnchor="middle" fontSize="11.5" fill="#2f6f2a" fontWeight="800">正确输血：O 型 → A 型</text>
        {[0, 1, 2, 3].map((i) => (
          <circle key={`g${i}`} cx={314 + (i % 2) * 30} cy={100 + Math.floor(i / 2) * 26} r="9" fill="#7ab86a" stroke="#2f6f2a" strokeWidth="1.6" />
        ))}
        <text x="369" y="126" textAnchor="middle" fontSize="10.5" fill="#2f6f2a" fontWeight="700">红细胞均匀分散 ✓</text>
        <text x="369" y="152" textAnchor="middle" fontSize="9.5" fill="#3f7f3a">无对应抗原·不凝集</text>
      </g>
      {/* 表格 */}
      <g style={dim(active, 1)}>
        <rect x="40" y="184" width="440" height="112" rx="10" fill="#f8faf6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="60" y="208" fontSize="11" fill="#2c5a84" fontWeight="800">血型</text>
        <text x="150" y="208" fontSize="11" fill="#2c5a84" fontWeight="800">红细胞抗原</text>
        <text x="270" y="208" fontSize="11" fill="#2c5a84" fontWeight="800">血浆凝集素</text>
        <text x="388" y="208" fontSize="11" fill="#2c5a84" fontWeight="800">可接受（受血）</text>
        {cells.map((c, i) => (
          <g key={c.abo}>
            <text x="60" y={232 + i * 16} fontSize="10.5" fill={c.c} fontWeight="700">{c.abo}</text>
            <text x="150" y={232 + i * 16} fontSize="10.5" fill="#37585f">{c.rbc}</text>
            <text x="270" y={232 + i * 16} fontSize="10.5" fill="#59767c">{c.plasma}</text>
            <text x="388" y={232 + i * 16} fontSize="10.5" fill="#59767c">{c.get}</text>
          </g>
        ))}
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="308" width="440" height="56" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="330" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">原则：同型相输；紧急时 O 型可少量输给他人（"万能供血"也有限度）</text>
        <text x="260" y="350" textAnchor="middle" fontSize="11.5" fill="#a5761d">输血前必须做交叉配血试验——ABO 之外还有 Rh 系统等几十种血型</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">输血与血型 · 凝集反应（课外拓展）</text>
    </svg>
  );
}

/* ================= 菟丝子（寄生植物） ================= */

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

/* ================= 蜣螂（大自然的清道夫） ================= */

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

/* ================= 胎儿与胎盘 ================= */

function FetusPlacentaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 子宫轮廓 */}
      <g style={dim(active, 0)}>
        <path d="M130 90 Q 260 54 390 90 Q 420 170 390 260 Q 340 330 260 332 Q 180 330 130 260 Q 100 170 130 90 Z" fill="#e8b8a8" stroke="#a54838" strokeWidth="3" />
        <text x="56" y="72" fontSize="12.5" fill="#8a3a2a" fontWeight="700">子宫（胎儿发育的"温室"）</text>
      </g>
      {/* 胎盘 */}
      <g style={dim(active, 1)}>
        <ellipse cx="196" cy="150" rx="72" ry="40" fill="#8a3a3a" stroke="#5a2020" strokeWidth="2.6" />
        <text x="88" y="236" fontSize="12.5" fill="#5a2020" fontWeight="700">胎盘：物质交换的"中转海关"</text>
        <text x="88" y="256" fontSize="12.5" fill="#5a2020">母体血与胎儿血不直接混合</text>
        <text x="88" y="276" fontSize="12.5" fill="#5a2020">O₂·养料来 / CO₂·废物去</text>
      </g>
      {/* 胎儿与脐带 */}
      <g style={dim(active, 2)}>
        <path d="M220 176 Q 250 196 262 226" fill="none" stroke="#b05a5a" strokeWidth="9" strokeLinecap="round" />
        <text x="160" y="188" fontSize="11.5" fill="#8a3a2a" fontWeight="700">脐带（两条脐动脉·一条脐静脉）</text>
        <circle cx="286" cy="262" r="42" fill="#f0d8c8" stroke="#a5765a" strokeWidth="2.6" />
        <circle cx="274" cy="252" r="5" fill="#4a3a3a" />
        <path d="M304 268 q 10 4 14 12" fill="none" stroke="#a5765a" strokeWidth="2.4" />
        <text x="286" y="284" textAnchor="middle" fontSize="12.5" fill="#8a5a3a" fontWeight="700">胎儿（羊水中发育）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="298" width="440" height="60" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="322" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">胎儿红细胞自带"货"：胎儿的遗传物质一半来自父方——对母体是"半同种异物"</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">胎盘是屏障也是通道：药物·酒精·病毒（风疹/艾滋）都能通过——孕妇用药须谨慎</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">胎儿与胎盘 · 母胎物质交换（课外拓展）</text>
    </svg>
  );
}

/* ================= 咖啡因（植物的"防御武器"） ================= */

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

/* ================= 雀尾螳螂虾（"拳王"） ================= */

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

/* ================= 皮肤伤口愈合 ================= */

function WoundHealingSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 阶段 1 止血 */}
      <g style={dim(active, 0)}>
        <path d="M120 130 q 60 -22 130 0 q 40 12 80 0" fill="none" stroke="#c96a6a" strokeWidth="26" strokeLinecap="round" />
        <circle cx="260" cy="132" r="18" fill="#8a2020" stroke="#5a1010" strokeWidth="2.4" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={252 + i * 9} cy={128 + (i % 2) * 8} r="3" fill="#e8a0a0" />
        ))}
        <text x="42" y="98" fontSize="12.5" fill="#8a2020" fontWeight="700">① 止血（数分钟）：血小板聚集</text>
        <text x="42" y="118" fontSize="12.5" fill="#8a2020">纤维蛋白网结痂·封住伤口</text>
      </g>
      {/* 阶段 2 炎症 */}
      <g style={dim(active, 1)}>
        <path d="M120 210 q 60 -20 130 0 q 40 12 80 0" fill="none" stroke="#e0a08a" strokeWidth="24" strokeLinecap="round" />
        <ellipse cx="256" cy="206" rx="26" ry="14" fill="#c94a4a" stroke="#8a2020" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={244 + i * 7} cy={202 + (i % 2) * 8} r="3.4" fill="#ffffff" />
        ))}
        <text x="322" y="196" fontSize="12.5" fill="#8a2020" fontWeight="700">② 炎症（1~3 天）：白细胞</text>
        <text x="322" y="216" fontSize="12.5" fill="#8a2020">清除细菌与坏死组织（红肿）</text>
      </g>
      {/* 阶段 3 增生 */}
      <g style={dim(active, 2)}>
        <path d="M120 286 q 60 -18 130 0 q 40 12 80 0" fill="none" stroke="#e8c9a8" strokeWidth="22" strokeLinecap="round" />
        <path d="M180 280 q 80 -14 160 -2" fill="none" stroke="#d86a6a" strokeWidth="8" strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${210 + i * 30} 274 q 8 8 2 14`} fill="none" stroke="#5a8ab5" strokeWidth="2.4" />
        ))}
        <text x="42" y="272" fontSize="12.5" fill="#8a5a2a" fontWeight="700">③ 增生（3 天~3 周）：成纤维细胞</text>
        <text x="42" y="292" fontSize="12.5" fill="#8a5a2a">合成胶原·新血管长入（肉芽）</text>
      </g>
      {/* 重塑 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="316" width="440" height="52" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="338" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">④ 重塑（数月）：胶原重组·瘢痕变淡——四阶段环环相扣</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">感染·糖尿病·吸烟都会拖慢愈合——保持伤口清洁湿润反而好得快</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">伤口愈合 · 止血-炎症-增生-重塑（课外拓展）</text>
    </svg>
  );
}

/* ================= 黏菌（会"规划路线"的原生生物） ================= */

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

/* ================= 寄居蟹（背着"房子"的搬家高手） ================= */

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

/* ================= 发烧（体温调定点上移） ================= */

function FeverSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 体温曲线 */}
      <g style={dim(active, 0)}>
        <path d="M60 150 Q 130 148 180 132 Q 240 110 300 130 Q 360 150 400 142" fill="none" stroke="#b0483a" strokeWidth="3.4" />
        <path d="M60 190 h 340" stroke="#3f7f3a" strokeWidth="2" strokeDasharray="7 5" />
        <text x="404" y="194" fontSize="10" fill="#2f6f2a" fontWeight="700">37°C</text>
        <text x="60" y="120" fontSize="12.5" fill="#8a671b" fontWeight="700">致热原 → 下丘脑调定点上移 → 发烧</text>
        <text x="60" y="220" fontSize="12" fill="#4b6c73">体温调定点的"目标温度"被重设，身体主动产热"烧"上去</text>
      </g>
      {/* 免疫意义 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="244" width="200" height="70" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="146" y="268" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">适度发烧是"帮忙"</text>
        <text x="146" y="290" textAnchor="middle" fontSize="11" fill="#3f7f3a">增强免疫细胞活性</text>
        <text x="146" y="308" textAnchor="middle" fontSize="11" fill="#3f7f3a">抑制部分病原体繁殖</text>
      </g>
      {/* 注意 */}
      <g style={dim(active, 2)}>
        <rect x="274" y="244" width="200" height="70" rx="10" fill="#f4e0e0" stroke="#a54838" strokeWidth="2.2" />
        <text x="374" y="268" textAnchor="middle" fontSize="12" fill="#8a3a2a" fontWeight="800">过高则危险</text>
        <text x="374" y="290" textAnchor="middle" fontSize="11" fill="#a5533c">&gt;39~40°C 影响酶与神经</text>
        <text x="374" y="308" textAnchor="middle" fontSize="11" fill="#a5533c">高热惊厥需及时降温就医</text>
      </g>
      {/* 机制 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">寒战（骨骼肌产热）+ 皮肤血管收缩（散热减少）= 体温冲向新调定点</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#a5761d">退烧 = 调定点回落 → 出汗散热——"捂汗"并不能治发烧</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">发烧 · 调定点学说（课外拓展）</text>
    </svg>
  );
}

/* ================= 景天酸代谢（CAM） ================= */

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

/* ================= 杜鹃（巢寄生） ================= */

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

/* ================= 味蕾（五种基本味） ================= */

function TasteBudsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 舌面味区 */}
      <g style={dim(active, 0)}>
        <ellipse cx="250" cy="160" rx="150" ry="100" fill="#e88a8a" stroke="#a54858" strokeWidth="3" />
        <path d="M250 240 q -10 30 0 46 q 10 -16 0 -46" fill="#d87878" stroke="#a54858" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle key={i} cx={160 + (i % 4) * 62} cy={116 + Math.floor(i / 4) * 62} r="6" fill="#d86868" opacity="0.7" />
        ))}
        <text x="200" y="300" textAnchor="middle" fontSize="12.5" fill="#8a3a4a" fontWeight="700">舌面味蕾约 2000~8000 个</text>
      </g>
      {/* 味蕾结构 */}
      <g style={dim(active, 1)}>
        <ellipse cx="440" cy="110" rx="36" ry="50" fill="#f0b8b8" stroke="#a54858" strokeWidth="2.4" />
        <path d="M428 70 q 12 -14 24 0 m -22 -4 l 4 -12 m 8 12 l 8 -10" stroke="#a54858" strokeWidth="2" fill="none" />
        <text x="440" y="180" textAnchor="middle" fontSize="12" fill="#8a3a4a" fontWeight="700">味孔开口</text>
        <text x="440" y="200" textAnchor="middle" fontSize="11" fill="#8a3a4a">味细胞+支持细胞</text>
      </g>
      {/* 五味 */}
      <g style={dim(active, 2)}>
        {['酸', '甜', '苦', '咸', '鲜'].map((t, i) => (
          <g key={t}>
            <circle cx={72 + i * 68} cy={272} r="22" fill={['#e8d06a', '#f4f0d8', '#5a4a2a', '#d8e8f0', '#e8a860'][i]} stroke={['#8a671b', '#a5966a', '#2a1a0a', '#4a6a7a', '#8a5a2a'][i]} strokeWidth="2" />
            <text x={72 + i * 68} y={277} textAnchor="middle" fontSize="12.5" fill={['#5a4a1a', '#5a4a2a', '#f0e0d0', '#2a4a5a', '#4a2a0a'][i]} fontWeight="800">{t}</text>
          </g>
        ))}
        <text x="260" y="318" textAnchor="middle" fontSize="12" fill="#8a3a4a" fontWeight="700">苦味受体最多最敏感——苦常意味着"有毒"，是保命的警戒味</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">考点：味觉 = 化学感受；"地图舌"（舌尖甜·舌根苦）是过时说法——每种味蕾都能感受多种味</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#a5761d">"味道"= 味觉 + 嗅觉协同（与嗅觉标本互参）· 辣不是味觉而是痛觉</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">味蕾 · 五种基本味（课外拓展）</text>
    </svg>
  );
}

/* ================= 猴面包树（储水巨树） ================= */

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

/* ================= 变色龙（变色的秘密） ================= */

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

/* ================= 眼泪（三层泪膜） ================= */

function TearsSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 眼与泪膜 */}
      <g style={dim(active, 0)}>
        <circle cx="220" cy="160" r="80" fill="#f0f0e8" stroke="#8a9a9f" strokeWidth="3" />
        <circle cx="220" cy="160" r="34" fill="#4a7a9a" stroke="#2a4a6a" strokeWidth="2.6" />
        <circle cx="220" cy="160" r="14" fill="#141414" />
        <circle cx="208" cy="148" r="5" fill="#ffffff" />
        <path d="M140 158 q 80 -36 160 0" fill="none" stroke="#8ac8e8" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        <text x="336" y="130" fontSize="12.5" fill="#2c5a84" fontWeight="700">泪膜（每眨眼一次重新涂布）</text>
        <text x="336" y="150" fontSize="11.5" fill="#2c5a84">脂质层·水液层·黏蛋白层</text>
      </g>
      {/* 泪器 */}
      <g style={dim(active, 1)}>
        <ellipse cx="96" cy="86" rx="26" ry="16" fill="#d8e8f0" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="46" y="56" fontSize="12.5" fill="#2c5a84" fontWeight="700">泪腺（外上方·产泪）</text>
        <path d="M120 96 q 60 30 100 42" fill="none" stroke="#4d7ea8" strokeWidth="2.4" strokeDasharray="4 3" />
        <path d="M300 190 q 40 8 70 -8" fill="none" stroke="#4d7ea8" strokeWidth="3" strokeLinecap="round" />
        <text x="336" y="216" fontSize="12.5" fill="#2c5a84" fontWeight="700">鼻泪管 → 通鼻腔</text>
        <text x="336" y="236" fontSize="11.5" fill="#4a6a7a">哭鼻子时会"一把鼻涕一把泪"</text>
      </g>
      {/* 三种泪 */}
      <g style={dim(active, 2)}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={46 + i * 148} y="272" width="136" height="48" rx="10" fill={['#e4ecf6', '#e2f0e2', '#f4e4ec'][i]} stroke={['#4d7ea8', '#3f7f3a', '#a5486a'][i]} strokeWidth="2" />
            <text x={114 + i * 148} y="292" textAnchor="middle" fontSize="11" fill={['#2c5a84', '#2f6f2a', '#8a3a5a'][i]} fontWeight="800">{['基础泪（润滑）', '反射泪（进沙/切葱）', '情绪泪（人类特有）'][i]}</text>
            <text x={114 + i * 148} y="310" textAnchor="middle" fontSize="9.5" fill="#59767c">{['全天微量分泌', '冲走刺激物', '含激素·释放情绪'][i]}</text>
          </g>
        ))}
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="332" width="440" height="40" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="348" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">泪液功能：润滑·杀菌（溶菌酶）·冲刷异物——干眼症即泪膜失衡</text>
        <text x="260" y="366" textAnchor="middle" fontSize="11" fill="#a5761d">情绪泪含皮质醇等应激激素——"哭出来"可能有助减压</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">眼泪 · 三层泪膜与三种泪（课外拓展）</text>
    </svg>
  );
}

/* ================= 竹子（一生一次开花） ================= */

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

/* ================= 水蛭（蛭纲·抗凝大师） ================= */

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

/* ================= 胸腺（T 细胞的"军校"） ================= */

function ThymusSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 位置 */}
      <g style={dim(active, 0)}>
        <path d="M196 120 q 20 -30 64 -30 q 44 0 64 30 q -18 44 -64 48 q -46 -4 -64 -48 Z" fill="#f0c9b0" stroke="#a5765a" strokeWidth="2.8" />
        <path d="M240 90 q 20 -12 40 0 m -20 0 v 34" stroke="#a5765a" strokeWidth="2" />
        <text x="336" y="100" fontSize="12.5" fill="#8a5a3a" fontWeight="700">胸腺：胸骨后方·心脏上方</text>
        <text x="336" y="120" fontSize="12.5" fill="#8a5a3a">两叶如"蝶翼"</text>
      </g>
      {/* T 细胞训练 */}
      <g style={dim(active, 1)}>
        <circle cx="196" cy="150" r="8" fill="#8ab4cc" stroke="#2c5a84" strokeWidth="1.6" />
        <circle cx="216" cy="140" r="8" fill="#8ab4cc" stroke="#2c5a84" strokeWidth="1.6" />
        <circle cx="236" cy="152" r="8" fill="#8ab4cc" stroke="#2c5a84" strokeWidth="1.6" />
        <circle cx="286" cy="142" r="8" fill="#e8a0a0" stroke="#8a3030" strokeWidth="1.6" />
        <text x="60" y="196" fontSize="12.5" fill="#2c5a84" fontWeight="700">"入学"的 T 细胞前体：</text>
        <text x="60" y="216" fontSize="12.5" fill="#2c5a84">阳性选择（认识自己 MHC）+</text>
        <text x="60" y="236" fontSize="12.5" fill="#2c5a84">阴性选择（不攻击自身组织）</text>
        <text x="316" y="150" fontSize="12" fill="#8a3030" fontWeight="700">不合格者被淘汰（~95%）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="262" width="440" height="66" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="288" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">T = Thymus：T 细胞在胸腺"毕业"后才具备免疫功能</text>
        <text x="260" y="312" textAnchor="middle" fontSize="11.5" fill="#a5761d">青春期后胸腺逐渐萎缩（脂肪化），但已训练的 T 细胞可存活多年</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">胸腺 · 免疫细胞的"军校"（课外拓展）</text>
    </svg>
  );
}

/* ================= 风媒花与虫媒花 ================= */

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

/* ================= 深海鮟鱇（提灯的猎手） ================= */

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

/* ================= 耳蜗毛细胞（听力） ================= */

function CochleaHairSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 耳蜗剖面 */}
      <g style={dim(active, 0)}>
        <path d="M120 190 q -6 -60 60 -78 q 90 -24 150 20 q 40 30 20 70 q -24 44 -100 40 q -80 -4 -110 -30" fill="none" stroke="#4d7ea8" strokeWidth="26" strokeLinecap="round" />
        <path d="M128 186 q -2 -48 58 -64" fill="none" stroke="#dceaea" strokeWidth="10" strokeLinecap="round" />
        <text x="330" y="248" fontSize="12.5" fill="#2c5a84" fontWeight="700">耳蜗（蜗牛壳状·2.5 圈）</text>
        <text x="330" y="268" fontSize="12" fill="#4b6c73">内含毛细胞与听觉神经末梢</text>
      </g>
      {/* 毛细胞 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path d={`M${150 + i * 34} 140 v -20`} stroke="#b05a3a" strokeWidth="4" strokeLinecap="round" />
            {[0, 1, 2].map((j) => (
              <path key={j} d={`M${144 + i * 34 + j * 5} ${120 - j * 4} l 4 -8`} stroke="#e8a080" strokeWidth="1.8" strokeLinecap="round" />
            ))}
          </g>
        ))}
        <text x="330" y="110" fontSize="12.5" fill="#8a4a2a" fontWeight="700">毛细胞顶部的"听毛"</text>
        <text x="330" y="130" fontSize="12" fill="#8a4a2a">随声波振动弯曲 → 产生电信号</text>
        <line x1="326" y1="112" x2="290" y2="122" stroke="#8a4a2a" strokeWidth="1.2" strokeDasharray="3 3" />
      </g>
      {/* 听力损伤 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="292" width="440" height="72" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="316" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">毛细胞不可再生：长期戴耳机大音量→毛细胞"过劳死"→噪声性听力损失</text>
        <text x="260" y="338" textAnchor="middle" fontSize="11.5" fill="#a5761d">60-60 原则：音量不超最大 60%·连续使用不超 60 分钟</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11" fill="#a5761d">高频听力最先受损——"听得见但听不清"要警惕</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">耳蜗毛细胞 · 听力的"耗材"（课外拓展）</text>
    </svg>
  );
}

/* ================= 乙烯（果实催熟的激素） ================= */

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

/* ================= 蜂鸟（最小的鸟） ================= */

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

/* ================= 指纹 ================= */

function FingerprintSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 放大指纹 */}
      <g style={dim(active, 0)}>
        <ellipse cx="260" cy="150" rx="92" ry="120" fill="#f4ecdc" stroke="#b5a582" strokeWidth="3" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <ellipse key={i} cx="260" cy="150" rx={16 + i * 9} ry={30 + i * 10.5} fill="none" stroke="#c9a05a" strokeWidth="2.4" />
        ))}
        <path d="M226 150 q 34 -28 68 0 q -34 26 -68 0 Z" fill="none" stroke="#a5763a" strokeWidth="2.6" />
        <text x="260" y="304" textAnchor="middle" fontSize="12.5" fill="#8a6a3a" fontWeight="700">斗形·箕形·弓形——三种基本纹型</text>
      </g>
      {/* 功能 */}
      <g style={dim(active, 1)}>
        <rect x="44" y="60" width="180" height="76" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="134" y="84" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">为什么要指纹？</text>
        <text x="134" y="106" textAnchor="middle" fontSize="10.5" fill="#37585f">嵴线增大摩擦——抓握防滑</text>
        <text x="134" y="124" textAnchor="middle" fontSize="10.5" fill="#37585f">密布触觉小体——感知纹理</text>
      </g>
      {/* 唯一性 */}
      <g style={dim(active, 2)}>
        <rect x="296" y="60" width="180" height="76" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="386" y="84" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">独一无二且终身不变</text>
        <text x="386" y="106" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">胎儿期即形成（遗传+随机）</text>
        <text x="386" y="124" textAnchor="middle" fontSize="10.5" fill="#3f7f3a">同卵双胞胎也不同！</text>
      </g>
      {/* 应用 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="322" width="440" height="44" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="340" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">应用：指纹解锁·法医鉴定——每个人的指纹由基因"定基调"、发育中随机"定细节"</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">灵长类都有"皮纹"·考拉也有指纹（甚至能混淆现场！）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">指纹 · 皮肤与个体识别（课外拓展）</text>
    </svg>
  );
}

/* ================= 榕树（独木成林） ================= */

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

/* ================= 蝉（十七年蝉的"时间钟"） ================= */

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

/* ================= 乳腺（哺乳动物的"名片"） ================= */

function MammaryGlandSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 结构 */}
      <g style={dim(active, 0)}>
        <path d="M150 100 q 0 -50 100 -50 q 100 0 100 50 l 0 90 q 0 30 -40 30 l -120 0 q -40 0 -40 -30 Z" fill="#f0c9b0" stroke="#a5765a" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} d={`M${200 + (i % 3) * 50} ${130 + Math.floor(i / 3) * 40} q 8 -14 24 -12`} fill="none" stroke="#c99a7a" strokeWidth="2" />
        ))}
        <path d="M210 170 q 40 10 80 0 l 0 30 q -40 14 -80 0 Z" fill="#e8b898" stroke="#a5765a" strokeWidth="2" />
        <text x="380" y="130" fontSize="12.5" fill="#8a5a3a" fontWeight="700">腺泡细胞泌乳</text>
        <text x="380" y="150" fontSize="12.5" fill="#8a5a3a">输乳管汇合至乳头</text>
      </g>
      {/* 乳汁成分 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="240" width="200" height="76" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="146" y="264" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">乳汁的"黄金配方"</text>
        <text x="146" y="286" textAnchor="middle" fontSize="11" fill="#a5761d">蛋白质·脂肪·乳糖</text>
        <text x="146" y="304" textAnchor="middle" fontSize="11" fill="#a5761d">+ 抗体（初乳含 IgA）</text>
      </g>
      {/* 意义 */}
      <g style={dim(active, 2)}>
        <rect x="274" y="240" width="200" height="76" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.2" />
        <text x="374" y="264" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">哺乳 = 亲代抚育顶配</text>
        <text x="374" y="286" textAnchor="middle" fontSize="11" fill="#3f7f3a">营养+免疫"双投递"</text>
        <text x="374" y="304" textAnchor="middle" fontSize="11" fill="#3f7f3a">幼崽成活率大幅提高</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="330" width="440" height="40" rx="10" fill="#e4ecf6" stroke="#4d7ea8" strokeWidth="2.4" />
        <text x="260" y="346" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">哺乳动物之名正源于"乳腺"：胎生+哺乳是提高后代成活率的演化创新</text>
        <text x="260" y="364" textAnchor="middle" fontSize="11" fill="#537078">初乳的抗体给新生儿"被动免疫"——与疫苗的主动免疫对比记忆</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">乳腺 · 哺乳动物的定义特征（课外拓展）</text>
    </svg>
  );
}

/* ================= 向日葵（追光的数学） ================= */

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

/* ================= 穿山甲（披鳞的食蚁兽） ================= */

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

/* ================= 膀胱与排尿 ================= */

function UrinaryBladderSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 输尿管+膀胱 */}
      <g style={dim(active, 0)}>
        <path d="M170 80 q -16 60 -14 118" fill="none" stroke="#8ab4c9" strokeWidth="8" strokeLinecap="round" />
        <path d="M350 80 q 16 60 14 118" fill="none" stroke="#8ab4c9" strokeWidth="8" strokeLinecap="round" />
        <text x="330" y="66" fontSize="12.5" fill="#2c5a84" fontWeight="700">输尿管（左右各一·输送尿液）</text>
        <path d="M150 200 q 0 -40 110 -40 q 110 0 110 40 q 0 60 -40 96 l -140 0 q -40 -36 -40 -96 Z" fill="#d8e8b0" stroke="#6a9a3a" strokeWidth="2.8" />
        <text x="260" y="238" textAnchor="middle" fontSize="12.5" fill="#4a6a2a" fontWeight="700">膀胱（平滑肌构成的"气球"）</text>
        <path d="M258 296 v 40" stroke="#8a6a3a" strokeWidth="8" strokeLinecap="round" />
        <text x="292" y="292" fontSize="12.5" fill="#8a6a3a" fontWeight="700">尿道</text>
      </g>
      {/* 括约肌与反射 */}
      <g style={dim(active, 1)}>
        <ellipse cx="258" cy="290" rx="20" ry="9" fill="#c9a05a" stroke="#8a671b" strokeWidth="2.2" />
        <text x="46" y="252" fontSize="12.5" fill="#8a671b" fontWeight="700">尿道括约肌（"阀门"）</text>
        <rect x="300" y="120" width="180" height="66" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="390" y="144" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">容量约 400~500 mL</text>
        <text x="390" y="166" textAnchor="middle" fontSize="11" fill="#37585f">牵张感受器 → 排尿反射</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="298" width="440" height="60" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="322" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">低级中枢在脊髓·受大脑皮层高级中枢调控——"憋尿"与婴儿尿床的原理</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">脊髓损伤（截瘫）→ 大脑无法下达"忍住"指令→尿失禁（与脊髓标本互参）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">膀胱 · 尿液的"暂存仓库"（课外拓展）</text>
    </svg>
  );
}

/* ================= 郁金香鳞茎（越冬的"能量仓"） ================= */

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

/* ================= 蜜獾（无所畏惧的"平头哥"） ================= */

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

/* ================= 黑色素与晒伤 ================= */

function MelaninSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 皮肤剖面 */}
      <g style={dim(active, 0)}>
        <path d="M80 130 h 360 q 14 0 14 14 v 60 q 0 14 -14 14 h -360 q -14 0 -14 -14 v -60 q 0 -14 14 -14 Z" fill="#f4d0b8" stroke="#a5765a" strokeWidth="2.8" />
        <path d="M66 218 h 388 v 30 q 0 14 -14 14 h -360 q -14 0 -14 -14 Z" fill="#f8e4d4" stroke="#c99a7a" strokeWidth="2" />
        <text x="96" y="156" fontSize="11.5" fill="#8a5a3a" fontWeight="700">表皮（黑色素细胞在此）</text>
        <text x="96" y="240" fontSize="11.5" fill="#8a5a3a" fontWeight="700">真皮（血管·神经·感受器）</text>
      </g>
      {/* 黑色素细胞 */}
      <g style={dim(active, 1)}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx={170 + i * 90} cy={152} r="9" fill="#5a3a2a" stroke="#3a2a1a" strokeWidth="1.6" />
            {[0, 1, 2, 3].map((j) => (
              <path key={j} d={`M${170 + i * 90} 152 l ${Math.cos((j * Math.PI) / 2) * 18} ${Math.sin((j * Math.PI) / 2) * 18}`} stroke="#5a3a2a" strokeWidth="2" strokeLinecap="round" />
            ))}
          </g>
        ))}
        <text x="400" y="140" fontSize="12.5" fill="#5a3a2a" fontWeight="700">UV 照射 → 黑色素</text>
        <text x="400" y="160" fontSize="12.5" fill="#5a3a2a" fontWeight="700">增多（晒黑的本质）</text>
        <text x="374" y="180" fontSize="11.5" fill="#8a5a3a">天然"遮阳伞"包裹细胞核</text>
      </g>
      {/* 肤色演化 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="288" width="440" height="76" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="312" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">肤色演化的地理逻辑：强紫外地区深色（防叶酸分解）· 弱紫外地区浅色（保维生素 D 合成）</text>
        <text x="260" y="336" textAnchor="middle" fontSize="11.5" fill="#a5761d">晒伤 = UV 破坏细胞 DNA 的炎症警报——反复晒伤显著升高皮肤癌风险</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11.5" fill="#a5761d">防晒的本质：给"分子防护伞"减负——硬防晒（衣帽）优于防晒霜</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">黑色素 · 肤色与紫外线的演化（课外拓展）</text>
    </svg>
  );
}

/* ================= 空气凤梨（不用土的植物） ================= */

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

/* ================= 树懒（慢也是一种策略） ================= */

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

/* ================= 唾液（消化的第一滴） ================= */

function SalivaSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 三对唾液腺 */}
      <g style={dim(active, 0)}>
        <ellipse cx="200" cy="92" rx="34" ry="22" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2.4" />
        <ellipse cx="320" cy="92" rx="34" ry="22" fill="#f0d8c0" stroke="#a5765a" strokeWidth="2.4" />
        <text x="260" y="52" textAnchor="middle" fontSize="12.5" fill="#8a5a3a" fontWeight="700">腮腺（最大·位于耳前）</text>
        <ellipse cx="216" cy="168" rx="26" ry="20" fill="#e8c9a8" stroke="#a5765a" strokeWidth="2.2" />
        <ellipse cx="304" cy="168" rx="26" ry="20" fill="#e8c9a8" stroke="#a5765a" strokeWidth="2.2" />
        <text x="330" y="196" fontSize="12.5" fill="#8a5a3a" fontWeight="700">下颌下腺·舌下腺</text>
        <path d="M250 130 q 10 20 0 30 m -40 -20 q -6 24 4 34" fill="none" stroke="#a5765a" strokeWidth="2" strokeDasharray="3 3" />
      </g>
      {/* 唾液成分 */}
      <g style={dim(active, 1)}>
        <rect x="44" y="222" width="216" height="86" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="152" y="246" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">唾液的"三合一"功能</text>
        <text x="152" y="268" textAnchor="middle" fontSize="11" fill="#37585f">唾液淀粉酶：淀粉 → 麦芽糖</text>
        <text x="152" y="288" textAnchor="middle" fontSize="11" fill="#37585f">溶菌酶杀菌 · 湿润食物成食团</text>
      </g>
      {/* 实验 */}
      <g style={dim(active, 2)}>
        <rect x="280" y="222" width="196" height="86" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="378" y="246" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">家庭小实验</text>
        <text x="378" y="268" textAnchor="middle" fontSize="10.5" fill="#a5761d">米饭嚼 1 分钟 vs 不嚼，滴碘液：</text>
        <text x="378" y="288" textAnchor="middle" fontSize="10.5" fill="#a5761d">不嚼变蓝（淀粉在）· 嚼后浅色（已分解）</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 3)}>
        <rect x="40" y="322" width="440" height="42" rx="10" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="338" textAnchor="middle" fontSize="12" fill="#2f6f2a" fontWeight="800">细嚼慢咽：物理研磨 + 化学分解同步启动——唾液淀粉酶最适 pH 近中性</text>
        <text x="260" y="356" textAnchor="middle" fontSize="11" fill="#3f7f3a">进胃后酶失活（胃酸）——所以口腔里的分解"窗口期"很宝贵</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">唾液 · 消化的第一滴（课外拓展）</text>
    </svg>
  );
}

/* ================= C4 植物（高光效"改装车"） ================= */

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

/* ================= 鲨鱼（软骨鱼·海洋猎手） ================= */

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

/* ================= 智齿（演化的"遗迹"） ================= */

function WisdomToothSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 颌骨示意 */}
      <g style={dim(active, 0)}>
        <path d="M110 120 q 150 -40 300 0 q -20 60 -70 74 l -160 0 q -50 -14 -70 -74 Z" fill="#f0c9b0" stroke="#a5765a" strokeWidth="2.8" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={136 + i * 46} y={132} width="30" height="34" rx="5" fill="#f8f6ee" stroke="#b5a582" strokeWidth="1.8" />
        ))}
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={150 + i * 54} cy={172} r="5" fill="#d88a6a" stroke="#a5533c" strokeWidth="1.4" />
        ))}
        <text x="336" y="128" fontSize="12.5" fill="#8a5a3a" fontWeight="700">现代人的"拥挤"颌骨</text>
        <text x="336" y="148" fontSize="12" fill="#8a671b" fontWeight="600">智齿常常"横着长"（阻生）</text>
      </g>
      {/* 演化解释 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="212" width="210" height="86" rx="10" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.2" />
        <text x="151" y="238" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="800">祖先的"刚需"</text>
        <text x="151" y="260" textAnchor="middle" fontSize="10.5" fill="#a5761d">远古人类吃生硬食物</text>
        <text x="151" y="278" textAnchor="middle" fontSize="10.5" fill="#a5761d">颌骨宽大 · 需要三颗磨牙</text>
        <rect x="274" y="212" width="200" height="86" rx="10" fill="#eef4f6" stroke="#4d7ea8" strokeWidth="2.2" />
        <text x="374" y="238" textAnchor="middle" fontSize="12" fill="#2c5a84" fontWeight="800">现代的"尴尬"</text>
        <text x="374" y="260" textAnchor="middle" fontSize="10.5" fill="#37585f">食物精细 → 颌骨变小</text>
        <text x="374" y="278" textAnchor="middle" fontSize="10.5" fill="#37585f">智齿空间不足 → 阻生发炎</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="40" y="312" width="440" height="52" rx="12" fill="#e2f0e2" stroke="#3f7f3a" strokeWidth="2.4" />
        <text x="260" y="334" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="800">智齿是"演化遗迹"器官：环境变了，祖先的装备还在</text>
        <text x="260" y="354" textAnchor="middle" fontSize="11.5" fill="#3f7f3a">同类的遗迹结构：阑尾·智齿·动耳肌·尾椎骨——演化留下的"历史档案"</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">智齿 · 演化遗迹器官（课外拓展）</text>
    </svg>
  );
}

/* ================= 橡胶树（会"流泪"的树） ================= */

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

export const SPECIMENS: Specimen[] = [
  {
    id: 'shark',
    name: '鲨鱼',
    kicker: '软骨鱼纲 · 4 亿年的海洋猎手（课外拓展）',
    intro: '鲨鱼与我们熟悉的鲤鱼分属鱼类两大分支：它的骨骼全由软骨构成（硬骨鱼是硬骨），没有鳔，靠不断的游动和富含油脂的巨大肝脏获得浮力。鲨鱼的"黑科技"很多：多排可终生更换的三角齿、感知水波振动的侧线系统，甚至能探测猎物肌肉电场的罗伦氏壶腹——4 亿年来几乎" unchanged "的顶级捕食设计。',
    extension: true,
    parts: [
      { name: '软骨骨骼', desc: '骨骼全为软骨（钙化增强）：比硬骨轻而有弹性——软骨鱼纲与硬骨鱼纲的根本区别。' },
      { name: '歪形尾', desc: '尾鳍上下叶不等长（上长下短），配合胸肝产生升力——弥补"没有鳔"的浮力缺陷。' },
      { name: '多排牙齿', desc: '三角齿成排"后备"，前齿脱落后后排前移顶替——一生可更换上万颗。' },
      { name: '侧线与电感受', desc: '侧线感知水流振动锁定猎物方向；吻部的罗伦氏壶腹能感知微弱生物电——"透视"藏在沙底的猎物。' },
      { name: '生态警戒', desc: '顶级捕食者控制中小型鱼类种群、清除病弱个体；过度捕捞（鱼翅贸易）正威胁多种鲨鱼生存。' },
    ],
    Svg: SharkSvg,
  },
  {
    id: 'wisdomTooth',
    name: '智齿',
    kicker: '消化系统 · 演化遗迹的"提醒"（课外拓展）',
    intro: '智齿是第三磨牙，通常在 17~25 岁"迟到"萌出。远古人类咀嚼生硬的根茎兽肉，需要宽大的颌骨和三颗磨牙轮班研磨；现代食物精细柔软，颌骨缩短变窄，最后萌出的智齿常常"无家可归"——横着长、顶着邻牙（阻生智齿）。智齿、阑尾、动耳肌、尾椎骨并称演化遗迹器官——祖先生存的装备，成了现代的"历史档案"。',
    extension: true,
    parts: [
      { name: '什么是智齿', desc: '第三磨牙，共 0~4 颗（有人天生缺失）——萌出最晚，故名"智"齿，其实与智力无关。' },
      { name: '阻生智齿', desc: '颌骨空间不足，智齿横卧、斜顶或埋伏在骨内——顶坏邻牙、反复发炎时通常需拔除。' },
      { name: '演化遗迹', desc: '环境改变后失去功能但尚未消失的结构：智齿·阑尾·动耳肌·尾椎骨——演化"渐进性"的证据。' },
      { name: '颌骨退化', desc: '火的使用与食物加工让咀嚼负担锐减，人类颌骨在数万年间显著缩小——牙齿却"没跟上缩编"。' },
      { name: '个体差异', desc: '约 25% 的人天生缺失至少一颗智齿——基因多样性与演化仍在进行中的例证。' },
    ],
    Svg: WisdomToothSvg,
  },
  {
    id: 'rubberTree',
    name: '橡胶树',
    kicker: '大戟科 · 植物防御的"工业转译"（课外拓展）',
    intro: '橡胶树受伤时会流出乳白色的"眼泪"——乳胶：一种聚异戊二烯长链分子的悬浮液。对树来说，乳胶是防御武器：在伤口凝固封口、黏住啃食的昆虫口器；对人类来说，硫化处理后它成了轮胎、手套、气球的原料——从植物防御化学到现代工业的"完美转译"。',
    extension: true,
    parts: [
      { name: '乳胶与乳管', desc: '树皮中的乳管（特化的长管细胞）储存乳胶；割胶沿螺旋线切割乳管但不伤形成层——树可割数十年。' },
      { name: '防御本质', desc: '乳胶属于次生代谢产物：凝固封住伤口防病菌、黏住昆虫口器——化学防御的"物理执行"。' },
      { name: '硫化橡胶', desc: '天然乳胶加硫加热硫化：长链分子交联成网——弹性、强度、耐温大幅提升（固特异发明）。' },
      { name: '经济作物', desc: '原产亚马逊，主产东南亚；一棵橡胶树可割胶 25~30 年——重要的热带经济作物。' },
      { name: '次生代谢家族', desc: '乳胶（物理黏阻）·咖啡因（毒害）·芳香物（驱避）——次生代谢产物是植物"化学武器库"的全谱系。' },
    ],
    Svg: RubberTreeSvg,
  },
  {
    id: 'sloth',
    name: '树懒',
    kicker: '披毛目 · "慢生活"的生存大师（课外拓展）',
    intro: '树懒是移动最慢的哺乳动物——每分钟约 4 米，但它不是"懒"，而是把能量省到极致：低体温、低代谢、一周只下树排便一次。更妙的是它的毛发里住着共生的绿藻，让自己披上一件"绿色隐身衣"融进树冠；毛中还栖息着专属的树懒蛾——一只树懒就是一座"移动生态系统"。',
    extension: true,
    parts: [
      { name: '钩爪倒挂', desc: '长钩状爪配合特化的悬挂"肌腱锁"，倒挂几乎不耗能——树懒一生大部分时间挂在同一棵树的冠层。' },
      { name: '极端节能', desc: '代谢率只有同体型哺乳动物的 40%~50%，体温低且可变——"慢"是对低能量食物（叶片）的适应。' },
      { name: '绿藻共生', desc: '毛发沟槽里的绿藻让树懒泛绿、与树冠融为一体（伪装）；树懒的排泄又反过来滋养藻类。' },
      { name: '一周一便', desc: '下树排便最危险（捕食者的"死亡窗口"）——储到一周一次，一次排出可达体重三分之一。' },
      { name: '与猎豹对比', desc: '猎豹"快"靠爆发、树懒"慢"靠节能——速度与耐力的取舍没有优劣，只有是否适应环境。' },
    ],
    Svg: SlothSvg,
  },
  {
    id: 'saliva',
    name: '唾液',
    kicker: '消化系统 · 消化的"第一滴"（课外拓展）',
    intro: '食物入口的第一道化学加工来自唾液：三对大唾液腺（腮腺、下颌下腺、舌下腺）每天分泌约 1~1.5 升。唾液淀粉酶开始分解淀粉，溶菌酶负责杀菌，黏液把食物润成便于吞咽的食团——"细嚼慢咽"给唾液淀粉酶争取了宝贵的"工作窗口"，因为进入胃的酸环境后它就失活了。',
    extension: true,
    parts: [
      { name: '三对唾液腺', desc: '腮腺（耳前·最大）、下颌下腺、舌下腺——导管开口于口腔，受神经反射调节分泌。' },
      { name: '唾液淀粉酶', desc: '把淀粉分解为麦芽糖（米饭久嚼发甜的原因）；最适 pH 近中性，进胃被胃酸灭活。' },
      { name: '溶菌酶', desc: '破坏细菌细胞壁——口腔的"化学保安"，与眼泪中的溶菌酶同款。' },
      { name: '湿润与成团', desc: '黏液把干燥食物润滑成食团，方便吞咽并保护口腔与食管黏膜。' },
      { name: '家庭小实验', desc: '嚼过的米饭滴碘液不变蓝（淀粉已被分解）、未嚼的变蓝——验证酶作用的经典对照。' },
    ],
    Svg: SalivaSvg,
  },
  {
    id: 'c4Plant',
    name: 'C4 植物',
    kicker: '光合作用 · 高光效的"空间改装"（课外拓展）',
    intro: '玉米、甘蔗、高粱被称为 C4 植物：它们的 CO₂ 先在叶肉细胞被"打包"成四碳化合物，再运到维管束鞘细胞释放浓缩——相当于给光合反应"加压供料"，几乎消灭了光呼吸的浪费。与 CAM（时间分离）不同，C4 是"空间分离"：两类细胞分工合作，在强光高温下依然高效。',
    extension: true,
    parts: [
      { name: '花环结构', desc: 'C4 叶的维管束鞘细胞外包一圈叶肉细胞，像"花环"——两种细胞分工完成 CO₂ 的浓缩与还原。' },
      { name: '空间分离', desc: 'CO₂ 先固定成四碳化合物（草酰乙酸），运到鞘细胞释放高浓度 CO₂——把 Rubisco"喂饱"，抑制光呼吸。' },
      { name: '与 CAM 对比', desc: 'CAM 夜储昼用（时间分离），C4 双细胞分工（空间分离）——两条路线都为解决"CO₂ 不足/失水"矛盾。' },
      { name: '高光效优势', desc: '高温、强光、干旱下仍保持高光合速率——玉米产量高、甘蔗"疯长"的秘密。' },
      { name: '科研前沿', desc: '给水稻导入 C4 途径是国际重大育种课题——若成功，水稻有望增产约 50%。' },
    ],
    Svg: C4PlantSvg,
  },
  {
    id: 'honeyBadger',
    name: '蜜獾',
    kicker: '鼬科 · 无所畏惧的"平头哥"（课外拓展）',
    intro: '蜜獾是非洲草原上"最不好惹的小个子"：皮肤厚而松弛（被咬住还能反咬），对蛇毒有部分抗性，甚至会用石块、树枝当工具。它敢追着狮子跑、把毒蛇当辣条吃，"平头哥"的名号来自那股天不怕地不怕的劲头。它还爱吃蜂蜜，常跟着一种叫"蜜鴷"的小鸟合作——蜜鴷引路、蜜獾开路，共享蜂巢大餐。',
    extension: true,
    parts: [
      { name: '防御装备', desc: '皮肤厚而松弛：被捕咬住后仍可扭头反击；加上猛烈的肛门腺气味——让大型捕食者"吃相难看"。' },
      { name: '抗蛇毒', desc: '对眼镜蛇等蛇毒有部分抗性——追击毒蛇被咬后常只是"睡一觉"，醒来继续吃。' },
      { name: '使用工具', desc: '动物园观察记录到它堆叠石块、用树枝搭"梯子"翻越围墙——会用工具的非人动物之一。' },
      { name: '与蜜鴷合作', desc: '蜜鴷发现蜂巢后鸣叫引路，蜜獾捣毁蜂巢分享蜂蜡幼虫——跨物种"合作觅食"的罕见案例。' },
      { name: '生态角色', desc: '杂食性猎手：控制啮齿类与昆虫种群、清理动物尸体——中小型捕食者的生态功能代表。' },
    ],
    Svg: HoneyBadgerSvg,
  },
  {
    id: 'melanin',
    name: '黑色素与肤色',
    kicker: '皮肤 · 紫外线塑造的演化地图（课外拓展）',
    intro: '肤色的差异不是"地域吃出来的"，而是黑色素细胞对紫外线的演化应答：黑色素是包裹在细胞核上的"分子遮阳伞"，可以吸收紫外线、保护 DNA。赤道强紫外地区深色皮肤防止叶酸被紫外线分解；高纬度弱紫外地区浅色皮肤保证维生素 D 的合成——肤色地图是自然选择写下的"紫外线浓度表"。',
    extension: true,
    parts: [
      { name: '黑色素细胞', desc: '表皮基底的黑色素细胞把黑色素颗粒"配送"给周围的角质细胞——每个细胞核上方都撑起一把"小伞"。' },
      { name: '晒黑的本质', desc: '紫外线刺激黑色素细胞加班生产、颗粒增多——肤色加深是保护性反应，晒伤则是 DNA 受损的炎症警报。' },
      { name: '叶酸假说', desc: '紫外线会分解血液中的叶酸（影响生殖健康）——强紫外地区深肤色是保护生育能力的演化优势。' },
      { name: '维生素 D 平衡', desc: '紫外线也帮助皮肤合成维生素 D——高纬度浅肤色是为了在弱紫外下"不错过"这一点合成。' },
      { name: '健康提示', desc: '反复晒伤累积 DNA 突变、显著升高皮肤癌风险；防晒（衣物、遮阳、防晒霜）是不分肤色的必修课。' },
    ],
    Svg: MelaninSvg,
  },
  {
    id: 'airPlant',
    name: '空气凤梨',
    kicker: '凤梨科 · 不需要土壤的植物（课外拓展）',
    intro: '空气凤梨不用土、不用盆，挂在树枝、电线甚至岩石上就能活：它的叶片覆盖着银灰色盾状鳞毛，能从空气和雾气中捕获水分与尘埃养分；根完全退化成"挂钩"只负责固定。它是典型的附生植物——只"借宿"在树上，从不从宿主夺取养分，与寄生有本质区别。',
    extension: true,
    parts: [
      { name: '附生 vs 寄生', desc: '附生只借用宿主的"位置"，自给自足光合作用；寄生则夺取宿主养分（对比：菟丝子）。' },
      { name: '盾状鳞毛', desc: '叶面的银色鳞毛像微型"伞骨"：张开时吸收空气水汽、溶解的尘埃养分，干旱时闭合减少蒸腾。' },
      { name: '根的退化', desc: '根失去吸收功能、特化为"挂钩"——运输与固定功能在植物中的分工"改写"。' },
      { name: 'CAM 邻居', desc: '许多空气凤梨也走景天酸代谢路线：夜间开气孔固碳——干旱适应的又一呼应。' },
      { name: '附生生态', desc: '雨林中附生兰、鸟巢蕨、苔藓组成"空中花园"——附生植物是雨林物种多样性的重要一环。' },
    ],
    Svg: AirPlantSvg,
  },
  {
    id: 'pangolin',
    name: '穿山甲',
    kicker: '鳞甲目 · 披鳞的"森林卫士"（课外拓展·保护动物）',
    intro: '穿山甲是唯一披着鳞甲的哺乳动物：角质鳞片遇险时让全身卷成"铁球"。它没有牙齿，靠 40 厘米的长舌黏食白蚁蚂蚁，一只一年能吃掉约 700 万只——是名副其实的"森林卫士"。讽刺的是，这身鳞片让它成为全球走私量最大的哺乳动物之一（鳞片成分与指甲相同的角蛋白，"药用"并无科学依据），现已升为国家一级保护动物。',
    extension: true,
    parts: [
      { name: '角质鳞片', desc: '约 500~600 枚鳞片随体节排列，成分是角蛋白（与指甲同源）——卷成球时边缘锋利御敌。' },
      { name: '长舌', desc: '舌可伸出体外 40 厘米、几乎连到盆腔；黏稠唾液把洞穴深处的白蚁"粘"出来。' },
      { name: '食蚁专化', desc: '没有牙齿、胃部靠吞入的小石子"磨碎"猎物——与食蚁兽的趋同演化。' },
      { name: '生态价值', desc: '一只穿山甲一年食蚁约 700 万只，控制白蚁种群、保护森林——生态位不可替代。' },
      { name: '保护现状', desc: '因鳞片与肉的非法贸易被过度捕猎：所有 8 个种均受威胁；我国已将其从药典除名并升级为一级保护。' },
    ],
    Svg: PangolinSvg,
  },
  {
    id: 'urinaryBladder',
    name: '膀胱与排尿',
    kicker: '泌尿系统 · 尿液的"暂存仓库"（课外拓展）',
    intro: '肾脏源源不断地生成尿液，经输尿管汇入膀胱暂存：膀胱壁的平滑肌可以像气球一样舒张，容量约 400~500 毫升。储存到一定量时，壁上的牵张感受器发出信号，脊髓排尿反射启动——但成人的大脑皮层可以"否决"它，直到合适的时机才排尿。婴儿大脑控制未成熟，所以会尿床。',
    extension: true,
    parts: [
      { name: '膀胱结构', desc: '平滑肌构成的弹性"储水囊"：空虚时壁厚皱缩，充满时可膨胀数十倍（顶部朝腹腔伸展）。' },
      { name: '括约肌', desc: '尿道周围的括约肌是"阀门"：内括约肌受自主神经管，外括约肌受大脑意识控制。' },
      { name: '排尿反射', desc: '牵张感受器 → 脊髓低级中枢 → 膀胱收缩、括约肌放开——低级反射中枢在脊髓。' },
      { name: '大脑的调控', desc: '大脑皮层可延迟排尿（"憋尿"）——高级中枢控制低级中枢的经典例证；截瘫患者失去该控制而尿失禁。' },
      { name: '健康提示', desc: '长期憋尿使细菌滞留易引发尿路感染——有尿意及时排，多喝水冲刷尿路。' },
    ],
    Svg: UrinaryBladderSvg,
  },
  {
    id: 'tulipBulb',
    name: '郁金香鳞茎',
    kicker: '百合科 · 地下的"能量仓库"（课外拓展）',
    intro: '郁金香春天开花的全部"本钱"，早在头年秋天就藏在地下鳞茎里：层层肥厚的鳞叶储存着养分，包裹着发育完备的花芽。鳞茎既是越冬的"能量仓库"（需经冬季低温春化才开花），又是营养繁殖的"克隆工具"——母鳞茎旁长出的子鳞茎分株栽下，就能长出与母株一模一样的花。',
    extension: true,
    parts: [
      { name: '鳞茎结构', desc: '短缩的茎（基盘）+ 肉质鳞叶（储存养分）+ 被膜外皮；顶芽来年发育为花茎与叶。' },
      { name: '春化需求', desc: '必须经历 12~16 周低温（2~9°C）花芽才能正常发育——荷兰郁金香靠冬季冷凉土壤"天然春化"。' },
      { name: '营养繁殖', desc: '母鳞茎每年分化出子鳞茎，分株栽培即得"克隆"植株——品种花色不会像种子繁殖那样分离。' },
      { name: '家庭催花', desc: '把球放冰箱冷藏数周再水培——人工"骗"过冬天，春节就能看花。' },
      { name: '经济与文化', desc: '17 世纪荷兰"郁金香狂热"是史上著名的经济泡沫——如今荷兰仍是全球球根贸易中心。' },
    ],
    Svg: TulipBulbSvg,
  },
  {
    id: 'cicada',
    name: '蝉',
    kicker: '昆虫纲 · 十七年蝉的质数钟（课外拓展）',
    intro: '蝉的一生大部分时间在地下度过：若虫蛰伏 3~17 年吸食树根汁液，破土羽化后只喧鸣几周。最神奇的是北美十七年蝉——每 17 年同步羽化数以亿计，捕食者根本"吃不完"；而 13、17 这样的质数周期让天敌的繁殖周期难以与之重合，是生存策略的"数学之美"。',
    extension: true,
    parts: [
      { name: '不完全变态', desc: '卵 → 若虫 → 成虫，无蛹期：若虫在地下多次蜕皮，羽化时"金蝉脱壳"。' },
      { name: '地下蛰伏', desc: '若虫以刺吸式口器吸食树根汁液，生活史最长可达 17 年——昆虫界的"长寿冠军"之一。' },
      { name: '雄蝉发音器', desc: '腹部的鼓膜肌每秒收缩数百次使膜振动发声——只有雄蝉会"唱歌"，用于求偶。' },
      { name: '质数周期', desc: '13/17 年周期是质数：与任何小于它的天敌周期重合频率最低——同步爆发的"捕食者饱和"策略。' },
      { name: '羽化与天敌', desc: '破土羽化集中在几个夜晚——鸟、蛙、兽"吃撑了也吃不完"，剩余个体足以延续种群。' },
    ],
    Svg: CicadaSvg,
  },
  {
    id: 'mammaryGland',
    name: '乳腺',
    kicker: '哺乳动物 · "哺乳"二字的来源（课外拓展）',
    intro: '哺乳动物（Mammalia）的名字正来自乳腺（Mammary gland）：这是本纲动物独有的器官。乳腺由特化的汗腺演化而来，腺泡细胞分泌乳汁——蛋白质、脂肪、乳糖与抗体（初乳富含 IgA）的"黄金配方"，把营养与免疫一起传递给幼崽，让哺乳动物的后代成活率大幅提升。',
    extension: true,
    parts: [
      { name: '结构与泌乳', desc: '腺泡细胞合成乳汁，经输乳管汇合至乳头；泌乳由催乳激素（垂体）促进、在吸吮刺激下维持。' },
      { name: '乳汁成分', desc: '蛋白质构建身体、脂肪供能、乳糖供能补钙——初乳（头几天的乳汁）抗体含量极高。' },
      { name: '被动免疫', desc: '初乳中的 IgA 抗体覆盖幼崽肠道黏膜——在自身免疫系统成熟前"借"来的保护伞。' },
      { name: '演化意义', desc: '胎生+哺乳的组合让幼崽在最脆弱的阶段获得稳定供给——哺乳动物征服全球的关键之一。' },
      { name: '对比记忆', desc: '胎生哺乳 vs 卵生（数千枚卵仅少数存活）：亲代投资越高、后代成活率越高——两种策略各有代价。' },
    ],
    Svg: MammaryGlandSvg,
  },
  {
    id: 'sunflower',
    name: '向日葵',
    kicker: '菊科 · 追光的数学家（课外拓展）',
    intro: '向日葵的花盘藏着两门科学：幼株白天随太阳从东转向西（生长素分布不均所致），成熟后固定朝东让花盘提前升温吸引传粉者；花盘上的小花按约 137.5° 的黄金角螺旋排列——数学上最优的密排方案，让每朵小花都平均享受空间，结出最多的种子。',
    extension: true,
    parts: [
      { name: '向日运动', desc: '幼株茎尖在白天自东向西追踪太阳（生长素背光侧分布更多），夜晚再缓慢转回东方。' },
      { name: '朝东成熟', desc: '成熟花盘固定朝东：清晨更快升温、更醒目——吸引更多传粉昆虫、利于种子发育。' },
      { name: '黄金角螺旋', desc: '小花以 137.5° 黄金角依次发生，形成斐波那契螺旋（常为 34/55 等连续数）——密排不重叠。' },
      { name: '花盘的秘密', desc: '"一朵花"其实是头状花序：外围不育的舌状花负责"广告"，中央数百朵管状花负责结果。' },
      { name: '数学之美', desc: '向日葵、松果、菠萝都有斐波那契螺旋——植物按最简单的生长规则"算"出了最优化方案。' },
    ],
    Svg: SunflowerSvg,
  },
  {
    id: 'hummingbird',
    name: '蜂鸟',
    kicker: '鸟纲 · 悬停的"微型直升机"（课外拓展）',
    intro: '蜂鸟是世界上最小的鸟（最轻仅 2 克），却是飞行技术最强的"直升机"：翅膀每秒扇动 50~80 次，可以悬停、倒飞、横向移动。它的心跳可达每分钟 1000 次，超高代谢靠花蜜（糖类）支撑；到了夜里则进入"蛰伏"状态降低代谢省能量——与管状花组成互利共生的"黄金搭档"。',
    extension: true,
    parts: [
      { name: '悬停飞行', desc: '翅膀以"8 字"轨迹划动，上下挥拍都产生升力——像昆虫一样悬停，还能倒飞（鸟类中唯一）。' },
      { name: '超高代谢', desc: '心跳每分钟可达 1000 次、体温 40°C——每天需访问上千朵花，摄入超过体重一半的糖。' },
      { name: '蛰伏现象', desc: '夜间体温可降到 10°C 左右、代谢率降到 1/30——"省电模式"熬过没有花蜜的夜晚。' },
      { name: '与花共演化', desc: '细长喙与特定管状花相互"定制"：喙越长越弯的花，蜜越深——形态是自然选择刻下的"钥匙与锁"。' },
      { name: '体型纪录', desc: '蜜蜂蜂鸟体重约 2 克、卵只有豌豆大——是世界上最小的鸟与最小的鸟蛋。' },
    ],
    Svg: HummingbirdSvg,
  },
  {
    id: 'fingerprint',
    name: '指纹',
    kicker: '皮肤 · 个体识别的"身份证"（课外拓展）',
    intro: '指尖皮肤上的嵴线与沟纹组成了独一无二的指纹：斗形、箕形、弓形三种基本纹型，细节却人人不同——连同卵双胞胎都不一样！指纹的嵴线能增大抓握摩擦、密布触觉感受器增强触觉；胎儿期由遗传"定基调"、发育中随机"定细节"，且终身不变——因此成为法医鉴定与生物识别的基石。',
    extension: true,
    parts: [
      { name: '嵴线与功能', desc: '凸起的嵴线像轮胎纹增大摩擦力，防滑防脱；嵴间密布触觉小体——指尖是全身触觉最敏锐的部位之一。' },
      { name: '三种基本纹型', desc: '斗形（同心圆）、箕形（簸箕状）、弓形（拱桥状）——中国人约半数为斗形。' },
      { name: '形成机制', desc: '胎儿 3~4 个月时由遗传设定大格局，局部发育的随机性决定细节——所以同卵双胞胎指纹也不同。' },
      { name: '终身不变', desc: '只要基底层（生发层）不受损，指纹终身稳定；浅表擦伤愈合后原样长回。' },
      { name: '趣闻', desc: '考拉手指的指纹与人类极为相似，曾在犯罪现场"以假乱真"——灵长类与树栖有袋类的趋同演化。' },
    ],
    Svg: FingerprintSvg,
  },
  {
    id: 'banyanRoots',
    name: '榕树（独木成林）',
    kicker: '桑科 · 会"长脚"的巨树（课外拓展）',
    intro: '榕树的枝干上会垂下一条条"气生根"，一旦触地就扎进土壤、长粗成支柱根——一棵大榕树的支柱根可达上千条，树冠覆盖数亩地面，"独木成林"。榕树与传粉的榕小蜂是严格的"一对一"互利共生：没有榕小蜂就没有榕树籽，没有榕树花榕小蜂就无法繁殖——合作数千万年的老搭档。',
    extension: true,
    parts: [
      { name: '气生根与支柱根', desc: '枝干上垂生的气生根触地后木质化为支柱根——像无数"脚"撑住不断扩张的树冠。' },
      { name: '独木成林', desc: '孟加拉榕的树冠覆盖面积曾达上万平方米——一棵树就是一片"森林"，为鸟兽提供栖息地。' },
      { name: '与榕小蜂共生', desc: '榕果的隐头花序只有榕小蜂能钻入传粉；榕小蜂幼虫只在榕果内发育——数千万年的"一对一"合作。' },
      { name: '绞杀现象', desc: '有些榕（绞杀榕）种子在别的树冠发芽，气生根最终"绞死"宿主——热带雨林竞争的极端形式。' },
      { name: '文化意义', desc: '华南与东南亚的村口大榕树常被视为"风水树"——传统信仰客观上保护了古树资源。' },
    ],
    Svg: BanyanRootsSvg,
  },
  {
    id: 'anglerfish',
    name: '深海鮟鱇',
    kicker: '硬骨鱼纲 · 提灯的深海猎手（课外拓展）',
    intro: '深海 2000 米没有一丝阳光，雌性鮟鱇鱼却在"额头"上点起一盏小灯笼：灯笼里的共生发光细菌发出冷光，引诱好奇的猎物靠近——张口的瞬间（0.01 秒）猎物已被吸入。它的胃可以撑大到吞下与自身等长的猎物，雄鱼体长只有雌鱼的几分之一，找到雌鱼后终身"依附"其上。',
    extension: true,
    parts: [
      { name: '发光诱饵', desc: '背鳍前端的拟饵内含共生发光细菌——化学发光不发热，是深海稀缺光线中的"路灯"。' },
      { name: '伏击式捕食', desc: '潜伏不动只摆"灯笼"；猎物靠近时张口吸入——口腔与胃可极度扩张，吞下与自身等长的猎物。' },
      { name: '性寄生', desc: '雄鱼体长仅为雌鱼的 1/10，找到雌鱼后用牙齿咬住其体侧、逐渐愈合共生——精子随时可用，弥补深海"相遇难"。' },
      { name: '深海适应', desc: '骨骼细软、肌肉松弛——耐受巨大水压；黑暗中视觉退化、侧线系统发达（感知水流振动）。' },
      { name: '共生启示', desc: '发光细菌获得营养"住所"，鮟鱇获得"诱饵"——共生关系是极端环境中常见的生存策略。' },
    ],
    Svg: AnglerfishSvg,
  },
  {
    id: 'cochleaHair',
    name: '耳蜗毛细胞',
    kicker: '感觉器官 · 听力的"耗材"（课外拓展）',
    intro: '耳蜗里排列着约 1.5 万个毛细胞：顶端的"听毛"随声波振动弯曲，把机械振动转成电信号——这是听觉的起点。残酷的是毛细胞不可再生：长期大音量听音乐会让毛细胞"过劳死"，造成不可逆的噪声性听力损失。记住"60-60 原则"守护自己的听力。',
    extension: true,
    parts: [
      { name: '毛细胞与听毛', desc: '声波使基底膜振动、听毛随之弯曲，打开离子通道产生神经冲动——机械能→电能的"换能器"。' },
      { name: '频率定位', desc: '基底膜底部感受高频、顶部感受低频——不同位置的毛细胞分工不同，所以高频听力最先受损。' },
      { name: '不可再生', desc: '人类毛细胞出生即定量、损坏无法补充——鸟类可再生毛细胞，哺乳动物不能（研究热点）。' },
      { name: '噪声性听力损失', desc: '长期 >85 分贝环境或大音量耳机渐进损伤；"听得见但听不清"（高频损失）是早期信号。' },
      { name: '保护原则', desc: '60-60 原则：音量不超过最大 60%、连续使用不超过 60 分钟；嘈杂环境用降噪耳机反而护耳。' },
    ],
    Svg: CochleaHairSvg,
  },
  {
    id: 'ethylene',
    name: '乙烯',
    kicker: '植物激素 · 果实成熟的"信号兵"（课内拓展）',
    intro: '乙烯是唯一以气体形式存在的植物激素：它最著名的本领是促进果实成熟——一个成熟的苹果释放的乙烯，能让一箱青香蕉几天内变黄变软（"一果熟，箱中熟"）。它还促进叶片脱落与衰老，与生长素、赤霉素、细胞分裂素、脱落酸共同组成植物激素"五人组"。',
    extension: true,
    parts: [
      { name: '气体激素', desc: '常温下为气体、可在植株间传递——"一箱苹果里一个熟果催熟全箱"的原理。' },
      { name: '促进成熟', desc: '诱导纤维素酶与果胶酶合成，果实细胞壁松散变软；淀粉转糖、涩味消失（柿子脱涩）。' },
      { name: '促进脱落', desc: '促进叶柄基部离层形成——深秋落叶、棉花催熟脱叶都用乙烯（利）的一面。' },
      { name: '协同与拮抗', desc: '与脱落酸协同促进衰老；与生长素、细胞分裂素"促生长"作用相拮抗——激素间是复杂的网络调控。' },
      { name: '农业应用', desc: '乙烯利（液态释放乙烯）用于香蕉催熟、棉花催熟脱叶；储运中则要抑制乙烯（低温、吸除）保鲜。' },
    ],
    Svg: EthyleneSvg,
  },
  {
    id: 'leech',
    name: '水蛭',
    kicker: '环节动物门 · 蛭纲"抗凝大师"（课外拓展）',
    intro: '水蛭（蚂蟥）与蚯蚓同属环节动物：身体有环沟、前后各有一个吸盘。它吸血时用颚片划开皮肤，分泌水蛭素阻止血液凝固——一次可吸自身体重数倍的血。水蛭素是最强效的天然抗凝血剂之一，让这只"吸血虫"摇身变成显微外科与抗血栓药物的资源宝库。',
    extension: true,
    parts: [
      { name: '蛭纲特征', desc: '体表有环沟但体节数固定（34 节）；前后吸盘用于"尺蠖式"爬行与吸附——比蚯蚓更特化的运动方式。' },
      { name: '吸血装备', desc: '前吸盘内有颚片划开皮肤，咽部肌肉泵血；唾液中的水蛭素抑制凝血酶，血液保持流动直至吸满。' },
      { name: '水蛭素', desc: '65 个氨基酸的多肽，特异性抑制凝血酶——比肝素更直接，是抗血栓药物研究的重要分子。' },
      { name: '医学应用', desc: '显微外科（断指再植）用医用水蛭消除术后淤血；人工合成水蛭素已用于抗凝治疗。' },
      { name: '生态角色', desc: '淡水底栖捕食者/暂时寄生者：吸食鱼、蛙、昆虫体液——食物链中的"流动环节"。' },
    ],
    Svg: LeechSvg,
  },
  {
    id: 'thymus',
    name: '胸腺',
    kicker: '免疫器官 · T 细胞的"军校"（课外拓展）',
    intro: '胸腺位于胸骨后方、心脏上方，是 T 淋巴细胞的"训练营"（T 就是 Thymus 的首字母）：从骨髓迁来的 T 细胞前体要在这里经受"阳性选择"（会识别敌人）与"阴性选择"（不攻击自己）的双重考核，约 95% 被淘汰，毕业的才成为合格的免疫战士。青春期后胸腺逐渐萎缩，但毕业的 T 细胞能存活多年。',
    extension: true,
    parts: [
      { name: '位置与形态', desc: '两叶如蝶翼，位于胸骨后、大血管前方——婴儿期最大，青春期后逐渐脂肪化萎缩。' },
      { name: 'T 细胞训练', desc: '阳性选择筛选能识别 MHC 的细胞，阴性选择清除攻击自身组织的细胞——建立"自我耐受"。' },
      { name: '淘汰率', desc: '约 95% 的前体细胞在选择中凋亡——严格的"质量控制"防止自身免疫病。' },
      { name: '分泌胸腺激素', desc: '胸腺肽类激素促进 T 细胞成熟与分化——胸腺既是淋巴器官也是内分泌器官。' },
      { name: '临床关联', desc: '先天胸腺发育不全（DiGeorge 综合征）导致 T 细胞缺陷、免疫力低下——可见胸腺的不可替代性。' },
    ],
    Svg: ThymusSvg,
  },
  {
    id: 'pollinationTypes',
    name: '风媒花与虫媒花',
    kicker: '植物繁殖 · 传粉的两种策略',
    intro: '花的设计透露着它的"物流方案"：风媒花（小麦、玉米）花小不鲜艳、无蜜，花粉多而轻，靠风力"广撒网"；虫媒花（桃、油菜）花大艳丽、有蜜腺，花粉少而黏，靠昆虫"精准投递"。花色、花蜜、花粉的性状差异，正是自然选择塑造的"结构与功能相适应"。',
    parts: [
      { name: '风媒花', desc: '花粉干燥轻小、数量巨大（一朵玉米雄花可散粉数千万粒）；柱头常呈羽毛状扩大接收面积。' },
      { name: '虫媒花', desc: '鲜艳花冠、芳香与蜜汁"广告+报酬"；花粉外壁黏、带刺钩——容易挂在昆虫身上带走。' },
      { name: '互利共生', desc: '虫媒传粉是植物与昆虫的互利共生：花供蜜、虫传粉——两者形态常相互"定制"（如长距彗星兰与预测的天蛾）。' },
      { name: '自花与异花', desc: '虫媒多促进异花传粉（基因交流大、后代生活力强）；自花传粉（豌豆！）纯系稳定——孟德尔选它正因如此。' },
      { name: '农业应用', desc: '温室授粉放养蜜蜂；玉米制种要设隔离带防串粉——传粉生物学直接服务生产。' },
    ],
    Svg: PollinationTypesSvg,
  },
  {
    id: 'chameleon',
    name: '变色龙',
    kicker: '爬行纲 · 避役的变色真相（课外拓展）',
    intro: '变色龙（避役）的变色主要不是为了伪装——而是调节体温和表达"情绪"：它的皮肤有两层含鸟嘌呤纳米晶体的色素细胞，改变晶体间距就能反射不同波长的光。两只眼睛可以各自独立转动、视野几乎 360°，舌头弹射 0.07 秒命中猎物，长度可达体长两倍。',
    extension: true,
    parts: [
      { name: '独立双眼', desc: '左右眼可各自朝不同方向转动（360° 视野），发现猎物时双眼瞬间同时前视锁定——测距靠立体视觉。' },
      { name: '弹射舌', desc: '舌头像蓄能弹簧：加速度可达重力加速度数百倍，0.07 秒命中；舌端吸盘湿润黏附猎物拖回口中。' },
      { name: '变色机制', desc: '浅层色素细胞调整黄色调，深层鸟嘌呤纳米晶体改变间距——"结构色"而非简单色素扩散。' },
      { name: '变色的用途', desc: '深色吸热保暖、浅色反光降温；求偶与争斗时全身亮色"亮剑"——情绪表达 > 伪装。' },
      { name: '卷尾与对趾', desc: '尾巴卷握如第五肢，脚趾分成前后两组"钳状对握"——适应树枝生活的攀爬装备。' },
    ],
    Svg: ChameleonSvg,
  },
  {
    id: 'tears',
    name: '眼泪',
    kicker: '感觉器官 · 三层泪膜与三种泪（课外拓展）',
    intro: '每一次眨眼都在给眼睛"重新涂布"一层泪膜——由脂质层、水液层、黏蛋白层叠成，让角膜光滑透亮、抵御细菌。人类的眼泪有三种：全天微量的基础泪、受刺激时的反射泪，以及含应激激素的情绪泪——情绪性流泪可能是人类特有的减压方式。',
    extension: true,
    parts: [
      { name: '三层泪膜', desc: '外层脂质防蒸发、中层水液（含溶菌酶杀菌）、内层黏蛋白让泪液"挂"上亲水的角膜。' },
      { name: '泪器', desc: '泪腺位于眼眶外上方分泌泪液；泪液经泪小点、鼻泪管流入鼻腔——"一把鼻涕一把泪"的解剖学依据。' },
      { name: '三种泪', desc: '基础泪润滑眼球；反射泪冲走异物与刺激性气体；情绪泪由情绪触发、成分独特。' },
      { name: '情绪泪', desc: '含皮质醇等应激激素和镇痛物质——"哭出来舒服些"可能有生理学依据；情绪性流泪被认为是人类特有的社会信号。' },
      { name: '干眼症', desc: '泪膜失衡（睑板腺功能障碍、屏幕用眼眨眼减少）导致眼干涩异物感——人工泪液是"补充涂层"。' },
    ],
    Svg: TearsSvg,
  },
  {
    id: 'bamboo',
    name: '竹子',
    kicker: '禾本科 · 一生一次开花的"草"（课外拓展）',
    intro: '竹子是木质化的"草"（禾本科）：地下横走的竹鞭让整片竹林可能只是一个"克隆体"，竹笋一夜可长高一米。最神秘的是开花——许多竹种数十年才开一次花，而且同一鞭系的竹林会同步开花、结籽后集体枯死，引发熊猫栖息地的"竹子开花"危机。',
    extension: true,
    parts: [
      { name: '中空有节', desc: '秆中空、有节、木质化：以最少的材料获得最大的强度与生长速度——工程学的天然范本。' },
      { name: '竹鞭克隆', desc: '地下根状茎横向蔓延、节上出笋——一片竹林可能源自同一株母竹的无性系克隆。' },
      { name: '爆发式生长', desc: '节间分生组织同时活跃，春笋一夜可长高约 1 米——数周完成"成年"，之后不再长粗。' },
      { name: '一次结实', desc: '同源竹林同步开花结籽后集体枯死（周期可达数十年）——"同步爆发"让种子逃过天敌饱和。' },
      { name: '生态与文化', desc: '竹子快速可再生、固碳能力强；"竹子开花"会威胁大熊猫食物来源——生态保护的重要监测点。' },
    ],
    Svg: BambooSvg,
  },
  {
    id: 'cuckoo',
    name: '杜鹃',
    kicker: '鸟纲 · 巢寄生的行为大师（课外拓展）',
    intro: '杜鹃自己不筑巢、不孵卵、不育雏——它把蛋产进苇莺等小鸟的巢里，蛋的花纹和大小模仿得惟妙惟肖。杜鹃雏鸟总是先孵出，背部有一个敏感的"凹陷"，会把巢里其他的蛋和雏鸟一个个拱出巢外，独占"养父母"的全部投喂。宿主与杜鹃之间正上演一场识别与反识别的共同演化"军备竞赛"。',
    extension: true,
    parts: [
      { name: '巢寄生', desc: '把卵产在其他鸟类的巢中，由宿主代孵代育——种间关系里"一方获益、一方受害"的寄生在行为上的延伸。' },
      { name: '蛋的拟态', desc: '杜鹃蛋的大小、颜色、花纹与宿主蛋高度相似——不同杜鹃品系专门"专攻"不同宿主。' },
      { name: '雏鸟的排挤行为', desc: '杜鹃雏鸟孵出时背部的触觉凹陷一被碰到就疯狂拱动，把"同巢伙伴"移出巢外——独占投喂的本能。' },
      { name: '共同演化', desc: '宿主不断进化识别_foreign蛋的能力，杜鹃蛋模拟得越来越像——两物种相互选择的"军备竞赛"。' },
      { name: '生态意义', desc: '杜鹃成鸟大量捕食毛虫（包括别的鸟不敢吃的带毒刺毛虫）——巢寄生之外，它也是森林治虫能手。' },
    ],
    Svg: CuckooSvg,
  },
  {
    id: 'tasteBuds',
    name: '味蕾',
    kicker: '感觉器官 · 五种基本味（课外拓展）',
    intro: '味蕾是藏在舌面、软腭等处的"化学感受器"，成人约有 2000~8000 个：每个味蕾由几十个味细胞和支持细胞组成，顶端的味孔开口于舌面。人类能分辨酸、甜、苦、咸、鲜五种基本味——苦味受体最敏感，因为"苦"在自然界常意味着有毒。辣并不是味觉，而是痛觉与温度觉的混合。',
    extension: true,
    parts: [
      { name: '味蕾结构', desc: '味细胞（感受器细胞）包围味孔，食物分子溶于唾液后进入味孔与受体结合产生神经冲动。' },
      { name: '五种基本味', desc: '酸甜苦咸鲜（鲜味来自谷氨酸类）；"舌味地图"（舌尖甜舌根苦）是旧教科书的误读——每个味蕾都能感受多种味。' },
      { name: '苦味的警报', desc: '人类约有 25 种苦味受体——多数天然毒素都苦，对苦高度敏感是自然选择留下的"保命设置"。' },
      { name: '味觉与嗅觉协同', desc: '吃饭感受的"风味"大部分来自嗅觉（鼻后通路）——感冒鼻塞时吃饭不香的原因。' },
      { name: '味觉更新', desc: '味细胞约 10 天更新一次——烫伤舌头"尝不出味"两周内可恢复；年龄增长味蕾减少，老人口味偏重。' },
    ],
    Svg: TasteBudsSvg,
  },
  {
    id: 'baobab',
    name: '猴面包树',
    kicker: '锦葵科 · 稀树草原的储水巨树（课外拓展）',
    intro: '猴面包树是非洲稀树草原上的"活体水塔"：树干粗达 10 米、木质疏松如海绵，雨季可储存超过 10 万升水，旱季落叶休眠、开花结果。它的枝条像插在天上的根须，因此得到"倒栽树"的别称——象、猴、鸟和人都依赖它的果实与水分，被称为"生命之树"。',
    extension: true,
    parts: [
      { name: '储水树干', desc: '柔软的木质部与纤维组织像海绵：吸水膨胀、旱季缓慢释放——粗壮的"腰围"就是它的"水箱"。' },
      { name: '旱季策略', desc: '旱季落叶减少蒸腾，雨季快速长叶开花——生长节奏跟着降水走，而不是跟着季节历走。' },
      { name: '倒栽树传说', desc: '枝条稀疏如根须朝天——"倒栽"外形让它成为非洲草原最具辨识度的树种。' },
      { name: '动物的服务站', desc: '果实（猴面包）富含维生素 C；树洞储水、空心树干可供动物藏身——"生命之树"养育整片草原。' },
      { name: '与 CAM 植物对照', desc: 'CAM 植物"省着用水"，猴面包树"囤着用水"——干旱适应的两种答案，殊途同归。' },
    ],
    Svg: BaobabSvg,
  },
  {
    id: 'hermitCrab',
    name: '寄居蟹',
    kicker: '甲壳类 · 背着"二手房子"的搬家高手（课外拓展）',
    intro: '寄居蟹的腹部柔软，没有自己的硬壳护身——它想出的办法是"住进别人用过的螺壳"：柔软的螺旋腹部正好卡进壳腔，尾肢钩住壳轴，大螯一收就"关门"。遇到更好的空壳还会排队按体型"以大换小"；不少个体背上还养着海葵，用刺细胞当"保镖"，组成一套精妙的种间关系组合。',
    extension: true,
    parts: [
      { name: '占螺为壳', desc: '利用海螺死后留下的空壳保护柔软腹部——遇到危险整只缩入，螯足当"门板"封口。' },
      { name: '换壳链条', desc: '同种个体按体型排队，新壳出现时依次"以大换小"——空壳资源在群体中链式流转。' },
      { name: '与海葵共生', desc: '把海葵驮在壳上：海葵的刺细胞帮御敌，寄居蟹移动带海葵"觅食旅游"——互利共生。' },
      { name: '身体特化', desc: '腹部长而柔软、不对称（适应螺壳螺旋腔）；左螯常大于右螯——形态为"住址"而改变。' },
      { name: '种间关系清单', desc: '与螺壳（竞争使用）、与海葵（互利共生）、与捕食者（躲避）——一只小蟹演绎全套生态关系。' },
    ],
    Svg: HermitCrabSvg,
  },
  {
    id: 'fever',
    name: '发烧',
    kicker: '稳态调节 · 体温调定点上移（课外拓展）',
    intro: '发烧不是"体温调节失灵"，而是调节系统被"重新设定"：病原体致热原让下丘脑的体温调定点上移，身体便主动产热（寒战）、减少散热（皮肤血管收缩），把体温"烧"到新目标——这个区间里免疫细胞更活跃、部分病原体繁殖受抑。但超过 39~40°C 就开始伤及自身酶与神经，需要科学退热。',
    extension: true,
    parts: [
      { name: '调定点学说', desc: '下丘脑体温调节中枢设有"目标温度"：致热原把它从 37°C 上调，机体误以为"冷"而主动升温。' },
      { name: '产热与散热', desc: '寒战是骨骼肌快速收缩产热；皮肤血管收缩、手脚冰凉是减少散热——"打寒战"往往是要发烧的信号。' },
      { name: '免疫意义', desc: '适度发热增强白细胞吞噬与增殖、干扰病原体繁殖——是进化保留下来的防御策略。' },
      { name: '过热的危险', desc: '超过 39~40°C 影响酶活性与神经系统（高热惊厥）；体温过高需物理降温并就医。' },
      { name: '退热的真相', desc: '退烧药让调定点回落，身体靠出汗散热降温——"捂汗"反而阻碍散热，并不是退烧的正确方式。' },
    ],
    Svg: FeverSvg,
  },
  {
    id: 'camPlant',
    name: '景天酸代谢（CAM）',
    kicker: '光合作用 · 干旱环境的"夜班模式"（课外拓展）',
    intro: '菠萝、龙舌兰和多肉植物把光合作用玩出了"夜班"花样：凉爽的夜里才打开气孔，把二氧化碳固定成苹果酸储存在液泡中；白天烈日当空时气孔紧闭保水，苹果酸分解释放 CO₂ 供给光反应之后的暗反应。这套景天酸代谢（CAM）让它们在沙漠里"保水优先"，代价是生长极其缓慢。',
    extension: true,
    parts: [
      { name: '夜间开孔', desc: '夜凉气孔开放：气孔开度小、失水少，却能持续吸入 CO₂——把"呼吸门户"开在安全的时段。' },
      { name: 'CO₂ 囤积', desc: 'CO₂ 在 PEP 羧化酶作用下固定成苹果酸，储入液泡过夜——相当于"先囤原料，白天再加工"。' },
      { name: '白天关孔', desc: '白天光反应照常进行，苹果酸分解释放 CO₂ 供暗反应——气孔紧闭几乎不失水。' },
      { name: '适应性代价', desc: '液泡容量有限，夜间固定的 CO₂ 总量少——CAM 植物普遍生长缓慢，是"保水优先"的权衡。' },
      { name: '演化意义', desc: 'CAM 与 C4 途径是植物应对"高温干旱但必须光合"的两套独立方案——同一路径的殊途同归。' },
    ],
    Svg: CamPlantSvg,
  },
  {
    id: 'mantisShrimp',
    name: '雀尾螳螂虾',
    kicker: '甲壳类 · 海底"拳王"（课外拓展）',
    intro: '雀尾螳螂虾是海洋中最不好惹的小动物：第二对附肢像一对"子弹拳"，0.02 秒内弹出，加速度堪比手枪子弹；打击点水被瞬间汽化产生气泡内爆的冲击波——即使打空也能震晕猎物。它的复眼拥有 12~16 种视锥细胞（人类只有 3 种），还能看见偏振光，是动物界的"视觉冠军"。',
    extension: true,
    parts: [
      { name: '子弹拳', desc: '攻击附肢由弹簧锁扣结构蓄力，瞬间释放：加速度超过 10⁴ g，打击力可达 1500 牛——足以击碎玻璃缸壁。' },
      { name: '空穴冲击波', desc: '高速打击使水瞬间汽化形成空化气泡，气泡崩溃产生二次冲击波——物理杀伤"买一送一"。' },
      { name: '超级复眼', desc: '每只眼分三区独立成像（立体视觉用一只眼即可）；视锥类型多达 16 种，覆盖紫外线与偏振光。' },
      { name: '警告色', desc: '鲜艳的绿蓝红体色是对同类与捕食者的"广告"：我很危险，别惹我——警戒色的海洋版本。' },
      { name: '与螳螂的关系', desc: '名字来自捕捉足像螳螂的"刀"，但它是甲壳类（虾的近亲），与昆虫螳螂毫无亲缘。' },
    ],
    Svg: MantisShrimpSvg,
  },
  {
    id: 'woundHealing',
    name: '伤口愈合',
    kicker: '皮肤修复 · 四阶段协奏曲（课外拓展）',
    intro: '皮肤破口后的修复是一场精密的四幕"协奏曲"：数分钟内血小板聚集止血结痂；随后 1~3 天白细胞赶到清除细菌与坏死组织（红肿热痛的炎症期）；接着成纤维细胞合成胶原、新血管长入填充创面（增生期）；最后数月里胶原重组、瘢痕逐渐软化变淡——免疫、循环与干细胞的全员协作。',
    extension: true,
    parts: [
      { name: '止血期', desc: '血小板黏附聚集、凝血瀑布激活，纤维蛋白网封住破口——数分钟内完成，防止失血与入侵。' },
      { name: '炎症期', desc: '中性粒细胞与巨噬细胞进场清创：红肿热痛正是血管扩张、免疫细胞工作的表现——"发炎"是在帮忙。' },
      { name: '增生期', desc: '成纤维细胞大量合成胶原蛋白填补缺损，新生毛细血管形成红色肉芽组织；表皮干细胞从伤口边缘爬行覆盖。' },
      { name: '重塑期', desc: '胶原持续重组交联、多余血管退化，瘢痕从红硬变白软——可长达一年，强度难回 100%。' },
      { name: '愈合的敌人', desc: '感染、糖尿病高血糖、吸烟（血管收缩缺氧）都会拖延愈合——"伤口保持清洁湿润"比结干痂愈合更快。' },
    ],
    Svg: WoundHealingSvg,
  },
  {
    id: 'slimeMold',
    name: '黏菌',
    kicker: '原生生物 · 无脑的"路径规划师"（课外拓展）',
    intro: '黏菌的生命里有一段"一坨会流动的黄色多核细胞"：没有大脑、没有神经系统，却能在食物点之间织出高效的网络——把食物摆成东京及周边城市的站点，它一夜织出的管状网络竟与真实的铁路网高度相似。它通过"试探-强化-剪枝"不断优化运输管道，是群体智能的天然教科书。',
    extension: true,
    parts: [
      { name: '原生质团', desc: '营养期是一整片多核的原生质团：细胞质往复流动，像"一坨会爬的黄色果冻"，可达数平方米。' },
      { name: '觅食网络', desc: '向食物方向伸出管状脉管，管内细胞质双向流动——粗管通向大食物源、细管负责试探。' },
      { name: '路径优化', desc: '流动加快的管道壁增厚加固，绕路低效的细管被回收删除——相当于运行"最短路径算法"。' },
      { name: '东京铁路实验', desc: '2000 年用燕麦片标记东京重要站点，黏菌织出的网络与人类工程师数年建成的铁路网惊人相似。' },
      { name: '智能的启示', desc: '证明"没有神经也能解题"：分布式正反馈足以实现优化——为无中央控制的网络设计提供仿生灵感。' },
    ],
    Svg: SlimeMoldSvg,
  },
  {
    id: 'dungBeetle',
    name: '蜣螂',
    kicker: '鞘翅目 · 大自然的清道夫（课外拓展）',
    intro: '蜣螂（屎壳郎）是地球上最敬业的"回收工程师"：把粪便滚成球推走埋藏，既当食物又是产卵床。它们能在夜里沿着银河的微光滚出直线，避免绕回粪堆——这是昆虫中首个被证实的"星空导航"。澳大利亚曾因牛粪堆积成灾专门进口蜣螂，可见分解者多么不可或缺。',
    extension: true,
    parts: [
      { name: '滚粪球', desc: '头朝下、前足抱球、后足撑地倒推——直线前进防止迷路；粪球既是幼虫的"育婴房"也是口粮。' },
      { name: '星空导航', desc: '夜间依靠银河等天光的偏振定位直线方向——2013 年实验证实，蜣螂成为已知唯一用星空导航的昆虫。' },
      { name: '分解者角色', desc: '快速埋掉粪便：肥沃土壤、传播种子、切断苍蝇和寄生虫的生活史——草原健康的"守门员"。' },
      { name: '力量纪录', desc: '能推动相当于自身体重 1000 倍的粪球——相对力量最强的动物之一。' },
      { name: '生物防治案例', desc: '澳大利亚引入异国蜣螂处理堆积如山的牛粪——引进分解者治理生态问题的经典成功案例。' },
    ],
    Svg: DungBeetleSvg,
  },
  {
    id: 'fetusPlacenta',
    name: '胎儿与胎盘',
    kicker: '生殖 · 母胎物质交换的"海关"（课外拓展）',
    intro: '胎盘是胎儿与母体之间的"中转海关"：胎儿通过脐带与胎盘相连，母体血液中的氧气和养料经扩散进入胎儿血液，胎儿的二氧化碳和废物反向排出——但两者血液始终不直接混合。胎儿体内一半基因来自父方，对母体而言是"半同种异物"，胎盘的免疫屏障让它安然发育九个月。',
    extension: true,
    parts: [
      { name: '胎盘结构', desc: '胎儿绒毛膜绒毛浸浴在母体血窦中：两层血管之间仅隔薄薄的组织——扩散交换高效进行。' },
      { name: '脐带', desc: '一条脐静脉给胎儿送含氧血，两条脐动脉把胎儿的代谢废物送回胎盘——"三车道物资线"。' },
      { name: '屏障与通道', desc: '氧气、葡萄糖、氨基酸可过；多数细菌被挡下；但病毒（风疹、艾滋）、酒精、药物能通过——孕妇用药须遵医嘱。' },
      { name: '免疫的特殊性', desc: '胎儿一半基因来自父方却未被母体排斥：胎盘的免疫豁免机制是免疫学的重要课题。' },
      { name: '羊水', desc: '胎儿悬浮在羊水中：缓冲撞击、恒温、允许自由活动以促进肌肉骨骼发育。' },
    ],
    Svg: FetusPlacentaSvg,
  },
  {
    id: 'caffeine',
    name: '咖啡因',
    kicker: '次生代谢物 · 植物的"化学武器"与人类的"提神药"（课外拓展）',
    intro: '咖啡、茶、可可都含咖啡因——它不是为人类准备的礼物，而是植物的防御武器：嫩叶和种子中浓度最高，啃食的昆虫会中毒麻痹。对人类而言，咖啡因的作用机制是"冒充"困意信号分子腺苷、抢先占住受体，让大脑收不到"该睡了"的通知——提神的本质是屏蔽，不是消除疲劳。',
    extension: true,
    parts: [
      { name: '化学身份', desc: '嘌呤类生物碱（与 DNA 里的腺嘌呤是"亲戚"），天然存在于咖啡、茶、可可、可乐果等植物中。' },
      { name: '植物的用途', desc: '次生代谢产物：高浓度下毒杀甲虫毛虫、落叶后渗入土壤抑制竞争者发芽——"化学战"防御。' },
      { name: '人体作用机制', desc: '咖啡因与腺苷分子结构相似，占据腺苷受体却不触发困意——掩蔽疲劳信号，实际疲劳并未消除。' },
      { name: '代谢与半衰期', desc: '肝脏代谢，半衰期约 5 小时——下午 4 点的一杯咖啡到晚上 9 点体内还剩一半，影响入睡。' },
      { name: '适量原则', desc: '健康成人每日 ≤400 mg（约 3~4 杯咖啡）；过量致心悸、焦虑；青少年应严格限量。' },
    ],
    Svg: CaffeineSvg,
  },
  {
    id: 'termite',
    name: '白蚁',
    kicker: '蜚蠊目 · 共生消化木头的工程师（课外拓展）',
    intro: '白蚁是"搞错名字"的昆虫：它与蟑螂是近亲（蜚蠊目），与蚂蚁反而没有亲缘。工蚁通体白色柔软，靠肠内共生的鞭毛虫分泌纤维素酶才能消化木头——这段互利共生如此深度绑定，以至于工蚁每次蜕皮丢失共生生物后，必须重新取食同伴的"肛液"补种，否则会饿死。',
    extension: true,
    parts: [
      { name: '等级社会', desc: '蚁后（可存活十余年、每天产卵数千）、蚁王、工蚁、兵蚁——由信息素与幼虫期食物决定分化。' },
      { name: '共生消化', desc: '后肠鞭毛虫（原生动物）与细菌分泌纤维素酶分解木头——白蚁、共生生物"双赢"的互利共生。' },
      { name: '渐变态发育', desc: '卵 → 若虫 → 成虫，没有蛹期（与蜜蜂的完全变态不同）；若虫即可参与巢内劳动。' },
      { name: ' architects 白蚁丘', desc: '蚁冢高达数米，内部烟道系统自动调节温湿度——没有图纸的"集体建筑设计"。' },
      { name: '生态贡献', desc: '分解木质纤维素、改良土壤——在热带生态系统中是不可或缺的"回收站"。' },
    ],
    Svg: TermiteSvg,
  },
  {
    id: 'bloodTransfusion',
    name: '输血与血型凝集',
    kicker: '循环系统 · ABO 血型系统（课外拓展）',
    intro: '输血的历史曾是一场"俄罗斯轮盘赌"，直到兰德斯坦纳发现 ABO 血型：红细胞的抗原遇血浆中的对应凝集素会"抱团"凝集，堵塞血管致命。输血原则是同型相输；O 型红细胞无抗原可少量输给他人（万能供血），AB 型血浆无凝集素可少量接受多型（万能受血）——但输血前都必须做交叉配血。',
    extension: true,
    parts: [
      { name: '凝集原理', desc: 'A 抗原 + 抗 A 凝集素相遇即凝集：红细胞"抱团"溶血、堵塞微循环——错误输血的致命机制。' },
      { name: '四种血型', desc: 'A 型（A 抗原·抗 B 凝集素）、B 型、AB 型（双抗原·无凝集素）、O 型（无抗原·双凝集素）——抗原抗体"互补不相容"。' },
      { name: '输血原则', desc: '同型相输为原则；O 型为"万能供血者"、AB 型为"万能受血者"，但仅限紧急少量——量大仍会凝集。' },
      { name: '交叉配血', desc: '供血者红细胞 + 受血者血清、反向再配一次——双向都不凝集才能输；ABO 之外还有 Rh 等 30 余种系统。' },
      { name: '成分输血', desc: '现代输血按需供给：贫血输红细胞、凝血障碍输血小板——一血多用，效率与安全兼得。' },
    ],
    Svg: BloodTransfusionSvg,
  },
  {
    id: 'dodder',
    name: '菟丝子',
    kicker: '旋花科 · 全寄生植物（课外拓展）',
    intro: '菟丝子是植物界的"寄生虫"：种子萌发后如果几天内找不到宿主就会死亡；一旦缠上大豆或柳树，茎上便生出无数吸器刺入宿主韧皮部，直接"白吃"现成的有机物——它没有叶绿素、叶片退化成细小鳞片，金黄色的细藤就是它全部的"身体"。',
    extension: true,
    parts: [
      { name: '全寄生', desc: '无叶绿素、根系退化，有机物、水、无机盐全部从宿主夺取——与半寄生（保留光合）的桑寄生不同。' },
      { name: '吸器', desc: '茎与宿主接触处生出吸器，穿透表皮伸达维管柱——直接"插管"到宿主的输导系统。' },
      { name: '化学侦察', desc: '幼苗能"嗅"到宿主释放的挥发性物质并朝其生长——命中率极高的定向搜索。' },
      { name: '种间信号窃听', desc: '菟丝子还能"接收"宿主间的开花信号分子，同步自己的开花时间——寄生关系中的"窃听者"。' },
      { name: '危害与防除', desc: '种子极小、数量巨大、随土壤与灌溉传播；轮作、清沟除苗、播种前土壤处理是主要防除手段。' },
    ],
    Svg: DodderSvg,
  },
  {
    id: 'centipede',
    name: '蜈蚣',
    kicker: '节肢动物门 · 多足纲代表（课外拓展）',
    intro: '蜈蚣把"多足"玩到极致：二十多个体节几乎每节自带一对足，波浪式推进如流水滑行；头部第一对足却特化成一对"毒颚"，能注入毒素制服比它大得多的猎物。它与蜘蛛（蛛形纲）、昆虫（昆虫纲）同门不同纲——节肢动物门的三条演化支各走各路。',
    extension: true,
    parts: [
      { name: '分节身体', desc: '躯干 20+ 个体节，背板宽窄交替——拱曲与钻缝的本钱，可在石块下灵活穿行。' },
      { name: '多足', desc: '每节一对足（多足纲的"身份证"），步足波浪式依次推进——贴地爬行几乎无声。' },
      { name: '毒颚', desc: '头部第一对附肢特化成钩状毒颚，内连毒腺：夜行捕食昆虫蜘蛛，是"有毒素的猎手"而非主动攻击者。' },
      { name: '陆生配置', desc: '气管呼吸、马氏管排氮、几丁质外骨骼——陆生节肢动物三件套，只缺水环境，喜潮湿阴暗。' },
      { name: '纲级对比', desc: '蛛形纲 4 对足 + 头胸部愈合；昆虫纲 3 对足 + 三段身体；多足纲每节一对足——足数是快速分类口诀。' },
    ],
    Svg: CentipedeSvg,
  },
  {
    id: 'sarcomere',
    name: '肌节与肌肉收缩',
    kicker: '运动系统 · 肌丝滑行学说（课外拓展）',
    intro: '一块肌肉放大三级是肌纤维，再放大是肌原纤维，其上一段段明暗相间的"单元"就是肌节——肌肉收缩的最小单位。粗肌丝（肌球蛋白）伸出的横桥抓住细肌丝（肌动蛋白），像划桨一样把细丝拖向中央，肌节缩短、肌肉收缩——丝本身不变长，靠的是相互滑行。',
    extension: true,
    parts: [
      { name: '肌节结构', desc: '两条 Z 线之间的区域：细肌丝从 Z 线伸出，粗肌丝居中——明带（只有细丝）与暗带（粗细重叠）相间形成横纹。' },
      { name: '滑行学说', desc: '横桥摆动拖曳细肌丝向肌节中央滑行：肌节缩短而肌丝长度不变——"划桨"模型解释了从肌肉到分子的统一机制。' },
      { name: '钙离子触发', desc: '神经冲动 → 肌质网释放 Ca²⁺ → 与肌钙蛋白结合暴露结合位点 → 横桥才能搭上细肌丝。' },
      { name: 'ATP 供能', desc: '横桥复位需要 ATP——人死亡后 ATP 耗尽、横桥无法分离，肌肉僵直即"尸僵"的分子解释。' },
      { name: '运动与健康', desc: '力量训练让肌纤维增粗（肌节数量与蛋白增多）；久坐则肌纤维萎缩——"用进废退"在细胞层面成立。' },
    ],
    Svg: SarcomereSvg,
  },
  {
    id: 'cordyceps',
    name: '冬虫夏草',
    kicker: '真菌界 · "僵尸真菌"的寄生策略（课外拓展）',
    intro: '冬虫夏草既不是虫也不是草，而是"虫菌复合体"：蝙蝠蛾幼虫在高原土中越冬时，被冬虫夏草菌的孢子侵入；菌丝耗尽虫体的养分，次年夏天从虫子头顶抽出一根棒状子座散播孢子——"冬虫"与"夏草"其实是同一场寄生悲剧的两个阶段。',
    extension: true,
    parts: [
      { name: '寄生过程', desc: '孢子落在幼虫体表 → 萌发侵入血腔 → 菌丝以虫体组织为食——幼虫被"掏空"并固定在土室中。' },
      { name: '子座（草）', desc: '次年入夏，菌丝从虫头抽出棒状子座伸出地表：顶端子囊壳产生孢子——真菌的繁殖结构。' },
      { name: '种间关系', desc: '对真菌是寄生（获益），对幼虫是致命伤害——与根瘤菌的互利共生形成鲜明对比。' },
      { name: '僵尸真菌家族', desc: '某些虫草属真菌能操控昆虫行为（爬到高处再死亡以利传播孢子）——寄生改变宿主行为的著名案例。' },
      { name: '资源与保护', desc: '野生冬虫夏草产自高原草甸、依赖特定蝙蝠蛾——过度采挖已致资源锐减，人工培育是保护方向。' },
    ],
    Svg: CordycepsSvg,
  },
  {
    id: 'seahorse',
    name: '海马',
    kicker: '硬骨鱼纲 · 雄性"怀孕"的鱼（课外拓展）',
    intro: '海马是鱼，却长得不像鱼：马头状的头部、管状长吻、能卷握海草的猴尾，靠背鳍每秒扇动几十次缓慢游动。最奇特的是繁殖——雌鱼把卵产进雄鱼的育儿袋，由雄海马"怀孕"两到四周，把发育完全的小海马"生"出来，是动物界雄性育幼的极致案例。',
    extension: true,
    parts: [
      { name: '独特体形', desc: '头部似马、身体被骨质环板包裹（没有鳞片）、尾部细长可卷曲——全身"盔甲"让它几乎不游泳而是直立"漂行"。' },
      { name: '管状长吻', desc: '无法咀嚼，靠鳃盖和吻的快速扩张把浮游生物"吸"进嘴里——吸力精确到能吸出藏在小缝里的糠虾。' },
      { name: '雄性育儿袋', desc: '交配时雌鱼把卵产入雄鱼袋中受精；袋壁供氧供营养并调节渗透压——"孕爸"分娩时可释放数百条幼海马。' },
      { name: '尾部卷握', desc: '尾部的抓握能力让它在海流中"锚定"海草——这使海马几乎不迁徙，栖息地破坏对它伤害极大。' },
      { name: '拟态高手', desc: '体色可随环境变化，某些海龙科亲戚（叶海龙）更像漂浮的海藻——拟态是它们唯一的防御手段。' },
    ],
    Svg: SeahorseSvg,
  },
  {
    id: 'retinaMacula',
    name: '黄斑与盲点',
    kicker: '感觉器官 · 视网膜的"高清区"与"盲区"（课外拓展）',
    intro: '视网膜不是均匀的"感光底片"：正对瞳孔的黄斑（中央凹）挤满了约 700 万个视锥细胞，是视觉最锐利的"高清区"；而视神经和血管穿出的视盘上没有任何感光细胞——这里是名副其实的"生理盲点"。平时察觉不到盲点，是因为大脑用周围的图像自动补全了。',
    extension: true,
    parts: [
      { name: '黄斑与中央凹', desc: '视网膜上直径约 1.5 mm 的黄色区域，中央凹只有视锥细胞、一个细胞对一个双极细胞——分辨率最高，读书时目光正落在这里。' },
      { name: '两类视细胞', desc: '视锥细胞（约 700 万）负责明视与色觉，分红绿蓝三种；视杆细胞（约 1.2 亿）负责暗视，夜行动物占比极高。' },
      { name: '视盘与生理盲点', desc: '视神经汇集穿出眼球的地方没有感光细胞——视野中存在一个永远"看不见"的区域，可用闭眼十字测试找到它。' },
      { name: '大脑"脑补"', desc: '视觉皮层用盲点周围的图像信息自动填补空缺——我们"看到"的世界，一半是视网膜、一半是大脑的推断。' },
      { name: '健康提示', desc: '黄斑是老年性黄斑变性的病灶区（中心视力丧失）；紫外线和长期蓝光暴露会加速黄斑损伤——户外戴墨镜有依据。' },
    ],
    Svg: MaculaSvg,
  },
  {
    id: 'biogas',
    name: '沼气池',
    kicker: '微生物工程 · 农村清洁能源（课外拓展）',
    intro: '密闭的沼气池里没有氧气，产甲烷菌（一类严格厌氧的古菌）却如鱼得水：它们把秸秆、粪便分解成以甲烷为主的沼气——可做饭、可照明。发酵残余的沼渣沼液是优质有机肥，回田又养作物——一座沼气池就是生态农业"物质循环再生"原理的活教材。',
    extension: true,
    parts: [
      { name: '发酵池', desc: '密闭无氧环境：人畜粪便、秸秆、污水在多种微生物协同下分两步分解——先产酸、再产甲烷。' },
      { name: '产甲烷菌', desc: '严格厌氧的古菌，氧气会让它无法生存——所以沼气池必须密封，这既是产气条件也是安全要求。' },
      { name: '沼气', desc: '甲烷占 60%~70%，热值高；甲烷还是强温室气体——收集利用它比直接排放环保得多。' },
      { name: '沼渣沼液', desc: '发酵残余物富含氮磷和有机质，是杀灭多数病菌虫卵后的优质有机肥——"废物"的完整资源化。' },
      { name: '生态学意义', desc: '实现物质循环再生与能量多级利用：改善卫生、提供能源、减少砍柴——小池子连着大生态。' },
    ],
    Svg: BiogasSvg,
  },
  {
    id: 'firefly',
    name: '萤火虫',
    kicker: '鞘翅目 · 生物发光的"信号灯"（课外拓展）',
    intro: '萤火虫的腹部末端有一座微型"冷光灯"：荧光素在荧光素酶的催化下与氧气、ATP 反应，把化学能几乎全部转化为光而非热，效率远超人类的人造光源。每闪烁一次都是求偶信号——不同种类萤火虫的闪光节奏像"摩斯密码"，确保只与同种配对。',
    extension: true,
    parts: [
      { name: '发光器', desc: '腹部末端的发光层：发光细胞内含荧光素，气管为反应供氧，反射层把光向下投射。' },
      { name: '发光原理', desc: '荧光素 + O₂ + ATP 在荧光素酶催化下生成氧化荧光素并释放光子——冷光效率接近 100%，是无污染的"绿色光源"。' },
      { name: '闪光密码', desc: '每种萤火虫的闪光频率、时长与飞行轨迹不同——同性别的"应答"必须对上"暗号"，这是生殖隔离的行为保障。' },
      { name: '诱捕策略', desc: '某些种类的雌虫会模仿别种的闪光密码引诱雄虫并捕食——"攻击性拟态"的经典案例。' },
      { name: '生态指示', desc: '萤火虫幼虫捕食蜗牛，成虫几乎不进食；对光污染与水污染极其敏感——萤火虫消失是环境退化的警报。' },
    ],
    Svg: FireflySvg,
  },
  {
    id: 'pituitary',
    name: '垂体',
    kicker: '内分泌 · "总司令"的枢纽（课外拓展）',
    intro: '垂体只有豌豆大小，藏在大脑底部的蝶鞍里，却是激素调节的"中转枢纽"：腺垂体分泌生长激素和多种促激素指挥甲状腺、肾上腺皮质、性腺；神经垂体释放由下丘脑合成的抗利尿激素和催产素。而它头顶的下丘脑才是真正的"最高统帅"——把神经信号翻译成激素指令。',
    extension: true,
    parts: [
      { name: '位置', desc: '悬于下丘脑下方，借垂体柄相连，安坐在蝶骨的"蝶鞍"内——解剖位置即暗示它与脑的从属关系。' },
      { name: '腺垂体', desc: '分泌生长激素（幼年过多→巨人症、过少→侏儒症）和促甲状腺激素、促肾上腺皮质激素、促性腺激素等"指挥官激素"。' },
      { name: '神经垂体', desc: '不合成激素，只储存释放下丘脑运来的抗利尿激素（缺乏→尿崩症，每天排尿十几升）和催产素。' },
      { name: '分级调节', desc: '下丘脑→垂体→靶腺的三级 axis（如甲状腺轴）实现放大与精细调控——负反馈让各级激素水平稳定。' },
      { name: '考点提示', desc: '"垂体是内分泌枢纽，下丘脑是调节中枢"——神经调节与体液调节在此交汇。' },
    ],
    Svg: PituitarySvg,
  },
  {
    id: 'mimosa',
    name: '含羞草',
    kicker: '豆科 · 会"害羞"的感震植物（课外拓展）',
    intro: '轻碰含羞草的叶片，几秒内小叶成对闭合、叶柄下垂——它没有肌肉，靠的是叶枕细胞快速的膨压变化：受刺激后钾离子和水分从叶枕下侧细胞流出，细胞失水"瘪掉"，叶片随之垂下。这种感震运动能减少风雨伤害、吓退停落的昆虫，十分钟左右又自动恢复。',
    extension: true,
    parts: [
      { name: '感震运动', desc: '受机械刺激后小叶成对闭合、整片复叶下垂——传播速度可达每秒 1~2 厘米，沿叶脉扩散。' },
      { name: '叶枕机制', desc: '叶柄基部和小叶基部的膨大"关节"：运动细胞通过钾离子快速进出改变渗透压，失水瘪缩即闭合。' },
      { name: '电信号传导', desc: '动作电位沿茎叶传导——与神经传导类似的"植物电"，只是速度慢得多。' },
      { name: '适应意义', desc: '骤雨大风时闭合防损伤；突然闭合可抖落停脚的昆虫——运动也是一种防御。' },
      { name: '睡眠运动', desc: '含羞草夜晚也会"睡觉"（叶片合拢）——由生物钟控制的感夜运动，与感震运动机制相似但触发源不同。' },
    ],
    Svg: MimosaSvg,
  },
  {
    id: 'tardigrade',
    name: '水熊虫',
    kicker: '缓步动物门 · 极端生存冠军（课外拓展）',
    intro: '水熊虫体长不到 1 毫米，用八条小短腿在苔藓水膜里缓步爬行，却是地球上生命力最强的动物：环境恶化时脱水蜷成"小桶"进入隐生状态，代谢几乎归零，却能耐受 -272°C 的极寒、151°C 的高温、真空和强辐射，遇水几十年后仍能满血复活——它们甚至在国际空间站舱外裸露 10 天后成功繁殖了后代。',
    extension: true,
    parts: [
      { name: '形态与分类', desc: '缓步动物门：体长 0.05~1.2 mm，八条腿带爪，用口针刺入植物细胞或捕食微型动物。' },
      { name: '隐生现象', desc: '脱水时身体收缩成"小桶"（tun），用海藻糖替代水保护细胞结构，代谢降到正常水平的 0.01% 以下。' },
      { name: '极端耐受', desc: '记录到的耐受范围：接近绝对零度到 151°C、600 MPa 高压、真空、强紫外线与宇宙辐射——没有其他多细胞动物能与之相比。' },
      { name: '太空实验', desc: '2007 年"生命之光"任务把水熊虫直接暴露在太空真空与紫外线下 10 天，返回后不仅存活还产下健康后代。' },
      { name: '抗性机制', desc: '体内独有的 Dsup 蛋白像"盾牌"一样包裹 DNA，抵抗辐射造成的断裂——为材料与医学研究提供了灵感。' },
    ],
    Svg: TardigradeSvg,
  },
  {
    id: 'lymphNode',
    name: '淋巴结',
    kicker: '免疫器官 · 淋巴液的"边防哨所"（课外拓展）',
    intro: '全身约有 500~800 枚淋巴结串在淋巴管沿途，像一处处"边防哨所"：输入淋巴管把组织液中的病原体、异物碎片甚至转移的癌细胞送进结内，巨噬细胞与树突状细胞负责拦截呈递，B 细胞和 T 细胞在皮质与髓质里识别抗原、活化增殖——感冒时颌下能摸到的"小疙瘩"，正是免疫应答正在进行的信号。',
    extension: true,
    parts: [
      { name: '结构', desc: '豆形，大小 1~25 mm：皮质有淋巴小结（B 细胞区），深层副皮质区（T 细胞区），髓质含浆细胞与巨噬细胞。' },
      { name: '过滤功能', desc: '淋巴液缓缓流过淋巴窦，其中的病原体被巨噬细胞吞噬清除——"哨所"拦截率极高。' },
      { name: '免疫活化场', desc: '树突状细胞把抗原呈递给 T 细胞，B 细胞在生发中心快速增殖分化为浆细胞——适应性免疫的"指挥部"。' },
      { name: '淋巴结肿大', desc: '局部感染时淋巴细胞大量增殖导致肿大、触痛（如颌下、腋窝、腹股沟）；无痛性进行性肿大需警惕淋巴瘤。' },
      { name: '临床意义', desc: '癌细胞常沿淋巴管转移——手术清扫"前哨淋巴结"可判断肿瘤扩散范围。' },
    ],
    Svg: LymphNodeSvg,
  },
  {
    id: 'telomere',
    name: '端粒与细胞衰老',
    kicker: '细胞生物学 · 衰老的分子时钟（课外拓展）',
    intro: '端粒是染色体末端由重复 DNA 序列组成的"保护帽"，像鞋带头的塑料套防止遗传物质磨损。问题是：每次细胞分裂，端粒都会缩短一小截——短到临界值，细胞就停止分裂进入衰老（Hayflick 极限约 50 次）。生殖细胞和癌细胞靠端粒酶修复端粒而"近乎不死"，正常体细胞则几乎没有——端粒就是细胞寿命的分子时钟。',
    extension: true,
    parts: [
      { name: '端粒的结构', desc: '染色体末端的重复序列（人类为 TTAGGG）与结合蛋白：像"鞋带头"保护染色体末端不被降解、不互相粘连。' },
      { name: '末端复制难题', desc: 'DNA 聚合酶无法完全复制链末端——每分裂一次端粒缩短 50~100 个碱基，这是细胞分裂次数有限的根本原因。' },
      { name: 'Hayflick 极限', desc: '人类体细胞在体外培养约分裂 50 次便停止——1961 年发现，推翻了"细胞永生"的旧观念。' },
      { name: '端粒酶', desc: '以自身 RNA 为模板延长端粒的逆转录酶：生殖细胞、干细胞有活性，约 85% 的癌细胞重新激活它而获得无限增殖能力。' },
      { name: '研究意义', desc: '端粒长度被视为"生物学年龄"的指标之一；2009 年诺贝尔奖授予端粒与端粒酶的发现——但盲目"补端粒"会放大癌症风险。' },
    ],
    Svg: TelomereSvg,
  },
  {
    id: 'flounder',
    name: '比目鱼',
    kicker: '硬骨鱼 · 变态发育的底栖者（课外拓展）',
    intro: '"规行矩步，比目之鱼"——比目鱼的幼鱼本是两侧对称的正常鱼形，浮在水面上生活；数周后一侧的眼睛经颅骨"搬家"到另一侧，身体侧扁贴伏海底，有眼的一侧体色还能随底质变化。从"正常"到"躺平"的变态发育，是鱼类中罕见的适应路线。',
    extension: true,
    parts: [
      { name: '对称幼鱼期', desc: '孵化初期与普通鱼无异：两眼分列头两侧，在水的上层漂浮觅食。' },
      { name: '变态发育', desc: '约数周内颅骨扭曲，一侧眼睛移位到另一侧，口也发生偏转，身体侧扁——甲状腺激素参与调控这场"大改造"。' },
      { name: '两眼同侧', desc: '成鱼两眼位于朝上的一侧，视野覆盖上方水域——潜伏时仍能监视猎物与天敌。' },
      { name: '体色拟态', desc: '有眼侧皮肤内的色素细胞随底质颜色调整（深沙、碎石、斑驳），无眼侧则保持白色。' },
      { name: '底栖适应', desc: '伏击小型底栖动物、埋身沙中躲天敌——"躺平"不是退化，而是开辟底栖生态位的创新。' },
    ],
    Svg: FlounderSvg,
  },
  {
    id: 'adrenal',
    name: '肾上腺',
    kicker: '内分泌 · 应急反应的引擎（课外拓展）',
    intro: '肾上腺像两顶小帽子盖在肾脏上方的内侧，却分内外两层"车间"：外层皮质分泌糖皮质激素（升高血糖、抗炎抗过敏）和盐皮质激素（保钠保水）；内层髓质受交感神经直接支配，紧急时刻泵出肾上腺素——心跳加速、血压升高、血糖上升，这就是"应激反应"的化学基础。',
    extension: true,
    parts: [
      { name: '位置与结构', desc: '左右各一，位于肾脏上内侧；从外到内分被膜、皮质、髓质三层，皮质与髓质来源、功能完全不同。' },
      { name: '皮质·糖皮质激素', desc: '以皮质醇为代表：升高血糖、动员脂肪、抑制炎症与免疫——临床用于抗炎抗过敏，长期滥用有严重副作用。' },
      { name: '皮质·盐皮质激素', desc: '醛固酮促进肾小管重吸收钠和水、排钾——参与水盐平衡调节（与抗利尿激素协同）。' },
      { name: '髓质·肾上腺素', desc: '受交感神经节前纤维直接支配（可视为特化的神经节）：应急时释放肾上腺素和去甲肾上腺素——配合神经系统的"战或逃"反应。' },
      { name: '昼夜节律', desc: '皮质醇分泌有昼夜高峰（清晨唤醒人体）；熬夜、倒班打乱节律会影响免疫与代谢——规律作息的生理学依据。' },
    ],
    Svg: AdrenalSvg,
  },
  {
    id: 'endosymbiosis',
    name: '内共生学说',
    kicker: '细胞生物学 · 细胞器的起源（课外拓展）',
    intro: '线粒体和叶绿体为什么有自己独立的 DNA 和核糖体？内共生学说的回答：它们的前身是被原始真核细胞吞入却未被消化的细菌——好氧细菌演化为线粒体（"发电厂"），蓝细菌演化为叶绿体（"养料车间"）。双层膜、环状 DNA、70S 核糖体，都是这段共生历史的"化石证据"。',
    extension: true,
    parts: [
      { name: '学说的内容', desc: '约 15~20 亿年前：古真核细胞吞入好氧细菌与蓝细菌，二者未被消化反而建立共生，逐渐演化为半自主的细胞器。' },
      { name: '证据一：自主性', desc: '线粒体和叶绿体拥有自己的环状 DNA，能半自主复制，随细胞分裂平均分配。' },
      { name: '证据二：双层膜', desc: '内膜来自细菌自身的细胞膜，外膜来自宿主吞噬泡的膜——双层膜结构是"吞而未消"的记录。' },
      { name: '证据三：核糖体', desc: '两者都含 70S 型核糖体（与细菌相同），而真核细胞质是 80S——抗生素（如四环素）抑制细菌核糖体也会影响它们。' },
      { name: '演化意义', desc: '真核细胞不是"从零设计"，而是多次内共生的组装产物——这一学说把细胞生物学与演化论连接起来。' },
    ],
    Svg: EndosymbiosisSvg,
  },
  {
    id: 'penguin',
    name: '企鹅',
    kicker: '鸟纲 · 放弃飞行的潜水冠军（课外拓展）',
    intro: '企鹅是鸟类最彻底的"转型者"：前肢变成鳍翅"飞"进水里，骨骼不再中空而是充满骨髓以利潜水，皮下厚脂肪和片状羽毛叠成的"防寒服"能抵御南极 -60°C 的严寒。帝企鹅更是把育雏做到极致——雄鸟在极夜中孵卵 65 天禁食不进食。',
    extension: true,
    parts: [
      { name: '鳍翅', desc: '前肢高度特化为坚硬短桨：游速可达每小时 10 km，还能跃出冰面——飞行能力换来了"水中飞行"。' },
      { name: '拟态配色', desc: '背面深色腹面白色：水中捕食者从上往下看是深色海面、从下往上看是亮色天空——与鲨鱼相同的 countershading 策略。' },
      { name: '防寒装备', desc: '皮下脂肪厚达数厘米；羽毛细密如鳞片彼此咬合锁住空气层—— feathers 出水即抖干。' },
      { name: '直立行走', desc: '腿位于身体最后方——陆地上左右摇摆步行或俯冲滑行，模样笨拙却是水中灵活的代价。' },
      { name: '雄性孵卵', desc: '帝企鹅雄鸟把单枚卵放在脚上用腹部皮褶覆盖，极夜中孵卵约 65 天、禁食减重近半——亲代投资的极端案例。' },
    ],
    Svg: PenguinSvg,
  },
  {
    id: 'boneMarrow',
    name: '骨髓',
    kicker: '造血器官 · 血细胞的"摇篮"（课外拓展）',
    intro: '骨髓藏在长骨的髓腔和骨松质的空隙里：婴幼儿的骨骼几乎全是红骨髓，5 岁后长骨中段转为黄骨髓（脂肪储存），但长骨两端、髂骨和脊椎的红骨髓终身造血。造血干细胞在这里源源不断地分化出红细胞、白细胞和血小板——白血病骨髓移植正是用它"重装系统"。',
    extension: true,
    parts: [
      { name: '红骨髓与黄骨髓', desc: '红骨髓有活跃的造血功能；黄骨髓以脂肪为主（大出血时可重新转化造血——应急储备）。' },
      { name: '造血干细胞', desc: '专能干细胞：自我更新的同时分化为红细胞、白细胞、血小板三系——血细胞寿命短（红细胞约 120 天），靠它终身补充。' },
      { name: '血细胞的三条出路', desc: '红细胞运氧、白细胞防御、血小板凝血——检验血常规就是检查这三条"生产线"是否正常。' },
      { name: '骨髓移植', desc: '白血病的造血干细胞恶变：大剂量化疗清除后移植健康造血干细胞重建造血与免疫——"配型"即 HLA 相容性筛选。' },
      { name: '捐献的真相', desc: '现代外周血造血干细胞捐献类似"延长版献血"：注射动员剂把干细胞从骨髓"赶"到血液中采集——并非抽骨髓。' },
    ],
    Svg: BoneMarrowSvg,
  },
  {
    id: 'mycorrhiza',
    name: '菌根',
    kicker: '真菌与根的地下联盟（课外拓展）',
    intro: '约 90% 的陆生植物根系都与真菌结成"菌根"同盟：真菌菌丝像千万条微管深入根毛够不到的土壤缝隙，把水和磷、锌等矿物质送给植物，植物则把光合产物（糖类）分给真菌。这些菌丝还在地下连成"木维网"，让整片森林共享资源、互通信号。',
    extension: true,
    parts: [
      { name: '菌根结构', desc: '外生菌根包裹根尖（松树、栎树）；内生菌根（丛枝菌根）侵入根皮层细胞内——大多数植物属于后者。' },
      { name: '吸收面积放大', desc: '一根菌丝直径仅几微米却能延伸数米——使植物根系的吸收面积扩大数百倍，尤其高效吸收磷。' },
      { name: '互利共生', desc: '植物提供光合产物（糖类），真菌回报水分和矿物质——两者相互依赖，单独培养都长得差。' },
      { name: '木维网', desc: '菌丝把同种甚至不同种的树连成地下网络：可以传递碳、氮和防御信号（"母树"通过它哺育幼苗）。' },
      { name: '演化意义', desc: '4 亿年前真菌联盟帮助最早的植物登上陆地获取养分——没有菌根，可能就没有今天的森林。' },
    ],
    Svg: MycorrhizaSvg,
  },
  {
    id: 'crocodile',
    name: '鳄鱼',
    kicker: '爬行纲 · 鳄目的"例外"（课外拓展）',
    intro: '鳄鱼是爬行动物中的"高性能例外"：唯一拥有四个腔心脏的现生爬行动物，血液分隔更完全、代谢更旺盛；母鳄还会守巢护卵、听幼鳄叫声帮它们破壳下水——颠覆"爬行动物冷血无情"的刻板印象。',
    extension: true,
    parts: [
      { name: '鳞甲与脊棱', desc: '背部角质鳞片下有骨质板甲，背部的角质脊棱既防御又调节浮力。' },
      { name: '长吻与齿', desc: '圆锥形牙齿只会"钳咬"不会咀嚼，猎物靠翻滚撕扯成块；牙终生可更换（一生约换 50 次）。' },
      { name: '四腔心脏', desc: '爬行纲中独一份：两心房两心室，动静脉血分隔完全——支持更活跃的水陆两栖生活。' },
      { name: '半水生潜伏', desc: '眼、鼻孔、耳孔都排在头顶同一直线——身体完全没入水中也能看、听、呼吸。' },
      { name: '温度决定性别', desc: '巢温约 31~32°C 是"分水岭"：偏暖多雄、偏凉多雌——全球变暖正威胁鳄类种群的性别比例。' },
      { name: '育幼行为', desc: '母鳄守巢数月，听到幼鳄叫声会帮忙破壳并衔它们下水——爬行动物中少见的亲代抚育。' },
    ],
    Svg: CrocodileSvg,
  },
  {
    id: 'largeIntestine',
    name: '大肠与阑尾',
    kicker: '消化管末端 · 水分回收站（课外拓展）',
    intro: '大肠分盲肠、结肠、直肠三段，每天回收约 1.5 L 水分和无机盐，把食糜残渣"压缩"成粪便；肠道细菌在这里合成维生素 K。挂在盲肠末端的阑尾并非无用——它富含淋巴组织是免疫器官，只是发炎时会给你一场"转移性右下腹痛"。',
    extension: true,
    parts: [
      { name: '结肠走形', desc: '升结肠→横结肠→降结肠→乙状结肠，形成"门"字形框架包围小肠。' },
      { name: '吸收水分', desc: '食物残渣在大肠停留十几个小时，90% 以上的水分在此被回收——腹泻的本质就是水分来不及吸收。' },
      { name: '菌群与维生素', desc: '大肠细菌合成维生素 K 和部分 B 族维生素供人体吸收——与"肠道菌群"标本互为补充。' },
      { name: '阑尾', desc: '盲肠末端的细长盲管：富含淋巴组织参与免疫；粪石梗阻继发细菌感染即阑尾炎，典型表现是转移性右下腹痛。' },
      { name: '排便反射', desc: '粪便进入直肠牵张感受器 → 传向脊髓低级中枢 → 大脑决定是否排便——又一例"低级中枢受高级中枢调控"。' },
    ],
    Svg: LargeIntestineSvg,
  },
  {
    id: 'ecosystemServices',
    name: '生态系统的服务',
    kicker: '保护生物学 · 生态价值（课外拓展）',
    intro: '生态系统默默为人类提供四类"服务"：供给服务（粮食淡水木材）、调节服务（调节气候净化环境）、支持服务（土壤形成养分循环传粉）和文化服务（游憩审美科研）。这些"看不见的账单"价值估算超过全球 GDP——保护生态不是慈善，而是守护人类自己的资产负债表。',
    extension: true,
    parts: [
      { name: '供给服务', desc: '食物、淡水、木材、纤维、药材——最直观、最容易被计入 GDP 的一类。' },
      { name: '调节服务', desc: '森林固碳调节气候、湿地净化水质、红树林消浪防洪——"看不见"却不可替代。' },
      { name: '支持服务', desc: '土壤形成、养分循环、传粉与物种维持——支撑其他所有服务的基础性服务。' },
      { name: '文化服务', desc: '自然景观的游憩与审美价值、科研教育价值——绿水青山的精神馈赠。' },
      { name: '保护的经济逻辑', desc: '传粉昆虫支撑全球约三分之一农作物；破坏支持服务的代价远超短期开发收益——"绿水青山就是金山银山"。' },
    ],
    Svg: EcosystemServicesSvg,
  },
  {
    id: 'beeHive',
    name: '蜜蜂',
    kicker: '昆虫纲 · 社会性生活的典范（课外拓展）',
    intro: '一个蜂群就是一座精密运转的"城市"：蜂后专职产卵，数万只不育的工蜂按日龄轮换保育、筑巢、守卫、采蜜的岗位，雄蜂只负责婚飞。工蜂的 8 字舞用角度和摇臀时长告诉同伴蜜源的方向和距离——昆虫也有自己的"语言"。',
    extension: true,
    parts: [
      { name: '蜂后', desc: '一个蜂群唯一的生殖雌性：由受精卵幼虫持续喂蜂王浆发育而成，寿命长达数年，分泌"蜂王物质"抑制其他雌蜂卵巢发育。' },
      { name: '工蜂', desc: '不育雌性（约 6 万只）：按日龄做保育、筑巢、守卫、采蜜工作——级型分化由食物（蜂王浆）决定，不是基因不同。' },
      { name: '雄蜂', desc: '由未受精卵发育（单倍体），唯一职能是与新蜂后婚飞交配，之后即死亡。' },
      { name: '六角形巢房', desc: '蜂蜡筑成的六角柱形巢房以最少的材料获得最大的容积——育婴与储蜜两用的"标准间"。' },
      { name: '8 字舞', desc: '采蜜蜂回巢后跳 8 字舞：中轴与垂直线的夹角指示蜜源相对太阳的方向，摇臀次数表示距离——经典的动物信息传递案例。' },
    ],
    Svg: BeeHiveSvg,
  },
  {
    id: 'tooth',
    name: '牙齿',
    kicker: '消化系统 · 消化的第一道工序（课外拓展）',
    intro: '消化从牙齿开始：门齿切断、犬齿撕扯、臼齿研磨——哺乳动物的牙齿分化成不同形状（异型齿），与鱼爬行类的同型齿不同。牙冠外层的釉质是人体最坚硬的组织，但挡不住糖与细菌的联合进攻——龋齿就是"酸腐蚀"的结果。',
    extension: true,
    parts: [
      { name: '三型牙齿', desc: '门齿切、犬齿撕、臼齿磨——食肉动物犬齿发达、食草动物臼齿宽平，牙齿形态与食性相适应。' },
      { name: '牙齿结构', desc: '外层釉质（人体最硬的组织，但损坏后不可再生）→ 牙本质 → 内层牙髓（含神经血管，蛀到这一层会剧痛）。' },
      { name: '牙周支持', desc: '牙根埋在颌骨的牙槽窝内，由牙周膜纤维悬挂固定——刷牙出血常是牙周膜发炎的信号。' },
      { name: '龋齿的成因', desc: '变形链球菌分解糖类产酸，腐蚀釉质形成龋洞——少吃糖、认真刷牙、窝沟封闭是三道防线。' },
      { name: '消化的起点', desc: '牙齿的物理研磨增大食物与消化酶的接触面积，配合唾液淀粉酶——细嚼慢咽是最省钱的"养胃"。' },
    ],
    Svg: ToothSvg,
  },
  {
    id: 'antibiotic',
    name: '抗生素',
    kicker: '微生物药物 · 青霉素与耐药性（课外拓展）',
    intro: '1928 年弗莱明发现青霉菌的分泌物能抑制葡萄球菌——青霉素开启抗生素时代。它像"精确制导武器"：破坏细菌独有的细胞壁合成，让细菌吸水胀破，而人体细胞没有细胞壁所以几乎不受伤害。但滥用抗生素的选择压力正在催生耐药的"超级细菌"。',
    extension: true,
    parts: [
      { name: '发现史', desc: '弗莱明注意到培养皿中青霉菌周围的细菌被"清空"，1940 年代弗洛里与钱恩实现量产——三人共获 1945 年诺贝尔奖。' },
      { name: '作用机制', desc: '青霉素抑制肽聚糖（细胞壁骨架）的交联合成：细菌不断吸水却没有"城墙"保护而胀破。' },
      { name: '选择性毒性', desc: '靶点只存在于细菌（细胞壁、核糖体 70S、叶酸代谢）——人细胞没有这些结构，所以治疗指数高。' },
      { name: '耐药性的本质', desc: '耐药突变在使用之前就随机存在，抗生素只是起了选择作用（定向改变菌群基因频率）——与工业害虫抗药性同原理。' },
      { name: '合理使用', desc: '足量足疗程（半途停药等于"训练"耐药菌）、不滥用（病毒性感冒吃抗生素无效）、必要时药敏试验选药。' },
    ],
    Svg: AntibioticSvg,
  },
  {
    id: 'octopus',
    name: '乌贼（头足纲）',
    kicker: '软体动物门 · 头足纲代表（课外拓展）',
    intro: '乌贼把软体动物的设计推向极致：外套膜与漏斗配合"喷水推进"，是海洋里的喷气式快艇；8 条腕加 2 条长触腕布满吸盘；皮肤上的色素细胞能在眨眼间变色"说话"，遇到危险还能喷墨遁逃。它的眼和大脑是所有无脊椎动物中最发达的。',
    extension: true,
    parts: [
      { name: '外套膜与漏斗', desc: '外套膜腔吸水后用力收缩，水流从漏斗喷出——靠反冲推进后退疾游，是头足纲的"喷气引擎"。' },
      { name: '腕与触腕', desc: '8 条短腕 + 2 条可伸缩的长触腕，内缘排列吸盘，迅速擒住鱼虾送入口中撕食。' },
      { name: '色素细胞', desc: '皮肤里数百万个色素囊受神经直接控制，不到一秒就能切换"迷彩服"——伪装与"对话"两用（无脊椎动物中最快的变色）。' },
      { name: '墨囊', desc: '储存浓稠的墨汁，遇险时喷入水中形成"烟幕弹"，还能麻痹捕食者的嗅觉。' },
      { name: '高配的大脑', desc: '神经系统高度集中形成软骨保护的脑，学习与记忆能力堪比脊椎动物——与蜗牛等低等软体动物对比鲜明。' },
    ],
    Svg: OctopusSvg,
  },
  {
    id: 'tonsil',
    name: '扁桃体',
    kicker: '免疫关卡 · 咽喉守门员（课外拓展）',
    intro: '张口发出的"啊——"两侧各有一枚椭圆的腭扁桃体：表面凹凸的隐窝像陷阱一样截留随空气和食物入侵的病原菌，内部密集的淋巴细胞则是围歼它们的"部队"。扁桃体发炎的红肿热痛，正是免疫系统在前线战斗的炎症反应。',
    extension: true,
    parts: [
      { name: '位置', desc: '一对腭扁桃体位于口咽两侧，是进食和呼吸的必经关卡——病原菌入侵的"第一现场"。' },
      { name: '隐窝结构', desc: '表面凹陷的隐窝增加接触面积，截留抗原物质并"递送"给内部的免疫细胞识别。' },
      { name: '免疫功能', desc: '富含淋巴细胞和巨噬细胞，儿童期（5~7 岁）最活跃——是训练免疫应答的"新兵训练营"。' },
      { name: '扁桃体炎', desc: '隐窝内细菌大量繁殖引发感染：红肿、疼痛、化脓——多数由链球菌引起，是免疫战斗的表现。' },
      { name: '要不要切', desc: '只有反复化脓性发炎、影响生活或引发肾炎风湿时才考虑切除——它毕竟是重要的免疫器官。' },
    ],
    Svg: TonsilSvg,
  },
  {
    id: 'microbiome',
    name: '肠道菌群',
    kicker: '人体微生物组 · "第二基因组"（课外拓展）',
    intro: '人的肠道里生活着约 100 万亿个细菌，数量是人体自身细胞的 3 倍以上：它们帮你消化纤维素、合成维生素 K 和 B 族、训练免疫系统，甚至通过"肠-脑轴"影响情绪。菌群平衡是健康的重要一环——膳食纤维就是有益菌最爱的"口粮"。',
    extension: true,
    parts: [
      { name: '数量与构成', desc: '肠道细菌约 100 万亿个，以拟杆菌、双歧杆菌、乳酸菌等为主——基因总数是人类的百余倍，被称为"第二基因组"。' },
      { name: '消化功能', desc: '人类没有分解纤维素的酶，肠道菌把它发酵成短链脂肪酸供肠上皮利用——"吃草"能力全靠共生菌。' },
      { name: '免疫训练', desc: '无菌动物免疫系统发育不全：肠道菌群持续"低强度演练"免疫系统，学会区分敌我——过敏与菌群失衡相关。' },
      { name: '肠-脑轴', desc: '肠道菌产生的神经活性物质可经迷走神经和血液影响大脑——"吃得对心情好"有微生物学依据。' },
      { name: '养护菌群', desc: '膳食纤维（益生元）喂养有益菌；酸奶、泡菜等发酵食品补充益生菌；滥用抗生素会"误伤"菌群导致失衡。' },
    ],
    Svg: MicrobiomeSvg,
  },
  {
    id: 'mantis',
    name: '螳螂',
    kicker: '昆虫纲 · 捕食性拟态大师（课外拓展）',
    intro: '螳螂是昆虫世界的伏击猎手：三角形的头可以灵活转动，双眼形成立体视觉精确测距；一对镰刀状的捕捉足内侧列生尖刺，夹住猎物便无法脱身。兰花螳螂更是把拟态玩到极致——身体酷似花瓣，静候访花昆虫自投罗网。',
    extension: true,
    parts: [
      { name: '三角形头', desc: '头部可在近 180° 范围转动（昆虫中罕见），一对大眼间距宽，能立体视觉判断猎物距离。' },
      { name: '捕捉足', desc: '前足特化为折叠的"镰刀"，股节与胫节内侧两排尖刺像咬合的夹子——出击只需约 0.1 秒。' },
      { name: '拟态', desc: '兰花螳螂拟态花瓣、枯叶螳螂拟态叶片——体色形态欺骗猎物或天敌，是自然选择塑造的适应。' },
      { name: '螵蛸', desc: '雌虫分泌泡沫把卵包成卵鞘（中药名"螵蛸"），泡沫硬化抵御寒冬——卵在鞘内越年后孵化。' },
      { name: '发育类型', desc: '不完全变态：卵 → 若虫 → 成虫，没有蛹期；若虫形似成虫但翅未长成（对比家蚕的完全变态）。' },
    ],
    Svg: MantisSvg,
  },
  {
    id: 'nasalCavity',
    name: '鼻与嗅觉',
    kicker: '感觉器官 · 化学感受（课外拓展）',
    intro: '鼻腔不只是空气通道：鼻毛和鼻甲把吸入的空气过滤、加温、加湿，而鼻腔顶部的黄褐色嗅黏膜藏着约 400 种嗅觉受体——嗅细胞是人体唯一暴露于体表的神经元，它们把气味分子的信息直接传给嗅球和大脑，让我们分辨约 1 万亿种气味。',
    extension: true,
    parts: [
      { name: '鼻腔的预处理', desc: '鼻毛过滤灰尘、鼻甲黏膜血管丰富——把冷空气加温加湿到接近体温再进入肺。' },
      { name: '嗅黏膜与嗅细胞', desc: '位于鼻腔顶部：气味分子必须先溶于黏液才能与嗅细胞上的受体结合——所以鼻子湿才灵敏。' },
      { name: '嗅觉传导通路', desc: '嗅细胞（唯一直接暴露于外界的神经元）→ 嗅球 → 嗅神经 → 大脑嗅觉中枢，不经丘脑直达皮层——所以气味最容易唤起记忆。' },
      { name: '嗅觉与味觉协同', desc: '吃饭闻到的"香味"大部分来自咀嚼时从鼻后通路到达嗅黏膜的气味——感冒鼻塞时味觉只剩酸甜苦咸鲜五种基本味。' },
      { name: '灵敏度的代价', desc: '嗅觉适应很快（久居兰室不闻其香——受体暂时钝化），但对有害气体（煤气加臭味剂）的预警依然关键。' },
    ],
    Svg: NasalCavitySvg,
  },
  {
    id: 'vaccineTypes',
    name: '疫苗的种类',
    kicker: '免疫预防 · 人工主动免疫（课外拓展）',
    intro: '疫苗的共同原理是把"无害的抗原"送进人体，让免疫系统在真正遇到病原之前先进行一次演习：产生抗体和记忆细胞。按技术路线可分四代——减毒活疫苗、灭活疫苗、亚单位/类毒素疫苗，以及最新的 mRNA 和病毒载体疫苗。',
    extension: true,
    parts: [
      { name: '减毒活疫苗', desc: '毒力大幅减弱但仍能有限复活的活病原（麻疹、水痘、卡介苗）：免疫反应强而持久，往往只需一两针；免疫功能低下者慎用。' },
      { name: '灭活疫苗', desc: '物理或化学方法彻底杀死的病原（狂犬、流感）：非常安全，但不能增殖，通常需要多次接种加强。' },
      { name: '亚单位/类毒素疫苗', desc: '只用病原的蛋白片段或脱毒的毒素（乙肝、百白破）：不含完整病原、最安全，常需配佐剂增强免疫。' },
      { name: 'mRNA/载体疫苗', desc: '递送编码抗原的 mRNA 或改造病毒"图纸"，让人体细胞自己生产抗原——研发速度快（新冠 mRNA 疫苗）。' },
      { name: '原理与记忆', desc: '疫苗引起的是人工主动免疫：初次免疫慢而弱但留下记忆细胞，真正的病原再来时二次免疫快而强——对比：注射抗体（如抗毒素）是人工被动免疫。' },
    ],
    Svg: VaccineTypesSvg,
  },
  {
    id: 'dragonfly',
    name: '蜻蜓',
    kicker: '昆虫纲 · 半变态捕食者（课外拓展）',
    intro: '蜻蜓是昆虫界的"战斗机"：一对几乎覆盖全视野的巨大复眼、两对可以分别振动的等长膜翅，能悬停、倒飞，捕食成功率高达 95%。它与家蚕不同——发育属于半变态：卵孵化成水生稚虫"水虿"，几次蜕皮直接变为成虫，没有蛹期。',
    extension: true,
    parts: [
      { name: '复眼', desc: '由约 3 万个小眼组成，视野接近 360°，对移动物体极其敏感——捕捉飞虫的"雷达"。' },
      { name: '两对膜翅', desc: '前后翅等长且可独立振动：能悬停、侧飞、倒飞，是昆虫中飞行机动性最强的类群。' },
      { name: '咀嚼式口器', desc: '飞行中用足兜住猎物再用口器撕咬——一只蜻蜓一小时内能吃掉上百只蚊子。' },
      { name: '半变态发育', desc: '卵 → 稚虫（水虿，水生，用直肠鳃呼吸）→ 成虫，无蛹期——与完全变态（有蛹期）对比记忆。' },
      { name: '水质指示', desc: '水虿只能在清洁水中生活——蜻蜓种类多是水体水质良好的标志。' },
    ],
    Svg: DragonflySvg,
  },
  {
    id: 'larynx',
    name: '喉与声带',
    kicker: '呼吸通道 · 发声器官（课外拓展）',
    intro: '喉位于咽与气管之间，既是呼吸的必经之路，也是人类的"乐器"：两片声带像琴弦，肺部呼出的气流冲击声带振动发出声音，再经口腔、舌、唇的调制变成语言。会厌软骨在吞咽时盖住喉口防止食物入气管——边吃饭边说笑容易呛咳，就是会厌"没关好门"。',
    extension: true,
    parts: [
      { name: '喉的位置', desc: '上接咽、下连气管，由多块软骨作支架——保持气道开放不塌陷。' },
      { name: '声带', desc: '两片弹性黏膜皱襞，中间的缝隙称声门；气流通过使声带振动发声——男声带长而厚，音调低，青春期"变声"由此而来。' },
      { name: '会厌软骨', desc: '吞咽时盖住喉口引导食物进入食管；说话呼吸时抬起让空气通过。' },
      { name: '发声三要素', desc: '肺部气流是动力，声带振动是声源，口腔舌唇共鸣与咬字——音调看声带振动频率，音量看气流强度。' },
      { name: '保护嗓子', desc: '长时间高声说话会使声带黏膜充血形成小结；变声期要避免大喊大叫。' },
    ],
    Svg: LarynxSvg,
  },
  {
    id: 'seedDormancy',
    name: '种子的休眠',
    kicker: '植物繁殖 · 环境适应（课外拓展）',
    intro: '成熟而有生活力的种子不一定立即萌发——坚硬的种皮挡住了水和空气，未发育完全的胚需要"后熟"，脱落酸（ABA）维持着休眠状态。休眠让种子躲过寒冬旱季、错开萌发风险，是植物对季节性环境的适应；农业生产上则用低温层积、温水浸种、赤霉素处理来打破休眠。',
    extension: true,
    parts: [
      { name: '什么是休眠', desc: '种子成熟后暂时不能萌发的状态——即使给予充足的水、空气和适宜温度也不萌发。' },
      { name: '种皮限制', desc: '坚硬致密的种皮不透水、不透气并机械阻碍胚生长——古莲子的种皮可让种子休眠上千年。' },
      { name: '胚的后熟', desc: '有些种子脱离母株时胚尚未发育完全（如银杏），需经一段低温湿润的"后熟"才能萌发。' },
      { name: '激素调控', desc: '脱落酸（ABA）维持休眠、抑制萌发；赤霉素（GA）促进萌发——两者拮抗，与种子的"休眠开关"直接相关。' },
      { name: '打破休眠', desc: '低温层积（沙藏）模拟越冬、温水浸种软化种皮、机械磨破种皮、赤霉素浸泡——育苗常用的四种方法。' },
      { name: '适应意义', desc: '错开萌发时间分散风险、度过不良季节——休眠是自然选择塑造的生活史对策。' },
    ],
    Svg: SeedDormancySvg,
  },
  {
    id: 'spider',
    name: '蜘蛛',
    kicker: '节肢动物门 · 蛛形纲代表（课外拓展）',
    intro: '蜘蛛与昆虫同门不同纲：身体分头胸部和腹部两部分，有四对步足（昆虫只有三对）、没有触角，用书肺呼吸。它的纺器能吐出强度超过等粗钢丝的蛛丝——一张网既是陷阱也是"美食保存柜"，蛛毒则把猎物化成可以吸食的"汤"。',
    extension: true,
    parts: [
      { name: '头胸部', desc: '头部与胸部愈合为一节，长有 8 颗单眼（无复眼）、一对螯肢（毒牙）和一对触肢。' },
      { name: '四对步足', desc: '蛛形纲的标志性特征——三对足的是昆虫（含 6 足），四对足的才是蜘蛛（8 足）。' },
      { name: '腹部与纺器', desc: '腹部末端有 2~3 对纺器，把丝腺中的丝蛋白拉成蛛丝：结网、拖卵、飞航（"气球飞行"）全靠它。' },
      { name: '书肺', desc: '像书页一样层层叠叠的呼吸器官，通过腹部的气门交换气体——陆生节肢动物的两种呼吸方式之一（昆虫用气管）。' },
      { name: '捕食方式', desc: '结网蜘蛛靠网拦截飞虫，游猎蜘蛛（如跳蛛）靠发达的视觉主动突袭——毒液把猎物内部化为液体再吸食。' },
    ],
    Svg: SpiderSvg,
  },
  {
    id: 'spinalCord',
    name: '脊髓',
    kicker: '低级中枢 · 反射与传导',
    intro: '脊髓位于椎管内，上端与脑干相连：横切面上蝴蝶形的灰质是神经元胞体聚集处，是膝跳反射、排尿反射等低级反射的中枢；周围的白质则是上下行的传导束。脊髓把全身的感觉信息上传给大脑，又把大脑的指令下达给肌肉——但它也能独立完成最基础的反射。',
    parts: [
      { name: '灰质', desc: '横切面呈蝴蝶形（H 形），前角有运动神经元胞体，后角与感觉信息传入有关——反射弧的中枢部分。' },
      { name: '白质', desc: '围绕灰质的神经纤维束：上行束把感觉冲动传向大脑，下行束把大脑指令传向脊髓——"信息高速路"。' },
      { name: '脊神经根', desc: '背根（后根）传入感觉信号，上有背根神经节；腹根（前根）传出运动信号——背进腹出。' },
      { name: '反射功能', desc: '膝跳反射的中枢就在脊髓灰质：不需要大脑参与，两神经元即可完成最简单的反射。' },
      { name: '受大脑调控', desc: '脊髓是低级中枢，受大脑皮层高级中枢控制——成人能有意识地控制排尿，而脊髓损伤（截瘫）后这种控制消失。' },
    ],
    Svg: SpinalCordSvg,
  },
  {
    id: 'treeRings',
    name: '树的年轮',
    kicker: '木本茎 · 气候的"日记"（课外拓展）',
    intro: '温带木本植物的形成层活动有季节节奏：春天水分充足，产生细胞大、颜色浅的春材；夏末秋初产生的秋材细胞小、颜色深——一宽一窄的交替在树干横切面上留下一圈圈年轮。一个年轮就是一年，读年轮就像读树的成长日记，还能反推几千年前的气候。',
    extension: true,
    parts: [
      { name: '年轮的成因', desc: '形成层分生活动随季节快慢交替，产生春材（宽·浅）与秋材（窄·深）的同心环——一年一圈。' },
      { name: '形成层', desc: '树皮与木质部之间的一层分生组织：向外产生韧皮部（运输有机物），向内产生木质部（运输水·构成木材）。' },
      { name: '气候记录', desc: '年轮宽 = 当年水热条件好，窄 = 干旱或低温；从活树、枯木、古建筑木料拼接年轮序列，可重建上千年气候史。' },
      { name: '科学应用', desc: '树木年代学用年轮为古物定年、校准碳-14 测年；考古学家曾用年轮序列鉴定维京人登陆北美的确切年份。' },
      { name: '热带例外', desc: '热带地区四季不明显、全年可生长，许多树木不形成明显年轮——年轮是环境季节性的"盖章"。' },
    ],
    Svg: TreeRingsSvg,
  },
  {
    id: 'coral',
    name: '珊瑚虫与珊瑚礁',
    kicker: '刺胞动物 · 造礁与共生（课外拓展）',
    intro: '珊瑚虫是与水母同门的刺胞动物：一个个只有几毫米到几厘米的小个体，用触手捕食浮游生物，同时分泌石灰质外骨骼。千万年来无数虫体的"骨骼"层层堆积，形成了珊瑚礁——海洋中物种多样性最高的生态系统之一。',
    extension: true,
    parts: [
      { name: '珊瑚虫个体', desc: '圆筒状身体，顶端是口，口周围一圈触手，用刺细胞麻醉浮游生物——与水母同属刺胞动物门。' },
      { name: '石灰质外骨骼', desc: '虫体基部和体壁分泌碳酸钙形成"房子"；虫体死亡后骨骼保留，一代代堆积成礁。' },
      { name: '虫黄藻共生', desc: '体内共生单细胞虫黄藻：藻类光合作用提供养分和氧气，珊瑚提供住所和 CO₂——珊瑚缤纷的色彩来自藻类。' },
      { name: '珊瑚白化', desc: '海水升温或污染使虫黄藻离开或死亡，珊瑚失去颜色和主要能源而死亡——全球变暖正威胁大堡礁等珊瑚礁。' },
      { name: '造礁意义', desc: '珊瑚礁覆盖海底不足 0.2%，却养育着约四分之一的海洋物种，被称为"海底热带雨林"。' },
    ],
    Svg: CoralSvg,
  },
  {
    id: 'cerebralCortex',
    name: '大脑皮层功能区',
    kicker: '神经调节 · 皮层功能定位',
    intro: '大脑皮层厚约 2~3 毫米，却有约 140 亿个神经元，是神经系统的"最高司令部"：中央前回的躯体运动中枢管理对侧身体的运动，中央后回的躯体感觉中枢接收对侧感觉，还有人类特有的语言中枢——S 区受损会得运动性失语症，H 区受损则听不懂别人的话。',
    parts: [
      { name: '躯体运动中枢', desc: '中央前回：皮层代表区位置倒置（头面部正立），交叉管理对侧躯体的运动，代表区大小与运动精细程度成正比。' },
      { name: '躯体感觉中枢', desc: '中央后回：管理对侧躯体的皮肤、肌肉等感觉，代表区大小与感觉灵敏程度成正比。' },
      { name: '语言中枢', desc: '人类特有：S 区（运动性语言区）受损——能看懂听懂但不会说话（运动性失语）；H 区（听觉性语言区）受损——听得见声音但听不懂（听觉性失语）。' },
      { name: '视觉与听觉中枢', desc: '视觉中枢位于枕叶，听觉中枢位于颞叶——一侧中枢管理双眼双侧视野/双耳的信息。' },
      { name: '低级中枢与高级中枢', desc: '排尿、呼吸等低级中枢在脊髓和脑干，但受大脑皮层高级中枢调控——"憋尿"就是高级中枢控制脊髓低级中枢的例子。' },
    ],
    Svg: CerebralCortexSvg,
  },
  {
    id: 'mangrove',
    name: '红树林',
    kicker: '海岸湿地 · 蓝碳生态系统（课外拓展）',
    intro: '红树林是生长在热带亚热带海岸潮间带的盐生木本植物群落：每天被潮水淹没两次，土壤缺氧、盐分高。红树进化出支柱根站稳淤泥、呼吸根退潮换气，甚至种子还在母树上就萌发成棒状幼苗（胎生），脱落后直插泥中生根——被称为"海岸卫士"。',
    extension: true,
    parts: [
      { name: '潮间带环境', desc: '周期性被潮水淹没：缺氧淤泥、高盐海水、风浪冲击——普通植物无法在此生存。' },
      { name: '支柱根', desc: '从树干下部斜插入淤泥的弓形根，像支架一样固定植株，抵抗潮汐和风浪。' },
      { name: '呼吸根', desc: '指状根伸出淤泥表面，表皮有皮孔，退潮时为地下根系换气——应对缺氧淤泥。' },
      { name: '胎生繁殖', desc: '种子在果实里就萌发成棒状幼苗，成熟后脱落垂直插入淤泥，几小时即可生根定植——不被潮水冲走。' },
      { name: '生态价值', desc: '消浪护堤、净化海水、为鱼虾候鸟提供家园；固碳能力是同面积热带雨林的 3~5 倍（蓝碳），我国正大力修复红树林。' },
    ],
    Svg: MangroveSvg,
  },
  {
    id: 'tapeworm',
    name: '猪肉绦虫',
    kicker: '扁形动物门 · 寄生代表（课外拓展）',
    intro: '绦虫是扁形动物中高度适应寄生生活的代表：头节用小钩和吸盘挂在人的小肠壁上，身体由数千个节片连成链状，最长可达 10 米。它没有消化器官——直接用体表吸收宿主已消化的养料，每个孕卵节片都装满虫卵，随粪便排出感染新的宿主。',
    extension: true,
    parts: [
      { name: '头节', desc: '顶端有小钩和四个吸盘，牢牢钩挂在小肠壁上——寄生生活的"固定装置"。' },
      { name: '颈部与幼节', desc: '颈部不断分裂产生新节片，幼节逐渐向后推移发育——身体可以持续生长变长。' },
      { name: '孕卵节片', desc: '后端的成熟节片几乎被上万的虫卵填满，脱落后随宿主粪便排出体外。' },
      { name: '寄生适应', desc: '没有消化器官（体表吸收养料）、没有运动和感觉器官（环境稳定无需运动）、生殖器官极度发达。' },
      { name: '生活史与防治', desc: '虫卵被猪吞食发育为囊尾蚴——人误食未煮熟的"米猪肉"即被感染；不吃生肉、粪便管理可预防。' },
    ],
    Svg: TapewormSvg,
  },
  {
    id: 'stomach',
    name: '胃的结构与消化',
    kicker: '消化管 · 初步消化蛋白质（课外拓展）',
    intro: '胃是消化管最膨大的部分：暂存食物并通过三层平滑肌的蠕动搅拌磨碎；黏膜上的胃腺分泌盐酸和胃蛋白酶，把蛋白质初步分解为多肽。胃本身不会被消化，靠的是黏液-碳酸氢盐屏障——这道屏障被破坏就会发生胃炎和胃溃疡。',
    extension: true,
    parts: [
      { name: '外形与出入口', desc: '上连食管（贲门），下接十二指肠（幽门）；幽门括约肌控制食糜分批进入小肠。' },
      { name: '黏膜皱襞', desc: '胃壁上的纵行皱襞，胃充满食物时被拉伸展开——增大胃腺分布面积。' },
      { name: '胃腺', desc: '分泌盐酸（杀菌、激活胃蛋白酶原）和胃蛋白酶（最适 pH 约 1.8，把蛋白质分解为多肽）。' },
      { name: '蠕动', desc: '环行、纵行、斜行三层平滑肌协调收缩，把食物与胃液搅拌混合成食糜。' },
      { name: '自我保护', desc: '黏液-碳酸氢盐屏障中和盐酸、隔离胃蛋白酶；幽门螺杆菌破坏该屏障与胃溃疡发病密切相关。' },
    ],
    Svg: StomachSvg,
  },
  {
    id: 'seedDispersal',
    name: '种子的传播',
    kicker: '植物繁殖 · 适应与自然选择（课外拓展）',
    intro: '种子成熟后不能落在母亲脚下——那里阳光水肥已被亲代占据。植物进化出五花八门的"旅行装备"：蒲公英的冠毛和枫树的翅果乘风飞翔，苍耳的钩刺搭动物皮毛的顺风车，椰子随海流漂洋过海，凤仙花干脆把果荚变成弹射器。',
    extension: true,
    parts: [
      { name: '风力传播', desc: '蒲公英瘦果上的冠毛像降落伞，枫树翅果自带"滑翔翼"——轻、带翅或毛的结构减少空气阻力。' },
      { name: '动物传播', desc: '苍耳果实的钩刺挂住动物皮毛搭车远行；浆果被鸟类吞食后，不被消化的种子随粪便"空投"到远处。' },
      { name: '水力传播', desc: '椰子的纤维果壳疏松能漂浮，随洋流漂流数千公里在海岛登陆——椰林多分布于海岸。' },
      { name: '自体弹射', desc: '凤仙花、大豆的果荚成熟后扭曲炸裂，把种子弹射到数米之外。' },
      { name: '适应的意义', desc: '扩大分布范围、避免同种竞争——果实与种子的多样形态是自然选择塑造的结构与功能相适应。' },
    ],
    Svg: SeedDispersalSvg,
  },
  {
    id: 'snail',
    name: '蜗牛',
    kicker: '软体动物门 · 肺螺类（课外拓展）',
    intro: '蜗牛是软体动物的陆生代表：外套膜形成螺旋壳，受惊时整体缩入壳内。它靠腹足肌肉的波状收缩爬行，黏液减少摩擦；口内有一条布满细齿的"齿舌"刮食叶片——这个"慢吞吞"的家伙是世界上牙齿最多的动物之一。',
    extension: true,
    parts: [
      { name: '螺旋壳', desc: '外套膜分泌碳酸钙形成的保护壳，随生长回旋扩大；干燥时可分泌膜厣封住壳口休眠。' },
      { name: '触角与眼', desc: '两对可伸缩的触角：长的一对顶端有眼点，负责感光；短的一对触觉灵敏。' },
      { name: '腹足', desc: '腹部肌肉足通过波状收缩推进身体，足腺分泌黏液降低摩擦、防止爬行时被擦伤。' },
      { name: '齿舌', desc: '口内一条带角质细齿的"锉带"，像锉刀一样刮食植物叶片，上有上万颗微小齿。' },
      { name: '陆生呼吸', desc: '肺螺类没有鳃——外套膜腔内壁血管密布，形成"肺"，经呼吸孔直接呼吸空气。' },
    ],
    Svg: SnailSvg,
  },
  {
    id: 'liver',
    name: '肝脏',
    kicker: '最大的消化腺 · 人体"化工厂"（课外拓展）',
    intro: '肝脏是人体最大的消化腺（约 1.5 kg）：它分泌的胆汁不含消化酶，却能乳化脂肪帮助消化；同时它是全身的物质转化枢纽——合成肝糖原储存能量、合成血浆蛋白，还能把氨等有毒物质转化后随尿排出。',
    extension: true,
    parts: [
      { name: '外形与位置', desc: '位于腹腔右上部，分右叶（大）和左叶（小），深红色，质地脆而易受撞击损伤。' },
      { name: '胆汁', desc: '肝细胞分泌胆汁，经导管流入小肠、储存在胆囊；胆汁不含消化酶，但能把脂肪乳化成微粒，扩大脂肪酶的作用面积。' },
      { name: '物质转化枢纽', desc: '血糖多余时合成肝糖原储存，血糖低时分解补充；血浆白蛋白等也在肝内合成。' },
      { name: '解毒', desc: '把肠道吸收或代谢产生的有毒物质（如氨）转化为无毒形式，经肾排出——"喝酒伤肝"的道理。' },
      { name: '再生能力', desc: '肝细胞再生能力极强，切除部分肝脏后可以逐渐恢复原体积，这也是活体肝移植的基础。' },
    ],
    Svg: LiverSvg,
  },
  {
    id: 'greenhouseEffect',
    name: '温室效应',
    kicker: '碳循环失衡 · 全球气候变化（课外拓展）',
    intro: '阳光（短波辐射）穿过大气加热地面，地面又以长波辐射把热量反射回太空——但二氧化碳、甲烷等温室气体会吸收长波辐射，把热量"锁"在大气层里。化石燃料燃烧和森林砍伐让温室气体越积越多，全球变暖由此加剧。',
    extension: true,
    parts: [
      { name: '温室效应原理', desc: '短波辐射进得来、长波辐射出不去——温室气体像"棉被"一样截留热量，让地表保持温暖（适度温室效应本是生命存在的保障）。' },
      { name: '主要温室气体', desc: '二氧化碳（最主要）、甲烷（更强但量少）、水蒸气等；工业革命以来大气 CO₂ 浓度上升约 50%。' },
      { name: '人为来源', desc: '化石燃料（煤·石油·天然气）燃烧是最大来源；森林砍伐削弱了光合作用对 CO₂ 的固定。' },
      { name: '生态影响', desc: '冰川融化、海平面上升淹没低地；极端天气增多；物种分布区向高纬高海拔迁移，来不及适应的将灭绝。' },
      { name: '应对措施', desc: '减少化石燃料使用、开发清洁能源、植树造林增加碳汇——我国提出 2060 年实现"碳中和"目标。' },
    ],
    Svg: GreenhouseEffectSvg,
  },
  {
    id: 'turtle',
    name: '乌龟',
    kicker: '爬行动物 · 甲壳与羊膜卵（课外拓展）',
    intro: '乌龟是爬行动物的代表：背甲与腹甲连成一个"盔甲箱"，遇险时头颈和四肢都能缩入壳内。真正让它称霸陆地的是羊膜卵——卵壳防止水分散失，胚胎在羊水中发育，繁殖彻底摆脱了对水的依赖。',
    extension: true,
    parts: [
      { name: '背甲与腹甲', desc: '背甲由脊椎和肋骨与骨质板愈合而成，表面覆盖角质盾片；腹甲与背甲相连，共同保护内脏。' },
      { name: '可伸缩的头颈', desc: '颈部能折叠缩回壳内——遇到危险时最有效的防御姿态。' },
      { name: '四肢与尾', desc: '陆生种类的四肢呈柱状支撑身体爬行；海龟的四肢则变成桨状适应游泳。' },
      { name: '羊膜卵', desc: '卵壳坚韧防止干燥，胚胎在羊水中发育，以卵黄为营养——爬行动物登陆繁殖的关键创新。' },
      { name: '变温与长寿', desc: '体温随环境变化、代谢低（靠晒太阳升温）；细胞分裂代数多，寿命常达几十年上百年。' },
    ],
    Svg: TurtleSvg,
  },
  {
    id: 'pancreaticIslet',
    name: '胰岛（α 细胞与 β 细胞）',
    kicker: '内分泌 · 血糖调节的细胞基础',
    intro: '胰腺的外分泌部产出消化酶，而散布在腺泡之间的约 100 万个"小岛"——胰岛，负责内分泌：β 细胞（约 70%）分泌胰岛素降血糖，α 细胞（约 20%）分泌胰高血糖素升血糖，两者拮抗调节维持血糖稳态。',
    parts: [
      { name: '胰岛', desc: '胰腺内约 1%~2% 的细胞聚集成球形细胞团，富含毛细血管，激素直接进入血液。' },
      { name: 'β 细胞', desc: '约占胰岛细胞 70%，分泌胰岛素——唯一能降血糖的激素：促进组织细胞摄取、利用和储存葡萄糖。' },
      { name: 'α 细胞', desc: '约占 20%，分泌胰高血糖素——促进肝糖原分解和非糖物质转化，使血糖升高。' },
      { name: '拮抗调节', desc: '血糖升高→胰岛素分泌↑；血糖降低→胰高血糖素分泌↑。一降一升相互拮抗，把血糖稳定在 3.9~6.1 mmol/L。' },
      { name: '与糖尿病的关系', desc: '1 型糖尿病是 β 细胞被免疫破坏导致胰岛素缺乏；2 型糖尿病多为靶细胞对胰岛素不敏感。' },
    ],
    Svg: PancreaticIsletSvg,
  },
  {
    id: 'livingFossil',
    name: '孑遗植物（活化石）',
    kicker: '保护生物学 · 古老植物的幸存者（课外拓展）',
    intro: '孑遗植物是地质历史时期曾经广布、如今近缘类群大多灭绝，仅存少数"幸存者"的古老植物：银杏、水杉、珙桐都是代表。它们保留着祖先的形态特征，是研究植物演化和古气候的"活标本"。',
    extension: true,
    parts: [
      { name: '什么是孑遗植物', desc: '曾繁盛于地质历史时期，经历大灭绝或气候剧变后分布区大幅退缩、仅零星残存的古老植物。' },
      { name: '银杏', desc: '2.7 亿年前就出现的裸子植物，扇形叶独一无二；野生种群仅存于浙江天目山一带。' },
      { name: '水杉', desc: '白垩纪曾广布北半球，被认为早已灭绝；1943 年在湖北利川谋道溪重新发现，轰动植物学界。' },
      { name: '珙桐', desc: '第三纪孑遗植物，两片白色大苞片如鸽翼——"鸽子树"；中国特有，国家一级重点保护。' },
      { name: '保护价值', desc: '孑遗植物携带独特的基因库和演化信息，迁地保护（植物园）与就地保护（自然保护区）并举。' },
    ],
    Svg: LivingFossilSvg,
  },
  {
    id: 'colorBlindness',
    name: '红绿色盲遗传',
    kicker: '伴 X 染色体隐性遗传 · 婚配分析图',
    intro: '红绿色盲由 X 染色体上的隐性致病基因（b）控制：女性需要 XᵇXᵇ 才患病，男性只需一条 Xᵇ 就会患病——所以男性患者远多于女性。携带者母亲会把致病基因传给儿子，形成"交叉遗传"。',
    parts: [
      { name: '致病基因定位', desc: 'b 基因位于 X 染色体上且为隐性：XᴮXᵇ 女性表现正常但携带致病基因。' },
      { name: '典型婚配分析', desc: '女性携带者（XᴮXᵇ）× 正常男性（XᴮY）：女儿全正常（一半携带），儿子正常与色盲各半。' },
      { name: '交叉遗传', desc: '男性的色盲基因来自母亲，将来只能传给女儿——隔代经由女性传递，称为交叉遗传。' },
      { name: '发病率差异', desc: '男性只有一条 X 染色体，只要带 b 就患病；我国男性色盲率约 7%，女性仅约 0.5%。' },
      { name: '遗传咨询', desc: '禁止近亲结婚可降低隐性致病基因纯合的概率；产前基因检测可评估生育风险。' },
    ],
    Svg: ColorBlindnessSvg,
  },
  {
    id: 'crab',
    name: '螃蟹',
    kicker: '节肢动物门 · 甲壳类代表（课外拓展）',
    intro: '螃蟹的身体分头胸部和腹部：头背部覆盖坚硬的几丁质背甲，五对附肢中第一对特化为螯足。它横行靠四对步足交替摆动，用鳃在水中呼吸，离水后靠鳃腔储存的水分短时维持呼吸。',
    extension: true,
    parts: [
      { name: '头胸部与背甲', desc: '头胸部愈合在一起，外覆外骨骼（背甲）——保护内部器官，需定期蜕皮才能长大。' },
      { name: '螯足', desc: '第一对附肢特化成大螯，用来捕食、夹碎螺贝和防御，也是同类争斗的武器。' },
      { name: '步足', desc: '四对细长步足关节只能上下摆动，所以螃蟹以侧向爬行著称；步足断落后可以再生。' },
      { name: '呼吸与蟹脐', desc: '鳃藏在背甲下的鳃腔里；腹部折叠贴在头胸部下方形成"蟹脐"——尖脐是雄蟹，圆脐是雌蟹。' },
    ],
    Svg: CrabSvg,
  },
  {
    id: 'spleen',
    name: '脾脏',
    kicker: '最大的免疫器官 · 结构与功能（课外拓展）',
    intro: '脾脏位于左上腹、胃的后外侧，是人体最大的免疫器官：红髓像"血液过滤器"，负责清除衰老的红细胞；白髓密布淋巴细胞，是发生免疫应答的场所。脾脏还能储存血液，胚胎期兼有造血功能。',
    extension: true,
    parts: [
      { name: '位置形态', desc: '左上腹第 9~11 肋下方，暗红色，质脆易破——左腹受撞击可能脾破裂。' },
      { name: '红髓', desc: '富含红细胞和巨噬细胞：过滤血液、吞噬衰老红细胞和病原体，回收铁元素。' },
      { name: '白髓', desc: '淋巴细胞密集的区域（围绕小动脉）：识别血液中的抗原，启动体液免疫和细胞免疫。' },
      { name: '其他功能', desc: '储存血小板和血液（应急释放）；胚胎早期是重要的造血器官，出生后由骨髓接替。' },
      { name: '与健康的关系', desc: '脾脏虽重要但不是必需器官——脾切除后其功能可部分由淋巴结和肝脏代偿。' },
    ],
    Svg: SpleenSvg,
  },
  {
    id: 'pitcherPlant',
    name: '猪笼草（捕虫叶）',
    kicker: '叶的变态 · 食虫植物（课外拓展）',
    intro: '猪笼草的捕虫囊是叶的变态：叶尖长出卷须，卷须末端膨大成笼。笼唇分泌蜜汁引诱昆虫，囊底的消化液把猎物分解成氮素养料吸收——在贫瘠土壤中"开荤"补充营养。',
    extension: true,
    parts: [
      { name: '捕虫囊', desc: '叶尖卷须末端膨大形成的笼状结构，是叶的变态（不是果实）。' },
      { name: '笼盖与唇', desc: '笼盖挡住雨水防稀释；唇环分泌蜜汁引诱昆虫，表面光滑让昆虫滑落。' },
      { name: '消化液', desc: '囊底含有消化酶和酸性液体，分解昆虫体内的蛋白质，吸收氨基酸等氮素。' },
      { name: '捕虫意义', desc: '原生地土壤缺氮，捕虫是补充氮素的适应——食虫植物仍有叶绿素可光合作用。' },
    ],
    Svg: PitcherPlantSvg,
  },
  {
    id: 'earStructure',
    name: '耳的结构与听觉',
    kicker: '感觉器官 · 听觉形成（课外拓展）',
    intro: '耳分外耳、中耳、内耳三部分：耳廓收集声波，鼓膜把声波变成振动，听小骨放大振动，耳蜗里的听觉感受器把它变成神经冲动，沿听神经传到大脑皮层的听觉中枢形成听觉。',
    extension: true,
    parts: [
      { name: '外耳', desc: '耳廓收集声波，外耳道把声波传导到鼓膜。' },
      { name: '中耳', desc: '鼓膜接受声波振动，锤骨·砧骨·镫骨三块听小骨把振动放大传向内耳；咽鼓管连通咽部，平衡鼓膜两侧气压。' },
      { name: '内耳', desc: '耳蜗内有听觉感受器，接受振动刺激产生神经冲动；半规管感受头部位置变化（晕车的来源之一）。' },
      { name: '听觉形成', desc: '声波 → 鼓膜振动 → 听小骨 → 耳蜗产生神经冲动 → 听神经 → 大脑听觉中枢形成听觉。' },
      { name: '保护听力', desc: '鼻咽部感染可通过咽鼓管蔓延到中耳；巨大声响会震破鼓膜——遇到巨响要张嘴或捂耳。' },
    ],
    Svg: EarStructureSvg,
  },
  {
    id: 'jellyfish',
    name: '水母',
    kicker: '刺胞动物门（腔肠动物）· 海洋代表（课外拓展）',
    intro: '水母是刺胞动物门的海洋代表：身体辐射对称，只有外胚层和内胚层两层细胞，中间是胶状中胶层。伞盖收缩喷水前进，触手上的刺细胞射出刺丝麻醉猎物——没有大脑却高效生存了数亿年。',
    extension: true,
    parts: [
      { name: '伞盖', desc: '钟状身体，内充胶状中胶层（98% 是水），收缩喷水推动身体反向前进。' },
      { name: '口与口腕', desc: '伞盖下的口是消化循环腔的唯一开口（有口无肛门），口腕负责包裹并送入食物。' },
      { name: '触手与刺细胞', desc: '刺细胞是刺胞动物特有的攻击武器，受刺激时射出刺丝注入毒素麻醉猎物。' },
      { name: '辐射对称', desc: '身体呈辐射对称，从任何方向接近都能感知和捕捉——适应固着或漂浮生活。' },
      { name: '网状神经', desc: '没有中枢神经，神经细胞连成网状，协调全身收缩——最原始的神经系统。' },
    ],
    Svg: JellyfishSvg,
  },
  {
    id: 'gramStain',
    name: '革兰氏染色',
    kicker: '细菌鉴定 · 染色反应对比（课外拓展）',
    intro: '1884 年丹麦医生革兰发明的染色法：根据细菌细胞壁结构的差异，把细菌分为革兰氏阳性（G⁺，呈紫色）和革兰氏阴性（G⁻，呈红色）两大类，是细菌分类鉴定和选择抗生素的重要依据。',
    parts: [
      { name: '结晶紫初染', desc: '所有细菌先被碱性染料结晶紫染成紫色。' },
      { name: '碘液媒染', desc: '碘与结晶紫形成不溶性复合物，把颜色固定在细胞内。' },
      { name: '酒精脱色', desc: 'G⁻ 肽聚糖层薄且含脂较多，被酒精脱色；G⁺ 肽聚糖层厚，仍保留紫色。' },
      { name: '复染呈色', desc: '用番红复染后，脱色的 G⁻ 呈红色，未脱色的 G⁺ 仍为紫色。' },
    ],
    Svg: GramStainSvg,
  },
  {
    id: 'fiveKingdoms',
    name: '五界分类系统',
    kicker: '生物分类 · 分界方案（课外拓展）',
    intro: '1969 年魏泰克提出的五界系统：依据细胞核有无、细胞组成和营养方式，把全部生物分为原核生物界、原生生物界、真菌界、植物界和动物界——比两界系统更真实地反映了生物的演化关系。',
    parts: [
      { name: '原核生物界', desc: '无以核膜为界限的细胞核，单细胞，如细菌、蓝细菌。' },
      { name: '原生生物界', desc: '真核生物中结构简单的单细胞类群，如变形虫、草履虫、衣藻。' },
      { name: '真菌界', desc: '真核、异养（吸收营养），如酵母菌、霉菌、蘑菇。' },
      { name: '植物界与动物界', desc: '真核多细胞：植物能光合作用自养，动物摄取食物异养。' },
    ],
    Svg: FiveKingdomsSvg,
  },
  {
    id: 'bloodClotting',
    name: '血液凝固过程',
    kicker: '止血机制 · 凝血级联（课外拓展）',
    intro: '血管破损后，血小板在伤口处聚集并释放凝血因子，经过级联反应，血浆中的纤维蛋白原变为纤维蛋白，交织成网网住血细胞形成血块——这是人体最重要的止血防线。',
    parts: [
      { name: '血小板聚集', desc: '血管破损后血小板黏附、聚集在伤口，释放凝血因子启动凝血。' },
      { name: '凝血酶形成', desc: '凝血酶原在凝血因子和 Ca²⁺ 参与下转变为有活性的凝血酶。' },
      { name: '纤维蛋白网', desc: '凝血酶催化纤维蛋白原转变为纤维蛋白，交织成网网住血细胞。' },
      { name: '血块与血清', desc: '血块收缩后析出淡黄色血清——血清是不含纤维蛋白原的血浆。' },
    ],
    Svg: BloodClottingSvg,
  },
  {
    id: 'smallIntestineVillus',
    name: '小肠绒毛结构',
    kicker: '消化吸收 · 结构基础图',
    intro: '环形皱襞→绒毛→微绒毛三级放大，使小肠吸收面积约 200 m²（≈1 个网球场）：绒毛内丰富的毛细血管和毛细淋巴管高效吸收营养物质。',
    parts: [
      { name: '环形皱襞', desc: '黏膜向肠腔折叠形成的环状隆起，增加了小肠的表面积。' },
      { name: '小肠绒毛', desc: '黏膜表面的手指状突起：内含毛细血管和毛细淋巴管，直接吸收营养物质。' },
      { name: '微绒毛', desc: '绒毛上皮细胞表面的微小突起（电镜下才可见），进一步增大吸收面积。' },
      { name: '吸收效率', desc: '三级放大使吸收面积增加约 600 倍——结构与功能相适应的经典案例。' },
    ],
    Svg: SmallIntestineVillusSvg,
  },
  {
    id: 'planarian',
    name: '涡虫',
    kicker: '扁形动物门 · 结构模式图（课外拓展）',
    intro: '生活在淡水溪流底部的扁形动物：背腹扁平、左右对称、三胚层，有口无肛门。切成两段能各自再生为完整个体——著名的再生模型生物。',
    extension: true,
    parts: [
      { name: '两侧对称', desc: '身体可分前后左右背面腹面：运动定向、感觉集中在前端——比辐射对称进步。' },
      { name: '三胚层', desc: '外胚层+中胚层+内胚层：比水螅（两胚层）多一个中胚层，器官系统开始分化。' },
      { name: '眼点', desc: '头部两侧的色素杯结构：感光但不能成像——帮助涡虫避开强光寻找食物。' },
      { name: '咽与肠', desc: '咽可从口中翻出包裹食物，三分支肠将消化后的营养扩散到全身（无循环系统）。' },
      { name: '再生能力', desc: '全身富含新胚细胞（干细胞）：切成数段，每段可再生为完整个体——再生研究的模式生物。' },
    ],
    Svg: PlanarianSvg,
  },
  {
    id: 'photoperiodism',
    name: '植物的光周期现象',
    kicker: '植物生长调节 · 开花调控（课外拓展）',
    intro: '植物通过叶片中的光敏色素感知日照长短，从而调控开花时间：菊花是短日照植物——连续黑暗足够长才开花，夜间闪光会打断黑暗抑制开花。',
    extension: true,
    parts: [
      { name: '短日照植物', desc: '日照短于临界日长才开花：菊花、水稻、烟草——秋季开花的植物多属此类。' },
      { name: '长日照植物', desc: '日照长于临界日长才开花：小麦、菠菜、萝卜——春夏开花的植物多属此类。' },
      { name: '日中性植物', desc: '开花不受日照长短影响：番茄、黄瓜、棉花——由其他因素调控开花。' },
      { name: '光敏色素', desc: '叶片中的光感受蛋白：感知红光/远红光比例变化，将信号传导至开花基因。' },
    ],
    Svg: PhotoperiodismSvg,
  },
  {
    id: 'digestiveSystem',
    name: '消化系统',
    kicker: '人体 · 系统结构图',
    intro: '消化道从口腔到肛门全长约 9 米：食物的消化与吸收主要在小肠完成——胆汁乳化脂肪、胰液肠液消化蛋白质糖类脂肪。',
    parts: [
      { name: '口腔', desc: '牙齿咀嚼磨碎食物，唾液淀粉酶初步分解淀粉为麦芽糖。' },
      { name: '胃', desc: '胃酸杀死细菌、胃蛋白酶初步消化蛋白质——只能吸收少量水和酒精。' },
      { name: '小肠', desc: '消化吸收的主场所：胆汁乳化脂肪、胰液肠液彻底消化，绒毛增大吸收面积。' },
      { name: '大肠', desc: '吸收水分和无机盐，形成粪便——盲肠与阑尾也在此处。' },
      { name: '消化腺', desc: '唾液腺、肝（最大消化腺）、胰腺——分泌消化液进入消化道。' },
    ],
    Svg: DigestiveSystemSvg,
  },
  {
    id: 'respiratorySystem',
    name: '呼吸系统',
    kicker: '人体 · 系统结构图',
    intro: '呼吸系统由呼吸道（鼻→咽→喉→气管→支气管）和肺组成：呼吸道温暖湿润清洁空气，肺是气体交换的场所。',
    parts: [
      { name: '鼻', desc: '鼻腔内有鼻毛和黏液：温暖、湿润、清洁吸入的空气——"空气净化器"。' },
      { name: '咽与喉', desc: '咽是食物和气体的共同通道；喉有声带，是发声器官。' },
      { name: '气管与支气管', desc: 'C 形软骨环支撑防止塌陷，纤毛向咽喉方向摆动清扫灰尘异物。' },
      { name: '肺', desc: '左肺 2 叶、右肺 3 叶：约 3 亿个肺泡提供约 100 m² 的气体交换面积。' },
    ],
    Svg: RespiratorySystemSvg,
  },
  {
    id: 'neuronTypes',
    name: '神经元的种类',
    kicker: '神经调节 · 分类模式图',
    intro: '按功能分为感觉（传入）、中间（联络）和运动（传出）三种神经元：它们首尾相连构成反射弧，兴奋只能单向传递。',
    parts: [
      { name: '感觉神经元', desc: '传入神经元：树突末梢连感受器，将兴奋传入中枢——多为假单极。' },
      { name: '中间神经元', desc: '位于脑和脊髓内：连接感觉和运动神经元，整合信息——数量最多、形态多样。' },
      { name: '运动神经元', desc: '传出神经元：将中枢的指令传到效应器（肌肉或腺体），控制身体反应。' },
      { name: '反射弧', desc: '感受器→传入神经→神经中枢→传出神经→效应器：五环节缺一不可。' },
    ],
    Svg: NeuronTypesSvg,
  },
  {
    id: 'skeletonSystem',
    name: '人体骨骼系统',
    kicker: '运动系统 · 骨骼总图',
    intro: '成人体有 206 块骨，分为中轴骨（颅骨+脊柱+胸廓）和附肢骨（上肢+下肢）：骨骼是运动的杠杆，骨髓是血细胞的"工厂"。',
    parts: [
      { name: '颅骨', desc: '29 块骨围成的骨性"头盔"：保护脑——最重要的中枢神经所在地。' },
      { name: '脊柱', desc: '26 块椎骨组成的"承重柱"：从上到下分颈椎/胸椎/腰椎/骶椎/尾椎，保护脊髓。' },
      { name: '胸廓', desc: '12 对肋骨+胸骨+胸椎围成的"笼子"：保护心、肺等胸腔器官，参与呼吸运动。' },
      { name: '四肢骨', desc: '上肢骨（肱骨/桡骨/尺骨/手骨）+下肢骨（股骨/胫骨/腓骨/足骨）：运动杠杆。' },
      { name: '骨髓', desc: '骨髓腔与骨松质间隙中的软组织：红骨髓具有造血功能，产生红细胞、白细胞和血小板。' },
    ],
    Svg: SkeletonSystemSvg,
  },
  {
    id: 'apoptosisVsNecrosis',
    name: '细胞凋亡与坏死',
    kicker: '细胞命运 · 对比模式图',
    intro: '细胞凋亡是由基因决定的细胞自动结束生命的过程（程序性死亡），对机体有利；细胞坏死是在不利因素下被动损伤死亡，引发炎症反应——两者的本质区别在于是否由基因调控。',
    parts: [
      { name: '细胞凋亡', desc: '基因调控的主动"程序性死亡"：细胞皱缩→核浓缩→形成凋亡小体→被吞噬，不引发炎症。' },
      { name: '细胞坏死', desc: '不利因素导致的被动损伤死亡：细胞肿胀→膜破裂→内容物外溢→引发炎症反应。' },
      { name: '凋亡的意义', desc: '清除多余/衰老/受损细胞：蝌蚪尾巴消失、人胚胎指间蹼消失、免疫系统清除感染细胞。' },
      { name: '与癌细胞关系', desc: '癌细胞逃避凋亡（不死性）：治疗策略之一是诱导癌细胞"恢复"凋亡能力。' },
    ],
    Svg: ApoptosisVsNecrosisSvg,
  },
  {
    id: 'plantHormones',
    name: '植物激素五类对比',
    kicker: '植物生长调节 · 五类激素对比表',
    intro: '植物体内有五大类激素协同调控生长发育：生长素/赤霉素/细胞分裂素促进生长，脱落酸和乙烯抑制或促进衰老成熟——它们既协同又拮抗。',
    parts: [
      { name: '生长素 (IAA)', desc: '促进细胞伸长生长：低浓度促进、高浓度抑制（两重性）；引起向光性和顶端优势。' },
      { name: '赤霉素 (GA)', desc: '促进茎的伸长（特别是节间）、种子萌发和果实发育——"拔高"激素。' },
      { name: '细胞分裂素', desc: '促进细胞分裂和组织分化，延缓叶片衰老——主要在根尖合成。' },
      { name: '脱落酸 (ABA)', desc: '抑制细胞分裂，促进气孔关闭和休眠——干旱胁迫下的"保水激素"。' },
      { name: '乙烯', desc: '促进果实成熟、落叶落果——气体激素，"催熟剂"（如乙烯利催熟香蕉）。' },
    ],
    Svg: PlantHormonesSvg,
  },
  {
    id: 'heartCompare',
    name: '脊椎动物心脏对比',
    kicker: '心脏进化 · 对比模式图',
    intro: '从鱼类的单循环到哺乳类的双循环：心房心室从 1+1 到 2+2，动静脉血从混合到完全分开——输氧效率的提升支撑了恒温与剧烈运动。',
    parts: [
      { name: '鱼类（1 房 1 室）', desc: '单循环：血经鳃再到全身，血压低、供氧效率有限（变温）。' },
      { name: '两栖类（2 房 1 室）', desc: '肺皮肤双呼吸：心室中动脉血与静脉血部分混合。' },
      { name: '爬行类（2 房 1 室+不全分隔）', desc: '心室出现不完全分隔：混合程度降低，仍是变温。' },
      { name: '鸟类·哺乳类（2 房 2 室）', desc: '动静脉血完全分开：供氧效率最高——支持恒温、飞行与剧烈运动。' },
      { name: '进化意义', desc: '心脏分隔程度与代谢水平正相关：恒温动物需要更强的氧运输能力。' },
    ],
    Svg: HeartCompareSvg,
  },
  {
    id: 'biodiversity',
    name: '生物多样性的三个层次',
    kicker: '生态保护 · 概念关系图',
    intro: '生物多样性包括基因、物种、生态系统三个层次：基因多样性是基础，物种多样性是直观体现，生态系统多样性是物种赖以生存的"整体背景"。',
    parts: [
      { name: '基因多样性', desc: '同种个体间的遗传差异（如不同水稻品种）——是物种多样性的基础。' },
      { name: '物种多样性', desc: '群落中物种的丰富度：最直观、最常见的多样性衡量指标。' },
      { name: '生态系统多样性', desc: '栖息地与群落的类型多样性：生态系统越多样，物种多样性越高。' },
      { name: '保护措施', desc: '就地保护（自然保护区·最有效）+ 迁地保护（动物园·种子库）+ 法律法规。' },
    ],
    Svg: BiodiversitySvg,
  },
  {
    id: 'bloodSugarSources',
    name: '血糖来源与去路',
    kicker: '血糖调节 · 流程图（实验侧图解）',
    intro: '血糖的三大来源（食物消化吸收、肝糖原分解、非糖物质转化）与三大去路（氧化分解、合成糖原、转化为脂肪等），由胰岛素与胰高血糖素拮抗调节。',
    parts: [
      { name: '来源① 食物消化吸收', desc: '主要的血糖来源：食物中的糖类被消化成葡萄糖后吸收入血。' },
      { name: '来源② 肝糖原分解', desc: '空腹时肝糖原分解为葡萄糖入血——肌糖原不能直接分解补血糖。' },
      { name: '来源③ 非糖物质转化', desc: '脂肪、氨基酸等非糖物质在肝脏转化为葡萄糖。' },
      { name: '去路', desc: '氧化分解供能（主要去路）、合成肝糖原肌糖原、转化为脂肪和氨基酸。' },
      { name: '激素调节', desc: '胰岛素促进去路（降血糖）；胰高血糖素和肾上腺素促进来源（升血糖）。' },
    ],
    Svg: BloodSugarSourcesSvg,
  },
  {
    id: 'fruitTypes',
    name: '果实的类型',
    kicker: '果实 · 分类对比图',
    intro: '果实由子房发育而来，按成熟后果皮的性质分为肉质果与干果：浆果多汁、核果有硬核、荚果沿缝裂开、坚果坚硬——可食部分各不相同。',
    parts: [
      { name: '浆果', desc: '外果皮薄、中果皮果肉多汁：番茄、葡萄、柿子。' },
      { name: '核果', desc: '内果皮木质化成硬核，核内含一枚种子：桃、杏、李、樱桃。' },
      { name: '梨果', desc: '主要由花托发育而成的假果：苹果、梨——我们吃的"果肉"多是花托。' },
      { name: '荚果', desc: '豆类的果实：成熟后沿背腹两缝线裂开，露出种子（大豆、豌豆）。' },
      { name: '坚果与颖果', desc: '果皮坚硬（板栗、橡子）；禾谷类的颖果果皮种皮愈合（小麦、玉米）。' },
    ],
    Svg: FruitTypesSvg,
  },
  {
    id: 'stemCells',
    name: '干细胞',
    kicker: '细胞分化 · 分化潜能图（课外拓展）',
    intro: '干细胞是保留分裂与分化能力的"未分化细胞"：受精卵全能性最强，胚胎干细胞是多能，成体干细胞（如造血干细胞）为专能——分化潜能逐级收窄。',
    extension: true,
    parts: [
      { name: '受精卵（全能性）', desc: '能发育成完整个体及胎盘等附属结构——全能性最高。' },
      { name: '胚胎干细胞', desc: '来自早期胚胎的内细胞团：多能，可分化为体内几乎所有类型的细胞。' },
      { name: '成体干细胞', desc: '存在于已分化组织中的专能干细胞：如骨髓造血干细胞可分化为各种血细胞。' },
      { name: '应用前景', desc: '造血干细胞移植已用于白血病治疗；诱导多能干细胞（iPS）开辟了再生医学新途径。' },
    ],
    Svg: StemCellsSvg,
  },
  {
    id: 'geneticCode',
    name: '遗传密码（密码子）',
    kicker: '基因表达 · 密码子表（课外拓展）',
    intro: 'mRNA 上每三个相邻碱基决定一个氨基酸，称为密码子：64 个密码子中 61 个编码氨基酸、3 个是终止信号——密码子几乎对所有生物通用，这是基因工程的基石。',
    extension: true,
    parts: [
      { name: '密码子', desc: 'mRNA 上决定一个氨基酸的三个相邻碱基：共 64 种组合（4³）。' },
      { name: '起始与终止', desc: 'AUG 既编码甲硫氨酸又是起始信号；UAA、UAG、UGA 是终止密码子，不编码氨基酸。' },
      { name: '简并性', desc: '61 个编码密码子对应 20 种氨基酸：多种密码子可编码同一种氨基酸——减少突变危害。' },
      { name: '通用性', desc: '从细菌到人类几乎共用同一套密码子——基因在不同物种间"通用"的原因。' },
    ],
    Svg: GeneticCodeSvg,
  },
  {
    id: 'embryoCompare',
    name: '胚胎发育的比较',
    kicker: '生物进化 · 胚胎学证据（课外拓展）',
    intro: '鱼、蝾螈、鸡、人的早期胚胎都有鳃弓和尾，几乎无法区分——胚胎学的相似性表明脊椎动物来自共同的祖先，越早期越相似。',
    extension: true,
    parts: [
      { name: '鳃弓', desc: '早期胚胎都有鳃弓结构：鱼类发育成鳃，人类则发育成中耳等结构。' },
      { name: '尾', desc: '脊椎动物胚胎都有尾：人类胚胎中期也有尾，后来退化成尾椎骨。' },
      { name: '共同祖先', desc: '早期胚胎相似性表明这些动物来自共同的水生祖先。' },
      { name: '发育重演', desc: '高等动物的胚胎发育过程重演了进化的重要阶段（"重演律"，有例外但主线成立）。' },
    ],
    Svg: EmbryoCompareSvg,
  },
  {
    id: 'organVariants',
    name: '植物器官的变态',
    kicker: '植物适应 · 变态器官对比图',
    intro: '根、茎、叶都会"改行"：萝卜的肉质直根储藏养料、仙人掌的叶变成刺减少蒸腾、豌豆的叶卷须攀缘——功能改变带来形态改变。',
    parts: [
      { name: '肉质直根', desc: '萝卜、胡萝卜：下胚轴与主根膨大储藏养料——我们吃的"萝卜"其实是根。' },
      { name: '块茎', desc: '马铃薯：地下茎顶端膨大，芽眼里有芽——"土豆"是茎不是根。' },
      { name: '叶刺', desc: '仙人掌的叶变成刺：减少蒸腾面积，绿色茎代行光合作用。' },
      { name: '茎卷须与叶卷须', desc: '葡萄的卷须是茎（腋生），豌豆的卷须是叶（顶端小叶变态）——来源不同功能相同。' },
    ],
    Svg: OrganVariantsSvg,
  },
  {
    id: 'humoralImmunity',
    name: '体液免疫流程',
    kicker: '免疫调节 · 流程图（实验侧图解）',
    intro: '体液免疫的大致流程：病原体被吞噬细胞摄取处理 → 呈递给 T 细胞 → B 细胞增殖分化为浆细胞与记忆 B 细胞 → 浆细胞分泌抗体结合抗原。',
    parts: [
      { name: '吞噬细胞', desc: '摄取、处理病原体，暴露出抗原（抗原呈递）。' },
      { name: 'T 细胞', desc: '识别呈递的抗原，分泌淋巴因子刺激 B 细胞。' },
      { name: 'B 淋巴细胞', desc: '受到刺激后增殖分化：大部分成为浆细胞，小部分成为记忆 B 细胞。' },
      { name: '浆细胞与抗体', desc: '浆细胞分泌抗体：抗体与抗原特异性结合，形成沉淀或细胞集团被吞噬消化。' },
      { name: '记忆 B 细胞', desc: '保持对同种抗原的"记忆"：再次入侵时快速增殖分化（二次免疫）。' },
    ],
    Svg: HumoralImmunitySvg,
  },

  {
    id: 'ascarid',
    name: '蛔虫',
    kicker: '线形动物 · 人体寄生虫（课外拓展）',
    intro: '寄生在人体小肠的大型线形动物：体表角质层抵抗消化液，消化管简单靠吸食宿主营养，生殖器官超发达（日产卵 20 万枚）——寄生生活的"特化配置"。',
    extension: true,
    parts: [
      { name: '角质层', desc: '体表光滑的角质层：抵抗宿主消化液的侵蚀，保护虫体。' },
      { name: '口', desc: '围口唇瓣围绕的开口：吸附在肠壁上啃食半消化的食糜。' },
      { name: '消化管', desc: '结构简单的直管：没有专门消化腺——直接吸食宿主已消化的营养。' },
      { name: '生殖器官发达', desc: '雌虫每日产卵约 20 万枚：虫卵随粪便排出，经污染的食物水再感染新宿主。' },
      { name: '感觉器官退化', desc: '寄生环境稳定，感觉器官退化——与自由生活的动物形成鲜明对比。' },
      { name: '预防', desc: '饭前便后洗手、瓜果洗净、管理好粪便——切断感染途径是最好的"疫苗"。' },
    ],
    Svg: AscaridSvg,
  },
  {
    id: 'giantPanda',
    name: '大熊猫',
    kicker: '哺乳纲 · 珍稀保护动物（课外拓展）',
    intro: '中国特有的"活化石"（课外拓展）：明明是食肉目动物却 99% 吃竹子，腕骨特化出"伪拇指"便于握竹——如今仍是易危物种，保护级别为国家一级。',
    extension: true,
    parts: [
      { name: '黑白相间', desc: '黑白体色在雪地与阴影中都有隐蔽作用，眼部"黑眼圈"可减少反光干扰视觉。' },
      { name: '伪拇指', desc: '腕部籽骨特化成的"第六指"：与对掌配合牢牢握住竹子——趋同演化的经典案例。' },
      { name: '食竹特化', desc: '保留食肉目的消化道却以竹为食：每天进食 10~18 小时才够能量。' },
      { name: '繁殖困难', desc: '发情期短、幼崽出生时极小（约母体 1/900）——种群自然增长缓慢。' },
      { name: '保护措施', desc: '栖息地保护+人工繁育+野化放归：受威胁等级已从"濒危"降为"易危"。' },
    ],
    Svg: GiantPandaSvg,
  },
  {
    id: 'tissueCultureStages',
    name: '植物组织培养流程',
    kicker: '细胞工程 · 流程图（实验侧图解）',
    intro: '离体的植物组织在无菌培养基上经"脱分化→愈伤组织→再分化"重新长成完整植株——证明高度分化的植物细胞仍然具有全能性。',
    extension: true,
    parts: [
      { name: '外植体', desc: '离体的植物器官、组织或细胞：是组织培养的起点。' },
      { name: '脱分化', desc: '已分化的细胞失去特有结构，转变成无定形状态的愈伤组织。' },
      { name: '再分化', desc: '调整生长素与细胞分裂素的比例，愈伤组织重新分化出根和芽。' },
      { name: '完整植株', desc: '试管苗移栽后长成开花结果的植株——证明植物细胞具有全能性。' },
      { name: '无菌条件', desc: '培养基营养丰富，杂菌繁殖更快：全程需严格灭菌与无菌操作。' },
    ],
    Svg: TissueCultureStagesSvg,
  },
  {
    id: 'vacuole',
    name: '液泡',
    kicker: '细胞器 · 结构模式图',
    intro: '成熟植物细胞的"储水罐"：中央大液泡占据细胞体积的 90%，细胞液里溶着糖、色素与代谢废物——充水膨胀让细胞挺立，失水就萎蔫。',
    parts: [
      { name: '液泡膜', desc: '包裹液泡的单层膜：具有选择透过性，控制物质进出液泡。' },
      { name: '细胞液', desc: '液泡内的液体：溶着糖类、无机盐、色素（花青素）与代谢废物，是植物的"内环境"。' },
      { name: '维持渗透压', desc: '液泡充水膨胀产生膨压，使细胞挺立——浇水后挺拔、缺水就萎蔫下垂。' },
      { name: '与成熟细胞', desc: '成熟的植物细胞才有中央大液泡：分生区细胞只有分散的小液泡。' },
    ],
    Svg: VacuoleSvg,
  },
  {
    id: 'homologousOrgans',
    name: '同源器官',
    kicker: '生物进化 · 比较解剖证据',
    intro: '人的手、鲸的鳍肢、蝙蝠的翼手、狗的前肢：外形功能天差地别，内部骨骼排列却完全一致——同源器官是脊椎动物共同祖先留下的"签名"。',
    parts: [
      { name: '人的手', desc: '肱骨-桡尺骨-腕掌指骨的排列：灵活抓握工具与操作。' },
      { name: '鲸的鳍肢', desc: '骨骼排列与人手一致但变得宽扁：适应水中游泳平衡。' },
      { name: '蝙蝠的翼手', desc: '指骨极度伸长支撑皮膜：适应滑翔飞行。' },
      { name: '同源器官', desc: '起源相同、结构与部位相似，而形态功能不同的器官——比较解剖学上最重要的进化证据。' },
    ],
    Svg: HomologousOrgansSvg,
  },
  {
    id: 'adaptations',
    name: '保护色·拟态·警戒色',
    kicker: '生物适应 · 三类型对比图',
    intro: '生物适应环境的三种"视觉策略"：保护色融入背景、拟态假扮他物、警戒色鲜艳示警——都是长期自然选择保留下来的生存智慧。',
    extension: true,
    parts: [
      { name: '保护色', desc: '体色与环境背景色一致：蚱蜢、北极狐——让天敌"视而不见"。' },
      { name: '拟态', desc: '形态或色泽模拟其他生物或物体：枯叶蝶像枯叶、食蚜蝇模仿蜜蜂。' },
      { name: '警戒色', desc: '鲜艳夺目的体色配合毒刺、恶臭或毒性：黄蜂提前警告天敌"我有毒，别吃我"。' },
      { name: '贝茨拟态', desc: '无毒物种模仿有毒物种的警戒色"狐假虎威"——食蚜蝇冒充蜜蜂。' },
    ],
    Svg: AdaptationsSvg,
  },
  {
    id: 'seedCompare',
    name: '菜豆种子与玉米种子',
    kicker: '种子 · 双子叶与单子叶对比图',
    intro: '菜豆种子有 2 片肥厚子叶、无胚乳；玉米种子只有 1 片子叶、有胚乳——"单双"之分就藏在种子里，是双子叶与单子叶植物的名称由来。',
    parts: [
      { name: '种皮', desc: '保护种子内部结构；玉米的果皮与种皮紧密愈合，不易分开。' },
      { name: '胚芽·胚轴·胚根', desc: '胚的三大部件：新植物的茎叶、连接段与根都由它们发育而来。' },
      { name: '子叶（菜豆 2 片）', desc: '双子叶植物的营养仓库：肥厚储藏养料，萌发时拱出地面变绿。' },
      { name: '胚乳（玉米有）', desc: '单子叶植物的营养储藏处：子叶只有 1 片，负责从胚乳转运营养给胚。' },
      { name: '胚', desc: '种子的核心：胚芽+胚轴+胚根+子叶合称胚——它是新植物体的幼体。' },
    ],
    Svg: SeedCompareSvg,
  },
  {
    id: 'foodPreservation',
    name: '食品保存与防腐',
    kicker: '微生物应用 · 原理图（课外拓展）',
    intro: '食品腐败的根源是微生物的生长繁殖：杀菌（高温、辐照）或抑菌（低温、干燥、高盐高糖）——所有保存方法都逃不出这两条思路。',
    extension: true,
    parts: [
      { name: '高温灭菌+密封', desc: '罐藏、真空包装：先杀死微生物再隔绝污染，保质期最长。' },
      { name: '低温抑菌', desc: '冷藏冷冻不能杀死微生物，只能抑制其繁殖——解冻后要尽快食用。' },
      { name: '脱水与腌制', desc: '晒干、糖渍、盐渍：让微生物渗透失水无法繁殖——果脯蜜饯的原理。' },
      { name: '巴氏消毒法', desc: '60~70°C 加热 30 分钟杀灭致病菌又不破坏风味——牛奶与啤酒常用。' },
    ],
    Svg: FoodPreservationSvg,
  },
  {
    id: 'safeMedication',
    name: '安全用药',
    kicker: '用药与健康 · 常识图（课外拓展）',
    intro: '处方药（Rx）必须凭医师处方购买使用；非处方药（OTC）可自行购买——但无论哪种，先读说明书、对症用药、不滥用抗生素都是底线。',
    extension: true,
    parts: [
      { name: '处方药（Rx）', desc: '必须凭执业医师处方才能购买：用药风险高，须严格遵医嘱使用。' },
      { name: '非处方药（OTC）', desc: '经长期使用公认安全，可自行判断购买：分甲类（红标）与乙类（绿标）。' },
      { name: '读说明书', desc: '看清适应症、用法用量、有效期与禁忌——过期药与变质药坚决不吃。' },
      { name: '不滥用抗生素', desc: '抗生素是处方药：滥用会加速耐药菌进化（见耐药性进化实验），必须遵医嘱足量足疗程。' },
    ],
    Svg: SafeMedicationSvg,
  },
  {
    id: 'cancerCell',
    name: '细胞的癌变',
    kicker: '细胞命运 · 对比模式图',
    intro: '在物理、化学或病毒致癌因子作用下，原癌基因与抑癌基因发生突变：细胞变成能无限增殖、形态畸形、易分散转移的"永生"细胞——这就是癌变。',
    parts: [
      { name: '致癌因子', desc: '物理（紫外线、X 射线）、化学（黄曲霉毒素、亚硝酸盐）、病毒（如乙肝病毒）三大类。' },
      { name: '基因突变', desc: '原癌基因过度表达、抑癌基因失活：两道"刹车"同时失灵，细胞分裂失去控制。' },
      { name: '无限增殖', desc: '癌细胞不再受接触抑制约束，在有限营养里也能不断分裂——"永生"是它的标志。' },
      { name: '形态结构改变', desc: '细胞由规则变畸形、核变大深染、核糖体增多——病理切片据此识别癌细胞。' },
      { name: '易分散转移', desc: '表面糖蛋白减少、黏性下降：癌细胞彼此离散，随血液淋巴转移到全身。' },
    ],
    Svg: CancerCellSvg,
  },
  {
    id: 'cellTheory',
    name: '细胞学说',
    kicker: '必修 1 · 科学史',
    intro: '施莱登与施旺提出"一切动植物都由细胞发育而来"，魏尔肖补充"细胞只能来自细胞"——细胞学说揭示了动植物的统一性，是生物学第一块基石。',
    parts: [
      { name: '施莱登与施旺', desc: '1838-1839 年分别研究植物与动物，共同提出：一切动植物都由细胞发育而来。' },
      { name: '魏尔肖的补充', desc: '"所有的细胞都来源于先前存在的细胞"——修正了"新细胞凭空产生"的错误，直指细胞分裂。' },
      { name: '细胞学说要点', desc: '细胞是有机体结构与生命活动的基本单位；新细胞由老细胞通过分裂产生。' },
      { name: '意义', desc: '揭示了动植物之间的统一性，阐明细胞的统一性与生物体结构的统一性，为达尔文进化论奠定基础。' },
    ],
    Svg: CellTheorySvg,
  },
  {
    id: 'seedlessFruit',
    name: '无子果实培育',
    kicker: '植物激素 · 应用原理图',
    intro: '发育中的种子能产生生长素"催大"果实：不给番茄授粉、改涂生长素，果实照样膨大——但因为没受精，里面没有种子。遗传物质未变，不是可遗传变异。',
    parts: [
      { name: '正常受粉', desc: '花粉完成受精后，发育中的种子产生大量生长素，促进子房发育成果实——有籽。' },
      { name: '未受粉 + 涂生长素', desc: '花蕾期去掉雄蕊（或套袋阻止受粉），人工涂抹一定浓度生长素：子房照样发育成无籽果实。' },
      { name: '原理辨析', desc: '生长素"促进果实发育"（子房→果实），而非"促进果实成熟"（乙烯的作用）——易混考点。' },
      { name: '不可遗传', desc: '细胞内遗传物质没有改变，无子性状不能通过种子传给后代——与多倍体育种的无籽西瓜本质不同。' },
    ],
    Svg: SeedlessFruitSvg,
  },
  {
    id: 'plantTissues',
    name: '植物的主要组织',
    kicker: '植物体 · 五大组织对比图',
    intro: '植物体由五大组织构成：分生组织是"干细胞"源源不断分裂，其余组织分工保护、制造养料、运输与支撑——一棵树就是一支协作团队。',
    parts: [
      { name: '分生组织', desc: '细胞小、壁薄、核大、分裂能力强：根尖与茎的生长点，不断产生新细胞。' },
      { name: '保护组织', desc: '根、茎、叶表面的表皮：细胞排列紧密，减少水分散失、抵御病虫。' },
      { name: '营养组织', desc: '叶肉、果肉等：细胞壁薄、液泡大，储藏养料；含叶绿体的还能光合。' },
      { name: '输导组织', desc: '导管运输水与无机盐，筛管运输有机物——植物体内的"管道系统"。' },
      { name: '机械组织', desc: '细胞壁增厚的厚壁细胞：支撑加固，让茎叶挺立伸展。' },
    ],
    Svg: PlantTissuesSvg,
  },
  {
    id: 'vitamins',
    name: '维生素与缺乏症',
    kicker: '营养与健康 · 对照表（课外拓展）',
    intro: '维生素既不供能也不构成细胞，却是新陈代谢不可缺少的"小助手"：缺 A 夜盲、缺 B₁ 脚气、缺 C 坏血、缺 D 佝偻——均衡饮食就是最好的"药"。',
    extension: true,
    parts: [
      { name: '维生素 A', desc: '缺乏引起夜盲症（暗处看不清）与皮肤干燥；肝脏与胡萝卜是良好来源。' },
      { name: '维生素 B₁', desc: '缺乏引起脚气病与神经炎；粗粮、瘦肉、豆类含量丰富——主食别太精。' },
      { name: '维生素 C', desc: '缺乏引起坏血病（牙龈出血）：新鲜蔬果富含；久煮易破坏，宜生吃或快炒。' },
      { name: '维生素 D', desc: '促进钙吸收，缺乏引起儿童佝偻病与成人骨质疏松；晒太阳皮肤也能合成。' },
    ],
    Svg: VitaminsSvg,
  },
  {
    id: 'invasiveSpecies',
    name: '外来物种入侵',
    kicker: '生态平衡 · 案例图（课外拓展）',
    intro: '水葫芦、福寿螺、加拿大一枝黄花……外来物种在新环境里缺少天敌、繁殖力强，会挤占本地物种的生存空间——保护生态平衡从不随意放生开始。',
    extension: true,
    parts: [
      { name: '什么是入侵', desc: '外来物种被人为引入新环境后疯狂繁殖，排挤本地物种、破坏生态平衡。' },
      { name: '入侵成功原因', desc: '新环境气候适宜 + 缺少天敌制约 + 繁殖力极强——三者缺一不可。' },
      { name: '典型代表', desc: '水葫芦堵塞河道、福寿螺啃食水稻、红火蚁攻击人畜——每年造成巨额损失。' },
      { name: '防控措施', desc: '不随意放生弃养、加强口岸检疫、物理清除与生物防治相结合。' },
    ],
    Svg: InvasiveSpeciesSvg,
  },
  {
    id: 'silkwormLife',
    name: '家蚕的发育',
    kicker: '昆虫 · 完全变态发育图',
    intro: '家蚕一生经历卵、幼虫、蛹、成虫四个阶段：幼虫取食蜕皮后吐丝结茧化蛹，不食不动的蛹内发生"大改造"，羽化成蚕蛾——完全变态发育。',
    extension: true,
    parts: [
      { name: '卵', desc: '受精卵：胚胎发育的起点，孵化出幼虫。' },
      { name: '幼虫', desc: '取食桑叶迅速长大，几次蜕皮后吐丝结茧——蚕丝就来自这一阶段。' },
      { name: '蛹', desc: '不吃不动的"改造期"：体内大部分组织重构，发育出翅、足与生殖器官。' },
      { name: '成虫', desc: '破茧羽化为蚕蛾：有翅但不善飞行，专司交配与产卵。' },
      { name: '完全变态', desc: '幼体与成体形态差别巨大、经历蛹期的发育方式——与蝗虫的不完全变态（无蛹期）对比记忆。' },
    ],
    Svg: SilkwormLifeSvg,
  },
  {
    id: 'lichen',
    name: '地衣',
    kicker: '真菌与藻类的共生体（课外拓展）',
    intro: '地衣不是一种生物，而是真菌与藻类的"合资企业"：藻类光合供糖、真菌吸水供房——这对搭档让地衣成为能在裸岩、极地生存的"拓荒先锋"。',
    extension: true,
    parts: [
      { name: '藻类细胞', desc: '散布在地衣体中的绿藻或蓝细菌：进行光合作用，为真菌提供有机养料。' },
      { name: '真菌菌丝', desc: '包裹藻类细胞的菌丝网：吸收水分无机盐，为藻类提供庇护与矿物质。' },
      { name: '叶状地衣体', desc: '菌藻交织形成的扁平体，紧密贴附在岩石树皮上。' },
      { name: '拓荒先锋', desc: '分泌地衣酸腐蚀岩石形成最初的土壤——为其他植物登陆"开路"。' },
      { name: '空气指示计', desc: '地衣对空气污染极其敏感：有地衣的地方空气通常很清新。' },
    ],
    Svg: LichenSvg,
  },
  {
    id: 'pcrStages',
    name: 'PCR 三步温度循环',
    kicker: '基因工程 · 流程图（实验侧图解）',
    intro: 'PCR 在体外模拟 DNA 复制：变性（双链解开）→复性（引物结合）→延伸（Taq 酶合成新链），循环 20~30 次就能把 DNA 指数级扩增。',
    extension: true,
    parts: [
      { name: '① 变性（90~95°C）', desc: '高温打断碱基对间的氢键，双链 DNA 解开成两条单链模板。' },
      { name: '② 复性（55~60°C）', desc: '温度降低，引物与模板链互补结合，为合成新链"定位"。' },
      { name: '③ 延伸（72°C）', desc: '耐高温的 Taq 酶从引物出发，按碱基互补配对合成新链。' },
      { name: '指数扩增', desc: '每循环一轮 DNA 数量翻倍：n 次循环后约为原来的 2ⁿ 倍——痕量样本也能"放大"检测。' },
    ],
    Svg: PcrStagesSvg,
  },
  {
    id: 'verticalLayers',
    name: '森林的垂直结构',
    kicker: '群落生态 · 分层现象图',
    intro: '森林群落自上而下分乔木、灌木、草本、地被四层：分层提高了群落利用阳光等环境资源的能力，动物的分层也随之而来。',
    parts: [
      { name: '乔木层', desc: '最高的林冠层：吸收阳光最强的"顶层公寓"，栖scope树栖鸟类与松鼠。' },
      { name: '灌木层', desc: '较矮的木本植物，耐半荫，为鸟类与小型哺乳动物提供巢域。' },
      { name: '草本层', desc: '需光较少的草本植物，分布昆虫、两栖类等小型动物。' },
      { name: '地被层', desc: '苔藓、地衣与真菌：分解落叶残体，与土壤微生物共同完成物质循环。' },
      { name: '动物的分层', desc: '动物也随植物分层：树冠层鸟类、灌木层昆虫、土壤中蚯蚓与线虫。' },
    ],
    Svg: VerticalLayersSvg,
  },
  {
    id: 'cytoskeleton',
    name: '细胞骨架',
    kicker: '细胞结构 · 模式图（课外拓展）',
    intro: '细胞质中不是"空"的：微管与微丝等蛋白质纤维交织成骨架——支撑细胞形态、牵引染色体分离、充当细胞器运输的"高速公路"。',
    extension: true,
    parts: [
      { name: '微管', desc: '较粗的中空蛋白管：构成"运输轨道"，马达蛋白沿它搬运囊泡与细胞器。' },
      { name: '微丝', desc: '较细的实心蛋白丝（肌动蛋白）：维持细胞形状，参与变形运动与细胞分裂缢缩。' },
      { name: '中心体', desc: '动物细胞中微管的组织中心：分裂时发出纺锤丝牵引染色体。' },
      { name: '功能', desc: '支撑形态、细胞运动、胞内运输与细胞分裂——细胞骨架是"命脉网络"。' },
    ],
    Svg: CytoskeletonSvg,
  },
  {
    id: 'muscleTissues',
    name: '肌肉组织三种类型',
    kicker: '人体组织 · 对比模式图',
    intro: '骨骼肌、心肌、平滑肌：结构与功能相适应——骨骼肌随意控制躯体运动，心肌自动节律性收缩，平滑肌负责胃肠蠕动与血管舒缩。',
    parts: [
      { name: '骨骼肌', desc: '长圆柱状、多核、有明显横纹：附着在骨上，受意识支配快速有力地收缩。' },
      { name: '心肌', desc: '分支状细胞经闰盘相连成网：自动有节律地收缩，终身不停——构成心脏壁。' },
      { name: '平滑肌', desc: '梭形、无横纹、单核：收缩缓慢持久，分布在胃肠、血管等内脏器官壁。' },
      { name: '随意与不随意', desc: '骨骼肌受意识支配；心肌和平滑肌由自主神经调节，无法"命令"它们停下。' },
    ],
    Svg: MuscleTissuesSvg,
  },
  {
    id: 'ecosystemTypes',
    name: '生态系统的类型',
    kicker: '生态系统 · 类型总览图',
    intro: '森林、草原、海洋、湿地、农田、城市——不同环境孕育不同的生态系统：自然类型的调节能力强，人工类型则高度依赖人类维护。',
    parts: [
      { name: '森林生态系统', desc: '动植物种类最丰富，调节能力最强——"绿色水库"，涵养水源、防风固沙。' },
      { name: '草原生态系统', desc: '以草本植物为主，分布在干旱半干旱地区，降雨量少且不稳定。' },
      { name: '海洋生态系统', desc: '覆盖地球 70% 的表面：藻类是主要生产者，浮游生物是食物链的基础。' },
      { name: '湿地生态系统', desc: '沼泽、红树林、湖泊等：净化水质、蓄洪防旱，被称为"地球之肾"。' },
      { name: '农田与城市', desc: '人工建立的生态系统：生物种类少、结构简单，抵抗力稳定性弱，需人来维护。' },
    ],
    Svg: EcosystemTypesSvg,
  },
  {
    id: 'immuneOrgans',
    name: '免疫器官',
    kicker: '免疫调节 · 器官位置图',
    intro: '免疫细胞从骨髓里的造血干细胞诞生：T 细胞在胸腺成熟，B 细胞在骨髓成熟，随后驻扎在脾、淋巴结等"哨卡"待命。',
    parts: [
      { name: '骨髓', desc: '造血干细胞的"老家"：所有免疫细胞都由它分化产生，B 细胞在此成熟。' },
      { name: '胸腺', desc: 'T 淋巴细胞发育成熟的场所——T 细胞（T 代表胸腺 Thymus）因此得名。' },
      { name: '脾', desc: '最大的免疫器官：过滤血液、清除衰老红细胞，储存大量淋巴细胞。' },
      { name: '淋巴结', desc: '遍布全身的"哨卡"：拦截病原体，是免疫细胞聚集与活化作战的据点。' },
      { name: '扁桃体', desc: '守卫在消化道与呼吸道入口的淋巴组织，发炎肿大就是"战斗"的信号。' },
    ],
    Svg: ImmuneOrgansSvg,
  },
  {
    id: 'endocrineGlands',
    name: '内分泌腺',
    kicker: '激素调节 · 腺体位置图',
    intro: '内分泌腺没有导管，分泌的激素直接进入血液运往全身：垂体是"总开关"，甲状腺促代谢，胰岛素降血糖——量少而作用大。',
    parts: [
      { name: '垂体', desc: '位于大脑底部：分泌生长激素，并分泌促激素指挥甲状腺等"下属"腺体——激素调节的"总开关"。' },
      { name: '甲状腺', desc: '位于颈部：分泌甲状腺激素，促进新陈代谢与生长发育（幼年过少会患呆小症）。' },
      { name: '肾上腺', desc: '分泌肾上腺素：应激状态下心跳加快、血压升高——"应急响应"的激素。' },
      { name: '胰岛', desc: '散布在胰腺中：分泌胰岛素（降低血糖）与胰高血糖素（升高血糖），拮抗维持血糖稳定。' },
      { name: '性腺', desc: '睾丸或卵巢：分泌性激素，促进生殖器官发育与第二性征的出现。' },
    ],
    Svg: EndocrineGlandsSvg,
  },
  {
    id: 'vertebrateClasses',
    name: '脊椎动物五大纲',
    kicker: '脊椎动物 · 五大纲对比表',
    intro: '鱼类、两栖类、爬行类、鸟类、哺乳类：从水生到陆生、从卵生到胎生、从变温到恒温——呼吸、生殖与体温的对比串起脊椎动物的进化主线。',
    parts: [
      { name: '鱼类', desc: '鳃呼吸、水中受精产卵、变温——终生生活在水中。' },
      { name: '两栖类', desc: '幼体用鳃、成体用肺兼皮肤呼吸，生殖离不开水——从水生到陆生的过渡类群。' },
      { name: '爬行类', desc: '肺呼吸、产羊膜卵在陆上发育——生殖摆脱水束缚，真正登陆的类群。' },
      { name: '鸟类', desc: '肺+气囊双重呼吸、产羊膜卵并孵卵、恒温——适应空中飞行。' },
      { name: '哺乳类', desc: '肺呼吸、胎生哺乳、恒温——神经系统和感官最发达的脊椎动物。' },
    ],
    Svg: VertebrateClassesSvg,
  },
  {
    id: 'photosyntheticPigments',
    name: '光合色素',
    kicker: '叶绿体色素 · 纸层析结果图',
    intro: '叶绿体中的色素可用纸层析法分开成四条带：胡萝卜素、叶黄素、叶绿素 a、叶绿素 b——溶解度越高扩散越快；叶绿素 a 含量最多。',
    parts: [
      { name: '胡萝卜素', desc: '橙黄色：溶解度最高，层析时跑得最快，位于最上端。' },
      { name: '叶黄素', desc: '黄色：位于第二条带，与胡萝卜素合称类胡萝卜素（吸收蓝紫光）。' },
      { name: '叶绿素 a', desc: '蓝绿色：含量最多的色素，层析带最宽，主要吸收红光和蓝紫光。' },
      { name: '叶绿素 b', desc: '黄绿色：溶解度最低、跑得最慢，位于最下端。' },
      { name: '提取要点', desc: '加二氧化硅研磨、加碳酸钙保护色素、层析液不能没过滤液细线。' },
    ],
    Svg: PhotosyntheticPigmentsSvg,
  },
  {
    id: 'bacteriaShapes',
    name: '细菌的三种形态',
    kicker: '细菌 · 形态分类图',
    intro: '按外形细菌可分球菌、杆菌、螺旋菌三类：它们都是原核生物——没有以核膜为界限的细胞核，靠二分裂增殖，细胞壁含肽聚糖。',
    parts: [
      { name: '球菌', desc: '球形的细菌：如金黄色葡萄球菌（聚集成葡萄串状）。' },
      { name: '杆菌', desc: '杆状或圆柱形：如大肠杆菌（肠道常见菌）、结核杆菌。' },
      { name: '螺旋菌', desc: '弯曲呈弧形或螺旋形：如霍乱弧菌。' },
      { name: '原核生物', desc: '三类细菌的共同点：无成形细胞核（只有 DNA 集中的核区）、细胞壁含肽聚糖、二分裂增殖。' },
    ],
    Svg: BacteriaShapesSvg,
  },
  {
    id: 'speciesRelations',
    name: '种间关系',
    kicker: '群落生态 · 四类型对比图',
    intro: '同一群落里不同物种之间的关系有四种：竞争（两败俱伤）、捕食（一吃一）、寄生（一害一利）、互利共生（双方受益）——决定群落的结构。',
    parts: [
      { name: '竞争', desc: '两种生物争夺同一资源（阳光、水、食物）：如水稻与稗草，通常一方或双方受抑制。' },
      { name: '捕食', desc: '一种生物以另一种为食：如猫捕食老鼠，捕食者与猎物的数量相互制约、周期波动。' },
      { name: '寄生', desc: '一方获利一方受害：蛔虫寄生在人体肠道夺取养分——寄生物通常不立即杀死宿主。' },
      { name: '互利共生', desc: '双方互相依赖、彼此有利：根瘤菌固氮供给豆科植物，植物提供有机物与住所。' },
    ],
    Svg: SpeciesRelationsSvg,
  },
  {
    id: 'whale',
    name: '鲸',
    kicker: '水生哺乳动物 · 结构模式图',
    intro: '鲸长得像鱼却不是鱼（课外拓展）：用肺呼吸、胎生哺乳、恒温——流线型身体、鳍肢与水平尾鳍，是哺乳动物适应水生生活的"改造版"。',
    extension: true,
    parts: [
      { name: '肺呼吸', desc: '头顶的喷气孔与肺相连：鲸必须定时浮出水面换气，这是它与鱼类的根本区别之一。' },
      { name: '鳍肢', desc: '前肢变成鳍状，骨骼仍是"五指"结构——与陆生哺乳动物同源，用于平衡与转向。' },
      { name: '水平尾鳍', desc: '上下摆动提供前进动力（鱼类的尾鳍是垂直左右摆动）。' },
      { name: '胎生哺乳', desc: '幼鲸在母体内发育、出生后吃乳汁——恒温的哺乳动物。' },
      { name: '流线型身体', desc: '减少水中阻力；厚厚的脂肪（鲸脂）保温并提供浮力。' },
    ],
    Svg: WhaleSvg,
  },
  {
    id: 'boneStructure',
    name: '骨的结构与造血',
    kicker: '运动系统 · 长骨结构图',
    intro: '骨不只是"支架"：骨膜滋养与再生骨质，骨密质坚硬抗重压，骨松质轻巧承力，骨髓腔里的红骨髓更是终身造血的"血细胞工厂"。',
    extension: true,
    parts: [
      { name: '骨膜', desc: '覆盖骨表面的结缔组织膜：内含血管、神经与成骨细胞，对骨的营养、生长与再生有重要作用。' },
      { name: '骨密质', desc: '骨干外层的致密骨组织，抗压抗扭曲，是骨的"承重墙"。' },
      { name: '骨松质', desc: '骨两端的蜂窝状结构，排列成承受压力的拱形——轻而坚固。' },
      { name: '骨髓', desc: '骨髓腔与骨松质间隙中的软组织：幼年全为红骨髓（造血），成年后骨干内变为黄骨髓，但骨松质内终身保留红骨髓。' },
      { name: '关节面软骨', desc: '关节面覆盖的光滑软骨减少运动时的摩擦与震动。' },
    ],
    Svg: BoneStructureSvg,
  },
  {
    id: 'pineCone',
    name: '松果（球果）',
    kicker: '裸子植物 · 球果结构图',
    intro: '松、杉、柏是裸子植物：种子裸露在种鳞上、没有子房壁包被所以不形成果实——"松果"其实是充满种鳞的球果，不是水果。',
    extension: true,
    parts: [
      { name: '针叶', desc: '条形或针状的叶，表皮角质层厚、气孔深陷，抗寒抗旱——松树四季常青的秘密。' },
      { name: '球果（种鳞）', desc: '木质种鳞螺旋排列，每一片种鳞内侧着生裸露的种子。' },
      { name: '裸露的种子', desc: '种子没有果皮包被（裸子植物的核心特征），靠 wing 翅或动物散播。' },
      { name: '裸子植物家族', desc: '松、杉、柏、银杏、苏铁等：种子植物中更原始的一支，木质部只有管胞。' },
    ],
    Svg: PineConeSvg,
  },
  {
    id: 'biosphere',
    name: '生物圈',
    kicker: '生态 · 结构示意图',
    intro: '地球上所有生物与环境的总和：大气圈底部、水圈全部与岩石圈表面——厚度约 20 千米的"生命薄膜"，也是地球上最大的生态系统。',
    parts: [
      { name: '大气圈底部', desc: '飞翔的鸟类与昆虫、漂浮的细菌在此活动；提供氧气、二氧化碳与适宜温度。' },
      { name: '水圈全部', desc: '从海洋表层到深海热泉都有生物：水圈是生物圈中"体积最大"的成员。' },
      { name: '岩石圈表面', desc: '土壤表层聚集绝大多数陆生生物：是生物圈的"立足点"与营养库。' },
      { name: '最大的生态系统', desc: '生物圈包含地球上全部生态系统，物质循环与能量流动在这里全球联通。' },
    ],
    Svg: BiosphereSvg,
  },
  {
    id: 'rootTypes',
    name: '根系类型对比',
    kicker: '根 · 直根系与须根系对比图',
    intro: '双子叶植物是直根系（胚根发育的粗壮主根 + 侧根），单子叶植物是须根系（主根早亡、由不定根组成的"胡须丛"）——一眼可辨的分类特征。',
    parts: [
      { name: '直根系', desc: '主根明显粗长、垂直向下，侧根逐级分支——大多数双子叶植物（菜豆、杨树）如此。' },
      { name: '主根', desc: '由种子中的胚根直接发育而来，是直根系的"中轴"。' },
      { name: '侧根', desc: '从主根上长出的分支，向四周扩展固定并扩大吸收面积。' },
      { name: '须根系', desc: '主根早早停止生长，由茎基部萌发的大量不定根组成——单子叶植物（小麦、水稻、葱）的特征。' },
      { name: '不定根', desc: '由茎或叶上长出（而非胚根），也说明植物组织具有再生的全能性。' },
    ],
    Svg: RootTypesSvg,
  },
  {
    id: 'evolutionTree',
    name: '生物进化树',
    kicker: '生物进化 · 历程图',
    intro: '进化树把 35 亿多年的生命历程画成一棵"树"：从共同原始祖先出发，分支越来越多、生物越来越多样——现代生物都是这条进化长河的"末梢"。',
    parts: [
      { name: '共同祖先', desc: '树根代表所有生物的共同原始祖先：约 35 亿年前出现的原始生命。' },
      { name: '最早的原核生物', desc: '化石证据显示最早的原核生物（类似蓝细菌）出现在约 35 亿年前，并逐渐改变大气成分。' },
      { name: '植物界分支', desc: '能够自养制造有机物的绿色植物分支，是生态系统中最基础的生产者。' },
      { name: '动物界分支', desc: '从无脊椎动物到脊椎动物（鱼类→两栖→爬行→鸟类和哺乳类），结构越来越复杂。' },
      { name: '生物多样性', desc: '进化树上每个分支的末梢都是一类现存生物——多样性是长期进化的结果。' },
    ],
    Svg: EvolutionTreeSvg,
  },
  {
    id: 'taxonomyLevel',
    name: '生物分类等级',
    kicker: '分类学 · 七级单位图',
    intro: '生物分类从大到小依次是界、门、纲、目、科、属、种：分类单位越小，包含的生物越少，但共同特征越多、亲缘关系越近。',
    parts: [
      { name: '界', desc: '最大的分类单位，同一界的生物共同特征最少（如动物界）。' },
      { name: '门、纲、目、科', desc: '介于界与属之间的中间等级，逐级缩小范围、增加共同特征。' },
      { name: '属', desc: '相近种的集合，如豹属包括虎、狮、豹等。' },
      { name: '种', desc: '最小的分类单位也是基本单位：同种生物可以交配并繁殖出有生殖能力的后代。' },
      { name: '双命名法', desc: '林奈创立：每个物种用"属名 + 种名"的拉丁学名表示，如虎为 Panthera tigris。' },
    ],
    Svg: TaxonomyLevelSvg,
  },
  {
    id: 'rumen',
    name: '反刍胃（牛胃）',
    kicker: '哺乳动物 · 四室胃（课外拓展）',
    intro: '牛的胃有四个室：瘤胃里的微生物先把草中的纤维发酵，半消化的食物返回口中细嚼（反刍）再依次经网胃、瓣胃到皱胃真正消化——"食草机器"的秘密。',
    extension: true,
    parts: [
      { name: '瘤胃', desc: '四室中最大的一个：亿万个微生物在此发酵分解纤维素，为牛提供葡萄糖等养料。' },
      { name: '网胃', desc: '内壁呈蜂窝状，继续过滤与研磨食物，异物（如铁钉）也容易滞留于此。' },
      { name: '瓣胃', desc: '内有许多叶片（毛肚就是它），主要吸收水分和部分营养。' },
      { name: '皱胃', desc: '唯一分泌胃液的"真胃"：真正进行化学性消化，相当于其他哺乳动物的胃。' },
      { name: '反刍', desc: '休息时把瘤胃中半消化的食物返回口中细细咀嚼再咽下——让微生物更充分地分解纤维。' },
    ],
    Svg: RumenSvg,
  },
  {
    id: 'stemStructure',
    name: '茎的结构',
    kicker: '茎 · 横切结构图',
    intro: '木质部的导管向上运水，韧皮部的筛管向下运有机物，中间的形成层不断分裂让茎逐年加粗——运输与支撑两不误。',
    parts: [
      { name: '表皮', desc: '茎最外层的保护结构，幼茎表皮细胞含叶绿体时可进行光合作用。' },
      { name: '韧皮部', desc: '位于形成层外侧，含筛管与伴胞，把叶片制造的有机物向下运输。' },
      { name: '形成层', desc: '木质部与韧皮部之间的分生组织：向外产生韧皮部、向内产生木质部，使茎逐年加粗。' },
      { name: '木质部', desc: '含导管运输水分和无机盐，细胞壁厚而坚硬，是茎的"骨架"。' },
      { name: '髓', desc: '茎中央的薄壁组织，储藏养料。' },
    ],
    Svg: StemStructureSvg,
  },
  {
    id: 'brainStructure',
    name: '人脑结构',
    kicker: '中枢神经 · 结构模式图',
    intro: '中枢神经系统的"总指挥部"：大脑是调节的最高级中枢，小脑协调运动维持平衡，脑干掌管心跳呼吸——饿坏不得的生命中枢。',
    parts: [
      { name: '大脑', desc: '表面是布满沟回的大脑皮层，是调节人体生理活动的最高级中枢（感觉、运动、语言等）。' },
      { name: '小脑', desc: '使运动协调、准确，维持身体平衡——醉酒走路不稳就是小脑被酒精麻痹。' },
      { name: '脑干', desc: '含有调节心跳、呼吸、血压等基本生命活动的中枢，被称为"生命中枢"。' },
      { name: '脊髓', desc: '脑干向下延续：既是脑与躯干内脏间的联系通路，也是反射的低级中枢（如膝跳反射）。' },
    ],
    Svg: BrainStructureSvg,
  },
  {
    id: 'sponge',
    name: '海绵',
    kicker: '多孔动物 · 结构模式图',
    intro: '最原始的多细胞动物（课外拓展）：固着在海底滤食为生，没有消化腔与神经系统，全靠领细胞鞭毛摆动形成水流——连"再生"都只是一团细胞重新聚合。',
    extension: true,
    parts: [
      { name: '入水小孔', desc: '遍布体表的小孔：水流携带着食物颗粒和氧气从这些孔进入体内。' },
      { name: '领细胞', desc: '内壁的领鞭毛细胞：鞭毛摆动形成水流，滤取食物颗粒进行细胞内消化。' },
      { name: '出水孔', desc: '过滤后的水从顶端的大孔集中排出——一个大海绵每天能过滤上百升水。' },
      { name: '骨针', desc: '钙质或硅质的针状"骨架"，支撑柔软的身体，也是分类的重要依据。' },
      { name: '原始性', desc: '没有消化腔、没有神经系统：细胞分化程度极低，分散后还能重新聚合成体。' },
    ],
    Svg: SpongeSvg,
  },
  {
    id: 'starfish',
    name: '海星',
    kicker: '棘皮动物 · 结构模式图',
    intro: '海里的"五角星"（课外拓展）：五辐射对称的棘皮动物，靠水管系统驱动成百上千的管足缓慢爬行，甚至能把胃翻出体外消化贝壳里的猎物。',
    extension: true,
    parts: [
      { name: '五辐射对称', desc: '五条腕围绕中央盘辐射排列——幼体仍两侧对称，发育中变为辐射对称。' },
      { name: '棘刺（内骨骼）', desc: '体表棘刺由中胚层形成的内骨骼突出而成，"棘皮动物"因此得名。' },
      { name: '管足', desc: '腕下方成排的细小管状足，由独特的水管系统液压驱动，带吸盘可攀附贝壳。' },
      { name: '口', desc: '位于腹面中央，捕食双壳类时能把贲门胃从口中翻出，体外消化后再收回。' },
      { name: '再生能力', desc: '中央盘残存一条腕即可再生出完整的身体——强大的再生是它的招牌技能。' },
    ],
    Svg: StarfishSvg,
  },
  {
    id: 'karyotype',
    name: '人体核型',
    kicker: '遗传 · 染色体组型图',
    intro: '把人体细胞的 46 条染色体按大小配对排列就是核型：22 对常染色体 + 1 对性染色体（女 XX、男 XY），核型分析能发现染色体数目与结构的异常。',
    parts: [
      { name: '22 对常染色体', desc: '按大小从 1 号排到 22 号：1 号最大、21 号最小，每对形态大小相同（同源染色体）。' },
      { name: '性染色体', desc: '第 23 对：女性为两条 X 染色体，男性为一条 X 和一条小得多的 Y 染色体。' },
      { name: '着丝粒', desc: '每条染色体上凹陷的缢缩部位，纺锤丝附着处，分裂时牵拉染色体移向两极。' },
      { name: '核型分析', desc: '诊断染色体异常的经典手段：如 21 号多出一条即"21 三体综合征（唐氏综合征）"。' },
    ],
    Svg: KaryotypeSvg,
  },
  {
    id: 'sieveTube',
    name: '筛管与伴胞',
    kicker: '植物输导组织 · 结构模式图',
    intro: '筛管把叶片制造的有机物自上而下运往全身：上下两端的筛板布满筛孔让细胞质互通，旁边的伴胞则像"后勤部队"为失去细胞核的筛管细胞提供代谢支持。',
    parts: [
      { name: '筛管细胞', desc: '长管状活细胞首尾相连，成熟后细胞核退化，专门执行运输功能。' },
      { name: '筛板', desc: '筛管细胞两端的横壁，上面有许多筛孔，细胞质通过筛孔彼此连通。' },
      { name: '有机物运输', desc: '把叶片光合产物（主要是蔗糖）运输到根、茎、果实等部位储藏或利用。' },
      { name: '伴胞', desc: '紧贴筛管的狭长薄壁细胞，细胞核与细胞器齐全，为筛管细胞提供能量与物质。' },
      { name: '与导管对比', desc: '导管运水向上（死细胞），筛管运有机物多向下（活细胞）——方向与生死都相反。' },
    ],
    Svg: SieveTubeSvg,
  },
  {
    id: 'lizard',
    name: '蜥蜴',
    kicker: '爬行动物 · 结构模式图',
    intro: '真正适应陆地生活的爬行动物：角质鳞片防失水，肺呼吸，体内受精产羊膜卵——生殖发育彻底摆脱了对水的依赖。',
    parts: [
      { name: '角质鳞片', desc: '皮肤干燥覆有角质鳞片，既保护身体又能有效防止体内水分蒸发。' },
      { name: '肺', desc: '肺内部有隔膜形成网状小室，气体交换面积大——完全靠肺在空气呼吸。' },
      { name: '四肢与爪', desc: '四肢短小带爪，贴地爬行；指（趾）端有爪便于抓握岩石攀爬。' },
      { name: '羊膜卵', desc: '壳坚韧、有羊水保护：受精在体内完成，卵产在陆地上发育，幼体不经水生阶段。' },
      { name: '断尾', desc: '尾部遇敌可自行断落迷惑捕食者，之后能再生——是重要的防御行为。' },
    ],
    Svg: LizardSvg,
  },
  {
    id: 'alveolus',
    name: '肺泡',
    kicker: '呼吸系统 · 结构模式图',
    intro: '肺的基本功能单位：约 3 亿个肺泡外面包绕着丰富的毛细血管，两层"一层细胞"的壁让氧气与二氧化碳高效交换。',
    parts: [
      { name: '肺泡', desc: '支气管末端膨大形成的半球状囊泡，是肺部气体交换的主要部位。' },
      { name: '毛细血管网', desc: '细小的血管密密包绕肺泡外壁，把全身回流的静脉血送来进行气体交换。' },
      { name: '薄壁结构', desc: '肺泡壁与毛细血管壁都只由一层上皮细胞构成——气体扩散只需穿过两层细胞。' },
      { name: '气体交换', desc: '氧气由肺泡扩散进入血液、二氧化碳反方向排入肺泡：依靠气体浓度差被动完成。' },
      { name: '弹性纤维', desc: '肺泡外壁的弹性纤维使肺泡吸气时扩张、呼气时回缩，把气体"挤"出去。' },
    ],
    Svg: AlveolusSvg,
  },
  {
    id: 'ecosystemComponents',
    name: '生态系统的组成成分',
    kicker: '生态系统 · 概念关系图',
    intro: '一个完整的生态系统由四类成分构成：非生物的物质和能量、生产者、消费者、分解者——物质循环与能量流动的框架由此搭起。',
    parts: [
      { name: '非生物的物质和能量', desc: '阳光、水、空气、无机盐与温度等：为生物提供物质与能量的根本来源。' },
      { name: '生产者', desc: '绿色植物等自养生物：通过光合作用把无机物合成有机物，是生态系统的能量入口。' },
      { name: '消费者', desc: '直接或间接以植物为食的动物：加快物质循环，帮助植物传粉与传播种子。' },
      { name: '分解者', desc: '细菌、真菌等腐生生物：把动植物遗体与排遗物分解为无机物，归还非生物环境。' },
      { name: '物质循环', desc: '生产者合成有机物，经消费者取食传递，最终由分解者分解归还——物质在群落与无机环境间反复利用。' },
    ],
    Svg: EcosystemComponentsSvg,
  },
  {
    id: 'leafBud',
    name: '芽的结构',
    kicker: '叶芽 · 纵切结构图',
    intro: '芽是未发育的枝条：生长点的细胞不断分裂，叶原基发育成幼叶，芽轴发育成茎，芽原基发育成侧芽——春天展叶就是它苏醒的样子。',
    parts: [
      { name: '生长点', desc: '芽顶端的分生组织：细胞小、核大、分裂旺盛，使芽轴不断伸长。' },
      { name: '叶原基', desc: '生长点周围的突起，将来发育成幼叶。' },
      { name: '幼叶', desc: '叶原基发育而来，层层叠叠包在芽内，展叶后成为真正的叶。' },
      { name: '芽轴', desc: '芽的中轴，将来发育成茎（输送水分养料并支撑枝叶）。' },
      { name: '芽原基', desc: '芽轴侧面的突起，将来发育成侧芽，侧芽再长成侧枝。' },
      { name: '芽鳞片', desc: '芽外层的变态叶，质地坚硬，保护柔软的内部结构越冬。' },
    ],
    Svg: LeafBudSvg,
  },
  {
    id: 'bloodCells',
    name: '血细胞三种类型',
    kicker: '血液 · 对比模式图',
    intro: '血液 = 血浆 + 血细胞：红细胞运氧、白细胞防御、血小板止血——三种细胞形态、数量、功能各不相同，都源自骨髓的造血干细胞。',
    parts: [
      { name: '红细胞', desc: '数量最多（约 5×10¹²/L）：两面凹的圆饼状、成熟后无细胞核，含血红蛋白运输氧气。' },
      { name: '白细胞', desc: '体积最大、有细胞核、数量最少：能变形穿过毛细血管壁，吞噬病菌——对人体起防御保护作用。' },
      { name: '血小板', desc: '最小的无核细胞碎片：在破损血管处聚集黏附，释放凝血物质止血。' },
      { name: '血浆', desc: '淡黄色的液体成分，运载血细胞，运输养料和代谢废物。' },
    ],
    Svg: BloodCellsSvg,
  },
  {
    id: 'shrimp',
    name: '沼虾',
    kicker: '甲壳纲 · 结构模式图',
    intro: '节肢动物门甲壳纲的代表（课外拓展）：头胸部愈合覆盖头胸甲，身体分节、足也分对——步足爬行、游泳足拨水，适应水底爬行与避敌。',
    extension: true,
    parts: [
      { name: '头胸部', desc: '头部与胸部愈合，外覆坚韧的头胸甲（外骨骼），内含主要内脏。' },
      { name: '额剑与复眼', desc: '额剑是头胸甲前伸出的锯齿状突起，用于防御攻击；有柄的复眼视野开阔。' },
      { name: '分节的腹部与尾扇', desc: '腹部肌肉发达、分节明显，遇敌时急剧弯折、尾扇拨水使身体快速后退。' },
      { name: '步足 5 对', desc: '位于头胸部腹面，用于水底爬行；前两对螯状，可捕食御敌。' },
      { name: '游泳足 5 对', desc: '腹部的腹肢，短小似桨，辅助缓慢游动并托抱卵。' },
      { name: '触须 2 对', desc: '头前细长的感觉器官，感知水流、触碰与化学信号。' },
    ],
    Svg: ShrimpSvg,
  },
  {
    id: 'birdEgg',
    name: '鸟卵结构',
    kicker: '鸟的生殖 · 结构模式图',
    intro: '鸟卵是一个自带的"营养舱 + 保育箱"：卵壳和卵白保护供水，气室供氧，卵黄提供养料，胚盘里的细胞核是胚胎发育的起点。',
    parts: [
      { name: '卵壳与卵壳膜', desc: '坚硬的石灰质壳上有气孔可透气；壳膜双层包裹，防止水分蒸发和微生物侵入。' },
      { name: '气室', desc: '钝端壳膜之间的空腔，储存空气，为临近出壳的胚胎提供氧气。' },
      { name: '卵白', desc: '透明的胶体（蛋清），既是缓冲保护层，又为胚胎提供水分和部分营养。' },
      { name: '卵黄', desc: '卵细胞的主要营养储备，供胚胎发育全程使用；表面覆有卵黄膜。' },
      { name: '胚盘', desc: '卵黄表面的白色小盘，内含细胞核，是受精后胚胎发育的部位——未受精的卵色浅而小。' },
      { name: '系带', desc: '卵黄两端的螺旋状结构，把卵黄悬浮固定在中央，防止震动破坏胚盘。' },
    ],
    Svg: BirdEggSvg,
  },
  {
    id: 'skinStructure',
    name: '皮肤结构',
    kicker: '人体 · 结构模式图',
    intro: '皮肤是人体最大的器官，也是体温调节的"前沿阵地"：冷热感受器在这里，血管舒缩、汗腺分泌、立毛肌战栗这些效应器也在这里。',
    parts: [
      { name: '表皮', desc: '角质化复层上皮，没有血管；角质层防止水分散失与病菌侵入，生发层细胞不断分裂补充。' },
      { name: '真皮', desc: '致密结缔组织为主，内含血管、汗腺、毛囊和感觉神经末梢，是皮肤的"功能层"。' },
      { name: '毛发与毛囊', desc: '毛囊连着立毛肌：寒冷刺激下立毛肌收缩，"起鸡皮疙瘩"并减少体表散热。' },
      { name: '汗腺', desc: '盘曲的管状腺体，分泌汗液带走热量——炎热环境下蒸发散热的主要效应器。' },
      { name: '血管', desc: '真皮中的小动脉舒张时血流量大、散热多；收缩时血流量骤减、保存热量。' },
      { name: '感觉神经末梢', desc: '感受冷、热、触、压等刺激，把信息传入体温调节中枢（下丘脑）。' },
    ],
    Svg: SkinStructureSvg,
  },
  {
    id: 'chlamydomonas',
    name: '衣藻',
    kicker: '单细胞绿藻 · 结构模式图',
    intro: '生活在淡水中的单细胞绿藻：一个细胞就是一座"光合工厂"——杯状叶绿体自养，眼点感光游向光亮处，两条等长鞭毛划水前进。',
    parts: [
      { name: '细胞壁', desc: '纤维素构成的坚固外壁，维持细胞形状（多呈卵形/球形）。' },
      { name: '鞭毛', desc: '细胞前端两条等长鞭毛，划水使细胞游动——所以衣藻能主动趋向光照。' },
      { name: '杯状叶绿体', desc: '大型杯状、占据细胞大部分体积，是光合作用的场所，使衣藻自养。' },
      { name: '蛋白核', desc: '叶绿体上的致密小体，与淀粉的合成与储藏有关。' },
      { name: '眼点', desc: '橙红色的感光小点，感知光的方向与强弱，配合鞭毛实现趋光运动。' },
      { name: '细胞核', desc: '遗传信息库，位于细胞中央偏前，由两层核膜包裹。' },
    ],
    Svg: ChlamydomonasSvg,
  },
  {
    id: 'vessels',
    name: '血管三种类型',
    kicker: '循环系统 · 对比模式图',
    intro: '动脉、静脉、毛细血管的结构与功能相适应：管壁厚薄、弹性、血流速度各不同，毛细血管的一层细胞壁正是物质交换的"窗口"。',
    parts: [
      { name: '动脉', desc: '把血液从心脏输送到身体各部分：管壁厚、弹性大，血流速度最快。' },
      { name: '静脉', desc: '把血液从身体各部分送回心脏：管壁较薄、弹性小、管腔大，内有瓣膜防止血液倒流。' },
      { name: '毛细血管', desc: '连通于最小的动脉与静脉之间：管壁仅由一层上皮细胞构成，红细胞单行通过，血流速度最慢。' },
      { name: '物质交换', desc: '毛细血管的结构特点使血液与组织细胞充分进行物质交换——结构与功能相适应的典型例子。' },
    ],
    Svg: VesselsSvg,
  },
  {
    id: 'leafCrossSection',
    name: '叶的横切结构',
    kicker: '叶 · 横切结构图',
    intro: '叶片是光合作用的主要器官：栅栏组织与海绵组织的叶肉细胞里含大量叶绿体，气孔是气体进出与水分散失的"门户"，叶脉负责运输。',
    parts: [
      { name: '上表皮', desc: '细胞排列紧密、外壁有角质层，透光防水，保护叶肉组织。' },
      { name: '栅栏组织', desc: '靠近上表皮的圆柱形细胞，排列整齐紧密，含叶绿体较多——光合作用最旺盛的部位。' },
      { name: '海绵组织', desc: '靠近下表皮、形状不规则排列疏松，细胞间隙大，利于气体流通；也含叶绿体。' },
      { name: '叶脉', desc: '含导管与筛管：导管把水运来供光合作用，筛管把制造的有机物运走，还起支撑作用。' },
      { name: '下表皮与气孔', desc: '下表皮气孔较多：气孔由一对保卫细胞围成，是气体交换和水分蒸腾的门户。' },
    ],
    Svg: LeafCrossSectionSvg,
  },
  {
    id: 'hydra',
    name: '水螅',
    kicker: '刺胞动物 · 结构模式图',
    intro: '生活在淡水中的两胚层动物（课外拓展）：身体呈辐射对称，触手上的刺细胞能麻醉猎物，食物在消化循环腔内消化，还能靠出芽生殖繁殖。',
    extension: true,
    parts: [
      { name: '触手', desc: '口周围辐射排列的细长突起，用来捕捉小型水生动物并送入口中。' },
      { name: '刺细胞', desc: '外胚层特有的攻击细胞：受刺激时射出刺丝注入毒素，麻醉猎物——刺胞动物因此得名。' },
      { name: '口与消化循环腔', desc: '口是食物入口也是残渣出口；消化循环腔内的细胞消化食物，养分扩散到全身。' },
      { name: '体壁（两胚层）', desc: '由外胚层和内胚层两层细胞构成，中间夹着胶状中胶层——比海绵进化、比三胚层动物原始。' },
      { name: '芽体（出芽生殖）', desc: '体壁向外突起长成芽体，脱落后发育为新个体；环境恶劣时也能有性生殖。' },
      { name: '基盘', desc: '身体基部的附着结构，分泌黏液把水螅固定在水草或石块上。' },
    ],
    Svg: HydraSvg,
  },
  {
    id: 'mussel',
    name: '河蚌',
    kicker: '软体动物 · 结构模式图',
    intro: '水生软体动物的代表：身体柔软，有外套膜与两片贝壳，水从入水孔进入、经鳃呼吸后由出水孔排出，靠斧足掘泥沙运动。',
    parts: [
      { name: '贝壳', desc: '两片石灰质硬壳，由闭壳肌控制开合，保护柔软的身体。' },
      { name: '外套膜', desc: '包裹软体部分的膜状结构，分泌珍珠质形成贝壳——珍珠就是外套膜包裹异物形成的。' },
      { name: '鳃', desc: '片状结构密布毛细血管：水流经鳃时完成气体交换，是水中呼吸的器官。' },
      { name: '斧足', desc: '斧头状的肌肉质足，用来挖掘泥沙，使河蚌能把身体埋进水底缓慢移动。' },
      { name: '入水孔与出水孔', desc: '水从入水孔进入外套腔（带来食物与氧气），经鳃交换后由出水孔排出。' },
    ],
    Svg: BivalveMusselSvg,
  },
  {
    id: 'mushroom',
    name: '蘑菇（伞菌）',
    kicker: '多细胞真菌 · 子实体结构图',
    intro: '蘑菇是真菌的"子实体"：地上的菌盖与菌柄负责繁殖（菌褶产生孢子），地下的菌丝体吸收有机养分——细胞内没有叶绿体，只能异养。',
    parts: [
      { name: '菌盖', desc: '伞状的帽部结构，保护下方的菌褶，展开后利于孢子向四周散布。' },
      { name: '菌褶', desc: '菌盖下方放射状排列的薄片，是产生孢子的场所——一朵蘑菇可释放数十亿枚孢子。' },
      { name: '菌柄', desc: '柱状支持结构，把菌盖举离地面，方便孢子随气流散播。' },
      { name: '营养菌丝', desc: '深入土壤与枯枝落叶中的丝状体，分泌酶分解有机物并吸收养分（异养腐生）。' },
      { name: '孢子', desc: '真菌的繁殖细胞，飘散到温暖潮湿的环境即可萌发成新菌丝。' },
    ],
    Svg: MushroomSvg,
  },
  {
    id: 'rootTip',
    name: '根尖结构',
    kicker: '根尖 · 纵切结构图',
    intro: '从根尖端向上依次是根冠、分生区、伸长区、成熟区：根的生长靠分生区分裂与伸长区伸长，吸收水分和无机盐则主要靠成熟区的根毛。',
    parts: [
      { name: '根冠', desc: '罩在分生区外面的帽状结构，细胞较大排列疏松，保护分生区在土壤中钻行不被磨损。' },
      { name: '分生区', desc: '被根冠包围，细胞体积小、细胞核大、排列紧密，具有很强的分裂能力，不断产生新细胞。' },
      { name: '伸长区', desc: '细胞逐渐停止分裂、迅速伸长，是根伸长最快的部位——根向土壤深处生长主要靠它。' },
      { name: '成熟区（根毛区）', desc: '表皮细胞向外突起形成大量根毛，扩大吸收面积；内部已分化出导管，是吸收水分和无机盐的主要部位。' },
      { name: '导管', desc: '由中空长管状死细胞连接成的输水管道，把根毛吸收的水分和无机盐向上运输到茎和叶。' },
    ],
    Svg: RootTipSvg,
  },
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
  {
    id: 'nitrobacteria',
    name: '硝化细菌',
    kicker: '特色生物 · 化能合成自养',
    intro: '不用光也能"自给自足"：把氨氧化成硝酸，用释放的化学能把 CO₂ 和水合成有机物——化能合成作用的代表生物。',
    parts: [
      { name: '化能合成作用', desc: '利用体外环境中的无机物氧化释放的化学能，把 CO₂ 和 H₂O 合成有机物——与光合作用同为自养，但不依赖光。' },
      { name: '氨 → 亚硝酸 → 硝酸', desc: '两步氧化各释放化学能；硝化细菌从中"赚取"能量维持生命。' },
      { name: '氮循环角色', desc: '把氨转化为植物可利用的硝酸盐，提高土壤肥力——种豆养田、施肥翻土都与此相关。' },
      { name: '原核身份', desc: '没有核膜包被的细胞核、只有核糖体一种细胞器——与蓝细菌、乳酸菌同为原核常客。' },
      { name: '易混辨析', desc: '硝化细菌（自养、化能合成）≠ 乳酸菌（异养、发酵）≠ 根瘤菌（异养、共生固氮）——三类细菌代谢类型对比是高频题。' },
    ],
    Svg: NitrobacteriaSvg,
  },
  {
    id: 'spirogyra',
    name: '水绵',
    kicker: '特色生物 · 经典实验材料',
    intro: '丝状绿藻，叶绿体是一条螺旋盘绕的"绿带子"——恩格尔曼用极细光束照射水绵、借好氧细菌的分布，证明了氧气由叶绿体释放。',
    parts: [
      { name: '带状叶绿体', desc: '一条到多条螺旋盘绕的带状叶绿体——水绵最大的辨识特征，也是实验选它的原因（受光面积大）。' },
      { name: '丝状体结构', desc: '一列长筒形细胞连成不分枝的丝状体，每节细胞都有壁、膜、液泡、细胞核和叶绿体——典型真核绿藻。' },
      { name: '恩格尔曼实验', desc: '极细光束照水绵，好氧细菌只聚集在被光照射的叶绿体部位 → 证明氧气由叶绿体释放、叶绿体是光合作用场所。' },
      { name: '实验巧思', desc: '没有空气的黑暗环境排干扰、好氧细菌当"氧气探测器"、极细光束当"探针"——实验设计的严谨性是考点。' },
    ],
    Svg: SpirogyraSvg,
  },
  {
    id: 'lactobacillus',
    name: '乳酸菌',
    kicker: '特色生物 · 发酵菌种',
    intro: '泡菜坛和酸奶里的主角：无氧条件下把葡萄糖分解成乳酸——酸味来自它，"酸而不腐"也是它。',
    parts: [
      { name: '无氧发酵产乳酸', desc: '葡萄糖 → 乳酸，不产生酒精和 CO₂（与酵母菌酒精发酵对比记忆）。' },
      { name: '异养厌氧型', desc: '利用现成有机物、氧气会抑制其发酵——泡菜坛要"水封"创造无氧环境。' },
      { name: '原核生物', desc: '杆菌形态、无核膜包被的细胞核，只有核糖体一种细胞器。' },
      { name: '产酸抑菌', desc: '大量产酸使 pH 下降，抑制杂菌生长——泡菜、酸奶能久存的原理。' },
      { name: '应用', desc: '酸奶、泡菜、青贮饲料；制作过程防止杂菌污染是关键（对应"泡菜的制作"实验）。' },
    ],
    Svg: LactobacillusSvg,
  },
  {
    id: 'tmv',
    name: '烟草花叶病毒',
    kicker: '特色生物 · RNA 病毒',
    intro: '棒状的植物 RNA 病毒，感染烟草出现花叶斑驳；"重建实验"用它证明：重组病毒的性状由 RNA 决定——RNA 是遗传物质。',
    parts: [
      { name: '棒状形态', desc: '约 300 nm 的直杆：螺旋排列的衣壳蛋白包裹着中央的单链 RNA——结构对称而简单。' },
      { name: '衣壳蛋白与 RNA', desc: '蛋白质是"外壳"，RNA 是"核心"；两者不是"半保留"关系，重建实验能分开组装。' },
      { name: '重建实验', desc: 'TMV 的蛋白质 + HRV 的 RNA 重组 → 杂合病毒侵染后，后代与 HRV 完全相同——RNA 是遗传物质、蛋白质不是。' },
      { name: '对照记忆', desc: 'T2 噬菌体证明 DNA 是遗传物质（侵染细菌）；TMV 证明 RNA 也可以是遗传物质（侵染植物）——两实验互补成对。' },
      { name: '病毒共性', desc: '没有细胞结构，必须寄生在活细胞中；核酸 + 蛋白质构成（有的还有包膜）。' },
    ],
    Svg: TmvSvg,
  },
  {
    id: 'chromosome',
    name: '染色体与染色质',
    kicker: '专有名词 · 同一物质两种形态',
    intro: '染色质和染色体是同一物质（DNA + 蛋白质）在细胞不同时期的两种形态——间期是细丝"染色质"，分裂期螺旋浓缩成"染色体"。',
    parts: [
      { name: '组成', desc: '主要成分是 DNA 和蛋白质；DNA 是遗传信息的载体——细胞中"遗传物质在哪里"的答案就在这里。' },
      { name: '染色质（间期）', desc: '细丝状、交织成网，像"散开的毛线"——此时便于 DNA 复制和转录（"串珠链"上的珠子是组蛋白）。' },
      { name: '染色体（分裂期）', desc: '高度螺旋化、缩短变粗，像"盘好的毛线团"——便于分裂时平均分配遗传物质。' },
      { name: '着丝粒与姐妹染色单体', desc: '复制后的染色体含两条姐妹染色单体，共用一个着丝粒；着丝粒分裂后单体成为两条子染色体。' },
      { name: '数目变化口诀', desc: '染色体数目在着丝粒分裂时（后期）加倍；DNA 含量在间期复制后加倍——两条曲线对比是高频考题。' },
    ],
    Svg: ChromosomeSvg,
  },
  {
    id: 'antibody',
    name: '抗体',
    kicker: '专有名词 · 免疫球蛋白',
    intro: '浆细胞分泌的 Y 形蛋白质，能与抗原特异性结合——"一把钥匙开一把锁"，是体液免疫的核心武器。',
    parts: [
      { name: 'Y 形结构', desc: '两条重链 + 两条轻链借二硫键连接；本质是蛋白质（免疫球蛋白），由核糖体合成、经内质网和高尔基体分泌。' },
      { name: '抗原结合部位', desc: 'Y 臂末端的可变区千变万化——一种抗体只能结合一种抗原，这就是特异性。' },
      { name: '结合后的效应', desc: '抗体与抗原结合形成沉淀或细胞集团，最终被吞噬细胞消化清除——抗体只"抓"不"杀"。' },
      { name: '谁分泌的', desc: '浆细胞（效应 B 细胞）——它不能再识别抗原，是专门"生产抗体"的工厂。' },
      { name: '二次免疫', desc: '初次免疫留下记忆细胞；再次遇到同一抗原时，记忆细胞迅速增殖分化，抗体更快更多——疫苗的原理。' },
    ],
    Svg: AntibodySvg,
  },
  {
    id: 'nucleus',
    name: '细胞核',
    kicker: '专有名词 · 细胞结构',
    intro: '细胞核是遗传信息库，是细胞代谢和遗传的控制中心——双层核膜、核孔、核仁与染色质各司其职。',
    parts: [
      { name: '核膜（双层膜）', desc: '把核内物质与细胞质分开；外膜常与内质网相连——生物膜系统的一员。' },
      { name: '核孔', desc: '实现核质之间频繁的物质交换和信息交流：mRNA 出核、蛋白质入核都走这里（DNA 不出去）。' },
      { name: '核仁', desc: '与某种 RNA（rRNA）的合成以及核糖体的形成有关——代谢旺盛的细胞核仁明显更大。' },
      { name: '染色质', desc: 'DNA 的主要载体——遗传信息就储存在染色质的 DNA 上（见"染色体与染色质"条目）。' },
      { name: '功能定位', desc: '细胞核是遗传信息库，是细胞代谢和遗传的控制中心——与"细胞核移植"实验证据配套记忆。' },
    ],
    Svg: NucleusSvg,
  },
  {
    id: 'photosynthesisProcess',
    name: '光合作用过程',
    kicker: '专有名词 · 全过程图解',
    intro: '光反应在类囊体薄膜上（水的光解、合成 ATP），暗反应在叶绿体基质中（CO₂ 固定、C₃ 还原）——两阶段靠 ATP 和 [H] 衔接。',
    parts: [
      { name: '光反应（类囊体薄膜）', desc: '必须光：水光解释放 O₂、生成 H⁺，同时把光能转化为 ATP 和 NADPH（[H]）中的活跃化学能。' },
      { name: '暗反应（叶绿体基质）', desc: '有光无光都能进行（短时间）：CO₂ 与 C₅ 结合固定成 2 个 C₃，C₃ 再被还原成糖类。' },
      { name: '物质联系', desc: '光反应为暗反应提供 ATP 和 [H]；暗反应为光反应提供 ADP、Pi 和 NADP⁺——相互依存。' },
      { name: '元素去痕', desc: 'O₂ 全部来自水的光解；CO₂ 中的 C 进入有机物；H 从水经 [H] 进入有机物——同位素标记题常考。' },
      { name: '总反应式', desc: 'CO₂ + H₂O →（CH₂O）+ O₂（条件：光能、叶绿体）——能量变化：光能 → 有机物中稳定的化学能。' },
    ],
    Svg: PhotosynthesisProcessSvg,
  },
  {
    id: 'centralDogma',
    name: '中心法则',
    kicker: '专有名词 · 遗传信息传递',
    intro: '遗传信息从 DNA 传给 RNA、再传给蛋白质；后来补充了 RNA 自我复制与逆转录——实线是细胞生物共有，虚线只在部分病毒。',
    parts: [
      { name: 'DNA 复制', desc: '细胞分裂前的信息传递：亲代 DNA → 两个子代 DNA（半保留复制）。' },
      { name: '转录', desc: '主要在细胞核：以 DNA 一条链为模板合成 mRNA——把遗传信息"抄写"出去。' },
      { name: '翻译', desc: '在核糖体：以 mRNA 为模板、tRNA 搬运氨基酸，合成有一定氨基酸序列的蛋白质。' },
      { name: 'RNA 复制与逆转录', desc: '某些病毒（如烟草花叶病毒、HIV）才有：RNA 复制 RNA；逆转录以 RNA 合成 DNA——中心法则的补充。' },
      { name: '意义', desc: '解释了遗传信息如何决定性状：基因控制蛋白质的合成（直接控制）或控制酶的合成控制代谢（间接控制）。' },
    ],
    Svg: CentralDogmaSvg,
  },
  {
    id: 'nucleotide',
    name: '核苷酸',
    kicker: '专有名词 · 核酸的基本单位',
    intro: '核酸的基本单位：一分子磷酸 + 一分子五碳糖 + 一分子含氮碱基——五碳糖和特有碱基区分了 DNA 与 RNA 的单体。',
    parts: [
      { name: '磷酸', desc: '连接在五碳糖上，是核酸长链"骨架"的一部分。' },
      { name: '五碳糖', desc: '区分两种核酸的关键之一：DNA 用脱氧核糖，RNA 用核糖——名字里的差别就在这里。' },
      { name: '含氮碱基', desc: 'DNA 有 A、T、C、G 四种；RNA 有 A、U、C、G——特有碱基 T/U 是常考判断点。' },
      { name: '聚合成长链', desc: '4 种脱氧核苷酸聚合成 DNA，4 种核糖核苷酸聚合成 RNA；磷酸-五碳糖交替连接为骨架。' },
      { name: '多样性', desc: '核苷酸数目成千上万、排列顺序千变万化——构成 DNA 分子的多样性，是生物多样性的根源。' },
    ],
    Svg: NucleotideSvg,
  },
  {
    id: 'enzymeModel',
    name: '酶-底物锁钥模型',
    kicker: '专有名词 · 酶的作用原理',
    intro: '酶的活性中心与底物形状互补，像钥匙配锁——结合后降低化学反应的活化能，反应完成后酶恢复原状、可以重复使用。',
    parts: [
      { name: '活性中心', desc: '酶表面与底物互补结合的部位——形状不匹配就结合不上，这是专一性的结构基础。' },
      { name: '降低活化能', desc: '酶把普通分子变成容易反应的"过渡状态"，显著降低反应门槛——所以反应高效。' },
      { name: '酶本身不变', desc: '反应前后酶的结构和数量不变，可以反复使用——少量酶就能催化大量底物。' },
      { name: '条件温和', desc: '适宜温度和 pH 下活性最高；高温、过酸、过碱破坏空间结构 → 活性永久丧失（低温只是抑制）。' },
      { name: '对比无机催化剂', desc: '高效性（降低活化能更显著）、专一性（一种酶催化一种或一类反应）——对照实验题的高频结论。' },
    ],
    Svg: EnzymeModelSvg,
  },
  {
    id: 'monoclonalAntibody',
    name: '单克隆抗体制备',
    kicker: '专有名词 · 选必 3 流程图',
    intro: '让 B 淋巴细胞与骨髓瘤细胞融合成杂交瘤细胞：既会"产专一抗体"又能"无限增殖"——体外培养或小鼠腹水中提取单克隆抗体。',
    parts: [
      { name: '免疫的 B 淋巴细胞', desc: '能产生特异性抗体，但在体外不能无限增殖——"会干活、不长寿"。' },
      { name: '骨髓瘤细胞', desc: '能无限增殖，但不产生抗体——"长寿、不干活"。' },
      { name: '细胞融合与筛选', desc: '用 PEG 或灭活病毒诱导融合，再筛选出同时具备两亲本优点的杂交瘤细胞。' },
      { name: '体内/体外生产', desc: '杂交瘤细胞可体外培养或注射到小鼠腹腔，从培养液/腹水中提取大量单克隆抗体。' },
      { name: '优点与应用', desc: '特异性强、灵敏度高、可大量制备——早早孕试纸、抗原检测、靶向药物都靠它。' },
    ],
    Svg: MonoclonalAntibodySvg,
  },
  {
    id: 'osmosisSetup',
    name: '渗透作用装置',
    kicker: '实验原理 · 经典装置图',
    intro: '半透膜两侧溶液存在浓度差时，水分子向高浓度一侧净移动——漏斗内液面上升，这就是质壁分离实验的原理。',
    parts: [
      { name: '半透膜', desc: '只允许水分子等小分子通过、蔗糖分子不能通过——多孔性膜的孔径决定"谁能过"。' },
      { name: '浓度差', desc: '渗透作用发生的两个条件之一：膜两侧必须有浓度差，水才发生净移动。' },
      { name: '液面上升', desc: '水净进入漏斗使内液面高于外液面；上升的压力与渗透压差平衡后停止——不是无限上升。' },
      { name: '对应到细胞', desc: '半透膜 ↔ 原生质层（细胞膜+液泡膜+其间细胞质）；浓度差 ↔ 外界溶液与细胞液的浓度差。' },
      { name: '方向判断', desc: '外界溶液＞细胞液 → 质壁分离；＜ → 复原；＝ → 动态平衡——判断题的核心口诀。' },
    ],
    Svg: OsmosisSetupSvg,
  },
  {
    id: 'nervePotential',
    name: '神经纤维上的电位',
    kicker: '实验原理 · 电位变化图解',
    intro: '静息时外正内负（K⁺ 外流）；受刺激处 Na⁺ 内流变成外负内正（动作电位）——电位差形成局部电流，兴奋传向未兴奋部位。',
    parts: [
      { name: '静息电位', desc: '外正内负：静息时细胞膜主要对 K⁺ 有通透性，K⁺ 外流形成"内负外正"。' },
      { name: '动作电位', desc: '受刺激后膜对 Na⁺ 通透性增加，Na⁺ 内流 → 膜电位倒转成"外负内正"。' },
      { name: '局部电流', desc: '兴奋部位与未兴奋部位之间存在电位差 → 电荷移动形成局部电流，刺激相邻部位同样翻转。' },
      { name: '膜内外方向', desc: '膜内：电流方向 = 兴奋传导方向；膜外：相反——电流计偏转题的核心结论。' },
      { name: '传导特点', desc: '离体神经纤维上双向传导；在反射弧中（有突触）只能单向传递——两个场景分开记。' },
    ],
    Svg: NervePotentialSvg,
  },
  {
    id: 'biofilmSystem',
    name: '生物膜系统',
    kicker: '专有名词 · 膜的联系网络',
    intro: '核膜、细胞器膜、细胞膜在结构上直接或经囊泡相连，功能上分工协作——分泌蛋白的"生产流水线"就是它的代表作。',
    parts: [
      { name: '组成', desc: '核膜、内质网、高尔基体、溶酶体等细胞器膜和细胞膜——它们共同构成细胞的膜系统。' },
      { name: '结构联系', desc: '内质网膜内连核膜外膜；各膜之间靠囊泡"转运膜成分"——出芽、融合，膜可以互相转化。' },
      { name: '功能协作', desc: '分泌蛋白的合成运输流水线：核糖体（合成）→ 内质网（初加工）→ 高尔基体（再加工）→ 细胞膜（胞吐）。' },
      { name: '意义', desc: '扩大膜面积提供酶附着位点；把细胞分隔成小区室，让各种化学反应互不干扰、高效有序。' },
      { name: '考点点睛', desc: '生物膜系统不包含"半透膜"等抽象概念，也不含线粒体内膜以外"细胞内的所有膜"之外的膜——组成范围要背准。' },
    ],
    Svg: BiofilmSystemSvg,
  },
  {
    id: 'cellDifferentiation',
    name: '细胞分化与全能性',
    kicker: '专有名词 · 细胞命运概念图',
    intro: '受精卵分裂产生的细胞，基因相同却"开的开关"不同——这就是分化；而植物细胞离体培养能长成完整个体，证明全能性。',
    parts: [
      { name: '细胞分化', desc: '个体发育中，后代细胞在形态、结构和生理功能上发生稳定性差异的过程，贯穿一生。' },
      { name: '本质：基因选择性表达', desc: '分化细胞的遗传物质完全相同（都来自同一个受精卵），只是表达的基因不同——"总谱一样，演奏的乐章不同"。' },
      { name: '全能性', desc: '已分化的细胞仍具有发育成完整个体的潜能；植物细胞全能性容易表达（组培），动物体细胞的核也有全能性（核移植）。' },
      { name: '与细胞分裂的区别', desc: '分裂增加数目、分化增加"种类"；癌变是"失控增殖"，与分化方向相反。' },
    ],
    Svg: CellDifferentiationSvg,
  },
  {
    id: 'ageStructure',
    name: '年龄组成',
    kicker: '专有名词 · 种群特征图解',
    intro: '种群中各年龄期个体的比例叫年龄组成：增长型幼年多、衰退型老年多——它"预测"种群密度的变化趋势。',
    parts: [
      { name: '增长型', desc: '幼年个体多、老年个体少 → 出生率 > 死亡率 → 种群密度将增大（"金字塔"形）。' },
      { name: '稳定型', desc: '各年龄期比例适中 → 密度保持相对稳定（"钟形"）。' },
      { name: '衰退型', desc: '幼年个体少、老年个体多 → 密度将减小（"倒金字塔"）。' },
      { name: '易错提醒', desc: '年龄组成只能"预测"趋势；直接决定种群密度的是出生率、死亡率、迁入率和迁出率——预测 ≠ 决定。' },
      { name: '性别比例', desc: '通过影响出生率间接影响密度（如用性引诱剂诱杀雄虫防治害虫）——四对关系常混考。' },
    ],
    Svg: AgeStructureSvg,
  },
  {
    id: 'communityStructure',
    name: '群落空间结构',
    kicker: '专有名词 · 群落结构图解',
    intro: '垂直分层让森林"住满上下楼"，水平镶嵌让生物"各占一块地"——空间结构提高群落对环境资源的利用能力。',
    parts: [
      { name: '垂直结构', desc: '分层现象：乔木层→灌木层→草本层→根系层；显著提高群落利用阳光等环境资源的能力。' },
      { name: '动物的分层', desc: '植物为动物提供食物和栖息空间——植物的垂直分层决定动物的分层（鸟类分林冠/中层/地面三层）。' },
      { name: '水平结构', desc: '地形起伏、光照湿度不均 → 生物呈镶嵌分布，同一地段疏密有别（不是均匀分布）。' },
      { name: '应用', desc: '间种套种利用垂直结构增产；湖养鱼分层捕捞（上层鲢鳙、下层草青）——生产实践直接用。' },
    ],
    Svg: CommunityStructureSvg,
  },
  {
    id: 'centrosome',
    name: '中心体',
    kicker: '细胞器 · 无膜细胞器',
    intro: '两个相互垂直的中心粒组成，9 组三联微管围成一圈——动物细胞和低等植物细胞特有，与有丝分裂纺锤体的形成有关。',
    parts: [
      { name: '两个中心粒', desc: '互相垂直排列成"L"形——分裂前复制一份，分别移向两极。' },
      { name: '9 组三联微管', desc: '每个中心粒由 9 组三联微管围成圆筒——电镜下的经典图像。' },
      { name: '无膜细胞器', desc: '没有膜包被，与核糖体一样属于"无膜"细胞器——细胞器膜性判断题常考。' },
      { name: '分布', desc: '动物细胞和低等植物细胞有；高等植物细胞没有（靠细胞两极直接发出纺锤丝）。' },
      { name: '功能', desc: '与有丝分裂有关：发出星射线形成纺锤体，牵引染色体平均分配到两极。' },
    ],
    Svg: CentrosomeSvg,
  },
  {
    id: 'homeostasisNetwork',
    name: '神经-体液-免疫调节网络',
    kicker: '专有名词 · 稳态调节机制',
    intro: '维持内环境稳态靠三大系统协同：神经调节快而准、体液调节慢而广、免疫调节负责清除"异己"——缺一不可。',
    parts: [
      { name: '神经调节', desc: '反射弧完成，反应迅速、定位准确、作用时间短——体温、血糖调节都离不开它。' },
      { name: '体液调节', desc: '激素等化学物质经体液运输，反应较慢、作用范围广、时间长——分级调节 + 反馈调节。' },
      { name: '免疫调节', desc: '防卫（抵御病原体）、监控（清除突变细胞）、清除（衰老损伤细胞）三大功能。' },
      { name: '协同实例', desc: '体温调节=神经+体液；流感恢复=免疫为主+神经体液配合；三者构成统一调节网络。' },
      { name: '结论背熟', desc: '"神经-体液-免疫调节网络是机体维持稳态的主要调节机制"——教材原话，判断题直接考。' },
    ],
    Svg: HomeostasisNetworkSvg,
  },
  {
    id: 'mycoplasma',
    name: '支原体',
    kicker: '特色生物 · 课外拓展',
    intro: '目前发现的最小原核细胞——没有细胞壁，只有细胞膜当边界；这也是"青霉素对它无效"的原因。',
    parts: [
      { name: '最小细胞', desc: '直径约 0.1~0.3 μm，是目前已知能独立生活的最小细胞——"最小细胞"考点常客。' },
      { name: '没有细胞壁', desc: '唯一边界是细胞膜，形态多变（多形性）——注意与"所有原核生物都有细胞壁"的错误说法区分。' },
      { name: '原核身份', desc: '有拟核（环状 DNA）和核糖体，没有核膜包被的细胞核——原核特征齐全。' },
      { name: '青霉素为何无效', desc: '青霉素抑制细胞壁（肽聚糖）合成——支原体压根没有细胞壁，所以药不对症（改用大环内酯类）。' },
    ],
    extension: true,
    Svg: MycoplasmaSvg,
  },
  {
    id: 'amoeba',
    name: '变形虫',
    kicker: '特色生物 · 课外拓展',
    intro: '单细胞原生动物，靠伪足运动和摄食——"细胞膜流动性"的活教材；切割实验还证明了细胞核的控制作用。',
    parts: [
      { name: '伪足', desc: '临时形成的细胞质突起，用于运动和包围食物——形状随时改变，体现细胞膜具有流动性。' },
      { name: '食物泡', desc: '吞噬的食物被膜包裹成食物泡，与溶酶体融合后被消化——胞内消化全过程。' },
      { name: '细胞核的控制作用', desc: '经典实验：切为两半后有核的一半能存活再生、无核的一半逐渐死亡——细胞核控制代谢与遗传。' },
      { name: '单细胞"全能选手"', desc: '一个细胞完成运动、摄食、消化、排泄、生殖——没有细胞分化，各"部门"就是各种细胞器。' },
    ],
    extension: true,
    Svg: AmoebaSvg,
  },
  {
    id: 'euglena',
    name: '眼虫',
    kicker: '特色生物 · 课外拓展',
    intro: '有叶绿体能光合自养、有鞭毛会游动、有红色眼点能感光——动植物特征"一身兼"的跨界原生生物。',
    parts: [
      { name: '叶绿体（自养）', desc: '有光时进行光合作用制造有机物——这一点像植物。' },
      { name: '鞭毛与眼点', desc: '鞭毛摆动游泳；红色眼点感知光的方向——趋光运动，这一点像动物。' },
      { name: '兼性营养', desc: '有光自养、无光异养（吸收有机物）——营养方式介于动物与植物之间。' },
      { name: '分类启示', desc: '眼虫的"跨界"说明动物、植物有共同祖先——进化上"中间类型"的证据之一。' },
    ],
    extension: true,
    Svg: EuglenaSvg,
  },
  {
    id: 'bioaccumulation',
    name: '生物富集',
    kicker: '专有名词 · 课外拓展',
    intro: '重金属和 DDT 这类难分解的有害物质，沿食物链逐级浓缩——营养级越高浓度越大，能量递减的"反向版"。',
    parts: [
      { name: '什么是生物富集', desc: '有害物质（汞、镉、DDT）难分解、难排出，随食物链传递时在体内越积越多。' },
      { name: '与能量流动对比', desc: '能量沿食物链逐级递减（10%~20%），有害物浓度却逐级递增——两条"曲线"方向相反，对照记忆。' },
      { name: '顶位风险最大', desc: '人、大型食肉鱼等顶级消费者受害最深——水俣病就是汞富集导致的公害病。' },
      { name: '治理启示', desc: '从源头控制排放比事后治理更有效；食物链越长、富集越明显——监测顶级捕食者就是监测环境。' },
    ],
    extension: true,
    Svg: BioaccumulationSvg,
  },
  {
    id: 'divisionCurve',
    name: '数目变化曲线',
    kicker: '专有名词 · 分裂过程曲线',
    intro: '有丝分裂与减数分裂中 DNA 和染色体数目的变化：看懂两条曲线，分裂过程的数量问题就全通了。',
    parts: [
      { name: '有丝分裂（DNA）', desc: '间期复制后 DNA 由 2C 加倍到 4C，一直保持到末期细胞一分为二才减回 2C。' },
      { name: '有丝分裂（染色体）', desc: '染色体数在间期不变（复制的是染色单体），只在后期着丝粒分裂时短暂加倍，末期恢复。' },
      { name: '减数分裂（DNA）', desc: '间期复制到 4C 后，减Ⅰ末减半为 2C，减Ⅱ末再减半为 C——两次分裂、一次复制。' },
      { name: '减数分裂（染色体）', desc: '减Ⅰ末同源染色体分离使数目减半为 N；减Ⅱ后期着丝粒分裂短暂加倍后仍为 N。' },
      { name: '读图口诀', desc: 'DNA 斜坡=复制；染色体直角凸起=着丝粒分裂；曲线下降=细胞一分为二。' },
    ],
    Svg: DivisionCurveSvg,
  },
  {
    id: 'threeDefenseLines',
    name: '人体三道防线',
    kicker: '专有名词 · 免疫调节层级',
    intro: '皮肤黏膜挡在门口，吞噬细胞四处巡逻，免疫细胞精准狙击——三道防线共同构成人体的防御体系。',
    parts: [
      { name: '第一道防线：皮肤和黏膜', desc: '机械阻挡病原体入侵，分泌物有杀菌作用，纤毛能清扫异物——出生就有。' },
      { name: '第二道防线：杀菌物质和吞噬细胞', desc: '体液中的溶菌酶溶解细菌，吞噬细胞吞掉并消化病原体——同样生来就有。' },
      { name: '非特异性免疫', desc: '第一、二道防线的共同点：对多种病原体都有防御作用，没有针对性。' },
      { name: '第三道防线：免疫器官和免疫细胞', desc: '借助 T、B 淋巴细胞和抗体，只针对特定病原体起作用——特异性免疫（后天获得）。' },
      { name: '易错提醒', desc: '吞噬细胞既参与第二道防线（直接吞噬），也在第三道防线中摄取、处理、呈递抗原——"一员多岗"。' },
    ],
    Svg: ThreeDefenseLinesSvg,
  },
  {
    id: 'heartCirculation',
    name: '心脏与血液循环',
    kicker: '专有名词 · 循环系统',
    intro: '心脏是血液循环的"泵"：四腔结构保证动脉血和静脉血完全分流，瓣膜防倒流。',
    parts: [
      { name: '四腔结构', desc: '左心房、左心室、右心房、右心室——同侧房室相通，左右被完整隔开不相通。' },
      { name: '瓣膜防倒流', desc: '房室瓣和动脉瓣保证血液只能：心房→心室→动脉，不能倒流。' },
      { name: '体循环', desc: '左心室 → 全身毛细血管 → 右心房：给组织细胞送去氧气和养料，带走废物。' },
      { name: '肺循环', desc: '右心室 → 肺部毛细血管 → 左心房：排出 CO2、获得 O2（静脉血变动脉血）。' },
      { name: '心壁厚薄', desc: '左心室壁最厚——要把血液泵到全身（路程最长）；心房壁最薄。' },
    ],
    Svg: HeartCirculationSvg,
  },
  {
    id: 'nephron',
    name: '肾单位与尿液形成',
    kicker: '专有名词 · 泌尿系统',
    intro: '每个肾脏约含 100 万个肾单位：肾小球过滤血液形成原尿，肾小管重吸收有用物质形成尿液。',
    parts: [
      { name: '肾小球的过滤作用', desc: '血液流经肾小球时，除血细胞和大分子蛋白质外，水、无机盐、葡萄糖、尿素过滤到肾小囊形成原尿。' },
      { name: '肾小管的重吸收作用', desc: '原尿流经肾小管时：全部葡萄糖、大部分水和部分无机盐被重新吸收回血液。' },
      { name: '尿液成分', desc: '水、无机盐、尿素——原尿中剩下的废物和水。' },
      { name: '尿糖与蛋白尿', desc: '尿中出现葡萄糖 = 肾小管重吸收异常（或糖尿病）；出现蛋白质 = 肾小球过滤异常。' },
      { name: '数量概念', desc: '健康人每天形成约 150L 原尿，但只排出约 1.5L 尿液——重吸收能力惊人。' },
    ],
    Svg: NephronSvg,
  },
  {
    id: 'joint',
    name: '关节与运动',
    kicker: '专有名词 · 运动系统',
    intro: '关节是运动的"支点"：关节面、关节囊、关节腔三结构 + 骨骼肌协作，让运动灵活又牢固。',
    parts: [
      { name: '关节面（关节软骨）', desc: '相邻两骨的接触面，覆有关节软骨——减少摩擦、缓冲运动时的震动。' },
      { name: '关节囊', desc: '包绕整个关节的结缔组织膜，内外有韧带使连接更加牢固。' },
      { name: '关节腔', desc: '囊内密闭的腔隙，含滑液——润滑关节软骨，让运动更灵活。' },
      { name: '骨骼肌协作', desc: '肌肉只能牵拉骨不能推开骨：屈肘时肱二头肌收缩、肱三头肌舒张；伸肘相反。' },
      { name: '运动的发生', desc: '运动不是仅靠运动系统完成——还需要神经系统的调节和消化、呼吸、循环系统的配合供能。' },
    ],
    Svg: JointSvg,
  },
  {
    id: 'eye',
    name: '眼球与视觉',
    kicker: '专有名词 · 感觉器官',
    intro: '眼球像一台"照相机"：角膜瞳孔晶状体调光对焦，视网膜成像，视神经把信号送到大脑才"看见"。',
    parts: [
      { name: '角膜与瞳孔', desc: '光线进入眼球的第一站；瞳孔大小可调，控制进光量（强光下缩小）。' },
      { name: '晶状体（对焦）', desc: '似凸透镜，曲度由睫状体调节——看近处变凸、看远处变扁。' },
      { name: '视网膜（成像）', desc: '含感光细胞，形成倒立缩小的实像——成像≠看见。' },
      { name: '视觉形成三步', desc: '光线成像于视网膜 → 视神经传信号 → 大脑皮层视觉中枢形成视觉。' },
      { name: '近视与远视', desc: '近视：晶状体曲度过大/眼球前后径过长 → 配凹透镜；远视 → 配凸透镜。' },
    ],
    Svg: EyeSvg,
  },
  {
    id: 'sangjiPondCycle',
    name: '桑基鱼塘物质循环',
    kicker: '课外拓展 · 生态农业',
    intro: '我国传统生态农业的智慧：桑叶喂蚕、蚕沙喂鱼、塘泥肥桑——"废物"变资源，物质循环利用。',
    parts: [
      { name: '桑树（生产者）', desc: '固定的太阳能是系统总能量来源；桑叶喂蚕开启物质流动。' },
      { name: '蚕与蚕沙', desc: '蚕吃桑叶长大；蚕沙（粪便）和蚕蛹投入鱼塘喂鱼——上一环节的"废物"成了资源。' },
      { name: '鱼塘（消费者）', desc: '鱼类取食蚕沙和浮游生物；鱼粪残饵沉入塘底与微生物一起形成肥沃塘泥。' },
      { name: '塘泥还田', desc: '塘泥富含无机盐，挖出施回桑田——物质回到生产者，完成循环。' },
      { name: '核心考点', desc: '循环利用的是物质；能量单向流动逐级递减不能循环，需太阳能持续输入。' },
    ],
    extension: true,
    Svg: SangjiPondCycleSvg,
  },
  {
    id: 'angiospermLife',
    name: '被子植物的一生',
    kicker: '课外拓展 · 植物生活史',
    intro: '从一粒种子到满树果实：萌发、生长、开花、传粉受精、结果——被子植物完整的一生。',
    parts: [
      { name: '种子萌发', desc: '自身条件：胚完整有活力；外界条件：水分、适宜温度、充足空气（不需要光）。' },
      { name: '幼苗生长', desc: '胚根发育成根、胚芽发育成茎叶——营养生长阶段为开花结果积蓄养分。' },
      { name: '开花与传粉', desc: '花粉落到雌蕊柱头上（自花或异花传粉），萌发出花粉管。' },
      { name: '受精与果实', desc: '受精后子房发育成果实、胚珠发育成种子；双受精是被子植物特有的现象。' },
      { name: '一生循环', desc: '种子再萌发长成新植株——被子植物用种子度过不良环境，是最高等的植物类群。' },
    ],
    extension: true,
    Svg: AngiospermLifeSvg,
  },
  {
    id: 'waterSaltBalance',
    name: '水盐平衡调节',
    kicker: '专有名词 · 体液调节流程',
    intro: '吃咸了或缺水时，下丘脑—垂体—肾小管联动保水：抗利尿激素让尿量减少，渴觉让你主动喝水。',
    parts: [
      { name: '细胞外液渗透压升高', desc: '触发信号：吃得太咸、出汗失水等使细胞外液变"浓"——渗透压感受器正好能感知它。' },
      { name: '下丘脑（感受器 + 中枢）', desc: '水盐平衡的调节中枢：既能感受渗透压变化，又能合成抗利尿激素（由垂体释放）。' },
      { name: '抗利尿激素（ADH）', desc: '促进肾小管和集合管对水分的重吸收——尿量减少，把水"留住"。' },
      { name: '大脑皮层产生渴觉', desc: '下丘脑把信号传到大脑皮层产生渴觉，驱动主动饮水——调节中枢在下丘脑，渴觉在皮层。' },
      { name: '结果：水平衡恢复', desc: '饮水补水 + 尿量减少双管齐下，渗透压回落——负反馈维持稳态的体现。' },
    ],
    Svg: WaterSaltBalanceSvg,
  },
  {
    id: 'cellTypeCompare',
    name: '病毒/原核/真核对比',
    kicker: '专有名词 · 三列对比总表',
    intro: '一张图分清三大类：病毒没有细胞结构，原核细胞没有核膜，真核细胞有以核膜为界限的细胞核。',
    parts: [
      { name: '病毒（无细胞结构）', desc: '只由核酸（DNA 或 RNA）和蛋白质构成，必须寄生在活细胞中——它不是原核生物！' },
      { name: '原核细胞', desc: '无以核膜为界限的细胞核（只有拟核），只有核糖体一种细胞器，多数有细胞壁（支原体例外）。' },
      { name: '真核细胞', desc: '有核膜包被的细胞核和多种细胞器——动物、植物、真菌都属于真核生物。' },
      { name: '共同点', desc: '原核与真核都有细胞膜、核糖体和 DNA；病毒也有蛋白质和核酸——但"有无细胞结构"是根本区别。' },
      { name: '高频判断', desc: '蓝细菌（原核、有叶绿素但无叶绿体）、支原体（无细胞壁的原核）、病毒（不属于原核）。' },
    ],
    Svg: CellTypeCompareSvg,
  },
  {
    id: 'ginkgo',
    name: '银杏',
    kicker: '植物与繁殖 · 裸子植物',
    intro: '2 亿年前的活化石：扇形叶金黄满树，但"白果"其实是种子——种子裸露无果皮包被。',
    parts: [
      { name: '扇形叶', desc: '叶脉二叉分枝，秋天满树金黄——银杏最易辨认的特征。' },
      { name: '雌雄异株', desc: '雄树产花粉（风媒），雌树胚珠裸露——"公孙树"生长极慢。' },
      { name: '白果 = 种子', desc: '种子由胚珠发育而来，外有硬壳，无果皮包被——所以银杏是裸子植物，白果不是果实！' },
      { name: '活化石', desc: '2 亿年前已存在，野生种群稀少，被称为"植物界大熊猫"。' },
    ],
    Svg: GinkgoSvg,
  },
  {
    id: 'cactus',
    name: '仙人掌',
    kicker: '植物与繁殖 · 旱生适应',
    intro: '干旱环境的"储水罐"：叶特化成刺、肉质茎储水兼光合、根系广而浅——一套极致的保水方案。',
    parts: [
      { name: '叶 → 刺', desc: '叶特化成刺，大幅减少蒸腾面积，兼作防御动物取食。' },
      { name: '肉质茎', desc: '储水兼进行光合作用（代替叶的功能）——绿色肥厚的茎是"储水罐"。' },
      { name: '根系广而浅', desc: '雨后快速吸收地表水——沙漠降雨短暂，浅根才能抓住机会。' },
      { name: '气孔夜间开放', desc: 'CAM 途径（课外拓展）：白天关闭气孔保水，夜里储 CO2 供白天光合。' },
    ],
    Svg: CactusSvg,
  },
  {
    id: 'penicillium',
    name: '青霉菌',
    kicker: '微生物 · 真菌',
    intro: '多细胞真菌：扫帚状分生孢子梗极具辨识度——弗莱明由此发现人类第一种抗生素"青霉素"。',
    parts: [
      { name: '菌丝体', desc: '多细胞真菌，菌丝深入基质吸收营养——异养腐生。' },
      { name: '分生孢子梗（扫帚状）', desc: '顶端反复分枝呈扫帚状，串生分生孢子——青霉属的鉴定特征。' },
      { name: '分生孢子', desc: '随气流传播，遇适宜环境萌发成新菌丝体。' },
      { name: '青霉素的发现', desc: '弗莱明：青霉菌污染葡萄球菌培养皿，周围出现溶菌圈——"意外+敏锐"成就诺贝尔奖。' },
      { name: '抗菌原理', desc: '抑制细菌细胞壁（肽聚糖）合成→细菌涨裂；人体细胞无细胞壁，故对人体细胞无害。' },
    ],
    Svg: PenicilliumSvg,
  },
  {
    id: 'kelp',
    name: '海带',
    kicker: '微生物 · 大型褐藻',
    intro: '大型褐藻：固着器、柄、叶状体——看起来有"根茎叶"，其实都不是真正的根茎叶。',
    parts: [
      { name: '固着器（假根）', desc: '只起固着作用，不吸收水分和无机盐——与真正植物的根有本质区别。' },
      { name: '柄', desc: '连接固着器与带片的"茎状"结构，无输导组织。' },
      { name: '叶状体（带片）', desc: '含叶绿素和藻褐素，进行光合作用；是食用和提碘、提取褐藻胶的主要部位。' },
      { name: '孢子生殖', desc: '叶状体表面产生孢子囊，放出游动孢子——不产生种子。' },
      { name: '易错', desc: '"海带是植物有根茎叶"是典型错误——它的固着器、柄、叶状体都不是真正的根茎叶。' },
    ],
    Svg: KelpSvg,
  },
  {
    id: 'bat',
    name: '蝙蝠',
    kicker: '动物世界 · 会飞的哺乳动物',
    intro: '唯一真正会飞的哺乳动物：前肢指骨撑起翼膜，靠回声定位夜间捕食——"活体声呐"。',
    parts: [
      { name: '翼膜', desc: '前肢指骨极度延长撑起皮膜——"手指"特长是飞行关键，与鸟类的羽毛翼完全不同。' },
      { name: '回声定位', desc: '发出超声波，靠回声判断障碍物和猎物位置——仿生学中雷达灵感的来源之一。' },
      { name: '哺乳动物特征不变', desc: '胎生、哺乳、恒温——会飞也不改变它是哺乳动物的分类地位。' },
      { name: '易错', desc: '会飞≠鸟类：鸟有羽毛，蝙蝠翼是皮膜；蝙蝠还会垂直爬行、倒挂休息。' },
    ],
    extension: true,
    Svg: BatSvg,
  },
  {
    id: 'platypus',
    name: '鸭嘴兽',
    kicker: '动物世界 · 哺乳动物活化石',
    intro: '卵生却哺乳的"缝合怪"：鸭形喙、河狸尾、会游泳打洞——哺乳动物起源于爬行类的活证据。',
    parts: [
      { name: '鸭形喙', desc: '前肢特化的宽喙，表面有电感受器可感知猎物肌肉的电信号——水下"闭眼"捕食。' },
      { name: '卵生却哺乳', desc: '产卵孵化，但幼崽舔食母兽腹部沟槽渗出的乳汁——哺乳动物的核心特征它都有。' },
      { name: '进化证据', desc: '卵生+哺乳的"中间状态"证明哺乳动物由爬行动物进化而来——活化石的科学价值。' },
      { name: '雄性有毒距', desc: '后肢有毒距可刺伤天敌——少数有毒的哺乳动物之一。' },
    ],
    extension: true,
    Svg: PlatypusSvg,
  },
  {
    id: 'rhizobium',
    name: '根瘤菌共生固氮',
    kicker: '特色生物 · 互利共生',
    intro: '住在豆科植物根瘤里的"固氮工厂"：把空气中的氮气变成植物能用的氨，换得植物的有机物——互利共生的经典例子。',
    parts: [
      { name: '根瘤（共生结构）', desc: '根瘤菌侵入豆科植物根部后，刺激根细胞分裂形成的"小房子"——菌住在里面固氮。' },
      { name: '根瘤菌', desc: '杆状原核生物——它能固氮靠的是固氮酶，这是植物自己做不到的。' },
      { name: '共生固氮', desc: '把空气中的 N₂ 还原为 NH₃ 供植物合成氨基酸；植物则提供有机物和缺氧环境（固氮酶怕氧）。' },
      { name: '互利共生', desc: '双方受益、彼此依赖、分开都活不好——与"寄生"（只一方受益）对比记忆。' },
      { name: '对比记忆', desc: '根瘤菌（共生固氮·异养）≠ 硝化细菌（化能合成·自养）≠ 圆褐固氮菌（自生固氮）；种豆肥田。' },
    ],
    Svg: RhizobiumSvg,
  },
  {
    id: 'cellCyclePie',
    name: '细胞周期扇形图',
    kicker: '专有名词 · 细胞分裂过程',
    intro: '连续分裂细胞的"时间表"：分裂间期占 90%~95%（DNA 复制在这里），分裂期只占一小角。',
    parts: [
      { name: '细胞周期', desc: '连续分裂的细胞，从一次分裂完成时开始，到下一次分裂完成时为止——前提是"连续分裂"。' },
      { name: '分裂间期（G1·S·G2）', desc: '约占 90%~95%：G1 合成蛋白质，S 期进行 DNA 复制（2C→4C），G2 再合成蛋白质。' },
      { name: 'S 期最关键', desc: 'DNA 复制就发生在 S 期——诱变剂杀癌细胞常选在它"复制 DNA"的时候下手。' },
      { name: '分裂期（M 期）', desc: '前→中→后→末，仅占 5%~10%，但遗传物质平均分配就在这几步完成。' },
      { name: '适用范围', desc: '只有连续分裂的细胞才有细胞周期；高度分化的细胞（神经细胞等）没有细胞周期。' },
    ],
    Svg: CellCyclePieSvg,
  },
  {
    id: 'earthworm',
    name: '蚯蚓',
    kicker: '动物世界 · 环节动物',
    intro: '一节一节的"土壤工程师"：靠体节和刚毛运动，没有专门的呼吸器官，全靠湿润体壁交换气体。',
    parts: [
      { name: '体节', desc: '身体由许多相似体节构成——环节动物的核心特征，配合肌肉收缩蠕动前进。' },
      { name: '环带（生殖带）', desc: '靠近前端的粗大环状结构，与生殖有关——据此可分辨蚯蚓的前后端。' },
      { name: '刚毛', desc: '每节体壁上的小硬毛，钉住土壤辅助运动（与肌肉配合一收一放）。' },
      { name: '湿润体壁呼吸', desc: '没有专门的呼吸器官：氧气溶解在体壁黏液中渗入毛细血管——所以雨后常见蚯蚓钻出地面（水中缺氧）。' },
      { name: '分解者角色', desc: '取食落叶等腐殖质，排出的粪便改良土壤——达尔文称其为"最有价值的动物"。' },
    ],
    Svg: EarthwormSvg,
  },
  {
    id: 'locust',
    name: '蝗虫',
    kicker: '动物世界 · 节肢动物',
    intro: '头胸腹三部分的经典节肢动物：外骨骼防蒸发、气管通过气门呼吸、后足发达善跳跃——不完全变态发育。',
    parts: [
      { name: '外骨骼', desc: '坚硬"盔甲"：保护内部器官、防止体内水分蒸发（陆生动物的关鍵适应）；不能随身体长大，需定期蜕皮。' },
      { name: '头胸腹分部', desc: '头部感觉与取食（触角、复眼、口器）；胸部是运动中心（三对足两对翅）；腹部集中内脏。' },
      { name: '气门与气管', desc: '胸部和腹部两侧的气门是气体进出门户，气体沿气管直接送到组织细胞——蝗虫的呼吸系统不经过血液。' },
      { name: '三对足两对翅', desc: '后足腿节粗大善于跳跃；前翅革质保护、后翅膜质飞行。' },
      { name: '不完全变态', desc: '卵 → 若虫（形态像成虫但无翅、生殖器官未成熟）→ 成虫；与家蚕的完全变态（多蛹期）对比是高频题。' },
    ],
    Svg: LocustSvg,
  },
  {
    id: 'fish',
    name: '鲫鱼',
    kicker: '动物世界 · 鱼类',
    intro: '水中生活的代表：鳃呼吸、鳍游泳、侧线感知水流——一整套与水环境相适应的结构。',
    parts: [
      { name: '鳃（呼吸）', desc: '鳃丝密布毛细血管；水从口入、经鳃流出，气体交换后氧气进入血液。观察鱼"吞水吐水"就是在呼吸。' },
      { name: '鳍（运动）', desc: '尾鳍提供前进动力并控制方向；背鳍、胸鳍、腹鳍维持平衡——"鳍是鱼的运动器官"。' },
      { name: '侧线', desc: '身体两侧的点状线，能感知水流方向和速度——鱼群转向不碰撞的秘密。' },
      { name: '鳞片与黏液', desc: '保护身体并减小游泳阻力。' },
      { name: '鳔', desc: '调节身体密度，控制上浮下潜（不一定每个考点都讲，但常与"沉浮"一起出现）。' },
    ],
    Svg: FishSvg,
  },
  {
    id: 'frogMetamorphosis',
    name: '青蛙的变态发育',
    kicker: '动物世界 · 两栖动物',
    intro: '水中受精、水中生活起步：蝌蚪用鳃呼吸、成蛙用肺加皮肤呼吸——幼体与成体差别巨大的变态发育。',
    parts: [
      { name: '受精卵', desc: '春夏在水中抱对，体外受精；卵外有胶质膜保护。' },
      { name: '蝌蚪', desc: '像小鱼：用鳃呼吸、靠尾游泳——此时完全水生。' },
      { name: '幼蛙（变态中）', desc: '先长后肢再长前肢，尾逐渐被吸收，肺开始发育。' },
      { name: '成蛙', desc: '主要用肺呼吸，皮肤裸露湿润可辅助呼吸；可以水陆两栖生活。' },
      { name: '生殖离不开水', desc: '卵无壳、体外受精、幼体必须在水中发育——两栖类分布受限制的根本原因（考点）。' },
    ],
    Svg: FrogMetamorphosisSvg,
  },
  {
    id: 'pigeon',
    name: '家鸽',
    kicker: '动物世界 · 鸟类',
    intro: '全身都是"飞行装备"：流线型体形、中空骨骼、发达胸肌牵动两翼，气囊辅助肺完成独特的双重呼吸。',
    parts: [
      { name: '流线型体形与覆羽', desc: '体表被覆羽毛，身体呈流线型，减小飞行阻力。' },
      { name: '发达的胸肌', desc: '附着在龙骨突上，收缩有力地牵动两翼扇动——飞行的主要动力来源。' },
      { name: '气囊与双重呼吸', desc: '气囊与肺相通：每呼吸一次，空气两次经过肺、两次气体交换——满足飞行时的巨大耗氧（气囊本身不进行气体交换）。' },
      { name: '中空骨骼', desc: '长骨中空、内充空气——减轻体重；直肠很短，粪便随时排出，不存储加重负担。' },
      { name: '体温恒定', desc: '良好的产热散热结构使体温恒定——增强对环境的适应能力（变温动物 vs 恒温动物对比）。' },
    ],
    Svg: PigeonSvg,
  },
  {
    id: 'mossFern',
    name: '苔藓与蕨类',
    kicker: '植物与繁殖 · 孢子植物对比',
    intro: '都不结种子、用孢子繁殖：苔藓矮小有假根，蕨类有真根和输导组织——受精都离不开水，只能住在阴湿处。',
    parts: [
      { name: '苔藓：假根', desc: '只起固着作用、不能吸水——吸水主要靠叶。' },
      { name: '苔藓：叶只一层细胞', desc: '对二氧化硫等污染气体非常敏感，是监测空气污染程度的指示植物。' },
      { name: '蕨类：真根与输导组织', desc: '有真正的根、茎、叶，体内有输导组织，植株明显高大（如肾蕨、满江红）。' },
      { name: '孢子繁殖', desc: '苔藓的孢蒴、蕨类叶背的孢子囊群——都不产生种子（与种子植物的根本区别）。' },
      { name: '煤的来历', desc: '古代蕨类植物被埋藏地下，经漫长年代变成煤——"蕨类与煤"是常考背景。' },
    ],
    Svg: MossFernSvg,
  },
];
