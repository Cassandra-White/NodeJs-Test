const express = require("express");
require("./src/database/mongoose");

const usersRouter = require("./src/routers/users");
const tasksRouter = require("./src/routers/tasks");

//Server
const app = express();
app.use(express.json());


//Routes
app.use(usersRouter);
app.use(tasksRouter);

module.exports = app;