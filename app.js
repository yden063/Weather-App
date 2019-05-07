let local = {
  'kelvin': '',
  'celsius': '',
  'farenheit': ''
}

let temperatureDegree = document.querySelector('.temperature-degree');
let temperatureDescription = document.querySelector('.temperature-description');
let locationTimezone = document.querySelector('.location-timezone');
let formula = document.querySelector('.formula');
let temperatureIcon = document.querySelector('.temperature-icon');

window.addEventListener('load', () => {
  let long, lat;
  const api = 'https://api.openweathermap.org/data/2.5/weather';
  const appid = 'bd767c9354eb0af8e49d91cebaac6263';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (currentPosition) {
      navigator.geolocation.getCurrentPosition(
        // Success callback
        function (currentPosition) {
          long = currentPosition.coords.longitude;
          lat = currentPosition.coords.latitude;

          const fullApiUrl = `${api}?lat=${lat}&lon=${long}&appid=${appid}`;

          // Get the data
          getDataFromAPI(fullApiUrl)
            .then(function (data) {
              console.log(data);
              // Set the HTML elements depending on the data returned
              setHTMLElements(data);
            });
        },
        // Error callback
        function (errorPosition) {
          console.log(errorPosition.message);
          locationTimezone.textContent = errorPosition.message;
        }, { maximumAge: 15000, timeout: 5000, enableHighAccuracy: false })
    }, function () { }, { maximumAge: 15000, timeout: 5000, enableHighAccuracy: false }
    );
  } else {
    console.log('error');
    locationTimezone.textContent = "Geolocation is not supported by your navigator!";
  }
});

/**
 * Make a GET request to the Weather API Server
 * @param {*} url 
 * @returns {JSON} JSON formatted data
 */
function getDataFromAPI(url) {
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      return data;
    });
}

function setHTMLElements(data) {
  const city = data.name;
  const kelvinTemperature = data.main.temp;
  const { description, icon } = data.weather[0];

  locationTimezone.textContent = city;
  temperatureDegree.textContent = kelvinToFarenheit(kelvinTemperature);
  temperatureDescription.textContent = description;

  let urlToIcon = `http://openweathermap.org/img/w/${icon}.png`;
  temperatureIcon.setAttribute("src", urlToIcon);
  temperatureIcon.setAttribute("alt", description);
  console.log(temperatureIcon);

  // Modify the JSON array
  local.kelvin = kelvinTemperature;
}

function kelvinToCelsius(kelvinTemperature) {
  return kelvinTemperature - 273.15;
}

function kelvinToFarenheit(kelvinTemperature) {
  return (kelvinTemperature - 273.15) * 9 / 5 + 32;
}

function setTemperature() {
  let newTemperature;

  if (formula.textContent === "F") {
    // Convert to Celsius
    newTemperature = kelvinToCelsius(local.kelvin);
    formula.textContent = "C";
  } else {
    // Convert to Farenheit
    newTemperature = kelvinToFarenheit(local.kelvin);
    formula.textContent = "F";
  }

  temperatureDegree.textContent = newTemperature;
}

