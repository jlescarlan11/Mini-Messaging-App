const { Router } = require("express");

const indexRouter = Router();

const messages = [];

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
    added: new Date().toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
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
