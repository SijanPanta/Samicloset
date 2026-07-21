import db from "../../models/index.js";

const { Product } = db as any;

export const getAllProducts = async (query: Record<string, unknown>) => {
  const {
    category,
    featured,
    new: isNew,
  } = query as Record<string, string | undefined>;
  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (featured) where.featured = featured === "true";
  if (isNew) where.isNewArrival = isNew === "true";
  return await Product.findAll({ where, order: [["createdAt", "DESC"]] });
};

export const getProductBySlug = async (slug: string) => {
  return await Product.findOne({ where: { slug } });
};

export const createProduct = async (data: Record<string, unknown>) => {
  if (!data.slug && data.name) {
    data.slug = (data.name as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  return await Product.create(data);
};

export const getProductById = async (id: string) => {
  return await Product.findOne({ where: { id } });
};

export const updateProduct = async (id: string, data: Record<string, unknown>) => {
  const product = await Product.findOne({ where: { id } });
  if (!product) return null;
  if (data.name && !data.slug) {
    data.slug = (data.name as string)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  await product.update(data);
  return product;
};

export const deleteProduct = async (id: string) => {
  const product = await Product.findOne({ where: { id } });
  if (!product) return false;
  await product.destroy();
  return true;
};
