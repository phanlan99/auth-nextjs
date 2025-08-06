import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcrypt.hash(userId.toString(), 10)
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000 }, { new: true, runValidators: true })

    }
    else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashToken, forgotPasswordTokenExpiry: Date.now() + 3600000 }, { new: true, runValidators: true })

    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a7d934f450859b",
        pass: "81b1d302583eb3"
      }
    });

    const mailOptions = {
      from: 'phanlandt123@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
    <p>
      Click 
      <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashToken}">here</a> 
      to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.<br />
      Or copy and paste the link below in your browser:<br />
      ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "resetpassword"}?token=${hashToken}
    </p>
  `
    }


    const mailresponse = await transport.sendMail(mailOptions)

    return mailresponse


  } catch (error: any) {
    throw new Error(error.message)
  }
}