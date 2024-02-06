import { generateInterviewQuestions } from "./questionGenerator.js";
import express from "express";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const openai = new OpenAI();
const router = express.Router();
const speechFile = path.resolve("./speech.mp3");
const speechDirectory = "./audio"; // Directory to save MP3 files
if (!fs.existsSync(speechDirectory)) {
  fs.mkdirSync(speechDirectory);
}
async function generateAudioFile(question) {
  const fileName = `${Date.now()}.mp3`;
  const filePath = path.join(speechDirectory, fileName);

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: `${question}`,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(filePath, buffer);
    console.log(`Audio file saved: ${filePath}`);
  } catch (error) {
    console.error("Error generating audio file:", error.message);
  }
}

async function generateAndSaveAudioFiles(questions) {
  for (const question of questions) {
    await generateAudioFile(question);
  }
}

router.post("/get/questions", async (req, res) => {
  try {
    // Ensure that the request body contains the jobDescription
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required" });
    }

    // Generate interview questions based on the job description
    const questions = await generateInterviewQuestions(jobDescription);
    console.log(typeof JSON.parse(questions));
    const questionsArray = JSON.parse(questions).questions;
    const questionTexts = questionsArray.map(
      (questionObj) => questionObj.question
    );

    console.log(questionTexts);
    await generateAndSaveAudioFiles(questionTexts);
    res.json({ questions });
  } catch (error) {
    console.error("Error generating interview questions:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
