import { Router } from 'express';
import { login } from '../controllers/userController.js';
import validateSchema from '../middleware/validateSchema.js';
import userSchema from '../schemas/user.js';

const registerRouter = Router();

// Login route (No validation since it's not in the schema)
registerRouter.post('/', validateSchema(userSchema), login);

export default registerRouter;
