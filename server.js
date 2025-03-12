import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/index.js';

//importing routes
import categoryRouter from './router/categoryRouter.js';
import orderRouter from './router/orderRouter.js';
import productRouter from './router/productRouter.js';
import userRouter from './router/userRouter.js';

//importing middleware
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

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/categories', categoryRouter);

// Error Handling (must be the last middleware)
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
