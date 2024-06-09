import mongoose, { model } from "mongoose";

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a unique username"],
    unique: [true, "Username exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  },
  profile: {
    type: String,
  },
});
// if we already have User model inside mongoDB database then use that model and return that user model and we have to specify with  plural  otherwise we get erorr message
export default mongoose.model.Users || mongoose.model("User", UserSchema);
// existing model ||  new model