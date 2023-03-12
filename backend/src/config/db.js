import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

export const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(`${process.env.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,  
     
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};