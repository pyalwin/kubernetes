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

export const containersQuiz: QuizQuestion[] = [
  {
    id: 'cont-1',
    prompt: 'What is the difference between an image and a container?',
    options: [
      'Image is the template, container is a running instance',
      'They are identical',
      'A container builds an image',
    ],
    answerIndex: 0,
    explanation: 'An image is an immutable template; a container is a running instance of it.',
  },
];

export const distSysQuiz: QuizQuestion[] = [
  {
    id: 'distsys-1',
    prompt: 'What does a Kubernetes control loop do?',
    options: [
      'Observe actual state, compare to desired, act to close the gap, repeat',
      'Run a program once and exit',
      'Compile manifests into binaries',
    ],
    answerIndex: 0,
    explanation: 'Every controller continuously reconciles actual state toward declared desired state.',
  },
];
