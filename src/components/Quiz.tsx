import { useState } from 'react';
import { setComplete } from '../lib/progress';

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}
export interface QuizProps {
  id: string;
  questions: QuizQuestion[];
}

export default function Quiz({ id, questions }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  function choose(qid: string, optionIndex: number) {
    const next = { ...answers, [qid]: optionIndex };
    setAnswers(next);
    if (questions.every((qq) => next[qq.id] !== undefined)) setComplete(id, true);
  }

  return (
    <div className="quiz" data-testid={`quiz-${id}`}>
      {questions.map((q) => {
        const chosen = answers[q.id];
        const answered = chosen !== undefined;
        const correct = answered && chosen === q.answerIndex;
        return (
          <fieldset key={q.id} style={{ marginBlock: '1rem' }}>
            <legend>{q.prompt}</legend>
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => choose(q.id, i)}
                aria-pressed={chosen === i}
                style={{ display: 'block', marginBlock: 4 }}
              >
                {opt}
              </button>
            ))}
            {answered && (
              <p role="status">
                {correct ? '✅ Correct! ' : '❌ Not quite. '}
                <span>{q.explanation}</span>
              </p>
            )}
          </fieldset>
        );
      })}
    </div>
  );
}
