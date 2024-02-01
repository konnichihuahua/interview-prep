import express from "express";
import OpenAI from "openai";

const openai = new OpenAI();
const router = express.Router();

const generateInterviewQuestions = async (jobDescription) => {
  console.log("generating questions");
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
        "I am a job seeker currently looking for employment. Please generate 10 interview questions based on the following job description, so I can practice for an upcoming interview: ${jobDescription}
        Ensure that each question is sent in JSON format.

        Expected JSON Response Template:

        {
          "questions": [
            {
              "question": "First interview question...",
              "category": "Behavioral/Personal",
              "difficulty": "Intermediate"
            },
            {
              "question": "Second interview question...",
              "category": "Technical",
              "difficulty": "Advanced"
            },
            // Add more questions as needed
          ]
}`,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const result = completion.choices[0].message.content;
  return result;
};

router.post("/get/questions", async (req, res) => {
  try {
    // Ensure that the request body contains the jobDescription
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ error: "Job description is required" });
    }

    // Generate interview questions based on the job description
    const questions = await generateInterviewQuestions(jobDescription);

    // Send the generated questions as a response
    res.json({ questions });
  } catch (error) {
    console.error("Error generating interview questions:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
