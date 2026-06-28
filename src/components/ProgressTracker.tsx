import { useEffect, useState } from 'react';
import { completionRatio, subscribe } from '../lib/progress';

export interface ProgressTrackerProps {
  chapterIds: string[];
  labels?: Record<string, string>;
}

export default function ProgressTracker({ chapterIds }: ProgressTrackerProps) {
  const [ratio, setRatio] = useState(() => completionRatio(chapterIds));

  useEffect(() => {
    setRatio(completionRatio(chapterIds));
    return subscribe(() => setRatio(completionRatio(chapterIds)));
  }, [chapterIds.join(',')]);

  const pct = Math.round(ratio * 100);
  return (
    <div className="progress-tracker" role="group" aria-label="Course progress">
      <div style={{ background: '#1f2937', borderRadius: 999, height: 12, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#22c55e', transition: 'width .3s' }} />
      </div>
      <p style={{ marginTop: 4, fontSize: 14 }}>{pct}% complete</p>
    </div>
  );
}
