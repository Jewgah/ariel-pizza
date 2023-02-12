const express = require('express');
const sendToKafka = require('./send_to_kafka');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {  
  res.send('Hello World!B');
});

app.get('/send', sendToKafka.sendMessage);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});