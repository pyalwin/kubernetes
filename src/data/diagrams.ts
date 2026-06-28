import type { DiagramNode } from '../components/Diagram';

export const controlPlaneNodes: DiagramNode[] = [
  { id: 'api', label: 'API Server', x: 10, y: 10, description: 'The front door: all reads/writes to cluster state go through it.' },
  { id: 'etcd', label: 'etcd', x: 130, y: 10, description: 'Consistent key-value store holding the entire cluster state.' },
];

export const isolationNodes: DiagramNode[] = [
  { id: 'ns', label: 'Namespaces', x: 10, y: 10, description: 'Isolate what a process sees: PIDs, network, mounts, users.' },
  { id: 'cg', label: 'cgroups', x: 130, y: 10, description: 'Limit what a process uses: CPU, memory, I/O.' },
];
