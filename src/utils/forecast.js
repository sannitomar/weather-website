const request = require("request");
const forecast = (lattitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/3c6b852be4ed20f4715f95ad01469457/" +
    lattitude +
    "," +
    longitude +
    "?units=si";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Can not connect right now, please try again later.");
    } else if (response.body.error) {
      callback(response.body.error);
    } else {
      callback(
        undefined,
        response.body.hourly.summary +
          " Teperature is " +
          response.body.currently.temperature +
          " degree outside and there is " +
          response.body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};
module.exports = forecast;
