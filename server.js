import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.send("hello world from nodejs!!!!!");
});

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () =>
        console.log(
            `server running on port ${PORT} ->  http://localhost:${PORT}/`
        )
    );
};

startServer();
