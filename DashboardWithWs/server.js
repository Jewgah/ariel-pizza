const express = require('express')
const app = express();
const socketIO = require('socket.io');
const {getValueFromRedis} = require('../DashboardWithWs/public/js/core/getDataFromRedis');

const port=3001;

app.use(express.static('public'));
app.set('view engine', 'ejs');


console.log('Data in Redis:');
// get openBranchCount
let openBranchCount;
getValueFromRedis("openBranchCount")
  .then((data) => {
    console.log(`OpenBranches Count: ${data}`);
    openBranchCount = data;
  })
  .catch((err) => {
    console.error(err);
  });


let avgOrderTime;
getValueFromRedis("averageOrderTime")
  .then((data) => {
    console.log(`averageOrderTime Count: ${data} minutes`);
    avgOrderTime = Math.floor(data);
  })
  .catch((err) => {
    console.error(err);
  });

let openOrdersCount;
getValueFromRedis("openOrdersCount")
  .then((data) => {
    console.log(`openOrdersCount Count: ${data}`);
    openOrdersCount = data;
  })
  .catch((err) => {
    console.error(err);
  });

  
let TotalOrdersCount;
getValueFromRedis("TotalOrdersCount")
  .then((data) => {
    console.log(`TotalOrdersCount Count: ${data}`);
    TotalOrdersCount = data;
  })
  .catch((err) => {
    console.error(err);
  });


  let NorthOrderCount;
  getValueFromRedis("NorthOrderCount")
  .then((data) => {
    console.log(`NorthOrderCount: ${data}`);
    NorthOrderCount = data;
  })
  .catch((err) => {
    console.error(err);
  });

  let HaifaOrderCount;
  getValueFromRedis("HaifaOrderCount")
  .then((data) => {
    console.log(`HaifaOrderCount: ${data}`);
    HaifaOrderCount = data;
  })
  .catch((err) => {
    console.error(err);
  });

  let CentralOrderCount;
  getValueFromRedis("CentralOrderCount")
  .then((data) => {
    console.log(`CentralOrderCount: ${data}`);
    CentralOrderCount = data;
  })
  .catch((err) => {
    console.error(err);
  });

  let DanOrderCount;
  getValueFromRedis("DanOrderCount")
  .then((data) => {
    console.log(`DanOrderCount: ${data}`);
    DanOrderCount = data;
  })
  .catch((err) => {
    console.error(err);
  });

  let SouthOrderCount;
  getValueFromRedis("SouthOrderCount")
  .then((data) => {
    console.log(`SouthOrderCount: ${data}`);
    SouthOrderCount = data;
  })
  .catch((err) => {
    console.error(err);
  });


  // get tomatoCount
let tomatoCount;
getValueFromRedis("tomatoCount")
  .then((data) => {
    console.log(`tomatoCount Count: ${data}`);
    tomatoCount = data;
  })
  .catch((err) => {
    console.error(err);
  });

  // get onionsCount
let onionsCount;
getValueFromRedis("onionsCount")
  .then((data) => {
    console.log(`onionsCount Count: ${data}`);
    onionsCount = data;
  })
  .catch((err) => {
    console.error(err);
  });

    // get peppersCount
let peppersCount;
getValueFromRedis("peppersCount")
  .then((data) => {
    console.log(`peppersCount Count: ${data}`);
    peppersCount = data;
  })
  .catch((err) => {
    console.error(err);
  });

// get mushroomCount
let mushroomCount;
getValueFromRedis("mushroomCount")
  .then((data) => {
    console.log(`mushroomCount Count: ${data}`);
    mushroomCount = data;
  })
  .catch((err) => {
    console.error(err);
  });

  // get pepperoniCount
let pepperoniCount;
getValueFromRedis("pepperoniCount")
  .then((data) => {
    console.log(`pepperoniCount Count: ${data}`);
    pepperoniCount = data;
  })
  .catch((err) => {
    console.error(err);
  });

// get tunaCount
let tunaCount;
getValueFromRedis("tunaCount")
  .then((data) => {
    console.log(`tunaCount Count: ${data}`);
    tunaCount = data;
  })
  .catch((err) => {
    console.error(err);
  });

  let toppingsCount = [tomatoCount, onionsCount, peppersCount, mushroomCount, pepperoniCount, tunaCount];
  toppingsCount.sort((a, b) => b - a); // Sort the array in descending order
  toppingsCount = toppingsCount.slice(0, 5); // Keep only the first 5 elements

  console.log(`toppingcount: ${toppingsCount}`);

app.get('/', (req, res) => {
  var data = {
    cards: [
      {districtId:"open_branchs", title: "סניפים פתוחים", value: openBranchCount, unit: "branches", fotterIcon: "", fotterText: "נפח ממוצע", icon: "store" },
      {districtId:"average_time", title: "זמן טיפול ממוצע", value: avgOrderTime, unit: "minutes", fotterIcon: "", fotterText: "נפח ממוצע", icon: "timelapse" },
      {districtId:"total_open_orders", title: "סהײכ הזמנות פתוחות", value: openOrdersCount, unit: "orders", fotterIcon: "", fotterText: "נפח ממוצע", icon: "local_shipping" },
      {districtId:"total_orders", title: "סהײכ הזמנות היום", value: TotalOrdersCount, unit: "orders", fotterIcon: "", fotterText: "נפח ממוצע", icon: "add_shopping_cart" }
    ]
  }
  res.render("pages/dashboard", data)
})

app.get('/setData/:districtId/:value', function (req, res) {
  io.emit('newdata',{districtId:req.params.districtId,value:req.params.value})
  res.send(req.params.value)
})


const server = express()
  .use(app)
  .listen(3001, () => console.log(`Listening Socket on http://localhost:3001`));
const io = socketIO(server);

//------------
// io.on('connection', (socket) => {  
//   socket.on('newdata', (msg) => {
//     console.log(msg);
//     io.emit('newdata', msg);
//   });
// });
//-----------

