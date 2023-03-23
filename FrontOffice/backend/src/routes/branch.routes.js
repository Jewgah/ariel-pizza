import express from "express";
import { check } from 'express-validator';
// import { checkExpressValidor } from "../../middleware/express-validator.middleware.js";
import { branchController } from "../controllers/branch.controllers.js";

export class branchRoute {
    router = express.Router();
    controller = new branchController();

    constructor() {
      this.initializeRoutes()
}

    initializeRoutes() {        
      //newbranch  
      this.router.post("/newbranch",[
     
        check("_region", "Please enter a region").notEmpty(),
        check("_branch", "Please enter a valide branch").notEmpty(),
        check("_action", "Please enter a valide branch").notEmpty(),
      
      ],(req,res)=>this.controller.newbranch(req,res));  

      // //branchesbyregion
      // this.router.post("/branchesbyregion",[
      //   check("_region", "Please select a region").notEmpty(),
      // ],(req,res)=>this.controller.getAllOpenBranchesByRegion(req,res));  
    }
  
  }
  