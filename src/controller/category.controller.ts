import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../services/category.service";
import { Request, Response } from "express";
import { ResponseType } from "../interfaces/types.interface";
import {
  CategoryType,
  UpdateCategoryType,
  createCategorySchema,
  updateCategorySchema,
  CategoryTypeParams,
  CategoryTypeBody,
} from "../validation/category.validation";

export const getCategoriesHandler = async (
  _: Request,
  res: Response<ResponseType>
) => {
  try {
    const categories = await getCategories();

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};

export const getCategoryByIdHandler = async (
  req: Request<CategoryTypeParams, {}, {}>,
  res: Response<ResponseType>
) => {
  const {
    params: { id },
  } = createCategorySchema.pick({ params: true }).parse({ params: req.params });
  try {
    const category = await getCategoryById(id);

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};

export const createCategoryHandler = async (
  req: Request<{}, {}, CategoryTypeBody>,
  res: Response<ResponseType>
) => {
  try {
    const { body } = createCategorySchema
      .omit({ params: true })
      .parse({ body: req.body });
    const category = await createCategory(body);

    res.status(201).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};

export const updateCategoryHandler = async (
  req: Request<CategoryTypeParams, {}, UpdateCategoryType>,
  res: Response<ResponseType>
) => {
  try {
    const {
      body,
      params: { id },
    } = createCategorySchema.parse({ body: req.body, params: req.params });
    const category = await updateCategory(id, body);

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};

export const deleteCategoryHandler = async (
  req: Request<CategoryTypeParams, {}, {}>,
  res: Response<ResponseType>
) => {
  try {
    const {
      params: { id },
    } = createCategorySchema
      .pick({ params: true })
      .parse({ params: req.params.id });
    const category = await deleteCategory(id);

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: category,
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};
