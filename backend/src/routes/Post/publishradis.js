import {client} from './connectionRadis.js';

function getData(){
  client.get('_region', function(err, reply) {
    console.log(reply);
  });
}



// function saveMessageToRedis(message) {
//   client.set('message', message, function(err, reply) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log('Message saved to Redis:', message);
//     }
//   });
// }


function getValueFromRedis(key) {
  client.mget(key, function(err, value) {
    if (err) {
      //console.error(err);
      //callback(err, null);
    } else {
      console.log('Key ', key, ' contains :', value);
      //callback(null, keys);
    }
  });
}

function getAllKeysFromRedis() {
  client.keys('*', function(err, keys) {
    if (err) {
      console.error(err);
      //callback(err, null);
    } else {
      //console.log('Keys retrieved from Redis:', keys);
      //callback(null, keys);
    }
  });
}

function generateUniqueId() {
  client.incr('uniqueId', function(err, id) {
    if (err) {
      console.error(err);
      // callback(err, null);
    } else {
      // callback(null, id);
    }
  });
}


export function clean_redis_database() {
  client.flushdb(function (err, succeeded) {
    if (err) throw err;

    //console.log(`Redis database cleaned: ${succeeded}`);
  });
}

// export function send_to_redis(message) {
//   // Generate a unique key using the `redis.incr` function
//   client.incr('count_orders', function (err, id) {
//     if (err) throw err;

//     // Set the message value with the generated key in Redis
//     client.set(`order:${id}`, message, function (err, reply) {
//       if (err) throw err;

//       console.log(`Message saved with key: message:${id}`);
//       getAllKeysFromRedis();
//       getValueFromRedis(`order:${id}`);
//     });
//   });
// }


export function send_to_redis(orders) {
  if (orders.tomatoes) {
    client.incr('tomatoesCount');
  }
  if (orders.onions) {
    client.incr('onionsCount');
  }
  if (orders.peppers) {
    client.incr('peppersCount');
  }
  if (orders.mushroom) {
    client.incr('mushroomCount');
  }
  if (orders.pepperoni) {
    client.incr('pepperoniCount');
  }
  if (orders.tuna) {
    client.incr('tunaCount');
  }
  getValueFromRedis('pepperoniCount');
  getValueFromRedis('mushroomCount');
  getValueFromRedis('tunaCount');
  getValueFromRedis('tomatoesCount');
  getValueFromRedis('peppersCount');
  getValueFromRedis('onionsCount');



}

// export function send_to_radis(message){
//     client.set(generateUniqueId(), message, (error, result) => {
//         if (error) {
//           console.error(error);
//         } else {
//           console.log(`Data published to Redis: ${result}`);
//           console.log(`Data published to Redis1: ${message}`);
//           getAllKeysFromRedis();
//         }
//       });
      
// }



// module.exports = { send_to_radis };



// client.quit();





