import { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";
import * as productService from "./product.service.js";

export const list = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts(req.query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductBySlug(
      req.params.slug as string,
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({
      error: (err as Error).message,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({ error: "Slug already exists" });
    }

    console.error(err);
    res.status(500).json({ error: (err as Error).message });
  }
};
