import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  addresses: [
    {
      addresse: String,
      city: String
    }
  ],
  date: {
    type: Date,
    required: true
  }
});

const Event = mongoose.model("Friend", eventSchema);
export default Event;
