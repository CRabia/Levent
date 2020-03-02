import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
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
    },
    price: {
        type: Number,
        required: true
    },
    website: {
        type: String,
        required: false
    },
    typeOf: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        required: true
    },
    publicationStatus: {
        type: Boolean,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
