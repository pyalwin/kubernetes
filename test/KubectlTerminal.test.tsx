import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import KubectlTerminal from '../src/components/KubectlTerminal';

const commands = [
  { command: 'kubectl get pods', output: 'NAME   READY   STATUS\nweb-1  1/1     Running' },
];

function type(input: HTMLElement, value: string) {
  fireEvent.change(input, { target: { value } });
  fireEvent.keyDown(input, { key: 'Enter' });
}

describe('KubectlTerminal', () => {
  it('returns canned output for known command', () => {
    render(<KubectlTerminal id="t1" commands={commands} />);
    type(screen.getByRole('textbox'), 'kubectl get pods');
    expect(screen.getByText(/web-1/)).toBeInTheDocument();
  });
  it('handles unknown command', () => {
    render(<KubectlTerminal id="t1" commands={commands} />);
    type(screen.getByRole('textbox'), 'kubectl frobnicate');
    expect(screen.getByText(/command not found/i)).toBeInTheDocument();
  });
});
