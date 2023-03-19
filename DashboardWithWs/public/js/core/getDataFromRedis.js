const {client} = require('./connectDashboardToRedis');


function getOpenBranchCount() {
    return new Promise((resolve, reject) => {
      client.get('openBranchCount', (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          //console.log(`Open Branch Count: ${data}`);
          resolve(data);
        }
      });
    });
  }
  

  function print_all_branch_data() {
    client.hgetall('Branches', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log('hgetall Branches: ',data);
      }
    });
  }

  module.exports = {
    getOpenBranchCount,print_all_branch_data
  };
  