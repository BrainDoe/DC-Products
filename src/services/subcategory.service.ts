import AppError from "../utils/appError.util";
import { ParamsResponse } from "../utils/pagination.util";
import prisma from "../utils/prisma.util";
import {
  SubcategoryTypeBody,
  UpdateSubcategoryType,
} from "../validation/subcategory.validation";

export async function getSubcategories(
  paginationParams: ParamsResponse,
  page?: number
) {
  try {
    const [subcategories, total] = await Promise.all([
      prisma.subcategory.findMany({
        skip: paginationParams.skip,
        take: paginationParams.take,
        orderBy: { name: paginationParams.orderBy.name },
      }),
      prisma.subcategory.count(),
    ]);

    return {
      currentPage: Number(page) || 1,
      totalPages: Math.ceil(total / paginationParams.take),
      totalItems: total,
      items: subcategories,
    };
  } catch (error: any) {
    throw error;
  }
}

export async function getSubcategoryById(id: string) {
  try {
    const subcategory = await prisma.subcategory.findUnique({
      where: {
        id,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!subcategory) {
      throw new AppError("No data found", 400);
    }

    return subcategory;
  } catch (error: any) {
    throw error;
  }
}

export function createSubcategory(data: SubcategoryTypeBody) {
  try {
    const subcategory = prisma.subcategory.create({
      data,
    });

    return subcategory;
  } catch (error: any) {
    throw error;
  }
}

export function updateSubcategory(
  id: string,
  data: UpdateSubcategoryType["body"]
) {
  try {
    const subcategory = prisma.subcategory.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return subcategory;
  } catch (error: any) {
    throw error;
  }
}

export function deleteSubcategory(id: string) {
  try {
    const subcategory = prisma.subcategory.delete({
      where: {
        id,
      },
    });

    return subcategory;
  } catch (error: any) {
    throw error;
  }
}
