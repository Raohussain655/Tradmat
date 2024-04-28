import User from "../../../models/User";
import connectDb from "../../../middlewhare/mongoos";
import nextConnect from "next-connect";
import CryptoJS from "crypto-js";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry, something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(async (req, res) => {
  const { email,password } = req.body;
  

  try {
    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const privateKey = process.env.PRIVATE_KEY;
    user.password = CryptoJS.AES.encrypt(password.toString(), privateKey).toString();

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: `Sorry, something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);
