import type { DiagramNode } from '@/components/Diagram';
import type { TerminalCommand } from '@/components/KubectlTerminal';

// Chapter 14 — Beyond the Deployment
export const workloadsTerminal: TerminalCommand[] = [
  {
    command: 'kubectl get statefulset',
    output:
      'NAME   READY   AGE\nweb    3/3     12m\n# the pods are web-0, web-1, web-2 — stable names, each with its own volume',
  },
  {
    command: 'kubectl get pods -l app=web',
    output:
      'NAME    READY   STATUS    RESTARTS   AGE\nweb-0   1/1     Running   0          12m\nweb-1   1/1     Running   0          11m\nweb-2   1/1     Running   0          11m\n# ordered, predictable identities — not random hashes',
  },
  {
    command: 'kubectl get jobs',
    output:
      'NAME       COMPLETIONS   DURATION   AGE\nmigrate    1/1           8s         2m\n# a Job runs to completion, then stops — it is not kept running forever',
  },
];

// Chapter 15 — The Network, Deeper
export const ingressFlowNodes: DiagramNode[] = [
  {
    id: 'ingress',
    label: 'Ingress',
    x: 10,
    y: 10,
    description:
      'The Ingress + IngressController is the cluster’s L7 front door: it terminates TLS and routes HTTP by host and path to the right Service.',
  },
  {
    id: 'service',
    label: 'Service',
    x: 130,
    y: 10,
    description:
      'The Service is a stable virtual IP and DNS name that load-balances across the current matching pods, hiding their ephemeral IPs from the Ingress.',
  },
  {
    id: 'pods',
    label: 'Pods',
    x: 250,
    y: 10,
    description:
      'Pods are the real endpoints. They come and go; the Service tracks their changing IPs by label selector so the Ingress never has to care.',
  },
];

// Chapter 16 — Storage, Deeper
export const pvcBindingNodes: DiagramNode[] = [
  {
    id: 'pvc',
    label: 'PVC',
    x: 10,
    y: 10,
    description:
      'A PersistentVolumeClaim is a request for storage by a pod: "I need 10Gi, read-write-once." It names a StorageClass.',
  },
  {
    id: 'provisioner',
    label: 'Provisioner',
    x: 130,
    y: 10,
    description:
      'The StorageClass names a provisioner (a CSI driver). On seeing an unbound PVC, it calls the storage backend to create a real disk.',
  },
  {
    id: 'pv',
    label: 'PV',
    x: 250,
    y: 10,
    description:
      'The provisioner produces a PersistentVolume representing that real disk, and Kubernetes binds it to the PVC. The pod mounts the claim.',
  },
];
