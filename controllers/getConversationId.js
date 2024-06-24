import { Conversation } from "../models/conversation.js";
import { addContext } from "../repository/conversations.js";

export const GetConversationId = async (req,res,next) => {
    try {
        const conversation = await Conversation.create({
            context : []

        })
        const response =
        await addContext(conversation._id,{"role" : "gpt" ,"content" : "Hey, how can I help you?"});
        res.status(201).json({
            conversationId: conversation._id,
            conversation: response.context
        })
    }
    catch(error) {
        next(error);
    }
}