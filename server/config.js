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

// Create a schema for emails
const emailSchema = new mongoose.Schema({
  email: String,
});

// Create a model based on the schema
const Email = mongoose.model("Email", emailSchema);

export default Email;
