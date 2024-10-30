const {
  hashPassword,
  decryptPassword,
  generateToken,
} = require("../_middlewares");
const { User } = require("../_models");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const createUser = async (req, res) => {
  try {
    const findUser = await User.findOne({
      $or: [{ email: req.body.email }, { phone_number: req.body.email }],
    });
    if (findUser) {
      return res.status(400).json({ msg: "This Account Already Exists!" });
    }

    const hashedPassword = await hashPassword({ password: req.body.password });
    const secret = speakeasy.generateSecret({ name: "elevensoft" });

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      twoFactorSecret: secret.base32,
    });

    if (!newUser) {
      return res.status(500).json({ msg: "Error While Creating User!" });
    }

    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    return res.status(201).json({
      msg: "User Created Successfully! Scan the QR code with an authenticator app to enable 2FA.",
      qrCodeUrl,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error During Process. Please Try Again!" });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { phone_number: req.body.email }],
    });

    if (!user) {
      return res.status(400).json({ msg: "User Not Found!" });
    }

    const isPasswordValid = await decryptPassword({
      password: req.body.password,
      encryptedPassword: user.password,
    });

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Incorrect Password!" });
    }

    if (user.twoFactorSecret) {
      return res.status(206).json({ msg: "2FA Validation Required" });
    }

    const generatedToken = await generateToken(user);
    return res
      .status(200)
      .json({ msg: "Logged In Successfully!", token: generatedToken });
  } catch (error) {
    return res.status(500).json({ msg: "Login Error. Please Try Again!" });
  }
};

const verify2FA = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    const { token } = req.body;

    const isVerified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 1,
    });

    if (isVerified) {
      const generatedToken = await generateToken(user);
      return res.status(200).json({
        msg: "2FA Verified. Logged In Successfully!",
        token: generatedToken,
      });
    } else {
      return res.status(400).json({ msg: "Invalid 2FA Code!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "2FA Verification Error. Please Try Again!" });
  }
};

module.exports = {
  createUser,
  loginUser,
  verify2FA,
};
