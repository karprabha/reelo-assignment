#!/usr/bin/env node

import mongoose from "mongoose";
import Question from "../../src/api/v1/models/question.js";

const subjects = ["Maths", "Physics", "Geography"];
const topics = {
    "Maths": ["Algebra", "Geometry", "Calculus"],
    "Physics": ["Mechanics", "Thermodynamics", "Electromagnetism"],
    "Geography": ["IndianGeography", "WorldGeography", "PhysicalGeography"]
};
const difficulties = ["easy", "medium", "hard"];

const userArgs = process.argv.slice(2);
const mongoDB = userArgs[0];

mongoose.set("strictQuery", false);

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const questionCreate = (text, difficulty, marks, subject, topic) =>
    new Question({
        text,
        difficulty,
        marks,
        subject,
        topic,
    });

const createData = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoDB);

        const questionArray = [];

        subjects.forEach((subject) => {
            const subjectTopics = topics[subject];

            if (!subjectTopics) {
                console.error(`No topics found for ${subject}`);
                return;
            }

            subjectTopics.forEach((topic) => {
                difficulties.forEach((difficulty) => {
                    const totalMarks = 100;
                    let remainingMarks = totalMarks;

                    while (remainingMarks > 0) {
                        const marks = getRandomInt(2, Math.min(5, remainingMarks));
                        const text = `Dummy question in ${subject} - ${topic} - ${difficulty}`;

                        questionArray.push(questionCreate(text, difficulty, marks, subject, topic));

                        remainingMarks -= marks;
                    }
                });
            });
        });

        await Question.insertMany(questionArray);

        console.log("Questions added to the database.");
    } catch (error) {
        console.error("Error populating the database:", error);
    } finally {
        console.log("Closing MongoDB connection...");
        mongoose.connection.close();
    }
};

createData();
