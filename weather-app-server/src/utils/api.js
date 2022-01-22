const request = require('postman-request');

const api = (data, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=2a9b696bfb1275a8013553e4c4277b4b&query="+data.latitude+","+data.longitude+"";
    request({ url: url, json: true }, (error, response) => {
        if (error) {
          callback("Error : impossiblde de faire la demande à weather API", undefined);
        }
        else if (response.body.error) {
            callback(`Error : ${response.body.error.info}`, undefined);
        }
        else {
          callback(undefined, response.body.current, data);
          // callback(response.body.current.feelslike);
        }
      });
  }

module.exports = api;