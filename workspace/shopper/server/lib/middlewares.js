const jwt = require("jsonwebtoken");

const UserService = require("../services/UserServiceClient");
const CartService = require("../services/CartServiceClient");
const config = require("../config");

module.exports.assignTemplateVariables = async (req, res, next) => {
  res.locals.applicationName = config.applicationName;

  // Flash messaging setup
  if (!req.session.messages) req.session.messages = [];
  res.locals.messages = req.session.messages;

  // Fetch user and cart info if user is logged in
  if (req.session.token) {
    try {
      try {
        res.locals.currentUser = jwt.verify(req.session.token, "MY SECRET KEY");
      } catch (error) {
        req.session.token = null;
      }
      if (res.locals.currentUser) {
        const userId = res.locals.currentUser.id;
        let cartCount = 0;
        try {
          const cartContents = await CartService.getAll(userId);
          if (cartContents) {
            Object.keys(cartContents).forEach((itemId) => {
              cartCount += parseInt(cartContents[itemId], 10);
            });
          }
        } catch (error) {
          console.error(error);
        }

        res.locals.cartCount = cartCount;
      }
    } catch (error) {
      return next(error);
    }
  }
  return next();
};

module.exports.requireAdmin = (req, res, next) => {
  if (!res.locals.currentUser || !res.locals.currentUser.isAdmin) {
    req.session.messages.push({
      type: "danger",
      text: "Access denied!"
    });
    return res.redirect("/");
  }

  return next();
};
