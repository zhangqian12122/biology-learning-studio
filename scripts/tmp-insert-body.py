# -*- coding: utf-8 -*-
# 插入 4 张人体课文图鉴 SVG
p = 'components/cells/specimens.tsx'
lines = open(p, encoding='utf-8').readlines()
marker = next(i for i, l in enumerate(lines) if '数据汇总' in l)
new = """/* ================= 心脏与血液循环 ================= */

function HeartCirculationSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">心脏四腔：上房下室，血液定向流动（瓣膜防倒流）</text>
      {/* 左右肺 */}
      <g style={dim(active, 3)}>
        <ellipse cx="70" cy="96" rx="34" ry="46" fill="#f6b8b0" stroke="#b0483a" strokeWidth="3" />
        <ellipse cx="450" cy="96" rx="34" ry="46" fill="#f6b8b0" stroke="#b0483a" strokeWidth="3" />
        <text x="70" y="164" textAnchor="middle" fontSize="12.5" fill="#b0483a" fontWeight="600">肺（气体交换）</text>
        {/* 肺循环箭头 */}
        <path d="M104 96 Q 130 80 148 92" fill="none" stroke="#3d7e9e" strokeWidth="3.5" markerEnd="url(#hc-arrow)" />
        <path d="M416 100 Q 384 74 356 88" fill="none" stroke="#b0483a" strokeWidth="3.5" markerEnd="url(#hc-arrow)" />
        <text x="112" y="72" fontSize="12" fill="#3d7e9e" fontWeight="600">肺动脉（静脉血）</text>
        <text x="330" y="60" fontSize="12" fill="#b0483a" fontWeight="600">肺静脉（动脉血）</text>
      </g>
      {/* 心脏四腔 */}
      <g style={dim(active, 1)}>
        <path d="M200 92 L 200 250 Q 200 268 218 268 L 302 268 Q 320 268 320 250 L 320 92 Z" fill="#f6c8c0" stroke="#b0483a" strokeWidth="3.5" />
        <line x1="260" y1="92" x2="260" y2="268" stroke="#b0483a" strokeWidth="3" />
        <line x1="200" y1="184" x2="320" y2="184" stroke="#b0483a" strokeWidth="3" />
        <text x="230" y="120" textAnchor="middle" fontSize="13" fill="#7a2622" fontWeight="700">右心房</text>
        <text x="290" y="120" textAnchor="middle" fontSize="13" fill="#5a2a7a" fontWeight="700">左心房</text>
        <text x="230" y="240" textAnchor="middle" fontSize="13" fill="#7a2622" fontWeight="700">右心室</text>
        <text x="290" y="240" textAnchor="middle" fontSize="13" fill="#5a2a7a" fontWeight="700">左心室</text>
        <text x="230" y="290" textAnchor="middle" fontSize="12" fill="#8a6a6a">壁最厚（泵血到全身）</text>
      </g>
      {/* 瓣膜 */}
      <g style={dim(active, 2)}>
        <path d="M204 184 L 222 202 L 240 184" fill="none" stroke="#c98a1d" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M280 184 L 298 202 L 316 184" fill="none" stroke="#c98a1d" strokeWidth="3.5" strokeLinecap="round" />
        <text x="336" y="200" fontSize="12.5" fill="#c98a1d" fontWeight="700">房室瓣</text>
        <text x="336" y="218" fontSize="12" fill="#a58a4a">防血液倒流</text>
      </g>
      {/* 体循环箭头 */}
      <g style={dim(active, 4)}>
        <path d="M226 268 Q 210 322 130 330" fill="none" stroke="#b0483a" strokeWidth="3.5" markerEnd="url(#hc-arrow)" />
        <text x="24" y="322" fontSize="12.5" fill="#b0483a" fontWeight="700">体循环：左心室 → 全身 → 右心房</text>
        <path d="M280 92 Q 300 56 340 60" fill="none" stroke="#b0483a" strokeWidth="0" />
      </g>
      {/* 口诀 */}
      <g style={dim(active, 4)}>
        <text x="16" y="352" fontSize="12.5" fill="#59767c" fontWeight="600">口诀：上房下室 · 房连静、室连动 · 血液流动方向：静脉 → 心房 → 心室 → 动脉</text>
      </g>
      <defs>
        <marker id="hc-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
          <path d="M0 0 L9 4.5 L0 9 Z" fill="#8a671b" />
        </marker>
      </defs>
    </svg>
  );
}

/* ================= 肾单位与尿液形成 ================= */

function NephronSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">尿液形成两步：肾小球过滤（血）→ 肾小管重吸收（原尿 → 尿液）</text>
      {/* 肾小球囊 */}
      <g style={dim(active, 0)}>
        <circle cx="140" cy="140" r="56" fill="#dcebea" stroke="#3d7e9e" strokeWidth="3" />
        <circle cx="140" cy="140" r="26" fill="#b0483a" opacity="0.75" />
        <path d="M96 118 Q 140 150 184 118" fill="none" stroke="#8c231f" strokeWidth="3" />
        <text x="36" y="66" fontSize="13" fill="#7a2622" fontWeight="700">肾小球（毛细血管球）</text>
        <text x="36" y="86" fontSize="12" fill="#a05a4a">过滤：血细胞和大分子蛋白留在外面</text>
      </g>
      {/* 肾小管 */}
      <g style={dim(active, 1)}>
        <path d="M196 140 Q 260 120 300 140 Q 350 164 300 186 Q 250 210 300 232 Q 350 254 310 268" fill="none" stroke="#e8a86a" strokeWidth="11" strokeLinecap="round" />
        <text x="256" y="118" fontSize="13" fill="#b57c3a" fontWeight="700">肾小管（弯曲细管）</text>
        <text x="330" y="164" fontSize="12.5" fill="#b57c3a" fontWeight="600">重吸收：全部葡萄糖、大部分水和部分无机盐</text>
      </g>
      {/* 收集管 */}
      <g style={dim(active, 2)}>
        <rect x="316" y="252" width="60" height="76" rx="10" fill="#dcebea" stroke="#3d7e9e" strokeWidth="3" />
        <text x="346" y="292" textAnchor="middle" fontSize="12.5" fill="#1e4a68" fontWeight="700">收集管</text>
        <text x="346" y="348" textAnchor="middle" fontSize="12.5" fill="#1e4a68" fontWeight="700">→ 肾盂 → 输尿管 → 膀胱</text>
      </g>
      {/* 尿液 */}
      <g style={dim(active, 3)}>
        <ellipse cx="452" cy="290" rx="26" ry="38" fill="#f4e3b8" stroke="#c98a1d" strokeWidth="3" />
        <text x="452" y="288" textAnchor="middle" fontSize="12" fill="#8a671b" fontWeight="700">尿液</text>
        <text x="452" y="306" textAnchor="middle" fontSize="11.5" fill="#a58a4a">水·无机盐·尿素</text>
      </g>
      {/* 对比框 */}
      <g style={dim(active, 4)}>
        <rect x="26" y="56" width="180" height="40" rx="9" fill="#e7f3e2" stroke="#3f7f3a" strokeWidth="2" />
        <text x="40" y="76" fontSize="12" fill="#2f7a4d" fontWeight="600">入球：血液（含血细胞、蛋白）</text>
        <text x="40" y="92" fontSize="12" fill="#4a8a4a">出球：原尿（无血细胞和蛋白）</text>
      </g>
      <text x="16" y="356" fontSize="12.5" fill="#59767c" fontWeight="600">尿液中出现葡萄糖或蛋白质 → 可能是肾小管重吸收异常或肾小球过滤异常</text>
      <text x="508" y="378" textAnchor="end" fontSize="12.5" fill="#799398">肾单位与尿液形成模式图</text>
    </svg>
  );
}

/* ================= 关节与运动 ================= */

function JointSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">关节 = 骨与骨之间的可动连接——运动的"支点"</text>
      {/* 骨（上下两段） */}
      <g style={dim(active, 0)}>
        <path d="M200 60 L 252 60 L 252 132 Q 226 148 200 132 Z" fill="#f6f0e0" stroke="#b5953a" strokeWidth="3" />
        <path d="M200 248 L 252 248 L 252 176 Q 226 160 200 176 Z" fill="#f6f0e0" stroke="#b5953a" strokeWidth="3" />
        <text x="256" y="104" fontSize="12.5" fill="#8a6a48" fontWeight="600">骨</text>
        <text x="256" y="228" fontSize="12.5" fill="#8a6a48" fontWeight="600">骨</text>
      </g>
      {/* 关节面/软骨 */}
      <g style={dim(active, 1)}>
        <path d="M204 134 Q 226 150 248 134" fill="none" stroke="#6aa86a" strokeWidth="6" strokeLinecap="round" />
        <path d="M204 174 Q 226 158 248 174" fill="none" stroke="#6aa86a" strokeWidth="6" strokeLinecap="round" />
        <text x="330" y="148" fontSize="12.5" fill="#3f7f3a" fontWeight="700">关节软骨（减少摩擦缓冲震动）</text>
        <line x1="326" y1="150" x2="250" y2="152" stroke="#3f7f3a" strokeWidth="1.4" />
      </g>
      {/* 关节腔 */}
      <g style={dim(active, 2)}>
        <ellipse cx="226" cy="154" rx="26" ry="14" fill="#dff0f7" stroke="#3d7e9e" strokeWidth="2" />
        <text x="330" y="110" fontSize="12.5" fill="#2c6e94" fontWeight="700">关节腔（含滑液润滑）</text>
        <line x1="326" y1="112" x2="252" y2="148" stroke="#2c6e94" strokeWidth="1.4" />
      </g>
      {/* 关节囊 */}
      <g style={dim(active, 3)}>
        <path d="M188 64 Q 176 154 188 244" fill="none" stroke="#b0483a" strokeWidth="5" strokeLinecap="round" />
        <path d="M264 64 Q 276 154 264 244" fill="none" stroke="#b0483a" strokeWidth="5" strokeLinecap="round" />
        <text x="24" y="72" fontSize="12.5" fill="#b0483a" fontWeight="700">关节囊（包绕稳固）</text>
      </g>
      {/* 骨骼肌协作 */}
      <g style={dim(active, 4)}>
        <path d="M110 100 Q 140 118 174 130" fill="none" stroke="#b0483a" strokeWidth="12" strokeLinecap="round" />
        <path d="M110 210 Q 140 196 174 178" fill="none" stroke="#b0483a" strokeWidth="12" strokeLinecap="round" />
        <text x="24" y="88" fontSize="12.5" fill="#b0483a" fontWeight="700">肱二头肌（收缩）</text>
        <text x="24" y="230" fontSize="12.5" fill="#b0483a" fontWeight="700">肱三头肌（舒张）</text>
        <text x="16" y="290" fontSize="12.5" fill="#59767c" fontWeight="600">屈肘：二头肌收缩、三头肌舒张；伸肘相反——肌肉只能牵拉不能推开</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">关节与运动（以肘关节为例）模式图</text>
    </svg>
  );
}

/* ================= 眼球与视觉 ================= */

function EyeSvg({ active }: { active: number | null; open?: boolean }) {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" aria-hidden="true">
      <text x="16" y="32" fontSize="13.5" fill="#2c6e94" fontWeight="700">视觉形成：光线 → 角膜 → 瞳孔 → 晶状体 → 玻璃体 → 视网膜成像 → 视神经 → 大脑皮层</text>
      {/* 眼球轮廓 */}
      <g style={dim(active, 0)}>
        <circle cx="240" cy="190" r="130" fill="#eaf1f9" stroke="#3d6a94" strokeWidth="4" />
      </g>
      {/* 角膜与瞳孔 */}
      <g style={dim(active, 1)}>
        <path d="M370 150 Q 392 190 370 230" fill="none" stroke="#5ab8d4" strokeWidth="7" strokeLinecap="round" />
        <circle cx="352" cy="190" r="17" fill="#13333a" />
        <text x="404" y="120" fontSize="13" fill="#2c6e94" fontWeight="700">角膜（透明）</text>
        <text x="404" y="262" fontSize="13" fill="#2c6e94" fontWeight="700">瞳孔（大小可变）</text>
        <line x1="400" y1="124" x2="374" y2="148" stroke="#2c6e94" strokeWidth="1.4" />
        <line x1="400" y1="258" x2="368" y2="200" stroke="#2c6e94" strokeWidth="1.4" />
      </g>
      {/* 晶状体 */}
      <g style={dim(active, 2)}>
        <ellipse cx="322" cy="190" rx="26" ry="34" fill="#dcebea" stroke="#3d7e9e" strokeWidth="3" />
        <text x="252" y="128" fontSize="13" fill="#1e4a68" fontWeight="700">晶状体（曲度可调 = 对焦）</text>
        <line x1="286" y1="134" x2="306" y2="164" stroke="#1e4a68" strokeWidth="1.4" />
      </g>
      {/* 视网膜 */}
      <g style={dim(active, 3)}>
        <path d="M368 82 Q 288 66 196 84" fill="none" stroke="#b0483a" strokeWidth="6" strokeLinecap="round" />
        <path d="M368 298 Q 288 314 196 296" fill="none" stroke="#b0483a" strokeWidth="6" strokeLinecap="round" />
        <path d="M122 100 Q 110 190 126 280" fill="none" stroke="#b0483a" strokeWidth="6" strokeLinecap="round" />
        <text x="128" y="292" fontSize="13" fill="#b0483a" fontWeight="700">视网膜（成像 + 感光细胞）</text>
      </g>
      {/* 视神经 */}
      <g style={dim(active, 4)}>
        <circle cx="240" cy="190" r="10" fill="#f4d06a" stroke="#c98a1d" strokeWidth="2" />
        <line x1="240" y1="190" x2="128" y2="196" stroke="#c98a1d" strokeWidth="3" />
        <line x1="128" y1="196" x2="60" y2="290" stroke="#c98a1d" strokeWidth="6" strokeLinecap="round" />
        <text x="20" y="316" fontSize="12.5" fill="#c98a1d" fontWeight="700">视神经 → 大脑皮层视觉中枢</text>
      </g>
      {/* 成像说明 */}
      <g style={dim(active, 3)}>
        <text x="150" y="222" textAnchor="middle" fontSize="12" fill="#59767c" fontWeight="600">倒立的缩小的实像</text>
      </g>
      <g style={dim(active, 4)}>
        <text x="16" y="352" fontSize="12.5" fill="#59767c" fontWeight="600">易错：成像在"视网膜"，但"看见"发生在大脑皮层；近视 = 晶状体曲度过大 → 配凹透镜</text>
      </g>
      <text x="508" y="368" textAnchor="end" fontSize="12.5" fill="#799398">眼球与视觉形成模式图</text>
    </svg>
  );
}

/* ================= 数据汇总 ================= */
"""
lines[marker:marker] = [new]
open(p, 'w', encoding='utf-8').write(''.join(lines))
print('inserted svg ok')

s = open(p, encoding='utf-8').read()
anchor = "    Svg: AngiospermLifeSvg,\n  },"
add = """    Svg: AngiospermLifeSvg,
  },
  {
    id: 'heartCirculation',
    name: '心脏与血液循环',
    kicker: '专有名词 · 循环系统',
    intro: '心脏是血液循环的"泵"：四腔结构（左右心房、左右心室）保证动脉血和静脉血完全分流。',
    parts: [
      { name: '四腔结构', desc: '左心房、左心室、右心房、右心室——同侧房室相通，左右被完整隔开不相通。' },
      { name: '瓣膜防倒流', desc: '房室瓣和动脉瓣保证血液只能：心房→心室→动脉，不能倒流。' },
      { name: '体循环', desc: '左心室 → 全身毛细血管 → 右心房：给组织细胞送去氧气和养料，带走废物。' },
      { name: '肺循环', desc: '右心室 → 肺部毛细血管 → 左心房：排出 CO2、获得 O2（静脉血变动脉血）。' },
      { name: '心壁厚薄', desc: '左心室壁最厚——要把血液泵到全身（路程最长）；心房壁最薄。' },
    ],
    Svg: HeartCirculationSvg,
  },
  {
    id: 'nephron',
    name: '肾单位与尿液形成',
    kicker: '专有名词 · 泌尿系统',
    intro: '每个肾脏约含 100 万个肾单位：肾小球过滤血液形成原尿，肾小管重吸收有用物质形成尿液。',
    parts: [
      { name: '肾小球的过滤作用', desc: '血液流经肾小球时，除血细胞和大分子蛋白质外，水、无机盐、葡萄糖、尿素过滤到肾小囊形成原尿。' },
      { name: '肾小管的重吸收作用', desc: '原尿流经肾小管时：全部葡萄糖、大部分水和部分无机盐被重新吸收回血液。' },
      { name: '尿液成分', desc: '水、无机盐、尿素——原尿中剩下的废物和水。' },
      { name: '尿糖与蛋白尿', desc: '尿中出现葡萄糖 = 肾小管重吸收异常（或糖尿病）；出现蛋白质 = 肾小球过滤异常。' },
      { name: '数量概念', desc: '健康人每天形成约 150L 原尿，但只排出约 1.5L 尿液——重吸收能力惊人。' },
    ],
    Svg: NephronSvg,
  },
  {
    id: 'joint',
    name: '关节与运动',
    kicker: '专有名词 · 运动系统',
    intro: '关节是运动的"支点"：关节面、关节囊、关节腔三结构 + 骨骼肌协作，让运动灵活又牢固。',
    parts: [
      { name: '关节面（关节软骨）', desc: '相邻两骨的接触面，覆有关节软骨——减少摩擦、缓冲运动时的震动。' },
      { name: '关节囊', desc: '包绕整个关节的结缔组织膜，内外有韧带使连接更加牢固。' },
      { name: '关节腔', desc: '囊内密闭的腔隙，含滑液——润滑关节软骨，让运动更灵活。' },
      { name: '骨骼肌协作', desc: '肌肉只能牵拉骨不能推开骨：屈肘时肱二头肌收缩、肱三头肌舒张；伸肘相反。' },
      { name: '运动的发生', desc: '运动不是仅靠运动系统完成——还需要神经系统的调节和消化、呼吸、循环系统的配合供能。' },
    ],
    Svg: JointSvg,
  },
  {
    id: 'eye',
    name: '眼球与视觉',
    kicker: '专有名词 · 感觉器官',
    intro: '眼球像一台"照相机"：角膜瞳孔晶状体调光对焦，视网膜成像，视神经把信号送到大脑才"看见"。',
    parts: [
      { name: '角膜与瞳孔', desc: '光线进入眼球的第一站；瞳孔大小可调，控制进光量（强光下缩小）。' },
      { name: '晶状体（对焦）', desc: '似凸透镜，曲度由睫状体调节——看近处变凸、看远处变扁。' },
      { name: '视网膜（成像）', desc: '含感光细胞，形成倒立缩小的实像——成像≠看见。' },
      { name: '视觉形成三步', desc: '光线成像于视网膜 → 视神经传信号 → 大脑皮层视觉中枢形成视觉。' },
      { name: '近视与远视', desc: '近视：晶状体曲度过大/眼球前后径过长 → 配凹透镜；远视 → 配凸透镜。' },
    ],
    Svg: EyeSvg,
  },"""
assert anchor in s, 'SPECIMENS anchor missing'
s = s.replace(anchor, add, 1)

old1 = "'threeDefenseLines', 'waterSaltBalance']"
new1 = "'threeDefenseLines', 'waterSaltBalance', 'heartCirculation', 'nephron', 'joint', 'eye']"
assert old1 in s, 'cat1 missing'
s = s.replace(old1, new1)

open(p, 'w', encoding='utf-8').write(s)
print('registered OK')
