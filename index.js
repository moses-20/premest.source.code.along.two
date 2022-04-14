const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const userRoute = require("./routes/user");
const booksRoute = require("./routes/books");

const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(userRoute);
app.use(booksRoute);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/pages/index.html"));
});

app.get("/*", (req, res) => {
  res.status(400).sendFile(path.join(__dirname + "/pages/404.html"));
});

app.listen(4000, () => {
  console.log("SERVER IS UP!");
});
