'use client';

import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';

function photosynthesisRate(light: number, co2: number) {
  const lightEffect = 1 - Math.exp(-light / 340);
  const co2Effect = co2 / (co2 + 0.045);
  return Math.round(Math.min(100, lightEffect * co2Effect * 125));
}

export function PhotosynthesisLab() {
  const [light, setLight] = useState(650);
  const [co2, setCo2] = useState(0.08);

  const rate = photosynthesisRate(light, co2);
  const lightLimited = rate < 70 && light <= 250;
  const photonCount = Math.max(1, Math.round((light / 1000) * 7));
  const co2Count = Math.max(1, Math.round((co2 / 0.18) * 4));
  const bubbleCount = Math.max(1, Math.round((rate / 100) * 6));
  const bubbleSpeed = 3.4 - (rate / 100) * 1.8;

  const chartData = useMemo(
    () =>
      Array.from({ length: 11 }, (_, index) => {
        const value = index * 100;
        return { x: value, rate: photosynthesisRate(value, co2) };
      }),
    [co2],
  );

  const stateText = lightLimited
    ? '光是主要的限制因素：光照增强时气泡（氧气）明显变多，说明光反应加快。'
    : rate >= 85
      ? '光照与二氧化碳都较充足，光合速率接近饱和，气泡持续稳定产生。'
      : '二氧化碳是当前的主要限制因素：仅增强光照几乎不再提高速率，需要提高 CO2 浓度。';

  return (
    <ExperimentPane
      controls={
        <>
          <ControlSlider
            label="光照强度"
            value={light}
            unit="lx"
            min={0}
            max={1000}
            step={50}
            accent="amber"
            onChange={setLight}
          />
          <ControlSlider
            label="CO2 浓度"
            value={co2}
            unit="%"
            min={0.01}
            max={0.18}
            step={0.01}
            digits={2}
            onChange={setCo2}
          />
          <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
            相对光合速率
            <span className="ml-2 text-lg font-bold text-[#0e6f75]">{rate}%</span>
          </div>
        </>
      }
    >
      <SceneBox label="叶绿体光反应现场（黄点=光子，气泡=氧气）">
        <div className="absolute inset-0">
          {/* 叶绿体轮廓 */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 640 260"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <ellipse cx="320" cy="130" rx="290" ry="112" fill="#cfeacb" opacity="0.55" stroke="#7fb678" strokeWidth="3" />
            {/* 类囊体基粒堆 */}
            {[210, 290, 370, 450].map((x) => (
              <g key={x}>
                {[128, 118, 108, 98].map((y, row) => (
                  <rect
                    key={y}
                    x={x - (row % 2 ? 24 : 28)}
                    y={y}
                    width={row % 2 ? 48 : 56}
                    height="7"
                    rx="3.5"
                    fill="#57a05c"
                    opacity="0.85"
                  />
                ))}
              </g>
            ))}
            <text x="540" y="228" fontSize="17" fill="#4c7a51" fontWeight="600">
              叶绿体
            </text>
          </svg>

          {/* 光子：从顶部落下，数量 ∝ 光照 */}
          {Array.from({ length: photonCount }, (_, index) => (
            <span
              key={`p-${photonCount}-${index}`}
              className="bio-photon absolute text-[11px]"
              style={{
                left: `${12 + ((index * 76) % 76)}%`,
                animationDuration: `${2.6 - (light / 1000) * 1.1}s`,
                animationDelay: `${(index * 0.35) % 1.8}s`,
              }}
            >
              ✦
            </span>
          ))}

          {/* CO2：从左侧飘入 */}
          {Array.from({ length: co2Count }, (_, index) => (
            <span
              key={`c-${co2Count}-${index}`}
              className="bio-co2 absolute text-[10px] font-bold text-[#7b8794]"
              style={{
                top: `${28 + index * 16}%`,
                animationDuration: '5s',
                animationDelay: `${index * 1.1}s`,
              }}
            >
              CO₂
            </span>
          ))}

          {/* O2 气泡：从基粒升起，数量与速度 ∝ 速率 */}
          {Array.from({ length: bubbleCount }, (_, index) => (
            <span
              key={`b-${bubbleCount}-${index}`}
              className="bio-bubble absolute rounded-full border border-[#69b3c9] bg-[#d9f2f8]"
              style={{
                left: `${34 + index * 9}%`,
                width: 9 + (index % 3) * 4,
                height: 9 + (index % 3) * 4,
                animationDuration: `${bubbleSpeed}s`,
                animationDelay: `${(index * bubbleSpeed) / bubbleCount}s`,
              }}
            />
          ))}

          {/* 有机物产物 */}
          <div className="absolute bottom-2 right-3 flex items-center gap-1">
            <span className="text-[10px] text-[#4c7a51]">糖类</span>
            {Array.from({ length: Math.max(1, Math.round((rate / 100) * 5)) }, (_, index) => (
              <span key={index} className="inline-block size-2.5 rounded-sm bg-[#d3a13c]" />
            ))}
          </div>
        </div>
        <div className="absolute left-3 top-2 flex flex-col text-[10px] leading-4 text-[#5b777d]">
          <span className="font-semibold text-[#c9a13c]">✦ 光能</span>
          <span className="font-semibold text-[#7b8794]">CO₂ 原料</span>
        </div>
      </SceneBox>

      <ObservationNote>{stateText}</ObservationNote>

      <div>
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
          光照-速率曲线（当前 CO2 浓度下）
        </p>
        <div className="h-[170px] min-w-0 rounded-md border border-[#dceaea] bg-[#f7fbfb] px-2 py-2">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart data={chartData} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="psRate" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#57a05c" stopOpacity={0.32} />
                  <stop offset="100%" stopColor="#57a05c" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#dfe9df" strokeDasharray="4 4" vertical={false} />
              <XAxis
                type="number"
                dataKey="x"
                domain={[0, 1000]}
                tickCount={6}
                tick={{ fill: '#6c858a', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: '光照强度（lx）',
                  position: 'insideBottom',
                  offset: -2,
                  fill: '#6c858a',
                  fontSize: 10,
                }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: '#6c858a', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={34}
              />
              <Area
                type="monotone"
                dataKey="rate"
                name="相对速率"
                stroke="#4c8f52"
                strokeWidth={2.5}
                fill="url(#psRate)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-1.5 text-[11px] leading-4 text-[#799398]">
          曲线趋平的位置就是“光饱和点”：此后再增强光照，限制因素转变为 CO2 浓度等条件。
        </p>
      </div>
    </ExperimentPane>
  );
}
