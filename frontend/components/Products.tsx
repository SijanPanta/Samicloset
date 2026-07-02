'use client';

import { useQuery } from '@tanstack/react-query';
import { listProducts } from '../app/api/product';

export const Products = () => {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  });
  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Unable to load products.</p>;
  console.log('---',products);

  return (
    <div>
      {products.map((product: { id: string; name: string; description?: string; price: number }) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};