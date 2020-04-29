const nodemailer = require('nodemailer');

const { MailReceiver } = require('../models');

const send = async (data) => {
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

const create = async (data) => {
  const all = await MailReceiver.findAll({});

  all.forEach(async (adress) => adress.update({ status: false }));
  MailReceiver.create({ email: data });
};

const findAll = async () => {
  return MailReceiver.findAll({});
};

const update = async (id, status) => {
  const all = await MailReceiver.findAll({});

  all.forEach(async (adress) => adress.update({ status: false }));

  const mail = await MailReceiver.findOne({ where: { id } });

  return mail.update({ status });
};

const findOne = async () => MailReceiver.findOne({ where: { status: true } });

const destroy = async (id) => MailReceiver.destroy({ where: { id } });

module.exports = {
  create,
  update,
  findAll,
  destroy,
  send,
  findOne,
};
