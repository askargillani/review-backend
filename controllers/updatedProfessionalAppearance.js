import { getContext } from "../repository/conversations.js";
import { getManagerReviews} from "../repository/conversations.js";
import { finalReviewService } from "../gptServices/finalReview.js";

export const updatedProfessionalAppearance = async (req,res,next) => {
    try {
        const conversationId = req.query.conversationId;
        const name = req.query.name;
        const conversation = await getContext(conversationId);
        const managerReviews = await getManagerReviews(name);
        var response = await finalReviewService.giveScaleAndCommentOfProfessionalAppearance(conversation, managerReviews,name);
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