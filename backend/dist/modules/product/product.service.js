import db from '../../models/index.js';
const { Product } = db;
export const getAllProducts = async (query) => {
    const { category, featured, new: isNew } = query;
    const where = {};
    if (category)
        where.category = category;
    if (featured)
        where.featured = featured === 'true';
    if (isNew)
        where.isNewArrival = isNew === 'true';
    return await Product.findAll({ where, order: [['createdAt', 'DESC']] });
};
export const getProductBySlug = async (slug) => {
    return await Product.findOne({ where: { slug } });
};
export const createProduct = async (data) => {
    console.log("inside createPost");
    return await Product.create(data);
};
//# sourceMappingURL=product.service.js.map