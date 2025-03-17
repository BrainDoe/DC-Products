import { Router } from "express";
import {
  getUnitsHandler,
  getUnitByIdHandler,
  createUnitHandler,
  updateUnitHandler,
  deleteUnitHandler,
} from "../controller/unit.controller";

const unitRouter = Router();

unitRouter.post("/create", createUnitHandler);
unitRouter.get("/", getUnitsHandler);
unitRouter.get("/:id", getUnitByIdHandler);
unitRouter.put("/:id", updateUnitHandler);
unitRouter.delete("/:id", deleteUnitHandler);

export default unitRouter;
