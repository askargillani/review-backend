import mongoose from "mongoose";

// Define the schema for the review
const schema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    programmingSkillsScale: {
        type: Number,
        min: 1,
        max: 5
    },
    programmingSkillsComments: {
        type: String,
        maxlength: 100
    },
    senseOfResponsibilityScale: {
        type: Number,
        min: 1,
        max: 5
    },
    senseOfResponsibilityComments: {
        type: String,
        maxlength: 100
    },
    teamworkScale: {
        type: Number,
        min: 1,
        max: 5
    },
    teamworkComments: {
        type: String,
        maxlength: 100
    },
    selfLearningScale: {
        type: Number,
        min: 1,
        max: 5
    },
    selfLearningComments: {
        type: String,
        maxlength: 100
    },
    professionalAppearanceScale: {
        type: Number,
        min: 1,
        max: 5
    },
    professionalAppearanceComments: {
        type: String,
        maxlength: 100
    }
});

// Create the model based on the schema
export const PastReview = mongoose.model("PastReview", schema);
