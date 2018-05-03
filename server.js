const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

// Database
const db = require("./config/keys").mongoURI;
// Connect DB
mongoose
  .connect(db)
  .then(() => console.log("Connected to the Database"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Server");
});

// Routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});
