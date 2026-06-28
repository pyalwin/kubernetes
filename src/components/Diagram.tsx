import { useState } from 'react';

export interface DiagramNode { id: string; label: string; x: number; y: number; description: string; }
export interface DiagramProps { id: string; title: string; nodes: DiagramNode[]; }

export default function Diagram({ id, title, nodes }: DiagramProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const active = nodes.find((n) => n.id === selected) ?? null;

  const NODE_W = 104;
  const NODE_H = 38;
  const width = Math.max(...nodes.map((n) => n.x + NODE_W)) + 10;
  const height = Math.max(...nodes.map((n) => n.y + NODE_H)) + 8;

  return (
    <figure className="k8s-diagram" data-testid={`diagram-${id}`} style={{ margin: 0 }}>
      <div
        className="font-sans"
        style={{
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
          fontWeight: 600,
          color: 'var(--color-ink-soft)',
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} role="group" aria-label={title} style={{ width: '100%' }}>
        {nodes.map((n) => {
          const isSel = selected === n.id;
          return (
            <g key={n.id} onClick={() => setSelected(n.id)} style={{ cursor: 'pointer' }}>
              <rect
                x={n.x}
                y={n.y}
                width={NODE_W}
                height={NODE_H}
                rx={7}
                fill={isSel ? 'var(--color-ink)' : 'var(--color-page)'}
                stroke={isSel ? 'var(--color-ink)' : 'var(--color-rule)'}
                strokeWidth={1.5}
              />
              <text
                x={n.x + NODE_W / 2}
                y={n.y + NODE_H / 2 + 3.5}
                textAnchor="middle"
                fontSize={10.5}
                fontFamily="var(--font-sans)"
                fontWeight={600}
                fill={isSel ? 'var(--color-page)' : 'var(--color-ink)'}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p
        role="status"
        className="font-sans"
        style={{
          marginTop: 12,
          fontSize: 13.5,
          lineHeight: 1.5,
          color: 'var(--color-ink-soft)',
          minHeight: '2.6em',
        }}
      >
        {active ? active.description : 'Click a component to learn what it does.'}
      </p>
    </figure>
  );
}
