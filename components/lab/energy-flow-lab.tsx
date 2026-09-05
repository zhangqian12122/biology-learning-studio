'use client';

import { useState } from 'react';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';

const LINK_PARTICLES = 14;

type Level = { name: string; energy: number; color: string; role: string };

export function EnergyFlowLab() {
  const [producerEnergy, setProducerEnergy] = useState(5000);
  const [efficiencyFirst, setEfficiencyFirst] = useState(15);
  const [efficiencySecond, setEfficiencySecond] = useState(15);

  const e1 = producerEnergy;
  const e2 = Math.round((e1 * efficiencyFirst) / 100);
  const e3 = Math.round((e2 * efficiencySecond) / 100);
  const e4 = Math.round((e3 * efficiencySecond) / 100);
  const levels: Level[] = [
    { name: '生产者（草）', energy: e1, color: '#4c8f52', role: '第一营养级' },
    { name: '初级消费者（兔）', energy: e2, color: '#c98a1d', role: '第二营养级' },
    { name: '次级消费者（蛇）', energy: e3, color: '#c25668', role: '第三营养级' },
    { name: '三级消费者（鹰）', energy: e4, color: '#8a5a8f', role: '第四营养级' },
  ];
  const maxEnergy = e1;
  const efficiencies = [efficiencyFirst, efficiencySecond, efficiencySecond];
  const topShare = (efficiencyFirst / 100) * (efficiencySecond / 100) * (efficiencySecond / 100) * 100;

  return (
    <ExperimentPane
      controls={
        <>
          <ControlSlider
            label="生产者固定的能量"
            value={producerEnergy}
            unit="kJ"
            min={1000}
            max={10000}
            step={100}
            accent="teal"
            onChange={setProducerEnergy}
          />
          <ControlSlider
            label="第一 → 第二营养级传递效率"
            value={efficiencyFirst}
            unit="%"
            min={5}
            max={25}
            step={1}
            accent="amber"
            onChange={setEfficiencyFirst}
          />
          <ControlSlider
            label="第二 → 第三营养级传递效率"
            value={efficiencySecond}
            unit="%"
            min={5}
            max={25}
            step={1}
            accent="amber"
            onChange={setEfficiencySecond}
          />
          <div className="rounded-md bg-[#fdf3e3] px-3 py-2.5 text-xs leading-5 text-[#80621c]">
            灰色上升的粒子是<span className="font-semibold">呼吸作用散失的热能</span>——
            每个营养级同化的能量中，只有一小部分流向下一营养级。
          </div>
        </>
      }
    >
      <SceneBox label="食物链能量流动（箭头方向 = 被捕食者 → 捕食者）" heightClass="h-[430px]">
        <div className="absolute inset-x-0 top-0 bottom-0">
          {levels.map((level, index) => {
            const width = 30 + 67 * (level.energy / maxEnergy);
            return (
              <div
                key={level.name}
                className="absolute left-1/2 w-full -translate-x-1/2"
                style={{ top: `${index * 26 + 2}%` }}
              >
                <div
                  className="mx-auto flex h-11 items-center justify-between gap-2 rounded-md px-3 text-white shadow-sm transition-[width] duration-500"
                  style={{ width: `${width}%`, backgroundColor: level.color }}
                >
                  <span className="truncate text-xs font-semibold">
                    {level.role} · {level.name}
                  </span>
                  <span className="shrink-0 text-xs font-bold">{level.energy} kJ</span>
                </div>
              </div>
            );
          })}

          {/* 太阳能输入 */}
          <span className="absolute left-[6%] top-[1%] text-lg text-[#d3a13c]">☀</span>
          <span
            key="sun"
            className="bio-sun absolute left-[8%] top-[4%] size-2 rounded-full bg-[#e8b93e]"
          />

          {/* 营养级之间的能量分流粒子 */}
          {levels.slice(0, 3).map((_, linkIndex) => {
            const arrive = Math.max(1, Math.round((LINK_PARTICLES * efficiencies[linkIndex]) / 100));
            const lost = LINK_PARTICLES - arrive;
            const topPct = linkIndex * 26 + 13;
            return (
              <div
                key={`link-${linkIndex}`}
                className="pointer-events-none absolute left-1/2 h-[13%] w-full -translate-x-1/2"
                style={{ top: `${topPct}%` }}
              >
                {/* 箭头主干 */}
                <svg
                  className="absolute left-1/2 top-0 h-full -translate-x-1/2"
                  viewBox="0 0 20 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <line x1="10" y1="0" x2="10" y2="92" stroke="#7c9a96" strokeWidth="2.5" />
                  <polygon points="4,90 16,90 10,100" fill="#7c9a96" />
                </svg>
                {/* 到达下一营养级的能量粒子 */}
                {Array.from({ length: arrive }, (_, index) => (
                  <span
                    key={`a-${index}`}
                    className="bio-energy absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full bg-[#e8a53e] shadow-[0_0_6px_rgba(232,165,62,0.7)]"
                    style={{
                      animationDuration: '2.6s',
                      animationDelay: `${(linkIndex * 0.5 + index * (2.6 / arrive)) % 2.6}s`,
                    }}
                  />
                ))}
                {/* 呼吸散失的热能粒子 */}
                {Array.from({ length: lost }, (_, index) => (
                  <span
                    key={`h-${index}`}
                    className="bio-heat absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-[#9aa7ad]"
                    style={{
                      marginLeft: `${(index % 4) * 14 - 21}px`,
                      animationDuration: '2.6s',
                      animationDelay: `${(linkIndex * 0.8 + index * (2.6 / Math.max(lost, 1))) % 2.6}s`,
                      ['--drift' as string]: `${(index % 2 ? 1 : -1) * (16 + (index % 3) * 10)}px`,
                    }}
                  />
                ))}
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-1.5 left-3 flex gap-4 text-[10px] text-[#5b777d]">
          <span className="font-semibold text-[#c98a1d]">● 流向下一营养级</span>
          <span className="font-semibold text-[#8a9aa4]">● 呼吸散失（热能）</span>
        </div>
      </SceneBox>

      <ObservationNote>
        每个营养级同化的能量中，只有 {efficiencyFirst}%（第一级）与 {efficiencySecond}%（后续各级）
        流向下一级，其余大部分通过呼吸作用以热能形式散失。
        因此第四营养级获得的能量只有生产者的 {topShare >= 10 ? Math.round(topShare) : topShare.toFixed(1)}%
        ——能量流动<span className="font-semibold">逐级递减</span>，
        这就是食物链一般不超过 4–5 个营养级的原因。
      </ObservationNote>
    </ExperimentPane>
  );
}
