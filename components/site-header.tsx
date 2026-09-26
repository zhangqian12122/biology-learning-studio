import Link from 'next/link';


export type HeaderNavKey = 'home' | 'lab' | 'cells' | 'graph';

const navItems: { key: HeaderNavKey; href: string; label: string }[] = [
  { key: 'home', href: '/', label: '教材总览' },
  { key: 'lab', href: '/lab', label: '互动实验' },
  { key: 'cells', href: '/cells', label: '图鉴' },
  { key: 'graph', href: '/graph', label: '知识图谱' },
];

export function SiteHeader({ active }: { active: HeaderNavKey }) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-[0_4px_0_#c6d4d4]">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="福建高中生物学习站 · 首页"
          title="福建高中生物学习站"
          className="flex items-center transition-transform duration-300 hover:-rotate-2 hover:scale-105"
        >
          {/* 站点 logo：蓝色细胞方框内一束 DNA 双螺旋，黄色核体点缀 */}
          <svg width="46" height="46" viewBox="0 0 48 48" role="img" aria-hidden="true">
            <rect width="48" height="48" rx="10" fill="#2eaadc" />
            <path
              d="M17 9 C 30 16, 30 26, 17 33 C 13 35.5, 13 37, 15 39"
              stroke="#ffffff"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M31 9 C 18 16, 18 26, 31 33 C 35 35.5, 35 37, 33 39"
              stroke="#ffffff"
              strokeWidth="3.2"
              strokeLinecap="round"
              fill="none"
            />
            <line x1="19.5" y1="15" x2="28.5" y2="15" stroke="#ffe66d" strokeWidth="3.4" strokeLinecap="round" />
            <line x1="18.5" y1="21" x2="29.5" y2="21" stroke="#ffe66d" strokeWidth="3.4" strokeLinecap="round" />
            <line x1="19.5" y1="27" x2="28.5" y2="27" stroke="#ffe66d" strokeWidth="3.4" strokeLinecap="round" />
            <circle cx="39" cy="39" r="5.5" fill="#ffe66d" stroke="#ffffff" strokeWidth="2" />
          </svg>
        </Link>

        <nav
          className="order-3 flex w-full items-center gap-1.5 overflow-x-auto border-t-2 border-dashed border-[#c6d4d4] pt-3 text-sm sm:order-none sm:w-auto sm:border-0 sm:pt-0"
          aria-label="主导航"
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              aria-current={active === item.key ? 'page' : undefined}
              className={
                'nb-pill h-10 shrink-0 px-3 text-sm font-semibold leading-8 ' +
                (active === item.key ? 'nb-pill-active' : 'text-gray-500')
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}
