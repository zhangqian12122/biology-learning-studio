'use client';

import type { ComponentType } from 'react';
import { dim, type ArtProps } from '@/components/cells/art-shared';

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

export const ART: Record<string, { Svg: ComponentType<ArtProps>; Stage3d?: ComponentType<ArtProps>; StageWebGL?: ComponentType<ArtProps> }> = {
  bloodSugarSources: { Svg: BloodSugarSourcesSvg },
  humoralImmunity: { Svg: HumoralImmunitySvg },
  tissueCultureStages: { Svg: TissueCultureStagesSvg },
  pcrStages: { Svg: PcrStagesSvg },
  mitosisStages: { Svg: MitosisStagesSvg },
  meiosisStages: { Svg: MeiosisStagesSvg },
  fertilization: { Svg: FertilizationSvg },
  carbonCycle: { Svg: CarbonCycleSvg },
  aerobicRespiration: { Svg: AerobicRespirationSvg },
  artificialPollination: { Svg: ArtificialPollinationSvg },
  photosynthesisProcess: { Svg: PhotosynthesisProcessSvg },
  centralDogma: { Svg: CentralDogmaSvg },
  osmosisSetup: { Svg: OsmosisSetupSvg },
  nervePotential: { Svg: NervePotentialSvg },
  divisionCurve: { Svg: DivisionCurveSvg },
  sangjiPondCycle: { Svg: SangjiPondCycleSvg },
  waterSaltBalance: { Svg: WaterSaltBalanceSvg },
  cellCyclePie: { Svg: CellCyclePieSvg },
};
