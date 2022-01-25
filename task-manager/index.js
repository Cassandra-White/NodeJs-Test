const express = require("express");
require("./src/database/mongoose");

const usersRouter = require("./src/routers/users");
const tasksRouter = require("./src/routers/tasks");

//Server
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

//Routes
app.use(usersRouter);
app.use(tasksRouter);

app.listen(PORT, () => {
  console.log("Serveur sur le port : ", PORT);
});
