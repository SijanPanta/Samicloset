'use client';

import { useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getNewArrivals } from '../app/api/product';

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
  const { data: NewArrival = [], isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: getNewArrivals,
  });
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
      <div className="grid grid-cols-1 md:grid-cols-12  gap-gutter">
       {NewArrival && NewArrival.map((product: any) => (
         <RevealSection key={product.id}>
           <div className="group cursor-pointer">
             <div className="relative aspect-[4/5] overflow-hidden mb-6">
               {/*<Image
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 src={product.image}
                 alt={product.name}
                 fill
                 sizes="(max-width: 768px) 100vw, 58vw"
               />*/}
               <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 hover-overlay"></div>
             </div>
             <div className="flex justify-between items-start">
               <div>
                 <h4 className="font-body-lg text-body-lg mb-1">{product.name}</h4>
                 <p className="text-on-surface-variant font-body-md uppercase tracking-widest text-[11px]">{product.color}</p>
               </div>
               <span className="font-body-md text-body-md">${product.price}</span>
             </div>
           </div>
         </RevealSection>
       ))}
      </div>
    </section>
  );
}
