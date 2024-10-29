const express = require("express");
const { connectDatabase } = require("./_config/connect.db");
const app = express();
require("dotenv").config({
  path: "./_config/.env",
});
const cors = require("cors");
const { userRoute } = require("./_routes");
connectDatabase();
app.use(cors());
app.use(express.json());
app.use("/v1/user", userRoute);
app.listen(process.env.PORT, () => {
  console.log("working at port.");
});
