const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    id: 0,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 1,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Freedom Wall", messages: messages });
});

indexRouter.get("/new", (req, res) => {
  res.render("form");
});

indexRouter.post("/new", (req, res) => {
  const { messageText, messageUser } = req.body;

  const newMessage = {
    id: messages.length, // or use uuid as discussed earlier
    text: messageText,
    user: messageUser,
    added: new Date(),
  };
  messages.push(newMessage);
  res.redirect("/");
});

indexRouter.get("/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages[messageId];
  if (!message) {
    return res.status(404).send("Message not found");
  }
  res.render("messageInfo", { message: message });
});

module.exports = indexRouter;
