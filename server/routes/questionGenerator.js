// questionGenerator.js
import OpenAI from "openai";

const openai = new OpenAI();

export const generateInterviewQuestions = async (jobDescription) => {
  console.log("generating questions");
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
        "I am a job seeker currently looking for employment. Please generate 1 interview questions based on the following job description, so I can practice for an upcoming interview: ${jobDescription}
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
