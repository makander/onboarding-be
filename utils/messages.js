// Email messages

const messageSettings = {
  from: 'Border - the onboarding manager',
  subject: 'Border update',
};

const createListEmail = async (data, email) => {
  const message = {
    ...messageSettings,
    html: `<p>New list ${data} was created</p>`,
    to: `${email}`,
  };

  return message;
};

const scheduleEmail = (listName, email, date) => {
  const message = {
    ...messageSettings,
    html: `<p>${listName} expires in ${date}</p>`,
    to: `${email}`,
  };

  return message;
};

const createTaskEmail = (taskName, listName, email) => {
  const message = {
    ...messageSettings,
    html: `<p>Task ${taskName} has been added to list ${listName}</p>`,
    to: `${email}`,
  };

  return message;
};

const updateTaskUserEmail = (firstName, lastName, name, listName, email) => {
  const message = {
    ...messageSettings,
    html: ` ${firstName} ${lastName} has been assigned to task ${name} in list ${listName} `,
    to: `${email}`,
  };

  return message;
};

const updateTaskStatusEmail = (taskName, listName, email) => {
  const message = {
    ...messageSettings,
    html: `Task ${taskName} in list ${listName} is completed`,
    to: `${email}`,
  };

  return message;
};

const updateListStatusEmail = (listName, email) => {
  const message = {
    ...messageSettings,
    html: `${listName} is completed`,
    to: `${email}`,
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
  scheduleEmail,
};
