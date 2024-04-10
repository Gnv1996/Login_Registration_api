const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const app = express();
app.use(bodyParser.json());

const users = [];
const secretKey = crypto.randomBytes(32).toString("hex");

app.post("/signup", (req, res) => {
  const { fullName, userName, email, password } = req.body;


  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(401).json({ error: "User already exists" });
  }

  const newUser = {
    id: users.length + 1,
    fullName,
    userName,
    email,
    password,
  };

  users.push(newUser);

  const token = jwt.sign({ userId: newUser.id }, secretKey, {
    expiresIn: "1h",
  });

  return res
    .status(201)
    .json({ message: "User registered successfully", user: newUser, token });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

  return res.status(200).json({ message: "Login successful", user, token });
});

const PORT = 4500;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});