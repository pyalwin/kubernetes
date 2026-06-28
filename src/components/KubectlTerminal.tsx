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
    <div className="kubectl-terminal" data-testid={`term-${id}`}
         style={{ background: '#0d1117', color: '#c9d1d9', padding: 12, borderRadius: 8, fontFamily: 'monospace' }}>
      {history.map((line, i) => (
        <pre key={i} style={{ margin: 0, whiteSpace: 'pre-wrap', color: line.kind === 'input' ? '#58a6ff' : '#c9d1d9' }}>
          {line.text}
        </pre>
      ))}
      <div style={{ display: 'flex', gap: 6 }}>
        <span style={{ color: '#58a6ff' }}>{prompt}</span>
        <input
          aria-label="terminal input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') run(); }}
          style={{ flex: 1, background: 'transparent', border: 'none', color: '#c9d1d9', outline: 'none', fontFamily: 'monospace' }}
        />
      </div>
    </div>
  );
}
