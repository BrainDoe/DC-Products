import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getProductsByCategory,
  getProductsByPrice,
  getProductsBySubcategory,
  updateProduct,
} from "../services/products.service";
import { Request, Response } from "express";

export const getProductsHandler = async (_: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductByIdHandler = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createProductHandler = async (_: Request, res: Response) => {
  try {
    const product = await createProduct();
    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProductHandler = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const product = await updateProduct(id);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProductHandler = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const product = await deleteProduct(id);
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByCategoryHandler = async (
  req: Request<{ category: string }, {}, {}>,
  res: Response
) => {
  const { category } = req.params;
  try {
    const products = await getProductsByCategory(category);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductsByPriceHandler = async (
  req: Request<{ price: number }, {}, {}>,
  res: Response
) => {
  const { price } = req.params;
  try {
    const products = await getProductsByPrice(price);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductBySubcategoryHandler = async (
  req: Request<{ subcategory: string }, {}, {}>,
  res: Response
) => {
  const { subcategory } = req.params;
  try {
    const products = await getProductsBySubcategory(subcategory);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
