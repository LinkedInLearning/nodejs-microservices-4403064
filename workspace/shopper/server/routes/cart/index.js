// Import required modules
const express = require("express");

const CatalogService = require("../../services/CatalogClient");
const CartService = require("../../services/CartService");
const OrderService = require("../../services/OrderService");

// Instantiate a new Express router
const router = express.Router();

// Define a route for getting the cart
router.get("/", async (req, res) => {
  // Check if a user is logged in
  if (!res.locals.currentUser) {
    req.session.messages.push({
      type: "warning",
      text: "Please log in first"
    });
    return res.redirect("/shop");
  }

  // Retrieve all items in the user's cart
  const userId = res.locals.currentUser.id;
  const cartItems = await CartService.getAll(userId);

  let items = [];
  if (cartItems) {
    // Map over the cart items and fetch their details
    items = await Promise.all(
      Object.keys(cartItems).map(async (itemId) => {
        const item = await CatalogService.getOne(itemId);
        if (!item) {
          CartService.remove(userId, itemId);
          return null;
        }
        // Add the quantity of each item to its details
        item.quantity = cartItems[itemId];
        return item;
      })
    );
  }

  // Render the cart view with the items
  return res.render("cart", { items: items.filter((item) => item) });
});

// Define a route for removing an item from the cart
router.get("/remove/:itemId", async (req, res) => {
  // Check if a user is logged in
  if (!res.locals.currentUser) {
    req.session.messages.push({
      type: "warning",
      text: "Please log in first"
    });
    return res.redirect("/shop");
  }

  try {
    // Remove the specified item from the cart
    const userId = res.locals.currentUser.id;
    await CartService.remove(userId, req.params.itemId);

    // Show a success message
    req.session.messages.push({
      type: "success",
      text: "The item was removed from the your cart"
    });
  } catch (err) {
    // Show an error message and log the error
    req.session.messages.push({
      type: "danger",
      text: "There was an error removing the item from your cart"
    });
    console.error(err);
    return res.redirect("/cart");
  }

  // Redirect the user back to the cart
  return res.redirect("/cart");
});

// Define a route for buying all items in the cart
router.get("/buy", async (req, res) => {
  // Check if a user is logged in
  if (!res.locals.currentUser) {
    req.session.messages.push({
      type: "warning",
      text: "Please log in first"
    });
    return res.redirect("/shop");
  }

  try {
    const userId = res.locals.currentUser.id;
    const user = res.locals.currentUser;

    // Retrieve all items in the user's cart
    const cartItems = await CartService.getAll(userId);

    // Throw an error if the cart is empty
    if (!cartItems) {
      throw new Error("No items were found in your cart");
    }

    const cartPromises = [];

    // Map over the cart items, fetch their details, and prepare promises
    // to clear the cart after the purchase
    const items = await Promise.all(
      Object.keys(cartItems).map(async (key) => {
        const item = await CatalogService.getOne(key);

        // Add a promise to remove this item from the cart to the list of promises
        cartPromises.push(CartService.remove(userId, item.id));

        // Return an object with the item's details for the order
        return {
          sku: item.sku,
          qty: cartItems[key],
          price: item.price,
          name: item.name
        };
      })
    );

    // Create the order
    await OrderService.create(user.id, user.email, items);

    // Execute all promises to remove each item from the cart
    await Promise.all(cartPromises)
      .then(() => {
        // Show a success message
        req.session.messages.push({
          type: "success",
          text: "Thank you for your business"
        });
      })
      .catch((error) => {
        // Log any errors
        console.error("Error occurred while running tasks:", error);
      });

    // Redirect the user to the home page
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    // Show an error message and log the error
    req.session.messages.push({
      type: "danger",
      text: "There was an error finishing your order"
    });

    // Redirect the user back to the cart
    return res.redirect("/cart");
  }
});

// Export the router
module.exports = router;
