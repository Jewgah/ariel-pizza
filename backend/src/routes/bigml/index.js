import express from 'express';
const app = express();
import http from 'http';
const server = http.createServer(app);
import socketIO from 'socket.io';
const io = socketIO(server);
const port = 3002;

import {mongodb} from "./ConnectMongoDB.js";
import {bigml_var} from "./bigml.js";

import bodyParser from 'body-parser';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//--------------ejs---------------------
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', (req, res) => res.render('Dashboard'));


app.get("/buildModel",async (req,res) => {
      await bigml_var.buildModel();
      res.redirect('/');
  })
  .get("/csv", mongodb.mongoToCsv)
  .get('/predictStatus/:createdAt/:ttl/:region/:branch/:toppings', async (req, res) => {
      var arr = [  req.params.createdAt,
                req.params.ttl,
                req.params.region,
                req.params.branch,
                req.params.toppings];

    console.log(await bigml_var.predict(arr))
    const value = await bigml_var.predict(arr);

    // alert(value);
    // res.redirect('/');
    // req.session['predictValue'] = value;
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="vieworder" content="width=device-width, initial-scale=1.0">
        <script src="/index.js" type="text/javascript"></script>
        <title>Results</title>
    </head>
    <body>
        <h1 display="flex" text-align="center" style="color:rgb(16, 10, 118)">Result of Prediction : ${value}</h1>
        <body style="background-color:rgb(174, 235, 225);">
        <button type="button" onclick="location.href='http:/'+'/'+'localhost:3002'" >Go Back</button>
    </body>
    </html>`;

    res.send(html);
    // res.sendFile('public/predict.html', {root: __dirname })
    // res.send("Prediction result : " + value);
    

});



server.listen(port, () => console.log(`System C app listening at http://localhost:${port}`));