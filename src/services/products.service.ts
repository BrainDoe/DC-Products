import prisma from "../utils/prisma.util";

export async function getUnits() {
  try {
    const units = await prisma.unit.findMany();

    return units;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function getUnitById(id: string) {
  try {
    const unit = prisma.unit.findUnique({
      where: {
        id,
      },
    });

    return unit;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function createUnit(data: { name: string; abbreviation: string }) {
  try {
    const unit = prisma.unit.create({
      data,
    });

    return unit;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function updateUnit(
  id: string,
  data: { name: string; abbreviation: string }
) {
  try {
    const unit = prisma.unit.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return unit;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function deleteUnit(id: string) {
  try {
    const unit = prisma.unit.delete({
      where: {
        id,
      },
    });

    return unit;
  } catch (error: any) {
    throw new Error(error);
  }
}

export function getProducts() {
  return "Hello, world!";
}

export function getProductById(id: string) {
  return `Product with id ${id}`;
}

export function createProduct() {
  return "Product created!";
}

export function updateProduct(id: string) {
  return `Product with id ${id} updated!`;
}

export function deleteProduct(id: string) {
  return `Product with id ${id} deleted!`;
}

export function getProductsByCategory(category: string) {
  return `Products in category ${category}`;
}

export function getProductsByPrice(price: number) {
  return `Products with price less than ${price}`;
}

export function getProductsBySubcategory(subcategory: string) {
  return `Products in subcategory ${subcategory}`;
}
