import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
export const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: `"FESTOVEE" <${process.env.EMAIL}>`,
    to,
    subject: "FESTOVEE Password Reset OTP",
    html: `
      <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:30px; text-align:center;">
        <div style="background:#ffffff; max-width:500px; margin:auto; border-radius:10px; padding:30px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
          <img src="https://ibb.co/3Y1MJjGY" alt="Festovee Logo" style="width:80px; height:auto; margin-bottom:20px;" />
          <h2 style="color:#ff4d2d; margin-bottom:10px;">Password Reset Request</h2>
          <p style="color:#333; font-size:15px; margin-bottom:20px;">
            Hi there,<br /><br />
            We received a request to reset your FESTOVEE account password. 
            Please use the OTP below to reset it. This OTP is valid for <b>5 minutes</b>.
          </p>
          <div style="background:#ff4d2d; color:#fff; font-size:22px; letter-spacing:3px; font-weight:bold; padding:12px 20px; border-radius:8px; display:inline-block; margin-bottom:20px;">
            ${otp}
          </div>
          <p style="color:#555; font-size:14px;">
            If you did not request this, you can safely ignore this email. 
            Your password will remain unchanged.
          </p>
          <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />
          <p style="color:#999; font-size:12px;">
            © ${new Date().getFullYear()} FESTOVEE. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
};
