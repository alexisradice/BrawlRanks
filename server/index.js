const express = require("express");
var path = require("path");
const port = 3001;
const app = express();
const axios = require("axios").default;
let users = [];

const listUsers = async () => {
  try {
    const res = await axios.get("https://brawlranks-api.herokuapp.com/api");
    return (users = res.data);
  } catch (err) {
    console.error(err);
  }
};

listUsers();

app.get("/api/users", (req, res) => {
  console.log("api/users called!");
  res.json(users);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(3001, () =>
  console.log(`Express server is running on port ${port}`)
);
