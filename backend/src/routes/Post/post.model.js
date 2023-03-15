import mongoose from 'mongoose';


let postSchema = new mongoose.Schema({
  _region: { type: String, required: false },
  _branch: { type: String, required: false },
  _topping: {type: Array, required: true },
  _createdAt: { type: Date},
  _ttl: {type: Date},
});


export const Post = mongoose.model('namePostSchema', postSchema);