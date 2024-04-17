import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import passportSetup from "passport";
import axios from "axios";
import User from "./config.js";
const fetchUserInfo = async (accessToken) => {
  const userInfoUrl = "https://www.googleapis.com/oauth2/v3/userinfo";

  try {
    const response = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = response.data;

    return userInfo;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

import {} from "dotenv/config";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb, done) {
      const userInfo = await fetchUserInfo(accessToken);

      try {
        // Use findOneAndUpdate without the callback
        const user = await User.findOneAndUpdate(
          { googleId: userInfo.sub },
          { displayName: userInfo.given_name },
          { upsert: true, new: true }
        );

        // Call done with the user
        done(null, user);
      } catch (error) {
        // Handle any errors and call done with the error
        console.error("Error updating or retrieving user:", error);
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
