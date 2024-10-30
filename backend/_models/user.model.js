const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter Name!"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Password!"],
    },
    phone_number: {
      type: String,
      required: [true, "Please Enter Phone Number!"],
    },
    role: {
      type: String,
      enum: ["admin", "student", "teacher"],
      default: "student",
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: [],
      },
    ],
    twoFactorSecret: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
