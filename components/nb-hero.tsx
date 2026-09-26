import type { LucideIcon } from 'lucide-react';

/**
 * 积木风页头：徽标条 + 大标题 + 描述 + 统计 chip + 右上角图标水印。
 * 首页/实验/题库/教师中心共用；图鉴与知识图谱页已有手写 Hero，不强制替换。
 */
export function NbHero({
  badge,
  title,
  description,
  stats,
  icon: WatermarkIcon,
  action,
}: {
  badge: string;
  title: string;
  description: React.ReactNode;
  stats?: string[];
  /** 右上角大水印图标 */
  icon?: LucideIcon;
  /** 右上角操作区（如退出登录按钮） */
  action?: React.ReactNode;
}) {
  return (
    <div className="nb-hero relative mb-6 overflow-hidden px-6 py-7 sm:px-9 sm:py-9">
      {/* 顶部渐变 hairline：卡片的高级感细节 */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background:
            'linear-gradient(90deg, #2eaadc 0%, #7cc4e8 30%, #95e1d3 60%, #ffe66d 100%)',
        }}
      />
      {WatermarkIcon ? (
        <WatermarkIcon
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-12 size-40 select-none opacity-[0.08]"
        />
      ) : null}
      {action ? <div className="relative mb-2 flex justify-end">{action}</div> : null}
      <div className="relative">
        <p className="inline-flex items-center gap-2 border border-gray-200 bg-[#2eaadc] px-2.5 py-1 text-[11px] font-bold tracking-[0.24em] text-white shadow-sm">
          {badge}
        </p>
        <h1 className="mt-3 text-2xl font-black tracking-wide text-[#37352f] sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600">{description}</p>
        {stats && stats.length > 0 ? (
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            {stats.map((chip, i) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 border border-gray-200 bg-white px-3 py-1 text-xs font-bold text-[#37352f] shadow-sm"
              >
                <span aria-hidden="true" className="text-[#2eaadc]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
