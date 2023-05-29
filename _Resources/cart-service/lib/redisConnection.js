const redis = require('@redis/client');

const connectToRedis = (options) => {
  const client = redis.createClient(options);

  client.on('connect', () => {
    console.log('Connected to Redis');
  });

  client.on('error', (error) => {
    console.error('Error connecting to Redis:', error);
    process.exit(1);
  });

  return client;
};

module.exports = connectToRedis;
