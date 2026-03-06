import { useEffect, useRef, useState } from 'react';
import idleMascot from '../../assets/Original_3d_mascot_2k_202602242025.jpeg';

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${5 + ((i * 43) % 90)}%`,
  top: `${5 + ((i * 37) % 90)}%`,
  delay: `${(i * 0.4) % 6}s`,
  duration: `${6 + (i % 4) * 2}s`,
  size: i % 3 === 0 ? 4 : 2,
}));

const TYPEWRITER_PHRASES = [
  'Cut Through AI Noise.',
  'Build Systems That Last.',
  'Strategy Over Content.',
];

export default function Stage0Entry() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const phrase = TYPEWRITER_PHRASES[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < phrase.length) {
      timeout = setTimeout(() => {
        setDisplayText(phrase.slice(0, displayText.length + 1));
      }, 60);
    } else if (!isDeleting && displayText.length === phrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(displayText.slice(0, -1));
      }, 35);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % TYPEWRITER_PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="stage-section min-h-screen flex items-center relative overflow-hidden"
      style={{ paddingTop: 64 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 70% 50%, rgba(255, 154, 60, 0.08) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: '#ff9a3c',
              animationName: 'particleDrift',
              animationDuration: p.duration,
              animationDelay: p.delay,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="section-label mb-6">Creative Systems Studio</p>

            <h1
              ref={headlineRef}
              className="text-7xl md:text-8xl lg:text-9xl font-black leading-[1.1] mb-4"
              style={{ color: '#111827', letterSpacing: '-0.02em' }}
            >
              Cinematic AI
              <br />
              <span className="text-gradient-orange" style={{background:'linear-gradient(135deg,#ff9a3c,#ff6b35)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Animation.</span>              
              <br /> 
              Engineered for Impact.
            </h1>

            <div className="mb-6 h-8 flex items-center">
              <span
                className="text-base font-medium"
                style={{ color: '#ff9a3c', fontFamily: 'monospace', letterSpacing: '0.02em' }}
              >
                {displayText}
                <span
                  style={{
                    display: 'inline-block',
                    width: 2,
                    height: '1em',
                    background: '#ff9a3c',
                    marginLeft: 2,
                    verticalAlign: 'middle',
                    animationName: 'cursorBlink',
                    animationDuration: '0.8s',
                    animationTimingFunction: 'step-end',
                    animationIterationCount: 'infinite',
                  }}
                />
              </span>
            </div>

            <p
              ref={subRef}
              className="text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: '#8A8A8A' }}
            >
              Strategy-first creative work for founders and teams who are done
              with forgettable output.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
              <button
                onClick={scrollToWork}
                className="btn-primary text-base px-8 py-4"
              >
                See How It Works
              </button>
              <button
                onClick={() => document.querySelector('#start-project')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-ghost text-base px-8 py-4"
              >
                Start a Project
              </button>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 80% at 50% 60%, rgba(255, 154, 60, 0.18) 0%, transparent 65%)',
                  transform: 'scale(1.4)',
                }}
                aria-hidden="true"
              />
              <img
                src={idleMascot}
                alt="Joshi Designs mascot — your creative system guide"
                className="relative z-10"
                style={{ maxHeight: 500, maxWidth: 420 }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: '#8A8A8A' }}>
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{ background: 'linear-gradient(to bottom, rgba(91,200,192,0.5), transparent)' }}
        />
      </div>
    </section>
  );
}
