"use client";

import { useQuery } from "@tanstack/react-query";
import { getNewArrivals } from "../app/api/product";
import RevealSection from "./RevealSection";
import { useRequireAuth } from "../hooks/useRequireAuth";
import { useRouter } from "next/navigation";

export default function NewArrivals() {
  const {
    data: NewArrival = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getNewArrivals,
  });
  const { guard } = useRequireAuth();
  const router = useRouter();

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <RevealSection>
        <div className="flex justify-between items-end mb-16">
          <div>
            <h3 className="font-headline-md text-headline-md mb-2">
              New Arrivals
            </h3>
            <p className="text-on-surface-variant font-body-md">
              Curated pieces for the contemporary silhouette.
            </p>
          </div>
          <a
            onClick={() => router.push("/product")}
            className="font-label-caps text-label-caps uppercase tracking-widest border-b border-primary pb-1 hover:pb-2 transition-all hidden md:block"
          >
            View All Products
          </a>
        </div>
      </RevealSection>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {NewArrival &&
          NewArrival.map((product: any, index: number) => (
            <RevealSection key={product.id} delay={index * 100}>
              <a className="group cursor-pointer block">
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-surface-variant">
                  {product.image ? (
                    <img
                      className=" object-cover transition-transform duration-700 group-hover:scale-105"
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        const parent = (e.target as HTMLImageElement)
                          .parentElement;
                        if (parent) {
                          const fallback = document.createElement("span");
                          fallback.className =
                            "material-symbols-outlined text-outline text-4xl";
                          fallback.textContent = "image";
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-outline text-4xl">
                        image
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                      onClick={() =>
                        guard(() => router.push(`/product/${product.id}`))
                      }
                      className="w-full bg-primary text-on-primary py-3 font-label-caps text-label-caps uppercase tracking-widest text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-body-lg text-body-lg mb-1">
                      {product.name}
                    </h4>
                    <p className="text-on-surface-variant font-body-md uppercase tracking-widest text-[11px]">
                      {product.color}
                    </p>
                  </div>
                  <span className="font-body-md text-body-md">
                    ${product.price}
                  </span>
                </div>
              </a>
            </RevealSection>
          ))}
      </div>
      <div className="mt-12 text-center md:hidden">
        <a
          className="font-label-caps text-label-caps uppercase tracking-widest border-b border-primary pb-1"
          href="/product"
        >
          View All Products
        </a>
      </div>
    </section>
  );
}
