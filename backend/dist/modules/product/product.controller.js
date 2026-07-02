import * as productService from "./product.service.js";
import { createProductSchema } from "./product.validation.js";
export const list = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query);
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const show = async (req, res) => {
    try {
        const product = await productService.getProductBySlug(req.params.slug);
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        res.json(product);
    }
    catch (err) {
        res.status(500).json({
            error: err.message,
        });
    }
};
export const createPost = async (req, res) => {
    try {
        const parsed = createProductSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                error: "Validation failed",
                issues: parsed.error.issues,
            });
        }
        const validatedData = parsed.data;
        const product = await productService.createProduct(validatedData);
        res.status(201).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
//# sourceMappingURL=product.controller.js.map