import prisma from "../utils/prisma.util";
import {
  SubcategoryTypeBody,
  SubcategoryTypeParams,
  UpdateSubcategoryType,
} from "../validation/subcategory.validation";

export async function getSubcategories() {
  try {
    const subcategories = await prisma.subcategory.findMany();

    return subcategories;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function getSubcategoryById(id: string) {
  try {
    const subcategory = prisma.subcategory.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    return subcategory;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function createSubcategory(data: SubcategoryTypeBody) {
  try {
    const subcategory = prisma.subcategory.create({
      data,
    });

    return subcategory;
  } catch (error: any) {
    throw new Error(error);
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
    throw new Error(error);
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
    throw new Error(error);
  }
}
