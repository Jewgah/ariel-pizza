// const express = require('express');
// const kafka = require('./publish');
// const app = express();

// function sendMessage(req, res) {
//   const result = kafka.publish("whats up");
//   JSON.stringify(result);
//   if (result instanceof Error) {
//     console.error(result);
//     res.status(500).send('Error sending message');
//   } else {
//     console.log("suc")
//     res.send('message was sent');
//   }
// }

// module.exports = { sendMessage };


const kafka = require('./publish');


function sendMessage(req, res) {
  const message = 'whats up26';
  kafka.publish(message);
  res.send('Message was sent and saved to MongoDB');
}

module.exports = { sendMessage };

