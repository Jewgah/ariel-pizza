import redis from 'ioredis';



// Create a Redis client
export const client = redis.createClient({
  host: 'localhost',
  port: 6382
});
//const channel = 'messages';

// client.on('message', (channel, message) => {
//   console.log(`Received the following message from ${channel}: ${message}`);
// });

// client.subscribe(channel, (error, count) => {
//   if (error) {
//       throw new Error(error);
//   }
//   console.log(`Subscribed to ${count} channel. Listening for updates on the ${channel} channel.`);
// });
// module.exports = client;