require("dotenv").config();
const express = require("express");
// const { connection } = require("mongoose");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("client/build"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mern-stack", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
    console.log("Mongoose connection error: ", err);
  });

app.get("/api/config", (req, res) => {
  res.json({
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} on http://localhost:${PORT}`);
});
