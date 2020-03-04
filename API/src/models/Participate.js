import mongoose from "mongoose";

const participateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }
});

const Participate = mongoose.model("Participate", participateSchema);
export default Participate;
