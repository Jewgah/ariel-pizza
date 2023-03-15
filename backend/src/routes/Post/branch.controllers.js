import { Branch } from "./branch.model.js";

export class branchController {
    constructor() {
    }
    async newbranch(req, res) {
        try {
            const {_region, _branch, _action } = req.body;
            const branch = new Branch({
                _region, 
                _branch,
                _action
            })
            
            try{
                await branch.save();
                 res.status(200).send({ status:200, branch: branch, message: "success post created" });
            }catch(error){
                 res.status(500).send({
                    status: 500,
                    message: error.message,
                    type: 'TypeError.AnthError'
                })
            }

        } catch (error) {
            console.log(error);
             res.status(500).send({ status:500,message: "Internal Server Error" });
        }
    }

}
