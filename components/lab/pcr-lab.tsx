'use client';

import { useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';

const PHASES = [
  { name: '变性', temperature: '95°C', color: '#c25668', hint: '高温使 DNA 双链氢键断裂，两条链解开为模板。' },
  { name: '退火', temperature: '55°C', color: '#5b64c7', hint: '温度降低，引物与模板链两端互补结合，为合成定位。' },
  { name: '延伸', temperature: '72°C', color: '#287248', hint: '耐高温 DNA 聚合酶从引物 3′ 端开始，沿模板合成新的子链。' },
] as const;

export function PcrLab() {
  const [cycles, setCycles] = useState(3);
  const [phase, setPhase] = useState(0);
  const [phaseKey, setPhaseKey] = useState(1);

  const copies = 2 ** cycles;
  const displayPairs = 2 ** Math.min(cycles, 4);

  const curveData = Array.from({ length: cycles + 1 }, (_, cycle) => ({
    cycle,
    copies: 2 ** cycle,
  }));

  return (
    <ExperimentPane
      controls={
        <>
          <ControlSlider
            label="循环数 n"
            value={cycles}
            unit="次"
            min={0}
            max={10}
            step={1}
            accent="violet"
            onChange={setCycles}
          />
          <div>
            <p className="mb-2 text-sm font-medium text-[#37585f]">演示一个循环的三个阶段</p>
            <div className="grid grid-cols-3 gap-2">
              {PHASES.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setPhase(index);
                    setPhaseKey((key) => key + 1);
                  }}
                  aria-pressed={phase === index}
                  className="min-h-10 rounded-md border px-1 text-xs font-semibold transition-colors"
                  style={
                    phase === index
                      ? { borderColor: item.color, backgroundColor: `${item.color}1c`, color: item.color }
                      : { borderColor: '#d9e7e7', backgroundColor: '#ffffff', color: '#537078' }
                  }
                >
                  {item.name}
                  <br />
                  <span className="text-[10px] font-normal">{item.temperature}</span>
                </button>
              ))}
            </div>
          </div>
          <div
            className="rounded-md px-3 py-2.5 text-xs leading-5"
            style={{ backgroundColor: `${PHASES[phase].color}14`, color: PHASES[phase].color }}
          >
            {PHASES[phase].hint}
          </div>
          <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
            每循环一次，DNA 数量翻一倍：n 次循环后共 2ⁿ ={' '}
            <span className="text-base font-bold text-[#0e6f75]">{copies}</span> 份。
          </div>
        </>
      }
    >
      <SceneBox
        label={`双链模板演示：${PHASES[phase].name}（${PHASES[phase].temperature}）`}
        heightClass="h-[180px]"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          {/* 上链 */}
          <div
            key={`top-${phaseKey}-${phase}`}
            className={`h-3.5 w-[72%] rounded-full ${phase === 0 ? 'bio-denature-top' : ''} ${
              phase === 1 ? 'bio-anneal' : ''
            }`}
            style={{ backgroundColor: phase === 0 ? '#2b6f8f' : phase === 1 ? '#5b64c7' : '#2b6f8f' }}
          >
            {phase >= 1 ? (
              <span className="absolute -bottom-2 left-[3%] h-2 w-[12%] rounded-sm bg-[#c25668]" />
            ) : null}
          </div>
          {/* 下链 */}
          <div
            key={`bottom-${phaseKey}-${phase}`}
            className={`relative h-3.5 w-[72%] rounded-full ${phase === 0 ? 'bio-denature-bottom' : ''}`}
            style={{ backgroundColor: phase === 0 ? '#2b6f8f' : '#2b6f8f' }}
          >
            {phase === 1 ? (
              <span className="absolute -top-2 left-[3%] h-2 w-[12%] rounded-sm bg-[#c25668]" />
            ) : null}
            {phase === 2 ? (
              <span className="bio-extend absolute inset-y-0 left-0 rounded-full bg-[#38a169]" />
            ) : null}
          </div>
          <span
            key={`label-${phaseKey}-${phase}`}
            className="bio-fade rounded-full px-3 py-1 text-[11px] font-semibold text-white"
            style={{ backgroundColor: PHASES[phase].color }}
          >
            {PHASES[phase].temperature} · {PHASES[phase].name}
          </span>
        </div>
      </SceneBox>

      <div>
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
          扩增产物（深色 = 模板链，亮色 = 新合成链；最多展示 4 个循环的直观图）
        </p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: displayPairs }, (_, index) => (
            <div
              key={`${cycles}-${index}`}
              className="bio-cell flex flex-col gap-1 rounded-md border border-[#dceaea] bg-white p-1.5"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span className="block h-1.5 w-10 rounded-full bg-[#2b6f8f]" />
              <span className="block h-1.5 w-10 rounded-full bg-[#38a169]/70" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
          拷贝数随循环数指数增长
        </p>
        <div className="h-[190px] min-w-0 rounded-md border border-[#dceaea] bg-[#f7fbfb] px-2 py-2">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <LineChart data={curveData} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
              <CartesianGrid stroke="#dfe9df" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="cycle"
                tick={{ fill: '#6c858a', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                label={{ value: '循环数', position: 'insideBottom', offset: -2, fill: '#6c858a', fontSize: 10 }}
              />
              <YAxis tick={{ fill: '#6c858a', fontSize: 10 }} tickLine={false} axisLine={false} width={40} />
              <Tooltip
                formatter={(value) => [`${String(value)} 份`, 'DNA 拷贝数']}
                labelFormatter={(label) => `第 ${label} 次循环后`}
                contentStyle={{ fontSize: '12px', border: '1px solid #cfe2e1', borderRadius: '6px' }}
              />
              <Line type="monotone" dataKey="copies" stroke="#5b64c7" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ObservationNote>
        PCR 与体内 DNA 复制原理相同：双链解开 → 引物定位 → 子链延伸，只是全过程由温度变化驱动。
        n 次循环后拷贝数为 2ⁿ，因此极少量的目的基因也能被大量扩增——这是基因工程获取目的基因的重要手段。
        调整循环数并切换三个阶段，观察链的分离、引物结合与新链延伸。
      </ObservationNote>
    </ExperimentPane>
  );
}
