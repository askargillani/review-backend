import mongoose from "mongoose";
 
const schema = new mongoose.Schema({
        employeeName: String,
        reviews: []
})

export const Employee = mongoose.model("Employee", schema);