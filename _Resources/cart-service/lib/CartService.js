const config = require("../config");

/** @module CartService */

/**
 * Service class for managing a user's cart
 */
class CartService {
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
    return this.client().HINCRBY(this.key(userId), itemId, 1);
  }

  /**
   * Get all items in the user's cart
   * @returns {Promise<Object>} - A promise that resolves to an object containing
   * the cart items and their quantities
   */
  static async getAll(userId) {
    return this.client().HGETALL(this.key(userId));
  }

  /**
   * Remove an item from the user's cart
   * @param {string} itemId - The ID of the item to remove
   * @returns {Promise<number>} - A promise that resolves to the number of items
   * removed (1 if the item was removed, 0 if the item was not in the cart)
   */
  static async remove(userId, itemId) {
    return this.client().HDEL(this.key(userId), itemId);
  }
}

module.exports = CartService;
