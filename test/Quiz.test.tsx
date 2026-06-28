import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Quiz from '../src/components/Quiz';
import { isComplete, resetProgress } from '../src/lib/progress';

const questions = [
  { id: 'q1', prompt: 'A pod is?', options: ['One+ containers', 'A VM'], answerIndex: 0, explanation: 'Smallest deployable unit.' },
];

beforeEach(() => { localStorage.clear(); resetProgress(); });

describe('Quiz', () => {
  it('shows feedback on correct answer', () => {
    render(<Quiz id="quiz-pods" questions={questions} />);
    fireEvent.click(screen.getByText('One+ containers'));
    expect(screen.getByText(/Correct/i)).toBeInTheDocument();
    expect(screen.getByText('Smallest deployable unit.')).toBeInTheDocument();
  });
  it('shows incorrect feedback', () => {
    render(<Quiz id="quiz-pods" questions={questions} />);
    fireEvent.click(screen.getByText('A VM'));
    expect(screen.getByText(/Not quite/i)).toBeInTheDocument();
  });
  it('marks complete after all answered', () => {
    render(<Quiz id="quiz-pods" questions={questions} />);
    fireEvent.click(screen.getByText('One+ containers'));
    expect(isComplete('quiz-pods')).toBe(true);
  });
});
