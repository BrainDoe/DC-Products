import AppError from "../utils/appError.util";
import { ParamsResponse } from "../utils/pagination.util";
import prisma from "../utils/prisma.util";
import {
  ProductCreateTypeBody,
  ProductUpdateTypeBody,
} from "../validation/product.validation";

export async function getProducts(
  paginationParams: ParamsResponse,
  page?: number
) {
  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        skip: paginationParams.skip,
        take: paginationParams.take,
        orderBy: { name: paginationParams.orderBy.name },
      }),
      prisma.product.count(),
    ]);

    return {
      currentPage: Number(page) || 1,
      totalPages: Math.ceil(total / paginationParams.take),
      totalItems: total,
      items: products,
    };
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
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
        subcategory: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!product) {
      throw new AppError("No data found", 400);
    }

    return product;
  } catch (error: any) {
    throw error;
  }
}

export async function createProduct(data: ProductCreateTypeBody) {
  try {
    const product = await prisma.product.create({
      data,
    });

    return product;
  } catch (error: any) {
    throw error;
  }
}

export async function updateProduct(id: string, data: ProductUpdateTypeBody) {
  try {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });

    return product;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    const product = await prisma.product.delete({
      where: {
        id,
      },
    });

    return product;
  } catch (error: any) {
    throw error;
  }
}
