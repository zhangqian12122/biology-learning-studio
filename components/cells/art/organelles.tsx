'use client';

import type { ComponentType } from 'react';
import { Badge, dim, type ArtProps } from '@/components/cells/art-shared';
import { ChloroplastWebGLModel, MitochondrionWebGLModel } from '@/components/cells/organelle-webgl';
import { Chloroplast3d } from '@/components/cells/chloroplast-3d';
import { Mitochondrion3d } from '@/components/cells/mitochondrion-3d';

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

export const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {
  endosymbiosis: { Svg: EndosymbiosisSvg },
  vacuole: { Svg: VacuoleSvg },
  chloroplast: { Svg: ChloroplastSvg, Stage3d: Chloroplast3d, StageWebGL: ChloroplastWebGLModel },
  mitochondrion: { Svg: MitochondrionSvg, Stage3d: Mitochondrion3d, StageWebGL: MitochondrionWebGLModel },
  endoplasmicReticulum: { Svg: EndoplasmicReticulumSvg },
  golgi: { Svg: GolgiSvg },
  ribosome: { Svg: RibosomeSvg },
  lysosome: { Svg: LysosomeSvg },
  centrosome: { Svg: CentrosomeSvg },
};
