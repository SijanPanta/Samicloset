'use client';

import { useQuery } from '@tanstack/react-query';
import { listProducts } from '../app/api/product';
import RevealSection from './RevealSection';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  color?: string;
  category?: string;
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-surface-variant" />
      <div className="space-y-3">
        <div className="h-4 bg-surface-variant rounded w-3/4" />
        <div className="h-3 bg-surface-variant rounded w-1/2" />
      </div>
    </div>
  );
}

export const Products = () => {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  });

  if (isLoading) {
    return (
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="mb-16">
          <h1 className="font-headline-md text-headline-md mb-2">All Products</h1>
          <p className="text-on-surface-variant font-body-md">Discover our complete collection.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-16">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-section-gap px-margin-mobile">
        <span className="material-symbols-outlined text-5xl text-error mb-4">error_outline</span>
        <div className="font-body-md text-error">Unable to load products.</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 border border-error px-6 py-3 font-label-caps text-label-caps uppercase tracking-widest text-error hover:bg-error hover:text-on-error transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <RevealSection>
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="font-headline-md text-headline-md mb-2">All Products</h1>
            <p className="text-on-surface-variant font-body-md">Discover our complete collection.</p>
          </div>
        </div>
      </RevealSection>
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="material-symbols-outlined text-5xl text-outline mb-4">inventory_2</span>
          <p className="font-body-md text-on-surface-variant">No products available yet.</p>
          <p className="font-body-md text-sm text-on-surface-variant mt-2">Check back soon for new arrivals.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-16">
          {products.map((product: Product, index: number) => (
            <RevealSection key={product.id} delay={index * 50}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-surface-variant">
                  {product.image ? (
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if (parent) {
                          const fallback = document.createElement('span');
                          fallback.className = 'material-symbols-outlined text-outline text-4xl';
                          fallback.textContent = 'image';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-outline text-4xl">image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm" aria-label="Add to wishlist">
                      <span className="material-symbols-outlined text-on-surface text-lg">favorite</span>
                    </button>
                    <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-sm" aria-label="Quick view">
                      <span className="material-symbols-outlined text-on-surface text-lg">visibility</span>
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body-lg text-body-lg mb-1 truncate">{product.name}</h4>
                    {product.color && (
                      <p className="text-on-surface-variant font-body-md uppercase tracking-widest text-[11px] truncate">{product.color}</p>
                    )}
                    {product.description && (
                      <p className="text-on-surface-variant font-body-md text-sm mt-1 line-clamp-2">{product.description}</p>
                    )}
                  </div>
                  <span className="font-body-md text-body-md ml-4 whitespace-nowrap">${product.price}</span>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      )}
    </section>
  );
};