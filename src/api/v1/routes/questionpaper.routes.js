import { Router } from "express";

import { questionPaperValidator } from "../validators/index.js";
import { questionpaperController } from "../controllers/index.js";
import { queryValidationMiddleware } from "../middlewares/index.js";

const router = Router();

router.post(
    "/question-papers",
    questionPaperValidator.generateQuestionPaperValidator,
    queryValidationMiddleware,
    questionpaperController.generateQuestionPaper,
);

export default router;
