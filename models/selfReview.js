import mongoose from "mongoose";
 
const schema = new mongoose.Schema({
        employeeName: String,
        selfReviews: []
})

export const SelfReview = mongoose.model("SelfReview", schema);