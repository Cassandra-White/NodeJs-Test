const request = require("postman-request");
const geoCode = require('./utils/geocode');
const api = require("./utils/api");
const address = process.argv[2];


if(!address){
  console.log("Veuillez ajouter une localisation. \n\texemple : node app.js \"Paris FR\"")
}
else {
  geoCode(process.argv[2], (error, data) => {
    if(error !== undefined)
      console.log(error);
    
    if(data !== undefined)
      // console.log(data);
      api(data, (error, weather, data) => {
          if(error !== undefined)  
            console.log(error);
          if(weather !== undefined){
            console.log("\n\nMétéo pour :", data.location)
            console.log("\n\tTempérature :", weather.temperature,"°")
            console.log("\tRessenti :", weather.feelslike,"°")
            console.log("\tHumidité :", weather.humidity,"%")
            console.log("\tVitesse du vent :", weather.wind_speed,"km/h")
            console.log("\tStatus :", weather.is_day === "yes" ? "Jour\n\n" : "Nuit\n\n")
          }
      })
  });
}



