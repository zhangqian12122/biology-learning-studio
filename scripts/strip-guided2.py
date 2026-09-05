import re

files = [
  'components/lab/cell-membrane-prep-lab.tsx',
  'components/lab/chloroplast-streaming-lab.tsx',
  'components/lab/dna-rna-distribution-lab.tsx',
  'components/lab/cell-size-transport-lab.tsx',
  'components/lab/amylase-specificity-lab.tsx',
  'components/lab/yeast-respiration-lab.tsx',
  'components/lab/mitosis-observation-lab.tsx',
]

for p in files:
    src = open(p, encoding='utf-8').read()
    # 删除 guided 状态行
    src = re.sub(r"\s*const \[guided, setGuided\] = useState\(true\);", "", src)
    # 删除 GUIDE 数组定义（const GUIDE = [ ... ];）
    m = re.search(r"\n\s*const GUIDE = \[[\s\S]*?\n\s*\];", src)
    if m:
        src = src[:m.start()] + '\n' + src[m.end():]
    # 删除 guideDone 行
    src = re.sub(r"\n\s*const guideDone = step >= GUIDE\.length;", "", src)
    # mitosis 特有：guideStep
    src = re.sub(r"\n\s*const \[guideStep, setGuideStep\] = useState\(0\);", "", src)
    src = re.sub(r"\n\s*setGuideStep\(\(s\) => s \+ 1\);", "", src)
    open(p, 'w', encoding='utf-8', newline='\n').write(src)

print('done')
