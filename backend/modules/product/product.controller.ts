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

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await productService.getProductById(id);
    if (product) {
    res.status(200).json(product)
    } else {
      res.status(404).json({error:"Product not found"})
    }
  } catch (err) {
    res.status(404).json({error:(err as Error).message})
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const product = await productService.updateProduct(id, req.body);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({ error: "Slug already exists" });
    }
    res.status(500).json({ error: (err as Error).message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = await productService.deleteProduct(id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
