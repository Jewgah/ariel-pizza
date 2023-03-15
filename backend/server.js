import express from "express";
import cors from "cors";

import { InitiateMongoServer } from "./src/config/db.js";
import { postRoute } from "../backend/src/routes/Post/post.routes.js";
import { branchRoute } from "../backend/src/routes/Post/branch.routes.js";
import dotenv from 'dotenv'


import bodyParser from 'body-parser';
import path from 'path';

const __dirname = path.resolve();
dotenv.config();

let reactRoute = (req, res, next) => {
    res.sendFile(path.join(__dirname,'public', 'index.html')); // relative path
}

// database connection
const app = express();
InitiateMongoServer();

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


const port = process.env.PORT || 80;
app.listen(port, console.log(`Listening on port ${port} ...`));



