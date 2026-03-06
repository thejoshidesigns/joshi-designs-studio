import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export type MascotPersonality =
  | 'idle'
  | 'architect'
  | 'corporate'
  | 'experiment'
  | 'thinker'
  | 'celebrate'
  | 'writer'
  | 'tech';

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export function useMascotAnimation(personality: MascotPersonality = 'idle') {
  const ref = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;

    const el = ref.current;
    tlRef.current?.kill();

    const tl = gsap.timeline({ repeat: -1, yoyo: true, paused: false });
    tlRef.current = tl;

    switch (personality) {
      case 'idle':
        tl.to(el, { y: -10, rotation: 1.5, duration: 2.8, ease: 'sine.inOut' })
          .to(el, { y: 0, rotation: -1, duration: 2.8, ease: 'sine.inOut' });
        break;

      case 'architect':
        tl.to(el, { rotation: 4, x: 6, duration: 1.2, ease: 'power1.inOut' })
          .to(el, { rotation: -2, x: -4, duration: 1.4, ease: 'power1.inOut' })
          .to(el, { rotation: 0, x: 0, duration: 0.8, ease: 'power2.out' });
        break;

      case 'corporate':
        tl.to(el, { x: 8, rotation: 2, duration: 2.2, ease: 'sine.inOut' })
          .to(el, { x: -8, rotation: -2, duration: 2.2, ease: 'sine.inOut' });
        break;

      case 'experiment':
        tl.to(el, { y: -14, rotation: -6, duration: 0.5, ease: 'power2.out' })
          .to(el, { y: 0, rotation: 4, duration: 0.4, ease: 'bounce.out' })
          .to(el, { y: -8, rotation: 3, duration: 0.45, ease: 'power2.out' })
          .to(el, { y: 0, rotation: -2, duration: 0.35, ease: 'bounce.out' })
          .to(el, { y: 0, rotation: 0, duration: 0.6, ease: 'power1.out' });
        break;

      case 'thinker':
        tl.to(el, { rotation: 4, y: -4, duration: 2, ease: 'sine.inOut' })
          .to(el, { rotation: -3, y: 2, duration: 2.4, ease: 'sine.inOut' })
          .to(el, { rotation: 0, y: 0, duration: 1.6, ease: 'sine.inOut' });
        break;

      case 'celebrate':
        tl.to(el, { y: -20, rotation: 12, scale: 1.08, duration: 0.4, ease: 'power2.out' })
          .to(el, { y: 0, rotation: -8, scale: 1, duration: 0.35, ease: 'bounce.out' })
          .to(el, { y: -14, rotation: 8, scale: 1.05, duration: 0.38, ease: 'power2.out' })
          .to(el, { y: 0, rotation: 0, scale: 1, duration: 0.32, ease: 'bounce.out' })
          .to(el, { y: 0, rotation: 0, duration: 0.8 });
        break;

      case 'writer':
        tl.to(el, { y: -6, rotation: -3, duration: 1.4, ease: 'sine.inOut' })
          .to(el, { y: 4, rotation: 2, x: 4, duration: 1.2, ease: 'sine.inOut' })
          .to(el, { y: 0, rotation: 0, x: 0, duration: 1, ease: 'sine.inOut' });
        break;

      case 'tech':
        tl.to(el, { y: -8, scale: 1.04, duration: 1.6, ease: 'power1.inOut' })
          .to(el, { y: 0, scale: 1, duration: 1.6, ease: 'power1.inOut' });
        break;

      default:
        tl.to(el, { y: -8, duration: 2.5, ease: 'sine.inOut' })
          .to(el, { y: 0, duration: 2.5, ease: 'sine.inOut' });
    }

    return () => {
      tl.kill();
    };
  }, [personality]);

  return ref;
}
