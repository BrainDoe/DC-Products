import { z, string, object } from "zod";

export const createUnitSchema = object({
  body: object({
    name: string({ required_error: "Name is required" }).min(3),
    abbreviation: string({ required_error: "Abbreviation is required" })
      .min(1)
      .toUpperCase(),
  }),
  params: object({
    id: string({ required_error: "Id is required" }).uuid(),
  }),
});

export const updateUnitSchema = object({
  body: object({
    name: string().optional(),
    abbreviation: string().optional(),
  }),
  params: object({
    id: string({ required_error: "Id is required" }).uuid(),
  }),
});

export type UnitType = z.infer<typeof createUnitSchema>;
export type UpdateUnitType = z.infer<typeof updateUnitSchema>;
export type UnitTypeParams = z.infer<typeof createUnitSchema>["params"];
export type UnitTypeBody = z.infer<typeof createUnitSchema>["body"];
