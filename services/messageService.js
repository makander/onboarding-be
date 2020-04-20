const axios = require('axios');
const nodemailer = require('nodemailer');

const sendMessage = async (data) => {
  const message = {
    type: 'plain_text',
    text: data,
    emoji: true,
  };

  await axios.post(process.env.SLACK_URI, message);
};

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PW, // generated ethereal password
    },
  });
  await transporter.sendMail(data);
};

module.exports = {
  sendMessage,
  sendEmail,
};
