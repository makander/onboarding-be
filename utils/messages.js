// Email messages
const messageSettings = {
  from: 'Border - the onboarding manager',
  to: process.env.EMAIL_RECEIVER,
  subject: 'Border update',
  html: '',
};

const createListEmail = (data) => {
  const message = {
    ...messageSettings,
    html: `<p>New list ${data} was created</p>`,
  };

  return message;
};

const createTaskEmail = (taskName, listName) => {
  const message = {
    ...messageSettings,
    html: `<p>Task ${taskName} has been added to list ${listName}</p>`,
  };

  return message;
};

const updateTaskUserEmail = (firstName, lastName, name, listName) => {
  const message = {
    ...messageSettings,
    html: ` ${firstName} ${lastName} has been assigned to task ${name} in list ${listName} `,
  };

  return message;
};

const updateTaskStatusEmail = (taskName, listName) => {
  const message = {
    ...messageSettings,
    html: `Task ${taskName} in list ${listName} is completed`,
  };

  return message;
};

const updateListStatusEmail = (listName) => {
  const message = {
    ...messageSettings,
    html: `${listName} is completed`,
  };

  return message;
};

// Slack messages

const updateTaskStatusMessage = (taskName, listName) =>
  `Task ${taskName} in :clipboard: ${listName} is :heavy_check_mark:`;

const updateTaskUserMessage = (firstName, lastName, name, listName) =>
  `:raising_hand: ${firstName} ${lastName} has been assigned to ${name} in :clipboard: ${listName} `;

const createListMessage = (data) =>
  `A new :clipboard: ${data} list has been created`;

const createTaskMessasge = (taskName, listName) =>
  `Task ${taskName} has been added to :clipboard: ${listName}`;

const updateListStatusMessage = (listName) =>
  `:clipboard:  ${listName} is completed`;

module.exports = {
  createListMessage,
  createListEmail,
  updateTaskStatusEmail,
  updateTaskStatusMessage,
  updateTaskUserEmail,
  updateTaskUserMessage,
  createTaskEmail,
  createTaskMessasge,
  updateListStatusEmail,
  updateListStatusMessage,
};
