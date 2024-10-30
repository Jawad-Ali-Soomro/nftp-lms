const jwt = require("jsonwebtoken");
const generateToken = async (data) => {
  const isGenerated = await jwt.sign(data, process.env.JWT_SECRET);
  isGenerated ? isGenerated : console.log("Error");
};

module.exports = generateToken;
