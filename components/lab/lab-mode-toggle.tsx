'use client';

/**
 * 实验模式切换：引导模式（一步步「下一步」带着做）/ 自由操作（自己动手随便试）。
 * 两种模式操作同一个场景，可随时切换。
 */
export function LabModeToggle({
  guided,
  onChange,
  labels = ['引导模式', '自由操作'],
}: {
  guided: boolean;
  onChange: (guided: boolean) => void;
  labels?: [string, string];
}) {
  return (
    <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="实验模式">
      <button
        type="button"
        onClick={() => onChange(true)}
        aria-pressed={guided}
        className={`min-h-10 rounded-md border px-2 text-xs font-semibold transition-colors ${
          guided
            ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
            : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
        }`}
      >
        🧭 {labels[0]}
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        aria-pressed={!guided}
        className={`min-h-10 rounded-md border px-2 text-xs font-semibold transition-colors ${
          !guided
            ? 'border-[#82c6c0] bg-[#e9f7f5] text-[#0a626a]'
            : 'border-[#d9e7e7] bg-white text-[#537078] hover:border-[#b6d9d6]'
        }`}
      >
        ✋ {labels[1]}
      </button>
    </div>
  );
}

/** 引导模式的步骤执行按钮。 */
export function GuideNextButton({
  step,
  total,
  label,
  hint,
  disabled,
  onClick,
}: {
  step: number;
  total: number;
  label: string;
  hint: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="rounded-md border border-[#cfe6e4] bg-[#f2faf9] p-3">
      <p className="text-xs font-semibold text-[#0a626a]">
        第 {Math.min(step + 1, total)} / {total} 步 · {label}
      </p>
      <p className="mt-1 text-[11px] leading-5 text-[#59767c]">{hint}</p>
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className="mt-2.5 inline-flex min-h-10 w-full items-center justify-center rounded-md bg-[#0e6f75] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#0c5f64] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {step >= total ? '✅ 已完成' : '下一步'}
      </button>
    </div>
  );
}
