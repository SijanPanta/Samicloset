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

export default function FeaturedStory() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <RevealSection className="md:col-span-5 order-2 md:order-1">
          <h3 className="font-headline-md text-headline-md mb-8">The Cashmere Edit</h3>
          <p className="font-body-md text-body-md mb-10 text-on-surface-variant">
            Sourced from the highlands and knitted with precision, our new seasonal knits offer an unparalleled tactile experience.
          </p>
          <div className="flex gap-4">
            <button className="border border-primary px-8 py-4 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300">
              Shop Knitwear
            </button>
          </div>
        </RevealSection>
        <RevealSection className="md:col-span-7 order-1 md:order-2">
          <div className="relative aspect-video">
            <Image
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjoIIBT1c20CccFU1wscbtEwDVjyz5dTiT3V_D5LnnxcofDlbMCby1wMeYVw3yRKJSWd9pugo3dMyhbj--D-mbKdKZKMrKpthDlaDdj6W6Qmh-dyZ8WH3i1O_cISNnGjxdB3ML5IhbT3oOKW4EzAl_0QV32NCjzgtjNjCpm_uHLroOu5MQInhGF4_spwuK8dyU7wxjyoy86BlfXKCyZPkIUcxyY2jZCQzGZGGQCGlak-OkABQT4l_7cQQOnW_1qJ6QdSA_nZhonv0"
              alt="Woman walking through a minimalist concrete garden in a long black cashmere coat"
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
