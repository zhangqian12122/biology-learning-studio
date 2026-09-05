'use client';

import { useState } from 'react';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';

const THRESHOLD = -55;
const RESTING = -70;
const PEAK = 30;

type Pulse = { id: number; aboveThreshold: boolean };

export function NerveImpulseLab() {
  const [depolarizeTo, setDepolarizeTo] = useState(-70);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [lastRejected, setLastRejected] = useState(false);

  const fire = () => {
    const above = depolarizeTo >= THRESHOLD;
    setLastRejected(!above);
    setPulses((previous) => [
      ...previous.slice(-2),
      { id: (previous.at(-1)?.id ?? 0) + 1, aboveThreshold: above },
    ]);
  };

  return (
    <ExperimentPane
      controls={
        <>
          <ControlSlider
            label="刺激强度（使膜电位去极化到）"
            value={depolarizeTo}
            unit=" mV"
            min={-70}
            max={-40}
            step={1}
            accent="violet"
            onChange={(value) => {
              setDepolarizeTo(value);
              setLastRejected(false);
            }}
          />
          <button
            type="button"
            onClick={fire}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#5b64c7] px-4 text-sm font-medium text-white transition-colors hover:bg-[#4a53b3]"
          >
            施加刺激
          </button>
          <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
            静息电位 {RESTING} mV。当去极化达到<span className="font-semibold">阈电位 {THRESHOLD} mV</span>{' '}
            时才会爆发动作电位（峰值 {PEAK} mV）——这就是<span className="font-semibold">全或无</span>现象。
          </div>
          {lastRejected ? (
            <p className="rounded-md border border-[#e9b8a8] bg-[#fff2ed] px-3 py-2 text-xs font-medium text-[#9b4e39]">
              刺激未达到阈值，不产生动作电位（没有“弱一点的动作电位”）。
            </p>
          ) : null}
        </>
      }
    >
      <SceneBox label="神经纤维膜（亮区 = 反转的膜电位，向两端传导）" heightClass="h-[150px]">
        <div className="absolute inset-x-[4%] top-1/2 h-16 -translate-y-1/2 overflow-hidden rounded-lg border-2 border-[#5a8a96] bg-[#cfe4ea]">
          <div className="flex h-full items-center justify-between px-2 text-[10px] text-[#416b76]">
            <span>外</span>
            <span>轴突膜（静息：外正内负）</span>
            <span>外</span>
          </div>
          {/* 双向传导的兴奋区 */}
          {pulses
            .filter((pulse) => pulse.aboveThreshold)
            .map((pulse) => (
              <div key={pulse.id} className="absolute inset-0">
                <span className="bio-impulse-right absolute left-1/2 top-0 h-full w-[26%] bg-[#e8a53e]/80" />
                <span className="bio-impulse-left absolute left-1/2 top-0 h-full w-[26%] bg-[#e8a53e]/80" />
                <span className="bio-impulse-right absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-white/85 px-1.5 py-0.5 text-[9px] font-semibold text-[#8a671b]">
                  兴奋区（内正外负）
                </span>
              </div>
            ))}
          {/* 阈下刺激：只局部轻微去极化 */}
          {pulses
            .filter((pulse) => !pulse.aboveThreshold)
            .map((pulse) => (
              <span
                key={`fail-${pulse.id}`}
                className="bio-fail absolute left-1/2 top-0 h-full w-[10%] -translate-x-1/2 bg-[#9aa7ad]/60"
              />
            ))}
        </div>
        <span className="absolute bottom-1.5 left-3 text-[10px] text-[#5b777d]">
          刺激点（中段）
        </span>
      </SceneBox>

      <div>
        <p className="mb-2 text-xs font-semibold tracking-[0.08em] text-[#67858b]">
          一次动作电位的膜电位变化
        </p>
        <svg className="h-[150px] w-full" viewBox="0 0 400 150" aria-hidden="true">
          <line x1="30" y1="120" x2="390" y2="120" stroke="#b9cdd1" strokeWidth="1.5" />
          <line x1="30" y1="20" x2="30" y2="120" stroke="#b9cdd1" strokeWidth="1.5" />
          {/* 静息电位线 */}
          <line
            x1="30"
            y1="98"
            x2="390"
            y2="98"
            stroke="#7fa8bd"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          {/* 阈电位线 */}
          <line
            x1="30"
            y1="72"
            x2="390"
            y2="72"
            stroke="#c25668"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
          {/* 动作电位曲线 */}
          <path
            d="M30 98 L120 98 C140 98 142 72 152 72 C162 72 160 30 176 30 C192 30 190 30 200 30 C214 30 216 98 236 98 L390 98"
            fill="none"
            stroke="#5b64c7"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text x="34" y="94" fontSize="10" fill="#416b76">
            静息 {RESTING} mV
          </text>
          <text x="34" y="68" fontSize="10" fill="#c25668">
            阈电位 {THRESHOLD} mV
          </text>
          <text x="182" y="24" fontSize="10" fill="#4a5590">
            峰值 {PEAK} mV
          </text>
          <text x="200" y="136" fontSize="10" fill="#6c858a">
            时间 →
          </text>
        </svg>
      </div>

      <ObservationNote>
        刺激只有达到阈值才会触发动作电位，且一旦触发，峰值大小与刺激强度无关（全或无）；
        兴奋产生后<span className="font-semibold">在神经纤维上双向传导</span>，
        膜电位由“外正内负”暂时变为“内正外负”，随后恢复静息电位。
      </ObservationNote>
    </ExperimentPane>
  );
}
