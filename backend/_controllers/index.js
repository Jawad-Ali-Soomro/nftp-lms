const { createUser, loginUser } = require("./user.controller");
const { createCourse } = require("./course.controller");
module.exports = {
  createUser,
  loginUser,
  createCourse
};
