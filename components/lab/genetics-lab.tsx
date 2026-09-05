'use client';

import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

import { ExperimentPane, ObservationNote } from '@/components/lab/control-slider';
import { createSeededRandom } from '@/components/lab/random';

const CROSS_OPTIONS = [
  {
    id: 'Aa-x-Aa',
    label: 'Aa × Aa',
    parents: ['Aa', 'Aa'],
    note: '杂合子相互杂交，后代表型比接近 3:1，这是基因分离定律的经典比例。',
  },
  {
    id: 'Aa-x-aa',
    label: 'Aa × aa',
    parents: ['Aa', 'aa'],
    note: '测交：杂合子与隐性纯合子杂交，后代显隐性约为 1:1，可用于判断显性个体的基因型。',
  },
  {
    id: 'AA-x-Aa',
    label: 'AA × Aa',
    parents: ['AA', 'Aa'],
    note: '显性纯合子无论与谁杂交，后代都表现显性性状，不发生性状分离。',
  },
  {
    id: 'aa-x-aa',
    label: 'aa × aa',
    parents: ['aa', 'aa'],
    note: '隐性纯合子相互杂交，后代全部表现隐性性状。',
  },
  {
    id: 'AaBb-x-AaBb',
    label: 'AaBb × AaBb（两对基因自由组合）',
    parents: ['AaBb', 'AaBb'],
    note: '两对等位基因位于非同源染色体上时自由组合，后代表型比接近 9:3:3:1。',
  },
] as const;

const PHENOTYPE_STYLE: Record<string, { label: string; color: string }> = {
  DD: { label: '双显性', color: '#0e797b' },
  Dr: { label: '仅 A 显性', color: '#5aa8c7' },
  rD: { label: '仅 B 显性', color: '#7f7fc7' },
  D: { label: '显性性状', color: '#0e797b' },
  r: { label: '隐性性状', color: '#c98a1d' },
  rr: { label: '双隐性', color: '#c98a1d' },
};

function gametesOf(genotype: string): string[] {
  const loci: string[][] = [];
  for (let index = 0; index < genotype.length; index += 2) {
    loci.push([genotype[index], genotype[index + 1]]);
  }
  let result: string[] = [''];
  for (const [a, b] of loci) {
    const alleles = a === b ? [a] : [a, b];
    result = alleles.flatMap((allele) => result.map((prefix) => prefix + allele));
  }
  return result;
}

function phenotypeOf(childGenotype: string): string {
  let code = '';
  for (let index = 0; index < childGenotype.length; index += 2) {
    const pair = childGenotype.slice(index, index + 2);
    code += pair.split('').some((allele) => allele === allele.toUpperCase()) ? 'D' : 'r';
  }
  return code;
}

export function GeneticsLab() {
  const [crossId, setCrossId] = useState('Aa-x-Aa');
  const [sampleRoll, setSampleRoll] = useState(1);
  const cross = CROSS_OPTIONS.find((option) => option.id === crossId) ?? CROSS_OPTIONS[0];

  const gametesP1 = gametesOf(cross.parents[0]);
  const gametesP2 = gametesOf(cross.parents[1]);
  const cells = gametesP1.flatMap((g1) => gametesP2.map((g2) => ({ g1, g2, child: g1 + g2 })));

  const sampleRandom = createSeededRandom(sampleRoll * 97 + gametesP1.length);
  const ratioCounts = new Map<string, number>();
  for (const cell of cells) {
    const code = phenotypeOf(cell.child);
    ratioCounts.set(code, (ratioCounts.get(code) ?? 0) + 1);
  }
  const ratioEntries = [...ratioCounts.entries()]
    .map(([code, count]) => [code, count / cells.length] as const)
    .sort((left, right) => right[1] - left[1]);
  const sampleCount = 14;
  const samples = Array.from({ length: sampleCount }, () => {
    let pick = sampleRandom();
    for (const [code, ratio] of ratioEntries) {
      if (pick < ratio) return code;
      pick -= ratio;
    }
    return ratioEntries[ratioEntries.length - 1][0];
  });

  const isTwoLocus = cross.parents[0].length === 4;

  return (
    <ExperimentPane
      controls={
        <>
          <div>
            <p className="mb-2 text-sm font-medium text-[#37585f]">亲本组合</p>
            <div className="grid gap-2">
              {CROSS_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setCrossId(option.id)}
                  aria-pressed={crossId === option.id}
                  className={`min-h-10 rounded-md border px-2 text-xs font-semibold transition-colors ${
                    crossId === option.id
                      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setSampleRoll((roll) => roll + 1)}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" />
            重新抽样后代
          </button>
        </>
      }
    >
      <div>
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
          Punnett 方格（列 = 父本配子，行 = 母本配子）
        </p>
        <div className="overflow-x-auto">
          <table
            key={`${crossId}-${sampleRoll}`}
            className="border-collapse text-center text-xs"
            style={{ minWidth: isTwoLocus ? 300 : 220 }}
          >
            <thead>
              <tr>
                <th className="border border-[#d5e4e5] bg-[#eef7f6] px-2 py-1.5 text-[#67858b]">
                  配子
                </th>
                {gametesP1.map((g1) => (
                  <th
                    key={g1}
                    className="border border-[#d5e4e5] bg-[#eef7f6] px-3 py-1.5 font-bold text-[#24464d]"
                  >
                    {g1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gametesP2.map((g2, rowIndex) => (
                <tr key={g2}>
                  <th className="border border-[#d5e4e5] bg-[#eef7f6] px-3 py-1.5 font-bold text-[#24464d]">
                    {g2}
                  </th>
                  {gametesP1.map((g1, colIndex) => {
                    const child = g1 + g2;
                    const code = phenotypeOf(child);
                    const style = PHENOTYPE_STYLE[code];
                    return (
                      <td
                        key={`${g1}-${g2}`}
                        className="bio-cell border border-[#d5e4e5] px-3 py-2 font-semibold"
                        style={{
                          backgroundColor: `${style.color}1f`,
                          color: style.color,
                          animationDelay: `${(rowIndex * gametesP1.length + colIndex) * 0.09}s`,
                        }}
                      >
                        {child}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
          后代抽样（{sampleCount} 个，颜色 = 表型）
        </p>
        <div key={`sample-${crossId}-${sampleRoll}`} className="flex flex-wrap gap-2">
          {samples.map((code, index) => {
            const style = PHENOTYPE_STYLE[code];
            return (
              <span
                key={index}
                className="bio-cell flex size-8 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{
                  backgroundColor: style.color,
                  animationDelay: `${index * 0.06}s`,
                }}
                title={style.label}
              />
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-[#5b777d]">
          {ratioEntries.map(([code, ratio]) => (
            <span key={code} className="inline-flex items-center gap-1.5">
              <span
                className="inline-block size-2.5 rounded-full"
                style={{ backgroundColor: PHENOTYPE_STYLE[code].color }}
              />
              {PHENOTYPE_STYLE[code].label}：{Math.round(ratio * 100)}%
            </span>
          ))}
        </div>
      </div>

      <ObservationNote>{cross.note}</ObservationNote>
    </ExperimentPane>
  );
}
