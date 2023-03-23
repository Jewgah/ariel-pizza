import express from "express";
import cors from "cors";
import "./src/Kafka/post.consume.js"
import { postRoute } from "./src/routes/post.routes.js";
import { branchRoute } from "./src/routes/branch.routes.js";
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import {SocketServer} from './src/config/socketServer.js';

const __dirname = path.resolve();
dotenv.config();

let reactRoute = (req, res, next) => {
    res.sendFile(path.join(__dirname,'public', 'index.html')); // relative path
}

const app = express();
const server = http.createServer(app);

//attach server to socket
const socketServer  = new SocketServer(server);


app.use(bodyParser.json({limit: "500mb"}));
app.use(bodyParser.urlencoded({limit: "500mb", extended: true, parameterLimit:5000000}));

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/post", new postRoute().router);
app.use("/api/branch", new branchRoute().router);

app.use(express.static('public'));

app.get("/*", reactRoute)

// transporter.verify().then(console.log('Nodemailer connected')).catch(console.error);

// Serve socket.io client library
app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules/socket.io/client-dist/socket.io.js'));
  });
  
const port = process.env.PORT || 80;
// app.listen(port, console.log(`Listening on port ${port} ...`));
server.listen(port, console.log(`Listening on port ${port} ...`));

export {socketServer}
