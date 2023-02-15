import express from "express";
import { check } from 'express-validator';
// import { checkExpressValidor } from "../../middleware/express-validator.middleware.js";
import { postController } from "./post.controllers.js";

export class postRoute {
    router = express.Router();
    controller = new postController();

    constructor() {
      this.initializeRoutes()
    }

    initializeRoutes() {        
      this.router.post("/new",[
        check("_region", "Please enter a region").notEmpty(),
        check("_branch", "Please enter a valide branch").notEmpty(),
        check("_topping", "Please enter a topping").notEmpty(),
        // checkExpressValidor,
      ],(req,res)=>this.controller.new(req,res));  

    }
  
  }
  