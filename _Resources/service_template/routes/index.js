const express = require("express");
const router = express.Router();

// Define your RESTful routes here
router.get("/", (req, res) => {
  // Return a JSON response with a 'hello world' message
  res.json({ msg: "hello world" });
});

module.exports = router;
