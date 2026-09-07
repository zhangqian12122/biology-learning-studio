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
      {WatermarkIcon ? (
        <WatermarkIcon
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-12 size-40 select-none opacity-[0.08]"
        />
      ) : null}
      {action ? <div className="relative mb-2 flex justify-end">{action}</div> : null}
      <div className="relative">
        <p className="inline-flex items-center gap-2 border-2 border-[#13333a] bg-[#0e6f75] px-2.5 py-1 text-[11px] font-bold tracking-[0.24em] text-white shadow-[3px_3px_0_#13333a]">
          {badge}
        </p>
        <h1 className="mt-3 text-2xl font-black tracking-wide text-[#13333a] sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#49676d]">{description}</p>
        {stats && stats.length > 0 ? (
          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            {stats.map((chip, i) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 border-2 border-[#13333a] bg-white px-3 py-1 text-xs font-bold text-[#13333a] shadow-[3px_3px_0_#c6d4d4]"
              >
                <span aria-hidden="true" className="text-[#0e6f75]">
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
