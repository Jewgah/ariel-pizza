//Import MongoDB connection
import {mongoToCsv} from "./ConnectMongoDB.js"

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
const prediction = new bigml.Prediction(connection);
extractRules(rules,items);}

const extractRules = (rules, items) => {
    const sets = [];
    for (let i = 0; i < rules.length; ++i) {
      const antecedent = rules[i].lhs;
      const consequent = rules[i].rhs;
      let antecedents = "";
      let consequents = "";
  
      for (let i = 0; i < antecedent.length; ++i) {
        antecedents += items[antecedent[i]].name;
        if (i < antecedent.length - 1) antecedents += ", ";
      }
      for (let i = 0; i < consequent.length; ++i) {
        consequents += items[consequent[i]].name;
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
    predict(data_row)
    data_row = []
    })
    .on('end', () => {
      // Here you can do something with toppingsArray
      toppingsArray.forEach((data_row,toppings, index) => {
        console.log(`order #${index + 1} has toppings: ${toppings.join(', ')}`)
        });
        
    });
}

saveToppings();
