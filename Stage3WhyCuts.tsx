import { useRef, useState } from 'react';
import { X, Check } from 'lucide-react';

const theirColumn = [
  'Generic content produced on autopilot',
  'No strategic foundation — just output',
  'Looks good, says nothing',
  'Disappears into the algorithm',
];

const ourColumn = [
  'Every asset connected to a system',
  'Strategy embedded in every creative decision',
  'Distinct voice that earns attention',
  'Built to compound over time',
];

const stats = [
  { value: 47, suffix: '', label: 'Projects Completed' },
  { value: 12, suffix: '', label: 'Industries Served' },
  { value: 3.2, suffix: '×', label: 'Avg Engagement Lift' },
];

function StatDisplay({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const formatted = Number.isInteger(value)
    ? Math.round(value).toString()
    : value.toFixed(1);

  return (
    <div className="text-center">
      <div
        className="text-3xl md:text-4xl font-bold mb-1 tabular-nums"
        style={{ color: '#ff9a3c' }}
      >
        {formatted}{suffix}
      </div>
      <div className="text-xs" style={{ color: '#8A8A8A' }}>
        {label}
      </div>
    </div>
  );
}

export default function Stage3WhyCuts() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  return (
    <section className="stage-section py-24" style={{ background: '#080808' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="section-label mb-3">Difference</p>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: '#111827', letterSpacing: '-0.02em' }}
          >
            The Difference Is The System.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,1px,1fr] gap-0 md:gap-0 items-start mb-16">
          <div ref={leftRef} className="pr-0 md:pr-12 pb-8 md:pb-0">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-semibold tracking-wider uppercase"
              style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.2)', color: 'rgba(255,100,100,0.8)' }}
            >
              <X size={10} />
              What most agencies deliver
            </div>
            <ul className="space-y-4">
              {theirColumn.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(255,60,60,0.1)' }}
                  >
                    <X size={10} style={{ color: 'rgba(255,100,100,0.8)' }} />
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: '#8A8A8A' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="hidden md:block w-px self-stretch mx-6"
            style={{ background: '#ff9a3c', opacity: 0.25 }}
            aria-hidden="true"
          />
          <div
            className="md:hidden h-px mb-8"
            style={{ background: 'rgba(91,200,192,0.15)' }}
            aria-hidden="true"
          />

          <div ref={rightRef} className="pl-0 md:pl-12">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 text-xs font-semibold tracking-wider uppercase"
              style={{ background: 'rgba(91,200,192,0.08)', border: '1px solid rgba(91,200,192,0.25)', color: '#ff9a3c' }}
            >
              <Check size={10} />
              What Joshi Designs builds
            </div>
            <ul className="space-y-4">
              {ourColumn.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(91,200,192,0.12)' }}
                  >
                    <Check size={10} style={{ color: '#ff9a3c' }} />
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color: '#111827' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="grid grid-cols-3 gap-6 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {stats.map((stat) => (
            <StatDisplay
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
        <p className="text-center mt-4 text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Numbers are real. Available on request.
        </p>
      </div>
    </section>
  );
}
