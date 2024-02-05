import express from "express";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { generateInterviewQuestions } from "./questionGenerator.js";

const openai = new OpenAI();
const router = express.Router();
const speechFile = path.resolve("./speech.mp3");
async function main() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input:
      "Tell us about your experience with React.js and how you have used it in previous projects.",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}

// const questionTexts = questionsArray.map(questionObj => questionObj.question);

main();
router.post("/generate", async (req, res) => {
  try {
    // Ensure that the request body contains the jobDescription
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required" });
    }

    // Generate interview questions based on the job description
    const data = await generateInterviewQuestions(jobDescription);

    const questionsArray = JSON.parse(data);

    // Send the generated questions as a response
    res.json({ questionsArray });
  } catch (error) {
    console.error("Error generating interview questions:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
