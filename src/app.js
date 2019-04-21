const express = require("express");
const path = require("path");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const app = express();

publicPath = path.join(__dirname, "../public");
expressPath = path.join(__dirname, "../templates/views");
partialspath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", expressPath);
hbs.registerPartials(partialspath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sunny"
  });
});

app.get("/about", (req, res) => {
  res.render("about", { name: "Sunny", title: "This is about us " });
});
app.get("/help", (req, res) => {
  res.render("help", {
    name: "Sunny",
    title: "Help needed",
    message: "Please go to inner self for help"
  });
});
app.use(express.static(publicPath));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "Please enter some address to know weather" });
  } else {
    geocode(
      req.query.address,
      (error, { longitude, lattitude, location } = {}) => {
        if (error) {
          res.send({ error });
        } else {
          forecast(longitude, lattitude, (error, data) => {
            if (error) {
              res.send({ error });
            } else {
              res.send({
                location: location,
                Weather: data
              });
            }
          });
        }
      }
    );
  }
});
app.get("/help/*", (req, res) => {
  res.render("error", {
    message: "Help page is not found. ",
    title: "Error Page",
    name: "Sunny"
  });
});
app.get("*", (req, res) => {
  res.render("error", {
    message: "Page is not found. ",
    title: "Error Page",
    name: "Sunny"
  });
});
app.listen(3000, () => {
  console.log("Server is up and running");
});
