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

def remove_block(src, start_marker):
    """删除从 start_marker 的 '{' 起、到与之配对的 '}'（含）为止的整块。"""
    while True:
        m = re.search(re.escape(start_marker), src)
        if not m:
            return src
        brace_start = src.find('{', m.start())
        depth = 0
        k = brace_start
        in_str = None
        prev = ''
        while k < len(src):
            ch = src[k]
            if in_str:
                if ch == in_str and prev != '\\\\':
                    in_str = None
            elif ch in ('"', "'", '`'):
                in_str = ch
            elif ch == '{':
                depth += 1
            elif ch == '}':
                depth -= 1
                if depth == 0:
                    k += 1
                    break
            prev = ch
            k += 1
        # 连同前面残留的空白/换行一起删除
        before = src[:m.start()].rstrip()
        after = src[k:].lstrip()
        src = before + '\n\n' + after

for p in files:
    src = open(p, encoding='utf-8').read()
    src = remove_block(src, '{guided ? (')
    open(p, 'w', encoding='utf-8', newline='\n').write(src)
    print(p, 'guided blocks removed:', '{guided' not in src)
