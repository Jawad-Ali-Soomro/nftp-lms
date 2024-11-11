const express = require("express")
const { createCourse } = require("../_controllers")
const courseRoute = express.Router()

courseRoute.post('/new', createCourse)

module.exports = courseRoute