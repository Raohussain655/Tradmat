import User from "../../../models/User";
import connectDb from "../../../middlewhare/mongoos";
import nextConnect from "next-connect";
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import handlebars from "handlebars";
dotenv.config();

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);

    const otpExpiration = new Date();
    otpExpiration.setMinutes(otpExpiration.getMinutes() + 10);
    const privateKey = process.env.PRIVATE_KEY;
    const encryptedOTP = CryptoJS.AES.encrypt(
      otp.toString(),
      privateKey
    ).toString();

    user.otp = {
      value: encryptedOTP,
      expiresAt: otpExpiration,
    };
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "theaimstech@gmail.com",
        pass: "imsevbprvtrtfmps",
      },
    });
    const mailOptions = {
      from: "theaimstech@gmail.com",
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your one-time code (OTP) is: **"${otp}"** 
      Use this code to reset your password and regain access to your Account.
      Powered by ProgrammingDrip if you Want to learn more? Visit us at ProgrammingDrip Website: http://programmingdrip.com/.
    `,
    };
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: "Forgot password email sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Sorry, something happened! ${error.message}` });
  }
});

export default connectDb(apiRoute);

export const config = {
  api: {
    bodyParser: false, // Enable body parsing
  },
};
