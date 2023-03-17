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

  const createdAtDate = new Date(orders.createdAt)
  const ttlDate = new Date(orders.ttl)
  const expirationTime = Math.floor((ttlDate - createdAtDate)/100000);
  addOrder(orders.createdAt ,expirationTime);
  updateOrderCount();
  deleteExpiredOrders();

  getValueFromRedis('openOrdersCount');

}

//################################

const ORDER_LIST_KEY = 'openOrders';
const ORDER_COUNT_KEY = 'openOrdersCount';

// Add an order to the list and set its expiration time
function addOrder(order, expirationTime) {
  // Convert the order object to a string to store in Redis
  const orderString = JSON.stringify(order);

  client.lpush(ORDER_LIST_KEY, orderString, (err, result) => {
    if (err) {
      console.error('Failed to add order to Redis:', err);
    } else {
      console.log(`Added order to Redis list. Result: ${result}`);

      // Set the expiration time for the order
      client.expire(ORDER_LIST_KEY, expirationTime, (err, result) => {
        if (err) {
          console.error('Failed to set order expiration time:', err);
        } else {
          console.log(`Set expiration time for order: ${expirationTime}`);
        }
      });
    }
  });
}

// Get the number of orders in the list and update the count variable
function updateOrderCount() {
  client.llen(ORDER_LIST_KEY, (err, result) => {
    if (err) {
      console.error('Failed to get order count from Redis:', err);
    } else {
      console.log(`Order count: ${result}`);

      // Update the order count variable in Redis
      client.set(ORDER_COUNT_KEY, result, (err, result) => {
        if (err) {
          console.error('Failed to update order count in Redis:', err);
        } else {
          console.log(`Updated order count in Redis to ${result}`);
        }
      });
    }
  });
}

// Delete all expired orders from the list
function deleteExpiredOrders() {
  client.lrem(ORDER_LIST_KEY, 0, '', (err, result) => {
    if (err) {
      console.error('Failed to delete expired orders from Redis:', err);
    } else {
      console.log(`Deleted ${result} expired orders from Redis`);
    }
  });
}


//################################


// module.exports = { send_to_radis };
// client.quit();





