const axios = require('axios');

const sendMessage = async (data) => {
  const message = {
    type: 'plain_text',
    text: data,
    emoji: true,
  };

  await axios.post(process.env.SLACK_URI, message);
};

module.exports = {
  sendMessage,
};
