import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import categoryRouter from "./router/categoryRouter.js";
import orderRouter from "./router/orderRouter.js";
import productRouter from "./router/productRouter.js";
import userRouter from "./router/userRouter.js";

import errorHandler from './middleware/errorHandler.js';
import limiter from './middleware/limiter.js';
import logger from './middleware/logger.js';

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

// Middlewares
app.use(express.json());
app.use(logger);
app.use(limiter);

app.get("/", (req, res) => {
  res.send("hello world from nodejs!!!!!");
});
app.use('/api/users', userRoutes);

// Error Handling (must be the last middleware)
app.use(errorHandler);

// Example: Protect a route
// app.get("/profile", authMiddleware, (req, res) => {
//     res.json({ user: req.user });
// });

// Start the server

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
