import type { QuizQuestion } from '../components/Quiz';

export const whyOrchestrationQuiz: QuizQuestion[] = [
  {
    id: 'orch-1',
    prompt: 'What core problem does an orchestrator solve?',
    options: ['Keeping desired state across many machines', 'Compiling code', 'Editing images'],
    answerIndex: 0,
    explanation: 'Orchestrators continuously reconcile actual state toward declared desired state.',
  },
];
