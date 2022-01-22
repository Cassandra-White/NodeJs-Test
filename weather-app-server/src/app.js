const path = require("path");
const express = require("express");
const hbs = require('hbs');

const app = express();

//DEFINITION DES PATH POUR CONFIG EXPRESS
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Parametre handlerbar engine et views localisation
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Parmetres serveur static
app.use(express.static(publicPath));


app.get("", (request, response) => {
  response.render("index", {
    title: "Je suis la home page",
    creator: "Alex Kriss",
  });
});

app.get("/about", (request, response) => {
  response.render("about", {
    title: "Je suis la About Page",
  });
});

app.get("/help", (request, response) => {
  response.render("help", {
    title: "je suis la Help Page",
  });
});

app.get("/weather", (request, response) => {
  response.send({
    forwar: "Paris",
    weather: 23,
  });
});

app.listen(3000, () => {
  console.log("Le serveur vient de se lancer sur port 3000");
});
