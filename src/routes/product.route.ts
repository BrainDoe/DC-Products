import { Router } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} from "../controller/product.controller";

const router = Router();

router.get("/", getProductsHandler);
router.get("/:id", getProductByIdHandler);
router.post("/create", createProductHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;
