// Import the required Express module
const express = require("express");

// Import the different routes modules
const userAdminRoute = require("./admin/user");
const itemAdminRoute = require("./admin/item");
const orderAdminRoute = require("./admin/orders");
const shopRoute = require("./shop");
const cartRoute = require("./cart");
const userRoute = require("./user");

const { requireAdmin } = require("../lib/middlewares");

// Instantiate a new Express Router
const router = express.Router();

// Define a GET route for the root path ("/") of the application
router.get("/", (req, res) => {
  // Render the 'index' view when this route is accessed
  res.render("index");
});

// Mount the shop and cart routes to their respective paths
router.use("/shop", shopRoute);
router.use("/cart", cartRoute);

// Mount the admin routes to their respective paths
// Please note, in real world applications these routes should be protected by authentication and authorization middlewares
router.use("/admin/user", userAdminRoute);
router.use("/admin/item", requireAdmin, itemAdminRoute);
router.use("/admin/orders", requireAdmin, orderAdminRoute);
router.use("/user", userRoute);

// Export the router to be used in the main application
module.exports = router;
