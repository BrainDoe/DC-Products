import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/product.service";
import { NextFunction, Request, Response } from "express";
import { PaginatedResponse, ResponseType } from "../interfaces/types.interface";
import {
  createProductSchema,
  ProductCreateTypeBody,
  ProductTypeParams,
  ProductUpdateTypeBody,
  updateProductSchema,
} from "../validation/product.validation";
import { Product } from "@prisma/client";
import {
  getPaginationParams,
  PaginationParams,
} from "../utils/pagination.util";
import { successResponse } from "../utils/successResponse.util";

export const getProductsHandler = async (
  req: Request<{}, {}, {}, PaginationParams>,
  res: Response<ResponseType<PaginatedResponse<Product[]>>>,
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

    const products = await getProducts(paginationParams, page);

    // res.status(200).json({
    //   responseCode: "00",
    //   responseDescription: "Successful",
    //   data: products,
    // });
    successResponse(res, products);
  } catch (error: any) {
    next(error);
  }
};

export const getProductByIdHandler = async (
  req: Request<ProductTypeParams, {}, {}>,
  res: Response<ResponseType<Product>>,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = createProductSchema
      .pick({ params: true })
      .parse({ params: req.params });

    const product = await getProductById(id);

    successResponse(res, product);
  } catch (error: any) {
    next(error);
  }
};

export const createProductHandler = async (
  req: Request<{}, {}, ProductCreateTypeBody>,
  res: Response<ResponseType<Product>>,
  next: NextFunction
) => {
  try {
    const { body } = createProductSchema
      .omit({ params: true })
      .parse({ body: req.body });

    const product = await createProduct(body);

    successResponse(res, product);
  } catch (error: any) {
    next(error);
  }
};

export const updateProductHandler = async (
  req: Request<ProductTypeParams, {}, ProductUpdateTypeBody>,
  res: Response<ResponseType<Product>>,
  next: NextFunction
) => {
  try {
    const {
      body,
      params: { id },
    } = updateProductSchema.parse({ body: req.body, params: req.params });
    const product = await updateProduct(id, body);

    successResponse(res, product);
  } catch (error: any) {
    next(error);
  }
};

export const deleteProductHandler = async (
  req: Request<ProductTypeParams, {}, {}>,
  res: Response<ResponseType<Product>>,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = createProductSchema.omit({ body: true }).parse({ params: req.params });

    const product = await deleteProduct(id);

    successResponse(res, product);
  } catch (error: any) {
    next(error);
  }
};
