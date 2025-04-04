const path = require("node:path");
const express = require("express");
const indexRouter = require("./routes/indexRouter");
const app = express();
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.get("/new", (req, res) => {
//   res.render("new");
// });

// Define the truncateText function
app.locals.truncateText = function (text, maxLength) {
  if (typeof text !== "string") return text;
  text = text.trim();
  if (text.length > maxLength) {
    text.substring(0, maxLength - 3).trim() + "...";
  }
  return text;
};

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
