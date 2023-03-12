import { MongoClient, ObjectId  } from 'mongodb';

const uri = "mongodb+srv://ormendel:1234@cluster0.czuhh3m.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);


client.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to MongoDB');
  }
});

export function sendToMongo(message) {
  const db = client.db('Cluster0');
  const collection = db.collection('messages');

  
  //doc._id = new ObjectId();
  collection.insertOne(message, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Message saved to MongoDB');
    }
  });
}

