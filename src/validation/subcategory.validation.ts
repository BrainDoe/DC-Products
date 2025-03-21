import { z, string, object } from "zod";

export const createSubcategorySchema = object({
  body: object({
    name: string({ required_error: "Name is required" }).min(3),
    categoryId: string({ required_error: "Category Id is required" }),
  }),
  params: object({
    id: string({ required_error: "Id is required" }).uuid(),
  }),
});

export type SubcategoryType = z.infer<typeof createSubcategorySchema>;

export const updateSubcategorySchema = object({
  body: object({
    name: string({ required_error: "Name is required" }).optional(),
    categoryId: string({
      required_error: "Category Id is required",
    }).optional(),
  }),
  params: object({
    id: string({ required_error: "Id is required" }),
  }),
});

export type UpdateSubcategoryType = z.infer<typeof updateSubcategorySchema>;
export type SubcategoryTypeParams = z.infer<
  typeof createSubcategorySchema
>["params"];
export type SubcategoryTypeBody = z.infer<
  typeof createSubcategorySchema
>["body"];
