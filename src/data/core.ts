import type { QuizQuestion } from '../components/Quiz';
import type { DiagramNode } from '../components/Diagram';
import type { TerminalCommand } from '../components/KubectlTerminal';

// --- Cluster Architecture ---
export const controlPlaneNodes: DiagramNode[] = [
  { id: 'apiserver', label: 'API Server', x: 10, y: 10, description: 'kube-apiserver is the front door. Every read and write to cluster state — from kubectl, controllers, and kubelets — goes through it. It validates requests and persists them to etcd.' },
  { id: 'etcd', label: 'etcd', x: 130, y: 10, description: 'A consistent, distributed key-value store. It is the single source of truth: every object you declare and every observed status lives here.' },
  { id: 'scheduler', label: 'Scheduler', x: 250, y: 10, description: 'kube-scheduler watches for unscheduled Pods and picks a node for each one based on resources, affinity, taints, and constraints.' },
  { id: 'controllers', label: 'Controller Mgr', x: 370, y: 10, description: 'kube-controller-manager runs the reconciliation loops (Node, ReplicaSet, Deployment, Job…) that drive actual state toward desired state.' },
];

export const clusterArchitectureQuiz: QuizQuestion[] = [
  {
    id: 'ca-1',
    prompt: 'Which control plane component is the single source of truth for cluster state?',
    options: ['kube-scheduler', 'etcd', 'kubelet', 'kube-proxy'],
    answerIndex: 1,
    explanation: 'etcd is the consistent key-value store that holds all declared and observed state. The API server is the only component that talks to it directly.',
  },
  {
    id: 'ca-2',
    prompt: 'What runs on every worker node to start and supervise Pods?',
    options: ['kube-apiserver', 'etcd', 'kubelet', 'kube-scheduler'],
    answerIndex: 2,
    explanation: 'The kubelet is the node agent. It watches the API server for Pods assigned to its node and tells the container runtime to run their containers.',
  },
];

// --- Pods ---
export const podTerminalCommands: TerminalCommand[] = [
  { command: 'kubectl get pods', output: 'NAME    READY   STATUS    RESTARTS   AGE\nweb-1   1/1     Running   0          12m\nweb-2   1/1     Running   0          12m' },
  { command: 'kubectl describe pod web-1', output: 'Name:         web-1\nNamespace:    default\nStatus:       Running\nIP:           10.1.2.7\nContainers:\n  web:\n    Image:    nginx:1.27\n    State:    Running\n    Ready:    True\nEvents:\n  Scheduled  default-scheduler  assigned to node-a' },
  { command: 'kubectl logs web-1', output: '10.1.2.1 - - "GET / HTTP/1.1" 200 612\n10.1.2.1 - - "GET /health HTTP/1.1" 200 2' },
];

export const podsQuiz: QuizQuestion[] = [
  {
    id: 'pod-1',
    prompt: 'What do containers in the same Pod share?',
    options: ['Nothing — they are fully isolated', 'The same network namespace and can share volumes', 'The same process ID inside each container', 'Their own separate IP address each'],
    answerIndex: 1,
    explanation: 'Containers in a Pod share a network namespace (one IP, reachable over localhost) and can mount the same volumes, which is what makes the sidecar pattern work.',
  },
  {
    id: 'pod-2',
    prompt: 'Why do you rarely create bare Pods directly in production?',
    options: ['Bare Pods are not allowed by the API', 'A bare Pod is not rescheduled or replaced if its node dies', 'Pods cannot run containers', 'Pods cost more money'],
    answerIndex: 1,
    explanation: 'A bare Pod has no controller watching it, so if it or its node dies nothing recreates it. Controllers like Deployments wrap Pods to give them self-healing.',
  },
];

// --- Deployments & ReplicaSets ---
export const deploymentsQuiz: QuizQuestion[] = [
  {
    id: 'dep-1',
    prompt: 'What is the job of a ReplicaSet?',
    options: ['To build container images', 'To keep a specified number of identical Pod replicas running', 'To route external traffic', 'To store cluster state'],
    answerIndex: 1,
    explanation: 'A ReplicaSet continuously ensures the desired replica count exists, creating or deleting Pods (selected by labels) to match.',
  },
  {
    id: 'dep-2',
    prompt: 'How does a Deployment perform a rolling update?',
    options: ['It edits the running Pods in place', 'It creates a new ReplicaSet and shifts Pods from the old one gradually', 'It deletes all Pods then recreates them at once', 'It restarts etcd'],
    answerIndex: 1,
    explanation: 'A Deployment manages multiple ReplicaSets. On an update it scales up a new ReplicaSet and scales down the old one step by step, enabling zero-downtime rollouts and easy rollbacks.',
  },
];

// --- Services & Networking ---
export const serviceTerminalCommands: TerminalCommand[] = [
  { command: 'kubectl get svc', output: 'NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE\nkubernetes   ClusterIP   10.96.0.1      <none>        443/TCP        10d\nweb          ClusterIP   10.96.140.22   <none>        80/TCP         3h\napi          NodePort    10.96.88.4     <none>        80:31180/TCP   3h' },
  { command: 'kubectl get endpoints web', output: 'NAME   ENDPOINTS                       AGE\nweb    10.1.2.7:80,10.1.2.8:80         3h' },
];

export const servicesQuiz: QuizQuestion[] = [
  {
    id: 'svc-1',
    prompt: 'Which Service type exposes an app only inside the cluster on a stable virtual IP?',
    options: ['LoadBalancer', 'NodePort', 'ClusterIP', 'ExternalName'],
    answerIndex: 2,
    explanation: 'ClusterIP is the default. It gives a stable in-cluster VIP and DNS name; NodePort and LoadBalancer build on top of it to expose traffic from outside.',
  },
  {
    id: 'svc-2',
    prompt: 'How does a Service know which Pods to send traffic to?',
    options: ['By Pod name', 'By a label selector matching the Pods', 'By IP address hard-coded in the Service', 'By node name'],
    answerIndex: 1,
    explanation: 'A Service selects Pods with a label selector. As matching Pods come and go, their IPs are kept in the Service’s endpoints, so the stable VIP always reaches healthy Pods.',
  },
];

// --- ConfigMaps & Secrets ---
export const configmapsQuiz: QuizQuestion[] = [
  {
    id: 'cm-1',
    prompt: 'What is the main difference between a ConfigMap and a Secret?',
    options: ['Secrets are encrypted by default, ConfigMaps are not', 'ConfigMaps hold non-sensitive config; Secrets hold sensitive data (base64-encoded)', 'ConfigMaps are for images, Secrets for code', 'There is no difference'],
    answerIndex: 1,
    explanation: 'Both externalize configuration. ConfigMaps are for non-sensitive values; Secrets are intended for sensitive data and are base64-encoded — which is encoding, not encryption, unless you enable encryption at rest.',
  },
  {
    id: 'cm-2',
    prompt: 'Why keep configuration out of the container image?',
    options: ['Images cannot store text', 'So the same image runs unchanged across dev, staging, and prod', 'To make images larger', 'Because Kubernetes forbids it'],
    answerIndex: 1,
    explanation: 'Externalizing config lets one immutable image be promoted across environments; only the injected ConfigMap/Secret changes, not the artifact you tested.',
  },
];

// --- Volumes, PV & PVC ---
export const volumesQuiz: QuizQuestion[] = [
  {
    id: 'vol-1',
    prompt: 'What happens to a container’s writable layer when the container restarts?',
    options: ['It is preserved forever', 'It is lost — the filesystem is ephemeral', 'It moves to etcd', 'It is copied to every node'],
    answerIndex: 1,
    explanation: 'A container’s writable layer is ephemeral and discarded on restart. Volumes — and PersistentVolumes for durable storage — exist to survive that.',
  },
  {
    id: 'vol-2',
    prompt: 'What is the relationship between a PersistentVolume (PV) and a PersistentVolumeClaim (PVC)?',
    options: ['A PVC is a piece of storage; a PV requests it', 'A PV is a piece of cluster storage; a PVC is a user’s request that binds to a PV', 'They are the same object', 'A PV runs containers'],
    answerIndex: 1,
    explanation: 'A PV is a provisioned storage resource in the cluster; a PVC is a request for storage (size + access mode). Kubernetes binds a suitable PV to the claim, decoupling Pods from storage details.',
  },
];

// --- Namespaces & Resources ---
export const namespacesQuiz: QuizQuestion[] = [
  {
    id: 'ns-1',
    prompt: 'What is a Kubernetes namespace primarily used for?',
    options: ['Encrypting traffic', 'Logically partitioning a cluster for isolation and multi-tenancy', 'Building images', 'Storing secrets only'],
    answerIndex: 1,
    explanation: 'Namespaces give a scope for names and a boundary for access control, quotas, and organization — letting multiple teams or environments share one cluster.',
  },
  {
    id: 'ns-2',
    prompt: 'What is the difference between a resource request and a limit?',
    options: ['Request is the max allowed; limit is the minimum', 'Request is what the scheduler reserves; limit is the hard ceiling enforced at runtime', 'They are identical', 'Both only apply to storage'],
    answerIndex: 1,
    explanation: 'The scheduler uses requests to decide which node has room; limits are enforced via cgroups at runtime — exceeding a memory limit gets the container OOM-killed, while CPU is throttled.',
  },
];
