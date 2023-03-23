import {client} from "./connectDashboardToRedis.js";

  
  function print_all_branch_data() {
    client.hgetall('Branches', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log('hgetall Branches: ',data);
      }
    });
  }

  export function getValueFromRedis(key) {
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
  