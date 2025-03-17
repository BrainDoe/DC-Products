import prisma from "../utils/prisma.util";
import { Request, Response } from "express";
import {
  getUnits,
  getUnitById,
  createUnit,
  updateUnit,
  deleteUnit,
} from "../services/unit.service";

export async function getUnitsHandler(
  _: Request,
  res: Response<
    | { responseCode: string; responseDescription: string; data: any }
    | { responseCode: string; responseDescription: string; message: string }
  >
) {
  try {
    const units = await getUnits();

    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: units,
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
}

export const getUnitByIdHandler = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const unit = await getUnitById(id);
    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: unit,
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};

export const createUnitHandler = async (
  req: Request<{}, {}, { name: string; abbreviation: string }>,
  res: Response
) => {
  const { name, abbreviation } = req.body;
  try {
    const unit = await createUnit({ name, abbreviation });
    res.status(201).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: unit,
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};

export const updateUnitHandler = async (
  req: Request<{ id: string }, {}, { name: string; abbreviation: string }>,
  res: Response
) => {
  const { id } = req.params;
  const { name, abbreviation } = req.body;
  try {
    const unit = await updateUnit(id, { name, abbreviation });
    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: unit,
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};

export const deleteUnitHandler = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const unit = await deleteUnit(id);
    res.status(200).json({
      responseCode: "00",
      responseDescription: "Successful",
      data: unit,
    });
  } catch (error: any) {
    res.status(500).json({
      responseCode: "11",
      responseDescription: "Failed",
      message: error.message,
    });
  }
};
