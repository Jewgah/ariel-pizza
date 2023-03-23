import redis from "ioredis"


export const client = redis.createClient({
    host: 'localhost',
    port: 6382
  });
