const express = require("express");
const bodyParser = require("body-parser");
const itemRoutes = require("./api/routes/items");
const errorMiddleware = require("../middlewares/errorMiddleware/errorMiddleware");

const app = express();
app.use(bodyParser.json());

// Use error middleware for every route
app.use(errorMiddleware);

// Use item routes
app.use("/items", itemRoutes);

module.exports = app;
