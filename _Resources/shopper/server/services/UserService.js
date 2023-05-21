/** @module UserService */

// Import the User model from mongoose
const UserModel = require("../models/User");

/**
 * Service class for managing users
 */
class UserService {
  /**
   * Get all users
   * @returns {Promise<Array>} - A promise that resolves to an array of users
   */
  static async getAll() {
    return UserModel.find({}).sort({ createdAt: -1 });
  }

  /**
   * Get a user by ID
   * @param {string} userId - The ID of the user to retrieve
   * @returns {Promise<Object|null>} - A promise that resolves to the user, or
   * null if no user was found
   */
  static async getOne(userId) {
    return UserModel.findById(userId).exec();
  }

  /**
   * Create a new user
   * @param {Object} data - The data for the new user
   * @returns {Promise<Object>} - A promise that resolves to the new user
   */
  static async create(data) {
    const user = new UserModel(data);
    return user.save();
  }

  /**
   * Authenticate a user
   * @param {string} email - The email address
   * @param {string} password - The email password
   * @returns {Promise<Object>} - A promise that either returns the authenticated user or false
   */
  static async authenticate(email, password) {
    const maybeUser = await UserModel.findOne({ email });
    if (!maybeUser) return false;
    const validPassword = await maybeUser.comparePassword(password);
    if (!validPassword) return false;
    return maybeUser;
  }

  /**
   * Update a user's data
   * @param {string} userId - The ID of the user to update
   * @param {Object} data - The new data for the user
   * @returns {Promise<Object>} - A promise that resolves to the updated user
   */
  static async update(userId, data) {
    // Fetch the user first
    const user = await UserModel.findById(userId);
    user.email = data.email;
    user.isAdmin = data.isAdmin;

    // Only set the password if it was modified
    if (data.password) {
      user.password = data.password;
    }

    return user.save();
  }

  /**
   * Remove a user
   * @param {string} userId - The ID of the user to remove
   * @returns {Promise<Object>} - A promise that resolves to the result of the
   * delete operation
   */
  static async remove(userId) {
    return UserModel.deleteOne({ _id: userId }).exec();
  }
}

module.exports = UserService;
