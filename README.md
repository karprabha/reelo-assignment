# Question Paper Generator

This is a simple Question Paper Generator application built with Node.js and Docker.

## Table of Contents

-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Getting Started](#getting-started)
-   [Usage](#usage)

## Features

-   Generate question papers based on difficulty levels and total marks.
-   Modular and extensible code structure.
-   Handles subject-wise distribution.
-   Supports various difficulty levels - easy, medium, hard.
-   Error handling for edge cases.

## Prerequisites

-   Node.js installed on your machine.
-   Docker Desktop installed.

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/karprabha/reelo-assignment
    ```
2. Install dependencies:
    ```bash
    cd reelo-assignment
    npm install
    ```
3. Create `.env` in root dir and configure the following environment variables

    ```bash
    MONGODB_URI=mongodb://localhost:27017/reelo-assignment

    NODE_ENV=development
    MORGAN_LOG_FORMAT=dev
    ```

## Usage

1. Run Docker Desktop

2. Start the application:

    - In windows powershell:

        ```bash
        npm run dev
        ```

    - In bash terminal: Inside package.json replace dev scripts timeout to sleep

        ```bash
        "db:dev:restart": "npm run db:dev:rm && npm run db:dev:up &&  sleep 1 && npm run db:dev:populate"
        ```

        ```bash
        "dev": "npm run db:dev:restart &&  sleep 1 && SET DEBUG=reelo-assignment:* && nodemon -e js ./bin/www",
        ```

        Run program

        ```bash
        npm run dev
        ```

3. Make a POST request to http://localhost:3000/api/v1/question-papers with the required parameters (total marks, subject, difficulty distribution).

    - Using Postman with body having raw data in json:
        ```bash
        {
            "totalMarks": 100,
            "subjectName": "Maths",
            "difficultyDistribution": {
                "easy": 30,
                "medium": 40,
                "hard": 30
            }
        }
        ```
    - Using bash terminal to make curl request:
        ```bash
        curl -X POST -H "Content-Type: application/json" -d '{
            "totalMarks": 100,
            "subjectName": "Maths",
            "difficultyDistribution": {
                "easy": 30,
                "medium": 40,
                "hard": 30
            }
        }' http://localhost:3000/api/v1/question-papers
        ```

4. Receive the generated question paper as a response.

    ```json
    {
        "questionPaper": {
            "totalMarks": 100,
            "difficultyDistribution": {
                "easy": 30,
                "medium": 40,
                "hard": 30
            },
            "questions": [
                {
                    "text": "Dummy question in Maths - Calculus - easy",
                    "subject": "Maths",
                    "topic": "Calculus",
                    "difficulty": "easy",
                    "marks": 5
                },
                ...
            ]
        }
    }
    ```

**NOTE:** dev-db only contains these subjects:

1. "Maths"
2. "Physics"
3. "Geography"
