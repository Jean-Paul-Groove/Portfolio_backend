const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.orange.fr",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SENDING_EMAIL_USER,
    pass: process.env.SENDING_EMAIL_PASSWORD,
  },
});

export default transporter;
