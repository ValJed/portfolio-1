const nodemailer = require('nodemailer')

module.exports = ({ user, pass }) => {
  const config = {
    host: 'SSL0.OVH.NET',
    port: 587,
    secure: false,
    auth: {
      user,
      pass
    }
  }
  const transporter = nodemailer.createTransport(config)

  return async (subject, email, message) => {
    const mailOptions = {
      from: email,
      to: user,
      subject: subject,
      text: message
    }

    try {
      const { accepted } = await transporter.sendMail(mailOptions)

      if (accepted.length) {
        return {
          success: true
        }
      }

      return {
        success: false
      }
    } catch (err) {
      console.error(err)
      return {
        success: false
      }
    }
  }
}
