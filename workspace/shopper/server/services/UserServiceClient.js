/** @module UserService */

const ServiceClient = require("./ServiceClient");

/**
 * Service class for managing users
 */
class UserServiceClient {
  /**
   * Authenticate a user
   * @param {string} email - The email address
   * @param {string} password - The email password
   * @returns {Promise<Object>} - A promise that either returns the authenticated user or null
   */
  static async authenticate(email, password) {
    try {
      return ServiceClient.callService("user-service", {
        method: "post",
        url: `/users/authenticate`,
        data: { email, password }
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Get all users
   * @returns {Promise<Array>} - A promise that resolves to an array of users
   */
  static async getAll() {
    try {
      return ServiceClient.callService("user-service", {
        method: "get",
        url: `/users`
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Get a user by ID
   * @param {string} userId - The ID of the user to retrieve
   * @returns {Promise<Object|null>} - A promise that resolves to the user, or
   * null if no user was found
   */
  static async getOne(userId) {
    try {
      return ServiceClient.callService("user-service", {
        method: "get",
        url: `/users/${userId}`
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Create a new user
   * @param {Object} data - The data for the new user
   * @returns {Promise<Object>} - A promise that resolves to the new user
   */
  static async create(data) {
    try {
      return ServiceClient.callService("user-service", {
        method: "post",
        url: `/users`,
        data
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Update a user's data
   * @param {string} userId - The ID of the user to update
   * @param {Object} data - The new data for the user
   * @returns {Promise<Object>} - A promise that resolves to the updated user
   */
  static async update(userId, data) {
    try {
      return ServiceClient.callService("user-service", {
        method: "put",
        url: `/users/${userId}`,
        data
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Remove a user
   * @param {string} userId - The ID of the user to remove
   * @returns {Promise<Object>} - A promise that resolves to the result of the
   * delete operation
   */
  static async remove(userId) {
    try {
      return ServiceClient.callService("user-service", {
        method: "delete",
        url: `/users/${userId}`
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = UserServiceClient;
