const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { response } = require("express");
const geoCode = require('./utils/geocode');
const api = require('./utils/api');


const app = express();
const PORT = process.env.PORT || 3000;

//DEFINITION DES PATH POUR CONFIG EXPRESS
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Parametre handlerbar engine et views localisation
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Parmetres serveur static
app.use(express.static(publicPath));

//HOME
app.get("", (request, response) => {
  response.render("index", {
    title: "Météo",
    creator: "Alex Kriss",
  });
});

//Contenu
app.get("/about", (request, response) => {
  response.render("about", {
    title: "About",
    creator: "Alex Kriss",
  });
});

app.get("/help", (request, response) => {
  response.render("help", {
    title: "Help",
    creator: "Alex Kriss",
  });
});

// Retour Météo

app.get("/weather", (request, response) => {
  if (!request.query.address)
    return response.send({
      error:
        "Vous devez fournir une address pour que nous puissions vous aider ",
    });

  geoCode(request.query.address, (error, data = {}) => {
    if (error !== undefined)return response.send({
      error,
    });

    api(data, (error, weather, data) => {
      if (error !== undefined)
        return response.send({
          error: "Error lors de la reception des données",
        });
      if (weather !== undefined) {
        // console.log(weather);
        return response.send({
            location: data.location,
            temperature: weather.temperature,
            feelslike: weather.feelslike,
            humidity: weather.humidity,
            windSpeed: weather.wind_speed,
            isDay: weather.is_day,
            icon: weather.weather_icons[0]
        });

      }
    });
    // response.send({
    //   forwar: "Paris",
    //   weather: 23,
    //   address: request.query.address,
    // });
  });
});

//Error 404

app.get("/help/*", (request, response) => {
  response.render("404", {
    title: "404 HELP",
    creator: "Alex Kriss",
    errorMessage: "Oups, Aucun contenu à ce sujet",
  });
});

app.get("*", (request, response) => {
  response.render("404", {
    title: "ERROR 404",
    creator: "Alex Kriss",
    errorMessage: "Oups, il s'emblerait que vous vous soyez perdu",
  });
});

app.listen(PORT, () => {
  console.log("Le serveur vient de se lancer sur port ", PORT);
});
