import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import categoryRouter from "./router/categoryRouter.js";
import orderRouter from "./router/orderRouter.js";
import productRouter from "./router/productRouter.js";
import userRouter from "./router/userRouter.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("hello world from nodejs!!!!!");
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/categories", categoryRouter);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`server running on port ${PORT} ->  http://localhost:${PORT}/`)
  );
};

startServer();
