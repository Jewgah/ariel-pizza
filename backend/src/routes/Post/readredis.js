import {client} from './connectionRedis.js';


client.subscribe('mychannel');
const channel = 'messages';

client.subscribe(channel, (error, count) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Subscribed to ${count} channel. Listening for updates on the ${channel} channel.`);
});

client.on('message', (channel, message) => {
    console.log(`Received the following message from ${channel}: ${message}`);
});

// module.exports = {
//   unsubscribe: () => {
//     client.unsubscribe(channel);
//   }
// };
