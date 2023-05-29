const UserService = require("../services/UserService");
const CartService = require("../services/CartServiceClient");
const config = require("../config");

module.exports.assignTemplateVariables = async (req, res, next) => {
  res.locals.applicationName = config.applicationName;

  // Flash messaging setup
  if (!req.session.messages) req.session.messages = [];
  res.locals.messages = req.session.messages;

  // Fetch user and cart info if user is logged in
  if (req.session.userId) {
    try {
      res.locals.currentUser = await UserService.getOne(req.session.userId);
      const { userId } = req.session;

      let cartCount = 0;
      const cartContents = await CartService.getAll(userId);
      if (cartContents) {
        Object.keys(cartContents).forEach((itemId) => {
          cartCount += parseInt(cartContents[itemId], 10);
        });
      }
      res.locals.cartCount = cartCount;
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
