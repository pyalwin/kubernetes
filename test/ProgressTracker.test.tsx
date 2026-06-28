import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import ProgressTracker from '../src/components/ProgressTracker';
import { setComplete, resetProgress } from '../src/lib/progress';

beforeEach(() => { localStorage.clear(); resetProgress(); });

describe('ProgressTracker', () => {
  it('starts at 0%', () => {
    render(<ProgressTracker chapterIds={['a', 'b']} />);
    expect(screen.getByText(/0%/)).toBeInTheDocument();
  });
  it('updates when a chapter completes', () => {
    render(<ProgressTracker chapterIds={['a', 'b']} />);
    act(() => setComplete('a', true));
    expect(screen.getByText(/50%/)).toBeInTheDocument();
  });
});
