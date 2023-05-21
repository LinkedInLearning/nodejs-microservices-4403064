const express = require("express");

const CatalogService = require("../lib/CatalogService");

const router = express.Router();

function returnJson(item) {
  return { id: item._id, name: item.name, sku: item.sku, price: item.price };
}

router.get("/items", async (req, res) => {
  try {
    const items = await CatalogService.getAll();
    return res.json(items.map(returnJson));
  } catch (error) {
    console.error(error);
    return res.status(500).send("General error");
  }
});

router.get("/items/:id", async (req, res) => {
  try {
    const item = await CatalogService.getOne(req.params.id);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    return res.json(returnJson(item));
  } catch (error) {
    console.error(error);
    return res.status(500).send("General error");
  }
});

router.post("/items", async (req, res) => {
  try {
    const item = await CatalogService.create(req.body);
    return res.json(returnJson(item));
  } catch (error) {
    console.error(error);
    return res.status(500).send("General error");
  }
});

router.put("/items/:id", async (req, res) => {
  try {
    const item = await CatalogService.update(req.params.id, req.body);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    return res.json(returnJson(item));
  } catch (error) {
    console.error(error);
    return res.status(500).send("General error");
  }
});

router.delete("/items/:id", async (req, res) => {
  try {
    const result = await CatalogService.remove(req.params.id);

    if (!result.deletedCount === 0) {
      return res.status(404).send("Item not found");
    }

    return res.status(204);
  } catch (error) {
    console.error(error);
    return res.status(500).send("General error");
  }
});

module.exports = router;
