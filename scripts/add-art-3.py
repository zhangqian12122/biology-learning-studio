# -*- coding: utf-8 -*-
"""向 3 个分片追加新标本的 SVG 组件与 ART 条目。"""
import io

SVGS = {
  'components/cells/art/cell-fate.tsx': {
    'fn': '''
function CellSenescenceSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 年轻 vs 衰老对比 */}
      <g style={dim(active, 0)}>
        <circle cx="136" cy="150" r="58" fill="#eaf6ea" stroke="#4a8a4a" strokeWidth="3" />
        <circle cx="136" cy="150" r="18" fill="#c9e8c9" stroke="#3a7a3a" strokeWidth="2" />
        <text x="136" y="234" textAnchor="middle" fontSize="12.5" fill="#2f6f2a" fontWeight="700">年轻细胞：饱满·代谢旺盛</text>
      </g>
      <g style={dim(active, 1)}>
        <path d="M330 96 q 54 10 58 56 q 4 52 -48 58 q -56 6 -60 -48 q -4 -58 50 -66 Z" fill="#f2ecd8" stroke="#8a671b" strokeWidth="3" />
        <path d="M346 138 q 24 -12 40 4 q 8 20 -10 30 q -22 10 -34 -6 q -8 -16 4 -28 Z" fill="#d8c49a" stroke="#8a671b" strokeWidth="2.2" />
        {[[326, 122], [372, 110], [378, 168], [330, 172]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill="#b08a3a" stroke="#7a5a1a" strokeWidth="1.4" />
        ))}
        <text x="336" y="240" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="700">衰老细胞：皱缩·色素（脂褐素）·核大深染</text>
      </g>
      {/* 五大特征 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="272" width="448" height="94" rx="12" fill="#fdf6e3" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="296" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">细胞衰老的五大特征（高频考点）</text>
        <text x="260" y="318" textAnchor="middle" fontSize="12" fill="#a5761d">① 水分减少，体积缩小  ② 多种酶活性降低，代谢减慢</text>
        <text x="260" y="338" textAnchor="middle" fontSize="12" fill="#a5761d">③ 色素（脂褐素）积累  ④ 细胞核增大、染色质收缩深染  ⑤ 膜通透性改变</text>
        <text x="260" y="358" textAnchor="middle" fontSize="10.5" fill="#a5761d">机制与端粒缩短、DNA 损伤累积有关（见本站"端粒"标本）</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">细胞衰老 · 五大特征（课外拓展）</text>
    </svg>
  );
}
''',
    'art': '  cellSenescence: { Svg: CellSenescenceSvg },',
  },
  'components/cells/art/viruses.tsx': {
    'fn': '''
function HbvSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* Dane 颗粒 */}
      <g style={dim(active, 0)}>
        <circle cx="180" cy="180" r="94" fill="#f2e2c9" stroke="#8a671b" strokeWidth="3.4" />
        <circle cx="180" cy="180" r="64" fill="#e8cfa0" stroke="#a5761d" strokeWidth="2.6" />
        <circle cx="180" cy="180" r="30" fill="#fdf8ea" stroke="#8a671b" strokeWidth="2.2" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          const ang = (i * Math.PI * 2) / 10;
          return <line key={i} x1={180 + Math.cos(ang) * 64} y1={180 + Math.sin(ang) * 64} x2={180 + Math.cos(ang) * 94} y2={180 + Math.sin(ang) * 94} stroke="#c9a03a" strokeWidth="3" strokeLinecap="round" />;
        })}
        <text x="180" y="186" textAnchor="middle" fontSize="11.5" fill="#8a671b" fontWeight="700">环状 DNA</text>
      </g>
      {/* 结构标注 */}
      <g style={dim(active, 1)}>
        <line x1="104" y1="130" x2="60" y2="102" stroke="#8a9a9f" strokeWidth="1.6" />
        <text x="40" y="88" fontSize="12.5" fill="#8a671b" fontWeight="700">包膜：表面抗原 HBsAg</text>
        <text x="40" y="106" fontSize="12" fill="#8a671b">"两对半"化验查的就是它</text>
        <line x1="252" y1="136" x2="300" y2="108" stroke="#8a9a9f" strokeWidth="1.6" />
        <text x="306" y="102" fontSize="12.5" fill="#a5761d" fontWeight="700">衣壳：核心抗原 HBcAg</text>
        <line x1="244" y1="230" x2="300" y2="256" stroke="#8a9a9f" strokeWidth="1.6" />
        <text x="306" y="254" fontSize="12.5" fill="#2c5a84" fontWeight="700">内部：部分双链的环状 DNA</text>
        <text x="306" y="272" fontSize="12" fill="#3a6a8a">模板链有缺口——病毒的"签名"</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">DNA 病毒：以动物细胞为宿主，婴儿感染极易慢性化——"母婴阻断"是防病关键</text>
        <text x="260" y="342" textAnchor="middle" fontSize="12" fill="#a5761d">传播：血液·母婴·性接触；疫苗（重组表面抗原）1986 年起普及——中国儿童携带率大幅下降</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">慢性乙肝可发展为肝硬化、肝癌——乙肝病毒是"致癌病毒"之一</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">乙肝病毒 · 环状 DNA 病毒（课外拓展）</text>
    </svg>
  );
}
''',
    'art': '  hbv: { Svg: HbvSvg },',
  },
  'components/cells/art/metabolism.tsx': {
    'fn': '''
function EnzymeInhibitionSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      {/* 竞争性抑制 */}
      <g style={dim(active, 0)}>
        <path d="M90 170 q 40 -46 80 -8 q 22 24 0 48 q -40 40 -80 8 q -24 -24 0 -48 Z" fill="#e8f2fa" stroke="#3a6a8a" strokeWidth="3" />
        <path d="M118 152 q 24 -10 36 12 q 8 20 -12 26 q -24 6 -32 -12 q -6 -16 8 -26 Z" fill="#c9e0ef" stroke="#3a6a8a" strokeWidth="2" />
        <rect x="196" y="120" width="58" height="26" rx="12" fill="#4ecdc4" stroke="#2a8a80" strokeWidth="2.4" transform="rotate(-12 225 133)" />
        <text x="225" y="106" textAnchor="middle" fontSize="12.5" fill="#2a8a80" fontWeight="700">抑制剂（形状相似）</text>
        <line x1="176" y1="150" x2="208" y2="136" stroke="#2a8a80" strokeWidth="1.6" />
        <text x="130" y="258" textAnchor="middle" fontSize="12.5" fill="#2a6a8a" fontWeight="700">竞争性抑制：与底物"抢座位"</text>
        <text x="130" y="278" textAnchor="middle" fontSize="12" fill="#2a6a8a">加大底物浓度可解除抑制</text>
      </g>
      {/* 非竞争性抑制 */}
      <g style={dim(active, 1)}>
        <path d="M330 170 q 40 -46 80 -8 q 22 24 0 48 q -40 40 -80 8 q -24 -24 0 -48 Z" fill="#fdf1f1" stroke="#a53030" strokeWidth="3" />
        <path d="M358 152 q 24 -10 36 12 q 8 20 -12 26 q -24 6 -32 -12 q -6 -16 8 -26 Z" fill="#f2d5d5" stroke="#a53030" strokeWidth="2" />
        <circle cx="452" cy="118" r="18" fill="#a53030" stroke="#7a1f1f" strokeWidth="2.4" />
        <text x="452" y="86" textAnchor="middle" fontSize="12.5" fill="#a53030" fontWeight="700">抑制剂（结合别处）</text>
        <line x1="438" y1="132" x2="416" y2="152" stroke="#a53030" strokeWidth="1.6" />
        <text x="370" y="258" textAnchor="middle" fontSize="12.5" fill="#a53030" fontWeight="700">非竞争性抑制：结合别处使酶"变形"</text>
        <text x="370" y="278" textAnchor="middle" fontSize="12" fill="#a53030">活性位点被破坏·加大底物也无效</text>
      </g>
      {/* 考点 */}
      <g style={dim(active, 2)}>
        <rect x="36" y="296" width="448" height="70" rx="12" fill="#fdf1cf" stroke="#8a671b" strokeWidth="2.4" />
        <text x="260" y="320" textAnchor="middle" fontSize="12.5" fill="#8a671b" fontWeight="800">应用：许多药物就是酶抑制剂——降压药抑制 ACE、青霉素抑制细菌细胞壁合成酶</text>
        <text x="260" y="342" textAnchor="middle" fontSize="12" fill="#a5761d">对比记忆：竞争性=抢活性中心（可逆·可解除）；非竞争性=变构失活（底物浓度无关）</text>
        <text x="260" y="358" textAnchor="middle" fontSize="11" fill="#a5761d">生物体自身也用抑制剂调节代谢（产物抑制）——负反馈的经典机制</text>
      </g>
      <text x="508" y="30" textAnchor="end" fontSize="12.5" fill="#799398">酶的抑制剂 · 竞争与非竞争（课外拓展）</text>
    </svg>
  );
}
''',
    'art': '  enzymeInhibition: { Svg: EnzymeInhibitionSvg },',
  },
}

for path, spec in SVGS.items():
    s = io.open(path, encoding='utf-8').read()
    marker = 'export const ART: Record<string,'
    assert marker in s, path
    s = s.replace(marker, spec['fn'] + '\n' + marker, 1)
    art_line = marker
    idx = s.index('export const ART: Record<string,')
    brace = s.index('{', idx)
    s = s[:brace + 1] + '\n' + spec['art'] + s[brace + 1:]
    with io.open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(s)
    print(path, 'appended', spec['art'].strip()[:40])
