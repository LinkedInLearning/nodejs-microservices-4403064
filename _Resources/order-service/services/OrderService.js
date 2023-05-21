/** @module OrderService */

// Import the Order and User models from mongoose
const { Order } = require("../models/Order");

/**
 * Service class for managing orders
 */
class OrderService {
  /**
   * Create a new order
   * @param {Object} user - The user who is creating the order
   * @param {Array} items - The items in the order
   * @returns {Promise<Object>} - A promise that resolves to the new order
   */
  static async create(userId, email, items) {
    const order = new Order({
      userId,
      email,
      status: "Not Shipped",
      items
    });

    await order.save();

    return order;
  }

  /**
   * Get all orders
   * @returns {Promise<Array>} - A promise that resolves to an array of orders
   */
  static async getAll() {
    return Order.find().populate("items");
  }

  /**
   * Update the status of an order
   * @param {string} orderId - The ID of the order to update
   * @param {string} status - The new status
   * @returns {Promise<Object|null>} - A promise that resolves to the updated
   * order, or null if no order was found
   */
  static async setStatus(orderId, status) {
    return Order.findByIdAndUpdate(orderId, { status }, { new: true });
  }
}

module.exports = OrderService;
