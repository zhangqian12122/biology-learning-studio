# -*- coding: utf-8 -*-
import io, glob, re, os

OK = re.compile(r'(ATP|DNA|RNA|mRNA|tRNA|PCR|CRISPR|pH|CO2|O2|H2O|NADPH|Taq|IgG|IgE|T3|T4|CO|Bt|Ca|K|Na|H|Rh|N2|NH3|NO3|PrP|kPa|mmol|km)', re.I)
WHITELIST = set('from const return true false label title desc name icon text fill stroke fontsize weight width height viewbox cx cy rx ry x1 x2 y1 y2 key style class svg path line rect circle color none round bold middle end auto pointer visible hidden contact strict transparent white black red blue green yellow inset span div img src alt rel target blank href map set data aria null string number left right top bottom center overflow flex items justify gap grid cols py mt mb ml mr min max inline block absolute relative rounded border shadow opacity transition duration ease group hover active focus sm md lg xl with then default export function type props state ref effect memo children value index add count list item per and or the of in on to at is as by an be it stroke linecap fill dasharray selector dataset int parse parsefloat math abs hypot now queryselector queryselectorall getattribute addeventlistener removeevent listener'.split())
WORD = re.compile(r'(?<![A-Za-z])([A-Za-z]{3,})(?![A-Za-z])')
found = []
for path in glob.glob('components/lab/*-lab.tsx') + ['components/cells/specimens.tsx', 'components/home-client.tsx']:
    text = io.open(path, encoding='utf-8').read()
    base = os.path.basename(path)
    for i, line in enumerate(text.split('\n'), 1):
        if 'className=' in line or line.strip().startswith('//') or 'import ' in line or 'keyframes' in line or 'http' in line:
            continue
        if not re.search(r'[\u4e00-\u9fff]', line):
            continue
        for w in WORD.findall(line):
            if OK.match(w) or w.lower() in WHITELIST:
                continue
            found.append((base, i, w, line.strip()[:70]))
for f, i, w, line in found:
    print(f'{f}|L{i}|{w}|{line}')
print('total:', len(found))
