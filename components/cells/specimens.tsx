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
];

/** 图鉴目录：按主题分类，供图鉴页筛选导航（56 个标本全覆盖） */
export const ATLAS_CATEGORIES: { name: string; icon: string; ids: string[] }[] = [
  { name: '细胞与膜', icon: '🧫', ids: ['animal', 'plant', 'nucleus', 'membraneModel', 'biofilmSystem', 'membraneTransport'] },
  { name: '细胞器', icon: '🔋', ids: ['chloroplast', 'mitochondrion', 'endoplasmicReticulum', 'golgi', 'ribosome', 'lysosome', 'centrosome'] },
  { name: '分子与遗传', icon: '🧬', ids: ['dnaHelix', 'rnaStrand', 'nucleotide', 'chromosome', 'karyotype'] },
  { name: '代谢与酶', icon: '⚗️', ids: ['atpMolecule', 'enzymeModel', 'secretoryProtein', 'photosyntheticPigments'] },
  { name: '细胞命运', icon: '⏳', ids: ['cellFates', 'cellDifferentiation'] },
  { name: '微生物', icon: '🦠', ids: ['cyanobacteria', 'ecoli', 'nitrobacteria', 'lactobacillus', 'mycoplasma', 'yeast', 'paramecium', 'spirogyra', 'amoeba', 'euglena', 'cellTypeCompare', 'rhizobium', 'penicillium', 'kelp', 'mushroom', 'chlamydomonas', 'bacteriaShapes'] },
  { name: '病毒', icon: '🧫', ids: ['hiv', 'fluVirus', 'phage', 'tmv'] },
  { name: '动物世界', icon: '🐾', ids: ['earthworm', 'locust', 'fish', 'frogMetamorphosis', 'pigeon', 'mussel', 'hydra', 'birdEgg', 'shrimp', 'lizard', 'starfish', 'sponge', 'rumen', 'whale', 'vertebrateClasses'] },
  { name: '人体与调节', icon: '🩺', ids: ['redBloodCell', 'neuron', 'synapse', 'antibody', 'homeostasisNetwork', 'internalEnvironment', 'thermoregulation', 'monoclonalAntibody', 'threeDefenseLines', 'bat', 'platypus', 'heartCirculation', 'nephron', 'joint', 'eye', 'vessels', 'skinStructure', 'bloodCells', 'alveolus', 'brainStructure', 'boneStructure'] },
  { name: '植物与繁殖', icon: '🌾', ids: ['stoma', 'flowerStructure', 'cornReproduction', 'fruitAndSeed', 'mossFern', 'angiospermLife', 'ginkgo', 'cactus', 'rootTip', 'leafCrossSection', 'leafBud', 'sieveTube', 'stemStructure', 'pineCone', 'rootTypes'] },
  { name: '生态', icon: '🌱', ids: ['energyPyramid', 'foodWeb', 'ageStructure', 'communityStructure', 'bioaccumulation', 'ecosystemComponents', 'evolutionTree', 'taxonomyLevel', 'biosphere', 'speciesRelations'] },
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


export const SPECIMENS: Specimen[] = [
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
    id: 'neuron',
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
    id: 'neuron',
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
    id: 'neuron',
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
    id: 'neuron',
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
    id: 'neuron',
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
    id: 'neuron',
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
    id: 'neuron',
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
    id: 'neuron',
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
    id: 'neuron',
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
    id: 'neuron',
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
