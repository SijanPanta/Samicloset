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

export default function NewArrivals() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <RevealSection>
        <div className="flex justify-between items-end mb-16">
          <div>
            <h3 className="font-headline-md text-headline-md mb-2">New Arrivals</h3>
            <p className="text-on-surface-variant font-body-md">Curated pieces for the contemporary silhouette.</p>
          </div>
          <a className="font-label-caps text-label-caps uppercase tracking-widest border-b border-primary pb-1 hidden md:block" href="#">View All Products</a>
        </div>
      </RevealSection>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        <RevealSection className="md:col-span-7">
          <div className="group cursor-pointer">
            <div className="relative aspect-[4/5] overflow-hidden mb-6">
              <Image
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzinSqfXVpKI-Qmgag4ap2zJXjqcLQg88jxHH5tRCf4M9WhjgHEiMaabN7Bt4cJXIUPh2RL375E3KXvCpuWiI0GXazBNO2Sboqzvf3eatPwKK4FPOAhISvNKU8M2iLRj3Fizb3xltzN0P-LX6ZEsgagcDXc-AUq8bHXv-j0CZ6y5Yoc4VmSP_rqF__ZcLElwIsMLwJ6ppNbLQ5QsAGu6tm-0HqXZzchb1RTeHmZpuXa7utFoIv0fPAWFMuoUVaEc8YooG2f4UI7PQ"
                alt="Charcoal wool oversized blazer"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
              />
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover-overlay"></div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-body-lg text-body-lg mb-1">Architectural Wool Blazer</h4>
                <p className="text-on-surface-variant font-body-md uppercase tracking-widest text-[11px]">Charcoal Melange</p>
              </div>
              <span className="font-body-md text-body-md">$420</span>
            </div>
          </div>
        </RevealSection>
        <div className="md:col-span-5 flex flex-col gap-gutter">
          <RevealSection delay={100}>
            <div className="group cursor-pointer">
              <div className="relative aspect-[1/1] overflow-hidden mb-4">
                <Image
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjlTBUVYCmWhql6_vq5vwl8Nn4ynkF685oCZUlZ6iotRE5RpgxzYBq-zJACMuYVJiJLE7rEqFa4oTXU7uBGQDszFVF6aY61pulN5FIlECRKWNsc7rq_3468eQyeE6czb50rFyXVses1DoQTlB-iULx6rrAv856CL_tCT5FsA-ZFL_xurufC8B8DmdyL1ZcuOqlsUJPQBHU5prxrfvi_3UbarAEmcN8Dk8cIbOKxRc6a6Kjmzw5-OVJs7yu231ZqnsYB9cxU-0LCk0"
                  alt="High-waisted tailored trousers in soft beige"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
              <div className="flex justify-between items-start">
                <h4 className="font-body-md text-body-md">Fluid Pleat Trousers</h4>
                <span className="font-body-md text-body-md">$280</span>
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={200}>
            <div className="group cursor-pointer">
              <div className="relative aspect-[1/1] overflow-hidden mb-4">
                <Image
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoU9Nf-Aog-Q6j63ZE0kidq67MxCy-ubLCHhERKGWSkLs8A6zHfm7kHlA93fiRxWhnZF8mRKei6benPm7LWB_lGg9L1-WqBT7Li6SnCTnouECxZa8tMejlSmN2tKGTChT6MektL6JhB2HEGE7E8nYp2LuJBj3vYAwaX8dmcb87lklcwpLV899ugK7VD86xSn6EhFW-SNOPCFkdS6DLyuD7_i4gDlEoaBELWy3N1tONl4IgdsmiMU3-aFPT51ywDHXSoOjSp9eCU4s"
                  alt="Silk scarf with geometric pattern"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </div>
              <div className="flex justify-between items-start">
                <h4 className="font-body-md text-body-md">Monolith Silk Scarf</h4>
                <span className="font-body-md text-body-md">$145</span>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}
