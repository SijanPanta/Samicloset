'use client';

import Image from 'next/image';
import RevealSection from './RevealSection';

export default function Philosophy() {
  return (
    <section className="bg-tertiary-fixed py-section-gap overflow-hidden">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 md:gap-24">
          <RevealSection>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-tertiary-fixed-variant mb-8 block">The Philosophy</span>
            <h2 className="font-display-lg-mobile md:font-headline-md text-display-lg-mobile md:text-headline-md mb-10 leading-snug">
              We believe in a wardrobe that transcends time, curated with intention and defined by the quiet strength of craftsmanship.
            </h2>
            <p className="font-body-lg text-body-lg text-on-tertiary-fixed-variant mb-12 max-w-lg">
              L&apos;ESSENCE was born from a desire to escape the noise of fast fashion. Our pieces are designed for the modern woman who finds beauty in simplicity and quality in every thread.
            </p>
            <a className="group font-label-caps text-label-caps uppercase tracking-widest border-b border-primary pb-1 inline-flex items-center gap-2" href="#">
              Our Heritage
              <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
            </a>
          </RevealSection>
          <RevealSection delay={200} className="relative">
            <div className="aspect-[3/4] md:translate-x-12 relative">
              <Image
                className="object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-pzsD_iMWfjUeLmcO72Yql1VwVYR7JGx8fK3TcIT2hKCjhHm0-dCbsVRf70zMbZqwIfA7ehqLORBPnH0WPuHOdQEk26HF46Wynm0s2A33o6clr_Rf3KjYyEJ6bwWB0gtQ2JzxqACAEZcPuFTXvgZq-rM6kp3Lt3rSW4v3iQnuBgxDyJDjA70BAgk5-TPigBPjP-8W4pm8yxFRwuLUU_hs5JusrQjJnLDkaUE-mwtRxB4YZ3eeXx6sXDSpFDsVskEtqGk--Cm5QcU"
                alt="Macro texture of raw silk and cashmere"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative md:absolute md:-bottom-10 md:-left-10 mt-6 md:mt-0 md:w-64 bg-surface/95 md:bg-surface border border-outline-variant/30 p-8 shadow-sm backdrop-blur-sm">
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
