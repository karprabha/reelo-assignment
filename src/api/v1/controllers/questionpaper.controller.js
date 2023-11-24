import expressAsyncHandler from "express-async-handler";

import { questionPaperService } from "../services/index.js";

const generateQuestionPaper = expressAsyncHandler(async (req, res, next) => {
    const { totalMarks, subjectName, difficultyDistribution } = req.body;

    const questionPaper = await questionPaperService.generateQuestionPaper(
        totalMarks,
        subjectName,
        difficultyDistribution,
    );

    return res.status(200).json({ questionPaper });
});

export default {
    generateQuestionPaper,
};
