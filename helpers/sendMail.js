import nodemailer from "nodemailer"

export const sendEmail = (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    pool: true,
  
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
  transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log('Your config is correct');
});
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  }

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log('send mail')

      console.log(err)
    } else {
      console.log('send mail')

      console.log(info)
    }
  })
}
