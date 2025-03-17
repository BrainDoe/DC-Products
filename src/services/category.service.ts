import prisma from "../utils/prisma.util";
import { CategoryTypeBody } from "../validation/controller.validation";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();

    return categories;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function getCategoryById(id: string) {
  try {
    const category = prisma.category.findUnique({
      where: {
        id,
      },
    });

    return category;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function createCategory(data: CategoryTypeBody) {
  try {
    const category = prisma.category.create({
      data,
    });

    return category;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function updateCategory(id: string, data: CategoryTypeBody) {
  try {
    const category = prisma.category.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return category;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function deleteCategory(id: string) {
  try {
    const category = prisma.category.delete({
      where: {
        id,
      },
    });

    return category;
  } catch (error: any) {
    throw new Error(error);
  }
}
