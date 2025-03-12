import { Router, Request, Response } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  getProductBySubcategoryHandler,
  getProductsHandler,
  getProductsByCategoryHandler,
  getProductsByPriceHandler,
  updateProductHandler,
} from "../controller/products.controller";

const router = Router();

router.get("/", getProductsHandler);
router.post("/create", createProductHandler);
router.delete("/delete/:id", deleteProductHandler);
router.get("/single/:id", getProductByIdHandler);
router.get("/subcategory/:subcategory", getProductBySubcategoryHandler);
router.get("/category/:category", getProductsByCategoryHandler);
router.get("/price/:price", getProductsByPriceHandler);
router.put("/update/:id", updateProductHandler);

export default router;
