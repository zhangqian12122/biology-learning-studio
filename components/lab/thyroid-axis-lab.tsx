'use client';

import { useState } from 'react';

import { ControlSlider, ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <><span className="font-semibold">分级调节</span>：下丘脑分泌促甲状腺激素释放激素（TRH）→ 垂体分泌促甲状腺激素（TSH）→ 甲状腺分泌甲状腺激素（T3/T4）。</>,
      <><span className="font-semibold">（负）反馈调节</span>：血液中 T3/T4 升高到一定程度，会反过来抑制下丘脑和垂体的分泌，使激素水平不至过高——这是维持稳态的主要机制。</>,
      <>切除甲状腺后 T3/T4 来源中断，对下丘脑、垂体的抑制解除 → TRH、TSH <span className="font-semibold">反常升高</span>。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>注入外源甲状腺激素滑块（0~100%）：模拟口服/注射 T3/T4。</>,
      <>切除甲状腺开关：腺体不再产生内源 T3/T4。</>,
      <>箭头粗细 = 对应激素的分泌水平；红色 ─ 号 = 负反馈抑制增强。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 不做任何操作，读出三个激素的基础水平，注意 TRH/TSH 的箭头最粗（有分级驱动）。</>,
      <>② 向右拖动"注入外源 T3/T4"滑块，观察下丘脑、垂体箭头如何被压细。</>,
      <>③ 打开"切除甲状腺"，再看 TSH 反常升高——临床上据此判断病变位置。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>分级调节可以<span className="font-semibold">放大</span>信号、形成多级协同；反馈调节维持激素<span className="font-semibold">相对稳定</span>（不是"不变"）。</>,
      <>给正常小鼠注射 TSH → 甲状腺激素增多；给切除垂体的小鼠 → 甲状腺萎缩，说明垂体对甲状腺的促进作用。</>,
      <>判断病变在"腺体本身"还是"上级中枢"：激素低 + 促激素高 → 腺体问题；激素低 + 促激素也低 → 中枢问题。</>,
    ],
  },
];

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function ThyroidAxisLab() {
  const [injected, setInjected] = useState(0);
  const [removed, setRemoved] = useState(false);

  // 激素水平模型：0~1
  const injectedLevel = injected / 100;
  const t4 = removed ? injectedLevel * 0.75 : clamp01(0.5 + injectedLevel * 0.5);
  const feedback = clamp01(1 - t4); // T4 越低，对上级的驱动越强
  const trh = 0.15 + 0.85 * feedback;
  const tsh = 0.1 + 0.9 * feedback;

  const pct = (v: number) => `${Math.round(v * 100)}%`;

  const observation = (() => {
    if (!removed && injected === 0) {
      return '基础状态：下丘脑→垂体→甲状腺逐级驱动（分级调节），T3/T4 维持在中等水平并对上级保持轻度抑制。先试试注入外源激素。';
    }
    if (t4 > 0.75) {
      return `T3/T4 水平 ${pct(t4)}——过高！负反馈增强，TRH 被压到 ${pct(trh)}、TSH ${pct(tsh)}。这就是"激素多了要踩刹车"。`;
    }
    if (removed) {
      return injectedLevel === 0
        ? '甲状腺已切除且未补充：T3/T4 归零，对下丘脑和垂体的抑制解除——TRH、TSH 反常升高。临床上这提示"病变在甲状腺本身"。'
        : `甲状腺已切除，靠外源激素维持 T3/T4=${pct(t4)}；TRH、TSH 仍偏高（${pct(trh)}/${pct(tsh)}），说明补充剂量还不足。`;
    }
    if (t4 < 0.35) {
      return `T3/T4 偏低（${pct(t4)}）——对上级抑制减弱，TRH、TSH 升高（${pct(trh)}/${pct(tsh)}），敦促甲状腺加把劲。`;
    }
    return `外源注入 ${injected}%：T3/T4 升到 ${pct(t4)}，负反馈把 TRH/TSH 压低到 ${pct(trh)}/${pct(tsh)}——甲状腺自己的分泌被动减少，总量仍趋于稳定。`;
  })();

  const arrowW = (v: number) => 3 + v * 9;

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <ControlSlider
              label="注入外源 T3/T4"
              value={injected}
              unit="%"
              min={0}
              max={100}
              step={10}
              accent="violet"
              onChange={setInjected}
            />
            <button
              type="button"
              onClick={() => setRemoved((v) => !v)}
              aria-pressed={removed}
              className={`${cnChip(removed)} w-full ${removed ? '' : 'border-[#b0483a] bg-[#f9e2e0] text-[#b0483a]'}`}
            >
              {removed ? '✂️ 已切除甲状腺（点击恢复）' : '⚠ 未切除（点击模拟切除）'}
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              TRH：<span className="font-bold text-[#6a4a9a]">{pct(trh)}</span>
              　TSH：<span className="font-bold text-[#2c6e94]">{pct(tsh)}</span>
              　T3/T4：<span className="font-bold text-[#b0483a]">{pct(t4)}</span>
              <br />
              状态：{removed ? '甲状腺缺位' : t4 > 0.75 ? '负反馈强抑制' : '分级调节运行中'}
            </div>
            <button
              type="button"
              onClick={() => {
                setInjected(0);
                setRemoved(false);
              }}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              重置模型
            </button>
          </>
        }
      >
        <SceneBox label="下丘脑—垂体—甲状腺轴：箭头粗细 = 激素水平" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 下丘脑 */}
            <g>
              <path d="M28 84 Q 30 52 66 50 Q 104 48 106 82 Q 106 112 66 114 Q 30 116 28 84 Z" fill="#d9c8ec" stroke="#7a4a9a" strokeWidth="3" />
              <text x="66" y="140" textAnchor="middle" fontSize="15" fill="#6a4a9a" fontWeight="700">下丘脑</text>
              <text x="66" y="158" textAnchor="middle" fontSize="14" fill="#8a6aa8">分泌 TRH</text>
            </g>
            {/* 垂体 */}
            <g>
              <ellipse cx="205" cy="80" rx="38" ry="32" fill="#b8d4ea" stroke="#3d6a94" strokeWidth="3" />
              <text x="205" y="140" textAnchor="middle" fontSize="15" fill="#2c6e94" fontWeight="700">垂体</text>
              <text x="205" y="158" textAnchor="middle" fontSize="14" fill="#4a7a9a">分泌 TSH</text>
            </g>
            {/* 甲状腺 */}
            <g style={{ opacity: removed ? 0.35 : 1, transition: 'opacity 0.3s ease' }}>
              <path d="M316 66 Q 330 48 346 64 Q 362 84 372 78 Q 396 66 404 88 Q 410 112 388 122 Q 366 130 356 112 Q 346 96 336 108 Q 322 124 306 112 Q 292 100 300 82 Q 306 68 316 66 Z" fill="#f0b8ae" stroke="#b0483a" strokeWidth="3" />
              <text x="356" y="148" textAnchor="middle" fontSize="15" fill="#b0483a" fontWeight="700">甲状腺</text>
              <text x="356" y="166" textAnchor="middle" fontSize="14" fill="#c07a6a">{removed ? '已切除' : '分泌 T3/T4'}</text>
            </g>

            {/* TRH 箭头 */}
            <line x1="112" y1="80" x2="160" y2="80" stroke="#7a4a9a" strokeWidth={arrowW(trh)} strokeLinecap="round" />
            <text x="136" y="66" textAnchor="middle" fontSize="14" fill="#6a4a9a" fontWeight="700">TRH</text>
            {/* TSH 箭头 */}
            <line x1="248" y1="80" x2="296" y2="80" stroke="#3d6a94" strokeWidth={arrowW(tsh)} strokeLinecap="round" />
            <text x="272" y="66" textAnchor="middle" fontSize="14" fill="#2c6e94" fontWeight="700">TSH</text>

            {/* T4 进血液 + 负反馈回路 */}
            <path d="M356 176 Q 356 232 220 236 Q 90 240 66 122" fill="none" stroke="#b0483a" strokeWidth={arrowW(t4)} strokeLinecap="round" strokeDasharray="10 7" />
            <text x="216" y="228" textAnchor="middle" fontSize="14" fill="#b0483a" fontWeight="700">T3/T4 进入血液（虚线回路 = 负反馈）</text>
            {/* 抑制号：随反馈强度加深 */}
            <g style={{ opacity: 0.25 + (1 - feedback) * 0.75, transition: 'opacity 0.3s ease' }}>
              <line x1="120" y1="52" x2="138" y2="52" stroke="#b0483a" strokeWidth="3.5" />
              <line x1="120" y1="46" x2="138" y2="46" stroke="#b0483a" strokeWidth="3.5" />
              <text x="152" y="52" fontSize="14" fill="#b0483a" fontWeight="700">抑制下丘脑</text>
              <line x1="256" y1="106" x2="274" y2="106" stroke="#b0483a" strokeWidth="3.5" />
              <line x1="256" y1="112" x2="274" y2="112" stroke="#b0483a" strokeWidth="3.5" />
              <text x="282" y="114" fontSize="14" fill="#b0483a" fontWeight="700">抑制垂体</text>
            </g>

            {/* 底部读数条 */}
            <g>
              {[
                { label: 'TRH', v: trh, color: '#7a4a9a', x: 34 },
                { label: 'TSH', v: tsh, color: '#3d6a94', x: 172 },
                { label: 'T3/T4', v: t4, color: '#b0483a', x: 310 },
              ].map((row) => (
                <g key={row.label}>
                  <text x={row.x} y={272} fontSize="14" fill={row.color} fontWeight="700">{row.label}</text>
                  <rect x={row.x + 58} y={260} width={90} height={13} rx="6.5" fill="#e5eff0" />
                  <rect x={row.x + 58} y={260} width={Math.max(4, row.v * 90)} height={13} rx="6.5" fill={row.color} style={{ transition: 'width 0.3s ease' }} />
                </g>
              ))}
            </g>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
