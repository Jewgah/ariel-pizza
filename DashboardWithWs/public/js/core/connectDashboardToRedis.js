const redis = require('ioredis');


// Create a Redis client
const client = redis.createClient({
  host: 'localhost',
  port: 6382
});


module.exports = {
    client,
  };
