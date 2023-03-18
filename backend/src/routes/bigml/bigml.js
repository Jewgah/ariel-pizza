//Import MongoDB connection
import {mongo_connection} from "./ConnectMongoDB.js"

//Import BigML connection
import {bigml} from "bigml";

const connection = new bigml.BigML('ORIMENDEL','1f3caca0bf1faeb3df5a68cba36e455396e7242e'); //my API
const source = new bigml.Source(connection);
let modelInfo = {}; //for prediction function


//here we create a new model when the user press the button Build Model
async function buildModel(){
    await mongo_connection.mongoToCsv();
    var source = new bigml.Source(connection);
    source.create('./arielpizza_orders.csv', function (error, sourceInfo) {
        if (!error && sourceInfo) {
            var dataset = new bigml.Dataset(connection);
            dataset.create(sourceInfo, function (error, datasetInfo) {
                if (!error && datasetInfo) {
                    var model = new bigml.Model(connection);
                    model.create(datasetInfo, function (error, model) {
                        if (!error && model) {
                            console.log("Model has been built successfully with code: " + model.code);
                            modelInfo = model;
                        } else {
                            console.log("There is a problem to create the model");
                        }
                    });
                } else {
                    console.log("There is a problem to create the dataset");
                }
            });
        } else {
            console.log("There is a problem to create the source");
        }
    });
}

//predict function in bigml (dashboard)
function predict(arr){
    
    // if(modelInfo = {}){
    //     var str = "No Model available now! Please click \"Build Model\"";
    //     console.log(str);
    //     return str;
    // }
    console.log("inserting values: " + arr);

    const statusToPredict = {'_id':1,'_region':arr[0], '_branch': arr[1],'_topping':Array(arr[2]) ,
     '_createdAt':arr[3], '_ttl':arr[4]};
    const prediction = new bigml.Prediction(connection);

    return new Promise((resolve,reject)=>{
        prediction.create(modelInfo, statusToPredict ,function (error, predictionInfo) {
            if (!error && predictionInfo) {
                // result to the console
                console.log("Prediction result: "+predictionInfo.object.output);
                console.log("confidence: " + predictionInfo.object.prediction_path.confidence)
                console.log("probabilities: " + predictionInfo.object.probabilities)
                const str = "-- " + predictionInfo.object.output + " --  with confidence of " + 
                (predictionInfo.object.prediction_path.confidence * 100).toString() + "%";
                resolve(str);
            } else {
                console.log("Error when the model try to predict the status");
            }
        });
        
    });
 
};

// buildModel();
module.exports = {buildModel ,predict};