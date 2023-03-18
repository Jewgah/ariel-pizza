import express from 'express';
import { MongoClient } from 'mongodb';
import fastcsv from 'fast-csv';
import fs from 'fs';


//my connection, with my usename and password (also in env)
const uri = "mongodb+srv://ormendel:1234@cluster0.czuhh3m.mongodb.net/DataPizza?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const dbName = "DataPizza";
const db = client.db(dbName);
const collection = db.collection("orders1");


async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected correctly to server"); 
    } catch (e) {
        console.error(e);
    }
}

// Here we insert the data to MongoDB
async function insertToMongo(msg){
    try{
        await client.connect();
        const p = await collection.insertOne(msg);
        console.log("inserted to MongoDB successfully");
    }catch(e){
        console.error(e);
    }finally{
        await client.close();
    }
};

// For BigML we need to convert the data in mongo to csv
export async function mongoToCsv(){
    await client.connect();
     
    await collection.find({}).toArray((err, data) => {
        if (err) throw err;

        const ws = fs.createWriteStream("arielpizza_orders.csv"); 
        fastcsv.write(data, { headers: true }).on("finish", function() {
            console.log("Written to arielpizza_orders.csv successfully!");
          }).pipe(ws);
      });
};


//module.exports = {MongoClient, insertToMongo ,mongoToCsv};