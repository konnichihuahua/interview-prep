import express from "express";

import multer from "multer";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const router = express.Router();

const openai = new OpenAI();

// Endpoint to receive interview data and process it
router.post("/", async (req, res) => {
  const interviewData = req.body.interviewData;
  console.log("processing..");

  // Process interview data using OpenAI Chat API
  try {
    const suggestions = await processInterviewData(interviewData);
    res.json(suggestions);
  } catch (error) {
    console.error("Error processing interview data:", error.message);
    res.status(500).json({ error: "Failed to process interview data" });
  }
});

// Function to process interview data using OpenAI Chat API
async function processInterviewData(interviewData) {
  const suggestions = [];

  for (const item of interviewData) {
    const question = item.question;
    const answer = item.transcription;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `
            You are tasked with assisting in improving interview answers. Given an interview question and an initial interview answer, provide suggestions and improvements to enhance the clarity, relevance, and effectiveness of the response. Your goal is to help the interviewee communicate their qualifications, experiences, and ideas more effectively, ensuring they address the question comprehensively while highlighting their strengths and suitability for the role. Include a rating of the answer on the scale of 1-100
            Here's the interview question: "${question}", and here's the interview answer: "${answer}
            Use this exact format:
            {
              "interviewQuestion": "The interview question",
              "interviewAnswer": " The interview answer",
              "improvementSuggestions": {
                "Rating": "Rating from 0-100",
                "Clarity": "Suggestion on how to improve clarity",
                "Relevance": "Suggestion on how to improve relevance",
                "Effectiveness": [
                  "tip #1 for an effective answer to the question",
                  "tip #2 for an effective answer to the question",
                  "tip #3 for an effective answer to the question"
                ]
              }
            }



            `,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const suggestedImprovements = completion.choices[0].message.content;

    suggestions.push({ suggestedImprovements });
  }

  return suggestions;
}

export default router;
