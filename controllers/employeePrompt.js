import { getContext,addContext,addSelfReview } from "../repository/conversations.js";
import { selfReviewService } from "../gptServices/selfReviewService.js";

export const EmployeePromptMessage = async (req,res,next) => {
    try {
        var conversation = await getContext(req.body.conversationId);
        var prompt = req.body.prompt;
        var gptResponseJson = await selfReviewService.chatCompletion(conversation.context,prompt);
        var gptResponse = JSON.parse(gptResponseJson)
        await addContext(conversation._id,{"role" : "user" ,"content" : req.body.prompt});
        await addContext(conversation._id,{"role" : "gpt" ,"content" : gptResponse.response});
        var updatedConversation = await getContext(req.body.conversationId);
        if(gptResponse.employeeName && gptResponse.review) {
            await addSelfReview(gptResponse.employeeName, gptResponse.review);
        }
        res.status(201).json({
            conversationId: req.body.conversationId,
            conversation: updatedConversation.context
        })
    }
    catch(error) {
        next(error);
    }
}