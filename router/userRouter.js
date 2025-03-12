import { Router } from 'express';
import {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    login,
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import validateSchema from '../middleware/validateSchema.js';
import userSchema from '../validation/userSchema.js';

const userRouter = Router();

// Routes with validation middleware
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', validateSchema(userSchema), createUser);
userRouter.put('/:id', validateSchema(userSchema), updateUser);
userRouter.delete('/:id', deleteUser);

// Login route (No validation since it's not in the schema)
userRouter.post('/login', login);

// Protected route (example)
userRouter.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user);
});

export default userRouter;
