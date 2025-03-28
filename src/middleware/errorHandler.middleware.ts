import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError.util";
import { ZodError } from "zod";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong";

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

  if (err instanceof AppError) {
    console.log(err);
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    status: "error",
    message,
  });
};

export default errorHandler;
