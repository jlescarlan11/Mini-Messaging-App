const db = require("../db/queries"); // Update path to your DB module
const { body, validationResult } = require("express-validator");

const messageUserErr = "must be between 1 and 15 characters.";
const messageTextErr = "cannot be empty.";

const validateMessage = [
  body("messageUser")
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage(`Alias ${messageUserErr}`),
  body("messageText")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`Message ${messageTextErr}`),
];

// Helper function to transform database fields to expected names
const transformMessage = (dbMessage) => ({
  id: dbMessage.id,
  messageText: dbMessage.message,
  messageUser: dbMessage.alias,
  added: dbMessage.added,
});

exports.messagesListGet = async (req, res, next) => {
  try {
    const messages = await db.getMessages();
    const transformedMessages = messages.map(transformMessage);
    res.render("index", {
      title: "Freedom Wall",
      messages: transformedMessages,
    });
  } catch (err) {
    next(err);
  }
};

exports.messagesCreateGet = (req, res) => {
  res.render("form");
};

exports.messagesCreatePost = [
  validateMessage,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        errors: errors.array(),
        messageText: req.body.messageText,
        messageUser: req.body.messageUser,
        formData: req.body,
      });
    }

    try {
      await db.addMessage({
        message: req.body.messageText,
        alias: req.body.messageUser,
        added: new Date(),
      });
      res.redirect("/");
    } catch (err) {
      res.status(500).render("form", {
        error: "Failed to save message. Please try again.",
        messageText: req.body.messageText,
        messageUser: req.body.messageUser,
      });
    }
  },
];

exports.messagesViewGet = async (req, res, next) => {
  try {
    const message = await db.getMessage(req.params.id);
    if (!message) {
      return res.status(404).render("error", { message: "Message not found" });
    }
    res.render("messageInfo", {
      message: transformMessage(message),
    });
  } catch (err) {
    next(err);
  }
};

exports.messagesSearchGet = async (req, res, next) => {
  try {
    const { messageText, messageUser, added } = req.query;
    const dbMessages = await db.getMessages();
    const messages = dbMessages.map(transformMessage);

    const filteredMessages = messages.filter((message) => {
      let match = true;

      if (messageText) {
        match =
          match &&
          message.messageText
            .toLowerCase()
            .includes(messageText.trim().toLowerCase());
      }

      if (messageUser) {
        match =
          match &&
          message.messageUser
            .toLowerCase()
            .includes(messageUser.trim().toLowerCase());
      }

      if (added) {
        const messageDate = new Date(message.added);
        const formattedDate = isNaN(messageDate)
          ? message.added.toLowerCase()
          : messageDate.toISOString().split("T")[0];

        match = match && formattedDate.includes(added.toLowerCase());
      }

      return match;
    });

    res.render("search", { messages: filteredMessages, query: req.query });
  } catch (err) {
    next(err);
  }
};
