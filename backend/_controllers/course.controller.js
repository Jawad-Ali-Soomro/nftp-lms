const { Course } = require("../_models");

const createCourse = async (req, res) => {
  const newCourse = await Course.create(req.body);
  if (!newCourse) {
    return res.status(300).json({
      msg: "Error While Creating Course!",
    });
  } else {
    return res.json({
      newCourse,
    });
  }
};

module.exports = { createCourse };
