import { Router } from "express";
import {
  getSubcategoriesHandler,
  getSubcategoryByIdHandler,
  createSubcategoryHandler,
  updateSubcategoryHandler,
  deleteSubcategoryHandler,
} from "../controller/subcategory.controller";

const router = Router();

router.get("/", getSubcategoriesHandler);
router.get("/:id", getSubcategoryByIdHandler);
router.post("/create", createSubcategoryHandler);
router.put("/:id", updateSubcategoryHandler);
router.delete("/:id", deleteSubcategoryHandler);

export default router;
