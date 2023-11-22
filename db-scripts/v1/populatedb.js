#!/usr/bin/env node

import mongoose from "mongoose";

import Question from "../../src/api/v1/models/questionpaper.js";

const questions = [];

const userArgs = process.argv.slice(2);
const mongoDB = userArgs[0];

mongoose.set("strictQuery", false);

async function questionCreate(text, difficulty, marks) {
    const question = new Question({
        text,
        difficulty,
        marks,
    });

    await question.save();
    questions.push(question);
    console.log(`Added question: ${text}`);
}

async function createData() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoDB);

        await questionCreate("What is the capital of France?", "easy", 2);
        await questionCreate("Who wrote 'Romeo and Juliet'?", "medium", 3);
        await questionCreate("What is the square root of 144?", "medium", 4);
        await questionCreate("Solve: 5 + 7 * 2", "hard", 5);
    } catch (error) {
        console.error("Error populating the database:", error);
    } finally {
        console.log("Closing MongoDB connection...");
        mongoose.connection.close();
    }
}

createData();
