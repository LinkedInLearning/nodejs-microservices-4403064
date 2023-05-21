#!/usr/bin/env node

/* eslint-disable import/order */

// Import necessary dependencies
// HTTP server functionality
const config = require("../config"); // Configuration settings

// eslint-disable-next-line no-unused-vars
const tracing = require("../lib/tracing")(
  `${config.serviceName}:${config.serviceVersion}`
);
// Import necessary dependencies
const http = require("http"); // HTTP server functionality

const connectToMongoose = require("../lib/mongooseConnection"); // Function to connect to MongoDB
const connectToRedis = require("../lib/redisConnection"); // Function to connect to Redis

// Prepare the Redis client to connect to later
// This has to come before `app` is initiated because sessions depend on it
config.redis.client = connectToRedis(config.redis.options);

const app = require("../app"); // Express application

// Set the port from the environment variable or use 3000 as default
const port = process.env.PORT || "3000";

// Create the HTTP server with the express app
const server = http.createServer(app);

// Attach a listening handler
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(
    `${config.serviceName}:${config.serviceVersion} listening on ${bind}`
  );
});

// Connect to Redis and MongoDB before starting the server
config.redis.client.connect().then(() => {
  connectToMongoose(config.mongodb.url).then(() => server.listen(port));
});
