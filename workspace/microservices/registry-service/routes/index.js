const express = require("express");

const router = express.Router();

router.put(
  "/register/:servicename/:serviceversion/:serviceport",
  (req, res, next) => {
    return next("Not implemented");
  }
);

router.delete(
  "/register/:servicename/:serviceversion/:serviceport",
  (req, res, next) => {
    return next("Not implemented");
  }
);

router.get("/find/:servicename/:serviceversion", (req, res, next) => {
  return next("Not implemented");
});

module.exports = router;
