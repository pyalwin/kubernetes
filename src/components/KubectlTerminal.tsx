import { useState } from 'react';

export interface TerminalCommand { command: string; output: string; }
export interface KubectlTerminalProps {
  id: string;
  commands: TerminalCommand[];
  prompt?: string;
}

interface Line { kind: 'input' | 'output'; text: string; }

export default function KubectlTerminal({ id, commands, prompt = '$' }: KubectlTerminalProps) {
  const [history, setHistory] = useState<Line[]>([]);
  const [value, setValue] = useState('');

  function run() {
    const cmd = value.trim();
    if (!cmd) return;
    const match = commands.find((c) => c.command === cmd);
    const output = match
      ? match.output
      : `command not found: try one of: ${commands.map((c) => c.command).join(', ')}`;
    setHistory((h) => [...h, { kind: 'input', text: `${prompt} ${cmd}` }, { kind: 'output', text: output }]);
    setValue('');
  }

  return (
    <div
      className="kubectl-terminal font-mono"
      data-testid={`term-${id}`}
      style={{
        background: 'var(--color-ink)',
        color: 'var(--color-page)',
        padding: '14px 16px',
        borderRadius: 8,
        fontSize: 13.5,
        lineHeight: 1.6,
      }}
    >
      {history.map((line, i) => (
        <pre
          key={i}
          style={{
            margin: 0,
            background: 'transparent',
            border: 'none',
            padding: 0,
            whiteSpace: 'pre-wrap',
            color:
              line.kind === 'input'
                ? 'var(--color-page)'
                : 'color-mix(in srgb, var(--color-page) 70%, transparent)',
          }}
        >
          {line.text}
        </pre>
      ))}
      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
        <span aria-hidden="true" style={{ opacity: 0.85 }}>{prompt}</span>
        <input
          aria-label="terminal input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') run(); }}
          placeholder="type a kubectl command, then Enter"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: 'var(--color-page)',
            outline: 'none',
            fontFamily: 'inherit',
            fontSize: 'inherit',
          }}
        />
      </div>
    </div>
  );
}
