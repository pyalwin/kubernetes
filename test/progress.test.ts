import { beforeEach, describe, it, expect } from 'vitest';
import {
  getProgress,
  isComplete,
  setComplete,
  resetProgress,
  subscribe,
  completionRatio,
} from '../src/lib/progress';

beforeEach(() => {
  localStorage.clear();
  resetProgress();
});

describe('progress store', () => {
  it('defaults to empty', () => {
    expect(getProgress()).toEqual({});
    expect(isComplete('a')).toBe(false);
  });

  it('marks complete and persists', () => {
    setComplete('a', true);
    expect(isComplete('a')).toBe(true);
    expect(JSON.parse(localStorage.getItem('k8s-book-progress')!)).toEqual({ a: true });
  });

  it('resets', () => {
    setComplete('a', true);
    resetProgress();
    expect(getProgress()).toEqual({});
  });

  it('notifies subscribers', () => {
    let seen: unknown = null;
    const off = subscribe((s) => {
      seen = s;
    });
    setComplete('b', true);
    expect(seen).toEqual({ b: true });
    off();
  });

  it('computes completion ratio', () => {
    setComplete('a', true);
    expect(completionRatio(['a', 'b'])).toBe(0.5);
    expect(completionRatio([])).toBe(0);
  });

  it('survives corrupt storage', () => {
    localStorage.setItem('k8s-book-progress', '{not json');
    expect(getProgress()).toEqual({});
  });
});
