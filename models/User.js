import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 15,
  },
  lastName: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 15,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
});

const User = models.User || model("User", userSchema);

export default User;
