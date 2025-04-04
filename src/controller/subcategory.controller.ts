import {
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
} from "../services/subcategory.service";
import { NextFunction, Request, Response } from "express";
import { PaginatedResponse, ResponseType } from "../interfaces/types.interface";
import {
  SubcategoryTypeBody,
  SubcategoryTypeParams,
  UpdateSubcategoryType,
  createSubcategorySchema,
  updateSubcategorySchema,
} from "../validation/subcategory.validation";
import { Subcategory } from "@prisma/client";
import {
  getPaginationParams,
  PaginationParams,
} from "../utils/pagination.util";
import { successResponse } from "../utils/successResponse.util";

export const getSubcategoriesHandler = async (
  req: Request<{}, {}, {}, PaginationParams>,
  res: Response<ResponseType<PaginatedResponse<Subcategory[]>>>,
  next: NextFunction
) => {
  try {
    const { page, limit, sortBy, order } = req.query;
    const paginationParams = getPaginationParams({
      page,
      limit,
      sortBy,
      order,
    });

    // const paginationParams = getPaginationParams({
    //   page: page ? parseInt(page as string, 10) : undefined,
    //   limit: limit ? parseInt(limit as string, 10) : undefined,
    //   sortBy: sortBy as string,
    //   order: order as "asc" | "desc",
    // });

    const subcategories = await getSubcategories(paginationParams, page);

    successResponse(res, subcategories);
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

    successResponse(res, subcategory);
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

    successResponse(res, subcategory);
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

    successResponse(res, subcategory);
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

    const subcategory = await deleteSubcategory(id);

    successResponse(res, subcategory);
  } catch (error: any) {
    next(error);
  }
};
