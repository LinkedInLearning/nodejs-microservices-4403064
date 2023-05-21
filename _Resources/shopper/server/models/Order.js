const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  sku: Number,
  qty: Number,
  name: String,
  price: Number
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  email: String,
  status: String,
  items: [orderItemSchema]
});

const Order = mongoose.model("Order", orderSchema);
const OrderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = { Order, OrderItem };
