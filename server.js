import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/index.js';

// Importing routes
import categoryRouter from './router/categoryRouter.js';
import orderRouter from './router/orderRouter.js';
import productRouter from './router/productRouter.js';
import userRouter from './router/userRouter.js';
import registerRouter from './router/registerRouter.js';

// Importing middleware
import errorHandler from './middleware/errorHandler.js';
import limiter from './middleware/limiter.js';
import logger from './middleware/logger.js';
import authMiddleware from './middleware/authMiddleware.js'; // Import authMiddleware

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

// Middlewares
app.use(express.json());
app.use(logger);
app.use(limiter);

// Routes
app.use('/api/register', registerRouter); // register route should be open without authentication

// Apply `authMiddleware` globally to protect routes except the login route
app.use('/api/products', authMiddleware, productRouter);
app.use('/api/orders', authMiddleware, orderRouter);
app.use('/api/categories', authMiddleware, categoryRouter);
app.use('/api/users', authMiddleware, userRouter); // Protect user routes too (except login route)

// Error Handling
app.use(errorHandler);

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () =>
        console.log(
            `server running on port ${PORT} ->  http://localhost:${PORT}/`
        )
    );
};

startServer();
