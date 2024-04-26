const express = require("express");
const bodyParser = require("body-parser");
const itemRoutes = require("./routes/items");

const app = express();
app.use(bodyParser.json());

// Use item routes
app.use("/items", itemRoutes);

module.exports = app;
