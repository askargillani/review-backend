import { saveReviews } from "../repository/conversations.js";

export const SaveReview = async (req,res,next) => {
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
        saveReviews(employeeName,
            programmingSkillsScale,
            programmingSkillsComments,
            senseOfResponsibilityScale,
            senseOfResponsibilityComments,
            teamworkScale,
            teamworkComments,
            selfLearningScale,
            selfLearningComments,
            professionalAppearanceScale,
            professionalAppearanceComments
        )
        
        res.status(201).json({
            saved: true
        })
    }
    catch(error) {
        next(error);
    }
}