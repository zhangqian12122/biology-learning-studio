# -*- coding: utf-8 -*-
# 插入 2 个课外拓展标本 SVG + 注册条目 + 分类
p = 'components/cells/specimens.tsx'
lines = open(p, encoding='utf-8').readlines()
marker = next(i for i, l in enumerate(lines) if '数据汇总' in l)
new = """/* ================= 桑基鱼塘物质循环（课外拓展） ================= */

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

/* ================= 数据汇总 ================= */
"""
lines[marker:marker] = [new]
open(p, 'w', encoding='utf-8').write(''.join(lines))
print('inserted svg ok')

s = open(p, encoding='utf-8').read()
anchor = "    Svg: ThreeDefenseLinesSvg,\n  },"
add = """    Svg: ThreeDefenseLinesSvg,
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
  },"""
assert anchor in s, 'SPECIMENS anchor missing'
s = s.replace(anchor, add, 1)

old1 = "'euglena', 'cellTypeCompare']"
new1 = "'euglena', 'cellTypeCompare', 'sangjiPondCycle']"
assert old1 in s, 'cat1 missing'
s = s.replace(old1, new1)

old2 = "'cornReproduction', 'fruitAndSeed']"
new2 = "'cornReproduction', 'fruitAndSeed', 'angiospermLife']"
assert old2 in s, 'cat2 missing'
s = s.replace(old2, new2)

open(p, 'w', encoding='utf-8').write(s)
print('registered specimens OK')
