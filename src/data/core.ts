import type { DiagramNode } from '@/components/Diagram';
import type { TerminalCommand } from '@/components/KubectlTerminal';

// ── Chapter 6: The Control Plane, Fully ──────────────────────────────
// Top row = control plane components; bottom row = a worker node.
export const controlPlaneFullNodes: DiagramNode[] = [
  { id: 'apiserver', label: 'API Server', x: 10, y: 10, description: 'kube-apiserver — the single front door. Every read and write to cluster state, from kubectl and from the other components, passes through it. It authenticates, validates, and is the only thing that talks to etcd.' },
  { id: 'etcd', label: 'etcd', x: 130, y: 10, description: 'A consistent, replicated key-value store. The cluster’s memory: it holds every object you declared and every status the components observe. Lose etcd and you lose the cluster.' },
  { id: 'scheduler', label: 'Scheduler', x: 250, y: 10, description: 'kube-scheduler watches for Pods with no node assigned, then picks a node for each by weighing free resources, affinity rules, taints, and tolerations. It only writes the choice back; the kubelet does the running.' },
  { id: 'controllers', label: 'Controllers', x: 370, y: 10, description: 'kube-controller-manager runs the reconcile loops — Node, ReplicaSet, Job, endpoints, and more. cloud-controller-manager isolates cloud-specific loops (load balancers, disks) so the core stays vendor-neutral.' },
  { id: 'kubelet', label: 'kubelet', x: 10, y: 70, description: 'The node agent. It watches the API server for Pods assigned to its node, tells the container runtime to start their containers, and continuously reports status back.' },
  { id: 'kubeproxy', label: 'kube-proxy', x: 130, y: 70, description: 'Programs each node’s networking (iptables or IPVS) so traffic sent to a Service’s virtual IP is rewritten to a real, healthy Pod.' },
  { id: 'runtime', label: 'Runtime', x: 250, y: 70, description: 'The container runtime (commonly containerd) actually pulls images and runs containers, driven by the kubelet through the CRI interface.' },
];

export const applyFlowTerminal: TerminalCommand[] = [
  { command: 'kubectl apply -f web.yaml', output: 'deployment.apps/web created' },
  { command: 'kubectl get pods', output: 'NAME                   READY   STATUS    RESTARTS   AGE\nweb-7c9d8f6b5-2x4kp    1/1     Running   0          8s\nweb-7c9d8f6b5-q7mvn    1/1     Running   0          8s\nweb-7c9d8f6b5-zl9rt    1/1     Running   0          8s' },
  { command: 'kubectl get events', output: 'LAST SEEN   TYPE     REASON      OBJECT          MESSAGE\n8s          Normal   Scheduled   pod/web-...2x4kp  assigned to node-a\n7s          Normal   Pulled      pod/web-...2x4kp  image "web:v1" already present\n7s          Normal   Started     pod/web-...2x4kp  started container web' },
];

// ── Chapter 7: The Pod ───────────────────────────────────────────────
export const podTerminal: TerminalCommand[] = [
  { command: 'kubectl get pods', output: 'NAME    READY   STATUS    RESTARTS   AGE\nweb-1   2/2     Running   0          12m\nweb-2   2/2     Running   1          12m' },
  { command: 'kubectl describe pod web-1', output: 'Name:         web-1\nNamespace:    default\nStatus:       Running\nIP:           10.1.2.7\nContainers:\n  app:\n    Image:    web:v1\n    State:    Running\n    Ready:    True\n  log-shipper:\n    Image:    fluent-bit:2.1\n    State:    Running\n    Ready:    True\nConditions:\n  Ready             True\nEvents:\n  Scheduled   default-scheduler   assigned to node-a' },
  { command: 'kubectl logs web-1 -c app', output: '10.1.2.1 - - "GET / HTTP/1.1" 200 612\n10.1.2.1 - - "GET /healthz HTTP/1.1" 200 2' },
];

// ── Chapter 8: Keeping N Copies Alive ────────────────────────────────
export const rolloutTerminal: TerminalCommand[] = [
  { command: 'kubectl get rs', output: 'NAME             DESIRED   CURRENT   READY   AGE\nweb-7c9d8f6b5    3         3         3       20m\nweb-5f4b9c2d1    0         0         0       2h' },
  { command: 'kubectl rollout status deployment/web', output: 'Waiting for rollout to finish: 1 old replicas are pending termination...\ndeployment "web" successfully rolled out' },
  { command: 'kubectl rollout undo deployment/web', output: 'deployment.apps/web rolled back' },
];

// ── Chapter 9: One Stable Address Over Many Pods ─────────────────────
export const serviceTopologyNodes: DiagramNode[] = [
  { id: 'svc', label: 'Service web', x: 10, y: 10, description: 'A stable virtual IP (ClusterIP) plus the DNS name web.default.svc.cluster.local. This identity never changes, even as the Pods behind it are replaced.' },
  { id: 'pod1', label: 'Pod 10.1.2.7', x: 130, y: 10, description: 'A backing Pod selected by the label app=web. Its IP is ephemeral — if it dies and is recreated, it gets a new address and the old one drops out of the Service.' },
  { id: 'pod2', label: 'Pod 10.1.2.8', x: 250, y: 10, description: 'Another Pod matching app=web. The Service load-balances connections across all healthy matching Pods, so clients never pick one by hand.' },
  { id: 'pod3', label: 'Pod 10.1.2.9', x: 370, y: 10, description: 'A third matching Pod. Scale the Deployment up or down and these endpoints appear or vanish automatically — the Service’s VIP and name stay put.' },
];

export const serviceTerminal: TerminalCommand[] = [
  { command: 'kubectl get svc', output: 'NAME         TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE\nkubernetes   ClusterIP   10.96.0.1      <none>        443/TCP        10d\nweb          ClusterIP   10.96.140.22   <none>        80/TCP         3h\napi          NodePort    10.96.88.4     <none>        80:31180/TCP   3h' },
  { command: 'kubectl get endpoints web', output: 'NAME   ENDPOINTS                                   AGE\nweb    10.1.2.7:80,10.1.2.8:80,10.1.2.9:80         3h' },
];

// ── Chapter 10: Config That Doesn't Live in the Image ────────────────
export const configTerminal: TerminalCommand[] = [
  { command: 'kubectl get configmaps', output: 'NAME             DATA   AGE\napp-config       3      1h' },
  { command: 'kubectl describe configmap app-config', output: 'Name:         app-config\nNamespace:    default\nData\n====\nLOG_LEVEL:\n  info\nFEATURE_DARK_MODE:\n  "true"\nUPSTREAM_URL:\n  http://api.default.svc.cluster.local' },
  { command: 'kubectl get secret db-credentials -o yaml', output: 'apiVersion: v1\nkind: Secret\ntype: Opaque\nmetadata:\n  name: db-credentials\ndata:\n  username: YWRtaW4=        # base64("admin") — NOT encrypted\n  password: czNjcjN0UGFzcw==' },
];

// ── Chapter 11: Where Stateful Data Lives ────────────────────────────
export const storageBindNodes: DiagramNode[] = [
  { id: 'pod', label: 'Pod', x: 10, y: 10, description: 'The Pod mounts a PersistentVolumeClaim by name, exactly as it would mount any volume. It never names a disk directly — it asks for storage through the claim.' },
  { id: 'pvc', label: 'PVC', x: 130, y: 10, description: 'A PersistentVolumeClaim is a request: "I need 10Gi, ReadWriteOnce." It is namespaced and owned by the app developer, who states what they need, not where it comes from.' },
  { id: 'pv', label: 'PV', x: 250, y: 10, description: 'A PersistentVolume is a real piece of cluster storage — a cloud disk, an NFS export — provisioned by an admin or dynamically by a StorageClass. Kubernetes binds a matching PV to the claim.' },
];

export const storageTerminal: TerminalCommand[] = [
  { command: 'kubectl get pvc', output: 'NAME        STATUS   VOLUME       CAPACITY   ACCESS MODES   STORAGECLASS   AGE\ndata-web    Bound    pvc-a1b2c3   10Gi       RWO            standard       5m' },
  { command: 'kubectl get pv', output: 'NAME         CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM             AGE\npvc-a1b2c3   10Gi       RWO            Delete           Bound    default/data-web   5m' },
];

// ── Chapter 12: Carving Up a Cluster ─────────────────────────────────
export const namespaceTerminal: TerminalCommand[] = [
  { command: 'kubectl get namespaces', output: 'NAME              STATUS   AGE\ndefault           Active   10d\nkube-system       Active   10d\nteam-a            Active   3d\nteam-b            Active   3d' },
  { command: 'kubectl describe resourcequota -n team-a', output: 'Name:            team-a-quota\nNamespace:       team-a\nResource         Used    Hard\n--------         ----    ----\nrequests.cpu     1200m   4\nrequests.memory  2Gi     8Gi\npods             6       20' },
];
