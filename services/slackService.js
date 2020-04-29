const axios = require('axios');
const { SlackClient } = require('../models');

const findOne = async () => SlackClient.findOne({ where: { status: true } });

const send = async (data) => {
  const client = await SlackClient.findOne({ where: { status: true } });

  if (client) {
    const message = {
      type: 'plain_text',
      text: data,
      emoji: true,
    };

    await axios.post(client.slackUri, message);
  }
};

const create = async (data) => {
  const all = await SlackClient.findAll({});
  all.forEach(async (adress) => adress.update({ status: false }));
  await SlackClient.create(data);
};

const findAll = async () => {
  return SlackClient.findAll({});
};

const update = async (id, status) => {
  const all = await SlackClient.findAll({});

  all.forEach(async (adress) => adress.update({ status: false }));

  const mail = await SlackClient.findOne({ where: { id } });

  return mail.update({ status });
};

const destroy = async (id) => SlackClient.destroy({ where: { id } });

module.exports = {
  send,
  create,
  findAll,
  destroy,
  update,
  findOne,
};
