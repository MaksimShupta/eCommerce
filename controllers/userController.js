import { sequelize, connectDB } from '../db/index.js';
import models from '../models/index.js';

const { User } = models;
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await user.findAll();
        res.status(200).json({ success: true, data: allUsers });
    } catch (error) {
        console.error('error by fetching all users:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('user data:', name, email, password);
        const newUser = await user.create({ name, email, password });
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error('error by creating a user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const searchedUser = await user.findByPk(id);
        if (!searchedUser) {
            return res
                .status(404)
                .json({ success: false, error: 'User not found' });
        } else {
            console.log('user data:', name, email, password);
            res.status(200).json({ success: true, data: searchedUser });
        }
    } catch (error) {
        console.error('error by getting a user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('user id:', id);
        const { name, email, password } = req.body;
        const updatedUser = await user.findByPk(id);
        if (!updatedUser) {
            return res
                .status(404)
                .json({ success: false, error: 'User not found' });
        } else {
            await updatedUser.update({ name, email, password });
            res.status(200).json({ success: true, data: updatedUser });
        }
    } catch (error) {
        console.error('error by updating a user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('user id:', id);
        const findUser = await user.findByPk(id);

        if (!findUser) {
            return res
                .status(404)
                .json({ success: false, error: 'User not found' });
        }
        await findUser.destroy({ where: { id } });
        console.log('The user was succsessfully deleted!');
        res.status(200).json({ success: true, data: findUser });
    } catch (error) {
        console.error('error by deleting a user:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: '1h' } // Optional: token expiration
        );

        // Send token back to client
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
