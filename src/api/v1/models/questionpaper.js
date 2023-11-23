import { Schema, model } from "mongoose";

const questionSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 300
    },
    subject: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    topic: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true,
    },
    marks: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
});

const Question = model("Question", questionSchema);

export default Question;
