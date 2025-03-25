import {
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
} from "../services/subcategory.service";
import { NextFunction, Request, Response } from "express";
import { ResponseType } from "../interfaces/types.interface";
import {
  SubcategoryType,
  SubcategoryTypeBody,
  SubcategoryTypeParams,
  UpdateSubcategoryType,
  createSubcategorySchema,
  updateSubcategorySchema,
} from "../validation/subcategory.validation";
import { Subcategory } from "@prisma/client";

export const getSubcategoriesHandler = async (
  _: Request,
  res: Response<ResponseType<Subcategory[]>>,
  next: NextFunction
) => {
  try {
    const subcategories = await getSubcategories();

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: subcategories,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getSubcategoryByIdHandler = async (
  req: Request<SubcategoryTypeParams, {}, {}>,
  res: Response<ResponseType<Subcategory>>,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = createSubcategorySchema
      .pick({ params: true })
      .parse({ params: req.params });

    const subcategory = await getSubcategoryById(id);

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: subcategory,
    });
  } catch (error: any) {
    next(error);
  }
};

export const createSubcategoryHandler = async (
  req: Request<{}, {}, SubcategoryTypeBody>,
  res: Response<ResponseType<Subcategory>>,
  next: NextFunction
) => {
  try {
    const { body } = createSubcategorySchema
      .omit({ params: true })
      .parse({ body: req.body });

    const subcategory = await createSubcategory(body);

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: subcategory,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateSubcategoryHandler = async (
  req: Request<SubcategoryTypeParams, {}, UpdateSubcategoryType["body"]>,
  res: Response<ResponseType<Subcategory>>,
  next: NextFunction
) => {
  try {
    const {
      body,
      params: { id },
    } = updateSubcategorySchema.parse({ body: req.body, params: req.params });
    const subcategory = await updateSubcategory(id, body);

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: subcategory,
    });
  } catch (error: any) {
    next(error);
  }
};

export const deleteSubcategoryHandler = async (
  req: Request<SubcategoryTypeParams, {}, {}>,
  res: Response<ResponseType<Subcategory>>,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = createSubcategorySchema
      .omit({ body: true })
      .parse({ params: req.params });

    const response = await deleteSubcategory(id);

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: response,
    });
  } catch (error: any) {
    next(error);
  }
};
