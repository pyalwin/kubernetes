import type { QuizQuestion } from '../components/Quiz';
import type { DiagramNode } from '../components/Diagram';
import type { TerminalCommand } from '../components/KubectlTerminal';

export const helmQuiz: QuizQuestion[] = [
  {
    id: 'helm-1',
    prompt: 'What problem does Helm primarily solve?',
    options: [
      'Templating and packaging reusable, parameterized Kubernetes manifests',
      'Compiling container images from source',
      'Encrypting Secrets at rest in etcd',
    ],
    answerIndex: 0,
    explanation:
      'Helm packages manifests into charts whose templates are filled in from values.yaml, so you configure once instead of copy-pasting and hand-editing YAML per environment.',
  },
  {
    id: 'helm-2',
    prompt: 'After a bad `helm upgrade`, how do you return to the previous working state?',
    options: ['helm rollback <release> <revision>', 'kubectl delete chart', 'helm uninstall --keep'],
    answerIndex: 0,
    explanation:
      'Each install/upgrade creates a numbered release revision. `helm rollback` re-applies an earlier revision, making recovery a single command.',
  },
];

export const workloadsQuiz: QuizQuestion[] = [
  {
    id: 'workloads-1',
    prompt: 'Which controller gives each pod a stable network identity and its own persistent volume?',
    options: ['StatefulSet', 'DaemonSet', 'Job'],
    answerIndex: 0,
    explanation:
      'A StatefulSet provides stable, ordered pod names (web-0, web-1) and per-pod PersistentVolumeClaims — exactly what databases and clustered stores need.',
  },
  {
    id: 'workloads-2',
    prompt: 'You need a log-collector agent running on every node, including new ones. Use a…',
    options: ['DaemonSet', 'CronJob', 'StatefulSet'],
    answerIndex: 0,
    explanation:
      'A DaemonSet ensures one pod per node and automatically schedules onto nodes as they join the cluster — ideal for node-level agents.',
  },
];

export const networkingAdvancedQuiz: QuizQuestion[] = [
  {
    id: 'net-adv-1',
    prompt: 'What does an Ingress resource provide that a plain Service does not?',
    options: [
      'L7 HTTP routing by host and path to multiple backend services',
      'A persistent volume for the pod',
      'A container image registry',
    ],
    answerIndex: 0,
    explanation:
      'Ingress is layer-7 routing: one entry point fans out to many Services by hostname and URL path, with TLS termination. A Service alone only does L4 load balancing.',
  },
  {
    id: 'net-adv-2',
    prompt: 'In a namespace with no NetworkPolicies, what is the default pod-to-pod traffic behavior?',
    options: ['All traffic is allowed (default-allow)', 'All traffic is denied', 'Only DNS is allowed'],
    answerIndex: 0,
    explanation:
      'Pods are default-allow. Adding a NetworkPolicy that selects a pod flips it to default-deny for the covered direction, so you then whitelist exactly the flows you want.',
  },
];

export const storageQuiz: QuizQuestion[] = [
  {
    id: 'storage-1',
    prompt: 'What does a StorageClass enable when a PersistentVolumeClaim is created?',
    options: [
      'Dynamic provisioning of a matching PersistentVolume on demand',
      'Faster container image pulls',
      'Automatic RBAC role binding',
    ],
    answerIndex: 0,
    explanation:
      'A StorageClass names a provisioner (a CSI driver). When a PVC references it, the provisioner creates a PV automatically — no admin pre-provisioning required.',
  },
  {
    id: 'storage-2',
    prompt: 'A PVC has reclaimPolicy `Delete`. What happens to the backing disk when the PVC is deleted?',
    options: ['The underlying volume is deleted too', 'It is kept forever', 'It is copied to a backup PV'],
    answerIndex: 0,
    explanation:
      'With reclaimPolicy Delete the provisioner removes the real storage when the PVC/PV goes away. Use Retain instead when you must preserve the data.',
  },
];

export const rbacQuiz: QuizQuestion[] = [
  {
    id: 'rbac-1',
    prompt: 'What is the difference between a Role and a ClusterRole?',
    options: [
      'A Role is namespaced; a ClusterRole grants permissions cluster-wide or on cluster-scoped resources',
      'A Role is for humans, a ClusterRole is for pods',
      'There is no difference',
    ],
    answerIndex: 0,
    explanation:
      'Role + RoleBinding scope permissions to one namespace. ClusterRole + ClusterRoleBinding apply across all namespaces and to cluster-scoped objects like nodes.',
  },
  {
    id: 'rbac-2',
    prompt: 'What identity does a pod use to talk to the Kubernetes API?',
    options: ['A ServiceAccount', 'The node’s root user', 'The cluster admin certificate'],
    answerIndex: 0,
    explanation:
      'Pods authenticate as a ServiceAccount whose token is mounted into the pod. Bind that ServiceAccount to a least-privilege Role to control what the pod may do.',
  },
];

export const operatorsQuiz: QuizQuestion[] = [
  {
    id: 'operators-1',
    prompt: 'What two pieces make up the Operator pattern?',
    options: [
      'A CustomResourceDefinition plus a custom controller running a reconcile loop',
      'A Dockerfile plus a registry',
      'A Service plus an Ingress',
    ],
    answerIndex: 0,
    explanation:
      'A CRD adds a new object type to the API; the operator’s controller watches those objects and reconciles real-world state to match them — encoding human operational knowledge as code.',
  },
  {
    id: 'operators-2',
    prompt: 'What does a CustomResourceDefinition let you do?',
    options: [
      'Extend the Kubernetes API with new, first-class object kinds',
      'Replace etcd with a SQL database',
      'Disable the scheduler',
    ],
    answerIndex: 0,
    explanation:
      'A CRD registers a new kind (e.g. Prometheus) so you can `kubectl get prometheus` and have controllers act on it just like built-in resources.',
  },
];

export const ingressDiagram: DiagramNode[] = [
  {
    id: 'ingress',
    label: 'Ingress',
    x: 10,
    y: 10,
    description:
      'The Ingress + IngressController is the cluster’s L7 front door: it terminates TLS and routes HTTP by host/path to the right Service.',
  },
  {
    id: 'service',
    label: 'Service',
    x: 130,
    y: 10,
    description:
      'The Service is a stable virtual IP and DNS name that load-balances across the current set of matching pods, decoupling clients from ephemeral pod IPs.',
  },
  {
    id: 'pods',
    label: 'Pods',
    x: 250,
    y: 10,
    description:
      'Pods are the actual workload endpoints. They come and go; the Service tracks their changing IPs via label selectors so the Ingress never has to.',
  },
];

export const workloadsTerminal: TerminalCommand[] = [
  {
    command: 'kubectl get statefulset',
    output:
      'NAME   READY   AGE\nweb    3/3     12m\n# pods are web-0, web-1, web-2 with stable names and their own PVCs',
  },
  {
    command: 'kubectl get jobs',
    output:
      'NAME       COMPLETIONS   DURATION   AGE\nmigrate    1/1           8s         2m\n# a Job runs to completion, then stops — it is not restarted forever',
  },
];
