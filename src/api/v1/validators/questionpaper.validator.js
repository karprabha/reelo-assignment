import { body } from "express-validator";

const validateDistribution = (distribution, name, totalMarks) => {
    const totalPercentage = distribution
        ? Object.values(distribution).reduce(
              (sum, percentage) => sum + percentage,
              0,
          )
        : 0;
    if (totalPercentage !== 100) {
        throw new Error(`${name} percentages must sum to 100`);
    }

    if (distribution) {
        Object.entries(distribution).forEach(([item, percentage]) => {
            if (percentage < 0 || percentage > 100) {
                throw new Error(`${item} percentage must be between 0 and 100`);
            }

            const calculatedMarks = (percentage / 100) * totalMarks;
            if (!Number.isInteger(calculatedMarks)) {
                throw new Error(
                    `Invalid partition for ${name} - ${item}. Please provide percentages which can result in whole number marks for given total marks.`,
                );
            }
        });
    }
};

const generateQuestionPaperValidator = [
    body("totalMarks")
        .notEmpty()
        .withMessage("Total marks is required")
        .isInt({ min: 1 })
        .withMessage("Total marks must be a positive integer"),

    body("subjectName")
        .notEmpty()
        .withMessage("Subject name is required")
        .isLength({ min: 2, max: 50 })
        .withMessage("Subject name must be between 2 and 50 characters"),

    body("difficultyDistribution")
        .optional()
        .isObject()
        .withMessage("Difficulty distribution must be an object")
        .custom((value, { req }) => {
            validateDistribution(value, "Difficulty", req.body.totalMarks);
            return true;
        }),
];

export default {
    generateQuestionPaperValidator,
};
