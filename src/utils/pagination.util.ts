export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface ParamsResponse {
  skip: number;
  take: number;
  orderBy: { [x: string]: "asc" | "desc" };
}

export function getPaginationParams(params: PaginationParams): ParamsResponse {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = params.sortBy || "createdAt";
  const order = params.order || "desc";

  return { skip, take: limit, orderBy: { [sortBy]: order } };
}
