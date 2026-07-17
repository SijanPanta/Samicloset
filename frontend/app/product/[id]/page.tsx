"use client";

import { useParams } from "next/navigation";
import { getProductById } from "@/app/api/product";
import { useQuery } from "@tanstack/react-query";

type Product = {
  id: string;
  name: string;
  description: string;
};

export default function ProductDescriptionPage() {
  // useParams returns an object with the dynamic route parameters
  // For example, if the URL is /product/123, params.id will be "123"
  const params = useParams();
  const productId = params?.id;
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId as string),
    enabled: !!productId,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>

      {isLoading ? (
        <p>Loading product...</p>
      ) : product ? (
        <div className="border rounded-lg p-6 shadow-sm">
          <p className="text-lg">
            <span className="font-semibold">Product ID:</span> {product.id}
          </p>

          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
          </div>

          <p className="mt-6 text-gray-600">
            Description and details for product {product.name} will go here.
          </p>
        </div>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
}
