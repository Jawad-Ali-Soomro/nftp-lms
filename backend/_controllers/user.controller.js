import { hashPassword } from "../_middlewares";
import { User } from "../_models";

export const createUser = async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
      return res.status(400).json({
        msg: "This Account Exists Already!",
      });
    } else {
      const hashedPassword = await hashPassword({
        password: req.body.password,
      });
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });
      if (!newUser) {
        return res.status(401).json({
          msg: "Error While Creating User!",
        });
      } else {
        return res.status(200).json({
          msg: "Done Created User!",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Error During Process Try Again!",
    });
  }
};
