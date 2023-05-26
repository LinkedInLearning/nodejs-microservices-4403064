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

const app = require("../app"); // Express application

// Create the HTTP server with the express app
const server = http.createServer(app);

// Attach error and listening handlers to the server
server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(
    `${config.serviceName}:${config.serviceVersion} listening on ${bind}`
  );
});

// Start the server
server.listen(3080);
