const User = require('../models/user.model');

const userService = {
    // Create a new user
    createUser: async (userData) => {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    },

    // Get all users
    getAllUsers: async () => {
        try {
            return await User.find();
        } catch (error) {
            throw new Error('Error fetching users: ' + error.message);
        }
    },

    // Get user by ID
    getUserById: async (userId) => {
        try {
            return await User.findById(userId);
        } catch (error) {
            throw new Error('Error fetching user: ' + error.message);
        }
    },

    // Update user
    updateUser: async (userId, updateData) => {
        try {
            return await User.findByIdAndUpdate(
                userId,
                updateData,
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    },

    // Delete user
    deleteUser: async (userId) => {
        try {
            return await User.findByIdAndDelete(userId);
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    }
};

module.exports = userService; 