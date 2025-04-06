const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const messagesRouter = Router();

messagesRouter.get("/", messagesController.messagesListGet);
messagesRouter.get("/create", messagesController.messagesCreateGet);
messagesRouter.post("/create", messagesController.messagesCreatePost);
messagesRouter.get("/search", messagesController.messagesSearchGet);
messagesRouter.get("/:id", messagesController.messagesViewGet);

module.exports = messagesRouter;

// const messages = [];

// messagesRouter.get("/", (req, res) => {
//   res.render("index", { title: "Freedom Wall", messages: messages });
// });

// messagesRouter.get("/new", (req, res) => {
//   res.render("form");
// });

// messagesRouter.post("/new", (req, res) => {
//   const { messageText, messageUser } = req.body;

//   const newMessage = {
//     id: messages.length, // or use uuid as discussed earlier
//     text: messageText,
//     user: messageUser,
//     added:
//       new Date().toLocaleString("en-US", {
//         month: "2-digit",
//         day: "2-digit",
//         year: "numeric",
//         hour: "numeric",
//         minute: "2-digit",
//         hour12: true,
//         timeZone: "UTC", // Ensures the time is based on UTC
//       }) + " (UTC)", // Append the text "(UTC)" to the date string
//   };

//   messages.push(newMessage);
//   res.redirect("/");
// });

// messagesRouter.get("/:id", (req, res) => {
//   const messageId = parseInt(req.params.id);
//   const message = messages[messageId];
//   if (!message) {
//     return res.status(404).send("Message not found");
//   }
//   res.render("messageInfo", { message: message });
// });

// module.exports = messagesRouter;
