'use client';

import type { ComponentType } from 'react';
import { dim, type ArtProps } from '@/components/cells/art-shared';

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

export const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {
  cytoskeleton: { Svg: CytoskeletonSvg },
  photosyntheticPigments: { Svg: PhotosyntheticPigmentsSvg },
  secretoryProtein: { Svg: SecretoryProteinSvg },
  atpMolecule: { Svg: AtpSvg },
  enzymeModel: { Svg: EnzymeModelSvg },
};
