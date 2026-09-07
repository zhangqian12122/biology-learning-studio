'use client';

import { configureProgressQuestions, useLocalProgress } from '@/lib/progress';
import type { Question } from '@/lib/curriculum';

export function LocalProgressBadge({
  questions,
  total,
}: {
  questions: Question[];
  total?: number;
}) {
  configureProgressQuestions(questions);
  const answers = useLocalProgress();
  const count = Object.keys(answers).length;
  const denominator = total ?? questions.length;

  return (
    <span
      title="学习记录仅保存在当前浏览器"
      className="nb-pill inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold text-[#80621c]"
    >
      <svg
        className="size-3.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" />
      </svg>
      本机已完成 {count}/{denominator}
    </span>
  );
}
