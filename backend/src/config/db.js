import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

// Set the 'strictQuery' option to 'false' globally for Mongoose
mongoose.set('strictQuery', false);
const mongoURL = "mongodb+srv://ormendel:1234@cluster0.czuhh3m.mongodb.net/DataPizza?retryWrites=true&w=majority";

export const InitiateMongoServer = async () => {
  try {
    console.log(`${process.env.DB}`);
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,  
     
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};