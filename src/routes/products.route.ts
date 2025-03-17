import { Router } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  getProductByIdHandler,
  getProductBySubcategoryHandler,
  getProductsHandler,
  getProductsByCategoryHandler,
  getProductsByPriceHandler,
  updateProductHandler,
  getUnitsHandler,
  getUnitByIdHandler,
} from "../controller/products.controller";
// import { getUnitsHandler } from "../controller/unit.controller";

const productRouter = Router();

productRouter.get("/units", getUnitsHandler);
productRouter.get("/unit/:id", getUnitByIdHandler);
productRouter.get("/", getProductsHandler);
productRouter.post("/create", createProductHandler);
productRouter.delete("/delete/:id", deleteProductHandler);
productRouter.get("/single/:id", getProductByIdHandler);
productRouter.get("/subcategory/:subcategory", getProductBySubcategoryHandler);
productRouter.get("/category/:category", getProductsByCategoryHandler);
productRouter.get("/price/:price", getProductsByPriceHandler);
productRouter.put("/update/:id", updateProductHandler);

export default productRouter;
