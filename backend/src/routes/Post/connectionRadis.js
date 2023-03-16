import redis from 'ioredis';
// import cron from 'node-cron';


// Create a Redis client
export const client = redis.createClient({
  host: 'localhost',
  port: 6382
});




// Create Redis client

// Schedule a task to run every day at 12:00AM (midnight)
// cron.schedule('0 0 * * *', () => {
//   // Set the counter to 0 and expire it in 24 hours
//   client.set('dayCounter', 0);
//   client.expire('dayCounter', 24 * 60 * 60);

//   console.log('dayCounter reset to 0.');
// });

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