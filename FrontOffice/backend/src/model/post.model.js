import mongoose from 'mongoose';
import { InitiateMongoServer } from "../config/db.js";

let postSchema = new mongoose.Schema({
  _region: { type: String, required: true },
  _branch: { type: String, required: true },
  _topping: {type: Array, required: true },
  _createdAt: { type: Date},
  _ttl: { type: Date },
});


export const Post = mongoose.model('orders', postSchema);

InitiateMongoServer();

