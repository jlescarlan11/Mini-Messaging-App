const messagesStorage = require("../storages/messagesStorage");
const { body, validationResult } = require("express-validator");

const messageUserErr = "must be between 1 and 15 characters.";
const messageTextErr = "must be at least 10 characters.";

const validateMessage = [
  body("messageUser")
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage(`Alias ${messageUserErr}`),
  body("messageText")
    .trim()
    .isLength({ min: 10 })
    .withMessage(`Message ${messageTextErr}`),
];

exports.messagesListGet = (req, res) => {
  res.render("index", {
    title: "Freedom Wall",
    messages: messagesStorage.getMessages(),
  });
};

exports.messagesCreateGet = (req, res) => {
  res.render("form");
};

exports.messagesCreatePost = [
  validateMessage,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        errors: errors.array(),
        messageText: req.body.messageText,
        messageUser: req.body.messageUser,
      });
    }

    const { messageText, messageUser } = req.body;
    messagesStorage.addMessage({ messageText, messageUser, added: new Date() });
    res.redirect("/");
  },
];

exports.messagesViewGet = (req, res) => {
  const message = messagesStorage.getMessage(req.params.id);
  res.render("messageInfo", {
    message: message,
  });
};

exports.messagesSearchGet = (req, res) => {
  const { messageText, messageUser, added } = req.query;
  const messages = messagesStorage.getMessages();

  const filteredMessages = messages.filter((message) => {
    let match = true;

    // Text search
    if (messageText) {
      match =
        match &&
        message.messageText.toLowerCase().includes(messageText.toLowerCase());
    }

    // User search
    if (messageUser) {
      match =
        match &&
        message.messageUser.toLowerCase().includes(messageUser.toLowerCase());
    }

    // Date search
    if (added) {
      let formattedDate;
      try {
        // Parse message date and format to YYYY-MM-DD
        const messageDate = new Date(message.added);
        formattedDate = isNaN(messageDate)
          ? message.added.toLowerCase() // Fallback to original string if invalid
          : messageDate.toISOString().split("T")[0];
      } catch {
        formattedDate = message.added.toLowerCase();
      }

      const searchTerm = added.toLowerCase();
      match = match && formattedDate.includes(searchTerm);
    }

    return match;
  });

  res.render("search", { messages: filteredMessages, query: req.query });
};
