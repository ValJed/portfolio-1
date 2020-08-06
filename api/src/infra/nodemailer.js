const nodemailer = require('nodemailer')

module.exports = ({ user, pass }) => {
  const config = {
      service: 'gmail',
      // host: 'smtp.ethereal.email',
      // port: 587,
      // secure: false,
      auth: {
        user,
        pass
      }
  }
  const transporter = nodemailer.createTransport(config);

  return async (subject, email, message) => {
    const mailOptions = {
      from: email,
      to: user,
      subject: subject,
      html: message
    };

    const res = await transporter.sendMail(mailOptions)

    return nodemailer.createTransport(config)
  }

}