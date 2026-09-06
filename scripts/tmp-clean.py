# -*- coding: utf-8 -*-
p = 'components/cells/specimens.tsx'
s = open(p, encoding='utf-8').read()
old = """      {/* 意义框 */}
      <g style={dim(active, 3)}>
        <rect x="26" y="290" width="150" height="0" fill="none" />
      </g>
      <g style={dim(active, 3)}>
        <rect x="238" y="290" width="150" height="0" fill="none" />
      </g>
      <g style={dim(active, 3)}>
        <rect x="26" y="290" width="490" height="0" fill="none" />
      </g>
      <g style={dim(active, 3)}>
        <rect x="26" y="362" width="490" height="0" fill="none" />
      </g>
      <g style={dim(active, 2)}>
        <text x="140" y="348" textAnchor="middle" fontSize="12" fill="#5a4a2a">幼崽舔食母兽腹部沟槽渗出的乳汁（无乳头）</text>
      </g>
      {/* 意义大框 */}
      <g style={dim(active, 3)}>
        <rect x="26" y="252" width="0" height="0" fill="none" />
      </g>"""
new = """      <g style={dim(active, 2)}>
        <text x="176" y="348" textAnchor="middle" fontSize="12" fill="#5a4a2a" fontWeight="600">幼崽舔食母兽腹部沟槽渗出的乳汁（无乳头）</text>
      </g>"""
assert old in s, 'platypus junk missing'
s = s.replace(old, new)
open(p, 'w', encoding='utf-8').write(s)
print('cleaned platypus')
