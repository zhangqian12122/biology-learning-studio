'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（净光合 = 总光合 − 呼吸）',
    lines: [
      <>植物同时进行<span className="font-semibold">光合作用</span>（制造有机物）与<span className="font-semibold">细胞呼吸</span>（消耗有机物）。</>
      ,
      <>净光合（表观光合）= 总光合（真光合）− 呼吸消耗：<span className="font-semibold">只有"净光合"的剩余量</span>才能让植物生长。</>
      ,
      <>测量方法：密闭容器中测定 O₂ 释放量或 CO₂ 吸收量——测到的是<span className="font-semibold">净</span>值；要算"真光合"必须加上呼吸消耗。</>
      ,
    ],
  },
  {
    title: '昼夜变化规律',
    lines: [
      <>白天：光合强于呼吸 → <span className="font-semibold">释放 O₂、吸收 CO₂</span>（净光合为正）。</>
      ,
      <>夜晚：只进行呼吸 → <span className="font-semibold">吸收 O₂、释放 CO₂</span>（净光合为负值）。</>
      ,
      <>中午高温强光：气孔关闭 → CO₂ 不足 → 净光合短暂下降（"光合午休"）。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>一昼夜有机物<span className="font-semibold">能否积累</span>：看白天净光合"正"的量是否大于夜间呼吸消耗的量。</>
      ,
      <>实验中测到的气体变化是<span className="font-semibold">净值</span>（表观光合）——解读数据时务必区分"总光合"与"净光合"。</>
      ,
      <>应用：温室夜间适当<span className="font-semibold">降温</span>可减弱呼吸消耗（减少有机物流失）——提高产量。</>
      ,
    ],
  },
];

export function NetPhotosynthesisLab() {
  const [light, setLight] = useState(true);
  const [net, setNet] = useState(6);
  const [total, setTotal] = useState(10);

  const observation = (() => {
    if (light)
      return `光照下：总光合速率 10 单位/h，呼吸消耗 4 单位/h——净光合 = +6 单位/h，植物正在积累有机物。夜晚没有光，总光合变 0、只剩呼吸——想象昼夜 24 小时的账本怎么算。`;
    return `黑暗中：光合停止，只剩呼吸消耗 4 单位/h——净交换为 -4 单位/h（释放 CO₂、吸收 O₂）。这就是为什么温室夜间适当降温可以"省粮"。`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">光照条件</p>
              <div className="grid gap-1.5">
                <button
                  type="button"
                  onClick={() => { setLight(true); setTotal(10); setNet(6); }}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${light ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'}`}
                >
                  光照下（总光合 10 · 呼吸 4 → 净 +6）
                </button>
                <button
                  type="button"
                  onClick={() => { setLight(false); setTotal(0); setNet(-4); }}
                  className={`min-h-10 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${!light ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]' : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'}`}
                >
                  黑暗中（总光合 0 · 呼吸 4 → 净 -4）
                </button>
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              净光合 = 总光合 − 呼吸
              <br />
              当前：<span className="font-semibold text-[#0e6f75]">{net >= 0 ? '+' : ''}{net}</span> 单位/h
            </div>
          </>
        }
      >
        <SceneBox label="总光合 · 呼吸 · 净光合的「收支账」" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 260" aria-hidden="true">
            {/* 零线 */}
            <line x1="40" y1="130" x2="400" y2="130" stroke="#8a9a9f" strokeWidth="1.6" />
            <text x="36" y="134" textAnchor="end" fontSize="9" fill="#8a9a9f">0</text>
            {/* 白天柱 */}
            <g>
              <rect x="70" y="50" width="120" height="80" rx="6" fill="#8ac86a" stroke="#3f7f3a" strokeWidth="2" />
              <text x="130" y="42" textAnchor="middle" fontSize="10" fill="#3f7f3a" fontWeight="700">总光合 10</text>
              <rect x="70" y="130" width="120" height="32" rx="6" fill="#e8a08a" stroke="#a54838" strokeWidth="2" />
              <text x="130" y="178" textAnchor="middle" fontSize="10" fill="#a53030" fontWeight="700">呼吸 4</text>
              <text x="130" y="200" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">白天：净 +6</text>
            </g>
            {/* 夜晚柱 */}
            <g>
              <rect x="250" y="130" width="120" height="32" rx="6" fill="#e8a08a" stroke="#a54838" strokeWidth="2" />
              <text x="310" y="122" textAnchor="middle" fontSize="10" fill="#a53030" fontWeight="700">呼吸 4</text>
              <text x="310" y="182" textAnchor="middle" fontSize="10" fill="#2c5a84" fontWeight="700">夜晚：净 -4</text>
            </g>
            {/* 说明 */}
            <text x="220" y="226" textAnchor="middle" fontSize="10.5" fill="#799398">有机物积累 = 白天净光合"正"的部分 − 夜间呼吸"负"的部分</text>
            <text x="220" y="246" textAnchor="middle" fontSize="10" fill="#799398">温室夜间适当降温 → 呼吸减弱 → 有机物消耗少 → 增产</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
