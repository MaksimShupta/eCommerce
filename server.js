import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/index.js';

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();
// Middlewares
app.use(express.json());
app.use(express.json());
app.use(logger);
app.use(limiter);

// // Routes
app.get('/', (req, res) => {
    res.send('hello world from nodejs!!!!!');
});

// Error Handling (must be the last middleware)
app.use(errorHandler);

// Example: Protect a route
// app.get("/profile", authMiddleware, (req, res) => {
//     res.json({ user: req.user });
// });

// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () =>
        console.log(
            `server running on port ${PORT} ->  http://localhost:${PORT}/`
        )
    );
};

startServer();
