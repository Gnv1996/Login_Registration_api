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

// require("dotenv").config();
// const express = require("express");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");
// const connectDB = require("./db/config");

// connectDB();

// const app = express();
// app.use(bodyParser.json());

// const userSchema = new mongoose.Schema({
//   fullName: String,
//   userName: String,
//   email: { type: String, unique: true },
//   password: String,
// });

// const User = mongoose.model("User", userSchema);

// app.post("/signup", async (req, res) => {
//   const { fullName, userName, email, password } = req.body;

//   if (!fullName || !userName || !email || !password) {
//     return res.status(400).json({ error: "Please fill all the details." });
//   }

//   try {
//     const existingUser = await User.findOne({ email: email });
//     if (existingUser) {
//       return res.status(401).json({ error: "User already exists." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       fullName,
//       userName,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({
//       message: "You have successfully registered yourself.",
//       users: newUser,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Server error." });
//   }
// });

// app.post("/login", async (req, res) => {
//   // Mark the function as async
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res
//       .status(400)
//       .json({ error: "Please fill in email and password." });
//   }

//   try {
//     // Assuming User is a Mongoose model, findOne is used to find a single document according to the condition
//     const user = await User.findOne({ email: email }); // Adjust according to your schema
//     if (!user) {
//       return res.status(400).json({ error: "Invalid credentials." });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid credentials." });
//     }

//     // If the password matches, proceed to generate a token or start a session
//     // This part depends on your authentication strategy (e.g., JWT, session)
//     res.json({ message: "Login successful!" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred during the login process." });
//   }
// });

// const PORT = process.env.PORT || 4500;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
