// Import necessary modules
const express = require("express");
const UserService = require("../../../services/UserServiceClient");

// Create a new Express router
const router = express.Router();

// Route for getting all users or a specific user by ID
router.get("/:userId?", async (req, res, next) => {
  try {
    const users = await UserService.getAll(); // Get all users

    let user = null;
    // The optional userId param was passed
    if (req.params.userId) {
      user = await UserService.getOne(req.params.userId); // Get specific user
    }

    // Render the user page with all users or the specific user
    return res.render("admin/user", {
      users,
      user
    });
  } catch (err) {
    // Forward the error to the error handler
    return next(err);
  }
});

// Route for saving or updating a user
router.post("/", async (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  const { isAdmin } = req.body;

  // Check if email and password are provided
  if (!email || (!password && !req.body.userId)) {
    req.session.messages.push({
      type: "warning",
      text: "Please enter email address and password!"
    });
    return res.redirect("/admin/user");
  }

  try {
    // Create or update a user
    if (!req.body.userId) {
      await UserService.create({ email, password, isAdmin }); // Create new user
    } else {
      const userData = {
        email,
        isAdmin,
        password
      };

      // Check if password is provided for updating user
      if (password) {
        userData.password = password;
      }

      await UserService.update(req.body.userId, userData); // Update user
    }

    req.session.messages.push({
      type: "success",
      text: `The user was ${
        req.body.userId ? "updated" : "created"
      } successfully!`
    });

    // Redirect to the user page
    return res.redirect("/admin/user");
  } catch (err) {
    // Log the error and redirect to the user page
    req.session.messages.push({
      type: "danger",
      text: "There was an error while saving the user!"
    });
    console.error(err);
    return res.redirect("/admin/user");
  }
});

// Route for deleting a user
router.get("/delete/:userId", async (req, res) => {
  try {
    await UserService.remove(req.params.userId); // Remove the user
  } catch (err) {
    // Log the error and redirect to the user page
    req.session.messages.push({
      type: "danger",
      text: "There was an error while deleting the user!"
    });
    console.error(err);
    return res.redirect("/admin/user");
  }

  // Let the user know that everything went fine
  req.session.messages.push({
    type: "success",
    text: "The user was successfully deleted!"
  });
  return res.redirect("/admin/user");
});

// Route for impersonating a user (switching the current user to another)
router.get("/impersonate/:userId", (req, res) => {
  req.session.userId = req.params.userId; // Set session's userId to the provided one
  req.session.messages.push({
    type: "success",
    text: "User successfully switched"
  });
  return res.redirect("/admin/user");
});
// Export the router
module.exports = router;
