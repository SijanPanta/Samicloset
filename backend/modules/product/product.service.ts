import db from '../../models/index.js';

const { Product } = db as any;

export const getAllProducts = async (query: Record<string, unknown>) => {
  const { category, featured, new: isNew } = query as Record<string, string | undefined>;
  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (featured) where.featured = featured === 'true';
  if (isNew) where.isNewArrival = isNew === 'true';
  return await Product.findAll({ where, order: [['createdAt', 'DESC']] });
};

export const getProductBySlug = async (slug: string) => {
  return await Product.findOne({ where: { slug } });
};
export const createProduct = async (data: Record<string, unknown>) => {
  console.log("inside createPost");
  
  return await Product.create(data);
};
