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
