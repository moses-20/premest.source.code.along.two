const { Router } = require("express");
const router = Router();

const users = [
  { id: 1, name: "Gbemu Terra" },
  { id: 2, name: "Yamah Knoorls" }
];

router.get("/users", (req, res) => {
  res.status(200).json({ success: true, data: users });
});

router.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id == userId); // use only two equal signs because the userId is a string but the actual id in the array is a number

  if (!user) {
    return res.status(400).json({ success: false, message: "user not found" });
  }

  res.status(200).json({ success: true, data: user });
});

router.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);

  res.status(200).json(users);
});

module.exports = router;
