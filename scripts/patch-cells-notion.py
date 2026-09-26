# -*- coding: utf-8 -*-
import io

p = 'components/cells/cells-client.tsx'
s = io.open(p, encoding='utf-8').read()

fixes = [
  # aside 容器
  ('<aside aria-label="图鉴目录" className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-lg border-2 border-[#13333a] bg-[#fbf7ef] shadow-[5px_5px_0_#c6d4d4]">',
   '<aside aria-label="图鉴目录" className="flex w-[320px] shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-[#f7f6f3] shadow-sm">'),
  # 书名块
  ('''<div className="border-b-2 border-[#13333a] bg-[#0e6f75] px-4 py-3 text-white">
              <p className="text-[10px] font-bold tracking-[0.28em] opacity-80">CELL ATLAS</p>
              <p className="mt-0.5 text-lg font-black leading-6">生物图鉴 · 目录</p>
              <p className="mt-0.5 text-[11px] font-medium opacity-85">
                共 {ATLAS_ORDER.length} 页 · {ATLAS_GROUPS.length} 章 · 按课本顺序装订
              </p>
            </div>''',
   '''<div className="border-b border-gray-200 px-4 py-3">
              <p className="text-[10px] font-semibold tracking-[0.28em] text-gray-400">CELL ATLAS</p>
              <p className="mt-0.5 text-base font-semibold leading-6 text-[#37352f]">生物图鉴 · 目录</p>
              <p className="mt-0.5 text-[11px] text-gray-500">
                共 {ATLAS_ORDER.length} 页 · {ATLAS_GROUPS.length} 章 · 按课本顺序装订
              </p>
            </div>'''),
  # 搜索框分隔线
  ('<div className="border-b-2 border-dashed border-[#d8cdb2] p-3">{searchBox}</div>',
   '<div className="border-b border-gray-200 p-3">{searchBox}</div>'),
  # 脚注
  ('<div className="border-t-2 border-dashed border-[#d8cdb2] px-4 py-2 text-[10.5px] leading-4 text-[#8a8266]">\n              ⚡ = 课外拓展档案 · 点章节名收起/展开\n            </div>',
   '<div className="border-t border-gray-200 px-4 py-2 text-[10.5px] leading-4 text-gray-500">\n              ⚡ = 课外拓展档案 · 点章节名收起/展开\n            </div>'),
  # 章按钮
  ('className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-[#f2ead8]"',
   'className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left transition-colors duration-150 hover:bg-[#efedea] active:bg-[#e3e1db]"'),
  ('<span className="font-mono text-[10px] font-bold text-[#b0a284]">{String(gi + 1).padStart(2, \'0\')}</span>',
   '<span className="font-mono text-[10px] font-semibold text-gray-400">{String(gi + 1).padStart(2, \'0\')}</span>'),
  ('<span className="min-w-0 flex-1 truncate text-[13px] font-black text-[#13333a]">{g.name}</span>',
   '<span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-[#37352f]">{g.name}</span>'),
  ('<span className="text-[10px] font-semibold text-[#a5a08e]">{catTotal}</span>',
   '<span className="text-[10px] font-medium text-gray-400">{catTotal}</span>'),
  ('<span aria-hidden="true" className="w-2 text-[10px] text-[#a5a08e]">{groupOpen ? \'▾\' : \'▸\'}</span>',
   '<span aria-hidden="true" className="w-2 text-[10px] text-gray-400">{groupOpen ? \'▾\' : \'▸\'}</span>'),
  # 节列表分隔
  ('<div className="ml-4 border-l-2 border-dashed border-[#d8cdb2] pl-1.5">',
   '<div className="ml-4 border-l border-gray-200 pl-1.5">'),
  # 节按钮
  ('className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs font-bold text-[#37585f] transition-colors hover:bg-[#f2ead8]"',
   'className="flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-xs font-semibold text-gray-600 transition-colors duration-150 hover:bg-[#efedea] active:bg-[#e3e1db]"'),
  ('<span className="text-[10px] font-semibold text-[#a5a08e]">{c.ids.length}</span>',
   '<span className="text-[10px] font-medium text-gray-400">{c.ids.length}</span>'),
  ('<span aria-hidden="true" className="w-2 text-[9px] text-[#a5a08e]">{catOpen ? \'▾\' : \'▸\'}</span>',
   '<span aria-hidden="true" className="w-2 text-[9px] text-gray-400">{catOpen ? \'▾\' : \'▸\'}</span>'),
  # 标本条目：页码色 + ⋮⋮ 手柄
  ('''                                          className={`nb-book-item ${current ? 'nb-book-item-open' : ''}`}
                                        >
                                          <span className="w-7 shrink-0 text-right font-mono text-[10px] font-bold text-[#b0a284]">
                                            {ORDER_NO.get(id)}
                                          </span>''',
   '''                                          className={`nb-book-item group ${current ? 'nb-book-item-open' : ''}`}
                                        >
                                          <span aria-hidden="true" className="w-4 shrink-0 text-center text-[10px] leading-none text-gray-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                                            ⋮⋮
                                          </span>
                                          <span className="w-7 shrink-0 text-right font-mono text-[10px] text-gray-400">
                                            {ORDER_NO.get(id)}
                                          </span>'''),
  # 搜索结果条目
  ('''                        className={`nb-book-item ${current ? 'nb-book-item-open' : ''}`}
                      >
                        <span className="w-8 shrink-0 text-right font-mono text-[10px] font-bold text-[#b0a284]">
                          {ORDER_NO.get(item.id)}
                        </span>''',
   '''                        className={`nb-book-item group ${current ? 'nb-book-item-open' : ''}`}
                      >
                        <span aria-hidden="true" className="w-4 shrink-0 text-center text-[10px] leading-none text-gray-300 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                          ⋮⋮
                        </span>
                        <span className="w-8 shrink-0 text-right font-mono text-[10px] text-gray-400">
                          {ORDER_NO.get(item.id)}
                        </span>'''),
  # 空态文案
  ('<p className="rounded-md border border-dashed border-[#cfc4a4] bg-white/70 px-3 py-6 text-center text-xs text-[#8a8266]">',
   '<p className="rounded-md border border-dashed border-gray-200 bg-white px-3 py-6 text-center text-xs text-gray-500">'),
  # 搜索结果标题色
  ('<p className="px-2 pb-1.5 pt-0.5 text-[11px] font-semibold text-[#8a8266]">',
   '<p className="px-2 pb-1.5 pt-0.5 text-[11px] font-medium text-gray-500">'),
]
for old, new in fixes:
    assert s.count(old) == 1, 'MISS: ' + old[:60]
    s = s.replace(old, new, 1)

# searchBox（cells 版）Notion 化
old = '''  const searchBox = (
    <div className="nb-input relative flex items-center">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#79939a]" aria-hidden="true" />
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="在图鉴中搜索（如“线粒体”“病毒”“染色体”）…"
        aria-label="搜索图鉴标本"
        className="min-h-10 w-full bg-transparent pl-9 pr-10 text-sm outline-none"
      />
      {search ? (
        <button
          type="button"
          onClick={() => setSearch('')}
          aria-label="清除搜索"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#79939a] transition-colors hover:bg-[#eef7f7]"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );'''
new = '''  const searchBox = (
    <div className="relative flex items-center">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="在图鉴中搜索（如“线粒体”“病毒”“染色体”）…"
        aria-label="搜索图鉴标本"
        className="min-h-9 w-full rounded-md border border-gray-200 bg-white pl-9 pr-9 text-sm text-[#37352f] placeholder-gray-400 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500/30"
      />
      {search ? (
        <button
          type="button"
          onClick={() => setSearch('')}
          aria-label="清除搜索"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition-colors duration-150 hover:bg-[#efedea]"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );'''
assert s.count(old) == 1, 'searchBox MISS'
s = s.replace(old, new, 1)

with io.open(p, 'w', encoding='utf-8', newline='') as f:
    f.write(s)
print('cells aside Notionized:', len(fixes) + 1, 'fixes')
