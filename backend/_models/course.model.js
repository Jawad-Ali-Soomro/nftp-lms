const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Course Name!"],
    },
    description: {
      type: String,
      required: [true, "Please Enter Description Of Course!"],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    courseImage: {
      type: String,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
