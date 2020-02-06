import mongoose from "mongoose";

const eventCategorySchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }
});

const EventCategory = mongoose.model("EventCategory", eventCategorySchema);
export default EventCategory;
