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

export const linuxQuiz: QuizQuestion[] = [
  {
    id: 'linux-1',
    prompt: 'Namespaces and cgroups each control what?',
    options: [
      'Namespaces control what a process can see; cgroups control what it can use',
      'Both limit CPU only',
      'Namespaces compile images; cgroups push them',
    ],
    answerIndex: 0,
    explanation: 'Namespaces isolate visibility (PIDs, network, mounts); cgroups limit consumption (CPU, memory, I/O).',
  },
];

export const networkingQuiz: QuizQuestion[] = [
  {
    id: 'net-1',
    prompt: 'Why do services use DNS names instead of hard-coded IPs?',
    options: [
      'Container IPs are ephemeral and change on restart/reschedule',
      'DNS is faster than IP',
      'IPs are not allowed in clusters',
    ],
    answerIndex: 0,
    explanation: 'A stable name keeps pointing at the right address as disposable containers come and go.',
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
