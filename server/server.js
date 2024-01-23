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
import collection from "./config.js";

const app = express();

app.set("view engine", ejs);
app.use(
  cookieSession({
    name: "session",
    keys: ["jobseeker."],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    method: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});
