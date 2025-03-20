import {
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
  getSubcategoryById,
  updateSubcategory,
} from "../services/subcategory.service";
import { Request, Response } from "express";
import { ResponseType } from "../interfaces/types.interface";
import {
  SubcategoryType,
  SubcategoryTypeBody,
  SubcategoryTypeParams,
  UpdateSubcategoryType,
  createSubcategorySchema,
  updateSubcategorySchema,
} from "../validation/subcategory.validation";

export const getSubcategoriesHandler = async (
  _: Request,
  res: Response<ResponseType>
) => {
  try {
    const subcategories = await getSubcategories();

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: subcategories,
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};

export const getSubcategoryByIdHandler = async (
  req: Request<SubcategoryTypeParams, {}, {}>,
  res: Response<ResponseType>
) => {
  try {
    // console.log(req.params.id);
    // const { params } = createSubcategorySchema
    //   .pick({ params: true })
    //   .parse({ params: req.params.id });

    // console.log(id);

    const subcategory = await getSubcategoryById(req.params.id);

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: subcategory,
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};

export const createSubcategoryHandler = async (
  req: Request<{}, {}, SubcategoryTypeBody>,
  res: Response<ResponseType>
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
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};

export const updateSubcategoryHandler = async (
  req: Request<SubcategoryTypeParams, {}, UpdateSubcategoryType["body"]>,
  res: Response<ResponseType>
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
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};

export const deleteSubcategoryHandler = async (
  req: Request<SubcategoryTypeParams, {}, {}>,
  res: Response<ResponseType>
) => {
  const {
    params: { id },
  } = createSubcategorySchema
    .omit({ body: true })
    .parse({ params: req.params.id });
  try {
    await deleteSubcategory(id);

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      message: "Subcategory deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};
