import type { DiagramNode } from '@/components/Diagram';
import type { TerminalCommand } from '@/components/KubectlTerminal';

// ---------------------------------------------------------------------------
// Chapter 19 — Scaling Without Watching
// The HPA creates Pod demand; when Pods can't be placed the Cluster Autoscaler
// grows the node pool. Two loops, chained.
// ---------------------------------------------------------------------------
export const autoscalingNodes: DiagramNode[] = [
  {
    id: 'hpa',
    label: 'HPA → +Pods',
    x: 10,
    y: 10,
    description:
      'The HorizontalPodAutoscaler watches a metric (CPU, memory, or custom) and changes the replica count to keep utilization near a target. More load → more Pods.',
  },
  {
    id: 'ca',
    label: 'Cluster AS → +Nodes',
    x: 130,
    y: 10,
    description:
      'When the HPA asks for Pods that no node can fit, they sit Pending. The Cluster Autoscaler notices unschedulable Pods and adds nodes — then removes idle ones to save money.',
  },
];

// ---------------------------------------------------------------------------
// Chapter 20 — Knowing What's Happening
// kubectl top reads metrics-server; kubectl logs reads a container's stdout.
// ---------------------------------------------------------------------------
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
// Chapter 21 — Shipping Safely
// GitOps is the Chapter 1 reconcile loop, pointed at delivery: repo = desired,
// cluster = actual, a controller closes the gap.
// ---------------------------------------------------------------------------
export const gitopsNodes: DiagramNode[] = [
  {
    id: 'repo',
    label: 'Git repo',
    x: 10,
    y: 10,
    description:
      'The declarative desired state — your manifests, version-controlled. Every change is a reviewed commit; a rollback is just git revert. This is the single source of truth.',
  },
  {
    id: 'cluster',
    label: 'Cluster',
    x: 130,
    y: 10,
    description:
      'The actual state. A controller (Argo CD or Flux) continuously compares the cluster to the repo and corrects any drift — the same observe-compare-act loop from Chapter 1, applied to deployment.',
  },
];

// ---------------------------------------------------------------------------
// Chapter 22 — When It Breaks
// A CrashLoopBackOff investigation: list → describe → previous logs reveal the
// real cause (a missing env var).
// ---------------------------------------------------------------------------
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
// Chapter 23 — Capstone: Ship to Production
// The public request path: an Ingress routes external traffic to a Service,
// which load-balances across the Deployment's Pods.
// ---------------------------------------------------------------------------
export const capstoneNodes: DiagramNode[] = [
  {
    id: 'ingress',
    label: 'Ingress',
    x: 10,
    y: 10,
    description:
      'The edge: routes external HTTP/HTTPS by host and path, terminates TLS, and forwards to the right Service. This is how the outside world reaches your app.',
  },
  {
    id: 'service',
    label: 'Service → Pods',
    x: 130,
    y: 10,
    description:
      'A stable virtual address in front of the Deployment’s Pods. It load-balances across the healthy replicas and keeps working as Pods come and go.',
  },
];
