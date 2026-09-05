'use client';

import { useState } from 'react';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';

const CELL_SAP_CONCENTRATION = 10;

export function PlasmolysisLab() {
  const [outerConcentration, setOuterConcentration] = useState(10);

  const difference = CELL_SAP_CONCENTRATION - outerConcentration;
  // 外界更浓 → 失水分离（原生质体收缩）；外界更稀 → 吸水（贴壁复原）。
  const shrink = difference < 0 ? Math.min((outerConcentration - CELL_SAP_CONCENTRATION) * 2.2, 34) : 0;
  const inset = difference < 0 ? 12 + shrink : difference > 0 ? 3 : 8;
  const state = shrink > 4 ? '分离' : difference > 2 ? '复原' : '平衡';

  return (
    <ExperimentPane
      controls={
        <>
          <ControlSlider
            label="外界溶液浓度（蔗糖）"
            value={outerConcentration}
            unit="%"
            min={0}
            max={30}
            step={1}
            accent="rose"
            onChange={setOuterConcentration}
          />
          <button
            type="button"
            onClick={() => setOuterConcentration(0)}
            className="inline-flex h-9 items-center gap-2 rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
          >
            滴加清水（模拟引流复原）
          </button>
          <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
            液泡内的细胞液浓度固定为 {CELL_SAP_CONCENTRATION}%。当外界浓度更高时，细胞<span className="font-semibold">失水</span>；
            外界更稀时，细胞<span className="font-semibold">吸水</span>。
          </div>
        </>
      }
    >
      <SceneBox label="洋葱表皮细胞显微视野（紫色 = 液泡）" heightClass="h-[300px]">
        <svg className="h-full w-full" viewBox="0 0 360 220" aria-hidden="true">
          {/* 细胞壁：全透性，形状固定 */}
          <rect
            x="50"
            y="16"
            width="260"
            height="188"
            rx="14"
            fill="none"
            stroke="#6b8f5e"
            strokeWidth="5"
          />
          <text x="52" y="12" fontSize="10" fill="#5d7f52">
            细胞壁（全透）
          </text>

          {/* 原生质体：选择透过性膜包裹的整体，随水分进出伸缩 */}
          <g style={{ transition: 'all 1.4s ease' }}>
            <rect
              x={50 + inset}
              y={16 + inset}
              width={260 - inset * 2}
              height={188 - inset * 2}
              rx={Math.max(4, 14 - inset / 2)}
              fill="#dcc9ec"
              stroke="#9a6fb5"
              strokeWidth="2.5"
              style={{ transition: 'all 1.4s ease' }}
            />
            <ellipse
              cx={180}
              cy={110}
              rx={Math.max(8, 118 - inset * 1.8)}
              ry={Math.max(6, 80 - inset * 1.8)}
              fill="#a678c9"
              opacity="0.75"
              style={{ transition: 'all 1.4s ease' }}
            />
            <text
              x={180}
              y={114}
              textAnchor="middle"
              fontSize="11"
              fill="#ffffff"
              fontWeight="600"
            >
              液泡
            </text>
          </g>

          {/* 细胞核 */}
          <circle cx="258" cy="60" r="13" fill="#8a5a8f" style={{ transition: 'all 1.4s ease' }} />
          <text x="258" y="64" textAnchor="middle" fontSize="9" fill="#ffffff">
            核
          </text>

          {state === '分离' ? (
            <>
              <line x1="308" y1="110" x2="330" y2="110" stroke="#8a671b" strokeWidth="1.5" />
              <text x="312" y="106" fontSize="9" fill="#8a671b">
                间隙（外界溶液）
              </text>
            </>
          ) : null}
        </svg>
        <p className="absolute right-3 top-2 text-[11px] font-semibold text-[#8a671b]">
          状态：{state === '分离' ? '质壁分离中' : state === '复原' ? '吸水复原' : '渗透平衡'}
        </p>
      </SceneBox>

      <ObservationNote>
        {state === '分离'
          ? '外界溶液浓度高于细胞液，细胞通过渗透作用失水：原生质体与细胞壁逐渐分离（原生质层具有选择透过性，细胞壁是全透的，所以二者才会分开）。'
          : state === '复原'
            ? '外界浓度低于细胞液，细胞吸水：原生质体重新贴紧细胞壁，液泡变大、颜色变浅，质壁分离复原。'
            : '外界浓度与细胞液接近时，水分进出达到动态平衡，原生质体保持贴近细胞壁的状态。'}
        实验结论：成熟植物细胞是一个渗透系统，<span className="font-semibold">原生质层相当于半透膜</span>。
      </ObservationNote>
    </ExperimentPane>
  );
}
