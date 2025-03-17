import { z, string, object } from "zod";

export const createCategorySchema = object({
  body: object({
    name: string({ required_error: "Name is required" }),
  }),
  params: object({
    id: string({ required_error: "Id is required" }),
  }),
});

export type CategoryType = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = object({
  body: object({
    name: string({ required_error: "Name is required" }).optional(),
  }),
  params: object({
    id: string({ required_error: "Id is required" }),
  }),
});

export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;
export type CategoryTypeParams = z.infer<typeof createCategorySchema>["params"];
export type CategoryTypeBody = z.infer<typeof createCategorySchema>["body"];
