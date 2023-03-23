import mongoose from 'mongoose';


let branchSchema = new mongoose.Schema({
  _region: { type: String, required: false },
  _branch: { type: String, required: false },
  _action: { type: String, required: false },
  _createdAt: { type: Date, default: Date.now },
});


export const Branch = mongoose.model('branchs', branchSchema);