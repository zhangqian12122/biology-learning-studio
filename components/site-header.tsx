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
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-end gap-4 px-4 py-3.5 sm:px-6 lg:px-8">

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
