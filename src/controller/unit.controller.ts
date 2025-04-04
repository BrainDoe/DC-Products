import prisma from "../utils/prisma.util";
import { NextFunction, Request, Response } from "express";
import {
  getUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
} from "../services/unit.service";
import { PaginatedResponse, ResponseType } from "../interfaces/types.interface";
import { Unit } from "@prisma/client";
import {
  createUnitSchema,
  UnitTypeBody,
  UnitTypeParams,
  updateUnitSchema,
  UpdateUnitType,
} from "../validation/unit.validation";
import {
  getPaginationParams,
  PaginationParams,
} from "../utils/pagination.util";
import { successResponse } from "../utils/successResponse.util";

export async function getUnitsHandler(
  req: Request<{}, {}, {}, PaginationParams>,
  res: Response<ResponseType<PaginatedResponse<Unit[]>>>,
  next: NextFunction
) {
  try {
    const { page, limit, sortBy, order } = req.query;
    const paginationParams = getPaginationParams({
      page,
      limit,
      sortBy,
      order,
    });
    const units = await getUnits(paginationParams, page);

    successResponse(res, units);
  } catch (error: any) {
    next(error);
  }
}

export const getUnitByIdHandler = async (
  req: Request<UnitTypeParams, {}, {}>,
  res: Response<ResponseType<Unit>>,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = createUnitSchema.pick({ params: true }).parse({ params: req.params });

    const unit = await getUnitById(id);

    successResponse(res, unit);
  } catch (error: any) {
    next(error);
  }
};

export const createUnitHandler = async (
  req: Request<{}, {}, UnitTypeBody>,
  res: Response<ResponseType<Unit>>,
  next: NextFunction
) => {
  try {
    const { body } = createUnitSchema
      .omit({ params: true })
      .parse({ body: req.body });

    const unit = await createUnit(body);

    successResponse(res, unit);
  } catch (error: any) {
    next(error);
  }
};

export const updateUnitHandler = async (
  req: Request<UnitTypeParams, {}, UpdateUnitType["body"]>,
  res: Response<ResponseType<Unit>>,
  next: NextFunction
) => {
  try {
    const {
      body,
      params: { id },
    } = updateUnitSchema.parse({ params: req.params, body: req.body });

    const unit = await updateUnit(id, body);

    successResponse(res, unit);
  } catch (error: any) {
    next(error);
  }
};

export const deleteUnitHandler = async (
  req: Request<UnitTypeParams, {}, {}>,
  res: Response<ResponseType<Unit>>,
  next: NextFunction
) => {
  try {
    const {
      params: { id },
    } = createUnitSchema.pick({ params: true }).parse({ params: req.params });

    const unit = await deleteUnit(id);

    successResponse(res, unit);
  } catch (error: any) {
    next(error);
  }
};
