import { Router } from "express";
import express from 'express';
import { login } from '../controllers/userController.js'; // Import the login function
import authMiddleware from '../middleware/authMiddleware.js'; // If needed for protected routes

import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

// Login route
userRouter.post('/login', login); // The login route calls the login function from userController

// Example of a protected route (optional)
userRouter.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user); // Respond with user data from the middleware
});

export default userRouter;
