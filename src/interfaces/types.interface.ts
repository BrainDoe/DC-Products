export type ResponseType<T> =
  | {
      responseCode: string;
      responseDescription: string;
      data: T;
    }
  | { responseCode: string; responseDescription: string; message: string };

export type PaginatedResponse<T> = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  // subcategories: {
  //   id: string;
  //   name: string;
  //   categoryId: string;
  //   createdAt: Date;
  //   updatedAt: Date;
  // }[];
  items: T;
};
