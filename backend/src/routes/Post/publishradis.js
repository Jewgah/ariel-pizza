import {client} from './connectionRadis.js';



export function send_to_radis(message){
    client.publish('messages', message, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`Data published to Redis: ${result}`);
          console.log(`Data published to Redis1: ${message}`);
        }
      });
      // client.on('message', (channel, message) => {
      //   console.log(`Received the following message from ${channel}: ${message}`);
      // });
}



// module.exports = { send_to_radis };



// client.quit();





