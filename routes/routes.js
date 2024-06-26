import express from "express";
import { GetConversationId } from "../controllers/getConversationId.js";
import { PromptMessage } from "../controllers/promptMessage.js";
import { EmployeePromptMessage } from "../controllers/employeePrompt.js";
import { FinalReviewPrompt } from "../controllers/finalReviewPrompt.js";
import { updatedProgrammingSkills } from "../controllers/updatedProgrammingSkills.js";
import { updatedSenseOfResponsibility } from "../controllers/updatedSenseOfResponsibility.js";
import { updatedTeamWork } from "../controllers/updatedTeamWork.js";
import { updatedSelfLearning } from "../controllers/updatedSelfLearning.js";
import { updatedProfessionalAppearance } from "../controllers/updatedProfessionalAppearance.js";
import { SaveReview } from "../controllers/saveReview.js";
import { compareReviews } from "../controllers/compareReviews.js";

const router = express.Router();

router.get("/GetConversationId", GetConversationId);
router.post("/PromptMessage", PromptMessage);
router.post("/EmployeePrompt", EmployeePromptMessage);
router.post("/FinalReviewPrompt", FinalReviewPrompt);
router.get("/updatedProgrammingSkills", updatedProgrammingSkills);
router.get("/updatedSenseOfResponsibility", updatedSenseOfResponsibility);
router.get("/updatedTeamWork", updatedTeamWork);
router.get("/updatedSelfLearning", updatedSelfLearning);
router.get("/updatedProfessionalAppearance", updatedProfessionalAppearance);
router.post("/saveReview", SaveReview);
router.post("/compareReview",compareReviews)
export default router;
