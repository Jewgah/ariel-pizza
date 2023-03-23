import pkg from 'node-rdkafka';
import { Post } from "../model/post.model.js";
import { send_order_to_redis,send_branch_to_redis, clean_redis_database} from '../Redis/publishredis.js';
import { RedisDataOrder } from '../Redis/post.RedisDataOrder.js';
import { RedisDataBranches } from '../Redis/post.RedisDataBranches.js';
import { Branch } from "../model/branch.model.js";
import {socketServer } from '../../server.js';
import { v4 as uuidv4 } from 'uuid';
import {searchDocument,indexDocument } from '../ElasticSearch/elasticSearchModel.js'

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
// const producer = new pkg.Producer(kafkaConf);

// const genMessage = m => new Buffer.alloc(m.length,m);
//const prefix = process.env.CLOUDKARAFKA_USERNAME;
console.log("calling for the consumer");
// console.log(genMessage);
// console.log(producer)

const topics = [topic];
const consumer = new pkg.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});

consumer.on("error", function(err) {
  console.error(err);
});
consumer.on("ready", function(arg) {
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topics);
  consumer.consume();
});

consumer.on("data", async function(m) {
  
  const message = JSON.parse((m.value.toString()));
  console.log('message = ',message);

  if (typeof message.action !== "undefined") {
    console.log('open/close type of message')
    const branchData = new Branch({
      _region: message.region,
      _branch: message.branch,
      _action: message.action,
    });

    // send branch to mongoDB
    branchData.save();
    console.log("branch data sent to mongo");

    //send Branch data to Redis
    const data = new RedisDataBranches(branchData);
    send_branch_to_redis(data);

    //socket update
    socketServer.notifyDbUpdate(data);
  }

  else if (typeof message.topping !== "undefined") {
    console.log('pizza order type of message')
  const postRedis = {
    _region: message.region,
    _branch: message.branch,
    _topping: message.topping,
    _createdAt: message.createdAt,
    _ttl : message.ttl
  }
  const post = new Post({
    _region: message.region,
    _branch: message.branch,
    _topping: message.topping,
    _createdAt: message.createdAt,
    _ttl : message.ttl
  });

    // send Order to mongoDB
    post.save();
    console.log("Order data sent to mongo");

    // send Order data to Redis
    const data = new RedisDataOrder(postRedis);
    send_order_to_redis(data);

    //socket update
    socketServer.notifyDbUpdate(data);

    // send to ElasticSearch
    const ttlDate = new Date(message.ttl);
    const createdAtDate = new Date(message.createdAt);
    const timeDifference = ttlDate - createdAtDate;
    const todaysDate = createdAtDate.getDate();
    const todaysHour = createdAtDate.getHours();
    indexDocument(message.branch, todaysDate, message.topping, timeDifference, todaysHour);
    //search elastic doc
    searchDocument()
  }
  else{
    console.log('no type defined')
  }

  //clean_redis_database();
});
consumer.on("disconnected", function(arg) {
  process.exit();
});
consumer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});
consumer.on('event.log', function(log) {
  //console.log(log);
});
consumer.connect();

export default consumer;
