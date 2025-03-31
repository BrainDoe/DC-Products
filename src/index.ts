import "dotenv/config";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import AppError from "./utils/appError.util";
import errorHandler from "./middleware/errorHandler.middleware";

import unitRouter from "./routes/unit.route";
import categoryRouter from "./routes/category.route";
import subcategoryRouter from "./routes/subcategory.route";
import productRouter from "./routes/product.route";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/v1/units", unitRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subcategoryRouter);
app.use("/api/v1/products", productRouter);

// Catch 404 and forward to error handler
app.use((_: Request, _res: Response, next: NextFunction) => {
  next(new AppError("This route does not exist", 404));
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  errorHandler(err, req, res, next);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
