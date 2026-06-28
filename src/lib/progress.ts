export type ProgressState = Record<string, boolean>;

const KEY = 'k8s-book-progress';
type Listener = (s: ProgressState) => void;
const listeners = new Set<Listener>();

function hasStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getProgress(): ProgressState {
  if (!hasStorage()) return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as ProgressState) : {};
  } catch {
    return {};
  }
}

function write(state: ProgressState): void {
  if (hasStorage()) window.localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((fn) => fn(state));
}

export function isComplete(id: string): boolean {
  return getProgress()[id] === true;
}

export function setComplete(id: string, value: boolean): void {
  const state = getProgress();
  if (value) state[id] = true;
  else delete state[id];
  write(state);
}

export function resetProgress(): void {
  if (hasStorage()) window.localStorage.removeItem(KEY);
  listeners.forEach((fn) => fn({}));
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function completionRatio(allIds: string[]): number {
  if (allIds.length === 0) return 0;
  const state = getProgress();
  const done = allIds.filter((id) => state[id] === true).length;
  return done / allIds.length;
}
