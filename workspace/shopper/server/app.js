// Import necessary dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require("morgan");
const RedisStore = require("connect-redis").default;
const { assignTemplateVariables } = require("./lib/middlewares");
const routeHandler = require("./routes");

const config = require("./config");

// Initialize express application
const app = express();

// Set up view engine (Pug in this case) and views directory
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny")); // Log HTTP requests
app.use(express.static(path.join(__dirname, "../client"))); // Serve static files

// Initialize Redis session store
const redisStore = new RedisStore({
  client: config.redis.client,
  prefix: "shopper_session:"
});

// Set up session middleware
app.use(
  session({
    store: redisStore,
    secret: "CHANGE ME!",
    resave: false,
    saveUninitialized: false
  })
);

// Ignore requests for favicon and robots.txt
app.get("/favicon.ico", (req, res) => res.status(204));
app.get("/robots.txt", (req, res) => res.status(204));

// Middleware to add 'global' template variables
app.use(assignTemplateVariables);

// Set up routes
app.use("/", routeHandler);

// Error handlers
app.use((req, res, next) => {
  const err = new Error(`Not Found (${req.url})`);
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Export the express application
module.exports = app;
