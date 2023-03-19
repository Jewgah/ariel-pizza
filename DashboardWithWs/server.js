const express = require('express')
const app = express();
const socketIO = require('socket.io');
const {getValueFromRedis} = require('../DashboardWithWs/public/js/core/getDataFromRedis');

const port=3001;

app.use(express.static('public'))
app.set('view engine', 'ejs')

// get openBranchCount
let openBranchCount;
getValueFromRedis("openBranchCount")
  .then((data) => {
    console.log(`Open Branch Count: ${data}`);
    openBranchCount = data;
  })
  .catch((err) => {
    console.error(err);
  });


let avgOrderTime;
getValueFromRedis("averageOrderTime")
  .then((data) => {
    console.log(`averageOrderTime Count: ${data}`);
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


  

//console.log(`Open Branch Count: ${openBranchCount}`);
//console.log(openBranchCount);
//get data from redis
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

