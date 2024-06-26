import { getPastReview } from "../repository/conversations.js";
import { finalReviewService } from "../gptServices/finalReview.js";

export const compareReviews = async (req,res,next) => {
    try {

        var employeeName = req.body.employeeName;

        var programmingSkillsScale = req.body.programmingSkillsScale;
        var programmingSkillsComments = req.body.programmingSkillsComments;
    
        var senseOfResponsibilityScale = req.body.senseOfResponsibilityScale;
        var senseOfResponsibilityComments = req.body.senseOfResponsibilityComments;
    
        var teamworkScale = req.body.teamworkScale;
        var teamworkComments = req.body.teamworkComments;
    
        var selfLearningScale = req.body.selfLearningScale;
        var selfLearningComments = req.body.selfLearningComments;
    
        var professionalAppearanceScale = req.body.professionalAppearanceScale;
        var professionalAppearanceComments = req.body.professionalAppearanceComments;
        const pastReview = await getPastReview(employeeName);
        const currentReview = {
            employeeName: employeeName,
            programmingSkillsScale: programmingSkillsScale,
            programmingSkillsComments: programmingSkillsComments,
            senseOfResponsibilityScale: senseOfResponsibilityScale,
            senseOfResponsibilityComments: senseOfResponsibilityComments,
            teamworkScale: teamworkScale,
            teamworkComments: teamworkComments,
            selfLearningScale: selfLearningScale,
            selfLearningComments: selfLearningComments,
            professionalAppearanceScale: professionalAppearanceScale,
            professionalAppearanceComments: professionalAppearanceComments
        }
        const response = await finalReviewService.compareReviews(pastReview,currentReview);
        
        res.status(201).json({
            response: response
        })
    }
    catch(error) {
        next(error);
    }
}