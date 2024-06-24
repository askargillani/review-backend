import { Conversation } from "../models/conversation.js";
import { Employee } from "../models/reviews.js";
import { SelfReview } from "../models/selfReview.js";
import { PastReviews } from "../models/pastReviews.js";

export async function addContext(conversationId, message) {
    try {
        // Example: Find existing conversation by conversationId
        const existingConversation = await Conversation.findOne({ _id: conversationId });
        if (!existingConversation) {
            throw new Error('Conversation not found');
        }
        existingConversation.context.push(message); // Assuming messages is an array field

        // Example: Save updated conversation
        await existingConversation.save();

        return existingConversation;
    } catch (error) {
        console.error('Error adding context:', error.message);
        // Handle error (e.g., log it, throw further, etc.)
    }
}

export async function getContext(conversationId) {
    try {
        // Example: Find existing conversation by conversationId
        const existingConversation = await Conversation.findOne({ _id: conversationId });

        if (!existingConversation) {
            throw new Error('Conversation not found');
        }

        return existingConversation;
    } catch (error) {
        console.error('Error adding context:', error.message);
        // Handle error (e.g., log it, throw further, etc.)
    }
}

export async function addReview(name, review) {
    try {
        // Example: Find existing conversation by conversationId
        const existingEmployee = await Employee.findOne({ employeeName: new RegExp(`^${name}$`, 'i')  });

        if (existingEmployee) {
            existingEmployee.reviews.push(review); // Assuming review is an array field

            // Example: Save updated conversation
            await existingEmployee.save();
            return true;
        }
        else{
            const newEmployee = new Employee({
                employeeName: name,
                reviews: [review] // Initialize with the new review
            });

            // Save the new conversation
            await newEmployee.save();
            return false;
        }
    } catch (error) {
        console.error('Error adding review:', error.message);
        // Handle error (e.g., log it, throw further, etc.)
    }
}

export async function addSelfReview(name, review) {
    try {
        // Example: Find existing conversation by conversationId
        const existingSelfReview = await SelfReview.findOne({ employeeName: new RegExp(`^${name}$`, 'i')  });

        if (existingSelfReview) {
            existingSelfReview.selfReviews.push(review); // Assuming review is an array field

            // Example: Save updated conversation
            await existingSelfReview.save();
            return true;
        }
        else{
            const selfReview = new SelfReview({
                employeeName: name,
                selfReviews: [review] // Initialize with the new review
            });

            // Save the new conversation
            await selfReview.save();
            return false;
        }
    } catch (error) {
        console.error('Error adding review:', error.message);
        // Handle error (e.g., log it, throw further, etc.)
    }
}

export async function findPastReviews(name) {
    const pastReviews = await PastReviews.find({
        employeeName: {
          $regex: new RegExp(`^${name}$`, 'i')
        }
      });
    return pastReviews;
}

export async function getManagerReviews(name) {
    try {
        const existingEmployee = await Employee.findOne({ employeeName: new RegExp(`^${name}$`, 'i')  });

        if (existingEmployee) {
            return existingEmployee.reviews;
        }
        else{
            return null;
        }
    } catch (error) {
        console.error('Error adding review:', error.message);
    }
}