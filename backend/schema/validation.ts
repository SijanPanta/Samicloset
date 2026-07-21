import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().optional(),
  description: z.string().optional(),
  price: z.number().positive('Price must be greater than 0'),
  category: z.string().optional(),
  image: z.string().optional().nullable(),
  color: z.string().optional(),
  featured: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),
});
