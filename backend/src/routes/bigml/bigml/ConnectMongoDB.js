import { MongoClient } from 'mongodb';
import fastcsv from 'fast-csv';
import fs from 'fs';
import { sep } from 'path';


//my connection, with my usename and password (also in env)
const uri = "mongodb+srv://ormendel:1234@cluster0.czuhh3m.mongodb.net/DataPizza?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = "DataPizza";
const db = client.db(dbName);
const collection = db.collection("orders");


async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected correctly to server"); 
    } catch (e) {
        console.error(e);
    }
}

// For BigML we need to convert the data in mongo to csv
export async function mongoToCsv(){
    await client.connect();
     
    const result = await collection.find({}).toArray();
    let jsonResult = JSON.stringify(result, '\t');
    let seperatedValues = jsonResult.split(',');
    console.log("\n"+"this is the seperated document values:\n");
    console.log(seperatedValues);
    
    fs.writeFileSync('orders.json',jsonResult);
    console.log("check here if orders.json is ok");

    await collection.find({}).toArray((err, data) => {
        if (err) throw err;

        const ws = fs.createWriteStream("arielpizza_orders.csv"); 
        fastcsv.write(data, { headers: true }).on("finish", function() {
            console.log("Written to arielpizza_orders.csv successfully!");
          }).pipe(ws);
      });
};

//module.exports = {MongoClient, insertToMongo ,mongoToCsv};