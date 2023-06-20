const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.SENDING_EMAIL_HOST,
  port: process.env.SENDING_EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.SENDING_EMAIL_USER,
    pass: process.env.SENDING_EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  },
  
},{from: process.env.SENDING_EMAIL_USER,
  to: [process.env.DESTINATION_EMAIL]});

export default transporter;
