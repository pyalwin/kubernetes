import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    react(),
    starlight({
      title: 'Kubernetes, Interactively',
      description: 'Learn Kubernetes from containers to production — hands-on.',
      sidebar: [
        { label: 'Start Here', link: '/' },
        { label: 'Part 0 — Foundations', autogenerate: { directory: '00-foundations' } },
        { label: 'Part 1 — Core Kubernetes', autogenerate: { directory: '01-core' } },
        { label: 'Part 2 — Advanced', autogenerate: { directory: '02-advanced' } },
        { label: 'Part 3 — Production Ops', autogenerate: { directory: '03-production' } },
      ],
    }),
  ],
});
