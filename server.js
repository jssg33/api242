const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// User model
const User = mongoose.model("User", {
  name: String,
  email: String
});

// Routes
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.listen(3000, () => console.log("API running on port 3000"));
