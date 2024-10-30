const express = require("express");
const { createUser, loginUser } = require("../_controllers");
const userRoute = express.Router();
userRoute.post("/new", createUser);
userRoute.post("/login", loginUser);
module.exports = userRoute;
