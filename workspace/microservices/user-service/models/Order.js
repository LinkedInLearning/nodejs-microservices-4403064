const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  sku: Number,
  qty: Number,
  name: String,
  price: Number,
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: String,
  status: String,
  items: [orderItemSchema],
});

const Order = mongoose.model("Order", orderSchema);
const OrderItem = mongoose.model("OrderItem", orderItemSchema);


module.exports = { Order, OrderItem };