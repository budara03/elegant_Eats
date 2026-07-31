import { createTransport } from "nodemailer";

const sendOTP = async (email, otp) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP for Email Verification",
    text: `Your OTP is: ${otp}`,
  };

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "OTP for Email Verification",
    text: `Your OTP is: ${otp}`,
  });
}

export default sendOTP;
