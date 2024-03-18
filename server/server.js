import {} from "dotenv/config";
import express from "express";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import "./passport.js";
import path from "path";
import bcrypt from "bcrypt";
import ejs from "ejs";
import authRoute from "./routes/auth.js";
import questionsRoute from "./routes/questions.js";
import transcribeRoute from "./routes/transcribe.js";
import User from "./config.js";
import bodyParser from "body-parser";
import processInterviewRoute from "./routes/processInterview.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use("/audio", express.static(path.join(__dirname, "audio")));

app.set("view engine", ejs);
app.use(
  cookieSession({
    name: "session",
    keys: ["jobseeker."],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    method: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Routes
app.use("/auth", authRoute);
app.use("/server", questionsRoute);
app.use("/transcribe", transcribeRoute);
app.use("/process-interview", processInterviewRoute);
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
