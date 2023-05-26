const express = require("express");

const Registry = require("../lib/Registry");

const registry = new Registry();

const router = express.Router();

router.put(
  "/register/:servicename/:serviceversion/:serviceport",
  (req, res, next) => {
    const { servicename, serviceversion, serviceport } = req.params;
    const serviceip = req.ip;
    const key = registry.register(
      servicename,
      serviceversion,
      serviceip,
      serviceport
    );
    return res.json({ result: key });
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
