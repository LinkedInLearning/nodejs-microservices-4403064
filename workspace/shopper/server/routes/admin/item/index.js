// Import necessary modules
const express = require("express");
const CatalogService = require("../../../services/CatalogClient");

// Create a new Express router
const router = express.Router();

// Route for getting item(s)
router.get("/:itemId?", async (req, res, next) => {
  try {
    // Get all items
    const items = await CatalogService.getAll();

    let item = null;

    // If an itemId was provided, get that specific item
    if (req.params.itemId) {
      item = await CatalogService.getOne(req.params.itemId);
    }

    // Render the page with the items data
    return res.render("admin/item", { items, item });
  } catch (err) {
    // Forward any errors to the error handler
    return next(err);
  }
});

// Route for creating or updating an item
router.post("/", async (req, res) => {
  // Extract and clean up data from the request body
  const sku = req.body.sku.trim();
  const name = req.body.name.trim();
  const price = req.body.price.trim();

  // Validate the data
  if (!sku || !name || !price) {
    req.session.messages.push({
      type: "warning",
      text: "Please enter SKU, name and price!"
    });
    return res.redirect("/admin/item");
  }

  try {
    // If there was no existing item we now want to create a new item object
    if (!req.body.itemId) {
      await CatalogService.create({ sku, name, price });
    } else {
      // Update an existing item
      const itemData = { sku, name, price };
      await CatalogService.update(req.body.itemId, itemData);
    }

    // Provide feedback
    req.session.messages.push({
      type: "success",
      text: `The item was ${
        req.body.itemId ? "updated" : "created"
      } successfully!`
    });
    return res.redirect("/admin/item");
  } catch (err) {
    // Error handling
    req.session.messages.push({
      type: "danger",
      text: "There was an error while saving the item!"
    });
    console.error(err);
    return res.redirect("/admin/item");
  }
});

// Route for deleting an item
router.get("/delete/:itemId", async (req, res) => {
  try {
    // Remove the item
    await CatalogService.remove(req.params.itemId);

    // Provide feedback
    req.session.messages.push({
      type: "success",
      text: "The item was successfully deleted!"
    });
    return res.redirect("/admin/item");
  } catch (err) {
    // Error handling
    req.session.messages.push({
      type: "danger",
      text: "There was an error while deleting the item!"
    });
    console.error(err);
    return res.redirect("/admin/item");
  }
});

// Export the router
module.exports = router;
