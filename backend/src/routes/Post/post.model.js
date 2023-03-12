import mongoose from 'mongoose';

let branchSchema = new mongoose.Schema({
  branch_name: { type: String, required: true },
  is_open: { type: Boolean, default: true, index: true },
});

let postSchema = new mongoose.Schema({
  _region: { type: String, required: true },
  _branch: { type: branchSchema, required: true },
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

//unallow generating order from closed branch
postSchema.pre('save', async function (next) {
  const branch = await Branch.findOne({ branch_id: this._branch.branch_id, is_open: true });
  if (!branch) {
    const error = new Error(`Cannot create pizza order for closed branch ${this._branch.branch_id}`);
    return next(error);
  }
  next();
});
