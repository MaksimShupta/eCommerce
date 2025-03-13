import models from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const { User } = models;
export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll();
        res.status(200).json({ success: true, data: allUsers });
    } catch (error) {
        console.error('error by fetching all users:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('User data:', name, email, password);
        const newUser = await User.create({ name, email, password });
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error('error by creating a User:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const searchedUser = await User.findByPk(id);
        if (!searchedUser) {
            return res
                .status(404)
                .json({ success: false, error: 'User not found' });
        } else {
            console.log(
                'User data:',
                searchedUser.name,
                searchedUser.email,
                searchedUser.password
            );
            res.status(200).json({ success: true, data: searchedUser });
        }
    } catch (error) {
        console.error('error by getting a User:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('User id:', id);
        const { name, email, password } = req.body;
        const updatedUser = await User.findByPk(id);
        if (!updatedUser) {
            return res
                .status(404)
                .json({ success: false, error: 'User not found' });
        } else {
            await updatedUser.update({ name, email, password });
            res.status(200).json({ success: true, data: updatedUser });
        }
    } catch (error) {
        console.error('error by updating a User:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('User id:', id);
        const findUser = await User.findByPk(id);

        if (!findUser) {
            return res
                .status(404)
                .json({ success: false, error: 'User not found' });
        }
        await findUser.destroy({ where: { id } });
        console.log('The User was succsessfully deleted!');
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: findUser,
        });
    } catch (error) {
        console.error('error by deleting a User:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
export const login = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Find the User by email
        let foundUser = await User.scope('withPassword').findOne({
            where: { email },
        });

        if (!foundUser) {
            foundUser = await User.create({ name, email, password });

            // return res.status(404).json({ message: 'User not found' });
        }
        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign(
            { id: foundUser.id }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: 3600000 } // Optional: token expiration
        );
        // Send token back to client
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
