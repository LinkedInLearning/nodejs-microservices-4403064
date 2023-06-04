const express = require("express");

const requireAdmin = require("../lib/requireAdmin");
const CatalogService = require("../lib/CatalogService");

const router = express.Router();

function createResponse(item) {
  return { id: item.id, price: item.price, sku: item.sku, name: item.name };
}

router.get("/items", async (req, res) => {
  try {
    const items = await CatalogService.getAll();
    return res.json(items.map(createResponse));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/items/:id", async (req, res) => {
  try {
    const item = await CatalogService.getOne(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found." });
    }
    return res.json(createResponse(item));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/items", requireAdmin, async (req, res) => {
  try {
    const newItem = await CatalogService.create(req.body);
    return res.json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/items/:id", requireAdmin, async (req, res) => {
  try {
    const updatedItem = await CatalogService.update(req.params.id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found." });
    }
    return res.json(createResponse(updatedItem));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/items/:id", requireAdmin, async (req, res) => {
  try {
    const deletionResult = await CatalogService.remove(req.params.id);
    if (deletionResult.deletedCount === 0) {
      return res.status(404).json({ error: "Item not found." });
    }
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
