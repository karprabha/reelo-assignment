import { Question } from "../models/index.js";

const pickQuestions = (questions, totalMarks) => {
    questions.sort((a, b) => a.marks - b.marks);

    const selectedQuestions = [];
    let remainingMarks = totalMarks;

    while (remainingMarks > 0) {
        if (questions.length === 0) {
            throw new Error(
                `Not enough questions for the given difficulty level.`,
            );
        }

        const selectedQuestion = questions.pop();
        if (selectedQuestion.marks <= remainingMarks) {
            selectedQuestions.push(selectedQuestion);
            remainingMarks -= selectedQuestion.marks;
        }
    }

    return selectedQuestions.map(
        ({ text, subject, topic, difficulty, marks }) => ({
            text,
            subject,
            topic,
            difficulty,
            marks,
        }),
    );
};

const distributeQuestions = (totalMarks, difficultyDistribution, questions) => {
    const distributedQuestions = [];

    const easyPercentage = difficultyDistribution.easy || 0;
    const mediumPercentage = difficultyDistribution.medium || 0;
    const hardPercentage = difficultyDistribution.hard || 0;

    const totalMarksForEasy = Math.round((easyPercentage / 100) * totalMarks);
    const totalMarksForMedium = Math.round(
        (mediumPercentage / 100) * totalMarks,
    );
    const totalMarksForHard = Math.round((hardPercentage / 100) * totalMarks);

    const easyQuestions = questions.filter((q) => q.difficulty === "easy");
    const mediumQuestions = questions.filter((q) => q.difficulty === "medium");
    const hardQuestions = questions.filter((q) => q.difficulty === "hard");

    distributedQuestions.push(
        ...pickQuestions(easyQuestions, totalMarksForEasy),
    );
    distributedQuestions.push(
        ...pickQuestions(mediumQuestions, totalMarksForMedium),
    );
    distributedQuestions.push(
        ...pickQuestions(hardQuestions, totalMarksForHard),
    );

    return {
        totalMarks,
        difficultyDistribution,
        questions: distributedQuestions,
    };
};

const generateQuestionPaper = async (
    totalMarks,
    subjectName,
    difficultyDistribution,
) => {
    try {
        const questions = await Question.find({ subject: subjectName });

        if (questions.length === 0) {
            throw new Error(
                `No questions found for the subject: ${subjectName}`,
            );
        }

        const questionPaper = distributeQuestions(
            totalMarks,
            difficultyDistribution,
            questions,
        );

        return questionPaper;
    } catch (error) {
        throw new Error(error.message || "Internal Server Error");
    }
};

export default {
    generateQuestionPaper,
};
