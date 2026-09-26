'use client';

import { useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（脑区分工）',
    lines: [
      <>大脑像一家"分工明确的集团公司"：<span className="font-semibold">额叶</span>管决策与随意运动、<span className="font-semibold">顶叶</span>整合躯体感觉、<span className="font-semibold">枕叶</span>处理视觉、<span className="font-semibold">颞叶</span>解析听觉与语言——各管一摊又协同作战。</>
      ,
      <>小脑像"动作质检员"：维持身体平衡、协调肌肉精细动作；<span className="font-semibold">脑干</span>是"值班室"：呼吸、心跳、血压等生命中枢 24 小时不停歇。</>
      ,
      <><span className="font-semibold">下丘脑</span>是最重要的稳态枢纽：体温调节中枢、血糖调节中枢、水盐平衡中枢都在这里，还是内分泌的"总调度"（通过垂体指挥全身腺体）。</>
    ],
  },
  {
    title: '大脑皮层的"身体地图"',
    lines: [
      <>运动皮层<span className="font-semibold">交叉控制对侧身体</span>——左侧脑区指挥右手右脚；皮层上的"小人图"是倒立的。</>
      ,
      <>皮层面积代表灵敏度：手、唇、舌占据的皮层区域特别大——盲文阅读者指尖的"皮层地盘"会随练习扩大。</>
      ,
      <>条件反射需要大脑皮层参与（对比非条件反射）——巴甫洛夫的狗建立的"铃声=食物"联系就存在皮层。</>
      ,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>考点一：<span className="font-semibold">下丘脑三大调节中枢</span>（体温·血糖·水盐）+ 合成抗利尿激素——稳态调节章节高频考点。</>
      ,
      <>考点二：<span className="font-semibold">脑干含呼吸中枢与心血管中枢</span>——"植物人"脑干完好所以能自主呼吸；脑干损伤则最危险。</>
      ,
      <>考点三：语言功能定位于大脑皮层（多数人左侧）——<span className="font-semibold">听得见却听不懂</span>提示颞叶语言区受损，与听觉器官无关。</>
      ,
    ],
  },
];

type Region = 'frontal' | 'parietal' | 'occipital' | 'temporal' | 'cerebellum' | 'brainstem' | 'hypothalamus';

const REGIONS: Record<Region, { label: string; func: string; damage: string; tip: string; color: string }> = {
  frontal: { label: '额叶', func: '随意运动指挥·决策计划·说话的"运动语言区"', damage: '手脚无力·性格大变', tip: '运动皮层像一张"倒立小人地图"', color: '#e8a05a' },
  parietal: { label: '顶叶', func: '触觉·温度·痛觉整合与空间感知', damage: '闭眼摸不出手里的东西', tip: '盲文读者指尖的皮层"地盘"会变大', color: '#e8c83a' },
  occipital: { label: '枕叶', func: '视觉信息处理（眼睛只是"摄像头"）', damage: '眼睛完好却"看不见"（皮质盲）', tip: '后脑勺被撞眼前发花——位置就在这', color: '#7ab0c9' },
  temporal: { label: '颞叶', func: '听觉解析·语言理解·记忆（海马在旁）', damage: '听得见声音却听不懂含义', tip: '耳蜗收声，颞叶"翻译"', color: '#c98ad0' },
  cerebellum: { label: '小脑', func: '平衡·动作协调·运动技能学习', damage: '醉酒步态·端不稳一碗水', tip: '学骑车=小脑在"写程序"', color: '#6ad0a8' },
  brainstem: { label: '脑干', func: '呼吸·心跳·血压生命中枢（24h 值班）', damage: '最致命——呼吸心跳可停摆', tip: '睡着不用操心呼吸=脑干在值班', color: '#d06a6a' },
  hypothalamus: { label: '下丘脑', func: '体温·血糖·水盐三大调节+内分泌总调度', damage: '体温紊乱·口渴感消失', tip: '指甲盖大小却管着全身稳态', color: '#e87a9a' },
};

const ORDER: Region[] = ['frontal', 'parietal', 'occipital', 'temporal', 'cerebellum', 'brainstem', 'hypothalamus'];

export function BrainRegionsLab() {
  const [region, setRegion] = useState<Region>('hypothalamus');
  const info = REGIONS[region];

  const observation = (() => {
    if (region === 'cerebellum')
      return `小脑——${info.func}。喝醉酒走路摇摇晃晃，就是酒精暂时"关掉"了小脑的部分协调功能。受损后果：${info.damage}。`;
    if (region === 'brainstem')
      return `脑干——${info.func}。它没有任何"高级感"，却是活下去的底线：车祸中最危险的往往是脑干损伤。受损后果：${info.damage}。`;
    if (region === 'hypothalamus')
      return `下丘脑——${info.func}。发热、口渴、饭后血糖波动……它全天候监测内环境并调兵遣将，再通过垂体指挥其他内分泌腺。受损后果：${info.damage}。`;
    return `${info.label}——${info.func}。受损后果：${info.damage}。小知识：${info.tip}。`;
  })();

  const dimRegion = (id: Region, idx: number) => ({
    opacity: region === id ? 1 : 0.35,
    transition: `opacity 0.15s ease ${idx * 0.01}s`,
  });

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">点亮一个脑区</p>
              <div className="grid gap-1.5">
                {ORDER.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setRegion(id)}
                    className={`min-h-9 rounded-md border px-3 text-left text-xs font-semibold transition-colors ${
                      region === id
                        ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
                        : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                    }`}
                  >
                    {REGIONS[id].label}
                    <span className="ml-1 font-normal text-[#799398]">· {REGIONS[id].func.split('·')[0].slice(0, 10)}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              当前脑区：<span className="text-sm font-bold text-[#0a626a]">{info.label}</span>
              <br />
              受损后果：<span className="font-semibold text-[#b0483a]">{info.damage}</span>
            </div>
          </>
        }
      >
        <SceneBox label="脑区功能地图：结构与功能各就各位" heightClass="h-[340px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 额叶 */}
            <path
              d="M132 118 Q120 150 132 186 Q142 210 168 218 L226 222 L226 74 Q170 76 146 98 Z"
              fill={info.color}
              stroke="#37585f"
              strokeWidth="2"
              style={dimRegion('frontal', 0)}
            />
            {/* 顶叶 */}
            <path
              d="M226 74 L226 128 L318 122 Q330 96 316 76 Q280 62 240 70 Z"
              fill={info.color}
              stroke="#37585f"
              strokeWidth="2"
              style={dimRegion('parietal', 1)}
            />
            {/* 枕叶 */}
            <path
              d="M318 122 L376 134 Q396 152 388 176 Q378 198 352 206 L318 206 Z"
              fill={info.color}
              stroke="#37585f"
              strokeWidth="2"
              style={dimRegion('occipital', 2)}
            />
            {/* 颞叶 */}
            <path
              d="M226 222 L318 216 Q330 190 318 128 L226 134 Q216 176 226 222 Z"
              fill={info.color}
              stroke="#37585f"
              strokeWidth="2"
              style={dimRegion('temporal', 3)}
            />
            {/* 脑回纹理 */}
            <path d="M150 110 q 20 -8 34 2 M166 150 q 22 -10 40 0 M244 96 q 20 -6 36 2 M252 160 q 24 -8 44 0 M334 148 q 16 -4 28 4" fill="none" stroke="#37585f" strokeWidth="1.6" opacity="0.5" />
            {/* 小脑 */}
            <g style={dimRegion('cerebellum', 4)}>
              <ellipse cx="348" cy="236" rx="42" ry="24" fill={info.color} stroke="#37585f" strokeWidth="2" />
              <path d="M318 232 q 30 -10 60 0 M320 244 q 28 10 56 0" fill="none" stroke="#37585f" strokeWidth="1.6" opacity="0.6" />
            </g>
            {/* 脑干 */}
            <g style={dimRegion('brainstem', 5)}>
              <path d="M262 236 L258 276 Q272 286 288 276 L282 236 Z" fill={info.color} stroke="#37585f" strokeWidth="2" />
            </g>
            {/* 下丘脑 */}
            <g style={dimRegion('hypothalamus', 6)}>
              <circle cx="252" cy="212" r="15" fill={info.color} stroke="#37585f" strokeWidth="2.4" />
            </g>
            {/* 区域标签 */}
            <text x="176" y="152" textAnchor="middle" fontSize="12.5" fill="#37585f" fontWeight="800">额叶</text>
            <text x="272" y="104" textAnchor="middle" fontSize="12.5" fill="#37585f" fontWeight="800">顶叶</text>
            <text x="354" y="168" textAnchor="middle" fontSize="12.5" fill="#37585f" fontWeight="800">枕叶</text>
            <text x="272" y="184" textAnchor="middle" fontSize="12.5" fill="#37585f" fontWeight="800">颞叶</text>
            <text x="348" y="272" textAnchor="middle" fontSize="12.5" fill="#37585f" fontWeight="800">小脑</text>
            <text x="272" y="294" textAnchor="middle" fontSize="12.5" fill="#37585f" fontWeight="800">脑干</text>
            <line x1="252" y1="198" x2="228" y2="178" stroke="#a53030" strokeWidth="1.4" strokeDasharray="3 2" />
            <text x="224" y="172" textAnchor="end" fontSize="12" fill="#a53030" fontWeight="800">下丘脑</text>
            {/* 功能卡 */}
            <rect x="20" y="40" width="86" height="236" rx="10" fill="#eef7f6" stroke="#82c6c0" strokeWidth="2" />
            <text x="63" y="66" textAnchor="middle" fontSize="12.5" fill="#0a626a" fontWeight="800">{info.label}</text>
            <foreignObject x="28" y="78" width="70" height="190">
              <div style={{ fontSize: '11px', lineHeight: '16px', color: '#37585f', fontWeight: 600 }}>
                {info.func}
                <br />
                <span style={{ color: '#b0483a' }}>受损：{info.damage}</span>
                <br />
                <span style={{ color: '#8a671b' }}>{info.tip}</span>
              </div>
            </foreignObject>
            <text x="428" y="290" textAnchor="end" fontSize="9.5" fill="#799398">点击左侧按钮切换脑区 · 大脑矢状示意</text>
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
