import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.util";
import { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  console.log(err);

  // Check if the error is a ZodError
  if (err instanceof ZodError) {
    statusCode = 400;
    const formattedErrors = err.errors.map((e) => ({
      path: e.path[1],
      message: e.message,
    }));
    return res.status(statusCode).json({
      status: "fail",
      errors: formattedErrors,
    });
  }

  if (err instanceof PrismaClientKnownRequestError) {
    (statusCode = 400), (message = err.meta?.cause as string);
  }

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  console.log(err);
  res.status(statusCode).json({
    error: err,
    status: "error",
    message,
  });
};

export default errorHandler;
