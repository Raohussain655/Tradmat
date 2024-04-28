import User from "../../../models/User";
import connectDb from "../../../middlewhare/mongoos";
import nextConnect from "next-connect";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry, something happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(async (req, res) => {
  

  try {
    const { email, otp } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (
      !user.otp ||
      !user.otp.value ||
      !user.otp.expiresAt ||
      user.otp.expiresAt < new Date()
    ) {
      return res.status(400).json({ error: "Invalid OTP or OTP expired" });
    }
    const privateKey = process.env.PRIVATE_KEY;
    const decryptedOTP = CryptoJS.AES.decrypt(
      user.otp.value,
      privateKey
    ).toString(CryptoJS.enc.Utf8);
    if (otp === decryptedOTP) {
      user.otp.value = undefined;
      user.otp.expiresAt = undefined;
      await user.save();
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: `Sorry, something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);
