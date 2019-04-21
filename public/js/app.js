const formValues = document.querySelector("form");
const searchString = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");

formValues.addEventListener("submit", e => {
  e.preventDefault();

  fetch("http://localhost:3000/weather?address=" + searchString.value).then(
    response => {
      response.json().then(data => {
        if (data.error) {
          message1.textContent = "Error :" + data.error;
          message2.textContent = "";
        } else {
          message2.textContent =
            "Location :" + data.location + "\r\n" + "Forecast :" + data.Weather;
          message1.textContent = "";
        }
      });
    }
  );
});
