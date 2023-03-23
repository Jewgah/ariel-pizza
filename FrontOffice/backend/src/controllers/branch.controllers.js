// import { Branch } from "../model/branch.model.js";
import { sendBranch } from "../Kafka/post.sendToKafka.js";

export class branchController {
    constructor() {
    }
    async newbranch(req, res) {
        try {
            const {_region, _branch, _action } = req.body;

            sendBranch(
                _region, 
                _branch,
                _action,
            );
            
            try{
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
