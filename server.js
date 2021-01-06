const express = require("express");
const path = require("path");
const uuid = require("uuid");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 3333;

const reservedTables = [];
const waitListTable = [];

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/form", function (req, res) {
  res.sendFile(path.join(__dirname, "form.html"));

});
app.get("/reservations", function (req, res) {
  res.sendFile(path.join(__dirname, "form.html"));
});

app.post("/api/tables", function (req, res) {
  let reservedTable = req.body;
  reservedTable.id = uuid.v4();
  if (reservedTables.length === 5) {
    waitListTable.push(reservedTable);
  } else {
    reservedTables.push(reservedTable);
  }
  res.send(reservedTable);
});
app.get("/api/reserved", function (req, res) {
  res.json(reservedTables);
});
app.get("/api/waitList", function (req, res) {
  res.json(waitListTable);
});

app.listen(PORT, () => {
  console.log("Your server started at the port: " + PORT);
});
