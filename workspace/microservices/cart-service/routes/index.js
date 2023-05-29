const express = require("express");
const CartService = require("../lib/CartService");

const router = express.Router();

router.get("/items/:userId", async (req, res) => {
  try {
    const items = await CartService.getAll(req.params.userId);

    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).send("General error");
  }
});

router.post("/items/:userId", async (req, res) => {
  try {
    await CartService.add(req.params.userId, req.body.itemId);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("General error");
  }
});

router.delete("/items/:userId/:itemId", async (req, res) => {
  try {
    await CartService.remove(req.params.userId, req.params.itemId);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("General error");
  }
});
module.exports = router;
