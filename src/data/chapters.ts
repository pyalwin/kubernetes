// Canonical registry of every chapter in the book.
// `completionId` is the Quiz `id` whose completion marks the chapter done —
// it must match the <Quiz id="..."> used at the end of that chapter's MDX.
export interface Chapter {
  id: string;
  title: string;
  link: string;
  part: string;
  completionId: string;
}

export const chapters: Chapter[] = [
  // Part 0 — Foundations
  { id: 'why-orchestration', title: 'Why Orchestration?', link: '/00-foundations/why-orchestration/', part: 'Foundations', completionId: 'quiz-why-orchestration' },
  { id: 'containers-and-docker', title: 'Containers & Docker', link: '/00-foundations/containers-and-docker/', part: 'Foundations', completionId: 'quiz-containers' },
  { id: 'linux-internals', title: 'Linux Internals', link: '/00-foundations/linux-internals/', part: 'Foundations', completionId: 'quiz-linux' },
  { id: 'networking-basics', title: 'Networking Basics', link: '/00-foundations/networking-basics/', part: 'Foundations', completionId: 'quiz-networking' },
  { id: 'distributed-systems', title: 'Distributed Systems', link: '/00-foundations/distributed-systems/', part: 'Foundations', completionId: 'quiz-distsys' },

  // Part 1 — Core Kubernetes
  { id: 'cluster-architecture', title: 'Cluster Architecture', link: '/01-core/cluster-architecture/', part: 'Core', completionId: 'quiz-cluster-architecture' },
  { id: 'pods', title: 'Pods', link: '/01-core/pods/', part: 'Core', completionId: 'quiz-pods' },
  { id: 'deployments-replicasets', title: 'Deployments & ReplicaSets', link: '/01-core/deployments-replicasets/', part: 'Core', completionId: 'quiz-deployments' },
  { id: 'services-networking', title: 'Services & Networking', link: '/01-core/services-networking/', part: 'Core', completionId: 'quiz-services' },
  { id: 'configmaps-secrets', title: 'ConfigMaps & Secrets', link: '/01-core/configmaps-secrets/', part: 'Core', completionId: 'quiz-configmaps' },
  { id: 'volumes-pv-pvc', title: 'Volumes, PV & PVC', link: '/01-core/volumes-pv-pvc/', part: 'Core', completionId: 'quiz-volumes' },
  { id: 'namespaces-resources', title: 'Namespaces & Resources', link: '/01-core/namespaces-resources/', part: 'Core', completionId: 'quiz-namespaces' },

  // Part 2 — Advanced
  { id: 'helm', title: 'Helm', link: '/02-advanced/helm/', part: 'Advanced', completionId: 'quiz-helm' },
  { id: 'workload-controllers', title: 'Workload Controllers', link: '/02-advanced/workload-controllers/', part: 'Advanced', completionId: 'quiz-workloads' },
  { id: 'networking-deep-dive', title: 'Networking Deep Dive', link: '/02-advanced/networking-deep-dive/', part: 'Advanced', completionId: 'quiz-networking-advanced' },
  { id: 'storage', title: 'Storage (CSI)', link: '/02-advanced/storage/', part: 'Advanced', completionId: 'quiz-storage' },
  { id: 'security-rbac', title: 'Security & RBAC', link: '/02-advanced/security-rbac/', part: 'Advanced', completionId: 'quiz-rbac' },
  { id: 'crds-operators', title: 'CRDs & Operators', link: '/02-advanced/crds-operators/', part: 'Advanced', completionId: 'quiz-operators' },

  // Part 3 — Production Ops
  { id: 'autoscaling', title: 'Autoscaling', link: '/03-production/autoscaling/', part: 'Production', completionId: 'quiz-autoscaling' },
  { id: 'observability', title: 'Observability', link: '/03-production/observability/', part: 'Production', completionId: 'quiz-observability' },
  { id: 'rollouts-gitops', title: 'Rollouts & GitOps', link: '/03-production/rollouts-gitops/', part: 'Production', completionId: 'quiz-rollouts' },
  { id: 'troubleshooting', title: 'Troubleshooting', link: '/03-production/troubleshooting/', part: 'Production', completionId: 'quiz-troubleshooting' },
  { id: 'capstone', title: 'Capstone: Ship to Prod', link: '/03-production/capstone/', part: 'Production', completionId: 'quiz-capstone' },
];

export const completionIds = chapters.map((c) => c.completionId);
