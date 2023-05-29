const config = require("../config");
const ServiceClient = require("./ServiceClient");

/** @module CartServiceClient */

/**
 * Service class for managing a user's cart
 */
class CartServiceClient {
  static key(userId) {
    return `shopper_cart:${userId}`;
  }

  static client() {
    return config.redis.client;
  }

  /**
   * Add an item to the user's cart
   * @param {string} itemId - The ID of the item to add
   * @returns {Promise<number>} - A promise that resolves to the new quantity of
   * the item in the cart
   */
  static async add(userId, itemId) {
    try {
      return ServiceClient.callService("cart-service", {
        method: "post",
        url: `/items/${userId}`,
        data: { itemId }
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  /**
   * Get all items in the user's cart
   * @returns {Promise<Object>} - A promise that resolves to an object containing
   * the cart items and their quantities
   */
  static async getAll(userId) {
    try {
      return ServiceClient.callService("cart-service", {
        method: "get",
        url: `/items/${userId}`
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Remove an item from the user's cart
   * @param {string} itemId - The ID of the item to remove
   * @returns {Promise<number>} - A promise that resolves to the number of items
   * removed (1 if the item was removed, 0 if the item was not in the cart)
   */
  static async remove(userId, itemId) {
    try {
      return ServiceClient.callService("cart-service", {
        method: "delete",
        url: `/items/${userId}/${itemId}`
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

module.exports = CartServiceClient;
