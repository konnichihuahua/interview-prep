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

const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = new mongoose.model("users", LoginSchema);

export default collection;
