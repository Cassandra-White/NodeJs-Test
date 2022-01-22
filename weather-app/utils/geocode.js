const request = require('postman-request');

const geoCode = (address, callback) => {
    const urlGeo = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoia3Jpc3NhbGV4IiwiYSI6ImNreW9kOHF4aDJxcHgydnAwN3Bwb2R3MmQifQ.bMWhV0_7iNFjI-UaAXzBnw";
   
   request({ url: urlGeo, json: true }, (error, response) => {
    if (error) {
          callback("Error : impossiblde de faire la demande à weather API", undefined);
        } else if (response.body.message ||response.body.features.length === 0) {
          callback("Error : Aucune Données", undefined);
        } else {
          callback(undefined, {
            location: response.body.features[0].place_name,
            longitude: response.body.features[0].center[0],
            latitude : response.body.features[0].center[1],
          });
        }
   })
  }

  module.exports = geoCode;