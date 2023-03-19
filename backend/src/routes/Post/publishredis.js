import {client} from './connectionRedis.js';


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

// function getAllKeysFromRedis() {
//   client.keys('*', function(err, keys) {
//     if (err) {
//       console.error(err);
//       //callback(err, null);
//     } else {
//       //console.log('Keys retrieved from Redis:', keys);
//       //callback(null, keys);
//     }
//   });
// }

// function generateUniqueId() {
//   client.incr('uniqueId', function(err, id) {
//     if (err) {
//       console.error(err);
//       // callback(err, null);
//     } else {
//       // callback(null, id);
//     }
//   });
// }


export function clean_redis_database() {
  client.flushdb(function (err, succeeded) {
    if (err) throw err;

    console.log(`Redis database cleaned: ${succeeded}`);
  });
}

export function send_branch_to_redis(data) {
  //console.log('data = ',data);


  // #### UPDATE count open branches
  const redisKey =  JSON.stringify(data.branches._branch);
  const redisData =  JSON.stringify(data.branches._action);

  // updating db
  console.log('redisKey = ',redisKey,' and redisData = ', redisData);
  client.hset('Branches', redisKey, redisData, (err) => {
    if (err) {
      console.error(err);
    } else {
      //console.log(`Redis data updated: ${redisKey} : ${redisData}`);
    }
  });

  //updates number of open branches
  updateOpenBranchCount();

  //logs number of openbranches
  getOpenBranchCount();

  //print all branches data
  print_all_branch_data();
}

export function print_all_branch_data() {
  client.hgetall('Branches', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log('hgetall Branches: ',data);
    }
  });
}

function updateOpenBranchCount() {
  let count = 0;

  client.hgetall('Branches', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      for (const [key, value] of Object.entries(data)) {
        try {
          const actions = JSON.parse(value);
            if (actions === "open") {
              count++;
            }
        } catch (error) {
          console.error(`Error parsing JSON for branch ${key}: ${value}`);
        }
      }

      //updates branch open counter on Redis
      client.set('openBranchCount', count, (err) => {
        if (err) {
          console.error(err);
        } else {
          //console.log(`Redis data updated: openBranchCount : ${count}`);
        }
      });
    }
  });
}

function getOpenBranchCount() {
  client.get('openBranchCount', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Open Branch Count: ${data}`);
    }
  });
}




export function send_order_to_redis(orders) {
console.log('sending data to Redis');

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

  //#############################

  const createdAtDate = new Date(orders.createdAt)
  const ttlDate = new Date(orders.ttl)
  const expirationTime = Math.floor((ttlDate - createdAtDate)/5000);
  addOrder(orders, expirationTime);
  updateOrderCount();
  deleteExpiredOrders();

// ###############################

}

//################################

const ORDER_LIST_KEY = 'openOrders';
const ORDER_COUNT_KEY = 'openOrdersCount';

function addOrder(order, expirationTime) {

  // Convert the order object to a string to store in Redis
  const orderString = JSON.stringify(order.createdAt);
  console.log(`region order = ${JSON.stringify(order.region)}`);


  // increments `region`OrderCount by one
  client.incr(`${order.region}OrderCount`);
  console.log(`${order.region}OrderCount incremented by 1`);

  //increment TotalOrdersCount and sets averageOrderTime
  client.incr('TotalOrdersCount', (err, totalOrdersCount) => {
    if (err) throw err;
    client.get('averageOrderTime', (err, currentAvgOrderTime) => {
      if (err) throw err;
      // currentAvgOrderTime = currentAvgOrderTime / 60;
      // let newAvgOrderTime = Math.floor(((totalOrdersCount - 1) * currentAvgOrderTime + (expirationTime/60)) / totalOrdersCount);
      console.log(`TotalOrdersCount = ${totalOrdersCount}`)
      client.set('averageOrderTime', expirationTime/60, (err, result) => {
        if (err) throw err;
        //console.log(`New order added. Total orders: ${totalOrdersCount}, old average order time: ${currentAvgOrderTime} new average order time: ${newAvgOrderTime} minutes`);
      });
    });
  });

  client.lpush(ORDER_LIST_KEY, orderString, (err, result) => {
    if (err) {
      console.error('Failed to add order to Redis:', err);
    } else {
      //console.log(`Added order to Redis list. Result: ${result}`);

      // Set the expiration time for the order
      client.expire(ORDER_LIST_KEY, expirationTime, (err, result) => {
        if (err) {
          console.error('Failed to set order expiration time:', err);
        } else {
          const expirationTimerTimeInMins = Math.floor(expirationTime / 60); // Convert to minutes and round down
          console.log(`Set expiration time for order: ${expirationTimerTimeInMins} minutes`);
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
      console.log(`openOrdersCount: ${result}`);

      // Update the order count variable in Redis
      client.set(ORDER_COUNT_KEY, result, (err, result) => {
        if (err) {
          console.error('Failed to update order count in Redis:', err);
        } else {
          //console.log(`Updated order count in Redis to ${result}`);
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
      //console.log(`Deleted ${result} expired orders from Redis`);
    }
  });
}


