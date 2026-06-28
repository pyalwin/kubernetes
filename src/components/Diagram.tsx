import { useState } from 'react';

export interface DiagramNode { id: string; label: string; x: number; y: number; description: string; }
export interface DiagramProps { id: string; title: string; nodes: DiagramNode[]; }

export default function Diagram({ id, title, nodes }: DiagramProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const active = nodes.find((n) => n.id === selected) ?? null;

  return (
    <figure className="k8s-diagram" data-testid={`diagram-${id}`}>
      <figcaption>{title}</figcaption>
      <svg viewBox="0 0 240 80" role="group" aria-label={title} style={{ width: '100%', maxWidth: 480 }}>
        {nodes.map((n) => (
          <g key={n.id} onClick={() => setSelected(n.id)} style={{ cursor: 'pointer' }}>
            <rect x={n.x} y={n.y} width={100} height={36} rx={6}
                  fill={selected === n.id ? '#2563eb' : '#1f2937'} stroke="#475569" />
            <text x={n.x + 50} y={n.y + 22} textAnchor="middle" fontSize={10} fill="#fff">{n.label}</text>
          </g>
        ))}
      </svg>
      <p role="status">{active ? active.description : 'Click a component to learn what it does.'}</p>
    </figure>
  );
}
