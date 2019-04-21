const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Not able to connect , please try after some time.");
    } else if (response.body.features.length === 0) {
      callback("Not able to find location");
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[1],
        lattitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      });
    }
  });
};
module.exports = geocode;
