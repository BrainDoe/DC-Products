import AppError from "../utils/appError.util";
import { ParamsResponse } from "../utils/pagination.util";
import prisma from "../utils/prisma.util";
import { UpdateUnitType } from "../validation/unit.validation";

export async function getUnits(
  paginationParams: ParamsResponse,
  page?: number
) {
  try {
    const [units, total] = await Promise.all([
      prisma.unit.findMany({
        skip: paginationParams.skip,
        take: paginationParams.take,
        orderBy: { name: paginationParams.orderBy.name },
      }),
      prisma.unit.count(),
    ]);

    return {
      currentPage: Number(page) || 1,
      totalPages: Math.ceil(total / paginationParams.take),
      totalItems: total,
      items: units,
    };
  } catch (error: any) {
    throw error;
  }
}

export async function getUnitById(id: string) {
  try {
    const unit = await prisma.unit.findUnique({
      where: {
        id,
      },
    });

    if (!unit) {
      throw new AppError("No data found", 400);
    }

    return unit;
  } catch (error: any) {
    throw error;
  }
}

export async function createUnit(data: { name: string; abbreviation: string }) {
  try {
    const unit = await prisma.unit.create({
      data,
    });

    return unit;
  } catch (error: any) {
    throw error;
  }
}

export async function updateUnit(id: string, data: UpdateUnitType["body"]) {
  try {
    const unit = await prisma.unit.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return unit;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteUnit(id: string) {
  try {
    const unit = await prisma.unit.delete({
      where: {
        id,
      },
    });

    return unit;
  } catch (error: any) {
    throw error;
  }
}
