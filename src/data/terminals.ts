import type { TerminalCommand } from '../components/KubectlTerminal';

export const firstPodsTerminal: TerminalCommand[] = [
  { command: 'kubectl get pods', output: 'NAME    READY   STATUS    RESTARTS   AGE\nweb-1   1/1     Running   0          2m' },
  { command: 'kubectl get nodes', output: 'NAME       STATUS   ROLES           AGE   VERSION\nnode-1     Ready    control-plane   1h    v1.30.0' },
];
