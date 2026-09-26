'use client';

import { useSyncExternalStore } from 'react';

/* ================= 学习足迹：看过的实验/标本（仅本机） ================= */

const seenStorageKey = 'fujian-biology-seen-v1';
const seenChangeEvent = 'fujian-biology-seen-change';
let cachedSeen: { labs: string[]; specimens: string[] } | undefined;

function parseSeen(stored: string | null): { labs: string[]; specimens: string[] } {
  if (!stored) return { labs: [], specimens: [] };
  try {
    const parsed = JSON.parse(stored) as { labs?: unknown; specimens?: unknown };
    const clean = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);
    return { labs: clean(parsed.labs), specimens: clean(parsed.specimens) };
  } catch {
    return { labs: [], specimens: [] };
  }
}

function readSeen() {
  if (cachedSeen === undefined) {
    cachedSeen = parseSeen(typeof window === 'undefined' ? null : window.localStorage.getItem(seenStorageKey));
  }
  return cachedSeen;
}

function writeSeen(next: { labs: string[]; specimens: string[] }) {
  cachedSeen = next;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(seenStorageKey, JSON.stringify(next));
    window.dispatchEvent(new Event(seenChangeEvent));
  }
}

/** 记录"看过"（幂等；在 lab/cells 页打开即记）。 */
export function markExperimentSeen(id: string) {
  const seen = readSeen();
  if (seen.labs.includes(id)) return;
  writeSeen({ ...seen, labs: [...seen.labs, id] });
}

export function markSpecimenSeen(id: string) {
  const seen = readSeen();
  if (seen.specimens.includes(id)) return;
  writeSeen({ ...seen, specimens: [...seen.specimens, id] });
}

function subscribeSeen(onStoreChange: () => void) {
  window.addEventListener(seenChangeEvent, onStoreChange);
  return () => window.removeEventListener(seenChangeEvent, onStoreChange);
}

/** 订阅学习足迹（组件里用；随标记即时更新）。SSR 返回空集。 */
export function useSeenProgress() {
  return useSyncExternalStore(subscribeSeen, readSeen, () => ({ labs: [], specimens: [] }));
}
