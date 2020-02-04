import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  friendId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Friend = mongoose.model("Friend", friendSchema);
export default Friend;
