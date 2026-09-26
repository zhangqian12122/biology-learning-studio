# -*- coding: utf-8 -*-
"""扫描图鉴标本与实验组件中「含具体数字/单位」的表述，生成人工审核清单。"""
import io, os, re, glob

NUM_UNIT = re.compile(r'\d+(?:\.\d+)?\s*(?:%|°C|℃|mm|cm|m\b|km|kg|g\b|mg|mL|L\b|mol|kcal|千卡|卡|万|亿|倍|年|个月|月\b|天|日\b|小时|分钟|分钟|秒|米|公里|岁|次|对|条|个染色体|号)')

def sentences(text):
    # 按中英文句读切分，保留可读片段
    for seg in re.split(r'[。；;！!？?\n]', text):
        seg = seg.strip().lstrip('·-—• ')
        if seg and NUM_UNIT.search(seg) and len(seg) >= 4:
            yield seg

out = []
out.append('# 内容审核清单（自动扫描：含具体数字/单位的表述）\n')
out.append('> 生成时间：2026-09-26。请人工核对以下数值类表述是否与教材/权威来源一致；')
out.append('> 核对无误的行可打勾，有误的直接在源文件中修正（文件:行号 已标注）。\n')

total = 0

# ---------- 图鉴标本 ----------
out.append('\n## 一、图鉴标本（components/cells/specimens.tsx）\n')
s = io.open('components/cells/specimens.tsx', encoding='utf-8').read()
lines = s.split('\n')
cur_id = ''
count = 0
for i, line in enumerate(lines, 1):
    m = re.match(r"\s+id: '([a-zA-Z0-9]+)',", line)
    if m:
        cur_id = m.group(1)
        continue
    for field in ('intro', 'desc'):
        fm = re.search(field + r": '(.+)',?$", line.strip())
        if fm:
            for seg in sentences(fm.group(1)):
                count += 1
                out.append(f"- [ ] **{cur_id}**（L{i}）{seg}")
out.append(f'\n小计：{count} 条\n')
total += count

# ---------- 实验组件 ----------
out.append('\n## 二、互动实验（components/lab/*-lab.tsx）\n')
count = 0
for path in sorted(glob.glob('components/lab/*-lab.tsx')):
    name = os.path.basename(path)
    text = io.open(path, encoding='utf-8').read()
    hits = []
    for i, line in enumerate(text.split('\n'), 1):
        # 抓 JSX 文本行与模板字符串里的中文叙述
        if 'className' in line or 'keyframes' in line or line.strip().startswith('//'):
            continue
        for seg in sentences(line):
            if re.search(r'[\u4e00-\u9fff]', seg):
                hits.append((i, seg))
    if hits:
        out.append(f'\n### {name}\n')
        for i, seg in hits:
            count += 1
            out.append(f'- [ ] （L{i}）{seg}')
out.append(f'\n小计：{count} 条\n')
total += count

out.append(f'\n---\n总计 {total} 条待核。建议优先核对：具体生理数值（体温/血压/血糖等）、百分比、年代与「唯一/第一/之最」类断言。\n')

with io.open('CONTENT-REVIEW.md', 'w', encoding='utf-8', newline='') as f:
    f.write('\n'.join(out))
print('written CONTENT-REVIEW.md, total items:', total)
