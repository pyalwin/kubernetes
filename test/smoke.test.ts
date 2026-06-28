import { describe, it, expect } from 'vitest';

describe('toolchain', () => {
  it('runs vitest in jsdom', () => {
    expect(typeof window).toBe('object');
  });
});
