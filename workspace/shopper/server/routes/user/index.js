// Required modules and services are imported
const express = require("express");
const UserService = require("../../services/UserServiceClient");

// Express router is instantiated
const router = express.Router();

// Route to render all items in the catalog
router.post("/login", async (req, res) => {
  const authUser = await UserService.authenticate(
    req.body.email,
    req.body.password
  );

  if (authUser && authUser.id) {
    req.session.userId = authUser.id;
    req.session.messages.push({
      type: "success",
      text: "You have been logged in!"
    });
    return res.redirect("/");
  }

  req.session.messages.push({
    type: "danger",
    text: "Invalid email address or password!"
  });
  return res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.userId = null;
  req.session.messages.push({
    type: "success",
    text: "You have been logged out!"
  });
  return res.redirect("/");
});

// Export the router
module.exports = router;
