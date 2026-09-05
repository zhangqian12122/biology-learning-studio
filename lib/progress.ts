'use client';

import { useSyncExternalStore } from 'react';

import type { Question } from '@/lib/curriculum';
import { builtinQuestions } from '@/lib/curriculum';

const progressStorageKey = 'fujian-biology-study-progress-v2';
const progressChangeEvent = 'fujian-biology-study-progress-change';
const clientIdStorageKey = 'fujian-biology-study-client-id';
const emptyProgress: Record<string, number> = {};

let cachedProgressStorage: string | null | undefined;
let cachedProgress: Record<string, number> = emptyProgress;
/** 本机会话可见的题目集合（id -> 选项数），由练习/首页客户端按服务端下发的题库配置。 */
let knownOptionCounts: Record<string, number> = Object.fromEntries(
  builtinQuestions.map((question) => [question.id, question.options.length]),
);

/** 用服务端下发的题目集合校验本机进度（教师新题、停用题都会影响合法性）。 */
export function configureProgressQuestions(questions: Question[]) {
  knownOptionCounts = Object.fromEntries(
    questions.map((question) => [question.id, question.options.length]),
  );
}

function parseProgress(stored: string | null) {
  if (!stored) return emptyProgress;

  try {
    const parsed = JSON.parse(stored) as { answers?: Record<string, unknown> };
    const restoredAnswers: Record<string, number> = {};

    for (const [id, value] of Object.entries(parsed.answers ?? {})) {
      const optionCount = knownOptionCounts[id];
      if (
        optionCount &&
        typeof value === 'number' &&
        Number.isInteger(value) &&
        value >= 0 &&
        value < optionCount
      ) {
        restoredAnswers[id] = value;
      }
    }

    return restoredAnswers;
  } catch {
    return emptyProgress;
  }
}

function getProgressSnapshot() {
  if (typeof window === 'undefined') return emptyProgress;

  let stored: string | null;
  try {
    stored = window.localStorage.getItem(progressStorageKey);
  } catch {
    return emptyProgress;
  }

  if (stored === cachedProgressStorage) return cachedProgress;

  cachedProgressStorage = stored;
  cachedProgress = parseProgress(stored);
  return cachedProgress;
}

function subscribeToProgress(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(progressChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(progressChangeEvent, onStoreChange);
  };
}

export function useLocalProgress() {
  return useSyncExternalStore(subscribeToProgress, getProgressSnapshot, () => emptyProgress);
}

export function saveLocalProgress(answers: Record<string, number>) {
  const stored = JSON.stringify({ answers });
  cachedProgressStorage = stored;
  cachedProgress = answers;
  // 微信/隐私模式下 localStorage 可能被禁用抛异常：内存缓存已更新，答题功能不受影响
  try {
    window.localStorage.setItem(progressStorageKey, stored);
  } catch {
    // 忽略存储失败，保持会话内可用
  }
  window.dispatchEvent(new Event(progressChangeEvent));
}

/** 浏览器维度的匿名 id，仅用于服务端聚合错题率，不含任何个人信息。 */
export function getClientId() {
  if (typeof window === 'undefined') return '';
  try {
    const existing = window.localStorage.getItem(clientIdStorageKey);
    if (existing) return existing;
    const created =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `cid-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(clientIdStorageKey, created);
    return created;
  } catch {
    return 'anonymous';
  }
}
