const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const users = [];

app.use(bodyParser.json());
app.post("/signup", (req, res) => {
  const { fullName, userName, email, password } = req.body;

  if (!fullName || !userName || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please filled all detail correctly" });
  }
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User Already Exist" });
  }
  const newUser = {
    id: users.length + 1,
    fullName,
    userName,
    email,
    password,
  };

  users.push(newUser);
  res
    .status(201)
    .json({ message: "You Register successfully", users: newUser });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please filled valid email Address" });
  }
  if (!password) {
    return res.status(400).json({ error: "Please filled valid Password" });
  }

  const existUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (!existUser) {
    return res.status(404).json({ error: "Email and password is not exist" });
  }
  return res.status(201).json({ message: "You successfully Login", users });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is now Working ${PORT}`);
});
