'use client';

import { useRef, useState } from 'react';

import { ExperimentPane, ObservationNote, SceneBox } from '@/components/lab/control-slider';
import { LabReference, type LabReferenceSection } from '@/components/lab/lab-reference';

const REFERENCE: LabReferenceSection[] = [
  {
    title: '实验原理（模型）',
    lines: [
      <>反射弧五环节：<span className="font-semibold">感受器 → 传入神经 → 神经中枢 → 传出神经 → 效应器</span>。反射的发生必须依赖完整的反射弧。</>,
      <>膝跳反射的<span className="font-semibold">感受器在髌韧带</span>（股四头肌腱），叩击牵拉感受器，效应器是股四头肌——它只有传入、传出两个神经元，是最简单的反射之一。</>,
      <>缩手反射的中枢在脊髓，但痛觉在大脑皮层形成：脊髓在完成反射的同时把信号上行传到大脑。</>,
    ],
  },
  {
    title: '模型变量',
    lines: [
      <>叩击位置：髌韧带（正确刺激）/ 髌骨 / 胫骨（无效刺激）。</>,
      <>反射弧放大图：叩击成功后五个环节依次亮起，模拟兴奋传导方向。</>,
      <>判断题：三个场景各判断"是否经过大脑皮层"。</>,
    ],
  },
  {
    title: '方法步骤（模型操作）',
    lines: [
      <>① 选择叩击位置：只有敲中髌韧带小腿才会弹起，对照另外两个位置的"无反应"。</>,
      <>② 小腿弹起时观察右侧反射弧五环节的点亮顺序。</>,
      <>③ 完成五环节排序与三道判断题，集齐两个 ✅。</>,
    ],
  },
  {
    title: '注意事项·考点',
    lines: [
      <>反射弧任何一环受损，反射都不能完成（如脊髓损伤者膝跳反射消失）。</>,
      <>膝跳反射、缩手反射的中枢都在<span className="font-semibold">脊髓</span>，"感觉"才在大脑皮层——先缩手后觉得痛正是这个原因。</>,
      <>效应器不是肌肉本身，而是"传出神经末梢 + 它支配的肌肉或腺体"。</>,
    ],
  },
];

const ARC_ORDER = ['感受器', '传入神经', '神经中枢', '传出神经', '效应器'];

type TapSite = 'ligament' | 'kneecap' | 'shin';
const TAP_SITES: Record<TapSite, { label: string; works: boolean; note: string }> = {
  ligament: { label: '叩击髌韧带', works: true, note: '牵拉股四头肌腱中的感受器 → 小腿前踢' },
  kneecap: { label: '叩击髌骨', works: false, note: '髌骨是骨性结构，没有感受器，叩击不会引发反射' },
  shin: { label: '叩击胫骨', works: false, note: '刺激落在效应器一侧的骨面，未牵拉感受器，无反射' },
};

type ScenarioId = 'withdraw' | 'pain' | 'knee';
const SCENARIOS: Record<ScenarioId, { label: string; answer: 'yes' | 'no' }> = {
  withdraw: { label: '手指被针刺后迅速缩手', answer: 'no' },
  pain: { label: '缩手之后感到疼痛', answer: 'yes' },
  knee: { label: '叩击髌韧带小腿弹起', answer: 'no' },
};

function cnChip(active: boolean) {
  return `min-h-10 rounded-md border px-3 text-xs font-semibold transition-colors ${
    active
      ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
      : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
  }`;
}

export function ReflexArcLab() {
  const [tapped, setTapped] = useState<TapSite | null>(null);
  const [kicked, setKicked] = useState(false);
  const kickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [orderWrong, setOrderWrong] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<ScenarioId, 'yes' | 'no' | null>>({
    withdraw: null,
    pain: null,
    knee: null,
  });

  const orderDone = order.length === ARC_ORDER.length;
  const quizDone = (Object.values(answers) as ('yes' | 'no' | null)[]).every((a) => a != null);
  const quizAllCorrect = quizDone && (Object.keys(SCENARIOS) as ScenarioId[]).every((id) => answers[id] === SCENARIOS[id].answer);
  const allDone = orderDone && quizAllCorrect;

  const tap = (site: TapSite) => {
    setTapped(site);
    if (kickTimer.current) clearTimeout(kickTimer.current);
    if (TAP_SITES[site].works) {
      setKicked(true);
      kickTimer.current = setTimeout(() => setKicked(false), 900);
    } else {
      setKicked(false);
    }
  };

  const pickOrder = (name: string) => {
    if (orderDone) return;
    const expected = ARC_ORDER[order.length];
    if (name === expected) {
      setOrder((prev) => [...prev, name]);
      setOrderWrong(null);
    } else {
      setOrderWrong(name);
      setTimeout(() => setOrderWrong(null), 500);
    }
  };

  const answer = (id: ScenarioId, choice: 'yes' | 'no') => {
    setAnswers((prev) => ({ ...prev, [id]: choice }));
  };

  const reset = () => {
    setTapped(null);
    setKicked(false);
    setOrder([]);
    setOrderWrong(null);
    setAnswers({ withdraw: null, pain: null, knee: null });
  };

  // 反射弧五个节点（右侧放大图）
  const nodes = ARC_ORDER.map((name, i) => ({
    name,
    x: 342,
    y: 62 + i * 44,
  }));

  const observation = (() => {
    if (!tapped) return '选择一个叩击位置试试：为什么只有其中一个位置能让小腿弹起来？';
    if (!TAP_SITES[tapped].works) return `${TAP_SITES[tapped].note}。反射的发生需要刺激感受器——换成叩击髌韧带再看。`;
    let extra = '';
    if (orderDone) extra += '排序正确：兴奋沿反射弧单向传导。';
    else extra += `再完成反射弧排序（已完成 ${order.length}/5）。`;
    if (quizAllCorrect) extra += '判断题全对——脊髓完成反射，大脑皮层形成感觉。';
    return `叩击髌韧带 → 感受器被牵拉 → 小腿前踢，这就是膝跳反射。${extra}`;
  })();

  return (
    <div className="space-y-4">
      <ExperimentPane
        controls={
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">① 选择叩击位置</p>
              <div className="grid gap-1.5">
                {(Object.keys(TAP_SITES) as TapSite[]).map((site) => (
                  <button
                    key={site}
                    type="button"
                    onClick={() => tap(site)}
                    aria-pressed={tapped === site}
                    className={`${cnChip(tapped === site)} w-full text-left`}
                  >
                    {TAP_SITES[site].label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">
                ② 按传导方向点选反射弧（{order.length}/5）
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ARC_ORDER.map((name) => {
                  const placed = order.includes(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => pickOrder(name)}
                      disabled={placed}
                      className={`${cnChip(orderDone && placed)} disabled:cursor-default disabled:opacity-55 ${
                        orderWrong === name ? 'bio-shake border-[#e0a3a3] text-[#b0483a]' : ''
                      }`}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
              {orderWrong ? <p className="mt-1.5 text-xs text-[#b0483a]">顺序不对——回忆兴奋在反射弧上的单向传导。</p> : null}
              {orderDone ? <p className="mt-1.5 text-xs font-medium text-[#2f7a4d]">✅ 五环节排序正确</p> : null}
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-[#37585f]">
                ③ 该过程经过大脑皮层吗？（{quizDone ? '✅' : '0'}3）
              </p>
              <div className="grid gap-2">
                {(Object.keys(SCENARIOS) as ScenarioId[]).map((id) => {
                  const cur = answers[id];
                  const correct = cur === SCENARIOS[id].answer;
                  return (
                    <div key={id} className="rounded-md border border-[#e2eeec] bg-white px-2.5 py-2">
                      <p className="text-xs text-[#37585f]">{SCENARIOS[id].label}</p>
                      <div className="mt-1.5 flex gap-1.5">
                        {(['yes', 'no'] as const).map((choice) => {
                          const chosen = cur === choice;
                          const reveal = cur != null;
                          const good = choice === SCENARIOS[id].answer;
                          return (
                            <button
                              key={choice}
                              type="button"
                              onClick={() => answer(id, choice)}
                              aria-pressed={chosen}
                              className={`min-h-9 flex-1 rounded-md border px-2 text-xs font-semibold transition-colors ${
                                reveal
                                  ? good
                                    ? 'border-[#9fcab2] bg-[#e7f5ec] text-[#2f7a4d]'
                                    : chosen
                                      ? 'border-[#e0a3a3] bg-[#fbecea] text-[#b0483a]'
                                      : 'border-[#e5eff0] bg-white text-[#8aa1a6]'
                                  : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
                              }`}
                            >
                              {choice === 'yes' ? '经过' : '不经过'}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={reset}
              className="min-h-9 w-full rounded-md border border-[#cbdede] bg-white px-3 text-xs font-medium text-[#366169] transition-colors hover:bg-[#eef7f7]"
            >
              重置模型
            </button>
            <div className="rounded-md bg-[#eef7f6] px-3 py-2.5 text-xs leading-5 text-[#4b6c73]">
              {allDone ? '🎉 反射弧全部互动完成！' : `完成排序 ✅ / 判断题 ${quizDone ? '✅' : '…'}`}
            </div>
          </>
        }
      >
        <SceneBox label="膝跳反射（左）与反射弧放大图（右）" heightClass="h-[330px]">
          <svg className="h-full w-full" viewBox="0 0 440 300" aria-hidden="true">
            {/* 坐姿腿部示意 */}
            <g>
              <rect x="34" y="150" width="170" height="34" rx="17" fill="#e8c9a8" stroke="#b58a5f" strokeWidth="3" />
              <text x="60" y="173" fontSize="14" fill="#7a5a38" fontWeight="600">大腿</text>
              {/* 小腿：绕膝关节旋转 */}
              <g
                style={{
                  transformOrigin: '204px 167px',
                  transform: kicked ? 'rotate(-58deg)' : 'rotate(0deg)',
                  transition: 'transform 0.28s ease-out',
                }}
              >
                <rect x="187" y="167" width="32" height="104" rx="16" fill="#f0d6b8" stroke="#b58a5f" strokeWidth="3" />
                <rect x="176" y="262" width="52" height="18" rx="9" fill="#c98a4a" stroke="#9a6430" strokeWidth="2.5" />
              </g>
              {/* 膝关节 + 三个叩击位置 */}
              <circle cx="204" cy="167" r="5" fill="#b58a5f" />
              <g>
                <circle
                  cx="204" cy="152" r="9"
                  fill={tapped === 'ligament' ? '#0e6f75' : '#eef7f6'}
                  stroke="#0e6f75" strokeWidth="2.5"
                  style={{ cursor: 'pointer' }}
                  onClick={() => tap('ligament')}
                />
                <text x="216" y="148" fontSize="14" fill="#0e6f75" fontWeight="600">髌韧带（感受器）</text>
                <circle
                  cx="196" cy="136" r="7"
                  fill={tapped === 'kneecap' ? '#b0483a' : '#f7f1ea'}
                  stroke="#b0483a" strokeWidth="2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => tap('kneecap')}
                />
                <text x="206" y="126" fontSize="13" fill="#a86a5a">髌骨</text>
                <circle
                  cx="200" cy="216" r="7"
                  fill={tapped === 'shin' ? '#b0483a' : '#f7f1ea'}
                  stroke="#b0483a" strokeWidth="2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => tap('shin')}
                />
                <text x="152" y="238" fontSize="13" fill="#a86a5a">胫骨</text>
              </g>
              {/* 叩诊锤 */}
              <g
                style={{
                  transformOrigin: '262px 108px',
                  transform: tapped ? 'rotate(-34deg)' : 'rotate(0deg)',
                  transition: 'transform 0.16s ease-in',
                }}
              >
                <line x1="262" y1="108" x2="216" y2="140" stroke="#7a8a8f" strokeWidth="5" strokeLinecap="round" />
                <path d="M204 132 L222 150 L214 160 L196 142 Z" fill="#5f7076" stroke="#3d4a4f" strokeWidth="2" />
              </g>
            </g>

            {/* 右侧：反射弧五环节 */}
            <rect x="300" y="34" width="126" height="236" rx="10" fill="#f4fafa" stroke="#cfe0e0" strokeWidth="2" />
            <text x="363" y="24" textAnchor="middle" fontSize="14" fill="#2c6e94" fontWeight="700">脊髓反射弧</text>
            {nodes.map((n, i) => {
              const lit = kicked ? true : order.includes(n.name);
              return (
                <g key={n.name} style={{ opacity: lit ? 1 : 0.5, transition: kicked ? `opacity 0.2s ease ${i * 0.12}s` : 'opacity 0.2s ease' }}>
                  {i < nodes.length - 1 ? (
                    <line x1={n.x + 12} y1={n.y + 8} x2={n.x + 12} y2={n.y + 36} stroke="#8aa1a6" strokeWidth="2.5" markerEnd="url(#rflx-arrow)" />
                  ) : null}
                  <circle cx={n.x} cy={n.y} r="10" fill={lit ? '#0e6f75' : '#dcebea'} stroke="#0e6f75" strokeWidth="2.5" />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="13" fill={lit ? '#ffffff' : '#5f8a94'} fontWeight="700">{i + 1}</text>
                  <text x={n.x - 20} y={n.y + 5} textAnchor="end" fontSize="14" fill="#173b42" fontWeight="600">{n.name}</text>
                </g>
              );
            })}
            <defs>
              <marker id="rflx-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0 0 L8 4 L0 8 Z" fill="#8aa1a6" />
              </marker>
            </defs>
            {/* 小腿弹起幅度标注 */}
            {kicked ? (
              <g>
                <path d="M226 150 Q 258 108 246 62" fill="none" stroke="#0e6f75" strokeWidth="2" strokeDasharray="5 4" />
                <text x="252" y="58" fontSize="14" fill="#0e6f75" fontWeight="700">小腿前踢！</text>
              </g>
            ) : null}
          </svg>
        </SceneBox>

        <ObservationNote>{observation}</ObservationNote>
      </ExperimentPane>

      <LabReference items={REFERENCE} />
    </div>
  );
}
