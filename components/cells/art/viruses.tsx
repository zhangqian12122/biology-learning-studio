'use client';

import type { ComponentType } from 'react';
import { dim, type ArtProps } from '@/components/cells/art-shared';

function SarsCov2Svg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 病毒 */}
      <g style={dim(active, 0)}>
        <circle cx="240" cy="170" r="80" fill="#8a3a3a" stroke="#5a1a1a" strokeWidth="3" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          const ang = (i * 2 * Math.PI) / 10;
          const x = 240 + Math.cos(ang) * 80;
          const y = 170 + Math.sin(ang) * 80;
          return <circle key={i} cx={x} cy={y} r="9" fill="#c94a4a" stroke="#8a1a1a" strokeWidth="1.8" />;
        })}
        <text x="240" y="176" textAnchor="middle" fontSize="11" fill="#f4d0d0" fontWeight="700">+ssRNA</text>
        <text x="340" y="120" fontSize="12.5" fill="#8a1a1a" fontWeight="700">刺突蛋白 S（识 ACE2）</text>
        <text x="340" y="142" fontSize="12" fill="#8a1a1a">包膜（脂质双层·宿主膜）</text>
        <text x="340" y="164" fontSize="12" fill="#8a1a1a">单链正链 RNA（遗传）</text>
      </g>
      {/* mRNA 疫苗 */}
      <g style={dim(active, 1)}>
        <rect x="46" y="270" width="440" height="96" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="294" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">mRNA 疫苗：把"刺突蛋白的制造图纸"送入人体细胞</text>
        <text x="260" y="318" textAnchor="middle" fontSize="11.5" fill="#a5761d">人体细胞照图纸"生产"刺突蛋白 → 免疫系统识别并产生抗体与记忆细胞</text>
        <text x="260" y="344" textAnchor="middle" fontSize="11.5" fill="#a5761d">与灭活疫苗对比：mRNA 不含完整病毒·研发更快·需要"冷链"保存（RNA 易降解）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">新冠病毒 · mRNA 疫苗的"原型"（课外拓展）</text>
    </svg>
  );
}

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

export const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {
  sarsCov2: { Svg: SarsCov2Svg },
  hiv: { Svg: HivSvg },
  fluVirus: { Svg: FluVirusSvg },
  phage: { Svg: PhageSvg },
  tmv: { Svg: TmvSvg },
};
