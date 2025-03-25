import AppError from "../utils/appError.util";
import prisma from "../utils/prisma.util";
import { CategoryTypeBody } from "../validation/category.validation";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error: any) {
    throw error;
  }
}

export async function getCategoryById(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new AppError("No data found", 400);
    }

    return category;
  } catch (error: any) {
    throw error;
  }
}

export async function createCategory(data: CategoryTypeBody) {
  try {
    const category = await prisma.category.create({
      data,
    });

    return category;
  } catch (error: any) {
    throw error;
  }
}

export async function updateCategory(id: string, data: CategoryTypeBody) {
  try {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return category;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteCategory(id: string) {
  try {
    const category = await prisma.category.delete({
      where: {
        id,
      },
    });

    return category;
  } catch (error: any) {
    throw error;
  }
}
