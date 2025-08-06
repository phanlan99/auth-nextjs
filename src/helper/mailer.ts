import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcrypt.hash(userId.toString(), 10)

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000 },
        { new: true, runValidators: true }
      )
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        { forgotPasswordToken: hashToken, forgotPasswordTokenExpiry: Date.now() + 3600000 },
        { new: true, runValidators: true }
      )
    }

    // ✅ Gmail SMTP configuration
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // ví dụ: yourgmail@gmail.com
        pass: process.env.EMAIL_PASS, // App Password từ Gmail
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>
          Click 
          <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashToken}">
            here
          </a> 
          to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
          <br />
          Or copy and paste the link below in your browser:
          <br />
          ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashToken}
        </p>
      `
    }

    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse

  } catch (error: any) {
    throw new Error(error.message)
  }
}
