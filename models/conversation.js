import mongoose from "mongoose";
 
const schema = new mongoose.Schema({
        context: []
})

export const Conversation = mongoose.model("Conversation", schema);