const nodemailer = require('nodemailer')

module.exports = ({ user, pass }) => {
  console.log('use ===> ', user)

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

    console.log('res ===> ', require('util').inspect(res, { colors: true, depth: 2 }))

    return nodemailer.createTransport(config)
  }

}