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
async function generateAudioFile(question, index) {
  const fileName = `question_${index}.mp3`; // Use index in file name
  const filePath = path.join(speechDirectory, fileName);

  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
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
  for (let i = 0; i < questions.length; i++) {
    await generateAudioFile(questions[i], i); // Pass index i
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

router.get("/audio/:index", (req, res) => {
  const index = req.params.index;

  // Assuming you have generated and saved the files in the 'audio-files' directory
  const filePath = path.join(__dirname, "audio-files", `question_${index}.mp3`);

  // Set appropriate headers
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Content-Disposition", "inline");

  // Send the audio file
  res.sendFile(filePath);
});

export default router;
