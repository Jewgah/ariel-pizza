import redis from 'ioredis';
// import cron from 'node-cron';

// Create a Redis client
export const client = redis.createClient({
  host: 'localhost',
  port: 6382
});
