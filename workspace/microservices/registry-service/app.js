const express = require("express");

const app = express();
const morgan = require("morgan");
const routes = require("./routes");
const config = require("./config");

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to log HTTP requests
app.use(morgan("tiny"));

// Mount the router
app.use("/", routes);
// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  // You can also log the error to a file or console
  console.error(err);

  res.status(status).json({
    error: {
      message,
      status
    }
  });
});
module.exports = app;
