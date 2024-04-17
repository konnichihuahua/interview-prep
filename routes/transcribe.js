import express from "express";

import multer from "multer";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".webm"); // Append .webm extension to the filename
  },
});
const upload = multer({ storage: storage });
const openai = new OpenAI();

router.post("/stt", upload.single("file"), async (req, res) => {
  try {
    const audioFile = req.file;
    console.log(audioFile);

    const audioFileStream = fs.createReadStream(audioFile.path);

    const transcription = await openai.audio.transcriptions.create({
      file: audioFileStream,
      model: "whisper-1",
      response_format: "verbose_json",
      timestamp_granularities: ["word"],
    });

    console.log(transcription.text);

    // Sending transcription.text to the frontend
    res.json({ transcriptionText: transcription.text });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the transcription" });
  }
});

export default router;
