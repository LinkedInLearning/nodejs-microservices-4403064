const pkg = require("./package.json");

module.exports = {
  serviceName: pkg.name,
  serviceVersion: pkg.version,
  mongodb: {
    url: "mongodb://localhost:37017/shopper"
  },
  redis: {
    options: {
      url: "redis://localhost:7379"
    },
    client: null
  }
};
