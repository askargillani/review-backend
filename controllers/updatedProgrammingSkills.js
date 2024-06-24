import { getContext } from "../repository/conversations.js";
import { getManagerReviews, findPastReviews } from "../repository/conversations.js";
import { finalReviewService } from "../gptServices/finalReview.js";

export const updatedProgrammingSkills = async (req,res,next) => {
    try {
        const conversationId = req.query.conversationId;
        const name = req.query.name;
        const conversation = await getContext(conversationId);
        const managerReviews = await getManagerReviews(name);
        const pastManagerReviews = await findPastReviews(name);
        var response = await finalReviewService.giveScaleAndCommentOfProgrammingSkills(conversation, managerReviews, pastManagerReviews,name);
        response = JSON.parse(response);
        res.status(201).json({
            scale: response.scale,
            comments: response.comments
        })
    }
    catch(error) {
        next(error);
    }
}