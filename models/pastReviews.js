import mongoose from "mongoose";

// Define the schema for the review
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    skills: {
        programmingSkills: {
            scale: {
                type: Number,
                min: 1,
                max: 5
            },
            comments: {
                type: String,
                maxlength: 15
            }
        },
        senseOfResponsibility: {
            scale: {
                type: Number,
                min: 1,
                max: 5
            },
            comments: {
                type: String,
                maxlength: 10
            }
        },
        teamWork: {
            scale: {
                type: Number,
                min: 1,
                max: 5
            },
            comments: {
                type: String,
                maxlength: 15
            }
        },
        selfLearning: {
            scale: {
                type: Number,
                min: 1,
                max: 5
            },
            comments: {
                type: String,
                maxlength: 15
            }
        },
        professionalAppearance: {
            scale: {
                type: Number,
                min: 1,
                max: 5
            },
            comments: {
                type: String,
                maxlength: 15
            }
        }
    }
});

// Create the model based on the schema
export const PastReviews = mongoose.model("PastReview", schema);
