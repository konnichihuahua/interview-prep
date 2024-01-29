import mongoose from "mongoose";

const connect = mongoose.connect(
  "mongodb+srv://jsargento477:jak2vB4SZHA39yZ@jobseekercluster0.vxwifux.mongodb.net/"
);

connect
  .then(() => {
    console.log("database connection successful");
  })
  .catch(() => {
    console.log("database connection failed");
  });

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  // Add other relevant fields as needed
});

const User = mongoose.model("User", UserSchema); // Define the User model

export default User;
