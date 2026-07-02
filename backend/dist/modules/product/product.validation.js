import { z } from 'zod';
export const createProductSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    description: z.string().optional(),
    price: z.number().positive('Price must be greater than 0'),
    category: z.string().optional(),
    image: z.string().optional(),
    color: z.string().optional(),
    featured: z.boolean().optional(),
    isNewArrival: z.boolean().optional(),
});
//# sourceMappingURL=product.validation.js.map