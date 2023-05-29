// Required modules and services are imported
const express = require("express");
const CatalogService = require("../../services/CatalogClient");
const CartService = require("../../services/CartService");

// Express router is instantiated
const router = express.Router();

// Route to render all items in the catalog
router.get("/", async (req, res) => {
  try {
    // Get all items from the catalog
    const items = await CatalogService.getAll();
    // Render the 'shop' view and pass in the items
    res.render("shop", { items });
  } catch (err) {
    req.session.messages.push({
      type: "danger",
      text: "There was an error loading the shop catalog."
    });
    console.error(err);
  }
});

// Route to add an item to the cart
router.get("/tocart/:itemId", async (req, res) => {
  // Check if the user is logged in
  if (!res.locals.currentUser) {
    // If not, add a warning message and redirect to the shop page
    req.session.messages.push({
      type: "warning",
      text: "Please log in first"
    });
    return res.redirect("/shop");
  }

  // If the user is logged in, attempt to add the item to the cart
  try {
    // Add the item to the cart
    const userId = res.locals.currentUser.id;
    await CartService.add(userId, req.params.itemId);
    // Add a success message
    req.session.messages.push({
      type: "success",
      text: "The item was added to your cart"
    });
  } catch (err) {
    // If an error occurs, add an error message, log the error, and redirect to the shop page
    req.session.messages.push({
      type: "danger",
      text: "There was an error adding the item to your cart"
    });
    console.error(err);
  }

  // Redirect to the shop page
  return res.redirect("/shop");
});

// Export the router
module.exports = router;
