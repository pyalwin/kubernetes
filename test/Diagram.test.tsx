import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Diagram from '../src/components/Diagram';

const nodes = [
  { id: 'api', label: 'API Server', x: 10, y: 10, description: 'Front door to the control plane.' },
  { id: 'etcd', label: 'etcd', x: 100, y: 10, description: 'Cluster state store.' },
];

describe('Diagram', () => {
  it('shows hint before selection', () => {
    render(<Diagram id="cp" title="Control Plane" nodes={nodes} />);
    expect(screen.getByText(/click a component/i)).toBeInTheDocument();
  });
  it('shows description when a node is clicked', () => {
    render(<Diagram id="cp" title="Control Plane" nodes={nodes} />);
    fireEvent.click(screen.getByText('etcd'));
    expect(screen.getByText('Cluster state store.')).toBeInTheDocument();
  });
});
