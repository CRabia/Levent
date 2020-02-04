import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  user_role: {
    type: Number,
    default: 1
  }
});

const User = mongoose.model("User", userSchema);
export default User;
