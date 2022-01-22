console.log("je suis un script");

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     console.log("Premier passage");
//     response.json().then((data) => {
//         console.log(data);
//     });
// });

// fetch("http://localhost:3000/weather?")
//   .then((response) => {
//     response
//       .json()
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

const weatherEventListner = document.querySelector("form");
const messageError = document.querySelector("#message-error");
const messageLoading = document.querySelector("#message-loading");
const messageResultat = document.querySelector("#message-resultat");
const messageLocation = document.querySelector("#message-location");
const messageTemperature = document.querySelector("#message-temperature");
const messageFeelslike = document.querySelector("#message-feelslike");
const messageHumidity = document.querySelector("#message-humidity");
const messageWindSpeed = document.querySelector("#message-windSpeed");
const messageIsDay = document.querySelector("#message-isDay");
const messageIcon = document.querySelector("#message-icon");
const divCardWeather = document.querySelector("#card-weather");





weatherEventListner.addEventListener("submit", (event) => {
    messageError.textContent = '';
    messageLoading.textContent = 'Chargement des données...';

    messageResultat.textContent = '';
    messageLocation.textContent = '';
    messageTemperature.textContent = '';
    messageFeelslike.textContent = '';
    messageHumidity.textContent = '';
    messageWindSpeed.textContent = '';
    messageIsDay.textContent = '';
    messageIcon.src = '';

  event.preventDefault();
  fetch("http://localhost:3000/weather?address="+event.target[0].value+"")
    .then((response) => {
      response
        .json()
        .then((data) => {
          if(data.error){
            messageError.textContent = data.error
            messageLoading.textContent = '';
          }
          else {
            divCardWeather.style.border = "1px solid #eeeeee",
            divCardWeather.style.width = "fit-content",
            divCardWeather.style.padding = "2rem",
            
            messageLoading.textContent = '';
            messageResultat.textContent = 'Résultat de votre Recherche : ';
            messageLocation.textContent = 'Lieu : '+data.location+'';
            messageTemperature.textContent = 'Temperature : '+data.temperature+'°';
            messageFeelslike.textContent = 'Ressenti : '+data.feelslike+'°';
            messageHumidity.textContent = 'Humidité : '+data.humidity+'%';
            messageWindSpeed.textContent = 'Vitesse du vent : '+data.windSpeed+'km/h';
            messageIsDay.textContent = 'Statut : '+data.isDay === "no" ? 'Nuit': 'Jour'+'';
            messageIcon.src = ''+data.icon+'';
          }
            
        

        })
        .catch((error) => {
            messageError.textContent = error.error
            messageLoading.textContent = '';
        });
    })
    .catch((error) => {
        messageError.textContent = error.error
        messageLoading.textContent = '';

    });
});
