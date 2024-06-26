import { getContext,addContext } from "../repository/conversations.js";
import { finalReviewService } from "../gptServices/finalReview.js";

export const FinalReviewPrompt = async (req,res,next) => {
    try{
        await addContext(req.body.conversationId,{"role" : "user" ,"content" : req.body.prompt});
        var context = await getContext(req.body.conversationId);
        context = Object.values(context.context)
        context = context.map(msg => {
            return {
              "role": msg.role == 'gpt'?'assistant':'user',
              "content": msg.content || msg.message
            };
          });
        var gptResponse = await finalReviewService.handlePrompt(context);
        gptResponse = JSON.parse(gptResponse);
        await addContext(req.body.conversationId,{"role" : "assistant" ,"content" : gptResponse.response});
        res.status(201).json({
            name: gptResponse.name,
            impacts: gptResponse.impactAnalysis,
            conversation: (await getContext(req.body.conversationId)).context,
            conversationId: req.body.conversationId
        })
    }catch(error){
        next(error);
    }
}