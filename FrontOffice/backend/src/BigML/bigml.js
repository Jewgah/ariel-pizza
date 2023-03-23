//Import MongoDB connection
import {mongoToCsv} from "./ConnectMongoBigML.js"

//Import BigML connection
import bigml from "bigml";

const connection = new bigml.BigML('ORIMENDEL','1f3caca0bf1faeb3df5a68cba36e455396e7242e'); //my API
let modelInfo = {}; //for prediction function


//here we create a new model when the user press the button Build Model
export async function buildModel()
{
    await mongoToCsv();
    var source = new bigml.Source(connection);
    console.log("check")
    source.create('./arielpizza_orders.csv', function(error,sourceInfo)
    {
        var dataset = new bigml.Dataset(connection);
        dataset.create(sourceInfo, function (error, datasetInfo) 
        {
            if (!error && datasetInfo) 
            {
                var model = new bigml.Model(connection);
                model.create(datasetInfo, function (error, model) 
                {
                    if (!error && model) 
                    {
                        console.log("Model has been built successfully with code: " + model.code);
                        modelInfo = model;
                    } 
                    else
                    {
                        console.log("There is a problem to create the model");
                    }
                });
            }
            else 
            {
                console.log("There is a problem to create the dataset");
            }
        });
    } 
    );
} 

//predict function in bigml (dashboard)
export async function predict(arr){

    const rules = modelInfo.object.associations.rules;
    console.log("RULES: ", rules);

    const items = modelInfo.object.associations.items;

    const sets = extractRules(rules, items);
    
console.log("inserting values: " + arr);

const statusToPredict = {'_id':1,'_region':arr[0], '_branch': arr[1],'_topping':Array(arr[2]) ,
    '_createdAt':arr[3], '_ttl':arr[4]};

    if (statusToPredict._topping) { // check if _topping is defined
        const predictionToppings = statusToPredict._topping.filter((item) => {
            return item != ""; // exclude empty strings
        });
        
        statusToPredict._topping = predictionToppings;
    }    

const prediction = new bigml.Prediction(connection);
prediction.create(modelInfo.resource, inputData, function(error, prediction) {
    if (!error && prediction) {
        const output = prediction.object.output;
        console.log("prediction: ", output);
    } else {
        console.log("Failed to make prediction");
    }
});
}

const extractRules = (rules, items) => {
    const sets = [];
    for (let i = 0; i < rules.length; ++i) {
      const antecedent = rules[i].lhs;
      const consequent = rules[i].rhs;
      let antecedents = "";
      let consequents = "";
  
      for (let i = 0; i < antecedent.length; ++i) {
        antecedents += items[antecedent[i]]._topping;
        if (i < antecedent.length - 1) antecedents += ", ";
      }
      for (let i = 0; i < consequent.length; ++i) {
        consequents += items[consequent[i]]._topping;
        if (i < consequent.length - 1) consequents += ", ";
      }
      const support = rules[i].support[0] * 100 + "%";
      const confidence = rules[i].confidence * 100 + "%";
      const count = rules[i].support[1];
      sets.push({
        antecedent: antecedents,
        consequent: consequents,
        support: support,
        confidence: confidence,
        count: count,
      });
    }
    return sets;
  };

import fs from 'fs';
import csv from 'csv-parser';

export async function saveToppings() 
{
  const toppingsArray = [];
  const data_row = [];
  fs.createReadStream('arielpizza_orders.csv')
    .pipe(csv())
    .on('data', (row) => {
    
    data_row.push()
    const toppings = row._topping.split(',');
    toppingsArray.push(toppings);
    data_row = []
    })
    .on('end', () => {
      // predict function for the whole collection
      predict(data_row);
      toppingsArray.forEach((data_row,toppings, index) => {
        console.log(`order #${index + 1} has toppings: ${toppings.join(', ')}`)
    
        });
        
    });
}
buildModel();
saveToppings();
