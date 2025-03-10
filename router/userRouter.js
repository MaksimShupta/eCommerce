import express from 'express';
import validateUser from '../middleware/validateUser.js';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

// Apply validateUser before the controller function
router.post('/register', validateUser, registerUser);

export default router;
