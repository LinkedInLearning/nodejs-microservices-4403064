/** @module OrderService */
const amqp = require("amqplib");
const ServiceClient = require("./ServiceClient");

/**
 * Service class for managing orders
 */
class OrderServiceClient {
  /**
   * Create a new order
   * @param {Object} user - The user who is creating the order
   * @param {Array} items - The items in the order
   * @returns {Promise<Object>} - A promise that resolves to the new order
   */
  static async create(userId, email, items) {
    try {
      const connection = await amqp.connect("amqp://127.0.0.1");
      const channel = await connection.createChannel();
      const queue = "orders";
      const message = JSON.stringify({ userId, email, items });

      await channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(message));
      console.log(" [x] Sent %s", message);
    } catch (error) {
      console.error(error);
    }

    /*
    return ServiceClient.callService("order-service", {
      method: "post",
      url: `/orders`,
      data: { userId, email, items }
    });
    */
  }

  /**
   * Get all orders
   * @returns {Promise<Array>} - A promise that resolves to an array of orders
   */
  static async getAll() {
    try {
      return ServiceClient.callService("order-service", {
        method: "get",
        url: `/orders`
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Update the status of an order
   * @param {string} orderId - The ID of the order to update
   * @param {string} status - The new status
   * @returns {Promise<Object|null>} - A promise that resolves to the updated
   * order, or null if no order was found
   */
  static async setStatus(orderId, status) {
    return ServiceClient.callService("order-service", {
      method: "put",
      url: `/orders/${orderId}`,
      data: { status }
    });
  }
}

module.exports = OrderServiceClient;
