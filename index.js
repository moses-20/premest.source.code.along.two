const express = require("express");

const app = express();
const userRoute = require("./routes/user");

app.use(express.json());

app.use(userRoute);

app.get("/", (req, res) => {
  res.status(200).send("<h1>WELCOME TO THE USERS' DATABASE</h1>");
});

app.get("/*", (req, res) => {
  res.status(200).send("<h1>PAGE NOT FOUND!</h1>");
});

app.listen(4000, () => {
  console.log("SERVER IS UP!");
});
