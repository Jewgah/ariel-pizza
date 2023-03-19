const express = require('express')
const app = express();
const socketIO = require('socket.io');
const {getOpenBranchCount} = require('../DashboardWithWs/public/js/core/getDataFromRedis');

const port=3001;

app.use(express.static('public'))
app.set('view engine', 'ejs')


let openBranchCount;

getOpenBranchCount()
  .then((data) => {
    console.log(`Open Branch Count: ${data}`);
    openBranchCount = data;
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
      {districtId:"open_branchs", title: "סניפים פתוחים", value: openBranchCount, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "store" },
      {districtId:"average_time", title: "זמן טיפול ממוצע", value: 1500, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "timelapse" },
      {districtId:"total_open_orders", title: "סהײכ הזמנות פתוחות", value: 3500, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "local_shipping" },
      {districtId:"total_orders", title: "סהײכ הזמנות היום", value: 700, unit: "חבילות", fotterIcon: "", fotterText: "נפח ממוצע", icon: "add_shopping_cart" }
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

