'use client';

import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';

function enzymeActivity(temperature: number, ph: number) {
  const temperatureEffect = Math.exp(-((temperature - 37) ** 2) / 250);
  const phEffect = Math.exp(-((ph - 7) ** 2) / 4.8);
  return Math.round(Math.min(100, temperatureEffect * phEffect * 100));
}

export function EnzymeLab() {
  const [temperature, setTemperature] = useState(37);
  const [ph, setPh] = useState(7);

  const rate = enzymeActivity(temperature, ph);
  const denatured = temperature >= 62 || ph <= 3 || ph >= 11;
  // 粒子级可视化：可见底物数量与飞行速度都由当前速率驱动（PhET 模式）。
  const particleCount = Math.max(1, Math.round((rate / 100) * 6));
  const flyDuration = 4.4 - (rate / 100) * 2.6;

  const chartData = useMemo(
    () =>
      Array.from({ length: 17 }, (_, index) => {
        const value = index * 5;
        return { x: value, rate: enzymeActivity(value, ph) };
      }),
    [ph],
  );

  const stateText = denatured
    ? temperature >= 62
      ? '高温破坏酶的空间结构，酶变性失活：底物不再被催化，这种破坏不可逆。'
      : '过酸或过碱也会使酶的空间结构破坏而失活；回调 pH 后活性同样难以恢复。'
    : rate >= 85
      ? '接近最适条件，酶与底物快速结合，产物释放频率最高。'
      : '反应仍能进行，但偏离最适温度或 pH，催化效率下降。';

  return (
    <ExperimentPane
      controls={
        <>
          <ControlSlider
            label="温度"
            value={temperature}
            unit="°C"
            min={0}
            max={80}
            step={1}
            onChange={setTemperature}
          />
          <ControlSlider
            label="pH"
            value={ph}
            unit=""
            min={2}
            max={12}
            step={0.5}
            onChange={setPh}
          />
          <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
            相对反应速率
            <span className="ml-2 text-lg font-bold text-[#0e6f75]">{rate}%</span>
          </div>
        </>
      }
    >
      <SceneBox label="酶促反应现场（每个粒子代表一批底物分子）">
        <div className="absolute inset-0">
          {/* 酶分子：带缺口的球蛋白 */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
              denatured ? 'bio-denatured' : ''
            }`}
          >
            <svg width="120" height="110" viewBox="0 0 120 110" aria-hidden="true">
              <path
                d="M60 8 C90 8 112 28 112 55 C112 82 90 102 60 102 C48 102 40 99 32 93 L48 74 C52 68 52 60 48 55 C44 50 44 42 48 36 L32 17 C40 11 48 8 60 8 Z"
                fill={denatured ? '#b9a9c9' : '#2ba39a'}
                opacity="0.9"
                stroke={denatured ? '#8d7aa3' : '#1a7c76'}
                strokeWidth="3"
              />
              <text
                x="78"
                y="60"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="#ffffff"
              >
                酶
              </text>
            </svg>
            {denatured ? (
              <p className="absolute left-1/2 top-full w-32 -translate-x-1/2 text-center text-[10px] font-medium text-[#8d5a4e]">
                空间结构被破坏
              </p>
            ) : null}
          </div>

          {/* 底物 → 酶口袋 → 产物 的循环粒子 */}
          {!denatured
            ? Array.from({ length: particleCount }, (_, index) => (
                <span
                  key={`${particleCount}-${index}`}
                  className="bio-substrate absolute top-1/2 text-[13px] font-bold"
                  style={{
                    animationDuration: `${flyDuration}s`,
                    animationDelay: `${(index * flyDuration) / particleCount}s`,
                    ['--drift' as string]: `${(index % 2 === 0 ? -1 : 1) * (10 + index * 6)}px`,
                  }}
                >
                  <span className="bio-substrate-inner">底物</span>
                </span>
              ))
            : null}
          {denatured ? (
            Array.from({ length: 2 }, (_, index) => (
              <span
                key={`stuck-${index}`}
                className="bio-substrate absolute top-1/2 text-[13px] font-bold text-[#8a9aa4]"
                style={{
                  left: `${18 + index * 8}%`,
                  animationDuration: '6s',
                  animationDelay: `${index * 2.6}s`,
                  ['--drift' as string]: '0px',
                }}
              >
                <span className="bio-substrate-inner">底物</span>
              </span>
            ))
          ) : null}
        </div>
        <div className="absolute bottom-1.5 left-3 flex gap-4 text-[10px] text-[#5b777d]">
          <span className="font-semibold text-[#0e6f75]">■ 底物</span>
          <span className="font-semibold text-[#c98a1d]">■ 产物</span>
        </div>
      </SceneBox>

      <ObservationNote>{stateText}</ObservationNote>

      <div>
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
          相对反应速率曲线
        </p>
        <div className="h-[170px] min-w-0 rounded-md border border-[#dceaea] bg-[#f7fbfb] px-2 py-2">
          <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
            <AreaChart data={chartData} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="enzymeRate" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1b9a91" stopOpacity={0.34} />
                  <stop offset="100%" stopColor="#1b9a91" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#d8e9e8" strokeDasharray="4 4" vertical={false} />
              <XAxis
                type="number"
                dataKey="x"
                domain={[0, 80]}
                tickCount={9}
                tick={{ fill: '#6c858a', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: '温度（°C）',
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
                stroke="#0e797b"
                strokeWidth={2.5}
                fill="url(#enzymeRate)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-1.5 text-[11px] leading-4 text-[#799398]">
          曲线是当前 pH 下的温度-活性关系：每个温度对应一个确定的催化效率，动画中的粒子频率与之同步。
        </p>
      </div>
    </ExperimentPane>
  );
}
