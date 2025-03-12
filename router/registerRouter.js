import { Router } from 'express';
import { login } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const registerRouter = Router();

// Login route (No validation since it's not in the schema)
registerRouter.post('/', login);

export default registerRouter;
