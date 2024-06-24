import express from "express";
import { GetConversationId } from "../controllers/getConversationId.js";
import { PromptMessage } from "../controllers/promptMessage.js";
import { EmployeePromptMessage } from "../controllers/employeePrompt.js";
import { FinalReviewPrompt } from "../controllers/finalReviewPrompt.js";
import { updatedProgrammingSkills } from "../controllers/updatedProgrammingSkills.js";
const router = express.Router();

router.get("/GetConversationId", GetConversationId);
router.post("/PromptMessage", PromptMessage);
router.post("/EmployeePrompt", EmployeePromptMessage);
router.post("/FinalReviewPrompt", FinalReviewPrompt);
router.get("/updatedProgrammingSkills", updatedProgrammingSkills);
export default router;
