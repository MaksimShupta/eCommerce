import express from 'express';
import { login } from '../controllers/userController.js'; // Import the login function
import authMiddleware from '../middleware/authMiddleware.js'; // If needed for protected routes

const router = express.Router();

// Login route
router.post('/login', login); // The login route calls the login function from userController

// Example of a protected route (optional)
router.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user); // Respond with user data from the middleware
});

export default router;
