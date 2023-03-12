import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

// Set the 'strictQuery' option to 'false' globally for Mongoose
mongoose.set('strictQuery', false);

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