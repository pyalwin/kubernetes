import type { QuizQuestion } from '../components/Quiz';
import type { DiagramNode } from '../components/Diagram';
import type { TerminalCommand } from '../components/KubectlTerminal';

// ---------------------------------------------------------------------------
// Autoscaling
// ---------------------------------------------------------------------------
export const autoscalingQuiz: QuizQuestion[] = [
  {
    id: 'autoscaling-1',
    prompt: 'A Deployment is pinned at its replica count but each Pod is maxing out CPU. Which autoscaler responds?',
    options: [
      'HorizontalPodAutoscaler — it adds more Pod replicas based on the CPU metric',
      'Cluster Autoscaler — it always handles CPU pressure',
      'VerticalPodAutoscaler — it adds replicas',
    ],
    answerIndex: 0,
    explanation:
      'The HPA watches a metric (CPU here) and changes the replica count to keep utilization near a target. The VPA right-sizes a Pod’s requests/limits instead of adding replicas, and the Cluster Autoscaler changes the number of nodes.',
  },
  {
    id: 'autoscaling-2',
    prompt: 'The HPA wants 10 replicas but new Pods sit in Pending because no node has room. What fixes this?',
    options: [
      'The Cluster Autoscaler notices unschedulable Pods and adds nodes',
      'The HPA will force the Pods onto full nodes',
      'metrics-server reschedules the Pods automatically',
    ],
    answerIndex: 0,
    explanation:
      'HPA and Cluster Autoscaler work together: HPA creates Pod demand, and when Pods can’t be scheduled the Cluster Autoscaler grows the node pool. metrics-server only supplies CPU/memory readings; it does not schedule.',
  },
];

export const autoscalingNodes: DiagramNode[] = [
  { id: 'hpa', label: 'HPA', x: 10, y: 10, description: 'Scales the number of Pod replicas based on CPU, memory, or custom metrics.' },
  { id: 'vpa', label: 'VPA', x: 130, y: 10, description: 'Right-sizes each Pod by adjusting its CPU/memory requests and limits.' },
  { id: 'ca', label: 'Cluster AS', x: 250, y: 10, description: 'Adds or removes nodes when Pods cannot be scheduled or nodes sit idle.' },
];

// ---------------------------------------------------------------------------
// Observability
// ---------------------------------------------------------------------------
export const observabilityQuiz: QuizQuestion[] = [
  {
    id: 'observability-1',
    prompt: 'What are the "three pillars" of observability?',
    options: [
      'Logs, metrics, and traces',
      'CPU, memory, and disk',
      'Pods, Services, and Ingresses',
    ],
    answerIndex: 0,
    explanation:
      'Logs are discrete events, metrics are numeric time series, and traces follow a single request across services. Together they let you both detect and diagnose problems.',
  },
  {
    id: 'observability-2',
    prompt: 'How does Prometheus collect metrics from your workloads?',
    options: [
      'It pulls (scrapes) a /metrics HTTP endpoint each target exposes',
      'Each app pushes metrics into Prometheus over gRPC',
      'It reads metrics directly out of etcd',
    ],
    answerIndex: 0,
    explanation:
      'Prometheus is pull-based: on a fixed interval it scrapes the /metrics endpoint of every discovered target and stores the samples as time series you query with PromQL.',
  },
];

export const observabilityTerminal: TerminalCommand[] = [
  {
    command: 'kubectl top pods',
    output:
      'NAME                     CPU(cores)   MEMORY(bytes)\nweb-7c9d8f6b5-2xkpq      245m         180Mi\nweb-7c9d8f6b5-9fr4t      198m         172Mi\napi-5b6c7d8e9-q4wzr      410m         512Mi',
  },
  {
    command: 'kubectl logs web-7c9d8f6b5-2xkpq',
    output:
      '2026-06-28T12:01:11Z INFO  serving on :8080\n2026-06-28T12:01:42Z INFO  GET /healthz 200 1ms\n2026-06-28T12:02:03Z WARN  slow query took 812ms\n2026-06-28T12:02:05Z INFO  GET /api/orders 200 27ms',
  },
];

// ---------------------------------------------------------------------------
// Rollouts & GitOps
// ---------------------------------------------------------------------------
export const rolloutsQuiz: QuizQuestion[] = [
  {
    id: 'rollouts-1',
    prompt: 'During a rolling update, what does a readiness probe control?',
    options: [
      'A new Pod only receives traffic and counts as available once its readiness probe passes',
      'It deletes old Pods immediately, before new ones start',
      'It rebuilds the container image on each node',
    ],
    answerIndex: 0,
    explanation:
      'The rollout waits for new Pods to become Ready before sending them traffic and before removing old Pods. A failing readiness probe stalls the rollout instead of shifting users onto a broken version.',
  },
  {
    id: 'rollouts-2',
    prompt: 'In GitOps, what is the source of truth for what runs in the cluster?',
    options: [
      'A Git repository that a controller (e.g. Argo CD or Flux) continuously reconciles onto the cluster',
      'Whatever someone last typed into kubectl',
      'The container registry',
    ],
    answerIndex: 0,
    explanation:
      'GitOps applies the reconcile-loop idea to deployments: desired state lives in Git, and an agent constantly compares the cluster to the repo and corrects any drift — making the repo the audited, revertible source of truth.',
  },
];

export const rolloutsNodes: DiagramNode[] = [
  { id: 'git', label: 'Git Repo', x: 10, y: 10, description: 'Declarative desired state (manifests) — the single source of truth.' },
  { id: 'argo', label: 'Argo CD', x: 130, y: 10, description: 'Controller that continuously compares the repo to the cluster.' },
  { id: 'cluster', label: 'Cluster', x: 250, y: 10, description: 'Actual state; reconciled toward the repo, drift auto-corrected.' },
];

// ---------------------------------------------------------------------------
// Troubleshooting
// ---------------------------------------------------------------------------
export const troubleshootingQuiz: QuizQuestion[] = [
  {
    id: 'troubleshooting-1',
    prompt: 'A Pod shows STATUS CrashLoopBackOff. What is the most useful next command?',
    options: [
      'kubectl logs <pod> --previous to read the crashed container’s output',
      'kubectl delete node to reset the cluster',
      'kubectl scale deploy to 0 and forget about it',
    ],
    answerIndex: 0,
    explanation:
      'CrashLoopBackOff means the container starts then exits repeatedly. The previous container’s logs almost always contain the stack trace or config error causing the crash; pair it with kubectl describe for the events.',
  },
  {
    id: 'troubleshooting-2',
    prompt: 'A Pod is stuck in Pending and describe says "0/3 nodes are available: insufficient cpu." What does that indicate?',
    options: [
      'The scheduler can’t place it because no node has enough free CPU — lower requests or add nodes',
      'The image name is wrong',
      'The container ran out of memory and was killed',
    ],
    answerIndex: 0,
    explanation:
      'Pending + "insufficient cpu" is a scheduling problem, not a runtime one. Either the Pod’s CPU requests are too high or the cluster lacks capacity — reduce requests or let the Cluster Autoscaler add a node. (ImagePullBackOff points at the image; OOMKilled points at memory limits.)',
  },
];

export const troubleshootingTerminal: TerminalCommand[] = [
  {
    command: 'kubectl get pods',
    output:
      'NAME                    READY   STATUS             RESTARTS      AGE\nweb-1                   0/1     CrashLoopBackOff   5 (20s ago)   3m\napi-1                   1/1     Running            0             3m',
  },
  {
    command: 'kubectl describe pod web-1',
    output:
      'Name:         web-1\nStatus:       Running\nContainers:\n  web:\n    State:          Waiting\n      Reason:       CrashLoopBackOff\n    Last State:     Terminated\n      Reason:       Error\n      Exit Code:    1\nEvents:\n  Type     Reason     Age                 From     Message\n  ----     ------     ----                ----     -------\n  Warning  BackOff    8s (x6 over 90s)    kubelet  Back-off restarting failed container',
  },
  {
    command: 'kubectl logs web-1 --previous',
    output:
      '2026-06-28T12:00:01Z INFO  starting web\n2026-06-28T12:00:01Z FATAL config: required env DATABASE_URL is not set\npanic: missing DATABASE_URL\nexit status 1',
  },
];

// ---------------------------------------------------------------------------
// Capstone
// ---------------------------------------------------------------------------
export const capstoneQuiz: QuizQuestion[] = [
  {
    id: 'capstone-1',
    prompt: 'Which combination correctly exposes a stateless web app to the public internet on Kubernetes?',
    options: [
      'Deployment (Pods) → Service (stable in-cluster address) → Ingress (external HTTP routing)',
      'Just a bare Pod with a public IP',
      'A ConfigMap pointed directly at the internet',
    ],
    answerIndex: 0,
    explanation:
      'The Deployment manages replicas, the Service gives them one stable virtual address and load-balances across them, and the Ingress routes outside HTTP/HTTPS traffic to that Service by host/path.',
  },
  {
    id: 'capstone-2',
    prompt: 'Why set both resource requests and a readiness probe before going to production?',
    options: [
      'Requests let the scheduler place Pods and enable autoscaling; the readiness probe keeps traffic off Pods until they’re actually ready',
      'They are only needed in development',
      'They make the container image smaller',
    ],
    answerIndex: 0,
    explanation:
      'Requests are how the scheduler reasons about capacity and how the HPA computes utilization; the readiness probe ensures users never hit a Pod that is still starting or temporarily unhealthy. Together they are the backbone of a safe production rollout.',
  },
];
