'use client';

import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ControlSlider, ExperimentPane, ObservationNote } from '@/components/lab/control-slider';

const YEARS = 80;

export function PopulationGrowthLab() {
  const [carryingCapacity, setCarryingCapacity] = useState(600);
  const [initialCount, setInitialCount] = useState(20);
  const [growthRate, setGrowthRate] = useState(0.25);

  const { data, halfSaturationYear } = useMemo(() => {
    const a = (carryingCapacity - initialCount) / initialCount;
    const halfYear = Math.log(a) / growthRate;
    const series = Array.from({ length: YEARS + 1 }, (_, year) => {
      const jType = initialCount * Math.exp(growthRate * year);
      const sType = carryingCapacity / (1 + a * Math.exp(-growthRate * year));
      return {
        year,
        jType: Math.round(jType),
        sType: Math.round(sType),
      };
    }).filter((point) => point.jType <= carryingCapacity * 6);
    return { data: series, halfSaturationYear: halfYear };
  }, [carryingCapacity, growthRate, initialCount]);

  return (
    <ExperimentPane
      controls={
        <>
          <ControlSlider
            label="环境容纳量 K"
            value={carryingCapacity}
            unit="只"
            min={100}
            max={1000}
            step={50}
            accent="teal"
            onChange={setCarryingCapacity}
          />
          <ControlSlider
            label="初始数量 N₀"
            value={initialCount}
            unit="只"
            min={10}
            max={60}
            step={5}
            onChange={setInitialCount}
          />
          <ControlSlider
            label="增长率 r"
            value={growthRate}
            unit=""
            min={0.1}
            max={0.6}
            step={0.05}
            digits={2}
            accent="amber"
            onChange={setGrowthRate}
          />
          <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
            J 型：理想条件下的指数增长（虚线）；S 型：食物和空间有限时的 Logistic 增长（实线）。
          </div>
        </>
      }
    >
      <div>
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
          种群数量增长曲线（{YEARS} 年）
        </p>
        <div className="h-[300px] min-w-0 rounded-md border border-[#dceaea] bg-[#f7fbfb] px-2 py-3">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <LineChart data={data} margin={{ top: 10, right: 12, left: -6, bottom: 4 }}>
              <CartesianGrid stroke="#dfe9df" strokeDasharray="4 4" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fill: '#6c858a', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                label={{ value: '年', position: 'insideBottom', offset: -2, fill: '#6c858a', fontSize: 10 }}
              />
              <YAxis
                tick={{ fill: '#6c858a', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={44}
              />
              <Tooltip
                contentStyle={{ fontSize: '12px', border: '1px solid #cfe2e1', borderRadius: '6px' }}
                formatter={(value, name) => [`${String(value)} 只`, name === 'jType' ? 'J 型' : 'S 型']}
                labelFormatter={(label) => `第 ${String(label)} 年`}
              />
              <ReferenceLine
                y={carryingCapacity}
                stroke="#c25668"
                strokeDasharray="6 4"
                label={{ value: `K = ${carryingCapacity}`, position: 'insideTopRight', fontSize: 10, fill: '#c25668' }}
              />
              <ReferenceLine
                x={Number(halfSaturationYear.toFixed(0))}
                stroke="#c98a1d"
                strokeDasharray="6 4"
                label={{ value: 'K/2 增长最快', position: 'insideTopLeft', fontSize: 10, fill: '#8a671b' }}
              />
              <Line
                type="monotone"
                dataKey="jType"
                name="jType"
                stroke="#c98a1d"
                strokeWidth={2}
                strokeDasharray="7 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="sType"
                name="sType"
                stroke="#0e797b"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ObservationNote>
        S 型曲线中，种群数量在 <span className="font-semibold">K/2 时增长最快</span>——
        这也是渔业捕捞“捕捞后剩余量维持在 K/2 左右”的依据；
        超过 K/2 后增长放慢，最终在 K（环境容纳量）附近波动。
        J 型只在理想条件下出现，自然界中两条曲线的差距就是<span className="font-semibold">环境阻力</span>的作用。
        提高 K 值或改变 r，观察曲线如何变化。
      </ObservationNote>
    </ExperimentPane>
  );
}
