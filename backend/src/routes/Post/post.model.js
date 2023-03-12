import mongoose from 'mongoose';

// Set the 'strictQuery' option to 'false' globally for Mongoose
mongoose.set('strictQuery', false);

let postSchema = new mongoose.Schema({
  _region: { type: String, required: true },
  _branch: { type: String, required: true },
  _topping: {type: Array, required: true },
  _createdAt: { type: Date, default: Date.now },
  _ttl: {
    type: Date,
    default: () => {
      const now = new Date();
      const randMinutes = Math.floor(Math.random() * 160);
      const randMillis = randMinutes * 60 * 1000;
      const futureTime = now.getTime() + randMillis;
      return new Date(futureTime);
    },
  },
});


export const Post = mongoose.model('orders1', postSchema);