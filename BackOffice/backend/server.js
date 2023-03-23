import express from "express";
//import socketIO from 'socket.io';
import {getValueFromRedis} from './src/getDataFromRedis.js';
import cors from 'cors';
import { io } from 'socket.io-client';


// database connection
const app = express();

// Enable CORS for all routes
app.use(cors());
const socket = io('http://localhost:80');

// ############## REDIS QUERIES ##################

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
let tomatoesCount;
getValueFromRedis("tomatoesCount")
  .then((data) => {
    console.log(`tomatoesCount Count: ${data}`);
    tomatoesCount = data;
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


  // ###############################################

app.get('/api/data', (req, res) => {
  res.json({
    openBranchCount,
    avgOrderTime,
    openOrdersCount,
    TotalOrdersCount,
    NorthOrderCount,
    HaifaOrderCount,
    CentralOrderCount,
    DanOrderCount,
    SouthOrderCount,
    tomatoesCount,
    onionsCount,
    peppersCount,
    mushroomCount,
    pepperoniCount,
    tunaCount,
  });
});

const port = process.env.PORT || 81;
app.listen(port, console.log(`Listening on port ${port} ...`));

