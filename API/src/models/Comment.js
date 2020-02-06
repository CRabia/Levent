import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
