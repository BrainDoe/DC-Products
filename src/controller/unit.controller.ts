import prisma from "../utils/prisma.util";
import { NextFunction, Request, Response } from "express";
import {
  getUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
} from "../services/unit.service";
import { ResponseType } from "../interfaces/types.interface";
import { Unit } from "@prisma/client";
import {
  createUnitSchema,
  UnitTypeBody,
  UnitTypeParams,
  updateUnitSchema,
  UpdateUnitType,
} from "../validation/unit.validation";

export async function getUnitsHandler(
  _: Request,
  res: Response<ResponseType<Unit[]>>,
  next: NextFunction
) {
  try {
    const units = await getUnits();

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: units,
    });
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

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: unit,
    });
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
    res.status(201).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: unit,
    });
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

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: unit,
    });
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

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: unit,
    });
  } catch (error: any) {
    next(error);
  }
};
