import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MascotPersonality } from '../../hooks/useMascotAnimation';
import MascotDisplay from '../shared/MascotDisplay';
import scriptArchitect from '../../assets/_prompt_original_2k_202602242024.jpeg';
import corporateStrategy from '../../assets/Corporate_Strategy_Mode.jpeg';
import experimentMode from '../../assets/Experiment_Mode.jpeg';

const steps: {
  number: string;
  title: string;
  subtitle: string;
  mascotSrc: string | null;
  mascotAlt: string;
  mascotRole: string;
  personality: MascotPersonality;
  entryFrom: 'left' | 'right';
  accent: string;
}[] = [
  {
    number: '01',
    title: 'Understand',
    subtitle: 'We map your audience, message, and what\'s actually failing.',
    mascotSrc: scriptArchitect,
    mascotAlt: 'Script Architect mascot — holding storyboard panels',
    mascotRole: 'Script Architect',
    personality: 'architect',
    entryFrom: 'left',
    accent: 'rgba(91,200,192,0.7)',
  },
  {
    number: '02',
    title: 'Structure',
    subtitle: 'Every project gets a strategy layer before any creative layer.',
    mascotSrc: corporateStrategy,
    mascotAlt: 'Corporate Strategy mascot — arms crossed, wearing tie',
    mascotRole: 'Corporate Strategy',
    personality: 'corporate',
    entryFrom: 'right',
    accent: 'rgba(91,200,192,0.5)',
  },
  {
    number: '03',
    title: 'Build',
    subtitle: 'We produce — video, copy, design — with precision and speed.',
    mascotSrc: null,
    mascotAlt: 'Tech Builder mascot',
    mascotRole: 'Tech Builder',
    personality: 'tech',
    entryFrom: 'left',
    accent: 'rgba(91,200,192,0.6)',
  },
  {
    number: '04',
    title: 'Optimize',
    subtitle: 'We test, refine, and eliminate what doesn\'t earn attention.',
    mascotSrc: experimentMode,
    mascotAlt: 'Experiment Mode mascot — holding glowing beaker',
    mascotRole: 'Experiment Mode',
    personality: 'experiment',
    entryFrom: 'right',
    accent: 'rgba(91,200,192,0.8)',
  },
  {
    number: '05',
    title: 'Finalize',
    subtitle: 'Everything is handed off with documentation and systems.',
    mascotSrc: null,
    mascotAlt: 'Sound Brain mascot',
    mascotRole: 'Sound Brain',
    personality: 'thinker',
    entryFrom: 'left',
    accent: 'rgba(91,200,192,0.4)',
  },
];

function DesktopProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div ref={sectionRef} className="relative">
      <div
        className="hidden lg:block absolute left-8 top-0 bottom-0 w-px"
        style={{
          background: 'linear-gradient(to bottom, rgba(91,200,192,0.4) 0%, rgba(91,200,192,0.05) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="space-y-20">
        {steps.map((step, i) => {
          const isLeft = step.entryFrom === 'left';
          return (
            <div
              key={step.number}
              ref={(el) => { stepRefs.current[i] = el; }}
              className={`flex items-center gap-8 lg:gap-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className="flex-shrink-0 w-44 lg:w-52 flex justify-center">
                {step.mascotSrc ? (
                  <img
                    src={step.mascotSrc}
                    alt={step.mascotAlt}
                    title={step.mascotRole}
                    style={{ maxHeight: 280, maxWidth: 210 }}
                  />
                ) : null}
              </div>

              <div className="flex-1">
                <div className="flex items-baseline gap-4 mb-3">
                  <span
                    className="text-5xl font-bold tabular-nums"
                    style={{ color: 'rgba(91,200,192,0.12)' }}
                  >
                    {step.number}
                  </span>
                  <h3
                    className="text-2xl font-semibold"
                    style={{ color: '#111827' }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p
                  className="text-base leading-relaxed max-w-md"
                  style={{ color: '#8A8A8A' }}
                >
                  {step.subtitle}
                </p>
                <div
                  className="mt-4 h-0.5 w-12 rounded-full"
                  style={{ background: step.accent }}
                />
              </div>

              <div
                className="hidden lg:flex items-center justify-center flex-shrink-0"
                style={{ width: 20 }}
              >
                <div
                  className="w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: step.accent,
                    background: 'rgba(91,200,192,0.15)',
                    boxShadow: `0 0 12px ${step.accent}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileProcess() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) {
      if (dx > 0 && current < steps.length - 1) goTo(current + 1);
      if (dx < 0 && current > 0) goTo(current - 1);
    }
  };

  const step = steps[current];

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="flex gap-2 mb-8 justify-center">
        {steps.map((s, i) => (
          <button
            key={s.number}
            onClick={() => goTo(i)}
            className="transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? '#ff9a3c' : 'rgba(255,255,255,0.15)',
            }}
            aria-label={`Go to step ${s.number}`}
          />
        ))}
      </div>

      <div ref={contentRef} className="text-center">
        <div className="flex justify-center mb-6">
          <MascotDisplay
            src={step.mascotSrc}
            alt={step.mascotAlt}
            roleName={step.mascotRole}
            personality={step.personality}
            style={{ maxHeight: 200, maxWidth: 160 }}
          />
        </div>

        <span
          className="text-6xl font-bold block mb-2"
          style={{ color: 'rgba(91,200,192,0.15)' }}
        >
          {step.number}
        </span>
        <h3 className="text-2xl font-semibold mb-3" style={{ color: '#111827' }}>
          {step.title}
        </h3>
        <p className="text-base leading-relaxed mx-auto max-w-xs" style={{ color: '#8A8A8A' }}>
          {step.subtitle}
        </p>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={() => current > 0 && goTo(current - 1)}
          disabled={current === 0}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: current === 0 ? 'rgba(255,255,255,0.2)' : '#8A8A8A',
          }}
          aria-label="Previous step"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => current < steps.length - 1 && goTo(current + 1)}
          disabled={current === steps.length - 1}
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: current === steps.length - 1 ? 'rgba(255,255,255,0.2)' : '#8A8A8A',
          }}
          aria-label="Next step"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default function Stage2Process() {
  return (
    <section id="process" className="stage-section py-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255, 154, 60, 0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="mb-16">
          <p className="section-label mb-3">Process</p>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: '#111827', letterSpacing: '-0.02em' }}
          >
            How We Work.
          </h2>
          <p className="mt-3 text-base max-w-lg" style={{ color: '#8A8A8A' }}>
            Five stages. No shortcuts. Every step builds on the last.
          </p>
        </div>

        <div className="hidden md:block">
          <DesktopProcess />
        </div>
        <div className="md:hidden">
          <MobileProcess />
        </div>
      </div>
    </section>
  );
}
