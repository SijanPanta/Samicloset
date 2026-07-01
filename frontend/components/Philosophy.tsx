'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image';

function RevealSection({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('active'); },
      { threshold: 0.1 }
    );
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Philosophy() {
  return (
    <section className="bg-tertiary-fixed py-section-gap overflow-hidden">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-24">
          <RevealSection>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-tertiary-fixed-variant mb-8 block">The Philosophy</span>
            <h2 className="font-display-lg-mobile md:font-headline-md text-display-lg-mobile md:text-headline-md mb-10 leading-snug">
              We believe in a wardrobe that transcends time, curated with intention and defined by the quiet strength of craftsmanship.
            </h2>
            <p className="font-body-lg text-body-lg text-on-tertiary-fixed-variant mb-12 max-w-lg">
              L&apos;ESSENCE was born from a desire to escape the noise of fast fashion. Our pieces are designed for the modern woman who finds beauty in simplicity and quality in every thread.
            </p>
            <a className="font-label-caps text-label-caps uppercase tracking-widest border-b border-primary pb-1" href="#">Our Heritage</a>
          </RevealSection>
          <RevealSection delay={200} className="relative">
            <div className="aspect-[3/4] md:translate-x-12">
              <Image
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-pzsD_iMWfjUeLmcO72Yql1VwVYR7JGx8fK3TcIT2hKCjhHm0-dCbsVRf70zMbZqwIfA7ehqLORBPnH0WPuHOdQEk26HF46Wynm0s2A33o6clr_Rf3KjYyEJ6bwWB0gtQ2JzxqACAEZcPuFTXvgZq-rM6kp3Lt3rSW4v3iQnuBgxDyJDjA70BAgk5-TPigBPjP-8W4pm8yxFRwuLUU_hs5JusrQjJnLDkaUE-mwtRxB4YZ3eeXx6sXDSpFDsVskEtqGk--Cm5QcU"
                alt="Macro texture of raw silk and cashmere"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 hidden md:block w-64 h-80 bg-surface border border-outline-variant/30 p-8 shadow-sm">
              <p className="font-headline-sm text-[16px] italic leading-relaxed text-on-surface">
                &ldquo;Luxury is not about being noticed, it&apos;s about being remembered.&rdquo;
              </p>
              <span className="font-label-caps text-[10px] uppercase mt-4 block tracking-tighter opacity-50">
                &mdash; The Essence Manifesto
              </span>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
