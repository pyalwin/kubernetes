# Kubernetes, Interactively — Interactive Learning Book

**Date:** 2026-06-28
**Status:** Approved design
**Author:** Arun (with Claude)

## Summary

An interactive, browser-based learning book that teaches Kubernetes from its
foundations (containers, Linux internals, networking, distributed systems) up
through production operations. Built as a statically-generated **Astro Starlight**
site with lesson content authored in **MDX**, enriched by four custom interactive
React components and a localStorage-backed progress store.

## Goals

- Teach Kubernetes and its prerequisite fundamentals as one continuous, leveled
  journey — a learner with basic programming knowledge can start at zero and
  reach production competency.
- Make the material genuinely *interactive*: knowledge checks, a safe simulated
  `kubectl` sandbox, clickable architecture diagrams, and visible progress.
- Stay fast, offline-capable, and deployable as a static site (no backend
  required for v1).

## Non-Goals

- No real/remote Kubernetes cluster provisioning in v1. The terminal is
  simulated (canned, correct output), not a live cluster.
- No user accounts, server-side persistence, or auth in v1. Progress is local
  to the browser (localStorage).
- No content versioning or i18n in v1.

## Success Criteria

- Site builds to static output and runs `astro build` clean.
- All four interactive components have unit tests (Vitest) and work as islands
  in a real MDX page.
- Progress persists across reloads and a "resume where you left off" affordance
  works.
- Part 0 (Foundations) is authored end-to-end as a complete vertical slice,
  exercising every component type at least once.

## Architecture

A statically-generated Astro Starlight site. Lesson content is MDX (Markdown +
JSX), so prose, code blocks, and interactive React "island" components live in
the same file. Starlight provides sidebar navigation, full-text search, dark
mode, and a responsive book layout out of the box. We add four custom
components and a progress store.

```
kubernetes-book/
├── astro.config.mjs          # Starlight config, sidebar structure
├── src/
│   ├── content/docs/         # All lesson MDX, organized by part
│   │   ├── index.mdx         # Landing / how to use this book
│   │   ├── 00-foundations/
│   │   ├── 01-core/
│   │   ├── 02-advanced/
│   │   └── 03-production/
│   ├── components/           # The 4 interactive widgets
│   │   ├── Quiz.tsx
│   │   ├── KubectlTerminal.tsx
│   │   ├── Diagram.tsx
│   │   └── ProgressTracker.tsx
│   ├── lib/progress.ts       # localStorage progress store (SSR-safe)
│   └── data/                 # quiz banks, terminal command->output maps
└── package.json
```

### Why Astro Starlight

Chosen over Docusaurus and a custom Next.js app for the best balance of
"book feel for free" (nav, search, dark mode, TOC) and embeddable interactivity
via MDX islands, with the least boilerplate and a fast static build. Trade-off:
interactive widgets are hydrated islands rather than a fully-React tree, a minor
authoring learning curve we accept.

## Content Structure

Four progressive parts, each with chapters, building from prerequisites to
production ops. Parts are numbered 00–03 (chosen over the databases project's
"Level 1–4" naming).

### Part 0 — Foundations
- Why orchestration exists (the problem Kubernetes solves)
- Containers & Docker: images, registries, Dockerfiles, container runtimes
  (containerd)
- Linux internals: processes, namespaces, cgroups, filesystems
- Networking basics: TCP/IP, DNS, load balancing
- Distributed-systems concepts: desired state, reconciliation, control loops,
  fault tolerance, consensus

### Part 1 — Core Kubernetes
- Cluster architecture: API server, etcd, scheduler, controller-manager,
  kubelet, kube-proxy
- Pods
- Deployments & ReplicaSets
- Services & cluster networking
- ConfigMaps & Secrets
- Volumes, PersistentVolumes & PersistentVolumeClaims
- Namespaces & resource limits/requests

### Part 2 — Advanced
- Helm (packaging, charts, templating)
- StatefulSets, DaemonSets, Jobs, CronJobs
- Networking deep-dive: CNI, Ingress, NetworkPolicies
- Storage: CSI, StorageClasses, dynamic provisioning
- Security: RBAC, ServiceAccounts, Pod Security
- CRDs & Operators (the reconciliation pattern, applied)

### Part 3 — Production Ops
- Autoscaling: HPA, VPA, Cluster Autoscaler
- Observability: Prometheus, metrics, logging
- Rollouts, rollbacks & GitOps
- Troubleshooting playbook
- Capstone: ship an app to production end-to-end

## Interactive Components

### `<Quiz>`
Declarative multiple-choice / true-false questions with instant feedback and an
explanation per answer. Reports completion to the progress store. Question data
lives in `src/data/` (typed), separate from prose, so the component is generic.

### `<KubectlTerminal>`
A simulated terminal. A per-lesson command→output map returns realistic canned
output for commands like `kubectl get pods`. Supports basic input handling,
optional tab-complete, and small "scenarios" (e.g. a pod stuck in
CrashLoopBackOff to investigate). No real cluster — safe, offline, deterministic.

### `<Diagram>`
Interactive SVG diagrams (control-plane, pod lifecycle, scheduling flow). Click
a node to highlight it and show a description; a "step" control animates flows.

### `<ProgressTracker>`
Per-chapter completion checkmarks, a global progress bar, and "resume where you
left off." Backed by `src/lib/progress.ts` (localStorage). Surfaced on the
landing page and as a sidebar widget.

## Data Flow & Error Handling

- Components are Astro islands hydrated with `client:visible` — loaded only when
  scrolled into view, keeping pages fast.
- `src/lib/progress.ts` is a tiny pub/sub over localStorage. All reads guard
  `window`/`localStorage` so server-side rendering and the build do not crash.
  Corrupt/missing stored state falls back to an empty default.
- Quiz banks and terminal command-maps are typed data files in `src/data/`,
  decoupled from prose. Unknown terminal commands return a friendly
  "command not found / try X" message rather than erroring.

## Testing

- **Unit (Vitest):** each of the four components — Quiz scoring/feedback,
  terminal command lookup & unknown-command handling, diagram node
  selection/state, progress store read/write/reset (including SSR-safe guards).
- **Build smoke test:** `astro build` must complete without errors, proving MDX
  pages with embedded islands compile.
- **Vertical-slice check:** Part 0 authored end-to-end, exercising every
  component type in real lesson pages.

## Build Sequence

1. Scaffold Astro Starlight; configure sidebar for Parts 00–03.
2. Build & unit-test the four components in isolation.
3. Wire the `progress.ts` store and `<ProgressTracker>`.
4. Author Part 0 (Foundations) end-to-end as the proving vertical slice.
5. Fill in Parts 1–3 content.

Per the working style, implementation will be split across named teammates
(scaffolding/components, content authoring, diagrams) once the implementation
plan is approved.

## Open Questions

None blocking. Future (post-v1) possibilities, explicitly out of scope now:
real cluster integration for the terminal, accounts + server-side progress sync,
content versioning.
