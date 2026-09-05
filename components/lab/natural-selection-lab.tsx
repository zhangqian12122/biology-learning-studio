'use client';

import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { createSeededRandom } from '@/components/lab/random';

const GENERATIONS = 20;
const MOTH_COUNT = 14;

type Environment = 'light' | 'dark';

/** 桦尺蛾模型：黑色等位基因 D 显性；隐蔽体色生存率高，暴露体色被鸟类捕食。 */
function simulate(environment: Environment, roll: number) {
  const random = createSeededRandom(roll * 31 + (environment === 'dark' ? 7 : 3));
  let darkAlleleFrequency = 0.12;
  const survivalDark = environment === 'dark' ? 0.9 : 0.4;
  const survivalLight = environment === 'dark' ? 0.4 : 0.9;

  const series: { generation: number; darkFrequency: number }[] = [
    { generation: 0, darkFrequency: darkAlleleFrequency },
  ];

  for (let generation = 1; generation <= GENERATIONS; generation += 1) {
    // 随机交配后的基因型频率（哈迪-温伯格比例）
    const p = 1 - darkAlleleFrequency;
    const dd = p * p;
    const ddDark = 2 * p * darkAlleleFrequency;
    const dDark = darkAlleleFrequency * darkAlleleFrequency;
    // 选择后各基因型的相对数量
    const ddAfter = dd * survivalLight;
    const ddDarkAfter = ddDark * survivalDark;
    const dDarkAfter = dDark * survivalDark;
    const mean = ddAfter + ddDarkAfter + dDarkAfter;
    // 新等位基因频率（D 仅存在于杂合与显性纯合中）
    darkAlleleFrequency =
      Math.min(0.98, Math.max(0.02, (ddDarkAfter / 2 + dDarkAfter) / mean + (random() - 0.5) * 0.015));
    series.push({ generation, darkFrequency: darkAlleleFrequency });
  }
  return { series, finalFrequency: darkAlleleFrequency };
}

export function NaturalSelectionLab() {
  const [environment, setEnvironment] = useState<Environment>('light');
  const [roll, setRoll] = useState(1);

  const { series, finalFrequency } = useMemo(
    () => simulate(environment, roll),
    [environment, roll],
  );

  const darkMoths = Math.round(finalFrequency * 100);
  const mothColors = Array.from({ length: MOTH_COUNT }, (_, index) =>
    index < Math.round((finalFrequency ** 2 + 2 * finalFrequency * (1 - finalFrequency)) * MOTH_COUNT)
      ? '#3a3f46'
      : '#d8d2be',
  );

  return (
    <ExperimentPane
      controls={
        <>
          <div>
            <p className="mb-2 text-sm font-medium text-[#37585f]">环境背景（树干颜色）</p>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { key: 'light', label: '浅色地衣树干' },
                  { key: 'dark', label: '工业黑化树干' },
                ] as const
              ).map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setEnvironment(option.key)}
                  aria-pressed={environment === option.key}
                  className={`min-h-10 rounded-md border px-2 text-xs font-semibold transition-colors ${
                    environment === option.key
                      ? environment === 'dark'
                        ? 'border-[#5a6068] bg-[#3a3f46] text-white'
                        : 'border-[#b3a878] bg-[#efe9d3] text-[#6b6236]'
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
            onClick={() => setRoll((current) => current + 1)}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
          >
            重新模拟 {GENERATIONS} 代
          </button>
          <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
            初始时黑色基因频率仅 12%。体色与环境一致的蛾被鸟类捕食的概率低（生存率 0.9），暴露体色生存率仅 0.4。
          </div>
        </>
      }
    >
      <SceneBox label={`树干上的蛾群（模拟 ${GENERATIONS} 代后）`} heightClass="h-[190px]">
        <div
          className={`absolute inset-0 transition-colors duration-700 ${
            environment === 'dark' ? 'bg-[#41464d]' : 'bg-[#d9d4bc]'
          }`}
        />
        {mothColors.map((color, index) => (
          <svg
            key={`${environment}-${roll}-${index}`}
            className="absolute transition-colors duration-700"
            width="26"
            height="20"
            viewBox="0 0 26 20"
            style={{
              left: `${4 + ((index * 37) % 90)}%`,
              top: `${10 + ((index * 53) % 68)}%`,
            }}
            aria-hidden="true"
          >
            <path
              d="M13 10 L2 3 C0 2 0 8 3 12 L13 12 Z"
              fill={color}
              stroke={environment === 'dark' ? '#1d2024' : '#8a8265'}
              strokeWidth="0.6"
            />
            <path
              d="M13 10 L24 3 C26 2 26 8 23 12 L13 12 Z"
              fill={color}
              stroke={environment === 'dark' ? '#1d2024' : '#8a8265'}
              strokeWidth="0.6"
            />
            <ellipse cx="13" cy="10" rx="2" ry="5" fill={color === '#3a3f46' ? '#565d66' : '#c4b98f'} />
          </svg>
        ))}
        <p
          className={`absolute bottom-2 right-3 text-[11px] font-semibold ${
            environment === 'dark' ? 'text-[#c8cdd4]' : 'text-[#6b6236]'
          }`}
        >
          黑色型约 {darkMoths}% · 浅色型约 {100 - darkMoths}%
        </p>
      </SceneBox>

      <div>
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
          黑色基因频率随世代的变化
        </p>
        <div className="h-[200px] min-w-0 rounded-md border border-[#dceaea] bg-[#f7fbfb] px-2 py-2">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <LineChart data={series} margin={{ top: 8, right: 10, left: -14, bottom: 0 }}>
              <CartesianGrid stroke="#dfe9df" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="generation"
                tick={{ fill: '#6c858a', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: '世代',
                  position: 'insideBottom',
                  offset: -2,
                  fill: '#6c858a',
                  fontSize: 10,
                }}
              />
              <YAxis
                domain={[0, 1]}
                tick={{ fill: '#6c858a', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={46}
                tickFormatter={(value) => `${Math.round(Number(value) * 100)}%`}
              />
              <Tooltip
                formatter={(value) => [`${(Number(value) * 100).toFixed(1)}%`, '黑色基因频率']}
                contentStyle={{ fontSize: '12px', border: '1px solid #cfe2e1', borderRadius: '6px' }}
              />
              <Line
                type="monotone"
                dataKey="darkFrequency"
                stroke={environment === 'dark' ? '#3a3f46' : '#b0762c'}
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ObservationNote>
        {environment === 'dark'
          ? '工业化污染使树干变黑后，浅色型被鸟类大量捕食，黑色型逐代增多——黑色基因频率被自然选择定向改变。'
          : '地衣覆盖的浅色树干上，黑色型蛾暴露易被捕食，浅色基因保持优势。切换到“工业黑化树干”再模拟，观察频率曲线反转。'}
        由此可见：<span className="font-semibold">自然选择直接作用的是表型，改变的是种群的基因频率</span>——这才是进化的实质。
      </ObservationNote>
    </ExperimentPane>
  );
}
