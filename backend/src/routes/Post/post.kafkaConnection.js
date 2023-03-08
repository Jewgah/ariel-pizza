// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

import { v4 as uuidv4 } from 'uuid';

import pkg from 'node-rdkafka';
// const { Kafka } = pkg;
 
// use you own parameters
const kafkaConf = {
  "group.id": "aybcvzxf-group1",
  "metadata.broker.list": "glider-01.srvs.cloudkafka.com:9094,glider-02.srvs.cloudkafka.com:9094,glider-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "aybcvzxf",
  "sasl.password": "EKXczYFtZFEVjq-yJeN6pg-A-3Itvda_",
  "debug": "generic,broker,security"
};

const prefix = "aybcvzxf-";
const topic = `${prefix}new`;
const producer = new pkg.Producer(kafkaConf);

const genMessage = m => new Buffer.alloc(m.length,m);

producer.on("ready", function(arg) {
  console.log(`producer ${arg.name} ready.`); 
});
// producer.on('event.error', err => {
//   console.error('Error in Kafka producer', err);
//   reject(err);
// });

producer.connect();

export async function publish(msg){
  try {
    m=JSON.stringify(msg);
    producer.produce(topic, -1, genMessage(m), uuid.v4());
    console.log(`Produced message: ${msg}`);
  } catch (err) {
    console.error('Error producing message', err);
  }     
}