import { body, validationResult } from 'express-validator';

const validateUser = [
    body('name')
        .isLength({ min: 2, max: 30 })
        .withMessage('Name must be between 2 and 30 characters'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export default validateUser;
