import type { DiagramNode } from '@/components/Diagram';
import type { TerminalCommand } from '@/components/KubectlTerminal';

// ── Chapter 2: What a Container Actually Is ──────────────────────────────
// A container, taken apart: an ordinary process wearing three disguises.
export const containerAnatomyNodes: DiagramNode[] = [
  { id: 'process', label: 'Process', x: 10, y: 10, description: 'At the bottom it is one ordinary Linux process in the host kernel’s process table — no VM, no second kernel.' },
  { id: 'namespaces', label: 'Namespaces', x: 130, y: 10, description: 'Namespaces give that process a private view of the system: its own PIDs, network stack, mounts, and hostname.' },
  { id: 'cgroups', label: 'cgroups', x: 250, y: 10, description: 'Control groups cap what the process may consume: CPU shares, a memory ceiling, I/O bandwidth.' },
  { id: 'rootfs', label: 'Layered FS', x: 370, y: 10, description: 'A stack of read-only image layers plus one thin writable layer on top becomes the process’s root filesystem.' },
];

// A simulated docker session: image (template) vs container (instance).
export const containerInspectTerminal: TerminalCommand[] = [
  {
    command: 'docker images',
    output:
      'REPOSITORY   TAG       IMAGE ID       SIZE\nnginx        1.27      a8758716bb6a   188MB\nalpine       3.20      324bc02ae123   7.8MB',
  },
  {
    command: 'docker run -d nginx:1.27',
    output: 'f3c19a0b7e21d4c0b9f1a2e6c8d7b5a40c1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a',
  },
  {
    command: 'docker ps',
    output:
      'CONTAINER ID   IMAGE        STATUS         NAMES\nf3c19a0b7e21   nginx:1.27   Up 3 seconds   eager_swartz',
  },
  {
    command: 'ps -e -o pid,comm',
    output:
      '  PID COMMAND\n 4821 nginx\n 4860 nginx\n 4861 nginx',
  },
];

// ── Chapter 3: The Kernel Tricks Behind a Container ──────────────────────
// Two independent levers (sees vs uses) plus the filesystem trick.
export const kernelMechanismNodes: DiagramNode[] = [
  { id: 'namespaces', label: 'Namespaces', x: 10, y: 10, description: 'Control what a process SEES. Six kinds: PID, network, mount, UTS (hostname), IPC, and user.' },
  { id: 'cgroups', label: 'cgroups', x: 130, y: 10, description: 'Control what a process USES. Account for and cap CPU time, memory, and block-I/O bandwidth.' },
  { id: 'overlay', label: 'OverlayFS', x: 250, y: 10, description: 'Stack read-only image layers beneath a single writable layer, presented as one merged tree.' },
];

// ── Chapter 4: How Containers Find Each Other ────────────────────────────
// Why a stable name beats a moving IP.
export const podNetworkNodes: DiagramNode[] = [
  { id: 'client', label: 'Client', x: 10, y: 10, description: 'A caller that knows only a stable name, e.g. "web", and never a raw IP address.' },
  { id: 'dns', label: 'Cluster DNS', x: 130, y: 10, description: 'Resolves the name "web" to the Service’s stable virtual IP — the one address that never moves.' },
  { id: 'service', label: 'Service', x: 250, y: 10, description: 'A stable front for a shifting set of Pods. It spreads connections across the healthy ones.' },
  { id: 'pods', label: 'Pods', x: 370, y: 10, description: 'The real replicas. Each has its own IP, but those IPs are ephemeral — they change on every restart.' },
];

// A simulated session: Pod IPs move; the Service IP and name do not.
export const serviceDiscoveryTerminal: TerminalCommand[] = [
  {
    command: 'kubectl get pods -o wide',
    output:
      'NAME       READY   STATUS    IP           NODE\nweb-7c4b   1/1     Running   10.1.2.34    node-1\nweb-9f2a   1/1     Running   10.1.5.81    node-2',
  },
  {
    command: 'kubectl delete pod web-7c4b',
    output: 'pod "web-7c4b" deleted',
  },
  {
    command: 'kubectl get pods -o wide',
    output:
      'NAME       READY   STATUS    IP           NODE\nweb-9f2a   1/1     Running   10.1.5.81    node-2\nweb-b3e8   1/1     Running   10.1.2.97    node-1',
  },
  {
    command: 'kubectl get service web',
    output:
      'NAME   TYPE        CLUSTER-IP    PORT(S)   AGE\nweb    ClusterIP   10.96.0.42    80/TCP    12m',
  },
  {
    command: 'kubectl get endpoints web',
    output: 'NAME   ENDPOINTS                       AGE\nweb    10.1.5.81:80,10.1.2.97:80       12m',
  },
];

// ── Chapter 5: The Cluster's Memory ──────────────────────────────────────
// Three etcd members; any two form a majority.
export const etcdQuorumNodes: DiagramNode[] = [
  { id: 'leader', label: 'Member 1 (leader)', x: 10, y: 10, description: 'The elected leader. Every write funnels through it, then replicates to the followers before it commits.' },
  { id: 'follower-a', label: 'Member 2', x: 130, y: 10, description: 'A follower. It acknowledges replicated writes and can be elected leader if the current one fails.' },
  { id: 'follower-b', label: 'Member 3', x: 250, y: 10, description: 'A follower. With three members, any two that agree form a quorum — so the cluster survives losing one.' },
];

// A simulated session: reading and watching cluster state out of etcd.
export const etcdStateTerminal: TerminalCommand[] = [
  {
    command: 'kubectl get deployment web -o jsonpath={.spec.replicas}',
    output: '3',
  },
  {
    command: 'kubectl get deployment web -o jsonpath={.status.availableReplicas}',
    output: '3',
  },
  {
    command: 'kubectl get componentstatuses',
    output:
      'NAME      STATUS    MESSAGE\netcd-0    Healthy   {"health":"true"}\netcd-1    Healthy   {"health":"true"}\netcd-2    Healthy   {"health":"true"}',
  },
];
