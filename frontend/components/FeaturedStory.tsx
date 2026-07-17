'use client';

import Image from 'next/image';
import RevealSection from './RevealSection';

export default function FeaturedStory() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <RevealSection className="md:col-span-5 order-2 md:order-1">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant mb-6 block">Editorial</span>
          <h3 className="font-headline-md text-headline-md mb-8">The Cashmere Edit</h3>
          <p className="font-body-md text-body-md mb-10 text-on-surface-variant">
            Sourced from the highlands and knitted with precision, our new seasonal knits offer an unparalleled tactile experience.
          </p>
          <div className="flex gap-4">
            <button className="group border border-primary px-8 py-4 font-label-caps text-label-caps uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300 inline-flex items-center gap-3">
              Shop Knitwear
              <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
            </button>
          </div>
        </RevealSection>
        <RevealSection className="md:col-span-7 order-1 md:order-2">
          <div className="relative aspect-video overflow-hidden">
            <Image
              className="object-cover transition-transform duration-700 hover:scale-105"
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
