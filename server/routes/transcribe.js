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
});

export default router;
