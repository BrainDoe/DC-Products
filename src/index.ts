import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import productsRouter from "./routes/products.route";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/v1/products", productsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
