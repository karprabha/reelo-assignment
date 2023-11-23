import expressAsyncHandler from "express-async-handler";

import { Question } from "../models/index.js";

const generateQuestionPaper = expressAsyncHandler(async (req, res, next) => {

    res.json({ msg: 'paper generated' });
});

export default {
    generateQuestionPaper,
};