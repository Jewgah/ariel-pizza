const {client} = require('./connectDashboardToRedis');

  
  function print_all_branch_data() {
    client.hgetall('Branches', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log('hgetall Branches: ',data);
      }
    });
  }

  function getValueFromRedis(key) {
    return new Promise((resolve, reject) => {
      client.mget(key, function(err, value) {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

// get toppingsCount
// let tomatoesCount;
// getValueFromRedis("tomatoesCount")
//   .then((data) => {
//     console.log(`Open Branch Count: ${data}`);
//     tomatoesCount = data;
//   })
//   .catch((err) => {
//     console.error(err);
//   });

  module.exports = {
    print_all_branch_data, getValueFromRedis
  };
  